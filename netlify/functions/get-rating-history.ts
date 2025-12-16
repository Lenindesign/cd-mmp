import { createClient, SupabaseClient } from '@supabase/supabase-js';
import type { Handler } from '@netlify/functions';

// Create client lazily to ensure env vars are available
let supabase: SupabaseClient | null = null;

const getSupabaseClient = () => {
  if (!supabase) {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_ANON_KEY;
    
    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Missing Supabase configuration');
    }
    
    supabase = createClient(supabaseUrl, supabaseKey);
  }
  return supabase;
};

export const handler: Handler = async (event) => {
  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
      },
      body: '',
    };
  }

  try {
    const client = getSupabaseClient();
    
    // Get query parameters
    const { month, year, vehicle_id } = event.queryStringParameters || {};
    
    let query = client
      .from('rating_history')
      .select('*')
      .order('changed_at', { ascending: false });
    
    // Filter by month/year if provided
    if (month && year) {
      const startDate = new Date(parseInt(year), parseInt(month) - 1, 1);
      const endDate = new Date(parseInt(year), parseInt(month), 0, 23, 59, 59);
      query = query
        .gte('changed_at', startDate.toISOString())
        .lte('changed_at', endDate.toISOString());
    } else if (year) {
      const startDate = new Date(parseInt(year), 0, 1);
      const endDate = new Date(parseInt(year), 11, 31, 23, 59, 59);
      query = query
        .gte('changed_at', startDate.toISOString())
        .lte('changed_at', endDate.toISOString());
    }
    
    // Filter by vehicle if provided
    if (vehicle_id) {
      query = query.eq('vehicle_id', vehicle_id);
    }
    
    // Limit to last 500 entries
    query = query.limit(500);
    
    console.log(`[GET-HISTORY] Fetching history for year=${year}, month=${month}`);
    const { data, error } = await query;
    console.log(`[GET-HISTORY] Result: ${data?.length || 0} records, error: ${error?.message || 'none'}`);

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

    // Group by month for easier display
    const groupedByMonth: Record<string, any[]> = {};
    
    if (data) {
      for (const entry of data) {
        const date = new Date(entry.changed_at);
        const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        
        if (!groupedByMonth[monthKey]) {
          groupedByMonth[monthKey] = [];
        }
        groupedByMonth[monthKey].push(entry);
      }
    }

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ 
        history: data || [],
        groupedByMonth,
        count: data?.length || 0,
      }),
    };
  } catch (error) {
    console.error('Error fetching rating history:', error);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ error: 'Failed to fetch rating history' }),
    };
  }
};

