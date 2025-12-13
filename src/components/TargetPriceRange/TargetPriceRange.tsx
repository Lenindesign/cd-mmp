import { useState, useMemo } from 'react';
import { Info, Tag, Target, Search, TrendingDown, CheckCircle, Clock, Percent, ChevronDown } from 'lucide-react';
import './TargetPriceRange.css';

interface TrimData {
  name: string;
  msrp: number;
}

interface TrimPriceData {
  msrp: number;
  dealerPrice: number;
  targetPriceLow: number;
  targetPriceHigh: number;
}

interface TargetPriceRangeProps {
  msrp?: number;
  trims?: TrimData[];
  vehicleName?: string;
}

// Default trims for Chevrolet Trax
const defaultTrims: TrimData[] = [
  { name: 'LS FWD', msrp: 21895 },
  { name: '1RS FWD', msrp: 23195 },
  { name: 'LT FWD', msrp: 23395 },
  { name: 'RS FWD', msrp: 24995 },
  { name: 'ACTIV FWD', msrp: 24995 },
];

// Calculate pricing based on MSRP
const calculatePricing = (msrp: number): TrimPriceData => {
  // Pricing varies by vehicle price tier
  if (msrp > 200000) {
    // Exotic/supercar - minimal or no discount, possible market adjustment
    return {
      msrp,
      dealerPrice: Math.round(msrp * 1.05), // 5% markup for hot exotics
      targetPriceLow: Math.round(msrp * 0.98), // Best case: MSRP - 2%
      targetPriceHigh: msrp, // Fair: At MSRP
    };
  } else if (msrp > 100000) {
    // Luxury vehicles - smaller discounts
    return {
      msrp,
      dealerPrice: Math.round(msrp * 1.02), // 2% markup
      targetPriceLow: Math.round(msrp * 0.95), // 5% below MSRP
      targetPriceHigh: Math.round(msrp * 0.98), // 2% below MSRP
    };
  } else if (msrp > 50000) {
    // Mid-luxury vehicles
    return {
      msrp,
      dealerPrice: Math.round(msrp * 1.015), // 1.5% markup
      targetPriceLow: Math.round(msrp * 0.93), // 7% below MSRP
      targetPriceHigh: Math.round(msrp * 0.97), // 3% below MSRP
    };
  } else {
    // Economy/mainstream vehicles - best negotiation room
    return {
      msrp,
      dealerPrice: Math.round(msrp * 1.01), // 1% markup
      targetPriceLow: Math.round(msrp * 0.92), // 8% below MSRP
      targetPriceHigh: Math.round(msrp * 0.97), // 3% below MSRP
    };
  }
};

// Generate trims based on base MSRP for vehicles without specific trim data
const generateTrimsFromMSRP = (baseMsrp: number): TrimData[] => {
  // For economy vehicles (under $35k)
  if (baseMsrp < 35000) {
    return [
      { name: 'Base', msrp: baseMsrp },
      { name: 'Sport', msrp: Math.round(baseMsrp * 1.08) },
      { name: 'Premium', msrp: Math.round(baseMsrp * 1.15) },
    ];
  }
  // For mid-range vehicles ($35k-$80k)
  if (baseMsrp < 80000) {
    return [
      { name: 'Base', msrp: baseMsrp },
      { name: 'Sport', msrp: Math.round(baseMsrp * 1.10) },
      { name: 'Premium', msrp: Math.round(baseMsrp * 1.18) },
      { name: 'Performance', msrp: Math.round(baseMsrp * 1.25) },
    ];
  }
  // For luxury/exotic vehicles ($80k+)
  return [
    { name: 'Base', msrp: baseMsrp },
    { name: 'Performance', msrp: Math.round(baseMsrp * 1.15) },
    { name: 'Track', msrp: Math.round(baseMsrp * 1.30) },
  ];
};

