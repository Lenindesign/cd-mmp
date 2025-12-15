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
        component: 'Shows the buying potential and match score for a vehicle based on user preferences.',
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
    vehicleName: '2024 Toyota Camry',
    bodyStyle: 'Sedan',
    vehicleImage: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400',
  },
};

export const SUV: Story = {
  args: {
    vehicleName: '2024 Honda CR-V',
    bodyStyle: 'SUV',
    vehicleImage: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=400',
  },
};

export const Truck: Story = {
  args: {
    vehicleName: '2024 Ford F-150',
    bodyStyle: 'Truck',
    vehicleImage: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=400',
  },
};
