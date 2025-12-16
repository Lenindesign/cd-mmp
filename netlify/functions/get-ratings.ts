import { createClient, SupabaseClient } from '@supabase/supabase-js';
import type { Handler } from '@netlify/functions';

// Create client lazily to ensure env vars are available
let supabase: SupabaseClient | null = null;

const getSupabaseClient = () => {
  if (!supabase) {
    const supabaseUrl = process.env.SUPABASE_URL;
    // Try SERVICE_KEY first (preferred), fall back to ANON_KEY
    const supabaseKey = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_ANON_KEY;
    
    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Missing Supabase configuration: SUPABASE_URL and SUPABASE_SERVICE_KEY (or SUPABASE_ANON_KEY) required');
    }
    
    supabase = createClient(supabaseUrl, supabaseKey);
  }
  return supabase;
};

export const handler: Handler = async () => {
  try {
    const client = getSupabaseClient();
    
    // Fetch all ratings from Supabase
    const { data, error } = await client
      .from('vehicle_ratings')
      .select('*');

    if (error) {
      console.error('Supabase error:', error);
      return {
        statusCode: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ error: error.message }),
      };
    }

    // Convert array to object keyed by "category-id"
    const ratings: Record<string, number> = {};
    if (data) {
      for (const row of data) {
        const key = `${row.category}-${row.vehicle_id}`;
        ratings[key] = row.rating;
      }
    }

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ ratings }),
    };
  } catch (error) {
    console.error('Error fetching ratings:', error);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ error: 'Failed to fetch ratings' }),
    };
  }
};

