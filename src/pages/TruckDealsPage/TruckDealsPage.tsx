import { useMemo, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronUp, Heart, Info, Tag, Clock, Users, Car } from 'lucide-react';
import { getZeroAprDeals } from '../../services/zeroAprDealsService';
import { getCashDeals, getFinanceDeals } from '../../services/cashFinanceDealsService';
import { getLeaseDeals } from '../../services/leaseDealsService';
import { useSupabaseRatings, getCategory } from '../../hooks/useSupabaseRating';
import { useAuth } from '../../contexts/AuthContext';
import { SEO, createBreadcrumbStructuredData, createFAQStructuredData } from '../../components/SEO';
import AdSidebar from '../../components/AdSidebar';
import SignInToSaveModal from '../../components/SignInToSaveModal';
import { EDITORS_CHOICE_BADGE_URL, TEN_BEST_BADGE_URL } from '../../constants/badges';
import { getCurrentPeriod, formatExpiration } from '../../utils/dateUtils';
import { parseMsrpMin, calcMonthly, parseTermMonths, AVG_MARKET_APR, AVG_LOAN_TERM, buildSavingsText, getVehicleOffers, offersToIncentives } from '../../utils/dealCalculations';
import type { VehicleOfferSummary } from '../../utils/dealCalculations';
import IncentivesModal, { getAprRangeLabel } from '../../components/IncentivesModal/IncentivesModal';
import type { IncentiveOfferDetail } from '../../components/IncentivesModal/IncentivesModal';
import './TruckDealsPage.css';

interface UnifiedDeal {
  id: string;
  dealType: 'zero-apr' | 'cash' | 'finance' | 'lease';
  vehicleName: string;
  vehicle: { id: string; year: string; make: string; model: string; image: string; slug: string; bodyStyle: string; priceRange: string; staffRating: number; editorsChoice?: boolean; tenBest?: boolean };
  estimatedMonthly: number;
  savingsVsAvg: string;
  savingsTooltip: string;
  dealText: string;
  dealPillIcon: 'percent' | 'dollar' | 'key';
  details: { label: string; value: string }[];
  expirationDate: string;
  programName: string;
  programDescription: string;
  additionalInfo: { icon: string; label: string; value: string }[];
  rating: number;
}

const FAQ_DATA = [
  { question: 'What types of truck deals are available?', answer: 'Truck deals include 0% APR financing, cash-back rebates, special finance rates, and lease specials. Manufacturers adjust these offers monthly based on inventory levels and sales targets.' },
  { question: 'Are truck deals as good as sedan or SUV deals?', answer: 'Trucks are in high demand, so incentives can be smaller than sedans. However, manufacturers still offer competitive deals—especially on outgoing model years or well-stocked trims. Monitoring deals monthly helps you catch the best offers.' },
  { question: 'Can I combine truck incentives?', answer: 'Some manufacturers allow stacking loyalty, military, or first-responder bonuses with a finance or lease offer. However, cash-back and special APR typically cannot be combined. Ask the dealer to compare both scenarios for your situation.' },
  { question: 'When is the best time to buy a truck?', answer: 'End of model year (August–October), holiday weekends, and the end of each quarter often bring the strongest deals. That said, great truck incentives can appear any month—check this page regularly.' },
  { question: 'Do these deals apply to heavy-duty trucks?', answer: 'Most deals listed here apply to light-duty pickups (1500 series). Heavy-duty trucks (2500/3500) sometimes have separate incentive programs with different terms. Check the "Eligible Trims" section of each deal for specifics.' },
];

