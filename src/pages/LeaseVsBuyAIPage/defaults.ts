import type { LeaseVsBuyInputs } from './types';

export const defaultLeaseVsBuyInputs: LeaseVsBuyInputs = {
  make: 'Honda',
  model: 'CR-V',
  trim: 'Sport-L Hybrid',
  msrp: 38900,
  negotiatedPrice: 37250,
  zipCode: '90210',
  apr: 6.9,
  loanTermMonths: 60,
  downPayment: 4000,
  tradeInValue: 2500,
  taxes: 8.25,
  dealerFees: 895,
  leaseTermMonths: 36,
  leaseMonthlyPayment: 489,
  mileageAllowance: 12000,
  residualPercent: 61,
  moneyFactor: 0.00285,
  driveOffCosts: 3500,
  acquisitionFee: 895,
  dispositionFee: 395,
  annualMileage: 12000,
  ownershipDurationYears: 5,
  creditTier: 'good',
  investmentReturnPercent: 5,
  riskTolerance: 'medium',
  preference: 'long-term-value',
};

export const creditTierOptions = [
  { value: 'excellent', label: 'Excellent' },
  { value: 'good', label: 'Good' },
  { value: 'fair', label: 'Fair' },
  { value: 'rebuilding', label: 'Rebuilding' },
] as const;

export const preferenceOptions = [
  { value: 'lowest-payment', label: 'Lowest payment' },
  { value: 'long-term-value', label: 'Long-term value' },
  { value: 'flexibility', label: 'Flexibility' },
  { value: 'luxury-upgrades', label: 'Luxury upgrades' },
] as const;

export const riskOptions = [
  { value: 'low', label: 'Low risk' },
  { value: 'medium', label: 'Balanced' },
  { value: 'high', label: 'Higher risk' },
] as const;
