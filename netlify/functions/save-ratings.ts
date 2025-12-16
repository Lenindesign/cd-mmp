import { createClient } from '@supabase/supabase-js';
import type { Handler } from '@netlify/functions';

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

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
    // Log environment check
    console.log('Supabase URL configured:', !!supabaseUrl);
    console.log('Supabase Key configured:', !!supabaseKey);
    
    if (!supabaseUrl || !supabaseKey) {
      console.error('Missing Supabase configuration');
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
        const { data: existing } = await supabase
          .from('vehicle_ratings')
          .select('id')
          .eq('vehicle_id', id)
          .eq('category', category)
          .single();

        let error;
        
        if (existing) {
          // Update existing record
          const result = await supabase
            .from('vehicle_ratings')
            .update({
              rating: newRating,
              updated_at: new Date().toISOString(),
            })
            .eq('vehicle_id', id)
            .eq('category', category);
          error = result.error;
        } else {
          // Insert new record
          const result = await supabase
            .from('vehicle_ratings')
            .insert({
              vehicle_id: id,
              category: category,
              rating: newRating,
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

