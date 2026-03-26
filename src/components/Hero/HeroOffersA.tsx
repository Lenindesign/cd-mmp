import { useState, useMemo } from 'react';
import type { Incentive, VehicleIncentives } from '../../services/incentivesService';

interface HeroOffersAProps {
  vehicleIncentives: VehicleIncentives;
  priceRange: string;
  onOfferClick: (inc: Incentive) => void;
  onViewAllClick: () => void;
}

const HeroOffersA = ({ vehicleIncentives, priceRange, onOfferClick, onViewAllClick }: HeroOffersAProps) => {
  const [offersTab, setOffersTab] = useState<'finance' | 'lease'>('finance');

  const stripQualifier = (v: string) =>
    v.replace(/^(as low as|up to|starting at)\s+/i, '');

  const formatExpDate = (date: string) => {
    const match = date.match(/^(\w+)\s+(\d+),?\s+(\d+)/);
    if (!match) return `exp ${date}`;
    const m = match[1].slice(0, 3);
    return `exp ${m.charAt(0).toUpperCase() + m.slice(1).toLowerCase()} ${match[2]}/${match[3].slice(-2)}`;
  };

  const financeIncentives = useMemo(() =>
    vehicleIncentives.incentives.filter(i => i.type === 'finance'),
    [vehicleIncentives]
  );

  const leaseIncentives = useMemo(() =>
    vehicleIncentives.incentives.filter(i => i.type === 'lease'),
    [vehicleIncentives]
  );

  const topIncentives = useMemo(() => {
    const pool = offersTab === 'finance' ? financeIncentives : leaseIncentives;
    return pool.slice(0, 3);
  }, [offersTab, financeIncentives, leaseIncentives]);

  const msrpBase = useMemo(() => {
    return parseInt((priceRange?.split(/[–\-]/)[0] || '').replace(/[^0-9]/g, '') || '0') || 0;
  }, [priceRange]);

  const tabPaymentLabel = useMemo(() => {
    const financeMonthly = msrpBase > 0 ? Math.round((msrpBase * 0.9) / 60) : 0;
    const leaseMonthly = msrpBase > 0 ? Math.round(msrpBase * 0.014) : 0;
    const fmt = (n: number) => '$' + n.toLocaleString();
    return {
      finance: financeMonthly > 0 ? `${fmt(financeMonthly)}/mo.` : '',
      lease: leaseMonthly > 0 ? `${fmt(leaseMonthly)}/mo.` : '',
    };
  }, [msrpBase]);

  if (vehicleIncentives.incentives.length === 0) return null;

  return (
    <div className="hero__offers">
      <div className="hero__offers-header">
        <div className="hero__offers-header-left">
          <h3 className="hero__offers-title">SPECIAL OFFERS AND INCENTIVES</h3>
          <span className="hero__offers-savings">
            Up to <strong>${vehicleIncentives.totalSavings.toLocaleString()}</strong> in savings
          </span>
        </div>
        <div className="hero__offers-tabs" role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={offersTab === 'finance'}
            className={`hero__offers-tab ${offersTab === 'finance' ? 'hero__offers-tab--active' : ''}`}
            onClick={() => setOffersTab('finance')}
          >
            Finance
            {tabPaymentLabel.finance && <span className="hero__offers-tab-price">{tabPaymentLabel.finance}</span>}
            <span className="hero__offers-tab-count">{financeIncentives.length}</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={offersTab === 'lease'}
            className={`hero__offers-tab ${offersTab === 'lease' ? 'hero__offers-tab--active' : ''}`}
            onClick={() => setOffersTab('lease')}
          >
            Lease
            {tabPaymentLabel.lease && <span className="hero__offers-tab-price">{tabPaymentLabel.lease}</span>}
            <span className="hero__offers-tab-count">{leaseIncentives.length}</span>
          </button>
        </div>
      </div>

      {topIncentives.length > 0 ? (
        <div className="hero__offers-list">
          {topIncentives.map((inc) => (
            <button
              key={inc.id}
              type="button"
              className="hero__offer"
              onClick={() => onOfferClick(inc)}
            >
              <span className="hero__offer-value">{stripQualifier(inc.value)}</span>
              <span className="hero__offer-label">
                {inc.title.replace(inc.value, '').trim()}
                {inc.terms && (() => {
                  const m = inc.terms.match(/(\d+[\-–]\d+|\d+)\s*month/i);
                  return m ? ` for ${m[1]} mo.` : '';
                })()}
              </span>
              <span className="hero__offer-exp">{formatExpDate(inc.expirationDate)}</span>
            </button>
          ))}
        </div>
      ) : (
        <p className="hero__offers-empty">
          No {offersTab} deals available for this vehicle right now.
        </p>
      )}

      {vehicleIncentives.incentives.length > 3 && (
        <button
          type="button"
          className="hero__offers-view-all"
          onClick={onViewAllClick}
        >
          View all {vehicleIncentives.incentives.length} offers →
        </button>
      )}
    </div>
  );
};

export default HeroOffersA;
