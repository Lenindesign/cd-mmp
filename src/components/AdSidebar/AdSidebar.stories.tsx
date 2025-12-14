import type { Meta, StoryObj } from '@storybook/react';
import AdSidebar from './AdSidebar';

const meta: Meta<typeof AdSidebar> = {
  title: 'Atoms/AdSidebar',
  component: AdSidebar,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Sidebar advertisement placeholder.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
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
    imageUrl: 'https://d2kde5ohu8qb21.cloudfront.net/files/693a37c1e2108b000272edd6/nissan.jpg',
    altText: 'Nissan Advertisement',
    link: 'https://www.nissan.com',
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
          imageUrl="https://d2kde5ohu8qb21.cloudfront.net/files/693a37c1e2108b000272edd6/nissan.jpg"
          altText="Nissan Advertisement"
        />
      </div>
    </div>
  ),
};
