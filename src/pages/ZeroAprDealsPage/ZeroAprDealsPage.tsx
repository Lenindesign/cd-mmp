import { Fragment, useMemo, useState, useCallback, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ChevronDown, ChevronRight, ChevronUp, Heart, Info, X, SlidersHorizontal } from 'lucide-react';
import { getZeroAprDeals } from '../../services/zeroAprDealsService';
import { getFinanceDeals } from '../../services/cashFinanceDealsService';
import { getCurrentPeriod, formatExpiration } from '../../utils/dateUtils';
import { parseMsrpMin, calcMonthly, parseTermMonths, buildSavingsText, inferCreditTier, creditTierQualifies, getVehicleOffers, offersToIncentives } from '../../utils/dealCalculations';
import { useActiveFilterPills } from '../../hooks/useActiveFilterPills';
import type { VehicleOfferSummary } from '../../utils/dealCalculations';
import { useSupabaseRatings, getCategory } from '../../hooks/useSupabaseRating';
import { useAuth } from '../../contexts/AuthContext';
import { SEO, createBreadcrumbStructuredData, createFAQStructuredData } from '../../components/SEO';
import AdBanner from '../../components/AdBanner';
import AdSidebar from '../../components/AdSidebar';
import SignInToSaveModal from '../../components/SignInToSaveModal';
import IncentivesModal, { getAprRangeLabel } from '../../components/IncentivesModal/IncentivesModal';
import type { IncentiveOfferDetail } from '../../components/IncentivesModal/IncentivesModal';
import { DealsFilterModal } from '../../components/DealsFilterModal';
import type { DealsFilterState } from '../../components/DealsFilterModal';
import SavingsText from '../../components/SavingsText';
import { EDITORS_CHOICE_BADGE_URL, TEN_BEST_BADGE_URL } from '../../constants/badges';
import { BEST_BUYING_DEALS_PATH, ZERO_PERCENT_APR_DEALS_PATH } from '../../constants/dealRoutes';
import './ZeroAprDealsPage.css';

type AprTab = 'all' | 'zero-apr' | 'special-apr';

interface UnifiedAprDeal {
  id: string;
  aprType: 'zero-apr' | 'special-apr';
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
}

const FAQ_DATA = [
  {
    question: 'What does 0% APR financing mean?',
    answer: 'A 0% APR (Annual Percentage Rate) financing offer means you pay no interest on your auto loan. You only pay the principal balance divided equally across your loan term, saving you thousands compared to a standard auto loan. For example, a $35,000 car financed at 0% for 60 months costs $583/month with zero dollars going toward interest.',
  },
  {
    question: 'What are special APR financing deals?',
    answer: 'Special APR deals are below-market interest rates offered through the manufacturer\'s captive finance company. While not 0%, rates like 1.9%, 2.9%, or 3.9% are significantly lower than the national average of ~6.5%. These can save you $1,500–$4,000 in interest over the life of the loan.',
  },
  {
    question: 'Who qualifies for low APR car deals?',
    answer: 'Qualifying for 0% APR typically requires excellent credit—usually a FICO score of 720 or higher. Special APR rates (1.9%–3.9%) may be available with good credit (680+). Lenders also consider your debt-to-income ratio, employment history, and the amount you\'re financing.',
  },
  {
    question: 'Can I combine APR deals with other incentives?',
    answer: 'In most cases, special financing cannot be combined with cash-back rebates. Manufacturers typically require you to choose between low-rate financing and cash incentives. However, some programs like military, first responder, or college graduate discounts can sometimes be stacked. Always ask the dealer about combining offers.',
  },
  {
    question: 'How are Car and Driver ratings determined?',
    answer: 'Car and Driver ratings are based on comprehensive real-world testing by our expert editorial team. Each vehicle is evaluated on driving dynamics, comfort, interior quality, technology, value, and more. Our 10-point scale reflects how a vehicle compares to its direct competitors.',
  },
  {
    question: 'Should I choose 0% APR or a cash rebate?',
    answer: 'It depends on the loan amount, term, and rates. For shorter loan terms or smaller amounts, the cash-back rebate often saves more. For longer terms or larger amounts, a low APR can result in greater overall savings. Calculate the total interest you\'d pay at the standard rate minus the rebate, and compare it to the total interest at the special rate.',
  },
];

