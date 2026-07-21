import { useMemo, useState } from 'react';
import { Check, ChevronDown, ChevronRight, ChevronUp, Minus, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Incentive, VehicleIncentives } from '../../services/incentivesService';
import { getAprRangeLabel } from '../IncentivesModal/incentivesModalUtils';
import { formatExpiration } from '../../utils/dateUtils';

interface HeroOffersBProps {
  vehicleIncentives: VehicleIncentives;
  onOfferClick: (inc: Incentive) => void;
  onApplyOffer?: (inc: Incentive) => void;
  onRateTierSelect?: (inc: Incentive, tier: NonNullable<Incentive['rateTiers']>[number]) => void;
  onRateTierRemove?: (inc: Incentive) => void;
  selectedOfferIds?: string[];
  selectedRateTierTerm?: number | null;
  title?: string | null;
  showBuyDealLink?: boolean;
  showLeaseDealLink?: boolean;
  showMoreDealsAccordion?: boolean;
  showToggleIndicator?: boolean;
}

const stripQualifier = (v: string) =>
  v.replace(/^(as low as|up to|starting at)\s+/i, '');

const slugify = (value: string) =>
  value.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

const formatDealCount = (count: number, label: 'Buy' | 'Lease') =>
  `${count} ${label} ${count === 1 ? 'Deal' : 'Deals'}`;

const renderDealLink = (label: 'Buy' | 'Lease') => (
  <>
    <span className="hero__offers-b-deal-link-label">
      {label === 'Buy' ? 'Browse all Buying Offers' : 'Browse all Leasing Offers'}
    </span>
    <ChevronRight className="hero__offers-b-deal-link-icon" size={14} aria-hidden />
  </>
);

const getChipLabel = (type: Incentive['type']) => {
  switch (type) {
    case 'finance': return 'Buy';
    case 'lease': return 'Lease';
    case 'cash': return 'Buy';
    default: return type;
  }
};

const getOfferDisplayLabel = (incentive: Incentive) => {
  const value = stripQualifier(incentive.value);

  if (incentive.type === 'finance') {
    return getAprRangeLabel(incentive);
  }

  if (incentive.type === 'cash') {
    return /\bcash\s*back\b/i.test(value) ? value : `${value} cash back`;
  }

  const termMatch = (incentive.terms || '').match(/(\d+)[\s-]*month/i)
    || (incentive.description || '').match(/(\d+)[\s-]*month/i)
    || (incentive.title || '').match(/(\d+)[\s-]*month/i);
  return termMatch ? `${value} for ${termMatch[1]} mo.` : value;
};

