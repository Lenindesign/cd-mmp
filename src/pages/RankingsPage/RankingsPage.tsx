import React, { useCallback, useMemo, useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import { ChevronRight, ChevronLeft, ChevronDown, Bookmark } from 'lucide-react';
import { getAllVehicles } from '../../services/vehicleService';
import { getVehicleOffers } from '../../utils/dealCalculations';
import { useSupabaseRatings, getCategory } from '../../hooks/useSupabaseRating';
import { useAuth } from '../../contexts/AuthContext';
import { VehicleCard } from '../../components/VehicleCard';
import { SEO } from '../../components/SEO';
import AdSidebar from '../../components/AdSidebar';
import AdBanner from '../../components/AdBanner';
import { GoogleOneTap } from '../../components/GoogleOneTap';
import { useGoogleOneTap } from '../../hooks/useGoogleOneTap';
import SignInToSaveModal from '../../components/SignInToSaveModal';
import TopRankedGlance from '../../components/TopRankedGlance/TopRankedGlance';
import { DEALS_GRID_BREAKER_AD_URL } from '../../constants/dealsLayout';
import type { Vehicle } from '../../types/vehicle';
import './RankingsPage.css';

// Body style icons
const BODY_STYLE_ICONS: Record<string, string> = {
  suv: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/suv-1585158794.png?crop=1.00xw:0.502xh;0,0.260xh&resize=180:*',
  hybrid: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/hybridcar-647e4833d60f9.jpg?crop=1.00xw:0.502xh;0,0.247xh&resize=180:*',
  sedan: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/sedans-1585158794.png?crop=1.00xw:0.502xh;0,0.260xh&resize=180:*',
  truck: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/trucks-1585158794.png?crop=1.00xw:0.502xh;0,0.236xh&resize=180:*',
  luxury: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/luxury-1585158794.png?crop=1.00xw:0.502xh;0,0.247xh&resize=180:*',
  ev: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/hybrids-1585158794.png?crop=1.00xw:0.502xh;0,0.247xh&resize=180:*',
  sports: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/sportscar-1585158794.png?crop=1.00xw:0.502xh;0,0.255xh&resize=180:*',
  coupe: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/sportscar-1585158794.png?crop=1.00xw:0.502xh;0,0.255xh&resize=180:*',
  convertible: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/convertibles-1585158793.png?crop=1.00xw:0.502xh;0,0.258xh&resize=180:*',
  wagon: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/wagons-1585158795.png?crop=1.00xw:0.502xh;0,0.244xh&resize=180:*',
  hatchbackProduction: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/hatch-1585158793.png?crop=1.00xw:0.502xh;0,0.247xh&resize=180:*',
  van: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/vans-1585158795.png?crop=1.00xw:0.502xh;0,0.252xh&resize=180:*',
  hatchback: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/crossovers-1585158793.png?crop=1.00xw:0.502xh;0,0.244xh&resize=180:*',
};

const SEDAN_TILE_IMAGE = 'https://tpc.googlesyndication.com/simgad/2269585553418629614?';
const CROSSOVER_TILE_IMAGE = 'https://tpc.googlesyndication.com/simgad/1343272272197513191?';

type RankingSubcategory = {
  id: string;
  name: string;
  navLabel?: string;
  filter: (v: Vehicle) => boolean;
};

const formatSubnavLabel = (sub: RankingSubcategory) => sub.navLabel ?? sub.name.replace('Best ', '');

// Body style configuration with subcategories
const BODY_STYLE_CONFIG: Record<string, {
  title: string;
  description: string;
  subcategories: RankingSubcategory[];
}> = {
  suv: {
    title: 'Best SUVs',
    description: 'If you\'re a new car buyer, chances are an SUV is on your shopping list. And if that\'s the case, you\'re spoiled for choice. Whether you\'re looking for a subcompact or full-size model, or anything in between, SUVs exist at pretty much every price point imaginable and in every shape, size, and powertrain configuration you can think of. Here, we\'ve ranked the best SUVs in every segment based on roughly 200 data points encompassing acceleration, handling, comfort, cargo space, fuel efficiency, value, and how enjoyable they are to drive. Car and Driver\'s rankings are arrived at from the results of our extensive instrumented testing of several hundred vehicles each year and from our expert editors\' subjective impressions gained in real-world driving. We take rankings seriously because we want you to know everything about the vehicles that you\'re interested in.',
    subcategories: [
      { id: 'compact', name: 'Best Compact SUVs', filter: (v) => v.priceMin < 35000 },
      { id: 'midsize', name: 'Best Midsize SUVs', filter: (v) => v.priceMin >= 35000 && v.priceMin < 50000 },
      { id: 'luxury', name: 'Best Luxury SUVs', filter: (v) => v.priceMin >= 50000 },
      { id: 'family', name: 'Best SUVs for Families', filter: () => true }, // All SUVs qualify
      { id: 'offroad', name: 'Best Off-Road SUVs', filter: (v) => ['Jeep', 'Land Rover', 'Toyota', 'Ford'].includes(v.make) },
      { id: 'safety', name: 'Best SUVs by Safety Rating', navLabel: 'By Safety Rating', filter: () => true },
    ],
  },
  sedan: {
    title: 'Best Sedans',
    description: 'From efficient commuters to powerful sports sedans, discover the top-rated sedans tested by our experts.',
    subcategories: [
      { id: 'compact', name: 'Best Compact Sedans', filter: (v) => v.priceMin < 30000 },
      { id: 'midsize', name: 'Best Midsize Sedans', filter: (v) => v.priceMin >= 30000 && v.priceMin < 45000 },
      { id: 'luxury', name: 'Best Luxury Sedans', filter: (v) => v.priceMin >= 45000 },
      { id: 'sport', name: 'Best Sports Sedans', filter: (v) => ['BMW', 'Audi', 'Mercedes-Benz', 'Alfa Romeo'].includes(v.make) },
    ],
  },
  truck: {
    title: 'Best Trucks',
    description: 'Whether you need a workhorse or a lifestyle vehicle, find the best pickup trucks ranked by our experts.',
    subcategories: [
      { id: 'midsize', name: 'Best Midsize Trucks', filter: (v) => v.priceMin < 40000 },
      { id: 'fullsize', name: 'Best Full-Size Trucks', filter: (v) => v.priceMin >= 40000 && v.priceMin < 60000 },
      { id: 'heavy', name: 'Best Heavy-Duty Trucks', filter: (v) => v.priceMin >= 60000 },
      { id: 'electric', name: 'Best Electric Trucks', filter: (v) => ['Rivian', 'Ford', 'Chevrolet', 'GMC'].includes(v.make) && v.priceMin >= 50000 },
    ],
  },
  coupe: {
    title: 'Best Coupes',
    description: 'Sleek, stylish, and sporty. Discover the best coupes for driving enthusiasts.',
    subcategories: [
      { id: 'sports', name: 'Best Sports Coupes', filter: (v) => v.priceMin < 50000 },
      { id: 'luxury', name: 'Best Luxury Coupes', filter: (v) => v.priceMin >= 50000 },
      { id: 'performance', name: 'Best Performance Coupes', filter: (v) => ['Porsche', 'BMW', 'Mercedes-AMG', 'Chevrolet'].includes(v.make) },
    ],
  },
  convertible: {
    title: 'Best Convertibles',
    description: 'Open-air driving at its finest. Find the perfect convertible for sunny days ahead.',
    subcategories: [
      { id: 'affordable', name: 'Best Affordable Convertibles', filter: (v) => v.priceMin < 50000 },
      { id: 'luxury', name: 'Best Luxury Convertibles', filter: (v) => v.priceMin >= 50000 },
    ],
  },
  wagon: {
    title: 'Best Wagons',
    description: 'The practical choice for those who want space without sacrificing driving dynamics.',
    subcategories: [
      { id: 'all', name: 'All Wagons Ranked', filter: () => true },
    ],
  },
  hatchback: {
    title: 'Best Hatchbacks',
    description: 'Versatile, efficient, and fun to drive. Discover the best hatchbacks on the market.',
    subcategories: [
      { id: 'all', name: 'All Hatchbacks Ranked', filter: () => true },
    ],
  },
};

const BODY_STYLE_OFFER_LABELS: Record<string, string> = {
  suv: 'SUV',
  sedan: 'Sedan',
  truck: 'Truck',
  coupe: 'Coupe',
  convertible: 'Convertible',
  wagon: 'Wagon',
  hatchback: 'Hatchback',
};

const BODY_STYLE_NAV_LABELS: Record<string, string> = {
  suv: 'SUVs',
  sedan: 'Sedans',
  truck: 'Pickup Trucks',
  coupe: 'Coupes',
  convertible: 'Convertibles',
  wagon: 'Wagons',
  hatchback: 'Hatchbacks',
};

const BODY_STYLE_BUYING_DEAL_PATHS: Record<string, string> = {
  suv: '/deals/suv',
  truck: '/deals/truck',
};

const RANKINGS_OFFER_COUNTS = {
  buying: 34,
  leasing: 48,
  total: 82,
  buyingExpiringSoon: 8,
  leasingExpiringSoon: 12,
};

const RANKINGS_INCENTIVE_SUBNAV_VARIANT = 'incentive-subnav';
const RANKINGS_CD_CONTROL_VARIANT = 'cd-control';
const RANKINGS_CD_CONTROL_B_VARIANT = 'cd-control-b';
const RANKINGS_METHODOLOGY_URL = 'https://www.caranddriver.com/how-we-test-cars/';

const CD_CONTROL_BODY_STYLE_NAV_ITEMS = [
  { key: 'suv', label: 'SUVs', title: 'SUVs', icon: BODY_STYLE_ICONS.suv, imageClassName: undefined, modelLabel: undefined, path: '/rankings/suv?variant=cd-control' },
  { key: 'hybrid', label: 'Hybrids', title: 'Hybrids', icon: BODY_STYLE_ICONS.hybrid, imageClassName: undefined, modelLabel: undefined, path: '/rankings/suv?variant=cd-control#hybrid' },
  { key: 'crossover', label: 'Crossovers', title: 'Crossovers', icon: BODY_STYLE_ICONS.hatchback, imageClassName: undefined, modelLabel: undefined, path: '/rankings/suv?variant=cd-control' },
  { key: 'truck', label: 'Pickup Trucks', title: 'Pickup Trucks', icon: BODY_STYLE_ICONS.truck, imageClassName: undefined, modelLabel: undefined, path: '/rankings/truck' },
  { key: 'luxury', label: 'Luxury', title: 'Luxury', icon: BODY_STYLE_ICONS.luxury, imageClassName: undefined, modelLabel: undefined, path: '/rankings/suv?variant=cd-control#luxury' },
  { key: 'ev', label: 'EVs', title: 'EVs', icon: BODY_STYLE_ICONS.ev, imageClassName: undefined, modelLabel: undefined, path: '/rankings/suv?variant=cd-control#electric' },
  { key: 'sports', label: 'Sports Cars', title: 'Sports Cars', icon: BODY_STYLE_ICONS.sports, imageClassName: undefined, modelLabel: undefined, path: '/rankings/coupe' },
  { key: 'sedan', label: 'Sedans', title: 'Sedans', icon: BODY_STYLE_ICONS.sedan, imageClassName: undefined, modelLabel: undefined, path: '/rankings/sedan' },
  { key: 'coupe', label: 'Coupes', title: 'Coupes', icon: BODY_STYLE_ICONS.coupe, imageClassName: undefined, modelLabel: undefined, path: '/rankings/coupe' },
  { key: 'wagon', label: 'Wagons', title: 'Wagons', icon: BODY_STYLE_ICONS.wagon, imageClassName: undefined, modelLabel: undefined, path: '/rankings/wagon' },
  { key: 'hatchback', label: 'Hatchbacks', title: 'Hatchbacks', icon: BODY_STYLE_ICONS.hatchbackProduction, imageClassName: undefined, modelLabel: undefined, path: '/rankings/hatchback' },
  { key: 'convertible', label: 'Convertibles', title: 'Convertibles', icon: BODY_STYLE_ICONS.convertible, imageClassName: undefined, modelLabel: undefined, path: '/rankings/convertible' },
  { key: 'small-cars', label: 'Small Cars', title: 'Small Cars', icon: BODY_STYLE_ICONS.sedan, imageClassName: undefined, modelLabel: undefined, path: '/rankings/sedan' },
  { key: 'vans', label: 'Vans', title: 'Vans', icon: BODY_STYLE_ICONS.van, imageClassName: undefined, modelLabel: undefined, path: '/vehicles?bodyStyle=van' },
  { key: 'used-cars', label: 'Used Cars', title: 'Used Cars', icon: BODY_STYLE_ICONS.sedan, imageClassName: undefined, modelLabel: undefined, path: '/vehicles?type=used&sort=price-low' },
];

const CD_CONTROL_SUBNAV_ITEMS = [
  { id: 'compact', label: 'By Size' },
  { id: 'price', label: 'By Price' },
  { id: 'three-row', label: '3-Row' },
  { id: 'fuel-economy', label: 'Fuel Economy' },
  { id: 'hybrid', label: 'Hybrid' },
  { id: 'plug-in-hybrid', label: 'Plug-In Hybrid' },
  { id: 'electric', label: 'Electric' },
  { id: 'luxury', label: 'Luxury' },
  { id: 'safety', label: 'By Safety Rating' },
];

const getCdControlBodyStyleNavItems = (variant: string | null) => {
  if (variant !== RANKINGS_CD_CONTROL_B_VARIANT) {
    return CD_CONTROL_BODY_STYLE_NAV_ITEMS;
  }

  return CD_CONTROL_BODY_STYLE_NAV_ITEMS.map((item) => ({
    ...item,
    path: item.path.replace(
      `variant=${RANKINGS_CD_CONTROL_VARIANT}`,
      `variant=${RANKINGS_CD_CONTROL_B_VARIANT}`,
    ),
  }));
};

// Helper to calculate combined MPG
const getCombinedMpg = (mpg?: string): number | undefined => {
  if (!mpg) return undefined;
  const parts = mpg.split('/');
  if (parts.length !== 2) return undefined;
  const city = parseInt(parts[0], 10);
  const highway = parseInt(parts[1], 10);
  if (isNaN(city) || isNaN(highway)) return undefined;
  return Math.round(0.55 * city + 0.45 * highway);
};

// Helper to generate C/D Says description
const generateCdSays = (year: string, make: string, model: string): string => {
  return `Read our ${year} ${make} ${model} review for information on ratings, pricing, specs, and features.`;
};

const getRankingSubject = (subcategoryName: string): string => {
  const subject = subcategoryName.replace(/^Best\s+/, '');
  return subject.startsWith('SUV') ? subject : `${subject.charAt(0).toLowerCase()}${subject.slice(1)}`;
};

const getSubcategoryRankingDescription = (subcategoryName: string): string => {
  const subject = getRankingSubject(subcategoryName);
  return `Car and Driver's rankings are arrived at from the results of our extensive instrumented testing of several hundred vehicles each year and from our expert editors' subjective impressions gained in real-world driving. We've ranked the best ${subject} based on roughly 200 data points encompassing acceleration, handling, comfort, cargo space, fuel efficiency, value, and how enjoyable they are to drive. We take rankings seriously because we want you to know everything about the vehicles that you're interested in.`;
};

const YEAR_OPTIONS = [2022, 2023, 2024, 2025, 2026];

const YearSelector: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState(2026);
  const [open, setOpen] = useState(false);
  const [animDone, setAnimDone] = useState(false);
  const [dropdownPos, setDropdownPos] = useState<{ top: number; left: number } | null>(null);
  const tickerRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (tickerRef.current && wrapRef.current) {
      const firstChild = tickerRef.current.querySelector('.rankings-page__hero-stat-value') as HTMLElement;
      if (firstChild) {
        const h = firstChild.offsetHeight;
        tickerRef.current.style.setProperty('--year-h', `${h}px`);
        wrapRef.current.style.setProperty('--year-h', `${h}px`);
      }
    }
  }, []);

  useEffect(() => {
    if (animDone) return;
    const timer = setTimeout(() => setAnimDone(true), 2000);
    return () => clearTimeout(timer);
  }, [animDone]);

  return (
    <div className="rankings-page__hero-stat rankings-page__year-selector">
      <div className="rankings-page__year-value-wrap" ref={wrapRef}>
        {!animDone ? (
          <div className="rankings-page__year-ticker" ref={tickerRef}>
            <div className="rankings-page__year-ticker-track">
              {YEAR_OPTIONS.map(y => (
                <span key={y} className="rankings-page__hero-stat-value">{y}</span>
              ))}
            </div>
          </div>
        ) : (
          <button
            ref={btnRef}
            type="button"
            className="rankings-page__year-btn"
            onClick={() => {
              if (!open && btnRef.current) {
                const rect = btnRef.current.getBoundingClientRect();
                setDropdownPos({ top: rect.bottom + 8, left: rect.left });
              }
              setOpen(prev => !prev);
            }}
            aria-expanded={open}
            aria-haspopup="listbox"
          >
            <span className="rankings-page__hero-stat-value">{selectedYear}</span>
            <ChevronDown size={18} className={`rankings-page__year-chevron ${open ? 'rankings-page__year-chevron--open' : ''}`} />
          </button>
        )}

        {open && dropdownPos && createPortal(
          <ul className="rankings-page__year-dropdown" role="listbox" style={{ top: dropdownPos.top, left: dropdownPos.left }}>
            {YEAR_OPTIONS.map(y => (
              <li
                key={y}
                role="option"
                aria-selected={y === selectedYear}
                className={`rankings-page__year-option ${y === selectedYear ? 'rankings-page__year-option--active' : ''}`}
                onClick={() => { setSelectedYear(y); setOpen(false); }}
              >
                {y}
              </li>
            ))}
          </ul>,
          document.body
        )}
      </div>
      <span className="rankings-page__hero-stat-label">Model Year</span>
    </div>
  );
};

