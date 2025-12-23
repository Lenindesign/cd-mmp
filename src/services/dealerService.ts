/**
 * Dealer Service
 * Mock data and scoring algorithm for dealer locator
 */

export interface VehicleInventoryItem {
  trim: string;
  price: number;
  vin?: string;
  exteriorColor?: string;
  interiorColor?: string;
  isNew: boolean;
}

export interface Dealer {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  website?: string;
  lat: number;
  lng: number;
  rating: number;
  reviewCount: number;
  distance?: number; // miles from user
  inventory: VehicleInventoryItem[];
  hours?: {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
  };
  certifications?: string[];
  imageUrl?: string;
}

export interface DealScore {
  total: number;
  priceScore: number;
  distanceScore: number;
  ratingScore: number;
  inventoryBonus: number;
  isBestDeal: boolean;
}

export interface DealerWithScore extends Dealer {
  dealScore: DealScore;
  lowestPrice: number;
  highestPrice: number;
  inventoryCount: number;
}

export type SortOption = 'bestDeal' | 'distance' | 'price' | 'rating';

// Mock dealer data for Miami, FL area
const mockDealers: Dealer[] = [
  {
    id: 'dealer-1',
    name: 'AutoNation Chevrolet Pembroke Pines',
    address: '8600 Pines Blvd',
    city: 'Pembroke Pines',
    state: 'FL',
    zipCode: '33024',
    phone: '(954) 443-2100',
    website: 'https://www.autonationchevroletpembrokepines.com',
    lat: 26.0112,
    lng: -80.2945,
    rating: 4.8,
    reviewCount: 1247,
    inventory: [
      { trim: 'LS FWD', price: 21450, isNew: true, exteriorColor: 'Summit White', interiorColor: 'Jet Black' },
      { trim: 'LT FWD', price: 23200, isNew: true, exteriorColor: 'Mosaic Black', interiorColor: 'Jet Black' },
      { trim: 'RS FWD', price: 24890, isNew: true, exteriorColor: 'Cayenne Orange', interiorColor: 'Jet Black' },
    ],
    hours: {
      monday: '9:00 AM - 9:00 PM',
      tuesday: '9:00 AM - 9:00 PM',
      wednesday: '9:00 AM - 9:00 PM',
      thursday: '9:00 AM - 9:00 PM',
      friday: '9:00 AM - 9:00 PM',
      saturday: '9:00 AM - 8:00 PM',
      sunday: '11:00 AM - 6:00 PM',
    },
    certifications: ['Certified Pre-Owned', 'GM Dealer of Excellence'],
  },
  {
    id: 'dealer-2',
    name: 'Bomnin Chevrolet Dadeland',
    address: '8455 S Dixie Hwy',
    city: 'Miami',
    state: 'FL',
    zipCode: '33143',
    phone: '(305) 667-2601',
    website: 'https://www.bomninchevroletdadeland.com',
    lat: 25.6986,
    lng: -80.3106,
    rating: 4.5,
    reviewCount: 892,
    inventory: [
      { trim: '1RS FWD', price: 22100, isNew: true, exteriorColor: 'Sterling Gray', interiorColor: 'Jet Black' },
    ],
    hours: {
      monday: '9:00 AM - 9:00 PM',
      tuesday: '9:00 AM - 9:00 PM',
      wednesday: '9:00 AM - 9:00 PM',
      thursday: '9:00 AM - 9:00 PM',
      friday: '9:00 AM - 9:00 PM',
      saturday: '9:00 AM - 7:00 PM',
      sunday: '12:00 PM - 5:00 PM',
    },
    certifications: ['Certified Pre-Owned'],
  },
  {
    id: 'dealer-3',
    name: 'Williamson Chevrolet',
    address: '8655 NW 12th St',
    city: 'Miami',
    state: 'FL',
    zipCode: '33126',
    phone: '(305) 477-1000',
    website: 'https://www.williamsonchevrolet.com',
    lat: 25.7823,
    lng: -80.3389,
    rating: 4.2,
    reviewCount: 567,
    inventory: [
      { trim: 'LS FWD', price: 21895, isNew: true, exteriorColor: 'Summit White', interiorColor: 'Jet Black' },
      { trim: 'LT FWD', price: 23595, isNew: true, exteriorColor: 'Nitro Yellow', interiorColor: 'Jet Black' },
    ],
    hours: {
      monday: '8:30 AM - 8:00 PM',
      tuesday: '8:30 AM - 8:00 PM',
      wednesday: '8:30 AM - 8:00 PM',
      thursday: '8:30 AM - 8:00 PM',
      friday: '8:30 AM - 8:00 PM',
      saturday: '9:00 AM - 6:00 PM',
      sunday: 'Closed',
    },
  },
  {
    id: 'dealer-4',
    name: 'Brickell Chevrolet',
    address: '665 SW 8th St',
    city: 'Miami',
    state: 'FL',
    zipCode: '33130',
    phone: '(305) 856-3600',
    lat: 25.7654,
    lng: -80.2089,
    rating: 4.6,
    reviewCount: 1089,
    inventory: [
      { trim: 'ACTIV FWD', price: 24995, isNew: true, exteriorColor: 'Cacti Green', interiorColor: 'Medium Ash Gray' },
      { trim: 'RS FWD', price: 25200, isNew: true, exteriorColor: 'Mosaic Black', interiorColor: 'Jet Black' },
      { trim: 'LS FWD', price: 21650, isNew: true, exteriorColor: 'Summit White', interiorColor: 'Jet Black' },
      { trim: 'LT FWD', price: 23100, isNew: true, exteriorColor: 'Sterling Gray', interiorColor: 'Jet Black' },
    ],
    hours: {
      monday: '9:00 AM - 9:00 PM',
      tuesday: '9:00 AM - 9:00 PM',
      wednesday: '9:00 AM - 9:00 PM',
      thursday: '9:00 AM - 9:00 PM',
      friday: '9:00 AM - 9:00 PM',
      saturday: '9:00 AM - 8:00 PM',
      sunday: '10:00 AM - 7:00 PM',
    },
    certifications: ['Certified Pre-Owned', 'GM Dealer of Excellence', 'Mark of Excellence'],
  },
  {
    id: 'dealer-5',
    name: 'Medley Chevrolet',
    address: '9650 NW 77th Ave',
    city: 'Hialeah Gardens',
    state: 'FL',
    zipCode: '33016',
    phone: '(305) 556-2000',
    lat: 25.8756,
    lng: -80.3456,
    rating: 4.0,
    reviewCount: 345,
    inventory: [
      { trim: 'LS FWD', price: 21200, isNew: true, exteriorColor: 'Summit White', interiorColor: 'Jet Black' },
    ],
    hours: {
      monday: '9:00 AM - 8:00 PM',
      tuesday: '9:00 AM - 8:00 PM',
      wednesday: '9:00 AM - 8:00 PM',
      thursday: '9:00 AM - 8:00 PM',
      friday: '9:00 AM - 8:00 PM',
      saturday: '9:00 AM - 6:00 PM',
      sunday: 'Closed',
    },
  },
  {
    id: 'dealer-6',
    name: 'Kendall Chevrolet',
    address: '13001 S Dixie Hwy',
    city: 'Pinecrest',
    state: 'FL',
    zipCode: '33156',
    phone: '(305) 235-1800',
    lat: 25.6456,
    lng: -80.3234,
    rating: 4.7,
    reviewCount: 756,
    inventory: [
      { trim: 'LT FWD', price: 22800, isNew: true, exteriorColor: 'Cayenne Orange', interiorColor: 'Jet Black' },
      { trim: 'RS FWD', price: 24500, isNew: true, exteriorColor: 'Mosaic Black', interiorColor: 'Jet Black' },
    ],
    hours: {
      monday: '9:00 AM - 9:00 PM',
      tuesday: '9:00 AM - 9:00 PM',
      wednesday: '9:00 AM - 9:00 PM',
      thursday: '9:00 AM - 9:00 PM',
      friday: '9:00 AM - 9:00 PM',
      saturday: '9:00 AM - 7:00 PM',
      sunday: '11:00 AM - 5:00 PM',
    },
    certifications: ['Certified Pre-Owned'],
  },
];

