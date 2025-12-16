import type { Meta, StoryObj } from '@storybook/react';
import Incentives from './Incentives';

const meta: Meta<typeof Incentives> = {
  title: 'Organisms/Incentives',
  component: Incentives,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
## Incentives & Offers

Displays current manufacturer incentives, rebates, and special financing offers.

### Types of Incentives
- **Cash Rebates**: Direct manufacturer discounts
- **Financing Offers**: Low APR or 0% financing
- **Lease Specials**: Attractive lease terms
- **Trade-In Bonuses**: Extra value for trade-ins
- **Federal Tax Credits**: EV tax incentives (when applicable)

### Usage

\`\`\`tsx
import Incentives from '@/components/Incentives';

<Incentives 
  make="Chevrolet"
  model="Trax"
/>
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    make: {
      description: 'Vehicle manufacturer',
      control: 'select',
      options: ['Chevrolet', 'Toyota', 'Honda', 'Ford', 'BMW', 'Tesla'],
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
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    make: 'Chevrolet',
    model: 'Trax',
  },
  parameters: {
    docs: {
      description: {
        story: 'Standard incentives display for a mainstream vehicle.',
      },
    },
  },
};

export const LuxuryBrand: Story = {
  args: {
    make: 'Chevrolet',
    model: 'Trailblazer',
  },
  parameters: {
    docs: {
      description: {
        story: 'Incentives for a mid-range vehicle with different offer structure.',
      },
    },
  },
};

export const Electric: Story = {
  args: {
    make: 'Chevrolet',
    model: 'Bolt EV',
  },
  parameters: {
    docs: {
      description: {
        story: 'Electric vehicle incentives including federal tax credit information.',
      },
    },
  },
};
