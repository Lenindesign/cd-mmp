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

export type EvIncentiveDisplayType =
  | 'vehicle-retirement'
  | 'rebate'
  | 'financing'
  | 'bill-credit'
  | 'tax-credit'
  | 'tax-exemption';

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

export const EV_INCENTIVE_TYPE_LABELS: Record<EvIncentiveDisplayType, string> = {
  'vehicle-retirement': 'Vehicle Retirement',
  rebate: 'Rebate',
  financing: 'Financing',
  'bill-credit': 'Bill Credit',
  'tax-credit': 'Tax Credit',
  'tax-exemption': 'Tax Exemption',
};

export const EV_INCENTIVE_TYPE_DESCRIPTIONS: Record<EvIncentiveDisplayType, string> = {
  'vehicle-retirement': 'Programs tied to retiring or replacing an older vehicle.',
  rebate: 'Cash, charger, or clean-vehicle rebates that may reduce eligible costs.',
  financing: 'Loan, APR, or lease support tied to approved credit and eligible vehicles.',
  'bill-credit': 'Utility bill credits or account benefits after purchase or lease.',
  'tax-credit': 'Credits that may apply outside the negotiated vehicle price.',
  'tax-exemption': 'Tax programs that may reduce eligible state or local taxes.',
};

export const EV_INCENTIVE_DISPLAY_TYPE_ORDER: EvIncentiveDisplayType[] = [
  'vehicle-retirement',
  'rebate',
  'financing',
  'bill-credit',
  'tax-credit',
  'tax-exemption',
];

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

export function getEvIncentiveDisplayType(incentive: EvIncentive): EvIncentiveDisplayType {
  if (incentive.category === 'tax-credit') return 'tax-credit';
  if (incentive.category === 'tax-exemption') return 'tax-exemption';

  const offerType = incentive.offerType.toLowerCase();
  if (offerType.includes('vehicle retirement')) return 'vehicle-retirement';
  if (offerType.includes('bill credit')) return 'bill-credit';
  if (offerType.includes('financing')) return 'financing';
  return 'rebate';
}

export function getTopEvIncentive(incentives = EV_INCENTIVES): EvIncentive | null {
  return [...incentives].sort((a, b) => {
    const typeScore = (value: EvIncentiveDisplayType) => {
      const index = EV_INCENTIVE_DISPLAY_TYPE_ORDER.indexOf(value);
      return index === -1 ? EV_INCENTIVE_DISPLAY_TYPE_ORDER.length : index;
    };

    const typeDelta = typeScore(getEvIncentiveDisplayType(a)) - typeScore(getEvIncentiveDisplayType(b));
    if (typeDelta !== 0) return typeDelta;
    return (b.amountValue ?? 0) - (a.amountValue ?? 0);
  })[0] ?? null;
}
