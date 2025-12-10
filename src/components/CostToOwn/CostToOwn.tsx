import { useState, useMemo } from 'react';
import { Info, ChevronDown } from 'lucide-react';
import './CostToOwn.css';

interface CostCategory {
  name: string;
  value: number;
  color: string;
  position: 'top' | 'bottom';
}

interface TrimCostData {
  msrp: number;
  depreciation: number;
  financing: number;
  taxesFees: number;
  fuel: number;
  insurance: number;
  repairs: number;
  maintenance: number;
}

interface CostToOwnProps {
  vehicleName?: string;
  minPrice?: number;
  maxPrice?: number;
}

// Year-by-year breakdown multipliers for realistic cost distribution
const getYearlyBreakdown = (costName: string, totalValue: number): number[] => {
  const patterns: Record<string, number[]> = {
    'Depreciation': [0.30, 0.25, 0.20, 0.15, 0.10],
    'Financing': [0.22, 0.21, 0.20, 0.19, 0.18],
    'Taxes & Fees': [0.60, 0.10, 0.10, 0.10, 0.10],
    'Fuel': [0.20, 0.20, 0.20, 0.20, 0.20],
    'Insurance': [0.22, 0.21, 0.20, 0.19, 0.18],
    'Repairs': [0.05, 0.10, 0.15, 0.30, 0.40],
    'Maintenance': [0.15, 0.18, 0.20, 0.22, 0.25],
  };
  
  const pattern = patterns[costName] || [0.20, 0.20, 0.20, 0.20, 0.20];
  return pattern.map(multiplier => Math.round(totalValue * multiplier));
};

