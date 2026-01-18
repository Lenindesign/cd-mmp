import type { Meta, StoryObj } from '@storybook/react';
import WelcomeEmail from './WelcomeEmail';

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
- Membership benefits list
- Featured welcome article
- Recommended stories section (5 cards)
- "Explore Your Profile" CTA
- Social media links
- Footer with legal text

## Usage
This template is designed to be converted to inline styles for email sending.
Use a tool like [juice](https://www.npmjs.com/package/juice) to inline the CSS.
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
    featuredTitle: {
      control: 'text',
      description: 'Title of the featured article',
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

/**
 * Default welcome email with sample content.
 */
export const Default: Story = {
  args: {
    userName: 'Greg',
  },
};

/**
 * Welcome email with custom user name.
 */
export const CustomUser: Story = {
  args: {
    userName: 'Sarah',
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
 * Mobile preview width (375px).
 */
export const MobilePreview: Story = {
  args: {
    userName: 'Chris',
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
  },
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
  },
};
