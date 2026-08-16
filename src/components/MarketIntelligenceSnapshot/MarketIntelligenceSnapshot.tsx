import { type CSSProperties, useEffect, useId, useMemo, useState } from 'react';
import { Badge } from '../Badge';
import { OptimizedImage } from '../OptimizedImage';
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

const DEALER_RADIUS_OPTIONS: DealerRadius[] = [10, 25, 50, 75];

interface MarketSignalBadge {
  label: string;
  variant: 'primary' | 'success' | 'info' | 'dark' | 'neutral';
}

interface FactorItem {
  label: string;
  value: string;
  tone?: 'success' | 'dark';
}

const formatMileageValue = (mileage?: number) =>
  mileage !== undefined ? `${mileage.toLocaleString()} mi` : 'New';

const formatCompactPrice = (price: number) => {
  const compactValue = price / 1000;
  const displayValue = compactValue >= 100 ? Math.round(compactValue).toString() : compactValue.toFixed(1);
  return `$${displayValue.replace(/\.0$/, '')}K`;
};

const isGoodOrGreatPrice = (match: MarketInventoryMatch, averagePrice: number) =>
  match.unit.price <= averagePrice * 0.985;

const isGreatPrice = (match: MarketInventoryMatch, averagePrice: number) =>
  match.unit.price <= averagePrice * 0.94;

const getVehicleYmm = (vehicle: Vehicle) => `${vehicle.year} ${vehicle.make} ${vehicle.model}`;

const getVehicleMatchTitle = ({ unit }: MarketInventoryMatch) =>
  `${unit.year} ${unit.make} ${unit.model} ${unit.trim}`.replace(/\s+/g, ' ').trim();

const getListingUrl = ({ unit }: MarketInventoryMatch) => {
  const params = new URLSearchParams({
    year: String(unit.year),
    make: unit.make,
    model: unit.model,
  });

  if (unit.isCertified) params.set('certified', 'true');

  return `https://www.caranddriver.com/cars-for-sale/${unit.isNew ? 'new' : 'used'}?${params.toString()}`;
};

const getVehicleSignalBadges = ({
  match,
  averagePrice,
  averageMileage,
}: {
  match: MarketInventoryMatch;
  averagePrice: number;
  averageMileage?: number;
}): MarketSignalBadge[] => {
  const badges: MarketSignalBadge[] = [];
  const daysOnLot = match.unit.daysOnLot ?? 0;
  const isUsedListing = !match.unit.isNew;

  if (isGreatPrice(match, averagePrice)) {
    badges.push({ label: 'Great Price', variant: 'success' });
  } else if (isGoodOrGreatPrice(match, averagePrice)) {
    badges.push({ label: 'Good Price', variant: 'success' });
  }

  if ((match.unit.recentPriceDropAmount ?? 0) > 0) {
    badges.push({ label: 'Price Drop', variant: 'primary' });
  }

  if (daysOnLot <= 30) {
    badges.push({ label: 'Newly Listed', variant: 'info' });
  }

  if (isUsedListing && match.unit.owners === 1) {
    badges.push({ label: 'One-Owner', variant: 'dark' });
  }

  if (
    isUsedListing &&
    averageMileage !== undefined &&
    (match.unit.mileage ?? Number.POSITIVE_INFINITY) < averageMileage
  ) {
    badges.push({ label: 'Low Mileage', variant: 'dark' });
  }

  if (isUsedListing && match.unit.carfaxScore) {
    badges.push({ label: 'Free History Report', variant: 'neutral' });
  }

  if (daysOnLot >= 50) {
    badges.push({ label: '50+ Days on Market', variant: 'neutral' });
  } else if (daysOnLot >= 40) {
    badges.push({ label: '40+ Days on Market', variant: 'neutral' });
  } else if (daysOnLot >= 30) {
    badges.push({ label: '30+ Days on Market', variant: 'neutral' });
  }

  return badges.slice(0, 4);
};

