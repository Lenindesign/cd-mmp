import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Info } from 'lucide-react';
import { getAllVehicles, getVehiclesInBudget, type Vehicle } from '../../services/vehicleService';
import { getVehicleIncentives, type Incentive } from '../../services/incentivesService';
import { DEFAULT_STATE_VEHICLE_TAX, STATE_VEHICLE_TAXES } from '../../data/stateVehicleTaxes';
import { Button } from '../../components/Button';
import { Select, TextField } from '../../components/TextField';
import { VehicleCard } from '../../components/VehicleCard/VehicleCard';
import HeroOffersB from '../../components/Hero/HeroOffersB';
import IncentivesModal from '../../components/IncentivesModal/IncentivesModal';
import TradeInEstimateModal from '../../components/TradeInEstimateModal';
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

const CUSTOM_RATE_TERMS = [12, 24, 36, 48, 60, 72];
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

const currency = (value: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(Math.round(value));

const numberInput = (value: string) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
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

const AllInOnePaymentCalculatorPage = () => {
  const vehicles = useMemo(() => getAllVehicles(), []);
  const stateRules = useMemo(() => buildStateRules(), []);
  const defaultVehicle = vehicles.find((vehicle) => vehicle.make === 'Honda' && vehicle.model === 'CR-V') ?? vehicles[0];

  const [condition, setCondition] = useState<VehicleCondition>('new');
  const [selectedSlug, setSelectedSlug] = useState(defaultVehicle.slug);
  const [selectedYear, setSelectedYear] = useState(defaultVehicle.year);
  const [startMode, setStartMode] = useState<PurchaseStartMode>('price');
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
  const [showTradeTool, setShowTradeTool] = useState(false);
  const [tradeVehicle, setTradeVehicle] = useState('2020 Honda CR-V');
  const [tradeMileage, setTradeMileage] = useState(52000);
  const [tradeCondition, setTradeCondition] = useState<TradeCondition>('average');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [showIncentiveModal, setShowIncentiveModal] = useState(false);
  const [selectedIncentive, setSelectedIncentive] = useState<Incentive | null>(null);
  const summaryRef = useRef<HTMLElement>(null);
  const affordableCarouselRef = useRef<HTMLDivElement>(null);
  const [affordableCarouselState, setAffordableCarouselState] = useState({ canScrollPrevious: false, canScrollNext: false });
  const [showMobileSummary, setShowMobileSummary] = useState(false);

  const selectedVehicle = useMemo(
    () => vehicles.find((vehicle) => vehicle.slug === selectedSlug) ?? defaultVehicle,
    [defaultVehicle, selectedSlug, vehicles],
  );

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
  const termOptions = selectedFinance ? getFinanceTermOptions(selectedFinance) : CUSTOM_RATE_TERMS;
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
  const workingPrice = price;
  const taxableAmount = getTaxableAmount(workingPrice, tradeInValue, rebateTotal, stateRule.taxRule);
  const calculatedSalesTax = taxableAmount * stateRule.rate;
  const salesTax = salesTaxOverride ? numberInput(salesTaxOverride) : calculatedSalesTax;
  const outTheDoorPrice = workingPrice + salesTax + fees;
  const netPriceAfterTradeAndOffers = Math.max(0, outTheDoorPrice - tradeEquity - rebateTotal);
  const totalLoanAmount = Math.max(0, netPriceAfterTradeAndOffers - downPayment);
  const estimatedMonthly = monthlyPayment(totalLoanAmount, activeApr, loanTerm);
  const totalLoanPayments = estimatedMonthly * loanTerm;
  const totalLoanInterest = Math.max(0, totalLoanPayments - totalLoanAmount);
  const totalCost = netPriceAfterTradeAndOffers + totalLoanInterest;
  const cashDueAtSigning = Math.min(downPayment, netPriceAfterTradeAndOffers);
  const totalPaidFromPocket = cashDueAtSigning + totalLoanPayments;
  const paymentDelta = estimatedMonthly - targetMonthlyPayment;
  const schedule = buildAnnualSchedule(totalLoanAmount, activeApr, loanTerm, estimatedMonthly);
  const affordableVehicles = useMemo(
    () => getVehiclesInBudget(Math.max(0, price + downPayment + rebateTotal), selectedVehicle.bodyStyle).slice(0, 4),
    [downPayment, price, rebateTotal, selectedVehicle.bodyStyle],
  );
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

  const toggleCashIncentive = (id: string) => {
    setSelectedCashIds((current) => current.includes(id)
      ? current.filter((item) => item !== id)
      : [...current, id]);
  };

  const handleOfferClick = (incentive: Incentive) => {
    setSelectedIncentive(incentive);
    setShowIncentiveModal(true);
  };

  const applyOfferToEstimate = (incentive: Incentive) => {
    if (incentive.type === 'cash') {
      toggleCashIncentive(incentive.id);
      return;
    }

    if (incentive.type === 'finance') {
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
  }, [affordableVehicles]);

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
              <span className="aio-payment__eyebrow">Pre-calculation</span>
              <h2>{startMode === 'price' ? 'Vehicle, price, trade, incentives, and taxes' : 'Monthly budget, vehicle, trade, incentives, and taxes'}</h2>
            </div>

            <div className="aio-payment__start-mode" role="tablist" aria-label="Choose how to start the estimate">
              <button
                type="button"
                role="tab"
                aria-selected={startMode === 'price'}
                className={`aio-payment__start-mode-button ${startMode === 'price' ? 'aio-payment__start-mode-button--active' : ''}`}
                onClick={() => setStartMode('price')}
              >
                <span>Monthly payment</span>
                <strong>Pick a car and calculate the monthly payment.</strong>
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={startMode === 'monthly'}
                className={`aio-payment__start-mode-button ${startMode === 'monthly' ? 'aio-payment__start-mode-button--active' : ''}`}
                onClick={() => setStartMode('monthly')}
              >
                <span>Selected car price</span>
                <strong>Enter a budget and see how much vehicle it supports.</strong>
              </button>
            </div>

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
              {startMode === 'price' ? (
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
            {startMode === 'price' ? 'Estimated monthly payment' : 'Selected car price'}
          </span>
          <strong>{startMode === 'price' ? `${currency(estimatedMonthly)}/mo` : currency(workingPrice)}</strong>
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
          <span>{startMode === 'price' ? 'Estimated monthly payment' : 'Selected car price'}</span>
          <strong>{startMode === 'price' ? `${currency(estimatedMonthly)}/mo` : currency(workingPrice)}</strong>
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
      />
    </main>
  );
};

export default AllInOnePaymentCalculatorPage;
