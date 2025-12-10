import { useState } from 'react';
import { Info, DollarSign, Target, Search, TrendingDown, CheckCircle, Clock, Percent } from 'lucide-react';
import './TargetPriceRange.css';

interface TargetPriceRangeProps {
  dealerPrice?: number;
  targetPriceLow?: number;
  targetPriceHigh?: number;
  vehicleName?: string;
}

const TargetPriceRange = ({ 
  dealerPrice = 23495,
  targetPriceLow = 21500,
  targetPriceHigh = 22800,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  vehicleName: _vehicleName = 'Chevrolet Trax'
}: TargetPriceRangeProps) => {
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);
  
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
            <h2 className="target-price__title">Target Price Range</h2>
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
                <DollarSign size={20} />
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

