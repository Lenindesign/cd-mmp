import React, { useState, useEffect, useRef, useId } from 'react';
import {
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Plus,
  Minus,
  X
} from 'lucide-react';
import { OptimizedImage } from '../OptimizedImage';
import './LocalSignals2.css';

export interface LocalSignals2Props {
  isOpen?: boolean;
  onClose?: () => void;
  isModal?: boolean;
  initialZip?: string;
}

interface PlottedListing {
  id: string;
  price: number;
  trim: string;
  year: number;
  mileage: number;
  daysListed: number;
  dealer: string;
  distance: number;
  vin: string;
  isGoodDeal: boolean;
  reasons: string[];
  yOffset: number; // vertical jitter offset (-14 to +14px)
}

interface DealCardItem {
  id: string;
  year: number;
  make: string;
  model: string;
  trim: string;
  price: number;
  mileage: number;
  daysListed: number;
  image: string;
  badgesRow1: { text: string; variant: 'green' | 'gray' }[];
  badgesRow2?: { text: string; variant: 'green' | 'gray' }[];
  dealer: string;
  distance: number;
  vin: string;
  url: string;
}

const DEALS_DATA: DealCardItem[] = [
  {
    id: 'deal-1',
    year: 2024,
    make: 'Honda',
    model: 'CR-V',
    trim: 'LX',
    price: 26774,
    mileage: 39979,
    daysListed: 60,
    image: 'https://hips.hearstapps.com/mtg-prod/685edb52f9d75b00021b1e55/07-2026-honda-cr-v-trailsport.jpg',
    badgesRow1: [
      { text: 'No accidents reported', variant: 'green' },
      { text: '60 days on lot', variant: 'gray' },
    ],
    dealer: 'Braman Honda',
    distance: 6.8,
    vin: '2HKRW2H179190',
    url: 'https://www.caranddriver.com/cars-for-sale/used?year=2024&make=Honda&model=CR-V',
  },
  {
    id: 'deal-2',
    year: 2024,
    make: 'Honda',
    model: 'CR-V',
    trim: 'LX',
    price: 28053,
    mileage: 30109,
    daysListed: 41,
    image: 'https://hips.hearstapps.com/mtg-prod/680c099a59ad1f00089429b2/008-2026-honda-cr-v-first-look.jpg',
    badgesRow1: [
      { text: 'No accidents reported', variant: 'green' },
    ],
    badgesRow2: [
      { text: 'Free history report', variant: 'gray' },
      { text: 'Price dropped', variant: 'green' },
    ],
    dealer: 'Rossi Honda of Miami',
    distance: 3.2,
    vin: '2HKRW2H100000',
    url: 'https://www.caranddriver.com/cars-for-sale/used?year=2024&make=Honda&model=CR-V',
  },
  {
    id: 'deal-3',
    year: 2024,
    make: 'Honda',
    model: 'CR-V',
    trim: 'EX',
    price: 28776,
    mileage: 39541,
    daysListed: 31,
    image: 'https://hips.hearstapps.com/mtg-prod/685edc61b46e00000219aa39/01-2026-honda-cr-v-trailsport.jpg',
    badgesRow1: [
      { text: 'No accidents reported', variant: 'green' },
      { text: 'One owner', variant: 'green' },
    ],
    badgesRow2: [
      { text: 'Free history report', variant: 'gray' },
    ],
    dealer: 'Coral Springs Honda',
    distance: 11.4,
    vin: '2HKRW2H187109',
    url: 'https://www.caranddriver.com/cars-for-sale/used?year=2024&make=Honda&model=CR-V',
  },
  {
    id: 'deal-4',
    year: 2024,
    make: 'Honda',
    model: 'CR-V',
    trim: 'LX',
    price: 28876,
    mileage: 35771,
    daysListed: 32,
    image: 'https://hips.hearstapps.com/mtg-prod/685edc6a171ad600026f197c/04-2026-honda-cr-v-trailsport.jpg',
    badgesRow1: [
      { text: 'No accidents reported', variant: 'green' },
    ],
    dealer: 'Doral Certified Center',
    distance: 3.8,
    vin: '2HKRW2H218785',
    url: 'https://www.caranddriver.com/cars-for-sale/used?year=2024&make=Honda&model=CR-V',
  },
];

