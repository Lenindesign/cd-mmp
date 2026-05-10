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

interface InventoryRequest {
  make: string;
  model: string;
  year?: number;
}

interface DealerFeedSource {
  dealerId: string;
  provider: 'dealerCom' | 'dealerOn';
  make: string;
  model: string;
  name: string;
  sourceName: string;
  baseUrl: string;
  inventoryPath: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  lat: number;
  lng: number;
  dealerOnId?: number;
  dealerOnPageId?: number;
}

interface DealerComVehicle {
  year?: number;
  make?: string;
  model?: string;
  trim?: string;
  condition?: string;
  vin?: string;
  stockNumber?: string;
  link?: string;
  trackingPricing?: {
    internetPrice?: string;
    askingPrice?: string;
    salePrice?: string;
    msrp?: string;
  };
  trackingAttributes?: Array<{
    name?: string;
    value?: string;
    normalizedValue?: string;
  }>;
}

interface DealerOnVehicleCard {
  TaggingPrice?: string | number;
  VehicleDetailUrl?: string;
  VehicleInternetPrice?: number;
  VehicleMsrp?: number;
  VehicleMake?: string;
  VehicleModel?: string;
  VehiclePriceLibrary?: string;
  VehicleStockNumber?: string;
  VehicleTrim?: string;
  VehicleVin?: string;
  VehicleYear?: number;
  ExteriorColorLabel?: string;
  InteriorColorLabel?: string;
  VehicleImageModel?: {
    VehicleImageCarouselModel?: {
      PhotoList?: string[];
    };
  };
}

interface DealerOnSearchResponse {
  DisplayCards?: Array<{
    VehicleCard?: DealerOnVehicleCard;
  }>;
  Paging?: {
    PaginationDataModel?: {
      PageNumber?: number;
      PageSize?: number;
      TotalPages?: number;
      TotalCount?: number;
    };
  };
}

const DEALER_FEED_SOURCES: DealerFeedSource[] = [
  {
    dealerId: 'dealer-ca-1',
    provider: 'dealerCom',
    make: 'Chevrolet',
    model: 'Trax',
    name: 'Irvine Chevrolet',
    sourceName: 'Simpson Chevrolet of Irvine',
    baseUrl: 'https://www.simpsonchevroletirvine.com',
    inventoryPath: '/new-inventory/index.htm',
    address: '21 Auto Center Drive',
    city: 'Irvine',
    state: 'CA',
    zipCode: '92618',
    phone: '(949) 525-9954',
    lat: 33.6313,
    lng: -117.7198,
  },
  {
    dealerId: 'dealer-ca-5',
    provider: 'dealerOn',
    make: 'Chevrolet',
    model: 'Trax',
    name: 'Cerritos Chevrolet',
    sourceName: 'Penske Chevrolet of Cerritos',
    baseUrl: 'https://www.penskechevroletofcerritos.com',
    inventoryPath: '/searchnew.aspx',
    address: '18605 Studebaker Rd',
    city: 'Cerritos',
    state: 'CA',
    zipCode: '90703',
    phone: '(877) 772-3022',
    lat: 33.8650,
    lng: -118.0526,
    dealerOnId: 28208,
    dealerOnPageId: 2950454,
  },
  {
    dealerId: 'dealer-ca-6',
    provider: 'dealerOn',
    make: 'Chevrolet',
    model: 'Trax',
    name: 'Puente Hills Chevrolet',
    sourceName: 'Chevrolet of Puente Hills',
    baseUrl: 'https://www.chevroletofpuentehills.com',
    inventoryPath: '/searchnew.aspx',
    address: '17300 Gale Ave',
    city: 'City of Industry',
    state: 'CA',
    zipCode: '91748',
    phone: '(626) 715-2495',
    lat: 33.9961,
    lng: -117.9173,
    dealerOnId: 28299,
    dealerOnPageId: 2957011,
  },
];

const normalizeKey = (value: string) => value.trim().toLowerCase();

const parseMoney = (value?: string): number | undefined => {
  if (!value) return undefined;
  const parsed = Number(value.replace(/[^0-9.-]/g, ''));
  return Number.isFinite(parsed) ? parsed : undefined;
};

const coerceNumber = (value?: string | number): number | undefined => {
  if (typeof value === 'number') {
    return Number.isFinite(value) && value > 0 ? value : undefined;
  }
  return parseMoney(value);
};

const buildInventoryUrl = (
  source: DealerFeedSource,
  request: InventoryRequest
): string => {
  const url = new URL(source.inventoryPath, source.baseUrl);

  if (source.provider === 'dealerCom') {
    url.searchParams.set('model', request.model);
  } else {
    url.searchParams.set('Make', request.make);
    url.searchParams.set('Model', request.model);
  }

  return url.toString();
};

const getTrackingAttribute = (
  vehicle: DealerComVehicle,
  name: string
): string | undefined => {
  return vehicle.trackingAttributes?.find(attr => attr.name === name)?.value;
};

const extractInventoryRequestBody = (html: string): string | null => {
  const match = html.match(/body:decodeURI\("([^"]+)"\)/);
  return match ? decodeURI(match[1]) : null;
};