const getMatchScore = ({
  match,
  averagePrice,
  averageMileage,
  condition,
}: {
  match: MarketInventoryMatch;
  averagePrice: number;
  averageMileage?: number;
  condition: 'new' | 'used';
}) => {
  const daysOnLot = match.unit.daysOnLot ?? 0;
  let score = 68;

  if (isGreatPrice(match, averagePrice)) score += 13;
  else if (isGoodOrGreatPrice(match, averagePrice)) score += 9;

  if (condition === 'used') {
    if (match.unit.accidents === 0) score += 8;
    if (match.unit.owners === 1) score += 5;
    if (match.unit.carfaxScore) score += 4;
    if (averageMileage !== undefined && (match.unit.mileage ?? Number.POSITIVE_INFINITY) < averageMileage) score += 6;
  } else {
    if (daysOnLot >= 30) score += 6;
    if (daysOnLot <= 14) score += 4;
  }

  if ((match.unit.recentPriceDropAmount ?? 0) > 0) score += 3;
  return Math.min(score, 96);
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
      const bScore = getMatchScore({ match: b, averagePrice, averageMileage, condition });
      const aScore = getMatchScore({ match: a, averagePrice, averageMileage, condition });
      if (bScore !== aScore) return bScore - aScore;
      if (condition === 'used') {
        return (a.unit.mileage ?? Number.POSITIVE_INFINITY) - (b.unit.mileage ?? Number.POSITIVE_INFINITY);
      }
      return a.unit.price - b.unit.price;
    })
    .slice(0, 3);
};

const getRankedDisplayScore = (score: number, index: number) => {
  if (index === 0) return score;
  return Math.max(70, Math.min(score, 95 - index * 4));
};

const getPercentWithinRange = (value: number, low: number, high: number) => {
  if (high <= low) return 0;
  const percent = ((value - low) / (high - low)) * 100;
  return Math.min(100, Math.max(0, percent));
};

const getConditionLabel = (match: MarketInventoryMatch) => {
  if (match.unit.isNew) return 'New';
  if (match.unit.isCertified) return 'Certified used';
  return 'Used';
};

