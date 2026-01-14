import type { Meta, StoryObj } from '@storybook/react';
import { FeedCard } from './FeedCard';
import { vehicleDatabase, sedans, suvs, coupes } from '../../data/vehicles';

// Get specific vehicles for stories - using exact model names from database
const hondaAccord = vehicleDatabase.find(v => v.make === 'Honda' && v.model === 'Accord');
const bmw3Series = vehicleDatabase.find(v => v.make === 'BMW' && v.model === '3 Series');
const mercedesCClass = vehicleDatabase.find(v => v.make === 'Mercedes-Benz' && v.model === 'C-Class');
const audiA4 = vehicleDatabase.find(v => v.make === 'Audi' && v.model === 'A4');

const meta: Meta<typeof FeedCard> = {
  title: 'Resin Components/FeedCard',
  component: FeedCard,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
## Feed Card

A feed-style article card component inspired by Hearst's Resin design system.
Used for displaying automotive article lists in stacked layouts.

### Features
- Image + content layout (default)
- Text-only variant for minimal lists
- Compact variant for sidebar feeds
- Sponsor and label support
- Author and date metadata

### Usage
\`\`\`tsx
import { vehicleDatabase } from '../../data/vehicles';

const vehicle = vehicleDatabase.find(v => v.make === 'Honda' && v.model === 'Accord');

<FeedCard
  headline="2025 Honda Accord Review: The Benchmark Gets Better"
  imageUrl={vehicle?.image}
  imageAlt="2025 Honda Accord"
  author="Dan Edmunds"
  date="Dec 22, 2024"
  href="/reviews/honda-accord"
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
      options: ['default', 'text-only', 'compact'],
      description: 'Card variant',
    },
  },
};

export default meta;
type Story = StoryObj<typeof FeedCard>;

export const Default: Story = {
  args: {
    imageUrl: hondaAccord?.image,
    imageAlt: `${hondaAccord?.year} ${hondaAccord?.make} ${hondaAccord?.model}`,
    headline: `${hondaAccord?.year} ${hondaAccord?.make} ${hondaAccord?.model} Review: The Benchmark Sedan Gets Even Better`,
    author: 'Dan Edmunds',
    date: 'Dec 22, 2024',
    variant: 'default',
  },
};

export const WithLabel: Story = {
  args: {
    imageUrl: bmw3Series?.image,
    imageAlt: `${bmw3Series?.year} ${bmw3Series?.make} ${bmw3Series?.model}`,
    headline: `${bmw3Series?.year} ${bmw3Series?.make} ${bmw3Series?.model}: The Sports Sedan Standard`,
    label: 'First Drive',
    author: 'K.C. Colwell',
    date: 'Dec 20, 2024',
    variant: 'default',
  },
};

export const TextOnly: Story = {
  args: {
    headline: `${mercedesCClass?.year} ${mercedesCClass?.make} ${mercedesCClass?.model}: Luxury Meets Performance`,
    author: 'Eric Stafford',
    date: 'Dec 18, 2024',
    variant: 'text-only',
  },
};

export const Compact: Story = {
  args: {
    imageUrl: audiA4?.image,
    imageAlt: `${audiA4?.year} ${audiA4?.make} ${audiA4?.model}`,
    headline: `${audiA4?.year} ${audiA4?.make} ${audiA4?.model} Review`,
    date: 'Dec 15, 2024',
    variant: 'compact',
  },
};

// Feed list with sedans
export const FeedList: Story = {
  render: () => (
    <div style={{ maxWidth: '600px' }}>
      {sedans.slice(0, 5).map((vehicle, index) => (
        <FeedCard
          key={vehicle.id}
          imageUrl={vehicle.image}
          imageAlt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
          headline={`${vehicle.year} ${vehicle.make} ${vehicle.model}: ${vehicle.editorsChoice ? "Editor's Choice Winner" : vehicle.tenBest ? '10Best Award Winner' : 'Full Review'}`}
          author={['Dan Edmunds', 'K.C. Colwell', 'Eric Stafford', 'Austin Irwin', 'Roberto Baldwin'][index]}
          date={`Dec ${22 - index}, 2024`}
          variant="default"
        />
      ))}
    </div>
  ),
};

// Text only feed with contextual headlines
export const TextOnlyFeed: Story = {
  render: () => (
    <div style={{ maxWidth: '500px' }}>
      {sedans.slice(0, 6).map((vehicle, index) => (
        <FeedCard
          key={vehicle.id}
          headline={`${vehicle.year} ${vehicle.make} ${vehicle.model}: ${
            index === 0 ? 'Why This Sedan Dominates the Segment' :
            index === 1 ? 'Long-Term Test Update at 40,000 Miles' :
            index === 2 ? 'Comparison Test Against German Rivals' :
            index === 3 ? 'Is the Hybrid Worth the Premium?' :
            index === 4 ? 'Breaking Down the New Features' :
            'Complete Buyer\'s Guide'
          }`}
          author={['Dan Edmunds', 'K.C. Colwell', 'Eric Stafford', 'Austin Irwin', 'Roberto Baldwin', 'Joey Capparella'][index]}
          date={`Dec ${22 - index}, 2024`}
          variant="text-only"
        />
      ))}
    </div>
  ),
};

// Compact sidebar with SUVs
export const CompactSidebar: Story = {
  render: () => (
    <div style={{ maxWidth: '300px' }}>
      {suvs.slice(0, 5).map((vehicle, index) => (
        <FeedCard
          key={vehicle.id}
          imageUrl={vehicle.image}
          imageAlt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
          headline={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
          date={`Dec ${22 - index}, 2024`}
          variant="compact"
        />
      ))}
    </div>
  ),
};

// Mixed feed with labels
export const MixedFeedWithLabels: Story = {
  render: () => (
    <div style={{ maxWidth: '600px' }}>
      {coupes.slice(0, 5).map((vehicle, index) => (
        <FeedCard
          key={vehicle.id}
          imageUrl={vehicle.image}
          imageAlt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
          headline={`${vehicle.year} ${vehicle.make} ${vehicle.model}: ${
            index === 0 ? 'Track Test at Laguna Seca' :
            index === 1 ? 'Is This the Ultimate Sports Car?' :
            index === 2 ? '0-60 in Under 4 Seconds' :
            index === 3 ? 'The Perfect Grand Tourer' :
            'Performance Meets Daily Drivability'
          }`}
          label={['Track Test', 'Comparison', 'Performance', 'Review', 'First Drive'][index]}
          author={['Dan Edmunds', 'K.C. Colwell', 'Eric Stafford', 'Austin Irwin', 'Roberto Baldwin'][index]}
          date={`Dec ${22 - index}, 2024`}
          variant="default"
        />
      ))}
    </div>
  ),
};
