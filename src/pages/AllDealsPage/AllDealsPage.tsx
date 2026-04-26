import { useMemo, useState, useCallback, useEffect, Fragment } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, X } from 'lucide-react';
import { getZeroAprDeals } from '../../services/zeroAprDealsService';
import { getFinanceDeals, getCashDeals } from '../../services/cashFinanceDealsService';
import { getCurrentPeriod, formatExpiration } from '../../utils/dateUtils';
import IncentivesModal, { getAprRangeLabel } from '../../components/IncentivesModal/IncentivesModal';
import type { IncentiveOfferDetail } from '../../components/IncentivesModal/IncentivesModal';
import { DealsFilterModal } from '../../components/DealsFilterModal';
import type { DealsFilterState } from '../../components/DealsFilterModal';
import { SEO, createBreadcrumbStructuredData } from '../../components/SEO';
import { DealCard } from '../../components/DealCard';
import SignInToSaveModal from '../../components/SignInToSaveModal';
import { useAuth } from '../../contexts/AuthContext';
import { parseMsrpMin, calcMonthly, parseTermMonths, buildSavingsText, getVehicleOffers, getGlobalDealCounts } from '../../utils/dealCalculations';
import { useActiveFilterPills } from '../../hooks/useActiveFilterPills';
import type { VehicleOfferSummary, RateTier } from '../../utils/dealCalculations';
import { getCashBackLabel } from '../../utils/dealCalculations';
import AdBanner from '../../components/AdBanner';
import AdSidebar from '../../components/AdSidebar';
import { GridAd } from '../../components/GridAd';
import { useFilterOpen } from '../../hooks/useFilterOpen';
import {
  GRID_BREAKER_AFTER_CARD_COUNT,
  DEALS_GRID_BREAKER_AD_URL,
  SIDEBAR_AFTER_BREAK_PROPS,
} from '../../constants/dealsLayout';
import { chunkArray } from '../../utils/chunkArray';
import './AllDealsPage.css';

interface MiniDeal {
  vehicleName: string;
  make: string;
  model: string;
  image: string;
  slug: string;
  priceRange: string;
  bodyStyle: string;
  fuelType: string;
  dealType: 'zero-apr' | 'finance' | 'lease' | 'cash';
  dealText: string;
  dealHeadline: string;
  whatItMeans: string;
  savingsNote: string;
  whoQualifies: string;
  programName: string;
  programDescription: string;
  trimsEligible: string[];
  expirationDate: string;
  editorsChoice?: boolean;
  tenBest?: boolean;
  staffRating?: number;
  monthlyPayment?: string;
  estimatedMonthly: string;
  aprDisplay?: string;
  monthlyNum: number;
  savingsVsAvg: string;
  savingsTooltip: string;
  term?: string;
  rateTiers?: RateTier[];
}

const DEFAULT_FILTERS: DealsFilterState = {
  tab: 'best-deals',
  dealType: 'all',
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

function parseFiltersFromUrl(raw: string | null): DealsFilterState | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw);
    return { ...DEFAULT_FILTERS, ...parsed };
  } catch {
    return null;
  }
}

