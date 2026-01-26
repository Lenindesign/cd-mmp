import type { Meta, StoryObj } from '@storybook/react';
import WelcomeEmail from './WelcomeEmail';
import type { BrowsedVehicle } from './WelcomeEmail';

const meta: Meta<typeof WelcomeEmail> = {
  title: 'Email Templates/WelcomeEmail',
  component: WelcomeEmail,
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#1a1a1a' },
        { name: 'light', value: '#ffffff' },
      ],
    },
    docs: {
      description: {
        component: `
Welcome email template for new Car and Driver members.

## Features
- Personalized greeting with user's name
- **Personalized vehicle recommendations** based on browsing history
- Membership benefits list
- Featured welcome article OR user's most viewed vehicle
- "Vehicles You Viewed" section (from CDP tracking) or recommended stories
- "Explore Your Profile" CTA
- Social media links
- Footer with legal text

## Personalization
When \`browsedVehicles\` is provided (from CDP tracking data), the email shows:
- The user's most recently viewed vehicle as the featured content
- A "Vehicles You Viewed" section with their browsing history
- "Pick Up Where You Left Off" messaging

## Usage
This template is designed to be converted to inline styles for email sending.
Use a tool like [juice](https://www.npmjs.com/package/juice) to inline the CSS.

## Integration with Google One Tap
When a user signs up via Google One Tap, use the CDP tracking data to populate
the \`browsedVehicles\` prop with their viewing history.
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    userName: {
      control: 'text',
      description: 'User\'s first name for personalized greeting',
    },
    browsedVehicles: {
      description: 'Vehicles the user viewed before signing up (from CDP tracking)',
    },
    featuredTitle: {
      control: 'text',
      description: 'Title of the featured article (used when no browsed vehicles)',
    },
    featuredDescription: {
      control: 'text',
      description: 'Description of the featured article',
    },
    featuredImage: {
      control: 'text',
      description: 'Image URL for the featured article',
    },
  },
};

export default meta;
type Story = StoryObj<typeof WelcomeEmail>;

// Sample browsed vehicles data (simulating CDP tracking data)
const sampleBrowsedVehicles: BrowsedVehicle[] = [
  {
    year: 2025,
    make: 'Honda',
    model: 'CR-V',
    viewCount: 3,
    link: '/2025/honda/cr-v',
  },
  {
    year: 2025,
    make: 'Toyota',
    model: 'RAV4',
    viewCount: 2,
    link: '/2025/toyota/rav4',
  },
  {
    year: 2024,
    make: 'Chevrolet',
    model: 'Trax',
    viewCount: 1,
    link: '/2024/chevrolet/trax',
  },
  {
    year: 2025,
    make: 'Kia',
    model: 'EV9',
    viewCount: 2,
    link: '/2025/kia/ev9',
  },
  {
    year: 2025,
    make: 'Subaru',
    model: 'Forester',
    viewCount: 1,
    link: '/2025/subaru/forester',
  },
];

/**
 * Default welcome email with sample content (no browsing history).
 */
export const Default: Story = {
  args: {
    userName: 'Greg',
  },
};

/**
 * Personalized email with user's browsed vehicles from CDP tracking.
 * This is what users see after signing up via Google One Tap.
 */
export const PersonalizedWithBrowsingHistory: Story = {
  args: {
    userName: 'Sarah',
    browsedVehicles: sampleBrowsedVehicles,
  },
};

/**
 * User who viewed only one vehicle.
 */
export const SingleVehicleViewed: Story = {
  args: {
    userName: 'Mike',
    browsedVehicles: [
      {
        year: 2025,
        make: 'Toyota',
        model: 'Camry',
        viewCount: 5,
        link: '/2025/toyota/camry',
      },
    ],
  },
};

/**
 * User who viewed multiple vehicles of the same brand.
 */
export const BrandEnthusiast: Story = {
  args: {
    userName: 'Alex',
    browsedVehicles: [
      { year: 2025, make: 'BMW', model: 'X5', viewCount: 4, link: '/2025/bmw/x5' },
      { year: 2025, make: 'BMW', model: 'X3', viewCount: 2, link: '/2025/bmw/x3' },
      { year: 2024, make: 'BMW', model: 'i4', viewCount: 3, link: '/2024/bmw/i4' },
      { year: 2025, make: 'Mercedes-Benz', model: 'GLC', viewCount: 1, link: '/2025/mercedes-benz/glc' },
    ],
  },
};

/**
 * User researching electric vehicles with new card layout.
 */
export const EVShopper: Story = {
  args: {
    userName: 'Jordan',
    browsedVehicles: [
      { 
        year: 2023, 
        make: 'Hyundai', 
        model: 'Ioniq 5', 
        viewCount: 6, 
        link: '/2023/hyundai/ioniq-5',
        priceRange: '$34,485–$42,785',
        epaRange: '250–350',
        isEV: true,
      },
      { 
        year: 2025, 
        make: 'Kia', 
        model: 'EV9', 
        viewCount: 3, 
        link: '/2025/kia/ev9',
        priceRange: '$56,395–$75,000',
        epaRange: '280–304',
        isEV: true,
      },
      { 
        year: 2024, 
        make: 'Chevrolet', 
        model: 'Equinox EV', 
        viewCount: 2, 
        link: '/2024/chevrolet/equinox-ev',
        priceRange: '$34,995–$48,995',
        epaRange: '285–319',
        isEV: true,
      },
      { 
        year: 2024, 
        make: 'Tesla', 
        model: 'Model Y', 
        viewCount: 4, 
        link: '/2024/tesla/model-y',
        priceRange: '$44,990–$54,990',
        epaRange: '260–330',
        isEV: true,
        image: 'https://hips.hearstapps.com/hmg-prod/images/2024-tesla-model-y-juniper-front-three-quarters-672b89e7cd3b3.jpg?crop=0.668xw:0.502xh;0.140xw,0.276xh&resize=980:*',
      },
    ],
  },
};

/**
 * Welcome email with custom user name (no browsing history).
 */
export const NewUserNoBrowsingHistory: Story = {
  args: {
    userName: 'Chris',
    featuredTitle: 'Your Personalized Car Journey Starts Here',
    featuredDescription: 'Discover features tailored just for you',
  },
};

/**
 * Welcome email with custom featured article.
 */
export const CustomFeatured: Story = {
  args: {
    userName: 'Michael',
    featuredTitle: '2025 Best Cars to Buy',
    featuredDescription: 'Our editors\' top picks for every budget',
    featuredImage: 'https://hips.hearstapps.com/hmg-prod/images/2024-chevrolet-trax-activ-102-64e70db91e774.jpg?crop=0.668xw:0.501xh;0.147xw,0.321xh&resize=980:*',
  },
};

/**
 * Welcome email with custom recommended stories.
 */
export const CustomStories: Story = {
  args: {
    userName: 'Alex',
    recommendedStories: [
      {
        id: '1',
        title: 'Electric SUV Comparison',
        description: 'Tesla vs Rivian vs BMW',
        image: 'https://hips.hearstapps.com/hmg-prod/images/2024-kia-ev9-gt-line-awd-101-6572b4470a628.jpg?crop=0.670xw:0.503xh;0.204xw,0.361xh&resize=980:*',
        link: '#',
      },
      {
        id: '2',
        title: 'Best Family Cars 2025',
        description: 'Safety meets comfort',
        image: 'https://hips.hearstapps.com/hmg-prod/images/2025-honda-cr-v-101-6724bd6899498.jpg?crop=0.574xw:0.431xh;0.218xw,0.323xh&resize=980:*',
        link: '#',
      },
      {
        id: '3',
        title: 'Truck Towing Guide',
        description: 'Everything you need to know',
        image: 'https://hips.hearstapps.com/hmg-prod/images/2024-ford-f-150-tremor-101-64b77bcfde3f2.jpg?crop=0.668xw:0.502xh;0.201xw,0.356xh&resize=980:*',
        link: '#',
      },
    ],
  },
};

/**
 * Mobile preview with browsing history.
 */
export const MobileWithBrowsingHistory: Story = {
  args: {
    userName: 'Chris',
    browsedVehicles: sampleBrowsedVehicles.slice(0, 3),
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

/**
 * Tablet preview width (768px).
 */
export const TabletPreview: Story = {
  args: {
    userName: 'Jordan',
    browsedVehicles: sampleBrowsedVehicles,
  },
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
  },
};
