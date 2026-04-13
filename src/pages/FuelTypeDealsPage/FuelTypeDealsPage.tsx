import { Fragment, useCallback, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronDown, ChevronUp, SlidersHorizontal, X } from 'lucide-react';
import { getZeroAprDeals } from '../../services/zeroAprDealsService';
import { getFinanceDeals, getCashDeals } from '../../services/cashFinanceDealsService';
import { getLeaseDeals } from '../../services/leaseDealsService';
import { useSupabaseRatings, getCategory } from '../../hooks/useSupabaseRating';
import { useAuth } from '../../contexts/AuthContext';
import { SEO, createBreadcrumbStructuredData, createFAQStructuredData } from '../../components/SEO';
import AdBanner from '../../components/AdBanner';
import AdSidebar from '../../components/AdSidebar';
import { GridAd } from '../../components/GridAd';
import SignInToSaveModal from '../../components/SignInToSaveModal';
import { DealCard } from '../../components/DealCard';
import { getCurrentPeriod, formatExpiration } from '../../utils/dateUtils';
import { parseMsrpMin, calcMonthly, parseTermMonths, buildSavingsText, getVehicleOffers, offersToIncentives, inferCreditTier, creditTierQualifies, getGlobalDealCounts } from '../../utils/dealCalculations';
import type { VehicleOfferSummary } from '../../utils/dealCalculations';
import IncentivesModal, { getAprRangeLabel } from '../../components/IncentivesModal/IncentivesModal';
import type { IncentiveOfferDetail } from '../../components/IncentivesModal/IncentivesModal';
import { DealsFilterModal } from '../../components/DealsFilterModal';
import type { DealsFilterState } from '../../components/DealsFilterModal';
import { useActiveFilterPills } from '../../hooks/useActiveFilterPills';
import './FuelTypeDealsPage.css';


interface UnifiedDeal {
  id: string;
  dealType: 'zero-apr' | 'finance' | 'lease' | 'cash';
  fuelType: string;
  vehicleName: string;
  vehicle: { id: string; year: string; make: string; model: string; image: string; slug: string; bodyStyle: string; fuelType: string; priceRange: string; staffRating: number; editorsChoice?: boolean; tenBest?: boolean; evOfTheYear?: boolean };
  term?: string;
  targetAudience?: string;
  dueAtSigningNum?: number;
  estimatedMonthly: number;
  aprDisplay?: string;
  savingsVsAvg: string;
  savingsTooltip: string;
  dealText: string;
  dealPillIcon: 'percent' | 'key';
  details: { label: string; value: string }[];
  expirationDate: string;
  programName: string;
  programDescription: string;
  additionalInfo: { icon: string; label: string; value: string }[];
  rating: number;
  incentiveValue?: string;
  percentOffMsrp?: string;
}


const FAQ_DATA = [
  { question: 'Are there special deals on electric vehicles?', answer: 'Yes. Many manufacturers offer special incentives on EVs including reduced APR financing, lease specials, and cash rebates. Additionally, federal tax credits of up to $7,500 and various state incentives may apply on top of manufacturer deals.' },
  { question: 'Do hybrid vehicles get the same deals as gas models?', answer: 'Hybrid trims sometimes qualify for the same manufacturer incentives as their gas counterparts, but they may also have separate hybrid-specific offers. Check the "Eligible Trims" section of each deal to confirm.' },
  { question: 'Can I combine fuel-type incentives with other deals?', answer: 'It depends on the manufacturer. Some allow stacking EV tax credits with manufacturer financing, while others require choosing between different incentives and special APR. Always ask the dealer to run both scenarios.' },
  { question: 'When do EV and hybrid deals change?', answer: 'Manufacturer incentives typically rotate monthly. Federal tax credits are set by legislation and change less frequently. We update this page as new deals become available.' },
  { question: 'Are diesel vehicle deals common?', answer: 'Diesel deals are less common than gas or hybrid offers since fewer manufacturers sell diesel passenger vehicles in the US. When available, they tend to appear on trucks and SUVs.' },
];

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

