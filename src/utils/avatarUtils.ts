/**
 * Avatar Utilities
 * Helper functions for resolving user avatars from the vehicle database
 */

import { vehicleDatabase, coupes, suvs, sedans } from '../data/vehicles';

// Helper to find a vehicle by make and model
const findVehicle = (make: string, model: string) => 
  vehicleDatabase.find(v => v.make === make && v.model === model);

// Lifestyle avatar configurations - matching the dropdown options
const LIFESTYLE_AVATAR_CONFIG: Record<string, { make: string; model: string; fallback: typeof suvs }> = {
  'avatar-family': { make: 'Honda', model: 'Pilot', fallback: suvs },
  'avatar-adventure': { make: 'Jeep', model: 'Wrangler', fallback: suvs },
  'avatar-luxury': { make: 'Mercedes-Benz', model: 'S-Class', fallback: sedans },
  'avatar-eco-friendly': { make: 'Tesla', model: 'Model 3', fallback: sedans },
  'avatar-performance': { make: 'Porsche', model: '911', fallback: coupes },
  'avatar-commuter': { make: 'Toyota', model: 'Camry', fallback: sedans },
  'avatar-value': { make: 'Honda', model: 'Civic', fallback: sedans },
};

/**
 * Get the avatar image URL for a given avatar ID
 * @param avatarId - The avatar ID (e.g., 'avatar-family', 'initials')
 * @returns The image URL or null if using initials
 */
export const getAvatarImageUrl = (avatarId: string | undefined): string | null => {
  if (!avatarId || avatarId === 'initials') {
    return null;
  }

  const config = LIFESTYLE_AVATAR_CONFIG[avatarId];
  if (config) {
    const vehicle = findVehicle(config.make, config.model) || config.fallback[0];
    return vehicle?.image || null;
  }

  return null;
};

/**
 * Get user initials from name
 * @param name - User's full name
 * @returns Initials (1-2 characters)
 */
export const getUserInitials = (name: string | undefined): string => {
  if (!name) return 'U';
  const names = name.split(' ');
  if (names.length >= 2) {
    return `${names[0][0]}${names[1][0]}`.toUpperCase();
  }
  return names[0].substring(0, 2).toUpperCase();
};

export default {
  getAvatarImageUrl,
  getUserInitials,
};



