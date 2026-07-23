import { useId, useMemo, useState, type FormEvent } from 'react';
import { Info } from 'lucide-react';
import { Badge, type BadgeProps } from '../Badge';
import { Button } from '../Button';
import { TextField } from '../TextField';
import { Tabs, type TabItem } from '../Tabs';
import { formatDistance, formatPrice } from '../../services/dealerService';
import {
  getVehicleMarketInventory,
  resolveMarketLocationFromZip,
  type DealerRadius,
  type MarketLocation,
} from '../../services/marketIntelligenceService';
import type { Vehicle } from '../../services/vehicleService';
import './MarketIntelligenceSnapshot.css';

interface MarketIntelligenceSnapshotProps {
  vehicle: Vehicle;
  location: MarketLocation;
  radiusMiles: DealerRadius;
  onLocationChange: (location: MarketLocation) => void;
  onRadiusChange: (radiusMiles: DealerRadius) => void;
  onSeeLocalInventory: () => void;
}

const DEALER_RADIUS_OPTIONS: DealerRadius[] = [5, 10, 25, 50];
const DEALER_RADIUS_TABS: TabItem[] = DEALER_RADIUS_OPTIONS.map((radius) => ({
  value: radius.toString(),
  label: `${radius} mi`,
}));
const DAYS_ON_LOT_REFERENCE = 30;

interface MarketInfoTooltipProps {
  title: string;
  copy: string;
  ariaLabel: string;
}

const MarketInfoTooltip = ({ title, copy, ariaLabel }: MarketInfoTooltipProps) => {
  const tooltipId = useId();

  return (
    <span className="market-snapshot__tooltip">
      <button
        type="button"
        className="market-snapshot__tooltip-trigger"
        aria-label={ariaLabel}
        aria-describedby={tooltipId}
      >
        <Info size={15} strokeWidth={2.25} aria-hidden="true" />
      </button>
      <span id={tooltipId} className="market-snapshot__tooltip-popover" role="tooltip">
        <strong>{title}</strong>
        <span>{copy}</span>
      </span>
    </span>
  );
};

const getDaysOnLotSignal = (days: number) => {
  if (days >= 45) {
    return {
      label: 'Buyer advantage',
      variant: 'success' as const,
      detail: `${days - DAYS_ON_LOT_REFERENCE} days above the ${DAYS_ON_LOT_REFERENCE}-day reference`,
    };
  }
  if (days >= 20) {
    return {
      label: 'Average pace',
      variant: 'neutral' as const,
      detail: `Near the ${DAYS_ON_LOT_REFERENCE}-day reference`,
    };
  }
  return {
    label: 'Fast-moving market',
    variant: 'info' as const,
    detail: `${DAYS_ON_LOT_REFERENCE - days} days below the ${DAYS_ON_LOT_REFERENCE}-day reference`,
  };
};

const getDealSignal = (price: number, marketAverage: number): {
  label: string;
  variant: BadgeProps['variant'];
  comparison: string;
} => {
  if (marketAverage <= 0) {
    return { label: 'Not rated', variant: 'neutral', comparison: 'Local average is unavailable' };
  }

  const differencePercent = (marketAverage - price) / marketAverage;
  if (differencePercent >= 0.05) {
    return {
      label: 'Good deal',
      variant: 'success',
      comparison: `${Math.round(differencePercent * 100)}% below the local average`,
    };
  }
  if (differencePercent >= 0.015) {
    return {
      label: 'Fair deal',
      variant: 'info',
      comparison: `${Math.round(differencePercent * 100)}% below the local average`,
    };
  }
  if (differencePercent >= -0.015) {
    return { label: 'Average deal', variant: 'neutral', comparison: 'Within 2% of the local average' };
  }
  return {
    label: 'Weak deal',
    variant: 'dark',
    comparison: `${Math.round(Math.abs(differencePercent) * 100)}% above the local average`,
  };
};

const average = (values: number[]) => {
  if (values.length === 0) return 0;
  return values.reduce((sum, value) => sum + value, 0) / values.length;
};

const percentile = (values: number[], amount: number) => {
  const sorted = [...values].sort((a, b) => a - b);
  if (sorted.length === 0) return 0;
  return sorted[Math.round((sorted.length - 1) * amount)];
};

