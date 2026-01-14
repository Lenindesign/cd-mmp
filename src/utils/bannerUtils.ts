/**
 * Banner Utilities
 * Helper functions for resolving user banners from the vehicle database
 */

import { vehicleDatabase } from '../data/vehicles';

// Helper to find a vehicle by make and model
const findVehicle = (make: string, model: string) => 
  vehicleDatabase.find(v => v.make === make && v.model === model);

// Banner configurations - IDs match the format: banner-{make}-{model} with spaces replaced by dashes
const BANNER_CONFIG: Record<string, { make: string; model: string }> = {
  'banner-chevrolet-corvette': { make: 'Chevrolet', model: 'Corvette' },
  'banner-land rover-range-rover': { make: 'Land Rover', model: 'Range Rover' },
  'banner-ford-bronco': { make: 'Ford', model: 'Bronco' },
  'banner-porsche-taycan': { make: 'Porsche', model: 'Taycan' },
  'banner-mercedes-benz-amg-gt': { make: 'Mercedes-Benz', model: 'AMG GT' },
  'banner-bmw-x5': { make: 'BMW', model: 'X5' },
};

// Default banner image
const DEFAULT_BANNER = 'https://d2kde5ohu8qb21.cloudfront.net/files/65a4ab44cd06f600080e4953/14-2024-kia-forte-front-view.jpg';

/**
 * Get the banner image URL for a given banner ID
 * @param bannerId - The banner ID (e.g., 'banner-chevrolet-corvette')
 * @returns The image URL
 */
export const getBannerImageUrl = (bannerId: string | undefined): string => {
  if (!bannerId) {
    return DEFAULT_BANNER;
  }

  const config = BANNER_CONFIG[bannerId];
  if (config) {
    const vehicle = findVehicle(config.make, config.model);
    // Prefer gallery images for banners as they're typically wider shots
    return vehicle?.galleryImages?.[0] || vehicle?.image || DEFAULT_BANNER;
  }

  return DEFAULT_BANNER;
};

export default {
  getBannerImageUrl,
};

