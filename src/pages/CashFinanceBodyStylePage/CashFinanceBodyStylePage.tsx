import { useCallback, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronUp, Heart, Info, Tag, Users, Clock, Percent, CarFront, Truck, Car } from 'lucide-react';
import { getFinanceDeals } from '../../services/cashFinanceDealsService';
import { useSupabaseRatings, getCategory } from '../../hooks/useSupabaseRating';
import { useAuth } from '../../contexts/AuthContext';
import { SEO, createBreadcrumbStructuredData, createFAQStructuredData } from '../../components/SEO';
import AdSidebar from '../../components/AdSidebar';
import SignInToSaveModal from '../../components/SignInToSaveModal';
import { EDITORS_CHOICE_BADGE_URL, TEN_BEST_BADGE_URL } from '../../constants/badges';
import { getCurrentPeriod } from '../../utils/dateUtils';
import { parseMsrpMin, calcMonthly, parseTermMonths, buildSavingsText, getVehicleOffers, offersToIncentives } from '../../utils/dealCalculations';
import type { VehicleOfferSummary } from '../../utils/dealCalculations';
import IncentivesModal from '../../components/IncentivesModal/IncentivesModal';
import type { IncentiveOfferDetail } from '../../components/IncentivesModal/IncentivesModal';
import './CashFinanceBodyStylePage.css';

type BodyTab = 'all' | 'suv' | 'sedan' | 'truck' | 'coupe' | 'hatchback';

interface UnifiedDeal {
  id: string;
  dealType: 'cash' | 'finance';
  bodyStyle: string;
  vehicleName: string;
  vehicle: { id: string; year: string; make: string; model: string; image: string; slug: string; bodyStyle: string; fuelType: string; priceRange: string; staffRating: number; editorsChoice?: boolean; tenBest?: boolean };
  estimatedMonthly: number;
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
  { question: 'What types of finance deals are available by body style?', answer: 'Manufacturers offer special APR and financing terms across all body styles—SUVs, sedans, trucks, coupes, and hatchbacks. Rates and terms vary by model and often by trim level.' },
  { question: 'Do SUVs get better finance offers than sedans?', answer: 'It depends on market demand and manufacturer strategy. Popular models may have less aggressive APR promotions, while slower-selling vehicles sometimes get stronger financing incentives regardless of body style.' },
  { question: 'Can I stack other discounts with a finance offer?', answer: 'Some manufacturers allow loyalty, conquest, or military incentives alongside a promotional APR. Terms vary by brand—ask the dealer which programs you qualify for and how they affect your payment.' },
  { question: 'How often do these deals change?', answer: 'Manufacturer incentives typically rotate monthly. We update this page as new deals become available, so check back at the start of each month for the latest offers.' },
  { question: 'Are truck finance deals different from car deals?', answer: 'Promotional APRs and terms follow similar patterns, but loan amounts and monthly payments often differ because trucks can carry higher MSRPs. Compare the rate, term, and payment on the specific vehicle you are considering.' },
];

