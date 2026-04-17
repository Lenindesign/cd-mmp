import { getAllVehicles } from './vehicleService';
import type { Vehicle } from '../types/vehicle';
import { EXPIRATION_DATE, zeroAprDeal, type ZeroAprDealDef } from './_dealComposer';

export interface ZeroAprDeal {
  id: string;
  vehicle: Vehicle;
  apr: number;
  term: string;
  expirationDate: string;
  programName: string;
  programDescription: string;
  targetAudience: string;
  trimsEligible: string[];
}

const CURRENT_MONTH = new Date().toLocaleString('default', { month: 'long' });
const CURRENT_YEAR = new Date().getFullYear();

/**
 * 30 zero-APR deal definitions for the 2026 model year.
 *
 * Composition (see `docs/deals-coverage-2026.md`): 23 Gas / 5 Hybrid / 2
 * Electric. Every row binds to a matching 2026+ `Vehicle` record.
 */
const DEAL_DEFINITIONS: ZeroAprDealDef[] = [
  // Chevrolet
  zeroAprDeal({ make: 'Chevrolet', model: 'Equinox', term: '60 months', programName: 'Chevrolet 0% APR Event', programDescription: 'Get 0% APR financing for up to 60 months on the all-new Chevrolet Equinox through GM Financial. No down payment required for well-qualified buyers.', targetAudience: 'Well-qualified buyers with 720+ credit score', trims: ['LS', 'LT', 'RS'] }),
  zeroAprDeal({ make: 'Chevrolet', model: 'Trax', term: '48 months', programName: 'Chevrolet Spring Sales Event', programDescription: 'Take advantage of 0% APR financing for 48 months on the 2026 Chevrolet Trax through GM Financial.', targetAudience: 'Well-qualified buyers with 700+ credit score', trims: ['LS', '1RS', 'LT', 'ACTIV'] }),
  zeroAprDeal({ make: 'Chevrolet', model: 'Trailblazer', term: '60 months', programName: 'Chevrolet Trailblazer 0% APR', programDescription: '0% APR financing for 60 months on the 2026 Trailblazer through GM Financial.', trims: ['LS', 'LT', 'ACTIV'] }),
  zeroAprDeal({ make: 'Chevrolet', model: 'Silverado', term: '72 months', programName: 'Chevrolet Truck Month', programDescription: 'Chevrolet Truck Month brings 0% APR for 72 months on select Silverado 1500 models. Plus $1,000 bonus cash.', targetAudience: 'Well-qualified buyers financing through GM Financial', trims: ['WT', 'Custom', 'LT', 'RST'] }),
  zeroAprDeal({ make: 'Chevrolet', model: 'Colorado', term: '60 months', programName: 'Chevrolet Colorado 0% APR', targetAudience: 'Well-qualified buyers financing through GM Financial', trims: ['WT', 'LT', 'Z71'] }),

  // Toyota
  zeroAprDeal({ make: 'Toyota', model: 'Camry', term: '60 months', programName: 'Toyota Special Finance Offer', programDescription: 'Toyota Financial Services is offering 0% APR for 60 months on the popular Camry sedan. Available at participating dealers.', targetAudience: 'Tier 1+ credit customers through Toyota Financial Services', trims: ['LE', 'SE', 'XLE', 'XSE'] }),
  zeroAprDeal({ make: 'Toyota', model: 'RAV4', term: '48 months', programName: 'Toyota RAV4 Spring Special', programDescription: '0% APR financing for 48 months on America\'s best-selling SUV. Limited-time offer through Toyota Financial Services.', trims: ['LE', 'XLE', 'XLE Premium'] }),
  zeroAprDeal({ make: 'Toyota', model: 'Corolla', term: '60 months', programName: 'Toyota Corolla 0% APR', programDescription: '0% APR for 60 months on the 2026 Corolla through Toyota Financial Services.', targetAudience: 'Tier 1+ credit customers through Toyota Financial Services', trims: ['LE', 'SE'] }),
  zeroAprDeal({ make: 'Toyota', model: 'Highlander', term: '48 months', programName: 'Toyota Highlander 0% APR Offer', trims: ['LE', 'XLE', 'Limited'] }),
  zeroAprDeal({ make: 'Toyota', model: 'RAV4 Hybrid', term: '60 months', programName: 'Toyota RAV4 Hybrid 0% APR', programDescription: '0% APR financing for 60 months on the RAV4 Hybrid. Available through Toyota Financial Services for Tier 1+ customers.', targetAudience: 'Tier 1+ credit customers through Toyota Financial Services', trims: ['LE Hybrid', 'XLE Hybrid'] }),
  zeroAprDeal({ make: 'Toyota', model: 'Tundra', term: '60 months', programName: 'Toyota Tundra i-FORCE MAX 0% APR', programDescription: '0% APR for 60 months on the 2026 Tundra i-FORCE MAX Hybrid through Toyota Financial Services.', trims: ['SR', 'SR5', 'Limited'] }),

  // Honda
  zeroAprDeal({ make: 'Honda', model: 'CR-V', term: '60 months', programName: 'Honda Dream Deal', programDescription: 'Honda is offering 0% APR for 60 months on the CR-V, the benchmark compact SUV. Available through Honda Financial Services.', targetAudience: 'Well-qualified buyers with 700+ credit score', trims: ['LX', 'EX', 'EX-L'] }),
  zeroAprDeal({ make: 'Honda', model: 'Civic', term: '60 months', programName: 'Honda Civic Spring Event', programDescription: 'Finance the all-new Civic at 0% APR for 60 months through Honda Financial Services. America\'s favorite compact sedan.', targetAudience: 'Well-qualified buyers through Honda Financial Services', trims: ['LX', 'Sport', 'EX'] }),
  zeroAprDeal({ make: 'Honda', model: 'Accord', term: '60 months', programName: 'Honda Accord Hybrid 0% APR', programDescription: '0% APR for 60 months on the 2026 Accord Hybrid through Honda Financial Services.', trims: ['Sport Hybrid', 'EX-L Hybrid'] }),
  zeroAprDeal({ make: 'Honda', model: 'HR-V', term: '48 months', programName: 'Honda HR-V 0% APR Event', trims: ['LX', 'Sport', 'EX-L'] }),
  zeroAprDeal({ make: 'Honda', model: 'Pilot', term: '60 months', programName: 'Honda Pilot 0% APR Special', targetAudience: 'Well-qualified buyers with 720+ credit score', trims: ['Sport', 'EX-L', 'Touring'] }),

  // Ford
  zeroAprDeal({ make: 'Ford', model: 'F-150', term: '72 months', programName: 'Ford Truck Season', programDescription: 'Ford is offering 0% APR for 72 months on select F-150 models during Truck Season. Combined with $500 bonus cash.', targetAudience: 'Well-qualified buyers financing through Ford Credit', trims: ['XL', 'XLT', 'Lariat'] }),
  zeroAprDeal({ make: 'Ford', model: 'Escape', term: '60 months', programName: 'Ford Escape 0% APR Offer', targetAudience: 'Well-qualified buyers financing through Ford Credit', trims: ['Active', 'ST-Line', 'Platinum'] }),
  zeroAprDeal({ make: 'Ford', model: 'Mustang Mach-E', term: '60 months', programName: 'Ford Mustang Mach-E 0% APR Event', programDescription: '0% APR financing for 60 months on the 2026 Mustang Mach-E through Ford Credit. Combined with federal EV tax credit eligibility.', targetAudience: 'Well-qualified buyers financing through Ford Credit', trims: ['Select', 'Premium', 'GT'] }),

  // Hyundai
  zeroAprDeal({ make: 'Hyundai', model: 'Tucson', term: '60 months', programName: 'Hyundai Spring Savings Event', programDescription: '0% APR for 60 months on the Hyundai Tucson through Hyundai Motor Finance. Includes complimentary maintenance.', targetAudience: 'Well-qualified buyers with 720+ credit score', trims: ['SE', 'SEL', 'N Line'] }),
  zeroAprDeal({ make: 'Hyundai', model: 'Kona', term: '48 months', programName: 'Hyundai Kona Special APR', programDescription: 'Finance the fun-to-drive Kona at 0% APR for 48 months. Available through Hyundai Motor Finance at participating dealers.', trims: ['SE', 'SEL', 'Limited'] }),
  zeroAprDeal({ make: 'Hyundai', model: 'Elantra', term: '60 months', programName: 'Hyundai Elantra 0% APR', trims: ['SE', 'SEL', 'Limited'] }),
  zeroAprDeal({ make: 'Hyundai', model: 'Santa Fe', term: '60 months', programName: 'Hyundai Santa Fe Hybrid 0% APR', programDescription: '0% APR for 60 months on the 2026 Santa Fe Hybrid through Hyundai Motor Finance.', trims: ['SEL Hybrid', 'Limited Hybrid'] }),
  zeroAprDeal({ make: 'Hyundai', model: 'Sonata', term: '60 months', programName: 'Hyundai Sonata Hybrid 0% APR', trims: ['SEL Hybrid', 'Limited Hybrid'] }),
  zeroAprDeal({ make: 'Hyundai', model: 'Ioniq 5', term: '60 months', programName: 'Hyundai Ioniq 5 0% APR Event', programDescription: '0% APR financing for 60 months on the Ioniq 5 through Hyundai Motor Finance. Plus $7,500 EV tax credit eligibility.', trims: ['SE', 'SEL', 'Limited'] }),

  // Kia
  zeroAprDeal({ make: 'Kia', model: 'Seltos', term: '60 months', programName: 'Kia Spring Clearance', programDescription: '0% APR for 60 months on the versatile Kia Seltos. Available through Kia Finance America at participating dealers.', targetAudience: 'Well-qualified buyers through Kia Finance America', trims: ['LX', 'S', 'EX'] }),
  zeroAprDeal({ make: 'Kia', model: 'Telluride', term: '60 months', programName: 'Kia Telluride 0% APR', targetAudience: 'Well-qualified buyers with 720+ credit score', trims: ['LX', 'S', 'EX'] }),
  zeroAprDeal({ make: 'Kia', model: 'K5', term: '60 months', programName: 'Kia K5 0% APR Event', trims: ['LXS', 'GT-Line', 'EX'] }),

  // Nissan
  zeroAprDeal({ make: 'Nissan', model: 'Rogue', term: '60 months', programName: 'Nissan Now Sales Event', programDescription: 'Get 0% APR for 60 months on the Nissan Rogue through Nissan Motor Acceptance Corporation. Limited availability.', targetAudience: 'Well-qualified buyers with Tier 1 credit', trims: ['S', 'SV', 'SL'] }),
  zeroAprDeal({ make: 'Nissan', model: 'Altima', term: '60 months', programName: 'Nissan Altima 0% APR Special', trims: ['S', 'SV', 'SL'] }),
];

export const getZeroAprDeals = (): ZeroAprDeal[] => {
  const allVehicles = getAllVehicles();
  const deals: ZeroAprDeal[] = [];

  for (const def of DEAL_DEFINITIONS) {
    const vehicle = allVehicles.find(
      (v) =>
        v.make.toLowerCase() === def.make.toLowerCase() &&
        v.model.toLowerCase() === def.model.toLowerCase() &&
        parseInt(v.year) >= 2026
    );

    if (vehicle) {
      deals.push({
        id: `zero-apr-${vehicle.id}`,
        vehicle,
        apr: 0,
        term: def.term,
        expirationDate: EXPIRATION_DATE,
        programName: def.programName,
        programDescription: def.programDescription,
        targetAudience: def.targetAudience,
        trimsEligible: def.trimsEligible,
      });
    }
  }

  return deals;
};

export const getCurrentPeriod = (): { month: string; year: number } => ({
  month: CURRENT_MONTH,
  year: CURRENT_YEAR,
});
