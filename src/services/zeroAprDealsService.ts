import { getAllVehicles } from './vehicleService';
import type { Vehicle } from '../types/vehicle';

export interface ZeroAprDeal {
  id: string;
  vehicle: Vehicle;
  apr: number;
  term: string;
  expirationDate: string;
  programName: string;
  programDescription: string;
  targetAudience: string;
  trimsEligible: string[];
}

const CURRENT_MONTH = new Date().toLocaleString('default', { month: 'long' });
const CURRENT_YEAR = new Date().getFullYear();
const EXPIRATION_DATE = `April 1, ${CURRENT_YEAR}`;

const DEAL_DEFINITIONS: {
  make: string;
  model: string;
  term: string;
  programName: string;
  programDescription: string;
  targetAudience: string;
  trimsEligible: string[];
}[] = [
  {
    make: 'Chevrolet',
    model: 'Equinox',
    term: '60 months',
    programName: 'Chevrolet 0% APR Event',
    programDescription: 'Get 0% APR financing for up to 60 months on the all-new Chevrolet Equinox through GM Financial. No down payment required for well-qualified buyers.',
    targetAudience: 'Well-qualified buyers with 720+ credit score',
    trimsEligible: ['LS', 'LT', 'RS'],
  },
  {
    make: 'Chevrolet',
    model: 'Trax',
    term: '48 months',
    programName: 'Chevrolet Spring Sales Event',
    programDescription: 'Take advantage of 0% APR financing for 48 months on the 2025 Chevrolet Trax through GM Financial.',
    targetAudience: 'Well-qualified buyers with 700+ credit score',
    trimsEligible: ['LS', '1RS', 'LT', 'ACTIV'],
  },
  {
    make: 'Chevrolet',
    model: 'Silverado',
    term: '72 months',
    programName: 'Chevrolet Truck Month',
    programDescription: 'Chevrolet Truck Month brings 0% APR for 72 months on select Silverado 1500 models. Plus $1,000 bonus cash.',
    targetAudience: 'Well-qualified buyers financing through GM Financial',
    trimsEligible: ['WT', 'Custom', 'LT', 'RST'],
  },
  {
    make: 'Toyota',
    model: 'Camry',
    term: '60 months',
    programName: 'Toyota Special Finance Offer',
    programDescription: 'Toyota Financial Services is offering 0% APR for 60 months on the popular Camry sedan. Available at participating dealers.',
    targetAudience: 'Tier 1+ credit customers through Toyota Financial Services',
    trimsEligible: ['LE', 'SE', 'XLE', 'XSE'],
  },
  {
    make: 'Toyota',
    model: 'RAV4',
    term: '48 months',
    programName: 'Toyota RAV4 Spring Special',
    programDescription: '0% APR financing for 48 months on America\'s best-selling SUV. Limited-time offer through Toyota Financial Services.',
    targetAudience: 'Well-qualified buyers with approved credit',
    trimsEligible: ['LE', 'XLE', 'XLE Premium'],
  },
  {
    make: 'Honda',
    model: 'CR-V',
    term: '60 months',
    programName: 'Honda Dream Deal',
    programDescription: 'Honda is offering 0% APR for 60 months on the CR-V, the benchmark compact SUV. Available through Honda Financial Services.',
    targetAudience: 'Well-qualified buyers with 700+ credit score',
    trimsEligible: ['LX', 'EX', 'EX-L'],
  },
  {
    make: 'Honda',
    model: 'Civic',
    term: '60 months',
    programName: 'Honda Civic Spring Event',
    programDescription: 'Finance the all-new Civic at 0% APR for 60 months through Honda Financial Services. America\'s favorite compact sedan.',
    targetAudience: 'Well-qualified buyers through Honda Financial Services',
    trimsEligible: ['LX', 'Sport', 'EX'],
  },
  {
    make: 'Ford',
    model: 'F-150',
    term: '72 months',
    programName: 'Ford Truck Season',
    programDescription: 'Ford is offering 0% APR for 72 months on select F-150 models during Truck Season. Combined with $500 bonus cash.',
    targetAudience: 'Well-qualified buyers financing through Ford Credit',
    trimsEligible: ['XL', 'XLT', 'Lariat'],
  },
  {
    make: 'Hyundai',
    model: 'Tucson',
    term: '60 months',
    programName: 'Hyundai Spring Savings Event',
    programDescription: '0% APR for 60 months on the Hyundai Tucson through Hyundai Motor Finance. Includes complimentary maintenance.',
    targetAudience: 'Well-qualified buyers with 720+ credit score',
    trimsEligible: ['SE', 'SEL', 'N Line'],
  },
  {
    make: 'Hyundai',
    model: 'Kona',
    term: '48 months',
    programName: 'Hyundai Kona Special APR',
    programDescription: 'Finance the fun-to-drive Kona at 0% APR for 48 months. Available through Hyundai Motor Finance at participating dealers.',
    targetAudience: 'Well-qualified buyers with approved credit',
    trimsEligible: ['SE', 'SEL', 'Limited'],
  },
  {
    make: 'Kia',
    model: 'Seltos',
    term: '60 months',
    programName: 'Kia Spring Clearance',
    programDescription: '0% APR for 60 months on the versatile Kia Seltos. Available through Kia Finance America at participating dealers.',
    targetAudience: 'Well-qualified buyers through Kia Finance America',
    trimsEligible: ['LX', 'S', 'EX'],
  },
  {
    make: 'Nissan',
    model: 'Rogue',
    term: '60 months',
    programName: 'Nissan Now Sales Event',
    programDescription: 'Get 0% APR for 60 months on the Nissan Rogue through Nissan Motor Acceptance Corporation. Limited availability.',
    targetAudience: 'Well-qualified buyers with Tier 1 credit',
    trimsEligible: ['S', 'SV', 'SL'],
  },
];

export const getZeroAprDeals = (): ZeroAprDeal[] => {
  const allVehicles = getAllVehicles();
  const deals: ZeroAprDeal[] = [];

  for (const def of DEAL_DEFINITIONS) {
    const vehicle = allVehicles.find(
      (v) =>
        v.make.toLowerCase() === def.make.toLowerCase() &&
        v.model.toLowerCase() === def.model.toLowerCase() &&
        parseInt(v.year) >= 2024
    );

    if (vehicle) {
      deals.push({
        id: `zero-apr-${vehicle.id}`,
        vehicle,
        apr: 0,
        term: def.term,
        expirationDate: EXPIRATION_DATE,
        programName: def.programName,
        programDescription: def.programDescription,
        targetAudience: def.targetAudience,
        trimsEligible: def.trimsEligible,
      });
    }
  }

  return deals;
};

export const getCurrentPeriod = (): { month: string; year: number } => ({
  month: CURRENT_MONTH,
  year: CURRENT_YEAR,
});
