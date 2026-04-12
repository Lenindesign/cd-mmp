import { Fragment, useCallback, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronDown, ChevronUp, SlidersHorizontal, X } from 'lucide-react';
import { getZeroAprDeals } from '../../services/zeroAprDealsService';
import { getCashDeals, getFinanceDeals } from '../../services/cashFinanceDealsService';
import { getLeaseDeals } from '../../services/leaseDealsService';
import { useSupabaseRatings, getCategory } from '../../hooks/useSupabaseRating';
import { useAuth } from '../../contexts/AuthContext';
import { SEO, createBreadcrumbStructuredData, createFAQStructuredData } from '../../components/SEO';
import AdBanner from '../../components/AdBanner';
import AdSidebar from '../../components/AdSidebar';
import { GridAd } from '../../components/GridAd';
import SignInToSaveModal from '../../components/SignInToSaveModal';
import { DealCard } from '../../components/DealCard';
import { getCurrentPeriod, formatExpiration } from '../../utils/dateUtils';
import { parseMsrpMin, calcMonthly, parseTermMonths, AVG_MARKET_APR, AVG_LOAN_TERM, buildSavingsText, getVehicleOffers, offersToIncentives, inferCreditTier, creditTierQualifies, getGlobalDealCounts } from '../../utils/dealCalculations';
import type { VehicleOfferSummary } from '../../utils/dealCalculations';
import IncentivesModal, { getAprRangeLabel } from '../../components/IncentivesModal/IncentivesModal';
import type { IncentiveOfferDetail } from '../../components/IncentivesModal/IncentivesModal';
import { DealsFilterModal } from '../../components/DealsFilterModal';
import type { DealsFilterState } from '../../components/DealsFilterModal';
import { useActiveFilterPills } from '../../hooks/useActiveFilterPills';
import './TruckDealsPage.css';