const MarketIntelligenceSnapshot = ({
  vehicle,
  location,
  radiusMiles,
  onLocationChange,
  onRadiusChange,
  onSeeLocalInventory,
}: MarketIntelligenceSnapshotProps) => {
  const [zipCode, setZipCode] = useState(location.zipCode ?? '');
  const [zipError, setZipError] = useState<string>();

  const market = useMemo(
    () => getVehicleMarketInventory({ vehicle, location, radiusMiles }),
    [location, radiusMiles, vehicle]
  );
  const isUsed = market.condition === 'used';
  const bestValue = market.bestValueMatch;
  const bestDealHref = bestValue?.unit.dealerUrl ?? bestValue?.dealer.website ?? '#market-intelligence-dealers';
  const bestDealIsExternal = bestDealHref.startsWith('http');
  const prices = market.matches.map(({ unit }) => unit.price);
  const savings = bestValue ? Math.max(0, market.averagePrice - bestValue.unit.price) : 0;
  const daysOnLotSignal = getDaysOnLotSignal(market.averageDaysOnLot || 0);
  const dealSignal = bestValue
    ? getDealSignal(bestValue.unit.price, market.averagePrice)
    : getDealSignal(0, 0);
  const comparisonSet = `${market.inventoryCount} matching ${isUsed ? 'used ' : ''}${market.inventoryCount === 1 ? 'vehicle' : 'vehicles'} from ${market.dealerCount} ${market.dealerCount === 1 ? 'dealer' : 'dealers'} within ${radiusMiles} miles of ${location.label}`;
  const contextSummary = market.inventoryCount === 0
    ? `There are no matching vehicles in this search area yet, so there is not enough local data to establish a reliable comparison.`
    : isUsed
      ? `${comparisonSet} make up the comparison set behind the fair-value range and deal rating below. Use the local range as a reference, not a guarantee. Compare mileage, condition, history, and certification before deciding.`
      : `${comparisonSet} make up the comparison set behind the market price and deal rating below. Use ${formatPrice(market.averagePrice)} as a local benchmark, not a target price. The ${market.averageDaysOnLot || 1}-day average provides context for how much room dealers may have to negotiate.`;
  const nextRadius = DEALER_RADIUS_OPTIONS.find((radius) => radius > radiusMiles);
  const ctaLabel = market.inventoryCount > 0
    ? `Compare ${market.inventoryCount} ${isUsed ? 'used ' : ''}${market.inventoryCount === 1 ? 'deal' : 'deals'} within ${radiusMiles} mi`
    : nextRadius
      ? `Expand search to ${nextRadius} mi`
      : 'No matching local inventory';

  const supportingCards = isUsed
    ? [
        {
          label: 'Fair value range',
          value: prices.length > 0
            ? `${formatPrice(percentile(prices, 0.25))}–${formatPrice(percentile(prices, 0.75))}`
            : 'Not available',
          detail: `Your vehicle asking price: ${formatPrice(vehicle.priceMin)}`,
        },
        {
          label: 'Local selection',
          value: `${market.inventoryCount} ${market.inventoryCount === 1 ? 'vehicle' : 'vehicles'}`,
          detail: `Across ${market.dealerCount} ${market.dealerCount === 1 ? 'dealer' : 'dealers'}`,
        },
        {
          label: 'Comparable mileage',
          value: market.inventoryCount > 0
            ? `${Math.round(average(market.matches.map(({ unit }) => unit.mileage ?? 0))).toLocaleString()} mi`
            : 'Not available',
          detail: 'Compare mileage, condition, history, and certification before buying',
        },
      ]
    : [
        {
          label: 'Average market price',
          value: market.inventoryCount > 0 ? formatPrice(market.averagePrice) : 'Not available',
          detail: `Base MSRP: ${formatPrice(vehicle.priceMin)}`,
        },
        {
          label: 'Local selection',
          value: `${market.inventoryCount} ${market.inventoryCount === 1 ? 'vehicle' : 'vehicles'}`,
          detail: `Across ${market.dealerCount} ${market.dealerCount === 1 ? 'dealer' : 'dealers'}`,
        },
        {
          label: 'Average days on lot',
          value: market.inventoryCount > 0 ? `${market.averageDaysOnLot || 1} days` : 'Not available',
          detail: market.inventoryCount > 0 ? daysOnLotSignal.detail : 'No local inventory to compare',
          signal: market.inventoryCount > 0 ? daysOnLotSignal : undefined,
          tooltip: market.inventoryCount > 0
            ? {
                title: 'What days on lot means',
                copy: `${market.averageDaysOnLot || 1} days is the average time these matching listings have been advertised. We use ${DAYS_ON_LOT_REFERENCE} days as a reference. Vehicles listed for 45 days or more are aging inventory and may give buyers more negotiating room.`,
                ariaLabel: 'Explain average days on lot',
              }
            : undefined,
        },
      ];

  const handlePrimaryAction = () => {
    if (market.inventoryCount === 0 && nextRadius) {
      onRadiusChange(nextRadius);
      return;
    }
    if (market.inventoryCount > 0) onSeeLocalInventory();
  };

  const handleZipSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const resolvedLocation = resolveMarketLocationFromZip(zipCode);

    if (!resolvedLocation) {
      setZipError('Enter a supported ZIP code near this dealer market.');
      return;
    }

    setZipError(undefined);
    onLocationChange(resolvedLocation);
  };

  return (
    <section
      className={`market-snapshot market-snapshot--${market.condition}`}
      aria-labelledby="market-snapshot-title"
    >
      <header className="market-snapshot__header">
        <div className="market-snapshot__titles">
          <p className="market-snapshot__eyebrow">Vehicle Market Intelligence</p>
          <h2 id="market-snapshot-title">Market Intelligence Snapshot</h2>
          <p>Find the strongest nearby value, then compare the local listings behind it.</p>
        </div>
        <form className="market-snapshot__location-form" onSubmit={handleZipSubmit}>
          <TextField
            label="ZIP code"
            value={zipCode}
            onChange={(event) => {
              setZipCode(event.target.value.replace(/\D/g, '').slice(0, 5));
              if (zipError) setZipError(undefined);
            }}
            inputMode="numeric"
            autoComplete="postal-code"
            maxLength={5}
            placeholder="33101"
            error={zipError}
            wrapperClassName="market-snapshot__location"
            aria-label="ZIP code"
          />
          <Button type="submit" variant="outline">
            Update
          </Button>
        </form>
        <div className="market-snapshot__radius">
          <span>Dealer distance</span>
          <Tabs
            items={DEALER_RADIUS_TABS}
            value={radiusMiles.toString()}
            onChange={(value) => onRadiusChange(Number(value) as DealerRadius)}
            variant="pills"
            fullWidth={false}
            ariaLabel="Dealer distance"
          />
        </div>
      </header>

      <div className="market-snapshot__grid">
        {supportingCards.map((card) => (
          <article key={card.label} className="market-snapshot__card">
            <div className="market-snapshot__card-heading">
              <h3>{card.label}</h3>
              {'tooltip' in card && card.tooltip && (
                <MarketInfoTooltip
                  title={card.tooltip.title}
                  copy={card.tooltip.copy}
                  ariaLabel={card.tooltip.ariaLabel}
                />
              )}
            </div>
            <strong>{card.value}</strong>
            {'signal' in card && card.signal && (
              <Badge variant={card.signal.variant} className="market-snapshot__signal">
                {card.signal.label}
              </Badge>
            )}
            <p className="market-snapshot__detail">{card.detail}</p>
          </article>
        ))}
      </div>

      <div className="market-snapshot__context-summary">
        <strong>Why these numbers matter</strong>
        <p role="status" aria-live="polite">{contextSummary}</p>
      </div>

      {bestValue ? (
        <article className="market-snapshot__recommendation">
          <div>
            <div className="market-snapshot__recommendation-label-row">
              <p className="market-snapshot__recommendation-label">Best nearby value</p>
              <Badge variant={dealSignal.variant} className="market-snapshot__deal-signal">
                {dealSignal.label}
              </Badge>
              <MarketInfoTooltip
                title="How this deal is rated"
                copy={`We compare this listing's price with the average price of matching vehicles in the selected area. This listing is ${dealSignal.comparison.toLowerCase()}. Taxes, fees, mileage, and vehicle condition are not included in the rating.`}
                ariaLabel={`Explain why this is rated a ${dealSignal.label.toLowerCase()}`}
              />
            </div>
            <h3>{bestValue.dealer.name}</h3>
            <p className="market-snapshot__recommendation-location">
              {formatDistance(bestValue.dealer.distance ?? 0)} away · {bestValue.unit.trim}
            </p>
            <a
              className="market-snapshot__recommendation-link"
              href={bestDealHref}
              target={bestDealIsExternal ? '_blank' : undefined}
              rel={bestDealIsExternal ? 'noopener noreferrer' : undefined}
              aria-label={`View this deal at ${bestValue.dealer.name}`}
              onClick={(event) => {
                if (!bestDealIsExternal) {
                  event.preventDefault();
                  onSeeLocalInventory();
                }
              }}
            >
              View this deal
            </a>
          </div>
          <div className="market-snapshot__recommendation-price">
            <strong>{formatPrice(bestValue.unit.price)}</strong>
            <span>{savings > 0 ? `${formatPrice(savings)} below the local average` : 'Closest strong local match'}</span>
          </div>
          <ul aria-label="Why this listing stands out">
            <li>{bestValue.unit.daysOnLot ?? 0} days on lot</li>
            <li>{bestValue.dealer.rating.toFixed(1)} dealer rating</li>
            <li>{bestValue.dealer.inventoryCount} matching {bestValue.dealer.inventoryCount === 1 ? 'vehicle' : 'vehicles'} at this dealer</li>
          </ul>
        </article>
      ) : (
        <article className="market-snapshot__empty">
          <h3>No matching vehicles in this distance</h3>
          <p>Try a wider search radius or another market to see comparable local listings.</p>
        </article>
      )}

      <Button
        fullWidth
        size="large"
        onClick={handlePrimaryAction}
        disabled={market.inventoryCount === 0 && !nextRadius}
      >
        {ctaLabel}
      </Button>

      <p className="market-snapshot__methodology">
        Estimated from modeled listings for this vehicle and selected area. Prices exclude taxes and fees; availability may change.
      </p>
    </section>
  );
};

export default MarketIntelligenceSnapshot;