type HeroYearSwitcherProps = {
  years: number[];
  selectedYear: number;
  onYearChange: (year: number) => void;
  controlLabel?: string;
};

const HeroYearSwitcher: React.FC<HeroYearSwitcherProps> = ({ years, selectedYear, onYearChange, controlLabel }) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const closeOnOutsideClick = (event: MouseEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', closeOnOutsideClick);
    document.addEventListener('keydown', closeOnEscape);

    return () => {
      document.removeEventListener('mousedown', closeOnOutsideClick);
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, [open]);

  return (
    <div className="rankings-page__hero-year-menu" ref={menuRef}>
      <button
        type="button"
        className="rankings-page__hero-year-button"
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label={`Select different ranking year. Current year ${selectedYear}`}
        onClick={() => setOpen((isOpen) => !isOpen)}
      >
        <span>{controlLabel ?? selectedYear}</span>
        <ChevronDown
          size={18}
          aria-hidden="true"
          className={`rankings-page__hero-year-chevron${open ? ' rankings-page__hero-year-chevron--open' : ''}`}
        />
      </button>
      {open && (
        <ul className="rankings-page__hero-year-dropdown" role="menu">
          {years.map((year) => (
            <li key={year} role="none">
              <button
                type="button"
                role="menuitemradio"
                aria-checked={year === selectedYear}
                className={`rankings-page__hero-year-option${year === selectedYear ? ' rankings-page__hero-year-option--active' : ''}`}
                onClick={() => {
                  onYearChange(year);
                  setOpen(false);
                }}
              >
                {year}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const RankingsPage = () => {
  const { bodyStyle, subcategory } = useParams<{ bodyStyle: string; subcategory?: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { getRating: getSupabaseRating } = useSupabaseRatings();
  const { user, isAuthenticated: isAuthContextAuthenticated, addSavedVehicle, removeSavedVehicle } = useAuth();

  // Google One Tap integration for high-intent rankings page
  const { shouldShowOneTap, isAuthenticated: isOneTapAuthenticated } = useGoogleOneTap({
    pageType: 'rankings',
  });

  // Combined authentication state
  const isAuthenticated = isAuthContextAuthenticated || isOneTapAuthenticated;

  // State for sign-in modal
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [pendingSaveVehicle, setPendingSaveVehicle] = useState<{ name: string; slug: string; image?: string } | null>(null);
  const [selectedRankingYear, setSelectedRankingYear] = useState(2026);
  const [isHeroDescriptionExpanded, setIsHeroDescriptionExpanded] = useState(false);

  // Get config for current body style
  const config = bodyStyle ? BODY_STYLE_CONFIG[bodyStyle.toLowerCase()] : null;
  const bodyStyleKey = bodyStyle?.toLowerCase() ?? '';
  const offerBodyStyleLabel = BODY_STYLE_OFFER_LABELS[bodyStyleKey] ?? 'Vehicle';
  const buyingOffersPath = BODY_STYLE_BUYING_DEAL_PATHS[bodyStyleKey] ?? '/deals/best-buying-deals';
  const leasingOffersPath = bodyStyleKey ? `/deals/lease/${bodyStyleKey}` : '/deals/lease';
  const rankingsVariant = useMemo(() => {
    return new URLSearchParams(location.search).get('variant');
  }, [location.search]);
  const showIncentiveSubnavVariant = bodyStyleKey === 'suv' && rankingsVariant === RANKINGS_INCENTIVE_SUBNAV_VARIANT;
  const showCdControlBVariant = bodyStyleKey === 'suv' && rankingsVariant === RANKINGS_CD_CONTROL_B_VARIANT;
  const showCdControlVariant = bodyStyleKey === 'suv' && (
    rankingsVariant === RANKINGS_CD_CONTROL_VARIANT ||
    rankingsVariant === RANKINGS_CD_CONTROL_B_VARIANT
  );
  const subcategoryConfig = subcategory && config
    ? config.subcategories.find(s => s.id === subcategory)
    : null;
  const heroDescription = subcategoryConfig
    ? getSubcategoryRankingDescription(subcategoryConfig.name)
    : config?.description ?? '';
  const getSubcategoryPath = useCallback((subId: string) => {
    const basePath = `/rankings/${bodyStyleKey}/${subId}`;
    return location.search ? `${basePath}${location.search}` : basePath;
  }, [bodyStyleKey, location.search]);
  const showHeroIncentiveRow = Boolean(config && bodyStyleKey && !showIncentiveSubnavVariant && (!showCdControlVariant || showCdControlBVariant));
  const showRankingMethodologyLink = Boolean(subcategoryConfig && showCdControlBVariant);
  const isHeroDescriptionExpandable = Boolean(config && !showCdControlVariant && heroDescription.length > 180);
  const bodyStyleNavRef = useRef<HTMLDivElement>(null);
  const bodyStyleNavItems = useMemo(() => {
    if (showCdControlVariant) {
      return getCdControlBodyStyleNavItems(rankingsVariant);
    }

    const rankingItems = Object.entries(BODY_STYLE_CONFIG).map(([key, value]) => ({
      key,
      label: BODY_STYLE_NAV_LABELS[key] ?? value.title.replace(/^Best\s+/, ''),
      title: value.title,
      icon: key === 'sedan' ? SEDAN_TILE_IMAGE : BODY_STYLE_ICONS[key],
      imageClassName: key === 'sedan' ? 'rankings-page__body-style-subnav-icon--flip-x' : undefined,
      modelLabel: key === 'sedan' ? 'Accord Hybrid' : undefined,
      path: `/rankings/${key}`,
    }));
    const sedanIndex = rankingItems.findIndex((item) => item.key === 'sedan');
    const crossoverItem = {
      key: 'crossover',
      label: 'Crossovers',
      title: 'Crossovers',
      icon: CROSSOVER_TILE_IMAGE,
      imageClassName: 'rankings-page__body-style-subnav-icon--flip-x',
      modelLabel: 'Nissan Rogue',
      path: '/rankings/suv',
    };
    const navItemsWithCrossovers = sedanIndex >= 0
      ? [
          ...rankingItems.slice(0, sedanIndex + 1),
          crossoverItem,
          ...rankingItems.slice(sedanIndex + 1),
        ]
      : [...rankingItems, crossoverItem];

    return [
      ...navItemsWithCrossovers,
      {
        key: 'used-cars',
        label: 'Used Cars',
        title: 'Used Cars',
        icon: BODY_STYLE_ICONS.sedan,
        imageClassName: undefined,
        modelLabel: undefined,
        path: '/vehicles?type=used&sort=price-low',
      },
    ];
  }, [rankingsVariant, showCdControlVariant]);

  useEffect(() => {
    setIsHeroDescriptionExpanded(false);
  }, [bodyStyleKey, rankingsVariant]);

  const scrollBodyStyleNav = useCallback((direction: 'left' | 'right') => {
    bodyStyleNavRef.current?.scrollBy({
      left: direction === 'left' ? -360 : 360,
      behavior: 'smooth',
    });
  }, []);

  const availableRankingYears = useMemo(() => {
    if (!bodyStyle) {
      return [...YEAR_OPTIONS].sort((a, b) => b - a);
    }

    const years = new Set<number>();

    getAllVehicles()
      .filter((vehicle) => vehicle.bodyStyle.toLowerCase() === bodyStyle.toLowerCase())
      .forEach((vehicle) => {
        const year = parseInt(vehicle.year, 10);
        if (!Number.isNaN(year)) {
          years.add(year);
        }
      });

    return [...years].sort((a, b) => b - a);
  }, [bodyStyle]);

  const effectiveSelectedRankingYear = availableRankingYears.includes(selectedRankingYear)
    ? selectedRankingYear
    : availableRankingYears[0] ?? selectedRankingYear;

  // Check if a vehicle is saved
  const isVehicleSaved = (vehicleName: string) => {
    return user?.savedVehicles?.some(v => v.name === vehicleName) || false;
  };

  // Handle save click for hero cards
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
      const savedVehicle = user?.savedVehicles?.find(v => v.name === vehicle.name);
      if (savedVehicle) {
        removeSavedVehicle(savedVehicle.id);
      }
    } else {
      addSavedVehicle({
        id: vehicle.slug,
        name: vehicle.name,
        ownership: 'want',
      });
    }
  };

  // Get vehicle rating helper
  const getVehicleRating = useCallback((vehicle: { id: string; bodyStyle: string; staffRating: number }): number => {
    return getSupabaseRating(vehicle.id, getCategory(vehicle.bodyStyle), vehicle.staffRating);
  }, [getSupabaseRating]);

  // Get all vehicles for this body style
  const allVehicles = useMemo(() => {
    if (!bodyStyle) return [];

    const vehicles = getAllVehicles()
      .filter(v => v.bodyStyle.toLowerCase() === bodyStyle.toLowerCase())
      .filter(v => parseInt(v.year) === effectiveSelectedRankingYear);

    // Sort by rating
    return vehicles.sort((a, b) => getVehicleRating(b) - getVehicleRating(a));
  }, [bodyStyle, effectiveSelectedRankingYear, getVehicleRating]);

  const displayVehicles = useMemo(() => {
    if (subcategoryConfig) {
      return allVehicles.filter(subcategoryConfig.filter);
    }
    return allVehicles;
  }, [allVehicles, subcategoryConfig]);

  // Format vehicles for display
  const formattedVehicles = useMemo(() => {
    return displayVehicles.slice(0, 20).map((vehicle, index) => ({
      id: vehicle.id,
      rank: index + 1,
      name: `${vehicle.make} ${vehicle.model}`,
      make: vehicle.make,
      year: vehicle.year,
      price: `$${vehicle.priceMin.toLocaleString()}`,
      image: vehicle.image,
      rating: getVehicleRating(vehicle),
      slug: vehicle.slug,
      editorsChoice: vehicle.editorsChoice,
      tenBest: vehicle.tenBest,
      epaMpg: getCombinedMpg(vehicle.mpg),
      cdSays: generateCdSays(vehicle.year, vehicle.make, vehicle.model),
      modelName: vehicle.model,
      priceRange: vehicle.priceRange,
    }));
  }, [displayVehicles, getVehicleRating]);

  const renderHeroRankingCard = (vehicle: typeof formattedVehicles[number]) => {
    const vehicleName = `${vehicle.year} ${vehicle.name}`;
    const isFirstRank = vehicle.rank === 1;

    return (
      <article key={vehicle.id} className="rankings-page__hero-card rankings-page__hero-card--list-item">
        <Link to={`/${vehicle.slug}`} className="rankings-page__hero-card-content">
          <div className="rankings-page__hero-card-header">
            <h2 className="rankings-page__hero-card-title">
              {vehicleName}
            </h2>
            <div className="rankings-page__hero-card-rating">
              <div className="rankings-page__hero-card-rating-score">
                <span className="rankings-page__hero-card-rating-value">{vehicle.rating}</span>
                <span className="rankings-page__hero-card-rating-max">/10</span>
              </div>
              <span className="rankings-page__hero-card-rating-label">C/D RATING</span>
            </div>
          </div>
          <div className="rankings-page__hero-card-image-container">
            <div className="rankings-page__hero-card-rank-container">
              <div className={`rankings-page__hero-card-rank ${isFirstRank ? 'rankings-page__hero-card-rank--first' : ''}`}>
                {vehicle.rank}
              </div>
            </div>
            <button
              className={`rankings-page__hero-card-save ${isVehicleSaved(vehicleName) ? 'rankings-page__hero-card-save--saved' : ''}`}
              onClick={(e) => handleSaveClick(e, { name: vehicleName, slug: vehicle.slug, image: vehicle.image })}
              aria-label={isVehicleSaved(vehicleName) ? 'Remove from saved' : 'Save vehicle'}
            >
              <Bookmark size={18} fill={isVehicleSaved(vehicleName) ? 'currentColor' : 'none'} />
            </button>
            <img
              src={vehicle.image}
              alt={vehicle.name}
              className="rankings-page__hero-card-image"
            />
          </div>
          <div className="rankings-page__hero-card-details">
            <div className="rankings-page__hero-card-price-row">
              <div className="rankings-page__hero-card-price">
                <span className="rankings-page__hero-card-price-label">Starting at</span>
                <span className="rankings-page__hero-card-price-value">{vehicle.price}</span>
              </div>
              <div className="rankings-page__hero-card-mpg">
                <span className="rankings-page__hero-card-mpg-label">EPA MPG</span>
                <span className="rankings-page__hero-card-mpg-value">
                  {vehicle.epaMpg ? (
                    <>
                      <strong>{vehicle.epaMpg}</strong>
                      <span className="rankings-page__hero-card-mpg-unit">combined</span>
                    </>
                  ) : 'N/A'}
                </span>
              </div>
              {(vehicle.tenBest || vehicle.editorsChoice) && (
                <>
                  <div className="rankings-page__hero-card-divider"></div>
                  <div className="rankings-page__hero-card-badges">
                    {vehicle.tenBest && (
                      <div className="rankings-page__hero-card-badge-item">
                        <img
                          src="https://www.caranddriver.com/_assets/design-tokens/caranddriver/static/images/badges-no-text/ten-best.bcb6ac1.svg"
                          alt="10Best"
                          className="rankings-page__hero-card-badge"
                        />
                        <span className="rankings-page__hero-card-badge-label">10Best</span>
                      </div>
                    )}
                    {vehicle.editorsChoice && (
                      <div className="rankings-page__hero-card-badge-item">
                        <img
                          src="https://www.caranddriver.com/_assets/design-tokens/caranddriver/static/images/badges-no-text/editors-choice.7ecd596.svg?primary=%2523FEFEFE"
                          alt="Editor's Choice"
                          className="rankings-page__hero-card-badge"
                        />
                        <span className="rankings-page__hero-card-badge-label">Editor's Choice</span>
                      </div>
                    )}
                  </div>
                </>
              )}
              <button className="rankings-page__hero-card-cta">
                {parseInt(vehicle.year) >= 2026 ? 'SHOP NEW' : 'SHOP USED'} {vehicle.modelName.toUpperCase()}
              </button>
            </div>
            <div className="rankings-page__hero-card-cdsays">
              <span className="rankings-page__hero-card-cdsays-label">C/D SAYS:</span>
              <span className="rankings-page__hero-card-cdsays-text">
                {vehicle.cdSays} <span className="rankings-page__hero-card-cdsays-link">Learn More</span>
              </span>
            </div>
          </div>
        </Link>
      </article>
    );
  };

  // Get top vehicle and count for each body style category (for landing page)
  const categoryData = useMemo(() => {
    const result: Record<string, {
      topVehicle: { name: string; year: string; image: string } | null;
      count: number;
    }> = {};

    Object.keys(BODY_STYLE_CONFIG).forEach((key) => {
      const vehicles = getAllVehicles()
        .filter(v => v.bodyStyle.toLowerCase() === key.toLowerCase())
        .filter(v => parseInt(v.year) >= 2026)
        .sort((a, b) => getVehicleRating(b) - getVehicleRating(a));

      result[key] = {
        topVehicle: vehicles.length > 0 ? {
          name: `${vehicles[0].make} ${vehicles[0].model}`,
          year: vehicles[0].year,
          image: vehicles[0].image,
        } : null,
        count: vehicles.length,
      };
    });

    return result;
  }, [getVehicleRating]);

  // Calculate total vehicles ranked
  const totalVehiclesRanked = useMemo(() => {
    return Object.values(categoryData).reduce((sum, cat) => sum + cat.count, 0);
  }, [categoryData]);

  // Get top 3 vehicles for each subcategory (for main body style page)
  // Must be before early return to maintain hook order
  const subcategoryVehicles = useMemo(() => {
    if (!config || subcategory) return null; // Don't compute if no config or on a subcategory page

    return config.subcategories.map((sub) => {
      const controlCompactOrder = ['Honda CR-V', 'Mazda CX-5', 'Chevrolet Trax'];
      const filteredVehicles = allVehicles.filter(sub.filter);
      const orderedVehicles = showCdControlVariant && sub.id === 'compact'
        ? [...filteredVehicles].sort((a, b) => {
            const aIndex = controlCompactOrder.indexOf(`${a.make} ${a.model}`);
            const bIndex = controlCompactOrder.indexOf(`${b.make} ${b.model}`);
            if (aIndex !== -1 || bIndex !== -1) {
              return (aIndex === -1 ? Number.MAX_SAFE_INTEGER : aIndex) - (bIndex === -1 ? Number.MAX_SAFE_INTEGER : bIndex);
            }
            return getVehicleRating(b) - getVehicleRating(a);
          })
        : filteredVehicles;
      const filtered = orderedVehicles
        .slice(0, 3)
        .map((vehicle, index) => ({
          id: vehicle.id,
          rank: index + 1,
          name: `${vehicle.make} ${vehicle.model}`,
          make: vehicle.make,
          year: vehicle.year,
          price: `$${vehicle.priceMin.toLocaleString()}`,
          image: vehicle.image,
          rating: getVehicleRating(vehicle),
          slug: vehicle.slug,
          editorsChoice: vehicle.editorsChoice,
          tenBest: vehicle.tenBest,
          epaMpg: getCombinedMpg(vehicle.mpg),
          cdSays: generateCdSays(vehicle.year, vehicle.make, vehicle.model),
          modelName: vehicle.model,
        }));

      return {
        ...sub,
        vehicles: filtered,
        totalCount: allVehicles.filter(sub.filter).length,
      };
    }).filter(sub => sub.vehicles.length > 0);
  }, [allVehicles, config, subcategory, getVehicleRating, showCdControlVariant]);

  // Top 3 vehicles per body style for the landing page rows
  const topByBodyStyle = useMemo(() => {
    return Object.entries(BODY_STYLE_CONFIG).map(([key, cfg]) => {
      const vehicles = getAllVehicles()
        .filter(v => v.bodyStyle.toLowerCase() === key)
        .filter(v => parseInt(v.year) >= 2026)
        .sort((a, b) => getVehicleRating(b) - getVehicleRating(a))
        .slice(0, 3)
        .map((v, i) => ({
          id: v.id,
          rank: i + 1,
          name: `${v.make} ${v.model}`,
          make: v.make,
          year: v.year,
          price: `$${v.priceMin.toLocaleString()}`,
          image: v.image,
          rating: getVehicleRating(v),
          slug: v.slug,
          editorsChoice: v.editorsChoice,
          tenBest: v.tenBest,
          epaMpg: getCombinedMpg(v.mpg),
          cdSays: generateCdSays(v.year, v.make, v.model),
          modelName: v.model,
        }));

      return {
        key,
        title: cfg.title,
        description: cfg.description,
        icon: BODY_STYLE_ICONS[key],
        count: getAllVehicles().filter(v => v.bodyStyle.toLowerCase() === key).length,
        vehicles,
      };
    }).filter(row => row.vehicles.length > 0);
  }, [getVehicleRating]);

  const subnavPillsRef = useRef<HTMLDivElement>(null);
  const [showSubnavScrollArrow, setShowSubnavScrollArrow] = useState(false);
  const [activeSubcategoryId, setActiveSubcategoryId] = useState<string | null>(null);

  const updateSubnavScrollArrow = useCallback(() => {
    const subnavPills = subnavPillsRef.current;

    if (!showIncentiveSubnavVariant || !subnavPills) {
      setShowSubnavScrollArrow(false);
      return;
    }

    const remainingScroll = subnavPills.scrollWidth - subnavPills.clientWidth - subnavPills.scrollLeft;
    setShowSubnavScrollArrow(remainingScroll > 1);
  }, [showIncentiveSubnavVariant]);

  useEffect(() => {
    if (!showIncentiveSubnavVariant) {
      const animationFrameId = window.requestAnimationFrame(updateSubnavScrollArrow);
      return () => window.cancelAnimationFrame(animationFrameId);
    }

    const subnavPills = subnavPillsRef.current;
    if (!subnavPills) {
      const animationFrameId = window.requestAnimationFrame(updateSubnavScrollArrow);
      return () => window.cancelAnimationFrame(animationFrameId);
    }

    subnavPills.addEventListener('scroll', updateSubnavScrollArrow, { passive: true });
    window.addEventListener('resize', updateSubnavScrollArrow);

    const resizeObserver = new ResizeObserver(updateSubnavScrollArrow);
    resizeObserver.observe(subnavPills);

    const animationFrameId = window.requestAnimationFrame(updateSubnavScrollArrow);

    return () => {
      subnavPills.removeEventListener('scroll', updateSubnavScrollArrow);
      window.removeEventListener('resize', updateSubnavScrollArrow);
      resizeObserver.disconnect();
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [showIncentiveSubnavVariant, subcategoryVehicles, updateSubnavScrollArrow]);

  useEffect(() => {
    if (!subcategoryVehicles?.length || subcategory) {
      return;
    }

    const sections = subcategoryVehicles
      .map((sub) => document.getElementById(sub.id))
      .filter((section): section is HTMLElement => Boolean(section));

    if (sections.length === 0) return;

    let animationFrameId = 0;
    const activationOffset = 160;

    const updateActiveSubcategory = () => {
      animationFrameId = 0;

      const nextActiveId = sections.reduce((currentId, section) => {
        return section.getBoundingClientRect().top <= activationOffset ? section.id : currentId;
      }, sections[0].id);

      setActiveSubcategoryId(nextActiveId);
    };

    const requestActiveSubcategoryUpdate = () => {
      if (animationFrameId) return;
      animationFrameId = window.requestAnimationFrame(updateActiveSubcategory);
    };

    requestActiveSubcategoryUpdate();
    window.addEventListener('scroll', requestActiveSubcategoryUpdate, { passive: true });
    window.addEventListener('resize', requestActiveSubcategoryUpdate);

    return () => {
      window.removeEventListener('scroll', requestActiveSubcategoryUpdate);
      window.removeEventListener('resize', requestActiveSubcategoryUpdate);
      if (animationFrameId) window.cancelAnimationFrame(animationFrameId);
    };
  }, [subcategory, subcategoryVehicles]);

  useEffect(() => {
    if (!activeSubcategoryId || !subnavPillsRef.current) return;

    const activePill = subnavPillsRef.current.querySelector<HTMLAnchorElement>(
      `.rankings-page__subnav-pill[href="#${activeSubcategoryId}"]`,
    );
    activePill?.scrollIntoView({ block: 'nearest', inline: 'center' });
  }, [activeSubcategoryId]);

  // If no config found, show landing page with body-style rows
  if (!config) {
    return (
      <div className="rankings-page">
        <SEO title="Rankings | Car and Driver" />

        {shouldShowOneTap && (
          <GoogleOneTap
            pageType="rankings"
            isAuthenticated={isAuthenticated}
          />
        )}
        <div className="rankings-page__hero rankings-page__hero--landing">
          <div className="container">
            <div className="rankings-page__hero-content">
              <div className="rankings-page__hero-badge">
                <img
                  src="https://www.caranddriver.com/_assets/design-tokens/caranddriver/static/images/badges-no-text/ten-best.bcb6ac1.svg"
                  alt="10Best"
                  className="rankings-page__hero-icon"
                />
                <span className="hero-pill__label">Expert Rankings</span>
              </div>
              <h1 className="rankings-page__title">Find Your Perfect Car</h1>
              <p className="rankings-page__description">
                Every vehicle tested, rated, and ranked by our expert editors.
                From fuel-efficient commuters to powerful sports cars, discover the best in every category.
              </p>
              <div className="rankings-page__hero-stats">
                <div className="rankings-page__hero-stat">
                  <span className="rankings-page__hero-stat-value">{totalVehiclesRanked}</span>
                  <span className="rankings-page__hero-stat-label">Vehicles Ranked</span>
                </div>
                <div className="rankings-page__hero-stat">
                  <span className="rankings-page__hero-stat-value">{Object.keys(BODY_STYLE_CONFIG).length}</span>
                  <span className="rankings-page__hero-stat-label">Categories</span>
                </div>
                <YearSelector />
              </div>
            </div>
          </div>
        </div>

        {/* Sticky anchor navigation for body-style sections */}
        <div className="rankings-page__subnav rankings-page__subnav--sticky">
          <div className="container">
            <div className="rankings-page__subnav-pills">
              {topByBodyStyle.map((row) => (
                <a
                  key={row.key}
                  href={`#${row.key}`}
                  className="rankings-page__subnav-pill"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById(row.key)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                >
                  {row.icon && (
                    <img src={row.icon} alt="" className="rankings-page__subnav-pill-icon" />
                  )}
                  {row.title}
                </a>
              ))}
            </div>
            <button
              className="rankings-page__subnav-scroll-btn"
              onClick={(e) => {
                const container = e.currentTarget.parentElement;
                const pills = container?.querySelector('.rankings-page__subnav-pills');
                if (pills) {
                  pills.scrollBy({ left: 200, behavior: 'smooth' });
                }
              }}
              aria-label="Scroll right"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Body-style rows with top 3 vehicles each */}
        <div className="rankings-page__body-rows">
          <div className="container">
            {topByBodyStyle.map((row) => (
              <section key={row.key} id={row.key} className="rankings-page__body-row">
                <div className="rankings-page__body-row-left">
                  {row.icon && (
                    <img src={row.icon} alt="" className="rankings-page__body-row-icon" />
                  )}
                  <h2 className="rankings-page__body-row-title">{row.title}</h2>
                  <span className="rankings-page__body-row-count">{row.count} vehicles ranked</span>
                  <Link to={`/rankings/${row.key}`} className="rankings-page__body-row-cta">
                    View All <ChevronRight size={14} />
                  </Link>
                </div>
                <div className="rankings-page__body-row-cards">
                  {row.vehicles.map((vehicle) => {
                    const offers = getVehicleOffers(vehicle.make, vehicle.modelName);
                    return (
                    <VehicleCard
                      key={vehicle.id}
                      id={vehicle.id}
                      name={vehicle.name}
                      slug={vehicle.slug}
                      image={vehicle.image}
                      price={vehicle.price}
                      rating={vehicle.rating}
                      rank={vehicle.rank}
                      editorsChoice={vehicle.editorsChoice}
                      tenBest={vehicle.tenBest}
                      showShopButton={true}
                      showSaveButton={true}
                      shopButtonText={`${parseInt(vehicle.year) >= 2026 ? 'SHOP NEW' : 'SHOP USED'} ${vehicle.modelName.toUpperCase()}`}
                      shopButtonVariant="primary"
                      epaMpg={vehicle.epaMpg}
                      cdSays={vehicle.cdSays}
                      modelName={vehicle.modelName}
                      incentiveCount={offers.length}
                      onIncentiveClick={() => navigate(`/${vehicle.make.toLowerCase()}/${vehicle.modelName.toLowerCase().replace(/\s+/g, '-')}/deals-incentives`)}
                    />);
                  })}
                </div>
              </section>
            ))}
          </div>
        </div>

        {/* Sign In to Save Modal */}
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
  }

  const pageTitle = subcategoryConfig ? subcategoryConfig.name : config.title;
  const fullListAnchor = `${location.pathname}${location.search}#rankings-full-list`;
  const subcategoryGlanceTitle = subcategoryConfig
    ? `Top Ranked ${subcategoryConfig.name.replace(/^Best\s+/, '')} at a Glance`
    : '';
  const topRankedGlanceItems = formattedVehicles.slice(0, 3).map((vehicle) => ({
    id: vehicle.id,
    rank: vehicle.rank,
    name: vehicle.name,
    make: vehicle.make,
    modelName: vehicle.modelName,
    year: vehicle.year,
    image: vehicle.image,
    rating: vehicle.rating,
    priceRange: vehicle.priceRange,
    slug: vehicle.slug,
    shopLabel: 'Shop Now',
  }));
  const bodyStyleSubnav = (
    <nav className="rankings-page__body-style-subnav" aria-label="Body style rankings">
      <div className="container rankings-page__body-style-subnav-inner">
        <button
          type="button"
          className="rankings-page__body-style-subnav-btn rankings-page__body-style-subnav-btn--prev"
          onClick={() => scrollBodyStyleNav('left')}
          aria-label="Scroll body styles left"
        >
          <ChevronLeft size={24} />
        </button>
        <div className="rankings-page__body-style-subnav-track" ref={bodyStyleNavRef}>
          {bodyStyleNavItems.map((item) => (
            <Link
              key={item.key}
              to={item.path}
              className={`rankings-page__body-style-subnav-card${item.modelLabel ? ' rankings-page__body-style-subnav-card--has-model' : ''}${item.key === bodyStyleKey ? ' rankings-page__body-style-subnav-card--active' : ''}`}
              aria-current={item.key === bodyStyleKey ? 'page' : undefined}
            >
              <span
                className={`rankings-page__body-style-subnav-model${item.modelLabel ? '' : ' rankings-page__body-style-subnav-model--empty'}`}
                aria-hidden={item.modelLabel ? undefined : true}
              >
                {item.modelLabel || '\u00A0'}
              </span>
              {item.icon && (
                <img
                  src={item.icon}
                  alt=""
                  className={`rankings-page__body-style-subnav-icon${item.imageClassName ? ` ${item.imageClassName}` : ''}`}
                />
              )}
              <span className="rankings-page__body-style-subnav-label">{item.label}</span>
            </Link>
          ))}
        </div>
        <button
          type="button"
          className="rankings-page__body-style-subnav-btn rankings-page__body-style-subnav-btn--next"
          onClick={() => scrollBodyStyleNav('right')}
          aria-label="Scroll body styles right"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </nav>
  );

  return (
    <div className={`rankings-page${showCdControlVariant ? ' rankings-page--cd-control' : ''}${showCdControlBVariant ? ' rankings-page--cd-control-b' : ''}`}>
      <SEO
        title={`${pageTitle} | Car and Driver Rankings`}
        description={heroDescription}
      />

      {/* Google One Tap for non-authenticated users */}
      {shouldShowOneTap && (
        <GoogleOneTap
          pageType="rankings"
          isAuthenticated={isAuthenticated}
        />
      )}

      {showCdControlVariant && !subcategory && bodyStyleSubnav}

      {/* Hero Section */}
      <div className="rankings-page__hero">
        <div className="container">
          <div className="rankings-page__hero-content">
            <div className="rankings-page__hero-badge">
              <img
                src="https://www.caranddriver.com/_assets/design-tokens/caranddriver/static/images/badges-no-text/ten-best.bcb6ac1.svg"
                alt="10Best"
                className="rankings-page__hero-icon"
              />
              <span className="hero-pill__label">Expert Rankings</span>
            </div>
            <div className="rankings-page__hero-title-row">
              <h1 className="rankings-page__title">{pageTitle}</h1>
              {availableRankingYears.length > 1 && (
                <HeroYearSwitcher
                  years={availableRankingYears}
                  selectedYear={effectiveSelectedRankingYear}
                  onYearChange={setSelectedRankingYear}
                  controlLabel={showCdControlVariant ? 'Select a different year' : undefined}
                />
              )}
            </div>
            <div className="rankings-page__description-wrap">
              <p
                className={`rankings-page__description${isHeroDescriptionExpandable && !isHeroDescriptionExpanded ? ' rankings-page__description--clamped' : ''}`}
                id="rankings-hero-description"
              >
                {heroDescription}
              </p>
              {isHeroDescriptionExpandable && (
                <button
                  type="button"
                  className="rankings-page__description-toggle"
                  onClick={() => setIsHeroDescriptionExpanded((expanded) => !expanded)}
                  aria-expanded={isHeroDescriptionExpanded}
                  aria-controls="rankings-hero-description"
                >
                  <span>{isHeroDescriptionExpanded ? 'Read less' : 'Read more'}</span>
                  {!isHeroDescriptionExpanded && <ChevronDown size={14} strokeWidth={2.5} aria-hidden="true" />}
                </button>
              )}
              {showRankingMethodologyLink && (
                <div className="rankings-page__methodology-link-wrap">
                  <a
                    href={RANKINGS_METHODOLOGY_URL}
                    className="rankings-page__methodology-link"
                  >
                    Read about how we test and evaluate vehicles here.
                  </a>
                </div>
              )}
            </div>
            {showHeroIncentiveRow && (
              <div className="rankings-page__hero-offers" aria-label={`${offerBodyStyleLabel} deals and incentives`}>
                <Link to={buyingOffersPath} className="rankings-page__hero-offer-link">
                  <span className="rankings-page__hero-offer-main">
                    <span className="rankings-page__hero-offer-chip">BUY</span>
                    <span className="rankings-page__hero-offer-copy">
                      <span className="rankings-page__hero-offer-label">See All {offerBodyStyleLabel} Buying Deals</span>
                      <ChevronRight className="rankings-page__hero-offer-caret" size={14} strokeWidth={3} aria-hidden="true" />
                    </span>
                  </span>
                </Link>
                <span className="rankings-page__hero-offers-divider" aria-hidden="true"></span>
                <Link to={leasingOffersPath} className="rankings-page__hero-offer-link">
                  <span className="rankings-page__hero-offer-main">
                    <span className="rankings-page__hero-offer-chip">LEASE</span>
                    <span className="rankings-page__hero-offer-copy">
                      <span className="rankings-page__hero-offer-label">See All {offerBodyStyleLabel} Leasing Deals</span>
                      <ChevronRight className="rankings-page__hero-offer-caret" size={14} strokeWidth={3} aria-hidden="true" />
                    </span>
                  </span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {!showCdControlVariant && !subcategory && bodyStyleSubnav}

      {/* Subcategory Anchor Navigation - only show on main body style page */}
      {!subcategory && config && (
        <div className={`rankings-page__subnav rankings-page__subnav--sticky${showIncentiveSubnavVariant ? ' rankings-page__subnav--has-actions' : ''}${showIncentiveSubnavVariant && showSubnavScrollArrow ? ' rankings-page__subnav--can-scroll' : ''}`}>
          <div className="container">
            <div className="rankings-page__subnav-pills" ref={subnavPillsRef}>
              {(showCdControlVariant ? CD_CONTROL_SUBNAV_ITEMS : (subcategoryVehicles ?? []).map((sub) => ({
                id: sub.id,
                label: formatSubnavLabel(sub),
              }))).map((sub, index) => {
                const isActive = activeSubcategoryId ? activeSubcategoryId === sub.id : index === 0;
                return (
                  <a
                    key={sub.id}
                    href={`#${sub.id}`}
                    className={isActive ? 'rankings-page__subnav-pill rankings-page__subnav-pill--active' : 'rankings-page__subnav-pill'}
                    aria-current={isActive ? 'true' : undefined}
                    onClick={() => setActiveSubcategoryId(sub.id)}
                  >
                    {sub.label}
                  </a>
                );
              })}
            </div>
            {showIncentiveSubnavVariant && showSubnavScrollArrow && (
              <button
                className="rankings-page__subnav-scroll-btn rankings-page__subnav-scroll-btn--actions"
                onClick={(e) => {
                  e.currentTarget.blur();
                  subnavPillsRef.current?.scrollBy({ left: 200, behavior: 'smooth' });
                }}
                aria-label="Scroll categories right"
              >
                <ChevronRight size={18} />
              </button>
            )}
            {showIncentiveSubnavVariant && (
              <div className="rankings-page__subnav-offers" aria-label={`${offerBodyStyleLabel} deals`}>
                <Link to={buyingOffersPath} className="rankings-page__subnav-pill rankings-page__subnav-pill--offer">
                  <span className="rankings-page__subnav-offer-chip">BUY</span>
                  <span className="rankings-page__subnav-offer-count">{RANKINGS_OFFER_COUNTS.buying} {offerBodyStyleLabel} Deals</span>
                </Link>
                <Link to={leasingOffersPath} className="rankings-page__subnav-pill rankings-page__subnav-pill--offer">
                  <span className="rankings-page__subnav-offer-chip">LEASE</span>
                  <span className="rankings-page__subnav-offer-count">{RANKINGS_OFFER_COUNTS.leasing} {offerBodyStyleLabel} Deals</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}

      {!subcategory && config && (
        <div className="rankings-page__subnav-breaker" role="complementary" aria-label="Advertisement">
          <div className="container rankings-page__subnav-breaker-inner">
            <AdBanner
              imageUrl={DEALS_GRID_BREAKER_AD_URL}
              altText="Advertisement"
              hideHeader
              hideLine
              mobileCompact
            />
          </div>
        </div>
      )}

      {!showIncentiveSubnavVariant && !showHeroIncentiveRow && (
        <div className="container">
          <section className="rankings-page__offers-cta" aria-labelledby="rankings-page-offers-title">
            <div className="rankings-page__offers-cta-header">
              <h2 id="rankings-page-offers-title" className="rankings-page__offers-cta-title">
                Special deals and incentives
              </h2>
              <p className="rankings-page__offers-cta-count">
                <strong>{RANKINGS_OFFER_COUNTS.total}</strong>
                <span>{offerBodyStyleLabel} deals available</span>
              </p>
            </div>
            <div className="rankings-page__offers-cta-links">
              <Link to={buyingOffersPath} className="rankings-page__offers-cta-link">
                <span className="rankings-page__offers-cta-link-main">
                  <span className="rankings-page__offers-cta-chip">BUY</span>
                  <span>
                    See {RANKINGS_OFFER_COUNTS.buying} {offerBodyStyleLabel} Buying {showCdControlVariant ? 'Offers' : 'Deals'}
                  </span>
                </span>
                <span className="rankings-page__offers-cta-badge">{RANKINGS_OFFER_COUNTS.buyingExpiringSoon} expiring soon!</span>
              </Link>
              <Link to={leasingOffersPath} className="rankings-page__offers-cta-link">
                <span className="rankings-page__offers-cta-link-main">
                  <span className="rankings-page__offers-cta-chip">LEASE</span>
                  <span>
                    See {RANKINGS_OFFER_COUNTS.leasing} {offerBodyStyleLabel} Leasing {showCdControlVariant ? 'Offers' : 'Deals'}
                  </span>
                </span>
                <span className="rankings-page__offers-cta-badge">{RANKINGS_OFFER_COUNTS.leasingExpiringSoon} expiring soon!</span>
              </Link>
            </div>
          </section>
        </div>
      )}

      {/* Main Content */}
      <div className="rankings-page__content">
        <div className="container">
          {subcategory && formattedVehicles.length >= 1 && (
            <div className="rankings-page__subcategory-breaker" role="complementary" aria-label="Advertisement">
              <AdBanner
                imageUrl={DEALS_GRID_BREAKER_AD_URL}
                altText="Advertisement"
                hideHeader
                hideLine
                mobileCompact
              />
            </div>
          )}

          {subcategory && topRankedGlanceItems.length >= 1 && (
            <div className="rankings-page__top-ranked-glance-shell">
              <TopRankedGlance
                title={subcategoryGlanceTitle}
                seeAllLabel="See full list"
                seeAllPath={fullListAnchor}
                primaryCtaLabel="SHOP THE TOP 3"
                primaryCtaPath={buyingOffersPath}
                rankingItems={topRankedGlanceItems}
              />
            </div>
          )}

          <div className={`rankings-page__layout${subcategory ? ' rankings-page__layout--subcategory' : ''}`}>
            <div className="rankings-page__main">

              {/* MAIN BODY STYLE PAGE: Show top 3 from each subcategory */}
              {!subcategory && subcategoryVehicles && subcategoryVehicles.map((sub) => (
                <section
                  key={sub.id}
                  id={sub.id}
                  className="rankings-page__subcategory-section"
                >
                  <div className="rankings-page__subcategory-header">
                    <div className="rankings-page__subcategory-heading">
                      {showCdControlVariant && <span className="rankings-page__subcategory-kicker">By Size</span>}
                      <h2 className="rankings-page__subcategory-title">
                        <Link
                          to={getSubcategoryPath(sub.id)}
                          className="rankings-page__subcategory-title-link"
                          aria-label={`See the full ${sub.name} rankings`}
                        >
                          {sub.name}
                          {showCdControlVariant && <ChevronRight size={20} strokeWidth={3} aria-hidden="true" />}
                        </Link>
                      </h2>
                    </div>
                    <div className="rankings-page__subcategory-actions">
                      {showCdControlVariant && (
                        <Link to={buyingOffersPath} className="rankings-page__subcategory-shop">
                          Shop the top 3
                        </Link>
                      )}
                      <Link
                        to={getSubcategoryPath(sub.id)}
                        className="rankings-page__subcategory-more"
                      >
                        {showCdControlVariant ? 'See full list' : `See all ${sub.totalCount} vehicles`}
                        <ChevronRight size={18} />
                      </Link>
                    </div>
                  </div>

                  {/* #1 Hero Card */}
                  {sub.vehicles.length >= 1 && (
                    <div className="rankings-page__hero-card rankings-page__hero-card--subcategory">
                      <Link to={`/${sub.vehicles[0].slug}`} className="rankings-page__hero-card-content">
                        <div className="rankings-page__hero-card-header">
                          <h3 className="rankings-page__hero-card-title">
                            {sub.vehicles[0].year} {sub.vehicles[0].name}
                          </h3>
                          <div className="rankings-page__hero-card-rating">
                            <div className="rankings-page__hero-card-rating-score">
                              <span className="rankings-page__hero-card-rating-value">{sub.vehicles[0].rating}</span>
                              <span className="rankings-page__hero-card-rating-max">/10</span>
                            </div>
                            <span className="rankings-page__hero-card-rating-label">C/D RATING</span>
                          </div>
                        </div>
                        <div className="rankings-page__hero-card-image-container">
                          <div className="rankings-page__hero-card-rank-container">
                            <div className="rankings-page__hero-card-rank rankings-page__hero-card-rank--first">1</div>
                          </div>
                          <button
                            className={`rankings-page__hero-card-save ${isVehicleSaved(`${sub.vehicles[0].year} ${sub.vehicles[0].name}`) ? 'rankings-page__hero-card-save--saved' : ''}`}
                            onClick={(e) => handleSaveClick(e, { name: `${sub.vehicles[0].year} ${sub.vehicles[0].name}`, slug: sub.vehicles[0].slug, image: sub.vehicles[0].image })}
                            aria-label={isVehicleSaved(`${sub.vehicles[0].year} ${sub.vehicles[0].name}`) ? 'Remove from saved' : 'Save vehicle'}
                          >
                            <Bookmark size={18} fill={isVehicleSaved(`${sub.vehicles[0].year} ${sub.vehicles[0].name}`) ? 'currentColor' : 'none'} />
                          </button>
                          <img
                            src={sub.vehicles[0].image}
                            alt={sub.vehicles[0].name}
                            className="rankings-page__hero-card-image"
                          />
                        </div>
                        <div className="rankings-page__hero-card-details">
                          <div className="rankings-page__hero-card-price-row">
                            <div className="rankings-page__hero-card-price">
                              <span className="rankings-page__hero-card-price-label">Starting at</span>
                              <span className="rankings-page__hero-card-price-value">{sub.vehicles[0].price}</span>
                            </div>
                            <div className="rankings-page__hero-card-mpg">
                              <span className="rankings-page__hero-card-mpg-label">EPA MPG</span>
                              <span className="rankings-page__hero-card-mpg-value">
                                {sub.vehicles[0].epaMpg ? (
                                  <>
                                    <strong>{sub.vehicles[0].epaMpg}</strong>
                                    <span className="rankings-page__hero-card-mpg-unit">combined</span>
                                  </>
                                ) : 'N/A'}
                              </span>
                            </div>
                            {(sub.vehicles[0].tenBest || sub.vehicles[0].editorsChoice) && (
                              <>
                                <div className="rankings-page__hero-card-divider"></div>
                                <div className="rankings-page__hero-card-badges">
                                  {sub.vehicles[0].tenBest && (
                                    <div className="rankings-page__hero-card-badge-item">
                                      <img
                                        src="https://www.caranddriver.com/_assets/design-tokens/caranddriver/static/images/badges-no-text/ten-best.bcb6ac1.svg"
                                        alt="10Best"
                                        className="rankings-page__hero-card-badge"
                                      />
                                      <span className="rankings-page__hero-card-badge-label">10Best</span>
                                    </div>
                                  )}
                                  {sub.vehicles[0].editorsChoice && (
                                    <div className="rankings-page__hero-card-badge-item">
                                      <img
                                        src="https://www.caranddriver.com/_assets/design-tokens/caranddriver/static/images/badges-no-text/editors-choice.7ecd596.svg?primary=%2523FEFEFE"
                                        alt="Editor's Choice"
                                        className="rankings-page__hero-card-badge"
                                      />
                                      <span className="rankings-page__hero-card-badge-label">Editor's Choice</span>
                                    </div>
                                  )}
                                </div>
                              </>
                            )}
                            <button className="rankings-page__hero-card-cta">
                              {parseInt(sub.vehicles[0].year) >= 2026 ? 'SHOP NEW' : 'SHOP USED'} {sub.vehicles[0].modelName.toUpperCase()}
                            </button>
                          </div>
                          <div className="rankings-page__hero-card-cdsays">
                            <span className="rankings-page__hero-card-cdsays-label">C/D SAYS:</span>
                            <span className="rankings-page__hero-card-cdsays-text">
                              {sub.vehicles[0].cdSays} <span className="rankings-page__hero-card-cdsays-link">Learn More</span>
                            </span>
                          </div>
                        </div>
                      </Link>
                    </div>
                  )}

                  {/* #2 and #3 Cards */}
                  {sub.vehicles.length > 1 && (
                    <div className="rankings-page__subcategory-grid">
                      {sub.vehicles.slice(1).map((vehicle) => {
                        const offers = getVehicleOffers(vehicle.make, vehicle.modelName);
                        return (
                        <VehicleCard
                          key={vehicle.id}
                          id={vehicle.id}
                          name={vehicle.name}
                          slug={vehicle.slug}
                          image={vehicle.image}
                          price={vehicle.price}
                          rating={vehicle.rating}
                          rank={vehicle.rank}
                          editorsChoice={vehicle.editorsChoice}
                          tenBest={vehicle.tenBest}
                          showShopButton={true}
                          showSaveButton={true}
                          shopButtonText={`${parseInt(vehicle.year) >= 2026 ? 'SHOP NEW' : 'SHOP USED'} ${vehicle.modelName.toUpperCase()}`}
                          shopButtonVariant="primary"
                          epaMpg={vehicle.epaMpg}
                          cdSays={vehicle.cdSays}
                          modelName={vehicle.modelName}
                          incentiveCount={offers.length}
                          onIncentiveClick={() => navigate(`/${vehicle.make.toLowerCase()}/${vehicle.modelName.toLowerCase().replace(/\s+/g, '-')}/deals-incentives`)}
                        />);
                      })}
                    </div>
                  )}
                </section>
              ))}

              {/* SUBCATEGORY PAGE: Show the full rankings list with consistent ranked cards */}
              {subcategory && formattedVehicles.length >= 1 && (
                <section id="rankings-full-list" className="rankings-page__full-list rankings-page__full-list--hero-cards">
                  {formattedVehicles.map((vehicle) => renderHeroRankingCard(vehicle))}
                </section>
              )}

              {/* Empty State */}
              {((subcategory && formattedVehicles.length === 0) || (!subcategory && (!subcategoryVehicles || subcategoryVehicles.length === 0))) && (
                <div className="rankings-page__empty">
                  <img
                    src="https://www.caranddriver.com/_assets/design-tokens/caranddriver/static/images/badges-no-text/ten-best.bcb6ac1.svg"
                    alt="10Best"
                    className="rankings-page__empty-icon"
                  />
                  <h3>No vehicles found</h3>
                  <p>We don't have any vehicles in this category yet.</p>
                  <Link to={`/rankings/${bodyStyle}`} className="rankings-page__back-link">
                    View all {config.title}
                  </Link>
                </div>
              )}
            </div>

            {/* Sticky Sidebar Ad */}
            <aside className="rankings-page__sidebar">
              <AdSidebar />
            </aside>
          </div>
        </div>
      </div>

      {/* Related Categories Carousel */}
      <div className="rankings-page__related">
        <div className="container">
          <div className="rankings-page__related-header">
            <h2 className="rankings-page__section-title">Explore Other Rankings</h2>
            <div className="rankings-page__carousel-controls">
              <button
                className="rankings-page__carousel-btn rankings-page__carousel-btn--prev"
                onClick={() => {
                  const container = document.querySelector('.rankings-page__related-carousel');
                  if (container) container.scrollBy({ left: -280, behavior: 'smooth' });
                }}
                aria-label="Previous"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                className="rankings-page__carousel-btn rankings-page__carousel-btn--next"
                onClick={() => {
                  const container = document.querySelector('.rankings-page__related-carousel');
                  if (container) container.scrollBy({ left: 280, behavior: 'smooth' });
                }}
                aria-label="Next"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
          <div className="rankings-page__related-carousel">
            {Object.entries(BODY_STYLE_CONFIG).map(([key, value]) => (
              <Link
                key={key}
                to={`/rankings/${key}`}
                className={`rankings-page__related-card ${key === bodyStyle?.toLowerCase() ? 'rankings-page__related-card--active' : ''}`}
              >
                {BODY_STYLE_ICONS[key] && (
                  <img
                    src={BODY_STYLE_ICONS[key]}
                    alt=""
                    className="rankings-page__related-icon"
                  />
                )}
                <h3>{value.title}</h3>
                <span className="rankings-page__related-count">
                  {getAllVehicles().filter(v => v.bodyStyle.toLowerCase() === key).length} vehicles
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Sign In to Save Modal */}
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

export default RankingsPage;
