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

// 2025 Chevrolet Trax - Main demo vehicle
const chevroletTrax = {
  make: 'Chevrolet',
  model: 'Trax',
  year: 2025,
  tagline: 'The Chevrolet Trax offers excellent value and modern features. A compelling choice in the subcompact SUV segment.',
  rating: 10,
  priceRange: '$20,400 - $24,400',
  image: 'https://d2kde5ohu8qb21.cloudfront.net/files/66466c119cbba1000852d79c/007-2025-chevrolet-trax-exterior-front-view.jpg',
  galleryImages: [
    'https://d2kde5ohu8qb21.cloudfront.net/files/66466c119cbba1000852d79c/007-2025-chevrolet-trax-exterior-front-view.jpg',
    'https://d2kde5ohu8qb21.cloudfront.net/files/66466c171a38f50008ca1b6e/009-2025-chevrolet-trax-exterior-side-view.jpg',
    'https://d2kde5ohu8qb21.cloudfront.net/files/66466c139cbba1000852d79d/008-2025-chevrolet-trax-exterior-front-view.jpg',
    'https://d2kde5ohu8qb21.cloudfront.net/files/66466c1e811993000831eb00/012-2025-chevrolet-trax-exterior-front-view.jpg',
    'https://d2kde5ohu8qb21.cloudfront.net/files/66466c246e89190008af75b5/014-2025-chevrolet-trax-exterior-rear-view.jpg',
    'https://d2kde5ohu8qb21.cloudfront.net/files/66466c05811993000831eaff/001-2025-chevrolet-trax-exterior-front-view.jpg',
  ],
  photographer: 'CAR AND DRIVER',
  editorsChoice: true,
  tenBest: true,
};

export const Default: Story = {
  args: {
    vehicle: chevroletTrax,
  },
};

export const WithTenBest: Story = {
  args: {
    vehicle: {
      ...chevroletTrax,
      editorsChoice: false,
      tenBest: true,
    },
  },
};

export const WithBothAwards: Story = {
  args: {
    vehicle: {
      ...chevroletTrax,
      editorsChoice: true,
      tenBest: true,
    },
  },
};

export const NoAwards: Story = {
  args: {
    vehicle: {
      ...chevroletTrax,
      editorsChoice: false,
      tenBest: false,
    },
  },
};

export const SUV: Story = {
  args: {
    vehicle: {
      make: 'Chevrolet',
      model: 'Trailblazer',
      year: 2024,
      tagline: 'The Chevrolet Trailblazer delivers style and versatility with excellent value.',
      rating: 7.5,
      priceRange: '$24,995 - $31,895',
      image: 'https://d2kde5ohu8qb21.cloudfront.net/files/65f7e4f9417c9000085e7bba/003-2024-chevrolet-trailblazer-front-three-quarters-view.jpg',
      galleryImages: [
        'https://d2kde5ohu8qb21.cloudfront.net/files/65f7e4f9417c9000085e7bba/003-2024-chevrolet-trailblazer-front-three-quarters-view.jpg',
        'https://d2kde5ohu8qb21.cloudfront.net/files/65f7e4f9cc1a540008a57c2c/002-2024-chevrolet-trailblazer-front-view.jpg',
      ],
      photographer: 'CAR AND DRIVER',
      editorsChoice: false,
      tenBest: false,
    },
  },
};

export const WithAnimatedButtons: Story = {
  args: {
    vehicle: chevroletTrax,
    animateButtons: true,
  },
};
