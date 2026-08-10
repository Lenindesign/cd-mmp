import { describe, expect, it } from 'vitest';
import { getVehicleBySlug } from './vehicleService';
import {
  MARKET_LOCATION_OPTIONS,
  getVehicleMarketInventory,
  getVisibleMarketMetricKeys,
  resolveMarketLocationFromZip,
} from './marketIntelligenceService';

describe('getVehicleMarketInventory', () => {
  it('keeps the selected radius and new-vehicle condition consistent', () => {
    const vehicle = getVehicleBySlug('2026/Chevrolet/Trax');
    expect(vehicle).toBeDefined();

    const tenMiles = getVehicleMarketInventory({
      vehicle: vehicle!,
      location: MARKET_LOCATION_OPTIONS[0],
      radiusMiles: 10,
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

    expect(tenMiles.matches.every(({ unit, dealer }) => unit.isNew && (dealer.distance ?? 0) <= 10)).toBe(true);
    expect(twentyFiveMiles.matches.every(({ unit, dealer }) => unit.isNew && (dealer.distance ?? 0) <= 25)).toBe(true);
    expect(fiftyMiles.matches.every(({ unit, dealer }) => unit.isNew && (dealer.distance ?? 0) <= 50)).toBe(true);
    expect(tenMiles.inventoryCount).toBeLessThanOrEqual(twentyFiveMiles.inventoryCount);
    expect(twentyFiveMiles.inventoryCount).toBeLessThanOrEqual(fiftyMiles.inventoryCount);
    expect(twentyFiveMiles.statistics.currentYearCount).toBe(twentyFiveMiles.inventoryCount);
    expect(twentyFiveMiles.statistics.followingYearCount).toBe(0);
    expect(getVisibleMarketMetricKeys(twentyFiveMiles).slice(0, 5)).toEqual([
      'matches',
      'averagePrice',
      'lowPrice',
      'highPrice',
      'averageDays',
    ]);

    const priceDropFallbackMarket = {
      ...twentyFiveMiles,
      statistics: {
        ...twentyFiveMiles.statistics,
        newlyListedCount: 0,
        priceDropCount: 3,
      },
    };
    expect(getVisibleMarketMetricKeys(priceDropFallbackMarket).slice(0, 6)).toEqual([
      'matches',
      'averagePrice',
      'lowPrice',
      'highPrice',
      'averageDays',
      'priceDrops',
    ]);
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
    expect(market.statistics.currentYearCount).toBe(market.inventoryCount);
    expect(market.statistics.averageMileage).toBeGreaterThan(0);
    expect(market.statistics.lowMileage).toBeLessThanOrEqual(market.statistics.highMileage!);
    expect(market.statistics.oneOwnerCount).toBeLessThanOrEqual(market.inventoryCount);
    expect(market.statistics.noAccidentCount).toBeLessThanOrEqual(market.inventoryCount);
    expect(market.statistics.goodGreatPriceCount).toBeLessThanOrEqual(market.inventoryCount);
    expect(getVisibleMarketMetricKeys(market).slice(0, 5)).toEqual([
      'matches',
      'averagePrice',
      'averageMileage',
      'mileageRange',
      'averageDays',
    ]);
    expect(getVisibleMarketMetricKeys(market)).toEqual(expect.arrayContaining([
      'goodGreatPrice',
      'oneOwner',
      'noAccidents',
      'priceDrops',
      'previousYear',
      'followingYear',
    ]));
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