const CashFinanceBodyStylePage = () => {
  const { month: CURRENT_MONTH, year: CURRENT_YEAR } = getCurrentPeriod();
  const { getRating: getSupabaseRating } = useSupabaseRatings();
  const { user, isAuthenticated, addSavedVehicle, removeSavedVehicle } = useAuth();
  const [activeTab, setActiveTab] = useState<BodyTab>('all');
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

  const allDeals = useMemo((): UnifiedDeal[] => {
    const results: UnifiedDeal[] = [];

    for (const d of getFinanceDeals()) {
      const msrp = parseMsrpMin(d.vehicle.priceRange);
      const aprNum = parseFloat(d.apr.replace('%', ''));
      const months = parseTermMonths(d.term);
      const monthly = calcMonthly(msrp, aprNum, months);
      const { savingsVsAvg, savingsTooltip } = buildSavingsText(monthly, d.vehicle.bodyStyle);
      results.push({
        id: d.id, dealType: 'finance', bodyStyle: d.vehicle.bodyStyle, vehicleName: `${d.vehicle.year} ${d.vehicle.make} ${d.vehicle.model}`, vehicle: d.vehicle,
        estimatedMonthly: monthly, savingsVsAvg, savingsTooltip,
        dealText: `${d.apr} APR for ${d.term}`, dealPillIcon: 'percent',
        details: [{ label: 'MSRP Range', value: d.vehicle.priceRange }, { label: 'Term', value: d.term }, { label: 'Body Style', value: d.vehicle.bodyStyle }],
        expirationDate: d.expirationDate, programName: d.programName, programDescription: d.programDescription,
        additionalInfo: [{ icon: 'users', label: 'Target Audience', value: d.targetAudience }, { icon: 'tag', label: 'Eligible Trims', value: d.trimsEligible.join(', ') }],
        rating: getSupabaseRating(d.vehicle.id, getCategory(d.vehicle.bodyStyle), d.vehicle.staffRating),
      });
    }
    return results;
  }, [getSupabaseRating]);

  const tabMatcher = BODY_TABS.find(t => t.key === activeTab)?.match || (() => true);
  const deals = useMemo(() => allDeals.filter(d => tabMatcher(d.bodyStyle)), [allDeals, activeTab]);

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
          whatItMeans: 'A below-market interest rate from the manufacturer that lowers your monthly payment and total cost.',
          yourSavings: `Check the deal details for specific savings on the ${v.make} ${v.model}.`,
          whoQualifies: activeDealObj.additionalInfo.find(i => i.label === 'Target Audience')?.value || 'All buyers qualify with approved credit.',
          eligibleTrims: (activeDealObj.additionalInfo.find(i => i.label === 'Eligible Trims')?.value || '').split(', ').filter(Boolean),
          dontWaitText: `This offer expires ${activeDealObj.expirationDate}. Manufacturer deals change monthly—once it's gone, there's no guarantee it'll come back.`,
          eventLabel: activeDealObj.programName,
          expirationDate: activeDealObj.expirationDate,
        };
      })()
    : undefined;

  const tabLabel = activeTab === 'all' ? '' : BODY_TABS.find(t => t.key === activeTab)?.label || '';
  const emptyBodyCategory =
    activeTab === 'all' ? 'body style' : BODY_TABS.find(t => t.key === activeTab)?.label.toLowerCase() || 'body style';
  const pageTitle = `Finance Deals by Body Style – ${CURRENT_MONTH} ${CURRENT_YEAR}`;
  const BASE_URL = 'https://www.caranddriver.com';

  return (
    <div className="cfbs-deals">
      <SEO
        title={pageTitle}
        description={`Browse manufacturer finance deals by body style for ${CURRENT_MONTH} ${CURRENT_YEAR}. Filter by SUV, sedan, truck, coupe, and more. Expert ratings from Car and Driver.`}
        canonical={`${BASE_URL}/deals/cash-finance-body-style`}
        keywords={['finance deals by body style', 'finance deals SUV', 'sedan finance deals', 'truck finance deals', `car deals ${CURRENT_MONTH} ${CURRENT_YEAR}`]}
        structuredData={[
          createBreadcrumbStructuredData([{ name: 'Home', url: BASE_URL }, { name: 'Deals', url: `${BASE_URL}/deals` }, { name: 'Finance by Body Style', url: `${BASE_URL}/deals/cash-finance-body-style` }]),
          createFAQStructuredData(FAQ_DATA),
        ]}
        noIndex={allDeals.length === 0}
      />

      <div className="cfbs-deals__hero">
        <div className="container">
          <div className="cfbs-deals__hero-content">
            <div className="cfbs-deals__hero-badge"><Percent size={16} /><span>Finance Deals by Body Style</span></div>
            <nav className="cfbs-deals__breadcrumb" aria-label="Breadcrumb">
              <Link to="/">Home</Link>
              <span className="cfbs-deals__breadcrumb-sep">/</span>
              <Link to="/deals">Deals</Link>
              <span className="cfbs-deals__breadcrumb-sep">/</span>
              <span>Finance by Body Style</span>
            </nav>
            <h1 className="cfbs-deals__title">{pageTitle}</h1>
            <p className="cfbs-deals__description">
              Special finance rates organized by body style. Whether you're shopping for an SUV, sedan, truck, or coupe, find the best manufacturer incentives paired with Car and Driver expert ratings.
            </p>
            <div className="cfbs-deals__hero-stats">
              <div className="cfbs-deals__hero-stat"><span className="cfbs-deals__hero-stat-value">{allDeals.length}</span><span className="cfbs-deals__hero-stat-label">Total Deals</span></div>
              <div className="cfbs-deals__hero-stat"><span className="cfbs-deals__hero-stat-value">{tabCounts.suv}</span><span className="cfbs-deals__hero-stat-label">SUV Deals</span></div>
              <div className="cfbs-deals__hero-stat"><span className="cfbs-deals__hero-stat-value">{tabCounts.truck}</span><span className="cfbs-deals__hero-stat-label">Truck Deals</span></div>
              <div className="cfbs-deals__hero-stat"><span className="cfbs-deals__hero-stat-value">{CURRENT_MONTH}</span><span className="cfbs-deals__hero-stat-label">{CURRENT_YEAR} Deals</span></div>
            </div>
          </div>
        </div>
      </div>

      <div className="cfbs-deals__content">
        <div className="container">
          <div className="cfbs-deals__layout">
            <div className="cfbs-deals__main">
              <div className="cfbs-deals__tabs" role="tablist">
                {BODY_TABS.map(t => (
                  <button
                    key={t.key}
                    type="button"
                    role="tab"
                    aria-selected={activeTab === t.key}
                    className={`cfbs-deals__tab ${activeTab === t.key ? 'cfbs-deals__tab--active' : ''} ${tabCounts[t.key] === 0 && t.key !== 'all' ? 'cfbs-deals__tab--empty' : ''}`}
                    onClick={() => setActiveTab(t.key)}
                  >
                    {t.icon}
                    <span>{t.label}</span>
                    <span className="cfbs-deals__tab-count">{tabCounts[t.key]}</span>
                  </button>
                ))}
              </div>

              <section className="cfbs-deals__section">
                <h2 className="cfbs-deals__section-title">
                  <Percent size={22} /> {deals.length} {tabLabel || 'Available'} Deal{deals.length !== 1 ? 's' : ''}
                </h2>
                <div className="cfbs-deals__grid">
                  {deals.map((deal) => {
                    const saved = isVehicleSaved(deal.vehicleName);
                    const isExpanded = expandedDealId === deal.id;
                    return (
                      <div key={deal.id} className="cfbs-deals__card">
                        <div className="cfbs-deals__card-header">
                          <Link to={`/${deal.vehicle.slug}`} className="cfbs-deals__card-name-link">
                            <h3 className="cfbs-deals__card-name">{deal.vehicleName}</h3>
                          </Link>
                          <div className="cfbs-deals__card-rating">
                            <span className="cfbs-deals__card-rating-value">{deal.rating}</span>
                            <span className="cfbs-deals__card-rating-max">/10</span>
                            <span className="cfbs-deals__card-rating-label">C/D Rating</span>
                          </div>
                        </div>

                        <Link to={`/${deal.vehicle.slug}`} className="cfbs-deals__card-image-link">
                          <div className="cfbs-deals__card-image-container">
                            <img src={deal.vehicle.image} alt={deal.vehicleName} className="cfbs-deals__card-image" />
                            <span className="cfbs-deals__card-body-badge">{deal.bodyStyle}</span>
                            <button
                              className={`cfbs-deals__card-save ${saved ? 'cfbs-deals__card-save--saved' : ''}`}
                              onClick={(e) => handleSaveClick(e, { name: deal.vehicleName, slug: deal.vehicle.slug, image: deal.vehicle.image })}
                              aria-label={saved ? 'Remove from favorites' : 'Add to favorites'}
                            >
                              <Heart size={16} fill={saved ? 'currentColor' : 'none'} />
                            </button>
                            {(() => {
                              const allOffers = getVehicleOffers(deal.vehicle.make, deal.vehicle.model);
                              if (allOffers.length > 1) return (
                                <button type="button" className="cfbs-deals__card-offers-tag" onClick={(e) => toggleOffersPopup(e, deal.vehicle.make, deal.vehicle.model, deal.vehicle.slug)}>
                                  {allOffers.length} Offers Available
                                </button>
                              );
                              return null;
                            })()}
                            {offersPopup?.slug === deal.vehicle.slug && (
                              <div className="cfbs-deals__card-offers-popup">
                                <div className="cfbs-deals__card-offers-popup-header">
                                  <strong>{offersPopup.offers.length} Available Offers</strong>
                                  <button type="button" className="cfbs-deals__card-offers-popup-close" onClick={(e) => { e.preventDefault(); e.stopPropagation(); setOffersPopup(null); }}>&times;</button>
                                </div>
                                <ul className="cfbs-deals__card-offers-popup-list">
                                  {offersPopup.offers.map((o, idx) => (
                                    <li key={idx} className="cfbs-deals__card-offers-popup-item">
                                      <span className={`cfbs-deals__card-offers-popup-type cfbs-deals__card-offers-popup-type--${o.type}`}>
                                        {o.type === 'zero-apr' ? '0% APR' : o.type === 'cash' ? 'Cash' : o.type === 'finance' ? 'Finance' : 'Lease'}
                                      </span>
                                      <span className="cfbs-deals__card-offers-popup-label">{o.label}</span>
                                      <span className="cfbs-deals__card-offers-popup-exp">exp {o.expires}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                            {(deal.vehicle.editorsChoice || deal.vehicle.tenBest) && (
                              <div className="cfbs-deals__card-badges">
                                {deal.vehicle.tenBest && <img src={TEN_BEST_BADGE_URL} alt="10Best" className="cfbs-deals__card-badge-img" />}
                                {deal.vehicle.editorsChoice && <img src={EDITORS_CHOICE_BADGE_URL} alt="Editors' Choice" className="cfbs-deals__card-badge-img" />}
                              </div>
                            )}
                          </div>
                        </Link>

                        <div className="cfbs-deals__card-body">
                          <div className="cfbs-deals__card-payment-block">
                            <div className="cfbs-deals__card-payment">
                              <span className="cfbs-deals__card-payment-amount">${deal.estimatedMonthly}</span>
                              <span className="cfbs-deals__card-payment-period">/mo*</span>
                            </div>
                            <span className="cfbs-deals__card-payment-savings">
                              {deal.savingsVsAvg}
                              <span className="cfbs-deals__card-tooltip-wrap">
                                <Info size={13} className="cfbs-deals__card-tooltip-icon" />
                                <span className="cfbs-deals__card-tooltip">{deal.savingsTooltip}</span>
                              </span>
                            </span>
                          </div>

                          <button className="cfbs-deals__card-deal-pill" onClick={(e) => { e.preventDefault(); e.stopPropagation(); setActiveDealId(deal.id); }}>
                            <span className="cfbs-deals__card-deal-pill-chip">Buy</span>
                            <span className="cfbs-deals__card-deal-pill-text">{deal.dealText}</span>
                            <span className="cfbs-deals__card-deal-pill-divider" />
                            <span className="cfbs-deals__card-deal-pill-expires">expires {deal.expirationDate}</span>
                          </button>

                          <div className="cfbs-deals__card-details">
                            {deal.details.map((d, i) => (
                              <div key={i} className="cfbs-deals__card-detail">
                                <span className="cfbs-deals__card-detail-label">{d.label}</span>
                                <span className="cfbs-deals__card-detail-value">{d.value}</span>
                              </div>
                            ))}
                          </div>

                          <button type="button" className="cfbs-deals__card-cta" onClick={() => setActiveDealId(deal.id)}>Get This Deal</button>

                          <button className="cfbs-deals__card-toggle" onClick={() => setExpandedDealId(isExpanded ? null : deal.id)} aria-expanded={isExpanded}>
                            <span>Additional Details</span>{isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                          </button>
                          {isExpanded && (
                            <div className="cfbs-deals__card-additional">
                              <div className="cfbs-deals__card-additional-item"><Info size={16} /><div><strong>{deal.programName}</strong><p>{deal.programDescription}</p></div></div>
                              {deal.additionalInfo.map((info, i) => (
                                <div key={i} className="cfbs-deals__card-additional-item">
                                  {info.icon === 'users' ? <Users size={16} /> : info.icon === 'tag' ? <Tag size={16} /> : <Clock size={16} />}
                                  <div><strong>{info.label}</strong><p>{info.value}</p></div>
                                </div>
                              ))}
                              <div className="cfbs-deals__card-additional-item"><Clock size={16} /><div><strong>Offer Expires</strong><p>{deal.expirationDate}</p></div></div>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                  {deals.length === 0 && (
                    <div className="cfbs-deals__empty-state">
                      <p className="cfbs-deals__empty-state-text">
                        There are currently no active {emptyBodyCategory} offers. Check back soon or explore other available deals.
                      </p>
                      <Link to="/deals" className="cfbs-deals__empty-state-link">
                        Browse All Deals
                      </Link>
                    </div>
                  )}
                </div>
              </section>

              <section className="cfbs-deals__faq-section">
                <h2 className="cfbs-deals__section-title"><Info size={22} /> Frequently Asked Questions</h2>
                <div className="cfbs-deals__faq-list">
                  {FAQ_DATA.map((faq, i) => (
                    <div key={i} className={`cfbs-deals__faq-item ${expandedFaqIndex === i ? 'cfbs-deals__faq-item--expanded' : ''}`}>
                      <button className="cfbs-deals__faq-question" onClick={() => setExpandedFaqIndex(expandedFaqIndex === i ? null : i)} aria-expanded={expandedFaqIndex === i}>
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
                  <Link to="/deals/cash-finance" className="cfbs-deals__link-card"><h3>Finance Deals</h3><p>APR and special finance offers</p></Link>
                  <Link to="/deals/zero-apr" className="cfbs-deals__link-card"><h3>0% APR Deals</h3><p>Zero-interest financing</p></Link>
                  <Link to="/deals/lease" className="cfbs-deals__link-card"><h3>Lease Deals</h3><p>Monthly lease specials</p></Link>
                  <Link to="/deals/fuel-type" className="cfbs-deals__link-card"><h3>Fuel Type Deals</h3><p>Deals by powertrain</p></Link>
                  <Link to="/deals/suv" className="cfbs-deals__link-card"><h3>SUV Deals</h3><p>Best deals on SUVs</p></Link>
                </div>
              </section>
            </div>
            <aside className="cfbs-deals__sidebar"><AdSidebar /></aside>
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

export default CashFinanceBodyStylePage;
