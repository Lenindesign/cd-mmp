import type { Meta, StoryObj } from '@storybook/react';
import { ImageGallery } from './ImageGallery';
import { vehicleDatabase } from '../../data/vehicles';

// Get vehicles with gallery images
const vehiclesWithGallery = vehicleDatabase.filter(v => v.galleryImages && v.galleryImages.length > 0);
const sampleVehicle = vehiclesWithGallery[0] || vehicleDatabase[0];
const sedans = vehicleDatabase.filter(v => v.bodyStyle === 'Sedan').slice(0, 6);
const suvs = vehicleDatabase.filter(v => v.bodyStyle === 'SUV').slice(0, 8);

const meta: Meta<typeof ImageGallery> = {
  title: 'Resin Components/ImageGallery',
  component: ImageGallery,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
## Image Gallery

A carousel/slideshow component for displaying image collections.
Inspired by Hearst's listicle image galleries.

### Features
- Navigation arrows
- Image counter
- Thumbnail navigation
- Dot navigation (compact variant)
- Auto-play with play/pause toggle
- Multiple aspect ratios (16:9, 4:3, 1:1, 3:2)
- Image captions and credits
- Three variants: default, fullwidth, compact

### Usage
\`\`\`tsx
<ImageGallery
  title="2025 Honda Accord Gallery"
  images={[
    {
      id: 1,
      src: '/path/to/image1.jpg',
      alt: 'Front view',
      caption: 'The bold new front fascia',
      credit: 'Car and Driver',
    },
    // ... more images
  ]}
  showThumbnails={true}
  showCounter={true}
  showCaptions={true}
  aspectRatio="16:9"
/>
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    aspectRatio: {
      control: 'radio',
      options: ['16:9', '4:3', '1:1', '3:2'],
      description: 'Aspect ratio of the gallery',
    },
    variant: {
      control: 'radio',
      options: ['default', 'fullwidth', 'compact'],
      description: 'Visual style variant',
    },
    showThumbnails: {
      control: 'boolean',
      description: 'Show thumbnail navigation',
    },
    showCounter: {
      control: 'boolean',
      description: 'Show image counter',
    },
    showCaptions: {
      control: 'boolean',
      description: 'Show image captions',
    },
    autoPlay: {
      control: { type: 'range', min: 0, max: 10000, step: 1000 },
      description: 'Auto-play interval in milliseconds (0 to disable)',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ImageGallery>;

// Create gallery images from vehicle data
const createGalleryImages = (vehicle: typeof sampleVehicle) => {
  const images = [
    {
      id: `${vehicle.id}-main`,
      src: vehicle.image,
      alt: `${vehicle.year} ${vehicle.make} ${vehicle.model} - Main View`,
      caption: `The ${vehicle.year} ${vehicle.make} ${vehicle.model} features a bold design with modern styling cues.`,
      credit: 'Car and Driver',
    },
  ];

  // Add gallery images if available
  if (vehicle.galleryImages) {
    vehicle.galleryImages.forEach((img, index) => {
      images.push({
        id: `${vehicle.id}-gallery-${index}`,
        src: img,
        alt: `${vehicle.year} ${vehicle.make} ${vehicle.model} - View ${index + 2}`,
        caption: index === 0 ? 'Interior showcases premium materials and intuitive controls.' :
                 index === 1 ? 'Rear design complements the aggressive front styling.' :
                 `Additional view of the ${vehicle.year} ${vehicle.make} ${vehicle.model}.`,
        credit: 'Car and Driver',
      });
    });
  }

  return images;
};

// Create a collection from multiple vehicles
const multiVehicleGallery = sedans.slice(0, 6).map((v, index) => ({
  id: v.id,
  src: v.image,
  alt: `${v.year} ${v.make} ${v.model}`,
  caption: `${index + 1}. ${v.year} ${v.make} ${v.model} - ${v.priceRange}`,
  credit: 'Car and Driver',
}));

const suvGallery = suvs.map((v, index) => ({
  id: v.id,
  src: v.image,
  alt: `${v.year} ${v.make} ${v.model}`,
  caption: `${v.year} ${v.make} ${v.model} - Starting at ${v.priceRange}`,
  credit: v.editorsChoice ? "Editors' Choice - Car and Driver" : 'Car and Driver',
}));

export const Default: Story = {
  args: {
    title: `${sampleVehicle.year} ${sampleVehicle.make} ${sampleVehicle.model} Gallery`,
    images: createGalleryImages(sampleVehicle),
    showThumbnails: true,
    showCounter: true,
    showCaptions: true,
    aspectRatio: '16:9',
    variant: 'default',
  },
};

export const BestSedansGallery: Story = {
  args: {
    title: 'Best Sedans of 2025',
    images: multiVehicleGallery,
    showThumbnails: true,
    showCounter: true,
    showCaptions: true,
    aspectRatio: '16:9',
    variant: 'default',
  },
};

export const SUVShowcase: Story = {
  args: {
    title: 'Top SUVs for Every Budget',
    images: suvGallery,
    showThumbnails: true,
    showCounter: true,
    showCaptions: true,
    aspectRatio: '4:3',
    variant: 'default',
  },
};

export const Compact: Story = {
  args: {
    title: 'Quick Look',
    images: multiVehicleGallery.slice(0, 4),
    showThumbnails: false,
    showCounter: true,
    showCaptions: true,
    aspectRatio: '16:9',
    variant: 'compact',
  },
};

export const Fullwidth: Story = {
  args: {
    images: suvGallery.slice(0, 5),
    showThumbnails: true,
    showCounter: true,
    showCaptions: true,
    aspectRatio: '16:9',
    variant: 'fullwidth',
  },
};

export const SquareAspect: Story = {
  args: {
    title: 'Vehicle Highlights',
    images: multiVehicleGallery.slice(0, 4),
    showThumbnails: true,
    showCounter: true,
    showCaptions: false,
    aspectRatio: '1:1',
    variant: 'default',
  },
};

export const WithAutoPlay: Story = {
  args: {
    title: 'Auto-Playing Slideshow',
    images: suvGallery.slice(0, 5),
    showThumbnails: true,
    showCounter: true,
    showCaptions: true,
    aspectRatio: '16:9',
    variant: 'default',
    autoPlay: 4000,
  },
};

export const NoCaptions: Story = {
  args: {
    title: 'Clean Gallery View',
    images: multiVehicleGallery.map(img => ({ ...img, caption: undefined, credit: undefined })),
    showThumbnails: true,
    showCounter: true,
    showCaptions: false,
    aspectRatio: '16:9',
    variant: 'default',
  },
};

export const MinimalControls: Story = {
  args: {
    images: suvGallery.slice(0, 4),
    showThumbnails: false,
    showCounter: false,
    showCaptions: false,
    aspectRatio: '16:9',
    variant: 'compact',
  },
};

// In article context
export const InArticleContext: Story = {
  render: () => (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '16px' }}>
        Best Sedans of 2025: Our Top Picks
      </h1>
      <p style={{ lineHeight: 1.7, color: '#374151', marginBottom: '24px' }}>
        We've tested dozens of sedans to bring you our definitive ranking of the best 
        options for 2025. From efficient commuters to luxury cruisers, these are the 
        sedans that impressed us most.
      </p>

      <ImageGallery
        title="Top 6 Sedans Gallery"
        images={multiVehicleGallery}
        showThumbnails={true}
        showCounter={true}
        showCaptions={true}
        aspectRatio="16:9"
        variant="default"
      />

      <p style={{ lineHeight: 1.7, color: '#374151', marginTop: '24px' }}>
        Each of these sedans offers something unique, whether it's exceptional fuel 
        economy, cutting-edge technology, or pure driving enjoyment. Read on for our 
        detailed analysis of each model.
      </p>
    </div>
  ),
};

