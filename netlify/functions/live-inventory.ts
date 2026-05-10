import type { Handler } from '@netlify/functions';
import { fetchLiveInventory } from '../../server/liveInventory';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
};

export const handler: Handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: '',
    };
  }

  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const make = event.queryStringParameters?.make || '';
    const model = event.queryStringParameters?.model || '';
    const year = Number(event.queryStringParameters?.year || '');

    if (!make || !model) {
      return {
        statusCode: 400,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ error: 'Missing make or model' }),
      };
    }

    const inventory = await fetchLiveInventory({
      make,
      model,
      year: Number.isFinite(year) ? year : undefined,
    });

    return {
      statusCode: 200,
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=300, stale-while-revalidate=900',
      },
      body: JSON.stringify(inventory),
    };
  } catch (error) {
    return {
      statusCode: 502,
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        error: 'Failed to fetch live inventory',
        details: error instanceof Error ? error.message : 'Unknown error',
      }),
    };
  }
};
