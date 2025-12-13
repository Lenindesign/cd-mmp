/**
 * Vehicle Service
 * Provides easy access to vehicle database with helper functions for querying and filtering
 */

import vehicleDatabase, { suvs, sedans, trucks, coupes, hatchbacks, convertibles, wagons } from '../data/vehicles';
import type { Vehicle } from '../types/vehicle';

// Re-export types
export type { Vehicle };

// Re-export category arrays
export { suvs, sedans, trucks, coupes, hatchbacks, convertibles, wagons };

// Get all vehicles
export const getAllVehicles = (): Vehicle[] => vehicleDatabase;

// Get vehicle by ID
export const getVehicleById = (id: string): Vehicle | undefined => {
  return vehicleDatabase.find(v => v.id === id);
};

// Get vehicle by slug (e.g., "2025/Chevrolet/Trax")
export const getVehicleBySlug = (slug: string): Vehicle | undefined => {
  return vehicleDatabase.find(v => v.slug === slug);
};

// Get vehicles by make
export const getVehiclesByMake = (make: string): Vehicle[] => {
  return vehicleDatabase.filter(v => v.make.toLowerCase() === make.toLowerCase());
};

// Get vehicles by body style
export const getVehiclesByBodyStyle = (bodyStyle: string): Vehicle[] => {
  return vehicleDatabase.filter(v => v.bodyStyle.toLowerCase() === bodyStyle.toLowerCase());
};

// Get vehicles within price range
export const getVehiclesInPriceRange = (minPrice: number, maxPrice: number): Vehicle[] => {
  return vehicleDatabase.filter(v => v.priceMin >= minPrice && v.priceMax <= maxPrice);
};

// Get vehicles under a certain price
export const getVehiclesUnderPrice = (maxPrice: number): Vehicle[] => {
  return vehicleDatabase.filter(v => v.priceMin <= maxPrice).sort((a, b) => a.priceMin - b.priceMin);
};

// Get featured vehicles
export const getFeaturedVehicles = (): Vehicle[] => {
  return vehicleDatabase.filter(v => v.featured);
};

// Get vehicles with award
export const getVehiclesWithAward = (): Vehicle[] => {
  return vehicleDatabase.filter(v => v.award);
};

// Get top rated vehicles
export const getTopRatedVehicles = (limit: number = 10): Vehicle[] => {
  return [...vehicleDatabase]
    .sort((a, b) => b.staffRating - a.staffRating)
    .slice(0, limit);
};

// Get similar vehicles (same body style, similar price)
export const getSimilarVehicles = (vehicle: Vehicle, limit: number = 6): Vehicle[] => {
  const priceRange = 10000; // $10k range
  return vehicleDatabase
    .filter(v => 
      v.id !== vehicle.id &&
      v.bodyStyle === vehicle.bodyStyle &&
      Math.abs(v.priceMin - vehicle.priceMin) <= priceRange
    )
    .sort((a, b) => b.staffRating - a.staffRating)
    .slice(0, limit);
};

// Get competitor vehicles (different makes, same body style, similar price)
export const getCompetitorVehicles = (vehicle: Vehicle, limit: number = 6): Vehicle[] => {
  const priceRange = 15000; // $15k range
  return vehicleDatabase
    .filter(v => 
      v.id !== vehicle.id &&
      v.make !== vehicle.make &&
      v.bodyStyle === vehicle.bodyStyle &&
      Math.abs(v.priceMin - vehicle.priceMin) <= priceRange
    )
    .sort((a, b) => b.staffRating - a.staffRating)
    .slice(0, limit);
};

// Search vehicles by name (make + model)
export const searchVehicles = (query: string): Vehicle[] => {
  const lowerQuery = query.toLowerCase();
  return vehicleDatabase.filter(v => 
    `${v.year} ${v.make} ${v.model}`.toLowerCase().includes(lowerQuery) ||
    v.make.toLowerCase().includes(lowerQuery) ||
    v.model.toLowerCase().includes(lowerQuery)
  );
};

// Get vehicles for "vehicles in your budget" feature
export const getVehiclesInBudget = (budget: number, bodyStyle?: string): Vehicle[] => {
  return vehicleDatabase
    .filter(v => {
      const inBudget = v.priceMin <= budget;
      const matchesBodyStyle = !bodyStyle || v.bodyStyle.toLowerCase() === bodyStyle.toLowerCase();
      return inBudget && matchesBodyStyle;
    })
    .sort((a, b) => a.priceMin - b.priceMin);
};

