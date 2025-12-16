import { useState, useEffect } from 'react';

const isProduction = import.meta.env.PROD;

interface UseSupabaseRatingResult {
  rating: number;
  isLoading: boolean;
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
      try {
        const response = await fetch('/.netlify/functions/get-ratings');
        if (response.ok) {
          const data = await response.json();
          const key = `${category}-${vehicleId}`;
          
          if (data.ratings && data.ratings[key] !== undefined) {
            console.log(`[useSupabaseRating] Found rating for ${key}: ${data.ratings[key]}`);
            setRating(data.ratings[key]);
          } else {
            console.log(`[useSupabaseRating] No Supabase rating for ${key}, using default: ${defaultRating}`);
            setRating(defaultRating);
          }
        } else {
          console.error('[useSupabaseRating] Failed to fetch ratings:', response.status);
          setRating(defaultRating);
        }
      } catch (error) {
        console.error('[useSupabaseRating] Error fetching rating:', error);
        setRating(defaultRating);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRating();
  }, [vehicleId, category, defaultRating]);

  return { rating, isLoading };
}

export default useSupabaseRating;

