import { useState, useMemo } from 'react';
import { Info, ChevronDown } from 'lucide-react';
import './CostToOwn.css';

interface CostCategory {
  name: string;
  value: number;
  color: string;
  position: 'top' | 'bottom';
}

interface TrimData {
  name: string;
  msrp: number;
}

interface CostToOwnProps {
  vehicleName?: string;
  msrp?: number;
  fuelType?: string;
  trims?: TrimData[];
}

// Default trims for Chevrolet Trax
const defaultTrims: TrimData[] = [
  { name: 'LS FWD', msrp: 21895 },
  { name: '1RS FWD', msrp: 23195 },
  { name: 'LT FWD', msrp: 23395 },
  { name: 'RS FWD', msrp: 24995 },
  { name: 'ACTIV FWD', msrp: 24995 },
];

// Calculate 5-year ownership costs based on MSRP
const calculateCosts = (msrp: number, fuelType: string = 'Gas') => {
  // Depreciation: Higher for luxury/expensive vehicles (40-50% of MSRP over 5 years)
  const depreciationRate = msrp > 100000 ? 0.55 : msrp > 50000 ? 0.45 : 0.37;
  const depreciation = Math.round(msrp * depreciationRate);
  
  // Financing: Based on 60-month loan at ~6% APR
  const financing = Math.round(msrp * 0.15);
  
  // Taxes & Fees: Higher for expensive vehicles
  const taxesFees = Math.round(msrp * 0.07);
  
  // Fuel costs: Based on price tier and fuel type
  let fuel = 7500; // Default for economy vehicles
  if (fuelType === 'Electric') {
    fuel = Math.round(msrp > 100000 ? 4500 : 3500);
  } else if (fuelType === 'Hybrid') {
    fuel = Math.round(msrp > 50000 ? 5500 : 4500);
  } else {
    // Gas vehicles - performance cars use more fuel
    if (msrp > 200000) fuel = 18000;
    else if (msrp > 100000) fuel = 14000;
    else if (msrp > 50000) fuel = 10000;
    else fuel = 7500;
  }
  
  // Insurance: Significantly higher for expensive/performance vehicles
  let insurance = 6000; // Default
  if (msrp > 400000) insurance = 45000;
  else if (msrp > 200000) insurance = 28000;
  else if (msrp > 100000) insurance = 18000;
  else if (msrp > 50000) insurance = 12000;
  else insurance = 6000;
  
  // Repairs: Higher for luxury/exotic vehicles
  let repairs = 1150; // Default
  if (msrp > 400000) repairs = 25000;
  else if (msrp > 200000) repairs = 15000;
  else if (msrp > 100000) repairs = 8000;
  else if (msrp > 50000) repairs = 4000;
  else repairs = 1150;
  
  // Maintenance: Higher for luxury/exotic vehicles
  let maintenance = 2750; // Default
  if (msrp > 400000) maintenance = 20000;
  else if (msrp > 200000) maintenance = 12000;
  else if (msrp > 100000) maintenance = 7000;
  else if (msrp > 50000) maintenance = 4500;
  else maintenance = 2750;
  
  return {
    depreciation,
    financing,
    taxesFees,
    fuel,
    insurance,
    repairs,
    maintenance,
  };
};

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

// Determine rating thresholds based on MSRP
const getRating = (totalCost: number, msrp: number) => {
  // Cost-to-MSRP ratio helps determine if costs are reasonable for the vehicle class
  const costRatio = totalCost / msrp;
  
  if (costRatio < 1.0) return 'Below Average';
  if (costRatio < 1.3) return 'Average';
  return 'Above Average';
};

// Generate trims based on base MSRP for vehicles without specific trim data
const generateTrimsFromMSRP = (baseMsrp: number, _vehicleName: string): TrimData[] => {
  // For economy vehicles (under $35k), use standard trim structure
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

const CostToOwn = ({
  vehicleName = 'Chevrolet Trax',
  msrp = 21895,
  fuelType = 'Gas',
  trims,
}: CostToOwnProps) => {
  // Determine which trims to use
  const availableTrims = useMemo(() => {
    if (trims && trims.length > 0) return trims;
    // Use default trims for Chevrolet Trax
    if (vehicleName === 'Chevrolet Trax') return defaultTrims;
    // Generate trims for other vehicles
    return generateTrimsFromMSRP(msrp, vehicleName);
  }, [trims, vehicleName, msrp]);

  const [selectedTrimIndex, setSelectedTrimIndex] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  const selectedTrim = availableTrims[selectedTrimIndex];
  const currentMsrp = selectedTrim.msrp;

  // Calculate costs based on selected trim's MSRP
  const calculatedCosts = useMemo(() => calculateCosts(currentMsrp, fuelType), [currentMsrp, fuelType]);
  
  const costs: CostCategory[] = useMemo(() => [
    { name: 'Depreciation', value: calculatedCosts.depreciation, color: '#1B5F8A', position: 'bottom' },
    { name: 'Financing', value: calculatedCosts.financing, color: '#3D8B8B', position: 'top' },
    { name: 'Taxes & Fees', value: calculatedCosts.taxesFees, color: '#D4A84B', position: 'bottom' },
    { name: 'Fuel', value: calculatedCosts.fuel, color: '#E67E22', position: 'top' },
    { name: 'Insurance', value: calculatedCosts.insurance, color: '#C0392B', position: 'bottom' },
    { name: 'Repairs', value: calculatedCosts.repairs, color: '#922B21', position: 'top' },
    { name: 'Maintenance', value: calculatedCosts.maintenance, color: '#5C1E1E', position: 'bottom' },
  ], [calculatedCosts]);

  // Calculate totals
  const totalCost = costs.reduce((acc, cost) => acc + cost.value, 0);
  const costTotal = totalCost;
  
  // Determine rating based on total cost relative to MSRP
  const rating = getRating(totalCost, currentMsrp);

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
                    {selectedTrim.name}
                    <ChevronDown size={16} />
                  </button>
                  {isDropdownOpen && (
                    <ul className="cost-to-own__options">
                      {availableTrims.map((trim, index) => (
                        <li key={trim.name}>
                          <button
                            className={`cost-to-own__option ${selectedTrimIndex === index ? 'active' : ''}`}
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
