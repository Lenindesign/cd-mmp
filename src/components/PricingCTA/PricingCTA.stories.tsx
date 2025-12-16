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
    vehicleName: '2025 Chevrolet Trax',
    make: 'Chevrolet',
    model: 'Trax',
    msrp: 21895,
  },
};

export const SUV: Story = {
  args: {
    vehicleName: '2025 Chevrolet Trailblazer',
    make: 'Chevrolet',
    model: 'Trailblazer',
    msrp: 24995,
    location: 'Los Angeles, CA',
  },
};

export const Luxury: Story = {
  args: {
    vehicleName: '2025 Chevrolet Camaro',
    make: 'Chevrolet',
    model: 'Camaro',
    msrp: 29100,
    location: 'New York, NY',
  },
};

export const Truck: Story = {
  args: {
    vehicleName: '2025 Chevrolet Silverado',
    make: 'Chevrolet',
    model: 'Silverado',
    msrp: 36000,
    location: 'Dallas, TX',
  },
};

export const Budget: Story = {
  args: {
    vehicleName: '2025 Chevrolet Trax LS',
    make: 'Chevrolet',
    model: 'Trax',
    msrp: 21895,
    location: 'Miami, FL',
  },
};