const ALL_PLOTTED_LISTINGS: PlottedListing[] = [
  // 4 Good deals (green)
  {
    id: 'plot-1',
    price: 26774,
    trim: 'LX',
    year: 2024,
    mileage: 39979,
    daysListed: 60,
    dealer: 'Braman Honda',
    distance: 6.8,
    vin: '2HKRW2H179190',
    isGoodDeal: true,
    reasons: ['No accidents', '60 days on lot', 'Lowest local price'],
    yOffset: 0,
  },
  {
    id: 'plot-2',
    price: 28053,
    trim: 'LX',
    year: 2024,
    mileage: 30109,
    daysListed: 41,
    dealer: 'Rossi Honda of Miami',
    distance: 3.2,
    vin: '2HKRW2H100000',
    isGoodDeal: true,
    reasons: ['No accidents', 'Price dropped', 'Below market'],
    yOffset: 1,
  },
  {
    id: 'plot-3',
    price: 28776,
    trim: 'EX',
    year: 2024,
    mileage: 39541,
    daysListed: 31,
    dealer: 'Coral Springs Honda',
    distance: 11.4,
    vin: '2HKRW2H187109',
    isGoodDeal: true,
    reasons: ['One owner', 'No accidents', 'EX Trim'],
    yOffset: 2,
  },
  {
    id: 'plot-4',
    price: 28876,
    trim: 'LX',
    year: 2024,
    mileage: 35771,
    daysListed: 32,
    dealer: 'Doral Certified Center',
    distance: 3.8,
    vin: '2HKRW2H218785',
    isGoodDeal: true,
    reasons: ['No accidents', 'Certified prep', 'Below market'],
    yOffset: -6,
  },
  // 20 Other listings (grey)
  { id: 'plot-5', price: 29800, trim: 'LX', year: 2024, mileage: 42000, daysListed: 22, dealer: 'Brickell Honda', distance: 4.1, vin: '2HKRW2H331001', isGoodDeal: false, reasons: ['Standard market price'], yOffset: 1 },
  { id: 'plot-6', price: 30150, trim: 'EX', year: 2024, mileage: 45200, daysListed: 19, dealer: 'AutoNation Honda', distance: 8.5, vin: '2HKRW2H331002', isGoodDeal: false, reasons: ['Above fair price target'], yOffset: -5 },
  { id: 'plot-7', price: 30400, trim: 'LX', year: 2024, mileage: 28500, daysListed: 15, dealer: 'South Motors Honda', distance: 12.0, vin: '2HKRW2H331003', isGoodDeal: false, reasons: ['Standard condition'], yOffset: 4 },
  { id: 'plot-8', price: 30850, trim: 'EX-L', year: 2024, mileage: 51000, daysListed: 28, dealer: 'Braman Honda', distance: 6.8, vin: '2HKRW2H331004', isGoodDeal: false, reasons: ['Higher mileage'], yOffset: -3 },
  { id: 'plot-9', price: 31100, trim: 'EX', year: 2024, mileage: 36000, daysListed: 12, dealer: 'Palmetto57 Honda', distance: 9.3, vin: '2HKRW2H331005', isGoodDeal: false, reasons: ['Standard market pricing'], yOffset: 7 },
  { id: 'plot-10', price: 31500, trim: 'EX-L', year: 2024, mileage: 38900, daysListed: 34, dealer: 'Hollywood Honda', distance: 15.2, vin: '2HKRW2H331006', isGoodDeal: false, reasons: ['Close to typical asking'], yOffset: -6 },
  { id: 'plot-11', price: 31900, trim: 'Sport', year: 2024, mileage: 32400, daysListed: 14, dealer: 'Coral Gables Honda', distance: 5.6, vin: '2HKRW2H331007', isGoodDeal: false, reasons: ['Standard retail ask'], yOffset: 2 },
  { id: 'plot-12', price: 32250, trim: 'EX-L', year: 2024, mileage: 29800, daysListed: 21, dealer: 'Rossi Honda of Miami', distance: 3.2, vin: '2HKRW2H331008', isGoodDeal: false, reasons: ['Higher asking price'], yOffset: 8 },
  { id: 'plot-13', price: 32600, trim: 'Sport Hybrid', year: 2024, mileage: 41200, daysListed: 40, dealer: 'Braman Honda', distance: 6.8, vin: '2HKRW2H331009', isGoodDeal: false, reasons: ['Higher asking price'], yOffset: -4 },
  { id: 'plot-14', price: 32800, trim: 'EX-L', year: 2024, mileage: 25600, daysListed: 18, dealer: 'Hendrick Honda', distance: 18.0, vin: '2HKRW2H331010', isGoodDeal: false, reasons: ['Priced at premium'], yOffset: 5 },
  { id: 'plot-15', price: 33100, trim: 'Sport', year: 2024, mileage: 31200, daysListed: 25, dealer: 'Fort Lauderdale Honda', distance: 22.0, vin: '2HKRW2H331011', isGoodDeal: false, reasons: ['Priced at premium'], yOffset: -2 },
  { id: 'plot-16', price: 33450, trim: 'Sport-L', year: 2024, mileage: 27900, daysListed: 16, dealer: 'Rick Case Honda', distance: 19.5, vin: '2HKRW2H331012', isGoodDeal: false, reasons: ['Above target price'], yOffset: 6 },
  { id: 'plot-17', price: 33750, trim: 'Touring', year: 2024, mileage: 34500, daysListed: 30, dealer: 'AutoNation Honda', distance: 8.5, vin: '2HKRW2H331013', isGoodDeal: false, reasons: ['Higher trim premium'], yOffset: -7 },
  { id: 'plot-18', price: 34200, trim: 'Sport-L', year: 2024, mileage: 21000, daysListed: 11, dealer: 'South Motors Honda', distance: 12.0, vin: '2HKRW2H331014', isGoodDeal: false, reasons: ['Low mileage but high price'], yOffset: 1 },
  { id: 'plot-19', price: 34650, trim: 'Sport Touring', year: 2024, mileage: 28400, daysListed: 27, dealer: 'Hollywood Honda', distance: 15.2, vin: '2HKRW2H331015', isGoodDeal: false, reasons: ['High asking price'], yOffset: 7 },
  { id: 'plot-20', price: 35100, trim: 'Touring Hybrid', year: 2024, mileage: 19800, daysListed: 9, dealer: 'Coral Springs Honda', distance: 11.4, vin: '2HKRW2H331016', isGoodDeal: false, reasons: ['Top trim premium'], yOffset: -5 },
  { id: 'plot-21', price: 35450, trim: 'Sport Touring', year: 2024, mileage: 22100, daysListed: 20, dealer: 'Braman Honda', distance: 6.8, vin: '2HKRW2H331017', isGoodDeal: false, reasons: ['Well above market average'], yOffset: 2 },
  { id: 'plot-22', price: 35761, trim: 'Sport Touring', year: 2024, mileage: 18400, daysListed: 15, dealer: 'Palmetto57 Honda', distance: 9.3, vin: '2HKRW2H331018', isGoodDeal: false, reasons: ['Top of the market range'], yOffset: 8 },
  { id: 'plot-23', price: 36200, trim: 'Sport Touring Hybrid', year: 2024, mileage: 14200, daysListed: 8, dealer: 'Rick Case Honda', distance: 19.5, vin: '2HKRW2H331019', isGoodDeal: false, reasons: ['High dealer ask'], yOffset: -3 },
  { id: 'plot-24', price: 36650, trim: 'Sport Touring', year: 2024, mileage: 11900, daysListed: 5, dealer: 'Brickell Honda', distance: 4.1, vin: '2HKRW2H331020', isGoodDeal: false, reasons: ['Highest priced listing'], yOffset: 4 },
];

