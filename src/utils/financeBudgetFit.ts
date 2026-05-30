export interface VehiclePriceAfterCreditsInput {
  vehiclePrice: number;
  tradeInValue: number;
  amountOwed: number;
  rebate: number;
}

export interface PurchasePaymentSummaryInput {
  vehiclePrice: number;
  taxesAndFees: number;
  tradeEquity: number;
  rebate: number;
  downPayment: number;
  includeTaxesAndFeesInLoan: boolean;
}

export interface PurchasePaymentSummary {
  amountFinanced: number;
  downPaymentApplied: number;
  cashDueAtSigning: number;
  upfrontTaxesAndFeesDue: number;
  taxesAndFeesCoveredByCredits: number;
  tradeEquityApplied: number;
  tradeEquityAppliedToTaxesAndFees: number;
  remainingTradeEquity: number;
}

export const getVehiclePriceAfterTradeAndIncentives = ({
  vehiclePrice,
  tradeInValue,
  amountOwed,
  rebate,
}: VehiclePriceAfterCreditsInput) => {
  const tradeEquity = tradeInValue - amountOwed;
  return Math.max(0, vehiclePrice - tradeEquity - rebate);
};

export const getPurchasePaymentSummary = ({
  vehiclePrice,
  taxesAndFees,
  tradeEquity,
  rebate,
  downPayment,
  includeTaxesAndFeesInLoan,
}: PurchasePaymentSummaryInput): PurchasePaymentSummary => {
  const nonCashCredits = tradeEquity + rebate;
  const financedBase = vehiclePrice + (includeTaxesAndFeesInLoan ? taxesAndFees : 0);
  const amountBeforeDownPayment = Math.max(0, financedBase - nonCashCredits);
  const downPaymentApplied = Math.min(Math.max(0, downPayment), amountBeforeDownPayment);
  const amountFinanced = Math.max(0, amountBeforeDownPayment - downPaymentApplied);
  const positiveTradeEquity = Math.max(0, tradeEquity);
  const transactionAmountBeforeTrade = Math.max(0, vehiclePrice + taxesAndFees - rebate);
  const tradeEquityApplied = Math.min(positiveTradeEquity, transactionAmountBeforeTrade);
  const vehicleAmountBeforeTrade = Math.max(0, vehiclePrice - rebate);
  const tradeEquityAppliedToVehicle = Math.min(positiveTradeEquity, vehicleAmountBeforeTrade);
  const tradeEquityAppliedToTaxesAndFees = Math.min(
    Math.max(0, taxesAndFees),
    Math.max(0, tradeEquityApplied - tradeEquityAppliedToVehicle),
  );
  const nonCashCreditsAfterVehicle = Math.max(0, nonCashCredits - vehiclePrice);
  const taxesAndFeesCoveredByCredits = Math.min(Math.max(0, taxesAndFees), nonCashCreditsAfterVehicle);
  const upfrontTaxesAndFeesDue = includeTaxesAndFeesInLoan
    ? 0
    : Math.max(0, taxesAndFees - taxesAndFeesCoveredByCredits);

  return {
    amountFinanced,
    downPaymentApplied,
    cashDueAtSigning: downPaymentApplied + upfrontTaxesAndFeesDue,
    upfrontTaxesAndFeesDue,
    taxesAndFeesCoveredByCredits,
    tradeEquityApplied,
    tradeEquityAppliedToTaxesAndFees,
    remainingTradeEquity: Math.max(0, positiveTradeEquity - tradeEquityApplied),
  };
};
