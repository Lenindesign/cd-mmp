import { getVehiclesByBodyStyle } from '../services/vehicleService';
import { getZeroAprDeals } from '../services/zeroAprDealsService';
import { getCashDeals, getFinanceDeals } from '../services/cashFinanceDealsService';
import { getLeaseDeals } from '../services/leaseDealsService';

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

export interface VehicleOfferSummary {
  type: 'zero-apr' | 'cash' | 'finance' | 'lease';
  label: string;
  expires: string;
}

const offerCache = new Map<string, VehicleOfferSummary[]>();

export function getVehicleOffers(make: string, model: string): VehicleOfferSummary[] {
  const key = `${make.toLowerCase()}-${model.toLowerCase()}`;
  if (offerCache.has(key)) return offerCache.get(key)!;

  const offers: VehicleOfferSummary[] = [];
  const mk = make.toLowerCase();
  const md = model.toLowerCase();

  for (const d of getZeroAprDeals()) {
    if (d.vehicle.make.toLowerCase() === mk && d.vehicle.model.toLowerCase() === md) {
      offers.push({ type: 'zero-apr', label: `0% APR for ${d.term}`, expires: d.expirationDate });
    }
  }
  for (const d of getCashDeals()) {
    if (d.vehicle.make.toLowerCase() === mk && d.vehicle.model.toLowerCase() === md) {
      offers.push({ type: 'cash', label: `${d.incentiveValue} Cash Back`, expires: d.expirationDate });
    }
  }
  for (const d of getFinanceDeals()) {
    if (d.vehicle.make.toLowerCase() === mk && d.vehicle.model.toLowerCase() === md) {
      offers.push({ type: 'finance', label: `${d.apr} APR for ${d.term}`, expires: d.expirationDate });
    }
  }
  for (const d of getLeaseDeals()) {
    if (d.vehicle.make.toLowerCase() === mk && d.vehicle.model.toLowerCase() === md) {
      offers.push({ type: 'lease', label: `${d.monthlyPayment}/mo Lease`, expires: d.expirationDate });
    }
  }

  offerCache.set(key, offers);
  return offers;
}

/**
 * Convert VehicleOfferSummary[] into the Incentive shape used by IncentivesModal's
 * allIncentives prop, so deals pages and the Hero modal show the same offers.
 */
export function offersToIncentives(make: string, model: string): {
  id: string; type: 'cash' | 'finance' | 'lease' | 'special';
  title: string; description: string; value: string; expirationDate: string;
  terms?: string; eligibility?: string;
}[] {
  const offers = getVehicleOffers(make, model);
  return offers.map((o, i) => {
    const type = o.type === 'zero-apr' ? 'finance' as const : o.type;
    let description: string;
    let terms: string | undefined;

    if (o.type === 'zero-apr') {
      description = `Zero-interest financing means every dollar of your payment goes toward the vehicle — not the bank. This could save you thousands over the life of the loan.`;
      terms = `For well-qualified buyers. ${o.label.replace('0% APR for ', '')} term available through manufacturer financing.`;
    } else if (o.type === 'finance') {
      const aprMatch = o.label.match(/([\d.]+%)/);
      const apr = aprMatch ? aprMatch[1] : '';
      description = `A below-market ${apr} rate from the manufacturer lowers your monthly payment and total cost compared to standard financing.`;
      terms = `For well-qualified buyers. ${o.label.replace(/[\d.]+% APR for /, '')} term available through manufacturer financing.`;
    } else if (o.type === 'lease') {
      description = `Leasing lets you drive a new ${make} ${model} with lower monthly payments than buying. Return it at the end or buy it out.`;
      terms = `Well-qualified lessees with approved credit. See dealer for mileage allowance and due-at-signing details.`;
    } else {
      description = o.label;
    }

    return {
      id: `${make}-${model}-offer-${i}`,
      type,
      title: o.label,
      description,
      value: o.label,
      expirationDate: o.expires,
      terms,
    };
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
