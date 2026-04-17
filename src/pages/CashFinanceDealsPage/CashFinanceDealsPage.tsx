import { Fragment, useMemo, useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronDown, ChevronUp, SlidersHorizontal, X } from 'lucide-react';
import { getFinanceDeals, getCashDeals } from '../../services/cashFinanceDealsService';
import { getCurrentPeriod, formatExpiration } from '../../utils/dateUtils';
import { parseMsrpMin, calcMonthly, parseTermMonths, buildSavingsText, inferCreditTier, creditTierQualifies, getVehicleOffers, offersToIncentives, findMatchingIncentiveId, sortDeals } from '../../utils/dealCalculations';
import { useActiveFilterPills } from '../../hooks/useActiveFilterPills';
import type { VehicleOfferSummary } from '../../utils/dealCalculations';
import { useSupabaseRatings, getCategory } from '../../hooks/useSupabaseRating';
import { useAuth } from '../../contexts/AuthContext';
import { SEO, createBreadcrumbStructuredData, createFAQStructuredData } from '../../components/SEO';
import AdBanner from '../../components/AdBanner';
import AdSidebar from '../../components/AdSidebar';
import { GridAd } from '../../components/GridAd';
import SignInToSaveModal from '../../components/SignInToSaveModal';
import { DealCard } from '../../components/DealCard';
import IncentivesModal, { getAprRangeLabel } from '../../components/IncentivesModal/IncentivesModal';
import type { IncentiveOfferDetail } from '../../components/IncentivesModal/IncentivesModal';
import { DealsFilterModal } from '../../components/DealsFilterModal';
import type { DealsFilterState, DealTypeOption } from '../../components/DealsFilterModal';
import { useFilterOpen } from '../../hooks/useFilterOpen';
import './CashFinanceDealsPage.css';

const FAQ_DATA = [
  {
    question: 'How do special finance rates work?',
    answer: 'Special finance rates are below-market APR (Annual Percentage Rate) offers provided through the manufacturer\'s captive finance company, such as GM Financial, Toyota Financial Services, or Ford Credit. These rates are subsidized by the manufacturer, meaning you pay less interest over the life of your loan compared to a typical bank or credit union loan.',
  },
  {
    question: 'How does Car and Driver rate these vehicles?',
    answer: 'Our ratings are based on comprehensive real-world testing by our expert editorial team. Each vehicle is evaluated on driving dynamics, comfort, interior quality, technology, value, and more. Our 10-point scale reflects how a vehicle compares to its direct competitors. Vehicles earning 10Best or Editor\'s Choice awards represent the absolute best in their category, a distinction that can give you confidence in your purchase.',
  },
  {
    question: 'Do these deals apply to all trims and configurations?',
    answer: 'Not always. Most incentives apply to specific trims or configurations, which we list under "Additional Details" for each deal. Higher trims (like luxury or performance variants) may have different offers or no incentive at all. Additionally, inventory at your local dealer determines what\'s available to purchase with these incentives. Contact your dealer to confirm eligible stock.',
  },
];

