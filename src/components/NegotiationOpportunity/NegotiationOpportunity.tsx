import { useMemo, useState } from 'react';
import { CarFront, Gauge, MapPin, Navigation, Phone, TrendingDown } from 'lucide-react';
import {
  formatDistance,
  formatPrice,
  getDealersForVehicle,
  type DealerWithScore,
  type VehicleInventoryItem,
} from '../../services/dealerService';
import { Badge } from '../Badge';
import { Tabs } from '../Tabs';
import { Button } from '../Button';
import './NegotiationOpportunity.css';

type OpportunityLevel = 'Low' | 'Moderate' | 'High' | 'Excellent';
type SearchRadius = 25 | 50 | 100;
type RadiusTabValue = '25' | '50' | '100';

interface NegotiationOpportunityProps {
  year: number;
  make: string;
  model: string;
  msrp: number;
  priceMin: number;
  priceMax: number;
  locationLabel?: string;
  initialLocation?: { lat: number; lng: number };
  rowsOverride?: NegotiationOpportunityRowInput[];
}

interface DealerOpportunityRow {
  dealer: DealerWithScore;
  vehicle: VehicleInventoryItem;
  opportunity: OpportunityLevel;
  score: number;
}

export interface NegotiationOpportunityRowInput {
  dealer: DealerWithScore;
  vehicle: VehicleInventoryItem;
  opportunity?: OpportunityLevel;
  score?: number;
}

const radiusOptions: SearchRadius[] = [25, 50, 100];
const radiusTabItems: { value: RadiusTabValue; label: string }[] = radiusOptions.map((option) => ({
  value: String(option) as RadiusTabValue,
  label: `${option} mi`,
}));

const getOpportunityLevel = (daysOnLot: number, recentPriceDropAmount = 0): OpportunityLevel => {
  if (daysOnLot >= 91 || recentPriceDropAmount >= 1500) return 'Excellent';
  if (daysOnLot >= 61 || recentPriceDropAmount >= 800) return 'High';
  if (daysOnLot >= 31 || recentPriceDropAmount >= 300) return 'Moderate';
  return 'Low';
};

const getOpportunityScore = (item: VehicleInventoryItem, dealer: DealerWithScore) => {
  const daysScore = Math.min(item.daysOnLot ?? 0, 140);
  const dropScore = Math.min((item.recentPriceDropAmount ?? 0) / 20, 120);
  const inventoryScore = Math.min(dealer.inventoryCount * 4, 24);
  const distanceScore = Math.max(0, 20 - Math.min(dealer.distance ?? 0, 40) * 0.3);

  return Math.round(daysScore + dropScore + inventoryScore + distanceScore);
};

const getBestNegotiationUnit = (dealer: DealerWithScore) => {
  return [...dealer.inventory]
    .sort((a, b) => {
      const daysDelta = (b.daysOnLot ?? 0) - (a.daysOnLot ?? 0);
      if (daysDelta !== 0) return daysDelta;
      return (b.recentPriceDropAmount ?? 0) - (a.recentPriceDropAmount ?? 0);
    })[0];
};

const getOpportunityBadgeVariant = (opportunity: OpportunityLevel) => {
  switch (opportunity) {
    case 'Excellent':
      return 'success';
    case 'High':
      return 'primary';
    case 'Moderate':
      return 'info';
    default:
      return 'neutral';
  }
};

const getLevelDescription = (level: OpportunityLevel) => {
  switch (level) {
    case 'Excellent':
      return 'This market has multiple aged units that should create strong dealer urgency.';
    case 'High':
      return 'Several nearby listings have enough lot age to create real leverage.';
    case 'Moderate':
      return 'There is some negotiating room, especially on older trims and prior-model-year units.';
    default:
      return 'Most nearby listings still look relatively fresh, so price flexibility may be limited.';
  }
};

