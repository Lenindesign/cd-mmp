import { getAllVehicles } from './vehicleService';
import type { Vehicle } from '../types/vehicle';
import {
  EXPIRATION_DATE,
  cashDeal,
  financeDeal,
  financeDealTiered,
  type CashDealDef,
  type FinanceDealDef,
  type RateTier,
} from './_dealComposer';

export interface CashDeal {
  id: string;
  type: 'cash';
  vehicle: Vehicle;
  incentiveValue: string;
  incentiveAmount: number;
  percentOffMsrp: string;
  expirationDate: string;
  programName: string;
  programDescription: string;
  trimsEligible: string[];
}

export interface FinanceDeal {
  id: string;
  type: 'finance';
  vehicle: Vehicle;
  apr: string;
  term: string;
  expirationDate: string;
  programName: string;
  programDescription: string;
  targetAudience: string;
  trimsEligible: string[];
  /** Tiered rate data for deals with multiple terms and/or variable cash back. */
  rateTiers?: RateTier[];
}

export type Deal = CashDeal | FinanceDeal;

const CURRENT_MONTH = new Date().toLocaleString('default', { month: 'long' });
const CURRENT_YEAR = new Date().getFullYear();

/**
 * 35 cash-back deal definitions for the 2026 model year.
 *
 * Composition (see `docs/deals-coverage-2026.md`): 28 Gas / 2 Hybrid / 3
 * Plug-In Hybrid / 1 Electric / 1 Diesel. Dollar amounts are composed via
 * `cashDeal({ amount: N })` which derives the `$N,NNN` display and a
 * percent-off-MSRP band.
 */
