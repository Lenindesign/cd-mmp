import { useMemo, useState } from 'react';
import {
  AlertTriangle,
  Award,
  BarChart3,
  CarFront,
  CircleDollarSign,
  Clock3,
  Gauge,
  ListChecks,
  MapPin,
  Navigation,
  Phone,
  Scale,
  ShieldCheck,
  Sparkles,
  TrendingDown,
  UserRound,
  Wrench,
} from 'lucide-react';
import {
  formatDistance,
  formatPrice,
  getDealersForVehicle,
  type DealerWithScore,
  type VehicleInventoryItem,
} from '../../services/dealerService';
import { Badge } from '../Badge';
import { Tabs, type TabItem } from '../Tabs';
import { Button } from '../Button';
import './NegotiationOpportunity.css';

type OpportunityLevel = 'Low' | 'Moderate' | 'High' | 'Excellent';
type SearchRadius = 25 | 50 | 100;
type RadiusTabValue = '25' | '50' | '100';
type NegotiationOpportunityVariant = 'default' | 'option-b';
type ExplorerView =
  | 'classic'
  | 'market-brief'
  | 'trust-check'
  | 'price-ladder'
  | 'leverage-map'
  | 'dealer-scoreboard'
  | 'buyer-playbook';

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
  variant?: NegotiationOpportunityVariant;
  enableVariantExplorer?: boolean;
}

interface DealerOpportunityRow {
  dealer: DealerWithScore;
  vehicle: VehicleInventoryItem;
  opportunity: OpportunityLevel;
  score: number;
}

interface MarketSnapshot {
  availableUnits: number;
  agedUnits: number;
  avgDaysOnLot: number;
  averagePrice: number;
  medianPrice: number;
  lowestPriceUnit: VehicleInventoryItem;
  highestPriceUnit: VehicleInventoryItem;
  biggestPriceDropUnit?: VehicleInventoryItem;
  oneOwnerCount: number;
  accidentFreeCount: number;
  cleanTitleCount: number;
  personalUseCount: number;
  serviceRichCount: number;
  certifiedCount: number;
  averageMileage?: number;
  usedUnitsCount: number;
  priceSpread: number;
  additionalDealers: number;
  expansionRadius?: SearchRadius;
  historyCoverageScore: number;
  leverageCoverageScore: number;
}

