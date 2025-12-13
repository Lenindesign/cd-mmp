// Listings Service - Dynamic data for For Sale Near You component
import vehicleDatabase from '../data/vehicles';

export interface PriceHistoryEntry {
  date: string;
  price: number;
  change?: number;
}

export interface VehicleHistory {
  owners: number;
  accidents: number;
  serviceRecords: number;
  lastServiceDate?: string;
  titleStatus: 'Clean' | 'Salvage' | 'Rebuilt' | 'Lemon';
  daysOnMarket: number;
  priceHistory: PriceHistoryEntry[];
  carfaxScore?: number;
  personalUse: boolean;
  fleetUse: boolean;
  rentalUse: boolean;
}

export interface Listing {
  id: string;
  year: number;
  make: string;
  model: string;
  trim: string;
  price: number;
  originalPrice?: number;
  mileage: number;
  image: string;
  slug: string;
  bodyStyle: string;
  features: string[];
  dealerName: string;
  dealerRating?: number;
  distance: number;
  isNew?: boolean;
  isCertified?: boolean;
  priceReduced?: boolean;
  history?: VehicleHistory;
}

interface ListingsParams {
  make?: string;
  model?: string;
  bodyStyle?: string;
  maxPrice?: number;
  location?: string;
}

// Dealer names by region
const dealers: { [key: string]: string[] } = {
  'Miami, FL': [
    'Miami Chevrolet', 'AutoNation', 'Coral Springs Auto', 'Ocean Honda',
    'Kendall Toyota', 'Rick Case Hyundai', 'Hollywood Kia', 'South Motors',
    'Palmetto Nissan', 'Coconut Creek Subaru', 'Doral Auto', 'Fort Lauderdale Motors'
  ],
  default: [
    'City Motors', 'AutoNation', 'Premier Auto', 'Metro Dealership',
    'Sunrise Motors', 'Valley Auto', 'Coastal Cars', 'Regional Motors'
  ]
};

// Trim options by body style
const trimOptions: { [key: string]: string[] } = {
  SUV: ['LX', 'EX', 'Sport', 'Touring', 'Limited', 'SE', 'SEL', 'XLE', 'Premium'],
  Sedan: ['LX', 'EX', 'Sport', 'Touring', 'Limited', 'SE', 'SEL', 'Premium'],
  Truck: ['XL', 'XLT', 'Lariat', 'King Ranch', 'Limited', 'SR5', 'TRD Pro'],
  Coupe: ['Base', 'Sport', 'GT', 'Premium', 'Performance', 'Turbo'],
  Hatchback: ['S', 'SE', 'SEL', 'GTI', 'Sport', 'Turbo'],
  Convertible: ['Base', 'Sport', 'Premium', 'GT', 'Limited'],
  Wagon: ['Base', 'SE', 'SEL', 'Alltrack', 'Outback'],
};

