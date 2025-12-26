/**
 * Dealer Service
 * Dynamic dealer data and scoring algorithm for dealer locator
 * Generates realistic inventory based on vehicle make/model/price
 */

export interface VehicleInventoryItem {
  year: number;
  make: string;
  model: string;
  trim: string;
  price: number;
  mileage?: number; // For used vehicles
  vin?: string;
  exteriorColor?: string;
  interiorColor?: string;
  isNew: boolean;
}

// Common trim levels by brand
const trimLevelsByMake: Record<string, string[]> = {
  Toyota: ['L', 'LE', 'SE', 'XLE', 'XSE', 'Limited', 'TRD Sport', 'TRD Off-Road'],
  Honda: ['LX', 'Sport', 'EX', 'EX-L', 'Sport-L', 'Touring'],
  Ford: ['Base', 'XL', 'XLT', 'Lariat', 'King Ranch', 'Platinum', 'Limited'],
  Chevrolet: ['LS', 'LT', 'RS', 'Premier', 'High Country', 'Z71', 'ZR2'],
  Nissan: ['S', 'SV', 'SL', 'SR', 'Platinum'],
  Hyundai: ['SE', 'SEL', 'N Line', 'Limited', 'Calligraphy'],
  Kia: ['LX', 'LXS', 'EX', 'GT-Line', 'SX', 'SX Prestige'],
  Mazda: ['Base', 'Select', 'Preferred', 'Premium', 'Premium Plus', 'Turbo'],
  Subaru: ['Base', 'Premium', 'Sport', 'Limited', 'Touring'],
  BMW: ['sDrive', 'xDrive', 'M Sport', 'M'],
  Mercedes: ['Base', 'AMG Line', 'AMG'],
  Audi: ['Premium', 'Premium Plus', 'Prestige', 'S Line'],
  Lexus: ['Base', 'Premium', 'Luxury', 'F Sport'],
  Tesla: ['Standard Range', 'Long Range', 'Performance'],
  Porsche: ['Base', 'S', 'GTS', 'Turbo', 'Turbo S'],
  Volkswagen: ['S', 'SE', 'SEL', 'SEL Premium', 'R-Line'],
  Jeep: ['Sport', 'Sport S', 'Latitude', 'Limited', 'Trailhawk', 'Rubicon'],
  Ram: ['Tradesman', 'Big Horn', 'Laramie', 'Limited', 'TRX'],
  GMC: ['Elevation', 'SLE', 'SLT', 'AT4', 'Denali'],
  Dodge: ['SXT', 'GT', 'R/T', 'Scat Pack', 'Hellcat'],
  Acura: ['Base', 'Technology', 'A-Spec', 'Advance', 'Type S'],
  Infiniti: ['Pure', 'Luxe', 'Sensory', 'Autograph'],
  Genesis: ['Standard', 'Advanced', 'Prestige'],
  Volvo: ['Core', 'Plus', 'Ultimate'],
  Cadillac: ['Luxury', 'Premium Luxury', 'Sport', 'V-Series'],
  Lincoln: ['Standard', 'Reserve', 'Black Label'],
  Rivian: ['Adventure', 'Launch Edition'],
  Lucid: ['Pure', 'Touring', 'Grand Touring', 'Sapphire'],
};

// Common exterior colors
const exteriorColors = [
  'Super White', 'Midnight Black', 'Lunar Silver', 'Modern Steel', 
  'Crystal Black', 'Platinum White', 'Magnetic Gray', 'Blueprint',
  'Celestial Silver', 'Wind Chill Pearl', 'Supersonic Red', 'Ice Cap',
  'Coastal Gray', 'Stormy Sea', 'Oxygen White', 'Carbon Black'
];

// Common interior colors
const interiorColors = ['Black', 'Gray', 'Beige', 'Brown', 'Red', 'White'];

// Dealer name templates by make
const dealerNamesByMake: Record<string, string[]> = {
  Toyota: ['Toyota of {city}', '{city} Toyota', 'AutoNation Toyota {city}', 'Longo Toyota', 'Keyes Toyota'],
  Honda: ['Honda of {city}', '{city} Honda', 'AutoNation Honda {city}', 'Galpin Honda', 'Norm Reeves Honda'],
  Ford: ['Ford of {city}', '{city} Ford', 'AutoNation Ford {city}', 'Galpin Ford', 'Sunrise Ford'],
  Chevrolet: ['{city} Chevrolet', 'AutoNation Chevrolet {city}', 'Simpson Chevrolet', 'Courtesy Chevrolet'],
  Nissan: ['Nissan of {city}', '{city} Nissan', 'AutoNation Nissan {city}', 'Mossy Nissan'],
  Hyundai: ['Hyundai of {city}', '{city} Hyundai', 'AutoNation Hyundai {city}', 'Keyes Hyundai'],
  Kia: ['Kia of {city}', '{city} Kia', 'AutoNation Kia {city}', 'Car Pros Kia'],
  Mazda: ['Mazda of {city}', '{city} Mazda', 'Galpin Mazda', 'Puente Hills Mazda'],
  Subaru: ['Subaru of {city}', '{city} Subaru', 'AutoNation Subaru {city}', 'Timmons Subaru'],
  BMW: ['BMW of {city}', '{city} BMW', 'Crevier BMW', 'Pacific BMW', 'Beverly Hills BMW'],
  Mercedes: ['Mercedes-Benz of {city}', '{city} Mercedes-Benz', 'Fletcher Jones Mercedes', 'Keyes Mercedes'],
  Audi: ['Audi {city}', '{city} Audi', 'Audi Pacific', 'McKenna Audi', 'Rusnak Audi'],
  Lexus: ['Lexus of {city}', '{city} Lexus', 'Keyes Lexus', 'Longo Lexus', 'South Bay Lexus'],
  Tesla: ['Tesla {city}', 'Tesla Store {city}', 'Tesla Service Center {city}'],
  Porsche: ['Porsche {city}', '{city} Porsche', 'Rusnak Porsche', 'Beverly Hills Porsche'],
  Volkswagen: ['Volkswagen of {city}', '{city} VW', 'AutoNation VW {city}', 'McKenna VW'],
  Jeep: ['Jeep of {city}', '{city} Chrysler Dodge Jeep Ram', 'AutoNation CDJR {city}'],
  Ram: ['{city} Ram', '{city} Chrysler Dodge Jeep Ram', 'AutoNation CDJR {city}'],
  GMC: ['GMC of {city}', '{city} Buick GMC', 'AutoNation Buick GMC {city}'],
  Dodge: ['{city} Dodge', '{city} Chrysler Dodge Jeep Ram', 'AutoNation CDJR {city}'],
  Acura: ['Acura of {city}', '{city} Acura', 'Kearny Mesa Acura', 'Spitzer Acura'],
  Infiniti: ['Infiniti of {city}', '{city} Infiniti', 'AutoNation Infiniti {city}'],
  Genesis: ['Genesis of {city}', '{city} Genesis', 'Keyes Genesis'],
  Volvo: ['Volvo Cars {city}', '{city} Volvo', 'Rusnak Volvo'],
  Cadillac: ['Cadillac of {city}', '{city} Cadillac', 'AutoNation Cadillac {city}'],
  Lincoln: ['Lincoln of {city}', '{city} Lincoln', 'AutoNation Lincoln {city}'],
  Rivian: ['Rivian {city}', 'Rivian Service Center {city}'],
  Lucid: ['Lucid Studio {city}', 'Lucid Motors {city}'],
};

export interface Dealer {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  website?: string;
  lat: number;
  lng: number;
  rating: number;
  reviewCount: number;
  distance?: number; // miles from user
  inventory: VehicleInventoryItem[];
  hours?: {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
  };
  certifications?: string[];
  imageUrl?: string;
}

export interface DealScore {
  total: number;
  priceScore: number;
  distanceScore: number;
  ratingScore: number;
  inventoryBonus: number;
  isBestDeal: boolean;
}

export interface DealerWithScore extends Dealer {
  dealScore: DealScore;
  lowestPrice: number;
  highestPrice: number;
  inventoryCount: number;
}

export type SortOption = 'bestDeal' | 'distance' | 'price' | 'rating';

