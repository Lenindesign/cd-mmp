import { Fragment, useMemo, useState, useCallback, useEffect } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { ChevronDown, ChevronUp, X, SlidersHorizontal } from 'lucide-react';
import { getZeroAprDeals } from '../../services/zeroAprDealsService';
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
import IncentivesModal, { getAprRangeLabel } from '../../components/IncentivesModal/IncentivesModal';
import type { IncentiveOfferDetail } from '../../components/IncentivesModal/IncentivesModal';
import { DealsFilterModal } from '../../components/DealsFilterModal';
import type { DealsFilterState, DealTypeOption } from '../../components/DealsFilterModal';
import { DealCard } from '../../components/DealCard';
import { BEST_BUYING_DEALS_PATH, ZERO_PERCENT_APR_DEALS_PATH, CASH_BACK_DEALS_PATH } from '../../constants/dealRoutes';
import { useFilterOpen } from '../../hooks/useFilterOpen';
import { resolveBuyingFilterDestination } from '../../utils/buyingFilterNavigation';
import './ZeroAprDealsPage.css';

type AprTab = 'all' | 'zero-apr' | 'special-apr' | 'cash';

interface UnifiedAprDeal {
  id: string;
  aprType: 'zero-apr' | 'special-apr' | 'cash';
  vehicleName: string;
  vehicle: { id: string; year: string; make: string; model: string; image: string; slug: string; bodyStyle: string; fuelType: string; priceRange: string; staffRating: number; editorsChoice?: boolean; tenBest?: boolean };
  apr: number;
  aprDisplay: string;
  term: string;
  estimatedMonthly: number;
  savingsVsAvg: string;
  savingsTooltip: string;
  dealText: string;
  expirationDate: string;
  programName: string;
  programDescription: string;
  targetAudience: string;
  trimsEligible: string[];
  rating: number;
  incentiveValue?: string;
  percentOffMsrp?: string;
}

type FaqItem = { question: string; answer: string; bullets?: string[] };

const ZERO_APR_FAQ: FaqItem[] = [
  {
    question: 'What cars are 0% financing right now?',
    answer: '0% APR offers are real, but they usually apply only to certain new models, trims, and loan terms for a limited time. The list changes month to month, so the right way to shop is to check the exact model year, term length, and ZIP-code availability instead of assuming an entire brand has 0% financing.\n\nA strong 0% offer is not just about the rate. Shoppers should also check whether the deal applies to the trim they actually want, whether inventory is available nearby, and whether taking the offer means giving up cash rebates or other incentives.',
    bullets: [
      'Filter by model, trim, and term, not just by brand.',
      'Confirm whether the offer is national, regional, or dealer specific.',
      'Check whether bonus cash can be combined with the 0% APR program.',
      'Look at real inventory before building your budget around an ad.',
    ],
  },
  {
    question: 'Can I get 0% interest on a car loan?',
    answer: 'Yes, but usually only if you have excellent credit and the vehicle qualifies for a manufacturer-backed promotional offer. Most 0% APR deals are aimed at well-qualified buyers and often come with shorter terms, such as 36 or 48 months, rather than the longest loan options.\n\nBefore assuming you qualify, check your credit, read the fine print, and ask whether the offer must be financed through the manufacturer\u2019s captive lender. Even a real 0% deal may not be the best fit if the required monthly payment is too high for your budget.',
    bullets: [
      'Expect top-tier credit requirements on most 0% offers.',
      'Read the term length, residency rules, and model restrictions carefully.',
      'Ask whether you must finance through the manufacturer\u2019s lender to get the promo.',
      'Compare the 0% offer against a rebate or low-APR alternative.',
    ],
  },
  {
    question: 'Are 0% car deals really free?',
    answer: 'A 0% APR car loan does mean you are not paying finance charges on the amount borrowed, so the interest itself is effectively free. But that does not automatically make the deal the cheapest overall option, because many 0% offers require shorter terms, stronger credit, or giving up a cash rebate.\n\nThe real comparison is total cost. On a large loan, 0% APR can save a shopper thousands in interest, but a rebate plus standard financing can still win if the cash offer is large enough or if the shorter 0% term makes the monthly payment too aggressive.',
    bullets: [
      'Compare total loan cost, not just the APR shown in the ad.',
      'Check whether 0% financing replaces cash back or bonus cash.',
      'Watch for add-ons in the finance office that can erase the savings.',
      'Make sure the monthly payment still fits your budget comfortably.',
    ],
  },
  {
    question: 'Can you negotiate 0% financing when buying a new car?',
    answer: 'Sometimes, but the 0% rate itself is usually a manufacturer program rather than something the dealer invents. What you can often negotiate is the selling price, dealer fees, trade-in value, add-ons, and which incentive structure makes the most sense for your budget.\n\nIn practice, the best move is to negotiate the vehicle price first and then compare two versions of the deal side by side: one with 0% APR and one with the best available rebate or discount. That makes it much easier to see which deal is actually stronger.',
    bullets: [
      'Negotiate the out-the-door price separately from the financing offer.',
      'Ask for side-by-side quotes: 0% APR versus rebate plus standard rate.',
      'Be careful with products and add-ons that raise the financed amount.',
      'Confirm that the promotional rate still applies after the final terms are set.',
    ],
  },
  {
    question: 'What is the payment on a $30,000 car at 0% APR for 60 months?',
    answer: 'At 0% APR for 60 months, a $30,000 loan works out to a base payment of $500 per month because you are simply dividing the amount financed by the number of months. That number rises if you roll taxes, title, registration, doc fees, or add-ons into the financed amount.\n\nThat simple math is one reason 0% deals are attractive: every payment dollar goes toward principal. But it also shows why some shoppers still need to be careful, because even with no interest, the monthly payment has to be high enough to clear the balance inside the promotional term.',
    bullets: [
      'Base math is $30,000 divided by 60 months, or $500 before taxes and fees.',
      'Add all out-the-door costs to estimate the real financed amount.',
      'Compare 36-, 48-, and 60-month terms before choosing the promo.',
      'Do not stretch your budget just because the APR is 0%.',
    ],
  },
  {
    question: 'Which cars have the lowest interest rates right now?',
    answer: 'The lowest-rate vehicles are usually the same models backed by manufacturer subvented financing, sometimes at 0% APR and sometimes at 0.9% or 1.9% for longer terms. The best low-rate offer changes frequently, so shoppers should look at the exact model, trim, and loan term rather than only the brand name.\n\nA near-zero APR deal can actually be more practical than forcing a 0% offer if it comes with a longer term, more available inventory, or the ability to keep a rebate. The better deal is the one with the lower total cost and the payment that still fits your budget.',
    bullets: [
      'Check loan term length, not just the APR headline.',
      'Compare 0%, 0.9%, and 1.9% offers on the exact trim you want.',
      'Verify whether low APR can be combined with bonus cash.',
      'Make sure the offer is available in your ZIP code and on in-stock vehicles.',
    ],
  },
];

