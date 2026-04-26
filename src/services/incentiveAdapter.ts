/**
 * Unified incentive adapter.
 *
 * Merges the four deal services (zero-APR, cash, finance, lease) into a
 * single canonical `Incentive[]` per make/model.  Every component that
 * previously read from either `incentivesService` (editorial) or
 * `dealCalculations → getVehicleOffers` (deals pipeline) now consumes the
 * same source through this module.
 *
 * When the Black Book API is connected, only the private `buildIncentives`
 * function needs to change — every public export keeps its shape.
 */

import { getZeroAprDeals } from './zeroAprDealsService';
import { getCashDeals, getFinanceDeals } from './cashFinanceDealsService';
import { getLeaseDeals } from './leaseDealsService';

// ── Canonical types ─────────────────────────────────────────────────────

export type GroupAffiliation =
  | 'everyone'
  | 'military'
  | 'first-responder'
  | 'college'
  | 'loyalty'
  | 'targeted'
  | 'automobility'
  | 'disaster-relief'
  | 'trade-in';

/** A single term tier with APR and optional cash back for tiered finance deals. */
export interface RateTier {
  term: number;
  apr: number;
  cashBack?: number;
}

export interface Incentive {
  id: string;
  type: 'cash' | 'finance' | 'lease' | 'special';
  title: string;
  description: string;
  value: string;
  expirationDate: string;
  terms?: string;
  eligibility?: string;
  programName?: string;
  programDescription?: string;
  programRules?: string;
  groupAffiliation?: GroupAffiliation;
  /** Tiered rate data for finance deals with multiple terms and/or variable cash back. */
  rateTiers?: RateTier[];
}

export interface VehicleIncentives {
  make: string;
  model: string;
  totalSavings: number;
  incentives: Incentive[];
}

export interface VehicleOfferSummary {
  type: 'zero-apr' | 'cash' | 'finance' | 'lease';
  label: string;
  expires: string;
}

// ── Private cache ───────────────────────────────────────────────────────

interface CachedEntry {
  incentives: Incentive[];
  offers: VehicleOfferSummary[];
  totalSavings: number;
}

const cache = new Map<string, CachedEntry>();

function cacheKey(make: string, model: string): string {
  return `${make.toLowerCase()}-${model.toLowerCase()}`;
}

// ── Build from deal services (swap this for Black Book later) ───────────

function buildEntry(make: string, model: string): CachedEntry {
  const mk = make.toLowerCase();
  const md = model.toLowerCase();

  const incentives: Incentive[] = [];
  const offers: VehicleOfferSummary[] = [];
  let idx = 0;

  for (const d of getZeroAprDeals()) {
    if (d.vehicle.make.toLowerCase() !== mk || d.vehicle.model.toLowerCase() !== md) continue;
    const id = `${make}-${model}-offer-${idx++}`;
    offers.push({ type: 'zero-apr', label: `0% APR for ${d.term}`, expires: d.expirationDate });
    incentives.push({
      id,
      type: 'finance',
      title: `0% APR for ${d.term}`,
      description: 'Zero-interest financing means every dollar of your payment goes toward the vehicle — not the bank. This could save you thousands over the life of the loan.',
      value: `0% APR for ${d.term}`,
      expirationDate: d.expirationDate,
      terms: `For well-qualified buyers. ${d.term} term available through manufacturer financing.`,
      eligibility: d.targetAudience,
      programName: d.programName,
      programDescription: d.programDescription,
      groupAffiliation: 'everyone',
    });
  }

  for (const d of getCashDeals()) {
    if (d.vehicle.make.toLowerCase() !== mk || d.vehicle.model.toLowerCase() !== md) continue;
    const id = `${make}-${model}-offer-${idx++}`;
    offers.push({ type: 'cash', label: `${d.incentiveValue} Cash Back`, expires: d.expirationDate });
    incentives.push({
      id,
      type: 'cash',
      title: `${d.incentiveValue} Cash Back`,
      description: `Customer cash allowance on select ${make} ${model} models.`,
      value: d.incentiveValue,
      expirationDate: d.expirationDate,
      programName: d.programName,
      programDescription: d.programDescription,
      groupAffiliation: 'everyone',
    });
  }

  for (const d of getFinanceDeals()) {
    if (d.vehicle.make.toLowerCase() !== mk || d.vehicle.model.toLowerCase() !== md) continue;
    const id = `${make}-${model}-offer-${idx++}`;
    offers.push({ type: 'finance', label: `${d.apr} APR for ${d.term}`, expires: d.expirationDate });

    const hasTieredCashBack = d.rateTiers && d.rateTiers.some(t => t.cashBack && t.cashBack > 0);
    const maxCashBack = d.rateTiers ? Math.max(...d.rateTiers.map(t => t.cashBack ?? 0)) : 0;
    const cashBackSuffix = hasTieredCashBack ? ` + up to $${maxCashBack.toLocaleString()} cash back` : '';

    incentives.push({
      id,
      type: 'finance',
      title: `${d.apr} APR for ${d.term}${cashBackSuffix}`,
      description: hasTieredCashBack
        ? `A below-market ${d.apr} rate from the manufacturer plus cash back that varies by term. Shorter terms typically offer higher cash back.`
        : `A below-market ${d.apr} rate from the manufacturer lowers your monthly payment and total cost compared to standard financing.`,
      value: `${d.apr} APR`,
      expirationDate: d.expirationDate,
      terms: `For well-qualified buyers. ${d.term} term available through manufacturer financing.`,
      eligibility: d.targetAudience,
      programName: d.programName,
      programDescription: d.programDescription,
      groupAffiliation: 'everyone',
      rateTiers: d.rateTiers,
    });
  }

  for (const d of getLeaseDeals()) {
    if (d.vehicle.make.toLowerCase() !== mk || d.vehicle.model.toLowerCase() !== md) continue;
    const id = `${make}-${model}-offer-${idx++}`;
    offers.push({ type: 'lease', label: `${d.monthlyPayment}/mo Lease`, expires: d.expirationDate });
    incentives.push({
      id,
      type: 'lease',
      title: `${d.monthlyPayment}/mo Lease`,
      description: `Leasing lets you drive a new ${make} ${model} with lower monthly payments than buying. Return it at the end or buy it out.`,
      value: `${d.monthlyPayment}/month`,
      expirationDate: d.expirationDate,
      terms: `Well-qualified lessees with approved credit. ${d.term}, ${d.mileageAllowance}. ${d.dueAtSigning} due at signing.`,
      programName: d.programName,
      programDescription: d.programDescription,
      groupAffiliation: 'everyone',
    });
  }

  const totalSavings = incentives
    .filter(i => i.type === 'cash')
    .reduce((sum, i) => {
      const match = i.value.match(/\$([\d,]+)/);
      return match ? sum + parseInt(match[1].replace(/,/g, ''), 10) : sum;
    }, 0);

  return { incentives, offers, totalSavings };
}

