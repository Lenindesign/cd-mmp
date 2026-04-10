import { useMemo, useState, useCallback, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ChevronUp, ChevronDown, SlidersHorizontal, Heart, Info, X } from 'lucide-react';
import { getZeroAprDeals } from '../../services/zeroAprDealsService';
import { getFinanceDeals, getCashDeals } from '../../services/cashFinanceDealsService';
import { getLeaseDeals } from '../../services/leaseDealsService';
import { getCurrentPeriod, formatExpiration } from '../../utils/dateUtils';
import IncentivesModal, { getAprRangeLabel } from '../../components/IncentivesModal/IncentivesModal';
import type { IncentiveOfferDetail } from '../../components/IncentivesModal/IncentivesModal';
import { DealsFilterModal } from '../../components/DealsFilterModal';
import type { DealsFilterState } from '../../components/DealsFilterModal';
import { SEO, createBreadcrumbStructuredData } from '../../components/SEO';
import { EDITORS_CHOICE_BADGE_URL, TEN_BEST_BADGE_URL } from '../../constants/badges';
import { parseMsrpMin, calcMonthly, parseTermMonths, buildSavingsText, getVehicleOffers } from '../../utils/dealCalculations';
import { useActiveFilterPills } from '../../hooks/useActiveFilterPills';
import type { VehicleOfferSummary } from '../../utils/dealCalculations';
import './AllDealsPage.css';

interface MiniDeal {
  vehicleName: string;
  make: string;
  model: string;
  image: string;
  slug: string;
  priceRange: string;
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
}

type DealTypeFilter = 'all' | 'zero-apr' | 'finance' | 'lease' | 'cash';

const DEAL_TYPE_LABELS: Record<DealTypeFilter, string> = {
  all: 'All Deals',
  'zero-apr': '0% APR',
  finance: 'Finance',
  lease: 'Lease',
  cash: 'Cash',
};

