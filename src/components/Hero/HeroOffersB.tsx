import { useMemo } from 'react';
import type { Incentive, VehicleIncentives } from '../../services/incentivesService';

interface HeroOffersBProps {
  vehicleIncentives: VehicleIncentives;
  onOfferClick: (inc: Incentive) => void;
}

const stripQualifier = (v: string) =>
  v.replace(/^(as low as|up to|starting at)\s+/i, '');

const formatExp = (date: string) => {
  const match = date.match(/^(\w+)\s+(\d+),?\s+(\d+)/);
  if (!match) return `expires ${date}`;
  const m = match[1].slice(0, 3);
  const d = match[2];
  const y = match[3].slice(-2);
  return `expires ${m.charAt(0).toUpperCase() + m.slice(1).toLowerCase()} ${d}/${y}`;
};

const getTermSuffix = (inc: Incentive) => {
  if (!inc.terms) return '';
  const m = inc.terms.match(/(\d+[\-–]\d+|\d+)\s*month/i);
  return m ? ` through ${m[1]} months` : '';
};

const getChipLabel = (type: Incentive['type']) => {
  switch (type) {
    case 'finance': return 'Buy';
    case 'lease': return 'Lease';
    default: return type;
  }
};

const HeroOffersB = ({ vehicleIncentives, onOfferClick }: HeroOffersBProps) => {
  const topOffers = useMemo(() => {
    const finance = vehicleIncentives.incentives.find(i => i.type === 'finance');
    const lease = vehicleIncentives.incentives.find(i => i.type === 'lease');
    return [finance, lease].filter(Boolean) as Incentive[];
  }, [vehicleIncentives]);

  if (topOffers.length === 0) return null;

  return (
    <div className="hero__offers-b">
      <h3 className="hero__offers-b-title">SPECIAL OFFERS AND INCENTIVES</h3>
      <div className="hero__offers-b-pills">
        {topOffers.map(inc => {
          const value = stripQualifier(inc.value);
          const label = inc.type === 'finance'
            ? `${value}${getTermSuffix(inc)}`
            : (() => {
                const termMatch = (inc.terms || '').match(/(\d+)[\s-]*month/i)
                  || (inc.description || '').match(/(\d+)[\s-]*month/i)
                  || (inc.title || '').match(/(\d+)[\s-]*month/i);
                return termMatch ? `${value} | ${termMatch[1]} mo.` : value;
              })();
          return (
            <button
              key={inc.id}
              type="button"
              className="hero__offers-b-pill"
              onClick={() => onOfferClick(inc)}
            >
              <span className="hero__offers-b-pill-chip">{getChipLabel(inc.type)}</span>
              <span className="hero__offers-b-pill-text">{label}</span>
              <span className="hero__offers-b-pill-exp">{formatExp(inc.expirationDate)}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default HeroOffersB;
