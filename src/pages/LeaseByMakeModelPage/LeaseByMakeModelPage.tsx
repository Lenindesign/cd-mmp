import { Fragment, useMemo, useState, useCallback, type MouseEvent } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Heart, Info, SlidersHorizontal, X } from 'lucide-react';
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
import { useActiveFilterPills } from '../../hooks/useActiveFilterPills';
import type { VehicleOfferSummary } from '../../utils/dealCalculations';
import type { Vehicle } from '../../types/vehicle';
import { useSupabaseRatings, getCategory } from '../../hooks/useSupabaseRating';
import { useAuth } from '../../contexts/AuthContext';
import { SEO, createBreadcrumbStructuredData } from '../../components/SEO';
import AdBanner from '../../components/AdBanner';
import AdSidebar from '../../components/AdSidebar';
import SignInToSaveModal from '../../components/SignInToSaveModal';
import { EDITORS_CHOICE_BADGE_URL, TEN_BEST_BADGE_URL } from '../../constants/badges';
import IncentivesModal from '../../components/IncentivesModal/IncentivesModal';
import type { IncentiveOfferDetail } from '../../components/IncentivesModal/IncentivesModal';
import { DealsFilterModal } from '../../components/DealsFilterModal';
import type { DealsFilterState } from '../../components/DealsFilterModal';
import SavingsText from '../../components/SavingsText';
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
  dealType: 'lease',
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
  sortBy: 'a-z',
};

/** In-feed leaderboard after each batch of this many deal cards (e.g. 6 rows × 2 columns) */
const GRID_BREAKER_AFTER_CARD_COUNT = 12;
const DEALS_GRID_BREAKER_AD_URL =
  'https://d2kde5ohu8qb21.cloudfront.net/files/693a37c1e2108b000272edd6/nissan.jpg';

/** Sidebar stack after the first full-bleed in-feed ad (distinct creatives from the initial column) */
const SIDEBAR_AFTER_BREAK_PROPS = {
  imageUrl: 'https://d2kde5ohu8qb21.cloudfront.net/files/69387d364230820002694996/300x600.jpg',
  altText: 'Advertisement',
  secondaryImageUrl: DEALS_GRID_BREAKER_AD_URL,
  secondaryAltText: 'Advertisement',
  link: '#',
  secondaryLink: '#',
};

