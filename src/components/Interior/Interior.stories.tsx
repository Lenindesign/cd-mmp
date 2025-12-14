import type { Meta, StoryObj } from '@storybook/react';
import { Monitor, Wifi, Smartphone, Volume2, Sun, Armchair } from 'lucide-react';
import Interior from './Interior';

const meta: Meta<typeof Interior> = {
  title: 'Molecules/Interior',
  component: Interior,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Interior features and highlights section.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const defaultFeatures = [
  {
    icon: <Monitor size={24} />,
    title: 'Touchscreen Display',
    description: '11.6-inch HD touchscreen with wireless Apple CarPlay and Android Auto',
  },
  {
    icon: <Wifi size={24} />,
    title: 'Wi-Fi Hotspot',
    description: 'Built-in 4G LTE Wi-Fi hotspot for up to 7 devices',
  },
  {
    icon: <Smartphone size={24} />,
    title: 'Wireless Charging',
    description: 'Qi-compatible wireless smartphone charging pad',
  },
  {
    icon: <Volume2 size={24} />,
    title: 'Premium Audio',
    description: 'Bose premium 9-speaker sound system',
  },
  {
    icon: <Sun size={24} />,
    title: 'Panoramic Sunroof',
    description: 'Power tilt-and-slide moonroof with sunshade',
  },
  {
    icon: <Armchair size={24} />,
    title: 'Heated Seats',
    description: 'Heated and ventilated front seats with lumbar support',
  },
];

const defaultImages = [
  'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800',
  'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800',
  'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800',
];

export const Default: Story = {
  args: {
    features: defaultFeatures,
    images: defaultImages,
  },
};

export const WithDescription: Story = {
  args: {
    features: defaultFeatures,
    images: defaultImages,
    title: 'Interior Features',
    description: 'Discover the comfort and technology features of this vehicle',
  },
};

export const LuxuryInterior: Story = {
  args: {
    features: [
      {
        icon: <Monitor size={24} />,
        title: 'Curved OLED Display',
        description: '12.3-inch driver display + 14.9-inch infotainment screen',
      },
      {
        icon: <Volume2 size={24} />,
        title: 'Burmester 3D Sound',
        description: '21-speaker Burmester surround sound system',
      },
      {
        icon: <Armchair size={24} />,
        title: 'Massage Seats',
        description: 'Multi-contour seats with massage function and memory',
      },
      {
        icon: <Sun size={24} />,
        title: 'Ambient Lighting',
        description: '64-color ambient lighting with personalization',
      },
    ],
    images: defaultImages,
    title: 'Luxury Cabin',
  },
};
