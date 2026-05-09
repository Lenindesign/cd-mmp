export type TradeInEstimateCondition = 'rough' | 'average' | 'clean';

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

/** Same heuristic as TradeInEstimateModal — quick planning estimate only. */
export function estimateTradeInValue(
  vehicleDescription: string,
  mileage: number,
  condition: TradeInEstimateCondition,
): number {
  const trimmedVehicle = vehicleDescription.trim();
  if (!trimmedVehicle || !mileage) return 0;

  const yearMatch = trimmedVehicle.match(/\b(19|20)\d{2}\b/);
  const vehicleYear = yearMatch ? Number(yearMatch[0]) : new Date().getFullYear() - 5;
  const age = clamp(new Date().getFullYear() - vehicleYear, 0, 25);
  const conditionMultiplier = condition === 'clean' ? 1 : condition === 'average' ? 0.86 : 0.7;
  const expectedMileage = Math.max(age, 1) * 12000;
  const mileageAdjustment = 1 - clamp((mileage - expectedMileage) / 100000, -0.12, 0.35);
  const vehicleText = trimmedVehicle.toLowerCase();
  const brandMultiplier = /toyota|honda|lexus|subaru|porsche/.test(vehicleText)
    ? 1.06
    : /bmw|mercedes|audi|cadillac|lincoln|genesis/.test(vehicleText)
      ? 1.12
      : /kia|hyundai|mazda|ford|chevrolet|chevy|gmc|jeep/.test(vehicleText)
        ? 0.98
        : 1;

  const depreciatedValue = 34000 * Math.pow(0.84, age);
  const estimate = depreciatedValue * mileageAdjustment * conditionMultiplier * brandMultiplier;

  return Math.max(500, Math.round(estimate / 100) * 100);
}
