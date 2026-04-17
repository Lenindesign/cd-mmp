import { useState, useEffect, useMemo, useCallback } from 'react';
import { X, ChevronDown, ChevronUp } from 'lucide-react';
import { getZeroAprDeals } from '../../services/zeroAprDealsService';
import { getCashDeals, getFinanceDeals } from '../../services/cashFinanceDealsService';
import { getLeaseDeals } from '../../services/leaseDealsService';
import { getUniqueMakes } from '../../services/vehicleService';
import { TERM_OPTIONS, parseTermMonths } from '../../utils/dealCalculations';
import type { CreditTier } from '../../utils/dealCalculations';
import './DealsFilterModal.css';

export type DealFilterTab = 'best-deals' | 'all-specials';

export type SortOption =
  | 'a-z'
  | 'expiring-soon'
  | 'rating-high'
  | 'payment-low'
  | 'cash-down-low';

export type Accolade = 'editorsChoice' | 'tenBest' | 'evOfTheYear';

export type DealTypeOption = 'all' | 'lease' | 'finance' | 'cash';

export interface DealsFilterState {
  tab: DealFilterTab;
  dealType: DealTypeOption;
  zipCode: string;
  bodyTypes: string[];
  monthlyPaymentMin: number;
  monthlyPaymentMax: number;
  makes: string[];
  dueAtSigningMin: number;
  dueAtSigningMax: number;
  fuelTypes: string[];
  accolades: Accolade[];
  terms: number[];
  creditTier: CreditTier | null;
  sortBy: SortOption;
}

export type DealPageType = 'lease' | 'finance' | 'all' | 'general';

interface DealsFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  filters: DealsFilterState;
  onApply: (filters: DealsFilterState) => void;
  totalResults: number;
  getResultCount?: (filters: DealsFilterState) => number;
  dealPageType?: DealPageType;
  /**
   * Called from `Show Results` when the user's draft deal-type points to a
   * different page than the one hosting this modal. Receives the destination
   * deal-type and the full filter draft so the caller can forward filters to
   * the target page. The modal does NOT fire this callback while the user is
   * toggling tabs; switching tabs only updates the in-modal preview.
   */
  onDealTypeNavigate?: (dealType: DealTypeOption, filters: DealsFilterState) => void;
}

const BASE_SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'a-z', label: 'Make Model (A–Z)' },
  { value: 'expiring-soon', label: 'Expiring Soonest' },
  { value: 'rating-high', label: 'C/D Rating (High to Low)' },
];

const LEASE_SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'payment-low', label: 'Lowest Monthly Payment' },
  { value: 'cash-down-low', label: 'Lowest Cash Down' },
];

