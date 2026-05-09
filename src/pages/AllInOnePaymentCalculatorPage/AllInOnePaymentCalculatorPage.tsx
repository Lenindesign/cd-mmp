import { useCallback, useEffect, useId, useMemo, useRef, useState, type CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, ArrowLeft, ArrowRight, Car, Check, ChevronDown, ChevronLeft, ChevronRight, ChevronUp, CircleHelp, Info, ListOrdered, Mail, RotateCcw, SkipForward, SlidersHorizontal, TrendingUp } from 'lucide-react';
import { getAllVehicles, getRankingVehicles, getVehiclesInBudget, type Vehicle } from '../../services/vehicleService';
import { getVehicleIncentives, type Incentive } from '../../services/incentivesService';
import { DEFAULT_STATE_VEHICLE_TAX, STATE_VEHICLE_TAXES } from '../../data/stateVehicleTaxes';
import { Button } from '../../components/Button';
import { Select, TextField } from '../../components/TextField';
import { VehicleCard } from '../../components/VehicleCard/VehicleCard';
import HeroOffersB from '../../components/Hero/HeroOffersB';
import IncentivesModal from '../../components/IncentivesModal/IncentivesModal';
import TradeInEstimateModal from '../../components/TradeInEstimateModal';
import { PaymentCalculatorFinanceCharts } from '../../components/PaymentCalculator/PaymentCalculatorFinanceCharts';
import { DEFAULT_BODY_STYLES } from '../../components/BodyStyleSelector';
import '../../components/Hero/Hero.css';
import './AllInOnePaymentCalculatorPage.css';

type VehicleCondition = 'new' | 'used';
type TaxableAmountRule = 'full-price' | 'after-trade' | 'after-rebate' | 'after-trade-and-rebate';
type TradeCondition = 'rough' | 'average' | 'clean';
type LeaseEstimatorMode = 'lease' | 'buyout';
type PurchaseStartMode = 'price' | 'monthly';

interface StateTaxRule {
  code: string;
  name: string;
  rate: number;
  titleRegistrationFees: number;
  taxRule: TaxableAmountRule;
}

interface YearScheduleRow {
  year: number;
  principal: number;
  interest: number;
  endBalance: number;
}

const CUSTOM_RATE_TERMS = [12, 24, 36, 48, 60, 72, 84];
const USED_YEAR_OPTIONS = Array.from({ length: 11 }, (_, index) => String(2026 - index));

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

