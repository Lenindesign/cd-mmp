import { useId, useMemo, useState, type FormEvent } from 'react';
import { Info } from 'lucide-react';
import { Badge } from '../Badge';
import { Button } from '../Button';
import { OptimizedImage } from '../OptimizedImage';
import { TextField } from '../TextField';
import { Tabs, type TabItem } from '../Tabs';
import { formatPrice } from '../../services/dealerService';
import {
  getVehicleMarketInventory,
  resolveMarketLocationFromZip,
  type DealerRadius,
  type MarketLocation,
  type MarketInventoryMatch,
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

interface MarketMetricCard {
  key: string;
  label: string;
  value: string;
  detail: string;
  signal?: ReturnType<typeof getDaysOnLotSignal>;
  tooltip?: MarketInfoTooltipProps;
}

interface DealerSummary {
  dealerName: string;
  address: string;
  rating: string;
  distance: string;
  newCount: number;
  usedCount: number;
  certifiedCount: number;
  newPriceRange: string;
  usedPriceRange: string;
  certifiedPriceRange: string;
  usedMileageRange: string;
  certifiedMileageRange: string;
}

const formatPriceRange = (low?: number, high?: number) => {
  if (low === undefined || high === undefined) return 'Price range unavailable';
  if (low === high) return formatPrice(low);
  return `${formatPrice(low)} - ${formatPrice(high)}`;
};

const formatMileageRange = (mileages: number[]) => {
  if (mileages.length === 0) return 'Mileage range unavailable';
  const low = Math.min(...mileages).toLocaleString();
  const high = Math.max(...mileages).toLocaleString();
  return low === high ? `${low} miles` : `${low} - ${high} miles`;
};

const isGoodOrGreatPrice = (match: MarketInventoryMatch, averagePrice: number) =>
  match.unit.price <= averagePrice * 0.985;

const getVehicleMatchTitle = ({ unit }: MarketInventoryMatch) =>
  `${unit.year} ${unit.make} ${unit.model} ${unit.trim}`.replace(/\s+/g, ' ').trim();

const getListingUrl = ({ unit }: MarketInventoryMatch) => {
  const params = new URLSearchParams({
    year: String(unit.year),
    make: unit.make,
    model: unit.model,
  });

  if (unit.isCertified) {
    params.set('certified', 'true');
  }

  return `https://www.caranddriver.com/cars-for-sale/${unit.isNew ? 'new' : 'used'}?${params.toString()}`;
};

const getPrioritizedMatches = ({
  matches,
  averagePrice,
  averageMileage,
  condition,
}: {
  matches: MarketInventoryMatch[];
  averagePrice: number;
  averageMileage?: number;
  condition: 'new' | 'used';
}) => {
  return [...matches]
    .sort((a, b) => {
      if (condition === 'used') {
        const aScore =
          (a.unit.accidents === 0 ? 100 : 0) +
          (averageMileage !== undefined && (a.unit.mileage ?? Number.POSITIVE_INFINITY) < averageMileage ? 45 : 0) +
          (a.unit.carfaxScore ? 25 : 0) +
          (isGoodOrGreatPrice(a, averagePrice) ? 15 : 0);
        const bScore =
          (b.unit.accidents === 0 ? 100 : 0) +
          (averageMileage !== undefined && (b.unit.mileage ?? Number.POSITIVE_INFINITY) < averageMileage ? 45 : 0) +
          (b.unit.carfaxScore ? 25 : 0) +
          (isGoodOrGreatPrice(b, averagePrice) ? 15 : 0);

        if (bScore !== aScore) return bScore - aScore;
        return (a.unit.mileage ?? Number.POSITIVE_INFINITY) - (b.unit.mileage ?? Number.POSITIVE_INFINITY);
      }

      const aScore =
        (isGoodOrGreatPrice(a, averagePrice) ? 80 : 0) +
        ((a.unit.daysOnLot ?? Number.POSITIVE_INFINITY) <= 30 ? 45 : 0) +
        Math.min(a.unit.daysOnLot ?? 0, 120);
      const bScore =
        (isGoodOrGreatPrice(b, averagePrice) ? 80 : 0) +
        ((b.unit.daysOnLot ?? Number.POSITIVE_INFINITY) <= 30 ? 45 : 0) +
        Math.min(b.unit.daysOnLot ?? 0, 120);

      if (bScore !== aScore) return bScore - aScore;
      return a.unit.price - b.unit.price;
    })
    .slice(0, 3);
};

const getDealerSummary = ({
  dealerId,
  newMatches,
  usedMatches,
}: {
  dealerId?: string;
  newMatches: MarketInventoryMatch[];
  usedMatches: MarketInventoryMatch[];
}): DealerSummary | undefined => {
  if (!dealerId) return undefined;

  const newUnits = newMatches.filter((match) => match.dealer.id === dealerId);
  const usedUnits = usedMatches.filter((match) => match.dealer.id === dealerId);
  const allUnits = [...newUnits, ...usedUnits];
  const dealer = allUnits[0]?.dealer;
  if (!dealer) return undefined;

  const certifiedUnits = usedUnits.filter(({ unit }) => unit.isCertified);
  const priceRangeFor = (matches: MarketInventoryMatch[]) =>
    formatPriceRange(
      matches.length > 0 ? Math.min(...matches.map(({ unit }) => unit.price)) : undefined,
      matches.length > 0 ? Math.max(...matches.map(({ unit }) => unit.price)) : undefined
    );

  return {
    dealerName: dealer.name,
    address: `${dealer.address}, ${dealer.city}, ${dealer.state} ${dealer.zipCode}`,
    rating: `${dealer.rating.toFixed(1)} stars from ${dealer.reviewCount.toLocaleString()} reviews`,
    distance: dealer.distance !== undefined ? `${dealer.distance.toFixed(1)} miles from selected ZIP` : 'Distance unavailable',
    newCount: newUnits.length,
    usedCount: usedUnits.length,
    certifiedCount: certifiedUnits.length,
    newPriceRange: priceRangeFor(newUnits),
    usedPriceRange: priceRangeFor(usedUnits),
    certifiedPriceRange: priceRangeFor(certifiedUnits),
    usedMileageRange: formatMileageRange(usedUnits.map(({ unit }) => unit.mileage).filter((value): value is number => value !== undefined)),
    certifiedMileageRange: formatMileageRange(certifiedUnits.map(({ unit }) => unit.mileage).filter((value): value is number => value !== undefined)),
  };
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
  const alternateUsedMarket = useMemo(
    () => isUsed
      ? market
      : getVehicleMarketInventory({
          vehicle: { ...vehicle, condition: 'used' },
          location,
          radiusMiles,
        }),
    [isUsed, location, market, radiusMiles, vehicle]
  );
  const { statistics } = market;
  const daysOnLotSignal = getDaysOnLotSignal(market.averageDaysOnLot || 0);
  const nextRadius = DEALER_RADIUS_OPTIONS.find((radius) => radius > radiusMiles);
  const ctaLabel = market.inventoryCount > 0
    ? `Compare ${market.inventoryCount} ${isUsed ? 'used ' : ''}${market.inventoryCount === 1 ? 'deal' : 'deals'} within ${radiusMiles} mi`
    : nextRadius
      ? `Expand search to ${nextRadius} mi`
      : 'No matching local inventory';
  const prioritizedMatches = getPrioritizedMatches({
    matches: market.matches,
    averagePrice: market.averagePrice,
    averageMileage: statistics.averageMileage,
    condition: market.condition,
  });
  const newMarket = isUsed ? undefined : market;
  const dealerSummary = !isUsed
    ? getDealerSummary({
        dealerId: market.dealers[0]?.id,
        newMatches: newMarket?.matches ?? [],
        usedMatches: alternateUsedMarket.matches,
      })
    : undefined;

  const usedMetricCards: MarketMetricCard[] = [
    {
      key: 'matches',
      label: 'Available Near You',
      value: '25',
      detail: `40 ${Number(vehicle.year) - 1} - ${Number(vehicle.year) + 1} models available`,
    },
    {
      key: 'priceRange',
      label: 'Local Price Range',
      value: '$14,000 - $32,000',
      detail: '$24,000 average asking price',
    },
    {
      key: 'mileageRange',
      label: 'Mileage Range',
      value: '43,000 - 104,000',
      detail: '68,000 average mileage near you',
    },
    {
      key: 'averageDays',
      label: 'Average Days on Market',
      value: '32',
      detail: `${vehicle.model} in your area range from 3 - 45 days on lot`,
      signal: daysOnLotSignal,
      tooltip: {
        title: 'What days on market means',
        copy: `${market.averageDaysOnLot} days is the average time these matching listings have been advertised. We use ${DAYS_ON_LOT_REFERENCE} days as a reference. Vehicles listed for 45 days or more are aging inventory and may give buyers more negotiating room.`,
        ariaLabel: 'Explain average days on market',
      },
    },
    {
      key: 'goodGreatPrice',
      label: '# with a Good or Great Price',
      value: '5',
      detail: '3 models have a recent price drop',
    },
    {
      key: 'newlyListed',
      label: '# Newly Listed',
      value: '2',
      detail: `$22,000 - $28,500 price range for newly listed ${vehicle.model}`,
    },
  ];
  const newMetricCards: MarketMetricCard[] = [
    {
      key: 'matches',
      label: 'Available Near You',
      value: '18',
      detail: '12 certified used models available',
    },
    {
      key: 'priceRange',
      label: 'Local Price Range',
      value: '$34,000 - $42,999',
      detail: 'Prices vary based on trim level, packages, and dealer-installed options.',
    },
    {
      key: 'averageDays',
      label: 'Average Days on Market',
      value: '32',
      detail: 'Vehicles are selling quickly compared to most new vehicles.',
      signal: daysOnLotSignal,
      tooltip: {
        title: 'What days on market means',
        copy: `${market.averageDaysOnLot} days is the average time these matching listings have been advertised. We use ${DAYS_ON_LOT_REFERENCE} days as a reference. Vehicles listed for 45 days or more are aging inventory and may give buyers more negotiating room.`,
        ariaLabel: 'Explain average days on market',
      },
    },
    {
      key: 'newlyListed',
      label: '# Newly Listed',
      value: '2',
      detail: `$35,000 - $38,500 price range for newly listed ${vehicle.model}`,
    },
    {
      key: 'financeSpecial',
      label: `${vehicle.make} Finance Specials`,
      value: '3.99% - 5.99%',
      detail: 'Expires 9/8/26',
    },
    {
      key: 'cashSpecial',
      label: `${vehicle.make} Cash Back Special`,
      value: '$1,500',
      detail: 'Expires 9/8/26',
    },
  ];
  const supportingCards = isUsed ? usedMetricCards : newMetricCards;

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
      id="market-intelligence-snapshot"
      className={`market-snapshot market-snapshot--${market.condition}`}
      aria-labelledby="market-snapshot-title"
    >
      <header className="market-snapshot__header">
        <div className="market-snapshot__titles">
          <p className="market-snapshot__eyebrow">Vehicle Market Intelligence</p>
          <h2 id="market-snapshot-title">
            {isUsed ? 'Used Market Snapshot' : 'New Market Snapshot'}
          </h2>
          <p>
            Compare the local signals that matter most for this {isUsed ? 'used' : 'new'} {vehicle.make} {vehicle.model}.
          </p>
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

      {prioritizedMatches.length > 0 ? (
        <div className="market-snapshot__below-chart">
          <section className="market-snapshot__inventory-picks" aria-labelledby="market-snapshot-inventory-title">
            <div className="market-snapshot__section-head">
              <p className="market-snapshot__section-kicker">Inventory</p>
              <h3 id="market-snapshot-inventory-title">Best local matches</h3>
              <p>
                {isUsed
                  ? 'Prioritized for no accidents, below average mileage, free VHR, and good or great price.'
                  : 'Prioritized for good or great price, newly listed status, and higher days on lot.'}
              </p>
            </div>
            <div className="market-snapshot__vehicle-picks" role="list">
              {prioritizedMatches.map((match) => {
                const isGoodPrice = isGoodOrGreatPrice(match, market.averagePrice);
                const isBelowAverageMileage = statistics.averageMileage !== undefined &&
                  (match.unit.mileage ?? Number.POSITIVE_INFINITY) < statistics.averageMileage;
                const isNewlyListed = (match.unit.daysOnLot ?? Number.POSITIVE_INFINITY) <= 30;
                const conditionLabel = match.unit.isNew
                  ? 'New'
                  : match.unit.isCertified
                    ? 'Certified used'
                    : 'Used';

                return (
                  <article key={`${match.dealer.id}-${match.unit.year}-${match.unit.trim}-${match.unit.price}`} className="market-snapshot__vehicle-pick" role="listitem">
                    <a
                      className="market-snapshot__vehicle-pick-media-link"
                      href={getListingUrl(match)}
                      aria-label={`View listing for ${getVehicleMatchTitle(match)}`}
                    >
                      <OptimizedImage
                        src={vehicle.image}
                        alt={getVehicleMatchTitle(match)}
                        aspectRatio="16/10"
                        wrapperClassName="market-snapshot__vehicle-pick-media"
                      />
                    </a>
                    <div className="market-snapshot__vehicle-pick-topline">
                      <span>{conditionLabel}</span>
                      <strong>{formatPrice(match.unit.price)}</strong>
                    </div>
                    <h4>{getVehicleMatchTitle(match)}</h4>
                    <p>{match.dealer.name}</p>
                    <dl className="market-snapshot__vehicle-pick-metrics">
                      <div>
                        <dt>Distance</dt>
                        <dd>{match.dealer.distance !== undefined ? `${match.dealer.distance.toFixed(1)} mi` : 'N/A'}</dd>
                      </div>
                      <div>
                        <dt>Days on lot</dt>
                        <dd>{match.unit.daysOnLot ?? 'N/A'}</dd>
                      </div>
                      {!match.unit.isNew && (
                        <div>
                          <dt>Mileage</dt>
                          <dd>{match.unit.mileage !== undefined ? match.unit.mileage.toLocaleString() : 'N/A'}</dd>
                        </div>
                      )}
                    </dl>
                    <div className="market-snapshot__vehicle-pick-badges" aria-label="Vehicle signals">
                      {isGoodPrice && <Badge variant="success">Good price</Badge>}
                      {!match.unit.isNew && match.unit.accidents === 0 && <Badge variant="neutral">No accidents</Badge>}
                      {!match.unit.isNew && isBelowAverageMileage && <Badge variant="info">Below avg mileage</Badge>}
                      {!match.unit.isNew && match.unit.carfaxScore && <Badge variant="neutral">Free VHR</Badge>}
                      {match.unit.isNew && isNewlyListed && <Badge variant="info">Newly listed</Badge>}
                    </div>
                    <a className="market-snapshot__vehicle-pick-cta" href={getListingUrl(match)}>
                      View Listing
                    </a>
                  </article>
                );
              })}
            </div>
          </section>

          {!isUsed && dealerSummary && (
            <section className="market-snapshot__dealer-version" aria-labelledby="market-snapshot-dealer-title">
              <div className="market-snapshot__section-head">
                <p className="market-snapshot__section-kicker">Dealer</p>
                <h3 id="market-snapshot-dealer-title">Your Local Dealer</h3>
              </div>
              <article className="market-snapshot__dealer-card">
                <div className="market-snapshot__dealer-card-main">
                  <h4>{dealerSummary.dealerName}</h4>
                  <p>{dealerSummary.address}</p>
                  <div className="market-snapshot__dealer-facts">
                    <span>{dealerSummary.rating}</span>
                    <span>{dealerSummary.distance}</span>
                  </div>
                </div>
                <dl className="market-snapshot__dealer-inventory">
                  <div>
                    <dt>New {vehicle.make} {vehicle.model}</dt>
                    <dd>{dealerSummary.newCount} matches</dd>
                    <span>{dealerSummary.newPriceRange}</span>
                  </div>
                  <div>
                    <dt>Used {vehicle.make} {vehicle.model}</dt>
                    <dd>{dealerSummary.usedCount} matches</dd>
                    <span>{dealerSummary.usedPriceRange}</span>
                    <span>{dealerSummary.usedMileageRange}</span>
                  </div>
                  <div>
                    <dt>Certified {vehicle.make} {vehicle.model}</dt>
                    <dd>{dealerSummary.certifiedCount} matches</dd>
                    <span>{dealerSummary.certifiedPriceRange}</span>
                    <span>{dealerSummary.certifiedMileageRange}</span>
                  </div>
                </dl>
              </article>
            </section>
          )}
        </div>
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
