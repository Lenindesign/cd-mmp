import type { AIAnalysis, LeaseVsBuyInputs, LeaseVsBuyResults } from './types';

const money = (value: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(Math.round(value));

export function buildLeaseVsBuyPrompt(inputs: LeaseVsBuyInputs, results: LeaseVsBuyResults) {
  return `You are the Car and Driver Lease vs Buy Intelligence Engine.

Analyze this deal in concise premium automotive journalism, not generic AI prose.

Vehicle: ${inputs.make} ${inputs.model} ${inputs.trim}
MSRP: ${money(inputs.msrp)}
Negotiated price: ${money(inputs.negotiatedPrice)}
ZIP: ${inputs.zipCode}

Buy: ${inputs.apr}% APR, ${inputs.loanTermMonths} months, ${money(inputs.downPayment)} down, ${money(results.buyMonthlyPayment)}/mo, ${money(results.totalBuyCost)} horizon cost.
Lease: ${inputs.leaseTermMonths} months, ${money(inputs.leaseMonthlyPayment)}/mo, ${inputs.residualPercent}% residual, ${inputs.moneyFactor} money factor, ${money(results.totalLeaseCost)} horizon cost.

Profile: ${inputs.annualMileage.toLocaleString()} miles/year, ${inputs.ownershipDurationYears} years, ${inputs.creditTier} credit, ${inputs.riskTolerance} risk tolerance, preference ${inputs.preference}.
Deal score: ${results.dealScore.score}/100 (${results.dealScore.label})
Red flags: ${results.dealScore.redFlags.join('; ') || 'None detected'}

Return JSON with these fields:
executiveSummary, financialWinner, lifestyleWinner, longTermWealthWinner, riskAnalysis, dealerRedFlags[], negotiationAdvice[], depreciationForecast, finalRecommendation.`;
}

export async function requestOpenAIAnalysis(inputs: LeaseVsBuyInputs, results: LeaseVsBuyResults) {
  const response = await fetch('/api/lease-vs-buy/analyze', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      prompt: buildLeaseVsBuyPrompt(inputs, results),
      inputs,
      results,
    }),
  });

  if (!response.ok) throw new Error('AI analysis endpoint unavailable');
  return response.json() as Promise<AIAnalysis>;
}

export function createEditorialAnalysis(inputs: LeaseVsBuyInputs, results: LeaseVsBuyResults): AIAnalysis {
  const buyWins = results.winner === 'buy';
  const vehicle = `${inputs.make} ${inputs.model}`;
  const leaseAprEquivalent = inputs.moneyFactor * 2400;
  const subsidyCopy = results.leaseSubsidyDetected
    ? 'The lease payment appears subsidized versus the implied money-factor math.'
    : 'The lease does not show a clear subsidy advantage from the visible terms.';

  const redFlags = results.dealScore.redFlags.length
    ? results.dealScore.redFlags
    : [
        inputs.dealerFees > 900 ? 'Ask the dealer to itemize fees before signing.' : 'No major fee red flag from the current inputs.',
        leaseAprEquivalent > inputs.apr + 1.5 ? 'Verify the money factor against the base rate.' : 'Money factor appears broadly in line with the finance rate.',
      ];

  return {
    executiveSummary: `${vehicle} favors ${buyWins ? 'buying' : 'leasing'} on the current assumptions. The spread is ${money(results.savings)} over your selected horizon, with a ${results.dealScore.score}/100 deal score.`,
    financialWinner: buyWins
      ? `Buying is the stronger financial case. It preserves estimated equity of ${money(results.equityLoss)} while keeping long-term cost below the lease path.`
      : `Leasing wins the cash-flow case. Effective monthly cost is ${money(results.leaseEffectiveMonthlyCost)}, helped by ${subsidyCopy.toLowerCase()}`,
    lifestyleWinner: inputs.preference === 'luxury-upgrades' || inputs.preference === 'flexibility'
      ? 'Leasing better matches a driver who wants shorter cycles, warranty coverage, and frequent upgrades.'
      : 'Buying better matches a driver who plans to keep the vehicle and wants control over mileage, wear, and resale timing.',
    longTermWealthWinner: `Buying has the clearer wealth-preservation path if you keep the ${vehicle} beyond ${inputs.ownershipDurationYears} years. The key variable is whether resale holds near ${money(results.resaleValue)}.`,
    riskAnalysis: `Depreciation is the largest open risk. We estimate ${money(results.estimatedDepreciation)} of value loss, while lease exposure is capped but includes mileage and wear risk.`,
    dealerRedFlags: redFlags,
    negotiationAdvice: [
      `Target a selling price at least ${money(Math.max(0, inputs.msrp - inputs.negotiatedPrice + 750))} below MSRP before discussing payment.`,
      `Ask for the base money factor and compare it with the APR-equivalent of ${leaseAprEquivalent.toFixed(2)}%.`,
      `Separate taxes, acquisition, disposition, doc, and add-on fees. Do not negotiate from monthly payment alone.`,
      `Walk away if the dealer will not show negotiated price, residual, money factor, and fee itemization in writing.`,
    ],
    depreciationForecast: `At the current mileage profile, projected resale is ${money(results.resaleValue)} after ${inputs.ownershipDurationYears} years. Higher annual mileage would push the curve down quickly.`,
    finalRecommendation: buyWins
      ? `Buy if you can hold the vehicle past the loan midpoint and want the resale upside. Lease only if the dealer materially improves the payment or money factor.`
      : `Lease if you value lower obligation and upgrade flexibility. Buy only if you can negotiate a deeper discount or plan to keep the vehicle long past the lease term.`,
  };
}
