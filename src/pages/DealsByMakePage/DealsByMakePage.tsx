import { Fragment, useMemo, useState, useCallback } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
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
  getGlobalDealCounts,
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
import type { DealsFilterState } from '../../components/DealsFilterModal';
import { useFilterOpen } from '../../hooks/useFilterOpen';
import './DealsByMakePage.css';

type DealKind = 'zero-apr' | 'finance' | 'lease' | 'cash';

interface UnifiedMakeDeal {
  id: string;
  dealType: DealKind;
  chipLabel: 'Buy' | 'Lease' | 'Cash';
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

const GRID_BREAKER_AFTER_CARD_COUNT = 12;
const DEALS_GRID_BREAKER_AD_URL =
  'https://d2kde5ohu8qb21.cloudfront.net/files/693a37c1e2108b000272edd6/nissan.jpg';

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
    dontWaitText: `This offer expires ${formatExpiration(deal.expirationDate)}. Manufacturer deals change monthly - once it's gone, there's no guarantee it'll come back.`,
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
        chipLabel: 'Buy',
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
        chipLabel: 'Buy',
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

    const withSigning = out.map(d => ({
      ...d,
      dueAtSigningNum: d.dueAtSigning ? parseInt(d.dueAtSigning.replace(/[^0-9]/g, ''), 10) || 0 : undefined,
    }));
    const ranged = applyLeaseRangeFilters(
      withSigning,
      filters.monthlyPaymentMin, filters.monthlyPaymentMax,
      filters.dueAtSigningMin, filters.dueAtSigningMax,
    );
    return sortDeals(ranged, filters.sortBy);
  }, [getSupabaseRating, matchesFilters, matchesMake, filters.monthlyPaymentMin, filters.monthlyPaymentMax, filters.dueAtSigningMin, filters.dueAtSigningMax, filters.sortBy]);

  const getResultCount = useCallback((draftFilters: DealsFilterState): number => {
    let result = allDeals;
    if (draftFilters.dealType === 'lease') result = result.filter(d => d.dealType === 'lease');
    else if (draftFilters.dealType === 'finance') result = result.filter(d => d.dealType !== 'lease');
    return result.filter(d => {
      const v = d.vehicle;
      if (draftFilters.bodyTypes.length > 0 && !draftFilters.bodyTypes.includes(v.bodyStyle)) return false;
      if (draftFilters.makes.length > 0 && !draftFilters.makes.includes(v.make)) return false;
      if (draftFilters.fuelTypes.length > 0 && !draftFilters.fuelTypes.includes(v.fuelType || '')) return false;
      return true;
    }).length;
  }, [allDeals]);

  const deals = useMemo(() => {
    if (filters.dealType === 'lease') return allDeals.filter(d => d.dealType === 'lease');
    if (filters.dealType === 'finance') return allDeals.filter(d => d.dealType !== 'lease');
    return allDeals;
  }, [allDeals, filters.dealType]);

  const dealChunks = useMemo(() => chunkArray(deals, GRID_BREAKER_AFTER_CARD_COUNT), [deals]);

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

      <AdBanner imageUrl="https://d2kde5ohu8qb21.cloudfront.net/files/693a37c1e2108b000272edd6/nissan.jpg" altText="Advertisement" minimalDesktop />

      <div className="make-deals__content">
        <div className={`container${allDeals.length > 0 ? ' make-deals__container--stacked' : ''}`}>
          {allDeals.length === 0 ? (
            <div className="make-deals__segment">
              <div className="make-deals__main">
                <section className="make-deals__section">
                  <div className="make-deals__grid">
                    <div className="make-deals__empty-state">
                      <p className="make-deals__empty-state-text">
                        There are currently no active {makeName} offers. Check back soon or explore other available deals.
                      </p>
                      <Link to="/deals" className="make-deals__empty-state-link">
                        Browse All Deals
                      </Link>
                    </div>
                  </div>
                </section>
              </div>
              <aside className="make-deals__sidebar" aria-label="Advertisement">
                <div className="make-deals__sidebar-sticky">
                  <AdSidebar />
                </div>
              </aside>
            </div>
          ) : (
            <>
              {dealChunks.map((chunk, chunkIndex) => (
                <Fragment key={`make-segment-${chunkIndex}`}>
                  <div className="make-deals__segment">
                    <div className="make-deals__main">
                      <section className="make-deals__section">
                        <div className="make-deals__grid">
                          {chunk.map((deal, i) => {
                            const vehicleName = `${deal.vehicle.year} ${deal.vehicle.make} ${deal.vehicle.model}`;
                            const saved = isVehicleSaved(vehicleName);
                            const isLease = deal.dealType === 'lease';
                            const isCash = deal.dealType === 'cash';
                            const offers = getVehicleOffers(deal.vehicle.make, deal.vehicle.model);
                            const offersPopupOpen = offersPopup?.slug === deal.vehicle.slug;

                            let payment: DealCardPayment;
                            let details: DealCardDetail[];
                            let pillText: string;

                            if (isLease) {
                              const leaseNum = deal.monthlyPaymentNum!;
                              const { savingsVsAvg, savingsTooltip } = buildSavingsText(leaseNum, deal.vehicle.bodyStyle);
                              payment = {
                                amount: deal.monthlyPayment!,
                                period: '/mo',
                                savings: { type: 'savings-text', text: savingsVsAvg },
                                savingsTooltip,
                                expirationDate: deal.expirationDate,
                              };
                              pillText = `${deal.monthlyPayment}/mo lease`;
                              details = [
                                { label: 'Term', value: deal.term! },
                                { label: 'Due at Signing', value: deal.dueAtSigning! },
                              ];
                            } else if (isCash) {
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
                    <aside className="make-deals__sidebar" aria-label="Advertisement">
                      <div className="make-deals__sidebar-sticky">
                        {chunkIndex === 0 ? <AdSidebar /> : <AdSidebar {...SIDEBAR_AFTER_BREAK_PROPS} />}
                      </div>
                    </aside>
                  </div>
                  {chunkIndex < dealChunks.length - 1 && (
                    <div className="make-deals__full-bleed-breaker" role="complementary" aria-label="Advertisement">
                      <AdBanner imageUrl={DEALS_GRID_BREAKER_AD_URL} altText="Advertisement" />
                    </div>
                  )}
                </Fragment>
              ))}
            </>
          )}

          <div className="make-deals__segment make-deals__segment--tail">
            <div className="make-deals__main">
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
            <aside className="make-deals__sidebar" aria-label="Advertisement">
              <div className="make-deals__sidebar-sticky">
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
        selectedIncentiveId={activeDealObj
          ? findMatchingIncentiveId(
              activeDealObj.vehicle.make,
              activeDealObj.vehicle.model,
              activeDealObj.dealType,
              { apr: activeDealObj.aprDisplay, term: activeDealObj.term },
            )
          : undefined
        }
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
      />
    </div>
  );
};

export default DealsByMakePage;
