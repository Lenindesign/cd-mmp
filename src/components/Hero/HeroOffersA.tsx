import { useState, useMemo } from 'react';
import type { Incentive, VehicleIncentives } from '../../services/incentivesService';
import { formatExpiration } from '../../utils/dateUtils';
import Tabs from '../Tabs/Tabs';

interface HeroOffersAProps {
  vehicleIncentives: VehicleIncentives;
  priceRange: string;
  onOfferClick: (inc: Incentive) => void;
  onViewAllClick: () => void;
}

const HeroOffersA = ({ vehicleIncentives, priceRange, onOfferClick, onViewAllClick }: HeroOffersAProps) => {
  const [offersTab, setOffersTab] = useState<'finance' | 'lease' | 'cash'>('finance');

  const stripQualifier = (v: string) =>
    v.replace(/^(as low as|up to|starting at)\s+/i, '');

  const financeIncentives = useMemo(() =>
    vehicleIncentives.incentives.filter(i => i.type === 'finance'),
    [vehicleIncentives]
  );

  const leaseIncentives = useMemo(() =>
    vehicleIncentives.incentives.filter(i => i.type === 'lease'),
    [vehicleIncentives]
  );

  const cashIncentives = useMemo(() =>
    vehicleIncentives.incentives.filter(i => i.type === 'cash'),
    [vehicleIncentives]
  );

  const topIncentives = useMemo(() => {
    const pool =
      offersTab === 'finance'
        ? financeIncentives
        : offersTab === 'lease'
          ? leaseIncentives
          : cashIncentives;
    return pool.slice(0, 3);
  }, [offersTab, financeIncentives, leaseIncentives, cashIncentives]);

  const msrpBase = useMemo(() => {
    return parseInt((priceRange?.split(/[–\-]/)[0] || '').replace(/[^0-9]/g, '') || '0') || 0;
  }, [priceRange]);

  const tabPaymentLabel = useMemo(() => {
    const financeMonthly = msrpBase > 0 ? Math.round((msrpBase * 0.9) / 60) : 0;
    const leaseMonthly = msrpBase > 0 ? Math.round(msrpBase * 0.014) : 0;
    const fmt = (n: number) => '$' + n.toLocaleString();
    const cashHeadline =
      cashIncentives.length > 0 ? stripQualifier(cashIncentives[0].value) : '';
    return {
      finance: financeMonthly > 0 ? `${fmt(financeMonthly)}/mo.` : '',
      lease: leaseMonthly > 0 ? `${fmt(leaseMonthly)}/mo.` : '',
      cash: cashHeadline,
    };
  }, [msrpBase, cashIncentives]);

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
        <Tabs
          items={[
            { value: 'finance', label: 'Buy', count: financeIncentives.length, extra: tabPaymentLabel.finance ? <span className="hero__offers-tab-price">{tabPaymentLabel.finance}</span> : undefined },
            { value: 'lease', label: 'Lease', count: leaseIncentives.length, extra: tabPaymentLabel.lease ? <span className="hero__offers-tab-price">{tabPaymentLabel.lease}</span> : undefined },
            { value: 'cash', label: 'Cash', count: cashIncentives.length, extra: tabPaymentLabel.cash ? <span className="hero__offers-tab-price">{tabPaymentLabel.cash}</span> : undefined },
          ]}
          value={offersTab}
          onChange={setOffersTab}
          variant="segmented"
          ariaLabel="Offer type"
        />
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
              <span className="hero__offer-exp">expires {formatExpiration(inc.expirationDate)}</span>
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