// Generate listings from the vehicle database
const generateListingsFromDatabase = (): Listing[] => {
  const listings: Listing[] = [];
  let listingId = 1;

  vehicleDatabase.forEach((vehicle) => {
    // Generate more listings for popular/affordable vehicles (3-6), fewer for expensive ones (1-2)
    const isAffordable = vehicle.priceMin < 40000;
    const numListings = isAffordable 
      ? Math.floor(Math.random() * 4) + 3  // 3-6 listings for affordable vehicles
      : Math.floor(Math.random() * 2) + 1; // 1-2 listings for expensive vehicles
    const trims = trimOptions[vehicle.bodyStyle] || trimOptions['SUV'];

    for (let i = 0; i < numListings; i++) {
      const isNew = Math.random() > 0.7; // 30% new
      const isCertified = !isNew && Math.random() > 0.7; // 30% of used are CPO
      const isPriceReduced = !isNew && Math.random() > 0.75;
      const mileage = isNew ? Math.floor(Math.random() * 500) : Math.floor(Math.random() * 60000) + 5000;
      
      // Calculate price based on vehicle's price range and mileage
      const basePrice = vehicle.priceMin;
      const priceVariation = (vehicle.priceMax - vehicle.priceMin) * Math.random();
      const mileageDiscount = isNew ? 0 : (mileage / 100000) * basePrice * 0.3;
      const listingPrice = Math.round(basePrice + priceVariation - mileageDiscount);
      
      const originalPrice = isPriceReduced ? Math.round(listingPrice * (1 + Math.random() * 0.1)) : undefined;
      
      // Pick a random dealer
      const dealerList = dealers['Miami, FL'];
      const dealerName = `${dealerList[Math.floor(Math.random() * dealerList.length)]} ${vehicle.make}`;
      
      // Generate random distance
      const distance = Math.round((Math.random() * 25 + 1) * 10) / 10;
      
      // Pick a random trim
      const trim = trims[Math.floor(Math.random() * trims.length)];

      // Generate vehicle history for used vehicles
      const daysOnMarket = Math.floor(Math.random() * 60) + 1;
      const owners = isNew ? 0 : Math.floor(Math.random() * 3) + 1;
      const accidents = isNew ? 0 : (Math.random() > 0.85 ? Math.floor(Math.random() * 2) + 1 : 0);
      const serviceRecords = isNew ? 0 : Math.floor(Math.random() * 15) + 3;
      
      // Generate price history
      const priceHistory: PriceHistoryEntry[] = [];
      if (!isNew) {
        let historyPrice = originalPrice || Math.round(listingPrice * 1.08);
        const historyDays = [daysOnMarket, Math.floor(daysOnMarket * 0.6), Math.floor(daysOnMarket * 0.3)];
        historyDays.forEach((daysAgo, idx) => {
          if (daysAgo > 0) {
            const date = new Date();
            date.setDate(date.getDate() - daysAgo);
            const change = idx > 0 ? priceHistory[idx - 1].price - historyPrice : 0;
            priceHistory.push({
              date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
              price: historyPrice,
              change: change !== 0 ? change : undefined,
            });
            historyPrice = Math.round(historyPrice * (0.97 + Math.random() * 0.02));
          }
        });
        // Add current price
        priceHistory.push({
          date: 'Today',
          price: listingPrice,
          change: priceHistory.length > 0 ? priceHistory[priceHistory.length - 1].price - listingPrice : undefined,
        });
      }

      const history: VehicleHistory = {
        owners,
        accidents,
        serviceRecords,
        lastServiceDate: isNew ? undefined : new Date(Date.now() - Math.random() * 180 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
        titleStatus: accidents > 1 ? 'Rebuilt' : 'Clean',
        daysOnMarket,
        priceHistory,
        carfaxScore: isNew ? undefined : Math.floor(Math.random() * 30) + 70,
        personalUse: Math.random() > 0.2,
        fleetUse: Math.random() > 0.9,
        rentalUse: Math.random() > 0.92,
      };
      
      listings.push({
        id: `listing-${listingId++}`,
        year: parseInt(vehicle.year),
        make: vehicle.make,
        model: vehicle.model,
        trim: `${trim} ${vehicle.drivetrain || 'FWD'}`,
        price: listingPrice,
        originalPrice,
        mileage,
        image: vehicle.image, // Use actual vehicle image from database
        slug: vehicle.slug,
        bodyStyle: vehicle.bodyStyle,
        features: vehicle.features?.slice(0, 3) || ['Bluetooth', 'Backup Camera', 'Keyless Entry'],
        dealerName,
        dealerRating: Math.round((Math.random() * 1.5 + 3.5) * 10) / 10, // 3.5 - 5.0
        history: isNew ? undefined : history,
        distance,
        isNew,
        isCertified,
        priceReduced: isPriceReduced,
      });
    }
  });

  return listings;
};

// Cache generated listings
let cachedListings: Listing[] | null = null;

const getGeneratedListings = (): Listing[] => {
  if (!cachedListings) {
    cachedListings = generateListingsFromDatabase();
  }
  return cachedListings;
};

// Get listings based on parameters
export const getListingsNearYou = (params: ListingsParams): Listing[] => {
  let filteredListings = [...getGeneratedListings()];

  // Filter by max price if specified
  if (params.maxPrice) {
    filteredListings = filteredListings.filter(l => l.price <= params.maxPrice!);
  }

  // Prioritize same make AND model first, then same make, then same body style
  if (params.make && params.model) {
    // Split into categories for priority ordering
    const sameModelListings = filteredListings.filter(
      l => l.make === params.make && l.model === params.model
    );
    const sameMakeListings = filteredListings.filter(
      l => l.make === params.make && l.model !== params.model
    );
    const sameBodyStyleListings = filteredListings.filter(l => {
      if (l.make === params.make) return false; // Already included above
      if (!params.bodyStyle) return false;
      const vehicle = vehicleDatabase.find(v => v.slug === l.slug);
      return vehicle?.bodyStyle === params.bodyStyle;
    });
    const otherListings = filteredListings.filter(l => {
      if (l.make === params.make) return false;
      if (!params.bodyStyle) return true;
      const vehicle = vehicleDatabase.find(v => v.slug === l.slug);
      return vehicle?.bodyStyle !== params.bodyStyle;
    });

    // Combine with priority: same model > same make > same body style > others
    filteredListings = [
      ...sameModelListings,
      ...sameMakeListings,
      ...sameBodyStyleListings,
      ...otherListings
    ];
  } else if (params.make) {
    // Just prioritize same make
    const sameMake = filteredListings.filter(l => l.make === params.make);
    const otherMakes = filteredListings.filter(l => l.make !== params.make);
    filteredListings = [...sameMake, ...otherMakes];
  } else if (params.bodyStyle) {
    // Filter by body style only
    const vehiclesByBodyStyle = vehicleDatabase.filter(v => v.bodyStyle === params.bodyStyle);
    const validSlugs = new Set(vehiclesByBodyStyle.map(v => v.slug));
    const sameBodyStyle = filteredListings.filter(l => validSlugs.has(l.slug));
    const otherBodyStyles = filteredListings.filter(l => !validSlugs.has(l.slug));
    filteredListings = [...sameBodyStyle, ...otherBodyStyles];
  }

  // Sort each priority group by distance while maintaining priority order
  // We'll sort within groups by using a stable sort approach
  const sortByDistance = (listings: Listing[]) => 
    [...listings].sort((a, b) => a.distance - b.distance);

  // Re-sort to maintain priority but sort by distance within each group
  if (params.make && params.model) {
    const sameModel = sortByDistance(filteredListings.filter(
      l => l.make === params.make && l.model === params.model
    ));
    const sameMake = sortByDistance(filteredListings.filter(
      l => l.make === params.make && l.model !== params.model
    ));
    const others = sortByDistance(filteredListings.filter(l => l.make !== params.make));
    filteredListings = [...sameModel, ...sameMake, ...others];
  } else {
    filteredListings.sort((a, b) => a.distance - b.distance);
  }

  return filteredListings.slice(0, 10);
};

// Get listing count for a specific vehicle
export const getListingCount = (make: string, model: string): number => {
  const listings = getGeneratedListings();
  const baseCount = listings.filter(l => l.make === make && l.model === model).length;
  // Return a reasonable mock count
  return baseCount > 0 ? baseCount + Math.floor(Math.random() * 50) + 100 : 150;
};

// Reset cache (useful for testing)
export const resetListingsCache = () => {
  cachedListings = null;
};

// Get all listings (for browsing)
export const getAllListings = (): Listing[] => {
  return getGeneratedListings();
};

// Get unique makes from listings
export const getUniqueMakesFromListings = (): string[] => {
  const listings = getGeneratedListings();
  return [...new Set(listings.map(l => l.make))].sort();
};