// Get ranking vehicles (for "Where This Vehicle Ranks" component)
export const getRankingVehicles = (bodyStyle: string, limit: number = 10, maxPrice?: number): Vehicle[] => {
  return vehicleDatabase
    .filter(v => {
      const matchesBodyStyle = v.bodyStyle.toLowerCase() === bodyStyle.toLowerCase();
      const matchesPrice = !maxPrice || v.priceMin <= maxPrice;
      return matchesBodyStyle && matchesPrice;
    })
    .sort((a, b) => b.staffRating - a.staffRating)
    .slice(0, limit);
};

// Get subcompact SUVs (SUVs under $35,000)
export const getSubcompactSUVs = (limit: number = 10): Vehicle[] => {
  const SUBCOMPACT_MAX_PRICE = 35000;
  return vehicleDatabase
    .filter(v => v.bodyStyle === 'SUV' && v.priceMin <= SUBCOMPACT_MAX_PRICE)
    .sort((a, b) => b.staffRating - a.staffRating)
    .slice(0, limit);
};

// Get unique makes
export const getUniqueMakes = (): string[] => {
  return [...new Set(vehicleDatabase.map(v => v.make))].sort();
};

// Get unique body styles
export const getUniqueBodyStyles = (): string[] => {
  return [...new Set(vehicleDatabase.map(v => v.bodyStyle))].sort();
};

// Get price range stats
export const getPriceRangeStats = (): { min: number; max: number; average: number } => {
  const prices = vehicleDatabase.map(v => v.priceMin);
  return {
    min: Math.min(...prices),
    max: Math.max(...prices),
    average: prices.reduce((a, b) => a + b, 0) / prices.length,
  };
};

// Format vehicle for BuyingPotential component
export interface BuyingPotentialVehicle {
  name: string;
  price: number;
  image: string;
  trim: string;
  rating: number;
  slug: string;
}

export const formatForBuyingPotential = (vehicle: Vehicle): BuyingPotentialVehicle => ({
  name: `${vehicle.year} ${vehicle.make} ${vehicle.model}`,
  price: vehicle.priceMin,
  image: vehicle.image,
  trim: vehicle.trim || vehicle.drivetrain || '',
  rating: vehicle.staffRating,
  slug: vehicle.slug,
});

// Get vehicles formatted for BuyingPotential
export const getBuyingPotentialVehicles = (budget: number, limit: number = 15, bodyStyle?: string): BuyingPotentialVehicle[] => {
  return getVehiclesInBudget(budget, bodyStyle)
    .slice(0, limit)
    .map(formatForBuyingPotential);
};

// Format vehicle for Comparison component
export interface ComparisonVehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  price: string;
  mpg: string;
  rating: number;
  image: string;
  slug: string;
  review?: string;
  hasEditorChoice?: boolean;
}

export const formatForComparison = (vehicle: Vehicle): ComparisonVehicle => ({
  id: vehicle.id,
  make: vehicle.make,
  model: vehicle.model,
  year: parseInt(vehicle.year),
  price: vehicle.priceRange,
  mpg: vehicle.mpg || 'N/A',
  rating: vehicle.staffRating,
  image: vehicle.image,
  slug: vehicle.slug,
  review: `The ${vehicle.make} ${vehicle.model} offers ${vehicle.features?.slice(0, 2).join(' and ') || 'excellent features'}.`,
  hasEditorChoice: vehicle.award === "Editor's Choice" || vehicle.staffRating >= 9,
});

// Get comparison vehicles
export const getComparisonVehicles = (currentVehicle: { make: string; model: string }, limit: number = 6): ComparisonVehicle[] => {
  const current = vehicleDatabase.find(
    v => v.make.toLowerCase() === currentVehicle.make.toLowerCase() &&
         v.model.toLowerCase() === currentVehicle.model.toLowerCase()
  );
  
  if (!current) {
    // Return top rated SUVs if current vehicle not found
    return getTopRatedVehicles(limit)
      .filter(v => v.bodyStyle === 'SUV')
      .map(formatForComparison);
  }
  
  return getCompetitorVehicles(current, limit).map(formatForComparison);
};

// Format vehicle for VehicleRanking component
export interface RankedVehicle {
  id: string;
  rank: number;
  name: string;
  price: string;
  image: string;
  rating: number;
  slug: string;
  isCurrentVehicle?: boolean;
  badge?: 'best-value' | 'editors-choice' | 'most-popular';
}

