import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import { fn } from 'storybook/test';
import { VehicleCard } from './VehicleCard';

const meta: Meta<typeof VehicleCard> = {
  title: 'Molecules/VehicleCard',
  component: VehicleCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# VehicleCard

Card component for displaying vehicle information in lists, grids, and carousels.

---

## Variants

| Variant | Use Case |
|---------|----------|
| **New Vehicle** | Shows rating, price, and optional badges |
| **Used Vehicle** | Shows mileage, dealer info, and distance |
| **Ranked** | Shows rank number for Top 10 lists |
| **With Shop CTA** | Includes shop button for purchase flow |

---

## Features

- Responsive image with lazy loading
- Editor's Choice and 10Best badge support
- Rank indicator for Top 10 lists
- Rating display with /10 scale
- Used car details (mileage, dealer, distance)
- Optional shop button with click handler

---

## Accessibility

- Semantic link wrapping entire card
- Alt text for vehicle images
- Proper heading hierarchy
- Focus states for interactive elements
        `,
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <MemoryRouter>
        <div style={{ width: '300px' }}>
          <Story />
        </div>
      </MemoryRouter>
    ),
  ],
  argTypes: {
    name: {
      control: 'text',
      description: 'Vehicle name (make, model, year)',
      table: {
        type: { summary: 'string' },
        category: 'Content',
      },
    },
    price: {
      control: 'text',
      description: 'Formatted price string',
      table: {
        type: { summary: 'string' },
        category: 'Content',
      },
    },
    rating: {
      control: { type: 'number', min: 1, max: 10, step: 0.5 },
      description: 'Vehicle rating out of 10',
      table: {
        type: { summary: 'number' },
        category: 'Content',
      },
    },
    rank: {
      control: { type: 'number', min: 1, max: 10 },
      description: 'Rank position for Top 10 lists',
      table: {
        type: { summary: 'number' },
        category: 'Display',
      },
    },
    badge: {
      control: 'select',
      options: [undefined, 'best-value', 'editors-choice'],
      description: 'Badge type to display',
      table: {
        type: { summary: 'best-value | editors-choice' },
        category: 'Display',
      },
    },
    editorsChoice: {
      control: 'boolean',
      description: "Show Editor's Choice icon badge",
      table: {
        type: { summary: 'boolean' },
        category: 'Badges',
      },
    },
    tenBest: {
      control: 'boolean',
      description: 'Show 10Best icon badge',
      table: {
        type: { summary: 'boolean' },
        category: 'Badges',
      },
    },
    showShopButton: {
      control: 'boolean',
      description: 'Show shop CTA button',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Actions',
      },
    },
    isCurrentVehicle: {
      control: 'boolean',
      description: 'Highlight as currently selected vehicle',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'State',
      },
    },
  },
  args: {
    onShopClick: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleImage = 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600&h=400&fit=crop';

// ============================================
// NEW VEHICLE VARIANTS
// ============================================

export const Default: Story = {
  args: {
    id: '1',
    name: '2025 Honda Accord',
    slug: 'honda/accord/2025',
    image: sampleImage,
    price: '$28,990',
    priceLabel: 'Starting at',
    rating: 8.5,
  },
};

export const WithRating: Story = {
  args: {
    id: '2',
    name: '2025 Toyota Camry',
    slug: 'toyota/camry/2025',
    image: sampleImage,
    price: '$27,070',
    rating: 9.0,
  },
};

export const WithBodyStyle: Story = {
  args: {
    id: '3',
    name: '2025 BMW 3 Series',
    slug: 'bmw/3-series/2025',
    image: sampleImage,
    price: '$44,900',
    rating: 8.5,
    bodyStyle: 'Sedan',
  },
};

// ============================================
// BADGE VARIANTS
// ============================================

export const EditorsChoice: Story = {
  args: {
    id: '4',
    name: '2025 Mazda CX-5',
    slug: 'mazda/cx-5/2025',
    image: sampleImage,
    price: '$30,300',
    rating: 9.0,
    editorsChoice: true,
  },
};

export const TenBest: Story = {
  args: {
    id: '5',
    name: '2025 Porsche 911',
    slug: 'porsche/911/2025',
    image: sampleImage,
    price: '$115,400',
    rating: 10,
    tenBest: true,
  },
};

export const AllBadges: Story = {
  args: {
    id: '6',
    name: '2025 Honda Civic',
    slug: 'honda/civic/2025',
    image: sampleImage,
    price: '$24,950',
    rating: 9.5,
    editorsChoice: true,
    tenBest: true,
  },
};

export const BestValue: Story = {
  args: {
    id: '7',
    name: '2025 Kia Forte',
    slug: 'kia/forte/2025',
    image: sampleImage,
    price: '$20,115',
    rating: 7.5,
    badge: 'best-value',
  },
};

// ============================================
// RANKED VARIANTS (TOP 10)
// ============================================

export const RankedFirst: Story = {
  args: {
    id: '8',
    name: '2025 Honda Accord',
    slug: 'honda/accord/2025',
    image: sampleImage,
    price: '$28,990',
    rating: 9.5,
    rank: 1,
  },
};

export const RankedOther: Story = {
  args: {
    id: '9',
    name: '2025 Toyota Camry',
    slug: 'toyota/camry/2025',
    image: sampleImage,
    price: '$27,070',
    rating: 9.0,
    rank: 5,
  },
};

export const RankedWithShop: Story = {
  args: {
    id: '10',
    name: '2025 BMW 3 Series',
    slug: 'bmw/3-series/2025',
    image: sampleImage,
    price: '$44,900',
    rating: 8.5,
    rank: 3,
    showShopButton: true,
  },
};

// ============================================
// USED VEHICLE VARIANTS
// ============================================

export const UsedVehicle: Story = {
  args: {
    id: '11',
    name: '2022 Honda Accord',
    slug: 'used/honda/accord/123',
    image: sampleImage,
    price: '$24,500',
    priceLabel: 'Price',
    year: 2022,
    mileage: 32500,
    trim: 'Sport 2.0T',
    dealerName: 'Honda of Downtown',
    distance: 12,
  },
};

export const UsedVehicleMinimal: Story = {
  args: {
    id: '12',
    name: '2021 Toyota Camry',
    slug: 'used/toyota/camry/456',
    image: sampleImage,
    price: '$22,900',
    priceLabel: 'Price',
    mileage: 45000,
  },
};

// ============================================
// STATE VARIANTS
// ============================================

export const CurrentVehicle: Story = {
  args: {
    id: '13',
    name: '2025 Honda Accord',
    slug: 'honda/accord/2025',
    image: sampleImage,
    price: '$28,990',
    rating: 9.0,
    rank: 2,
    isCurrentVehicle: true,
  },
};

// ============================================
// GRID LAYOUT
// ============================================

export const GridLayout: Story = {
  decorators: [
    () => (
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(3, 280px)', 
        gap: '24px',
        padding: '24px',
      }}>
        <VehicleCard
          id="1"
          name="2025 Honda Accord"
          slug="honda/accord/2025"
          image={sampleImage}
          price="$28,990"
          rating={9.5}
          rank={1}
          editorsChoice
        />
        <VehicleCard
          id="2"
          name="2025 Toyota Camry"
          slug="toyota/camry/2025"
          image={sampleImage}
          price="$27,070"
          rating={9.0}
          rank={2}
        />
        <VehicleCard
          id="3"
          name="2025 BMW 3 Series"
          slug="bmw/3-series/2025"
          image={sampleImage}
          price="$44,900"
          rating={8.5}
          rank={3}
          tenBest
        />
      </div>
    ),
  ],
};

