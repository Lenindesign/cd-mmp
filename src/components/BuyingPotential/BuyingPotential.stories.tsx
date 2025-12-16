import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import BuyingPotential from './BuyingPotential';

const meta: Meta<typeof BuyingPotential> = {
  title: 'Organisms/BuyingPotential',
  component: BuyingPotential,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
## Buying Potential Score

Personalized match score showing how well a vehicle fits the user's preferences and needs.

### Score Factors
- **Budget Match**: How well the price fits user's budget
- **Feature Match**: Alignment with desired features
- **Lifestyle Fit**: Compatibility with user's lifestyle
- **Segment Rating**: Expert rating in its category

### Usage

\`\`\`tsx
import BuyingPotential from '@/components/BuyingPotential';

<BuyingPotential 
  vehicleName="2025 Chevrolet Trax"
  bodyStyle="SUV"
  vehicleImage="https://example.com/trax.jpg"
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
    bodyStyle: {
      description: 'Vehicle body style for category matching',
      control: 'select',
      options: ['SUV', 'Sedan', 'Truck', 'Coupe', 'Hatchback', 'Convertible', 'Wagon'],
      table: {
        type: { summary: 'string' },
        category: 'Vehicle',
      },
    },
    vehicleImage: {
      description: 'URL to vehicle image',
      control: 'text',
      table: {
        type: { summary: 'string' },
        category: 'Media',
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
    bodyStyle: 'SUV',
    vehicleImage: 'https://d2kde5ohu8qb21.cloudfront.net/files/66466c119cbba1000852d79c/007-2025-chevrolet-trax-exterior-front-view.jpg',
  },
  parameters: {
    docs: {
      description: {
        story: 'Default buying potential score for a subcompact SUV.',
      },
    },
  },
};

export const SUV: Story = {
  args: {
    vehicleName: '2025 Chevrolet Trailblazer',
    bodyStyle: 'SUV',
    vehicleImage: 'https://d2kde5ohu8qb21.cloudfront.net/files/65f7e4f9417c9000085e7bba/003-2024-chevrolet-trailblazer-front-three-quarters-view.jpg',
  },
  parameters: {
    docs: {
      description: {
        story: 'Compact SUV showing different match factors.',
      },
    },
  },
};

export const Truck: Story = {
  args: {
    vehicleName: '2025 Chevrolet Silverado',
    bodyStyle: 'Truck',
    vehicleImage: 'https://d2kde5ohu8qb21.cloudfront.net/files/659f9ed490e84500088bd486/012-2024-lamborghini-revuelto.jpg',
  },
  parameters: {
    docs: {
      description: {
        story: 'Truck category with different lifestyle matching criteria.',
      },
    },
  },
};
