import type { Meta, StoryObj } from '@storybook/react';
import { SeoBlock } from './SeoBlock';
import { vehicleDatabase } from '../../data/vehicles';

// Get vehicles for stories
const allVehicles = vehicleDatabase.slice(0, 12);
const sedans = vehicleDatabase.filter(v => v.bodyStyle === 'Sedan').slice(0, 6);
const suvs = vehicleDatabase.filter(v => v.bodyStyle === 'SUV').slice(0, 6);

const meta: Meta<typeof SeoBlock> = {
  title: 'Resin Components/SeoBlock',
  component: SeoBlock,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
## SEO Block

A grid component for displaying related content, typically used for SEO optimization
and internal linking. Inspired by Hearst's 4-across content blocks.

### Features
- Configurable columns (3, 4, or 6)
- Optional section title with border
- Three variants: default, compact, cards
- Responsive grid layout
- Image hover effects

### Usage
\`\`\`tsx
<SeoBlock
  title="Related Articles"
  items={[
    {
      id: 1,
      imageUrl: '/path/to/image.jpg',
      imageAlt: '2025 Honda Accord',
      headline: '2025 Honda Accord Review',
      href: '/reviews/honda-accord',
    },
    // ... more items
  ]}
  columns={4}
  showBorder={true}
  variant="default"
/>
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    columns: {
      control: 'radio',
      options: [3, 4, 6],
      description: 'Number of columns in the grid',
    },
    variant: {
      control: 'radio',
      options: ['default', 'compact', 'cards'],
      description: 'Visual style variant',
    },
    showBorder: {
      control: 'boolean',
      description: 'Show border under title',
    },
  },
};

export default meta;
type Story = StoryObj<typeof SeoBlock>;

// Create SEO items from vehicles
const seoItems = allVehicles.map((v) => ({
  id: v.id,
  imageUrl: v.image,
  imageAlt: `${v.year} ${v.make} ${v.model}`,
  headline: `${v.year} ${v.make} ${v.model} Review`,
  href: `/reviews/${v.slug}`,
}));

const sedanItems = sedans.map((v) => ({
  id: v.id,
  imageUrl: v.image,
  imageAlt: `${v.year} ${v.make} ${v.model}`,
  headline: `${v.year} ${v.make} ${v.model}: Everything You Need to Know`,
  href: `/reviews/${v.slug}`,
}));

const suvItems = suvs.map((v) => ({
  id: v.id,
  imageUrl: v.image,
  imageAlt: `${v.year} ${v.make} ${v.model}`,
  headline: `Best ${v.bodyStyle}s: ${v.year} ${v.make} ${v.model}`,
  href: `/reviews/${v.slug}`,
}));

export const Default: Story = {
  args: {
    title: 'SEO Block - Related Content',
    items: seoItems.slice(0, 4),
    columns: 4,
    showBorder: true,
    variant: 'default',
  },
};

export const ThreeColumns: Story = {
  args: {
    title: 'Popular Reviews',
    items: sedanItems.slice(0, 6),
    columns: 3,
    showBorder: true,
    variant: 'default',
  },
};

export const SixColumns: Story = {
  args: {
    title: 'Browse All Vehicles',
    items: seoItems.slice(0, 6),
    columns: 6,
    showBorder: true,
    variant: 'default',
  },
};

export const Compact: Story = {
  args: {
    title: 'Quick Links',
    items: seoItems.slice(0, 6),
    columns: 6,
    showBorder: true,
    variant: 'compact',
  },
};

export const Cards: Story = {
  args: {
    title: 'Featured Reviews',
    items: suvItems.slice(0, 4),
    columns: 4,
    showBorder: true,
    variant: 'cards',
  },
};

export const NoBorder: Story = {
  args: {
    title: 'More to Explore',
    items: seoItems.slice(0, 4),
    columns: 4,
    showBorder: false,
    variant: 'default',
  },
};

export const NoTitle: Story = {
  args: {
    items: sedanItems.slice(0, 4),
    columns: 4,
    variant: 'default',
  },
};

// Full page example
export const PageLayout: Story = {
  render: () => (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px' }}>
      <SeoBlock
        title="Latest Reviews"
        items={seoItems.slice(0, 4)}
        columns={4}
        showBorder={true}
        variant="default"
      />
      
      <div style={{ marginTop: '48px' }} />
      
      <SeoBlock
        title="Popular SUVs"
        items={suvItems.slice(0, 3)}
        columns={3}
        showBorder={true}
        variant="cards"
      />
      
      <div style={{ marginTop: '48px' }} />
      
      <SeoBlock
        title="Browse by Category"
        items={seoItems.slice(0, 6)}
        columns={6}
        showBorder={true}
        variant="compact"
      />
    </div>
  ),
};

// In article footer context
export const ArticleFooter: Story = {
  render: () => (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '24px' }}>
      {/* Article content */}
      <div style={{ marginBottom: '32px', paddingBottom: '32px', borderBottom: '1px solid #e5e5e5' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '16px' }}>
          2025 Honda Accord Review
        </h1>
        <p style={{ lineHeight: 1.7, color: '#374151' }}>
          The Honda Accord continues to set the benchmark for midsize sedans with its 
          excellent combination of comfort, efficiency, and value. Our comprehensive 
          review covers everything you need to know about this perennial favorite.
        </p>
      </div>

      {/* SEO Block at article footer */}
      <SeoBlock
        title="Related Articles"
        items={sedanItems.slice(0, 4)}
        columns={4}
        showBorder={true}
        variant="default"
      />
    </div>
  ),
};

