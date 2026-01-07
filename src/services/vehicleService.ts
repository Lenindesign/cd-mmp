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

// Get vehicle by slug (e.g., "2025/Chevrolet/Trax") - case insensitive
export const getVehicleBySlug = (slug: string): Vehicle | undefined => {
  return vehicleDatabase.find(v => v.slug.toLowerCase() === slug.toLowerCase());
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

// Get available years for a specific make and model
export const getAvailableYears = (make: string, model: string): string[] => {
  const years = vehicleDatabase
    .filter(v => 
      v.make.toLowerCase() === make.toLowerCase() &&
      v.model.toLowerCase() === model.toLowerCase()
    )
    .map(v => v.year);
  
  // Return unique years sorted in descending order (newest first)
  return [...new Set(years)].sort((a, b) => parseInt(b) - parseInt(a));
};

// Year detail interface for expanded years view
export interface YearDetail {
  year: number;
  price: string;
  rating: number;
}

// Get year details (price and rating) for a specific make and model
export const getYearDetails = (make: string, model: string): YearDetail[] => {
  const vehicles = vehicleDatabase
    .filter(v => 
      v.make.toLowerCase() === make.toLowerCase() &&
      v.model.toLowerCase() === model.toLowerCase()
    )
    .sort((a, b) => parseInt(b.year) - parseInt(a.year)); // Sort by year descending
  
  return vehicles.map(v => ({
    year: parseInt(v.year),
    price: `$${v.priceMin.toLocaleString()}`,
    rating: v.staffRating,
  }));
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
  badge?: 'best-value' | 'editors-choice';
  editorsChoice?: boolean;
  tenBest?: boolean;
  evOfTheYear?: boolean;
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
    editorsChoice: vehicle.editorsChoice,
    tenBest: vehicle.tenBest,
    evOfTheYear: vehicle.evOfTheYear,
  };
};

// Get ranking vehicles formatted for VehicleRanking component
export const getRankingVehiclesFormatted = (
  bodyStyle: string,
  currentVehicleId?: string,
  limit: number = 10,
  maxPrice?: number
): RankedVehicle[] => {
  // Get all vehicles in category to find current vehicle's rank
  const allVehiclesInCategory = getRankingVehicles(bodyStyle, 100, maxPrice);
  
  // Get top vehicles for display (limit - 1 to leave room for current vehicle)
  const topVehicles = getRankingVehicles(bodyStyle, limit - 1, maxPrice);
  
  // Check if current vehicle is already in top results
  const currentVehicleInTop = currentVehicleId 
    ? topVehicles.some(v => v.id === currentVehicleId)
    : false;
  
  // Find the current vehicle
  const currentVehicle = currentVehicleId 
    ? allVehiclesInCategory.find(v => v.id === currentVehicleId)
    : null;
  
  // Build the final list
  let vehiclesToDisplay: Vehicle[];
  if (currentVehicleInTop || !currentVehicle) {
    // Current vehicle is in top results or not found, just use top vehicles
    vehiclesToDisplay = getRankingVehicles(bodyStyle, limit, maxPrice);
  } else {
    // Current vehicle is not in top results, add it as the last card
    vehiclesToDisplay = [...topVehicles, currentVehicle];
  }
  
  // Format vehicles with their actual ranks
  const rankedVehicles = vehiclesToDisplay.map((vehicle) => {
    // Find actual rank in full category
    const actualRank = allVehiclesInCategory.findIndex(v => v.id === vehicle.id) + 1;
    return formatForRanking(vehicle, actualRank, currentVehicleId);
  });
  
  // Find the best candidate for each badge (only one of each type)
  const editorsChoiceIdx = vehiclesToDisplay.findIndex(v => v.award === "Editor's Choice" || v.staffRating >= 9.5);
  const bestValueIdx = vehiclesToDisplay.findIndex(v => v.priceMin < 25000 && v.staffRating >= 8);
  
  // Assign Editor's Choice badge
  if (editorsChoiceIdx !== -1) {
    rankedVehicles[editorsChoiceIdx].badge = 'editors-choice';
  }
  
  // Assign Best Value to a different vehicle if available
  if (bestValueIdx !== -1 && bestValueIdx !== editorsChoiceIdx) {
    rankedVehicles[bestValueIdx].badge = 'best-value';
  }
  
  return rankedVehicles;
};

// Get the Chevrolet Trax (main vehicle for our page)
export const getChevroletTrax = (): Vehicle | undefined => {
  return vehicleDatabase.find(
    v => v.make === 'Chevrolet' && v.model === 'Trax' && v.year === '2025'
  );
};

// Market Speed vehicle type
export interface MarketSpeedVehicle {
  id: string;
  name: string;
  make: string;
  model: string;
  slug: string;
  price: number;
  avgSellingPrice: number;
  rank: number;
  marketDaySupply: number;
  totalForSale: number;
  totalSold: number;
  isCurrentVehicle?: boolean;
}

