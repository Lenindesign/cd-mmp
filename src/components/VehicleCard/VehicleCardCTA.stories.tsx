import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import { VehicleCard } from './VehicleCard';

/**
 * # Vehicle Card CTA Controls
 * 
 * This story allows you to test and configure the Call-to-Action (CTA) buttons on vehicle cards.
 * 
 * ## How to Use
 * 
 * Use the **Controls** panel below to customize:
 * 
 * | Control | Description |
 * |---------|-------------|
 * | **CTA 1 Text** | Text for the first button |
 * | **CTA 1 Variant** | Color style for the first button |
 * | **Show CTA 2** | Toggle to show/hide second button |
 * | **CTA 2 Text** | Text for the second button |
 * | **CTA 2 Variant** | Color style for the second button |
 * 
 * ## Available Variants
 * 
 * - **primary** - Blue filled button (main action)
 * - **outline** - Blue outlined button (secondary action)
 * - **secondary** - Gray button (tertiary action)
 * - **success** - Green button (positive action like trade-in)
 * - **danger** - Red button (destructive action)
 */
const meta: Meta<typeof VehicleCard> = {
  title: 'Molecules/VehicleCard/CTA Playground',
  component: VehicleCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Interactive playground for testing CTA button configurations on vehicle cards.',
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: '380px' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    // CTA Controls - Primary focus
    cta1Text: {
      name: 'CTA 1 Text',
      control: 'text',
      description: 'Text displayed on the first CTA button',
      table: {
        category: '🎯 CTA Configuration',
        defaultValue: { summary: 'SHOP NEW' },
      },
    },
    cta1Variant: {
      name: 'CTA 1 Variant',
      control: 'select',
      options: ['primary', 'outline', 'secondary', 'success', 'success-outline', 'danger'],
      description: 'Color variant for the first CTA button',
      table: {
        category: '🎯 CTA Configuration',
        defaultValue: { summary: 'primary' },
      },
    },
    showCta2: {
      name: 'Show CTA 2',
      control: 'boolean',
      description: 'Toggle to show or hide the second CTA button',
      table: {
        category: '🎯 CTA Configuration',
        defaultValue: { summary: 'true' },
      },
    },
    cta2Text: {
      name: 'CTA 2 Text',
      control: 'text',
      description: 'Text displayed on the second CTA button',
      table: {
        category: '🎯 CTA Configuration',
        defaultValue: { summary: 'GET TRADE-IN VALUE' },
      },
      if: { arg: 'showCta2' },
    },
    cta2Variant: {
      name: 'CTA 2 Variant',
      control: 'select',
      options: ['primary', 'outline', 'secondary', 'success', 'success-outline', 'danger'],
      description: 'Color variant for the second CTA button',
      table: {
        category: '🎯 CTA Configuration',
        defaultValue: { summary: 'success-outline' },
      },
      if: { arg: 'showCta2' },
    },
    // Hide other controls to keep focus on CTAs
    id: { table: { disable: true } },
    slug: { table: { disable: true } },
    image: { table: { disable: true } },
    bodyStyle: { table: { disable: true } },
    priceLabel: { table: { disable: true } },
    rank: { table: { disable: true } },
    badge: { table: { disable: true } },
    editorsChoice: { table: { disable: true } },
    tenBest: { table: { disable: true } },
    evOfTheYear: { table: { disable: true } },
    year: { table: { disable: true } },
    mileage: { table: { disable: true } },
    dealerName: { table: { disable: true } },
    distance: { table: { disable: true } },
    trim: { table: { disable: true } },
    showShopButton: { table: { disable: true } },
    shopButtonText: { table: { disable: true } },
    shopButtonVariant: { table: { disable: true } },
    onShopClick: { table: { disable: true } },
    ctas: { table: { disable: true } },
    isCurrentVehicle: { table: { disable: true } },
    epaMpg: { table: { disable: true } },
    cdSays: { table: { disable: true } },
    availableYears: { table: { disable: true } },
    yearDetails: { table: { disable: true } },
    modelName: { table: { disable: true } },
    // Show these for context
    name: {
      name: 'Vehicle Name',
      control: 'text',
      table: {
        category: '📋 Vehicle Info',
      },
    },
    price: {
      name: 'Price',
      control: 'text',
      table: {
        category: '📋 Vehicle Info',
      },
    },
    rating: {
      name: 'Rating',
      control: { type: 'number', min: 1, max: 10, step: 0.1 },
      table: {
        category: '📋 Vehicle Info',
      },
    },
  },
};