export const formatForRanking = (vehicle: Vehicle, rank: number, currentVehicleId?: string): RankedVehicle => {
  // Badge is determined after all vehicles are processed (see getRankingVehiclesFormatted)
  return {
    id: vehicle.id,
    rank,
    name: `${vehicle.make} ${vehicle.model}`,
    price: `$${vehicle.priceMin.toLocaleString()}`,
    image: vehicle.image,
    rating: vehicle.staffRating,
    slug: vehicle.slug,
    isCurrentVehicle: vehicle.id === currentVehicleId,
    badge: undefined,
  };
};

// Get ranking vehicles formatted for VehicleRanking component
export const getRankingVehiclesFormatted = (
  bodyStyle: string,
  currentVehicleId?: string,
  limit: number = 10,
  maxPrice?: number
): RankedVehicle[] => {
  // Get more vehicles than limit to find current vehicle's rank
  const allVehicles = getRankingVehicles(bodyStyle, 100, maxPrice);
  const vehicles = allVehicles.slice(0, limit);
  
  let rankedVehicles = vehicles.map((vehicle, index) => 
    formatForRanking(vehicle, index + 1, currentVehicleId)
  );
  
  // Check if current vehicle is in the top 'limit' vehicles
  const currentVehicleInTop = rankedVehicles.some(v => v.isCurrentVehicle);
  
  // If current vehicle is not in top vehicles, find its actual rank and replace the last one
  if (!currentVehicleInTop && currentVehicleId) {
    const currentVehicleIndex = allVehicles.findIndex(v => v.id === currentVehicleId);
    
    if (currentVehicleIndex !== -1) {
      const currentVehicle = allVehicles[currentVehicleIndex];
      const currentVehicleRanked = formatForRanking(currentVehicle, currentVehicleIndex + 1, currentVehicleId);
      
      // Replace the last vehicle with the current vehicle
      rankedVehicles = rankedVehicles.slice(0, limit - 1);
      rankedVehicles.push(currentVehicleRanked);
    }
  }
  
  // Find the best candidate for each badge (only one of each type)
  const editorsChoiceIdx = vehicles.findIndex(v => v.award === "Editor's Choice" || v.staffRating >= 9.5);
  const bestValueIdx = vehicles.findIndex(v => v.priceMin < 25000 && v.staffRating >= 8);
  const mostPopularIdx = vehicles.findIndex(v => v.reviewCount && v.reviewCount > 150);
  
  // Assign Editor's Choice badge
  if (editorsChoiceIdx !== -1 && rankedVehicles[editorsChoiceIdx]) {
    rankedVehicles[editorsChoiceIdx].badge = 'editors-choice';
  }
  
  // Assign Best Value to a different vehicle if available
  if (bestValueIdx !== -1 && bestValueIdx !== editorsChoiceIdx && rankedVehicles[bestValueIdx]) {
    rankedVehicles[bestValueIdx].badge = 'best-value';
  }
  
  // Assign Most Popular to a different vehicle if available
  if (mostPopularIdx !== -1 && mostPopularIdx !== editorsChoiceIdx && mostPopularIdx !== bestValueIdx && rankedVehicles[mostPopularIdx]) {
    rankedVehicles[mostPopularIdx].badge = 'most-popular';
  }
  
  return rankedVehicles;
};

// Get the current vehicle's rank in its category
export const getCurrentVehicleRank = (
  bodyStyle: string,
  currentVehicleId: string,
  maxPrice?: number
): number => {
  const allVehicles = getRankingVehicles(bodyStyle, 100, maxPrice);
  const index = allVehicles.findIndex(v => v.id === currentVehicleId);
  return index !== -1 ? index + 1 : 1;
};

// Get the Chevrolet Trax (main vehicle for our page)
export const getChevroletTrax = (): Vehicle | undefined => {
  return vehicleDatabase.find(
    v => v.make === 'Chevrolet' && v.model === 'Trax' && v.year === '2025'
  );
};

// ============================================
// Market Speed Component Functions
// ============================================

export interface MarketSpeedVehicle {
  rank: number;
  make: string;
  model: string;
  marketDaySupply: number;
  totalForSale: number;
  totalSold: number;
  avgSellingPrice: number;
  slug: string;
  isCurrentVehicle: boolean;
}

