import type { Meta, StoryObj } from '@storybook/react';
import { VideoCard } from './VideoCard';
import { vehicleDatabase, sedans, suvs, trucks, coupes } from '../../data/vehicles';

// Get specific vehicles for stories - using exact model names from database
const porsche911 = vehicleDatabase.find(v => v.make === 'Porsche' && v.model === '911');
const chevyCorvette = vehicleDatabase.find(v => v.make === 'Chevrolet' && v.model === 'Corvette');
const bmwM4 = vehicleDatabase.find(v => v.make === 'BMW' && v.model === 'M4');
const fordMustang = vehicleDatabase.find(v => v.make === 'Ford' && v.model === 'Mustang');
const teslaModelS = vehicleDatabase.find(v => v.make === 'Tesla' && v.model === 'Model S');
const lamborghini = vehicleDatabase.find(v => v.make === 'Lamborghini');

const meta: Meta<typeof VideoCard> = {
  title: 'Resin Components/VideoCard',
  component: VideoCard,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
## Video Card

A video card component inspired by Hearst's Resin design system.
Used for featuring automotive video content with play button overlays.

### Features
- Play button overlay with hover effects
- Duration badge
- Optional overlay text on thumbnail
- Multiple size variants (large, medium, small)
- Sponsor and label support
- Author and date metadata

### Usage
\`\`\`tsx
import { vehicleDatabase } from '../../data/vehicles';

const vehicle = vehicleDatabase.find(v => v.make === 'Porsche' && v.model === '911');

<VideoCard
  thumbnailUrl={vehicle?.image || ''}
  thumbnailAlt="Porsche 911 Review"
  title="2025 Porsche 911 Carrera GTS: Track Test at Laguna Seca"
  duration="12:34"
  author="Dan Edmunds"
  date="Dec 22, 2024"
  href="/videos/porsche-911-review"
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
      options: ['large', 'medium', 'small'],
      description: 'Card size variant',
    },
  },
};

export default meta;
type Story = StoryObj<typeof VideoCard>;

export const Default: Story = {
  args: {
    thumbnailUrl: porsche911?.image || '',
    thumbnailAlt: `${porsche911?.year} ${porsche911?.make} ${porsche911?.model}`,
    title: `${porsche911?.year} ${porsche911?.make} ${porsche911?.model} Carrera GTS: Track Test at Laguna Seca`,
    duration: '12:34',
    variant: 'large',
  },
};

export const WithOverlayText: Story = {
  args: {
    thumbnailUrl: chevyCorvette?.image || '',
    thumbnailAlt: `${chevyCorvette?.year} ${chevyCorvette?.make} ${chevyCorvette?.model}`,
    title: `${chevyCorvette?.year} ${chevyCorvette?.make} ${chevyCorvette?.model} Z06: America's Supercar`,
    overlayText: 'The most powerful naturally aspirated V8 ever in a production car.',
    variant: 'large',
  },
};

export const WithLabel: Story = {
  args: {
    thumbnailUrl: bmwM4?.image || '',
    thumbnailAlt: `${bmwM4?.year} ${bmwM4?.make} ${bmwM4?.model}`,
    title: `${bmwM4?.year} ${bmwM4?.make} ${bmwM4?.model} Competition: Is It Worth the Premium?`,
    duration: '8:15',
    label: 'Video Review',
    author: 'K.C. Colwell',
    date: 'Dec 20, 2024',
    variant: 'large',
  },
};

export const MediumSize: Story = {
  args: {
    thumbnailUrl: fordMustang?.image || '',
    thumbnailAlt: `${fordMustang?.year} ${fordMustang?.make} ${fordMustang?.model}`,
    title: `${fordMustang?.year} ${fordMustang?.make} ${fordMustang?.model} Dark Horse: 500 HP of American Muscle`,
    duration: '10:45',
    variant: 'medium',
  },
};

export const SmallSize: Story = {
  args: {
    thumbnailUrl: teslaModelS?.image || '',
    thumbnailAlt: `${teslaModelS?.year} ${teslaModelS?.make} ${teslaModelS?.model}`,
    title: `${teslaModelS?.year} ${teslaModelS?.make} ${teslaModelS?.model} Plaid: 0-60 Test`,
    duration: '3:45',
    variant: 'small',
  },
};