// Mock dealer data for multiple regions
// Dealers are grouped by region for easier management
const mockDealers: Dealer[] = [
  // ============================================
  // CALIFORNIA - Orange County / LA Area
  // ============================================
  {
    id: 'dealer-ca-1',
    name: 'Simpson Chevrolet of Irvine',
    address: '18 Auto Center Dr',
    city: 'Irvine',
    state: 'CA',
    zipCode: '92618',
    phone: '(949) 753-1500',
    website: 'https://www.simpsonchevrolet.com',
    lat: 33.6694,
    lng: -117.8231,
    rating: 4.7,
    reviewCount: 1523,
    inventory: [
      { year: 2025, make: 'Chevrolet', model: 'Trax', trim: 'LS FWD', price: 22150, isNew: true, exteriorColor: 'Summit White', interiorColor: 'Jet Black' },
      { year: 2025, make: 'Chevrolet', model: 'Trax', trim: 'LT FWD', price: 24200, isNew: true, exteriorColor: 'Mosaic Black', interiorColor: 'Jet Black' },
      { year: 2025, make: 'Chevrolet', model: 'Trax', trim: 'RS FWD', price: 26100, isNew: true, exteriorColor: 'Cayenne Orange', interiorColor: 'Jet Black' },
      { year: 2024, make: 'Chevrolet', model: 'Trax', trim: 'ACTIV FWD', price: 25800, isNew: true, exteriorColor: 'Cacti Green', interiorColor: 'Medium Ash Gray' },
    ],
    hours: {
      monday: '9:00 AM - 9:00 PM',
      tuesday: '9:00 AM - 9:00 PM',
      wednesday: '9:00 AM - 9:00 PM',
      thursday: '9:00 AM - 9:00 PM',
      friday: '9:00 AM - 9:00 PM',
      saturday: '9:00 AM - 8:00 PM',
      sunday: '10:00 AM - 7:00 PM',
    },
    certifications: ['Certified Pre-Owned', 'GM Dealer of Excellence'],
  },
  {
    id: 'dealer-ca-2',
    name: 'Lake Forest Chevrolet',
    address: '23595 Rockfield Blvd',
    city: 'Lake Forest',
    state: 'CA',
    zipCode: '92630',
    phone: '(949) 830-3100',
    website: 'https://www.lakeforestchevrolet.com',
    lat: 33.6469,
    lng: -117.6891,
    rating: 4.5,
    reviewCount: 987,
    inventory: [
      { year: 2025, make: 'Chevrolet', model: 'Trax', trim: 'LS FWD', price: 21895, isNew: true, exteriorColor: 'Sterling Gray', interiorColor: 'Jet Black' },
      { year: 2024, make: 'Chevrolet', model: 'Trax', trim: 'LT FWD', price: 23800, isNew: true, exteriorColor: 'Summit White', interiorColor: 'Jet Black' },
    ],
    hours: {
      monday: '9:00 AM - 8:00 PM',
      tuesday: '9:00 AM - 8:00 PM',
      wednesday: '9:00 AM - 8:00 PM',
      thursday: '9:00 AM - 8:00 PM',
      friday: '9:00 AM - 8:00 PM',
      saturday: '9:00 AM - 7:00 PM',
      sunday: '10:00 AM - 6:00 PM',
    },
    certifications: ['Certified Pre-Owned'],
  },
  {
    id: 'dealer-ca-3',
    name: 'Mission Viejo Chevrolet',
    address: '28502 Marguerite Pkwy',
    city: 'Mission Viejo',
    state: 'CA',
    zipCode: '92692',
    phone: '(949) 364-0600',
    lat: 33.5963,
    lng: -117.6590,
    rating: 4.3,
    reviewCount: 654,
    inventory: [
      { year: 2025, make: 'Chevrolet', model: 'Trax', trim: 'LS FWD', price: 21650, isNew: true, exteriorColor: 'Summit White', interiorColor: 'Jet Black' },
      { year: 2025, make: 'Chevrolet', model: 'Trax', trim: 'RS FWD', price: 25495, isNew: true, exteriorColor: 'Mosaic Black', interiorColor: 'Jet Black' },
      { year: 2024, make: 'Chevrolet', model: 'Trax', trim: 'LT FWD', price: 23450, isNew: true, exteriorColor: 'Nitro Yellow', interiorColor: 'Jet Black' },
    ],
    hours: {
      monday: '9:00 AM - 9:00 PM',
      tuesday: '9:00 AM - 9:00 PM',
      wednesday: '9:00 AM - 9:00 PM',
      thursday: '9:00 AM - 9:00 PM',
      friday: '9:00 AM - 9:00 PM',
      saturday: '9:00 AM - 8:00 PM',
      sunday: '10:00 AM - 6:00 PM',
    },
  },
  {
    id: 'dealer-ca-4',
    name: 'Tustin Chevrolet',
    address: '3 Auto Center Dr',
    city: 'Tustin',
    state: 'CA',
    zipCode: '92782',
    phone: '(714) 669-3100',
    lat: 33.7175,
    lng: -117.8231,
    rating: 4.6,
    reviewCount: 1102,
    inventory: [
      { year: 2025, make: 'Chevrolet', model: 'Trax', trim: 'ACTIV FWD', price: 25200, isNew: true, exteriorColor: 'Cacti Green', interiorColor: 'Medium Ash Gray' },
      { year: 2025, make: 'Chevrolet', model: 'Trax', trim: 'LT FWD', price: 23100, isNew: true, exteriorColor: 'Sterling Gray', interiorColor: 'Jet Black' },
    ],
    hours: {
      monday: '9:00 AM - 9:00 PM',
      tuesday: '9:00 AM - 9:00 PM',
      wednesday: '9:00 AM - 9:00 PM',
      thursday: '9:00 AM - 9:00 PM',
      friday: '9:00 AM - 9:00 PM',
      saturday: '9:00 AM - 8:00 PM',
      sunday: '10:00 AM - 7:00 PM',
    },
    certifications: ['GM Dealer of Excellence'],
  },
  {
    id: 'dealer-ca-5',
    name: 'Cerritos Chevrolet',
    address: '18605 Studebaker Rd',
    city: 'Cerritos',
    state: 'CA',
    zipCode: '90703',
    phone: '(562) 924-1234',
    lat: 33.8650,
    lng: -118.0526,
    rating: 4.4,
    reviewCount: 876,
    inventory: [
      { year: 2025, make: 'Chevrolet', model: 'Trax', trim: 'LS FWD', price: 21450, isNew: true, exteriorColor: 'Summit White', interiorColor: 'Jet Black' },
      { year: 2025, make: 'Chevrolet', model: 'Trax', trim: 'LT FWD', price: 23650, isNew: true, exteriorColor: 'Mosaic Black', interiorColor: 'Jet Black' },
      { year: 2025, make: 'Chevrolet', model: 'Trax', trim: 'RS FWD', price: 25890, isNew: true, exteriorColor: 'Cayenne Orange', interiorColor: 'Jet Black' },
      { year: 2025, make: 'Chevrolet', model: 'Trax', trim: 'ACTIV AWD', price: 27200, isNew: true, exteriorColor: 'Cacti Green', interiorColor: 'Medium Ash Gray' },
      { year: 2023, make: 'Chevrolet', model: 'Trax', trim: 'LT FWD', price: 18995, mileage: 12450, isNew: false, exteriorColor: 'Summit White', interiorColor: 'Jet Black' },
    ],
    hours: {
      monday: '9:00 AM - 9:00 PM',
      tuesday: '9:00 AM - 9:00 PM',
      wednesday: '9:00 AM - 9:00 PM',
      thursday: '9:00 AM - 9:00 PM',
      friday: '9:00 AM - 9:00 PM',
      saturday: '9:00 AM - 8:00 PM',
      sunday: '10:00 AM - 7:00 PM',
    },
    certifications: ['Certified Pre-Owned', 'Mark of Excellence'],
  },
  {
    id: 'dealer-ca-6',
    name: 'Puente Hills Chevrolet',
    address: '17621 E Gale Ave',
    city: 'City of Industry',
    state: 'CA',
    zipCode: '91748',
    phone: '(626) 810-2000',
    lat: 33.9961,
    lng: -117.9173,
    rating: 4.2,
    reviewCount: 543,
    inventory: [
      { year: 2025, make: 'Chevrolet', model: 'Trax', trim: 'LS FWD', price: 21200, isNew: true, exteriorColor: 'Summit White', interiorColor: 'Jet Black' },
      { year: 2022, make: 'Chevrolet', model: 'Trax', trim: 'LS FWD', price: 15900, mileage: 28750, isNew: false, exteriorColor: 'Mosaic Black', interiorColor: 'Jet Black' },
    ],
    hours: {
      monday: '9:00 AM - 9:00 PM',
      tuesday: '9:00 AM - 9:00 PM',
      wednesday: '9:00 AM - 9:00 PM',
      thursday: '9:00 AM - 9:00 PM',
      friday: '9:00 AM - 9:00 PM',
      saturday: '9:00 AM - 8:00 PM',
      sunday: '10:00 AM - 7:00 PM',
    },
  },
  // ============================================
  // FLORIDA - Miami Area
  // ============================================
  {
    id: 'dealer-1',
    name: 'AutoNation Chevrolet Pembroke Pines',
    address: '8600 Pines Blvd',
    city: 'Pembroke Pines',
    state: 'FL',
    zipCode: '33024',
    phone: '(954) 443-2100',
    website: 'https://www.autonationchevroletpembrokepines.com',
    lat: 26.0112,
    lng: -80.2945,
    rating: 4.8,
    reviewCount: 1247,
    inventory: [
      { year: 2025, make: 'Chevrolet', model: 'Trax', trim: 'LS FWD', price: 21450, isNew: true, exteriorColor: 'Summit White', interiorColor: 'Jet Black' },
      { year: 2025, make: 'Chevrolet', model: 'Trax', trim: 'LT FWD', price: 23200, isNew: true, exteriorColor: 'Mosaic Black', interiorColor: 'Jet Black' },
      { year: 2025, make: 'Chevrolet', model: 'Trax', trim: 'RS FWD', price: 24890, isNew: true, exteriorColor: 'Cayenne Orange', interiorColor: 'Jet Black' },
    ],
    hours: {
      monday: '9:00 AM - 9:00 PM',
      tuesday: '9:00 AM - 9:00 PM',
      wednesday: '9:00 AM - 9:00 PM',
      thursday: '9:00 AM - 9:00 PM',
      friday: '9:00 AM - 9:00 PM',
      saturday: '9:00 AM - 8:00 PM',
      sunday: '11:00 AM - 6:00 PM',
    },
    certifications: ['Certified Pre-Owned', 'GM Dealer of Excellence'],
  },
  {
    id: 'dealer-2',
    name: 'Bomnin Chevrolet Dadeland',
    address: '8455 S Dixie Hwy',
    city: 'Miami',
    state: 'FL',
    zipCode: '33143',
    phone: '(305) 667-2601',
    website: 'https://www.bomninchevroletdadeland.com',
    lat: 25.6986,
    lng: -80.3106,
    rating: 4.5,
    reviewCount: 892,
    inventory: [
      { year: 2025, make: 'Chevrolet', model: 'Trax', trim: '1RS FWD', price: 22100, isNew: true, exteriorColor: 'Sterling Gray', interiorColor: 'Jet Black' },
    ],
    hours: {
      monday: '9:00 AM - 9:00 PM',
      tuesday: '9:00 AM - 9:00 PM',
      wednesday: '9:00 AM - 9:00 PM',
      thursday: '9:00 AM - 9:00 PM',
      friday: '9:00 AM - 9:00 PM',
      saturday: '9:00 AM - 7:00 PM',
      sunday: '12:00 PM - 5:00 PM',
    },
    certifications: ['Certified Pre-Owned'],
  },
  {
    id: 'dealer-3',
    name: 'Williamson Chevrolet',
    address: '8655 NW 12th St',
    city: 'Miami',
    state: 'FL',
    zipCode: '33126',
    phone: '(305) 477-1000',
    website: 'https://www.williamsonchevrolet.com',
    lat: 25.7823,
    lng: -80.3389,
    rating: 4.2,
    reviewCount: 567,
    inventory: [
      { year: 2025, make: 'Chevrolet', model: 'Trax', trim: 'LS FWD', price: 21895, isNew: true, exteriorColor: 'Summit White', interiorColor: 'Jet Black' },
      { year: 2025, make: 'Chevrolet', model: 'Trax', trim: 'LT FWD', price: 23595, isNew: true, exteriorColor: 'Nitro Yellow', interiorColor: 'Jet Black' },
    ],
    hours: {
      monday: '8:30 AM - 8:00 PM',
      tuesday: '8:30 AM - 8:00 PM',
      wednesday: '8:30 AM - 8:00 PM',
      thursday: '8:30 AM - 8:00 PM',
      friday: '8:30 AM - 8:00 PM',
      saturday: '9:00 AM - 6:00 PM',
      sunday: 'Closed',
    },
  },
  {
    id: 'dealer-4',
    name: 'Brickell Chevrolet',
    address: '665 SW 8th St',
    city: 'Miami',
    state: 'FL',
    zipCode: '33130',
    phone: '(305) 856-3600',
    lat: 25.7654,
    lng: -80.2089,
    rating: 4.6,
    reviewCount: 1089,
    inventory: [
      { year: 2025, make: 'Chevrolet', model: 'Trax', trim: 'ACTIV FWD', price: 24995, isNew: true, exteriorColor: 'Cacti Green', interiorColor: 'Medium Ash Gray' },
      { year: 2025, make: 'Chevrolet', model: 'Trax', trim: 'RS FWD', price: 25200, isNew: true, exteriorColor: 'Mosaic Black', interiorColor: 'Jet Black' },
      { year: 2025, make: 'Chevrolet', model: 'Trax', trim: 'LS FWD', price: 21650, isNew: true, exteriorColor: 'Summit White', interiorColor: 'Jet Black' },
      { year: 2025, make: 'Chevrolet', model: 'Trax', trim: 'LT FWD', price: 23100, isNew: true, exteriorColor: 'Sterling Gray', interiorColor: 'Jet Black' },
    ],
    hours: {
      monday: '9:00 AM - 9:00 PM',
      tuesday: '9:00 AM - 9:00 PM',
      wednesday: '9:00 AM - 9:00 PM',
      thursday: '9:00 AM - 9:00 PM',
      friday: '9:00 AM - 9:00 PM',
      saturday: '9:00 AM - 8:00 PM',
      sunday: '10:00 AM - 7:00 PM',
    },
    certifications: ['Certified Pre-Owned', 'GM Dealer of Excellence', 'Mark of Excellence'],
  },
  {
    id: 'dealer-5',
    name: 'Medley Chevrolet',
    address: '9650 NW 77th Ave',
    city: 'Hialeah Gardens',
    state: 'FL',
    zipCode: '33016',
    phone: '(305) 556-2000',
    lat: 25.8756,
    lng: -80.3456,
    rating: 4.0,
    reviewCount: 345,
    inventory: [
      { year: 2025, make: 'Chevrolet', model: 'Trax', trim: 'LS FWD', price: 21200, isNew: true, exteriorColor: 'Summit White', interiorColor: 'Jet Black' },
    ],
    hours: {
      monday: '9:00 AM - 8:00 PM',
      tuesday: '9:00 AM - 8:00 PM',
      wednesday: '9:00 AM - 8:00 PM',
      thursday: '9:00 AM - 8:00 PM',
      friday: '9:00 AM - 8:00 PM',
      saturday: '9:00 AM - 6:00 PM',
      sunday: 'Closed',
    },
  },
  {
    id: 'dealer-6',
    name: 'Kendall Chevrolet',
    address: '13001 S Dixie Hwy',
    city: 'Pinecrest',
    state: 'FL',
    zipCode: '33156',
    phone: '(305) 235-1800',
    lat: 25.6456,
    lng: -80.3234,
    rating: 4.7,
    reviewCount: 756,
    inventory: [
      { year: 2025, make: 'Chevrolet', model: 'Trax', trim: 'LT FWD', price: 22800, isNew: true, exteriorColor: 'Cayenne Orange', interiorColor: 'Jet Black' },
      { year: 2025, make: 'Chevrolet', model: 'Trax', trim: 'RS FWD', price: 24500, isNew: true, exteriorColor: 'Mosaic Black', interiorColor: 'Jet Black' },
    ],
    hours: {
      monday: '9:00 AM - 9:00 PM',
      tuesday: '9:00 AM - 9:00 PM',
      wednesday: '9:00 AM - 9:00 PM',
      thursday: '9:00 AM - 9:00 PM',
      friday: '9:00 AM - 9:00 PM',
      saturday: '9:00 AM - 7:00 PM',
      sunday: '11:00 AM - 5:00 PM',
    },
    certifications: ['Certified Pre-Owned'],
  },
  // ============================================
  // NEW YORK - NYC Metro Area
  // ============================================
  {
    id: 'dealer-ny-1',
    name: 'Manhattan Chevrolet',
    address: '555 W 57th St',
    city: 'New York',
    state: 'NY',
    zipCode: '10019',
    phone: '(212) 586-2500',
    website: 'https://www.manhattanchevrolet.com',
    lat: 40.7686,
    lng: -73.9879,
    rating: 4.5,
    reviewCount: 1876,
    inventory: [
      { year: 2025, make: 'Chevrolet', model: 'Trax', trim: 'LS FWD', price: 23450, isNew: true, exteriorColor: 'Summit White', interiorColor: 'Jet Black' },
      { year: 2025, make: 'Chevrolet', model: 'Trax', trim: 'LT FWD', price: 25200, isNew: true, exteriorColor: 'Mosaic Black', interiorColor: 'Jet Black' },
      { year: 2025, make: 'Chevrolet', model: 'Trax', trim: 'RS FWD', price: 27100, isNew: true, exteriorColor: 'Cayenne Orange', interiorColor: 'Jet Black' },
    ],
    hours: {
      monday: '9:00 AM - 8:00 PM',
      tuesday: '9:00 AM - 8:00 PM',
      wednesday: '9:00 AM - 8:00 PM',
      thursday: '9:00 AM - 8:00 PM',
      friday: '9:00 AM - 7:00 PM',
      saturday: '9:00 AM - 6:00 PM',
      sunday: '11:00 AM - 5:00 PM',
    },
    certifications: ['Certified Pre-Owned', 'GM Dealer of Excellence'],
  },
  {
    id: 'dealer-ny-2',
    name: 'Bronx Chevrolet',
    address: '2155 Jerome Ave',
    city: 'Bronx',
    state: 'NY',
    zipCode: '10453',
    phone: '(718) 731-4000',
    lat: 40.8526,
    lng: -73.9138,
    rating: 4.3,
    reviewCount: 987,
    inventory: [
      { year: 2025, make: 'Chevrolet', model: 'Trax', trim: 'LS FWD', price: 22100, isNew: true, exteriorColor: 'Sterling Gray', interiorColor: 'Jet Black' },
      { year: 2025, make: 'Chevrolet', model: 'Trax', trim: 'ACTIV FWD', price: 25800, isNew: true, exteriorColor: 'Cacti Green', interiorColor: 'Medium Ash Gray' },
      { year: 2024, make: 'Chevrolet', model: 'Trax', trim: 'LT FWD', price: 21500, isNew: true, exteriorColor: 'Summit White', interiorColor: 'Jet Black' },
    ],
    hours: {
      monday: '9:00 AM - 9:00 PM',
      tuesday: '9:00 AM - 9:00 PM',
      wednesday: '9:00 AM - 9:00 PM',
      thursday: '9:00 AM - 9:00 PM',
      friday: '9:00 AM - 9:00 PM',
      saturday: '9:00 AM - 7:00 PM',
      sunday: '10:00 AM - 6:00 PM',
    },
  },
  {
    id: 'dealer-ny-3',
    name: 'Queens Chevrolet',
    address: '57-15 Northern Blvd',
    city: 'Woodside',
    state: 'NY',
    zipCode: '11377',
    phone: '(718) 898-1000',
    lat: 40.7566,
    lng: -73.9023,
    rating: 4.6,
    reviewCount: 1234,
    inventory: [
      { year: 2025, make: 'Chevrolet', model: 'Trax', trim: 'LT FWD', price: 23800, isNew: true, exteriorColor: 'Mosaic Black', interiorColor: 'Jet Black' },
      { year: 2025, make: 'Chevrolet', model: 'Trax', trim: 'RS FWD', price: 26200, isNew: true, exteriorColor: 'Nitro Yellow', interiorColor: 'Jet Black' },
    ],
    hours: {
      monday: '9:00 AM - 9:00 PM',
      tuesday: '9:00 AM - 9:00 PM',
      wednesday: '9:00 AM - 9:00 PM',
      thursday: '9:00 AM - 9:00 PM',
      friday: '9:00 AM - 9:00 PM',
      saturday: '9:00 AM - 8:00 PM',
      sunday: '10:00 AM - 6:00 PM',
    },
    certifications: ['Mark of Excellence'],
  },
  {
    id: 'dealer-ny-4',
    name: 'Brooklyn Chevrolet',
    address: '1800 Shore Pkwy',
    city: 'Brooklyn',
    state: 'NY',
    zipCode: '11214',
    phone: '(718) 232-7000',
    lat: 40.5936,
    lng: -74.0014,
    rating: 4.4,
    reviewCount: 876,
    inventory: [
      { year: 2025, make: 'Chevrolet', model: 'Trax', trim: 'LS FWD', price: 21950, isNew: true, exteriorColor: 'Summit White', interiorColor: 'Jet Black' },
      { year: 2025, make: 'Chevrolet', model: 'Trax', trim: 'LT FWD', price: 24100, isNew: true, exteriorColor: 'Sterling Gray', interiorColor: 'Jet Black' },
      { year: 2024, make: 'Chevrolet', model: 'Trax', trim: 'RS FWD', price: 24800, isNew: true, exteriorColor: 'Cayenne Orange', interiorColor: 'Jet Black' },
      { year: 2023, make: 'Chevrolet', model: 'Trax', trim: 'LT FWD', price: 18200, mileage: 15600, isNew: false, exteriorColor: 'Mosaic Black', interiorColor: 'Jet Black' },
    ],
    hours: {
      monday: '9:00 AM - 9:00 PM',
      tuesday: '9:00 AM - 9:00 PM',
      wednesday: '9:00 AM - 9:00 PM',
      thursday: '9:00 AM - 9:00 PM',
      friday: '9:00 AM - 9:00 PM',
      saturday: '9:00 AM - 8:00 PM',
      sunday: '10:00 AM - 7:00 PM',
    },
    certifications: ['Certified Pre-Owned'],
  },
  {
    id: 'dealer-ny-5',
    name: 'Staten Island Chevrolet',
    address: '1591 Hylan Blvd',
    city: 'Staten Island',
    state: 'NY',
    zipCode: '10305',
    phone: '(718) 979-0033',
    lat: 40.5885,
    lng: -74.0869,
    rating: 4.2,
    reviewCount: 543,
    inventory: [
      { year: 2025, make: 'Chevrolet', model: 'Trax', trim: 'LS FWD', price: 21600, isNew: true, exteriorColor: 'Summit White', interiorColor: 'Jet Black' },
      { year: 2025, make: 'Chevrolet', model: 'Trax', trim: 'ACTIV AWD', price: 27500, isNew: true, exteriorColor: 'Cacti Green', interiorColor: 'Medium Ash Gray' },
    ],
    hours: {
      monday: '9:00 AM - 8:00 PM',
      tuesday: '9:00 AM - 8:00 PM',
      wednesday: '9:00 AM - 8:00 PM',
      thursday: '9:00 AM - 8:00 PM',
      friday: '9:00 AM - 8:00 PM',
      saturday: '9:00 AM - 6:00 PM',
      sunday: '11:00 AM - 5:00 PM',
    },
  },
  // ============================================
  // ILLINOIS - Chicago Area
  // ============================================
  {
    id: 'dealer-il-1',
    name: 'Chicago Chevrolet Downtown',
    address: '1845 N Clybourn Ave',
    city: 'Chicago',
    state: 'IL',
    zipCode: '60614',
    phone: '(312) 266-5000',
    website: 'https://www.chicagochevrolet.com',
    lat: 41.9139,
    lng: -87.6515,
    rating: 4.7,
    reviewCount: 2134,
    inventory: [
      { year: 2025, make: 'Chevrolet', model: 'Trax', trim: 'LS FWD', price: 21895, isNew: true, exteriorColor: 'Summit White', interiorColor: 'Jet Black' },
      { year: 2025, make: 'Chevrolet', model: 'Trax', trim: 'LT FWD', price: 23650, isNew: true, exteriorColor: 'Mosaic Black', interiorColor: 'Jet Black' },
      { year: 2025, make: 'Chevrolet', model: 'Trax', trim: 'RS FWD', price: 25400, isNew: true, exteriorColor: 'Cayenne Orange', interiorColor: 'Jet Black' },
      { year: 2025, make: 'Chevrolet', model: 'Trax', trim: 'ACTIV AWD', price: 27200, isNew: true, exteriorColor: 'Cacti Green', interiorColor: 'Medium Ash Gray' },
    ],
    hours: {
      monday: '9:00 AM - 9:00 PM',
      tuesday: '9:00 AM - 9:00 PM',
      wednesday: '9:00 AM - 9:00 PM',
      thursday: '9:00 AM - 9:00 PM',
      friday: '9:00 AM - 9:00 PM',
      saturday: '9:00 AM - 7:00 PM',
      sunday: '10:00 AM - 6:00 PM',
    },
    certifications: ['Certified Pre-Owned', 'GM Dealer of Excellence', 'Mark of Excellence'],
  },
  {
    id: 'dealer-il-2',
    name: 'Naperville Chevrolet',
    address: '1515 W Ogden Ave',
    city: 'Naperville',
    state: 'IL',
    zipCode: '60540',
    phone: '(630) 355-2000',
    lat: 41.7753,
    lng: -88.1634,
    rating: 4.8,
    reviewCount: 1567,
    inventory: [
      { year: 2025, make: 'Chevrolet', model: 'Trax', trim: 'LS FWD', price: 21450, isNew: true, exteriorColor: 'Sterling Gray', interiorColor: 'Jet Black' },
      { year: 2025, make: 'Chevrolet', model: 'Trax', trim: 'LT FWD', price: 23200, isNew: true, exteriorColor: 'Summit White', interiorColor: 'Jet Black' },
      { year: 2025, make: 'Chevrolet', model: 'Trax', trim: 'RS FWD', price: 24900, isNew: true, exteriorColor: 'Nitro Yellow', interiorColor: 'Jet Black' },
    ],
    hours: {
      monday: '9:00 AM - 9:00 PM',
      tuesday: '9:00 AM - 9:00 PM',
      wednesday: '9:00 AM - 9:00 PM',
      thursday: '9:00 AM - 9:00 PM',
      friday: '9:00 AM - 9:00 PM',
      saturday: '9:00 AM - 6:00 PM',
      sunday: '11:00 AM - 5:00 PM',
    },
    certifications: ['Certified Pre-Owned', 'Mark of Excellence'],
  },
  {
    id: 'dealer-il-3',
    name: 'Schaumburg Chevrolet',
    address: '1100 E Golf Rd',
    city: 'Schaumburg',
    state: 'IL',
    zipCode: '60173',
    phone: '(847) 882-5000',
    lat: 42.0342,
    lng: -88.0284,
    rating: 4.5,
    reviewCount: 1234,
    inventory: [
      { year: 2025, make: 'Chevrolet', model: 'Trax', trim: 'LT FWD', price: 22800, isNew: true, exteriorColor: 'Mosaic Black', interiorColor: 'Jet Black' },
      { year: 2025, make: 'Chevrolet', model: 'Trax', trim: 'ACTIV FWD', price: 25100, isNew: true, exteriorColor: 'Cacti Green', interiorColor: 'Medium Ash Gray' },
      { year: 2024, make: 'Chevrolet', model: 'Trax', trim: 'LS FWD', price: 20900, isNew: true, exteriorColor: 'Summit White', interiorColor: 'Jet Black' },
    ],
    hours: {
      monday: '9:00 AM - 9:00 PM',
      tuesday: '9:00 AM - 9:00 PM',
      wednesday: '9:00 AM - 9:00 PM',
      thursday: '9:00 AM - 9:00 PM',
      friday: '9:00 AM - 9:00 PM',
      saturday: '9:00 AM - 7:00 PM',
      sunday: '10:00 AM - 5:00 PM',
    },
  },
  {
    id: 'dealer-il-4',
    name: 'Oak Lawn Chevrolet',
    address: '4343 W 95th St',
    city: 'Oak Lawn',
    state: 'IL',
    zipCode: '60453',
    phone: '(708) 422-1000',
    lat: 41.7206,
    lng: -87.7528,
    rating: 4.4,
    reviewCount: 876,
    inventory: [
      { year: 2025, make: 'Chevrolet', model: 'Trax', trim: 'LS FWD', price: 21200, isNew: true, exteriorColor: 'Summit White', interiorColor: 'Jet Black' },
      { year: 2025, make: 'Chevrolet', model: 'Trax', trim: 'LT FWD', price: 23100, isNew: true, exteriorColor: 'Sterling Gray', interiorColor: 'Jet Black' },
      { year: 2023, make: 'Chevrolet', model: 'Trax', trim: 'LT FWD', price: 17500, mileage: 22000, isNew: false, exteriorColor: 'Mosaic Black', interiorColor: 'Jet Black' },
    ],
    hours: {
      monday: '9:00 AM - 9:00 PM',
      tuesday: '9:00 AM - 9:00 PM',
      wednesday: '9:00 AM - 9:00 PM',
      thursday: '9:00 AM - 9:00 PM',
      friday: '9:00 AM - 9:00 PM',
      saturday: '9:00 AM - 6:00 PM',
      sunday: 'Closed',
    },
    certifications: ['Certified Pre-Owned'],
  },
  {
    id: 'dealer-il-5',
    name: 'Evanston Chevrolet',
    address: '1025 Chicago Ave',
    city: 'Evanston',
    state: 'IL',
    zipCode: '60202',
    phone: '(847) 864-5000',
    lat: 42.0451,
    lng: -87.6877,
    rating: 4.6,
    reviewCount: 654,
    inventory: [
      { year: 2025, make: 'Chevrolet', model: 'Trax', trim: 'RS FWD', price: 25600, isNew: true, exteriorColor: 'Cayenne Orange', interiorColor: 'Jet Black' },
      { year: 2025, make: 'Chevrolet', model: 'Trax', trim: 'ACTIV AWD', price: 27800, isNew: true, exteriorColor: 'Cacti Green', interiorColor: 'Medium Ash Gray' },
    ],
    hours: {
      monday: '9:00 AM - 8:00 PM',
      tuesday: '9:00 AM - 8:00 PM',
      wednesday: '9:00 AM - 8:00 PM',
      thursday: '9:00 AM - 8:00 PM',
      friday: '9:00 AM - 8:00 PM',
      saturday: '9:00 AM - 6:00 PM',
      sunday: '11:00 AM - 5:00 PM',
    },
  },
  // ============================================
  // TENNESSEE - Nashville & Memphis Area
  // ============================================
  {
    id: 'dealer-tn-1',
    name: 'Nashville Chevrolet',
    address: '2700 Lebanon Pike',
    city: 'Nashville',
    state: 'TN',
    zipCode: '37214',
    phone: '(615) 889-4000',
    website: 'https://www.nashvillechevrolet.com',
    lat: 36.1756,
    lng: -86.6922,
    rating: 4.7,
    reviewCount: 1456,
    inventory: [
      { year: 2025, make: 'Chevrolet', model: 'Trax', trim: 'LS FWD', price: 21200, isNew: true, exteriorColor: 'Summit White', interiorColor: 'Jet Black' },
      { year: 2025, make: 'Chevrolet', model: 'Trax', trim: 'LT FWD', price: 22900, isNew: true, exteriorColor: 'Mosaic Black', interiorColor: 'Jet Black' },
      { year: 2025, make: 'Chevrolet', model: 'Trax', trim: 'RS FWD', price: 24600, isNew: true, exteriorColor: 'Cayenne Orange', interiorColor: 'Jet Black' },
      { year: 2025, make: 'Chevrolet', model: 'Trax', trim: 'ACTIV AWD', price: 26800, isNew: true, exteriorColor: 'Cacti Green', interiorColor: 'Medium Ash Gray' },
    ],
    hours: {
      monday: '9:00 AM - 8:00 PM',
      tuesday: '9:00 AM - 8:00 PM',
      wednesday: '9:00 AM - 8:00 PM',
      thursday: '9:00 AM - 8:00 PM',
      friday: '9:00 AM - 8:00 PM',
      saturday: '9:00 AM - 7:00 PM',
      sunday: '12:00 PM - 6:00 PM',
    },
    certifications: ['Certified Pre-Owned', 'GM Dealer of Excellence'],
  },
  {
    id: 'dealer-tn-2',
    name: 'Franklin Chevrolet',
    address: '1750 Mallory Ln',
    city: 'Franklin',
    state: 'TN',
    zipCode: '37067',
    phone: '(615) 771-5000',
    lat: 35.9251,
    lng: -86.8286,
    rating: 4.8,
    reviewCount: 987,
    inventory: [
      { year: 2025, make: 'Chevrolet', model: 'Trax', trim: 'LT FWD', price: 22600, isNew: true, exteriorColor: 'Sterling Gray', interiorColor: 'Jet Black' },
      { year: 2025, make: 'Chevrolet', model: 'Trax', trim: 'RS FWD', price: 24200, isNew: true, exteriorColor: 'Nitro Yellow', interiorColor: 'Jet Black' },
      { year: 2025, make: 'Chevrolet', model: 'Trax', trim: 'ACTIV FWD', price: 25400, isNew: true, exteriorColor: 'Cacti Green', interiorColor: 'Medium Ash Gray' },
    ],
    hours: {
      monday: '9:00 AM - 8:00 PM',
      tuesday: '9:00 AM - 8:00 PM',
      wednesday: '9:00 AM - 8:00 PM',
      thursday: '9:00 AM - 8:00 PM',
      friday: '9:00 AM - 8:00 PM',
      saturday: '9:00 AM - 6:00 PM',
      sunday: '12:00 PM - 5:00 PM',
    },
    certifications: ['Certified Pre-Owned', 'Mark of Excellence'],
  },
  {
    id: 'dealer-tn-3',
    name: 'Murfreesboro Chevrolet',
    address: '2525 Medical Center Pkwy',
    city: 'Murfreesboro',
    state: 'TN',
    zipCode: '37129',
    phone: '(615) 893-5000',
    lat: 35.8456,
    lng: -86.3903,
    rating: 4.5,
    reviewCount: 765,
    inventory: [
      { year: 2025, make: 'Chevrolet', model: 'Trax', trim: 'LS FWD', price: 20900, isNew: true, exteriorColor: 'Summit White', interiorColor: 'Jet Black' },
      { year: 2025, make: 'Chevrolet', model: 'Trax', trim: 'LT FWD', price: 22400, isNew: true, exteriorColor: 'Mosaic Black', interiorColor: 'Jet Black' },
      { year: 2024, make: 'Chevrolet', model: 'Trax', trim: 'RS FWD', price: 23800, isNew: true, exteriorColor: 'Cayenne Orange', interiorColor: 'Jet Black' },
    ],
    hours: {
      monday: '9:00 AM - 8:00 PM',
      tuesday: '9:00 AM - 8:00 PM',
      wednesday: '9:00 AM - 8:00 PM',
      thursday: '9:00 AM - 8:00 PM',
      friday: '9:00 AM - 8:00 PM',
      saturday: '9:00 AM - 6:00 PM',
      sunday: 'Closed',
    },
  },
  {
    id: 'dealer-tn-4',
    name: 'Memphis Chevrolet',
    address: '2989 Covington Pike',
    city: 'Memphis',
    state: 'TN',
    zipCode: '38128',
    phone: '(901) 372-4000',
    website: 'https://www.memphischevrolet.com',
    lat: 35.2076,
    lng: -89.9253,
    rating: 4.4,
    reviewCount: 1123,
    inventory: [
      { year: 2025, make: 'Chevrolet', model: 'Trax', trim: 'LS FWD', price: 20800, isNew: true, exteriorColor: 'Summit White', interiorColor: 'Jet Black' },
      { year: 2025, make: 'Chevrolet', model: 'Trax', trim: 'LT FWD', price: 22500, isNew: true, exteriorColor: 'Sterling Gray', interiorColor: 'Jet Black' },
      { year: 2025, make: 'Chevrolet', model: 'Trax', trim: 'RS FWD', price: 24100, isNew: true, exteriorColor: 'Mosaic Black', interiorColor: 'Jet Black' },
      { year: 2023, make: 'Chevrolet', model: 'Trax', trim: 'LT FWD', price: 16900, mileage: 28500, isNew: false, exteriorColor: 'Summit White', interiorColor: 'Jet Black' },
    ],
    hours: {
      monday: '8:30 AM - 8:00 PM',
      tuesday: '8:30 AM - 8:00 PM',
      wednesday: '8:30 AM - 8:00 PM',
      thursday: '8:30 AM - 8:00 PM',
      friday: '8:30 AM - 8:00 PM',
      saturday: '9:00 AM - 6:00 PM',
      sunday: 'Closed',
    },
    certifications: ['Certified Pre-Owned'],
  },
  {
    id: 'dealer-tn-5',
    name: 'Knoxville Chevrolet',
    address: '8729 Kingston Pike',
    city: 'Knoxville',
    state: 'TN',
    zipCode: '37923',
    phone: '(865) 693-4000',
    lat: 35.9295,
    lng: -84.0789,
    rating: 4.6,
    reviewCount: 876,
    inventory: [
      { year: 2025, make: 'Chevrolet', model: 'Trax', trim: 'LS FWD', price: 21100, isNew: true, exteriorColor: 'Summit White', interiorColor: 'Jet Black' },
      { year: 2025, make: 'Chevrolet', model: 'Trax', trim: 'LT FWD', price: 22800, isNew: true, exteriorColor: 'Nitro Yellow', interiorColor: 'Jet Black' },
      { year: 2025, make: 'Chevrolet', model: 'Trax', trim: 'ACTIV AWD', price: 26500, isNew: true, exteriorColor: 'Cacti Green', interiorColor: 'Medium Ash Gray' },
    ],
    hours: {
      monday: '9:00 AM - 8:00 PM',
      tuesday: '9:00 AM - 8:00 PM',
      wednesday: '9:00 AM - 8:00 PM',
      thursday: '9:00 AM - 8:00 PM',
      friday: '9:00 AM - 8:00 PM',
      saturday: '9:00 AM - 6:00 PM',
      sunday: '12:00 PM - 5:00 PM',
    },
    certifications: ['GM Dealer of Excellence'],
  },
  {
    id: 'dealer-tn-6',
    name: 'Chattanooga Chevrolet',
    address: '2121 Chapman Rd',
    city: 'Chattanooga',
    state: 'TN',
    zipCode: '37421',
    phone: '(423) 894-5000',
    lat: 35.0206,
    lng: -85.1572,
    rating: 4.3,
    reviewCount: 654,
    inventory: [
      { year: 2025, make: 'Chevrolet', model: 'Trax', trim: 'LT FWD', price: 22200, isNew: true, exteriorColor: 'Mosaic Black', interiorColor: 'Jet Black' },
      { year: 2025, make: 'Chevrolet', model: 'Trax', trim: 'RS FWD', price: 24400, isNew: true, exteriorColor: 'Cayenne Orange', interiorColor: 'Jet Black' },
    ],
    hours: {
      monday: '9:00 AM - 7:00 PM',
      tuesday: '9:00 AM - 7:00 PM',
      wednesday: '9:00 AM - 7:00 PM',
      thursday: '9:00 AM - 7:00 PM',
      friday: '9:00 AM - 7:00 PM',
      saturday: '9:00 AM - 5:00 PM',
      sunday: 'Closed',
    },
  },
  // ============================================
  // WASHINGTON - Seattle Area
  // ============================================
  {
    id: 'dealer-wa-1',
    name: 'Seattle Chevrolet',
    address: '1425 Aurora Ave N',
    city: 'Seattle',
    state: 'WA',
    zipCode: '98109',
    phone: '(206) 284-4000',
    website: 'https://www.seattlechevrolet.com',
    lat: 47.6318,
    lng: -122.3467,
    rating: 4.6,
    reviewCount: 1654,
    inventory: [
      { year: 2025, make: 'Chevrolet', model: 'Trax', trim: 'LS FWD', price: 22100, isNew: true, exteriorColor: 'Summit White', interiorColor: 'Jet Black' },
      { year: 2025, make: 'Chevrolet', model: 'Trax', trim: 'LT FWD', price: 23800, isNew: true, exteriorColor: 'Mosaic Black', interiorColor: 'Jet Black' },
      { year: 2025, make: 'Chevrolet', model: 'Trax', trim: 'RS FWD', price: 25500, isNew: true, exteriorColor: 'Cayenne Orange', interiorColor: 'Jet Black' },
      { year: 2025, make: 'Chevrolet', model: 'Trax', trim: 'ACTIV AWD', price: 27400, isNew: true, exteriorColor: 'Cacti Green', interiorColor: 'Medium Ash Gray' },
    ],
    hours: {
      monday: '9:00 AM - 8:00 PM',
      tuesday: '9:00 AM - 8:00 PM',
      wednesday: '9:00 AM - 8:00 PM',
      thursday: '9:00 AM - 8:00 PM',
      friday: '9:00 AM - 8:00 PM',
      saturday: '9:00 AM - 7:00 PM',
      sunday: '10:00 AM - 6:00 PM',
    },
    certifications: ['Certified Pre-Owned', 'GM Dealer of Excellence'],
  },
  {
    id: 'dealer-wa-2',
    name: 'Bellevue Chevrolet',
    address: '13424 NE 20th St',
    city: 'Bellevue',
    state: 'WA',
    zipCode: '98005',
    phone: '(425) 641-3000',
    website: 'https://www.bellevuechevrolet.com',
    lat: 47.6253,
    lng: -122.1417,
    rating: 4.8,
    reviewCount: 1234,
    inventory: [
      { year: 2025, make: 'Chevrolet', model: 'Trax', trim: 'LT FWD', price: 23500, isNew: true, exteriorColor: 'Sterling Gray', interiorColor: 'Jet Black' },
      { year: 2025, make: 'Chevrolet', model: 'Trax', trim: 'RS FWD', price: 25200, isNew: true, exteriorColor: 'Nitro Yellow', interiorColor: 'Jet Black' },
      { year: 2025, make: 'Chevrolet', model: 'Trax', trim: 'ACTIV AWD', price: 27100, isNew: true, exteriorColor: 'Cacti Green', interiorColor: 'Medium Ash Gray' },
    ],
    hours: {
      monday: '9:00 AM - 8:00 PM',
      tuesday: '9:00 AM - 8:00 PM',
      wednesday: '9:00 AM - 8:00 PM',
      thursday: '9:00 AM - 8:00 PM',
      friday: '9:00 AM - 8:00 PM',
      saturday: '9:00 AM - 6:00 PM',
      sunday: '11:00 AM - 5:00 PM',
    },
    certifications: ['Certified Pre-Owned', 'Mark of Excellence'],
  },
  {
    id: 'dealer-wa-3',
    name: 'Tacoma Chevrolet',
    address: '8302 S Tacoma Way',
    city: 'Tacoma',
    state: 'WA',
    zipCode: '98499',
    phone: '(253) 584-5000',
    lat: 47.1853,
    lng: -122.4673,
    rating: 4.5,
    reviewCount: 987,
    inventory: [
      { year: 2025, make: 'Chevrolet', model: 'Trax', trim: 'LS FWD', price: 21600, isNew: true, exteriorColor: 'Summit White', interiorColor: 'Jet Black' },
      { year: 2025, make: 'Chevrolet', model: 'Trax', trim: 'LT FWD', price: 23200, isNew: true, exteriorColor: 'Mosaic Black', interiorColor: 'Jet Black' },
      { year: 2024, make: 'Chevrolet', model: 'Trax', trim: 'RS FWD', price: 24100, isNew: true, exteriorColor: 'Cayenne Orange', interiorColor: 'Jet Black' },
      { year: 2023, make: 'Chevrolet', model: 'Trax', trim: 'LT FWD', price: 17800, mileage: 19500, isNew: false, exteriorColor: 'Sterling Gray', interiorColor: 'Jet Black' },
    ],
    hours: {
      monday: '9:00 AM - 8:00 PM',
      tuesday: '9:00 AM - 8:00 PM',
      wednesday: '9:00 AM - 8:00 PM',
      thursday: '9:00 AM - 8:00 PM',
      friday: '9:00 AM - 8:00 PM',
      saturday: '9:00 AM - 7:00 PM',
      sunday: '10:00 AM - 6:00 PM',
    },
  },
  {
    id: 'dealer-wa-4',
    name: 'Renton Chevrolet',
    address: '101 SW Grady Way',
    city: 'Renton',
    state: 'WA',
    zipCode: '98057',
    phone: '(425) 226-3000',
    lat: 47.4799,
    lng: -122.2118,
    rating: 4.4,
    reviewCount: 765,
    inventory: [
      { year: 2025, make: 'Chevrolet', model: 'Trax', trim: 'LS FWD', price: 21400, isNew: true, exteriorColor: 'Summit White', interiorColor: 'Jet Black' },
      { year: 2025, make: 'Chevrolet', model: 'Trax', trim: 'ACTIV FWD', price: 25600, isNew: true, exteriorColor: 'Cacti Green', interiorColor: 'Medium Ash Gray' },
    ],
    hours: {
      monday: '9:00 AM - 8:00 PM',
      tuesday: '9:00 AM - 8:00 PM',
      wednesday: '9:00 AM - 8:00 PM',
      thursday: '9:00 AM - 8:00 PM',
      friday: '9:00 AM - 8:00 PM',
      saturday: '9:00 AM - 6:00 PM',
      sunday: '11:00 AM - 5:00 PM',
    },
    certifications: ['Certified Pre-Owned'],
  },
  {
    id: 'dealer-wa-5',
    name: 'Everett Chevrolet',
    address: '7301 Evergreen Way',
    city: 'Everett',
    state: 'WA',
    zipCode: '98203',
    phone: '(425) 353-5000',
    lat: 47.9445,
    lng: -122.2178,
    rating: 4.3,
    reviewCount: 654,
    inventory: [
      { year: 2025, make: 'Chevrolet', model: 'Trax', trim: 'LT FWD', price: 22900, isNew: true, exteriorColor: 'Mosaic Black', interiorColor: 'Jet Black' },
      { year: 2025, make: 'Chevrolet', model: 'Trax', trim: 'RS FWD', price: 24800, isNew: true, exteriorColor: 'Nitro Yellow', interiorColor: 'Jet Black' },
      { year: 2025, make: 'Chevrolet', model: 'Trax', trim: 'ACTIV AWD', price: 26900, isNew: true, exteriorColor: 'Cacti Green', interiorColor: 'Medium Ash Gray' },
    ],
    hours: {
      monday: '9:00 AM - 7:00 PM',
      tuesday: '9:00 AM - 7:00 PM',
      wednesday: '9:00 AM - 7:00 PM',
      thursday: '9:00 AM - 7:00 PM',
      friday: '9:00 AM - 7:00 PM',
      saturday: '9:00 AM - 6:00 PM',
      sunday: '11:00 AM - 5:00 PM',
    },
  },
  {
    id: 'dealer-wa-6',
    name: 'Kirkland Chevrolet',
    address: '12345 NE 124th St',
    city: 'Kirkland',
    state: 'WA',
    zipCode: '98034',
    phone: '(425) 823-4000',
    lat: 47.7154,
    lng: -122.1802,
    rating: 4.7,
    reviewCount: 543,
    inventory: [
      { year: 2025, make: 'Chevrolet', model: 'Trax', trim: 'LS FWD', price: 21800, isNew: true, exteriorColor: 'Sterling Gray', interiorColor: 'Jet Black' },
      { year: 2025, make: 'Chevrolet', model: 'Trax', trim: 'LT FWD', price: 23400, isNew: true, exteriorColor: 'Summit White', interiorColor: 'Jet Black' },
    ],
    hours: {
      monday: '9:00 AM - 8:00 PM',
      tuesday: '9:00 AM - 8:00 PM',
      wednesday: '9:00 AM - 8:00 PM',
      thursday: '9:00 AM - 8:00 PM',
      friday: '9:00 AM - 8:00 PM',
      saturday: '9:00 AM - 6:00 PM',
      sunday: '11:00 AM - 5:00 PM',
    },
    certifications: ['GM Dealer of Excellence'],
  },
];

