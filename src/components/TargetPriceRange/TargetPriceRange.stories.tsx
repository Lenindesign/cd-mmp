import type { Meta, StoryObj } from '@storybook/react';
import TargetPriceRange from './TargetPriceRange';

const meta: Meta<typeof TargetPriceRange> = {
  title: 'Organisms/TargetPriceRange',
  component: TargetPriceRange,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
## Target Price Range

Displays pricing information with market analysis, helping users understand fair pricing.

### Features
- **MSRP Display**: Base manufacturer suggested retail price
- **Trim Selection**: Dropdown to view pricing for different trims
- **Market Analysis**: Shows typical transaction prices vs MSRP
- **Visual Range**: Price range indicator with market positioning

### Usage

\`\`\`tsx
import TargetPriceRange from '@/components/TargetPriceRange';

<TargetPriceRange 
  vehicleName="2025 Chevrolet Trax"
  msrp={21895}
  trims={[
    { name: 'LS FWD', msrp: 21895 },
    { name: '1RS FWD', msrp: 23195 },
    { name: 'LT FWD', msrp: 23395 },
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
      description: 'Full name of the vehicle (Year Make Model)',
      control: 'text',
      table: {
        type: { summary: 'string' },
        category: 'Vehicle',
      },
    },
    msrp: {
      description: 'Base MSRP in dollars',
      control: { type: 'number', min: 15000, max: 200000, step: 1000 },
      table: {
        type: { summary: 'number' },
        category: 'Pricing',
      },
    },
    trims: {
      description: 'Array of available trims with their MSRPs',
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
    trims: [
      { name: 'LS FWD', msrp: 21895 },
      { name: '1RS FWD', msrp: 23195 },
      { name: 'LT FWD', msrp: 23395 },
      { name: 'RS FWD', msrp: 24995 },
      { name: 'ACTIV FWD', msrp: 24995 },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Default price range display for a subcompact SUV with multiple trim levels.',
      },
    },
  },
};

export const LuxuryVehicle: Story = {
  args: {
    vehicleName: '2025 Chevrolet Trailblazer',
    msrp: 24995,
    trims: [
      { name: 'LS', msrp: 24995 },
      { name: 'LT', msrp: 27295 },
      { name: 'ACTIV', msrp: 29995 },
      { name: 'RS', msrp: 31895 },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Price range for a compact SUV with wider trim spread.',
      },
    },
  },
};

export const BudgetVehicle: Story = {
  args: {
    vehicleName: '2025 Chevrolet Trax LS',
    msrp: 21895,
    trims: [
      { name: 'LS FWD', msrp: 21895 },
      { name: '1RS FWD', msrp: 23195 },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Simplified view with only two trim options for budget-focused shoppers.',
      },
    },
  },
};

export const HighEndLuxury: Story = {
  args: {
    vehicleName: '2025 Chevrolet Camaro',
    msrp: 29100,
    trims: [
      { name: '1LS', msrp: 29100 },
      { name: '1LT', msrp: 30700 },
      { name: '2LT', msrp: 32700 },
      { name: 'SS', msrp: 44100 },
      { name: 'ZL1', msrp: 71700 },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Wide price range from base to high-performance trims, demonstrating large MSRP spread.',
      },
    },
  },
};
