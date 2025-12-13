/**
 * Lifestyle Service
 * Categorizes vehicles into lifestyle categories based on their characteristics
 */

import type { Vehicle } from '../types/vehicle';

export type Lifestyle = 
  | 'Family'
  | 'Adventure'
  | 'Luxury'
  | 'Eco-Friendly'
  | 'Performance'
  | 'Commuter'
  | 'Value';

export const LIFESTYLES: Lifestyle[] = [
  'Family',
  'Adventure',
  'Luxury',
  'Eco-Friendly',
  'Performance',
  'Commuter',
  'Value',
];

// Luxury brands
const LUXURY_MAKES = [
  'Mercedes-Benz',
  'BMW',
  'Audi',
  'Lexus',
  'Porsche',
  'Jaguar',
  'Land Rover',
  'Genesis',
  'Cadillac',
  'Lincoln',
  'Infiniti',
  'Acura',
  'Volvo',
  'Alfa Romeo',
  'Maserati',
  'Bentley',
  'Rolls-Royce',
  'Ferrari',
  'Lamborghini',
  'McLaren',
  'Aston Martin',
  'Lotus',
  'Rimac',
  'Pininfarina',
  'Lucid',
  'Rivian',
  'Polestar',
];

// Performance models (partial match)
const PERFORMANCE_MODELS = [
  'GTI',
  'Golf R',
  'M2',
  'M3',
  'M4',
  'M5',
  'M8',
  'AMG',
  'RS',
  'S3',
  'S4',
  'S5',
  'S6',
  'S7',
  'S8',
  'Supra',
  'GR86',
  'BRZ',
  'Corvette',
  'Camaro',
  'Mustang',
  'Challenger',
  'Charger',
  '911',
  'Taycan',
  'Z',
  '370Z',
  'Roadster',
  'Type R',
  'Si',
  'Nismo',
  'TRD',
  'Hemi',
  'Hellcat',
  'GT',
  'Shelby',
  'Raptor',
  'Tremor',
  'Trail Boss',
  'ZR2',
];

// Adventure/Off-road models
const ADVENTURE_MODELS = [
  'Wrangler',
  'Gladiator',
  '4Runner',
  'Tacoma',
  'Bronco',
  'Defender',
  'Range Rover',
  'Land Cruiser',
  'Sequoia',
  'Tundra',
  'F-150',
  'Silverado',
  'Sierra',
  'Ram',
  'Colorado',
  'Ranger',
  'Frontier',
  'Titan',
  'Crosstrek',
  'Outback',
  'Forester',
  'Grand Cherokee',
  'Cherokee',
  'Compass',
  'Pathfinder',
  'Armada',
  'Expedition',
  'Tahoe',
  'Suburban',
  'Yukon',
  'Escalade',
  'Navigator',
  'Hummer',
  'Cybertruck',
  'R1T',
  'Santa Cruz',
  'Maverick',
];

// Family-friendly body styles
const FAMILY_BODY_STYLES = ['SUV', 'Wagon'];

/**
 * Determines the primary lifestyle category for a vehicle
 */
export const getVehicleLifestyle = (vehicle: Vehicle): Lifestyle => {
  const { make, model, bodyStyle, fuelType, priceMin, horsepower, seatingCapacity } = vehicle;
  
  // Check for Eco-Friendly first (Electric/Hybrid)
  if (fuelType === 'Electric' || fuelType === 'Hybrid' || fuelType === 'Plug-in Hybrid') {
    return 'Eco-Friendly';
  }
  
  // Check for Performance vehicles
  const isPerformanceModel = PERFORMANCE_MODELS.some(pm => 
    model.toLowerCase().includes(pm.toLowerCase())
  );
  if (isPerformanceModel || (horsepower && horsepower > 400) || bodyStyle === 'Coupe' || bodyStyle === 'Convertible') {
    // But exclude luxury if it's a very expensive performance car
    if (priceMin > 80000 && LUXURY_MAKES.includes(make)) {
      return 'Luxury';
    }
    return 'Performance';
  }
  
  // Check for Luxury
  if (LUXURY_MAKES.includes(make) || priceMin > 60000) {
    return 'Luxury';
  }
  
  // Check for Adventure
  const isAdventureModel = ADVENTURE_MODELS.some(am => 
    model.toLowerCase().includes(am.toLowerCase())
  );
  if (isAdventureModel || bodyStyle === 'Truck') {
    return 'Adventure';
  }
  
  // Check for Family
  if (FAMILY_BODY_STYLES.includes(bodyStyle) && seatingCapacity && seatingCapacity >= 5) {
    // Large SUVs and wagons with good space
    if (seatingCapacity >= 7 || (bodyStyle === 'SUV' && priceMin > 35000)) {
      return 'Family';
    }
  }
  
  // Check for Value
  if (priceMin < 28000) {
    return 'Value';
  }
  
  // Check for Commuter (sedans, hatchbacks, good MPG)
  if (bodyStyle === 'Sedan' || bodyStyle === 'Hatchback') {
    return 'Commuter';
  }
  
  // Default to Family for remaining SUVs
  if (bodyStyle === 'SUV') {
    return 'Family';
  }
  
  // Default fallback
  return 'Commuter';
};