const CASH_DEAL_DEFS: CashDealDef[] = [
  // Chevrolet
  cashDeal({ make: 'Chevrolet', model: 'Trax', amount: 2000, percentOffMsrp: '8–10%', programName: 'Chevrolet Customer Cash', programDescription: '$1,500 customer cash plus $500 bonus cash on select 2026 Chevrolet Trax models. Cannot be combined with special financing.', trims: ['LS', '1RS', 'LT', 'ACTIV'] }),
  cashDeal({ make: 'Chevrolet', model: 'Equinox', amount: 2500, percentOffMsrp: '7–9%', programName: 'Chevrolet Equinox Cash Allowance', programDescription: 'Customer cash allowance of $2,500 on the 2026 Chevrolet Equinox. Take delivery by expiration date.', trims: ['LS', 'LT', 'RS'] }),
  cashDeal({ make: 'Chevrolet', model: 'Silverado', amount: 3500, percentOffMsrp: '6–8%', programName: 'Chevrolet Truck Month Cash Back', programDescription: '$3,500 customer cash on select 2026 Silverado 1500 models during Chevy Truck Month.', trims: ['WT', 'Custom', 'LT', 'RST', 'LT Trail Boss'] }),
  cashDeal({ make: 'Chevrolet', model: 'Trailblazer', amount: 1500, programName: 'Chevrolet Trailblazer Cash Back', trims: ['LS', 'LT', 'ACTIV'] }),
  cashDeal({ make: 'Chevrolet', model: 'Colorado', amount: 2500, programName: 'Chevrolet Colorado Customer Cash', trims: ['WT', 'LT', 'Z71'] }),

  // Toyota
  cashDeal({ make: 'Toyota', model: 'Camry', amount: 1500, programName: 'Toyota Camry Cash Back', trims: ['LE', 'SE', 'XLE'] }),
  cashDeal({ make: 'Toyota', model: 'RAV4', amount: 1500, programName: 'Toyota RAV4 Customer Cash', trims: ['LE', 'XLE'] }),
  cashDeal({ make: 'Toyota', model: 'Tundra', amount: 2500, programName: 'Toyota Tundra Cash Back', trims: ['SR', 'SR5'] }),
  cashDeal({ make: 'Toyota', model: 'RAV4 Prime', amount: 3500, programName: 'Toyota RAV4 Prime PHEV Cash Back', programDescription: '$3,500 customer cash on the 2026 RAV4 Prime Plug-In Hybrid. Stackable with federal EV tax credit.', trims: ['SE', 'XSE'] }),

  // Ford
  cashDeal({ make: 'Ford', model: 'F-150', amount: 4000, percentOffMsrp: '7–10%', programName: 'Ford Customer Cash', programDescription: '$4,000 customer cash back on select 2026 F-150 models. Additional trade-in assistance available.', trims: ['XL', 'XLT', 'Lariat'] }),
  cashDeal({ make: 'Ford', model: 'Mustang', amount: 2000, percentOffMsrp: '5–6%', programName: 'Ford Mustang Cash Offer', programDescription: '$2,000 customer cash back on 2026 Ford Mustang models. Available at participating Ford dealers.', trims: ['EcoBoost', 'GT'] }),
  cashDeal({ make: 'Ford', model: 'Maverick', amount: 1500, programName: 'Ford Maverick Hybrid Cash Back', trims: ['XL', 'XLT', 'Lariat'] }),
  cashDeal({ make: 'Ford', model: 'Escape', amount: 1500, programName: 'Ford Escape Cash Back', trims: ['Active', 'ST-Line', 'Platinum'] }),

  // Honda
  cashDeal({ make: 'Honda', model: 'CR-V', amount: 1500, programName: 'Honda CR-V Cash Back', trims: ['LX', 'EX'] }),
  cashDeal({ make: 'Honda', model: 'Pilot', amount: 2000, programName: 'Honda Pilot Customer Cash', trims: ['Sport', 'EX-L', 'Touring'] }),

  // Hyundai
  cashDeal({ make: 'Hyundai', model: 'Tucson', amount: 1500, percentOffMsrp: '4–5%', programName: 'Hyundai Spring Cash Event', programDescription: '$1,500 customer cash on the 2026 Hyundai Tucson. Available through participating Hyundai dealers nationwide.', trims: ['SE', 'SEL', 'N Line', 'Limited'] }),
  cashDeal({ make: 'Hyundai', model: 'Kona', amount: 1000, percentOffMsrp: '3–4%', programName: 'Hyundai Kona Bonus Cash', programDescription: '$1,000 customer cash on the 2026 Hyundai Kona. No trade-in required.', trims: ['SE', 'SEL', 'Limited'] }),
  cashDeal({ make: 'Hyundai', model: 'Santa Fe', amount: 2000, programName: 'Hyundai Santa Fe Hybrid Cash Back', trims: ['SEL Hybrid', 'Limited Hybrid'] }),
  cashDeal({ make: 'Hyundai', model: 'Ioniq 5', amount: 7500, percentOffMsrp: '10–15%', programName: 'Hyundai Ioniq 5 EV Lease Cash', programDescription: 'Up to $7,500 EV lease cash passed through from the federal clean vehicle credit on the 2026 Ioniq 5.', trims: ['SE', 'SEL', 'Limited'] }),

  // Nissan
  cashDeal({ make: 'Nissan', model: 'Rogue', amount: 2000, percentOffMsrp: '5–7%', programName: 'Nissan Customer Cash', programDescription: '$2,000 customer cash back on the 2026 Nissan Rogue. Plus $1,000 bonus when financing through NMAC.', trims: ['S', 'SV', 'SL'] }),
  cashDeal({ make: 'Nissan', model: 'Pathfinder', amount: 2500, programName: 'Nissan Pathfinder Customer Cash', trims: ['S', 'SV', 'SL'] }),
  cashDeal({ make: 'Nissan', model: 'Altima', amount: 1500, programName: 'Nissan Altima Cash Back', trims: ['S', 'SV'] }),

  // Kia
  cashDeal({ make: 'Kia', model: 'Seltos', amount: 1500, percentOffMsrp: '5–6%', programName: 'Kia Customer Cash', programDescription: '$1,500 customer cash on the 2026 Kia Seltos. Available at participating Kia dealers.', trims: ['LX', 'S', 'EX', 'SX'] }),
  cashDeal({ make: 'Kia', model: 'K5', amount: 1500, programName: 'Kia K5 Customer Cash', trims: ['LXS', 'GT-Line', 'EX'] }),
  cashDeal({ make: 'Kia', model: 'Sportage Hybrid', amount: 2000, programName: 'Kia Sportage Hybrid Cash Back', trims: ['LX', 'EX'] }),
  cashDeal({ make: 'Kia', model: 'Telluride', amount: 2500, programName: 'Kia Telluride Customer Cash', trims: ['LX', 'S', 'EX'] }),

  // Ram
  cashDeal({ make: 'Ram', model: '1500', amount: 3500, programName: 'Ram 1500 Customer Cash', trims: ['Tradesman', 'Big Horn', 'Laramie'] }),
  cashDeal({ make: 'Ram', model: '1500 EcoDiesel', amount: 4000, programName: 'Ram 1500 EcoDiesel Cash Back', programDescription: '$4,000 customer cash on the 2026 Ram 1500 EcoDiesel through Stellantis Financial.', trims: ['Big Horn', 'Laramie'] }),

  // GMC
  cashDeal({ make: 'GMC', model: 'Sierra', amount: 3000, programName: 'GMC Sierra Customer Cash', trims: ['Pro', 'SLE', 'SLT'] }),

  // Jeep
  cashDeal({ make: 'Jeep', model: 'Grand Cherokee', amount: 2500, programName: 'Jeep Grand Cherokee Cash Back', trims: ['Laredo', 'Limited'] }),
  cashDeal({ make: 'Jeep', model: 'Wrangler 4xe', amount: 3500, programName: 'Jeep Wrangler 4xe PHEV Cash Back', programDescription: '$3,500 customer cash on the 2026 Wrangler 4xe Plug-In Hybrid. Combine with federal EV tax credit when eligible.', trims: ['Sport S 4xe', 'Rubicon 4xe'] }),
  cashDeal({ make: 'Jeep', model: 'Grand Cherokee 4xe', amount: 4000, programName: 'Jeep Grand Cherokee 4xe PHEV Cash Back', trims: ['Limited 4xe', 'Overland 4xe'] }),

  // Luxury
  cashDeal({ make: 'BMW', model: '3 Series', amount: 2500, percentOffMsrp: '4–5%', programName: 'BMW Loyalty Credit', programDescription: '$2,500 loyalty credit for current BMW owners purchasing a new 3 Series. Must currently own a BMW vehicle.', trims: ['330i', '330i xDrive'] }),
  cashDeal({ make: 'Mercedes-Benz', model: 'C-Class', amount: 3000, percentOffMsrp: '5–6%', programName: 'Mercedes-Benz Loyalty Credit', programDescription: '$3,000 loyalty credit for current Mercedes-Benz owners. Must currently own or lease a Mercedes-Benz vehicle.', trims: ['C 300', 'C 300 4MATIC'] }),
  cashDeal({ make: 'Chevrolet', model: 'Silverado 1500 Duramax', amount: 3500, programName: 'Chevrolet Silverado Duramax Cash Back', programDescription: '$3,500 customer cash on the 2026 Silverado 1500 Duramax Turbo-Diesel through GM Financial.', trims: ['LT', 'RST'] }),
];

