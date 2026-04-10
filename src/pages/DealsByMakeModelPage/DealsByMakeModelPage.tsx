import { useMemo, useState, useCallback } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ChevronDown, ChevronRight, Heart, Info, SlidersHorizontal, X } from 'lucide-react';
import { getZeroAprDeals } from '../../services/zeroAprDealsService';
import { getFinanceDeals, getCashDeals } from '../../services/cashFinanceDealsService';
import { getLeaseDeals } from '../../services/leaseDealsService';
import { getCurrentPeriod, formatExpiration } from '../../utils/dateUtils';
import {
  parseMsrpMin,
  calcMonthly,
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
import AdSidebar from '../../components/AdSidebar';
import SignInToSaveModal from '../../components/SignInToSaveModal';
import { EDITORS_CHOICE_BADGE_URL, TEN_BEST_BADGE_URL } from '../../constants/badges';
import IncentivesModal, { getAprRangeLabel } from '../../components/IncentivesModal/IncentivesModal';
import type { IncentiveOfferDetail } from '../../components/IncentivesModal/IncentivesModal';
import { DealsFilterModal } from '../../components/DealsFilterModal';
import type { DealsFilterState } from '../../components/DealsFilterModal';
import SavingsText from '../../components/SavingsText';
import './DealsByMakeModelPage.css';

type DealKind = 'zero-apr' | 'finance' | 'lease' | 'cash';

interface UnifiedMakeDeal {
  id: string;
  dealType: DealKind;
  chipLabel: 'Finance' | 'Lease' | 'Cash';
  vehicle: Vehicle;
  rating: number;
  sortMonthly: number;
  expirationDate: string;
  programName: string;
  programDescription: string;
  trimsEligible: string[];
  term?: string;
  targetAudience?: string;
  aprDisplay?: string;
  monthlyPayment?: string;
  monthlyPaymentNum?: number;
  dueAtSigning?: string;
  mileageAllowance?: string;
  incentiveValue?: string;
  incentiveAmount?: number;
  percentOffMsrp?: string;
}

const DEFAULT_FILTERS: DealsFilterState = {
  tab: 'best-deals',
  dealType: 'all',
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

function buildActiveOffer(deal: UnifiedMakeDeal | null): Partial<IncentiveOfferDetail> | undefined {
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

  if (deal.dealType === 'lease') {
    return {
      ...base,
      offerHeadline: `Lease for ${deal.monthlyPayment}/month`,
      whatItMeans: `Instead of buying, you're renting the car for ${deal.term}. Your monthly payment is just ${deal.monthlyPayment} with ${deal.dueAtSigning} due at signing.`,
      yourSavings: `${deal.monthlyPayment}/mo is significantly lower than a typical purchase payment. ${deal.dueAtSigning} due at signing. Includes ${deal.mileageAllowance} mileage allowance.`,
      whoQualifies: "Well-qualified lessees with approved credit through the manufacturer's financial arm.",
    };
  }

  if (deal.dealType === 'cash') {
    return {
      ...base,
      offerHeadline: 'Cash Back',
      whatItMeans: deal.programDescription,
      yourSavings: `${deal.incentiveValue} customer cash. Approximately ${deal.percentOffMsrp} off MSRP.`,
      whoQualifies: 'Retail buyers on eligible new vehicles; see program details for restrictions.',
    };
  }

  const aprStr = deal.dealType === 'zero-apr' ? '0%' : deal.aprDisplay ?? '';
  const headline = `${aprStr} APR Financing for ${deal.term}`;
  return {
    ...base,
    offerHeadline: headline,
    whatItMeans:
      "A below-market interest rate from the manufacturer that lowers your monthly payment and total cost.",
    yourSavings: `Could save you $1,500–$3,000 in interest over the loan term.`,
    whoQualifies: deal.targetAudience,
  };
}

const DealsByMakeModelPage = () => {
  const { make: makeParam, model: modelParam } = useParams<{ make: string; model: string }>();
  const makeName = makeParam
    ? makeParam
        .split('-')
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
        .join(' ')
    : '';
  const modelName = modelParam
    ? modelParam
        .split('-')
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
        .join(' ')
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

  const { pills: activeFilterPills, clearAllFilters } = useActiveFilterPills(filters, setFilters);

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

  const allDeals = useMemo((): UnifiedMakeDeal[] => {
    const out: UnifiedMakeDeal[] = [];

    for (const d of getZeroAprDeals()) {
      if (!matchesMakeAndModel(d.vehicle)) continue;
      if (!matchesFilters(d.vehicle, { term: d.term, targetAudience: d.targetAudience })) continue;
      const msrp = parseMsrpMin(d.vehicle.priceRange);
      const months = parseTermMonths(d.term);
      const monthly = calcMonthly(msrp, 0, months);
      out.push({
        id: d.id,
        dealType: 'zero-apr',
        chipLabel: 'Finance',
        vehicle: d.vehicle,
        rating: getSupabaseRating(d.vehicle.id, getCategory(d.vehicle.bodyStyle), d.vehicle.staffRating),
        sortMonthly: monthly,
        expirationDate: d.expirationDate,
        programName: d.programName,
        programDescription: d.programDescription,
        trimsEligible: d.trimsEligible,
        term: d.term,
        targetAudience: d.targetAudience,
        aprDisplay: '0%',
      });
    }

    for (const d of getFinanceDeals()) {
      if (!matchesMakeAndModel(d.vehicle)) continue;
      if (!matchesFilters(d.vehicle, { term: d.term, targetAudience: d.targetAudience })) continue;
      const msrp = parseMsrpMin(d.vehicle.priceRange);
      const aprNum = parseFloat(d.apr.replace('%', ''));
      const months = parseTermMonths(d.term);
      const monthly = calcMonthly(msrp, aprNum, months);
      const rangeLabel = getAprRangeLabel({ value: `${d.apr} APR`, title: d.programName, terms: d.term });
      out.push({
        id: d.id,
        dealType: 'finance',
        chipLabel: 'Finance',
        vehicle: d.vehicle,
        rating: getSupabaseRating(d.vehicle.id, getCategory(d.vehicle.bodyStyle), d.vehicle.staffRating),
        sortMonthly: monthly,
        expirationDate: d.expirationDate,
        programName: d.programName,
        programDescription: d.programDescription,
        trimsEligible: d.trimsEligible,
        term: d.term,
        targetAudience: d.targetAudience,
        aprDisplay: rangeLabel.replace(/\s*APR$/, ''),
      });
    }

    for (const d of getCashDeals()) {
      if (!matchesMakeAndModel(d.vehicle)) continue;
      if (!matchesFilters(d.vehicle)) continue;
      const msrp = parseMsrpMin(d.vehicle.priceRange);
      const principal = Math.max(msrp - d.incentiveAmount, 1);
      const monthlyAfterCash = calcMonthly(principal, 6.5, 60);
      out.push({
        id: d.id,
        dealType: 'cash',
        chipLabel: 'Cash',
        vehicle: d.vehicle,
        rating: getSupabaseRating(d.vehicle.id, getCategory(d.vehicle.bodyStyle), d.vehicle.staffRating),
        sortMonthly: monthlyAfterCash,
        expirationDate: d.expirationDate,
        programName: d.programName,
        programDescription: d.programDescription,
        trimsEligible: d.trimsEligible,
        incentiveValue: d.incentiveValue,
        incentiveAmount: d.incentiveAmount,
        percentOffMsrp: d.percentOffMsrp,
      });
    }

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
  }, [getSupabaseRating, matchesFilters, matchesMakeAndModel]);

  const mmpYear = useMemo(() => {
    if (allDeals.length === 0) return year;
    return String(Math.max(...allDeals.map((d) => parseInt(d.vehicle.year, 10) || 0)));
  }, [allDeals, year]);

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

  const pageTitle = `Best ${makeName} ${modelName} Deals & Incentives for ${month} ${year}`;
  const pageDescription = `Find the best ${makeName} ${modelName} deals, incentives, and offers for ${month} ${year}. Compare financing rates, lease specials, and more from Car and Driver.`;
  const BASE_URL = 'https://www.caranddriver.com';
  const canonicalPath =
    makeParam && modelParam ? `${BASE_URL}/${makeParam}/${modelParam}/deals-incentives` : BASE_URL;
  const makeDealsPath = makeParam ? `/${makeParam}/deals-incentives` : '/deals';

  return (
    <div className="mm-deals">
      <SEO
        title={`${pageTitle}: Find the Best Car Deals Right Now`}
        description={pageDescription}
        canonical={canonicalPath}
        keywords={[
          `${makeName} ${modelName} deals`,
          `${makeName} ${modelName} incentives`,
          `${makeName} deals`,
          `${modelName} deals`,
          `car deals ${month} ${year}`,
          'new car incentives',
          'lease specials',
          'finance deals',
        ]}
        structuredData={[
          createBreadcrumbStructuredData([
            { name: 'Home', url: BASE_URL },
            { name: 'Deals', url: `${BASE_URL}/deals` },
            {
              name: `${makeName} Deals`,
              url: makeParam ? `${BASE_URL}/${makeParam}/deals-incentives` : `${BASE_URL}/deals`,
            },
            { name: `${makeName} ${modelName}`, url: canonicalPath },
          ]),
        ]}
        noIndex={allDeals.length === 0}
      />

      <div className="mm-deals__toolbar">
        <div className="container mm-deals__toolbar-inner">
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
            className={`mm-deals__toolbar-filter-btn ${activeFilterPills.length > 0 ? 'mm-deals__toolbar-filter-btn--active' : ''}`}
            onClick={() => setFilterOpen(true)}
          >
            <SlidersHorizontal size={16} />
            <span>Filters</span>
            {activeFilterPills.length > 0 && (
              <span className="mm-deals__toolbar-filter-badge">{activeFilterPills.length}</span>
            )}
          </button>
        </div>
      </div>

      <div className="mm-deals__hero">
        <div className="container">
          <div className="mm-deals__hero-content">
            <div className="mm-deals__hero-badge">
              <span className="hero-pill__label">
                {makeName} {modelName}
              </span>
            </div>
            <nav className="mm-deals__breadcrumb" aria-label="Breadcrumb">
              <Link to="/">Home</Link>
              <span className="mm-deals__breadcrumb-sep">/</span>
              <Link to="/deals">Deals</Link>
              <span className="mm-deals__breadcrumb-sep">/</span>
              <Link to={makeDealsPath}>{makeName} Deals</Link>
              <span className="mm-deals__breadcrumb-sep">/</span>
              <span>
                {makeName} {modelName}
              </span>
            </nav>
            <h1 className="mm-deals__title">{pageTitle}</h1>
            <p className="mm-deals__description">{pageDescription}</p>
          </div>
        </div>
      </div>

      <div className="mm-deals__content">
        <div className="container">
          <div className="mm-deals__layout">
            <div className="mm-deals__main">
              <section className="mm-deals__section">
                <div className="mm-deals__grid">
                  {allDeals.map((deal) => {
                    const vehicleName = `${deal.vehicle.year} ${deal.vehicle.make} ${deal.vehicle.model}`;
                    const saved = isVehicleSaved(vehicleName);
                    const isLease = deal.dealType === 'lease';
                    const isCash = deal.dealType === 'cash';

                    return (
                      <div key={deal.id} className="mm-deals__card">
                        <div className="mm-deals__card-header">
                          <Link to={`/${deal.vehicle.slug}`} className="mm-deals__card-name-link">
                            <h3 className="mm-deals__card-name">{vehicleName}</h3>
                          </Link>
                          <div className="mm-deals__card-rating">
                            <span className="mm-deals__card-rating-value">{deal.rating}</span>
                            <span className="mm-deals__card-rating-max">/10</span>
                            <span className="mm-deals__card-rating-label">C/D Rating</span>
                          </div>
                        </div>

                        <Link to={`/${deal.vehicle.slug}`} className="mm-deals__card-image-link">
                          <div className="mm-deals__card-image-container">
                            <img src={deal.vehicle.image} alt={vehicleName} className="mm-deals__card-image" />
                            <span className="mm-deals__card-deal-type-tag">{deal.chipLabel}</span>
                            <button
                              className={`mm-deals__card-save ${saved ? 'mm-deals__card-save--saved' : ''}`}
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
                                    className="mm-deals__card-offers-tag"
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
                              <div className="mm-deals__card-offers-popup">
                                <div className="mm-deals__card-offers-popup-header">
                                  <strong>{offersPopup.offers.length} Available Offers</strong>
                                  <button
                                    type="button"
                                    className="mm-deals__card-offers-popup-close"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      e.stopPropagation();
                                      setOffersPopup(null);
                                    }}
                                  >
                                    &times;
                                  </button>
                                </div>
                                <ul className="mm-deals__card-offers-popup-list">
                                  {offersPopup.offers.map((o, idx) => (
                                    <li key={idx} className="mm-deals__card-offers-popup-item">
                                      <span
                                        className={`mm-deals__card-offers-popup-type mm-deals__card-offers-popup-type--${o.type}`}
                                      >
                                        {o.type === 'zero-apr'
                                          ? '0% APR'
                                          : o.type === 'cash'
                                            ? 'Cash'
                                            : o.type === 'finance'
                                              ? 'Finance'
                                              : 'Lease'}
                                      </span>
                                      <span className="mm-deals__card-offers-popup-label">{o.label}</span>
                                      <span className="mm-deals__card-offers-popup-exp">expires {formatExpiration(o.expires)}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                            {(deal.vehicle.editorsChoice || deal.vehicle.tenBest) && (
                              <div className="mm-deals__card-badges">
                                {deal.vehicle.tenBest && (
                                  <img src={TEN_BEST_BADGE_URL} alt="10Best" className="mm-deals__card-badge-img" />
                                )}
                                {deal.vehicle.editorsChoice && (
                                  <img
                                    src={EDITORS_CHOICE_BADGE_URL}
                                    alt="Editors' Choice"
                                    className="mm-deals__card-badge-img"
                                  />
                                )}
                              </div>
                            )}
                          </div>
                        </Link>

                        <div className="mm-deals__card-body">
                          {isLease ? (
                            <>
                              {(() => {
                                const leaseNum = deal.monthlyPaymentNum!;
                                const { savingsVsAvg, savingsTooltip } = buildSavingsText(
                                  leaseNum,
                                  deal.vehicle.bodyStyle,
                                );
                                return (
                                  <div className="mm-deals__card-payment-block">
                                    <div className="mm-deals__card-payment">
                                      <span className="mm-deals__card-payment-amount">{deal.monthlyPayment}</span>
                                      <span className="mm-deals__card-payment-period">/mo</span>
                                    </div>
                                    <span className="mm-deals__card-payment-savings">
                                      <SavingsText text={savingsVsAvg} />
                                      <span className="mm-deals__card-tooltip-wrap">
                                        <Info size={13} className="mm-deals__card-tooltip-icon" />
                                        <span className="mm-deals__card-tooltip">{savingsTooltip}</span>
                                      </span>
                                    </span>
                                    <span className="mm-deals__card-payment-expires">Expires {formatExpiration(deal.expirationDate)}</span>
                                  </div>
                                );
                              })()}
                              <button
                                className="mm-deals__card-deal-pill"
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  setActiveDealId(deal.id);
                                }}
                              >
                                <span className="mm-deals__card-deal-pill-chip">{deal.chipLabel}</span>
                                <span className="mm-deals__card-deal-pill-text">
                                  {deal.monthlyPayment}/mo lease
                                </span>
                                <span className="mm-deals__card-deal-pill-divider" />
                                <span className="mm-deals__card-deal-pill-expires">
                                  expires {formatExpiration(deal.expirationDate)}
                                </span>
                              </button>
                              <div className="mm-deals__card-details">
                                <div className="mm-deals__card-detail">
                                  <span className="mm-deals__card-detail-label">Term</span>
                                  <span className="mm-deals__card-detail-value">{deal.term}</span>
                                </div>
                                <div className="mm-deals__card-detail">
                                  <span className="mm-deals__card-detail-label">Due at Signing</span>
                                  <span className="mm-deals__card-detail-value">{deal.dueAtSigning}</span>
                                </div>
                              </div>
                            </>
                          ) : isCash ? (
                            <>
                              {(() => {
                                const msrp = parseMsrpMin(deal.vehicle.priceRange);
                                const principal = Math.max(msrp - (deal.incentiveAmount ?? 0), 1);
                                const monthlyAfterCash = calcMonthly(principal, 6.5, 60);
                                const { savingsTooltip } = buildSavingsText(
                                  monthlyAfterCash,
                                  deal.vehicle.bodyStyle,
                                  'cash',
                                );
                                return (
                                  <div className="mm-deals__card-payment-block">
                                    <div className="mm-deals__card-payment">
                                      <span className="mm-deals__card-payment-amount">{deal.incentiveValue}</span>
                                      <span className="mm-deals__card-payment-period">Cash Back</span>
                                    </div>
                                    <span className="mm-deals__card-payment-savings">
                                      {deal.percentOffMsrp} off MSRP
                                      <span className="mm-deals__card-tooltip-wrap">
                                        <Info size={13} className="mm-deals__card-tooltip-icon" />
                                        <span className="mm-deals__card-tooltip">{savingsTooltip}</span>
                                      </span>
                                    </span>
                                    <span className="mm-deals__card-payment-expires">Expires {formatExpiration(deal.expirationDate)}</span>
                                  </div>
                                );
                              })()}
                              <button
                                className="mm-deals__card-deal-pill"
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  setActiveDealId(deal.id);
                                }}
                              >
                                <span className="mm-deals__card-deal-pill-chip">{deal.chipLabel}</span>
                                <span className="mm-deals__card-deal-pill-text">
                                  {deal.incentiveValue} cash back
                                </span>
                                <span className="mm-deals__card-deal-pill-divider" />
                                <span className="mm-deals__card-deal-pill-expires">
                                  expires {formatExpiration(deal.expirationDate)}
                                </span>
                              </button>
                              <div className="mm-deals__card-details">
                                <div className="mm-deals__card-detail">
                                  <span className="mm-deals__card-detail-label">MSRP Range</span>
                                  <span className="mm-deals__card-detail-value">{deal.vehicle.priceRange}</span>
                                </div>
                                <div className="mm-deals__card-detail">
                                  <span className="mm-deals__card-detail-label">Est. off MSRP</span>
                                  <span className="mm-deals__card-detail-value">{deal.percentOffMsrp}</span>
                                </div>
                              </div>
                            </>
                          ) : (
                            <>
                              {(() => {
                                const msrp = parseMsrpMin(deal.vehicle.priceRange);
                                const aprNum =
                                  deal.dealType === 'zero-apr' ? 0 : parseFloat((deal.aprDisplay ?? '').replace('%', ''));
                                const months = parseTermMonths(deal.term!);
                                const monthly = calcMonthly(msrp, aprNum, months);
                                const { savingsVsAvg, savingsTooltip } = buildSavingsText(monthly, deal.vehicle.bodyStyle);
                                return (
                                  <div className="mm-deals__card-payment-block">
                                    <div className="mm-deals__card-payment">
                                      <span className="mm-deals__card-payment-amount">{deal.aprDisplay}</span>
                                      <span className="mm-deals__card-payment-period"> APR</span>
                                    </div>
                                    <span className="mm-deals__card-payment-savings">
                                      <SavingsText text={savingsVsAvg} />
                                      <span className="mm-deals__card-tooltip-wrap">
                                        <Info size={13} className="mm-deals__card-tooltip-icon" />
                                        <span className="mm-deals__card-tooltip">{savingsTooltip}</span>
                                      </span>
                                    </span>
                                    <span className="mm-deals__card-payment-expires">Expires {formatExpiration(deal.expirationDate)}</span>
                                  </div>
                                );
                              })()}
                              <button
                                className="mm-deals__card-deal-pill"
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  setActiveDealId(deal.id);
                                }}
                              >
                                <span className="mm-deals__card-deal-pill-chip">{deal.chipLabel}</span>
                                <span className="mm-deals__card-deal-pill-text">
                                  {deal.dealType === 'zero-apr'
                                    ? `0% APR for ${deal.term}`
                                    : `${deal.aprDisplay} APR for ${deal.term}`}
                                </span>
                                <span className="mm-deals__card-deal-pill-divider" />
                                <span className="mm-deals__card-deal-pill-expires">
                                  expires {formatExpiration(deal.expirationDate)}
                                </span>
                              </button>
                              <div className="mm-deals__card-details">
                                <div className="mm-deals__card-detail">
                                  <span className="mm-deals__card-detail-label">MSRP Range</span>
                                  <span className="mm-deals__card-detail-value">{deal.vehicle.priceRange}</span>
                                </div>
                                <div className="mm-deals__card-detail">
                                  <span className="mm-deals__card-detail-label">Term</span>
                                  <span className="mm-deals__card-detail-value">{deal.term}</span>
                                </div>
                              </div>
                            </>
                          )}

                          <button type="button" className="mm-deals__card-cta" onClick={() => setActiveDealId(deal.id)}>
                            Get This Deal
                          </button>

                          <Link
                            to={`/${deal.vehicle.slug}`}
                            className="mm-deals__card-toggle"
                          >
                            <span>Read More</span>
                            <ChevronRight size={14} />
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>
                {allDeals.length === 0 && (
                  <div className="mm-deals__empty-state">
                    <p className="mm-deals__empty-state-text">
                      There are currently no active {makeName} {modelName} offers. Check back soon or explore other
                      available deals.
                    </p>
                    <Link to="/deals" className="mm-deals__empty-state-link">
                      Browse All Deals
                    </Link>
                  </div>
                )}
              </section>

              {makeParam && modelParam && (
                <section className="mm-deals__links-section">
                  <h2 className="mm-deals__section-title">Explore {makeName} {modelName}</h2>
                  <div className="mm-deals__links-grid">
                    <Link to={makeDealsPath} className="mm-deals__link-card">
                      <h3>All {makeName} Deals</h3>
                      <p>View financing and lease incentives across every {makeName} model</p>
                    </Link>
                    <Link to={`/${mmpYear}/${makeParam}/${modelParam}`} className="mm-deals__link-card">
                      <h3>
                        {mmpYear} {makeName} {modelName}
                      </h3>
                      <p>Browse this vehicle on the MotorTrend Marketplace</p>
                    </Link>
                  </div>
                </section>
              )}
            </div>

            <aside className="mm-deals__sidebar">
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
        onApply={handleFilterApply}
        totalResults={allDeals.length}
      />
    </div>
  );
};

export default DealsByMakeModelPage;