/**
 * Calculate distance between two coordinates using Haversine formula
 */
function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 3959; // Earth's radius in miles
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 10) / 10; // Round to 1 decimal
}

function toRad(deg: number): number {
  return deg * (Math.PI / 180);
}

/**
 * Calculate deal score for a dealer
 * Score = (PriceScore * 0.4) + (DistanceScore * 0.3) + (RatingScore * 0.2) + (InventoryBonus * 0.1)
 */
function calculateDealScore(
  dealer: Dealer,
  allDealers: Dealer[],
  msrp: number
): DealScore {
  // Get all prices and distances for normalization
  const allPrices = allDealers.flatMap(d => d.inventory.map(i => i.price));
  const allDistances = allDealers.map(d => d.distance || 0).filter(d => d > 0);
  
  const minPrice = Math.min(...allPrices);
  const maxPrice = Math.max(...allPrices);
  const maxDistance = Math.max(...allDistances, 50); // Cap at 50 miles
  
  // Price Score (0-100, lower price = higher score)
  const lowestDealerPrice = Math.min(...dealer.inventory.map(i => i.price));
  const priceScore = maxPrice === minPrice 
    ? 100 
    : 100 - ((lowestDealerPrice - minPrice) / (maxPrice - minPrice)) * 100;
  
  // Distance Score (0-100, closer = higher score)
  const distance = dealer.distance || 0;
  const distanceScore = Math.max(0, 100 - (distance / maxDistance) * 100);
  
  // Rating Score (0-100, higher rating = higher score)
  const ratingScore = (dealer.rating / 5) * 100;
  
  // Inventory Bonus (0-10, more inventory = higher bonus)
  const inventoryBonus = Math.min(dealer.inventory.length * 3, 10);
  
  // Calculate total score
  const total = 
    priceScore * 0.4 + 
    distanceScore * 0.3 + 
    ratingScore * 0.2 + 
    inventoryBonus;
  
  return {
    total: Math.round(total * 10) / 10,
    priceScore: Math.round(priceScore * 10) / 10,
    distanceScore: Math.round(distanceScore * 10) / 10,
    ratingScore: Math.round(ratingScore * 10) / 10,
    inventoryBonus: Math.round(inventoryBonus * 10) / 10,
    isBestDeal: false, // Will be set after comparing all dealers
  };
}