const MarketIntelligenceSnapshot = ({
  vehicle,
  location,
  radiusMiles,
  onLocationChange,
  onRadiusChange,
  onSeeLocalInventory,
}: MarketIntelligenceSnapshotProps) => {
  const zipErrorId = useId();
  const [zipCode, setZipCode] = useState(location.zipCode ?? '');
  const [zipError, setZipError] = useState('');

  useEffect(() => {
    setZipCode(location.zipCode ?? '');
    setZipError('');
  }, [location.zipCode]);

  const market = useMemo(
    () => getVehicleMarketInventory({ vehicle, location, radiusMiles }),
    [location, radiusMiles, vehicle]
  );
  const { statistics } = market;
  const isUsed = market.condition === 'used';
  const vehicleYmm = getVehicleYmm(vehicle);
  const locationLabel = location.zipCode ? `near ${location.zipCode}` : 'near you';
  const prioritizedMatches = getPrioritizedMatches({
    matches: market.matches,
    averagePrice: market.averagePrice,
    averageMileage: statistics.averageMileage,
    condition: market.condition,
  });
  const leadMatch = prioritizedMatches[0];
  const targetLow = Math.round((market.averagePrice * 0.94) / 100) * 100;
  const targetHigh = Math.round((market.averagePrice * 0.975) / 100) * 100;
  const askingPrice = leadMatch ? leadMatch.unit.price : market.averagePrice;
  const rangeLow = Math.min(targetLow * 0.93, askingPrice * 0.93);
  const rangeHigh = Math.max(targetHigh * 1.08, askingPrice * 1.08);
  const targetStart = getPercentWithinRange(targetLow, rangeLow, rangeHigh);
  const targetEnd = getPercentWithinRange(targetHigh, rangeLow, rangeHigh);
  const askingPosition = getPercentWithinRange(askingPrice, rangeLow, rangeHigh);
  const priceRangeStyle = {
    '--target-start': `${targetStart}%`,
    '--target-width': `${Math.max(8, targetEnd - targetStart)}%`,
    '--asking-position': `${askingPosition}%`,
  } as CSSProperties;
  const priceTrend = '-3.8% (30d)';
  const inventoryLabel = market.inventoryCount >= 24 ? 'High Supply' : market.inventoryCount >= 10 ? 'Moderate' : 'Limited';
  const demandLabel = market.averageDaysOnLot <= 22 ? 'High' : market.averageDaysOnLot >= 45 ? 'Soft' : 'Moderate';
  const priceAdvantage = targetHigh - askingPrice;
  const priceAdvantagePercent = priceAdvantage / askingPrice;
  const verdictCopy = priceAdvantage >= 750 || priceAdvantagePercent >= 0.04
    ? 'Buyer advantage - asking price is meaningfully below target'
    : priceAdvantage >= 0
      ? 'Fair deal - asking price is inside the target range'
      : 'Worth watching - compare price and local inventory';

  useEffect(() => {
    if (zipCode.length < 5) {
      setZipError('');
      return;
    }

    const nextLocation = resolveMarketLocationFromZip(zipCode);
    if (!nextLocation) {
      setZipError('Enter a supported 5-digit ZIP code.');
      return;
    }

    setZipError('');
    if (nextLocation.zipCode !== location.zipCode) {
      onLocationChange(nextLocation);
    }
  }, [location.zipCode, onLocationChange, zipCode]);

  const factors: FactorItem[] = [
    {
      label: 'Incentives',
      value: isUsed ? 'Price drops active' : '$1,250 Active',
      tone: 'success',
    },
    {
      label: 'Inventory',
      value: inventoryLabel,
      tone: inventoryLabel === 'High Supply' ? 'dark' : undefined,
    },
    {
      label: 'Price Trend',
      value: `Down ${priceTrend}`,
      tone: 'success',
    },
    {
      label: 'Demand',
      value: demandLabel,
    },
  ];

  return (
    <section
      id="market-intelligence-snapshot"
      className={`market-snapshot market-snapshot--${market.condition}`}
      aria-labelledby="market-snapshot-title"
    >
      <div className="market-snapshot__verdict">
        <span aria-hidden="true">★</span>
        <strong>{verdictCopy}</strong>
      </div>

      <div className="market-snapshot__inner">
        <header className="market-snapshot__header">
          <div className="market-snapshot__header-copy">
            <p className="market-snapshot__eyebrow">Smart Shopper Insights</p>
            <h2 id="market-snapshot-title">Market Evaluation &amp; Matches</h2>
            <p>
              Understand the local signals that matter most for the {vehicleYmm} {locationLabel}.
            </p>
          </div>

          <div className="market-snapshot__market-form">
            <div className="market-snapshot__field">
              <label htmlFor="market-snapshot-zip">ZIP code</label>
              <input
                id="market-snapshot-zip"
                value={zipCode}
                inputMode="numeric"
                autoComplete="postal-code"
                maxLength={5}
                pattern="[0-9]*"
                aria-invalid={zipError ? 'true' : undefined}
                aria-describedby={zipError ? zipErrorId : undefined}
                onChange={(event) => {
                  setZipCode(event.target.value.replace(/\D/g, '').slice(0, 5));
                  if (zipError) setZipError('');
                }}
              />
            </div>

            <div className="market-snapshot__field">
              <label htmlFor="market-snapshot-radius">Distance</label>
              <select
                id="market-snapshot-radius"
                value={radiusMiles}
                onChange={(event) => onRadiusChange(Number(event.target.value) as DealerRadius)}
              >
                {DEALER_RADIUS_OPTIONS.map((radius) => (
                  <option key={radius} value={radius}>
                    {radius} miles
                  </option>
                ))}
              </select>
            </div>

            {zipError && (
              <p id={zipErrorId} className="market-snapshot__error" role="alert">
                {zipError}
              </p>
            )}
          </div>
        </header>

        <section
          className="market-snapshot__price-range"
          aria-label={`Target price range ${formatPrice(targetLow)} to ${formatPrice(targetHigh)}, asking price ${formatPrice(askingPrice)}`}
          style={priceRangeStyle}
        >
          <div className="market-snapshot__price-range-head">
            <strong>Target: {formatCompactPrice(targetLow)} - {formatCompactPrice(targetHigh)}</strong>
            <strong>Asking: {formatCompactPrice(askingPrice)}</strong>
          </div>
          <div className="market-snapshot__price-bar" aria-hidden="true">
            <span className="market-snapshot__price-bar-track" />
            <span className="market-snapshot__price-bar-target" />
            <span className="market-snapshot__price-bar-marker" />
          </div>
          <div className="market-snapshot__price-range-labels">
            <span>Fair Deal</span>
            <span>Excellent Target Range</span>
            <span>Over Asking Range</span>
          </div>
        </section>

        <section className="market-snapshot__factors" aria-labelledby="market-snapshot-factors-title">
          <h3 id="market-snapshot-factors-title">Market Factors Evaluation</h3>
          <div className="market-snapshot__factor-grid">
            {factors.map((factor) => (
              <div key={factor.label} className="market-snapshot__factor">
                <span>{factor.label}</span>
                <strong className={factor.tone ? `market-snapshot__factor-value--${factor.tone}` : undefined}>
                  {factor.value}
                </strong>
              </div>
            ))}
          </div>
        </section>

        {prioritizedMatches.length > 0 ? (
          <section className="market-snapshot__matches" aria-labelledby="market-snapshot-matches-title">
            <div className="market-snapshot__matches-head">
              <p className="market-snapshot__section-kicker">Recommended First</p>
              <h3 id="market-snapshot-matches-title">Best balance of clean history, mileage, and price.</h3>
              <p>
                Showcasing the lead recommendation matching your criteria with the highest target value score.
                Comparison units are provided below.
              </p>
            </div>

            <div className="market-snapshot__vehicle-picks" role="list">
              {prioritizedMatches.map((match, index) => {
                const signalBadges = getVehicleSignalBadges({
                  match,
                  averagePrice: market.averagePrice,
                  averageMileage: statistics.averageMileage,
                });
                const vehicleTitle = `${match.unit.year} ${match.unit.make} ${match.unit.model}`;
                const trimLabel = match.unit.trim.replace(vehicleTitle, '').trim();
                const matchScore = getMatchScore({
                  match,
                  averagePrice: market.averagePrice,
                  averageMileage: statistics.averageMileage,
                  condition: market.condition,
                });
                const displayMatchScore = getRankedDisplayScore(matchScore, index);

                return (
                  <article
                    key={`${match.dealer.id}-${match.unit.year}-${match.unit.trim}-${match.unit.price}`}
                    className={`market-snapshot__vehicle-pick ${index === 0 ? 'market-snapshot__vehicle-pick--lead' : ''}`}
                    role="listitem"
                  >
                    <a
                      className="market-snapshot__vehicle-pick-media-link"
                      href={getListingUrl(match)}
                      aria-label={`View listing for ${getVehicleMatchTitle(match)}`}
                    >
                      <OptimizedImage
                        src={vehicle.image}
                        alt={getVehicleMatchTitle(match)}
                        aspectRatio="4/3"
                        wrapperClassName="market-snapshot__vehicle-pick-media"
                      />
                      {index === 0 && <span className="market-snapshot__best-match">Best Match</span>}
                    </a>

                    <div className="market-snapshot__vehicle-pick-body">
                      <div className="market-snapshot__vehicle-pick-topline">
                        <span>{displayMatchScore} Match Score</span>
                        <strong>{formatPrice(match.unit.price)}</strong>
                      </div>

                      <div className="market-snapshot__vehicle-pick-title">
                        <h4>{vehicleTitle}{trimLabel ? ` ${trimLabel}` : ''}</h4>
                      </div>

                      <dl className="market-snapshot__vehicle-pick-metrics">
                        <div>
                          <dt>Mileage</dt>
                          <dd>{formatMileageValue(match.unit.mileage)}</dd>
                        </div>
                        <div>
                          <dt>Dealer</dt>
                          <dd>{match.dealer.name}</dd>
                        </div>
                        <div>
                          <dt>Distance</dt>
                          <dd>{match.dealer.distance !== undefined ? `${match.dealer.distance.toFixed(1)} mi` : 'Unavailable'}</dd>
                        </div>
                        <div>
                          <dt>Days on Lot</dt>
                          <dd>{match.unit.daysOnLot !== undefined ? `${match.unit.daysOnLot} days` : 'Unavailable'}</dd>
                        </div>
                      </dl>

                      <div className="market-snapshot__vehicle-pick-footer">
                        <div className="market-snapshot__vehicle-pick-badges" aria-label="Vehicle signals">
                          <Badge variant={match.unit.isNew ? 'info' : 'neutral'}>{getConditionLabel(match)}</Badge>
                          {signalBadges.map((badge) => (
                            <Badge key={badge.label} variant={badge.variant}>
                              {badge.label}
                            </Badge>
                          ))}
                        </div>
                        <a className="market-snapshot__vehicle-pick-cta" href={getListingUrl(match)}>
                          View Listing
                        </a>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            <button type="button" className="market-snapshot__all-results" onClick={onSeeLocalInventory}>
              See all local matches
            </button>
          </section>
        ) : (
          <article className="market-snapshot__empty">
            <h3>No matching vehicles in this distance</h3>
            <p>Try a wider search radius or another market to see comparable local listings.</p>
          </article>
        )}

        <p className="market-snapshot__methodology">
          Estimated from modeled listings for this vehicle and selected area. Prices exclude taxes and fees; availability may change.
        </p>
      </div>
    </section>
  );
};

export default MarketIntelligenceSnapshot;
