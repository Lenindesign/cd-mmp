import { useMemo, useState, useCallback, type MouseEvent } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ChevronDown, ChevronUp, Heart, Info, Tag, Clock, SlidersHorizontal, Car } from 'lucide-react';
import { getLeaseDeals } from '../../services/leaseDealsService';
import { getCurrentPeriod, formatExpiration } from '../../utils/dateUtils';
import {
  parseTermMonths,
  buildSavingsText,
  inferCreditTier,
  creditTierQualifies,
  getVehicleOffers,
  offersToIncentives,
} from '../../utils/dealCalculations';
import type { VehicleOfferSummary } from '../../utils/dealCalculations';
import type { Vehicle } from '../../types/vehicle';
import { useSupabaseRatings, getCategory } from '../../hooks/useSupabaseRating';
import { useAuth } from '../../contexts/AuthContext';
import { SEO, createBreadcrumbStructuredData } from '../../components/SEO';
import AdSidebar from '../../components/AdSidebar';
import SignInToSaveModal from '../../components/SignInToSaveModal';
import { EDITORS_CHOICE_BADGE_URL, TEN_BEST_BADGE_URL } from '../../constants/badges';
import IncentivesModal from '../../components/IncentivesModal/IncentivesModal';
import type { IncentiveOfferDetail } from '../../components/IncentivesModal/IncentivesModal';
import { DealsFilterModal } from '../../components/DealsFilterModal';
import type { DealsFilterState } from '../../components/DealsFilterModal';
import './LeaseByMakeModelPage.css';

