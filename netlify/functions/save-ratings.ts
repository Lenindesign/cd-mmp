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
  console.log('[SAVE-RATINGS] Function invoked, method:', event.httpMethod);
  
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
    
    console.log('[SAVE-RATINGS] Parsing body:', event.body?.substring(0, 200));
    const { changes } = JSON.parse(event.body || '{}') as { changes: RatingChange[] };
    console.log('[SAVE-RATINGS] Parsed changes:', changes?.length || 0);

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
      console.log(`[SAVE] Processing change: id=${id}, category=${category}, newRating=${newRating}, originalRating=${originalRating}`);

      try {
        // First, try to select existing record
        const { data: existing, error: selectError } = await client
          .from('vehicle_ratings')
          .select('id, staff_rating')
          .eq('id', id)
          .eq('category', category)
          .single();

        console.log(`[SAVE] Select result for ${id}: existing=${JSON.stringify(existing)}, error=${selectError?.message || 'none'}`);

        let error;
        
        if (existing) {
          // Update existing record
          console.log(`[SAVE] Updating existing record for ${id} from ${existing.staff_rating} to ${newRating}`);
          const result = await client
            .from('vehicle_ratings')
            .update({
              staff_rating: newRating,
              updated_at: new Date().toISOString(),
            })
            .eq('id', id)
            .eq('category', category);
          error = result.error;
          console.log(`[SAVE] Update result for ${id}: error=${result.error?.message || 'none'}`);
        } else {
          // Insert new record
          console.log(`[SAVE] Inserting new record for ${id} with rating ${newRating}`);
          const result = await client
            .from('vehicle_ratings')
            .insert({
              id: id,
              category: category,
              staff_rating: newRating,
              updated_at: new Date().toISOString(),
            });
          error = result.error;
          console.log(`[SAVE] Insert result for ${id}: error=${result.error?.message || 'none'}`);
        }

        if (error) {
          console.error(`Error saving rating for ${id}:`, error);
          results.errors.push({
            id,
            category,
            error: error.message,
          });
        } else {
          // Log the change to history table
          console.log(`[DEBUG H1] Attempting to insert history for ${id}, category: ${category}, old: ${originalRating}, new: ${newRating}`);
          const historyResult = await client
            .from('rating_history')
            .insert({
              vehicle_id: id,
              category: category,
              old_rating: originalRating,
              new_rating: newRating,
              changed_at: new Date().toISOString(),
            });
          
          if (historyResult.error) {
            console.error(`[DEBUG H2] History insert FAILED for ${id}:`, historyResult.error.message, historyResult.error.details, historyResult.error.hint);
          } else {
            console.log(`[DEBUG H3] History insert SUCCESS for ${id}`);
          }
          
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

