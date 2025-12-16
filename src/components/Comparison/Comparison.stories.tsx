import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import Comparison from './Comparison';

const meta: Meta<typeof Comparison> = {
  title: 'Organisms/Comparison',
  component: Comparison,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
## Vehicle Comparison

Side-by-side comparison of the current vehicle with similar competitors.

### Features
- **Smart Matching**: Automatically finds similar vehicles by body style and price
- **Key Specs**: Compare ratings, prices, and features at a glance
- **Quick Links**: Navigate to competitor vehicle pages

### Usage

\`\`\`tsx
import Comparison from '@/components/Comparison';

<Comparison 
  currentVehicle={{
    make: 'Chevrolet',
    model: 'Trax',
  }}
  title="Compare Similar Vehicles"
/>
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    currentVehicle: {
      description: 'The vehicle being compared (used to find similar competitors)',
      control: 'object',
      table: {
        type: { 
          summary: 'Vehicle',
          detail: '{ make: string; model: string }',
        },
        category: 'Vehicle',
      },
    },
    title: {
      description: 'Custom section heading',
      control: 'text',
      table: {
        type: { summary: 'string' },
        category: 'Content',
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
    currentVehicle: {
      make: 'Chevrolet',
      model: 'Trax',
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Default comparison view showing competitors for a subcompact SUV.',
      },
    },
  },
};

export const SUV: Story = {
  args: {
    currentVehicle: {
      make: 'Chevrolet',
      model: 'Trailblazer',
    },
    title: 'Compare SUVs',
  },
  parameters: {
    docs: {
      description: {
        story: 'Compact SUV comparison with custom title.',
      },
    },
  },
};

export const Truck: Story = {
  args: {
    currentVehicle: {
      make: 'Chevrolet',
      model: 'Silverado',
    },
    title: 'Compare Trucks',
  },
  parameters: {
    docs: {
      description: {
        story: 'Truck comparison showing pickup competitors.',
      },
    },
  },
};

export const CustomTitle: Story = {
  args: {
    currentVehicle: {
      make: 'Chevrolet',
      model: 'Trax',
    },
    title: 'Similar Vehicles to Consider',
  },
  parameters: {
    docs: {
      description: {
        story: 'Comparison with custom section heading for different contexts.',
      },
    },
  },
};
