import { useCallback, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronDown, ChevronRight, ChevronUp, Heart, Info, Fuel, Zap, Leaf, Droplets, SlidersHorizontal, X } from 'lucide-react';
import { getZeroAprDeals } from '../../services/zeroAprDealsService';
import { getFinanceDeals, getCashDeals } from '../../services/cashFinanceDealsService';
import { getLeaseDeals } from '../../services/leaseDealsService';
import { useSupabaseRatings, getCategory } from '../../hooks/useSupabaseRating';
import { useAuth } from '../../contexts/AuthContext';
import { SEO, createBreadcrumbStructuredData, createFAQStructuredData } from '../../components/SEO';
import AdSidebar from '../../components/AdSidebar';
import SignInToSaveModal from '../../components/SignInToSaveModal';
import { EDITORS_CHOICE_BADGE_URL, TEN_BEST_BADGE_URL } from '../../constants/badges';
import { getCurrentPeriod, formatExpiration } from '../../utils/dateUtils';
import { parseMsrpMin, calcMonthly, parseTermMonths, buildSavingsText, getVehicleOffers, offersToIncentives, inferCreditTier, creditTierQualifies } from '../../utils/dealCalculations';
import type { VehicleOfferSummary } from '../../utils/dealCalculations';
import IncentivesModal, { getAprRangeLabel } from '../../components/IncentivesModal/IncentivesModal';
import type { IncentiveOfferDetail } from '../../components/IncentivesModal/IncentivesModal';
import { DealsFilterModal } from '../../components/DealsFilterModal';
import type { DealsFilterState } from '../../components/DealsFilterModal';
import SavingsText from '../../components/SavingsText';
import { useActiveFilterPills } from '../../hooks/useActiveFilterPills';
import Tabs from '../../components/Tabs/Tabs';
import './FuelTypeDealsPage.css';

type FuelTab = 'all' | 'gas' | 'hybrid' | 'electric' | 'diesel';

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

const FUEL_TABS: { key: FuelTab; label: string; icon: React.ReactNode; match: (ft: string) => boolean }[] = [
  { key: 'all', label: 'All', icon: <Fuel size={16} />, match: () => true },
  { key: 'gas', label: 'Gas', icon: <Fuel size={16} />, match: (ft) => ft === 'Gas' },
  { key: 'hybrid', label: 'Hybrid', icon: <Leaf size={16} />, match: (ft) => ft === 'Hybrid' || ft === 'Plug-in Hybrid' || ft === 'Plug-In Hybrid' },
  { key: 'electric', label: 'Electric', icon: <Zap size={16} />, match: (ft) => ft === 'Electric' },
  { key: 'diesel', label: 'Diesel', icon: <Droplets size={16} />, match: (ft) => ft === 'Diesel' },
];

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