const buildHeaders = (source: DealerFeedSource) => ({
  accept: 'application/json',
  'content-type': 'application/json',
  origin: source.baseUrl,
  referer: `${source.baseUrl}${source.inventoryPath}?model=${encodeURIComponent(source.model)}`,
  'user-agent':
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36',
});

const parseDealerOnPriceLibrary = (
  value?: string
): Record<string, number> => {
  if (!value) return {};

  try {
    const decoded = Buffer.from(value, 'base64').toString('utf8');
    return decoded.split(';').reduce<Record<string, number>>((prices, entry) => {
      const [key, rawValue] = entry.split(':');
      const parsed = coerceNumber(rawValue);
      if (key && parsed) {
        prices[key.trim().toLowerCase()] = parsed;
      }
      return prices;
    }, {});
  } catch {
    return {};
  }
};

const mapDealerComVehicle = (
  source: DealerFeedSource,
  vehicle: DealerComVehicle
): LiveInventoryVehicle | null => {
  if (!vehicle.year || !vehicle.make || !vehicle.model) return null;

  const msrp = parseMoney(vehicle.trackingPricing?.msrp);
  const price =
    parseMoney(vehicle.trackingPricing?.askingPrice) ??
    parseMoney(vehicle.trackingPricing?.internetPrice) ??
    parseMoney(vehicle.trackingPricing?.salePrice) ??
    msrp;

  if (!price) return null;

  return {
    year: vehicle.year,
    make: vehicle.make,
    model: vehicle.model,
    trim: vehicle.trim || 'Base',
    price,
    msrp,
    vin: vehicle.vin,
    stockNumber: vehicle.stockNumber,
    exteriorColor: getTrackingAttribute(vehicle, 'exteriorColor'),
    interiorColor: getTrackingAttribute(vehicle, 'interiorColor'),
    isNew: vehicle.condition?.toLowerCase() !== 'used',
    dealerUrl: vehicle.link ? `${source.baseUrl}${vehicle.link}` : undefined,
  };
};

const fetchDealerComInventory = async (
  source: DealerFeedSource,
  request: InventoryRequest
): Promise<LiveInventoryDealer | null> => {
  const inventoryUrl = buildInventoryUrl(source, request);
  const pageResponse = await fetch(inventoryUrl, {
    headers: { 'user-agent': buildHeaders(source)['user-agent'] },
  });

  if (!pageResponse.ok) {
    throw new Error(`Dealer inventory page returned ${pageResponse.status}`);
  }

  const requestBody = extractInventoryRequestBody(await pageResponse.text());
  if (!requestBody) {
    throw new Error('Dealer inventory request body was not found');
  }

  const feedResponse = await fetch(`${source.baseUrl}/api/widget/ws-inv-data/getInventory`, {
    method: 'POST',
    headers: buildHeaders(source),
    body: requestBody,
  });

  if (!feedResponse.ok) {
    throw new Error(`Dealer inventory feed returned ${feedResponse.status}`);
  }

  const data = (await feedResponse.json()) as { inventory?: DealerComVehicle[] };
  const inventory = (data.inventory || [])
    .map(vehicle => mapDealerComVehicle(source, vehicle))
    .filter((vehicle): vehicle is LiveInventoryVehicle => {
      return Boolean(
        vehicle &&
          normalizeKey(vehicle.make) === normalizeKey(request.make) &&
          normalizeKey(vehicle.model) === normalizeKey(request.model) &&
          (!request.year || vehicle.year === request.year) &&
          vehicle.isNew
      );
    });

  if (inventory.length === 0) return null;

  const prices = inventory.map(vehicle => vehicle.price);
  const msrps = inventory
    .map(vehicle => vehicle.msrp)
    .filter((value): value is number => typeof value === 'number');
  const fetchedAt = new Date().toISOString();

  return {
    dealerId: source.dealerId,
    name: source.name,
    sourceName: source.sourceName,
    address: source.address,
    city: source.city,
    state: source.state,
    zipCode: source.zipCode,
    phone: source.phone,
    website: inventoryUrl,
    lat: source.lat,
    lng: source.lng,
    inventory,
    inventoryCount: inventory.length,
    lowestPrice: Math.min(...prices),
    highestPrice: Math.max(...prices),
    lowestMsrp: msrps.length > 0 ? Math.min(...msrps) : undefined,
    highestMsrp: msrps.length > 0 ? Math.max(...msrps) : undefined,
    fetchedAt,
  };
};

