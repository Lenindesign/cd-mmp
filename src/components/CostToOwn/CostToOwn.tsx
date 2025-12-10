import { useState } from 'react';
import { Info, ChevronDown } from 'lucide-react';
import './CostToOwn.css';

interface CostCategory {
  name: string;
  value: number;
  color: string;
  position: 'top' | 'bottom';
}

interface CostToOwnProps {
  vehicleName?: string;
  trims?: string[];
  totalCost?: number;
  rating?: 'Below Average' | 'Average' | 'Above Average';
  costs?: CostCategory[];
}

// Year-by-year breakdown multipliers for realistic cost distribution
const getYearlyBreakdown = (costName: string, totalValue: number): number[] => {
  // Different cost categories have different distribution patterns over 5 years
  const patterns: Record<string, number[]> = {
    'Depreciation': [0.30, 0.25, 0.20, 0.15, 0.10], // Highest in year 1, decreases
    'Financing': [0.22, 0.21, 0.20, 0.19, 0.18],    // Slightly decreasing (principal paydown)
    'Taxes & Fees': [0.60, 0.10, 0.10, 0.10, 0.10], // High in year 1 (registration), then maintenance
    'Fuel': [0.20, 0.20, 0.20, 0.20, 0.20],         // Consistent each year
    'Insurance': [0.22, 0.21, 0.20, 0.19, 0.18],    // Slightly decreases as car ages
    'Repairs': [0.05, 0.10, 0.15, 0.30, 0.40],      // Increases as warranty expires
    'Maintenance': [0.15, 0.18, 0.20, 0.22, 0.25],  // Increases as car ages
  };
  
  const pattern = patterns[costName] || [0.20, 0.20, 0.20, 0.20, 0.20];
  return pattern.map(multiplier => Math.round(totalValue * multiplier));
};

