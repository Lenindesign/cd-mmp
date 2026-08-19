import { type CSSProperties, useEffect, useId, useMemo, useRef, useState } from 'react';
import { Info } from 'lucide-react';
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
  description: string;
  help: {
    why: string;
    action: string;
  };
  tone?: 'success' | 'dark';
  nowrap?: boolean;
}

interface ZipInputState {
  sourceZipCode: string;
  value: string;
  error: string;
}

interface PriceAssessment {
  label: 'Great Price' | 'Good Price' | 'Fair Market Price' | 'Over Market';
  copy: string;
  tone: 'opportunity' | 'market' | 'over';
}

interface BuyerGuidance {
  targetCopy: string;
  closeCopy: string;
  position: 'Strong' | 'Moderate' | 'Limited';
  positionCopy: string;
  openingOffer?: string;
}

type LocalDealSort = 'value' | 'price' | 'discount';

const LOCAL_DEAL_ALL_TRIMS = 'all';

const formatMileageValue = (mileage?: number) =>
  mileage !== undefined ? `${mileage.toLocaleString()} mi` : 'New';

const formatPriceDelta = (amount: number) =>
  formatPrice(Math.round(amount / 100) * 100);

const formatPriceRange = (low: number, high: number) =>
  low === high ? formatPrice(low) : `${formatPrice(low)}-${formatPrice(high)}`;

