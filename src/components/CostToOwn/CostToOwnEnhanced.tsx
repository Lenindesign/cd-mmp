import { useState, useMemo } from 'react';
import { Info, ChevronDown, TrendingDown, TrendingUp, Minus, Lightbulb, ChevronRight } from 'lucide-react';
import './CostToOwnEnhanced.css';

interface CostCategory {
  name: string;
  value: number;
  color: string;
  monthlyValue: number;
  vsAverage: number; // percentage vs segment average (negative = better)
  tooltip: string;
}

interface TrimData {
  name: string;
  msrp: number;
}

interface Competitor {
  name: string;
  totalCost: number;
  msrp: number;
}

interface CostToOwnEnhancedProps {
  vehicleName?: string;
  msrp?: number;
  fuelType?: string;
  trims?: TrimData[];
  competitors?: Competitor[];
  segmentName?: string;
  segmentAverage?: number;
}

// Default trims for Chevrolet Trax
const defaultTrims: TrimData[] = [
  { name: 'LS FWD', msrp: 21895 },
  { name: '1RS FWD', msrp: 23195 },
  { name: 'LT FWD', msrp: 23395 },
  { name: 'RS FWD', msrp: 24995 },
  { name: 'ACTIV FWD', msrp: 24995 },
];

// Default competitors
const defaultCompetitors: Competitor[] = [
  { name: 'Honda HR-V', totalCost: 32450, msrp: 24895 },
  { name: 'Toyota Corolla Cross', totalCost: 31200, msrp: 23610 },
  { name: 'Hyundai Kona', totalCost: 29800, msrp: 24250 },
];

