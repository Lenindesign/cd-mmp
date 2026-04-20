import { Fragment, useMemo, useState, useCallback } from 'react';
import { Link, useNavigate, useParams, Navigate } from 'react-router-dom';
import { SlidersHorizontal, X } from 'lucide-react';
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
import { DealCard } from '../../components/DealCard';
import type { DealCardDetail, DealCardPayment } from '../../components/DealCard';
import IncentivesModal, { getAprRangeLabel } from '../../components/IncentivesModal/IncentivesModal';
import type { IncentiveOfferDetail } from '../../components/IncentivesModal/IncentivesModal';
import { DealsFilterModal } from '../../components/DealsFilterModal';
import type { DealsFilterState, DealTypeOption } from '../../components/DealsFilterModal';
import { useFilterOpen } from '../../hooks/useFilterOpen';
import {
  GRID_BREAKER_AFTER_CARD_COUNT,
  DEALS_GRID_BREAKER_AD_URL,
  SIDEBAR_AFTER_BREAK_PROPS,
} from '../../constants/dealsLayout';
import { chunkArray } from '../../utils/chunkArray';
import './BuyingLandingPage.css';

type CategoryKind = 'make' | 'bodyStyle' | 'fuelType';
type DealKind = 'zero-apr' | 'finance' | 'cash';

interface BuyingLandingDeal {
  id: string;
  dealType: DealKind;
  chipLabel: 'Buy' | 'Cash';
  vehicle: Vehicle;
  rating: number;
  sortMonthly: number;
  estimatedMonthly?: number;
  monthlyPaymentNum?: number;
  dueAtSigningNum?: number;
  expirationDate: string;
  programName: string;
  programDescription: string;
  trimsEligible: string[];
  term?: string;
  targetAudience?: string;
  aprDisplay?: string;
  incentiveValue?: string;
  incentiveAmount?: number;
  percentOffMsrp?: string;
}

