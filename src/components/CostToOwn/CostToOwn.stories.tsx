import type { Meta, StoryObj } from '@storybook/react';
import CostToOwn from './CostToOwn';

const meta: Meta<typeof CostToOwn> = {
  title: 'Organisms/CostToOwn',
  component: CostToOwn,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
## 5-Year Cost to Own

Comprehensive breakdown of total ownership costs over 5 years.

### Cost Categories
- **Depreciation**: Estimated value loss over time
- **Fuel/Energy**: Based on average driving and fuel prices
- **Insurance**: Estimated annual premiums
- **Maintenance**: Scheduled service costs
- **Repairs**: Expected repair expenses
- **Financing**: Interest costs if financed
- **Taxes & Fees**: Registration, taxes, etc.

### Usage

\`\`\`tsx
import CostToOwn from '@/components/CostToOwn';

<CostToOwn 
  vehicleName="2025 Chevrolet Trax"
  msrp={21895}
  fuelType="Gas"
  trims={[
    { name: 'LS', msrp: 21895 },
    { name: 'LT', msrp: 23395 },
  ]}
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
    msrp: {
      description: 'Base MSRP for cost calculations',
      control: { type: 'number', min: 15000, max: 200000, step: 1000 },
      table: {
        type: { summary: 'number' },
        category: 'Pricing',
      },
    },
    fuelType: {
      description: 'Fuel type affects fuel/energy cost calculations',
      control: 'select',
      options: ['Gas', 'Electric', 'Hybrid', 'Diesel', 'Plug-in Hybrid'],
      table: {
        type: { summary: 'string' },
        category: 'Vehicle',
      },
    },
    trims: {
      description: 'Available trims for comparison',
      control: 'object',
      table: {
        type: { 
          summary: 'Trim[]',
          detail: '{ name: string; msrp: number }[]',
        },
        category: 'Pricing',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    vehicleName: '2025 Chevrolet Trax',
    msrp: 21895,
    fuelType: 'Gas',
  },
  parameters: {
    docs: {
      description: {
        story: 'Basic cost breakdown for an affordable gas-powered SUV.',
      },
    },
  },
};

export const WithTrims: Story = {
  args: {
    vehicleName: '2025 Chevrolet Trax',
    msrp: 21895,
    fuelType: 'Gas',
    trims: [
      { name: 'LS', msrp: 21895 },
      { name: '1RS', msrp: 23195 },
      { name: 'LT', msrp: 23395 },
      { name: 'RS', msrp: 24995 },
      { name: 'ACTIV', msrp: 24995 },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Cost breakdown with trim selector allowing users to compare ownership costs across trims.',
      },
    },
  },
};

export const Electric: Story = {
  args: {
    vehicleName: '2025 Chevrolet Bolt EV',
    msrp: 27495,
    fuelType: 'Electric',
    trims: [
      { name: '1LT', msrp: 27495 },
      { name: '2LT', msrp: 31495 },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Electric vehicle with different cost structure - lower fuel costs, different maintenance patterns.',
      },
    },
  },
};

export const Hybrid: Story = {
  args: {
    vehicleName: '2025 Chevrolet Trailblazer',
    msrp: 24995,
    fuelType: 'Gas',
  },
  parameters: {
    docs: {
      description: {
        story: 'Compact SUV cost breakdown showing mid-range ownership costs.',
      },
    },
  },
};

export const Luxury: Story = {
  args: {
    vehicleName: '2025 Chevrolet Camaro',
    msrp: 29100,
    fuelType: 'Gas',
    trims: [
      { name: '1LS', msrp: 29100 },
      { name: '1LT', msrp: 30700 },
      { name: 'SS', msrp: 44100 },
      { name: 'ZL1', msrp: 71700 },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Performance vehicle with higher insurance and maintenance costs.',
      },
    },
  },
};

export const Exotic: Story = {
  args: {
    vehicleName: '2025 Chevrolet Corvette',
    msrp: 65000,
    fuelType: 'Gas',
  },
  parameters: {
    docs: {
      description: {
        story: 'High-end sports car demonstrating premium ownership costs.',
      },
    },
  },
};