// Generate realistic market data based on vehicle characteristics
const generateMarketData = (vehicle: Vehicle, rank: number): Omit<MarketSpeedVehicle, 'isCurrentVehicle'> => {
  // Base values adjusted by staff rating and price
  const popularityFactor = vehicle.staffRating / 10;
  const priceFactor = Math.max(0.5, 1 - (vehicle.priceMin / 100000)); // Lower price = more sales
  
  // Market day supply: Lower is better (faster selling)
  // Higher rated, lower priced vehicles sell faster
  const baseSupply = 30;
  const marketDaySupply = Math.round(baseSupply - (popularityFactor * 15) - (priceFactor * 5) + (rank * 2));
  
  // Total for sale: Based on popularity and brand presence
  const baseForSale = 4000;
  const forSaleVariance = Math.random() * 2000;
  const totalForSale = Math.round((baseForSale + forSaleVariance) * popularityFactor);
  
  // Total sold: Related to market day supply and availability
  const baseSold = 7000;
  const soldVariance = Math.random() * 3000;
  const totalSold = Math.round((baseSold + soldVariance) * popularityFactor * priceFactor);
  
  // Average selling price: Slightly below MSRP based on market conditions
  const discountRate = vehicle.priceMin > 50000 ? 0.02 : 0.05; // Luxury vehicles have smaller discounts
  const avgSellingPrice = Math.round(vehicle.priceMin * (1 - discountRate + (Math.random() * 0.03)));
  
  return {
    rank,
    make: vehicle.make,
    model: vehicle.model,
    marketDaySupply: Math.max(10, Math.min(60, marketDaySupply)),
    totalForSale: Math.max(500, totalForSale),
    totalSold: Math.max(1000, totalSold),
    avgSellingPrice,
    slug: vehicle.slug,
  };
};

// Get vehicles for Market Speed component
export const getMarketSpeedVehicles = (
  bodyStyle: string,
  currentMake: string,
  currentModel: string,
  currentMsrp: number,
  limit: number = 5
): MarketSpeedVehicle[] => {
  // Get similar vehicles by body style and price range
  const priceRange = currentMsrp * 0.3; // 30% price range
  const minPrice = currentMsrp - priceRange;
  const maxPrice = currentMsrp + priceRange;
  
  // Find the current vehicle first
  const currentVehicle = vehicleDatabase.find(
    v => v.make === currentMake && v.model === currentModel
  );
  
  // Get competitors in the same segment
  const competitors = vehicleDatabase
    .filter(v => 
      v.bodyStyle.toLowerCase() === bodyStyle.toLowerCase() &&
      v.priceMin >= minPrice &&
      v.priceMin <= maxPrice &&
      !(v.make === currentMake && v.model === currentModel)
    )
    .sort((a, b) => b.staffRating - a.staffRating)
    .slice(0, limit - 1);
  
  // Combine current vehicle with competitors
  const allVehicles: Vehicle[] = currentVehicle 
    ? [currentVehicle, ...competitors]
    : competitors;
  
  // Sort by staff rating (higher = faster selling = rank 1)
  const sortedVehicles = allVehicles.sort((a, b) => b.staffRating - a.staffRating);
  
  // Generate market data for each vehicle
  return sortedVehicles.map((vehicle, index) => ({
    ...generateMarketData(vehicle, index + 1),
    isCurrentVehicle: vehicle.make === currentMake && vehicle.model === currentModel,
  }));
};

// Get available years for a make/model
export const getAvailableYears = (make: string, model: string): string[] => {
  const years = vehicleDatabase
    .filter(v => 
      v.make.toLowerCase() === make.toLowerCase() && 
      v.model.toLowerCase() === model.toLowerCase()
    )
    .map(v => String(v.year))
    .filter((year, index, self) => self.indexOf(year) === index) // unique years
    .sort((a, b) => parseInt(b) - parseInt(a)); // newest first
  
  return years.length > 0 ? years : [String(new Date().getFullYear())];
};

// Default export
export default {
  getAllVehicles,
  getVehicleById,
  getVehicleBySlug,
  getVehiclesByMake,
  getVehiclesByBodyStyle,
  getVehiclesInPriceRange,
  getVehiclesUnderPrice,
  getFeaturedVehicles,
  getVehiclesWithAward,
  getTopRatedVehicles,
  getSimilarVehicles,
  getCompetitorVehicles,
  searchVehicles,
  getVehiclesInBudget,
  getRankingVehicles,
  getUniqueMakes,
  getUniqueBodyStyles,
  getPriceRangeStats,
  getBuyingPotentialVehicles,
  getComparisonVehicles,
  getRankingVehiclesFormatted,
  getChevroletTrax,
  getMarketSpeedVehicles,
  getAvailableYears,
};

