import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronUp, Bookmark, Info, Clock, Users, Tag } from 'lucide-react';
import { getZeroAprDeals, getCurrentPeriod } from '../../services/zeroAprDealsService';
import { useSupabaseRatings, getCategory } from '../../hooks/useSupabaseRating';
import { useAuth } from '../../contexts/AuthContext';
import { SEO } from '../../components/SEO';
import AdSidebar from '../../components/AdSidebar';
import SignInToSaveModal from '../../components/SignInToSaveModal';
import './ZeroAprDealsPage.css';

const EDITORS_CHOICE_BADGE_URL = 'https://www.caranddriver.com/_assets/design-tokens/caranddriver/static/images/badges-no-text/editors-choice.7ecd596.svg?primary=%2523FEFEFE';
const TEN_BEST_BADGE_URL = 'https://www.caranddriver.com/_assets/design-tokens/caranddriver/static/images/badges-no-text/ten-best.bcb6ac1.svg';

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

const ZeroAprDealsPage = () => {
  const { getRating: getSupabaseRating } = useSupabaseRatings();
  const { user, isAuthenticated, addSavedVehicle, removeSavedVehicle } = useAuth();
  const { month, year } = getCurrentPeriod();

  const [expandedDealId, setExpandedDealId] = useState<string | null>(null);
  const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(null);
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [pendingSaveVehicle, setPendingSaveVehicle] = useState<{ name: string; slug: string; image?: string } | null>(null);

  const deals = useMemo(() => {
    const rawDeals = getZeroAprDeals();
    return rawDeals.map((deal) => ({
      ...deal,
      rating: getSupabaseRating(
        deal.vehicle.id,
        getCategory(deal.vehicle.bodyStyle),
        deal.vehicle.staffRating
      ),
    }));
  }, [getSupabaseRating]);

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

  const pageTitle = `Best Interest Free & 0% APR Deals for ${month} ${year}`;

  return (
    <div className="zero-apr-page">
      <SEO
        title={`${pageTitle} | Car and Driver`}
        description={`Find the best 0% APR and interest-free car deals for ${month} ${year}. Compare zero-interest financing offers on new cars, SUVs, and trucks. Expert ratings and reviews from Car and Driver.`}
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

      {/* Main Content */}
      <div className="zero-apr-page__content">
        <div className="container">
          <div className="zero-apr-page__layout">
            <div className="zero-apr-page__main">

              {/* Deals Grid */}
              <section className="zero-apr-page__deals-section">
                <h2 className="zero-apr-page__section-title">
                  <Tag size={22} />
                  All 0% APR Deals for {month} {year}
                </h2>
                <div className="zero-apr-page__grid">
                  {deals.map((deal) => {
                    const vehicleName = `${deal.vehicle.year} ${deal.vehicle.make} ${deal.vehicle.model}`;
                    const saved = isVehicleSaved(vehicleName);
                    const isExpanded = expandedDealId === deal.id;

                    return (
                      <div key={deal.id} className="zero-apr-page__card">
                        {/* Card Image */}
                        <Link to={`/${deal.vehicle.slug}`} className="zero-apr-page__card-image-link">
                          <div className="zero-apr-page__card-image-container">
                            <img
                              src={deal.vehicle.image}
                              alt={vehicleName}
                              className="zero-apr-page__card-image"
                            />
                            <div className="zero-apr-page__card-apr-badge">0% APR</div>
                            <button
                              className={`zero-apr-page__card-save ${saved ? 'zero-apr-page__card-save--saved' : ''}`}
                              onClick={(e) => handleSaveClick(e, { name: vehicleName, slug: deal.vehicle.slug, image: deal.vehicle.image })}
                              aria-label={saved ? 'Remove from saved' : 'Save vehicle'}
                            >
                              <Bookmark size={18} fill={saved ? 'currentColor' : 'none'} />
                            </button>
                          </div>
                        </Link>

                        {/* Card Body */}
                        <div className="zero-apr-page__card-body">
                          {/* YMM + Rating */}
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

                          {/* Accolades */}
                          {(deal.vehicle.editorsChoice || deal.vehicle.tenBest) && (
                            <div className="zero-apr-page__card-accolades">
                              {deal.vehicle.tenBest && (
                                <div className="zero-apr-page__card-accolade">
                                  <img src={TEN_BEST_BADGE_URL} alt="10Best" className="zero-apr-page__card-accolade-icon" />
                                  <span>10Best</span>
                                </div>
                              )}
                              {deal.vehicle.editorsChoice && (
                                <div className="zero-apr-page__card-accolade">
                                  <img src={EDITORS_CHOICE_BADGE_URL} alt="Editor's Choice" className="zero-apr-page__card-accolade-icon" />
                                  <span>Editor's Choice</span>
                                </div>
                              )}
                            </div>
                          )}

                          {/* Deal Details Grid */}
                          <div className="zero-apr-page__card-details">
                            <div className="zero-apr-page__card-detail">
                              <span className="zero-apr-page__card-detail-label">MSRP Range</span>
                              <span className="zero-apr-page__card-detail-value">{deal.vehicle.priceRange}</span>
                            </div>
                            <div className="zero-apr-page__card-detail">
                              <span className="zero-apr-page__card-detail-label">APR</span>
                              <span className="zero-apr-page__card-detail-value zero-apr-page__card-detail-value--highlight">0%</span>
                            </div>
                            <div className="zero-apr-page__card-detail">
                              <span className="zero-apr-page__card-detail-label">Term</span>
                              <span className="zero-apr-page__card-detail-value">{deal.term}</span>
                            </div>
                            <div className="zero-apr-page__card-detail">
                              <span className="zero-apr-page__card-detail-label">Expires</span>
                              <span className="zero-apr-page__card-detail-value">{deal.expirationDate}</span>
                            </div>
                          </div>

                          {/* CTA */}
                          <Link
                            to={`/vehicles?make=${deal.vehicle.make}&model=${deal.vehicle.model}`}
                            className="zero-apr-page__card-cta"
                          >
                            Get This Deal
                          </Link>

                          {/* Expandable Additional Details */}
                          <button
                            className="zero-apr-page__card-toggle"
                            onClick={() => toggleDealDetails(deal.id)}
                            aria-expanded={isExpanded}
                          >
                            <span>Additional Details</span>
                            {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
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
                  <Link to="/rankings" className="zero-apr-page__link-card">
                    <h3>Car Rankings</h3>
                    <p>See our expert rankings across every vehicle category</p>
                  </Link>
                  <Link to="/rankings/suv" className="zero-apr-page__link-card">
                    <h3>Best SUVs</h3>
                    <p>Find the highest-rated SUVs tested by our editors</p>
                  </Link>
                  <Link to="/rankings/sedan" className="zero-apr-page__link-card">
                    <h3>Best Sedans</h3>
                    <p>Top-rated sedans from compact to full-size luxury</p>
                  </Link>
                  <Link to="/rankings/truck" className="zero-apr-page__link-card">
                    <h3>Best Trucks</h3>
                    <p>Expert-ranked pickup trucks for every need</p>
                  </Link>
                  <Link to="/whats-my-car-worth" className="zero-apr-page__link-card">
                    <h3>What's My Car Worth?</h3>
                    <p>Get an instant trade-in value estimate</p>
                  </Link>
                  <Link to="/vehicles" className="zero-apr-page__link-card">
                    <h3>Browse All Vehicles</h3>
                    <p>Search our complete database of new and used cars</p>
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
    </div>
  );
};

export default ZeroAprDealsPage;
