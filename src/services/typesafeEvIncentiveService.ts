import type { EvIncentive, EvIncentiveDisplayType } from './evIncentivesService';

export interface TypeSafeEvValidation {
  model: string;
  records: Array<{
    id: string;
    sourceType: EvIncentiveDisplayType | null;
    suggestedType: string | null;
    probabilities: Record<string, number>;
    confidence: number;
    sourceTypeKnown: boolean;
    needsReview: boolean;
  }>;
  usage?: { input_tokens?: number; output_tokens?: number };
}

export async function validateEvIncentivesWithTypeSafe(
  incentives: EvIncentive[],
): Promise<TypeSafeEvValidation> {
  const response = await fetch('/.netlify/functions/validate-ev-incentives', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ incentives }),
  });

  const result = await response.json() as { error?: string } & Partial<TypeSafeEvValidation>;
  if (!response.ok) {
    throw new Error(result.error || 'TypeSafe validation failed.');
  }
  return result as TypeSafeEvValidation;
}
