import type { Vehicle } from '../types/vehicle';
import {
  getMergedFuelIncentives,
  buildAudience,
  loanApr,
  resolveVehicleFromIncentive,
  isPromotedDealModelYear,
} from './fuelIncentivesDataset';
import type { MergedFuelIncentive } from './fuelIncentivesDataset';

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

function isZeroAprLoan(m: MergedFuelIncentive): boolean {
  if (m.offerType !== 'loan') return false;
  return loanApr(m) === 0;
}

/** Stable id: matches merge bucket (make + model + year + term), not vdatModelId. */
function zeroAprId(m: MergedFuelIncentive): string {
  const match = m.termRaw.trim().match(/(\d+)/);
  const termMo = match ? parseInt(match[1], 10) : 60;
  const mk = m.make.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const md = m.model.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  return `zero-apr-${mk}-${md}-${m.year.trim()}-${termMo}`;
}

/** Estimated monthly at 0% APR using catalog/CSV MSRP floor and advertised term (matches card math). */
function estimatedZeroAprMonthly(vehicle: Vehicle, termDisplay: string): number {
  const termMatch = termDisplay.match(/(\d+)/);
  const months = termMatch ? parseInt(termMatch[1], 10) : 60;
  const principal =
    vehicle.priceMin > 0 ? vehicle.priceMin : vehicle.priceMax > 0 ? vehicle.priceMax : 0;
  if (months <= 0 || principal <= 0) return Number.POSITIVE_INFINITY;
  return Math.round(principal / months);
}

export const getZeroAprDeals = (): ZeroAprDeal[] => {
  return getMergedFuelIncentives()
    .filter(isZeroAprLoan)
    .filter((m) => isPromotedDealModelYear(m.year))
    .map((m): ZeroAprDeal => {
      const vehicle = resolveVehicleFromIncentive(m);
      return {
        id: zeroAprId(m),
        vehicle,
        apr: 0,
        term: m.termDisplay,
        expirationDate: m.expirationDisplay,
        programName: m.programName,
        programDescription: m.programDescription || m.programName,
        targetAudience: buildAudience(m),
        trimsEligible: m.trimsEligible,
      };
    })
    .sort(
      (a, b) =>
        estimatedZeroAprMonthly(a.vehicle, a.term) - estimatedZeroAprMonthly(b.vehicle, b.term),
    );
};
