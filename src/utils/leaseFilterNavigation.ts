import type { DealsFilterState } from '../components/DealsFilterModal';

export interface LeaseFilterDestination {
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
 * Turn a filter-modal state into the best lease-deals landing URL.
 *
 * Single-category narrowings get their own branded landing:
 *   - 1 make only → `/deals/lease/{make-slug}`
 *   - 1 body style only → `/deals/lease/{body-style-slug}` (e.g. `/deals/lease/suv`)
 *   - 1 fuel type only → `/deals/lease/{fuel-type-slug}` (e.g. `/deals/lease/gas`,
 *     `/deals/lease/plug-in-hybrid`)
 *
 * The dispatcher at `/deals/lease/:slug` resolves make vs body style vs fuel type
 * at route time by probing the lease dataset.
 *
 * Multi-selection within a single category OR cross-category combinations fall
 * back to the generic `/deals/lease` hub with the filter state carried via
 * router state so the hub hydrates with the selection.
 *
 * Returns null when there is no category selection at all (e.g. accolades-only,
 * range-only, or term-only changes) so the caller keeps filters in place.
 */
export function resolveLeaseFilterDestination(applied: DealsFilterState): LeaseFilterDestination | null {
  const { makes, bodyTypes, fuelTypes } = applied;

  if (makes.length === 1 && bodyTypes.length === 0 && fuelTypes.length === 0) {
    return { path: `/deals/lease/${slugify(makes[0])}`, carryFilters: false };
  }

  if (bodyTypes.length === 1 && makes.length === 0 && fuelTypes.length === 0) {
    return { path: `/deals/lease/${slugify(bodyTypes[0])}`, carryFilters: false };
  }

  if (fuelTypes.length === 1 && makes.length === 0 && bodyTypes.length === 0) {
    return { path: `/deals/lease/${slugify(fuelTypes[0])}`, carryFilters: false };
  }

  if (makes.length >= 2 || bodyTypes.length >= 2 || fuelTypes.length >= 2) {
    return { path: '/deals/lease', carryFilters: true };
  }

  // Cross-category combinations (e.g. SUV + Electric) also fall back to the
  // generic hub so both chips can coexist.
  const categoriesTouched = [makes.length, bodyTypes.length, fuelTypes.length].filter((n) => n > 0).length;
  if (categoriesTouched >= 2) {
    return { path: '/deals/lease', carryFilters: true };
  }

  return null;
}
