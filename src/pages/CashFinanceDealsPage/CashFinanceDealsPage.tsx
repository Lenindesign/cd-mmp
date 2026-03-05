import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronUp, Bookmark, Info, Tag, Users, Clock, DollarSign, Percent } from 'lucide-react';
import { getCashDeals, getFinanceDeals, getCurrentPeriod } from '../../services/cashFinanceDealsService';
import { useSupabaseRatings, getCategory } from '../../hooks/useSupabaseRating';
import { useAuth } from '../../contexts/AuthContext';
import { SEO } from '../../components/SEO';
import AdSidebar from '../../components/AdSidebar';
import SignInToSaveModal from '../../components/SignInToSaveModal';
import './CashFinanceDealsPage.css';

const EDITORS_CHOICE_BADGE_URL = 'https://www.caranddriver.com/_assets/design-tokens/caranddriver/static/images/badges-no-text/editors-choice.7ecd596.svg?primary=%2523FEFEFE';
const TEN_BEST_BADGE_URL = 'https://www.caranddriver.com/_assets/design-tokens/caranddriver/static/images/badges-no-text/ten-best.bcb6ac1.svg';

type DealFilter = 'all' | 'cash' | 'finance';

const FAQ_DATA = [
  {
    question: 'What are cash-back incentives on new cars?',
    answer: 'Cash-back incentives (also called customer cash or rebates) are discounts offered directly by the manufacturer that reduce the purchase price of a new vehicle. Unlike negotiating with the dealer, these are set amounts published by the automaker—often ranging from $500 to $5,000 or more. They\'re applied at the time of purchase and reduce what you owe.',
  },
  {
    question: 'How do special finance rates work?',
    answer: 'Special finance rates are below-market APR (Annual Percentage Rate) offers provided through the manufacturer\'s captive finance company—like GM Financial, Toyota Financial Services, or Ford Credit. These rates are subsidized by the manufacturer, meaning you pay less interest over the life of your loan compared to a typical bank or credit union loan.',
  },
  {
    question: 'Can I get cash back AND a low APR on the same car?',
    answer: 'Typically, no. Most manufacturers require you to choose between a cash-back rebate and a special financing rate. However, some programs allow stacking certain incentives—for example, a loyalty bonus on top of a finance offer. Military, first responder, and college graduate programs can sometimes be combined with either offer type. Always ask the dealer to calculate both scenarios to see which saves you more.',
  },
  {
    question: 'Which is better: cash back or low APR financing?',
    answer: 'It depends on the loan amount, term, and rates. For shorter loan terms or smaller amounts, the cash-back rebate often saves more. For longer terms or larger amounts, a low APR can result in greater overall savings. A quick rule of thumb: calculate the total interest you\'d pay at the standard rate minus the rebate, and compare it to the total interest at the special rate with no rebate.',
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

const CashFinanceDealsPage = () => {
  const { getRating: getSupabaseRating } = useSupabaseRatings();
  const { user, isAuthenticated, addSavedVehicle, removeSavedVehicle } = useAuth();
  const { month, year } = getCurrentPeriod();

  const [activeFilter, setActiveFilter] = useState<DealFilter>('all');
  const [expandedDealId, setExpandedDealId] = useState<string | null>(null);
  const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(null);
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [pendingSaveVehicle, setPendingSaveVehicle] = useState<{ name: string; slug: string; image?: string } | null>(null);

  const cashDeals = useMemo(() => {
    return getCashDeals().map((deal) => ({
      ...deal,
      rating: getSupabaseRating(deal.vehicle.id, getCategory(deal.vehicle.bodyStyle), deal.vehicle.staffRating),
    }));
  }, [getSupabaseRating]);

  const financeDeals = useMemo(() => {
    return getFinanceDeals().map((deal) => ({
      ...deal,
      rating: getSupabaseRating(deal.vehicle.id, getCategory(deal.vehicle.bodyStyle), deal.vehicle.staffRating),
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

  const pageTitle = `Best Car Deals & Incentives for ${month} ${year}`;

  return (
    <div className="cf-deals-page">
      <SEO
        title={`${pageTitle}: Find the Best Car Deals Right Now | Car and Driver`}
        description={`Find the best new car deals, cash-back incentives, and special financing offers for ${month} ${year}. Expert ratings and reviews from Car and Driver help you get the best value.`}
      />

      {/* Hero Section */}
      <div className="cf-deals-page__hero">
        <div className="container">
          <div className="cf-deals-page__hero-content">
            <div className="cf-deals-page__hero-badge">
              <DollarSign size={16} />
              <span>Deals & Incentives</span>
            </div>
            <h1 className="cf-deals-page__title">{pageTitle}</h1>
            <p className="cf-deals-page__description">
              Manufacturers offer cash-back rebates and special finance rates to move inventory—and
              those savings go directly to you. We've combined the best current deals with Car and Driver's
              expert ratings so you can find not just a good price, but a great car at a great price.
            </p>
            <div className="cf-deals-page__hero-stats">
              <div className="cf-deals-page__hero-stat">
                <span className="cf-deals-page__hero-stat-value">{cashDeals.length}</span>
                <span className="cf-deals-page__hero-stat-label">Cash Deals</span>
              </div>
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

      {/* Filter Bar */}
      <div className="cf-deals-page__filter-bar">
        <div className="container">
          <div className="cf-deals-page__filters">
            <button
              className={`cf-deals-page__filter-btn ${activeFilter === 'all' ? 'cf-deals-page__filter-btn--active' : ''}`}
              onClick={() => setActiveFilter('all')}
            >
              All Deals ({cashDeals.length + financeDeals.length})
            </button>
            <button
              className={`cf-deals-page__filter-btn ${activeFilter === 'cash' ? 'cf-deals-page__filter-btn--active' : ''}`}
              onClick={() => setActiveFilter('cash')}
            >
              <DollarSign size={16} />
              Cash Deals ({cashDeals.length})
            </button>
            <button
              className={`cf-deals-page__filter-btn ${activeFilter === 'finance' ? 'cf-deals-page__filter-btn--active' : ''}`}
              onClick={() => setActiveFilter('finance')}
            >
              <Percent size={16} />
              Finance Deals ({financeDeals.length})
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="cf-deals-page__content">
        <div className="container">
          <div className="cf-deals-page__layout">
            <div className="cf-deals-page__main">

              {/* Cash Deals Section */}
              {(activeFilter === 'all' || activeFilter === 'cash') && (
                <section className="cf-deals-page__section">
                  <h2 className="cf-deals-page__section-title">
                    <DollarSign size={22} />
                    Cash-Back Deals
                  </h2>
                  <div className="cf-deals-page__grid">
                    {cashDeals.map((deal) => {
                      const vehicleName = `${deal.vehicle.year} ${deal.vehicle.make} ${deal.vehicle.model}`;
                      const saved = isVehicleSaved(vehicleName);
                      const isExpanded = expandedDealId === deal.id;

                      return (
                        <div key={deal.id} className="cf-deals-page__card">
                          <Link to={`/${deal.vehicle.slug}`} className="cf-deals-page__card-image-link">
                            <div className="cf-deals-page__card-image-container">
                              <img src={deal.vehicle.image} alt={vehicleName} className="cf-deals-page__card-image" />
                              <div className="cf-deals-page__card-badge cf-deals-page__card-badge--cash">{deal.incentiveValue} Cash Back</div>
                              <button
                                className={`cf-deals-page__card-save ${saved ? 'cf-deals-page__card-save--saved' : ''}`}
                                onClick={(e) => handleSaveClick(e, { name: vehicleName, slug: deal.vehicle.slug, image: deal.vehicle.image })}
                                aria-label={saved ? 'Remove from saved' : 'Save vehicle'}
                              >
                                <Bookmark size={18} fill={saved ? 'currentColor' : 'none'} />
                              </button>
                            </div>
                          </Link>

                          <div className="cf-deals-page__card-body">
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

                            {(deal.vehicle.editorsChoice || deal.vehicle.tenBest) && (
                              <div className="cf-deals-page__card-accolades">
                                {deal.vehicle.tenBest && (
                                  <div className="cf-deals-page__card-accolade">
                                    <img src={TEN_BEST_BADGE_URL} alt="10Best" className="cf-deals-page__card-accolade-icon" />
                                    <span>10Best</span>
                                  </div>
                                )}
                                {deal.vehicle.editorsChoice && (
                                  <div className="cf-deals-page__card-accolade">
                                    <img src={EDITORS_CHOICE_BADGE_URL} alt="Editor's Choice" className="cf-deals-page__card-accolade-icon" />
                                    <span>Editor's Choice</span>
                                  </div>
                                )}
                              </div>
                            )}

                            <div className="cf-deals-page__card-details">
                              <div className="cf-deals-page__card-detail">
                                <span className="cf-deals-page__card-detail-label">MSRP Range</span>
                                <span className="cf-deals-page__card-detail-value">{deal.vehicle.priceRange}</span>
                              </div>
                              <div className="cf-deals-page__card-detail">
                                <span className="cf-deals-page__card-detail-label">% Off MSRP</span>
                                <span className="cf-deals-page__card-detail-value cf-deals-page__card-detail-value--highlight">{deal.percentOffMsrp}</span>
                              </div>
                              <div className="cf-deals-page__card-detail">
                                <span className="cf-deals-page__card-detail-label">Incentive Value</span>
                                <span className="cf-deals-page__card-detail-value cf-deals-page__card-detail-value--cash">{deal.incentiveValue}</span>
                              </div>
                              <div className="cf-deals-page__card-detail">
                                <span className="cf-deals-page__card-detail-label">Expires</span>
                                <span className="cf-deals-page__card-detail-value">{deal.expirationDate}</span>
                              </div>
                            </div>

                            <Link
                              to={`/vehicles?make=${deal.vehicle.make}&model=${deal.vehicle.model}`}
                              className="cf-deals-page__card-cta"
                            >
                              Get This Deal
                            </Link>

                            <button
                              className="cf-deals-page__card-toggle"
                              onClick={() => toggleDealDetails(deal.id)}
                              aria-expanded={isExpanded}
                            >
                              <span>Additional Details</span>
                              {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
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
                </section>
              )}

              {/* Finance Deals Section */}
              {(activeFilter === 'all' || activeFilter === 'finance') && (
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
                          <Link to={`/${deal.vehicle.slug}`} className="cf-deals-page__card-image-link">
                            <div className="cf-deals-page__card-image-container">
                              <img src={deal.vehicle.image} alt={vehicleName} className="cf-deals-page__card-image" />
                              <div className="cf-deals-page__card-badge cf-deals-page__card-badge--finance">{deal.apr} APR</div>
                              <button
                                className={`cf-deals-page__card-save ${saved ? 'cf-deals-page__card-save--saved' : ''}`}
                                onClick={(e) => handleSaveClick(e, { name: vehicleName, slug: deal.vehicle.slug, image: deal.vehicle.image })}
                                aria-label={saved ? 'Remove from saved' : 'Save vehicle'}
                              >
                                <Bookmark size={18} fill={saved ? 'currentColor' : 'none'} />
                              </button>
                            </div>
                          </Link>

                          <div className="cf-deals-page__card-body">
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

                            {(deal.vehicle.editorsChoice || deal.vehicle.tenBest) && (
                              <div className="cf-deals-page__card-accolades">
                                {deal.vehicle.tenBest && (
                                  <div className="cf-deals-page__card-accolade">
                                    <img src={TEN_BEST_BADGE_URL} alt="10Best" className="cf-deals-page__card-accolade-icon" />
                                    <span>10Best</span>
                                  </div>
                                )}
                                {deal.vehicle.editorsChoice && (
                                  <div className="cf-deals-page__card-accolade">
                                    <img src={EDITORS_CHOICE_BADGE_URL} alt="Editor's Choice" className="cf-deals-page__card-accolade-icon" />
                                    <span>Editor's Choice</span>
                                  </div>
                                )}
                              </div>
                            )}

                            <div className="cf-deals-page__card-details">
                              <div className="cf-deals-page__card-detail">
                                <span className="cf-deals-page__card-detail-label">MSRP Range</span>
                                <span className="cf-deals-page__card-detail-value">{deal.vehicle.priceRange}</span>
                              </div>
                              <div className="cf-deals-page__card-detail">
                                <span className="cf-deals-page__card-detail-label">APR</span>
                                <span className="cf-deals-page__card-detail-value cf-deals-page__card-detail-value--finance">{deal.apr}</span>
                              </div>
                              <div className="cf-deals-page__card-detail">
                                <span className="cf-deals-page__card-detail-label">Term</span>
                                <span className="cf-deals-page__card-detail-value">{deal.term}</span>
                              </div>
                              <div className="cf-deals-page__card-detail">
                                <span className="cf-deals-page__card-detail-label">Expires</span>
                                <span className="cf-deals-page__card-detail-value">{deal.expirationDate}</span>
                              </div>
                            </div>

                            <Link
                              to={`/vehicles?make=${deal.vehicle.make}&model=${deal.vehicle.model}`}
                              className="cf-deals-page__card-cta"
                            >
                              Get This Deal
                            </Link>

                            <button
                              className="cf-deals-page__card-toggle"
                              onClick={() => toggleDealDetails(deal.id)}
                              aria-expanded={isExpanded}
                            >
                              <span>Additional Details</span>
                              {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
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
                </section>
              )}

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
                  <Link to="/deals/zero-apr" className="cf-deals-page__link-card">
                    <h3>0% APR Deals</h3>
                    <p>Find vehicles with zero-interest financing offers</p>
                  </Link>
                  <Link to="/rankings" className="cf-deals-page__link-card">
                    <h3>Car Rankings</h3>
                    <p>See our expert rankings across every vehicle category</p>
                  </Link>
                  <Link to="/rankings/suv" className="cf-deals-page__link-card">
                    <h3>Best SUVs</h3>
                    <p>Find the highest-rated SUVs tested by our editors</p>
                  </Link>
                  <Link to="/rankings/truck" className="cf-deals-page__link-card">
                    <h3>Best Trucks</h3>
                    <p>Expert-ranked pickup trucks for every need</p>
                  </Link>
                  <Link to="/whats-my-car-worth" className="cf-deals-page__link-card">
                    <h3>What's My Car Worth?</h3>
                    <p>Get an instant trade-in value estimate</p>
                  </Link>
                  <Link to="/vehicles" className="cf-deals-page__link-card">
                    <h3>Browse All Vehicles</h3>
                    <p>Search our complete database of new and used cars</p>
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

export default CashFinanceDealsPage;