// Calculate 5-year ownership costs based on MSRP
const calculateCosts = (msrp: number, fuelType: string = 'Gas') => {
  const depreciationRate = msrp > 100000 ? 0.55 : msrp > 50000 ? 0.45 : 0.37;
  const depreciation = Math.round(msrp * depreciationRate);
  const financing = Math.round(msrp * 0.15);
  const taxesFees = Math.round(msrp * 0.07);
  
  let fuel = 7500;
  if (fuelType === 'Electric') {
    fuel = Math.round(msrp > 100000 ? 4500 : 3500);
  } else if (fuelType === 'Hybrid') {
    fuel = Math.round(msrp > 50000 ? 5500 : 4500);
  } else {
    if (msrp > 200000) fuel = 18000;
    else if (msrp > 100000) fuel = 14000;
    else if (msrp > 50000) fuel = 10000;
    else fuel = 7500;
  }
  
  let insurance = 6000;
  if (msrp > 400000) insurance = 45000;
  else if (msrp > 200000) insurance = 28000;
  else if (msrp > 100000) insurance = 18000;
  else if (msrp > 50000) insurance = 12000;
  else insurance = 6000;
  
  let repairs = 1150;
  if (msrp > 400000) repairs = 25000;
  else if (msrp > 200000) repairs = 15000;
  else if (msrp > 100000) repairs = 8000;
  else if (msrp > 50000) repairs = 4000;
  else repairs = 1150;
  
  let maintenance = 2750;
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

// Tooltips for each cost category
const costTooltips: Record<string, string> = {
  'Depreciation': 'The loss in value over 5 years. Based on historical resale data for this model.',
  'Financing': 'Interest costs assuming 60-month loan at 6.5% APR with 10% down payment.',
  'Taxes & Fees': 'Sales tax, registration, and annual fees. Varies by state.',
  'Fuel': 'Based on 12,000 miles/year at current average fuel prices.',
  'Insurance': 'Average annual premium based on typical driver profile.',
  'Repairs': 'Expected repair costs based on reliability data.',
  'Maintenance': 'Scheduled maintenance per manufacturer recommendations.',
};

const CostToOwnEnhanced = ({
  vehicleName = 'Chevrolet Trax',
  msrp = 21895,
  fuelType = 'Gas',
  trims,
  competitors = defaultCompetitors,
  segmentName = 'Subcompact SUV',
  segmentAverage = 31500,
}: CostToOwnEnhancedProps) => {
  const availableTrims = useMemo(() => {
    if (trims && trims.length > 0) return trims;
    if (vehicleName === 'Chevrolet Trax') return defaultTrims;
    return [{ name: 'Base', msrp }];
  }, [trims, vehicleName, msrp]);

  const [selectedTrimIndex, setSelectedTrimIndex] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);
  const [showCustomize, setShowCustomize] = useState(false);
  
  // Customization state
  const [annualMiles, setAnnualMiles] = useState(12000);
  const [gasPrice, setGasPrice] = useState(3.50);

  const selectedTrim = availableTrims[selectedTrimIndex];
  const currentMsrp = selectedTrim.msrp;

  const calculatedCosts = useMemo(() => calculateCosts(currentMsrp, fuelType), [currentMsrp, fuelType]);
  
  // Adjust fuel based on custom miles
  const adjustedFuel = Math.round(calculatedCosts.fuel * (annualMiles / 12000) * (gasPrice / 3.50));
  
  const costs: CostCategory[] = useMemo(() => [
    { 
      name: 'Depreciation', 
      value: calculatedCosts.depreciation, 
      color: '#1B5F8A', 
      monthlyValue: Math.round(calculatedCosts.depreciation / 60),
      vsAverage: -5,
      tooltip: costTooltips['Depreciation'],
    },
    { 
      name: 'Fuel', 
      value: adjustedFuel, 
      color: '#E67E22', 
      monthlyValue: Math.round(adjustedFuel / 60),
      vsAverage: 12,
      tooltip: costTooltips['Fuel'],
    },
    { 
      name: 'Insurance', 
      value: calculatedCosts.insurance, 
      color: '#C0392B', 
      monthlyValue: Math.round(calculatedCosts.insurance / 60),
      vsAverage: -3,
      tooltip: costTooltips['Insurance'],
    },
    { 
      name: 'Financing', 
      value: calculatedCosts.financing, 
      color: '#3D8B8B', 
      monthlyValue: Math.round(calculatedCosts.financing / 60),
      vsAverage: 0,
      tooltip: costTooltips['Financing'],
    },
    { 
      name: 'Maintenance', 
      value: calculatedCosts.maintenance, 
      color: '#5C1E1E', 
      monthlyValue: Math.round(calculatedCosts.maintenance / 60),
      vsAverage: -8,
      tooltip: costTooltips['Maintenance'],
    },
    { 
      name: 'Repairs', 
      value: calculatedCosts.repairs, 
      color: '#922B21', 
      monthlyValue: Math.round(calculatedCosts.repairs / 60),
      vsAverage: -15,
      tooltip: costTooltips['Repairs'],
    },
    { 
      name: 'Taxes & Fees', 
      value: calculatedCosts.taxesFees, 
      color: '#D4A84B', 
      monthlyValue: Math.round(calculatedCosts.taxesFees / 60),
      vsAverage: 0,
      tooltip: costTooltips['Taxes & Fees'],
    },
  ], [calculatedCosts, adjustedFuel]);

  const totalCost = costs.reduce((acc, cost) => acc + cost.value, 0);
  const monthlyTotal = Math.round(totalCost / 60);
  const vsSegmentPercent = Math.round(((totalCost - segmentAverage) / segmentAverage) * 100);
  
  // Value after 5 years
  const valueAfter5Years = currentMsrp - calculatedCosts.depreciation;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const getComparisonIcon = (percent: number) => {
    if (percent < -2) return <TrendingDown size={14} className="cost-enhanced__trend cost-enhanced__trend--good" />;
    if (percent > 2) return <TrendingUp size={14} className="cost-enhanced__trend cost-enhanced__trend--bad" />;
    return <Minus size={14} className="cost-enhanced__trend cost-enhanced__trend--neutral" />;
  };

  const getComparisonClass = (percent: number) => {
    if (percent < -2) return 'cost-enhanced__comparison--good';
    if (percent > 2) return 'cost-enhanced__comparison--bad';
    return 'cost-enhanced__comparison--neutral';
  };

  // Sort competitors by total cost
  const sortedCompetitors = [...competitors, { name: vehicleName, totalCost, msrp: currentMsrp }]
    .sort((a, b) => a.totalCost - b.totalCost);
  
  const vehicleRank = sortedCompetitors.findIndex(c => c.name === vehicleName) + 1;

  return (
    <section className="cost-enhanced">
      <div className="container">
        <div className="cost-enhanced__card">
          <div className="cost-enhanced__main">
            {/* Header */}
            <div className="cost-enhanced__header">
              <div className="cost-enhanced__title-group">
                <h2 className="cost-enhanced__title">
                  5-Year Cost to Own<sup>®</sup>
                </h2>
                <span className="cost-enhanced__vehicle-name">{vehicleName}</span>
              </div>
              
              {/* Trim Selector */}
              <div className="cost-enhanced__trim">
                <span className="cost-enhanced__trim-label">Trim:</span>
                <div className="cost-enhanced__select-wrapper">
                  <button
                    className="cost-enhanced__select"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  >
                    {selectedTrim.name}
                    <ChevronDown size={16} />
                  </button>
                  {isDropdownOpen && (
                    <ul className="cost-enhanced__options">
                      {availableTrims.map((trim, index) => (
                        <li key={trim.name}>
                          <button
                            className={`cost-enhanced__option ${selectedTrimIndex === index ? 'active' : ''}`}
                            onClick={() => {
                              setSelectedTrimIndex(index);
                              setIsDropdownOpen(false);
                            }}
                          >
                            <span>{trim.name}</span>
                            <span className="cost-enhanced__option-price">{formatCurrency(trim.msrp)}</span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>

            {/* Summary Cards */}
            <div className="cost-enhanced__summary">
              <div className="cost-enhanced__summary-main">
                <div className="cost-enhanced__total">
                  <span className="cost-enhanced__total-amount">{formatCurrency(totalCost)}</span>
                  <span className="cost-enhanced__total-label">5-Year Total</span>
                </div>
                <div className="cost-enhanced__monthly">
                  <span className="cost-enhanced__monthly-amount">{formatCurrency(monthlyTotal)}/mo</span>
                  <span className="cost-enhanced__monthly-label">Average Monthly Cost</span>
                </div>
              </div>
              
              <div className="cost-enhanced__comparison-badge">
                {vsSegmentPercent <= 0 ? (
                  <>
                    <TrendingDown size={18} />
                    <span>{Math.abs(vsSegmentPercent)}% below {segmentName} avg</span>
                  </>
                ) : (
                  <>
                    <TrendingUp size={18} />
                    <span>{vsSegmentPercent}% above {segmentName} avg</span>
                  </>
                )}
              </div>
            </div>

            {/* Competitor Comparison */}
            <div className="cost-enhanced__competitors">
              <h3 className="cost-enhanced__section-title">vs. Competitors</h3>
              <div className="cost-enhanced__competitor-bars">
                {sortedCompetitors.map((comp, index) => {
                  const maxCost = Math.max(...sortedCompetitors.map(c => c.totalCost));
                  const barWidth = (comp.totalCost / maxCost) * 100;
                  const isCurrentVehicle = comp.name === vehicleName;
                  
                  return (
                    <div 
                      key={comp.name} 
                      className={`cost-enhanced__competitor ${isCurrentVehicle ? 'cost-enhanced__competitor--current' : ''}`}
                    >
                      <div className="cost-enhanced__competitor-info">
                        <span className="cost-enhanced__competitor-rank">#{index + 1}</span>
                        <span className="cost-enhanced__competitor-name">{comp.name}</span>
                      </div>
                      <div className="cost-enhanced__competitor-bar-wrapper">
                        <div 
                          className="cost-enhanced__competitor-bar"
                          style={{ width: `${barWidth}%` }}
                        />
                        <span className="cost-enhanced__competitor-cost">{formatCurrency(comp.totalCost)}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
              {vehicleRank === 1 && (
                <div className="cost-enhanced__winner-badge">
                  🏆 Lowest cost to own in comparison
                </div>
              )}
            </div>

            {/* Cost Breakdown Table */}
            <div className="cost-enhanced__breakdown">
              <h3 className="cost-enhanced__section-title">Cost Breakdown</h3>
              <div className="cost-enhanced__table">
                <div className="cost-enhanced__table-header">
                  <span>Category</span>
                  <span>Monthly</span>
                  <span>5-Year</span>
                  <span>vs Avg</span>
                </div>
                {costs.map((cost) => (
                  <div 
                    key={cost.name} 
                    className="cost-enhanced__table-row"
                    onMouseEnter={() => setActiveTooltip(cost.name)}
                    onMouseLeave={() => setActiveTooltip(null)}
                  >
                    <div className="cost-enhanced__category">
                      <div 
                        className="cost-enhanced__category-dot" 
                        style={{ backgroundColor: cost.color }}
                      />
                      <span className="cost-enhanced__category-name">{cost.name}</span>
                      <button className="cost-enhanced__info-btn" aria-label={`Info about ${cost.name}`}>
                        <Info size={12} />
                      </button>
                      {activeTooltip === cost.name && (
                        <div className="cost-enhanced__tooltip">
                          {cost.tooltip}
                        </div>
                      )}
                    </div>
                    <span className="cost-enhanced__cell">{formatCurrency(cost.monthlyValue)}</span>
                    <span className="cost-enhanced__cell cost-enhanced__cell--bold">{formatCurrency(cost.value)}</span>
                    <span className={`cost-enhanced__cell ${getComparisonClass(cost.vsAverage)}`}>
                      {getComparisonIcon(cost.vsAverage)}
                      {cost.vsAverage !== 0 && `${Math.abs(cost.vsAverage)}%`}
                    </span>
                  </div>
                ))}
                <div className="cost-enhanced__table-footer">
                  <span className="cost-enhanced__category-name">Total</span>
                  <span className="cost-enhanced__cell cost-enhanced__cell--bold">{formatCurrency(monthlyTotal)}</span>
                  <span className="cost-enhanced__cell cost-enhanced__cell--bold">{formatCurrency(totalCost)}</span>
                  <span className={`cost-enhanced__cell ${getComparisonClass(vsSegmentPercent)}`}>
                    {getComparisonIcon(vsSegmentPercent)}
                    {vsSegmentPercent !== 0 && `${Math.abs(vsSegmentPercent)}%`}
                  </span>
                </div>
              </div>
            </div>

            {/* Depreciation Insight */}
            <div className="cost-enhanced__depreciation">
              <h3 className="cost-enhanced__section-title">Depreciation Forecast</h3>
              <div className="cost-enhanced__depreciation-content">
                <div className="cost-enhanced__depreciation-visual">
                  <div className="cost-enhanced__depreciation-start">
                    <span className="cost-enhanced__depreciation-label">Today</span>
                    <span className="cost-enhanced__depreciation-value">{formatCurrency(currentMsrp)}</span>
                  </div>
                  <div className="cost-enhanced__depreciation-arrow">
                    <div className="cost-enhanced__depreciation-line" />
                    <span className="cost-enhanced__depreciation-loss">-{formatCurrency(calculatedCosts.depreciation)}</span>
                  </div>
                  <div className="cost-enhanced__depreciation-end">
                    <span className="cost-enhanced__depreciation-label">After 5 Years</span>
                    <span className="cost-enhanced__depreciation-value">{formatCurrency(valueAfter5Years)}</span>
                  </div>
                </div>
                <p className="cost-enhanced__depreciation-note">
                  Your {vehicleName} will retain approximately {Math.round((valueAfter5Years / currentMsrp) * 100)}% of its value after 5 years.
                </p>
              </div>
            </div>

            {/* Customize Section */}
            <div className="cost-enhanced__customize">
              <button 
                className="cost-enhanced__customize-toggle"
                onClick={() => setShowCustomize(!showCustomize)}
              >
                <span>Customize Your Estimate</span>
                <ChevronDown size={16} className={showCustomize ? 'rotated' : ''} />
              </button>
              
              {showCustomize && (
                <div className="cost-enhanced__customize-panel">
                  <div className="cost-enhanced__customize-field">
                    <label>Annual Miles</label>
                    <input 
                      type="range" 
                      min="5000" 
                      max="25000" 
                      step="1000"
                      value={annualMiles}
                      onChange={(e) => setAnnualMiles(Number(e.target.value))}
                    />
                    <span>{annualMiles.toLocaleString()} mi/year</span>
                  </div>
                  <div className="cost-enhanced__customize-field">
                    <label>Gas Price</label>
                    <input 
                      type="range" 
                      min="2.50" 
                      max="5.50" 
                      step="0.10"
                      value={gasPrice}
                      onChange={(e) => setGasPrice(Number(e.target.value))}
                    />
                    <span>${gasPrice.toFixed(2)}/gal</span>
                  </div>
                </div>
              )}
            </div>

            {/* Savings Tips */}
            <div className="cost-enhanced__tips">
              <h3 className="cost-enhanced__section-title">
                <Lightbulb size={18} />
                Ways to Save
              </h3>
              <div className="cost-enhanced__tips-list">
                <div className="cost-enhanced__tip">
                  <span className="cost-enhanced__tip-icon">💡</span>
                  <div className="cost-enhanced__tip-content">
                    <span className="cost-enhanced__tip-title">Get 0% APR financing</span>
                    <span className="cost-enhanced__tip-savings">Save up to {formatCurrency(calculatedCosts.financing)}</span>
                  </div>
                </div>
                <div className="cost-enhanced__tip">
                  <span className="cost-enhanced__tip-icon">💡</span>
                  <div className="cost-enhanced__tip-content">
                    <span className="cost-enhanced__tip-title">Buy certified pre-owned</span>
                    <span className="cost-enhanced__tip-savings">Save ~{formatCurrency(Math.round(calculatedCosts.depreciation * 0.4))} in depreciation</span>
                  </div>
                </div>
                <div className="cost-enhanced__tip">
                  <span className="cost-enhanced__tip-icon">💡</span>
                  <div className="cost-enhanced__tip-content">
                    <span className="cost-enhanced__tip-title">Compare insurance quotes</span>
                    <span className="cost-enhanced__tip-savings">Potential savings of 15-25%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="cost-enhanced__ctas">
              <button className="cost-enhanced__cta cost-enhanced__cta--primary">
                Get Pre-Approved
                <ChevronRight size={18} />
              </button>
              <button className="cost-enhanced__cta cost-enhanced__cta--secondary">
                Compare Insurance Quotes
              </button>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default CostToOwnEnhanced;