export const LocalSignals2: React.FC<LocalSignals2Props> = ({
  isOpen = true,
  onClose,
  isModal = false,
  initialZip = '33101',
}) => {
  const [vehicleType, setVehicleType] = useState<'used' | 'new'>('used');
  const [zipCode, setZipCode] = useState(initialZip);
  const [isZipOpen, setIsZipOpen] = useState(false);
  const [zipInput, setZipInput] = useState(initialZip);
  const [activeDotIndex, setActiveDotIndex] = useState<number | null>(0);
  const [hoveredDot, setHoveredDot] = useState<PlottedListing | null>(null);
  const [isScoredExpanded, setIsScoredExpanded] = useState(false);
  const [, setDealsScrollIndex] = useState(0);

  const chartContainerRef = useRef<HTMLDivElement>(null);
  const dealsRowRef = useRef<HTMLDivElement>(null);
  const tooltipId = useId();

  // Price scale bounds
  const minPriceScale = 26500;
  const maxPriceScale = 37000;
  const typicalPrice = 29450;
  const targetPrice = 26774;

  const getPricePercent = (price: number) => {
    return Math.max(0, Math.min(100, ((price - minPriceScale) / (maxPriceScale - minPriceScale)) * 100));
  };

  // Keyboard navigation for dots
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        setActiveDotIndex((prev) => {
          const next = prev === null ? 0 : (prev + 1) % ALL_PLOTTED_LISTINGS.length;
          return next;
        });
      } else if (e.key === 'ArrowLeft') {
        setActiveDotIndex((prev) => {
          const next = prev === null ? ALL_PLOTTED_LISTINGS.length - 1 : (prev - 1 + ALL_PLOTTED_LISTINGS.length) % ALL_PLOTTED_LISTINGS.length;
          return next;
        });
      } else if (e.key === 'Escape' && isModal && onClose) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModal, onClose]);

  const handleZipSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (zipInput.trim()) {
      setZipCode(zipInput.trim());
      setIsZipOpen(false);
    }
  };

  const handleScrollDeals = (direction: 'left' | 'right') => {
    if (!dealsRowRef.current) return;
    const cardWidth = 270;
    const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;
    dealsRowRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    setDealsScrollIndex((prev) => (direction === 'left' ? Math.max(0, prev - 1) : Math.min(3, prev + 1)));
  };

  const currentActiveDot = activeDotIndex !== null ? ALL_PLOTTED_LISTINGS[activeDotIndex] : null;
  const displayTooltipDot = hoveredDot || currentActiveDot;

  if (isModal && !isOpen) return null;

  return (
    <div className={`ls2-root ${isModal ? 'ls2-modal-overlay' : ''}`} onClick={isModal ? onClose : undefined}>
      <div
        className={`ls2-container ${isModal ? 'ls2-modal-content' : ''}`}
        onClick={(e) => e.stopPropagation()}
        role={isModal ? 'dialog' : 'region'}
        aria-label="Local Market Snapshot 2024 Honda CR-V"
      >
        {isModal && (
          <button
            type="button"
            className="ls2-modal-close"
            onClick={onClose}
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        )}

        {/* TOP BAR / HEADER */}
        <header className="ls2-header">
          <div className="ls2-header__title-block">
            <span className="ls2-eyebrow">LOCAL MARKET SNAPSHOT</span>
            <h1 className="ls2-title">2024 Honda CR-V near {zipCode}</h1>
          </div>

          <div className="ls2-header__controls">
            <div className="ls2-segmented-control" role="tablist">
              <button
                type="button"
                role="tab"
                aria-selected={vehicleType === 'new'}
                className={`ls2-segmented-btn ${vehicleType === 'new' ? 'ls2-segmented-btn--active' : ''}`}
                onClick={() => setVehicleType('new')}
              >
                NEW 2026
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={vehicleType === 'used'}
                className={`ls2-segmented-btn ${vehicleType === 'used' ? 'ls2-segmented-btn--active' : ''}`}
                onClick={() => setVehicleType('used')}
              >
                USED 2024
              </button>
            </div>

            <div className="ls2-zip-selector-wrap">
              <button
                type="button"
                className="ls2-zip-pill"
                onClick={() => setIsZipOpen(!isZipOpen)}
                aria-expanded={isZipOpen}
                aria-haspopup="dialog"
              >
                <span>{zipCode}</span>
                <span className="ls2-zip-pill__divider">-</span>
                <ChevronDown size={14} className="ls2-zip-pill__icon" />
              </button>

              {isZipOpen && (
                <form className="ls2-zip-dropdown" onSubmit={handleZipSubmit}>
                  <label htmlFor="ls2-zip-input" className="ls2-zip-label">
                    Enter ZIP Code
                  </label>
                  <div className="ls2-zip-input-row">
                    <input
                      id="ls2-zip-input"
                      type="text"
                      maxLength={5}
                      pattern="[0-9]{5}"
                      value={zipInput}
                      onChange={(e) => setZipInput(e.target.value)}
                      className="ls2-zip-input"
                      placeholder="e.g. 33101"
                      autoFocus
                    />
                    <button type="submit" className="ls2-zip-submit-btn">
                      Update
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </header>

        {/* MAIN SNAPSHOT CONTAINER CARD */}
        <section className="ls2-main-card" aria-label="Market conditions and pricing summary">
          {/* BUY SIGNAL HEADER */}
          <div className="ls2-signal-header">
            <div className="ls2-signal-headline-wrap">
              <h2 className="ls2-signal-headline">An average time to buy</h2>
              <p className="ls2-signal-subtext">
                The used CR-V market near you is balanced — deals exist, but you will have to pick carefully.
              </p>
            </div>

            <div className="ls2-buy-signal-indicator">
              <div className="ls2-signal-bars" aria-label="Buy signal rating 2 out of 3">
                <span className="ls2-signal-bar ls2-signal-bar--amber" />
                <span className="ls2-signal-bar ls2-signal-bar--amber" />
                <span className="ls2-signal-bar ls2-signal-bar--gray" />
              </div>
              <span className="ls2-signal-label">BUY SIGNAL: AVERAGE</span>
            </div>
          </div>

          {/* 3 STATUS PILLS */}
          <div className="ls2-pills-row" aria-label="Market key facts">
            <div className="ls2-status-pill ls2-status-pill--green">
              <span className="ls2-pill-icon-circle ls2-pill-icon-circle--green">
                <Plus size={11} strokeWidth={3} />
              </span>
              <span>24 local matches give you real choice</span>
            </div>

            <div className="ls2-status-pill ls2-status-pill--green">
              <span className="ls2-pill-icon-circle ls2-pill-icon-circle--green">
                <Plus size={11} strokeWidth={3} />
              </span>
              <span>14 of 24 are one-owner and 23 report no accidents</span>
            </div>

            <div className="ls2-status-pill ls2-status-pill--red">
              <span className="ls2-pill-icon-circle ls2-pill-icon-circle--red">
                <Minus size={11} strokeWidth={3} />
              </span>
              <span>Average asking price runs $2,128 above fair market</span>
            </div>
          </div>

          {/* 3 STATS CARDS */}
          <div className="ls2-stats-grid">
            <article className="ls2-stat-card">
              <span className="ls2-stat-card__eyebrow">TYPICAL PRICE NEAR YOU</span>
              <strong className="ls2-stat-card__value">$29,450</strong>
              <p className="ls2-stat-card__subtext">Listings run $26,774 to $35,761</p>
            </article>

            <article className="ls2-stat-card">
              <span className="ls2-stat-card__eyebrow">WHAT YOU SHOULD PAY</span>
              <strong className="ls2-stat-card__value">Under $26,774</strong>
              <p className="ls2-stat-card__subtext">
                <a href="#ls2-deals" className="ls2-link">1 listing</a> already at or below that
              </p>
            </article>

            <article className="ls2-stat-card">
              <span className="ls2-stat-card__eyebrow">CHOICE NEARBY</span>
              <strong className="ls2-stat-card__value">
                <a href="#ls2-deals" className="ls2-link ls2-link--primary-bold">24 available</a>
              </strong>
              <div className="ls2-stat-card__links">
                <a href="#ls2-deals" className="ls2-link">8 with one owner, no accidents, low miles</a>
                <a href="#ls2-deals" className="ls2-link">5 sitting 45+ days</a>
              </div>
            </article>
          </div>

          {/* PRICE DISTRIBUTION SCATTER GRAPH */}
          <div className="ls2-chart-section" ref={chartContainerRef}>
            <div className="ls2-chart-head">
              <span className="ls2-chart-head__title">WHERE PRICES SIT NEAR YOU</span>
              <span className="ls2-chart-head__help">
                24 listings · click a dot to preview that vehicle, then use ← → to step through
              </span>
            </div>

            <p className="ls2-chart-description">
              Every local listing plotted from cheapest to priciest. Green dots are the ones we rate a good deal:
              priced at or under the $29,450 typical asking price <em>and</em> backed by at least two quality signals — one
              owner, no reported accidents, under average mileage, or an existing price drop.
            </p>

            {/* CHART CANVAS */}
            <div className="ls2-graph-container" tabIndex={0} aria-label="Price dot distribution plot">
              {/* TYPICAL LINE MARKER */}
              <div
                className="ls2-marker ls2-marker--typical"
                style={{ left: `${getPricePercent(typicalPrice)}%` }}
              >
                <span className="ls2-marker__label ls2-marker__label--top">Typical $29,450</span>
                <div className="ls2-marker__dashed-line" />
              </div>

              {/* TARGET LINE MARKER */}
              <div
                className="ls2-marker ls2-marker--target"
                style={{ left: `${getPricePercent(targetPrice)}%` }}
              >
                <div className="ls2-marker__solid-bar" />
                <span className="ls2-marker__label ls2-marker__label--bottom">Your target $26,774</span>
              </div>

              {/* SCATTER DOTS */}
              <div className="ls2-dots-plot">
                {ALL_PLOTTED_LISTINGS.map((listing, idx) => {
                  const leftPercent = getPricePercent(listing.price);
                  const isSelected = activeDotIndex === idx;
                  const isGood = listing.isGoodDeal;

                  return (
                    <button
                      key={listing.id}
                      type="button"
                      className={`ls2-dot ${isGood ? 'ls2-dot--good' : 'ls2-dot--standard'} ${isSelected ? 'ls2-dot--active' : ''}`}
                      style={{
                        left: `${leftPercent}%`,
                        transform: `translate(-50%, calc(-50% + ${listing.yOffset}px))`,
                      }}
                      onClick={() => setActiveDotIndex(activeDotIndex === idx ? null : idx)}
                      onMouseEnter={() => setHoveredDot(listing)}
                      onMouseLeave={() => setHoveredDot(null)}
                      aria-label={`${listing.year} Honda CR-V ${listing.trim} at $${listing.price.toLocaleString()}`}
                    />
                  );
                })}
              </div>

              {/* RICH PREVIEW POPUP CARD ON HOVER / ACTIVE */}
              {displayTooltipDot && (
                <div
                  id={tooltipId}
                  className="ls2-popover-card"
                  style={{
                    left: `${Math.max(18, Math.min(82, getPricePercent(displayTooltipDot.price)))}%`,
                  }}
                >
                  <button
                    type="button"
                    className="ls2-popover-close"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveDotIndex(null);
                      setHoveredDot(null);
                    }}
                    aria-label="Close preview"
                  >
                    <X size={14} />
                  </button>

                  <div className="ls2-popover-media">
                    <OptimizedImage
                      src={
                        DEALS_DATA.find((d) => d.price === displayTooltipDot.price)?.image ||
                        'https://hips.hearstapps.com/mtg-prod/680c099a59ad1f00089429b2/008-2026-honda-cr-v-first-look.jpg'
                      }
                      alt={`${displayTooltipDot.year} Honda CR-V ${displayTooltipDot.trim}`}
                      aspectRatio="16/10"
                      className="ls2-popover-img"
                      wrapperClassName="ls2-popover-img-wrapper"
                    />
                    {displayTooltipDot.isGoodDeal && (
                      <span className="ls2-popover-badge">GOOD DEAL</span>
                    )}
                  </div>

                  <div className="ls2-popover-body">
                    <h4 className="ls2-popover-title">
                      {displayTooltipDot.year} Honda CR-V {displayTooltipDot.trim}
                    </h4>

                    <div className="ls2-popover-price-row">
                      <strong className="ls2-popover-price">
                        ${displayTooltipDot.price.toLocaleString()}
                      </strong>
                      {displayTooltipDot.price < typicalPrice ? (
                        <span className="ls2-popover-delta ls2-popover-delta--under">
                          ${(typicalPrice - displayTooltipDot.price).toLocaleString()} under typical
                        </span>
                      ) : (
                        <span className="ls2-popover-delta ls2-popover-delta--over">
                          ${(displayTooltipDot.price - typicalPrice).toLocaleString()} over typical
                        </span>
                      )}
                    </div>

                    <p className="ls2-popover-meta">
                      {displayTooltipDot.mileage.toLocaleString()} mi · {displayTooltipDot.daysListed} days listed · {displayTooltipDot.distance} mi · {displayTooltipDot.dealer}
                    </p>

                    <div className="ls2-popover-pills">
                      <span className="ls2-popover-pill ls2-popover-pill--green">
                        No accidents reported
                      </span>
                      {displayTooltipDot.isGoodDeal && (
                        <span className="ls2-popover-pill ls2-popover-pill--green">
                          One owner
                        </span>
                      )}
                    </div>

                    <div className="ls2-popover-vin">
                      VIN {displayTooltipDot.vin}
                    </div>

                    <a href="#ls2-deals" className="ls2-popover-link">
                      See all good-deal listings
                    </a>
                  </div>
                </div>
              )}

              {/* HORIZONTAL AXIS */}
              <div className="ls2-axis-line" />
              <div className="ls2-axis-ticks">
                <span className="ls2-axis-tick" style={{ left: `${getPricePercent(27000)}%` }}>
                  <span className="ls2-axis-tick__mark" />
                  <span className="ls2-axis-tick__label">$27K</span>
                </span>
                <span className="ls2-axis-tick" style={{ left: `${getPricePercent(30000)}%` }}>
                  <span className="ls2-axis-tick__mark" />
                  <span className="ls2-axis-tick__label">$30K</span>
                </span>
                <span className="ls2-axis-tick" style={{ left: `${getPricePercent(33000)}%` }}>
                  <span className="ls2-axis-tick__mark" />
                  <span className="ls2-axis-tick__label">$33K</span>
                </span>
                <span className="ls2-axis-tick" style={{ left: `${getPricePercent(36000)}%` }}>
                  <span className="ls2-axis-tick__mark" />
                  <span className="ls2-axis-tick__label">$36K</span>
                </span>
              </div>
            </div>

            {/* CHART LEGEND */}
            <div className="ls2-chart-legend">
              <div className="ls2-legend-item">
                <span className="ls2-legend-dot ls2-legend-dot--green" />
                <span>Good deal — fair price plus quality signals</span>
              </div>
              <div className="ls2-legend-item">
                <span className="ls2-legend-dot ls2-legend-dot--gray" />
                <span>Doesn't clear the bar on price or condition</span>
              </div>
              <div className="ls2-legend-item">
                <span className="ls2-legend-dashed-icon" />
                <span>Dashed line = typical asking price locally</span>
              </div>
            </div>

            {/* TWO SUMMARY CARDS */}
            <div className="ls2-chart-summary-grid">
              <div className="ls2-summary-box">
                <span className="ls2-summary-box__eyebrow">BEST LOCAL PRICE</span>
                <strong className="ls2-summary-box__value">$26,774</strong>
              </div>

              <div className="ls2-summary-box">
                <span className="ls2-summary-box__eyebrow">ONE OWNER, NO ACCIDENTS, LOW MILES</span>
                <div className="ls2-summary-box__value-row">
                  <strong className="ls2-summary-box__value">8 of 24</strong>
                  <a href="#ls2-deals" className="ls2-link ls2-link--inline">See these listings</a>
                </div>
              </div>
            </div>

            {/* ACTION ROW / CALLOUT BANNER */}
            <div className="ls2-chart-action-bar">
              <p className="ls2-chart-action-bar__text">
                <strong>4</strong> of 24 listings rate as a good deal on price and quality. Top pick: No accidents reported.
              </p>
              <a href="#ls2-deals" className="ls2-btn-navy">
                SEE THESE 4 LISTINGS
              </a>
            </div>
          </div>

          {/* METHODOLOGY ACCORDION */}
          <div className="ls2-accordion">
            <button
              type="button"
              className="ls2-accordion__trigger"
              onClick={() => setIsScoredExpanded(!isScoredExpanded)}
              aria-expanded={isScoredExpanded}
            >
              <span>SHOW HOW WE SCORED THIS</span>
              {isScoredExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>

            {isScoredExpanded && (
              <div className="ls2-accordion__content">
                <div className="ls2-methodology-grid">
                  <div className="ls2-methodology-card">
                    <h4>1. Fair Market Price Anchor</h4>
                    <p>
                      We calculate the local baseline ($29,450) by analyzing all active 2024 Honda CR-V dealer listings
                      within your radius.
                    </p>
                  </div>
                  <div className="ls2-methodology-card">
                    <h4>2. Multi-Signal Verification</h4>
                    <p>
                      To qualify as a "Good Deal", a vehicle must be priced at or under fair market <em>and</em> satisfy at least 2 trust factors (one owner, no accidents, low mileage, or recent price drop).
                    </p>
                  </div>
                  <div className="ls2-methodology-card">
                    <h4>3. Transparent Dealer Sourcing</h4>
                    <p>
                      Inventory is synchronized daily from franchised and certified pre-owned dealerships within your market area.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* STRONGEST DEALS NEARBY SECTION */}
        <section id="ls2-deals" className="ls2-deals-section" aria-label="Strongest deals nearby">
          <div className="ls2-deals-head">
            <h3 className="ls2-deals-title">STRONGEST DEALS NEARBY</h3>
            <p className="ls2-deals-subtitle">
              At or under the typical local price, backed by at least two quality signals.
            </p>
          </div>

          <div className="ls2-deals-carousel-wrapper">
            <div className="ls2-deals-grid" ref={dealsRowRef}>
              {DEALS_DATA.map((deal) => (
                <article key={deal.id} className="ls2-deal-card">
                  {/* IMAGE & BADGE */}
                  <div className="ls2-deal-card__media">
                    <OptimizedImage
                      src={deal.image}
                      alt={`${deal.year} ${deal.make} ${deal.model} ${deal.trim}`}
                      aspectRatio="16/10"
                      className="ls2-deal-card__img"
                      wrapperClassName="ls2-deal-card__media-wrapper"
                    />
                    <span className="ls2-deal-badge">GOOD DEAL</span>
                  </div>

                  {/* BODY CONTENT */}
                  <div className="ls2-deal-card__body">
                    <span className="ls2-deal-card__trim">{deal.trim}</span>
                    <h4 className="ls2-deal-card__title">
                      {deal.year} {deal.make} {deal.model}
                    </h4>
                    <div className="ls2-deal-card__price">
                      ${deal.price.toLocaleString()}
                    </div>
                    <div className="ls2-deal-card__specs">
                      {deal.mileage.toLocaleString()} mi · {deal.daysListed} days listed
                    </div>

                    {/* BADGES */}
                    <div className="ls2-deal-card__badges-container">
                      <div className="ls2-deal-card__badge-row">
                        {deal.badgesRow1.map((b, i) => (
                          <span
                            key={i}
                            className={`ls2-deal-pill ls2-deal-pill--${b.variant}`}
                          >
                            {b.text}
                          </span>
                        ))}
                      </div>
                      {deal.badgesRow2 && (
                        <div className="ls2-deal-card__badge-row">
                          {deal.badgesRow2.map((b, i) => (
                            <span
                              key={i}
                              className={`ls2-deal-pill ls2-deal-pill--${b.variant}`}
                            >
                              {b.text}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* DEALER INFO */}
                    <div className="ls2-deal-card__dealer-info">
                      <div className="ls2-deal-card__dealer-name">
                        {deal.dealer} · {deal.distance} mi away
                      </div>
                      <div className="ls2-deal-card__vin">
                        VIN {deal.vin}
                      </div>
                    </div>

                    {/* ACTIONS */}
                    <div className="ls2-deal-card__actions">
                      <a
                        href={deal.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ls2-btn-listing"
                      >
                        VIEW LISTING
                      </a>
                      <button
                        type="button"
                        className="ls2-btn-compare"
                        onClick={() => alert(`Added ${deal.trim} to comparison`)}
                      >
                        COMPARE
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* PAGINATION / NAVIGATION */}
          <div className="ls2-deals-pagination">
            <span className="ls2-deals-pagination__counter">
              Showing 4 of 4 good deals — scroll for more.
            </span>
            <div className="ls2-deals-pagination__buttons">
              <button
                type="button"
                className="ls2-nav-arrow-btn"
                onClick={() => handleScrollDeals('left')}
                aria-label="Previous listings"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                type="button"
                className="ls2-nav-arrow-btn"
                onClick={() => handleScrollDeals('right')}
                aria-label="Next listings"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </section>

        {/* BOTTOM FOOTER CALLOUT BANNER */}
        <section className="ls2-footer-banner">
          <p className="ls2-footer-banner__text">
            Want the full picture? See how prices, supply, and incentives have moved over the last 12 months.
          </p>
          <a
            href="/market-snapshot-concepts"
            className="ls2-btn-market-trends"
          >
            SEE MARKET TRENDS
          </a>
        </section>
      </div>
    </div>
  );
};

export default LocalSignals2;
