import { describe, expect, it } from 'vitest';
import { getVehiclePriceAfterTradeAndIncentives } from './financeBudgetFit';

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
