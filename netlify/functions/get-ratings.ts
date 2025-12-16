import { createClient } from '@supabase/supabase-js';
import type { Handler } from '@netlify/functions';

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

export const handler: Handler = async () => {
  try {
    // Fetch all ratings from Supabase
    const { data, error } = await supabase
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

