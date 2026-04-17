import { getAllVehicles } from './vehicleService';
import type { Vehicle } from '../types/vehicle';
import { EXPIRATION_DATE, leaseDeal, type LeaseDealDef } from './_dealComposer';

export interface LeaseDeal {
  id: string;
  vehicle: Vehicle;
  monthlyPayment: string;
  monthlyPaymentNum: number;
  term: string;
  dueAtSigning: string;
  mileageAllowance: string;
  expirationDate: string;
  programName: string;
  programDescription: string;
  trimsEligible: string[];
}

const CURRENT_MONTH = new Date().toLocaleString('default', { month: 'long' });
const CURRENT_YEAR = new Date().getFullYear();

/**
 * 100 lease deal definitions for the 2026 model year.
 *
 * Composition targets (see `docs/deals-coverage-2026.md`):
 *   - 58 Gas, 19 Electric, 15 Hybrid, 5 Plug-In Hybrid, 3 Diesel
 *   - 45 SUV, 25 Sedan, 14 Truck, 5 Convertible, 4 Hatchback, 3 Coupe, 4 Wagon
 *   - 23 makes with at least 1 deal each; top sellers carry 5+
 *
 * Each row is built through `leaseDeal(...)` which fills in boilerplate
 * (term, mileage, due-at-signing default, program copy) and formats monetary
 * strings. The output shape is identical to the pre-composer literal form
 * and is joined at read time to a matching 2026+ `Vehicle` record — if the
 * catalog lacks a match, the row is silently dropped.
 */
