import { useMemo, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronUp, Heart, Info, Tag, Clock, Car, SlidersHorizontal } from 'lucide-react';
import { getLeaseDeals } from '../../services/leaseDealsService';
import { getCurrentPeriod } from '../../utils/dateUtils';
import { buildSavingsText, parseTermMonths, inferCreditTier, creditTierQualifies, getVehicleOffers, offersToIncentives } from '../../utils/dealCalculations';
import type { VehicleOfferSummary } from '../../utils/dealCalculations';
import { EDITORS_CHOICE_BADGE_URL, TEN_BEST_BADGE_URL } from '../../constants/badges';
import { useSupabaseRatings, getCategory } from '../../hooks/useSupabaseRating';
import { useAuth } from '../../contexts/AuthContext';
import { SEO, createBreadcrumbStructuredData, createFAQStructuredData } from '../../components/SEO';
import AdSidebar from '../../components/AdSidebar';
import SignInToSaveModal from '../../components/SignInToSaveModal';
import IncentivesModal from '../../components/IncentivesModal/IncentivesModal';
import type { IncentiveOfferDetail } from '../../components/IncentivesModal/IncentivesModal';
import { DealsFilterModal } from '../../components/DealsFilterModal';
import type { DealsFilterState } from '../../components/DealsFilterModal';
import './LeaseDealsHubPage.css';