const DEFAULT_FILTERS: DealsFilterState = {
  tab: 'best-deals',
  dealType: 'finance',
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

const CAR_AND_DRIVER = 'Car and Driver';

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

function renderFaqQuestionText(question: string) {
  const i = question.indexOf(CAR_AND_DRIVER);
  if (i === -1) {
    return question;
  }
  return (
    <>
      {question.slice(0, i)}
      <em className="zero-apr-page__faq-question-brand">{CAR_AND_DRIVER}</em>
      {question.slice(i + CAR_AND_DRIVER.length)}
    </>
  );
}

const ZeroAprDealsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isZeroPercentOnlyRoute = location.pathname === ZERO_PERCENT_APR_DEALS_PATH;

  const { getRating: getSupabaseRating } = useSupabaseRatings();
  const { user, isAuthenticated, addSavedVehicle, removeSavedVehicle } = useAuth();
  const { month, year } = getCurrentPeriod();

  const [activeTab, setActiveTab] = useState<AprTab>(() => (isZeroPercentOnlyRoute ? 'zero-apr' : 'all'));

  useEffect(() => {
    setActiveTab(isZeroPercentOnlyRoute ? 'zero-apr' : 'all');
  }, [isZeroPercentOnlyRoute]);
  const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(null);
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [pendingSaveVehicle, setPendingSaveVehicle] = useState<{ name: string; slug: string; image?: string } | null>(null);
  const [activeDealId, setActiveDealId] = useState<string | null>(null);
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState<DealsFilterState>(DEFAULT_FILTERS);
  const [offersPopup, setOffersPopup] = useState<{ slug: string; offers: VehicleOfferSummary[] } | null>(null);

  const handleFilterApply = useCallback((applied: DealsFilterState) => {
    const params = new URLSearchParams();
    params.set('filters', JSON.stringify(applied));
    navigate(`/deals/all?${params.toString()}`);
  }, [navigate]);

  const { pills: sharedPills, clearAllFilters: clearSharedFilters } = useActiveFilterPills(filters, setFilters);

  const activeFilterPills = useMemo(() => {
    const extra = activeTab !== 'all'
      ? [{ id: `tab-${activeTab}`, label: activeTab === 'zero-apr' ? '0% APR' : 'Special APR', onRemove: () => setActiveTab('all') }]
      : [];
    return [...extra, ...sharedPills];
  }, [activeTab, sharedPills]);

  const clearAllFilters = useCallback(() => {
    setActiveTab('all');
    clearSharedFilters();
  }, [clearSharedFilters]);

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
      if (f.monthlyPaymentMin > 0 || f.monthlyPaymentMax < 99999) {
        if (d.estimatedMonthly < f.monthlyPaymentMin || d.estimatedMonthly > f.monthlyPaymentMax) return false;
      }
      return true;
    });
  }, []);

  const filteredAll = useMemo(() => applyFiltersToDeals(allDeals, filters), [allDeals, filters, applyFiltersToDeals]);

  const deals = useMemo(() => {
    if (activeTab === 'all') return filteredAll;
    return filteredAll.filter(d => d.aprType === activeTab);
  }, [filteredAll, activeTab]);

  const dealChunks = useMemo(() => chunkArray(deals, GRID_BREAKER_AFTER_CARD_COUNT), [deals]);

  const getResultCount = useCallback((draftFilters: DealsFilterState): number => {
    return applyFiltersToDeals(allDeals, draftFilters).length;
  }, [allDeals, applyFiltersToDeals]);

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
    return (
      <div key={deal.id} className="zero-apr-page__card">
        <div className="zero-apr-page__card-header">
          <Link to={`/${deal.vehicle.slug}`} className="zero-apr-page__card-name-link">
            <h3 className="zero-apr-page__card-name">{deal.vehicleName}</h3>
          </Link>
          <div className="zero-apr-page__card-rating">
            <span className="zero-apr-page__card-rating-value">{deal.rating}</span>
            <span className="zero-apr-page__card-rating-max">/10</span>
            <span className="zero-apr-page__card-rating-label">C/D Rating</span>
          </div>
        </div>

        <Link to={`/${deal.vehicle.slug}`} className="zero-apr-page__card-image-link">
          <div className="zero-apr-page__card-image-container">
            <img src={deal.vehicle.image} alt={deal.vehicleName} className="zero-apr-page__card-image" />
            <span className="zero-apr-page__card-deal-type-tag">Finance</span>
            <button
              type="button"
              className={`zero-apr-page__card-save ${saved ? 'zero-apr-page__card-save--saved' : ''}`}
              onClick={(e) => handleSaveClick(e, { name: deal.vehicleName, slug: deal.vehicle.slug, image: deal.vehicle.image })}
              aria-label={saved ? 'Remove from favorites' : 'Add to favorites'}
            >
              <Heart size={16} fill={saved ? 'currentColor' : 'none'} />
            </button>
            {(() => {
              const allOffers = getVehicleOffers(deal.vehicle.make, deal.vehicle.model);
              if (allOffers.length > 1) {
                return (
                  <button type="button" className="zero-apr-page__card-offers-tag" onClick={(e) => toggleOffersPopup(e, deal.vehicle.make, deal.vehicle.model, deal.vehicle.slug)}>
                    {allOffers.length} Offers Available
                  </button>
                );
              }
              return null;
            })()}
            {offersPopup?.slug === deal.vehicle.slug && (
              <div className="zero-apr-page__card-offers-popup">
                <div className="zero-apr-page__card-offers-popup-header">
                  <strong>{offersPopup.offers.length} Available Offers</strong>
                  <button type="button" className="zero-apr-page__card-offers-popup-close" onClick={(e) => { e.preventDefault(); e.stopPropagation(); setOffersPopup(null); }}>&times;</button>
                </div>
                <ul className="zero-apr-page__card-offers-popup-list">
                  {offersPopup.offers.map((o, idx) => (
                    <li key={idx} className="zero-apr-page__card-offers-popup-item">
                      <span className={`zero-apr-page__card-offers-popup-type zero-apr-page__card-offers-popup-type--${o.type}`}>
                        {o.type === 'zero-apr' ? '0% APR' : o.type === 'cash' ? 'Cash' : o.type === 'finance' ? 'Finance' : 'Lease'}
                      </span>
                      <span className="zero-apr-page__card-offers-popup-label">{o.label}</span>
                      <span className="zero-apr-page__card-offers-popup-exp">expires {formatExpiration(o.expires)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {(deal.vehicle.editorsChoice || deal.vehicle.tenBest) && (
              <div className="zero-apr-page__card-badges">
                {deal.vehicle.tenBest && <img src={TEN_BEST_BADGE_URL} alt="10Best" className="zero-apr-page__card-badge-img" />}
                {deal.vehicle.editorsChoice && <img src={EDITORS_CHOICE_BADGE_URL} alt="Editors' Choice" className="zero-apr-page__card-badge-img" />}
              </div>
            )}
          </div>
        </Link>

        <div className="zero-apr-page__card-body">
          <button type="button" className="zero-apr-page__card-deal-pill" onClick={(e) => { e.preventDefault(); e.stopPropagation(); setActiveDealId(deal.id); }}>
            <span className="zero-apr-page__card-deal-pill-chip">Finance</span>
            <span className="zero-apr-page__card-deal-pill-text">{deal.dealText}</span>
            <span className="zero-apr-page__card-deal-pill-divider" />
            <span className="zero-apr-page__card-deal-pill-expires">expires {formatExpiration(deal.expirationDate)}</span>
          </button>

          <div className="zero-apr-page__card-payment-block">
            <div className="zero-apr-page__card-payment">
              <span className="zero-apr-page__card-payment-amount">{deal.aprDisplay}</span>
              <span className="zero-apr-page__card-payment-period"> APR</span>
            </div>
            <span className="zero-apr-page__card-payment-savings">
              <SavingsText text={deal.savingsVsAvg} />
              <span className="zero-apr-page__card-tooltip-wrap">
                <Info size={13} className="zero-apr-page__card-tooltip-icon" />
                <span className="zero-apr-page__card-tooltip">{deal.savingsTooltip}</span>
              </span>
            </span>
            <span className="zero-apr-page__card-payment-expires">Expires {formatExpiration(deal.expirationDate)}</span>
          </div>

          <div className="zero-apr-page__card-details">
            <div className="zero-apr-page__card-detail">
              <span className="zero-apr-page__card-detail-label">MSRP Range</span>
              <span className="zero-apr-page__card-detail-value">{deal.vehicle.priceRange}</span>
            </div>
            <div className="zero-apr-page__card-detail">
              <span className="zero-apr-page__card-detail-label">Term</span>
              <span className="zero-apr-page__card-detail-value">{deal.term}</span>
            </div>
          </div>

          <button type="button" className="zero-apr-page__card-cta" onClick={() => setActiveDealId(deal.id)}>Get This Deal</button>

          <Link to={`/${deal.vehicle.slug}`} className="zero-apr-page__card-toggle">
            <span>Read More</span>
            <ChevronRight size={14} />
          </Link>
        </div>
      </div>
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
        offerHeadline: activeDealObj.aprType === 'zero-apr'
          ? `0% Interest Financing for ${activeDealObj.term}`
          : `${activeDealObj.aprDisplay} APR Financing for ${activeDealObj.term}`,
        whatItMeans: activeDealObj.aprType === 'zero-apr'
          ? 'You pay absolutely zero interest on your auto loan. Every dollar of your monthly payment goes directly toward the price of the car—not to the bank.'
          : `A below-market ${activeDealObj.aprDisplay} interest rate from the manufacturer that lowers your monthly payment and total cost vs. the average ~6.5% rate.`,
        yourSavings: activeDealObj.aprType === 'zero-apr'
          ? `On a $35,000 loan over ${activeDealObj.term}, you'd save thousands in interest vs. the average 6.5% rate.`
          : `At ${activeDealObj.aprDisplay} instead of 6.5%, you could save $1,500–$3,000 in interest over the loan term.`,
        whoQualifies: activeDealObj.targetAudience,
        eligibleTrims: activeDealObj.trimsEligible,
        dontWaitText: `This offer expires ${formatExpiration(activeDealObj.expirationDate)}. Manufacturer deals change monthly—once it's gone, there's no guarantee it'll come back.`,
        eventLabel: activeDealObj.programName,
        expirationDate: activeDealObj.expirationDate,
      }
    : undefined;

  const pageTitle = activeTab === 'zero-apr'
    ? `Best Financing and Cash-Back Deals for ${month} ${year}`
    : activeTab === 'special-apr'
    ? `Best Special APR Financing Deals for ${month} ${year}`
    : `Best APR & Financing Deals for ${month} ${year}`;
  const BASE_URL = 'https://www.caranddriver.com';

  const seoDescription = isZeroPercentOnlyRoute
    ? `Browse every current 0% APR financing offer for ${month} ${year}. Pay no interest on your auto loan—paired with Car and Driver expert ratings.`
    : `Find the best APR financing deals for ${month} ${year}. Compare 0% APR, low-rate financing, and special APR offers on new cars, SUVs, and trucks. Expert ratings from Car and Driver.`;

  const seoCanonical = `${BASE_URL}${isZeroPercentOnlyRoute ? ZERO_PERCENT_APR_DEALS_PATH : BEST_BUYING_DEALS_PATH}`;

  const breadcrumbItems = isZeroPercentOnlyRoute
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
        keywords={['APR deals', '0% APR deals', 'low APR financing', `car financing ${month} ${year}`, 'special APR rates', 'new car financing deals']}
        structuredData={[
          createBreadcrumbStructuredData(breadcrumbItems),
          createFAQStructuredData(FAQ_DATA),
        ]}
        noIndex={isZeroPercentOnlyRoute ? deals.length === 0 : allDeals.length === 0}
      />

      <div className="zero-apr-page__toolbar">
        <div className="container zero-apr-page__toolbar-inner">
          <div className="active-filter-pills__toolbar-left">
            <span className="active-filter-pills__count">{deals.length} {deals.length === 1 ? 'deal' : 'deals'}</span>

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
            className={`zero-apr-page__filter-btn ${activeFilterPills.length > 0 ? 'zero-apr-page__filter-btn--active' : ''}`}
            onClick={() => setFilterOpen(true)}
          >
            <SlidersHorizontal size={16} aria-hidden />
            <span>Filters</span>
            {activeFilterPills.length > 0 && (
              <span className="zero-apr-page__filter-badge">{activeFilterPills.length}</span>
            )}
          </button>
        </div>
      </div>

      <div className="zero-apr-page__hero">
        <div className="container">
          <div className="zero-apr-page__hero-content">
            <nav className="zero-apr-page__breadcrumb" aria-label="Breadcrumb">
              <Link to="/">Home</Link>
              <span className="zero-apr-page__breadcrumb-sep">/</span>
              <Link to="/deals">Deals</Link>
              <span className="zero-apr-page__breadcrumb-sep">/</span>
              {isZeroPercentOnlyRoute ? (
                <>
                  <Link to={BEST_BUYING_DEALS_PATH}>Best Buying Deals</Link>
                  <span className="zero-apr-page__breadcrumb-sep">/</span>
                  <span>0% APR Deals</span>
                </>
              ) : (
                <span>Best Buying Deals</span>
              )}
            </nav>
            <h1 className="zero-apr-page__title">{pageTitle}</h1>
            <p className="zero-apr-page__description">
              {isZeroPercentOnlyRoute
                ? 'These manufacturer-backed offers charge no interest on your auto loan—every payment goes toward the vehicle. Compare terms and C/D ratings to find the right 0% APR deal.'
                : 'Manufacturer-subsidized financing is one of the best deals a car shopper can find. From 0% APR where every dollar goes toward the vehicle, to special low rates well below the national average—these offers can save you thousands over the life of your loan.'}
            </p>
          </div>
        </div>
      </div>

      <AdBanner imageUrl={DEALS_GRID_BREAKER_AD_URL} altText="Advertisement" />

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
                        <div className="zero-apr-page__grid">{chunk.map((deal) => renderAprDealCard(deal))}</div>
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
                  {FAQ_DATA.map((faq, index) => (
                    <div key={index} className={`zero-apr-page__faq-item ${expandedFaqIndex === index ? 'zero-apr-page__faq-item--expanded' : ''}`}>
                      <button
                        type="button"
                        className="zero-apr-page__faq-question"
                        onClick={() => setExpandedFaqIndex(expandedFaqIndex === index ? null : index)}
                        aria-expanded={expandedFaqIndex === index}
                      >
                        <span className="zero-apr-page__faq-question-text">{renderFaqQuestionText(faq.question)}</span>
                        {expandedFaqIndex === index ? <ChevronUp size={24} aria-hidden /> : <ChevronDown size={24} aria-hidden />}
                      </button>
                      {expandedFaqIndex === index && (
                        <div className="zero-apr-page__faq-answer">
                          <p>{faq.answer}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>

              <section className="zero-apr-page__links-section">
                <h2 className="zero-apr-page__section-title">Explore More</h2>
                <div className="zero-apr-page__links-grid">
                  {isZeroPercentOnlyRoute ? (
                    <Link to={BEST_BUYING_DEALS_PATH} className="zero-apr-page__link-card"><h3>All APR & financing deals</h3><p>0%, special APR, and the full buying-deals hub</p></Link>
                  ) : (
                    <Link to={ZERO_PERCENT_APR_DEALS_PATH} className="zero-apr-page__link-card"><h3>0% APR deals only</h3><p>Interest-free manufacturer financing in one list</p></Link>
                  )}
                  <Link to="/deals" className="zero-apr-page__link-card"><h3>All Deals</h3><p>Browse every current deal and incentive</p></Link>
                  <Link to="/deals/cash-finance" className="zero-apr-page__link-card"><h3>Cash & Finance Deals</h3><p>Cash-back rebates and special APR rates</p></Link>
                  <Link to="/deals/lease" className="zero-apr-page__link-card"><h3>Lease Deals</h3><p>Monthly lease specials on new cars</p></Link>
                  <Link to="/deals/suv" className="zero-apr-page__link-card"><h3>SUV Deals</h3><p>Best deals on SUVs and crossovers</p></Link>
                  <Link to="/deals/truck" className="zero-apr-page__link-card"><h3>Truck Deals</h3><p>Best deals on pickup trucks</p></Link>
                  <Link to="/deals/fuel-type" className="zero-apr-page__link-card"><h3>Fuel Type Deals</h3><p>Deals by powertrain</p></Link>
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
        selectedIncentiveId={undefined}
      />
      <SignInToSaveModal isOpen={showSignInModal} onClose={() => { setShowSignInModal(false); setPendingSaveVehicle(null); }} itemType="vehicle" itemName={pendingSaveVehicle?.name} itemImage={pendingSaveVehicle?.image} />
      <DealsFilterModal isOpen={filterOpen} onClose={() => setFilterOpen(false)} filters={filters} onApply={handleFilterApply} totalResults={deals.length} getResultCount={getResultCount} />
    </div>
  );
};

export default ZeroAprDealsPage;
