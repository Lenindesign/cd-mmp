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
 */
export function getTopMPGVehiclesStatic(
  year: number,
  bodyStyle: string,
  currentMake: string,
  currentModel: string,
  currentMPG: number
): { vehicles: TopMPGVehicle[]; currentRank: number | null } {
  // Static data for common categories (2024-2025 model years)
  const topByCategory: Record<string, TopMPGVehicle[]> = {
    sedan: [
      { rank: 1, id: 1, year: 2025, make: 'Toyota', model: 'Prius', comb08: 57, city08: 58, highway08: 56, fuelType1: 'Regular Gasoline', VClass: 'Midsize Cars' },
      { rank: 2, id: 2, year: 2025, make: 'Hyundai', model: 'Elantra Hybrid', comb08: 54, city08: 54, highway08: 54, fuelType1: 'Regular Gasoline', VClass: 'Compact Cars' },
      { rank: 3, id: 3, year: 2025, make: 'Toyota', model: 'Corolla Hybrid', comb08: 52, city08: 53, highway08: 52, fuelType1: 'Regular Gasoline', VClass: 'Compact Cars' },
      { rank: 4, id: 4, year: 2025, make: 'Honda', model: 'Civic Hybrid', comb08: 49, city08: 49, highway08: 47, fuelType1: 'Regular Gasoline', VClass: 'Compact Cars' },
      { rank: 5, id: 5, year: 2025, make: 'Honda', model: 'Accord Hybrid', comb08: 48, city08: 51, highway08: 44, fuelType1: 'Regular Gasoline', VClass: 'Midsize Cars' },
      { rank: 6, id: 6, year: 2025, make: 'Toyota', model: 'Camry Hybrid', comb08: 46, city08: 51, highway08: 43, fuelType1: 'Regular Gasoline', VClass: 'Midsize Cars' },
      { rank: 7, id: 7, year: 2025, make: 'Hyundai', model: 'Sonata Hybrid', comb08: 45, city08: 45, highway08: 51, fuelType1: 'Regular Gasoline', VClass: 'Midsize Cars' },
      { rank: 8, id: 8, year: 2025, make: 'Kia', model: 'K5 Hybrid', comb08: 44, city08: 48, highway08: 42, fuelType1: 'Regular Gasoline', VClass: 'Midsize Cars' },
      { rank: 9, id: 9, year: 2025, make: 'Nissan', model: 'Sentra', comb08: 33, city08: 29, highway08: 39, fuelType1: 'Regular Gasoline', VClass: 'Compact Cars' },
      { rank: 10, id: 10, year: 2025, make: 'Mazda', model: '3', comb08: 32, city08: 28, highway08: 37, fuelType1: 'Regular Gasoline', VClass: 'Compact Cars' },
      { rank: 11, id: 11, year: 2025, make: 'Honda', model: 'Accord', comb08: 32, city08: 29, highway08: 37, fuelType1: 'Regular Gasoline', VClass: 'Midsize Cars' },
      { rank: 12, id: 12, year: 2025, make: 'Volkswagen', model: 'Jetta', comb08: 32, city08: 29, highway08: 36, fuelType1: 'Regular Gasoline', VClass: 'Compact Cars' },
      { rank: 13, id: 13, year: 2025, make: 'Kia', model: 'Forte', comb08: 31, city08: 28, highway08: 36, fuelType1: 'Regular Gasoline', VClass: 'Compact Cars' },
      { rank: 14, id: 14, year: 2025, make: 'Hyundai', model: 'Elantra', comb08: 31, city08: 28, highway08: 36, fuelType1: 'Regular Gasoline', VClass: 'Compact Cars' },
      { rank: 15, id: 15, year: 2025, make: 'Toyota', model: 'Corolla', comb08: 31, city08: 28, highway08: 36, fuelType1: 'Regular Gasoline', VClass: 'Compact Cars' },
    ],
    suv: [
      { rank: 1, id: 101, year: 2025, make: 'Toyota', model: 'RAV4 Prime', comb08: 94, city08: 94, highway08: 84, fuelType1: 'Electricity', VClass: 'Small SUV' },
      { rank: 2, id: 102, year: 2025, make: 'Toyota', model: 'RAV4 Hybrid', comb08: 41, city08: 41, highway08: 38, fuelType1: 'Regular Gasoline', VClass: 'Small SUV' },
      { rank: 3, id: 103, year: 2025, make: 'Ford', model: 'Escape Hybrid', comb08: 41, city08: 44, highway08: 37, fuelType1: 'Regular Gasoline', VClass: 'Small SUV' },
      { rank: 4, id: 104, year: 2025, make: 'Honda', model: 'CR-V Hybrid', comb08: 40, city08: 40, highway08: 34, fuelType1: 'Regular Gasoline', VClass: 'Small SUV' },
      { rank: 5, id: 105, year: 2025, make: 'Hyundai', model: 'Tucson Hybrid', comb08: 38, city08: 38, highway08: 38, fuelType1: 'Regular Gasoline', VClass: 'Small SUV' },
      { rank: 6, id: 106, year: 2025, make: 'Kia', model: 'Sportage Hybrid', comb08: 38, city08: 42, highway08: 39, fuelType1: 'Regular Gasoline', VClass: 'Small SUV' },
      { rank: 7, id: 107, year: 2025, make: 'Toyota', model: 'Venza', comb08: 37, city08: 40, highway08: 37, fuelType1: 'Regular Gasoline', VClass: 'Small SUV' },
      { rank: 8, id: 108, year: 2025, make: 'Lexus', model: 'NX 350h', comb08: 36, city08: 41, highway08: 37, fuelType1: 'Regular Gasoline', VClass: 'Small SUV' },
      { rank: 9, id: 109, year: 2025, make: 'Mazda', model: 'CX-30', comb08: 28, city08: 25, highway08: 33, fuelType1: 'Regular Gasoline', VClass: 'Small SUV' },
      { rank: 10, id: 110, year: 2025, make: 'Subaru', model: 'Crosstrek', comb08: 28, city08: 26, highway08: 33, fuelType1: 'Regular Gasoline', VClass: 'Small SUV' },
      { rank: 11, id: 111, year: 2025, make: 'Honda', model: 'HR-V', comb08: 28, city08: 26, highway08: 32, fuelType1: 'Regular Gasoline', VClass: 'Small SUV' },
      { rank: 12, id: 112, year: 2025, make: 'Nissan', model: 'Rogue', comb08: 28, city08: 26, highway08: 33, fuelType1: 'Regular Gasoline', VClass: 'Small SUV' },
      { rank: 13, id: 113, year: 2025, make: 'Honda', model: 'CR-V', comb08: 28, city08: 26, highway08: 32, fuelType1: 'Regular Gasoline', VClass: 'Small SUV' },
      { rank: 14, id: 114, year: 2025, make: 'Toyota', model: 'RAV4', comb08: 28, city08: 27, highway08: 35, fuelType1: 'Regular Gasoline', VClass: 'Small SUV' },
      { rank: 15, id: 115, year: 2025, make: 'Hyundai', model: 'Tucson', comb08: 27, city08: 26, highway08: 33, fuelType1: 'Regular Gasoline', VClass: 'Small SUV' },
    ],
    truck: [
      { rank: 1, id: 201, year: 2025, make: 'Ford', model: 'Maverick Hybrid', comb08: 37, city08: 42, highway08: 33, fuelType1: 'Regular Gasoline', VClass: 'Small Pickup' },
      { rank: 2, id: 202, year: 2025, make: 'Ford', model: 'F-150 Hybrid', comb08: 25, city08: 25, highway08: 26, fuelType1: 'Regular Gasoline', VClass: 'Standard Pickup' },
      { rank: 3, id: 203, year: 2025, make: 'Toyota', model: 'Tacoma', comb08: 23, city08: 21, highway08: 26, fuelType1: 'Regular Gasoline', VClass: 'Small Pickup' },
      { rank: 4, id: 204, year: 2025, make: 'Ford', model: 'Maverick', comb08: 23, city08: 23, highway08: 30, fuelType1: 'Regular Gasoline', VClass: 'Small Pickup' },
      { rank: 5, id: 205, year: 2025, make: 'Chevrolet', model: 'Colorado', comb08: 22, city08: 19, highway08: 25, fuelType1: 'Regular Gasoline', VClass: 'Small Pickup' },
      { rank: 6, id: 206, year: 2025, make: 'GMC', model: 'Canyon', comb08: 22, city08: 19, highway08: 25, fuelType1: 'Regular Gasoline', VClass: 'Small Pickup' },
      { rank: 7, id: 207, year: 2025, make: 'Nissan', model: 'Frontier', comb08: 21, city08: 18, highway08: 24, fuelType1: 'Regular Gasoline', VClass: 'Small Pickup' },
      { rank: 8, id: 208, year: 2025, make: 'Honda', model: 'Ridgeline', comb08: 21, city08: 18, highway08: 24, fuelType1: 'Regular Gasoline', VClass: 'Small Pickup' },
      { rank: 9, id: 209, year: 2025, make: 'Ford', model: 'F-150', comb08: 21, city08: 19, highway08: 24, fuelType1: 'Regular Gasoline', VClass: 'Standard Pickup' },
      { rank: 10, id: 210, year: 2025, make: 'Ram', model: '1500', comb08: 21, city08: 19, highway08: 24, fuelType1: 'Regular Gasoline', VClass: 'Standard Pickup' },
    ],
    hatchback: [
      { rank: 1, id: 301, year: 2025, make: 'Toyota', model: 'Prius', comb08: 57, city08: 58, highway08: 56, fuelType1: 'Regular Gasoline', VClass: 'Midsize Cars' },
      { rank: 2, id: 302, year: 2025, make: 'Toyota', model: 'Corolla Hatchback', comb08: 35, city08: 32, highway08: 41, fuelType1: 'Regular Gasoline', VClass: 'Compact Cars' },
      { rank: 3, id: 303, year: 2025, make: 'Mazda', model: '3 Hatchback', comb08: 31, city08: 28, highway08: 36, fuelType1: 'Regular Gasoline', VClass: 'Compact Cars' },
      { rank: 4, id: 304, year: 2025, make: 'Honda', model: 'Civic Hatchback', comb08: 33, city08: 30, highway08: 37, fuelType1: 'Regular Gasoline', VClass: 'Compact Cars' },
      { rank: 5, id: 305, year: 2025, make: 'Volkswagen', model: 'Golf', comb08: 31, city08: 28, highway08: 36, fuelType1: 'Regular Gasoline', VClass: 'Compact Cars' },
      { rank: 6, id: 306, year: 2025, make: 'Hyundai', model: 'Elantra GT', comb08: 30, city08: 27, highway08: 35, fuelType1: 'Regular Gasoline', VClass: 'Compact Cars' },
      { rank: 7, id: 307, year: 2025, make: 'Kia', model: 'Rio 5-Door', comb08: 33, city08: 32, highway08: 40, fuelType1: 'Regular Gasoline', VClass: 'Subcompact Cars' },
      { rank: 8, id: 308, year: 2025, make: 'Subaru', model: 'Impreza', comb08: 28, city08: 26, highway08: 33, fuelType1: 'Regular Gasoline', VClass: 'Compact Cars' },
    ],
    coupe: [
      { rank: 1, id: 401, year: 2025, make: 'Toyota', model: 'GR86', comb08: 26, city08: 22, highway08: 32, fuelType1: 'Premium Gasoline', VClass: 'Two Seaters' },
      { rank: 2, id: 402, year: 2025, make: 'Subaru', model: 'BRZ', comb08: 26, city08: 22, highway08: 32, fuelType1: 'Premium Gasoline', VClass: 'Two Seaters' },
      { rank: 3, id: 403, year: 2025, make: 'Mazda', model: 'MX-5 Miata', comb08: 30, city08: 26, highway08: 34, fuelType1: 'Premium Gasoline', VClass: 'Two Seaters' },
      { rank: 4, id: 404, year: 2025, make: 'Honda', model: 'Civic Si', comb08: 30, city08: 27, highway08: 36, fuelType1: 'Premium Gasoline', VClass: 'Compact Cars' },
      { rank: 5, id: 405, year: 2025, make: 'Ford', model: 'Mustang', comb08: 22, city08: 18, highway08: 27, fuelType1: 'Regular Gasoline', VClass: 'Two Seaters' },
      { rank: 6, id: 406, year: 2025, make: 'Chevrolet', model: 'Camaro', comb08: 22, city08: 19, highway08: 29, fuelType1: 'Regular Gasoline', VClass: 'Two Seaters' },
      { rank: 7, id: 407, year: 2025, make: 'Dodge', model: 'Challenger', comb08: 19, city08: 15, highway08: 24, fuelType1: 'Premium Gasoline', VClass: 'Two Seaters' },
    ],
    minivan: [
      { rank: 1, id: 501, year: 2025, make: 'Toyota', model: 'Sienna', comb08: 36, city08: 36, highway08: 36, fuelType1: 'Regular Gasoline', VClass: 'Minivan' },
      { rank: 2, id: 502, year: 2025, make: 'Chrysler', model: 'Pacifica Hybrid', comb08: 30, city08: 30, highway08: 30, fuelType1: 'Regular Gasoline', VClass: 'Minivan' },
      { rank: 3, id: 503, year: 2025, make: 'Honda', model: 'Odyssey', comb08: 22, city08: 19, highway08: 28, fuelType1: 'Regular Gasoline', VClass: 'Minivan' },
      { rank: 4, id: 504, year: 2025, make: 'Kia', model: 'Carnival', comb08: 22, city08: 19, highway08: 26, fuelType1: 'Regular Gasoline', VClass: 'Minivan' },
      { rank: 5, id: 505, year: 2025, make: 'Chrysler', model: 'Pacifica', comb08: 22, city08: 19, highway08: 28, fuelType1: 'Regular Gasoline', VClass: 'Minivan' },
    ],
  };
  
  // Get vehicles for the category
  const categoryKey = bodyStyle.toLowerCase();
  let vehicles = topByCategory[categoryKey] || topByCategory['sedan'];
  
  // Check if current vehicle is in the list
  const currentModelLower = currentModel.toLowerCase();
  const currentMakeLower = currentMake.toLowerCase();
  
  let currentRank: number | null = null;
  let foundInList = false;
  
  vehicles = vehicles.map(v => {
    const isMatch = v.make.toLowerCase() === currentMakeLower && 
      (v.model.toLowerCase().includes(currentModelLower) || 
       currentModelLower.includes(v.model.toLowerCase()));
    
    if (isMatch) {
      foundInList = true;
      currentRank = v.rank;
      return { ...v, isCurrentVehicle: true };
    }
    return v;
  });
  
  // If current vehicle not in list, calculate where it would rank
  if (!foundInList && currentMPG > 0) {
    // Find where current MPG would rank
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
      fuelType1: 'Regular Gasoline',
      VClass: categoryKey,
      isCurrentVehicle: true
    };
    
    // Re-rank all vehicles
    vehicles = [...sortedByMPG.slice(0, insertIndex), currentVehicle, ...sortedByMPG.slice(insertIndex)]
      .map((v, i) => ({ ...v, rank: i + 1 }));
  }
  
  return { vehicles, currentRank };
}

