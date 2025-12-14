import type { Meta, StoryObj } from '@storybook/react';
import Overview from './Overview';

const meta: Meta<typeof Overview> = {
  title: 'Molecules/Overview',
  component: Overview,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Vehicle overview section with pros, cons, and verdict.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    year: 2024,
    pros: [
      'Excellent fuel economy',
      'Spacious interior for its class',
      'User-friendly infotainment system',
      'Composed ride quality',
      'Standard safety features',
    ],
    cons: [
      'Modest engine power',
      'No all-wheel-drive option',
      'Basic interior materials',
    ],
    whatsNew: [
      'Redesigned front fascia with new grille',
      'Updated infotainment system with larger screen',
      'New exterior color options',
    ],
    verdict: 'The 2024 model delivers exceptional value with its combination of fuel efficiency, practicality, and technology features. An excellent choice for budget-conscious buyers seeking reliable transportation.',
  },
};

export const SUV: Story = {
  args: {
    year: 2024,
    pros: [
      'Versatile cargo space',
      'Available all-wheel drive',
      'High seating position',
      'Family-friendly features',
    ],
    cons: [
      'Higher fuel consumption',
      'Can feel cumbersome in tight spaces',
    ],
    whatsNew: [
      'New hybrid powertrain option',
      'Enhanced safety suite',
      'Updated interior design',
    ],
    verdict: 'A well-rounded SUV that excels in practicality and comfort, making it ideal for families and active lifestyles.',
  },
};

export const Luxury: Story = {
  args: {
    year: 2024,
    pros: [
      'Premium interior materials',
      'Powerful engine options',
      'Advanced technology features',
      'Smooth, refined ride',
      'Prestigious brand image',
    ],
    cons: [
      'Higher price point',
      'Expensive maintenance',
      'Complex infotainment learning curve',
    ],
    whatsNew: [
      'Redesigned exterior styling',
      'New autonomous driving features',
      'Upgraded sound system',
      'Electric powertrain option',
    ],
    verdict: 'A luxury sedan that delivers on all fronts: performance, comfort, and technology. Worth the investment for discerning buyers.',
  },
};
