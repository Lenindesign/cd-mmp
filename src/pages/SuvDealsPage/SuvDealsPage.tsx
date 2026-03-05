import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronUp, Bookmark, Info, Tag, Clock, Users, Car } from 'lucide-react';
import { getZeroAprDeals } from '../../services/zeroAprDealsService';
import { getCashDeals, getFinanceDeals } from '../../services/cashFinanceDealsService';
import { getLeaseDeals } from '../../services/leaseDealsService';
import { useSupabaseRatings, getCategory } from '../../hooks/useSupabaseRating';
import { useAuth } from '../../contexts/AuthContext';
import { SEO } from '../../components/SEO';
import AdSidebar from '../../components/AdSidebar';
import SignInToSaveModal from '../../components/SignInToSaveModal';
import './SuvDealsPage.css';

const EDITORS_CHOICE_BADGE_URL = 'https://www.caranddriver.com/_assets/design-tokens/caranddriver/static/images/badges-no-text/editors-choice.7ecd596.svg?primary=%2523FEFEFE';
const TEN_BEST_BADGE_URL = 'https://www.caranddriver.com/_assets/design-tokens/caranddriver/static/images/badges-no-text/ten-best.bcb6ac1.svg';

const CURRENT_MONTH = new Date().toLocaleString('default', { month: 'long' });
const CURRENT_YEAR = new Date().getFullYear();

interface UnifiedDeal {
  id: string;
  dealType: 'zero-apr' | 'cash' | 'finance' | 'lease';
  dealLabel: string;
  badgeColor: string;
  vehicleName: string;
  vehicle: { id: string; year: string; make: string; model: string; image: string; slug: string; bodyStyle: string; priceRange: string; staffRating: number; editorsChoice?: boolean; tenBest?: boolean };
  details: { label: string; value: string; highlight?: boolean }[];
  expirationDate: string;
  programName: string;
  programDescription: string;
  additionalInfo: { icon: string; label: string; value: string }[];
}

