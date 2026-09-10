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

export interface EvIncentivePresentation {
  cardOfferLabel: string;
  cardProgramLabel: string;
  cardSupportLabel: string;
  cardTagLabel: string;
  cardTagTooltip: string;
  modalOfferLabel: string;
  modalOfferValue: string;
  modalWhatIsThisOffer: string;
  modalProgramRules: string;
  modalDontWaitText: string;
  hideExpiration: boolean;
  vehicleTagContent: string;
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

const EV_DONT_WAIT_TEXT = 'EV incentives may end when a sales threshold is reached or the program changes, so availability isn’t guaranteed—if you qualify, it may be worth acting soon.';

export function getEvIncentivePresentation(incentive: EvIncentive): EvIncentivePresentation | null {
  switch (getEvIncentiveDisplayType(incentive)) {
    case 'vehicle-retirement':
      return {
        cardOfferLabel: '$12,000 EV Offer',
        cardProgramLabel: 'Vehicle Retirement Consumer Assistance Program',
        cardSupportLabel: 'Vehicle Purchase',
        cardTagLabel: 'Rebate',
        cardTagTooltip: 'Rebate support for retiring an older vehicle and purchasing a qualifying EV.',
        modalOfferLabel: 'EV Offer',
        modalOfferValue: '$12,000 Vehicle Retirement',
        modalWhatIsThisOffer: 'Vehicle Retirement Consumer Assistance Program sponsored by San Joaquin Valley AQMD',
        modalProgramRules: "Valley Air District's Replace program is available to individuals whose household income is at or below 300% of the federal poverty level to support the replacement of old, polluting vehicles. The Replace program cannot be cumulated with San Joaquin Valley's Drive Clean program. Restrictions do apply if combining/stacking this program with other California incentives. Dealer registration is required to be eligible for the incentive.",
        modalDontWaitText: EV_DONT_WAIT_TEXT,
        hideExpiration: true,
        vehicleTagContent: '$12,000 for Vehicle Retirement',
      };
    case 'rebate':
      if (!/clean cars 4 all|driving clean assistance/i.test(incentive.programName)) return null;
      return {
        cardOfferLabel: '$12,000 EV Offer',
        cardProgramLabel: incentive.programName,
        cardSupportLabel: 'Charging Station',
        cardTagLabel: 'Rebate',
        cardTagTooltip: 'Rebate support for purchasing or leasing a qualifying clean vehicle.',
        modalOfferLabel: 'EV Offer',
        modalOfferValue: '$12,000 Rebate',
        modalWhatIsThisOffer: 'Driving Clean Assistance Program / Clean Cars 4 All sponsored by Pacific Gas and Electric',
        modalProgramRules: 'DCAP provides incentives for eligible low-income consumers to purchase or lease new or used clean vehicles up to $12K to those in DACs who scrap an older vehicle ($10K to those outside of DACs). The program also provides access to low-interest loans up to $45K capped at 8%. Some customers may be required to complete financing and credit counseling prior. DCAPs financial assistance pathway is only available for tier applicants. Dealer registration is required to be eligible for the incentive.',
        modalDontWaitText: EV_DONT_WAIT_TEXT,
        hideExpiration: true,
        vehicleTagContent: '$12,000 for Charging Station',
      };
    case 'bill-credit':
      return {
        cardOfferLabel: '$100 EV Offer',
        cardProgramLabel: 'SmartHome Charging',
        cardSupportLabel: 'Electricity',
        cardTagLabel: 'Bill Credit',
        cardTagTooltip: 'Bill credit support for eligible home EV charging customers.',
        modalOfferLabel: 'EV Offer',
        modalOfferValue: '$100 Bill Credit',
        modalWhatIsThisOffer: 'SmartHome Charging sponsored by Community',
        modalProgramRules: 'Ava customers who charge their EVs and PHEVs at home can join the program and earn up to $75 in one-time rewards and $25 annually per vehicle, in addition to an average of $140 annual electricity bill savings.',
        modalDontWaitText: EV_DONT_WAIT_TEXT,
        hideExpiration: true,
        vehicleTagContent: '$100 for Electricity Bill Credit',
      };
    default:
      return null;
  }
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
