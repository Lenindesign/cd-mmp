import type { Meta, StoryObj } from '@storybook/react';
import TargetPriceRange from './TargetPriceRange';

const meta: Meta<typeof TargetPriceRange> = {
  title: 'Molecules/TargetPriceRange',
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
    vehicleName: '2024 Toyota Camry',
    msrp: 28500,
    trims: [
      { name: 'LE FWD', msrp: 28500 },
      { name: 'SE FWD', msrp: 31200 },
      { name: 'XLE FWD', msrp: 34500 },
      { name: 'XSE FWD', msrp: 36800 },
    ],
  },
};

export const LuxuryVehicle: Story = {
  args: {
    vehicleName: '2024 BMW 5 Series',
    msrp: 56000,
    trims: [
      { name: '530i', msrp: 56000 },
      { name: '530i xDrive', msrp: 58500 },
      { name: 'M550i xDrive', msrp: 78000 },
    ],
  },
};

export const BudgetVehicle: Story = {
  args: {
    vehicleName: '2024 Kia Forte',
    msrp: 20500,
    trims: [
      { name: 'FE', msrp: 20500 },
      { name: 'LXS', msrp: 22500 },
      { name: 'GT', msrp: 26000 },
    ],
  },
};

export const HighEndLuxury: Story = {
  args: {
    vehicleName: '2024 Porsche 911',
    msrp: 115000,
    trims: [
      { name: 'Carrera', msrp: 115000 },
      { name: 'Carrera S', msrp: 130000 },
      { name: 'Turbo S', msrp: 215000 },
    ],
  },
};
