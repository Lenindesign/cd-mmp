import { useCallback, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronUp, Heart, Info, Tag, Clock, Users, Fuel, Zap, Leaf, Droplets } from 'lucide-react';
import { getZeroAprDeals } from '../../services/zeroAprDealsService';
import { getFinanceDeals, getCashDeals } from '../../services/cashFinanceDealsService';
import { getLeaseDeals } from '../../services/leaseDealsService';
import { useSupabaseRatings, getCategory } from '../../hooks/useSupabaseRating';
import { useAuth } from '../../contexts/AuthContext';
import { SEO, createBreadcrumbStructuredData, createFAQStructuredData } from '../../components/SEO';
import AdSidebar from '../../components/AdSidebar';
import SignInToSaveModal from '../../components/SignInToSaveModal';
import { EDITORS_CHOICE_BADGE_URL, TEN_BEST_BADGE_URL } from '../../constants/badges';
import { getCurrentPeriod, formatExpiration } from '../../utils/dateUtils';
import { parseMsrpMin, calcMonthly, parseTermMonths, buildSavingsText, getVehicleOffers, offersToIncentives } from '../../utils/dealCalculations';
import type { VehicleOfferSummary } from '../../utils/dealCalculations';
import IncentivesModal, { getAprRangeLabel } from '../../components/IncentivesModal/IncentivesModal';
import type { IncentiveOfferDetail } from '../../components/IncentivesModal/IncentivesModal';
import './FuelTypeDealsPage.css';

type FuelTab = 'all' | 'gas' | 'hybrid' | 'electric' | 'diesel';

interface UnifiedDeal {
  id: string;
  dealType: 'zero-apr' | 'finance' | 'lease' | 'cash';
  fuelType: string;
  vehicleName: string;
  vehicle: { id: string; year: string; make: string; model: string; image: string; slug: string; bodyStyle: string; fuelType: string; priceRange: string; staffRating: number; editorsChoice?: boolean; tenBest?: boolean };
  estimatedMonthly: number;
  savingsVsAvg: string;
  savingsTooltip: string;
  dealText: string;
  dealPillIcon: 'percent' | 'key';
  details: { label: string; value: string }[];
  expirationDate: string;
  programName: string;
  programDescription: string;
  additionalInfo: { icon: string; label: string; value: string }[];
  rating: number;
  incentiveValue?: string;
  percentOffMsrp?: string;
}

const FUEL_TABS: { key: FuelTab; label: string; icon: React.ReactNode; match: (ft: string) => boolean }[] = [
  { key: 'all', label: 'All', icon: <Fuel size={16} />, match: () => true },
  { key: 'gas', label: 'Gas', icon: <Fuel size={16} />, match: (ft) => ft === 'Gas' },
  { key: 'hybrid', label: 'Hybrid', icon: <Leaf size={16} />, match: (ft) => ft === 'Hybrid' || ft === 'Plug-in Hybrid' || ft === 'Plug-In Hybrid' },
  { key: 'electric', label: 'Electric', icon: <Zap size={16} />, match: (ft) => ft === 'Electric' },
  { key: 'diesel', label: 'Diesel', icon: <Droplets size={16} />, match: (ft) => ft === 'Diesel' },
];

const FAQ_DATA = [
  { question: 'Are there special deals on electric vehicles?', answer: 'Yes. Many manufacturers offer special incentives on EVs including reduced APR financing, lease specials, and cash rebates. Additionally, federal tax credits of up to $7,500 and various state incentives may apply on top of manufacturer deals.' },
  { question: 'Do hybrid vehicles get the same deals as gas models?', answer: 'Hybrid trims sometimes qualify for the same manufacturer incentives as their gas counterparts, but they may also have separate hybrid-specific offers. Check the "Eligible Trims" section of each deal to confirm.' },
  { question: 'Can I combine fuel-type incentives with other deals?', answer: 'It depends on the manufacturer. Some allow stacking EV tax credits with manufacturer financing, while others require choosing between different incentives and special APR. Always ask the dealer to run both scenarios.' },
  { question: 'When do EV and hybrid deals change?', answer: 'Manufacturer incentives typically rotate monthly. Federal tax credits are set by legislation and change less frequently. We update this page as new deals become available.' },
  { question: 'Are diesel vehicle deals common?', answer: 'Diesel deals are less common than gas or hybrid offers since fewer manufacturers sell diesel passenger vehicles in the US. When available, they tend to appear on trucks and SUVs.' },
];

