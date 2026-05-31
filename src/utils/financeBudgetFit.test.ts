import { describe, expect, it } from 'vitest';
import { getPurchasePaymentSummary, getVehiclePriceAfterTradeAndIncentives } from './financeBudgetFit';

describe('getVehiclePriceAfterTradeAndIncentives', () => {
  it('applies positive trade equity before comparing against a price budget', () => {
    expect(getVehiclePriceAfterTradeAndIncentives({
      vehiclePrice: 49550,
      tradeInValue: 55000,
      amountOwed: 0,
      rebate: 0,
    })).toBe(0);
  });

  it('adds negative trade equity to the comparable vehicle price', () => {
    expect(getVehiclePriceAfterTradeAndIncentives({
      vehiclePrice: 30000,
      tradeInValue: 8000,
      amountOwed: 12000,
      rebate: 0,
    })).toBe(34000);
  });

  it('subtracts eligible rebates with trade equity', () => {
    expect(getVehiclePriceAfterTradeAndIncentives({
      vehiclePrice: 42000,
      tradeInValue: 10000,
      amountOwed: 4000,
      rebate: 1500,
    })).toBe(34500);
  });
});

describe('getPurchasePaymentSummary', () => {
  it('uses surplus trade equity to cover taxes and fees included in the loan math', () => {
    expect(getPurchasePaymentSummary({
      vehiclePrice: 34800,
      taxesAndFees: 3161,
      tradeEquity: 55000,
      rebate: 0,
      downPayment: 4000,
      includeTaxesAndFeesInLoan: true,
    })).toEqual({
      amountFinanced: 0,
      downPaymentApplied: 0,
      cashDueAtSigning: 0,
      upfrontTaxesAndFeesDue: 0,
      taxesAndFeesCoveredByCredits: 3161,
      tradeEquityApplied: 37961,
      tradeEquityAppliedToTaxesAndFees: 3161,
      remainingTradeEquity: 17039,
    });
  });

  it('uses surplus trade equity to cover upfront taxes and fees', () => {
    expect(getPurchasePaymentSummary({
      vehiclePrice: 34800,
      taxesAndFees: 3161,
      tradeEquity: 55000,
      rebate: 0,
      downPayment: 4000,
      includeTaxesAndFeesInLoan: false,
    })).toMatchObject({
      amountFinanced: 0,
      downPaymentApplied: 0,
      cashDueAtSigning: 0,
      upfrontTaxesAndFeesDue: 0,
      tradeEquityApplied: 37961,
      remainingTradeEquity: 17039,
    });
  });

  it('keeps upfront taxes and fees due when trade equity only covers the vehicle price', () => {
    expect(getPurchasePaymentSummary({
      vehiclePrice: 34800,
      taxesAndFees: 3161,
      tradeEquity: 34800,
      rebate: 0,
      downPayment: 4000,
      includeTaxesAndFeesInLoan: false,
    })).toMatchObject({
      amountFinanced: 0,
      downPaymentApplied: 0,
      cashDueAtSigning: 3161,
      upfrontTaxesAndFeesDue: 3161,
      tradeEquityApplied: 34800,
      remainingTradeEquity: 0,
    });
  });

  it('applies down payment only to the remaining financed amount', () => {
    expect(getPurchasePaymentSummary({
      vehiclePrice: 30000,
      taxesAndFees: 3000,
      tradeEquity: 0,
      rebate: 0,
      downPayment: 4000,
      includeTaxesAndFeesInLoan: true,
    })).toMatchObject({
      amountFinanced: 29000,
      downPaymentApplied: 4000,
      cashDueAtSigning: 4000,
      upfrontTaxesAndFeesDue: 0,
      tradeEquityApplied: 0,
      remainingTradeEquity: 0,
    });
  });

  it('adds optional financed products without treating them as taxes and fees', () => {
    expect(getPurchasePaymentSummary({
      vehiclePrice: 30000,
      taxesAndFees: 2873,
      financedAddOns: 2500,
      tradeEquity: 0,
      rebate: 0,
      downPayment: 3000,
      includeTaxesAndFeesInLoan: true,
    })).toMatchObject({
      amountFinanced: 32373,
      downPaymentApplied: 3000,
      cashDueAtSigning: 3000,
      upfrontTaxesAndFeesDue: 0,
      taxesAndFeesCoveredByCredits: 0,
      tradeEquityApplied: 0,
      tradeEquityAppliedToTaxesAndFees: 0,
      remainingTradeEquity: 0,
    });
  });

  it('keeps non-financed taxes due upfront while financing optional products', () => {
    expect(getPurchasePaymentSummary({
      vehiclePrice: 30000,
      taxesAndFees: 2873,
      financedAddOns: 2500,
      tradeEquity: 0,
      rebate: 0,
      downPayment: 3000,
      includeTaxesAndFeesInLoan: false,
    })).toMatchObject({
      amountFinanced: 29500,
      downPaymentApplied: 3000,
      cashDueAtSigning: 5873,
      upfrontTaxesAndFeesDue: 2873,
    });
  });
});
