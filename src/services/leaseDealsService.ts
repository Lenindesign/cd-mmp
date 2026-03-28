import type { Vehicle } from '../types/vehicle';
import {
  getMergedFuelIncentives,
  resolveVehicleFromIncentive,
  isPromotedDealModelYear,
} from './fuelIncentivesDataset';
import type { MergedFuelIncentive } from './fuelIncentivesDataset';

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

function leaseMonthlyNum(m: MergedFuelIncentive): number {
  const a = m.monthlyLeasePayment;
  const b = m.monthlyPayment;
  if (Number.isFinite(a) && a > 0) return Math.round(a);
  if (Number.isFinite(b) && b > 0) return Math.round(b);
  return 0;
}

function isLeaseRow(m: MergedFuelIncentive): boolean {
  if (m.offerType !== 'lease') return false;
  return leaseMonthlyNum(m) > 0;
}

function leaseId(m: MergedFuelIncentive): string {
  const match = m.termRaw.trim().match(/(\d+)/);
  const termMo = match ? parseInt(match[1], 10) : 60;
  return `lease-${m.vdatModelId}-${m.year.trim()}-${termMo}`;
}

export const getLeaseDeals = (): LeaseDeal[] => {
  return getMergedFuelIncentives()
    .filter(isLeaseRow)
    .filter((m) => isPromotedDealModelYear(m.year))
    .map((m): LeaseDeal => {
      const n = leaseMonthlyNum(m);
      const vehicle = resolveVehicleFromIncentive(m);
      return {
        id: leaseId(m),
        vehicle,
        monthlyPayment: `$${n.toLocaleString()}`,
        monthlyPaymentNum: n,
        term: m.termDisplay,
        dueAtSigning: 'See dealer',
        mileageAllowance: 'See program details',
        expirationDate: m.expirationDisplay,
        programName: m.programName,
        programDescription: m.programDescription || m.programName,
        trimsEligible: m.trimsEligible,
      };
    })
    .sort((a, b) => a.monthlyPaymentNum - b.monthlyPaymentNum);
};
