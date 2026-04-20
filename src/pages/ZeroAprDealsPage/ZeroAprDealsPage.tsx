import { Fragment, useMemo, useState, useCallback, useEffect } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { ChevronDown, ChevronUp, X, SlidersHorizontal } from 'lucide-react';
import { getZeroAprDeals } from '../../services/zeroAprDealsService';
import { getFinanceDeals, getCashDeals } from '../../services/cashFinanceDealsService';
import { getCurrentPeriod, formatExpiration } from '../../utils/dateUtils';
import { parseMsrpMin, calcMonthly, parseTermMonths, buildSavingsText, inferCreditTier, creditTierQualifies, getVehicleOffers, offersToIncentives, findMatchingIncentiveId, sortDeals } from '../../utils/dealCalculations';
import { useActiveFilterPills } from '../../hooks/useActiveFilterPills';
import type { VehicleOfferSummary } from '../../utils/dealCalculations';
import { useSupabaseRatings, getCategory } from '../../hooks/useSupabaseRating';
import { useAuth } from '../../contexts/AuthContext';
import { SEO, createBreadcrumbStructuredData, createFAQStructuredData } from '../../components/SEO';
import AdBanner from '../../components/AdBanner';
import AdSidebar from '../../components/AdSidebar';
import { GridAd } from '../../components/GridAd';
import SignInToSaveModal from '../../components/SignInToSaveModal';
import IncentivesModal, { getAprRangeLabel } from '../../components/IncentivesModal/IncentivesModal';
import type { IncentiveOfferDetail } from '../../components/IncentivesModal/IncentivesModal';
import { DealsFilterModal } from '../../components/DealsFilterModal';
import type { DealsFilterState, DealTypeOption } from '../../components/DealsFilterModal';
import { DealCard } from '../../components/DealCard';
import { BEST_BUYING_DEALS_PATH, ZERO_PERCENT_APR_DEALS_PATH, CASH_BACK_DEALS_PATH } from '../../constants/dealRoutes';
import { useFilterOpen } from '../../hooks/useFilterOpen';
import { resolveBuyingFilterDestination } from '../../utils/buyingFilterNavigation';
import { ZERO_APR_FAQ, BEST_BUYING_FAQ as FAQ_DATA } from '../../data/faqs';
import {
  GRID_BREAKER_AFTER_CARD_COUNT,
  DEALS_GRID_BREAKER_AD_URL,
  SIDEBAR_AFTER_BREAK_PROPS,
} from '../../constants/dealsLayout';
import { chunkArray } from '../../utils/chunkArray';
import { renderFaqQuestionText } from '../../utils/renderFaqQuestionText';
import './ZeroAprDealsPage.css';

type AprTab = 'all' | 'zero-apr' | 'special-apr' | 'cash';

interface UnifiedAprDeal {
  id: string;
  aprType: 'zero-apr' | 'special-apr' | 'cash';
  vehicleName: string;
  vehicle: { id: string; year: string; make: string; model: string; image: string; slug: string; bodyStyle: string; fuelType: string; priceRange: string; staffRating: number; editorsChoice?: boolean; tenBest?: boolean };
  apr: number;
  aprDisplay: string;
  term: string;
  estimatedMonthly: number;
  savingsVsAvg: string;
  savingsTooltip: string;
  dealText: string;
  expirationDate: string;
  programName: string;
  programDescription: string;
  targetAudience: string;
  trimsEligible: string[];
  rating: number;
  incentiveValue?: string;
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

const ZeroAprDealsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams<{ slug?: string }>();
  const categorySlug = params.slug ?? '';

  const isZeroPercentOnlyRoute = location.pathname === ZERO_PERCENT_APR_DEALS_PATH;
  const isCashBackOnlyRoute = location.pathname === CASH_BACK_DEALS_PATH;

  const { getRating: getSupabaseRating } = useSupabaseRatings();
  const { user, isAuthenticated, addSavedVehicle, removeSavedVehicle } = useAuth();
  const { month, year } = getCurrentPeriod();

