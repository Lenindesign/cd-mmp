import { Fragment, useMemo, useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronDown, ChevronUp, SlidersHorizontal, X } from 'lucide-react';
import { getLeaseDeals } from '../../services/leaseDealsService';
import { getCurrentPeriod, formatExpiration } from '../../utils/dateUtils';
import { buildSavingsText, parseTermMonths, inferCreditTier, creditTierQualifies, getVehicleOffers, offersToIncentives, getGlobalDealCounts } from '../../utils/dealCalculations';
import { useActiveFilterPills } from '../../hooks/useActiveFilterPills';
import type { VehicleOfferSummary } from '../../utils/dealCalculations';
import { DealCard } from '../../components/DealCard';
import { useSupabaseRatings, getCategory } from '../../hooks/useSupabaseRating';
import { useAuth } from '../../contexts/AuthContext';
import { SEO, createBreadcrumbStructuredData, createFAQStructuredData } from '../../components/SEO';
import AdBanner from '../../components/AdBanner';
import AdSidebar from '../../components/AdSidebar';
import { GridAd } from '../../components/GridAd';
import SignInToSaveModal from '../../components/SignInToSaveModal';
import IncentivesModal from '../../components/IncentivesModal/IncentivesModal';
import type { IncentiveOfferDetail } from '../../components/IncentivesModal/IncentivesModal';
import { DealsFilterModal } from '../../components/DealsFilterModal';
import type { DealsFilterState } from '../../components/DealsFilterModal';
import './LeaseDealsPage.css';

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
    answer: 'Most leases include a mileage allowance (typically 10,000–12,000 miles per year). If you exceed it, you\'ll pay an excess mileage fee, usually $0.15 to $0.25 per mile, when you return the vehicle. If you know you\'ll drive more, negotiate a higher mileage allowance upfront; it\'s cheaper than paying overage fees.',
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

