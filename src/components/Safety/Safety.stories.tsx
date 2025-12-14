import type { Meta, StoryObj } from '@storybook/react';
import { Shield, Eye, AlertTriangle, Car, Navigation, Camera } from 'lucide-react';
import Safety from './Safety';

const meta: Meta<typeof Safety> = {
  title: 'Molecules/Safety',
  component: Safety,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Displays vehicle safety ratings and features.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const defaultFeatures = [
  { icon: <Eye size={20} />, name: 'Forward Collision Warning', standard: true },
  { icon: <AlertTriangle size={20} />, name: 'Automatic Emergency Braking', standard: true },
  { icon: <Car size={20} />, name: 'Lane Departure Warning', standard: true },
  { icon: <Navigation size={20} />, name: 'Adaptive Cruise Control', standard: false },
  { icon: <Camera size={20} />, name: 'Blind Spot Monitoring', standard: true },
  { icon: <Shield size={20} />, name: 'Rear Cross-Traffic Alert', standard: false },
];

export const Default: Story = {
  args: {
    overallRating: 5,
    crashRatings: [
      { category: 'Frontal Crash', rating: 5, maxRating: 5 },
      { category: 'Side Crash', rating: 5, maxRating: 5 },
      { category: 'Rollover', rating: 4, maxRating: 5 },
    ],
    features: defaultFeatures,
  },
};

export const TopSafetyPick: Story = {
  args: {
    overallRating: 5,
    crashRatings: [
      { category: 'Frontal Crash', rating: 5, maxRating: 5 },
      { category: 'Side Crash', rating: 5, maxRating: 5 },
      { category: 'Rollover', rating: 5, maxRating: 5 },
    ],
    features: defaultFeatures.map(f => ({ ...f, standard: true })),
    title: 'Safety - IIHS Top Safety Pick+',
  },
};

export const AverageRating: Story = {
  args: {
    overallRating: 4,
    crashRatings: [
      { category: 'Frontal Crash', rating: 4, maxRating: 5 },
      { category: 'Side Crash', rating: 4, maxRating: 5 },
      { category: 'Rollover', rating: 3, maxRating: 5 },
    ],
    features: [
      { icon: <Eye size={20} />, name: 'Forward Collision Warning', standard: true },
      { icon: <AlertTriangle size={20} />, name: 'Automatic Emergency Braking', standard: true },
      { icon: <Car size={20} />, name: 'Lane Departure Warning', standard: false },
      { icon: <Camera size={20} />, name: 'Rearview Camera', standard: true },
    ],
  },
};

export const BasicSafety: Story = {
  args: {
    overallRating: 3,
    crashRatings: [
      { category: 'Frontal Crash', rating: 3, maxRating: 5 },
      { category: 'Side Crash', rating: 4, maxRating: 5 },
      { category: 'Rollover', rating: 3, maxRating: 5 },
    ],
    features: [
      { icon: <Camera size={20} />, name: 'Rearview Camera', standard: true },
      { icon: <AlertTriangle size={20} />, name: 'Traction Control', standard: true },
    ],
  },
};
