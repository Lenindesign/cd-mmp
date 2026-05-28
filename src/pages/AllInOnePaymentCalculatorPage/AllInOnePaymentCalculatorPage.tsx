import { type FocusEvent, type ReactNode, useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { AlertTriangle, ArrowLeft, ArrowRight, Check, ChevronDown, ChevronLeft, ChevronRight, ChevronUp, Info, Mail, RotateCcw, SkipForward } from 'lucide-react';
import { CarProfile, CreditCard as PhosphorCreditCard } from '@phosphor-icons/react';
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

const CAD_INFO_ICON_SRC = 'https://www.caranddriver.com/_assets/design-tokens/fre/static/icons/info-regular.348beca.svg?primary=%2523000';

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

interface LightTrimStyleOption {
  value: string;
  label: string;
  trimId: string;
  trimName: string;
  price: number;
}

interface LightVehicleDraft {
  year: string;
  make: string;
  model: string;
}

type LightWizardStepSlug = 'goal' | 'loan' | 'vehicle' | 'trade' | 'review';

const CUSTOM_RATE_TERMS = [12, 24, 36, 48, 60, 72, 84];
const USED_YEAR_OPTIONS = Array.from({ length: 10 }, (_, index) => String(2025 - index));
const LIGHT_AFFORDABLE_DEAL_CARD_LIMIT = 9;
const AREA_ESTIMATE_TOOLTIP_COPY = 'This is an estimation based on your area.';
const USED_PRICING_GUIDANCE_LEAD = 'Used car prices can vary widely due to factors like mileage, condition, and features.';
const USED_PRICING_GUIDANCE_COPY = 'Your selected vehicle will help personalize recommendations for your budget.';
const SHOW_LIGHT_ESTIMATE_EMAIL = true;
const SHOW_LIGHT_TRADE_ESTIMATE_CARD = false;
const SHOW_LIGHT_DEALER_FEE_NOTE = false;
const CD_SEAL_CHECK_ICON_URL = 'https://www.caranddriver.com/_assets/design-tokens/fre/static/icons/seal-check-regular.4dd562d.svg?primary=%25231D7A19';
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

const LIGHT_FINANCING_FAQS = [
  {
    question: 'How does interest rate impact your monthly payment?',
    answer: 'The interest rate directly affects how much you pay over the life of the loan. A lower rate means a lower monthly payment and less total interest paid. For example, on a $30,000 loan over 60 months, the difference between a 4% and 7% rate is roughly $45/month, or over $2,700 total.',
  },
  {
    question: 'How does your credit score impact your monthly payment?',
    answer: 'Your credit score is one of the biggest factors lenders use to determine your interest rate. Borrowers with excellent credit typically qualify for lower rates, while fair credit may see much higher rates. Improving your score before applying can save thousands over the loan term.',
  },
  {
    question: 'What is the usual loan term for an auto loan?',
    answer: 'The most common auto loan terms are 60 months and 72 months. Shorter terms usually mean higher monthly payments but less total interest. Longer terms lower the payment but increase total cost and the risk of owing more than the vehicle is worth.',
  },
  {
    question: 'How does a trade-in potentially impact your monthly payment?',
    answer: 'A trade-in reduces the amount you need to finance. If your trade-in is worth $5,000 on a $30,000 vehicle, you would only finance about $25,000 before taxes and fees, which can lower the monthly payment and may reduce taxable value in some states.',
  },
  {
    question: 'How do you calculate monthly car payments?',
    answer: 'Monthly payments are based on the loan amount, annual interest rate, and loan term. The calculator estimates the amount financed after down payment, trade equity, taxes, fees, and incentives, then applies the selected APR and term.',
  },
];

const currency = (value: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(Math.round(value));

const numberInput = (value: string) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
};

const currencyInput = (value: string) => {
  const parsed = Number(value.replace(/[^\d.]/g, ''));
  return Number.isFinite(parsed) ? parsed : 0;
};

const formatLightTradeSalesTaxPercent = (percent: number): string => {
  const rounded = Math.round(percent * 1000) / 1000;
  if (Math.abs(rounded - Math.round(rounded)) < 1e-6) return String(Math.round(rounded));
  return String(rounded);
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

const LIGHT_APR_SLIDER_MIN = 0;
const LIGHT_APR_SLIDER_MAX = 20;
const LIGHT_APR_SLIDER_STEP = 0.1;

const clampLightAprSlider = (value: number) => {
  const rounded = Math.round(value / LIGHT_APR_SLIDER_STEP) * LIGHT_APR_SLIDER_STEP;
  return Math.min(LIGHT_APR_SLIDER_MAX, Math.max(LIGHT_APR_SLIDER_MIN, rounded));
};

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

const getRegistrationDealerFeeGuidance = (stateFeeEstimate: number) => {
  if (stateFeeEstimate <= 500) {
    return {
      label: 'Low Fee States',
      range: '~$300-$500',
      copy: 'Registration and dealer fees in your state typically range from $300-$500, though final dealer charges and add-ons may vary.',
    };
  }

  if (stateFeeEstimate <= 900) {
    return {
      label: 'Medium Fee States',
      range: '~$600-$900',
      copy: 'Registration and dealer fees in your state typically range from $600-$900, depending on the dealer, vehicle, and local fees.',
    };
  }

  return {
    label: 'High Fee States',
    range: '~$1,000-$1,500',
    copy: 'Registration and dealer fees in your state are often higher and may range from $1,000-$1,500 depending on dealer charges and add-ons.',
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
  includeTaxesAndFeesInLoan: boolean;
}) => {
  if (targetMonthlyPayment <= 0 || termMonths <= 0) return 0;

  const tradeEquity = tradeInValue - amountOwed;
  const paymentForPrice = (candidatePrice: number) => {
    const taxableAmount = getTaxableAmount(candidatePrice, tradeInValue, rebate, taxRule);
    const salesTax = salesTaxOverride ?? taxableAmount * taxRate;
    const financedPrice = includeTaxesAndFeesInLoan ? candidatePrice + salesTax + fees : candidatePrice;
    const netAfterCredits = Math.max(0, financedPrice - tradeEquity - rebate);
    const amountFinanced = Math.max(0, netAfterCredits - downPayment);

    return monthlyPayment(amountFinanced, apr, termMonths);
  };

  let low = 0;
  let high = 200000;

  for (let step = 0; step < 32; step += 1) {
    const mid = (low + high) / 2;
    if (paymentForPrice(mid) <= targetMonthlyPayment) {
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

const getLightListingConditionLabel = (listing: Listing) => {
  if (listing.isCertified) return `Certified ${listing.year}`;
  return `${listing.isNew ? 'New' : 'Used'} ${listing.year}`;
};

function bodyStyleCatalogIcon(iconId: string): string {
  return DEFAULT_BODY_STYLES.find((b) => b.id === iconId)?.icon ?? '';
}

const normalizeVehicleMatch = (value: string) => value.toLowerCase().replace(/[^a-z0-9]/g, '');

/** Light wizard “Still shopping” grid — BodyStyleSelector line art; `EV` maps to electric vehicles in browse apply. */
const LIGHT_VEHICLE_BROWSE_GRID = [
  { key: 'sedan', label: 'Sedan', bodyStyle: 'Sedan', iconId: 'sedans' },
  { key: 'suv', label: 'SUV', bodyStyle: 'SUV', iconId: 'suvs' },
  { key: 'truck', label: 'Truck', bodyStyle: 'Truck', iconId: 'trucks' },
  { key: 'ev', label: 'EV', bodyStyle: 'EV', iconId: 'evs' },
  { key: 'wagon', label: 'Wagon', bodyStyle: 'Wagon', iconId: 'wagons' },
  { key: 'hatchback', label: 'Hatchback', bodyStyle: 'Hatchback', iconId: 'crossovers' },
] as const;

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
            Vehicle price budget
          </label>
          <div className="aio-payment__light-loan-guidance-tooltip">
            <button
              type="button"
              className="aio-payment__light-loan-guidance-trigger"
              aria-label="Vehicle price estimate guidance"
              aria-describedby={priceGuidanceId}
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
            <div id={priceGuidanceId} className="aio-payment__light-loan-guidance" role="tooltip">
              <p className="aio-payment__light-loan-guidance-header">
                <Info size={16} strokeWidth={2.25} aria-hidden="true" />
                <span>Vehicle price guidance</span>
              </p>
              <p className="aio-payment__light-loan-guidance-copy">
                <strong>No credit check required.</strong> Use the estimated purchase price before taxes and fees. The estimate updates as you adjust APR, term, trade, taxes, and fees.
              </p>
              <p className="aio-payment__light-loan-guidance-note">
                Estimated payment: {currency(estimatedMonthly)}/mo before dealer-specific changes.
              </p>
            </div>
          </div>
        </div>
      </div>
      <input
        id={inputId}
        type="text"
        inputMode="numeric"
        className="payment-calc__input aio-payment__light-estimator-input"
        value={currency(price)}
        aria-describedby={helperId}
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
          <div className="aio-payment__light-loan-guidance-tooltip">
            <button
              type="button"
              className="aio-payment__light-loan-guidance-trigger"
              aria-label="Monthly budget estimate guidance"
              aria-describedby={budgetGuidanceId}
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
            <div id={budgetGuidanceId} className="aio-payment__light-loan-guidance" role="tooltip">
              <p className="aio-payment__light-loan-guidance-header">
                <Info size={16} strokeWidth={2.25} aria-hidden="true" />
                <span>Monthly budget guidance</span>
              </p>
              <p className="aio-payment__light-loan-guidance-copy">
                <strong>No credit check required.</strong> Estimates include financing assumptions and update as you adjust price, APR, term, trade, taxes, and fees.
              </p>
              <p className="aio-payment__light-loan-guidance-note">
                Your {currency(targetMonthlyPayment)}/mo target currently supports about {currency(affordableMsrp)} before tax and fees.
              </p>
            </div>
          </div>
        </div>
      </div>
      <input
        id={inputId}
        type="text"
        inputMode="numeric"
        className="payment-calc__input aio-payment__light-estimator-input"
        value={currency(targetMonthlyPayment)}
        aria-describedby={helperId}
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
      'Know exactly what you want, or just have a body style in mind? Either works. You can also skip this and refine it later.',
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
    panelIntro: 'See estimated payments, total costs, and vehicles that fit your budget.',
  },
];

const LIGHT_WIZARD_STEP_ROUTE_BASE = '/auto-loan-calculator/light-steps';

const clampLightWizardStep = (step: number) => Math.min(LIGHT_WIZARD_STEP_META.length, Math.max(1, step));

const getLightWizardStepFromSlug = (stepSlug?: string) => {
  if (!stepSlug) return 1;
  const stepIndex = LIGHT_WIZARD_STEP_META.findIndex((stepMeta) => stepMeta.routeSlug === stepSlug);
  return stepIndex >= 0 ? stepIndex + 1 : 1;
};

const getLightWizardStepPath = (step: number) => {
  const stepMeta = LIGHT_WIZARD_STEP_META[clampLightWizardStep(step) - 1];
  return `${LIGHT_WIZARD_STEP_ROUTE_BASE}/${stepMeta.routeSlug}`;
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
  { label: 'Excellent credit', range: '4-6%' },
  { label: 'Good credit', range: '6-9%' },
  { label: 'Fair credit', range: '10-15%' },
  { label: 'Rebuilding credit', range: '15%+' },
];

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
}: LightLoanTermsStepPanelProps) {
  const downId = useId();
  const aprId = useId();
  const aprGuidanceId = useId();
  const downClamped = clampLightDownPayment(downPayment);
  const aprSliderValue = aprLocked ? activeApr : clampLightAprSlider(customApr);
  const loanTermWarning = getLightLoanTermWarning(loanTerm);

  return (
    <div className="payment-calc__section payment-calc__section--pad aio-payment__light-loan-step">
      <div className="payment-calc__field payment-calc__field--full">
        <div className="payment-calc__row-label">
          <label htmlFor={downId}>
            Down payment
          </label>
          <span aria-live="polite">
            {currency(downClamped)}
          </span>
        </div>
        <div className="aio-payment__light-money-input">
          <span className="aio-payment__light-money-input-prefix" aria-hidden="true">$</span>
          <input
            id={downId}
            type="number"
            className="payment-calc__input aio-payment__light-money-input-control"
            min={LIGHT_DOWN_PAYMENT_MIN}
            max={LIGHT_DOWN_PAYMENT_MAX}
            step={LIGHT_DOWN_PAYMENT_STEP}
            value={downPayment}
            onChange={(event) => onDownPaymentChange(clampLightDownPayment(numberInput(event.target.value)))}
            onBlur={(event) => onDownPaymentChange(clampLightDownPayment(numberInput(event.currentTarget.value)))}
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
            <div className="aio-payment__light-loan-guidance-tooltip">
              <button
                type="button"
                className="aio-payment__light-loan-guidance-trigger"
                aria-label="APR planning ranges"
                aria-describedby={aprGuidanceId}
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
              <div id={aprGuidanceId} className="aio-payment__light-loan-guidance" role="tooltip">
                <p className="aio-payment__light-loan-guidance-header">
                  <Info size={16} strokeWidth={2.25} aria-hidden="true" />
                  <span>APR planning ranges</span>
                </p>
                <dl className="aio-payment__light-loan-guidance-list">
                  {LIGHT_APR_GUIDANCE_TIERS.map((tier) => (
                    <div key={tier.label}>
                      <dt>{tier.label}</dt>
                      <dd>{tier.range}</dd>
                    </div>
                  ))}
                </dl>
                <p className="aio-payment__light-loan-guidance-note">
                  Planning ranges only. Use a lender quote or pre-qualification when you have one.
                </p>
              </div>
            </div>
          </div>
          <span aria-live="polite">
            {activeApr.toFixed(2)}%
          </span>
        </div>
        {!aprLocked ? (
          <>
            <div className="aio-payment__light-percent-input">
              <input
                id={aprId}
                type="number"
                className="payment-calc__input aio-payment__light-percent-input-control"
                min={LIGHT_APR_SLIDER_MIN}
                max={LIGHT_APR_SLIDER_MAX}
                step={LIGHT_APR_SLIDER_STEP}
                value={customApr}
                onChange={(event) => onCustomAprChange(clampLightAprSlider(numberInput(event.target.value)))}
                onBlur={(event) => onCustomAprChange(clampLightAprSlider(numberInput(event.currentTarget.value)))}
              />
              <span className="aio-payment__light-percent-input-suffix" aria-hidden="true">%</span>
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
      </div>

      <div className="payment-calc__field payment-calc__field--full">
        <p className="payment-calc__lab" id={`${downId}-terms`}>
          Loan term
        </p>
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
  variant?: 'classic' | 'budget-first' | 'light' | 'light-steps';
}

const AllInOnePaymentCalculatorPage = ({ variant = 'classic' }: AllInOnePaymentCalculatorPageProps) => {
  const isBudgetFirstVariant = variant === 'budget-first';
  const isLightStepsVariant = variant === 'light-steps';
  const isLightVariant = variant === 'light' || isLightStepsVariant;
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
  const [price, setPrice] = useState(defaultVehicle.priceMin);
  const [selectedTrimId, setSelectedTrimId] = useState<string | null>(null);
  const [targetMonthlyPayment, setTargetMonthlyPayment] = useState(550);
  const [downPayment, setDownPayment] = useState(4000);
  const [tradeInValue, setTradeInValue] = useState(0);
  const [amountOwed, setAmountOwed] = useState(0);
  const [selectedCashIds, setSelectedCashIds] = useState<string[]>([]);
  const [selectedFinanceId, setSelectedFinanceId] = useState('custom');
  const [customApr, setCustomApr] = useState(6.9);
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
  const [feesOverride, setFeesOverride] = useState('');
  const [dealerFeesOverride, setDealerFeesOverride] = useState('');
  const [estimatedFeesOverride, setEstimatedFeesOverride] = useState('');
  const [includeTaxesAndFeesInLoan, setIncludeTaxesAndFeesInLoan] = useState(true);
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
  const affordableCarouselRef = useRef<HTMLDivElement>(null);
  const shoppingToolsRef = useRef<HTMLDivElement>(null);
  const lightAffordableSectionRef = useRef<HTMLElement>(null);
  const lightWizardShellRef = useRef<HTMLDivElement>(null);
  const lightWizardPanelRef = useRef<HTMLDivElement>(null);
  const [affordableCarouselState, setAffordableCarouselState] = useState({ canScrollPrevious: false, canScrollNext: false });
  const [showMobileSummary, setShowMobileSummary] = useState(false);
  const [lightWizardStepMotion, setLightWizardStepMotion] = useState<LightWizardStepMotion>('none');
  const lightWizardStep = routeLightWizardStep;
  const lightWizardStepPrevRef = useRef(lightWizardStep);
  const lightWizardPathPrevRef = useRef(location.pathname);
  const lightVehicleBodyStyleHeadingId = useId();
  const lightBreakdownLabelId = useId();
  const lightBreakdownGuidanceId = useId();
  const lightEstimateTotalsId = useId();
  const [lightEstimateEmail, setLightEstimateEmail] = useState('');
  const [lightEstimateEmailError, setLightEstimateEmailError] = useState<string | undefined>();
  const [lightEstimateEmailStatus, setLightEstimateEmailStatus] = useState<string | undefined>();
  const [lightVehicleStepMode, setLightVehicleStepMode] = useState<'known' | 'browsing'>('known');
  const [lightKnownVehicleSelected, setLightKnownVehicleSelected] = useState(() => !isLightVariant);
  const [lightVehicleDraft, setLightVehicleDraft] = useState<LightVehicleDraft>(() => ({
    year: isLightVariant ? '' : defaultVehicle.year,
    make: isLightVariant ? '' : defaultVehicle.make,
    model: isLightVariant ? '' : defaultVehicle.model,
  }));
  const [lightBrowseBodyStyle, setLightBrowseBodyStyle] = useState('SUV');
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
  const handlePriceChange = useCallback((nextPrice: number) => {
    setPrice(nextPrice);
  }, []);
  const selectInputValueOnFocus = useCallback((event: FocusEvent<HTMLInputElement>) => {
    event.currentTarget.select();
  }, []);
  const handleStateCodeChange = useCallback((nextStateCode: string) => {
    hasAdjustedStateCodeRef.current = true;
    setStateCode(nextStateCode);
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

    const nextPath = getLightWizardStepPath(nextStep);
    if (location.pathname === nextPath) return;

    navigate(
      {
        pathname: nextPath,
        search: location.search,
        hash: location.hash,
      },
      { replace: options?.replace ?? false },
    );
  }, [isLightStepsVariant, lightWizardStep, location.hash, location.pathname, location.search, navigate]);

  useEffect(() => {
    if (!isLightStepsVariant) return;

    const routeStep = getLightWizardStepFromSlug(stepSlug);
    if (!stepSlug) return;

    const expectedPath = getLightWizardStepPath(routeStep);
    if (location.pathname === expectedPath) return;

    navigate(
      {
        pathname: expectedPath,
        search: location.search,
        hash: location.hash,
      },
      { replace: true },
    );
  }, [isLightStepsVariant, location.hash, location.pathname, location.search, navigate, stepSlug]);

  const selectedVehicle = useMemo(
    () => vehicles.find((vehicle) => vehicle.slug === selectedSlug) ?? defaultVehicle,
    [defaultVehicle, selectedSlug, vehicles],
  );
  const selectedVehiclePageHref = `/${selectedVehicle.slug}`;
  const lightVehicleYearValue = lightKnownVehicleSelected ? selectedYear : lightVehicleDraft.year;
  const lightVehicleMakeValue = lightKnownVehicleSelected ? selectedVehicle.make : lightVehicleDraft.make;
  const lightVehicleModelValue = lightKnownVehicleSelected ? selectedVehicle.model : lightVehicleDraft.model;
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
  const selectedVehicleStyle = selectedTrimStyleOption?.trimName || selectedVehicle.trim || selectedVehicle.drivetrain || selectedVehicle.bodyStyle;
  const selectedVehicleLabel = lightHasVehicleSelection
    ? `${selectedYear} ${selectedVehicle.make} ${selectedVehicle.model}${selectedTrimStyleOption ? ` ${selectedTrimStyleOption.trimName}` : ''}`
    : 'No vehicle selected';

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
    () => condition === 'new' && lightHasVehicleSelection
      ? getVehicleIncentives(selectedVehicle.make, selectedVehicle.model)
      : { make: selectedVehicle.make, model: selectedVehicle.model, totalSavings: 0, incentives: [] },
    [condition, lightHasVehicleSelection, selectedVehicle.make, selectedVehicle.model],
  );
  const activeVehicleIncentives = lightDealModalVehicle
    ? getVehicleIncentives(lightDealModalVehicle.make, lightDealModalVehicle.model)
    : vehicleIncentives;
  const incentives = vehicleIncentives.incentives;
  const cashIncentives = useMemo(() => incentives.filter((incentive) => incentive.type === 'cash'), [incentives]);
  const financeIncentives = useMemo(() => incentives.filter((incentive) => incentive.type === 'finance'), [incentives]);
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
  const registrationFees = feesOverride ? numberInput(feesOverride) : stateRule.titleRegistrationFees;
  const dealerFees = dealerFeesOverride ? numberInput(dealerFeesOverride) : stateRule.dealerFeesEstimate;
  const defaultEstimatedRegistrationDealerFees = registrationFees + dealerFees;
  const registrationDealerFeeGuidance = getRegistrationDealerFeeGuidance(defaultEstimatedRegistrationDealerFees);
  const fees = estimatedFeesOverride ? numberInput(estimatedFeesOverride) : defaultEstimatedRegistrationDealerFees;
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
    taxRate: stateRule.rate,
    salesTaxOverride: salesTaxOverride ? numberInput(salesTaxOverride) : undefined,
    fees,
    includeTaxesAndFeesInLoan,
  });
  const budgetVehiclePrice = (isBudgetFirstVariant || isLightVariant) && startMode === 'monthly' ? affordableMsrp : price;
  const usesSelectedCatalogPriceForEstimate = isLightVariant && lightHasSpecificVehicleSelection && canUseCatalogPrice;
  const workingPrice = usesSelectedCatalogPriceForEstimate ? selectedCatalogPrice : budgetVehiclePrice;
  const workingPriceDescriptor = usesSelectedCatalogPriceForEstimate ? 'selected vehicle price' : 'target vehicle price';
  const workingPriceBreakdownLabel = usesSelectedCatalogPriceForEstimate ? 'Selected Vehicle Price' : 'Target Vehicle Price';
  const workingPriceFormulaLabel = usesSelectedCatalogPriceForEstimate ? 'selected vehicle price' : 'target price';
  const taxableAmount = getTaxableAmount(workingPrice, tradeInValue, rebateTotal, stateRule.taxRule);
  const calculatedSalesTax = taxableAmount * stateRule.rate;
  const salesTax = salesTaxOverride ? numberInput(salesTaxOverride) : calculatedSalesTax;
  const lightTradeSalesTaxPercent = (() => {
    const taxDollars = salesTaxOverride ? numberInput(salesTaxOverride) : calculatedSalesTax;
    if (taxableAmount <= 0) return stateRule.rate * 100;
    return (taxDollars / taxableAmount) * 100;
  })();
  const taxesAndFees = salesTax + fees;
  const tradeCanReduceTaxableAmount = stateRule.taxRule === 'after-trade' || stateRule.taxRule === 'after-trade-and-rebate';
  const estimatedTradeTaxSavings = tradeCanReduceTaxableAmount ? tradeInValue * stateRule.rate : 0;
  const outTheDoorPrice = workingPrice + salesTax + fees;
  const netVehiclePriceAfterTradeAndOffers = Math.max(0, workingPrice - tradeEquity - rebateTotal);
  const financedPurchasePrice = includeTaxesAndFeesInLoan ? outTheDoorPrice : workingPrice;
  const netPriceAfterTradeAndOffers = Math.max(0, financedPurchasePrice - tradeEquity - rebateTotal);
  const totalLoanAmount = Math.max(0, netPriceAfterTradeAndOffers - downPayment);
  const estimatedMonthly = monthlyPayment(totalLoanAmount, activeApr, loanTerm);
  const totalLoanPayments = estimatedMonthly * loanTerm;
  const totalLoanInterest = Math.max(0, totalLoanPayments - totalLoanAmount);
  const totalCost = netVehiclePriceAfterTradeAndOffers + taxesAndFees + totalLoanInterest;
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
    const nextSalesTax = salesTaxOverride ? numberInput(salesTaxOverride) : nextTaxableAmount * stateRule.rate;
    const nextFinancedPurchasePrice = includeTaxesAndFeesInLoan ? workingPrice + nextSalesTax + fees : workingPrice;
    const nextNetPrice = Math.max(0, nextFinancedPurchasePrice - tradeEquity - rebate);
    const nextLoanAmount = Math.max(0, nextNetPrice - downPayment);
    const nextMonthly = monthlyPayment(nextLoanAmount, apr, term);
    const nextLoanPayments = nextMonthly * term;

    return {
      loanAmount: nextLoanAmount,
      monthly: nextMonthly,
      loanPayments: nextLoanPayments,
      interest: Math.max(0, nextLoanPayments - nextLoanAmount),
    };
  };
  const amountFinancedFormulaParts = [
    { label: `${currency(workingPrice)} ${workingPriceFormulaLabel}` },
    includeTaxesAndFeesInLoan && taxesAndFees > 0 ? { sign: '+', label: `${currency(taxesAndFees)} taxes & fees` } : null,
    tradeEquity > 0 ? { sign: '-', label: `${currency(tradeEquity)} trade equity` } : null,
    tradeEquity < 0 ? { sign: '+', label: `${currency(Math.abs(tradeEquity))} trade payoff` } : null,
    rebateTotal > 0 ? { sign: '-', label: `${currency(rebateTotal)} incentives` } : null,
    downPayment > 0 ? { sign: '-', label: `${currency(Math.min(downPayment, netPriceAfterTradeAndOffers))} down` } : null,
    { sign: '=', label: `${currency(totalLoanAmount)} financed` },
  ].filter((part): part is { sign?: string; label: string } => Boolean(part));
  const financedCashDue = Math.min(downPayment, netPriceAfterTradeAndOffers);
  const upfrontCashDue = Math.min(downPayment, netVehiclePriceAfterTradeAndOffers) + taxesAndFees;
  const cashDueAtSigning = includeTaxesAndFeesInLoan ? financedCashDue : upfrontCashDue;
  const totalPaidFromPocket = cashDueAtSigning + totalLoanPayments;
  const paymentCreditSources = [
    downPayment > 0 ? 'down payment' : '',
    tradeEquity > 0 ? 'trade equity' : '',
    rebateTotal > 0 ? 'incentives' : '',
  ].filter(Boolean);
  const paymentCreditTotal = downPayment + Math.max(0, tradeEquity) + rebateTotal;
  const renderLightBreakdownValue = (value: number, operation?: 'add' | 'subtract') => {
    if (!operation) return currency(value);

    return (
      <span className={`aio-payment__light-breakdown-signed-value aio-payment__light-breakdown-signed-value--${operation}`}>
        <span className="aio-payment__light-breakdown-sign">{operation === 'add' ? '+' : '-'}</span>
        {currency(value)}
      </span>
    );
  };
  const showTradePayoffBreakdown = amountOwed > 0;
  const tradeEquityBreakdownLabel = tradeEquity < 0 ? 'Trade Balance' : 'Net Trade Equity';
  const renderTradeEquityBreakdownValue = () => {
    if (tradeEquity > 0) return renderLightBreakdownValue(tradeEquity, 'subtract');
    if (tradeEquity < 0) return renderLightBreakdownValue(Math.abs(tradeEquity), 'add');
    return renderLightBreakdownValue(0);
  };
  const formatTradeEquitySummaryValue = () => {
    if (tradeEquity > 0) return `-${currency(tradeEquity)}`;
    if (tradeEquity < 0) return `+${currency(Math.abs(tradeEquity))}`;
    return currency(0);
  };
  const paymentDelta = estimatedMonthly - targetMonthlyPayment;
  const selectedVehicleTaxableAmount = getTaxableAmount(selectedCatalogPrice, tradeInValue, rebateTotal, stateRule.taxRule);
  const selectedVehicleSalesTax = salesTaxOverride ? numberInput(salesTaxOverride) : selectedVehicleTaxableAmount * stateRule.rate;
  const selectedVehicleFinancedPrice = includeTaxesAndFeesInLoan ? selectedCatalogPrice + selectedVehicleSalesTax + fees : selectedCatalogPrice;
  const selectedVehicleNetPrice = Math.max(0, selectedVehicleFinancedPrice - tradeEquity - rebateTotal);
  const selectedVehicleLoanAmount = Math.max(0, selectedVehicleNetPrice - downPayment);
  const selectedVehicleMonthly = monthlyPayment(selectedVehicleLoanAmount, activeApr, loanTerm);
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
    ? `${selectedVehicle.model} starts around ${currency(selectedCatalogPrice)}. Your budget supports about ${currency(affordableMsrp)} before tax and fees. Try a lower trim, more cash down, a longer term, or vehicles below that range.`
    : budgetFitStatus === 'under'
      ? `${selectedVehicle.model} starts around ${currency(selectedCatalogPrice)} and estimates near ${currency(selectedVehicleMonthly)}/mo with these assumptions.`
      : `${selectedVehicle.model} estimates near ${currency(selectedVehicleMonthly)}/mo with your selected down payment, term, taxes, and fees.`;
  const usedBudgetFitStatus: BudgetFitStatus = 'neutral';
  const usedBudgetFitLabel = 'Listing price needed';
  const usedBudgetFitHeadline = startMode === 'monthly'
    ? `Compare listings against about ${currency(affordableMsrp)}`
    : 'Use the listing price for this estimate';
  const usedBudgetFitCopy = startMode === 'monthly'
    ? `Your budget supports about ${currency(affordableMsrp)} before tax and fees. Used-car prices vary by listing, so compare real prices or written quotes against that target.`
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
      ? `Try a lower price, more cash down, a longer term, or vehicles under about ${currency(affordableMsrp)} before tax and fees.`
      : estimateBudgetFitStatus === 'under'
        ? `This estimate leaves room in your monthly budget with the current price, down payment, APR, and term.`
        : 'This estimate is within about $10/mo of your budget with the current assumptions.'
    : estimateBudgetFitStatus === 'over'
      ? `This estimate uses the current listing-price input. Try a lower listing price, more cash down, a longer term, or a written quote under about ${currency(affordableMsrp)} before tax and fees.`
      : estimateBudgetFitStatus === 'under'
      ? 'This estimate uses the current listing-price input and leaves room in your monthly budget. Replace it with the exact listing price or written quote before shopping.'
      : 'This estimate uses the current listing-price input and is within about $10/mo of your budget. Confirm it against the exact listing price or written quote.';
  const priceBudgetDelta = selectedCatalogPrice - price;
  const priceBudgetFitStatus: BudgetFitStatus = priceBudgetDelta > 10 ? 'over' : priceBudgetDelta < -10 ? 'under' : 'fit';
  const priceBudgetFitLabel = priceBudgetFitStatus === 'over'
    ? 'Above budget'
    : priceBudgetFitStatus === 'under'
      ? 'Below budget'
      : 'On budget';
  const priceBudgetFitHeadline = priceBudgetFitStatus === 'over'
    ? `About ${currency(priceBudgetDelta)} over your ${currency(price)} budget`
    : priceBudgetFitStatus === 'under'
      ? `About ${currency(Math.abs(priceBudgetDelta))} below your ${currency(price)} budget`
      : `Close to your ${currency(price)} budget`;
  const priceBudgetFitCopy = priceBudgetFitStatus === 'over'
    ? `${selectedVehicle.model} starts around ${currency(selectedCatalogPrice)} before tax and fees. Try a lower trim, more cash down, or vehicles below your target price.`
    : priceBudgetFitStatus === 'under'
      ? `${selectedVehicle.model} starts around ${currency(selectedCatalogPrice)} before tax and fees. Your estimate uses the selected trim price while your target budget stays fixed.`
      : `${selectedVehicle.model} starts around ${currency(selectedCatalogPrice)} before tax and fees, which is close to your target price.`;
  const visibleBudgetFitStatus = !canUseCatalogPrice && lightHasVehicleSelection ? usedBudgetFitStatus : lightHasVehicleSelection ? budgetFitStatus : 'fit';
  const visibleBudgetFitLabel = !canUseCatalogPrice && lightHasVehicleSelection ? usedBudgetFitLabel : lightHasVehicleSelection ? budgetFitLabel : 'Pick a vehicle';
  const visibleBudgetFitHeadline = !canUseCatalogPrice && lightHasVehicleSelection ? usedBudgetFitHeadline : lightHasVehicleSelection ? budgetFitHeadline : 'Choose a vehicle to compare';
  const visibleBudgetFitCopy = lightHasVehicleSelection
    ? canUseCatalogPrice ? budgetFitCopy : usedBudgetFitCopy
    : `Your budget supports about ${currency(affordableMsrp)} before tax and fees. Choose a vehicle or browse by body style to compare it with your target.`;
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
  const showSummaryBudgetFit = !isLightStepsVariant || (lightWizardStep > 1 && lightHasSpecificVehicleSelection);

  const getEstimatedMonthlyForVehiclePrice = (vehiclePrice: number) => {
    const vehicleTaxableAmount = getTaxableAmount(vehiclePrice, tradeInValue, rebateTotal, stateRule.taxRule);
    const vehicleSalesTax = salesTaxOverride ? numberInput(salesTaxOverride) : vehicleTaxableAmount * stateRule.rate;
    const vehicleFinancedPrice = includeTaxesAndFeesInLoan ? vehiclePrice + vehicleSalesTax + fees : vehiclePrice;
    const vehicleNetPrice = Math.max(0, vehicleFinancedPrice - tradeEquity - rebateTotal);
    const vehicleLoanAmount = Math.max(0, vehicleNetPrice - downPayment);

    return monthlyPayment(vehicleLoanAmount, activeApr, loanTerm);
  };
  const schedule = buildAnnualSchedule(totalLoanAmount, activeApr, loanTerm, estimatedMonthly);
  const lightAffordableBudgetCeiling = startMode === 'monthly' ? affordableMsrp : Math.max(0, price);
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
  const lightELotListings = useMemo<LightELotListing[]>(() => {
    const listings = getListingsNearYou({
      make: selectedVehicle.make,
      model: selectedVehicle.model,
      bodyStyle: selectedVehicle.bodyStyle,
      location: lightELotLocation,
    });
    const preferredListings = listings.filter((listing) => (
      listing.make === selectedVehicle.make &&
      listing.model === selectedVehicle.model
    ));
    const sortedListings = [
      ...preferredListings.filter((listing) => !listing.isNew),
      ...preferredListings.filter((listing) => listing.isNew),
    ];
    const uniqueListings = sortedListings.filter((listing, index, allListings) => (
      allListings.findIndex((item) => item.id === listing.id) === index
    ));

    return uniqueListings.slice(0, 8).map((listing) => ({
      ...listing,
      priceBadge: listing.price <= lightAffordableBudgetCeiling ? 'Great Price' : 'Good Price',
    }));
  }, [
    lightAffordableBudgetCeiling,
    lightELotLocation,
    selectedVehicle.bodyStyle,
    selectedVehicle.make,
    selectedVehicle.model,
  ]);
  const showLightAffordableDealCards = canUseCatalogPrice && lightAffordableDealCards.length > 0;
  const showLightELotSection =
    isLightStepsVariant &&
    lightWizardStep === 5 &&
    lightELotListings.length > 0;
  const lightELotAllResultsHref = getMarketplaceUrl('used', selectedVehicle, selectedYear);
  const lightELotSearchLabel = `used ${selectedYear} ${selectedVehicle.make} ${selectedVehicle.model}`;
  const shouldScrollToBudgetVehicles =
    showLightAffordableDealCards &&
    (!lightHasVehicleSelection || (startMode === 'monthly' && budgetFitStatus === 'over'));
  const lightShopHref = shouldScrollToBudgetVehicles
    ? '#aio-payment-light-affordable-heading'
    : getMarketplaceUrl(condition, selectedVehicle, selectedYear);
  const lightShopLabel = shouldScrollToBudgetVehicles
    ? 'See cars in your budget'
    : `Shop ${condition === 'new' ? 'new' : 'used'} ${selectedVehicle.model}`;
  const showLightReviewVehicleShopCta =
    isLightStepsVariant &&
    lightWizardStep === 5 &&
    lightHasSpecificVehicleSelection &&
    Boolean(selectedVehicle.make?.trim() && selectedVehicle.model?.trim());
  const lightReviewVehicleShopHref = getMarketplaceUrl(condition, selectedVehicle, selectedYear);
  const lightReviewVehicleShopLabel = `Shop ${selectedVehicle.make} ${selectedVehicle.model}`;
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
        const financePrincipal = Math.max(0, workingPrice + salesTax + fees - downPayment - tradeEquity);
        const cashPrincipal = Math.max(0, financePrincipal - cashBack);
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
          Focus first on {hasAvailableBuyingIncentives ? 'eligible incentives and ' : ''}a vehicle price near <strong>{currency(affordableMsrp)}</strong> before tax and fees.
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
  const aiTargetSalesTax = salesTaxOverride ? numberInput(salesTaxOverride) : aiTargetTaxableAmount * stateRule.rate;
  const aiTargetOutTheDoor = aiTargetPrice + aiTargetSalesTax + fees;
  const aiTargetFinancedPrice = includeTaxesAndFeesInLoan ? aiTargetOutTheDoor : aiTargetPrice;
  const aiTargetNetPrice = Math.max(0, aiTargetFinancedPrice - tradeEquity - rebateTotal);
  const aiTargetLoanAmount = Math.max(0, aiTargetNetPrice - downPayment);
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

    if (!lightHasVehicleSelection) {
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
    activeApr > 8 ? `${activeApr.toFixed(1)}% APR is high enough to shop a bank or credit union quote before the dealer visit.` : '',
    fees > 900 ? `${currency(fees)} in title, registration, dealer, and other fees deserves an itemized quote.` : '',
    canUseCatalogPrice && lightHasVehicleSelection && negotiatedDiscount < selectedCatalogPrice * 0.02 ? 'The current price is close to MSRP. Ask for a real selling-price discount before discussing payment.' : '',
    ...aiIncentiveChecks,
  ].filter(Boolean);
  const aiMonthlyWalkAway = Math.max(0, Math.min(estimatedMonthly, targetMonthlyPayment || estimatedMonthly) - 25);
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
      value: `${aiAprTarget.toFixed(1)}% target`,
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

  const handleSendLightEstimateEmail = () => {
    const trimmed = lightEstimateEmail.trim();
    if (!trimmed) {
      setLightEstimateEmailError('Enter an email address.');
      setLightEstimateEmailStatus(undefined);
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setLightEstimateEmailError('Enter a valid email address.');
      setLightEstimateEmailStatus(undefined);
      return;
    }
    setLightEstimateEmailError(undefined);
    setLightEstimateEmailStatus(`Estimate email signed up for ${trimmed}.`);
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
    setLightVehicleDraft({
      year: nextYear,
      make: vehicle.make,
      model: vehicle.model,
    });
    setSelectedTrimId(null);
    if (options?.syncCatalogPrice ?? true) {
      syncCatalogPrice(vehicle.priceMin);
    }
    setSelectedCashIds([]);
    setSelectedFinanceId('custom');
    setLoanTerm(60);
  }, [syncCatalogPrice]);

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
    setLightVehicleStepMode('known');
    setLightKnownVehicleSelected(false);
    setLightVehicleDraft({ year: '', make: '', model: '' });
    setLightAffordableOffersSlug(null);
    setLightDealModalVehicle(null);
    setSelectedCashIds([]);
    setSelectedFinanceId('custom');
  };

  const handleVehicleConditionChange = (nextCondition: VehicleCondition) => {
    setCondition(nextCondition);
    setSelectedCashIds([]);
    setSelectedFinanceId('custom');

    if (nextCondition === 'used' && !USED_YEAR_OPTIONS.includes(selectedYear)) {
      const nextYear = USED_YEAR_OPTIONS[0];
      setSelectedYear(nextYear);
      setLightVehicleDraft((current) => ({
        ...current,
        year: nextYear,
      }));
    }

    if (nextCondition === 'new') {
      setSelectedYear(selectedVehicle.year);
      setLightVehicleDraft((current) => ({
        year: lightKnownVehicleSelected ? selectedVehicle.year : current.year,
        make: lightKnownVehicleSelected ? selectedVehicle.make : current.make,
        model: lightKnownVehicleSelected ? selectedVehicle.model : current.model,
      }));
    }
  };

  const handleLightTradeSalesTaxPercentChange = (raw: string) => {
    if (raw.trim() === '') {
      setSalesTaxOverride('');
      return;
    }
    if (taxableAmount <= 0) return;
    const pct = numberInput(raw);
    const dollars = Math.round(taxableAmount * (pct / 100));
    setSalesTaxOverride(String(dollars));
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

  const scrollShoppingTools = (direction: 'previous' | 'next') => {
    const carousel = shoppingToolsRef.current;
    if (!carousel) return;

    carousel.scrollBy({
      left: direction === 'next' ? carousel.clientWidth * 0.9 : -carousel.clientWidth * 0.9,
      behavior: getPreferredScrollBehavior(),
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

  if (isLightVariant) {
    const lightWizardStepMeta = LIGHT_WIZARD_STEP_META[lightWizardStep - 1];
    const lightWizardStepMotionAttribute = isLightStepsVariant && lightWizardStepMotion !== 'none'
      ? lightWizardStepMotion
      : undefined;
    const lightLoanTermChips = [...new Set(termOptions)].sort((a, b) => a - b);
    const lightHeroHeadline = toTitleCase(
      isLightStepsVariant
        ? 'See what your monthly budget can really buy.'
        : 'Fine-tune your car payment estimate.',
    );
    return (
      <div className={`aio-payment aio-payment--light${isLightStepsVariant ? ' aio-payment--light-steps' : ''}${isLightStepsVariant && lightWizardStep === 5 ? ' aio-payment--light-review-step' : ''}${isLightStepsVariant && showLightMobileTotals ? ' aio-payment--light-mobile-totals-open' : ''}`}>
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
              </div>
            </div>
          </div>
        </section>

        <section className="aio-payment__light-main" aria-labelledby="aio-payment-light-heading">
          <div className="container">
            <div className="aio-payment__light-shell" ref={isLightStepsVariant ? lightWizardShellRef : undefined}>
              {isLightStepsVariant ? (
                <div className="aio-payment__light-wizard-strip" data-step-motion={lightWizardStepMotionAttribute}>
                  <nav className="aio-payment__light-wizard-track" aria-label="Estimate steps">
                    <div className="aio-payment__light-wizard-steps-shell">
                      <ol className="aio-payment__light-wizard-steps">
                        {LIGHT_WIZARD_STEP_META.map((stepMeta, index) => {
                          const stepNumber = index + 1;
                          const isDone = lightWizardStep > stepNumber;
                          const isCurrent = lightWizardStep === stepNumber;
                          return (
                            <li key={stepMeta.label} className="aio-payment__light-wizard-step">
                              <button
                                type="button"
                                className={`aio-payment__light-wizard-dot${isCurrent ? ' aio-payment__light-wizard-dot--current' : ''}${isDone ? ' aio-payment__light-wizard-dot--done' : ''}`}
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
                    onDownPaymentChange={setDownPayment}
                    activeApr={activeApr}
                    customApr={customApr}
                    onCustomAprChange={setCustomApr}
                    aprLocked={selectedFinanceId !== 'custom'}
                    loanTerm={loanTerm}
                    onLoanTermChange={setLoanTerm}
                    termChipOptions={lightLoanTermChips}
                  />
                )}
                {!isLightStepsVariant && (
                <details className="aio-payment__light-disclosure" open={undefined}>
                  <summary>
                    <span>Loan terms</span>
                    <strong>{currency(downPayment)} down · {loanTerm} months · {activeApr.toFixed(1)}% APR</strong>
                  </summary>
                  <div className="aio-payment__light-grid">
                    <TextField
                      label="Down payment"
                      type="number"
                      value={downPayment}
                      min={0}
                      step={500}
                      iconLeft={MONEY_INPUT_PREFIX}
                      onChange={(event) => setDownPayment(numberInput(event.target.value))}
                    />
                    <TextField
                      label="Interest rate"
                      type="number"
                      value={activeApr}
                      min={0}
                      step={0.1}
                      disabled={selectedFinanceId !== 'custom'}
                      iconRight={PERCENT_INPUT_SUFFIX}
                      onChange={(event) => setCustomApr(numberInput(event.target.value))}
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
                        onClick={() => setLightVehicleStepMode('known')}
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
                        onClick={() => {
                          setLightVehicleStepMode('browsing');
                        }}
                      >
                        <span className="aio-payment__light-vehicle-step__path-icon aio-payment__light-vehicle-step__path-icon--profile" aria-hidden>
                          <CarProfile size={22} weight="regular" />
                        </span>
                        <span className="aio-payment__light-vehicle-step__path-title">I Have a Preferred Body Style</span>
                        <span className="aio-payment__light-vehicle-step__path-copy">
                          Discover vehicles that match your shopping intent.
                        </span>
                      </button>
                    </div>
                    <div className="aio-payment__light-vehicle-step__nu">
                      <p className="aio-payment__light-vehicle-step__nu-label">New or used</p>
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
                        <div className="aio-payment__light-vehicle-step__ymm-row">
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
                        </div>
                        <Select
                          label="Trim / style"
                          value={lightKnownVehicleSelected ? selectedTrimStyleOption?.value ?? '' : ''}
                          wrapperClassName="aio-payment__light-field--wide"
                          onChange={(event) => handleTrimStyleChange(event.target.value)}
                          placeholder="Select trim or style"
                          options={availableTrimStyleOptions.map((option) => ({
                            value: option.value,
                            label: option.label,
                          }))}
                        />
                      </div>
                    ) : (
                      <div className="aio-payment__light-vehicle-step__browse">
                        <p className="aio-payment__light-vehicle-step__body-style-label" id={lightVehicleBodyStyleHeadingId}>
                          Body style
                        </p>
                        <div
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
                                onClick={() => {
                                  setLightBrowseBodyStyle(tile.bodyStyle);
                                }}
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
                      </div>
                    )}
                    {lightVehicleStepMode === 'known' && (
                      <div className={canUseCatalogPrice ? 'aio-payment__light-vehicle-step__price-bar' : 'aio-payment__light-vehicle-step__price-bar aio-payment__light-vehicle-step__price-bar--guidance'}>
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
                      </div>
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
                            type="number"
                            value={tradeInValue}
                            min={0}
                            step={500}
                            iconLeft={MONEY_INPUT_PREFIX}
                            onFocus={selectInputValueOnFocus}
                            onChange={(event) => setTradeInValue(numberInput(event.target.value))}
                          />
                          <button type="button" className="aio-payment__light-inline-action" onClick={() => setShowTradeTool(true)}>
                            Estimate trade-in value
                          </button>
                        </div>
                        <TextField
                          label="Amount owed on trade"
                          type="number"
                          value={amountOwed}
                          min={0}
                          step={500}
                          iconLeft={MONEY_INPUT_PREFIX}
                          onFocus={selectInputValueOnFocus}
                          onChange={(event) => setAmountOwed(numberInput(event.target.value))}
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
                        <Select
                          label="Your state"
                          value={stateCode}
                          onChange={(event) => handleStateCodeChange(event.target.value)}
                          options={stateRules.map((state) => ({ value: state.code, label: state.name }))}
                        />
                        <TextField
                          label="Sales tax (%)"
                          type="number"
                          value={formatLightTradeSalesTaxPercent(lightTradeSalesTaxPercent)}
                          min={0}
                          step={0.001}
                          iconRight={PERCENT_INPUT_SUFFIX}
                          onChange={(event) => handleLightTradeSalesTaxPercentChange(event.target.value)}
                        />
                        <TextField
                          label="Estimated Registration & Dealer Fees"
                          type="number"
                          value={estimatedFeesOverride || defaultEstimatedRegistrationDealerFees}
                          min={0}
                          iconLeft={MONEY_INPUT_PREFIX}
                          onChange={(event) => setEstimatedFeesOverride(event.target.value)}
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
                          <span className="aio-payment__light-trade-step__switch-title">Include Registration &amp; Dealer Fees in Loan</span>
                          <span className="aio-payment__light-trade-step__switch-desc">
                            {includeTaxesAndFeesInLoan
                              ? 'Roll estimated registration and dealer fees into your loan amount.'
                              : 'Pay estimated registration and dealer fees upfront at signing.'}
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
                        type="number"
                        value={tradeInValue}
                        min={0}
                        step={500}
                        iconLeft={MONEY_INPUT_PREFIX}
                        onFocus={selectInputValueOnFocus}
                        onChange={(event) => setTradeInValue(numberInput(event.target.value))}
                      />
                      <button type="button" className="aio-payment__light-inline-action" onClick={() => setShowTradeTool(true)}>
                        Estimate trade-in value
                      </button>
                    </div>
                    <TextField
                      label="Amount owed on trade"
                      type="number"
                      value={amountOwed}
                      min={0}
                      step={500}
                      iconLeft={MONEY_INPUT_PREFIX}
                      onFocus={selectInputValueOnFocus}
                      onChange={(event) => setAmountOwed(numberInput(event.target.value))}
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
                      value={salesTaxOverride || Math.round(calculatedSalesTax)}
                      min={0}
                      iconLeft={MONEY_INPUT_PREFIX}
                      onChange={(event) => setSalesTaxOverride(event.target.value)}
                    />
                    <TextField
                      label="Title, registration, and other fees"
                      type="number"
                      value={feesOverride || stateRule.titleRegistrationFees}
                      min={0}
                      iconLeft={MONEY_INPUT_PREFIX}
                      onChange={(event) => {
                        setEstimatedFeesOverride('');
                        setFeesOverride(event.target.value);
                      }}
                    />
                    <TextField
                      label={renderAreaEstimateLabel('Dealer fees')}
                      type="number"
                      value={dealerFeesOverride || stateRule.dealerFeesEstimate}
                      min={0}
                      iconLeft={MONEY_INPUT_PREFIX}
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
                        <strong>Include Registration &amp; Dealer Fees in Loan</strong>
                        <small>
                          {includeTaxesAndFeesInLoan
                            ? 'Roll estimated registration and dealer fees into your loan amount.'
                            : 'Pay estimated registration and dealer fees upfront at signing.'}
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
                {condition === 'new' && (cashIncentives.length > 0 || financeIncentives.length > 0) ? (
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
                  <div className="aio-payment__light-disclosure-heading">
                    <span id={lightBreakdownLabelId}>Your Personalized Cost Breakdown</span>
                    <strong>{currency(totalLoanAmount)} financed</strong>
                  </div>
                  <div className="aio-payment__light-breakdown-card">
                    <div className="aio-payment__light-breakdown-financed">
                      <div className="aio-payment__light-breakdown-financed-heading">
                        <p className="aio-payment__light-breakdown-financed-label">Amount financed</p>
                        <div className="aio-payment__light-review-drivers-tooltip">
                          <button
                            type="button"
                            className="aio-payment__light-review-drivers-trigger"
                            aria-label="What affects this estimate"
                            aria-describedby={lightBreakdownGuidanceId}
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
                          <div id={lightBreakdownGuidanceId} className="aio-payment__light-review-drivers-popover" role="tooltip">
                            <p className="aio-payment__light-review-drivers-popover-title">What affects this estimate</p>
                            <ul className="aio-payment__light-review-drivers-list">
                              <li>
                                <strong>{currency(totalLoanAmount)}</strong> is the amount financed after vehicle price, taxes and fees, trade, incentives, and down payment.
                              </li>
                              <li>
                                <strong>{currency(totalLoanInterest)}</strong> in finance charge is based on {activeApr.toFixed(1)}% APR over {loanTerm} months.
                              </li>
                              <li>
                                {paymentCreditTotal > 0 ? (
                                  <>
                                    <strong>{currency(paymentCreditTotal)}</strong> from {formatInlineList(paymentCreditSources)} lowers the amount financed before interest is calculated.
                                  </>
                                ) : (
                                  'A higher down payment, trade equity, or eligible incentive can lower the amount financed before interest is calculated.'
                                )}
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <p className="aio-payment__light-breakdown-financed-value">{currency(totalLoanAmount)}</p>
                      <p className="aio-payment__light-breakdown-financed-formula">
                        {amountFinancedFormulaParts.map((part, index) => (
                          <span key={`${part.sign ?? 'base'}-${part.label}`} className="aio-payment__light-breakdown-financed-formula-part">
                            {part.sign && (
                              <>
                                <span
                                  className={`aio-payment__light-breakdown-financed-sign ${
                                    part.sign === '+'
                                      ? 'aio-payment__light-breakdown-financed-sign--add'
                                      : part.sign === '-'
                                        ? 'aio-payment__light-breakdown-financed-sign--subtract'
                                        : 'aio-payment__light-breakdown-financed-sign--total'
                                  }`}
                                >
                                  {part.sign}
                                </span>{' '}
                              </>
                            )}
                            {part.label}
                            {index < amountFinancedFormulaParts.length - 1 ? ' ' : ''}
                          </span>
                        ))}
                      </p>
                    </div>
                    <dl className="aio-payment__light-breakdown" aria-labelledby={lightBreakdownLabelId}>
                      <div><dt>{workingPriceBreakdownLabel}</dt><dd>{renderLightBreakdownValue(workingPrice)}</dd></div>
                      <div><dt>Estimated Taxes &amp; Fees</dt><dd>{renderLightBreakdownValue(taxesAndFees, 'add')}</dd></div>
                      <div><dt>Down Payment</dt><dd>{renderLightBreakdownValue(downPayment, 'subtract')}</dd></div>
                      <div><dt>Trade-In Value</dt><dd>{tradeInValue > 0 ? renderLightBreakdownValue(tradeInValue, 'subtract') : currency(0)}</dd></div>
                      {showTradePayoffBreakdown && (
                        <div><dt>Amount Owed on Trade</dt><dd>{renderLightBreakdownValue(amountOwed, 'add')}</dd></div>
                      )}
                      {showTradePayoffBreakdown && (
                        <div className="aio-payment__light-breakdown-row--calculated">
                          <dt>{tradeEquityBreakdownLabel}</dt>
                          <dd>{renderTradeEquityBreakdownValue()}</dd>
                        </div>
                      )}
                      <div><dt>Amount Financed</dt><dd>{renderLightBreakdownValue(totalLoanAmount)}</dd></div>
                      <div><dt>Finance Charge</dt><dd>{renderLightBreakdownValue(totalLoanInterest, 'add')}</dd></div>
                      <div><dt>Loan Payments Over {loanTerm} Months</dt><dd>{renderLightBreakdownValue(totalLoanPayments)}</dd></div>
                      <div className="aio-payment__light-breakdown__total">
                        <dt>Estimated Total Paid</dt>
                        <dd>{renderLightBreakdownValue(totalCost)}</dd>
                      </div>
                    </dl>
                  </div>
                  {SHOW_LIGHT_ESTIMATE_EMAIL && (
                    <div className="aio-payment__light-estimate-email">
                      <p className="aio-payment__light-estimate-email__lede">
                        Email this estimate so you can keep the numbers handy when you talk with local dealers.
                      </p>
                      <form
                        className="aio-payment__light-estimate-email__row"
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
                          iconLeft={<Mail size={18} strokeWidth={2} aria-hidden="true" />}
                        >
                          Email estimate
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
                          We will send the monthly payment, cost breakdown, vehicle details, and shopping links.
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
                        Continue
                        <ArrowRight size={18} strokeWidth={2} aria-hidden="true" />
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="aio-payment__light-wizard-primary aio-payment__light-wizard-primary--review"
                        onClick={() => {
                          if (showLightAffordableDealCards) {
                            lightAffordableSectionRef.current?.scrollIntoView({ behavior: getPreferredScrollBehavior(), block: 'start' });
                          } else {
                            window.location.assign(lightShopHref);
                          }
                        }}
                        disabled={canUseCatalogPrice && lightAffordableDealCards.length === 0}
                      >
                        {showLightAffordableDealCards ? 'See cars in your budget' : lightShopLabel}
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
                        {startMode === 'monthly' ? 'Budget supports about' : 'Estimated monthly payment'}
                      </p>
                      <p className="payment-calc__result-big aio-payment__light-result-amount" aria-live="polite">
                        {startMode === 'monthly' ? currency(affordableMsrp) : currency(estimatedMonthly)}
                        {startMode !== 'monthly' && <span className="payment-calc__mo">/mo</span>}
                      </p>
                      <p className="payment-calc__muted aio-payment__light-result-lede">
                        {startMode === 'monthly'
                          ? canUseCatalogPrice
                            ? `Estimated MSRP before tax and fees for a ${currency(targetMonthlyPayment)}/mo target.`
                            : `Estimated listing-price target before tax and fees for a ${currency(targetMonthlyPayment)}/mo target.`
                          : `Based on a ${currency(workingPrice)} ${workingPriceDescriptor}, ${loanTerm} months, and ${activeApr.toFixed(1)}% APR.`}
                      </p>
                    </div>
                    <div className={`aio-payment__light-result-details ${showLightMobileTotals ? 'aio-payment__light-result-details--open' : ''}`}>
                      <button
                        type="button"
                        className="aio-payment__light-result-details-toggle"
                        aria-expanded={showLightMobileTotals}
                        aria-controls={lightEstimateTotalsId}
                        onClick={() => setShowLightMobileTotals((isOpen) => !isOpen)}
                      >
                        Estimate totals
                        {showLightMobileTotals ? (
                          <ChevronDown size={18} strokeWidth={2.25} aria-hidden="true" />
                        ) : (
                          <ChevronUp size={18} strokeWidth={2.25} aria-hidden="true" />
                        )}
                      </button>
                      <dl id={lightEstimateTotalsId} className="payment-calc__sum aio-payment__light-result-metrics" aria-label="Estimate totals">
                        <div className="payment-calc__sum-row">
                          <dt>Rate &amp; Term</dt>
                          <dd>{activeApr.toFixed(1)}% APR · {loanTerm} mo</dd>
                        </div>
                        <div className="payment-calc__sum-row">
                          <dt>Down Payment</dt>
                          <dd>{currency(downPayment)}</dd>
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
                        <div className="payment-calc__sum-row">
                          <dt>Monthly Payment</dt>
                          <dd>{currency(estimatedMonthly)}/mo</dd>
                        </div>
                        <div className="payment-calc__sum-row">
                          <dt>Finance Charge</dt>
                          <dd>{currency(totalLoanInterest)}</dd>
                        </div>
                        <div className="payment-calc__sum-row">
                          <dt>Estimated Total Paid</dt>
                          <dd>{currency(totalCost)}</dd>
                        </div>
                      </dl>
                      {showLightReviewVehicleShopCta && (
                        <a
                          className="aio-payment__light-result-vehicle-shop"
                          href={lightReviewVehicleShopHref}
                          aria-label={`Shop ${condition === 'new' ? 'new' : 'used'} ${selectedYear} ${selectedVehicle.make} ${selectedVehicle.model}`}
                        >
                          {lightReviewVehicleShopLabel}
                        </a>
                      )}
                      {isLightStepsVariant && lightWizardStep === 5 && (
                        <p className="aio-payment__light-result-expert-link">
                          Want a better price?{' '}
                          <a href="#aio-payment-light-expert-tip">See ways to improve this estimate.</a>
                        </p>
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
                  <div className={`aio-payment__light-budget-fit aio-payment__light-budget-fit--${summaryBudgetFitStatus}`}>
                    <div
                      className={`aio-payment__light-budget-fit-icon-wrap aio-payment__light-budget-fit-icon-wrap--${summaryBudgetFitStatus === 'over' ? 'alert' : summaryBudgetFitStatus === 'neutral' ? 'info' : 'success'}`}
                      aria-hidden="true"
                    >
                      {summaryBudgetFitStatus === 'over' ? (
                        <AlertTriangle size={16} strokeWidth={2.25} />
                      ) : summaryBudgetFitStatus === 'neutral' ? (
                        <Info size={15} strokeWidth={2.5} />
                      ) : (
                        <Check size={14} strokeWidth={3} />
                      )}
                    </div>
                    <div className="aio-payment__light-budget-fit-text">
                      <span className="aio-payment__light-budget-fit-label">{summaryBudgetFitLabel}</span>
                      <strong className="aio-payment__light-budget-fit-headline">{summaryBudgetFitHeadline}</strong>
                      <p className="aio-payment__light-budget-fit-copy">{summaryBudgetFitCopy}</p>
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
            </div>
          </div>
        </section>

        {isLightStepsVariant && lightWizardStep === 5 && lightOptimizationTips.length > 0 && (
          <section className="aio-payment__light-review-insights-section" aria-label="Review insights">
            <div className="container">
              <div className="aio-payment__light-review-insights">
                <article className="aio-payment__panel aio-payment__panel--wide aio-payment__light-review-panel aio-payment__light-review-panel--simple">
                  <div id="aio-payment-light-expert-tip" className="aio-payment__light-review-expert-tip">
                    <div className="aio-payment__light-review-expert-tip-header">
                      <img src={CD_SEAL_CHECK_ICON_URL} alt="" aria-hidden="true" decoding="async" />
                      <span>C/D Expert Tip:</span>
                    </div>
                    <p>
                      <strong>Your estimate is {currency(estimatedMonthly)}/mo with {currency(totalLoanPayments)} in loan payments.</strong>
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
            </div>
          </section>
        )}

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
              </section>
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

        {isLightStepsVariant && (
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
                      <p>{item.answer}</p>
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
                    {lightHasVehicleSelection
                      ? `Best path for a ${selectedVehicleLabel} ${selectedVehicleStyle}`
                      : 'Best path for your estimate'}
                  </h2>
                  <p className="aio-payment__ai-modal-subtitle">
                    Use this as a dealer worksheet. Lock the selling price first, then compare fees, APR, cash due, and total loan payments.
                  </p>
                  <dl className="aio-payment__ai-modal-context" aria-label="Current estimate context">
                    <div><dt>Current payment</dt><dd>{currency(estimatedMonthly)}/mo</dd></div>
                    <div><dt>Loan payments</dt><dd>{currency(totalLoanPayments)}</dd></div>
                    <div><dt>Rate &amp; term</dt><dd>{activeApr.toFixed(1)}% · {loanTerm} mo</dd></div>
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
                        ? `Based on ${currency(workingPrice)} MSRP, ${loanTerm} months, and ${activeApr.toFixed(1)}% APR.`
                        : `Based on the current ${currency(workingPrice)} listing-price input, ${loanTerm} months, and ${activeApr.toFixed(1)}% APR.`
                      : canUseCatalogPrice
                        ? `Estimated MSRP before tax and fees for a ${currency(targetMonthlyPayment)}/mo target.`
                        : `Estimated listing-price target before tax and fees for a ${currency(targetMonthlyPayment)}/mo target.`}
                  </p>
                </div>
                <div className="aio-payment__budget-facts" aria-label="Estimate assumptions">
                  <span>{currency(downPayment)} down</span>
                  <span>{loanTerm} months</span>
                  <span>{activeApr.toFixed(1)}% APR</span>
                </div>
              </div>
            )}

            {(isBudgetFirstVariant || !isLightVariant) && (
              <div className="aio-payment__primary-input">
                {startMode === 'price' ? (
                  <TextField
                    label={isBudgetFirstVariant ? canUseCatalogPrice ? 'Vehicle price or MSRP' : 'Vehicle listing price' : 'Selected car price'}
                    type="number"
                    value={price}
                    min={0}
                    step={500}
                    iconLeft={MONEY_INPUT_PREFIX}
                    helperText={isBudgetFirstVariant
                      ? 'Use the negotiated selling price if you already have one.'
                      : `${selectedYear} ${selectedVehicle.make} ${selectedVehicle.model} estimate: ${currency(estimatedMonthly)}/mo`}
                    onChange={(event) => handlePriceChange(numberInput(event.target.value))}
                  />
                ) : (
                  <TextField
                    label={isBudgetFirstVariant ? 'Monthly budget' : 'Target monthly payment'}
                    type="number"
                    value={targetMonthlyPayment}
                    min={0}
                    step={25}
                    iconLeft={MONEY_INPUT_PREFIX}
                    helperText={isBudgetFirstVariant
                      ? `Try 500 for a $500 monthly budget. This supports about ${currency(affordableMsrp)} before tax and fees.`
                      : `This supports about ${currency(affordableMsrp)} before tax and fees.`}
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
                value={downPayment}
                min={0}
                step={500}
                iconLeft={MONEY_INPUT_PREFIX}
                onChange={(event) => setDownPayment(numberInput(event.target.value))}
              />
              <TextField
                label="Trade-in value"
                type="number"
                value={tradeInValue}
                min={0}
                step={500}
                iconLeft={MONEY_INPUT_PREFIX}
                onFocus={selectInputValueOnFocus}
                onChange={(event) => setTradeInValue(numberInput(event.target.value))}
              />
              <TextField
                label="Amount owed on trade"
                type="number"
                value={amountOwed}
                min={0}
                step={500}
                iconLeft={MONEY_INPUT_PREFIX}
                onFocus={selectInputValueOnFocus}
                onChange={(event) => setAmountOwed(numberInput(event.target.value))}
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
                value={activeApr}
                min={0}
                step={0.1}
                disabled={selectedFinanceId !== 'custom'}
                iconRight={PERCENT_INPUT_SUFFIX}
                onChange={(event) => setCustomApr(numberInput(event.target.value))}
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
                value={salesTaxOverride || Math.round(calculatedSalesTax)}
                min={0}
                iconLeft={MONEY_INPUT_PREFIX}
                onChange={(event) => setSalesTaxOverride(event.target.value)}
              />
              <TextField
                label="Title, registration, and other fees"
                type="number"
                value={feesOverride || stateRule.titleRegistrationFees}
                min={0}
                iconLeft={MONEY_INPUT_PREFIX}
                onChange={(event) => {
                  setEstimatedFeesOverride('');
                  setFeesOverride(event.target.value);
                }}
              />
              <TextField
                label={renderAreaEstimateLabel('Dealer fees')}
                type="number"
                value={dealerFeesOverride || stateRule.dealerFeesEstimate}
                min={0}
                iconLeft={MONEY_INPUT_PREFIX}
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
                      value={leaseMsrp}
                      min={0}
                      step={500}
                      iconLeft={MONEY_INPUT_PREFIX}
                      onChange={(event) => setLeaseMsrp(numberInput(event.target.value))}
                    />
                    <Select
                      label="Lease term"
                      value={leaseTerm}
                      onChange={(event) => setLeaseTerm(numberInput(event.target.value))}
                      options={[24, 36, 39, 48].map((term) => ({ value: String(term), label: `${term} months` }))}
                    />
                    <TextField label="Money factor" type="number" value={leaseMoneyFactor} min={0} step={0.0001} onChange={(event) => setLeaseMoneyFactor(numberInput(event.target.value))} />
                    <TextField
                      label="Residual %"
                      type="number"
                      value={leaseResidualPercent}
                      min={0}
                      max={100}
                      step={1}
                      iconRight={PERCENT_INPUT_SUFFIX}
                      onChange={(event) => setLeaseResidualPercent(numberInput(event.target.value))}
                    />
                    <TextField
                      label="Cash due at signing"
                      type="number"
                      value={leaseDueAtSigning}
                      min={0}
                      step={250}
                      iconLeft={MONEY_INPUT_PREFIX}
                      onChange={(event) => setLeaseDueAtSigning(numberInput(event.target.value))}
                    />
                    <TextField
                      label="Lease fees"
                      type="number"
                      value={leaseFees}
                      min={0}
                      step={100}
                      iconLeft={MONEY_INPUT_PREFIX}
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
                      value={buyoutPrice}
                      min={0}
                      step={500}
                      iconLeft={MONEY_INPUT_PREFIX}
                      onChange={(event) => setBuyoutPrice(numberInput(event.target.value))}
                    />
                    <TextField
                      label="Buyout down payment"
                      type="number"
                      value={buyoutDownPayment}
                      min={0}
                      step={250}
                      iconLeft={MONEY_INPUT_PREFIX}
                      onChange={(event) => setBuyoutDownPayment(numberInput(event.target.value))}
                    />
                    <TextField
                      label="Buyout APR"
                      type="number"
                      value={buyoutApr}
                      min={0}
                      step={0.1}
                      iconRight={PERCENT_INPUT_SUFFIX}
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
              </dl>
            </details>

            <details className="aio-payment__summary-group">
              <summary>
                <span>After trade & incentives</span>
                <strong>{currency(netPriceAfterTradeAndOffers)}</strong>
              </summary>
              <dl className="aio-payment__summary-breakdown">
                <div><dt>Trade-in value</dt><dd>{tradeInValue > 0 ? `-${currency(tradeInValue)}` : currency(0)}</dd></div>
                <div><dt>Amount owed on trade</dt><dd>{amountOwed > 0 ? `+${currency(amountOwed)}` : currency(0)}</dd></div>
                {showTradePayoffBreakdown && (
                  <div className="aio-payment__summary-row--emphasis">
                    <dt>{tradeEquityBreakdownLabel}</dt>
                    <dd>{formatTradeEquitySummaryValue()}</dd>
                  </div>
                )}
                <div><dt>Rebates and incentives</dt><dd>{rebateTotal > 0 ? `-${currency(rebateTotal)}` : currency(0)}</dd></div>
                <div><dt>Cash due at signing</dt><dd>{cashDueAtSigning > 0 ? `-${currency(cashDueAtSigning)}` : currency(0)}</dd></div>
              </dl>
            </details>

            <details className="aio-payment__summary-group">
              <summary>
                <span>Amount financed</span>
                <strong>{currency(totalLoanAmount)}</strong>
              </summary>
              <dl className="aio-payment__summary-breakdown">
                <div><dt>Estimated payment</dt><dd>{currency(estimatedMonthly)}/mo</dd></div>
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
          <span>{startMode === 'price' ? 'Estimated monthly payment' : isBudgetFirstVariant ? `Budget-supported ${canUseCatalogPrice ? 'MSRP' : 'price'}` : 'Selected car price'}</span>
          <strong>{startMode === 'price' ? `${currency(estimatedMonthly)}/mo` : currency(isBudgetFirstVariant ? workingPrice : price)}</strong>
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
