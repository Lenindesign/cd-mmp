export interface VehiclePriceAfterCreditsInput {
  vehiclePrice: number;
  tradeInValue: number;
  amountOwed: number;
  rebate: number;
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