function chunkArray<T>(items: T[], chunkSize: number): T[][] {
  if (chunkSize <= 0) return [items];
  const chunks: T[][] = [];
  for (let i = 0; i < items.length; i += chunkSize) {
    chunks.push(items.slice(i, i + chunkSize));
  }
  return chunks;
}

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

  const [showSignInModal, setShowSignInModal] = useState(false);
  const [pendingSaveVehicle, setPendingSaveVehicle] = useState<{ name: string; slug: string; image?: string } | null>(
    null,
  );
  const [activeDealId, setActiveDealId] = useState<string | null>(null);
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState<DealsFilterState>(DEFAULT_FILTERS);
  const navigate = useNavigate();
  const handleFilterApply = useCallback((applied: DealsFilterState) => {
    const params = new URLSearchParams();
    params.set('filters', JSON.stringify(applied));
    navigate(`/deals/all?${params.toString()}`);
  }, [navigate]);
  const [offersPopup, setOffersPopup] = useState<{ slug: string; offers: VehicleOfferSummary[] } | null>(null);

  const { pills: activeFilterPills, clearAllFilters } = useActiveFilterPills(filters, setFilters, DEFAULT_FILTERS);

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

  const dealChunks = useMemo(() => chunkArray(allDeals, GRID_BREAKER_AFTER_CARD_COUNT), [allDeals]);

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

  const activeDealObj = activeDealId ? allDeals.find((d) => d.id === activeDealId) : null;
  const activeOffer = buildActiveOffer(activeDealObj ?? null);

  const pageTitle = `Best ${makeName} ${modelName} Lease Deals for ${month} ${year}`;
  const pageDescription = `Find the best ${makeName} ${modelName} lease deals for ${month} ${year}. Compare monthly payments, terms, and manufacturer lease specials from Car and Driver.`;
  const BASE_URL = 'https://www.caranddriver.com';
  const canonicalPath =
    makeParam && modelParam ? `${BASE_URL}/${makeParam}/${modelParam}/lease-deals` : BASE_URL;

  const makeLeaseDealsUrl = `${BASE_URL}/${makeParam}/lease-deals`;

  const renderLeaseDealCard = (deal: LeaseByMakeModelDeal) => {
    const vehicleName = `${deal.vehicle.year} ${deal.vehicle.make} ${deal.vehicle.model}`;
    const saved = isVehicleSaved(vehicleName);
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
            <span className="mm-lease__card-deal-type-tag">{deal.chipLabel}</span>
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
                              ? 'Buy'
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
              <SavingsText text={savingsVsAvg} />
              <span className="mm-lease__card-tooltip-wrap">
                <Info size={13} className="mm-lease__card-tooltip-icon" />
                <span className="mm-lease__card-tooltip">{savingsTooltip}</span>
              </span>
            </span>
            <span className="mm-lease__card-payment-expires">Expires {formatExpiration(deal.expirationDate)}</span>
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

          <Link
            to={`/${deal.vehicle.slug}`}
            className="mm-lease__card-cta mm-lease__card-cta--secondary"
          >
            Shop New {deal.vehicle.model}
          </Link>
        </div>
      </div>
    );
  };

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

      <div className="mm-lease__toolbar">
        <div className="container mm-lease__toolbar-inner">
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
            className={`mm-lease__toolbar-filter-btn ${activeFilterPills.length > 0 ? 'mm-lease__toolbar-filter-btn--active' : ''}`}
            onClick={() => setFilterOpen(true)}
          >
            <SlidersHorizontal size={16} />
            <span>Filters</span>
            {activeFilterPills.length > 0 && (
              <span className="mm-lease__toolbar-filter-badge">{activeFilterPills.length}</span>
            )}
          </button>
        </div>
      </div>

      <div className="mm-lease__hero">
        <div className="container">
          <div className="mm-lease__hero-content">
            <div className="mm-lease__hero-badge">
              <span className="hero-pill__label">
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
          </div>
        </div>
      </div>

      <AdBanner imageUrl={DEALS_GRID_BREAKER_AD_URL} altText="Advertisement" />

      <div className="mm-lease__content">
        <div className={`container${allDeals.length > 0 ? ' mm-lease__container--stacked' : ''}`}>
          {allDeals.length === 0 ? (
            <div className="mm-lease__segment">
              <div className="mm-lease__main">
                <section className="mm-lease__section">
                  <div className="mm-lease__grid">
                    <div className="mm-lease__empty-state">
                      <p className="mm-lease__empty-state-text">
                        There are currently no active {makeName} {modelName} lease offers. Check back soon or explore
                        other lease deals.
                      </p>
                      <Link to="/lease-deals" className="mm-lease__empty-state-link">
                        Browse Lease Deals
                      </Link>
                    </div>
                  </div>
                </section>
              </div>
              <aside className="mm-lease__sidebar" aria-label="Advertisement">
                <div className="mm-lease__sidebar-sticky">
                  <AdSidebar />
                </div>
              </aside>
            </div>
          ) : (
            <>
              {dealChunks.map((chunk, chunkIndex) => (
                <Fragment key={`lease-segment-${chunkIndex}`}>
                  <div className="mm-lease__segment">
                    <div className="mm-lease__main">
                      <section className="mm-lease__section">
                        <div className="mm-lease__grid">{chunk.map((deal) => renderLeaseDealCard(deal))}</div>
                      </section>
                    </div>
                    <aside className="mm-lease__sidebar" aria-label="Advertisement">
                      <div className="mm-lease__sidebar-sticky">
                        {chunkIndex === 0 ? <AdSidebar /> : <AdSidebar {...SIDEBAR_AFTER_BREAK_PROPS} />}
                      </div>
                    </aside>
                  </div>
                  {chunkIndex < dealChunks.length - 1 && (
                    <div className="mm-lease__full-bleed-breaker" role="complementary" aria-label="Advertisement">
                      <AdBanner imageUrl={DEALS_GRID_BREAKER_AD_URL} altText="Advertisement" />
                    </div>
                  )}
                </Fragment>
              ))}
            </>
          )}

          <div className="mm-lease__segment mm-lease__segment--tail">
            <div className="mm-lease__main">
              {makeParam && modelParam && (
                <section className="mm-lease__links-section">
                  <h2 className="mm-lease__section-title">More ways to explore</h2>
                  <div className="mm-lease__links-grid mm-lease__links-grid--two">
                    <Link to={`/${makeParam}/lease-deals`} className="mm-lease__link-card">
                      <h3>{makeName} Lease Deals</h3>
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
            <aside className="mm-lease__sidebar" aria-label="Advertisement">
              <div className="mm-lease__sidebar-sticky">
                <AdSidebar {...(dealChunks.length > 1 ? SIDEBAR_AFTER_BREAK_PROPS : {})} />
              </div>
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
        onApply={handleFilterApply}
        totalResults={allDeals.length}
        dealPageType="lease"
      />
    </div>
  );
};

export default LeaseByMakeModelPage;
