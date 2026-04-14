import { Fragment, useMemo, useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronDown, ChevronUp, SlidersHorizontal, X } from 'lucide-react';
import { getLeaseDeals } from '../../services/leaseDealsService';
import { getCurrentPeriod, formatExpiration } from '../../utils/dateUtils';
import { buildSavingsText, parseTermMonths, inferCreditTier, creditTierQualifies, getVehicleOffers, offersToIncentives, getGlobalDealCounts } from '../../utils/dealCalculations';
import { useActiveFilterPills } from '../../hooks/useActiveFilterPills';
import type { VehicleOfferSummary } from '../../utils/dealCalculations';
import { useSupabaseRatings, getCategory } from '../../hooks/useSupabaseRating';
import { useAuth } from '../../contexts/AuthContext';
import { SEO, createBreadcrumbStructuredData, createFAQStructuredData } from '../../components/SEO';
import AdSidebar from '../../components/AdSidebar';
import { GridAd } from '../../components/GridAd';
import SignInToSaveModal from '../../components/SignInToSaveModal';
import IncentivesModal from '../../components/IncentivesModal/IncentivesModal';
import type { IncentiveOfferDetail } from '../../components/IncentivesModal/IncentivesModal';
import { DealsFilterModal } from '../../components/DealsFilterModal';
import type { DealsFilterState } from '../../components/DealsFilterModal';
import { DealCard } from '../../components/DealCard';
import './LeaseDealsHubPage.css';

