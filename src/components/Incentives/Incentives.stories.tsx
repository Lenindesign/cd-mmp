import type { Meta, StoryObj } from '@storybook/react';
import Incentives from './Incentives';

const meta: Meta<typeof Incentives> = {
  title: 'Organisms/Incentives',
  component: Incentives,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Displays current incentives, rebates, and special offers for vehicles.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    make: 'Toyota',
    model: 'Camry',
  },
};

export const LuxuryBrand: Story = {
  args: {
    make: 'BMW',
    model: '3 Series',
  },
};

export const Electric: Story = {
  args: {
    make: 'Tesla',
    model: 'Model 3',
  },
};