  // Resolve the URL slug against the buying dataset. Detection order mirrors
  // the lease dispatcher: body style → fuel type → make. If nothing in the
  // data matches we fall through to a title-cased make name so the page
  // still renders a useful header rather than silently dropping context.
  const { bodyStyleName, fuelTypeName, makeName } = useMemo(() => {
    if (!categorySlug) return { bodyStyleName: '', fuelTypeName: '', makeName: '' };
    const target = categorySlug.toLowerCase().replace(/-/g, ' ');
    const allBuyingDeals = [
      ...getZeroAprDeals(),
      ...getFinanceDeals(),
      ...getCashDeals(),
    ];

    const bodyMatch = allBuyingDeals.find((d) => d.vehicle.bodyStyle.toLowerCase() === target);
    if (bodyMatch) return { bodyStyleName: bodyMatch.vehicle.bodyStyle, fuelTypeName: '', makeName: '' };

    const fuelMatch = allBuyingDeals.find((d) => d.vehicle.fuelType.toLowerCase() === target);
    if (fuelMatch) return { bodyStyleName: '', fuelTypeName: fuelMatch.vehicle.fuelType, makeName: '' };

    const makeMatch = allBuyingDeals.find((d) => d.vehicle.make.toLowerCase() === target);
    if (makeMatch) return { bodyStyleName: '', fuelTypeName: '', makeName: makeMatch.vehicle.make };

    return {
      bodyStyleName: '',
      fuelTypeName: '',
      makeName: categorySlug
        .split('-')
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
        .join(' '),
    };
  }, [categorySlug]);

  const routeTab: AprTab = isZeroPercentOnlyRoute ? 'zero-apr' : isCashBackOnlyRoute ? 'cash' : 'all';

  const [activeTab, setActiveTab] = useState<AprTab>(routeTab);

  useEffect(() => {
    setActiveTab(routeTab);
  }, [routeTab]);
  const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(null);
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [pendingSaveVehicle, setPendingSaveVehicle] = useState<{ name: string; slug: string; image?: string } | null>(null);
  const [activeDealId, setActiveDealId] = useState<string | null>(null);
  const [filterOpen, setFilterOpen] = useFilterOpen();

  const initialFiltersFromNavState = (location.state as { filters?: DealsFilterState } | null)?.filters;
  const [filters, setFilters] = useState<DealsFilterState>(() => {
    if (initialFiltersFromNavState) return initialFiltersFromNavState;
    if (bodyStyleName) return { ...DEFAULT_FILTERS, bodyTypes: [bodyStyleName] };
    if (fuelTypeName) return { ...DEFAULT_FILTERS, fuelTypes: [fuelTypeName] };
    if (makeName) return { ...DEFAULT_FILTERS, makes: [makeName] };
    return DEFAULT_FILTERS;
  });

  // Keep the filter state in sync with the URL when the user navigates between
  // category-scoped buying pages so the modal always reflects the current
  // context as a pre-selected chip.
  useEffect(() => {
    setFilters((prev) => {
      if (bodyStyleName) {
        return {
          ...prev,
          bodyTypes: prev.bodyTypes.includes(bodyStyleName) ? prev.bodyTypes : [bodyStyleName],
        };
      }
      if (fuelTypeName) {
        return {
          ...prev,
          fuelTypes: prev.fuelTypes.includes(fuelTypeName) ? prev.fuelTypes : [fuelTypeName],
        };
      }
      if (makeName) {
        return {
          ...prev,
          makes: prev.makes.includes(makeName) ? prev.makes : [makeName],
        };
      }
      return prev;
    });
  }, [bodyStyleName, fuelTypeName, makeName]);

  // Hydrate filters when the user arrives from another buying surface with a
  // multi-selection carried via router state, then clear the state so a
  // refresh resets cleanly.
  useEffect(() => {
    const incoming = (location.state as { filters?: DealsFilterState } | null)?.filters;
    if (incoming) {
      setFilters(incoming);
      navigate(location.pathname, { replace: true, state: null });
    }
  }, [location.state, location.pathname, navigate]);

  const [offersPopup, setOffersPopup] = useState<{ slug: string; offers: VehicleOfferSummary[] } | null>(null);

  const handleFilterApply = useCallback(
    (applied: DealsFilterState) => {
      const dest = resolveBuyingFilterDestination(applied);
      if (dest && dest.path !== location.pathname) {
        navigate(dest.path, dest.carryFilters ? { state: { filters: applied } } : undefined);
        return;
      }
      setFilters(applied);
    },
    [navigate, location.pathname],
  );

  const handleDealTypeNavigate = useCallback((dealType: DealTypeOption, carriedFilters: DealsFilterState) => {
    if (dealType === 'lease' || dealType === 'all') {
      navigate('/deals/lease', { state: { filters: carriedFilters } });
    }
  }, [navigate]);

  const { pills: sharedPills } = useActiveFilterPills(filters, setFilters, DEFAULT_FILTERS);

