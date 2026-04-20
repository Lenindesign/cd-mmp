import type { Meta, StoryObj } from '@storybook/react';
import AdSidebar from './AdSidebar';

const meta: Meta<typeof AdSidebar> = {
  title: 'Atoms/AdSidebar',
  component: AdSidebar,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Sidebar ads: 300×600 skyscraper and 300×250 medium rectangle stacked.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    imageUrl: 'https://d2kde5ohu8qb21.cloudfront.net/files/69387d364230820002694996/300x600.jpg',
    altText: 'Advertisement',
    link: '#',
    secondaryImageUrl:
      'https://pub-4345f0f77c424370b4354c6a404ac802.r2.dev/300x250.jpg',
    secondaryAltText: 'Advertisement',
    secondaryLink: '#',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '300px' }}>
        <Story />
      </div>
    ),
  ],
};

export const NissanAd: Story = {
  args: {
    imageUrl: 'https://d2kde5ohu8qb21.cloudfront.net/files/69387d364230820002694996/300x600.jpg',
    altText: 'Nissan Advertisement',
    link: 'https://www.nissan.com',
    secondaryImageUrl:
      'https://pub-4345f0f77c424370b4354c6a404ac802.r2.dev/300x250.jpg',
    secondaryAltText: 'Nissan Advertisement',
    secondaryLink: 'https://www.nissan.com',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '300px' }}>
        <Story />
      </div>
    ),
  ],
};

export const InSidebarLayout: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '24px' }}>
      <div style={{ flex: 1, background: '#f5f5f5', padding: '20px' }}>
        <h2>Main Content</h2>
        <p>This is the main content area.</p>
      </div>
      <div style={{ width: '300px' }}>
        <AdSidebar
          imageUrl="https://d2kde5ohu8qb21.cloudfront.net/files/69387d364230820002694996/300x600.jpg"
          altText="Advertisement"
          secondaryImageUrl="https://pub-4345f0f77c424370b4354c6a404ac802.r2.dev/300x250.jpg"
          secondaryAltText="Advertisement"
        />
      </div>
    </div>
  ),
};
