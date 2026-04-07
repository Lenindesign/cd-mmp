import { useMemo, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronUp, Heart, Info, Clock, Users, Tag, Percent, SlidersHorizontal } from 'lucide-react';
import { getZeroAprDeals } from '../../services/zeroAprDealsService';
import { getFinanceDeals } from '../../services/cashFinanceDealsService';
import { getCurrentPeriod, formatExpiration } from '../../utils/dateUtils';
import { parseMsrpMin, calcMonthly, parseTermMonths, buildSavingsText, inferCreditTier, creditTierQualifies, getVehicleOffers, offersToIncentives } from '../../utils/dealCalculations';
import type { VehicleOfferSummary } from '../../utils/dealCalculations';
import { useSupabaseRatings, getCategory } from '../../hooks/useSupabaseRating';
import { useAuth } from '../../contexts/AuthContext';
import { SEO, createBreadcrumbStructuredData, createFAQStructuredData } from '../../components/SEO';
import AdSidebar from '../../components/AdSidebar';
import SignInToSaveModal from '../../components/SignInToSaveModal';
import IncentivesModal, { getAprRangeLabel } from '../../components/IncentivesModal/IncentivesModal';
import type { IncentiveOfferDetail } from '../../components/IncentivesModal/IncentivesModal';
import { DealsFilterModal } from '../../components/DealsFilterModal';
import type { DealsFilterState } from '../../components/DealsFilterModal';
import { EDITORS_CHOICE_BADGE_URL, TEN_BEST_BADGE_URL } from '../../constants/badges';
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
    question: 'How are C/D ratings determined?',
    answer: 'Car and Driver ratings are based on comprehensive real-world testing by our expert editorial team. Each vehicle is evaluated on driving dynamics, comfort, interior quality, technology, value, and more. Our 10-point scale reflects how a vehicle compares to its direct competitors.',
  },
  {
    question: 'Should I choose 0% APR or a cash rebate?',
    answer: 'It depends on the loan amount, term, and rates. For shorter loan terms or smaller amounts, the cash-back rebate often saves more. For longer terms or larger amounts, a low APR can result in greater overall savings. Calculate the total interest you\'d pay at the standard rate minus the rebate, and compare it to the total interest at the special rate.',
  },
];

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

const APR_TABS: { key: AprTab; label: string }[] = [
  { key: 'all', label: 'All APR Deals' },
  { key: 'zero-apr', label: '0% APR' },
  { key: 'special-apr', label: 'Special APR' },
];

