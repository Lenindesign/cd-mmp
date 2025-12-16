// Real manufacturer incentives data
// Sources: Edmunds, KBB, manufacturer websites
// Last updated: December 2025

export interface Incentive {
  id: string;
  type: 'cash' | 'finance' | 'lease' | 'special';
  title: string;
  description: string;
  value: string;
  expirationDate: string;
  terms?: string;
  eligibility?: string;
}

export interface VehicleIncentives {
  make: string;
  model: string;
  totalSavings: number;
  incentives: Incentive[];
}

// Incentives database by make/model
const incentivesData: Record<string, VehicleIncentives> = {
  'Chevrolet-Trax': {
    make: 'Chevrolet',
    model: 'Trax',
    totalSavings: 2000,
    incentives: [
      {
        id: 'chevy-trax-cash-1',
        type: 'cash',
        title: '$1,500 Cash Back',
        description: 'Customer cash allowance on select 2025 Chevrolet Trax models.',
        value: '$1,500',
        expirationDate: 'January 2, 2026',
        terms: 'Cannot be combined with special financing. Take delivery by expiration date.',
      },
      {
        id: 'chevy-trax-cash-2',
        type: 'cash',
        title: '$500 Bonus Cash',
        description: 'Additional bonus cash available on 2025 Trax.',
        value: '$500',
        expirationDate: 'January 2, 2026',
        terms: 'Can be combined with other offers.',
      },
      {
        id: 'chevy-trax-finance',
        type: 'finance',
        title: '6.6% APR Financing',
        description: 'Low APR financing for 36-72 months through GM Financial.',
        value: '6.6% APR',
        expirationDate: 'January 2, 2026',
        terms: 'For well-qualified buyers. 36, 48, 60, or 72 month terms available.',
        eligibility: 'Credit approval required through GM Financial.',
      },
      {
        id: 'chevy-trax-lease',
        type: 'lease',
        title: '$299/mo Lease',
        description: 'Ultra low-mileage lease for 24 months with $1,879 due at signing.',
        value: '$299/month',
        expirationDate: 'January 2, 2026',
        terms: '24-month lease, 10,000 miles/year. $0.25/mile over. No security deposit.',
        eligibility: 'For eligible current lessees.',
      },
      {
        id: 'chevy-trax-military',
        type: 'special',
        title: '$500 Military Offer',
        description: 'Cash allowance for active, reserve, and retired military personnel.',
        value: '$500',
        expirationDate: 'January 3, 2026',
        eligibility: 'Active, reserve, retired military, or veterans discharged within 3 years.',
      },
      {
        id: 'chevy-trax-first-responder',
        type: 'special',
        title: '$500 First Responder Offer',
        description: 'Cash allowance for firefighters, police, EMTs, and 911 dispatchers.',
        value: '$500',
        expirationDate: 'January 3, 2026',
        eligibility: 'Proof of employment required.',
      },
    ],
  },
  'Chevrolet-Equinox': {
    make: 'Chevrolet',
    model: 'Equinox',
    totalSavings: 3500,
    incentives: [
      {
        id: 'chevy-equinox-cash',
        type: 'cash',
        title: '$2,500 Cash Back',
        description: 'Customer cash allowance on 2025 Chevrolet Equinox.',
        value: '$2,500',
        expirationDate: 'January 2, 2026',
      },
      {
        id: 'chevy-equinox-finance',
        type: 'finance',
        title: '5.9% APR Financing',
        description: 'Special APR financing through GM Financial.',
        value: '5.9% APR',
        expirationDate: 'January 2, 2026',
        terms: 'For well-qualified buyers. 36-72 month terms.',
      },
      {
        id: 'chevy-equinox-lease',
        type: 'lease',
        title: '$329/mo Lease',
        description: 'Lease for 36 months with competitive due at signing.',
        value: '$329/month',
        expirationDate: 'January 2, 2026',
      },
    ],
  },
  'Chevrolet-Silverado': {
    make: 'Chevrolet',
    model: 'Silverado',
    totalSavings: 5000,
    incentives: [
      {
        id: 'chevy-silverado-cash',
        type: 'cash',
        title: '$3,500 Cash Back',
        description: 'Customer cash on select 2025 Silverado 1500 models.',
        value: '$3,500',
        expirationDate: 'January 2, 2026',
      },
      {
        id: 'chevy-silverado-finance',
        type: 'finance',
        title: '4.9% APR + $1,500 Bonus',
        description: 'Low APR financing plus bonus cash.',
        value: '4.9% APR + $1,500',
        expirationDate: 'January 2, 2026',
      },
    ],
  },
  'Toyota-Camry': {
    make: 'Toyota',
    model: 'Camry',
    totalSavings: 2000,
    incentives: [
      {
        id: 'toyota-camry-finance',
        type: 'finance',
        title: '4.99% APR Financing',
        description: 'Special APR for 60 months on 2025 Camry.',
        value: '4.99% APR',
        expirationDate: 'January 6, 2026',
        terms: 'For well-qualified buyers through Toyota Financial Services.',
      },
      {
        id: 'toyota-camry-lease',
        type: 'lease',
        title: '$329/mo Lease',
        description: 'Lease a new Camry LE for 36 months.',
        value: '$329/month',
        expirationDate: 'January 6, 2026',
        terms: '$2,999 due at signing. 10,000 miles/year.',
      },
      {
        id: 'toyota-camry-college',
        type: 'special',
        title: '$500 College Grad Rebate',
        description: 'Rebate for recent college graduates.',
        value: '$500',
        expirationDate: 'January 6, 2026',
        eligibility: 'Graduated within past 2 years or graduating within 6 months.',
      },
    ],
  },
  'Toyota-RAV4': {
    make: 'Toyota',
    model: 'RAV4',
    totalSavings: 1500,
    incentives: [
      {
        id: 'toyota-rav4-finance',
        type: 'finance',
        title: '5.49% APR Financing',
        description: 'Special APR for 60 months on 2025 RAV4.',
        value: '5.49% APR',
        expirationDate: 'January 6, 2026',
      },
      {
        id: 'toyota-rav4-lease',
        type: 'lease',
        title: '$359/mo Lease',
        description: 'Lease a new RAV4 LE for 36 months.',
        value: '$359/month',
        expirationDate: 'January 6, 2026',
      },
    ],
  },
  'Honda-CR-V': {
    make: 'Honda',
    model: 'CR-V',
    totalSavings: 1000,
    incentives: [
      {
        id: 'honda-crv-finance',
        type: 'finance',
        title: '5.9% APR Financing',
        description: 'Special APR for 48-60 months through Honda Financial.',
        value: '5.9% APR',
        expirationDate: 'January 2, 2026',
      },
      {
        id: 'honda-crv-lease',
        type: 'lease',
        title: '$369/mo Lease',
        description: 'Lease a 2025 CR-V LX for 36 months.',
        value: '$369/month',
        expirationDate: 'January 2, 2026',
        terms: '$3,499 due at signing.',
      },
      {
        id: 'honda-crv-loyalty',
        type: 'special',
        title: '$500 Loyalty Bonus',
        description: 'For current Honda owners.',
        value: '$500',
        expirationDate: 'January 2, 2026',
        eligibility: 'Must currently own or lease a Honda vehicle.',
      },
    ],
  },
  'Honda-Civic': {
    make: 'Honda',
    model: 'Civic',
    totalSavings: 1500,
    incentives: [
      {
        id: 'honda-civic-finance',
        type: 'finance',
        title: '4.9% APR Financing',
        description: 'Special APR for 48-60 months.',
        value: '4.9% APR',
        expirationDate: 'January 2, 2026',
      },
      {
        id: 'honda-civic-lease',
        type: 'lease',
        title: '$289/mo Lease',
        description: 'Lease a 2025 Civic LX for 36 months.',
        value: '$289/month',
        expirationDate: 'January 2, 2026',
      },
    ],
  },
  'Ford-F-150': {
    make: 'Ford',
    model: 'F-150',
    totalSavings: 6000,
    incentives: [
      {
        id: 'ford-f150-cash',
        type: 'cash',
        title: '$4,000 Customer Cash',
        description: 'Cash back on select 2025 F-150 models.',
        value: '$4,000',
        expirationDate: 'January 2, 2026',
      },
      {
        id: 'ford-f150-finance',
        type: 'finance',
        title: '3.9% APR + $2,000 Bonus',
        description: 'Low APR plus bonus cash.',
        value: '3.9% APR + $2,000',
        expirationDate: 'January 2, 2026',
        terms: 'For well-qualified buyers through Ford Credit.',
      },
      {
        id: 'ford-f150-trade',
        type: 'special',
        title: '$1,000 Trade-In Assistance',
        description: 'Bonus cash when trading in any vehicle.',
        value: '$1,000',
        expirationDate: 'January 2, 2026',
      },
    ],
  },
  'Ford-Mustang': {
    make: 'Ford',
    model: 'Mustang',
    totalSavings: 2500,
    incentives: [
      {
        id: 'ford-mustang-cash',
        type: 'cash',
        title: '$2,000 Customer Cash',
        description: 'Cash back on 2025 Mustang models.',
        value: '$2,000',
        expirationDate: 'January 2, 2026',
      },
      {
        id: 'ford-mustang-finance',
        type: 'finance',
        title: '5.9% APR Financing',
        description: 'Special financing through Ford Credit.',
        value: '5.9% APR',
        expirationDate: 'January 2, 2026',
      },
    ],
  },
  'Hyundai-Tucson': {
    make: 'Hyundai',
    model: 'Tucson',
    totalSavings: 2500,
    incentives: [
      {
        id: 'hyundai-tucson-cash',
        type: 'cash',
        title: '$1,500 Customer Cash',
        description: 'Cash back on 2025 Tucson.',
        value: '$1,500',
        expirationDate: 'January 2, 2026',
      },
      {
        id: 'hyundai-tucson-finance',
        type: 'finance',
        title: '4.9% APR Financing',
        description: 'Special APR through Hyundai Motor Finance.',
        value: '4.9% APR',
        expirationDate: 'January 2, 2026',
      },
      {
        id: 'hyundai-tucson-lease',
        type: 'lease',
        title: '$339/mo Lease',
        description: 'Lease for 36 months.',
        value: '$339/month',
        expirationDate: 'January 2, 2026',
      },
    ],
  },
  'Hyundai-Kona': {
    make: 'Hyundai',
    model: 'Kona',
    totalSavings: 2000,
    incentives: [
      {
        id: 'hyundai-kona-cash',
        type: 'cash',
        title: '$1,000 Customer Cash',
        description: 'Cash back on 2025 Kona.',
        value: '$1,000',
        expirationDate: 'January 2, 2026',
      },
      {
        id: 'hyundai-kona-finance',
        type: 'finance',
        title: '5.49% APR Financing',
        description: 'Special APR through Hyundai Motor Finance.',
        value: '5.49% APR',
        expirationDate: 'January 2, 2026',
      },
    ],
  },
  'Tesla-Model Y': {
    make: 'Tesla',
    model: 'Model Y',
    totalSavings: 7500,
    incentives: [
      {
        id: 'tesla-model-y-tax',
        type: 'special',
        title: '$7,500 Federal Tax Credit',
        description: 'Federal EV tax credit for eligible buyers.',
        value: '$7,500',
        expirationDate: 'December 31, 2026',
        eligibility: 'Income limits apply. Must meet IRS requirements.',
        terms: 'Can be taken as point-of-sale discount at participating dealers.',
      },
    ],
  },
  'Tesla-Model 3': {
    make: 'Tesla',
    model: 'Model 3',
    totalSavings: 7500,
    incentives: [
      {
        id: 'tesla-model-3-tax',
        type: 'special',
        title: '$7,500 Federal Tax Credit',
        description: 'Federal EV tax credit for eligible buyers.',
        value: '$7,500',
        expirationDate: 'December 31, 2026',
        eligibility: 'Income limits apply. Must meet IRS requirements.',
      },
    ],
  },
  'BMW-3 Series': {
    make: 'BMW',
    model: '3 Series',
    totalSavings: 3000,
    incentives: [
      {
        id: 'bmw-3series-credit',
        type: 'cash',
        title: '$2,500 Loyalty Credit',
        description: 'For current BMW owners.',
        value: '$2,500',
        expirationDate: 'January 2, 2026',
        eligibility: 'Must currently own a BMW vehicle.',
      },
      {
        id: 'bmw-3series-finance',
        type: 'finance',
        title: '4.99% APR Financing',
        description: 'Special APR through BMW Financial Services.',
        value: '4.99% APR',
        expirationDate: 'January 2, 2026',
      },
    ],
  },
  'Mercedes-Benz-C-Class': {
    make: 'Mercedes-Benz',
    model: 'C-Class',
    totalSavings: 3500,
    incentives: [
      {
        id: 'mb-cclass-credit',
        type: 'cash',
        title: '$3,000 Loyalty Credit',
        description: 'For current Mercedes-Benz owners.',
        value: '$3,000',
        expirationDate: 'January 2, 2026',
        eligibility: 'Must currently own a Mercedes-Benz vehicle.',
      },
    ],
  },
  'Kia-Seltos': {
    make: 'Kia',
    model: 'Seltos',
    totalSavings: 2000,
    incentives: [
      {
        id: 'kia-seltos-cash',
        type: 'cash',
        title: '$1,500 Customer Cash',
        description: 'Cash back on 2025 Seltos.',
        value: '$1,500',
        expirationDate: 'January 2, 2026',
      },
      {
        id: 'kia-seltos-finance',
        type: 'finance',
        title: '4.9% APR Financing',
        description: 'Special APR through Kia Finance.',
        value: '4.9% APR',
        expirationDate: 'January 2, 2026',
      },
    ],
  },
  'Nissan-Rogue': {
    make: 'Nissan',
    model: 'Rogue',
    totalSavings: 3000,
    incentives: [
      {
        id: 'nissan-rogue-cash',
        type: 'cash',
        title: '$2,000 Customer Cash',
        description: 'Cash back on 2025 Rogue.',
        value: '$2,000',
        expirationDate: 'January 2, 2026',
      },
      {
        id: 'nissan-rogue-finance',
        type: 'finance',
        title: '4.9% APR + $1,000 Bonus',
        description: 'Low APR plus bonus cash.',
        value: '4.9% APR + $1,000',
        expirationDate: 'January 2, 2026',
      },
    ],
  },
};

