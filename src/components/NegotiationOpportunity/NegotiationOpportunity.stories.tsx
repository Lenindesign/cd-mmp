import type { Meta, StoryObj } from '@storybook/react';
import NegotiationOpportunity, { type NegotiationOpportunityRowInput } from './NegotiationOpportunity';
import type { DealerWithScore, VehicleInventoryItem } from '../../services/dealerService';

const buildDealer = (
  id: string,
  name: string,
  distance: number,
  phone: string,
  address: string
): DealerWithScore => ({
  id,
  name,
  address,
  city: 'Los Angeles',
  state: 'CA',
  zipCode: '90001',
  phone,
  lat: 34.05,
  lng: -118.24,
  rating: 4.6,
  reviewCount: 842,
  distance,
  inventory: [],
  dealScore: {
    total: 86,
    priceScore: 82,
    distanceScore: 74,
    ratingScore: 92,
    inventoryBonus: 8,
    isBestDeal: false,
  },
  lowestPrice: 21450,
  highestPrice: 23995,
  inventoryCount: 5,
});

const buildVehicle = (
  trim: string,
  price: number,
  daysOnLot: number,
  recentPriceDropAmount?: number,
  overrides: Partial<VehicleInventoryItem> = {}
): VehicleInventoryItem => ({
  year: 2026,
  make: 'Chevrolet',
  model: 'Trax',
  trim,
  price,
  isNew: false,
  owners: 1,
  accidents: 0,
  serviceRecords: 10,
  titleStatus: 'Clean',
  personalUse: true,
  fleetUse: false,
  rentalUse: false,
  carfaxScore: 92,
  isCertified: true,
  daysOnLot,
  recentPriceDropAmount,
  ...overrides,
});

const excellentRows: NegotiationOpportunityRowInput[] = [
  {
    dealer: buildDealer('dealer-1', 'Cerritos Chevrolet', 16.9, '(562) 924-1234', '18605 Studebaker Rd'),
    vehicle: buildVehicle('High Country', 22594, 137, 1200),
    opportunity: 'Excellent',
    score: 92,
  },
  {
    dealer: buildDealer('dealer-2', 'Courtesy Chevrolet', 33.4, '(619) 555-2100', '750 Camino Del Rio'),
    vehicle: buildVehicle('LS', 20103, 118, 900, { owners: 2, serviceRecords: 8, isCertified: false }),
    opportunity: 'Excellent',
    score: 87,
  },
  {
    dealer: buildDealer('dealer-3', 'Irvine Chevrolet', 35.8, '(949) 753-1500', '18 Auto Center Dr'),
    vehicle: buildVehicle('RS', 21151, 120, 950, { owners: 1, serviceRecords: 12 }),
    opportunity: 'Excellent',
    score: 84,
  },
];

const mixedRows: NegotiationOpportunityRowInput[] = [
  {
    dealer: buildDealer('dealer-4', 'Mission Hills Chevrolet', 9.2, '(818) 555-3400', '1100 Sepulveda Blvd'),
    vehicle: buildVehicle('LT', 21995, 28, undefined, { owners: 3, accidents: 1, titleStatus: 'Clean', personalUse: false, fleetUse: true, carfaxScore: 73, isCertified: false }),
    opportunity: 'Low',
    score: 48,
  },
  {
    dealer: buildDealer('dealer-5', 'Downtown Chevrolet', 21.4, '(213) 555-1100', '900 S Figueroa St'),
    vehicle: buildVehicle('1RS', 22350, 46, 350, { owners: 2, serviceRecords: 6, isCertified: false }),
    opportunity: 'Moderate',
    score: 61,
  },
  {
    dealer: buildDealer('dealer-6', 'Lake Forest Chevrolet', 42.4, '(949) 830-3100', '23595 Rockfield Blvd'),
    vehicle: buildVehicle('Premier', 22141, 95, 700, { owners: 1, serviceRecords: 9 }),
    opportunity: 'High',
    score: 76,
  },
];

const meta: Meta<typeof NegotiationOpportunity> = {
  title: 'Marketplace/NegotiationOpportunity',
  component: NegotiationOpportunity,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Negotiation intelligence module for YMM pages. Story harness exists to review DS compliance across status levels, radius controls, and dealer actions before shipping UI changes.',
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '1120px', margin: '0 auto', background: '#f7f7f7', padding: '24px' }}>
        <Story />
      </div>
    ),
  ],
  args: {
    year: 2026,
    make: 'Chevrolet',
    model: 'Trax',
    msrp: 20400,
    priceMin: 20400,
    priceMax: 24400,
    locationLabel: 'Los Angeles, CA',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const ExcellentMarket: Story = {
  args: {
    rowsOverride: excellentRows,
  },
};

export const OptionBMarketIntelligence: Story = {
  args: {
    rowsOverride: excellentRows,
    variant: 'option-b',
    enableVariantExplorer: true,
  },
};

export const MixedOpportunityLevels: Story = {
  args: {
    rowsOverride: mixedRows,
  },
};

export const MobileDensityReview: Story = {
  args: {
    rowsOverride: excellentRows,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};