const AllDealsPage = () => {
  const { month, year } = getCurrentPeriod();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeDeal, setActiveDeal] = useState<MiniDeal | null>(null);
  const [filterOpen, setFilterOpen] = useFilterOpen();
  const [filters, setFilters] = useState<DealsFilterState>(() => {
    return parseFiltersFromUrl(searchParams.get('filters')) ?? DEFAULT_FILTERS;
  });
  useEffect(() => {
    if (searchParams.has('filters')) {
      searchParams.delete('filters');
      setSearchParams(searchParams, { replace: true });
    }
  }, []);

  // Save-state now lives on the authenticated user like every other deals
  // listing (P1.15 in the 2026-04-18 audit). Unauthenticated taps open the
  // sign-in modal so saves persist across sessions.
  const { user, isAuthenticated, addSavedVehicle, removeSavedVehicle } = useAuth();
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [pendingSaveVehicle, setPendingSaveVehicle] = useState<{ name: string; slug: string; image?: string } | null>(null);
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

  const isVehicleSaved = useCallback(
    (vehicleName: string) => user?.savedVehicles?.some((v) => v.name === vehicleName) ?? false,
    [user],
  );

  const handleSaveClick = useCallback(
    (e: React.MouseEvent, vehicle: { name: string; slug: string; image?: string }) => {
      e.preventDefault();
      e.stopPropagation();
      if (!isAuthenticated) {
        setPendingSaveVehicle(vehicle);
        setShowSignInModal(true);
        return;
      }
      const saved = user?.savedVehicles?.find((v) => v.name === vehicle.name);
      if (saved) {
        removeSavedVehicle(saved.id);
        return;
      }
      addSavedVehicle({ id: vehicle.slug, name: vehicle.name, ownership: 'want' });
    },
    [isAuthenticated, user, addSavedVehicle, removeSavedVehicle],
  );

  const { pills: activeFilterPills, clearAllFilters } = useActiveFilterPills(filters, setFilters, DEFAULT_FILTERS);

  // The all-deals dataset only contains 0% APR, finance, and cash rows —
  // lease deals live on `/deals/lease`. Choosing lease on this page used
  // to silently return zero results (P0.2 in the 2026-04-18 audit); now
  // we route the user to the lease listing carrying their filter context.
  const handleFilterApply = useCallback((applied: DealsFilterState) => {
    if (applied.dealType === 'lease') {
      navigate('/deals/lease', { state: { filters: applied } });
      return;
    }
    setFilters(applied);
  }, [navigate]);

  const allDeals = useMemo(() => {
    const deals: MiniDeal[] = [];

    getZeroAprDeals()
      .forEach(d => {
        const msrp = parseMsrpMin(d.vehicle.priceRange);
        const months = parseTermMonths(d.term);
        const monthly = calcMonthly(msrp, 0, months);
        const savings = buildSavingsText(monthly, d.vehicle.bodyStyle, 'zero-apr');
        deals.push({
          vehicleName: `${d.vehicle.year} ${d.vehicle.make} ${d.vehicle.model}`,
          make: d.vehicle.make, model: d.vehicle.model, image: d.vehicle.image,
          slug: d.vehicle.slug, priceRange: d.vehicle.priceRange,
          bodyStyle: d.vehicle.bodyStyle, fuelType: d.vehicle.fuelType,
          dealType: 'zero-apr',
          dealText: '0% APR Financing',
          dealHeadline: `0% Interest Financing for ${d.term}`,
          whatItMeans: 'You pay absolutely zero interest on your auto loan. Every dollar goes toward the price of the car.',
          savingsNote: `On a $35,000 loan over ${d.term}, you'd save thousands in interest vs. the average 6.5% rate.`,
          whoQualifies: d.targetAudience,
          programName: d.programName, programDescription: d.programDescription,
          trimsEligible: d.trimsEligible, expirationDate: d.expirationDate,
          editorsChoice: d.vehicle.editorsChoice, tenBest: d.vehicle.tenBest,
          staffRating: d.vehicle.staffRating, term: d.term,
          estimatedMonthly: `$${monthly.toLocaleString()}`, aprDisplay: '0%', monthlyNum: monthly,
          savingsVsAvg: savings.savingsVsAvg, savingsTooltip: savings.savingsTooltip,
        });
      });

    getFinanceDeals().forEach(d => {
        const msrp = parseMsrpMin(d.vehicle.priceRange);
        const aprNum = parseFloat(d.apr.replace('%', ''));
        const months = parseTermMonths(d.term);
        const monthly = calcMonthly(msrp, aprNum, months);
        const savings = buildSavingsText(monthly, d.vehicle.bodyStyle, 'finance');
        const rangeLabel = getAprRangeLabel({ value: `${d.apr} APR`, title: d.programName, terms: d.term, rateTiers: d.rateTiers });
        deals.push({
          vehicleName: `${d.vehicle.year} ${d.vehicle.make} ${d.vehicle.model}`,
          make: d.vehicle.make, model: d.vehicle.model, image: d.vehicle.image,
          slug: d.vehicle.slug, priceRange: d.vehicle.priceRange,
          bodyStyle: d.vehicle.bodyStyle, fuelType: d.vehicle.fuelType,
          dealType: 'finance',
          dealText: rangeLabel,
          dealHeadline: `${d.apr} APR Financing for ${d.term}`,
          whatItMeans: `A below-market interest rate from the manufacturer that lowers your monthly payment.`,
          savingsNote: `At ${d.apr} instead of 6.5%, you could save $1,500–$3,000 in interest.`,
          whoQualifies: d.targetAudience,
          programName: d.programName, programDescription: d.programDescription,
          trimsEligible: d.trimsEligible, expirationDate: d.expirationDate,
          editorsChoice: d.vehicle.editorsChoice, tenBest: d.vehicle.tenBest,
          staffRating: d.vehicle.staffRating, term: d.term,
          estimatedMonthly: `$${monthly.toLocaleString()}`, aprDisplay: rangeLabel.replace(/\s*APR$/, ''), monthlyNum: monthly,
          savingsVsAvg: savings.savingsVsAvg, savingsTooltip: savings.savingsTooltip,
          rateTiers: d.rateTiers,
        });
      });

    getCashDeals().forEach(d => {
        const msrp = parseMsrpMin(d.vehicle.priceRange);
        const principal = Math.max(msrp - d.incentiveAmount, 1);
        const monthlyAfterCash = calcMonthly(principal, 6.5, 60);
        const savings = buildSavingsText(monthlyAfterCash, d.vehicle.bodyStyle, 'cash');
        deals.push({
          vehicleName: `${d.vehicle.year} ${d.vehicle.make} ${d.vehicle.model}`,
          make: d.vehicle.make, model: d.vehicle.model, image: d.vehicle.image,
          slug: d.vehicle.slug, priceRange: d.vehicle.priceRange,
          bodyStyle: d.vehicle.bodyStyle, fuelType: d.vehicle.fuelType,
          dealType: 'cash',
          dealText: `${d.incentiveValue} cash back`,
          dealHeadline: 'Cash Back',
          whatItMeans: 'Manufacturer customer cash reduces the amount you finance or pay at signing, often instead of a promotional APR.',
          savingsNote: `${d.incentiveValue} in customer cash on eligible trims. Eligibility and stacking rules vary by dealer.`,
          whoQualifies: 'Retail buyers on select new vehicles; see program details for restrictions.',
          programName: d.programName, programDescription: d.programDescription,
          trimsEligible: d.trimsEligible, expirationDate: d.expirationDate,
          editorsChoice: d.vehicle.editorsChoice, tenBest: d.vehicle.tenBest,
          staffRating: d.vehicle.staffRating,
          estimatedMonthly: d.incentiveValue, monthlyNum: monthlyAfterCash,
          savingsVsAvg: `${d.percentOffMsrp} off MSRP`,
          savingsTooltip: savings.savingsTooltip,
        });
      });

    return deals;
  }, []);

  const applyFiltersToDeals = useCallback((dealList: MiniDeal[], f: DealsFilterState): MiniDeal[] => {
    return dealList.filter(d => {
      if (f.dealType === 'lease') { if (d.dealType !== 'lease') return false; }
      else if (f.dealType === 'finance') { if (d.dealType === 'lease') return false; }
      if (f.bodyTypes.length > 0 && !f.bodyTypes.includes(d.bodyStyle)) return false;
      if (f.makes.length > 0 && !f.makes.includes(d.make)) return false;
      if (f.fuelTypes.length > 0 && !f.fuelTypes.includes(d.fuelType)) return false;
      if (f.accolades.length > 0) {
        const hasMatch = f.accolades.some(a => {
          if (a === 'editorsChoice') return d.editorsChoice;
          if (a === 'tenBest') return d.tenBest;
          return false;
        });
        if (!hasMatch) return false;
      }
      if (f.terms.length > 0 && d.term) {
        if (!f.terms.includes(parseTermMonths(d.term))) return false;
      }
      if (f.monthlyPaymentMin > 0 || f.monthlyPaymentMax < 1500) {
        if (d.monthlyNum < f.monthlyPaymentMin || d.monthlyNum > f.monthlyPaymentMax) return false;
      }
      return true;
    });
  }, []);

  const filteredDeals = useMemo(() => {
    const filtered = applyFiltersToDeals(allDeals, filters);
    const sorted = [...filtered];
    switch (filters.sortBy) {
      case 'a-z':
        sorted.sort((a, b) => `${a.make} ${a.model}`.localeCompare(`${b.make} ${b.model}`));
        break;
      case 'expiring-soon':
        sorted.sort((a, b) => new Date(a.expirationDate).getTime() - new Date(b.expirationDate).getTime());
        break;
      case 'rating-high':
        sorted.sort((a, b) => (b.staffRating ?? 0) - (a.staffRating ?? 0));
        break;
      case 'payment-low':
        sorted.sort((a, b) => a.monthlyNum - b.monthlyNum);
        break;
      default:
        break;
    }
    return sorted;
  }, [allDeals, filters, applyFiltersToDeals]);

  const dealChunks = useMemo(() => chunkArray(filteredDeals, GRID_BREAKER_AFTER_CARD_COUNT), [filteredDeals]);

  const getResultCount = useCallback((): number => {
    return getGlobalDealCounts().all;
  }, []);

  const emptyDealsCategory = 'deal';

  const handleDealClick = (e: React.MouseEvent, deal: MiniDeal) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveDeal(deal);
  };

  const closeDealModal = () => setActiveDeal(null);

  const activeOffer: Partial<IncentiveOfferDetail> | undefined = activeDeal
    ? (() => {
        const parts = activeDeal.vehicleName.split(' ');
        const yr = parseInt(parts[0], 10) || 2026;
        const mk = parts[1] || activeDeal.make;
        const mdl = parts.slice(2).join(' ') || activeDeal.model;
        const priceParts = activeDeal.priceRange.replace(/[^0-9,\-–]/g, '').split(/[-–]/);
        return {
          year: yr, make: mk, model: mdl, slug: activeDeal.slug, imageUrl: activeDeal.image,
          msrpMin: parseInt(priceParts[0]?.replace(/,/g, '') || '0', 10),
          msrpMax: parseInt(priceParts[1]?.replace(/,/g, '') || '0', 10),
          offerHeadline: activeDeal.dealHeadline,
          whatItMeans: activeDeal.whatItMeans,
          yourSavings: activeDeal.savingsNote,
          whoQualifies: activeDeal.whoQualifies,
          eligibleTrims: activeDeal.trimsEligible,
          dontWaitText: `This offer expires ${formatExpiration(activeDeal.expirationDate)}. Manufacturer deals change monthly. Once it's gone, there's no guarantee it'll come back.`,
          eventLabel: activeDeal.programName,
          expirationDate: activeDeal.expirationDate,
        };
      })()
    : undefined;

  const BASE_URL = 'https://www.caranddriver.com';

  return (
    <div className="all-deals">
      <SEO
        title={`All Car Deals & Incentives for ${month} ${year}`}
        description={`Browse every current car deal, incentive, and offer for ${month} ${year}. 0% APR, finance rates, and lease specials - all in one place.`}
        canonical={`${BASE_URL}/deals/all`}
        keywords={['all car deals', 'car incentives', `car deals ${month} ${year}`, 'new car offers']}
        structuredData={createBreadcrumbStructuredData([
          { name: 'Home', url: BASE_URL },
          { name: 'Deals', url: `${BASE_URL}/deals` },
          { name: 'All Deals', url: `${BASE_URL}/deals/all` },
        ])}
        noIndex={allDeals.length === 0}
      />

      <div className="all-deals__hero">
        <div className="container">
          <div className="all-deals__hero-content">
            <nav className="all-deals__breadcrumb" aria-label="Breadcrumb">
              <Link to="/">Home</Link>
              <span className="all-deals__breadcrumb-sep">/</span>
              <Link to="/deals">Deals</Link>
              <span className="all-deals__breadcrumb-sep">/</span>
              <span>All Deals</span>
            </nav>
            <h1 className="all-deals__title">All Deals for {month} {year}</h1>
            <p className="all-deals__description">
              Every current manufacturer incentive in one place - 0% APR financing,
              special finance rates, and lease specials, all paired with Car and Driver expert ratings.
            </p>
          </div>
        </div>
      </div>

      <div className="all-deals__toolbar">
        <div className="container all-deals__toolbar-inner">
          <div className="active-filter-pills__toolbar-left">
            <span className="active-filter-pills__count">{filteredDeals.length} {filteredDeals.length === 1 ? 'deal' : 'deals'}</span>
            <div className="active-filter-pills__row" aria-label="Active filters">
              {activeFilterPills.length === 0 && (
                <span className="active-filter-pills__pill active-filter-pills__pill--static">
                  <span className="active-filter-pills__pill-label">All Deals</span>
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
              <span className="deals-filter-badge" aria-label={`${activeFilterPills.length} active filters`}>{activeFilterPills.length}</span>
            )}
          </button>
        </div>
      </div>

      <AdBanner imageUrl="https://d2kde5ohu8qb21.cloudfront.net/files/693a37c1e2108b000272edd6/nissan.jpg" altText="Advertisement" minimalDesktop mobileCompact />

      <div className="all-deals__content">
        <div className="container">
          {filteredDeals.length > 0 ? (
            <>
              {dealChunks.map((chunk, chunkIndex) => (
                <Fragment key={`all-segment-${chunkIndex}`}>
                  <div className="all-deals__segment">
                    <div className="all-deals__main">
                      <div className="all-deals__grid" role="list">
                        {chunk.map((deal, i) => {
                          const cardKey = `${deal.slug}-${deal.dealType}-${chunkIndex}-${i}`;
                          const offers = getVehicleOffers(deal.make, deal.model);
                          const isSaved = isVehicleSaved(deal.vehicleName);
                          const dealTypeTag = deal.dealType === 'lease' ? 'Lease' : deal.dealType === 'cash' ? 'Cash' : 'Buy';
                          const pillChipLabel = deal.dealType === 'lease' ? 'Lease' : deal.dealType === 'cash' ? 'Cash' : 'Buy';
                          const paymentAmount = (deal.dealType === 'zero-apr' || deal.dealType === 'finance') ? deal.aprDisplay : deal.estimatedMonthly;
                          const paymentPeriod = deal.dealType === 'cash'
                            ? 'Cash Back'
                            : (deal.dealType === 'zero-apr' || deal.dealType === 'finance')
                              ? ' APR'
                              : '/mo';

                          // Calculate cash back label for tiered finance deals
                          const cashBackLabel = deal.dealType === 'finance' ? getCashBackLabel(deal.rateTiers) : undefined;

                          const cardDetails = [
                            { label: 'MSRP Range', value: deal.priceRange },
                            ...(deal.term ? [{ label: 'Term', value: deal.term }] : []),
                          ];
                          return (
                            <Fragment key={cardKey}>
                              {i > 0 && i % 4 === 0 && (
                                <GridAd />
                              )}
                              <DealCard
                                slug={deal.slug}
                                vehicleName={deal.vehicleName}
                                vehicleImage={deal.image}
                                vehicleSlug={deal.slug}
                                vehicleMake={deal.make}
                                vehicleModel={deal.model}
                                {...(deal.staffRating != null ? { rating: deal.staffRating } : {})}
                                dealTypeTag={dealTypeTag}
                                editorsChoice={deal.editorsChoice}
                                tenBest={deal.tenBest}
                                isSaved={isSaved}
                                onSaveClick={(e) => handleSaveClick(e, { name: deal.vehicleName, slug: deal.slug, image: deal.image })}
                                offers={offers}
                                offersPopupOpen={offersPopup?.slug === deal.slug}
                                onToggleOffersPopup={(e) => toggleOffersPopup(e, deal.make, deal.model, deal.slug)}
                                onCloseOffersPopup={(e) => { e.preventDefault(); e.stopPropagation(); setOffersPopup(null); }}
                                payment={{
                                  amount: paymentAmount ?? '',
                                  period: paymentPeriod,
                                  savings: { type: 'savings-text', text: deal.savingsVsAvg },
                                  savingsTooltip: deal.savingsTooltip,
                                  expirationDate: deal.expirationDate,
                                  cashBackLabel,
                                }}
                                pill={{
                                  chipLabel: pillChipLabel,
                                  text: deal.dealText,
                                  expirationDate: deal.expirationDate,
                                }}
                                details={cardDetails}
                                onDealClick={(e) => handleDealClick(e, deal)}
                              />
                            </Fragment>
                          );
                        })}
                      </div>
                    </div>
                    <aside className="all-deals__sidebar" aria-label="Advertisement">
                      <div className="all-deals__sidebar-sticky">
                        {chunkIndex === 0 ? <AdSidebar /> : <AdSidebar {...SIDEBAR_AFTER_BREAK_PROPS} />}
                      </div>
                    </aside>
                  </div>
                  {chunkIndex < dealChunks.length - 1 && (
                    <div className="all-deals__full-bleed-breaker" role="complementary" aria-label="Advertisement">
                      <AdBanner imageUrl={DEALS_GRID_BREAKER_AD_URL} altText="Advertisement" />
                    </div>
                  )}
                </Fragment>
              ))}
            </>
          ) : (
            <div className="all-deals__empty-state">
              <p className="all-deals__empty-state-text">
                There are currently no active {emptyDealsCategory} offers. Check back soon or explore other available deals.
              </p>
              <Link to="/deals" className="all-deals__empty-state-link">
                Browse All Deals
              </Link>
            </div>
          )}
        </div>
      </div>

      <IncentivesModal
        isOpen={!!activeDeal}
        onClose={closeDealModal}
        variant="conversion-b"
        offer={activeOffer}
      />

      <DealsFilterModal
        isOpen={filterOpen}
        onClose={() => setFilterOpen(false)}
        filters={filters}
        onApply={handleFilterApply}
        totalResults={filteredDeals.length}
        getResultCount={getResultCount}
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
    </div>
  );
};

export default AllDealsPage;