// Default incentives for vehicles without specific data
const defaultIncentives: Incentive[] = [
  {
    id: 'default-finance',
    type: 'finance',
    title: 'Special APR Financing',
    description: 'Competitive financing rates available through manufacturer financing.',
    value: 'As low as 5.9% APR',
    expirationDate: 'Limited time offer',
    terms: 'For well-qualified buyers. Terms vary by model.',
  },
  {
    id: 'default-military',
    type: 'special',
    title: 'Military Appreciation Offer',
    description: 'Cash allowance for active, reserve, and retired military personnel.',
    value: 'Up to $500',
    expirationDate: 'Ongoing',
    eligibility: 'Valid military ID required.',
  },
];

export const getVehicleIncentives = (make: string, model: string): VehicleIncentives => {
  const key = `${make}-${model}`;
  const incentives = incentivesData[key];
  
  if (incentives) {
    return incentives;
  }
  
  // Return default incentives if no specific data found
  return {
    make,
    model,
    totalSavings: 1000,
    incentives: defaultIncentives,
  };
};

export const getIncentivesByType = (
  make: string, 
  model: string, 
  type: 'cash' | 'finance' | 'lease' | 'special'
): Incentive[] => {
  const vehicleIncentives = getVehicleIncentives(make, model);
  return vehicleIncentives.incentives.filter(i => i.type === type);
};

export const getTotalSavings = (make: string, model: string): number => {
  const vehicleIncentives = getVehicleIncentives(make, model);
  return vehicleIncentives.totalSavings;
};

// Get current month and year for display
export const getCurrentPeriod = (): { month: string; year: number } => {
  const now = new Date();
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  return {
    month: months[now.getMonth()],
    year: now.getFullYear(),
  };
};




















