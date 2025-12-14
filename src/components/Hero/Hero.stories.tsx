import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import Hero from './Hero';

const meta: Meta<typeof Hero> = {
  title: 'Organisms/Hero',
  component: Hero,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Hero section for vehicle detail pages with image gallery, ratings, and pricing.',
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

const sampleVehicle = {
  make: 'Toyota',
  model: 'Camry',
  year: 2024,
  tagline: 'The Toyota Camry offers excellent fuel economy and reliability. A compelling choice in the sedan segment.',
  rating: 8.5,
  priceRange: '$28,500 - $36,000',
  image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=1200',
  images: [
    'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800',
    'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800',
    'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800',
  ],
  photographer: 'CAR AND DRIVER',
  editorsChoice: true,
  tenBest: false,
};

export const Default: Story = {
  args: {
    vehicle: sampleVehicle,
  },
};

export const WithTenBest: Story = {
  args: {
    vehicle: {
      ...sampleVehicle,
      tenBest: true,
    },
  },
};

export const WithBothAwards: Story = {
  args: {
    vehicle: {
      ...sampleVehicle,
      editorsChoice: true,
      tenBest: true,
    },
  },
};

export const NoAwards: Story = {
  args: {
    vehicle: {
      ...sampleVehicle,
      editorsChoice: false,
      tenBest: false,
    },
  },
};

export const SUV: Story = {
  args: {
    vehicle: {
      make: 'Honda',
      model: 'CR-V',
      year: 2024,
      tagline: 'The Honda CR-V delivers practicality and versatility with excellent fuel economy.',
      rating: 9.0,
      priceRange: '$32,500 - $42,000',
      image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=1200',
      images: [],
      photographer: 'CAR AND DRIVER',
      editorsChoice: true,
      tenBest: true,
    },
  },
};
