export type CreditTier = 'excellent' | 'good' | 'fair' | 'rebuilding';
export type RiskTolerance = 'low' | 'medium' | 'high';
export type DriverPreference = 'lowest-payment' | 'long-term-value' | 'flexibility' | 'luxury-upgrades';

export interface LeaseVsBuyInputs {
  make: string;
  model: string;
  trim: string;
  msrp: number;
  negotiatedPrice: number;
  zipCode: string;
  apr: number;
  loanTermMonths: number;
  downPayment: number;
  tradeInValue: number;
  taxes: number;
  dealerFees: number;
  leaseTermMonths: number;
  leaseMonthlyPayment: number;
  mileageAllowance: number;
  residualPercent: number;
  moneyFactor: number;
  driveOffCosts: number;
  acquisitionFee: number;
  dispositionFee: number;
  annualMileage: number;
  ownershipDurationYears: number;
  creditTier: CreditTier;
  investmentReturnPercent: number;
  riskTolerance: RiskTolerance;
  preference: DriverPreference;
}

export interface YearPoint {
  year: number;
  buyCost: number;
  leaseCost: number;
  equity: number;
  resaleValue: number;
  depreciation: number;
  cashFlowBuy: number;
  cashFlowLease: number;
  opportunityCost: number;
}

export interface DealScore {
  score: number;
  label: 'Excellent Deal' | 'Good Deal' | 'Average' | 'Weak Deal' | 'Avoid';
  factors: Array<{ label: string; score: number; note: string }>;
  redFlags: string[];
}

export interface LeaseVsBuyResults {
  buyMonthlyPayment: number;
  totalInterest: number;
  totalLoanCost: number;
  totalBuyCost: number;
  estimatedDepreciation: number;
  resaleValue: number;
  insuranceCost: number;
  maintenanceCost: number;
  opportunityCost: number;
  leaseEffectiveMonthlyCost: number;
  totalLeaseCost: number;
  mileagePenalty: number;
  wearAndTearExposure: number;
  equityLoss: number;
  leaseSubsidyDetected: boolean;
  winner: 'buy' | 'lease';
  savings: number;
  timeline: YearPoint[];
  dealScore: DealScore;
}

export interface AIAnalysis {
  executiveSummary: string;
  financialWinner: string;
  lifestyleWinner: string;
  longTermWealthWinner: string;
  riskAnalysis: string;
  dealerRedFlags: string[];
  negotiationAdvice: string[];
  depreciationForecast: string;
  finalRecommendation: string;
}
