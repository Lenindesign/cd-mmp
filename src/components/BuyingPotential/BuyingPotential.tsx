import { useState, useEffect, useMemo, useCallback, useRef, type CSSProperties } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { ChevronDown, Check, ArrowRight, MapPin, X, Zap, ShieldCheck, Gauge, ThumbsDown, ThumbsUp, Sparkles, Wallet } from 'lucide-react';
import { getAllVehicles, getBuyingPotentialVehicles, type BuyingPotentialVehicle } from '../../services/vehicleService';
import { getAllListings, type Listing } from '../../services/listingsService';
import { getVehicleOffers, offersToIncentives, findMatchingIncentiveId } from '../../utils/dealCalculations';
import type { VehicleOfferSummary } from '../../utils/dealCalculations';
import { DEFAULT_STATE_VEHICLE_TAX, STATE_VEHICLE_TAXES } from '../../data/stateVehicleTaxes';
import IncentivesModal from '../IncentivesModal/IncentivesModal';
import type { IncentiveOfferDetail } from '../IncentivesModal/IncentivesModal';
import './BuyingPotential.css';

interface BuyingPotentialProps {
  bodyStyle?: string;
  vehicleName?: string;
  vehicleImage?: string;
}

// Map body styles to display names
const bodyStyleLabels: Record<string, string> = {
  'SUV': 'SUVs',
  'Sedan': 'Sedans',
  'Truck': 'Trucks',
  'Coupe': 'Coupes',
  'Hatchback': 'Hatchbacks',
  'Convertible': 'Convertibles',
  'Wagon': 'Wagons',
};

// Get category description based on body style and price range
const getCategoryLabel = (bodyStyle: string, maxPrice: number): string => {
  const styleLabel = bodyStyleLabels[bodyStyle] || bodyStyle;
  
  if (bodyStyle === 'SUV') {
    if (maxPrice < 35000) return 'Subcompact SUVs';
    if (maxPrice < 50000) return 'Compact SUVs';
    if (maxPrice < 80000) return 'Midsize SUVs';
    return 'Luxury SUVs';
  }
  
  if (bodyStyle === 'Sedan') {
    if (maxPrice < 35000) return 'Compact Sedans';
    if (maxPrice < 50000) return 'Midsize Sedans';
    return 'Luxury Sedans';
  }
  
  if (bodyStyle === 'Truck') {
    if (maxPrice < 45000) return 'Compact Trucks';
    if (maxPrice < 70000) return 'Full-Size Trucks';
    return 'Heavy-Duty Trucks';
  }
  
  return styleLabel;
};

const BODY_STYLE_OPTIONS = ['SUV', 'Sedan', 'Truck', 'Coupe', 'Hatchback', 'Convertible', 'Wagon'];

type TradeInCondition = 'rough' | 'average' | 'clean';

const TRADE_IN_CONDITIONS: Array<{ value: TradeInCondition; label: string; description: string }> = [
  { value: 'rough', label: 'Rough', description: 'Needs visible repairs' },
  { value: 'average', label: 'Average', description: 'Normal wear, runs well' },
  { value: 'clean', label: 'Clean', description: 'Well-kept inside and out' },
];

const MARKETPLACE_URLS = {
  new: 'https://www.caranddriver.com/cars-for-sale/new',
  used: 'https://www.caranddriver.com/cars-for-sale/used',
};

const getMarketplaceVehicleUrl = ({
  condition,
  year,
  make,
  model,
}: {
  condition: 'new' | 'used';
  year: number;
  make: string;
  model: string;
}) => {
  const params = new URLSearchParams({
    year: String(year),
    make,
    model,
  });

  return `${MARKETPLACE_URLS[condition]}?${params.toString()}`;
};

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

const normalizeVehicleSearch = (value: string) => value.toLowerCase().replace(/[^a-z0-9]/g, '');

const formatTradeInVehicle = (vehicle: { year: string; make: string; model: string }) =>
  `${vehicle.year} ${vehicle.make} ${vehicle.model}`;

const estimateTradeInValue = (vehicleDescription: string, mileage: number, condition: TradeInCondition) => {
  const trimmedVehicle = vehicleDescription.trim();
  if (!trimmedVehicle || !mileage) return 0;

  const yearMatch = trimmedVehicle.match(/\b(19|20)\d{2}\b/);
  const vehicleYear = yearMatch ? Number(yearMatch[0]) : new Date().getFullYear() - 5;
  const age = clamp(new Date().getFullYear() - vehicleYear, 0, 25);
  const conditionMultiplier = condition === 'clean' ? 1 : condition === 'average' ? 0.86 : 0.7;
  const expectedMileage = Math.max(age, 1) * 12000;
  const mileageAdjustment = 1 - clamp((mileage - expectedMileage) / 100000, -0.12, 0.35);
  const vehicleText = trimmedVehicle.toLowerCase();
  const brandMultiplier = /toyota|honda|lexus|subaru|porsche/.test(vehicleText)
    ? 1.06
    : /bmw|mercedes|audi|cadillac|lincoln|genesis/.test(vehicleText)
      ? 1.12
      : /kia|hyundai|mazda|ford|chevrolet|chevy|gmc|jeep/.test(vehicleText)
        ? 0.98
        : 1;

  const depreciatedValue = 34000 * Math.pow(0.84, age);
  const estimate = depreciatedValue * mileageAdjustment * conditionMultiplier * brandMultiplier;

  return Math.max(500, Math.round(estimate / 100) * 100);
};

