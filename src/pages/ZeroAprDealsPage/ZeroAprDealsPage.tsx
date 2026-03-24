import { useMemo, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronUp, Bookmark, Info, Clock, Users, Tag, Percent, SlidersHorizontal } from 'lucide-react';
import { getZeroAprDeals } from '../../services/zeroAprDealsService';
import { getCurrentPeriod } from '../../utils/dateUtils';
import { parseMsrpMin, calcMonthly, parseTermMonths, buildSavingsText, inferCreditTier, creditTierQualifies, getVehicleOffers, offersToIncentives } from '../../utils/dealCalculations';
import type { VehicleOfferSummary } from '../../utils/dealCalculations';
import { useSupabaseRatings, getCategory } from '../../hooks/useSupabaseRating';
import { useAuth } from '../../contexts/AuthContext';
import { SEO, createBreadcrumbStructuredData } from '../../components/SEO';
import AdSidebar from '../../components/AdSidebar';
import SignInToSaveModal from '../../components/SignInToSaveModal';
import IncentivesModal from '../../components/IncentivesModal/IncentivesModal';
import type { IncentiveOfferDetail } from '../../components/IncentivesModal/IncentivesModal';
import { DealsFilterModal } from '../../components/DealsFilterModal';
import type { DealsFilterState } from '../../components/DealsFilterModal';
import { EDITORS_CHOICE_BADGE_URL, TEN_BEST_BADGE_URL } from '../../constants/badges';
import './ZeroAprDealsPage.css';

