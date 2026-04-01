import { useMemo, useState, useCallback, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ChevronLeft, ChevronUp, ChevronDown, Percent, BadgeDollarSign, KeyRound, CarFront, Truck, Fuel, Car, SlidersHorizontal, Heart, Info } from 'lucide-react';
import { parseMsrpMin, calcMonthly, parseTermMonths, buildSavingsText, inferCreditTier, creditTierQualifies, getVehicleOffers, offersToIncentives, AVG_MARKET_APR, AVG_LOAN_TERM } from '../../utils/dealCalculations';
import type { VehicleOfferSummary } from '../../utils/dealCalculations';
import { getZeroAprDeals } from '../../services/zeroAprDealsService';
import { getCashDeals, getFinanceDeals } from '../../services/cashFinanceDealsService';
import { getLeaseDeals } from '../../services/leaseDealsService';
import { getCurrentPeriod, formatExpiration } from '../../utils/dateUtils';
import IncentivesModal from '../../components/IncentivesModal/IncentivesModal';
import type { IncentiveOfferDetail } from '../../components/IncentivesModal/IncentivesModal';
import { DealsFilterModal } from '../../components/DealsFilterModal';
import type { DealsFilterState } from '../../components/DealsFilterModal';
import { SEO, createBreadcrumbStructuredData } from '../../components/SEO';
import { EDITORS_CHOICE_BADGE_URL, TEN_BEST_BADGE_URL } from '../../constants/badges';
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
  savingsVsAvg: string;
  savingsTooltip: string;
  term?: string;
}

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