interface UnifiedDeal {
  id: string;
  dealType: 'zero-apr' | 'cash' | 'finance' | 'lease';
  vehicleName: string;
  vehicle: { id: string; year: string; make: string; model: string; image: string; slug: string; bodyStyle: string; priceRange: string; staffRating: number; editorsChoice?: boolean; tenBest?: boolean; fuelType?: string; evOfTheYear?: boolean };
  term?: string;
  targetAudience?: string;
  estimatedMonthly: number;
  aprDisplay?: string;
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

const DEFAULT_FILTERS: DealsFilterState = {
  tab: 'best-deals',
  dealType: 'all',
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
  sortBy: 'a-z',
};

const MOBILE_AD_INTERVAL = 4;

const TruckDealsPage = () => {
  const { month: CURRENT_MONTH, year: CURRENT_YEAR } = getCurrentPeriod();
  const { getRating: getSupabaseRating } = useSupabaseRatings();
  const { user, isAuthenticated, addSavedVehicle, removeSavedVehicle } = useAuth();
  const navigate = useNavigate();
  const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(null);
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [pendingSaveVehicle, setPendingSaveVehicle] = useState<{ name: string; slug: string; image?: string } | null>(null);
  const [activeDealId, setActiveDealId] = useState<string | null>(null);
  const [offersPopup, setOffersPopup] = useState<{ slug: string; offers: VehicleOfferSummary[] } | null>(null);
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState<DealsFilterState>(DEFAULT_FILTERS);
  const handleFilterApply = useCallback((applied: DealsFilterState) => {
    const params = new URLSearchParams();
    params.set('filters', JSON.stringify(applied));
    navigate(`/deals/all?${params.toString()}`);
  }, [navigate]);
  const { pills: activeFilterPills } = useActiveFilterPills(filters, setFilters, DEFAULT_FILTERS);
  const clearAllFilters = useCallback(() => navigate('/deals/all'), [navigate]);

  const matchesFilters = useCallback((
    vehicle: { bodyStyle: string; make: string; fuelType?: string; editorsChoice?: boolean; tenBest?: boolean; evOfTheYear?: boolean },
    deal?: { term?: string; targetAudience?: string },
  ) => {
    if (filters.makes.length > 0 && !filters.makes.includes(vehicle.make)) return false;
    if (filters.fuelTypes.length > 0 && vehicle.fuelType && !filters.fuelTypes.includes(vehicle.fuelType)) return false;
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
  }, [filters.makes, filters.fuelTypes, filters.accolades, filters.terms, filters.creditTier]);

  const toggleOffersPopup = useCallback((e: React.MouseEvent, make: string, model: string, slug: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (offersPopup?.slug === slug) {
      setOffersPopup(null);
    } else {
      setOffersPopup({ slug, offers: getVehicleOffers(make, model) });
    }
  }, [offersPopup]);

  const getResultCount = useCallback((draftFilters: DealsFilterState): number => {
    if (draftFilters.dealType && draftFilters.dealType !== 'all') {
      const global = getGlobalDealCounts();
      return global[draftFilters.dealType as keyof typeof global] ?? global.all;
    }
    return getGlobalDealCounts().all;
  }, []);

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
        term: d.term, targetAudience: d.targetAudience,
        estimatedMonthly: monthly, aprDisplay: '0%', savingsVsAvg, savingsTooltip,
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
      const rangeLabel = getAprRangeLabel({ value: `${d.apr} APR`, title: d.programName, terms: d.term });
      results.push({
        id: d.id, dealType: 'finance', vehicleName: `${d.vehicle.year} ${d.vehicle.make} ${d.vehicle.model}`, vehicle: d.vehicle,
        term: d.term, targetAudience: d.targetAudience,
        estimatedMonthly: monthly, aprDisplay: rangeLabel.replace(/\s*APR$/, ''), savingsVsAvg, savingsTooltip,
        dealText: rangeLabel, dealPillIcon: 'percent',
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
        term: d.term,
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

  const filteredDeals = useMemo(() => {
    let result = deals;
    if (filters.monthlyPaymentMin > 0) result = result.filter(d => d.estimatedMonthly >= filters.monthlyPaymentMin);
    if (filters.monthlyPaymentMax < 99999) result = result.filter(d => d.estimatedMonthly <= filters.monthlyPaymentMax);
    return result.filter(d => matchesFilters(d.vehicle, { term: d.term, targetAudience: d.targetAudience }));
  }, [deals, filters.monthlyPaymentMin, filters.monthlyPaymentMax, matchesFilters]);

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
      <div className="truck-deals-page__toolbar">
        <div className="container truck-deals-page__toolbar-inner">
          <div className="active-filter-pills__toolbar-left">
            <span className="active-filter-pills__count">{filteredDeals.length} {filteredDeals.length === 1 ? 'deal' : 'deals'}</span>
            <div className="active-filter-pills__row" aria-label="Active filters">
              <span className="active-filter-pills__pill">
                <span className="active-filter-pills__pill-label">Truck</span>
                <button type="button" className="active-filter-pills__pill-x" aria-label="Remove Truck filter" onClick={() => navigate('/deals/all')}>
                  <X size={12} strokeWidth={2.5} aria-hidden />
                </button>
              </span>
              {activeFilterPills.map(pill => (
                <span key={pill.id} className="active-filter-pills__pill">
                  <span className="active-filter-pills__pill-label">{pill.label}</span>
                  <button type="button" className="active-filter-pills__pill-x" aria-label={`Remove ${pill.label} filter`} onClick={pill.onRemove}>
                    <X size={12} strokeWidth={2.5} aria-hidden />
                  </button>
                </span>
              ))}
              {activeFilterPills.length > 0 && (
                <button type="button" className="active-filter-pills__clear-all" onClick={clearAllFilters}>
                  Clear All
                </button>
              )}
            </div>
          </div>
          <button
            type="button"
            className={`truck-deals-page__filter-btn ${activeFilterPills.length > 0 ? 'truck-deals-page__filter-btn--active' : ''}`}
            onClick={() => setFilterOpen(true)}
          >
            <SlidersHorizontal size={16} />
            <span>Filters</span>
            {activeFilterPills.length > 0 && (
              <span className="truck-deals-page__filter-badge">{activeFilterPills.length}</span>
            )}
          </button>
        </div>
      </div>
      <div className="truck-deals-page__hero">
        <div className="container">
          <div className="truck-deals-page__hero-content">
            <div className="truck-deals-page__hero-badge">
              <span className="hero-pill__label">Truck Deals</span>
            </div>
            <nav className="truck-deals-page__breadcrumb" aria-label="Breadcrumb">
              <Link to="/">Home</Link>
              <span className="truck-deals-page__breadcrumb-sep">/</span>
              <Link to="/deals">Deals</Link>
              <span className="truck-deals-page__breadcrumb-sep">/</span>
              <span>Truck Deals</span>
            </nav>
            <h1 className="truck-deals-page__title">{pageTitle}</h1>
            <p className="truck-deals-page__description">Every current incentive on pickup trucks—0% APR financing, cash-back rebates, special finance rates, and lease specials. Paired with Car and Driver expert ratings to help you find the best truck at the best price.</p>
          </div>
        </div>
      </div>
      <AdBanner imageUrl="https://d2kde5ohu8qb21.cloudfront.net/files/693a37c1e2108b000272edd6/nissan.jpg" altText="Advertisement" />
      <div className="truck-deals-page__content">
        <div className={`container${filteredDeals.length > 0 ? ' truck-deals-page__container--stacked' : ''}`}>
          {filteredDeals.length === 0 ? (
            <div className="truck-deals-page__segment">
              <div className="truck-deals-page__main">
                <section className="truck-deals-page__section">
                  <div className="truck-deals-page__grid">
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
                    {deals.length > 0 && filteredDeals.length === 0 && (
                      <div className="truck-deals-page__empty-state">
                        <p className="truck-deals-page__empty-state-text">
                          No truck deals match your filters. Try adjusting filters or clear them to see all offers.
                        </p>
                        <button type="button" className="truck-deals-page__empty-state-link" onClick={clearAllFilters}>
                          Clear all filters
                        </button>
                      </div>
                    )}
                  </div>
                </section>
              </div>
              <aside className="truck-deals-page__sidebar" aria-label="Advertisement">
                <div className="truck-deals-page__sidebar-sticky">
                  <AdSidebar />
                </div>
              </aside>
            </div>
          ) : (
            <div className="truck-deals-page__segment">
              <div className="truck-deals-page__main">
                <section className="truck-deals-page__section">
                  <div className="truck-deals-page__grid">
                    {filteredDeals.map((deal, i) => {
                      const saved = isVehicleSaved(deal.vehicleName);
                      const offers = getVehicleOffers(deal.vehicle.make, deal.vehicle.model);
                      const dealTypeTag = deal.dealType === 'lease' ? 'Lease' : 'Buy';
                      const paymentAmount = deal.aprDisplay || `$${deal.estimatedMonthly}`;
                      const paymentPeriod = deal.aprDisplay ? ' APR' : deal.dealType === 'lease' ? '/mo' : '/mo*';
                      const pillChipLabel = deal.dealType === 'lease' ? 'Lease' : 'Buy';
                      return (
                        <Fragment key={deal.id}>
                          {i > 0 && i % MOBILE_AD_INTERVAL === 0 && (
                            <GridAd />
                          )}
                          <DealCard
                            slug={deal.vehicle.slug}
                            vehicleName={deal.vehicleName}
                            vehicleImage={deal.vehicle.image}
                            vehicleSlug={deal.vehicle.slug}
                            vehicleMake={deal.vehicle.make}
                            vehicleModel={deal.vehicle.model}
                            rating={deal.rating}
                            dealTypeTag={dealTypeTag}
                            editorsChoice={deal.vehicle.editorsChoice}
                            tenBest={deal.vehicle.tenBest}
                            isSaved={saved}
                            onSaveClick={(e) => handleSaveClick(e, { name: deal.vehicleName, slug: deal.vehicle.slug, image: deal.vehicle.image })}
                            offers={offers}
                            offersPopupOpen={offersPopup?.slug === deal.vehicle.slug}
                            onToggleOffersPopup={(e) => toggleOffersPopup(e, deal.vehicle.make, deal.vehicle.model, deal.vehicle.slug)}
                            onCloseOffersPopup={(e) => { e.preventDefault(); e.stopPropagation(); setOffersPopup(null); }}
                            payment={{
                              amount: paymentAmount,
                              period: paymentPeriod,
                              savings: { type: 'savings-text', text: deal.savingsVsAvg },
                              savingsTooltip: deal.savingsTooltip,
                              expirationDate: deal.expirationDate,
                            }}
                            pill={{
                              chipLabel: pillChipLabel,
                              text: deal.dealText,
                              expirationDate: deal.expirationDate,
                            }}
                            details={deal.details}
                            onDealClick={(e) => { e.preventDefault(); e.stopPropagation(); setActiveDealId(deal.id); }}
                          />
                        </Fragment>
                      );
                    })}
                  </div>
                </section>
              </div>
              <aside className="truck-deals-page__sidebar" aria-label="Advertisement">
                <div className="truck-deals-page__sidebar-sticky">
                  <AdSidebar />
                </div>
              </aside>
            </div>
          )}

          <div className="truck-deals-page__segment truck-deals-page__segment--tail">
            <div className="truck-deals-page__main">
              <section className="truck-deals-page__faq-section">
                <h2 className="truck-deals-page__section-title">Frequently Asked Questions About Truck Deals</h2>
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
                  <Link to="/deals/best-buying-deals" className="truck-deals-page__link-card"><h3>Buying Deals</h3><p>0% APR, cash back, and special financing</p></Link>
                  <Link to="/deals/suv" className="truck-deals-page__link-card"><h3>SUV Deals</h3><p>Best deals on SUVs and crossovers</p></Link>
                  <Link to="/deals/lease" className="truck-deals-page__link-card"><h3>Lease Deals</h3><p>Monthly lease specials</p></Link>
                  <Link to="/rankings/truck" className="truck-deals-page__link-card"><h3>Truck Rankings</h3><p>Expert-ranked pickup trucks</p></Link>
                </div>
              </section>
            </div>
            <aside className="truck-deals-page__sidebar" aria-label="Advertisement">
              <div className="truck-deals-page__sidebar-sticky">
                <AdSidebar />
              </div>
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
      <SignInToSaveModal isOpen={showSignInModal} onClose={() => { setShowSignInModal(false); setPendingSaveVehicle(null); }} itemType="vehicle" itemName={pendingSaveVehicle?.name} itemImage={pendingSaveVehicle?.image} />
      <DealsFilterModal
        isOpen={filterOpen}
        onClose={() => setFilterOpen(false)}
        filters={filters}
        onApply={handleFilterApply}
        getResultCount={getResultCount}
        totalResults={filteredDeals.length}
      />
    </div>
  );
};

export default TruckDealsPage;