const FAQ_DATA = [
  {
    question: 'What does 0% APR financing mean?',
    answer: 'A 0% APR (Annual Percentage Rate) financing offer means you pay no interest on your auto loan. You only pay the principal balance divided equally across your loan term, saving you thousands compared to a standard auto loan. For example, a $35,000 car financed at 0% for 60 months costs $583/month with zero dollars going toward interest.',
  },
  {
    question: 'Who qualifies for 0% APR car deals?',
    answer: 'Qualifying for 0% APR typically requires excellent credit—usually a FICO score of 720 or higher. Lenders also consider your debt-to-income ratio, employment history, and the amount you\'re financing. These offers are provided through the manufacturer\'s captive finance company (e.g., GM Financial, Toyota Financial Services), not third-party banks.',
  },
  {
    question: 'Can I combine 0% APR with other incentives?',
    answer: 'In most cases, 0% APR financing cannot be combined with cash-back rebates or other promotional offers. Manufacturers typically require you to choose between low-rate financing and cash incentives. However, some special programs like military, first responder, or college graduate discounts can sometimes be stacked. Always ask the dealer about combining offers.',
  },
  {
    question: 'How are C/D ratings determined?',
    answer: 'Car and Driver ratings are based on comprehensive real-world testing by our expert editorial team. Each vehicle is evaluated on driving dynamics, comfort, interior quality, technology, value, and more. Our 10-point scale reflects how a vehicle compares to its direct competitors, ensuring you get an objective assessment backed by decades of automotive expertise.',
  },
  {
    question: 'Are these deals available at all dealers?',
    answer: 'Most 0% APR offers are national programs available at any authorized franchised dealer for that brand. However, availability may vary by region, and specific inventory at your local dealer determines which trims you can finance at 0%. Contact your nearest dealer to confirm current availability and eligible inventory.',
  },
  {
    question: 'What happens if my credit score isn\'t high enough for 0% APR?',
    answer: 'If you don\'t qualify for 0% APR, manufacturers often have tiered rates—for example, 1.9% or 2.9% APR for buyers with good (but not excellent) credit. You might also consider a larger down payment to improve your approval odds, or explore cash-back offers that don\'t depend on credit tier as heavily.',
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

const ZeroAprDealsPage = () => {
  const { getRating: getSupabaseRating } = useSupabaseRatings();
  const { user, isAuthenticated, addSavedVehicle, removeSavedVehicle } = useAuth();
  const { month, year } = getCurrentPeriod();

  const [expandedDealId, setExpandedDealId] = useState<string | null>(null);
  const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(null);
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [pendingSaveVehicle, setPendingSaveVehicle] = useState<{ name: string; slug: string; image?: string } | null>(null);
  const [activeDeal, setActiveDeal] = useState<string | null>(null);
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState<DealsFilterState>(DEFAULT_FILTERS);
  const [offersPopup, setOffersPopup] = useState<{ slug: string; offers: VehicleOfferSummary[] } | null>(null);

  const hasActiveFilters = filters.bodyTypes.length > 0 || filters.makes.length > 0 || filters.fuelTypes.length > 0 || filters.accolades.length > 0 || filters.terms.length > 0 || filters.creditTier !== null;
  const activeFilterCount = filters.bodyTypes.length + filters.makes.length + filters.fuelTypes.length + filters.accolades.length + filters.terms.length + (filters.creditTier ? 1 : 0);

  const matchesFilters = useCallback((
    vehicle: { bodyStyle: string; make: string; fuelType: string; editorsChoice?: boolean; tenBest?: boolean; evOfTheYear?: boolean },
    deal?: { term?: string; targetAudience?: string },
  ) => {
    if (filters.bodyTypes.length > 0 && !filters.bodyTypes.includes(vehicle.bodyStyle)) return false;
    if (filters.makes.length > 0 && !filters.makes.includes(vehicle.make)) return false;
    if (filters.fuelTypes.length > 0 && !filters.fuelTypes.includes(vehicle.fuelType)) return false;
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

  const deals = useMemo(() => {
    const rawDeals = getZeroAprDeals();
    return rawDeals
      .filter(deal => matchesFilters(deal.vehicle, { term: deal.term, targetAudience: deal.targetAudience }))
      .map((deal) => ({
        ...deal,
        rating: getSupabaseRating(
          deal.vehicle.id,
          getCategory(deal.vehicle.bodyStyle),
          deal.vehicle.staffRating
        ),
      }));
  }, [getSupabaseRating, matchesFilters]);

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

  const toggleFaq = (index: number) => {
    setExpandedFaqIndex((prev) => (prev === index ? null : index));
  };

  const activeDealData = activeDeal ? deals.find(d => d.id === activeDeal) : null;
  const activeOffer: Partial<IncentiveOfferDetail> | undefined = activeDealData
    ? {
        year: parseInt(activeDealData.vehicle.year, 10),
        make: activeDealData.vehicle.make,
        model: activeDealData.vehicle.model,
        slug: activeDealData.vehicle.slug,
        imageUrl: activeDealData.vehicle.image,
        msrpMin: parseInt(activeDealData.vehicle.priceRange.replace(/[^0-9,\-–]/g, '').split(/[-–]/)[0]?.replace(/,/g, '') || '0', 10),
        msrpMax: parseInt(activeDealData.vehicle.priceRange.replace(/[^0-9,\-–]/g, '').split(/[-–]/)[1]?.replace(/,/g, '') || '0', 10),
        offerHeadline: `0% Interest Financing for ${activeDealData.term}`,
        whatItMeans: 'You pay absolutely zero interest on your auto loan. Every dollar of your monthly payment goes directly toward the price of the car—not to the bank.',
        yourSavings: `On a $35,000 loan over ${activeDealData.term}, you'd save thousands in interest vs. the average 6.5% rate.`,
        whoQualifies: activeDealData.targetAudience,
        eligibleTrims: activeDealData.trimsEligible,
        dontWaitText: `This offer expires ${activeDealData.expirationDate}. Manufacturer deals change monthly—once it's gone, there's no guarantee it'll come back.`,
        eventLabel: activeDealData.programName,
        expirationDate: activeDealData.expirationDate,
      }
    : undefined;

  const pageTitle = `Best Interest Free & 0% APR Deals for ${month} ${year}`;
  const BASE_URL = 'https://www.caranddriver.com';

  return (
    <div className="zero-apr-page">
      <SEO
        title={`${pageTitle} | Car and Driver`}
        description={`Find the best 0% APR and interest-free car deals for ${month} ${year}. Compare zero-interest financing offers on new cars, SUVs, and trucks. Expert ratings and reviews from Car and Driver.`}
        canonical={`${BASE_URL}/deals/zero-apr`}
        keywords={['0% APR deals', 'zero interest car deals', `0% APR ${month} ${year}`, 'interest free financing', 'new car financing deals']}
        structuredData={createBreadcrumbStructuredData([
          { name: 'Home', url: BASE_URL },
          { name: 'Deals', url: `${BASE_URL}/deals` },
          { name: '0% APR Deals', url: `${BASE_URL}/deals/zero-apr` },
        ])}
      />

      {/* Hero Section */}
      <div className="zero-apr-page__hero">
        <div className="container">
          <div className="zero-apr-page__hero-content">
            <div className="zero-apr-page__hero-badge">
              <span className="zero-apr-page__hero-badge-text">0% APR</span>
              <span>Finance Deals</span>
            </div>
            <h1 className="zero-apr-page__title">{pageTitle}</h1>
            <p className="zero-apr-page__description">
              Zero percent financing is one of the best deals a car shopper can find. With 0% APR,
              every dollar of your monthly payment goes toward the vehicle—none is wasted on interest.
              These offers typically require excellent credit (FICO 720+) and are available through the
              manufacturer's finance arm for a limited time.
            </p>
            <div className="zero-apr-page__hero-stats">
              <div className="zero-apr-page__hero-stat">
                <span className="zero-apr-page__hero-stat-value">{deals.length}</span>
                <span className="zero-apr-page__hero-stat-label">Active Deals</span>
              </div>
              <div className="zero-apr-page__hero-stat">
                <span className="zero-apr-page__hero-stat-value">0%</span>
                <span className="zero-apr-page__hero-stat-label">Interest Rate</span>
              </div>
              <div className="zero-apr-page__hero-stat">
                <span className="zero-apr-page__hero-stat-value">{month}</span>
                <span className="zero-apr-page__hero-stat-label">{year} Deals</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter toolbar */}
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

      {/* Main Content */}
      <div className="zero-apr-page__content">
        <div className="container">
          <div className="zero-apr-page__layout">
            <div className="zero-apr-page__main">

              {/* Deals Grid */}
              <section className="zero-apr-page__deals-section">
                <h2 className="zero-apr-page__section-title">
                  <Tag size={22} />
                  {deals.length} Available Deals
                </h2>
                <div className="zero-apr-page__grid">
                  {deals.map((deal) => {
                    const vehicleName = `${deal.vehicle.year} ${deal.vehicle.make} ${deal.vehicle.model}`;
                    const saved = isVehicleSaved(vehicleName);
                    const isExpanded = expandedDealId === deal.id;

                    return (
                      <div key={deal.id} className="zero-apr-page__card">
                        <div className="zero-apr-page__card-header">
                          <Link to={`/${deal.vehicle.slug}`} className="zero-apr-page__card-name-link">
                            <h3 className="zero-apr-page__card-name">{vehicleName}</h3>
                          </Link>
                          <div className="zero-apr-page__card-rating">
                            <span className="zero-apr-page__card-rating-value">{deal.rating}</span>
                            <span className="zero-apr-page__card-rating-max">/10</span>
                            <span className="zero-apr-page__card-rating-label">C/D Rating</span>
                          </div>
                        </div>

                        <Link to={`/${deal.vehicle.slug}`} className="zero-apr-page__card-image-link">
                          <div className="zero-apr-page__card-image-container">
                            <img src={deal.vehicle.image} alt={vehicleName} className="zero-apr-page__card-image" />
                            <button
                              className={`zero-apr-page__card-save ${saved ? 'zero-apr-page__card-save--saved' : ''}`}
                              onClick={(e) => handleSaveClick(e, { name: vehicleName, slug: deal.vehicle.slug, image: deal.vehicle.image })}
                              aria-label={saved ? 'Remove from saved' : 'Save vehicle'}
                            >
                              <Bookmark size={16} fill={saved ? 'currentColor' : 'none'} />
                            </button>
                            {(() => {
                              const allOffers = getVehicleOffers(deal.vehicle.make, deal.vehicle.model);
                              if (allOffers.length > 1) return (
                                <button
                                  type="button"
                                  className="zero-apr-page__card-offers-tag"
                                  onClick={(e) => toggleOffersPopup(e, deal.vehicle.make, deal.vehicle.model, deal.vehicle.slug)}
                                >
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
                                      <span className="zero-apr-page__card-offers-popup-exp">exp {o.expires}</span>
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
                          {(() => {
                            const msrp = parseMsrpMin(deal.vehicle.priceRange);
                            const months = parseTermMonths(deal.term);
                            const monthly = calcMonthly(msrp, 0, months);
                            const { savingsVsAvg, savingsTooltip } = buildSavingsText(monthly, deal.vehicle.bodyStyle);
                            return (
                              <div className="zero-apr-page__card-payment-block">
                                <div className="zero-apr-page__card-payment">
                                  <span className="zero-apr-page__card-payment-amount">${monthly}</span>
                                  <span className="zero-apr-page__card-payment-period">/mo*</span>
                                </div>
                                <span className="zero-apr-page__card-payment-savings">
                                  {savingsVsAvg}
                                  <span className="zero-apr-page__card-tooltip-wrap">
                                    <Info size={13} className="zero-apr-page__card-tooltip-icon" />
                                    <span className="zero-apr-page__card-tooltip">{savingsTooltip}</span>
                                  </span>
                                </span>
                              </div>
                            );
                          })()}

                          <button className="zero-apr-page__card-deal-pill" onClick={(e) => { e.preventDefault(); e.stopPropagation(); setActiveDeal(deal.id); }}>
                            <div className="zero-apr-page__card-deal-pill-icon"><Percent size={12} /></div>
                            <span className="zero-apr-page__card-deal-pill-text">0% APR for {deal.term}</span>
                            <span className="zero-apr-page__card-deal-pill-divider" />
                            <span className="zero-apr-page__card-deal-pill-expires">expires {deal.expirationDate}</span>
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

                          <button type="button" className="zero-apr-page__card-cta" onClick={() => setActiveDeal(deal.id)}>Get This Deal</button>

                          <button className="zero-apr-page__card-toggle" onClick={() => toggleDealDetails(deal.id)} aria-expanded={isExpanded}>
                            <span>Additional Details</span>
                            {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                          </button>

                          {isExpanded && (
                            <div className="zero-apr-page__card-additional">
                              <div className="zero-apr-page__card-additional-item">
                                <Info size={16} />
                                <div>
                                  <strong>{deal.programName}</strong>
                                  <p>{deal.programDescription}</p>
                                </div>
                              </div>
                              <div className="zero-apr-page__card-additional-item">
                                <Users size={16} />
                                <div>
                                  <strong>Target Audience</strong>
                                  <p>{deal.targetAudience}</p>
                                </div>
                              </div>
                              <div className="zero-apr-page__card-additional-item">
                                <Tag size={16} />
                                <div>
                                  <strong>Eligible Trims</strong>
                                  <p>{deal.trimsEligible.join(', ')}</p>
                                </div>
                              </div>
                              <div className="zero-apr-page__card-additional-item">
                                <Clock size={16} />
                                <div>
                                  <strong>Offer Expires</strong>
                                  <p>{deal.expirationDate}</p>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
                {deals.length === 0 && (
                  <div className="zero-apr-page__empty">
                    <h3>No 0% APR deals available</h3>
                    <p>Check back soon for new zero-interest financing offers.</p>
                    <Link to="/deals" className="zero-apr-page__card-cta" style={{ display: 'inline-block', width: 'auto' }}>Browse All Deals</Link>
                  </div>
                )}
              </section>

              {/* FAQ Section */}
              <section className="zero-apr-page__faq-section">
                <h2 className="zero-apr-page__section-title">
                  <Info size={22} />
                  Frequently Asked Questions About 0% APR Deals
                </h2>
                <div className="zero-apr-page__faq-list">
                  {FAQ_DATA.map((faq, index) => (
                    <div
                      key={index}
                      className={`zero-apr-page__faq-item ${expandedFaqIndex === index ? 'zero-apr-page__faq-item--expanded' : ''}`}
                    >
                      <button
                        className="zero-apr-page__faq-question"
                        onClick={() => toggleFaq(index)}
                        aria-expanded={expandedFaqIndex === index}
                      >
                        <span>{faq.question}</span>
                        {expandedFaqIndex === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
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

              {/* Internal Linking Module */}
              <section className="zero-apr-page__links-section">
                <h2 className="zero-apr-page__section-title">Explore More</h2>
                <div className="zero-apr-page__links-grid">
                  <Link to="/deals" className="zero-apr-page__link-card">
                    <h3>All Deals</h3>
                    <p>Browse every current deal and incentive</p>
                  </Link>
                  <Link to="/deals/cash-finance" className="zero-apr-page__link-card">
                    <h3>Cash & Finance Deals</h3>
                    <p>Cash-back rebates and special APR rates</p>
                  </Link>
                  <Link to="/deals/lease" className="zero-apr-page__link-card">
                    <h3>Lease Deals</h3>
                    <p>Monthly lease specials on new cars</p>
                  </Link>
                  <Link to="/deals/suv" className="zero-apr-page__link-card">
                    <h3>SUV Deals</h3>
                    <p>Best deals on SUVs and crossovers</p>
                  </Link>
                  <Link to="/deals/truck" className="zero-apr-page__link-card">
                    <h3>Truck Deals</h3>
                    <p>Best deals on pickup trucks</p>
                  </Link>
                  <Link to="/rankings" className="zero-apr-page__link-card">
                    <h3>Car Rankings</h3>
                    <p>Expert rankings across every category</p>
                  </Link>
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <aside className="zero-apr-page__sidebar">
              <AdSidebar />
            </aside>
          </div>
        </div>
      </div>

      <IncentivesModal
        isOpen={!!activeDeal}
        onClose={() => setActiveDeal(null)}
        variant="conversion-b"
        offer={activeOffer}
        allIncentives={activeDealData ? offersToIncentives(activeDealData.vehicle.make, activeDealData.vehicle.model) : undefined}
        selectedIncentiveId={undefined}
      />
      {/* Sign In Modal */}
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
        onApply={setFilters}
        totalResults={deals.length}
      />
    </div>
  );
};

export default ZeroAprDealsPage;