const CostToOwn = ({
  vehicleName = 'Vehicle',
  minPrice = 21895,
  maxPrice = 24995,
}: CostToOwnProps) => {
  // Generate dynamic trim and cost data based on price range
  const { trims, trimCostData } = useMemo(() => {
    const priceRange = maxPrice - minPrice;
    const trimCount = priceRange > 20000 ? 5 : priceRange > 10000 ? 4 : 3;
    const priceStep = priceRange / (trimCount - 1);
    
    const trimNames = ['Base', 'Sport', 'Premium', 'Luxury', 'Ultimate'].slice(0, trimCount);
    const generatedTrims: string[] = [];
    const generatedCostData: Record<string, TrimCostData> = {};
    
    trimNames.forEach((name, index) => {
      const trimName = `${name}`;
      generatedTrims.push(trimName);
      
      const msrp = Math.round(minPrice + (priceStep * index));
      
      // Calculate costs based on MSRP
      generatedCostData[trimName] = {
        msrp,
        depreciation: Math.round(msrp * 0.37), // ~37% depreciation over 5 years
        financing: Math.round(msrp * 0.12), // ~12% financing costs
        taxesFees: Math.round(msrp * 0.07), // ~7% taxes and fees
        fuel: Math.round(7500 + (msrp * 0.001)), // Base fuel + slight increase for premium
        insurance: Math.round(5500 + (msrp * 0.025)), // Base insurance + percentage of MSRP
        repairs: Math.round(1000 + (msrp * 0.008)), // Base repairs + percentage
        maintenance: Math.round(2500 + (msrp * 0.012)), // Base maintenance + percentage
      };
    });
    
    return { trims: generatedTrims, trimCostData: generatedCostData };
  }, [minPrice, maxPrice]);

  const [selectedTrim, setSelectedTrim] = useState(trims[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  // Get cost data for selected trim
  const costData = trimCostData[selectedTrim] || trimCostData[trims[0]];
  
  const costs: CostCategory[] = useMemo(() => [
    { name: 'Depreciation', value: costData.depreciation, color: '#1B5F8A', position: 'top' },
    { name: 'Financing', value: costData.financing, color: '#E63946', position: 'bottom' },
    { name: 'Taxes & Fees', value: costData.taxesFees, color: '#2A9D8F', position: 'top' },
    { name: 'Fuel', value: costData.fuel, color: '#E9C46A', position: 'bottom' },
    { name: 'Insurance', value: costData.insurance, color: '#F4A261', position: 'top' },
    { name: 'Repairs', value: costData.repairs, color: '#264653', position: 'bottom' },
    { name: 'Maintenance', value: costData.maintenance, color: '#9B5DE5', position: 'top' },
  ], [costData]);

  const totalCost = costs.reduce((sum, cost) => sum + cost.value, 0);

  // Calculate segment positions
  const getSegmentPosition = (index: number) => {
    let startPercent = 0;
    for (let i = 0; i < index; i++) {
      startPercent += (costs[i].value / totalCost) * 100;
    }
    const widthPercent = (costs[index].value / totalCost) * 100;
    return { left: startPercent, width: widthPercent };
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <section className="cost-to-own">
      <div className="container">
        <div className="cost-to-own__card">
          {/* Header */}
          <div className="cost-to-own__header">
            <div className="cost-to-own__title-row">
              <div className="cost-to-own__title-group">
                <h2 className="cost-to-own__title">
                  {vehicleName}<br />
                  <span className="cost-to-own__title-highlight">5-Year Cost to Own</span>
                </h2>
                <button className="cost-to-own__info-btn" aria-label="More information">
                  <Info size={18} />
                </button>
              </div>
              
              {/* Trim Selector */}
              <div className="cost-to-own__trim-selector">
                <button 
                  className="cost-to-own__trim-btn"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <span>{selectedTrim}</span>
                  <ChevronDown size={14} className={isDropdownOpen ? 'rotated' : ''} />
                </button>
                {isDropdownOpen && (
                  <div className="cost-to-own__trim-dropdown">
                    {trims.map((trim) => (
                      <button
                        key={trim}
                        className={`cost-to-own__trim-option ${selectedTrim === trim ? 'active' : ''}`}
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
          </div>

          {/* Total Cost Display */}
          <div className="cost-to-own__total">
            <span className="cost-to-own__total-label">Total 5-Year Cost</span>
            <span className="cost-to-own__total-value">{formatCurrency(totalCost)}</span>
            <span className="cost-to-own__total-note">MSRP: {formatCurrency(costData.msrp)}</span>
          </div>

          {/* Cost Breakdown Bar */}
          <div className="cost-to-own__breakdown">
            <h3 className="cost-to-own__breakdown-title">Cost Breakdown</h3>
            
            {/* Top Labels */}
            <div className="cost-to-own__labels cost-to-own__labels--top">
              {costs.filter(c => c.position === 'top').map((cost) => {
                const originalIndex = costs.findIndex(c => c.name === cost.name);
                const { left, width } = getSegmentPosition(originalIndex);
                return (
                  <div 
                    key={cost.name}
                    className="cost-to-own__label"
                    style={{ left: `${left + width/2}%` }}
                  >
                    <span className="cost-to-own__label-name">{cost.name}</span>
                    <span className="cost-to-own__label-value">{formatCurrency(cost.value)}</span>
                  </div>
                );
              })}
            </div>

            {/* Bar */}
            <div className="cost-to-own__bar">
              {costs.map((cost, index) => {
                const { left, width } = getSegmentPosition(index);
                const yearlyBreakdown = getYearlyBreakdown(cost.name, cost.value);
                
                return (
                  <div
                    key={cost.name}
                    className="cost-to-own__segment"
                    style={{
                      left: `${left}%`,
                      width: `${width}%`,
                      backgroundColor: cost.color,
                    }}
                    onMouseEnter={() => setActiveTooltip(cost.name)}
                    onMouseLeave={() => setActiveTooltip(null)}
                  >
                    {/* Tooltip */}
                    {activeTooltip === cost.name && (
                      <div className={`cost-to-own__tooltip ${cost.position === 'bottom' ? 'cost-to-own__tooltip--above' : ''}`}>
                        <div className="cost-to-own__tooltip-header">
                          <span 
                            className="cost-to-own__tooltip-color" 
                            style={{ backgroundColor: cost.color }}
                          />
                          <span className="cost-to-own__tooltip-name">{cost.name}</span>
                          <span className="cost-to-own__tooltip-total">{formatCurrency(cost.value)}</span>
                        </div>
                        <div className="cost-to-own__tooltip-breakdown">
                          <span className="cost-to-own__tooltip-breakdown-title">Year-by-Year Breakdown</span>
                          <div className="cost-to-own__tooltip-years">
                            {yearlyBreakdown.map((yearCost, yearIndex) => (
                              <div key={yearIndex} className="cost-to-own__tooltip-year">
                                <span className="cost-to-own__tooltip-year-label">Year {yearIndex + 1}</span>
                                <span className="cost-to-own__tooltip-year-value">{formatCurrency(yearCost)}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Bottom Labels */}
            <div className="cost-to-own__labels cost-to-own__labels--bottom">
              {costs.filter(c => c.position === 'bottom').map((cost) => {
                const originalIndex = costs.findIndex(c => c.name === cost.name);
                const { left, width } = getSegmentPosition(originalIndex);
                return (
                  <div 
                    key={cost.name}
                    className="cost-to-own__label"
                    style={{ left: `${left + width/2}%` }}
                  >
                    <span className="cost-to-own__label-value">{formatCurrency(cost.value)}</span>
                    <span className="cost-to-own__label-name">{cost.name}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Legend */}
          <div className="cost-to-own__legend">
            {costs.map((cost) => (
              <div key={cost.name} className="cost-to-own__legend-item">
                <span 
                  className="cost-to-own__legend-color" 
                  style={{ backgroundColor: cost.color }}
                />
                <span className="cost-to-own__legend-name">{cost.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CostToOwn;