const FAQ_DATA = [
  {
    question: 'What is a car lease?',
    answer:
      "A car lease is essentially a long-term rental agreement. You pay a monthly fee to drive a new vehicle for a set period (typically 24–36 months) and mileage limit, then return it at the end. Lease payments are usually lower than loan payments because you're only paying for the vehicle's depreciation during the lease term, not its full value.",
  },
  {
    question: 'How does Car and Driver find these lease deals?',
    answer:
      "Our editorial team monitors manufacturer incentive programs monthly. Every deal listed here comes directly from the automaker's current national offers. We verify terms, highlight the best values, and add our expert ratings so you can shop with confidence.",
  },
  {
    question: 'Do I need good credit to lease?',
    answer:
      "Most advertised lease deals require 'well-qualified' credit, typically a score of 700 or higher. If your credit is lower, you may still qualify but at different terms. We recommend checking with the dealer for personalized offers.",
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

const MOBILE_AD_INTERVAL = 4;

function slugForPath(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

const LeaseDealsHubPage = () => {
  const { getRating: getSupabaseRating } = useSupabaseRatings();
  const { user, isAuthenticated, addSavedVehicle, removeSavedVehicle } = useAuth();
  const { month, year } = getCurrentPeriod();
  const navigate = useNavigate();

  const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(null);
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [pendingSaveVehicle, setPendingSaveVehicle] = useState<{ name: string; slug: string; image?: string } | null>(null);
  const [activeDealId, setActiveDealId] = useState<string | null>(null);
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState<DealsFilterState>(DEFAULT_FILTERS);
  const handleFilterApply = useCallback((applied: DealsFilterState) => {
    const params = new URLSearchParams();
    params.set('filters', JSON.stringify(applied));
    navigate(`/deals/all?${params.toString()}`);
  }, [navigate]);
  const [offersPopup, setOffersPopup] = useState<{ slug: string; offers: VehicleOfferSummary[] } | null>(null);

  const allLeaseDeals = useMemo(() => getLeaseDeals(), []);

  const makeLinkItems = useMemo(() => {
    const byMake = new Map<string, string>();
    for (const d of allLeaseDeals) {
      const label = d.vehicle.make;
      byMake.set(label.toLowerCase(), label);
    }
    return [...byMake.entries()]
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([, label]) => ({ label, slug: slugForPath(label) }));
  }, [allLeaseDeals]);

  const bodyStyleLinkItems = useMemo(() => {
    const byStyle = new Map<string, string>();
    for (const d of allLeaseDeals) {
      const label = d.vehicle.bodyStyle;
      byStyle.set(label.toLowerCase(), label);
    }
    return [...byStyle.entries()]
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([, label]) => ({ label, slug: slugForPath(label) }));
  }, [allLeaseDeals]);

  const { pills: activeFilterPills, clearAllFilters } = useActiveFilterPills(filters, setFilters, DEFAULT_FILTERS);

  const matchesFilters = useCallback(
    (
      vehicle: { bodyStyle: string; make: string; fuelType: string; editorsChoice?: boolean; tenBest?: boolean; evOfTheYear?: boolean },
      deal?: { term?: string; targetAudience?: string },
    ) => {
      if (filters.bodyTypes.length > 0 && !filters.bodyTypes.includes(vehicle.bodyStyle)) return false;
      if (filters.makes.length > 0 && !filters.makes.includes(vehicle.make)) return false;
      if (filters.fuelTypes.length > 0 && !filters.fuelTypes.includes(vehicle.fuelType)) return false;
      if (filters.accolades.length > 0) {
        const hasMatch = filters.accolades.some((a) => {
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
    },
    [filters.bodyTypes, filters.makes, filters.fuelTypes, filters.accolades, filters.terms, filters.creditTier],
  );

  const toggleOffersPopup = useCallback(
    (e: React.MouseEvent, make: string, model: string, slug: string) => {
      e.preventDefault();
      e.stopPropagation();
      if (offersPopup?.slug === slug) {
        setOffersPopup(null);
      } else {
        setOffersPopup({ slug, offers: getVehicleOffers(make, model) });
      }
    },
    [offersPopup],
  );

  const getResultCount = useCallback((draftFilters: DealsFilterState): number => {
    if (draftFilters.dealType && draftFilters.dealType !== 'all') {
      const global = getGlobalDealCounts();
      return global[draftFilters.dealType as keyof typeof global] ?? global.all;
    }
    return getGlobalDealCounts().all;
  }, []);

  const deals = useMemo(() => {
    return getLeaseDeals()
      .filter((deal) => matchesFilters(deal.vehicle, { term: deal.term }))
      .map((deal) => ({
        ...deal,
        rating: getSupabaseRating(deal.vehicle.id, getCategory(deal.vehicle.bodyStyle), deal.vehicle.staffRating),
      }));
  }, [getSupabaseRating, matchesFilters]);

  const isVehicleSaved = (name: string) => user?.savedVehicles?.some((v) => v.name === name) || false;

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
      const sv = user?.savedVehicles?.find((v) => v.name === vehicle.name);
      if (sv) removeSavedVehicle(sv.id);
    } else {
      addSavedVehicle({ id: vehicle.slug, name: vehicle.name, ownership: 'want' });
    }
  };

  const activeDealObj = activeDealId ? deals.find((d) => d.id === activeDealId) : null;
  const activeOffer: Partial<IncentiveOfferDetail> | undefined = activeDealObj
    ? (() => {
        const v = activeDealObj.vehicle;
        const priceParts = v.priceRange.replace(/[^0-9,\-–]/g, '').split(/[-–]/);
        return {
          year: parseInt(v.year, 10),
          make: v.make,
          model: v.model,
          slug: v.slug,
          imageUrl: v.image,
          msrpMin: parseInt(priceParts[0]?.replace(/,/g, '') || '0', 10),
          msrpMax: parseInt(priceParts[1]?.replace(/,/g, '') || '0', 10),
          offerHeadline: `Lease for ${activeDealObj.monthlyPayment}/month`,
          whatItMeans: `Instead of buying, you're renting the car for ${activeDealObj.term}. Your monthly payment is just ${activeDealObj.monthlyPayment} with ${activeDealObj.dueAtSigning} due at signing.`,
          yourSavings: `${activeDealObj.monthlyPayment}/mo is significantly lower than a typical purchase payment. ${activeDealObj.dueAtSigning} due at signing. Includes ${activeDealObj.mileageAllowance} mileage allowance.`,
          whoQualifies: "Well-qualified lessees with approved credit through the manufacturer's financial arm.",
          eligibleTrims: activeDealObj.trimsEligible,
          dontWaitText: `This offer expires ${formatExpiration(activeDealObj.expirationDate)}. Manufacturer deals change monthly - once it's gone, there's no guarantee it'll come back.`,
          eventLabel: activeDealObj.programName,
          expirationDate: activeDealObj.expirationDate,
        };
      })()
    : undefined;

  const seoTitle = `Best Car Lease Deals for ${month} ${year}: Find the Best Lease Deals Right Now`;
  const h1Title = `Best Car Lease Deals for ${month} ${year}`;
  const description = `Compare the best car lease deals for ${month} ${year}. Find low monthly payments, short terms, and manufacturer lease specials from Car and Driver.`;
  const BASE_URL = 'https://www.caranddriver.com';

  return (
    <div className="lease-hub">
      <SEO
        title={seoTitle}
        description={description}
        canonical={`${BASE_URL}/lease-deals`}
        keywords={[
          'car lease deals',
          'best lease deals',
          `lease deals ${month} ${year}`,
          'manufacturer lease specials',
          'new car lease',
          'low monthly lease payment',
        ]}
        structuredData={[
          createBreadcrumbStructuredData([
            { name: 'Home', url: BASE_URL },
            { name: 'Lease Deals', url: `${BASE_URL}/lease-deals` },
          ]),
          createFAQStructuredData(FAQ_DATA),
        ]}
        noIndex={allLeaseDeals.length === 0}
      />

      <div className="lease-hub__hero">
        <div className="container">
          <div className="lease-hub__hero-content">
            <div className="lease-hub__hero-badge">
              <span className="hero-pill__label">Lease Deals Hub</span>
            </div>
            <nav className="lease-hub__breadcrumb" aria-label="Breadcrumb">
              <Link to="/">Home</Link>
              <span className="lease-hub__breadcrumb-sep">/</span>
              <span aria-current="page">Lease Deals</span>
            </nav>
            <h1 className="lease-hub__title">{h1Title}</h1>
            <p className="lease-hub__description">
              Car and Driver&apos;s editors track every manufacturer lease special so you don&apos;t have to. Below you&apos;ll find the best lease deals
              available right now, updated monthly with the latest offers. Use our ratings and filters to compare payments and find a lease that fits your
              budget.
            </p>
          </div>
        </div>
      </div>

      <div className="lease-hub__toolbar">
        <div className="container lease-hub__toolbar-inner">
          <div className="active-filter-pills__toolbar-left">
            <span className="active-filter-pills__count">
              {deals.length} {deals.length === 1 ? 'deal' : 'deals'}
            </span>
            {activeFilterPills.length > 0 && (
              <div className="active-filter-pills__row" aria-label="Active filters">
                {activeFilterPills.map((pill) => (
                  <span key={pill.id} className="active-filter-pills__pill">
                    <span className="active-filter-pills__pill-label">{pill.label}</span>
                    <button
                      type="button"
                      className="active-filter-pills__pill-x"
                      aria-label={`Remove ${pill.label} filter`}
                      onClick={pill.onRemove}
                    >
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

      <div className="lease-hub__content">
        <div className="container">
          <div className="lease-hub__layout">
            <div className="lease-hub__main">
              <section className="lease-hub__section">
                <div className="lease-hub__grid">
                  {deals.map((deal, i) => {
                    const vehicleName = `${deal.vehicle.year} ${deal.vehicle.make} ${deal.vehicle.model}`;
                    const saved = isVehicleSaved(vehicleName);
                    const allOffers = getVehicleOffers(deal.vehicle.make, deal.vehicle.model);
                    const { savingsVsAvg, savingsTooltip } = buildSavingsText(deal.monthlyPaymentNum, deal.vehicle.bodyStyle);
                    return (
                      <Fragment key={deal.id}>
                        {i > 0 && i % MOBILE_AD_INTERVAL === 0 && <GridAd />}
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
                          onCloseOffersPopup={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setOffersPopup(null);
                          }}
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
                            { label: 'Due at Signing', value: deal.dueAtSigning },
                          ]}
                          onDealClick={() => setActiveDealId(deal.id)}
                          secondaryCta={{ type: 'toggle', to: `/${deal.vehicle.slug}`, label: 'Read More' }}
                        />
                      </Fragment>
                    );
                  })}
                  {deals.length === 0 && (
                    <div className="lease-hub__empty-state">
                      <p className="lease-hub__empty-state-text">
                        There are currently no active lease offers. Check back soon or explore other available deals.
                      </p>
                      <Link to="/deals" className="lease-hub__empty-state-link">
                        Browse All Deals
                      </Link>
                    </div>
                  )}
                </div>
              </section>

              <section className="lease-hub__faq-section">
                <h2 className="lease-hub__section-title">Frequently Asked Questions About Leasing</h2>
                <div className="lease-hub__faq-list">
                  {FAQ_DATA.map((faq, i) => (
                    <div key={i} className={`lease-hub__faq-item ${expandedFaqIndex === i ? 'lease-hub__faq-item--expanded' : ''}`}>
                      <button
                        type="button"
                        className="lease-hub__faq-question"
                        onClick={() => setExpandedFaqIndex(expandedFaqIndex === i ? null : i)}
                        aria-expanded={expandedFaqIndex === i}
                      >
                        <span>{faq.question}</span>
                        {expandedFaqIndex === i ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                      </button>
                      {expandedFaqIndex === i && (
                        <div className="lease-hub__faq-answer">
                          <p>{faq.answer}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>

              {(makeLinkItems.length > 0 || bodyStyleLinkItems.length > 0) && (
                <section className="lease-hub__links-section">
                  <h2 className="lease-hub__section-title">Browse Lease Deals</h2>
                  {makeLinkItems.length > 0 && (
                    <>
                      <h3 className="lease-hub__links-subheading">Lease deals by make</h3>
                      <div className="lease-hub__links-grid">
                        {makeLinkItems.map(({ label, slug }) => (
                          <Link key={slug} to={`/${slug}/lease-deals`} className="lease-hub__link-card">
                            <h4 className="lease-hub__link-card-title">{label} lease deals</h4>
                            <p>Current manufacturer lease specials on {label} vehicles</p>
                          </Link>
                        ))}
                      </div>
                    </>
                  )}
                  {bodyStyleLinkItems.length > 0 && (
                    <>
                      <h3 className="lease-hub__links-subheading">Lease deals by body style</h3>
                      <div className="lease-hub__links-grid">
                        {bodyStyleLinkItems.map(({ label, slug }) => (
                          <Link key={slug} to={`/lease-deals/${slug}`} className="lease-hub__link-card">
                            <h4 className="lease-hub__link-card-title">{label} lease deals</h4>
                            <p>Manufacturer lease specials on {label} models</p>
                          </Link>
                        ))}
                      </div>
                    </>
                  )}
                </section>
              )}
            </div>
            <aside className="lease-hub__sidebar">
              <AdSidebar />
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

      <DealsFilterModal isOpen={filterOpen} onClose={() => setFilterOpen(false)} filters={filters} onApply={handleFilterApply} getResultCount={getResultCount} totalResults={deals.length} dealPageType="lease" />
    </div>
  );
};

export default LeaseDealsHubPage;
