/**
 * Loads region-specific incentive rows from the enriched CSV export and exposes
 * merged, de-duplicated records for deal list pages.
 */
import incentivesCsv from '../data/all-fuel-incentives-2026-98012-enriched-with-images.csv?raw';
import { getAllVehicles } from './vehicleService';
import type { FuelType, Vehicle } from '../types/vehicle';

export interface FuelIncentiveCsvRow {
  make: string;
  model: string;
  year: string;
  trimName: string;
  bodyStyleRaw: string;
  styleId: string;
  msrp: number;
  monthlyLoanPayment: number;
  monthlyLeasePayment: number;
  primaryFuelType: string;
  vdatModelId: string;
  vdatImageUrl: string;
  programId: string;
  programName: string;
  programDescription: string;
  rebateType: string;
  amount: number;
  effectiveDate: string;
  expiryDate: string;
  groupAffiliation: string;
  previousOwnership: string;
  requirements: string;
  programRules: string;
  lenderId: string;
  offerType: string;
  termRaw: string;
  apr: number;
  interestRate: number;
  moneyFactor: number;
  monthlyPayment: number;
  canStackWith: string;
}

export interface MergedFuelIncentive extends FuelIncentiveCsvRow {
  trimsEligible: string[];
  termDisplay: string;
  expirationDisplay: string;
  /** Min/max MSRP across all merged styleIds (trims) in this incentive bucket. */
  msrpRangeMin: number;
  msrpRangeMax: number;
}

/** Hide stale model years on consumer deal lists (current calendar year and prior MY only). */
export const MIN_VISIBLE_DEAL_MODEL_YEAR = new Date().getFullYear() - 1;

export function isPromotedDealModelYear(yearStr: string): boolean {
  const y = parseInt(yearStr.trim(), 10);
  return Number.isFinite(y) && y >= MIN_VISIBLE_DEAL_MODEL_YEAR;
}

/** Row passed into vehicle resolution (merged rows include MSRP span). */
export type IncentiveVehicleSource = FuelIncentiveCsvRow & Partial<Pick<MergedFuelIncentive, 'msrpRangeMin' | 'msrpRangeMax'>>;

function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = '';
  let i = 0;
  let inQuotes = false;
  while (i < text.length) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') {
          cell += '"';
          i += 2;
        } else {
          inQuotes = false;
          i += 1;
        }
      } else {
        cell += c;
        i += 1;
      }
      continue;
    }
    if (c === '"') {
      inQuotes = true;
      i += 1;
      continue;
    }
    if (c === ',') {
      row.push(cell);
      cell = '';
      i += 1;
      continue;
    }
    if (c === '\n' || c === '\r') {
      if (c === '\r' && text[i + 1] === '\n') i += 1;
      row.push(cell);
      if (row.some((s) => s.length > 0)) rows.push(row);
      row = [];
      cell = '';
      i += 1;
      continue;
    }
    cell += c;
    i += 1;
  }
  if (cell.length || row.length) {
    row.push(cell);
    if (row.some((s) => s.length > 0)) rows.push(row);
  }
  return rows;
}

function num(s: string): number {
  const v = parseFloat(String(s).replace(/,/g, '').trim());
  return Number.isFinite(v) ? v : NaN;
}

function titleCaseMake(s: string): string {
  return s
    .trim()
    .split(/\s+/g)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(' ');
}