/**
 * Calculate distance between two coordinates using Haversine formula
 */
function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 3959; // Earth's radius in miles
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 10) / 10; // Round to 1 decimal
}

function toRad(deg: number): number {
  return deg * (Math.PI / 180);
}

/**
 * Calculate deal score for a dealer
 * Score = (PriceScore * 0.4) + (DistanceScore * 0.3) + (RatingScore * 0.2) + (InventoryBonus * 0.1)
 */
function calculateDealScore(
  dealer: Dealer,
  allDealers: Dealer[],
  _msrp: number
): DealScore {
  // Get all prices and distances for normalization
  const allPrices = allDealers.flatMap(d => d.inventory.map(i => i.price));
  const allDistances = allDealers.map(d => d.distance || 0).filter(d => d > 0);
  
  const minPrice = Math.min(...allPrices);
  const maxPrice = Math.max(...allPrices);
  const maxDistance = Math.max(...allDistances, 50); // Cap at 50 miles
  
  // Price Score (0-100, lower price = higher score)
  const lowestDealerPrice = Math.min(...dealer.inventory.map(i => i.price));
  const priceScore = maxPrice === minPrice 
    ? 100 
    : 100 - ((lowestDealerPrice - minPrice) / (maxPrice - minPrice)) * 100;
  
  // Distance Score (0-100, closer = higher score)
  const distance = dealer.distance || 0;
  const distanceScore = Math.max(0, 100 - (distance / maxDistance) * 100);
  
  // Rating Score (0-100, higher rating = higher score)
  const ratingScore = (dealer.rating / 5) * 100;
  
  // Inventory Bonus (0-10, more inventory = higher bonus)
  const inventoryBonus = Math.min(dealer.inventory.length * 3, 10);
  
  // Calculate total score
  const total = 
    priceScore * 0.4 + 
    distanceScore * 0.3 + 
    ratingScore * 0.2 + 
    inventoryBonus;
  
  return {
    total: Math.round(total * 10) / 10,
    priceScore: Math.round(priceScore * 10) / 10,
    distanceScore: Math.round(distanceScore * 10) / 10,
    ratingScore: Math.round(ratingScore * 10) / 10,
    inventoryBonus: Math.round(inventoryBonus * 10) / 10,
    isBestDeal: false, // Will be set after comparing all dealers
  };
}

