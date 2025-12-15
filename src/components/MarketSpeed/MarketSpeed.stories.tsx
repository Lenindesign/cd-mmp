import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import MarketSpeed from './MarketSpeed';

const meta: Meta<typeof MarketSpeed> = {
  title: 'Organisms/MarketSpeed',
  component: MarketSpeed,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Shows how quickly vehicles are selling in the market.',
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
    make: 'Toyota',
    model: 'Camry',
    bodyStyle: 'Sedan',
    msrp: 28500,
  },
};

export const SUV: Story = {
  args: {
    vehicleName: '2024 Honda CR-V',
    make: 'Honda',
    model: 'CR-V',
    bodyStyle: 'SUV',
    msrp: 32500,
  },
};

export const Truck: Story = {
  args: {
    vehicleName: '2024 Ford F-150',
    make: 'Ford',
    model: 'F-150',
    bodyStyle: 'Truck',
    msrp: 36000,
  },
};
