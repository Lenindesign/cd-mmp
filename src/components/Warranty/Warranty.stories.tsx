import type { Meta, StoryObj } from '@storybook/react';
import { FileText, Wrench, Shield, Calendar } from 'lucide-react';
import Warranty from './Warranty';

const meta: Meta<typeof Warranty> = {
  title: 'Molecules/Warranty',
  component: Warranty,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Displays vehicle warranty information.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const defaultItems = [
  {
    icon: <FileText size={28} />,
    title: 'Basic Warranty',
    coverage: '3 years / 36,000 miles',
    description: 'Covers most vehicle components against defects in materials and workmanship.',
  },
  {
    icon: <Wrench size={28} />,
    title: 'Powertrain Warranty',
    coverage: '5 years / 60,000 miles',
    description: 'Covers the engine, transmission, and drive system components.',
  },
  {
    icon: <Shield size={28} />,
    title: 'Corrosion Warranty',
    coverage: '6 years / 100,000 miles',
    description: 'Protects against rust-through on body sheet metal panels.',
  },
  {
    icon: <Calendar size={28} />,
    title: 'Roadside Assistance',
    coverage: '5 years / 60,000 miles',
    description: 'Includes 24/7 emergency towing, flat tire change, and more.',
  },
];

export const Default: Story = {
  args: {
    items: defaultItems,
  },
};

export const CustomTitle: Story = {
  args: {
    items: defaultItems,
    title: 'Protection Plans',
  },
};

export const LuxuryBrand: Story = {
  args: {
    items: [
      {
        icon: <FileText size={28} />,
        title: 'New Vehicle Limited Warranty',
        coverage: '4 years / 50,000 miles',
        description: 'Comprehensive coverage for vehicle defects.',
      },
      {
        icon: <Wrench size={28} />,
        title: 'Powertrain Warranty',
        coverage: '6 years / 70,000 miles',
        description: 'Extended powertrain protection.',
      },
      {
        icon: <Shield size={28} />,
        title: 'Rust Perforation',
        coverage: '12 years / Unlimited',
        description: 'Industry-leading corrosion protection.',
      },
      {
        icon: <Calendar size={28} />,
        title: 'Complimentary Maintenance',
        coverage: '3 years / 36,000 miles',
        description: 'Includes scheduled maintenance services.',
      },
    ],
  },
};