/**
 * Generate a random price variation around MSRP
 * Dealers typically price -5% to +3% of MSRP for new cars
 */
function generatePrice(msrp: number, isNew: boolean, seed: number): number {
  // Use seed for consistent pricing per dealer
  const random = Math.sin(seed) * 10000;
  const normalizedRandom = random - Math.floor(random);
  
  if (isNew) {
    // New cars: -5% to +3% of MSRP
    const variation = (normalizedRandom * 0.08) - 0.05;
    return Math.round(msrp * (1 + variation));
  } else {
    // Used cars: 15-35% below original MSRP
    const discount = 0.15 + (normalizedRandom * 0.20);
    return Math.round(msrp * (1 - discount));
  }
}

/**
 * Generate inventory items for a specific vehicle
 */
function generateInventory(
  make: string,
  model: string,
  year: number,
  priceMin: number,
  priceMax: number,
  dealerSeed: number,
  count: number
): VehicleInventoryItem[] {
  const trims = trimLevelsByMake[make] || ['Base', 'Standard', 'Premium', 'Limited'];
  const inventory: VehicleInventoryItem[] = [];
  
  // Calculate price step between trims
  const priceRange = priceMax - priceMin;
  const priceStep = priceRange / Math.max(trims.length - 1, 1);
  
  for (let i = 0; i < count; i++) {
    const seed = dealerSeed + i * 1000;
    const random = Math.abs(Math.sin(seed) * 10000);
    const normalizedRandom = random - Math.floor(random);
    
    // Determine if new or used (80% new, 20% used)
    const isNew = normalizedRandom > 0.2;
    
    // Pick a trim level
    const trimIndex = Math.floor((Math.sin(seed + 1) * 10000 % trims.length + trims.length) % trims.length);
    const trim = trims[trimIndex];
    
    // Calculate base price for this trim
    const trimBasePrice = priceMin + (priceStep * trimIndex);
    
    // Generate final price with variation
    const price = generatePrice(trimBasePrice, isNew, seed + 2);
    
    // Pick colors
    const colorSeed = Math.abs(Math.sin(seed + 3) * 10000);
    const exteriorIndex = Math.floor(colorSeed % exteriorColors.length);
    const interiorIndex = Math.floor((colorSeed / 10) % interiorColors.length);
    
    // Generate year (current year or previous for new, older for used)
    const vehicleYear = isNew 
      ? (normalizedRandom > 0.5 ? year : year - 1)
      : year - Math.floor(normalizedRandom * 3 + 1);
    
    // Generate mileage for used cars
    const mileage = isNew ? undefined : Math.round(5000 + (normalizedRandom * 45000));
    
    inventory.push({
      year: vehicleYear,
      make,
      model,
      trim,
      price,
      mileage,
      isNew,
      exteriorColor: exteriorColors[exteriorIndex],
      interiorColor: interiorColors[interiorIndex],
    });
  }
  
  return inventory;
}

