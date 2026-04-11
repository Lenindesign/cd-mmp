import { getAllVehicles } from './vehicleService';
import type { Vehicle } from '../types/vehicle';

export interface CashDeal {
  id: string;
  type: 'cash';
  vehicle: Vehicle;
  incentiveValue: string;
  incentiveAmount: number;
  percentOffMsrp: string;
  expirationDate: string;
  programName: string;
  programDescription: string;
  trimsEligible: string[];
}

export interface FinanceDeal {
  id: string;
  type: 'finance';
  vehicle: Vehicle;
  apr: string;
  term: string;
  expirationDate: string;
  programName: string;
  programDescription: string;
  targetAudience: string;
  trimsEligible: string[];
}

export type Deal = CashDeal | FinanceDeal;

const CURRENT_MONTH = new Date().toLocaleString('default', { month: 'long' });
const CURRENT_YEAR = new Date().getFullYear();
const EXPIRATION_DATE = `May 1, ${CURRENT_YEAR}`;

const CASH_DEAL_DEFS: Omit<CashDeal, 'id' | 'vehicle'>[] & { make: string; model: string }[] = [
  {
    type: 'cash',
    make: 'Chevrolet',
    model: 'Trax',
    incentiveValue: '$2,000',
    incentiveAmount: 2000,
    percentOffMsrp: '8–10%',
    expirationDate: EXPIRATION_DATE,
    programName: 'Chevrolet Customer Cash',
    programDescription: '$1,500 customer cash plus $500 bonus cash on select 2026 Chevrolet Trax models. Cannot be combined with special financing.',
    trimsEligible: ['LS', '1RS', 'LT', 'ACTIV'],
  },
  {
    type: 'cash',
    make: 'Chevrolet',
    model: 'Equinox',
    incentiveValue: '$2,500',
    incentiveAmount: 2500,
    percentOffMsrp: '7–9%',
    expirationDate: EXPIRATION_DATE,
    programName: 'Chevrolet Equinox Cash Allowance',
    programDescription: 'Customer cash allowance of $2,500 on the 2026 Chevrolet Equinox. Take delivery by expiration date.',
    trimsEligible: ['LS', 'LT', 'RS'],
  },
  {
    type: 'cash',
    make: 'Chevrolet',
    model: 'Silverado',
    incentiveValue: '$3,500',
    incentiveAmount: 3500,
    percentOffMsrp: '6–8%',
    expirationDate: EXPIRATION_DATE,
    programName: 'Chevrolet Truck Month Cash Back',
    programDescription: '$3,500 customer cash on select 2026 Silverado 1500 models during Chevy Truck Month.',
    trimsEligible: ['WT', 'Custom', 'LT', 'RST', 'LT Trail Boss'],
  },
  {
    type: 'cash',
    make: 'Ford',
    model: 'F-150',
    incentiveValue: '$4,000',
    incentiveAmount: 4000,
    percentOffMsrp: '7–10%',
    expirationDate: EXPIRATION_DATE,
    programName: 'Ford Customer Cash',
    programDescription: '$4,000 customer cash back on select 2026 F-150 models. Additional trade-in assistance available.',
    trimsEligible: ['XL', 'XLT', 'Lariat'],
  },
  {
    type: 'cash',
    make: 'Ford',
    model: 'Mustang',
    incentiveValue: '$2,000',
    incentiveAmount: 2000,
    percentOffMsrp: '5–6%',
    expirationDate: EXPIRATION_DATE,
    programName: 'Ford Mustang Cash Offer',
    programDescription: '$2,000 customer cash back on 2026 Ford Mustang models. Available at participating Ford dealers.',
    trimsEligible: ['EcoBoost', 'GT'],
  },
  {
    type: 'cash',
    make: 'Hyundai',
    model: 'Tucson',
    incentiveValue: '$1,500',
    incentiveAmount: 1500,
    percentOffMsrp: '4–5%',
    expirationDate: EXPIRATION_DATE,
    programName: 'Hyundai Spring Cash Event',
    programDescription: '$1,500 customer cash on the 2026 Hyundai Tucson. Available through participating Hyundai dealers nationwide.',
    trimsEligible: ['SE', 'SEL', 'N Line', 'Limited'],
  },
  {
    type: 'cash',
    make: 'Hyundai',
    model: 'Kona',
    incentiveValue: '$1,000',
    incentiveAmount: 1000,
    percentOffMsrp: '3–4%',
    expirationDate: EXPIRATION_DATE,
    programName: 'Hyundai Kona Bonus Cash',
    programDescription: '$1,000 customer cash on the 2026 Hyundai Kona. No trade-in required.',
    trimsEligible: ['SE', 'SEL', 'Limited'],
  },
  {
    type: 'cash',
    make: 'Nissan',
    model: 'Rogue',
    incentiveValue: '$2,000',
    incentiveAmount: 2000,
    percentOffMsrp: '5–7%',
    expirationDate: EXPIRATION_DATE,
    programName: 'Nissan Customer Cash',
    programDescription: '$2,000 customer cash back on the 2026 Nissan Rogue. Plus $1,000 bonus when financing through NMAC.',
    trimsEligible: ['S', 'SV', 'SL'],
  },
  {
    type: 'cash',
    make: 'Kia',
    model: 'Seltos',
    incentiveValue: '$1,500',
    incentiveAmount: 1500,
    percentOffMsrp: '5–6%',
    expirationDate: EXPIRATION_DATE,
    programName: 'Kia Customer Cash',
    programDescription: '$1,500 customer cash on the 2026 Kia Seltos. Available at participating Kia dealers.',
    trimsEligible: ['LX', 'S', 'EX', 'SX'],
  },
  {
    type: 'cash',
    make: 'BMW',
    model: '3 Series',
    incentiveValue: '$2,500',
    incentiveAmount: 2500,
    percentOffMsrp: '4–5%',
    expirationDate: EXPIRATION_DATE,
    programName: 'BMW Loyalty Credit',
    programDescription: '$2,500 loyalty credit for current BMW owners purchasing a new 3 Series. Must currently own a BMW vehicle.',
    trimsEligible: ['330i', '330i xDrive'],
  },
  {
    type: 'cash',
    make: 'Mercedes-Benz',
    model: 'C-Class',
    incentiveValue: '$3,000',
    incentiveAmount: 3000,
    percentOffMsrp: '5–6%',
    expirationDate: EXPIRATION_DATE,
    programName: 'Mercedes-Benz Loyalty Credit',
    programDescription: '$3,000 loyalty credit for current Mercedes-Benz owners. Must currently own or lease a Mercedes-Benz vehicle.',
    trimsEligible: ['C 300', 'C 300 4MATIC'],
  },
];

