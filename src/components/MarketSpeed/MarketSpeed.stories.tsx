import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import MarketSpeed from './MarketSpeed';

const meta: Meta<typeof MarketSpeed> = {
  title: 'Organisms/MarketSpeed',
  component: MarketSpeed,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
# Market Speed Indicator

## Overview

Shows how quickly vehicles are selling in the market. Creates urgency for hot vehicles and negotiation confidence for slow sellers.

---

## Business Purpose

| Goal | How It Achieves It |
|------|-------------------|
| Urgency Creation | "Selling fast" motivates action |
| Negotiation Intel | "Slow" signals room to negotiate |
| Market Transparency | Unique data not on dealer sites |
| Trust Building | Honest market conditions |

---

## Key Metrics

- **Correlation with Leads** — Does "Hot" increase conversions?
- **User Engagement** — Time spent, interactions
- **Regional Accuracy** — Data quality by market
- **Update Frequency** — Freshness of data

---

## Speed Levels

| Level | Days on Lot | User Implication |
|-------|-------------|------------------|
| Hot | <14 days | Act fast, less negotiation room |
| Fast | 14-30 days | Popular, some urgency |
| Average | 30-45 days | Normal conditions |
| Slow | 45+ days | Negotiate harder |

---

## Data Components

| Metric | Description |
|--------|-------------|
| Days on Market | Average time to sell |
| Inventory Level | Supply in region |
| Price Trend | Rising, stable, falling |
| Demand Index | Buyer interest level |

---

## Product Considerations

**Data Sources**
- Dealer inventory feeds
- Auction data
- Transaction databases
- Regional aggregation

**User Psychology**
- "Hot" creates FOMO
- "Slow" empowers negotiation
- Both drive action

**Accuracy Requirements**
- Weekly data refresh minimum
- Regional granularity
- Seasonal adjustments

**A/B Testing Ideas**
- Visual indicator styles
- Urgency messaging variations
- Placement on page
        `,
      },
    },
  },

  argTypes: {
    vehicleName: {
      description: 'Full vehicle name (Year Make Model)',
      control: 'text',
      table: {
        type: { summary: 'string' },
        category: 'Vehicle',
      },
    },
    make: {
      description: 'Vehicle manufacturer',
      control: 'text',
      table: {
        type: { summary: 'string' },
        category: 'Vehicle',
      },
    },
    model: {
      description: 'Vehicle model name',
      control: 'text',
      table: {
        type: { summary: 'string' },
        category: 'Vehicle',
      },
    },
    bodyStyle: {
      description: 'Vehicle body style for market comparison',
      control: 'select',
      options: ['SUV', 'Sedan', 'Truck', 'Coupe', 'Hatchback', 'Convertible', 'Wagon'],
      table: {
        type: { summary: 'string' },
        category: 'Vehicle',
      },
    },
    msrp: {
      description: 'MSRP for price segment analysis',
      control: { type: 'number', min: 15000, max: 200000, step: 1000 },
      table: {
        type: { summary: 'number' },
        category: 'Pricing',
      },
    },
  },
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    vehicleName: '2025 Chevrolet Trax',
    make: 'Chevrolet',
    model: 'Trax',
    bodyStyle: 'SUV',
    msrp: 21895,
  },
  parameters: {
    docs: {
      description: {
        story: 'Market speed indicator for a popular subcompact SUV.',
      },
    },
  },
};

export const SUV: Story = {
  args: {
    vehicleName: '2025 Chevrolet Trailblazer',
    make: 'Chevrolet',
    model: 'Trailblazer',
    bodyStyle: 'SUV',
    msrp: 24995,
  },
  parameters: {
    docs: {
      description: {
        story: 'Compact SUV market analysis showing different demand patterns.',
      },
    },
  },
};

export const Truck: Story = {
  args: {
    vehicleName: '2025 Chevrolet Silverado',
    make: 'Chevrolet',
    model: 'Silverado',
    bodyStyle: 'Truck',
    msrp: 36000,
  },
  parameters: {
    docs: {
      description: {
        story: 'Truck market speed - typically shows different patterns than passenger vehicles.',
      },
    },
  },
};
