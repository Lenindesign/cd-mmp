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
    vehicleName: '2025 Chevrolet Trax',
    make: 'Chevrolet',
    model: 'Trax',
    bodyStyle: 'SUV',
    msrp: 21895,
  },
};

export const SUV: Story = {
  args: {
    vehicleName: '2025 Chevrolet Trailblazer',
    make: 'Chevrolet',
    model: 'Trailblazer',
    bodyStyle: 'SUV',
    msrp: 24995,
  },
};

export const Truck: Story = {
  args: {
    vehicleName: '2025 Chevrolet Silverado',
    make: 'Chevrolet',
    model: 'Silverado',
    bodyStyle: 'Truck',
    msrp: 36000,
  },
};