  const activeFilterPills = useMemo(() => {
    const tabLabel = activeTab === 'zero-apr' ? '0% APR' : activeTab === 'special-apr' ? 'Special APR' : activeTab === 'cash' ? 'Cash Back' : '';
    const extra = tabLabel
      ? [{ id: `tab-${activeTab}`, label: tabLabel, onRemove: () => { setActiveTab('all'); setFilters(DEFAULT_FILTERS); } }]
      : [];
    return [...extra, ...sharedPills];
  }, [activeTab, sharedPills]);

  const clearAllFilters = useCallback(() => {
    setActiveTab('all');
    setFilters(DEFAULT_FILTERS);
  }, []);

  const toggleOffersPopup = useCallback((e: React.MouseEvent, make: string, model: string, slug: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (offersPopup?.slug === slug) {
      setOffersPopup(null);
    } else {
      setOffersPopup({ slug, offers: getVehicleOffers(make, model) });
    }
  }, [offersPopup]);

  const allDeals = useMemo((): UnifiedAprDeal[] => {
    const results: UnifiedAprDeal[] = [];

    for (const d of getZeroAprDeals()) {
      const msrp = parseMsrpMin(d.vehicle.priceRange);
      const months = parseTermMonths(d.term);
      const monthly = calcMonthly(msrp, 0, months);
      const { savingsVsAvg, savingsTooltip } = buildSavingsText(monthly, d.vehicle.bodyStyle);
      results.push({
        id: d.id, aprType: 'zero-apr', vehicleName: `${d.vehicle.year} ${d.vehicle.make} ${d.vehicle.model}`, vehicle: d.vehicle,
        apr: 0, aprDisplay: '0%', term: d.term, estimatedMonthly: monthly, savingsVsAvg, savingsTooltip,
        dealText: '0% APR Financing', expirationDate: d.expirationDate,
        programName: d.programName, programDescription: d.programDescription,
        targetAudience: d.targetAudience, trimsEligible: d.trimsEligible,
        rating: getSupabaseRating(d.vehicle.id, getCategory(d.vehicle.bodyStyle), d.vehicle.staffRating),
      });
    }

    for (const d of getFinanceDeals()) {
      const msrp = parseMsrpMin(d.vehicle.priceRange);
      const aprNum = parseFloat(d.apr.replace('%', ''));
      const months = parseTermMonths(d.term);
      const monthly = calcMonthly(msrp, aprNum, months);
      const { savingsVsAvg, savingsTooltip } = buildSavingsText(monthly, d.vehicle.bodyStyle);
      const rangeLabel = getAprRangeLabel({ value: `${d.apr} APR`, title: d.programName, terms: d.term });
      const displayRate = rangeLabel.replace(/\s*APR$/, '');
      results.push({
        id: d.id, aprType: 'special-apr', vehicleName: `${d.vehicle.year} ${d.vehicle.make} ${d.vehicle.model}`, vehicle: d.vehicle,
        apr: aprNum, aprDisplay: displayRate, term: d.term, estimatedMonthly: monthly, savingsVsAvg, savingsTooltip,
        dealText: rangeLabel, expirationDate: d.expirationDate,
        programName: d.programName, programDescription: d.programDescription,
        targetAudience: d.targetAudience, trimsEligible: d.trimsEligible,
        rating: getSupabaseRating(d.vehicle.id, getCategory(d.vehicle.bodyStyle), d.vehicle.staffRating),
      });
    }

    for (const d of getCashDeals()) {
      const msrp = parseMsrpMin(d.vehicle.priceRange);
      const monthlyAfterCash = calcMonthly(msrp - d.incentiveAmount, 6.5, 60);
      const { savingsVsAvg, savingsTooltip } = buildSavingsText(monthlyAfterCash, d.vehicle.bodyStyle, 'cash');
      results.push({
        id: d.id, aprType: 'cash', vehicleName: `${d.vehicle.year} ${d.vehicle.make} ${d.vehicle.model}`, vehicle: d.vehicle,
        apr: -1, aprDisplay: d.incentiveValue, term: '', estimatedMonthly: monthlyAfterCash, savingsVsAvg, savingsTooltip,
        dealText: `${d.incentiveValue} Cash Back`, expirationDate: d.expirationDate,
        programName: d.programName, programDescription: d.programDescription,
        targetAudience: '', trimsEligible: d.trimsEligible,
        rating: getSupabaseRating(d.vehicle.id, getCategory(d.vehicle.bodyStyle), d.vehicle.staffRating),
        incentiveValue: d.incentiveValue, percentOffMsrp: d.percentOffMsrp,
      });
    }

    return results.sort((a, b) => a.apr - b.apr);
  }, [getSupabaseRating]);

