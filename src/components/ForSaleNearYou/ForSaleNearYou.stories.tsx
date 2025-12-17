import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import ForSaleNearYou from './ForSaleNearYou';

const meta: Meta<typeof ForSaleNearYou> = {
  title: 'Organisms/ForSaleNearYou',
  component: ForSaleNearYou,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Carousel of vehicles for sale near the user location.',
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
    vehicleName: 'Toyota Camry',
    make: 'Toyota',
    model: 'Camry',
  },
};

export const SUV: Story = {
  args: {
    vehicleName: 'Honda CR-V',
    make: 'Honda',
    model: 'CR-V',
    bodyStyle: 'SUV',
    maxPrice: 40000,
    location: 'Los Angeles, CA',
  },
};

export const CustomTitle: Story = {
  args: {
    title: 'Similar Vehicles Near You',
    make: 'Toyota',
    bodyStyle: 'Sedan',
    location: 'New York, NY',
  },
};

export const Truck: Story = {
  args: {
    vehicleName: 'Ford F-150',
    make: 'Ford',
    model: 'F-150',
    bodyStyle: 'Truck',
    maxPrice: 60000,
    location: 'Dallas, TX',
  },
};
