import { Fragment, useCallback, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronDown, ChevronUp, CarFront, Truck, Car, SlidersHorizontal, X } from 'lucide-react';
import { getFinanceDeals, getCashDeals } from '../../services/cashFinanceDealsService';
import { useSupabaseRatings, getCategory } from '../../hooks/useSupabaseRating';
import { useAuth } from '../../contexts/AuthContext';
import { SEO, createBreadcrumbStructuredData, createFAQStructuredData } from '../../components/SEO';
import AdSidebar from '../../components/AdSidebar';
import AdBanner from '../../components/AdBanner';
import { GridAd } from '../../components/GridAd';
import SignInToSaveModal from '../../components/SignInToSaveModal';
import { DealCard } from '../../components/DealCard';
import { getCurrentPeriod, formatExpiration } from '../../utils/dateUtils';
import { parseMsrpMin, calcMonthly, parseTermMonths, buildSavingsText, getVehicleOffers, offersToIncentives, findMatchingIncentiveId, inferCreditTier, creditTierQualifies, sortDeals } from '../../utils/dealCalculations';
import type { VehicleOfferSummary } from '../../utils/dealCalculations';
import IncentivesModal, { getAprRangeLabel } from '../../components/IncentivesModal/IncentivesModal';
import type { IncentiveOfferDetail } from '../../components/IncentivesModal/IncentivesModal';
import { DealsFilterModal } from '../../components/DealsFilterModal';
import type { DealsFilterState, DealTypeOption } from '../../components/DealsFilterModal';
import { useActiveFilterPills } from '../../hooks/useActiveFilterPills';
import Tabs from '../../components/Tabs/Tabs';
import { useFilterOpen } from '../../hooks/useFilterOpen';
import {
  GRID_BREAKER_AFTER_CARD_COUNT,
  DEALS_GRID_BREAKER_AD_URL,
  SIDEBAR_AFTER_BREAK_PROPS,
} from '../../constants/dealsLayout';
import { chunkArray } from '../../utils/chunkArray';
import './CashFinanceBodyStylePage.css';

type BodyTab = 'all' | 'suv' | 'sedan' | 'truck' | 'coupe' | 'hatchback';

interface UnifiedDeal {
  id: string;
  dealType: 'cash' | 'finance';
  bodyStyle: string;
  vehicleName: string;
  vehicle: { id: string; year: string; make: string; model: string; image: string; slug: string; bodyStyle: string; fuelType: string; priceRange: string; staffRating: number; editorsChoice?: boolean; tenBest?: boolean; evOfTheYear?: boolean };
  estimatedMonthly: number;
  aprDisplay?: string;
  savingsVsAvg: string;
  savingsTooltip: string;
  dealText: string;
  dealPillIcon: 'dollar' | 'percent';
  details: { label: string; value: string }[];
  expirationDate: string;
  programName: string;
  programDescription: string;
  additionalInfo: { icon: string; label: string; value: string }[];
  rating: number;
  incentiveValue?: string;
  percentOffMsrp?: string;
}

const BODY_TABS: { key: BodyTab; label: string; icon: React.ReactNode; match: (bs: string) => boolean }[] = [
  { key: 'all', label: 'All', icon: <Car size={16} />, match: () => true },
  { key: 'suv', label: 'SUV', icon: <CarFront size={16} />, match: (bs) => bs.toLowerCase() === 'suv' },
  { key: 'sedan', label: 'Sedan', icon: <Car size={16} />, match: (bs) => bs.toLowerCase() === 'sedan' },
  { key: 'truck', label: 'Truck', icon: <Truck size={16} />, match: (bs) => bs.toLowerCase() === 'truck' },
  { key: 'coupe', label: 'Coupe', icon: <Car size={16} />, match: (bs) => bs.toLowerCase() === 'coupe' },
  { key: 'hatchback', label: 'Hatchback', icon: <Car size={16} />, match: (bs) => bs.toLowerCase() === 'hatchback' },
];

