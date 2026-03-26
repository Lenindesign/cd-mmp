import { useMemo, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronUp, Bookmark, Info, Tag, Users, Clock, Percent, SlidersHorizontal } from 'lucide-react';
import { getFinanceDeals } from '../../services/cashFinanceDealsService';
import { getCurrentPeriod } from '../../utils/dateUtils';
import { parseMsrpMin, calcMonthly, parseTermMonths, buildSavingsText, inferCreditTier, creditTierQualifies, getVehicleOffers, offersToIncentives } from '../../utils/dealCalculations';
import type { VehicleOfferSummary } from '../../utils/dealCalculations';
import { useSupabaseRatings, getCategory } from '../../hooks/useSupabaseRating';
import { useAuth } from '../../contexts/AuthContext';
import { SEO, createBreadcrumbStructuredData, createFAQStructuredData } from '../../components/SEO';
import AdSidebar from '../../components/AdSidebar';
import SignInToSaveModal from '../../components/SignInToSaveModal';
import { EDITORS_CHOICE_BADGE_URL, TEN_BEST_BADGE_URL } from '../../constants/badges';
import IncentivesModal from '../../components/IncentivesModal/IncentivesModal';
import type { IncentiveOfferDetail } from '../../components/IncentivesModal/IncentivesModal';
import { DealsFilterModal } from '../../components/DealsFilterModal';
import type { DealsFilterState } from '../../components/DealsFilterModal';
import './CashFinanceDealsPage.css';