const FINANCE_DEAL_DEFS: Omit<FinanceDeal, 'id' | 'vehicle'>[] & { make: string; model: string }[] = [
  {
    type: 'finance',
    make: 'Chevrolet',
    model: 'Trax',
    apr: '6.6%',
    term: '36–72 months',
    expirationDate: EXPIRATION_DATE,
    programName: 'GM Financial Special APR',
    programDescription: '6.6% APR financing for 36–72 months through GM Financial on select 2026 Trax models.',
    targetAudience: 'Well-qualified buyers with credit approval through GM Financial',
    trimsEligible: ['LS', '1RS', 'LT', 'ACTIV'],
  },
  {
    type: 'finance',
    make: 'Chevrolet',
    model: 'Equinox',
    apr: '5.9%',
    term: '36–72 months',
    expirationDate: EXPIRATION_DATE,
    programName: 'Chevrolet Special Finance Rate',
    programDescription: '5.9% APR through GM Financial on the Equinox. For well-qualified buyers.',
    targetAudience: 'Well-qualified buyers with 700+ credit score',
    trimsEligible: ['LS', 'LT', 'RS'],
  },
  {
    type: 'finance',
    make: 'Chevrolet',
    model: 'Silverado',
    apr: '4.9%',
    term: '48–72 months',
    expirationDate: EXPIRATION_DATE,
    programName: 'Silverado Low APR + Bonus Cash',
    programDescription: '4.9% APR plus $1,500 bonus cash on select 2026 Silverado 1500 models.',
    targetAudience: 'Well-qualified buyers financing through GM Financial',
    trimsEligible: ['WT', 'Custom', 'LT', 'RST'],
  },
  {
    type: 'finance',
    make: 'Toyota',
    model: 'Camry',
    apr: '4.99%',
    term: '60 months',
    expirationDate: EXPIRATION_DATE,
    programName: 'Toyota Financial Services Special APR',
    programDescription: '4.99% APR for 60 months on the 2026 Camry through Toyota Financial Services.',
    targetAudience: 'Tier 1+ credit customers through Toyota Financial Services',
    trimsEligible: ['LE', 'SE', 'XLE', 'XSE'],
  },
  {
    type: 'finance',
    make: 'Toyota',
    model: 'RAV4',
    apr: '5.49%',
    term: '60 months',
    expirationDate: EXPIRATION_DATE,
    programName: 'Toyota RAV4 Finance Offer',
    programDescription: '5.49% APR for 60 months on the 2026 RAV4. Available through Toyota Financial Services.',
    targetAudience: 'Well-qualified buyers with approved credit',
    trimsEligible: ['LE', 'XLE', 'XLE Premium'],
  },
  {
    type: 'finance',
    make: 'Honda',
    model: 'CR-V',
    apr: '5.9%',
    term: '48–60 months',
    expirationDate: EXPIRATION_DATE,
    programName: 'Honda Financial Special Rate',
    programDescription: '5.9% APR for 48–60 months through Honda Financial on the 2026 CR-V.',
    targetAudience: 'Well-qualified buyers with 700+ credit score',
    trimsEligible: ['LX', 'EX', 'EX-L'],
  },
  {
    type: 'finance',
    make: 'Honda',
    model: 'Civic',
    apr: '4.9%',
    term: '48–60 months',
    expirationDate: EXPIRATION_DATE,
    programName: 'Honda Civic Finance Special',
    programDescription: '4.9% APR for 48–60 months on the 2026 Honda Civic through Honda Financial Services.',
    targetAudience: 'Well-qualified buyers through Honda Financial Services',
    trimsEligible: ['LX', 'Sport', 'EX'],
  },
  {
    type: 'finance',
    make: 'Ford',
    model: 'F-150',
    apr: '3.9%',
    term: '60–72 months',
    expirationDate: EXPIRATION_DATE,
    programName: 'Ford Credit Low APR',
    programDescription: '3.9% APR plus $2,000 bonus cash on select 2026 F-150 models through Ford Credit.',
    targetAudience: 'Well-qualified buyers financing through Ford Credit',
    trimsEligible: ['XL', 'XLT', 'Lariat'],
  },
  {
    type: 'finance',
    make: 'Ford',
    model: 'Mustang',
    apr: '5.9%',
    term: '48–60 months',
    expirationDate: EXPIRATION_DATE,
    programName: 'Ford Mustang Finance Offer',
    programDescription: '5.9% APR through Ford Credit on the 2026 Mustang. For well-qualified buyers.',
    targetAudience: 'Well-qualified buyers financing through Ford Credit',
    trimsEligible: ['EcoBoost', 'GT'],
  },
  {
    type: 'finance',
    make: 'Hyundai',
    model: 'Tucson',
    apr: '4.9%',
    term: '60 months',
    expirationDate: EXPIRATION_DATE,
    programName: 'Hyundai Motor Finance Special APR',
    programDescription: '4.9% APR for 60 months on the Tucson through Hyundai Motor Finance. Includes complimentary maintenance.',
    targetAudience: 'Well-qualified buyers with 720+ credit score',
    trimsEligible: ['SE', 'SEL', 'N Line'],
  },
  {
    type: 'finance',
    make: 'Hyundai',
    model: 'Kona',
    apr: '5.49%',
    term: '48–60 months',
    expirationDate: EXPIRATION_DATE,
    programName: 'Hyundai Kona Finance Rate',
    programDescription: '5.49% APR through Hyundai Motor Finance on the 2026 Kona.',
    targetAudience: 'Well-qualified buyers with approved credit',
    trimsEligible: ['SE', 'SEL', 'Limited'],
  },
  {
    type: 'finance',
    make: 'Kia',
    model: 'Seltos',
    apr: '4.9%',
    term: '60 months',
    expirationDate: EXPIRATION_DATE,
    programName: 'Kia Finance America Special APR',
    programDescription: '4.9% APR for 60 months on the Kia Seltos through Kia Finance America.',
    targetAudience: 'Well-qualified buyers through Kia Finance America',
    trimsEligible: ['LX', 'S', 'EX'],
  },
  {
    type: 'finance',
    make: 'Nissan',
    model: 'Rogue',
    apr: '4.9%',
    term: '60 months',
    expirationDate: EXPIRATION_DATE,
    programName: 'Nissan Now Finance Offer',
    programDescription: '4.9% APR plus $1,000 bonus cash on the 2026 Rogue through NMAC.',
    targetAudience: 'Well-qualified buyers with Tier 1 credit',
    trimsEligible: ['S', 'SV', 'SL'],
  },
  {
    type: 'finance',
    make: 'BMW',
    model: '3 Series',
    apr: '4.99%',
    term: '36–60 months',
    expirationDate: EXPIRATION_DATE,
    programName: 'BMW Financial Services Special Rate',
    programDescription: '4.99% APR through BMW Financial Services on select 3 Series models.',
    targetAudience: 'Well-qualified buyers through BMW Financial Services',
    trimsEligible: ['330i', '330i xDrive'],
  },
];

