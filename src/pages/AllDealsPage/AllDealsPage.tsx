import { useMemo, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ChevronUp, ChevronDown, SlidersHorizontal, Heart, Info } from 'lucide-react';
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
import { parseMsrpMin, calcMonthly, parseTermMonths, buildSavingsText, inferCreditTier, creditTierQualifies, getVehicleOffers } from '../../utils/dealCalculations';
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

const AllDealsPage = () => {
  const { month, year } = getCurrentPeriod();
  const [activeDeal, setActiveDeal] = useState<MiniDeal | null>(null);
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState<DealsFilterState>(DEFAULT_FILTERS);
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

  const hasActiveFilters = filters.bodyTypes.length > 0 || filters.makes.length > 0 || filters.fuelTypes.length > 0 || filters.accolades.length > 0 || filters.terms.length > 0 || filters.creditTier !== null;
  const activeFilterCount = filters.bodyTypes.length + filters.makes.length + filters.fuelTypes.length + filters.accolades.length + filters.terms.length + (filters.creditTier ? 1 : 0);

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

  const allDeals = useMemo(() => {
    const deals: MiniDeal[] = [];

    getZeroAprDeals()
      .filter(d => matchesFilters(d.vehicle, { term: d.term, targetAudience: d.targetAudience }))
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
          dealText: `0% APR for ${d.term}`,
          dealHeadline: `0% Interest Financing for ${d.term}`,
          whatItMeans: 'You pay absolutely zero interest on your auto loan. Every dollar goes toward the price of the car.',
          savingsNote: `On a $35,000 loan over ${d.term}, you'd save thousands in interest vs. the average 6.5% rate.`,
          whoQualifies: d.targetAudience,
          programName: d.programName, programDescription: d.programDescription,
          trimsEligible: d.trimsEligible, expirationDate: d.expirationDate,
          editorsChoice: d.vehicle.editorsChoice, tenBest: d.vehicle.tenBest,
          staffRating: d.vehicle.staffRating, term: d.term,
          estimatedMonthly: `$${monthly.toLocaleString()}`,
          savingsVsAvg: savings.savingsVsAvg, savingsTooltip: savings.savingsTooltip,
        });
      });

    getFinanceDeals()
      .filter(d => matchesFilters(d.vehicle, { term: d.term, targetAudience: d.targetAudience }))
      .forEach(d => {
        const msrp = parseMsrpMin(d.vehicle.priceRange);
        const aprNum = parseFloat(d.apr.replace('%', ''));
        const months = parseTermMonths(d.term);
        const monthly = calcMonthly(msrp, aprNum, months);
        const savings = buildSavingsText(monthly, d.vehicle.bodyStyle, 'finance');
        deals.push({
          vehicleName: `${d.vehicle.year} ${d.vehicle.make} ${d.vehicle.model}`,
          make: d.vehicle.make, model: d.vehicle.model, image: d.vehicle.image,
          slug: d.vehicle.slug, priceRange: d.vehicle.priceRange,
          dealType: 'finance',
          dealText: getAprRangeLabel({ value: `${d.apr} APR`, title: d.programName, terms: d.term }),
          dealHeadline: `${d.apr} APR Financing for ${d.term}`,
          whatItMeans: `A below-market interest rate from the manufacturer that lowers your monthly payment.`,
          savingsNote: `At ${d.apr} instead of 6.5%, you could save $1,500–$3,000 in interest.`,
          whoQualifies: d.targetAudience,
          programName: d.programName, programDescription: d.programDescription,
          trimsEligible: d.trimsEligible, expirationDate: d.expirationDate,
          editorsChoice: d.vehicle.editorsChoice, tenBest: d.vehicle.tenBest,
          staffRating: d.vehicle.staffRating, term: d.term,
          estimatedMonthly: `$${monthly.toLocaleString()}`,
          savingsVsAvg: savings.savingsVsAvg, savingsTooltip: savings.savingsTooltip,
        });
      });

    getCashDeals()
      .filter(d => matchesFilters(d.vehicle))
      .forEach(d => {
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
          estimatedMonthly: d.incentiveValue,
          savingsVsAvg: `${d.percentOffMsrp} off MSRP`,
          savingsTooltip: savings.savingsTooltip,
        });
      });

    getLeaseDeals()
      .filter(d => matchesFilters(d.vehicle, { term: d.term }))
      .forEach(d => {
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
          estimatedMonthly: d.monthlyPayment,
          savingsVsAvg: savings.savingsVsAvg, savingsTooltip: savings.savingsTooltip,
        });
      });

    return deals;
  }, [matchesFilters]);

  const filteredDeals = dealTypeFilter === 'all'
    ? allDeals
    : allDeals.filter(d => d.dealType === dealTypeFilter);

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
          <div className="all-deals__toolbar-left">
            <span className="all-deals__toolbar-count">{filteredDeals.length} deals available</span>
            <div className="all-deals__type-filters">
              {(Object.keys(DEAL_TYPE_LABELS) as DealTypeFilter[]).map(type => (
                <button
                  key={type}
                  type="button"
                  className={`all-deals__type-btn ${dealTypeFilter === type ? 'all-deals__type-btn--active' : ''}`}
                  onClick={() => setDealTypeFilter(type)}
                >
                  {DEAL_TYPE_LABELS[type]}
                  {type !== 'all' && (
                    <span className="all-deals__type-count">
                      {allDeals.filter(d => d.dealType === type).length}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
          <button
            type="button"
            className={`all-deals__filter-btn ${hasActiveFilters ? 'all-deals__filter-btn--active' : ''}`}
            onClick={() => setFilterOpen(true)}
          >
            <SlidersHorizontal size={16} />
            <span>Filters</span>
            {activeFilterCount > 0 && (
              <span className="all-deals__filter-badge">{activeFilterCount}</span>
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
                          <span className="all-deals__card-payment-amount">{deal.estimatedMonthly}</span>
                          <span className="all-deals__card-payment-period">
                            {deal.dealType === 'cash' ? 'Cash Back' : `/mo${deal.dealType !== 'lease' ? '*' : ''}`}
                          </span>
                        </div>
                        <span className="all-deals__card-payment-savings">
                          {deal.savingsVsAvg}
                          <span className="all-deals__card-tooltip-wrap">
                            <Info size={13} className="all-deals__card-tooltip-icon" />
                            <span className="all-deals__card-tooltip">{deal.savingsTooltip}</span>
                          </span>
                        </span>
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
      />
    </div>
  );
};

export default AllDealsPage;