/**
 * Generate a dealer name based on make and city
 */
function generateDealerName(make: string, city: string, index: number): string {
  const templates = dealerNamesByMake[make] || ['{city} Auto', 'AutoNation {city}', '{city} Motors'];
  const template = templates[index % templates.length];
  return template.replace('{city}', city);
}

/**
 * Get dealers with inventory for a specific vehicle
 * Generates dynamic inventory based on vehicle make/model/price
 */
export function getDealersForVehicle(
  make: string,
  model: string,
  userLat: number = 25.7617, // Default to Miami
  userLng: number = -80.1918,
  msrp: number = 21895,
  maxDistanceMiles: number = 100, // Maximum search radius in miles
  priceMin?: number,
  priceMax?: number
): DealerWithScore[] {
  // Use provided price range or calculate from MSRP
  const minPrice = priceMin || msrp;
  const maxPrice = priceMax || Math.round(msrp * 1.3);
  const currentYear = new Date().getFullYear();
  
  // Get base dealer locations and update with dynamic inventory
  const dealersWithDynamicInventory = mockDealers.map((dealer, index) => {
    // Generate a seed based on dealer ID for consistent results
    const dealerSeed = dealer.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    
    // Generate inventory count (2-6 items per dealer)
    const inventoryCount = 2 + Math.floor(Math.abs(Math.sin(dealerSeed) * 5));
    
    // Generate dynamic inventory for this vehicle
    const dynamicInventory = generateInventory(
      make,
      model,
      currentYear,
      minPrice,
      maxPrice,
      dealerSeed,
      inventoryCount
    );
    
    // Generate dealer name based on make
    const dynamicName = generateDealerName(make, dealer.city, index);
    
    return {
      ...dealer,
      name: dynamicName,
      inventory: dynamicInventory,
    };
  });
  
  // Calculate distances and filter by max distance
  const dealersWithDistance = dealersWithDynamicInventory
    .map(dealer => ({
      ...dealer,
      distance: calculateDistance(userLat, userLng, dealer.lat, dealer.lng),
    }))
    .filter(dealer => dealer.distance <= maxDistanceMiles);
  
  // Calculate deal scores
  const dealersWithScores: DealerWithScore[] = dealersWithDistance.map(dealer => {
    const prices = dealer.inventory.map(i => i.price);
    return {
      ...dealer,
      dealScore: calculateDealScore(dealer, dealersWithDistance, msrp),
      lowestPrice: Math.min(...prices),
      highestPrice: Math.max(...prices),
      inventoryCount: dealer.inventory.length,
    };
  });
  
  // Find best deal and mark it
  const sortedByScore = [...dealersWithScores].sort((a, b) => b.dealScore.total - a.dealScore.total);
  if (sortedByScore.length > 0) {
    sortedByScore[0].dealScore.isBestDeal = true;
  }
  
  return dealersWithScores;
}