function matchVehicle(make: string, model: string): Vehicle | undefined {
  return getAllVehicles().find(
    (v) =>
      v.make.toLowerCase() === make.toLowerCase() &&
      v.model.toLowerCase() === model.toLowerCase() &&
      parseInt(v.year) >= 2026
  );
}

export const getCashDeals = (): CashDeal[] => {
  const deals: CashDeal[] = [];
  for (const def of CASH_DEAL_DEFS) {
    const vehicle = matchVehicle(def.make, def.model);
    if (vehicle) {
      deals.push({
        id: `cash-deal-${vehicle.id}`,
        type: 'cash',
        vehicle,
        incentiveValue: def.incentiveValue,
        incentiveAmount: def.incentiveAmount,
        percentOffMsrp: def.percentOffMsrp,
        expirationDate: def.expirationDate,
        programName: def.programName,
        programDescription: def.programDescription,
        trimsEligible: def.trimsEligible,
      });
    }
  }
  return deals.sort((a, b) => b.incentiveAmount - a.incentiveAmount);
};

export const getFinanceDeals = (): FinanceDeal[] => {
  const deals: FinanceDeal[] = [];
  for (const def of FINANCE_DEAL_DEFS) {
    const vehicle = matchVehicle(def.make, def.model);
    if (vehicle) {
      deals.push({
        id: `finance-deal-${vehicle.id}`,
        type: 'finance',
        vehicle,
        apr: def.apr,
        term: def.term,
        expirationDate: def.expirationDate,
        programName: def.programName,
        programDescription: def.programDescription,
        targetAudience: def.targetAudience,
        trimsEligible: def.trimsEligible,
      });
    }
  }
  return deals;
};

export const getAllDeals = (): Deal[] => {
  return [...getCashDeals(), ...getFinanceDeals()];
};

export const getCurrentPeriod = (): { month: string; year: number } => ({
  month: CURRENT_MONTH,
  year: CURRENT_YEAR,
});