const LEASE_DEAL_DEFS: LeaseDealDef[] = [
  // Chevrolet
  leaseDeal({ make: 'Chevrolet', model: 'Trax', monthly: 299, term: '24 months', dueAtSigning: 1879, programName: 'Chevrolet Trax Ultra-Low Mileage Lease', programDescription: 'Ultra low-mileage lease for 24 months with $1,879 due at signing. No security deposit required.', trims: ['LS', '1RS'] }),
  leaseDeal({ make: 'Chevrolet', model: 'Equinox', monthly: 329, dueAtSigning: 2499, programName: 'Chevrolet Equinox Lease Special', programDescription: 'Lease a new Equinox for 36 months with competitive due at signing. Available through GM Financial.', trims: ['LS', 'LT'] }),
  leaseDeal({ make: 'Chevrolet', model: 'Trailblazer', monthly: 289, term: '24 months', dueAtSigning: 1999, programName: 'Chevrolet Trailblazer Lease Special', programDescription: 'Ultra low-mileage lease for 24 months with $1,999 due at signing. No security deposit required.', trims: ['LS', 'LT'] }),
  leaseDeal({ make: 'Chevrolet', model: 'Silverado', monthly: 459, dueAtSigning: 4199, programName: 'Chevrolet Silverado Lease Special', programDescription: 'Lease a 2026 Silverado 1500 WT for 36 months. $4,199 due at signing. No security deposit required.', trims: ['WT', 'Custom'] }),
  leaseDeal({ make: 'Chevrolet', model: 'Colorado', monthly: 399, dueAtSigning: 3499, trims: ['WT', 'LT'] }),
  leaseDeal({ make: 'Chevrolet', model: 'Silverado EV', monthly: 599, dueAtSigning: 5499, programName: 'Chevrolet Silverado EV Lease Event', trims: ['WT', 'RST'] }),
  leaseDeal({ make: 'Chevrolet', model: 'Bolt EV', monthly: 249, dueAtSigning: 1999, mileage: '12,000 mi/yr', programName: 'Chevrolet Bolt EV Lease Offer', trims: ['LT', 'Premier'] }),
  leaseDeal({ make: 'Chevrolet', model: 'Silverado 1500 Duramax', monthly: 509, dueAtSigning: 4499, programName: 'Chevrolet Silverado Duramax Lease', programDescription: 'Lease a 2026 Silverado 1500 Duramax Turbo-Diesel for 36 months. $4,499 due at signing through GM Financial.', trims: ['LT', 'RST'] }),

  // Ford
  leaseDeal({ make: 'Ford', model: 'F-150', monthly: 449, dueAtSigning: 3999, mileage: '10,500 mi/yr', programName: 'Ford F-150 Lease Event', programDescription: 'Lease a 2026 F-150 XL for 36 months. $3,999 due at signing through Ford Motor Credit.', trims: ['XL', 'XLT'] }),
  leaseDeal({ make: 'Ford', model: 'Maverick', monthly: 309, dueAtSigning: 2699, mileage: '10,500 mi/yr', programName: 'Ford Maverick Lease Offer', programDescription: 'Lease a 2026 Maverick Hybrid XL for 36 months. $2,699 due at signing through Ford Motor Credit.', trims: ['XL', 'XLT'] }),
  leaseDeal({ make: 'Ford', model: 'Escape', monthly: 289, dueAtSigning: 2499, programName: 'Ford Escape Lease Offer', trims: ['Active', 'ST-Line'] }),
  leaseDeal({ make: 'Ford', model: 'Mustang Mach-E', monthly: 429, dueAtSigning: 3999, programName: 'Ford Mustang Mach-E Lease Event', trims: ['Select', 'Premium'] }),
  leaseDeal({ make: 'Ford', model: 'Escape PHEV', monthly: 339, dueAtSigning: 2999, programName: 'Ford Escape Plug-In Hybrid Lease', programDescription: 'Lease a 2026 Escape PHEV for 36 months with 37 miles of all-electric range. $2,999 due at signing.', trims: ['ST-Line', 'Platinum'] }),
  leaseDeal({ make: 'Ford', model: 'Mustang', monthly: 419, dueAtSigning: 3499, programName: 'Ford Mustang Lease Offer', trims: ['EcoBoost', 'GT'] }),

  // Honda
  leaseDeal({ make: 'Honda', model: 'CR-V', monthly: 369, dueAtSigning: 3499, programName: 'Honda CR-V Lease Offer', programDescription: 'Lease a 2026 CR-V LX for 36 months. $3,499 due at signing through Honda Financial Services.', trims: ['LX', 'EX'] }),
  leaseDeal({ make: 'Honda', model: 'Civic', monthly: 289, dueAtSigning: 2499, programName: 'Honda Civic Lease Special', programDescription: 'Lease a 2026 Civic LX for 36 months. $2,499 due at signing through Honda Financial Services.', trims: ['LX', 'Sport'] }),
  leaseDeal({ make: 'Honda', model: 'HR-V', monthly: 269, dueAtSigning: 2399, mileage: '12,000 mi/yr', programName: 'Honda HR-V Lease Offer', programDescription: 'Lease a 2026 HR-V LX for 36 months. $2,399 due at signing through Honda Financial Services.', trims: ['LX', 'Sport'] }),
  leaseDeal({ make: 'Honda', model: 'Accord', monthly: 379, dueAtSigning: 3299, mileage: '12,000 mi/yr', programName: 'Honda Accord Hybrid Lease Special', programDescription: 'Lease a 2026 Accord Hybrid LX for 36 months. $3,299 due at signing through Honda Financial Services.', trims: ['Sport Hybrid', 'EX-L Hybrid'] }),
  leaseDeal({ make: 'Honda', model: 'Pilot', monthly: 419, dueAtSigning: 3799, programName: 'Honda Pilot Lease Offer', trims: ['Sport', 'EX-L'] }),
  leaseDeal({ make: 'Honda', model: 'Civic Hatchback', monthly: 309, dueAtSigning: 2699, programName: 'Honda Civic Hatchback Lease Offer', trims: ['LX', 'Sport'] }),

  // Toyota
  leaseDeal({ make: 'Toyota', model: 'Camry', monthly: 329, dueAtSigning: 2999, programName: 'Toyota Camry Lease Offer', programDescription: 'Lease a new Camry LE for 36 months through Toyota Financial Services. $2,999 due at signing.', trims: ['LE', 'SE'] }),
  leaseDeal({ make: 'Toyota', model: 'RAV4', monthly: 359, dueAtSigning: 2799, programName: 'Toyota RAV4 Lease Special', programDescription: 'Lease a new RAV4 LE for 36 months. $2,799 due at signing through Toyota Financial Services.', trims: ['LE', 'XLE'] }),
  leaseDeal({ make: 'Toyota', model: 'Corolla', monthly: 249, dueAtSigning: 2199, mileage: '12,000 mi/yr', programName: 'Toyota Corolla Lease Offer', programDescription: 'Lease a new Corolla LE for 36 months. $2,199 due at signing through Toyota Financial Services.', trims: ['LE', 'SE'] }),
  leaseDeal({ make: 'Toyota', model: 'Highlander', monthly: 419, dueAtSigning: 3799, programName: 'Toyota Highlander Lease Special', programDescription: 'Lease a 2026 Highlander LE for 36 months. $3,799 due at signing through Toyota Financial Services.', trims: ['LE', 'XLE'] }),
  leaseDeal({ make: 'Toyota', model: 'RAV4 Hybrid', monthly: 389, dueAtSigning: 3299, programName: 'Toyota RAV4 Hybrid Lease Event', trims: ['LE Hybrid', 'XLE Hybrid'] }),
  leaseDeal({ make: 'Toyota', model: 'bZ4X', monthly: 349, dueAtSigning: 2999, programName: 'Toyota bZ4X Lease Offer', trims: ['XLE', 'Limited'] }),
  leaseDeal({ make: 'Toyota', model: 'Tundra', monthly: 489, dueAtSigning: 4299, programName: 'Toyota Tundra i-FORCE MAX Hybrid Lease', trims: ['SR', 'SR5'] }),
  leaseDeal({ make: 'Toyota', model: 'Prius', monthly: 319, dueAtSigning: 2799, mileage: '12,000 mi/yr', programName: 'Toyota Prius Hybrid Lease', trims: ['LE', 'XLE'] }),
  leaseDeal({ make: 'Toyota', model: 'GR86', monthly: 339, dueAtSigning: 2999, programName: 'Toyota GR86 Lease Offer', trims: ['Base', 'Premium'] }),
  leaseDeal({ make: 'Toyota', model: 'RAV4 Prime', monthly: 459, dueAtSigning: 3999, programName: 'Toyota RAV4 Prime Plug-In Hybrid Lease', programDescription: 'Lease a 2026 RAV4 Prime for 36 months with 42 miles of all-electric range. $3,999 due at signing.', trims: ['SE', 'XSE'] }),

  // Hyundai
  leaseDeal({ make: 'Hyundai', model: 'Tucson', monthly: 339, dueAtSigning: 2999, programName: 'Hyundai Tucson Lease Event', programDescription: 'Lease a new Tucson SE for 36 months. $2,999 due at signing through Hyundai Motor Finance.', trims: ['SE', 'SEL'] }),
  leaseDeal({ make: 'Hyundai', model: 'Sonata', monthly: 309, dueAtSigning: 2699, programName: 'Hyundai Sonata Hybrid Lease Offer', programDescription: 'Lease a new Sonata Hybrid SE for 36 months. $2,699 due at signing through Hyundai Motor Finance.', trims: ['SEL Hybrid', 'Limited Hybrid'] }),
  leaseDeal({ make: 'Hyundai', model: 'Santa Fe', monthly: 389, dueAtSigning: 3199, programName: 'Hyundai Santa Fe Hybrid Lease Offer', programDescription: 'Lease a 2026 Santa Fe Hybrid for 36 months. $3,199 due at signing through Hyundai Motor Finance.', trims: ['SEL Hybrid', 'Limited Hybrid'] }),
  leaseDeal({ make: 'Hyundai', model: 'Kona', monthly: 259, dueAtSigning: 2199, programName: 'Hyundai Kona Lease Event', programDescription: 'Lease a new Kona SE for 36 months. $2,199 due at signing through Hyundai Motor Finance.', trims: ['SE', 'SEL'] }),
  leaseDeal({ make: 'Hyundai', model: 'Elantra', monthly: 239, dueAtSigning: 2099, programName: 'Hyundai Elantra Lease Offer', trims: ['SE', 'SEL'] }),
  leaseDeal({ make: 'Hyundai', model: 'Ioniq 5', monthly: 299, dueAtSigning: 2799, programName: 'Hyundai Ioniq 5 Lease Special', programDescription: 'Lease a 2026 Ioniq 5 SE for 36 months with instant torque and fast charging. $2,799 due at signing.', trims: ['SE', 'SEL'] }),
  leaseDeal({ make: 'Hyundai', model: 'Ioniq 6', monthly: 279, dueAtSigning: 2599, programName: 'Hyundai Ioniq 6 Lease Offer', trims: ['SE', 'SEL'] }),
  leaseDeal({ make: 'Hyundai', model: 'Santa Cruz', monthly: 349, dueAtSigning: 3099, programName: 'Hyundai Santa Cruz Lease Event', trims: ['SE', 'SEL'] }),

  // Kia
  leaseDeal({ make: 'Kia', model: 'Seltos', monthly: 279, dueAtSigning: 2299, programName: 'Kia Seltos Lease Special', programDescription: 'Lease a new Seltos LX for 36 months. $2,299 due at signing through Kia Finance America.', trims: ['LX', 'S'] }),
  leaseDeal({ make: 'Kia', model: 'K5', monthly: 299, dueAtSigning: 2499, programName: 'Kia K5 Lease Special', programDescription: 'Lease a new K5 LXS for 36 months. $2,499 due at signing through Kia Finance America.', trims: ['LXS', 'GT-Line'] }),
  leaseDeal({ make: 'Kia', model: 'Sportage Hybrid', monthly: 349, dueAtSigning: 2999, programName: 'Kia Sportage Hybrid Lease Event', programDescription: 'Lease a 2026 Sportage Hybrid LX for 36 months. $2,999 due at signing through Kia Finance America.', trims: ['LX', 'EX'] }),
  leaseDeal({ make: 'Kia', model: 'Telluride', monthly: 429, dueAtSigning: 3799, programName: 'Kia Telluride Lease Offer', trims: ['LX', 'S'] }),
  leaseDeal({ make: 'Kia', model: 'EV6', monthly: 319, dueAtSigning: 2999, programName: 'Kia EV6 Lease Special', trims: ['Light', 'Wind'] }),
  leaseDeal({ make: 'Kia', model: 'Forte', monthly: 219, dueAtSigning: 1899, mileage: '12,000 mi/yr', programName: 'Kia Forte Lease Offer', trims: ['LX', 'LXS'] }),

  // Nissan
  leaseDeal({ make: 'Nissan', model: 'Rogue', monthly: 349, dueAtSigning: 2799, programName: 'Nissan Rogue Lease Offer', programDescription: 'Lease a new Rogue S for 36 months. $2,799 due at signing through NMAC.', trims: ['S', 'SV'] }),
  leaseDeal({ make: 'Nissan', model: 'Altima', monthly: 319, dueAtSigning: 2599, mileage: '12,000 mi/yr', programName: 'Nissan Altima Lease Offer', programDescription: 'Lease a new Altima S for 36 months. $2,599 due at signing through NMAC.', trims: ['S', 'SV'] }),
  leaseDeal({ make: 'Nissan', model: 'Kicks', monthly: 229, dueAtSigning: 1999, mileage: '12,000 mi/yr', programName: 'Nissan Kicks Lease Offer', programDescription: 'Lease a new Kicks S for 36 months. $1,999 due at signing through NMAC.', trims: ['S', 'SV'] }),
  leaseDeal({ make: 'Nissan', model: 'Leaf', monthly: 259, dueAtSigning: 2299, programName: 'Nissan Leaf Lease Special', trims: ['S', 'SV Plus'] }),
  leaseDeal({ make: 'Nissan', model: 'Titan', monthly: 449, dueAtSigning: 3999, programName: 'Nissan Titan Lease Offer', trims: ['S', 'SV'] }),

  // Mazda
  leaseDeal({ make: 'Mazda', model: 'CX-5', monthly: 339, dueAtSigning: 2899, programName: 'Mazda CX-5 Lease Event', programDescription: 'Lease a 2026 CX-5 S for 36 months. $2,899 due at signing through Mazda Financial Services.', trims: ['S', 'S Select'] }),
  leaseDeal({ make: 'Mazda', model: 'CX-90', monthly: 469, dueAtSigning: 4199, programName: 'Mazda CX-90 Hybrid Lease Offer', trims: ['Select Hybrid', 'Preferred Hybrid'] }),
  leaseDeal({ make: 'Mazda', model: 'MX-5 Miata', monthly: 349, dueAtSigning: 2999, programName: 'Mazda MX-5 Miata Lease Offer', trims: ['Sport', 'Club'] }),
  leaseDeal({ make: 'Mazda', model: '3', monthly: 279, dueAtSigning: 2399, programName: 'Mazda3 Lease Event', trims: ['2.5 S', 'Select'] }),

  // Subaru
  leaseDeal({ make: 'Subaru', model: 'Crosstrek', monthly: 329, dueAtSigning: 2799, programName: 'Subaru Crosstrek Lease Offer', programDescription: 'Lease a 2026 Crosstrek Base for 36 months. $2,799 due at signing through Subaru Motors Finance.', trims: ['Base', 'Premium'] }),
  leaseDeal({ make: 'Subaru', model: 'Forester', monthly: 359, dueAtSigning: 2999, programName: 'Subaru Forester Lease Special', programDescription: 'Lease a 2026 Forester Base for 36 months. $2,999 due at signing through Subaru Motors Finance.', trims: ['Base', 'Premium'] }),
  leaseDeal({ make: 'Subaru', model: 'Outback', monthly: 349, dueAtSigning: 2999, programName: 'Subaru Outback Lease Offer', trims: ['Base', 'Premium'] }),
  leaseDeal({ make: 'Subaru', model: 'Solterra', monthly: 329, dueAtSigning: 2899, programName: 'Subaru Solterra Lease Event', trims: ['Premium', 'Limited'] }),
  leaseDeal({ make: 'Subaru', model: 'BRZ', monthly: 339, dueAtSigning: 2999, programName: 'Subaru BRZ Lease Offer', trims: ['Premium', 'Limited'] }),

  // Volkswagen
  leaseDeal({ make: 'Volkswagen', model: 'Jetta', monthly: 259, dueAtSigning: 2099, programName: 'Volkswagen Jetta Lease Event', programDescription: 'Lease a 2026 Jetta S for 36 months. $2,099 due at signing through VW Credit.', trims: ['S', 'SE'] }),
  leaseDeal({ make: 'Volkswagen', model: 'ID.4', monthly: 299, dueAtSigning: 2799, programName: 'Volkswagen ID.4 Lease Special', trims: ['Pro', 'Pro S'] }),
  leaseDeal({ make: 'Volkswagen', model: 'Atlas', monthly: 389, dueAtSigning: 3499, programName: 'Volkswagen Atlas Lease Offer', trims: ['SE', 'SE w/Technology'] }),
  leaseDeal({ make: 'Volkswagen', model: 'Golf GTI', monthly: 389, dueAtSigning: 3299, programName: 'Volkswagen Golf GTI Lease Event', trims: ['S', 'SE'] }),

  // BMW
  leaseDeal({ make: 'BMW', model: '3 Series', monthly: 429, dueAtSigning: 3999, programName: 'BMW 3 Series Lease Offer', trims: ['330i', '330i xDrive'] }),
  leaseDeal({ make: 'BMW', model: 'X5', monthly: 679, dueAtSigning: 5999, programName: 'BMW X5 Lease Event', trims: ['xDrive40i', 'M60i'] }),
  leaseDeal({ make: 'BMW', model: 'i4', monthly: 549, dueAtSigning: 4999, programName: 'BMW i4 Lease Special', trims: ['eDrive35', 'eDrive40'] }),
  leaseDeal({ make: 'BMW', model: 'iX', monthly: 699, dueAtSigning: 6499, programName: 'BMW iX Lease Offer', trims: ['xDrive50', 'M60'] }),
  leaseDeal({ make: 'BMW', model: 'X5 xDrive50e', monthly: 799, dueAtSigning: 6999, programName: 'BMW X5 xDrive50e Plug-In Hybrid Lease', programDescription: 'Lease a 2026 X5 xDrive50e PHEV for 36 months with 39 miles of all-electric range. $6,999 due at signing.', trims: ['xDrive50e'] }),

  // Mercedes-Benz
  leaseDeal({ make: 'Mercedes-Benz', model: 'C-Class', monthly: 479, dueAtSigning: 4299, programName: 'Mercedes-Benz C-Class Lease Offer', trims: ['C 300', 'C 300 4MATIC'] }),
  leaseDeal({ make: 'Mercedes-Benz', model: 'GLE', monthly: 729, dueAtSigning: 6499, programName: 'Mercedes-Benz GLE Lease Event', trims: ['GLE 350', 'GLE 450 4MATIC'] }),
  leaseDeal({ make: 'Mercedes-Benz', model: 'EQE', monthly: 779, dueAtSigning: 6999, programName: 'Mercedes-Benz EQE Lease Special', trims: ['350 4MATIC', '500 4MATIC'] }),
  leaseDeal({ make: 'Mercedes-Benz', model: 'E-Class Wagon', monthly: 669, dueAtSigning: 5999, programName: 'Mercedes-Benz E-Class All-Terrain Lease', trims: ['E 450 4MATIC'] }),
  leaseDeal({ make: 'Mercedes-Benz', model: 'SL-Class', monthly: 999, dueAtSigning: 8999, programName: 'Mercedes-AMG SL-Class Lease Event', trims: ['SL 43', 'SL 55'] }),

  // Audi
  leaseDeal({ make: 'Audi', model: 'A4', monthly: 439, dueAtSigning: 3999, programName: 'Audi A4 Lease Offer', trims: ['Premium', 'Premium Plus'] }),
  leaseDeal({ make: 'Audi', model: 'Q7', monthly: 659, dueAtSigning: 5999, programName: 'Audi Q7 Lease Event', trims: ['Premium', 'Premium Plus'] }),
  leaseDeal({ make: 'Audi', model: 'A5 Cabriolet', monthly: 549, dueAtSigning: 4999, programName: 'Audi A5 Cabriolet Lease Special', trims: ['Premium', 'Premium Plus'] }),
  leaseDeal({ make: 'Audi', model: 'Q4 e-tron', monthly: 529, dueAtSigning: 4799, programName: 'Audi Q4 e-tron Lease Offer', trims: ['50 quattro', 'Premium Plus'] }),
  leaseDeal({ make: 'Audi', model: 'e-tron GT', monthly: 899, dueAtSigning: 7999, programName: 'Audi e-tron GT Lease Event', trims: ['Premium Plus', 'Prestige'] }),

  // Tesla
  leaseDeal({ make: 'Tesla', model: 'Model 3', monthly: 349, dueAtSigning: 2999, programName: 'Tesla Model 3 Lease Offer', trims: ['Long Range', 'Performance'] }),
  leaseDeal({ make: 'Tesla', model: 'Model Y', monthly: 399, dueAtSigning: 3499, programName: 'Tesla Model Y Lease Event', trims: ['Long Range', 'Performance'] }),
  leaseDeal({ make: 'Tesla', model: 'Model S', monthly: 899, dueAtSigning: 7999, programName: 'Tesla Model S Lease Special', trims: ['Long Range', 'Plaid'] }),

  // Genesis
  leaseDeal({ make: 'Genesis', model: 'G70', monthly: 419, dueAtSigning: 3799, programName: 'Genesis G70 Lease Offer', trims: ['2.5T', '3.3T'] }),
  leaseDeal({ make: 'Genesis', model: 'GV80', monthly: 569, dueAtSigning: 4999, programName: 'Genesis GV80 Lease Event', trims: ['2.5T', '3.5T'] }),
  leaseDeal({ make: 'Genesis', model: 'G70 Convertible', monthly: 459, dueAtSigning: 3999, programName: 'Genesis G70 Convertible Lease Special', trims: ['2.5T Sport Prestige'] }),

  // Lexus
  leaseDeal({ make: 'Lexus', model: 'ES', monthly: 479, dueAtSigning: 4199, programName: 'Lexus ES Hybrid Lease Offer', trims: ['ES 300h', 'ES 300h Luxury'] }),
  leaseDeal({ make: 'Lexus', model: 'RX', monthly: 599, dueAtSigning: 5499, programName: 'Lexus RX Hybrid Lease Event', trims: ['RX 350h', 'RX 450h+'] }),
  leaseDeal({ make: 'Lexus', model: 'LC Convertible', monthly: 999, dueAtSigning: 8999, programName: 'Lexus LC Convertible Lease Special', trims: ['LC 500'] }),

  // Volvo
  leaseDeal({ make: 'Volvo', model: 'XC90', monthly: 619, dueAtSigning: 5499, programName: 'Volvo XC90 Recharge Lease Offer', trims: ['B5 Core', 'T8 Plus'] }),
  leaseDeal({ make: 'Volvo', model: 'S60', monthly: 389, dueAtSigning: 3499, programName: 'Volvo S60 Recharge Lease Event', trims: ['Core', 'Plus'] }),
  leaseDeal({ make: 'Volvo', model: 'V60', monthly: 429, dueAtSigning: 3799, programName: 'Volvo V60 Cross Country Lease Special', trims: ['Plus', 'Ultimate'] }),
  leaseDeal({ make: 'Volvo', model: 'V90', monthly: 479, dueAtSigning: 4299, programName: 'Volvo V90 Cross Country Lease Offer', trims: ['Plus', 'Ultimate'] }),

  // Jeep
  leaseDeal({ make: 'Jeep', model: 'Grand Cherokee', monthly: 449, dueAtSigning: 3999, programName: 'Jeep Grand Cherokee Lease Event', trims: ['Laredo', 'Limited'] }),
  leaseDeal({ make: 'Jeep', model: 'Wrangler 4xe', monthly: 539, dueAtSigning: 4799, programName: 'Jeep Wrangler 4xe Plug-In Hybrid Lease', programDescription: 'Lease a 2026 Wrangler 4xe for 36 months with 22 miles of all-electric range. $4,799 due at signing.', trims: ['Sport S 4xe', 'Rubicon 4xe'] }),
  leaseDeal({ make: 'Jeep', model: 'Grand Cherokee 4xe', monthly: 629, dueAtSigning: 5599, programName: 'Jeep Grand Cherokee 4xe Plug-In Hybrid Lease', programDescription: 'Lease a 2026 Grand Cherokee 4xe for 36 months with 25 miles of all-electric range. $5,599 due at signing.', trims: ['Limited 4xe', 'Overland 4xe'] }),

  // Ram
  leaseDeal({ make: 'Ram', model: '1500', monthly: 469, dueAtSigning: 4199, programName: 'Ram 1500 Lease Offer', trims: ['Tradesman', 'Big Horn'] }),
  leaseDeal({ make: 'Ram', model: '1500 EcoDiesel', monthly: 529, dueAtSigning: 4699, programName: 'Ram 1500 EcoDiesel Lease Event', programDescription: 'Lease a 2026 Ram 1500 EcoDiesel for 36 months. $4,699 due at signing through Stellantis Financial.', trims: ['Big Horn', 'Laramie'] }),

  // GMC
  leaseDeal({ make: 'GMC', model: 'Sierra', monthly: 479, dueAtSigning: 4299, programName: 'GMC Sierra Lease Offer', trims: ['Pro', 'SLE'] }),
  leaseDeal({ make: 'GMC', model: 'Sierra EV', monthly: 679, dueAtSigning: 5999, programName: 'GMC Sierra EV Lease Event', trims: ['Elevation', 'Denali'] }),
  leaseDeal({ make: 'GMC', model: 'Sierra 1500 Duramax', monthly: 519, dueAtSigning: 4599, programName: 'GMC Sierra Duramax Lease Special', programDescription: 'Lease a 2026 Sierra 1500 Duramax Turbo-Diesel for 36 months. $4,599 due at signing.', trims: ['SLE', 'SLT'] }),

  // Mini
  leaseDeal({ make: 'Mini', model: 'Cooper Hardtop', monthly: 309, dueAtSigning: 2699, programName: 'MINI Cooper Hardtop Lease Offer', trims: ['Cooper', 'Cooper S'] }),

  // Porsche
  leaseDeal({ make: 'Porsche', model: 'Cayenne', monthly: 849, dueAtSigning: 7499, programName: 'Porsche Cayenne Lease Event', trims: ['Base', 'S'] }),
];

export const getLeaseDeals = (): LeaseDeal[] => {
  const allVehicles = getAllVehicles();
  const deals: LeaseDeal[] = [];
  for (const def of LEASE_DEAL_DEFS) {
    const vehicle = allVehicles.find(
      (v) =>
        v.make.toLowerCase() === def.make.toLowerCase() &&
        v.model.toLowerCase() === def.model.toLowerCase() &&
        parseInt(v.year) >= 2026
    );
    if (vehicle) {
      deals.push({
        id: `lease-deal-${vehicle.id}`,
        vehicle,
        monthlyPayment: def.monthlyPayment,
        monthlyPaymentNum: def.monthlyPaymentNum,
        term: def.term,
        dueAtSigning: def.dueAtSigning,
        mileageAllowance: def.mileageAllowance,
        expirationDate: def.expirationDate,
        programName: def.programName,
        programDescription: def.programDescription,
        trimsEligible: def.trimsEligible,
      });
    }
  }
  return deals.sort((a, b) => a.monthlyPaymentNum - b.monthlyPaymentNum);
};

export const getCurrentPeriod = (): { month: string; year: number } => ({
  month: CURRENT_MONTH,
  year: CURRENT_YEAR,
});

export { EXPIRATION_DATE };
