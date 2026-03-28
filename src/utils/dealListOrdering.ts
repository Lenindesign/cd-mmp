/**
 * Shared ordering for body-style / fuel-type deal grids: lowest payment first,
 * one row per vehicle headline + deal category when multiples exist (e.g. two finance programs).
 */
export function dedupeDealsByVehicleNameAndDealType<
  T extends { vehicleName: string; dealType: string; estimatedMonthly: number },
>(deals: T[]): T[] {
  const map = new Map<string, T>();
  for (const d of deals) {
    const key = `${d.vehicleName.toLowerCase()}|${d.dealType}`;
    const prev = map.get(key);
    if (!prev || d.estimatedMonthly < prev.estimatedMonthly) map.set(key, d);
  }
  return [...map.values()];
}

export function sortDealsByEstimatedMonthlyAsc<T extends { estimatedMonthly: number }>(deals: T[]): T[] {
  return [...deals].sort((a, b) => a.estimatedMonthly - b.estimatedMonthly);
}
