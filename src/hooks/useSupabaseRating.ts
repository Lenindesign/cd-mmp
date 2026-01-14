import { useState, useEffect, useCallback } from 'react';

const isProduction = import.meta.env.PROD;

interface UseSupabaseRatingResult {
  rating: number;
  isLoading: boolean;
}

interface UseSupabaseRatingsResult {
  ratings: Record<string, number>;
  isLoading: boolean;
  getRating: (vehicleId: string, category: string, defaultRating: number) => number;
}

// Cache for ratings to avoid multiple fetches
let ratingsCache: Record<string, number> = {};
let fetchPromise: Promise<Record<string, number>> | null = null;
let hasFetched = false;

async function fetchAllRatings(): Promise<Record<string, number>> {
  if (hasFetched) return ratingsCache;
  
  if (fetchPromise) return fetchPromise;
  
  fetchPromise = (async () => {
    try {
      const response = await fetch('/.netlify/functions/get-ratings');
      if (response.ok) {
        const data = await response.json();
        ratingsCache = data.ratings || {};
        hasFetched = true;
        return ratingsCache;
      }
    } catch (error) {
      console.error('[useSupabaseRatings] Error fetching ratings:', error);
    }
    hasFetched = true;
    return ratingsCache;
  })();
  
  return fetchPromise;
}

/**
 * Hook to fetch the staff rating from Supabase in production.
 * Falls back to the provided default rating from JSON.
 * 
 * @param vehicleId - The vehicle ID (e.g., "1", "2", "sed-elec6")
 * @param category - The category (e.g., "sedans", "suvs")
 * @param defaultRating - The default rating from JSON data
 */
export function useSupabaseRating(
  vehicleId: string,
  category: string,
  defaultRating: number
): UseSupabaseRatingResult {
  const [rating, setRating] = useState<number>(defaultRating);
  const [isLoading, setIsLoading] = useState<boolean>(isProduction);

  useEffect(() => {
    // Only fetch from Supabase in production
    if (!isProduction) {
      setRating(defaultRating);
      setIsLoading(false);
      return;
    }

    const fetchRating = async () => {
      const ratings = await fetchAllRatings();
      const key = `${category}-${vehicleId}`;
      
      if (ratings[key] !== undefined) {
        setRating(ratings[key]);
      } else {
        setRating(defaultRating);
      }
      setIsLoading(false);
    };

    fetchRating();
  }, [vehicleId, category, defaultRating]);

  return { rating, isLoading };
}

/**
 * Hook to fetch all ratings from Supabase in production.
 * Provides a getRating function to look up ratings by vehicleId and category.
 */
export function useSupabaseRatings(): UseSupabaseRatingsResult {
  const [ratings, setRatings] = useState<Record<string, number>>({});
  const [isLoading, setIsLoading] = useState<boolean>(isProduction);

  useEffect(() => {
    if (!isProduction) {
      setIsLoading(false);
      return;
    }

    const loadRatings = async () => {
      const fetchedRatings = await fetchAllRatings();
      setRatings(fetchedRatings);
      setIsLoading(false);
    };

    loadRatings();
  }, []);

  const getRating = useCallback((vehicleId: string, category: string, defaultRating: number): number => {
    if (!isProduction) return defaultRating;
    
    const key = `${category}-${vehicleId}`;
    return ratings[key] !== undefined ? ratings[key] : defaultRating;
  }, [ratings]);

  return { ratings, isLoading, getRating };
}

/**
 * Convert bodyStyle to category name for Supabase lookup
 */
export function getCategory(bodyStyle: string): string {
  const categoryMap: Record<string, string> = {
    'Sedan': 'sedans',
    'SUV': 'suvs',
    'Truck': 'trucks',
    'Coupe': 'coupes',
    'Convertible': 'convertibles',
    'Wagon': 'wagons',
    'Hatchback': 'hatchbacks',
  };
  return categoryMap[bodyStyle] || bodyStyle.toLowerCase() + 's';
}

export default useSupabaseRating;