function resolve(make: string, model: string): CachedEntry {
  const key = cacheKey(make, model);
  if (cache.has(key)) return cache.get(key)!;
  const entry = buildEntry(make, model);
  cache.set(key, entry);
  return entry;
}

// ── Public API — drop-in replacements ───────────────────────────────────

/**
 * Rich incentive data for Hero, HeroOffers, VehicleRanking, and IncentivesModal.
 * Replaces `incentivesService.getVehicleIncentives`.
 */
export function getVehicleIncentives(make: string, model: string): VehicleIncentives {
  const { incentives, totalSavings } = resolve(make, model);
  return { make, model, totalSavings, incentives };
}

/**
 * Lightweight offer summaries for DealCard popups, VehicleCard badges, etc.
 * Replaces `dealCalculations.getVehicleOffers`.
 */
export function getVehicleOffers(make: string, model: string): VehicleOfferSummary[] {
  return resolve(make, model).offers;
}

/**
 * Convert offers into the `Incentive` shape for IncentivesModal `allIncentives`.
 * Replaces `dealCalculations.offersToIncentives`.
 */
export function offersToIncentives(make: string, model: string): Incentive[] {
  return resolve(make, model).incentives;
}

/**
 * Find the incentive ID matching a specific deal so the modal opens to the
 * correct row. Replaces `dealCalculations.findMatchingIncentiveId`.
 */
export function findMatchingIncentiveId(
  make: string,
  model: string,
  dealType: 'cash' | 'finance' | 'lease' | 'zero-apr',
  identifiers?: { apr?: string; term?: string; value?: string },
): string | undefined {
  const incentives = offersToIncentives(make, model);

  if (dealType === 'cash') {
    return incentives.find(inc => inc.type === 'cash')?.id;
  }
  if (dealType === 'lease') {
    if (identifiers?.value) {
      return incentives.find(inc => inc.type === 'lease' && inc.title.includes(identifiers.value!))?.id;
    }
    return incentives.find(inc => inc.type === 'lease')?.id;
  }
  if (dealType === 'zero-apr') {
    return incentives.find(inc => inc.type === 'finance' && inc.title.startsWith('0%'))?.id;
  }
  if (identifiers?.apr && identifiers?.term) {
    return incentives.find(inc =>
      inc.title.includes(identifiers.apr!) && inc.title.includes(identifiers.term!),
    )?.id;
  }
  if (identifiers?.apr) {
    return incentives.find(inc => inc.title.includes(identifiers.apr!))?.id;
  }
  return incentives.find(inc => inc.type === 'finance')?.id;
}

/**
 * Filter incentives by type.
 * Replaces `incentivesService.getIncentivesByType`.
 */
export function getIncentivesByType(
  make: string,
  model: string,
  type: 'cash' | 'finance' | 'lease' | 'special',
): Incentive[] {
  return resolve(make, model).incentives.filter(i => i.type === type);
}

/**
 * Total cash-back savings for a vehicle.
 * Replaces `incentivesService.getTotalSavings`.
 */
export function getTotalSavings(make: string, model: string): number {
  return resolve(make, model).totalSavings;
}
