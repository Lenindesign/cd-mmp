import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import MarketSpeed from './MarketSpeed';

const meta: Meta<typeof MarketSpeed> = {
  title: 'Organisms/MarketSpeed',
  component: MarketSpeed,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
## Market Speed Indicator

Shows how quickly vehicles are selling in the current market, helping buyers understand demand.

### Speed Levels
- **Hot**: Selling very fast, high demand
- **Fast**: Above average selling speed
- **Average**: Normal market conditions
- **Slow**: Below average, potential for negotiation

### Data Points
- Days on market average
- Inventory levels
- Price trends
- Regional demand

### Usage

\`\`\`tsx
import MarketSpeed from '@/components/MarketSpeed';

<MarketSpeed 
  vehicleName="2025 Chevrolet Trax"
  make="Chevrolet"
  model="Trax"
  bodyStyle="SUV"
  msrp={21895}
/>
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    vehicleName: {
      description: 'Full vehicle name (Year Make Model)',
      control: 'text',
      table: {
        type: { summary: 'string' },
        category: 'Vehicle',
      },
    },
    make: {
      description: 'Vehicle manufacturer',
      control: 'text',
      table: {
        type: { summary: 'string' },
        category: 'Vehicle',
      },
    },
    model: {
      description: 'Vehicle model name',
      control: 'text',
      table: {
        type: { summary: 'string' },
        category: 'Vehicle',
      },
    },
    bodyStyle: {
      description: 'Vehicle body style for market comparison',
      control: 'select',
      options: ['SUV', 'Sedan', 'Truck', 'Coupe', 'Hatchback', 'Convertible', 'Wagon'],
      table: {
        type: { summary: 'string' },
        category: 'Vehicle',
      },
    },
    msrp: {
      description: 'MSRP for price segment analysis',
      control: { type: 'number', min: 15000, max: 200000, step: 1000 },
      table: {
        type: { summary: 'number' },
        category: 'Pricing',
      },
    },
  },
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    vehicleName: '2025 Chevrolet Trax',
    make: 'Chevrolet',
    model: 'Trax',
    bodyStyle: 'SUV',
    msrp: 21895,
  },
  parameters: {
    docs: {
      description: {
        story: 'Market speed indicator for a popular subcompact SUV.',
      },
    },
  },
};

export const SUV: Story = {
  args: {
    vehicleName: '2025 Chevrolet Trailblazer',
    make: 'Chevrolet',
    model: 'Trailblazer',
    bodyStyle: 'SUV',
    msrp: 24995,
  },
  parameters: {
    docs: {
      description: {
        story: 'Compact SUV market analysis showing different demand patterns.',
      },
    },
  },
};

export const Truck: Story = {
  args: {
    vehicleName: '2025 Chevrolet Silverado',
    make: 'Chevrolet',
    model: 'Silverado',
    bodyStyle: 'Truck',
    msrp: 36000,
  },
  parameters: {
    docs: {
      description: {
        story: 'Truck market speed - typically shows different patterns than passenger vehicles.',
      },
    },
  },
};
