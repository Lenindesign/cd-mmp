import { describe, expect, it } from 'vitest';
import { getVehicleBySlug } from './vehicleService';
import {
  MARKET_LOCATION_OPTIONS,
  getVehicleMarketInventory,
  resolveMarketLocationFromZip,
} from './marketIntelligenceService';

describe('getVehicleMarketInventory', () => {
  it('keeps the selected radius and new-vehicle condition consistent', () => {
    const vehicle = getVehicleBySlug('2026/Chevrolet/Trax');
    expect(vehicle).toBeDefined();

    const fiveMiles = getVehicleMarketInventory({
      vehicle: vehicle!,
      location: MARKET_LOCATION_OPTIONS[0],
      radiusMiles: 5,
    });
    const twentyFiveMiles = getVehicleMarketInventory({
      vehicle: vehicle!,
      location: MARKET_LOCATION_OPTIONS[0],
      radiusMiles: 25,
    });
    const fiftyMiles = getVehicleMarketInventory({
      vehicle: vehicle!,
      location: MARKET_LOCATION_OPTIONS[0],
      radiusMiles: 50,
    });

    expect(fiveMiles.matches.every(({ unit, dealer }) => unit.isNew && (dealer.distance ?? 0) <= 5)).toBe(true);
    expect(twentyFiveMiles.matches.every(({ unit, dealer }) => unit.isNew && (dealer.distance ?? 0) <= 25)).toBe(true);
    expect(fiftyMiles.matches.every(({ unit, dealer }) => unit.isNew && (dealer.distance ?? 0) <= 50)).toBe(true);
    expect(fiveMiles.inventoryCount).toBeLessThanOrEqual(twentyFiveMiles.inventoryCount);
    expect(twentyFiveMiles.inventoryCount).toBeLessThanOrEqual(fiftyMiles.inventoryCount);
  });

  it('does not fall back to new inventory for a used vehicle', () => {
    const vehicle = getVehicleBySlug('2025/Chevrolet/Trax');
    expect(vehicle).toBeDefined();

    const market = getVehicleMarketInventory({
      vehicle: vehicle!,
      location: MARKET_LOCATION_OPTIONS[0],
      radiusMiles: 25,
    });

    expect(market.condition).toBe('used');
    expect(market.matches.length).toBeGreaterThan(0);
    expect(market.matches.every(({ unit }) => !unit.isNew)).toBe(true);
  });

  it('resolves supported ZIP codes to a dealer market', () => {
    expect(resolveMarketLocationFromZip('33130')).toMatchObject({
      label: 'Miami, FL',
      zipCode: '33130',
    });
    expect(resolveMarketLocationFromZip('60601')).toMatchObject({
      label: 'Chicago, IL',
      zipCode: '60601',
    });
    expect(resolveMarketLocationFromZip('12345')).toBeNull();
  });
});