export default meta;

// Custom story type with our CTA args
interface CTAPlaygroundArgs {
  name: string;
  price: string;
  rating: number;
  cta1Text: string;
  cta1Variant: 'primary' | 'outline' | 'secondary' | 'success' | 'success-outline' | 'danger';
  showCta2: boolean;
  cta2Text: string;
  cta2Variant: 'primary' | 'outline' | 'secondary' | 'success' | 'success-outline' | 'danger';
}

type Story = StoryObj<CTAPlaygroundArgs>;

export const Playground: Story = {
  args: {
    name: '2026 Honda Accord',
    price: '$27,295',
    rating: 9.9,
    cta1Text: 'SHOP NEW ACCORD',
    cta1Variant: 'primary',
    showCta2: true,
    cta2Text: 'GET TRADE-IN VALUE',
    cta2Variant: 'success-outline',
  },
  render: (args) => {
    const ctas = [
      { text: args.cta1Text, variant: args.cta1Variant, onClick: fn() },
      ...(args.showCta2 ? [{ text: args.cta2Text, variant: args.cta2Variant, onClick: fn() }] : []),
    ];

    return (
      <VehicleCard
        id="cta-playground"
        name={args.name}
        slug="honda/accord/2026"
        image="https://d2kde5ohu8qb21.cloudfront.net/files/679d37b47ff34400082301e7/19-2025-honda-accord-front-view.jpg"
        price={args.price}
        priceLabel="Starting at"
        rating={args.rating}
        epaMpg={48}
        cdSays="Read our 2026 Honda Accord review for information on ratings, pricing, specs, and features."
        availableYears={[2026, 2025, 2024]}
        ctas={ctas}
      />
    );
  },
};

/**
 * Pre-configured example: Shop New + Shop Used
 */
export const ShopNewAndUsed: Story = {
  args: {
    name: '2026 Honda Accord',
    price: '$27,295',
    rating: 9.9,
    cta1Text: 'SHOP NEW',
    cta1Variant: 'primary',
    showCta2: true,
    cta2Text: 'SHOP USED',
    cta2Variant: 'outline',
  },
  render: (args) => {
    const ctas = [
      { text: args.cta1Text, variant: args.cta1Variant, onClick: fn() },
      ...(args.showCta2 ? [{ text: args.cta2Text, variant: args.cta2Variant, onClick: fn() }] : []),
    ];

    return (
      <VehicleCard
        id="shop-new-used"
        name={args.name}
        slug="honda/accord/2026"
        image="https://d2kde5ohu8qb21.cloudfront.net/files/679d37b47ff34400082301e7/19-2025-honda-accord-front-view.jpg"
        price={args.price}
        priceLabel="Starting at"
        rating={args.rating}
        epaMpg={48}
        cdSays="Read our 2026 Honda Accord review for information on ratings, pricing, specs, and features."
        availableYears={[2026, 2025, 2024]}
        ctas={ctas}
      />
    );
  },
};

/**
 * Pre-configured example: Single CTA
 */
export const SingleCTA: Story = {
  args: {
    name: '2026 Honda Accord',
    price: '$27,295',
    rating: 9.9,
    cta1Text: 'SHOP NOW',
    cta1Variant: 'outline',
    showCta2: false,
    cta2Text: '',
    cta2Variant: 'secondary',
  },
  render: (args) => {
    const ctas = [
      { text: args.cta1Text, variant: args.cta1Variant, onClick: fn() },
      ...(args.showCta2 ? [{ text: args.cta2Text, variant: args.cta2Variant, onClick: fn() }] : []),
    ];

    return (
      <VehicleCard
        id="single-cta"
        name={args.name}
        slug="honda/accord/2026"
        image="https://d2kde5ohu8qb21.cloudfront.net/files/679d37b47ff34400082301e7/19-2025-honda-accord-front-view.jpg"
        price={args.price}
        priceLabel="Starting at"
        rating={args.rating}
        epaMpg={48}
        cdSays="Read our 2026 Honda Accord review for information on ratings, pricing, specs, and features."
        availableYears={[2026, 2025, 2024]}
        ctas={ctas}
      />
    );
  },
};

