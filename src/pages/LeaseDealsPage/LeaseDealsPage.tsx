import { Fragment, useMemo, useState, useCallback, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ChevronDown, ChevronUp, SlidersHorizontal, X } from 'lucide-react';
import { getLeaseDeals } from '../../services/leaseDealsService';
import { getCurrentPeriod, formatExpiration } from '../../utils/dateUtils';
import { parseTermMonths, inferCreditTier, creditTierQualifies, getVehicleOffers, offersToIncentives, findMatchingIncentiveId, sortDeals, applyLeaseRangeFilters } from '../../utils/dealCalculations';
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
import type { DealsFilterState, DealTypeOption } from '../../components/DealsFilterModal';
import { BEST_BUYING_DEALS_PATH } from '../../constants/dealRoutes';
import { useFilterOpen } from '../../hooks/useFilterOpen';
import { resolveLeaseFilterDestination } from '../../utils/leaseFilterNavigation';
import './LeaseDealsPage.css';

const FAQ_DATA: { question: string; answer: string; bullets?: string[] }[] = [
  {
    question: 'Can you lease a car with no money down?',
    answer: 'Yes, you can lease a car with no money down, but that usually means more of the upfront cost gets pushed into the monthly payment. In many offers, taxes, registration, acquisition fees, or even the first payment are still due at signing unless the ad specifically says everything is rolled in.\n\nA zero-down lease can help preserve cash and may be safer than putting a large amount upfront if the vehicle is stolen or totaled early in the term. But it is not automatically the cheapest option, so the smarter comparison is total lease cost over the full term, not just what is due on day one.',
    bullets: [
      'Verify whether "$0 down" also means "$0 due at signing."',
      'Compare total paid over the full 24- or 36-month term, not just the headline payment.',
      'Ask whether taxes, acquisition fee, and registration are included or rolled into the payment.',
      'Check mileage limits and end-of-lease fees before signing.',
    ],
  },
  {
    question: 'What credit score do you need to lease a car?',
    answer: 'There is no single minimum credit score for every lease, but the best advertised lease specials usually go to shoppers with strong, top-tier credit. A 650 score may qualify with some lenders, while a 500 score is much tougher and often means fewer vehicle choices, a larger amount due at signing, or the need for a co-signer.\n\nDealers and lenders also look beyond the score itself. Income, debt, prior auto history, payment history, and stability all affect approval, so shoppers should assume the headline lease payment is built for well-qualified customers unless the fine print says otherwise.',
    bullets: [
      'Ask whether the advertised payment assumes top-tier credit.',
      'Bring proof of income and be ready to explain recent credit issues if needed.',
      'A trade-in, larger upfront payment, or co-signer can improve approval odds.',
      'If approval is tight, compare the lease against a lower-priced model or a used-car loan.',
    ],
  },
  {
    question: 'Can you really lease a car for $200 to $300 a month?',
    answer: 'Sometimes, yes, but usually only on smaller, lower-trim vehicles or outgoing inventory with strong incentives. The lowest advertised lease payments often assume top-tier credit, limited annual mileage, a short term, and some money due at signing.\n\nThe more useful question is not just whether a $199 or $299 payment exists, but what you are giving up to get it. A slightly higher payment with lower drive-off costs, more realistic mileage, or fewer fees can easily be the better deal for a real shopper.',
    bullets: [
      'Check the amount due at signing before comparing monthly payments.',
      'Confirm mileage allowance, taxes, registration, and dealer fees.',
      'Expect payments to rise quickly on higher trims or popular option packages.',
      'Remember that lease offers change by ZIP code, inventory, and month.',
    ],
  },
  {
    question: 'Can you negotiate a car lease?',
    answer: 'Yes, parts of a lease are negotiable, especially the selling price of the vehicle, the trade-in value, and sometimes certain end-of-lease fees. The pieces with the least flexibility are usually lender-set items such as residual value and acquisition fee.\n\nThe smartest way to negotiate a lease is to work the deal in layers. Nail down the vehicle price first, then review how the payment is built, because a dealer can make the monthly number look lower by extending the term or moving costs into the upfront amount.',
    bullets: [
      'Focus on cap cost, money due at signing, mileage allowance, and disposition fee.',
      'Ask for an itemized lease worksheet instead of discussing only the monthly payment.',
      'Compare quotes from more than one dealer, especially near month-end or quarter-end.',
      'Read the final contract closely to make sure it matches the quote.',
    ],
  },
  {
    question: 'What are the biggest downsides and red flags in a car lease?',
    answer: 'The biggest downside to leasing is that you keep making payments without building ownership equity. A lease can look affordable at first, but excess-mileage charges, wear-and-tear bills, disposition fees, insurance requirements, and early termination costs can make it more expensive than shoppers expect.\n\nThe biggest red flags are vague fees, low headline payments tied to large upfront costs, unrealistic mileage caps, and numbers that change when the contract shows up. If the dealer cannot clearly explain every fee on the worksheet, that is a warning sign by itself.',
    bullets: [
      'Match the mileage limit to how you really drive, not how the ad is structured.',
      'Ask how wear-and-tear, tire damage, and excess mileage are billed at turn-in.',
      'Confirm whether gap coverage is included and what happens if you end the lease early.',
      'Compare the signed contract against the original quote line by line.',
    ],
  },
  {
    question: 'Is it better to lease or buy a car?',
    answer: 'Leasing is usually better for shoppers who want a lower monthly payment, a newer car every few years, and less interest in long-term ownership. Buying is usually better if you drive a lot, want to keep the vehicle after the loan is paid off, or want the freedom to customize and build equity.\n\nFor most shoppers, the real difference is time horizon. If you swap vehicles often, a strong lease can make sense. If you keep cars for years, buying usually wins on long-term value because the payment eventually ends and the car is still yours.',
    bullets: [
      'Lease if lower payment and short commitment matter most.',
      'Buy if you want long-term value, no mileage limits, and ownership flexibility.',
      'Compare 3-year out-of-pocket cost against 6- to 8-year ownership cost.',
      'Check insurance, fees, residual value, and the lease buyout option before deciding.',
    ],
  },
];