interface LeaseByMakeModelDeal {
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

function buildActiveOffer(deal: LeaseByMakeModelDeal | null): Partial<IncentiveOfferDetail> | undefined {
  if (!deal) return undefined;
  const v = deal.vehicle;
  const priceParts = v.priceRange.replace(/[^0-9,\-–]/g, '').split(/[-–]/);
  const base = {
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
    dontWaitText: `This offer expires ${formatExpiration(deal.expirationDate)}. Manufacturer deals change monthly—once it's gone, there's no guarantee it'll come back.`,
  };

  return {
    ...base,
    offerHeadline: `Lease for ${deal.monthlyPayment}/month`,
    whatItMeans: `Instead of buying, you're renting the car for ${deal.term}. Your monthly payment is just ${deal.monthlyPayment} with ${deal.dueAtSigning} due at signing.`,
    yourSavings: `${deal.monthlyPayment}/mo is significantly lower than a typical purchase payment. ${deal.dueAtSigning} due at signing. Includes ${deal.mileageAllowance} mileage allowance.`,
    whoQualifies: "Well-qualified lessees with approved credit through the manufacturer's financial arm.",
  };
}

const LeaseByMakeModelPage = () => {
  const { make: makeParam, model: modelParam } = useParams<{ make: string; model: string }>();
  const makeName = makeParam
    ? makeParam.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ')
    : '';
  const modelName = modelParam
    ? modelParam.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ')
    : '';

  const { getRating: getSupabaseRating } = useSupabaseRatings();
  const { user, isAuthenticated, addSavedVehicle, removeSavedVehicle } = useAuth();
  const { month, year } = getCurrentPeriod();

  const [expandedDealId, setExpandedDealId] = useState<string | null>(null);
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [pendingSaveVehicle, setPendingSaveVehicle] = useState<{ name: string; slug: string; image?: string } | null>(
    null,
  );
  const [activeDealId, setActiveDealId] = useState<string | null>(null);
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState<DealsFilterState>(DEFAULT_FILTERS);
  const [offersPopup, setOffersPopup] = useState<{ slug: string; offers: VehicleOfferSummary[] } | null>(null);

  const hasActiveFilters =
    filters.bodyTypes.length > 0 ||
    filters.makes.length > 0 ||
    filters.fuelTypes.length > 0 ||
    filters.accolades.length > 0 ||
    filters.terms.length > 0 ||
    filters.creditTier !== null;
  const activeFilterCount =
    filters.bodyTypes.length +
    filters.makes.length +
    filters.fuelTypes.length +
    filters.accolades.length +
    filters.terms.length +
    (filters.creditTier ? 1 : 0);

  const matchesMakeAndModel = useCallback(
    (vehicle: Vehicle) =>
      vehicle.make.toLowerCase() === makeName.toLowerCase() &&
      vehicle.model.toLowerCase() === modelName.toLowerCase(),
    [makeName, modelName],
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
    (e: MouseEvent, make: string, model: string, slug: string) => {
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

  const allDeals = useMemo((): LeaseByMakeModelDeal[] => {
    const out: LeaseByMakeModelDeal[] = [];
    if (!makeName || !modelName) return out;

    for (const d of getLeaseDeals()) {
      if (!matchesMakeAndModel(d.vehicle)) continue;
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

    return out.sort((a, b) => a.sortMonthly - b.sortMonthly);
  }, [getSupabaseRating, matchesFilters, matchesMakeAndModel, makeName, modelName]);

  const mmpYear = useMemo(() => {
    if (allDeals.length === 0) return String(year);
    return String(Math.max(...allDeals.map((d) => parseInt(d.vehicle.year, 10) || 0)));
  }, [allDeals, year]);

  const lowestPayment = allDeals.length > 0 ? Math.min(...allDeals.map((d) => d.sortMonthly)) : 0;

  const isVehicleSaved = (vehicleName: string) => {
    return user?.savedVehicles?.some((v) => v.name === vehicleName) || false;
  };

  const handleSaveClick = (e: MouseEvent, vehicle: { name: string; slug: string; image?: string }) => {
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

  const toggleDealDetails = (dealId: string) => {
    setExpandedDealId((prev) => (prev === dealId ? null : dealId));
  };

  const activeDealObj = activeDealId ? allDeals.find((d) => d.id === activeDealId) : null;
  const activeOffer = buildActiveOffer(activeDealObj ?? null);

  const pageTitle = `Best ${makeName} ${modelName} Lease Deals for ${month} ${year}`;
  const pageDescription = `Find the best ${makeName} ${modelName} lease deals for ${month} ${year}. Compare monthly payments, terms, and manufacturer lease specials from Car and Driver.`;
  const BASE_URL = 'https://www.caranddriver.com';
  const canonicalPath =
    makeParam && modelParam ? `${BASE_URL}/${makeParam}/${modelParam}/lease-deals` : BASE_URL;

  const makeLeaseDealsUrl = `${BASE_URL}/${makeParam}/lease-deals`;

  return (
    <div className="mm-lease">
      <SEO
        title={`${pageTitle}: Find the Best Car Deals Right Now`}
        description={pageDescription}
        canonical={canonicalPath}
        keywords={[
          `${makeName} ${modelName} lease`,
          `${makeName} lease deals`,
          `${modelName} lease`,
          `car lease deals ${month} ${year}`,
          'lease specials',
        ]}
        structuredData={[
          createBreadcrumbStructuredData([
            { name: 'Home', url: BASE_URL },
            { name: 'Lease Deals', url: `${BASE_URL}/lease-deals` },
            { name: `${makeName} Lease Deals`, url: makeLeaseDealsUrl },
            { name: `${makeName} ${modelName}`, url: canonicalPath },
          ]),
        ]}
        noIndex={allDeals.length === 0}
      />

      <div className="mm-lease__hero">
        <div className="container">
          <div className="mm-lease__hero-content">
            <div className="mm-lease__hero-badge">
              <Car size={16} />
              <span>
                {makeName} {modelName}
              </span>
            </div>
            <nav className="mm-lease__breadcrumb" aria-label="Breadcrumb">
              <Link to="/">Home</Link>
              <span className="mm-lease__breadcrumb-sep">/</span>
              <Link to="/lease-deals">Lease Deals</Link>
              <span className="mm-lease__breadcrumb-sep">/</span>
              <Link to={makeParam ? `/${makeParam}/lease-deals` : '/lease-deals'}>
                {makeName} Lease Deals
              </Link>
              <span className="mm-lease__breadcrumb-sep">/</span>
              <span>
                {makeName} {modelName}
              </span>
            </nav>
            <h1 className="mm-lease__title">{pageTitle}</h1>
            <p className="mm-lease__description">{pageDescription}</p>
            <div className="mm-lease__hero-stats">
              <div className="mm-lease__hero-stat">
                <span className="mm-lease__hero-stat-value">{allDeals.length}</span>
                <span className="mm-lease__hero-stat-label">Lease Deals</span>
              </div>
              <div className="mm-lease__hero-stat">
                <span className="mm-lease__hero-stat-value">{lowestPayment > 0 ? `$${lowestPayment}` : '—'}</span>
                <span className="mm-lease__hero-stat-label">Lowest Payment</span>
              </div>
              <div className="mm-lease__hero-stat">
                <span className="mm-lease__hero-stat-value">{month}</span>
                <span className="mm-lease__hero-stat-label">{year} Deals</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mm-lease__toolbar">
        <div className="container mm-lease__toolbar-inner">
          <span className="mm-lease__toolbar-count">{allDeals.length} deals available</span>
          <button
            type="button"
            className={`mm-lease__toolbar-filter-btn ${hasActiveFilters ? 'mm-lease__toolbar-filter-btn--active' : ''}`}
            onClick={() => setFilterOpen(true)}
          >
            <SlidersHorizontal size={16} />
            <span>Filters</span>
            {activeFilterCount > 0 && <span className="mm-lease__toolbar-filter-badge">{activeFilterCount}</span>}
          </button>
        </div>
      </div>

      <div className="mm-lease__content">
        <div className="container">
          <div className="mm-lease__layout">
            <div className="mm-lease__main">
              <section className="mm-lease__section">
                <h2 className="mm-lease__section-title">
                  <Tag size={22} />
                  {makeName} {modelName} Lease Deals
                </h2>
                <div className="mm-lease__grid">
                  {allDeals.map((deal) => {
                    const vehicleName = `${deal.vehicle.year} ${deal.vehicle.make} ${deal.vehicle.model}`;
                    const saved = isVehicleSaved(vehicleName);
                    const isExpanded = expandedDealId === deal.id;
                    const leaseNum = deal.monthlyPaymentNum;
                    const { savingsVsAvg, savingsTooltip } = buildSavingsText(leaseNum, deal.vehicle.bodyStyle);

                    return (
                      <div key={deal.id} className="mm-lease__card">
                        <div className="mm-lease__card-header">
                          <Link to={`/${deal.vehicle.slug}`} className="mm-lease__card-name-link">
                            <h3 className="mm-lease__card-name">{vehicleName}</h3>
                          </Link>
                          <div className="mm-lease__card-rating">
                            <span className="mm-lease__card-rating-value">{deal.rating}</span>
                            <span className="mm-lease__card-rating-max">/10</span>
                            <span className="mm-lease__card-rating-label">C/D Rating</span>
                          </div>
                        </div>

                        <Link to={`/${deal.vehicle.slug}`} className="mm-lease__card-image-link">
                          <div className="mm-lease__card-image-container">
                            <img src={deal.vehicle.image} alt={vehicleName} className="mm-lease__card-image" />
                            <button
                              className={`mm-lease__card-save ${saved ? 'mm-lease__card-save--saved' : ''}`}
                              onClick={(e) =>
                                handleSaveClick(e, {
                                  name: vehicleName,
                                  slug: deal.vehicle.slug,
                                  image: deal.vehicle.image,
                                })
                              }
                              aria-label={saved ? 'Remove from favorites' : 'Add to favorites'}
                            >
                              <Heart size={16} fill={saved ? 'currentColor' : 'none'} />
                            </button>
                            {(() => {
                              const allOffers = getVehicleOffers(deal.vehicle.make, deal.vehicle.model);
                              if (allOffers.length > 1)
                                return (
                                  <button
                                    type="button"
                                    className="mm-lease__card-offers-tag"
                                    onClick={(e) =>
                                      toggleOffersPopup(e, deal.vehicle.make, deal.vehicle.model, deal.vehicle.slug)
                                    }
                                  >
                                    {allOffers.length} Offers Available
                                  </button>
                                );
                              return null;
                            })()}
                            {offersPopup?.slug === deal.vehicle.slug && (
                              <div className="mm-lease__card-offers-popup">
                                <div className="mm-lease__card-offers-popup-header">
                                  <strong>{offersPopup.offers.length} Available Offers</strong>
                                  <button
                                    type="button"
                                    className="mm-lease__card-offers-popup-close"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      e.stopPropagation();
                                      setOffersPopup(null);
                                    }}
                                  >
                                    &times;
                                  </button>
                                </div>
                                <ul className="mm-lease__card-offers-popup-list">
                                  {offersPopup.offers.map((o, idx) => (
                                    <li key={idx} className="mm-lease__card-offers-popup-item">
                                      <span
                                        className={`mm-lease__card-offers-popup-type mm-lease__card-offers-popup-type--${o.type}`}
                                      >
                                        {o.type === 'zero-apr'
                                          ? '0% APR'
                                          : o.type === 'cash'
                                            ? 'Cash'
                                            : o.type === 'finance'
                                              ? 'Finance'
                                              : 'Lease'}
                                      </span>
                                      <span className="mm-lease__card-offers-popup-label">{o.label}</span>
                                      <span className="mm-lease__card-offers-popup-exp">expires {formatExpiration(o.expires)}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                            {(deal.vehicle.editorsChoice || deal.vehicle.tenBest) && (
                              <div className="mm-lease__card-badges">
                                {deal.vehicle.tenBest && (
                                  <img src={TEN_BEST_BADGE_URL} alt="10Best" className="mm-lease__card-badge-img" />
                                )}
                                {deal.vehicle.editorsChoice && (
                                  <img
                                    src={EDITORS_CHOICE_BADGE_URL}
                                    alt="Editors' Choice"
                                    className="mm-lease__card-badge-img"
                                  />
                                )}
                              </div>
                            )}
                          </div>
                        </Link>

                        <div className="mm-lease__card-body">
                          <div className="mm-lease__card-payment-block">
                            <div className="mm-lease__card-payment">
                              <span className="mm-lease__card-payment-amount">{deal.monthlyPayment}</span>
                              <span className="mm-lease__card-payment-period">/mo</span>
                            </div>
                            <span className="mm-lease__card-payment-savings">
                              {savingsVsAvg}
                              <span className="mm-lease__card-tooltip-wrap">
                                <Info size={13} className="mm-lease__card-tooltip-icon" />
                                <span className="mm-lease__card-tooltip">{savingsTooltip}</span>
                              </span>
                            </span>
                          </div>
                          <button
                            className="mm-lease__card-deal-pill"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              setActiveDealId(deal.id);
                            }}
                          >
                            <span className="mm-lease__card-deal-pill-chip">{deal.chipLabel}</span>
                            <span className="mm-lease__card-deal-pill-text">{deal.monthlyPayment}/mo lease</span>
                            <span className="mm-lease__card-deal-pill-divider" />
                            <span className="mm-lease__card-deal-pill-expires">expires {formatExpiration(deal.expirationDate)}</span>
                          </button>
                          <div className="mm-lease__card-details">
                            <div className="mm-lease__card-detail">
                              <span className="mm-lease__card-detail-label">Term</span>
                              <span className="mm-lease__card-detail-value">{deal.term}</span>
                            </div>
                            <div className="mm-lease__card-detail">
                              <span className="mm-lease__card-detail-label">Due at Signing</span>
                              <span className="mm-lease__card-detail-value">{deal.dueAtSigning}</span>
                            </div>
                          </div>

                          <button type="button" className="mm-lease__card-cta" onClick={() => setActiveDealId(deal.id)}>
                            Get This Deal
                          </button>

                          <button
                            type="button"
                            className="mm-lease__card-toggle"
                            onClick={() => toggleDealDetails(deal.id)}
                            aria-expanded={isExpanded}
                          >
                            <span>Additional Details</span>
                            {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                          </button>

                          {isExpanded && (
                            <div className="mm-lease__card-additional">
                              <div className="mm-lease__card-additional-item">
                                <Info size={16} />
                                <div>
                                  <strong>{deal.programName}</strong>
                                  <p>{deal.programDescription}</p>
                                </div>
                              </div>
                              <div className="mm-lease__card-additional-item">
                                <Tag size={16} />
                                <div>
                                  <strong>Eligible Trims</strong>
                                  <p>{deal.trimsEligible.join(', ')}</p>
                                </div>
                              </div>
                              <div className="mm-lease__card-additional-item">
                                <Clock size={16} />
                                <div>
                                  <strong>Offer Expires</strong>
                                  <p>{formatExpiration(deal.expirationDate)}</p>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
                {allDeals.length === 0 && (
                  <div className="mm-lease__empty-state">
                    <p className="mm-lease__empty-state-text">
                      There are currently no active {makeName} {modelName} lease offers. Check back soon or explore other
                      lease deals.
                    </p>
                    <Link to="/lease-deals" className="mm-lease__empty-state-link">
                      Browse Lease Deals
                    </Link>
                  </div>
                )}
              </section>

              {makeParam && modelParam && (
                <section className="mm-lease__links-section">
                  <h2 className="mm-lease__section-title">More ways to explore</h2>
                  <div className="mm-lease__links-grid mm-lease__links-grid--two">
                    <Link to={`/${makeParam}/lease-deals`} className="mm-lease__link-card">
                      <h3>
                        {makeName} Lease Deals
                      </h3>
                      <p>See every lease offer we track for {makeName}</p>
                    </Link>
                    <Link to={`/${mmpYear}/${makeParam}/${modelParam}`} className="mm-lease__link-card">
                      <h3>
                        {mmpYear} {makeName} {modelName}
                      </h3>
                      <p>Specs, reviews, and the full model page</p>
                    </Link>
                  </div>
                </section>
              )}
            </div>

            <aside className="mm-lease__sidebar">
              <AdSidebar />
            </aside>
          </div>
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
        selectedIncentiveId={undefined}
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
        onApply={setFilters}
        totalResults={allDeals.length}
      />
    </div>
  );
};

export default LeaseByMakeModelPage;
