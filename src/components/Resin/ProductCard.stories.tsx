import type { Meta, StoryObj } from '@storybook/react';
import { ProductCard } from './ProductCard';
import { vehicleDatabase, suvs, trucks, sedans } from '../../data/vehicles';

// Get specific vehicles for stories - using exact model names from database
const teslaModelY = vehicleDatabase.find(v => v.make === 'Tesla' && v.model === 'Model Y');
const fordMachE = vehicleDatabase.find(v => v.make === 'Ford' && v.model === 'Mustang Mach-E');
const jeepGrandCherokee = vehicleDatabase.find(v => v.make === 'Jeep' && v.model === 'Grand Cherokee');
const rivianR1T = vehicleDatabase.find(v => v.make === 'Rivian' && v.model === 'R1T');

const meta: Meta<typeof ProductCard> = {
  title: 'Resin Components/ProductCard',
  component: ProductCard,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
## Product Card

A product card component inspired by Hearst's Resin design system.
Used in 4-across product grids for showcasing vehicles and automotive products.

### Features
- Product image with hover zoom effect
- Badge overlays (Best Seller, Editor's Choice, Sale, New)
- Custom tag labels
- Brand attribution
- Price display with sale pricing support
- Customizable CTA button
- Optional product description

### Usage
\`\`\`tsx
import { vehicleDatabase } from '../../data/vehicles';

const vehicle = vehicleDatabase.find(v => v.make === 'Tesla' && v.model === 'Model Y');

<ProductCard
  imageUrl={vehicle?.image || ''}
  imageAlt="Tesla Model Y"
  title="2025 Tesla Model Y"
  brand="Tesla"
  badge="editors-choice"
  tag="EV"
  price={vehicle?.priceRange}
  ctaText="View Details"
  href="/vehicles/tesla-model-y"
/>
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    badge: {
      control: 'select',
      options: [null, 'best-seller', 'editors-choice', 'sale', 'new'],
      description: 'Badge type for product',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ProductCard>;

export const Default: Story = {
  args: {
    imageUrl: teslaModelY?.image || '',
    imageAlt: `${teslaModelY?.year} ${teslaModelY?.make} ${teslaModelY?.model}`,
    title: `${teslaModelY?.year} ${teslaModelY?.make} ${teslaModelY?.model}`,
    brand: teslaModelY?.make,
    badge: 'editors-choice',
    tag: 'Electric SUV',
    price: teslaModelY?.priceRange,
    description: `${teslaModelY?.horsepower || 0} HP | ${teslaModelY?.drivetrain} | ${teslaModelY?.mpg || 'N/A'}`,
    ctaText: 'View Details',
  },
};

export const BestSeller: Story = {
  args: {
    imageUrl: fordMachE?.image || '',
    imageAlt: `${fordMachE?.year} ${fordMachE?.make} ${fordMachE?.model}`,
    title: `${fordMachE?.year} ${fordMachE?.make} ${fordMachE?.model}`,
    brand: fordMachE?.make,
    badge: 'best-seller',
    tag: 'Electric SUV',
    price: fordMachE?.priceRange,
    description: `${fordMachE?.horsepower || 0} HP | ${fordMachE?.drivetrain}`,
    ctaText: 'Shop Now',
  },
};

export const NewModel: Story = {
  args: {
    imageUrl: rivianR1T?.image || '',
    imageAlt: `${rivianR1T?.year} ${rivianR1T?.make} ${rivianR1T?.model}`,
    title: `${rivianR1T?.year} ${rivianR1T?.make} ${rivianR1T?.model}`,
    brand: rivianR1T?.make,
    badge: 'new',
    tag: 'Electric Truck',
    price: rivianR1T?.priceRange,
    description: 'Adventure-Ready Electric Pickup',
    ctaText: 'Learn More',
  },
};

export const OnSale: Story = {
  args: {
    imageUrl: jeepGrandCherokee?.image || '',
    imageAlt: `${jeepGrandCherokee?.year} ${jeepGrandCherokee?.make} ${jeepGrandCherokee?.model}`,
    title: `${jeepGrandCherokee?.year} ${jeepGrandCherokee?.make} ${jeepGrandCherokee?.model}`,
    brand: jeepGrandCherokee?.make,
    badge: 'sale',
    tag: '4x4 SUV',
    price: '$54,995',
    originalPrice: '$58,995',
    description: 'Limited Time Offer - Save $4,000',
    ctaText: 'Get Offer',
  },
};

// 4-across grid with SUVs
export const FourAcrossGrid: Story = {
  render: () => (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(4, 1fr)', 
      gap: '24px',
      maxWidth: '1200px'
    }}>
      {suvs.slice(0, 4).map((vehicle, index) => (
        <ProductCard
          key={vehicle.id}
          imageUrl={vehicle.image}
          imageAlt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
          title={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
          brand={vehicle.make}
          badge={vehicle.editorsChoice ? 'editors-choice' : vehicle.tenBest ? 'best-seller' : index === 0 ? 'new' : null}
          tag={vehicle.fuelType === 'Electric' ? 'EV' : vehicle.fuelType === 'Hybrid' ? 'Hybrid' : vehicle.bodyStyle}
          price={vehicle.priceRange}
          description={`${vehicle.horsepower || 'N/A'} HP | ${vehicle.drivetrain}`}
          ctaText="View Details"
        />
      ))}
    </div>
  ),
};

// Mixed badges with trucks
export const MixedBadges: Story = {
  render: () => (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(4, 1fr)', 
      gap: '24px',
      maxWidth: '1200px'
    }}>
      {trucks.slice(0, 4).map((vehicle, index) => {
        const badges: Array<'best-seller' | 'editors-choice' | 'sale' | 'new' | null> = ['best-seller', 'editors-choice', 'sale', 'new'];
        return (
          <ProductCard
            key={vehicle.id}
            imageUrl={vehicle.image}
            imageAlt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
            title={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
            brand={vehicle.make}
            badge={badges[index]}
            tag={vehicle.fuelType === 'Electric' ? 'Electric Truck' : 'Pickup Truck'}
            price={vehicle.priceRange}
            originalPrice={index === 2 ? '$55,995' : undefined}
            description={`${vehicle.horsepower || 'N/A'} HP | ${vehicle.drivetrain} | ${vehicle.mpg || 'N/A'}`}
            ctaText={index === 2 ? 'Get Offer' : 'Shop Now'}
          />
        );
      })}
    </div>
  ),
};

// Sedans showcase
export const SedanShowcase: Story = {
  render: () => (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(4, 1fr)', 
      gap: '24px',
      maxWidth: '1200px'
    }}>
      {sedans.slice(0, 8).map((vehicle) => (
        <ProductCard
          key={vehicle.id}
          imageUrl={vehicle.image}
          imageAlt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
          title={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
          brand={vehicle.make}
          badge={vehicle.editorsChoice ? 'editors-choice' : vehicle.tenBest ? 'best-seller' : null}
          tag={vehicle.fuelType === 'Electric' ? 'EV' : vehicle.fuelType === 'Hybrid' ? 'Hybrid' : 'Sedan'}
          price={vehicle.priceRange}
          description={`Staff Rating: ${vehicle.staffRating}/10`}
          ctaText="View Details"
        />
      ))}
    </div>
  ),
};

// Minimal style
export const MinimalStyle: Story = {
  render: () => (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(4, 1fr)', 
      gap: '24px',
      maxWidth: '1200px'
    }}>
      {suvs.slice(4, 8).map((vehicle) => (
        <ProductCard
          key={vehicle.id}
          imageUrl={vehicle.image}
          imageAlt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
          title={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
          brand={vehicle.make}
          price={vehicle.priceRange}
          ctaText="Learn More"
        />
      ))}
    </div>
  ),
};