const normalizeTrim = (trim?: string) =>
  (trim ?? '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();

const getMatchTrimLabel = (match: MarketInventoryMatch) => {
  const vehicleTitle = `${match.unit.year} ${match.unit.make} ${match.unit.model}`;
  return match.unit.trim.replace(vehicleTitle, '').replace(/\s+/g, ' ').trim();
};

const getDisplayMsrp = (match: MarketInventoryMatch) =>
  match.unit.msrp ?? match.unit.price;

const getMsrpDifference = (match: MarketInventoryMatch) =>
  getDisplayMsrp(match) - match.unit.price;

const getMsrpDifferenceCopy = (difference: number) => {
  if (difference > 0) return `${formatPrice(difference)} off`;
  if (difference < 0) return `${formatPrice(Math.abs(difference))} over`;
  return 'At MSRP';
};

const isGoodOrGreatPrice = (match: MarketInventoryMatch, averagePrice: number) =>
  match.unit.price <= averagePrice * 0.985;

const isGreatPrice = (match: MarketInventoryMatch, averagePrice: number) =>
  match.unit.price <= averagePrice * 0.94;

const getVehicleMatchTitle = ({ unit }: MarketInventoryMatch) =>
  `${unit.year} ${unit.make} ${unit.model} ${unit.trim}`.replace(/\s+/g, ' ').trim();

const getPriceAssessment = ({
  askingPrice,
  targetLow,
  targetHigh,
}: {
  askingPrice: number;
  targetLow: number;
  targetHigh: number;
}): PriceAssessment => {
  const amountBelowTarget = Math.max(0, targetLow - askingPrice);
  const amountOverTarget = Math.max(0, askingPrice - targetHigh);
  const isInsideTargetRange = askingPrice >= targetLow && askingPrice <= targetHigh;
  const priceAdvantagePercent = amountBelowTarget / askingPrice;

  if (amountBelowTarget >= 750 || priceAdvantagePercent >= 0.04) {
    return {
      label: 'Great Price',
      copy: `About ${formatPriceDelta(amountBelowTarget)} below fair market value`,
      tone: 'opportunity',
    };
  }

  if (amountBelowTarget > 0) {
    return {
      label: 'Good Price',
      copy: `About ${formatPriceDelta(amountBelowTarget)} below fair market value`,
      tone: 'opportunity',
    };
  }

  if (isInsideTargetRange) {
    return {
      label: 'Fair Market Price',
      copy: 'Inside fair market range',
      tone: 'market',
    };
  }

  return {
    label: 'Over Market',
    copy: `About ${formatPriceDelta(amountOverTarget)} above fair market value`,
    tone: 'over',
  };
};

const getPriceRelationshipCopy = ({
  askingPrice,
  targetLow,
  targetHigh,
}: {
  askingPrice: number;
  targetLow: number;
  targetHigh: number;
}) => {
  if (askingPrice < targetLow) {
    return `${formatPrice(targetLow - askingPrice)} below the low end of fair market`;
  }

  if (askingPrice <= targetHigh) {
    return 'Inside the estimated fair market range';
  }

  return `${formatPrice(askingPrice - targetHigh)} above the high end of fair market`;
};

const getPricePositionFactorCopy = ({
  askingPrice,
  targetLow,
  targetHigh,
}: {
  askingPrice: number;
  targetLow: number;
  targetHigh: number;
}) => {
  if (askingPrice < targetLow) {
    return `${formatPriceDelta(targetLow - askingPrice)} below market`;
  }

  if (askingPrice <= targetHigh) {
    return 'In fair market';
  }

  return `${formatPriceDelta(askingPrice - targetHigh)} over market`;
};

const getPricePositionTone = ({
  askingPrice,
  targetHigh,
}: {
  askingPrice: number;
  targetHigh: number;
}): FactorItem['tone'] => {
  if (askingPrice <= targetHigh) return 'success';
  return undefined;
};

const getPricePositionSignalCopy = ({
  askingPrice,
  targetLow,
  targetHigh,
}: {
  askingPrice: number;
  targetLow: number;
  targetHigh: number;
}) => {
  if (askingPrice < targetLow) return 'Good for buyers';
  if (askingPrice <= targetHigh) return 'Normal price';
  return 'Priced high';
};

const getInventorySignalCopy = (inventoryCount: number) => {
  if (inventoryCount >= 24) return 'Strong selection';
  if (inventoryCount >= 10) return 'Healthy selection';
  return 'Limited choices';
};

const getDaysOnLotSignalCopy = (daysOnLot: number) => {
  if (daysOnLot >= 60) return 'Aged inventory';
  if (daysOnLot >= 30) return 'Normal timing';
  return 'Fresh inventory';
};

const getBottomLineCopy = (assessment: PriceAssessment, hasHistoryRisk: boolean) => {
  if (assessment.label === 'Great Price') {
    if (hasHistoryRisk) {
      return 'Bottom line: The price is strong, but check the vehicle history before treating it as a good buy.';
    }

    return 'Bottom line: This looks like a good buy at the current asking price.';
  }

  if (assessment.label === 'Good Price') {
    if (hasHistoryRisk) {
      return 'Bottom line: This is priced well, but the history should drive the final decision.';
    }

    return 'Bottom line: This is priced better than similar local listings.';
  }

  if (assessment.label === 'Fair Market Price') {
    return 'Bottom line: This price is in line with the local market.';
  }

  return 'Bottom line: This is above market, so compare carefully and negotiate.';
};

const getBuyerGuidance = ({
  askingPrice,
  targetLow,
  targetHigh,
  priceAssessment,
  negotiationLeverage,
}: {
  askingPrice: number;
  targetLow: number;
  targetHigh: number;
  priceAssessment: PriceAssessment;
  negotiationLeverage: 'High' | 'Moderate' | 'Low';
}): BuyerGuidance => {
  const targetMidpoint = Math.round(((targetLow + targetHigh) / 2) / 100) * 100;

  if (priceAssessment.tone === 'opportunity') {
    return {
      targetCopy: `At or below ${formatPrice(askingPrice)}`,
      closeCopy: `I'd aim to close around ${formatPrice(askingPrice)}. It is already below fair market.`,
      position: negotiationLeverage === 'Low' ? 'Moderate' : 'Strong',
      positionCopy: 'The current price is already favorable. Ask the dealer to itemize the out-the-door price before you commit.',
    };
  }

  if (priceAssessment.tone === 'market') {
    return {
      targetCopy: formatPriceRange(targetLow, targetHigh),
      closeCopy: `I'd aim to stay near ${formatPrice(targetMidpoint)} or lower.`,
      position: negotiationLeverage === 'High' ? 'Strong' : 'Moderate',
      positionCopy: 'The asking price is fair, but local supply and lot age may still give you room to negotiate.',
      openingOffer: negotiationLeverage !== 'Low' ? formatPrice(targetLow) : undefined,
    };
  }

  return {
    targetCopy: formatPriceRange(targetLow, targetHigh),
    closeCopy: `I'd try to bring this closer to ${formatPrice(targetHigh)} before moving forward.`,
    position: negotiationLeverage === 'High' ? 'Moderate' : 'Limited',
    positionCopy: 'The asking price is above fair market, so use comparable listings as your negotiation anchor.',
    openingOffer: formatPrice(targetHigh),
  };
};

const getListingUrl = ({ unit }: MarketInventoryMatch) => {
  const params = new URLSearchParams({
    year: String(unit.year),
    make: unit.make,
    model: unit.model,
  });

  if (unit.isCertified) params.set('certified', 'true');

  return `https://www.caranddriver.com/cars-for-sale/${unit.isNew ? 'new' : 'used'}?${params.toString()}`;
};

const getLocalDealKey = ({ dealer, unit }: MarketInventoryMatch) =>
  [
    dealer.id,
    unit.year,
    unit.make,
    unit.model,
    unit.trim,
    unit.price,
    unit.msrp ?? 'msrp',
    dealer.distance ?? 'distance',
  ].join('-');

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

const getVehicleQualitySignals = ({
  match,
  averageMileage,
}: {
  match: MarketInventoryMatch;
  averageMileage?: number;
}) => {
  if (match.unit.isNew) {
    return [
      match.unit.daysOnLot !== undefined && match.unit.daysOnLot <= 14 ? 'New arrival' : null,
      (match.unit.recentPriceDropAmount ?? 0) > 0 ? 'Recent price drop' : null,
      match.unit.isCertified ? 'Certified' : null,
    ].filter(Boolean).slice(0, 3) as string[];
  }

  return [
    match.unit.accidents === 0 ? 'No accidents' : null,
    match.unit.owners === 1 ? 'One owner' : null,
    averageMileage !== undefined && (match.unit.mileage ?? Number.POSITIVE_INFINITY) < averageMileage
      ? 'Low mileage'
      : null,
    match.unit.titleStatus === 'Clean' ? 'Clean title' : null,
  ].filter(Boolean).slice(0, 3) as string[];
};

const getComparableFitLabel = ({
  match,
  leadMatch,
  vehicle,
  index,
}: {
  match: MarketInventoryMatch;
  leadMatch?: MarketInventoryMatch;
  vehicle: Vehicle;
  index: number;
}) => {
  const matchTrim = normalizeTrim(getMatchTrimLabel(match) || match.unit.trim);
  const leadTrim = normalizeTrim(leadMatch ? getMatchTrimLabel(leadMatch) || leadMatch.unit.trim : vehicle.trim);
  const sameTrim = matchTrim !== '' && leadTrim !== '' && matchTrim === leadTrim;

  if (sameTrim && index === 0) return 'Same trim / closest match';
  if (sameTrim) return 'Same trim / strong match';
  return 'Similar trim / supporting match';
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
  limit = 3,
}: {
  matches: MarketInventoryMatch[];
  averagePrice: number;
  averageMileage?: number;
  condition: 'new' | 'used';
  limit?: number;
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
    .slice(0, limit);
};

const getRepresentativeChartMatches = ({
  matches,
  leadMatch,
  limit = 6,
}: {
  matches: MarketInventoryMatch[];
  leadMatch?: MarketInventoryMatch;
  limit?: number;
}) => {
  const sortedByPrice = [...matches].sort((a, b) => a.unit.price - b.unit.price);
  const selected = new Map<string, MarketInventoryMatch>();

  const addMatch = (match?: MarketInventoryMatch) => {
    if (!match) return;
    selected.set(getLocalDealKey(match), match);
  };

  addMatch(leadMatch);

  if (sortedByPrice.length <= limit) {
    sortedByPrice.forEach(addMatch);
    return Array.from(selected.values());
  }

  const sampleIndexes = [0, 0.25, 0.5, 0.75, 1]
    .map((step) => Math.round((sortedByPrice.length - 1) * step));

  sampleIndexes.forEach((index) => addMatch(sortedByPrice[index]));

  for (const match of sortedByPrice) {
    if (selected.size >= limit) break;
    addMatch(match);
  }

  return Array.from(selected.values()).slice(0, limit);
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

const getPriceBandTone = ({
  price,
  targetLow,
  targetHigh,
}: {
  price: number;
  targetLow: number;
  targetHigh: number;
}) => {
  if (price < targetLow) return 'great';
  if (price <= targetHigh) return 'fair';
  return 'above';
};

const getRecommendationSignals = ({
  match,
  averageMileage,
  demandLabel,
  inventoryLabel,
  isUsed,
}: {
  match?: MarketInventoryMatch;
  averageMileage?: number;
  demandLabel: string;
  inventoryLabel: string;
  isUsed: boolean;
}) => {
  if (!match) return ['local inventory benchmark'];

  const signals = [
    demandLabel === 'High' ? 'high demand' : null,
    inventoryLabel === 'Limited' ? 'limited local supply' : null,
    isUsed && match.unit.accidents === 0 ? 'no accidents' : null,
    isUsed && match.unit.owners === 1 ? 'one owner' : null,
    isUsed && averageMileage !== undefined && (match.unit.mileage ?? Number.POSITIVE_INFINITY) < averageMileage
      ? 'low mileage'
      : null,
    match.unit.daysOnLot !== undefined && match.unit.daysOnLot <= 14 ? 'newly listed' : null,
    (match.unit.recentPriceDropAmount ?? 0) > 0 ? 'recent price drop' : null,
  ].filter(Boolean) as string[];

  return signals.length > 0 ? signals.slice(0, 3) : ['local inventory benchmark'];
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
  const factorHelpId = useId();
  const currentLocationZipCode = location.zipCode ?? '';
  const [zipInput, setZipInput] = useState<ZipInputState>({
    sourceZipCode: currentLocationZipCode,
    value: currentLocationZipCode,
    error: '',
  });
  const [localDealSort, setLocalDealSort] = useState<LocalDealSort>('value');
  const [localDealTrimFilter, setLocalDealTrimFilter] = useState<string>('Base');
  const [activeLocalDealKey, setActiveLocalDealKey] = useState<string | null>(null);
  const activeLocalDealTimeoutRef = useRef<number | null>(null);
  const zipCode = zipInput.sourceZipCode === currentLocationZipCode ? zipInput.value : currentLocationZipCode;
  const zipError = zipInput.sourceZipCode === currentLocationZipCode ? zipInput.error : '';

  useEffect(() => () => {
    if (activeLocalDealTimeoutRef.current !== null) {
      window.clearTimeout(activeLocalDealTimeoutRef.current);
    }
  }, []);

  const showActiveLocalDeal = (localDealKey: string) => {
    if (activeLocalDealTimeoutRef.current !== null) {
      window.clearTimeout(activeLocalDealTimeoutRef.current);
      activeLocalDealTimeoutRef.current = null;
    }

    setActiveLocalDealKey(localDealKey);
  };

  const scheduleClearActiveLocalDeal = () => {
    if (activeLocalDealTimeoutRef.current !== null) {
      window.clearTimeout(activeLocalDealTimeoutRef.current);
    }

    activeLocalDealTimeoutRef.current = window.setTimeout(() => {
      setActiveLocalDealKey(null);
      activeLocalDealTimeoutRef.current = null;
    }, 220);
  };

  const market = useMemo(
    () => getVehicleMarketInventory({ vehicle, location, radiusMiles }),
    [location, radiusMiles, vehicle]
  );
  const tooltipGalleryImages = useMemo(() => {
    const images = [vehicle.image, ...(vehicle.galleryImages ?? [])].filter(Boolean);

    return Array.from(new Set(images));
  }, [vehicle.galleryImages, vehicle.image]);
  const { statistics } = market;
  const isUsed = market.condition === 'used';
  const prioritizedMatches = getPrioritizedMatches({
    matches: market.matches,
    averagePrice: market.averagePrice,
    averageMileage: statistics.averageMileage,
    condition: market.condition,
  });
  const leadMatch = isUsed
    ? prioritizedMatches[0]
    : market.bestPriceMatch ?? prioritizedMatches[0];
  const plottedMatchesBase = getPrioritizedMatches({
    matches: market.matches,
    averagePrice: market.averagePrice,
    averageMileage: statistics.averageMileage,
    condition: market.condition,
    limit: 10,
  });
  const plottedMatches = leadMatch && !plottedMatchesBase.some((match) => getLocalDealKey(match) === getLocalDealKey(leadMatch))
    ? [leadMatch, ...plottedMatchesBase].slice(0, 10)
    : plottedMatchesBase;
  const trims = plottedMatches
    .map((match) => getMatchTrimLabel(match) || match.unit.trim)
    .filter((trim): trim is string => Boolean(trim));
  const uniqueTrims = Array.from(new Set(trims));
  const baseTrim = uniqueTrims.find((trim) => normalizeTrim(trim) === 'base');
  const remainingTrims = uniqueTrims.filter((trim) => trim !== baseTrim);
  const localDealTrimOptions = baseTrim ? [baseTrim, ...remainingTrims] : uniqueTrims;

  const defaultLocalDealTrim = localDealTrimOptions.find((trim) => normalizeTrim(trim) === 'base') ?? LOCAL_DEAL_ALL_TRIMS;
  const activeLocalDealTrim =
    localDealTrimFilter === LOCAL_DEAL_ALL_TRIMS || localDealTrimOptions.includes(localDealTrimFilter)
      ? localDealTrimFilter
      : defaultLocalDealTrim;
  const marketContextLabel = `${vehicle.year} ${vehicle.make} ${vehicle.model} near ${zipCode}`;
  const filteredLocalDeals =
    activeLocalDealTrim === LOCAL_DEAL_ALL_TRIMS
      ? plottedMatches
      : plottedMatches.filter((match) => (getMatchTrimLabel(match) || match.unit.trim) === activeLocalDealTrim);
  const sortedLocalDeals = [...filteredLocalDeals].sort((a, b) => {
    if (localDealSort === 'value') {
      const leadMatchKey = leadMatch ? getLocalDealKey(leadMatch) : null;
      const aIsLeadMatch = leadMatchKey !== null && getLocalDealKey(a) === leadMatchKey;
      const bIsLeadMatch = leadMatchKey !== null && getLocalDealKey(b) === leadMatchKey;

      if (aIsLeadMatch !== bIsLeadMatch) return aIsLeadMatch ? -1 : 1;

      const bScore = getMatchScore({
        match: b,
        averagePrice: market.averagePrice,
        averageMileage: statistics.averageMileage,
        condition: market.condition,
      });
      const aScore = getMatchScore({
        match: a,
        averagePrice: market.averagePrice,
        averageMileage: statistics.averageMileage,
        condition: market.condition,
      });

      if (bScore !== aScore) return bScore - aScore;
      return a.unit.price - b.unit.price;
    }

    if (localDealSort === 'discount') {
      return getMsrpDifference(b) - getMsrpDifference(a);
    }

    return a.unit.price - b.unit.price;
  });
  const visibleLocalDeals = sortedLocalDeals.slice(0, 3);
  const remainingLocalDeals = sortedLocalDeals.slice(3);
  const targetLow = Math.round((market.averagePrice * 0.94) / 100) * 100;
  const targetHigh = Math.round((market.averagePrice * 0.975) / 100) * 100;
  const askingPrice = leadMatch ? leadMatch.unit.price : market.averagePrice;
  const chartMatches = getRepresentativeChartMatches({
    matches: plottedMatches,
    leadMatch,
  });
  const plottedPrices = plottedMatches.map((match) => match.unit.price);
  const lowestPlottedPrice = plottedPrices.length > 0 ? Math.min(...plottedPrices) : askingPrice;
  const highestPlottedPrice = plottedPrices.length > 0 ? Math.max(...plottedPrices) : askingPrice;
  const rangeLow = Math.min(targetLow * 0.93, askingPrice * 0.93, lowestPlottedPrice * 0.96);
  const rangeHigh = Math.max(targetHigh * 1.08, askingPrice * 1.08, highestPlottedPrice * 1.04);
  const targetStart = getPercentWithinRange(targetLow, rangeLow, rangeHigh);
  const targetEnd = getPercentWithinRange(targetHigh, rangeLow, rangeHigh);
  const askingPosition = getPercentWithinRange(askingPrice, rangeLow, rangeHigh);
  const targetCenter = targetStart + (targetEnd - targetStart) / 2;
  const askingTone = getPriceBandTone({
    price: askingPrice,
    targetLow,
    targetHigh,
  });
  const axisTickPrices = [rangeLow, rangeLow + (rangeHigh - rangeLow) / 3, rangeLow + ((rangeHigh - rangeLow) * 2) / 3, rangeHigh]
    .map((price) => Math.round(price / 500) * 500);
  const priceRangeStyle = {
    '--target-start': `${targetStart}%`,
    '--target-end': `${targetEnd}%`,
    '--target-width': `${Math.max(8, targetEnd - targetStart)}%`,
    '--target-center': `${targetCenter}%`,
    '--asking-position': `${askingPosition}%`,
  } as CSSProperties;
  const priceTrend = '3.8% (30d)';
  const inventoryLabel = market.inventoryCount >= 24 ? 'High Supply' : market.inventoryCount >= 10 ? 'Moderate' : 'Limited';
  const demandLabel = market.averageDaysOnLot <= 22 ? 'High' : market.averageDaysOnLot >= 45 ? 'Soft' : 'Moderate';
  const priceAssessment = getPriceAssessment({ askingPrice, targetLow, targetHigh });
  const priceRelationshipCopy = getPriceRelationshipCopy({ askingPrice, targetLow, targetHigh });
  const hasHistoryRisk = isUsed && Boolean(leadMatch) && (
    (leadMatch?.unit.accidents ?? 0) > 0 ||
    (leadMatch?.unit.titleStatus !== undefined && leadMatch.unit.titleStatus !== 'Clean')
  );
  const leadDaysOnLot = leadMatch?.unit.daysOnLot ?? market.averageDaysOnLot;
  const hasLeadPriceDrop = (leadMatch?.unit.recentPriceDropAmount ?? 0) > 0;
  const hasHighNegotiationLeverage = leadDaysOnLot >= 90 || (leadDaysOnLot >= 45 && (hasLeadPriceDrop || demandLabel === 'Soft'));
  const hasModerateNegotiationLeverage = leadDaysOnLot >= 30 || hasLeadPriceDrop || demandLabel === 'Soft';
  const negotiationLeverage = hasHighNegotiationLeverage ? 'High' : hasModerateNegotiationLeverage ? 'Moderate' : 'Low';
  const recommendationSignals = getRecommendationSignals({
    match: leadMatch,
    averageMileage: statistics.averageMileage,
    demandLabel,
    inventoryLabel,
    isUsed,
  });
  const recommendationSignalCopy = recommendationSignals.join(', ');
  const leadRecommendationLabel = isUsed
    ? 'Best Value Match'
    : priceAssessment.tone === 'opportunity'
      ? 'Best Local Deal'
      : priceAssessment.tone === 'over'
        ? 'Best Available Match'
        : 'Best Balanced Match';
  const leadMarkerLabel = isUsed ? 'Best value' : 'Best price';
  const leadRowBadgeLabel = isUsed ? 'Best value' : 'Best price';
  const leadDotLabel = isUsed ? 'Best value' : 'Best local deal';
  const chartDescription = isUsed
    ? 'Representative matches. Best value balances price, mileage, history, and days on lot.'
    : 'Representative matches. Best price is the lowest comparable local listing for this trim.';
  const leadRecommendationCopy = priceAssessment.tone === 'over'
    ? `${leadRecommendationLabel} because of ${recommendationSignalCopy}, even though it is above fair market.`
    : `${leadRecommendationLabel} based on ${recommendationSignalCopy}.`;
  const buyerGuidance = getBuyerGuidance({
    askingPrice,
    targetLow,
    targetHigh,
    priceAssessment,
    negotiationLeverage,
  });
  const bottomLineCopy = getBottomLineCopy(priceAssessment, hasHistoryRisk);
  const bottomLineDetailCopy = bottomLineCopy.replace(/^Bottom line:\s*/, '');
  const confidenceLabel = market.inventoryCount >= 24 ? 'High' : market.inventoryCount >= 10 ? 'Moderate' : 'Limited';
  const confidenceCopy = `Based on ${market.inventoryCount} comparable local listings within ${radiusMiles} miles.`;
  const comparablePriceSummary = statistics.lowPrice !== undefined && statistics.highPrice !== undefined
    ? `Similar vehicles are currently listed from ${formatPrice(statistics.lowPrice)} to ${formatPrice(statistics.highPrice)}.`
    : 'Comparable listings are limited for this search.';
  const whyPriceFactors = [
    'comparable local listings',
    statistics.averageMileage !== undefined ? 'mileage' : null,
    'vehicle configuration',
    isUsed ? 'condition history' : null,
    'inventory',
    'demand',
    'recent price trends',
  ].filter(Boolean).join(', ');

  const factors: FactorItem[] = [
    {
      label: 'Price Position',
      value: getPricePositionFactorCopy({ askingPrice, targetLow, targetHigh }),
      description: getPricePositionSignalCopy({ askingPrice, targetLow, targetHigh }),
      help: {
        why: 'Shows whether this price is above or below similar local listings.',
        action: 'Confirm fees and use below-market pricing as leverage if the savings hold.',
      },
      tone: getPricePositionTone({ askingPrice, targetHigh }),
      nowrap: true,
    },
    {
      label: 'Available Near You',
      value: `${market.inventoryCount} listings`,
      description: getInventorySignalCopy(market.inventoryCount),
      help: {
        why: 'More comparable listings make the local signal more reliable.',
        action: 'Compare trims and nearby dealers before committing to one listing.',
      },
      tone: market.inventoryCount >= 10 ? 'dark' : undefined,
    },
    {
      label: 'Price Trend',
      value: `Down ${priceTrend}`,
      description: 'Prices moving lower',
      help: {
        why: 'Recent movement shows whether sellers are adjusting prices.',
        action: 'If prices are falling, ask the dealer to match the latest local movement.',
      },
      tone: 'success',
      nowrap: true,
    },
    {
      label: 'Avg. days on lot',
      value: `${Math.round(market.averageDaysOnLot)} days`,
      description: getDaysOnLotSignalCopy(market.averageDaysOnLot),
      help: {
        why: 'Older inventory can mean the dealer has more reason to make a deal.',
        action: 'Use longer days on lot to ask for a better price or added value.',
      },
    },
  ];

  const renderLocalDealRow = (match: MarketInventoryMatch) => {
    const localDealTone = getPriceBandTone({
      price: match.unit.price,
      targetLow,
      targetHigh,
    });
    const trimLabel = getMatchTrimLabel(match) || match.unit.trim;
    const displayMsrp = getDisplayMsrp(match);
    const msrpDifference = getMsrpDifference(match);
    const isBestLocalDeal = match === leadMatch;
    const localDealKey = getLocalDealKey(match);

    return (
      <a
        key={`${localDealKey}-list`}
        className={`market-snapshot__local-deal-row market-snapshot__local-deal-row--${localDealTone}`}
        href={getListingUrl(match)}
        aria-label={`View ${getVehicleMatchTitle(match)} at ${match.dealer.name} for ${formatPrice(match.unit.price)}`}
        onMouseEnter={() => showActiveLocalDeal(localDealKey)}
        onMouseLeave={scheduleClearActiveLocalDeal}
        onFocus={() => showActiveLocalDeal(localDealKey)}
        onBlur={scheduleClearActiveLocalDeal}
      >
        <span className="market-snapshot__local-deal-dealer">
          <strong>{match.dealer.name}</strong>
          {match.dealer.distance !== undefined && <em>{match.dealer.distance.toFixed(1)} mi</em>}
          {isBestLocalDeal && (
            <b className={leadRowBadgeLabel === 'Best value' ? 'market-snapshot__local-deal-badge--solid' : undefined}>
              {leadRowBadgeLabel}
            </b>
          )}
        </span>
        <span className="market-snapshot__local-deal-trim" data-label="Trim">{trimLabel}</span>
        <strong className="market-snapshot__local-deal-price">{formatPrice(match.unit.price)}</strong>
        <span className="market-snapshot__local-deal-msrp" data-label="MSRP">{formatPrice(displayMsrp)}</span>
        <strong className={`market-snapshot__local-deal-discount ${
          msrpDifference < 0
            ? 'market-snapshot__local-deal-discount--over'
            : msrpDifference === 0
              ? 'market-snapshot__local-deal-discount--empty'
              : ''
        }`}
        data-label="Vs. MSRP"
        >
          {getMsrpDifferenceCopy(msrpDifference)}
        </strong>
      </a>
    );
  };

  return (
    <section
      id="market-intelligence-snapshot"
      className={`market-snapshot market-snapshot--${market.condition}`}
      aria-labelledby="market-snapshot-title"
    >
      <div className="market-snapshot__inner">
        <header className="market-snapshot__header">
          <div className="market-snapshot__header-copy">
            <h2 id="market-snapshot-title">Local Signals</h2>
            <p className="market-snapshot__context">{marketContextLabel}</p>
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
                  const nextZipCode = event.target.value.replace(/\D/g, '').slice(0, 5);
                  let nextError = '';

                  if (nextZipCode.length === 5) {
                    const nextLocation = resolveMarketLocationFromZip(nextZipCode);
                    if (nextLocation) {
                      if (nextLocation.zipCode !== location.zipCode) {
                        onLocationChange(nextLocation);
                      }
                    } else {
                      nextError = 'Enter a supported 5-digit ZIP code.';
                    }
                  }

                  setZipInput({
                    sourceZipCode: currentLocationZipCode,
                    value: nextZipCode,
                    error: nextError,
                  });
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
          aria-label={`Fair market price ${formatPrice(targetLow)} to ${formatPrice(targetHigh)}, ${leadMarkerLabel.toLowerCase()} ${formatPrice(askingPrice)}`}
          style={priceRangeStyle}
        >
          <div className="market-snapshot__factor-grid" aria-label="Local market signal summary">
            {factors.map((factor, index) => {
              const factorValueClassName = [
                'market-snapshot__factor-value',
                factor.tone ? `market-snapshot__factor-value--${factor.tone}` : null,
                factor.nowrap ? 'market-snapshot__factor-value--nowrap' : null,
              ].filter(Boolean).join(' ') || undefined;
              const tooltipId = `${factorHelpId}-factor-${index}`;

              return (
                <div key={factor.label} className="market-snapshot__factor">
                  <div className="market-snapshot__factor-head">
                    <span className="market-snapshot__factor-label">{factor.label}</span>
                    <span className="market-snapshot__factor-help">
                      <button
                        type="button"
                        className="market-snapshot__factor-help-trigger"
                        aria-label={`What to know about ${factor.label}`}
                        aria-describedby={tooltipId}
                      >
                        <Info size={13} aria-hidden="true" />
                      </button>
                      <span id={tooltipId} className="market-snapshot__factor-tooltip" role="tooltip">
                        <span>
                          <strong>Why it matters</strong>
                          {factor.help.why}
                        </span>
                        <span>
                          <strong>What to do</strong>
                          {factor.help.action}
                        </span>
                      </span>
                    </span>
                  </div>
                  <strong className={factorValueClassName}>
                    {factor.value}
                  </strong>
                  <p>{factor.description}</p>
                </div>
              );
            })}
          </div>

          <div
            className="market-snapshot__price-visual"
            aria-label={`Local price comparison plotting ${chartMatches.length} representative deals from ${plottedMatches.length} local matches across below market, fair market price, and above market`}
          >
            <div className="market-snapshot__price-visual-head">
              <div className="market-snapshot__price-visual-copy">
                <h4>Local Price Comparison</h4>
              </div>
            </div>
            <div className="market-snapshot__price-band-chart">
              <div className="market-snapshot__price-zone-labels" aria-hidden="true">
                <span className="market-snapshot__price-zone-label market-snapshot__price-zone-label--great">Below market</span>
                <span className="market-snapshot__price-zone-label market-snapshot__price-zone-label--fair">
                  Fair market price
                  <span>{formatPriceRange(targetLow, targetHigh)}</span>
                </span>
                <span className="market-snapshot__price-zone-label market-snapshot__price-zone-label--above">Above market</span>
              </div>
              <div className="market-snapshot__price-zones" aria-hidden="true">
                <span className="market-snapshot__price-zone market-snapshot__price-zone--great" />
                <span className="market-snapshot__price-zone market-snapshot__price-zone--fair" />
                <span className="market-snapshot__price-zone market-snapshot__price-zone--above" />
              </div>
              <span className="market-snapshot__price-axis-line" />
              <div className={`market-snapshot__price-points ${activeLocalDealKey ? 'market-snapshot__price-points--has-active' : ''}`}>
                {chartMatches.map((match, index) => {
                  const dotPosition = getPercentWithinRange(match.unit.price, rangeLow, rangeHigh);
                  const dotTone = getPriceBandTone({
                    price: match.unit.price,
                    targetLow,
                    targetHigh,
                  });
                  const tooltipAlign = dotPosition < 18 ? 'start' : dotPosition > 82 ? 'end' : 'center';
                  const dotStyle = {
                    '--dot-position': `${dotPosition}%`,
                    '--dot-offset': `${index % 2 === 0 ? -1 : 1}px`,
                  } as CSSProperties;
                  const localDealKey = getLocalDealKey(match);
                  const isLeadDot = leadMatch ? localDealKey === getLocalDealKey(leadMatch) : index === 0;
                  const isActiveDot = activeLocalDealKey === localDealKey;
                  const tooltipImageUrl =
                    match.unit.imageUrl ??
                    tooltipGalleryImages[index % tooltipGalleryImages.length] ??
                    vehicle.image;
                  const tooltipConditionSignals = getVehicleQualitySignals({
                    match,
                    averageMileage: statistics.averageMileage,
                  });
                  const tooltipHistorySignal = tooltipConditionSignals[0];
                  const tooltipHistoryLabel = tooltipHistorySignal ?? (match.unit.isNew ? 'New listing' : 'History unavailable');
                  const tooltipDaysOnLotCopy = match.unit.daysOnLot !== undefined
                    ? `${match.unit.daysOnLot} days on lot`
                    : 'Days on lot unavailable';
                  const tooltipMeta = [
                    formatMileageValue(match.unit.mileage),
                    match.dealer.distance !== undefined ? `${match.dealer.distance.toFixed(1)} mi away` : null,
                  ].filter(Boolean).join(' | ');
                  const tooltipConditionLabel = getConditionLabel(match);
                  const tooltipBadgeLabel = isLeadDot
                    ? leadDotLabel
                    : dotTone === 'great'
                      ? 'Below market'
                      : dotTone === 'fair'
                        ? 'Fair market'
                        : 'Above market';

                  return (
                    <div
                      key={`${localDealKey}-dot`}
                      className={`market-snapshot__price-point market-snapshot__price-point--${dotTone} ${isLeadDot ? 'market-snapshot__price-point--lead' : ''} ${isActiveDot ? 'market-snapshot__price-point--active' : ''}`}
                      style={dotStyle}
                      onMouseEnter={() => showActiveLocalDeal(localDealKey)}
                      onMouseLeave={scheduleClearActiveLocalDeal}
                      onFocus={() => showActiveLocalDeal(localDealKey)}
                      onBlur={scheduleClearActiveLocalDeal}
                    >
                      <a
                        className="market-snapshot__price-dot-link"
                        href={getListingUrl(match)}
                        aria-label={`Shop ${getVehicleMatchTitle(match)} at ${match.dealer.name} for ${formatPrice(match.unit.price)}`}
                      >
                        <span className="market-snapshot__price-dot" aria-hidden="true" />
                      </a>
                      <a
                        className={`market-snapshot__price-tooltip market-snapshot__price-tooltip--${tooltipAlign}`}
                        href={getListingUrl(match)}
                        tabIndex={-1}
                        aria-label={`Shop ${getVehicleMatchTitle(match)} at ${match.dealer.name} for ${formatPrice(match.unit.price)}`}
                        onMouseEnter={() => showActiveLocalDeal(localDealKey)}
                        onMouseLeave={scheduleClearActiveLocalDeal}
                      >
                        <div className="market-snapshot__price-tooltip-main">
                          <OptimizedImage
                            src={tooltipImageUrl}
                            alt={getVehicleMatchTitle(match)}
                            aspectRatio="3/2"
                            wrapperClassName="market-snapshot__price-tooltip-media"
                          />
                          <div className="market-snapshot__price-tooltip-body">
                            <strong className="market-snapshot__price-tooltip-price">
                              {formatPrice(match.unit.price)}
                            </strong>
                            <span className="market-snapshot__price-tooltip-dealer">{match.dealer.name}</span>
                            <span className="market-snapshot__price-tooltip-meta">{tooltipMeta}</span>
                          </div>
                        </div>
                        <div className="market-snapshot__price-tooltip-stats" aria-label="Vehicle value signals">
                          <span>{tooltipConditionLabel}</span>
                          <span>{tooltipDaysOnLotCopy}</span>
                          <span>{tooltipHistoryLabel}</span>
                        </div>
                        <div className="market-snapshot__price-tooltip-actions">
                          <span className={`market-snapshot__price-tooltip-badge ${tooltipBadgeLabel === 'Best value' ? 'market-snapshot__price-tooltip-badge--solid' : ''}`}>
                            {tooltipBadgeLabel}
                          </span>
                          <span className="market-snapshot__price-tooltip-cta">View listing</span>
                        </div>
                      </a>
                    </div>
                  );
                })}
              </div>
              <span className={`market-snapshot__your-car-marker market-snapshot__your-car-marker--${askingTone}`}>
                <span className="market-snapshot__your-car-stem" />
                <strong>{leadMarkerLabel}: {formatPrice(askingPrice)}</strong>
              </span>
              <div className="market-snapshot__price-axis">
                {axisTickPrices.map((price, index) => (
                  <span key={`${price}-${index}`}>{formatPrice(price)}</span>
                ))}
              </div>
            </div>
            <p className="market-snapshot__price-visual-note">{chartDescription}</p>
            <div className="market-snapshot__local-deals-inline">
              <div className="market-snapshot__local-deal-toolbar">
                <div className="market-snapshot__local-deal-sort" aria-label="Sort local matches">
                  <span>Sort</span>
                  <button
                    type="button"
                    className={localDealSort === 'value' ? 'market-snapshot__local-deal-sort-button--active' : undefined}
                    aria-pressed={localDealSort === 'value'}
                    onClick={() => setLocalDealSort('value')}
                  >
                    Best value
                  </button>
                  <button
                    type="button"
                    className={localDealSort === 'price' ? 'market-snapshot__local-deal-sort-button--active' : undefined}
                    aria-pressed={localDealSort === 'price'}
                    onClick={() => setLocalDealSort('price')}
                  >
                    Price
                  </button>
                  <button
                    type="button"
                    className={localDealSort === 'discount' ? 'market-snapshot__local-deal-sort-button--active' : undefined}
                    aria-pressed={localDealSort === 'discount'}
                    onClick={() => setLocalDealSort('discount')}
                  >
                    Savings
                  </button>
                </div>

                <label className="market-snapshot__local-deal-trim-filter">
                  <span>Trim</span>
                  <select
                    value={activeLocalDealTrim}
                    onChange={(event) => setLocalDealTrimFilter(event.target.value)}
                  >
                    <option value={LOCAL_DEAL_ALL_TRIMS}>All trims</option>
                    {localDealTrimOptions.map((trim) => (
                      <option key={trim} value={trim}>
                        {trim}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              {sortedLocalDeals.length > 0 ? (
                <>
                  <div className="market-snapshot__local-deal-header" aria-hidden="true">
                    <span>Dealer</span>
                    <span>Trim</span>
                    <span>Price</span>
                    <span>MSRP</span>
                    <span>Vs. MSRP</span>
                  </div>
                  <div className="market-snapshot__local-deal-list" aria-label="Comparable local dealer inventory">
                    {visibleLocalDeals.map(renderLocalDealRow)}
                  </div>

                  {remainingLocalDeals.length > 0 && (
                    <details className="market-snapshot__local-deals-more">
                      <summary>
                        <span>Show {remainingLocalDeals.length} more local matches</span>
                        <span className="market-snapshot__local-deals-menu-icon" aria-hidden="true" />
                      </summary>
                      <div className="market-snapshot__local-deal-list">
                        {remainingLocalDeals.map(renderLocalDealRow)}
                      </div>
                    </details>
                  )}
                </>
              ) : (
                <p className="market-snapshot__local-deals-empty">No local matches for this trim.</p>
              )}
            </div>
          </div>
        </section>

        <details className="market-snapshot__details-accordion">
          <summary>
            <span>
              <strong>More market details</strong>
              <em>Buying guidance, price details, and comparable listings</em>
            </span>
            <span className="market-snapshot__details-icon" aria-hidden="true" />
          </summary>

          <div className="market-snapshot__details-content">
            <section className="market-snapshot__expert-tips" aria-labelledby="market-snapshot-expert-tips-title">
              <div className="market-snapshot__expert-tips-intro">
                <div className="market-snapshot__expert-tips-header">
                  <span className="market-snapshot__expert-tips-seal" aria-hidden="true" />
                  <h3 id="market-snapshot-expert-tips-title">C/D Expert Tips</h3>
                </div>
              </div>

              <ol className="market-snapshot__expert-tips-list">
                <li className="market-snapshot__expert-tips-item">
                  <span className="market-snapshot__expert-tips-index" aria-hidden="true">1</span>
                  <div>
                    <h4>Set your target</h4>
                    <p><strong>{buyerGuidance.targetCopy}</strong>. {buyerGuidance.closeCopy}</p>
                  </div>
                </li>
                <li className="market-snapshot__expert-tips-item">
                  <span className="market-snapshot__expert-tips-index" aria-hidden="true">2</span>
                  <div>
                    <h4>Use your buyer position</h4>
                    <p><strong>{buyerGuidance.position}</strong>. {buyerGuidance.positionCopy}</p>
                  </div>
                </li>
                <li className="market-snapshot__expert-tips-item">
                  <span className="market-snapshot__expert-tips-index" aria-hidden="true">3</span>
                  <div>
                    <h4>Control the final number</h4>
                    <p>
                      Keep taxes, fees, and add-ons controlled before you commit.
                      {buyerGuidance.openingOffer ? ` Consider opening at ${buyerGuidance.openingOffer}.` : ''}
                    </p>
                  </div>
                </li>
              </ol>
            </section>

            <div className="market-snapshot__decision market-snapshot__decision--details">
              <div className="market-snapshot__decision-main">
                <h3>Bottom Line</h3>
                <p>
                  {formatPrice(askingPrice)} asking price is {priceRelationshipCopy.toLowerCase()}. {bottomLineDetailCopy}
                </p>
                <div className="market-snapshot__bottom-line-evidence">
                  <div>
                    <p className="market-snapshot__section-kicker">Why this price?</p>
                    <p>{market.inventoryCount} comparable listings, {whyPriceFactors}.</p>
                  </div>
                  <div>
                    <p className="market-snapshot__section-kicker">Confidence</p>
                    <p><strong>{confidenceLabel}</strong>. {confidenceCopy}</p>
                  </div>
                </div>
              </div>
            </div>

            {prioritizedMatches.length > 0 ? (
              <section className="market-snapshot__matches" aria-labelledby="market-snapshot-matches-title">
                <div className="market-snapshot__matches-head">
                  <h3 id="market-snapshot-matches-title">Closest comparable listings</h3>
                  <p>
                    {comparablePriceSummary} {leadRecommendationCopy}
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
                    const trimLabel = getMatchTrimLabel(match);
                    const matchScore = getMatchScore({
                      match,
                      averagePrice: market.averagePrice,
                      averageMileage: statistics.averageMileage,
                      condition: market.condition,
                    });
                    const displayMatchScore = getRankedDisplayScore(matchScore, index);
                    const comparableFitLabel = getComparableFitLabel({ match, leadMatch, vehicle, index });
                    const qualitySignals = getVehicleQualitySignals({
                      match,
                      averageMileage: statistics.averageMileage,
                    });

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
                          {index === 0 && <span className="market-snapshot__best-match">{leadRecommendationLabel}</span>}
                        </a>

                        <div className="market-snapshot__vehicle-pick-body">
                          <div className="market-snapshot__vehicle-pick-topline">
                            <span className="market-snapshot__comparison-copy">
                              <strong>{comparableFitLabel}</strong>
                              <em>{displayMatchScore}% comparable</em>
                            </span>
                            <strong>{formatPrice(match.unit.price)}</strong>
                          </div>

                          <div className="market-snapshot__vehicle-pick-title">
                            <h4>{vehicleTitle}{trimLabel ? ` ${trimLabel}` : ''}</h4>
                            {qualitySignals.length > 0 && (
                              <div className="market-snapshot__quality-signals" aria-label="Vehicle quality signals">
                                {qualitySignals.map((signal) => (
                                  <span key={signal}>{signal}</span>
                                ))}
                              </div>
                            )}
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
                              {index === 0 ? 'View This Car' : 'Compare'}
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
        </details>
      </div>
    </section>
  );
};

export default MarketIntelligenceSnapshot;
