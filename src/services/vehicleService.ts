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
  const vehicles = getRankingVehicles(bodyStyle, limit, maxPrice);
  const rankedVehicles = vehicles.map((vehicle, index) => 
    formatForRanking(vehicle, index + 1, currentVehicleId)
  );
  
  // Find the best candidate for each badge (only one of each type)
  const editorsChoiceIdx = vehicles.findIndex(v => v.award === "Editor's Choice" || v.staffRating >= 9.5);
  const bestValueIdx = vehicles.findIndex(v => v.priceMin < 25000 && v.staffRating >= 8);
  
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
  // Get similar vehicles by body style and price range
  const priceRange = 10000;
  const similarVehicles = vehicleDatabase
    .filter(v => 
      v.bodyStyle.toLowerCase() === bodyStyle.toLowerCase() &&
      Math.abs(v.priceMin - currentMsrp) <= priceRange
    )
    .sort((a, b) => b.staffRating - a.staffRating)
    .slice(0, limit);

  // Generate simulated market data (in production this would come from real data)
  return similarVehicles.map((v, index) => {
    const isCurrentVehicle = v.make === currentMake && v.model === currentModel;
    // Simulate market data based on rating and price
    const baseSupply = Math.floor(30 + (10 - v.staffRating) * 5);
    const baseSold = Math.floor(100 + v.staffRating * 20);
    // Simulate average selling price (typically 5-15% below MSRP)
    const discount = 0.85 + Math.random() * 0.1;
    const avgSellingPrice = Math.round(v.priceMin * discount);
    
    return {
      id: v.id,
      name: `${v.year} ${v.make} ${v.model}`,
      make: v.make,
      model: v.model,
      slug: v.slug,
      price: v.priceMin,
      avgSellingPrice,
      rank: index + 1,
      marketDaySupply: baseSupply + Math.floor(Math.random() * 10),
      totalForSale: Math.floor(baseSold * 0.8) + Math.floor(Math.random() * 50),
      totalSold: baseSold + Math.floor(Math.random() * 30),
      isCurrentVehicle,
    };
  });
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

