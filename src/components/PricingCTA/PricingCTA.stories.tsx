import type { Meta, StoryObj } from '@storybook/react';
import { PricingCTAV1B } from './PricingCTA';

const meta: Meta<typeof PricingCTAV1B> = {
  title: 'Organisms/PricingCTA',
  component: PricingCTAV1B,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Full-width pricing call-to-action section with lead generation.',
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
    make: 'Toyota',
    model: 'Camry',
    msrp: 28500,
  },
};

export const SUV: Story = {
  args: {
    vehicleName: '2024 Honda CR-V',
    make: 'Honda',
    model: 'CR-V',
    msrp: 32500,
    location: 'Los Angeles, CA',
  },
};

export const Luxury: Story = {
  args: {
    vehicleName: '2024 BMW 5 Series',
    make: 'BMW',
    model: '5 Series',
    msrp: 56000,
    location: 'New York, NY',
  },
};

export const Truck: Story = {
  args: {
    vehicleName: '2024 Ford F-150',
    make: 'Ford',
    model: 'F-150',
    msrp: 42000,
    location: 'Dallas, TX',
  },
};

export const Budget: Story = {
  args: {
    vehicleName: '2024 Kia Forte',
    make: 'Kia',
    model: 'Forte',
    msrp: 20500,
    location: 'Miami, FL',
  },
};
