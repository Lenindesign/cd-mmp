import type { Meta, StoryObj } from '@storybook/react';
import CostToOwn from './CostToOwn';

const meta: Meta<typeof CostToOwn> = {
  title: 'Organisms/CostToOwn',
  component: CostToOwn,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Displays estimated 5-year cost of ownership breakdown.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    vehicleName: '2025 Chevrolet Trax',
    msrp: 21895,
    fuelType: 'Gas',
  },
};

export const WithTrims: Story = {
  args: {
    vehicleName: '2025 Chevrolet Trax',
    msrp: 21895,
    fuelType: 'Gas',
    trims: [
      { name: 'LS', msrp: 21895 },
      { name: '1RS', msrp: 23195 },
      { name: 'LT', msrp: 23395 },
      { name: 'RS', msrp: 24995 },
      { name: 'ACTIV', msrp: 24995 },
    ],
  },
};

export const Electric: Story = {
  args: {
    vehicleName: '2025 Chevrolet Bolt EV',
    msrp: 27495,
    fuelType: 'Electric',
    trims: [
      { name: '1LT', msrp: 27495 },
      { name: '2LT', msrp: 31495 },
    ],
  },
};

export const Hybrid: Story = {
  args: {
    vehicleName: '2025 Chevrolet Trailblazer',
    msrp: 24995,
    fuelType: 'Gas',
  },
};

export const Luxury: Story = {
  args: {
    vehicleName: '2025 Chevrolet Camaro',
    msrp: 29100,
    fuelType: 'Gas',
    trims: [
      { name: '1LS', msrp: 29100 },
      { name: '1LT', msrp: 30700 },
      { name: 'SS', msrp: 44100 },
      { name: 'ZL1', msrp: 71700 },
    ],
  },
};

export const Exotic: Story = {
  args: {
    vehicleName: '2025 Chevrolet Corvette',
    msrp: 65000,
    fuelType: 'Gas',
  },
};