  const applyFiltersToDeals = useCallback((dealList: UnifiedAprDeal[], f: DealsFilterState): UnifiedAprDeal[] => {
    return dealList.filter(d => {
      const v = d.vehicle;
      if (f.bodyTypes.length > 0 && !f.bodyTypes.includes(v.bodyStyle)) return false;
      if (f.makes.length > 0 && !f.makes.includes(v.make)) return false;
      if (f.fuelTypes.length > 0 && !f.fuelTypes.includes(v.fuelType)) return false;
      if (f.accolades.length > 0) {
        const hasMatch = f.accolades.some(a => {
          if (a === 'editorsChoice') return v.editorsChoice;
          if (a === 'tenBest') return v.tenBest;
          if (a === 'evOfTheYear') return (v as any).evOfTheYear;
          return false;
        });
        if (!hasMatch) return false;
      }
      if (f.terms.length > 0 && d.term) {
        if (!f.terms.includes(parseTermMonths(d.term))) return false;
      }
      if (f.creditTier && d.targetAudience) {
        const dealTier = inferCreditTier(d.targetAudience);
        if (!creditTierQualifies(dealTier, f.creditTier)) return false;
      }
      if (f.monthlyPaymentMin > 0 || f.monthlyPaymentMax < 1500) {
        if (d.estimatedMonthly < f.monthlyPaymentMin || d.estimatedMonthly > f.monthlyPaymentMax) return false;
      }
      return true;
    });
  }, []);

  const filteredAll = useMemo(() => applyFiltersToDeals(allDeals, filters), [allDeals, filters, applyFiltersToDeals]);

  const deals = useMemo(() => {
    const tabbed = activeTab === 'all' ? filteredAll : filteredAll.filter(d => d.aprType === activeTab);
    return sortDeals(tabbed, filters.sortBy);
  }, [filteredAll, activeTab, filters.sortBy]);

  const dealChunks = useMemo(() => chunkArray(deals, GRID_BREAKER_AFTER_CARD_COUNT), [deals]);

  const getResultCount = useCallback((draftFilters: DealsFilterState): number => {
    const filtered = applyFiltersToDeals(allDeals, draftFilters);
    if (activeTab === 'all') return filtered.length;
    return filtered.filter(d => d.aprType === activeTab).length;
  }, [allDeals, applyFiltersToDeals, activeTab]);

  const isVehicleSaved = (vehicleName: string) => user?.savedVehicles?.some((v) => v.name === vehicleName) || false;

  const handleSaveClick = (e: React.MouseEvent, vehicle: { name: string; slug: string; image?: string }) => {
    e.preventDefault(); e.stopPropagation();
    if (!isAuthenticated) { setPendingSaveVehicle(vehicle); setShowSignInModal(true); return; }
    const isSaved = isVehicleSaved(vehicle.name);
    if (isSaved) { const sv = user?.savedVehicles?.find((v) => v.name === vehicle.name); if (sv) removeSavedVehicle(sv.id); }
    else { addSavedVehicle({ id: vehicle.slug, name: vehicle.name, ownership: 'want' }); }
  };

