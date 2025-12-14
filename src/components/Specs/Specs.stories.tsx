import type { Meta, StoryObj } from '@storybook/react';
import { Gauge, Zap, Fuel, Timer, Weight, Ruler } from 'lucide-react';
import Specs from './Specs';

const meta: Meta<typeof Specs> = {
  title: 'Molecules/Specs',
  component: Specs,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Full specifications table for a vehicle.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const defaultCategories = [
  {
    id: 'engine',
    title: 'Engine & Performance',
    icon: <Gauge size={20} />,
    specs: [
      { label: 'Engine Type', value: '2.5L 4-Cylinder' },
      { label: 'Horsepower', value: '203 hp @ 6,600 rpm' },
      { label: 'Torque', value: '184 lb-ft @ 5,000 rpm' },
      { label: 'Transmission', value: '8-Speed Automatic' },
    ],
  },
  {
    id: 'fuel',
    title: 'Fuel Economy',
    icon: <Fuel size={20} />,
    specs: [
      { label: 'City MPG', value: '28 mpg' },
      { label: 'Highway MPG', value: '39 mpg' },
      { label: 'Combined MPG', value: '32 mpg' },
      { label: 'Fuel Tank Capacity', value: '15.8 gal' },
    ],
  },
  {
    id: 'dimensions',
    title: 'Dimensions',
    icon: <Ruler size={20} />,
    specs: [
      { label: 'Length', value: '192.1 in' },
      { label: 'Width', value: '72.4 in' },
      { label: 'Height', value: '56.9 in' },
      { label: 'Wheelbase', value: '111.2 in' },
    ],
  },
];

export const Default: Story = {
  args: {
    categories: defaultCategories,
  },
};

export const WithDescription: Story = {
  args: {
    categories: defaultCategories,
    title: 'Technical Specifications',
    description: 'Detailed specifications for all trim levels',
  },
};

export const Electric: Story = {
  args: {
    categories: [
      {
        id: 'battery',
        title: 'Battery & Range',
        icon: <Zap size={20} />,
        specs: [
          { label: 'Battery Capacity', value: '82 kWh' },
          { label: 'EPA Range', value: '300 miles' },
          { label: 'Fast Charging', value: '0-80% in 30 min' },
          { label: 'Home Charging', value: '10 hrs (240V)' },
        ],
      },
      {
        id: 'performance',
        title: 'Performance',
        icon: <Timer size={20} />,
        specs: [
          { label: 'Motor Power', value: '450 hp (combined)' },
          { label: '0-60 mph', value: '4.2 seconds' },
          { label: 'Top Speed', value: '135 mph' },
          { label: 'Drive Type', value: 'Dual Motor AWD' },
        ],
      },
      {
        id: 'weight',
        title: 'Weight & Capacity',
        icon: <Weight size={20} />,
        specs: [
          { label: 'Curb Weight', value: '4,850 lbs' },
          { label: 'Cargo Volume', value: '28 cu ft' },
          { label: 'Towing Capacity', value: '5,000 lbs' },
          { label: 'Seating', value: '5 passengers' },
        ],
      },
    ],
    title: 'Electric Vehicle Specs',
  },
};
