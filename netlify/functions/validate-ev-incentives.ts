import type { Handler } from '@netlify/functions';

const MAX_INCENTIVES = 12;
const MAX_FIELD_LENGTH = 1200;

const DISPLAY_TYPES = ['vehicle-retirement', 'rebate', 'bill-credit'] as const;
type DisplayType = (typeof DISPLAY_TYPES)[number];

interface IncentiveRecord {
  id?: string;
  offerType?: string;
  category?: string;
  programName?: string;
  description?: string;
  requirement?: string;
  providerType?: string;
  amountLabel?: string;
  purchaseLeaseImpact?: string;
}

interface TypeSafeChoiceAnswer {
  type: 'choice';
  choice: string;
  probabilities: Record<string, number>;
  confidence: number;
}

interface TypeSafeResponse {
  model: string;
  answers: Record<string, TypeSafeChoiceAnswer>;
  usage?: { input_tokens?: number; output_tokens?: number };
}

const sourceDisplayType = (incentive: IncentiveRecord): DisplayType | null => {
  const offerType = incentive.offerType?.toLowerCase() ?? '';
  if (offerType.includes('vehicle retirement')) return 'vehicle-retirement';
  if (offerType.includes('bill credit')) return 'bill-credit';
  if (offerType === 'rebate' || offerType.includes('rebate')) return 'rebate';
  return null;
};

const trimRecord = (incentive: IncentiveRecord) => Object.fromEntries(
  Object.entries(incentive).map(([key, value]) => [
    key,
    typeof value === 'string' ? value.slice(0, MAX_FIELD_LENGTH) : value,
  ]),
);

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers: { Allow: 'POST' }, body: JSON.stringify({ error: 'Use POST.' }) };
  }

  const apiKey = process.env.TYPESAFE_API_KEY;
  if (!apiKey) {
    return {
      statusCode: 503,
      body: JSON.stringify({ error: 'TypeSafe is not configured. Set TYPESAFE_API_KEY on the server.' }),
    };
  }

  try {
    const body = JSON.parse(event.body ?? '{}') as { incentives?: IncentiveRecord[] };
    const incentives = body.incentives;
    if (!Array.isArray(incentives) || incentives.length === 0 || incentives.length > MAX_INCENTIVES) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: `Expected 1-${MAX_INCENTIVES} incentives.` }),
      };
    }

    const questions = Object.fromEntries(incentives.map((_, index) => [`consumer_type_${index}`, {
      type: 'choice',
      instructions: {
        record: `Evaluate the incentive record at `records[${index}]`.`,
        question: 'Identify its consumer-facing EV incentive type. Choose Vehicle Retirement when the program requires retiring or replacing an older vehicle; choose Bill Credit when the benefit is applied to an electricity or utility bill; otherwise choose Rebate for a purchase, lease, charger, or clean-vehicle rebate.',
      },
      criteria: {
        'vehicle-retirement': 'Vehicle Retirement: requires retiring, scrapping, replacing, or taking an older vehicle off the road.',
        rebate: 'Rebate: returns or applies money for purchasing, leasing, or charging an eligible EV, except when the benefit is specifically a utility bill credit.',
        'bill-credit': 'Bill Credit: applies savings directly to an electricity or utility bill or account.',
      },
    }]));

    const response = await fetch('https://api.typesafe.ai/v1/systemone', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'jev-latest',
        state: { records: incentives.map(trimRecord) },
        questions,
      }),
    });

    if (!response.ok) {
      const detail = await response.text();
      return { statusCode: response.status, body: JSON.stringify({ error: 'TypeSafe evaluation failed.', detail }) };
    }

    const result = await response.json() as TypeSafeResponse;
    const expected = incentives.map(sourceDisplayType);
    const records = incentives.map((incentive, index) => {
      const answer = result.answers[`consumer_type_${index}`];
      const suggestedType = answer?.choice ?? null;
      return {
        id: incentive.id ?? `record-${index + 1}`,
        sourceType: expected[index],
        suggestedType,
        probabilities: answer?.probabilities ?? {},
        confidence: answer?.confidence ?? 0,
        sourceTypeKnown: expected[index] !== null,
        needsReview: expected[index] === null || !answer || suggestedType !== expected[index] || (answer.confidence ?? 0) < 0.75,
      };
    });

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: result.model,
        records,
        usage: result.usage,
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error instanceof Error ? error.message : 'Unexpected TypeSafe validation error.' }),
    };
  }
};