const FAQ_DATA = [
  {
    question: 'How do special finance rates work?',
    answer: 'Special finance rates are below-market APR (Annual Percentage Rate) offers provided through the manufacturer\'s captive finance company—like GM Financial, Toyota Financial Services, or Ford Credit. These rates are subsidized by the manufacturer, meaning you pay less interest over the life of your loan compared to a typical bank or credit union loan.',
  },
  {
    question: 'How does Car and Driver rate these vehicles?',
    answer: 'Our ratings are based on comprehensive real-world testing by our expert editorial team. Each vehicle is evaluated on driving dynamics, comfort, interior quality, technology, value, and more. Our 10-point scale reflects how a vehicle compares to its direct competitors. Vehicles earning 10Best or Editor\'s Choice awards represent the absolute best in their category—a distinction that can give you confidence in your purchase.',
  },
  {
    question: 'Do these deals apply to all trims and configurations?',
    answer: 'Not always. Most incentives apply to specific trims or configurations, which we list under "Additional Details" for each deal. Higher trims (like luxury or performance variants) may have different offers or no incentive at all. Additionally, inventory at your local dealer determines what\'s available to purchase with these incentives. Contact your dealer to confirm eligible stock.',
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

const CashFinanceDealsPage = () => {
  const { getRating: getSupabaseRating } = useSupabaseRatings();
  const { user, isAuthenticated, addSavedVehicle, removeSavedVehicle } = useAuth();
  const { month, year } = getCurrentPeriod();

  const [expandedDealId, setExpandedDealId] = useState<string | null>(null);
  const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(null);
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [pendingSaveVehicle, setPendingSaveVehicle] = useState<{ name: string; slug: string; image?: string } | null>(null);
  const [activeDealId, setActiveDealId] = useState<string | null>(null);
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

  const financeDeals = useMemo(() => {
    return getFinanceDeals()
      .filter(deal => matchesFilters(deal.vehicle, { term: deal.term, targetAudience: deal.targetAudience }))
      .map((deal) => ({
        ...deal,
        rating: getSupabaseRating(deal.vehicle.id, getCategory(deal.vehicle.bodyStyle), deal.vehicle.staffRating),
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

  const allDeals = financeDeals.map(d => ({ ...d, type: 'finance' as const }));
  const activeDealObj = activeDealId ? allDeals.find(d => d.id === activeDealId) : null;
  const activeOffer: Partial<IncentiveOfferDetail> | undefined = activeDealObj
    ? (() => {
        const v = activeDealObj.vehicle;
        const priceParts = v.priceRange.replace(/[^0-9,\-–]/g, '').split(/[-–]/);
        const headline = `${activeDealObj.apr} APR Financing for ${activeDealObj.term}`;
        return {
          year: parseInt(v.year, 10), make: v.make, model: v.model, slug: v.slug, imageUrl: v.image,
          msrpMin: parseInt(priceParts[0]?.replace(/,/g, '') || '0', 10),
          msrpMax: parseInt(priceParts[1]?.replace(/,/g, '') || '0', 10),
          offerHeadline: headline,
          whatItMeans: `A below-market interest rate from the manufacturer that lowers your monthly payment and total cost.`,
          yourSavings: `Could save you $1,500–$3,000 in interest over the loan term.`,
          whoQualifies: activeDealObj.targetAudience,
          eligibleTrims: activeDealObj.trimsEligible,
          dontWaitText: `This offer expires ${activeDealObj.expirationDate}. Manufacturer deals change monthly—once it's gone, there's no guarantee it'll come back.`,
          eventLabel: activeDealObj.programName,
          expirationDate: activeDealObj.expirationDate,
        };
      })()
    : undefined;

  const pageTitle = `Best Finance Deals for ${month} ${year}`;
  const BASE_URL = 'https://www.caranddriver.com';

  return (
    <div className="cf-deals-page">
      <SEO
        title={`${pageTitle}: Find the Best Car Deals Right Now`}
        description={`Find the best new car finance deals and special financing offers for ${month} ${year}. Expert ratings and reviews from Car and Driver help you get the best value.`}
        canonical={`${BASE_URL}/deals/cash-finance`}
        keywords={['finance deals', `car deals ${month} ${year}`, 'new car incentives', 'special financing', 'low APR car deals']}
        structuredData={[
          createBreadcrumbStructuredData([
            { name: 'Home', url: BASE_URL },
            { name: 'Deals', url: `${BASE_URL}/deals` },
            { name: 'Finance Deals', url: `${BASE_URL}/deals/cash-finance` },
          ]),
          createFAQStructuredData(FAQ_DATA),
        ]}
        noIndex={financeDeals.length === 0}
      />

      {/* Hero Section */}
      <div className="cf-deals-page__hero">
        <div className="container">
          <div className="cf-deals-page__hero-content">
            <div className="cf-deals-page__hero-badge">
              <Percent size={16} />
              <span>Finance Deals</span>
            </div>
            <nav className="cf-deals-page__breadcrumb" aria-label="Breadcrumb">
              <Link to="/">Home</Link>
              <span className="cf-deals-page__breadcrumb-sep">/</span>
              <Link to="/deals">Deals</Link>
              <span className="cf-deals-page__breadcrumb-sep">/</span>
              <span>Finance Deals</span>
            </nav>
            <h1 className="cf-deals-page__title">{pageTitle}</h1>
            <p className="cf-deals-page__description">
              Manufacturers offer special finance rates to move inventory—and those savings go directly to you.
              We've combined the best current offers with Car and Driver's expert ratings so you can find not just
              a good price, but a great car at a great price.
            </p>
            <div className="cf-deals-page__hero-stats">
              <div className="cf-deals-page__hero-stat">
                <span className="cf-deals-page__hero-stat-value">{financeDeals.length}</span>
                <span className="cf-deals-page__hero-stat-label">Finance Deals</span>
              </div>
              <div className="cf-deals-page__hero-stat">
                <span className="cf-deals-page__hero-stat-value">{month}</span>
                <span className="cf-deals-page__hero-stat-label">{year} Deals</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter toolbar */}
      <div className="cf-deals-page__toolbar">
        <div className="container cf-deals-page__toolbar-inner">
          <span className="cf-deals-page__toolbar-count">{financeDeals.length} deals available</span>
          <button
            type="button"
            className={`cf-deals-page__toolbar-filter-btn ${hasActiveFilters ? 'cf-deals-page__toolbar-filter-btn--active' : ''}`}
            onClick={() => setFilterOpen(true)}
          >
            <SlidersHorizontal size={16} />
            <span>Filters</span>
            {activeFilterCount > 0 && (
              <span className="cf-deals-page__toolbar-filter-badge">{activeFilterCount}</span>
            )}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="cf-deals-page__content">
        <div className="container">
          <div className="cf-deals-page__layout">
            <div className="cf-deals-page__main">

              {/* Finance Deals Section */}
              <section className="cf-deals-page__section">
                  <h2 className="cf-deals-page__section-title">
                    <Percent size={22} />
                    Finance Deals
                  </h2>
                  <div className="cf-deals-page__grid">
                    {financeDeals.map((deal) => {
                      const vehicleName = `${deal.vehicle.year} ${deal.vehicle.make} ${deal.vehicle.model}`;
                      const saved = isVehicleSaved(vehicleName);
                      const isExpanded = expandedDealId === deal.id;

                      return (
                        <div key={deal.id} className="cf-deals-page__card">
                          <div className="cf-deals-page__card-header">
                            <Link to={`/${deal.vehicle.slug}`} className="cf-deals-page__card-name-link">
                              <h3 className="cf-deals-page__card-name">{vehicleName}</h3>
                            </Link>
                            <div className="cf-deals-page__card-rating">
                              <span className="cf-deals-page__card-rating-value">{deal.rating}</span>
                              <span className="cf-deals-page__card-rating-max">/10</span>
                              <span className="cf-deals-page__card-rating-label">C/D Rating</span>
                            </div>
                          </div>

                          <Link to={`/${deal.vehicle.slug}`} className="cf-deals-page__card-image-link">
                            <div className="cf-deals-page__card-image-container">
                              <img src={deal.vehicle.image} alt={vehicleName} className="cf-deals-page__card-image" />
                              <button
                                className={`cf-deals-page__card-save ${saved ? 'cf-deals-page__card-save--saved' : ''}`}
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
                                    className="cf-deals-page__card-offers-tag"
                                    onClick={(e) => toggleOffersPopup(e, deal.vehicle.make, deal.vehicle.model, deal.vehicle.slug)}
                                  >
                                    {allOffers.length} Offers Available
                                  </button>
                                );
                                return null;
                              })()}
                              {offersPopup?.slug === deal.vehicle.slug && (
                                <div className="cf-deals-page__card-offers-popup">
                                  <div className="cf-deals-page__card-offers-popup-header">
                                    <strong>{offersPopup.offers.length} Available Offers</strong>
                                    <button type="button" className="cf-deals-page__card-offers-popup-close" onClick={(e) => { e.preventDefault(); e.stopPropagation(); setOffersPopup(null); }}>&times;</button>
                                  </div>
                                  <ul className="cf-deals-page__card-offers-popup-list">
                                    {offersPopup.offers.map((o, idx) => (
                                      <li key={idx} className="cf-deals-page__card-offers-popup-item">
                                        <span className={`cf-deals-page__card-offers-popup-type cf-deals-page__card-offers-popup-type--${o.type}`}>
                                          {o.type === 'zero-apr' ? '0% APR' : o.type === 'cash' ? 'Cash' : o.type === 'finance' ? 'Finance' : 'Lease'}
                                        </span>
                                        <span className="cf-deals-page__card-offers-popup-label">{o.label}</span>
                                        <span className="cf-deals-page__card-offers-popup-exp">exp {o.expires}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                              {(deal.vehicle.editorsChoice || deal.vehicle.tenBest) && (
                                <div className="cf-deals-page__card-badges">
                                  {deal.vehicle.tenBest && <img src={TEN_BEST_BADGE_URL} alt="10Best" className="cf-deals-page__card-badge-img" />}
                                  {deal.vehicle.editorsChoice && <img src={EDITORS_CHOICE_BADGE_URL} alt="Editors' Choice" className="cf-deals-page__card-badge-img" />}
                                </div>
                              )}
                            </div>
                          </Link>

                          <div className="cf-deals-page__card-body">
                            {(() => {
                              const msrp = parseMsrpMin(deal.vehicle.priceRange);
                              const aprNum = parseFloat(deal.apr.replace('%', ''));
                              const months = parseTermMonths(deal.term);
                              const monthly = calcMonthly(msrp, aprNum, months);
                              const { savingsVsAvg, savingsTooltip } = buildSavingsText(monthly, deal.vehicle.bodyStyle);
                              return (
                                <div className="cf-deals-page__card-payment-block">
                                  <div className="cf-deals-page__card-payment">
                                    <span className="cf-deals-page__card-payment-amount">${monthly}</span>
                                    <span className="cf-deals-page__card-payment-period">/mo*</span>
                                  </div>
                                  <span className="cf-deals-page__card-payment-savings">
                                    {savingsVsAvg}
                                    <span className="cf-deals-page__card-tooltip-wrap">
                                      <Info size={13} className="cf-deals-page__card-tooltip-icon" />
                                      <span className="cf-deals-page__card-tooltip">{savingsTooltip}</span>
                                    </span>
                                  </span>
                                </div>
                              );
                            })()}

                            <button className="cf-deals-page__card-deal-pill" onClick={(e) => { e.preventDefault(); e.stopPropagation(); setActiveDealId(deal.id); }}>
                              <span className="cf-deals-page__card-deal-pill-chip">Buy</span>
                              <span className="cf-deals-page__card-deal-pill-text">{deal.apr} APR for {deal.term}</span>
                              <span className="cf-deals-page__card-deal-pill-divider" />
                              <span className="cf-deals-page__card-deal-pill-expires">expires {deal.expirationDate}</span>
                            </button>

                            <div className="cf-deals-page__card-details">
                              <div className="cf-deals-page__card-detail">
                                <span className="cf-deals-page__card-detail-label">MSRP Range</span>
                                <span className="cf-deals-page__card-detail-value">{deal.vehicle.priceRange}</span>
                              </div>
                              <div className="cf-deals-page__card-detail">
                                <span className="cf-deals-page__card-detail-label">Term</span>
                                <span className="cf-deals-page__card-detail-value">{deal.term}</span>
                              </div>
                            </div>

                            <button type="button" className="cf-deals-page__card-cta" onClick={() => setActiveDealId(deal.id)}>Get This Deal</button>

                            <button className="cf-deals-page__card-toggle" onClick={() => toggleDealDetails(deal.id)} aria-expanded={isExpanded}>
                              <span>Additional Details</span>
                              {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                            </button>

                            {isExpanded && (
                              <div className="cf-deals-page__card-additional">
                                <div className="cf-deals-page__card-additional-item">
                                  <Info size={16} />
                                  <div>
                                    <strong>{deal.programName}</strong>
                                    <p>{deal.programDescription}</p>
                                  </div>
                                </div>
                                <div className="cf-deals-page__card-additional-item">
                                  <Users size={16} />
                                  <div>
                                    <strong>Target Audience</strong>
                                    <p>{deal.targetAudience}</p>
                                  </div>
                                </div>
                                <div className="cf-deals-page__card-additional-item">
                                  <Tag size={16} />
                                  <div>
                                    <strong>Eligible Trims</strong>
                                    <p>{deal.trimsEligible.join(', ')}</p>
                                  </div>
                                </div>
                                <div className="cf-deals-page__card-additional-item">
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
                  {financeDeals.length === 0 && (
                    <div className="cf-deals-page__empty-state">
                      <p className="cf-deals-page__empty-state-text">
                        There are currently no active finance offers. Check back soon or explore other available deals.
                      </p>
                      <Link to="/deals" className="cf-deals-page__empty-state-link">
                        Browse All Deals
                      </Link>
                    </div>
                  )}
                </section>

              {/* FAQ Section */}
              <section className="cf-deals-page__faq-section">
                <h2 className="cf-deals-page__section-title">
                  <Info size={22} />
                  Frequently Asked Questions About Car Deals
                </h2>
                <div className="cf-deals-page__faq-list">
                  {FAQ_DATA.map((faq, index) => (
                    <div
                      key={index}
                      className={`cf-deals-page__faq-item ${expandedFaqIndex === index ? 'cf-deals-page__faq-item--expanded' : ''}`}
                    >
                      <button
                        className="cf-deals-page__faq-question"
                        onClick={() => toggleFaq(index)}
                        aria-expanded={expandedFaqIndex === index}
                      >
                        <span>{faq.question}</span>
                        {expandedFaqIndex === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                      </button>
                      {expandedFaqIndex === index && (
                        <div className="cf-deals-page__faq-answer">
                          <p>{faq.answer}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>

              {/* Internal Linking Module */}
              <section className="cf-deals-page__links-section">
                <h2 className="cf-deals-page__section-title">Explore More Deals & Resources</h2>
                <div className="cf-deals-page__links-grid">
                  <Link to="/deals" className="cf-deals-page__link-card">
                    <h3>All Deals</h3>
                    <p>Browse every current deal and incentive</p>
                  </Link>
                  <Link to="/deals/zero-apr" className="cf-deals-page__link-card">
                    <h3>0% APR Deals</h3>
                    <p>Find vehicles with zero-interest financing offers</p>
                  </Link>
                  <Link to="/deals/lease" className="cf-deals-page__link-card">
                    <h3>Lease Deals</h3>
                    <p>Monthly lease specials on new cars</p>
                  </Link>
                  <Link to="/deals/suv" className="cf-deals-page__link-card">
                    <h3>SUV Deals</h3>
                    <p>Best deals on SUVs and crossovers</p>
                  </Link>
                  <Link to="/deals/truck" className="cf-deals-page__link-card">
                    <h3>Truck Deals</h3>
                    <p>Best deals on pickup trucks</p>
                  </Link>
                  <Link to="/rankings" className="cf-deals-page__link-card">
                    <h3>Car Rankings</h3>
                    <p>Expert rankings across every category</p>
                  </Link>
                </div>
              </section>
            </div>

            <aside className="cf-deals-page__sidebar">
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
        allIncentives={activeDealObj ? offersToIncentives(activeDealObj.vehicle.make, activeDealObj.vehicle.model) : undefined}
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
        onApply={setFilters}
        totalResults={financeDeals.length}
      />
    </div>
  );
};

export default CashFinanceDealsPage;
