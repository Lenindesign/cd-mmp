import type { Meta, StoryObj } from '@storybook/react';
import { OptimizedImage, VehicleImage, AvatarImage } from './OptimizedImage';

const meta: Meta<typeof OptimizedImage> = {
  title: 'Atoms/OptimizedImage',
  component: OptimizedImage,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Performant image component with lazy loading, shimmer placeholder, and error handling.',
      },
    },
  },
  tags: ['autodocs'],
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

const SAMPLE_CAR_IMAGE = 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800';
const SAMPLE_CAR_IMAGE_2 = 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800';

// Default
export const Default: Story = {
  args: {
    src: SAMPLE_CAR_IMAGE,
    alt: 'Sports car',
    aspectRatio: '16/9',
  },
  decorators: [(Story) => <div style={{ width: '400px' }}><Story /></div>],
};

// Aspect Ratios
export const AspectRatio16x9: Story = {
  args: {
    src: SAMPLE_CAR_IMAGE,
    alt: 'Car',
    aspectRatio: '16/9',
  },
  decorators: [(Story) => <div style={{ width: '400px' }}><Story /></div>],
};

export const AspectRatio4x3: Story = {
  args: {
    src: SAMPLE_CAR_IMAGE,
    alt: 'Car',
    aspectRatio: '4/3',
  },
  decorators: [(Story) => <div style={{ width: '400px' }}><Story /></div>],
};

export const AspectRatioSquare: Story = {
  args: {
    src: SAMPLE_CAR_IMAGE,
    alt: 'Car',
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
    src: SAMPLE_CAR_IMAGE,
    alt: 'Eager loaded image',
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
      <VehicleImage src={SAMPLE_CAR_IMAGE} alt="2024 Toyota Camry" size="card" />
    </div>
  ),
};

export const VehicleHero: Story = {
  render: () => (
    <div style={{ width: '600px' }}>
      <VehicleImage src={SAMPLE_CAR_IMAGE_2} alt="2024 Toyota Camry" size="hero" />
    </div>
  ),
};

export const VehicleThumbnail: Story = {
  render: () => (
    <div style={{ width: '150px' }}>
      <VehicleImage src={SAMPLE_CAR_IMAGE} alt="2024 Toyota Camry" size="thumbnail" />
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

// Image Grid
export const ImageGrid: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', width: '600px' }}>
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <VehicleImage 
          key={i}
          src={`https://images.unsplash.com/photo-${1549399542 + i}-7e3f8b79c341?w=400`} 
          alt={`Car ${i}`} 
          size="card"
        />
      ))}
    </div>
  ),
};

