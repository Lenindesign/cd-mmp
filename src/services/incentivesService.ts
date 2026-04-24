/**
 * Incentives service — thin re-export layer over the unified adapter.
 *
 * All incentive data now flows through `incentiveAdapter.ts`, which builds
 * `Incentive[]` from the four deal services (zero-APR, cash, finance, lease).
 * This file preserves the original import paths so consumers like Hero,
 * HeroOffersA/B, VehicleRanking, and IncentivesModal keep working without
 * changes.
 *
 * When Black Book is connected, only `incentiveAdapter.ts` needs to change.
 */

export type {
  GroupAffiliation,
  Incentive,
  VehicleIncentives,
} from './incentiveAdapter';

export {
  getVehicleIncentives,
  getIncentivesByType,
  getTotalSavings,
} from './incentiveAdapter';

export { getCurrentPeriod } from '../utils/dateUtils';
