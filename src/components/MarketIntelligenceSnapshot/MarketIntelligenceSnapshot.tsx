import { useId, useMemo, useState, type FormEvent } from 'react';
import { Info } from 'lucide-react';
import { Badge, type BadgeProps } from '../Badge';
import { Button } from '../Button';
import { TextField } from '../TextField';
import { Tabs, type TabItem } from '../Tabs';
import { formatDistance, formatPrice } from '../../services/dealerService';
import {
  getVehicleMarketInventory,
  getVisibleMarketMetricKeys,
  resolveMarketLocationFromZip,
  type DealerRadius,
  type MarketMetricKey,
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

interface MarketMetricCard {
  key: MarketMetricKey;
  label: string;
  value: string;
  detail: string;
  signal?: ReturnType<typeof getDaysOnLotSignal>;
  tooltip?: MarketInfoTooltipProps;
}

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
  const metricKeys = getVisibleMarketMetricKeys(market);
  const primaryMetricKeys = metricKeys.slice(0, 6);
  const secondaryMetricKeys = metricKeys.slice(6);
  const { statistics } = market;
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

  const metricCards: Record<MarketMetricKey, MarketMetricCard> = {
    matches: {
      key: 'matches',
      label: `${vehicle.year} matches`,
      value: `${statistics.currentYearCount} ${statistics.currentYearCount === 1 ? 'vehicle' : 'vehicles'}`,
      detail: `Across ${market.dealerCount} ${market.dealerCount === 1 ? 'dealer' : 'dealers'}`,
    },
    averagePrice: {
      key: 'averagePrice',
      label: 'Average price',
      value: formatPrice(market.averagePrice),
      detail: isUsed ? 'Average asking price for matching used vehicles' : `Base MSRP: ${formatPrice(vehicle.priceMin)}`,
    },
    lowPrice: {
      key: 'lowPrice',
      label: 'Low price',
      value: formatPrice(statistics.lowPrice ?? 0),
      detail: 'Lowest asking price in this comparison set',
    },
    highPrice: {
      key: 'highPrice',
      label: 'High price',
      value: formatPrice(statistics.highPrice ?? 0),
      detail: 'Highest asking price in this comparison set',
    },
    averageDays: {
      key: 'averageDays',
      label: 'Average days on market',
      value: `${market.averageDaysOnLot} days`,
      detail: daysOnLotSignal.detail,
      signal: daysOnLotSignal,
      tooltip: {
        title: 'What days on market means',
        copy: `${market.averageDaysOnLot} days is the average time these matching listings have been advertised. We use ${DAYS_ON_LOT_REFERENCE} days as a reference. Vehicles listed for 45 days or more are aging inventory and may give buyers more negotiating room.`,
        ariaLabel: 'Explain average days on market',
      },
    },
    newlyListed: {
      key: 'newlyListed',
      label: 'Newly listed',
      value: `${statistics.newlyListedCount} ${statistics.newlyListedCount === 1 ? 'vehicle' : 'vehicles'}`,
      detail: 'Listed within the last 30 days',
    },
    priceDrops: {
      key: 'priceDrops',
      label: 'Recent price drops',
      value: `${statistics.priceDropCount} ${statistics.priceDropCount === 1 ? 'vehicle' : 'vehicles'}`,
      detail: 'Matching listings with a recent price reduction',
    },
    previousYear: {
      key: 'previousYear',
      label: `${Number(vehicle.year) - 1} vehicles`,
      value: `${statistics.previousYearCount} available`,
      detail: 'Prior model-year listings in this search area',
    },
    followingYear: {
      key: 'followingYear',
      label: `${Number(vehicle.year) + 1} vehicles`,
      value: `${statistics.followingYearCount} available`,
      detail: 'Following model-year used listings in this search area',
    },
    goodGreatPrice: {
      key: 'goodGreatPrice',
      label: 'Good or great price',
      value: `${statistics.goodGreatPriceCount} ${statistics.goodGreatPriceCount === 1 ? 'vehicle' : 'vehicles'}`,
      detail: 'At least 2% below the local average',
    },
    oneOwner: {
      key: 'oneOwner',
      label: 'One owner',
      value: `${statistics.oneOwnerCount} ${statistics.oneOwnerCount === 1 ? 'vehicle' : 'vehicles'}`,
      detail: 'Reported with one previous owner',
    },
    noAccidents: {
      key: 'noAccidents',
      label: 'No accidents reported',
      value: `${statistics.noAccidentCount} ${statistics.noAccidentCount === 1 ? 'vehicle' : 'vehicles'}`,
      detail: 'Based on available vehicle-history data',
    },
    averageMileage: {
      key: 'averageMileage',
      label: 'Average mileage',
      value: `${(statistics.averageMileage ?? 0).toLocaleString()} mi`,
      detail: 'Average odometer reading for matching used vehicles',
    },
    mileageRange: {
      key: 'mileageRange',
      label: 'Mileage range',
      value: `${(statistics.lowMileage ?? 0).toLocaleString()}–${(statistics.highMileage ?? 0).toLocaleString()} mi`,
      detail: 'Lowest to highest mileage in this comparison set',
    },
  };
  const supportingCards = primaryMetricKeys.map((key) => metricCards[key]);
  const secondaryCards = secondaryMetricKeys.map((key) => metricCards[key]);

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

      {secondaryCards.length > 0 && (
        <section className="market-snapshot__secondary" aria-labelledby="market-snapshot-secondary-title">
          <h3 id="market-snapshot-secondary-title">More local signals</h3>
          <dl className="market-snapshot__secondary-grid">
            {secondaryCards.map((card) => (
              <div key={card.key}>
                <dt>{card.label}</dt>
                <dd>{card.value}</dd>
              </div>
            ))}
          </dl>
        </section>
      )}

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