const FuelTypeDealsPage = () => {
  const { month: CURRENT_MONTH, year: CURRENT_YEAR } = getCurrentPeriod();
  const { getRating: getSupabaseRating } = useSupabaseRatings();
  const { user, isAuthenticated, addSavedVehicle, removeSavedVehicle } = useAuth();
  const navigate = useNavigate();
  const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(null);
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [pendingSaveVehicle, setPendingSaveVehicle] = useState<{ name: string; slug: string; image?: string } | null>(null);
  const [activeDealId, setActiveDealId] = useState<string | null>(null);
  const [offersPopup, setOffersPopup] = useState<{ slug: string; offers: VehicleOfferSummary[] } | null>(null);
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState<DealsFilterState>(DEFAULT_FILTERS);
  const handleFilterApply = useCallback((applied: DealsFilterState) => {
    const params = new URLSearchParams();
    params.set('filters', JSON.stringify(applied));
    navigate(`/deals/all?${params.toString()}`);
  }, [navigate]);
  const { pills: activeFilterPills } = useActiveFilterPills(filters, setFilters, DEFAULT_FILTERS);
  const clearAllFilters = useCallback(() => navigate('/deals/all'), [navigate]);

  const matchesFilters = useCallback((
    vehicle: { bodyStyle: string; make: string; fuelType?: string; editorsChoice?: boolean; tenBest?: boolean; evOfTheYear?: boolean },
    deal?: { term?: string; targetAudience?: string },
  ) => {
    if (filters.bodyTypes.length > 0 && !filters.bodyTypes.includes(vehicle.bodyStyle)) return false;
    if (filters.makes.length > 0 && !filters.makes.includes(vehicle.make)) return false;
    if (filters.fuelTypes.length > 0 && vehicle.fuelType && !filters.fuelTypes.includes(vehicle.fuelType)) return false;
    if (filters.accolades.length > 0) {
      const hasMatch = filters.accolades.some(a => {
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
  }, [filters.bodyTypes, filters.makes, filters.fuelTypes, filters.accolades, filters.terms, filters.creditTier]);

  const toggleOffersPopup = useCallback((e: React.MouseEvent, make: string, model: string, slug: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (offersPopup?.slug === slug) {
      setOffersPopup(null);
    } else {
      setOffersPopup({ slug, offers: getVehicleOffers(make, model) });
    }
  }, [offersPopup]);

  const getResultCount = useCallback((draftFilters: DealsFilterState): number => {
    if (draftFilters.dealType && draftFilters.dealType !== 'all') {
      const global = getGlobalDealCounts();
      return global[draftFilters.dealType as keyof typeof global] ?? global.all;
    }
    return getGlobalDealCounts().all;
  }, []);

  const allDeals = useMemo((): UnifiedDeal[] => {
    const results: UnifiedDeal[] = [];

    for (const d of getZeroAprDeals()) {
      const msrp = parseMsrpMin(d.vehicle.priceRange);
      const months = parseTermMonths(d.term);
      const monthly = calcMonthly(msrp, 0, months);
      const { savingsVsAvg, savingsTooltip } = buildSavingsText(monthly, d.vehicle.bodyStyle);
      results.push({
        id: d.id, dealType: 'zero-apr', fuelType: d.vehicle.fuelType, vehicleName: `${d.vehicle.year} ${d.vehicle.make} ${d.vehicle.model}`, vehicle: d.vehicle,
        estimatedMonthly: monthly, aprDisplay: '0%', savingsVsAvg, savingsTooltip,
        dealText: '0% APR Financing', dealPillIcon: 'percent',
        details: [{ label: 'MSRP Range', value: d.vehicle.priceRange }, { label: 'Term', value: d.term }, { label: 'Fuel Type', value: d.vehicle.fuelType }],
        expirationDate: d.expirationDate, programName: d.programName, programDescription: d.programDescription,
        additionalInfo: [{ icon: 'users', label: 'Target Audience', value: d.targetAudience }, { icon: 'tag', label: 'Eligible Trims', value: d.trimsEligible.join(', ') }],
        rating: getSupabaseRating(d.vehicle.id, getCategory(d.vehicle.bodyStyle), d.vehicle.staffRating),
        term: d.term,
        targetAudience: d.targetAudience,
      });
    }
    for (const d of getFinanceDeals()) {
      const msrp = parseMsrpMin(d.vehicle.priceRange);
      const aprNum = parseFloat(d.apr.replace('%', ''));
      const months = parseTermMonths(d.term);
      const monthly = calcMonthly(msrp, aprNum, months);
      const { savingsVsAvg, savingsTooltip } = buildSavingsText(monthly, d.vehicle.bodyStyle);
      const rangeLabel = getAprRangeLabel({ value: `${d.apr} APR`, title: d.programName, terms: d.term });
      results.push({
        id: d.id, dealType: 'finance', fuelType: d.vehicle.fuelType, vehicleName: `${d.vehicle.year} ${d.vehicle.make} ${d.vehicle.model}`, vehicle: d.vehicle,
        estimatedMonthly: monthly, aprDisplay: rangeLabel.replace(/\s*APR$/, ''), savingsVsAvg, savingsTooltip,
        dealText: rangeLabel, dealPillIcon: 'percent',
        details: [{ label: 'MSRP Range', value: d.vehicle.priceRange }, { label: 'Term', value: d.term }, { label: 'Fuel Type', value: d.vehicle.fuelType }],
        expirationDate: d.expirationDate, programName: d.programName, programDescription: d.programDescription,
        additionalInfo: [{ icon: 'users', label: 'Target Audience', value: d.targetAudience }, { icon: 'tag', label: 'Eligible Trims', value: d.trimsEligible.join(', ') }],
        rating: getSupabaseRating(d.vehicle.id, getCategory(d.vehicle.bodyStyle), d.vehicle.staffRating),
        term: d.term,
        targetAudience: d.targetAudience,
      });
    }
    for (const d of getLeaseDeals()) {
      const leaseNum = d.monthlyPaymentNum;
      const { savingsVsAvg, savingsTooltip } = buildSavingsText(leaseNum, d.vehicle.bodyStyle);
      results.push({
        id: d.id, dealType: 'lease', fuelType: d.vehicle.fuelType, vehicleName: `${d.vehicle.year} ${d.vehicle.make} ${d.vehicle.model}`, vehicle: d.vehicle,
        estimatedMonthly: leaseNum, savingsVsAvg, savingsTooltip,
        dealText: `${d.monthlyPayment}/mo Lease`, dealPillIcon: 'key',
        details: [{ label: 'Term', value: d.term }, { label: 'Due at Signing', value: d.dueAtSigning }, { label: 'Fuel Type', value: d.vehicle.fuelType }],
        expirationDate: d.expirationDate, programName: d.programName, programDescription: d.programDescription,
        additionalInfo: [{ icon: 'tag', label: 'Eligible Trims', value: d.trimsEligible.join(', ') }],
        rating: getSupabaseRating(d.vehicle.id, getCategory(d.vehicle.bodyStyle), d.vehicle.staffRating),
        term: d.term,
        dueAtSigningNum: (() => {
          const n = parseInt(String(d.dueAtSigning).replace(/[^0-9]/g, ''), 10);
          return Number.isFinite(n) ? n : undefined;
        })(),
      });
    }
    for (const d of getCashDeals()) {
      const msrp = parseMsrpMin(d.vehicle.priceRange);
      const principal = Math.max(msrp - d.incentiveAmount, 1);
      const monthlyAfterCash = calcMonthly(principal, 6.5, 60);
      const { savingsTooltip } = buildSavingsText(monthlyAfterCash, d.vehicle.bodyStyle, 'cash');
      results.push({
        id: d.id, dealType: 'cash', fuelType: d.vehicle.fuelType, vehicleName: `${d.vehicle.year} ${d.vehicle.make} ${d.vehicle.model}`, vehicle: d.vehicle,
        estimatedMonthly: d.incentiveAmount, savingsVsAvg: `${d.percentOffMsrp} off MSRP`, savingsTooltip,
        dealText: `${d.incentiveValue} cash back`, dealPillIcon: 'percent',
        details: [{ label: 'MSRP Range', value: d.vehicle.priceRange }, { label: 'Est. off MSRP', value: d.percentOffMsrp }, { label: 'Fuel Type', value: d.vehicle.fuelType }],
        expirationDate: d.expirationDate, programName: d.programName, programDescription: d.programDescription,
        additionalInfo: [{ icon: 'tag', label: 'Eligible Trims', value: d.trimsEligible.join(', ') }],
        rating: getSupabaseRating(d.vehicle.id, getCategory(d.vehicle.bodyStyle), d.vehicle.staffRating),
        incentiveValue: d.incentiveValue, percentOffMsrp: d.percentOffMsrp,
      });
    }
    return results;
  }, [getSupabaseRating]);

  const allFuelTypes = useMemo(() => {
    const types = new Set<string>();
    for (const d of allDeals) if (d.fuelType) types.add(d.fuelType);
    return Array.from(types).sort();
  }, [allDeals]);

  const [excludedFuelTypes, setExcludedFuelTypes] = useState<Set<string>>(new Set());

  const deals = useMemo(
    () => excludedFuelTypes.size === 0 ? allDeals : allDeals.filter(d => !excludedFuelTypes.has(d.fuelType)),
    [allDeals, excludedFuelTypes],
  );

  const displayDeals = useMemo(() => {
    let result = deals;
    if (filters.monthlyPaymentMin > 0) result = result.filter(d => d.estimatedMonthly >= filters.monthlyPaymentMin);
    if (filters.monthlyPaymentMax < 99999) result = result.filter(d => d.estimatedMonthly <= filters.monthlyPaymentMax);
    if (filters.dueAtSigningMin > 0 || filters.dueAtSigningMax < 99999) {
      result = result.filter(d => {
        if (d.dealType !== 'lease') return true;
        if (d.dueAtSigningNum == null) return false;
        const n = d.dueAtSigningNum;
        if (filters.dueAtSigningMin > 0 && n < filters.dueAtSigningMin) return false;
        if (filters.dueAtSigningMax < 99999 && n > filters.dueAtSigningMax) return false;
        return true;
      });
    }
    return result.filter(d => matchesFilters(d.vehicle, { term: d.term, targetAudience: d.targetAudience }));
  }, [deals, filters.monthlyPaymentMin, filters.monthlyPaymentMax, filters.dueAtSigningMin, filters.dueAtSigningMax, matchesFilters]);

  const dealChunks = useMemo(
    () => chunkArray(displayDeals, GRID_BREAKER_AFTER_CARD_COUNT),
    [displayDeals],
  );

  const isVehicleSaved = (name: string) => user?.savedVehicles?.some((v) => v.name === name) || false;
  const handleSaveClick = (e: React.MouseEvent, vehicle: { name: string; slug: string; image?: string }) => {
    e.preventDefault(); e.stopPropagation();
    if (!isAuthenticated) { setPendingSaveVehicle(vehicle); setShowSignInModal(true); return; }
    const isSaved = isVehicleSaved(vehicle.name);
    if (isSaved) { const sv = user?.savedVehicles?.find((v) => v.name === vehicle.name); if (sv) removeSavedVehicle(sv.id); }
    else { addSavedVehicle({ id: vehicle.slug, name: vehicle.name, ownership: 'want' }); }
  };

  const activeDealObj = activeDealId ? displayDeals.find(d => d.id === activeDealId) : null;
  const activeOffer: Partial<IncentiveOfferDetail> | undefined = activeDealObj
    ? (() => {
        const v = activeDealObj.vehicle;
        const priceParts = v.priceRange.replace(/[^0-9,\-–]/g, '').split(/[-–]/);
        const base = {
          year: parseInt(v.year, 10), make: v.make, model: v.model, slug: v.slug, imageUrl: v.image,
          msrpMin: parseInt(priceParts[0]?.replace(/,/g, '') || '0', 10),
          msrpMax: parseInt(priceParts[1]?.replace(/,/g, '') || '0', 10),
          dontWaitText: `This offer expires ${formatExpiration(activeDealObj.expirationDate)}. Manufacturer deals change monthly - once it's gone, there's no guarantee it'll come back.`,
          eventLabel: activeDealObj.programName,
          expirationDate: activeDealObj.expirationDate,
          eligibleTrims: (activeDealObj.additionalInfo.find(i => i.label === 'Eligible Trims')?.value || '').split(', ').filter(Boolean),
        };
        if (activeDealObj.dealType === 'cash') {
          return {
            ...base,
            offerHeadline: 'Cash Back',
            whatItMeans: activeDealObj.programDescription,
            yourSavings: `${activeDealObj.incentiveValue} customer cash. Approximately ${activeDealObj.percentOffMsrp} off MSRP.`,
            whoQualifies: 'Retail buyers on eligible new vehicles; see program details for restrictions.',
          };
        }
        return {
          ...base,
          offerHeadline: activeDealObj.dealText,
          whatItMeans: `This ${activeDealObj.dealType} offer could save you significantly on your next ${activeDealObj.fuelType.toLowerCase()} vehicle.`,
          yourSavings: `Check the deal details for specific savings on the ${v.make} ${v.model}.`,
          whoQualifies: activeDealObj.additionalInfo.find(i => i.label === 'Target Audience')?.value || 'Well-qualified buyers with approved credit.',
        };
      })()
    : undefined;

  const pageTitle = `Best Vehicle Deals by Fuel Type – ${CURRENT_MONTH} ${CURRENT_YEAR}`;
  const BASE_URL = 'https://www.caranddriver.com';

  return (
    <div className="fuel-deals">
      <SEO
        title={pageTitle}
        description={`Find the best deals on gas, hybrid, electric, and diesel vehicles for ${CURRENT_MONTH} ${CURRENT_YEAR}. Compare 0% APR, finance, and lease offers by fuel type.`}
        canonical={`${BASE_URL}/deals/fuel-type`}
        keywords={['fuel type deals', 'electric vehicle deals', 'hybrid deals', 'EV incentives', `vehicle deals ${CURRENT_MONTH} ${CURRENT_YEAR}`]}
        structuredData={[
          createBreadcrumbStructuredData([{ name: 'Home', url: BASE_URL }, { name: 'Deals', url: `${BASE_URL}/deals` }, { name: 'Fuel Type Deals', url: `${BASE_URL}/deals/fuel-type` }]),
          createFAQStructuredData(FAQ_DATA),
        ]}
        noIndex={allDeals.length === 0}
      />

      <div className="fuel-deals__toolbar">
        <div className="container fuel-deals__toolbar-inner">
          <div className="active-filter-pills__toolbar-left">
            <span className="active-filter-pills__count">{displayDeals.length} {displayDeals.length === 1 ? 'deal' : 'deals'}</span>
            <div className="active-filter-pills__row" aria-label="Active filters">
              {allFuelTypes.filter(ft => !excludedFuelTypes.has(ft)).map(ft => (
                <span key={ft} className="active-filter-pills__pill">
                  <span className="active-filter-pills__pill-label">{ft}</span>
                  <button type="button" className="active-filter-pills__pill-x" aria-label={`Remove ${ft} filter`} onClick={() => setExcludedFuelTypes(prev => new Set([...prev, ft]))}>
                    <X size={12} strokeWidth={2.5} aria-hidden />
                  </button>
                </span>
              ))}
              {activeFilterPills.map(pill => (
                <span key={pill.id} className="active-filter-pills__pill">
                  <span className="active-filter-pills__pill-label">{pill.label}</span>
                  <button type="button" className="active-filter-pills__pill-x" aria-label={`Remove ${pill.label} filter`} onClick={pill.onRemove}>
                    <X size={12} strokeWidth={2.5} aria-hidden />
                  </button>
                </span>
              ))}
              {(excludedFuelTypes.size > 0 || activeFilterPills.length > 0) && (
                <button type="button" className="active-filter-pills__clear-all" onClick={excludedFuelTypes.size > 0 && activeFilterPills.length === 0 ? () => setExcludedFuelTypes(new Set()) : clearAllFilters}>
                  Clear All
                </button>
              )}
            </div>
          </div>
          <button
            type="button"
            className={`fuel-deals__filter-btn ${activeFilterPills.length > 0 ? 'fuel-deals__filter-btn--active' : ''}`}
            onClick={() => setFilterOpen(true)}
          >
            <SlidersHorizontal size={16} />
            <span>Filters</span>
            {activeFilterPills.length > 0 && (
              <span className="fuel-deals__filter-badge">{activeFilterPills.length}</span>
            )}
          </button>
        </div>
      </div>

      <div className="fuel-deals__hero">
        <div className="container">
          <div className="fuel-deals__hero-content">
            <div className="fuel-deals__hero-badge">
              <span className="hero-pill__label">Fuel Type Deals</span>
            </div>
            <nav className="fuel-deals__breadcrumb" aria-label="Breadcrumb">
              <Link to="/">Home</Link>
              <span className="fuel-deals__breadcrumb-sep">/</span>
              <Link to="/deals">Deals</Link>
              <span className="fuel-deals__breadcrumb-sep">/</span>
              <span>Fuel Type Deals</span>
            </nav>
            <h1 className="fuel-deals__title">{pageTitle}</h1>
            <p className="fuel-deals__description">
              Shop deals by powertrain, whether you want a traditional gas engine, a fuel-sipping hybrid, a zero-emission EV, or a torque-rich diesel. Every current incentive, paired with Car and Driver expert ratings.
            </p>
          </div>
        </div>
      </div>

      <AdBanner imageUrl="https://d2kde5ohu8qb21.cloudfront.net/files/693a37c1e2108b000272edd6/nissan.jpg" altText="Advertisement" />

      <div className="fuel-deals__content">
        <div className={`container${displayDeals.length > 0 ? ' fuel-deals__container--stacked' : ''}`}>
          {displayDeals.length === 0 ? (
            <div className="fuel-deals__segment">
              <div className="fuel-deals__main">
                <section className="fuel-deals__section">
                  <div className="fuel-deals__grid">
                    <div className="fuel-deals__empty-state">
                      <p className="fuel-deals__empty-state-text">
                        There are currently no active fuel type offers. Check back soon or explore other available deals.
                      </p>
                      <Link to="/deals" className="fuel-deals__empty-state-link">
                        Browse All Deals
                      </Link>
                    </div>
                  </div>
                </section>
              </div>
              <aside className="fuel-deals__sidebar" aria-label="Advertisement">
                <div className="fuel-deals__sidebar-sticky">
                  <AdSidebar />
                </div>
              </aside>
            </div>
          ) : (
            <>
              {dealChunks.map((chunk, chunkIndex) => (
                <Fragment key={`fuel-segment-${chunkIndex}`}>
                  <div className="fuel-deals__segment">
                    <div className="fuel-deals__main">
                      <section className="fuel-deals__section">
                        <div className="fuel-deals__grid">
                          {chunk.map((deal, i) => {
                            const saved = isVehicleSaved(deal.vehicleName);
                            const offers = getVehicleOffers(deal.vehicle.make, deal.vehicle.model);
                            const dealTypeTag = deal.dealType === 'lease' ? 'Lease' : deal.dealType === 'cash' ? 'Cash' : 'Buy';
                            const pillChipLabel = deal.dealType === 'lease' ? 'Lease' : deal.dealType === 'cash' ? 'Cash' : 'Buy';
                            const paymentAmount = deal.dealType === 'cash'
                              ? (deal.incentiveValue ?? '')
                              : deal.dealType === 'lease'
                                ? `$${deal.estimatedMonthly}`
                                : (deal.aprDisplay ?? '');
                            const paymentPeriod = deal.dealType === 'cash'
                              ? 'Cash Back'
                              : deal.dealType === 'lease'
                                ? '/mo'
                                : ' APR';
                            return (
                              <Fragment key={deal.id}>
                                {i > 0 && i % 4 === 0 && <GridAd />}
                                <DealCard
                                  slug={deal.vehicle.slug}
                                  vehicleName={deal.vehicleName}
                                  vehicleImage={deal.vehicle.image}
                                  vehicleSlug={deal.vehicle.slug}
                                  vehicleMake={deal.vehicle.make}
                                  vehicleModel={deal.vehicle.model}
                                  rating={deal.rating}
                                  dealTypeTag={dealTypeTag}
                                  imageBadge={deal.fuelType}
                                  editorsChoice={deal.vehicle.editorsChoice}
                                  tenBest={deal.vehicle.tenBest}
                                  isSaved={saved}
                                  onSaveClick={(e) => handleSaveClick(e, { name: deal.vehicleName, slug: deal.vehicle.slug, image: deal.vehicle.image })}
                                  offers={offers}
                                  offersPopupOpen={offersPopup?.slug === deal.vehicle.slug}
                                  onToggleOffersPopup={(e) => toggleOffersPopup(e, deal.vehicle.make, deal.vehicle.model, deal.vehicle.slug)}
                                  onCloseOffersPopup={(e) => { e.preventDefault(); e.stopPropagation(); setOffersPopup(null); }}
                                  payment={{
                                    amount: paymentAmount,
                                    period: paymentPeriod,
                                    savings: { type: 'savings-text', text: deal.savingsVsAvg },
                                    savingsTooltip: deal.savingsTooltip,
                                    expirationDate: deal.expirationDate,
                                  }}
                                  pill={{
                                    chipLabel: pillChipLabel,
                                    text: deal.dealText,
                                    expirationDate: deal.expirationDate,
                                  }}
                                  details={deal.details}
                                  onDealClick={(e) => { e.preventDefault(); e.stopPropagation(); setActiveDealId(deal.id); }}
                                />
                              </Fragment>
                            );
                          })}
                        </div>
                      </section>
                    </div>
                    <aside className="fuel-deals__sidebar" aria-label="Advertisement">
                      <div className="fuel-deals__sidebar-sticky">
                        {chunkIndex === 0 ? <AdSidebar /> : <AdSidebar {...SIDEBAR_AFTER_BREAK_PROPS} />}
                      </div>
                    </aside>
                  </div>
                  {chunkIndex < dealChunks.length - 1 && (
                    <div className="fuel-deals__full-bleed-breaker" role="complementary" aria-label="Advertisement">
                      <AdBanner imageUrl={DEALS_GRID_BREAKER_AD_URL} altText="Advertisement" />
                    </div>
                  )}
                </Fragment>
              ))}
            </>
          )}

          <div className="fuel-deals__segment fuel-deals__segment--tail">
            <div className="fuel-deals__main">
              <section className="fuel-deals__faq-section">
                <h2 className="fuel-deals__section-title">Frequently Asked Questions</h2>
                <div className="fuel-deals__faq-list">
                  {FAQ_DATA.map((faq, i) => (
                    <div key={i} className={`fuel-deals__faq-item ${expandedFaqIndex === i ? 'fuel-deals__faq-item--expanded' : ''}`}>
                      <button type="button" className="fuel-deals__faq-question" onClick={() => setExpandedFaqIndex(expandedFaqIndex === i ? null : i)} aria-expanded={expandedFaqIndex === i}>
                        <span>{faq.question}</span>{expandedFaqIndex === i ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                      </button>
                      {expandedFaqIndex === i && <div className="fuel-deals__faq-answer"><p>{faq.answer}</p></div>}
                    </div>
                  ))}
                </div>
              </section>

              <section className="fuel-deals__links-section">
                <h2 className="fuel-deals__section-title">Explore More</h2>
                <div className="fuel-deals__links-grid">
                  <Link to="/deals" className="fuel-deals__link-card"><h3>All Deals</h3><p>Browse every current deal</p></Link>
                  <Link to="/deals/best-buying-deals" className="fuel-deals__link-card"><h3>Buying Deals</h3><p>0% APR, cash back, and special financing</p></Link>
                  <Link to="/deals/suv" className="fuel-deals__link-card"><h3>SUV Deals</h3><p>Best deals on SUVs</p></Link>
                  <Link to="/deals/truck" className="fuel-deals__link-card"><h3>Truck Deals</h3><p>Pickup truck specials</p></Link>
                  <Link to="/deals/lease" className="fuel-deals__link-card"><h3>Lease Deals</h3><p>Monthly lease specials</p></Link>
                </div>
              </section>
            </div>
            <aside className="fuel-deals__sidebar" aria-label="Advertisement">
              <div className="fuel-deals__sidebar-sticky">
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
        allIncentives={activeDealObj ? offersToIncentives(activeDealObj.vehicle.make, activeDealObj.vehicle.model) : undefined}
        selectedIncentiveId={undefined}
      />
      <SignInToSaveModal isOpen={showSignInModal} onClose={() => { setShowSignInModal(false); setPendingSaveVehicle(null); }} itemType="vehicle" itemName={pendingSaveVehicle?.name} itemImage={pendingSaveVehicle?.image} />
      <DealsFilterModal
        isOpen={filterOpen}
        onClose={() => setFilterOpen(false)}
        filters={filters}
        onApply={handleFilterApply}
        getResultCount={getResultCount}
        totalResults={displayDeals.length}
      />
    </div>
  );
};

export default FuelTypeDealsPage;
