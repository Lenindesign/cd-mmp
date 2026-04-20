import { Fragment, useMemo, useState, useCallback, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { SlidersHorizontal, X } from 'lucide-react';
import { getLeaseDeals } from '../../services/leaseDealsService';
import { getCurrentPeriod, formatExpiration } from '../../utils/dateUtils';
import {
  parseTermMonths,
  buildSavingsText,
  inferCreditTier,
  creditTierQualifies,
  getVehicleOffers,
  offersToIncentives,
  findMatchingIncentiveId,
  sortDeals,
  applyLeaseRangeFilters,
} from '../../utils/dealCalculations';
import { useActiveFilterPills } from '../../hooks/useActiveFilterPills';
import type { VehicleOfferSummary } from '../../utils/dealCalculations';
import type { Vehicle } from '../../types/vehicle';
import { useSupabaseRatings, getCategory } from '../../hooks/useSupabaseRating';
import { useAuth } from '../../contexts/AuthContext';
import { SEO, createBreadcrumbStructuredData } from '../../components/SEO';
import AdBanner from '../../components/AdBanner';
import AdSidebar from '../../components/AdSidebar';
import { GridAd } from '../../components/GridAd';
import SignInToSaveModal from '../../components/SignInToSaveModal';
import IncentivesModal from '../../components/IncentivesModal/IncentivesModal';
import type { IncentiveOfferDetail } from '../../components/IncentivesModal/IncentivesModal';
import { DealsFilterModal } from '../../components/DealsFilterModal';
import type { DealsFilterState, DealTypeOption } from '../../components/DealsFilterModal';
import { BEST_BUYING_DEALS_PATH } from '../../constants/dealRoutes';
import { DealCard } from '../../components/DealCard';
import { useFilterOpen } from '../../hooks/useFilterOpen';
import { resolveLeaseFilterDestination } from '../../utils/leaseFilterNavigation';
import {
  GRID_BREAKER_AFTER_CARD_COUNT,
  DEALS_GRID_BREAKER_AD_URL,
  SIDEBAR_AFTER_BREAK_PROPS,
} from '../../constants/dealsLayout';
import { chunkArray } from '../../utils/chunkArray';
import './LeaseByMakePage.css';

export interface LeaseByMakeDeal {
  id: string;
  dealType: 'lease';
  chipLabel: 'Lease';
  vehicle: Vehicle;
  rating: number;
  sortMonthly: number;
  expirationDate: string;
  programName: string;
  programDescription: string;
  trimsEligible: string[];
  term: string;
  monthlyPayment: string;
  monthlyPaymentNum: number;
  dueAtSigning: string;
  mileageAllowance: string;
}

const DEFAULT_FILTERS: DealsFilterState = {
  tab: 'best-deals',
  dealType: 'lease',
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

function buildActiveOffer(deal: LeaseByMakeDeal | null): Partial<IncentiveOfferDetail> | undefined {
  if (!deal) return undefined;
  const v = deal.vehicle;
  const priceParts = v.priceRange.replace(/[^0-9,\-–]/g, '').split(/[-–]/);
  return {
    year: parseInt(v.year, 10),
    make: v.make,
    model: v.model,
    slug: v.slug,
    imageUrl: v.image,
    msrpMin: parseInt(priceParts[0]?.replace(/,/g, '') || '0', 10),
    msrpMax: parseInt(priceParts[1]?.replace(/,/g, '') || '0', 10),
    expirationDate: deal.expirationDate,
    eventLabel: deal.programName,
    eligibleTrims: deal.trimsEligible,
    dontWaitText: `This offer expires ${formatExpiration(deal.expirationDate)}. Manufacturer deals change monthly - once it's gone, there's no guarantee it'll come back.`,
    offerHeadline: `Lease for ${deal.monthlyPayment}/month`,
    whatItMeans: `Instead of buying, you're renting the car for ${deal.term}. Your monthly payment is just ${deal.monthlyPayment} with ${deal.dueAtSigning} due at signing.`,
    yourSavings: `${deal.monthlyPayment}/mo is significantly lower than a typical purchase payment. ${deal.dueAtSigning} due at signing. Includes ${deal.mileageAllowance} mileage allowance.`,
    whoQualifies: "Well-qualified lessees with approved credit through the manufacturer's financial arm.",
  };
}

const LeaseByMakePage = () => {
  const params = useParams<{ make?: string; slug?: string }>();
  const makeParam = params.make ?? params.slug ?? '';

  const allLeaseDealsRaw = useMemo(() => getLeaseDeals(), []);

  // Resolve the URL slug back to the canonical make string stored on deals
  // ("bmw" → "BMW", "alfa-romeo" → "Alfa Romeo") so filter matching stays
  // case-exact.
  const makeName = useMemo(() => {
    if (!makeParam) return '';
    const target = makeParam.toLowerCase().replace(/-/g, ' ');
    const match = allLeaseDealsRaw.find((d) => d.vehicle.make.toLowerCase() === target);
    if (match) return match.vehicle.make;
    return makeParam
      .split('-')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
      .join(' ');
  }, [makeParam, allLeaseDealsRaw]);

  const { getRating: getSupabaseRating } = useSupabaseRatings();
  const { user, isAuthenticated, addSavedVehicle, removeSavedVehicle } = useAuth();
  const { month, year } = getCurrentPeriod();

  const [showSignInModal, setShowSignInModal] = useState(false);
  const [pendingSaveVehicle, setPendingSaveVehicle] = useState<{ name: string; slug: string; image?: string } | null>(
    null,
  );
  const [activeDealId, setActiveDealId] = useState<string | null>(null);
  const [filterOpen, setFilterOpen] = useFilterOpen();
  const [filters, setFilters] = useState<DealsFilterState>(() =>
    makeName ? { ...DEFAULT_FILTERS, makes: [makeName] } : DEFAULT_FILTERS,
  );

  // Keep the filter state in sync with the URL so the modal always reflects
  // the current make as a pre-selected chip.
  useEffect(() => {
    setFilters(prev =>
      makeName
        ? { ...prev, makes: prev.makes.includes(makeName) ? prev.makes : [makeName] }
        : prev,
    );
  }, [makeName]);
  const navigate = useNavigate();
  const handleFilterApply = useCallback((applied: DealsFilterState) => {
    const dest = resolveLeaseFilterDestination(applied);
    if (dest) {
      navigate(dest.path, dest.carryFilters ? { state: { filters: applied } } : undefined);
      return;
    }
    setFilters(applied);
  }, [navigate]);
  const [offersPopup, setOffersPopup] = useState<{ slug: string; offers: VehicleOfferSummary[] } | null>(null);

  const { pills: activeFilterPills, clearAllFilters } = useActiveFilterPills(filters, setFilters, DEFAULT_FILTERS);

  const matchesMake = useCallback(
    (vehicle: Vehicle) => vehicle.make.toLowerCase() === makeName.toLowerCase(),
    [makeName],
  );

  const matchesFilters = useCallback(
    (
      vehicle: {
        bodyStyle: string;
        make: string;
        fuelType: string;
        editorsChoice?: boolean;
        tenBest?: boolean;
        evOfTheYear?: boolean;
      },
      deal?: { term?: string; targetAudience?: string },
    ) => {
      if (filters.bodyTypes.length > 0 && !filters.bodyTypes.includes(vehicle.bodyStyle)) return false;
      if (filters.makes.length > 0 && !filters.makes.includes(vehicle.make)) return false;
      if (filters.fuelTypes.length > 0 && !filters.fuelTypes.includes(vehicle.fuelType)) return false;
      if (filters.accolades.length > 0) {
        const hasMatch = filters.accolades.some((a) => {
          if (a === 'editorsChoice') return vehicle.editorsChoice;
          if (a === 'tenBest') return vehicle.tenBest;
          if (a === 'evOfTheYear') return vehicle.evOfTheYear;
          return false;
        });
        if (!hasMatch) return false;
      }
      if (filters.terms.length > 0 && deal?.term) {
        if (!filters.terms.includes(parseTermMonths(deal.term))) return false;
      }
      if (filters.creditTier && deal?.targetAudience) {
        const dealTier = inferCreditTier(deal.targetAudience);
        if (!creditTierQualifies(dealTier, filters.creditTier)) return false;
      }
      return true;
    },
    [filters.bodyTypes, filters.makes, filters.fuelTypes, filters.accolades, filters.terms, filters.creditTier],
  );

  const toggleOffersPopup = useCallback(
    (e: React.MouseEvent, make: string, model: string, slug: string) => {
      e.preventDefault();
      e.stopPropagation();
      if (offersPopup?.slug === slug) {
        setOffersPopup(null);
      } else {
        setOffersPopup({ slug, offers: getVehicleOffers(make, model) });
      }
    },
    [offersPopup],
  );

  const handleDealTypeNavigate = useCallback((dealType: DealTypeOption, carriedFilters: DealsFilterState) => {
    if (dealType === 'finance' || dealType === 'cash' || dealType === 'all') {
      navigate(BEST_BUYING_DEALS_PATH, { state: { filters: carriedFilters } });
    }
  }, [navigate]);

  const getResultCount = useCallback((draftFilters: DealsFilterState): number => {
    return allLeaseDealsRaw.filter(deal => {
      const v = deal.vehicle;
      if (draftFilters.bodyTypes.length > 0 && !draftFilters.bodyTypes.includes(v.bodyStyle)) return false;
      if (draftFilters.makes.length > 0 && !draftFilters.makes.includes(v.make)) return false;
      if (draftFilters.fuelTypes.length > 0 && !draftFilters.fuelTypes.includes(v.fuelType)) return false;
      if (draftFilters.terms.length > 0 && deal.term) {
        if (!draftFilters.terms.includes(parseTermMonths(deal.term))) return false;
      }
      if (deal.monthlyPaymentNum < draftFilters.monthlyPaymentMin || deal.monthlyPaymentNum > draftFilters.monthlyPaymentMax) return false;
      const signingNum = parseInt(deal.dueAtSigning.replace(/[^0-9]/g, ''), 10) || 0;
      if (signingNum < draftFilters.dueAtSigningMin || signingNum > draftFilters.dueAtSigningMax) return false;
      return true;
    }).length;
  }, [allLeaseDealsRaw]);

  const allDeals = useMemo((): LeaseByMakeDeal[] => {
    const out: LeaseByMakeDeal[] = [];

    for (const d of getLeaseDeals()) {
      if (!matchesMake(d.vehicle)) continue;
      if (!matchesFilters(d.vehicle, { term: d.term })) continue;
      out.push({
        id: d.id,
        dealType: 'lease',
        chipLabel: 'Lease',
        vehicle: d.vehicle,
        rating: getSupabaseRating(d.vehicle.id, getCategory(d.vehicle.bodyStyle), d.vehicle.staffRating),
        sortMonthly: d.monthlyPaymentNum,
        expirationDate: d.expirationDate,
        programName: d.programName,
        programDescription: d.programDescription,
        trimsEligible: d.trimsEligible,
        term: d.term,
        monthlyPayment: d.monthlyPayment,
        monthlyPaymentNum: d.monthlyPaymentNum,
        dueAtSigning: d.dueAtSigning,
        mileageAllowance: d.mileageAllowance,
      });
    }

    const withSigning = out.map(d => ({
      ...d,
      dueAtSigningNum: parseInt(d.dueAtSigning.replace(/[^0-9]/g, ''), 10) || 0,
    }));
    const ranged = applyLeaseRangeFilters(
      withSigning,
      filters.monthlyPaymentMin, filters.monthlyPaymentMax,
      filters.dueAtSigningMin, filters.dueAtSigningMax,
    );
    return sortDeals(ranged, filters.sortBy);
  }, [getSupabaseRating, matchesFilters, matchesMake, filters.monthlyPaymentMin, filters.monthlyPaymentMax, filters.dueAtSigningMin, filters.dueAtSigningMax, filters.sortBy]);

  const dealChunks = useMemo(() => chunkArray(allDeals, GRID_BREAKER_AFTER_CARD_COUNT), [allDeals]);

  const modelLinks = useMemo(() => {
    const byModel = new Map<string, { year: string; model: string }>();
    for (const d of allDeals) {
      const key = d.vehicle.model.toLowerCase().replace(/\s+/g, '-');
      const existing = byModel.get(key);
      const y = parseInt(d.vehicle.year, 10);
      if (!existing || y > parseInt(existing.year, 10)) {
        byModel.set(key, { year: d.vehicle.year, model: d.vehicle.model });
      }
    }
    return Array.from(byModel.entries())
      .map(([modelSlug, { year: y, model }]) => ({
        modelSlug,
        label: `${y} ${makeName} ${model} Lease Deals`,
        to: `/${makeParam}/${modelSlug}/lease-deals`,
      }))
      .sort((a, b) => a.label.localeCompare(b.label));
  }, [allDeals, makeName, makeParam]);

  const isVehicleSaved = (vehicleName: string) => {
    return user?.savedVehicles?.some((v) => v.name === vehicleName) || false;
  };

  const handleSaveClick = (e: React.MouseEvent, vehicle: { name: string; slug: string; image?: string }) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isAuthenticated) {
      setPendingSaveVehicle(vehicle);
      setShowSignInModal(true);
      return;
    }
    const isSaved = isVehicleSaved(vehicle.name);
    if (isSaved) {
      const savedVehicle = user?.savedVehicles?.find((v) => v.name === vehicle.name);
      if (savedVehicle) removeSavedVehicle(savedVehicle.id);
    } else {
      addSavedVehicle({ id: vehicle.slug, name: vehicle.name, ownership: 'want' });
    }
  };

  const activeDealObj = activeDealId ? allDeals.find((d) => d.id === activeDealId) : null;
  const activeOffer = buildActiveOffer(activeDealObj ?? null);

  const renderLeaseDealCard = (deal: LeaseByMakeDeal) => {
    const vehicleName = `${deal.vehicle.year} ${deal.vehicle.make} ${deal.vehicle.model}`;
    const saved = isVehicleSaved(vehicleName);
    const allOffers = getVehicleOffers(deal.vehicle.make, deal.vehicle.model);
    const { savingsVsAvg, savingsTooltip } = buildSavingsText(deal.monthlyPaymentNum, deal.vehicle.bodyStyle);

    return (
      <DealCard
        slug={deal.vehicle.slug}
        vehicleName={vehicleName}
        vehicleImage={deal.vehicle.image}
        vehicleSlug={deal.vehicle.slug}
        vehicleMake={deal.vehicle.make}
        vehicleModel={deal.vehicle.model}
        rating={deal.rating}
        dealTypeTag={deal.chipLabel}
        editorsChoice={deal.vehicle.editorsChoice}
        tenBest={deal.vehicle.tenBest}
        isSaved={saved}
        onSaveClick={(e) =>
          handleSaveClick(e, {
            name: vehicleName,
            slug: deal.vehicle.slug,
            image: deal.vehicle.image,
          })
        }
        offers={allOffers}
        offersPopupOpen={offersPopup?.slug === deal.vehicle.slug}
        onToggleOffersPopup={(e) => toggleOffersPopup(e, deal.vehicle.make, deal.vehicle.model, deal.vehicle.slug)}
        onCloseOffersPopup={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setOffersPopup(null);
        }}
        payment={{
          amount: deal.monthlyPayment,
          period: '/mo',
          savings: { type: 'savings-text', text: savingsVsAvg },
          savingsTooltip,
          expirationDate: deal.expirationDate,
        }}
        pill={{
          chipLabel: deal.chipLabel,
          text: `${deal.monthlyPayment}/mo lease`,
          expirationDate: deal.expirationDate,
        }}
        details={[
          { label: 'Term', value: deal.term },
          { label: 'Due at Signing', value: deal.dueAtSigning },
        ]}
        onDealClick={() => setActiveDealId(deal.id)}
      />
    );
  };

  const pageTitle = `Best ${makeName} Lease Deals for ${month} ${year}`;
  const pageDescription = `Find the best ${makeName} lease deals for ${month} ${year}. Compare monthly payments, terms, and manufacturer lease specials from Car and Driver.`;
  const BASE_URL = 'https://www.caranddriver.com';
  const canonicalPath = makeParam ? `${BASE_URL}/${makeParam}/lease-deals` : BASE_URL;

  return (
    <div className="make-lease">
      <SEO
        title={pageTitle}
        description={pageDescription}
        canonical={canonicalPath}
        keywords={[
          `${makeName} lease deals`,
          `${makeName} lease specials`,
          `car lease deals ${month} ${year}`,
          'new car lease',
          'manufacturer lease offers',
        ]}
        structuredData={[
          createBreadcrumbStructuredData([
            { name: 'Home', url: BASE_URL },
            { name: 'Lease Deals', url: `${BASE_URL}/lease-deals` },
            { name: `${makeName} Lease Deals`, url: canonicalPath },
          ]),
        ]}
        noIndex={allDeals.length === 0}
      />

      <div className="make-lease__hero">
        <div className="container">
          <div className="make-lease__hero-content">
            <div className="make-lease__hero-badge">
              <span className="hero-pill__label">{makeName}</span>
            </div>
            <nav className="make-lease__breadcrumb" aria-label="Breadcrumb">
              <Link to="/">Home</Link>
              <span className="make-lease__breadcrumb-sep">/</span>
              <Link to="/lease-deals">Lease Deals</Link>
              <span className="make-lease__breadcrumb-sep">/</span>
              <span>{makeName} Lease Deals</span>
            </nav>
            <h1 className="make-lease__title">{pageTitle}</h1>
            <p className="make-lease__description">{pageDescription}</p>
          </div>
        </div>
      </div>

      <div className="make-lease__toolbar">
        <div className="container make-lease__toolbar-inner">
          <div className="active-filter-pills__toolbar-left">
            <span className="active-filter-pills__count">
              {allDeals.length} {allDeals.length === 1 ? 'deal' : 'deals'}
            </span>
            {activeFilterPills.length > 0 && (
              <div className="active-filter-pills__row" aria-label="Active filters">
                {activeFilterPills.map((pill) => (
                  <span key={pill.id} className="active-filter-pills__pill">
                    <span className="active-filter-pills__pill-label">{pill.label}</span>
                    <button
                      type="button"
                      className="active-filter-pills__pill-x"
                      aria-label={`Remove ${pill.label} filter`}
                      onClick={pill.onRemove}
                    >
                      <X size={12} strokeWidth={2.5} aria-hidden />
                    </button>
                  </span>
                ))}
                <button type="button" className="active-filter-pills__clear-all" onClick={clearAllFilters}>
                  Clear All
                </button>
              </div>
            )}
          </div>
          <button
            type="button"
            className={`deals-filter-btn ${activeFilterPills.length > 0 ? 'deals-filter-btn--active' : ''}`}
            onClick={() => setFilterOpen(true)}
          >
            <SlidersHorizontal size={16} aria-hidden />
            <span>Filters</span>
            {activeFilterPills.length > 0 && (
              <span className="deals-filter-badge">{activeFilterPills.length}</span>
            )}
          </button>
        </div>
      </div>

      <AdBanner imageUrl="https://d2kde5ohu8qb21.cloudfront.net/files/693a37c1e2108b000272edd6/nissan.jpg" altText="Advertisement" minimalDesktop mobileCompact />

      <div className="make-lease__content">
        <div className={`container${allDeals.length > 0 ? ' make-lease__container--stacked' : ''}`}>
          {allDeals.length === 0 ? (
            <div className="make-lease__segment">
              <div className="make-lease__main">
                <section className="make-lease__section">
                  <div className="make-lease__grid">
                    <div className="make-lease__empty-state">
                      <p className="make-lease__empty-state-text">
                        There are currently no active {makeName} lease offers. Check back soon or browse all lease deals.
                      </p>
                      <Link to="/lease-deals" className="make-lease__empty-state-link">
                        Browse Lease Deals
                      </Link>
                    </div>
                  </div>
                </section>
              </div>
              <aside className="make-lease__sidebar" aria-label="Advertisement">
                <div className="make-lease__sidebar-sticky">
                  <AdSidebar />
                </div>
              </aside>
            </div>
          ) : (
            <>
              {dealChunks.map((chunk, chunkIndex) => (
                <Fragment key={`lease-make-segment-${chunkIndex}`}>
                  <div className="make-lease__segment">
                    <div className="make-lease__main">
                      <section className="make-lease__section">
                        <div className="make-lease__grid">
                          {chunk.map((deal, i) => (
                            <Fragment key={deal.id}>
                              {i > 0 && i % 4 === 0 && <GridAd />}
                              {renderLeaseDealCard(deal)}
                            </Fragment>
                          ))}
                        </div>
                      </section>
                    </div>
                    <aside className="make-lease__sidebar" aria-label="Advertisement">
                      <div className="make-lease__sidebar-sticky">
                        {chunkIndex === 0 ? <AdSidebar /> : <AdSidebar {...SIDEBAR_AFTER_BREAK_PROPS} />}
                      </div>
                    </aside>
                  </div>
                  {chunkIndex < dealChunks.length - 1 && (
                    <div className="make-lease__full-bleed-breaker" role="complementary" aria-label="Advertisement">
                      <AdBanner imageUrl={DEALS_GRID_BREAKER_AD_URL} altText="Advertisement" />
                    </div>
                  )}
                </Fragment>
              ))}
            </>
          )}

          {modelLinks.length > 0 && (
            <div className="make-lease__segment make-lease__segment--tail">
              <div className="make-lease__main">
                <section className="make-lease__links-section">
                  <h2 className="make-lease__section-title">Lease Deals by {makeName} Model</h2>
                  <div className="make-lease__links-grid">
                    <Link to="/lease-deals" className="make-lease__link-card">
                      <h3>All Lease Deals</h3>
                      <p>Browse manufacturer lease specials across every make</p>
                    </Link>
                    {modelLinks.map(({ to, label }) => (
                      <Link key={to} to={to} className="make-lease__link-card">
                        <h3>{label}</h3>
                        <p>View lease offers and terms for this model</p>
                      </Link>
                    ))}
                  </div>
                </section>
              </div>
              <aside className="make-lease__sidebar" aria-label="Advertisement">
                <div className="make-lease__sidebar-sticky">
                  <AdSidebar {...(dealChunks.length > 1 ? SIDEBAR_AFTER_BREAK_PROPS : {})} />
                </div>
              </aside>
            </div>
          )}
        </div>
      </div>

      <IncentivesModal
        isOpen={!!activeDealId}
        onClose={() => setActiveDealId(null)}
        variant="conversion-b"
        offer={activeOffer}
        allIncentives={
          activeDealObj ? offersToIncentives(activeDealObj.vehicle.make, activeDealObj.vehicle.model) : undefined
        }
        selectedIncentiveId={activeDealObj ? findMatchingIncentiveId(activeDealObj.vehicle.make, activeDealObj.vehicle.model, 'lease', { value: activeDealObj.monthlyPayment }) : undefined}
      />
      <SignInToSaveModal
        isOpen={showSignInModal}
        onClose={() => {
          setShowSignInModal(false);
          setPendingSaveVehicle(null);
        }}
        itemType="vehicle"
        itemName={pendingSaveVehicle?.name}
        itemImage={pendingSaveVehicle?.image}
      />

      <DealsFilterModal
        isOpen={filterOpen}
        onClose={() => setFilterOpen(false)}
        filters={filters}
        onApply={handleFilterApply}
        getResultCount={getResultCount}
        totalResults={allDeals.length}
        dealPageType="lease"
        onDealTypeNavigate={handleDealTypeNavigate}
      />
    </div>
  );
};

export default LeaseByMakePage;
