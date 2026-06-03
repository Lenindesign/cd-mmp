import { type CSSProperties, type FocusEvent, type KeyboardEvent as ReactKeyboardEvent, type ReactNode, useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { AlertTriangle, ArrowLeft, ArrowRight, Check, ChevronDown, ChevronLeft, ChevronRight, ChevronUp, Info, Mail, RotateCcw, SkipForward } from 'lucide-react';
import { CarProfile, CreditCard as PhosphorCreditCard, ShieldCheck as PhosphorShieldCheck, Umbrella as PhosphorUmbrella } from '@phosphor-icons/react';
import { getAllVehicles, type Vehicle } from '../../services/vehicleService';
import { getVehicleIncentives, type Incentive } from '../../services/incentivesService';
import { getVehicleTrims, type TrimData } from '../../services/trimService';
import { DEFAULT_STATE_VEHICLE_TAX, STATE_VEHICLE_TAXES } from '../../data/stateVehicleTaxes';
import { Button } from '../../components/Button';
import { Select, TextField } from '../../components/TextField';
import { useAuth } from '../../contexts/AuthContext';
import DealCard, { type DealCardPayment } from '../../components/DealCard/DealCard';
import HeroOffersB from '../../components/Hero/HeroOffersB';
import IncentivesModal from '../../components/IncentivesModal/IncentivesModal';
import { OptimizedImage } from '../../components/OptimizedImage/OptimizedImage';
import TradeInEstimateModal from '../../components/TradeInEstimateModal';
import { estimateTradeInValue } from '../../utils/tradeInEstimate';
import { getVehicleOffers, type VehicleOfferSummary } from '../../utils/dealCalculations';
import { getListingsNearYou, type Listing } from '../../services/listingsService';
import { getRangeInputStyle } from '../../utils/rangeInputStyle';
import { getPurchasePaymentSummary, getVehicleCoverageEstimates, getVehiclePriceAfterTradeAndIncentives } from '../../utils/financeBudgetFit';
import { toTitleCase } from '../../utils/textCase';
import { PaymentCalculatorFinanceCharts } from '../../components/PaymentCalculator/PaymentCalculatorFinanceCharts';
import { DEFAULT_BODY_STYLES } from '../../components/BodyStyleSelector';
import '../../components/Hero/Hero.css';
import '../../components/PaymentEstimator/PaymentEstimator.css';
import './AllInOnePaymentCalculatorPage.css';

type VehicleCondition = 'new' | 'used';
type TaxableAmountRule = 'full-price' | 'after-trade' | 'after-rebate' | 'after-trade-and-rebate';
type TradeCondition = 'rough' | 'average' | 'clean';
type LeaseEstimatorMode = 'lease' | 'buyout';
type PurchaseStartMode = 'price' | 'monthly';
type BudgetFitStatus = 'over' | 'under' | 'fit' | 'neutral';
type LightWizardStepMotion = 'none' | 'forward' | 'backward';
type LightReviewFormulaOperation = 'add' | 'subtract' | 'total';

const CAD_INFO_ICON_SRC = 'https://www.caranddriver.com/_assets/design-tokens/fre/static/icons/info-regular.348beca.svg?primary=%2523222222';

interface StateTaxRule {
  code: string;
  name: string;
  rate: number;
  titleRegistrationFees: number;
  dealerFeesEstimate: number;
  taxRule: TaxableAmountRule;
}

interface UserAreaStateSource {
  location?: string;
  budgetPreferences?: {
    stateCode?: string;
  };
}

interface YearScheduleRow {
  year: number;
  principal: number;
  interest: number;
  endBalance: number;
}

interface LightAffordableDealCard {
  vehicle: Vehicle;
  offers: VehicleOfferSummary[];
  primaryOffer: VehicleOfferSummary;
  primaryIncentive: Incentive;
}

interface LightELotListing extends Listing {
  priceBadge: 'Great Price' | 'Good Price';
}

interface LightOptimizationTip {
  id: string;
  title: string;
  priority: number;
  copy: ReactNode;
}

interface LightReviewFormulaPart {
  operation?: LightReviewFormulaOperation;
  value: number;
  label: string;
}

interface LightTrimStyleOption {
  value: string;
  label: string;
  trimId: string;
  trimName: string;
  price: number;
}

interface LightVehicleSearchOption {
  key: string;
  label: string;
  searchText: string;
  makeModelSearchText: string;
  year: string;
  vehicle: Vehicle;
}

interface LightVehicleDraft {
  year: string;
  make: string;
  model: string;
}

interface LightListboxSelectOption {
  value: string;
  label: string;
  helper?: string;
  statusLabel?: string;
  statusValue?: string;
  statusQualifier?: string;
  triggerStatusLabel?: string;
  statusTone?: BudgetFitStatus;
  disabled?: boolean;
}

interface LightBrowseVehicleMatch {
  vehicle: Vehicle;
  isNearRange: boolean;
}

type LightWizardStepSlug = 'goal' | 'loan' | 'vehicle' | 'trade' | 'review';

const CUSTOM_RATE_TERMS = [12, 24, 36, 48, 60, 72, 84];
const USED_YEAR_OPTIONS = Array.from({ length: 10 }, (_, index) => String(2025 - index));
const LIGHT_AFFORDABLE_DEAL_CARD_LIMIT = 9;
const LIGHT_BODY_STYLE_MATCH_LIMIT = 5;
const LIGHT_BODY_STYLE_NEAR_RANGE_BUFFER = 3500;
const LIGHT_BODY_STYLE_NEAR_RANGE_MULTIPLIER = 1.12;
const LIGHT_CURRENT_MODEL_YEAR = 2026;
const AREA_ESTIMATE_TOOLTIP_COPY = 'This is an estimation based on your area.';
const USED_PRICING_GUIDANCE_LEAD = 'Used car prices can vary widely due to factors like mileage, condition, and features.';
const USED_PRICING_GUIDANCE_COPY = 'The selected vehicle adds shopping context. The payment updates from the listing price you enter.';
const SHOW_LIGHT_ESTIMATE_EMAIL = true;
const SHOW_LIGHT_TRADE_ESTIMATE_CARD = false;
const SHOW_LIGHT_COVERAGE_MODULE = false;
const SHOW_LIGHT_DEALER_FEE_NOTE = false;
const SHOW_LIGHT_REVIEW_NEXT_STEPS_CARD = false;
const DEFAULT_EXTENDED_WARRANTY_COST = 2500;
const DEFAULT_MONTHLY_INSURANCE_ESTIMATE = 180;
const PAYMENT_ESTIMATE_EMAIL_FUNCTION_PATH = '/.netlify/functions/send-payment-estimate-email';
const PAYMENT_ESTIMATE_EMAIL_PRODUCTION_ORIGIN = 'https://cd-mmp-2025.netlify.app';
const CD_SEAL_CHECK_ICON_URL = 'https://www.caranddriver.com/_assets/design-tokens/fre/static/icons/seal-check-regular.4dd562d.svg?primary=%25231D7A19';
const CD_ARROW_RIGHT_ICON_URL = 'https://www.caranddriver.com/_assets/design-tokens/fre/static/icons/arrow-right.7440adc.svg?primary=%25231f1f1f';
const SHOPPING_TOOLS = [
  {
    title: 'Shop For Cars',
    description: "Research, compare, and find the exact car you're looking for at a dealer near you.",
    cta: 'Shop Now',
    href: '/vehicles',
    image: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/shop-for-cars-6908d38fba2c5.png?format=jpg&crop=0.8xw:0.9xh;0.12xw,0xh',
    primary: true,
  },
  {
    title: "What's My Car Worth?",
    description: "Get your car's trade-in and private-party-sale values using the same Black Book® data dealers use to appraise vehicles.",
    cta: 'Get Estimate',
    href: '/whats-my-car-worth',
    image: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/my-car-worth-6908d45ae5944.png?format=jpg&crop=0.8xw:1.0xh;0.16xw,0xh',
    primary: false,
  },
  {
    title: 'Compare Cars',
    description: 'Compare features, specs, prices, and performance between different trim levels on any vehicle.',
    cta: 'Compare',
    href: '/compare',
    image: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/compare-cars-6908d4bf60511.jpg?format=jpg&crop=1.0xw:0.8xh;0.0xw,0.1xh&resize=720:*',
    primary: false,
  },
  {
    title: 'Price Calculator',
    description: 'Estimate monthly payments, total cost, and budget fit before you shop.',
    cta: 'Calculate',
    href: '/auto-loan-calculator/light-steps',
    image: '/calculator-advantage/price-calculator.png?v=window-sticker',
    primary: false,
  },
] as const;

const TAX_RULE_LABELS: Record<TaxableAmountRule, string> = {
  'full-price': 'Tax full price',
  'after-trade': 'Tax price after trade-in',
  'after-rebate': 'Tax price after rebate',
  'after-trade-and-rebate': 'Tax price after trade-in and rebate',
};

const DEFAULT_TAX_RULE_BY_STATE: Record<string, TaxableAmountRule> = {
  CA: 'after-rebate',
  FL: 'full-price',
  GA: 'after-trade-and-rebate',
  IL: 'after-trade',
  NY: 'after-rebate',
  OH: 'after-trade',
  TX: 'after-trade',
  WA: 'full-price',
};

const STATE_CODE_SET = new Set(STATE_VEHICLE_TAXES.map((state) => state.code));

const getStateCodeFromLocation = (location?: string | null) => {
  if (!location) return null;
  const normalizedLocation = location.trim();
  if (!normalizedLocation) return null;

  const trailingStateCode = normalizedLocation.toUpperCase().match(/(?:^|[\s,])([A-Z]{2})(?:\s+\d{5}(?:-\d{4})?)?\s*$/);
  if (trailingStateCode && STATE_CODE_SET.has(trailingStateCode[1])) {
    return trailingStateCode[1];
  }

  const stateNameMatch = STATE_VEHICLE_TAXES.find((state) =>
    normalizedLocation.toLowerCase().includes(state.name.toLowerCase()),
  );
  if (stateNameMatch) return stateNameMatch.code;

  return null;
};

const getUserAreaStateCode = (user?: UserAreaStateSource | null) => {
  const preferredStateCode = user?.budgetPreferences?.stateCode?.toUpperCase();
  if (preferredStateCode && STATE_CODE_SET.has(preferredStateCode)) return preferredStateCode;
  return getStateCodeFromLocation(user?.location);
};

const renderAreaEstimateLabel = (label: string) => (
  <span className="aio-payment__field-label-with-tooltip">
    <span>{label}</span>
    <span
      className="aio-payment__info-tooltip aio-payment__info-tooltip--field"
      tabIndex={0}
      aria-label={AREA_ESTIMATE_TOOLTIP_COPY}
    >
      <Info size={14} aria-hidden="true" />
      <span className="aio-payment__info-tooltip-text" role="tooltip">
        {AREA_ESTIMATE_TOOLTIP_COPY}
      </span>
    </span>
  </span>
);

const FAQS = [
  {
    question: 'Should I take a cash rebate or a low APR deal?',
    answer: 'Compare total loan cost, not just monthly payment. A rebate lowers principal, while a low APR lowers interest. The better deal depends on loan size, term, and how much cash you apply up front.',
  },
  {
    question: 'Does my trade-in lower sales tax?',
    answer: 'It depends on the state. Some states tax the full vehicle price, while others tax the price after trade-in, rebate, or both.',
  },
  {
    question: 'Why is total cost higher than total loan payments?',
    answer: 'Total cost includes the vehicle price, interest, taxes, registration, title, and other fees. It is the fuller out-of-pocket estimate.',
  },
  {
    question: 'Can I enter my own rate instead of an incentive?',
    answer: 'Yes. Select custom rate to compare lender, credit union, or dealer-provided financing against manufacturer incentives.',
  },
];

const isLocalHost = () => {
  if (typeof window === 'undefined') return false;
  return ['localhost', '127.0.0.1', '::1'].includes(window.location.hostname);
};

const isPaymentEstimateEmailTestMode = () => {
  if (typeof window === 'undefined') return false;
  return isLocalHost() || window.location.hostname.endsWith('.netlify.app');
};

const getPaymentEstimateEmailEndpoint = () => {
  const origin = isLocalHost() ? PAYMENT_ESTIMATE_EMAIL_PRODUCTION_ORIGIN : '';
  return `${origin}${PAYMENT_ESTIMATE_EMAIL_FUNCTION_PATH}`;
};

const getPaymentEstimateEmailMockUrl = () => {
  const origin = isLocalHost() || typeof window === 'undefined'
    ? PAYMENT_ESTIMATE_EMAIL_PRODUCTION_ORIGIN
    : window.location.origin;
  return `${origin}/payment-estimate-email-mock.html`;
};

const LIGHT_FINANCING_FAQS = [
  {
    question: 'How does the Car and Driver Auto Loan Calculator work?',
    answer: [
      'The Car and Driver Auto Loan Calculator estimates how much car may fit your budget based on your monthly payment, credit range, loan term, down payment, state sales tax, and trade-in details. The result is an estimate of your buying power, not a loan approval or a final dealer quote.',
      'After the calculator estimates your budget, it can show vehicles that may fit that range, along with C/D ratings, starting prices, and available deal signals such as promotional APR or lease offers. Use those matches to build a smarter shortlist before comparing lender offers or contacting a dealer.',
    ],
  },
  {
    question: 'What does estimated buying power mean?',
    answer: [
      'Estimated buying power is the approximate vehicle price range your selected monthly payment may support under the calculator\'s assumptions. It gives you a practical shopping ceiling, so you can focus on cars that are more likely to fit your budget.',
      'Your actual buying power may change once a lender reviews your application, a dealer confirms the final price, or taxes, fees, incentives, trade-in value, and add-ons are included. Treat the estimate as a starting point for shopping, not the final number you will sign for.',
    ],
  },
  {
    question: 'How much car can I afford based on a monthly payment?',
    answer: [
      'A monthly payment target helps narrow your search, but it should not be the only number you use. A lower payment can still cost more overall if it comes from a longer loan term, a higher APR, or a larger amount financed.',
      'A practical budget also includes insurance, fuel or charging, maintenance, repairs, registration, parking, and your other monthly expenses. A car that fits the calculator may still be too expensive if the total ownership cost strains the rest of your budget.',
    ],
  },
  {
    question: 'What is included in a monthly car payment?',
    answer: [
      'A monthly auto-loan payment usually includes repayment of the amount borrowed plus interest. If you finance taxes, title, registration, dealer fees, destination charges, or add-ons, those costs can also become part of the monthly payment.',
      'Insurance, fuel or charging, maintenance, repairs, parking, and future registration renewals are usually separate costs. Budget for those before deciding that a monthly payment is comfortable.',
    ],
  },
  {
    question: 'How does APR affect my car payment?',
    answer: [
      'APR affects both your monthly payment and the total amount you pay to borrow money. A higher APR raises the cost of the loan, while a lower APR can help the same monthly payment support a higher vehicle price or a shorter repayment term.',
      'When comparing cars or loan offers, look beyond the monthly payment. Compare APR, loan term, total interest, amount financed, and total amount paid over the life of the loan.',
    ],
  },
  {
    question: 'How does my credit score affect an auto loan estimate?',
    answer: [
      'Your credit score can influence the APR you qualify for, which can change your estimated monthly payment and buying power. A stronger credit profile generally helps you qualify for more competitive financing, while a weaker credit profile can raise borrowing costs.',
      'Credit score is only one part of a lender\'s decision. Lenders may also review income, debt, loan term, down payment, vehicle age, and the full credit application. The calculator\'s credit range is useful for planning, but the actual rate comes from lender approval.',
    ],
  },
  {
    question: 'Is a longer car loan term better?',
    answer: [
      'A longer loan term can lower the monthly payment, but it usually increases the total interest paid. It can also raise the chance of owing more than the car is worth, especially early in the loan.',
      'A shorter term often costs more per month but can reduce interest and help you build equity faster. When two vehicles fit the same payment, compare the term length and total cost before choosing the one that looks cheaper month to month.',
    ],
  },
  {
    question: 'How much should I put down on a car?',
    answer: [
      'A larger down payment reduces the amount you finance, which can lower your monthly payment and total interest cost. It can also give you more equity from the start, which helps protect you if the car depreciates quickly.',
      'A common target is 15% to 20% down when your budget allows, but the right amount depends on your savings, trade-in value, loan rate, and other costs due at purchase. Keep enough cash available for insurance, registration, maintenance, and emergencies.',
    ],
  },
  {
    question: 'How does a trade-in affect my car loan?',
    answer: [
      'A trade-in can lower the amount you need to finance. If your trade-in is worth more than your current loan payoff, the difference can work like extra money down.',
      'If you owe more than the trade-in is worth, the difference is negative equity. Rolling negative equity into the next loan increases the amount financed and can make the new car more expensive than the monthly payment suggests.',
    ],
  },
  {
    question: 'Should I include taxes and fees in my auto loan estimate?',
    answer: [
      'Include taxes and fees when you want a more realistic estimate. Sales tax, title, registration, dealer documentation fees, destination charges, and other required costs can add meaningful money to the amount due at purchase.',
      'Paying those costs upfront keeps them out of the loan. Financing those costs may reduce what you owe at signing, but it increases the amount borrowed and can increase total interest.',
    ],
  },
  {
    question: 'What is an out-the-door price, and why does it matter?',
    answer: [
      'The out-the-door price is the full price to buy the car, including the vehicle price, taxes, title, registration, dealer fees, destination charges, and any add-ons, minus discounts, rebates, and trade-in credit. It is the number that matters most when comparing offers.',
      'A loan calculator estimates payment, but it does not guarantee the dealer\'s final price. Before visiting a dealer, ask for the out-the-door price in writing and confirm the vehicle, trim, incentives, fees, and add-ons included in that number.',
    ],
  },
  {
    question: 'Should I get preapproved before visiting a dealer?',
    answer: [
      'Getting preapproved before visiting a dealer can help you understand your real rate range and monthly payment before negotiations begin. It also gives you a financing offer to compare against dealer or automaker financing.',
      'Dealer financing can still be worth considering, especially when an automaker offers a promotional APR or rebate. Compare the full offer, including APR, term, fees, incentives, amount financed, and total cost - not just the monthly payment.',
    ],
  },
  {
    question: 'Why do some vehicles show APR, rebate, or lease deals?',
    answer: [
      'APR, rebate, and lease deal signals can help you spot vehicles with potentially stronger financing or payment offers. A promotional APR can reduce borrowing cost, and a rebate can lower the price or amount financed.',
      'Read the deal details carefully. Offers may depend on credit approval, location, trim, term length, down payment, due-at-signing amount, and vehicle availability. Lease payments are not the same as loan payments, so compare mileage limits, upfront costs, and total lease cost before treating a lease as a direct substitute for financing.',
    ],
  },
  {
    question: 'What should I do after the calculator finds cars in my budget?',
    answer: [
      'Use the calculator results to narrow your search to vehicles that fit your payment target, then compare C/D ratings, reviews, trims, features, incentives, and real-world ownership costs. A car that fits your payment should still fit your needs, driving habits, insurance budget, and long-term cost expectations.',
      'Before contacting a dealer, compare financing options, estimate your trade-in, ask for the out-the-door price in writing, and confirm the vehicle is available. Before signing, make sure the final contract matches the price, APR, term, trade-in value, fees, and add-ons you agreed to.',
    ],
  },
];

const currency = (value: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(Math.round(value));

const numberWithCommas = (value: number) =>
  new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(Math.round(value));

const numberInput = (value: string) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
};

const APR_INPUT_DECIMAL_PLACES = 1;

const normalizeAprInputValue = (value: string) => {
  const cleaned = value.replace(/[^\d.]/g, '');
  const [whole = '', ...decimalParts] = cleaned.split('.');
  if (!cleaned.includes('.')) return whole;

  return `${whole || '0'}.${decimalParts.join('').slice(0, APR_INPUT_DECIMAL_PLACES)}`;
};

const currencyInput = (value: string) => {
  const parsed = Number(value.replace(/[^\d.]/g, ''));
  return Number.isFinite(parsed) ? parsed : 0;
};

const formatMoneyInputValue = (value: string, fallback: number) =>
  value.trim() === '' ? numberWithCommas(fallback) : numberWithCommas(currencyInput(value));

const normalizeMoneyInputValue = (value: string) =>
  value.trim() === '' ? '' : String(currencyInput(value));

const formatLightTradeSalesTaxPercent = (percent: number): string => {
  const rounded = Math.round(percent * 1000) / 1000;
  if (Math.abs(rounded - Math.round(rounded)) < 1e-6) return String(Math.round(rounded));
  return String(rounded);
};

const selectCalculatorInputValueOnFocus = (event: FocusEvent<HTMLInputElement>) => {
  const input = event.currentTarget;
  input.select();
  if (typeof window === 'undefined') return;
  window.requestAnimationFrame(() => {
    if (typeof document !== 'undefined' && document.activeElement === input) {
      input.select();
    }
  });
};

const MONEY_INPUT_PREFIX = <span className="aio-payment__light-input-prefix" aria-hidden="true">$</span>;
const PERCENT_INPUT_SUFFIX = <span className="aio-payment__light-input-suffix" aria-hidden="true">%</span>;

/** Light calculator primary controls — shared slider + field pattern */
const LIGHT_MONTHLY_BUDGET_MIN = 100;
const LIGHT_MONTHLY_BUDGET_MAX = 2000;
const LIGHT_MONTHLY_BUDGET_STEP = 25;

const LIGHT_VEHICLE_PRICE_MIN = 5000;
const LIGHT_VEHICLE_PRICE_MAX = 120000;
const LIGHT_VEHICLE_PRICE_STEP = 500;
const LIGHT_DEFAULT_VEHICLE_PRICE = 30000;

const boundLightMonthlyBudget = (value: number) => Math.min(LIGHT_MONTHLY_BUDGET_MAX, Math.max(LIGHT_MONTHLY_BUDGET_MIN, value));

const clampLightMonthlyBudget = (value: number) => {
  const stepped = Math.round(value / LIGHT_MONTHLY_BUDGET_STEP) * LIGHT_MONTHLY_BUDGET_STEP;
  return boundLightMonthlyBudget(stepped);
};

const boundLightVehiclePrice = (value: number) => Math.min(LIGHT_VEHICLE_PRICE_MAX, Math.max(LIGHT_VEHICLE_PRICE_MIN, value));

const clampLightVehiclePrice = (value: number) => {
  const stepped = Math.round(value / LIGHT_VEHICLE_PRICE_STEP) * LIGHT_VEHICLE_PRICE_STEP;
  return boundLightVehiclePrice(stepped);
};

const LIGHT_DOWN_PAYMENT_MIN = 0;
const LIGHT_DOWN_PAYMENT_MAX = 80000;
const LIGHT_DOWN_PAYMENT_STEP = 500;

const clampLightDownPayment = (value: number) => {
  const stepped = Math.round(value / LIGHT_DOWN_PAYMENT_STEP) * LIGHT_DOWN_PAYMENT_STEP;
  return Math.min(LIGHT_DOWN_PAYMENT_MAX, Math.max(LIGHT_DOWN_PAYMENT_MIN, stepped));
};

const getDefaultLightDownPayment = (vehiclePrice: number) => clampLightDownPayment(vehiclePrice * 0.1);

const LIGHT_APR_SLIDER_MIN = 0;
const LIGHT_APR_SLIDER_MAX = 20;
const LIGHT_APR_SLIDER_STEP = 0.1;
const LIGHT_APR_INPUT_STEP = 0.1;
const LIGHT_DEFAULT_NEW_APR = 7;
const LIGHT_DEFAULT_USED_APR = 11;

const clampLightApr = (value: number) => {
  const rounded = Math.round(value / LIGHT_APR_INPUT_STEP) * LIGHT_APR_INPUT_STEP;
  const clamped = Math.min(LIGHT_APR_SLIDER_MAX, Math.max(LIGHT_APR_SLIDER_MIN, rounded));
  return Number(clamped.toFixed(APR_INPUT_DECIMAL_PLACES));
};

const clampLightAprSlider = (value: number) => {
  const rounded = Math.round(value / LIGHT_APR_SLIDER_STEP) * LIGHT_APR_SLIDER_STEP;
  return clampLightApr(rounded);
};

const formatAprPercent = (value: number) => `${clampLightApr(value).toFixed(APR_INPUT_DECIMAL_PLACES)}%`;

const monthlyPayment = (principal: number, apr: number, termMonths: number) => {
  if (principal <= 0 || termMonths <= 0) return 0;
  const monthlyRate = apr / 100 / 12;
  if (monthlyRate === 0) return principal / termMonths;
  return principal * (monthlyRate * Math.pow(1 + monthlyRate, termMonths)) / (Math.pow(1 + monthlyRate, termMonths) - 1);
};

const simulateLoanPayoff = (principal: number, apr: number, monthlyPaymentAmount: number, extraMonthly: number) => {
  const monthlyRate = apr / 100 / 12;
  const plannedPayment = monthlyPaymentAmount + extraMonthly;
  let balance = Math.max(0, principal);
  let months = 0;
  let interest = 0;
  let totalPaid = 0;

  while (balance > 0.5 && months < 600) {
    const monthlyInterest = balance * monthlyRate;
    const payment = Math.min(balance + monthlyInterest, plannedPayment);
    const principalPaid = payment - monthlyInterest;
    if (payment <= 0 || principalPaid <= 0) break;

    balance = Math.max(0, balance - principalPaid);
    interest += monthlyInterest;
    totalPaid += payment;
    months += 1;
  }

  return { months, interest, totalPaid };
};

const parseMoney = (value: string) => {
  const match = value.match(/\$?([\d,]+)/);
  return match ? Number(match[1].replace(/,/g, '')) : 0;
};

const getTrimOptionValue = (vehicle: Vehicle, trim: TrimData) => `${vehicle.slug}::${trim.id}`;

const getTrimOptionDrivetrain = (vehicle: Vehicle, trim: TrimData) => {
  const drivetrain = trim.specs?.drivetrain?.trim();
  return drivetrain && drivetrain !== '—' ? drivetrain : vehicle.drivetrain;
};

const getTrimOptionLabel = (vehicle: Vehicle, trim: TrimData, trimPrice: number, canUseCatalogPrice: boolean) => {
  const label = `${trim.name} · ${getTrimOptionDrivetrain(vehicle, trim)} · ${vehicle.bodyStyle}`;
  return canUseCatalogPrice ? `${label} · ${currency(trimPrice)}` : label;
};

const getBudgetFitStatusFromDelta = (delta: number): BudgetFitStatus => {
  if (delta > 10) return 'over';
  if (delta < -10) return 'under';
  return 'fit';
};

const getRegistrationDealerFeeGuidance = (stateFeeEstimate: number) => {
  if (stateFeeEstimate <= 500) {
    return {
      label: 'Low Fee States',
      range: '~$300-$500',
      copy: 'These are separate from sales tax and may include title, registration, documentation, plate, and dealer processing charges. In your state, they often range from $300-$500, but the final itemized dealer quote can change.',
    };
  }

  if (stateFeeEstimate <= 900) {
    return {
      label: 'Medium Fee States',
      range: '~$600-$900',
      copy: 'These are separate from sales tax and may include title, registration, documentation, plate, and dealer processing charges. In your state, they often range from $600-$900, but the final itemized dealer quote can change.',
    };
  }

  return {
    label: 'High Fee States',
    range: '~$1,000-$1,500',
    copy: 'These are separate from sales tax and may include title, registration, documentation, plate, and dealer processing charges. In your state, they are often higher and may range from $1,000-$1,500, but the final itemized dealer quote can change.',
  };
};

const parseApr = (value: string) => {
  const match = value.match(/([\d.]+)%/);
  return match ? Number(match[1]) : 0;
};

const parseTerm = (value?: string) => {
  const match = value?.match(/(\d+)/);
  return match ? Number(match[1]) : 60;
};

const isBuyingIncentive = (incentive: Incentive) => incentive.type === 'cash' || incentive.type === 'finance';

const formatInlineList = (items: string[]) => {
  if (items.length <= 1) return items[0] ?? '';
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  return `${items.slice(0, -1).join(', ')}, and ${items[items.length - 1]}`;
};

const formatAiIncentiveList = (items: Incentive[], limit = 3) => {
  const visibleItems = items.slice(0, limit).map((incentive) => incentive.title);
  const hiddenCount = Math.max(0, items.length - visibleItems.length);

  if (hiddenCount > 0) {
    visibleItems.push(`${hiddenCount} more`);
  }

  return formatInlineList(visibleItems);
};

const getLightDealTypeTag = (offerType: VehicleOfferSummary['type']) => {
  switch (offerType) {
    case 'lease':
      return 'Lease';
    case 'cash':
      return 'Cash';
    case 'finance':
    case 'zero-apr':
      return 'Buy';
    default:
      return 'Special';
  }
};

const getLightDealPayment = (offer: VehicleOfferSummary): DealCardPayment => {
  if (offer.type === 'lease') {
    return {
      amount: offer.label.match(/\$[\d,]+/)?.[0] ?? offer.label,
      period: '/mo lease',
      savings: { type: 'plain', text: 'Lease special' },
      expirationDate: offer.expires,
    };
  }

  if (offer.type === 'finance' || offer.type === 'zero-apr') {
    const amount = offer.label.match(/[\d.]+%/)?.[0] ?? offer.label.split(/\s+/)[0] ?? offer.label;
    const term = offer.label.replace(amount, '').trim();

    return {
      amount,
      period: 'APR',
      savings: { type: 'plain', text: term || 'Low-rate deal' },
      expirationDate: offer.expires,
    };
  }

  return {
    amount: offer.label.match(/\$[\d,]+/)?.[0] ?? offer.label,
    period: 'Cash Back',
    savings: { type: 'plain', text: 'Manufacturer cash' },
    expirationDate: offer.expires,
  };
};

const SealCheckIcon = ({ size = 24 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M21.1744 9.63937C20.8209 9.27 20.4553 8.88937 20.3175 8.55469C20.19 8.24813 20.1825 7.74 20.175 7.24781C20.1609 6.33281 20.1459 5.29594 19.425 4.575C18.7041 3.85406 17.6672 3.83906 16.7522 3.825C16.26 3.8175 15.7519 3.81 15.4453 3.6825C15.1116 3.54469 14.73 3.17906 14.3606 2.82562C13.7137 2.20406 12.9787 1.5 12 1.5C11.0213 1.5 10.2872 2.20406 9.63937 2.82562C9.27 3.17906 8.88937 3.54469 8.55469 3.6825C8.25 3.81 7.74 3.8175 7.24781 3.825C6.33281 3.83906 5.29594 3.85406 4.575 4.575C3.85406 5.29594 3.84375 6.33281 3.825 7.24781C3.8175 7.74 3.81 8.24813 3.6825 8.55469C3.54469 8.88844 3.17906 9.27 2.82562 9.63937C2.20406 10.2862 1.5 11.0213 1.5 12C1.5 12.9787 2.20406 13.7128 2.82562 14.3606C3.17906 14.73 3.54469 15.1106 3.6825 15.4453C3.81 15.7519 3.8175 16.26 3.825 16.7522C3.83906 17.6672 3.85406 18.7041 4.575 19.425C5.29594 20.1459 6.33281 20.1609 7.24781 20.175C7.74 20.1825 8.24813 20.19 8.55469 20.3175C8.88844 20.4553 9.27 20.8209 9.63937 21.1744C10.2862 21.7959 11.0213 22.5 12 22.5C12.9787 22.5 13.7128 21.7959 14.3606 21.1744C14.73 20.8209 15.1106 20.4553 15.4453 20.3175C15.7519 20.19 16.26 20.1825 16.7522 20.175C17.6672 20.1609 18.7041 20.1459 19.425 19.425C20.1459 18.7041 20.1609 17.6672 20.175 16.7522C20.1825 16.26 20.19 15.7519 20.3175 15.4453C20.4553 15.1116 20.8209 14.73 21.1744 14.3606C21.7959 13.7137 22.5 12.9787 22.5 12C22.5 11.0213 21.7959 10.2872 21.1744 9.63937ZM20.0916 13.3228C19.6425 13.7916 19.1775 14.2763 18.9309 14.8716C18.6947 15.4434 18.6844 16.0969 18.675 16.7297C18.6656 17.3859 18.6553 18.0731 18.3638 18.3638C18.0722 18.6544 17.3897 18.6656 16.7297 18.675C16.0969 18.6844 15.4434 18.6947 14.8716 18.9309C14.2763 19.1775 13.7916 19.6425 13.3228 20.0916C12.8541 20.5406 12.375 21 12 21C11.625 21 11.1422 20.5387 10.6772 20.0916C10.2122 19.6444 9.72375 19.1775 9.12844 18.9309C8.55656 18.6947 7.90313 18.6844 7.27031 18.675C6.61406 18.6656 5.92687 18.6553 5.63625 18.3638C5.34562 18.0722 5.33437 17.3897 5.325 16.7297C5.31562 16.0969 5.30531 15.4434 5.06906 14.8716C4.8225 14.2763 4.3575 13.7916 3.90844 13.3228C3.45937 12.8541 3 12.375 3 12C3 11.625 3.46125 11.1422 3.90844 10.6772C4.35562 10.2122 4.8225 9.72375 5.06906 9.12844C5.30531 8.55656 5.31562 7.90313 5.325 7.27031C5.33437 6.61406 5.34469 5.92687 5.63625 5.63625C5.92781 5.34562 6.61031 5.33437 7.27031 5.325C7.90313 5.31562 8.55656 5.30531 9.12844 5.06906C9.72375 4.8225 10.2084 4.3575 10.6772 3.90844C11.1459 3.45937 11.625 3 12 3C12.375 3 12.8578 3.46125 13.3228 3.90844C13.7878 4.35562 14.2763 4.8225 14.8716 5.06906C15.4434 5.30531 16.0969 5.31562 16.7297 5.325C17.3859 5.33437 18.0731 5.34469 18.3638 5.63625C18.6544 5.92781 18.6656 6.61031 18.675 7.27031C18.6844 7.90313 18.6947 8.55656 18.9309 9.12844C19.1775 9.72375 19.6425 10.2084 20.0916 10.6772C20.5406 11.1459 21 11.625 21 12C21 12.375 20.5387 12.8578 20.0916 13.3228ZM16.2806 9.21937C16.3504 9.28903 16.4057 9.37175 16.4434 9.46279C16.4812 9.55384 16.5006 9.65144 16.5006 9.75C16.5006 9.84856 16.4812 9.94616 16.4434 10.0372C16.4057 10.1283 16.3504 10.211 16.2806 10.2806L11.0306 15.5306C10.961 15.6004 10.8783 15.6557 10.7872 15.6934C10.6962 15.7312 10.5986 15.7506 10.5 15.7506C10.4014 15.7506 10.3038 15.7312 10.2128 15.6934C10.1217 15.6557 10.039 15.6004 9.96937 15.5306L7.71937 13.2806C7.57864 13.1399 7.49958 12.949 7.49958 12.75C7.49958 12.551 7.57864 12.3601 7.71937 12.2194C7.86011 12.0786 8.05098 11.9996 8.25 11.9996C8.44902 11.9996 8.63989 12.0786 8.78063 12.2194L10.5 13.9397L15.2194 9.21937C15.289 9.14964 15.3717 9.09432 15.4628 9.05658C15.5538 9.01884 15.6514 8.99941 15.75 8.99941C15.8486 8.99941 15.9462 9.01884 16.0372 9.05658C16.1283 9.09432 16.211 9.14964 16.2806 9.21937Z"
      fill="currentColor"
    />
  </svg>
);

const getFinanceTermOptions = (incentive?: Incentive) => {
  if (!incentive) return CUSTOM_RATE_TERMS;
  if (incentive.rateTiers?.length) return incentive.rateTiers.map((tier) => tier.term);
  return [parseTerm(incentive.terms ?? incentive.value)];
};

const getFinanceRateForTerm = (incentive: Incentive | undefined, term: number) => {
  if (!incentive) return null;
  const tier = incentive.rateTiers?.find((item) => item.term === term) ?? incentive.rateTiers?.[0];
  if (tier) return tier.apr;
  return parseApr(incentive.value);
};

const getTierCashBack = (incentive: Incentive | undefined, term: number) => {
  const tier = incentive?.rateTiers?.find((item) => item.term === term);
  return tier?.cashBack ?? 0;
};

const getPreferredScrollBehavior = (): ScrollBehavior => {
  if (typeof window === 'undefined') return 'auto';
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
};

const scrollLightVehicleSearchIntoMobileView = (input: HTMLInputElement) => {
  if (typeof window === 'undefined' || !window.matchMedia('(max-width: 768px)').matches) return;

  const searchField = input.closest('.aio-payment__light-vehicle-search') as HTMLElement | null;
  const scrollTarget = searchField ?? input;
  const alignSearchField = () => {
    if (document.activeElement !== input) return;
    scrollTarget.scrollIntoView({ behavior: 'auto', block: 'start', inline: 'nearest' });
  };

  window.requestAnimationFrame(alignSearchField);
  window.setTimeout(alignSearchField, 280);
};

const buildStateRules = (): StateTaxRule[] =>
  STATE_VEHICLE_TAXES.map((state) => ({
    ...state,
    titleRegistrationFees: state.rate === 0 ? 180 : Math.round(220 + state.rate * 3800),
    dealerFeesEstimate: state.rate === 0 ? 350 : Math.round((500 + state.rate * 2000) / 25) * 25,
    taxRule: DEFAULT_TAX_RULE_BY_STATE[state.code] ?? 'after-trade',
  }));

const getTaxableAmount = (
  price: number,
  tradeInValue: number,
  rebate: number,
  taxRule: TaxableAmountRule,
) => {
  switch (taxRule) {
    case 'after-trade':
      return Math.max(0, price - tradeInValue);
    case 'after-rebate':
      return Math.max(0, price - rebate);
    case 'after-trade-and-rebate':
      return Math.max(0, price - tradeInValue - rebate);
    case 'full-price':
    default:
      return Math.max(0, price);
  }
};

const getAffordablePriceFromMonthlyBudget = ({
  targetMonthlyPayment,
  apr,
  termMonths,
  downPayment,
  tradeInValue,
  amountOwed,
  rebate,
  taxRule,
  taxRate,
  salesTaxOverride,
  fees,
  financedAddOns = 0,
  monthlyOwnershipCosts = 0,
  includeTaxesAndFeesInLoan,
}: {
  targetMonthlyPayment: number;
  apr: number;
  termMonths: number;
  downPayment: number;
  tradeInValue: number;
  amountOwed: number;
  rebate: number;
  taxRule: TaxableAmountRule;
  taxRate: number;
  salesTaxOverride?: number;
  fees: number;
  financedAddOns?: number;
  monthlyOwnershipCosts?: number;
  includeTaxesAndFeesInLoan: boolean;
}) => {
  if (targetMonthlyPayment <= 0 || termMonths <= 0) return 0;

  const tradeEquity = tradeInValue - amountOwed;
  const targetLoanPayment = Math.max(0, targetMonthlyPayment - monthlyOwnershipCosts);
  const paymentForPrice = (candidatePrice: number) => {
    const taxableAmount = getTaxableAmount(candidatePrice, tradeInValue, rebate, taxRule);
    const salesTax = salesTaxOverride ?? taxableAmount * taxRate;
    const { amountFinanced } = getPurchasePaymentSummary({
      vehiclePrice: candidatePrice,
      taxesAndFees: salesTax + fees,
      financedAddOns,
      tradeEquity,
      rebate,
      downPayment,
      includeTaxesAndFeesInLoan,
    });

    return monthlyPayment(amountFinanced, apr, termMonths);
  };

  let low = 0;
  let high = 200000;

  for (let step = 0; step < 32; step += 1) {
    const mid = (low + high) / 2;
    if (paymentForPrice(mid) <= targetLoanPayment) {
      low = mid;
    } else {
      high = mid;
    }
  }

  return Math.max(0, Math.floor(low / 100) * 100);
};

const buildAnnualSchedule = (principal: number, apr: number, termMonths: number, payment: number): YearScheduleRow[] => {
  const monthlyRate = apr / 100 / 12;
  let balance = principal;
  const rows: YearScheduleRow[] = [];

  for (let month = 1; month <= termMonths && balance > 0.5; month += 1) {
    const interest = balance * monthlyRate;
    const principalPaid = Math.min(balance, Math.max(0, payment - interest));
    balance = Math.max(0, balance - principalPaid);
    const yearIndex = Math.ceil(month / 12);
    const current = rows[yearIndex - 1] ?? { year: yearIndex, principal: 0, interest: 0, endBalance: balance };
    current.principal += principalPaid;
    current.interest += interest;
    current.endBalance = balance;
    rows[yearIndex - 1] = current;
  }

  return rows;
};

const getMarketplaceUrl = (condition: VehicleCondition, vehicle: Vehicle, year: string) => {
  const params = new URLSearchParams({
    year,
    make: vehicle.make,
    model: vehicle.model,
  });

  return `https://www.caranddriver.com/cars-for-sale/${condition}?${params.toString()}`;
};

const getMarketplacePriceRangeUrl = (condition: VehicleCondition, maxPrice?: number, bodyStyle?: string) => {
  const params = new URLSearchParams({ sort: 'price-low' });

  if (maxPrice && maxPrice > 0) {
    params.set('maxPrice', String(Math.round(maxPrice)));
  }

  if (bodyStyle) {
    params.set('bodyStyle', bodyStyle);
  }

  return `https://www.caranddriver.com/cars-for-sale/${condition}?${params.toString()}`;
};

const addMarketplaceParams = (href: string, params: Record<string, string>) => {
  const url = new URL(href);

  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(key, value);
  });

  return url.toString();
};

const getBodyStyleListingsLabel = (bodyStyle: string) => (
  bodyStyle === 'SUV' ? 'SUVs' : `${bodyStyle}s`
);

const getBodyStyleShoppingCtaLabel = (condition: VehicleCondition, bodyStyle: string) =>
  `Shop ${condition === 'new' ? 'new' : 'used'} ${getBodyStyleListingsLabel(bodyStyle)}`.toUpperCase();

const getLightListingConditionLabel = (listing: Listing) => {
  if (listing.isCertified) return `Certified ${listing.year}`;
  return `${listing.isNew ? 'New' : 'Used'} ${listing.year}`;
};

function bodyStyleCatalogIcon(iconId: string): string {
  return DEFAULT_BODY_STYLES.find((b) => b.id === iconId)?.icon ?? '';
}

const normalizeVehicleMatch = (value: string) => value.toLowerCase().replace(/[^a-z0-9]/g, '');

const formatLightVehicleSearchLabel = (vehicle: Pick<Vehicle, 'make' | 'model'> & { year: string }) =>
  `${vehicle.year} ${vehicle.make} ${vehicle.model}`;

/** Light wizard “Still shopping” grid — BodyStyleSelector line art; EV/Hybrid are shopping intents. */
const LIGHT_VEHICLE_BROWSE_GRID = [
  { key: 'sedan', label: 'Sedan', bodyStyle: 'Sedan', iconId: 'sedans' },
  { key: 'suv', label: 'SUV', bodyStyle: 'SUV', iconId: 'suvs' },
  { key: 'truck', label: 'Truck', bodyStyle: 'Truck', iconId: 'trucks' },
  { key: 'ev', label: 'EV', bodyStyle: 'EV', iconId: 'evs' },
  { key: 'hybrid', label: 'Hybrid', bodyStyle: 'Hybrid', iconId: 'hybrids' },
  { key: 'crossover', label: 'Crossovers', bodyStyle: 'Crossover', iconId: 'crossovers' },
  { key: 'coupe', label: 'Coupe', bodyStyle: 'Coupe', iconId: 'coupes' },
  { key: 'hatchback', label: 'Hatchback', bodyStyle: 'Hatchback', iconId: 'wagons' },
  { key: 'wagon', label: 'Wagon', bodyStyle: 'Wagon', iconId: 'wagons' },
  { key: 'convertible', label: 'Convertible', bodyStyle: 'Convertible', iconId: 'convertibles' },
] as const;

const matchesLightBrowseCategory = (vehicle: Vehicle, bodyStyle: string) => {
  if (bodyStyle === 'EV') return vehicle.fuelType === 'Electric';
  if (bodyStyle === 'Hybrid') return vehicle.fuelType === 'Hybrid' || vehicle.fuelType === 'Plug-in Hybrid';
  if (bodyStyle === 'Crossover') return vehicle.bodyStyle === 'SUV';

  return vehicle.bodyStyle.toLowerCase() === bodyStyle.toLowerCase();
};

const isLightBrowseVehicleInCondition = (vehicle: Vehicle, condition: VehicleCondition) => {
  const vehicleYear = Number.parseInt(vehicle.year, 10);

  return condition === 'used'
    ? vehicle.condition === 'used' || vehicleYear < LIGHT_CURRENT_MODEL_YEAR
    : vehicle.condition !== 'used' && vehicleYear >= LIGHT_CURRENT_MODEL_YEAR;
};

const sortLightBrowseVehicleMatch = (a: Vehicle, b: Vehicle) =>
  b.staffRating - a.staffRating || a.priceMin - b.priceMin || `${a.make} ${a.model}`.localeCompare(`${b.make} ${b.model}`);

const formatLightStaffRating = (rating: number) =>
  Number.isInteger(rating) ? String(rating) : rating.toFixed(1);

interface LightMonthlyBudgetFieldProps {
  affordableMsrp: number;
  targetMonthlyPayment: number;
  onBudgetChange: (value: number) => void;
}

interface LightVehiclePriceFieldProps {
  price: number;
  estimatedMonthly: number;
  onPriceChange: (value: number) => void;
}

interface LightGuidanceTooltipProps {
  id: string;
  title: string;
  copy?: ReactNode;
  note?: ReactNode;
  ariaLabel?: string;
  compact?: boolean;
  children?: ReactNode;
}

function LightGuidanceTooltip({
  id,
  title,
  copy,
  note,
  ariaLabel,
  compact = true,
  children,
}: LightGuidanceTooltipProps) {
  const popoverClassName = [
    'aio-payment__light-loan-guidance',
    compact ? 'aio-payment__light-loan-guidance--compact' : '',
  ].filter(Boolean).join(' ');

  return (
    <span className="aio-payment__light-loan-guidance-tooltip">
      <button
        type="button"
        className="aio-payment__light-loan-guidance-trigger"
        aria-label={ariaLabel ?? `${title} help`}
        aria-describedby={id}
      >
        <img
          className="aio-payment__light-loan-guidance-trigger-icon"
          src={CAD_INFO_ICON_SRC}
          width="24"
          height="24"
          alt=""
          aria-hidden="true"
        />
      </button>
      <span id={id} className={popoverClassName} role="tooltip">
        <span className="aio-payment__light-loan-guidance-header">
          <Info size={16} strokeWidth={2.25} aria-hidden="true" />
          <span>{title}</span>
        </span>
        {children ?? (
          <>
            <span className="aio-payment__light-loan-guidance-copy">{copy}</span>
            {note ? (
              <span className="aio-payment__light-loan-guidance-note">{note}</span>
            ) : null}
          </>
        )}
      </span>
    </span>
  );
}

const renderLightGuidanceTooltip = (config: LightGuidanceTooltipProps) => (
  <LightGuidanceTooltip {...config} />
);

function LightVehiclePriceField({ price, estimatedMonthly, onPriceChange }: LightVehiclePriceFieldProps) {
  const inputId = useId();
  const helperId = `${inputId}-helper`;
  const priceGuidanceId = useId();
  const bounded = boundLightVehiclePrice(price);

  return (
    <div className="payment-calc__field payment-calc__field--full aio-payment__light-estimator-field">
      <div className="payment-calc__row-label aio-payment__light-estimator-row-label">
        <div className="aio-payment__light-label-with-help">
          <label htmlFor={inputId}>
            Vehicle price target
          </label>
          {renderLightGuidanceTooltip({
            id: priceGuidanceId,
            title: 'Vehicle price target',
            ariaLabel: 'Vehicle price target guidance',
            copy: 'Enter the price you expect to pay before taxes, fees, trade-in, or down payment.',
          })}
        </div>
      </div>
      <input
        id={inputId}
        type="text"
        inputMode="numeric"
        className="payment-calc__input aio-payment__light-estimator-input"
        value={currency(price)}
        aria-describedby={helperId}
        onFocus={selectCalculatorInputValueOnFocus}
        onChange={(event) => onPriceChange(currencyInput(event.target.value))}
        onBlur={(event) => onPriceChange(boundLightVehiclePrice(currencyInput(event.currentTarget.value)))}
      />
      <input
        type="range"
        className="payment-calc__slider"
        min={LIGHT_VEHICLE_PRICE_MIN}
        max={LIGHT_VEHICLE_PRICE_MAX}
        step={LIGHT_VEHICLE_PRICE_STEP}
        value={bounded}
        onChange={(event) => onPriceChange(clampLightVehiclePrice(numberInput(event.target.value)))}
        aria-label="Adjust vehicle price"
        style={getRangeInputStyle(bounded, LIGHT_VEHICLE_PRICE_MIN, LIGHT_VEHICLE_PRICE_MAX)}
      />
      <div className="payment-calc__ticks" aria-hidden="true">
        <span>{currency(LIGHT_VEHICLE_PRICE_MIN)}</span>
        <span>{currency(LIGHT_VEHICLE_PRICE_MAX)}</span>
      </div>
      <p id={helperId} className="payment-calc__note payment-calc__note--inline aio-payment__light-estimator-helper">
        Your target price stays fixed unless you change it. Estimated payment: {currency(estimatedMonthly)}/mo before dealer-specific changes.
      </p>
    </div>
  );
}

function LightMonthlyBudgetField({ affordableMsrp, targetMonthlyPayment, onBudgetChange }: LightMonthlyBudgetFieldProps) {
  const inputId = useId();
  const helperId = `${inputId}-helper`;
  const budgetGuidanceId = useId();
  const bounded = boundLightMonthlyBudget(targetMonthlyPayment);

  return (
    <div className="payment-calc__field payment-calc__field--full aio-payment__light-estimator-field">
      <div className="payment-calc__row-label aio-payment__light-estimator-row-label">
        <div className="aio-payment__light-label-with-help">
          <label htmlFor={inputId}>
            Monthly budget
          </label>
          {renderLightGuidanceTooltip({
            id: budgetGuidanceId,
            title: 'Monthly budget',
            copy: "Enter the monthly payment you'd like to stay near. We'll estimate a vehicle budget from there.",
            ariaLabel: 'Monthly budget guidance',
          })}
        </div>
      </div>
      <input
        id={inputId}
        type="text"
        inputMode="numeric"
        className="payment-calc__input aio-payment__light-estimator-input"
        value={currency(targetMonthlyPayment)}
        aria-describedby={helperId}
        onFocus={selectCalculatorInputValueOnFocus}
        onChange={(event) => onBudgetChange(currencyInput(event.target.value))}
        onBlur={(event) => onBudgetChange(boundLightMonthlyBudget(currencyInput(event.currentTarget.value)))}
      />
      <input
        type="range"
        className="payment-calc__slider"
        min={LIGHT_MONTHLY_BUDGET_MIN}
        max={LIGHT_MONTHLY_BUDGET_MAX}
        step={LIGHT_MONTHLY_BUDGET_STEP}
        value={bounded}
        onChange={(event) => onBudgetChange(clampLightMonthlyBudget(numberInput(event.target.value)))}
        aria-label="Adjust monthly budget"
        style={getRangeInputStyle(bounded, LIGHT_MONTHLY_BUDGET_MIN, LIGHT_MONTHLY_BUDGET_MAX)}
      />
      <div className="payment-calc__ticks" aria-hidden="true">
        <span>{currency(LIGHT_MONTHLY_BUDGET_MIN)}</span>
        <span>{currency(LIGHT_MONTHLY_BUDGET_MAX)}</span>
      </div>
      <p id={helperId} className="payment-calc__note payment-calc__note--inline aio-payment__light-estimator-helper">
        We estimate a vehicle price near {currency(affordableMsrp)} before tax and fees.
      </p>
    </div>
  );
}

type LightWizardStepMeta = {
  routeSlug: LightWizardStepSlug;
  label: string;
  short: string;
  hint: string;
  panelTitle?: string;
  panelIntro?: string;
  panelEyebrowSuffix?: string;
};

const LIGHT_WIZARD_STEP_META: LightWizardStepMeta[] = [
  {
    routeSlug: 'goal',
    label: 'Set budget',
    short: 'Budget',
    hint: 'Start with the vehicle price you have in mind — or work backward from a monthly payment.',
    panelTitle: 'Choose your starting point',
    panelIntro: 'Start by choosing the vehicle price or monthly payment that feels comfortable. You can refine assumptions as you go.',
  },
  {
    routeSlug: 'loan',
    label: 'Set loan terms',
    short: 'Loan Terms',
    hint: 'Set down payment, APR, and how long you’ll finance.',
    panelTitle: 'Customize Your Loan',
    panelIntro: 'Adjust your down payment, APR, and term to refine your estimate.',
  },
  {
    routeSlug: 'vehicle',
    label: 'Choose vehicle',
    short: 'Vehicle',
    hint: 'Pick a year, make, and trim so the estimate has the right shopping context.',
    panelTitle: 'Pick a vehicle',
    panelIntro:
      'Know exactly what you want, or just have a vehicle type in mind? Either works. You can also skip this and refine it later.',
    panelEyebrowSuffix: ' · OPTIONAL',
  },
  {
    routeSlug: 'trade',
    label: 'Add trade and fees',
    short: 'Trade & Fees',
    hint: 'Rough numbers are fine here. You can refine with a dealer later.',
    panelTitle: 'Trade-in, taxes & fees',
    panelIntro: 'Add your trade-in details and state for a more accurate estimate.',
    panelEyebrowSuffix: ' · OPTIONAL',
  },
  {
    routeSlug: 'review',
    label: 'Review estimate',
    short: 'Estimate',
    hint: 'See estimated payments, total costs, and vehicles that fit your budget.',
    panelTitle: 'Your Personalized Estimate',
    panelIntro: "Here's what your budget supports, with the full cost breakdown below.",
  },
];

const LIGHT_WIZARD_STEP_ROUTE_BASE = '/auto-loan-calculator/light-steps';
const LIGHT_WIZARD_STEP_ROUTE_BASE_V2 = '/auto-loan-calculator/light-steps2';

const clampLightWizardStep = (step: number) => Math.min(LIGHT_WIZARD_STEP_META.length, Math.max(1, step));

const getLightWizardStepFromSlug = (stepSlug?: string) => {
  if (!stepSlug) return 1;
  const stepIndex = LIGHT_WIZARD_STEP_META.findIndex((stepMeta) => stepMeta.routeSlug === stepSlug);
  return stepIndex >= 0 ? stepIndex + 1 : 1;
};

const getLightWizardStepPath = (step: number, routeBase = LIGHT_WIZARD_STEP_ROUTE_BASE) => {
  const stepMeta = LIGHT_WIZARD_STEP_META[clampLightWizardStep(step) - 1];
  return `${routeBase}/${stepMeta.routeSlug}`;
};

const LIGHT_WIZARD_ARROW_KEY_SKIP_SELECTOR = [
  'input',
  'textarea',
  'select',
  'button',
  'a[href]',
  '[role="button"]',
  '[role="link"]',
  '[role="slider"]',
  '[contenteditable="true"]',
  '[contenteditable]',
].join(',');

const shouldSkipLightWizardArrowNavigation = (target: EventTarget | null) => {
  if (!(target instanceof Element)) return false;
  return Boolean(target.closest(LIGHT_WIZARD_ARROW_KEY_SKIP_SELECTOR));
};

const CAR_AND_DRIVER_ADVANTAGE_ITEMS = [
  {
    title: 'Budget-First Guidance',
    image: '/calculator-advantage/budget-first-guidance.jpg',
    alt: 'Car shopper reviewing budget guidance with a dealer',
  },
  {
    title: 'Taxes, Fees, and Trade-In Context',
    image: '/calculator-advantage/taxes-fees-trade-context.jpg',
    alt: 'Car buyer reviewing taxes and fees paperwork',
  },
  {
    title: 'Personalized Recommendations for Your Budget',
    image: '/calculator-advantage/personalized-recommendations.jpg?v=personalized-budget',
    alt: 'Car shoppers comparing personalized vehicle recommendations',
  },
];

const LIGHT_APR_GUIDANCE_TIERS = [
  { label: 'Excellent credit', score: '(740–900)', range: '~4–7%', maxApr: 7 },
  { label: 'Very Good credit', score: '(700–739)', range: '~6–8%', maxApr: 8 },
  { label: 'Good credit', score: '(670–699)', range: '~8–10%', maxApr: 10 },
  { label: 'Fair credit', score: '(630–669)', range: '~10–15%', maxApr: 15 },
  { label: 'Rebuilding credit', score: '(580–629)', range: '~15%+', maxApr: Number.POSITIVE_INFINITY },
];

const getLightAprGuidanceTier = (value: number) => {
  if (!Number.isFinite(value)) return null;
  const apr = clampLightApr(value);
  return LIGHT_APR_GUIDANCE_TIERS.find((tier) => apr <= tier.maxApr) ?? LIGHT_APR_GUIDANCE_TIERS[LIGHT_APR_GUIDANCE_TIERS.length - 1] ?? null;
};

const getLightLoanTermWarning = (loanTerm: number) => {
  if (loanTerm >= 84) {
    return '84-month loans can lower the monthly payment, but they usually keep you in debt longer and raise the chance of owing more than the vehicle is worth.';
  }

  if (loanTerm >= 72) {
    return 'Longer loans lower the monthly payment, but they can increase total interest and negative-equity risk.';
  }

  return null;
};

interface LightLoanTermsStepPanelProps {
  downPayment: number;
  onDownPaymentChange: (next: number) => void;
  activeApr: number;
  customApr: number;
  onCustomAprChange: (next: number) => void;
  aprLocked: boolean;
  loanTerm: number;
  onLoanTermChange: (next: number) => void;
  termChipOptions: number[];
  usesMonthlyBudgetMode: boolean;
}

function LightLoanTermsStepPanel({
  downPayment,
  onDownPaymentChange,
  activeApr,
  customApr,
  onCustomAprChange,
  aprLocked,
  loanTerm,
  onLoanTermChange,
  termChipOptions,
  usesMonthlyBudgetMode,
}: LightLoanTermsStepPanelProps) {
  const downId = useId();
  const aprId = useId();
  const downPaymentGuidanceId = useId();
  const aprGuidanceId = useId();
  const aprQualityId = useId();
  const loanTermGuidanceId = useId();
  const downClamped = clampLightDownPayment(downPayment);
  const downPaymentDisplayValue = numberWithCommas(downClamped);
  const [downPaymentInputDraft, setDownPaymentInputDraft] = useState<string | null>(null);
  const downPaymentInputValue = downPaymentInputDraft ?? downPaymentDisplayValue;
  const aprSliderValue = aprLocked ? activeApr : clampLightAprSlider(customApr);
  const customAprDisplayValue = clampLightApr(customApr).toFixed(APR_INPUT_DECIMAL_PLACES);
  const [aprInputDraft, setAprInputDraft] = useState<string | null>(null);
  const aprInputValue = aprInputDraft ?? customAprDisplayValue;
  const aprQualityTier = aprInputValue.trim() === '' ? null : getLightAprGuidanceTier(numberInput(aprInputValue));
  const loanTermWarning = getLightLoanTermWarning(loanTerm);

  const handleDownPaymentInputChange = (value: string) => {
    const nextValue = normalizeMoneyInputValue(value);
    setDownPaymentInputDraft(nextValue);

    if (nextValue.trim() === '') return;

    onDownPaymentChange(clampLightDownPayment(currencyInput(nextValue)));
  };

  const handleDownPaymentInputBlur = () => {
    const nextDownPayment = downPaymentInputValue.trim() === ''
      ? LIGHT_DOWN_PAYMENT_MIN
      : clampLightDownPayment(currencyInput(downPaymentInputValue));
    onDownPaymentChange(nextDownPayment);
    setDownPaymentInputDraft(null);
  };

  const handleAprInputChange = (value: string) => {
    const nextValue = normalizeAprInputValue(value);
    setAprInputDraft(nextValue);

    if (nextValue.trim() === '') return;

    const nextApr = Number(nextValue);
    if (Number.isFinite(nextApr)) {
      onCustomAprChange(clampLightApr(nextApr));
    }
  };

  const handleAprInputBlur = () => {
    const nextApr = aprInputValue.trim() === ''
      ? clampLightApr(customApr)
      : clampLightApr(numberInput(aprInputValue));
    onCustomAprChange(nextApr);
    setAprInputDraft(null);
  };

  return (
    <div className="payment-calc__section payment-calc__section--pad aio-payment__light-loan-step">
      <div className="payment-calc__field payment-calc__field--full">
        <div className="payment-calc__row-label">
          <div className="aio-payment__light-label-with-help">
            <label htmlFor={downId}>
              Down payment
            </label>
            {renderLightGuidanceTooltip({
              id: downPaymentGuidanceId,
              title: 'Down payment',
              copy: 'Money paid upfront that reduces the amount you finance.',
              ariaLabel: 'Down payment guidance',
            })}
          </div>
          <span aria-live="polite">
            {currency(downClamped)}
          </span>
        </div>
        <div className="aio-payment__light-money-input">
          <span className="aio-payment__light-money-input-prefix" aria-hidden="true">$</span>
          <input
            id={downId}
            type="text"
            inputMode="numeric"
            pattern="[0-9,]*"
            className="payment-calc__input aio-payment__light-money-input-control"
            value={downPaymentInputValue}
            onFocus={(event) => {
              setDownPaymentInputDraft(String(downClamped));
              selectCalculatorInputValueOnFocus(event);
            }}
            onChange={(event) => handleDownPaymentInputChange(event.target.value)}
            onBlur={handleDownPaymentInputBlur}
          />
        </div>
        <input
          type="range"
          className="payment-calc__slider"
          min={LIGHT_DOWN_PAYMENT_MIN}
          max={LIGHT_DOWN_PAYMENT_MAX}
          step={LIGHT_DOWN_PAYMENT_STEP}
          value={downClamped}
          onChange={(event) => onDownPaymentChange(clampLightDownPayment(numberInput(event.target.value)))}
          aria-label="Adjust down payment"
          style={getRangeInputStyle(downClamped, LIGHT_DOWN_PAYMENT_MIN, LIGHT_DOWN_PAYMENT_MAX)}
        />
        <div className="payment-calc__ticks" aria-hidden="true">
          <span>{currency(LIGHT_DOWN_PAYMENT_MIN)}</span>
          <span>{currency(LIGHT_DOWN_PAYMENT_MAX)}</span>
        </div>
      </div>

      <div className="payment-calc__field payment-calc__field--full">
        <div className="payment-calc__row-label">
          <div className="aio-payment__light-label-with-help">
            {aprLocked ? (
              <span className="aio-payment__light-label-text">Interest rate (APR)</span>
            ) : (
              <label htmlFor={aprId}>
                Interest rate (APR)
              </label>
            )}
            <LightGuidanceTooltip
              id={aprGuidanceId}
              title="Typical APR planning ranges"
              ariaLabel="Typical APR planning ranges"
              compact={false}
            >
              <span className="aio-payment__light-loan-guidance-list" role="list">
                {LIGHT_APR_GUIDANCE_TIERS.map((tier) => (
                  <span className="aio-payment__light-loan-guidance-list-row" role="listitem" key={tier.label}>
                    <span className="aio-payment__light-loan-guidance-list-term">
                      <span>{tier.label}</span>
                      <small>{tier.score}</small>
                    </span>
                    <span className="aio-payment__light-loan-guidance-list-value">{tier.range}</span>
                  </span>
                ))}
              </span>
              <span className="aio-payment__light-loan-guidance-note">
                The estimated annual interest rate for your loan. Your actual rate may vary based on credit approval.
              </span>
            </LightGuidanceTooltip>
          </div>
          <span aria-live="polite">
            {formatAprPercent(activeApr)}
          </span>
        </div>
        {!aprLocked ? (
          <>
            <div
              className="aio-payment__light-percent-input"
              style={{ '--aio-light-percent-value-width': `${Math.max(aprInputValue.length, customAprDisplayValue.length)}ch` } as CSSProperties}
            >
              <input
                id={aprId}
                type="text"
                inputMode="decimal"
                pattern="[0-9.]*"
                className="payment-calc__input aio-payment__light-percent-input-control"
                min={LIGHT_APR_SLIDER_MIN}
                max={LIGHT_APR_SLIDER_MAX}
                step={LIGHT_APR_INPUT_STEP}
                aria-describedby={aprQualityTier ? aprQualityId : undefined}
                value={aprInputValue}
                onFocus={(event) => {
                  setAprInputDraft(customAprDisplayValue);
                  selectCalculatorInputValueOnFocus(event);
                }}
                onChange={(event) => handleAprInputChange(event.target.value)}
                onBlur={handleAprInputBlur}
              />
              <span className="aio-payment__light-percent-input-suffix" aria-hidden="true">%</span>
              {aprQualityTier ? (
                <span id={aprQualityId} className="aio-payment__light-percent-input-quality" aria-live="polite">
                  ({toTitleCase(aprQualityTier.label)})
                </span>
              ) : null}
            </div>
            <input
              type="range"
              className="payment-calc__slider"
              min={LIGHT_APR_SLIDER_MIN}
              max={LIGHT_APR_SLIDER_MAX}
              step={LIGHT_APR_SLIDER_STEP}
              value={aprSliderValue}
              onChange={(event) => onCustomAprChange(clampLightAprSlider(numberInput(event.target.value)))}
              aria-label="Adjust interest rate"
              style={getRangeInputStyle(aprSliderValue, LIGHT_APR_SLIDER_MIN, LIGHT_APR_SLIDER_MAX)}
            />
            <div className="payment-calc__ticks" aria-hidden="true">
              <span>0%</span>
              <span>20%</span>
            </div>
          </>
        ) : (
          <p className="payment-calc__note payment-calc__note--inline">
            APR follows the selected finance deal. Choose &quot;Custom rate&quot; in review to edit.
          </p>
        )}
        {usesMonthlyBudgetMode ? (
          <p className="aio-payment__light-loan-mode-note" role="note">
            <Info size={18} strokeWidth={2.25} aria-hidden="true" />
            <span>
              Because your monthly budget stays fixed, a lower APR can increase the vehicle price your budget supports
              instead of lowering the monthly payment.
            </span>
          </p>
        ) : null}
      </div>

      <div className="payment-calc__field payment-calc__field--full">
        <div className="payment-calc__lab aio-payment__light-label-with-help" id={`${downId}-terms`}>
          <span>Loan term</span>
          {renderLightGuidanceTooltip({
            id: loanTermGuidanceId,
            title: 'Loan term',
            copy: 'The length of the loan. Longer terms may lower monthly payments but increase total interest.',
            ariaLabel: 'Loan term guidance',
          })}
        </div>
        <div
          className="payment-calc__terms"
          role="group"
          aria-labelledby={`${downId}-terms`}
          aria-label="Loan term in months"
        >
          {termChipOptions.map((months) => (
            <button
              key={months}
              type="button"
              className={`payment-calc__pill${loanTerm === months ? ' payment-calc__pill--on' : ''}`}
              onClick={() => onLoanTermChange(months)}
            >
              {months} mo
            </button>
          ))}
        </div>
        {loanTermWarning ? (
          <p className="aio-payment__light-loan-warning" role="status">
            <AlertTriangle size={18} strokeWidth={2.25} aria-hidden="true" />
            <span>{loanTermWarning}</span>
          </p>
        ) : null}
      </div>
    </div>
  );
}

interface AllInOnePaymentCalculatorPageProps {
  variant?: 'classic' | 'budget-first' | 'light' | 'light-steps' | 'light-steps2';
}

function LightListboxSelect({
  label,
  labelHelp,
  value,
  options,
  onChange,
  placeholder,
  wrapperClassName = '',
  disabled = false,
}: {
  label: ReactNode;
  labelHelp?: ReactNode;
  value: string;
  options: LightListboxSelectOption[];
  onChange: (value: string) => void;
  placeholder?: string;
  wrapperClassName?: string;
  disabled?: boolean;
}) {
  const generatedId = useId();
  const triggerId = `${generatedId}-trigger`;
  const listboxId = `${generatedId}-listbox`;
  const selectedIndex = options.findIndex((option) => option.value === value);
  const selectedOption = selectedIndex >= 0 ? options[selectedIndex] : undefined;
  const firstEnabledIndex = Math.max(0, options.findIndex((option) => !option.disabled));
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(selectedIndex >= 0 ? selectedIndex : firstEnabledIndex);
  const activeOptionRef = useRef<HTMLButtonElement | null>(null);
  const selectedOrFirstEnabledIndex = selectedIndex >= 0 ? selectedIndex : firstEnabledIndex;

  useEffect(() => {
    if (!isOpen) return;
    activeOptionRef.current?.scrollIntoView({ block: 'nearest' });
  }, [activeIndex, isOpen]);

  const getNextEnabledIndex = (startIndex: number, direction: 1 | -1) => {
    if (!options.length) return 0;

    for (let offset = 1; offset <= options.length; offset += 1) {
      const nextIndex = (startIndex + direction * offset + options.length) % options.length;
      if (!options[nextIndex]?.disabled) return nextIndex;
    }

    return startIndex;
  };

  const selectOption = (index: number) => {
    const option = options[index];
    if (!option || option.disabled) return;

    onChange(option.value);
    setIsOpen(false);
  };

  const handleTriggerKeyDown = (event: ReactKeyboardEvent<HTMLButtonElement>) => {
    if (disabled) return;

    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      if (!isOpen) {
        setActiveIndex(selectedOrFirstEnabledIndex);
        setIsOpen(true);
        return;
      }
      setActiveIndex((current) => getNextEnabledIndex(current, event.key === 'ArrowDown' ? 1 : -1));
      return;
    }

    if (event.key === 'Home') {
      event.preventDefault();
      setIsOpen(true);
      setActiveIndex(firstEnabledIndex);
      return;
    }

    if (event.key === 'End') {
      event.preventDefault();
      setIsOpen(true);
      setActiveIndex(Math.max(0, options.map((option, index) => (option.disabled ? -1 : index)).filter((index) => index >= 0).pop() ?? firstEnabledIndex));
      return;
    }

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      if (isOpen) {
        selectOption(activeIndex);
        return;
      }
      setActiveIndex(selectedOrFirstEnabledIndex);
      setIsOpen(true);
      return;
    }

    if (event.key === 'Escape') {
      setIsOpen(false);
    }
  };

  return (
    <div
      className={`text-field text-field--select aio-payment__light-listbox-select ${wrapperClassName}`}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setIsOpen(false);
        }
      }}
    >
      <div className="text-field__label-row">
        <label id={`${generatedId}-label`} className="text-field__label" htmlFor={triggerId}>
          {label}
        </label>
        {labelHelp}
      </div>
      <div className="aio-payment__light-listbox-select__control">
        <button
          id={triggerId}
          type="button"
          className={`aio-payment__light-listbox-select__trigger ${selectedOption ? '' : 'aio-payment__light-listbox-select__trigger--placeholder'}`}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-controls={listboxId}
          aria-labelledby={`${generatedId}-label ${triggerId}`}
          aria-activedescendant={isOpen ? `${listboxId}-option-${activeIndex}` : undefined}
          disabled={disabled}
          onClick={() => {
            if (!isOpen) setActiveIndex(selectedOrFirstEnabledIndex);
            setIsOpen((current) => !current);
          }}
          onKeyDown={handleTriggerKeyDown}
        >
          <span className="aio-payment__light-listbox-select__trigger-copy">
            <span className="aio-payment__light-listbox-select__trigger-label">
              {selectedOption?.label ?? placeholder ?? 'Select an option'}
            </span>
            {selectedOption?.statusLabel ? (
              <span className={`aio-payment__light-listbox-select__status aio-payment__light-listbox-select__status--${selectedOption.statusTone ?? 'neutral'}`}>
                {selectedOption.triggerStatusLabel ?? selectedOption.statusLabel}
              </span>
            ) : null}
          </span>
          <ChevronDown size={20} strokeWidth={2.25} aria-hidden="true" />
        </button>
        {isOpen && (
          <div id={listboxId} className="aio-payment__light-listbox-select__menu" role="listbox" aria-labelledby={`${generatedId}-label`}>
            {options.length > 0 ? options.map((option, index) => {
              const isSelected = option.value === value;
              const isActive = index === activeIndex;
              return (
                <button
                  key={option.value}
                  id={`${listboxId}-option-${index}`}
                  ref={isActive ? activeOptionRef : undefined}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  className={`aio-payment__light-listbox-select__option${isActive ? ' aio-payment__light-listbox-select__option--active' : ''}${isSelected ? ' aio-payment__light-listbox-select__option--selected' : ''}`}
                  disabled={option.disabled}
                  onMouseDown={(event) => event.preventDefault()}
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => selectOption(index)}
                >
                  <span className="aio-payment__light-listbox-select__option-copy">
                    <span className="aio-payment__light-listbox-select__option-label">{option.label}</span>
                    {option.helper ? (
                      <span className="aio-payment__light-listbox-select__option-helper">{option.helper}</span>
                    ) : null}
                  </span>
                  <span className="aio-payment__light-listbox-select__option-actions">
                    {option.statusLabel ? (
                      <span className={`aio-payment__light-listbox-select__status aio-payment__light-listbox-select__status--${option.statusTone ?? 'neutral'}`}>
                        {option.statusValue && option.statusQualifier ? (
                          <>
                            <span className="aio-payment__light-listbox-select__status-value">{option.statusValue}</span>
                            <span className="aio-payment__light-listbox-select__status-qualifier">{option.statusQualifier}</span>
                          </>
                        ) : option.statusLabel}
                      </span>
                    ) : null}
                    {isSelected ? <Check className="aio-payment__light-listbox-select__option-check" size={16} strokeWidth={2.5} aria-hidden="true" /> : null}
                  </span>
                </button>
              );
            }) : (
              <span className="aio-payment__light-listbox-select__empty" role="option" aria-selected="false">
                No options available
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

const AllInOnePaymentCalculatorPage = ({ variant = 'classic' }: AllInOnePaymentCalculatorPageProps) => {
  const isBudgetFirstVariant = variant === 'budget-first';
  const isLightSteps2Variant = variant === 'light-steps2';
  const isLightStepsVariant = variant === 'light-steps' || isLightSteps2Variant;
  const isLightVariant = variant === 'light' || isLightStepsVariant;
  const lightWizardStepRouteBase = isLightSteps2Variant ? LIGHT_WIZARD_STEP_ROUTE_BASE_V2 : LIGHT_WIZARD_STEP_ROUTE_BASE;
  const { stepSlug } = useParams<{ stepSlug?: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const vehicles = useMemo(() => getAllVehicles(), []);
  const stateRules = useMemo(() => buildStateRules(), []);
  const userAreaStateCode = useMemo(
    () => getUserAreaStateCode(user),
    [user?.budgetPreferences?.stateCode, user?.location],
  );
  const routeLightWizardStep = isLightStepsVariant ? getLightWizardStepFromSlug(stepSlug) : 1;
  const defaultVehicle = vehicles.find((vehicle) => vehicle.make === 'Honda' && vehicle.model === 'CR-V') ?? vehicles[0];

  const [condition, setCondition] = useState<VehicleCondition>('new');
  const [selectedSlug, setSelectedSlug] = useState(defaultVehicle.slug);
  const [selectedYear, setSelectedYear] = useState(defaultVehicle.year);
  const [startMode, setStartMode] = useState<PurchaseStartMode>(() => isLightVariant ? 'price' : 'monthly');
  const [price, setPrice] = useState(() => (isLightVariant ? LIGHT_DEFAULT_VEHICLE_PRICE : defaultVehicle.priceMin));
  const [selectedTrimId, setSelectedTrimId] = useState<string | null>(null);
  const [targetMonthlyPayment, setTargetMonthlyPayment] = useState(550);
  const [downPayment, setDownPayment] = useState(() => (isLightVariant ? getDefaultLightDownPayment(LIGHT_DEFAULT_VEHICLE_PRICE) : 4000));
  const [tradeInValue, setTradeInValue] = useState(0);
  const [amountOwed, setAmountOwed] = useState(0);
  const [selectedCashIds, setSelectedCashIds] = useState<string[]>([]);
  const [selectedFinanceId, setSelectedFinanceId] = useState('custom');
  const [customApr, setCustomApr] = useState(() => (isLightVariant ? LIGHT_DEFAULT_NEW_APR : 6.9));
  const [loanTerm, setLoanTerm] = useState(60);
  const [leaseEstimatorMode, setLeaseEstimatorMode] = useState<LeaseEstimatorMode>('lease');
  const [leaseMsrp, setLeaseMsrp] = useState(defaultVehicle.priceMin);
  const [leaseTerm, setLeaseTerm] = useState(36);
  const [leaseAnnualMileage, setLeaseAnnualMileage] = useState(12000);
  const [leaseMoneyFactor, setLeaseMoneyFactor] = useState(0.0025);
  const [leaseResidualPercent, setLeaseResidualPercent] = useState(58);
  const [leaseDueAtSigning, setLeaseDueAtSigning] = useState(3000);
  const [leaseFees, setLeaseFees] = useState(1095);
  const [buyoutPrice, setBuyoutPrice] = useState(Math.round(defaultVehicle.priceMin * 0.58));
  const [buyoutDownPayment, setBuyoutDownPayment] = useState(1000);
  const [buyoutApr, setBuyoutApr] = useState(7.2);
  const [buyoutTerm, setBuyoutTerm] = useState(60);
  const [stateCode, setStateCode] = useState(userAreaStateCode ?? DEFAULT_STATE_VEHICLE_TAX.code);
  const [salesTaxOverride, setSalesTaxOverride] = useState('');
  const [lightSalesTaxPercentOverride, setLightSalesTaxPercentOverride] = useState('');
  const [feesOverride, setFeesOverride] = useState('');
  const [dealerFeesOverride, setDealerFeesOverride] = useState('');
  const [estimatedFeesOverride, setEstimatedFeesOverride] = useState('');
  const [includeTaxesAndFeesInLoan, setIncludeTaxesAndFeesInLoan] = useState(true);
  const [includeExtendedWarranty, setIncludeExtendedWarranty] = useState(false);
  const [extendedWarrantyCost, setExtendedWarrantyCost] = useState(DEFAULT_EXTENDED_WARRANTY_COST);
  const [hasEditedExtendedWarrantyCost, setHasEditedExtendedWarrantyCost] = useState(false);
  const [includeInsuranceEstimate, setIncludeInsuranceEstimate] = useState(false);
  const [monthlyInsuranceEstimate, setMonthlyInsuranceEstimate] = useState(DEFAULT_MONTHLY_INSURANCE_ESTIMATE);
  const [hasEditedMonthlyInsuranceEstimate, setHasEditedMonthlyInsuranceEstimate] = useState(false);
  const [showTradeTool, setShowTradeTool] = useState(false);
  const [tradeVehicle, setTradeVehicle] = useState('2020 Honda CR-V');
  const [tradeMileage, setTradeMileage] = useState(52000);
  const [tradeCondition, setTradeCondition] = useState<TradeCondition>('average');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [showIncentiveModal, setShowIncentiveModal] = useState(false);
  const [showAiDealAnalysis, setShowAiDealAnalysis] = useState(false);
  const [selectedIncentive, setSelectedIncentive] = useState<Incentive | null>(null);
  const summaryRef = useRef<HTMLElement>(null);
  const hasAdjustedStateCodeRef = useRef(false);
  const hasAdjustedLightDownPaymentRef = useRef(false);
  const hasAdjustedLightAprRef = useRef(false);
  const affordableCarouselRef = useRef<HTMLDivElement>(null);
  const lightBodyStyleCarouselRef = useRef<HTMLDivElement>(null);
  const shoppingToolsRef = useRef<HTMLDivElement>(null);
  const lightAffordableSectionRef = useRef<HTMLElement>(null);
  const lightWizardShellRef = useRef<HTMLDivElement>(null);
  const lightWizardPanelRef = useRef<HTMLDivElement>(null);
  const [affordableCarouselState, setAffordableCarouselState] = useState({ canScrollPrevious: false, canScrollNext: false });
  const [lightBodyStyleCarouselState, setLightBodyStyleCarouselState] = useState({ canScrollPrevious: false, canScrollNext: false });
  const [showMobileSummary, setShowMobileSummary] = useState(false);
  const [lightWizardStepMotion, setLightWizardStepMotion] = useState<LightWizardStepMotion>('none');
  const lightWizardStep = routeLightWizardStep;
  const lightWizardStepPrevRef = useRef(lightWizardStep);
  const lightWizardPathPrevRef = useRef(location.pathname);
  const lightVehicleBodyStyleHeadingId = useId();
  const lightVehicleBodyStyleGuidanceId = useId();
  const lightVehicleConditionGuidanceId = useId();
  const lightVehicleSearchInputId = useId();
  const lightVehicleSearchGuidanceId = useId();
  const lightVehicleSearchListId = useId();
  const lightBreakdownLabelId = useId();
  const lightBreakdownGuidanceId = useId();
  const lightWorkingPriceGuidanceId = useId();
  const lightReviewTaxesFeesGuidanceId = useId();
  const lightReviewDownPaymentGuidanceId = useId();
  const lightReviewMonthlyPaymentGuidanceId = useId();
  const lightFinanceChargeGuidanceId = useId();
  const lightReviewLoanPaymentsGuidanceId = useId();
  const lightTotalPaidGuidanceId = useId();
  const lightTradeSalesTaxPercentFieldId = useId();
  const lightTradeValueGuidanceId = useId();
  const lightAmountOwedGuidanceId = useId();
  const lightSalesTaxGuidanceId = useId();
  const lightRegistrationFeesGuidanceId = useId();
  const lightStateGuidanceId = useId();
  const lightCategoryBudgetInputId = useId();
  const lightEstimateTotalsId = useId();
  const lightMarketplaceHandoffId = useId();
  const lightMarketplaceHandoffTitleId = useId();
  const [lightEstimateEmail, setLightEstimateEmail] = useState('');
  const [lightEstimateEmailError, setLightEstimateEmailError] = useState<string | undefined>();
  const [lightEstimateEmailStatus, setLightEstimateEmailStatus] = useState<string | undefined>();
  const [isLightEstimateEmailSending, setIsLightEstimateEmailSending] = useState(false);
  const [lightVehicleStepMode, setLightVehicleStepMode] = useState<'known' | 'browsing'>('known');
  const [lightKnownVehicleSelected, setLightKnownVehicleSelected] = useState(() => !isLightVariant);
  const [lightVehicleDraft, setLightVehicleDraft] = useState<LightVehicleDraft>(() => ({
    year: isLightVariant ? '' : defaultVehicle.year,
    make: isLightVariant ? '' : defaultVehicle.make,
    model: isLightVariant ? '' : defaultVehicle.model,
  }));
  const [lightVehicleSearchQuery, setLightVehicleSearchQuery] = useState(() =>
    isLightVariant ? '' : formatLightVehicleSearchLabel(defaultVehicle),
  );
  const [showLightVehicleSearchSuggestions, setShowLightVehicleSearchSuggestions] = useState(false);
  const [lightVehicleSearchActiveIndex, setLightVehicleSearchActiveIndex] = useState(0);
  const [lightBrowseBodyStyle, setLightBrowseBodyStyle] = useState('SUV');
  const [lightCategoryBudgetInputDraft, setLightCategoryBudgetInputDraft] = useState<string | null>(null);
  const [lightAffordableOffersSlug, setLightAffordableOffersSlug] = useState<string | null>(null);
  const [lightDealModalVehicle, setLightDealModalVehicle] = useState<Vehicle | null>(null);
  const [showLightMobileTotals, setShowLightMobileTotals] = useState(false);
  const canUseCatalogPrice = condition === 'new';
  const syncCatalogPrice = useCallback((nextCatalogPrice: number) => {
    if (!isLightVariant) {
      setPrice(nextCatalogPrice);
    }
    setLeaseMsrp(nextCatalogPrice);
    setBuyoutPrice(Math.round(nextCatalogPrice * 0.58));
  }, [isLightVariant]);
  const handleLightDownPaymentChange = useCallback((nextDownPayment: number) => {
    hasAdjustedLightDownPaymentRef.current = true;
    setDownPayment(clampLightDownPayment(nextDownPayment));
  }, []);
  const handleLightCustomAprChange = useCallback((nextApr: number) => {
    hasAdjustedLightAprRef.current = true;
    setCustomApr(clampLightApr(nextApr));
  }, []);
  const handlePriceChange = useCallback((nextPrice: number) => {
    setPrice(nextPrice);
    if (isLightVariant && !hasAdjustedLightDownPaymentRef.current) {
      setDownPayment(getDefaultLightDownPayment(boundLightVehiclePrice(nextPrice)));
    }
  }, [isLightVariant]);
  const handleStateCodeChange = useCallback((nextStateCode: string) => {
    hasAdjustedStateCodeRef.current = true;
    setStateCode(nextStateCode);
    setSalesTaxOverride('');
    setLightSalesTaxPercentOverride('');
  }, []);

  useEffect(() => {
    if (!userAreaStateCode || hasAdjustedStateCodeRef.current) return;
    setStateCode(userAreaStateCode);
  }, [userAreaStateCode]);

  const goToLightWizardStep = useCallback((step: number, options?: { replace?: boolean }) => {
    const nextStep = clampLightWizardStep(step);
    if (nextStep !== lightWizardStep) {
      setLightWizardStepMotion(nextStep > lightWizardStep ? 'forward' : 'backward');
    }

    if (!isLightStepsVariant) return;

    const nextPath = getLightWizardStepPath(nextStep, lightWizardStepRouteBase);
    if (location.pathname === nextPath) return;

    navigate(
      {
        pathname: nextPath,
        search: location.search,
        hash: location.hash,
      },
      { replace: options?.replace ?? false },
    );
  }, [isLightStepsVariant, lightWizardStep, lightWizardStepRouteBase, location.hash, location.pathname, location.search, navigate]);

  useEffect(() => {
    if (!isLightStepsVariant) return undefined;

    const handleLightWizardArrowNavigation = (event: KeyboardEvent) => {
      if (
        event.defaultPrevented ||
        event.altKey ||
        event.ctrlKey ||
        event.metaKey ||
        event.shiftKey ||
        (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') ||
        shouldSkipLightWizardArrowNavigation(event.target) ||
        document.querySelector('[aria-modal="true"]')
      ) {
        return;
      }

      const nextStep = lightWizardStep + (event.key === 'ArrowRight' ? 1 : -1);

      if (nextStep < 1 || nextStep > LIGHT_WIZARD_STEP_META.length) {
        return;
      }

      event.preventDefault();
      goToLightWizardStep(nextStep);
    };

    window.addEventListener('keydown', handleLightWizardArrowNavigation);
    return () => window.removeEventListener('keydown', handleLightWizardArrowNavigation);
  }, [goToLightWizardStep, isLightStepsVariant, lightWizardStep]);

  useEffect(() => {
    if (!isLightStepsVariant) return;

    const routeStep = getLightWizardStepFromSlug(stepSlug);
    if (!stepSlug) return;

    const expectedPath = getLightWizardStepPath(routeStep, lightWizardStepRouteBase);
    if (location.pathname === expectedPath) return;

    navigate(
      {
        pathname: expectedPath,
        search: location.search,
        hash: location.hash,
      },
      { replace: true },
    );
  }, [isLightStepsVariant, lightWizardStepRouteBase, location.hash, location.pathname, location.search, navigate, stepSlug]);

  const selectedVehicle = useMemo(
    () => vehicles.find((vehicle) => vehicle.slug === selectedSlug) ?? defaultVehicle,
    [defaultVehicle, selectedSlug, vehicles],
  );
  const selectedVehiclePageHref = `/${selectedVehicle.slug}`;
  const lightVehicleYearValue = lightKnownVehicleSelected ? selectedYear : lightVehicleDraft.year;
  const lightVehicleMakeValue = lightKnownVehicleSelected ? selectedVehicle.make : lightVehicleDraft.make;
  const lightVehicleModelValue = lightKnownVehicleSelected ? selectedVehicle.model : lightVehicleDraft.model;
  const lightVehicleSearchOptions = useMemo<LightVehicleSearchOption[]>(() => {
    const options: LightVehicleSearchOption[] = [];
    const seenLabels = new Set<string>();
    const addOption = (vehicle: Vehicle, year: string) => {
      const label = formatLightVehicleSearchLabel({ year, make: vehicle.make, model: vehicle.model });
      const searchText = normalizeVehicleMatch(label);
      if (seenLabels.has(searchText)) return;

      seenLabels.add(searchText);
      options.push({
        key: `${year}-${vehicle.slug}`,
        label,
        searchText,
        makeModelSearchText: normalizeVehicleMatch(`${vehicle.make} ${vehicle.model}`),
        year,
        vehicle,
      });
    };

    if (condition === 'used') {
      const representativeVehicles = new Map<string, Vehicle>();
      vehicles.forEach((vehicle) => {
        const makeModel = normalizeVehicleMatch(`${vehicle.make} ${vehicle.model}`);
        if (!representativeVehicles.has(makeModel)) {
          representativeVehicles.set(makeModel, vehicle);
        }
      });

      USED_YEAR_OPTIONS.forEach((year) => {
        representativeVehicles.forEach((vehicle) => addOption(vehicle, year));
      });
    } else {
      vehicles.forEach((vehicle) => addOption(vehicle, vehicle.year));
    }

    return options.sort((a, b) => (
      Number(b.year) - Number(a.year) ||
      a.vehicle.make.localeCompare(b.vehicle.make) ||
      a.vehicle.model.localeCompare(b.vehicle.model)
    ));
  }, [condition, vehicles]);
  const lightVehicleSearchSuggestions = useMemo(() => {
    const query = normalizeVehicleMatch(lightVehicleSearchQuery);
    const suggestions = query
      ? lightVehicleSearchOptions.filter((option) => (
        option.searchText.includes(query) ||
        option.makeModelSearchText.includes(query)
      ))
      : lightVehicleSearchOptions;

    return suggestions.slice(0, 80);
  }, [lightVehicleSearchOptions, lightVehicleSearchQuery]);
  const isLightVehicleSearchMenuOpen = (
    showLightVehicleSearchSuggestions &&
    lightVehicleStepMode === 'known' &&
    lightVehicleSearchSuggestions.length > 0
  );
  const lightVehicleActiveSuggestionId = isLightVehicleSearchMenuOpen
    ? `${lightVehicleSearchListId}-option-${lightVehicleSearchActiveIndex}`
    : undefined;
  const getLightVehicleSearchOption = useCallback((value: string) => {
    const query = normalizeVehicleMatch(value);
    if (query.length < 3) return undefined;

    return lightVehicleSearchOptions.find((option) => option.searchText === query)
      ?? lightVehicleSearchOptions.find((option) => option.makeModelSearchText === query);
  }, [lightVehicleSearchOptions]);
  const lightTradeVehicleMatch = useMemo(() => {
    const query = normalizeVehicleMatch(tradeVehicle);
    if (query.length < 3) return undefined;

    return vehicles.find((vehicle) => {
      const makeModel = normalizeVehicleMatch(`${vehicle.make} ${vehicle.model}`);
      const fullVehicleName = normalizeVehicleMatch(`${vehicle.year} ${vehicle.make} ${vehicle.model}`);

      return makeModel === query || query.includes(makeModel) || fullVehicleName === query || fullVehicleName.includes(query);
    });
  }, [tradeVehicle, vehicles]);
  const lightTradeVehicleLabel = tradeVehicle.trim() || 'Trade-in vehicle';
  const lightTradeVehicleImage = lightTradeVehicleMatch?.image;
  const lightHasVehicleSelection = !isLightVariant || lightVehicleStepMode === 'browsing' || lightKnownVehicleSelected;
  const lightHasSpecificVehicleSelection = !isLightVariant || lightKnownVehicleSelected;
  const availableTrimStyleOptions = useMemo<LightTrimStyleOption[]>(() => {
    if (isLightVariant && lightVehicleStepMode === 'known' && !lightKnownVehicleSelected) {
      return [];
    }

    const trims = getVehicleTrims(
      selectedVehicle.make,
      selectedVehicle.model,
      selectedVehicle.priceMin,
      selectedVehicle.priceMax,
    );

    return trims.map((trim, index) => {
      const parsedTrimPrice = parseMoney(trim.price);
      const trimPrice = index === 0 ? selectedVehicle.priceMin : parsedTrimPrice || selectedVehicle.priceMin;

      return {
        value: getTrimOptionValue(selectedVehicle, trim),
        label: getTrimOptionLabel(selectedVehicle, trim, trimPrice, canUseCatalogPrice),
        trimId: trim.id,
        trimName: trim.name,
        price: trimPrice,
      };
    });
  }, [
    canUseCatalogPrice,
    isLightVariant,
    lightKnownVehicleSelected,
    lightVehicleStepMode,
    selectedVehicle.make,
    selectedVehicle.model,
    selectedVehicle.priceMax,
    selectedVehicle.priceMin,
    selectedVehicle.slug,
    selectedVehicle.bodyStyle,
    selectedVehicle.drivetrain,
  ]);
  const selectedTrimStyleOption = useMemo(
    () => availableTrimStyleOptions.find((option) => option.trimId === selectedTrimId) ?? availableTrimStyleOptions[0],
    [availableTrimStyleOptions, selectedTrimId],
  );
  const selectedCatalogPrice = canUseCatalogPrice && selectedTrimStyleOption ? selectedTrimStyleOption.price : selectedVehicle.priceMin;
  const coverageEstimateVehiclePrice = Math.max(0, lightHasSpecificVehicleSelection && canUseCatalogPrice ? selectedCatalogPrice : price);
  const coverageEstimateSourceLabel = lightHasSpecificVehicleSelection && canUseCatalogPrice
    ? 'selected vehicle price'
    : 'current vehicle price';
  const suggestedCoverageEstimates = useMemo(() => getVehicleCoverageEstimates({
    vehiclePrice: coverageEstimateVehiclePrice,
    condition,
    bodyStyle: selectedVehicle.bodyStyle,
    fuelType: selectedVehicle.fuelType,
    horsepower: selectedVehicle.horsepower,
  }), [
    condition,
    coverageEstimateVehiclePrice,
    selectedVehicle.bodyStyle,
    selectedVehicle.fuelType,
    selectedVehicle.horsepower,
  ]);
  const suggestedExtendedWarrantyCost = suggestedCoverageEstimates.extendedWarranty;
  const suggestedMonthlyInsuranceEstimate = suggestedCoverageEstimates.monthlyInsurance;
  const selectedVehicleStyle = selectedTrimStyleOption?.trimName || selectedVehicle.trim || selectedVehicle.drivetrain || selectedVehicle.bodyStyle;
  const selectedVehicleLabel = lightHasSpecificVehicleSelection
    ? `${selectedYear} ${selectedVehicle.make} ${selectedVehicle.model}${selectedTrimStyleOption ? ` ${selectedTrimStyleOption.trimName}` : ''}`
    : lightVehicleStepMode === 'browsing'
      ? getBodyStyleListingsLabel(lightBrowseBodyStyle)
      : 'No vehicle selected';

  useEffect(() => {
    if (hasEditedExtendedWarrantyCost) return;
    setExtendedWarrantyCost((current) => (
      current === suggestedExtendedWarrantyCost ? current : suggestedExtendedWarrantyCost
    ));
  }, [hasEditedExtendedWarrantyCost, suggestedExtendedWarrantyCost]);

  useEffect(() => {
    if (hasEditedMonthlyInsuranceEstimate) return;
    setMonthlyInsuranceEstimate((current) => (
      current === suggestedMonthlyInsuranceEstimate ? current : suggestedMonthlyInsuranceEstimate
    ));
  }, [hasEditedMonthlyInsuranceEstimate, suggestedMonthlyInsuranceEstimate]);

  useEffect(() => {
    const defaultTrimOption = availableTrimStyleOptions[0];
    if (!defaultTrimOption) {
      if (selectedTrimId !== null) setSelectedTrimId(null);
      return;
    }

    if (availableTrimStyleOptions.some((option) => option.trimId === selectedTrimId)) return;

    setSelectedTrimId(defaultTrimOption.trimId);
    if (canUseCatalogPrice) {
      syncCatalogPrice(defaultTrimOption.price);
    }
  }, [availableTrimStyleOptions, canUseCatalogPrice, selectedTrimId, syncCatalogPrice]);

  useEffect(() => {
    if (condition !== 'used' || USED_YEAR_OPTIONS.includes(selectedYear)) return;
    setSelectedYear(USED_YEAR_OPTIONS[0]);
  }, [condition, selectedYear]);

  useEffect(() => {
    setLightVehicleSearchActiveIndex((current) => (
      Math.min(current, Math.max(lightVehicleSearchSuggestions.length - 1, 0))
    ));
  }, [lightVehicleSearchSuggestions.length]);

  const showLightTradeEstimateCard =
    SHOW_LIGHT_TRADE_ESTIMATE_CARD &&
    isLightStepsVariant &&
    lightWizardStep === 4 &&
    lightVehicleStepMode === 'known' &&
    lightKnownVehicleSelected &&
    Boolean(selectedVehicle.model?.trim());

  const lightTradePlanningEstimate = useMemo(() => {
    const vehicleLine = `${selectedYear} ${selectedVehicle.make} ${selectedVehicle.model}`;
    return estimateTradeInValue(vehicleLine, tradeMileage, tradeCondition);
  }, [selectedYear, selectedVehicle.make, selectedVehicle.model, tradeMileage, tradeCondition]);

  const lightTradeEstimateDisplayAmount = tradeInValue > 0 ? tradeInValue : lightTradePlanningEstimate;

  const availableYears = useMemo(
    () => condition === 'used'
      ? USED_YEAR_OPTIONS
      : [...new Set(vehicles.map((vehicle) => vehicle.year))].sort((a, b) => Number(b) - Number(a)),
    [condition, vehicles],
  );
  const availableMakes = useMemo(
    () => [...new Set(vehicles
      .filter((vehicle) => condition === 'used' || !lightVehicleYearValue || vehicle.year === lightVehicleYearValue)
      .map((vehicle) => vehicle.make))]
      .sort(),
    [condition, lightVehicleYearValue, vehicles],
  );
  const availableModels = useMemo(
    () => {
      if (!lightVehicleMakeValue) return [];

      return [...new Set(vehicles
        .filter((vehicle) => (
          (condition === 'used' || !lightVehicleYearValue || vehicle.year === lightVehicleYearValue) &&
          vehicle.make === lightVehicleMakeValue
        ))
        .map((vehicle) => vehicle.model))]
        .sort();
    },
    [condition, lightVehicleMakeValue, lightVehicleYearValue, vehicles],
  );
  const lightVehicleBrowseTiles = useMemo(
    () =>
      LIGHT_VEHICLE_BROWSE_GRID.map((row) => ({
        ...row,
        icon: bodyStyleCatalogIcon(row.iconId),
      })),
    [],
  );

  const vehicleIncentives = useMemo(
    () => condition === 'new' && lightHasSpecificVehicleSelection
      ? getVehicleIncentives(selectedVehicle.make, selectedVehicle.model)
      : { make: selectedVehicle.make, model: selectedVehicle.model, totalSavings: 0, incentives: [] },
    [condition, lightHasSpecificVehicleSelection, selectedVehicle.make, selectedVehicle.model],
  );
  const activeVehicleIncentives = lightDealModalVehicle
    ? getVehicleIncentives(lightDealModalVehicle.make, lightDealModalVehicle.model)
    : vehicleIncentives;
  const incentives = vehicleIncentives.incentives;
  const cashIncentives = useMemo(() => incentives.filter((incentive) => incentive.type === 'cash'), [incentives]);
  const financeIncentives = useMemo(() => incentives.filter((incentive) => incentive.type === 'finance'), [incentives]);
  const lightVehiclePriceIncentives = useMemo(() => ({
    ...vehicleIncentives,
    incentives: incentives.filter(isBuyingIncentive),
  }), [incentives, vehicleIncentives]);
  const offerModuleIncentives = useMemo(() => {
    const buyOffer = financeIncentives[0] ?? cashIncentives[0];

    return {
      ...vehicleIncentives,
      incentives: [buyOffer].filter(Boolean) as Incentive[],
    };
  }, [cashIncentives, financeIncentives, vehicleIncentives]);
  const selectedFinance = financeIncentives.find((incentive) => incentive.id === selectedFinanceId);
  const termOptions = useMemo(
    () => (selectedFinance ? getFinanceTermOptions(selectedFinance) : CUSTOM_RATE_TERMS),
    [selectedFinance],
  );

  const incentiveApr = getFinanceRateForTerm(selectedFinance, loanTerm);
  const activeApr = selectedFinance ? incentiveApr ?? customApr : customApr;
  const tierCashBack = selectedFinance ? getTierCashBack(selectedFinance, loanTerm) : 0;
  const selectedCashTotal = selectedCashIds.reduce((sum, id) => {
    const incentive = cashIncentives.find((item) => item.id === id);
    return sum + (incentive ? parseMoney(incentive.value) : 0);
  }, 0);
  const rebateTotal = selectedCashTotal + tierCashBack;
  const selectedOfferCount = selectedCashIds.length + (selectedFinance ? 1 : 0);
  const selectedOfferSummary = selectedOfferCount > 0 ? `${selectedOfferCount} applied` : 'None applied';
  const stateRule = stateRules.find((state) => state.code === stateCode) ?? stateRules[0];
  const lightSalesTaxPercentOverrideValue = lightSalesTaxPercentOverride.trim() === ''
    ? null
    : numberInput(lightSalesTaxPercentOverride);
  const usesLightSalesTaxPercentOverride = isLightStepsVariant && lightSalesTaxPercentOverrideValue !== null;
  const effectiveSalesTaxRate = usesLightSalesTaxPercentOverride
    ? (lightSalesTaxPercentOverrideValue ?? 0) / 100
    : stateRule.rate;
  const salesTaxDollarOverride = !usesLightSalesTaxPercentOverride && salesTaxOverride
    ? numberInput(salesTaxOverride)
    : undefined;
  const registrationFees = feesOverride ? numberInput(feesOverride) : stateRule.titleRegistrationFees;
  const dealerFees = dealerFeesOverride ? numberInput(dealerFeesOverride) : stateRule.dealerFeesEstimate;
  const defaultEstimatedRegistrationDealerFees = registrationFees + dealerFees;
  const registrationDealerFeeGuidance = getRegistrationDealerFeeGuidance(defaultEstimatedRegistrationDealerFees);
  const fees = estimatedFeesOverride ? numberInput(estimatedFeesOverride) : defaultEstimatedRegistrationDealerFees;
  const extendedWarrantyAmount = includeExtendedWarranty ? Math.max(0, extendedWarrantyCost) : 0;
  const monthlyInsuranceAmount = includeInsuranceEstimate ? Math.max(0, monthlyInsuranceEstimate) : 0;
  const optionalFinancedAddOns = extendedWarrantyAmount;
  const tradeEquity = tradeInValue - amountOwed;
  const negativeTradeBalance = Math.max(0, amountOwed - tradeInValue);
  const affordableMsrp = getAffordablePriceFromMonthlyBudget({
    targetMonthlyPayment,
    apr: activeApr,
    termMonths: loanTerm,
    downPayment,
    tradeInValue,
    amountOwed,
    rebate: rebateTotal,
    taxRule: stateRule.taxRule,
    taxRate: effectiveSalesTaxRate,
    salesTaxOverride: salesTaxDollarOverride,
    fees,
    financedAddOns: optionalFinancedAddOns,
    monthlyOwnershipCosts: monthlyInsuranceAmount,
    includeTaxesAndFeesInLoan,
  });
  const budgetVehiclePrice = (isBudgetFirstVariant || isLightVariant) && startMode === 'monthly' ? affordableMsrp : price;
  const usesSelectedCatalogPriceForEstimate = isLightVariant && lightHasSpecificVehicleSelection && canUseCatalogPrice;
  const usesUsedListingPriceInput = !canUseCatalogPrice;
  const workingPrice = usesSelectedCatalogPriceForEstimate ? selectedCatalogPrice : budgetVehiclePrice;
  const lightVehiclePriceRangeTarget = Math.max(0, startMode === 'monthly' ? affordableMsrp : workingPrice);
  const lightVehiclePriceRangeMax = lightVehiclePriceRangeTarget > 0
    ? Math.round(Math.max(lightVehiclePriceRangeTarget * 1.12, lightVehiclePriceRangeTarget + 2500))
    : undefined;
  const usedWorkingPriceDescriptor = startMode === 'monthly' ? 'listing-price target' : 'listing-price input';
  const workingPriceDescriptor = usesSelectedCatalogPriceForEstimate
    ? 'selected vehicle price'
    : usesUsedListingPriceInput
      ? usedWorkingPriceDescriptor
      : 'target vehicle price';
  const workingPriceBreakdownLabel = usesSelectedCatalogPriceForEstimate
    ? 'Selected Vehicle Price'
    : usesUsedListingPriceInput
      ? startMode === 'monthly' ? 'Listing Price Target' : 'Vehicle Listing Price'
      : 'Target Vehicle Price';
  const workingPriceFormulaLabel = usesSelectedCatalogPriceForEstimate
    ? 'selected vehicle price'
    : usesUsedListingPriceInput
      ? startMode === 'monthly' ? 'listing-price target' : 'listing price'
      : 'target price';
  const lightBudgetSupportBasis = optionalFinancedAddOns > 0 || monthlyInsuranceAmount > 0
    ? 'before tax and fees, after selected coverage assumptions'
    : 'before tax and fees';
  const taxableAmount = getTaxableAmount(workingPrice, tradeInValue, rebateTotal, stateRule.taxRule);
  const calculatedSalesTax = taxableAmount * effectiveSalesTaxRate;
  const salesTax = salesTaxDollarOverride ?? calculatedSalesTax;
  const lightTradeSalesTaxPercent = (() => {
    if (usesLightSalesTaxPercentOverride) return lightSalesTaxPercentOverrideValue ?? 0;
    const taxDollars = salesTaxDollarOverride ?? calculatedSalesTax;
    if (taxableAmount <= 0) return effectiveSalesTaxRate * 100;
    return (taxDollars / taxableAmount) * 100;
  })();
  const lightTradeSalesTaxPercentDisplayValue = formatLightTradeSalesTaxPercent(lightTradeSalesTaxPercent);
  const taxesAndFees = salesTax + fees;
  const tradeCanReduceTaxableAmount = stateRule.taxRule === 'after-trade' || stateRule.taxRule === 'after-trade-and-rebate';
  const estimatedTradeTaxSavings = tradeCanReduceTaxableAmount ? tradeInValue * effectiveSalesTaxRate : 0;
  const outTheDoorPrice = workingPrice + salesTax + fees + optionalFinancedAddOns;
  const financedPurchasePrice = includeTaxesAndFeesInLoan ? outTheDoorPrice : workingPrice + optionalFinancedAddOns;
  const netPriceAfterTradeAndOffers = Math.max(0, financedPurchasePrice - tradeEquity - rebateTotal);
  const purchasePaymentSummary = getPurchasePaymentSummary({
    vehiclePrice: workingPrice,
    taxesAndFees,
    financedAddOns: optionalFinancedAddOns,
    tradeEquity,
    rebate: rebateTotal,
    downPayment,
    includeTaxesAndFeesInLoan,
  });
  const totalLoanAmount = purchasePaymentSummary.amountFinanced;
  const estimatedMonthly = monthlyPayment(totalLoanAmount, activeApr, loanTerm);
  const estimatedMonthlyWithInsurance = estimatedMonthly + monthlyInsuranceAmount;
  const totalLoanPayments = estimatedMonthly * loanTerm;
  const totalLoanInterest = Math.max(0, totalLoanPayments - totalLoanAmount);
  const totalInsuranceCost = monthlyInsuranceAmount * loanTerm;
  const warrantyMonthlyImpact = Math.max(
    0,
    estimatedMonthly - monthlyPayment(Math.max(0, totalLoanAmount - extendedWarrantyAmount), activeApr, loanTerm),
  );
  const coverageEstimateSourceText = `${currency(coverageEstimateVehiclePrice)} ${coverageEstimateSourceLabel}`;
  const extendedWarrantyHelperText = hasEditedExtendedWarrantyCost
    ? `Manual value. Suggested estimate for ${coverageEstimateSourceText}: ${currency(suggestedExtendedWarrantyCost)}. Adds about ${currency(warrantyMonthlyImpact)}/mo to the loan payment.`
    : `Suggested from ${coverageEstimateSourceText}. Adds about ${currency(warrantyMonthlyImpact)}/mo to the loan payment.`;
  const insuranceEstimateHelperText = hasEditedMonthlyInsuranceEstimate
    ? `Manual value. Suggested estimate for ${coverageEstimateSourceText}: ${currency(suggestedMonthlyInsuranceEstimate)}/mo.`
    : `Suggested from ${coverageEstimateSourceText}. Monthly cost shown separately from the loan payment.`;
  const getEstimateMetricsFor = ({
    apr,
    term,
    rebate,
  }: {
    apr: number;
    term: number;
    rebate: number;
  }) => {
    const nextTaxableAmount = getTaxableAmount(workingPrice, tradeInValue, rebate, stateRule.taxRule);
    const nextSalesTax = salesTaxDollarOverride ?? nextTaxableAmount * effectiveSalesTaxRate;
    const nextLoanAmount = getPurchasePaymentSummary({
      vehiclePrice: workingPrice,
      taxesAndFees: nextSalesTax + fees,
      financedAddOns: optionalFinancedAddOns,
      tradeEquity,
      rebate,
      downPayment,
      includeTaxesAndFeesInLoan,
    }).amountFinanced;
    const nextMonthly = monthlyPayment(nextLoanAmount, apr, term);
    const nextLoanPayments = nextMonthly * term;

    return {
      loanAmount: nextLoanAmount,
      monthly: nextMonthly,
      loanPayments: nextLoanPayments,
      interest: Math.max(0, nextLoanPayments - nextLoanAmount),
    };
  };
  const tradeEquityApplied = purchasePaymentSummary.tradeEquityApplied;
  const tradeEquityAppliedToAmountFinanced = includeTaxesAndFeesInLoan
    ? tradeEquityApplied
    : Math.min(Math.max(0, tradeEquity), Math.max(0, workingPrice + optionalFinancedAddOns - rebateTotal));
  const remainingTradeEquity = purchasePaymentSummary.remainingTradeEquity;
  const hasRemainingTradeEquity = remainingTradeEquity > 0;
  const showTradeCreditAppliedBreakdown = tradeEquityApplied > 0 && hasRemainingTradeEquity;
  const isLoanCoveredByTradeEquity = totalLoanAmount <= 0 && tradeEquityApplied > 0;
  const showNoLoanPaymentState = isLoanCoveredByTradeEquity && monthlyInsuranceAmount <= 0;
  const showTotalIncludingTradeCredit = tradeEquityApplied > 0;
  const cashLoanPaymentsLabel = monthlyInsuranceAmount > 0 ? 'Cash + Loan + Insurance' : 'Cash + Loan Payments';
  const estimatedTotalLabel = showTotalIncludingTradeCredit
    ? 'Total Including Trade Credit'
    : monthlyInsuranceAmount > 0
      ? 'Estimated Total Cost'
      : hasRemainingTradeEquity
        ? 'Estimated Cash Due'
        : 'Estimated Total Paid';
  const estimatedOutTheDoorPrice = workingPrice + taxesAndFees + optionalFinancedAddOns;
  const amountFinancedFormulaParts = [
    { value: workingPrice, label: workingPriceFormulaLabel },
    includeTaxesAndFeesInLoan && taxesAndFees > 0 ? { operation: 'add', value: taxesAndFees, label: 'taxes & fees' } : null,
    optionalFinancedAddOns > 0 ? { operation: 'add', value: optionalFinancedAddOns, label: 'extended warranty' } : null,
    tradeEquityAppliedToAmountFinanced > 0 ? { operation: 'subtract', value: tradeEquityAppliedToAmountFinanced, label: 'trade credit applied' } : null,
    tradeEquity < 0 ? { operation: 'add', value: Math.abs(tradeEquity), label: 'trade payoff' } : null,
    rebateTotal > 0 ? { operation: 'subtract', value: rebateTotal, label: 'incentives' } : null,
    downPayment > 0 ? { operation: 'subtract', value: purchasePaymentSummary.downPaymentApplied, label: 'down' } : null,
    { operation: 'total', value: totalLoanAmount, label: 'financed' },
  ].filter((part): part is { operation?: 'add' | 'subtract' | 'total'; value: number; label: string } => Boolean(part));
  const downPaymentApplied = purchasePaymentSummary.downPaymentApplied;
  const cashDueAtSigning = purchasePaymentSummary.cashDueAtSigning;
  const totalPaidFromPocket = cashDueAtSigning + totalLoanPayments;
  const totalCost = totalPaidFromPocket + totalInsuranceCost;
  const totalIncludingTradeCredit = totalCost + tradeEquityApplied;
  const estimatedTotalValue = showTotalIncludingTradeCredit ? totalIncludingTradeCredit : totalCost;
  const downPaymentBreakdownLabel = downPaymentApplied < downPayment ? 'Down Payment Applied' : 'Down Payment';
  const totalCostCashLabel = purchasePaymentSummary.upfrontTaxesAndFeesDue > 0
    ? 'cash due at signing'
    : downPaymentApplied > 0
      ? 'cash paid upfront'
      : 'cash due at signing';
  const showTotalCostFormula = totalLoanPayments > 0 || cashDueAtSigning > 0 || totalInsuranceCost > 0 || showTotalIncludingTradeCredit;
  const hasCashLoanFormulaBase = totalLoanPayments > 0 || cashDueAtSigning > 0 || totalInsuranceCost > 0;
  const totalCostFormulaParts = [
    totalLoanPayments > 0 ? { value: totalLoanPayments, label: `loan payments over ${loanTerm} months` } : null,
    cashDueAtSigning > 0 ? { operation: totalLoanPayments > 0 ? 'add' : undefined, value: cashDueAtSigning, label: totalCostCashLabel } : null,
    totalInsuranceCost > 0 ? { operation: totalLoanPayments > 0 || cashDueAtSigning > 0 ? 'add' : undefined, value: totalInsuranceCost, label: `insurance over ${loanTerm} months` } : null,
    showTotalIncludingTradeCredit ? { operation: hasCashLoanFormulaBase ? ('total' as const) : undefined, value: totalCost, label: cashLoanPaymentsLabel.toLowerCase() } : null,
    showTotalIncludingTradeCredit ? { operation: 'add' as const, value: tradeEquityApplied, label: 'trade credit applied' } : null,
    { operation: 'total' as const, value: estimatedTotalValue, label: estimatedTotalLabel.toLowerCase() },
  ].filter((part): part is { operation?: 'add' | 'total'; value: number; label: string } => Boolean(part));
  const lightReview2WhatYouPayHelper = purchasePaymentSummary.upfrontTaxesAndFeesDue > 0
    ? 'Your cash paid up front plus all loan payments over the life of the loan.'
    : 'Your cash down payment plus all loan payments over the life of the loan.';
  const lightReview2VehicleCostCovered = totalPaidFromPocket + tradeEquityApplied;
  const lightReview2AmountFinancedTooltipCopy = 'Amount financed is the estimated amount you borrow after the vehicle price, financed taxes and fees, optional add-ons, trade-in credit, incentives, and down payment are applied.';
  const lightReview2TradeTooltipCopy = 'Trade-in contribution is the value from your trade-in, after any payoff, that reduces the amount you need to finance. Final trade value depends on appraisal and payoff.';
  const lightReview2FinanceChargeTooltipCopy = activeApr > 0
    ? `Finance charge is the estimated interest paid over ${loanTerm} months. This estimate uses ${formatAprPercent(activeApr)} APR on ${currency(totalLoanAmount)} financed.`
    : `At ${formatAprPercent(activeApr)} APR, this estimate does not add interest over ${loanTerm} months.`;
  const lightReview2VehicleCostCoveredTooltipCopy = 'This represents the total vehicle cost covered through your loan payments, cash down payment, and trade-in value. It is not the same as the amount you borrow.';
  const lightReview2AmountFinancedFormulaParts = [
    { value: workingPrice, label: 'Vehicle Price' },
    includeTaxesAndFeesInLoan && taxesAndFees > 0 ? { operation: 'add' as const, value: taxesAndFees, label: 'Taxes & Fees' } : null,
    optionalFinancedAddOns > 0 ? { operation: 'add' as const, value: optionalFinancedAddOns, label: 'Extended Warranty' } : null,
    tradeEquityAppliedToAmountFinanced > 0 ? { operation: 'subtract' as const, value: tradeEquityAppliedToAmountFinanced, label: 'Trade-In Equity' } : null,
    tradeEquity < 0 ? { operation: 'add' as const, value: Math.abs(tradeEquity), label: 'Trade Payoff' } : null,
    rebateTotal > 0 ? { operation: 'subtract' as const, value: rebateTotal, label: 'Incentives' } : null,
    downPaymentApplied > 0 ? { operation: 'subtract' as const, value: downPaymentApplied, label: 'Down Payment' } : null,
    { operation: 'total' as const, value: totalLoanAmount, label: 'Amount Financed' },
  ].filter((part): part is LightReviewFormulaPart => Boolean(part));
  const lightReview2WhatYouPayFormulaParts = ([
    { value: downPaymentApplied, label: downPaymentBreakdownLabel },
    purchasePaymentSummary.upfrontTaxesAndFeesDue > 0
      ? { operation: 'add' as const, value: purchasePaymentSummary.upfrontTaxesAndFeesDue, label: 'Taxes & Fees Paid Up Front' }
      : null,
    { operation: 'add' as const, value: totalLoanPayments, label: `Total Loan Payments Over ${loanTerm} Months` },
    { operation: 'total' as const, value: totalPaidFromPocket, label: 'Total Out-of-Pocket Cost' },
  ] as Array<LightReviewFormulaPart | null>).filter((part): part is LightReviewFormulaPart => Boolean(part));
  const lightReview2VehicleCostFormulaParts = ([
    { value: totalLoanPayments, label: `Total Loan Payments Over ${loanTerm} Months` },
    cashDueAtSigning > 0 ? { operation: 'add' as const, value: cashDueAtSigning, label: 'Cash Paid Up Front' } : null,
    tradeEquityApplied > 0 ? { operation: 'add' as const, value: tradeEquityApplied, label: 'Trade Equity Applied' } : null,
    { operation: 'total' as const, value: lightReview2VehicleCostCovered, label: 'Total Vehicle Cost Covered' },
  ] as Array<LightReviewFormulaPart | null>).filter((part): part is LightReviewFormulaPart => Boolean(part));
  const monthlyLoanPaymentDisplay = isLoanCoveredByTradeEquity ? 'No loan payment' : `${currency(estimatedMonthly)}/mo`;
  const currentMonthlyCostDisplay = showNoLoanPaymentState ? 'No loan' : `${currency(estimatedMonthlyWithInsurance)}/mo`;
  const lightEstimateSummaryCopy = isLoanCoveredByTradeEquity
    ? `${currency(tradeEquityApplied)} in trade credit covers the financed amount${hasRemainingTradeEquity ? `, with ${currency(remainingTradeEquity)} remaining outside this loan estimate` : ''}.`
    : `Based on a ${currency(workingPrice)} ${workingPriceDescriptor}, ${loanTerm} months, and ${formatAprPercent(activeApr)} APR.`;
  const lightResultKicker = startMode === 'monthly'
    ? 'Budget Supports About'
    : showNoLoanPaymentState
      ? 'Trade Equity Covers Loan'
      : monthlyInsuranceAmount > 0
        ? 'Estimated Monthly Cost'
        : 'Estimated Monthly Payment';
  const lightResultAmount = startMode === 'monthly'
    ? currency(affordableMsrp)
    : showNoLoanPaymentState
      ? 'No loan'
      : currency(estimatedMonthlyWithInsurance);
  const showLightResultMonthlySuffix = startMode !== 'monthly' && !showNoLoanPaymentState;
  const lightResultLede = startMode === 'monthly'
    ? canUseCatalogPrice
      ? `Estimated MSRP ${lightBudgetSupportBasis} for a ${currency(targetMonthlyPayment)}/mo target.`
      : `Estimated listing-price target ${lightBudgetSupportBasis} for a ${currency(targetMonthlyPayment)}/mo target.`
    : isLoanCoveredByTradeEquity
      ? monthlyInsuranceAmount > 0
        ? `No loan payment. Includes ${currency(monthlyInsuranceAmount)}/mo insurance estimate shown separately.`
        : lightEstimateSummaryCopy
      : monthlyInsuranceAmount > 0
        ? `Includes ${currency(estimatedMonthly)}/mo loan payment plus ${currency(monthlyInsuranceAmount)}/mo insurance.`
        : lightEstimateSummaryCopy;
  const renderLightBreakdownValue = (value: number, operation?: 'add' | 'subtract') => {
    if (!operation) return currency(value);

    return (
      <span className={`aio-payment__light-breakdown-signed-value aio-payment__light-breakdown-signed-value--${operation}`}>
        {currency(value)}
      </span>
    );
  };
  const renderLightBreakdownLabelWithHelp = (
    label: ReactNode,
    tooltipId: string,
    title: string,
    copy: ReactNode,
    ariaLabel: string,
  ) => (
    <span className="aio-payment__light-breakdown-label-with-tooltip">
      <span>{label}</span>
      {renderLightGuidanceTooltip({
        id: tooltipId,
        title,
        copy,
        ariaLabel,
      })}
    </span>
  );
  const renderLightReview2Tooltip = (id: string, ariaLabel: string, title: string, copy: ReactNode) => (
    <span className="aio-payment__light-review-drivers-tooltip aio-payment__light-review-drivers-tooltip--row">
      <button
        type="button"
        className="aio-payment__light-review-drivers-trigger"
        aria-label={ariaLabel}
        aria-describedby={id}
      >
        <img
          className="aio-payment__light-loan-guidance-trigger-icon"
          src={CAD_INFO_ICON_SRC}
          width="24"
          height="24"
          alt=""
          aria-hidden="true"
        />
      </button>
      <span
        id={id}
        className="aio-payment__light-review-drivers-popover aio-payment__light-review-drivers-popover--review2"
        role="tooltip"
      >
        <span className="aio-payment__light-review-drivers-popover-title">{title}</span>
        <span className="aio-payment__light-review-drivers-copy">{copy}</span>
      </span>
    </span>
  );
  const renderLightReview2Formula = (parts: LightReviewFormulaPart[], ariaLabel: string) => (
    <div className="aio-payment__light-review2-formula" aria-label={ariaLabel}>
      {parts.map((part, index) => (
        <div
          key={`${part.operation ?? 'base'}-${part.label}-${index}`}
          className={`aio-payment__light-review2-formula-row aio-payment__light-review2-formula-row--${part.operation ?? 'base'}`}
        >
          <span
            className={`aio-payment__light-review2-formula-sign aio-payment__light-review2-formula-sign--${part.operation ?? 'base'}`}
            aria-hidden="true"
          >
            {part.operation === 'add' ? '+' : part.operation === 'subtract' ? '-' : part.operation === 'total' ? '=' : ''}
          </span>
          <span className="aio-payment__light-review2-formula-label">{part.label}</span>
          <strong className="aio-payment__light-review2-formula-value">{currency(part.value)}</strong>
        </div>
      ))}
    </div>
  );
  const showTradePayoffBreakdown = amountOwed > 0;
  const tradeEquityBreakdownLabel = tradeEquity < 0 ? 'Trade Balance' : 'Net Trade Equity';
  const renderTradeEquityBreakdownValue = () => {
    if (tradeEquity > 0) return renderLightBreakdownValue(tradeEquity, 'subtract');
    if (tradeEquity < 0) return renderLightBreakdownValue(Math.abs(tradeEquity), 'add');
    return renderLightBreakdownValue(0);
  };
  const formatTradeEquitySummaryValue = () => {
    if (tradeEquity > 0) return renderLightBreakdownValue(tradeEquity, 'subtract');
    if (tradeEquity < 0) return renderLightBreakdownValue(Math.abs(tradeEquity), 'add');
    return currency(0);
  };
  const paymentDelta = estimatedMonthlyWithInsurance - targetMonthlyPayment;
  const getLightVehicleFinancePreview = useCallback((vehiclePrice: number) => {
    const previewTaxableAmount = getTaxableAmount(vehiclePrice, tradeInValue, rebateTotal, stateRule.taxRule);
    const previewSalesTax = salesTaxDollarOverride ?? previewTaxableAmount * effectiveSalesTaxRate;
    const previewLoanAmount = getPurchasePaymentSummary({
      vehiclePrice,
      taxesAndFees: previewSalesTax + fees,
      financedAddOns: optionalFinancedAddOns,
      tradeEquity,
      rebate: rebateTotal,
      downPayment,
      includeTaxesAndFeesInLoan,
    }).amountFinanced;

    return {
      amountFinanced: previewLoanAmount,
      monthly: monthlyPayment(previewLoanAmount, activeApr, loanTerm) + monthlyInsuranceAmount,
    };
  }, [
    activeApr,
    downPayment,
    effectiveSalesTaxRate,
    fees,
    includeTaxesAndFeesInLoan,
    loanTerm,
    monthlyInsuranceAmount,
    optionalFinancedAddOns,
    rebateTotal,
    salesTaxDollarOverride,
    stateRule.taxRule,
    tradeEquity,
    tradeInValue,
  ]);
  const selectedVehicleFinancePreview = getLightVehicleFinancePreview(selectedCatalogPrice);
  const selectedVehicleMonthly = selectedVehicleFinancePreview.monthly;
  const selectedVehicleBudgetDelta = selectedVehicleMonthly - targetMonthlyPayment;
  const budgetFitStatus: BudgetFitStatus = selectedVehicleBudgetDelta > 10 ? 'over' : selectedVehicleBudgetDelta < -10 ? 'under' : 'fit';
  const budgetFitLabel = budgetFitStatus === 'over'
    ? 'Above budget'
    : budgetFitStatus === 'under'
      ? 'Below budget'
      : 'On budget';
  const budgetFitHeadline = budgetFitStatus === 'over'
    ? `About ${currency(selectedVehicleBudgetDelta)}/mo over your budget`
    : budgetFitStatus === 'under'
      ? `About ${currency(Math.abs(selectedVehicleBudgetDelta))}/mo below your budget`
      : 'Close to your budget';
  const budgetFitCopy = budgetFitStatus === 'over'
    ? `${selectedVehicle.model} starts around ${currency(selectedCatalogPrice)}. Your budget supports about ${currency(affordableMsrp)} ${lightBudgetSupportBasis}. Try a lower trim, more cash down, a longer term, or vehicles below that range.`
    : budgetFitStatus === 'under'
      ? `${selectedVehicle.model} starts around ${currency(selectedCatalogPrice)} and estimates near ${currency(selectedVehicleMonthly)}/mo with these assumptions.`
      : `${selectedVehicle.model} estimates near ${currency(selectedVehicleMonthly)}/mo with your selected down payment, term, taxes, and fees.`;
  const usedBudgetFitStatus: BudgetFitStatus = 'neutral';
  const usedBudgetFitLabel = 'Listing price needed';
  const usedBudgetFitHeadline = startMode === 'monthly'
    ? `Compare listings against about ${currency(affordableMsrp)}`
    : 'Use the listing price for this estimate';
  const usedBudgetFitCopy = startMode === 'monthly'
    ? `Your budget supports about ${currency(affordableMsrp)} ${lightBudgetSupportBasis}. Used-car prices vary by listing, so compare real prices or written quotes against that target.`
    : 'This estimate uses the current listing-price input, not a catalog used-car value. Replace it with a real listing price or written quote before shopping.';
  const estimateBudgetFitStatus: BudgetFitStatus = paymentDelta > 10 ? 'over' : paymentDelta < -10 ? 'under' : 'fit';
  const estimateBudgetFitLabel = estimateBudgetFitStatus === 'over'
    ? 'Above budget'
    : estimateBudgetFitStatus === 'under'
      ? 'Below budget'
      : 'On budget';
  const estimateBudgetFitHeadline = estimateBudgetFitStatus === 'over'
    ? `About ${currency(paymentDelta)}/mo over your ${currency(targetMonthlyPayment)}/mo budget`
    : estimateBudgetFitStatus === 'under'
      ? `About ${currency(Math.abs(paymentDelta))}/mo below your ${currency(targetMonthlyPayment)}/mo budget`
      : `Close to your ${currency(targetMonthlyPayment)}/mo budget`;
  const estimateBudgetFitCopy = canUseCatalogPrice
    ? estimateBudgetFitStatus === 'over'
      ? `Try a lower price, more cash down, a longer term, or vehicles under about ${currency(affordableMsrp)} ${lightBudgetSupportBasis}.`
      : estimateBudgetFitStatus === 'under'
        ? `This estimate leaves room in your monthly budget with the current price, down payment, APR, and term.`
        : 'This estimate is within about $10/mo of your budget with the current assumptions.'
    : estimateBudgetFitStatus === 'over'
      ? `This estimate uses the current listing-price input. Try a lower listing price, more cash down, a longer term, or a written quote under about ${currency(affordableMsrp)} ${lightBudgetSupportBasis}.`
      : estimateBudgetFitStatus === 'under'
      ? 'This estimate uses the current listing-price input and leaves room in your monthly budget. Replace it with the exact listing price or written quote before shopping.'
      : 'This estimate uses the current listing-price input and is within about $10/mo of your budget. Confirm it against the exact listing price or written quote.';
  const selectedVehiclePriceAfterTradeAndIncentives = getVehiclePriceAfterTradeAndIncentives({
    vehiclePrice: selectedCatalogPrice,
    tradeInValue,
    amountOwed,
    rebate: rebateTotal,
  });
  const priceBudgetAdjustmentSources = [
    tradeEquity > 0 ? `${currency(tradeEquity)} trade equity` : '',
    tradeEquity < 0 ? `${currency(Math.abs(tradeEquity))} trade payoff` : '',
    rebateTotal > 0 ? `${currency(rebateTotal)} incentives` : '',
  ].filter(Boolean);
  const priceBudgetComparisonCopy = priceBudgetAdjustmentSources.length > 0
    ? `With ${formatInlineList(priceBudgetAdjustmentSources)}, the comparable price is about ${currency(selectedVehiclePriceAfterTradeAndIncentives)} before tax and fees.`
    : 'This comparison is before tax and fees.';
  const priceBudgetDelta = selectedVehiclePriceAfterTradeAndIncentives - price;
  const priceBudgetFitStatus: BudgetFitStatus = priceBudgetDelta > 10 ? 'over' : priceBudgetDelta < -10 ? 'under' : 'fit';
  const priceBudgetFitLabel = priceBudgetFitStatus === 'over'
    ? 'Above budget'
    : priceBudgetFitStatus === 'under'
      ? 'Below budget'
      : 'On budget';
  const priceBudgetFitHeadline = priceBudgetFitStatus === 'over'
    ? `About ${currency(priceBudgetDelta)} over your ${currency(price)} target`
    : priceBudgetFitStatus === 'under'
      ? `About ${currency(Math.abs(priceBudgetDelta))} below your ${currency(price)} target`
      : `Close to your ${currency(price)} target`;
  const priceBudgetFitCopy = priceBudgetFitStatus === 'over'
    ? `${selectedVehicle.model} starts around ${currency(selectedCatalogPrice)} before tax and fees. ${priceBudgetComparisonCopy} Try a lower trim, a lower selling price, eligible incentives, or vehicles closer to your target.`
    : priceBudgetFitStatus === 'under'
      ? `${selectedVehicle.model} starts around ${currency(selectedCatalogPrice)} before tax and fees. ${priceBudgetComparisonCopy} Taxes and fees are estimated separately in the totals.`
      : `${selectedVehicle.model} starts around ${currency(selectedCatalogPrice)} before tax and fees. ${priceBudgetComparisonCopy}`;
  const lightTrimStyleSelectOptions = useMemo<LightListboxSelectOption[]>(() => {
    if (!canUseCatalogPrice) {
      return availableTrimStyleOptions.map((option) => ({
        value: option.value,
        label: option.label,
      }));
    }

    return availableTrimStyleOptions.map((option) => {
      const trimFinancePreview = getLightVehicleFinancePreview(option.price);

      if (startMode === 'price') {
        const comparableTrimPrice = getVehiclePriceAfterTradeAndIncentives({
          vehiclePrice: option.price,
          tradeInValue,
          amountOwed,
          rebate: rebateTotal,
        });
        const targetDelta = comparableTrimPrice - price;
        const statusTone = getBudgetFitStatusFromDelta(targetDelta);
        const deltaHelper = statusTone === 'over'
          ? ` · ${currency(targetDelta)} over target`
          : statusTone === 'under'
            ? ` · ${currency(Math.abs(targetDelta))} under target`
            : '';
        const targetStatusLabel = statusTone === 'over'
          ? 'Over target'
          : statusTone === 'under'
            ? 'Below target'
            : 'On target';

        return {
          value: option.value,
          label: option.label,
          helper: `${currency(trimFinancePreview.monthly)}/mo with current terms${deltaHelper}`,
          statusTone,
          statusLabel: targetStatusLabel,
          triggerStatusLabel: targetStatusLabel,
        };
      }

      const monthlyDelta = trimFinancePreview.monthly - targetMonthlyPayment;
      const statusTone = getBudgetFitStatusFromDelta(monthlyDelta);
      const monthlyDeltaHelper = statusTone === 'over'
        ? ` · ${currency(monthlyDelta)}/mo over budget`
        : statusTone === 'under'
          ? ` · ${currency(Math.abs(monthlyDelta))}/mo under budget`
          : '';
      const monthlyStatusLabel = statusTone === 'over'
        ? 'Over budget'
        : statusTone === 'under'
          ? 'Below budget'
          : 'Fits budget';

      return {
        value: option.value,
        label: option.label,
        helper: `${currency(trimFinancePreview.monthly)}/mo with current terms${monthlyDeltaHelper}`,
        statusTone,
        statusLabel: monthlyStatusLabel,
        triggerStatusLabel: monthlyStatusLabel,
      };
    });
  }, [
    amountOwed,
    availableTrimStyleOptions,
    canUseCatalogPrice,
    getLightVehicleFinancePreview,
    price,
    rebateTotal,
    startMode,
    targetMonthlyPayment,
    tradeInValue,
  ]);
  const visibleBudgetFitStatus = !canUseCatalogPrice && lightHasSpecificVehicleSelection ? usedBudgetFitStatus : lightHasSpecificVehicleSelection ? budgetFitStatus : 'fit';
  const visibleBudgetFitLabel = !canUseCatalogPrice && lightHasSpecificVehicleSelection ? usedBudgetFitLabel : lightHasSpecificVehicleSelection ? budgetFitLabel : 'Pick a vehicle';
  const visibleBudgetFitHeadline = !canUseCatalogPrice && lightHasSpecificVehicleSelection ? usedBudgetFitHeadline : lightHasSpecificVehicleSelection ? budgetFitHeadline : 'Choose a vehicle to compare';
  const visibleBudgetFitCopy = lightHasSpecificVehicleSelection
    ? canUseCatalogPrice ? budgetFitCopy : usedBudgetFitCopy
    : `Your budget supports about ${currency(affordableMsrp)} ${lightBudgetSupportBasis}. Choose a vehicle or browse by vehicle type to compare it with your target.`;
  const showPriceBudgetFit = startMode === 'price' && usesSelectedCatalogPriceForEstimate;
  const summaryBudgetFitStatus = startMode === 'monthly'
    ? visibleBudgetFitStatus
    : showPriceBudgetFit
      ? priceBudgetFitStatus
      : estimateBudgetFitStatus;
  const summaryBudgetFitLabel = startMode === 'monthly'
    ? visibleBudgetFitLabel
    : showPriceBudgetFit
      ? priceBudgetFitLabel
      : estimateBudgetFitLabel;
  const summaryBudgetFitHeadline = startMode === 'monthly'
    ? visibleBudgetFitHeadline
    : showPriceBudgetFit
      ? priceBudgetFitHeadline
      : estimateBudgetFitHeadline;
  const summaryBudgetFitCopy = startMode === 'monthly'
    ? visibleBudgetFitCopy
    : showPriceBudgetFit
      ? priceBudgetFitCopy
      : estimateBudgetFitCopy;
  const lightReview2BudgetSources = [
    tradeEquity > 0 ? `${currency(tradeEquity)} trade-in` : '',
    tradeEquity < 0 ? `${currency(Math.abs(tradeEquity))} trade payoff` : '',
    rebateTotal > 0 ? `${currency(rebateTotal)} incentives` : '',
  ].filter(Boolean);
  const lightReview2BudgetDelta = selectedVehiclePriceAfterTradeAndIncentives - price;
  const lightReview2BudgetFitStatus: BudgetFitStatus = lightReview2BudgetDelta > 10 ? 'over' : lightReview2BudgetDelta < -10 ? 'under' : 'fit';
  const lightReview2BudgetFitLabel = lightReview2BudgetFitStatus === 'over'
    ? 'Above target'
    : lightReview2BudgetFitStatus === 'under'
      ? 'Below target'
      : 'On target';
  const lightReview2BudgetFitHeadline = lightReview2BudgetFitStatus === 'over'
    ? `Comparable cost is about ${currency(lightReview2BudgetDelta)} over your ${currency(price)} target`
    : lightReview2BudgetFitStatus === 'under'
      ? `Comparable cost is about ${currency(Math.abs(lightReview2BudgetDelta))} below your ${currency(price)} target`
      : `Comparable cost is close to your ${currency(price)} target`;
  const lightReview2BudgetSourceSentence = lightReview2BudgetSources.length > 0
    ? `After applying your ${formatInlineList(lightReview2BudgetSources)}, the comparable vehicle cost is approximately ${currency(selectedVehiclePriceAfterTradeAndIncentives)} before taxes and fees.`
    : `${selectedVehicle.model} starts around ${currency(selectedCatalogPrice)} before taxes and fees.`;
  const lightReview2BudgetDownPaymentSentence = downPaymentApplied > 0
    ? `Your ${currency(downPaymentApplied)} down payment is applied after that to reduce the amount financed.`
    : '';
  const lightReview2BudgetDeltaSentence = lightReview2BudgetFitStatus === 'over'
    ? `That's about ${currency(lightReview2BudgetDelta)} over your ${currency(price)} target.`
    : lightReview2BudgetFitStatus === 'under'
      ? `That's about ${currency(Math.abs(lightReview2BudgetDelta))} below your ${currency(price)} target.`
      : `That's close to your ${currency(price)} target.`;
  const lightReview2BudgetFitCopy = [lightReview2BudgetSourceSentence, lightReview2BudgetDownPaymentSentence, lightReview2BudgetDeltaSentence]
    .filter(Boolean)
    .join(' ');
  const useLightReview2BudgetMessaging = isLightSteps2Variant && lightWizardStep === 5 && showPriceBudgetFit;
  const displayedSummaryBudgetFitStatus = useLightReview2BudgetMessaging ? lightReview2BudgetFitStatus : summaryBudgetFitStatus;
  const displayedSummaryBudgetFitLabel = useLightReview2BudgetMessaging ? lightReview2BudgetFitLabel : summaryBudgetFitLabel;
  const displayedSummaryBudgetFitHeadline = useLightReview2BudgetMessaging ? lightReview2BudgetFitHeadline : summaryBudgetFitHeadline;
  const displayedSummaryBudgetFitCopy = useLightReview2BudgetMessaging ? lightReview2BudgetFitCopy : summaryBudgetFitCopy;
  const showSummaryBudgetFit = !isLightStepsVariant || (lightWizardStep > 1 && lightHasSpecificVehicleSelection);

  const getEstimatedMonthlyForVehiclePrice = (vehiclePrice: number) => {
    const vehicleTaxableAmount = getTaxableAmount(vehiclePrice, tradeInValue, rebateTotal, stateRule.taxRule);
    const vehicleSalesTax = salesTaxDollarOverride ?? vehicleTaxableAmount * effectiveSalesTaxRate;
    const vehicleLoanAmount = getPurchasePaymentSummary({
      vehiclePrice,
      taxesAndFees: vehicleSalesTax + fees,
      financedAddOns: optionalFinancedAddOns,
      tradeEquity,
      rebate: rebateTotal,
      downPayment,
      includeTaxesAndFeesInLoan,
    }).amountFinanced;

    return monthlyPayment(vehicleLoanAmount, activeApr, loanTerm) + monthlyInsuranceAmount;
  };
  const schedule = buildAnnualSchedule(totalLoanAmount, activeApr, loanTerm, estimatedMonthly);
  const lightAffordableBudgetCeiling = startMode === 'monthly' ? affordableMsrp : Math.max(0, price);
  const lightCategoryBudgetIsMonthly = startMode === 'monthly';
  const lightCategoryBudgetValue = lightCategoryBudgetIsMonthly ? targetMonthlyPayment : lightAffordableBudgetCeiling;
  const lightCategoryBudgetInputValue = lightCategoryBudgetInputDraft ?? numberWithCommas(lightCategoryBudgetValue);
  const lightCategoryBudgetPreposition = lightCategoryBudgetIsMonthly ? 'for' : 'around';
  const lightCategoryBudgetAriaLabel = lightCategoryBudgetIsMonthly
    ? 'Update monthly budget for vehicle recommendations'
    : 'Update vehicle price budget for vehicle recommendations';
  const handleLightCategoryBudgetInputChange = useCallback((value: string) => {
    const nextValue = normalizeMoneyInputValue(value);
    setLightCategoryBudgetInputDraft(nextValue);

    if (nextValue.trim() === '') return;

    const nextAmount = currencyInput(nextValue);
    if (lightCategoryBudgetIsMonthly) {
      setTargetMonthlyPayment(nextAmount);
      return;
    }

    handlePriceChange(nextAmount);
  }, [handlePriceChange, lightCategoryBudgetIsMonthly]);
  const handleLightCategoryBudgetInputBlur = useCallback(() => {
    const nextAmount = lightCategoryBudgetInputValue.trim() === ''
      ? lightCategoryBudgetIsMonthly ? LIGHT_MONTHLY_BUDGET_MIN : LIGHT_VEHICLE_PRICE_MIN
      : currencyInput(lightCategoryBudgetInputValue);

    if (lightCategoryBudgetIsMonthly) {
      setTargetMonthlyPayment(boundLightMonthlyBudget(nextAmount));
    } else {
      handlePriceChange(boundLightVehiclePrice(nextAmount));
    }

    setLightCategoryBudgetInputDraft(null);
  }, [
    handlePriceChange,
    lightCategoryBudgetInputValue,
    lightCategoryBudgetIsMonthly,
  ]);
  const lightBrowseVehicleMatches = useMemo<LightBrowseVehicleMatch[]>(() => {
    const ceiling = Math.max(0, lightAffordableBudgetCeiling);
    const categoryVehicles = vehicles.filter((vehicle) => (
      isLightBrowseVehicleInCondition(vehicle, condition) &&
      matchesLightBrowseCategory(vehicle, lightBrowseBodyStyle)
    ));
    const inRangeVehicles = categoryVehicles
      .filter((vehicle) => vehicle.priceMin <= ceiling)
      .sort(sortLightBrowseVehicleMatch);
    const nearRangeCeiling = Math.max(
      ceiling * LIGHT_BODY_STYLE_NEAR_RANGE_MULTIPLIER,
      ceiling + LIGHT_BODY_STYLE_NEAR_RANGE_BUFFER,
    );
    const nearRangeVehicles = categoryVehicles
      .filter((vehicle) => vehicle.priceMin > ceiling && vehicle.priceMin <= nearRangeCeiling)
      .sort(sortLightBrowseVehicleMatch);
    const seenSlugs = new Set<string>();

    return [
      ...inRangeVehicles.map((vehicle) => ({ vehicle, isNearRange: false })),
      ...nearRangeVehicles.map((vehicle) => ({ vehicle, isNearRange: true })),
    ].filter((match) => {
      if (seenSlugs.has(match.vehicle.slug)) return false;
      seenSlugs.add(match.vehicle.slug);
      return true;
    }).slice(0, LIGHT_BODY_STYLE_MATCH_LIMIT);
  }, [
    condition,
    lightAffordableBudgetCeiling,
    lightBrowseBodyStyle,
    vehicles,
  ]);
  const canShowLightBrowseVehicleMatches = condition !== 'used';
  const lightBrowseVehicleMatchesLabel = getBodyStyleListingsLabel(lightBrowseBodyStyle);
  const lightAffordableDealCards = (() => {
    const ceiling = lightAffordableBudgetCeiling;
    const strict = vehicles
      .filter((vehicle) => vehicle.priceMin <= ceiling)
      .sort((a, b) => b.priceMin - a.priceMin || b.staffRating - a.staffRating);

    const relaxedCeiling = Math.max(ceiling * 1.12, ceiling + 3500, 22000);
    const relaxed = vehicles
      .filter((vehicle) => vehicle.priceMin <= relaxedCeiling)
      .sort((a, b) => b.staffRating - a.staffRating || b.priceMin - a.priceMin);

    const fallback = [...vehicles].sort((a, b) => b.staffRating - a.staffRating);
    const seenVehicleSlugs = new Set<string>();
    const candidateVehicles = [...strict, ...relaxed, ...fallback].filter((vehicle) => {
      if (seenVehicleSlugs.has(vehicle.slug)) return false;
      seenVehicleSlugs.add(vehicle.slug);
      return true;
    });

    return candidateVehicles.map((vehicle) => {
      const offers = getVehicleOffers(vehicle.make, vehicle.model);
      const primaryOffer = offers[0];
      const primaryIncentive = getVehicleIncentives(vehicle.make, vehicle.model).incentives[0];

      return {
        vehicle,
        offers,
        primaryOffer,
        primaryIncentive,
      };
    })
    .filter((item): item is LightAffordableDealCard => Boolean(item.primaryOffer && item.primaryIncentive))
    .slice(0, LIGHT_AFFORDABLE_DEAL_CARD_LIMIT);
  })();
  const lightELotLocation = user?.location?.trim() || 'Miami, FL';
  const lightVehicleResultBodyStyle = lightHasSpecificVehicleSelection
    ? selectedVehicle.bodyStyle
    : lightVehicleStepMode === 'browsing'
      ? lightBrowseBodyStyle
      : undefined;
  const lightELotListings = useMemo<LightELotListing[]>(() => {
    const listings = getListingsNearYou({
      make: lightHasSpecificVehicleSelection ? selectedVehicle.make : undefined,
      model: lightHasSpecificVehicleSelection ? selectedVehicle.model : undefined,
      bodyStyle: lightVehicleResultBodyStyle,
      maxPrice: lightVehiclePriceRangeMax,
      location: lightELotLocation,
    });
    const sortedListings = lightHasSpecificVehicleSelection
      ? [
          ...listings.filter((listing) => (
            listing.make === selectedVehicle.make &&
            listing.model === selectedVehicle.model &&
            !listing.isNew
          )),
          ...listings.filter((listing) => (
            listing.make === selectedVehicle.make &&
            listing.model === selectedVehicle.model &&
            listing.isNew
          )),
        ]
      : listings;
    const uniqueListings = sortedListings.filter((listing, index, allListings) => (
      allListings.findIndex((item) => item.id === listing.id) === index
    ));

    return uniqueListings.slice(0, 8).map((listing) => ({
      ...listing,
      priceBadge: listing.price <= lightVehiclePriceRangeTarget ? 'Great Price' : 'Good Price',
    }));
  }, [
    lightELotLocation,
    lightHasSpecificVehicleSelection,
    lightVehiclePriceRangeMax,
    lightVehiclePriceRangeTarget,
    lightVehicleResultBodyStyle,
    selectedVehicle.bodyStyle,
    selectedVehicle.make,
    selectedVehicle.model,
  ]);
  const showLightAffordableDealCards = canUseCatalogPrice && lightAffordableDealCards.length > 0;
  const showLightELotSection =
    isLightStepsVariant &&
    lightWizardStep === 5 &&
    lightELotListings.length > 0;
  const lightELotAllResultsHref = lightHasSpecificVehicleSelection
    ? getMarketplaceUrl('used', selectedVehicle, selectedYear)
    : getMarketplacePriceRangeUrl(condition, lightVehiclePriceRangeMax, lightVehicleResultBodyStyle);
  const lightELotUsedResultsHref = lightHasSpecificVehicleSelection
    ? lightELotAllResultsHref
    : getMarketplacePriceRangeUrl('used', lightVehiclePriceRangeMax, lightVehicleResultBodyStyle);
  const lightELotSearchLabel = lightHasSpecificVehicleSelection
    ? `used ${selectedYear} ${selectedVehicle.make} ${selectedVehicle.model}`
    : lightVehicleResultBodyStyle
      ? `${getBodyStyleListingsLabel(lightVehicleResultBodyStyle)} around ${currency(lightVehiclePriceRangeTarget)}`
      : `vehicles around ${currency(lightVehiclePriceRangeTarget)}`;
  const lightELotActionVehicleLabel = lightHasSpecificVehicleSelection
    ? `${selectedVehicle.model}s`
    : lightVehicleResultBodyStyle
      ? getBodyStyleListingsLabel(lightVehicleResultBodyStyle)
      : 'Vehicles';
  const lightELotActionLinks = [
    {
      label: `See All ${lightELotActionVehicleLabel} in Your Area`,
      href: lightELotAllResultsHref,
    },
    {
      label: `Manufacturer Certified ${lightELotActionVehicleLabel}`,
      href: addMarketplaceParams(lightELotUsedResultsHref, { certified: 'true' }),
    },
    {
      label: `Used ${lightELotActionVehicleLabel} with a Good or Great Price`,
      href: addMarketplaceParams(lightELotUsedResultsHref, { priceRating: 'good,great' }),
    },
  ];
  const shouldScrollToBudgetVehicles =
    showLightAffordableDealCards &&
    (!lightHasSpecificVehicleSelection || (startMode === 'monthly' && budgetFitStatus === 'over'));
  const lightGenericBudgetCtaLabel = 'SEE CARS IN YOUR BUDGET';
  const lightShopHref = shouldScrollToBudgetVehicles
    ? '#aio-payment-light-affordable-heading'
    : getMarketplaceUrl(condition, selectedVehicle, selectedYear);
  const lightShopLabel = shouldScrollToBudgetVehicles
    ? lightGenericBudgetCtaLabel
    : `Shop ${condition === 'new' ? 'new' : 'used'} ${selectedVehicle.model}`.toUpperCase();
  const showLightReviewVehicleShopCta =
    isLightStepsVariant &&
    lightWizardStep === 5 &&
    lightHasSpecificVehicleSelection &&
    Boolean(selectedVehicle.make?.trim() && selectedVehicle.model?.trim());
  const lightReviewVehicleShopHref = getMarketplaceUrl(condition, selectedVehicle, selectedYear);
  const lightReviewVehicleShopLabel = `Shop ${condition === 'new' ? 'new' : 'used'} ${selectedVehicle.model}`.toUpperCase();
  const canScrollToLightVehicleResults = isLightStepsVariant && lightWizardStep === 5 && showLightELotSection;
  const showLightReviewSidebarNextSteps = isLightStepsVariant && lightWizardStep === 5;
  const showLightReviewNextStepsCard = showLightReviewSidebarNextSteps && SHOW_LIGHT_REVIEW_NEXT_STEPS_CARD;
  const hasLightBodyStyleBrowseSelection = Boolean(
    isLightStepsVariant &&
    !lightHasSpecificVehicleSelection &&
    lightVehicleStepMode === 'browsing' &&
    lightVehicleResultBodyStyle,
  );
  const lightBodyStyleShopLabel = hasLightBodyStyleBrowseSelection && lightVehicleResultBodyStyle
    ? getBodyStyleShoppingCtaLabel(condition, lightVehicleResultBodyStyle)
    : undefined;
  const lightBodyStyleShopHref = hasLightBodyStyleBrowseSelection && lightVehicleResultBodyStyle
    ? canScrollToLightVehicleResults
      ? '#aio-payment-light-affordable-heading'
      : getMarketplacePriceRangeUrl(condition, lightVehiclePriceRangeMax, lightVehicleResultBodyStyle)
    : undefined;
  const useLightSidebarBudgetCta = canScrollToLightVehicleResults && !lightHasSpecificVehicleSelection;
  const showLightSidebarVehicleCta = useLightSidebarBudgetCta || showLightReviewVehicleShopCta;
  const lightSidebarVehicleCtaHref = useLightSidebarBudgetCta
    ? lightELotAllResultsHref
    : lightReviewVehicleShopHref;
  const lightSidebarVehicleCtaLabel = useLightSidebarBudgetCta
    ? lightBodyStyleShopLabel ?? lightGenericBudgetCtaLabel
    : lightReviewVehicleShopLabel;
  const lightSidebarVehicleCtaTitle = useLightSidebarBudgetCta
    ? lightBodyStyleShopLabel
      ? `Shop ${getBodyStyleListingsLabel(lightVehicleResultBodyStyle ?? 'vehicles')} in your budget`
      : 'Shop from your budget'
    : 'Find this car faster';
  const lightSidebarVehicleCtaCopy = useLightSidebarBudgetCta
    ? lightBodyStyleShopLabel && lightVehicleResultBodyStyle
      ? `Jump into C/D Marketplace to compare ${condition} ${getBodyStyleListingsLabel(lightVehicleResultBodyStyle).toLowerCase()} that fit the estimate you just built.`
      : 'Jump into C/D Marketplace to compare real listings that fit the estimate you just built.'
    : `Use C/D Marketplace to compare matching ${selectedVehicle.make} ${selectedVehicle.model} listings, trims, and price context without starting over.`;
  const lightResultDetailsControlsId = showLightReviewSidebarNextSteps && !showLightReviewNextStepsCard && showLightSidebarVehicleCta
    ? lightMarketplaceHandoffId
    : lightEstimateTotalsId;
  const lightResultDetailsToggleText = showLightReviewSidebarNextSteps
    ? showLightReviewNextStepsCard
      ? 'Use this estimate'
      : 'Marketplace'
    : 'Estimate totals';
  const lightResultDetailsToggleActionLabel = showLightReviewSidebarNextSteps
    ? showLightReviewNextStepsCard
      ? 'estimate next steps'
      : 'marketplace action'
    : 'estimate totals';
  const lightReviewPrimaryCtaLabel = lightBodyStyleShopLabel
    ?? (showLightReviewVehicleShopCta ? lightReviewVehicleShopLabel : showLightAffordableDealCards ? lightGenericBudgetCtaLabel : lightShopLabel);
  const isLightReviewPrimaryCtaDisabled = !lightBodyStyleShopLabel && canUseCatalogPrice && lightAffordableDealCards.length === 0;
  const handleLightReviewPrimaryCtaClick = () => {
    if (lightBodyStyleShopLabel) {
      if (lightBodyStyleShopHref?.startsWith('#')) {
        lightAffordableSectionRef.current?.scrollIntoView({ behavior: getPreferredScrollBehavior(), block: 'start' });
        return;
      }

      if (lightBodyStyleShopHref) {
        window.location.assign(lightBodyStyleShopHref);
        return;
      }
    }

    if (showLightReviewVehicleShopCta) {
      window.location.assign(lightReviewVehicleShopHref);
      return;
    }

    if (showLightAffordableDealCards) {
      lightAffordableSectionRef.current?.scrollIntoView({ behavior: getPreferredScrollBehavior(), block: 'start' });
    } else {
      window.location.assign(lightShopHref);
    }
  };
  const leaseResidualValue = leaseMsrp * (leaseResidualPercent / 100);
  const leaseAdjustedCapCost = Math.max(0, leaseMsrp + leaseFees - leaseDueAtSigning);
  const leaseDepreciationCharge = Math.max(0, leaseAdjustedCapCost - leaseResidualValue) / Math.max(1, leaseTerm);
  const leaseRentCharge = (leaseAdjustedCapCost + leaseResidualValue) * leaseMoneyFactor;
  const leasePretaxPayment = leaseDepreciationCharge + leaseRentCharge;
  const leaseMonthlyTax = leasePretaxPayment * stateRule.rate;
  const leaseMonthlyPayment = leasePretaxPayment + leaseMonthlyTax;
  const leaseTotalCost = leaseDueAtSigning + leaseMonthlyPayment * leaseTerm;
  const leaseIncludedMiles = Math.round(leaseAnnualMileage * (leaseTerm / 12));
  const buyoutTax = buyoutPrice * stateRule.rate;
  const buyoutAmountFinanced = Math.max(0, buyoutPrice + buyoutTax + stateRule.titleRegistrationFees - buyoutDownPayment);
  const buyoutMonthlyPayment = monthlyPayment(buyoutAmountFinanced, buyoutApr, buyoutTerm);
  const buyoutTotalPayments = buyoutMonthlyPayment * buyoutTerm;
  const buyoutFinanceCharge = Math.max(0, buyoutTotalPayments - buyoutAmountFinanced);

  const extraDownPaymentMonthly = monthlyPayment(Math.max(0, totalLoanAmount - 1000), activeApr, loanTerm);
  const lowerAprMonthly = monthlyPayment(totalLoanAmount, Math.max(0, activeApr - 1), loanTerm);
  const lowAprVsCash = financeIncentives[0] && cashIncentives[0]
    ? (() => {
        const financeTermOptions = getFinanceTermOptions(financeIncentives[0]);
        const financeApr = getFinanceRateForTerm(financeIncentives[0], financeTermOptions[0]) ?? activeApr;
        const financeTerm = financeTermOptions[0] ?? loanTerm;
        const cashBack = parseMoney(cashIncentives[0].value);
        const financePrincipal = getPurchasePaymentSummary({
          vehiclePrice: workingPrice,
          taxesAndFees,
          financedAddOns: optionalFinancedAddOns,
          tradeEquity,
          rebate: 0,
          downPayment,
          includeTaxesAndFeesInLoan,
        }).amountFinanced;
        const cashPrincipal = getPurchasePaymentSummary({
          vehiclePrice: workingPrice,
          taxesAndFees,
          financedAddOns: optionalFinancedAddOns,
          tradeEquity,
          rebate: cashBack,
          downPayment,
          includeTaxesAndFeesInLoan,
        }).amountFinanced;
        const lowAprPayment = monthlyPayment(financePrincipal, financeApr, financeTerm);
        const cashPayment = monthlyPayment(cashPrincipal, customApr, loanTerm);
        const lowAprTotalPayments = lowAprPayment * financeTerm;
        const cashTotalPayments = cashPayment * loanTerm;
        return {
          label: `${financeIncentives[0].title} vs. ${cashIncentives[0].title}`,
          monthlyDelta: cashPayment - lowAprPayment,
          totalDelta: cashTotalPayments - lowAprTotalPayments,
          finance: {
            title: financeIncentives[0].title,
            principal: financePrincipal,
            apr: financeApr,
            term: financeTerm,
            monthlyPayment: lowAprPayment,
            totalLoanPayments: lowAprTotalPayments,
            totalInterest: Math.max(0, lowAprTotalPayments - financePrincipal),
          },
          cash: {
            title: cashIncentives[0].title,
            principal: cashPrincipal,
            apr: customApr,
            term: loanTerm,
            monthlyPayment: cashPayment,
            totalLoanPayments: cashTotalPayments,
            totalInterest: Math.max(0, cashTotalPayments - cashPrincipal),
          },
        };
      })()
    : null;
  const extraDownTotalLoanPayments = extraDownPaymentMonthly * loanTerm;
  const lowerAprTotalLoanPayments = lowerAprMonthly * loanTerm;
  const extraDownPaymentSavings = Math.max(0, estimatedMonthly - extraDownPaymentMonthly);
  const extraDownLoanPaymentSavings = Math.max(0, totalLoanPayments - extraDownTotalLoanPayments);
  const lowerAprPaymentSavings = Math.max(0, estimatedMonthly - lowerAprMonthly);
  const lowerAprLoanPaymentSavings = Math.max(0, totalLoanPayments - lowerAprTotalLoanPayments);
  const extraMonthlyPayoff = simulateLoanPayoff(totalLoanAmount, activeApr, estimatedMonthly, 50);
  const extraMonthlyLoanPaymentSavings = Math.max(0, totalLoanPayments - extraMonthlyPayoff.totalPaid);
  const extraMonthlyMonthsSaved = Math.max(0, loanTerm - extraMonthlyPayoff.months);
  const extraMonthlyMonthsLabel = `${extraMonthlyMonthsSaved} ${extraMonthlyMonthsSaved === 1 ? 'month' : 'months'}`;
  const selectedFinanceBaselineMetrics = selectedFinance
    ? getEstimateMetricsFor({ apr: customApr, term: loanTerm, rebate: selectedCashTotal })
    : null;
  const selectedFinanceMonthlySavings = selectedFinanceBaselineMetrics
    ? Math.max(0, selectedFinanceBaselineMetrics.monthly - estimatedMonthly)
    : 0;
  const selectedFinanceInterestSavings = selectedFinanceBaselineMetrics
    ? Math.max(0, selectedFinanceBaselineMetrics.interest - totalLoanInterest)
    : 0;
  const financeIncentiveOptions = financeIncentives
    .map((incentive) => {
      const term = getFinanceTermOptions(incentive)[0] ?? loanTerm;
      const apr = getFinanceRateForTerm(incentive, term) ?? activeApr;
      const candidateMetrics = getEstimateMetricsFor({
        apr,
        term,
        rebate: selectedCashTotal + getTierCashBack(incentive, term),
      });

      return {
        incentive,
        apr,
        term,
        metrics: candidateMetrics,
        monthlySavings: estimatedMonthly - candidateMetrics.monthly,
        loanPaymentSavings: totalLoanPayments - candidateMetrics.loanPayments,
        interestSavings: totalLoanInterest - candidateMetrics.interest,
        isSelected: selectedFinanceId === incentive.id,
      };
    })
    .sort((a, b) => (
      b.monthlySavings - a.monthlySavings ||
      b.interestSavings - a.interestSavings ||
      a.apr - b.apr
    ));
  const bestUnappliedFinanceOption = financeIncentiveOptions.find((option) => (
    !option.isSelected &&
    (option.monthlySavings > 1 || option.interestSavings > 50 || option.loanPaymentSavings > 50)
  ));
  const cashIncentiveOptions = cashIncentives
    .map((incentive) => {
      const cashValue = parseMoney(incentive.value);
      const isSelected = selectedCashIds.includes(incentive.id);
      const candidateMetrics = getEstimateMetricsFor({
        apr: activeApr,
        term: loanTerm,
        rebate: rebateTotal + (isSelected ? 0 : cashValue),
      });

      return {
        incentive,
        cashValue,
        metrics: candidateMetrics,
        monthlySavings: estimatedMonthly - candidateMetrics.monthly,
        loanPaymentSavings: totalLoanPayments - candidateMetrics.loanPayments,
        isSelected,
      };
    })
    .sort((a, b) => b.cashValue - a.cashValue || b.monthlySavings - a.monthlySavings);
  const bestUnappliedCashOption = cashIncentiveOptions.find((option) => (
    !option.isSelected &&
    option.cashValue > 0 &&
    (option.monthlySavings > 0 || option.loanPaymentSavings > 0)
  ));
  const estimatedExtraDownToBudget = estimateBudgetFitStatus === 'over' && extraDownPaymentSavings > 0
    ? Math.ceil(((paymentDelta / extraDownPaymentSavings) * 1000) / 500) * 500
    : 0;
  const hasAvailableBuyingIncentives = condition === 'new' && (financeIncentives.length > 0 || cashIncentives.length > 0);
  const lightExpertTipContextCopy: ReactNode = (() => {
    if (condition !== 'new') {
      return 'Used listings can vary a lot, so use these tips to validate the exact listing price, taxes, fees, and financing before comparing vehicles.';
    }

    if (estimateBudgetFitStatus === 'over') {
      return (
        <>
          Focus first on {hasAvailableBuyingIncentives ? 'eligible incentives and ' : ''}a vehicle price near <strong>{currency(affordableMsrp)}</strong> {lightBudgetSupportBasis}.
        </>
      );
    }

    if (selectedFinance || selectedCashTotal > 0) {
      return 'The selected incentive is already reflected here, so the next move is to make sure the dealer preserves it in the written quote and does not offset it with add-ons.';
    }

    if (bestUnappliedFinanceOption || bestUnappliedCashOption) {
      return 'There are eligible incentives available for this vehicle. Check those before changing the budget, term, or down payment.';
    }

    if (estimateBudgetFitStatus === 'under') {
      return 'You have room under budget with this setup. Use these tips to protect that room before accepting fees, add-ons, or a higher APR.';
    }

    return 'Use the highest-impact levers below to decide what to negotiate before comparing cars or talking to a dealer.';
  })();
  const lightOptimizationTips = totalLoanAmount > 0 && loanTerm > 0
    ? (() => {
        const tips: LightOptimizationTip[] = [];

        if (estimateBudgetFitStatus === 'over') {
          tips.push({
            id: 'budget-gap',
            title: 'Get the payment back to budget',
            priority: 110,
            copy: (
              <>
                This estimate is about <strong>{currency(paymentDelta)}/mo</strong> over your {currency(targetMonthlyPayment)}/mo budget.
                Target a price near <strong>{currency(affordableMsrp)}</strong> before tax and fees
                {estimatedExtraDownToBudget > 0 ? (
                  <> or bring about <strong>{currency(estimatedExtraDownToBudget)}</strong> more down if you want to keep this vehicle and term.</>
                ) : (
                  <> before accepting the current deal structure.</>
                )}
              </>
            ),
          });
        }

        if (selectedFinance && (selectedFinanceMonthlySavings > 0 || selectedFinanceInterestSavings > 0)) {
          tips.push({
            id: 'protect-selected-apr',
            title: `Keep ${selectedFinance.title} attached to the quote`,
            priority: 100,
            copy: (
              <>
                The selected finance deal is lowering the estimate by about <strong>{currency(selectedFinanceMonthlySavings)}/mo</strong>
                {selectedFinanceInterestSavings > 0 ? <> and reducing finance charges by about <strong>{currency(selectedFinanceInterestSavings)}</strong></> : null}.
                Confirm the dealer keeps the same vehicle price and does not recover the savings through add-ons or fees.
              </>
            ),
          });
        } else if (bestUnappliedFinanceOption) {
          tips.push({
            id: 'apply-finance-incentive',
            title: `Check ${bestUnappliedFinanceOption.incentive.title}`,
            priority: 98,
            copy: (
              <>
                Applying this APR offer could lower the estimate by about <strong>{currency(Math.max(0, bestUnappliedFinanceOption.monthlySavings))}/mo</strong>
                {bestUnappliedFinanceOption.interestSavings > 0 ? <> and reduce finance charges by about <strong>{currency(bestUnappliedFinanceOption.interestSavings)}</strong></> : null}.
                Verify eligibility and make sure it applies to a {bestUnappliedFinanceOption.term}-month term.
              </>
            ),
          });
        }

        if (bestUnappliedCashOption) {
          tips.push({
            id: 'apply-cash-incentive',
            title: `Apply ${bestUnappliedCashOption.incentive.title}`,
            priority: 92,
            copy: (
              <>
                If this cash incentive stacks with your financing, it can lower the amount financed by <strong>{currency(bestUnappliedCashOption.cashValue)}</strong>
                {bestUnappliedCashOption.monthlySavings > 0 ? <> and reduce the payment by about <strong>{currency(bestUnappliedCashOption.monthlySavings)}/mo</strong></> : null}.
                Ask for it as a line item on the quote.
              </>
            ),
          });
        } else if (selectedCashTotal > 0) {
          tips.push({
            id: 'protect-cash-incentive',
            title: 'Keep the cash incentive itemized',
            priority: 76,
            copy: (
              <>
                Your estimate already includes <strong>{currency(selectedCashTotal)}</strong> in cash incentives.
                Keep that discount separate from dealer markdowns so you can compare the true vehicle price.
              </>
            ),
          });
        }

        if (tradeEquity < 0) {
          tips.push({
            id: 'negative-equity',
            title: 'Do not bury trade payoff in the payment',
            priority: 90,
            copy: (
              <>
                Your trade has about <strong>{currency(Math.abs(tradeEquity))}</strong> in negative equity.
                Ask the dealer to show that payoff separately so it does not hide inside a higher monthly payment.
              </>
            ),
          });
        } else if (tradeEquity > 0) {
          tips.push({
            id: 'protect-trade-equity',
            title: 'Protect your trade equity',
            priority: 70,
            copy: (
              <>
                Your trade is reducing the amount financed by <strong>{currency(tradeEquity)}</strong>.
                Compare the trade value and vehicle price as separate numbers before agreeing to the final payment.
              </>
            ),
          });
        }

        if (taxesAndFees >= 1500) {
          tips.push({
            id: 'audit-fees',
            title: 'Ask for a line-item fee sheet',
            priority: 64,
            copy: (
              <>
                Taxes and fees add <strong>{currency(taxesAndFees)}</strong> to this estimate.
                Before shopping by monthly payment, confirm registration, documentation, add-ons, and market adjustments in writing.
              </>
            ),
          });
        }

        tips.push(
          {
          id: 'extra-down',
          title: 'Add $1,000 down',
            priority: estimateBudgetFitStatus === 'over' ? 72 : 46,
          copy: (
            <>
              If you put down $1,000 extra, you can lower your monthly payment by{' '}
              <strong>{currency(extraDownPaymentSavings)}/mo</strong> and your overall out-of-pocket costs by{' '}
              <strong>{currency(extraDownLoanPaymentSavings)}</strong> over the course of the loan.
            </>
          ),
          },
          ...(activeApr > 0.25 && lowerAprPaymentSavings > 0
            ? [{
                id: 'lower-apr',
                title: 'Lower APR by 1 point',
                priority: bestUnappliedFinanceOption || selectedFinance ? 50 : 78,
                copy: (
                  <>
                    If you lower your APR by 1 point, you can lower your monthly payment by{' '}
                    <strong>{currency(lowerAprPaymentSavings)}/mo</strong> and your overall out-of-pocket costs by{' '}
                    <strong>{currency(lowerAprLoanPaymentSavings)}</strong> over the course of the loan.
                  </>
                ),
              }]
            : []),
          ...(extraMonthlyLoanPaymentSavings > 0 && extraMonthlyMonthsSaved > 0
            ? [{
                id: 'extra-monthly',
                title: 'Pay $50 extra each month',
                priority: 42,
                copy: (
                  <>
                    Paying an extra $50 per month can lower your overall out-of-pocket costs by{' '}
                    <strong>{currency(extraMonthlyLoanPaymentSavings)}</strong> over the course of the loan and help you pay it off{' '}
                    <strong>{extraMonthlyMonthsLabel}</strong> earlier.
                  </>
                ),
              }]
            : []),
        );

        return tips
          .filter((tip, index, allTips) => allTips.findIndex((item) => item.id === tip.id) === index)
          .sort((a, b) => b.priority - a.priority)
          .slice(0, 3);
      })()
    : [];
  const aiTargetPrice = Math.max(0, workingPrice - Math.max(750, workingPrice * 0.025));
  const aiTargetTaxableAmount = getTaxableAmount(aiTargetPrice, tradeInValue, rebateTotal, stateRule.taxRule);
  const aiTargetSalesTax = salesTaxDollarOverride ?? aiTargetTaxableAmount * effectiveSalesTaxRate;
  const aiTargetOutTheDoor = aiTargetPrice + aiTargetSalesTax + fees + optionalFinancedAddOns;
  const aiTargetLoanAmount = getPurchasePaymentSummary({
    vehiclePrice: aiTargetPrice,
    taxesAndFees: aiTargetSalesTax + fees,
    financedAddOns: optionalFinancedAddOns,
    tradeEquity,
    rebate: rebateTotal,
    downPayment,
    includeTaxesAndFeesInLoan,
  }).amountFinanced;
  const negotiatedDiscount = Math.max(0, selectedCatalogPrice - workingPrice);
  const aiBestOfferPath = lowAprVsCash
    ? lowAprVsCash.totalDelta > 0
      ? `${financeIncentives[0].title} looks stronger than cash back by about ${currency(Math.abs(lowAprVsCash.totalDelta))} over the compared terms.`
      : `${cashIncentives[0].title} looks stronger than the low-APR deal by about ${currency(Math.abs(lowAprVsCash.totalDelta))} over the compared terms.`
    : selectedFinance
      ? `${selectedFinance.title} is active. Keep it only if the dealer preserves the negotiated price and does not add fee markup.`
      : cashIncentives[0]
        ? `${cashIncentives[0].title} is the best visible incentive to pressure-test against your own financing.`
        : 'No active manufacturer deal is selected. Treat dealer discount, APR, and fees as the main negotiation levers.';
  const aiSelectedIncentiveIds = new Set([
    ...selectedCashIds,
    ...(selectedFinanceId === 'custom' ? [] : [selectedFinanceId]),
  ]);
  const aiAvailableBuyingIncentives = incentives.filter(isBuyingIncentive);
  const aiAppliedBuyingIncentives = aiAvailableBuyingIncentives.filter((incentive) => aiSelectedIncentiveIds.has(incentive.id));
  const aiUnappliedBuyingIncentives = aiAvailableBuyingIncentives.filter((incentive) => !aiSelectedIncentiveIds.has(incentive.id));
  const aiIncentiveChecks = (() => {
    if (condition !== 'new') return [];

    if (!lightHasSpecificVehicleSelection) {
      const nearbyIncentiveLabels = lightAffordableDealCards
        .map(({ vehicle, primaryIncentive }) => {
          const buyingIncentive = isBuyingIncentive(primaryIncentive)
            ? primaryIncentive
            : getVehicleIncentives(vehicle.make, vehicle.model).incentives.find(isBuyingIncentive);

          return buyingIncentive
            ? `${vehicle.year} ${vehicle.make} ${vehicle.model}: ${buyingIncentive.title}`
            : '';
        })
        .filter(Boolean)
        .slice(0, 3);

      if (nearbyIncentiveLabels.length > 0) {
        return [
          `Current price has incentive-backed matches to check: ${formatInlineList(nearbyIncentiveLabels)}. Pick a vehicle to apply the exact program to this estimate.`,
        ];
      }

      return ['Choose a vehicle to check model-specific cash and APR incentives against this estimate.'];
    }

    if (aiAvailableBuyingIncentives.length === 0) {
      return [
        `Checked visible programs for ${selectedVehicleLabel}: no cash-back or promotional APR is currently attached. Ask the dealer to confirm regional, loyalty, conquest, or captive-finance offers.`,
      ];
    }

    if (aiUnappliedBuyingIncentives.length > 0) {
      return [
        `Potential programs for ${selectedVehicleLabel}: ${formatAiIncentiveList(aiUnappliedBuyingIncentives)}. Apply or compare them before judging the payment.`,
      ];
    }

    return [
      `Visible ${aiAppliedBuyingIncentives.length === 1 ? 'program is' : 'programs are'} already applied: ${formatAiIncentiveList(aiAppliedBuyingIncentives)}. Make sure the dealer lists ${aiAppliedBuyingIncentives.length === 1 ? 'it' : 'them'} separately and does not offset savings with fees.`,
    ];
  })();
  const aiDealerFlags = [
    activeApr > 8 ? `${formatAprPercent(activeApr)} APR is high enough to shop a bank or credit union quote before the dealer visit.` : '',
    fees > 900 ? `${currency(fees)} in title, registration, dealer, and other fees deserves an itemized quote.` : '',
    canUseCatalogPrice && lightHasSpecificVehicleSelection && negotiatedDiscount < selectedCatalogPrice * 0.02 ? 'The current price is close to MSRP. Ask for a real selling-price discount before discussing payment.' : '',
    ...aiIncentiveChecks,
  ].filter(Boolean);
  const aiMonthlyWalkAway = Math.max(0, Math.min(estimatedMonthlyWithInsurance, targetMonthlyPayment || estimatedMonthlyWithInsurance) - 25);
  const aiPriceSavingsTarget = Math.max(0, workingPrice - aiTargetPrice);
  const aiAprTarget = Math.max(0, activeApr - 1);
  const aiFeeGuardrailLabel = fees > 0 ? currency(fees) : 'No add-ons';
  const aiFeeGuardrailCopy = fees > 0
    ? `Estimated registration and dealer fees are currently ${currency(fees)}. Ask what each one covers and reject duplicate add-ons.`
    : `Keep dealer add-ons at ${currency(0)} and ask for every doc, protection, and market adjustment line in writing.`;
  const aiDealActions = [
    {
      title: 'Counter the selling price',
      value: currency(aiTargetPrice),
      body: `${aiPriceSavingsTarget > 0 ? `Aim for about ${currency(aiPriceSavingsTarget)} off the current price. ` : ''}Do this before discussing payment, trade, or financing.`,
    },
    {
      title: 'Protect the payment',
      value: `${currency(aiMonthlyWalkAway)}/mo`,
      body: `Treat this as the walk-away zone. If the dealer can only hit it by stretching the term or adding cash down, compare total cost first.`,
    },
    {
      title: 'Shop the APR',
      value: `${formatAprPercent(aiAprTarget)} target`,
      body: `Bring a bank or credit-union quote and ask the dealer to beat it without changing the selling price or fees.`,
    },
    {
      title: 'Cap fees and add-ons',
      value: aiFeeGuardrailLabel,
      body: aiFeeGuardrailCopy,
    },
  ];
  const aiQuoteChecklist = [
    'Selling price before rebates, trade, taxes, and fees',
    'Itemized tax, title, registration, doc fee, and dealer fees',
    'APR, lender name, loan term, and amount financed',
    'Rebates, loyalty, conquest, or finance incentives applied',
    'Every add-on package, protection product, or market adjustment',
    `Final due at signing near ${currency(cashDueAtSigning)} and target amount financed near ${currency(aiTargetLoanAmount)}`,
  ];
  const aiDealRisks = aiDealerFlags.length > 0
    ? aiDealerFlags
    : ['No major markup flags from the visible inputs. Still ask for a full worksheet before signing.'];

  const handleSendLightEstimateEmail = async () => {
    const trimmed = lightEstimateEmail.trim();
    const useEmailTestMode = isPaymentEstimateEmailTestMode();
    if (!trimmed) {
      setLightEstimateEmailError('Enter an email address.');
      setLightEstimateEmailStatus(undefined);
      return;
    }
    if (!useEmailTestMode && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setLightEstimateEmailError('Enter a valid email address.');
      setLightEstimateEmailStatus(undefined);
      return;
    }
    setLightEstimateEmailError(undefined);
    setLightEstimateEmailStatus(undefined);
    setIsLightEstimateEmailSending(true);

    if (useEmailTestMode) {
      setLightEstimateEmailStatus(`Test estimate accepted for ${trimmed}.`);
      setIsLightEstimateEmailSending(false);
      return;
    }

    const estimateRows = [
      { label: 'Rate & Term', value: `${formatAprPercent(activeApr)} APR - ${loanTerm} mo` },
      { label: workingPriceBreakdownLabel, value: currency(workingPrice) },
      { label: 'Estimated Taxes & Fees', value: currency(taxesAndFees) },
      ...(optionalFinancedAddOns > 0 ? [{ label: 'Extended Warranty', value: currency(optionalFinancedAddOns) }] : []),
      { label: 'Trade-In Value', value: tradeInValue > 0 ? currency(tradeInValue) : currency(0) },
      ...(showTradePayoffBreakdown ? [{ label: 'Amount Owed on Trade', value: currency(amountOwed) }] : []),
      ...(showTradeCreditAppliedBreakdown ? [{ label: 'Trade Credit Applied', value: currency(tradeEquityApplied) }] : []),
      ...(hasRemainingTradeEquity ? [{ label: 'Remaining Trade Equity', value: currency(remainingTradeEquity) }] : []),
      { label: downPaymentBreakdownLabel, value: currency(downPaymentApplied) },
      { label: 'Amount Financed', value: currency(totalLoanAmount) },
      { label: isLoanCoveredByTradeEquity ? 'Loan Payment' : 'Monthly Payment', value: monthlyLoanPaymentDisplay },
      ...(monthlyInsuranceAmount > 0 ? [{ label: 'Insurance Estimate', value: `${currency(monthlyInsuranceAmount)}/mo` }] : []),
      { label: 'Finance Charge', value: currency(totalLoanInterest) },
      { label: `Total Loan Payments Over ${loanTerm} Months`, value: currency(totalLoanPayments) },
      ...(totalInsuranceCost > 0 ? [{ label: `Insurance Over ${loanTerm} Months`, value: currency(totalInsuranceCost) }] : []),
      ...(showTotalIncludingTradeCredit ? [{ label: cashLoanPaymentsLabel, value: currency(totalCost) }] : []),
      { label: estimatedTotalLabel, value: currency(estimatedTotalValue), emphasis: true },
    ];

    try {
      const response = await fetch(getPaymentEstimateEmailEndpoint(), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: trimmed,
          testMode: useEmailTestMode,
          userName: user?.name,
          vehicle: {
            condition,
            year: selectedYear,
            make: selectedVehicle.make,
            model: selectedVehicle.model,
            trim: selectedTrimStyleOption?.trimName,
            bodyStyle: selectedVehicle.bodyStyle,
            image: selectedVehicle.image,
            shopUrl: lightReviewVehicleShopHref,
          },
          estimate: {
            monthlyPayment: currentMonthlyCostDisplay,
            summary: lightEstimateSummaryCopy,
            rows: estimateRows,
          },
          mockUrl: getPaymentEstimateEmailMockUrl(),
        }),
      });
      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        if (useEmailTestMode) {
          setLightEstimateEmailStatus(`Test estimate accepted for ${trimmed}.`);
          return;
        }
        throw new Error(typeof result.error === 'string' ? result.error : 'We could not send this estimate. Please try again.');
      }

      setLightEstimateEmailStatus(typeof result.message === 'string' ? result.message : `Estimate sent to ${trimmed}.`);
    } catch (error) {
      if (useEmailTestMode) {
        setLightEstimateEmailStatus(`Test estimate accepted for ${trimmed}.`);
        return;
      }
      setLightEstimateEmailError(error instanceof Error ? error.message : 'We could not send this estimate. Please try again.');
    } finally {
      setIsLightEstimateEmailSending(false);
    }
  };
  const incentiveOfferDetail = useMemo(() => {
    if (!selectedIncentive) return undefined;
    const modalVehicle = lightDealModalVehicle ?? selectedVehicle;
    const modalYear = lightDealModalVehicle?.year ?? selectedYear;

    return {
      year: parseInt(modalYear, 10),
      make: modalVehicle.make,
      model: modalVehicle.model,
      slug: modalVehicle.slug,
      imageUrl: modalVehicle.image,
      msrpMin: modalVehicle.priceMin,
      msrpMax: modalVehicle.priceMax,
      offerHeadline: selectedIncentive.title,
      whatItMeans: selectedIncentive.description,
      yourSavings: selectedIncentive.terms || selectedIncentive.description,
      whoQualifies: selectedIncentive.eligibility || 'All qualified buyers. See dealer for details.',
      eligibleTrims: ['Base', 'Sport', 'Premium'],
      dontWaitText: `This deal expires ${selectedIncentive.expirationDate}. Manufacturer deals change monthly, so confirm availability before you shop.`,
      expirationDate: selectedIncentive.expirationDate,
    };
  }, [lightDealModalVehicle, selectedIncentive, selectedVehicle, selectedYear]);

  const applySelectedVehicle = useCallback((vehicle: Vehicle, options?: { selectedYear?: string; syncCatalogPrice?: boolean }) => {
    const nextYear = options?.selectedYear ?? vehicle.year;
    setSelectedSlug(vehicle.slug);
    setSelectedYear(nextYear);
    setLightKnownVehicleSelected(true);
    setLightVehicleDraft({
      year: nextYear,
      make: vehicle.make,
      model: vehicle.model,
    });
    setLightVehicleSearchQuery(formatLightVehicleSearchLabel({ year: nextYear, make: vehicle.make, model: vehicle.model }));
    setSelectedTrimId(null);
    if (options?.syncCatalogPrice ?? true) {
      syncCatalogPrice(vehicle.priceMin);
    }
    setSelectedCashIds([]);
    setSelectedFinanceId('custom');
    setLoanTerm(60);
  }, [syncCatalogPrice]);

  const applyLightVehicleSearchOption = useCallback((option: LightVehicleSearchOption) => {
    applySelectedVehicle(option.vehicle, {
      selectedYear: option.year,
      syncCatalogPrice: condition !== 'used',
    });
    setShowLightVehicleSearchSuggestions(false);
    setLightVehicleSearchActiveIndex(0);
  }, [applySelectedVehicle, condition]);

  const clearLightSpecificVehicleSelection = useCallback(() => {
    setLightKnownVehicleSelected(false);
    setLightVehicleDraft({ year: '', make: '', model: '' });
    setLightVehicleSearchQuery('');
    setSelectedTrimId(null);
    setSelectedCashIds([]);
    setSelectedFinanceId('custom');
    setLightDealModalVehicle(null);
  }, []);

  const handleLightVehicleStepModeChange = useCallback((nextMode: 'known' | 'browsing') => {
    setLightVehicleStepMode(nextMode);
    if (nextMode === 'browsing') {
      clearLightSpecificVehicleSelection();
    }
  }, [clearLightSpecificVehicleSelection]);

  const handleLightBrowseBodyStyleChange = useCallback((nextBodyStyle: string) => {
    setLightBrowseBodyStyle(nextBodyStyle);
    clearLightSpecificVehicleSelection();
  }, [clearLightSpecificVehicleSelection]);

  const handleLightBrowseVehicleMatchSelect = useCallback((vehicle: Vehicle) => {
    setLightVehicleStepMode('known');
    applySelectedVehicle(vehicle, {
      selectedYear: vehicle.year,
      syncCatalogPrice: condition !== 'used',
    });
    setShowLightVehicleSearchSuggestions(false);
    setLightVehicleSearchActiveIndex(0);
  }, [applySelectedVehicle, condition]);

  const handleLightVehicleSearchChange = useCallback((value: string) => {
    setLightVehicleSearchQuery(value);
    setShowLightVehicleSearchSuggestions(true);
    setLightVehicleSearchActiveIndex(0);

    const option = getLightVehicleSearchOption(value);
    if (option) {
      applyLightVehicleSearchOption(option);
      return;
    }

    setLightKnownVehicleSelected(false);
    setLightVehicleDraft({ year: '', make: '', model: '' });
    setSelectedTrimId(null);
    setSelectedCashIds([]);
    setSelectedFinanceId('custom');
  }, [applyLightVehicleSearchOption, getLightVehicleSearchOption]);

  const handleLightVehicleSearchBlur = useCallback((value: string) => {
    const option = getLightVehicleSearchOption(value);
    if (option) {
      applyLightVehicleSearchOption(option);
    }
  }, [applyLightVehicleSearchOption, getLightVehicleSearchOption]);

  const handleLightVehicleSearchKeyDown = useCallback((event: ReactKeyboardEvent<HTMLInputElement>) => {
    if (!lightVehicleSearchSuggestions.length) return;

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setShowLightVehicleSearchSuggestions(true);
      setLightVehicleSearchActiveIndex((current) => (current + 1) % lightVehicleSearchSuggestions.length);
      return;
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      setShowLightVehicleSearchSuggestions(true);
      setLightVehicleSearchActiveIndex((current) => (
        current === 0 ? lightVehicleSearchSuggestions.length - 1 : current - 1
      ));
      return;
    }

    if (event.key === 'Enter' && isLightVehicleSearchMenuOpen) {
      event.preventDefault();
      const option = lightVehicleSearchSuggestions[lightVehicleSearchActiveIndex];
      if (option) {
        applyLightVehicleSearchOption(option);
      }
      return;
    }

    if (event.key === 'Escape') {
      setShowLightVehicleSearchSuggestions(false);
    }
  }, [
    applyLightVehicleSearchOption,
    isLightVehicleSearchMenuOpen,
    lightVehicleSearchActiveIndex,
    lightVehicleSearchSuggestions,
  ]);

  const updateVehicleByParts = (partial: Partial<Pick<Vehicle, 'year' | 'make' | 'model' | 'slug'>>) => {
    const exactSlug = partial.slug;

    if (exactSlug) {
      const next = vehicles.find((vehicle) => vehicle.slug === exactSlug);
      if (!next) return;

      setLightKnownVehicleSelected(true);
      if (condition === 'used') {
        applySelectedVehicle(next, { selectedYear: lightVehicleYearValue || selectedYear, syncCatalogPrice: false });
      } else {
        applySelectedVehicle(next);
      }
      return;
    }

    const yearChanged = partial.year !== undefined;
    const makeChanged = partial.make !== undefined;
    const nextYear = partial.year ?? lightVehicleYearValue;
    const nextMake = partial.make ?? (yearChanged ? '' : lightVehicleMakeValue);
    const nextModel = partial.model ?? (yearChanged || makeChanged ? '' : lightVehicleModelValue);

    setLightVehicleDraft({
      year: nextYear,
      make: nextMake,
      model: nextModel,
    });

    if (nextYear) {
      setSelectedYear(nextYear);
    }

    if (!nextYear || !nextMake || !nextModel) {
      setLightKnownVehicleSelected(false);
      setSelectedTrimId(null);
      setSelectedCashIds([]);
      setSelectedFinanceId('custom');
      return;
    }

    const next = vehicles.find((vehicle) => (
      (condition === 'used' || vehicle.year === nextYear) &&
      vehicle.make === nextMake &&
      vehicle.model === nextModel
    ));

    if (!next) {
      setLightKnownVehicleSelected(false);
      setSelectedTrimId(null);
      setSelectedCashIds([]);
      setSelectedFinanceId('custom');
      return;
    }

    setLightKnownVehicleSelected(true);
    if (condition === 'used') {
      applySelectedVehicle(next, { selectedYear: nextYear, syncCatalogPrice: false });
    } else {
      applySelectedVehicle(next);
    }
  };

  const handleTrimStyleChange = (nextValue: string) => {
    const nextTrimOption = availableTrimStyleOptions.find((option) => option.value === nextValue);
    if (!nextTrimOption) {
      updateVehicleByParts({ slug: nextValue });
      return;
    }

    setLightKnownVehicleSelected(true);
    setSelectedTrimId(nextTrimOption.trimId);
    if (canUseCatalogPrice) {
      syncCatalogPrice(nextTrimOption.price);
    }
  };

  const handleLightStartOver = () => {
    goToLightWizardStep(1);
    hasAdjustedLightDownPaymentRef.current = false;
    hasAdjustedLightAprRef.current = false;
    setLightVehicleStepMode('known');
    setLightKnownVehicleSelected(false);
    setLightVehicleDraft({ year: '', make: '', model: '' });
    setLightVehicleSearchQuery('');
    setLightAffordableOffersSlug(null);
    setLightDealModalVehicle(null);
    setSelectedCashIds([]);
    setSelectedFinanceId('custom');
    setIncludeExtendedWarranty(false);
    setHasEditedExtendedWarrantyCost(false);
    setExtendedWarrantyCost(suggestedExtendedWarrantyCost);
    setIncludeInsuranceEstimate(false);
    setHasEditedMonthlyInsuranceEstimate(false);
    setMonthlyInsuranceEstimate(suggestedMonthlyInsuranceEstimate);
    setDownPayment(getDefaultLightDownPayment(boundLightVehiclePrice(price)));
    setCustomApr(condition === 'used' ? LIGHT_DEFAULT_USED_APR : LIGHT_DEFAULT_NEW_APR);
    setLoanTerm(60);
  };

  const handleVehicleConditionChange = (nextCondition: VehicleCondition) => {
    setCondition(nextCondition);
    setSelectedCashIds([]);
    setSelectedFinanceId('custom');

    if (isLightVariant && !hasAdjustedLightAprRef.current) {
      setCustomApr(nextCondition === 'used' ? LIGHT_DEFAULT_USED_APR : LIGHT_DEFAULT_NEW_APR);
    }

    if (nextCondition === 'used' && !USED_YEAR_OPTIONS.includes(selectedYear)) {
      const nextYear = USED_YEAR_OPTIONS[0];
      setSelectedYear(nextYear);
      setLightVehicleDraft((current) => ({
        ...current,
        year: nextYear,
      }));
      setLightVehicleSearchQuery(lightKnownVehicleSelected
        ? formatLightVehicleSearchLabel({ year: nextYear, make: selectedVehicle.make, model: selectedVehicle.model })
        : '');
    }

    if (nextCondition === 'new') {
      setSelectedYear(selectedVehicle.year);
      setLightVehicleDraft((current) => ({
        year: lightKnownVehicleSelected ? selectedVehicle.year : current.year,
        make: lightKnownVehicleSelected ? selectedVehicle.make : current.make,
        model: lightKnownVehicleSelected ? selectedVehicle.model : current.model,
      }));
      setLightVehicleSearchQuery(lightKnownVehicleSelected
        ? formatLightVehicleSearchLabel(selectedVehicle)
        : '');
    }
  };

  const handleLightTradeSalesTaxPercentChange = (raw: string) => {
    if (raw.trim() === '') {
      setLightSalesTaxPercentOverride('');
      return;
    }
    const pct = numberInput(raw);
    setLightSalesTaxPercentOverride(String(pct));
    setSalesTaxOverride('');
  };

  const handleOfferClick = (incentive: Incentive) => {
    setSelectedIncentive(incentive);
    setShowIncentiveModal(true);
  };

  const applyOfferToEstimate = (incentive: Incentive) => {
    if (incentive.type === 'cash') {
      setSelectedCashIds((current) => current.includes(incentive.id)
        ? current.filter((id) => id !== incentive.id)
        : [...current, incentive.id]);
      return;
    }

    if (incentive.type === 'finance') {
      if (selectedFinanceId === incentive.id) {
        setSelectedFinanceId('custom');
        return;
      }

      const nextTerm = getFinanceTermOptions(incentive)[0] ?? 60;
      setLoanTerm(nextTerm);
      setSelectedFinanceId(incentive.id);
    }
  };

  const applyTradeToolEstimate = (estimate: {
    vehicle: string;
    mileage: number;
    condition: TradeCondition;
    value: number;
  }) => {
    setTradeVehicle(estimate.vehicle);
    setTradeMileage(estimate.mileage);
    setTradeCondition(estimate.condition);
    setTradeInValue(estimate.value);
    setShowTradeTool(false);
  };

  const scrollAffordableVehicles = (direction: 'previous' | 'next') => {
    const carousel = affordableCarouselRef.current;
    if (!carousel) return;

    carousel.scrollBy({
      left: direction === 'next' ? carousel.clientWidth * 0.9 : -carousel.clientWidth * 0.9,
      behavior: getPreferredScrollBehavior(),
    });
  };

  const scrollLightBodyStyles = (direction: 'previous' | 'next') => {
    const carousel = lightBodyStyleCarouselRef.current;
    if (!carousel) return;

    carousel.scrollBy({
      left: direction === 'next' ? carousel.clientWidth * 0.82 : -carousel.clientWidth * 0.82,
      behavior: getPreferredScrollBehavior(),
    });
  };

  const scrollShoppingTools = (direction: 'previous' | 'next') => {
    const carousel = shoppingToolsRef.current;
    if (!carousel) return;

    carousel.scrollBy({
      left: direction === 'next' ? carousel.clientWidth * 0.9 : -carousel.clientWidth * 0.9,
      behavior: getPreferredScrollBehavior(),
    });
  };

  const updateLightBodyStyleCarouselState = () => {
    const carousel = lightBodyStyleCarouselRef.current;
    if (!carousel) return;
    const maxScrollLeft = carousel.scrollWidth - carousel.clientWidth;

    setLightBodyStyleCarouselState({
      canScrollPrevious: carousel.scrollLeft > 1,
      canScrollNext: carousel.scrollLeft < maxScrollLeft - 1,
    });
  };

  const updateAffordableCarouselState = () => {
    const carousel = affordableCarouselRef.current;
    if (!carousel) return;
    const maxScrollLeft = carousel.scrollWidth - carousel.clientWidth;

    setAffordableCarouselState({
      canScrollPrevious: carousel.scrollLeft > 1,
      canScrollNext: carousel.scrollLeft < maxScrollLeft - 1,
    });
  };

  useEffect(() => {
    const carousel = lightBodyStyleCarouselRef.current;
    if (!carousel) return;

    updateLightBodyStyleCarouselState();
    carousel.addEventListener('scroll', updateLightBodyStyleCarouselState, { passive: true });
    window.addEventListener('resize', updateLightBodyStyleCarouselState);

    return () => {
      carousel.removeEventListener('scroll', updateLightBodyStyleCarouselState);
      window.removeEventListener('resize', updateLightBodyStyleCarouselState);
    };
  }, [lightVehicleBrowseTiles.length, lightVehicleStepMode]);

  useEffect(() => {
    const carousel = affordableCarouselRef.current;
    if (!carousel) return;

    updateAffordableCarouselState();
    carousel.addEventListener('scroll', updateAffordableCarouselState, { passive: true });
    window.addEventListener('resize', updateAffordableCarouselState);

    return () => {
      carousel.removeEventListener('scroll', updateAffordableCarouselState);
      window.removeEventListener('resize', updateAffordableCarouselState);
    };
  }, [
    lightAffordableBudgetCeiling,
    lightAffordableDealCards.length,
    lightELotListings.length,
    selectedVehicle.bodyStyle,
    vehicles,
  ]);

  useEffect(() => {
    const summary = summaryRef.current;
    if (!summary) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowMobileSummary(!entry.isIntersecting);
      },
      { threshold: 0.05 },
    );

    observer.observe(summary);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const previousStep = lightWizardStepPrevRef.current;
    const previousPath = lightWizardPathPrevRef.current;
    lightWizardStepPrevRef.current = lightWizardStep;
    lightWizardPathPrevRef.current = location.pathname;
    if (!isLightStepsVariant || (previousStep === lightWizardStep && previousPath === location.pathname)) return;

    if (previousStep !== lightWizardStep) {
      const nextMotion = lightWizardStep > previousStep ? 'forward' : 'backward';
      setLightWizardStepMotion((currentMotion) => currentMotion === nextMotion ? currentMotion : nextMotion);
    }

    const shell = lightWizardShellRef.current;
    const panel = lightWizardPanelRef.current;
    const heading = panel?.querySelector<HTMLElement>('#aio-payment-light-heading');
    if (!shell || !heading) return;

    const scrollFrame = window.requestAnimationFrame(() => {
      shell.scrollIntoView({ behavior: getPreferredScrollBehavior(), block: 'start' });
      heading.focus({ preventScroll: true });
    });

    return () => window.cancelAnimationFrame(scrollFrame);
  }, [isLightStepsVariant, lightWizardStep, location.pathname]);

  useEffect(() => {
    if (!isLightStepsVariant || lightWizardStepMotion === 'none') return undefined;

    const motionResetTimeout = window.setTimeout(() => {
      setLightWizardStepMotion('none');
    }, 520);

    return () => window.clearTimeout(motionResetTimeout);
  }, [isLightStepsVariant, lightWizardStep, lightWizardStepMotion]);

  if (isLightVariant) {
    const lightWizardStepMeta = LIGHT_WIZARD_STEP_META[lightWizardStep - 1];
    const lightWizardStepMotionAttribute = isLightStepsVariant && lightWizardStepMotion !== 'none'
      ? lightWizardStepMotion
      : undefined;
    const lightWizardProgressScale = Math.max(
      0,
      Math.min(1, (lightWizardStep - 1) / Math.max(1, LIGHT_WIZARD_STEP_META.length - 1)),
    );
    const lightLoanTermChips = [...new Set(termOptions)].sort((a, b) => a - b);
    const lightHeroHeadline = toTitleCase(
      isLightStepsVariant
        ? 'See what your monthly budget can really buy.'
        : 'Fine-tune your car payment estimate.',
    );
    return (
      <div className={`aio-payment aio-payment--light${isLightStepsVariant ? ' aio-payment--light-steps' : ''}${isLightSteps2Variant ? ' aio-payment--light-steps2' : ''}${isLightStepsVariant && lightWizardStep === 5 ? ' aio-payment--light-review-step' : ''}${isLightStepsVariant && lightWizardStep === 5 && showLightSidebarVehicleCta ? ' aio-payment--light-review-cta' : ''}${isLightStepsVariant && showLightMobileTotals ? ' aio-payment--light-mobile-totals-open' : ''}`}>
        <section className="aio-payment__light-hero">
          <div className="container">
            <nav className="aio-payment__light-breadcrumb" aria-label="Breadcrumb">
              <Link to="/">Home</Link>
              <span>/</span>
              <Link to="/auto-loan-calculator">Auto Loan Calculator</Link>
              <span>/</span>
              <span>{isLightStepsVariant ? 'Guided steps' : 'Advanced mode'}</span>
            </nav>
            <div className="aio-payment__light-hero-grid">
              <div>
                <h1>{lightHeroHeadline}</h1>
                <p>
                  {isLightStepsVariant
                    ? 'The budget-first car payment calculator. Answer one question at a time and watch your numbers update live.'
                    : 'Adjust budget, loan terms, vehicle price, trade-in, deals, and payment details together on one page.'}
                </p>
                {isLightStepsVariant && (
                  <p className="aio-payment__light-privacy-note">
                    Realistic math. No personal info required.
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="aio-payment__light-main" aria-labelledby="aio-payment-light-heading">
          <div className="container">
            <div
              className={`aio-payment__light-shell${isLightStepsVariant && lightWizardStep === 5 ? ' aio-payment__light-shell--review' : ''}`}
              ref={isLightStepsVariant ? lightWizardShellRef : undefined}
            >
              {isLightStepsVariant ? (
                <div
                  key={`light-wizard-strip-${lightWizardStep}`}
                  className="aio-payment__light-wizard-strip"
                  data-step-motion={lightWizardStepMotionAttribute}
                >
                  <nav className="aio-payment__light-wizard-track" aria-label="Estimate steps">
                    <div
                      className="aio-payment__light-wizard-steps-shell"
                      style={{ '--aio-light-wizard-progress-scale': lightWizardProgressScale } as CSSProperties}
                    >
                      <ol className="aio-payment__light-wizard-steps">
                        {LIGHT_WIZARD_STEP_META.map((stepMeta, index) => {
                          const stepNumber = index + 1;
                          const isDone = lightWizardStep > stepNumber;
                          const isCurrent = lightWizardStep === stepNumber;
                          const isFinalCurrent = isCurrent && stepNumber === LIGHT_WIZARD_STEP_META.length;
                          return (
                            <li key={stepMeta.label} className="aio-payment__light-wizard-step">
                              <button
                                type="button"
                                className={`aio-payment__light-wizard-dot${isCurrent ? ' aio-payment__light-wizard-dot--current' : ''}${isDone ? ' aio-payment__light-wizard-dot--done' : ''}${isFinalCurrent ? ' aio-payment__light-wizard-dot--final-current' : ''}`}
                                disabled={stepNumber > lightWizardStep}
                                aria-current={isCurrent ? 'step' : undefined}
                                aria-label={`${stepMeta.label}${isDone ? ', completed' : ''}${isCurrent ? ', current step' : ''}`}
                                onClick={() => {
                                  if (stepNumber <= lightWizardStep) goToLightWizardStep(stepNumber);
                                }}
                              >
                                <span className="aio-payment__light-wizard-dot-ring" aria-hidden="true">
                                  {isDone ? <Check size={14} strokeWidth={2.25} aria-hidden="true" /> : stepNumber}
                                </span>
                                <span className="aio-payment__light-wizard-dot-label">{stepMeta.short}</span>
                              </button>
                            </li>
                          );
                        })}
                      </ol>
                    </div>
                  </nav>
                </div>
              ) : null}
              <div
                key={isLightStepsVariant ? `light-wizard-step-${lightWizardStep}` : 'light-calculator-card'}
                className={`aio-payment__light-card${isLightStepsVariant ? ' aio-payment__light-card--step-panel' : ''}`}
                data-step-motion={lightWizardStepMotionAttribute}
                ref={isLightStepsVariant ? lightWizardPanelRef : undefined}
              >
              {isLightStepsVariant ? (
                <div className="aio-payment__section-heading aio-payment__section-heading--wizard">
                  <p className="aio-payment__light-wizard-step-eyebrow">
                    <span className="aio-payment__light-wizard-step-eyebrow-progress">
                      Step {lightWizardStep} of 5
                    </span>
                    {lightWizardStepMeta.panelEyebrowSuffix ? (
                      <span className="aio-payment__light-wizard-step-eyebrow-muted">
                        {lightWizardStepMeta.panelEyebrowSuffix}
                      </span>
                    ) : null}
                  </p>
                  <h2 id="aio-payment-light-heading" tabIndex={-1}>
                    {lightWizardStepMeta.panelTitle ?? lightWizardStepMeta.label}
                  </h2>
                  <p className="aio-payment__light-heading-copy">
                    {lightWizardStepMeta.panelIntro ?? lightWizardStepMeta.hint}
                  </p>
                </div>
              ) : (
                <div className="aio-payment__section-heading">
                  <h2 id="aio-payment-light-heading">Advanced estimate</h2>
                  <p className="aio-payment__light-heading-copy">
                    All sections stay open so you can jump between budget, loan, vehicle, trade, incentives, and totals in any order.
                  </p>
                </div>
              )}

              {isLightStepsVariant && lightWizardStep === 5 && (
                <section className="aio-payment__light-review-hero" aria-label="Personalized estimate summary">
                  <div className="aio-payment__light-review-hero-main">
                    <p className="aio-payment__light-review-hero-kicker">{lightResultKicker}</p>
                    <p className="aio-payment__light-review-hero-amount" aria-live="polite">
                      {lightResultAmount}
                      {showLightResultMonthlySuffix && <span className="payment-calc__mo">/mo</span>}
                    </p>
                    <p className="aio-payment__light-review-hero-lede">{lightResultLede}</p>
                  </div>
                  {showSummaryBudgetFit && (
                    <div className={`aio-payment__light-budget-fit aio-payment__light-budget-fit--${displayedSummaryBudgetFitStatus}`}>
                      <div
                        className={`aio-payment__light-budget-fit-icon-wrap aio-payment__light-budget-fit-icon-wrap--${displayedSummaryBudgetFitStatus === 'over' ? 'alert' : displayedSummaryBudgetFitStatus === 'neutral' ? 'info' : 'success'}`}
                        aria-hidden="true"
                      >
                        {displayedSummaryBudgetFitStatus === 'over' ? (
                          <AlertTriangle size={16} strokeWidth={2.25} />
                        ) : displayedSummaryBudgetFitStatus === 'neutral' ? (
                          <Info size={15} strokeWidth={2.5} />
                        ) : (
                          <Check size={14} strokeWidth={3} />
                        )}
                      </div>
                      <div className="aio-payment__light-budget-fit-text">
                        <span className="aio-payment__light-budget-fit-label">{displayedSummaryBudgetFitLabel}</span>
                        <strong className="aio-payment__light-budget-fit-headline">{displayedSummaryBudgetFitHeadline}</strong>
                        <p className="aio-payment__light-budget-fit-copy">{displayedSummaryBudgetFitCopy}</p>
                      </div>
                    </div>
                  )}
                  <button
                    type="button"
                    className="aio-payment__light-review-hero-cta"
                    onClick={handleLightReviewPrimaryCtaClick}
                    disabled={isLightReviewPrimaryCtaDisabled}
                  >
                    {lightReviewPrimaryCtaLabel}
                  </button>
                </section>
              )}

              {(!isLightStepsVariant || lightWizardStep === 1) && (
              <div className="aio-payment__light-start-panel">
                <div className="payment-calc__tabs payment-calc__tabs--two aio-payment__light-toggle" role="radiogroup" aria-label="Choose calculator mode">
                  <button
                    type="button"
                    role="radio"
                    aria-checked={startMode === 'price'}
                    aria-label={`Start with vehicle price, currently ${currency(price)}`}
                    className={startMode === 'price' ? 'payment-calc__tab payment-calc__tab--on aio-payment__light-toggle-button aio-payment__light-toggle-button--active' : 'payment-calc__tab aio-payment__light-toggle-button'}
                    onClick={() => setStartMode('price')}
                  >
                    <span className="aio-payment__light-toggle-icon" aria-hidden="true">
                      <CarProfile size={22} weight="regular" />
                    </span>
                    <span className="aio-payment__light-toggle-button-title">Start with vehicle price</span>
                    <span className="aio-payment__light-toggle-button-copy">Estimate payments, total cost, and payoff schedule.</span>
                  </button>
                  <button
                    type="button"
                    role="radio"
                    aria-checked={startMode === 'monthly'}
                    aria-label={`Start with monthly budget, currently ${currency(targetMonthlyPayment)} per month`}
                    className={startMode === 'monthly' ? 'payment-calc__tab payment-calc__tab--on aio-payment__light-toggle-button aio-payment__light-toggle-button--active' : 'payment-calc__tab aio-payment__light-toggle-button'}
                    onClick={() => setStartMode('monthly')}
                  >
                    <span className="aio-payment__light-toggle-icon" aria-hidden="true">
                      <PhosphorCreditCard size={22} weight="regular" />
                    </span>
                    <span className="aio-payment__light-toggle-button-title">Start with monthly budget</span>
                    <span className="aio-payment__light-toggle-button-copy">Estimate costs and browse matching vehicles</span>
                  </button>
                </div>

                <div className="aio-payment__light-start-body">
                  <div className="aio-payment__light-primary">
                    {startMode === 'monthly' ? (
                      <LightMonthlyBudgetField
                        affordableMsrp={affordableMsrp}
                        targetMonthlyPayment={targetMonthlyPayment}
                        onBudgetChange={setTargetMonthlyPayment}
                      />
                    ) : (
                      <LightVehiclePriceField
                        price={price}
                        estimatedMonthly={estimatedMonthly}
                        onPriceChange={handlePriceChange}
                      />
                    )}
                  </div>
                </div>
              </div>
              )}

              <div className="aio-payment__light-disclosures">
                {isLightStepsVariant && lightWizardStep === 2 && (
                  <LightLoanTermsStepPanel
                    downPayment={downPayment}
                    onDownPaymentChange={handleLightDownPaymentChange}
                    activeApr={activeApr}
                    customApr={customApr}
                    onCustomAprChange={handleLightCustomAprChange}
                    aprLocked={selectedFinanceId !== 'custom'}
                    loanTerm={loanTerm}
                    onLoanTermChange={setLoanTerm}
                    termChipOptions={lightLoanTermChips}
                    usesMonthlyBudgetMode={startMode === 'monthly'}
                  />
                )}
                {!isLightStepsVariant && (
                <details className="aio-payment__light-disclosure" open={undefined}>
                  <summary>
                    <span>Loan terms</span>
                    <strong>{currency(downPayment)} down · {loanTerm} months · {formatAprPercent(activeApr)} APR</strong>
                  </summary>
                  <div className="aio-payment__light-grid">
                    <TextField
                      label="Down payment"
                      type="number"
                      inputMode="numeric"
                      value={downPayment}
                      min={0}
                      step={500}
                      iconLeft={MONEY_INPUT_PREFIX}
                      onFocus={selectCalculatorInputValueOnFocus}
                      onChange={(event) => {
                        const nextDownPayment = numberInput(event.target.value);
                        if (isLightVariant) {
                          handleLightDownPaymentChange(nextDownPayment);
                          return;
                        }
                        setDownPayment(nextDownPayment);
                      }}
                    />
                    <TextField
                      label="Interest rate"
                      type="number"
                      inputMode="decimal"
                      value={activeApr}
                      min={0}
                      step={0.1}
                      disabled={selectedFinanceId !== 'custom'}
                      iconRight={PERCENT_INPUT_SUFFIX}
                      onFocus={selectCalculatorInputValueOnFocus}
                      onChange={(event) => {
                        const nextApr = numberInput(event.target.value);
                        if (isLightVariant) {
                          handleLightCustomAprChange(nextApr);
                          return;
                        }
                        setCustomApr(nextApr);
                      }}
                    />
                    <Select
                      label="Loan term"
                      value={loanTerm}
                      onChange={(event) => setLoanTerm(numberInput(event.target.value))}
                      options={termOptions.map((term) => ({ value: String(term), label: `${term} months` }))}
                    />
                  </div>
                </details>
                )}

                {isLightStepsVariant && lightWizardStep === 3 && (
                  <div className="aio-payment__light-vehicle-step">
                    <div className="aio-payment__light-vehicle-step__path-cards" role="group" aria-label="How do you want to shop?">
                      <button
                        type="button"
                        className={
                          lightVehicleStepMode === 'known'
                            ? 'aio-payment__light-vehicle-step__path aio-payment__light-vehicle-step__path--selected'
                            : 'aio-payment__light-vehicle-step__path'
                        }
                        aria-pressed={lightVehicleStepMode === 'known'}
                        onClick={() => handleLightVehicleStepModeChange('known')}
                      >
                        <span className="aio-payment__light-vehicle-step__path-icon aio-payment__light-vehicle-step__path-icon--chat" aria-hidden>
                          <svg width="22" height="22" viewBox="0 0 256 256" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path d="M128,24A104,104,0,0,0,36.18,176.88L24.83,210.93a16,16,0,0,0,20.24,20.24l34.05-11.35A104,104,0,1,0,128,24Zm0,192a87.87,87.87,0,0,1-44.06-11.81,8,8,0,0,0-6.54-.67L40,216,52.47,178.6a8,8,0,0,0-.66-6.54A88,88,0,1,1,128,216Z" />
                          </svg>
                        </span>
                        <span className="aio-payment__light-vehicle-step__path-title">I Have a Vehicle in Mind</span>
                        <span className="aio-payment__light-vehicle-step__path-copy">
                          Choose a year, make, and model to anchor the estimate.
                        </span>
                      </button>
                      <button
                        type="button"
                        className={
                          lightVehicleStepMode === 'browsing'
                            ? 'aio-payment__light-vehicle-step__path aio-payment__light-vehicle-step__path--selected'
                            : 'aio-payment__light-vehicle-step__path'
                        }
                        aria-pressed={lightVehicleStepMode === 'browsing'}
                        onClick={() => handleLightVehicleStepModeChange('browsing')}
                      >
                        <span className="aio-payment__light-vehicle-step__path-icon aio-payment__light-vehicle-step__path-icon--profile" aria-hidden>
                          <CarProfile size={22} weight="regular" />
                        </span>
                        <span className="aio-payment__light-vehicle-step__path-title">I Have a Preferred Vehicle Type</span>
                        <span className="aio-payment__light-vehicle-step__path-copy">
                          Pick a type now; we&apos;ll show affordable options on the final estimate.
                        </span>
                      </button>
                    </div>
                    <div className="aio-payment__light-vehicle-step__nu">
                      <div className="aio-payment__light-vehicle-step__label-row">
                        <p className="aio-payment__light-vehicle-step__nu-label">New or used</p>
                        {renderLightGuidanceTooltip({
                          id: lightVehicleConditionGuidanceId,
                          title: 'New or used',
                          copy: "Choose whether you're shopping new or used vehicles. Availability and pricing may vary.",
                          ariaLabel: 'New or used guidance',
                        })}
                      </div>
                      <div className="aio-payment__light-vehicle-step__nu-row" role="radiogroup" aria-label="New or used vehicle">
                        <button
                          type="button"
                          role="radio"
                          aria-checked={condition === 'new'}
                          className={
                            condition === 'new'
                              ? 'aio-payment__light-vehicle-step__nu-btn aio-payment__light-vehicle-step__nu-btn--active'
                              : 'aio-payment__light-vehicle-step__nu-btn'
                          }
                          onClick={() => handleVehicleConditionChange('new')}
                        >
                          New Car
                        </button>
                        <button
                          type="button"
                          role="radio"
                          aria-checked={condition === 'used'}
                          className={
                            condition === 'used'
                              ? 'aio-payment__light-vehicle-step__nu-btn aio-payment__light-vehicle-step__nu-btn--active'
                              : 'aio-payment__light-vehicle-step__nu-btn'
                          }
                          onClick={() => handleVehicleConditionChange('used')}
                        >
                          Used Car
                        </button>
                      </div>
                    </div>
                    {lightVehicleStepMode === 'known' ? (
                      <div className="aio-payment__light-vehicle-step__fields">
                        <div className="aio-payment__light-vehicle-search">
                          <div className="aio-payment__light-vehicle-step__label-row">
                            <label className="aio-payment__light-vehicle-search__label" htmlFor={lightVehicleSearchInputId}>My Next Vehicle</label>
                            {renderLightGuidanceTooltip({
                              id: lightVehicleSearchGuidanceId,
                              title: 'My Next Vehicle',
                              copy: 'Choose a vehicle to compare its estimated price against your budget.',
                              ariaLabel: 'My next vehicle guidance',
                            })}
                          </div>
                          <input
                            id={lightVehicleSearchInputId}
                            type="text"
                            className="payment-calc__input aio-payment__light-vehicle-search__input"
                            value={lightVehicleSearchQuery}
                            placeholder="Start typing year, make, and model"
                            autoComplete="off"
                            role="combobox"
                            aria-autocomplete="list"
                            aria-expanded={isLightVehicleSearchMenuOpen}
                            aria-controls={lightVehicleSearchListId}
                            aria-activedescendant={lightVehicleActiveSuggestionId}
                            onFocus={(event) => {
                              scrollLightVehicleSearchIntoMobileView(event.currentTarget);
                              setShowLightVehicleSearchSuggestions(true);
                            }}
                            onChange={(event) => handleLightVehicleSearchChange(event.target.value)}
                            onKeyDown={handleLightVehicleSearchKeyDown}
                            onBlur={(event) => {
                              handleLightVehicleSearchBlur(event.currentTarget.value);
                              setShowLightVehicleSearchSuggestions(false);
                            }}
                          />
                          {isLightVehicleSearchMenuOpen && (
                            <div id={lightVehicleSearchListId} className="aio-payment__light-vehicle-search__menu" role="listbox">
                              {lightVehicleSearchSuggestions.map((option, optionIndex) => (
                                <button
                                  key={option.key}
                                  id={`${lightVehicleSearchListId}-option-${optionIndex}`}
                                  type="button"
                                  role="option"
                                  aria-selected={optionIndex === lightVehicleSearchActiveIndex}
                                  className={
                                    optionIndex === lightVehicleSearchActiveIndex
                                      ? 'aio-payment__light-vehicle-search__option aio-payment__light-vehicle-search__option--active'
                                      : 'aio-payment__light-vehicle-search__option'
                                  }
                                  onMouseDown={(event) => event.preventDefault()}
                                  onMouseEnter={() => setLightVehicleSearchActiveIndex(optionIndex)}
                                  onClick={() => applyLightVehicleSearchOption(option)}
                                >
                                  <span className="aio-payment__light-vehicle-search__option-label">{option.label}</span>
                                  <span className="aio-payment__light-vehicle-search__option-meta">
                                    {condition === 'new'
                                      ? `${currency(option.vehicle.priceMin)} starting MSRP`
                                      : 'Used pricing guidance'}
                                  </span>
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                        <LightListboxSelect
                          label="Trim / style"
                          value={lightKnownVehicleSelected ? selectedTrimStyleOption?.value ?? '' : ''}
                          wrapperClassName="aio-payment__light-field--wide"
                          onChange={handleTrimStyleChange}
                          placeholder="Select trim or style"
                          options={lightTrimStyleSelectOptions}
                        />
                      </div>
                    ) : (
                      <div className="aio-payment__light-vehicle-step__browse">
                        <div className="aio-payment__light-vehicle-step__label-row">
                          <p className="aio-payment__light-vehicle-step__body-style-label" id={lightVehicleBodyStyleHeadingId}>
                            Vehicle type
                          </p>
                          {renderLightGuidanceTooltip({
                            id: lightVehicleBodyStyleGuidanceId,
                            title: 'Vehicle type',
                            copy: 'Select a preferred vehicle type to help us surface options that fit your budget.',
                            ariaLabel: 'Vehicle type guidance',
                          })}
                        </div>
                        <div className="aio-payment__light-vehicle-step__body-carousel">
                          <button
                            type="button"
                            className="aio-payment__light-vehicle-step__body-carousel-nav aio-payment__light-vehicle-step__body-carousel-nav--previous"
                            aria-label="Previous vehicle categories"
                            onClick={() => scrollLightBodyStyles('previous')}
                            disabled={!lightBodyStyleCarouselState.canScrollPrevious}
                          >
                            <ChevronLeft size={18} strokeWidth={2.5} aria-hidden="true" />
                          </button>
                          <div
                            ref={lightBodyStyleCarouselRef}
                            className="aio-payment__light-vehicle-step__body-grid"
                            role="radiogroup"
                            aria-labelledby={lightVehicleBodyStyleHeadingId}
                          >
                            {lightVehicleBrowseTiles.map((tile) => {
                              const selected = lightBrowseBodyStyle === tile.bodyStyle;
                              return (
                                <button
                                  key={tile.key}
                                  type="button"
                                  role="radio"
                                  aria-checked={selected}
                                  className={
                                    selected
                                      ? 'aio-payment__light-vehicle-step__body-tile aio-payment__light-vehicle-step__body-tile--selected'
                                      : 'aio-payment__light-vehicle-step__body-tile'
                                  }
                                  onClick={() => handleLightBrowseBodyStyleChange(tile.bodyStyle)}
                                >
                                  <span className="aio-payment__light-vehicle-step__body-tile-icon-wrap">
                                    <img
                                      src={tile.icon}
                                      alt=""
                                      className="aio-payment__light-vehicle-step__body-tile-icon"
                                      loading="lazy"
                                    />
                                  </span>
                                  <span className="aio-payment__light-vehicle-step__body-tile-label">{tile.label}</span>
                                </button>
                              );
                            })}
                          </div>
                          <button
                            type="button"
                            className="aio-payment__light-vehicle-step__body-carousel-nav aio-payment__light-vehicle-step__body-carousel-nav--next"
                            aria-label="Next vehicle categories"
                            onClick={() => scrollLightBodyStyles('next')}
                            disabled={!lightBodyStyleCarouselState.canScrollNext}
                          >
                            <ChevronRight size={18} strokeWidth={2.5} aria-hidden="true" />
                          </button>
                        </div>
                        {canShowLightBrowseVehicleMatches ? (
                          <details className="aio-payment__light-vehicle-step__category-matches" open>
                            <summary className="aio-payment__light-vehicle-step__category-matches-summary">
                              <span className="aio-payment__light-vehicle-step__category-matches-summary-title">
                                <span>Best {lightBrowseVehicleMatchesLabel} {lightCategoryBudgetPreposition}</span>
                                <span
                                  className="aio-payment__light-vehicle-step__category-budget"
                                  onClick={(event) => event.stopPropagation()}
                                  onKeyDown={(event) => event.stopPropagation()}
                                >
                                  <span className="aio-payment__light-vehicle-step__category-budget-prefix" aria-hidden="true">$</span>
                                  <input
                                    id={lightCategoryBudgetInputId}
                                    type="text"
                                    inputMode="numeric"
                                    pattern="[0-9,]*"
                                    className="aio-payment__light-vehicle-step__category-budget-input"
                                    aria-label={lightCategoryBudgetAriaLabel}
                                    value={lightCategoryBudgetInputValue}
                                    onFocus={(event) => {
                                      setLightCategoryBudgetInputDraft(String(Math.round(lightCategoryBudgetValue)));
                                      selectCalculatorInputValueOnFocus(event);
                                    }}
                                    onChange={(event) => handleLightCategoryBudgetInputChange(event.target.value)}
                                    onBlur={handleLightCategoryBudgetInputBlur}
                                  />
                                  {lightCategoryBudgetIsMonthly ? (
                                    <span className="aio-payment__light-vehicle-step__category-budget-suffix">/mo</span>
                                  ) : null}
                                </span>
                              </span>
                              <span className="aio-payment__light-vehicle-step__category-matches-count">
                                {lightBrowseVehicleMatches.length} shown
                              </span>
                            </summary>
                            {lightBrowseVehicleMatches.length ? (
                              <div className="aio-payment__light-vehicle-step__category-matches-list" role="list">
                                {lightBrowseVehicleMatches.map(({ vehicle, isNearRange }, index) => (
                                  <div key={vehicle.slug} className="aio-payment__light-vehicle-step__category-match" role="listitem">
                                    <button
                                      type="button"
                                      className="aio-payment__light-vehicle-step__category-match-button"
                                      onClick={() => handleLightBrowseVehicleMatchSelect(vehicle)}
                                      aria-label={`Select ${vehicle.year} ${vehicle.make} ${vehicle.model} for this estimate`}
                                    >
                                      <span className="aio-payment__light-vehicle-step__category-match-main">
                                        <span className="aio-payment__light-vehicle-step__category-match-rank">
                                          #{index + 1}
                                        </span>
                                        <span className="aio-payment__light-vehicle-step__category-match-copy">
                                          <strong>{vehicle.year} {vehicle.make} {vehicle.model}</strong>
                                          <span>
                                            Starts at {currency(vehicle.priceMin)} · {currency(getEstimatedMonthlyForVehiclePrice(vehicle.priceMin))}/mo est.
                                          </span>
                                        </span>
                                      </span>
                                      <span className="aio-payment__light-vehicle-step__category-match-meta">
                                        <span className="aio-payment__light-vehicle-step__category-match-rating">
                                          C/D {formatLightStaffRating(vehicle.staffRating)}
                                        </span>
                                        <span
                                          className={`aio-payment__light-vehicle-step__category-match-range aio-payment__light-listbox-select__status aio-payment__light-listbox-select__status--${isNearRange ? 'neutral' : 'fit'}`}
                                        >
                                          {isNearRange ? 'Near range' : 'In range'}
                                        </span>
                                      </span>
                                    </button>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <p className="aio-payment__light-vehicle-step__category-matches-empty">
                                No {lightBrowseVehicleMatchesLabel.toLowerCase()} found around {currency(lightAffordableBudgetCeiling)} with the current filters.
                              </p>
                            )}
                          </details>
                        ) : null}
                      </div>
                    )}
                    {lightVehicleStepMode === 'known' && (
                      <div className={[
                        'aio-payment__light-vehicle-step__price-bar',
                        canUseCatalogPrice ? '' : 'aio-payment__light-vehicle-step__price-bar--guidance',
                        lightKnownVehicleSelected && hasAvailableBuyingIncentives ? 'aio-payment__light-vehicle-step__price-bar--with-incentives' : '',
                      ].filter(Boolean).join(' ')}
                      >
                        <div className="aio-payment__light-vehicle-step__price-summary">
                          {lightKnownVehicleSelected && (
                            <Link
                              to={selectedVehiclePageHref}
                              className="aio-payment__light-vehicle-step__thumbnail-link"
                              aria-label={`View ${selectedYear} ${selectedVehicle.make} ${selectedVehicle.model}`}
                            >
                              <OptimizedImage
                                src={selectedVehicle.image}
                                alt={`${selectedYear} ${selectedVehicle.make} ${selectedVehicle.model}`}
                                aspectRatio="4/3"
                                objectFit="cover"
                                wrapperClassName="aio-payment__light-vehicle-step__thumbnail"
                              />
                            </Link>
                          )}
                          <div className="aio-payment__light-vehicle-step__price-meta">
                            <span className="aio-payment__light-vehicle-step__price-kicker">
                              {canUseCatalogPrice ? 'Selected trim price' : 'Used pricing guidance'}
                            </span>
                            <p className="aio-payment__light-vehicle-step__price-vehicle">
                              {lightKnownVehicleSelected
                                ? selectedVehicleLabel
                                : 'Choose a vehicle'}
                            </p>
                          </div>
                        </div>
                        <div className="aio-payment__light-vehicle-step__price-detail">
                          {(!lightKnownVehicleSelected || canUseCatalogPrice) && (
                            <p className="aio-payment__light-vehicle-step__price-value">
                              {lightKnownVehicleSelected ? currency(selectedCatalogPrice) : 'Not selected'}
                            </p>
                          )}
                          {lightKnownVehicleSelected && !canUseCatalogPrice && startMode === 'price' && (
                            <TextField
                              label="Listing price used for estimate"
                              type="text"
                              inputMode="numeric"
                              pattern="[0-9,]*"
                              value={numberWithCommas(price)}
                              iconLeft={MONEY_INPUT_PREFIX}
                              wrapperClassName="aio-payment__light-vehicle-step__listing-price-field"
                              helperText={`${currency(estimatedMonthly)}/mo with this listing price. Change it to match the vehicle you found.`}
                              onFocus={selectCalculatorInputValueOnFocus}
                              onChange={(event) => handlePriceChange(currencyInput(event.target.value))}
                              onBlur={(event) => handlePriceChange(boundLightVehiclePrice(currencyInput(event.currentTarget.value)))}
                            />
                          )}
                          {lightKnownVehicleSelected && !canUseCatalogPrice && (
                            <p className="aio-payment__light-vehicle-step__price-guidance">
                              <span className="aio-payment__light-vehicle-step__price-guidance-lead">
                                {USED_PRICING_GUIDANCE_LEAD}
                              </span>{' '}
                              <span className="aio-payment__light-vehicle-step__price-guidance-copy">
                                {USED_PRICING_GUIDANCE_COPY}
                              </span>
                            </p>
                          )}
                        </div>
                        {lightKnownVehicleSelected && hasAvailableBuyingIncentives && (
                          <div className="aio-payment__light-vehicle-step__price-incentives">
                            <div className="aio-payment__light-vehicle-step__price-incentives-heading">
                              <span>Available buying incentives</span>
                              <strong>{selectedOfferSummary}</strong>
                            </div>
                            <p className="aio-payment__light-vehicle-step__price-incentives-copy">
                              Select an incentive to apply it to this estimate. Select it again to remove it.
                            </p>
                            <div className="aio-payment__light-offers aio-payment__light-offers--hero">
                              <HeroOffersB
                                vehicleIncentives={lightVehiclePriceIncentives}
                                onOfferClick={applyOfferToEstimate}
                                title={null}
                                showBuyDealLink={false}
                                showLeaseDealLink={false}
                                showMoreDealsAccordion
                                showToggleIndicator
                                selectedOfferIds={[
                                  ...selectedCashIds,
                                  ...(selectedFinanceId === 'custom' ? [] : [selectedFinanceId]),
                                ]}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                    {SHOW_LIGHT_COVERAGE_MODULE && (
                      <section className="aio-payment__light-vehicle-step__coverage" aria-labelledby="aio-payment-light-coverage-heading">
                        <div className="aio-payment__light-vehicle-step__coverage-head">
                          <span id="aio-payment-light-coverage-heading">Warranty &amp; insurance</span>
                          <p>Planning estimates based on vehicle price, type, and market trends, not final quotes. Warranty is financed; insurance stays separate from the loan.</p>
                        </div>
                        <div className="aio-payment__light-vehicle-step__coverage-grid">
                          <div className={`aio-payment__light-vehicle-step__coverage-option ${includeExtendedWarranty ? 'aio-payment__light-vehicle-step__coverage-option--active' : ''}`}>
                            <button
                              type="button"
                              className={`aio-payment__light-vehicle-step__coverage-switch ${includeExtendedWarranty ? 'aio-payment__light-vehicle-step__coverage-switch--on' : ''}`}
                              role="switch"
                              aria-checked={includeExtendedWarranty}
                              onClick={() => setIncludeExtendedWarranty((isIncluded) => !isIncluded)}
                            >
                              <span className="aio-payment__light-vehicle-step__coverage-icon" aria-hidden="true">
                                <PhosphorShieldCheck size={22} weight="regular" />
                              </span>
                              <span className="aio-payment__light-vehicle-step__coverage-copy">
                                <span className="aio-payment__light-vehicle-step__coverage-title">Extended warranty</span>
                                <span className="aio-payment__light-vehicle-step__coverage-desc">
                                  Estimates a financed protection plan from price and vehicle type.
                                </span>
                              </span>
                              <span className="aio-payment__light-vehicle-step__coverage-track" aria-hidden="true">
                                <span className="aio-payment__light-vehicle-step__coverage-thumb" />
                              </span>
                            </button>
                            {includeExtendedWarranty && (
                              <TextField
                                label="Warranty estimate"
                                type="text"
                                inputMode="numeric"
                                pattern="[0-9,]*"
                                value={numberWithCommas(extendedWarrantyCost)}
                                iconLeft={MONEY_INPUT_PREFIX}
                                onFocus={selectCalculatorInputValueOnFocus}
                                onChange={(event) => {
                                  setHasEditedExtendedWarrantyCost(true);
                                  setExtendedWarrantyCost(currencyInput(event.target.value));
                                }}
                                helperText={extendedWarrantyHelperText}
                              />
                            )}
                          </div>
                          <div className={`aio-payment__light-vehicle-step__coverage-option ${includeInsuranceEstimate ? 'aio-payment__light-vehicle-step__coverage-option--active' : ''}`}>
                            <button
                              type="button"
                              className={`aio-payment__light-vehicle-step__coverage-switch ${includeInsuranceEstimate ? 'aio-payment__light-vehicle-step__coverage-switch--on' : ''}`}
                              role="switch"
                              aria-checked={includeInsuranceEstimate}
                              onClick={() => setIncludeInsuranceEstimate((isIncluded) => !isIncluded)}
                            >
                              <span className="aio-payment__light-vehicle-step__coverage-icon" aria-hidden="true">
                                <PhosphorUmbrella size={22} weight="regular" />
                              </span>
                              <span className="aio-payment__light-vehicle-step__coverage-copy">
                                <span className="aio-payment__light-vehicle-step__coverage-title">Insurance estimate</span>
                                <span className="aio-payment__light-vehicle-step__coverage-desc">
                                  Estimates monthly insurance from price and vehicle type.
                                </span>
                              </span>
                              <span className="aio-payment__light-vehicle-step__coverage-track" aria-hidden="true">
                                <span className="aio-payment__light-vehicle-step__coverage-thumb" />
                              </span>
                            </button>
                            {includeInsuranceEstimate && (
                              <TextField
                                label="Monthly insurance"
                                type="text"
                                inputMode="numeric"
                                pattern="[0-9,]*"
                                value={numberWithCommas(monthlyInsuranceEstimate)}
                                iconLeft={MONEY_INPUT_PREFIX}
                                onFocus={selectCalculatorInputValueOnFocus}
                                onChange={(event) => {
                                  setHasEditedMonthlyInsuranceEstimate(true);
                                  setMonthlyInsuranceEstimate(currencyInput(event.target.value));
                                }}
                                helperText={insuranceEstimateHelperText}
                              />
                            )}
                          </div>
                        </div>
                      </section>
                    )}
                  </div>
                )}

                {!isLightStepsVariant && (
                <details className="aio-payment__light-disclosure" open={undefined}>
                  <summary>
                    <span>Vehicle</span>
                    <strong>{lightHasVehicleSelection ? selectedVehicleLabel : 'Not selected'}</strong>
                  </summary>
                  <p className="aio-payment__light-disclosure-copy">
                    {!lightHasVehicleSelection
                      ? canUseCatalogPrice
                        ? 'Optional: choose a vehicle to compare realistic trim pricing, incentives, AI analysis, and shopping links against your budget.'
                        : 'Optional: choose a used vehicle for shopping context. Keep your target price here, then compare it with real listing prices.'
                      : !canUseCatalogPrice
                      ? 'Choose a year, make, model, and trim for shopping context. Your target price stays fixed unless you edit it.'
                      : startMode === 'monthly'
                      ? 'Choose a year, make, model, and trim so we can compare your budget with a realistic starting price and available incentives.'
                      : 'Choose a vehicle to compare its trim price, incentives, AI analysis, and shopping links against your target price.'}
                  </p>
                  {startMode === 'monthly' && (
                    <p className={`aio-payment__light-budget-note aio-payment__light-budget-note--${visibleBudgetFitStatus}`}>
                      <strong className="aio-payment__light-budget-status-label">{visibleBudgetFitLabel}:</strong> {visibleBudgetFitCopy}
                    </p>
                  )}
                  <div className="aio-payment__light-grid">
                    <Select
                      label="New or used"
                      value={condition}
                      onChange={(event) => handleVehicleConditionChange(event.target.value as VehicleCondition)}
                      options={[
                        { value: 'new', label: 'New car' },
                        { value: 'used', label: 'Used car' },
                      ]}
                    />
                    <Select
                      label="Year"
                      value={lightVehicleYearValue}
                      onChange={(event) => updateVehicleByParts({ year: event.target.value })}
                      placeholder="Select year"
                      options={availableYears.map((year) => ({ value: year, label: year }))}
                    />
                    <Select
                      label="Make"
                      value={lightVehicleMakeValue}
                      onChange={(event) => updateVehicleByParts({ make: event.target.value })}
                      placeholder="Select make"
                      options={availableMakes.map((make) => ({ value: make, label: make }))}
                    />
                    <Select
                      label="Model"
                      value={lightVehicleModelValue}
                      onChange={(event) => updateVehicleByParts({ model: event.target.value })}
                      placeholder="Select model"
                      options={availableModels.map((model) => ({ value: model, label: model }))}
                    />
                    <Select
                      label="Trim / style"
                      value={lightHasVehicleSelection ? selectedTrimStyleOption?.value ?? '' : ''}
                      wrapperClassName="aio-payment__light-field--wide"
                      onChange={(event) => handleTrimStyleChange(event.target.value)}
                      placeholder="Select trim or style"
                      options={availableTrimStyleOptions.map((option) => ({
                        value: option.value,
                        label: option.label,
                      }))}
                    />
                  </div>
                </details>
                )}

                {isLightStepsVariant && lightWizardStep === 4 && (
                  <div className="aio-payment__light-trade-step">
                    <div className="aio-payment__light-trade-step__grid">
                      <div className="aio-payment__light-trade-step__row aio-payment__light-trade-step__row--2">
                        <div className="aio-payment__light-field-with-action aio-payment__light-trade-step__field-with-action">
                          <TextField
                            label="Trade-in value"
                            labelHelp={renderLightGuidanceTooltip({
                              id: lightTradeValueGuidanceId,
                              title: 'Trade-in value',
                              copy: 'Estimated value of the vehicle you plan to trade in. Final value may vary after dealer appraisal.',
                              ariaLabel: 'Trade-in value guidance',
                            })}
                            type="text"
                            inputMode="numeric"
                            pattern="[0-9,]*"
                            value={numberWithCommas(tradeInValue)}
                            iconLeft={MONEY_INPUT_PREFIX}
                            onFocus={selectCalculatorInputValueOnFocus}
                            onChange={(event) => setTradeInValue(currencyInput(event.target.value))}
                          />
                          <button type="button" className="aio-payment__light-inline-action" onClick={() => setShowTradeTool(true)}>
                            Want a trade-in estimate?
                          </button>
                        </div>
                        <TextField
                          label="Amount owed on trade"
                          labelHelp={renderLightGuidanceTooltip({
                            id: lightAmountOwedGuidanceId,
                            title: 'Amount owed on trade',
                            copy: 'Enter the remaining loan balance on your trade-in, if any.',
                            ariaLabel: 'Amount owed on trade guidance',
                          })}
                          type="text"
                          inputMode="numeric"
                          pattern="[0-9,]*"
                          value={numberWithCommas(amountOwed)}
                          iconLeft={MONEY_INPUT_PREFIX}
                          onFocus={selectCalculatorInputValueOnFocus}
                          onChange={(event) => setAmountOwed(currencyInput(event.target.value))}
                          wrapperClassName="aio-payment__light-trade-step__field-with-action"
                        />
                        {showLightTradeEstimateCard ? (
                          <aside
                            className={`aio-payment__light-trade-estimate-card aio-payment__light-trade-estimate-card--full-row${lightTradeVehicleImage ? ' aio-payment__light-trade-estimate-card--split' : ''}`}
                            aria-label={`Estimated trade-in value for ${lightTradeVehicleLabel}`}
                          >
                            {lightTradeVehicleImage ? (
                              <div className="aio-payment__light-trade-estimate-card__media">
                                <OptimizedImage
                                  src={lightTradeVehicleImage}
                                  alt={lightTradeVehicleLabel}
                                  aspectRatio="16/9"
                                  objectFit="cover"
                                  wrapperClassName="aio-payment__light-trade-estimate-card__image"
                                />
                              </div>
                            ) : null}
                            <div className="aio-payment__light-trade-estimate-card__body">
                              <p className="aio-payment__light-trade-estimate-card__eyebrow">Estimated trade-in value</p>
                              <p className="aio-payment__light-trade-estimate-card__vehicle">{lightTradeVehicleLabel}</p>
                              <p className="aio-payment__light-trade-estimate-card__value">
                                {currency(lightTradeEstimateDisplayAmount)}
                              </p>
                              <p className="aio-payment__light-trade-estimate-card__note">
                                This is a quick planning estimate. A dealer appraisal can adjust for trim, options, history,
                                and local demand.
                              </p>
                            </div>
                          </aside>
                        ) : null}
                      </div>
                      <div className="aio-payment__light-trade-step__row aio-payment__light-trade-step__row--3">
                        <LightListboxSelect
                          label="Your state"
                          labelHelp={renderLightGuidanceTooltip({
                            id: lightStateGuidanceId,
                            title: 'Your state',
                            copy: 'Used to estimate applicable sales tax rates for your purchase.',
                            ariaLabel: 'State guidance',
                          })}
                          value={stateCode}
                          onChange={handleStateCodeChange}
                          options={stateRules.map((state) => ({ value: state.code, label: state.name }))}
                        />
                        <div
                          className="text-field text-field--default aio-payment__light-trade-tax-field"
                          style={{ '--aio-light-trade-tax-value-width': `${lightTradeSalesTaxPercentDisplayValue.length}ch` } as CSSProperties}
                        >
                          <div className="text-field__label-row">
                            <label htmlFor={lightTradeSalesTaxPercentFieldId} className="text-field__label">
                              Sales tax (%)
                            </label>
                            {renderLightGuidanceTooltip({
                              id: lightSalesTaxGuidanceId,
                              title: 'Estimated sales tax',
                              copy: 'This estimated sales tax rate is based on your selected state and may not reflect all local taxes or vehicle-specific exemptions.',
                              ariaLabel: 'Estimated sales tax guidance',
                            })}
                          </div>
                          <div className="text-field__input-wrapper">
                            <input
                              id={lightTradeSalesTaxPercentFieldId}
                              className="text-field__input aio-payment__light-trade-tax-input"
                              type="number"
                              inputMode="decimal"
                              value={lightTradeSalesTaxPercentDisplayValue}
                              min={0}
                              step={0.001}
                              aria-describedby={`${lightTradeSalesTaxPercentFieldId}-estimate`}
                              onFocus={selectCalculatorInputValueOnFocus}
                              onChange={(event) => handleLightTradeSalesTaxPercentChange(event.target.value)}
                            />
                            <span className="aio-payment__light-trade-tax-inline" aria-hidden="true">
                              <span>%</span>
                              <span className="aio-payment__light-trade-tax-inline-estimate">({currency(salesTax)})</span>
                            </span>
                            <span id={`${lightTradeSalesTaxPercentFieldId}-estimate`} className="sr-only">
                              Estimated sales tax {currency(salesTax)}
                            </span>
                          </div>
                        </div>
                        <TextField
                          label="Registration & Dealer Fees"
                          labelHelp={renderLightGuidanceTooltip({
                            id: lightRegistrationFeesGuidanceId,
                            title: 'Registration & dealer fees',
                            copy: 'Estimated title, registration, licensing, and dealer fees. Actual fees may vary by retailer and location.',
                            ariaLabel: 'Registration and dealer fees guidance',
                          })}
                          type="text"
                          inputMode="numeric"
                          pattern="[0-9,]*"
                          value={formatMoneyInputValue(estimatedFeesOverride, defaultEstimatedRegistrationDealerFees)}
                          iconLeft={MONEY_INPUT_PREFIX}
                          onFocus={selectCalculatorInputValueOnFocus}
                          onChange={(event) => setEstimatedFeesOverride(normalizeMoneyInputValue(event.target.value))}
                        />
                      </div>
                    </div>

                    <p className="aio-payment__light-trade-step__dealer-note">
                      <strong>
                        {registrationDealerFeeGuidance.label}:
                      </strong>{' '}
                      {registrationDealerFeeGuidance.copy}
                    </p>

                    <div className="aio-payment__light-trade-step__tax-note" role="note">
                      <Info size={18} strokeWidth={2.25} aria-hidden="true" />
                      <span>
                        <strong>
                          {tradeCanReduceTaxableAmount ? 'Trade-in value can reduce taxable amount.' : 'Trade-in tax treatment varies by state.'}
                        </strong>{' '}
                        {tradeCanReduceTaxableAmount && tradeInValue > 0
                          ? `In ${stateRule.name}, your trade may lower estimated sales tax by about ${currency(estimatedTradeTaxSavings)}.`
                          : 'In many states, trade-in value can lower the taxable purchase amount, which can reduce estimated taxes and monthly payment.'}
                      </span>
                    </div>

                    {tradeEquity > 0 ? (
                      <p className="aio-payment__light-trade-step__equity-note" role="status">
                        <Check size={18} strokeWidth={2.25} aria-hidden="true" />
                        <span>
                          <strong>{currency(tradeEquity)} net trade equity is applied as trade credit.</strong>{' '}
                          {startMode === 'monthly'
                            ? 'In monthly-budget mode, that can raise the vehicle price your payment target supports. Any unused equity appears as remaining trade equity on review.'
                            : 'It lowers the amount financed and cash due before interest is calculated. Any unused equity appears as remaining trade equity on review.'}
                        </span>
                      </p>
                    ) : null}

                    {negativeTradeBalance > 0 ? (
                      <p className="aio-payment__light-trade-step__negative-equity" role="status">
                        <AlertTriangle size={18} strokeWidth={2.25} aria-hidden="true" />
                        <span>
                          <strong>You may still owe {currency(negativeTradeBalance)} after trade-in.</strong>{' '}
                          That balance can be rolled into the loan and increase your monthly payment.
                        </span>
                      </p>
                    ) : null}

                    <div className="aio-payment__light-trade-step__finance-box">
                      <button
                        type="button"
                        role="switch"
                        aria-checked={includeTaxesAndFeesInLoan}
                        className={
                          includeTaxesAndFeesInLoan
                            ? 'aio-payment__light-trade-step__switch aio-payment__light-trade-step__switch--on'
                            : 'aio-payment__light-trade-step__switch'
                        }
                        onClick={() => setIncludeTaxesAndFeesInLoan((prev) => !prev)}
                      >
                        <span className="aio-payment__light-trade-step__switch-track" aria-hidden>
                          <span className="aio-payment__light-trade-step__switch-thumb" />
                        </span>
                        <span className="aio-payment__light-trade-step__switch-body">
                          <span className="aio-payment__light-trade-step__switch-title">Include Taxes &amp; Fees in Loan</span>
                          <span className="aio-payment__light-trade-step__switch-desc">
                            {includeTaxesAndFeesInLoan
                              ? 'Roll estimated sales tax, registration, and dealer fees into your loan amount.'
                              : 'Pay estimated sales tax, registration, and dealer fees upfront at signing.'}
                          </span>
                        </span>
                      </button>
                    </div>

                  </div>
                )}

                {!isLightStepsVariant && (
                <details className="aio-payment__light-disclosure" open={undefined}>
                  <summary>
                    <span>Trade, taxes &amp; fees</span>
                    <strong>{currency(tradeEquity)} trade equity · {currency(salesTax + fees)} tax & fees</strong>
                  </summary>
                  <div className="aio-payment__light-grid">
                    <div className="aio-payment__light-field-with-action">
                      <TextField
                        label="Trade-in value"
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9,]*"
                        value={numberWithCommas(tradeInValue)}
                        iconLeft={MONEY_INPUT_PREFIX}
                        onFocus={selectCalculatorInputValueOnFocus}
                        onChange={(event) => setTradeInValue(currencyInput(event.target.value))}
                      />
                      <button type="button" className="aio-payment__light-inline-action" onClick={() => setShowTradeTool(true)}>
                        Want a trade-in estimate?
                      </button>
                    </div>
                    <TextField
                      label="Amount owed on trade"
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9,]*"
                      value={numberWithCommas(amountOwed)}
                      iconLeft={MONEY_INPUT_PREFIX}
                      onFocus={selectCalculatorInputValueOnFocus}
                      onChange={(event) => setAmountOwed(currencyInput(event.target.value))}
                    />
                    <Select
                      label="Your state"
                      value={stateCode}
                      onChange={(event) => handleStateCodeChange(event.target.value)}
                      options={stateRules.map((state) => ({ value: state.code, label: state.name }))}
                    />
                    <TextField
                      label="Sales tax"
                      type="number"
                      inputMode="numeric"
                      value={salesTaxOverride || Math.round(calculatedSalesTax)}
                      min={0}
                      iconLeft={MONEY_INPUT_PREFIX}
                      onFocus={selectCalculatorInputValueOnFocus}
                      onChange={(event) => setSalesTaxOverride(event.target.value)}
                    />
                    <TextField
                      label="Title, registration, and other fees"
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9,]*"
                      value={formatMoneyInputValue(feesOverride, stateRule.titleRegistrationFees)}
                      iconLeft={MONEY_INPUT_PREFIX}
                      onFocus={selectCalculatorInputValueOnFocus}
                      onChange={(event) => {
                        setEstimatedFeesOverride('');
                        setFeesOverride(normalizeMoneyInputValue(event.target.value));
                      }}
                    />
                    <TextField
                      label={renderAreaEstimateLabel('Dealer fees')}
                      type="number"
                      inputMode="numeric"
                      value={dealerFeesOverride || stateRule.dealerFeesEstimate}
                      min={0}
                      iconLeft={MONEY_INPUT_PREFIX}
                      onFocus={selectCalculatorInputValueOnFocus}
                      onChange={(event) => {
                        setEstimatedFeesOverride('');
                        setDealerFeesOverride(event.target.value);
                      }}
                    />
                    <label className="aio-payment__light-checkbox aio-payment__light-field--wide">
                      <input
                        type="checkbox"
                        checked={includeTaxesAndFeesInLoan}
                        onChange={(event) => setIncludeTaxesAndFeesInLoan(event.target.checked)}
                      />
                      <span>
                        <strong>Include Taxes &amp; Fees in Loan</strong>
                        <small>
                          {includeTaxesAndFeesInLoan
                            ? 'Roll estimated sales tax, registration, and dealer fees into your loan amount.'
                            : 'Pay estimated sales tax, registration, and dealer fees upfront at signing.'}
                        </small>
                      </span>
                    </label>
                  </div>
                  <p className="aio-payment__light-note">
                    {stateRule.name} rule: {TAX_RULE_LABELS[stateRule.taxRule]}. Taxable amount: {currency(taxableAmount)}.
                  </p>
                </details>
                )}

                {(!isLightStepsVariant || lightWizardStep === 5) && (
                <>
                {!isLightStepsVariant && condition === 'new' && (cashIncentives.length > 0 || financeIncentives.length > 0) ? (
                  <details className="aio-payment__light-disclosure" open={isLightStepsVariant ? true : undefined}>
                    <summary>
                      <span>Deals and incentives</span>
                      <strong>{selectedOfferSummary}</strong>
                    </summary>
                    <div className="aio-payment__light-offers aio-payment__light-offers--hero">
                      <p className="aio-payment__light-offer-help">
                        {isLightStepsVariant
                          ? 'Select a deal to apply it to this estimate. Select it again to remove it.'
                          : 'Select a deal to see details, then apply or remove it from this estimate.'}
                      </p>
                      <HeroOffersB
                        vehicleIncentives={vehicleIncentives}
                        onOfferClick={isLightStepsVariant ? applyOfferToEstimate : handleOfferClick}
                        title={isLightStepsVariant ? null : 'Special deals and incentives'}
                        showBuyDealLink={!isLightStepsVariant}
                        showLeaseDealLink={!isLightStepsVariant}
                        showMoreDealsAccordion={isLightStepsVariant}
                        showToggleIndicator={isLightStepsVariant}
                        selectedOfferIds={[
                          ...selectedCashIds,
                          ...(selectedFinanceId === 'custom' ? [] : [selectedFinanceId]),
                        ]}
                      />
                    </div>
                  </details>
                ) : null}
                <section className="aio-payment__light-disclosure aio-payment__light-disclosure--static" aria-labelledby={lightBreakdownLabelId}>
                  {isLightSteps2Variant ? (
                    <div className="aio-payment__light-review2-card">
                      <div className="aio-payment__light-disclosure-heading aio-payment__light-review2-card-heading">
                        <span id={lightBreakdownLabelId}>Your Personalized Cost Breakdown</span>
                        <strong>{currency(totalLoanAmount)} financed</strong>
                      </div>

                      <div className="aio-payment__light-review2-summary-card">
                        <div className="aio-payment__light-review2-panel-header">
                          <div>
                            <p className="aio-payment__light-review2-kicker">What You'll Pay</p>
                            <h3 className="aio-payment__light-review2-title">Total Out-of-Pocket Cost</h3>
                            <p className="aio-payment__light-review2-helper">{lightReview2WhatYouPayHelper}</p>
                          </div>
                          <strong className="aio-payment__light-review2-total-value">{currency(totalPaidFromPocket)}</strong>
                        </div>
                        {renderLightReview2Formula(lightReview2WhatYouPayFormulaParts, 'What you will pay calculation')}
                      </div>

                      <div className="aio-payment__light-review2-grid">
                        <section className="aio-payment__light-review2-panel aio-payment__light-review2-panel--wide" aria-labelledby="aio-payment-light-review2-amount-financed">
                          <div className="aio-payment__light-review2-panel-header">
                            <div>
                              <h3 id="aio-payment-light-review2-amount-financed" className="aio-payment__light-review2-title">Amount Financed</h3>
                              <p className="aio-payment__light-review2-helper">
                                The estimated amount borrowed after credits and cash down are applied.
                              </p>
                            </div>
                            <div className="aio-payment__light-review2-header-value">
                              {renderLightReview2Tooltip(
                                lightBreakdownGuidanceId,
                                'How amount financed is calculated',
                                'Amount Financed',
                                lightReview2AmountFinancedTooltipCopy,
                              )}
                              <strong>{currency(totalLoanAmount)}</strong>
                            </div>
                          </div>
                          {renderLightReview2Formula(lightReview2AmountFinancedFormulaParts, 'Amount financed calculation')}
                          {isLoanCoveredByTradeEquity ? (
                            <p className="aio-payment__light-review2-note">
                              Trade equity covers the full financed amount. There is no estimated loan payment unless you change the trade, fees, add-ons, or down payment.
                            </p>
                          ) : null}
                        </section>

                        <section className="aio-payment__light-review2-panel" aria-labelledby="aio-payment-light-review2-trade">
                          <div className="aio-payment__light-review2-panel-header">
                            <div>
                              <h3 id="aio-payment-light-review2-trade" className="aio-payment__light-review2-title">Trade-In Contribution</h3>
                              <p className="aio-payment__light-review2-helper">
                                Value from your trade-in that reduces the amount you need to finance.
                              </p>
                            </div>
                            {renderLightReview2Tooltip(
                              lightTradeValueGuidanceId,
                              'How trade-in contribution is applied',
                              'Trade-In Contribution',
                              lightReview2TradeTooltipCopy,
                            )}
                          </div>
                          <dl className="aio-payment__light-review2-rows">
                            <div className="aio-payment__light-review2-row">
                              <dt>Trade-In Value</dt>
                              <dd>{currency(tradeInValue)}</dd>
                            </div>
                            {showTradePayoffBreakdown && (
                              <div className="aio-payment__light-review2-row">
                                <dt>Amount Owed on Trade</dt>
                                <dd>{currency(amountOwed)}</dd>
                              </div>
                            )}
                            <div className="aio-payment__light-review2-row aio-payment__light-review2-row--total">
                              <dt>Trade Equity Applied</dt>
                              <dd className="aio-payment__light-review2-value--credit">{currency(tradeEquityApplied)}</dd>
                            </div>
                            {hasRemainingTradeEquity && (
                              <div className="aio-payment__light-review2-row">
                                <dt>Remaining Trade Equity</dt>
                                <dd className="aio-payment__light-review2-value--credit">{currency(remainingTradeEquity)}</dd>
                              </div>
                            )}
                          </dl>
                        </section>

                        <section className="aio-payment__light-review2-panel" aria-labelledby="aio-payment-light-review2-finance-charge">
                          <div className="aio-payment__light-review2-panel-header">
                            <div>
                              <h3 id="aio-payment-light-review2-finance-charge" className="aio-payment__light-review2-title">Finance Charge</h3>
                              <p className="aio-payment__light-review2-helper">
                                Estimated interest paid over the life of the loan.
                              </p>
                            </div>
                            {renderLightReview2Tooltip(
                              lightFinanceChargeGuidanceId,
                              'How finance charge is calculated',
                              'Finance Charge',
                              lightReview2FinanceChargeTooltipCopy,
                            )}
                          </div>
                          <dl className="aio-payment__light-review2-rows">
                            <div className="aio-payment__light-review2-row">
                              <dt>Rate &amp; Term</dt>
                              <dd>{formatAprPercent(activeApr)} APR · {loanTerm} mo</dd>
                            </div>
                            <div className="aio-payment__light-review2-row">
                              <dt>Amount Financed</dt>
                              <dd>{currency(totalLoanAmount)}</dd>
                            </div>
                            <div className="aio-payment__light-review2-row aio-payment__light-review2-row--total">
                              <dt>Finance Charge</dt>
                              <dd className="aio-payment__light-review2-value--charge">{currency(totalLoanInterest)}</dd>
                            </div>
                          </dl>
                        </section>

                        <section className="aio-payment__light-review2-panel aio-payment__light-review2-panel--wide" aria-labelledby="aio-payment-light-review2-covered">
                          <div className="aio-payment__light-review2-panel-header">
                            <div>
                              <h3 id="aio-payment-light-review2-covered" className="aio-payment__light-review2-title">Total Vehicle Cost Covered</h3>
                              <p className="aio-payment__light-review2-helper">
                                This represents the total vehicle cost covered through your loan, cash down payment, and trade-in value.
                              </p>
                            </div>
                            <div className="aio-payment__light-review2-header-value">
                              {renderLightReview2Tooltip(
                                lightTotalPaidGuidanceId,
                                'How total vehicle cost covered is calculated',
                                'Total Vehicle Cost Covered',
                                lightReview2VehicleCostCoveredTooltipCopy,
                              )}
                              <strong>{currency(lightReview2VehicleCostCovered)}</strong>
                            </div>
                          </div>
                          {renderLightReview2Formula(lightReview2VehicleCostFormulaParts, 'Total vehicle cost covered calculation')}
                        </section>
                      </div>
                    </div>
                  ) : (
                  <div className="aio-payment__light-breakdown-card">
                    <div className="aio-payment__light-disclosure-heading aio-payment__light-breakdown-card-heading">
                      <span id={lightBreakdownLabelId}>Your Personalized Cost Breakdown</span>
                      <strong>{currency(totalLoanAmount)} financed</strong>
                    </div>
                    <div className="aio-payment__light-breakdown-financed">
                      <div className="aio-payment__light-breakdown-financed-heading">
                        <p className="aio-payment__light-breakdown-financed-label">Amount financed</p>
                        {renderLightGuidanceTooltip({
                          id: lightBreakdownGuidanceId,
                          title: 'Amount financed',
                          copy: 'The estimated loan amount after down payment, trade-in, taxes, and selected fees.',
                          ariaLabel: 'Amount financed guidance',
                        })}
                      </div>
                      <p className="aio-payment__light-breakdown-financed-value">{currency(totalLoanAmount)}</p>
                      <p className="aio-payment__light-breakdown-financed-formula">
                        {amountFinancedFormulaParts.map((part, index) => (
                          <span
                            key={`${part.operation ?? 'base'}-${part.label}`}
                            className={`aio-payment__light-breakdown-financed-formula-part ${
                              part.operation === 'add'
                                ? 'aio-payment__light-breakdown-financed-formula-part--add'
                                : part.operation === 'subtract'
                                  ? 'aio-payment__light-breakdown-financed-formula-part--subtract'
                                  : part.operation === 'total'
                                    ? 'aio-payment__light-breakdown-financed-formula-part--total'
                                    : ''
                            }`}
                          >
                            {part.operation && (
                              <>
                                <span className={`aio-payment__light-breakdown-financed-sign aio-payment__light-breakdown-financed-sign--${part.operation}`}>
                                  {part.operation === 'add' ? '+' : part.operation === 'subtract' ? '-' : '='}
                                </span>{' '}
                              </>
                            )}
                            <span className="aio-payment__light-breakdown-financed-amount">{currency(part.value)}</span>{' '}
                            {part.label}
                            {index < amountFinancedFormulaParts.length - 1 ? ' ' : ''}
                          </span>
                        ))}
                      </p>
                      {isLoanCoveredByTradeEquity ? (
                        <p className="aio-payment__light-breakdown-note">
                          Trade equity covers the full financed amount. There is no estimated loan payment unless you change the trade, fees, add-ons, or down payment.
                        </p>
                      ) : null}
                    </div>
                    <dl className="aio-payment__light-breakdown" aria-labelledby={lightBreakdownLabelId}>
                      <div>
                        <dt>
                          {renderLightBreakdownLabelWithHelp(
                            workingPriceBreakdownLabel,
                            lightWorkingPriceGuidanceId,
                            String(workingPriceBreakdownLabel),
                            'Enter the price you expect to pay before taxes, fees, trade-in, or down payment.',
                            `${workingPriceBreakdownLabel} guidance`,
                          )}
                        </dt>
                        <dd>{renderLightBreakdownValue(workingPrice)}</dd>
                      </div>
                      <div>
                        <dt>
                          {renderLightBreakdownLabelWithHelp(
                            'Estimated Taxes & Fees',
                            lightReviewTaxesFeesGuidanceId,
                            'Estimated taxes & fees',
                            'Estimated taxes and fees associated with your vehicle purchase. Actual costs may vary.',
                            'Estimated taxes and fees guidance',
                          )}
                        </dt>
                        <dd>{renderLightBreakdownValue(taxesAndFees, 'add')}</dd>
                      </div>
                      {optionalFinancedAddOns > 0 && (
                        <div><dt>Extended Warranty</dt><dd>{renderLightBreakdownValue(optionalFinancedAddOns, 'add')}</dd></div>
                      )}
                      {tradeInValue > 0 && (
                        <div><dt>Trade-In Value</dt><dd>{renderLightBreakdownValue(tradeInValue, 'subtract')}</dd></div>
                      )}
                      {showTradePayoffBreakdown && (
                        <div><dt>Amount Owed on Trade</dt><dd>{renderLightBreakdownValue(amountOwed, 'add')}</dd></div>
                      )}
                      {showTradePayoffBreakdown && (
                        <div className="aio-payment__light-breakdown-row--calculated">
                          <dt>{tradeEquityBreakdownLabel}</dt>
                          <dd>{renderTradeEquityBreakdownValue()}</dd>
                        </div>
                      )}
                      {showTradeCreditAppliedBreakdown && (
                        <div className="aio-payment__light-breakdown-row--calculated">
                          <dt>Trade Credit Applied</dt>
                          <dd>{renderLightBreakdownValue(tradeEquityApplied, 'subtract')}</dd>
                        </div>
                      )}
                      {hasRemainingTradeEquity && (
                        <div className="aio-payment__light-breakdown-row--calculated">
                          <dt>Remaining Trade Equity</dt>
                          <dd>{renderLightBreakdownValue(remainingTradeEquity, 'subtract')}</dd>
                        </div>
                      )}
                      <div>
                        <dt>
                          {renderLightBreakdownLabelWithHelp(
                            downPaymentBreakdownLabel,
                            lightReviewDownPaymentGuidanceId,
                            String(downPaymentBreakdownLabel),
                            'Money paid upfront that reduces the amount you finance.',
                            `${downPaymentBreakdownLabel} guidance`,
                          )}
                        </dt>
                        <dd>{renderLightBreakdownValue(downPaymentApplied, 'subtract')}</dd>
                      </div>
                      <div className="aio-payment__light-breakdown-row--loan-cost-start">
                        <dt>
                          {renderLightBreakdownLabelWithHelp(
                            isLoanCoveredByTradeEquity ? 'Loan Payment' : 'Monthly Payment',
                            lightReviewMonthlyPaymentGuidanceId,
                            isLoanCoveredByTradeEquity ? 'Loan payment' : 'Monthly payment',
                            'Your estimated monthly loan payment based on the information provided.',
                            'Monthly payment guidance',
                          )}
                        </dt>
                        <dd>{monthlyLoanPaymentDisplay}</dd>
                      </div>
                      {monthlyInsuranceAmount > 0 && (
                        <div><dt>Insurance Estimate</dt><dd>{currency(monthlyInsuranceAmount)}/mo</dd></div>
                      )}
                      <div>
                        <dt>
                          {renderLightBreakdownLabelWithHelp(
                            'Finance Charge',
                            lightFinanceChargeGuidanceId,
                            'Finance charge',
                            'The total interest paid over the life of the loan based on the loan amount, APR, and term you selected.',
                            'Finance charge guidance',
                          )}
                        </dt>
                        <dd>{renderLightBreakdownValue(totalLoanInterest, 'add')}</dd>
                      </div>
                      <div>
                        <dt>
                          {renderLightBreakdownLabelWithHelp(
                            `Total Loan Payments Over ${loanTerm} Months`,
                            lightReviewLoanPaymentsGuidanceId,
                            'Total loan payments',
                            'Estimated total amount paid over the life of the loan, including financed costs and interest.',
                            'Total loan payments guidance',
                          )}
                        </dt>
                        <dd>{renderLightBreakdownValue(totalLoanPayments)}</dd>
                      </div>
                      {totalInsuranceCost > 0 && (
                        <div><dt>Insurance Over {loanTerm} Months</dt><dd>{renderLightBreakdownValue(totalInsuranceCost, 'add')}</dd></div>
                      )}
                      {showTotalIncludingTradeCredit && (
                        <div className="aio-payment__light-breakdown-row--calculated">
                          <dt>{cashLoanPaymentsLabel}</dt>
                          <dd>{renderLightBreakdownValue(totalCost)}</dd>
                        </div>
                      )}
                      <div className="aio-payment__light-breakdown__total">
                        <dt>
                          <span className="aio-payment__light-breakdown-total-label">
                            <span>{estimatedTotalLabel}</span>
                            {renderLightGuidanceTooltip({
                              id: lightTotalPaidGuidanceId,
                              title: estimatedTotalLabel,
                              copy: 'The total amount you will pay over the life of the loan, including both principal and interest.',
                              ariaLabel: `${estimatedTotalLabel} guidance`,
                            })}
                          </span>
                        </dt>
                        <dd>{renderLightBreakdownValue(estimatedTotalValue)}</dd>
                      </div>
                    </dl>
                    {showTotalCostFormula ? (
                      <p
                        className="aio-payment__light-breakdown-total-formula"
                        aria-label={`${estimatedTotalLabel} calculation`}
                      >
                        {totalCostFormulaParts.map((part, index) => (
                          <span
                            key={`${part.operation ?? 'base'}-${part.label}`}
                            className={`aio-payment__light-breakdown-total-formula-part ${
                              part.operation === 'total'
                                ? 'aio-payment__light-breakdown-total-formula-part--total'
                                : ''
                            }`}
                          >
                            {part.operation && (
                              <>
                                <span className="aio-payment__light-breakdown-total-formula-sign">
                                  {part.operation === 'add' ? '+' : '='}
                                </span>{' '}
                              </>
                            )}
                            <span className="aio-payment__light-breakdown-total-formula-amount">{currency(part.value)}</span>{' '}
                            {part.label}
                            {index < totalCostFormulaParts.length - 1 ? ' ' : ''}
                          </span>
                        ))}
                      </p>
                    ) : hasRemainingTradeEquity ? (
                      <p className="aio-payment__light-breakdown-total-formula">
                        <span className="aio-payment__light-breakdown-total-formula-amount">{currency(remainingTradeEquity)}</span>{' '}
                        remaining trade equity is separate from cash due, so {estimatedTotalLabel.toLowerCase()} is{' '}
                        <span className="aio-payment__light-breakdown-total-formula-amount">{currency(estimatedTotalValue)}</span>.
                      </p>
                    ) : null}
                  </div>
                  )}
                  {SHOW_LIGHT_ESTIMATE_EMAIL && (
                    <div className="aio-payment__light-estimate-email">
                      <p className="aio-payment__light-estimate-email__lede">
                        Optional: email this estimate so you can keep the numbers handy when you talk with local dealers.
                      </p>
                      <form
                        className="aio-payment__light-estimate-email__row"
                        noValidate={isPaymentEstimateEmailTestMode()}
                        onSubmit={(event) => {
                          event.preventDefault();
                          handleSendLightEstimateEmail();
                        }}
                      >
                        <TextField
                          label="Email address"
                          type="email"
                          name="light-estimate-email"
                          autoComplete="email"
                          inputMode="email"
                          placeholder="you@example.com"
                          value={lightEstimateEmail}
                          onChange={(event) => {
                            setLightEstimateEmail(event.target.value);
                            setLightEstimateEmailError(undefined);
                            setLightEstimateEmailStatus(undefined);
                          }}
                          error={lightEstimateEmailError}
                          wrapperClassName="aio-payment__light-estimate-email__field"
                        />
                        <Button
                          type="submit"
                          variant="outline"
                          size="medium"
                          loading={isLightEstimateEmailSending}
                          disabled={isLightEstimateEmailSending}
                          iconLeft={<Mail size={18} strokeWidth={2} aria-hidden="true" />}
                        >
                          {isLightEstimateEmailSending ? 'Sending' : 'Email estimate'}
                        </Button>
                      </form>
                      {lightEstimateEmailStatus ? (
                        <p className="aio-payment__light-estimate-email__status" role="status">
                          {lightEstimateEmailStatus}{' '}
                          <a href="/payment-estimate-email-mock.html" target="_blank" rel="noopener noreferrer">
                            View email mock
                          </a>
                        </p>
                      ) : (
                        <p className="aio-payment__light-estimate-email__note">
                          No phone number required. Email is optional and is used for the estimate you request.
                        </p>
                      )}
                    </div>
                  )}
                </section>
                </>
                )}
              </div>

              {(!isLightStepsVariant || lightWizardStep === 5) && (
                <>
              {totalLoanAmount > 0 && loanTerm > 0 && !isLightStepsVariant && (
                <div className="aio-payment__light-charts">
                  <PaymentCalculatorFinanceCharts
                    loanPrincipal={totalLoanAmount}
                    financeApr={activeApr}
                    termMonths={loanTerm}
                    monthlyPayment={estimatedMonthly}
                    totalInterest={totalLoanInterest}
                  />
                </div>
              )}

              {!isLightStepsVariant && (
              <Link to="/auto-loan-calculator/all-in-one" className="aio-payment__light-secondary-link">
                Open the full calculator
              </Link>
              )}
                </>
              )}

              {isLightStepsVariant && (
                <div className="aio-payment__light-wizard-actions">
                  <button
                    type="button"
                    className="aio-payment__light-wizard-back-link"
                    disabled={lightWizardStep <= 1}
                    onClick={() => goToLightWizardStep(lightWizardStep - 1)}
                  >
                    <ArrowLeft size={18} strokeWidth={2} aria-hidden="true" />
                    Back
                  </button>
                  <div className="aio-payment__light-wizard-actions-right">
                    {lightWizardStep === 5 && (
                      <button
                        type="button"
                        className="aio-payment__light-wizard-start-over aio-payment__light-wizard-start-over--review"
                        onClick={handleLightStartOver}
                      >
                        <RotateCcw size={18} strokeWidth={2} aria-hidden="true" />
                        Start over
                      </button>
                    )}
                    {lightWizardStep === 3 && (
                      <button
                        type="button"
                        className="aio-payment__light-wizard-skip"
                        onClick={() => goToLightWizardStep(lightWizardStep === 3 ? 4 : 5)}
                      >
                        <SkipForward size={18} strokeWidth={2} aria-hidden="true" />
                        Skip this step
                      </button>
                    )}
                    {lightWizardStep < 5 ? (
                      <button
                        type="button"
                        className="aio-payment__light-wizard-primary aio-payment__light-wizard-primary--with-trailing-icon"
                        onClick={() => goToLightWizardStep(lightWizardStep + 1)}
                      >
                        {lightWizardStep === 4 ? 'See final estimate' : 'Continue'}
                        <ArrowRight size={18} strokeWidth={2} aria-hidden="true" />
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="aio-payment__light-wizard-primary aio-payment__light-wizard-primary--review"
                        onClick={handleLightReviewPrimaryCtaClick}
                        disabled={isLightReviewPrimaryCtaDisabled}
                      >
                        {lightReviewPrimaryCtaLabel}
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
            <div className="payment-calc__aside aio-payment__light-result-stack aio-payment__light-result--sticky">
              <aside className="payment-calc__aside-inner" aria-label="Current payment estimate">
                <div className="payment-calc__result aio-payment__light-result">
                  <div className="aio-payment__light-sticky-summary">
                    <div className="payment-calc__result-hero aio-payment__light-result-hero">
                      <p className="payment-calc__result-kicker">
                        {lightResultKicker}
                      </p>
                      <p className="payment-calc__result-big aio-payment__light-result-amount" aria-live="polite">
                        {lightResultAmount}
                        {showLightResultMonthlySuffix && <span className="payment-calc__mo">/mo</span>}
                      </p>
                      <p className="payment-calc__muted aio-payment__light-result-lede">
                        {lightResultLede}
                      </p>
                    </div>
                    <div className={`aio-payment__light-result-details ${showLightReviewSidebarNextSteps ? 'aio-payment__light-result-details--review' : ''} ${showLightReviewSidebarNextSteps && !showLightReviewNextStepsCard ? 'aio-payment__light-result-details--marketplace' : ''} ${showLightMobileTotals ? 'aio-payment__light-result-details--open' : ''}`}>
                      <button
                        type="button"
                        className="aio-payment__light-result-details-toggle"
                        aria-expanded={showLightMobileTotals}
                        aria-controls={lightResultDetailsControlsId}
                        aria-label={showLightMobileTotals
                          ? `Close ${lightResultDetailsToggleActionLabel}`
                          : `Open ${lightResultDetailsToggleActionLabel}`}
                        onClick={() => setShowLightMobileTotals((isOpen) => !isOpen)}
                      >
                        <span className="aio-payment__light-result-details-toggle-text">
                          {lightResultDetailsToggleText}
                        </span>
                        {showLightMobileTotals ? (
                          <ChevronDown size={18} strokeWidth={2.25} aria-hidden="true" />
                        ) : (
                          <ChevronUp size={18} strokeWidth={2.25} aria-hidden="true" />
                        )}
                      </button>
                      {showLightReviewNextStepsCard ? (
                        <section id={lightEstimateTotalsId} className="aio-payment__light-review-next-steps" aria-label="Use this estimate">
                          <p className="aio-payment__light-review-next-steps-kicker">Before you shop</p>
                          <ul>
                            <li>
                              <strong>{currency(estimatedOutTheDoorPrice)} out the door</strong>
                              <span>Ask for an itemized quote before financing is discussed.</span>
                            </li>
                            <li>
                              <strong>{isLoanCoveredByTradeEquity ? 'No loan payment' : `${formatAprPercent(activeApr)} APR · ${loanTerm} mo`}</strong>
                              <span>Use this rate and term as a guide when comparing financing offers.</span>
                            </li>
                            <li>
                              <strong>
                                {downPaymentApplied > 0
                                  ? `${currency(downPaymentApplied)} down`
                                  : 'Down payment and trade'}
                                {tradeInValue > 0 ? ` · ${currency(tradeInValue)} trade` : ''}
                              </strong>
                              <span>Keep credits separate so the vehicle price is easy to compare.</span>
                            </li>
                          </ul>
                        </section>
                      ) : !showLightReviewSidebarNextSteps ? (
                        <dl id={lightEstimateTotalsId} className="payment-calc__sum aio-payment__light-result-metrics" aria-label="Estimate totals">
                          <div className="payment-calc__sum-row">
                            <dt>Rate &amp; Term</dt>
                            <dd>{formatAprPercent(activeApr)} APR · {loanTerm} mo</dd>
                          </div>
                          <div className="payment-calc__sum-row">
                            <dt>{downPaymentBreakdownLabel}</dt>
                            <dd>{currency(downPaymentApplied)}</dd>
                          </div>
                          <div className="payment-calc__sum-row">
                            <dt>Trade-In Value</dt>
                            <dd>{tradeInValue > 0 ? renderLightBreakdownValue(tradeInValue, 'subtract') : currency(0)}</dd>
                          </div>
                          {showTradePayoffBreakdown && (
                            <div className="payment-calc__sum-row">
                              <dt>Amount Owed</dt>
                              <dd>{renderLightBreakdownValue(amountOwed, 'add')}</dd>
                            </div>
                          )}
                          {showTradePayoffBreakdown && (
                            <div className="payment-calc__sum-row payment-calc__sum-row--calculated">
                              <dt>{tradeEquityBreakdownLabel}</dt>
                              <dd>{renderTradeEquityBreakdownValue()}</dd>
                            </div>
                          )}
                          {showTradeCreditAppliedBreakdown && (
                            <div className="payment-calc__sum-row payment-calc__sum-row--calculated">
                              <dt>Trade Credit Applied</dt>
                              <dd>{renderLightBreakdownValue(tradeEquityApplied, 'subtract')}</dd>
                            </div>
                          )}
                          {optionalFinancedAddOns > 0 && (
                            <div className="payment-calc__sum-row">
                              <dt>Extended Warranty</dt>
                              <dd>{renderLightBreakdownValue(optionalFinancedAddOns, 'add')}</dd>
                            </div>
                          )}
                          {hasRemainingTradeEquity && (
                            <div className="payment-calc__sum-row payment-calc__sum-row--calculated">
                              <dt>Remaining Trade Equity</dt>
                              <dd>{renderLightBreakdownValue(remainingTradeEquity, 'subtract')}</dd>
                            </div>
                          )}
                          <div className="payment-calc__sum-row">
                            <dt>{isLoanCoveredByTradeEquity ? 'Loan Payment' : 'Monthly Payment'}</dt>
                            <dd>{monthlyLoanPaymentDisplay}</dd>
                          </div>
                          {monthlyInsuranceAmount > 0 && (
                            <div className="payment-calc__sum-row">
                              <dt>Insurance Estimate</dt>
                              <dd>{currency(monthlyInsuranceAmount)}/mo</dd>
                            </div>
                          )}
                          {monthlyInsuranceAmount > 0 && (
                            <div className="payment-calc__sum-row payment-calc__sum-row--calculated">
                              <dt>Monthly Cost</dt>
                              <dd>{currency(estimatedMonthlyWithInsurance)}/mo</dd>
                            </div>
                          )}
                          <div className="payment-calc__sum-row">
                            <dt>Finance Charge</dt>
                            <dd>{currency(totalLoanInterest)}</dd>
                          </div>
                          {showTotalIncludingTradeCredit && (
                            <div className="payment-calc__sum-row payment-calc__sum-row--calculated">
                              <dt>{cashLoanPaymentsLabel}</dt>
                              <dd>{currency(totalCost)}</dd>
                            </div>
                          )}
                          <div className="payment-calc__sum-row">
                            <dt>{estimatedTotalLabel}</dt>
                            <dd>{currency(estimatedTotalValue)}</dd>
                          </div>
                        </dl>
                      ) : null}
                      {showLightSidebarVehicleCta && (
                        <section
                          id={lightMarketplaceHandoffId}
                          className="aio-payment__light-marketplace-handoff"
                          aria-labelledby={lightMarketplaceHandoffTitleId}
                        >
                          <p className="aio-payment__light-marketplace-handoff-kicker">C/D Marketplace</p>
                          <h3 id={lightMarketplaceHandoffTitleId}>{lightSidebarVehicleCtaTitle}</h3>
                          <p>{lightSidebarVehicleCtaCopy}</p>
                          <a
                            className="aio-payment__light-result-vehicle-shop"
                            href={lightSidebarVehicleCtaHref}
                            aria-label={useLightSidebarBudgetCta
                              ? lightSidebarVehicleCtaLabel
                              : `Shop ${condition === 'new' ? 'new' : 'used'} ${selectedYear} ${selectedVehicle.make} ${selectedVehicle.model}`}
                          >
                            {lightSidebarVehicleCtaLabel}
                          </a>
                        </section>
                      )}
                      {SHOW_LIGHT_DEALER_FEE_NOTE && (!isLightStepsVariant || lightWizardStep === 5) && (
                        <p className="aio-payment__light-dealer-fee-note">
                          Tip: Dealer fees can be extra and are not always known until a written quote. Add documentation fees,
                          dealer-installed add-ons, protection packages, or market adjustments in the trade and fees step.
                        </p>
                      )}
                    </div>
                  </div>
                  {showSummaryBudgetFit && (
                    <div className={`aio-payment__light-budget-fit aio-payment__light-budget-fit--${displayedSummaryBudgetFitStatus}`}>
                      <div
                        className={`aio-payment__light-budget-fit-icon-wrap aio-payment__light-budget-fit-icon-wrap--${displayedSummaryBudgetFitStatus === 'over' ? 'alert' : displayedSummaryBudgetFitStatus === 'neutral' ? 'info' : 'success'}`}
                        aria-hidden="true"
                      >
                        {displayedSummaryBudgetFitStatus === 'over' ? (
                          <AlertTriangle size={16} strokeWidth={2.25} />
                        ) : displayedSummaryBudgetFitStatus === 'neutral' ? (
                          <Info size={15} strokeWidth={2.5} />
                        ) : (
                          <Check size={14} strokeWidth={3} />
                        )}
                      </div>
                      <div className="aio-payment__light-budget-fit-text">
                        <span className="aio-payment__light-budget-fit-label">{displayedSummaryBudgetFitLabel}</span>
                        <strong className="aio-payment__light-budget-fit-headline">{displayedSummaryBudgetFitHeadline}</strong>
                        <p className="aio-payment__light-budget-fit-copy">{displayedSummaryBudgetFitCopy}</p>
                      </div>
                    </div>
                  )}
	                {!isLightStepsVariant && (
	                  <>
	                    <a
	                      className="payment-calc__cta aio-payment__light-result-shop"
	                      href={lightShopHref}
	                      onClick={(event) => {
	                        if (!shouldScrollToBudgetVehicles) return;
	                        event.preventDefault();
	                        lightAffordableSectionRef.current?.scrollIntoView({ behavior: getPreferredScrollBehavior(), block: 'start' });
	                      }}
	                    >
	                      {lightShopLabel}
	                    </a>
	                    <button
	                      type="button"
	                      className="payment-calc__cta payment-calc__cta--secondary aio-payment__light-ai-button"
	                      onClick={() => setShowAiDealAnalysis(true)}
	                    >
	                      Generate AI deal analysis
	                    </button>
	                  </>
                  )}
                </div>
              </aside>
            </div>
            {isLightStepsVariant && lightWizardStep === 5 && showLightSidebarVehicleCta && (
              <div className="aio-payment__light-review-sticky-cta" aria-label="Marketplace action">
                <a
                  className="aio-payment__light-review-sticky-cta-button"
                  href={lightSidebarVehicleCtaHref}
                  aria-label={useLightSidebarBudgetCta
                    ? lightSidebarVehicleCtaLabel
                    : `Shop ${condition === 'new' ? 'new' : 'used'} ${selectedYear} ${selectedVehicle.make} ${selectedVehicle.model}`}
                >
                  {lightSidebarVehicleCtaLabel}
                </a>
              </div>
            )}
            </div>
          </div>
        </section>

        {showLightELotSection && (
          <section ref={lightAffordableSectionRef} className="aio-payment__light-affordable-section aio-payment__light-elot-section">
            <div className="container">
              <section className="aio-payment__light-elot" aria-labelledby="aio-payment-light-affordable-heading">
                <div className="aio-payment__light-elot-head">
                  <h2 id="aio-payment-light-affordable-heading">For Sale Near You</h2>
                  <a className="aio-payment__light-elot-results-link" href={lightELotAllResultsHref}>
                    <span>See all results for <u>{lightELotSearchLabel} for sale</u> near {lightELotLocation}</span>
                    <ArrowRight size={18} aria-hidden="true" />
                  </a>
                </div>

                <div className="aio-payment__light-elot-carousel-wrap">
                  <button
                    type="button"
                    className="aio-payment__light-elot-nav aio-payment__light-elot-nav--left"
                    aria-label="Previous listings"
                    onClick={() => scrollAffordableVehicles('previous')}
                    disabled={!affordableCarouselState.canScrollPrevious}
                  >
                    <ChevronLeft size={24} aria-hidden="true" />
                  </button>
                  <div ref={affordableCarouselRef} className="aio-payment__light-elot-carousel" role="list">
                    {lightELotListings.map((listing) => (
                      <article key={listing.id} className="aio-payment__light-elot-card" role="listitem">
                        <Link to={`/${listing.slug}`} className="aio-payment__light-elot-image-link" aria-label={`View ${listing.year} ${listing.make} ${listing.model}`}>
                          <OptimizedImage
                            src={listing.image}
                            alt={`${listing.year} ${listing.make} ${listing.model}`}
                            aspectRatio="4/3"
                            wrapperClassName="aio-payment__light-elot-image"
                          />
                          <span className={`aio-payment__light-elot-price-badge aio-payment__light-elot-price-badge--${listing.priceBadge === 'Great Price' ? 'great' : 'good'}`}>
                            {listing.priceBadge}
                          </span>
                        </Link>
                        <div className="aio-payment__light-elot-card-body">
                          <p className="aio-payment__light-elot-kicker">{getLightListingConditionLabel(listing)}</p>
                          <h3 className="aio-payment__light-elot-card-title">
                            <Link to={`/${listing.slug}`}>
                              {listing.make} {listing.model}
                            </Link>
                          </h3>
                          <p className="aio-payment__light-elot-card-price">
                            <span aria-hidden="true">$</span>{currency(listing.price).replace('$', '')}
                          </p>
                          <p className="aio-payment__light-elot-dealer">{listing.dealerName}</p>
                        </div>
                      </article>
                    ))}
                  </div>
                  <button
                    type="button"
                    className="aio-payment__light-elot-nav aio-payment__light-elot-nav--right"
                    aria-label="Next listings"
                    onClick={() => scrollAffordableVehicles('next')}
                    disabled={!affordableCarouselState.canScrollNext}
                  >
                    <ChevronRight size={24} aria-hidden="true" />
                  </button>
                </div>
                <div className="aio-payment__light-elot-actions" aria-label="More vehicle search options">
                  {lightELotActionLinks.map((link) => (
                    <a key={link.label} className="aio-payment__light-elot-action" href={link.href}>
                      <span>{link.label}</span>
                      <img src={CD_ARROW_RIGHT_ICON_URL} alt="" aria-hidden="true" decoding="async" />
                    </a>
                  ))}
                </div>
              </section>
            </div>
          </section>
        )}

        {isLightStepsVariant && lightWizardStep === 5 && showLightELotSection && lightOptimizationTips.length > 0 && (
          <section className="aio-payment__light-expert-tip-section" aria-labelledby="aio-payment-light-expert-tip-heading">
            <div className="container">
              <article className="aio-payment__light-review-expert-tip">
                <div className="aio-payment__light-review-expert-tip-intro">
                  <div className="aio-payment__light-review-expert-tip-header">
                    <img src={CD_SEAL_CHECK_ICON_URL} alt="" aria-hidden="true" decoding="async" />
                    <h2 id="aio-payment-light-expert-tip-heading">C/D Expert Tips</h2>
                  </div>
                  <p>
                    <strong>
                      {isLoanCoveredByTradeEquity
                        ? 'Your trade equity covers the financed amount, so there is no estimated loan payment.'
                        : `Your estimate is ${currency(estimatedMonthlyWithInsurance)}/mo with ${currency(totalLoanPayments)} in loan payments.`}
                    </strong>
                    {' '}{lightExpertTipContextCopy}
                  </p>
                </div>
                <ol className="aio-payment__light-optimization-list">
                  {lightOptimizationTips.map((tip, index) => (
                    <li key={tip.id} className="aio-payment__light-optimization-item">
                      <span className="aio-payment__light-optimization-index" aria-hidden="true">{index + 1}</span>
                      <div>
                        <h3>{tip.title}</h3>
                        <p>{tip.copy}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </article>
            </div>
          </section>
        )}

        {!isLightStepsVariant && showLightAffordableDealCards && (
            <section ref={lightAffordableSectionRef} className="aio-payment__light-affordable-section">
              <div className="container">
                <section className="aio-payment__light-affordable" aria-labelledby="aio-payment-light-affordable-heading">
                  <div className="aio-payment__light-affordable-head">
                    <h2
                      id="aio-payment-light-affordable-heading"
                      className={isLightStepsVariant ? 'aio-payment__light-affordable-title--budget' : undefined}
                    >
                      {isLightStepsVariant
                        ? 'Recommended for Your Budget'
                        : startMode === 'monthly'
                          ? 'Deals Your Budget Can Support'
                          : 'Deals Near Your Price'}
                    </h2>
                  </div>
                  <p className="aio-payment__light-affordable-copy">
                    {isLightStepsVariant
                      ? `Active deals on vehicles near ${currency(startMode === 'monthly' ? affordableMsrp : price)}`
                      : startMode === 'monthly'
                        ? `These pair active deals with vehicles starting near ${currency(affordableMsrp)} before tax and fees.`
                        : `These pair active deals with vehicles starting near ${currency(price)} before tax and fees.`}
                  </p>
                  <div className="aio-payment__vehicle-carousel-wrap aio-payment__vehicle-carousel-wrap--light">
                    <button
                      type="button"
                      className="aio-payment__vehicle-carousel-nav aio-payment__vehicle-carousel-nav--left"
                      aria-label="Previous affordable vehicles"
                      onClick={() => scrollAffordableVehicles('previous')}
                      disabled={!affordableCarouselState.canScrollPrevious}
                    >
                      <ChevronLeft size={24} aria-hidden="true" />
                    </button>
                    <div ref={affordableCarouselRef} className="aio-payment__vehicle-carousel aio-payment__vehicle-carousel--light aio-payment__vehicle-carousel--deals" role="list">
                      {lightAffordableDealCards.map(({ vehicle, offers, primaryOffer, primaryIncentive }) => (
                        <DealCard
                          key={vehicle.id}
                          slug={vehicle.slug}
                          vehicleName={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
                          vehicleImage={vehicle.image}
                          vehicleImageFallback={vehicle.galleryImages?.find((image) => image !== vehicle.image)}
                          imageLoading="eager"
                          vehicleSlug={vehicle.slug}
                          vehicleMake={vehicle.make}
                          vehicleModel={vehicle.model}
                          rating={vehicle.staffRating}
                          dealTypeTag={getLightDealTypeTag(primaryOffer.type)}
                          imageBadge={vehicle.bodyStyle}
                          editorsChoice={vehicle.editorsChoice}
                          tenBest={vehicle.tenBest}
                          isSaved={false}
                          onSaveClick={(event) => {
                            event.preventDefault();
                            event.stopPropagation();
                          }}
                          offers={offers}
                          offersPopupOpen={lightAffordableOffersSlug === vehicle.slug}
                          onToggleOffersPopup={(event) => {
                            event.preventDefault();
                            event.stopPropagation();
                            setLightAffordableOffersSlug((current) => current === vehicle.slug ? null : vehicle.slug);
                          }}
                          onCloseOffersPopup={(event) => {
                            event.preventDefault();
                            event.stopPropagation();
                            setLightAffordableOffersSlug(null);
                          }}
                          payment={getLightDealPayment(primaryOffer)}
                          details={[
                            { label: 'Est. payment', value: `${currency(getEstimatedMonthlyForVehiclePrice(vehicle.priceMin))}/mo` },
                            { label: 'Starts at', value: currency(vehicle.priceMin) },
                          ]}
                          onDealClick={(event) => {
                            event.preventDefault();
                            setLightDealModalVehicle(vehicle);
                            setSelectedIncentive(primaryIncentive);
                            setShowIncentiveModal(true);
                          }}
                        />
                      ))}
                    </div>
                    <button
                      type="button"
                      className="aio-payment__vehicle-carousel-nav aio-payment__vehicle-carousel-nav--right"
                      aria-label="Next affordable vehicles"
                      onClick={() => scrollAffordableVehicles('next')}
                      disabled={!affordableCarouselState.canScrollNext}
                    >
                      <ChevronRight size={24} aria-hidden="true" />
                    </button>
                  </div>
                </section>
              </div>
            </section>
        )}

        {isLightStepsVariant && lightWizardStep !== 5 && (
          <section className="aio-payment__advantage-section" aria-labelledby="aio-payment-advantage-heading">
            <div className="container">
              <div className="aio-payment__advantage">
                <h2 id="aio-payment-advantage-heading" className="aio-payment__faq-heading aio-payment__advantage-heading">
                  THE CAR AND DRIVER PRICE CALCULATOR ADVANTAGE
                </h2>
                <div className="aio-payment__advantage-points" role="list">
                  {CAR_AND_DRIVER_ADVANTAGE_ITEMS.map((item) => (
                    <article key={item.title} className="aio-payment__advantage-point" role="listitem">
                      <img src={item.image} alt={item.alt} className="aio-payment__advantage-image" loading="lazy" />
                      <h3>{item.title}</h3>
                    </article>
                  ))}
                </div>
                <p className="aio-payment__advantage-copy">
                  The <em>Car and Driver</em> Price Calculator connects your vehicle price, APR, loan term, down payment, trade-in value, taxes, fees, and available incentives in one estimate.
                  {' '}Use it to see how each choice changes monthly payment and total loan cost, then compare cars and deals with the same assumptions before you talk to a dealer.
                </p>
              </div>
            </div>
          </section>
        )}

        <section className="aio-payment__light-faq-section" aria-labelledby="aio-payment-light-faq-heading">
          <div className="container">
            <h2 id="aio-payment-light-faq-heading" className="aio-payment__faq-heading">FAQs</h2>
            <div className="aio-payment__faq-list">
              {LIGHT_FINANCING_FAQS.map((item, index) => (
                <div key={item.question} className={`aio-payment__faq-item ${expandedFaq === index ? 'aio-payment__faq-item--expanded' : ''}`}>
                  <button
                    type="button"
                    className="aio-payment__faq-question"
                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                    aria-expanded={expandedFaq === index}
                  >
                    <span className="aio-payment__faq-question-text">{item.question}</span>
                    {expandedFaq === index ? <ChevronUp size={24} aria-hidden /> : <ChevronDown size={24} aria-hidden />}
                  </button>
                  {expandedFaq === index && (
                    <div className="aio-payment__faq-answer">
                      {item.answer.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {isLightStepsVariant && (
          <section className="aio-payment__shopping-tools-section" aria-labelledby="aio-payment-shopping-tools-heading">
            <div className="container">
              <div className="aio-payment__shopping-tools">
                <div className="aio-payment__shopping-tools-title-row">
                  <span aria-hidden="true" />
                  <h2 id="aio-payment-shopping-tools-heading">Shopping Tools</h2>
                  <span aria-hidden="true" />
                </div>
                <div className="aio-payment__shopping-tools-shell">
                  <button
                    type="button"
                    className="aio-payment__shopping-tools-nav aio-payment__shopping-tools-nav--previous"
                    aria-label="Previous shopping tools"
                    onClick={() => scrollShoppingTools('previous')}
                  >
                    <ChevronLeft size={28} aria-hidden="true" />
                  </button>
                  <div ref={shoppingToolsRef} className="aio-payment__shopping-tools-list" role="list">
                    {SHOPPING_TOOLS.map((tool) => (
                      <article key={tool.title} className="aio-payment__shopping-tool-card" role="listitem">
                        <OptimizedImage
                          src={tool.image}
                          alt=""
                          aria-hidden="true"
                          className="aio-payment__shopping-tool-image"
                          wrapperClassName="aio-payment__shopping-tool-media"
                          aspectRatio="16/10"
                          objectFit="cover"
                        />
                        <div className="aio-payment__shopping-tool-shade" aria-hidden="true" />
                        <div className="aio-payment__shopping-tool-content">
                          <h3>{tool.title}</h3>
                          <p>{tool.description}</p>
                          <Link
                            to={tool.href}
                            className={`aio-payment__shopping-tool-cta ${tool.primary ? 'aio-payment__shopping-tool-cta--primary' : ''}`}
                          >
                            {tool.cta}
                          </Link>
                        </div>
                      </article>
                    ))}
                  </div>
                  <button
                    type="button"
                    className="aio-payment__shopping-tools-nav aio-payment__shopping-tools-nav--next"
                    aria-label="Next shopping tools"
                    onClick={() => scrollShoppingTools('next')}
                  >
                    <ChevronRight size={28} aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}

        {showAiDealAnalysis && (
          <div className="aio-payment__ai-modal" role="dialog" aria-modal="true" aria-labelledby="aio-payment-ai-modal-title">
            <div className="aio-payment__ai-modal-backdrop" onClick={() => setShowAiDealAnalysis(false)} />
            <div className="aio-payment__ai-modal-panel">
              <div className="aio-payment__ai-modal-head">
                <div>
                  <span className="aio-payment__eyebrow">AI deal analysis</span>
                  <h2 id="aio-payment-ai-modal-title">
                    {lightHasSpecificVehicleSelection
                      ? `Best path for a ${selectedVehicleLabel} ${selectedVehicleStyle}`
                      : 'Best path for your estimate'}
                  </h2>
                  <p className="aio-payment__ai-modal-subtitle">
                    Use this as a dealer worksheet. Lock the selling price first, then compare fees, APR, cash due, and total loan payments.
                  </p>
                  <dl className="aio-payment__ai-modal-context" aria-label="Current estimate context">
	                    <div><dt>{monthlyInsuranceAmount > 0 ? 'Current monthly cost' : 'Current payment'}</dt><dd>{currentMonthlyCostDisplay}</dd></div>
                    <div><dt>Loan payments</dt><dd>{currency(totalLoanPayments)}</dd></div>
                    <div><dt>Rate &amp; term</dt><dd>{formatAprPercent(activeApr)} · {loanTerm} mo</dd></div>
                    <div><dt>Due at signing</dt><dd>{currency(cashDueAtSigning)}</dd></div>
                  </dl>
                </div>
                <button type="button" onClick={() => setShowAiDealAnalysis(false)} aria-label="Close AI deal analysis">
                  x
                </button>
              </div>

              <section className="aio-payment__ai-modal-plan" aria-labelledby="aio-payment-ai-plan-title">
                <div className="aio-payment__ai-modal-section-head">
                  <h3 id="aio-payment-ai-plan-title">Do these in order</h3>
                  <p>Each move protects a different part of the deal sheet.</p>
                </div>
                <ol className="aio-payment__ai-modal-action-list">
                  {aiDealActions.map((action, index) => (
                    <li key={action.title}>
                      <span className="aio-payment__ai-modal-action-index">{index + 1}</span>
                      <div>
                        <span className="aio-payment__ai-modal-action-kicker">{action.title}</span>
                        <strong>{action.value}</strong>
                        <p>{action.body}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </section>

              <div className="aio-payment__ai-modal-grid">
                <section className="aio-payment__ai-modal-checklist">
                  <h3>Dealer quote checklist</h3>
                  <ul>
                    {aiQuoteChecklist.map((item) => (
                      <li key={item}>
                        <Check size={16} strokeWidth={2.4} aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                <section>
                  <h3>Ask exactly this</h3>
                  <p className="aio-payment__ai-modal-script">
                    I want the selling price first. Please show a written out-the-door quote at {currency(aiTargetPrice)}
                    before trade, with taxes, registration, doc fee, dealer fees, add-ons, APR, and amount financed listed separately.
                  </p>
                  <p>{aiBestOfferPath}</p>
                </section>

                <section className="aio-payment__ai-modal-risks">
                  <h3>Watch-outs</h3>
                  <ul>
                    {aiDealRisks.map((flag) => <li key={flag}>{flag}</li>)}
                  </ul>
                </section>

                <section>
                  <h3>What a strong deal looks like</h3>
                  <dl className="aio-payment__ai-modal-deal-sheet">
                    <div><dt>Selling price</dt><dd>{currency(aiTargetPrice)}</dd></div>
                    <div><dt>Out-the-door target</dt><dd>{currency(aiTargetOutTheDoor)}</dd></div>
                    <div><dt>Target financed</dt><dd>{currency(aiTargetLoanAmount)}</dd></div>
                    <div><dt>Due at signing</dt><dd>{currency(cashDueAtSigning)}</dd></div>
                  </dl>
                  <p>
                    If the dealer cannot preserve these numbers, compare similar listings or test a lower APR and larger down payment.
                  </p>
                </section>
              </div>

              <div className="aio-payment__ai-modal-actions">
                <a
                  className="payment-calc__cta"
                  href={lightShopHref}
                  onClick={(event) => {
                    if (!shouldScrollToBudgetVehicles) return;
                    event.preventDefault();
                    setShowAiDealAnalysis(false);
                    window.requestAnimationFrame(() => {
                      lightAffordableSectionRef.current?.scrollIntoView({ behavior: getPreferredScrollBehavior(), block: 'start' });
                    });
                  }}
                >
                  {lightShopLabel}
                </a>
                <button type="button" className="payment-calc__cta payment-calc__cta--secondary" onClick={() => setShowAiDealAnalysis(false)}>
                  Back to estimate
                </button>
              </div>
            </div>
          </div>
        )}

        <TradeInEstimateModal
          isOpen={showTradeTool}
          initialVehicle={tradeVehicle}
          initialMileage={tradeMileage}
          initialCondition={tradeCondition}
          description="Add your vehicle, mileage, and condition. We’ll apply the estimate to this payment calculation."
          onClose={() => setShowTradeTool(false)}
          onApply={applyTradeToolEstimate}
        />

        <IncentivesModal
          isOpen={showIncentiveModal}
          onClose={() => {
            setShowIncentiveModal(false);
            setSelectedIncentive(null);
            setLightDealModalVehicle(null);
          }}
          variant="conversion-b"
          offer={incentiveOfferDetail}
          allIncentives={activeVehicleIncentives.incentives}
          selectedIncentiveId={selectedIncentive?.id}
          appliedIncentiveIds={lightDealModalVehicle
            ? []
            : [
                ...selectedCashIds,
                ...(selectedFinanceId === 'custom' ? [] : [selectedFinanceId]),
              ]}
          onApplyIncentive={(incentive) => {
            if (lightDealModalVehicle) {
              applySelectedVehicle(lightDealModalVehicle);
              setLightDealModalVehicle(null);
            }
            applyOfferToEstimate(incentive);
          }}
        />
      </div>
    );
  }

  return (
    <div className="aio-payment">
      <section className="aio-payment__hero">
        <div className="container">
          <div className="aio-payment__hero-content">
            <nav className="aio-payment__breadcrumb" aria-label="Breadcrumb">
              <Link to="/">Home</Link>
              <span className="aio-payment__breadcrumb-sep">/</span>
              <Link to="/auto-loan-calculator">Auto Loan Calculator</Link>
              <span className="aio-payment__breadcrumb-sep">/</span>
              <span>All-in-One Payment Calculator</span>
            </nav>
            <h1>Payment Calculator</h1>
            <p>
              Estimate the monthly payment, tax treatment, incentives, trade equity, total loan cost, buying advice,
              and amortization in one shopping workflow.
            </p>
          </div>
        </div>
      </section>

      <div className="container aio-payment__sticky-shell">
        <div className="aio-payment__sticky-content">
          <section className="aio-payment__section">
            <div className="aio-payment__layout">
          <div className="aio-payment__panel">
            <div className="aio-payment__section-heading">
              <span className="aio-payment__eyebrow">{isBudgetFirstVariant ? 'Start here' : 'Pre-calculation'}</span>
              <h2>
                {isBudgetFirstVariant
                  ? 'Choose the number you already know'
                  : startMode === 'price' ? 'Vehicle, price, trade, incentives, and taxes' : 'Monthly budget, vehicle, trade, incentives, and taxes'}
              </h2>
              {isBudgetFirstVariant && (
                <p>
                  {canUseCatalogPrice
                    ? 'Enter a monthly budget to find a realistic MSRP, or enter an MSRP to estimate the payment.'
                    : 'Enter a monthly budget to find a listing-price target, or enter a real listing price to estimate the payment.'}
                  Then tune the loan, tax, trade-in, and incentives without leaving the page.
                </p>
              )}
            </div>

            <div className={`aio-payment__start-mode ${isBudgetFirstVariant ? 'aio-payment__start-mode--guided' : ''}`} role="radiogroup" aria-label="Choose how to start the estimate">
              <button
                type="button"
                role="radio"
                aria-checked={startMode === 'monthly'}
                className={`aio-payment__start-mode-button ${startMode === 'monthly' ? 'aio-payment__start-mode-button--active' : ''}`}
                onClick={() => setStartMode('monthly')}
              >
                <span>{isBudgetFirstVariant ? 'I know my budget' : 'Monthly payment'}</span>
                <strong>{isBudgetFirstVariant ? `Find the ${canUseCatalogPrice ? 'MSRP' : 'listing price'} that fits your monthly target.` : 'Enter a target payment and see how much vehicle it supports.'}</strong>
              </button>
              <button
                type="button"
                role="radio"
                aria-checked={startMode === 'price'}
                className={`aio-payment__start-mode-button ${startMode === 'price' ? 'aio-payment__start-mode-button--active' : ''}`}
                onClick={() => setStartMode('price')}
              >
                <span>{isBudgetFirstVariant ? `I know the ${canUseCatalogPrice ? 'MSRP' : 'listing price'}` : 'Selected car price'}</span>
                <strong>{isBudgetFirstVariant ? 'Estimate the monthly payment for a specific vehicle price.' : 'Enter a price and calculate the monthly payment.'}</strong>
              </button>
            </div>

            {isBudgetFirstVariant && (
              <div className="aio-payment__budget-answer" aria-live="polite">
                <div>
                  <span className="aio-payment__budget-label">
                    {startMode === 'price' ? 'Estimated monthly payment' : 'Budget supports about'}
                  </span>
                  <strong>{startMode === 'price' ? `${currency(estimatedMonthly)}/mo` : currency(affordableMsrp)}</strong>
                  <p>
                    {startMode === 'price'
                      ? canUseCatalogPrice
                        ? `Based on ${currency(workingPrice)} MSRP, ${loanTerm} months, and ${formatAprPercent(activeApr)} APR.`
                        : `Based on the current ${currency(workingPrice)} listing-price input, ${loanTerm} months, and ${formatAprPercent(activeApr)} APR.`
                      : canUseCatalogPrice
                        ? `Estimated MSRP before tax and fees for a ${currency(targetMonthlyPayment)}/mo target.`
                        : `Estimated listing-price target before tax and fees for a ${currency(targetMonthlyPayment)}/mo target.`}
                  </p>
                </div>
                <div className="aio-payment__budget-facts" aria-label="Estimate assumptions">
                  <span>{currency(downPayment)} down</span>
                  <span>{loanTerm} months</span>
                  <span>{formatAprPercent(activeApr)} APR</span>
                </div>
              </div>
            )}

            {(isBudgetFirstVariant || !isLightVariant) && (
              <div className="aio-payment__primary-input">
                {startMode === 'price' ? (
                  <TextField
                    label={isBudgetFirstVariant ? canUseCatalogPrice ? 'Vehicle price or MSRP' : 'Vehicle listing price' : 'Selected car price'}
                    type="number"
                    inputMode="numeric"
                    value={price}
                    min={0}
                    step={500}
                    iconLeft={MONEY_INPUT_PREFIX}
                    helperText={isBudgetFirstVariant
                      ? 'Use the negotiated selling price if you already have one.'
                      : `${selectedYear} ${selectedVehicle.make} ${selectedVehicle.model} estimate: ${currency(estimatedMonthly)}/mo`}
                    onFocus={selectCalculatorInputValueOnFocus}
                    onChange={(event) => handlePriceChange(numberInput(event.target.value))}
                  />
                ) : (
                  <TextField
                    label={isBudgetFirstVariant ? 'Monthly budget' : 'Target monthly payment'}
                    type="number"
                    inputMode="numeric"
                    value={targetMonthlyPayment}
                    min={0}
                    step={25}
                    iconLeft={MONEY_INPUT_PREFIX}
                    helperText={isBudgetFirstVariant
                      ? `Try 500 for a $500 monthly budget. This supports about ${currency(affordableMsrp)} before tax and fees.`
                      : `This supports about ${currency(affordableMsrp)} before tax and fees.`}
                    onFocus={selectCalculatorInputValueOnFocus}
                    onChange={(event) => setTargetMonthlyPayment(numberInput(event.target.value))}
                  />
                )}
              </div>
            )}

            <div className="aio-payment__form-grid">
              <Select
                label="New or used"
                value={condition}
                onChange={(event) => handleVehicleConditionChange(event.target.value as VehicleCondition)}
                options={[
                  { value: 'new', label: 'New car' },
                  { value: 'used', label: 'Used car' },
                ]}
              />
              <Select
                label="Year"
                value={selectedYear}
                onChange={(event) => updateVehicleByParts({ year: event.target.value })}
                options={availableYears.map((year) => ({ value: year, label: year }))}
              />
              <Select
                label="Make"
                value={selectedVehicle.make}
                onChange={(event) => updateVehicleByParts({ make: event.target.value })}
                options={availableMakes.map((make) => ({ value: make, label: make }))}
              />
              <Select
                label="Model"
                value={selectedVehicle.model}
                onChange={(event) => updateVehicleByParts({ model: event.target.value })}
                options={availableModels.map((model) => ({ value: model, label: model }))}
              />
              <Select
                label="Trim / style"
                value={selectedTrimStyleOption?.value ?? ''}
                wrapperClassName="aio-payment__field--wide"
                onChange={(event) => handleTrimStyleChange(event.target.value)}
                options={availableTrimStyleOptions.map((option) => ({
                  value: option.value,
                  label: option.label,
                }))}
              />
              <TextField
                label="Down payment"
                type="number"
                inputMode="numeric"
                value={downPayment}
                min={0}
                step={500}
                iconLeft={MONEY_INPUT_PREFIX}
                onFocus={selectCalculatorInputValueOnFocus}
                onChange={(event) => {
                  const nextDownPayment = numberInput(event.target.value);
                  if (isLightVariant) {
                    handleLightDownPaymentChange(nextDownPayment);
                    return;
                  }
                  setDownPayment(nextDownPayment);
                }}
              />
              <TextField
                label="Trade-in value"
                type="text"
                inputMode="numeric"
                pattern="[0-9,]*"
                value={numberWithCommas(tradeInValue)}
                iconLeft={MONEY_INPUT_PREFIX}
                onFocus={selectCalculatorInputValueOnFocus}
                onChange={(event) => setTradeInValue(currencyInput(event.target.value))}
              />
              <TextField
                label="Amount owed on trade"
                type="text"
                inputMode="numeric"
                pattern="[0-9,]*"
                value={numberWithCommas(amountOwed)}
                iconLeft={MONEY_INPUT_PREFIX}
                onFocus={selectCalculatorInputValueOnFocus}
                onChange={(event) => setAmountOwed(currencyInput(event.target.value))}
              />
            </div>

            <div className="aio-payment__trade-card">
              <div>
                <h3>Embedded trade-in value tool</h3>
                <p>No lead form. Enter a vehicle, mileage, and condition to apply an estimated trade value.</p>
              </div>
              <Button variant="outline" size="small" onClick={() => setShowTradeTool(true)}>
                Estimate trade value
              </Button>
            </div>

            {condition === 'new' && (
              <div className="aio-payment__offers-module">
                <HeroOffersB
                  vehicleIncentives={offerModuleIncentives}
                  onOfferClick={handleOfferClick}
                  onApplyOffer={applyOfferToEstimate}
                  title={`${selectedYear} ${selectedVehicle.make} ${selectedVehicle.model} deals and incentives`}
                  selectedOfferIds={[
                    ...selectedCashIds,
                    ...(selectedFinanceId === 'custom' ? [] : [selectedFinanceId]),
                  ]}
                />
                {selectedFinanceId !== 'custom' && (
                  <Button variant="ghost" size="small" onClick={() => setSelectedFinanceId('custom')}>
                    Use my own rate
                  </Button>
                )}
              </div>
            )}

            <div className="aio-payment__form-grid">
              <TextField
                label="Interest rate"
                type="number"
                inputMode="decimal"
                value={activeApr}
                min={0}
                step={0.1}
                disabled={selectedFinanceId !== 'custom'}
                iconRight={PERCENT_INPUT_SUFFIX}
                onFocus={selectCalculatorInputValueOnFocus}
                onChange={(event) => {
                  const nextApr = numberInput(event.target.value);
                  if (isLightVariant) {
                    handleLightCustomAprChange(nextApr);
                    return;
                  }
                  setCustomApr(nextApr);
                }}
              />
              <Select
                label="Loan term"
                value={loanTerm}
                onChange={(event) => setLoanTerm(numberInput(event.target.value))}
                options={termOptions.map((term) => ({ value: String(term), label: `${term} months` }))}
              />
              <Select
                label="Your state"
                value={stateCode}
                onChange={(event) => handleStateCodeChange(event.target.value)}
                options={stateRules.map((state) => ({ value: state.code, label: state.name }))}
              />
              <TextField
                label="Sales tax"
                type="number"
                inputMode="numeric"
                value={salesTaxOverride || Math.round(calculatedSalesTax)}
                min={0}
                iconLeft={MONEY_INPUT_PREFIX}
                onFocus={selectCalculatorInputValueOnFocus}
                onChange={(event) => setSalesTaxOverride(event.target.value)}
              />
              <TextField
                label="Title, registration, and other fees"
                type="text"
                inputMode="numeric"
                pattern="[0-9,]*"
                value={formatMoneyInputValue(feesOverride, stateRule.titleRegistrationFees)}
                iconLeft={MONEY_INPUT_PREFIX}
                onFocus={selectCalculatorInputValueOnFocus}
                onChange={(event) => {
                  setEstimatedFeesOverride('');
                  setFeesOverride(normalizeMoneyInputValue(event.target.value));
                }}
              />
              <TextField
                label={renderAreaEstimateLabel('Dealer fees')}
                type="number"
                inputMode="numeric"
                value={dealerFeesOverride || stateRule.dealerFeesEstimate}
                min={0}
                iconLeft={MONEY_INPUT_PREFIX}
                onFocus={selectCalculatorInputValueOnFocus}
                onChange={(event) => {
                  setEstimatedFeesOverride('');
                  setDealerFeesOverride(event.target.value);
                }}
              />
            </div>
            <p className="aio-payment__tax-note">
              {stateRule.name} rule: {TAX_RULE_LABELS[stateRule.taxRule]}. Taxable amount: {currency(taxableAmount)}.
              Dealer fees are estimates until a dealer provides a written quote.
            </p>

            <div className="aio-payment__expert-tip">
              <div className="aio-payment__expert-tip-header">
                <div className="aio-payment__expert-tip-icon">
                  <SealCheckIcon size={24} />
                </div>
                <span className="aio-payment__expert-tip-label">C/D Expert Tip:</span>
              </div>
              <p className="aio-payment__expert-tip-text">
                A longer term can make the monthly payment look easier, but interest can rise quickly. Compare incentives,
                taxes, fees, and trade equity together before choosing the lowest monthly number.
              </p>
            </div>
          </div>

            </div>
          </section>

          <section className="aio-payment__section aio-payment__section--gray">
            <div className="aio-payment__post-grid">
          <article className="aio-payment__panel">
            <span className="aio-payment__eyebrow">Post-calculation tips</span>
            <h2>Ways to optimize this deal</h2>
            <ul className="aio-payment__tips">
              <li>
                Put down $1,000 extra to lower payment by <strong>{currency(estimatedMonthly - extraDownPaymentMonthly)}/mo</strong> and reduce loan payments by <strong>{currency(totalLoanPayments - extraDownPaymentMonthly * loanTerm)}</strong>.
              </li>
              <li>
                Lower APR by 1 point to lower payment by <strong>{currency(estimatedMonthly - lowerAprMonthly)}/mo</strong> and reduce loan payments by <strong>{currency(totalLoanPayments - lowerAprMonthly * loanTerm)}</strong>.
              </li>
              {lowAprVsCash && (
                <li>
                  {lowAprVsCash.label}: low APR changes payment by <strong>{currency(Math.abs(lowAprVsCash.monthlyDelta))}/mo</strong> and total payments by <strong>{currency(Math.abs(lowAprVsCash.totalDelta))}</strong> versus cash back.
                </li>
              )}
            </ul>
          </article>

            </div>
          </section>

          <section className="aio-payment__section">
            <div className="aio-payment__results">
              {!isBudgetFirstVariant && totalLoanAmount > 0 && loanTerm > 0 && (
                <div className="aio-payment__panel aio-payment__panel--wide aio-payment__finance-visualization">
                  <span className="aio-payment__eyebrow">Loan visualization</span>
                  <h2>Payment breakdown over time</h2>
                  <PaymentCalculatorFinanceCharts
                    loanPrincipal={totalLoanAmount}
                    financeApr={activeApr}
                    termMonths={loanTerm}
                    monthlyPayment={estimatedMonthly}
                    totalInterest={totalLoanInterest}
                  />
                </div>
              )}

          <div className="aio-payment__panel">
            <span className="aio-payment__eyebrow">Loan breakdown</span>
            <h2>Principal and interest</h2>
            <dl className="aio-payment__breakdown">
              <div><dt>Total principal</dt><dd>{currency(totalLoanAmount)}</dd></div>
              <div><dt>Total interest</dt><dd>{currency(totalLoanInterest)}</dd></div>
              <div><dt>Sales tax</dt><dd>{currency(salesTax)}</dd></div>
              <div><dt>Estimated registration & dealer fees</dt><dd>{currency(fees)}</dd></div>
              <div><dt>Applied rebates</dt><dd>{currency(rebateTotal)}</dd></div>
            </dl>
          </div>

          <div className="aio-payment__panel aio-payment__panel--wide">
            <span className="aio-payment__eyebrow">Amortization schedule</span>
            <h2>Year-by-year summary</h2>
            <div className="aio-payment__table-wrap">
              <table className="aio-payment__table">
                <thead>
                  <tr>
                    <th>Year</th>
                    <th>Principal</th>
                    <th>Interest</th>
                    <th>Year-end balance</th>
                  </tr>
                </thead>
                <tbody>
                  {schedule.map((row) => (
                    <tr key={row.year}>
                      <td>{row.year}</td>
                      <td>{currency(row.principal)}</td>
                      <td>{currency(row.interest)}</td>
                      <td>{currency(row.endBalance)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
            </div>
          </section>

          <section className="aio-payment__section aio-payment__section--gray">
            <article className="aio-payment__panel aio-payment__lease-estimator">
              <div className="aio-payment__section-heading">
                <span className="aio-payment__eyebrow">Secondary estimator</span>
                <h2>Lease and buyout costs</h2>
                <p>
                  Lease payments use different math than loans. Use this separate estimator to check a lease payment or a buyout loan without changing your main finance scenario.
                </p>
              </div>
              <div className="aio-payment__lease-tabs" role="tablist" aria-label="Lease estimator mode">
                <button
                  type="button"
                  role="tab"
                  aria-selected={leaseEstimatorMode === 'lease'}
                  className={`aio-payment__lease-tab ${leaseEstimatorMode === 'lease' ? 'aio-payment__lease-tab--active' : ''}`}
                  onClick={() => setLeaseEstimatorMode('lease')}
                >
                  Lease estimate
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={leaseEstimatorMode === 'buyout'}
                  className={`aio-payment__lease-tab ${leaseEstimatorMode === 'buyout' ? 'aio-payment__lease-tab--active' : ''}`}
                  onClick={() => setLeaseEstimatorMode('buyout')}
                >
                  Buyout estimate
                </button>
              </div>

              {leaseEstimatorMode === 'lease' ? (
                <div className="aio-payment__lease-panel" role="tabpanel">
                  <div className="aio-payment__form-grid">
                    <TextField
                      label="MSRP"
                      type="number"
                      inputMode="numeric"
                      value={leaseMsrp}
                      min={0}
                      step={500}
                      iconLeft={MONEY_INPUT_PREFIX}
                      onFocus={selectCalculatorInputValueOnFocus}
                      onChange={(event) => setLeaseMsrp(numberInput(event.target.value))}
                    />
                    <Select
                      label="Lease term"
                      value={leaseTerm}
                      onChange={(event) => setLeaseTerm(numberInput(event.target.value))}
                      options={[24, 36, 39, 48].map((term) => ({ value: String(term), label: `${term} months` }))}
                    />
                    <TextField
                      label="Money factor"
                      type="number"
                      inputMode="decimal"
                      value={leaseMoneyFactor}
                      min={0}
                      step={0.0001}
                      onFocus={selectCalculatorInputValueOnFocus}
                      onChange={(event) => setLeaseMoneyFactor(numberInput(event.target.value))}
                    />
                    <TextField
                      label="Residual %"
                      type="number"
                      inputMode="numeric"
                      value={leaseResidualPercent}
                      min={0}
                      max={100}
                      step={1}
                      iconRight={PERCENT_INPUT_SUFFIX}
                      onFocus={selectCalculatorInputValueOnFocus}
                      onChange={(event) => setLeaseResidualPercent(numberInput(event.target.value))}
                    />
                    <TextField
                      label="Cash due at signing"
                      type="number"
                      inputMode="numeric"
                      value={leaseDueAtSigning}
                      min={0}
                      step={250}
                      iconLeft={MONEY_INPUT_PREFIX}
                      onFocus={selectCalculatorInputValueOnFocus}
                      onChange={(event) => setLeaseDueAtSigning(numberInput(event.target.value))}
                    />
                    <TextField
                      label="Lease fees"
                      type="number"
                      inputMode="numeric"
                      value={leaseFees}
                      min={0}
                      step={100}
                      iconLeft={MONEY_INPUT_PREFIX}
                      onFocus={selectCalculatorInputValueOnFocus}
                      onChange={(event) => setLeaseFees(numberInput(event.target.value))}
                    />
                    <Select
                      label="Annual mileage"
                      value={leaseAnnualMileage}
                      wrapperClassName="aio-payment__field--wide"
                      onChange={(event) => setLeaseAnnualMileage(numberInput(event.target.value))}
                      options={[10000, 12000, 15000].map((miles) => ({ value: String(miles), label: `${miles.toLocaleString()} miles/year` }))}
                    />
                  </div>
                  <p className="aio-payment__lease-help">
                    Money factor is the lease's finance rate. Ask the dealer for this number, or divide an APR by 2,400 for a rough conversion. Residual % is the expected vehicle value at lease end.
                  </p>
                  <dl className="aio-payment__lease-results">
                    <div><dt>Estimated lease payment</dt><dd>{currency(leaseMonthlyPayment)}/mo</dd></div>
                    <div><dt>Effective lease cost</dt><dd>{currency(leaseTotalCost)}</dd></div>
                    <div><dt>Residual value</dt><dd>{currency(leaseResidualValue)}</dd></div>
                    <div><dt>Included miles</dt><dd>{leaseIncludedMiles.toLocaleString()}</dd></div>
                  </dl>
                  <p className="aio-payment__summary-note">
                    Lease estimate includes state tax on the monthly payment. Confirm the money factor, residual %, fees, and mileage allowance before signing.
                  </p>
                </div>
              ) : (
                <div className="aio-payment__lease-panel" role="tabpanel">
                  <div className="aio-payment__form-grid">
                    <TextField
                      label="Lease buyout price"
                      type="number"
                      inputMode="numeric"
                      value={buyoutPrice}
                      min={0}
                      step={500}
                      iconLeft={MONEY_INPUT_PREFIX}
                      onFocus={selectCalculatorInputValueOnFocus}
                      onChange={(event) => setBuyoutPrice(numberInput(event.target.value))}
                    />
                    <TextField
                      label="Buyout down payment"
                      type="number"
                      inputMode="numeric"
                      value={buyoutDownPayment}
                      min={0}
                      step={250}
                      iconLeft={MONEY_INPUT_PREFIX}
                      onFocus={selectCalculatorInputValueOnFocus}
                      onChange={(event) => setBuyoutDownPayment(numberInput(event.target.value))}
                    />
                    <TextField
                      label="Buyout APR"
                      type="number"
                      inputMode="decimal"
                      value={buyoutApr}
                      min={0}
                      step={0.1}
                      iconRight={PERCENT_INPUT_SUFFIX}
                      onFocus={selectCalculatorInputValueOnFocus}
                      onChange={(event) => setBuyoutApr(numberInput(event.target.value))}
                    />
                    <Select
                      label="Buyout loan term"
                      value={buyoutTerm}
                      onChange={(event) => setBuyoutTerm(numberInput(event.target.value))}
                      options={CUSTOM_RATE_TERMS.map((term) => ({ value: String(term), label: `${term} months` }))}
                    />
                  </div>
                  <dl className="aio-payment__lease-results">
                    <div><dt>Estimated buyout payment</dt><dd>{currency(buyoutMonthlyPayment)}/mo</dd></div>
                    <div><dt>Amount financed</dt><dd>{currency(buyoutAmountFinanced)}</dd></div>
                    <div><dt>Total loan payments</dt><dd>{currency(buyoutTotalPayments)}</dd></div>
                    <div><dt>Finance charge</dt><dd>{currency(buyoutFinanceCharge)}</dd></div>
                  </dl>
                  <p className="aio-payment__summary-note">
                    Buyout estimate is for purchasing your leased vehicle. It includes state tax plus title and registration assumptions, and stays separate from the new-car finance estimate above.
                  </p>
                </div>
              )}
            </article>
          </section>

          <section className="aio-payment__section aio-payment__section--gray aio-payment__faq-section" aria-labelledby="aio-payment-faq-heading">
            <div className="aio-payment__faq">
              <h2 id="aio-payment-faq-heading" className="aio-payment__faq-heading">FAQs</h2>
              <div className="aio-payment__faq-list">
                {FAQS.map((faq, index) => (
                  <div key={faq.question} className={`aio-payment__faq-item ${expandedFaq === index ? 'aio-payment__faq-item--expanded' : ''}`}>
                    <button
                      type="button"
                      className="aio-payment__faq-question"
                      onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                      aria-expanded={expandedFaq === index}
                    >
                      <span className="aio-payment__faq-question-text">{faq.question}</span>
                      <span className="aio-payment__faq-indicator" aria-hidden="true" />
                    </button>
                    {expandedFaq === index && (
                      <div className="aio-payment__faq-answer">
                        <p>{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>

        <aside ref={summaryRef} className="aio-payment__summary">
          <span className="aio-payment__eyebrow">
            {startMode === 'price' ? 'Estimated monthly payment' : isBudgetFirstVariant ? `Budget-supported ${canUseCatalogPrice ? 'MSRP' : 'price'}` : 'Selected car price'}
          </span>
          <strong>{startMode === 'price' ? `${currency(estimatedMonthly)}/mo` : currency(isBudgetFirstVariant ? workingPrice : price)}</strong>
          <div className="aio-payment__summary-highlights">
            {startMode === 'price' ? (
              <div>
                <span>Selected car price</span>
                <strong>{currency(workingPrice)}</strong>
              </div>
            ) : (
              <>
                <div>
                  <span>Target monthly payment</span>
                  <strong>{currency(targetMonthlyPayment)}/mo</strong>
                </div>
                <div>
                  <span>Estimated monthly payment</span>
                  <strong>{currency(estimatedMonthly)}/mo</strong>
                </div>
              </>
            )}
            <div>
              <span>Total after trade & deals</span>
              <strong>{currency(totalCost)}</strong>
            </div>
          </div>
          <p className="aio-payment__summary-subtitle">
            Includes price, tax, fees, trade equity, incentives, down payment, and finance charge.
          </p>
          <div className="aio-payment__summary-groups">
            <details className="aio-payment__summary-group">
              <summary>
                <span>
                  Out-the-door price
                  <span className="aio-payment__info-tooltip" tabIndex={0} aria-label="About out-the-door price estimates">
                    <Info size={14} aria-hidden="true" />
                    <span className="aio-payment__info-tooltip-text" role="tooltip">
                      This is an estimate. Dealer-installed add-ons, documentation fees, protection packages, market adjustments, and other charges can change the final amount due at signing.
                    </span>
                  </span>
                </span>
                <strong>{currency(outTheDoorPrice)}</strong>
              </summary>
              <dl className="aio-payment__summary-breakdown">
                <div><dt>Vehicle price</dt><dd>{currency(workingPrice)}</dd></div>
                <div><dt>Sales tax</dt><dd>{currency(salesTax)}</dd></div>
                <div><dt>Estimated registration & dealer fees</dt><dd>{currency(fees)}</dd></div>
                {optionalFinancedAddOns > 0 && (
                  <div><dt>Extended warranty</dt><dd>{currency(optionalFinancedAddOns)}</dd></div>
                )}
              </dl>
            </details>

            <details className="aio-payment__summary-group">
              <summary>
                <span>After trade & incentives</span>
                <strong>{currency(netPriceAfterTradeAndOffers)}</strong>
              </summary>
              <dl className="aio-payment__summary-breakdown">
                <div><dt>Trade-in value</dt><dd>{tradeInValue > 0 ? renderLightBreakdownValue(tradeInValue, 'subtract') : currency(0)}</dd></div>
                <div><dt>Amount owed on trade</dt><dd>{amountOwed > 0 ? renderLightBreakdownValue(amountOwed, 'add') : currency(0)}</dd></div>
                {showTradePayoffBreakdown && (
                  <div className="aio-payment__summary-row--emphasis">
                    <dt>{tradeEquityBreakdownLabel}</dt>
                    <dd>{formatTradeEquitySummaryValue()}</dd>
                  </div>
                )}
                <div><dt>Rebates and incentives</dt><dd>{rebateTotal > 0 ? renderLightBreakdownValue(rebateTotal, 'subtract') : currency(0)}</dd></div>
                <div><dt>Cash due at signing</dt><dd>{cashDueAtSigning > 0 ? renderLightBreakdownValue(cashDueAtSigning, 'subtract') : currency(0)}</dd></div>
              </dl>
            </details>

            <details className="aio-payment__summary-group">
              <summary>
                <span>Amount financed</span>
                <strong>{currency(totalLoanAmount)}</strong>
              </summary>
              <dl className="aio-payment__summary-breakdown">
	                <div><dt>{isLoanCoveredByTradeEquity ? 'Loan payment' : 'Estimated payment'}</dt><dd>{monthlyLoanPaymentDisplay}</dd></div>
                {monthlyInsuranceAmount > 0 && (
                  <div><dt>Monthly insurance</dt><dd>{currency(monthlyInsuranceAmount)}/mo</dd></div>
                )}
                {monthlyInsuranceAmount > 0 && (
                  <div><dt>Monthly cost</dt><dd>{currency(estimatedMonthlyWithInsurance)}/mo</dd></div>
                )}
                {startMode === 'monthly' && (
                  <div>
                    <dt>{paymentDelta > 0 ? 'Over target by' : 'Under target by'}</dt>
                    <dd>{currency(Math.abs(paymentDelta))}/mo</dd>
                  </div>
                )}
                <div><dt>Finance charge</dt><dd>{currency(totalLoanInterest)}</dd></div>
                <div><dt>Total loan payments</dt><dd>{currency(totalLoanPayments)}</dd></div>
                <div><dt>Cash + loan payments</dt><dd>{currency(totalPaidFromPocket)}</dd></div>
              </dl>
            </details>
          </div>
          <p className="aio-payment__summary-note">
            Details are estimates. Expand each group to see how taxes, fees, trade, incentives, and finance charges affect the total.
          </p>
          <Button as="a" href={getMarketplaceUrl(condition, selectedVehicle, selectedYear)} variant="primary" size="large" fullWidth className="aio-payment__marketplace">
            Shop {condition === 'new' ? 'New' : 'Used'} {selectedVehicle.model}
          </Button>
        </aside>
      </div>

      <aside className={`aio-payment__mobile-summary ${showMobileSummary ? 'aio-payment__mobile-summary--visible' : ''}`} aria-label="Compact payment estimate">
        <div>
	          <span>{startMode === 'price' ? showNoLoanPaymentState ? 'Trade equity covers loan' : monthlyInsuranceAmount > 0 ? 'Estimated monthly cost' : 'Estimated monthly payment' : isBudgetFirstVariant ? `Budget-supported ${canUseCatalogPrice ? 'MSRP' : 'price'}` : 'Selected car price'}</span>
	          <strong>{startMode === 'price' ? currentMonthlyCostDisplay : currency(isBudgetFirstVariant ? workingPrice : price)}</strong>
          <small>{currency(totalCost)} total after credits</small>
        </div>
        <Button as="a" href={getMarketplaceUrl(condition, selectedVehicle, selectedYear)} variant="primary" size="large" className="aio-payment__mobile-summary-cta">
          Shop {selectedVehicle.model}
        </Button>
      </aside>

      {showLightAffordableDealCards && (
      <section className="aio-payment__section aio-payment__vehicle-carousel-section" aria-labelledby="aio-payment-similar-heading">
        <div className="container">
          <div className="aio-payment__similar-heading">
            <span className="aio-payment__similar-line" aria-hidden="true" />
            <h2 id="aio-payment-similar-heading">Deals Your Budget Can Support</h2>
            <span className="aio-payment__similar-line" aria-hidden="true" />
          </div>
          <div className="aio-payment__vehicle-carousel-wrap">
            <button
              type="button"
              className="aio-payment__vehicle-carousel-nav aio-payment__vehicle-carousel-nav--left"
              aria-label="Previous affordable vehicles"
              onClick={() => scrollAffordableVehicles('previous')}
              disabled={!affordableCarouselState.canScrollPrevious}
            >
              <ChevronLeft size={24} aria-hidden="true" />
            </button>
            <div ref={affordableCarouselRef} className="aio-payment__vehicle-carousel aio-payment__vehicle-carousel--deals" role="list">
              {lightAffordableDealCards.map(({ vehicle, offers, primaryOffer, primaryIncentive }) => (
                <DealCard
                  key={vehicle.id}
                  slug={vehicle.slug}
                  vehicleName={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
                  vehicleImage={vehicle.image}
                  imageLoading="lazy"
                  vehicleSlug={vehicle.slug}
                  vehicleMake={vehicle.make}
                  vehicleModel={vehicle.model}
                  rating={vehicle.staffRating}
                  dealTypeTag={getLightDealTypeTag(primaryOffer.type)}
                  imageBadge={vehicle.bodyStyle}
                  editorsChoice={vehicle.editorsChoice}
                  tenBest={vehicle.tenBest}
                  isSaved={false}
                  onSaveClick={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                  }}
                  offers={offers}
                  offersPopupOpen={lightAffordableOffersSlug === vehicle.slug}
                  onToggleOffersPopup={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    setLightAffordableOffersSlug((current) => current === vehicle.slug ? null : vehicle.slug);
                  }}
                  onCloseOffersPopup={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    setLightAffordableOffersSlug(null);
                  }}
                  payment={getLightDealPayment(primaryOffer)}
                  details={[
                    { label: 'Est. payment', value: `${currency(getEstimatedMonthlyForVehiclePrice(vehicle.priceMin))}/mo` },
                    { label: 'Starts at', value: currency(vehicle.priceMin) },
                  ]}
                  onDealClick={(event) => {
                    event.preventDefault();
                    setLightDealModalVehicle(vehicle);
                    setSelectedIncentive(primaryIncentive);
                    setShowIncentiveModal(true);
                  }}
                />
              ))}
            </div>
            <button
              type="button"
              className="aio-payment__vehicle-carousel-nav aio-payment__vehicle-carousel-nav--right"
              aria-label="Next affordable vehicles"
              onClick={() => scrollAffordableVehicles('next')}
              disabled={!affordableCarouselState.canScrollNext}
            >
              <ChevronRight size={24} aria-hidden="true" />
            </button>
          </div>
        </div>
      </section>
      )}

      <TradeInEstimateModal
        isOpen={showTradeTool}
        initialVehicle={tradeVehicle}
        initialMileage={tradeMileage}
        initialCondition={tradeCondition}
        description="Add a few details and we will drop the estimate into your payment calculation. No account, no extra page."
        onClose={() => setShowTradeTool(false)}
        onApply={applyTradeToolEstimate}
      />

      <IncentivesModal
        isOpen={showIncentiveModal}
        onClose={() => {
          setShowIncentiveModal(false);
          setSelectedIncentive(null);
          setLightDealModalVehicle(null);
        }}
        variant="conversion-b"
        offer={incentiveOfferDetail}
        allIncentives={activeVehicleIncentives.incentives}
        selectedIncentiveId={selectedIncentive?.id}
        appliedIncentiveIds={[
          ...selectedCashIds,
          ...(selectedFinanceId === 'custom' ? [] : [selectedFinanceId]),
        ]}
        onApplyIncentive={(incentive) => {
          applyOfferToEstimate(incentive);
        }}
      />
    </div>
  );
};

export default AllInOnePaymentCalculatorPage;