/**
 * Get dealers with inventory for a specific vehicle
 */
export function getDealersForVehicle(
  make: string,
  model: string,
  userLat: number = 25.7617, // Default to Miami
  userLng: number = -80.1918,
  msrp: number = 21895
): DealerWithScore[] {
  // Filter dealers that have inventory (in real app, filter by make/model)
  const dealersWithInventory = mockDealers.filter(d => d.inventory.length > 0);
  
  // Calculate distances
  const dealersWithDistance = dealersWithInventory.map(dealer => ({
    ...dealer,
    distance: calculateDistance(userLat, userLng, dealer.lat, dealer.lng),
  }));
  
  // Calculate deal scores
  const dealersWithScores: DealerWithScore[] = dealersWithDistance.map(dealer => {
    const prices = dealer.inventory.map(i => i.price);
    return {
      ...dealer,
      dealScore: calculateDealScore(dealer, dealersWithDistance, msrp),
      lowestPrice: Math.min(...prices),
      highestPrice: Math.max(...prices),
      inventoryCount: dealer.inventory.length,
    };
  });
  
  // Find best deal and mark it
  const sortedByScore = [...dealersWithScores].sort((a, b) => b.dealScore.total - a.dealScore.total);
  if (sortedByScore.length > 0) {
    sortedByScore[0].dealScore.isBestDeal = true;
  }
  
  return dealersWithScores;
}

/**
 * Sort dealers by specified criteria
 */
export function sortDealers(
  dealers: DealerWithScore[],
  sortBy: SortOption
): DealerWithScore[] {
  const sorted = [...dealers];
  
  switch (sortBy) {
    case 'bestDeal':
      return sorted.sort((a, b) => b.dealScore.total - a.dealScore.total);
    case 'distance':
      return sorted.sort((a, b) => (a.distance || 0) - (b.distance || 0));
    case 'price':
      return sorted.sort((a, b) => a.lowestPrice - b.lowestPrice);
    case 'rating':
      return sorted.sort((a, b) => b.rating - a.rating);
    default:
      return sorted;
  }
}

/**
 * Get a single dealer by ID
 */
export function getDealerById(id: string): Dealer | undefined {
  return mockDealers.find(d => d.id === id);
}

/**
 * Format price as currency
 */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(price);
}

/**
 * Format distance with unit
 */
export function formatDistance(miles: number): string {
  if (miles < 1) {
    return `${Math.round(miles * 10) / 10} mi`;
  }
  return `${Math.round(miles * 10) / 10} mi`;
}

/**
 * Get price range string
 */
export function getPriceRange(lowestPrice: number, highestPrice: number): string {
  if (lowestPrice === highestPrice) {
    return formatPrice(lowestPrice);
  }
  return `${formatPrice(lowestPrice)} - ${formatPrice(highestPrice)}`;
}

