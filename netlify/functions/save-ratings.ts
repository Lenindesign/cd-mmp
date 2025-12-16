import { createClient, SupabaseClient } from '@supabase/supabase-js';
import type { Handler } from '@netlify/functions';

// Create client lazily to ensure env vars are available
let supabase: SupabaseClient | null = null;

const getSupabaseClient = () => {
  if (!supabase) {
    const supabaseUrl = process.env.SUPABASE_URL;
    // Try SERVICE_KEY first (preferred for write operations), fall back to ANON_KEY
    const supabaseKey = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_ANON_KEY;
    
    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Missing Supabase configuration: SUPABASE_URL and SUPABASE_SERVICE_KEY (or SUPABASE_ANON_KEY) required');
    }
    
    supabase = createClient(supabaseUrl, supabaseKey);
  }
  return supabase;
};

interface RatingChange {
  id: string;
  category: string;
  newRating: number;
  originalRating: number;
}

export const handler: Handler = async (event) => {
  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
      },
      body: '',
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    // Get Supabase client (will throw if env vars missing)
    let client: SupabaseClient;
    try {
      client = getSupabaseClient();
      console.log('Supabase client initialized successfully');
    } catch (configError) {
      console.error('Supabase configuration error:', configError);
      return {
        statusCode: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ error: 'Server configuration error: Missing database credentials' }),
      };
    }
    
    const { changes } = JSON.parse(event.body || '{}') as { changes: RatingChange[] };

    if (!changes || !Array.isArray(changes)) {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ error: 'Invalid request body. Expected { changes: [...] }' }),
      };
    }
    
    console.log(`Processing ${changes.length} rating changes...`);

    const results = { success: [] as any[], errors: [] as any[] };

    for (const change of changes) {
      const { id, category, newRating, originalRating } = change;

      try {
        // First, try to select existing record
        const { data: existing } = await client
          .from('vehicle_ratings')
          .select('id')
          .eq('id', id)
          .eq('category', category)
          .single();

        let error;
        
        if (existing) {
          // Update existing record
          const result = await client
            .from('vehicle_ratings')
            .update({
              staff_rating: newRating,
              updated_at: new Date().toISOString(),
            })
            .eq('id', id)
            .eq('category', category);
          error = result.error;
        } else {
          // Insert new record
          const result = await client
            .from('vehicle_ratings')
            .insert({
              id: id,
              category: category,
              staff_rating: newRating,
              updated_at: new Date().toISOString(),
            });
          error = result.error;
        }

        if (error) {
          console.error(`Error saving rating for ${id}:`, error);
          results.errors.push({
            id,
            category,
            error: error.message,
          });
        } else {
          results.success.push({
            id,
            category,
            oldRating: originalRating,
            newRating,
          });
        }
      } catch (err) {
        console.error(`Exception saving rating for ${id}:`, err);
        results.errors.push({
          id,
          category,
          error: err instanceof Error ? err.message : 'Unknown error',
        });
      }
    }

    const statusCode = results.errors.length > 0 ? 207 : 200;
    const message = results.errors.length > 0
      ? 'Some changes failed to save'
      : 'All changes saved successfully';

    return {
      statusCode,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ message, ...results }),
    };
  } catch (error) {
    console.error('Error saving ratings:', error);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ error: 'Failed to save ratings' }),
    };
  }
};