const CostToOwn = ({
  vehicleName = 'Chevrolet Trax',
  trims = ['LS FWD', '1RS FWD', 'LT FWD', 'RS FWD', 'ACTIV FWD'],
  totalCost = 30700,
  rating = 'Below Average',
  costs = [
    { name: 'Depreciation', value: 8500, color: '#1B5F8A', position: 'bottom' },
    { name: 'Financing', value: 2800, color: '#3D8B8B', position: 'top' },
    { name: 'Taxes & Fees', value: 1650, color: '#D4A84B', position: 'bottom' },
    { name: 'Fuel', value: 7500, color: '#E67E22', position: 'top' },
    { name: 'Insurance', value: 6200, color: '#C0392B', position: 'bottom' },
    { name: 'Repairs', value: 1200, color: '#922B21', position: 'top' },
    { name: 'Maintenance', value: 2850, color: '#5C1E1E', position: 'bottom' },
  ],
}: CostToOwnProps) => {
  const [selectedTrim, setSelectedTrim] = useState(trims[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  // Calculate total for percentage widths
  const costTotal = costs.reduce((acc, cost) => acc + cost.value, 0);

  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Get rating color - using Car and Driver design system colors
  const getRatingColor = () => {
    switch (rating) {
      case 'Below Average':
        return 'var(--color-blue-cobalt)';  // Good - costs below average
      case 'Average':
        return 'var(--color-warning)';       // Neutral
      case 'Above Average':
        return 'var(--color-blue-cobalt)';   // Above average cost
      default:
        return 'var(--color-blue-cobalt)';
    }
  };

  // Calculate cumulative position for each segment
  const getSegmentPosition = (index: number) => {
    let position = 0;
    for (let i = 0; i < index; i++) {
      position += (costs[i].value / costTotal) * 100;
    }
    return position + (costs[index].value / costTotal) * 100 / 2;
  };

  return (
    <section className="cost-to-own">
      <div className="container">
        <div className="cost-to-own__card">
          {/* Main Content */}
          <div className="cost-to-own__main">
            {/* Header Row */}
            <div className="cost-to-own__header">
              <div className="cost-to-own__title-group">
                <h2 className="cost-to-own__title">
                  <span className="cost-to-own__title-vehicle">{vehicleName}</span>
                  <span className="cost-to-own__title-label">5-Year Cost to Own<sup className="cost-to-own__trademark">®</sup></span>
                </h2>
                <button className="cost-to-own__info" aria-label="More info">
                  <Info size={14} />
                </button>
              </div>

              {/* Trim Dropdown */}
              <div className="cost-to-own__trim">
                <span className="cost-to-own__trim-label">Trim:</span>
                <div className="cost-to-own__select-wrapper">
                  <button
                    className="cost-to-own__select"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  >
                    {selectedTrim}
                    <ChevronDown size={16} />
                  </button>
                  {isDropdownOpen && (
                    <ul className="cost-to-own__options">
                      {trims.map((trim) => (
                        <li key={trim}>
                          <button
                            className={`cost-to-own__option ${selectedTrim === trim ? 'active' : ''}`}
                            onClick={() => {
                              setSelectedTrim(trim);
                              setIsDropdownOpen(false);
                            }}
                          >
                            {trim}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>

            {/* Summary Row */}
            <div className="cost-to-own__summary">
              <span className="cost-to-own__rating" style={{ color: getRatingColor() }}>
                {rating}
              </span>
              <div className="cost-to-own__cost">
                <span className="cost-to-own__amount">{formatCurrency(totalCost)}</span>
                <span className="cost-to-own__period">5-Year Ownership Costs</span>
              </div>
            </div>

            {/* Chart Section */}
            <div className="cost-to-own__chart">
              <span className="cost-to-own__chart-label">Cost Breakdown</span>

              {/* Top Labels */}
              <div className="cost-to-own__labels-top">
                {costs.filter(c => c.position === 'top').map((cost) => {
                  const yearlyBreakdown = getYearlyBreakdown(cost.name, cost.value);
                  return (
                    <div
                      key={cost.name}
                      className="cost-to-own__marker cost-to-own__marker--top"
                      style={{ left: `${getSegmentPosition(costs.indexOf(cost))}%` }}
                      onMouseEnter={() => setActiveTooltip(cost.name)}
                      onMouseLeave={() => setActiveTooltip(null)}
                    >
                      {activeTooltip === cost.name && (
                        <div className="cost-to-own__tooltip cost-to-own__tooltip--top">
                          <div className="cost-to-own__tooltip-header">
                            <span className="cost-to-own__tooltip-title">{cost.name}</span>
                            <span className="cost-to-own__tooltip-total">{formatCurrency(cost.value)}</span>
                          </div>
                          <div className="cost-to-own__tooltip-breakdown">
                            {yearlyBreakdown.map((amount, idx) => (
                              <div key={idx} className="cost-to-own__tooltip-row">
                                <span className="cost-to-own__tooltip-year">Year {idx + 1}</span>
                                <span className="cost-to-own__tooltip-amount">{formatCurrency(amount)}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      <span className="cost-to-own__marker-name">{cost.name}</span>
                      <span className="cost-to-own__marker-value">{formatCurrency(cost.value)}</span>
                      <div className="cost-to-own__marker-line"></div>
                      <div className="cost-to-own__marker-dot"></div>
                    </div>
                  );
                })}
              </div>

              {/* Bar */}
              <div className="cost-to-own__bar">
                {costs.map((cost) => (
                  <div
                    key={cost.name}
                    className="cost-to-own__segment"
                    style={{
                      width: `${(cost.value / costTotal) * 100}%`,
                      backgroundColor: cost.color,
                    }}
                  />
                ))}
              </div>

              {/* Bottom Labels */}
              <div className="cost-to-own__labels-bottom">
                {costs.filter(c => c.position === 'bottom').map((cost) => {
                  const yearlyBreakdown = getYearlyBreakdown(cost.name, cost.value);
                  return (
                    <div
                      key={cost.name}
                      className="cost-to-own__marker cost-to-own__marker--bottom"
                      style={{ left: `${getSegmentPosition(costs.indexOf(cost))}%` }}
                      onMouseEnter={() => setActiveTooltip(cost.name)}
                      onMouseLeave={() => setActiveTooltip(null)}
                    >
                      <div className="cost-to-own__marker-dot"></div>
                      <div className="cost-to-own__marker-line"></div>
                      <span className="cost-to-own__marker-name">{cost.name}</span>
                      <span className="cost-to-own__marker-value">{formatCurrency(cost.value)}</span>
                      {activeTooltip === cost.name && (
                        <div className="cost-to-own__tooltip cost-to-own__tooltip--bottom">
                          <div className="cost-to-own__tooltip-header">
                            <span className="cost-to-own__tooltip-title">{cost.name}</span>
                            <span className="cost-to-own__tooltip-total">{formatCurrency(cost.value)}</span>
                          </div>
                          <div className="cost-to-own__tooltip-breakdown">
                            {yearlyBreakdown.map((amount, idx) => (
                              <div key={idx} className="cost-to-own__tooltip-row">
                                <span className="cost-to-own__tooltip-year">Year {idx + 1}</span>
                                <span className="cost-to-own__tooltip-amount">{formatCurrency(amount)}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Footer */}
            <div className="cost-to-own__footer">
              <span className="cost-to-own__powered">Powered by</span>
              <div className="cost-to-own__logo">
                <span className="cost-to-own__logo-name">IntelliChoice</span>
                <span className="cost-to-own__logo-tagline">YOUR MONEY. YOUR WHEELS.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CostToOwn;