/**
 * 35 low-APR finance deal definitions for the 2026 model year.
 *
 * Composition (see `docs/deals-coverage-2026.md`): 26 Gas / 5 Electric /
 * 2 Hybrid / 2 Plug-In Hybrid. APR values composed via `financeDeal({ apr: N })`
 * which formats the `N%` display.
 *
 * 25 deals now use tiered financing with variable cash back by term:
 * - Short terms (12-24 mo) typically have higher cash back ($2,000-$2,500)
 * - Long terms (36-72 mo) typically have lower cash back ($1,000-$1,500)
 */
const FINANCE_DEAL_DEFS: FinanceDealDef[] = [
  // ══════════════════════════════════════════════════════════════════════════
  // TIERED FINANCE DEALS (25 deals with variable APR + cash back by term)
  // ══════════════════════════════════════════════════════════════════════════

  // Chevrolet — 4 tiered deals
  financeDealTiered({
    make: 'Chevrolet', model: 'Trax',
    tiers: [
      { term: 12, apr: 4.9, cashBack: 2000 },
      { term: 24, apr: 5.4, cashBack: 2000 },
      { term: 36, apr: 5.9, cashBack: 1500 },
      { term: 48, apr: 6.2, cashBack: 1500 },
      { term: 60, apr: 6.4, cashBack: 1000 },
      { term: 72, apr: 6.6, cashBack: 1000 },
    ],
    programName: 'GM Financial Tiered APR + Cash Back',
    programDescription: 'Tiered APR financing with bonus cash back through GM Financial on select 2026 Trax models. Shorter terms get higher cash back.',
    targetAudience: 'Well-qualified buyers with credit approval through GM Financial',
    trims: ['LS', '1RS', 'LT', 'ACTIV'],
  }),
  financeDealTiered({
    make: 'Chevrolet', model: 'Equinox',
    tiers: [
      { term: 24, apr: 4.9, cashBack: 2500 },
      { term: 36, apr: 5.4, cashBack: 2000 },
      { term: 48, apr: 5.7, cashBack: 1500 },
      { term: 60, apr: 5.9, cashBack: 1500 },
      { term: 72, apr: 6.2, cashBack: 1000 },
    ],
    programName: 'Chevrolet Equinox APR + Bonus Cash',
    programDescription: 'Tiered APR with up to $2,500 bonus cash on the 2026 Equinox. Cash back varies by financing term.',
    targetAudience: 'Well-qualified buyers with 700+ credit score',
    trims: ['LS', 'LT', 'RS'],
  }),
  financeDealTiered({
    make: 'Chevrolet', model: 'Silverado',
    tiers: [
      { term: 36, apr: 3.9, cashBack: 2500 },
      { term: 48, apr: 4.4, cashBack: 2000 },
      { term: 60, apr: 4.9, cashBack: 1500 },
      { term: 72, apr: 5.4, cashBack: 1500 },
      { term: 84, apr: 5.9, cashBack: 1000 },
    ],
    programName: 'Silverado Truck Month APR + Cash',
    programDescription: 'Chevrolet Truck Month brings tiered APR plus up to $2,500 bonus cash on select Silverado 1500 models.',
    targetAudience: 'Well-qualified buyers financing through GM Financial',
    trims: ['WT', 'Custom', 'LT', 'RST', 'LT Trail Boss'],
  }),
  financeDealTiered({
    make: 'Chevrolet', model: 'Colorado',
    tiers: [
      { term: 36, apr: 4.4, cashBack: 2000 },
      { term: 48, apr: 4.9, cashBack: 1500 },
      { term: 60, apr: 5.4, cashBack: 1500 },
      { term: 72, apr: 5.9, cashBack: 1000 },
    ],
    programName: 'Chevrolet Colorado Tiered Finance',
    trims: ['WT', 'LT', 'Z71'],
  }),

  // Toyota — 5 tiered deals
  financeDealTiered({
    make: 'Toyota', model: 'Camry',
    tiers: [
      { term: 24, apr: 3.99, cashBack: 2000 },
      { term: 36, apr: 4.49, cashBack: 1500 },
      { term: 48, apr: 4.79, cashBack: 1500 },
      { term: 60, apr: 4.99, cashBack: 1000 },
      { term: 72, apr: 5.49, cashBack: 1000 },
    ],
    programName: 'Toyota Camry APR + Cash Incentive',
    programDescription: 'Toyota Financial Services tiered APR with up to $2,000 cash back on the 2026 Camry.',
    targetAudience: 'Tier 1+ credit customers through Toyota Financial Services',
    trims: ['LE', 'SE', 'XLE', 'XSE'],
  }),
  financeDealTiered({
    make: 'Toyota', model: 'RAV4',
    tiers: [
      { term: 24, apr: 4.49, cashBack: 2000 },
      { term: 36, apr: 4.99, cashBack: 1500 },
      { term: 48, apr: 5.29, cashBack: 1500 },
      { term: 60, apr: 5.49, cashBack: 1000 },
      { term: 72, apr: 5.99, cashBack: 1000 },
    ],
    programName: 'Toyota RAV4 Tiered Finance + Cash',
    programDescription: 'Tiered APR financing with up to $2,000 cash back on the 2026 RAV4.',
    trims: ['LE', 'XLE', 'XLE Premium'],
  }),
  financeDealTiered({
    make: 'Toyota', model: 'Corolla',
    tiers: [
      { term: 24, apr: 3.9, cashBack: 1500 },
      { term: 36, apr: 4.4, cashBack: 1500 },
      { term: 48, apr: 4.7, cashBack: 1000 },
      { term: 60, apr: 4.9, cashBack: 1000 },
    ],
    programName: 'Toyota Corolla Finance + Bonus Cash',
    trims: ['LE', 'SE'],
  }),
  financeDealTiered({
    make: 'Toyota', model: 'Highlander',
    tiers: [
      { term: 36, apr: 4.49, cashBack: 2000 },
      { term: 48, apr: 4.99, cashBack: 1500 },
      { term: 60, apr: 5.49, cashBack: 1500 },
      { term: 72, apr: 5.99, cashBack: 1000 },
    ],
    programName: 'Toyota Highlander Tiered APR',
    trims: ['LE', 'XLE'],
  }),
  financeDealTiered({
    make: 'Toyota', model: 'Tundra',
    tiers: [
      { term: 36, apr: 4.9, cashBack: 2500 },
      { term: 48, apr: 5.4, cashBack: 2000 },
      { term: 60, apr: 5.9, cashBack: 1500 },
      { term: 72, apr: 6.4, cashBack: 1500 },
    ],
    programName: 'Toyota Tundra APR + Truck Cash',
    trims: ['SR', 'SR5', 'Limited'],
  }),

  // Honda — 4 tiered deals
  financeDealTiered({
    make: 'Honda', model: 'CR-V',
    tiers: [
      { term: 24, apr: 4.9, cashBack: 2000 },
      { term: 36, apr: 5.4, cashBack: 1500 },
      { term: 48, apr: 5.7, cashBack: 1500 },
      { term: 60, apr: 5.9, cashBack: 1000 },
    ],
    programName: 'Honda CR-V Tiered Finance Special',
    programDescription: 'Honda Financial tiered APR with up to $2,000 cash back on the 2026 CR-V.',
    targetAudience: 'Well-qualified buyers with 700+ credit score',
    trims: ['LX', 'EX', 'EX-L'],
  }),
  financeDealTiered({
    make: 'Honda', model: 'Civic',
    tiers: [
      { term: 24, apr: 3.9, cashBack: 1500 },
      { term: 36, apr: 4.4, cashBack: 1500 },
      { term: 48, apr: 4.7, cashBack: 1000 },
      { term: 60, apr: 4.9, cashBack: 1000 },
    ],
    programName: 'Honda Civic APR + Cash Event',
    programDescription: 'Tiered APR with up to $1,500 cash back on the 2026 Honda Civic.',
    targetAudience: 'Well-qualified buyers through Honda Financial Services',
    trims: ['LX', 'Sport', 'EX'],
  }),
  financeDealTiered({
    make: 'Honda', model: 'HR-V',
    tiers: [
      { term: 24, apr: 3.9, cashBack: 1500 },
      { term: 36, apr: 4.4, cashBack: 1500 },
      { term: 48, apr: 4.7, cashBack: 1000 },
      { term: 60, apr: 4.9, cashBack: 1000 },
    ],
    programName: 'Honda HR-V Finance + Cash Back',
    trims: ['LX', 'Sport'],
  }),
  financeDealTiered({
    make: 'Honda', model: 'Pilot',
    tiers: [
      { term: 36, apr: 4.49, cashBack: 2000 },
      { term: 48, apr: 4.99, cashBack: 1500 },
      { term: 60, apr: 5.49, cashBack: 1500 },
      { term: 72, apr: 5.99, cashBack: 1000 },
    ],
    programName: 'Honda Pilot Tiered Finance Offer',
    trims: ['Sport', 'EX-L'],
  }),

  // Ford — 3 tiered deals
  financeDealTiered({
    make: 'Ford', model: 'F-150',
    tiers: [
      { term: 36, apr: 2.9, cashBack: 3000 },
      { term: 48, apr: 3.4, cashBack: 2500 },
      { term: 60, apr: 3.9, cashBack: 2000 },
      { term: 72, apr: 4.4, cashBack: 1500 },
      { term: 84, apr: 4.9, cashBack: 1000 },
    ],
    programName: 'Ford F-150 Truck Season APR + Cash',
    programDescription: 'Ford Truck Season brings tiered APR plus up to $3,000 bonus cash on select F-150 models.',
    targetAudience: 'Well-qualified buyers financing through Ford Credit',
    trims: ['XL', 'XLT', 'Lariat'],
  }),
  financeDealTiered({
    make: 'Ford', model: 'Escape',
    tiers: [
      { term: 24, apr: 4.49, cashBack: 2000 },
      { term: 36, apr: 4.99, cashBack: 1500 },
      { term: 48, apr: 5.29, cashBack: 1500 },
      { term: 60, apr: 5.49, cashBack: 1000 },
    ],
    programName: 'Ford Escape APR + Bonus Cash',
    trims: ['Active', 'ST-Line'],
  }),
  financeDealTiered({
    make: 'Ford', model: 'Mustang Mach-E',
    tiers: [
      { term: 36, apr: 3.9, cashBack: 2500 },
      { term: 48, apr: 4.4, cashBack: 2000 },
      { term: 60, apr: 4.9, cashBack: 1500 },
      { term: 72, apr: 5.4, cashBack: 1000 },
    ],
    programName: 'Ford Mach-E EV Finance + Cash',
    trims: ['Select', 'Premium'],
  }),

  // Hyundai — 3 tiered deals
  financeDealTiered({
    make: 'Hyundai', model: 'Tucson',
    tiers: [
      { term: 24, apr: 3.9, cashBack: 2000 },
      { term: 36, apr: 4.4, cashBack: 1500 },
      { term: 48, apr: 4.7, cashBack: 1500 },
      { term: 60, apr: 4.9, cashBack: 1000 },
    ],
    programName: 'Hyundai Tucson APR + Cash Savings',
    programDescription: 'Tiered APR with up to $2,000 cash back on the 2026 Tucson. Includes complimentary maintenance.',
    targetAudience: 'Well-qualified buyers with 720+ credit score',
    trims: ['SE', 'SEL', 'N Line'],
  }),
  financeDealTiered({
    make: 'Hyundai', model: 'Kona',
    tiers: [
      { term: 24, apr: 4.49, cashBack: 1500 },
      { term: 36, apr: 4.99, cashBack: 1500 },
      { term: 48, apr: 5.29, cashBack: 1000 },
      { term: 60, apr: 5.49, cashBack: 1000 },
    ],
    programName: 'Hyundai Kona Finance + Cash Back',
    programDescription: 'Tiered APR with up to $1,500 cash back on the 2026 Kona.',
    trims: ['SE', 'SEL', 'Limited'],
  }),
  financeDealTiered({
    make: 'Hyundai', model: 'Ioniq 5',
    tiers: [
      { term: 36, apr: 2.99, cashBack: 3000 },
      { term: 48, apr: 3.49, cashBack: 2500 },
      { term: 60, apr: 3.99, cashBack: 2000 },
      { term: 72, apr: 4.49, cashBack: 1500 },
    ],
    programName: 'Hyundai Ioniq 5 EV APR + Cash',
    programDescription: 'Ultra-low tiered APR with up to $3,000 cash back on the 2026 Ioniq 5. Combine with federal EV tax credit.',
    trims: ['SE', 'SEL', 'Limited'],
  }),

  // Kia — 3 tiered deals
  financeDealTiered({
    make: 'Kia', model: 'Seltos',
    tiers: [
      { term: 24, apr: 3.9, cashBack: 2000 },
      { term: 36, apr: 4.4, cashBack: 1500 },
      { term: 48, apr: 4.7, cashBack: 1500 },
      { term: 60, apr: 4.9, cashBack: 1000 },
    ],
    programName: 'Kia Seltos APR + Cash Incentive',
    programDescription: 'Tiered APR with up to $2,000 cash back on the Kia Seltos through Kia Finance America.',
    targetAudience: 'Well-qualified buyers through Kia Finance America',
    trims: ['LX', 'S', 'EX'],
  }),
  financeDealTiered({
    make: 'Kia', model: 'K5',
    tiers: [
      { term: 24, apr: 3.9, cashBack: 2000 },
      { term: 36, apr: 4.4, cashBack: 1500 },
      { term: 48, apr: 4.7, cashBack: 1500 },
      { term: 60, apr: 4.9, cashBack: 1000 },
    ],
    programName: 'Kia K5 Tiered Finance + Cash',
    trims: ['LXS', 'GT-Line'],
  }),
  financeDealTiered({
    make: 'Kia', model: 'EV6',
    tiers: [
      { term: 36, apr: 2.99, cashBack: 3000 },
      { term: 48, apr: 3.49, cashBack: 2500 },
      { term: 60, apr: 3.99, cashBack: 2000 },
      { term: 72, apr: 4.49, cashBack: 1500 },
    ],
    programName: 'Kia EV6 Special APR + Cash',
    programDescription: 'Ultra-low tiered APR with up to $3,000 cash back on the 2026 EV6. Combine with federal EV tax credit.',
    trims: ['Light', 'Wind', 'GT-Line'],
  }),

  // Nissan — 3 tiered deals
  financeDealTiered({
    make: 'Nissan', model: 'Rogue',
    tiers: [
      { term: 24, apr: 3.9, cashBack: 2000 },
      { term: 36, apr: 4.4, cashBack: 1500 },
      { term: 48, apr: 4.7, cashBack: 1500 },
      { term: 60, apr: 4.9, cashBack: 1000 },
    ],
    programName: 'Nissan Rogue APR + Bonus Cash',
    programDescription: 'Tiered APR with up to $2,000 bonus cash on the 2026 Rogue through NMAC.',
    targetAudience: 'Well-qualified buyers with Tier 1 credit',
    trims: ['S', 'SV', 'SL'],
  }),
  financeDealTiered({
    make: 'Nissan', model: 'Altima',
    tiers: [
      { term: 24, apr: 4.49, cashBack: 1500 },
      { term: 36, apr: 4.99, cashBack: 1500 },
      { term: 48, apr: 5.29, cashBack: 1000 },
      { term: 60, apr: 5.49, cashBack: 1000 },
    ],
    programName: 'Nissan Altima Tiered Finance',
    trims: ['S', 'SV'],
  }),
  financeDealTiered({
    make: 'Nissan', model: 'Leaf',
    tiers: [
      { term: 36, apr: 0.9, cashBack: 3000 },
      { term: 48, apr: 1.4, cashBack: 2500 },
      { term: 60, apr: 1.9, cashBack: 2000 },
    ],
    programName: 'Nissan Leaf EV Special Finance',
    programDescription: 'Ultra-low tiered APR with up to $3,000 cash back on the 2026 Nissan Leaf. Combine with state and federal EV incentives.',
    trims: ['S', 'SV Plus'],
  }),

  // ══════════════════════════════════════════════════════════════════════════
  // STANDARD FINANCE DEALS (10 deals without tiered cash back)
  // ══════════════════════════════════════════════════════════════════════════

  financeDeal({ make: 'Honda', model: 'Accord', apr: 4.99, term: '60 months', programName: 'Honda Accord Hybrid Finance Rate', trims: ['Sport Hybrid', 'EX-L Hybrid'] }),
  financeDeal({ make: 'Ford', model: 'Mustang', apr: 5.9, term: '48–60 months', programName: 'Ford Mustang Finance Offer', programDescription: '5.9% APR through Ford Credit on the 2026 Mustang. For well-qualified buyers.', targetAudience: 'Well-qualified buyers financing through Ford Credit', trims: ['EcoBoost', 'GT'] }),
  financeDeal({ make: 'Ford', model: 'Escape PHEV', apr: 3.9, term: '60 months', programName: 'Ford Escape PHEV Special Finance', programDescription: '3.9% APR for 60 months on the 2026 Escape Plug-In Hybrid through Ford Credit.', trims: ['ST-Line', 'Platinum'] }),
  financeDeal({ make: 'Hyundai', model: 'Ioniq 6', apr: 3.99, term: '60–72 months', programName: 'Hyundai Ioniq 6 Finance Rate', trims: ['SE', 'SEL'] }),
  financeDeal({ make: 'Mercedes-Benz', model: 'C-Class', apr: 3.99, term: '36–60 months', programName: 'Mercedes-Benz Special Finance Rate', trims: ['C 300', 'C 300 4MATIC'] }),
  financeDeal({ make: 'Mercedes-Benz', model: 'GLE', apr: 3.99, term: '36–60 months', programName: 'Mercedes-Benz GLE Finance Offer', trims: ['GLE 350', 'GLE 450 4MATIC'] }),
  financeDeal({ make: 'BMW', model: '3 Series', apr: 4.99, term: '36–60 months', programName: 'BMW Financial Services Special Rate', programDescription: '4.99% APR through BMW Financial Services on select 3 Series models.', targetAudience: 'Well-qualified buyers through BMW Financial Services', trims: ['330i', '330i xDrive'] }),
  financeDeal({ make: 'BMW', model: 'X5 xDrive50e', apr: 3.99, term: '48–60 months', programName: 'BMW X5 xDrive50e PHEV Finance Offer', programDescription: '3.99% APR on the 2026 X5 xDrive50e Plug-In Hybrid through BMW Financial Services.', trims: ['xDrive50e'] }),
  financeDeal({ make: 'GMC', model: 'Sierra 1500 Duramax', apr: 5.9, term: '48–72 months', programName: 'GMC Sierra Duramax Finance Rate', trims: ['SLE', 'SLT'] }),
  financeDeal({ make: 'Lexus', model: 'RX', apr: 4.49, term: '48–60 months', programName: 'Lexus RX Hybrid Finance Offer', trims: ['RX 350h', 'RX 450h+'] }),
];