const BuyingPotential = ({
  bodyStyle: initialBodyStyle = 'SUV',
  vehicleName = '2025 Chevrolet Trax',
  vehicleImage = 'https://d2kde5ohu8qb21.cloudfront.net/files/66c5ee7c8a192c000814f46b/suvs-0029-2025-chevrolet-trax.png',
}: BuyingPotentialProps) => {
  const leftContentRef = useRef<HTMLDivElement | null>(null);
  const [vehicleType, setVehicleType] = useState('New car');
  const [bodyStyle, setBodyStyle] = useState(initialBodyStyle);
  const [bodyStyleOpen, setBodyStyleOpen] = useState(false);
  const [downPayment, setDownPayment] = useState(2500);
  const [creditScore, setCreditScore] = useState('Good (670-739)');
  const [monthlyPayment, setMonthlyPayment] = useState(450);
  const [loanTerm, setLoanTerm] = useState(60);
  const [includeTradeIn, setIncludeTradeIn] = useState(false);
  const [tradeInAmount, setTradeInAmount] = useState(0);
  const [selectedStateCode, setSelectedStateCode] = useState(DEFAULT_STATE_VEHICLE_TAX.code);
  const [displayedPower, setDisplayedPower] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [contentHeight, setContentHeight] = useState<number | null>(null);
  const [isTradeInModalOpen, setIsTradeInModalOpen] = useState(false);
  const [tradeInVehicle, setTradeInVehicle] = useState('');
  const [tradeInMileage, setTradeInMileage] = useState('');
  const [tradeInZipCode, setTradeInZipCode] = useState('');
  const [tradeInCondition, setTradeInCondition] = useState<TradeInCondition>('average');
  
  const [vehicleTypeOpen, setVehicleTypeOpen] = useState(false);
  const [creditScoreOpen, setCreditScoreOpen] = useState(false);
  const [loanTermOpen, setLoanTermOpen] = useState(false);
  const [stateTaxOpen, setStateTaxOpen] = useState(false);
  const [modalVehicle, setModalVehicle] = useState<{ vehicle: BuyingPotentialVehicle; offer: VehicleOfferSummary } | null>(null);
  const displayedPowerRef = useRef(0);

  const handleOfferClick = useCallback((e: React.MouseEvent, vehicle: BuyingPotentialVehicle, offer: VehicleOfferSummary) => {
    e.preventDefault();
    e.stopPropagation();
    setModalVehicle({ vehicle, offer });
  }, []);

  const modalOffer: Partial<IncentiveOfferDetail> | undefined = modalVehicle
    ? {
        year: modalVehicle.vehicle.year,
        make: modalVehicle.vehicle.make,
        model: modalVehicle.vehicle.model,
        slug: modalVehicle.vehicle.slug,
        imageUrl: modalVehicle.vehicle.image,
        msrpMin: modalVehicle.vehicle.price,
        msrpMax: modalVehicle.vehicle.price,
        offerHeadline: modalVehicle.offer.label,
      }
    : undefined;

  const vehicleTypes = ['New car', 'Used car'];
  const creditScores = [
    'Excellent (740-850)',
    'Good (670-739)',
    'Fair (580-669)',
    'Poor (300-579)',
  ];
  const loanTerms = [36, 48, 60, 72, 84];
  const selectedStateTax = STATE_VEHICLE_TAXES.find((state) => state.code === selectedStateCode) ?? DEFAULT_STATE_VEHICLE_TAX;
  const tradeInVehicleSuggestions = useMemo(() => {
    const latestByModel = new Map<string, { year: string; make: string; model: string; label: string; searchText: string; image: string }>();

    getAllVehicles().forEach((vehicle) => {
      const modelKey = normalizeVehicleSearch(`${vehicle.make} ${vehicle.model}`);
      const current = latestByModel.get(modelKey);

      if (!current || Number(vehicle.year) > Number(current.year)) {
        latestByModel.set(modelKey, {
          year: vehicle.year,
          make: vehicle.make,
          model: vehicle.model,
          label: formatTradeInVehicle(vehicle),
          searchText: normalizeVehicleSearch(`${vehicle.year} ${vehicle.make} ${vehicle.model}`),
          image: vehicle.image,
        });
      }
    });

    return Array.from(latestByModel.values()).sort((a, b) => a.label.localeCompare(b.label));
  }, []);
  const matchedTradeInVehicle = useMemo(() => {
    const query = normalizeVehicleSearch(tradeInVehicle);
    if (query.length < 3) return null;

    return tradeInVehicleSuggestions.find((vehicle) => {
      const makeModel = normalizeVehicleSearch(`${vehicle.make} ${vehicle.model}`);
      return makeModel === query || vehicle.searchText === query || vehicle.searchText.includes(query);
    }) ?? null;
  }, [tradeInVehicle, tradeInVehicleSuggestions]);
  const parsedTradeInMileage = Number(tradeInMileage);
  const estimatedTradeInValue = useMemo(
    () => estimateTradeInValue(tradeInVehicle, parsedTradeInMileage, tradeInCondition),
    [tradeInVehicle, parsedTradeInMileage, tradeInCondition],
  );
  const canUseTradeInEstimate = estimatedTradeInValue > 0 && tradeInZipCode.trim().length >= 5;
  const selectedApr = useMemo(() => {
    switch (creditScore) {
      case 'Excellent (740-850)': return 5.49;
      case 'Good (670-739)': return 7.57;
      case 'Fair (580-669)': return 11.89;
      case 'Poor (300-579)': return 14.99;
      default: return 7.57;
    }
  }, [creditScore]);

  const { buyingPower, estimatedTax } = useMemo(() => {
    const monthlyRate = selectedApr / 100 / 12;
    const loanAmount = monthlyPayment * ((1 - Math.pow(1 + monthlyRate, -loanTerm)) / monthlyRate);
    const totalAvailable = loanAmount + downPayment + (includeTradeIn ? tradeInAmount : 0);
    const preTaxBuyingPower = totalAvailable / (1 + selectedStateTax.rate);

    return {
      buyingPower: Math.round(preTaxBuyingPower),
      estimatedTax: Math.round(totalAvailable - preTaxBuyingPower),
    };
  }, [monthlyPayment, downPayment, includeTradeIn, tradeInAmount, loanTerm, selectedApr, selectedStateTax.rate]);

  // Get vehicle matches from database based on buying power and body style
  const vehicleMatches = useMemo<BuyingPotentialVehicle[]>(() => {
    if (buyingPower <= 0) return [];
    return getBuyingPotentialVehicles(buyingPower, 20, bodyStyle);
  }, [buyingPower, bodyStyle]);

  // Get used car listings based on buying power and body style
  const usedCarMatches = useMemo<Listing[]>(() => {
    if (buyingPower <= 0) return [];
    const allListings = getAllListings();
    return allListings
      .filter(listing => {
        const matchesPrice = listing.price <= buyingPower;
        const matchesBodyStyle = !bodyStyle || listing.bodyStyle === bodyStyle;
        return matchesPrice && matchesBodyStyle && !listing.isNew;
      })
      .sort((a, b) => b.price - a.price) // Show higher priced first (closer to budget)
      .slice(0, 20);
  }, [buyingPower, bodyStyle]);

  // Determine which matches to show based on vehicle type
  const isUsedMode = vehicleType === 'Used car';
  const currentMatches = isUsedMode ? usedCarMatches : vehicleMatches;
  const matchCount = currentMatches.length;

  // Get dynamic category label
  const categoryLabel = useMemo(() => {
    return getCategoryLabel(bodyStyle, buyingPower);
  }, [bodyStyle, buyingPower]);

  // Animate the displayed buying power when it changes
  useEffect(() => {
    if (buyingPower === displayedPowerRef.current) return;

    let frameId = 0;
    const startValue = displayedPowerRef.current;
    const duration = 500; // Animation duration in ms
    let startTime = 0;

    const animate = (currentTime: number) => {
      if (!startTime) {
        startTime = currentTime;
        setIsAnimating(true);
      }

      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function (ease-out)
      const easeOut = 1 - Math.pow(1 - progress, 3);

      const currentValue = Math.round(startValue + (buyingPower - startValue) * easeOut);
      displayedPowerRef.current = currentValue;
      setDisplayedPower(currentValue);

      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      } else {
        setIsAnimating(false);
      }
    };

    frameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frameId);
  }, [buyingPower]);

  useEffect(() => {
    const leftContent = leftContentRef.current;
    if (!leftContent || typeof ResizeObserver === 'undefined') return;

    const updateContentHeight = () => {
      const parentStyles = leftContent.parentElement
        ? getComputedStyle(leftContent.parentElement)
        : null;
      const verticalPadding = parentStyles
        ? parseFloat(parentStyles.paddingTop) + parseFloat(parentStyles.paddingBottom)
        : 0;

      setContentHeight(Math.ceil(leftContent.getBoundingClientRect().height + verticalPadding));
    };

    updateContentHeight();
    const observer = new ResizeObserver(updateContentHeight);
    observer.observe(leftContent);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isTradeInModalOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsTradeInModalOpen(false);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isTradeInModalOpen]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const handleApplyTradeInEstimate = () => {
    if (!canUseTradeInEstimate) return;

    setIncludeTradeIn(true);
    setTradeInAmount(estimatedTradeInValue);
    setIsTradeInModalOpen(false);
  };

  const handleUseMatchedTradeInVehicle = () => {
    if (!matchedTradeInVehicle) return;

    setTradeInVehicle(matchedTradeInVehicle.label);
  };

  const formatPercent = (value: number) =>
    new Intl.NumberFormat('en-US', {
      style: 'percent',
      minimumFractionDigits: value > 0 && value < 0.01 ? 2 : 1,
      maximumFractionDigits: 2,
    }).format(value);

  const contentStyle = contentHeight
    ? ({ '--buying-potential-content-height': `${contentHeight}px` } as CSSProperties)
    : undefined;

  return (
    <section className="buying-potential">
      <div className="container">
        <div className="buying-potential__card">
          {/* Header - Title and Buying Power side by side */}
          <div className="buying-potential__header">
            <div className="buying-potential__header-left">
              <h2 className="buying-potential__title">
                Auto Loan Calculator
              </h2>
              <p className="buying-potential__description">
                Estimate your buying power with payment, credit, tax, and trade-in details. Then browse matching vehicles, compare offers, or start pre-approval.
              </p>
            </div>
            <div className="buying-potential__header-right">
              <span className={`buying-potential__power-amount ${isAnimating ? 'buying-potential__power-amount--animating' : ''}`}>
                {formatCurrency(displayedPower)}
              </span>
              <span className="buying-potential__power-label">
                <Wallet size={16} strokeWidth={2.25} aria-hidden="true" />
                My Wallet
              </span>
              <div className="buying-potential__power-details">
                <span className="buying-potential__power-apr">{selectedApr}% APR</span>
                <span className="buying-potential__power-separator">•</span>
                <span className="buying-potential__power-term">{loanTerm} months</span>
                <span className="buying-potential__power-separator">•</span>
                <span className="buying-potential__power-monthly">{formatCurrency(monthlyPayment)}/mo</span>
              </div>
            </div>
          </div>

          {/* Content - Form on left, Matches on right */}
          <div className="buying-potential__content" style={contentStyle}>
            {/* Left Side - Calculator Form */}
            <div className="buying-potential__left">
              <div ref={leftContentRef} className="buying-potential__left-content">
                {/* Calculator Form */}
                <div className="buying-potential__form">
                  <div className="buying-potential__row buying-potential__row--single">
                    {/* Vehicle Type */}
                    <div className="buying-potential__field">
                      <label className="buying-potential__label">Looking for</label>
                      <div className="buying-potential__select-wrapper">
                        <button
                          className="buying-potential__select"
                          onClick={() => {
                            setVehicleTypeOpen(!vehicleTypeOpen);
                            setCreditScoreOpen(false);
                            setLoanTermOpen(false);
                            setBodyStyleOpen(false);
                            setStateTaxOpen(false);
                          }}
                        >
                          {vehicleType}
                          <ChevronDown size={16} />
                        </button>
                        {vehicleTypeOpen && (
                          <ul className="buying-potential__options">
                            {vehicleTypes.map((type) => (
                              <li key={type}>
                                <button
                                  className={`buying-potential__option ${vehicleType === type ? 'active' : ''}`}
                                  onClick={() => {
                                    setVehicleType(type);
                                    setVehicleTypeOpen(false);
                                  }}
                                >
                                  {type}
                                </button>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="buying-potential__row">
                    {/* Credit Score */}
                    <div className="buying-potential__field">
                      <label className="buying-potential__label">Credit score</label>
                      <div className="buying-potential__select-wrapper">
                        <button
                          className="buying-potential__select"
                          onClick={() => {
                            setCreditScoreOpen(!creditScoreOpen);
                            setVehicleTypeOpen(false);
                            setLoanTermOpen(false);
                            setBodyStyleOpen(false);
                            setStateTaxOpen(false);
                          }}
                        >
                          {creditScore}
                          <ChevronDown size={16} />
                        </button>
                        {creditScoreOpen && (
                          <ul className="buying-potential__options">
                            {creditScores.map((score) => (
                              <li key={score}>
                                <button
                                  className={`buying-potential__option ${creditScore === score ? 'active' : ''}`}
                                  onClick={() => {
                                    setCreditScore(score);
                                    setCreditScoreOpen(false);
                                  }}
                                >
                                  {score}
                                </button>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>

                    {/* Loan Term */}
                    <div className="buying-potential__field">
                      <label className="buying-potential__label">Loan term</label>
                      <div className="buying-potential__select-wrapper">
                        <button
                          className="buying-potential__select"
                          onClick={() => {
                            setLoanTermOpen(!loanTermOpen);
                            setVehicleTypeOpen(false);
                            setCreditScoreOpen(false);
                            setBodyStyleOpen(false);
                            setStateTaxOpen(false);
                          }}
                        >
                          {loanTerm} months
                          <ChevronDown size={16} />
                        </button>
                        {loanTermOpen && (
                          <ul className="buying-potential__options">
                            {loanTerms.map((term) => (
                              <li key={term}>
                                <button
                                  className={`buying-potential__option ${loanTerm === term ? 'active' : ''}`}
                                  onClick={() => {
                                    setLoanTerm(term);
                                    setLoanTermOpen(false);
                                  }}
                                >
                                  {term} months ({term / 12} years)
                                </button>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="buying-potential__row">
                    {/* Monthly Payment */}
                    <div className="buying-potential__field">
                      <label className="buying-potential__label">Monthly payment</label>
                      <div className="buying-potential__input-wrapper">
                        <span className="buying-potential__input-prefix">$</span>
                        <input
                          type="number"
                          className="buying-potential__input"
                          value={monthlyPayment}
                          onChange={(e) => setMonthlyPayment(Number(e.target.value))}
                          min={100}
                          step={50}
                        />
                      </div>
                    </div>

                    {/* Down Payment */}
                    <div className="buying-potential__field">
                      <label className="buying-potential__label">Down payment</label>
                      <div className="buying-potential__input-wrapper">
                        <span className="buying-potential__input-prefix">$</span>
                        <input
                          type="number"
                          className="buying-potential__input"
                          value={downPayment}
                          onChange={(e) => setDownPayment(Number(e.target.value))}
                          min={0}
                          step={100}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="buying-potential__row buying-potential__row--single">
                    <div className="buying-potential__field">
                      <label className="buying-potential__label">State sales tax</label>
                      <div className="buying-potential__select-wrapper">
                        <button
                          type="button"
                          className="buying-potential__select"
                          onClick={() => {
                            setStateTaxOpen(!stateTaxOpen);
                            setVehicleTypeOpen(false);
                            setCreditScoreOpen(false);
                            setLoanTermOpen(false);
                            setBodyStyleOpen(false);
                          }}
                        >
                          <span>{selectedStateTax.name}</span>
                          <span className="buying-potential__select-meta">
                            {formatPercent(selectedStateTax.rate)}
                            <ChevronDown size={16} />
                          </span>
                        </button>
                        {stateTaxOpen && (
                          <ul className="buying-potential__options buying-potential__options--scroll">
                            {STATE_VEHICLE_TAXES.map((state) => (
                              <li key={state.code}>
                                <button
                                  type="button"
                                  className={`buying-potential__option buying-potential__option--with-meta ${selectedStateCode === state.code ? 'active' : ''}`}
                                  onClick={() => {
                                    setSelectedStateCode(state.code);
                                    setStateTaxOpen(false);
                                  }}
                                >
                                  <span>{state.name}</span>
                                  <span>{formatPercent(state.rate)}</span>
                                </button>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                      <p className="buying-potential__tax-note">
                        Est. {selectedStateTax.code} tax: <strong>{formatCurrency(estimatedTax)}</strong>. Local taxes and fees may vary.
                      </p>
                    </div>
                  </div>

                  {/* Trade-in Toggle */}
                  <div className="buying-potential__toggle-row">
                    <label className="buying-potential__toggle">
                      <input
                        type="checkbox"
                        checked={includeTradeIn}
                        onChange={(e) => setIncludeTradeIn(e.target.checked)}
                      />
                      <span className="buying-potential__toggle-slider"></span>
                    </label>
                    <span className="buying-potential__toggle-label">Include trade-in</span>
                  </div>

                  {/* Trade-in Amount Input - Shows when toggle is on */}
                  {includeTradeIn && (
                    <div className="buying-potential__trade-in-field">
                      <div className="buying-potential__trade-in-label-row">
                        <label className="buying-potential__label">Trade-in amount</label>
                        {tradeInVehicle.trim() && (
                          <span className="buying-potential__trade-in-vehicle">
                            {tradeInVehicle.trim()}
                          </span>
                        )}
                      </div>
                      <div className="buying-potential__input-wrapper buying-potential__input-wrapper--full">
                        <span className="buying-potential__input-prefix">$</span>
                        <input
                          type="number"
                          className="buying-potential__input"
                          value={tradeInAmount}
                          onChange={(e) => setTradeInAmount(Number(e.target.value))}
                          min={0}
                          step={100}
                          placeholder="0"
                        />
                      </div>
                      <button
                        type="button"
                        className="buying-potential__trade-in-link"
                        onClick={() => setIsTradeInModalOpen(true)}
                      >
                        Don't know your car's value? Get an estimate →
                      </button>
                    </div>
                  )}
                </div>

                {/* CTA Buttons */}
                <div className="buying-potential__cta-group">
                  <Link 
                    to={isUsedMode 
                      ? `/vehicles?type=used&maxPrice=${buyingPower}&bodyStyle=${bodyStyle}`
                      : `/vehicles?maxPrice=${buyingPower}&bodyStyle=${bodyStyle}`
                    }
                    className="buying-potential__cta buying-potential__cta--primary"
                  >
                    See All {isUsedMode ? 'Used ' : ''}{categoryLabel} Under {formatCurrency(buyingPower)}
                    <ArrowRight size={18} />
                  </Link>
                </div>

                {/* Disclaimer */}
                <p className="buying-potential__disclaimer">
                  *Rates may vary based on credit history and lender. This calculator provides estimates only. 
                  Actual rates as of December 2025.
                </p>
              </div>
            </div>

            {/* Right Side - Vehicle Matches */}
            <div className="buying-potential__right">
              {matchCount > 0 ? (
                <div className="buying-potential__matches">
                  <div className="buying-potential__matches-header">
                    <h3 className="buying-potential__matches-title">
                      <span>
                        {isUsedMode ? `Used ${categoryLabel}` : categoryLabel.toUpperCase()} IN YOUR BUDGET
                      </span>
                      <span className="buying-potential__matches-count">{matchCount} found</span>
                    </h3>
                    <div className="buying-potential__body-style-select">
                      <button
                        type="button"
                        className="buying-potential__body-style-btn"
                        onClick={() => {
                          setBodyStyleOpen(!bodyStyleOpen);
                          setVehicleTypeOpen(false);
                          setCreditScoreOpen(false);
                          setLoanTermOpen(false);
                        }}
                      >
                        {bodyStyle}
                        <ChevronDown size={14} />
                      </button>
                      {bodyStyleOpen && (
                        <ul className="buying-potential__body-style-options">
                          {BODY_STYLE_OPTIONS.map((style) => (
                            <li key={style}>
                              <button
                                type="button"
                                className={`buying-potential__body-style-option ${bodyStyle === style ? 'active' : ''}`}
                                onClick={() => { setBodyStyle(style); setBodyStyleOpen(false); }}
                              >
                                {style}
                              </button>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                  <div className="buying-potential__matches-list">
                    {isUsedMode ? (
                      // Used car listings
                      usedCarMatches.map((listing, index) => (
                        <a
                          key={index}
                          href={getMarketplaceVehicleUrl({
                            condition: 'used',
                            year: listing.year,
                            make: listing.make,
                            model: listing.model,
                          })}
                          className="buying-potential__match buying-potential__match--used"
                        >
                          <img src={listing.image} alt={`${listing.year} ${listing.make} ${listing.model}`} className="buying-potential__match-image" />
                          <div className="buying-potential__match-info">
                            <span className="buying-potential__match-name">{listing.year} {listing.make} {listing.model}</span>
                            <span className="buying-potential__match-trim">
                              {listing.trim}
                            </span>
                            <span className="buying-potential__match-dealer">
                              <MapPin size={12} />
                              {listing.mileage.toLocaleString()} miles
                            </span>
                            <span className="buying-potential__match-price">{formatCurrency(listing.price)}</span>
                          </div>
                          <div className="buying-potential__match-check"><Check size={12} /></div>
                        </a>
                      ))
                    ) : (
                      // New vehicles
                      vehicleMatches.map((vehicle, index) => {
                        const offers = getVehicleOffers(vehicle.make, vehicle.model);
                        const primaryOffer = offers[0] ?? null;
                        return (
                          <a
                            key={index}
                            href={getMarketplaceVehicleUrl({
                              condition: 'new',
                              year: vehicle.year,
                              make: vehicle.make,
                              model: vehicle.model,
                            })}
                            className="buying-potential__match"
                          >
                            <div className="buying-potential__match-image-cell">
                              <img src={vehicle.image} alt={vehicle.name} />
                            </div>
                            <div className="buying-potential__match-body">
                              <div className="buying-potential__match-rating">
                                <span className="buying-potential__match-rating-check" aria-hidden="true">&#10003;</span>
                                <span className="buying-potential__match-rating-label">C/D RATING:</span>
                                <span className="buying-potential__match-rating-value">{vehicle.rating}/10</span>
                              </div>
                              <span className="buying-potential__match-name">{vehicle.name}</span>
                              {primaryOffer ? (
                                <>
                                  <button
                                    type="button"
                                    className="buying-potential__match-offer"
                                    onClick={(e) => handleOfferClick(e, vehicle, primaryOffer)}
                                  >
                                    {primaryOffer.label}
                                  </button>
                                  {offers.length > 1 && (
                                    <span className="buying-potential__match-more">
                                      +{offers.length - 1} more offer{offers.length - 1 > 1 ? 's' : ''}
                                    </span>
                                  )}
                                </>
                              ) : (
                                <span className="buying-potential__match-price">Starting at {formatCurrency(vehicle.price)}</span>
                              )}
                            </div>
                            <div className="buying-potential__match-check"><Check size={12} /></div>
                          </a>
                        );
                      })
                    )}
                  </div>
                </div>
              ) : (
                <div className="buying-potential__no-matches">
                  <div className="buying-potential__no-matches-image">
                    <img 
                      src={vehicleImage} 
                      alt={vehicleName}
                    />
                  </div>
                  <div className="buying-potential__no-matches-content">
                    <h3 className="buying-potential__no-matches-title">
                      No {isUsedMode ? `Used ${categoryLabel}` : categoryLabel} Found
                    </h3>
                    <p className="buying-potential__no-matches-text">
                      Your current budget of <strong>{formatCurrency(buyingPower)}</strong> doesn't match any {isUsedMode ? 'used ' : ''}{categoryLabel.toLowerCase()} in our database.
                    </p>
                    <div className="buying-potential__no-matches-tips">
                      <p className="buying-potential__no-matches-tip">
                        <strong>💡 Tips to see more vehicles:</strong>
                      </p>
                      <ul className="buying-potential__no-matches-list">
                        <li>Increase your <strong>monthly payment</strong></li>
                        <li>Add a larger <strong>down payment</strong></li>
                        <li>Consider a longer <strong>loan term</strong></li>
                        <li>Include a <strong>trade-in</strong> vehicle</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <IncentivesModal
        isOpen={!!modalVehicle}
        onClose={() => setModalVehicle(null)}
        variant="conversion-b"
        offer={modalOffer}
        allIncentives={modalVehicle ? offersToIncentives(modalVehicle.vehicle.make, modalVehicle.vehicle.model) : undefined}
        selectedIncentiveId={modalVehicle
          ? findMatchingIncentiveId(
              modalVehicle.vehicle.make,
              modalVehicle.vehicle.model,
              modalVehicle.offer.type === 'zero-apr' ? 'zero-apr' : modalVehicle.offer.type,
            )
          : undefined
        }
      />
      {isTradeInModalOpen && typeof document !== 'undefined' && createPortal(
        <div
          className="trade-in-modal__overlay"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setIsTradeInModalOpen(false);
            }
          }}
        >
          <section
            className="trade-in-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="trade-in-modal-title"
          >
            <div className="trade-in-modal__masthead">
              <div className="trade-in-modal__brand-lockup" aria-label="Powered by Car and Driver and Black Book">
                <svg
                  viewBox="0 0 1364 262"
                  className="trade-in-modal__logo"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-label="Car and Driver"
                  role="img"
                >
                  <path fill="currentColor" d="M68.022 210.901C74.858 210.901 76.91 205.432 76.91 197.571V146.641H132.626V199.276C132.626 231.41 116.903 261.83 72.468 261.83H62.554C15.04 261.83 0 233.462 0 194.496V65.289C0 28.712 16.408 0 62.213 0H72.468C117.588 0 132.626 25.978 132.626 59.473V101.177H76.91V61.869C76.91 53.667 74.858 49.222 67.682 49.222C60.502 49.222 58.452 52.982 58.452 61.869V197.571C58.452 206.114 60.846 210.901 68.022 210.901Z"/>
                  <path fill="currentColor" d="M272.324 257.729H217.63L213.53 220.47H187.551L183.791 257.729H134.911L167.384 3.41907H236.774L272.324 257.729ZM192.681 170.223H208.402L200.54 92.9747L192.681 170.223Z"/>
                  <path fill="currentColor" d="M366.797 3.41907C391.752 3.41907 408.842 18.1158 408.842 48.1925V81.6935C408.842 105.278 396.534 115.873 386.624 120.318C396.194 124.079 408.842 134.331 408.842 153.477V237.561C408.842 247.13 410.55 252.601 412.258 256.021V257.729H356.542C354.149 254.654 352.101 248.844 352.101 239.616V165.781C352.101 157.237 350.047 153.477 342.527 153.477H334.666V257.729H278.268V3.41907H366.797ZM334.665 105.623H341.845C349.021 105.623 352.1 102.203 352.1 93.3126V59.1349C352.1 50.245 350.391 47.1691 342.871 47.1691H334.666L334.665 105.623Z"/>
                  <path d="M428.499 63.023H594.769V3.61597H428.5L428.499 63.023Z" fill="#D2232A"/>
                  <path d="M428.499 257.046H594.769V197.644H428.5L428.499 257.046Z" fill="#0061AF"/>
                  <path fill="currentColor" d="M481.039 182.672H461.599L460.098 167.332H449.987L448.607 182.672H430.7L442.597 77.9894H468.019L481.039 182.672ZM451.864 147.839H458.219L454.742 111.882L451.864 147.839Z"/>
                  <path fill="currentColor" d="M486.974 182.672V77.9889H507.008L517.652 128.64V77.9889H535.31V182.671H517.152L504.881 128.077V182.672H486.974Z"/>
                  <path fill="currentColor" d="M573.909 77.9874C585.429 77.9875 592.567 84.3239 592.567 101.067V158.609C592.567 174.929 586.18 182.672 574.035 182.672H544.356V77.9874H573.909ZM564.175 162.549H567.647C570.653 162.549 571.531 160.579 571.531 156.219V103.459C571.531 99.2341 570.653 97.4093 567.898 97.4093H564.175V162.549Z"/>
                  <path fill="currentColor" d="M696.341 3.41907C727.79 3.41907 747.273 18.8019 747.273 59.4728V199.276C747.273 238.928 729.839 257.729 696.682 257.729H615.674V3.41907H696.341ZM671.389 208.852H679.251C687.454 208.852 689.847 204.065 689.847 193.469V65.2892C689.847 55.0342 687.453 50.589 679.933 50.589H671.389V208.852Z"/>
                  <path fill="currentColor" d="M845.438 3.41907C870.393 3.41907 887.48 18.1158 887.48 48.1925V81.6935C887.48 105.278 875.177 115.873 865.264 120.318C874.833 124.079 887.48 134.331 887.48 153.477V237.561C887.48 247.13 889.191 252.601 890.899 256.021V257.729H835.183C832.79 254.654 830.738 248.844 830.738 239.616V165.781C830.738 157.237 828.689 153.477 821.169 153.477H813.307L813.308 257.729H756.907V3.41907H845.438ZM813.307 105.623H820.482C827.662 105.623 830.737 102.203 830.737 93.3126V59.1349C830.737 50.245 829.03 47.1691 821.51 47.1691H813.307V105.623Z"/>
                  <path fill="currentColor" d="M956.492 257.732H900.092V3.41895H956.492V257.732Z"/>
                  <path fill="currentColor" d="M1073.15 257.729H999.319L962.748 3.41895H1022.22L1037.6 162.705L1052.99 3.41895H1107.34L1073.15 257.729Z"/>
                  <path fill="currentColor" d="M1113.59 257.729V3.41895H1219.21V56.0569H1169.3V99.4689H1209.3V153.477H1169.3V204.065H1221.26V257.729H1113.59Z"/>
                  <path fill="currentColor" d="M1285.45 47.1689H1293.65C1301.17 47.1689 1302.88 50.2449 1302.88 59.1349V93.313C1302.88 102.203 1299.81 105.623 1292.63 105.623H1285.45V47.1689ZM1285.45 153.477H1293.31C1300.83 153.477 1302.88 157.237 1302.88 165.781V239.616C1302.88 248.844 1304.93 254.654 1307.33 257.729H1363.04V256.021C1361.33 252.601 1359.62 247.131 1359.62 237.561V153.477C1359.62 134.331 1346.98 124.08 1337.41 120.319C1347.32 115.874 1359.62 105.279 1359.62 81.6939V48.1929C1359.62 18.1159 1342.54 3.41895 1317.58 3.41895H1229.05V257.729H1285.45V153.477Z"/>
                </svg>
                <span className="trade-in-modal__brand-plus" aria-hidden="true">+</span>
                <svg
                  viewBox="86 31 124 65"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-label="Black Book"
                  role="img"
                  className="trade-in-modal__black-book-logo"
                >
                  <path
                    d="M159.5,70 C162.234825,70 164,72.2783462 164,74.9997043 C164,77.7222452 162.234825,80 159.5,80 C156.765175,80 155,77.7222452 155,74.9997043 C155,72.2783462 156.765175,70 159.5,70 Z M121,71.5 C121,72.5636085 120.269394,73 118.980818,73 L117,73 L117,70 L118.980818,70 C120.115374,70 121,70.4363915 121,71.5 Z M119.622941,76 C120.975592,76 122,76.5809809 122,77.9996846 C122,79.4190191 120.975592,80 119.622941,80 L117,80 L117,76 L119.622941,76 Z M142,54 L144,49 L146,54 L142,54 Z M112,49.4994884 C112,50.5636085 111.269394,51 109.980818,51 L108,51 L108,48 L109.980818,48 C111.115374,48 112,48.4363915 112,49.4994884 Z M138.5,70 C141.234825,70 143,72.2783462 143,74.9997043 C143,77.7222452 141.234825,80 138.5,80 C135.765175,80 134,77.7222452 134,74.9997043 C134,72.2783462 135.765175,70 138.5,70 Z M184.291206,59.3020233 L187.4771,59.3020233 L181.305202,52.1677264 L186.796298,45.2744729 L183.789717,45.2744729 L178.780121,51.5668816 L178.780121,45.2744729 L176.375562,45.2744729 L176.375562,59.3020233 L178.780121,59.3020233 L178.780121,52.9696367 L184.291206,59.3020233 Z M181.488043,81.7513952 L184.674524,81.7513952 L178.502039,74.6170983 L183.993723,67.7226689 L180.987142,67.7226689 L175.976958,74.0156656 L175.976958,67.7226689 L173.572398,67.7226689 L173.572398,81.7513952 L175.976958,81.7513952 L175.976958,75.4184206 L181.488043,81.7513952 Z M163.837167,59.5424788 C167.384039,59.5424788 169.22773,57.1585007 169.22773,57.1585007 L167.624495,55.5746692 C167.624495,55.5746692 166.302281,57.2984235 163.837167,57.2984235 C161.07163,57.2984235 159.167972,54.9938134 159.167972,52.2882481 C159.167972,49.5826829 161.07163,47.2780727 163.837167,47.2780727 C166.141782,47.2780727 167.404028,48.8213384 167.404028,48.8213384 L169.02784,47.2380948 C169.02784,47.2380948 167.204138,45.0328416 163.837167,45.0328416 C159.788807,45.0328416 156.722847,48.1399499 156.722847,52.2882481 C156.722847,56.4359584 159.788807,59.5424788 163.837167,59.5424788 Z M159.444291,81.9918507 C163.532041,81.9918507 166.538622,78.8853303 166.538622,74.737032 C166.538622,70.5887338 163.532041,67.4822134 159.444291,67.4822134 C155.355952,67.4822134 152.349959,70.5887338 152.349959,74.737032 C152.349959,78.8853303 155.355952,81.9918507 159.444291,81.9918507 Z M148.353335,59.3020233 L150.777883,59.3020233 L145.326765,45.2744729 L142.88164,45.2744729 L137.43111,59.3020233 L139.855658,59.3020233 L141.138482,55.9756243 L147.070511,55.9756243 L148.353335,59.3020233 Z M138.221851,81.9918507 C142.309602,81.9918507 145.316183,78.8853303 145.316183,74.737032 C145.316183,70.5887338 142.309602,67.4822134 138.221851,67.4822134 C134.134101,67.4822134 131.128108,70.5887338 131.128108,74.737032 C131.128108,78.8853303 134.134101,81.9918507 138.221851,81.9918507 Z M122.409964,59.3020233 L130.787119,59.3020233 L131.530827,57.0174022 L124.814523,57.0174022 L124.814523,45.2744729 L122.409964,45.2744729 L122.409964,59.3020233 Z M119.404559,81.7513952 C122.050162,81.7513952 124.094331,80.0676188 124.094331,77.602509 C124.094331,75.0774324 122.110129,74.3560659 121.910239,74.316088 C122.110129,74.2561211 123.372964,73.4342218 123.372964,71.7310444 C123.372964,68.7850237 121.188871,67.7226689 118.903658,67.7226689 L114.354397,67.7226689 L114.354397,81.7513952 L119.404559,81.7513952 Z M105.813215,59.3020233 L110.862789,59.3020233 C113.508392,59.3020233 115.552561,57.6188349 115.552561,55.1531372 C115.552561,52.6286484 113.568359,51.9078699 113.367881,51.867304 C113.568359,51.8073371 114.831193,50.9854379 114.831193,49.2816726 C114.831193,46.3362397 112.646513,45.2744729 110.361888,45.2744729 L105.813215,45.2744729 L105.813215,59.3020233 Z M193.978816,31 L210,96 L102.020596,96 L86,31 L193.978816,31 Z M110.622941,53 C111.975592,53 113,53.5804416 113,54.9993691 C113,56.4195584 111.975592,57 110.622941,57 L108,57 L108,53 L110.622941,53 Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <button
                type="button"
                className="trade-in-modal__close"
                onClick={() => setIsTradeInModalOpen(false)}
                aria-label="Close trade-in estimator"
              >
                <X size={18} />
              </button>
            </div>

            <div className="trade-in-modal__steps" aria-label="Estimate benefits">
              <span>
                <Zap size={17} />
                <strong>Fast</strong>
                <small>About 30 seconds</small>
              </span>
              <span>
                <Gauge size={17} />
                <strong>Easy</strong>
                <small>Only the basics</small>
              </span>
              <span>
                <ShieldCheck size={17} />
                <strong>Dealer-ready</strong>
                <small>Built for planning</small>
              </span>
            </div>

            <div className="trade-in-modal__intro">
              <h2 id="trade-in-modal-title">Get a quick trade-in estimate</h2>
              <p>
                Add a few details and we’ll drop the estimate into your buying power.
                No account, no extra page.
              </p>
            </div>

            <div className="trade-in-modal__body">
              <div className="trade-in-modal__form">
                <label className="trade-in-modal__field">
                  <span>Current vehicle</span>
                  <input
                    type="text"
                    value={tradeInVehicle}
                    onChange={(event) => setTradeInVehicle(event.target.value)}
                    onBlur={() => {
                      if (matchedTradeInVehicle) {
                        setTradeInVehicle(matchedTradeInVehicle.label);
                      }
                    }}
                    placeholder="Year, make, and model"
                    list="trade-in-vehicle-options"
                    aria-describedby={matchedTradeInVehicle ? 'trade-in-vehicle-match' : undefined}
                  />
                  <datalist id="trade-in-vehicle-options">
                    {tradeInVehicleSuggestions.slice(0, 80).map((vehicle) => (
                      <option key={vehicle.label} value={vehicle.label} />
                    ))}
                  </datalist>
                  {matchedTradeInVehicle && tradeInVehicle !== matchedTradeInVehicle.label && (
                    <button
                      id="trade-in-vehicle-match"
                      type="button"
                      className="trade-in-modal__vehicle-match"
                      onMouseDown={(event) => event.preventDefault()}
                      onClick={handleUseMatchedTradeInVehicle}
                    >
                      Use {matchedTradeInVehicle.label}
                    </button>
                  )}
                </label>

                <div className="trade-in-modal__field-grid">
                  <label className="trade-in-modal__field">
                    <span>Mileage</span>
                    <input
                      type="number"
                      value={tradeInMileage}
                      onChange={(event) => setTradeInMileage(event.target.value)}
                      placeholder="45,000"
                      min={0}
                      step={500}
                    />
                  </label>
                  <label className="trade-in-modal__field">
                    <span>ZIP code</span>
                    <input
                      type="text"
                      value={tradeInZipCode}
                      onChange={(event) => setTradeInZipCode(event.target.value.replace(/\D/g, '').slice(0, 5))}
                      placeholder="90210"
                      inputMode="numeric"
                    />
                  </label>
                </div>

                <fieldset className="trade-in-modal__condition">
                  <legend>Your vehicle’s condition</legend>
                  <div className="trade-in-modal__condition-options">
                    {TRADE_IN_CONDITIONS.map((condition) => (
                      <button
                        key={condition.value}
                        type="button"
                        className={`trade-in-modal__condition-option ${tradeInCondition === condition.value ? 'trade-in-modal__condition-option--active' : ''}`}
                        onClick={() => setTradeInCondition(condition.value)}
                      >
                        <span className="trade-in-modal__condition-icon" aria-hidden="true">
                          {condition.value === 'rough' && <ThumbsDown size={22} />}
                          {condition.value === 'average' && <ThumbsUp size={22} />}
                          {condition.value === 'clean' && (
                            <>
                              <Sparkles size={13} className="trade-in-modal__condition-sparkle trade-in-modal__condition-sparkle--one" />
                              <Sparkles size={10} className="trade-in-modal__condition-sparkle trade-in-modal__condition-sparkle--two" />
                              <ThumbsUp size={22} />
                            </>
                          )}
                        </span>
                        <span>{condition.label}</span>
                        <small>{condition.description}</small>
                      </button>
                    ))}
                  </div>
                </fieldset>
              </div>

              <aside className="trade-in-modal__estimate" aria-live="polite">
                {matchedTradeInVehicle?.image && (
                  <div className="trade-in-modal__estimate-vehicle">
                    <img
                      src={matchedTradeInVehicle.image}
                      alt={matchedTradeInVehicle.label}
                    />
                  </div>
                )}
                <span className="trade-in-modal__estimate-label">Estimated trade-in value</span>
                <strong>{estimatedTradeInValue ? formatCurrency(estimatedTradeInValue) : 'Add vehicle details'}</strong>
                <p>
                  This is a quick planning estimate. A dealer appraisal can adjust for
                  trim, options, history, and local demand.
                </p>
              </aside>
            </div>

            <div className="trade-in-modal__actions">
              <button
                type="button"
                className="trade-in-modal__secondary"
                onClick={() => setIsTradeInModalOpen(false)}
              >
                Not now
              </button>
              <button
                type="button"
                className="trade-in-modal__primary"
                onClick={handleApplyTradeInEstimate}
                disabled={!canUseTradeInEstimate}
              >
                Use this estimate
              </button>
            </div>
          </section>
        </div>,
        document.body,
      )}
    </section>
  );
};

export default BuyingPotential;