const DEFAULT_FILTERS: DealsFilterState = {
  tab: 'best-deals',
  dealType: 'finance',
  zipCode: '90245',
  bodyTypes: [],
  monthlyPaymentMin: 0,
  monthlyPaymentMax: 1500,
  makes: [],
  dueAtSigningMin: 0,
  dueAtSigningMax: 5000,
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

const CashFinanceDealsPage = () => {
  const { getRating: getSupabaseRating } = useSupabaseRatings();
  const { user, isAuthenticated, addSavedVehicle, removeSavedVehicle } = useAuth();
  const { month, year } = getCurrentPeriod();

  const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(null);
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [pendingSaveVehicle, setPendingSaveVehicle] = useState<{ name: string; slug: string; image?: string } | null>(null);
  const [activeDealId, setActiveDealId] = useState<string | null>(null);
  const [filterOpen, setFilterOpen] = useFilterOpen();
  const [filters, setFilters] = useState<DealsFilterState>(DEFAULT_FILTERS);
  const navigate = useNavigate();
  const handleFilterApply = useCallback((applied: DealsFilterState) => {
    const params = new URLSearchParams();
    params.set('filters', JSON.stringify(applied));
    navigate(`/deals/all?${params.toString()}`);
  }, [navigate]);
  const [offersPopup, setOffersPopup] = useState<{ slug: string; offers: VehicleOfferSummary[] } | null>(null);

  const { pills: activeFilterPills, clearAllFilters } = useActiveFilterPills(filters, setFilters, DEFAULT_FILTERS);

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

  const handleDealTypeNavigate = useCallback((dealType: DealTypeOption, carriedFilters: DealsFilterState) => {
    if (dealType === 'lease' || dealType === 'all') {
      navigate('/deals/lease', { state: { filters: carriedFilters } });
    }
  }, [navigate]);

  const getResultCount = useCallback((draftFilters: DealsFilterState): number => {
    const allFinance = getFinanceDeals();
    const allCash = getCashDeals();
    return [...allFinance, ...allCash].filter(deal => {
      const v = deal.vehicle;
      if (draftFilters.bodyTypes.length > 0 && !draftFilters.bodyTypes.includes(v.bodyStyle)) return false;
      if (draftFilters.makes.length > 0 && !draftFilters.makes.includes(v.make)) return false;
      if (draftFilters.fuelTypes.length > 0 && !draftFilters.fuelTypes.includes(v.fuelType)) return false;
      return true;
    }).length;
  }, []);

  const financeDeals = useMemo(() => {
    return getFinanceDeals()
      .filter(deal => matchesFilters(deal.vehicle, { term: deal.term, targetAudience: deal.targetAudience }))
      .map((deal) => ({
        ...deal,
        rating: getSupabaseRating(deal.vehicle.id, getCategory(deal.vehicle.bodyStyle), deal.vehicle.staffRating),
      }));
  }, [getSupabaseRating, matchesFilters]);

  const cashDeals = useMemo(() => {
    return getCashDeals()
      .filter(deal => matchesFilters(deal.vehicle))
      .map((deal) => ({
        ...deal,
        rating: getSupabaseRating(deal.vehicle.id, getCategory(deal.vehicle.bodyStyle), deal.vehicle.staffRating),
      }));
  }, [getSupabaseRating, matchesFilters]);

  const displayDeals = useMemo(
    () => sortDeals([...cashDeals, ...financeDeals], filters.sortBy),
    [cashDeals, financeDeals, filters.sortBy],
  );

  const dealChunks = useMemo(() => chunkArray(displayDeals, GRID_BREAKER_AFTER_CARD_COUNT), [displayDeals]);

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

  const toggleFaq = (index: number) => {
    setExpandedFaqIndex((prev) => (prev === index ? null : index));
  };

  const activeDealObj = activeDealId
    ? displayDeals.find(d => d.id === activeDealId) ?? null
    : null;
  const activeOffer: Partial<IncentiveOfferDetail> | undefined = activeDealObj
    ? (() => {
        const v = activeDealObj.vehicle;
        const priceParts = v.priceRange.replace(/[^0-9,\-–]/g, '').split(/[-–]/);
        const base = {
          year: parseInt(v.year, 10), make: v.make, model: v.model, slug: v.slug, imageUrl: v.image,
          msrpMin: parseInt(priceParts[0]?.replace(/,/g, '') || '0', 10),
          msrpMax: parseInt(priceParts[1]?.replace(/,/g, '') || '0', 10),
          dontWaitText: `This offer expires ${formatExpiration(activeDealObj.expirationDate)}. Manufacturer deals change monthly. Once it's gone, there's no guarantee it'll come back.`,
          eventLabel: activeDealObj.programName,
          expirationDate: activeDealObj.expirationDate,
          eligibleTrims: activeDealObj.trimsEligible,
        };
        if (activeDealObj.type === 'cash') {
          return {
            ...base,
            offerHeadline: 'Cash Back',
            whatItMeans: activeDealObj.programDescription,
            yourSavings: `${activeDealObj.incentiveValue} customer cash. Approximately ${activeDealObj.percentOffMsrp} off MSRP.`,
            whoQualifies: 'Retail buyers on eligible new vehicles; see program details for restrictions.',
          };
        }
        const fin = activeDealObj as (typeof financeDeals)[number];
        const headline = `${fin.apr} APR Financing for ${fin.term}`;
        return {
          ...base,
          offerHeadline: headline,
          whatItMeans: `A below-market interest rate from the manufacturer that lowers your monthly payment and total cost.`,
          yourSavings: `Could save you $1,500–$3,000 in interest over the loan term.`,
          whoQualifies: fin.targetAudience,
        };
      })()
    : undefined;

  const pageTitle = `Best Buying Deals for ${month} ${year}`;
  const BASE_URL = 'https://www.caranddriver.com';

  return (
    <div className="cf-deals-page">
      <SEO
        title={`${pageTitle}: Find the Best Car Deals Right Now`}
        description={`Find the best new car finance deals and special financing offers for ${month} ${year}. Expert ratings and reviews from Car and Driver help you get the best value.`}
        canonical={`${BASE_URL}/deals/cash-finance`}
        keywords={['finance deals', `car deals ${month} ${year}`, 'new car incentives', 'special financing', 'low APR car deals']}
        structuredData={[
          createBreadcrumbStructuredData([
            { name: 'Home', url: BASE_URL },
            { name: 'Deals', url: `${BASE_URL}/deals` },
            { name: 'Buying Deals', url: `${BASE_URL}/deals/cash-finance` },
          ]),
          createFAQStructuredData(FAQ_DATA),
        ]}
        noIndex={displayDeals.length === 0}
      />

      {/* Hero Section */}
      <div className="cf-deals-page__hero">
        <div className="container">
          <div className="cf-deals-page__hero-content">
            <div className="cf-deals-page__hero-badge">
              <span className="hero-pill__label">Buying Deals</span>
            </div>
            <nav className="cf-deals-page__breadcrumb" aria-label="Breadcrumb">
              <Link to="/">Home</Link>
              <span className="cf-deals-page__breadcrumb-sep">/</span>
              <Link to="/deals">Deals</Link>
              <span className="cf-deals-page__breadcrumb-sep">/</span>
              <span>Buying Deals</span>
            </nav>
            <h1 className="cf-deals-page__title">{pageTitle}</h1>
            <p className="cf-deals-page__description">
              Manufacturers offer special finance rates to move inventory, and those savings go directly to you.
              We've combined the best current offers with Car and Driver's expert ratings so you can find not just
              a good price, but a great car at a great price.
            </p>
          </div>
        </div>
      </div>

      {/* Filter toolbar */}
      <div className="cf-deals-page__toolbar">
        <div className="container cf-deals-page__toolbar-inner">
          <div className="active-filter-pills__toolbar-left">
            <span className="active-filter-pills__count">{displayDeals.length} {displayDeals.length === 1 ? 'deal' : 'deals'}</span>
            {activeFilterPills.length > 0 && (
              <div className="active-filter-pills__row" aria-label="Active filters">
                {activeFilterPills.map(pill => (
                  <span key={pill.id} className="active-filter-pills__pill">
                    <span className="active-filter-pills__pill-label">{pill.label}</span>
                    <button type="button" className="active-filter-pills__pill-x" aria-label={`Remove ${pill.label} filter`} onClick={pill.onRemove}>
                      <X size={12} strokeWidth={2.5} aria-hidden />
                    </button>
                  </span>
                ))}
                <button type="button" className="active-filter-pills__clear-all" onClick={clearAllFilters}>
                  Clear All
                </button>
              </div>
            )}
          </div>
          <button
            type="button"
            className={`deals-filter-btn ${activeFilterPills.length > 0 ? 'deals-filter-btn--active' : ''}`}
            onClick={() => setFilterOpen(true)}
          >
            <SlidersHorizontal size={16} aria-hidden />
            <span>Filters</span>
            {activeFilterPills.length > 0 && (
              <span className="deals-filter-badge">{activeFilterPills.length}</span>
            )}
          </button>
        </div>
      </div>

      <AdBanner imageUrl="https://d2kde5ohu8qb21.cloudfront.net/files/693a37c1e2108b000272edd6/nissan.jpg" altText="Advertisement" minimalDesktop />

      {/* Main Content */}
      <div className="cf-deals-page__content">
        <div className={`container${displayDeals.length > 0 ? ' cf-deals-page__container--stacked' : ''}`}>
          {displayDeals.length === 0 ? (
            <div className="cf-deals-page__segment">
              <div className="cf-deals-page__main">
                <section className="cf-deals-page__section">
                  <div className="cf-deals-page__grid">
                    <div className="cf-deals-page__empty-state">
                      <p className="cf-deals-page__empty-state-text">
                        There are currently no active finance or cash offers. Check back soon or explore other available deals.
                      </p>
                      <Link to="/deals" className="cf-deals-page__empty-state-link">
                        Browse All Deals
                      </Link>
                    </div>
                  </div>
                </section>
              </div>
              <aside className="cf-deals-page__sidebar" aria-label="Advertisement">
                <div className="cf-deals-page__sidebar-sticky">
                  <AdSidebar />
                </div>
              </aside>
            </div>
          ) : (
            <>
              {dealChunks.map((chunk, chunkIndex) => (
                <Fragment key={`cf-segment-${chunkIndex}`}>
                  <div className="cf-deals-page__segment">
                    <div className="cf-deals-page__main">
                      <section className="cf-deals-page__section">
                        <div className="cf-deals-page__grid">
                          {chunk.map((deal, i) => {
                            const vehicleName = `${deal.vehicle.year} ${deal.vehicle.make} ${deal.vehicle.model}`;
                            const saved = isVehicleSaved(vehicleName);
                            const isCash = deal.type === 'cash';
                            const financeDisplayRate = !isCash
                              ? getAprRangeLabel({ value: `${deal.apr} APR`, title: deal.programName, terms: deal.term }).replace(/\s*APR$/, '')
                              : '';
                            const offers = getVehicleOffers(deal.vehicle.make, deal.vehicle.model);

                            let payment: {
                              amount: string;
                              period: string;
                              savings?: { type: 'savings-text'; text: string } | { type: 'plain'; text: string };
                              savingsTooltip?: string;
                              expirationDate: string;
                            };

                            if (isCash) {
                              const msrp = parseMsrpMin(deal.vehicle.priceRange);
                              const principal = Math.max(msrp - deal.incentiveAmount, 1);
                              const monthlyAfterCash = calcMonthly(principal, 6.5, 60);
                              const { savingsTooltip } = buildSavingsText(monthlyAfterCash, deal.vehicle.bodyStyle, 'cash');
                              payment = {
                                amount: deal.incentiveValue,
                                period: 'Cash Back',
                                savings: { type: 'plain', text: `${deal.percentOffMsrp} off MSRP` },
                                savingsTooltip,
                                expirationDate: deal.expirationDate,
                              };
                            } else {
                              const msrp = parseMsrpMin(deal.vehicle.priceRange);
                              const aprNum = parseFloat(deal.apr.replace('%', ''));
                              const months = parseTermMonths(deal.term);
                              const monthly = calcMonthly(msrp, aprNum, months);
                              const { savingsVsAvg, savingsTooltip } = buildSavingsText(monthly, deal.vehicle.bodyStyle);
                              payment = {
                                amount: financeDisplayRate,
                                period: ' APR',
                                savings: { type: 'savings-text', text: savingsVsAvg },
                                savingsTooltip,
                                expirationDate: deal.expirationDate,
                              };
                            }

                            const dealTypeTag = isCash ? 'Cash' : 'Buy';
                            const pill = {
                              chipLabel: dealTypeTag,
                              text: isCash ? `${deal.incentiveValue} cash back` : `${financeDisplayRate} APR for ${deal.term}`,
                              expirationDate: deal.expirationDate,
                            };
                            const details = [
                              { label: 'MSRP Range', value: deal.vehicle.priceRange },
                              isCash
                                ? { label: 'Est. off MSRP', value: deal.percentOffMsrp }
                                : { label: 'Term', value: deal.term },
                            ];

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
                                  dealTypeTag={dealTypeTag}
                                  editorsChoice={deal.vehicle.editorsChoice}
                                  tenBest={deal.vehicle.tenBest}
                                  isSaved={saved}
                                  onSaveClick={(e) => handleSaveClick(e, { name: vehicleName, slug: deal.vehicle.slug, image: deal.vehicle.image })}
                                  offers={offers}
                                  offersPopupOpen={offersPopup?.slug === deal.vehicle.slug}
                                  onToggleOffersPopup={(e) => toggleOffersPopup(e, deal.vehicle.make, deal.vehicle.model, deal.vehicle.slug)}
                                  onCloseOffersPopup={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    setOffersPopup(null);
                                  }}
                                  payment={payment}
                                  pill={pill}
                                  details={details}
                                  onDealClick={() => setActiveDealId(deal.id)}
                                />
                              </Fragment>
                            );
                          })}
                        </div>
                      </section>
                    </div>
                    <aside className="cf-deals-page__sidebar" aria-label="Advertisement">
                      <div className="cf-deals-page__sidebar-sticky">
                        {chunkIndex === 0 ? <AdSidebar /> : <AdSidebar {...SIDEBAR_AFTER_BREAK_PROPS} />}
                      </div>
                    </aside>
                  </div>
                  {chunkIndex < dealChunks.length - 1 && (
                    <div className="cf-deals-page__full-bleed-breaker" role="complementary" aria-label="Advertisement">
                      <AdBanner imageUrl={DEALS_GRID_BREAKER_AD_URL} altText="Advertisement" />
                    </div>
                  )}
                </Fragment>
              ))}
            </>
          )}

          <div className="cf-deals-page__segment cf-deals-page__segment--tail">
            <div className="cf-deals-page__main">
              {/* FAQ Section */}
              <section className="cf-deals-page__faq-section">
                <h2 className="cf-deals-page__section-title">Frequently Asked Questions About Car Deals</h2>
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
                  <Link to="/deals" className="cf-deals-page__link-card">
                    <h3>All Deals</h3>
                    <p>Browse every current deal and incentive</p>
                  </Link>
                  <Link to="/deals/best-buying-deals" className="cf-deals-page__link-card">
                    <h3>Best Buying Deals</h3>
                    <p>0% APR, special financing, and more when you buy</p>
                  </Link>
                  <Link to="/deals/lease" className="cf-deals-page__link-card">
                    <h3>Lease Deals</h3>
                    <p>Monthly lease specials on new cars</p>
                  </Link>
                  <Link to="/deals/suv" className="cf-deals-page__link-card">
                    <h3>SUV Deals</h3>
                    <p>Best deals on SUVs and crossovers</p>
                  </Link>
                  <Link to="/deals/truck" className="cf-deals-page__link-card">
                    <h3>Truck Deals</h3>
                    <p>Best deals on pickup trucks</p>
                  </Link>
                  <Link to="/rankings" className="cf-deals-page__link-card">
                    <h3>Car Rankings</h3>
                    <p>Expert rankings across every category</p>
                  </Link>
                </div>
              </section>
            </div>

            <aside className="cf-deals-page__sidebar" aria-label="Advertisement">
              <div className="cf-deals-page__sidebar-sticky">
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
        selectedIncentiveId={activeDealObj
          ? findMatchingIncentiveId(
              activeDealObj.vehicle.make,
              activeDealObj.vehicle.model,
              activeDealObj.type,
              activeDealObj.type === 'finance'
                ? { apr: (activeDealObj as { apr: string; term: string }).apr, term: (activeDealObj as { apr: string; term: string }).term }
                : undefined,
            )
          : undefined
        }
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

      <DealsFilterModal
        isOpen={filterOpen}
        onClose={() => setFilterOpen(false)}
        filters={filters}
        onApply={handleFilterApply}
        getResultCount={getResultCount}
        totalResults={displayDeals.length}
        dealPageType="finance"
        onDealTypeNavigate={handleDealTypeNavigate}
      />
    </div>
  );
};

export default CashFinanceDealsPage;
