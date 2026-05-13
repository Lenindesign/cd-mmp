import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import type { Incentive, VehicleIncentives } from '../../services/incentivesService';
import { getAprRangeLabel } from '../IncentivesModal/incentivesModalUtils';
import { formatExpiration } from '../../utils/dateUtils';

interface HeroOffersBProps {
  vehicleIncentives: VehicleIncentives;
  onOfferClick: (inc: Incentive) => void;
  onApplyOffer?: (inc: Incentive) => void;
  selectedOfferIds?: string[];
  title?: string;
}

const stripQualifier = (v: string) =>
  v.replace(/^(as low as|up to|starting at)\s+/i, '');

const slugify = (value: string) =>
  value.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

const formatDealCount = (count: number, label: 'Buy' | 'Lease') =>
  `${count} ${label} ${count === 1 ? 'Deal' : 'Deals'}`;

const renderDealCount = (count: number, label: 'Buy' | 'Lease') => (
  <span className="hero__offers-b-deal-link-badge">
    ALL {label.toUpperCase()} DEALS ({count})
  </span>
);

const getChipLabel = (type: Incentive['type']) => {
  switch (type) {
    case 'finance': return 'Buy';
    case 'lease': return 'Lease';
    case 'cash': return 'Buy';
    default: return type;
  }
};

const HeroOffersB = ({
  vehicleIncentives,
  onOfferClick,
  onApplyOffer,
  selectedOfferIds = [],
  title = 'SPECIAL DEALS AND INCENTIVES',
}: HeroOffersBProps) => {
  const topOffers = useMemo(() => {
    const finance = vehicleIncentives.incentives.find(i => i.type === 'finance');
    const lease = vehicleIncentives.incentives.find(i => i.type === 'lease');
    const cash = vehicleIncentives.incentives.find(i => i.type === 'cash');
    return [finance, lease, cash].filter(Boolean) as Incentive[];
  }, [vehicleIncentives]);

  const dealCounts = useMemo(() => {
    return {
      buy: vehicleIncentives.incentives.filter(i => i.type === 'finance' || i.type === 'cash').length,
      lease: vehicleIncentives.incentives.filter(i => i.type === 'lease').length,
    };
  }, [vehicleIncentives]);

  const dealLinks = useMemo(() => {
    const makeSlug = slugify(vehicleIncentives.make);
    const modelSlug = slugify(vehicleIncentives.model);
    return {
      buy: `/${makeSlug}/${modelSlug}/deals-incentives`,
      lease: `/${makeSlug}/${modelSlug}/lease-deals`,
    };
  }, [vehicleIncentives.make, vehicleIncentives.model]);

  if (topOffers.length === 0) return null;

  return (
    <div className="hero__offers-b">
      <div className="hero__offers-b-header">
        <h3 className="hero__offers-b-title">{title}</h3>
        <nav className="hero__offers-b-deal-links" aria-label={`${vehicleIncentives.make} ${vehicleIncentives.model} deal pages`}>
          {dealCounts.buy > 0 && (
            <Link
              to={dealLinks.buy}
              className="hero__offers-b-deal-link"
              aria-label={`View ${formatDealCount(dealCounts.buy, 'Buy').toLowerCase()} for ${vehicleIncentives.make} ${vehicleIncentives.model}`}
            >
              {renderDealCount(dealCounts.buy, 'Buy')}
            </Link>
          )}
          {dealCounts.lease > 0 && (
            <Link
              to={dealLinks.lease}
              className="hero__offers-b-deal-link"
              aria-label={`View ${formatDealCount(dealCounts.lease, 'Lease').toLowerCase()} for ${vehicleIncentives.make} ${vehicleIncentives.model}`}
            >
              {renderDealCount(dealCounts.lease, 'Lease')}
            </Link>
          )}
        </nav>
      </div>
      <div className="hero__offers-b-pills">
        {topOffers.map(inc => {
          const value = stripQualifier(inc.value);
          const label = inc.type === 'finance'
            ? getAprRangeLabel(inc)
            : inc.type === 'cash'
              ? (/\bcash\s*back\b/i.test(value) ? value : `${value} cash back`)
              : (() => {
                  const termMatch = (inc.terms || '').match(/(\d+)[\s-]*month/i)
                    || (inc.description || '').match(/(\d+)[\s-]*month/i)
                    || (inc.title || '').match(/(\d+)[\s-]*month/i);
                  return termMatch ? `${value} for ${termMatch[1]} mo.` : value;
                })();
          return (
            <div
              key={inc.id}
              role="button"
              tabIndex={0}
              className={`hero__offers-b-pill ${selectedOfferIds.includes(inc.id) ? 'hero__offers-b-pill--selected' : ''}`}
              onClick={() => onOfferClick(inc)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  onOfferClick(inc);
                }
              }}
            >
              <span className="hero__offers-b-pill-chip">{getChipLabel(inc.type)}</span>
              <span className="hero__offers-b-pill-text">{label}</span>
              <span className="hero__offers-b-pill-exp">expires {formatExpiration(inc.expirationDate)}</span>
              {selectedOfferIds.includes(inc.id) && !onApplyOffer && (
                <span className="hero__offers-b-pill-applied" aria-label="Applied to estimate">
                  Applied
                </span>
              )}
              {onApplyOffer && (
                <span className="hero__offers-b-pill-actions">
                  <button
                    type="button"
                    className="hero__offers-b-pill-apply"
                    onClick={(event) => {
                      event.stopPropagation();
                      onApplyOffer(inc);
                    }}
                  >
                    {selectedOfferIds.includes(inc.id) ? 'Applied' : 'Apply'}
                  </button>
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HeroOffersB;
