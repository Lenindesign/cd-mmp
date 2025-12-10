import { useState, useEffect } from 'react';
import { Info, ChevronDown } from 'lucide-react';
import './BuyingPotential.css';

const BuyingPotential = () => {
  const [vehicleType, setVehicleType] = useState('New car');
  const [downPayment, setDownPayment] = useState(2500);
  const [creditScore, setCreditScore] = useState('Good (670-739)');
  const [monthlyPayment, setMonthlyPayment] = useState(450);
  const [includeTradeIn, setIncludeTradeIn] = useState(false);
  const [buyingPower, setBuyingPower] = useState(0);
  
  const [vehicleTypeOpen, setVehicleTypeOpen] = useState(false);
  const [creditScoreOpen, setCreditScoreOpen] = useState(false);

  const vehicleTypes = ['New car', 'Used car'];
  const creditScores = [
    'Excellent (740-850)',
    'Good (670-739)',
    'Fair (580-669)',
    'Poor (300-579)',
  ];

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
    const months = 60; // 5-year loan term
    
    // Using loan formula: P = PMT * [(1 - (1 + r)^-n) / r]
    const loanAmount = monthlyPayment * ((1 - Math.pow(1 + apr, -months)) / apr);
    const totalBuyingPower = loanAmount + downPayment + (includeTradeIn ? 3000 : 0);
    
    setBuyingPower(Math.round(totalBuyingPower));
  }, [monthlyPayment, downPayment, creditScore, includeTradeIn]);

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

            <div className="buying-potential__image">
              <img 
                src="https://d2kde5ohu8qb21.cloudfront.net/files/66c5ee7c8a192c000814f46b/suvs-0029-2025-chevrolet-trax.png" 
                alt="2025 Chevrolet Trax"
              />
            </div>
          </div>

          {/* Right Side - Calculator */}
          <div className="buying-potential__right">
            {/* Buying Power Display */}
            <div className="buying-potential__power">
              <span className="buying-potential__power-amount">{formatCurrency(buyingPower)}</span>
              <span className="buying-potential__power-label">Est. buying power</span>
              <span className="buying-potential__power-apr">Based on {getAPR()}% APR</span>
            </div>

            {/* Calculator Form */}
            <div className="buying-potential__form">
              <div className="buying-potential__row">
                {/* Vehicle Type */}
                <div className="buying-potential__field">
                  <label className="buying-potential__label">Looking for</label>
                  <div className="buying-potential__select-wrapper">
                    <button
                      className="buying-potential__select"
                      onClick={() => {
                        setVehicleTypeOpen(!vehicleTypeOpen);
                        setCreditScoreOpen(false);
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

                {/* Down Payment */}
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
            </div>

            {/* CTA Button */}
            <button className="buying-potential__cta">
              See your matches
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BuyingPotential;

