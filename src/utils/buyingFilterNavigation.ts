import type { DealsFilterState } from '../components/DealsFilterModal';
import { BEST_BUYING_DEALS_PATH } from '../constants/dealRoutes';

export interface BuyingFilterDestination {
  path: string;
  /** When true, caller should pass the applied filters via navigate state so the target page can hydrate from them. */
  carryFilters: boolean;
}

const slugify = (value: string): string =>
  value
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');

/**
 * Mirror of `resolveLeaseFilterDestination` for the buying experience.
 *
 * Single-category narrowings get their own branded landing under
 * `/deals/best-buying-deals/:slug`:
 *   - 1 make only → `/deals/best-buying-deals/{make-slug}` (e.g. `/ford`)
 *   - 1 body style only → `/deals/best-buying-deals/{body-style-slug}`
 *     (e.g. `/deals/best-buying-deals/suv`)
 *   - 1 fuel type only → `/deals/best-buying-deals/{fuel-type-slug}`
 *     (e.g. `/deals/best-buying-deals/gas`)
 *
 * Multi-selection within any single category, or any cross-category mix,
 * falls back to the generic buying hub with filters carried via router state.
 */
export function resolveBuyingFilterDestination(applied: DealsFilterState): BuyingFilterDestination | null {
  const { makes, bodyTypes, fuelTypes } = applied;

  if (makes.length === 1 && bodyTypes.length === 0 && fuelTypes.length === 0) {
    return { path: `${BEST_BUYING_DEALS_PATH}/${slugify(makes[0])}`, carryFilters: false };
  }

  if (bodyTypes.length === 1 && makes.length === 0 && fuelTypes.length === 0) {
    return { path: `${BEST_BUYING_DEALS_PATH}/${slugify(bodyTypes[0])}`, carryFilters: false };
  }

  if (fuelTypes.length === 1 && makes.length === 0 && bodyTypes.length === 0) {
    return { path: `${BEST_BUYING_DEALS_PATH}/${slugify(fuelTypes[0])}`, carryFilters: false };
  }

  if (makes.length >= 2 || bodyTypes.length >= 2 || fuelTypes.length >= 2) {
    return { path: BEST_BUYING_DEALS_PATH, carryFilters: true };
  }

  const categoriesTouched = [makes.length, bodyTypes.length, fuelTypes.length].filter((n) => n > 0).length;
  if (categoriesTouched >= 2) {
    return { path: BEST_BUYING_DEALS_PATH, carryFilters: true };
  }

  return null;
}