const TargetPriceRange = ({
  msrp = 21895,
  trims,
  vehicleName = 'Chevrolet Trax',
}: TargetPriceRangeProps) => {
  // Determine which trims to use
  const availableTrims = useMemo(() => {
    if (trims && trims.length > 0) return trims;
    // Use default trims for Chevrolet Trax
    if (vehicleName === 'Chevrolet Trax') return defaultTrims;
    // Generate trims for other vehicles
    return generateTrimsFromMSRP(msrp);
  }, [trims, vehicleName, msrp]);

  const [selectedTrimIndex, setSelectedTrimIndex] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  const selectedTrim = availableTrims[selectedTrimIndex];
  
  // Calculate pricing based on selected trim's MSRP
  const trimData = useMemo(() => calculatePricing(selectedTrim.msrp), [selectedTrim.msrp]);
  const { dealerPrice, targetPriceLow, targetPriceHigh } = trimData;
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  // Calculate savings and percentages
  const savingsLow = dealerPrice - targetPriceLow;
  const savingsHigh = dealerPrice - targetPriceHigh;
  const discountLow = ((savingsLow / dealerPrice) * 100).toFixed(1);
  const discountHigh = ((savingsHigh / dealerPrice) * 100).toFixed(1);

  return (
    <section className="target-price">
      <div className="container">
        <div className="target-price__card">
          {/* Header */}
          <div className="target-price__header">
            <div className="target-price__header-row">
              <h2 className="target-price__title">Target Price Range</h2>
              
              {/* Trim Selector */}
              <div className="target-price__trim">
                <span className="target-price__trim-label">Trim:</span>
                <div className="target-price__select-wrapper">
                  <button
                    className="target-price__select"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  >
                    {selectedTrim.name}
                    <ChevronDown size={16} />
                  </button>
                  {isDropdownOpen && (
                    <ul className="target-price__options">
                      {availableTrims.map((trim, index) => (
                        <li key={trim.name}>
                          <button
                            className={`target-price__option ${selectedTrimIndex === index ? 'active' : ''}`}
                            onClick={() => {
                              setSelectedTrimIndex(index);
                              setIsDropdownOpen(false);
                            }}
                          >
                            {trim.name}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
            <p className="target-price__description">
              The Target Price is the deal you should aim for after negotiating.
            </p>
          </div>

          {/* Visual Range */}
          <div className="target-price__range-visual">
            {/* Target Range Markers */}
            <div className="target-price__markers">
              <div 
                className="target-price__marker target-price__marker--start"
                onMouseEnter={() => setActiveTooltip('low')}
                onMouseLeave={() => setActiveTooltip(null)}
              >
                <div className="target-price__marker-price">{formatPrice(targetPriceLow)}</div>
                <div className="target-price__marker-icon target-price__marker-icon--green">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                  </svg>
                </div>
                <div className="target-price__marker-pin target-price__marker-pin--green"></div>
                
                {/* Tooltip for Low Price */}
                {activeTooltip === 'low' && (
                  <div className="target-price__tooltip">
                    <div className="target-price__tooltip-header">
                      <CheckCircle size={16} className="target-price__tooltip-icon target-price__tooltip-icon--success" />
                      <span className="target-price__tooltip-title">Best Possible Deal</span>
                    </div>
                    <div className="target-price__tooltip-content">
                      <div className="target-price__tooltip-row">
                        <TrendingDown size={14} />
                        <span>Save <strong>{formatPrice(savingsLow)}</strong> vs dealer price</span>
                      </div>
                      <div className="target-price__tooltip-row">
                        <Percent size={14} />
                        <span><strong>{discountLow}%</strong> below asking price</span>
                      </div>
                      <div className="target-price__tooltip-row">
                        <Clock size={14} />
                        <span>Achievable at month-end or during clearance events</span>
                      </div>
                    </div>
                    <div className="target-price__tooltip-tip">
                      💡 Ask about dealer incentives & rebates
                    </div>
                  </div>
                )}
              </div>
              
              <div className="target-price__target-label">
                <span className="target-price__dashed-line target-price__dashed-line--left"></span>
                <span className="target-price__target-text">Target Range</span>
                <span className="target-price__dashed-line target-price__dashed-line--right"></span>
              </div>
              
              <div 
                className="target-price__marker target-price__marker--end"
                onMouseEnter={() => setActiveTooltip('high')}
                onMouseLeave={() => setActiveTooltip(null)}
              >
                <div className="target-price__marker-price">{formatPrice(targetPriceHigh)}</div>
                <div className="target-price__marker-icon target-price__marker-icon--green">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                  </svg>
                </div>
                <div className="target-price__marker-pin target-price__marker-pin--green"></div>
                
                {/* Tooltip for High Price */}
                {activeTooltip === 'high' && (
                  <div className="target-price__tooltip">
                    <div className="target-price__tooltip-header">
                      <Target size={16} className="target-price__tooltip-icon target-price__tooltip-icon--fair" />
                      <span className="target-price__tooltip-title">Fair Market Deal</span>
                    </div>
                    <div className="target-price__tooltip-content">
                      <div className="target-price__tooltip-row">
                        <TrendingDown size={14} />
                        <span>Save <strong>{formatPrice(savingsHigh)}</strong> vs dealer price</span>
                      </div>
                      <div className="target-price__tooltip-row">
                        <Percent size={14} />
                        <span><strong>{discountHigh}%</strong> below asking price</span>
                      </div>
                      <div className="target-price__tooltip-row">
                        <Clock size={14} />
                        <span>Achievable with standard negotiation</span>
                      </div>
                    </div>
                    <div className="target-price__tooltip-tip">
                      💡 Most buyers achieve this price range
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Range Bar */}
            <div className="target-price__bar">
              <div className="target-price__bar-track"></div>
              <div className="target-price__bar-range"></div>
              <div className="target-price__bar-dealer">
                <div className="target-price__dealer-dot"></div>
                <div className="target-price__dealer-tooltip">
                  <span className="target-price__dealer-label">Dealer Listed Price</span>
                  <span className="target-price__dealer-value">{formatPrice(dealerPrice)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Info Boxes */}
          <div className="target-price__info-boxes">
            <div className="target-price__info-box">
              <div className="target-price__info-icon">
                <Tag size={20} />
              </div>
              <div className="target-price__info-content">
                <span className="target-price__info-value">{formatPrice(dealerPrice)}</span>
                <span className="target-price__info-label">Dealer Listed Price</span>
              </div>
            </div>

            <div className="target-price__info-box">
              <div className="target-price__info-icon target-price__info-icon--green">
                <Target size={20} />
              </div>
              <div className="target-price__info-content">
                <span className="target-price__info-value target-price__info-value--range">
                  {formatPrice(targetPriceLow)} – {formatPrice(targetPriceHigh)}
                </span>
                <span className="target-price__info-label">
                  Target Price Range
                  <button className="target-price__info-btn" aria-label="More info">
                    <Info size={14} />
                  </button>
                </span>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="target-price__cta-section">
            <button className="target-price__cta-btn">
              <Search size={16} />
              <span>Find Best Deals</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TargetPriceRange;