const FAQ_DATA = [
  { question: 'What types of finance deals are available by body style?', answer: 'Manufacturers offer special APR and financing terms across all body styles, including SUVs, sedans, trucks, coupes, and hatchbacks. Rates and terms vary by model and often by trim level.' },
  { question: 'Do SUVs get better finance offers than sedans?', answer: 'It depends on market demand and manufacturer strategy. Popular models may have less aggressive APR promotions, while slower-selling vehicles sometimes get stronger financing incentives regardless of body style.' },
  { question: 'Can I stack other discounts with a finance offer?', answer: 'Some manufacturers allow loyalty, conquest, or military incentives alongside a promotional APR. Terms vary by brand, so ask the dealer which programs you qualify for and how they affect your payment.' },
  { question: 'How often do these deals change?', answer: 'Manufacturer incentives typically rotate monthly. We update this page as new deals become available, so check back at the start of each month for the latest offers.' },
  { question: 'Are truck finance deals different from car deals?', answer: 'Promotional APRs and terms follow similar patterns, but loan amounts and monthly payments often differ because trucks can carry higher MSRPs. Compare the rate, term, and payment on the specific vehicle you are considering.' },
];

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

const CashFinanceBodyStylePage = () => {
  const { month: CURRENT_MONTH, year: CURRENT_YEAR } = getCurrentPeriod();
  const { getRating: getSupabaseRating } = useSupabaseRatings();
  const { user, isAuthenticated, addSavedVehicle, removeSavedVehicle } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<BodyTab>('all');
  const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(null);
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [pendingSaveVehicle, setPendingSaveVehicle] = useState<{ name: string; slug: string; image?: string } | null>(null);
  const [activeDealId, setActiveDealId] = useState<string | null>(null);
  const [offersPopup, setOffersPopup] = useState<{ slug: string; offers: VehicleOfferSummary[] } | null>(null);
  const [filterOpen, setFilterOpen] = useFilterOpen();
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

  const handleDealTypeNavigate = useCallback((dealType: DealTypeOption, carriedFilters: DealsFilterState) => {
    if (dealType === 'lease' || dealType === 'all') {
      navigate('/deals/lease', { state: { filters: carriedFilters } });
    }
  }, [navigate]);

  const getResultCount = useCallback((draftFilters: DealsFilterState): number => {
    return [...getFinanceDeals(), ...getCashDeals()].filter(deal => {
      const v = deal.vehicle;
      if (draftFilters.bodyTypes.length > 0 && !draftFilters.bodyTypes.includes(v.bodyStyle)) return false;
      if (draftFilters.makes.length > 0 && !draftFilters.makes.includes(v.make)) return false;
      if (draftFilters.fuelTypes.length > 0 && !draftFilters.fuelTypes.includes(v.fuelType)) return false;
      return true;
    }).length;
  }, []);

  const allDeals = useMemo((): UnifiedDeal[] => {
    const results: UnifiedDeal[] = [];

    for (const d of getFinanceDeals()) {
      const msrp = parseMsrpMin(d.vehicle.priceRange);
      const aprNum = parseFloat(d.apr.replace('%', ''));
      const months = parseTermMonths(d.term);
      const monthly = calcMonthly(msrp, aprNum, months);
      const { savingsVsAvg, savingsTooltip } = buildSavingsText(monthly, d.vehicle.bodyStyle);
      const rangeLabel = getAprRangeLabel({ value: `${d.apr} APR`, title: d.programName, terms: d.term });
      results.push({
        id: d.id, dealType: 'finance', bodyStyle: d.vehicle.bodyStyle, vehicleName: `${d.vehicle.year} ${d.vehicle.make} ${d.vehicle.model}`, vehicle: d.vehicle,
        estimatedMonthly: monthly, aprDisplay: rangeLabel.replace(/\s*APR$/, ''), savingsVsAvg, savingsTooltip,
        dealText: rangeLabel, dealPillIcon: 'percent',
        details: [{ label: 'MSRP Range', value: d.vehicle.priceRange }, { label: 'Term', value: d.term }, { label: 'Body Style', value: d.vehicle.bodyStyle }],
        expirationDate: d.expirationDate, programName: d.programName, programDescription: d.programDescription,
        additionalInfo: [{ icon: 'users', label: 'Target Audience', value: d.targetAudience }, { icon: 'tag', label: 'Eligible Trims', value: d.trimsEligible.join(', ') }],
        rating: getSupabaseRating(d.vehicle.id, getCategory(d.vehicle.bodyStyle), d.vehicle.staffRating),
      });
    }
    for (const d of getCashDeals()) {
      const msrp = parseMsrpMin(d.vehicle.priceRange);
      const principal = Math.max(msrp - d.incentiveAmount, 1);
      const monthlyAfterCash = calcMonthly(principal, 6.5, 60);
      const { savingsTooltip } = buildSavingsText(monthlyAfterCash, d.vehicle.bodyStyle, 'cash');
      results.push({
        id: d.id, dealType: 'cash', bodyStyle: d.vehicle.bodyStyle, vehicleName: `${d.vehicle.year} ${d.vehicle.make} ${d.vehicle.model}`, vehicle: d.vehicle,
        estimatedMonthly: d.incentiveAmount, savingsVsAvg: `${d.percentOffMsrp} off MSRP`, savingsTooltip,
        dealText: `${d.incentiveValue} cash back`, dealPillIcon: 'dollar',
        details: [{ label: 'MSRP Range', value: d.vehicle.priceRange }, { label: 'Est. off MSRP', value: d.percentOffMsrp }, { label: 'Body Style', value: d.vehicle.bodyStyle }],
        expirationDate: d.expirationDate, programName: d.programName, programDescription: d.programDescription,
        additionalInfo: [{ icon: 'tag', label: 'Eligible Trims', value: d.trimsEligible.join(', ') }],
        rating: getSupabaseRating(d.vehicle.id, getCategory(d.vehicle.bodyStyle), d.vehicle.staffRating),
        incentiveValue: d.incentiveValue, percentOffMsrp: d.percentOffMsrp,
      });
    }
    return results;
  }, [getSupabaseRating]);

  const tabMatcher = BODY_TABS.find(t => t.key === activeTab)?.match || (() => true);
  const deals = useMemo(() => allDeals.filter(d => tabMatcher(d.bodyStyle)), [allDeals, activeTab]);

  const displayDeals = useMemo(() => {
    let result = deals;
    if (filters.monthlyPaymentMin > 0) result = result.filter(d => d.estimatedMonthly >= filters.monthlyPaymentMin);
    if (filters.monthlyPaymentMax < 1500) result = result.filter(d => d.estimatedMonthly <= filters.monthlyPaymentMax);
    const filtered = result.filter(d => {
      const term = d.details.find(x => x.label === 'Term')?.value;
      const targetAudience = d.additionalInfo.find(x => x.label === 'Target Audience')?.value;
      return matchesFilters(d.vehicle, { term, targetAudience });
    });
    return sortDeals(filtered, filters.sortBy);
  }, [deals, filters.monthlyPaymentMin, filters.monthlyPaymentMax, filters.sortBy, matchesFilters]);

  const dealChunks = useMemo(
    () => chunkArray(displayDeals, GRID_BREAKER_AFTER_CARD_COUNT),
    [displayDeals],
  );

  const tabCounts = useMemo(() => {
    const counts: Record<BodyTab, number> = { all: allDeals.length, suv: 0, sedan: 0, truck: 0, coupe: 0, hatchback: 0 };
    for (const d of allDeals) {
      for (const t of BODY_TABS) {
        if (t.key !== 'all' && t.match(d.bodyStyle)) counts[t.key]++;
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
          whatItMeans: 'A below-market interest rate from the manufacturer that lowers your monthly payment and total cost.',
          yourSavings: `Check the deal details for specific savings on the ${v.make} ${v.model}.`,
          whoQualifies: activeDealObj.additionalInfo.find(i => i.label === 'Target Audience')?.value || 'All buyers qualify with approved credit.',
        };
      })()
    : undefined;

  const renderDealCard = (deal: UnifiedDeal) => {
    const saved = isVehicleSaved(deal.vehicleName);
    const isCash = deal.dealType === 'cash';
    const dealTypeTag = isCash ? 'Cash' : 'Buy';
    const offers = getVehicleOffers(deal.vehicle.make, deal.vehicle.model);
    const payment = {
      amount: isCash ? (deal.incentiveValue ?? '') : (deal.aprDisplay ?? ''),
      period: isCash ? 'Cash Back' : ' APR',
      savings: { type: 'savings-text' as const, text: deal.savingsVsAvg },
      savingsTooltip: deal.savingsTooltip,
      expirationDate: deal.expirationDate,
    };
    const pill = {
      chipLabel: dealTypeTag,
      text: deal.dealText,
      expirationDate: deal.expirationDate,
    };
    const details = deal.details.map((d) => ({ label: d.label, value: d.value }));

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
        imageBadge={deal.bodyStyle}
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

  const emptyBodyCategory =
    activeTab === 'all' ? 'body style' : BODY_TABS.find(t => t.key === activeTab)?.label.toLowerCase() || 'body style';
  const pageTitle = `Buying Deals by Body Style – ${CURRENT_MONTH} ${CURRENT_YEAR}`;
  const BASE_URL = 'https://www.caranddriver.com';

  return (
    <div className="cfbs-deals">
      <SEO
        title={pageTitle}
        description={`Browse manufacturer finance deals by body style for ${CURRENT_MONTH} ${CURRENT_YEAR}. Filter by SUV, sedan, truck, coupe, and more. Expert ratings from Car and Driver.`}
        canonical={`${BASE_URL}/deals/cash-finance-body-style`}
        keywords={['finance deals by body style', 'finance deals SUV', 'sedan finance deals', 'truck finance deals', `car deals ${CURRENT_MONTH} ${CURRENT_YEAR}`]}
        structuredData={[
          createBreadcrumbStructuredData([{ name: 'Home', url: BASE_URL }, { name: 'Deals', url: `${BASE_URL}/deals` }, { name: 'Buying Deals by Body Style', url: `${BASE_URL}/deals/cash-finance-body-style` }]),
          createFAQStructuredData(FAQ_DATA),
        ]}
        noIndex={allDeals.length === 0}
      />

      <div className="cfbs-deals__hero">
        <div className="container">
          <div className="cfbs-deals__hero-content">
            <div className="cfbs-deals__hero-badge">
              <span className="hero-pill__label">Buying Deals by Body Style</span>
            </div>
            <nav className="cfbs-deals__breadcrumb" aria-label="Breadcrumb">
              <Link to="/">Home</Link>
              <span className="cfbs-deals__breadcrumb-sep">/</span>
              <Link to="/deals">Deals</Link>
              <span className="cfbs-deals__breadcrumb-sep">/</span>
              <span>Buy by Body Style</span>
            </nav>
            <h1 className="cfbs-deals__title">{pageTitle}</h1>
            <p className="cfbs-deals__description">
              Special finance rates organized by body style. Whether you're shopping for an SUV, sedan, truck, or coupe, find the best manufacturer incentives paired with Car and Driver expert ratings.
            </p>
          </div>
        </div>
      </div>

      <div className="cfbs-deals__toolbar">
        <div className="container cfbs-deals__toolbar-inner">
          <div className="active-filter-pills__toolbar-left">
            <span className="active-filter-pills__count">{displayDeals.length} {displayDeals.length === 1 ? 'deal' : 'deals'}</span>
            <div className="active-filter-pills__row" aria-label="Active filters">
              <span className="active-filter-pills__pill">
                <span className="active-filter-pills__pill-label">Body Style</span>
                <button type="button" className="active-filter-pills__pill-x" aria-label="Remove Body Style filter" onClick={() => navigate('/deals/all')}>
                  <X size={12} strokeWidth={2.5} aria-hidden />
                </button>
              </span>
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
              <span className="deals-filter-badge">{activeFilterPills.length}</span>
            )}
          </button>
        </div>
      </div>

      <AdBanner imageUrl="https://d2kde5ohu8qb21.cloudfront.net/files/693a37c1e2108b000272edd6/nissan.jpg" altText="Advertisement" minimalDesktop />

      <div className="cfbs-deals__content">
        <div className={`container${displayDeals.length > 0 ? ' cfbs-deals__container--stacked' : ''}`}>
          <div className="cfbs-deals__tabs-wrap">
            <Tabs
              items={BODY_TABS.map(t => ({
                value: t.key,
                label: t.label,
                icon: t.icon,
                count: tabCounts[t.key],
                disabled: tabCounts[t.key] === 0 && t.key !== 'all',
              }))}
              value={activeTab}
              onChange={setActiveTab}
              variant="pills"
              ariaLabel="Body style"
            />
          </div>

          {displayDeals.length === 0 ? (
            <div className="cfbs-deals__segment">
              <div className="cfbs-deals__main">
                <section className="cfbs-deals__section">
                  <div className="cfbs-deals__grid">
                    <div className="cfbs-deals__empty-state">
                      <p className="cfbs-deals__empty-state-text">
                        There are currently no active {emptyBodyCategory} offers. Check back soon or explore other available deals.
                      </p>
                      <Link to="/deals" className="cfbs-deals__empty-state-link">
                        Browse All Deals
                      </Link>
                    </div>
                  </div>
                </section>
              </div>
              <aside className="cfbs-deals__sidebar" aria-label="Advertisement">
                <div className="cfbs-deals__sidebar-sticky">
                  <AdSidebar />
                </div>
              </aside>
            </div>
          ) : (
            <>
              {dealChunks.map((chunk, chunkIndex) => (
                <Fragment key={`cfbs-segment-${chunkIndex}`}>
                  <div className="cfbs-deals__segment">
                    <div className="cfbs-deals__main">
                      <section className="cfbs-deals__section">
                        <div className="cfbs-deals__grid">
                          {chunk.map((deal, i) => (
                            <Fragment key={deal.id}>
                              {i > 0 && i % 4 === 0 && <GridAd />}
                              {renderDealCard(deal)}
                            </Fragment>
                          ))}
                        </div>
                      </section>
                    </div>
                    <aside className="cfbs-deals__sidebar" aria-label="Advertisement">
                      <div className="cfbs-deals__sidebar-sticky">
                        {chunkIndex === 0 ? <AdSidebar /> : <AdSidebar {...SIDEBAR_AFTER_BREAK_PROPS} />}
                      </div>
                    </aside>
                  </div>
                  {chunkIndex < dealChunks.length - 1 && (
                    <div className="cfbs-deals__full-bleed-breaker" role="complementary" aria-label="Advertisement">
                      <AdBanner imageUrl={DEALS_GRID_BREAKER_AD_URL} altText="Advertisement" />
                    </div>
                  )}
                </Fragment>
              ))}
            </>
          )}

          <div className="cfbs-deals__segment cfbs-deals__segment--tail">
            <div className="cfbs-deals__main">
              <section className="cfbs-deals__faq-section">
                <h2 className="cfbs-deals__section-title">Frequently Asked Questions</h2>
                <div className="cfbs-deals__faq-list">
                  {FAQ_DATA.map((faq, i) => (
                    <div key={i} className={`cfbs-deals__faq-item ${expandedFaqIndex === i ? 'cfbs-deals__faq-item--expanded' : ''}`}>
                      <button type="button" className="cfbs-deals__faq-question" onClick={() => setExpandedFaqIndex(expandedFaqIndex === i ? null : i)} aria-expanded={expandedFaqIndex === i}>
                        <span>{faq.question}</span>{expandedFaqIndex === i ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                      </button>
                      {expandedFaqIndex === i && <div className="cfbs-deals__faq-answer"><p>{faq.answer}</p></div>}
                    </div>
                  ))}
                </div>
              </section>

              <section className="cfbs-deals__links-section">
                <h2 className="cfbs-deals__section-title">Explore More</h2>
                <div className="cfbs-deals__links-grid">
                  <Link to="/deals" className="cfbs-deals__link-card"><h3>All Deals</h3><p>Browse every current deal</p></Link>
                  <Link to="/deals/best-buying-deals" className="cfbs-deals__link-card"><h3>Buying Deals</h3><p>0% APR, cash back, and special financing</p></Link>
                  <Link to="/deals/lease" className="cfbs-deals__link-card"><h3>Lease Deals</h3><p>Monthly lease specials</p></Link>
                  <Link to="/deals/fuel-type" className="cfbs-deals__link-card"><h3>Fuel Type Deals</h3><p>Deals by powertrain</p></Link>
                  <Link to="/deals/suv" className="cfbs-deals__link-card"><h3>SUV Deals</h3><p>Best deals on SUVs</p></Link>
                </div>
              </section>
            </div>
            <aside className="cfbs-deals__sidebar" aria-label="Advertisement">
              <div className="cfbs-deals__sidebar-sticky">
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
        selectedIncentiveId={(() => {
          if (!activeDealObj) return undefined;
          if (activeDealObj.dealType === 'cash') {
            return findMatchingIncentiveId(activeDealObj.vehicle.make, activeDealObj.vehicle.model, 'cash');
          }
          const origDeal = getFinanceDeals().find(d => d.id === activeDealObj.id);
          if (origDeal) {
            return findMatchingIncentiveId(activeDealObj.vehicle.make, activeDealObj.vehicle.model, 'finance', { apr: origDeal.apr, term: origDeal.term });
          }
          return undefined;
        })()}
      />
      <SignInToSaveModal isOpen={showSignInModal} onClose={() => { setShowSignInModal(false); setPendingSaveVehicle(null); }} itemType="vehicle" itemName={pendingSaveVehicle?.name} itemImage={pendingSaveVehicle?.image} />
      <DealsFilterModal
        isOpen={filterOpen}
        onClose={() => setFilterOpen(false)}
        filters={filters}
        onApply={handleFilterApply}
        getResultCount={getResultCount}
        totalResults={displayDeals.length}
        dealPageType="finance"
        onDealTypeNavigate={handleDealTypeNavigate}
      />
    </div>
  );
};

export default CashFinanceBodyStylePage;
