import { useState } from 'react';
import { ChevronDown, Info, ArrowUpRight } from 'lucide-react';
import './Incentives.css';

interface Incentive {
  id: string;
  type: 'lease' | 'cash' | 'finance';
  title: string;
  details: string;
  expiration: string;
}

interface IncentivesProps {
  month?: string;
  year?: number;
  make?: string;
  model?: string;
  zipCode?: string;
}

const Incentives = ({
  month = 'October',
  year = 2025,
  make = 'Chevrolet',
  model = 'Trax',
  zipCode = '10940'
}: IncentivesProps) => {
  const [activeTab, setActiveTab] = useState('all');
  const [creditScore, setCreditScore] = useState('Select Est. Credit Score');
  const [monthlyTerm, setMonthlyTerm] = useState('Select Monthly Term');

  const tabs = [
    { id: 'all', label: 'All' },
    { id: 'cash', label: 'Cash' },
    { id: 'finance', label: 'Finance' },
    { id: 'lease', label: 'Lease' },
  ];

  const incentives: Incentive[] = [
    {
      id: '1',
      type: 'lease',
      title: 'Standard Lease Rate',
      details: 'APR · 6.96% · Months · 36',
      expiration: '12/31/2025',
    },
    {
      id: '2',
      type: 'cash',
      title: 'Military Appreciation Incentive Program',
      details: 'Up to $500 customer cash',
      expiration: '10/31/2025',
    },
    {
      id: '3',
      type: 'cash',
      title: 'Vehicles for Change Donation Bonus Cash Support',
      details: 'Up to $500 customer cash',
      expiration: '10/31/2025',
    },
    {
      id: '4',
      type: 'cash',
      title: 'Chevrolet Northeast Loyalty Promo Code Program',
      details: 'Up to $250 customer cash',
      expiration: '10/31/2025',
    },
    {
      id: '5',
      type: 'cash',
      title: 'Chevrolet Northeast Loyalty Promo Code Program - EEQ 10A',
      details: 'Up to $2500 customer cash',
      expiration: '10/31/2025',
    },
  ];

  const filteredIncentives = activeTab === 'all' 
    ? incentives 
    : incentives.filter(inc => inc.type === activeTab);

  return (
    <section className="incentives">
      <div className="container">
        <div className="incentives__card">
          {/* Header */}
          <div className="incentives__header">
            <h2 className="incentives__title">Manufacturer Incentives & Rebates</h2>
          </div>

          {/* Description */}
          <p className="incentives__description">
            For <strong>{month} {year}</strong>, {make} is offering competitive financing rates for models, 
            with interest rates starting as low as 1.9%. Lease deals are also available for models, with an 
            APR of 4.03%. Additionally, {make} is providing 8 cash incentives {model}, including 
            loyalty/conquest offers and special programs like the {make} Northeast Loyalty Promo Code 
            Program - EEQ 10A of $2,500.
          </p>

          {/* Filters */}
          <div className="incentives__filters">
            <div className="incentives__select-wrapper">
              <span className="incentives__select-label">Est. Credit Score</span>
              <span className="incentives__select-divider">·</span>
              <select 
                className="incentives__select"
                value={creditScore}
                onChange={(e) => setCreditScore(e.target.value)}
              >
                <option>Select Est. Credit Score</option>
                <option>Excellent (750+)</option>
                <option>Good (700-749)</option>
                <option>Fair (650-699)</option>
                <option>Poor (Below 650)</option>
              </select>
              <ChevronDown size={16} className="incentives__select-icon" />
            </div>

            <div className="incentives__select-wrapper">
              <span className="incentives__select-label">Monthly Term</span>
              <span className="incentives__select-divider">·</span>
              <select 
                className="incentives__select"
                value={monthlyTerm}
                onChange={(e) => setMonthlyTerm(e.target.value)}
              >
                <option>Select Monthly Term</option>
                <option>24 Months</option>
                <option>36 Months</option>
                <option>48 Months</option>
                <option>60 Months</option>
                <option>72 Months</option>
              </select>
              <ChevronDown size={16} className="incentives__select-icon" />
            </div>
          </div>

          {/* Tabs and Location */}
          <div className="incentives__tabs-row">
            <div className="incentives__tabs">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  className={`incentives__tab ${activeTab === tab.id ? 'incentives__tab--active' : ''}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="incentives__location">
              <span className="incentives__zip">📍 {zipCode}</span>
              <button className="incentives__change-location">Change Location</button>
            </div>
          </div>

          {/* Incentives List */}
          <div className="incentives__list">
            {filteredIncentives.map(incentive => (
              <div key={incentive.id} className="incentives__item">
                <div className="incentives__item-content">
                  <span className={`incentives__badge incentives__badge--${incentive.type}`}>
                    {incentive.type.charAt(0).toUpperCase() + incentive.type.slice(1)}
                  </span>
                  <div className="incentives__item-info">
                    <h3 className="incentives__item-title">
                      {incentive.title}
                      {incentive.type === 'lease' && (
                        <button className="incentives__item-info-btn" aria-label="More info">
                          <Info size={14} />
                        </button>
                      )}
                    </h3>
                    <p className="incentives__item-details">
                      {incentive.details}
                      <span className="incentives__item-exp">Exp · {incentive.expiration}</span>
                    </p>
                  </div>
                </div>
                <button className="incentives__item-link" aria-label="View details">
                  <ArrowUpRight size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Incentives;

