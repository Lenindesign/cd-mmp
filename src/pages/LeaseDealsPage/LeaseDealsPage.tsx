import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronUp, Bookmark, Info, Tag, Clock, Car } from 'lucide-react';
import { getLeaseDeals, getCurrentPeriod } from '../../services/leaseDealsService';
import { useSupabaseRatings, getCategory } from '../../hooks/useSupabaseRating';
import { useAuth } from '../../contexts/AuthContext';
import { SEO } from '../../components/SEO';
import AdSidebar from '../../components/AdSidebar';
import SignInToSaveModal from '../../components/SignInToSaveModal';
import './LeaseDealsPage.css';

const EDITORS_CHOICE_BADGE_URL = 'https://www.caranddriver.com/_assets/design-tokens/caranddriver/static/images/badges-no-text/editors-choice.7ecd596.svg?primary=%2523FEFEFE';
const TEN_BEST_BADGE_URL = 'https://www.caranddriver.com/_assets/design-tokens/caranddriver/static/images/badges-no-text/ten-best.bcb6ac1.svg';

const FAQ_DATA = [
  {
    question: 'How does leasing a car work?',
    answer: 'When you lease a car, you\'re essentially paying for the vehicle\'s depreciation during the lease term rather than the full purchase price. You make monthly payments for a set period (typically 24–36 months) and return the car at the end. Your payment is based on the difference between the car\'s price and its projected residual value, plus fees and taxes.',
  },
  {
    question: 'What does "due at signing" mean?',
    answer: 'Due at signing is the upfront cost you pay when you start the lease. It typically includes the first month\'s payment, a security deposit (if required), acquisition fee, and sometimes a down payment. A lower due-at-signing amount means more money in your pocket upfront, but it may result in slightly higher monthly payments.',
  },
  {
    question: 'What happens if I drive more than the mileage limit?',
    answer: 'Most leases include a mileage allowance (typically 10,000–12,000 miles per year). If you exceed it, you\'ll pay an excess mileage fee—usually $0.15 to $0.25 per mile—when you return the vehicle. If you know you\'ll drive more, negotiate a higher mileage allowance upfront; it\'s cheaper than paying overage fees.',
  },
  {
    question: 'Can I buy the car at the end of the lease?',
    answer: 'Yes, most leases include a purchase option at the end of the term. The buyout price is the residual value set at the start of the lease plus any applicable fees. If the car is worth more than its residual value, buying it can be a good deal. If not, simply return it and walk away.',
  },
  {
    question: 'Is leasing or buying better for me?',
    answer: 'Leasing is ideal if you like driving a new car every few years, want lower monthly payments, and don\'t drive excessive miles. Buying is better if you want to build equity, plan to keep the car long-term, or drive more than 12,000–15,000 miles per year. Consider your lifestyle and financial goals when deciding.',
  },
];

