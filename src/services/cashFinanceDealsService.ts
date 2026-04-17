import { getAllVehicles } from './vehicleService';
import type { Vehicle } from '../types/vehicle';
import {
  EXPIRATION_DATE,
  cashDeal,
  financeDeal,
  type CashDealDef,
  type FinanceDealDef,
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
 */
const FINANCE_DEAL_DEFS: FinanceDealDef[] = [
  // Chevrolet
  financeDeal({ make: 'Chevrolet', model: 'Trax', apr: 6.6, term: '36–72 months', programName: 'GM Financial Special APR', programDescription: '6.6% APR financing for 36–72 months through GM Financial on select 2026 Trax models.', targetAudience: 'Well-qualified buyers with credit approval through GM Financial', trims: ['LS', '1RS', 'LT', 'ACTIV'] }),
  financeDeal({ make: 'Chevrolet', model: 'Equinox', apr: 5.9, term: '36–72 months', programName: 'Chevrolet Special Finance Rate', programDescription: '5.9% APR through GM Financial on the Equinox. For well-qualified buyers.', targetAudience: 'Well-qualified buyers with 700+ credit score', trims: ['LS', 'LT', 'RS'] }),
  financeDeal({ make: 'Chevrolet', model: 'Silverado', apr: 4.9, term: '48–72 months', programName: 'Silverado Low APR + Bonus Cash', programDescription: '4.9% APR plus $1,500 bonus cash on select 2026 Silverado 1500 models.', targetAudience: 'Well-qualified buyers financing through GM Financial', trims: ['WT', 'Custom', 'LT', 'RST'] }),
  financeDeal({ make: 'Chevrolet', model: 'Colorado', apr: 5.4, term: '48–72 months', programName: 'Chevrolet Colorado Finance Rate', trims: ['WT', 'LT', 'Z71'] }),

  // Toyota
  financeDeal({ make: 'Toyota', model: 'Camry', apr: 4.99, term: '60 months', programName: 'Toyota Financial Services Special APR', programDescription: '4.99% APR for 60 months on the 2026 Camry through Toyota Financial Services.', targetAudience: 'Tier 1+ credit customers through Toyota Financial Services', trims: ['LE', 'SE', 'XLE', 'XSE'] }),
  financeDeal({ make: 'Toyota', model: 'RAV4', apr: 5.49, term: '60 months', programName: 'Toyota RAV4 Finance Offer', programDescription: '5.49% APR for 60 months on the 2026 RAV4. Available through Toyota Financial Services.', trims: ['LE', 'XLE', 'XLE Premium'] }),
  financeDeal({ make: 'Toyota', model: 'Corolla', apr: 4.9, term: '60 months', programName: 'Toyota Corolla Finance Offer', trims: ['LE', 'SE'] }),
  financeDeal({ make: 'Toyota', model: 'Highlander', apr: 5.49, term: '60 months', programName: 'Toyota Highlander Finance Rate', trims: ['LE', 'XLE'] }),
  financeDeal({ make: 'Toyota', model: 'Tundra', apr: 5.9, term: '60 months', programName: 'Toyota Tundra Finance Offer', trims: ['SR', 'SR5', 'Limited'] }),

  // Honda
  financeDeal({ make: 'Honda', model: 'CR-V', apr: 5.9, term: '48–60 months', programName: 'Honda Financial Special Rate', programDescription: '5.9% APR for 48–60 months through Honda Financial on the 2026 CR-V.', targetAudience: 'Well-qualified buyers with 700+ credit score', trims: ['LX', 'EX', 'EX-L'] }),
  financeDeal({ make: 'Honda', model: 'Civic', apr: 4.9, term: '48–60 months', programName: 'Honda Civic Finance Special', programDescription: '4.9% APR for 48–60 months on the 2026 Honda Civic through Honda Financial Services.', targetAudience: 'Well-qualified buyers through Honda Financial Services', trims: ['LX', 'Sport', 'EX'] }),
  financeDeal({ make: 'Honda', model: 'HR-V', apr: 4.9, term: '48–60 months', programName: 'Honda HR-V Finance Rate', trims: ['LX', 'Sport'] }),
  financeDeal({ make: 'Honda', model: 'Pilot', apr: 5.49, term: '60 months', programName: 'Honda Pilot Finance Offer', trims: ['Sport', 'EX-L'] }),
  financeDeal({ make: 'Honda', model: 'Accord', apr: 4.99, term: '60 months', programName: 'Honda Accord Hybrid Finance Rate', trims: ['Sport Hybrid', 'EX-L Hybrid'] }),

  // Ford
  financeDeal({ make: 'Ford', model: 'F-150', apr: 3.9, term: '60–72 months', programName: 'Ford Credit Low APR', programDescription: '3.9% APR plus $2,000 bonus cash on select 2026 F-150 models through Ford Credit.', targetAudience: 'Well-qualified buyers financing through Ford Credit', trims: ['XL', 'XLT', 'Lariat'] }),
  financeDeal({ make: 'Ford', model: 'Mustang', apr: 5.9, term: '48–60 months', programName: 'Ford Mustang Finance Offer', programDescription: '5.9% APR through Ford Credit on the 2026 Mustang. For well-qualified buyers.', targetAudience: 'Well-qualified buyers financing through Ford Credit', trims: ['EcoBoost', 'GT'] }),
  financeDeal({ make: 'Ford', model: 'Escape', apr: 5.49, term: '60 months', programName: 'Ford Escape Finance Rate', trims: ['Active', 'ST-Line'] }),
  financeDeal({ make: 'Ford', model: 'Escape PHEV', apr: 3.9, term: '60 months', programName: 'Ford Escape PHEV Special Finance', programDescription: '3.9% APR for 60 months on the 2026 Escape Plug-In Hybrid through Ford Credit.', trims: ['ST-Line', 'Platinum'] }),
  financeDeal({ make: 'Ford', model: 'Mustang Mach-E', apr: 4.9, term: '60–72 months', programName: 'Ford Mustang Mach-E Finance Offer', trims: ['Select', 'Premium'] }),

  // Hyundai
  financeDeal({ make: 'Hyundai', model: 'Tucson', apr: 4.9, term: '60 months', programName: 'Hyundai Motor Finance Special APR', programDescription: '4.9% APR for 60 months on the Tucson through Hyundai Motor Finance. Includes complimentary maintenance.', targetAudience: 'Well-qualified buyers with 720+ credit score', trims: ['SE', 'SEL', 'N Line'] }),
  financeDeal({ make: 'Hyundai', model: 'Kona', apr: 5.49, term: '48–60 months', programName: 'Hyundai Kona Finance Rate', programDescription: '5.49% APR through Hyundai Motor Finance on the 2026 Kona.', trims: ['SE', 'SEL', 'Limited'] }),
  financeDeal({ make: 'Hyundai', model: 'Ioniq 5', apr: 3.99, term: '60–72 months', programName: 'Hyundai Ioniq 5 EV Finance Offer', programDescription: '3.99% APR through Hyundai Motor Finance on the 2026 Ioniq 5. Combine with federal EV tax credit.', trims: ['SE', 'SEL', 'Limited'] }),
  financeDeal({ make: 'Hyundai', model: 'Ioniq 6', apr: 3.99, term: '60–72 months', programName: 'Hyundai Ioniq 6 Finance Rate', trims: ['SE', 'SEL'] }),

  // Kia
  financeDeal({ make: 'Kia', model: 'Seltos', apr: 4.9, term: '60 months', programName: 'Kia Finance America Special APR', programDescription: '4.9% APR for 60 months on the Kia Seltos through Kia Finance America.', targetAudience: 'Well-qualified buyers through Kia Finance America', trims: ['LX', 'S', 'EX'] }),
  financeDeal({ make: 'Kia', model: 'K5', apr: 4.9, term: '60 months', programName: 'Kia K5 Finance Offer', trims: ['LXS', 'GT-Line'] }),
  financeDeal({ make: 'Kia', model: 'EV6', apr: 3.99, term: '60–72 months', programName: 'Kia EV6 Special Finance', programDescription: '3.99% APR on the 2026 EV6 through Kia Finance America. Combine with federal EV tax credit.', trims: ['Light', 'Wind', 'GT-Line'] }),

  // Nissan
  financeDeal({ make: 'Nissan', model: 'Rogue', apr: 4.9, term: '60 months', programName: 'Nissan Now Finance Offer', programDescription: '4.9% APR plus $1,000 bonus cash on the 2026 Rogue through NMAC.', targetAudience: 'Well-qualified buyers with Tier 1 credit', trims: ['S', 'SV', 'SL'] }),
  financeDeal({ make: 'Nissan', model: 'Altima', apr: 5.49, term: '60 months', programName: 'Nissan Altima Finance Rate', trims: ['S', 'SV'] }),
  financeDeal({ make: 'Nissan', model: 'Leaf', apr: 1.9, term: '60 months', programName: 'Nissan Leaf EV Special Finance', programDescription: 'Ultra-low 1.9% APR through NMAC on the 2026 Nissan Leaf. Combine with state and federal EV incentives when eligible.', trims: ['S', 'SV Plus'] }),

  // Luxury
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
