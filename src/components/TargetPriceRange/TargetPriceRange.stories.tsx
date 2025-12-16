import type { Meta, StoryObj } from '@storybook/react';
import TargetPriceRange from './TargetPriceRange';

const meta: Meta<typeof TargetPriceRange> = {
  title: 'Organisms/TargetPriceRange',
  component: TargetPriceRange,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Shows the target price range with market analysis for a vehicle.',
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
    trims: [
      { name: 'LS FWD', msrp: 21895 },
      { name: '1RS FWD', msrp: 23195 },
      { name: 'LT FWD', msrp: 23395 },
      { name: 'RS FWD', msrp: 24995 },
      { name: 'ACTIV FWD', msrp: 24995 },
    ],
  },
};

export const LuxuryVehicle: Story = {
  args: {
    vehicleName: '2025 Chevrolet Trailblazer',
    msrp: 24995,
    trims: [
      { name: 'LS', msrp: 24995 },
      { name: 'LT', msrp: 27295 },
      { name: 'ACTIV', msrp: 29995 },
      { name: 'RS', msrp: 31895 },
    ],
  },
};

export const BudgetVehicle: Story = {
  args: {
    vehicleName: '2025 Chevrolet Trax LS',
    msrp: 21895,
    trims: [
      { name: 'LS FWD', msrp: 21895 },
      { name: '1RS FWD', msrp: 23195 },
    ],
  },
};

export const HighEndLuxury: Story = {
  args: {
    vehicleName: '2025 Chevrolet Camaro',
    msrp: 29100,
    trims: [
      { name: '1LS', msrp: 29100 },
      { name: '1LT', msrp: 30700 },
      { name: '2LT', msrp: 32700 },
      { name: 'SS', msrp: 44100 },
      { name: 'ZL1', msrp: 71700 },
    ],
  },
};
