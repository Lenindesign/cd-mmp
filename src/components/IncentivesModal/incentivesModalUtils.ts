import type { RateTier } from '../../services/incentiveAdapter';

/** Row shape for the APR table, including optional cash back. */
export interface AprTableRow {
  term: number;
  apr: number;
  cashBack?: number;
}

export function getAprRangeLabel(active: { value: string; title: string; terms?: string; rateTiers?: RateTier[] }): string {
  const rows = buildAprTable(active);
  const rates = rows.map((row) => row.apr);
  const lo = Math.min(...rates);
  const hi = Math.max(...rates);
  if (lo === hi) return active.value;
  return `${lo}% - ${hi}% APR`;
}

/**
 * Build the APR table rows for a finance incentive.
 * If the incentive has rateTiers, use that data directly.
 * Otherwise, fall back to parsing the text and generating synthetic rows.
 */
export function buildAprTable(incentive: { value: string; title: string; terms?: string; rateTiers?: RateTier[] }): AprTableRow[] {
  if (incentive.rateTiers && incentive.rateTiers.length > 0) {
    return incentive.rateTiers.map((tier) => ({
      term: tier.term,
      apr: tier.apr,
      cashBack: tier.cashBack,
    }));
  }

  const text = `${incentive.value} ${incentive.title} ${incentive.terms ?? ''}`;
  const aprMatch = text.match(/([\d.]+)%/);
  const apr = aprMatch ? parseFloat(aprMatch[1]) : 0;

  const termNumbers: number[] = [];
  const rangeMatch = text.match(/(\d+)\s*[-–]\s*(\d+)\s*month/i);
  const singleMatch = text.match(/(\d+)\s*month/i);
  if (rangeMatch) {
    const lo = parseInt(rangeMatch[1], 10);
    const hi = parseInt(rangeMatch[2], 10);
    for (const term of [24, 36, 48, 60, 72, 84]) {
      if (term >= lo && term <= hi) termNumbers.push(term);
    }
  } else if (singleMatch) {
    termNumbers.push(parseInt(singleMatch[1], 10));
  }

  if (termNumbers.length === 0) termNumbers.push(36, 48, 60, 72);

  const spreadByTerm: Record<number, number> = {
    24: -0.5,
    36: 0,
    48: 0.3,
    60: 0.6,
    72: 1.0,
    84: 1.4,
  };

  return termNumbers.map((term) => ({
    term,
    apr: Math.round((apr + (spreadByTerm[term] ?? 0)) * 100) / 100,
  }));
}

export function hasTieredCashBack(rows: AprTableRow[]): boolean {
  const cashBacks = rows.map((row) => row.cashBack ?? 0).filter((cashBack) => cashBack > 0);
  if (cashBacks.length === 0) return false;
  const uniqueValues = new Set(cashBacks);
  return uniqueValues.size > 1;
}

export function getUniformCashBack(rows: AprTableRow[]): number | null {
  const cashBacks = rows.map((row) => row.cashBack ?? 0).filter((cashBack) => cashBack > 0);
  if (cashBacks.length === 0) return null;
  const uniqueValues = new Set(cashBacks);
  if (uniqueValues.size === 1) return cashBacks[0];
  return null;
}
