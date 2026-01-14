import { useState, useMemo } from 'react';
import { 
  Info, Tag, Target, Search, TrendingDown, CheckCircle, Clock, Percent, 
  ChevronDown, Star, MapPin, Shield, DollarSign, ArrowRight, Calculator,
  Car, Users
} from 'lucide-react';
import './TargetPriceRange.css';
import './TargetPriceRangeWithCTA.css';

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

interface TargetPriceRangeWithCTAProps {
  msrp?: number;
  trims?: TrimData[];
  vehicleName?: string;
  make?: string;
  model?: string;
  variant: 'v1c' | 'v2c' | 'v3c' | 'v4c' | 'v5c' | 'v1d' | 'v2d' | 'v3d' | 'v4d' | 'v5d';
  location?: string;
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
  if (msrp > 200000) {
    return {
      msrp,
      dealerPrice: Math.round(msrp * 1.05),
      targetPriceLow: Math.round(msrp * 0.98),
      targetPriceHigh: msrp,
    };
  } else if (msrp > 100000) {
    return {
      msrp,
      dealerPrice: Math.round(msrp * 1.02),
      targetPriceLow: Math.round(msrp * 0.95),
      targetPriceHigh: Math.round(msrp * 0.98),
    };
  } else if (msrp > 50000) {
    return {
      msrp,
      dealerPrice: Math.round(msrp * 1.015),
      targetPriceLow: Math.round(msrp * 0.93),
      targetPriceHigh: Math.round(msrp * 0.97),
    };
  } else {
    return {
      msrp,
      dealerPrice: Math.round(msrp * 1.01),
      targetPriceLow: Math.round(msrp * 0.92),
      targetPriceHigh: Math.round(msrp * 0.97),
    };
  }
};

// Generate trims based on base MSRP
const generateTrimsFromMSRP = (baseMsrp: number): TrimData[] => {
  if (baseMsrp < 35000) {
    return [
      { name: 'Base', msrp: baseMsrp },
      { name: 'Sport', msrp: Math.round(baseMsrp * 1.08) },
      { name: 'Premium', msrp: Math.round(baseMsrp * 1.15) },
    ];
  }
  if (baseMsrp < 80000) {
    return [
      { name: 'Base', msrp: baseMsrp },
      { name: 'Sport', msrp: Math.round(baseMsrp * 1.10) },
      { name: 'Premium', msrp: Math.round(baseMsrp * 1.18) },
      { name: 'Performance', msrp: Math.round(baseMsrp * 1.25) },
    ];
  }
  return [
    { name: 'Base', msrp: baseMsrp },
    { name: 'Performance', msrp: Math.round(baseMsrp * 1.15) },
    { name: 'Track', msrp: Math.round(baseMsrp * 1.30) },
  ];
};

// Mock inventory data
const getInventoryData = (msrp: number) => ({
  totalListings: 247,
  priceRangeLow: Math.round(msrp * 0.75),
  priceRangeHigh: Math.round(msrp * 1.05),
  avgPrice: Math.round(msrp * 0.88),
  monthlyPayment: Math.round((msrp * 0.85 * 0.8) / 60),
});

