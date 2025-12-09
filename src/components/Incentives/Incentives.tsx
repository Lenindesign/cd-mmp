import { useState } from 'react';
import { ChevronDown, Info, ArrowUpRight, Clock, AlertCircle } from 'lucide-react';
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
  month = 'December',
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
      type: 'finance',
      title: 'Low APR Financing',
      details: 'APR · 2.9% · Months · 60',
      expiration: '01/02/2026',
    },
    {
      id: '2',
      type: 'lease',
      title: 'Standard Lease Rate',
      details: '$219/mo · 36 months · $2,499 due at signing',
      expiration: '01/02/2026',
    },
    {
      id: '3',
      type: 'cash',
      title: 'Chevrolet Customer Cash',
      details: 'Up to $1,000 customer cash',
      expiration: '01/02/2026',
    },
    {
      id: '4',
      type: 'cash',
      title: 'Military Appreciation Incentive Program',
      details: 'Up to $500 customer cash',
      expiration: '01/02/2026',
    },
    {
      id: '5',
      type: 'cash',
      title: 'First Responder Appreciation Program',
      details: 'Up to $500 customer cash',
      expiration: '01/02/2026',
    },
    {
      id: '6',
      type: 'cash',
      title: 'College Student Discount',
      details: 'Up to $500 customer cash',
      expiration: '01/02/2026',
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
            For <strong>{month} {year}</strong>, {make} is offering competitive financing rates on the {model}, 
            with interest rates starting as low as 2.9% APR for 60 months. Lease deals are also available starting 
            at $219/month. Additionally, {make} is providing up to $2,500 in combined cash incentives on the {model}, including 
            military, first responder, and college student discounts.
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

          {/* Urgency CTA */}
          <div className="incentives__urgency">
            <div className="incentives__urgency-alert">
              <AlertCircle size={20} />
              <span>These incentives expire soon!</span>
            </div>
            <div className="incentives__urgency-content">
              <div className="incentives__urgency-text">
                <Clock size={18} />
                <p>Don't miss out on <strong>up to $2,500</strong> in savings. Year-end deals won't last forever!</p>
              </div>
              <button className="incentives__urgency-cta">
                Claim Your Incentive Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Incentives;

