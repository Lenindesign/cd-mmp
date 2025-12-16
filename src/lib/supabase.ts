/**
 * Supabase Client Configuration
 * 
 * Environment variables required:
 * - VITE_SUPABASE_URL: Your Supabase project URL
 * - VITE_SUPABASE_ANON_KEY: Your Supabase anonymous key
 * 
 * Set these in:
 * - Local: .env.local file
 * - Production: Netlify environment variables
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if Supabase is configured
export const isSupabaseConfigured = !!(supabaseUrl && supabaseAnonKey);

// Create Supabase client (will be null if not configured)
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Type for vehicle rating update
export interface RatingUpdate {
  id: string;
  category: string;
  newRating: number;
  originalRating: number;
}

// Type for the result of saving ratings
export interface SaveRatingsResult {
  success: Array<{ id: string; category: string; oldRating: number; newRating: number }>;
  errors: Array<{ id: string; category: string; error: string }>;
}

/**
 * Save rating changes to Supabase
 * Falls back to local API if Supabase is not configured
 */
export async function saveRatings(changes: RatingUpdate[]): Promise<SaveRatingsResult> {
  // If Supabase is configured, use it
  if (isSupabaseConfigured && supabase) {
    return saveRatingsToSupabase(changes);
  }
  
  // Otherwise, fall back to local API server
  return saveRatingsToLocalAPI(changes);
}

/**
 * Save ratings to Supabase database
 */
async function saveRatingsToSupabase(changes: RatingUpdate[]): Promise<SaveRatingsResult> {
  const results: SaveRatingsResult = { success: [], errors: [] };

  for (const change of changes) {
    try {
      // Update the vehicle rating in Supabase
      // Assumes a 'vehicles' table with 'id', 'category', and 'staff_rating' columns
      const { error } = await supabase!
        .from('vehicles')
        .update({ staff_rating: change.newRating })
        .eq('id', change.id)
        .eq('category', change.category);

      if (error) {
        results.errors.push({
          id: change.id,
          category: change.category,
          error: error.message,
        });
      } else {
        results.success.push({
          id: change.id,
          category: change.category,
          oldRating: change.originalRating,
          newRating: change.newRating,
        });
      }
    } catch (err) {
      results.errors.push({
        id: change.id,
        category: change.category,
        error: err instanceof Error ? err.message : 'Unknown error',
      });
    }
  }

  return results;
}

/**
 * Save ratings to local API server (development fallback)
 */
async function saveRatingsToLocalAPI(changes: RatingUpdate[]): Promise<SaveRatingsResult> {
  const response = await fetch('http://localhost:3001/api/ratings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ changes }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to save ratings');
  }

  return response.json();
}

export default supabase;