const DealsFilterModal = ({
  isOpen,
  onClose,
  filters: externalFilters,
  onApply,
  totalResults,
  getResultCount,
  dealPageType,
  onDealTypeNavigate,
}: DealsFilterModalProps) => {
  const [draft, setDraft] = useState<DealsFilterState>(externalFilters);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    sortBy: true,
    bodyType: false,
    monthlyPayment: false,
    make: false,
    term: false,
    dueAtSigning: false,
    fuelType: false,
    accolades: false,
  });

  useEffect(() => {
    if (isOpen) {
      setDraft(externalFilters);
      // Auto-expand any section that already has a value selected so the user
      // can see (and clear) what's driving the current view.
      setExpandedSections(prev => ({
        ...prev,
        bodyType: prev.bodyType || externalFilters.bodyTypes.length > 0,
        make: prev.make || externalFilters.makes.length > 0,
        fuelType: prev.fuelType || externalFilters.fuelTypes.length > 0,
        term: prev.term || externalFilters.terms.length > 0,
        accolades: prev.accolades || externalFilters.accolades.length > 0,
      }));
    }
  }, [isOpen, externalFilters]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  const { leaseDeals, buyingDeals, bodyTypes, makes, fuelTypes, availableTerms, paymentRange, signingRange } = useMemo(() => {
    const leaseDealsLocal = getLeaseDeals();
    const zeroAprDeals = getZeroAprDeals();
    const cashDeals = getCashDeals();
    const financeDeals = getFinanceDeals();
    const buyingDealsLocal = [...zeroAprDeals, ...cashDeals, ...financeDeals];

    const allVehicles = [
      ...leaseDealsLocal.map(d => d.vehicle),
      ...buyingDealsLocal.map(d => d.vehicle),
    ];

    const uniqueBodyTypes = [...new Set(allVehicles.map(v => v.bodyStyle))].sort();
    const uniqueMakes = getUniqueMakes();
    const uniqueFuelTypes = ['Gas', 'Hybrid', 'Plug-In Hybrid', 'Electric', 'Diesel'];

    const rawTerms = new Set<number>();
    for (const d of zeroAprDeals) rawTerms.add(parseTermMonths(d.term));
    for (const d of financeDeals) rawTerms.add(parseTermMonths(d.term));
    for (const d of leaseDealsLocal) rawTerms.add(parseTermMonths(d.term));
    const availableTermValues = TERM_OPTIONS.filter(t => rawTerms.has(t));

    const payments = leaseDealsLocal.map(d => d.monthlyPaymentNum);
    const signings = leaseDealsLocal.map(d => {
      const num = parseInt(d.dueAtSigning.replace(/[^0-9]/g, ''), 10);
      return isNaN(num) ? 0 : num;
    });

    return {
      leaseDeals: leaseDealsLocal,
      buyingDeals: buyingDealsLocal,
      bodyTypes: uniqueBodyTypes,
      makes: uniqueMakes,
      fuelTypes: uniqueFuelTypes,
      availableTerms: availableTermValues,
      paymentRange: {
        min: payments.length ? Math.min(...payments) : 0,
        max: payments.length ? Math.max(...payments) : 2000,
      },
      signingRange: {
        min: signings.length ? Math.min(...signings) : 0,
        max: signings.length ? Math.max(...signings) : 15000,
      },
    };
  }, []);

  /**
   * Which side (lease vs buy) the draft is currently pointing at. This drives
   * the result count displayed in the modal and the highlighted Lease/Buy
   * button — neither of which should alter the page behind the modal.
   */
  const selectedSide: 'lease' | 'buy' = useMemo(() => {
    if (draft.dealType === 'lease') return 'lease';
    if (draft.dealType === 'finance' || draft.dealType === 'cash') return 'buy';
    // draft.dealType === 'all' → defer to the hosting page's native scope.
    if (dealPageType === 'lease') return 'lease';
    if (dealPageType === 'finance') return 'buy';
    return 'lease';
  }, [draft.dealType, dealPageType]);

  /**
   * Cross-scope result counter used for the in-modal preview. Mirrors the
   * shared predicate logic each page applies, but operates on whichever pool
   * (lease or buying) the user has selected inside the modal — regardless of
   * which page is hosting it. Lease-only ranges (monthly payment, cash down,
   * terms) are ignored on the buy side because those fields don't exist on
   * zero-APR/finance/cash deals.
   */
  const getScopedCount = useCallback(
    (d: DealsFilterState, side: 'lease' | 'buy'): number => {
      const matchesVehicle = (v: { bodyStyle: string; make: string; fuelType: string; editorsChoice?: boolean; tenBest?: boolean; evOfTheYear?: boolean }) => {
        if (d.bodyTypes.length > 0 && !d.bodyTypes.includes(v.bodyStyle)) return false;
        if (d.makes.length > 0 && !d.makes.includes(v.make)) return false;
        if (d.fuelTypes.length > 0 && !d.fuelTypes.includes(v.fuelType)) return false;
        if (d.accolades.length > 0) {
          const hasMatch = d.accolades.some(a => {
            if (a === 'editorsChoice') return v.editorsChoice;
            if (a === 'tenBest') return v.tenBest;
            if (a === 'evOfTheYear') return v.evOfTheYear;
            return false;
          });
          if (!hasMatch) return false;
        }
        return true;
      };

      if (side === 'lease') {
        return leaseDeals.filter(deal => {
          if (!matchesVehicle(deal.vehicle)) return false;
          if (d.terms.length > 0 && deal.term && !d.terms.includes(parseTermMonths(deal.term))) return false;
          if (deal.monthlyPaymentNum < d.monthlyPaymentMin || deal.monthlyPaymentNum > d.monthlyPaymentMax) return false;
          const signingNum = parseInt(deal.dueAtSigning.replace(/[^0-9]/g, ''), 10) || 0;
          if (signingNum < d.dueAtSigningMin || signingNum > d.dueAtSigningMax) return false;
          return true;
        }).length;
      }

      return buyingDeals.filter(deal => matchesVehicle(deal.vehicle)).length;
    },
    [leaseDeals, buyingDeals],
  );

  /**
   * Returns the count for the preview badge and option chips. When the user
   * has switched sides inside the modal we fall back to the modal's own
   * cross-scope counter instead of the page-scoped `getResultCount` prop,
   * which would otherwise only reflect the hosting page's data.
   */
  const pageNativeSide: 'lease' | 'buy' | null =
    dealPageType === 'lease' ? 'lease' : dealPageType === 'finance' ? 'buy' : null;
  const sideMatchesHostingPage = pageNativeSide !== null && pageNativeSide === selectedSide;
  const effectiveCount = useCallback(
    (d: DealsFilterState): number => {
      if (sideMatchesHostingPage && getResultCount) return getResultCount(d);
      return getScopedCount(d, selectedSide);
    },
    [sideMatchesHostingPage, getResultCount, getScopedCount, selectedSide],
  );

  const toggleSection = useCallback((section: string) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  }, []);

  const toggleArrayItem = useCallback((field: 'bodyTypes' | 'makes' | 'fuelTypes' | 'accolades', value: string) => {
    setDraft(prev => {
      const arr = prev[field] as string[];
      return {
        ...prev,
        [field]: arr.includes(value) ? arr.filter(v => v !== value) : [...arr, value],
      };
    });
  }, []);

  const toggleTerm = useCallback((term: number) => {
    setDraft(prev => ({
      ...prev,
      terms: prev.terms.includes(term) ? prev.terms.filter(t => t !== term) : [...prev.terms, term],
    }));
  }, []);

  const optionCounts = useMemo(() => {
    const base = { ...draft };
    const counts: Record<string, number> = {};

    for (const bt of bodyTypes) {
      counts[`body-${bt}`] = effectiveCount({ ...base, bodyTypes: [bt] });
    }
    for (const m of makes) {
      counts[`make-${m}`] = effectiveCount({ ...base, makes: [m] });
    }
    for (const t of availableTerms) {
      counts[`term-${t}`] = effectiveCount({ ...base, terms: [t] });
    }
    for (const ft of fuelTypes) {
      counts[`fuel-${ft}`] = effectiveCount({ ...base, fuelTypes: [ft] });
    }
    return counts;
  }, [effectiveCount, draft, bodyTypes, makes, availableTerms, fuelTypes]);

  const handleClearAll = useCallback(() => {
    setDraft(prev => ({
      ...prev,
      dealType: 'all',
      bodyTypes: [],
      monthlyPaymentMin: paymentRange.min,
      monthlyPaymentMax: paymentRange.max,
      makes: [],
      dueAtSigningMin: signingRange.min,
      dueAtSigningMax: signingRange.max,
      fuelTypes: [],
      accolades: [],
      terms: [],
      creditTier: null,
      sortBy: 'a-z',
    }));
  }, [paymentRange, signingRange]);

  const handleApply = useCallback(() => {
    // If the user flipped the Lease/Buy toggle to the opposite of the hosting
    // page, we defer navigation until now so the background page doesn't
    // change mid-interaction. The parent owns the destination route.
    if (onDealTypeNavigate && pageNativeSide !== null && selectedSide !== pageNativeSide) {
      onDealTypeNavigate(draft.dealType, draft);
      onClose();
      return;
    }
    onApply(draft);
    onClose();
  }, [draft, onApply, onClose, onDealTypeNavigate, pageNativeSide, selectedSide]);

  const isLeaseMode = selectedSide === 'lease';
  const showMonthlyPayment = isLeaseMode;
  const showCashDown = isLeaseMode;
  const showTermLength = isLeaseMode;

  const sortOptions = useMemo(() => {
    if (isLeaseMode) {
      return [...BASE_SORT_OPTIONS, ...LEASE_SORT_OPTIONS];
    }
    return BASE_SORT_OPTIONS;
  }, [isLeaseMode]);

  if (!isOpen) return null;

  return (
    <div className="deals-filter__overlay" onClick={onClose}>
      <div
        className="deals-filter"
        onClick={e => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Filter deals"
      >
        {/* Header */}
        <header className="deals-filter__header">
          <h2 className="deals-filter__title">Filters</h2>
          <button type="button" className="deals-filter__close" onClick={onClose} aria-label="Close">
            <X size={20} />
          </button>
        </header>

        {/* Scrollable body */}
        <div className="deals-filter__body">
          {/* Deal Type toggle — updates the modal preview only. Actual
              page navigation is deferred to "Show Results" so the page
              behind the modal stays put while the user explores. */}
          <div className="deals-filter__deal-type-row">
            <button
              type="button"
              className={`deals-filter__deal-type-btn ${selectedSide === 'lease' ? 'deals-filter__deal-type-btn--active' : ''}`}
              onClick={() => setDraft(prev => ({ ...prev, dealType: 'lease' }))}
            >
              Lease
            </button>
            <button
              type="button"
              className={`deals-filter__deal-type-btn ${selectedSide === 'buy' ? 'deals-filter__deal-type-btn--active' : ''}`}
              onClick={() => setDraft(prev => ({ ...prev, dealType: 'finance' }))}
            >
              Buy
            </button>
          </div>

          {/* Sort By */}
          <FilterSection
            title="Sort by"
            expanded={expandedSections.sortBy}
            onToggle={() => toggleSection('sortBy')}
          >
            <div className="deals-filter__radio-list">
              {sortOptions.map(opt => (
                <label key={opt.value} className="deals-filter__radio-row">
                  <span className="deals-filter__radio-label">{opt.label}</span>
                  <input
                    type="radio"
                    name="sort"
                    className="deals-filter__radio"
                    checked={draft.sortBy === opt.value}
                    onChange={() => setDraft(prev => ({ ...prev, sortBy: opt.value }))}
                  />
                </label>
              ))}
            </div>
          </FilterSection>

          {/* Body Style */}
          <FilterSection
            title="Body Style"
            expanded={expandedSections.bodyType}
            onToggle={() => toggleSection('bodyType')}
          >
            <div className="deals-filter__chips">
              {bodyTypes.map(bt => {
                const count = optionCounts?.[`body-${bt}`];
                return (
                  <button
                    key={bt}
                    type="button"
                    className={`deals-filter__chip ${draft.bodyTypes.includes(bt) ? 'deals-filter__chip--active' : ''}`}
                    onClick={() => toggleArrayItem('bodyTypes', bt)}
                  >
                    {bt}{count != null ? ` (${count})` : ''}
                  </button>
                );
              })}
            </div>
          </FilterSection>

          {/* Make */}
          <FilterSection
            title="Make"
            expanded={expandedSections.make}
            onToggle={() => toggleSection('make')}
          >
            <div className="deals-filter__checkbox-list">
              {makes.map(m => {
                const count = optionCounts?.[`make-${m}`];
                return (
                  <label key={m} className="deals-filter__checkbox-row">
                    <span className="deals-filter__checkbox-label">{m}{count != null ? ` (${count})` : ''}</span>
                    <input
                      type="checkbox"
                      className="deals-filter__checkbox"
                      checked={draft.makes.includes(m)}
                      onChange={() => toggleArrayItem('makes', m)}
                    />
                  </label>
                );
              })}
            </div>
          </FilterSection>

          {/* Fuel Type */}
          <FilterSection
            title="Fuel Type"
            expanded={expandedSections.fuelType}
            onToggle={() => toggleSection('fuelType')}
          >
            <div className="deals-filter__chips">
              {fuelTypes.map(ft => {
                const count = optionCounts?.[`fuel-${ft}`];
                return (
                  <button
                    key={ft}
                    type="button"
                    className={`deals-filter__chip ${draft.fuelTypes.includes(ft) ? 'deals-filter__chip--active' : ''}`}
                    onClick={() => toggleArrayItem('fuelTypes', ft)}
                  >
                    {ft}{count != null ? ` (${count})` : ''}
                  </button>
                );
              })}
            </div>
          </FilterSection>

          {/* Monthly Payment — lease only */}
          {showMonthlyPayment && (
            <FilterSection
              title="Monthly Payment"
              expanded={expandedSections.monthlyPayment}
              onToggle={() => toggleSection('monthlyPayment')}
            >
              <RangeInputs
                minValue={draft.monthlyPaymentMin}
                maxValue={draft.monthlyPaymentMax}
                absMin={paymentRange.min}
                absMax={paymentRange.max}
                prefix="$"
                onMinChange={v => setDraft(prev => ({ ...prev, monthlyPaymentMin: v }))}
                onMaxChange={v => setDraft(prev => ({ ...prev, monthlyPaymentMax: v }))}
              />
            </FilterSection>
          )}

          {/* Cash Down — lease only */}
          {showCashDown && (
            <FilterSection
              title="Cash Down"
              expanded={expandedSections.dueAtSigning}
              onToggle={() => toggleSection('dueAtSigning')}
            >
              <RangeInputs
                minValue={draft.dueAtSigningMin}
                maxValue={draft.dueAtSigningMax}
                absMin={signingRange.min}
                absMax={signingRange.max}
                prefix="$"
                onMinChange={v => setDraft(prev => ({ ...prev, dueAtSigningMin: v }))}
                onMaxChange={v => setDraft(prev => ({ ...prev, dueAtSigningMax: v }))}
              />
            </FilterSection>
          )}

          {/* Term Length — lease only */}
          {showTermLength && (
            <FilterSection
              title="Term Length"
              expanded={expandedSections.term}
              onToggle={() => toggleSection('term')}
            >
              <div className="deals-filter__chips">
                {availableTerms.map(t => {
                  const count = optionCounts?.[`term-${t}`];
                  return (
                    <button
                      key={t}
                      type="button"
                      className={`deals-filter__chip ${draft.terms.includes(t) ? 'deals-filter__chip--active' : ''}`}
                      onClick={() => toggleTerm(t)}
                    >
                      {t} mo{count != null ? ` (${count})` : ''}
                    </button>
                  );
                })}
              </div>
            </FilterSection>
          )}
        </div>

        {/* Footer */}
        <footer className="deals-filter__footer">
          <button type="button" className="deals-filter__clear" onClick={handleClearAll}>
            Clear All
          </button>
          <button type="button" className="deals-filter__apply" onClick={handleApply}>
            Show {effectiveCount ? effectiveCount(draft) : totalResults} Results
          </button>
        </footer>
      </div>
    </div>
  );
};

