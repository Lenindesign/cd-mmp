import type { Vehicle } from '../types/vehicle';
import {
  getMergedFuelIncentives,
  buildAudience,
  loanApr,
  resolveVehicleFromIncentive,
  isPromotedDealModelYear,
} from './fuelIncentivesDataset';
import type { MergedFuelIncentive } from './fuelIncentivesDataset';

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

const maxFinanceAprDisplay = 12;

function firstTermMonths(termDisplay: string): number {
  const m = termDisplay.match(/(\d+)/);
  return m ? parseInt(m[1], 10) : 60;
}

/** Match `dealCalculations.calcMonthly` without importing (avoids circular deps). */
function calcMonthlyPayment(principal: number, aprPercent: number, months: number): number {
  if (months <= 0) return 0;
  if (aprPercent === 0) return Math.round(principal / months);
  const r = aprPercent / 100 / 12;
  return Math.round(
    (principal * (r * Math.pow(1 + r, months))) / (Math.pow(1 + r, months) - 1),
  );
}

function financeDealEstimatedMonthly(d: FinanceDeal): number {
  const months = firstTermMonths(d.term);
  const principal =
    d.vehicle.priceMin > 0 ? d.vehicle.priceMin : d.vehicle.priceMax > 0 ? d.vehicle.priceMax : 0;
  const apr = parseFloat(d.apr.replace('%', ''));
  if (!Number.isFinite(apr) || months <= 0 || principal <= 0) return Number.POSITIVE_INFINITY;
  return calcMonthlyPayment(principal, apr, months);
}

function isCashOffer(m: MergedFuelIncentive): boolean {
  return m.offerType === 'cash' && Number.isFinite(m.amount) && m.amount > 0;
}

function isFinanceOffer(m: MergedFuelIncentive): boolean {
  if (m.offerType !== 'loan') return false;
  const rate = loanApr(m);
  if (rate === null || rate === 0) return false;
  return rate > 0 && rate <= maxFinanceAprDisplay;
}

export const getCashDeals = (): CashDeal[] => {
  return getMergedFuelIncentives()
    .filter(isCashOffer)
    .filter((m) => isPromotedDealModelYear(m.year))
    .map((m): CashDeal => {
      const vehicle = resolveVehicleFromIncentive(m);
      const amt = m.amount;
      const pct =
        m.msrp > 0 && amt > 0
          ? `${Math.round((amt / m.msrp) * 1000) / 10}%`
          : '—';
      return {
        id: `cash-${m.programId}-${m.vdatModelId}`,
        type: 'cash',
        vehicle,
        incentiveValue: `$${Math.round(amt).toLocaleString()}`,
        incentiveAmount: amt,
        percentOffMsrp: pct,
        expirationDate: m.expirationDisplay,
        programName: m.programName,
        programDescription: m.programDescription || m.programName,
        trimsEligible: m.trimsEligible,
      };
    })
    .sort((a, b) => b.incentiveAmount - a.incentiveAmount);
};

export const getFinanceDeals = (): FinanceDeal[] => {
  return getMergedFuelIncentives()
    .filter(isFinanceOffer)
    .filter((m) => isPromotedDealModelYear(m.year))
    .map((m): FinanceDeal => {
      const rate = loanApr(m)!;
      const aprStr = `${rate % 1 === 0 ? rate.toFixed(0) : rate.toFixed(2)}%`;
      const vehicle = resolveVehicleFromIncentive(m);
      return {
        id: `finance-${m.programId}-${m.vdatModelId}`,
        type: 'finance',
        vehicle,
        apr: aprStr,
        term: m.termDisplay,
        expirationDate: m.expirationDisplay,
        programName: m.programName,
        programDescription: m.programDescription || m.programName,
        targetAudience: buildAudience(m),
        trimsEligible: m.trimsEligible,
      };
    })
    .sort((a, b) => financeDealEstimatedMonthly(a) - financeDealEstimatedMonthly(b));
};

export const getAllDeals = (): Deal[] => {
  return [...getCashDeals(), ...getFinanceDeals()];
};
