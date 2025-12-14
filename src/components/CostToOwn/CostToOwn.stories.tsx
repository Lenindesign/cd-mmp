import type { Meta, StoryObj } from '@storybook/react';
import CostToOwn from './CostToOwn';

const meta: Meta<typeof CostToOwn> = {
  title: 'Molecules/CostToOwn',
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
    vehicleName: '2024 Toyota Camry',
    msrp: 28500,
    fuelType: 'Gas',
  },
};

export const WithTrims: Story = {
  args: {
    vehicleName: '2024 Toyota Camry',
    msrp: 28500,
    fuelType: 'Gas',
    trims: [
      { name: 'LE', msrp: 28500 },
      { name: 'SE', msrp: 31200 },
      { name: 'XLE', msrp: 34500 },
      { name: 'XSE', msrp: 36800 },
    ],
  },
};

export const Electric: Story = {
  args: {
    vehicleName: '2024 Tesla Model 3',
    msrp: 42000,
    fuelType: 'Electric',
    trims: [
      { name: 'Standard Range Plus', msrp: 42000 },
      { name: 'Long Range', msrp: 52000 },
      { name: 'Performance', msrp: 58000 },
    ],
  },
};

export const Hybrid: Story = {
  args: {
    vehicleName: '2024 Toyota Prius',
    msrp: 32000,
    fuelType: 'Hybrid',
  },
};

export const Luxury: Story = {
  args: {
    vehicleName: '2024 BMW 5 Series',
    msrp: 56000,
    fuelType: 'Gas',
    trims: [
      { name: '530i', msrp: 56000 },
      { name: '530i xDrive', msrp: 58500 },
      { name: 'M550i xDrive', msrp: 78000 },
    ],
  },
};

export const Exotic: Story = {
  args: {
    vehicleName: '2024 Porsche 911 Turbo S',
    msrp: 225000,
    fuelType: 'Gas',
  },
};