interface DealerInsightRow extends DealerOpportunityRow {
  historyScore: number;
  leverageScore: number;
  overallScore: number;
  priceGap: number;
  priceGapVsMarket: number;
  trustFlags: string[];
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

const explorerItems: TabItem<ExplorerView>[] = [
  { value: 'market-brief', label: 'Brief', icon: <Sparkles size={14} /> },
  { value: 'trust-check', label: 'History', icon: <ShieldCheck size={14} /> },
  { value: 'price-ladder', label: 'Price', icon: <CircleDollarSign size={14} /> },
  { value: 'leverage-map', label: 'Map', icon: <Scale size={14} /> },
  { value: 'dealer-scoreboard', label: 'Scores', icon: <BarChart3 size={14} /> },
  { value: 'buyer-playbook', label: 'Playbook', icon: <ListChecks size={14} /> },
];

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

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

const matchesVehicle = (item: VehicleInventoryItem, make: string, model: string) =>
  item.make.toLowerCase() === make.toLowerCase() && item.model.toLowerCase() === model.toLowerCase();

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

const getHistoryScore = (vehicle: VehicleInventoryItem) => {
  if (vehicle.isNew) {
    return 96;
  }

  let score = 92;
  score -= Math.max(0, (vehicle.owners ?? 1) - 1) * 6;
  score -= (vehicle.accidents ?? 0) * 16;
  score -= vehicle.titleStatus === 'Rebuilt' ? 24 : 0;
  score -= vehicle.titleStatus === 'Salvage' ? 32 : 0;
  score -= vehicle.rentalUse ? 12 : 0;
  score -= vehicle.fleetUse ? 8 : 0;
  score += vehicle.personalUse ? 4 : 0;
  score += Math.min(10, Math.round((vehicle.serviceRecords ?? 0) * 0.7));
  score += vehicle.isCertified ? 4 : 0;

  return clamp(Math.round(score), 44, 99);
};

const getTrustFlags = (vehicle: VehicleInventoryItem) => {
  const flags: string[] = [];

  if (vehicle.isNew) {
    flags.push('Factory-fresh');
  } else {
    if ((vehicle.owners ?? 0) === 1) flags.push('One owner');
    if ((vehicle.accidents ?? 0) === 0) flags.push('No accidents');
    if (vehicle.personalUse) flags.push('Personal use');
    if ((vehicle.serviceRecords ?? 0) >= 8) flags.push('Strong service file');
  }

  if (vehicle.titleStatus === 'Clean') flags.push('Clean title');
  if (vehicle.isCertified) flags.push('CPO eligible');

  return flags.slice(0, 4);
};

const getLeverageScore = (vehicle: VehicleInventoryItem, marketAverage: number) => {
  const daysComponent = Math.min(55, ((vehicle.daysOnLot ?? 0) / 140) * 55);
  const priceDropComponent = Math.min(20, (vehicle.recentPriceDropAmount ?? 0) / 90);
  const priceComponent = marketAverage > 0 ? clamp(((marketAverage - vehicle.price) / marketAverage) * 100, -6, 16) : 0;
  const finalScore = 38 + daysComponent + priceDropComponent + priceComponent;
  return clamp(Math.round(finalScore), 24, 98);
};

const formatSignedCurrency = (value: number) => `${value >= 0 ? '+' : '-'}${formatPrice(Math.abs(value))}`;

const getScoreTone = (score: number) => {
  if (score >= 85) return 'success';
  if (score >= 70) return 'primary';
  if (score >= 55) return 'info';
  return 'neutral';
};

const getHistoryLabel = (score: number) => {
  if (score >= 88) return 'Low risk';
  if (score >= 74) return 'Solid history';
  if (score >= 60) return 'Mixed history';
  return 'Needs checking';
};

const getViewIntro = (view: ExplorerView) => {
  switch (view) {
    case 'market-brief':
      return 'High-level market read';
    case 'trust-check':
      return 'Ownership and history quality';
    case 'price-ladder':
      return 'Price dispersion and discounts';
    case 'leverage-map':
      return 'Trust versus negotiating leverage';
    case 'dealer-scoreboard':
      return 'Dealer-by-dealer comparison';
    case 'buyer-playbook':
      return 'Decision-ready recommendations';
    default:
      return 'Negotiation intelligence';
  }
};

const MarketHeroCard = ({
  label,
  value,
  note,
}: {
  label: string;
  value: string;
  note: string;
}) => (
  <div className="negotiation-opportunity__summary-item">
    <span className="negotiation-opportunity__summary-label">{label}</span>
    <strong className="negotiation-opportunity__summary-value">{value}</strong>
    <span className="negotiation-opportunity__summary-note">{note}</span>
  </div>
);

const ScoreBar = ({
  label,
  value,
  tone,
}: {
  label: string;
  value: number;
  tone: 'success' | 'primary' | 'info' | 'neutral';
}) => (
  <div className="negotiation-opportunity__score-bar">
    <div className="negotiation-opportunity__score-bar-head">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
    <div className="negotiation-opportunity__score-bar-track">
      <div
        className={`negotiation-opportunity__score-bar-fill negotiation-opportunity__score-bar-fill--${tone}`}
        style={{ width: `${value}%` }}
      />
    </div>
  </div>
);

const TrustBadgeRow = ({ flags }: { flags: string[] }) => (
  <div className="negotiation-opportunity__trust-badges">
    {flags.map((flag) => (
      <span key={flag} className="negotiation-opportunity__trust-badge">
        {flag}
      </span>
    ))}
  </div>
);

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
  variant = 'default',
  enableVariantExplorer = false,
}: NegotiationOpportunityProps) => {
  const initialExplorerView: ExplorerView =
    variant === 'option-b' ? 'market-brief' : 'classic';
  const [radius, setRadius] = useState<SearchRadius>(50);
  const [radiusTab, setRadiusTab] = useState<RadiusTabValue>('50');
  const [selectedView, setSelectedView] = useState<ExplorerView>(initialExplorerView);

  const allDealerRows = useMemo(() => {
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
        .sort((a, b) => b.score - a.score);
    }

    const dealers = getDealersForVehicle(
      make,
      model,
      initialLocation.lat,
      initialLocation.lng,
      msrp,
      100,
      priceMin,
      priceMax,
      year
    );

    return dealers
      .map((dealer) => {
        const vehicle = getBestNegotiationUnit(dealer);
        if (!vehicle) return null;

        const opportunity = getOpportunityLevel(vehicle.daysOnLot ?? 0, vehicle.recentPriceDropAmount);
        const score = getOpportunityScore(vehicle, dealer);

        return { dealer, vehicle, opportunity, score };
      })
      .filter((row): row is DealerOpportunityRow => row !== null)
      .sort((a, b) => b.score - a.score);
  }, [initialLocation.lat, initialLocation.lng, make, model, msrp, priceMin, priceMax, rowsOverride, year]);

  const dealerRows = useMemo(
    () =>
      allDealerRows
        .filter((row) => (row.dealer.distance ?? 0) <= radius)
        .slice(0, 5),
    [allDealerRows, radius]
  );

  const inventoryPool = useMemo(() => {
    const matchingInventory = dealerRows.flatMap((row) => {
      const dealerMatches = row.dealer.inventory.filter((item) => matchesVehicle(item, make, model) && item.year === year);
      return dealerMatches.length > 0 ? dealerMatches : [row.vehicle];
    });

    return Array.from(
      new Map(
        matchingInventory.map((item) => [
          `${item.year}-${item.make}-${item.model}-${item.trim}-${item.price}-${item.daysOnLot ?? 0}`,
          item,
        ])
      ).values()
    );
  }, [dealerRows, make, model, year]);

  const marketSnapshot = useMemo<MarketSnapshot | null>(() => {
    if (inventoryPool.length === 0) {
      return null;
    }

    const prices = inventoryPool.map((item) => item.price).sort((a, b) => a - b);
    const usedInventory = inventoryPool.filter((item) => !item.isNew);
    const mileageInventory = usedInventory.filter((item) => typeof item.mileage === 'number');
    const sortedByDrop = [...inventoryPool]
      .filter((item) => typeof item.recentPriceDropAmount === 'number')
      .sort((a, b) => (b.recentPriceDropAmount ?? 0) - (a.recentPriceDropAmount ?? 0));
    const lowestPriceUnit = [...inventoryPool].sort((a, b) => a.price - b.price)[0];
    const highestPriceUnit = [...inventoryPool].sort((a, b) => b.price - a.price)[0];
    const medianPrice = prices[Math.floor(prices.length / 2)];
    const averagePrice = Math.round(prices.reduce((sum, price) => sum + price, 0) / prices.length);
    const agedUnits = inventoryPool.filter((item) => (item.daysOnLot ?? 0) >= 90).length;
    const avgDaysOnLot = Math.round(
      inventoryPool.reduce((sum, item) => sum + (item.daysOnLot ?? 0), 0) / inventoryPool.length
    );
    const oneOwnerCount = usedInventory.filter((item) => (item.owners ?? 0) === 1).length;
    const accidentFreeCount = inventoryPool.filter((item) => (item.accidents ?? 0) === 0).length;
    const cleanTitleCount = inventoryPool.filter((item) => item.titleStatus === 'Clean' || !item.titleStatus).length;
    const personalUseCount = usedInventory.filter((item) => item.personalUse).length;
    const serviceRichCount = usedInventory.filter((item) => (item.serviceRecords ?? 0) >= 8).length;
    const certifiedCount = inventoryPool.filter((item) => item.isCertified).length;
    const averageMileage = mileageInventory.length > 0
      ? Math.round(mileageInventory.reduce((sum, item) => sum + (item.mileage ?? 0), 0) / mileageInventory.length)
      : undefined;
    const expansionRadius = radiusOptions.find((option) => option > radius);
    const expandedDealerCount = expansionRadius
      ? allDealerRows.filter((row) => (row.dealer.distance ?? 0) <= expansionRadius).length
      : dealerRows.length;
    const additionalDealers = Math.max(0, expandedDealerCount - dealerRows.length);
    const historyCoverageScore = Math.round(
      inventoryPool.reduce((sum, item) => sum + getHistoryScore(item), 0) / inventoryPool.length
    );
    const leverageCoverageScore = Math.round(
      inventoryPool.reduce((sum, item) => sum + getLeverageScore(item, averagePrice), 0) / inventoryPool.length
    );

    return {
      availableUnits: inventoryPool.length,
      agedUnits,
      avgDaysOnLot,
      averagePrice,
      medianPrice,
      lowestPriceUnit,
      highestPriceUnit,
      biggestPriceDropUnit: sortedByDrop[0],
      oneOwnerCount,
      accidentFreeCount,
      cleanTitleCount,
      personalUseCount,
      serviceRichCount,
      certifiedCount,
      averageMileage,
      usedUnitsCount: usedInventory.length,
      priceSpread: highestPriceUnit.price - lowestPriceUnit.price,
      additionalDealers,
      expansionRadius,
      historyCoverageScore,
      leverageCoverageScore,
    };
  }, [allDealerRows, dealerRows.length, inventoryPool, radius]);

  const rowInsights = useMemo<DealerInsightRow[]>(() => {
    if (!marketSnapshot) {
      return [];
    }

    return dealerRows.map((row) => {
      const historyScore = getHistoryScore(row.vehicle);
      const leverageScore = getLeverageScore(row.vehicle, marketSnapshot.averagePrice);
      const overallScore = clamp(
        Math.round(historyScore * 0.34 + leverageScore * 0.41 + row.dealer.rating * 5.2 + row.score * 0.08),
        0,
        100
      );
      const priceGap = marketSnapshot.averagePrice - row.vehicle.price;
      const priceGapVsMarket = Math.round((priceGap / marketSnapshot.averagePrice) * 100);

      return {
        ...row,
        historyScore,
        leverageScore,
        overallScore,
        priceGap,
        priceGapVsMarket,
        trustFlags: getTrustFlags(row.vehicle),
      };
    });
  }, [dealerRows, marketSnapshot]);

  const summary = useMemo(() => {
    if (!marketSnapshot || rowInsights.length === 0) {
      return null;
    }

    const bestRow = rowInsights[0];
    const safestRow = [...rowInsights].sort((a, b) => b.historyScore - a.historyScore)[0];
    const biggestDropRow = [...rowInsights].sort(
      (a, b) => (b.vehicle.recentPriceDropAmount ?? 0) - (a.vehicle.recentPriceDropAmount ?? 0)
    )[0];

    return {
      bestRow,
      safestRow,
      biggestDropRow,
    };
  }, [marketSnapshot, rowInsights]);

  if (!summary || !marketSnapshot) {
    return null;
  }

  const activeView = enableVariantExplorer ? selectedView : initialExplorerView;
  const { bestRow, safestRow, biggestDropRow } = summary;
  const bestLevel = bestRow.opportunity;
  const classicSavingsLow = Math.max(500, Math.round((Math.max(0, msrp - bestRow.vehicle.price) * 0.45) / 100) * 100);
  const classicSavingsHigh = Math.max(classicSavingsLow + 500, Math.round((Math.max(0, msrp - bestRow.vehicle.price) * 0.85) / 100) * 100);
  const optionBRecommendation = marketSnapshot.agedUnits >= 3
    ? `Start with ${bestRow.dealer.name}. Aged inventory is the clearest leverage signal in this market.`
    : marketSnapshot.expansionRadius && marketSnapshot.additionalDealers > 0
      ? `Compare the best current listing first, then expand to ${marketSnapshot.expansionRadius} miles for ${marketSnapshot.additionalDealers} more dealer options.`
      : 'Set alerts for new listings and price drops before your next dealer conversation.';

  const renderModuleFooter = (copy: string) => (
    <div className="negotiation-opportunity__footer">
      <div className="negotiation-opportunity__footer-copy">
        <p>{copy}</p>
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
  );

  const renderClassicView = () => (
    <>
      <div className="negotiation-opportunity__header">
        <div>
          <p className="negotiation-opportunity__eyebrow">Negotiation Intelligence</p>
          <h2 id="negotiation-opportunity-title" className="negotiation-opportunity__title">
            Negotiation Power: {bestLevel}
          </h2>
          <p className="negotiation-opportunity__subtitle">
            {getLevelDescription(bestLevel)} The strongest nearby unit is a {bestRow.vehicle.year} {make} {model} at {bestRow.dealer.name} with {bestRow.vehicle.daysOnLot} days on lot.
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
              {formatPrice(classicSavingsLow)}-{formatPrice(classicSavingsHigh)}
            </strong>
            <p className="negotiation-opportunity__insight-note">
              {formatPrice(Math.abs(bestRow.priceGap))} relative to the current market average for matching local inventory.
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
            {rowInsights.map((row) => (
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

      {renderModuleFooter('Smart shopper tip: start with the oldest unit, reference any recent price drop, and ask the dealer to justify why that vehicle should still be priced above fresher nearby inventory.')}
    </>
  );

  const renderMarketBriefView = () => (
    <>
      <div className="negotiation-opportunity__header negotiation-opportunity__header--market-brief">
        <div>
          <p className="negotiation-opportunity__eyebrow">Local Vehicle Market Intelligence</p>
          <h2 id="negotiation-opportunity-title" className="negotiation-opportunity__title negotiation-opportunity__title--stacked">
            Buyer leverage looks {bestLevel.toLowerCase()}
          </h2>
          <p className="negotiation-opportunity__subtitle negotiation-opportunity__subtitle--compact">
            {dealerRows.length} local dealers are carrying {marketSnapshot.availableUnits} matching {year} {make} {model} units within {radius} miles. The strongest current anchor is {bestRow.dealer.name}, where the best-match unit has been on the lot for {bestRow.vehicle.daysOnLot} days.
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

      <div className="negotiation-opportunity__summary-strip" aria-label="Market summary">
        <MarketHeroCard label="Inventory" value={`${marketSnapshot.availableUnits} units`} note={`Across ${dealerRows.length} dealers`} />
        <MarketHeroCard label="Aged 90+ days" value={`${marketSnapshot.agedUnits} units`} note={`Average lot age ${marketSnapshot.avgDaysOnLot} days`} />
        <MarketHeroCard label="Best live price" value={formatPrice(marketSnapshot.lowestPriceUnit.price)} note={`${formatPrice(Math.max(0, marketSnapshot.averagePrice - marketSnapshot.lowestPriceUnit.price))} below market average`} />
        <MarketHeroCard
          label="Next move"
          value={marketSnapshot.expansionRadius && marketSnapshot.additionalDealers > 0 ? `+${marketSnapshot.additionalDealers} dealers` : 'Set alerts'}
          note={marketSnapshot.expansionRadius && marketSnapshot.additionalDealers > 0 ? `Expand to ${marketSnapshot.expansionRadius} mi` : 'Track price drops and new listings'}
        />
      </div>

      <div className="negotiation-opportunity__action-band">
        <p className="negotiation-opportunity__action-kicker">What to do now</p>
        <p className="negotiation-opportunity__action-copy">{optionBRecommendation}</p>
      </div>

      <div className="negotiation-opportunity__table-wrap">
        <div className="negotiation-opportunity__table-intro">
          <p className="negotiation-opportunity__table-kicker">Matching local inventory</p>
          <h3 className="negotiation-opportunity__table-title">Dealer comps to reference in your next conversation</h3>
        </div>
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
            {rowInsights.map((row) => (
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
                  <Badge variant={getOpportunityBadgeVariant(row.opportunity)} className="negotiation-opportunity__badge">
                    {row.opportunity}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {renderModuleFooter('Use this module as a live market brief: start with the oldest or cheapest unit, compare it against the market average, and keep alerts active for new inventory or price drops.')}
    </>
  );

  const renderTrustCheckView = () => (
    <>
      <div className="negotiation-opportunity__header negotiation-opportunity__header--trust">
        <div>
          <p className="negotiation-opportunity__eyebrow">Vehicle history confidence</p>
          <h2 id="negotiation-opportunity-title" className="negotiation-opportunity__title">
            Clean-history supply looks {marketSnapshot.historyCoverageScore >= 82 ? 'strong' : 'mixed'}
          </h2>
          <p className="negotiation-opportunity__subtitle">
            Within {radius} miles, {marketSnapshot.accidentFreeCount} of {marketSnapshot.availableUnits} local matches are accident-free and {marketSnapshot.oneOwnerCount} used units show one-owner history. This view separates low-risk picks from leverage-only plays.
          </p>
        </div>
        <div className="negotiation-opportunity__dial-card">
          <span className="negotiation-opportunity__radius-label">History confidence</span>
          <div className="negotiation-opportunity__score-dial" style={{ ['--dial-value' as string]: `${marketSnapshot.historyCoverageScore}` }}>
            <div>
              <strong>{marketSnapshot.historyCoverageScore}</strong>
              <span>/100</span>
            </div>
          </div>
        </div>
      </div>

      <div className="negotiation-opportunity__summary-strip">
        <MarketHeroCard label="One owner" value={`${marketSnapshot.oneOwnerCount}`} note={`${marketSnapshot.usedUnitsCount} used units in scope`} />
        <MarketHeroCard label="No accidents" value={`${marketSnapshot.accidentFreeCount}`} note="Clear-history supply in radius" />
        <MarketHeroCard label="Clean title" value={`${marketSnapshot.cleanTitleCount}`} note="Units without title warnings" />
        <MarketHeroCard label="Service rich" value={`${marketSnapshot.serviceRichCount}`} note="8+ service records available" />
      </div>

      <div className="negotiation-opportunity__variant-panel">
        <div className="negotiation-opportunity__panel-grid negotiation-opportunity__panel-grid--split">
          <article className="negotiation-opportunity__panel-card">
            <h3>Trust mix</h3>
            <p>
              Prioritize listings that combine one-owner history, no accidents, clean title, and personal-use flags before you start comparing price gaps.
            </p>
            <div className="negotiation-opportunity__mix-bars">
              <div className="negotiation-opportunity__mix-bar-row">
                <span>No accidents</span>
                <div className="negotiation-opportunity__mix-bar-track"><div className="negotiation-opportunity__mix-bar-fill" style={{ width: `${(marketSnapshot.accidentFreeCount / marketSnapshot.availableUnits) * 100}%` }} /></div>
              </div>
              <div className="negotiation-opportunity__mix-bar-row">
                <span>Personal use</span>
                <div className="negotiation-opportunity__mix-bar-track"><div className="negotiation-opportunity__mix-bar-fill" style={{ width: `${(marketSnapshot.personalUseCount / Math.max(marketSnapshot.usedUnitsCount, 1)) * 100}%` }} /></div>
              </div>
              <div className="negotiation-opportunity__mix-bar-row">
                <span>Certified</span>
                <div className="negotiation-opportunity__mix-bar-track"><div className="negotiation-opportunity__mix-bar-fill" style={{ width: `${(marketSnapshot.certifiedCount / marketSnapshot.availableUnits) * 100}%` }} /></div>
              </div>
            </div>
          </article>

          <article className="negotiation-opportunity__panel-card">
            <h3>Safest current pick</h3>
            <div className="negotiation-opportunity__spotlight-card">
              <div className="negotiation-opportunity__spotlight-top">
                <strong>{safestRow.dealer.name}</strong>
                <Badge variant={getScoreTone(safestRow.historyScore)}>{getHistoryLabel(safestRow.historyScore)}</Badge>
              </div>
              <p>{safestRow.vehicle.trim} at {formatPrice(safestRow.vehicle.price)} • {formatDistance(safestRow.dealer.distance ?? 0)}</p>
              <TrustBadgeRow flags={safestRow.trustFlags} />
            </div>
          </article>
        </div>

        <div className="negotiation-opportunity__stack-list">
          {rowInsights
            .slice()
            .sort((a, b) => b.historyScore - a.historyScore)
            .map((row) => (
              <article key={row.dealer.id} className="negotiation-opportunity__stack-item">
                <div>
                  <div className="negotiation-opportunity__stack-title">
                    <strong>{row.dealer.name}</strong>
                    <Badge variant={getScoreTone(row.historyScore)}>{row.historyScore} history</Badge>
                  </div>
                  <p>{row.vehicle.trim} at {formatPrice(row.vehicle.price)}</p>
                  <TrustBadgeRow flags={row.trustFlags} />
                </div>
                <div className="negotiation-opportunity__stack-meta">
                  <span>{row.vehicle.owners ?? 0} owners</span>
                  <span>{(row.vehicle.accidents ?? 0) === 0 ? 'No accidents' : `${row.vehicle.accidents} accidents`}</span>
                </div>
              </article>
            ))}
        </div>
      </div>

      {renderModuleFooter('Use this view when the buyer cares more about history quality than absolute discount. Lead with clean-title, low-owner, no-accident units before discussing pricing leverage.')}
    </>
  );

  const renderPriceLadderView = () => {
    const priceSorted = [...rowInsights].sort((a, b) => a.vehicle.price - b.vehicle.price);
    const range = Math.max(1, marketSnapshot.highestPriceUnit.price - marketSnapshot.lowestPriceUnit.price);

    return (
      <>
        <div className="negotiation-opportunity__header">
          <div>
            <p className="negotiation-opportunity__eyebrow">Price dispersion</p>
            <h2 id="negotiation-opportunity-title" className="negotiation-opportunity__title">
              Price ladder exposes the discount floor
            </h2>
            <p className="negotiation-opportunity__subtitle">
              Use the spread between the cheapest live unit, the market median, and the biggest recent drop to decide whether this is a real deal or just normal market noise.
            </p>
          </div>
          <div className="negotiation-opportunity__radius">
            <span className="negotiation-opportunity__radius-label">Price spread</span>
            <strong className="negotiation-opportunity__metric-callout">{formatPrice(marketSnapshot.priceSpread)}</strong>
            <p className="negotiation-opportunity__metric-subcopy">from floor to ceiling</p>
          </div>
        </div>

        <div className="negotiation-opportunity__summary-strip">
          <MarketHeroCard label="Cheapest live" value={formatPrice(marketSnapshot.lowestPriceUnit.price)} note={`${formatPrice(Math.max(0, marketSnapshot.averagePrice - marketSnapshot.lowestPriceUnit.price))} under avg`} />
          <MarketHeroCard label="Market median" value={formatPrice(marketSnapshot.medianPrice)} note={`Average sits at ${formatPrice(marketSnapshot.averagePrice)}`} />
          <MarketHeroCard label="Biggest drop" value={formatPrice(biggestDropRow.vehicle.recentPriceDropAmount ?? 0)} note={`${biggestDropRow.dealer.name} moved most recently`} />
          <MarketHeroCard label="Aged discount" value={`${marketSnapshot.agedUnits}`} note="units old enough to pressure price" />
        </div>

        <div className="negotiation-opportunity__variant-panel">
          <div className="negotiation-opportunity__chart-list">
            {priceSorted.map((row) => {
              const bargainWidth = 18 + ((marketSnapshot.highestPriceUnit.price - row.vehicle.price) / range) * 82;
              return (
                <div key={row.dealer.id} className="negotiation-opportunity__chart-row">
                  <div className="negotiation-opportunity__chart-label">
                    <strong>{row.dealer.name}</strong>
                    <span>{row.vehicle.trim}</span>
                  </div>
                  <div className="negotiation-opportunity__chart-track">
                    <div className="negotiation-opportunity__chart-fill" style={{ width: `${bargainWidth}%` }} />
                    <span className="negotiation-opportunity__chart-price">{formatPrice(row.vehicle.price)}</span>
                  </div>
                  <div className="negotiation-opportunity__chart-meta">
                    <span>{row.priceGap >= 0 ? `${formatSignedCurrency(row.priceGap)} vs avg` : `${formatSignedCurrency(row.priceGap)} vs avg`}</span>
                    <span>{row.vehicle.recentPriceDropAmount ? `${formatPrice(row.vehicle.recentPriceDropAmount)} recent drop` : 'No recent cut'}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {renderModuleFooter('Use this view to anchor the conversation on market spread. Start with the cheapest comparable or the biggest recent drop, then force the dealer to explain why a higher-priced unit still deserves premium positioning.')}
      </>
    );
  };

  const renderLeverageMapView = () => {
    const quadrants = {
      prime: rowInsights.filter((row) => row.historyScore >= 80 && row.leverageScore >= 75),
      safe: rowInsights.filter((row) => row.historyScore >= 80 && row.leverageScore < 75),
      pressure: rowInsights.filter((row) => row.historyScore < 80 && row.leverageScore >= 75),
      monitor: rowInsights.filter((row) => row.historyScore < 80 && row.leverageScore < 75),
    };

    const quadrantCards = [
      {
        key: 'prime',
        title: 'Prime targets',
        note: 'High trust, high leverage',
        rows: quadrants.prime,
      },
      {
        key: 'safe',
        title: 'Safe but firm',
        note: 'Great history, lighter discount edge',
        rows: quadrants.safe,
      },
      {
        key: 'pressure',
        title: 'Cheap with caveats',
        note: 'Strong leverage, more history to verify',
        rows: quadrants.pressure,
      },
      {
        key: 'monitor',
        title: 'Monitor only',
        note: 'Neither history nor urgency stands out',
        rows: quadrants.monitor,
      },
    ];

    return (
      <>
        <div className="negotiation-opportunity__header">
          <div>
            <p className="negotiation-opportunity__eyebrow">Trust vs leverage</p>
            <h2 id="negotiation-opportunity-title" className="negotiation-opportunity__title">
              Leverage map shows where urgency meets confidence
            </h2>
            <p className="negotiation-opportunity__subtitle">
              The best shopping targets are the units that combine dealer urgency with low-risk ownership history. This grid quickly separates strong opportunities from risky discounts.
            </p>
          </div>
          <div className="negotiation-opportunity__mini-legend">
            <span><ShieldCheck size={14} /> history confidence</span>
            <span><Clock3 size={14} /> days on lot + price pressure</span>
          </div>
        </div>

        <div className="negotiation-opportunity__quadrant-grid">
          {quadrantCards.map((quadrant) => (
            <article key={quadrant.key} className="negotiation-opportunity__quadrant-card">
              <div className="negotiation-opportunity__quadrant-head">
                <h3>{quadrant.title}</h3>
                <p>{quadrant.note}</p>
              </div>
              {quadrant.rows.length > 0 ? (
                quadrant.rows.map((row) => (
                  <div key={row.dealer.id} className="negotiation-opportunity__quadrant-item">
                    <div>
                      <strong>{row.dealer.name}</strong>
                      <p>{row.vehicle.trim} at {formatPrice(row.vehicle.price)}</p>
                    </div>
                    <div className="negotiation-opportunity__quadrant-scores">
                      <Badge variant={getScoreTone(row.historyScore)}>H {row.historyScore}</Badge>
                      <Badge variant={getScoreTone(row.leverageScore)}>L {row.leverageScore}</Badge>
                    </div>
                  </div>
                ))
              ) : (
                <div className="negotiation-opportunity__empty-state">No current listings in this quadrant.</div>
              )}
            </article>
          ))}
        </div>

        {renderModuleFooter('Use this map when a buyer needs a short list fast. Start in Prime targets, fall back to Safe but firm if the buyer values low-risk history over absolute discount, and treat Cheap with caveats as verification-heavy options.')}
      </>
    );
  };

  const renderDealerScoreboardView = () => (
    <>
      <div className="negotiation-opportunity__header">
        <div>
          <p className="negotiation-opportunity__eyebrow">Dealer scoreboard</p>
          <h2 id="negotiation-opportunity-title" className="negotiation-opportunity__title">
            Dealer-by-dealer scoring makes the tradeoffs obvious
          </h2>
          <p className="negotiation-opportunity__subtitle">
            This view stacks price leverage, ownership history, and overall opportunity into one ranking so buyers can see whether the best deal is also the safest one.
          </p>
        </div>
        <div className="negotiation-opportunity__radius">
          <span className="negotiation-opportunity__radius-label">Best overall</span>
          <strong className="negotiation-opportunity__metric-callout">{bestRow.overallScore}/100</strong>
          <p className="negotiation-opportunity__metric-subcopy">{bestRow.dealer.name}</p>
        </div>
      </div>

      <div className="negotiation-opportunity__stack-list">
        {rowInsights
          .slice()
          .sort((a, b) => b.overallScore - a.overallScore)
          .map((row) => (
            <article key={row.dealer.id} className="negotiation-opportunity__scoreboard-card">
              <div className="negotiation-opportunity__scoreboard-head">
                <div>
                  <strong>{row.dealer.name}</strong>
                  <p>{row.vehicle.trim} • {formatPrice(row.vehicle.price)} • {formatDistance(row.dealer.distance ?? 0)}</p>
                </div>
                <Badge variant={getScoreTone(row.overallScore)}>{row.overallScore} overall</Badge>
              </div>
              <div className="negotiation-opportunity__scoreboard-metrics">
                <ScoreBar label="Deal score" value={row.overallScore} tone={getScoreTone(row.overallScore)} />
                <ScoreBar label="History" value={row.historyScore} tone={getScoreTone(row.historyScore)} />
                <ScoreBar label="Leverage" value={row.leverageScore} tone={getScoreTone(row.leverageScore)} />
              </div>
              <TrustBadgeRow flags={row.trustFlags} />
            </article>
          ))}
      </div>

      {renderModuleFooter('Use the scoreboard when the buyer wants a ranked answer instead of an exploration tool. The top row is your best starting point, but the history and leverage bars make it easy to explain why it outranks the others.')}
    </>
  );

  const renderBuyerPlaybookView = () => (
    <>
      <div className="negotiation-opportunity__header">
        <div>
          <p className="negotiation-opportunity__eyebrow">Buyer playbook</p>
          <h2 id="negotiation-opportunity-title" className="negotiation-opportunity__title">
            Three smart ways to attack this market
          </h2>
          <p className="negotiation-opportunity__subtitle">
            Not every buyer wants the same outcome. This playbook separates the safest history pick, the best value pick, and the strongest pressure target so the next step depends on the shopper’s risk tolerance.
          </p>
        </div>
        <div className="negotiation-opportunity__mini-legend">
          <span><Award size={14} /> best overall</span>
          <span><ShieldCheck size={14} /> safest history</span>
          <span><TrendingDown size={14} /> strongest discount path</span>
        </div>
      </div>

      <div className="negotiation-opportunity__playbook-grid">
        <article className="negotiation-opportunity__playbook-card">
          <div className="negotiation-opportunity__playbook-icon"><Sparkles size={18} /></div>
          <h3>Best overall buy</h3>
          <strong>{bestRow.dealer.name}</strong>
          <p>{bestRow.vehicle.trim} at {formatPrice(bestRow.vehicle.price)}</p>
          <TrustBadgeRow flags={bestRow.trustFlags} />
          <ul>
            <li>{bestRow.vehicle.daysOnLot} days on lot gives you leverage.</li>
            <li>{formatSignedCurrency(bestRow.priceGap)} versus the local average.</li>
          </ul>
        </article>

        <article className="negotiation-opportunity__playbook-card">
          <div className="negotiation-opportunity__playbook-icon"><ShieldCheck size={18} /></div>
          <h3>Safest history</h3>
          <strong>{safestRow.dealer.name}</strong>
          <p>{safestRow.vehicle.trim} at {formatPrice(safestRow.vehicle.price)}</p>
          <TrustBadgeRow flags={safestRow.trustFlags} />
          <ul>
            <li>{getHistoryLabel(safestRow.historyScore)} with a {safestRow.historyScore}/100 history score.</li>
            <li>Lead with title, ownership, and accident verification.</li>
          </ul>
        </article>

        <article className="negotiation-opportunity__playbook-card">
          <div className="negotiation-opportunity__playbook-icon"><TrendingDown size={18} /></div>
          <h3>Strongest pressure point</h3>
          <strong>{biggestDropRow.dealer.name}</strong>
          <p>{biggestDropRow.vehicle.trim} at {formatPrice(biggestDropRow.vehicle.price)}</p>
          <TrustBadgeRow flags={biggestDropRow.trustFlags} />
          <ul>
            <li>{biggestDropRow.vehicle.recentPriceDropAmount ? `${formatPrice(biggestDropRow.vehicle.recentPriceDropAmount)} recent price drop.` : 'No recent price cut, so use lot age instead.'}</li>
            <li>{biggestDropRow.vehicle.daysOnLot} days on lot keeps pressure on.</li>
          </ul>
        </article>
      </div>

      <div className="negotiation-opportunity__checklist">
        <h3>Quick negotiation checklist</h3>
        <div className="negotiation-opportunity__checklist-grid">
          <div><UserRound size={16} /> Confirm one-owner and personal-use history when available.</div>
          <div><ShieldCheck size={16} /> Ask for proof of no-accident and clean-title claims.</div>
          <div><CircleDollarSign size={16} /> Anchor against the cheapest comp and the market median.</div>
          <div><Clock3 size={16} /> Use lot age and recent drops to justify your target number.</div>
          <div><Wrench size={16} /> Favor service-rich units if the buyer plans long-term ownership.</div>
          <div><AlertTriangle size={16} /> Treat rebuilt, rental, or fleet-history units as discount-only plays.</div>
        </div>
      </div>

      {renderModuleFooter('Use the playbook when a buyer needs a recommendation, not just analysis. Pick the lane first: best overall, safest history, or strongest leverage. Then tailor the dealer conversation around that goal.')}
    </>
  );

  const renderCurrentView = () => {
    switch (activeView) {
      case 'classic':
        return renderClassicView();
      case 'market-brief':
        return renderMarketBriefView();
      case 'trust-check':
        return renderTrustCheckView();
      case 'price-ladder':
        return renderPriceLadderView();
      case 'leverage-map':
        return renderLeverageMapView();
      case 'dealer-scoreboard':
        return renderDealerScoreboardView();
      case 'buyer-playbook':
        return renderBuyerPlaybookView();
      default:
        return renderMarketBriefView();
    }
  };

  return (
    <div className={`negotiation-opportunity-shell ${enableVariantExplorer ? 'negotiation-opportunity-shell--explorer' : ''}`}>
      {enableVariantExplorer && (
        <div className="negotiation-opportunity__explorer-nav">
          <div className="negotiation-opportunity__explorer-copy">
            <div>
              <p className="negotiation-opportunity__explorer-label">Vehicle market intelligence</p>
              <h3 className="negotiation-opportunity__explorer-title">Compare six buying lenses</h3>
            </div>
            <p className="negotiation-opportunity__explorer-note">{getViewIntro(activeView)}</p>
          </div>
          <div className="negotiation-opportunity__explorer-tabs">
            <Tabs
              items={explorerItems}
              value={selectedView}
              onChange={(value) => setSelectedView(value as ExplorerView)}
              variant="underline"
              ariaLabel="Vehicle market intelligence views"
            />
          </div>
          <label className="negotiation-opportunity__explorer-select">
            <span>Current view</span>
            <select value={selectedView} onChange={(event) => setSelectedView(event.target.value as ExplorerView)}>
              {explorerItems.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      )}

      <section
        className={`negotiation-opportunity ${activeView !== 'classic' ? 'negotiation-opportunity--option-b' : ''} negotiation-opportunity--${activeView}`}
        aria-labelledby="negotiation-opportunity-title"
      >
        {renderCurrentView()}
      </section>
    </div>
  );
};

export default NegotiationOpportunity;
