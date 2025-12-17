import type { Meta, StoryObj } from '@storybook/react';
import { OptimizedImage, VehicleImage, AvatarImage } from './OptimizedImage';

const meta: Meta<typeof OptimizedImage> = {
  title: 'Molecules/OptimizedImage',
  component: OptimizedImage,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Performant image component with lazy loading, shimmer placeholder, and error handling.',
      },
    },
  },

  argTypes: {
    aspectRatio: {
      control: 'select',
      options: ['1/1', '4/3', '16/9', '16/10', '21/9'],
    },
    objectFit: {
      control: 'select',
      options: ['cover', 'contain', 'fill', 'none'],
    },
    loading: {
      control: 'select',
      options: ['lazy', 'eager'],
    },
    showPlaceholder: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// 2025 Chevrolet Trax images
const TRAX_IMAGE_1 = 'https://d2kde5ohu8qb21.cloudfront.net/files/66466c119cbba1000852d79c/007-2025-chevrolet-trax-exterior-front-view.jpg';
const TRAX_IMAGE_2 = 'https://d2kde5ohu8qb21.cloudfront.net/files/66466c171a38f50008ca1b6e/009-2025-chevrolet-trax-exterior-side-view.jpg';
const TRAX_IMAGE_3 = 'https://d2kde5ohu8qb21.cloudfront.net/files/66466c139cbba1000852d79d/008-2025-chevrolet-trax-exterior-front-view.jpg';
const TRAX_IMAGE_4 = 'https://d2kde5ohu8qb21.cloudfront.net/files/66466c1e811993000831eb00/012-2025-chevrolet-trax-exterior-front-view.jpg';
const TRAX_IMAGE_5 = 'https://d2kde5ohu8qb21.cloudfront.net/files/66466c246e89190008af75b5/014-2025-chevrolet-trax-exterior-rear-view.jpg';
const TRAX_IMAGE_6 = 'https://d2kde5ohu8qb21.cloudfront.net/files/66466c05811993000831eaff/001-2025-chevrolet-trax-exterior-front-view.jpg';

// Default
export const Default: Story = {
  args: {
    src: TRAX_IMAGE_1,
    alt: '2025 Chevrolet Trax',
    aspectRatio: '16/9',
  },
  decorators: [(Story) => <div style={{ width: '400px' }}><Story /></div>],
};

// Aspect Ratios
export const AspectRatio16x9: Story = {
  args: {
    src: TRAX_IMAGE_1,
    alt: '2025 Chevrolet Trax',
    aspectRatio: '16/9',
  },
  decorators: [(Story) => <div style={{ width: '400px' }}><Story /></div>],
};

export const AspectRatio4x3: Story = {
  args: {
    src: TRAX_IMAGE_2,
    alt: '2025 Chevrolet Trax',
    aspectRatio: '4/3',
  },
  decorators: [(Story) => <div style={{ width: '400px' }}><Story /></div>],
};

export const AspectRatioSquare: Story = {
  args: {
    src: TRAX_IMAGE_3,
    alt: '2025 Chevrolet Trax',
    aspectRatio: '1/1',
  },
  decorators: [(Story) => <div style={{ width: '300px' }}><Story /></div>],
};

// Loading States
export const WithPlaceholder: Story = {
  args: {
    src: 'https://example.com/slow-loading-image.jpg', // Will show placeholder
    alt: 'Loading image',
    aspectRatio: '16/9',
    showPlaceholder: true,
  },
  decorators: [(Story) => <div style={{ width: '400px' }}><Story /></div>],
};

export const EagerLoading: Story = {
  args: {
    src: TRAX_IMAGE_4,
    alt: '2025 Chevrolet Trax',
    aspectRatio: '16/9',
    loading: 'eager',
  },
  decorators: [(Story) => <div style={{ width: '400px' }}><Story /></div>],
};

// Error State
export const ErrorFallback: Story = {
  args: {
    src: 'https://invalid-url.com/broken-image.jpg',
    alt: 'Broken image',
    aspectRatio: '16/9',
  },
  decorators: [(Story) => <div style={{ width: '400px' }}><Story /></div>],
};

// VehicleImage Preset
export const VehicleCard: Story = {
  render: () => (
    <div style={{ width: '300px' }}>
      <VehicleImage src={TRAX_IMAGE_1} alt="2025 Chevrolet Trax" size="card" />
    </div>
  ),
};

export const VehicleHero: Story = {
  render: () => (
    <div style={{ width: '600px' }}>
      <VehicleImage src={TRAX_IMAGE_6} alt="2025 Chevrolet Trax" size="hero" />
    </div>
  ),
};

export const VehicleThumbnail: Story = {
  render: () => (
    <div style={{ width: '150px' }}>
      <VehicleImage src={TRAX_IMAGE_3} alt="2025 Chevrolet Trax" size="thumbnail" />
    </div>
  ),
};

// AvatarImage Preset
export const Avatar: Story = {
  render: () => (
    <AvatarImage 
      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200" 
      alt="User avatar" 
      size={48}
    />
  ),
};

export const AvatarSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200" alt="User" size={32} />
      <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200" alt="User" size={48} />
      <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200" alt="User" size={64} />
      <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200" alt="User" size={96} />
    </div>
  ),
};

// Image Grid - 2025 Chevrolet Trax Gallery
export const ImageGrid: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', width: '600px' }}>
      <VehicleImage src={TRAX_IMAGE_1} alt="2025 Chevrolet Trax - Front View" size="card" />
      <VehicleImage src={TRAX_IMAGE_2} alt="2025 Chevrolet Trax - Side View" size="card" />
      <VehicleImage src={TRAX_IMAGE_3} alt="2025 Chevrolet Trax - Front Angle" size="card" />
      <VehicleImage src={TRAX_IMAGE_4} alt="2025 Chevrolet Trax - Front Quarter" size="card" />
      <VehicleImage src={TRAX_IMAGE_5} alt="2025 Chevrolet Trax - Rear View" size="card" />
      <VehicleImage src={TRAX_IMAGE_6} alt="2025 Chevrolet Trax - Hero Shot" size="card" />
    </div>
  ),
};
