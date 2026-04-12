import { useState, useEffect, useMemo, useCallback } from 'react';
import { X, ChevronDown, ChevronUp, MapPin } from 'lucide-react';
import Tabs from '../Tabs/Tabs';
import type { TabItem } from '../Tabs/Tabs';
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
}

const BASE_SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'a-z', label: 'A–Z' },
  { value: 'expiring-soon', label: 'Expiring Soonest' },
];

const DEAL_TYPE_TABS: TabItem<DealTypeOption>[] = [
  { value: 'all', label: 'All Deals' },
  { value: 'lease', label: 'Lease' },
  { value: 'finance', label: 'Buying' },
  { value: 'cash', label: 'Cash Back' },
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
  dealPageType = 'general',
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
    if (isOpen) setDraft(externalFilters);
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

  const { bodyTypes, makes, fuelTypes, availableTerms, paymentRange, signingRange } = useMemo(() => {
    const leaseDeals = getLeaseDeals();
    const zeroAprDeals = getZeroAprDeals();
    const cashDeals = getCashDeals();
    const financeDeals = getFinanceDeals();

    const allVehicles = [
      ...leaseDeals.map(d => d.vehicle),
      ...zeroAprDeals.map(d => d.vehicle),
      ...cashDeals.map(d => d.vehicle),
      ...financeDeals.map(d => d.vehicle),
    ];

    const uniqueBodyTypes = [...new Set(allVehicles.map(v => v.bodyStyle))].sort();
    const uniqueMakes = getUniqueMakes();
    const uniqueFuelTypes = ['Gas', 'Hybrid', 'Plug-In Hybrid', 'Electric', 'Diesel'];

    const rawTerms = new Set<number>();
    for (const d of zeroAprDeals) rawTerms.add(parseTermMonths(d.term));
    for (const d of financeDeals) rawTerms.add(parseTermMonths(d.term));
    for (const d of leaseDeals) rawTerms.add(parseTermMonths(d.term));
    const availableTermValues = TERM_OPTIONS.filter(t => rawTerms.has(t));

    const payments = leaseDeals.map(d => d.monthlyPaymentNum);
    const signings = leaseDeals.map(d => {
      const num = parseInt(d.dueAtSigning.replace(/[^0-9]/g, ''), 10);
      return isNaN(num) ? 0 : num;
    });

    return {
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
    onApply(draft);
    onClose();
  }, [draft, onApply, onClose]);

  const activeDealType = draft.dealType;
  const showMonthlyPayment = activeDealType === 'all' || activeDealType === 'lease';
  const showTermLength = activeDealType === 'all' || activeDealType === 'lease' || activeDealType === 'finance';
  const showDueAtSigning = activeDealType === 'all' || activeDealType === 'lease';

  const sortOptions = useMemo(() => {
    if (activeDealType === 'lease' || dealPageType === 'lease') {
      return [...BASE_SORT_OPTIONS, ...LEASE_SORT_OPTIONS];
    }
    return BASE_SORT_OPTIONS;
  }, [activeDealType, dealPageType]);

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
          {/* Deal Type */}
          <div className="deals-filter__deal-type-row">
            <Tabs<DealTypeOption>
              items={DEAL_TYPE_TABS}
              value={draft.dealType}
              onChange={(val) => setDraft(prev => {
                const next = { ...prev, dealType: val };
                const isLeaseSort = val === 'lease' || dealPageType === 'lease';
                const leaseSortValues = LEASE_SORT_OPTIONS.map(o => o.value);
                if (!isLeaseSort && leaseSortValues.includes(prev.sortBy as typeof leaseSortValues[number])) {
                  next.sortBy = 'a-z';
                }
                return next;
              })}
              variant="pills"
              fullWidth
              ariaLabel="Deal type"
            />
          </div>

          {/* Location */}
          <div className="deals-filter__section deals-filter__section--location">
            <h3 className="deals-filter__section-label">Location</h3>
            <div className="deals-filter__zip-input-wrap">
              <span className="deals-filter__zip-label">Zip Code</span>
              <div className="deals-filter__zip-row">
                <MapPin size={14} className="deals-filter__zip-icon" />
                <input
                  type="text"
                  className="deals-filter__zip-input"
                  value={draft.zipCode}
                  onChange={e => setDraft(prev => ({ ...prev, zipCode: e.target.value.replace(/\D/g, '').slice(0, 5) }))}
                  maxLength={5}
                  placeholder="Enter zip"
                  aria-label="Zip code"
                />
              </div>
            </div>
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

          {/* Body Type */}
          <FilterSection
            title="Body Style"
            expanded={expandedSections.bodyType}
            onToggle={() => toggleSection('bodyType')}
          >
            <div className="deals-filter__chips">
              {bodyTypes.map(bt => (
                <button
                  key={bt}
                  type="button"
                  className={`deals-filter__chip ${draft.bodyTypes.includes(bt) ? 'deals-filter__chip--active' : ''}`}
                  onClick={() => toggleArrayItem('bodyTypes', bt)}
                >
                  {bt}
                </button>
              ))}
            </div>
          </FilterSection>

          {/* Monthly Payment - lease & all */}
          {showMonthlyPayment && (
            <FilterSection
              title="Monthly payment"
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

          {/* Term Length - lease, finance & all */}
          {showTermLength && (
            <FilterSection
              title="Term length"
              expanded={expandedSections.term}
              onToggle={() => toggleSection('term')}
            >
              <div className="deals-filter__chips">
                {availableTerms.map(t => (
                  <button
                    key={t}
                    type="button"
                    className={`deals-filter__chip ${draft.terms.includes(t) ? 'deals-filter__chip--active' : ''}`}
                    onClick={() => toggleTerm(t)}
                  >
                    {t} mo
                  </button>
                ))}
              </div>
            </FilterSection>
          )}

          {/* Make */}
          <FilterSection
            title="Make"
            expanded={expandedSections.make}
            onToggle={() => toggleSection('make')}
          >
            <div className="deals-filter__checkbox-list">
              {makes.map(m => (
                <label key={m} className="deals-filter__checkbox-row">
                  <span className="deals-filter__checkbox-label">{m}</span>
                  <input
                    type="checkbox"
                    className="deals-filter__checkbox"
                    checked={draft.makes.includes(m)}
                    onChange={() => toggleArrayItem('makes', m)}
                  />
                </label>
              ))}
            </div>
          </FilterSection>

          {/* Due at Signing - lease & all */}
          {showDueAtSigning && (
            <FilterSection
              title="Due at signing"
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

          {/* Fuel Type */}
          <FilterSection
            title="Fuel type"
            expanded={expandedSections.fuelType}
            onToggle={() => toggleSection('fuelType')}
          >
            <div className="deals-filter__chips">
              {fuelTypes.map(ft => (
                <button
                  key={ft}
                  type="button"
                  className={`deals-filter__chip ${draft.fuelTypes.includes(ft) ? 'deals-filter__chip--active' : ''}`}
                  onClick={() => toggleArrayItem('fuelTypes', ft)}
                >
                  {ft}
                </button>
              ))}
            </div>
          </FilterSection>


        </div>

        {/* Footer */}
        <footer className="deals-filter__footer">
          <button type="button" className="deals-filter__clear" onClick={handleClearAll}>
            Clear All
          </button>
          <button type="button" className="deals-filter__apply" onClick={handleApply}>
            Show {getResultCount ? getResultCount(draft) : totalResults} Results
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
