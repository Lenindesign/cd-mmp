import { Fragment, useCallback, useEffect, useMemo, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ChevronRight, SlidersHorizontal, X } from 'lucide-react';
import { DealCard } from '../../components/DealCard';
import { DealsFilterModal } from '../../components/DealsFilterModal';
import type { DealsFilterOptions, DealsFilterState, DealTypeOption } from '../../components/DealsFilterModal';
import AdBanner from '../../components/AdBanner';
import AdSidebar from '../../components/AdSidebar';
import { GridAd } from '../../components/GridAd';
import IncentivesModal from '../../components/IncentivesModal/IncentivesModal';
import type { IncentiveOfferDetail } from '../../components/IncentivesModal/IncentivesModal';
import { SEO, createBreadcrumbStructuredData } from '../../components/SEO';
import { useActiveFilterPills } from '../../hooks/useActiveFilterPills';
import { useFilterOpen } from '../../hooks/useFilterOpen';
import {
  EV_INCENTIVE_CATEGORY_LABELS,
  EV_INCENTIVE_CATEGORY_DESCRIPTIONS,
  getEvIncentives,
  type EvIncentive,
} from '../../services/evIncentivesService';
import type { Incentive } from '../../services/incentiveAdapter';
import { getVehicleBySlug } from '../../services/vehicleService';
import { chunkArray } from '../../utils/chunkArray';
import { getCurrentPeriod, formatExpiration } from '../../utils/dateUtils';
import { BEST_BUYING_DEALS_PATH, EV_INCENTIVES_PATH } from '../../constants/dealRoutes';
import {
  DEALS_GRID_BREAKER_AD_URL,
  GRID_BREAKER_AFTER_CARD_COUNT,
  SIDEBAR_AFTER_BREAK_PROPS,
} from '../../constants/dealsLayout';
import '../ZeroAprDealsPage/ZeroAprDealsPage.css';
import './EvIncentivesPage.css';

const BASE_URL = 'https://www.caranddriver.com';

const DEFAULT_FILTERS: DealsFilterState = {
  tab: 'best-deals',
  dealType: 'finance',
  zipCode: '98012',
  bodyTypes: [],
  monthlyPaymentMin: 0,
  monthlyPaymentMax: 1500,
  makes: [],
  models: [],
  dueAtSigningMin: 0,
  dueAtSigningMax: 5000,
  fuelTypes: [],
  accolades: [],
  terms: [],
  creditTier: null,
  buyingDealTypes: [],
  sortBy: 'a-z',
};

const getInitialFilters = (search: string, locationState: unknown): DealsFilterState => {
  const stateFilters = (locationState as { filters?: DealsFilterState } | null)?.filters;
  const params = new URLSearchParams(search);
  const make = params.get('make');
  const model = params.get('model');
  const fuelType = params.get('fuelType');

  return {
    ...(stateFilters ?? DEFAULT_FILTERS),
    makes: make ? [make] : stateFilters?.makes ?? DEFAULT_FILTERS.makes,
    models: model ? [model] : stateFilters?.models ?? DEFAULT_FILTERS.models,
    fuelTypes: fuelType ? [fuelType] : stateFilters?.fuelTypes ?? DEFAULT_FILTERS.fuelTypes,
  };
};

const isConditional = (incentive: EvIncentive) => (
  incentive.category === 'conditional-offer' ||
  !/no specific group affiliation/i.test(incentive.eligibility)
);

const getBenefitLabel = (incentive: EvIncentive) => {
  if (incentive.category === 'direct-vehicle-savings') return 'Vehicle Savings';
  if (incentive.category === 'lease-rate') return 'Lease Rate';
  if (incentive.category === 'tax-credit' || incentive.category === 'tax-exemption') return 'Tax Program';
  if (incentive.category === 'charging-rebate') return 'Charging Rebate';
  if (incentive.category === 'utility-program') return 'Utility Program';
  return 'Conditional Offer';
};

const getSortValue = (incentive: EvIncentive) => {
  if (incentive.category === 'direct-vehicle-savings') return 0;
  if (incentive.category === 'lease-rate') return 1;
  if (incentive.category === 'tax-credit') return 2;
  if (incentive.category === 'tax-exemption') return 3;
  if (incentive.category === 'charging-rebate') return 4;
  if (incentive.category === 'utility-program') return 5;
  return 6;
};