/**
 * Sort dealers by specified criteria
 */
export function sortDealers(
  dealers: DealerWithScore[],
  sortBy: SortOption
): DealerWithScore[] {
  const sorted = [...dealers];
  
  switch (sortBy) {
    case 'bestDeal':
      return sorted.sort((a, b) => b.dealScore.total - a.dealScore.total);
    case 'distance':
      return sorted.sort((a, b) => (a.distance || 0) - (b.distance || 0));
    case 'price':
      return sorted.sort((a, b) => a.lowestPrice - b.lowestPrice);
    case 'rating':
      return sorted.sort((a, b) => b.rating - a.rating);
    default:
      return sorted;
  }
}

/**
 * Get a single dealer by ID
 */
export function getDealerById(id: string): Dealer | undefined {
  return mockDealers.find(d => d.id === id);
}

/**
 * Format price as currency
 */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(price);
}

/**
 * Format distance with unit
 */
export function formatDistance(miles: number): string {
  if (miles < 1) {
    return `${Math.round(miles * 10) / 10} mi`;
  }
  return `${Math.round(miles * 10) / 10} mi`;
}

/**
 * Get price range string
 */
export function getPriceRange(lowestPrice: number, highestPrice: number): string {
  if (lowestPrice === highestPrice) {
    return formatPrice(lowestPrice);
  }
  return `${formatPrice(lowestPrice)} - ${formatPrice(highestPrice)}`;
}

