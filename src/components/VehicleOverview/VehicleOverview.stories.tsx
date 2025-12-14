import type { Meta, StoryObj } from '@storybook/react';
import VehicleOverview from './VehicleOverview';

const meta: Meta<typeof VehicleOverview> = {
  title: 'Molecules/VehicleOverview',
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
    year: 2024,
    author: 'Car and Driver Staff',
    authorTitle: 'Automotive Editor',
    publishedDate: 'January 15, 2024',
    readingTime: 8,
  },
};

export const CustomContent: Story = {
  args: {
    year: 2024,
    author: 'John Smith',
    authorTitle: 'Senior Automotive Editor',
    content: 'The Toyota Camry continues to be one of the best-selling sedans in America, and for good reason. Its combination of reliability, comfort, and value make it an excellent choice for families and commuters alike.',
    highs: [
      'Excellent fuel economy',
      'Spacious interior',
      'Strong resale value',
      'Smooth ride quality',
    ],
    lows: [
      'Conservative styling',
      'Some cheap interior materials',
      'Limited performance',
    ],
    verdict: 'The 2024 Toyota Camry remains a top choice in the midsize sedan segment, offering exceptional value and reliability.',
    publishedDate: 'March 10, 2024',
    updatedDate: 'March 15, 2024',
    readingTime: 10,
  },
};

export const WithWhatsNew: Story = {
  args: {
    year: 2024,
    author: 'Editorial Team',
    whatsNew: [
      'Redesigned front fascia with new grille design',
      'Updated infotainment system with larger touchscreen',
      'New hybrid powertrain option',
      'Enhanced safety features as standard',
    ],
    publishedDate: 'February 1, 2024',
    readingTime: 6,
  },
};
