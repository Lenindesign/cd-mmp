import { DEFAULT_STATE_VEHICLE_TAX, STATE_VEHICLE_TAXES } from '../data/stateVehicleTaxes';
import type { BudgetCreditScoreBand, BudgetPreferences } from '../types/auth';

export const BUDGET_CREDIT_SCORE_OPTIONS: BudgetCreditScoreBand[] = [
  'Excellent (740-850)',
  'Good (670-739)',
  'Fair (580-669)',
  'Poor (300-579)',
];

export const BUDGET_BODY_STYLE_OPTIONS = ['SUV', 'Sedan', 'Truck', 'Coupe', 'Hatchback', 'Convertible', 'Wagon'];
export const BUDGET_LOAN_TERM_OPTIONS = [36, 48, 60, 72, 84];
export const BUDGET_STATE_OPTIONS = STATE_VEHICLE_TAXES;

export const DEFAULT_BUDGET_PREFERENCES: BudgetPreferences = {
  monthlyPayment: 550,
  downPayment: 2500,
  loanTerm: 60,
  creditScore: 'Good (670-739)',
  bodyStyle: 'SUV',
  stateCode: DEFAULT_STATE_VEHICLE_TAX.code,
  includeTradeIn: false,
  tradeInAmount: 0,
};

const getAprForCreditScore = (creditScore: BudgetCreditScoreBand): number => {
  switch (creditScore) {
    case 'Excellent (740-850)':
      return 5.49;
    case 'Good (670-739)':
      return 7.57;
    case 'Fair (580-669)':
      return 11.89;
    case 'Poor (300-579)':
      return 14.99;
    default:
      return 7.57;
  }
};

const cleanNumber = (value: unknown, fallback: number): number => {
  const numberValue = Number(value);
  return Number.isFinite(numberValue) && numberValue >= 0 ? numberValue : fallback;
};

export const getBudgetPreferences = (preferences?: Partial<BudgetPreferences> | null): BudgetPreferences => {
  const creditScore = BUDGET_CREDIT_SCORE_OPTIONS.includes(preferences?.creditScore as BudgetCreditScoreBand)
    ? preferences?.creditScore as BudgetCreditScoreBand
    : DEFAULT_BUDGET_PREFERENCES.creditScore;
  const loanTerm = BUDGET_LOAN_TERM_OPTIONS.includes(Number(preferences?.loanTerm))
    ? Number(preferences?.loanTerm)
    : DEFAULT_BUDGET_PREFERENCES.loanTerm;
  const bodyStyle = BUDGET_BODY_STYLE_OPTIONS.includes(String(preferences?.bodyStyle))
    ? String(preferences?.bodyStyle)
    : DEFAULT_BUDGET_PREFERENCES.bodyStyle;
  const stateCode = STATE_VEHICLE_TAXES.some((state) => state.code === preferences?.stateCode)
    ? preferences?.stateCode
    : DEFAULT_BUDGET_PREFERENCES.stateCode;

  return {
    ...DEFAULT_BUDGET_PREFERENCES,
    ...preferences,
    monthlyPayment: cleanNumber(preferences?.monthlyPayment, DEFAULT_BUDGET_PREFERENCES.monthlyPayment),
    downPayment: cleanNumber(preferences?.downPayment, DEFAULT_BUDGET_PREFERENCES.downPayment),
    loanTerm,
    creditScore,
    bodyStyle,
    stateCode,
    tradeInAmount: cleanNumber(preferences?.tradeInAmount, DEFAULT_BUDGET_PREFERENCES.tradeInAmount ?? 0),
    includeTradeIn: Boolean(preferences?.includeTradeIn),
  };
};

export const calculateBudgetSummary = (preferences?: Partial<BudgetPreferences> | null) => {
  const budget = getBudgetPreferences(preferences);
  const selectedTax = STATE_VEHICLE_TAXES.find((state) => state.code === budget.stateCode) ?? DEFAULT_STATE_VEHICLE_TAX;
  const selectedApr = getAprForCreditScore(budget.creditScore);
  const monthlyRate = selectedApr / 100 / 12;
  const loanAmount = monthlyRate === 0
    ? budget.monthlyPayment * budget.loanTerm
    : budget.monthlyPayment * ((1 - Math.pow(1 + monthlyRate, -budget.loanTerm)) / monthlyRate);
  const tradeIn = budget.includeTradeIn ? budget.tradeInAmount ?? 0 : 0;
  const totalAvailable = loanAmount + budget.downPayment + tradeIn;
  const preTaxBuyingPower = totalAvailable / (1 + selectedTax.rate);

  return {
    budget,
    selectedApr,
    selectedTax,
    loanAmount: Math.round(loanAmount),
    totalAvailable: Math.round(totalAvailable),
    estimatedTax: Math.round(totalAvailable - preTaxBuyingPower),
    buyingPower: Math.max(0, Math.round(preTaxBuyingPower)),
  };
};

export const formatBudgetCurrency = (value: number): string => (
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value)
);

export const isBudgetPreferenceComplete = (preferences?: BudgetPreferences): boolean => (
  Boolean(preferences && preferences.monthlyPayment > 0)
);
