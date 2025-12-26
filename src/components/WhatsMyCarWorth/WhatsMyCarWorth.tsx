import { useState, useMemo } from 'react';
import { ChevronDown, ArrowRight, TrendingUp, TrendingDown, Minus, Info, CheckCircle } from 'lucide-react';
import { vehicleDatabase } from '../../data/vehicles';
import { Button } from '../Button';
import './WhatsMyCarWorth.css';

interface WhatsMyCarWorthProps {
  /** Pre-selected year */
  defaultYear?: string;
  /** Pre-selected make */
  defaultMake?: string;
  /** Pre-selected model */
  defaultModel?: string;
  /** Callback when estimate is requested */
  onGetEstimate?: (data: { year: string; make: string; model: string; mileage: number; condition: string }) => void;
}

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 20 }, (_, i) => String(currentYear - i));

const conditions = [
  { value: 'excellent', label: 'Excellent', description: 'Like new, no visible wear' },
  { value: 'good', label: 'Good', description: 'Minor wear, well maintained' },
  { value: 'fair', label: 'Fair', description: 'Normal wear for age/mileage' },
  { value: 'poor', label: 'Poor', description: 'Significant wear or damage' },
];

const WhatsMyCarWorth = ({
  defaultYear = '',
  defaultMake = '',
  defaultModel = '',
  onGetEstimate,
}: WhatsMyCarWorthProps) => {
  const [year, setYear] = useState(defaultYear);
  const [make, setMake] = useState(defaultMake);
  const [model, setModel] = useState(defaultModel);
  const [mileage, setMileage] = useState('');
  const [condition, setCondition] = useState('good');
  const [showEstimate, setShowEstimate] = useState(false);
  
  // Dropdown states
  const [yearOpen, setYearOpen] = useState(false);
  const [makeOpen, setMakeOpen] = useState(false);
  const [modelOpen, setModelOpen] = useState(false);
  const [conditionOpen, setConditionOpen] = useState(false);

  // Get unique makes from database
  const makes = useMemo(() => {
    const uniqueMakes = [...new Set(vehicleDatabase.map(v => v.make))].sort();
    return uniqueMakes;
  }, []);

  // Get models for selected make
  const models = useMemo(() => {
    if (!make) return [];
    const uniqueModels = [...new Set(
      vehicleDatabase
        .filter(v => v.make === make)
        .map(v => v.model)
    )].sort();
    return uniqueModels;
  }, [make]);

  // Calculate estimated value (mock calculation)
  const estimatedValue = useMemo(() => {
    if (!year || !make || !model || !mileage) return null;
    
    // Find vehicle in database for base price
    const vehicle = vehicleDatabase.find(v => v.make === make && v.model === model);
    const basePrice = vehicle?.priceMin || 25000;
    
    // Age depreciation (roughly 15% per year for first 5 years, then 10%)
    const age = currentYear - parseInt(year);
    let ageMultiplier = 1;
    for (let i = 0; i < age; i++) {
      ageMultiplier *= i < 5 ? 0.85 : 0.90;
    }
    
    // Mileage depreciation (roughly $0.10-0.15 per mile over 12k/year average)
    const expectedMileage = age * 12000;
    const mileageNum = parseInt(mileage.replace(/,/g, ''));
    const mileageDiff = mileageNum - expectedMileage;
    const mileageAdjustment = mileageDiff * -0.12;
    
    // Condition multiplier
    const conditionMultipliers: Record<string, number> = {
      excellent: 1.10,
      good: 1.0,
      fair: 0.85,
      poor: 0.70,
    };
    
    const estimatedPrice = (basePrice * ageMultiplier + mileageAdjustment) * conditionMultipliers[condition];
    
    // Return range
    const low = Math.max(1000, Math.round(estimatedPrice * 0.92 / 100) * 100);
    const high = Math.round(estimatedPrice * 1.08 / 100) * 100;
    const mid = Math.round((low + high) / 2 / 100) * 100;
    
    // Market trend (mock)
    const trends = ['up', 'down', 'stable'] as const;
    const trend = trends[Math.floor(Math.random() * 3)];
    
    return { low, mid, high, trend };
  }, [year, make, model, mileage, condition]);

  const handleMakeChange = (newMake: string) => {
    setMake(newMake);
    setModel(''); // Reset model when make changes
    setMakeOpen(false);
  };

  const handleGetEstimate = () => {
    if (year && make && model && mileage) {
      setShowEstimate(true);
      onGetEstimate?.({
        year,
        make,
        model,
        mileage: parseInt(mileage.replace(/,/g, '')),
        condition,
      });
    }
  };

  const formatMileage = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    return numbers.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const isFormComplete = year && make && model && mileage;

  return (
    <section className="whats-my-car-worth">
      <div className="whats-my-car-worth__container">
        {/* Header */}
        <div className="whats-my-car-worth__header">
          <div className="whats-my-car-worth__title-group">
            <h2 className="whats-my-car-worth__title">What's My Car Worth?</h2>
            <p className="whats-my-car-worth__subtitle">
              Get an instant trade-in estimate powered by Black Book
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="whats-my-car-worth__form">
          <div className="whats-my-car-worth__form-row">
            {/* Year */}
            <div className="whats-my-car-worth__field">
              <label className="whats-my-car-worth__label">Year</label>
              <div className="whats-my-car-worth__select-wrapper">
                <button
                  type="button"
                  className={`whats-my-car-worth__select ${year ? 'whats-my-car-worth__select--selected' : ''}`}
                  onClick={() => setYearOpen(!yearOpen)}
                >
                  <span>{year || 'Select year'}</span>
                  <ChevronDown size={18} className={yearOpen ? 'rotated' : ''} />
                </button>
                {yearOpen && (
                  <div className="whats-my-car-worth__dropdown">
                    {years.map(y => (
                      <button
                        key={y}
                        type="button"
                        className={`whats-my-car-worth__dropdown-item ${y === year ? 'selected' : ''}`}
                        onClick={() => { setYear(y); setYearOpen(false); }}
                      >
                        {y}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Make */}
            <div className="whats-my-car-worth__field">
              <label className="whats-my-car-worth__label">Make</label>
              <div className="whats-my-car-worth__select-wrapper">
                <button
                  type="button"
                  className={`whats-my-car-worth__select ${make ? 'whats-my-car-worth__select--selected' : ''}`}
                  onClick={() => setMakeOpen(!makeOpen)}
                >
                  <span>{make || 'Select make'}</span>
                  <ChevronDown size={18} className={makeOpen ? 'rotated' : ''} />
                </button>
                {makeOpen && (
                  <div className="whats-my-car-worth__dropdown">
                    {makes.map(m => (
                      <button
                        key={m}
                        type="button"
                        className={`whats-my-car-worth__dropdown-item ${m === make ? 'selected' : ''}`}
                        onClick={() => handleMakeChange(m)}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Model */}
            <div className="whats-my-car-worth__field">
              <label className="whats-my-car-worth__label">Model</label>
              <div className="whats-my-car-worth__select-wrapper">
                <button
                  type="button"
                  className={`whats-my-car-worth__select ${model ? 'whats-my-car-worth__select--selected' : ''}`}
                  onClick={() => make && setModelOpen(!modelOpen)}
                  disabled={!make}
                >
                  <span>{model || (make ? 'Select model' : 'Select make first')}</span>
                  <ChevronDown size={18} className={modelOpen ? 'rotated' : ''} />
                </button>
                {modelOpen && (
                  <div className="whats-my-car-worth__dropdown">
                    {models.map(m => (
                      <button
                        key={m}
                        type="button"
                        className={`whats-my-car-worth__dropdown-item ${m === model ? 'selected' : ''}`}
                        onClick={() => { setModel(m); setModelOpen(false); }}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="whats-my-car-worth__form-row">
            {/* Mileage */}
            <div className="whats-my-car-worth__field">
              <label className="whats-my-car-worth__label">Current Mileage</label>
              <div className="whats-my-car-worth__input-wrapper">
                <input
                  type="text"
                  className="whats-my-car-worth__input"
                  placeholder="e.g. 45,000"
                  value={mileage}
                  onChange={(e) => setMileage(formatMileage(e.target.value))}
                />
                <span className="whats-my-car-worth__input-suffix">miles</span>
              </div>
            </div>

            {/* Condition */}
            <div className="whats-my-car-worth__field whats-my-car-worth__field--wide">
              <label className="whats-my-car-worth__label">Condition</label>
              <div className="whats-my-car-worth__select-wrapper">
                <button
                  type="button"
                  className="whats-my-car-worth__select whats-my-car-worth__select--selected"
                  onClick={() => setConditionOpen(!conditionOpen)}
                >
                  <span>{conditions.find(c => c.value === condition)?.label}</span>
                  <ChevronDown size={18} className={conditionOpen ? 'rotated' : ''} />
                </button>
                {conditionOpen && (
                  <div className="whats-my-car-worth__dropdown whats-my-car-worth__dropdown--condition">
                    {conditions.map(c => (
                      <button
                        key={c.value}
                        type="button"
                        className={`whats-my-car-worth__dropdown-item ${c.value === condition ? 'selected' : ''}`}
                        onClick={() => { setCondition(c.value); setConditionOpen(false); }}
                      >
                        <span className="whats-my-car-worth__condition-label">{c.label}</span>
                        <span className="whats-my-car-worth__condition-desc">{c.description}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <Button
            variant="success"
            size="large"
            fullWidth
            className="whats-my-car-worth__cta"
            onClick={handleGetEstimate}
            disabled={!isFormComplete}
            iconRight={<ArrowRight size={18} />}
          >
            GET MY ESTIMATE
          </Button>
        </div>

        {/* Estimate Results */}
        {showEstimate && estimatedValue && (
          <div className="whats-my-car-worth__results">
            <div className="whats-my-car-worth__results-header">
              <h3 className="whats-my-car-worth__results-title">
                Your {year} {make} {model} Estimate
              </h3>
              <div className="whats-my-car-worth__results-meta">
                <span>{mileage} miles</span>
                <span className="whats-my-car-worth__divider">•</span>
                <span>{conditions.find(c => c.value === condition)?.label} condition</span>
              </div>
            </div>

            <div className="whats-my-car-worth__value-display">
              <div className="whats-my-car-worth__value-range">
                <div className="whats-my-car-worth__value-low">
                  <span className="whats-my-car-worth__value-label">Trade-In Low</span>
                  <span className="whats-my-car-worth__value-amount">{formatPrice(estimatedValue.low)}</span>
                </div>
                <div className="whats-my-car-worth__value-mid">
                  <span className="whats-my-car-worth__value-label">Estimated Value</span>
                  <span className="whats-my-car-worth__value-amount whats-my-car-worth__value-amount--primary">
                    {formatPrice(estimatedValue.mid)}
                  </span>
                  <div className="whats-my-car-worth__trend">
                    {estimatedValue.trend === 'up' && (
                      <>
                        <TrendingUp size={16} className="whats-my-car-worth__trend-icon whats-my-car-worth__trend-icon--up" />
                        <span className="whats-my-car-worth__trend-text whats-my-car-worth__trend-text--up">Market trending up</span>
                      </>
                    )}
                    {estimatedValue.trend === 'down' && (
                      <>
                        <TrendingDown size={16} className="whats-my-car-worth__trend-icon whats-my-car-worth__trend-icon--down" />
                        <span className="whats-my-car-worth__trend-text whats-my-car-worth__trend-text--down">Market trending down</span>
                      </>
                    )}
                    {estimatedValue.trend === 'stable' && (
                      <>
                        <Minus size={16} className="whats-my-car-worth__trend-icon whats-my-car-worth__trend-icon--stable" />
                        <span className="whats-my-car-worth__trend-text whats-my-car-worth__trend-text--stable">Market stable</span>
                      </>
                    )}
                  </div>
                </div>
                <div className="whats-my-car-worth__value-high">
                  <span className="whats-my-car-worth__value-label">Trade-In High</span>
                  <span className="whats-my-car-worth__value-amount">{formatPrice(estimatedValue.high)}</span>
                </div>
              </div>

              <div className="whats-my-car-worth__value-bar">
                <div className="whats-my-car-worth__value-bar-track">
                  <div className="whats-my-car-worth__value-bar-fill" />
                  <div className="whats-my-car-worth__value-bar-marker" />
                </div>
              </div>
            </div>

            <div className="whats-my-car-worth__results-info">
              <Info size={16} />
              <p>
                This estimate is based on current market data. Actual trade-in value may vary based on 
                vehicle history, local market conditions, and dealer assessment.
              </p>
            </div>

            <div className="whats-my-car-worth__results-actions">
              <Button 
                variant="primary"
                className="whats-my-car-worth__action-btn"
                iconLeft={<CheckCircle size={18} />}
              >
                GET DEALER OFFERS
              </Button>
              <Button 
                variant="outline"
                className="whats-my-car-worth__action-btn"
              >
                SHOP WITH TRADE-IN
              </Button>
            </div>

            <p className="whats-my-car-worth__powered-by">
              Powered by <strong>Black Book</strong>
            </p>
          </div>
        )}

        {/* Trust Badges */}
        <div className="whats-my-car-worth__trust">
          <div className="whats-my-car-worth__trust-item">
            <CheckCircle size={16} />
            <span>No personal info required</span>
          </div>
          <div className="whats-my-car-worth__trust-item">
            <CheckCircle size={16} />
            <span>Instant results</span>
          </div>
          <div className="whats-my-car-worth__trust-item">
            <CheckCircle size={16} />
            <span>Real market data</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatsMyCarWorth;

