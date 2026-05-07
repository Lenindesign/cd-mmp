import type { DealScore, LeaseVsBuyInputs, LeaseVsBuyResults, YearPoint } from './types';

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

const payment = (principal: number, apr: number, months: number) => {
  if (principal <= 0 || months <= 0) return 0;
  const monthlyRate = apr / 100 / 12;
  if (monthlyRate === 0) return principal / months;
  return principal * (monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
};

const remainingBalance = (principal: number, apr: number, monthsElapsed: number, monthlyPayment: number) => {
  let balance = Math.max(0, principal);
  const monthlyRate = apr / 100 / 12;
  for (let month = 0; month < monthsElapsed; month += 1) {
    const interest = balance * monthlyRate;
    balance = Math.max(0, balance - (monthlyPayment - interest));
  }
  return balance;
};

const depreciationRateFor = (inputs: LeaseVsBuyInputs) => {
  const luxuryAdjustment = /porsche|bmw|mercedes|audi|cadillac|genesis|lexus/i.test(inputs.make) ? 0.035 : 0;
  const evAdjustment = /ev|electric|e-tron|ioniq|taycan|model/i.test(`${inputs.make} ${inputs.model}`) ? 0.04 : 0;
  const mileageAdjustment = inputs.annualMileage > 15000 ? 0.025 : inputs.annualMileage < 9000 ? -0.015 : 0;
  return clamp(0.17 + luxuryAdjustment + evAdjustment + mileageAdjustment, 0.12, 0.28);
};

const scoreDeal = (inputs: LeaseVsBuyInputs, leaseSubsidyDetected: boolean): DealScore => {
  const discountPercent = ((inputs.msrp - inputs.negotiatedPrice) / Math.max(inputs.msrp, 1)) * 100;
  const aprBenchmark = inputs.creditTier === 'excellent' ? 5.5 : inputs.creditTier === 'good' ? 7.5 : inputs.creditTier === 'fair' ? 10 : 14;
  const aprScore = clamp(100 - Math.max(0, inputs.apr - aprBenchmark) * 12, 20, 100);
  const discountScore = clamp(55 + discountPercent * 9, 20, 100);
  const residualScore = clamp(inputs.residualPercent * 1.35, 25, 100);
  const feeLoad = inputs.dealerFees + inputs.acquisitionFee + inputs.dispositionFee;
  const feeScore = clamp(100 - (feeLoad / Math.max(inputs.negotiatedPrice, 1)) * 800, 25, 100);
  const subsidyScore = leaseSubsidyDetected ? 88 : 58;
  const score = Math.round(aprScore * 0.22 + discountScore * 0.24 + residualScore * 0.2 + feeScore * 0.18 + subsidyScore * 0.16);

  const redFlags = [
    inputs.apr > aprBenchmark + 2 ? `APR is above the expected range for ${inputs.creditTier} credit.` : '',
    inputs.dealerFees > inputs.negotiatedPrice * 0.035 ? 'Dealer fees look high relative to the vehicle price.' : '',
    inputs.moneyFactor * 2400 > inputs.apr + 2 ? 'Lease money factor appears marked up versus the finance APR.' : '',
    inputs.residualPercent < 48 ? 'Residual value is low, which can make the lease expensive.' : '',
  ].filter(Boolean);

  const label =
    score >= 86 ? 'Excellent Deal' :
    score >= 74 ? 'Good Deal' :
    score >= 60 ? 'Average' :
    score >= 45 ? 'Weak Deal' :
    'Avoid';

  return {
    score,
    label,
    redFlags,
    factors: [
      { label: 'APR competitiveness', score: Math.round(aprScore), note: `${inputs.apr.toFixed(1)}% APR vs. ${aprBenchmark.toFixed(1)}% benchmark` },
      { label: 'Negotiated discount', score: Math.round(discountScore), note: `${discountPercent.toFixed(1)}% below MSRP` },
      { label: 'Residual strength', score: Math.round(residualScore), note: `${inputs.residualPercent}% residual` },
      { label: 'Fee discipline', score: Math.round(feeScore), note: `$${Math.round(feeLoad).toLocaleString()} total fee load` },
      { label: 'Lease subsidy quality', score: Math.round(subsidyScore), note: leaseSubsidyDetected ? 'Payment implies manufacturer support' : 'No clear subsidy advantage detected' },
    ],
  };
};

export function calculateLeaseVsBuy(inputs: LeaseVsBuyInputs): LeaseVsBuyResults {
  const taxablePrice = Math.max(0, inputs.negotiatedPrice - inputs.tradeInValue);
  const taxAmount = taxablePrice * (inputs.taxes / 100);
  const financedAmount = Math.max(0, inputs.negotiatedPrice + taxAmount + inputs.dealerFees - inputs.downPayment - inputs.tradeInValue);
  const buyMonthlyPayment = payment(financedAmount, inputs.apr, inputs.loanTermMonths);
  const totalLoanCost = buyMonthlyPayment * inputs.loanTermMonths;
  const totalInterest = Math.max(0, totalLoanCost - financedAmount);
  const years = Math.max(1, inputs.ownershipDurationYears);
  const durationMonths = years * 12;
  const depreciationRate = depreciationRateFor(inputs);
  const resaleValue = Math.max(0, inputs.negotiatedPrice * Math.pow(1 - depreciationRate, years));
  const estimatedDepreciation = Math.max(0, inputs.negotiatedPrice - resaleValue);
  const insuranceCost = years * (inputs.negotiatedPrice * 0.032);
  const maintenanceCost = years * (inputs.negotiatedPrice * (years <= 3 ? 0.012 : 0.02));
  const opportunityCost = (inputs.downPayment + inputs.tradeInValue) * (Math.pow(1 + inputs.investmentReturnPercent / 100, years) - 1);
  const buyPaidWithinHorizon = inputs.downPayment + buyMonthlyPayment * Math.min(durationMonths, inputs.loanTermMonths);
  const remainingLoanBalance = remainingBalance(financedAmount, inputs.apr, Math.min(durationMonths, inputs.loanTermMonths), buyMonthlyPayment);
  const totalBuyCost = buyPaidWithinHorizon + insuranceCost + maintenanceCost + opportunityCost + remainingLoanBalance - resaleValue;

  const excessMiles = Math.max(0, inputs.annualMileage - inputs.mileageAllowance) * (inputs.leaseTermMonths / 12);
  const mileagePenalty = excessMiles * 0.25;
  const wearAndTearExposure = inputs.riskTolerance === 'low' ? 950 : inputs.riskTolerance === 'medium' ? 650 : 400;
  const totalLeaseCost =
    inputs.driveOffCosts +
    inputs.acquisitionFee +
    inputs.dispositionFee +
    inputs.leaseMonthlyPayment * Math.min(durationMonths, inputs.leaseTermMonths) +
    mileagePenalty +
    wearAndTearExposure;
  const leaseEffectiveMonthlyCost = totalLeaseCost / Math.max(1, Math.min(durationMonths, inputs.leaseTermMonths));
  const equityLoss = Math.max(0, resaleValue - remainingLoanBalance);
  const impliedLeasePayment = ((inputs.negotiatedPrice - inputs.msrp * (inputs.residualPercent / 100)) / inputs.leaseTermMonths) + ((inputs.negotiatedPrice + inputs.msrp * (inputs.residualPercent / 100)) * inputs.moneyFactor);
  const leaseSubsidyDetected = inputs.leaseMonthlyPayment < impliedLeasePayment * 0.94;

  const timeline: YearPoint[] = Array.from({ length: Math.max(7, years) }, (_, index) => {
    const year = index + 1;
    const months = year * 12;
    const yearResale = Math.max(0, inputs.negotiatedPrice * Math.pow(1 - depreciationRate, year));
    const balance = remainingBalance(financedAmount, inputs.apr, Math.min(months, inputs.loanTermMonths), buyMonthlyPayment);
    const buyCost = inputs.downPayment + buyMonthlyPayment * Math.min(months, inputs.loanTermMonths) + year * (inputs.negotiatedPrice * 0.052) - yearResale + balance;
    const leaseCost = inputs.driveOffCosts + inputs.acquisitionFee + inputs.leaseMonthlyPayment * Math.min(months, inputs.leaseTermMonths) + (year >= inputs.leaseTermMonths / 12 ? inputs.dispositionFee : 0);
    return {
      year,
      buyCost: Math.max(0, buyCost),
      leaseCost: Math.max(0, leaseCost),
      equity: Math.max(0, yearResale - balance),
      resaleValue: yearResale,
      depreciation: Math.max(0, inputs.negotiatedPrice - yearResale),
      cashFlowBuy: buyMonthlyPayment * 12,
      cashFlowLease: inputs.leaseMonthlyPayment * 12,
      opportunityCost: (inputs.downPayment + inputs.tradeInValue) * (Math.pow(1 + inputs.investmentReturnPercent / 100, year) - 1),
    };
  });

  const winner = totalBuyCost <= totalLeaseCost ? 'buy' : 'lease';
  return {
    buyMonthlyPayment,
    totalInterest,
    totalLoanCost,
    totalBuyCost,
    estimatedDepreciation,
    resaleValue,
    insuranceCost,
    maintenanceCost,
    opportunityCost,
    leaseEffectiveMonthlyCost,
    totalLeaseCost,
    mileagePenalty,
    wearAndTearExposure,
    equityLoss,
    leaseSubsidyDetected,
    winner,
    savings: Math.abs(totalBuyCost - totalLeaseCost),
    timeline,
    dealScore: scoreDeal(inputs, leaseSubsidyDetected),
  };
}