const LeaseDealsPage = () => {
  const { getRating: getSupabaseRating } = useSupabaseRatings();
  const { user, isAuthenticated, addSavedVehicle, removeSavedVehicle } = useAuth();
  const { month, year } = getCurrentPeriod();

  const [expandedDealId, setExpandedDealId] = useState<string | null>(null);
  const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(null);
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [pendingSaveVehicle, setPendingSaveVehicle] = useState<{ name: string; slug: string; image?: string } | null>(null);

  const deals = useMemo(() => {
    return getLeaseDeals().map((deal) => ({
      ...deal,
      rating: getSupabaseRating(deal.vehicle.id, getCategory(deal.vehicle.bodyStyle), deal.vehicle.staffRating),
    }));
  }, [getSupabaseRating]);

  const isVehicleSaved = (name: string) => user?.savedVehicles?.some((v) => v.name === name) || false;

  const handleSaveClick = (e: React.MouseEvent, vehicle: { name: string; slug: string; image?: string }) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isAuthenticated) { setPendingSaveVehicle(vehicle); setShowSignInModal(true); return; }
    const isSaved = isVehicleSaved(vehicle.name);
    if (isSaved) { const sv = user?.savedVehicles?.find((v) => v.name === vehicle.name); if (sv) removeSavedVehicle(sv.id); }
    else { addSavedVehicle({ id: vehicle.slug, name: vehicle.name, ownership: 'want' }); }
  };

  const pageTitle = `Best Lease Deals for ${month} ${year}`;

  return (
    <div className="lease-deals-page">
      <SEO
        title={`${pageTitle} | Car and Driver`}
        description={`Find the best car lease deals for ${month} ${year}. Compare monthly payments, due-at-signing costs, and terms on new cars, SUVs, and trucks. Expert ratings from Car and Driver.`}
      />

      <div className="lease-deals-page__hero">
        <div className="container">
          <div className="lease-deals-page__hero-content">
            <div className="lease-deals-page__hero-badge">
              <Car size={16} />
              <span>Lease Deals</span>
            </div>
            <h1 className="lease-deals-page__title">{pageTitle}</h1>
            <p className="lease-deals-page__description">
              Leasing lets you drive a brand-new car with lower monthly payments than buying. We've compiled
              the best manufacturer lease specials and paired them with our expert ratings so you can find the
              best value for your budget.
            </p>
            <div className="lease-deals-page__hero-stats">
              <div className="lease-deals-page__hero-stat">
                <span className="lease-deals-page__hero-stat-value">{deals.length}</span>
                <span className="lease-deals-page__hero-stat-label">Lease Deals</span>
              </div>
              <div className="lease-deals-page__hero-stat">
                <span className="lease-deals-page__hero-stat-value">${Math.min(...deals.map((d) => d.monthlyPaymentNum))}</span>
                <span className="lease-deals-page__hero-stat-label">Lowest Payment</span>
              </div>
              <div className="lease-deals-page__hero-stat">
                <span className="lease-deals-page__hero-stat-value">{month}</span>
                <span className="lease-deals-page__hero-stat-label">{year} Deals</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="lease-deals-page__content">
        <div className="container">
          <div className="lease-deals-page__layout">
            <div className="lease-deals-page__main">
              <section className="lease-deals-page__section">
                <h2 className="lease-deals-page__section-title"><Car size={22} /> All Lease Deals for {month} {year}</h2>
                <div className="lease-deals-page__grid">
                  {deals.map((deal) => {
                    const vehicleName = `${deal.vehicle.year} ${deal.vehicle.make} ${deal.vehicle.model}`;
                    const saved = isVehicleSaved(vehicleName);
                    const isExpanded = expandedDealId === deal.id;
                    return (
                      <div key={deal.id} className="lease-deals-page__card">
                        <Link to={`/${deal.vehicle.slug}`} className="lease-deals-page__card-image-link">
                          <div className="lease-deals-page__card-image-container">
                            <img src={deal.vehicle.image} alt={vehicleName} className="lease-deals-page__card-image" />
                            <div className="lease-deals-page__card-badge">{deal.monthlyPayment}/mo</div>
                            <button className={`lease-deals-page__card-save ${saved ? 'lease-deals-page__card-save--saved' : ''}`} onClick={(e) => handleSaveClick(e, { name: vehicleName, slug: deal.vehicle.slug, image: deal.vehicle.image })} aria-label={saved ? 'Remove from saved' : 'Save vehicle'}>
                              <Bookmark size={18} fill={saved ? 'currentColor' : 'none'} />
                            </button>
                          </div>
                        </Link>
                        <div className="lease-deals-page__card-body">
                          <div className="lease-deals-page__card-header">
                            <Link to={`/${deal.vehicle.slug}`} className="lease-deals-page__card-name-link"><h3 className="lease-deals-page__card-name">{vehicleName}</h3></Link>
                            <div className="lease-deals-page__card-rating">
                              <span className="lease-deals-page__card-rating-value">{deal.rating}</span>
                              <span className="lease-deals-page__card-rating-max">/10</span>
                              <span className="lease-deals-page__card-rating-label">C/D Rating</span>
                            </div>
                          </div>
                          {(deal.vehicle.editorsChoice || deal.vehicle.tenBest) && (
                            <div className="lease-deals-page__card-accolades">
                              {deal.vehicle.tenBest && (<div className="lease-deals-page__card-accolade"><img src={TEN_BEST_BADGE_URL} alt="10Best" className="lease-deals-page__card-accolade-icon" /><span>10Best</span></div>)}
                              {deal.vehicle.editorsChoice && (<div className="lease-deals-page__card-accolade"><img src={EDITORS_CHOICE_BADGE_URL} alt="Editor's Choice" className="lease-deals-page__card-accolade-icon" /><span>Editor's Choice</span></div>)}
                            </div>
                          )}
                          <div className="lease-deals-page__card-details">
                            <div className="lease-deals-page__card-detail">
                              <span className="lease-deals-page__card-detail-label">Monthly Payment</span>
                              <span className="lease-deals-page__card-detail-value lease-deals-page__card-detail-value--highlight">{deal.monthlyPayment}/mo</span>
                            </div>
                            <div className="lease-deals-page__card-detail">
                              <span className="lease-deals-page__card-detail-label">Term</span>
                              <span className="lease-deals-page__card-detail-value">{deal.term}</span>
                            </div>
                            <div className="lease-deals-page__card-detail">
                              <span className="lease-deals-page__card-detail-label">Due at Signing</span>
                              <span className="lease-deals-page__card-detail-value">{deal.dueAtSigning}</span>
                            </div>
                            <div className="lease-deals-page__card-detail">
                              <span className="lease-deals-page__card-detail-label">Mileage</span>
                              <span className="lease-deals-page__card-detail-value">{deal.mileageAllowance}</span>
                            </div>
                          </div>
                          <Link to={`/vehicles?make=${deal.vehicle.make}&model=${deal.vehicle.model}`} className="lease-deals-page__card-cta">Get This Deal</Link>
                          <button className="lease-deals-page__card-toggle" onClick={() => setExpandedDealId(isExpanded ? null : deal.id)} aria-expanded={isExpanded}>
                            <span>Additional Details</span>{isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                          </button>
                          {isExpanded && (
                            <div className="lease-deals-page__card-additional">
                              <div className="lease-deals-page__card-additional-item"><Info size={16} /><div><strong>{deal.programName}</strong><p>{deal.programDescription}</p></div></div>
                              <div className="lease-deals-page__card-additional-item"><Tag size={16} /><div><strong>Eligible Trims</strong><p>{deal.trimsEligible.join(', ')}</p></div></div>
                              <div className="lease-deals-page__card-additional-item"><Clock size={16} /><div><strong>Offer Expires</strong><p>{deal.expirationDate}</p></div></div>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>

              <section className="lease-deals-page__faq-section">
                <h2 className="lease-deals-page__section-title"><Info size={22} /> Frequently Asked Questions About Leasing</h2>
                <div className="lease-deals-page__faq-list">
                  {FAQ_DATA.map((faq, i) => (
                    <div key={i} className={`lease-deals-page__faq-item ${expandedFaqIndex === i ? 'lease-deals-page__faq-item--expanded' : ''}`}>
                      <button className="lease-deals-page__faq-question" onClick={() => setExpandedFaqIndex(expandedFaqIndex === i ? null : i)} aria-expanded={expandedFaqIndex === i}>
                        <span>{faq.question}</span>{expandedFaqIndex === i ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                      </button>
                      {expandedFaqIndex === i && <div className="lease-deals-page__faq-answer"><p>{faq.answer}</p></div>}
                    </div>
                  ))}
                </div>
              </section>

              <section className="lease-deals-page__links-section">
                <h2 className="lease-deals-page__section-title">Explore More Deals</h2>
                <div className="lease-deals-page__links-grid">
                  <Link to="/deals" className="lease-deals-page__link-card"><h3>All Deals</h3><p>Browse every current deal and incentive</p></Link>
                  <Link to="/deals/zero-apr" className="lease-deals-page__link-card"><h3>0% APR Deals</h3><p>Zero-interest financing offers</p></Link>
                  <Link to="/deals/cash-finance" className="lease-deals-page__link-card"><h3>Cash & Finance Deals</h3><p>Cash-back rebates and special APR rates</p></Link>
                  <Link to="/deals/suv" className="lease-deals-page__link-card"><h3>SUV Deals</h3><p>Best deals on SUVs and crossovers</p></Link>
                  <Link to="/deals/truck" className="lease-deals-page__link-card"><h3>Truck Deals</h3><p>Best deals on pickup trucks</p></Link>
                  <Link to="/rankings" className="lease-deals-page__link-card"><h3>Car Rankings</h3><p>Expert rankings across every category</p></Link>
                </div>
              </section>
            </div>
            <aside className="lease-deals-page__sidebar"><AdSidebar /></aside>
          </div>
        </div>
      </div>

      <SignInToSaveModal isOpen={showSignInModal} onClose={() => { setShowSignInModal(false); setPendingSaveVehicle(null); }} itemType="vehicle" itemName={pendingSaveVehicle?.name} itemImage={pendingSaveVehicle?.image} />
    </div>
  );
};

export default LeaseDealsPage;
