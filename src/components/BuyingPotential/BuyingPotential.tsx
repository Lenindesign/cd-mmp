import { useState, useEffect, useMemo } from 'react';
import { Info, ChevronDown, Car, CheckCircle, ArrowRight } from 'lucide-react';
import { getBuyingPotentialVehicles, type BuyingPotentialVehicle } from '../../services/vehicleService';
import './BuyingPotential.css';

const BuyingPotential = () => {
  const [vehicleType, setVehicleType] = useState('New car');
  const [downPayment, setDownPayment] = useState(2500);
  const [creditScore, setCreditScore] = useState('Good (670-739)');
  const [monthlyPayment, setMonthlyPayment] = useState(450);
  const [loanTerm, setLoanTerm] = useState(60);
  const [includeTradeIn, setIncludeTradeIn] = useState(false);
  const [tradeInAmount, setTradeInAmount] = useState(0);
  const [buyingPower, setBuyingPower] = useState(0);
  const [displayedPower, setDisplayedPower] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const [vehicleTypeOpen, setVehicleTypeOpen] = useState(false);
  const [creditScoreOpen, setCreditScoreOpen] = useState(false);
  const [loanTermOpen, setLoanTermOpen] = useState(false);

  const vehicleTypes = ['New car', 'Used car'];
  const creditScores = [
    'Excellent (740-850)',
    'Good (670-739)',
    'Fair (580-669)',
    'Poor (300-579)',
  ];
  const loanTerms = [36, 48, 60, 72, 84];

  // Get vehicle matches from database based on buying power
  const vehicleMatches = useMemo<BuyingPotentialVehicle[]>(() => {
    if (buyingPower <= 0) return [];
    return getBuyingPotentialVehicles(buyingPower, 20);
  }, [buyingPower]);

  // Get APR based on credit score
  const getAPR = () => {
    switch (creditScore) {
      case 'Excellent (740-850)': return 5.49;
      case 'Good (670-739)': return 7.57;
      case 'Fair (580-669)': return 11.89;
      case 'Poor (300-579)': return 14.99;
      default: return 7.57;
    }
  };

  // Calculate buying power
  useEffect(() => {
    const apr = getAPR() / 100 / 12; // Monthly interest rate
    
    // Using loan formula: P = PMT * [(1 - (1 + r)^-n) / r]
    const loanAmount = monthlyPayment * ((1 - Math.pow(1 + apr, -loanTerm)) / apr);
    const totalBuyingPower = loanAmount + downPayment + (includeTradeIn ? tradeInAmount : 0);
    
    setBuyingPower(Math.round(totalBuyingPower));
  }, [monthlyPayment, downPayment, creditScore, loanTerm, includeTradeIn, tradeInAmount]);

  // Animate the displayed buying power when it changes
  useEffect(() => {
    if (buyingPower === displayedPower) return;
    
    setIsAnimating(true);
    const startValue = displayedPower;
    const endValue = buyingPower;
    const duration = 500; // Animation duration in ms
    const startTime = performance.now();
    
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function (ease-out)
      const easeOut = 1 - Math.pow(1 - progress, 3);
      
      const currentValue = Math.round(startValue + (endValue - startValue) * easeOut);
      setDisplayedPower(currentValue);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setIsAnimating(false);
      }
    };
    
    requestAnimationFrame(animate);
  }, [buyingPower]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <section className="buying-potential">
      <div className="container">
        <div className="buying-potential__card">
          {/* Left Side - Info & Image */}
          <div className="buying-potential__left">
            <span className="buying-potential__badge">NEW</span>
            
            <div className="buying-potential__header">
              <h2 className="buying-potential__title">
                See Your Buying Potential
                <button className="buying-potential__info-btn" aria-label="More info">
                  <Info size={18} />
                </button>
              </h2>
              <p className="buying-potential__description">
                Calculate your budget and instantly see vehicles that fit your financial comfort zone.
              </p>
            </div>

            {/* Vehicle Matches */}
            {vehicleMatches.length > 0 ? (
              <div className="buying-potential__matches">
                <h3 className="buying-potential__matches-title">
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Car size={18} />
                    Subcompact SUVs In Your Budget
                  </span>
                  <span className="buying-potential__matches-count">{vehicleMatches.length} found</span>
                </h3>
                <div className="buying-potential__matches-list">
                  {vehicleMatches.map((vehicle, index) => (
                    <div key={index} className="buying-potential__match">
                      <img src={vehicle.image} alt={vehicle.name} className="buying-potential__match-image" />
                      <div className="buying-potential__match-info">
                        <span className="buying-potential__match-name">{vehicle.name}</span>
                        <span className="buying-potential__match-trim">{vehicle.trim}</span>
                        <span className="buying-potential__match-price">{formatCurrency(vehicle.price)}</span>
                      </div>
                      <CheckCircle size={18} className="buying-potential__match-check" />
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="buying-potential__image">
                <img 
                  src="https://d2kde5ohu8qb21.cloudfront.net/files/66c5ee7c8a192c000814f46b/suvs-0029-2025-chevrolet-trax.png" 
                  alt="2025 Chevrolet Trax"
                />
              </div>
            )}
          </div>

          {/* Right Side - Calculator */}
          <div className="buying-potential__right">
            {/* Buying Power Display */}
            <div className="buying-potential__power">
              <span className={`buying-potential__power-amount ${isAnimating ? 'buying-potential__power-amount--animating' : ''}`}>
                {formatCurrency(displayedPower)}
              </span>
              <span className="buying-potential__power-label">Est. buying power</span>
              <div className="buying-potential__power-details">
                <span className="buying-potential__power-apr">{getAPR()}% APR</span>
                <span className="buying-potential__power-separator">•</span>
                <span className="buying-potential__power-term">{loanTerm} months</span>
                <span className="buying-potential__power-separator">•</span>
                <span className="buying-potential__power-monthly">{formatCurrency(monthlyPayment)}/mo</span>
              </div>
            </div>

            {/* Calculator Form */}
            <div className="buying-potential__form">
              <div className="buying-potential__row buying-potential__row--single">
                {/* Vehicle Type */}
                <div className="buying-potential__field">
                  <label className="buying-potential__label">Looking for</label>
                  <div className="buying-potential__select-wrapper">
                    <button
                      className="buying-potential__select"
                      onClick={() => {
                        setVehicleTypeOpen(!vehicleTypeOpen);
                        setCreditScoreOpen(false);
                        setLoanTermOpen(false);
                      }}
                    >
                      {vehicleType}
                      <ChevronDown size={16} />
                    </button>
                    {vehicleTypeOpen && (
                      <ul className="buying-potential__options">
                        {vehicleTypes.map((type) => (
                          <li key={type}>
                            <button
                              className={`buying-potential__option ${vehicleType === type ? 'active' : ''}`}
                              onClick={() => {
                                setVehicleType(type);
                                setVehicleTypeOpen(false);
                              }}
                            >
                              {type}
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>

              <div className="buying-potential__row">
                {/* Credit Score */}
                <div className="buying-potential__field">
                  <label className="buying-potential__label">Credit score</label>
                  <div className="buying-potential__select-wrapper">
                    <button
                      className="buying-potential__select"
                      onClick={() => {
                        setCreditScoreOpen(!creditScoreOpen);
                        setVehicleTypeOpen(false);
                        setLoanTermOpen(false);
                      }}
                    >
                      {creditScore}
                      <ChevronDown size={16} />
                    </button>
                    {creditScoreOpen && (
                      <ul className="buying-potential__options">
                        {creditScores.map((score) => (
                          <li key={score}>
                            <button
                              className={`buying-potential__option ${creditScore === score ? 'active' : ''}`}
                              onClick={() => {
                                setCreditScore(score);
                                setCreditScoreOpen(false);
                              }}
                            >
                              {score}
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>

                {/* Loan Term */}
                <div className="buying-potential__field">
                  <label className="buying-potential__label">Loan term</label>
                  <div className="buying-potential__select-wrapper">
                    <button
                      className="buying-potential__select"
                      onClick={() => {
                        setLoanTermOpen(!loanTermOpen);
                        setVehicleTypeOpen(false);
                        setCreditScoreOpen(false);
                      }}
                    >
                      {loanTerm} months
                      <ChevronDown size={16} />
                    </button>
                    {loanTermOpen && (
                      <ul className="buying-potential__options">
                        {loanTerms.map((term) => (
                          <li key={term}>
                            <button
                              className={`buying-potential__option ${loanTerm === term ? 'active' : ''}`}
                              onClick={() => {
                                setLoanTerm(term);
                                setLoanTermOpen(false);
                              }}
                            >
                              {term} months ({term / 12} years)
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>

              <div className="buying-potential__row">
                {/* Monthly Payment */}
                <div className="buying-potential__field">
                  <label className="buying-potential__label">Monthly payment</label>
                  <div className="buying-potential__input-wrapper">
                    <span className="buying-potential__input-prefix">$</span>
                    <input
                      type="number"
                      className="buying-potential__input"
                      value={monthlyPayment}
                      onChange={(e) => setMonthlyPayment(Number(e.target.value))}
                      min={100}
                      step={50}
                    />
                  </div>
                </div>

                {/* Down Payment - moved here */}
                <div className="buying-potential__field">
                  <label className="buying-potential__label">Down payment</label>
                  <div className="buying-potential__input-wrapper">
                    <span className="buying-potential__input-prefix">$</span>
                    <input
                      type="number"
                      className="buying-potential__input"
                      value={downPayment}
                      onChange={(e) => setDownPayment(Number(e.target.value))}
                      min={0}
                      step={100}
                    />
                  </div>
                </div>
              </div>

              {/* Trade-in Toggle */}
              <div className="buying-potential__toggle-row">
                <label className="buying-potential__toggle">
                  <input
                    type="checkbox"
                    checked={includeTradeIn}
                    onChange={(e) => setIncludeTradeIn(e.target.checked)}
                  />
                  <span className="buying-potential__toggle-slider"></span>
                </label>
                <span className="buying-potential__toggle-label">Include trade-in</span>
              </div>

              {/* Trade-in Amount Input - Shows when toggle is on */}
              {includeTradeIn && (
                <div className="buying-potential__trade-in-field">
                  <label className="buying-potential__label">Trade-in amount</label>
                  <div className="buying-potential__input-wrapper buying-potential__input-wrapper--full">
                    <span className="buying-potential__input-prefix">$</span>
                    <input
                      type="number"
                      className="buying-potential__input"
                      value={tradeInAmount}
                      onChange={(e) => setTradeInAmount(Number(e.target.value))}
                      min={0}
                      step={100}
                      placeholder="0"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* CTA Buttons */}
            <div className="buying-potential__cta-group">
              <button className="buying-potential__cta buying-potential__cta--primary">
                See All Vehicles Under {formatCurrency(buyingPower)}
                <ArrowRight size={18} />
              </button>
              <button className="buying-potential__cta buying-potential__cta--secondary">
                Get Pre-Approved
              </button>
            </div>

            {/* Disclaimer */}
            <p className="buying-potential__disclaimer">
              *Rates may vary based on credit history and lender. This calculator provides estimates only. 
              Actual rates as of December 2025.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BuyingPotential;

