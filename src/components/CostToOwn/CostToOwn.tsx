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
}

// Cost data by trim level (based on MSRP differences)
const trimCostData: Record<string, TrimCostData> = {
  'LS FWD': {
    msrp: 21895,
    depreciation: 8100,
    financing: 2650,
    taxesFees: 1535,
    fuel: 7500,
    insurance: 6000,
    repairs: 1150,
    maintenance: 2750,
  },
  '1RS FWD': {
    msrp: 23195,
    depreciation: 8580,
    financing: 2800,
    taxesFees: 1625,
    fuel: 7500,
    insurance: 6150,
    repairs: 1180,
    maintenance: 2800,
  },
  'LT FWD': {
    msrp: 23395,
    depreciation: 8650,
    financing: 2830,
    taxesFees: 1640,
    fuel: 7500,
    insurance: 6200,
    repairs: 1200,
    maintenance: 2850,
  },
  'RS FWD': {
    msrp: 24995,
    depreciation: 9240,
    financing: 3020,
    taxesFees: 1750,
    fuel: 7650,
    insurance: 6450,
    repairs: 1250,
    maintenance: 2950,
  },
  'ACTIV FWD': {
    msrp: 24995,
    depreciation: 9240,
    financing: 3020,
    taxesFees: 1750,
    fuel: 7650,
    insurance: 6400,
    repairs: 1240,
    maintenance: 2920,
  },
};

const trims = ['LS FWD', '1RS FWD', 'LT FWD', 'RS FWD', 'ACTIV FWD'];

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
  vehicleName = 'Chevrolet Trax',
}: CostToOwnProps) => {
  const [selectedTrim, setSelectedTrim] = useState(trims[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  // Get costs for selected trim
  const trimData = trimCostData[selectedTrim];
  
  const costs: CostCategory[] = useMemo(() => [
    { name: 'Depreciation', value: trimData.depreciation, color: '#1B5F8A', position: 'bottom' },
    { name: 'Financing', value: trimData.financing, color: '#3D8B8B', position: 'top' },
    { name: 'Taxes & Fees', value: trimData.taxesFees, color: '#D4A84B', position: 'bottom' },
    { name: 'Fuel', value: trimData.fuel, color: '#E67E22', position: 'top' },
    { name: 'Insurance', value: trimData.insurance, color: '#C0392B', position: 'bottom' },
    { name: 'Repairs', value: trimData.repairs, color: '#922B21', position: 'top' },
    { name: 'Maintenance', value: trimData.maintenance, color: '#5C1E1E', position: 'bottom' },
  ], [trimData]);

  // Calculate totals
  const totalCost = costs.reduce((acc, cost) => acc + cost.value, 0);
  const costTotal = totalCost;
  
  // Determine rating based on total cost
  const rating = totalCost < 30000 ? 'Below Average' : totalCost < 32000 ? 'Average' : 'Above Average';

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
    if (rating === 'Below Average') return '#22C55E'; // Green - good/low cost
    if (rating === 'Average') return 'var(--color-warning)'; // Orange - neutral
    return '#EF4444'; // Red - above average cost
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
                    className={`cost-to-own__segment ${activeTooltip === cost.name ? 'cost-to-own__segment--active' : ''}`}
                    style={{
                      width: `${(cost.value / costTotal) * 100}%`,
                      backgroundColor: cost.color,
                    }}
                    onMouseEnter={() => setActiveTooltip(cost.name)}
                    onMouseLeave={() => setActiveTooltip(null)}
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

          </div>
        </div>
      </div>
    </section>
  );
};

export default CostToOwn;