// =============================================
// V1C: Expert Tip Inline - Minimal, editorial feel
// =============================================
const MarketplaceCTAV1C = ({ model, location }: { model: string; location: string }) => {
  const inventoryData = getInventoryData(30000);
  
  return (
    <div className="tpr-marketplace tpr-marketplace--v1c">
      <div className="tpr-marketplace__expert-tip">
        <div className="tpr-marketplace__expert-badge">
          <Star size={14} fill="currentColor" />
          <span>C/D EXPERT TIP</span>
        </div>
        <h3 className="tpr-marketplace__expert-title">Ready to see what's available near you?</h3>
        <p className="tpr-marketplace__expert-text">
          Compare prices from {inventoryData.totalListings}+ {model} listings in the {location} area. 
          Our nationwide dealer network offers competitive pricing on certified and inspected vehicles.
        </p>
        <div className="tpr-marketplace__expert-actions">
          <button className="tpr-marketplace__btn tpr-marketplace__btn--primary">
            SHOP USED {model.toUpperCase()} LISTINGS
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

// =============================================
// V2C: Marketplace Value Props - Visual icons
// =============================================
const MarketplaceCTAV2C = ({ model, location }: { model: string; location: string }) => {
  const inventoryData = getInventoryData(30000);
  
  return (
    <div className="tpr-marketplace tpr-marketplace--v2c">
      <div className="tpr-marketplace__header">
        <h3 className="tpr-marketplace__title">Shop Used {model} Listings</h3>
        <p className="tpr-marketplace__subtitle">
          <MapPin size={14} />
          {inventoryData.totalListings} vehicles available near {location}
        </p>
      </div>
      
      <div className="tpr-marketplace__props">
        <div className="tpr-marketplace__prop">
          <div className="tpr-marketplace__prop-icon">
            <Users size={20} />
          </div>
          <div className="tpr-marketplace__prop-text">
            <span className="tpr-marketplace__prop-title">Nationwide Dealer Network</span>
            <span className="tpr-marketplace__prop-desc">Access 1000+ certified dealers</span>
          </div>
        </div>
        <div className="tpr-marketplace__prop">
          <div className="tpr-marketplace__prop-icon">
            <TrendingDown size={20} />
          </div>
          <div className="tpr-marketplace__prop-text">
            <span className="tpr-marketplace__prop-title">Competitive Pricing</span>
            <span className="tpr-marketplace__prop-desc">Compare prices instantly</span>
          </div>
        </div>
        <div className="tpr-marketplace__prop">
          <div className="tpr-marketplace__prop-icon">
            <Shield size={20} />
          </div>
          <div className="tpr-marketplace__prop-text">
            <span className="tpr-marketplace__prop-title">Verified History</span>
            <span className="tpr-marketplace__prop-desc">Vehicle history reports included</span>
          </div>
        </div>
      </div>
      
      <div className="tpr-marketplace__actions">
        <button className="tpr-marketplace__btn tpr-marketplace__btn--primary">
          SHOP {inventoryData.totalListings} LISTINGS
          <ArrowRight size={16} />
        </button>
        <button className="tpr-marketplace__btn tpr-marketplace__btn--secondary">
          SHOP BY PAYMENT
        </button>
      </div>
    </div>
  );
};

// =============================================
// V3C: Inventory Preview - Data-forward
// =============================================
const MarketplaceCTAV3C = ({ model, msrp, location }: { model: string; msrp: number; location: string }) => {
  const inventoryData = getInventoryData(msrp);
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };
  
  return (
    <div className="tpr-marketplace tpr-marketplace--v3c">
      <div className="tpr-marketplace__inventory-card">
        <div className="tpr-marketplace__inventory-header">
          <div className="tpr-marketplace__inventory-count">
            <span className="tpr-marketplace__inventory-number">{inventoryData.totalListings}</span>
            <span className="tpr-marketplace__inventory-label">Used {model} listings near {location}</span>
          </div>
          <div className="tpr-marketplace__inventory-range">
            <span className="tpr-marketplace__range-label">Price Range</span>
            <span className="tpr-marketplace__range-value">
              {formatPrice(inventoryData.priceRangeLow)} – {formatPrice(inventoryData.priceRangeHigh)}
            </span>
          </div>
        </div>
        
        <div className="tpr-marketplace__inventory-stats">
          <div className="tpr-marketplace__stat">
            <CheckCircle size={16} className="tpr-marketplace__stat-icon tpr-marketplace__stat-icon--success" />
            <span>89 Good/Great Price</span>
          </div>
          <div className="tpr-marketplace__stat">
            <Car size={16} className="tpr-marketplace__stat-icon" />
            <span>156 One Owner</span>
          </div>
          <div className="tpr-marketplace__stat">
            <Shield size={16} className="tpr-marketplace__stat-icon" />
            <span>198 No Accidents</span>
          </div>
        </div>
        
        <button className="tpr-marketplace__btn tpr-marketplace__btn--primary tpr-marketplace__btn--full">
          SHOP NOW
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};

// =============================================
// V4C: Shop by Payment/Price - Calculator preview
// =============================================
const MarketplaceCTAV4C = ({ model, msrp, location }: { model: string; msrp: number; location: string }) => {
  const [shopByPayment, setShopByPayment] = useState(false);
  const inventoryData = getInventoryData(msrp);
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };
  
  return (
    <div className="tpr-marketplace tpr-marketplace--v4c">
      <div className="tpr-marketplace__payment-card">
        <div className="tpr-marketplace__payment-header">
          <h3 className="tpr-marketplace__title">Find Your {model}</h3>
          <div className="tpr-marketplace__toggle">
            <button 
              className={`tpr-marketplace__toggle-btn ${!shopByPayment ? 'active' : ''}`}
              onClick={() => setShopByPayment(false)}
            >
              <DollarSign size={14} />
              By Price
            </button>
            <button 
              className={`tpr-marketplace__toggle-btn ${shopByPayment ? 'active' : ''}`}
              onClick={() => setShopByPayment(true)}
            >
              <Calculator size={14} />
              By Payment
            </button>
          </div>
        </div>
        
        <div className="tpr-marketplace__payment-display">
          {shopByPayment ? (
            <div className="tpr-marketplace__payment-info">
              <span className="tpr-marketplace__payment-label">Estimated Monthly Payment</span>
              <span className="tpr-marketplace__payment-value">${inventoryData.monthlyPayment}/mo*</span>
              <span className="tpr-marketplace__payment-note">*Based on 60-mo financing, 20% down</span>
            </div>
          ) : (
            <div className="tpr-marketplace__payment-info">
              <span className="tpr-marketplace__payment-label">Average Price in {location}</span>
              <span className="tpr-marketplace__payment-value">{formatPrice(inventoryData.avgPrice)}</span>
              <span className="tpr-marketplace__payment-note">{inventoryData.totalListings} listings available</span>
            </div>
          )}
        </div>
        
        <div className="tpr-marketplace__actions tpr-marketplace__actions--stacked">
          <button className="tpr-marketplace__btn tpr-marketplace__btn--primary tpr-marketplace__btn--full">
            SHOP {inventoryData.totalListings} USED {model.toUpperCase()} LISTINGS
            <ArrowRight size={16} />
          </button>
          <button className="tpr-marketplace__btn tpr-marketplace__btn--ghost tpr-marketplace__btn--full">
            <Calculator size={16} />
            GET PRE-QUALIFIED
          </button>
        </div>
      </div>
    </div>
  );
};

// =============================================
// V5C: Full Next Step Module - Comprehensive
// =============================================
const MarketplaceCTAV5C = ({ model, msrp, location }: { model: string; msrp: number; location: string }) => {
  const inventoryData = getInventoryData(msrp);
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };
  
  return (
    <div className="tpr-marketplace tpr-marketplace--v5c">
      <div className="tpr-marketplace__next-step">
        <div className="tpr-marketplace__next-step-badge">YOUR NEXT STEP</div>
        
        <div className="tpr-marketplace__next-step-content">
          <div className="tpr-marketplace__next-step-main">
            <h3 className="tpr-marketplace__title">Ready to see what's available near {location}?</h3>
            <p className="tpr-marketplace__subtitle-text">
              Browse {inventoryData.totalListings} used {model} listings from our nationwide dealer network.
            </p>
            
            <div className="tpr-marketplace__value-list">
              <div className="tpr-marketplace__value-item">
                <CheckCircle size={16} className="tpr-marketplace__value-icon" />
                <span>Competitive pricing from 1000+ dealers</span>
              </div>
              <div className="tpr-marketplace__value-item">
                <CheckCircle size={16} className="tpr-marketplace__value-icon" />
                <span>Filter by price, payment, or distance</span>
              </div>
              <div className="tpr-marketplace__value-item">
                <CheckCircle size={16} className="tpr-marketplace__value-icon" />
                <span>Vehicle history reports on every listing</span>
              </div>
            </div>
          </div>
          
          <div className="tpr-marketplace__next-step-sidebar">
            <div className="tpr-marketplace__quick-stats">
              <div className="tpr-marketplace__quick-stat">
                <span className="tpr-marketplace__quick-stat-value">{inventoryData.totalListings}</span>
                <span className="tpr-marketplace__quick-stat-label">Listings Near You</span>
              </div>
              <div className="tpr-marketplace__quick-stat">
                <span className="tpr-marketplace__quick-stat-value">{formatPrice(inventoryData.avgPrice)}</span>
                <span className="tpr-marketplace__quick-stat-label">Average Price</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="tpr-marketplace__next-step-actions">
          <button className="tpr-marketplace__btn tpr-marketplace__btn--primary tpr-marketplace__btn--large">
            SHOP USED {model.toUpperCase()} LISTINGS
            <ArrowRight size={18} />
          </button>
          <button className="tpr-marketplace__btn tpr-marketplace__btn--secondary">
            ESTIMATE TRADE-IN VALUE
          </button>
        </div>
      </div>
    </div>
  );
};