const FuelTypeDealsPage = () => {
  const { month: CURRENT_MONTH, year: CURRENT_YEAR } = getCurrentPeriod();
  const { getRating: getSupabaseRating } = useSupabaseRatings();
  const { user, isAuthenticated, addSavedVehicle, removeSavedVehicle } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<FuelTab>('all');
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
  const { pills: activeFilterPills, clearAllFilters } = useActiveFilterPills(filters, setFilters);

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

  const tabMatcher = FUEL_TABS.find(t => t.key === activeTab)?.match || (() => true);
  const deals = useMemo(() => allDeals.filter(d => tabMatcher(d.fuelType)), [allDeals, activeTab]);

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

  const tabCounts = useMemo(() => {
    const counts: Record<FuelTab, number> = { all: allDeals.length, gas: 0, hybrid: 0, electric: 0, diesel: 0 };
    for (const d of allDeals) {
      for (const t of FUEL_TABS) {
        if (t.key !== 'all' && t.match(d.fuelType)) counts[t.key]++;
      }
    }
    return counts;
  }, [allDeals]);

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
          dontWaitText: `This offer expires ${formatExpiration(activeDealObj.expirationDate)}. Manufacturer deals change monthly—once it's gone, there's no guarantee it'll come back.`,
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

  const tabLabel = activeTab === 'all' ? '' : FUEL_TABS.find(t => t.key === activeTab)?.label || '';
  const emptyFuelCategory =
    activeTab === 'all' ? 'fuel type' : FUEL_TABS.find(t => t.key === activeTab)?.label.toLowerCase() || 'fuel type';
  const pageTitle = tabLabel
    ? `Best ${tabLabel} Vehicle Deals – ${CURRENT_MONTH} ${CURRENT_YEAR}`
    : `Best Vehicle Deals by Fuel Type – ${CURRENT_MONTH} ${CURRENT_YEAR}`;
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
            {activeFilterPills.length > 0 && (
              <div className="active-filter-pills__row" aria-label="Active filters">
                {activeFilterPills.map(pill => (
                  <span key={pill.id} className="active-filter-pills__pill">
                    <span className="active-filter-pills__pill-label">{pill.label}</span>
                    <button type="button" className="active-filter-pills__pill-x" aria-label={`Remove ${pill.label} filter`} onClick={pill.onRemove}>
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
              Shop deals by powertrain—whether you want a traditional gas engine, a fuel-sipping hybrid, a zero-emission EV, or a torque-rich diesel. Every current incentive, paired with Car and Driver expert ratings.
            </p>
          </div>
        </div>
      </div>

      <div className="fuel-deals__content">
        <div className="container">
          <div className="fuel-deals__layout">
            <div className="fuel-deals__main">
              {/* Fuel Type Tabs */}
              <Tabs
                items={FUEL_TABS.map(t => ({
                  value: t.key,
                  label: t.label,
                  icon: t.icon,
                  count: tabCounts[t.key],
                  disabled: tabCounts[t.key] === 0 && t.key !== 'all',
                }))}
                value={activeTab}
                onChange={setActiveTab}
                variant="pills"
                ariaLabel="Fuel type"
              />

              <section className="fuel-deals__section">
                <div className="fuel-deals__grid">
                  {displayDeals.map((deal) => {
                    const saved = isVehicleSaved(deal.vehicleName);
                    return (
                      <div key={deal.id} className="fuel-deals__card">
                        <div className="fuel-deals__card-header">
                          <Link to={`/${deal.vehicle.slug}`} className="fuel-deals__card-name-link">
                            <h3 className="fuel-deals__card-name">{deal.vehicleName}</h3>
                          </Link>
                          <div className="fuel-deals__card-rating">
                            <span className="fuel-deals__card-rating-value">{deal.rating}</span>
                            <span className="fuel-deals__card-rating-max">/10</span>
                            <span className="fuel-deals__card-rating-label">C/D Rating</span>
                          </div>
                        </div>

                        <Link to={`/${deal.vehicle.slug}`} className="fuel-deals__card-image-link">
                          <div className="fuel-deals__card-image-container">
                            <img src={deal.vehicle.image} alt={deal.vehicleName} className="fuel-deals__card-image" />
                            <span className="fuel-deals__card-deal-type-tag">{deal.dealType === 'lease' ? 'Lease' : deal.dealType === 'cash' ? 'Cash' : 'Finance'}</span>
                            <span className="fuel-deals__card-fuel-badge">{deal.fuelType}</span>
                            <button
                              className={`fuel-deals__card-save ${saved ? 'fuel-deals__card-save--saved' : ''}`}
                              onClick={(e) => handleSaveClick(e, { name: deal.vehicleName, slug: deal.vehicle.slug, image: deal.vehicle.image })}
                              aria-label={saved ? 'Remove from favorites' : 'Add to favorites'}
                            >
                              <Heart size={16} fill={saved ? 'currentColor' : 'none'} />
                            </button>
                            {(() => {
                              const allOffers = getVehicleOffers(deal.vehicle.make, deal.vehicle.model);
                              if (allOffers.length > 1) return (
                                <button type="button" className="fuel-deals__card-offers-tag" onClick={(e) => toggleOffersPopup(e, deal.vehicle.make, deal.vehicle.model, deal.vehicle.slug)}>
                                  {allOffers.length} Offers Available
                                </button>
                              );
                              return null;
                            })()}
                            {offersPopup?.slug === deal.vehicle.slug && (
                              <div className="fuel-deals__card-offers-popup">
                                <div className="fuel-deals__card-offers-popup-header">
                                  <strong>{offersPopup.offers.length} Available Offers</strong>
                                  <button type="button" className="fuel-deals__card-offers-popup-close" onClick={(e) => { e.preventDefault(); e.stopPropagation(); setOffersPopup(null); }}>&times;</button>
                                </div>
                                <ul className="fuel-deals__card-offers-popup-list">
                                  {offersPopup.offers.map((o, idx) => (
                                    <li key={idx} className="fuel-deals__card-offers-popup-item">
                                      <span className={`fuel-deals__card-offers-popup-type fuel-deals__card-offers-popup-type--${o.type}`}>
                                        {o.type === 'zero-apr' ? '0% APR' : o.type === 'cash' ? 'Cash' : o.type === 'lease' ? 'Lease' : 'Finance'}
                                      </span>
                                      <span className="fuel-deals__card-offers-popup-label">{o.label}</span>
                                      <span className="fuel-deals__card-offers-popup-exp">expires {formatExpiration(o.expires)}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                            {(deal.vehicle.editorsChoice || deal.vehicle.tenBest) && (
                              <div className="fuel-deals__card-badges">
                                {deal.vehicle.tenBest && <img src={TEN_BEST_BADGE_URL} alt="10Best" className="fuel-deals__card-badge-img" />}
                                {deal.vehicle.editorsChoice && <img src={EDITORS_CHOICE_BADGE_URL} alt="Editors' Choice" className="fuel-deals__card-badge-img" />}
                              </div>
                            )}
                          </div>
                        </Link>

                        <div className="fuel-deals__card-body">
                          <div className="fuel-deals__card-payment-block">
                            <div className="fuel-deals__card-payment">
                              {deal.dealType === 'cash' ? (
                                <>
                                  <span className="fuel-deals__card-payment-amount">{deal.incentiveValue}</span>
                                  <span className="fuel-deals__card-payment-period">Cash Back</span>
                                </>
                              ) : deal.dealType === 'lease' ? (
                                <>
                                  <span className="fuel-deals__card-payment-amount">${deal.estimatedMonthly}</span>
                                  <span className="fuel-deals__card-payment-period">/mo</span>
                                </>
                              ) : (
                                <>
                                  <span className="fuel-deals__card-payment-amount">{deal.aprDisplay}</span>
                                  <span className="fuel-deals__card-payment-period"> APR</span>
                                </>
                              )}
                            </div>
                            <span className="fuel-deals__card-payment-savings">
                              <SavingsText text={deal.savingsVsAvg} />
                              <span className="fuel-deals__card-tooltip-wrap">
                                <Info size={13} className="fuel-deals__card-tooltip-icon" />
                                <span className="fuel-deals__card-tooltip">{deal.savingsTooltip}</span>
                              </span>
                            </span>
                            <span className="fuel-deals__card-payment-expires">Expires {formatExpiration(deal.expirationDate)}</span>
                          </div>

                          <button className="fuel-deals__card-deal-pill" onClick={(e) => { e.preventDefault(); e.stopPropagation(); setActiveDealId(deal.id); }}>
                            <span className="fuel-deals__card-deal-pill-chip">
                              {deal.dealType === 'lease' ? 'Lease' : deal.dealType === 'cash' ? 'Cash' : 'Finance'}
                            </span>
                            <span className="fuel-deals__card-deal-pill-text">{deal.dealText}</span>
                            <span className="fuel-deals__card-deal-pill-divider" />
                            <span className="fuel-deals__card-deal-pill-expires">expires {formatExpiration(deal.expirationDate)}</span>
                          </button>

                          <div className="fuel-deals__card-details">
                            {deal.details.map((d, i) => (
                              <div key={i} className="fuel-deals__card-detail">
                                <span className="fuel-deals__card-detail-label">{d.label}</span>
                                <span className="fuel-deals__card-detail-value">{d.value}</span>
                              </div>
                            ))}
                          </div>

                          <button type="button" className="fuel-deals__card-cta" onClick={() => setActiveDealId(deal.id)}>Get This Deal</button>

                          <Link
                            to={`/${deal.vehicle.slug}`}
                            className="fuel-deals__card-toggle"
                          >
                            <span>Read More</span>
                            <ChevronRight size={14} />
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                  {displayDeals.length === 0 && (
                    <div className="fuel-deals__empty-state">
                      <p className="fuel-deals__empty-state-text">
                        There are currently no active {emptyFuelCategory} offers. Check back soon or explore other available deals.
                      </p>
                      <Link to="/deals" className="fuel-deals__empty-state-link">
                        Browse All Deals
                      </Link>
                    </div>
                  )}
                </div>
              </section>

              <section className="fuel-deals__faq-section">
                <h2 className="fuel-deals__section-title">Frequently Asked Questions</h2>
                <div className="fuel-deals__faq-list">
                  {FAQ_DATA.map((faq, i) => (
                    <div key={i} className={`fuel-deals__faq-item ${expandedFaqIndex === i ? 'fuel-deals__faq-item--expanded' : ''}`}>
                      <button className="fuel-deals__faq-question" onClick={() => setExpandedFaqIndex(expandedFaqIndex === i ? null : i)} aria-expanded={expandedFaqIndex === i}>
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
                  <Link to="/deals/best-buying-deals" className="fuel-deals__link-card"><h3>Best Buying Deals</h3><p>0% APR, special financing, and more</p></Link>
                  <Link to="/deals/suv" className="fuel-deals__link-card"><h3>SUV Deals</h3><p>Best deals on SUVs</p></Link>
                  <Link to="/deals/truck" className="fuel-deals__link-card"><h3>Truck Deals</h3><p>Pickup truck specials</p></Link>
                  <Link to="/deals/lease" className="fuel-deals__link-card"><h3>Lease Deals</h3><p>Monthly lease specials</p></Link>
                  <Link to="/deals/cash-finance" className="fuel-deals__link-card"><h3>Finance Deals</h3><p>Cash-back and APR offers</p></Link>
                </div>
              </section>
            </div>
            <aside className="fuel-deals__sidebar"><AdSidebar /></aside>
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
        totalResults={displayDeals.length}
      />
    </div>
  );
};

export default FuelTypeDealsPage;
