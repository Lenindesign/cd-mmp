export interface VehiclePriceAfterCreditsInput {
  vehiclePrice: number;
  tradeInValue: number;
  amountOwed: number;
  rebate: number;
}

export interface PurchasePaymentSummaryInput {
  vehiclePrice: number;
  taxesAndFees: number;
  financedAddOns?: number;
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

export interface VehicleCoverageEstimateInput {
  vehiclePrice: number;
  condition: 'new' | 'used';
  bodyStyle?: string;
  fuelType?: string;
  horsepower?: number;
}

export interface VehicleCoverageEstimates {
  extendedWarranty: number;
  monthlyInsurance: number;
}

const roundToIncrement = (value: number, increment: number) => Math.round(value / increment) * increment;

const clampNumber = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

export const getVehicleCoverageEstimates = ({
  vehiclePrice,
  condition,
  bodyStyle,
  fuelType,
  horsepower,
}: VehicleCoverageEstimateInput): VehicleCoverageEstimates => {
  const price = Math.max(15000, vehiclePrice);
  const normalizedBodyStyle = bodyStyle?.toLowerCase() ?? '';
  const normalizedFuelType = fuelType?.toLowerCase() ?? '';
  const isUsed = condition === 'used';
  const isHeavyVehicle = ['suv', 'truck', 'van', 'minivan'].some((type) => normalizedBodyStyle.includes(type));
  const isPerformanceVehicle = (
    (horsepower ?? 0) >= 350 ||
    normalizedBodyStyle.includes('coupe') ||
    normalizedBodyStyle.includes('convertible')
  );
  const isElectric = normalizedFuelType.includes('electric') || normalizedFuelType.includes('plug-in');
  const highValueMultiplier = price >= 75000 ? 1.18 : price >= 55000 ? 1.1 : price >= 40000 ? 1.04 : 1;

  const warrantyRate = isUsed ? 0.075 : 0.055;
  const warrantyMultiplier = [
    highValueMultiplier,
    isElectric ? 1.08 : 1,
    isPerformanceVehicle ? 1.06 : 1,
    isHeavyVehicle ? 1.04 : 1,
    isUsed ? 1.1 : 1,
  ].reduce((current, multiplier) => current * multiplier, 1);
  const extendedWarranty = clampNumber(
    roundToIncrement(price * warrantyRate * warrantyMultiplier, 100),
    isUsed ? 2200 : 1800,
    isUsed ? 9000 : 7500,
  );

  const annualInsuranceBase = 1200 + price * (isUsed ? 0.021 : 0.022);
  const insuranceMultiplier = [
    highValueMultiplier,
    isElectric ? 1.15 : 1,
    isPerformanceVehicle ? 1.12 : 1,
    isHeavyVehicle ? 1.06 : 1,
    isUsed ? 0.92 : 1,
  ].reduce((current, multiplier) => current * multiplier, 1);
  const monthlyInsurance = clampNumber(
    roundToIncrement((annualInsuranceBase * insuranceMultiplier) / 12, 5),
    isUsed ? 95 : 110,
    650,
  );

  return {
    extendedWarranty,
    monthlyInsurance,
  };
};

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
  financedAddOns = 0,
  tradeEquity,
  rebate,
  downPayment,
  includeTaxesAndFeesInLoan,
}: PurchasePaymentSummaryInput): PurchasePaymentSummary => {
  const addOns = Math.max(0, financedAddOns);
  const nonCashCredits = tradeEquity + rebate;
  const financedBase = vehiclePrice + addOns + (includeTaxesAndFeesInLoan ? taxesAndFees : 0);
  const amountBeforeDownPayment = Math.max(0, financedBase - nonCashCredits);
  const downPaymentApplied = Math.min(Math.max(0, downPayment), amountBeforeDownPayment);
  const amountFinanced = Math.max(0, amountBeforeDownPayment - downPaymentApplied);
  const positiveTradeEquity = Math.max(0, tradeEquity);
  const transactionAmountBeforeTrade = Math.max(0, vehiclePrice + addOns + taxesAndFees - rebate);
  const tradeEquityApplied = Math.min(positiveTradeEquity, transactionAmountBeforeTrade);
  const vehicleAmountBeforeTrade = Math.max(0, vehiclePrice + addOns - rebate);
  const tradeEquityAppliedToVehicle = Math.min(positiveTradeEquity, vehicleAmountBeforeTrade);
  const tradeEquityAppliedToTaxesAndFees = Math.min(
    Math.max(0, taxesAndFees),
    Math.max(0, tradeEquityApplied - tradeEquityAppliedToVehicle),
  );
  const nonCashCreditsAfterVehicle = Math.max(0, nonCashCredits - vehiclePrice - addOns);
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
