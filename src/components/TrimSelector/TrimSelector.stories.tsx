import type { Meta, StoryObj } from '@storybook/react';
import TrimSelector from './TrimSelector';

const meta: Meta<typeof TrimSelector> = {
  title: 'Organisms/TrimSelector',
  component: TrimSelector,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Allows users to select and compare different trim levels.',
      },
    },
  },

};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleTrims = [
  {
    id: 'le',
    name: 'LE',
    price: '$28,500',
    features: ['8" Touchscreen', 'Apple CarPlay', 'Safety Sense 3.0'],
    recommended: false,
  },
  {
    id: 'se',
    name: 'SE',
    price: '$31,200',
    features: ['Sportier Styling', 'Paddle Shifters', '18" Alloy Wheels'],
    recommended: true,
  },
  {
    id: 'xle',
    name: 'XLE',
    price: '$34,500',
    features: ['Leather Seats', 'Sunroof', 'JBL Audio'],
    recommended: false,
  },
  {
    id: 'xse',
    name: 'XSE',
    price: '$36,800',
    features: ['Sport Suspension', 'Black Accents', 'Larger Display'],
    recommended: false,
  },
];

export const Default: Story = {
  args: {
    trims: sampleTrims,
  },
};

export const WithSubtitle: Story = {
  args: {
    trims: sampleTrims,
    title: 'Choose Your Trim',
    subtitle: 'Select the perfect configuration for your needs',
  },
};

export const TwoTrims: Story = {
  args: {
    trims: sampleTrims.slice(0, 2),
  },
};

export const ThreeTrims: Story = {
  args: {
    trims: sampleTrims.slice(0, 3),
  },
};
