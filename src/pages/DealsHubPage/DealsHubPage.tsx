import { useMemo, useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronRight, Heart, Info } from 'lucide-react';
import { parseMsrpMin, calcMonthly, parseTermMonths, buildSavingsText, inferCreditTier, creditTierQualifies, getVehicleOffers, offersToIncentives, AVG_MARKET_APR, AVG_LOAN_TERM, getGlobalDealCounts } from '../../utils/dealCalculations';
import type { VehicleOfferSummary } from '../../utils/dealCalculations';
import { getZeroAprDeals } from '../../services/zeroAprDealsService';
import { getCashDeals, getFinanceDeals } from '../../services/cashFinanceDealsService';
import { getLeaseDeals } from '../../services/leaseDealsService';
import { getCurrentPeriod, formatExpiration } from '../../utils/dateUtils';
import IncentivesModal, { getAprRangeLabel } from '../../components/IncentivesModal/IncentivesModal';
import type { IncentiveOfferDetail } from '../../components/IncentivesModal/IncentivesModal';
import { DealsFilterModal } from '../../components/DealsFilterModal';
import type { DealsFilterState } from '../../components/DealsFilterModal';
import { SEO, createBreadcrumbStructuredData } from '../../components/SEO';
import SavingsText from '../../components/SavingsText';
import { EDITORS_CHOICE_BADGE_URL, TEN_BEST_BADGE_URL } from '../../constants/badges';
import { BEST_BUYING_DEALS_PATH } from '../../constants/dealRoutes';
import './DealsHubPage.css';

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
  savingsVsAvg: string;
  savingsTooltip: string;
  term?: string;
}

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

