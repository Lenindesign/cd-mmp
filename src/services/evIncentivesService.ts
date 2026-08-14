import evIncentivesData from '../data/ev-incentives-august-4.json';

export type EvIncentiveCategory =
  | 'direct-vehicle-savings'
  | 'lease-rate'
  | 'tax-credit'
  | 'tax-exemption'
  | 'charging-rebate'
  | 'utility-program'
  | 'conditional-offer';

export type EvIncentiveProviderType =
  | 'manufacturer'
  | 'lender'
  | 'federal'
  | 'state'
  | 'utility';

export interface EvIncentive {
  id: string;
  year: number;
  make: string;
  model: string;
  trimNames: string[];
  bodyStyle: string;
  msrpRange: string;
  fuelType: 'Electric' | 'Hybrid' | 'Plug-In Hybrid';
  imageUrl?: string | null;
  programName: string;
  description: string;
  category: EvIncentiveCategory;
  offerType: string;
  amountLabel: string;
  amountValue?: number;
  effectiveDate?: string;
  expirationDate?: string;
  providerName: string;
  providerType: EvIncentiveProviderType;
  requirement: string;
  eligibility: string;
  purchaseLeaseImpact: string;
  stackabilityNote: string;
  sourceLabel: string;
  locationLabel: string;
  vehicleSlug: string;
}

export const EV_INCENTIVE_CATEGORY_LABELS: Record<EvIncentiveCategory, string> = {
  'direct-vehicle-savings': 'Vehicle Savings',
  'lease-rate': 'Lease Rate',
  'tax-credit': 'Tax Credit',
  'tax-exemption': 'Tax Exemption',
  'charging-rebate': 'Charging Rebate',
  'utility-program': 'Utility Program',
  'conditional-offer': 'Conditional Offer',
};

export const EV_INCENTIVE_CATEGORY_DESCRIPTIONS: Record<EvIncentiveCategory, string> = {
  'direct-vehicle-savings': 'Manufacturer cash and customer credits that can reduce the vehicle transaction.',
  'lease-rate': 'Lease programs and rate reductions tied to approved credit and eligible trims.',
  'tax-credit': 'Credits that may apply outside the negotiated vehicle price.',
  'tax-exemption': 'Tax programs that may reduce eligible state or local taxes.',
  'charging-rebate': 'Home charger and installation support from federal or utility programs.',
  'utility-program': 'Electricity, charging, and managed charging programs after purchase or lease.',
  'conditional-offer': 'Programs that require military, employee, affinity, loyalty, or targeted eligibility.',
};

export const EV_INCENTIVES: EvIncentive[] = evIncentivesData as EvIncentive[];

export const EV_INCENTIVE_CATEGORY_ORDER: EvIncentiveCategory[] = [
  'direct-vehicle-savings',
  'lease-rate',
  'tax-credit',
  'tax-exemption',
  'charging-rebate',
  'utility-program',
  'conditional-offer',
];

export function getEvIncentives(): EvIncentive[] {
  return EV_INCENTIVES;
}

export function getTopEvIncentive(incentives = EV_INCENTIVES): EvIncentive | null {
  return [...incentives].sort((a, b) => {
    const categoryScore = (value: EvIncentiveCategory) => {
      if (value === 'direct-vehicle-savings') return 0;
      if (value === 'lease-rate') return 1;
      if (value === 'tax-credit') return 2;
      if (value === 'charging-rebate') return 3;
      return 4;
    };

    const categoryDelta = categoryScore(a.category) - categoryScore(b.category);
    if (categoryDelta !== 0) return categoryDelta;
    return (b.amountValue ?? 0) - (a.amountValue ?? 0);
  })[0] ?? null;
}
