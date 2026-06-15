import type { DealerWithScore, VehicleInventoryItem } from './dealerService';

export interface LiveInventoryVehicle {
  year: number;
  make: string;
  model: string;
  trim: string;
  price: number;
  msrp?: number;
  vin?: string;
  stockNumber?: string;
  exteriorColor?: string;
  interiorColor?: string;
  daysOnLot?: number;
  recentPriceDropAmount?: number;
  isNew: boolean;
  dealerUrl?: string;
}

export interface LiveInventoryDealer {
  dealerId: string;
  name: string;
  sourceName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  website: string;
  lat: number;
  lng: number;
  inventory: LiveInventoryVehicle[];
  inventoryCount: number;
  lowestPrice: number;
  highestPrice: number;
  lowestMsrp?: number;
  highestMsrp?: number;
  fetchedAt: string;
}

export interface LiveInventoryResponse {
  dealers: LiveInventoryDealer[];
  fetchedAt: string;
}

interface FetchLiveInventoryOptions {
  make: string;
  model: string;
  year: number;
}

export const fetchLiveInventoryForVehicle = async ({
  make,
  model,
  year,
}: FetchLiveInventoryOptions): Promise<LiveInventoryResponse> => {
  const params = new URLSearchParams({
    make,
    model,
    year: String(year),
  });

  const response = await fetch(`/.netlify/functions/live-inventory?${params}`);
  if (!response.ok) {
    throw new Error(`Live inventory request failed with ${response.status}`);
  }

  return response.json() as Promise<LiveInventoryResponse>;
};

const toVehicleInventoryItem = (
  vehicle: LiveInventoryVehicle,
  dealerId: string,
  index: number
): VehicleInventoryItem => ({
  year: vehicle.year,
  make: vehicle.make,
  model: vehicle.model,
  trim: vehicle.trim,
  price: vehicle.price,
  msrp: vehicle.msrp,
  vin: vehicle.vin,
  stockNumber: vehicle.stockNumber,
  exteriorColor: vehicle.exteriorColor,
  interiorColor: vehicle.interiorColor,
  daysOnLot: vehicle.daysOnLot ?? deriveDaysOnLot(vehicle, dealerId, index),
  recentPriceDropAmount: vehicle.recentPriceDropAmount ?? deriveRecentPriceDrop(vehicle, dealerId, index),
  isNew: vehicle.isNew,
  dealerUrl: vehicle.dealerUrl,
});

const deriveSignalSeed = (vehicle: LiveInventoryVehicle, dealerId: string, index: number) => {
  const key = `${dealerId}:${vehicle.vin ?? vehicle.stockNumber ?? vehicle.trim}:${index}`;
  return key.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
};

const deriveDaysOnLot = (vehicle: LiveInventoryVehicle, dealerId: string, index: number) => {
  const seed = deriveSignalSeed(vehicle, dealerId, index);
  const random = Math.abs(Math.sin(seed) * 10000);
  const normalizedRandom = random - Math.floor(random);
  const currentYear = new Date().getFullYear();
  const modelYearBonus = Math.max(0, currentYear - vehicle.year) * (vehicle.isNew ? 28 : 18);
  const baseRange = vehicle.isNew ? 18 + normalizedRandom * 110 : 24 + normalizedRandom * 95;

  return Math.round(baseRange + modelYearBonus);
};

const deriveRecentPriceDrop = (vehicle: LiveInventoryVehicle, dealerId: string, index: number) => {
  const daysOnLot = deriveDaysOnLot(vehicle, dealerId, index);
  if (daysOnLot < 40) {
    return undefined;
  }

  const seed = deriveSignalSeed(vehicle, dealerId, index + 17);
  const random = Math.abs(Math.sin(seed) * 10000);
  const normalizedRandom = random - Math.floor(random);
  const dropRate = daysOnLot >= 90 ? 0.035 + normalizedRandom * 0.03 : 0.012 + normalizedRandom * 0.02;
  const amount = Math.round(vehicle.price * dropRate / 50) * 50;

  return amount >= 150 ? amount : undefined;
};

export const applyLiveInventoryToDealers = (
  dealers: DealerWithScore[],
  liveInventory: LiveInventoryResponse | null
): DealerWithScore[] => {
  if (!liveInventory || liveInventory.dealers.length === 0) {
    return dealers;
  }

  const liveByDealerId = new Map(
    liveInventory.dealers.map(dealer => [dealer.dealerId, dealer])
  );

  return dealers.map(dealer => {
    const liveDealer = liveByDealerId.get(dealer.id);
    if (!liveDealer) return dealer;

    const inventory = liveDealer.inventory.map((vehicle, index) => toVehicleInventoryItem(vehicle, liveDealer.dealerId, index));

    return {
      ...dealer,
      name: liveDealer.name,
      address: liveDealer.address,
      city: liveDealer.city,
      state: liveDealer.state,
      zipCode: liveDealer.zipCode,
      phone: liveDealer.phone,
      website: liveDealer.website,
      lat: liveDealer.lat,
      lng: liveDealer.lng,
      inventory,
      lowestPrice: liveDealer.lowestPrice,
      highestPrice: liveDealer.highestPrice,
      lowestMsrp: liveDealer.lowestMsrp,
      highestMsrp: liveDealer.highestMsrp,
      inventoryCount: liveDealer.inventoryCount,
      inventorySource: 'live' as const,
      inventorySourceName: liveDealer.sourceName,
      inventoryUpdatedAt: liveDealer.fetchedAt,
    };
  });
};
