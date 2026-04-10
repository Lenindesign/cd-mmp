import { useMemo, useState, useCallback } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ChevronDown, ChevronUp, Heart, Info, Tag, Users, Clock, SlidersHorizontal, X } from 'lucide-react';
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
import './DealsByMakePage.css';

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

const DealsByMakePage = () => {
  const { make: makeParam } = useParams<{ make: string }>();
  const makeName = makeParam
    ? makeParam
        .split('-')
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
        .join(' ')
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
  const navigate = useNavigate();
  const handleFilterApply = useCallback((applied: DealsFilterState) => {
    const params = new URLSearchParams();
    params.set('filters', JSON.stringify(applied));
    navigate(`/deals/all?${params.toString()}`);
  }, [navigate]);
  const [offersPopup, setOffersPopup] = useState<{ slug: string; offers: VehicleOfferSummary[] } | null>(null);

  const { pills: activeFilterPills, clearAllFilters } = useActiveFilterPills(filters, setFilters);

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

  const allDeals = useMemo((): UnifiedMakeDeal[] => {
    const out: UnifiedMakeDeal[] = [];

    for (const d of getZeroAprDeals()) {
      if (!matchesMake(d.vehicle)) continue;
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
      if (!matchesMake(d.vehicle)) continue;
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
      if (!matchesMake(d.vehicle)) continue;
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

    return out.sort((a, b) => a.sortMonthly - b.sortMonthly);
  }, [getSupabaseRating, matchesFilters, matchesMake]);

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
        label: `${y} ${makeName} ${model} Deals`,
        to: `/${makeParam}/${modelSlug}/deals-incentives`,
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

  const toggleDealDetails = (dealId: string) => {
    setExpandedDealId((prev) => (prev === dealId ? null : dealId));
  };

  const activeDealObj = activeDealId ? allDeals.find((d) => d.id === activeDealId) : null;
  const activeOffer = buildActiveOffer(activeDealObj ?? null);

  const pageTitle = `Best ${makeName} Deals & Incentives for ${month} ${year}`;
  const pageDescription = `Find the best ${makeName} deals, incentives, and offers for ${month} ${year}. Compare financing rates, lease specials, and more from Car and Driver.`;
  const BASE_URL = 'https://www.caranddriver.com';
  const canonicalPath = makeParam ? `${BASE_URL}/${makeParam}/deals-incentives` : BASE_URL;

  return (
    <div className="make-deals">
      <SEO
        title={`${pageTitle}: Find the Best Car Deals Right Now`}
        description={pageDescription}
        canonical={canonicalPath}
        keywords={[
          `${makeName} deals`,
          `${makeName} incentives`,
          `car deals ${month} ${year}`,
          'new car incentives',
          'lease specials',
          'finance deals',
        ]}
        structuredData={[
          createBreadcrumbStructuredData([
            { name: 'Home', url: BASE_URL },
            { name: 'Deals', url: `${BASE_URL}/deals` },
            { name: `${makeName} Deals`, url: canonicalPath },
          ]),
        ]}
        noIndex={allDeals.length === 0}
      />

      <div className="make-deals__hero">
        <div className="container">
          <div className="make-deals__hero-content">
            <div className="make-deals__hero-badge">
              <span className="hero-pill__label">{makeName}</span>
            </div>
            <nav className="make-deals__breadcrumb" aria-label="Breadcrumb">
              <Link to="/">Home</Link>
              <span className="make-deals__breadcrumb-sep">/</span>
              <Link to="/deals">Deals</Link>
              <span className="make-deals__breadcrumb-sep">/</span>
              <span>{makeName} Deals</span>
            </nav>
            <h1 className="make-deals__title">{pageTitle}</h1>
            <p className="make-deals__description">{pageDescription}</p>
          </div>
        </div>
      </div>

      <div className="make-deals__toolbar">
        <div className="container make-deals__toolbar-inner">
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
            className={`make-deals__toolbar-filter-btn ${activeFilterPills.length > 0 ? 'make-deals__toolbar-filter-btn--active' : ''}`}
            onClick={() => setFilterOpen(true)}
          >
            <SlidersHorizontal size={16} />
            <span>Filters</span>
            {activeFilterPills.length > 0 && (
              <span className="make-deals__toolbar-filter-badge">{activeFilterPills.length}</span>
            )}
          </button>
        </div>
      </div>

      <div className="make-deals__content">
        <div className="container">
          <div className="make-deals__layout">
            <div className="make-deals__main">
              <section className="make-deals__section">
                <div className="make-deals__grid">
                  {allDeals.map((deal) => {
                    const vehicleName = `${deal.vehicle.year} ${deal.vehicle.make} ${deal.vehicle.model}`;
                    const saved = isVehicleSaved(vehicleName);
                    const isExpanded = expandedDealId === deal.id;
                    const isLease = deal.dealType === 'lease';
                    const isCash = deal.dealType === 'cash';

                    return (
                      <div key={deal.id} className="make-deals__card">
                        <div className="make-deals__card-header">
                          <Link to={`/${deal.vehicle.slug}`} className="make-deals__card-name-link">
                            <h3 className="make-deals__card-name">{vehicleName}</h3>
                          </Link>
                          <div className="make-deals__card-rating">
                            <span className="make-deals__card-rating-value">{deal.rating}</span>
                            <span className="make-deals__card-rating-max">/10</span>
                            <span className="make-deals__card-rating-label">C/D Rating</span>
                          </div>
                        </div>

                        <Link to={`/${deal.vehicle.slug}`} className="make-deals__card-image-link">
                          <div className="make-deals__card-image-container">
                            <img src={deal.vehicle.image} alt={vehicleName} className="make-deals__card-image" />
                            <span className="make-deals__card-deal-type-tag">{deal.chipLabel}</span>
                            <button
                              className={`make-deals__card-save ${saved ? 'make-deals__card-save--saved' : ''}`}
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
                                    className="make-deals__card-offers-tag"
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
                              <div className="make-deals__card-offers-popup">
                                <div className="make-deals__card-offers-popup-header">
                                  <strong>{offersPopup.offers.length} Available Offers</strong>
                                  <button
                                    type="button"
                                    className="make-deals__card-offers-popup-close"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      e.stopPropagation();
                                      setOffersPopup(null);
                                    }}
                                  >
                                    &times;
                                  </button>
                                </div>
                                <ul className="make-deals__card-offers-popup-list">
                                  {offersPopup.offers.map((o, idx) => (
                                    <li key={idx} className="make-deals__card-offers-popup-item">
                                      <span
                                        className={`make-deals__card-offers-popup-type make-deals__card-offers-popup-type--${o.type}`}
                                      >
                                        {o.type === 'zero-apr'
                                          ? '0% APR'
                                          : o.type === 'cash'
                                            ? 'Cash'
                                            : o.type === 'finance'
                                              ? 'Finance'
                                              : 'Lease'}
                                      </span>
                                      <span className="make-deals__card-offers-popup-label">{o.label}</span>
                                      <span className="make-deals__card-offers-popup-exp">expires {formatExpiration(o.expires)}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                            {(deal.vehicle.editorsChoice || deal.vehicle.tenBest) && (
                              <div className="make-deals__card-badges">
                                {deal.vehicle.tenBest && (
                                  <img src={TEN_BEST_BADGE_URL} alt="10Best" className="make-deals__card-badge-img" />
                                )}
                                {deal.vehicle.editorsChoice && (
                                  <img
                                    src={EDITORS_CHOICE_BADGE_URL}
                                    alt="Editors' Choice"
                                    className="make-deals__card-badge-img"
                                  />
                                )}
                              </div>
                            )}
                          </div>
                        </Link>

                        <div className="make-deals__card-body">
                          {isLease ? (
                            <>
                              {(() => {
                                const leaseNum = deal.monthlyPaymentNum!;
                                const { savingsVsAvg, savingsTooltip } = buildSavingsText(
                                  leaseNum,
                                  deal.vehicle.bodyStyle,
                                );
                                return (
                                  <div className="make-deals__card-payment-block">
                                    <div className="make-deals__card-payment">
                                      <span className="make-deals__card-payment-amount">{deal.monthlyPayment}</span>
                                      <span className="make-deals__card-payment-period">/mo</span>
                                    </div>
                                    <span className="make-deals__card-payment-savings">
                                      {savingsVsAvg}
                                      <span className="make-deals__card-tooltip-wrap">
                                        <Info size={13} className="make-deals__card-tooltip-icon" />
                                        <span className="make-deals__card-tooltip">{savingsTooltip}</span>
                                      </span>
                                    </span>
                                    <span className="make-deals__card-payment-expires">Expires {formatExpiration(deal.expirationDate)}</span>
                                  </div>
                                );
                              })()}
                              <button
                                className="make-deals__card-deal-pill"
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  setActiveDealId(deal.id);
                                }}
                              >
                                <span className="make-deals__card-deal-pill-chip">{deal.chipLabel}</span>
                                <span className="make-deals__card-deal-pill-text">
                                  {deal.monthlyPayment}/mo lease
                                </span>
                                <span className="make-deals__card-deal-pill-divider" />
                                <span className="make-deals__card-deal-pill-expires">
                                  expires {formatExpiration(deal.expirationDate)}
                                </span>
                              </button>
                              <div className="make-deals__card-details">
                                <div className="make-deals__card-detail">
                                  <span className="make-deals__card-detail-label">Term</span>
                                  <span className="make-deals__card-detail-value">{deal.term}</span>
                                </div>
                                <div className="make-deals__card-detail">
                                  <span className="make-deals__card-detail-label">Due at Signing</span>
                                  <span className="make-deals__card-detail-value">{deal.dueAtSigning}</span>
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
                                  <div className="make-deals__card-payment-block">
                                    <div className="make-deals__card-payment">
                                      <span className="make-deals__card-payment-amount">{deal.incentiveValue}</span>
                                      <span className="make-deals__card-payment-period">Cash Back</span>
                                    </div>
                                    <span className="make-deals__card-payment-savings">
                                      {deal.percentOffMsrp} off MSRP
                                      <span className="make-deals__card-tooltip-wrap">
                                        <Info size={13} className="make-deals__card-tooltip-icon" />
                                        <span className="make-deals__card-tooltip">{savingsTooltip}</span>
                                      </span>
                                    </span>
                                    <span className="make-deals__card-payment-expires">Expires {formatExpiration(deal.expirationDate)}</span>
                                  </div>
                                );
                              })()}
                              <button
                                className="make-deals__card-deal-pill"
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  setActiveDealId(deal.id);
                                }}
                              >
                                <span className="make-deals__card-deal-pill-chip">{deal.chipLabel}</span>
                                <span className="make-deals__card-deal-pill-text">
                                  {deal.incentiveValue} cash back
                                </span>
                                <span className="make-deals__card-deal-pill-divider" />
                                <span className="make-deals__card-deal-pill-expires">
                                  expires {formatExpiration(deal.expirationDate)}
                                </span>
                              </button>
                              <div className="make-deals__card-details">
                                <div className="make-deals__card-detail">
                                  <span className="make-deals__card-detail-label">MSRP Range</span>
                                  <span className="make-deals__card-detail-value">{deal.vehicle.priceRange}</span>
                                </div>
                                <div className="make-deals__card-detail">
                                  <span className="make-deals__card-detail-label">Est. off MSRP</span>
                                  <span className="make-deals__card-detail-value">{deal.percentOffMsrp}</span>
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
                                  <div className="make-deals__card-payment-block">
                                    <div className="make-deals__card-payment">
                                      <span className="make-deals__card-payment-amount">{deal.aprDisplay}</span>
                                      <span className="make-deals__card-payment-period"> APR</span>
                                    </div>
                                    <span className="make-deals__card-payment-savings">
                                      {savingsVsAvg}
                                      <span className="make-deals__card-tooltip-wrap">
                                        <Info size={13} className="make-deals__card-tooltip-icon" />
                                        <span className="make-deals__card-tooltip">{savingsTooltip}</span>
                                      </span>
                                    </span>
                                    <span className="make-deals__card-payment-expires">Expires {formatExpiration(deal.expirationDate)}</span>
                                  </div>
                                );
                              })()}
                              <button
                                className="make-deals__card-deal-pill"
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  setActiveDealId(deal.id);
                                }}
                              >
                                <span className="make-deals__card-deal-pill-chip">{deal.chipLabel}</span>
                                <span className="make-deals__card-deal-pill-text">
                                  {deal.dealType === 'zero-apr'
                                    ? `0% APR for ${deal.term}`
                                    : `${deal.aprDisplay} APR for ${deal.term}`}
                                </span>
                                <span className="make-deals__card-deal-pill-divider" />
                                <span className="make-deals__card-deal-pill-expires">
                                  expires {formatExpiration(deal.expirationDate)}
                                </span>
                              </button>
                              <div className="make-deals__card-details">
                                <div className="make-deals__card-detail">
                                  <span className="make-deals__card-detail-label">MSRP Range</span>
                                  <span className="make-deals__card-detail-value">{deal.vehicle.priceRange}</span>
                                </div>
                                <div className="make-deals__card-detail">
                                  <span className="make-deals__card-detail-label">Term</span>
                                  <span className="make-deals__card-detail-value">{deal.term}</span>
                                </div>
                              </div>
                            </>
                          )}

                          <button type="button" className="make-deals__card-cta" onClick={() => setActiveDealId(deal.id)}>
                            Get This Deal
                          </button>

                          <button
                            type="button"
                            className="make-deals__card-toggle"
                            onClick={() => toggleDealDetails(deal.id)}
                            aria-expanded={isExpanded}
                          >
                            <span>Additional Details</span>
                            {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                          </button>

                          {isExpanded && (
                            <div className="make-deals__card-additional">
                              <div className="make-deals__card-additional-item">
                                <Info size={16} />
                                <div>
                                  <strong>{deal.programName}</strong>
                                  <p>{deal.programDescription}</p>
                                </div>
                              </div>
                              {!isLease && !isCash && deal.targetAudience && (
                                <div className="make-deals__card-additional-item">
                                  <Users size={16} />
                                  <div>
                                    <strong>Target Audience</strong>
                                    <p>{deal.targetAudience}</p>
                                  </div>
                                </div>
                              )}
                              <div className="make-deals__card-additional-item">
                                <Tag size={16} />
                                <div>
                                  <strong>Eligible Trims</strong>
                                  <p>{deal.trimsEligible.join(', ')}</p>
                                </div>
                              </div>
                              <div className="make-deals__card-additional-item">
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
                  <div className="make-deals__empty-state">
                    <p className="make-deals__empty-state-text">
                      There are currently no active {makeName} offers. Check back soon or explore other available deals.
                    </p>
                    <Link to="/deals" className="make-deals__empty-state-link">
                      Browse All Deals
                    </Link>
                  </div>
                )}
              </section>

              {modelLinks.length > 0 && (
                <section className="make-deals__links-section">
                  <h2 className="make-deals__section-title">Deals by {makeName} Model</h2>
                  <div className="make-deals__links-grid">
                    {modelLinks.map(({ to, label }) => (
                      <Link key={to} to={to} className="make-deals__link-card">
                        <h3>{label}</h3>
                        <p>View incentives and offers for this model</p>
                      </Link>
                    ))}
                  </div>
                </section>
              )}
            </div>

            <aside className="make-deals__sidebar">
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

export default DealsByMakePage;