  const renderAprDealCard = (deal: UnifiedAprDeal) => {
    const saved = isVehicleSaved(deal.vehicleName);
    const isCash = deal.aprType === 'cash';
    const dealTypeTag = isCash ? 'Cash' : 'Buy';
    const offers = getVehicleOffers(deal.vehicle.make, deal.vehicle.model);
    const payment = isCash
      ? {
          amount: deal.incentiveValue ?? '',
          period: 'Cash Back',
          expirationDate: deal.expirationDate,
        }
      : {
          amount: deal.aprDisplay,
          period: ' APR',
          expirationDate: deal.expirationDate,
        };
    const pill = {
      chipLabel: dealTypeTag,
      text: deal.dealText,
      expirationDate: deal.expirationDate,
    };
    const details = [
      { label: 'MSRP Range', value: deal.vehicle.priceRange },
      isCash
        ? { label: 'Est. off MSRP', value: deal.percentOffMsrp ?? '' }
        : { label: 'Term', value: deal.term },
    ];

    return (
      <DealCard
        slug={deal.vehicle.slug}
        vehicleName={deal.vehicleName}
        vehicleImage={deal.vehicle.image}
        vehicleSlug={deal.vehicle.slug}
        vehicleMake={deal.vehicle.make}
        vehicleModel={deal.vehicle.model}
        rating={deal.rating}
        dealTypeTag={dealTypeTag}
        editorsChoice={deal.vehicle.editorsChoice}
        tenBest={deal.vehicle.tenBest}
        isSaved={saved}
        onSaveClick={(e) => handleSaveClick(e, { name: deal.vehicleName, slug: deal.vehicle.slug, image: deal.vehicle.image })}
        offers={offers}
        offersPopupOpen={offersPopup?.slug === deal.vehicle.slug}
        onToggleOffersPopup={(e) => toggleOffersPopup(e, deal.vehicle.make, deal.vehicle.model, deal.vehicle.slug)}
        onCloseOffersPopup={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setOffersPopup(null);
        }}
        payment={payment}
        pill={pill}
        details={details}
        onDealClick={() => setActiveDealId(deal.id)}
      />
    );
  };

  const activeDealObj = activeDealId ? deals.find(d => d.id === activeDealId) : null;
  const activeOffer: Partial<IncentiveOfferDetail> | undefined = activeDealObj
    ? {
        year: parseInt(activeDealObj.vehicle.year, 10),
        make: activeDealObj.vehicle.make,
        model: activeDealObj.vehicle.model,
        slug: activeDealObj.vehicle.slug,
        imageUrl: activeDealObj.vehicle.image,
        msrpMin: parseInt(activeDealObj.vehicle.priceRange.replace(/[^0-9,\-–]/g, '').split(/[-–]/)[0]?.replace(/,/g, '') || '0', 10),
        msrpMax: parseInt(activeDealObj.vehicle.priceRange.replace(/[^0-9,\-–]/g, '').split(/[-–]/)[1]?.replace(/,/g, '') || '0', 10),
        offerHeadline: activeDealObj.aprType === 'cash'
          ? `${activeDealObj.incentiveValue} Cash Back`
          : activeDealObj.aprType === 'zero-apr'
          ? `0% Interest Financing for ${activeDealObj.term}`
          : `${activeDealObj.aprDisplay} APR Financing for ${activeDealObj.term}`,
        whatItMeans: activeDealObj.aprType === 'cash'
          ? `A manufacturer rebate of ${activeDealObj.incentiveValue} applied at purchase, reducing the effective price of the vehicle.`
          : activeDealObj.aprType === 'zero-apr'
          ? 'You pay absolutely zero interest on your auto loan. Every dollar of your monthly payment goes directly toward the price of the car, not to the bank.'
          : `A below-market ${activeDealObj.aprDisplay} interest rate from the manufacturer that lowers your monthly payment and total cost vs. the average ~6.5% rate.`,
        yourSavings: activeDealObj.aprType === 'cash'
          ? `${activeDealObj.incentiveValue} off the purchase price (${activeDealObj.percentOffMsrp} off MSRP).`
          : activeDealObj.aprType === 'zero-apr'
          ? `On a $35,000 loan over ${activeDealObj.term}, you'd save thousands in interest vs. the average 6.5% rate.`
          : `At ${activeDealObj.aprDisplay} instead of 6.5%, you could save $1,500–$3,000 in interest over the loan term.`,
        whoQualifies: activeDealObj.targetAudience || 'All buyers',
        eligibleTrims: activeDealObj.trimsEligible,
        dontWaitText: `This offer expires ${formatExpiration(activeDealObj.expirationDate)}. Manufacturer deals change monthly. Once it's gone, there's no guarantee it'll come back.`,
        eventLabel: activeDealObj.programName,
        expirationDate: activeDealObj.expirationDate,
      }
    : undefined;

  const pageTitleMain = bodyStyleName
    ? `Best ${bodyStyleName} Deals & Incentives`
    : fuelTypeName
    ? `Best ${fuelTypeName} Deals & Incentives`
    : makeName
    ? `Best ${makeName} Deals & Incentives`
    : activeTab === 'zero-apr'
    ? `Best Interest Free & 0% APR Deals`
    : activeTab === 'special-apr'
    ? `Best Special APR Deals`
    : activeTab === 'cash'
    ? `Best Cash Back Deals`
    : `Best Car Deals & Incentives`;
  const pageTitleDate = `for ${month} ${year}`;
  const pageTitle = `${pageTitleMain} ${pageTitleDate}`;
  const BASE_URL = 'https://www.caranddriver.com';

  const seoDescription = bodyStyleName
    ? `Find the best ${bodyStyleName.toLowerCase()} buying deals for ${month} ${year}. Compare 0% APR, low-rate financing, and cash-back rebates on every ${bodyStyleName.toLowerCase()}. Expert ratings from Car and Driver.`
    : fuelTypeName
    ? `Find the best ${fuelTypeName.toLowerCase()} buying deals for ${month} ${year}. Compare 0% APR, low-rate financing, and cash-back rebates on every ${fuelTypeName.toLowerCase()} vehicle. Expert ratings from Car and Driver.`
    : makeName
    ? `Find the best ${makeName} buying deals for ${month} ${year}. Compare 0% APR, low-rate financing, and cash-back rebates on every new ${makeName}. Expert ratings from Car and Driver.`
    : isZeroPercentOnlyRoute
    ? `Browse every current 0% APR financing offer for ${month} ${year}. Pay no interest on your auto loan, paired with Car and Driver expert ratings.`
    : `Find the best buying deals for ${month} ${year}. Compare 0% APR, low-rate financing, cash-back rebates, and special offers on new cars, SUVs, and trucks. Expert ratings from Car and Driver.`;

  const seoCanonical = bodyStyleName || fuelTypeName || makeName
    ? `${BASE_URL}${BEST_BUYING_DEALS_PATH}/${categorySlug}`
    : `${BASE_URL}${isZeroPercentOnlyRoute ? ZERO_PERCENT_APR_DEALS_PATH : BEST_BUYING_DEALS_PATH}`;

  const breadcrumbItems = bodyStyleName
    ? [
        { name: 'Home', url: BASE_URL },
        { name: 'Deals', url: `${BASE_URL}/deals` },
        { name: 'Best Buying Deals', url: `${BASE_URL}${BEST_BUYING_DEALS_PATH}` },
        { name: `${bodyStyleName} Deals`, url: seoCanonical },
      ]
    : fuelTypeName
    ? [
        { name: 'Home', url: BASE_URL },
        { name: 'Deals', url: `${BASE_URL}/deals` },
        { name: 'Best Buying Deals', url: `${BASE_URL}${BEST_BUYING_DEALS_PATH}` },
        { name: `${fuelTypeName} Deals`, url: seoCanonical },
      ]
    : makeName
    ? [
        { name: 'Home', url: BASE_URL },
        { name: 'Deals', url: `${BASE_URL}/deals` },
        { name: 'Best Buying Deals', url: `${BASE_URL}${BEST_BUYING_DEALS_PATH}` },
        { name: `${makeName} Deals`, url: seoCanonical },
      ]
    : isZeroPercentOnlyRoute
    ? [
        { name: 'Home', url: BASE_URL },
        { name: 'Deals', url: `${BASE_URL}/deals` },
        { name: 'Best Buying Deals', url: `${BASE_URL}${BEST_BUYING_DEALS_PATH}` },
        { name: '0% APR Deals', url: `${BASE_URL}${ZERO_PERCENT_APR_DEALS_PATH}` },
      ]
    : [
        { name: 'Home', url: BASE_URL },
        { name: 'Deals', url: `${BASE_URL}/deals` },
        { name: 'Best Buying Deals', url: `${BASE_URL}${BEST_BUYING_DEALS_PATH}` },
      ];

  return (
    <div className="zero-apr-page">
      <SEO
        title={pageTitle}
        description={seoDescription}
        canonical={seoCanonical}
        keywords={['buying deals', '0% APR deals', 'cash back deals', 'low APR financing', `car deals ${month} ${year}`, 'special APR rates', 'new car financing deals']}
        structuredData={[
          createBreadcrumbStructuredData(breadcrumbItems),
          createFAQStructuredData(isZeroPercentOnlyRoute ? ZERO_APR_FAQ : FAQ_DATA),
        ]}
        noIndex={isZeroPercentOnlyRoute ? deals.length === 0 : allDeals.length === 0}
      />

      <div className="zero-apr-page__hero">
        <div className="container">
          <div className="zero-apr-page__hero-content">
            <nav className="zero-apr-page__breadcrumb" aria-label="Breadcrumb">
              <Link to="/">Home</Link>
              <span className="zero-apr-page__breadcrumb-sep">/</span>
              <Link to="/deals">Deals</Link>
              <span className="zero-apr-page__breadcrumb-sep">/</span>
              {bodyStyleName ? (
                <>
                  <Link to={BEST_BUYING_DEALS_PATH}>Best Buying Deals</Link>
                  <span className="zero-apr-page__breadcrumb-sep">/</span>
                  <span>{bodyStyleName} Deals</span>
                </>
              ) : fuelTypeName ? (
                <>
                  <Link to={BEST_BUYING_DEALS_PATH}>Best Buying Deals</Link>
                  <span className="zero-apr-page__breadcrumb-sep">/</span>
                  <span>{fuelTypeName} Deals</span>
                </>
              ) : makeName ? (
                <>
                  <Link to={BEST_BUYING_DEALS_PATH}>Best Buying Deals</Link>
                  <span className="zero-apr-page__breadcrumb-sep">/</span>
                  <span>{makeName} Deals</span>
                </>
              ) : isZeroPercentOnlyRoute ? (
                <>
                  <Link to={BEST_BUYING_DEALS_PATH}>Best Buying Deals</Link>
                  <span className="zero-apr-page__breadcrumb-sep">/</span>
                  <span>0% APR Deals</span>
                </>
              ) : (
                <span>Best Buying Deals</span>
              )}
            </nav>
            <h1 className="zero-apr-page__title">{pageTitleMain}<br />{pageTitleDate}</h1>
            <p className="zero-apr-page__description">
              {isZeroPercentOnlyRoute
                ? 'These manufacturer-backed offers charge no interest on your auto loan, so every payment goes toward paying off the vehicle. Compare terms and C/D ratings to find the right 0% APR deal.'
                : 'Manufacturer-subsidized financing\u2014cash-back deals or low financing rates\u2014is one of the best deals a car shopper can find. These offers can save you thousands over the life of your loan.'}
            </p>
          </div>
        </div>
      </div>

      <div className="zero-apr-page__toolbar">
        <div className="container zero-apr-page__toolbar-inner">
          <div className="active-filter-pills__toolbar-left">
            <span className="active-filter-pills__count">{deals.length} {deals.length === 1 ? 'deal' : 'deals'}</span>
            <div className="active-filter-pills__row" aria-label="Active filters">
              {activeFilterPills.length === 0 && (
                <span className="active-filter-pills__pill active-filter-pills__pill--static">
                  <span className="active-filter-pills__pill-label">Buying Deals</span>
                </span>
              )}
              {activeFilterPills.map(pill => (
                <span key={pill.id} className="active-filter-pills__pill">
                  <span className="active-filter-pills__pill-label">{pill.label}</span>
                  <button type="button" className="active-filter-pills__pill-x" aria-label={`Remove ${pill.label} filter`} onClick={pill.onRemove}>
                    <X size={12} strokeWidth={2.5} aria-hidden />
                  </button>
                </span>
              ))}
              {activeFilterPills.length > 0 && (
                <button type="button" className="active-filter-pills__clear-all" onClick={clearAllFilters}>
                  Clear All
                </button>
              )}
            </div>
          </div>

          <button
            type="button"
            className={`deals-filter-btn ${activeFilterPills.length > 0 ? 'deals-filter-btn--active' : ''}`}
            onClick={() => setFilterOpen(true)}
          >
            <SlidersHorizontal size={16} aria-hidden />
            <span>Filters</span>
            {activeFilterPills.length > 0 && (
              <span className="deals-filter-badge" aria-label={`${activeFilterPills.length} active filters`}>{activeFilterPills.length}</span>
            )}
          </button>
        </div>
      </div>

      <AdBanner imageUrl="https://d2kde5ohu8qb21.cloudfront.net/files/693a37c1e2108b000272edd6/nissan.jpg" altText="Advertisement" minimalDesktop mobileCompact />

      <div className="zero-apr-page__content">
        <div className={`container${deals.length > 0 ? ' zero-apr-page__container--stacked' : ''}`}>
          {deals.length === 0 ? (
            <div className="zero-apr-page__segment">
              <div className="zero-apr-page__main">
                <section className="zero-apr-page__deals-section">
                  <div className="zero-apr-page__grid">
                    <div className="zero-apr-page__empty-state">
                      <p className="zero-apr-page__empty-state-text">
                        {isZeroPercentOnlyRoute
                          ? 'There are currently no active 0% APR offers. Browse all APR and financing deals or check back soon.'
                          : 'There are currently no active APR financing offers. Check back soon or explore other available deals.'}
                      </p>
                      {isZeroPercentOnlyRoute ? (
                        <Link to={BEST_BUYING_DEALS_PATH} className="zero-apr-page__empty-state-link">
                          All APR & financing deals
                        </Link>
                      ) : (
                        <Link to="/deals" className="zero-apr-page__empty-state-link">
                          Browse All Deals
                        </Link>
                      )}
                    </div>
                  </div>
                </section>
              </div>
              <aside className="zero-apr-page__sidebar" aria-label="Advertisement">
                <div className="zero-apr-page__sidebar-sticky">
                  <AdSidebar />
                </div>
              </aside>
            </div>
          ) : (
            <>
              {dealChunks.map((chunk, chunkIndex) => (
                <Fragment key={`apr-segment-${chunkIndex}`}>
                  <div className="zero-apr-page__segment">
                    <div className="zero-apr-page__main">
                      <section className="zero-apr-page__deals-section">
                        <div className="zero-apr-page__grid" role="list">
                          {chunk.map((deal, i) => (
                            <Fragment key={deal.id}>
                              {i > 0 && i % 4 === 0 && <GridAd />}
                              {renderAprDealCard(deal)}
                            </Fragment>
                          ))}
                        </div>
                      </section>
                    </div>
                    <aside className="zero-apr-page__sidebar" aria-label="Advertisement">
                      <div className="zero-apr-page__sidebar-sticky">
                        {chunkIndex === 0 ? <AdSidebar /> : <AdSidebar {...SIDEBAR_AFTER_BREAK_PROPS} />}
                      </div>
                    </aside>
                  </div>
                  {chunkIndex < dealChunks.length - 1 && (
                    <div className="zero-apr-page__full-bleed-breaker" role="complementary" aria-label="Advertisement">
                      <AdBanner imageUrl={DEALS_GRID_BREAKER_AD_URL} altText="Advertisement" />
                    </div>
                  )}
                </Fragment>
              ))}
            </>
          )}

          <div className="zero-apr-page__segment zero-apr-page__segment--tail">
            <div className="zero-apr-page__main">
              <section className="zero-apr-page__faq-section" aria-labelledby="zero-apr-faq-heading">
                <h2 id="zero-apr-faq-heading" className="zero-apr-page__faq-heading">
                  FAQs
                </h2>
                <div className="zero-apr-page__faq-list">
                  {(isZeroPercentOnlyRoute ? ZERO_APR_FAQ : FAQ_DATA).map((faq, index) => (
                    <div key={index} className={`zero-apr-page__faq-item ${expandedFaqIndex === index ? 'zero-apr-page__faq-item--expanded' : ''}`}>
                      <button
                        type="button"
                        className="zero-apr-page__faq-question"
                        onClick={() => setExpandedFaqIndex(expandedFaqIndex === index ? null : index)}
                        aria-expanded={expandedFaqIndex === index}
                      >
                        <span className="zero-apr-page__faq-question-text">{renderFaqQuestionText(faq.question, 'zero-apr-page__faq-question-brand')}</span>
                        {expandedFaqIndex === index ? <ChevronUp size={24} aria-hidden /> : <ChevronDown size={24} aria-hidden />}
                      </button>
                      {expandedFaqIndex === index && (
                        <div className="zero-apr-page__faq-answer">
                          {faq.answer.split('\n\n').map((para, j) => <p key={j}>{para}</p>)}
                          {faq.bullets && faq.bullets.length > 0 && (
                            <>
                              <p><strong>Things to keep in mind:</strong></p>
                              <ul>
                                {faq.bullets.map((b, j) => <li key={j}>{b}</li>)}
                              </ul>
                            </>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>

              <section className="zero-apr-page__links-section">
                <h2 className="zero-apr-page__section-title">Explore More</h2>
                <div className="zero-apr-page__links-grid">
                  <Link to={ZERO_PERCENT_APR_DEALS_PATH} className="zero-apr-page__link-card"><h3>Best 0% APR Deals</h3><p>Interest-free manufacturer financing in one list</p></Link>
                  <Link to="/deals/lease" className="zero-apr-page__link-card"><h3>Best Car Lease Deals</h3><p>Monthly lease specials on new cars</p></Link>
                </div>
              </section>
            </div>
            <aside className="zero-apr-page__sidebar" aria-label="Advertisement">
              <div className="zero-apr-page__sidebar-sticky">
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
        selectedIncentiveId={activeDealObj
          ? findMatchingIncentiveId(
              activeDealObj.vehicle.make,
              activeDealObj.vehicle.model,
              activeDealObj.aprType === 'special-apr' ? 'finance' : activeDealObj.aprType,
              activeDealObj.aprType !== 'cash' ? { apr: `${activeDealObj.apr}%`, term: activeDealObj.term } : undefined,
            )
          : undefined
        }
      />
      <SignInToSaveModal isOpen={showSignInModal} onClose={() => { setShowSignInModal(false); setPendingSaveVehicle(null); }} itemType="vehicle" itemName={pendingSaveVehicle?.name} itemImage={pendingSaveVehicle?.image} />
      <DealsFilterModal isOpen={filterOpen} onClose={() => setFilterOpen(false)} filters={filters} onApply={handleFilterApply} totalResults={deals.length} getResultCount={getResultCount} dealPageType="finance" onDealTypeNavigate={handleDealTypeNavigate} />
    </div>
  );
};

export default ZeroAprDealsPage;
