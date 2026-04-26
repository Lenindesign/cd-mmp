/**
 * Shared deal-definition composer.
 *
 * The three service files (`leaseDealsService`, `zeroAprDealsService`,
 * `cashFinanceDealsService`) each maintain a hand-authored array of deal
 * "definitions" that get joined to 2026+ vehicles at read time. Before this
 * helper each row was a ~13-line object literal, which made authoring and
 * reviewing large sets of deals tedious and inconsistent.
 *
 * The builders below accept a compact spec (just the facts that vary per
 * deal) and fill in boilerplate (expiration date, copy fallbacks, cosmetic
 * formatting) while preserving the exact output shape each service already
 * consumes.
 *
 * Importantly: the helpers are shape-only. The existing runtime join logic
 * in each service — find matching 2026+ vehicle, attach it, drop the row
 * otherwise — is unchanged. A row produced here is indistinguishable at
 * runtime from the original hand-authored objects.
 */

const CURRENT_YEAR = new Date().getFullYear();
/** Canonical expiration date used by every deal definition today. */
export const EXPIRATION_DATE = `May 1, ${CURRENT_YEAR}`;

const formatMoney = (n: number): string => `$${n.toLocaleString('en-US')}`;

const roundToNearestHundred = (n: number): number => Math.round(n / 100) * 100;

// ────────────────────────────────────────────────────────────────────────────
// Lease
// ────────────────────────────────────────────────────────────────────────────

export interface LeaseSpec {
  make: string;
  model: string;
  /** Monthly payment as a number (e.g. 329). Cosmetic `'$329'` string is derived. */
  monthly: number;
  /** Default: `'36 months'`. */
  term?: string;
  /** Default: ~10× the monthly payment rounded to the nearest $100. */
  dueAtSigning?: number;
  /** Default: `'10,000 mi/yr'`. */
  mileage?: string;
  /** Default: derived from make + model. */
  programName?: string;
  /** Default: derived from monthly + term + due-at-signing. */
  programDescription?: string;
  trims?: string[];
}

