import type { Meta, StoryObj } from '@storybook/react';
import { PricingCTAV1B } from './PricingCTA';

const meta: Meta<typeof PricingCTAV1B> = {
  title: 'Organisms/PricingCTA',
  component: PricingCTAV1B,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
## Pricing CTA Section

Full-width call-to-action section for lead generation and dealer connections.

### Features
- **Local Pricing**: Shows pricing for user's location
- **Dealer Connect**: Links to local dealer inventory
- **Lead Capture**: Email/phone collection forms
- **Price Alerts**: Sign up for price drop notifications

### Usage

\`\`\`tsx
import { PricingCTAV1B } from '@/components/PricingCTA';

<PricingCTAV1B 
  vehicleName="2025 Chevrolet Trax"
  make="Chevrolet"
  model="Trax"
  msrp={21895}
  location="Los Angeles, CA"
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
    msrp: {
      description: 'Base MSRP for pricing display',
      control: { type: 'number', min: 15000, max: 200000, step: 1000 },
      table: {
        type: { summary: 'number' },
        category: 'Pricing',
      },
    },
    location: {
      description: 'User location for local dealer/pricing info',
      control: 'text',
      table: {
        type: { summary: 'string' },
        category: 'Location',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    vehicleName: '2025 Chevrolet Trax',
    make: 'Chevrolet',
    model: 'Trax',
    msrp: 21895,
  },
  parameters: {
    docs: {
      description: {
        story: 'Default pricing CTA without location - prompts user to enter location.',
      },
    },
  },
};

export const SUV: Story = {
  args: {
    vehicleName: '2025 Chevrolet Trailblazer',
    make: 'Chevrolet',
    model: 'Trailblazer',
    msrp: 24995,
    location: 'Los Angeles, CA',
  },
  parameters: {
    docs: {
      description: {
        story: 'CTA with location pre-filled, showing local pricing and dealers.',
      },
    },
  },
};

export const Luxury: Story = {
  args: {
    vehicleName: '2025 Chevrolet Camaro',
    make: 'Chevrolet',
    model: 'Camaro',
    msrp: 29100,
    location: 'New York, NY',
  },
  parameters: {
    docs: {
      description: {
        story: 'Performance vehicle CTA in a major metro market.',
      },
    },
  },
};

export const Truck: Story = {
  args: {
    vehicleName: '2025 Chevrolet Silverado',
    make: 'Chevrolet',
    model: 'Silverado',
    msrp: 36000,
    location: 'Dallas, TX',
  },
  parameters: {
    docs: {
      description: {
        story: 'Truck CTA in a truck-heavy market (Texas).',
      },
    },
  },
};

export const Budget: Story = {
  args: {
    vehicleName: '2025 Chevrolet Trax LS',
    make: 'Chevrolet',
    model: 'Trax',
    msrp: 21895,
    location: 'Miami, FL',
  },
  parameters: {
    docs: {
      description: {
        story: 'Budget-focused CTA highlighting value and affordability.',
      },
    },
  },
};
