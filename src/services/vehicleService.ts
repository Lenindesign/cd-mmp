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
export const getRankingVehicles = (bodyStyle: string, limit: number = 10): Vehicle[] => {
  return vehicleDatabase
    .filter(v => v.bodyStyle.toLowerCase() === bodyStyle.toLowerCase())
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
}

export const formatForBuyingPotential = (vehicle: Vehicle): BuyingPotentialVehicle => ({
  name: `${vehicle.year} ${vehicle.make} ${vehicle.model}`,
  price: vehicle.priceMin,
  image: vehicle.image,
  trim: vehicle.trim || vehicle.drivetrain || '',
  rating: vehicle.staffRating,
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
  isCurrentVehicle?: boolean;
  badge?: 'best-value' | 'editors-choice' | 'most-popular';
}

export const formatForRanking = (vehicle: Vehicle, rank: number, currentVehicleId?: string): RankedVehicle => {
  // Determine badge based on criteria
  let badge: 'best-value' | 'editors-choice' | 'most-popular' | undefined;
  if (vehicle.award === "Editor's Choice" || vehicle.staffRating >= 9.5) {
    badge = 'editors-choice';
  } else if (vehicle.priceMin < 25000 && vehicle.staffRating >= 8) {
    badge = 'best-value';
  } else if (vehicle.reviewCount && vehicle.reviewCount > 100) {
    badge = 'most-popular';
  }
  
  return {
    id: vehicle.id,
    rank,
    name: `${vehicle.make} ${vehicle.model}`,
    price: `$${vehicle.priceMin.toLocaleString()}`,
    image: vehicle.image,
    rating: vehicle.staffRating,
    isCurrentVehicle: vehicle.id === currentVehicleId,
    badge,
  };
};

// Get ranking vehicles formatted for VehicleRanking component
export const getRankingVehiclesFormatted = (
  bodyStyle: string,
  currentVehicleId?: string,
  limit: number = 10
): RankedVehicle[] => {
  return getRankingVehicles(bodyStyle, limit)
    .map((vehicle, index) => formatForRanking(vehicle, index + 1, currentVehicleId));
};

// Get the Chevrolet Trax (main vehicle for our page)
export const getChevroletTrax = (): Vehicle | undefined => {
  return vehicleDatabase.find(
    v => v.make === 'Chevrolet' && v.model === 'Trax' && v.year === '2025'
  );
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
};

