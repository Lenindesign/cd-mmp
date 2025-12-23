/**
 * Recently Viewed Vehicles Service
 * Tracks and manages recently viewed vehicles in localStorage
 */

export interface RecentlyViewedVehicle {
  id: string;
  name: string;
  slug: string;
  image: string;
  price: number;
  mileage?: number;
  viewedAt: string; // ISO date string
}

const STORAGE_KEY = 'recentlyViewedVehicles';
const MAX_ITEMS = 20;

/**
 * Get all recently viewed vehicles from localStorage
 */
export const getRecentlyViewed = (): RecentlyViewedVehicle[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    return JSON.parse(stored);
  } catch {
    return [];
  }
};

/**
 * Add a vehicle to the recently viewed list
 * - Prevents duplicates (moves existing to top)
 * - Limits list to MAX_ITEMS
 */
export const addRecentlyViewed = (vehicle: {
  id: string;
  year: number | string;
  make: string;
  model: string;
  slug: string;
  image: string;
  priceMin: number;
  mileage?: number;
}): void => {
  try {
    const existing = getRecentlyViewed();
    
    // Create the new entry
    const newEntry: RecentlyViewedVehicle = {
      id: vehicle.id,
      name: `${vehicle.year} ${vehicle.make} ${vehicle.model}`,
      slug: vehicle.slug,
      image: vehicle.image,
      price: vehicle.priceMin,
      mileage: vehicle.mileage,
      viewedAt: new Date().toISOString(),
    };
    
    // Remove any existing entry for this vehicle (by id or slug)
    const filtered = existing.filter(
      v => v.id !== vehicle.id && v.slug !== vehicle.slug
    );
    
    // Add new entry at the beginning
    const updated = [newEntry, ...filtered].slice(0, MAX_ITEMS);
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error('Error saving recently viewed vehicle:', error);
  }
};

/**
 * Remove a vehicle from the recently viewed list
 */
export const removeRecentlyViewed = (vehicleId: string): void => {
  try {
    const existing = getRecentlyViewed();
    const filtered = existing.filter(v => v.id !== vehicleId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  } catch (error) {
    console.error('Error removing recently viewed vehicle:', error);
  }
};

/**
 * Clear all recently viewed vehicles
 */
export const clearRecentlyViewed = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing recently viewed vehicles:', error);
  }
};



