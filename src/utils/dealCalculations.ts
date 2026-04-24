import { getVehiclesByBodyStyle } from '../services/vehicleService';
import { getZeroAprDeals } from '../services/zeroAprDealsService';
import { getCashDeals, getFinanceDeals } from '../services/cashFinanceDealsService';
import { getLeaseDeals } from '../services/leaseDealsService';

// Re-export incentive functions from the unified adapter so every consumer
// that imports from `dealCalculations` keeps working with zero changes.
export {
  getVehicleOffers,
  offersToIncentives,
  findMatchingIncentiveId,
} from '../services/incentiveAdapter';
export type { VehicleOfferSummary } from '../services/incentiveAdapter';

export const AVG_MARKET_APR = 6.5;
export const AVG_LOAN_TERM = 60;

export const TERM_OPTIONS = [12, 24, 36, 48, 60, 72] as const;

export type CreditTier = 'excellent' | 'good' | 'fair' | 'all';

export const CREDIT_TIERS: { value: CreditTier; label: string; minScore: number }[] = [
  { value: 'excellent', label: 'Excellent (720+)', minScore: 720 },
  { value: 'good', label: 'Good (680–719)', minScore: 680 },
  { value: 'fair', label: 'Fair (620–679)', minScore: 620 },
  { value: 'all', label: 'All Credit', minScore: 0 },
];

export function inferCreditTier(targetAudience: string): CreditTier {
  if (/720\+|750\+|Tier 1\+?/i.test(targetAudience)) return 'excellent';
  if (/700\+|well-qualified/i.test(targetAudience)) return 'good';
  if (/all buyers|no special credit/i.test(targetAudience)) return 'all';
  return 'good';
}

export function creditTierQualifies(dealTier: CreditTier, userTier: CreditTier): boolean {
  if (userTier === 'all') return true;
  if (dealTier === 'all') return true;
  const rank: Record<CreditTier, number> = { excellent: 3, good: 2, fair: 1, all: 0 };
  return rank[userTier] >= rank[dealTier];
}

export function parseMsrpMin(priceRange: string): number {
  const cleaned = priceRange.replace(/[^0-9,\-–]/g, '').split(/[-–]/)[0]?.replace(/,/g, '') || '0';
  return parseInt(cleaned, 10);
}

export function calcMonthly(principal: number, aprPercent: number, months: number): number {
  if (months <= 0) return 0;
  if (aprPercent === 0) return Math.round(principal / months);
  const r = aprPercent / 100 / 12;
  return Math.round(principal * (r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1));
}

export function parseTermMonths(term: string): number {
  const match = term.match(/(\d+)/);
  return match ? parseInt(match[1], 10) : 60;
}

const segmentAvgCache = new Map<string, number>();
export function getSegmentAvgMonthly(bodyStyle: string): number {
  const key = bodyStyle.toLowerCase();
  if (segmentAvgCache.has(key)) return segmentAvgCache.get(key)!;
  const vehicles = getVehiclesByBodyStyle(bodyStyle);
  if (vehicles.length === 0) {
    segmentAvgCache.set(key, 500);
    return 500;
  }
  const avgMsrp = vehicles.reduce((sum, v) => sum + v.priceMin, 0) / vehicles.length;
  const avg = calcMonthly(avgMsrp, AVG_MARKET_APR, AVG_LOAN_TERM);
  segmentAvgCache.set(key, avg);
  return avg;
}

export function buildSavingsText(
  dealMonthly: number,
  bodyStyle: string,
  dealType?: string,
): { savingsVsAvg: string; savingsTooltip: string } {
  const segAvg = getSegmentAvgMonthly(bodyStyle);
  const diff = segAvg - dealMonthly;
  const absDiff = Math.abs(diff);

  let savingsVsAvg: string;
  if (absDiff < 10) {
    savingsVsAvg = 'Near avg.';
  } else if (diff > 0) {
    savingsVsAvg = `$${absDiff.toLocaleString()}/mo. below avg.`;
  } else {
    savingsVsAvg = `$${absDiff.toLocaleString()}/mo. above avg.`;
  }

  const tooltipMap: Record<string, string> = {
    'zero-apr': `Comparison based on the median payment for similar ${bodyStyle}s financed at the avg. market rate of ${AVG_MARKET_APR}% over ${AVG_LOAN_TERM} months. This deal's 0% APR eliminates interest entirely.`,
    'cash': `Comparison based on the median payment for similar ${bodyStyle}s at ${AVG_MARKET_APR}% over ${AVG_LOAN_TERM} months. Cash back is applied before financing, lowering the principal.`,
    'finance': `Comparison based on the median payment for similar ${bodyStyle}s at the avg. market rate of ${AVG_MARKET_APR}% over ${AVG_LOAN_TERM} months. This deal offers a below-market rate.`,
    'lease': `Comparison based on the median lease payment estimate for similar ${bodyStyle}s with a 36-month term and 12,000 annual mile lease.`,
  };

  const fallback = absDiff < 10
    ? `Estimated payment is close to the segment average of $${segAvg}/mo.`
    : `Compared to the median payment for similar ${bodyStyle}s financed at ${AVG_MARKET_APR}% over ${AVG_LOAN_TERM} months ($${segAvg}/mo).`;

  return { savingsVsAvg, savingsTooltip: (dealType && tooltipMap[dealType]) || fallback };
}