function slugPart(s: string): string {
  return s
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export function mapBodyStyle(raw: string): string {
  const r = raw.trim().toLowerCase();
  if (r.includes('sport utility') || r === 'specialty vehicle') return 'SUV';
  if (r.includes('4dr car')) return 'Sedan';
  if (r.includes('2dr car')) return 'Coupe';
  if (r.includes('pickup') || r.includes('chassis-cab')) return 'Truck';
  if (r.includes('cargo van') || r.includes('passenger van')) return 'Van';
  if (r.includes('mini-van')) return 'Minivan';
  if (r === 'convertible') return 'Convertible';
  return 'SUV';
}

export function mapFuelType(raw: string): FuelType {
  const r = raw.trim().toLowerCase();
  if (r === 'electric' || r === 'ev') return 'Electric';
  if (r.includes('plug') && r.includes('hybrid')) return 'Plug-in Hybrid';
  if (r === 'hybrid') return 'Hybrid';
  if (r === 'diesel') return 'Diesel';
  return 'Gas';
}

function formatExpiry(iso: string): string {
  const d = new Date(iso.trim());
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

function termDisplay(raw: string): string {
  const t = raw.trim();
  if (!t) return '60 months';
  if (/\d+\s*[-–]\s*\d+/.test(t)) return t.includes('month') ? t : `${t} months`;
  const n = num(t);
  if (Number.isFinite(n) && n > 0) return `${Math.round(n)} months`;
  return t.includes('month') ? t : `${t} months`;
}

/** First numeric term in raw CSV `term` — used to bucket 0% APR rows per model + term. */
function firstTermMonthsFromRaw(raw: string): number {
  const m = raw.trim().match(/(\d+)/);
  return m ? parseInt(m[1], 10) : 60;
}

/** Drop placeholder / unusable retail loan lengths (e.g. 1 month); keep multi-month ranges like `24-36`. */
function isUnreasonablyShortLoanTerm(raw: string): boolean {
  const t = raw.trim();
  if (!t) return false;
  if (/\d+\s*[-–]\s*\d+/.test(t)) return false;
  const mo = firstTermMonthsFromRaw(t);
  return mo <= 1;
}

/** Monthly lease payment for sorting / picking the best offer within a merge group. */
function leaseMonthlyForSort(r: FuelIncentiveCsvRow): number {
  const a = r.monthlyLeasePayment;
  const b = r.monthlyPayment;
  if (Number.isFinite(a) && a > 0) return a;
  if (Number.isFinite(b) && b > 0) return b;
  return Number.POSITIVE_INFINITY;
}

function shouldExcludeProgram(programName: string, offerType: string, rate: number | null): boolean {
  const n = programName.toLowerCase();
  if (n.includes('standard retail')) return true;
  if (offerType === 'loan' && rate === null) return true;
  return false;
}

export function loanApr(row: FuelIncentiveCsvRow): number | null {
  const ir = row.interestRate;
  const ap = row.apr;
  const candidates = [ir, ap].filter((x) => Number.isFinite(x) && x >= 0);
  if (candidates.length === 0) return null;
  const best = candidates.find((x) => x > 0);
  if (best !== undefined) return best;
  const zero = candidates.find((x) => x === 0);
  return zero !== undefined ? 0 : null;
}

function rowFromCells(headers: string[], values: string[]): FuelIncentiveCsvRow | null {
  const get = (k: string) => values[headers.indexOf(k)] ?? '';
  const offerType = get('offerType').trim().toLowerCase();
  if (!offerType || offerType === 'public') return null;

  const msrp = num(get('msrp'));
  const row: FuelIncentiveCsvRow = {
    make: get('make'),
    model: get('model'),
    year: get('year'),
    trimName: get('trimName'),
    bodyStyleRaw: get('bodyStyle'),
    styleId: get('styleId'),
    msrp: Number.isFinite(msrp) ? msrp : 0,
    monthlyLoanPayment: num(get('monthlyLoanPayment')),
    monthlyLeasePayment: num(get('monthlyLeasePayment')),
    primaryFuelType: get('primaryFuelType'),
    vdatModelId: get('vdatModelId'),
    vdatImageUrl: get('vdatImageUrl'),
    programId: get('programId'),
    programName: get('programName'),
    programDescription: get('programDescription'),
    rebateType: get('rebateType'),
    amount: num(get('amount')),
    effectiveDate: get('effectiveDate'),
    expiryDate: get('expiryDate'),
    groupAffiliation: get('groupAffiliation'),
    previousOwnership: get('previousOwnership'),
    requirements: get('requirements'),
    programRules: get('programRules'),
    lenderId: get('lenderId'),
    offerType,
    termRaw: get('term'),
    apr: num(get('apr')),
    interestRate: num(get('interestRate')),
    moneyFactor: num(get('moneyFactor')),
    monthlyPayment: num(get('monthlyPayment')),
    canStackWith: get('canStackWith'),
  };

  if (offerType === 'loan' && isUnreasonablyShortLoanTerm(row.termRaw)) return null;

  const rate = offerType === 'loan' ? loanApr(row) : null;
  if (shouldExcludeProgram(row.programName, offerType, rate)) return null;

  return row;
}

function findVehicle(
  make: string,
  model: string,
  year: string,
  /** When set (from CSV `primaryFuelType`), skip catalog vehicles that are a different powertrain (e.g. gas Sportage vs Sportage Hybrid). */
  csvFuel?: FuelType,
): Vehicle | undefined {
  const mk = make.trim().toLowerCase();
  const yr = year.trim();
  const all = getAllVehicles();
  const pool = all.filter((v) => v.make.toLowerCase() === mk && v.year === yr);
  /** If the catalog has no row for this MY, prefer the newest available MY for imagery/specs; display year still comes from the CSV row. */
  const fallbacks = all
    .filter((v) => v.make.toLowerCase() === mk)
    .sort((a, b) => parseInt(b.year, 10) - parseInt(a.year, 10));
  const candidates = pool.length ? pool : fallbacks;
  if (candidates.length === 0) return undefined;

  const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, '');
  const target = norm(model.trim());
  let best: Vehicle | undefined;
  let bestScore = 0;
  for (const v of candidates) {
    if (csvFuel !== undefined && v.fuelType !== csvFuel) continue;
    const vm = norm(v.model);
    if (vm === target) return v;
    if (vm && target && (target.includes(vm) || vm.includes(target))) {
      const score = Math.min(vm.length, target.length) / Math.max(vm.length, target.length);
      if (score > bestScore) {
        bestScore = score;
        best = v;
      }
    }
  }
  if (best && bestScore >= 0.45) return best;
  return undefined;
}

function formatMsrpPriceRange(msrpMin: number, msrpMax: number): string {
  if (msrpMin <= 0 && msrpMax <= 0) return 'See dealer';
  const lo = msrpMin > 0 && msrpMax > 0 ? Math.min(msrpMin, msrpMax) : (msrpMin > 0 ? msrpMin : msrpMax);
  const hi = msrpMin > 0 && msrpMax > 0 ? Math.max(msrpMin, msrpMax) : (msrpMax > 0 ? msrpMax : msrpMin);
  if (lo === hi) return `$${lo.toLocaleString()}`;
  return `$${lo.toLocaleString()} - $${hi.toLocaleString()}`;
}

function incentiveMsrpBounds(row: IncentiveVehicleSource): { min: number; max: number } {
  const hasSpan =
    typeof row.msrpRangeMin === 'number' &&
    typeof row.msrpRangeMax === 'number' &&
    (row.msrpRangeMin > 0 || row.msrpRangeMax > 0);
  if (hasSpan) {
    return { min: row.msrpRangeMin!, max: row.msrpRangeMax! };
  }
  const m = row.msrp || 0;
  return { min: m, max: m };
}

function syntheticVehicle(row: FuelIncentiveCsvRow, msrpMin?: number, msrpMax?: number): Vehicle {
  const make = titleCaseMake(row.make);
  const year = row.year.trim();
  const model = row.model
    .split(' ')
    .map((w) => (w.length <= 2 ? w.toUpperCase() : w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()))
    .join(' ');
  const fuel = mapFuelType(row.primaryFuelType);
  const body = mapBodyStyle(row.bodyStyleRaw);
  const { min: pMin, max: pMax } =
    msrpMin !== undefined && msrpMax !== undefined
      ? { min: msrpMin, max: msrpMax }
      : { min: row.msrp || 0, max: row.msrp || 0 };
  const slug = `${year}/${make}/${slugPart(model)}`;
  const priceRange = formatMsrpPriceRange(pMin, pMax);
  const low = pMin > 0 && pMax > 0 ? Math.min(pMin, pMax) : (pMin > 0 ? pMin : pMax);
  const high = pMin > 0 && pMax > 0 ? Math.max(pMin, pMax) : (pMax > 0 ? pMax : pMin);

  return {
    id: `incentive-${row.vdatModelId}-${row.programId}-${row.styleId}`,
    year,
    make,
    model,
    trim: row.trimName,
    bodyStyle: body,
    image: row.vdatImageUrl || 'https://hips.hearstapps.net/hmg-prod/images/placeholder-car.jpg',
    priceRange,
    priceMin: low > 0 ? low : 0,
    priceMax: high > 0 ? high : 0,
    staffRating: 0,
    communityRating: 0,
    reviewCount: 0,
    fuelType: fuel,
    drivetrain: 'FWD',
    transmission: 'Automatic',
    slug,
  };
}

export function resolveVehicleFromIncentive(row: IncentiveVehicleSource): Vehicle {
  const { min: pMin, max: pMax } = incentiveMsrpBounds(row);
  const csvFuel = row.primaryFuelType?.trim() ? mapFuelType(row.primaryFuelType) : undefined;
  const matched = findVehicle(row.make, row.model, row.year, csvFuel);
  if (!matched) return syntheticVehicle(row, pMin, pMax);

  const useCsv = pMin > 0 || pMax > 0;
  const priceMin = useCsv ? (pMin > 0 && pMax > 0 ? Math.min(pMin, pMax) : (pMin > 0 ? pMin : pMax)) : matched.priceMin;
  const priceMax = useCsv ? (pMin > 0 && pMax > 0 ? Math.max(pMin, pMax) : (pMax > 0 ? pMax : pMin)) : matched.priceMax;
  const priceRange = useCsv ? formatMsrpPriceRange(pMin, pMax) : matched.priceRange;

  const incentiveYear = row.year.trim();
  const slugParts = matched.slug.split('/');
  const slug =
    slugParts.length >= 3
      ? [incentiveYear, slugParts[1], ...slugParts.slice(2)].join('/')
      : `${incentiveYear}/${matched.make}/${slugPart(matched.model)}`;

  return {
    ...matched,
    year: incentiveYear,
    slug,
    image: matched.image || row.vdatImageUrl || matched.image,
    priceMin,
    priceMax,
    priceRange,
  };
}

/**
 * Lease: one row per vdat + year + lease term — best (lowest) monthly payment wins.
 * Cash: one row per model + year + program.
 * Loan (non-zero APR): one row per model + year + program.
 * Loan (0% APR): one row per make + model + year + term (all styleIds/programs collapse; MSRP range spans trims).
 */
function mergeKey(r: FuelIncentiveCsvRow): string {
  const y = r.year.trim();
  if (r.offerType === 'lease') {
    return `${r.vdatModelId}|${y}|lease|${firstTermMonthsFromRaw(r.termRaw)}`;
  }
  if (r.offerType === 'cash') {
    return `${r.vdatModelId}|${y}|cash|${r.programId}`;
  }
  if (r.offerType === 'loan') {
    const rate = loanApr(r);
    if (rate === 0) {
      return `loan|apr0|${r.make.trim().toLowerCase()}|${r.model.trim().toLowerCase()}|${y}|${firstTermMonthsFromRaw(r.termRaw)}`;
    }
    return `${r.vdatModelId}|${y}|loan|${r.programId}`;
  }
  return `${r.vdatModelId}|${y}|${r.programId}|${r.offerType}`;
}

let mergedCache: MergedFuelIncentive[] | null = null;

function buildMerged(): MergedFuelIncentive[] {
  const grid = parseCsv(incentivesCsv);
  if (grid.length < 2) return [];
  const headers = grid[0].map((h) => h.trim());
  const groups = new Map<string, FuelIncentiveCsvRow[]>();

  for (let r = 1; r < grid.length; r += 1) {
    const parsed = rowFromCells(headers, grid[r]);
    if (!parsed) continue;
    const k = mergeKey(parsed);
    const list = groups.get(k) ?? [];
    list.push(parsed);
    groups.set(k, list);
  }

  const out: MergedFuelIncentive[] = [];
  for (const list of groups.values()) {
    const rows = [...list];
    const offerType = rows[0].offerType;
    let base: FuelIncentiveCsvRow;
    if (offerType === 'lease') {
      rows.sort((a, b) => leaseMonthlyForSort(a) - leaseMonthlyForSort(b));
      base = rows[0];
    } else {
      rows.sort((a, b) => (a.msrp || 1e9) - (b.msrp || 1e9));
      base = rows[0];
    }
    const trimsEligible = [...new Set(rows.map((x) => x.trimName).filter(Boolean))];
    const msrps = rows.map((x) => x.msrp).filter((n) => Number.isFinite(n) && n > 0);
    const msrpRangeMin = msrps.length ? Math.min(...msrps) : base.msrp || 0;
    const msrpRangeMax = msrps.length ? Math.max(...msrps) : base.msrp || 0;
    out.push({
      ...base,
      trimsEligible,
      termDisplay: termDisplay(base.termRaw),
      expirationDisplay: formatExpiry(base.expiryDate),
      msrpRangeMin,
      msrpRangeMax,
    });
  }
  return out;
}

export function getMergedFuelIncentives(): MergedFuelIncentive[] {
  if (!mergedCache) mergedCache = buildMerged();
  return mergedCache;
}

export function clearFuelIncentivesCache(): void {
  mergedCache = null;
}

export function buildAudience(m: MergedFuelIncentive): string {
  const parts = [m.groupAffiliation, m.previousOwnership, m.requirements].filter((s) => s && s.trim());
  const text = parts.join(' · ') || m.programRules?.slice(0, 240) || 'See program for qualification details.';
  return text.length > 280 ? `${text.slice(0, 277)}…` : text;
}