const mapDealerOnVehicle = (
  source: DealerFeedSource,
  vehicle: DealerOnVehicleCard
): LiveInventoryVehicle | null => {
  const year = coerceNumber(vehicle.VehicleYear);
  const msrp = coerceNumber(vehicle.VehicleMsrp);
  const priceLibrary = parseDealerOnPriceLibrary(vehicle.VehiclePriceLibrary);
  const price =
    priceLibrary['internet price'] ??
    priceLibrary['selling price'] ??
    priceLibrary['calc_internet price'] ??
    priceLibrary['calc_final price'] ??
    coerceNumber(vehicle.VehicleInternetPrice) ??
    coerceNumber(vehicle.TaggingPrice) ??
    msrp;

  if (!year || !vehicle.VehicleMake || !vehicle.VehicleModel || !price) {
    return null;
  }

  const dealerUrl = vehicle.VehicleDetailUrl
    ? new URL(vehicle.VehicleDetailUrl, source.baseUrl).toString()
    : undefined;

  return {
    year,
    make: vehicle.VehicleMake,
    model: vehicle.VehicleModel,
    trim: vehicle.VehicleTrim || 'Base',
    price,
    msrp,
    vin: vehicle.VehicleVin,
    stockNumber: vehicle.VehicleStockNumber,
    exteriorColor: vehicle.ExteriorColorLabel,
    interiorColor: vehicle.InteriorColorLabel,
    isNew: true,
    dealerUrl,
  };
};

const fetchDealerOnPage = async (
  source: DealerFeedSource,
  request: InventoryRequest,
  pageNumber: number
): Promise<DealerOnSearchResponse> => {
  if (!source.dealerOnId || !source.dealerOnPageId) {
    throw new Error('DealerOn source is missing dealer/page identifiers');
  }

  const query = new URLSearchParams({
    Make: request.make,
    Model: request.model,
    host: new URL(source.baseUrl).host,
    displayCardsShown: String((pageNumber - 1) * 12),
  });

  if (pageNumber > 1) {
    query.set('pt', String(pageNumber));
  }

  const apiUrl = `${source.baseUrl}/api/vhcliaa/vehicle-pages/cosmos/srp/vehicles/${source.dealerOnId}/${source.dealerOnPageId}?${query}`;
  const response = await fetch(apiUrl, {
    headers: {
      accept: 'application/json',
      referer: buildInventoryUrl(source, request),
      'user-agent': buildHeaders(source)['user-agent'],
    },
  });

  if (!response.ok) {
    throw new Error(`DealerOn inventory feed returned ${response.status}`);
  }

  return response.json() as Promise<DealerOnSearchResponse>;
};

const fetchDealerOnInventory = async (
  source: DealerFeedSource,
  request: InventoryRequest
): Promise<LiveInventoryDealer | null> => {
  const firstPage = await fetchDealerOnPage(source, request, 1);
  const totalPages = firstPage.Paging?.PaginationDataModel?.TotalPages || 1;
  const remainingPages = await Promise.all(
    Array.from({ length: Math.max(0, totalPages - 1) }, (_, index) =>
      fetchDealerOnPage(source, request, index + 2)
    )
  );

  const inventory = [firstPage, ...remainingPages]
    .flatMap(page => page.DisplayCards || [])
    .map(displayCard => {
      return displayCard.VehicleCard
        ? mapDealerOnVehicle(source, displayCard.VehicleCard)
        : null;
    })
    .filter((vehicle): vehicle is LiveInventoryVehicle => {
      return Boolean(
        vehicle &&
          normalizeKey(vehicle.make) === normalizeKey(request.make) &&
          normalizeKey(vehicle.model) === normalizeKey(request.model) &&
          (!request.year || vehicle.year === request.year) &&
          vehicle.isNew
      );
    });

  if (inventory.length === 0) return null;

  const prices = inventory.map(vehicle => vehicle.price);
  const msrps = inventory
    .map(vehicle => vehicle.msrp)
    .filter((value): value is number => typeof value === 'number');
  const fetchedAt = new Date().toISOString();

  return {
    dealerId: source.dealerId,
    name: source.name,
    sourceName: source.sourceName,
    address: source.address,
    city: source.city,
    state: source.state,
    zipCode: source.zipCode,
    phone: source.phone,
    website: buildInventoryUrl(source, request),
    lat: source.lat,
    lng: source.lng,
    inventory,
    inventoryCount: inventory.length,
    lowestPrice: Math.min(...prices),
    highestPrice: Math.max(...prices),
    lowestMsrp: msrps.length > 0 ? Math.min(...msrps) : undefined,
    highestMsrp: msrps.length > 0 ? Math.max(...msrps) : undefined,
    fetchedAt,
  };
};

const fetchSourceInventory = (
  source: DealerFeedSource,
  request: InventoryRequest
): Promise<LiveInventoryDealer | null> => {
  if (source.provider === 'dealerOn') {
    return fetchDealerOnInventory(source, request);
  }

  return fetchDealerComInventory(source, request);
};

export const fetchLiveInventory = async (
  request: InventoryRequest
): Promise<LiveInventoryResponse> => {
  const matchingSources = DEALER_FEED_SOURCES.filter(source => {
    return (
      normalizeKey(source.make) === normalizeKey(request.make) &&
      normalizeKey(source.model) === normalizeKey(request.model)
    );
  });

  const dealers = (
    await Promise.all(
      matchingSources.map(source => fetchSourceInventory(source, request))
    )
  ).filter((dealer): dealer is LiveInventoryDealer => Boolean(dealer));

  return {
    dealers,
    fetchedAt: new Date().toISOString(),
  };
};
