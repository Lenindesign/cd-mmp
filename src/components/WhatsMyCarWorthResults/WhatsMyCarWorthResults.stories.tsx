import type { Meta, StoryObj } from '@storybook/react';
import WhatsMyCarWorthResults from './WhatsMyCarWorthResults';

const meta: Meta<typeof WhatsMyCarWorthResults> = {
  title: 'Pages/WhatsMyCarWorthResults',
  component: WhatsMyCarWorthResults,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof WhatsMyCarWorthResults>;

const defaultTradeEstimate = {
  low: 18500,
  mid: 21500,
  high: 24500,
  vehicle: {
    year: 2021,
    make: 'Honda',
    model: 'Accord',
    mileage: 45000,
    condition: 'Good',
  },
};

const defaultDealers = [
  {
    name: 'Honda of Miami',
    address: '1234 Main Street',
    city: 'Miami',
    state: 'FL',
    zip: '33101',
    phone: '(305) 555-1234',
    email: 'contact@hondamiami.com',
    rating: 4.7,
    distance: 5.2,
  },
  {
    name: 'South Florida Honda',
    address: '5678 Ocean Drive',
    city: 'Miami Beach',
    state: 'FL',
    zip: '33139',
    phone: '(305) 555-5678',
    email: 'info@southfloridahonda.com',
    rating: 4.5,
    distance: 8.1,
  },
  {
    name: 'Coral Gables Honda',
    address: '9012 Ponce de Leon Blvd',
    city: 'Coral Gables',
    state: 'FL',
    zip: '33134',
    phone: '(305) 555-9012',
    email: 'sales@coralgableshonda.com',
    rating: 4.6,
    distance: 12.3,
  },
];

// Option 1: Marketplace-Focused
export const MarketplaceFocused: Story = {
  args: {
    variant: 'marketplace-focused',
    tradeEstimate: defaultTradeEstimate,
    dealers: defaultDealers,
    showSimilarVehicles: true,
    showNextVehicle: false,
  },
};

// Option 2: Balanced
export const Balanced: Story = {
  args: {
    variant: 'balanced',
    tradeEstimate: defaultTradeEstimate,
    dealers: defaultDealers,
    showSimilarVehicles: false,
    showNextVehicle: true,
  },
};

// Option 3: Content-Focused
export const ContentFocused: Story = {
  args: {
    variant: 'content-focused',
    tradeEstimate: defaultTradeEstimate,
    dealers: defaultDealers,
    showSimilarVehicles: false,
    showNextVehicle: false,
  },
};

// All variants comparison
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
      <div>
        <h2 style={{ marginBottom: '2rem', fontSize: '2rem', fontWeight: 'bold' }}>
          Option 1: Marketplace-Focused
        </h2>
        <WhatsMyCarWorthResults
          variant="marketplace-focused"
          tradeEstimate={defaultTradeEstimate}
          dealers={defaultDealers}
          showSimilarVehicles={true}
          showNextVehicle={false}
        />
      </div>
      
      <div>
        <h2 style={{ marginBottom: '2rem', fontSize: '2rem', fontWeight: 'bold' }}>
          Option 2: Balanced
        </h2>
        <WhatsMyCarWorthResults
          variant="balanced"
          tradeEstimate={defaultTradeEstimate}
          dealers={defaultDealers}
          showSimilarVehicles={false}
          showNextVehicle={true}
        />
      </div>
      
      <div>
        <h2 style={{ marginBottom: '2rem', fontSize: '2rem', fontWeight: 'bold' }}>
          Option 3: Content-Focused
        </h2>
        <WhatsMyCarWorthResults
          variant="content-focused"
          tradeEstimate={defaultTradeEstimate}
          dealers={defaultDealers}
          showSimilarVehicles={false}
          showNextVehicle={false}
        />
      </div>
    </div>
  ),
};