const NegotiationOpportunity = ({
  year,
  make,
  model,
  msrp,
  priceMin,
  priceMax,
  locationLabel = 'Los Angeles, CA',
  initialLocation = { lat: 34.0522, lng: -118.2437 },
  rowsOverride,
}: NegotiationOpportunityProps) => {
  const [radius, setRadius] = useState<SearchRadius>(50);
  const [radiusTab, setRadiusTab] = useState<RadiusTabValue>('50');

  const dealerRows = useMemo(() => {
    if (rowsOverride && rowsOverride.length > 0) {
      return rowsOverride
        .map((row) => {
          const opportunity = row.opportunity ?? getOpportunityLevel(row.vehicle.daysOnLot ?? 0, row.vehicle.recentPriceDropAmount);
          const score = row.score ?? getOpportunityScore(row.vehicle, row.dealer);

          return {
            dealer: row.dealer,
            vehicle: row.vehicle,
            opportunity,
            score,
          };
        })
        .sort((a, b) => b.score - a.score)
        .slice(0, 5);
    }

    const dealers = getDealersForVehicle(
      make,
      model,
      initialLocation.lat,
      initialLocation.lng,
      msrp,
      100,
      priceMin,
      priceMax
    );

    return dealers
      .filter((dealer) => (dealer.distance ?? 0) <= radius)
      .map((dealer) => {
        const vehicle = getBestNegotiationUnit(dealer);
        if (!vehicle) return null;

        const opportunity = getOpportunityLevel(vehicle.daysOnLot ?? 0, vehicle.recentPriceDropAmount);
        const score = getOpportunityScore(vehicle, dealer);

        return { dealer, vehicle, opportunity, score };
      })
      .filter((row): row is DealerOpportunityRow => row !== null)
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);
  }, [initialLocation.lat, initialLocation.lng, make, model, msrp, priceMin, priceMax, radius, rowsOverride]);

  const summary = useMemo(() => {
    const bestRow = dealerRows[0];
    const nearestRow = [...dealerRows].sort(
      (a, b) => (a.dealer.distance ?? Number.MAX_SAFE_INTEGER) - (b.dealer.distance ?? Number.MAX_SAFE_INTEGER)
    )[0];

    if (!bestRow) {
      return null;
    }

    const bestLevel = bestRow.opportunity;
    const savingsAgainstMsrp = Math.max(0, msrp - bestRow.vehicle.price);
    const savingsVsNearest = nearestRow ? Math.max(0, nearestRow.vehicle.price - bestRow.vehicle.price) : 0;
    const savingsLow = Math.max(500, Math.round((savingsAgainstMsrp * 0.45) / 100) * 100);
    const savingsHigh = Math.max(savingsLow + 500, Math.round((savingsAgainstMsrp * 0.85) / 100) * 100);
    const extraMiles = Math.max(0, Math.round((bestRow.dealer.distance ?? 0) - (nearestRow?.dealer.distance ?? 0)));

    return {
      bestRow,
      nearestRow,
      bestLevel,
      savingsLow,
      savingsHigh,
      savingsVsNearest,
      extraMiles,
    };
  }, [dealerRows, msrp]);

  if (!summary) {
    return null;
  }

  const { bestRow, bestLevel, savingsLow, savingsHigh, savingsVsNearest, extraMiles } = summary;

  return (
    <section className="negotiation-opportunity" aria-labelledby="negotiation-opportunity-title">
      <div className="negotiation-opportunity__header">
        <div>
          <p className="negotiation-opportunity__eyebrow">Negotiation Intelligence</p>
          <h2 id="negotiation-opportunity-title" className="negotiation-opportunity__title">
            Negotiation Power: {bestLevel}
          </h2>
          <p className="negotiation-opportunity__subtitle">
            {getLevelDescription(bestLevel)} The strongest nearby unit is a {bestRow.vehicle.year} {make} {model}{' '}
            at {bestRow.dealer.name} with {bestRow.vehicle.daysOnLot} days on lot.
          </p>
        </div>

        <div className="negotiation-opportunity__radius">
          <span className="negotiation-opportunity__radius-label">Search radius</span>
          <Tabs
            items={radiusTabItems}
            value={radiusTab}
            onChange={(value) => {
              const nextValue = value as RadiusTabValue;
              setRadiusTab(nextValue);
              setRadius(Number(nextValue) as SearchRadius);
            }}
            variant="segmented"
            fullWidth
            ariaLabel="Negotiation search radius"
            className="negotiation-opportunity__radius-tabs"
          />
        </div>
      </div>

      <div className="negotiation-opportunity__insights">
        <article className="negotiation-opportunity__insight-card">
          <span className="negotiation-opportunity__insight-icon">
            <TrendingDown size={18} />
          </span>
          <div>
            <p className="negotiation-opportunity__insight-label">Potential savings opportunity</p>
            <strong className="negotiation-opportunity__insight-value">
              {formatPrice(savingsLow)}-{formatPrice(savingsHigh)}
            </strong>
            <p className="negotiation-opportunity__insight-note">
              Driving an extra {extraMiles} miles could improve your negotiating position by about {formatPrice(savingsVsNearest || savingsLow)}.
            </p>
          </div>
        </article>

        <article className="negotiation-opportunity__insight-card">
          <span className="negotiation-opportunity__insight-icon">
            <Gauge size={18} />
          </span>
          <div>
            <p className="negotiation-opportunity__insight-label">Best aged inventory signal</p>
            <strong className="negotiation-opportunity__insight-value">{bestRow.vehicle.daysOnLot} days on lot</strong>
            <p className="negotiation-opportunity__insight-note">
              Units over 90 days are the clearest candidates for discounting, bonus accessories, or finance support.
            </p>
          </div>
        </article>

        <article className="negotiation-opportunity__insight-card">
          <span className="negotiation-opportunity__insight-icon">
            <MapPin size={18} />
          </span>
          <div>
            <p className="negotiation-opportunity__insight-label">Market scope</p>
            <strong className="negotiation-opportunity__insight-value">{dealerRows.length} dealers within {radius} miles</strong>
            <p className="negotiation-opportunity__insight-note">
              Based on matching {year} {make} {model} inventory near {locationLabel}.
            </p>
          </div>
        </article>
      </div>

      <div className="negotiation-opportunity__table-wrap">
        <table className="negotiation-opportunity__table">
          <thead>
            <tr>
              <th>Dealer</th>
              <th>Distance</th>
              <th>Days on lot</th>
              <th>Opportunity</th>
            </tr>
          </thead>
          <tbody>
            {dealerRows.map((row) => (
              <tr key={row.dealer.id}>
                <td>
                  <div className="negotiation-opportunity__dealer">
                    <strong>{row.dealer.name}</strong>
                    <span>
                      <CarFront size={14} />
                      {row.vehicle.trim} at {formatPrice(row.vehicle.price)}
                    </span>
                    <div className="negotiation-opportunity__dealer-actions">
                      <Button
                        as="a"
                        href={`tel:${row.dealer.phone.replace(/[^0-9]/g, '')}`}
                        variant="ghost"
                        size="small"
                        className="negotiation-opportunity__dealer-action-btn"
                        aria-label={`Call ${row.dealer.name}`}
                      >
                        <Phone size={12} />
                        Call
                      </Button>
                      <Button
                        as="a"
                        href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${row.dealer.address}, ${row.dealer.city}, ${row.dealer.state} ${row.dealer.zipCode}`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        variant="ghost"
                        size="small"
                        className="negotiation-opportunity__dealer-action-btn"
                        aria-label={`Get directions to ${row.dealer.name}`}
                      >
                        <Navigation size={12} />
                        Directions
                      </Button>
                    </div>
                  </div>
                </td>
                <td>{formatDistance(row.dealer.distance ?? 0)}</td>
                <td>{row.vehicle.daysOnLot} days</td>
                <td>
                  <Badge
                    variant={getOpportunityBadgeVariant(row.opportunity)}
                    className="negotiation-opportunity__badge"
                  >
                    {row.opportunity}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="negotiation-opportunity__footer">
        <div className="negotiation-opportunity__footer-copy">
          <p>
            Smart shopper tip: start with the oldest unit, reference any recent price drop, and ask the dealer to justify
            why that vehicle should still be priced above fresher nearby inventory.
          </p>
          <p className="negotiation-opportunity__footer-meta">
            Best current lead: {bestRow.dealer.name} at {formatDistance(bestRow.dealer.distance ?? 0)} with {bestRow.vehicle.daysOnLot} days on lot.
          </p>
        </div>
        <Button
          as="a"
          href="#find-dealers"
          variant="outline"
          size="small"
          className="negotiation-opportunity__footer-action"
        >
          See Local Inventory
        </Button>
      </div>
    </section>
  );
};

export default NegotiationOpportunity;