const FuelTypeDealsPage = () => {
  const { month: CURRENT_MONTH, year: CURRENT_YEAR } = getCurrentPeriod();
  const { getRating: getSupabaseRating } = useSupabaseRatings();
  const { user, isAuthenticated, addSavedVehicle, removeSavedVehicle } = useAuth();
  const [activeTab, setActiveTab] = useState<FuelTab>('all');
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

    for (const d of getZeroAprDeals()) {
      const msrp = parseMsrpMin(d.vehicle.priceRange);
      const months = parseTermMonths(d.term);
      const monthly = calcMonthly(msrp, 0, months);
      const { savingsVsAvg, savingsTooltip } = buildSavingsText(monthly, d.vehicle.bodyStyle);
      results.push({
        id: d.id, dealType: 'zero-apr', fuelType: d.vehicle.fuelType, vehicleName: `${d.vehicle.year} ${d.vehicle.make} ${d.vehicle.model}`, vehicle: d.vehicle,
        estimatedMonthly: monthly, savingsVsAvg, savingsTooltip,
        dealText: '0% APR Financing', dealPillIcon: 'percent',
        details: [{ label: 'MSRP Range', value: d.vehicle.priceRange }, { label: 'Term', value: d.term }, { label: 'Fuel Type', value: d.vehicle.fuelType }],
        expirationDate: d.expirationDate, programName: d.programName, programDescription: d.programDescription,
        additionalInfo: [{ icon: 'users', label: 'Target Audience', value: d.targetAudience }, { icon: 'tag', label: 'Eligible Trims', value: d.trimsEligible.join(', ') }],
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
        id: d.id, dealType: 'finance', fuelType: d.vehicle.fuelType, vehicleName: `${d.vehicle.year} ${d.vehicle.make} ${d.vehicle.model}`, vehicle: d.vehicle,
        estimatedMonthly: monthly, savingsVsAvg, savingsTooltip,
        dealText: getAprRangeLabel({ value: `${d.apr} APR`, title: d.programName, terms: d.term }), dealPillIcon: 'percent',
        details: [{ label: 'MSRP Range', value: d.vehicle.priceRange }, { label: 'Term', value: d.term }, { label: 'Fuel Type', value: d.vehicle.fuelType }],
        expirationDate: d.expirationDate, programName: d.programName, programDescription: d.programDescription,
        additionalInfo: [{ icon: 'users', label: 'Target Audience', value: d.targetAudience }, { icon: 'tag', label: 'Eligible Trims', value: d.trimsEligible.join(', ') }],
        rating: getSupabaseRating(d.vehicle.id, getCategory(d.vehicle.bodyStyle), d.vehicle.staffRating),
      });
    }
    for (const d of getLeaseDeals()) {
      const leaseNum = d.monthlyPaymentNum;
      const { savingsVsAvg, savingsTooltip } = buildSavingsText(leaseNum, d.vehicle.bodyStyle);
      results.push({
        id: d.id, dealType: 'lease', fuelType: d.vehicle.fuelType, vehicleName: `${d.vehicle.year} ${d.vehicle.make} ${d.vehicle.model}`, vehicle: d.vehicle,
        estimatedMonthly: leaseNum, savingsVsAvg, savingsTooltip,
        dealText: `${d.monthlyPayment}/mo Lease`, dealPillIcon: 'key',
        details: [{ label: 'Term', value: d.term }, { label: 'Due at Signing', value: d.dueAtSigning }, { label: 'Fuel Type', value: d.vehicle.fuelType }],
        expirationDate: d.expirationDate, programName: d.programName, programDescription: d.programDescription,
        additionalInfo: [{ icon: 'tag', label: 'Eligible Trims', value: d.trimsEligible.join(', ') }],
        rating: getSupabaseRating(d.vehicle.id, getCategory(d.vehicle.bodyStyle), d.vehicle.staffRating),
      });
    }
    for (const d of getCashDeals()) {
      const msrp = parseMsrpMin(d.vehicle.priceRange);
      const principal = Math.max(msrp - d.incentiveAmount, 1);
      const monthlyAfterCash = calcMonthly(principal, 6.5, 60);
      const { savingsTooltip } = buildSavingsText(monthlyAfterCash, d.vehicle.bodyStyle, 'cash');
      results.push({
        id: d.id, dealType: 'cash', fuelType: d.vehicle.fuelType, vehicleName: `${d.vehicle.year} ${d.vehicle.make} ${d.vehicle.model}`, vehicle: d.vehicle,
        estimatedMonthly: d.incentiveAmount, savingsVsAvg: `${d.percentOffMsrp} off MSRP`, savingsTooltip,
        dealText: `${d.incentiveValue} cash back`, dealPillIcon: 'percent',
        details: [{ label: 'MSRP Range', value: d.vehicle.priceRange }, { label: 'Est. off MSRP', value: d.percentOffMsrp }, { label: 'Fuel Type', value: d.vehicle.fuelType }],
        expirationDate: d.expirationDate, programName: d.programName, programDescription: d.programDescription,
        additionalInfo: [{ icon: 'tag', label: 'Eligible Trims', value: d.trimsEligible.join(', ') }],
        rating: getSupabaseRating(d.vehicle.id, getCategory(d.vehicle.bodyStyle), d.vehicle.staffRating),
        incentiveValue: d.incentiveValue, percentOffMsrp: d.percentOffMsrp,
      });
    }
    return results;
  }, [getSupabaseRating]);

  const tabMatcher = FUEL_TABS.find(t => t.key === activeTab)?.match || (() => true);
  const deals = useMemo(() => allDeals.filter(d => tabMatcher(d.fuelType)), [allDeals, activeTab]);

  const tabCounts = useMemo(() => {
    const counts: Record<FuelTab, number> = { all: allDeals.length, gas: 0, hybrid: 0, electric: 0, diesel: 0 };
    for (const d of allDeals) {
      for (const t of FUEL_TABS) {
        if (t.key !== 'all' && t.match(d.fuelType)) counts[t.key]++;
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
        const base = {
          year: parseInt(v.year, 10), make: v.make, model: v.model, slug: v.slug, imageUrl: v.image,
          msrpMin: parseInt(priceParts[0]?.replace(/,/g, '') || '0', 10),
          msrpMax: parseInt(priceParts[1]?.replace(/,/g, '') || '0', 10),
          dontWaitText: `This offer expires ${formatExpiration(activeDealObj.expirationDate)}. Manufacturer deals change monthly—once it's gone, there's no guarantee it'll come back.`,
          eventLabel: activeDealObj.programName,
          expirationDate: activeDealObj.expirationDate,
          eligibleTrims: (activeDealObj.additionalInfo.find(i => i.label === 'Eligible Trims')?.value || '').split(', ').filter(Boolean),
        };
        if (activeDealObj.dealType === 'cash') {
          return {
            ...base,
            offerHeadline: 'Cash Back',
            whatItMeans: activeDealObj.programDescription,
            yourSavings: `${activeDealObj.incentiveValue} customer cash. Approximately ${activeDealObj.percentOffMsrp} off MSRP.`,
            whoQualifies: 'Retail buyers on eligible new vehicles; see program details for restrictions.',
          };
        }
        return {
          ...base,
          offerHeadline: activeDealObj.dealText,
          whatItMeans: `This ${activeDealObj.dealType} offer could save you significantly on your next ${activeDealObj.fuelType.toLowerCase()} vehicle.`,
          yourSavings: `Check the deal details for specific savings on the ${v.make} ${v.model}.`,
          whoQualifies: activeDealObj.additionalInfo.find(i => i.label === 'Target Audience')?.value || 'Well-qualified buyers with approved credit.',
        };
      })()
    : undefined;

  const tabLabel = activeTab === 'all' ? '' : FUEL_TABS.find(t => t.key === activeTab)?.label || '';
  const emptyFuelCategory =
    activeTab === 'all' ? 'fuel type' : FUEL_TABS.find(t => t.key === activeTab)?.label.toLowerCase() || 'fuel type';
  const pageTitle = tabLabel
    ? `Best ${tabLabel} Vehicle Deals – ${CURRENT_MONTH} ${CURRENT_YEAR}`
    : `Best Vehicle Deals by Fuel Type – ${CURRENT_MONTH} ${CURRENT_YEAR}`;
  const BASE_URL = 'https://www.caranddriver.com';

  return (
    <div className="fuel-deals">
      <SEO
        title={pageTitle}
        description={`Find the best deals on gas, hybrid, electric, and diesel vehicles for ${CURRENT_MONTH} ${CURRENT_YEAR}. Compare 0% APR, finance, and lease offers by fuel type.`}
        canonical={`${BASE_URL}/deals/fuel-type`}
        keywords={['fuel type deals', 'electric vehicle deals', 'hybrid deals', 'EV incentives', `vehicle deals ${CURRENT_MONTH} ${CURRENT_YEAR}`]}
        structuredData={[
          createBreadcrumbStructuredData([{ name: 'Home', url: BASE_URL }, { name: 'Deals', url: `${BASE_URL}/deals` }, { name: 'Fuel Type Deals', url: `${BASE_URL}/deals/fuel-type` }]),
          createFAQStructuredData(FAQ_DATA),
        ]}
        noIndex={allDeals.length === 0}
      />

      <div className="fuel-deals__hero">
        <div className="container">
          <div className="fuel-deals__hero-content">
            <div className="fuel-deals__hero-badge"><Fuel size={16} /><span>Fuel Type Deals</span></div>
            <nav className="fuel-deals__breadcrumb" aria-label="Breadcrumb">
              <Link to="/">Home</Link>
              <span className="fuel-deals__breadcrumb-sep">/</span>
              <Link to="/deals">Deals</Link>
              <span className="fuel-deals__breadcrumb-sep">/</span>
              <span>Fuel Type Deals</span>
            </nav>
            <h1 className="fuel-deals__title">{pageTitle}</h1>
            <p className="fuel-deals__description">
              Shop deals by powertrain—whether you want a traditional gas engine, a fuel-sipping hybrid, a zero-emission EV, or a torque-rich diesel. Every current incentive, paired with Car and Driver expert ratings.
            </p>
            <div className="fuel-deals__hero-stats">
              <div className="fuel-deals__hero-stat"><span className="fuel-deals__hero-stat-value">{allDeals.length}</span><span className="fuel-deals__hero-stat-label">Total Deals</span></div>
              <div className="fuel-deals__hero-stat"><span className="fuel-deals__hero-stat-value">{tabCounts.electric}</span><span className="fuel-deals__hero-stat-label">EV Deals</span></div>
              <div className="fuel-deals__hero-stat"><span className="fuel-deals__hero-stat-value">{tabCounts.hybrid}</span><span className="fuel-deals__hero-stat-label">Hybrid Deals</span></div>
              <div className="fuel-deals__hero-stat"><span className="fuel-deals__hero-stat-value">{CURRENT_MONTH}</span><span className="fuel-deals__hero-stat-label">{CURRENT_YEAR} Deals</span></div>
            </div>
          </div>
        </div>
      </div>

      <div className="fuel-deals__content">
        <div className="container">
          <div className="fuel-deals__layout">
            <div className="fuel-deals__main">
              {/* Fuel Type Tabs */}
              <div className="fuel-deals__tabs" role="tablist">
                {FUEL_TABS.map(t => (
                  <button
                    key={t.key}
                    type="button"
                    role="tab"
                    aria-selected={activeTab === t.key}
                    className={`fuel-deals__tab ${activeTab === t.key ? 'fuel-deals__tab--active' : ''} ${tabCounts[t.key] === 0 && t.key !== 'all' ? 'fuel-deals__tab--empty' : ''}`}
                    onClick={() => setActiveTab(t.key)}
                  >
                    {t.icon}
                    <span>{t.label}</span>
                    <span className="fuel-deals__tab-count">{tabCounts[t.key]}</span>
                  </button>
                ))}
              </div>

              <section className="fuel-deals__section">
                <h2 className="fuel-deals__section-title">
                  <Fuel size={22} /> {deals.length} {tabLabel || 'Available'} Deal{deals.length !== 1 ? 's' : ''}
                </h2>
                <div className="fuel-deals__grid">
                  {deals.map((deal) => {
                    const saved = isVehicleSaved(deal.vehicleName);
                    const isExpanded = expandedDealId === deal.id;
                    return (
                      <div key={deal.id} className="fuel-deals__card">
                        <div className="fuel-deals__card-header">
                          <Link to={`/${deal.vehicle.slug}`} className="fuel-deals__card-name-link">
                            <h3 className="fuel-deals__card-name">{deal.vehicleName}</h3>
                          </Link>
                          <div className="fuel-deals__card-rating">
                            <span className="fuel-deals__card-rating-value">{deal.rating}</span>
                            <span className="fuel-deals__card-rating-max">/10</span>
                            <span className="fuel-deals__card-rating-label">C/D Rating</span>
                          </div>
                        </div>

                        <Link to={`/${deal.vehicle.slug}`} className="fuel-deals__card-image-link">
                          <div className="fuel-deals__card-image-container">
                            <img src={deal.vehicle.image} alt={deal.vehicleName} className="fuel-deals__card-image" />
                            <span className="fuel-deals__card-fuel-badge">{deal.fuelType}</span>
                            <button
                              className={`fuel-deals__card-save ${saved ? 'fuel-deals__card-save--saved' : ''}`}
                              onClick={(e) => handleSaveClick(e, { name: deal.vehicleName, slug: deal.vehicle.slug, image: deal.vehicle.image })}
                              aria-label={saved ? 'Remove from favorites' : 'Add to favorites'}
                            >
                              <Heart size={16} fill={saved ? 'currentColor' : 'none'} />
                            </button>
                            {(() => {
                              const allOffers = getVehicleOffers(deal.vehicle.make, deal.vehicle.model);
                              if (allOffers.length > 1) return (
                                <button type="button" className="fuel-deals__card-offers-tag" onClick={(e) => toggleOffersPopup(e, deal.vehicle.make, deal.vehicle.model, deal.vehicle.slug)}>
                                  {allOffers.length} Offers Available
                                </button>
                              );
                              return null;
                            })()}
                            {offersPopup?.slug === deal.vehicle.slug && (
                              <div className="fuel-deals__card-offers-popup">
                                <div className="fuel-deals__card-offers-popup-header">
                                  <strong>{offersPopup.offers.length} Available Offers</strong>
                                  <button type="button" className="fuel-deals__card-offers-popup-close" onClick={(e) => { e.preventDefault(); e.stopPropagation(); setOffersPopup(null); }}>&times;</button>
                                </div>
                                <ul className="fuel-deals__card-offers-popup-list">
                                  {offersPopup.offers.map((o, idx) => (
                                    <li key={idx} className="fuel-deals__card-offers-popup-item">
                                      <span className={`fuel-deals__card-offers-popup-type fuel-deals__card-offers-popup-type--${o.type}`}>
                                        {o.type === 'zero-apr' ? '0% APR' : o.type === 'cash' ? 'Cash' : o.type === 'lease' ? 'Lease' : 'Finance'}
                                      </span>
                                      <span className="fuel-deals__card-offers-popup-label">{o.label}</span>
                                      <span className="fuel-deals__card-offers-popup-exp">expires {formatExpiration(o.expires)}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                            {(deal.vehicle.editorsChoice || deal.vehicle.tenBest) && (
                              <div className="fuel-deals__card-badges">
                                {deal.vehicle.tenBest && <img src={TEN_BEST_BADGE_URL} alt="10Best" className="fuel-deals__card-badge-img" />}
                                {deal.vehicle.editorsChoice && <img src={EDITORS_CHOICE_BADGE_URL} alt="Editors' Choice" className="fuel-deals__card-badge-img" />}
                              </div>
                            )}
                          </div>
                        </Link>

                        <div className="fuel-deals__card-body">
                          <div className="fuel-deals__card-payment-block">
                            <div className="fuel-deals__card-payment">
                              {deal.dealType === 'cash' ? (
                                <>
                                  <span className="fuel-deals__card-payment-amount">{deal.incentiveValue}</span>
                                  <span className="fuel-deals__card-payment-period">Cash Back</span>
                                </>
                              ) : (
                                <>
                                  <span className="fuel-deals__card-payment-amount">${deal.estimatedMonthly}</span>
                                  <span className="fuel-deals__card-payment-period">{deal.dealType === 'lease' ? '/mo' : '/mo*'}</span>
                                </>
                              )}
                            </div>
                            <span className="fuel-deals__card-payment-savings">
                              {deal.savingsVsAvg}
                              <span className="fuel-deals__card-tooltip-wrap">
                                <Info size={13} className="fuel-deals__card-tooltip-icon" />
                                <span className="fuel-deals__card-tooltip">{deal.savingsTooltip}</span>
                              </span>
                            </span>
                          </div>

                          <button className="fuel-deals__card-deal-pill" onClick={(e) => { e.preventDefault(); e.stopPropagation(); setActiveDealId(deal.id); }}>
                            <span className="fuel-deals__card-deal-pill-chip">
                              {deal.dealType === 'lease' ? 'Lease' : deal.dealType === 'cash' ? 'Cash' : 'Finance'}
                            </span>
                            <span className="fuel-deals__card-deal-pill-text">{deal.dealText}</span>
                            <span className="fuel-deals__card-deal-pill-divider" />
                            <span className="fuel-deals__card-deal-pill-expires">expires {formatExpiration(deal.expirationDate)}</span>
                          </button>

                          <div className="fuel-deals__card-details">
                            {deal.details.map((d, i) => (
                              <div key={i} className="fuel-deals__card-detail">
                                <span className="fuel-deals__card-detail-label">{d.label}</span>
                                <span className="fuel-deals__card-detail-value">{d.value}</span>
                              </div>
                            ))}
                          </div>

                          <button type="button" className="fuel-deals__card-cta" onClick={() => setActiveDealId(deal.id)}>Get This Deal</button>

                          <button className="fuel-deals__card-toggle" onClick={() => setExpandedDealId(isExpanded ? null : deal.id)} aria-expanded={isExpanded}>
                            <span>Additional Details</span>{isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                          </button>
                          {isExpanded && (
                            <div className="fuel-deals__card-additional">
                              <div className="fuel-deals__card-additional-item"><Info size={16} /><div><strong>{deal.programName}</strong><p>{deal.programDescription}</p></div></div>
                              {deal.additionalInfo.map((info, i) => (
                                <div key={i} className="fuel-deals__card-additional-item">
                                  {info.icon === 'users' ? <Users size={16} /> : info.icon === 'tag' ? <Tag size={16} /> : <Clock size={16} />}
                                  <div><strong>{info.label}</strong><p>{info.value}</p></div>
                                </div>
                              ))}
                              <div className="fuel-deals__card-additional-item"><Clock size={16} /><div><strong>Offer Expires</strong><p>{formatExpiration(deal.expirationDate)}</p></div></div>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                  {deals.length === 0 && (
                    <div className="fuel-deals__empty-state">
                      <p className="fuel-deals__empty-state-text">
                        There are currently no active {emptyFuelCategory} offers. Check back soon or explore other available deals.
                      </p>
                      <Link to="/deals" className="fuel-deals__empty-state-link">
                        Browse All Deals
                      </Link>
                    </div>
                  )}
                </div>
              </section>

              <section className="fuel-deals__faq-section">
                <h2 className="fuel-deals__section-title"><Info size={22} /> Frequently Asked Questions</h2>
                <div className="fuel-deals__faq-list">
                  {FAQ_DATA.map((faq, i) => (
                    <div key={i} className={`fuel-deals__faq-item ${expandedFaqIndex === i ? 'fuel-deals__faq-item--expanded' : ''}`}>
                      <button className="fuel-deals__faq-question" onClick={() => setExpandedFaqIndex(expandedFaqIndex === i ? null : i)} aria-expanded={expandedFaqIndex === i}>
                        <span>{faq.question}</span>{expandedFaqIndex === i ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                      </button>
                      {expandedFaqIndex === i && <div className="fuel-deals__faq-answer"><p>{faq.answer}</p></div>}
                    </div>
                  ))}
                </div>
              </section>

              <section className="fuel-deals__links-section">
                <h2 className="fuel-deals__section-title">Explore More</h2>
                <div className="fuel-deals__links-grid">
                  <Link to="/deals" className="fuel-deals__link-card"><h3>All Deals</h3><p>Browse every current deal</p></Link>
                  <Link to="/deals/zero-apr" className="fuel-deals__link-card"><h3>0% APR Deals</h3><p>Zero-interest financing</p></Link>
                  <Link to="/deals/suv" className="fuel-deals__link-card"><h3>SUV Deals</h3><p>Best deals on SUVs</p></Link>
                  <Link to="/deals/truck" className="fuel-deals__link-card"><h3>Truck Deals</h3><p>Pickup truck specials</p></Link>
                  <Link to="/deals/lease" className="fuel-deals__link-card"><h3>Lease Deals</h3><p>Monthly lease specials</p></Link>
                  <Link to="/deals/cash-finance" className="fuel-deals__link-card"><h3>Finance Deals</h3><p>Cash-back and APR offers</p></Link>
                </div>
              </section>
            </div>
            <aside className="fuel-deals__sidebar"><AdSidebar /></aside>
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

export default FuelTypeDealsPage;