function matchVehicle(make: string, model: string): Vehicle | undefined {
  return getAllVehicles().find(
    (v) =>
      v.make.toLowerCase() === make.toLowerCase() &&
      v.model.toLowerCase() === model.toLowerCase() &&
      parseInt(v.year) >= 2026
  );
}

export const getCashDeals = (): CashDeal[] => {
  const deals: CashDeal[] = [];
  for (const def of CASH_DEAL_DEFS) {
    const vehicle = matchVehicle(def.make, def.model);
    if (vehicle) {
      deals.push({
        id: `cash-deal-${vehicle.id}`,
        type: 'cash',
        vehicle,
        incentiveValue: def.incentiveValue,
        incentiveAmount: def.incentiveAmount,
        percentOffMsrp: def.percentOffMsrp,
        expirationDate: def.expirationDate,
        programName: def.programName,
        programDescription: def.programDescription,
        trimsEligible: def.trimsEligible,
      });
    }
  }
  return deals.sort((a, b) => b.incentiveAmount - a.incentiveAmount);
};

export const getFinanceDeals = (): FinanceDeal[] => {
  const deals: FinanceDeal[] = [];
  for (const def of FINANCE_DEAL_DEFS) {
    const vehicle = matchVehicle(def.make, def.model);
    if (vehicle) {
      deals.push({
        id: `finance-deal-${vehicle.id}`,
        type: 'finance',
        vehicle,
        apr: def.apr,
        term: def.term,
        expirationDate: def.expirationDate,
        programName: def.programName,
        programDescription: def.programDescription,
        targetAudience: def.targetAudience,
        trimsEligible: def.trimsEligible,
        rateTiers: def.rateTiers,
      });
    }
  }
  return deals;
};

export const getAllDeals = (): Deal[] => {
  return [...getCashDeals(), ...getFinanceDeals()];
};

export const getCurrentPeriod = (): { month: string; year: number } => ({
  month: CURRENT_MONTH,
  year: CURRENT_YEAR,
});

export { EXPIRATION_DATE };
