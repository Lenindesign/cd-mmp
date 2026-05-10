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
  vehicle: LiveInventoryVehicle
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
  isNew: vehicle.isNew,
  dealerUrl: vehicle.dealerUrl,
});

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

    const inventory = liveDealer.inventory.map(toVehicleInventoryItem);

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