export const LargeWithLabel: Story = {
  args: {
    thumbnailUrl: lamborghini?.image || '',
    thumbnailAlt: `${lamborghini?.year} ${lamborghini?.make} ${lamborghini?.model}`,
    title: `${lamborghini?.year} ${lamborghini?.make} ${lamborghini?.model}: Supercar Dreams`,
    duration: '15:00',
    label: 'Featured',
    variant: 'large',
  },
};

export const MinimalInfo: Story = {
  args: {
    thumbnailUrl: porsche911?.image || '',
    thumbnailAlt: 'Watch Next',
    title: 'Watch Next: Best Sports Cars of 2025',
    variant: 'medium',
  },
};

// Video grid with featured video + sidebar
export const VideoGrid: Story = {
  render: () => {
    const featuredVehicle = coupes[0];
    const sidebarVehicles = coupes.slice(1, 4);
    
    return (
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '2fr 1fr', 
        gap: '24px',
        maxWidth: '1200px'
      }}>
        <VideoCard
          thumbnailUrl={featuredVehicle?.image || ''}
          thumbnailAlt={`${featuredVehicle?.year} ${featuredVehicle?.make} ${featuredVehicle?.model}`}
          title={`${featuredVehicle?.year} ${featuredVehicle?.make} ${featuredVehicle?.model}: The Ultimate Track Test`}
          duration="18:34"
          overlayText={`${featuredVehicle?.horsepower || 0} HP of Pure Performance`}
          variant="large"
        />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {sidebarVehicles.map((vehicle, index) => (
            <VideoCard
              key={vehicle.id}
              thumbnailUrl={vehicle.image}
              thumbnailAlt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
              title={`${vehicle.year} ${vehicle.make} ${vehicle.model}: ${
                index === 0 ? 'First Drive' :
                index === 1 ? 'Comparison Test' :
                'Full Review'
              }`}
              duration={['6:30', '8:15', '5:45'][index]}
              variant="small"
            />
          ))}
        </div>
      </div>
    );
  },
};

// Horizontal feed with SUVs
export const HorizontalFeed: Story = {
  render: () => (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(3, 1fr)', 
      gap: '24px',
      maxWidth: '1200px'
    }}>
      {suvs.slice(0, 3).map((vehicle, index) => (
        <VideoCard
          key={vehicle.id}
          thumbnailUrl={vehicle.image}
          thumbnailAlt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
          title={`${vehicle.year} ${vehicle.make} ${vehicle.model}: ${
            index === 0 ? 'Off-Road Adventure Test' :
            index === 1 ? 'Family Road Trip Review' :
            'Towing Capacity Showdown'
          }`}
          duration={['12:34', '8:15', '10:30'][index]}
          author={['Dan Edmunds', 'Austin Irwin', 'Eric Stafford'][index]}
          date={`Dec ${22 - index}, 2024`}
          variant="medium"
        />
      ))}
    </div>
  ),
};

// Truck video showcase
export const TruckShowcase: Story = {
  render: () => (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(2, 1fr)', 
      gap: '24px',
      maxWidth: '1000px'
    }}>
      {trucks.slice(0, 4).map((vehicle, index) => (
        <VideoCard
          key={vehicle.id}
          thumbnailUrl={vehicle.image}
          thumbnailAlt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
          title={`${vehicle.year} ${vehicle.make} ${vehicle.model}: ${
            index === 0 ? 'Towing 10,000 lbs Up a Mountain' :
            index === 1 ? 'Work Truck vs Luxury Truck' :
            index === 2 ? 'Electric Truck Range Test' :
            'Best Truck for Your Money'
          }`}
          duration={['15:20', '12:45', '18:30', '9:15'][index]}
          overlayText={vehicle.fuelType === 'Electric' ? 'Electric Truck Revolution' : undefined}
          variant="large"
        />
      ))}
    </div>
  ),
};

// Sedan comparison videos
export const SedanComparison: Story = {
  render: () => (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(4, 1fr)', 
      gap: '16px',
      maxWidth: '1200px'
    }}>
      {sedans.slice(0, 4).map((vehicle, index) => (
        <VideoCard
          key={vehicle.id}
          thumbnailUrl={vehicle.image}
          thumbnailAlt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
          title={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
          duration={['5:30', '6:15', '4:45', '7:00'][index]}
          label={vehicle.editorsChoice ? "Editor's Pick" : vehicle.tenBest ? '10Best' : undefined}
          variant="small"
        />
      ))}
    </div>
  ),
};
