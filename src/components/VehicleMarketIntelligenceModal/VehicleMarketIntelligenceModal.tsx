import { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import {
  ArrowUpRight,
  Bookmark,
  CalendarClock,
  Gauge,
  LineChart,
  MapPin,
  Sparkles,
  Target,
  TrendingDown,
  TrendingUp,
  X,
} from 'lucide-react';
import { Badge } from '../Badge';
import { Button } from '../Button';
import { OptimizedImage } from '../OptimizedImage';
import {
  formatDistance,
  formatPrice,
  getDealersForVehicle,
  type DealerWithScore,
  type VehicleInventoryItem,
} from '../../services/dealerService';
import { getCompetitorVehicles, type Vehicle as VehicleRecord } from '../../services/vehicleService';
import './VehicleMarketIntelligenceModal.css';

type TrendDirection = 'up' | 'down' | 'flat';
type MarketWindow = '30d' | '90d' | '12m';
type DealerSort = 'deal' | 'price' | 'distance' | 'inventory' | 'days' | 'negotiation';
type DealerFilter = 'all' | 'best' | 'price' | 'negotiation';

interface VehicleMarketIntelligenceModalProps {
  isOpen: boolean;
  onClose: () => void;
  vehicle: VehicleRecord;
  rating: number;
  initialLocation?: { lat: number; lng: number };
}

interface DealerInsight {
  dealer: DealerWithScore;
  vehicle: VehicleInventoryItem;
  dealScore: number;
  negotiationPotential: number;
  offerStrength: 'Strong' | 'Competitive' | 'Monitor';
  savingsVsMarket: number;
}

interface KpiCardData {
  label: string;
  value: string;
  comparison: string;
  trend: TrendDirection;
  sparkline: number[];
}

interface TimelineMetric {
  label: string;
  series: number[];
  trend: TrendDirection;
  insight: string;
}

const windowOptions: { value: MarketWindow; label: string }[] = [
  { value: '30d', label: '30 days' },
  { value: '90d', label: '90 days' },
  { value: '12m', label: '12 months' },
];

const dealerSortOptions: { value: DealerSort; label: string }[] = [
  { value: 'deal', label: 'Deal score' },
  { value: 'price', label: 'Lowest price' },
  { value: 'distance', label: 'Closest dealer' },
  { value: 'inventory', label: 'Most inventory' },
  { value: 'days', label: 'Most days on lot' },
  { value: 'negotiation', label: 'Negotiation potential' },
];

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

const formatSignedCurrency = (value: number) => `${value >= 0 ? '+' : '-'}${formatPrice(Math.abs(value))}`;

const formatPercent = (value: number) => `${value > 0 ? '+' : ''}${value.toFixed(1)}%`;

const scoreToGrade = (score: number) => {
  if (score >= 92) return 'A+';
  if (score >= 86) return 'A';
  if (score >= 80) return 'B+';
  if (score >= 72) return 'B';
  if (score >= 64) return 'C';
  if (score >= 56) return 'D';
  return 'F';
};

const getBuyerPowerLabel = (score: number) => {
  if (score >= 76) return 'Strong';
  if (score >= 60) return 'Moderate';
  return 'Weak';
};

const getMarketStatus = (score: number, inventoryTrend: number, demandTrend: number) => {
  if (score >= 82 && inventoryTrend >= 6) return 'Buy Now';
  if (demandTrend >= 7 && inventoryTrend < 0) return 'High Demand';
  if (inventoryTrend >= 10) return 'Inventory Rising';
  return 'Wait';
};

const getTrendDirection = (value: number): TrendDirection => {
  if (value > 0.75) return 'up';
  if (value < -0.75) return 'down';
  return 'flat';
};

const getOfferStrength = (dealScore: number, savingsVsMarket: number): DealerInsight['offerStrength'] => {
  if (dealScore >= 84 || savingsVsMarket >= 1500) return 'Strong';
  if (dealScore >= 68 || savingsVsMarket >= 500) return 'Competitive';
  return 'Monitor';
};

const Sparkline = ({ values }: { values: number[] }) => {
  const max = Math.max(...values);
  const min = Math.min(...values);
  const range = Math.max(max - min, 1);
  const points = values
    .map((value, index) => {
      const x = (index / Math.max(values.length - 1, 1)) * 100;
      const y = 100 - ((value - min) / range) * 100;
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <svg className="market-intelligence-modal__sparkline" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
      <polyline fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" points={points} />
    </svg>
  );
};

const ProgressTrack = ({
  value,
  max = 100,
  tone = 'green',
}: {
  value: number;
  max?: number;
  tone?: 'green' | 'blue' | 'dark' | 'neutral';
}) => (
  <div className="market-intelligence-modal__progress-track">
    <div
      className={`market-intelligence-modal__progress-fill market-intelligence-modal__progress-fill--${tone}`}
      style={{ width: `${clamp((value / max) * 100, 0, 100)}%` }}
    />
  </div>
);

const getBestInventoryUnit = (dealer: DealerWithScore, year: number, make: string, model: string) => {
  const match = dealer.inventory
    .filter((item) => item.year === year && item.make === make && item.model === model)
    .sort((a, b) => {
      const priceDelta = a.price - b.price;
      if (priceDelta !== 0) return priceDelta;
      return (b.daysOnLot ?? 0) - (a.daysOnLot ?? 0);
    })[0];

  return match ?? dealer.inventory[0];
};

const buildSeries = (base: number, deltas: number[]) => deltas.map((delta) => Math.max(0, Math.round(base * (1 + delta))));

const VehicleMarketIntelligenceModal = ({
  isOpen,
  onClose,
  vehicle,
  rating,
  initialLocation = { lat: 34.0522, lng: -118.2437 },
}: VehicleMarketIntelligenceModalProps) => {
  const [marketWindow, setMarketWindow] = useState<MarketWindow>('90d');
  const [dealerSort, setDealerSort] = useState<DealerSort>('deal');
  const [dealerFilter, setDealerFilter] = useState<DealerFilter>('all');

  useEffect(() => {
    if (!isOpen) return undefined;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  const marketData = useMemo(() => {
    const year = parseInt(vehicle.year, 10);
    const dealers = getDealersForVehicle(
      vehicle.make,
      vehicle.model,
      initialLocation.lat,
      initialLocation.lng,
      vehicle.priceMin,
      100,
      vehicle.priceMin,
      vehicle.priceMax,
      year
    );

    const dealerInsights: DealerInsight[] = dealers
      .map((dealer) => {
        const unit = getBestInventoryUnit(dealer, year, vehicle.make, vehicle.model);
        if (!unit) return null;

        const marketAverage = (vehicle.priceMin + vehicle.priceMax) / 2;
        const savingsVsMarket = Math.round(marketAverage - unit.price);
        const daysOnLot = unit.daysOnLot ?? 0;
        const negotiationPotential = clamp(
          Math.round(42 + daysOnLot * 0.32 + Math.max(0, savingsVsMarket) / 180 + dealer.inventoryCount * 1.8),
          24,
          96
        );
        const dealScore = clamp(
          Math.round(
            52 +
              Math.max(0, savingsVsMarket) / 130 +
              Math.max(0, 90 - Math.abs((dealer.distance ?? 0) - 22)) * 0.08 +
              daysOnLot * 0.2 +
              dealer.rating * 3.2
          ),
          38,
          100
        );

        return {
          dealer,
          vehicle: unit,
          dealScore,
          negotiationPotential,
          offerStrength: getOfferStrength(dealScore, savingsVsMarket),
          savingsVsMarket,
        };
      })
      .filter((row): row is DealerInsight => row !== null);

    const sortedByPrice = [...dealerInsights].sort((a, b) => a.vehicle.price - b.vehicle.price);
    const sortedByDeal = [...dealerInsights].sort((a, b) => b.dealScore - a.dealScore);
    const sortedByNegotiation = [...dealerInsights].sort((a, b) => b.negotiationPotential - a.negotiationPotential);
    const bestDeal = sortedByDeal[0];
    const bestPrice = sortedByPrice[0];
    const bestNegotiation = sortedByNegotiation[0];
    const averageAskingPrice = Math.round(
      dealerInsights.reduce((sum, row) => sum + row.vehicle.price, 0) / Math.max(dealerInsights.length, 1)
    );
    const avgDaysOnLot = Math.round(
      dealerInsights.reduce((sum, row) => sum + (row.vehicle.daysOnLot ?? 0), 0) / Math.max(dealerInsights.length, 1)
    );
    const localInventory = dealerInsights.reduce((sum, row) => sum + row.dealer.inventoryCount, 0);
    const nationalInventory = Math.round(localInventory * 26.5);
    const inventoryTrend = clamp(Math.round((localInventory / Math.max(dealerInsights.length, 1)) * 1.8), -2, 18);
    const demandTrend = clamp(Math.round((rating - 7.6) * 7.5), -4, 12);
    const priceTrend = Number((-(Math.max(0, averageAskingPrice - vehicle.priceMin) / vehicle.priceMin) * 5.8).toFixed(1));
    const daysTrend = Number((avgDaysOnLot / 60 - 1.2).toFixed(1));
    const fairPurchasePrice = Math.round((averageAskingPrice + bestPrice.vehicle.price) / 2);
    const targetNegotiationPrice = Math.max(bestPrice.vehicle.price - 650, fairPurchasePrice - 900);
    const invoicePrice = Math.round(vehicle.priceMin * 0.94);
    const dealScore = clamp(
      Math.round(
        58 +
          Math.max(0, averageAskingPrice - bestPrice.vehicle.price) / 150 +
          inventoryTrend * 1.6 -
          demandTrend * 0.7 +
          avgDaysOnLot * 0.18
      ),
      44,
      99
    );
    const opportunityScore = clamp(Math.round((dealScore + bestNegotiation.negotiationPotential + rating * 9) / 3), 46, 98);
    const confidenceScore = clamp(Math.round((dealScore * 0.45 + rating * 8 + inventoryTrend * 1.5) / 1.35), 52, 96);
    const expectedNegotiationLow = Math.max(400, Math.round((averageAskingPrice - targetNegotiationPrice) * 0.7));
    const expectedNegotiationHigh = Math.max(expectedNegotiationLow + 600, Math.round((averageAskingPrice - targetNegotiationPrice) * 1.3));
    const buyerPower = getBuyerPowerLabel(bestNegotiation.negotiationPotential);
    const marketStatus = getMarketStatus(opportunityScore, inventoryTrend, demandTrend);

    const sparkTemplate = {
      '30d': [-0.01, 0, 0.015, 0.024, 0.04, 0.055],
      '90d': [-0.06, -0.03, 0, 0.04, 0.09, 0.14],
      '12m': [-0.16, -0.1, -0.05, 0.02, 0.09, 0.17],
    } as const;

    const currentDeltas = sparkTemplate[marketWindow];

    const kpiCards: KpiCardData[] = [
      {
        label: 'MSRP',
        value: formatPrice(vehicle.priceMin),
        comparison: `${formatPercent(1.8)} vs last quarter`,
        trend: 'up',
        sparkline: buildSeries(vehicle.priceMin, currentDeltas.map((value) => value * 0.4)),
      },
      {
        label: 'Current market price',
        value: formatPrice(averageAskingPrice),
        comparison: `${formatPercent(priceTrend)} vs 90-day avg`,
        trend: getTrendDirection(priceTrend),
        sparkline: buildSeries(averageAskingPrice, currentDeltas.map((value) => value * -0.2)),
      },
      {
        label: 'Fair purchase price',
        value: formatPrice(fairPurchasePrice),
        comparison: `${formatSignedCurrency(averageAskingPrice - fairPurchasePrice)} under ask`,
        trend: 'down',
        sparkline: buildSeries(fairPurchasePrice, currentDeltas.map((value) => value * -0.18)),
      },
      {
        label: 'Average transaction',
        value: formatPrice(Math.round((fairPurchasePrice + targetNegotiationPrice) / 2)),
        comparison: 'Below current ask',
        trend: 'down',
        sparkline: buildSeries(Math.round((fairPurchasePrice + targetNegotiationPrice) / 2), currentDeltas.map((value) => value * -0.14)),
      },
      {
        label: 'Best available deal',
        value: formatPrice(bestPrice.vehicle.price),
        comparison: `${formatSignedCurrency(bestPrice.savingsVsMarket)} vs market`,
        trend: 'down',
        sparkline: buildSeries(bestPrice.vehicle.price, currentDeltas.map((value) => value * -0.1)),
      },
      {
        label: 'Local inventory',
        value: `${localInventory} units`,
        comparison: `${formatPercent(inventoryTrend)} in view`,
        trend: 'up',
        sparkline: buildSeries(localInventory, currentDeltas.map((value) => value * 0.8)),
      },
      {
        label: 'National inventory',
        value: `${nationalInventory} units`,
        comparison: 'Broad market supply rising',
        trend: 'up',
        sparkline: buildSeries(nationalInventory, currentDeltas.map((value) => value * 0.65)),
      },
      {
        label: 'Average days on lot',
        value: `${avgDaysOnLot} days`,
        comparison: `${formatPercent(daysTrend)} vs segment`,
        trend: getTrendDirection(daysTrend),
        sparkline: buildSeries(avgDaysOnLot, currentDeltas.map((value) => value * 0.5)),
      },
      {
        label: 'Demand score',
        value: `${clamp(Math.round(60 + demandTrend * 2.4 + rating * 2), 44, 94)}`,
        comparison: demandTrend > 0 ? 'Demand remains active' : 'Demand softening',
        trend: getTrendDirection(demandTrend),
        sparkline: buildSeries(clamp(Math.round(60 + demandTrend * 2.4 + rating * 2), 44, 94), currentDeltas.map((value) => value * 0.35)),
      },
    ];

    const timelineMetrics: TimelineMetric[] = [
      {
        label: 'Inventory trend',
        series: buildSeries(localInventory, currentDeltas.map((value) => value * 0.9)),
        trend: 'up',
        insight: 'Inventory is building faster than typical for this nameplate.',
      },
      {
        label: 'Demand trend',
        series: buildSeries(100, currentDeltas.map((value) => value * (demandTrend > 0 ? 0.35 : -0.25))),
        trend: getTrendDirection(demandTrend),
        insight: demandTrend > 0 ? 'Demand is still healthy, but not outrunning supply.' : 'Demand has cooled enough to create better pricing pressure.',
      },
      {
        label: 'Price trend',
        series: buildSeries(averageAskingPrice, currentDeltas.map((value) => value * -0.22)),
        trend: 'down',
        insight: 'Transaction pricing is drifting down as listings age.',
      },
      {
        label: 'Days on lot trend',
        series: buildSeries(avgDaysOnLot, currentDeltas.map((value) => value * 0.45)),
        trend: 'up',
        insight: 'More inventory is lingering, which helps buyers push on price.',
      },
    ];

    const competitorVehicles = getCompetitorVehicles(vehicle, 5);
    const competitorOwnershipCosts = competitorVehicles.map((candidate, index) => Math.round(candidate.priceMin * 0.17 + 4200 + index * 350));
    const lowestOwnershipCost = Math.min(...competitorOwnershipCosts);

    const alternatives = competitorVehicles.map((candidate, index) => {
      const valueScore = clamp(Math.round(candidate.staffRating * 8.4 + Math.max(0, vehicle.priceMin - candidate.priceMin) / 900), 52, 96);
      const ownershipCost = competitorOwnershipCosts[index];
      return {
        vehicle: candidate,
        dealScore: clamp(Math.round(candidate.staffRating * 9.2 - index * 3), 60, 94),
        valueScore,
        ownershipCost,
        highlight:
          index === 0
            ? 'Best Alternative'
            : index === 1
              ? 'Best Value'
              : ownershipCost === lowestOwnershipCost
                ? 'Lowest Ownership Cost'
                : undefined,
      };
    });

    return {
      dealerInsights,
      bestDeal,
      bestPrice,
      bestNegotiation,
      averageAskingPrice,
      avgDaysOnLot,
      localInventory,
      nationalInventory,
      inventoryTrend,
      demandTrend,
      priceTrend,
      fairPurchasePrice,
      targetNegotiationPrice,
      invoicePrice,
      dealScore,
      opportunityScore,
      confidenceScore,
      expectedNegotiationLow,
      expectedNegotiationHigh,
      buyerPower,
      marketStatus,
      kpiCards,
      timelineMetrics,
      alternatives,
      recommendation: `Buy ${marketStatus === 'Wait' ? 'selectively' : 'now'}. Inventory is ${inventoryTrend > 0 ? 'up' : 'flat'}, average asking prices are ${priceTrend < 0 ? 'sliding lower' : 'holding firm'}, and buyers currently have ${buyerPower.toLowerCase()} negotiating leverage.`,
      rationale:
        inventoryTrend > demandTrend
          ? 'Inventory is growing faster than demand, creating downward pressure on prices.'
          : 'Demand is still supporting pricing, so focus on the few dealers with aged inventory.',
    };
  }, [initialLocation.lat, initialLocation.lng, marketWindow, rating, vehicle]);

  const sortedDealers = useMemo(() => {
    const filtered = marketData.dealerInsights.filter((row) => {
      if (dealerFilter === 'best') return row.dealer.id === marketData.bestDeal.dealer.id;
      if (dealerFilter === 'price') return row.dealer.id === marketData.bestPrice.dealer.id || row.savingsVsMarket > 0;
      if (dealerFilter === 'negotiation') return row.negotiationPotential >= 72;
      return true;
    });

    return [...filtered].sort((a, b) => {
      switch (dealerSort) {
        case 'price':
          return a.vehicle.price - b.vehicle.price;
        case 'distance':
          return (a.dealer.distance ?? 0) - (b.dealer.distance ?? 0);
        case 'inventory':
          return b.dealer.inventoryCount - a.dealer.inventoryCount;
        case 'days':
          return (b.vehicle.daysOnLot ?? 0) - (a.vehicle.daysOnLot ?? 0);
        case 'negotiation':
          return b.negotiationPotential - a.negotiationPotential;
        case 'deal':
        default:
          return b.dealScore - a.dealScore;
      }
    });
  }, [dealerFilter, dealerSort, marketData]);

  const benchmarkRows = useMemo(
    () => [
      { label: 'Invoice price', value: marketData.invoicePrice, tone: 'dark' as const },
      { label: 'Fair purchase price', value: marketData.fairPurchasePrice, tone: 'blue' as const },
      { label: 'Market average', value: marketData.averageAskingPrice, tone: 'neutral' as const },
      { label: 'Current asking price', value: Math.max(...marketData.dealerInsights.map((row) => row.vehicle.price)), tone: 'neutral' as const },
      { label: 'Best local deal', value: marketData.bestPrice.vehicle.price, tone: 'green' as const },
      { label: 'Target negotiation price', value: marketData.targetNegotiationPrice, tone: 'green' as const },
    ],
    [marketData]
  );

  if (!isOpen) return null;

  return createPortal(
    <div className="market-intelligence-modal__overlay" onClick={onClose}>
      <div
        className="market-intelligence-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="market-intelligence-modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="market-intelligence-modal__header">
          <div className="market-intelligence-modal__hero">
            <OptimizedImage
              src={vehicle.image}
              alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
              aspectRatio="4 / 3"
              className="market-intelligence-modal__hero-image"
              wrapperClassName="market-intelligence-modal__hero-media"
            />
            <div className="market-intelligence-modal__hero-copy">
              <p className="market-intelligence-modal__eyebrow">Vehicle market intelligence</p>
              <h2 id="market-intelligence-modal-title" className="market-intelligence-modal__title">
                {vehicle.year} {vehicle.make} {vehicle.model}
              </h2>
              <p className="market-intelligence-modal__subhead">
                {vehicle.trim || vehicle.bodyStyle} · Current market price {formatPrice(marketData.averageAskingPrice)}
              </p>
              <div className="market-intelligence-modal__hero-badges">
                <Badge variant="dark">Opportunity {scoreToGrade(marketData.opportunityScore)}</Badge>
                <Badge variant="primary">Deal score {marketData.dealScore}</Badge>
                <Badge variant={marketData.buyerPower === 'Strong' ? 'success' : 'info'}>Buyer power {marketData.buyerPower}</Badge>
                <Badge variant="neutral">{marketData.marketStatus}</Badge>
              </div>
            </div>
          </div>
          <div className="market-intelligence-modal__header-actions">
            <div className="market-intelligence-modal__header-metrics">
              <div>
                <span>Market opportunity</span>
                <strong>{scoreToGrade(marketData.opportunityScore)}</strong>
              </div>
              <div>
                <span>Deal score</span>
                <strong>{marketData.dealScore}</strong>
              </div>
            </div>
            <div className="market-intelligence-modal__header-cta-row">
              <Button as="a" href="#market-intelligence-dealers" size="small">
                View Best Local Deals
              </Button>
              <Button as="a" href="#market-intelligence-alternatives" variant="outline" size="small">
                Compare Alternatives
              </Button>
            </div>
          </div>
          <button className="market-intelligence-modal__close" onClick={onClose} aria-label="Close market intelligence">
            <X size={20} />
          </button>
        </div>

        <div className="market-intelligence-modal__body">
          <section className="market-intelligence-modal__section">
            <div className="market-intelligence-modal__section-head">
              <div>
                <p className="market-intelligence-modal__section-kicker">Recommendation</p>
                <h3 className="market-intelligence-modal__section-title">Why this is a good deal</h3>
              </div>
            </div>
            <article className="market-intelligence-modal__intelligence-card">
              <div>
                <Badge variant="success">{marketData.marketStatus}</Badge>
                <p className="market-intelligence-modal__intelligence-copy">{marketData.recommendation}</p>
                <p className="market-intelligence-modal__intelligence-note">{marketData.rationale}</p>
              </div>
              <dl className="market-intelligence-modal__intelligence-metrics">
                <div>
                  <dt>Confidence score</dt>
                  <dd>{marketData.confidenceScore}/100</dd>
                </div>
                <div>
                  <dt>Potential savings</dt>
                  <dd>{formatPrice(Math.max(0, marketData.averageAskingPrice - marketData.bestPrice.vehicle.price))}</dd>
                </div>
                <div>
                  <dt>Negotiation range</dt>
                  <dd>{formatPrice(marketData.expectedNegotiationLow)} - {formatPrice(marketData.expectedNegotiationHigh)}</dd>
                </div>
              </dl>
            </article>
          </section>

          <section className="market-intelligence-modal__section">
            <div className="market-intelligence-modal__section-head">
              <div>
                <p className="market-intelligence-modal__section-kicker">Snapshot</p>
                <h3 className="market-intelligence-modal__section-title">Key pricing and supply signals</h3>
              </div>
            </div>
            <div className="market-intelligence-modal__kpi-grid">
              {marketData.kpiCards.map((card) => (
                <article key={card.label} className="market-intelligence-modal__kpi-card">
                  <div className="market-intelligence-modal__kpi-head">
                    <span>{card.label}</span>
                    <span className={`market-intelligence-modal__trend market-intelligence-modal__trend--${card.trend}`}>
                      {card.trend === 'up' ? <TrendingUp size={14} /> : card.trend === 'down' ? <TrendingDown size={14} /> : <LineChart size={14} />}
                    </span>
                  </div>
                  <strong>{card.value}</strong>
                  <p>{card.comparison}</p>
                  <Sparkline values={card.sparkline} />
                </article>
              ))}
            </div>
          </section>

          <section className="market-intelligence-modal__section">
            <div className="market-intelligence-modal__section-head">
              <div>
                <p className="market-intelligence-modal__section-kicker">Deal breakdown</p>
                <h3 className="market-intelligence-modal__section-title">Price ladder and benchmark positioning</h3>
              </div>
            </div>
            <div className="market-intelligence-modal__split">
              <div className="market-intelligence-modal__ladder">
                {benchmarkRows.map((row) => {
                  const maxValue = Math.max(...benchmarkRows.map((item) => item.value));
                  return (
                    <div key={row.label} className="market-intelligence-modal__ladder-row">
                      <div className="market-intelligence-modal__ladder-copy">
                        <strong>{row.label}</strong>
                        <span>{formatPrice(row.value)}</span>
                      </div>
                      <ProgressTrack value={row.value} max={maxValue} tone={row.tone} />
                    </div>
                  );
                })}
              </div>
              <div className="market-intelligence-modal__stack-card">
                <div className="market-intelligence-modal__callout">
                  <span>Potential savings</span>
                  <strong>{formatPrice(Math.max(0, marketData.averageAskingPrice - marketData.targetNegotiationPrice))}</strong>
                  <p>{formatSignedCurrency(marketData.averageAskingPrice - marketData.bestPrice.vehicle.price)} versus the market average.</p>
                </div>
                <div className="market-intelligence-modal__callout">
                  <span>Price position vs market</span>
                  <strong>{marketData.bestPrice.savingsVsMarket >= 0 ? 'Below market' : 'Above market'}</strong>
                  <p>Best live listing is {formatSignedCurrency(marketData.bestPrice.savingsVsMarket)} versus the current market baseline.</p>
                </div>
              </div>
            </div>
          </section>

          <section className="market-intelligence-modal__section" id="market-intelligence-dealers">
            <div className="market-intelligence-modal__section-head market-intelligence-modal__section-head--controls">
              <div>
                <p className="market-intelligence-modal__section-kicker">Dealer intelligence</p>
                <h3 className="market-intelligence-modal__section-title">Sortable dealer comparison</h3>
              </div>
              <div className="market-intelligence-modal__filters">
                <label>
                  <span>Sort</span>
                  <select value={dealerSort} onChange={(event) => setDealerSort(event.target.value as DealerSort)}>
                    {dealerSortOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </label>
                <div className="market-intelligence-modal__filter-chips">
                  <button type="button" className={dealerFilter === 'all' ? 'is-active' : ''} onClick={() => setDealerFilter('all')}>All</button>
                  <button type="button" className={dealerFilter === 'best' ? 'is-active' : ''} onClick={() => setDealerFilter('best')}>Best overall</button>
                  <button type="button" className={dealerFilter === 'price' ? 'is-active' : ''} onClick={() => setDealerFilter('price')}>Best price</button>
                  <button type="button" className={dealerFilter === 'negotiation' ? 'is-active' : ''} onClick={() => setDealerFilter('negotiation')}>Best negotiation</button>
                </div>
              </div>
            </div>
            <div className="market-intelligence-modal__table-wrap">
              <table className="market-intelligence-modal__table">
                <thead>
                  <tr>
                    <th>Dealer</th>
                    <th>Deal score</th>
                    <th>Price</th>
                    <th>Distance</th>
                    <th>Inventory</th>
                    <th>Days on lot</th>
                    <th>Negotiation</th>
                    <th>Offer strength</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedDealers.map((row) => (
                    <tr key={row.dealer.id}>
                      <td>
                        <div className="market-intelligence-modal__dealer-cell">
                          <strong>{row.dealer.name}</strong>
                          <span>{row.vehicle.trim} · {formatPrice(row.vehicle.price)}</span>
                          <div className="market-intelligence-modal__dealer-flags">
                            {row.dealer.id === marketData.bestDeal.dealer.id && <Badge variant="success">Best Overall Deal</Badge>}
                            {row.dealer.id === marketData.bestPrice.dealer.id && <Badge variant="primary">Best Price</Badge>}
                            {row.dealer.id === marketData.bestNegotiation.dealer.id && <Badge variant="info">Best Negotiation</Badge>}
                          </div>
                        </div>
                      </td>
                      <td>{row.dealScore}</td>
                      <td>{formatPrice(row.vehicle.price)}</td>
                      <td>{formatDistance(row.dealer.distance ?? 0)}</td>
                      <td>{row.dealer.inventoryCount}</td>
                      <td>{row.vehicle.daysOnLot ?? 0}</td>
                      <td>{row.negotiationPotential}</td>
                      <td><Badge variant={row.offerStrength === 'Strong' ? 'success' : row.offerStrength === 'Competitive' ? 'primary' : 'neutral'}>{row.offerStrength}</Badge></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="market-intelligence-modal__section">
            <div className="market-intelligence-modal__section-head market-intelligence-modal__section-head--controls">
              <div>
                <p className="market-intelligence-modal__section-kicker">Supply and demand</p>
                <h3 className="market-intelligence-modal__section-title">Trend pressure across the market</h3>
              </div>
              <div className="market-intelligence-modal__window-switch">
                {windowOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    className={marketWindow === option.value ? 'is-active' : ''}
                    onClick={() => setMarketWindow(option.value)}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="market-intelligence-modal__timeline-grid">
              {marketData.timelineMetrics.map((metric) => (
                <article key={metric.label} className="market-intelligence-modal__timeline-card">
                  <div className="market-intelligence-modal__timeline-head">
                    <strong>{metric.label}</strong>
                    <Badge variant={metric.trend === 'up' ? 'success' : metric.trend === 'down' ? 'info' : 'neutral'}>
                      {metric.trend === 'up' ? 'Rising' : metric.trend === 'down' ? 'Falling' : 'Flat'}
                    </Badge>
                  </div>
                  <Sparkline values={metric.series} />
                  <p>{metric.insight}</p>
                </article>
              ))}
            </div>
            <div className="market-intelligence-modal__insight-banner">
              <LineChart size={18} />
              <p>{marketData.rationale}</p>
            </div>
          </section>

          <section className="market-intelligence-modal__section">
            <div className="market-intelligence-modal__section-head">
              <div>
                <p className="market-intelligence-modal__section-kicker">Buying strategy</p>
                <h3 className="market-intelligence-modal__section-title">Actionable next moves</h3>
              </div>
            </div>
            <div className="market-intelligence-modal__strategy-grid">
              <article className="market-intelligence-modal__strategy-card">
                <CalendarClock size={18} />
                <strong>Best time to buy</strong>
                <p>Buy within the next 2-4 weeks while average lot age remains above {marketData.avgDaysOnLot} days.</p>
              </article>
              <article className="market-intelligence-modal__strategy-card">
                <MapPin size={18} />
                <strong>Best dealer to contact</strong>
                <p>{marketData.bestDeal.dealer.name} balances the strongest deal score with close-in inventory.</p>
              </article>
              <article className="market-intelligence-modal__strategy-card">
                <Target size={18} />
                <strong>Suggested opening offer</strong>
                <p>Open at {formatPrice(marketData.targetNegotiationPrice)} and anchor against the cheapest aged comp.</p>
              </article>
              <article className="market-intelligence-modal__strategy-card">
                <TrendingDown size={18} />
                <strong>Expected discount range</strong>
                <p>{formatPrice(marketData.expectedNegotiationLow)} to {formatPrice(marketData.expectedNegotiationHigh)} based on current aging and supply.</p>
              </article>
              <article className="market-intelligence-modal__strategy-card">
                <Gauge size={18} />
                <strong>Lease vs finance</strong>
                <p>{marketData.marketStatus === 'Buy Now' ? 'Finance is the stronger move while transaction pricing is softening.' : 'Lease if monthly payment matters more than locking in full value.'}</p>
              </article>
              <article className="market-intelligence-modal__strategy-card">
                <Sparkles size={18} />
                <strong>Trade-in timing</strong>
                <p>Negotiate the purchase first, then bring trade-in numbers in once the selling price is locked.</p>
              </article>
            </div>
          </section>

          <section className="market-intelligence-modal__section">
            <div className="market-intelligence-modal__section-head">
              <div>
                <p className="market-intelligence-modal__section-kicker">Negotiation toolkit</p>
                <h3 className="market-intelligence-modal__section-title">Numbers and talking points for the dealer conversation</h3>
              </div>
            </div>
            <div className="market-intelligence-modal__toolkit">
              <dl className="market-intelligence-modal__toolkit-metrics">
                <div>
                  <dt>Target purchase price</dt>
                  <dd>{formatPrice(marketData.targetNegotiationPrice)}</dd>
                </div>
                <div>
                  <dt>Walk-away price</dt>
                  <dd>{formatPrice(marketData.fairPurchasePrice + 350)}</dd>
                </div>
                <div>
                  <dt>Estimated dealer margin</dt>
                  <dd>{formatPrice(Math.max(500, marketData.bestDeal.vehicle.price - marketData.invoicePrice))}</dd>
                </div>
                <div>
                  <dt>Leverage score</dt>
                  <dd>{marketData.bestNegotiation.negotiationPotential}/100</dd>
                </div>
              </dl>
              <div className="market-intelligence-modal__toolkit-notes">
                <article>
                  <h4>Why you have leverage</h4>
                  <p>This vehicle has averaged {marketData.avgDaysOnLot} days on dealer lots, which increases buyer negotiating power.</p>
                </article>
                <article>
                  <h4>Opening line</h4>
                  <p>I am seeing comparable inventory near {formatPrice(marketData.bestPrice.vehicle.price)} and want to work from that market level.</p>
                </article>
                <article>
                  <h4>Fallback move</h4>
                  <p>If price does not move, ask for dealer-installed add-ons, rate support, or fee reductions tied to current inventory pressure.</p>
                </article>
              </div>
            </div>
          </section>

          <section className="market-intelligence-modal__section" id="market-intelligence-alternatives">
            <div className="market-intelligence-modal__section-head">
              <div>
                <p className="market-intelligence-modal__section-kicker">Alternatives</p>
                <h3 className="market-intelligence-modal__section-title">Comparable vehicles worth checking before you commit</h3>
              </div>
            </div>
            <div className="market-intelligence-modal__alternatives-row">
              {marketData.alternatives.map((item) => (
                <article key={item.vehicle.id} className="market-intelligence-modal__alternative-card">
                  <OptimizedImage
                    src={item.vehicle.image}
                    alt={`${item.vehicle.year} ${item.vehicle.make} ${item.vehicle.model}`}
                    aspectRatio="16 / 10"
                    className="market-intelligence-modal__alternative-image"
                    wrapperClassName="market-intelligence-modal__alternative-media"
                  />
                  <div className="market-intelligence-modal__alternative-body">
                    <div className="market-intelligence-modal__alternative-head">
                      <strong>{item.vehicle.year} {item.vehicle.make} {item.vehicle.model}</strong>
                      {item.highlight && <Badge variant="primary">{item.highlight}</Badge>}
                    </div>
                    <div className="market-intelligence-modal__alternative-metrics">
                      <span>Deal score {item.dealScore}</span>
                      <span>Value score {item.valueScore}</span>
                      <span>C/D {item.vehicle.staffRating.toFixed(1)}</span>
                    </div>
                    <dl>
                      <div>
                        <dt>Market price</dt>
                        <dd>{item.vehicle.priceRange}</dd>
                      </div>
                      <div>
                        <dt>Ownership cost</dt>
                        <dd>{formatPrice(item.ownershipCost)}</dd>
                      </div>
                    </dl>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>

        <div className="market-intelligence-modal__footer">
          <div className="market-intelligence-modal__footer-summary">
            <div>
              <span>Best available deal</span>
              <strong>{formatPrice(marketData.bestPrice.vehicle.price)}</strong>
            </div>
            <div>
              <span>Potential savings</span>
              <strong>{formatPrice(Math.max(0, marketData.averageAskingPrice - marketData.bestPrice.vehicle.price))}</strong>
            </div>
          </div>
          <div className="market-intelligence-modal__footer-actions">
            <Button as="a" href="#find-dealers" size="small">
              View Local Inventory
            </Button>
            <Button variant="outline" size="small">
              <Bookmark size={14} />
              Save Vehicle
            </Button>
            <Button as="a" href="#market-intelligence-alternatives" variant="ghost" size="small">
              Compare Alternatives
              <ArrowUpRight size={14} />
            </Button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default VehicleMarketIntelligenceModal;