const HeroOffersB = ({
  vehicleIncentives,
  onOfferClick,
  onApplyOffer,
  onRateTierSelect,
  onRateTierRemove,
  selectedOfferIds = [],
  selectedRateTierTerm = null,
  title = 'SPECIAL DEALS AND INCENTIVES',
  showBuyDealLink = true,
  showLeaseDealLink = true,
  showMoreDealsAccordion = false,
  showToggleIndicator = false,
}: HeroOffersBProps) => {
  const [showMoreDeals, setShowMoreDeals] = useState(false);
  const [expandedRateTierOfferId, setExpandedRateTierOfferId] = useState<string | null>(null);
  const topOffers = useMemo(() => {
    const finance = vehicleIncentives.incentives.find(i => i.type === 'finance');
    const lease = vehicleIncentives.incentives.find(i => i.type === 'lease');
    const cash = vehicleIncentives.incentives.find(i => i.type === 'cash');
    return [finance, lease, cash].filter(Boolean) as Incentive[];
  }, [vehicleIncentives]);

  const moreOffers = useMemo(() => {
    const topOfferIds = new Set(topOffers.map((incentive) => incentive.id));
    return vehicleIncentives.incentives.filter((incentive) => !topOfferIds.has(incentive.id));
  }, [topOffers, vehicleIncentives.incentives]);

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

  const showBuyLink = showBuyDealLink && dealCounts.buy > 0;
  const showLeaseLink = showLeaseDealLink && dealCounts.lease > 0;
  const showHeader = Boolean(title) || showBuyLink || showLeaseLink;
  const showMoreDealsControl = showMoreDealsAccordion && moreOffers.length > 0;
  const moreDealsId = `hero-offers-b-more-${slugify(vehicleIncentives.make)}-${slugify(vehicleIncentives.model)}`;

  const renderOfferPill = (inc: Incentive) => {
    const isSelected = selectedOfferIds.includes(inc.id);
    const rateTiers = inc.rateTiers ?? [];
    const canSelectRateTier = inc.type === 'finance'
      && rateTiers.length > 1
      && Boolean(onRateTierSelect);
    const isRateTierExpanded = canSelectRateTier && expandedRateTierOfferId === inc.id;
    const selectedRateTier = isSelected
      ? rateTiers.find((tier) => tier.term === selectedRateTierTerm)
      : undefined;
    const label = selectedRateTier
      ? `${selectedRateTier.apr.toFixed(2)}% APR for ${selectedRateTier.term} months`
      : getOfferDisplayLabel(inc);
    const rateTierPanelId = `hero-offers-b-rate-tiers-${slugify(inc.id)}`;
    const handlePillClick = () => {
      if (canSelectRateTier) {
        setExpandedRateTierOfferId((current) => current === inc.id ? null : inc.id);
        return;
      }
      onOfferClick(inc);
    };
    const showInlineToggleIndicator = showToggleIndicator && !onApplyOffer;

    return (
      <div key={inc.id} className="hero__offers-b-offer">
        <div
          role="button"
          aria-pressed={isSelected}
          aria-expanded={canSelectRateTier ? isRateTierExpanded : undefined}
          aria-controls={canSelectRateTier ? rateTierPanelId : undefined}
          tabIndex={0}
          className={`hero__offers-b-pill ${isSelected ? 'hero__offers-b-pill--selected' : ''} ${isRateTierExpanded ? 'hero__offers-b-pill--expanded' : ''}`}
          onClick={handlePillClick}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault();
              handlePillClick();
            }
          }}
        >
          <span className="hero__offers-b-pill-chip">{getChipLabel(inc.type)}</span>
          <span className="hero__offers-b-pill-text">{label}</span>
          <span className="hero__offers-b-pill-exp">expires {formatExpiration(inc.expirationDate)}</span>
          {showInlineToggleIndicator && (
            <span
              className={`hero__offers-b-pill-toggle ${isSelected ? 'hero__offers-b-pill-toggle--selected' : ''}`}
              aria-hidden="true"
            >
              {canSelectRateTier
                ? isRateTierExpanded
                  ? <ChevronUp size={14} strokeWidth={3} />
                  : <ChevronDown size={14} strokeWidth={3} />
                : isSelected
                  ? <Minus size={14} strokeWidth={3} />
                  : <Plus size={14} strokeWidth={3} />}
            </span>
          )}
          {isSelected && !onApplyOffer && (
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
                {isSelected ? 'Applied' : 'Apply'}
              </button>
            </span>
          )}
        </div>
        {isRateTierExpanded && (
          <div id={rateTierPanelId} className="hero__offers-b-rate-tiers">
            <div className="hero__offers-b-rate-tiers-heading">
              <strong>Choose a rate and term</strong>
              <span>Select the APR and term to apply to this estimate.</span>
            </div>
            <div className="hero__offers-b-rate-tier-list" role="group" aria-label="Available rates and terms">
              {rateTiers.map((tier) => {
                const isTierSelected = isSelected && selectedRateTierTerm === tier.term;
                return (
                  <button
                    key={`${tier.term}-${tier.apr}`}
                    type="button"
                    className={`hero__offers-b-rate-tier ${isTierSelected ? 'hero__offers-b-rate-tier--selected' : ''}`}
                    aria-pressed={isTierSelected}
                    onClick={() => onRateTierSelect?.(inc, tier)}
                  >
                    <span className="hero__offers-b-rate-tier-term">{tier.term} months</span>
                    <span className="hero__offers-b-rate-tier-offer">
                      <strong>{tier.apr.toFixed(2)}% APR</strong>
                    </span>
                    <span className="hero__offers-b-rate-tier-action">
                      {isTierSelected ? <><Check size={15} strokeWidth={3} aria-hidden /> Selected</> : 'Choose'}
                    </span>
                  </button>
                );
              })}
            </div>
            {isSelected && onRateTierRemove && (
              <button
                type="button"
                className="hero__offers-b-rate-tier-remove"
                onClick={() => onRateTierRemove(inc)}
              >
                Remove rate offer
              </button>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="hero__offers-b">
      {showHeader && (
        <div className="hero__offers-b-header">
          {title && <h3 className="hero__offers-b-title">{title}</h3>}
          {(showBuyLink || showLeaseLink) && (
            <nav className="hero__offers-b-deal-links" aria-label={`${vehicleIncentives.make} ${vehicleIncentives.model} deal pages`}>
              {showBuyLink && (
                <Link
                  to={dealLinks.buy}
                  className="hero__offers-b-deal-link"
                  aria-label={`View ${formatDealCount(dealCounts.buy, 'Buy').toLowerCase()} for ${vehicleIncentives.make} ${vehicleIncentives.model}`}
                >
                  {renderDealLink('Buy')}
                </Link>
              )}
              {showLeaseLink && (
                <Link
                  to={dealLinks.lease}
                  className="hero__offers-b-deal-link"
                  aria-label={`View ${formatDealCount(dealCounts.lease, 'Lease').toLowerCase()} for ${vehicleIncentives.make} ${vehicleIncentives.model}`}
                >
                  {renderDealLink('Lease')}
                </Link>
              )}
            </nav>
          )}
        </div>
      )}
      <div className="hero__offers-b-pills">
        {topOffers.map(renderOfferPill)}
      </div>
      {showMoreDealsControl && (
        <div className="hero__offers-b-more-wrap">
          {showMoreDeals && (
            <div id={moreDealsId} className="hero__offers-b-more" role="region" aria-label="More available deals">
              {moreOffers.map(renderOfferPill)}
            </div>
          )}
          <button
            type="button"
            className="hero__offers-b-more-toggle"
            aria-expanded={showMoreDeals}
            aria-controls={moreDealsId}
            onClick={() => setShowMoreDeals((current) => !current)}
          >
            <span>{showMoreDeals ? 'Show fewer deals' : `Show more deals (${moreOffers.length})`}</span>
            {showMoreDeals ? <ChevronUp size={16} aria-hidden /> : <ChevronDown size={16} aria-hidden />}
          </button>
        </div>
      )}
    </div>
  );
};

export default HeroOffersB;
