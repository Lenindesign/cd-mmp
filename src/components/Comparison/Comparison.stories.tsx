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
      make: 'Toyota',
      model: 'Camry',
    },
  },
};

export const SUV: Story = {
  args: {
    currentVehicle: {
      make: 'Honda',
      model: 'CR-V',
    },
    title: 'Compare SUVs',
  },
};

export const Truck: Story = {
  args: {
    currentVehicle: {
      make: 'Ford',
      model: 'F-150',
    },
    title: 'Compare Trucks',
  },
};

export const CustomTitle: Story = {
  args: {
    currentVehicle: {
      make: 'Toyota',
      model: 'Camry',
    },
    title: 'Similar Vehicles to Consider',
  },
};