const DEFAULT_FILTERS: DealsFilterState = {
  tab: 'best-deals',
  dealType: 'lease',
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

const LeaseDealsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { getRating: getSupabaseRating } = useSupabaseRatings();
  const { user, isAuthenticated, addSavedVehicle, removeSavedVehicle } = useAuth();
  const { month, year } = getCurrentPeriod();

  const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(null);
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [pendingSaveVehicle, setPendingSaveVehicle] = useState<{ name: string; slug: string; image?: string } | null>(null);
  const [activeDealId, setActiveDealId] = useState<string | null>(null);
  const [filterOpen, setFilterOpen] = useFilterOpen();
  const initialFiltersFromState = (location.state as { filters?: DealsFilterState } | null)?.filters;
  const [filters, setFilters] = useState<DealsFilterState>(initialFiltersFromState ?? DEFAULT_FILTERS);

  // Hydrate filters when the user arrives from a branded lease page with a
  // multi-make selection, then clear the router state so refreshes reset.
  useEffect(() => {
    const incoming = (location.state as { filters?: DealsFilterState } | null)?.filters;
    if (incoming) {
      setFilters(incoming);
      navigate(location.pathname, { replace: true, state: null });
    }
  }, [location.state, location.pathname, navigate]);
  const handleFilterApply = useCallback((applied: DealsFilterState) => {
    const dest = resolveLeaseFilterDestination(applied);
    if (dest && dest.path !== '/deals/lease') {
      navigate(dest.path, dest.carryFilters ? { state: { filters: applied } } : undefined);
      return;
    }
    setFilters(applied);
  }, [navigate]);

  const handleDealTypeNavigate = useCallback((dealType: DealTypeOption, carriedFilters: DealsFilterState) => {
    if (dealType === 'finance' || dealType === 'cash' || dealType === 'all') {
      navigate(BEST_BUYING_DEALS_PATH, { state: { filters: carriedFilters } });
    }
  }, [navigate]);

  const allLeaseDeals = useMemo(() => getLeaseDeals(), []);

  const getResultCount = useCallback((draftFilters: DealsFilterState): number => {
    return allLeaseDeals.filter(deal => {
      const v = deal.vehicle;
      if (draftFilters.bodyTypes.length > 0 && !draftFilters.bodyTypes.includes(v.bodyStyle)) return false;
      if (draftFilters.makes.length > 0 && !draftFilters.makes.includes(v.make)) return false;
      if (draftFilters.fuelTypes.length > 0 && !draftFilters.fuelTypes.includes(v.fuelType)) return false;
      if (draftFilters.accolades.length > 0) {
        const hasMatch = draftFilters.accolades.some(a => {
          if (a === 'editorsChoice') return v.editorsChoice;
          if (a === 'tenBest') return v.tenBest;
          return false;
        });
        if (!hasMatch) return false;
      }
      if (draftFilters.terms.length > 0 && deal.term) {
        if (!draftFilters.terms.includes(parseTermMonths(deal.term))) return false;
      }
      if (deal.monthlyPaymentNum < draftFilters.monthlyPaymentMin || deal.monthlyPaymentNum > draftFilters.monthlyPaymentMax) return false;
      const signingNum = parseInt(deal.dueAtSigning.replace(/[^0-9]/g, ''), 10) || 0;
      if (signingNum < draftFilters.dueAtSigningMin || signingNum > draftFilters.dueAtSigningMax) return false;
      return true;
    }).length;
  }, [allLeaseDeals]);
  const [offersPopup, setOffersPopup] = useState<{ slug: string; offers: VehicleOfferSummary[] } | null>(null);

  const { pills: activeFilterPills } = useActiveFilterPills(filters, setFilters, DEFAULT_FILTERS);
  const clearAllFilters = useCallback(() => setFilters(DEFAULT_FILTERS), []);

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
    const filtered = getLeaseDeals()
      .filter(deal => matchesFilters(deal.vehicle, { term: deal.term }))
      .map((deal) => {
        const signingNum = parseInt(deal.dueAtSigning.replace(/[^0-9]/g, ''), 10) || 0;
        return {
          ...deal,
          rating: getSupabaseRating(deal.vehicle.id, getCategory(deal.vehicle.bodyStyle), deal.vehicle.staffRating),
          dueAtSigningNum: signingNum,
        };
      });
    const ranged = applyLeaseRangeFilters(
      filtered,
      filters.monthlyPaymentMin, filters.monthlyPaymentMax,
      filters.dueAtSigningMin, filters.dueAtSigningMax,
    );
    return sortDeals(ranged, filters.sortBy);
  }, [getSupabaseRating, matchesFilters, filters.monthlyPaymentMin, filters.monthlyPaymentMax, filters.dueAtSigningMin, filters.dueAtSigningMax, filters.sortBy]);

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

  const pageTitle = `Best Car Lease Deals for ${month} ${year}`;
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
              the best manufacturer lease specials and paired them with our expert vehicle ratings so you can find the
              best value for your budget.
            </p>
          </div>
        </div>
      </div>

      <div className="lease-deals-page__toolbar">
        <div className="container lease-deals-page__toolbar-inner">
          <div className="active-filter-pills__toolbar-left">
            <span className="active-filter-pills__count">{deals.length} {deals.length === 1 ? 'deal' : 'deals'}</span>
            <div className="active-filter-pills__row" aria-label="Active filters">
              {activeFilterPills.length === 0 && (
                <span className="active-filter-pills__pill active-filter-pills__pill--static">
                  <span className="active-filter-pills__pill-label">Lease Deals</span>
                </span>
              )}
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
                      {expandedFaqIndex === i && (
                        <div className="lease-deals-page__faq-answer">
                          {faq.answer.split('\n\n').map((para, j) => <p key={j}>{para}</p>)}
                          {faq.bullets && faq.bullets.length > 0 && (
                            <>
                              <p><strong>Things to keep in mind:</strong></p>
                              <ul>
                                {faq.bullets.map((b, j) => <li key={j}>{b}</li>)}
                              </ul>
                            </>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>

              <section className="lease-deals-page__links-section">
                <h2 className="lease-deals-page__section-title">Explore More Deals</h2>
                <div className="lease-deals-page__links-grid">
                  <Link to="/deals/0-percent-apr" className="lease-deals-page__link-card"><h3>Best 0% APR Deals</h3><p>Interest-free manufacturer financing in one list</p></Link>
                  <Link to="/deals/best-buying-deals" className="lease-deals-page__link-card"><h3>Best Car Deals and Incentives</h3><p>Cash back, special financing, and more</p></Link>
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
        selectedIncentiveId={activeDealObj ? findMatchingIncentiveId(activeDealObj.vehicle.make, activeDealObj.vehicle.model, 'lease', { value: activeDealObj.monthlyPayment }) : undefined}
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
        onDealTypeNavigate={handleDealTypeNavigate}
      />
    </div>
  );
};

export default LeaseDealsPage;