// =============================================
// MAIN COMPONENT
// =============================================
const TargetPriceRangeWithCTA = ({
  msrp = 21895,
  trims,
  vehicleName = 'Chevrolet Trax',
  model = 'Trax',
  variant,
  location = 'Miami, FL',
}: TargetPriceRangeWithCTAProps) => {
  const availableTrims = useMemo(() => {
    if (trims && trims.length > 0) return trims;
    if (vehicleName === 'Chevrolet Trax') return defaultTrims;
    return generateTrimsFromMSRP(msrp);
  }, [trims, vehicleName, msrp]);

  const [selectedTrimIndex, setSelectedTrimIndex] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  const selectedTrim = availableTrims[selectedTrimIndex];
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

  const savingsLow = dealerPrice - targetPriceLow;
  const savingsHigh = dealerPrice - targetPriceHigh;
  const discountLow = ((savingsLow / dealerPrice) * 100).toFixed(1);
  const discountHigh = ((savingsHigh / dealerPrice) * 100).toFixed(1);

  // Select marketplace CTA variant (D variants use same components as C variants)
  const MarketplaceCTA = {
    v1c: () => <MarketplaceCTAV1C model={model} location={location} />,
    v2c: () => <MarketplaceCTAV2C model={model} location={location} />,
    v3c: () => <MarketplaceCTAV3C model={model} msrp={msrp} location={location} />,
    v4c: () => <MarketplaceCTAV4C model={model} msrp={msrp} location={location} />,
    v5c: () => <MarketplaceCTAV5C model={model} msrp={msrp} location={location} />,
    v1d: () => <MarketplaceCTAV1C model={model} location={location} />,
    v2d: () => <MarketplaceCTAV2C model={model} location={location} />,
    v3d: () => <MarketplaceCTAV3C model={model} msrp={msrp} location={location} />,
    v4d: () => <MarketplaceCTAV4C model={model} msrp={msrp} location={location} />,
    v5d: () => <MarketplaceCTAV5C model={model} msrp={msrp} location={location} />,
  }[variant];

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

          {/* Original CTA Section */}
          <div className="target-price__cta-section">
            <button className="target-price__cta-btn">
              <Search size={16} />
              <span>Find Best Deals</span>
            </button>
          </div>
          
          {/* Marketplace CTA - Variant Specific */}
          <MarketplaceCTA />
        </div>
      </div>
    </section>
  );
};

export default TargetPriceRangeWithCTA;

