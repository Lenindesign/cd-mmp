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

const DEFAULT_FILTERS: DealsFilterState = {
  tab: 'best-deals',
  zipCode: '90245',
  bodyTypes: [],
  monthlyPaymentMin: 0,
  monthlyPaymentMax: 99999,
  makes: [],
  dueAtSigningMin: 0,
  dueAtSigningMax: 99999,
  fuelTypes: [],
  accolades: [],
  terms: [],
  creditTier: null,
  sortBy: 'recommended',
};

export function useActiveFilterPills(
  filters: DealsFilterState,
  setFilters: React.Dispatch<React.SetStateAction<DealsFilterState>>,
) {
  const pills = useMemo((): FilterPill[] => {
    const result: FilterPill[] = [];

    for (const bt of filters.bodyTypes) {
      result.push({ id: `body-${bt}`, label: bt, onRemove: () => setFilters(f => ({ ...f, bodyTypes: f.bodyTypes.filter(x => x !== bt) })) });
    }
    for (const mk of filters.makes) {
      result.push({ id: `make-${mk}`, label: mk, onRemove: () => setFilters(f => ({ ...f, makes: f.makes.filter(x => x !== mk) })) });
    }
    for (const ft of filters.fuelTypes) {
      result.push({ id: `fuel-${ft}`, label: ft, onRemove: () => setFilters(f => ({ ...f, fuelTypes: f.fuelTypes.filter(x => x !== ft) })) });
    }
    for (const ac of filters.accolades) {
      result.push({ id: `accolade-${ac}`, label: ACCOLADE_LABELS[ac] || ac, onRemove: () => setFilters(f => ({ ...f, accolades: f.accolades.filter(x => x !== ac) })) });
    }
    for (const tm of filters.terms) {
      result.push({ id: `term-${tm}`, label: `${tm} mo`, onRemove: () => setFilters(f => ({ ...f, terms: f.terms.filter(x => x !== tm) })) });
    }
    if (filters.creditTier) {
      result.push({ id: 'credit', label: CREDIT_LABELS[filters.creditTier] || filters.creditTier, onRemove: () => setFilters(f => ({ ...f, creditTier: null })) });
    }
    if (filters.monthlyPaymentMin > 0) {
      result.push({ id: 'pay-min', label: `$${filters.monthlyPaymentMin}+ /mo`, onRemove: () => setFilters(f => ({ ...f, monthlyPaymentMin: 0 })) });
    }
    if (filters.monthlyPaymentMax < 99999) {
      result.push({ id: 'pay-max', label: `Under $${filters.monthlyPaymentMax}/mo`, onRemove: () => setFilters(f => ({ ...f, monthlyPaymentMax: 99999 })) });
    }

    return result;
  }, [filters, setFilters]);

  const clearAllFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
  }, [setFilters]);

  return { pills, clearAllFilters };
}
