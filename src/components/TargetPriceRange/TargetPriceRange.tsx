import { useState, useMemo } from 'react';
import { Info, Tag, Target, Search, TrendingDown, CheckCircle, Clock, Percent, ChevronDown } from 'lucide-react';
import './TargetPriceRange.css';

interface TrimPriceData {
  msrp: number;
  dealerPrice: number;
  targetPriceLow: number;
  targetPriceHigh: number;
}

interface TargetPriceRangeProps {
  minPrice?: number;
  maxPrice?: number;
}

const TargetPriceRange = ({ 
  minPrice = 21895, 
  maxPrice = 24995,
}: TargetPriceRangeProps) => {
  // Generate dynamic trim data based on price range
  const { trims, trimPriceData } = useMemo(() => {
    const priceRange = maxPrice - minPrice;
    const trimCount = priceRange > 20000 ? 5 : priceRange > 10000 ? 4 : 3;
    const priceStep = priceRange / (trimCount - 1);
    
    const trimNames = ['Base', 'Sport', 'Premium', 'Luxury', 'Ultimate'].slice(0, trimCount);
    const generatedTrims: string[] = [];
    const generatedPriceData: Record<string, TrimPriceData> = {};
    
    trimNames.forEach((name, index) => {
      const trimName = `${name}`;
      generatedTrims.push(trimName);
      
      const msrp = Math.round(minPrice + (priceStep * index));
      const dealerPrice = Math.round(msrp * 1.01); // 1% dealer markup
      const targetPriceLow = Math.round(msrp * 0.93); // 7% off
      const targetPriceHigh = Math.round(msrp * 0.97); // 3% off
      
      generatedPriceData[trimName] = {
        msrp,
        dealerPrice,
        targetPriceLow,
        targetPriceHigh,
      };
    });
    
    return { trims: generatedTrims, trimPriceData: generatedPriceData };
  }, [minPrice, maxPrice]);

  const [selectedTrim, setSelectedTrim] = useState(trims[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  // Get prices for selected trim
  const trimData = trimPriceData[selectedTrim] || trimPriceData[trims[0]];
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
              <div className="target-price__trim-selector">
                <button 
                  className="target-price__trim-btn"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <span>{selectedTrim}</span>
                  <ChevronDown size={14} className={isDropdownOpen ? 'rotated' : ''} />
                </button>
                {isDropdownOpen && (
                  <div className="target-price__trim-dropdown">
                    {trims.map((trim) => (
                      <button
                        key={trim}
                        className={`target-price__trim-option ${selectedTrim === trim ? 'active' : ''}`}
                        onClick={() => {
                          setSelectedTrim(trim);
                          setIsDropdownOpen(false);
                        }}
                      >
                        {trim}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <p className="target-price__subtitle">
              Based on {Math.floor(Math.random() * 500 + 500).toLocaleString()}+ deals analyzed in your area
            </p>
          </div>

          {/* Main Price Display */}
          <div className="target-price__main">
            {/* Target Price Range */}
            <div 
              className="target-price__range-section"
              onMouseEnter={() => setActiveTooltip('target')}
              onMouseLeave={() => setActiveTooltip(null)}
            >
              <div className="target-price__range-header">
                <Target size={20} className="target-price__range-icon" />
                <span className="target-price__range-label">Target Price</span>
                <button className="target-price__info-btn" aria-label="More info">
                  <Info size={14} />
                </button>
              </div>
              <div className="target-price__range-values">
                <span className="target-price__range-price">{formatPrice(targetPriceLow)} – {formatPrice(targetPriceHigh)}</span>
              </div>
              <div className="target-price__range-savings">
                <TrendingDown size={14} />
                <span>Save {formatPrice(savingsHigh)} – {formatPrice(savingsLow)} ({discountHigh}% – {discountLow}% off)</span>
              </div>
              
              {/* Target Price Tooltip */}
              {activeTooltip === 'target' && (
                <div className="target-price__tooltip target-price__tooltip--target">
                  <h4>What is Target Price?</h4>
                  <p>This is the price range we recommend negotiating for based on actual transaction data in your area. Most buyers pay within this range.</p>
                  <ul>
                    <li><CheckCircle size={12} /> Based on real transaction data</li>
                    <li><CheckCircle size={12} /> Accounts for regional pricing</li>
                    <li><CheckCircle size={12} /> Updated weekly</li>
                  </ul>
                </div>
              )}
            </div>

            {/* Dealer Listed Price */}
            <div 
              className="target-price__dealer-section"
              onMouseEnter={() => setActiveTooltip('dealer')}
              onMouseLeave={() => setActiveTooltip(null)}
            >
              <div className="target-price__dealer-header">
                <Tag size={20} className="target-price__dealer-icon" />
                <span className="target-price__dealer-label">Dealer Listed Price</span>
                <button className="target-price__info-btn" aria-label="More info">
                  <Info size={14} />
                </button>
              </div>
              <div className="target-price__dealer-value">
                <span className="target-price__dealer-price">{formatPrice(dealerPrice)}</span>
              </div>
              <div className="target-price__dealer-note">
                <span>Average asking price in your area</span>
              </div>
              
              {/* Dealer Price Tooltip */}
              {activeTooltip === 'dealer' && (
                <div className="target-price__tooltip target-price__tooltip--dealer">
                  <h4>What is Dealer Listed Price?</h4>
                  <p>This is the average price dealers are currently asking for this vehicle in your area, including destination fees.</p>
                  <ul>
                    <li><Tag size={12} /> Includes destination charge</li>
                    <li><Clock size={12} /> Real-time dealer listings</li>
                    <li><Percent size={12} /> May be negotiable</li>
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Price Scale Visualization */}
          <div className="target-price__scale">
            <div className="target-price__scale-bar">
              <div 
                className="target-price__scale-target" 
                style={{ 
                  left: '10%',
                  width: '35%'
                }}
              >
                <span className="target-price__scale-label-top">Target Range</span>
              </div>
              <div 
                className="target-price__scale-dealer"
                style={{ left: '55%' }}
              >
                <div className="target-price__scale-dealer-marker"></div>
                <span className="target-price__scale-label-bottom">Dealer Price</span>
              </div>
            </div>
            <div className="target-price__scale-labels">
              <span>{formatPrice(targetPriceLow - 1000)}</span>
              <span>{formatPrice(dealerPrice + 1000)}</span>
            </div>
          </div>

          {/* CTA Section */}
          <div className="target-price__cta-section">
            <button className="target-price__cta target-price__cta--primary">
              <Search size={18} />
              Find Dealers with Target Pricing
            </button>
            <p className="target-price__cta-note">
              We'll show you dealers most likely to sell at your target price
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TargetPriceRange;
