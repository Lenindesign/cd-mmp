import { getAllVehicles } from './vehicleService';
import type { Vehicle } from '../types/vehicle';

export interface LeaseDeal {
  id: string;
  vehicle: Vehicle;
  monthlyPayment: string;
  monthlyPaymentNum: number;
  term: string;
  dueAtSigning: string;
  mileageAllowance: string;
  expirationDate: string;
  programName: string;
  programDescription: string;
  trimsEligible: string[];
}

const CURRENT_MONTH = new Date().toLocaleString('default', { month: 'long' });
const CURRENT_YEAR = new Date().getFullYear();
const EXPIRATION_DATE = `April 1, ${CURRENT_YEAR}`;

const LEASE_DEAL_DEFS: (Omit<LeaseDeal, 'id' | 'vehicle'> & { make: string; model: string })[] = [
  {
    make: 'Chevrolet',
    model: 'Trax',
    monthlyPayment: '$299',
    monthlyPaymentNum: 299,
    term: '24 months',
    dueAtSigning: '$1,879',
    mileageAllowance: '10,000 mi/yr',
    expirationDate: EXPIRATION_DATE,
    programName: 'Chevrolet Trax Ultra-Low Mileage Lease',
    programDescription: 'Ultra low-mileage lease for 24 months with $1,879 due at signing. No security deposit required.',
    trimsEligible: ['LS', '1RS'],
  },
  {
    make: 'Chevrolet',
    model: 'Equinox',
    monthlyPayment: '$329',
    monthlyPaymentNum: 329,
    term: '36 months',
    dueAtSigning: '$2,499',
    mileageAllowance: '10,000 mi/yr',
    expirationDate: EXPIRATION_DATE,
    programName: 'Chevrolet Equinox Lease Special',
    programDescription: 'Lease a new Equinox for 36 months with competitive due at signing. Available through GM Financial.',
    trimsEligible: ['LS', 'LT'],
  },
  {
    make: 'Toyota',
    model: 'Camry',
    monthlyPayment: '$329',
    monthlyPaymentNum: 329,
    term: '36 months',
    dueAtSigning: '$2,999',
    mileageAllowance: '10,000 mi/yr',
    expirationDate: EXPIRATION_DATE,
    programName: 'Toyota Camry Lease Offer',
    programDescription: 'Lease a new Camry LE for 36 months through Toyota Financial Services. $2,999 due at signing.',
    trimsEligible: ['LE', 'SE'],
  },
  {
    make: 'Toyota',
    model: 'RAV4',
    monthlyPayment: '$359',
    monthlyPaymentNum: 359,
    term: '36 months',
    dueAtSigning: '$2,799',
    mileageAllowance: '10,000 mi/yr',
    expirationDate: EXPIRATION_DATE,
    programName: 'Toyota RAV4 Lease Special',
    programDescription: 'Lease a new RAV4 LE for 36 months. $2,799 due at signing through Toyota Financial Services.',
    trimsEligible: ['LE', 'XLE'],
  },
  {
    make: 'Honda',
    model: 'CR-V',
    monthlyPayment: '$369',
    monthlyPaymentNum: 369,
    term: '36 months',
    dueAtSigning: '$3,499',
    mileageAllowance: '10,000 mi/yr',
    expirationDate: EXPIRATION_DATE,
    programName: 'Honda CR-V Lease Offer',
    programDescription: 'Lease a 2025 CR-V LX for 36 months. $3,499 due at signing through Honda Financial Services.',
    trimsEligible: ['LX', 'EX'],
  },
  {
    make: 'Honda',
    model: 'Civic',
    monthlyPayment: '$289',
    monthlyPaymentNum: 289,
    term: '36 months',
    dueAtSigning: '$2,499',
    mileageAllowance: '10,000 mi/yr',
    expirationDate: EXPIRATION_DATE,
    programName: 'Honda Civic Lease Special',
    programDescription: 'Lease a 2025 Civic LX for 36 months. $2,499 due at signing through Honda Financial Services.',
    trimsEligible: ['LX', 'Sport'],
  },
  {
    make: 'Hyundai',
    model: 'Tucson',
    monthlyPayment: '$339',
    monthlyPaymentNum: 339,
    term: '36 months',
    dueAtSigning: '$2,999',
    mileageAllowance: '10,000 mi/yr',
    expirationDate: EXPIRATION_DATE,
    programName: 'Hyundai Tucson Lease Event',
    programDescription: 'Lease a new Tucson SE for 36 months. $2,999 due at signing through Hyundai Motor Finance.',
    trimsEligible: ['SE', 'SEL'],
  },
  {
    make: 'Nissan',
    model: 'Rogue',
    monthlyPayment: '$349',
    monthlyPaymentNum: 349,
    term: '36 months',
    dueAtSigning: '$2,799',
    mileageAllowance: '10,000 mi/yr',
    expirationDate: EXPIRATION_DATE,
    programName: 'Nissan Rogue Lease Offer',
    programDescription: 'Lease a new Rogue S for 36 months. $2,799 due at signing through NMAC.',
    trimsEligible: ['S', 'SV'],
  },
  {
    make: 'Kia',
    model: 'Seltos',
    monthlyPayment: '$279',
    monthlyPaymentNum: 279,
    term: '36 months',
    dueAtSigning: '$2,299',
    mileageAllowance: '10,000 mi/yr',
    expirationDate: EXPIRATION_DATE,
    programName: 'Kia Seltos Lease Special',
    programDescription: 'Lease a new Seltos LX for 36 months. $2,299 due at signing through Kia Finance America.',
    trimsEligible: ['LX', 'S'],
  },
];

export const getLeaseDeals = (): LeaseDeal[] => {
  const allVehicles = getAllVehicles();
  const deals: LeaseDeal[] = [];
  for (const def of LEASE_DEAL_DEFS) {
    const vehicle = allVehicles.find(
      (v) =>
        v.make.toLowerCase() === def.make.toLowerCase() &&
        v.model.toLowerCase() === def.model.toLowerCase() &&
        parseInt(v.year) >= 2024
    );
    if (vehicle) {
      deals.push({
        id: `lease-deal-${vehicle.id}`,
        vehicle,
        monthlyPayment: def.monthlyPayment,
        monthlyPaymentNum: def.monthlyPaymentNum,
        term: def.term,
        dueAtSigning: def.dueAtSigning,
        mileageAllowance: def.mileageAllowance,
        expirationDate: def.expirationDate,
        programName: def.programName,
        programDescription: def.programDescription,
        trimsEligible: def.trimsEligible,
      });
    }
  }
  return deals.sort((a, b) => a.monthlyPaymentNum - b.monthlyPaymentNum);
};

export const getCurrentPeriod = (): { month: string; year: number } => ({
  month: CURRENT_MONTH,
  year: CURRENT_YEAR,
});
