/**
 * EPA Fuel Economy API Service
 * Free API for vehicle fuel economy data
 * Documentation: https://www.fueleconomy.gov/feg/ws/
 */

export interface FuelEconomyData {
  id: number;
  year: number;
  make: string;
  model: string;
  baseModel: string;
  
  // MPG Data
  city08: number;        // City MPG (EPA)
  highway08: number;     // Highway MPG (EPA)
  comb08: number;        // Combined MPG (EPA)
  
  // Unrounded MPG (more precise)
  city08U: number;
  highway08U: number;
  comb08U: number;
  
  // Vehicle Details
  cylinders: number;
  displ: number;         // Engine displacement in liters
  drive: string;         // Drivetrain (e.g., "All-Wheel Drive")
  trany: string;         // Transmission
  fuelType: string;      // Fuel type grade
  fuelType1: string;     // Primary fuel type
  VClass: string;        // Vehicle class
  
  // Environmental Scores
  feScore: number;       // Fuel Economy Score (1-10)
  ghgScore: number;      // Greenhouse Gas Score (1-10)
  co2: number;           // CO2 emissions (grams/mile)
  co2TailpipeGpm: number;
  
  // Cost
  fuelCost08: number;    // Annual fuel cost
  youSaveSpend: number;  // Savings vs average vehicle
  
  // EV/Hybrid specific
  evMotor?: string;
  rangeCity?: number;
  rangeHwy?: number;
  range?: number;
  phevComb?: number;
  
  // Features
  startStop: string;     // Start-stop technology
  tCharger: string;      // Turbocharger
  sCharger: string;      // Supercharger
}

export interface FuelEconomyOption {
  text: string;
  value: string;
}

interface XMLMenuItem {
  text: string;
  value: string;
}

const EPA_BASE_URL = 'https://www.fueleconomy.gov/ws/rest';

/**
 * Parse XML response to extract menu items
 */
function parseMenuItems(xmlText: string): XMLMenuItem[] {
  const items: XMLMenuItem[] = [];
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
  const menuItems = xmlDoc.getElementsByTagName('menuItem');
  
  for (let i = 0; i < menuItems.length; i++) {
    const item = menuItems[i];
    const text = item.getElementsByTagName('text')[0]?.textContent || '';
    const value = item.getElementsByTagName('value')[0]?.textContent || '';
    items.push({ text, value });
  }
  
  return items;
}

/**
 * Parse XML vehicle data
 */
function parseVehicleData(xmlText: string): FuelEconomyData | null {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
  
  const getValue = (tag: string): string => {
    const element = xmlDoc.getElementsByTagName(tag)[0];
    return element?.textContent || '';
  };
  
  const getNumber = (tag: string): number => {
    const val = getValue(tag);
    return val ? parseFloat(val) : 0;
  };
  
  const id = getNumber('id');
  if (!id) return null;
  
  return {
    id,
    year: getNumber('year'),
    make: getValue('make'),
    model: getValue('model'),
    baseModel: getValue('baseModel'),
    city08: getNumber('city08'),
    highway08: getNumber('highway08'),
    comb08: getNumber('comb08'),
    city08U: getNumber('city08U'),
    highway08U: getNumber('highway08U'),
    comb08U: getNumber('comb08U'),
    cylinders: getNumber('cylinders'),
    displ: getNumber('displ'),
    drive: getValue('drive'),
    trany: getValue('trany'),
    fuelType: getValue('fuelType'),
    fuelType1: getValue('fuelType1'),
    VClass: getValue('VClass'),
    feScore: getNumber('feScore'),
    ghgScore: getNumber('ghgScore'),
    co2: getNumber('co2'),
    co2TailpipeGpm: getNumber('co2TailpipeGpm'),
    fuelCost08: getNumber('fuelCost08'),
    youSaveSpend: getNumber('youSaveSpend'),
    evMotor: getValue('evMotor') || undefined,
    rangeCity: getNumber('rangeCity') || undefined,
    rangeHwy: getNumber('rangeHwy') || undefined,
    range: getNumber('range') || undefined,
    phevComb: getNumber('phevComb') || undefined,
    startStop: getValue('startStop'),
    tCharger: getValue('tCharger'),
    sCharger: getValue('sCharger'),
  };
}

/**
 * Get available models for a year and make
 */
export async function getModels(year: number, make: string): Promise<FuelEconomyOption[]> {
  try {
    const url = `${EPA_BASE_URL}/vehicle/menu/model?year=${year}&make=${encodeURIComponent(make)}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`EPA API error: ${response.status}`);
    }
    
    const xmlText = await response.text();
    return parseMenuItems(xmlText);
  } catch (error) {
    console.error('Error fetching EPA models:', error);
    return [];
  }
}

/**
 * Get vehicle options (engine/transmission variants) for a specific model
 */
export async function getVehicleOptions(year: number, make: string, model: string): Promise<FuelEconomyOption[]> {
  try {
    const url = `${EPA_BASE_URL}/vehicle/menu/options?year=${year}&make=${encodeURIComponent(make)}&model=${encodeURIComponent(model)}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`EPA API error: ${response.status}`);
    }
    
    const xmlText = await response.text();
    return parseMenuItems(xmlText);
  } catch (error) {
    console.error('Error fetching EPA vehicle options:', error);
    return [];
  }
}

/**
 * Get detailed fuel economy data for a vehicle by ID
 */