// Get vehicles for MarketSpeed component
export const getMarketSpeedVehicles = (
  bodyStyle: string,
  currentMake: string,
  currentModel: string,
  currentMsrp: number,
  limit: number = 5
): MarketSpeedVehicle[] => {
  // Find the current vehicle first
  const currentVehicle = vehicleDatabase.find(
    v => v.make.toLowerCase() === currentMake.toLowerCase() && 
         v.model.toLowerCase() === currentModel.toLowerCase()
  );

  // Get similar vehicles by body style and price range
  const priceRange = 15000;
  const similarVehicles = vehicleDatabase
    .filter(v => 
      v.bodyStyle.toLowerCase() === bodyStyle.toLowerCase() &&
      Math.abs(v.priceMin - currentMsrp) <= priceRange &&
      !(v.make.toLowerCase() === currentMake.toLowerCase() && v.model.toLowerCase() === currentModel.toLowerCase())
    )
    .slice(0, limit - 1);

  // Combine current vehicle with similar vehicles
  const allVehicles = currentVehicle 
    ? [currentVehicle, ...similarVehicles]
    : similarVehicles.slice(0, limit);

  // Generate simulated market data for each vehicle first
  // Use a seeded approach based on vehicle properties for consistent results
  const vehiclesWithData = allVehicles.map((v) => {
    const isCurrentVehicle = v.make.toLowerCase() === currentMake.toLowerCase() && 
                             v.model.toLowerCase() === currentModel.toLowerCase();
    
    // Create a simple hash from vehicle properties for consistent random-like values
    const idStr = String(v.id || '0');
    const makeStr = String(v.make || 'Unknown');
    const modelStr = String(v.model || 'Unknown');
    const seed1 = (idStr.charCodeAt(0) || 48) + (makeStr.charCodeAt(0) || 65);
    const seed2 = (idStr.charCodeAt(Math.min(1, idStr.length - 1)) || 48) + (modelStr.charCodeAt(0) || 65);
    const seed3 = (makeStr.charCodeAt(Math.min(1, makeStr.length - 1)) || 65) + (modelStr.charCodeAt(Math.min(1, modelStr.length - 1)) || 65);
    
    // Ensure we have valid numbers
    const staffRating = v.staffRating || 7;
    const priceMin = v.priceMin || 30000;
    
    // Generate consistent market data based on vehicle properties
    // Higher rated vehicles sell faster (lower market day supply)
    const ratingFactor = staffRating / 10;
    const priceFactor = priceMin / 50000; // Normalize price
    
    // Market day supply: lower is better (faster selling)
    // Base range 20-60 days, better ratings = faster sales
    const baseSupply = Math.floor(60 - (ratingFactor * 30) + (priceFactor * 10));
    const marketDaySupply = Math.max(15, Math.min(65, baseSupply + (seed1 % 10)));
    
    // Total sold correlates with rating and price accessibility
    const baseSold = Math.floor(80 + (ratingFactor * 100) - (priceFactor * 20));
    const totalSold = Math.max(50, baseSold + (seed2 % 30));
    
    // Total for sale
    const totalForSale = Math.floor(totalSold * 0.7) + (seed3 % 40);
    
    // Average selling price (typically 5-15% below MSRP)
    const discountPercent = 0.85 + ((seed1 % 10) / 100);
    const avgSellingPrice = Math.round(priceMin * discountPercent);
    
    return {
      vehicle: v,
      isCurrentVehicle,
      marketDaySupply,
      totalForSale,
      totalSold,
      avgSellingPrice,
    };
  });

  // Sort by market day supply (fastest selling first = lowest days)
  vehiclesWithData.sort((a, b) => a.marketDaySupply - b.marketDaySupply);

  // Assign ranks and return final data
  return vehiclesWithData.map((data, index) => ({
    id: data.vehicle.id,
    name: `${data.vehicle.year} ${data.vehicle.make} ${data.vehicle.model}`,
    make: data.vehicle.make,
    model: data.vehicle.model,
    slug: data.vehicle.slug,
    price: data.vehicle.priceMin,
    avgSellingPrice: data.avgSellingPrice,
    rank: index + 1,
    marketDaySupply: data.marketDaySupply,
    totalForSale: data.totalForSale,
    totalSold: data.totalSold,
    isCurrentVehicle: data.isCurrentVehicle,
  }));
};

// Get the current vehicle's rank within its category
export const getCurrentVehicleRank = (
  bodyStyle: string,
  vehicleId: string,
  maxPrice?: number
): number => {
  const rankedVehicles = getRankingVehicles(bodyStyle, 100, maxPrice);
  const index = rankedVehicles.findIndex(v => v.id === vehicleId);
  return index !== -1 ? index + 1 : 1;
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
  getAvailableYears,
  getPriceRangeStats,
  getBuyingPotentialVehicles,
  getComparisonVehicles,
  getRankingVehiclesFormatted,
  getChevroletTrax,
  getMarketSpeedVehicles,
  getCurrentVehicleRank,
};

