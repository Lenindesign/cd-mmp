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
    console.log('Fetching ratings from Supabase...');
    
    // Fetch all ratings from Supabase
    const { data, error } = await client
      .from('vehicle_ratings')
      .select('*');

    console.log('Supabase response:', { dataCount: data?.length, error: error?.message });

    if (error) {
      console.error('Supabase error:', error);
      return {
        statusCode: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ error: error.message, details: 'Failed to fetch from vehicle_ratings table' }),
      };
    }

    // Convert array to object keyed by "category-id"
    const ratings: Record<string, number> = {};
    if (data) {
      console.log(`Processing ${data.length} rating records...`);
      for (const row of data) {
        const key = `${row.category}-${row.id}`;
        ratings[key] = row.staff_rating;
        console.log(`Rating: ${key} = ${row.staff_rating}`);
      }
    }

    console.log(`Returning ${Object.keys(ratings).length} ratings`);
    
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ ratings, count: Object.keys(ratings).length }),
    };
  } catch (error) {
    console.error('Error fetching ratings:', error);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ error: 'Failed to fetch ratings', details: error instanceof Error ? error.message : 'Unknown error' }),
    };
  }
};