const SuvDealsPage = () => {
  const { getRating: getSupabaseRating } = useSupabaseRatings();
  const { user, isAuthenticated, addSavedVehicle, removeSavedVehicle } = useAuth();
  const [expandedDealId, setExpandedDealId] = useState<string | null>(null);
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [pendingSaveVehicle, setPendingSaveVehicle] = useState<{ name: string; slug: string; image?: string } | null>(null);

  const deals = useMemo((): (UnifiedDeal & { rating: number })[] => {
    const results: (UnifiedDeal & { rating: number })[] = [];
    const isSuv = (bodyStyle: string) => bodyStyle.toLowerCase() === 'suv';

    for (const d of getZeroAprDeals().filter((d) => isSuv(d.vehicle.bodyStyle))) {
      results.push({ id: d.id, dealType: 'zero-apr', dealLabel: '0% APR', badgeColor: '#22c55e', vehicleName: `${d.vehicle.year} ${d.vehicle.make} ${d.vehicle.model}`, vehicle: d.vehicle, details: [{ label: 'MSRP Range', value: d.vehicle.priceRange }, { label: 'APR', value: '0%', highlight: true }, { label: 'Term', value: d.term }, { label: 'Expires', value: d.expirationDate }], expirationDate: d.expirationDate, programName: d.programName, programDescription: d.programDescription, additionalInfo: [{ icon: 'users', label: 'Target Audience', value: d.targetAudience }, { icon: 'tag', label: 'Eligible Trims', value: d.trimsEligible.join(', ') }], rating: getSupabaseRating(d.vehicle.id, getCategory(d.vehicle.bodyStyle), d.vehicle.staffRating) });
    }
    for (const d of getCashDeals().filter((d) => isSuv(d.vehicle.bodyStyle))) {
      results.push({ id: d.id, dealType: 'cash', dealLabel: `${d.incentiveValue} Cash Back`, badgeColor: 'var(--color-blue-cobalt)', vehicleName: `${d.vehicle.year} ${d.vehicle.make} ${d.vehicle.model}`, vehicle: d.vehicle, details: [{ label: 'MSRP Range', value: d.vehicle.priceRange }, { label: '% Off MSRP', value: d.percentOffMsrp, highlight: true }, { label: 'Incentive', value: d.incentiveValue }, { label: 'Expires', value: d.expirationDate }], expirationDate: d.expirationDate, programName: d.programName, programDescription: d.programDescription, additionalInfo: [{ icon: 'tag', label: 'Eligible Trims', value: d.trimsEligible.join(', ') }], rating: getSupabaseRating(d.vehicle.id, getCategory(d.vehicle.bodyStyle), d.vehicle.staffRating) });
    }
    for (const d of getFinanceDeals().filter((d) => isSuv(d.vehicle.bodyStyle))) {
      results.push({ id: d.id, dealType: 'finance', dealLabel: `${d.apr} APR`, badgeColor: '#7c3aed', vehicleName: `${d.vehicle.year} ${d.vehicle.make} ${d.vehicle.model}`, vehicle: d.vehicle, details: [{ label: 'MSRP Range', value: d.vehicle.priceRange }, { label: 'APR', value: d.apr, highlight: true }, { label: 'Term', value: d.term }, { label: 'Expires', value: d.expirationDate }], expirationDate: d.expirationDate, programName: d.programName, programDescription: d.programDescription, additionalInfo: [{ icon: 'users', label: 'Target Audience', value: d.targetAudience }, { icon: 'tag', label: 'Eligible Trims', value: d.trimsEligible.join(', ') }], rating: getSupabaseRating(d.vehicle.id, getCategory(d.vehicle.bodyStyle), d.vehicle.staffRating) });
    }
    for (const d of getLeaseDeals().filter((d) => isSuv(d.vehicle.bodyStyle))) {
      results.push({ id: d.id, dealType: 'lease', dealLabel: `${d.monthlyPayment}/mo Lease`, badgeColor: '#7c3aed', vehicleName: `${d.vehicle.year} ${d.vehicle.make} ${d.vehicle.model}`, vehicle: d.vehicle, details: [{ label: 'Payment', value: `${d.monthlyPayment}/mo`, highlight: true }, { label: 'Term', value: d.term }, { label: 'Due at Signing', value: d.dueAtSigning }, { label: 'Mileage', value: d.mileageAllowance }], expirationDate: d.expirationDate, programName: d.programName, programDescription: d.programDescription, additionalInfo: [{ icon: 'tag', label: 'Eligible Trims', value: d.trimsEligible.join(', ') }], rating: getSupabaseRating(d.vehicle.id, getCategory(d.vehicle.bodyStyle), d.vehicle.staffRating) });
    }
    return results;
  }, [getSupabaseRating]);

  const isVehicleSaved = (name: string) => user?.savedVehicles?.some((v) => v.name === name) || false;
  const handleSaveClick = (e: React.MouseEvent, vehicle: { name: string; slug: string; image?: string }) => {
    e.preventDefault(); e.stopPropagation();
    if (!isAuthenticated) { setPendingSaveVehicle(vehicle); setShowSignInModal(true); return; }
    const isSaved = isVehicleSaved(vehicle.name);
    if (isSaved) { const sv = user?.savedVehicles?.find((v) => v.name === vehicle.name); if (sv) removeSavedVehicle(sv.id); }
    else { addSavedVehicle({ id: vehicle.slug, name: vehicle.name, ownership: 'want' }); }
  };

  const pageTitle = `Best SUV Deals & Incentives for ${CURRENT_MONTH} ${CURRENT_YEAR}`;

  return (
    <div className="suv-deals-page">
      <SEO title={`${pageTitle} | Car and Driver`} description={`Find the best SUV deals for ${CURRENT_MONTH} ${CURRENT_YEAR}. Compare 0% APR, cash-back, finance, and lease offers on SUVs and crossovers. Expert ratings from Car and Driver.`} />
      <div className="suv-deals-page__hero">
        <div className="container">
          <div className="suv-deals-page__hero-content">
            <div className="suv-deals-page__hero-badge"><Car size={16} /><span>SUV Deals</span></div>
            <h1 className="suv-deals-page__title">{pageTitle}</h1>
            <p className="suv-deals-page__description">Every current deal on SUVs and crossovers in one place—0% APR financing, cash-back rebates, special finance rates, and lease specials. All paired with Car and Driver expert ratings.</p>
            <div className="suv-deals-page__hero-stats">
              <div className="suv-deals-page__hero-stat"><span className="suv-deals-page__hero-stat-value">{deals.length}</span><span className="suv-deals-page__hero-stat-label">SUV Deals</span></div>
              <div className="suv-deals-page__hero-stat"><span className="suv-deals-page__hero-stat-value">{CURRENT_MONTH}</span><span className="suv-deals-page__hero-stat-label">{CURRENT_YEAR} Deals</span></div>
            </div>
          </div>
        </div>
      </div>
      <div className="suv-deals-page__content">
        <div className="container">
          <div className="suv-deals-page__layout">
            <div className="suv-deals-page__main">
              <section className="suv-deals-page__section">
                <h2 className="suv-deals-page__section-title"><Car size={22} /> All SUV Deals</h2>
                <div className="suv-deals-page__grid">
                  {deals.map((deal) => {
                    const saved = isVehicleSaved(deal.vehicleName);
                    const isExpanded = expandedDealId === deal.id;
                    return (
                      <div key={deal.id} className="suv-deals-page__card">
                        <Link to={`/${deal.vehicle.slug}`} className="suv-deals-page__card-image-link">
                          <div className="suv-deals-page__card-image-container">
                            <img src={deal.vehicle.image} alt={deal.vehicleName} className="suv-deals-page__card-image" />
                            <div className="suv-deals-page__card-badge" style={{ background: deal.badgeColor }}>{deal.dealLabel}</div>
                            <button className={`suv-deals-page__card-save ${saved ? 'suv-deals-page__card-save--saved' : ''}`} onClick={(e) => handleSaveClick(e, { name: deal.vehicleName, slug: deal.vehicle.slug, image: deal.vehicle.image })} aria-label={saved ? 'Remove from saved' : 'Save vehicle'}>
                              <Bookmark size={18} fill={saved ? 'currentColor' : 'none'} />
                            </button>
                          </div>
                        </Link>
                        <div className="suv-deals-page__card-body">
                          <div className="suv-deals-page__card-header">
                            <Link to={`/${deal.vehicle.slug}`} className="suv-deals-page__card-name-link"><h3 className="suv-deals-page__card-name">{deal.vehicleName}</h3></Link>
                            <div className="suv-deals-page__card-rating"><span className="suv-deals-page__card-rating-value">{deal.rating}</span><span className="suv-deals-page__card-rating-max">/10</span><span className="suv-deals-page__card-rating-label">C/D Rating</span></div>
                          </div>
                          {(deal.vehicle.editorsChoice || deal.vehicle.tenBest) && (
                            <div className="suv-deals-page__card-accolades">
                              {deal.vehicle.tenBest && <div className="suv-deals-page__card-accolade"><img src={TEN_BEST_BADGE_URL} alt="10Best" className="suv-deals-page__card-accolade-icon" /><span>10Best</span></div>}
                              {deal.vehicle.editorsChoice && <div className="suv-deals-page__card-accolade"><img src={EDITORS_CHOICE_BADGE_URL} alt="Editor's Choice" className="suv-deals-page__card-accolade-icon" /><span>Editor's Choice</span></div>}
                            </div>
                          )}
                          <div className="suv-deals-page__card-details">
                            {deal.details.map((d, i) => (
                              <div key={i} className="suv-deals-page__card-detail">
                                <span className="suv-deals-page__card-detail-label">{d.label}</span>
                                <span className={`suv-deals-page__card-detail-value ${d.highlight ? 'suv-deals-page__card-detail-value--highlight' : ''}`}>{d.value}</span>
                              </div>
                            ))}
                          </div>
                          <Link to={`/vehicles?make=${deal.vehicle.make}&model=${deal.vehicle.model}`} className="suv-deals-page__card-cta">Get This Deal</Link>
                          <button className="suv-deals-page__card-toggle" onClick={() => setExpandedDealId(isExpanded ? null : deal.id)} aria-expanded={isExpanded}>
                            <span>Additional Details</span>{isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                          </button>
                          {isExpanded && (
                            <div className="suv-deals-page__card-additional">
                              <div className="suv-deals-page__card-additional-item"><Info size={16} /><div><strong>{deal.programName}</strong><p>{deal.programDescription}</p></div></div>
                              {deal.additionalInfo.map((info, i) => (
                                <div key={i} className="suv-deals-page__card-additional-item">
                                  {info.icon === 'users' ? <Users size={16} /> : info.icon === 'tag' ? <Tag size={16} /> : <Clock size={16} />}
                                  <div><strong>{info.label}</strong><p>{info.value}</p></div>
                                </div>
                              ))}
                              <div className="suv-deals-page__card-additional-item"><Clock size={16} /><div><strong>Offer Expires</strong><p>{deal.expirationDate}</p></div></div>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
              <section className="suv-deals-page__links-section">
                <h2 className="suv-deals-page__section-title">Explore More</h2>
                <div className="suv-deals-page__links-grid">
                  <Link to="/deals" className="suv-deals-page__link-card"><h3>All Deals</h3><p>Browse every current deal</p></Link>
                  <Link to="/deals/zero-apr" className="suv-deals-page__link-card"><h3>0% APR Deals</h3><p>Zero-interest financing offers</p></Link>
                  <Link to="/deals/truck" className="suv-deals-page__link-card"><h3>Truck Deals</h3><p>Best deals on pickup trucks</p></Link>
                  <Link to="/deals/lease" className="suv-deals-page__link-card"><h3>Lease Deals</h3><p>Monthly lease specials</p></Link>
                  <Link to="/rankings/suv" className="suv-deals-page__link-card"><h3>SUV Rankings</h3><p>Expert-ranked SUVs</p></Link>
                  <Link to="/deals/cash-finance" className="suv-deals-page__link-card"><h3>Cash & Finance</h3><p>Cash-back and APR offers</p></Link>
                </div>
              </section>
            </div>
            <aside className="suv-deals-page__sidebar"><AdSidebar /></aside>
          </div>
        </div>
      </div>
      <SignInToSaveModal isOpen={showSignInModal} onClose={() => { setShowSignInModal(false); setPendingSaveVehicle(null); }} itemType="vehicle" itemName={pendingSaveVehicle?.name} itemImage={pendingSaveVehicle?.image} />
    </div>
  );
};

export default SuvDealsPage;
