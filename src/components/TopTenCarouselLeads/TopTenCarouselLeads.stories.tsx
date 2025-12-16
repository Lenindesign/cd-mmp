import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import { MemoryRouter } from 'react-router-dom';
import TopTenCarouselLeads from './TopTenCarouselLeads';

const meta: Meta<typeof TopTenCarouselLeads> = {
  title: 'Organisms/TopTenCarouselLeads',
  component: TopTenCarouselLeads,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Top 10 Carousel with Lead Generation

## 📋 Product Overview

A high-impact carousel showcasing top-ranked vehicles with integrated lead generation. This is a **key conversion component** that drives dealer leads.

---

## 🎯 Business Purpose

| Goal | How It Achieves It |
|------|-------------------|
| **Lead Generation** | Shop Used CTAs drive dealer connections |
| **Discovery** | Exposes users to top-rated alternatives |
| **Authority** | "Top 10" framing establishes expertise |
| **Engagement** | Carousel interaction increases time on site |

---

## 📊 Key Metrics to Track

- **Lead Conversion Rate**: Shop Used clicks → dealer form submissions
- **Carousel Engagement**: Slides scrolled, arrows clicked
- **Card CTR**: Which rank positions get most clicks
- **Filter Usage**: Which filters users apply most

---

## 🎛️ Filtering Options

| Filter | Use Case |
|--------|----------|
| **bodyStyle** | "Top 10 SUVs", "Top 10 Sedans" |
| **make** | "Top Toyota Vehicles" |
| **lifestyle** | "Best Family Vehicles" |
| **maxPrice** | "Top Vehicles Under $35,000" |

---

## 🏆 Badge System

| Badge | Meaning | Visual |
|-------|---------|--------|
| **Rank #1** | Top-rated vehicle | Gold badge |
| **Editor's Choice** | Editorial pick | EC icon |
| **10Best** | Annual award winner | 10Best icon |

---

## 📱 Responsive Behavior

| Screen | Cards Visible | Navigation |
|--------|---------------|------------|
| Desktop | 4-5 cards | Arrow buttons |
| Tablet | 2-3 cards | Touch scroll + arrows |
| Mobile | 1-2 cards | Touch scroll |

---

## 💡 PM Considerations

1. **Personalization Opportunities**:
   - Filter by user's saved preferences
   - Show vehicles in user's budget range
   - Lifestyle-based recommendations

2. **A/B Testing Ideas**:
   - CTA text variations ("Shop Used" vs "See Deals")
   - Number of cards shown
   - Auto-scroll vs manual

3. **Data Requirements**:
   - Vehicle ratings for ranking
   - Lifestyle tags in database
   - Used inventory availability

4. **Revenue Impact**:
   - Direct dealer lead attribution
   - Track "Shop Used" → form completion funnel
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      description: 'Main heading for the carousel section',
      control: 'text',
      table: {
        type: { summary: 'string' },
        category: 'Content',
      },
    },
    subtitle: {
      description: 'Secondary text below the title',
      control: 'text',
      table: {
        type: { summary: 'string' },
        category: 'Content',
      },
    },
    bodyStyle: {
      description: 'Filter vehicles by body style',
      control: 'select',
      options: ['SUV', 'Sedan', 'Truck', 'Coupe', 'Hatchback', 'Convertible', 'Wagon'],
      table: {
        type: { summary: 'string' },
        category: 'Filtering',
      },
    },
    make: {
      description: 'Filter vehicles by manufacturer',
      control: 'select',
      options: ['Toyota', 'Honda', 'Ford', 'Chevrolet', 'BMW', 'Mercedes-Benz', 'Audi'],
      table: {
        type: { summary: 'string' },
        category: 'Filtering',
      },
    },
    lifestyle: {
      description: 'Filter by lifestyle category',
      control: 'select',
      options: ['family', 'commuter', 'adventure', 'luxury', 'performance'],
      table: {
        type: { summary: 'string' },
        category: 'Filtering',
      },
    },
    maxPrice: {
      description: 'Maximum price filter',
      control: { type: 'number', min: 20000, max: 200000, step: 5000 },
      table: {
        type: { summary: 'number' },
        category: 'Filtering',
      },
    },
    currentVehicleId: {
      description: 'ID of current vehicle to highlight',
      control: 'text',
      table: {
        type: { summary: 'string' },
        category: 'Filtering',
      },
    },
    onShopUsed: {
      description: 'Callback when user clicks Shop Used on a vehicle',
      table: {
        type: { summary: '(vehicle) => void' },
        category: 'Events',
      },
    },
    onViewRankings: {
      description: 'Callback when user clicks View Rankings',
      table: {
        type: { summary: '() => void' },
        category: 'Events',
      },
    },
  },
  args: {
    onShopUsed: fn(),
    onViewRankings: fn(),
  },
  decorators: [
    (Story) => (
      <MemoryRouter>
        <div style={{ padding: '20px', background: '#f5f5f5' }}>
          <Story />
        </div>
      </MemoryRouter>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'Default carousel showing all top-ranked vehicles without filtering.',
      },
    },
  },
};

export const FilteredByBodyStyle: Story = {
  args: {
    bodyStyle: 'SUV',
    title: 'Top 10 SUVs',
    subtitle: 'Our experts pick the best SUVs on the market',
  },
  parameters: {
    docs: {
      description: {
        story: 'Carousel filtered to show only SUVs with custom title and subtitle.',
      },
    },
  },
};

export const FilteredByMake: Story = {
  args: {
    make: 'Toyota',
    title: 'Top Toyota Vehicles',
  },
  parameters: {
    docs: {
      description: {
        story: 'Carousel filtered to show only vehicles from a specific manufacturer.',
      },
    },
  },
};

export const FilteredByPrice: Story = {
  args: {
    maxPrice: 35000,
    title: 'Top Vehicles Under $35,000',
    subtitle: 'Best value picks for budget-conscious buyers',
  },
  parameters: {
    docs: {
      description: {
        story: 'Carousel filtered by maximum price, ideal for budget-conscious shoppers.',
      },
    },
  },
};

export const WithCurrentVehicle: Story = {
  args: {
    currentVehicleId: 'vehicle-1',
    title: 'See How This Vehicle Ranks',
  },
  parameters: {
    docs: {
      description: {
        story: 'Carousel with a specific vehicle highlighted to show its ranking position.',
      },
    },
  },
};

export const WithLifestyle: Story = {
  args: {
    lifestyle: 'family',
    title: 'Best Family Vehicles',
    subtitle: 'Safe, spacious, and practical choices for families',
  },
  parameters: {
    docs: {
      description: {
        story: 'Carousel filtered by lifestyle category, matching vehicles to user preferences.',
      },
    },
  },
};
