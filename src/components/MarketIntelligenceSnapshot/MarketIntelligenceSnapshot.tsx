import { useId, useMemo, useState, type FormEvent } from 'react';
import { Info } from 'lucide-react';
import { Badge } from '../Badge';
import { Button } from '../Button';
import OfficialELotCarousel from '../OfficialELotCarousel';
import { TextField } from '../TextField';
import { Tabs, type TabItem } from '../Tabs';
import { formatPrice } from '../../services/dealerService';
import { getCashDeals, getFinanceDeals } from '../../services/cashFinanceDealsService';
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

const formatPriceRange = (low?: number, high?: number) => {
  if (low === undefined || high === undefined) return 'Price range unavailable';
  if (low === high) return formatPrice(low);
  return `${formatPrice(low)} - ${formatPrice(high)}`;
};

const getNewlyListedPriceRange = (matches: MarketInventoryMatch[]) => {
  const prices = matches
    .filter(({ unit }) => (unit.daysOnLot ?? Number.POSITIVE_INFINITY) <= 30)
    .map(({ unit }) => unit.price);

  if (prices.length === 0) return undefined;
  return {
    low: Math.min(...prices),
    high: Math.max(...prices),
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
  const { statistics } = market;
  const daysOnLotSignal = getDaysOnLotSignal(market.averageDaysOnLot || 0);
  const nextRadius = DEALER_RADIUS_OPTIONS.find((radius) => radius > radiusMiles);
  const ctaLabel = market.inventoryCount > 0
    ? `Compare ${market.inventoryCount} ${isUsed ? 'used ' : ''}${market.inventoryCount === 1 ? 'deal' : 'deals'} within ${radiusMiles} mi`
    : nextRadius
      ? `Expand search to ${nextRadius} mi`
      : 'No matching local inventory';
  const adjacentModelYearCount = statistics.previousYearCount + (isUsed ? statistics.followingYearCount : 0);
  const newlyListedPriceRange = getNewlyListedPriceRange(market.matches);
  const daysOnLotValues = market.matches
    .map(({ unit }) => unit.daysOnLot)
    .filter((value): value is number => value !== undefined);
  const daysOnLotRange = daysOnLotValues.length > 0
    ? `${Math.min(...daysOnLotValues)} - ${Math.max(...daysOnLotValues)} days on lot`
    : 'Days on lot unavailable';
  const cashDeal = getCashDeals().find(
    (deal) => deal.vehicle.make === vehicle.make && deal.vehicle.model === vehicle.model
  );
  const financeDeal = getFinanceDeals().find(
    (deal) => deal.vehicle.make === vehicle.make && deal.vehicle.model === vehicle.model
  );

  const usedMetricCards: MarketMetricCard[] = [
    {
      key: 'matches',
      label: 'Available near you',
      value: `${statistics.currentYearCount} ${statistics.currentYearCount === 1 ? 'vehicle' : 'vehicles'}`,
      detail: `${adjacentModelYearCount} nearby ${Number(vehicle.year) - 1} - ${Number(vehicle.year) + 1} model-year matches`,
    },
    {
      key: 'priceRange',
      label: 'Local price range',
      value: formatPriceRange(statistics.lowPrice, statistics.highPrice),
      detail: `${formatPrice(market.averagePrice)} average asking price`,
    },
    {
      key: 'mileageRange',
      label: 'Mileage range',
      value:
        statistics.lowMileage !== undefined && statistics.highMileage !== undefined
          ? `${statistics.lowMileage.toLocaleString()} - ${statistics.highMileage.toLocaleString()} mi`
          : 'Mileage unavailable',
      detail:
        statistics.averageMileage !== undefined
          ? `${statistics.averageMileage.toLocaleString()} average mileage near you`
          : 'Average mileage unavailable',
    },
    {
      key: 'averageDays',
      label: 'Average days on market',
      value: `${market.averageDaysOnLot} days`,
      detail: `${vehicle.model} listings range from ${daysOnLotRange}`,
      signal: daysOnLotSignal,
      tooltip: {
        title: 'What days on market means',
        copy: `${market.averageDaysOnLot} days is the average time these matching listings have been advertised. We use ${DAYS_ON_LOT_REFERENCE} days as a reference. Vehicles listed for 45 days or more are aging inventory and may give buyers more negotiating room.`,
        ariaLabel: 'Explain average days on market',
      },
    },
    {
      key: 'goodGreatPrice',
      label: '# with a good or great price',
      value: `${statistics.goodGreatPriceCount} ${statistics.goodGreatPriceCount === 1 ? 'vehicle' : 'vehicles'}`,
      detail: `${statistics.priceDropCount} ${statistics.priceDropCount === 1 ? 'vehicle has' : 'vehicles have'} a recent price drop`,
    },
    {
      key: 'newlyListed',
      label: '# newly listed',
      value: `${statistics.newlyListedCount} ${statistics.newlyListedCount === 1 ? 'vehicle' : 'vehicles'}`,
      detail: `${formatPriceRange(newlyListedPriceRange?.low, newlyListedPriceRange?.high)} for newly listed ${vehicle.model}`,
    },
  ];
  const newMetricCards: MarketMetricCard[] = [
    {
      key: 'matches',
      label: 'Available near you',
      value: `${statistics.currentYearCount} ${statistics.currentYearCount === 1 ? 'vehicle' : 'vehicles'}`,
      detail: `${statistics.previousYearCount} prior model-year matches available`,
    },
    {
      key: 'priceRange',
      label: 'Local price range',
      value: formatPriceRange(statistics.lowPrice, statistics.highPrice),
      detail: 'Prices vary by trim, packages, and dealer-installed options.',
    },
    {
      key: 'averageDays',
      label: 'Average days on market',
      value: `${market.averageDaysOnLot} days`,
      detail: daysOnLotSignal.label === 'Fast-moving market'
        ? 'Vehicles are selling quickly compared to most new vehicles.'
        : daysOnLotSignal.detail,
      signal: daysOnLotSignal,
      tooltip: {
        title: 'What days on market means',
        copy: `${market.averageDaysOnLot} days is the average time these matching listings have been advertised. We use ${DAYS_ON_LOT_REFERENCE} days as a reference. Vehicles listed for 45 days or more are aging inventory and may give buyers more negotiating room.`,
        ariaLabel: 'Explain average days on market',
      },
    },
    {
      key: 'newlyListed',
      label: '# newly listed',
      value: `${statistics.newlyListedCount} ${statistics.newlyListedCount === 1 ? 'vehicle' : 'vehicles'}`,
      detail: `${formatPriceRange(newlyListedPriceRange?.low, newlyListedPriceRange?.high)} for newly listed ${vehicle.model}`,
    },
    {
      key: 'financeSpecial',
      label: `${vehicle.make} finance specials`,
      value: financeDeal?.rateTiers
        ? `${financeDeal.rateTiers[0].apr}% - ${financeDeal.rateTiers[financeDeal.rateTiers.length - 1].apr}%`
        : financeDeal?.apr ?? 'Check local offers',
      detail: financeDeal ? `Expires ${financeDeal.expirationDate}` : 'Availability varies by dealer',
    },
    {
      key: 'cashSpecial',
      label: `${vehicle.make} cash back special`,
      value: cashDeal?.incentiveValue ?? 'Check local offers',
      detail: cashDeal ? `Expires ${cashDeal.expirationDate}` : 'Availability varies by dealer',
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

      {market.inventoryCount > 0 ? (
        <OfficialELotCarousel
          year={vehicle.year}
          make={vehicle.make}
          model={vehicle.model}
          bodyStyle={vehicle.bodyStyle}
          location={location.label}
          priceThreshold={market.averagePrice}
          className="market-snapshot__elot"
          title="Vehicles worth a closer look"
          resultsLinkPrefix="Ranked like the eLot marketplace module."
          resultsLinkAnchorLabel={`See all ${vehicle.make} ${vehicle.model} listings`}
          resultsLinkSuffix={`near ${location.label}`}
        />
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