const TruckDealsPage = () => {
  const { month: CURRENT_MONTH, year: CURRENT_YEAR } = getCurrentPeriod();
  const { getRating: getSupabaseRating } = useSupabaseRatings();
  const { user, isAuthenticated, addSavedVehicle, removeSavedVehicle } = useAuth();
  const [expandedDealId, setExpandedDealId] = useState<string | null>(null);
  const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(null);
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [pendingSaveVehicle, setPendingSaveVehicle] = useState<{ name: string; slug: string; image?: string } | null>(null);
  const [activeDealId, setActiveDealId] = useState<string | null>(null);
  const [offersPopup, setOffersPopup] = useState<{ slug: string; offers: VehicleOfferSummary[] } | null>(null);

  const toggleOffersPopup = useCallback((e: React.MouseEvent, make: string, model: string, slug: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (offersPopup?.slug === slug) {
      setOffersPopup(null);
    } else {
      setOffersPopup({ slug, offers: getVehicleOffers(make, model) });
    }
  }, [offersPopup]);

  const deals = useMemo((): UnifiedDeal[] => {
    const results: UnifiedDeal[] = [];
    const isTruck = (bodyStyle: string) => bodyStyle.toLowerCase() === 'truck';

    for (const d of getZeroAprDeals().filter((d) => isTruck(d.vehicle.bodyStyle))) {
      const msrp = parseMsrpMin(d.vehicle.priceRange);
      const months = parseTermMonths(d.term);
      const monthly = calcMonthly(msrp, 0, months);
      const { savingsVsAvg, savingsTooltip } = buildSavingsText(monthly, d.vehicle.bodyStyle);
      results.push({
        id: d.id, dealType: 'zero-apr', vehicleName: `${d.vehicle.year} ${d.vehicle.make} ${d.vehicle.model}`, vehicle: d.vehicle,
        estimatedMonthly: monthly, savingsVsAvg, savingsTooltip,
        dealText: '0% APR Financing', dealPillIcon: 'percent',
        details: [{ label: 'MSRP Range', value: d.vehicle.priceRange }, { label: 'Term', value: d.term }],
        expirationDate: d.expirationDate, programName: d.programName, programDescription: d.programDescription,
        additionalInfo: [{ icon: 'users', label: 'Target Audience', value: d.targetAudience }, { icon: 'tag', label: 'Eligible Trims', value: d.trimsEligible.join(', ') }],
        rating: getSupabaseRating(d.vehicle.id, getCategory(d.vehicle.bodyStyle), d.vehicle.staffRating),
      });
    }
    for (const d of getCashDeals().filter((d) => isTruck(d.vehicle.bodyStyle))) {
      const msrp = parseMsrpMin(d.vehicle.priceRange);
      const cashAmount = parseInt(d.incentiveValue.replace(/[^0-9]/g, ''), 10) || 0;
      const monthly = calcMonthly(msrp - cashAmount, AVG_MARKET_APR, AVG_LOAN_TERM);
      const { savingsVsAvg, savingsTooltip } = buildSavingsText(monthly, d.vehicle.bodyStyle);
      results.push({
        id: d.id, dealType: 'cash', vehicleName: `${d.vehicle.year} ${d.vehicle.make} ${d.vehicle.model}`, vehicle: d.vehicle,
        estimatedMonthly: monthly, savingsVsAvg, savingsTooltip,
        dealText: `${d.incentiveValue} Cash Back`, dealPillIcon: 'dollar',
        details: [{ label: 'MSRP Range', value: d.vehicle.priceRange }, { label: '% Off MSRP', value: d.percentOffMsrp }],
        expirationDate: d.expirationDate, programName: d.programName, programDescription: d.programDescription,
        additionalInfo: [{ icon: 'tag', label: 'Eligible Trims', value: d.trimsEligible.join(', ') }],
        rating: getSupabaseRating(d.vehicle.id, getCategory(d.vehicle.bodyStyle), d.vehicle.staffRating),
      });
    }
    for (const d of getFinanceDeals().filter((d) => isTruck(d.vehicle.bodyStyle))) {
      const msrp = parseMsrpMin(d.vehicle.priceRange);
      const aprNum = parseFloat(d.apr.replace('%', ''));
      const months = parseTermMonths(d.term);
      const monthly = calcMonthly(msrp, aprNum, months);
      const { savingsVsAvg, savingsTooltip } = buildSavingsText(monthly, d.vehicle.bodyStyle);
      results.push({
        id: d.id, dealType: 'finance', vehicleName: `${d.vehicle.year} ${d.vehicle.make} ${d.vehicle.model}`, vehicle: d.vehicle,
        estimatedMonthly: monthly, savingsVsAvg, savingsTooltip,
        dealText: getAprRangeLabel({ value: `${d.apr} APR`, title: d.programName, terms: d.term }), dealPillIcon: 'percent',
        details: [{ label: 'MSRP Range', value: d.vehicle.priceRange }, { label: 'Term', value: d.term }],
        expirationDate: d.expirationDate, programName: d.programName, programDescription: d.programDescription,
        additionalInfo: [{ icon: 'users', label: 'Target Audience', value: d.targetAudience }, { icon: 'tag', label: 'Eligible Trims', value: d.trimsEligible.join(', ') }],
        rating: getSupabaseRating(d.vehicle.id, getCategory(d.vehicle.bodyStyle), d.vehicle.staffRating),
      });
    }
    for (const d of getLeaseDeals().filter((d) => isTruck(d.vehicle.bodyStyle))) {
      const leaseNum = d.monthlyPaymentNum;
      const { savingsVsAvg, savingsTooltip } = buildSavingsText(leaseNum, d.vehicle.bodyStyle);
      results.push({
        id: d.id, dealType: 'lease', vehicleName: `${d.vehicle.year} ${d.vehicle.make} ${d.vehicle.model}`, vehicle: d.vehicle,
        estimatedMonthly: leaseNum, savingsVsAvg, savingsTooltip,
        dealText: `${d.monthlyPayment}/mo Lease`, dealPillIcon: 'key',
        details: [{ label: 'Term', value: d.term }, { label: 'Due at Signing', value: d.dueAtSigning }],
        expirationDate: d.expirationDate, programName: d.programName, programDescription: d.programDescription,
        additionalInfo: [{ icon: 'tag', label: 'Eligible Trims', value: d.trimsEligible.join(', ') }],
        rating: getSupabaseRating(d.vehicle.id, getCategory(d.vehicle.bodyStyle), d.vehicle.staffRating),
      });
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

  const activeDealObj = activeDealId ? deals.find(d => d.id === activeDealId) : null;
  const activeOffer: Partial<IncentiveOfferDetail> | undefined = activeDealObj
    ? (() => {
        const v = activeDealObj.vehicle;
        const priceParts = v.priceRange.replace(/[^0-9,\-–]/g, '').split(/[-–]/);
        return {
          year: parseInt(v.year, 10), make: v.make, model: v.model, slug: v.slug, imageUrl: v.image,
          msrpMin: parseInt(priceParts[0]?.replace(/,/g, '') || '0', 10),
          msrpMax: parseInt(priceParts[1]?.replace(/,/g, '') || '0', 10),
          offerHeadline: activeDealObj.dealText,
          whatItMeans: `This ${activeDealObj.dealType} offer from the manufacturer could save you significantly on your next truck purchase.`,
          yourSavings: `Check the deal details for specific savings on the ${v.make} ${v.model}.`,
          whoQualifies: activeDealObj.additionalInfo.find(i => i.label === 'Target Audience')?.value || 'Well-qualified buyers with approved credit.',
          eligibleTrims: (activeDealObj.additionalInfo.find(i => i.label === 'Eligible Trims')?.value || '').split(', ').filter(Boolean),
          dontWaitText: `This offer expires ${formatExpiration(activeDealObj.expirationDate)}. Manufacturer deals change monthly—once it's gone, there's no guarantee it'll come back.`,
          eventLabel: activeDealObj.programName,
          expirationDate: activeDealObj.expirationDate,
        };
      })()
    : undefined;

  const pageTitle = `Best Truck Deals & Incentives for ${CURRENT_MONTH} ${CURRENT_YEAR}`;
  const BASE_URL = 'https://www.caranddriver.com';

  return (
    <div className="truck-deals-page">
      <SEO title={pageTitle} description={`Find the best truck deals for ${CURRENT_MONTH} ${CURRENT_YEAR}. Compare 0% APR, cash-back, finance, and lease offers on pickup trucks. Expert ratings from Car and Driver.`} canonical={`${BASE_URL}/deals/truck`} keywords={['truck deals', 'pickup truck deals', `truck deals ${CURRENT_MONTH} ${CURRENT_YEAR}`, 'best truck incentives', 'truck lease deals', 'truck cash back']} structuredData={[createBreadcrumbStructuredData([{ name: 'Home', url: BASE_URL }, { name: 'Deals', url: `${BASE_URL}/deals` }, { name: 'Truck Deals', url: `${BASE_URL}/deals/truck` }]), createFAQStructuredData(FAQ_DATA)]} noIndex={deals.length === 0} />
      <div className="truck-deals-page__hero">
        <div className="container">
          <div className="truck-deals-page__hero-content">
            <div className="truck-deals-page__hero-badge"><Car size={16} /><span>Truck Deals</span></div>
            <nav className="truck-deals-page__breadcrumb" aria-label="Breadcrumb">
              <Link to="/">Home</Link>
              <span className="truck-deals-page__breadcrumb-sep">/</span>
              <Link to="/deals">Deals</Link>
              <span className="truck-deals-page__breadcrumb-sep">/</span>
              <span>Truck Deals</span>
            </nav>
            <h1 className="truck-deals-page__title">{pageTitle}</h1>
            <p className="truck-deals-page__description">Every current incentive on pickup trucks—0% APR financing, cash-back rebates, special finance rates, and lease specials. Paired with Car and Driver expert ratings to help you find the best truck at the best price.</p>
            <div className="truck-deals-page__hero-stats">
              <div className="truck-deals-page__hero-stat"><span className="truck-deals-page__hero-stat-value">{deals.length}</span><span className="truck-deals-page__hero-stat-label">Truck Deals</span></div>
              <div className="truck-deals-page__hero-stat"><span className="truck-deals-page__hero-stat-value">{CURRENT_MONTH}</span><span className="truck-deals-page__hero-stat-label">{CURRENT_YEAR} Deals</span></div>
            </div>
          </div>
        </div>
      </div>
      <div className="truck-deals-page__content">
        <div className="container">
          <div className="truck-deals-page__layout">
            <div className="truck-deals-page__main">
              <section className="truck-deals-page__section">
                <h2 className="truck-deals-page__section-title"><Car size={22} /> {deals.length} Available Deals</h2>
                <div className="truck-deals-page__grid">
                  {deals.map((deal) => {
                    const saved = isVehicleSaved(deal.vehicleName);
                    const isExpanded = expandedDealId === deal.id;
                    return (
                      <div key={deal.id} className="truck-deals-page__card">
                        <div className="truck-deals-page__card-header">
                          <Link to={`/${deal.vehicle.slug}`} className="truck-deals-page__card-name-link">
                            <h3 className="truck-deals-page__card-name">{deal.vehicleName}</h3>
                          </Link>
                          <div className="truck-deals-page__card-rating">
                            <span className="truck-deals-page__card-rating-value">{deal.rating}</span>
                            <span className="truck-deals-page__card-rating-max">/10</span>
                            <span className="truck-deals-page__card-rating-label">C/D Rating</span>
                          </div>
                        </div>

                        <Link to={`/${deal.vehicle.slug}`} className="truck-deals-page__card-image-link">
                          <div className="truck-deals-page__card-image-container">
                            <img src={deal.vehicle.image} alt={deal.vehicleName} className="truck-deals-page__card-image" />
                            <button
                              className={`truck-deals-page__card-save ${saved ? 'truck-deals-page__card-save--saved' : ''}`}
                              onClick={(e) => handleSaveClick(e, { name: deal.vehicleName, slug: deal.vehicle.slug, image: deal.vehicle.image })}
                              aria-label={saved ? 'Remove from favorites' : 'Add to favorites'}
                            >
                              <Heart size={16} fill={saved ? 'currentColor' : 'none'} />
                            </button>
                            {(() => {
                              const allOffers = getVehicleOffers(deal.vehicle.make, deal.vehicle.model);
                              if (allOffers.length > 1) return (
                                <button
                                  type="button"
                                  className="truck-deals-page__card-offers-tag"
                                  onClick={(e) => toggleOffersPopup(e, deal.vehicle.make, deal.vehicle.model, deal.vehicle.slug)}
                                >
                                  {allOffers.length} Offers Available
                                </button>
                              );
                              return null;
                            })()}
                            {offersPopup?.slug === deal.vehicle.slug && (
                              <div className="truck-deals-page__card-offers-popup">
                                <div className="truck-deals-page__card-offers-popup-header">
                                  <strong>{offersPopup.offers.length} Available Offers</strong>
                                  <button type="button" className="truck-deals-page__card-offers-popup-close" onClick={(e) => { e.preventDefault(); e.stopPropagation(); setOffersPopup(null); }}>&times;</button>
                                </div>
                                <ul className="truck-deals-page__card-offers-popup-list">
                                  {offersPopup.offers.map((o, idx) => (
                                    <li key={idx} className="truck-deals-page__card-offers-popup-item">
                                      <span className={`truck-deals-page__card-offers-popup-type truck-deals-page__card-offers-popup-type--${o.type}`}>
                                        {o.type === 'zero-apr' ? '0% APR' : o.type === 'cash' ? 'Cash' : o.type === 'finance' ? 'Finance' : 'Lease'}
                                      </span>
                                      <span className="truck-deals-page__card-offers-popup-label">{o.label}</span>
                                      <span className="truck-deals-page__card-offers-popup-exp">expires {formatExpiration(o.expires)}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                            {(deal.vehicle.editorsChoice || deal.vehicle.tenBest) && (
                              <div className="truck-deals-page__card-badges">
                                {deal.vehicle.tenBest && <img src={TEN_BEST_BADGE_URL} alt="10Best" className="truck-deals-page__card-badge-img" />}
                                {deal.vehicle.editorsChoice && <img src={EDITORS_CHOICE_BADGE_URL} alt="Editors' Choice" className="truck-deals-page__card-badge-img" />}
                              </div>
                            )}
                          </div>
                        </Link>

                        <div className="truck-deals-page__card-body">
                          <div className="truck-deals-page__card-payment-block">
                            <div className="truck-deals-page__card-payment">
                              <span className="truck-deals-page__card-payment-amount">${deal.estimatedMonthly}</span>
                              <span className="truck-deals-page__card-payment-period">{deal.dealType === 'lease' ? '/mo' : '/mo*'}</span>
                            </div>
                            <span className="truck-deals-page__card-payment-savings">
                              {deal.savingsVsAvg}
                              <span className="truck-deals-page__card-tooltip-wrap">
                                <Info size={13} className="truck-deals-page__card-tooltip-icon" />
                                <span className="truck-deals-page__card-tooltip">{deal.savingsTooltip}</span>
                              </span>
                            </span>
                          </div>

                          <button className="truck-deals-page__card-deal-pill" onClick={(e) => { e.preventDefault(); e.stopPropagation(); setActiveDealId(deal.id); }}>
                            <span className="truck-deals-page__card-deal-pill-chip">{deal.dealType === 'lease' ? 'Lease' : 'Finance'}</span>
                            <span className="truck-deals-page__card-deal-pill-text">{deal.dealText}</span>
                            <span className="truck-deals-page__card-deal-pill-divider" />
                            <span className="truck-deals-page__card-deal-pill-expires">expires {formatExpiration(deal.expirationDate)}</span>
                          </button>

                          <div className="truck-deals-page__card-details">
                            {deal.details.map((d, i) => (
                              <div key={i} className="truck-deals-page__card-detail">
                                <span className="truck-deals-page__card-detail-label">{d.label}</span>
                                <span className="truck-deals-page__card-detail-value">{d.value}</span>
                              </div>
                            ))}
                          </div>

                          <button type="button" className="truck-deals-page__card-cta" onClick={() => setActiveDealId(deal.id)}>Get This Deal</button>

                          <button className="truck-deals-page__card-toggle" onClick={() => setExpandedDealId(isExpanded ? null : deal.id)} aria-expanded={isExpanded}>
                            <span>Additional Details</span>{isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                          </button>
                          {isExpanded && (
                            <div className="truck-deals-page__card-additional">
                              <div className="truck-deals-page__card-additional-item"><Info size={16} /><div><strong>{deal.programName}</strong><p>{deal.programDescription}</p></div></div>
                              {deal.additionalInfo.map((info, i) => (
                                <div key={i} className="truck-deals-page__card-additional-item">
                                  {info.icon === 'users' ? <Users size={16} /> : <Tag size={16} />}
                                  <div><strong>{info.label}</strong><p>{info.value}</p></div>
                                </div>
                              ))}
                              <div className="truck-deals-page__card-additional-item"><Clock size={16} /><div><strong>Offer Expires</strong><p>{formatExpiration(deal.expirationDate)}</p></div></div>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                  {deals.length === 0 && (
                    <div className="truck-deals-page__empty-state">
                      <p className="truck-deals-page__empty-state-text">
                        There are currently no active truck offers. Check back soon or explore other available deals.
                      </p>
                      <Link to="/deals" className="truck-deals-page__empty-state-link">
                        Browse All Deals
                      </Link>
                    </div>
                  )}
                </div>
              </section>
              <section className="truck-deals-page__faq-section">
                <h2 className="truck-deals-page__section-title"><Info size={22} /> Frequently Asked Questions About Truck Deals</h2>
                <div className="truck-deals-page__faq-list">
                  {FAQ_DATA.map((faq, i) => (
                    <div key={i} className={`truck-deals-page__faq-item ${expandedFaqIndex === i ? 'truck-deals-page__faq-item--expanded' : ''}`}>
                      <button className="truck-deals-page__faq-question" onClick={() => setExpandedFaqIndex(expandedFaqIndex === i ? null : i)} aria-expanded={expandedFaqIndex === i}>
                        <span>{faq.question}</span>{expandedFaqIndex === i ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                      </button>
                      {expandedFaqIndex === i && <div className="truck-deals-page__faq-answer"><p>{faq.answer}</p></div>}
                    </div>
                  ))}
                </div>
              </section>
              <section className="truck-deals-page__links-section">
                <h2 className="truck-deals-page__section-title">Explore More</h2>
                <div className="truck-deals-page__links-grid">
                  <Link to="/deals" className="truck-deals-page__link-card"><h3>All Deals</h3><p>Browse every current deal</p></Link>
                  <Link to="/deals/zero-apr" className="truck-deals-page__link-card"><h3>0% APR Deals</h3><p>Zero-interest financing offers</p></Link>
                  <Link to="/deals/suv" className="truck-deals-page__link-card"><h3>SUV Deals</h3><p>Best deals on SUVs and crossovers</p></Link>
                  <Link to="/deals/lease" className="truck-deals-page__link-card"><h3>Lease Deals</h3><p>Monthly lease specials</p></Link>
                  <Link to="/rankings/truck" className="truck-deals-page__link-card"><h3>Truck Rankings</h3><p>Expert-ranked pickup trucks</p></Link>
                  <Link to="/deals/cash-finance" className="truck-deals-page__link-card"><h3>Cash & Finance</h3><p>Cash-back and APR offers</p></Link>
                </div>
              </section>
            </div>
            <aside className="truck-deals-page__sidebar"><AdSidebar /></aside>
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
    </div>
  );
};

export default TruckDealsPage;