const ZeroAprDealsPage = () => {
  const { getRating: getSupabaseRating } = useSupabaseRatings();
  const { user, isAuthenticated, addSavedVehicle, removeSavedVehicle } = useAuth();
  const { month, year } = getCurrentPeriod();

  const [activeTab, setActiveTab] = useState<AprTab>('all');
  const [expandedDealId, setExpandedDealId] = useState<string | null>(null);
  const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(null);
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [pendingSaveVehicle, setPendingSaveVehicle] = useState<{ name: string; slug: string; image?: string } | null>(null);
  const [activeDealId, setActiveDealId] = useState<string | null>(null);
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState<DealsFilterState>(DEFAULT_FILTERS);
  const [offersPopup, setOffersPopup] = useState<{ slug: string; offers: VehicleOfferSummary[] } | null>(null);

  const hasActiveFilters = filters.bodyTypes.length > 0 || filters.makes.length > 0 || filters.fuelTypes.length > 0 || filters.accolades.length > 0 || filters.terms.length > 0 || filters.creditTier !== null || filters.monthlyPaymentMin > 0 || filters.monthlyPaymentMax < 99999;
  const activeFilterCount = filters.bodyTypes.length + filters.makes.length + filters.fuelTypes.length + filters.accolades.length + filters.terms.length + (filters.creditTier ? 1 : 0) + (filters.monthlyPaymentMin > 0 ? 1 : 0) + (filters.monthlyPaymentMax < 99999 ? 1 : 0);

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
      results.push({
        id: d.id, aprType: 'special-apr', vehicleName: `${d.vehicle.year} ${d.vehicle.make} ${d.vehicle.model}`, vehicle: d.vehicle,
        apr: aprNum, aprDisplay: d.apr, term: d.term, estimatedMonthly: monthly, savingsVsAvg, savingsTooltip,
        dealText: getAprRangeLabel({ value: `${d.apr} APR`, title: d.programName, terms: d.term }), expirationDate: d.expirationDate,
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

  const tabCounts = useMemo(() => ({
    all: filteredAll.length,
    'zero-apr': filteredAll.filter(d => d.aprType === 'zero-apr').length,
    'special-apr': filteredAll.filter(d => d.aprType === 'special-apr').length,
  }), [filteredAll]);

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
    ? `Best 0% APR Deals for ${month} ${year}`
    : activeTab === 'special-apr'
    ? `Best Special APR Financing Deals for ${month} ${year}`
    : `Best APR & Financing Deals for ${month} ${year}`;
  const BASE_URL = 'https://www.caranddriver.com';

  return (
    <div className="zero-apr-page">
      <SEO
        title={pageTitle}
        description={`Find the best APR financing deals for ${month} ${year}. Compare 0% APR, low-rate financing, and special APR offers on new cars, SUVs, and trucks. Expert ratings from Car and Driver.`}
        canonical={`${BASE_URL}/deals/zero-apr`}
        keywords={['APR deals', '0% APR deals', 'low APR financing', `car financing ${month} ${year}`, 'special APR rates', 'new car financing deals']}
        structuredData={[
          createBreadcrumbStructuredData([
            { name: 'Home', url: BASE_URL },
            { name: 'Deals', url: `${BASE_URL}/deals` },
            { name: 'APR Deals', url: `${BASE_URL}/deals/zero-apr` },
          ]),
          createFAQStructuredData(FAQ_DATA),
        ]}
        noIndex={allDeals.length === 0}
      />

      <div className="zero-apr-page__hero">
        <div className="container">
          <div className="zero-apr-page__hero-content">
            <div className="zero-apr-page__hero-badge">
              <span className="zero-apr-page__hero-badge-text">0%</span>
              <span>APR Deals</span>
            </div>
            <nav className="zero-apr-page__breadcrumb" aria-label="Breadcrumb">
              <Link to="/">Home</Link>
              <span className="zero-apr-page__breadcrumb-sep">/</span>
              <Link to="/deals">Deals</Link>
              <span className="zero-apr-page__breadcrumb-sep">/</span>
              <span>APR Deals</span>
            </nav>
            <h1 className="zero-apr-page__title">{pageTitle}</h1>
            <p className="zero-apr-page__description">
              Manufacturer-subsidized financing is one of the best deals a car shopper can find. From 0% APR
              where every dollar goes toward the vehicle, to special low rates well below the national average—these
              offers can save you thousands over the life of your loan.
            </p>
          </div>
        </div>
      </div>

      <div className="zero-apr-page__toolbar">
        <div className="container zero-apr-page__toolbar-inner">
          <span className="zero-apr-page__toolbar-count">{deals.length} deals available</span>
          <button
            type="button"
            className={`zero-apr-page__filter-btn ${hasActiveFilters ? 'zero-apr-page__filter-btn--active' : ''}`}
            onClick={() => setFilterOpen(true)}
          >
            <SlidersHorizontal size={16} />
            <span>Filters</span>
            {activeFilterCount > 0 && (
              <span className="zero-apr-page__filter-badge">{activeFilterCount}</span>
            )}
          </button>
        </div>
      </div>

      <div className="zero-apr-page__content">
        <div className="container">
          <div className="zero-apr-page__layout">
            <div className="zero-apr-page__main">

              {/* APR Tabs */}
              <div className="zero-apr-page__apr-tabs" role="tablist">
                {APR_TABS.map(t => (
                  <button
                    key={t.key}
                    type="button"
                    role="tab"
                    aria-selected={activeTab === t.key}
                    className={`zero-apr-page__apr-tab ${activeTab === t.key ? 'zero-apr-page__apr-tab--active' : ''} ${tabCounts[t.key] === 0 ? 'zero-apr-page__apr-tab--empty' : ''}`}
                    onClick={() => setActiveTab(t.key)}
                  >
                    <Percent size={14} />
                    <span>{t.label}</span>
                    <span className="zero-apr-page__apr-tab-count">{tabCounts[t.key]}</span>
                  </button>
                ))}
              </div>

              <section className="zero-apr-page__deals-section">
                <h2 className="zero-apr-page__section-title">
                  <Tag size={22} />
                  {deals.length} Available Deal{deals.length !== 1 ? 's' : ''}
                </h2>
                <div className="zero-apr-page__grid">
                  {deals.map((deal) => {
                    const saved = isVehicleSaved(deal.vehicleName);
                    const isExpanded = expandedDealId === deal.id;

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
                            <span className={`zero-apr-page__card-apr-badge ${deal.aprType === 'zero-apr' ? 'zero-apr-page__card-apr-badge--zero' : ''}`}>
                              {deal.aprDisplay} APR
                            </span>
                            <button
                              className={`zero-apr-page__card-save ${saved ? 'zero-apr-page__card-save--saved' : ''}`}
                              onClick={(e) => handleSaveClick(e, { name: deal.vehicleName, slug: deal.vehicle.slug, image: deal.vehicle.image })}
                              aria-label={saved ? 'Remove from favorites' : 'Add to favorites'}
                            >
                              <Heart size={16} fill={saved ? 'currentColor' : 'none'} />
                            </button>
                            {(() => {
                              const allOffers = getVehicleOffers(deal.vehicle.make, deal.vehicle.model);
                              if (allOffers.length > 1) return (
                                <button type="button" className="zero-apr-page__card-offers-tag" onClick={(e) => toggleOffersPopup(e, deal.vehicle.make, deal.vehicle.model, deal.vehicle.slug)}>
                                  {allOffers.length} Offers Available
                                </button>
                              );
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
                          <div className="zero-apr-page__card-payment-block">
                            <div className="zero-apr-page__card-payment">
                              <span className="zero-apr-page__card-payment-amount">${deal.estimatedMonthly}</span>
                              <span className="zero-apr-page__card-payment-period">/mo*</span>
                            </div>
                            <span className="zero-apr-page__card-payment-savings">
                              {deal.savingsVsAvg}
                              <span className="zero-apr-page__card-tooltip-wrap">
                                <Info size={13} className="zero-apr-page__card-tooltip-icon" />
                                <span className="zero-apr-page__card-tooltip">{deal.savingsTooltip}</span>
                              </span>
                            </span>
                          </div>

                          <button className="zero-apr-page__card-deal-pill" onClick={(e) => { e.preventDefault(); e.stopPropagation(); setActiveDealId(deal.id); }}>
                            <span className="zero-apr-page__card-deal-pill-chip">Finance</span>
                            <span className="zero-apr-page__card-deal-pill-text">{deal.dealText}</span>
                            <span className="zero-apr-page__card-deal-pill-divider" />
                            <span className="zero-apr-page__card-deal-pill-expires">expires {formatExpiration(deal.expirationDate)}</span>
                          </button>

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

                          <button className="zero-apr-page__card-toggle" onClick={() => setExpandedDealId(isExpanded ? null : deal.id)} aria-expanded={isExpanded}>
                            <span>Additional Details</span>
                            {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                          </button>

                          {isExpanded && (
                            <div className="zero-apr-page__card-additional">
                              <div className="zero-apr-page__card-additional-item"><Info size={16} /><div><strong>{deal.programName}</strong><p>{deal.programDescription}</p></div></div>
                              <div className="zero-apr-page__card-additional-item"><Users size={16} /><div><strong>Target Audience</strong><p>{deal.targetAudience}</p></div></div>
                              <div className="zero-apr-page__card-additional-item"><Tag size={16} /><div><strong>Eligible Trims</strong><p>{deal.trimsEligible.join(', ')}</p></div></div>
                              <div className="zero-apr-page__card-additional-item"><Clock size={16} /><div><strong>Offer Expires</strong><p>{formatExpiration(deal.expirationDate)}</p></div></div>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
                {deals.length === 0 && (
                  <div className="zero-apr-page__empty-state">
                    <p className="zero-apr-page__empty-state-text">
                      There are currently no active APR financing offers. Check back soon or explore other available deals.
                    </p>
                    <Link to="/deals" className="zero-apr-page__empty-state-link">
                      Browse All Deals
                    </Link>
                  </div>
                )}
              </section>

              <section className="zero-apr-page__faq-section">
                <h2 className="zero-apr-page__section-title"><Info size={22} /> Frequently Asked Questions About APR Deals</h2>
                <div className="zero-apr-page__faq-list">
                  {FAQ_DATA.map((faq, index) => (
                    <div key={index} className={`zero-apr-page__faq-item ${expandedFaqIndex === index ? 'zero-apr-page__faq-item--expanded' : ''}`}>
                      <button className="zero-apr-page__faq-question" onClick={() => setExpandedFaqIndex(expandedFaqIndex === index ? null : index)} aria-expanded={expandedFaqIndex === index}>
                        <span>{faq.question}</span>{expandedFaqIndex === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                      </button>
                      {expandedFaqIndex === index && <div className="zero-apr-page__faq-answer"><p>{faq.answer}</p></div>}
                    </div>
                  ))}
                </div>
              </section>

              <section className="zero-apr-page__links-section">
                <h2 className="zero-apr-page__section-title">Explore More</h2>
                <div className="zero-apr-page__links-grid">
                  <Link to="/deals" className="zero-apr-page__link-card"><h3>All Deals</h3><p>Browse every current deal and incentive</p></Link>
                  <Link to="/deals/cash-finance" className="zero-apr-page__link-card"><h3>Cash & Finance Deals</h3><p>Cash-back rebates and special APR rates</p></Link>
                  <Link to="/deals/lease" className="zero-apr-page__link-card"><h3>Lease Deals</h3><p>Monthly lease specials on new cars</p></Link>
                  <Link to="/deals/suv" className="zero-apr-page__link-card"><h3>SUV Deals</h3><p>Best deals on SUVs and crossovers</p></Link>
                  <Link to="/deals/truck" className="zero-apr-page__link-card"><h3>Truck Deals</h3><p>Best deals on pickup trucks</p></Link>
                  <Link to="/deals/fuel-type" className="zero-apr-page__link-card"><h3>Fuel Type Deals</h3><p>Deals by powertrain</p></Link>
                </div>
              </section>
            </div>

            <aside className="zero-apr-page__sidebar"><AdSidebar /></aside>
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
      <DealsFilterModal isOpen={filterOpen} onClose={() => setFilterOpen(false)} filters={filters} onApply={setFilters} totalResults={deals.length} getResultCount={getResultCount} />
    </div>
  );
};

export default ZeroAprDealsPage;