const DEFAULT_FILTERS: DealsFilterState = {
  tab: 'best-deals',
  dealType: 'lease',
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

const GRID_BREAKER_AFTER_CARD_COUNT = 12;
const DEALS_GRID_BREAKER_AD_URL =
  'https://d2kde5ohu8qb21.cloudfront.net/files/693a37c1e2108b000272edd6/nissan.jpg';

const SIDEBAR_AFTER_BREAK_PROPS = {
  imageUrl: 'https://d2kde5ohu8qb21.cloudfront.net/files/69387d364230820002694996/300x600.jpg',
  altText: 'Advertisement',
  secondaryImageUrl: DEALS_GRID_BREAKER_AD_URL,
  secondaryAltText: 'Advertisement',
  link: '#',
  secondaryLink: '#',
};

function chunkArray<T>(items: T[], chunkSize: number): T[][] {
  if (chunkSize <= 0) return [items];
  const chunks: T[][] = [];
  for (let i = 0; i < items.length; i += chunkSize) {
    chunks.push(items.slice(i, i + chunkSize));
  }
  return chunks;
}

const LeaseDealsPage = () => {
  const { getRating: getSupabaseRating } = useSupabaseRatings();
  const { user, isAuthenticated, addSavedVehicle, removeSavedVehicle } = useAuth();
  const { month, year } = getCurrentPeriod();

  const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(null);
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [pendingSaveVehicle, setPendingSaveVehicle] = useState<{ name: string; slug: string; image?: string } | null>(null);
  const [activeDealId, setActiveDealId] = useState<string | null>(null);
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState<DealsFilterState>(DEFAULT_FILTERS);
  const navigate = useNavigate();
  const handleFilterApply = useCallback((applied: DealsFilterState) => {
    const params = new URLSearchParams();
    params.set('filters', JSON.stringify(applied));
    navigate(`/deals/all?${params.toString()}`);
  }, [navigate]);

  const getResultCount = useCallback((draftFilters: DealsFilterState): number => {
    if (draftFilters.dealType && draftFilters.dealType !== 'all') {
      const global = getGlobalDealCounts();
      return global[draftFilters.dealType as keyof typeof global] ?? global.all;
    }
    return getGlobalDealCounts().all;
  }, []);
  const [offersPopup, setOffersPopup] = useState<{ slug: string; offers: VehicleOfferSummary[] } | null>(null);

  const { pills: activeFilterPills } = useActiveFilterPills(filters, setFilters, DEFAULT_FILTERS);
  const clearAllFilters = useCallback(() => navigate('/deals/all'), [navigate]);

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

  const deals = useMemo(() => {
    return getLeaseDeals()
      .filter(deal => matchesFilters(deal.vehicle, { term: deal.term }))
      .map((deal) => ({
        ...deal,
        rating: getSupabaseRating(deal.vehicle.id, getCategory(deal.vehicle.bodyStyle), deal.vehicle.staffRating),
      }));
  }, [getSupabaseRating, matchesFilters]);

  const dealChunks = useMemo(() => chunkArray(deals, GRID_BREAKER_AFTER_CARD_COUNT), [deals]);

  const isVehicleSaved = (name: string) => user?.savedVehicles?.some((v) => v.name === name) || false;

  const handleSaveClick = (e: React.MouseEvent, vehicle: { name: string; slug: string; image?: string }) => {
    e.preventDefault();
    e.stopPropagation();
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
          offerHeadline: `Lease for ${activeDealObj.monthlyPayment}/month`,
          whatItMeans: `Instead of buying, you're renting the car for ${activeDealObj.term}. Your monthly payment is just ${activeDealObj.monthlyPayment} with ${activeDealObj.dueAtSigning} due at signing.`,
          yourSavings: `${activeDealObj.monthlyPayment}/mo is significantly lower than a typical purchase payment. ${activeDealObj.dueAtSigning} due at signing. Includes ${activeDealObj.mileageAllowance} mileage allowance.`,
          whoQualifies: 'Well-qualified lessees with approved credit through the manufacturer\'s financial arm.',
          eligibleTrims: activeDealObj.trimsEligible,
          dontWaitText: `This offer expires ${formatExpiration(activeDealObj.expirationDate)}. Manufacturer deals change monthly. Once it's gone, there's no guarantee it'll come back.`,
          eventLabel: activeDealObj.programName,
          expirationDate: activeDealObj.expirationDate,
        };
      })()
    : undefined;

  const pageTitle = `Best Lease Deals for ${month} ${year}`;
  const BASE_URL = 'https://www.caranddriver.com';

  return (
    <div className="lease-deals-page">
      <SEO
        title={pageTitle}
        description={`Find the best car lease deals for ${month} ${year}. Compare monthly payments, due-at-signing costs, and terms on new cars, SUVs, and trucks. Expert ratings from Car and Driver.`}
        canonical={`${BASE_URL}/deals/lease`}
        keywords={['lease deals', 'car lease specials', `lease deals ${month} ${year}`, 'best lease offers', 'new car lease', 'monthly lease payments']}
        structuredData={[
          createBreadcrumbStructuredData([
            { name: 'Home', url: BASE_URL },
            { name: 'Deals', url: `${BASE_URL}/deals` },
            { name: 'Lease Deals', url: `${BASE_URL}/deals/lease` },
          ]),
          createFAQStructuredData(FAQ_DATA),
        ]}
        noIndex={deals.length === 0}
      />

      {/* Filter toolbar */}
      <div className="lease-deals-page__toolbar">
        <div className="container lease-deals-page__toolbar-inner">
          <div className="active-filter-pills__toolbar-left">
            <span className="active-filter-pills__count">{deals.length} {deals.length === 1 ? 'deal' : 'deals'}</span>
            <div className="active-filter-pills__row" aria-label="Active filters">
              <span className="active-filter-pills__pill">
                <span className="active-filter-pills__pill-label">Lease</span>
                <button type="button" className="active-filter-pills__pill-x" aria-label="Remove Lease filter" onClick={() => navigate('/deals/all')}>
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
            className={`lease-deals-page__filter-btn ${activeFilterPills.length > 0 ? 'lease-deals-page__filter-btn--active' : ''}`}
            onClick={() => setFilterOpen(true)}
          >
            <SlidersHorizontal size={16} />
            <span>Filters</span>
            {activeFilterPills.length > 0 && (
              <span className="lease-deals-page__filter-badge">{activeFilterPills.length}</span>
            )}
          </button>
        </div>
      </div>

      <div className="lease-deals-page__hero">
        <div className="container">
          <div className="lease-deals-page__hero-content">
            <div className="lease-deals-page__hero-badge">
              <span className="hero-pill__label">Lease Deals</span>
            </div>
            <nav className="lease-deals-page__breadcrumb" aria-label="Breadcrumb">
              <Link to="/">Home</Link>
              <span className="lease-deals-page__breadcrumb-sep">/</span>
              <Link to="/deals">Deals</Link>
              <span className="lease-deals-page__breadcrumb-sep">/</span>
              <span>Lease Deals</span>
            </nav>
            <h1 className="lease-deals-page__title">{pageTitle}</h1>
            <p className="lease-deals-page__description">
              Leasing lets you drive a brand-new car with lower monthly payments than buying. We've compiled
              the best manufacturer lease specials and paired them with our expert ratings so you can find the
              best value for your budget.
            </p>
          </div>
        </div>
      </div>

      <AdBanner imageUrl="https://d2kde5ohu8qb21.cloudfront.net/files/693a37c1e2108b000272edd6/nissan.jpg" altText="Advertisement" />

      <div className="lease-deals-page__content">
        <div className={`container${deals.length > 0 ? ' lease-deals-page__container--stacked' : ''}`}>
          {deals.length === 0 ? (
            <div className="lease-deals-page__segment">
              <div className="lease-deals-page__main">
                <section className="lease-deals-page__section">
                  <div className="lease-deals-page__grid">
                    <div className="lease-deals-page__empty-state">
                      <p className="lease-deals-page__empty-state-text">
                        There are currently no active lease offers. Check back soon or explore other available deals.
                      </p>
                      <Link to="/deals" className="lease-deals-page__empty-state-link">
                        Browse All Deals
                      </Link>
                    </div>
                  </div>
                </section>
              </div>
              <aside className="lease-deals-page__sidebar" aria-label="Advertisement">
                <div className="lease-deals-page__sidebar-sticky">
                  <AdSidebar />
                </div>
              </aside>
            </div>
          ) : (
            <>
              {dealChunks.map((chunk, chunkIndex) => (
                <Fragment key={`lease-segment-${chunkIndex}`}>
                  <div className="lease-deals-page__segment">
                    <div className="lease-deals-page__main">
                      <section className="lease-deals-page__section">
                        <div className="lease-deals-page__grid">
                          {chunk.map((deal, i) => {
                            const vehicleName = `${deal.vehicle.year} ${deal.vehicle.make} ${deal.vehicle.model}`;
                            const saved = isVehicleSaved(vehicleName);
                            const allOffers = getVehicleOffers(deal.vehicle.make, deal.vehicle.model);
                            const { savingsVsAvg, savingsTooltip } = buildSavingsText(deal.monthlyPaymentNum, deal.vehicle.bodyStyle);
                            return (
                              <Fragment key={deal.id}>
                                {i > 0 && i % 4 === 0 && (
                                  <GridAd />
                                )}
                                <DealCard
                                  slug={deal.vehicle.slug}
                                  vehicleName={vehicleName}
                                  vehicleImage={deal.vehicle.image}
                                  vehicleSlug={deal.vehicle.slug}
                                  vehicleMake={deal.vehicle.make}
                                  vehicleModel={deal.vehicle.model}
                                  rating={deal.rating}
                                  dealTypeTag="Lease"
                                  editorsChoice={deal.vehicle.editorsChoice}
                                  tenBest={deal.vehicle.tenBest}
                                  isSaved={saved}
                                  onSaveClick={(e) => handleSaveClick(e, { name: vehicleName, slug: deal.vehicle.slug, image: deal.vehicle.image })}
                                  offers={allOffers}
                                  offersPopupOpen={offersPopup?.slug === deal.vehicle.slug}
                                  onToggleOffersPopup={(e) => toggleOffersPopup(e, deal.vehicle.make, deal.vehicle.model, deal.vehicle.slug)}
                                  onCloseOffersPopup={(e) => { e.preventDefault(); e.stopPropagation(); setOffersPopup(null); }}
                                  payment={{
                                    amount: deal.monthlyPayment,
                                    period: '/mo',
                                    savings: { type: 'savings-text', text: savingsVsAvg },
                                    savingsTooltip,
                                    expirationDate: deal.expirationDate,
                                  }}
                                  pill={{ chipLabel: 'Lease', text: `${deal.monthlyPayment}/mo lease`, expirationDate: deal.expirationDate }}
                                  details={[
                                    { label: 'Term', value: deal.term },
                                    { label: 'Mileage Allowance', value: deal.mileageAllowance },
                                  ]}
                                  onDealClick={() => setActiveDealId(deal.id)}
                                />
                              </Fragment>
                            );
                          })}
                        </div>
                      </section>
                    </div>
                    <aside className="lease-deals-page__sidebar" aria-label="Advertisement">
                      <div className="lease-deals-page__sidebar-sticky">
                        {chunkIndex === 0 ? <AdSidebar /> : <AdSidebar {...SIDEBAR_AFTER_BREAK_PROPS} />}
                      </div>
                    </aside>
                  </div>
                  {chunkIndex < dealChunks.length - 1 && (
                    <div className="lease-deals-page__full-bleed-breaker" role="complementary" aria-label="Advertisement">
                      <AdBanner imageUrl={DEALS_GRID_BREAKER_AD_URL} altText="Advertisement" />
                    </div>
                  )}
                </Fragment>
              ))}
            </>
          )}

          <div className="lease-deals-page__segment lease-deals-page__segment--tail">
            <div className="lease-deals-page__main">
              <section className="lease-deals-page__faq-section">
                <h2 className="lease-deals-page__section-title">Frequently Asked Questions About Leasing</h2>
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
                  <Link to="/deals/best-buying-deals" className="lease-deals-page__link-card"><h3>Buying Deals</h3><p>0% APR, cash back, and special financing</p></Link>
                  <Link to="/deals/suv" className="lease-deals-page__link-card"><h3>SUV Deals</h3><p>Best deals on SUVs and crossovers</p></Link>
                  <Link to="/deals/truck" className="lease-deals-page__link-card"><h3>Truck Deals</h3><p>Best deals on pickup trucks</p></Link>
                  <Link to="/rankings" className="lease-deals-page__link-card"><h3>Car Rankings</h3><p>Expert rankings across every category</p></Link>
                </div>
              </section>
            </div>
            <aside className="lease-deals-page__sidebar" aria-label="Advertisement">
              <div className="lease-deals-page__sidebar-sticky">
                <AdSidebar {...(dealChunks.length > 1 ? SIDEBAR_AFTER_BREAK_PROPS : {})} />
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
        totalResults={deals.length}
        getResultCount={getResultCount}
        dealPageType="lease"
      />
    </div>
  );
};

export default LeaseDealsPage;