/* ── Collapsible section ── */
const FilterSection = ({
  title,
  expanded,
  onToggle,
  children,
}: {
  title: string;
  expanded: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) => (
  <div className="deals-filter__section">
    <button type="button" className="deals-filter__section-toggle" onClick={onToggle}>
      <h3 className="deals-filter__section-label">{title}</h3>
      {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
    </button>
    {expanded && <div className="deals-filter__section-content">{children}</div>}
  </div>
);

/* ── Min/Max range inputs ── */
const RangeInputs = ({
  minValue,
  maxValue,
  absMin,
  absMax,
  prefix,
  onMinChange,
  onMaxChange,
}: {
  minValue: number;
  maxValue: number;
  absMin: number;
  absMax: number;
  prefix: string;
  onMinChange: (v: number) => void;
  onMaxChange: (v: number) => void;
}) => {
  const [minRaw, setMinRaw] = useState(String(minValue));
  const [maxRaw, setMaxRaw] = useState(String(maxValue));
  const [minFocused, setMinFocused] = useState(false);
  const [maxFocused, setMaxFocused] = useState(false);

  useEffect(() => {
    if (!minFocused) setMinRaw(String(minValue));
  }, [minValue, minFocused]);

  useEffect(() => {
    if (!maxFocused) setMaxRaw(String(maxValue));
  }, [maxValue, maxFocused]);

  const commitMin = () => {
    const num = parseInt(minRaw.replace(/[^0-9]/g, ''), 10);
    const value = isNaN(num) ? absMin : Math.max(0, num);
    onMinChange(value);
    setMinRaw(String(value));
    setMinFocused(false);
  };

  const commitMax = () => {
    const num = parseInt(maxRaw.replace(/[^0-9]/g, ''), 10);
    const value = isNaN(num) ? absMax : Math.max(0, num);
    onMaxChange(value);
    setMaxRaw(String(value));
    setMaxFocused(false);
  };

  const formatDisplay = (n: number) => `${prefix}${n.toLocaleString()}`;

  return (
    <div className="deals-filter__range">
      <div className="deals-filter__range-field">
        <span className="deals-filter__range-label">Minimum</span>
        <input
          type="text"
          inputMode="numeric"
          className="deals-filter__range-input"
          value={minFocused ? minRaw : formatDisplay(minValue)}
          onChange={e => setMinRaw(e.target.value.replace(/[^0-9]/g, ''))}
          onFocus={() => { setMinFocused(true); setMinRaw(String(minValue)); }}
          onBlur={commitMin}
          onKeyDown={e => { if (e.key === 'Enter') { e.currentTarget.blur(); } }}
          aria-label="Minimum"
        />
      </div>
      <span className="deals-filter__range-to">to</span>
      <div className="deals-filter__range-field">
        <span className="deals-filter__range-label">Maximum</span>
        <input
          type="text"
          inputMode="numeric"
          className="deals-filter__range-input"
          value={maxFocused ? maxRaw : formatDisplay(maxValue)}
          onChange={e => setMaxRaw(e.target.value.replace(/[^0-9]/g, ''))}
          onFocus={() => { setMaxFocused(true); setMaxRaw(String(maxValue)); }}
          onBlur={commitMax}
          onKeyDown={e => { if (e.key === 'Enter') { e.currentTarget.blur(); } }}
          aria-label="Maximum"
        />
      </div>
    </div>
  );
};

export default DealsFilterModal;
