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

    const results = { success: [] as any[], errors: [] as any[] };

    for (const change of changes) {
      const { id, category, newRating, originalRating } = change;

      try {
        // Upsert the rating (insert or update)
        const { error } = await supabase
          .from('vehicle_ratings')
          .upsert(
            {
              vehicle_id: id,
              category: category,
              rating: newRating,
              updated_at: new Date().toISOString(),
            },
            {
              onConflict: 'vehicle_id,category',
            }
          );

        if (error) {
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