/** Output shape matches `LEASE_DEAL_DEFS` in `leaseDealsService.ts`. */
export interface LeaseDealDef {
  make: string;
  model: string;
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

export function leaseDeal(spec: LeaseSpec): LeaseDealDef {
  const term = spec.term ?? '36 months';
  const mileage = spec.mileage ?? '10,000 mi/yr';
  const dueNum = spec.dueAtSigning ?? roundToNearestHundred(spec.monthly * 10);
  const monthlyStr = formatMoney(spec.monthly);
  const dueStr = formatMoney(dueNum);
  const programName = spec.programName ?? `${spec.make} ${spec.model} Lease Offer`;
  const programDescription =
    spec.programDescription ??
    `Lease a 2026 ${spec.make} ${spec.model} for ${term} at ${monthlyStr}/mo with ${dueStr} due at signing. ${mileage} allowance.`;

  return {
    make: spec.make,
    model: spec.model,
    monthlyPayment: monthlyStr,
    monthlyPaymentNum: spec.monthly,
    term,
    dueAtSigning: dueStr,
    mileageAllowance: mileage,
    expirationDate: EXPIRATION_DATE,
    programName,
    programDescription,
    trimsEligible: spec.trims ?? [],
  };
}

// ────────────────────────────────────────────────────────────────────────────
// Zero-APR (0% financing only)
// ────────────────────────────────────────────────────────────────────────────

export interface ZeroAprSpec {
  make: string;
  model: string;
  /** Default: `'60 months'`. */
  term?: string;
  programName?: string;
  programDescription?: string;
  /** Default: `'Well-qualified buyers with 700+ credit score'`. */
  targetAudience?: string;
  trims?: string[];
}

/** Output shape matches `DEAL_DEFINITIONS` in `zeroAprDealsService.ts`. */
export interface ZeroAprDealDef {
  make: string;
  model: string;
  term: string;
  programName: string;
  programDescription: string;
  targetAudience: string;
  trimsEligible: string[];
}

export function zeroAprDeal(spec: ZeroAprSpec): ZeroAprDealDef {
  const term = spec.term ?? '60 months';
  const programName = spec.programName ?? `${spec.make} ${spec.model} 0% APR Offer`;
  const programDescription =
    spec.programDescription ??
    `0% APR financing for ${term} on the 2026 ${spec.make} ${spec.model}. Available to well-qualified buyers at participating dealers.`;
  return {
    make: spec.make,
    model: spec.model,
    term,
    programName,
    programDescription,
    targetAudience: spec.targetAudience ?? 'Well-qualified buyers with 700+ credit score',
    trimsEligible: spec.trims ?? [],
  };
}

// ────────────────────────────────────────────────────────────────────────────
// Low-APR finance (non-zero rate)
// ────────────────────────────────────────────────────────────────────────────

export interface FinanceSpec {
  make: string;
  model: string;
  /** APR as a number (e.g. 4.9 for 4.9%). Cosmetic `'4.9%'` string is derived. */
  apr: number;
  /** Default: `'60 months'`. */
  term?: string;
  programName?: string;
  programDescription?: string;
  targetAudience?: string;
  trims?: string[];
}

/** A single term tier with APR and optional cash back. */
export interface RateTier {
  term: number;
  apr: number;
  cashBack?: number;
}

/** Spec for tiered finance deals with multiple terms and variable cash back. */
export interface FinanceTieredSpec {
  make: string;
  model: string;
  /** Array of rate tiers, each with term (months), APR, and optional cash back. */
  tiers: RateTier[];
  programName?: string;
  programDescription?: string;
  targetAudience?: string;
  trims?: string[];
}

/** Output shape matches `FINANCE_DEAL_DEFS` in `cashFinanceDealsService.ts`. */
export interface FinanceDealDef {
  type: 'finance';
  make: string;
  model: string;
  apr: string;
  term: string;
  expirationDate: string;
  programName: string;
  programDescription: string;
  targetAudience: string;
  trimsEligible: string[];
  /** Tiered rate data for deals with multiple terms and/or variable cash back. */
  rateTiers?: RateTier[];
}

export function financeDeal(spec: FinanceSpec): FinanceDealDef {
  const aprStr = `${spec.apr}%`;
  const term = spec.term ?? '60 months';
  const programName = spec.programName ?? `${spec.make} ${spec.model} Special Finance Rate`;
  const programDescription =
    spec.programDescription ??
    `${aprStr} APR for ${term} on the 2026 ${spec.make} ${spec.model}. Available to well-qualified buyers.`;
  return {
    type: 'finance',
    make: spec.make,
    model: spec.model,
    apr: aprStr,
    term,
    expirationDate: EXPIRATION_DATE,
    programName,
    programDescription,
    targetAudience: spec.targetAudience ?? 'Well-qualified buyers with approved credit',
    trimsEligible: spec.trims ?? [],
  };
}

/**
 * Creates a tiered finance deal with multiple term/APR/cash-back combinations.
 * Used for deals like "5.7% APR for 48mo + $2,000 cash back" vs "6.4% APR for 72mo + $1,500 cash back".
 */
export function financeDealTiered(spec: FinanceTieredSpec): FinanceDealDef {
  const sortedTiers = [...spec.tiers].sort((a, b) => a.term - b.term);
  const aprs = sortedTiers.map(t => t.apr);
  const minApr = Math.min(...aprs);
  const maxApr = Math.max(...aprs);
  const aprStr = minApr === maxApr ? `${minApr}%` : `${minApr}% - ${maxApr}%`;

  const terms = sortedTiers.map(t => t.term);
  const minTerm = Math.min(...terms);
  const maxTerm = Math.max(...terms);
  const termStr = minTerm === maxTerm ? `${minTerm} months` : `${minTerm}–${maxTerm} months`;

  const cashBacks = sortedTiers.map(t => t.cashBack ?? 0).filter(c => c > 0);
  const hasCashBack = cashBacks.length > 0;
  const cashBackStr = hasCashBack
    ? ` + up to ${formatMoney(Math.max(...cashBacks))} cash back`
    : '';

  const programName = spec.programName ?? `${spec.make} ${spec.model} Special Finance Rate`;
  const programDescription =
    spec.programDescription ??
    `${aprStr} APR for ${termStr}${cashBackStr} on the 2026 ${spec.make} ${spec.model}. Available to well-qualified buyers.`;

  return {
    type: 'finance',
    make: spec.make,
    model: spec.model,
    apr: aprStr,
    term: termStr,
    expirationDate: EXPIRATION_DATE,
    programName,
    programDescription,
    targetAudience: spec.targetAudience ?? 'Well-qualified buyers with approved credit',
    trimsEligible: spec.trims ?? [],
    rateTiers: sortedTiers,
  };
}

// ────────────────────────────────────────────────────────────────────────────
// Cash back
// ────────────────────────────────────────────────────────────────────────────

export interface CashSpec {
  make: string;
  model: string;
  /** Amount as a number (e.g. 2500). Cosmetic `'$2,500'` string is derived. */
  amount: number;
  /** Default: auto-estimated band from amount (e.g. `'5–7%'`). */
  percentOffMsrp?: string;
  programName?: string;
  programDescription?: string;
  trims?: string[];
}

/** Output shape matches `CASH_DEAL_DEFS` in `cashFinanceDealsService.ts`. */
export interface CashDealDef {
  type: 'cash';
  make: string;
  model: string;
  incentiveValue: string;
  incentiveAmount: number;
  percentOffMsrp: string;
  expirationDate: string;
  programName: string;
  programDescription: string;
  trimsEligible: string[];
}

/**
 * Rough %-off-MSRP estimate when the caller doesn't specify.
 * Based on typical 2026 MSRP bands — produces plausible strings for display.
 */
function estimatePercentBand(amount: number): string {
  if (amount >= 5000) return '8–12%';
  if (amount >= 3000) return '6–9%';
  if (amount >= 2000) return '5–7%';
  if (amount >= 1000) return '3–5%';
  return '2–4%';
}

export function cashDeal(spec: CashSpec): CashDealDef {
  const incentiveValue = formatMoney(spec.amount);
  const programName = spec.programName ?? `${spec.make} ${spec.model} Customer Cash`;
  const programDescription =
    spec.programDescription ??
    `${incentiveValue} customer cash back on the 2026 ${spec.make} ${spec.model}. Available at participating ${spec.make} dealers.`;
  return {
    type: 'cash',
    make: spec.make,
    model: spec.model,
    incentiveValue,
    incentiveAmount: spec.amount,
    percentOffMsrp: spec.percentOffMsrp ?? estimatePercentBand(spec.amount),
    expirationDate: EXPIRATION_DATE,
    programName,
    programDescription,
    trimsEligible: spec.trims ?? [],
  };
}