/**
 * Gets all lifestyles for a vehicle (a vehicle can belong to multiple)
 */
export const getVehicleLifestyles = (vehicle: Vehicle): Lifestyle[] => {
  const lifestyles: Lifestyle[] = [];
  const { make, model, bodyStyle, fuelType, priceMin, horsepower, seatingCapacity } = vehicle;
  
  // Eco-Friendly
  if (fuelType === 'Electric' || fuelType === 'Hybrid' || fuelType === 'Plug-in Hybrid') {
    lifestyles.push('Eco-Friendly');
  }
  
  // Performance
  const isPerformanceModel = PERFORMANCE_MODELS.some(pm => 
    model.toLowerCase().includes(pm.toLowerCase())
  );
  if (isPerformanceModel || (horsepower && horsepower > 350) || bodyStyle === 'Coupe' || bodyStyle === 'Convertible') {
    lifestyles.push('Performance');
  }
  
  // Luxury
  if (LUXURY_MAKES.includes(make) || priceMin > 55000) {
    lifestyles.push('Luxury');
  }
  
  // Adventure
  const isAdventureModel = ADVENTURE_MODELS.some(am => 
    model.toLowerCase().includes(am.toLowerCase())
  );
  if (isAdventureModel || bodyStyle === 'Truck') {
    lifestyles.push('Adventure');
  }
  
  // Family
  if (FAMILY_BODY_STYLES.includes(bodyStyle) && seatingCapacity && seatingCapacity >= 5) {
    lifestyles.push('Family');
  }
  
  // Value
  if (priceMin < 30000) {
    lifestyles.push('Value');
  }
  
  // Commuter
  if ((bodyStyle === 'Sedan' || bodyStyle === 'Hatchback') && priceMin < 45000) {
    lifestyles.push('Commuter');
  }
  
  // Ensure at least one lifestyle
  if (lifestyles.length === 0) {
    lifestyles.push(getVehicleLifestyle(vehicle));
  }
  
  return lifestyles;
};

/**
 * Filters vehicles by lifestyle
 */
export const filterVehiclesByLifestyle = (vehicles: Vehicle[], lifestyle: Lifestyle): Vehicle[] => {
  return vehicles.filter(v => getVehicleLifestyles(v).includes(lifestyle));
};

/**
 * Gets lifestyle icon name (for use with Lucide icons)
 */
export const getLifestyleIcon = (lifestyle: Lifestyle): string => {
  switch (lifestyle) {
    case 'Family':
      return 'users';
    case 'Adventure':
      return 'mountain';
    case 'Luxury':
      return 'gem';
    case 'Eco-Friendly':
      return 'leaf';
    case 'Performance':
      return 'gauge';
    case 'Commuter':
      return 'briefcase';
    case 'Value':
      return 'piggy-bank';
    default:
      return 'car';
  }
};

/**
 * Gets lifestyle description
 */
export const getLifestyleDescription = (lifestyle: Lifestyle): string => {
  switch (lifestyle) {
    case 'Family':
      return 'Spacious and safe vehicles perfect for families';
    case 'Adventure':
      return 'Rugged vehicles built for off-road and outdoor adventures';
    case 'Luxury':
      return 'Premium vehicles with top-tier comfort and features';
    case 'Eco-Friendly':
      return 'Electric and hybrid vehicles for sustainable driving';
    case 'Performance':
      return 'High-powered vehicles designed for driving enthusiasts';
    case 'Commuter':
      return 'Efficient and practical vehicles for daily driving';
    case 'Value':
      return 'Affordable vehicles that offer great bang for your buck';
    default:
      return '';
  }
};

export default {
  LIFESTYLES,
  getVehicleLifestyle,
  getVehicleLifestyles,
  filterVehiclesByLifestyle,
  getLifestyleIcon,
  getLifestyleDescription,
};

