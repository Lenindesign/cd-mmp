import type { Meta, StoryObj } from '@storybook/react';
import { BigStoryCard } from './BigStoryCard';
import { vehicleDatabase } from '../../data/vehicles';

// Get specific vehicles for stories - using exact model names from database
const hondaAccord = vehicleDatabase.find(v => v.make === 'Honda' && v.model === 'Accord');
const bmw3Series = vehicleDatabase.find(v => v.make === 'BMW' && v.model === '3 Series');
const fordMustang = vehicleDatabase.find(v => v.make === 'Ford' && v.model === 'Mustang');
const porsche911 = vehicleDatabase.find(v => v.make === 'Porsche' && v.model === '911');
const teslaModel3 = vehicleDatabase.find(v => v.make === 'Tesla' && v.model === 'Model 3');
const toyotaCorolla = vehicleDatabase.find(v => v.make === 'Toyota' && v.model === 'Corolla');

const meta: Meta<typeof BigStoryCard> = {
  title: 'Resin Components/BigStoryCard',
  component: BigStoryCard,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
## Big Story Card

A hero-style article card component inspired by Hearst's Resin design system.
Used for featuring prominent automotive content with large images.

### Features
- Large image with configurable position (left/right)
- Sponsor attribution
- Category labels
- Author and date metadata
- Hover effects on image and headline

### Usage
\`\`\`tsx
import { vehicleDatabase } from '../../data/vehicles';

const vehicle = vehicleDatabase.find(v => v.make === 'Honda' && v.model === 'Accord');

<BigStoryCard
  imageUrl={vehicle?.image || ''}
  imageAlt="2025 Honda Accord"
  headline="2025 Honda Accord Review: The Benchmark Gets Even Better"
  sponsor="Car and Driver"
  label="First Drive"
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
    imagePosition: {
      control: 'radio',
      options: ['left', 'right'],
      description: 'Position of the image relative to content',
    },
  },
};

export default meta;
type Story = StoryObj<typeof BigStoryCard>;

export const Default: Story = {
  args: {
    imageUrl: hondaAccord?.image || '',
    imageAlt: `${hondaAccord?.year} ${hondaAccord?.make} ${hondaAccord?.model}`,
    headline: `${hondaAccord?.year} ${hondaAccord?.make} ${hondaAccord?.model} Review: The Benchmark Sedan Gets Even Better`,
    sponsor: 'Car and Driver',
    label: 'First Drive',
    author: 'Dan Edmunds',
    date: 'Dec 22, 2024',
    imagePosition: 'right',
  },
};

export const ImageLeft: Story = {
  args: {
    imageUrl: bmw3Series?.image || '',
    imageAlt: `${bmw3Series?.year} ${bmw3Series?.make} ${bmw3Series?.model}`,
    headline: `${bmw3Series?.year} ${bmw3Series?.make} ${bmw3Series?.model}: Still the Ultimate Driving Machine`,
    sponsor: 'Car and Driver',
    label: 'Comparison Test',
    author: 'K.C. Colwell',
    date: 'Dec 20, 2024',
    imagePosition: 'left',
  },
};

export const WithoutSponsor: Story = {
  args: {
    imageUrl: fordMustang?.image || '',
    imageAlt: `${fordMustang?.year} ${fordMustang?.make} ${fordMustang?.model}`,
    headline: `The ${fordMustang?.year} ${fordMustang?.make} ${fordMustang?.model} Dark Horse Is America's Sports Car at Its Best`,
    label: 'Road Test',
    author: 'Eric Stafford',
    date: 'Dec 18, 2024',
    imagePosition: 'right',
  },
};

export const MinimalInfo: Story = {
  args: {
    imageUrl: porsche911?.image || '',
    imageAlt: `${porsche911?.year} ${porsche911?.make} ${porsche911?.model}`,
    headline: `${porsche911?.year} ${porsche911?.make} ${porsche911?.model} Carrera GTS: The Sweet Spot of the 911 Lineup`,
    imagePosition: 'right',
  },
};

export const EVFeature: Story = {
  args: {
    imageUrl: teslaModel3?.image || '',
    imageAlt: `${teslaModel3?.year} ${teslaModel3?.make} ${teslaModel3?.model}`,
    headline: `${teslaModel3?.year} ${teslaModel3?.make} ${teslaModel3?.model} Highland: The Best-Selling EV Gets a Major Refresh`,
    sponsor: 'Car and Driver',
    label: 'EV Review',
    author: 'Roberto Baldwin',
    date: 'Dec 15, 2024',
    imagePosition: 'left',
  },
};

export const LongHeadline: Story = {
  args: {
    imageUrl: toyotaCorolla?.image || '',
    imageAlt: `${toyotaCorolla?.year} ${toyotaCorolla?.make} ${toyotaCorolla?.model}`,
    headline: `The ${toyotaCorolla?.year} ${toyotaCorolla?.make} ${toyotaCorolla?.model} Hybrid Proves That Efficiency and Excitement Can Coexist in Today's Sedan Market`,
    sponsor: 'Car and Driver',
    label: 'Long-Term Test',
    author: 'Austin Irwin',
    date: 'Dec 10, 2024',
    imagePosition: 'right',
  },
};