/**
 * Sort a deals array based on the filter modal's sortBy value.
 * Each deal needs: vehicle.make, vehicle.model, expirationDate, rating.
 * Lease-specific sorts need: monthlyPaymentNum, dueAtSigningNum.
 */
export function sortDeals<T extends {
  vehicle: { make: string; model: string };
  expirationDate: string;
  rating: number;
  monthlyPaymentNum?: number;
  estimatedMonthly?: number;
  dueAtSigningNum?: number;
  apr?: number | string;
}>(deals: T[], sortBy: string): T[] {
  const sorted = [...deals];
  switch (sortBy) {
    case 'a-z':
      return sorted.sort((a, b) =>
        `${a.vehicle.make} ${a.vehicle.model}`.localeCompare(`${b.vehicle.make} ${b.vehicle.model}`),
      );
    case 'expiring-soon':
      return sorted.sort((a, b) =>
        new Date(a.expirationDate).getTime() - new Date(b.expirationDate).getTime(),
      );
    case 'rating-high':
      return sorted.sort((a, b) => b.rating - a.rating);
    case 'payment-low':
      return sorted.sort((a, b) =>
        (a.monthlyPaymentNum ?? a.estimatedMonthly ?? Infinity) -
        (b.monthlyPaymentNum ?? b.estimatedMonthly ?? Infinity),
      );
    case 'cash-down-low':
      return sorted.sort((a, b) => (a.dueAtSigningNum ?? Infinity) - (b.dueAtSigningNum ?? Infinity));
    case 'apr-zero-first': {
      const toNum = (v: string | number | undefined): number =>
        v == null ? Infinity : typeof v === 'string' ? parseFloat(v) || Infinity : v;
      return sorted.sort((a, b) => {
        const aIsZero = toNum(a.apr) === 0 ? 0 : 1;
        const bIsZero = toNum(b.apr) === 0 ? 0 : 1;
        if (aIsZero !== bIsZero) return aIsZero - bIsZero;
        return `${a.vehicle.make} ${a.vehicle.model}`.localeCompare(`${b.vehicle.make} ${b.vehicle.model}`);
      });
    }
    default:
      return sorted;
  }
}

/**
 * Apply monthly payment and due-at-signing range filters to lease deals.
 */
export function applyLeaseRangeFilters<T extends {
  monthlyPaymentNum?: number;
  dueAtSigningNum?: number;
}>(
  deals: T[],
  paymentMin: number,
  paymentMax: number,
  signingMin: number,
  signingMax: number,
): T[] {
  return deals.filter(d => {
    if (d.monthlyPaymentNum != null) {
      if (d.monthlyPaymentNum < paymentMin || d.monthlyPaymentNum > paymentMax) return false;
    }
    if (d.dueAtSigningNum != null) {
      if (d.dueAtSigningNum < signingMin || d.dueAtSigningNum > signingMax) return false;
    }
    return true;
  });
}

export interface GlobalDealCounts {
  all: number;
  lease: number;
  finance: number;
  cash: number;
}

let cachedCounts: GlobalDealCounts | null = null;

export function getGlobalDealCounts(): GlobalDealCounts {
  if (cachedCounts) return cachedCounts;
  const leaseCount = getLeaseDeals().length;
  const zeroAprCount = getZeroAprDeals().length;
  const financeCount = getFinanceDeals().length;
  const cashCount = getCashDeals().length;
  cachedCounts = {
    all: leaseCount + zeroAprCount + financeCount + cashCount,
    lease: leaseCount,
    finance: zeroAprCount + financeCount,
    cash: cashCount,
  };
  return cachedCounts;
}
