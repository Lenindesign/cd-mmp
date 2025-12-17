import type { Meta, StoryObj } from '@storybook/react';
import AdBanner from './AdBanner';

const meta: Meta<typeof AdBanner> = {
  title: 'Atoms/AdBanner',
  component: AdBanner,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Advertisement banner placeholder component.',
      },
      canvas: {
        sourceState: 'none',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    imageUrl: 'https://d2kde5ohu8qb21.cloudfront.net/files/693a37c1e2108b000272edd6/nissan.jpg',
    altText: 'Nissan Advertisement',
  },
};

export const WithLink: Story = {
  args: {
    imageUrl: 'https://d2kde5ohu8qb21.cloudfront.net/files/693a37c1e2108b000272edd6/nissan.jpg',
    altText: 'Nissan Advertisement',
    link: 'https://www.nissan.com',
  },
};

export const InContext: Story = {
  render: () => (
    <div>
      <div style={{ maxWidth: '728px', margin: '0 auto', background: '#f5f5f5', padding: '20px', marginBottom: '16px' }}>
        <p>Content above the ad</p>
      </div>
      <AdBanner 
        imageUrl="https://d2kde5ohu8qb21.cloudfront.net/files/693a37c1e2108b000272edd6/nissan.jpg"
        altText="Nissan Advertisement"
      />
      <div style={{ maxWidth: '728px', margin: '0 auto', background: '#f5f5f5', padding: '20px', marginTop: '16px' }}>
        <p>Content below the ad</p>
      </div>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};
