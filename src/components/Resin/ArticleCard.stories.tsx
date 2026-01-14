import type { Meta, StoryObj } from '@storybook/react';
import { ArticleCard } from './ArticleCard';
import { vehicleDatabase, sedans, suvs, trucks, coupes } from '../../data/vehicles';

// Get specific vehicles for stories - using exact model names from database
const hondaCivic = vehicleDatabase.find(v => v.make === 'Honda' && v.model === 'Civic');
const toyotaHighlander = vehicleDatabase.find(v => v.make === 'Toyota' && v.model === 'Highlander');
const fordF150 = vehicleDatabase.find(v => v.make === 'Ford' && v.model === 'F-150');

const meta: Meta<typeof ArticleCard> = {
  title: 'Resin Components/ArticleCard',
  component: ArticleCard,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
## Article Card

A versatile article card component inspired by Hearst's Resin design system.
Used in grid layouts for displaying automotive article previews.

### Features
- Multiple layout variants (horizontal, vertical, compact)
- Configurable image aspect ratios
- Optional sponsor attribution
- Hover effects on image and headline
- Line clamping for long headlines

### Usage
\`\`\`tsx
import { vehicleDatabase } from '../../data/vehicles';

const vehicle = vehicleDatabase.find(v => v.make === 'Honda' && v.model === 'Civic');

<ArticleCard
  imageUrl={vehicle?.image || ''}
  imageAlt="2025 Honda Civic"
  headline="2025 Honda Civic: Still the Compact Car to Beat"
  sponsor="Car and Driver"
  href="/reviews/honda-civic"
/>
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'radio',
      options: ['horizontal', 'vertical', 'compact'],
      description: 'Card layout variant',
    },
    aspectRatio: {
      control: 'radio',
      options: ['square', 'portrait', 'landscape'],
      description: 'Image aspect ratio',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ArticleCard>;

export const Default: Story = {
  args: {
    imageUrl: hondaCivic?.image || '',
    imageAlt: `${hondaCivic?.year} ${hondaCivic?.make} ${hondaCivic?.model}`,
    headline: `${hondaCivic?.year} ${hondaCivic?.make} ${hondaCivic?.model}: Still the Compact Car to Beat`,
    sponsor: 'Car and Driver',
    variant: 'horizontal',
    aspectRatio: 'portrait',
  },
};

export const Vertical: Story = {
  args: {
    imageUrl: toyotaHighlander?.image || '',
    imageAlt: `${toyotaHighlander?.year} ${toyotaHighlander?.make} ${toyotaHighlander?.model}`,
    headline: `${toyotaHighlander?.year} ${toyotaHighlander?.make} ${toyotaHighlander?.model}: The Family SUV King`,
    sponsor: 'Car and Driver',
    variant: 'vertical',
    aspectRatio: 'landscape',
  },
};

export const Compact: Story = {
  args: {
    imageUrl: fordF150?.image || '',
    imageAlt: `${fordF150?.year} ${fordF150?.make} ${fordF150?.model}`,
    headline: `${fordF150?.year} ${fordF150?.make} ${fordF150?.model} Lightning: Electric Truck Showdown`,
    variant: 'compact',
    aspectRatio: 'square',
  },
};

// 3-column grid with sedans
export const ThreeColumnGrid: Story = {
  render: () => (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(3, 1fr)', 
      gap: '24px',
      maxWidth: '1200px'
    }}>
      {sedans.slice(0, 6).map((vehicle) => (
        <ArticleCard
          key={vehicle.id}
          imageUrl={vehicle.image}
          imageAlt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
          headline={`${vehicle.year} ${vehicle.make} ${vehicle.model} Review: ${vehicle.staffRating >= 9 ? 'A Class Leader' : vehicle.staffRating >= 8 ? 'Highly Recommended' : 'Worth Considering'}`}
          sponsor="Car and Driver"
          variant="horizontal"
          aspectRatio="portrait"
        />
      ))}
    </div>
  ),
};

// 4-across vertical grid with SUVs
export const VerticalGrid: Story = {
  render: () => (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(4, 1fr)', 
      gap: '24px',
      maxWidth: '1200px'
    }}>
      {suvs.slice(0, 8).map((vehicle) => (
        <ArticleCard
          key={vehicle.id}
          imageUrl={vehicle.image}
          imageAlt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
          headline={`${vehicle.year} ${vehicle.make} ${vehicle.model}: ${vehicle.fuelType === 'Electric' ? 'EV' : vehicle.fuelType === 'Hybrid' ? 'Hybrid' : ''} ${vehicle.bodyStyle} ${vehicle.editorsChoice ? "Editor's Choice" : 'Review'}`}
          variant="vertical"
          aspectRatio="landscape"
        />
      ))}
    </div>
  ),
};

// Compact sidebar with trucks
export const CompactSidebar: Story = {
  render: () => (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      gap: '16px',
      maxWidth: '300px'
    }}>
      {trucks.slice(0, 5).map((vehicle) => (
        <ArticleCard
          key={vehicle.id}
          imageUrl={vehicle.image}
          imageAlt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
          headline={`${vehicle.year} ${vehicle.make} ${vehicle.model}: ${vehicle.horsepower ? `${vehicle.horsepower} HP` : 'Full Review'}`}
          variant="compact"
          aspectRatio="square"
        />
      ))}
    </div>
  ),
};

// Mixed content with coupes
export const MixedContent: Story = {
  render: () => (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: '2fr 1fr', 
      gap: '24px',
      maxWidth: '1000px'
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {coupes.slice(0, 3).map((vehicle) => (
          <ArticleCard
            key={vehicle.id}
            imageUrl={vehicle.image}
            imageAlt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
            headline={`${vehicle.year} ${vehicle.make} ${vehicle.model}: ${vehicle.tenBest ? '10Best Winner' : vehicle.editorsChoice ? "Editor's Choice" : 'Sports Car Excellence'}`}
            sponsor="Car and Driver"
            variant="horizontal"
            aspectRatio="portrait"
          />
        ))}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {sedans.slice(6, 11).map((vehicle) => (
          <ArticleCard
            key={vehicle.id}
            imageUrl={vehicle.image}
            imageAlt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
            headline={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
            variant="compact"
            aspectRatio="square"
          />
        ))}
      </div>
    </div>
  ),
};
