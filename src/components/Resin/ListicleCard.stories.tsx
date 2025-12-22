import type { Meta, StoryObj } from '@storybook/react';
import { ListicleCard } from './ListicleCard';
import { vehicleDatabase } from '../../data/vehicles';

// Get vehicles for stories
const sedans = vehicleDatabase.filter(v => v.bodyStyle === 'Sedan').slice(0, 8);
const suvs = vehicleDatabase.filter(v => v.bodyStyle === 'SUV').slice(0, 8);
const trucks = vehicleDatabase.filter(v => v.bodyStyle === 'Truck').slice(0, 4);
const coupes = vehicleDatabase.filter(v => v.bodyStyle === 'Coupe').slice(0, 6);

const meta: Meta<typeof ListicleCard> = {
  title: 'Resin Components/ListicleCard',
  component: ListicleCard,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
## Listicle Card

A grid-based listicle component for displaying ranked or curated lists of content.
Inspired by Hearst's Resin design system.

### Features
- Configurable column count (2, 3, or 4)
- Optional numbered badges
- Sponsor labels
- View all link
- Three variants: default, compact, featured
- Responsive grid layout

### Usage
\`\`\`tsx
<ListicleCard
  title="Best Sedans of 2025"
  items={[
    {
      id: 1,
      imageUrl: '/path/to/image.jpg',
      imageAlt: '2025 Honda Accord',
      headline: '2025 Honda Accord: The Best Midsize Sedan',
      sponsor: 'Car and Driver',
      href: '/reviews/honda-accord',
    },
    // ... more items
  ]}
  columns={4}
  showNumbers={true}
  viewAllHref="/best-sedans"
  viewAllText="View All Sedans"
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
      options: [2, 3, 4],
      description: 'Number of columns in the grid',
    },
    variant: {
      control: 'radio',
      options: ['default', 'compact', 'featured'],
      description: 'Card layout variant',
    },
    showNumbers: {
      control: 'boolean',
      description: 'Show numbered badges on items',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ListicleCard>;

// Create listicle items from vehicles
const sedanItems = sedans.map((v, i) => ({
  id: v.id,
  imageUrl: v.image,
  imageAlt: `${v.year} ${v.make} ${v.model}`,
  headline: `${v.year} ${v.make} ${v.model}: ${i === 0 ? 'Best Overall' : i === 1 ? 'Best Value' : i === 2 ? 'Most Luxurious' : 'Top Pick'}`,
  href: `/reviews/${v.slug}`,
  sponsor: i % 3 === 0 ? 'Car and Driver' : undefined,
  itemNumber: i + 1,
}));

const suvItems = suvs.map((v, i) => ({
  id: v.id,
  imageUrl: v.image,
  imageAlt: `${v.year} ${v.make} ${v.model}`,
  headline: `${v.year} ${v.make} ${v.model}`,
  href: `/reviews/${v.slug}`,
  sponsor: i < 2 ? 'Editors\' Choice' : undefined,
  itemNumber: i + 1,
}));

const truckItems = trucks.map((v, i) => ({
  id: v.id,
  imageUrl: v.image,
  imageAlt: `${v.year} ${v.make} ${v.model}`,
  headline: `${v.year} ${v.make} ${v.model}: ${i === 0 ? 'Best Full-Size' : i === 1 ? 'Best Midsize' : 'Top Rated'}`,
  href: `/reviews/${v.slug}`,
  itemNumber: i + 1,
}));

const coupeItems = coupes.map((v, i) => ({
  id: v.id,
  imageUrl: v.image,
  imageAlt: `${v.year} ${v.make} ${v.model}`,
  headline: `${v.year} ${v.make} ${v.model}`,
  href: `/reviews/${v.slug}`,
  sponsor: v.editorsChoice ? 'Editors\' Choice' : v.tenBest ? '10Best' : undefined,
  itemNumber: i + 1,
}));

export const Default: Story = {
  args: {
    title: 'Best Sedans of 2025',
    items: sedanItems.slice(0, 4),
    columns: 4,
    showNumbers: false,
    variant: 'default',
    viewAllHref: '/best-sedans',
    viewAllText: 'View All',
  },
};

export const WithNumbers: Story = {
  args: {
    title: '10 Best Cars for 2025',
    items: sedanItems.slice(0, 4),
    columns: 4,
    showNumbers: true,
    variant: 'default',
    viewAllHref: '/10best',
    viewAllText: 'See Full List',
  },
};

export const ThreeColumns: Story = {
  args: {
    title: 'Best SUVs for Families',
    items: suvItems.slice(0, 6),
    columns: 3,
    showNumbers: true,
    variant: 'default',
    viewAllHref: '/best-suvs',
    viewAllText: 'View All SUVs',
  },
};

export const TwoColumns: Story = {
  args: {
    title: 'Best Trucks of 2025',
    items: truckItems,
    columns: 2,
    showNumbers: true,
    variant: 'default',
    viewAllHref: '/best-trucks',
    viewAllText: 'View All Trucks',
  },
};

export const Compact: Story = {
  args: {
    title: 'Quick Picks',
    items: coupeItems.slice(0, 4),
    columns: 4,
    showNumbers: true,
    variant: 'compact',
  },
};

export const Featured: Story = {
  args: {
    title: 'Editors\' Choice Awards',
    items: sedanItems.slice(0, 4),
    columns: 4,
    showNumbers: true,
    variant: 'featured',
    viewAllHref: '/editors-choice',
    viewAllText: 'All Winners',
  },
};

export const NoHeader: Story = {
  args: {
    items: suvItems.slice(0, 4),
    columns: 4,
    showNumbers: false,
    variant: 'default',
  },
};

export const WithSponsors: Story = {
  args: {
    title: 'Featured Vehicles',
    items: sedanItems.slice(0, 4).map((item, i) => ({
      ...item,
      sponsor: i % 2 === 0 ? 'Car and Driver + Partner' : 'Sponsored',
    })),
    columns: 4,
    showNumbers: false,
    variant: 'default',
  },
};

// Full page example
export const PageLayout: Story = {
  render: () => (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px' }}>
      <ListicleCard
        title="10 Best Cars for 2025"
        items={sedanItems.slice(0, 4)}
        columns={4}
        showNumbers={true}
        variant="default"
        viewAllHref="/10best"
        viewAllText="See Full List"
      />
      
      <div style={{ marginTop: '48px' }} />
      
      <ListicleCard
        title="Best SUVs for Every Budget"
        items={suvItems.slice(0, 3)}
        columns={3}
        showNumbers={true}
        variant="default"
        viewAllHref="/best-suvs"
        viewAllText="View All SUVs"
      />
      
      <div style={{ marginTop: '48px' }} />
      
      <ListicleCard
        title="Sports Cars We Love"
        items={coupeItems.slice(0, 4)}
        columns={4}
        showNumbers={false}
        variant="compact"
      />
    </div>
  ),
};