const FAQS = [
  {
    question: 'Should I take a cash rebate or a low APR offer?',
    answer: 'Compare total loan cost, not just monthly payment. A rebate lowers principal, while a low APR lowers interest. The better offer depends on loan size, term, and how much cash you apply up front.',
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

const formatLightTradeSalesTaxPercent = (percent: number): string => {
  const rounded = Math.round(percent * 1000) / 1000;
  if (Math.abs(rounded - Math.round(rounded)) < 1e-6) return String(Math.round(rounded));
  return String(rounded);
};

/** Light calculator primary controls — shared slider + field pattern */
const LIGHT_MONTHLY_BUDGET_MIN = 100;
const LIGHT_MONTHLY_BUDGET_MAX = 2000;
const LIGHT_MONTHLY_BUDGET_STEP = 25;

const LIGHT_VEHICLE_PRICE_MIN = 5000;
const LIGHT_VEHICLE_PRICE_MAX = 120000;
const LIGHT_VEHICLE_PRICE_STEP = 500;

const clampLightMonthlyBudget = (value: number) => {
  const stepped = Math.round(value / LIGHT_MONTHLY_BUDGET_STEP) * LIGHT_MONTHLY_BUDGET_STEP;
  return Math.min(LIGHT_MONTHLY_BUDGET_MAX, Math.max(LIGHT_MONTHLY_BUDGET_MIN, stepped));
};

const clampLightVehiclePrice = (value: number) => {
  const stepped = Math.round(value / LIGHT_VEHICLE_PRICE_STEP) * LIGHT_VEHICLE_PRICE_STEP;
  return Math.min(LIGHT_VEHICLE_PRICE_MAX, Math.max(LIGHT_VEHICLE_PRICE_MIN, stepped));
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

const parseMoney = (value: string) => {
  const match = value.match(/\$?([\d,]+)/);
  return match ? Number(match[1].replace(/,/g, '')) : 0;
};

const parseApr = (value: string) => {
  const match = value.match(/([\d.]+)%/);
  return match ? Number(match[1]) : 0;
};

const parseTerm = (value?: string) => {
  const match = value?.match(/(\d+)/);
  return match ? Number(match[1]) : 60;
};

const getCombinedMpg = (mpg?: string) => {
  if (!mpg) return undefined;
  const values = mpg.split('/').map((item) => Number(item));
  if (values.some((value) => !Number.isFinite(value))) return undefined;
  return Math.round(values.reduce((sum, value) => sum + value, 0) / values.length);
};

const getVehicleCardCopy = (vehicle: Vehicle) =>
  `The ${vehicle.year} ${vehicle.make} ${vehicle.model} keeps this estimate realistic with a starting price under your budget and a ${vehicle.staffRating}/10 C/D rating.`;

const getBudgetVehicleReason = (vehicle: Vehicle, index: number) => {
  if (index === 0) return 'Closest to your budget';
  if (vehicle.tenBest) return '10Best pick';
  if (vehicle.editorsChoice) return "Editor's Choice";
  if (vehicle.evOfTheYear) return 'EV award winner';
  if (vehicle.staffRating >= 8.5) return 'High C/D rating';
  return 'Fits this estimate';
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

const buildStateRules = (): StateTaxRule[] =>
  STATE_VEHICLE_TAXES.map((state) => ({
    ...state,
    titleRegistrationFees: state.rate === 0 ? 180 : Math.round(220 + state.rate * 3800),
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

function bodyStyleCatalogIcon(iconId: string): string {
  return DEFAULT_BODY_STYLES.find((b) => b.id === iconId)?.icon ?? '';
}

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
  const clamped = clampLightVehiclePrice(price);
  const sliderPct =
    ((clamped - LIGHT_VEHICLE_PRICE_MIN) / (LIGHT_VEHICLE_PRICE_MAX - LIGHT_VEHICLE_PRICE_MIN)) * 100;

  return (
    <div className="aio-payment__light-monthly-budget">
      <div className="aio-payment__light-monthly-budget-header">
        <label className="aio-payment__light-monthly-budget-label" htmlFor={inputId}>
          Vehicle price
        </label>
        <p className="aio-payment__light-monthly-budget-summary" aria-live="polite">
          <span className="aio-payment__light-monthly-budget-summary-amount">{currency(price)}</span>
        </p>
      </div>
      <div className="aio-payment__light-monthly-budget-input-wrap">
        <input
          id={inputId}
          type="number"
          className="aio-payment__light-monthly-budget-input"
          min={LIGHT_VEHICLE_PRICE_MIN}
          max={LIGHT_VEHICLE_PRICE_MAX}
          step={LIGHT_VEHICLE_PRICE_STEP}
          value={price}
          aria-describedby={helperId}
          onChange={(event) => onPriceChange(numberInput(event.target.value))}
          onBlur={(event) => onPriceChange(clampLightVehiclePrice(numberInput(event.currentTarget.value)))}
        />
      </div>
      <div className="aio-payment__light-monthly-budget-slider-wrap">
        <input
          type="range"
          className="aio-payment__light-monthly-budget-slider"
          style={{ '--aio-light-budget-pct': `${sliderPct}%` } as CSSProperties}
          min={LIGHT_VEHICLE_PRICE_MIN}
          max={LIGHT_VEHICLE_PRICE_MAX}
          step={LIGHT_VEHICLE_PRICE_STEP}
          value={clamped}
          onChange={(event) => onPriceChange(clampLightVehiclePrice(numberInput(event.target.value)))}
          aria-label="Adjust vehicle price"
        />
        <div className="aio-payment__light-monthly-budget-ticks" aria-hidden="true">
          <span>{currency(LIGHT_VEHICLE_PRICE_MIN)}</span>
          <span>{currency(LIGHT_VEHICLE_PRICE_MAX)}</span>
        </div>
      </div>
      <p id={helperId} className="aio-payment__light-monthly-budget-helper">
        Estimated payment: {currency(estimatedMonthly)}/mo before dealer-specific changes.
      </p>
    </div>
  );
}

function LightMonthlyBudgetField({ affordableMsrp, targetMonthlyPayment, onBudgetChange }: LightMonthlyBudgetFieldProps) {
  const inputId = useId();
  const helperId = `${inputId}-helper`;
  const clamped = Math.min(LIGHT_MONTHLY_BUDGET_MAX, Math.max(LIGHT_MONTHLY_BUDGET_MIN, targetMonthlyPayment));
  const sliderPct =
    ((clamped - LIGHT_MONTHLY_BUDGET_MIN) / (LIGHT_MONTHLY_BUDGET_MAX - LIGHT_MONTHLY_BUDGET_MIN)) * 100;

  return (
    <div className="aio-payment__light-monthly-budget">
      <div className="aio-payment__light-monthly-budget-header">
        <label className="aio-payment__light-monthly-budget-label" htmlFor={inputId}>
          Monthly budget
        </label>
        <p className="aio-payment__light-monthly-budget-summary" aria-live="polite">
          <span className="aio-payment__light-monthly-budget-summary-amount">{currency(targetMonthlyPayment)}</span>
          <span className="aio-payment__light-monthly-budget-summary-suffix">/mo</span>
        </p>
      </div>
      <div className="aio-payment__light-monthly-budget-input-wrap">
        <input
          id={inputId}
          type="number"
          className="aio-payment__light-monthly-budget-input"
          min={LIGHT_MONTHLY_BUDGET_MIN}
          max={LIGHT_MONTHLY_BUDGET_MAX}
          step={LIGHT_MONTHLY_BUDGET_STEP}
          value={targetMonthlyPayment}
          aria-describedby={helperId}
          onChange={(event) => onBudgetChange(numberInput(event.target.value))}
          onBlur={(event) => onBudgetChange(clampLightMonthlyBudget(numberInput(event.currentTarget.value)))}
        />
      </div>
      <div className="aio-payment__light-monthly-budget-slider-wrap">
        <input
          type="range"
          className="aio-payment__light-monthly-budget-slider"
          style={{ '--aio-light-budget-pct': `${sliderPct}%` } as CSSProperties}
          min={LIGHT_MONTHLY_BUDGET_MIN}
          max={LIGHT_MONTHLY_BUDGET_MAX}
          step={LIGHT_MONTHLY_BUDGET_STEP}
          value={clamped}
          onChange={(event) => onBudgetChange(clampLightMonthlyBudget(numberInput(event.target.value)))}
          aria-label="Adjust monthly budget"
        />
        <div className="aio-payment__light-monthly-budget-ticks" aria-hidden="true">
          <span>{currency(LIGHT_MONTHLY_BUDGET_MIN)}</span>
          <span>{currency(LIGHT_MONTHLY_BUDGET_MAX)}</span>
        </div>
      </div>
      <p id={helperId} className="aio-payment__light-monthly-budget-helper">
        We estimate a vehicle price near {currency(affordableMsrp)} before tax and fees.
      </p>
    </div>
  );
}

type LightWizardStepMeta = {
  label: string;
  short: string;
  hint: string;
  panelTitle?: string;
  panelIntro?: string;
  panelEyebrowSuffix?: string;
};

const LIGHT_WIZARD_STEP_META: LightWizardStepMeta[] = [
  {
    label: 'Payment goal',
    short: 'Goal',
    hint: 'Start with what you know best—a monthly budget or a vehicle price—and we’ll build from there.',
    panelTitle: 'Choose your starting point',
    panelIntro: 'Start with what you know best—a monthly budget or a vehicle price—and we’ll build from there.',
  },
  {
    label: 'Loan setup',
    short: 'Loan',
    hint: 'Set down payment, APR, and how long you’ll finance.',
    panelTitle: 'Set your loan terms',
    panelIntro: 'Down payment, APR, and term length all change the monthly payment.',
  },
  {
    label: 'Vehicle',
    short: 'Vehicle',
    hint: 'Pick a year, make, and trim so incentives and pricing feel real—not generic.',
    panelTitle: 'Pick a vehicle',
    panelIntro:
      'Know exactly what you want, or just have a body style in mind? Either works — or skip and refine later.',
    panelEyebrowSuffix: ' · OPTIONAL',
  },
  {
    label: 'Trade, taxes & fees',
    short: 'Trade',
    hint: 'Rough numbers are fine here. You can refine with a dealer later.',
    panelTitle: 'Trade-in, taxes & fees',
    panelIntro: 'Optional but improves accuracy. Skip any field that doesn\'t apply.',
    panelEyebrowSuffix: ' · OPTIONAL',
  },
  {
    label: 'Review',
    short: 'Review',
    hint: 'Stack on any offers, peek at the breakdown, then jump to cars that fit.',
    panelTitle: 'Review your estimate',
    panelIntro: 'Stack on any offers, peek at the breakdown, then jump to cars that fit.',
  },
];

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
  const downClamped = clampLightDownPayment(downPayment);
  const downPct =
    ((downClamped - LIGHT_DOWN_PAYMENT_MIN) / (LIGHT_DOWN_PAYMENT_MAX - LIGHT_DOWN_PAYMENT_MIN)) * 100;
  const aprSliderValue = aprLocked ? activeApr : clampLightAprSlider(customApr);
  const aprPct =
    ((aprSliderValue - LIGHT_APR_SLIDER_MIN) / (LIGHT_APR_SLIDER_MAX - LIGHT_APR_SLIDER_MIN)) * 100;

  return (
    <div className="aio-payment__light-loan-step">
      <div className="aio-payment__light-loan-step__field">
        <div className="aio-payment__light-loan-step__head">
          <label className="aio-payment__light-loan-step__label" htmlFor={downId}>
            Down payment
          </label>
          <p className="aio-payment__light-loan-step__value" aria-live="polite">
            {currency(downClamped)}
          </p>
        </div>
        <div className="aio-payment__light-loan-step__input-wrap">
          <input
            id={downId}
            type="number"
            className="aio-payment__light-loan-step__input"
            min={LIGHT_DOWN_PAYMENT_MIN}
            max={LIGHT_DOWN_PAYMENT_MAX}
            step={LIGHT_DOWN_PAYMENT_STEP}
            value={downPayment}
            onChange={(event) => onDownPaymentChange(clampLightDownPayment(numberInput(event.target.value)))}
            onBlur={(event) => onDownPaymentChange(clampLightDownPayment(numberInput(event.currentTarget.value)))}
          />
        </div>
        <div className="aio-payment__light-loan-step__slider-wrap">
          <input
            type="range"
            className="aio-payment__light-loan-step__slider"
            style={{ '--aio-light-loan-pct': `${downPct}%` } as CSSProperties}
            min={LIGHT_DOWN_PAYMENT_MIN}
            max={LIGHT_DOWN_PAYMENT_MAX}
            step={LIGHT_DOWN_PAYMENT_STEP}
            value={downClamped}
            onChange={(event) => onDownPaymentChange(clampLightDownPayment(numberInput(event.target.value)))}
            aria-label="Adjust down payment"
          />
        </div>
      </div>

      <div className="aio-payment__light-loan-step__field">
        <div className="aio-payment__light-loan-step__head">
          {aprLocked ? (
            <span className="aio-payment__light-loan-step__label">Interest rate (APR)</span>
          ) : (
            <label className="aio-payment__light-loan-step__label" htmlFor={aprId}>
              Interest rate (APR)
            </label>
          )}
          <p className="aio-payment__light-loan-step__value" aria-live="polite">
            {activeApr.toFixed(2)}%
          </p>
        </div>
        {!aprLocked ? (
          <>
            <div className="aio-payment__light-loan-step__input-wrap">
              <input
                id={aprId}
                type="number"
                className="aio-payment__light-loan-step__input"
                min={LIGHT_APR_SLIDER_MIN}
                max={LIGHT_APR_SLIDER_MAX}
                step={LIGHT_APR_SLIDER_STEP}
                value={customApr}
                onChange={(event) => onCustomAprChange(clampLightAprSlider(numberInput(event.target.value)))}
                onBlur={(event) => onCustomAprChange(clampLightAprSlider(numberInput(event.currentTarget.value)))}
              />
            </div>
            <div className="aio-payment__light-loan-step__slider-wrap">
              <input
                type="range"
                className="aio-payment__light-loan-step__slider"
                style={{ '--aio-light-loan-pct': `${aprPct}%` } as CSSProperties}
                min={LIGHT_APR_SLIDER_MIN}
                max={LIGHT_APR_SLIDER_MAX}
                step={LIGHT_APR_SLIDER_STEP}
                value={aprSliderValue}
                onChange={(event) => onCustomAprChange(clampLightAprSlider(numberInput(event.target.value)))}
                aria-label="Adjust interest rate"
              />
              <div className="aio-payment__light-loan-step__ticks" aria-hidden="true">
                <span>0%</span>
                <span>20%</span>
              </div>
            </div>
          </>
        ) : (
          <p className="aio-payment__light-loan-step__locked">
            APR follows the selected finance offer. Choose &quot;Custom rate&quot; in review to edit.
          </p>
        )}
      </div>

      <div className="aio-payment__light-loan-step__field aio-payment__light-loan-step__field--terms">
        <p className="aio-payment__light-loan-step__terms-label" id={`${downId}-terms`}>
          Loan term
        </p>
        <div
          className="aio-payment__light-loan-step__chips"
          role="group"
          aria-labelledby={`${downId}-terms`}
          aria-label="Loan term in months"
        >
          {termChipOptions.map((months) => (
            <button
              key={months}
              type="button"
              className={`aio-payment__light-loan-step__chip${loanTerm === months ? ' aio-payment__light-loan-step__chip--active' : ''}`}
              onClick={() => onLoanTermChange(months)}
            >
              {months} mo
            </button>
          ))}
        </div>
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
  const vehicles = useMemo(() => getAllVehicles(), []);
  const stateRules = useMemo(() => buildStateRules(), []);
  const defaultVehicle = vehicles.find((vehicle) => vehicle.make === 'Honda' && vehicle.model === 'CR-V') ?? vehicles[0];

  const [condition, setCondition] = useState<VehicleCondition>('new');
  const [selectedSlug, setSelectedSlug] = useState(defaultVehicle.slug);
  const [selectedYear, setSelectedYear] = useState(defaultVehicle.year);
  const [startMode, setStartMode] = useState<PurchaseStartMode>(isBudgetFirstVariant || isLightVariant ? 'monthly' : 'price');
  const [price, setPrice] = useState(defaultVehicle.priceMin);
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
  const [stateCode, setStateCode] = useState(DEFAULT_STATE_VEHICLE_TAX.code);
  const [salesTaxOverride, setSalesTaxOverride] = useState('');
  const [feesOverride, setFeesOverride] = useState('');
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
  const affordableCarouselRef = useRef<HTMLDivElement>(null);
  const lightAffordableSectionRef = useRef<HTMLElement>(null);
  const [affordableCarouselState, setAffordableCarouselState] = useState({ canScrollPrevious: false, canScrollNext: false });
  const [showMobileSummary, setShowMobileSummary] = useState(false);
  const [lightWizardStep, setLightWizardStep] = useState(1);
  const lightVehicleBodyStyleHeadingId = useId();
  const [lightEstimateEmail, setLightEstimateEmail] = useState('');
  const [lightEstimateEmailError, setLightEstimateEmailError] = useState<string | undefined>();
  const [lightVehicleStepMode, setLightVehicleStepMode] = useState<'known' | 'browsing'>('known');
  const [lightBrowseBodyStyle, setLightBrowseBodyStyle] = useState('SUV');
  const selectedVehicle = useMemo(
    () => vehicles.find((vehicle) => vehicle.slug === selectedSlug) ?? defaultVehicle,
    [defaultVehicle, selectedSlug, vehicles],
  );
  const selectedVehicleStyle = selectedVehicle.trim || selectedVehicle.drivetrain || selectedVehicle.bodyStyle;

  const availableYears = useMemo(
    () => condition === 'used'
      ? USED_YEAR_OPTIONS
      : [...new Set(vehicles.map((vehicle) => vehicle.year))].sort((a, b) => Number(b) - Number(a)),
    [condition, vehicles],
  );
  const availableMakes = useMemo(
    () => [...new Set(vehicles
      .filter((vehicle) => condition === 'used' || vehicle.year === selectedYear)
      .map((vehicle) => vehicle.make))]
      .sort(),
    [condition, selectedYear, vehicles],
  );
  const availableModels = useMemo(
    () => [...new Set(vehicles
      .filter((vehicle) => (
        (condition === 'used' || vehicle.year === selectedYear) &&
        vehicle.make === selectedVehicle.make
      ))
      .map((vehicle) => vehicle.model))]
      .sort(),
    [condition, selectedVehicle.make, selectedYear, vehicles],
  );
  const availableTrimStyles = useMemo(
    () => vehicles.filter((vehicle) => (
      (condition === 'used' || vehicle.year === selectedYear) &&
      vehicle.make === selectedVehicle.make &&
      vehicle.model === selectedVehicle.model
    )),
    [condition, selectedVehicle.make, selectedVehicle.model, selectedYear, vehicles],
  );

  const lightVehicleBrowseTiles = useMemo(
    () =>
      LIGHT_VEHICLE_BROWSE_GRID.map((row) => ({
        ...row,
        icon: bodyStyleCatalogIcon(row.iconId),
      })),
    [],
  );

  const lightBrowseTypicalFromByKey = useMemo(() => {
    const out: Record<string, number> = {};
    for (const row of LIGHT_VEHICLE_BROWSE_GRID) {
      if (row.bodyStyle === 'EV') {
        const evs = vehicles.filter((v) => v.fuelType === 'Electric');
        out[row.key] = evs.length > 0 ? Math.min(...evs.map((v) => v.priceMin)) : 0;
      } else {
        const ranked = getRankingVehicles(row.bodyStyle, 120);
        out[row.key] = ranked.length > 0 ? Math.min(...ranked.map((v) => v.priceMin)) : 0;
      }
    }
    return out;
  }, [vehicles]);

  const lightBrowseSelectionLabel = useMemo(
    () => LIGHT_VEHICLE_BROWSE_GRID.find((row) => row.bodyStyle === lightBrowseBodyStyle)?.label ?? lightBrowseBodyStyle,
    [lightBrowseBodyStyle],
  );

  const vehicleIncentives = useMemo(
    () => condition === 'new'
      ? getVehicleIncentives(selectedVehicle.make, selectedVehicle.model)
      : { make: selectedVehicle.make, model: selectedVehicle.model, totalSavings: 0, incentives: [] },
    [condition, selectedVehicle.make, selectedVehicle.model],
  );
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

  useEffect(() => {
    if (!isLightStepsVariant || lightWizardStep !== 2) return;
    if (termOptions.length > 0 && !termOptions.includes(loanTerm)) {
      setLoanTerm(termOptions.includes(60) ? 60 : termOptions[0]);
    }
  }, [isLightStepsVariant, lightWizardStep, loanTerm, termOptions]);

  const incentiveApr = getFinanceRateForTerm(selectedFinance, loanTerm);
  const activeApr = selectedFinance ? incentiveApr ?? customApr : customApr;
  const tierCashBack = selectedFinance ? getTierCashBack(selectedFinance, loanTerm) : 0;
  const selectedCashTotal = selectedCashIds.reduce((sum, id) => {
    const incentive = cashIncentives.find((item) => item.id === id);
    return sum + (incentive ? parseMoney(incentive.value) : 0);
  }, 0);
  const rebateTotal = selectedCashTotal + tierCashBack;
  const stateRule = stateRules.find((state) => state.code === stateCode) ?? stateRules[0];
  const fees = feesOverride ? numberInput(feesOverride) : stateRule.titleRegistrationFees;
  const tradeEquity = tradeInValue - amountOwed;
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
  const workingPrice = (isBudgetFirstVariant || isLightVariant) && startMode === 'monthly' ? affordableMsrp : price;
  const taxableAmount = getTaxableAmount(workingPrice, tradeInValue, rebateTotal, stateRule.taxRule);
  const calculatedSalesTax = taxableAmount * stateRule.rate;
  const salesTax = salesTaxOverride ? numberInput(salesTaxOverride) : calculatedSalesTax;
  const lightTradeSalesTaxPercent = useMemo(() => {
    const taxDollars = salesTaxOverride ? numberInput(salesTaxOverride) : calculatedSalesTax;
    if (taxableAmount <= 0) return stateRule.rate * 100;
    return (taxDollars / taxableAmount) * 100;
  }, [calculatedSalesTax, salesTaxOverride, stateRule.rate, taxableAmount]);
  const taxesAndFees = salesTax + fees;
  const outTheDoorPrice = workingPrice + salesTax + fees;
  const netVehiclePriceAfterTradeAndOffers = Math.max(0, workingPrice - tradeEquity - rebateTotal);
  const financedPurchasePrice = includeTaxesAndFeesInLoan ? outTheDoorPrice : workingPrice;
  const netPriceAfterTradeAndOffers = Math.max(0, financedPurchasePrice - tradeEquity - rebateTotal);
  const totalLoanAmount = Math.max(0, netPriceAfterTradeAndOffers - downPayment);
  const estimatedMonthly = monthlyPayment(totalLoanAmount, activeApr, loanTerm);
  const totalLoanPayments = estimatedMonthly * loanTerm;
  const totalLoanInterest = Math.max(0, totalLoanPayments - totalLoanAmount);
  const totalCost = netVehiclePriceAfterTradeAndOffers + taxesAndFees + totalLoanInterest;
  const financedCashDue = Math.min(downPayment, netPriceAfterTradeAndOffers);
  const upfrontCashDue = Math.min(downPayment, netVehiclePriceAfterTradeAndOffers) + taxesAndFees;
  const cashDueAtSigning = includeTaxesAndFeesInLoan ? financedCashDue : upfrontCashDue;
  const totalPaidFromPocket = cashDueAtSigning + totalLoanPayments;
  const paymentDelta = estimatedMonthly - targetMonthlyPayment;
  const selectedVehicleTaxableAmount = getTaxableAmount(selectedVehicle.priceMin, tradeInValue, rebateTotal, stateRule.taxRule);
  const selectedVehicleSalesTax = salesTaxOverride ? numberInput(salesTaxOverride) : selectedVehicleTaxableAmount * stateRule.rate;
  const selectedVehicleFinancedPrice = includeTaxesAndFeesInLoan ? selectedVehicle.priceMin + selectedVehicleSalesTax + fees : selectedVehicle.priceMin;
  const selectedVehicleNetPrice = Math.max(0, selectedVehicleFinancedPrice - tradeEquity - rebateTotal);
  const selectedVehicleLoanAmount = Math.max(0, selectedVehicleNetPrice - downPayment);
  const selectedVehicleMonthly = monthlyPayment(selectedVehicleLoanAmount, activeApr, loanTerm);
  const selectedVehicleBudgetDelta = selectedVehicleMonthly - targetMonthlyPayment;
  const budgetFitStatus = selectedVehicleBudgetDelta > 10 ? 'over' : selectedVehicleBudgetDelta < -10 ? 'under' : 'fit';
  const budgetFitLabel = budgetFitStatus === 'over'
    ? 'Above target'
    : budgetFitStatus === 'under'
      ? 'Under target'
      : 'On target';
  const budgetFitHeadline = budgetFitStatus === 'over'
    ? `About ${currency(selectedVehicleBudgetDelta)}/mo over your target`
    : budgetFitStatus === 'under'
      ? `About ${currency(Math.abs(selectedVehicleBudgetDelta))}/mo under your target`
      : 'Close to your target';
  const budgetFitCopy = budgetFitStatus === 'over'
    ? `${selectedVehicle.model} starts around ${currency(selectedVehicle.priceMin)}. Your current budget supports about ${currency(affordableMsrp)} before tax and fees. Try a lower trim, larger down payment, longer term, or vehicles below that price range.`
    : budgetFitStatus === 'under'
      ? `${selectedVehicle.model} starts around ${currency(selectedVehicle.priceMin)} and pencils out near ${currency(selectedVehicleMonthly)}/mo with these assumptions.`
      : `${selectedVehicle.model} pencils out near ${currency(selectedVehicleMonthly)}/mo with the selected down payment, term, taxes, and fees.`;
  const getEstimatedMonthlyForVehiclePrice = (vehiclePrice: number) => {
    const vehicleTaxableAmount = getTaxableAmount(vehiclePrice, tradeInValue, rebateTotal, stateRule.taxRule);
    const vehicleSalesTax = salesTaxOverride ? numberInput(salesTaxOverride) : vehicleTaxableAmount * stateRule.rate;
    const vehicleFinancedPrice = includeTaxesAndFeesInLoan ? vehiclePrice + vehicleSalesTax + fees : vehiclePrice;
    const vehicleNetPrice = Math.max(0, vehicleFinancedPrice - tradeEquity - rebateTotal);
    const vehicleLoanAmount = Math.max(0, vehicleNetPrice - downPayment);

    return monthlyPayment(vehicleLoanAmount, activeApr, loanTerm);
  };
  const schedule = buildAnnualSchedule(totalLoanAmount, activeApr, loanTerm, estimatedMonthly);
  const affordableVehicleBudget = isBudgetFirstVariant || isLightVariant ? workingPrice : price + downPayment + rebateTotal;
  const affordableVehicles = useMemo(
    () => getVehiclesInBudget(Math.max(0, affordableVehicleBudget), selectedVehicle.bodyStyle).slice(0, 4),
    [affordableVehicleBudget, selectedVehicle.bodyStyle],
  );
  const lightAffordableBudgetCeiling = startMode === 'monthly' ? affordableMsrp : Math.max(0, price);
  const lightAffordableVehicles = useMemo(() => {
    const ceiling = lightAffordableBudgetCeiling;
    const strict = vehicles
      .filter((vehicle) => vehicle.priceMin <= ceiling)
      .sort((a, b) => b.priceMin - a.priceMin || b.staffRating - a.staffRating)
      .slice(0, 8);
    if (strict.length > 0) return strict;

    const relaxedCeiling = Math.max(ceiling * 1.12, ceiling + 3500, 22000);
    const relaxed = vehicles
      .filter((vehicle) => vehicle.priceMin <= relaxedCeiling)
      .sort((a, b) => b.staffRating - a.staffRating || b.priceMin - a.priceMin)
      .slice(0, 8);
    if (relaxed.length > 0) return relaxed;

    return [...vehicles].sort((a, b) => b.staffRating - a.staffRating).slice(0, 8);
  }, [lightAffordableBudgetCeiling, vehicles]);
  const shouldScrollToBudgetVehicles = startMode === 'monthly' && budgetFitStatus === 'over' && lightAffordableVehicles.length > 0;
  const lightShopHref = shouldScrollToBudgetVehicles
    ? '#aio-payment-light-affordable-heading'
    : getMarketplaceUrl(condition, selectedVehicle, selectedYear);
  const lightShopLabel = shouldScrollToBudgetVehicles
    ? 'SEE CARS IN YOUR BUDGET'
    : `SHOP ${condition === 'new' ? 'NEW' : 'USED'} ${selectedVehicle.model.toUpperCase()}`;
  const lightNextStepCopy = shouldScrollToBudgetVehicles
    ? `Start with cars near ${currency(affordableMsrp)} or adjust your loan terms.`
    : startMode === 'monthly'
      ? 'This vehicle is close enough to compare offers and inventory.'
      : 'Review the due-at-signing and total cost before you shop.';
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
        const financeApr = getFinanceRateForTerm(financeIncentives[0], getFinanceTermOptions(financeIncentives[0])[0]) ?? activeApr;
        const financeTerm = getFinanceTermOptions(financeIncentives[0])[0] ?? loanTerm;
        const cashBack = parseMoney(cashIncentives[0].value);
        const lowAprPayment = monthlyPayment(Math.max(0, workingPrice + salesTax + fees - downPayment - tradeEquity), financeApr, financeTerm);
        const cashPayment = monthlyPayment(Math.max(0, workingPrice + salesTax + fees - downPayment - tradeEquity - cashBack), customApr, loanTerm);
        return {
          label: `${financeIncentives[0].title} vs. ${cashIncentives[0].title}`,
          monthlyDelta: cashPayment - lowAprPayment,
          totalDelta: cashPayment * loanTerm - lowAprPayment * financeTerm,
        };
      })()
    : null;
  const aiTargetPrice = Math.max(0, workingPrice - Math.max(750, workingPrice * 0.025));
  const negotiatedDiscount = Math.max(0, selectedVehicle.priceMin - workingPrice);
  const aiBestOfferPath = lowAprVsCash
    ? lowAprVsCash.totalDelta > 0
      ? `${financeIncentives[0].title} looks stronger than cash back by about ${currency(Math.abs(lowAprVsCash.totalDelta))} over the compared terms.`
      : `${cashIncentives[0].title} looks stronger than the low-APR offer by about ${currency(Math.abs(lowAprVsCash.totalDelta))} over the compared terms.`
    : selectedFinance
      ? `${selectedFinance.title} is active. Keep it only if the dealer preserves the negotiated price and does not add fee markup.`
      : cashIncentives[0]
        ? `${cashIncentives[0].title} is the best visible incentive to pressure-test against your own financing.`
        : 'No active manufacturer offer is selected. Treat dealer discount, APR, and fees as the main negotiation levers.';
  const aiDealerFlags = [
    activeApr > 8 ? `${activeApr.toFixed(1)}% APR is high enough to shop a bank or credit union quote before the dealer visit.` : '',
    fees > 900 ? `${currency(fees)} in title, registration, and fees deserves an itemized quote.` : '',
    negotiatedDiscount < selectedVehicle.priceMin * 0.02 ? 'The current price is close to MSRP. Ask for a real selling-price discount before discussing payment.' : '',
    rebateTotal === 0 && condition === 'new' ? 'No rebate is applied. Ask whether regional cash, loyalty, conquest, or captive-finance programs are available.' : '',
  ].filter(Boolean);

  const handleSendLightEstimateEmail = () => {
    const trimmed = lightEstimateEmail.trim();
    if (!trimmed) {
      setLightEstimateEmailError('Enter an email address.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setLightEstimateEmailError('Enter a valid email address.');
      return;
    }
    setLightEstimateEmailError(undefined);
    const subject = `Payment estimate — ${selectedYear} ${selectedVehicle.make} ${selectedVehicle.model}`;
    const lines: string[] = [
      'Payment estimate (Car and Driver Marketplace — auto loan calculator)',
      '',
      `Vehicle: ${selectedYear} ${selectedVehicle.make} ${selectedVehicle.model}`,
      `Out-the-door estimate: ${currency(outTheDoorPrice)}`,
    ];
    if (tradeEquity !== 0) {
      const tradeLabel = tradeEquity > 0 ? 'Trade equity (net)' : 'Trade balance rolled in';
      const tradeVal = tradeEquity > 0 ? `-${currency(tradeEquity)}` : `+${currency(Math.abs(tradeEquity))}`;
      lines.push(`${tradeLabel}: ${tradeVal}`);
    }
    if (rebateTotal > 0) {
      lines.push(`Rebates and incentives: -${currency(rebateTotal)}`);
    }
    lines.push(
      `Amount financed: ${currency(totalLoanAmount)}`,
      `Due at signing: ${currency(cashDueAtSigning)}`,
      `Estimated monthly payment: ${currency(estimatedMonthly)}/mo`,
      `Total interest: ${currency(totalLoanInterest)}`,
      `Total loan payments: ${currency(totalLoanPayments)}`,
      `Total cost: ${currency(totalCost)}`,
      '',
      `Loan: ${loanTerm} months · APR ${activeApr.toFixed(1)}%`,
      `State: ${stateRule.name} (${stateCode})`,
      `Generated: ${new Date().toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })}`,
    );
    let body = lines.join('\n');
    const maxLen = 1800;
    if (body.length > maxLen) {
      body = `${body.slice(0, maxLen)}\n…`;
    }
    const mailtoHref = `mailto:${encodeURIComponent(trimmed)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    const mailLink = document.createElement('a');
    mailLink.href = mailtoHref;
    mailLink.rel = 'noopener noreferrer';
    mailLink.click();
  };
  const incentiveOfferDetail = useMemo(() => {
    if (!selectedIncentive) return undefined;

    return {
      year: parseInt(selectedYear, 10),
      make: selectedVehicle.make,
      model: selectedVehicle.model,
      slug: selectedVehicle.slug,
      imageUrl: selectedVehicle.image,
      msrpMin: selectedVehicle.priceMin,
      msrpMax: selectedVehicle.priceMax,
      offerHeadline: selectedIncentive.title,
      whatItMeans: selectedIncentive.description,
      yourSavings: selectedIncentive.terms || selectedIncentive.description,
      whoQualifies: selectedIncentive.eligibility || 'All qualified buyers. See dealer for details.',
      eligibleTrims: ['Base', 'Sport', 'Premium'],
      dontWaitText: `This offer expires ${selectedIncentive.expirationDate}. Manufacturer deals change monthly, so confirm availability before you shop.`,
      expirationDate: selectedIncentive.expirationDate,
    };
  }, [selectedIncentive, selectedVehicle, selectedYear]);

  useEffect(() => {
    setPrice(selectedVehicle.priceMin);
    setLeaseMsrp(selectedVehicle.priceMin);
    setBuyoutPrice(Math.round(selectedVehicle.priceMin * 0.58));
    setSelectedCashIds([]);
    setSelectedFinanceId('custom');
    setLoanTerm(60);
  }, [selectedVehicle.slug, selectedVehicle.priceMin]);

  useEffect(() => {
    if (condition === 'used') {
      setSelectedCashIds([]);
      setSelectedFinanceId('custom');
      return;
    }

    setSelectedYear(selectedVehicle.year);
  }, [condition, selectedVehicle.year]);

  useEffect(() => {
    if (!selectedFinance) return;
    const nextTerm = getFinanceTermOptions(selectedFinance)[0] ?? 60;
    setLoanTerm(nextTerm);
    const nextApr = getFinanceRateForTerm(selectedFinance, nextTerm);
    if (nextApr !== null) setCustomApr(nextApr);
  }, [selectedFinance]);

  const updateVehicleByParts = (partial: Partial<Pick<Vehicle, 'year' | 'make' | 'model' | 'slug'>>) => {
    const year = partial.year ?? selectedYear;
    const make = partial.make ?? selectedVehicle.make;
    const model = partial.model ?? selectedVehicle.model;
    const exactSlug = partial.slug;

    if (partial.year) setSelectedYear(partial.year);

    const next = exactSlug
      ? vehicles.find((vehicle) => vehicle.slug === exactSlug)
      : vehicles.find((vehicle) => (
          (condition === 'used' || vehicle.year === year) &&
          vehicle.make === make &&
          vehicle.model === model
        ))
        ?? vehicles.find((vehicle) => (
          (condition === 'used' || vehicle.year === year) &&
          vehicle.make === make
        ))
        ?? vehicles.find((vehicle) => condition === 'used' || vehicle.year === year)
        ?? selectedVehicle;

    if (next) setSelectedSlug(next.slug);
  };

  const applyBrowseBodyStyle = useCallback((bodyStyle: string) => {
    const ranked =
      bodyStyle === 'EV'
        ? [...vehicles]
            .filter((vehicle) => vehicle.fuelType === 'Electric')
            .sort((a, b) => b.staffRating - a.staffRating)
            .slice(0, 50)
        : getRankingVehicles(bodyStyle, 50);
    if (ranked.length === 0) return;
    const sorted = [...ranked].sort((a, b) => Number(b.year) - Number(a.year));
    const pick =
      (condition === 'used'
        ? sorted.find((vehicle) => USED_YEAR_OPTIONS.includes(vehicle.year))
        : sorted.find((vehicle) => vehicle.year === selectedYear))
      ?? sorted[0];
    setSelectedSlug(pick.slug);
    setSelectedYear(pick.year);
  }, [condition, selectedYear, vehicles]);

  useEffect(() => {
    if (!isLightStepsVariant || lightWizardStep !== 3 || lightVehicleStepMode !== 'browsing') return;
    applyBrowseBodyStyle(lightBrowseBodyStyle);
  }, [
    applyBrowseBodyStyle,
    condition,
    isLightStepsVariant,
    lightBrowseBodyStyle,
    lightVehicleStepMode,
    lightWizardStep,
  ]);

  const handleLightTradeSalesTaxPercentChange = useCallback((raw: string) => {
    if (raw.trim() === '') {
      setSalesTaxOverride('');
      return;
    }
    if (taxableAmount <= 0) return;
    const pct = numberInput(raw);
    const dollars = Math.round(taxableAmount * (pct / 100));
    setSalesTaxOverride(String(dollars));
  }, [taxableAmount]);

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
      setSelectedFinanceId((current) => current === incentive.id ? 'custom' : incentive.id);
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
      behavior: 'smooth',
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
  }, [affordableVehicles, lightAffordableVehicles]);

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

  if (isLightVariant) {
    const lightWizardStepMeta = LIGHT_WIZARD_STEP_META[lightWizardStep - 1];
    const lightLoanTermChips = [...new Set(termOptions)].sort((a, b) => a - b);
    return (
      <main className={`aio-payment aio-payment--light${isLightStepsVariant ? ' aio-payment--light-steps' : ''}`}>
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
                <div className="aio-payment__light-hero-eyebrow-row">
                  <span className="aio-payment__eyebrow">Auto loan calculator</span>
                  <div className="aio-payment__light-mode-toggle aio-payment__light-mode-toggle--hero" role="group" aria-label="Calculator layout">
                    {isLightStepsVariant ? (
                      <>
                        <span className="aio-payment__light-mode-toggle-pill aio-payment__light-mode-toggle-pill--current">
                          <ListOrdered size={16} strokeWidth={2.25} aria-hidden="true" />
                          Guided steps
                        </span>
                        <Link to="/auto-loan-calculator/light" className="aio-payment__light-mode-toggle-action">
                          <SlidersHorizontal size={16} strokeWidth={2.25} aria-hidden="true" />
                          Switch to advanced mode
                        </Link>
                      </>
                    ) : (
                      <>
                        <Link to="/auto-loan-calculator/light-steps" className="aio-payment__light-mode-toggle-action">
                          <ListOrdered size={16} strokeWidth={2.25} aria-hidden="true" />
                          Switch to guided steps
                        </Link>
                        <span className="aio-payment__light-mode-toggle-pill aio-payment__light-mode-toggle-pill--current">
                          <SlidersHorizontal size={16} strokeWidth={2.25} aria-hidden="true" />
                          Advanced mode
                        </span>
                      </>
                    )}
                  </div>
                </div>
                <h1>
                  {isLightStepsVariant
                    ? 'Estimate your payment in five guided steps.'
                    : 'See what your monthly budget can buy.'}
                </h1>
                <p>
                  {isLightStepsVariant
                    ? 'Five quick steps, one live estimate. Nothing fancy—just the numbers you need before you shop.'
                    : 'Advanced mode shows loan, vehicle, trade, offers, and breakdown together on one page. Enter a payment target and we’ll estimate price range, payment details, and offers that may fit.'}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="aio-payment__light-main" aria-labelledby="aio-payment-light-heading">
          {isLightStepsVariant ? (
            <div className="aio-payment__light-wizard-strip">
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
                            if (stepNumber <= lightWizardStep) setLightWizardStep(stepNumber);
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
          <div className="container">
            <div className="aio-payment__light-shell">
              <div className="aio-payment__light-card">
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
                  <h2 id="aio-payment-light-heading">
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
                <div className="aio-payment__light-toggle" role="tablist" aria-label="Choose calculator mode">
                  <button
                    type="button"
                    role="tab"
                    aria-selected={startMode === 'monthly'}
                    className={startMode === 'monthly' ? 'aio-payment__light-toggle-button aio-payment__light-toggle-button--active' : 'aio-payment__light-toggle-button'}
                    onClick={() => setStartMode('monthly')}
                  >
                    <span className="aio-payment__light-toggle-button-title">Start with monthly budget</span>
                    <span className="aio-payment__light-toggle-button-copy">Tell us what you can pay each month.</span>
                  </button>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={startMode === 'price'}
                    className={startMode === 'price' ? 'aio-payment__light-toggle-button aio-payment__light-toggle-button--active' : 'aio-payment__light-toggle-button'}
                    onClick={() => setStartMode('price')}
                  >
                    <span className="aio-payment__light-toggle-button-title">Start with vehicle price</span>
                    <span className="aio-payment__light-toggle-button-copy">Know the sticker? Start there.</span>
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
                        onPriceChange={setPrice}
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
                    <TextField label="Down payment" type="number" value={downPayment} min={0} step={500} onChange={(event) => setDownPayment(numberInput(event.target.value))} />
                    <TextField
                      label="Interest rate"
                      type="number"
                      value={activeApr}
                      min={0}
                      step={0.1}
                      disabled={selectedFinanceId !== 'custom'}
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
                        <span className="aio-payment__light-vehicle-step__path-icon aio-payment__light-vehicle-step__path-icon--car" aria-hidden>
                          <Car size={22} strokeWidth={2} />
                        </span>
                        <span className="aio-payment__light-vehicle-step__path-title">I know the vehicle</span>
                        <span className="aio-payment__light-vehicle-step__path-copy">Pick a year, make, and model.</span>
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
                          applyBrowseBodyStyle(lightBrowseBodyStyle);
                        }}
                      >
                        <span className="aio-payment__light-vehicle-step__path-icon aio-payment__light-vehicle-step__path-icon--help" aria-hidden>
                          <CircleHelp size={22} strokeWidth={2} />
                        </span>
                        <span className="aio-payment__light-vehicle-step__path-title">Still shopping</span>
                        <span className="aio-payment__light-vehicle-step__path-copy">
                          Browse by body style and we&apos;ll use a typical starting price.
                        </span>
                      </button>
                    </div>
                    {startMode === 'monthly' && (
                      <p className={`aio-payment__light-budget-note aio-payment__light-budget-note--${budgetFitStatus} aio-payment__light-vehicle-step__budget-note`}>
                        <strong className="aio-payment__light-budget-status-label">{budgetFitLabel}:</strong> {budgetFitCopy}
                      </p>
                    )}
                    <div className="aio-payment__light-vehicle-step__nu">
                      <p className="aio-payment__light-vehicle-step__nu-label">New or used</p>
                      <div className="aio-payment__light-vehicle-step__nu-row" role="tablist" aria-label="New or used vehicle">
                        <button
                          type="button"
                          role="tab"
                          aria-selected={condition === 'new'}
                          className={
                            condition === 'new'
                              ? 'aio-payment__light-vehicle-step__nu-btn aio-payment__light-vehicle-step__nu-btn--active'
                              : 'aio-payment__light-vehicle-step__nu-btn'
                          }
                          onClick={() => setCondition('new')}
                        >
                          New Car
                        </button>
                        <button
                          type="button"
                          role="tab"
                          aria-selected={condition === 'used'}
                          className={
                            condition === 'used'
                              ? 'aio-payment__light-vehicle-step__nu-btn aio-payment__light-vehicle-step__nu-btn--active'
                              : 'aio-payment__light-vehicle-step__nu-btn'
                          }
                          onClick={() => setCondition('used')}
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
                        </div>
                        <Select
                          label="Trim / style"
                          value={selectedVehicle.slug}
                          wrapperClassName="aio-payment__light-field--wide"
                          onChange={(event) => updateVehicleByParts({ slug: event.target.value })}
                          options={availableTrimStyles.map((vehicle) => ({
                            value: vehicle.slug,
                            label: `${vehicle.trim || vehicle.drivetrain || vehicle.bodyStyle} · ${vehicle.bodyStyle} · ${currency(vehicle.priceMin)}`,
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
                            const fromAmt = lightBrowseTypicalFromByKey[tile.key] ?? 0;
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
                                  applyBrowseBodyStyle(tile.bodyStyle);
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
                                <span className="aio-payment__light-vehicle-step__body-tile-from">
                                  from {currency(fromAmt)}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                        <p className="aio-payment__light-vehicle-step__browse-hint">
                          We&apos;ll plug in a popular, well-rated pick for that category. You can fine-tune the exact trim later.
                        </p>
                      </div>
                    )}
                    <div className="aio-payment__light-vehicle-step__price-bar">
                      <div className="aio-payment__light-vehicle-step__price-meta">
                        <span className="aio-payment__light-vehicle-step__price-kicker">
                          {lightVehicleStepMode === 'browsing' ? 'Typical starting price' : 'Starting price'}
                        </span>
                        <p className="aio-payment__light-vehicle-step__price-vehicle">
                          {lightVehicleStepMode === 'browsing'
                            ? lightBrowseSelectionLabel
                            : `${selectedYear} ${selectedVehicle.make} ${selectedVehicle.model}`}
                        </p>
                      </div>
                      <p className="aio-payment__light-vehicle-step__price-value">{currency(selectedVehicle.priceMin)}</p>
                    </div>
                  </div>
                )}

                {!isLightStepsVariant && (
                <details className="aio-payment__light-disclosure" open={undefined}>
                  <summary>
                    <span>Vehicle</span>
                    <strong>{selectedYear} {selectedVehicle.make} {selectedVehicle.model}</strong>
                  </summary>
                  <p className="aio-payment__light-disclosure-copy">
                    {startMode === 'monthly'
                      ? 'Choose a year, make, model, and trim so we can compare your budget with a realistic starting price and available incentives.'
                      : 'Optional: choose a vehicle to apply realistic trim pricing, incentives, AI analysis, and shopping links. If you already know the selling price, enter it above.'}
                  </p>
                  {startMode === 'monthly' && (
                    <p className={`aio-payment__light-budget-note aio-payment__light-budget-note--${budgetFitStatus}`}>
                      <strong className="aio-payment__light-budget-status-label">{budgetFitLabel}:</strong> {budgetFitCopy}
                    </p>
                  )}
                  <div className="aio-payment__light-grid">
                    <Select
                      label="New or used"
                      value={condition}
                      onChange={(event) => setCondition(event.target.value as VehicleCondition)}
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
                      value={selectedVehicle.slug}
                      wrapperClassName="aio-payment__light-field--wide"
                      onChange={(event) => updateVehicleByParts({ slug: event.target.value })}
                      options={availableTrimStyles.map((vehicle) => ({
                        value: vehicle.slug,
                        label: `${vehicle.trim || vehicle.drivetrain || vehicle.bodyStyle} · ${vehicle.bodyStyle} · ${currency(vehicle.priceMin)}`,
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
                          onChange={(event) => setAmountOwed(numberInput(event.target.value))}
                          wrapperClassName="aio-payment__light-trade-step__field-with-action"
                        />
                      </div>
                      <div className="aio-payment__light-trade-step__row aio-payment__light-trade-step__row--3">
                        <Select
                          label="Your state"
                          value={stateCode}
                          onChange={(event) => setStateCode(event.target.value)}
                          options={stateRules.map((state) => ({ value: state.code, label: state.name }))}
                        />
                        <TextField
                          label="Sales tax (%)"
                          type="number"
                          value={formatLightTradeSalesTaxPercent(lightTradeSalesTaxPercent)}
                          min={0}
                          step={0.001}
                          onChange={(event) => handleLightTradeSalesTaxPercentChange(event.target.value)}
                        />
                        <TextField
                          label="Title, reg & fees"
                          type="number"
                          value={feesOverride || stateRule.titleRegistrationFees}
                          min={0}
                          onChange={(event) => setFeesOverride(event.target.value)}
                        />
                      </div>
                    </div>

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
                          <span className="aio-payment__light-trade-step__switch-title">Finance taxes and fees</span>
                          <span className="aio-payment__light-trade-step__switch-desc">
                            {includeTaxesAndFeesInLoan
                              ? 'Roll these into the loan instead of paying upfront.'
                              : 'Pay tax, title, and registration at signing (not in the loan amount).'}
                          </span>
                        </span>
                      </button>
                    </div>

                    <p className="aio-payment__light-trade-step__tax-note">
                      {stateRule.name} rule: {TAX_RULE_LABELS[stateRule.taxRule]}. Taxable amount: {currency(taxableAmount)}.
                    </p>
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
                      <TextField label="Trade-in value" type="number" value={tradeInValue} min={0} step={500} onChange={(event) => setTradeInValue(numberInput(event.target.value))} />
                      <button type="button" className="aio-payment__light-inline-action" onClick={() => setShowTradeTool(true)}>
                        Estimate trade-in value
                      </button>
                    </div>
                    <TextField label="Amount owed on trade" type="number" value={amountOwed} min={0} step={500} onChange={(event) => setAmountOwed(numberInput(event.target.value))} />
                    <Select
                      label="Your state"
                      value={stateCode}
                      onChange={(event) => setStateCode(event.target.value)}
                      options={stateRules.map((state) => ({ value: state.code, label: state.name }))}
                    />
                    <TextField label="Sales tax" type="number" value={salesTaxOverride || Math.round(calculatedSalesTax)} min={0} onChange={(event) => setSalesTaxOverride(event.target.value)} />
                    <TextField label="Title, registration, and other fees" type="number" value={feesOverride || stateRule.titleRegistrationFees} min={0} onChange={(event) => setFeesOverride(event.target.value)} />
                    <label className="aio-payment__light-checkbox aio-payment__light-field--wide">
                      <input
                        type="checkbox"
                        checked={includeTaxesAndFeesInLoan}
                        onChange={(event) => setIncludeTaxesAndFeesInLoan(event.target.checked)}
                      />
                      <span>
                        <strong>Finance taxes and fees</strong>
                        <small>
                          {includeTaxesAndFeesInLoan
                            ? 'Taxes and fees are rolled into the loan amount.'
                            : 'Taxes and fees are counted in cash due at signing.'}
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
                      <span>Offers and incentives</span>
                      <strong>{rebateTotal > 0 ? `${currency(rebateTotal)} applied` : 'None applied'}</strong>
                    </summary>
                    <div className="aio-payment__light-offers aio-payment__light-offers--hero">
                      <HeroOffersB
                        vehicleIncentives={vehicleIncentives}
                        onOfferClick={handleOfferClick}
                        title="Special offers and incentives"
                        selectedOfferIds={[
                          ...selectedCashIds,
                          ...(selectedFinanceId === 'custom' ? [] : [selectedFinanceId]),
                        ]}
                      />
                      <p className="aio-payment__light-offer-help">
                        Select an offer to see details, then apply or remove it from this estimate.
                      </p>
                    </div>
                  </details>
                ) : isLightStepsVariant ? (
                  <div className="aio-payment__light-wizard-empty" role="status">
                    <p className="aio-payment__light-wizard-empty-copy">
                      No manufacturer incentives apply for this vehicle configuration, or you chose used. See the estimate breakdown below.
                    </p>
                  </div>
                ) : null}
                <details className="aio-payment__light-disclosure" open={isLightStepsVariant ? true : undefined}>
                  <summary>
                    <span>Estimate breakdown</span>
                    <strong>{currency(totalLoanAmount)} financed</strong>
                  </summary>
                  <dl className="aio-payment__light-breakdown">
                    <div><dt>Out-the-door estimate</dt><dd>{currency(outTheDoorPrice)}</dd></div>
                    {tradeEquity !== 0 && (
                      <div>
                        <dt>{tradeEquity > 0 ? 'Trade equity (net)' : 'Trade balance rolled in'}</dt>
                        <dd>{tradeEquity > 0 ? `-${currency(tradeEquity)}` : `+${currency(Math.abs(tradeEquity))}`}</dd>
                      </div>
                    )}
                    {rebateTotal > 0 && (
                      <div>
                        <dt>Rebates and incentives</dt>
                        <dd>-{currency(rebateTotal)}</dd>
                      </div>
                    )}
                    <div><dt>Amount financed</dt><dd>{currency(totalLoanAmount)}</dd></div>
                    <div><dt>Due at signing</dt><dd>{currency(cashDueAtSigning)}</dd></div>
                    <div><dt>Estimated monthly payment</dt><dd>{currency(estimatedMonthly)}/mo</dd></div>
                    <div><dt>Total interest</dt><dd>{currency(totalLoanInterest)}</dd></div>
                    <div><dt>Total loan payments</dt><dd>{currency(totalLoanPayments)}</dd></div>
                    <div className="aio-payment__light-breakdown__total">
                      <dt>Total cost</dt>
                      <dd>{currency(totalCost)}</dd>
                    </div>
                  </dl>
                  <div className="aio-payment__light-estimate-email">
                    <p className="aio-payment__light-estimate-email__lede">
                      Send this estimate to your inbox—your email app opens with the numbers filled in.
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
                        Send estimate
                      </Button>
                    </form>
                    <p className="aio-payment__light-estimate-email__note">
                      Nothing is transmitted from this site; your device opens mail with a draft you can send or save.
                    </p>
                  </div>
                </details>
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
                    onClick={() => setLightWizardStep((s) => Math.max(1, s - 1))}
                  >
                    <ArrowLeft size={18} strokeWidth={2} aria-hidden="true" />
                    Back
                  </button>
                  <div className="aio-payment__light-wizard-actions-right">
                    <button
                      type="button"
                      className="aio-payment__light-wizard-start-over"
                      onClick={() => {
                        setLightWizardStep(1);
                        setLightVehicleStepMode('known');
                      }}
                    >
                      <RotateCcw size={18} strokeWidth={2} aria-hidden="true" />
                      Start over
                    </button>
                    {lightWizardStep === 3 && (
                      <button
                        type="button"
                        className="aio-payment__light-wizard-skip"
                        onClick={() => setLightWizardStep(lightWizardStep === 3 ? 4 : 5)}
                      >
                        <SkipForward size={18} strokeWidth={2} aria-hidden="true" />
                        Skip this step
                      </button>
                    )}
                    {lightWizardStep < 5 ? (
                      <button
                        type="button"
                        className="aio-payment__light-wizard-primary aio-payment__light-wizard-primary--with-trailing-icon"
                        onClick={() => setLightWizardStep((s) => Math.min(5, s + 1))}
                      >
                        Continue
                        <ArrowRight size={18} strokeWidth={2} aria-hidden="true" />
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="aio-payment__light-wizard-primary"
                        onClick={() => lightAffordableSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                        disabled={lightAffordableVehicles.length === 0}
                      >
                        See cars in your budget
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
            <div className="aio-payment__light-result-stack aio-payment__light-result--sticky">
              <aside className="aio-payment__light-result" aria-live="polite" aria-label="Current payment estimate">
                <div className="aio-payment__light-result-hero">
                  <span className="aio-payment__light-result-eyebrow">
                    {startMode === 'monthly' ? 'Budget supports about' : 'Estimated monthly payment'}
                  </span>
                  <strong className="aio-payment__light-result-amount">
                    {startMode === 'monthly' ? currency(affordableMsrp) : `${currency(estimatedMonthly)}/mo`}
                  </strong>
                  <p className="aio-payment__light-result-lede">
                    {startMode === 'monthly'
                      ? `Estimated MSRP before tax and fees for a ${currency(targetMonthlyPayment)}/mo target.`
                      : `Based on ${currency(workingPrice)} MSRP, ${loanTerm} months, and ${activeApr.toFixed(1)}% APR.`}
                  </p>
                  <p className="aio-payment__light-result-terms" aria-label="Current loan term and rate">
                    <span>
                      <strong>Term</strong> {loanTerm} months
                    </span>
                    <span className="aio-payment__light-result-terms-sep" aria-hidden="true">
                      ·
                    </span>
                    <span>
                      <strong>APR</strong> {activeApr.toFixed(1)}%
                    </span>
                  </p>
                </div>
                {startMode === 'monthly' && (
                  <div className={`aio-payment__light-budget-fit aio-payment__light-budget-fit--${budgetFitStatus}`}>
                    <div
                      className={`aio-payment__light-budget-fit-icon-wrap aio-payment__light-budget-fit-icon-wrap--${budgetFitStatus === 'over' ? 'alert' : 'success'}`}
                      aria-hidden="true"
                    >
                      {budgetFitStatus === 'over' ? (
                        <AlertTriangle size={16} strokeWidth={2.25} />
                      ) : (
                        <Check size={14} strokeWidth={3} />
                      )}
                    </div>
                    <div className="aio-payment__light-budget-fit-text">
                      <span className="aio-payment__light-budget-fit-label">{budgetFitLabel}</span>
                      <strong className="aio-payment__light-budget-fit-headline">{budgetFitHeadline}</strong>
                      <p className="aio-payment__light-budget-fit-copy">{budgetFitCopy}</p>
                    </div>
                  </div>
                )}
                <div className="aio-payment__light-result-metrics" aria-label="Estimate totals">
                  <div className="aio-payment__light-result-metric">
                    <span className="aio-payment__light-result-metric-label">Monthly</span>
                    <strong className="aio-payment__light-result-metric-value">
                      {currency(estimatedMonthly)}
                      <span className="aio-payment__light-result-metric-suffix">/mo</span>
                    </strong>
                  </div>
                  <div className="aio-payment__light-result-metric">
                    <span className="aio-payment__light-result-metric-label">Due today</span>
                    <strong className="aio-payment__light-result-metric-value">{currency(cashDueAtSigning)}</strong>
                  </div>
                  <div className="aio-payment__light-result-metric">
                    <span className="aio-payment__light-result-metric-label">Financed</span>
                    <strong className="aio-payment__light-result-metric-value">{currency(totalLoanAmount)}</strong>
                  </div>
                  <div className="aio-payment__light-result-metric">
                    <span className="aio-payment__light-result-metric-label">Total cost</span>
                    <strong className="aio-payment__light-result-metric-value">{currency(totalCost)}</strong>
                  </div>
                </div>
                <div className="aio-payment__light-result-footer">
                  <TrendingUp className="aio-payment__light-result-footer-icon" size={18} strokeWidth={2} aria-hidden="true" />
                  <p className="aio-payment__light-result-footer-copy">{lightNextStepCopy}</p>
                </div>
              </aside>
              <a
                className="aio-payment__light-result-shop"
                href={lightShopHref}
                onClick={(event) => {
                  if (!shouldScrollToBudgetVehicles) return;
                  event.preventDefault();
                  lightAffordableSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
              >
                {lightShopLabel}
              </a>
              <button
                type="button"
                className="aio-payment__light-ai-button"
                onClick={() => setShowAiDealAnalysis(true)}
              >
                Generate AI deal analysis
              </button>
            </div>
            </div>
          </div>
        </section>

        {lightAffordableVehicles.length > 0 && (
            <section ref={lightAffordableSectionRef} className="aio-payment__light-affordable-section">
              <div className="container">
                <section className="aio-payment__light-affordable" aria-labelledby="aio-payment-light-affordable-heading">
                  <div className="aio-payment__light-affordable-head">
                    <span className="aio-payment__similar-line" aria-hidden="true" />
                    <h2 id="aio-payment-light-affordable-heading">
                      {startMode === 'monthly' ? 'Cars Your Budget Can Support' : 'Vehicles Near Your Price'}
                    </h2>
                    <span className="aio-payment__similar-line" aria-hidden="true" />
                  </div>
                  <p className="aio-payment__light-affordable-copy">
                    {startMode === 'monthly'
                      ? `These start at or below about ${currency(affordableMsrp)} before tax and fees.`
                      : `These start at or below about ${currency(price)} before tax and fees.`}
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
                    <div ref={affordableCarouselRef} className="aio-payment__vehicle-carousel aio-payment__vehicle-carousel--light">
                      {lightAffordableVehicles.map((vehicle, index) => (
                        <VehicleCard
                          key={vehicle.id}
                          id={vehicle.id}
                          name={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
                          slug={vehicle.slug}
                          image={vehicle.image}
                          price={currency(vehicle.priceMin)}
                          priceLabel="Starting at"
                          secondaryPrice={`${currency(getEstimatedMonthlyForVehiclePrice(vehicle.priceMin))}/mo`}
                          secondaryPriceLabel="Est."
                          budgetNote={getBudgetVehicleReason(vehicle, index)}
                          rating={vehicle.staffRating}
                          epaMpg={getCombinedMpg(vehicle.mpg)}
                          cdSays={getVehicleCardCopy(vehicle)}
                          editorsChoice={vehicle.editorsChoice}
                          tenBest={vehicle.tenBest}
                          evOfTheYear={vehicle.evOfTheYear}
                          showShopButton
                          shopButtonText={`Shop ${condition === 'new' ? 'New' : 'Used'} ${vehicle.model}`}
                          shopButtonVariant="primary"
                          availableYears={[Number(vehicle.year)]}
                          modelName={vehicle.model}
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

        {showAiDealAnalysis && (
          <div className="aio-payment__ai-modal" role="dialog" aria-modal="true" aria-labelledby="aio-payment-ai-modal-title">
            <div className="aio-payment__ai-modal-backdrop" onClick={() => setShowAiDealAnalysis(false)} />
            <div className="aio-payment__ai-modal-panel">
              <div className="aio-payment__ai-modal-head">
                <div>
                  <span className="aio-payment__eyebrow">AI deal analysis</span>
                  <h2 id="aio-payment-ai-modal-title">
                    Best path for a {selectedYear} {selectedVehicle.make} {selectedVehicle.model} {selectedVehicleStyle}
                  </h2>
                </div>
                <button type="button" onClick={() => setShowAiDealAnalysis(false)} aria-label="Close AI deal analysis">
                  x
                </button>
              </div>

              <div className="aio-payment__ai-modal-summary">
                <div>
                  <span>Target price</span>
                  <strong>{currency(aiTargetPrice)}</strong>
                  <p>Start here before taxes, fees, trade equity, and rebates.</p>
                </div>
                <div>
                  <span>Current estimate</span>
                  <strong>{currency(estimatedMonthly)}/mo</strong>
                  <p>{loanTerm} months at {activeApr.toFixed(1)}% APR.</p>
                </div>
                <div>
                  <span>Total loan cost</span>
                  <strong>{currency(totalLoanPayments)}</strong>
                  <p>{currency(totalLoanInterest)} of estimated interest.</p>
                </div>
              </div>

              <div className="aio-payment__ai-modal-grid">
                <section>
                  <h3>Best offer path</h3>
                  <p>{aiBestOfferPath}</p>
                  <p>
                    Current out-the-door estimate is {currency(outTheDoorPrice)}. The financeable amount after trade,
                    down payment, and incentives is {currency(totalLoanAmount)}.
                  </p>
                </section>

                <section>
                  <h3>Negotiation script</h3>
                  <ul>
                    <li>Ask for the selling price first, before monthly payment.</li>
                    <li>Counter at {currency(aiTargetPrice)} and ask the dealer to show taxes, registration, doc fee, and add-ons separately.</li>
                    <li>Keep the selected incentive only if the dealer does not raise the price to offset it.</li>
                    <li>Use a walk-away payment near {currency(Math.max(0, targetMonthlyPayment - 25))}/mo if your budget target is firm.</li>
                  </ul>
                </section>

                <section>
                  <h3>Dealer red flags</h3>
                  {aiDealerFlags.length > 0 ? (
                    <ul>
                      {aiDealerFlags.map((flag) => <li key={flag}>{flag}</li>)}
                    </ul>
                  ) : (
                    <p>No major markup flags from the visible inputs. Still ask for a full worksheet before signing.</p>
                  )}
                </section>

                <section>
                  <h3>Best possible deal</h3>
                  <p>
                    A strong version of this deal combines a selling price near {currency(aiTargetPrice)}, fees under
                    {currency(Math.min(fees, 800))}, and either the best APR offer or cash rebate without dealer add-ons.
                  </p>
                  <p>
                    If the dealer cannot preserve that structure, compare similar {selectedVehicle.model} listings or use
                    the full calculator to test a lower APR and larger down payment.
                  </p>
                </section>
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
          }}
          variant="conversion-b"
          offer={incentiveOfferDetail}
          allIncentives={vehicleIncentives.incentives}
          selectedIncentiveId={selectedIncentive?.id}
          appliedIncentiveIds={[
            ...selectedCashIds,
            ...(selectedFinanceId === 'custom' ? [] : [selectedFinanceId]),
          ]}
          onApplyIncentive={(incentive) => {
            applyOfferToEstimate(incentive);
          }}
        />
      </main>
    );
  }

  return (
    <main className="aio-payment">
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
                  Enter a monthly budget to find a realistic MSRP, or enter an MSRP to estimate the payment.
                  Then tune the loan, tax, trade-in, and incentives without leaving the page.
                </p>
              )}
            </div>

            <div className={`aio-payment__start-mode ${isBudgetFirstVariant ? 'aio-payment__start-mode--guided' : ''}`} role="tablist" aria-label="Choose how to start the estimate">
              <button
                type="button"
                role="tab"
                aria-selected={startMode === 'price'}
                className={`aio-payment__start-mode-button ${startMode === 'price' ? 'aio-payment__start-mode-button--active' : ''}`}
                onClick={() => setStartMode('price')}
              >
                <span>{isBudgetFirstVariant ? 'I know the MSRP' : 'Monthly payment'}</span>
                <strong>{isBudgetFirstVariant ? 'Estimate the monthly payment for a specific vehicle price.' : 'Pick a car and calculate the monthly payment.'}</strong>
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={startMode === 'monthly'}
                className={`aio-payment__start-mode-button ${startMode === 'monthly' ? 'aio-payment__start-mode-button--active' : ''}`}
                onClick={() => setStartMode('monthly')}
              >
                <span>{isBudgetFirstVariant ? 'I know my budget' : 'Selected car price'}</span>
                <strong>{isBudgetFirstVariant ? 'Find the MSRP that fits your monthly target.' : 'Enter a budget and see how much vehicle it supports.'}</strong>
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
                      ? `Based on ${currency(workingPrice)} MSRP, ${loanTerm} months, and ${activeApr.toFixed(1)}% APR.`
                      : `Estimated MSRP before tax and fees for a ${currency(targetMonthlyPayment)}/mo target.`}
                  </p>
                </div>
                <div className="aio-payment__budget-facts" aria-label="Estimate assumptions">
                  <span>{currency(downPayment)} down</span>
                  <span>{loanTerm} months</span>
                  <span>{activeApr.toFixed(1)}% APR</span>
                </div>
              </div>
            )}

            {isBudgetFirstVariant && (
              <div className="aio-payment__primary-input">
                {startMode === 'price' ? (
                  <TextField
                    label="Vehicle price or MSRP"
                    type="number"
                    value={price}
                    min={0}
                    step={500}
                    helperText="Use the negotiated selling price if you already have one."
                    onChange={(event) => setPrice(numberInput(event.target.value))}
                  />
                ) : (
                  <TextField
                    label="Monthly budget"
                    type="number"
                    value={targetMonthlyPayment}
                    min={0}
                    step={25}
                    helperText={`Try 500 for a $500 monthly budget. This supports about ${currency(affordableMsrp)} before tax and fees.`}
                    onChange={(event) => setTargetMonthlyPayment(numberInput(event.target.value))}
                  />
                )}
              </div>
            )}

            <div className="aio-payment__form-grid">
              <Select
                label="New or used"
                value={condition}
                onChange={(event) => setCondition(event.target.value as VehicleCondition)}
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
                value={selectedVehicle.slug}
                wrapperClassName="aio-payment__field--wide"
                onChange={(event) => updateVehicleByParts({ slug: event.target.value })}
                options={availableTrimStyles.map((vehicle) => ({
                  value: vehicle.slug,
                  label: `${vehicle.trim || vehicle.drivetrain || vehicle.bodyStyle} · ${vehicle.bodyStyle} · ${currency(vehicle.priceMin)}`,
                }))}
              />
              {!isBudgetFirstVariant && (
                startMode === 'price' ? (
                  <TextField label="Price (MSRP)" type="number" value={price} min={0} step={500} onChange={(event) => setPrice(numberInput(event.target.value))} />
                ) : (
                  <TextField
                    label="Target monthly payment"
                    type="number"
                    value={targetMonthlyPayment}
                    min={0}
                    step={25}
                    helperText={`${selectedYear} ${selectedVehicle.make} ${selectedVehicle.model} estimate: ${currency(estimatedMonthly)}/mo`}
                    onChange={(event) => setTargetMonthlyPayment(numberInput(event.target.value))}
                  />
                )
              )}
              <TextField label="Down payment" type="number" value={downPayment} min={0} step={500} onChange={(event) => setDownPayment(numberInput(event.target.value))} />
              <TextField label="Trade-in value" type="number" value={tradeInValue} min={0} step={500} onChange={(event) => setTradeInValue(numberInput(event.target.value))} />
              <TextField label="Amount owed on trade" type="number" value={amountOwed} min={0} step={500} onChange={(event) => setAmountOwed(numberInput(event.target.value))} />
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
                  title={`${selectedYear} ${selectedVehicle.make} ${selectedVehicle.model} offers and incentives`}
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
                onChange={(event) => setStateCode(event.target.value)}
                options={stateRules.map((state) => ({ value: state.code, label: state.name }))}
              />
              <TextField
                label="Sales tax"
                type="number"
                value={salesTaxOverride || Math.round(calculatedSalesTax)}
                min={0}
                onChange={(event) => setSalesTaxOverride(event.target.value)}
              />
              <TextField
                label="Title, registration, and other fees"
                type="number"
                value={feesOverride || stateRule.titleRegistrationFees}
                min={0}
                wrapperClassName="aio-payment__field--wide"
                onChange={(event) => setFeesOverride(event.target.value)}
              />
            </div>
            <p className="aio-payment__tax-note">
              {stateRule.name} rule: {TAX_RULE_LABELS[stateRule.taxRule]}. Taxable amount: {currency(taxableAmount)}.
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
          <div className="aio-payment__panel">
            <span className="aio-payment__eyebrow">Loan breakdown</span>
            <h2>Principal and interest</h2>
            <dl className="aio-payment__breakdown">
              <div><dt>Total principal</dt><dd>{currency(totalLoanAmount)}</dd></div>
              <div><dt>Total interest</dt><dd>{currency(totalLoanInterest)}</dd></div>
              <div><dt>Sales tax</dt><dd>{currency(salesTax)}</dd></div>
              <div><dt>Fees</dt><dd>{currency(fees)}</dd></div>
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
                    <TextField label="MSRP" type="number" value={leaseMsrp} min={0} step={500} onChange={(event) => setLeaseMsrp(numberInput(event.target.value))} />
                    <Select
                      label="Lease term"
                      value={leaseTerm}
                      onChange={(event) => setLeaseTerm(numberInput(event.target.value))}
                      options={[24, 36, 39, 48].map((term) => ({ value: String(term), label: `${term} months` }))}
                    />
                    <TextField label="Money factor" type="number" value={leaseMoneyFactor} min={0} step={0.0001} onChange={(event) => setLeaseMoneyFactor(numberInput(event.target.value))} />
                    <TextField label="Residual %" type="number" value={leaseResidualPercent} min={0} max={100} step={1} onChange={(event) => setLeaseResidualPercent(numberInput(event.target.value))} />
                    <TextField label="Cash due at signing" type="number" value={leaseDueAtSigning} min={0} step={250} onChange={(event) => setLeaseDueAtSigning(numberInput(event.target.value))} />
                    <TextField label="Lease fees" type="number" value={leaseFees} min={0} step={100} onChange={(event) => setLeaseFees(numberInput(event.target.value))} />
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
                    <TextField label="Lease buyout price" type="number" value={buyoutPrice} min={0} step={500} onChange={(event) => setBuyoutPrice(numberInput(event.target.value))} />
                    <TextField label="Buyout down payment" type="number" value={buyoutDownPayment} min={0} step={250} onChange={(event) => setBuyoutDownPayment(numberInput(event.target.value))} />
                    <TextField label="Buyout APR" type="number" value={buyoutApr} min={0} step={0.1} onChange={(event) => setBuyoutApr(numberInput(event.target.value))} />
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
            {startMode === 'price' ? 'Estimated monthly payment' : isBudgetFirstVariant ? 'Budget-supported MSRP' : 'Selected car price'}
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
              <span>Total after trade & offers</span>
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
                <div><dt>Title, registration & fees</dt><dd>{currency(fees)}</dd></div>
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
          <span>{startMode === 'price' ? 'Estimated monthly payment' : isBudgetFirstVariant ? 'Budget-supported MSRP' : 'Selected car price'}</span>
          <strong>{startMode === 'price' ? `${currency(estimatedMonthly)}/mo` : currency(isBudgetFirstVariant ? workingPrice : price)}</strong>
          <small>{currency(totalCost)} total after credits</small>
        </div>
        <Button as="a" href={getMarketplaceUrl(condition, selectedVehicle, selectedYear)} variant="primary" size="large" className="aio-payment__mobile-summary-cta">
          Shop {selectedVehicle.model}
        </Button>
      </aside>

      <section className="aio-payment__section aio-payment__vehicle-carousel-section" aria-labelledby="aio-payment-similar-heading">
        <div className="container">
          <div className="aio-payment__similar-heading">
            <span className="aio-payment__similar-line" aria-hidden="true" />
            <h2 id="aio-payment-similar-heading">Similar Vehicles You Can Afford</h2>
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
            <div ref={affordableCarouselRef} className="aio-payment__vehicle-carousel">
              {affordableVehicles.slice(0, 6).map((vehicle) => (
                <VehicleCard
                  key={vehicle.id}
                  id={vehicle.id}
                  name={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
                  slug={vehicle.slug}
                  image={vehicle.image}
                  price={currency(vehicle.priceMin)}
                  priceLabel="Starting at"
                  rating={vehicle.staffRating}
                  epaMpg={getCombinedMpg(vehicle.mpg)}
                  cdSays={getVehicleCardCopy(vehicle)}
                  editorsChoice={vehicle.editorsChoice}
                  tenBest={vehicle.tenBest}
                  evOfTheYear={vehicle.evOfTheYear}
                  showShopButton
                  shopButtonText={`Shop New ${vehicle.model}`}
                  shopButtonVariant="primary"
                  availableYears={[Number(vehicle.year)]}
                  modelName={vehicle.model}
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
        }}
        variant="conversion-b"
        offer={incentiveOfferDetail}
        allIncentives={vehicleIncentives.incentives}
        selectedIncentiveId={selectedIncentive?.id}
        appliedIncentiveIds={[
          ...selectedCashIds,
          ...(selectedFinanceId === 'custom' ? [] : [selectedFinanceId]),
        ]}
        onApplyIncentive={(incentive) => {
          applyOfferToEstimate(incentive);
        }}
      />
    </main>
  );
};

export default AllInOnePaymentCalculatorPage;