const DealsHubPage = () => {
  const { month, year } = getCurrentPeriod();
  const [activeDeal, setActiveDeal] = useState<MiniDeal | null>(null);
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState<DealsFilterState>(DEFAULT_FILTERS);
  const [savedDeals, setSavedDeals] = useState<Set<string>>(new Set());
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());
  const [offersPopup, setOffersPopup] = useState<{ slug: string; offers: VehicleOfferSummary[] } | null>(null);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const navScrollRef = useRef<HTMLDivElement>(null);
  const [navCanScroll, setNavCanScroll] = useState({ left: false, right: false });

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

  const toggleExpand = useCallback((key: string) => {
    setExpandedCards(prev => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key); else next.add(key);
      return next;
    });
  }, []);

  const hasActiveFilters = filters.bodyTypes.length > 0 || filters.makes.length > 0 || filters.fuelTypes.length > 0 || filters.accolades.length > 0 || filters.terms.length > 0 || filters.creditTier !== null;
  const activeFilterCount = filters.bodyTypes.length + filters.makes.length + filters.fuelTypes.length + filters.accolades.length + filters.terms.length + (filters.creditTier ? 1 : 0);

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
          dealText: `0% APR for ${d.term}`,
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
        return {
          vehicleName: `${d.vehicle.year} ${d.vehicle.make} ${d.vehicle.model}`,
          make: d.vehicle.make, model: d.vehicle.model, image: d.vehicle.image,
          slug: d.vehicle.slug, priceRange: d.vehicle.priceRange,
          dealType: 'finance' as const,
          dealText: `${d.apr} APR for ${d.term}`,
          dealHeadline: `${d.apr} APR Financing for ${d.term}`,
          whatItMeans: `The manufacturer is subsidizing your loan rate to ${d.apr}, which is well below the national average of ~6.5%. This means lower monthly payments and thousands saved over the life of the loan.`,
          savingsNote: `At ${d.apr} instead of 6.5%, you could save $1,500–$3,000 in interest over the loan term.`,
          whoQualifies: d.targetAudience,
          programName: d.programName, programDescription: d.programDescription,
          trimsEligible: d.trimsEligible, expirationDate: d.expirationDate,
          editorsChoice: d.vehicle.editorsChoice, tenBest: d.vehicle.tenBest,
          staffRating: d.vehicle.staffRating, term: d.term,
          estimatedMonthly: `$${monthly.toLocaleString()}`, savingsVsAvg, savingsTooltip,
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
          return { ...base, dealType: 'zero-apr' as const, dealText: `0% APR for ${term}`, dealHeadline: `0% Interest Financing for ${term}`,
            whatItMeans: 'Zero interest on your auto loan—every payment dollar goes toward the car. This could save you thousands compared to a typical rate.',
            savingsNote: "On a $35,000 loan, you'd save approximately $3,000–$5,000 in interest.", whoQualifies: audience,
            estimatedMonthly: `$${monthly.toLocaleString()}`, savingsVsAvg, savingsTooltip };
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
          return { ...base, dealType: 'finance' as const, dealText: `${apr} APR`, dealHeadline: `${apr} APR Special Financing`,
            whatItMeans: 'A below-market interest rate from the manufacturer that lowers your monthly payment and total cost.',
            savingsNote: 'Could save you $1,500–$3,000 in interest over the loan term.', whoQualifies: audience,
            estimatedMonthly: `$${monthly.toLocaleString()}`, savingsVsAvg, savingsTooltip };
        }
      });

    return [
      { title: 'Best Buying Deals', description: '0% APR, cash back, special low-rate financing, and below-market rates — save thousands when you buy.', href: '/deals/zero-apr', count: filteredZeroApr.length + filteredFinance.length + filteredCash.length, icon: <Percent size={22} strokeWidth={2.2} />, deals: [...toMiniZeroApr(filteredZeroApr), ...toMiniFinance(filteredFinance), ...toMiniCash(filteredCash)].slice(0, 3) },
      { title: 'Lease Deals', description: 'Drive a new car for less with low monthly payments and flexible terms.', href: '/deals/lease', count: filteredLease.length, icon: <KeyRound size={22} strokeWidth={2.2} />, deals: toMiniLease(filteredLease) },
      { title: 'Best SUV Deals', description: 'Top incentives on SUVs and crossovers — from subcompact to full-size.', href: '/deals/suv', count: suvDeals.length, icon: <CarFront size={22} strokeWidth={2.2} />, imageIcon: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/suv-1585158794.png?crop=1.00xw:0.502xh;0,0.260xh&resize=180:*', deals: toMiniMixed(suvDeals) },
      { title: 'Best Truck Deals', description: 'The best current offers on light-duty and mid-size pickup trucks.', href: '/deals/truck', count: truckDeals.length, icon: <Truck size={22} strokeWidth={2.2} />, imageIcon: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/trucks-1585158794.png?crop=1.00xw:0.502xh;0,0.236xh&resize=180:*', deals: toMiniMixed(truckDeals) },
      { title: 'Deals by Fuel Type', description: 'Shop by powertrain — hybrid, electric, plug-in hybrid, diesel, and gas deals.', href: '/deals/fuel-type', count: allFuelTypeCount, icon: <Fuel size={22} strokeWidth={2.2} />, imageIcon: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/hybrids-1585158794.png?crop=1.00xw:0.502xh;0,0.247xh&resize=180:*', deals: [...toMiniMixed(fuelTypePurchaseDeals), ...toMiniLease(fuelTypeLeaseDeals)].slice(0, 3) },
      { title: 'Buying by Body Style', description: 'Purchase deals organized by SUV, sedan, truck, coupe, and more.', href: '/deals/cash-finance-body-style', count: filteredFinance.length + filteredCash.length, icon: <Car size={22} strokeWidth={2.2} />, imageIcon: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/sedans-1585158794.png?crop=1.00xw:0.502xh;0,0.260xh&resize=180:*', deals: [...filteredFinance, ...filteredCash].slice(0, 3).map(d => (d.type === 'cash' ? toMiniCash([d])[0] : toMiniFinance([d])[0])) },
    ];
  }, [rawData, matchesFilters]);

  const sectionIds = useMemo(() => categories.map(cat => cat.href.replace('/deals/', 'section-')), [categories]);

  useEffect(() => {
    const els = sectionIds.map(id => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    if (els.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: '-120px 0px -60% 0px', threshold: 0 },
    );
    els.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [sectionIds]);

  useEffect(() => {
    if (!activeSection || !navScrollRef.current) return;
    const idx = sectionIds.indexOf(activeSection);
    if (idx < 0) return;
    const btn = navScrollRef.current.children[idx] as HTMLElement | undefined;
    if (!btn) return;
    const nav = navScrollRef.current;
    const btnLeft = btn.offsetLeft;
    const btnRight = btnLeft + btn.offsetWidth;
    const navLeft = nav.scrollLeft;
    const navRight = navLeft + nav.clientWidth;
    if (btnLeft < navLeft || btnRight > navRight) {
      nav.scrollTo({
        left: btnLeft - nav.clientWidth / 2 + btn.offsetWidth / 2,
        behavior: 'smooth',
      });
    }
  }, [activeSection, sectionIds]);

  const checkNavScroll = useCallback(() => {
    const el = navScrollRef.current;
    if (!el) return;
    setNavCanScroll({
      left: el.scrollLeft > 2,
      right: el.scrollLeft + el.clientWidth < el.scrollWidth - 2,
    });
  }, []);

  useEffect(() => {
    checkNavScroll();
    const el = navScrollRef.current;
    if (!el) return;
    el.addEventListener('scroll', checkNavScroll, { passive: true });
    window.addEventListener('resize', checkNavScroll);
    return () => { el.removeEventListener('scroll', checkNavScroll); window.removeEventListener('resize', checkNavScroll); };
  }, [checkNavScroll, categories]);

  const scrollNav = useCallback((dir: 'left' | 'right') => {
    const el = navScrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === 'left' ? -200 : 200, behavior: 'smooth' });
  }, []);

  const scrollToSection = useCallback((sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (!el) return;
    const offset = 130;
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  }, []);

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
            <div className="deals-hub__hero-badge">
              <BadgeDollarSign size={16} />
              <span>Car Deals</span>
            </div>
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
          </div>
        </div>
      </div>

      {/* Filter toolbar */}
      <div className="deals-hub__toolbar">
        <div className="container deals-hub__toolbar-inner">
          <span className="deals-hub__toolbar-count">{totalResults} deals available</span>

          <div className="deals-hub__anchor-nav-wrap">
            {navCanScroll.left && (
              <button type="button" className="deals-hub__anchor-nav-arrow deals-hub__anchor-nav-arrow--left" onClick={() => scrollNav('left')} aria-label="Scroll left">
                <ChevronLeft size={16} />
              </button>
            )}
            <div className="deals-hub__anchor-nav" ref={navScrollRef}>
              {categories.map((cat, i) => {
                const sectionId = sectionIds[i];
                return (
                  <button
                    key={cat.href}
                    type="button"
                    className={`deals-hub__anchor-btn ${activeSection === sectionId ? 'deals-hub__anchor-btn--active' : ''}`}
                    onClick={() => scrollToSection(sectionId)}
                  >
                    <span className="deals-hub__anchor-label">{cat.title}</span>
                    <span className="deals-hub__anchor-count">{cat.count}</span>
                  </button>
                );
              })}
            </div>
            {navCanScroll.right && (
              <button type="button" className="deals-hub__anchor-nav-arrow deals-hub__anchor-nav-arrow--right" onClick={() => scrollNav('right')} aria-label="Scroll right">
                <ChevronRight size={16} />
              </button>
            )}
          </div>

          <div className="deals-hub__toolbar-actions">
            <Link to="/deals/all" className="deals-hub__view-all-link">
              View All <ChevronRight size={14} />
            </Link>
            <button
              type="button"
              className={`deals-hub__filter-btn ${hasActiveFilters ? 'deals-hub__filter-btn--active' : ''}`}
              onClick={() => setFilterOpen(true)}
            >
              <SlidersHorizontal size={16} />
              <span>Filters</span>
              {activeFilterCount > 0 && (
                <span className="deals-hub__filter-badge">{activeFilterCount}</span>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="deals-hub__content">
        <div className="container">
          <div className="deals-hub__categories">
            {categories.map((cat, catIdx) => (
              <div key={cat.href} id={sectionIds[catIdx]} className="deals-hub__row">
                <div className="deals-hub__row-left">
                  <div className="deals-hub__row-icon">
                    {cat.imageIcon
                      ? <img src={cat.imageIcon} alt="" className="deals-hub__row-icon-img" />
                      : cat.icon}
                  </div>
                  <h2 className="deals-hub__row-title">{cat.title}</h2>
                  <p className="deals-hub__row-description">{cat.description}</p>
                  <span className="deals-hub__row-count">{cat.count} deals</span>
                  <Link to={cat.href} className="deals-hub__row-cta">
                    View All <ChevronRight size={16} />
                  </Link>
                </div>
                <div className="deals-hub__row-cards">
                  {cat.deals.length > 0 ? cat.deals.map((deal, i) => {
                    const cardKey = `${cat.href}-${i}`;
                    const isExpanded = expandedCards.has(cardKey);
                    return (
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
                                      {o.type === 'zero-apr' ? '0% APR' : o.type === 'cash' ? 'Cash' : o.type === 'finance' ? 'Finance' : 'Lease'}
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
                            <span className="deals-hub__card-payment-amount">{deal.estimatedMonthly}</span>
                            <span className="deals-hub__card-payment-period">
                              {deal.dealType === 'lease' ? '/mo' : deal.dealType === 'cash' ? ' cash back' : '/mo*'}
                            </span>
                          </div>
                          <span className="deals-hub__card-payment-savings">
                            {deal.savingsVsAvg}
                            <span className="deals-hub__card-tooltip-wrap">
                              <Info size={13} className="deals-hub__card-tooltip-icon" />
                              <span className="deals-hub__card-tooltip">{deal.savingsTooltip}</span>
                            </span>
                          </span>
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

                        {/* Expandable details */}
                        <button
                          type="button"
                          className="deals-hub__card-expand"
                          onClick={() => toggleExpand(cardKey)}
                        >
                          Additional Details {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                        </button>
                        {isExpanded && (
                          <div className="deals-hub__card-expanded">
                            <p className="deals-hub__card-expanded-text">{deal.programDescription}</p>
                            {deal.trimsEligible.length > 0 && (
                              <p className="deals-hub__card-expanded-trims"><strong>Eligible trims:</strong> {deal.trimsEligible.join(', ')}</p>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                    );
                  }) : (
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
        onApply={setFilters}
        totalResults={totalResults}
      />
    </div>
  );
};

export default DealsHubPage;
