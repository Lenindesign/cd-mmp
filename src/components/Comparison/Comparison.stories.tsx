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
        component: 'Compare vehicle with similar competitors.',
      },
    },
  },
  tags: ['autodocs'],
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
};

export const SUV: Story = {
  args: {
    currentVehicle: {
      make: 'Chevrolet',
      model: 'Trailblazer',
    },
    title: 'Compare SUVs',
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
};

export const CustomTitle: Story = {
  args: {
    currentVehicle: {
      make: 'Chevrolet',
      model: 'Trax',
    },
    title: 'Similar Vehicles to Consider',
  },
};