const DealsHubPage = () => {
  const { month, year } = getCurrentPeriod();
  const navigate = useNavigate();
  const [activeDeal, setActiveDeal] = useState<MiniDeal | null>(null);
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters] = useState<DealsFilterState>(DEFAULT_FILTERS);
  const handleFilterApply = useCallback((applied: DealsFilterState) => {
    const params = new URLSearchParams();
    params.set('filters', JSON.stringify(applied));
    navigate(`/deals/all?${params.toString()}`);
  }, [navigate]);
  const [savedDeals, setSavedDeals] = useState<Set<string>>(new Set());
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

  const toggleSave = useCallback((e: React.MouseEvent, slug: string) => {
    e.preventDefault();
    e.stopPropagation();
    setSavedDeals(prev => {
      const next = new Set(prev);
      if (next.has(slug)) next.delete(slug); else next.add(slug);
      return next;
    });
  }, []);

  const getResultCount = useCallback((draftFilters: DealsFilterState): number => {
    if (draftFilters.dealType && draftFilters.dealType !== 'all') {
      const global = getGlobalDealCounts();
      return global[draftFilters.dealType as keyof typeof global] ?? global.all;
    }
    return getGlobalDealCounts().all;
  }, []);

  const rawData = useMemo(() => {
    const zeroAprDeals = getZeroAprDeals();
    const financeDeals = getFinanceDeals();
    const cashDeals = getCashDeals();
    const leaseDeals = getLeaseDeals();
    return { zeroAprDeals, financeDeals, cashDeals, leaseDeals };
  }, []);

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

  const categories = useMemo(() => {
    const { zeroAprDeals, financeDeals, cashDeals, leaseDeals } = rawData;

    const filteredZeroApr = zeroAprDeals.filter(d => matchesFilters(d.vehicle, { term: d.term, targetAudience: d.targetAudience }));
    const filteredFinance = financeDeals.filter(d => matchesFilters(d.vehicle, { term: d.term, targetAudience: d.targetAudience }));
    const filteredCash = cashDeals.filter(d => matchesFilters(d.vehicle));
    const filteredLease = leaseDeals.filter(d => matchesFilters(d.vehicle, { term: d.term }));

    const allDealsRaw = [
      ...filteredFinance.map(d => ({ ...d, bodyStyle: d.vehicle.bodyStyle })),
      ...filteredZeroApr.map(d => ({ ...d, bodyStyle: d.vehicle.bodyStyle })),
      ...filteredCash.map(d => ({ ...d, bodyStyle: d.vehicle.bodyStyle })),
    ];
    const suvDeals = allDealsRaw.filter(d => d.bodyStyle.toLowerCase() === 'suv');
    const truckDeals = allDealsRaw.filter(d => d.bodyStyle.toLowerCase() === 'truck');

    const fuelTypeNonGasPurchase = [
      ...filteredFinance.filter(d => d.vehicle.fuelType !== 'Gas').map(d => ({ ...d, bodyStyle: d.vehicle.bodyStyle })),
      ...filteredZeroApr.filter(d => d.vehicle.fuelType !== 'Gas').map(d => ({ ...d, bodyStyle: d.vehicle.bodyStyle })),
      ...filteredCash.filter(d => d.vehicle.fuelType !== 'Gas').map(d => ({ ...d, bodyStyle: d.vehicle.bodyStyle })),
    ];
    const fuelTypeNonGasLease = filteredLease.filter(d => d.vehicle.fuelType !== 'Gas');
    const fuelTypePurchaseDeals = fuelTypeNonGasPurchase.length > 0 ? fuelTypeNonGasPurchase : allDealsRaw;
    const fuelTypeLeaseDeals = fuelTypeNonGasLease.length > 0 ? fuelTypeNonGasLease : filteredLease;
    const allFuelTypeCount = [
      ...filteredFinance,
      ...filteredZeroApr,
      ...filteredCash,
      ...filteredLease,
    ].length;

    const toMiniZeroApr = (deals: typeof zeroAprDeals): MiniDeal[] =>
      deals.slice(0, 3).map(d => {
        const msrp = parseMsrpMin(d.vehicle.priceRange);
        const months = parseTermMonths(d.term);
        const monthly = calcMonthly(msrp, 0, months);
        const { savingsVsAvg, savingsTooltip } = buildSavingsText(monthly, d.vehicle.bodyStyle, 'zero-apr');
        return {
          vehicleName: `${d.vehicle.year} ${d.vehicle.make} ${d.vehicle.model}`,
          make: d.vehicle.make,
          model: d.vehicle.model,
          image: d.vehicle.image,
          slug: d.vehicle.slug,
          priceRange: d.vehicle.priceRange,
          dealType: 'zero-apr',
          dealText: '0% APR Financing',
          dealHeadline: `0% Interest Financing for ${d.term}`,
          whatItMeans: `You pay absolutely zero interest on your auto loan. Every dollar of your monthly payment goes directly toward the price of the car—not to the bank. On a typical $35,000 loan, this could save you $3,000–$6,000 compared to the average new-car interest rate.`,
          savingsNote: `On a $35,000 loan over ${d.term}, you'd save approximately $${d.term.includes('72') ? '5,400' : d.term.includes('60') ? '4,500' : d.term.includes('48') ? '3,600' : '2,700'} in interest vs. the average 6.5% rate.`,
          whoQualifies: d.targetAudience,
          programName: d.programName,
          programDescription: d.programDescription,
          trimsEligible: d.trimsEligible,
          expirationDate: d.expirationDate,
          editorsChoice: d.vehicle.editorsChoice,
          tenBest: d.vehicle.tenBest,
          staffRating: d.vehicle.staffRating,
          term: d.term,
          estimatedMonthly: `$${monthly.toLocaleString()}`,
          aprDisplay: '0%',
          savingsVsAvg, savingsTooltip,
        };
      });

    const toMiniFinance = (finance: typeof financeDeals): MiniDeal[] =>
      finance.slice(0, 3).map(d => {
        const msrp = parseMsrpMin(d.vehicle.priceRange);
        const aprNum = parseFloat(d.apr.replace('%', ''));
        const months = parseTermMonths(d.term);
        const monthly = calcMonthly(msrp, aprNum, months);
        const { savingsVsAvg, savingsTooltip } = buildSavingsText(monthly, d.vehicle.bodyStyle, 'finance');
        const rangeLabel = getAprRangeLabel({ value: `${d.apr} APR`, title: d.programName, terms: d.term });
        return {
          vehicleName: `${d.vehicle.year} ${d.vehicle.make} ${d.vehicle.model}`,
          make: d.vehicle.make, model: d.vehicle.model, image: d.vehicle.image,
          slug: d.vehicle.slug, priceRange: d.vehicle.priceRange,
          dealType: 'finance' as const,
          dealText: rangeLabel,
          dealHeadline: `${d.apr} APR Financing for ${d.term}`,
          whatItMeans: `The manufacturer is subsidizing your loan rate to ${d.apr}, which is well below the national average of ~6.5%. This means lower monthly payments and thousands saved over the life of the loan.`,
          savingsNote: `At ${d.apr} instead of 6.5%, you could save $1,500–$3,000 in interest over the loan term.`,
          whoQualifies: d.targetAudience,
          programName: d.programName, programDescription: d.programDescription,
          trimsEligible: d.trimsEligible, expirationDate: d.expirationDate,
          editorsChoice: d.vehicle.editorsChoice, tenBest: d.vehicle.tenBest,
          staffRating: d.vehicle.staffRating, term: d.term,
          estimatedMonthly: `$${monthly.toLocaleString()}`, aprDisplay: rangeLabel.replace(/\s*APR$/, ''), savingsVsAvg, savingsTooltip,
        };
      });

    const toMiniCash = (cash: typeof cashDeals): MiniDeal[] =>
      cash.slice(0, 3).map(d => {
        const msrp = parseMsrpMin(d.vehicle.priceRange);
        const principal = Math.max(0, msrp - d.incentiveAmount);
        const monthly = calcMonthly(principal, AVG_MARKET_APR, AVG_LOAN_TERM);
        const { savingsVsAvg, savingsTooltip } = buildSavingsText(monthly, d.vehicle.bodyStyle, 'cash');
        return {
          vehicleName: `${d.vehicle.year} ${d.vehicle.make} ${d.vehicle.model}`,
          make: d.vehicle.make,
          model: d.vehicle.model,
          image: d.vehicle.image,
          slug: d.vehicle.slug,
          priceRange: d.vehicle.priceRange,
          dealType: 'cash' as const,
          dealText: `${d.incentiveValue} Cash Back`,
          dealHeadline: `${d.incentiveValue} Customer Cash Back`,
          whatItMeans: 'Manufacturer cash back reduces what you pay at purchase—you can apply it toward price or down payment. It often cannot be combined with special financing; compare both options with your dealer.',
          savingsNote: `${d.incentiveValue} before financing—about ${d.percentOffMsrp} off MSRP on many configurations.`,
          whoQualifies: 'Typically retail buyers; see program rules for eligibility and stackability.',
          programName: d.programName,
          programDescription: d.programDescription,
          trimsEligible: d.trimsEligible,
          expirationDate: d.expirationDate,
          editorsChoice: d.vehicle.editorsChoice,
          tenBest: d.vehicle.tenBest,
          staffRating: d.vehicle.staffRating,
          estimatedMonthly: d.incentiveValue,
          savingsVsAvg,
          savingsTooltip,
        };
      });

    const toMiniLease = (deals: typeof leaseDeals): MiniDeal[] =>
      deals.slice(0, 3).map(d => {
        const leaseNum = d.monthlyPaymentNum;
        const { savingsVsAvg, savingsTooltip } = buildSavingsText(leaseNum, d.vehicle.bodyStyle, 'lease');
        return {
          vehicleName: `${d.vehicle.year} ${d.vehicle.make} ${d.vehicle.model}`,
          make: d.vehicle.make,
          model: d.vehicle.model,
          image: d.vehicle.image,
          slug: d.vehicle.slug,
          priceRange: d.vehicle.priceRange,
          dealType: 'lease',
          dealText: `${d.monthlyPayment}/mo lease`,
          dealHeadline: `Lease for ${d.monthlyPayment}/month`,
          whatItMeans: `Instead of buying, you're renting the car for ${d.term}. Your monthly payment is just ${d.monthlyPayment} with ${d.dueAtSigning} due at signing. At the end of the lease, you can return it for a new model, buy it, or walk away. Leasing means lower payments than buying and you're always driving something new.`,
          savingsNote: `${d.monthlyPayment}/mo is significantly lower than a typical purchase payment. ${d.dueAtSigning} due at signing. Includes ${d.mileageAllowance} mileage allowance.`,
          whoQualifies: 'Well-qualified lessees with approved credit through the manufacturer\'s financial arm.',
          programName: d.programName,
          programDescription: d.programDescription,
          trimsEligible: d.trimsEligible,
          expirationDate: d.expirationDate,
          editorsChoice: d.vehicle.editorsChoice,
          tenBest: d.vehicle.tenBest,
          staffRating: d.vehicle.staffRating,
          monthlyPayment: d.monthlyPayment,
          estimatedMonthly: d.monthlyPayment,
          term: d.term,
          savingsVsAvg, savingsTooltip,
        };
      });

    const toMiniMixed = (deals: typeof allDealsRaw): MiniDeal[] =>
      deals.slice(0, 3).map(d => {
        const msrp = parseMsrpMin(d.vehicle.priceRange);
        const bs = d.vehicle.bodyStyle;
        const base = {
          vehicleName: `${d.vehicle.year} ${d.vehicle.make} ${d.vehicle.model}`,
          make: d.vehicle.make, model: d.vehicle.model, image: d.vehicle.image,
          slug: d.vehicle.slug, priceRange: d.vehicle.priceRange,
          programName: 'programName' in d ? d.programName : '',
          programDescription: 'programDescription' in d ? d.programDescription : '',
          trimsEligible: 'trimsEligible' in d ? d.trimsEligible : [],
          expirationDate: d.expirationDate,
          editorsChoice: d.vehicle.editorsChoice,
          tenBest: d.vehicle.tenBest,
          staffRating: d.vehicle.staffRating,
        };
        if ('apr' in d && typeof d.apr === 'number') {
          const term = 'term' in d ? d.term : '';
          const months = parseTermMonths(term);
          const monthly = calcMonthly(msrp, 0, months);
          const { savingsVsAvg, savingsTooltip } = buildSavingsText(monthly, bs, 'zero-apr');
          const audience = 'targetAudience' in d ? d.targetAudience : 'Well-qualified buyers with approved credit.';
          return { ...base, dealType: 'zero-apr' as const, dealText: '0% APR Financing', dealHeadline: `0% Interest Financing for ${term}`,
            whatItMeans: 'Zero interest on your auto loan—every payment dollar goes toward the car. This could save you thousands compared to a typical rate.',
            savingsNote: "On a $35,000 loan, you'd save approximately $3,000–$5,000 in interest.", whoQualifies: audience,
            estimatedMonthly: `$${monthly.toLocaleString()}`, aprDisplay: '0%', savingsVsAvg, savingsTooltip };
        }
        if ('type' in d && d.type === 'cash') {
          const principal = Math.max(0, msrp - d.incentiveAmount);
          const monthly = calcMonthly(principal, AVG_MARKET_APR, AVG_LOAN_TERM);
          const { savingsVsAvg, savingsTooltip } = buildSavingsText(monthly, bs, 'cash');
          return {
            ...base,
            dealType: 'cash' as const,
            dealText: `${d.incentiveValue} Cash Back`,
            dealHeadline: `${d.incentiveValue} Cash Back`,
            whatItMeans: 'Customer cash from the manufacturer lowers your out-the-door price or down payment.',
            savingsNote: `${d.percentOffMsrp} off MSRP on many builds—confirm with your dealer.`,
            whoQualifies: 'Retail buyers; see brand program rules for stackability with finance offers.',
            estimatedMonthly: d.incentiveValue,
            savingsVsAvg,
            savingsTooltip,
          };
        }
        {
          const apr = 'apr' in d ? d.apr : '';
          const aprNum = parseFloat(String(apr).replace('%', '')) || 6.5;
          const term = 'term' in d ? (d as { term: string }).term : '60 months';
          const months = parseTermMonths(term);
          const monthly = calcMonthly(msrp, aprNum, months);
          const { savingsVsAvg, savingsTooltip } = buildSavingsText(monthly, bs, 'finance');
          const audience = 'targetAudience' in d ? d.targetAudience : 'Well-qualified buyers.';
          const aprStr = typeof apr === 'string' ? apr : `${apr}%`;
          const rangeLabel = getAprRangeLabel({
            value: `${aprStr} APR`,
            title: 'programName' in d ? d.programName : '',
            terms: term,
          });
          const aprDisplay = rangeLabel.replace(/\s*APR$/, '');
          return { ...base, dealType: 'finance' as const, dealText: `${apr} APR`, dealHeadline: `${apr} APR Special Financing`,
            whatItMeans: 'A below-market interest rate from the manufacturer that lowers your monthly payment and total cost.',
            savingsNote: 'Could save you $1,500–$3,000 in interest over the loan term.', whoQualifies: audience,
            estimatedMonthly: `$${monthly.toLocaleString()}`, aprDisplay, savingsVsAvg, savingsTooltip };
        }
      });

    return [
      { title: 'Buying Deals', description: '0% APR, cash back, special low-rate financing, and below-market rates — save thousands when you buy.', href: BEST_BUYING_DEALS_PATH, count: filteredZeroApr.length + filteredFinance.length + filteredCash.length, deals: [...toMiniZeroApr(filteredZeroApr), ...toMiniFinance(filteredFinance), ...toMiniCash(filteredCash)].slice(0, 3) },
      { title: 'Lease Deals', description: 'Drive a new car for less with low monthly payments and flexible terms.', href: '/deals/lease', count: filteredLease.length, deals: toMiniLease(filteredLease) },
      { title: 'Best SUV Deals', description: 'Top incentives on SUVs and crossovers — from subcompact to full-size.', href: '/deals/suv', count: suvDeals.length, deals: toMiniMixed(suvDeals) },
      { title: 'Best Truck Deals', description: 'The best current offers on light-duty and mid-size pickup trucks.', href: '/deals/truck', count: truckDeals.length, deals: toMiniMixed(truckDeals) },
      { title: 'Deals by Fuel Type', description: 'Shop by powertrain — hybrid, electric, plug-in hybrid, diesel, and gas deals.', href: '/deals/fuel-type', count: allFuelTypeCount, deals: [...toMiniMixed(fuelTypePurchaseDeals), ...toMiniLease(fuelTypeLeaseDeals)].slice(0, 3) },
      { title: 'Buying by Body Style', description: 'Purchase deals organized by SUV, sedan, truck, coupe, and more.', href: '/deals/cash-finance-body-style', count: filteredFinance.length + filteredCash.length, deals: [...filteredFinance, ...filteredCash].slice(0, 3).map(d => (d.type === 'cash' ? toMiniCash([d])[0] : toMiniFinance([d])[0])) },
    ];
  }, [rawData, matchesFilters]);

  const sectionIds = useMemo(() => categories.map(cat => cat.href.replace('/deals/', 'section-')), [categories]);

  const handleDealClick = (e: React.MouseEvent, deal: MiniDeal) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveDeal(deal);
  };

  const closeDealModal = () => setActiveDeal(null);

  /** Map a MiniDeal to IncentiveOfferDetail for the IncentivesModal */
  const activeOffer: Partial<IncentiveOfferDetail> | undefined = activeDeal
    ? (() => {
        const parts = activeDeal.vehicleName.split(' ');
        const year = parseInt(parts[0], 10) || 2026;
        const make = parts[1] || activeDeal.make;
        const model = parts.slice(2).join(' ') || activeDeal.model;
        const priceParts = activeDeal.priceRange.replace(/[^0-9,\-–]/g, '').split(/[-–]/);
        const msrpMin = parseInt(priceParts[0]?.replace(/,/g, '') || '0', 10);
        const msrpMax = parseInt(priceParts[1]?.replace(/,/g, '') || '0', 10);
        return {
          year,
          make,
          model,
          slug: activeDeal.slug,
          imageUrl: activeDeal.image,
          msrpMin,
          msrpMax,
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

  const totalResults = categories.reduce((sum, cat) => sum + cat.count, 0);

  const BASE_URL = 'https://www.caranddriver.com';

  return (
    <div className="deals-hub">
      <SEO
        title={`Best New Car Deals for ${month} ${year}`}
        description={`Find the best new car deals, incentives, and offers for ${month} ${year}. Compare 0% APR financing, cash back, lease specials, and more from Car and Driver.`}
        canonical={`${BASE_URL}/deals`}
        keywords={['new car deals', 'car incentives', `car deals ${month} ${year}`, '0% APR', 'cash back', 'lease specials', 'best car deals']}
        structuredData={createBreadcrumbStructuredData([
          { name: 'Home', url: BASE_URL },
          { name: 'Deals', url: `${BASE_URL}/deals` },
        ])}
      />

      <div className="deals-hub__hero">
        <div className="container">
          <div className="deals-hub__hero-content">
            <nav className="deals-hub__breadcrumb" aria-label="Breadcrumb">
              <Link to="/">Home</Link>
              <span className="deals-hub__breadcrumb-sep">/</span>
              <span>Deals</span>
            </nav>
            <h1 className="deals-hub__title">Best New Car Deals for {month} {year}</h1>
            <p className="deals-hub__description">
              We track every manufacturer incentive so you don't have to. Browse 0% APR financing, cash-back
              rebates, special finance rates, and lease deals—all paired with Car and Driver's expert ratings
              to help you find a great car at a great price.
            </p>
            <div className="deals-hub__hero-actions">
              <Link to="/deals/best-buying-deals" className="deals-hub__view-all-link">
                Buying Deals <ChevronRight size={14} aria-hidden />
              </Link>
              <Link to="/deals/lease" className="deals-hub__view-all-link">
                Leasing Deals <ChevronRight size={14} aria-hidden />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="deals-hub__content">
        <div className="container">
          <div className="deals-hub__categories">
            {categories.map((cat, catIdx) => (
              <div key={cat.href} id={sectionIds[catIdx]} className="deals-hub__row">
                <div className="deals-hub__row-left">
                  <h2 className="deals-hub__row-title">{cat.title}</h2>
                  <p className="deals-hub__row-description">{cat.description}</p>
                  <span className="deals-hub__row-count">{cat.count} deals</span>
                  <Link to={cat.href} className="deals-hub__row-cta">
                    View All <ChevronRight size={16} />
                  </Link>
                </div>
                <div className="deals-hub__row-cards">
                  {cat.deals.length > 0 ? cat.deals.map((deal, i) => (
                    <div key={i} className="deals-hub__mini-card">
                      {/* Header: name + rating */}
                      <div className="deals-hub__card-header">
                        <Link to={`/${deal.slug}`} className="deals-hub__card-name-link">
                          <h3 className="deals-hub__card-name">{deal.vehicleName}</h3>
                        </Link>
                        {deal.staffRating != null && (
                          <div className="deals-hub__card-rating">
                            <span className="deals-hub__card-rating-score">{deal.staffRating}</span>
                            <span className="deals-hub__card-rating-max">/10</span>
                            <span className="deals-hub__card-rating-label">C/D Rating</span>
                          </div>
                        )}
                      </div>

                      {/* Image with overlays */}
                      <Link to={`/${deal.slug}`} className="deals-hub__card-image-link">
                        <div className="deals-hub__card-image">
                          <img src={deal.image} alt={deal.vehicleName} />
                          <span className="deals-hub__card-deal-type-tag">
                            {deal.dealType === 'lease' ? 'Lease' : deal.dealType === 'cash' ? 'Cash' : 'Buy'}
                          </span>
                          <button
                            type="button"
                            className={`deals-hub__card-save ${savedDeals.has(deal.slug) ? 'deals-hub__card-save--active' : ''}`}
                            onClick={(e) => toggleSave(e, deal.slug)}
                            aria-label={savedDeals.has(deal.slug) ? 'Remove from favorites' : 'Add to favorites'}
                          >
                            <Heart size={16} fill={savedDeals.has(deal.slug) ? 'currentColor' : 'none'} />
                          </button>
                          {(() => {
                            const allOffers = getVehicleOffers(deal.make, deal.model);
                            if (allOffers.length > 1) return (
                              <button
                                type="button"
                                className="deals-hub__card-offers-tag deals-hub__card-offers-tag--multi"
                                onClick={(e) => toggleOffersPopup(e, deal.make, deal.model, deal.slug)}
                              >
                                {allOffers.length} Offers Available
                              </button>
                            );
                            return null;
                          })()}
                          {offersPopup?.slug === deal.slug && (
                            <div className="deals-hub__card-offers-popup">
                              <div className="deals-hub__card-offers-popup-header">
                                <strong>{offersPopup.offers.length} Available Offers</strong>
                                <button type="button" className="deals-hub__card-offers-popup-close" onClick={(e) => { e.preventDefault(); e.stopPropagation(); setOffersPopup(null); }}>&times;</button>
                              </div>
                              <ul className="deals-hub__card-offers-popup-list">
                                {offersPopup.offers.map((o, idx) => (
                                  <li key={idx} className="deals-hub__card-offers-popup-item">
                                    <span className={`deals-hub__card-offers-popup-type deals-hub__card-offers-popup-type--${o.type}`}>
                                      {o.type === 'zero-apr' ? '0% APR' : o.type === 'cash' ? 'Cash' : o.type === 'finance' ? 'Buy' : 'Lease'}
                                    </span>
                                    <span className="deals-hub__card-offers-popup-label">{o.label}</span>
                                    <span className="deals-hub__card-offers-popup-exp">expires {formatExpiration(o.expires)}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                          {(deal.editorsChoice || deal.tenBest) && (
                            <div className="deals-hub__card-badges">
                              {deal.tenBest && <img src={TEN_BEST_BADGE_URL} alt="10Best" className="deals-hub__card-badge-img" />}
                              {deal.editorsChoice && <img src={EDITORS_CHOICE_BADGE_URL} alt="Editors' Choice" className="deals-hub__card-badge-img" />}
                            </div>
                          )}
                        </div>
                      </Link>

                      {/* Body */}
                      <div className="deals-hub__card-body">
                        {/* Prominent payment / headline */}
                        <div className="deals-hub__card-payment-block">
                          <div className="deals-hub__card-payment">
                            <span className="deals-hub__card-payment-amount">{(deal.dealType === 'zero-apr' || deal.dealType === 'finance') ? deal.aprDisplay : deal.estimatedMonthly}</span>
                            <span className="deals-hub__card-payment-period">
                              {deal.dealType === 'cash' ? 'Cash Back' : (deal.dealType === 'zero-apr' || deal.dealType === 'finance') ? ' APR' : '/mo'}
                            </span>
                          </div>
                          <span className="deals-hub__card-payment-savings">
                            <SavingsText text={deal.savingsVsAvg} />
                            <span className="deals-hub__card-tooltip-wrap">
                              <Info size={13} className="deals-hub__card-tooltip-icon" />
                              <span className="deals-hub__card-tooltip">{deal.savingsTooltip}</span>
                            </span>
                          </span>
                          <span className="deals-hub__card-payment-expires">Expires {formatExpiration(deal.expirationDate)}</span>
                        </div>

                        {/* Deal pill */}
                        <button className="deals-hub__card-deal-pill" onClick={(e) => handleDealClick(e, deal)}>
                          <span className="deals-hub__card-deal-pill-chip">{deal.dealType === 'lease' ? 'Lease' : deal.dealType === 'cash' ? 'Cash' : 'Buy'}</span>
                          <span className="deals-hub__card-deal-pill-text">{deal.dealText}</span>
                          <span className="deals-hub__card-deal-pill-divider" />
                          <span className="deals-hub__card-deal-pill-expires">expires {formatExpiration(deal.expirationDate)}</span>
                        </button>

                        {/* Detail grid */}
                        <div className="deals-hub__card-details">
                          <div className="deals-hub__card-detail">
                            <span className="deals-hub__card-detail-label">MSRP Range</span>
                            <span className="deals-hub__card-detail-value">{deal.priceRange}</span>
                          </div>
                          {deal.term && (
                            <div className="deals-hub__card-detail">
                              <span className="deals-hub__card-detail-label">Term</span>
                              <span className="deals-hub__card-detail-value">{deal.term.replace(' months', '')}<span className="deals-hub__card-detail-unit"> months</span></span>
                            </div>
                          )}
                        </div>

                        {/* CTA */}
                        <button type="button" className="deals-hub__card-cta" onClick={(e) => handleDealClick(e, deal)}>Get This Deal</button>

                        <Link
                          to={`/${deal.slug}`}
                          className="deals-hub__card-cta deals-hub__card-cta--secondary"
                        >
                          Shop New {deal.model}
                        </Link>
                      </div>
                    </div>
                  )) : (
                    <div className="deals-hub__empty">
                      <p>No deals available this month. Check back soon.</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="deals-hub__quick-links">
            <h2 className="deals-hub__section-title">More Resources</h2>
            <div className="deals-hub__links-grid">
              <Link to="/rankings" className="deals-hub__link-card">
                <h3>Expert Rankings</h3>
                <p>Every vehicle rated and ranked by our editors</p>
              </Link>
              <Link to="/whats-my-car-worth" className="deals-hub__link-card">
                <h3>What's My Car Worth?</h3>
                <p>Get an instant trade-in value estimate</p>
              </Link>
              <Link to="/vehicles" className="deals-hub__link-card">
                <h3>Browse All Vehicles</h3>
                <p>Search our complete new and used car database</p>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <IncentivesModal
        isOpen={!!activeDeal}
        onClose={closeDealModal}
        variant="conversion-b"
        offer={activeOffer}
        allIncentives={activeDeal ? offersToIncentives(activeDeal.make, activeDeal.model) : undefined}
        selectedIncentiveId={undefined}
      />

      <DealsFilterModal
        isOpen={filterOpen}
        onClose={() => setFilterOpen(false)}
        filters={filters}
        onApply={handleFilterApply}
        getResultCount={getResultCount}
        totalResults={totalResults}
      />
    </div>
  );
};

export default DealsHubPage;
