import { useState, useMemo } from 'react';
import { ChevronDown, Info, ArrowUpRight, Clock, AlertCircle } from 'lucide-react';
import { offersToIncentives } from '../../utils/dealCalculations';
import { getCurrentPeriod } from '../../utils/dateUtils';
import { Button } from '../Button';
import Tabs from '../Tabs/Tabs';
import './Incentives.css';

type Incentive = ReturnType<typeof offersToIncentives>[number];

interface IncentivesProps {
  month?: string;
  year?: number;
  make?: string;
  model?: string;
  zipCode?: string;
  msrp?: number;
  bodyStyle?: string;
  fuelType?: string;
}

const Incentives = ({
  make = 'Chevrolet',
  model = 'Trax',
  zipCode = '10940',
  fuelType = 'Gas',
}: IncentivesProps) => {
  const [activeTab, setActiveTab] = useState('all');
  const [creditScore, setCreditScore] = useState('Select Est. Credit Score');
  const [monthlyTerm, setMonthlyTerm] = useState('Select Monthly Term');

  const { month, year } = getCurrentPeriod();

  const incentives = useMemo<Incentive[]>(
    () => offersToIncentives(make, model),
    [make, model]
  );

  const totalSavings = useMemo(() => {
    return incentives
      .filter(i => i.type === 'cash')
      .reduce((sum, i) => {
        const match = i.value.match(/\$([\d,]+)/);
        return match ? sum + parseInt(match[1].replace(/,/g, ''), 10) : sum;
      }, 0);
  }, [incentives]);

  const hasType = (type: Incentive['type']) => incentives.some(i => i.type === type);

  const tabs = [
    { id: 'all', label: 'All' },
    ...(hasType('cash') ? [{ id: 'cash', label: 'Cash' }] : []),
    ...(hasType('finance') ? [{ id: 'finance', label: 'Buy' }] : []),
    ...(hasType('lease') ? [{ id: 'lease', label: 'Lease' }] : []),
  ];

  const financeIncentive = incentives.find(i => i.type === 'finance');
  const leaseIncentive = incentives.find(i => i.type === 'lease');

  const aprRate = financeIncentive?.value.match(/[\d.]+/)?.[0] || null;
  const leasePayment = leaseIncentive?.value.match(/\$[\d,]+/)?.[0] || null;

  const filteredIncentives = activeTab === 'all'
    ? incentives
    : incentives.filter(inc => inc.type === activeTab);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const getIncentiveTypeLabel = (type: Incentive['type']) => {
    const labels: Record<Incentive['type'], string> = {
      cash: 'Cash',
      finance: 'Buy',
      lease: 'Lease',
      special: 'Special',
    };
    return labels[type];
  };

  const descriptionParts: string[] = [];
  if (aprRate) descriptionParts.push(`interest rates starting as low as ${aprRate}% APR`);
  if (leasePayment) descriptionParts.push(`lease deals starting at ${leasePayment}/month`);
  if (totalSavings > 0) descriptionParts.push(`up to ${formatCurrency(totalSavings)} in combined cash incentives`);
  const descriptionSentence = descriptionParts.length > 0
    ? `, offering ${descriptionParts.join(', ').replace(/,([^,]*)$/, ', and$1')}.`
    : '.';

  if (incentives.length === 0) {
    return (
      <section className="incentives">
        <div className="container">
          <div className="incentives__card">
            <div className="incentives__header">
              <h2 className="incentives__title">Manufacturer Incentives & Rebates</h2>
            </div>
            <p className="incentives__description">
              No current manufacturer incentives are available for the {make} {model} in {month} {year}.
              Check back soon — {make} typically refreshes programs at the start of each month.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="incentives">
      <div className="container">
        <div className="incentives__card">
          {/* Header */}
          <div className="incentives__header">
            <h2 className="incentives__title">Manufacturer Incentives & Rebates</h2>
          </div>

          {/* Urgency CTA */}
          {totalSavings > 0 && (
            <div className="incentives__urgency">
              <div className="incentives__urgency-alert">
                <AlertCircle size={20} />
                <span>These incentives expire soon!</span>
              </div>
              <div className="incentives__urgency-content">
                <div className="incentives__urgency-text">
                  <Clock size={18} />
                  <p>Don't miss out on <strong>up to {formatCurrency(totalSavings)}</strong> in savings. Act before these offers expire.</p>
                </div>
                <Button variant="primary" className="incentives__urgency-cta">
                  Claim Your Incentive Now
                </Button>
              </div>
            </div>
          )}

          {/* Description */}
          <p className="incentives__description">
            For <strong>{month} {year}</strong>, {make} is running {incentives.length} active {incentives.length === 1 ? 'program' : 'programs'} on the {model}{descriptionSentence}
            {fuelType === 'Electric' && ' This vehicle may also qualify for federal EV tax credits.'}
            {fuelType === 'Hybrid' && ' This vehicle may also qualify for clean vehicle credits.'}
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
            <Tabs
              variant="pills"
              items={tabs.map(tab => ({ value: tab.id, label: tab.label }))}
              value={activeTab}
              onChange={setActiveTab}
            />

            <div className="incentives__location">
              <span className="incentives__zip">📍 {zipCode}</span>
              <Button variant="ghost" size="small" className="incentives__change-location">
                Change Location
              </Button>
            </div>
          </div>

          {/* Incentives List */}
          <div className="incentives__list">
            {filteredIncentives.map(incentive => (
              <div key={incentive.id} className="incentives__item">
                <div className="incentives__item-content">
                  <span className={`incentives__badge incentives__badge--${incentive.type}`}>
                    {getIncentiveTypeLabel(incentive.type)}
                  </span>
                  <div className="incentives__item-info">
                    <h3 className="incentives__item-title">
                      {incentive.title}
                      <button className="incentives__item-info-btn" aria-label="More info">
                        <Info size={14} />
                      </button>
                    </h3>
                    <p className="incentives__item-details">
                      {incentive.description}
                      <span className="incentives__item-exp">Exp · {incentive.expirationDate}</span>
                    </p>
                    {incentive.terms && (
                      <p className="incentives__item-terms">{incentive.terms}</p>
                    )}
                    {incentive.eligibility && (
                      <p className="incentives__item-eligibility">
                        <strong>Eligibility:</strong> {incentive.eligibility}
                      </p>
                    )}
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  size="small" 
                  className="incentives__item-link" 
                  aria-label="View details"
                  iconLeft={<ArrowUpRight size={18} />}
                />
              </div>
            ))}
          </div>

          {/* Source Attribution */}
          <div className="incentives__source">
            <p>Incentive data sourced from manufacturer websites and verified through Edmunds, KBB, and dealer networks. Offers may vary by region and dealer participation.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Incentives;
