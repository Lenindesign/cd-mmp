import {
  getDealersForVehicle,
  type DealerWithScore,
  type VehicleInventoryItem,
} from './dealerService';
import type { Vehicle } from './vehicleService';

export type DealerRadius = 5 | 10 | 25 | 50;
export type VehicleCondition = 'new' | 'used';

export interface MarketLocation {
  label: string;
  lat: number;
  lng: number;
  zipCode?: string;
}

export interface MarketInventoryMatch {
  dealer: DealerWithScore;
  unit: VehicleInventoryItem;
  valueScore: number;
}

export interface VehicleMarketInventory {
  condition: VehicleCondition;
  dealers: DealerWithScore[];
  matches: MarketInventoryMatch[];
  inventoryCount: number;
  dealerCount: number;
  averagePrice: number;
  averageDaysOnLot: number;
  bestPriceMatch?: MarketInventoryMatch;
  bestValueMatch?: MarketInventoryMatch;
}

export const MARKET_LOCATION_OPTIONS: MarketLocation[] = [
  { label: 'Miami, FL', lat: 25.7617, lng: -80.1917, zipCode: '33101' },
  { label: 'Irvine, CA', lat: 33.6846, lng: -117.8265, zipCode: '92618' },
  { label: 'New York, NY', lat: 40.7128, lng: -74.006, zipCode: '10001' },
  { label: 'Chicago, IL', lat: 41.8781, lng: -87.6298, zipCode: '60601' },
  { label: 'Nashville, TN', lat: 36.1627, lng: -86.7816, zipCode: '37201' },
  { label: 'Seattle, WA', lat: 47.6062, lng: -122.3321, zipCode: '98101' },
];

const MARKET_ZIP_PREFIXES: Array<{ prefixes: string[]; location: MarketLocation }> = [
  { prefixes: ['330', '331'], location: MARKET_LOCATION_OPTIONS[0] },
  { prefixes: ['900', '902', '926'], location: MARKET_LOCATION_OPTIONS[1] },
  { prefixes: ['100', '101', '102', '112'], location: MARKET_LOCATION_OPTIONS[2] },
  { prefixes: ['606'], location: MARKET_LOCATION_OPTIONS[3] },
  { prefixes: ['370', '371', '372'], location: MARKET_LOCATION_OPTIONS[4] },
  { prefixes: ['980', '981'], location: MARKET_LOCATION_OPTIONS[5] },
];

export const resolveMarketLocationFromZip = (zipCode: string): MarketLocation | null => {
  const cleanZip = zipCode.replace(/\D/g, '').slice(0, 5);
  if (cleanZip.length !== 5) return null;

  const match = MARKET_ZIP_PREFIXES.find(({ prefixes }) =>
    prefixes.some((prefix) => cleanZip.startsWith(prefix))
  );
  if (!match) return null;

  return { ...match.location, zipCode: cleanZip };
};

const CURRENT_MODEL_YEAR = 2026;

const average = (values: number[]) => {
  if (values.length === 0) return 0;
  return values.reduce((sum, value) => sum + value, 0) / values.length;
};

export const getVehicleMarketCondition = (vehicle: Vehicle): VehicleCondition =>
  vehicle.condition === 'used' || parseInt(vehicle.year, 10) < CURRENT_MODEL_YEAR ? 'used' : 'new';

export const getVehicleMarketInventory = ({
  vehicle,
  location,
  radiusMiles,
}: {
  vehicle: Vehicle;
  location: MarketLocation;
  radiusMiles: DealerRadius;
}): VehicleMarketInventory => {
  const condition = getVehicleMarketCondition(vehicle);
  const year = parseInt(vehicle.year, 10);
  const rawDealers = getDealersForVehicle(
    vehicle.make,
    vehicle.model,
    location.lat,
    location.lng,
    vehicle.priceMin,
    radiusMiles,
    vehicle.priceMin,
    vehicle.priceMax,
    year
  );

  const dealers = rawDealers
    .map((dealer) => {
      const inventory = dealer.inventory.filter((unit) => unit.isNew === (condition === 'new'));
      const prices = inventory.map((unit) => unit.price);

      return {
        ...dealer,
        inventory,
        inventoryCount: inventory.length,
        lowestPrice: prices.length > 0 ? Math.min(...prices) : 0,
        highestPrice: prices.length > 0 ? Math.max(...prices) : 0,
      };
    })
    .filter((dealer) => dealer.inventoryCount > 0);

  const baseMatches = dealers.flatMap((dealer) =>
    dealer.inventory.map((unit) => ({ dealer, unit }))
  );
  const averagePrice = Math.round(average(baseMatches.map(({ unit }) => unit.price))) || vehicle.priceMin;
  const matches = baseMatches.map(({ dealer, unit }) => {
    const savings = averagePrice - unit.price;
    const distance = dealer.distance ?? radiusMiles;
    const daysOnLot = unit.daysOnLot ?? 0;
    const valueScore = Math.round(
      savings / Math.max(averagePrice, 1) * 55 +
      (1 - Math.min(distance, radiusMiles) / radiusMiles) * 20 +
      Math.min(daysOnLot, 90) / 90 * 15 +
      Math.max(0, dealer.rating - 3.5) / 1.5 * 10
    );

    return { dealer, unit, valueScore };
  });
  const daysOnLot = matches
    .map(({ unit }) => unit.daysOnLot ?? 0)
    .filter((value) => value > 0);

  return {
    condition,
    dealers,
    matches,
    inventoryCount: matches.length,
    dealerCount: dealers.length,
    averagePrice,
    averageDaysOnLot: Math.round(average(daysOnLot)),
    bestPriceMatch: [...matches].sort((a, b) => a.unit.price - b.unit.price)[0],
    bestValueMatch: [...matches].sort((a, b) => {
      const scoreDelta = b.valueScore - a.valueScore;
      if (scoreDelta !== 0) return scoreDelta;
      return a.unit.price - b.unit.price;
    })[0],
  };
};