export async function getVehicleById(vehicleId: number): Promise<FuelEconomyData | null> {
  try {
    const url = `${EPA_BASE_URL}/vehicle/${vehicleId}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`EPA API error: ${response.status}`);
    }
    
    const xmlText = await response.text();
    return parseVehicleData(xmlText);
  } catch (error) {
    console.error('Error fetching EPA vehicle data:', error);
    return null;
  }
}

/**
 * Search for a vehicle and get fuel economy data
 * Returns the first matching vehicle's data
 */
export async function searchVehicle(
  year: number,
  make: string,
  model: string
): Promise<FuelEconomyData | null> {
  try {
    // First, get available models to find the best match
    const models = await getModels(year, make);
    
    // Find models that match (case-insensitive, partial match)
    const modelLower = model.toLowerCase();
    const matchingModels = models.filter(m => 
      m.text.toLowerCase().includes(modelLower) ||
      modelLower.includes(m.text.toLowerCase().split(' ')[0])
    );
    
    if (matchingModels.length === 0) {
      console.log('No matching models found for:', year, make, model);
      return null;
    }
    
    // Get options for the first matching model
    const options = await getVehicleOptions(year, make, matchingModels[0].value);
    
    if (options.length === 0) {
      console.log('No options found for:', matchingModels[0].value);
      return null;
    }
    
    // Get vehicle data for the first option
    const vehicleId = parseInt(options[0].value, 10);
    return await getVehicleById(vehicleId);
  } catch (error) {
    console.error('Error searching for vehicle:', error);
    return null;
  }
}

/**
 * Get all variants of a vehicle model with their fuel economy data
 */
export async function getVehicleVariants(
  year: number,
  make: string,
  model: string
): Promise<FuelEconomyData[]> {
  try {
    const models = await getModels(year, make);
    const modelLower = model.toLowerCase();
    
    // Find all models that match
    const matchingModels = models.filter(m => 
      m.text.toLowerCase().includes(modelLower) ||
      modelLower.includes(m.text.toLowerCase().split(' ')[0])
    );
    
    const allVariants: FuelEconomyData[] = [];
    
    for (const matchingModel of matchingModels) {
      const options = await getVehicleOptions(year, make, matchingModel.value);
      
      for (const option of options) {
        const vehicleId = parseInt(option.value, 10);
        const vehicleData = await getVehicleById(vehicleId);
        if (vehicleData) {
          allVariants.push(vehicleData);
        }
      }
    }
    
    return allVariants;
  } catch (error) {
    console.error('Error fetching vehicle variants:', error);
    return [];
  }
}

/**
 * Get fuel economy rating description
 */
export function getFuelEconomyRating(feScore: number): {
  label: string;
  color: 'excellent' | 'good' | 'average' | 'below-average' | 'poor';
} {
  if (feScore >= 9) return { label: 'Excellent', color: 'excellent' };
  if (feScore >= 7) return { label: 'Good', color: 'good' };
  if (feScore >= 5) return { label: 'Average', color: 'average' };
  if (feScore >= 3) return { label: 'Below Average', color: 'below-average' };
  return { label: 'Poor', color: 'poor' };
}

/**
 * Get greenhouse gas rating description
 */
export function getGHGRating(ghgScore: number): {
  label: string;
  color: 'excellent' | 'good' | 'average' | 'below-average' | 'poor';
} {
  if (ghgScore >= 9) return { label: 'Very Low Emissions', color: 'excellent' };
  if (ghgScore >= 7) return { label: 'Low Emissions', color: 'good' };
  if (ghgScore >= 5) return { label: 'Average Emissions', color: 'average' };
  if (ghgScore >= 3) return { label: 'High Emissions', color: 'below-average' };
  return { label: 'Very High Emissions', color: 'poor' };
}

/**
 * Format annual fuel cost with savings/spending indicator
 */
export function formatFuelCost(fuelCost: number, youSaveSpend: number): {
  cost: string;
  comparison: string;
  isSaving: boolean;
} {
  const formattedCost = `$${fuelCost.toLocaleString()}`;
  const isSaving = youSaveSpend > 0;
  const comparison = isSaving 
    ? `Save $${youSaveSpend.toLocaleString()}/yr vs average`
    : youSaveSpend < 0 
      ? `Spend $${Math.abs(youSaveSpend).toLocaleString()}/yr more than average`
      : 'Average fuel cost';
  
  return { cost: formattedCost, comparison, isSaving };
}

/**
 * Vehicle class mappings for EPA categories
 */
export const vehicleClassMap: Record<string, string[]> = {
  'sedan': ['Compact Cars', 'Midsize Cars', 'Large Cars', 'Subcompact Cars', 'Two Seaters'],
  'suv': ['Small Sport Utility Vehicle 2WD', 'Small Sport Utility Vehicle 4WD', 'Standard Sport Utility Vehicle 2WD', 'Standard Sport Utility Vehicle 4WD', 'Sport Utility Vehicle - 2WD', 'Sport Utility Vehicle - 4WD'],
  'truck': ['Standard Pickup Trucks 2WD', 'Standard Pickup Trucks 4WD', 'Small Pickup Trucks 2WD', 'Small Pickup Trucks 4WD'],
  'hatchback': ['Compact Cars', 'Subcompact Cars', 'Small Station Wagons'],
  'coupe': ['Compact Cars', 'Midsize Cars', 'Two Seaters', 'Minicompact Cars'],
  'convertible': ['Two Seaters', 'Minicompact Cars', 'Subcompact Cars'],
  'wagon': ['Small Station Wagons', 'Midsize Station Wagons'],
  'van': ['Vans, Cargo Type', 'Vans, Passenger Type'],
  'minivan': ['Minivan - 2WD', 'Minivan - 4WD'],
};

export interface TopMPGVehicle {
  rank: number;
  id: number;
  year: number;
  make: string;
  model: string;
  comb08: number;
  city08: number;
  highway08: number;
  fuelType1: string;
  VClass: string;
  isCurrentVehicle?: boolean;
  fuelCategory?: 'gas' | 'hybrid' | 'electric' | 'phev';
  // EV-specific metrics
  range?: number;           // Total range in miles
  milesPerKwh?: number;     // Efficiency: miles per kWh
  // PHEV-specific metrics
  electricRange?: number;   // Electric-only range in miles
  gasMpg?: number;          // MPG when running on gas
}

export type FuelCategory = 'gas' | 'hybrid' | 'electric' | 'phev';

export interface TopMPGByFuelType {
  gas: TopMPGVehicle[];
  hybrid: TopMPGVehicle[];
  electric: TopMPGVehicle[];
  phev: TopMPGVehicle[];
}

/**
 * Determine fuel category from fuel type string
 */
export function getFuelCategory(fuelType: string): FuelCategory {
  const lower = fuelType.toLowerCase();
  if (lower.includes('electricity') || lower === 'electric') {
    return 'electric';
  }
  if (lower.includes('plug-in') || lower.includes('phev')) {
    return 'phev';
  }
  // Check model name patterns for hybrids (since fuelType might still say "Gasoline")
  return 'gas';
}

/**
 * Check if a vehicle model name indicates it's a hybrid
 */
export function isHybridModel(model: string): boolean {
  const lower = model.toLowerCase();
  return lower.includes('hybrid') || lower.includes('prime');
}

/**
 * Get top MPG vehicles for a given year and vehicle class
 */
export async function getTopMPGByClass(
  year: number,
  bodyStyle: string,
  currentMake?: string,
  currentModel?: string
): Promise<{ vehicles: TopMPGVehicle[]; currentRank: number | null }> {
  try {
    // Map body style to EPA vehicle classes
    const vClasses = vehicleClassMap[bodyStyle.toLowerCase()] || vehicleClassMap['sedan'];
    
    // Fetch top vehicles from EPA API for the year
    // The API supports getting vehicles by year with sorting
    const url = `${EPA_BASE_URL}/vehicle/menu/year`;
    const yearsResponse = await fetch(url);
    
    if (!yearsResponse.ok) {
      throw new Error('Failed to fetch years');
    }
    
    // For performance, we'll use a curated list of popular makes to query
    const popularMakes = [
      'Toyota', 'Honda', 'Ford', 'Chevrolet', 'Nissan', 'Hyundai', 'Kia',
      'Mazda', 'Subaru', 'Volkswagen', 'BMW', 'Mercedes-Benz', 'Audi',
      'Lexus', 'Acura', 'Tesla', 'Jeep', 'Ram', 'GMC', 'Dodge'
    ];
    
    const allVehicles: TopMPGVehicle[] = [];
    
    // Fetch vehicles from popular makes
    for (const make of popularMakes) {
      try {
        const models = await getModels(year, make);
        
        // Get first few models per make to avoid too many API calls
        const modelsToFetch = models.slice(0, 5);
        
        for (const model of modelsToFetch) {
          const options = await getVehicleOptions(year, make, model.value);
          
          if (options.length > 0) {
            const vehicleId = parseInt(options[0].value, 10);
            const vehicleData = await getVehicleById(vehicleId);
            
            if (vehicleData && vClasses.some(vc => 
              vehicleData.VClass.toLowerCase().includes(vc.toLowerCase()) ||
              vc.toLowerCase().includes(vehicleData.VClass.toLowerCase())
            )) {
              allVehicles.push({
                rank: 0,
                id: vehicleData.id,
                year: vehicleData.year,
                make: vehicleData.make,
                model: vehicleData.baseModel || vehicleData.model.split(' ')[0],
                comb08: vehicleData.comb08,
                city08: vehicleData.city08,
                highway08: vehicleData.highway08,
                fuelType1: vehicleData.fuelType1,
                VClass: vehicleData.VClass,
                isCurrentVehicle: 
                  vehicleData.make.toLowerCase() === currentMake?.toLowerCase() &&
                  (vehicleData.model.toLowerCase().includes(currentModel?.toLowerCase() || '') ||
                   vehicleData.baseModel?.toLowerCase().includes(currentModel?.toLowerCase() || ''))
              });
            }
          }
        }
      } catch (e) {
        // Continue with other makes if one fails
        console.log(`Skipping ${make} due to error`);
      }
    }
    
    // Sort by combined MPG (descending) and remove duplicates
    const uniqueVehicles = allVehicles.reduce((acc, vehicle) => {
      const key = `${vehicle.make}-${vehicle.model}`;
      if (!acc.has(key) || acc.get(key)!.comb08 < vehicle.comb08) {
        acc.set(key, vehicle);
      }
      return acc;
    }, new Map<string, TopMPGVehicle>());
    
    const sortedVehicles = Array.from(uniqueVehicles.values())
      .sort((a, b) => b.comb08 - a.comb08)
      .slice(0, 20) // Top 20
      .map((v, index) => ({ ...v, rank: index + 1 }));
    
    // Find current vehicle rank
    const currentRank = sortedVehicles.find(v => v.isCurrentVehicle)?.rank || null;
    
    return { vehicles: sortedVehicles, currentRank };
  } catch (error) {
    console.error('Error fetching top MPG vehicles:', error);
    return { vehicles: [], currentRank: null };
  }
}

/**
 * Get a simplified/cached list of top MPG vehicles by category
 * This uses pre-defined data to avoid excessive API calls
 * Now separated by fuel type (gas, hybrid, electric, phev)
 */
export function getTopMPGVehiclesStatic(
  year: number,
  bodyStyle: string,
  currentMake: string,
  currentModel: string,
  currentMPG: number
): { vehiclesByFuelType: TopMPGByFuelType; vehicles: TopMPGVehicle[]; currentRank: number | null; availableCategories: FuelCategory[] } {
  // Static data for common categories (2024-2025 model years)
  // Separated by fuel type within each body style
  const topByCategory: Record<string, TopMPGByFuelType> = {
    sedan: {
      gas: [
        { rank: 1, id: 9, year: 2025, make: 'Nissan', model: 'Sentra', comb08: 33, city08: 29, highway08: 39, fuelType1: 'Regular Gasoline', VClass: 'Compact Cars', fuelCategory: 'gas' },
        { rank: 2, id: 10, year: 2025, make: 'Mazda', model: '3', comb08: 32, city08: 28, highway08: 37, fuelType1: 'Regular Gasoline', VClass: 'Compact Cars', fuelCategory: 'gas' },
        { rank: 3, id: 11, year: 2025, make: 'Honda', model: 'Accord', comb08: 32, city08: 29, highway08: 37, fuelType1: 'Regular Gasoline', VClass: 'Midsize Cars', fuelCategory: 'gas' },
        { rank: 4, id: 12, year: 2025, make: 'Volkswagen', model: 'Jetta', comb08: 32, city08: 29, highway08: 36, fuelType1: 'Regular Gasoline', VClass: 'Compact Cars', fuelCategory: 'gas' },
        { rank: 5, id: 13, year: 2025, make: 'Kia', model: 'Forte', comb08: 31, city08: 28, highway08: 36, fuelType1: 'Regular Gasoline', VClass: 'Compact Cars', fuelCategory: 'gas' },
        { rank: 6, id: 14, year: 2025, make: 'Hyundai', model: 'Elantra', comb08: 31, city08: 28, highway08: 36, fuelType1: 'Regular Gasoline', VClass: 'Compact Cars', fuelCategory: 'gas' },
        { rank: 7, id: 15, year: 2025, make: 'Toyota', model: 'Corolla', comb08: 31, city08: 28, highway08: 36, fuelType1: 'Regular Gasoline', VClass: 'Compact Cars', fuelCategory: 'gas' },
        { rank: 8, id: 16, year: 2025, make: 'Honda', model: 'Civic', comb08: 33, city08: 30, highway08: 38, fuelType1: 'Regular Gasoline', VClass: 'Compact Cars', fuelCategory: 'gas' },
        { rank: 9, id: 17, year: 2025, make: 'Toyota', model: 'Camry', comb08: 28, city08: 25, highway08: 34, fuelType1: 'Regular Gasoline', VClass: 'Midsize Cars', fuelCategory: 'gas' },
        { rank: 10, id: 18, year: 2025, make: 'Subaru', model: 'Legacy', comb08: 27, city08: 24, highway08: 32, fuelType1: 'Regular Gasoline', VClass: 'Midsize Cars', fuelCategory: 'gas' },
      ],
      hybrid: [
        { rank: 1, id: 1, year: 2025, make: 'Toyota', model: 'Prius', comb08: 57, city08: 58, highway08: 56, fuelType1: 'Hybrid', VClass: 'Midsize Cars', fuelCategory: 'hybrid' },
        { rank: 2, id: 2, year: 2025, make: 'Hyundai', model: 'Elantra Hybrid', comb08: 54, city08: 54, highway08: 54, fuelType1: 'Hybrid', VClass: 'Compact Cars', fuelCategory: 'hybrid' },
        { rank: 3, id: 3, year: 2025, make: 'Toyota', model: 'Corolla Hybrid', comb08: 52, city08: 53, highway08: 52, fuelType1: 'Hybrid', VClass: 'Compact Cars', fuelCategory: 'hybrid' },
        { rank: 4, id: 4, year: 2025, make: 'Honda', model: 'Civic Hybrid', comb08: 49, city08: 49, highway08: 47, fuelType1: 'Hybrid', VClass: 'Compact Cars', fuelCategory: 'hybrid' },
        { rank: 5, id: 5, year: 2025, make: 'Honda', model: 'Accord Hybrid', comb08: 48, city08: 51, highway08: 44, fuelType1: 'Hybrid', VClass: 'Midsize Cars', fuelCategory: 'hybrid' },
        { rank: 6, id: 6, year: 2025, make: 'Toyota', model: 'Camry Hybrid', comb08: 46, city08: 51, highway08: 43, fuelType1: 'Hybrid', VClass: 'Midsize Cars', fuelCategory: 'hybrid' },
        { rank: 7, id: 7, year: 2025, make: 'Hyundai', model: 'Sonata Hybrid', comb08: 45, city08: 45, highway08: 51, fuelType1: 'Hybrid', VClass: 'Midsize Cars', fuelCategory: 'hybrid' },
        { rank: 8, id: 8, year: 2025, make: 'Kia', model: 'K5 Hybrid', comb08: 44, city08: 48, highway08: 42, fuelType1: 'Hybrid', VClass: 'Midsize Cars', fuelCategory: 'hybrid' },
      ],
      electric: [
        { rank: 1, id: 20, year: 2025, make: 'Tesla', model: 'Model 3', comb08: 132, city08: 138, highway08: 126, fuelType1: 'Electricity', VClass: 'Compact Cars', fuelCategory: 'electric', range: 333, milesPerKwh: 4.2 },
        { rank: 2, id: 21, year: 2025, make: 'Tesla', model: 'Model S', comb08: 120, city08: 124, highway08: 115, fuelType1: 'Electricity', VClass: 'Large Cars', fuelCategory: 'electric', range: 405, milesPerKwh: 3.6 },
        { rank: 3, id: 22, year: 2025, make: 'BMW', model: 'i4', comb08: 109, city08: 120, highway08: 98, fuelType1: 'Electricity', VClass: 'Compact Cars', fuelCategory: 'electric', range: 301, milesPerKwh: 3.5 },
        { rank: 4, id: 23, year: 2025, make: 'Mercedes-Benz', model: 'EQE', comb08: 107, city08: 116, highway08: 97, fuelType1: 'Electricity', VClass: 'Midsize Cars', fuelCategory: 'electric', range: 305, milesPerKwh: 3.2 },
        { rank: 5, id: 24, year: 2025, make: 'Polestar', model: '2', comb08: 100, city08: 107, highway08: 93, fuelType1: 'Electricity', VClass: 'Compact Cars', fuelCategory: 'electric', range: 270, milesPerKwh: 3.4 },
      ],
      phev: [
        { rank: 1, id: 30, year: 2025, make: 'Toyota', model: 'Prius Prime', comb08: 52, city08: 55, highway08: 49, fuelType1: 'Plug-in Hybrid', VClass: 'Midsize Cars', fuelCategory: 'phev', electricRange: 44, gasMpg: 52 },
        { rank: 2, id: 31, year: 2025, make: 'Hyundai', model: 'Sonata PHEV', comb08: 46, city08: 50, highway08: 44, fuelType1: 'Plug-in Hybrid', VClass: 'Midsize Cars', fuelCategory: 'phev', electricRange: 28, gasMpg: 46 },
        { rank: 3, id: 32, year: 2025, make: 'Honda', model: 'Accord PHEV', comb08: 44, city08: 48, highway08: 41, fuelType1: 'Plug-in Hybrid', VClass: 'Midsize Cars', fuelCategory: 'phev', electricRange: 26, gasMpg: 44 },
      ],
    },
    suv: {
      gas: [
        { rank: 1, id: 109, year: 2025, make: 'Mazda', model: 'CX-30', comb08: 28, city08: 25, highway08: 33, fuelType1: 'Regular Gasoline', VClass: 'Small SUV', fuelCategory: 'gas' },
        { rank: 2, id: 110, year: 2025, make: 'Subaru', model: 'Crosstrek', comb08: 28, city08: 26, highway08: 33, fuelType1: 'Regular Gasoline', VClass: 'Small SUV', fuelCategory: 'gas' },
        { rank: 3, id: 111, year: 2025, make: 'Honda', model: 'HR-V', comb08: 28, city08: 26, highway08: 32, fuelType1: 'Regular Gasoline', VClass: 'Small SUV', fuelCategory: 'gas' },
        { rank: 4, id: 112, year: 2025, make: 'Nissan', model: 'Rogue', comb08: 28, city08: 26, highway08: 33, fuelType1: 'Regular Gasoline', VClass: 'Small SUV', fuelCategory: 'gas' },
        { rank: 5, id: 113, year: 2025, make: 'Honda', model: 'CR-V', comb08: 28, city08: 26, highway08: 32, fuelType1: 'Regular Gasoline', VClass: 'Small SUV', fuelCategory: 'gas' },
        { rank: 6, id: 114, year: 2025, make: 'Toyota', model: 'RAV4', comb08: 28, city08: 27, highway08: 35, fuelType1: 'Regular Gasoline', VClass: 'Small SUV', fuelCategory: 'gas' },
        { rank: 7, id: 115, year: 2025, make: 'Hyundai', model: 'Tucson', comb08: 27, city08: 26, highway08: 33, fuelType1: 'Regular Gasoline', VClass: 'Small SUV', fuelCategory: 'gas' },
        { rank: 8, id: 116, year: 2025, make: 'Kia', model: 'Sportage', comb08: 27, city08: 25, highway08: 32, fuelType1: 'Regular Gasoline', VClass: 'Small SUV', fuelCategory: 'gas' },
        { rank: 9, id: 117, year: 2025, make: 'Mazda', model: 'CX-5', comb08: 26, city08: 24, highway08: 30, fuelType1: 'Regular Gasoline', VClass: 'Small SUV', fuelCategory: 'gas' },
        { rank: 10, id: 118, year: 2025, make: 'Ford', model: 'Escape', comb08: 26, city08: 23, highway08: 31, fuelType1: 'Regular Gasoline', VClass: 'Small SUV', fuelCategory: 'gas' },
      ],
      hybrid: [
        { rank: 1, id: 102, year: 2025, make: 'Toyota', model: 'RAV4 Hybrid', comb08: 41, city08: 41, highway08: 38, fuelType1: 'Hybrid', VClass: 'Small SUV', fuelCategory: 'hybrid' },
        { rank: 2, id: 103, year: 2025, make: 'Ford', model: 'Escape Hybrid', comb08: 41, city08: 44, highway08: 37, fuelType1: 'Hybrid', VClass: 'Small SUV', fuelCategory: 'hybrid' },
        { rank: 3, id: 104, year: 2025, make: 'Honda', model: 'CR-V Hybrid', comb08: 40, city08: 40, highway08: 34, fuelType1: 'Hybrid', VClass: 'Small SUV', fuelCategory: 'hybrid' },
        { rank: 4, id: 105, year: 2025, make: 'Hyundai', model: 'Tucson Hybrid', comb08: 38, city08: 38, highway08: 38, fuelType1: 'Hybrid', VClass: 'Small SUV', fuelCategory: 'hybrid' },
        { rank: 5, id: 106, year: 2025, make: 'Kia', model: 'Sportage Hybrid', comb08: 38, city08: 42, highway08: 39, fuelType1: 'Hybrid', VClass: 'Small SUV', fuelCategory: 'hybrid' },
        { rank: 6, id: 107, year: 2025, make: 'Toyota', model: 'Venza', comb08: 37, city08: 40, highway08: 37, fuelType1: 'Hybrid', VClass: 'Small SUV', fuelCategory: 'hybrid' },
        { rank: 7, id: 108, year: 2025, make: 'Lexus', model: 'NX 350h', comb08: 36, city08: 41, highway08: 37, fuelType1: 'Hybrid', VClass: 'Small SUV', fuelCategory: 'hybrid' },
      ],
      electric: [
        { rank: 1, id: 122, year: 2025, make: 'Tesla', model: 'Model Y', comb08: 123, city08: 129, highway08: 117, fuelType1: 'Electricity', VClass: 'Small SUV', fuelCategory: 'electric', range: 310, milesPerKwh: 3.9 },
        { rank: 2, id: 120, year: 2025, make: 'Hyundai', model: 'Ioniq 5', comb08: 114, city08: 132, highway08: 98, fuelType1: 'Electricity', VClass: 'Small SUV', fuelCategory: 'electric', range: 303, milesPerKwh: 3.5 },
        { rank: 3, id: 121, year: 2025, make: 'Kia', model: 'EV6', comb08: 113, city08: 126, highway08: 101, fuelType1: 'Electricity', VClass: 'Small SUV', fuelCategory: 'electric', range: 310, milesPerKwh: 3.5 },
        { rank: 4, id: 123, year: 2025, make: 'Chevrolet', model: 'Equinox EV', comb08: 112, city08: 125, highway08: 100, fuelType1: 'Electricity', VClass: 'Small SUV', fuelCategory: 'electric', range: 319, milesPerKwh: 3.4 },
        { rank: 5, id: 124, year: 2025, make: 'Ford', model: 'Mustang Mach-E', comb08: 100, city08: 105, highway08: 93, fuelType1: 'Electricity', VClass: 'Small SUV', fuelCategory: 'electric', range: 312, milesPerKwh: 3.1 },
        { rank: 6, id: 125, year: 2025, make: 'Volkswagen', model: 'ID.4', comb08: 97, city08: 104, highway08: 89, fuelType1: 'Electricity', VClass: 'Small SUV', fuelCategory: 'electric', range: 275, milesPerKwh: 3.0 },
      ],
      phev: [
        { rank: 1, id: 101, year: 2025, make: 'Toyota', model: 'RAV4 Prime', comb08: 94, city08: 94, highway08: 84, fuelType1: 'Plug-in Hybrid', VClass: 'Small SUV', fuelCategory: 'phev', electricRange: 42, gasMpg: 38 },
        { rank: 2, id: 130, year: 2025, make: 'Hyundai', model: 'Tucson PHEV', comb08: 80, city08: 80, highway08: 80, fuelType1: 'Plug-in Hybrid', VClass: 'Small SUV', fuelCategory: 'phev', electricRange: 33, gasMpg: 35 },
        { rank: 3, id: 131, year: 2025, make: 'Kia', model: 'Sportage PHEV', comb08: 79, city08: 79, highway08: 79, fuelType1: 'Plug-in Hybrid', VClass: 'Small SUV', fuelCategory: 'phev', electricRange: 34, gasMpg: 35 },
        { rank: 4, id: 132, year: 2025, make: 'Ford', model: 'Escape PHEV', comb08: 78, city08: 78, highway08: 78, fuelType1: 'Plug-in Hybrid', VClass: 'Small SUV', fuelCategory: 'phev', electricRange: 37, gasMpg: 40 },
        { rank: 5, id: 133, year: 2025, make: 'Jeep', model: 'Wrangler 4xe', comb08: 49, city08: 49, highway08: 49, fuelType1: 'Plug-in Hybrid', VClass: 'Small SUV', fuelCategory: 'phev', electricRange: 21, gasMpg: 20 },
      ],
    },
    truck: {
      gas: [
        { rank: 1, id: 204, year: 2025, make: 'Ford', model: 'Maverick', comb08: 26, city08: 23, highway08: 30, fuelType1: 'Regular Gasoline', VClass: 'Small Pickup', fuelCategory: 'gas' },
        { rank: 2, id: 203, year: 2025, make: 'Toyota', model: 'Tacoma', comb08: 23, city08: 21, highway08: 26, fuelType1: 'Regular Gasoline', VClass: 'Small Pickup', fuelCategory: 'gas' },
        { rank: 3, id: 205, year: 2025, make: 'Chevrolet', model: 'Colorado', comb08: 22, city08: 19, highway08: 25, fuelType1: 'Regular Gasoline', VClass: 'Small Pickup', fuelCategory: 'gas' },
        { rank: 4, id: 206, year: 2025, make: 'GMC', model: 'Canyon', comb08: 22, city08: 19, highway08: 25, fuelType1: 'Regular Gasoline', VClass: 'Small Pickup', fuelCategory: 'gas' },
        { rank: 5, id: 207, year: 2025, make: 'Nissan', model: 'Frontier', comb08: 21, city08: 18, highway08: 24, fuelType1: 'Regular Gasoline', VClass: 'Small Pickup', fuelCategory: 'gas' },
        { rank: 6, id: 208, year: 2025, make: 'Honda', model: 'Ridgeline', comb08: 21, city08: 18, highway08: 24, fuelType1: 'Regular Gasoline', VClass: 'Small Pickup', fuelCategory: 'gas' },
        { rank: 7, id: 209, year: 2025, make: 'Ford', model: 'F-150', comb08: 21, city08: 19, highway08: 24, fuelType1: 'Regular Gasoline', VClass: 'Standard Pickup', fuelCategory: 'gas' },
        { rank: 8, id: 210, year: 2025, make: 'Ram', model: '1500', comb08: 21, city08: 19, highway08: 24, fuelType1: 'Regular Gasoline', VClass: 'Standard Pickup', fuelCategory: 'gas' },
      ],
      hybrid: [
        { rank: 1, id: 201, year: 2025, make: 'Ford', model: 'Maverick Hybrid', comb08: 37, city08: 42, highway08: 33, fuelType1: 'Hybrid', VClass: 'Small Pickup', fuelCategory: 'hybrid' },
        { rank: 2, id: 202, year: 2025, make: 'Ford', model: 'F-150 Hybrid', comb08: 25, city08: 25, highway08: 26, fuelType1: 'Hybrid', VClass: 'Standard Pickup', fuelCategory: 'hybrid' },
        { rank: 3, id: 211, year: 2025, make: 'Toyota', model: 'Tundra Hybrid', comb08: 22, city08: 20, highway08: 24, fuelType1: 'Hybrid', VClass: 'Standard Pickup', fuelCategory: 'hybrid' },
      ],
      electric: [
        { rank: 1, id: 220, year: 2025, make: 'Rivian', model: 'R1T', comb08: 70, city08: 74, highway08: 66, fuelType1: 'Electricity', VClass: 'Standard Pickup', fuelCategory: 'electric', range: 352, milesPerKwh: 2.1 },
        { rank: 2, id: 221, year: 2025, make: 'Ford', model: 'F-150 Lightning', comb08: 66, city08: 76, highway08: 61, fuelType1: 'Electricity', VClass: 'Standard Pickup', fuelCategory: 'electric', range: 320, milesPerKwh: 2.0 },
        { rank: 3, id: 222, year: 2025, make: 'Chevrolet', model: 'Silverado EV', comb08: 63, city08: 67, highway08: 60, fuelType1: 'Electricity', VClass: 'Standard Pickup', fuelCategory: 'electric', range: 450, milesPerKwh: 1.9 },
        { rank: 4, id: 223, year: 2025, make: 'GMC', model: 'Hummer EV', comb08: 47, city08: 51, highway08: 43, fuelType1: 'Electricity', VClass: 'Standard Pickup', fuelCategory: 'electric', range: 329, milesPerKwh: 1.5 },
      ],
      phev: [],
    },
    hatchback: {
      gas: [
        { rank: 1, id: 302, year: 2025, make: 'Toyota', model: 'Corolla Hatchback', comb08: 35, city08: 32, highway08: 41, fuelType1: 'Regular Gasoline', VClass: 'Compact Cars', fuelCategory: 'gas' },
        { rank: 2, id: 304, year: 2025, make: 'Honda', model: 'Civic Hatchback', comb08: 33, city08: 30, highway08: 37, fuelType1: 'Regular Gasoline', VClass: 'Compact Cars', fuelCategory: 'gas' },
        { rank: 3, id: 307, year: 2025, make: 'Kia', model: 'Rio 5-Door', comb08: 33, city08: 32, highway08: 40, fuelType1: 'Regular Gasoline', VClass: 'Subcompact Cars', fuelCategory: 'gas' },
        { rank: 4, id: 303, year: 2025, make: 'Mazda', model: '3 Hatchback', comb08: 31, city08: 28, highway08: 36, fuelType1: 'Regular Gasoline', VClass: 'Compact Cars', fuelCategory: 'gas' },
        { rank: 5, id: 305, year: 2025, make: 'Volkswagen', model: 'Golf', comb08: 31, city08: 28, highway08: 36, fuelType1: 'Regular Gasoline', VClass: 'Compact Cars', fuelCategory: 'gas' },
        { rank: 6, id: 306, year: 2025, make: 'Hyundai', model: 'Elantra GT', comb08: 30, city08: 27, highway08: 35, fuelType1: 'Regular Gasoline', VClass: 'Compact Cars', fuelCategory: 'gas' },
        { rank: 7, id: 308, year: 2025, make: 'Subaru', model: 'Impreza', comb08: 28, city08: 26, highway08: 33, fuelType1: 'Regular Gasoline', VClass: 'Compact Cars', fuelCategory: 'gas' },
      ],
      hybrid: [
        { rank: 1, id: 301, year: 2025, make: 'Toyota', model: 'Prius', comb08: 57, city08: 58, highway08: 56, fuelType1: 'Hybrid', VClass: 'Midsize Cars', fuelCategory: 'hybrid' },
      ],
      electric: [
        { rank: 1, id: 310, year: 2025, make: 'Chevrolet', model: 'Bolt EV', comb08: 120, city08: 131, highway08: 109, fuelType1: 'Electricity', VClass: 'Compact Cars', fuelCategory: 'electric', range: 259, milesPerKwh: 4.0 },
        { rank: 2, id: 311, year: 2025, make: 'MINI', model: 'Cooper SE', comb08: 110, city08: 119, highway08: 100, fuelType1: 'Electricity', VClass: 'Subcompact Cars', fuelCategory: 'electric', range: 114, milesPerKwh: 3.8 },
        { rank: 3, id: 312, year: 2025, make: 'Volkswagen', model: 'ID.3', comb08: 108, city08: 115, highway08: 100, fuelType1: 'Electricity', VClass: 'Compact Cars', fuelCategory: 'electric', range: 260, milesPerKwh: 3.5 },
      ],
      phev: [
        { rank: 1, id: 315, year: 2025, make: 'Toyota', model: 'Prius Prime', comb08: 52, city08: 55, highway08: 49, fuelType1: 'Plug-in Hybrid', VClass: 'Midsize Cars', fuelCategory: 'phev', electricRange: 44, gasMpg: 52 },
      ],
    },
    coupe: {
      gas: [
        { rank: 1, id: 403, year: 2025, make: 'Mazda', model: 'MX-5 Miata', comb08: 30, city08: 26, highway08: 34, fuelType1: 'Premium Gasoline', VClass: 'Two Seaters', fuelCategory: 'gas' },
        { rank: 2, id: 404, year: 2025, make: 'Honda', model: 'Civic Si', comb08: 30, city08: 27, highway08: 36, fuelType1: 'Premium Gasoline', VClass: 'Compact Cars', fuelCategory: 'gas' },
        { rank: 3, id: 401, year: 2025, make: 'Toyota', model: 'GR86', comb08: 26, city08: 22, highway08: 32, fuelType1: 'Premium Gasoline', VClass: 'Two Seaters', fuelCategory: 'gas' },
        { rank: 4, id: 402, year: 2025, make: 'Subaru', model: 'BRZ', comb08: 26, city08: 22, highway08: 32, fuelType1: 'Premium Gasoline', VClass: 'Two Seaters', fuelCategory: 'gas' },
        { rank: 5, id: 405, year: 2025, make: 'Ford', model: 'Mustang', comb08: 22, city08: 18, highway08: 27, fuelType1: 'Regular Gasoline', VClass: 'Two Seaters', fuelCategory: 'gas' },
        { rank: 6, id: 406, year: 2025, make: 'Chevrolet', model: 'Camaro', comb08: 22, city08: 19, highway08: 29, fuelType1: 'Regular Gasoline', VClass: 'Two Seaters', fuelCategory: 'gas' },
        { rank: 7, id: 407, year: 2025, make: 'Dodge', model: 'Challenger', comb08: 19, city08: 15, highway08: 24, fuelType1: 'Premium Gasoline', VClass: 'Two Seaters', fuelCategory: 'gas' },
      ],
      hybrid: [],
      electric: [],
      phev: [],
    },
    minivan: {
      gas: [
        { rank: 1, id: 503, year: 2025, make: 'Honda', model: 'Odyssey', comb08: 22, city08: 19, highway08: 28, fuelType1: 'Regular Gasoline', VClass: 'Minivan', fuelCategory: 'gas' },
        { rank: 2, id: 504, year: 2025, make: 'Kia', model: 'Carnival', comb08: 22, city08: 19, highway08: 26, fuelType1: 'Regular Gasoline', VClass: 'Minivan', fuelCategory: 'gas' },
        { rank: 3, id: 505, year: 2025, make: 'Chrysler', model: 'Pacifica', comb08: 22, city08: 19, highway08: 28, fuelType1: 'Regular Gasoline', VClass: 'Minivan', fuelCategory: 'gas' },
      ],
      hybrid: [
        { rank: 1, id: 501, year: 2025, make: 'Toyota', model: 'Sienna', comb08: 36, city08: 36, highway08: 36, fuelType1: 'Hybrid', VClass: 'Minivan', fuelCategory: 'hybrid' },
      ],
      electric: [],
      phev: [
        { rank: 1, id: 502, year: 2025, make: 'Chrysler', model: 'Pacifica Hybrid', comb08: 82, city08: 82, highway08: 82, fuelType1: 'Plug-in Hybrid', VClass: 'Minivan', fuelCategory: 'phev', electricRange: 32, gasMpg: 30 },
      ],
    },
  };
  
  // Get vehicles for the category
  const categoryKey = bodyStyle.toLowerCase();
  const categoryData = topByCategory[categoryKey] || topByCategory['sedan'];
  
  // Check if current vehicle is in any list
  const currentModelLower = currentModel.toLowerCase();
  const currentMakeLower = currentMake.toLowerCase();
  
  let currentRank: number | null = null;
  
  // Process each fuel type category
  const processCategory = (vehicles: TopMPGVehicle[]): TopMPGVehicle[] => {
    return vehicles.map(v => {
      const isMatch = v.make.toLowerCase() === currentMakeLower && 
        (v.model.toLowerCase().includes(currentModelLower) || 
         currentModelLower.includes(v.model.toLowerCase()));
      
      if (isMatch) {
        currentRank = v.rank;
        return { ...v, isCurrentVehicle: true };
      }
      return v;
    });
  };
  
  const vehiclesByFuelType: TopMPGByFuelType = {
    gas: processCategory(categoryData.gas || []),
    hybrid: processCategory(categoryData.hybrid || []),
    electric: processCategory(categoryData.electric || []),
    phev: processCategory(categoryData.phev || []),
  };
  
  // Determine which categories have vehicles
  const availableCategories: FuelCategory[] = [];
  if (vehiclesByFuelType.gas.length > 0) availableCategories.push('gas');
  if (vehiclesByFuelType.hybrid.length > 0) availableCategories.push('hybrid');
  if (vehiclesByFuelType.electric.length > 0) availableCategories.push('electric');
  if (vehiclesByFuelType.phev.length > 0) availableCategories.push('phev');
  
  // Default to gas vehicles for backward compatibility
  let vehicles = vehiclesByFuelType.gas;
  
  // If current vehicle not in gas list, check if it's in another category
  if (!currentRank && currentMPG > 0) {
    // Determine likely fuel category based on MPG
    // Very high MPG (>50) likely hybrid, >100 likely electric
    let targetCategory: FuelCategory = 'gas';
    if (currentMPG > 100) {
      targetCategory = 'electric';
    } else if (currentMPG > 50) {
      targetCategory = 'hybrid';
    }
    
    vehicles = vehiclesByFuelType[targetCategory];
    
    // Find where current MPG would rank in the appropriate category
    const sortedByMPG = [...vehicles].sort((a, b) => b.comb08 - a.comb08);
    let insertIndex = sortedByMPG.findIndex(v => currentMPG >= v.comb08);
    
    if (insertIndex === -1) {
      insertIndex = sortedByMPG.length;
    }
    
    currentRank = insertIndex + 1;
    
    // Insert current vehicle into the list
    const currentVehicle: TopMPGVehicle = {
      rank: currentRank,
      id: 0,
      year,
      make: currentMake,
      model: currentModel,
      comb08: currentMPG,
      city08: 0,
      highway08: 0,
      fuelType1: targetCategory === 'electric' ? 'Electricity' : targetCategory === 'hybrid' ? 'Hybrid' : 'Regular Gasoline',
      VClass: categoryKey,
      isCurrentVehicle: true,
      fuelCategory: targetCategory
    };
    
    // Re-rank all vehicles in that category
    const updatedVehicles = [...sortedByMPG.slice(0, insertIndex), currentVehicle, ...sortedByMPG.slice(insertIndex)]
      .map((v, i) => ({ ...v, rank: i + 1 }));
    
    vehiclesByFuelType[targetCategory] = updatedVehicles;
    vehicles = updatedVehicles;
  }
  
  return { vehiclesByFuelType, vehicles, currentRank, availableCategories };
}

