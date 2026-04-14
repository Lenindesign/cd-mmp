import { useMemo, useCallback } from 'react';
import type { DealsFilterState } from '../components/DealsFilterModal';

export interface FilterPill {
  id: string;
  label: string;
  onRemove: () => void;
}

const ACCOLADE_LABELS: Record<string, string> = {
  editorsChoice: "Editor's Choice",
  tenBest: '10Best',
  evOfTheYear: 'EV of the Year',
};

const CREDIT_LABELS: Record<string, string> = {
  excellent: 'Excellent Credit',
  good: 'Good Credit',
  fair: 'Fair Credit',
  all: 'Any Credit',
};

const GLOBAL_DEFAULTS: DealsFilterState = {
  tab: 'best-deals',
  dealType: 'all',
  zipCode: '90245',
  bodyTypes: [],
  monthlyPaymentMin: 0,
  monthlyPaymentMax: 1500,
  makes: [],
  dueAtSigningMin: 0,
  dueAtSigningMax: 5000,
  fuelTypes: [],
  accolades: [],
  terms: [],
  creditTier: null,
  sortBy: 'a-z',
};

/**
 * Generates removable filter pills by comparing current filters against the
 * page's own defaults. Only values that differ from `pageDefaults` produce a
 * pill, so page-intrinsic filters (e.g. dealType:'lease' on the Lease page)
 * never appear as pills.
 */
export function useActiveFilterPills(
  filters: DealsFilterState,
  setFilters: React.Dispatch<React.SetStateAction<DealsFilterState>>,
  pageDefaults?: DealsFilterState,
) {
  const defaults = pageDefaults ?? GLOBAL_DEFAULTS;

  const DEAL_TYPE_LABELS: Record<string, string> = {
    lease: 'Lease',
    finance: 'Buying',
    cash: 'Cash Back',
  };

  const pills = useMemo((): FilterPill[] => {
    const result: FilterPill[] = [];

    if (filters.dealType && filters.dealType !== 'all' && filters.dealType !== defaults.dealType) {
      result.push({
        id: 'deal-type',
        label: DEAL_TYPE_LABELS[filters.dealType] || filters.dealType,
        onRemove: () => setFilters(f => ({ ...f, dealType: defaults.dealType })),
      });
    }

    const defaultBodyTypes = new Set(defaults.bodyTypes);
    for (const bt of filters.bodyTypes) {
      if (defaultBodyTypes.has(bt)) continue;
      result.push({ id: `body-${bt}`, label: bt, onRemove: () => setFilters(f => ({ ...f, bodyTypes: f.bodyTypes.filter(x => x !== bt) })) });
    }

    const defaultMakes = new Set(defaults.makes);
    for (const mk of filters.makes) {
      if (defaultMakes.has(mk)) continue;
      result.push({ id: `make-${mk}`, label: mk, onRemove: () => setFilters(f => ({ ...f, makes: f.makes.filter(x => x !== mk) })) });
    }

    const defaultFuelTypes = new Set(defaults.fuelTypes);
    for (const ft of filters.fuelTypes) {
      if (defaultFuelTypes.has(ft)) continue;
      result.push({ id: `fuel-${ft}`, label: ft, onRemove: () => setFilters(f => ({ ...f, fuelTypes: f.fuelTypes.filter(x => x !== ft) })) });
    }

    const defaultAccolades = new Set(defaults.accolades);
    for (const ac of filters.accolades) {
      if (defaultAccolades.has(ac)) continue;
      result.push({ id: `accolade-${ac}`, label: ACCOLADE_LABELS[ac] || ac, onRemove: () => setFilters(f => ({ ...f, accolades: f.accolades.filter(x => x !== ac) })) });
    }

    const defaultTerms = new Set(defaults.terms);
    for (const tm of filters.terms) {
      if (defaultTerms.has(tm)) continue;
      result.push({ id: `term-${tm}`, label: `${tm} mo`, onRemove: () => setFilters(f => ({ ...f, terms: f.terms.filter(x => x !== tm) })) });
    }

    if (filters.creditTier && filters.creditTier !== defaults.creditTier) {
      result.push({ id: 'credit', label: CREDIT_LABELS[filters.creditTier] || filters.creditTier, onRemove: () => setFilters(f => ({ ...f, creditTier: defaults.creditTier })) });
    }
    if (filters.monthlyPaymentMin > defaults.monthlyPaymentMin) {
      result.push({ id: 'pay-min', label: `$${filters.monthlyPaymentMin}+ /mo`, onRemove: () => setFilters(f => ({ ...f, monthlyPaymentMin: defaults.monthlyPaymentMin })) });
    }
    if (filters.monthlyPaymentMax < defaults.monthlyPaymentMax) {
      result.push({ id: 'pay-max', label: `Under $${filters.monthlyPaymentMax}/mo`, onRemove: () => setFilters(f => ({ ...f, monthlyPaymentMax: defaults.monthlyPaymentMax })) });
    }

    return result;
  }, [filters, setFilters, defaults]);

  const clearAllFilters = useCallback(() => {
    setFilters(defaults);
  }, [setFilters, defaults]);

  return { pills, clearAllFilters };
}