const DEFAULT_FILTERS: DealsFilterState = {
  tab: 'best-deals',
  dealType: 'finance',
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


function slugify(value: string): string {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

function toTitleCase(value: string): string {
  return value
    .split(' ')
    .map((w) => (w.toUpperCase() === 'SUV' ? 'SUV' : w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()))
    .join(' ');
}

/**
 * Union of all vehicles that appear in buying deals (0% APR / finance / cash)
 * plus the lease deals dataset so cross-links to lease pages still work.
 */
function collectVehicles(): Vehicle[] {
  const map = new Map<string, Vehicle>();
  for (const d of getZeroAprDeals()) map.set(d.vehicle.id, d.vehicle);
  for (const d of getFinanceDeals()) map.set(d.vehicle.id, d.vehicle);
  for (const d of getCashDeals()) map.set(d.vehicle.id, d.vehicle);
  for (const d of getLeaseDeals()) map.set(d.vehicle.id, d.vehicle);
  return [...map.values()];
}

function detectCategory(slug: string): { kind: CategoryKind; label: string } | null {
  const target = slug.toLowerCase();
  const vehicles = collectVehicles();

  for (const v of vehicles) {
    if (slugify(v.make) === target) return { kind: 'make', label: v.make };
  }
  for (const v of vehicles) {
    if (slugify(v.bodyStyle) === target) return { kind: 'bodyStyle', label: v.bodyStyle };
  }
  for (const v of vehicles) {
    if (v.fuelType && slugify(v.fuelType) === target) return { kind: 'fuelType', label: v.fuelType };
  }
  return null;
}

function buildActiveOffer(deal: BuyingLandingDeal | null): Partial<IncentiveOfferDetail> | undefined {
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
    dontWaitText: `This offer expires ${formatExpiration(deal.expirationDate)}. Manufacturer deals change monthly - once it's gone, there's no guarantee it'll come back.`,
  };

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
  return {
    ...base,
    offerHeadline: `${aprStr} APR Financing for ${deal.term}`,
    whatItMeans:
      "A below-market interest rate from the manufacturer that lowers your monthly payment and total cost.",
    yourSavings: 'Could save you $1,500–$3,000 in interest over the loan term.',
    whoQualifies: deal.targetAudience,
  };
}

const BuyingLandingPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const category = useMemo(() => (slug ? detectCategory(slug) : null), [slug]);

  const { getRating: getSupabaseRating } = useSupabaseRatings();
  const { user, isAuthenticated, addSavedVehicle, removeSavedVehicle } = useAuth();
  const { month, year } = getCurrentPeriod();

  const [showSignInModal, setShowSignInModal] = useState(false);
  const [pendingSaveVehicle, setPendingSaveVehicle] = useState<{ name: string; slug: string; image?: string } | null>(
    null,
  );
  const [activeDealId, setActiveDealId] = useState<string | null>(null);
  const [filterOpen, setFilterOpen] = useFilterOpen();
  const [filters, setFilters] = useState<DealsFilterState>(DEFAULT_FILTERS);
  const navigate = useNavigate();
  const handleFilterApply = useCallback((applied: DealsFilterState) => {
    const params = new URLSearchParams();
    params.set('filters', JSON.stringify(applied));
    navigate(`/deals/all?${params.toString()}`);
  }, [navigate]);
  const [offersPopup, setOffersPopup] = useState<{ slug: string; offers: VehicleOfferSummary[] } | null>(null);

  const { pills: activeFilterPills, clearAllFilters } = useActiveFilterPills(filters, setFilters, DEFAULT_FILTERS);

  const matchesCategory = useCallback(
    (vehicle: Vehicle) => {
      if (!category) return false;
      if (category.kind === 'make') return vehicle.make.toLowerCase() === category.label.toLowerCase();
      if (category.kind === 'bodyStyle') return vehicle.bodyStyle.toLowerCase() === category.label.toLowerCase();
      return (vehicle.fuelType || '').toLowerCase() === category.label.toLowerCase();
    },
    [category],
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
    if ((dealType === 'lease' || dealType === 'all') && category) {
      navigate(`/deals/lease/${slugify(category.label)}`, { state: { filters: carriedFilters } });
    }
  }, [navigate, category]);

  const allDeals = useMemo((): BuyingLandingDeal[] => {
    if (!category) return [];
    const out: BuyingLandingDeal[] = [];

    for (const d of getZeroAprDeals()) {
      if (!matchesCategory(d.vehicle)) continue;
      if (!matchesFilters(d.vehicle, { term: d.term, targetAudience: d.targetAudience })) continue;
      const msrp = parseMsrpMin(d.vehicle.priceRange);
      const months = parseTermMonths(d.term);
      const monthly = calcMonthly(msrp, 0, months);
      out.push({
        id: d.id,
        dealType: 'zero-apr',
        chipLabel: 'Buy',
        vehicle: d.vehicle,
        rating: getSupabaseRating(d.vehicle.id, getCategory(d.vehicle.bodyStyle), d.vehicle.staffRating),
        sortMonthly: monthly,
        estimatedMonthly: monthly,
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
      if (!matchesCategory(d.vehicle)) continue;
      if (!matchesFilters(d.vehicle, { term: d.term, targetAudience: d.targetAudience })) continue;
      const msrp = parseMsrpMin(d.vehicle.priceRange);
      const aprNum = parseFloat(d.apr.replace('%', ''));
      const months = parseTermMonths(d.term);
      const monthly = calcMonthly(msrp, aprNum, months);
      const rangeLabel = getAprRangeLabel({ value: `${d.apr} APR`, title: d.programName, terms: d.term });
      out.push({
        id: d.id,
        dealType: 'finance',
        chipLabel: 'Buy',
        vehicle: d.vehicle,
        rating: getSupabaseRating(d.vehicle.id, getCategory(d.vehicle.bodyStyle), d.vehicle.staffRating),
        sortMonthly: monthly,
        estimatedMonthly: monthly,
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
      if (!matchesCategory(d.vehicle)) continue;
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
        estimatedMonthly: monthlyAfterCash,
        expirationDate: d.expirationDate,
        programName: d.programName,
        programDescription: d.programDescription,
        trimsEligible: d.trimsEligible,
        incentiveValue: d.incentiveValue,
        incentiveAmount: d.incentiveAmount,
        percentOffMsrp: d.percentOffMsrp,
      });
    }

    const ranged = applyLeaseRangeFilters(
      out,
      filters.monthlyPaymentMin, filters.monthlyPaymentMax,
      filters.dueAtSigningMin, filters.dueAtSigningMax,
    );
    return sortDeals(ranged, filters.sortBy);
  }, [category, getSupabaseRating, matchesFilters, matchesCategory, filters.monthlyPaymentMin, filters.monthlyPaymentMax, filters.dueAtSigningMin, filters.dueAtSigningMax, filters.sortBy]);

  const getResultCount = useCallback((draftFilters: DealsFilterState): number => {
    return allDeals.filter(d => {
      const v = d.vehicle;
      if (draftFilters.bodyTypes.length > 0 && !draftFilters.bodyTypes.includes(v.bodyStyle)) return false;
      if (draftFilters.makes.length > 0 && !draftFilters.makes.includes(v.make)) return false;
      if (draftFilters.fuelTypes.length > 0 && !draftFilters.fuelTypes.includes(v.fuelType || '')) return false;
      return true;
    }).length;
  }, [allDeals]);

  const dealChunks = useMemo(() => chunkArray(allDeals, GRID_BREAKER_AFTER_CARD_COUNT), [allDeals]);

  const crossLinks = useMemo(() => {
    if (!category) return [];
    if (category.kind === 'make') {
      const byModel = new Map<string, { year: string; model: string }>();
      for (const d of allDeals) {
        const key = slugify(d.vehicle.model);
        const existing = byModel.get(key);
        const y = parseInt(d.vehicle.year, 10);
        if (!existing || y > parseInt(existing.year, 10)) {
          byModel.set(key, { year: d.vehicle.year, model: d.vehicle.model });
        }
      }
      return Array.from(byModel.entries())
        .map(([modelSlug, { year: y, model }]) => ({
          label: `${y} ${category.label} ${model} Deals`,
          to: `/deals/best-buying-deals/${slugify(category.label)}/${modelSlug}`,
        }))
        .sort((a, b) => a.label.localeCompare(b.label));
    }
    const byMake = new Map<string, string>();
    for (const d of allDeals) byMake.set(d.vehicle.make.toLowerCase(), d.vehicle.make);
    return [...byMake.entries()]
      .map(([, label]) => ({
        label: `${toTitleCase(label)} ${toTitleCase(category.label)} Deals`,
        to: `/deals/best-buying-deals/${slugify(label)}`,
      }))
      .sort((a, b) => a.label.localeCompare(b.label));
  }, [allDeals, category]);

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

  if (!slug) return <Navigate to="/deals/best-buying-deals" replace />;
  if (!category) return <Navigate to="/deals/best-buying-deals" replace />;

  const displayLabel = toTitleCase(category.label);

  const activeDealObj = activeDealId ? allDeals.find((d) => d.id === activeDealId) : null;
  const activeOffer = buildActiveOffer(activeDealObj ?? null);

  const pageTitle = `Best ${displayLabel} Deals & Incentives for ${month} ${year}`;
  const pageDescription =
    category.kind === 'make'
      ? `Find the best ${displayLabel} deals, 0% APR offers, cash-back incentives, and low-rate financing for ${month} ${year}. Compare offers from Car and Driver.`
      : `Find the best ${displayLabel.toLowerCase()} deals for ${month} ${year}. Compare 0% APR, cash-back, and low-rate financing offers on ${displayLabel.toLowerCase()} vehicles from Car and Driver.`;
  const BASE_URL = 'https://www.caranddriver.com';
  const canonicalPath = `${BASE_URL}/deals/best-buying-deals/${slugify(category.label)}`;

  const crossSectionTitle =
    category.kind === 'make'
      ? `Deals by ${displayLabel} Model`
      : `${displayLabel} Deals by Make`;

  return (
    <div className="buying-landing">
      <SEO
        title={pageTitle}
        description={pageDescription}
        canonical={canonicalPath}
        keywords={[
          `${displayLabel} deals`,
          `${displayLabel} incentives`,
          `${displayLabel} 0% APR`,
          `car deals ${month} ${year}`,
          'new car incentives',
          'finance deals',
        ]}
        structuredData={[
          createBreadcrumbStructuredData([
            { name: 'Home', url: BASE_URL },
            { name: 'Deals', url: `${BASE_URL}/deals` },
            { name: `${displayLabel} Deals`, url: canonicalPath },
          ]),
        ]}
        noIndex={allDeals.length === 0}
      />

      <div className="buying-landing__hero">
        <div className="container">
          <div className="buying-landing__hero-content">
            <div className="buying-landing__hero-badge">
              <span className="hero-pill__label">{displayLabel} Deals</span>
            </div>
            <nav className="buying-landing__breadcrumb" aria-label="Breadcrumb">
              <Link to="/">Home</Link>
              <span className="buying-landing__breadcrumb-sep">/</span>
              <Link to="/deals">Deals</Link>
              <span className="buying-landing__breadcrumb-sep">/</span>
              <span>{displayLabel} Deals</span>
            </nav>
            <h1 className="buying-landing__title">{pageTitle}</h1>
            <p className="buying-landing__description">{pageDescription}</p>
          </div>
        </div>
      </div>

      <div className="buying-landing__toolbar">
        <div className="container buying-landing__toolbar-inner">
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

      <div className="buying-landing__content">
        <div className={`container${allDeals.length > 0 ? ' buying-landing__container--stacked' : ''}`}>
          {allDeals.length === 0 ? (
            <div className="buying-landing__segment">
              <div className="buying-landing__main">
                <section className="buying-landing__section">
                  <div className="buying-landing__grid">
                    <div className="buying-landing__empty-state">
                      <p className="buying-landing__empty-state-text">
                        There are currently no active {displayLabel.toLowerCase()} buying offers. Check back soon or browse all deals.
                      </p>
                      <Link to="/deals" className="buying-landing__empty-state-link">
                        Browse All Deals
                      </Link>
                    </div>
                  </div>
                </section>
              </div>
              <aside className="buying-landing__sidebar" aria-label="Advertisement">
                <div className="buying-landing__sidebar-sticky">
                  <AdSidebar />
                </div>
              </aside>
            </div>
          ) : (
            <>
              {dealChunks.map((chunk, chunkIndex) => (
                <Fragment key={`buying-landing-segment-${chunkIndex}`}>
                  <div className="buying-landing__segment">
                    <div className="buying-landing__main">
                      <section className="buying-landing__section">
                        <div className="buying-landing__grid">
                          {chunk.map((deal, i) => {
                            const vehicleName = `${deal.vehicle.year} ${deal.vehicle.make} ${deal.vehicle.model}`;
                            const saved = isVehicleSaved(vehicleName);
                            const isCash = deal.dealType === 'cash';
                            const offers = getVehicleOffers(deal.vehicle.make, deal.vehicle.model);
                            const offersPopupOpen = offersPopup?.slug === deal.vehicle.slug;

                            let payment: DealCardPayment;
                            let details: DealCardDetail[];
                            let pillText: string;

                            if (isCash) {
                              const msrp = parseMsrpMin(deal.vehicle.priceRange);
                              const principal = Math.max(msrp - (deal.incentiveAmount ?? 0), 1);
                              const monthlyAfterCash = calcMonthly(principal, 6.5, 60);
                              const { savingsTooltip } = buildSavingsText(
                                monthlyAfterCash,
                                deal.vehicle.bodyStyle,
                                'cash',
                              );
                              payment = {
                                amount: deal.incentiveValue!,
                                period: 'Cash Back',
                                savings: { type: 'plain', text: `${deal.percentOffMsrp} off MSRP` },
                                savingsTooltip,
                                expirationDate: deal.expirationDate,
                              };
                              pillText = `${deal.incentiveValue} cash back`;
                              details = [
                                { label: 'MSRP Range', value: deal.vehicle.priceRange },
                                { label: 'Est. off MSRP', value: deal.percentOffMsrp! },
                              ];
                            } else {
                              const msrp = parseMsrpMin(deal.vehicle.priceRange);
                              const aprNum =
                                deal.dealType === 'zero-apr' ? 0 : parseFloat((deal.aprDisplay ?? '').replace('%', ''));
                              const months = parseTermMonths(deal.term!);
                              const monthly = calcMonthly(msrp, aprNum, months);
                              const { savingsVsAvg, savingsTooltip } = buildSavingsText(monthly, deal.vehicle.bodyStyle);
                              payment = {
                                amount: deal.aprDisplay!,
                                period: ' APR',
                                savings: { type: 'savings-text', text: savingsVsAvg },
                                savingsTooltip,
                                expirationDate: deal.expirationDate,
                              };
                              pillText =
                                deal.dealType === 'zero-apr'
                                  ? `0% APR for ${deal.term}`
                                  : `${deal.aprDisplay} APR for ${deal.term}`;
                              details = [
                                { label: 'MSRP Range', value: deal.vehicle.priceRange },
                                { label: 'Term', value: deal.term! },
                              ];
                            }

                            return (
                              <Fragment key={deal.id}>
                                {i > 0 && i % 4 === 0 && <GridAd />}
                                <DealCard
                                  slug={deal.vehicle.slug}
                                  vehicleName={vehicleName}
                                  vehicleImage={deal.vehicle.image}
                                  vehicleSlug={deal.vehicle.slug}
                                  vehicleMake={deal.vehicle.make}
                                  vehicleModel={deal.vehicle.model}
                                  rating={deal.rating}
                                  dealTypeTag={deal.chipLabel}
                                  editorsChoice={!!deal.vehicle.editorsChoice}
                                  tenBest={!!deal.vehicle.tenBest}
                                  isSaved={saved}
                                  onSaveClick={(e) =>
                                    handleSaveClick(e, {
                                      name: vehicleName,
                                      slug: deal.vehicle.slug,
                                      image: deal.vehicle.image,
                                    })
                                  }
                                  offers={offers}
                                  offersPopupOpen={offersPopupOpen}
                                  onToggleOffersPopup={(e) =>
                                    toggleOffersPopup(e, deal.vehicle.make, deal.vehicle.model, deal.vehicle.slug)
                                  }
                                  onCloseOffersPopup={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    setOffersPopup(null);
                                  }}
                                  payment={payment}
                                  pill={{
                                    chipLabel: deal.chipLabel,
                                    text: pillText,
                                    expirationDate: deal.expirationDate,
                                  }}
                                  details={details}
                                  onDealClick={() => setActiveDealId(deal.id)}
                                />
                              </Fragment>
                            );
                          })}
                        </div>
                      </section>
                    </div>
                    <aside className="buying-landing__sidebar" aria-label="Advertisement">
                      <div className="buying-landing__sidebar-sticky">
                        {chunkIndex === 0 ? <AdSidebar /> : <AdSidebar {...SIDEBAR_AFTER_BREAK_PROPS} />}
                      </div>
                    </aside>
                  </div>
                  {chunkIndex < dealChunks.length - 1 && (
                    <div className="buying-landing__full-bleed-breaker" role="complementary" aria-label="Advertisement">
                      <AdBanner imageUrl={DEALS_GRID_BREAKER_AD_URL} altText="Advertisement" />
                    </div>
                  )}
                </Fragment>
              ))}
            </>
          )}

          {crossLinks.length > 0 && (
            <div className="buying-landing__segment buying-landing__segment--tail">
              <div className="buying-landing__main">
                <section className="buying-landing__links-section">
                  <h2 className="buying-landing__section-title">{crossSectionTitle}</h2>
                  <div className="buying-landing__links-grid">
                    <Link to="/deals" className="buying-landing__link-card">
                      <h3>All Deals</h3>
                      <p>Browse every manufacturer incentive and offer</p>
                    </Link>
                    {crossLinks.map(({ to, label }) => (
                      <Link key={to} to={to} className="buying-landing__link-card">
                        <h3>{label}</h3>
                        <p>View incentive offers and terms</p>
                      </Link>
                    ))}
                  </div>
                </section>
              </div>
              <aside className="buying-landing__sidebar" aria-label="Advertisement">
                <div className="buying-landing__sidebar-sticky">
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
        selectedIncentiveId={activeDealObj
          ? findMatchingIncentiveId(
              activeDealObj.vehicle.make,
              activeDealObj.vehicle.model,
              activeDealObj.dealType,
              { apr: activeDealObj.aprDisplay, term: activeDealObj.term, value: activeDealObj.incentiveValue },
            )
          : undefined}
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
        dealPageType="finance"
        onDealTypeNavigate={handleDealTypeNavigate}
      />
    </div>
  );
};

export default BuyingLandingPage;