const FAQ_DATA: FaqItem[] = [
  {
    question: 'What does a $1,000 car rebate mean?',
    answer: 'A $1,000 car rebate usually means the manufacturer, government, or another incentive program is offering $1,000 in savings if you meet the eligibility rules. In some cases the money comes off the transaction at the dealership, while in others you claim the benefit later.\n\nThe important nuance is what kind of rebate it is. Customer cash, dealer cash, EV rebates, and tax credits all work differently, and some stack with other offers while others replace special financing or lease programs.',
    bullets: [
      'Ask whether the rebate is applied at point of sale or claimed later.',
      'Confirm whether it stacks with dealer discounts, low APR financing, or lease specials.',
      'Check ZIP code, trim, and VIN eligibility before counting the savings.',
      'Read the expiration date and fine print carefully.',
    ],
  },
  {
    question: 'Can you negotiate a new-car price if there are already incentives?',
    answer: 'Yes. Manufacturer incentives and rebates do not automatically mean the negotiated selling price is final. In many cases you can still negotiate the vehicle price, shop one dealer quote against another, and push for a better out-the-door number.\n\nThe key is to separate the deal into layers: vehicle price, dealer fees, trade-in value, financing, and incentives. That makes it easier to see whether the rebate is actually lowering your cost or just making an average deal sound better in the ad.',
    bullets: [
      'Ask for the out-the-door price before discussing monthly payment.',
      'Separate dealer discount from manufacturer rebate on the quote sheet.',
      'Compare written quotes, not verbal promises.',
      'Watch for add-ons that can erase the savings in the finance office.',
    ],
  },
  {
    question: 'What monthly payment should you expect on a $30,000 to $40,000 car?',
    answer: 'The monthly payment depends more on down payment, interest rate, and loan term than on the sticker price alone. On the same $30,000 to $40,000 vehicle, stretching the loan term can lower the payment, but it can also raise the total amount you pay over time.\n\nIncentives matter because a rebate lowers the amount financed, while a low APR lowers finance charges. The most useful way to judge affordability is to compare full loan cost and total financed amount, not just chase the lowest monthly number on the worksheet.',
    bullets: [
      'Run the payment at 48, 60, and 72 months before deciding what is realistic.',
      'Include taxes, registration, doc fees, and any trade-in payoff in the estimate.',
      'A lower payment can still be a worse deal if the term is much longer.',
      'Use incentives to reduce either the amount financed or the interest cost.',
    ],
  },
  {
    question: 'What credit score do you need to buy a $30,000 car?',
    answer: 'There is no universal score required to buy a $30,000 car. Approval depends on the full deal: your credit score, income, current debts, down payment, trade-in equity, and the lender\u2019s own rules. Better credit usually means lower rates and more flexibility, but buyers with average credit can still get approved.\n\nThe more important question is whether the payment fits your budget at the rate you actually qualify for. A buyer with weaker credit may still get the car, but the higher APR can make the same vehicle much less affordable month to month.',
    bullets: [
      'Check your credit before shopping so you know which offers are realistic.',
      'Compare lender preapprovals instead of relying only on dealer-arranged financing.',
      'A bigger down payment can improve approval odds and reduce the payment.',
      'Watch the APR as closely as the monthly payment.',
    ],
  },
  {
    question: 'When is the best time to shop for new car incentives?',
    answer: 'The best time to shop is usually when dealers or manufacturers are trying to move inventory. That often means end of month, end of quarter, holiday weekends, and especially the point when outgoing model-year vehicles are still on the lot and need help selling.\n\nTiming helps, but inventory matters just as much. A model with too much stock usually gets better incentives than a hot-selling vehicle with tight supply, even if you shop on a traditionally strong car-buying weekend.',
    bullets: [
      'Watch for model-year changeovers and aging inventory.',
      'Compare end-of-month offers against end-of-quarter offers on the same vehicle.',
      'Do not wait for a perfect date if the pricing already works for your budget.',
      'Confirm whether the incentive expires before you can actually take delivery.',
    ],
  },
  {
    question: 'Which cars qualify for tax credits and rebates?',
    answer: 'Eligibility depends on the exact program. Some incentives are manufacturer rebates that apply to most shoppers on eligible inventory, while tax credits and state EV programs may depend on the vehicle\u2019s VIN, assembly or battery rules, MSRP cap, buyer income, and where the car is registered.\n\nThe safest approach is to verify the exact trim and VIN before you count the savings in your budget. Even within one model line, one version may qualify while another does not, and program rules can change faster than dealer ad copy.',
    bullets: [
      'Check whether the program is federal, state, utility, or manufacturer based.',
      'Verify model year, trim, MSRP, and ZIP-code rules before signing.',
      'Ask whether the savings is applied at purchase or claimed later when filing taxes.',
      'Save the VIN and program terms in writing if the credit affects your budget.',
    ],
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

const CAR_AND_DRIVER = 'Car and Driver';

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

function renderFaqQuestionText(question: string) {
  const i = question.indexOf(CAR_AND_DRIVER);
  if (i === -1) {
    return question;
  }
  return (
    <>
      {question.slice(0, i)}
      <em className="zero-apr-page__faq-question-brand">{CAR_AND_DRIVER}</em>
      {question.slice(i + CAR_AND_DRIVER.length)}
    </>
  );
}

const ZeroAprDealsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams<{ slug?: string }>();
  const categorySlug = params.slug ?? '';

  const isZeroPercentOnlyRoute = location.pathname === ZERO_PERCENT_APR_DEALS_PATH;
  const isCashBackOnlyRoute = location.pathname === CASH_BACK_DEALS_PATH;

  const { getRating: getSupabaseRating } = useSupabaseRatings();
  const { user, isAuthenticated, addSavedVehicle, removeSavedVehicle } = useAuth();
  const { month, year } = getCurrentPeriod();

  // Resolve the URL slug against the buying dataset. Detection order mirrors
  // the lease dispatcher: body style → fuel type → make. If nothing in the
  // data matches we fall through to a title-cased make name so the page
  // still renders a useful header rather than silently dropping context.
  const { bodyStyleName, fuelTypeName, makeName } = useMemo(() => {
    if (!categorySlug) return { bodyStyleName: '', fuelTypeName: '', makeName: '' };
    const target = categorySlug.toLowerCase().replace(/-/g, ' ');
    const allBuyingDeals = [
      ...getZeroAprDeals(),
      ...getFinanceDeals(),
      ...getCashDeals(),
    ];

    const bodyMatch = allBuyingDeals.find((d) => d.vehicle.bodyStyle.toLowerCase() === target);
    if (bodyMatch) return { bodyStyleName: bodyMatch.vehicle.bodyStyle, fuelTypeName: '', makeName: '' };

    const fuelMatch = allBuyingDeals.find((d) => d.vehicle.fuelType.toLowerCase() === target);
    if (fuelMatch) return { bodyStyleName: '', fuelTypeName: fuelMatch.vehicle.fuelType, makeName: '' };

    const makeMatch = allBuyingDeals.find((d) => d.vehicle.make.toLowerCase() === target);
    if (makeMatch) return { bodyStyleName: '', fuelTypeName: '', makeName: makeMatch.vehicle.make };

    return {
      bodyStyleName: '',
      fuelTypeName: '',
      makeName: categorySlug
        .split('-')
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
        .join(' '),
    };
  }, [categorySlug]);

  const routeTab: AprTab = isZeroPercentOnlyRoute ? 'zero-apr' : isCashBackOnlyRoute ? 'cash' : 'all';

  const [activeTab, setActiveTab] = useState<AprTab>(routeTab);

  useEffect(() => {
    setActiveTab(routeTab);
  }, [routeTab]);
  const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(null);
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [pendingSaveVehicle, setPendingSaveVehicle] = useState<{ name: string; slug: string; image?: string } | null>(null);
  const [activeDealId, setActiveDealId] = useState<string | null>(null);
  const [filterOpen, setFilterOpen] = useFilterOpen();

  const initialFiltersFromNavState = (location.state as { filters?: DealsFilterState } | null)?.filters;
  const [filters, setFilters] = useState<DealsFilterState>(() => {
    if (initialFiltersFromNavState) return initialFiltersFromNavState;
    if (bodyStyleName) return { ...DEFAULT_FILTERS, bodyTypes: [bodyStyleName] };
    if (fuelTypeName) return { ...DEFAULT_FILTERS, fuelTypes: [fuelTypeName] };
    if (makeName) return { ...DEFAULT_FILTERS, makes: [makeName] };
    return DEFAULT_FILTERS;
  });

  // Keep the filter state in sync with the URL when the user navigates between
  // category-scoped buying pages so the modal always reflects the current
  // context as a pre-selected chip.
  useEffect(() => {
    setFilters((prev) => {
      if (bodyStyleName) {
        return {
          ...prev,
          bodyTypes: prev.bodyTypes.includes(bodyStyleName) ? prev.bodyTypes : [bodyStyleName],
        };
      }
      if (fuelTypeName) {
        return {
          ...prev,
          fuelTypes: prev.fuelTypes.includes(fuelTypeName) ? prev.fuelTypes : [fuelTypeName],
        };
      }
      if (makeName) {
        return {
          ...prev,
          makes: prev.makes.includes(makeName) ? prev.makes : [makeName],
        };
      }
      return prev;
    });
  }, [bodyStyleName, fuelTypeName, makeName]);

  // Hydrate filters when the user arrives from another buying surface with a
  // multi-selection carried via router state, then clear the state so a
  // refresh resets cleanly.
  useEffect(() => {
    const incoming = (location.state as { filters?: DealsFilterState } | null)?.filters;
    if (incoming) {
      setFilters(incoming);
      navigate(location.pathname, { replace: true, state: null });
    }
  }, [location.state, location.pathname, navigate]);

  const [offersPopup, setOffersPopup] = useState<{ slug: string; offers: VehicleOfferSummary[] } | null>(null);

  const handleFilterApply = useCallback(
    (applied: DealsFilterState) => {
      const dest = resolveBuyingFilterDestination(applied);
      if (dest && dest.path !== location.pathname) {
        navigate(dest.path, dest.carryFilters ? { state: { filters: applied } } : undefined);
        return;
      }
      setFilters(applied);
    },
    [navigate, location.pathname],
  );

  const handleDealTypeNavigate = useCallback((dealType: DealTypeOption, carriedFilters: DealsFilterState) => {
    if (dealType === 'lease' || dealType === 'all') {
      navigate('/deals/lease', { state: { filters: carriedFilters } });
    }
  }, [navigate]);

  const { pills: sharedPills } = useActiveFilterPills(filters, setFilters, DEFAULT_FILTERS);

  const activeFilterPills = useMemo(() => {
    const tabLabel = activeTab === 'zero-apr' ? '0% APR' : activeTab === 'special-apr' ? 'Special APR' : activeTab === 'cash' ? 'Cash Back' : '';
    const extra = tabLabel
      ? [{ id: `tab-${activeTab}`, label: tabLabel, onRemove: () => { setActiveTab('all'); setFilters(DEFAULT_FILTERS); } }]
      : [];
    return [...extra, ...sharedPills];
  }, [activeTab, sharedPills]);

  const clearAllFilters = useCallback(() => {
    setActiveTab('all');
    setFilters(DEFAULT_FILTERS);
  }, []);

  const toggleOffersPopup = useCallback((e: React.MouseEvent, make: string, model: string, slug: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (offersPopup?.slug === slug) {
      setOffersPopup(null);
    } else {
      setOffersPopup({ slug, offers: getVehicleOffers(make, model) });
    }
  }, [offersPopup]);

  const allDeals = useMemo((): UnifiedAprDeal[] => {
    const results: UnifiedAprDeal[] = [];

    for (const d of getZeroAprDeals()) {
      const msrp = parseMsrpMin(d.vehicle.priceRange);
      const months = parseTermMonths(d.term);
      const monthly = calcMonthly(msrp, 0, months);
      const { savingsVsAvg, savingsTooltip } = buildSavingsText(monthly, d.vehicle.bodyStyle);
      results.push({
        id: d.id, aprType: 'zero-apr', vehicleName: `${d.vehicle.year} ${d.vehicle.make} ${d.vehicle.model}`, vehicle: d.vehicle,
        apr: 0, aprDisplay: '0%', term: d.term, estimatedMonthly: monthly, savingsVsAvg, savingsTooltip,
        dealText: '0% APR Financing', expirationDate: d.expirationDate,
        programName: d.programName, programDescription: d.programDescription,
        targetAudience: d.targetAudience, trimsEligible: d.trimsEligible,
        rating: getSupabaseRating(d.vehicle.id, getCategory(d.vehicle.bodyStyle), d.vehicle.staffRating),
      });
    }

    for (const d of getFinanceDeals()) {
      const msrp = parseMsrpMin(d.vehicle.priceRange);
      const aprNum = parseFloat(d.apr.replace('%', ''));
      const months = parseTermMonths(d.term);
      const monthly = calcMonthly(msrp, aprNum, months);
      const { savingsVsAvg, savingsTooltip } = buildSavingsText(monthly, d.vehicle.bodyStyle);
      const rangeLabel = getAprRangeLabel({ value: `${d.apr} APR`, title: d.programName, terms: d.term });
      const displayRate = rangeLabel.replace(/\s*APR$/, '');
      results.push({
        id: d.id, aprType: 'special-apr', vehicleName: `${d.vehicle.year} ${d.vehicle.make} ${d.vehicle.model}`, vehicle: d.vehicle,
        apr: aprNum, aprDisplay: displayRate, term: d.term, estimatedMonthly: monthly, savingsVsAvg, savingsTooltip,
        dealText: rangeLabel, expirationDate: d.expirationDate,
        programName: d.programName, programDescription: d.programDescription,
        targetAudience: d.targetAudience, trimsEligible: d.trimsEligible,
        rating: getSupabaseRating(d.vehicle.id, getCategory(d.vehicle.bodyStyle), d.vehicle.staffRating),
      });
    }

    for (const d of getCashDeals()) {
      const msrp = parseMsrpMin(d.vehicle.priceRange);
      const monthlyAfterCash = calcMonthly(msrp - d.incentiveAmount, 6.5, 60);
      const { savingsVsAvg, savingsTooltip } = buildSavingsText(monthlyAfterCash, d.vehicle.bodyStyle, 'cash');
      results.push({
        id: d.id, aprType: 'cash', vehicleName: `${d.vehicle.year} ${d.vehicle.make} ${d.vehicle.model}`, vehicle: d.vehicle,
        apr: -1, aprDisplay: d.incentiveValue, term: '', estimatedMonthly: monthlyAfterCash, savingsVsAvg, savingsTooltip,
        dealText: `${d.incentiveValue} Cash Back`, expirationDate: d.expirationDate,
        programName: d.programName, programDescription: d.programDescription,
        targetAudience: '', trimsEligible: d.trimsEligible,
        rating: getSupabaseRating(d.vehicle.id, getCategory(d.vehicle.bodyStyle), d.vehicle.staffRating),
        incentiveValue: d.incentiveValue, percentOffMsrp: d.percentOffMsrp,
      });
    }

    return results.sort((a, b) => a.apr - b.apr);
  }, [getSupabaseRating]);

  const applyFiltersToDeals = useCallback((dealList: UnifiedAprDeal[], f: DealsFilterState): UnifiedAprDeal[] => {
    return dealList.filter(d => {
      const v = d.vehicle;
      if (f.bodyTypes.length > 0 && !f.bodyTypes.includes(v.bodyStyle)) return false;
      if (f.makes.length > 0 && !f.makes.includes(v.make)) return false;
      if (f.fuelTypes.length > 0 && !f.fuelTypes.includes(v.fuelType)) return false;
      if (f.accolades.length > 0) {
        const hasMatch = f.accolades.some(a => {
          if (a === 'editorsChoice') return v.editorsChoice;
          if (a === 'tenBest') return v.tenBest;
          if (a === 'evOfTheYear') return (v as any).evOfTheYear;
          return false;
        });
        if (!hasMatch) return false;
      }
      if (f.terms.length > 0 && d.term) {
        if (!f.terms.includes(parseTermMonths(d.term))) return false;
      }
      if (f.creditTier && d.targetAudience) {
        const dealTier = inferCreditTier(d.targetAudience);
        if (!creditTierQualifies(dealTier, f.creditTier)) return false;
      }
      if (f.monthlyPaymentMin > 0 || f.monthlyPaymentMax < 1500) {
        if (d.estimatedMonthly < f.monthlyPaymentMin || d.estimatedMonthly > f.monthlyPaymentMax) return false;
      }
      return true;
    });
  }, []);

  const filteredAll = useMemo(() => applyFiltersToDeals(allDeals, filters), [allDeals, filters, applyFiltersToDeals]);

  const deals = useMemo(() => {
    const tabbed = activeTab === 'all' ? filteredAll : filteredAll.filter(d => d.aprType === activeTab);
    return sortDeals(tabbed, filters.sortBy);
  }, [filteredAll, activeTab, filters.sortBy]);

  const dealChunks = useMemo(() => chunkArray(deals, GRID_BREAKER_AFTER_CARD_COUNT), [deals]);

  const getResultCount = useCallback((draftFilters: DealsFilterState): number => {
    const filtered = applyFiltersToDeals(allDeals, draftFilters);
    if (activeTab === 'all') return filtered.length;
    return filtered.filter(d => d.aprType === activeTab).length;
  }, [allDeals, applyFiltersToDeals, activeTab]);

  const isVehicleSaved = (vehicleName: string) => user?.savedVehicles?.some((v) => v.name === vehicleName) || false;

  const handleSaveClick = (e: React.MouseEvent, vehicle: { name: string; slug: string; image?: string }) => {
    e.preventDefault(); e.stopPropagation();
    if (!isAuthenticated) { setPendingSaveVehicle(vehicle); setShowSignInModal(true); return; }
    const isSaved = isVehicleSaved(vehicle.name);
    if (isSaved) { const sv = user?.savedVehicles?.find((v) => v.name === vehicle.name); if (sv) removeSavedVehicle(sv.id); }
    else { addSavedVehicle({ id: vehicle.slug, name: vehicle.name, ownership: 'want' }); }
  };

  const renderAprDealCard = (deal: UnifiedAprDeal) => {
    const saved = isVehicleSaved(deal.vehicleName);
    const isCash = deal.aprType === 'cash';
    const dealTypeTag = isCash ? 'Cash' : 'Buy';
    const offers = getVehicleOffers(deal.vehicle.make, deal.vehicle.model);
    const payment = isCash
      ? {
          amount: deal.incentiveValue ?? '',
          period: 'Cash Back',
          expirationDate: deal.expirationDate,
        }
      : {
          amount: deal.aprDisplay,
          period: ' APR',
          expirationDate: deal.expirationDate,
        };
    const pill = {
      chipLabel: dealTypeTag,
      text: deal.dealText,
      expirationDate: deal.expirationDate,
    };
    const details = [
      { label: 'MSRP Range', value: deal.vehicle.priceRange },
      isCash
        ? { label: 'Est. off MSRP', value: deal.percentOffMsrp ?? '' }
        : { label: 'Term', value: deal.term },
    ];

    return (
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
    );
  };

  const activeDealObj = activeDealId ? deals.find(d => d.id === activeDealId) : null;
  const activeOffer: Partial<IncentiveOfferDetail> | undefined = activeDealObj
    ? {
        year: parseInt(activeDealObj.vehicle.year, 10),
        make: activeDealObj.vehicle.make,
        model: activeDealObj.vehicle.model,
        slug: activeDealObj.vehicle.slug,
        imageUrl: activeDealObj.vehicle.image,
        msrpMin: parseInt(activeDealObj.vehicle.priceRange.replace(/[^0-9,\-–]/g, '').split(/[-–]/)[0]?.replace(/,/g, '') || '0', 10),
        msrpMax: parseInt(activeDealObj.vehicle.priceRange.replace(/[^0-9,\-–]/g, '').split(/[-–]/)[1]?.replace(/,/g, '') || '0', 10),
        offerHeadline: activeDealObj.aprType === 'cash'
          ? `${activeDealObj.incentiveValue} Cash Back`
          : activeDealObj.aprType === 'zero-apr'
          ? `0% Interest Financing for ${activeDealObj.term}`
          : `${activeDealObj.aprDisplay} APR Financing for ${activeDealObj.term}`,
        whatItMeans: activeDealObj.aprType === 'cash'
          ? `A manufacturer rebate of ${activeDealObj.incentiveValue} applied at purchase, reducing the effective price of the vehicle.`
          : activeDealObj.aprType === 'zero-apr'
          ? 'You pay absolutely zero interest on your auto loan. Every dollar of your monthly payment goes directly toward the price of the car, not to the bank.'
          : `A below-market ${activeDealObj.aprDisplay} interest rate from the manufacturer that lowers your monthly payment and total cost vs. the average ~6.5% rate.`,
        yourSavings: activeDealObj.aprType === 'cash'
          ? `${activeDealObj.incentiveValue} off the purchase price (${activeDealObj.percentOffMsrp} off MSRP).`
          : activeDealObj.aprType === 'zero-apr'
          ? `On a $35,000 loan over ${activeDealObj.term}, you'd save thousands in interest vs. the average 6.5% rate.`
          : `At ${activeDealObj.aprDisplay} instead of 6.5%, you could save $1,500–$3,000 in interest over the loan term.`,
        whoQualifies: activeDealObj.targetAudience || 'All buyers',
        eligibleTrims: activeDealObj.trimsEligible,
        dontWaitText: `This offer expires ${formatExpiration(activeDealObj.expirationDate)}. Manufacturer deals change monthly. Once it's gone, there's no guarantee it'll come back.`,
        eventLabel: activeDealObj.programName,
        expirationDate: activeDealObj.expirationDate,
      }
    : undefined;

  const pageTitle = bodyStyleName
    ? `Best ${bodyStyleName} Deals & Incentives for ${month} ${year}`
    : fuelTypeName
    ? `Best ${fuelTypeName} Deals & Incentives for ${month} ${year}`
    : makeName
    ? `Best ${makeName} Deals & Incentives for ${month} ${year}`
    : activeTab === 'zero-apr'
    ? `Best Interest Free & 0% APR Deals for ${month} ${year}`
    : activeTab === 'special-apr'
    ? `Best Special APR Deals for ${month} ${year}`
    : activeTab === 'cash'
    ? `Best Cash Back Deals for ${month} ${year}`
    : `Best Car Deals & Incentives for ${month} ${year}`;
  const BASE_URL = 'https://www.caranddriver.com';

  const seoDescription = bodyStyleName
    ? `Find the best ${bodyStyleName.toLowerCase()} buying deals for ${month} ${year}. Compare 0% APR, low-rate financing, and cash-back rebates on every ${bodyStyleName.toLowerCase()}. Expert ratings from Car and Driver.`
    : fuelTypeName
    ? `Find the best ${fuelTypeName.toLowerCase()} buying deals for ${month} ${year}. Compare 0% APR, low-rate financing, and cash-back rebates on every ${fuelTypeName.toLowerCase()} vehicle. Expert ratings from Car and Driver.`
    : makeName
    ? `Find the best ${makeName} buying deals for ${month} ${year}. Compare 0% APR, low-rate financing, and cash-back rebates on every new ${makeName}. Expert ratings from Car and Driver.`
    : isZeroPercentOnlyRoute
    ? `Browse every current 0% APR financing offer for ${month} ${year}. Pay no interest on your auto loan, paired with Car and Driver expert ratings.`
    : `Find the best buying deals for ${month} ${year}. Compare 0% APR, low-rate financing, cash-back rebates, and special offers on new cars, SUVs, and trucks. Expert ratings from Car and Driver.`;

  const seoCanonical = bodyStyleName || fuelTypeName || makeName
    ? `${BASE_URL}${BEST_BUYING_DEALS_PATH}/${categorySlug}`
    : `${BASE_URL}${isZeroPercentOnlyRoute ? ZERO_PERCENT_APR_DEALS_PATH : BEST_BUYING_DEALS_PATH}`;

  const breadcrumbItems = bodyStyleName
    ? [
        { name: 'Home', url: BASE_URL },
        { name: 'Deals', url: `${BASE_URL}/deals` },
        { name: 'Best Buying Deals', url: `${BASE_URL}${BEST_BUYING_DEALS_PATH}` },
        { name: `${bodyStyleName} Deals`, url: seoCanonical },
      ]
    : fuelTypeName
    ? [
        { name: 'Home', url: BASE_URL },
        { name: 'Deals', url: `${BASE_URL}/deals` },
        { name: 'Best Buying Deals', url: `${BASE_URL}${BEST_BUYING_DEALS_PATH}` },
        { name: `${fuelTypeName} Deals`, url: seoCanonical },
      ]
    : makeName
    ? [
        { name: 'Home', url: BASE_URL },
        { name: 'Deals', url: `${BASE_URL}/deals` },
        { name: 'Best Buying Deals', url: `${BASE_URL}${BEST_BUYING_DEALS_PATH}` },
        { name: `${makeName} Deals`, url: seoCanonical },
      ]
    : isZeroPercentOnlyRoute
    ? [
        { name: 'Home', url: BASE_URL },
        { name: 'Deals', url: `${BASE_URL}/deals` },
        { name: 'Best Buying Deals', url: `${BASE_URL}${BEST_BUYING_DEALS_PATH}` },
        { name: '0% APR Deals', url: `${BASE_URL}${ZERO_PERCENT_APR_DEALS_PATH}` },
      ]
    : [
        { name: 'Home', url: BASE_URL },
        { name: 'Deals', url: `${BASE_URL}/deals` },
        { name: 'Best Buying Deals', url: `${BASE_URL}${BEST_BUYING_DEALS_PATH}` },
      ];

  return (
    <div className="zero-apr-page">
      <SEO
        title={pageTitle}
        description={seoDescription}
        canonical={seoCanonical}
        keywords={['buying deals', '0% APR deals', 'cash back deals', 'low APR financing', `car deals ${month} ${year}`, 'special APR rates', 'new car financing deals']}
        structuredData={[
          createBreadcrumbStructuredData(breadcrumbItems),
          createFAQStructuredData(isZeroPercentOnlyRoute ? ZERO_APR_FAQ : FAQ_DATA),
        ]}
        noIndex={isZeroPercentOnlyRoute ? deals.length === 0 : allDeals.length === 0}
      />

      <div className="zero-apr-page__hero">
        <div className="container">
          <div className="zero-apr-page__hero-content">
            <nav className="zero-apr-page__breadcrumb" aria-label="Breadcrumb">
              <Link to="/">Home</Link>
              <span className="zero-apr-page__breadcrumb-sep">/</span>
              <Link to="/deals">Deals</Link>
              <span className="zero-apr-page__breadcrumb-sep">/</span>
              {bodyStyleName ? (
                <>
                  <Link to={BEST_BUYING_DEALS_PATH}>Best Buying Deals</Link>
                  <span className="zero-apr-page__breadcrumb-sep">/</span>
                  <span>{bodyStyleName} Deals</span>
                </>
              ) : fuelTypeName ? (
                <>
                  <Link to={BEST_BUYING_DEALS_PATH}>Best Buying Deals</Link>
                  <span className="zero-apr-page__breadcrumb-sep">/</span>
                  <span>{fuelTypeName} Deals</span>
                </>
              ) : makeName ? (
                <>
                  <Link to={BEST_BUYING_DEALS_PATH}>Best Buying Deals</Link>
                  <span className="zero-apr-page__breadcrumb-sep">/</span>
                  <span>{makeName} Deals</span>
                </>
              ) : isZeroPercentOnlyRoute ? (
                <>
                  <Link to={BEST_BUYING_DEALS_PATH}>Best Buying Deals</Link>
                  <span className="zero-apr-page__breadcrumb-sep">/</span>
                  <span>0% APR Deals</span>
                </>
              ) : (
                <span>Best Buying Deals</span>
              )}
            </nav>
            <h1 className="zero-apr-page__title">{pageTitle}</h1>
            <p className="zero-apr-page__description">
              {isZeroPercentOnlyRoute
                ? 'These manufacturer-backed offers charge no interest on your auto loan, so every payment goes toward paying off the vehicle. Compare terms and C/D ratings to find the right 0% APR deal.'
                : 'Manufacturer-subsidized financing\u2014cash-back deals or low financing rates\u2014is one of the best deals a car shopper can find. These offers can save you thousands over the life of your loan.'}
            </p>
          </div>
        </div>
      </div>

      <div className="zero-apr-page__toolbar">
        <div className="container zero-apr-page__toolbar-inner">
          <div className="active-filter-pills__toolbar-left">
            <span className="active-filter-pills__count">{deals.length} {deals.length === 1 ? 'deal' : 'deals'}</span>
            <div className="active-filter-pills__row" aria-label="Active filters">
              {activeFilterPills.length === 0 && (
                <span className="active-filter-pills__pill active-filter-pills__pill--static">
                  <span className="active-filter-pills__pill-label">Buying Deals</span>
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

      <div className="zero-apr-page__content">
        <div className={`container${deals.length > 0 ? ' zero-apr-page__container--stacked' : ''}`}>
          {deals.length === 0 ? (
            <div className="zero-apr-page__segment">
              <div className="zero-apr-page__main">
                <section className="zero-apr-page__deals-section">
                  <div className="zero-apr-page__grid">
                    <div className="zero-apr-page__empty-state">
                      <p className="zero-apr-page__empty-state-text">
                        {isZeroPercentOnlyRoute
                          ? 'There are currently no active 0% APR offers. Browse all APR and financing deals or check back soon.'
                          : 'There are currently no active APR financing offers. Check back soon or explore other available deals.'}
                      </p>
                      {isZeroPercentOnlyRoute ? (
                        <Link to={BEST_BUYING_DEALS_PATH} className="zero-apr-page__empty-state-link">
                          All APR & financing deals
                        </Link>
                      ) : (
                        <Link to="/deals" className="zero-apr-page__empty-state-link">
                          Browse All Deals
                        </Link>
                      )}
                    </div>
                  </div>
                </section>
              </div>
              <aside className="zero-apr-page__sidebar" aria-label="Advertisement">
                <div className="zero-apr-page__sidebar-sticky">
                  <AdSidebar />
                </div>
              </aside>
            </div>
          ) : (
            <>
              {dealChunks.map((chunk, chunkIndex) => (
                <Fragment key={`apr-segment-${chunkIndex}`}>
                  <div className="zero-apr-page__segment">
                    <div className="zero-apr-page__main">
                      <section className="zero-apr-page__deals-section">
                        <div className="zero-apr-page__grid">
                          {chunk.map((deal, i) => (
                            <Fragment key={deal.id}>
                              {i > 0 && i % 4 === 0 && <GridAd />}
                              {renderAprDealCard(deal)}
                            </Fragment>
                          ))}
                        </div>
                      </section>
                    </div>
                    <aside className="zero-apr-page__sidebar" aria-label="Advertisement">
                      <div className="zero-apr-page__sidebar-sticky">
                        {chunkIndex === 0 ? <AdSidebar /> : <AdSidebar {...SIDEBAR_AFTER_BREAK_PROPS} />}
                      </div>
                    </aside>
                  </div>
                  {chunkIndex < dealChunks.length - 1 && (
                    <div className="zero-apr-page__full-bleed-breaker" role="complementary" aria-label="Advertisement">
                      <AdBanner imageUrl={DEALS_GRID_BREAKER_AD_URL} altText="Advertisement" />
                    </div>
                  )}
                </Fragment>
              ))}
            </>
          )}

          <div className="zero-apr-page__segment zero-apr-page__segment--tail">
            <div className="zero-apr-page__main">
              <section className="zero-apr-page__faq-section" aria-labelledby="zero-apr-faq-heading">
                <h2 id="zero-apr-faq-heading" className="zero-apr-page__faq-heading">
                  FAQs
                </h2>
                <div className="zero-apr-page__faq-list">
                  {(isZeroPercentOnlyRoute ? ZERO_APR_FAQ : FAQ_DATA).map((faq, index) => (
                    <div key={index} className={`zero-apr-page__faq-item ${expandedFaqIndex === index ? 'zero-apr-page__faq-item--expanded' : ''}`}>
                      <button
                        type="button"
                        className="zero-apr-page__faq-question"
                        onClick={() => setExpandedFaqIndex(expandedFaqIndex === index ? null : index)}
                        aria-expanded={expandedFaqIndex === index}
                      >
                        <span className="zero-apr-page__faq-question-text">{renderFaqQuestionText(faq.question)}</span>
                        {expandedFaqIndex === index ? <ChevronUp size={24} aria-hidden /> : <ChevronDown size={24} aria-hidden />}
                      </button>
                      {expandedFaqIndex === index && (
                        <div className="zero-apr-page__faq-answer">
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

              <section className="zero-apr-page__links-section">
                <h2 className="zero-apr-page__section-title">Explore More</h2>
                <div className="zero-apr-page__links-grid">
                  <Link to={ZERO_PERCENT_APR_DEALS_PATH} className="zero-apr-page__link-card"><h3>Best 0% APR Deals</h3><p>Interest-free manufacturer financing in one list</p></Link>
                  <Link to="/deals/lease" className="zero-apr-page__link-card"><h3>Best Car Lease Deals</h3><p>Monthly lease specials on new cars</p></Link>
                </div>
              </section>
            </div>
            <aside className="zero-apr-page__sidebar" aria-label="Advertisement">
              <div className="zero-apr-page__sidebar-sticky">
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
              activeDealObj.aprType === 'special-apr' ? 'finance' : activeDealObj.aprType,
              activeDealObj.aprType !== 'cash' ? { apr: `${activeDealObj.apr}%`, term: activeDealObj.term } : undefined,
            )
          : undefined
        }
      />
      <SignInToSaveModal isOpen={showSignInModal} onClose={() => { setShowSignInModal(false); setPendingSaveVehicle(null); }} itemType="vehicle" itemName={pendingSaveVehicle?.name} itemImage={pendingSaveVehicle?.image} />
      <DealsFilterModal isOpen={filterOpen} onClose={() => setFilterOpen(false)} filters={filters} onApply={handleFilterApply} totalResults={deals.length} getResultCount={getResultCount} dealPageType="finance" onDealTypeNavigate={handleDealTypeNavigate} />
    </div>
  );
};

export default ZeroAprDealsPage;
