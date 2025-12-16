import type { Meta, StoryObj } from '@storybook/react';
import VehicleOverview from './VehicleOverview';

const meta: Meta<typeof VehicleOverview> = {
  title: 'Organisms/VehicleOverview',
  component: VehicleOverview,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Comprehensive vehicle overview with highlights and key information.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    year: 2025,
    author: 'Car and Driver Staff',
    authorTitle: 'Automotive Editor',
    publishedDate: 'January 15, 2025',
    readingTime: 8,
  },
};

export const CustomContent: Story = {
  args: {
    year: 2025,
    author: 'John Smith',
    authorTitle: 'Senior Automotive Editor',
    content: 'The Chevrolet Trax continues to be one of the best values in the subcompact SUV segment. Its combination of modern features, spacious interior, and affordable pricing make it an excellent choice for first-time buyers and urban commuters alike.',
    highs: [
      'Excellent value for money',
      'Spacious interior for the class',
      'Modern infotainment system',
      'Good fuel economy',
    ],
    lows: [
      'Base engine lacks power',
      'Some cheap interior materials',
      'Limited cargo space',
    ],
    verdict: 'The 2025 Chevrolet Trax remains a top choice in the subcompact SUV segment, offering exceptional value and modern features.',
    publishedDate: 'March 10, 2025',
    updatedDate: 'March 15, 2025',
    readingTime: 10,
  },
};

export const WithWhatsNew: Story = {
  args: {
    year: 2025,
    author: 'Editorial Team',
    whatsNew: [
      'Updated front fascia with new grille design',
      'Enhanced Chevrolet Infotainment 3 system',
      'New color options available',
      'Improved safety features as standard',
    ],
    publishedDate: 'February 1, 2025',
    readingTime: 6,
  },
};