const FAQ_DATA = [
  {
    question: 'What is a car lease?',
    answer:
      "A car lease is essentially a long-term rental agreement. You pay a monthly fee to drive a new vehicle for a set period (typically 24–36 months) and mileage limit, then return it at the end. Lease payments are usually lower than loan payments because you're only paying for the vehicle's depreciation during the lease term, not its full value.",
  },
  {
    question: 'How does Car and Driver find these lease deals?',
    answer:
      "Our editorial team monitors manufacturer incentive programs monthly. Every deal listed here comes directly from the automaker's current national offers. We verify terms, highlight the best values, and add our expert ratings so you can shop with confidence.",
  },
  {
    question: 'Do I need good credit to lease?',
    answer:
      "Most advertised lease deals require 'well-qualified' credit, typically a score of 700 or higher. If your credit is lower, you may still qualify but at different terms. We recommend checking with the dealer for personalized offers.",
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

function slugForPath(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

const LeaseDealsHubPage = () => {
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

  const allLeaseDeals = useMemo(() => getLeaseDeals(), []);

  const makeLinkItems = useMemo(() => {
    const byMake = new Map<string, string>();
    for (const d of allLeaseDeals) {
      const label = d.vehicle.make;
      byMake.set(label.toLowerCase(), label);
    }
    return [...byMake.entries()]
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([, label]) => ({ label, slug: slugForPath(label) }));
  }, [allLeaseDeals]);

  const bodyStyleLinkItems = useMemo(() => {
    const byStyle = new Map<string, string>();
    for (const d of allLeaseDeals) {
      const label = d.vehicle.bodyStyle;
      byStyle.set(label.toLowerCase(), label);
    }
    return [...byStyle.entries()]
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([, label]) => ({ label, slug: slugForPath(label) }));
  }, [allLeaseDeals]);

  const hasActiveFilters =
    filters.bodyTypes.length > 0 ||
    filters.makes.length > 0 ||
    filters.fuelTypes.length > 0 ||
    filters.accolades.length > 0 ||
    filters.terms.length > 0 ||
    filters.creditTier !== null;
  const activeFilterCount =
    filters.bodyTypes.length +
    filters.makes.length +
    filters.fuelTypes.length +
    filters.accolades.length +
    filters.terms.length +
    (filters.creditTier ? 1 : 0);

  const matchesFilters = useCallback(
    (
      vehicle: { bodyStyle: string; make: string; fuelType: string; editorsChoice?: boolean; tenBest?: boolean; evOfTheYear?: boolean },
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

  const deals = useMemo(() => {
    return getLeaseDeals()
      .filter((deal) => matchesFilters(deal.vehicle, { term: deal.term }))
      .map((deal) => ({
        ...deal,
        rating: getSupabaseRating(deal.vehicle.id, getCategory(deal.vehicle.bodyStyle), deal.vehicle.staffRating),
      }));
  }, [getSupabaseRating, matchesFilters]);

  const isVehicleSaved = (name: string) => user?.savedVehicles?.some((v) => v.name === name) || false;

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
      const sv = user?.savedVehicles?.find((v) => v.name === vehicle.name);
      if (sv) removeSavedVehicle(sv.id);
    } else {
      addSavedVehicle({ id: vehicle.slug, name: vehicle.name, ownership: 'want' });
    }
  };

  const activeDealObj = activeDealId ? deals.find((d) => d.id === activeDealId) : null;
  const activeOffer: Partial<IncentiveOfferDetail> | undefined = activeDealObj
    ? (() => {
        const v = activeDealObj.vehicle;
        const priceParts = v.priceRange.replace(/[^0-9,\-–]/g, '').split(/[-–]/);
        return {
          year: parseInt(v.year, 10),
          make: v.make,
          model: v.model,
          slug: v.slug,
          imageUrl: v.image,
          msrpMin: parseInt(priceParts[0]?.replace(/,/g, '') || '0', 10),
          msrpMax: parseInt(priceParts[1]?.replace(/,/g, '') || '0', 10),
          offerHeadline: `Lease for ${activeDealObj.monthlyPayment}/month`,
          whatItMeans: `Instead of buying, you're renting the car for ${activeDealObj.term}. Your monthly payment is just ${activeDealObj.monthlyPayment} with ${activeDealObj.dueAtSigning} due at signing.`,
          yourSavings: `${activeDealObj.monthlyPayment}/mo is significantly lower than a typical purchase payment. ${activeDealObj.dueAtSigning} due at signing. Includes ${activeDealObj.mileageAllowance} mileage allowance.`,
          whoQualifies: "Well-qualified lessees with approved credit through the manufacturer's financial arm.",
          eligibleTrims: activeDealObj.trimsEligible,
          dontWaitText: `This offer expires ${activeDealObj.expirationDate}. Manufacturer deals change monthly—once it's gone, there's no guarantee it'll come back.`,
          eventLabel: activeDealObj.programName,
          expirationDate: activeDealObj.expirationDate,
        };
      })()
    : undefined;

  const seoTitle = `Best Car Lease Deals for ${month} ${year}: Find the Best Lease Deals Right Now`;
  const h1Title = `Best Car Lease Deals for ${month} ${year}`;
  const description = `Compare the best car lease deals for ${month} ${year}. Find low monthly payments, short terms, and manufacturer lease specials from Car and Driver.`;
  const lowestPayment = deals.length > 0 ? Math.min(...deals.map((d) => d.monthlyPaymentNum)) : 0;
  const BASE_URL = 'https://www.caranddriver.com';

  return (
    <div className="lease-hub">
      <SEO
        title={seoTitle}
        description={description}
        canonical={`${BASE_URL}/lease-deals`}
        keywords={[
          'car lease deals',
          'best lease deals',
          `lease deals ${month} ${year}`,
          'manufacturer lease specials',
          'new car lease',
          'low monthly lease payment',
        ]}
        structuredData={[
          createBreadcrumbStructuredData([
            { name: 'Home', url: BASE_URL },
            { name: 'Lease Deals', url: `${BASE_URL}/lease-deals` },
          ]),
          createFAQStructuredData(FAQ_DATA),
        ]}
        noIndex={allLeaseDeals.length === 0}
      />

      <div className="lease-hub__hero">
        <div className="container">
          <div className="lease-hub__hero-content">
            <div className="lease-hub__hero-badge">
              <Car size={16} />
              <span>Lease Deals Hub</span>
            </div>
            <nav className="lease-hub__breadcrumb" aria-label="Breadcrumb">
              <Link to="/">Home</Link>
              <span className="lease-hub__breadcrumb-sep">/</span>
              <span aria-current="page">Lease Deals</span>
            </nav>
            <h1 className="lease-hub__title">{h1Title}</h1>
            <p className="lease-hub__description">
              Car and Driver&apos;s editors track every manufacturer lease special so you don&apos;t have to. Below you&apos;ll find the best lease deals
              available right now, updated monthly with the latest offers. Use our ratings and filters to compare payments and find a lease that fits your
              budget.
            </p>
            <div className="lease-hub__hero-stats">
              <div className="lease-hub__hero-stat">
                <span className="lease-hub__hero-stat-value">{deals.length}</span>
                <span className="lease-hub__hero-stat-label">Lease Deals</span>
              </div>
              <div className="lease-hub__hero-stat">
                <span className="lease-hub__hero-stat-value">{lowestPayment > 0 ? `$${lowestPayment}` : 'N/A'}</span>
                <span className="lease-hub__hero-stat-label">Lowest Payment</span>
              </div>
              <div className="lease-hub__hero-stat">
                <span className="lease-hub__hero-stat-value">{month}</span>
                <span className="lease-hub__hero-stat-label">{year} Deals</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="lease-hub__toolbar">
        <div className="container lease-hub__toolbar-inner">
          <span className="lease-hub__toolbar-count">{deals.length} deals available</span>
          <button
            type="button"
            className={`lease-hub__filter-btn ${hasActiveFilters ? 'lease-hub__filter-btn--active' : ''}`}
            onClick={() => setFilterOpen(true)}
          >
            <SlidersHorizontal size={16} />
            <span>Filters</span>
            {activeFilterCount > 0 && <span className="lease-hub__filter-badge">{activeFilterCount}</span>}
          </button>
        </div>
      </div>

      <div className="lease-hub__content">
        <div className="container">
          <div className="lease-hub__layout">
            <div className="lease-hub__main">
              <section className="lease-hub__section">
                <h2 className="lease-hub__section-title">
                  <Car size={22} /> {deals.length} Available Deals
                </h2>
                <div className="lease-hub__grid">
                  {deals.map((deal) => {
                    const vehicleName = `${deal.vehicle.year} ${deal.vehicle.make} ${deal.vehicle.model}`;
                    const saved = isVehicleSaved(vehicleName);
                    const isExpanded = expandedDealId === deal.id;
                    return (
                      <div key={deal.id} className="lease-hub__card">
                        <div className="lease-hub__card-header">
                          <Link to={`/${deal.vehicle.slug}`} className="lease-hub__card-name-link">
                            <h3 className="lease-hub__card-name">{vehicleName}</h3>
                          </Link>
                          <div className="lease-hub__card-rating">
                            <span className="lease-hub__card-rating-value">{deal.rating}</span>
                            <span className="lease-hub__card-rating-max">/10</span>
                            <span className="lease-hub__card-rating-label">C/D Rating</span>
                          </div>
                        </div>

                        <Link to={`/${deal.vehicle.slug}`} className="lease-hub__card-image-link">
                          <div className="lease-hub__card-image-container">
                            <img src={deal.vehicle.image} alt={vehicleName} className="lease-hub__card-image" />
                            <button
                              className={`lease-hub__card-save ${saved ? 'lease-hub__card-save--saved' : ''}`}
                              onClick={(e) => handleSaveClick(e, { name: vehicleName, slug: deal.vehicle.slug, image: deal.vehicle.image })}
                              aria-label={saved ? 'Remove from favorites' : 'Add to favorites'}
                            >
                              <Heart size={16} fill={saved ? 'currentColor' : 'none'} />
                            </button>
                            {(() => {
                              const allOffers = getVehicleOffers(deal.vehicle.make, deal.vehicle.model);
                              if (allOffers.length > 1)
                                return (
                                  <button
                                    type="button"
                                    className="lease-hub__card-offers-tag"
                                    onClick={(e) => toggleOffersPopup(e, deal.vehicle.make, deal.vehicle.model, deal.vehicle.slug)}
                                  >
                                    {allOffers.length} Offers Available
                                  </button>
                                );
                              return null;
                            })()}
                            {offersPopup?.slug === deal.vehicle.slug && (
                              <div className="lease-hub__card-offers-popup">
                                <div className="lease-hub__card-offers-popup-header">
                                  <strong>{offersPopup.offers.length} Available Offers</strong>
                                  <button
                                    type="button"
                                    className="lease-hub__card-offers-popup-close"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      e.stopPropagation();
                                      setOffersPopup(null);
                                    }}
                                  >
                                    &times;
                                  </button>
                                </div>
                                <ul className="lease-hub__card-offers-popup-list">
                                  {offersPopup.offers.map((o, idx) => (
                                    <li key={idx} className="lease-hub__card-offers-popup-item">
                                      <span className={`lease-hub__card-offers-popup-type lease-hub__card-offers-popup-type--${o.type}`}>
                                        {o.type === 'zero-apr' ? '0% APR' : o.type === 'cash' ? 'Cash' : o.type === 'finance' ? 'Finance' : 'Lease'}
                                      </span>
                                      <span className="lease-hub__card-offers-popup-label">{o.label}</span>
                                      <span className="lease-hub__card-offers-popup-exp">exp {o.expires}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                            {(deal.vehicle.editorsChoice || deal.vehicle.tenBest) && (
                              <div className="lease-hub__card-badges">
                                {deal.vehicle.tenBest && <img src={TEN_BEST_BADGE_URL} alt="10Best" className="lease-hub__card-badge-img" />}
                                {deal.vehicle.editorsChoice && (
                                  <img src={EDITORS_CHOICE_BADGE_URL} alt="Editors' Choice" className="lease-hub__card-badge-img" />
                                )}
                              </div>
                            )}
                          </div>
                        </Link>

                        <div className="lease-hub__card-body">
                          {(() => {
                            const leaseNum = deal.monthlyPaymentNum;
                            const { savingsVsAvg, savingsTooltip } = buildSavingsText(leaseNum, deal.vehicle.bodyStyle);
                            return (
                              <div className="lease-hub__card-payment-block">
                                <div className="lease-hub__card-payment">
                                  <span className="lease-hub__card-payment-amount">{deal.monthlyPayment}</span>
                                  <span className="lease-hub__card-payment-period">/mo</span>
                                </div>
                                <span className="lease-hub__card-payment-savings">
                                  {savingsVsAvg}
                                  <span className="lease-hub__card-tooltip-wrap">
                                    <Info size={13} className="lease-hub__card-tooltip-icon" />
                                    <span className="lease-hub__card-tooltip">{savingsTooltip}</span>
                                  </span>
                                </span>
                              </div>
                            );
                          })()}

                          <button
                            className="lease-hub__card-deal-pill"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              setActiveDealId(deal.id);
                            }}
                          >
                            <span className="lease-hub__card-deal-pill-chip">Lease</span>
                            <span className="lease-hub__card-deal-pill-text">{deal.monthlyPayment}/mo lease</span>
                            <span className="lease-hub__card-deal-pill-divider" />
                            <span className="lease-hub__card-deal-pill-expires">expires {deal.expirationDate}</span>
                          </button>

                          <div className="lease-hub__card-details">
                            <div className="lease-hub__card-detail">
                              <span className="lease-hub__card-detail-label">Term</span>
                              <span className="lease-hub__card-detail-value">{deal.term}</span>
                            </div>
                            <div className="lease-hub__card-detail">
                              <span className="lease-hub__card-detail-label">Due at Signing</span>
                              <span className="lease-hub__card-detail-value">{deal.dueAtSigning}</span>
                            </div>
                          </div>

                          <button type="button" className="lease-hub__card-cta" onClick={() => setActiveDealId(deal.id)}>
                            Get This Deal
                          </button>

                          <button
                            type="button"
                            className="lease-hub__card-toggle"
                            onClick={() => setExpandedDealId(isExpanded ? null : deal.id)}
                            aria-expanded={isExpanded}
                          >
                            <span>Additional Details</span>
                            {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                          </button>
                          {isExpanded && (
                            <div className="lease-hub__card-additional">
                              <div className="lease-hub__card-additional-item">
                                <Info size={16} />
                                <div>
                                  <strong>{deal.programName}</strong>
                                  <p>{deal.programDescription}</p>
                                </div>
                              </div>
                              <div className="lease-hub__card-additional-item">
                                <Tag size={16} />
                                <div>
                                  <strong>Eligible Trims</strong>
                                  <p>{deal.trimsEligible.join(', ')}</p>
                                </div>
                              </div>
                              <div className="lease-hub__card-additional-item">
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
                  {deals.length === 0 && (
                    <div className="lease-hub__empty-state">
                      <p className="lease-hub__empty-state-text">
                        There are currently no active lease offers. Check back soon or explore other available deals.
                      </p>
                      <Link to="/deals" className="lease-hub__empty-state-link">
                        Browse All Deals
                      </Link>
                    </div>
                  )}
                </div>
              </section>

              <section className="lease-hub__faq-section">
                <h2 className="lease-hub__section-title">
                  <Info size={22} /> Frequently Asked Questions About Leasing
                </h2>
                <div className="lease-hub__faq-list">
                  {FAQ_DATA.map((faq, i) => (
                    <div key={i} className={`lease-hub__faq-item ${expandedFaqIndex === i ? 'lease-hub__faq-item--expanded' : ''}`}>
                      <button
                        type="button"
                        className="lease-hub__faq-question"
                        onClick={() => setExpandedFaqIndex(expandedFaqIndex === i ? null : i)}
                        aria-expanded={expandedFaqIndex === i}
                      >
                        <span>{faq.question}</span>
                        {expandedFaqIndex === i ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                      </button>
                      {expandedFaqIndex === i && (
                        <div className="lease-hub__faq-answer">
                          <p>{faq.answer}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>

              {(makeLinkItems.length > 0 || bodyStyleLinkItems.length > 0) && (
                <section className="lease-hub__links-section">
                  <h2 className="lease-hub__section-title">Browse Lease Deals</h2>
                  {makeLinkItems.length > 0 && (
                    <>
                      <h3 className="lease-hub__links-subheading">Lease deals by make</h3>
                      <div className="lease-hub__links-grid">
                        {makeLinkItems.map(({ label, slug }) => (
                          <Link key={slug} to={`/${slug}/lease-deals`} className="lease-hub__link-card">
                            <h4 className="lease-hub__link-card-title">{label} lease deals</h4>
                            <p>Current manufacturer lease specials on {label} vehicles</p>
                          </Link>
                        ))}
                      </div>
                    </>
                  )}
                  {bodyStyleLinkItems.length > 0 && (
                    <>
                      <h3 className="lease-hub__links-subheading">Lease deals by body style</h3>
                      <div className="lease-hub__links-grid">
                        {bodyStyleLinkItems.map(({ label, slug }) => (
                          <Link key={slug} to={`/lease-deals/${slug}`} className="lease-hub__link-card">
                            <h4 className="lease-hub__link-card-title">{label} lease deals</h4>
                            <p>Manufacturer lease specials on {label} models</p>
                          </Link>
                        ))}
                      </div>
                    </>
                  )}
                </section>
              )}
            </div>
            <aside className="lease-hub__sidebar">
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

      <DealsFilterModal isOpen={filterOpen} onClose={() => setFilterOpen(false)} filters={filters} onApply={setFilters} totalResults={deals.length} />
    </div>
  );
};

export default LeaseDealsHubPage;