const matchesEvFilters = (incentive: EvIncentive, filters: DealsFilterState) => {
  if (filters.bodyTypes.length > 0 && !filters.bodyTypes.includes(incentive.bodyStyle)) return false;
  if (filters.makes.length > 0 && !filters.makes.includes(incentive.make)) return false;
  if ((filters.models?.length ?? 0) > 0 && !filters.models?.includes(incentive.model)) return false;
  if (filters.fuelTypes.length > 0 && !filters.fuelTypes.includes(incentive.fuelType)) return false;
  if (filters.terms.length > 0) {
    const termMatch = incentive.amountLabel.match(/(\d+)\s*month/i);
    const term = termMatch ? Number(termMatch[1]) : null;
    if (!term || !filters.terms.includes(term)) return false;
  }
  if (filters.dealType === 'lease' && incentive.category !== 'lease-rate') return false;
  if (filters.dealType === 'cash' && incentive.category !== 'direct-vehicle-savings') return false;
  return true;
};

const EvIncentivesPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { month, year } = getCurrentPeriod();
  const initialFilters = useMemo(
    () => getInitialFilters(location.search, location.state),
    [location.search, location.state],
  );
  const [filters, setFilters] = useState<DealsFilterState>(() => initialFilters);
  const [filterOpen, setFilterOpen] = useFilterOpen();
  const [activeIncentive, setActiveIncentive] = useState<EvIncentive | null>(null);
  const [savedIncentives, setSavedIncentives] = useState<Set<string>>(new Set());

  useEffect(() => {
    setFilters(initialFilters);
  }, [initialFilters]);

  const allIncentives = useMemo(() => getEvIncentives(), []);
  const evFilterOptions = useMemo<DealsFilterOptions>(() => {
    const modelOptionsByMake = new Map<string, Set<string>>();
    for (const incentive of allIncentives) {
      if (!modelOptionsByMake.has(incentive.make)) {
        modelOptionsByMake.set(incentive.make, new Set());
      }
      modelOptionsByMake.get(incentive.make)?.add(incentive.model);
    }

    return {
      bodyTypes: [...new Set(allIncentives.map(incentive => incentive.bodyStyle))].sort(),
      makes: [...modelOptionsByMake.keys()].sort(),
      modelOptionsByMake: Object.fromEntries(
        [...modelOptionsByMake.entries()].map(([make, models]) => [
          make,
          [...models].sort((a, b) => a.localeCompare(b)),
        ]),
      ),
      fuelTypes: [...new Set(allIncentives.map(incentive => incentive.fuelType))].sort(),
    };
  }, [allIncentives]);

  const filteredIncentives = useMemo(() => {
    const filtered = allIncentives.filter(incentive => matchesEvFilters(incentive, filters));
    return [...filtered].sort((a, b) => {
      if (filters.sortBy === 'expiring-soon') {
        const aDate = a.expirationDate ? new Date(a.expirationDate).getTime() : Number.MAX_SAFE_INTEGER;
        const bDate = b.expirationDate ? new Date(b.expirationDate).getTime() : Number.MAX_SAFE_INTEGER;
        return aDate - bDate;
      }
      if (filters.sortBy === 'rating-high') {
        const aRating = getVehicleBySlug(a.vehicleSlug)?.staffRating ?? 0;
        const bRating = getVehicleBySlug(b.vehicleSlug)?.staffRating ?? 0;
        return bRating - aRating;
      }
      const typeDelta = getSortValue(a) - getSortValue(b);
      if (typeDelta !== 0) return typeDelta;
      return `${a.make} ${a.model} ${a.programName}`.localeCompare(`${b.make} ${b.model} ${b.programName}`);
    });
  }, [allIncentives, filters]);

  const activeFilterPills = useActiveFilterPills(filters, setFilters, DEFAULT_FILTERS);
  const incentiveChunks = useMemo(
    () => chunkArray(filteredIncentives, GRID_BREAKER_AFTER_CARD_COUNT),
    [filteredIncentives],
  );

  const getResultCount = useCallback((draftFilters: DealsFilterState) => {
    return allIncentives.filter(incentive => matchesEvFilters(incentive, draftFilters)).length;
  }, [allIncentives]);

  const handleFilterApply = useCallback((applied: DealsFilterState) => {
    setFilters({
      ...applied,
      fuelTypes: applied.fuelTypes,
    });
  }, []);

  const handleDealTypeNavigate = useCallback((dealType: DealTypeOption, carriedFilters: DealsFilterState) => {
    if (dealType === 'lease') {
      navigate('/deals/lease', { state: { filters: carriedFilters } });
      return;
    }

    if (dealType === 'finance' || dealType === 'cash' || dealType === 'all') {
      navigate(BEST_BUYING_DEALS_PATH, { state: { filters: carriedFilters } });
    }
  }, [navigate]);

  const toggleSave = useCallback((event: React.MouseEvent, id: string) => {
    event.preventDefault();
    event.stopPropagation();
    setSavedIncentives(current => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const activeOffer: Partial<IncentiveOfferDetail> | undefined = activeIncentive
    ? (() => {
        const vehicle = getVehicleBySlug(activeIncentive.vehicleSlug);
        const priceParts = activeIncentive.msrpRange.replace(/[^0-9,-]/g, '').split('-');
        const vehicleLabel = `${activeIncentive.year} ${activeIncentive.make} ${activeIncentive.model}`;
        return {
          year: activeIncentive.year,
          make: activeIncentive.make,
          model: activeIncentive.model,
          slug: activeIncentive.vehicleSlug,
          imageUrl: activeIncentive.imageUrl || vehicle?.image,
          msrpMin: parseInt(priceParts[0]?.replace(/,/g, '') || '0', 10),
          msrpMax: parseInt(priceParts[1]?.replace(/,/g, '') || '0', 10),
          offerHeadline: activeIncentive.amountLabel,
          whatItMeans: activeIncentive.description,
          yourSavings: activeIncentive.purchaseLeaseImpact,
          whoQualifies: activeIncentive.eligibility,
          eligibleTrims: activeIncentive.trimNames,
          dontWaitText: activeIncentive.expirationDate
            ? `This program expires ${formatExpiration(activeIncentive.expirationDate)}. Confirm eligibility, local availability, and stackability before you shop.`
            : `${activeIncentive.stackabilityNote} Confirm local availability before you shop.`,
          eventLabel: `EV incentive: ${EV_INCENTIVE_CATEGORY_LABELS[activeIncentive.category]} from ${activeIncentive.providerName}`,
          expirationDate: activeIncentive.expirationDate ?? 'Expiration varies by program',
          offerChipLabel: EV_INCENTIVE_CATEGORY_LABELS[activeIncentive.category],
          formHeading: 'Questions About This EV Incentive?',
          defaultLeadMessage: `I would like more information about the ${activeIncentive.programName} EV incentive for the ${vehicleLabel}.`,
          primaryFormCtaLabel: 'ASK ABOUT INCENTIVE',
          secondaryActionLabel: `VIEW ${activeIncentive.model.toUpperCase()}`,
          ...(vehicle?.slug ? { slug: vehicle.slug } : {}),
        };
      })()
    : undefined;

  const activeModalIncentives: Incentive[] | undefined = activeIncentive
    ? [{
        id: activeIncentive.id,
        type: 'special',
        title: activeIncentive.programName,
        description: activeIncentive.description,
        value: activeIncentive.amountLabel,
        expirationDate: activeIncentive.expirationDate ?? 'Expiration varies by program',
        terms: activeIncentive.purchaseLeaseImpact,
        eligibility: activeIncentive.eligibility,
        programName: activeIncentive.providerName,
        programDescription: activeIncentive.description,
        programRules: activeIncentive.requirement,
        groupAffiliation: isConditional(activeIncentive) ? 'targeted' : 'everyone',
      }]
    : undefined;

  return (
    <div className="zero-apr-page ev-incentives-page">
      <SEO
        title={`Best EV Incentives for ${month} ${year}`}
        description={`Find EV incentives for ${month} ${year}. Compare electric and hybrid vehicle savings, charging rebates, utility programs, and clean-vehicle offers near you.`}
        canonical={`${BASE_URL}${EV_INCENTIVES_PATH}`}
        keywords={['EV incentives', 'electric vehicle incentives', 'EV tax credits', 'charging rebates', `EV deals ${month} ${year}`]}
        structuredData={createBreadcrumbStructuredData([
          { name: 'Home', url: BASE_URL },
          { name: 'Deals', url: `${BASE_URL}/deals` },
          { name: 'EV Incentives', url: `${BASE_URL}${EV_INCENTIVES_PATH}` },
        ])}
        noIndex={allIncentives.length === 0}
      />

      <div className="zero-apr-page__hero">
        <div className="container">
          <div className="zero-apr-page__hero-content">
            <nav className="zero-apr-page__breadcrumb" aria-label="Breadcrumb">
              <Link to="/">Home</Link>
              <span className="zero-apr-page__breadcrumb-sep">/</span>
              <Link to="/deals">Deals</Link>
              <span className="zero-apr-page__breadcrumb-sep">/</span>
              <span>EV Incentives</span>
            </nav>
            <h1 className="zero-apr-page__title">Best EV Incentives<br />for {month} {year}</h1>
            <p className="zero-apr-page__description">
              Compare electric and hybrid vehicle savings, charging rebates, utility benefits, and conditional clean-vehicle programs. These incentives are grouped into the same deals experience, but each card makes clear what the benefit actually applies to.
            </p>
            <div className="ev-incentives-page__hero-links">
              <Link to={BEST_BUYING_DEALS_PATH}>Buying Deals <ChevronRight size={14} aria-hidden /></Link>
              <Link to="/deals/lease">Leasing Deals <ChevronRight size={14} aria-hidden /></Link>
            </div>
          </div>
        </div>
      </div>

      <div className="zero-apr-page__toolbar">
        <div className="container zero-apr-page__toolbar-inner">
          <div className="active-filter-pills__toolbar-left">
            <span className="active-filter-pills__count">{filteredIncentives.length} {filteredIncentives.length === 1 ? 'incentive' : 'incentives'}</span>
            <div className="active-filter-pills__row" aria-label="Active filters">
              {activeFilterPills.pills.length === 0 && (
                <span className="active-filter-pills__pill active-filter-pills__pill--static">
                  <span className="active-filter-pills__pill-label">EV Incentives</span>
                </span>
              )}
              {activeFilterPills.pills.map(pill => (
                <span key={pill.id} className="active-filter-pills__pill">
                  <span className="active-filter-pills__pill-label">{pill.label}</span>
                  <button type="button" className="active-filter-pills__pill-x" aria-label={`Remove ${pill.label} filter`} onClick={pill.onRemove}>
                    <X size={12} strokeWidth={2.5} aria-hidden />
                  </button>
                </span>
              ))}
              {activeFilterPills.pills.length > 0 && (
                <button type="button" className="active-filter-pills__clear-all" onClick={activeFilterPills.clearAllFilters}>
                  Clear All
                </button>
              )}
            </div>
          </div>

          <button
            type="button"
            className={`deals-filter-btn ${activeFilterPills.pills.length > 0 ? 'deals-filter-btn--active' : ''}`}
            onClick={() => setFilterOpen(true)}
          >
            <SlidersHorizontal size={16} aria-hidden />
            <span>Filters</span>
            {activeFilterPills.pills.length > 0 && (
              <span className="deals-filter-badge" aria-label={`${activeFilterPills.pills.length} active filters`}>{activeFilterPills.pills.length}</span>
            )}
          </button>
        </div>
      </div>

      {filteredIncentives.length > 0 && (
        <AdBanner imageUrl={DEALS_GRID_BREAKER_AD_URL} altText="Advertisement" minimalDesktop mobileCompact />
      )}

      <div className="zero-apr-page__content">
        <div className="container zero-apr-page__container--stacked">
          {filteredIncentives.length === 0 ? (
            <div className="zero-apr-page__segment">
              <div className="zero-apr-page__main">
                <section className="zero-apr-page__deals-section zero-apr-page__deals-section--empty">
                  <div className="zero-apr-page__empty-state">
                    <p className="zero-apr-page__empty-state-text">No EV incentives match those filters.</p>
                    <button type="button" className="zero-apr-page__empty-state-link" onClick={() => setFilterOpen(true)}>
                      Adjust Filters
                    </button>
                  </div>
                </section>
              </div>
            </div>
          ) : (
            <>
              {incentiveChunks.map((chunk, chunkIndex) => (
                <Fragment key={`ev-incentive-segment-${chunkIndex}`}>
                  <div className="zero-apr-page__segment">
                    <div className="zero-apr-page__main">
                      <section className="zero-apr-page__deals-section">
                        <div className="zero-apr-page__grid" role="list">
                          {chunk.map((incentive, index) => {
                            const vehicle = getVehicleBySlug(incentive.vehicleSlug);
                            const categoryLabel = EV_INCENTIVE_CATEGORY_LABELS[incentive.category];
                            const expirationLabel = incentive.expirationDate ? undefined : 'Expiration varies by program';
                            return (
                              <Fragment key={incentive.id}>
                                {index > 0 && index % 4 === 0 && <GridAd />}
                                <DealCard
                                  slug={incentive.id}
                                  vehicleName={`${incentive.year} ${incentive.make} ${incentive.model}`}
                                  vehicleImage={incentive.imageUrl || vehicle?.image || ''}
                                  vehicleSlug={incentive.vehicleSlug}
                                  vehicleMake={incentive.make}
                                  vehicleModel={incentive.model}
                                  rating={vehicle?.staffRating ?? null}
                                  dealTypeTag="EV"
                                  imageBadge={categoryLabel}
                                  imageBadgeTooltip={EV_INCENTIVE_CATEGORY_DESCRIPTIONS[incentive.category]}
                                  editorsChoice={vehicle?.editorsChoice}
                                  tenBest={vehicle?.tenBest}
                                  isSaved={savedIncentives.has(incentive.id)}
                                  onSaveClick={(event) => toggleSave(event, incentive.id)}
                                  offers={[]}
                                  offersPopupOpen={false}
                                  onToggleOffersPopup={(event) => event.preventDefault()}
                                  onCloseOffersPopup={(event) => event.preventDefault()}
                                  payment={{
                                    amount: incentive.amountLabel,
                                    period: getBenefitLabel(incentive),
                                    savings: { type: 'plain', text: incentive.purchaseLeaseImpact },
                                    expirationDate: incentive.expirationDate ?? '',
                                    expirationLabel,
                                  }}
                                  details={[
                                    { label: 'Source', value: incentive.providerName },
                                    { label: 'Eligibility', value: isConditional(incentive) ? 'Conditional' : 'Open to all' },
                                    { label: 'Applies To', value: incentive.requirement },
                                    { label: 'Eligible Trims', value: incentive.trimNames.join(', '), fullWidth: true },
                                  ]}
                                  eligibilityLabels={[isConditional(incentive) ? 'Conditional' : 'Open to all']}
                                  onDealClick={(event) => {
                                    event.preventDefault();
                                    event.stopPropagation();
                                    setActiveIncentive(incentive);
                                  }}
                                  secondaryCta={{ type: 'link', to: `/${incentive.vehicleSlug}`, label: `View ${incentive.model}` }}
                                />
                              </Fragment>
                            );
                          })}
                        </div>
                      </section>
                    </div>
                    <aside className="zero-apr-page__sidebar" aria-label="Advertisement">
                      <div className="zero-apr-page__sidebar-sticky">
                        {chunkIndex === 0 ? <AdSidebar /> : <AdSidebar {...SIDEBAR_AFTER_BREAK_PROPS} />}
                      </div>
                    </aside>
                  </div>
                  {chunkIndex < incentiveChunks.length - 1 && (
                    <div className="zero-apr-page__full-bleed-breaker" role="complementary" aria-label="Advertisement">
                      <AdBanner imageUrl={DEALS_GRID_BREAKER_AD_URL} altText="Advertisement" />
                    </div>
                  )}
                </Fragment>
              ))}
            </>
          )}
        </div>
      </div>

      <IncentivesModal
        isOpen={!!activeIncentive}
        onClose={() => setActiveIncentive(null)}
        variant="conversion-b"
        offer={activeOffer}
        allIncentives={activeModalIncentives}
        selectedIncentiveId={activeIncentive?.id}
      />

      <DealsFilterModal
        isOpen={filterOpen}
        onClose={() => setFilterOpen(false)}
        filters={filters}
        onApply={handleFilterApply}
        getResultCount={getResultCount}
        totalResults={filteredIncentives.length}
        dealPageType="ev"
        filterOptions={evFilterOptions}
        onDealTypeNavigate={handleDealTypeNavigate}
      />
    </div>
  );
};

export default EvIncentivesPage;