const DEFAULT_FILTERS: DealsFilterState = {
  tab: 'best-deals',
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
  sortBy: 'recommended',
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
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeDeal, setActiveDeal] = useState<MiniDeal | null>(null);
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState<DealsFilterState>(() => {
    return parseFiltersFromUrl(searchParams.get('filters')) ?? DEFAULT_FILTERS;
  });
  useEffect(() => {
    if (searchParams.has('filters')) {
      searchParams.delete('filters');
      setSearchParams(searchParams, { replace: true });
    }
  }, []);

  const [savedDeals, setSavedDeals] = useState<Set<string>>(new Set());
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());
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
  const [dealTypeFilter, setDealTypeFilter] = useState<DealTypeFilter>('all');

  const toggleSave = useCallback((e: React.MouseEvent, slug: string) => {
    e.preventDefault();
    e.stopPropagation();
    setSavedDeals(prev => {
      const next = new Set(prev);
      if (next.has(slug)) next.delete(slug); else next.add(slug);
      return next;
    });
  }, []);

  const toggleExpand = useCallback((key: string) => {
    setExpandedCards(prev => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key); else next.add(key);
      return next;
    });
  }, []);

  const { pills: sharedPills, clearAllFilters: clearSharedFilters } = useActiveFilterPills(filters, setFilters);

  const activeFilterPills = useMemo(() => {
    const extra = dealTypeFilter !== 'all'
      ? [{ id: `type-${dealTypeFilter}`, label: DEAL_TYPE_LABELS[dealTypeFilter], onRemove: () => setDealTypeFilter('all') }]
      : [];
    return [...extra, ...sharedPills];
  }, [dealTypeFilter, sharedPills]);

  const clearAllFilters = useCallback(() => {
    setDealTypeFilter('all');
    clearSharedFilters();
  }, [clearSharedFilters]);

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
        const rangeLabel = getAprRangeLabel({ value: `${d.apr} APR`, title: d.programName, terms: d.term });
        deals.push({
          vehicleName: `${d.vehicle.year} ${d.vehicle.make} ${d.vehicle.model}`,
          make: d.vehicle.make, model: d.vehicle.model, image: d.vehicle.image,
          slug: d.vehicle.slug, priceRange: d.vehicle.priceRange,
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
          dealType: 'cash',
          dealText: `${d.incentiveValue} cash back`,
          dealHeadline: 'Cash Back',
          whatItMeans: 'Manufacturer customer cash reduces the amount you finance or pay at signing—often instead of a promotional APR.',
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

    getLeaseDeals().forEach(d => {
        const leaseNum = d.monthlyPaymentNum;
        const savings = buildSavingsText(leaseNum, d.vehicle.bodyStyle, 'lease');
        deals.push({
          vehicleName: `${d.vehicle.year} ${d.vehicle.make} ${d.vehicle.model}`,
          make: d.vehicle.make, model: d.vehicle.model, image: d.vehicle.image,
          slug: d.vehicle.slug, priceRange: d.vehicle.priceRange,
          dealType: 'lease',
          dealText: `${d.monthlyPayment}/mo lease`,
          dealHeadline: `Lease for ${d.monthlyPayment}/month`,
          whatItMeans: `Lease for ${d.term} at ${d.monthlyPayment}/mo with ${d.dueAtSigning} due at signing.`,
          savingsNote: `${d.monthlyPayment}/mo is significantly lower than a typical purchase payment.`,
          whoQualifies: 'Well-qualified lessees with approved credit.',
          programName: d.programName, programDescription: d.programDescription,
          trimsEligible: d.trimsEligible, expirationDate: d.expirationDate,
          editorsChoice: d.vehicle.editorsChoice, tenBest: d.vehicle.tenBest,
          staffRating: d.vehicle.staffRating, monthlyPayment: d.monthlyPayment, term: d.term,
          estimatedMonthly: d.monthlyPayment, monthlyNum: leaseNum,
          savingsVsAvg: savings.savingsVsAvg, savingsTooltip: savings.savingsTooltip,
        });
      });

    return deals;
  }, []);

  const applyFiltersToDeals = useCallback((dealList: MiniDeal[], f: DealsFilterState): MiniDeal[] => {
    return dealList.filter(d => {
      if (f.bodyTypes.length > 0 && !f.bodyTypes.includes(d.make)) {
        const bodyStyle = d.slug.split('/')[0] || '';
        if (!f.bodyTypes.some(bt => bt.toLowerCase() === bodyStyle)) return false;
      }
      if (f.makes.length > 0 && !f.makes.includes(d.make)) return false;
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
      if (f.monthlyPaymentMin > 0 || f.monthlyPaymentMax < 99999) {
        if (d.monthlyNum < f.monthlyPaymentMin || d.monthlyNum > f.monthlyPaymentMax) return false;
      }
      return true;
    });
  }, []);

  const filteredDeals = useMemo(() => {
    let filtered = applyFiltersToDeals(allDeals, filters);
    if (dealTypeFilter !== 'all') {
      filtered = filtered.filter(d => d.dealType === dealTypeFilter);
    }
    return filtered;
  }, [allDeals, filters, dealTypeFilter, applyFiltersToDeals]);

  const getResultCount = useCallback((draftFilters: DealsFilterState): number => {
    return applyFiltersToDeals(allDeals, draftFilters).length;
  }, [allDeals, applyFiltersToDeals]);

  const emptyDealsCategory = dealTypeFilter === 'all' ? 'deal' : DEAL_TYPE_LABELS[dealTypeFilter];

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
          dontWaitText: `This offer expires ${formatExpiration(activeDeal.expirationDate)}. Manufacturer deals change monthly—once it's gone, there's no guarantee it'll come back.`,
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
        description={`Browse every current car deal, incentive, and offer for ${month} ${year}. 0% APR, finance rates, and lease specials — all in one place.`}
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
              Every current manufacturer incentive in one place — 0% APR financing,
              special finance rates, and lease specials, all paired with Car and Driver expert ratings.
            </p>
          </div>
        </div>
      </div>

      <div className="all-deals__toolbar">
        <div className="container all-deals__toolbar-inner">
          <div className="active-filter-pills__toolbar-left">
            <span className="active-filter-pills__count">{filteredDeals.length} {filteredDeals.length === 1 ? 'deal' : 'deals'}</span>
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
            className={`all-deals__filter-btn ${activeFilterPills.length > 0 ? 'all-deals__filter-btn--active' : ''}`}
            onClick={() => setFilterOpen(true)}
          >
            <SlidersHorizontal size={16} />
            <span>Filters</span>
            {activeFilterPills.length > 0 && (
              <span className="all-deals__filter-badge">{activeFilterPills.length}</span>
            )}
          </button>
        </div>
      </div>

      <div className="all-deals__content">
        <div className="container">
          {filteredDeals.length > 0 ? (
            <div className="all-deals__grid">
              {filteredDeals.map((deal, i) => {
                const cardKey = `${deal.slug}-${deal.dealType}-${i}`;
                const isExpanded = expandedCards.has(cardKey);
                return (
                  <div key={cardKey} className="all-deals__card">
                    <div className="all-deals__card-header">
                      <Link to={`/${deal.slug}`} className="all-deals__card-name-link">
                        <h3 className="all-deals__card-name">{deal.vehicleName}</h3>
                      </Link>
                      {deal.staffRating != null && (
                        <div className="all-deals__card-rating">
                          <span className="all-deals__card-rating-score">{deal.staffRating}</span>
                          <span className="all-deals__card-rating-max">/10</span>
                          <span className="all-deals__card-rating-label">C/D Rating</span>
                        </div>
                      )}
                    </div>

                    <Link to={`/${deal.slug}`} className="all-deals__card-image-link">
                      <div className="all-deals__card-image">
                        <img src={deal.image} alt={deal.vehicleName} />
                        <span className="all-deals__card-deal-type-tag">{deal.dealType === 'lease' ? 'Lease' : deal.dealType === 'cash' ? 'Cash' : 'Buy'}</span>
                        <button
                          type="button"
                          className={`all-deals__card-save ${savedDeals.has(deal.slug) ? 'all-deals__card-save--active' : ''}`}
                          onClick={(e) => toggleSave(e, deal.slug)}
                          aria-label={savedDeals.has(deal.slug) ? 'Remove from favorites' : 'Add to favorites'}
                        >
                          <Heart size={16} fill={savedDeals.has(deal.slug) ? 'currentColor' : 'none'} />
                        </button>
                        {(() => {
                          const allOffers = getVehicleOffers(deal.make, deal.model);
                          if (allOffers.length > 1) return (
                            <button type="button" className="all-deals__card-offers-tag" onClick={(e) => toggleOffersPopup(e, deal.make, deal.model, deal.slug)}>
                              {allOffers.length} Offers Available
                            </button>
                          );
                          return null;
                        })()}
                        {offersPopup?.slug === deal.slug && (
                          <div className="all-deals__card-offers-popup">
                            <div className="all-deals__card-offers-popup-header">
                              <strong>{offersPopup.offers.length} Available Offers</strong>
                              <button type="button" className="all-deals__card-offers-popup-close" onClick={(e) => { e.preventDefault(); e.stopPropagation(); setOffersPopup(null); }}>&times;</button>
                            </div>
                            <ul className="all-deals__card-offers-popup-list">
                              {offersPopup.offers.map((o, idx) => (
                                <li key={idx} className="all-deals__card-offers-popup-item">
                                  <span className={`all-deals__card-offers-popup-type all-deals__card-offers-popup-type--${o.type}`}>
                                    {o.type === 'zero-apr' ? '0% APR' : o.type === 'cash' ? 'Cash' : o.type === 'finance' ? 'Finance' : 'Lease'}
                                  </span>
                                  <span className="all-deals__card-offers-popup-label">{o.label}</span>
                                  <span className="all-deals__card-offers-popup-exp">expires {formatExpiration(o.expires)}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        <span className={`all-deals__card-type-tag all-deals__card-type-tag--${deal.dealType}`}>
                          {deal.dealType === 'zero-apr' ? '0% APR' : deal.dealType === 'finance' ? 'Finance' : deal.dealType === 'cash' ? 'Cash' : 'Lease'}
                        </span>
                        {(deal.editorsChoice || deal.tenBest) && (
                          <div className="all-deals__card-badges">
                            {deal.tenBest && <img src={TEN_BEST_BADGE_URL} alt="10Best" className="all-deals__card-badge-img" />}
                            {deal.editorsChoice && <img src={EDITORS_CHOICE_BADGE_URL} alt="Editors' Choice" className="all-deals__card-badge-img" />}
                          </div>
                        )}
                      </div>
                    </Link>

                    <div className="all-deals__card-body">
                      <div className="all-deals__card-payment-block">
                        <div className="all-deals__card-payment">
                          <span className="all-deals__card-payment-amount">{(deal.dealType === 'zero-apr' || deal.dealType === 'finance') ? deal.aprDisplay : deal.estimatedMonthly}</span>
                          <span className="all-deals__card-payment-period">
                            {deal.dealType === 'cash' ? 'Cash Back' : (deal.dealType === 'zero-apr' || deal.dealType === 'finance') ? ' APR' : '/mo'}
                          </span>
                        </div>
                        <span className="all-deals__card-payment-savings">
                          {deal.savingsVsAvg}
                          <span className="all-deals__card-tooltip-wrap">
                            <Info size={13} className="all-deals__card-tooltip-icon" />
                            <span className="all-deals__card-tooltip">{deal.savingsTooltip}</span>
                          </span>
                        </span>
                        <span className="all-deals__card-payment-expires">Expires {formatExpiration(deal.expirationDate)}</span>
                      </div>

                      <button className="all-deals__card-deal-pill" onClick={(e) => handleDealClick(e, deal)}>
                        <span className="all-deals__card-deal-pill-chip">
                          {deal.dealType === 'lease' ? 'Lease' : deal.dealType === 'cash' ? 'Cash' : 'Buy'}
                        </span>
                        <span className="all-deals__card-deal-pill-text">{deal.dealText}</span>
                        <span className="all-deals__card-deal-pill-divider" />
                        <span className="all-deals__card-deal-pill-expires">expires {formatExpiration(deal.expirationDate)}</span>
                      </button>

                      <div className="all-deals__card-details">
                        <div className="all-deals__card-detail">
                          <span className="all-deals__card-detail-label">MSRP Range</span>
                          <span className="all-deals__card-detail-value">{deal.priceRange}</span>
                        </div>
                        {deal.term && (
                          <div className="all-deals__card-detail">
                            <span className="all-deals__card-detail-label">Term</span>
                            <span className="all-deals__card-detail-value">{deal.term}</span>
                          </div>
                        )}
                      </div>

                      <button type="button" className="all-deals__card-cta" onClick={(e) => handleDealClick(e, deal)}>Get This Deal</button>

                      <button
                        type="button"
                        className="all-deals__card-expand"
                        onClick={() => toggleExpand(cardKey)}
                      >
                        Additional Details {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                      </button>
                      {isExpanded && (
                        <div className="all-deals__card-expanded">
                          <p className="all-deals__card-expanded-text">{deal.programDescription}</p>
                          {deal.trimsEligible.length > 0 && (
                            <p className="all-deals__card-expanded-trims"><strong>Eligible trims:</strong> {deal.trimsEligible.join(', ')}</p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
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
        onApply={setFilters}
        totalResults={filteredDeals.length}
        getResultCount={getResultCount}
      />
    </div>
  );
};

export default AllDealsPage;
