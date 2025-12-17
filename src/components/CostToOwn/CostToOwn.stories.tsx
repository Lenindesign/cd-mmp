import type { Meta, StoryObj } from '@storybook/react';
import CostToOwn from './CostToOwn';

const meta: Meta<typeof CostToOwn> = {
  title: 'Organisms/CostToOwn',
  component: CostToOwn,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
# 5-Year Cost to Own

## Overview

Shows the true cost of ownership beyond the sticker price. Helps users understand long-term financial commitment.

---

## Business Purpose

| Goal | How It Achieves It |
|------|-------------------|
| Financial Clarity | Shows total cost, not just MSRP |
| EV Comparison | Highlights fuel savings for EVs |
| Trust Building | Transparent, comprehensive data |
| Decision Support | Helps users budget accurately |

---

## Key Metrics

- **Section Engagement** — Time spent, interactions
- **Trim Comparison Usage** — Users comparing trims
- **EV vs Gas Comparison** — Cross-shopping behavior
- **Correlation with Leads** — Does viewing predict conversion?

---

## Cost Categories

| Category | Description | Typical % of Total |
|----------|-------------|-------------------|
| Depreciation | Value loss over 5 years | 40-50% |
| Fuel/Energy | Gas or electricity costs | 15-25% |
| Insurance | Annual premium estimates | 10-15% |
| Maintenance | Scheduled service | 5-10% |
| Repairs | Expected fixes | 3-8% |
| Financing | Interest if financed | 5-10% |
| Taxes and Fees | Registration, sales tax | 3-5% |

---

## Fuel Type Impact

| Fuel Type | Key Difference |
|-----------|---------------|
| Gas | Higher fuel costs, typical maintenance |
| Electric | Lower fuel, less maintenance, higher depreciation |
| Hybrid | Balanced fuel costs, moderate maintenance |
| Plug-in Hybrid | Variable based on charging habits |

---

## Product Considerations

**Data Sources**
- Depreciation from auction/resale data
- Fuel costs from EPA + gas prices
- Insurance from industry averages
- Maintenance from OEM schedules

**User Value**
- "How much will this really cost?" is key question
- EV buyers especially value this
- Helps compare across fuel types

**Personalization Opportunities**
- Local fuel prices
- User's driving habits
- Financing terms customization
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    vehicleName: {
      description: 'Full vehicle name (Year Make Model)',
      control: 'text',
      table: {
        type: { summary: 'string' },
        category: 'Vehicle',
      },
    },
    msrp: {
      description: 'Base MSRP for cost calculations',
      control: { type: 'number', min: 15000, max: 200000, step: 1000 },
      table: {
        type: { summary: 'number' },
        category: 'Pricing',
      },
    },
    fuelType: {
      description: 'Fuel type affects fuel/energy cost calculations',
      control: 'select',
      options: ['Gas', 'Electric', 'Hybrid', 'Diesel', 'Plug-in Hybrid'],
      table: {
        type: { summary: 'string' },
        category: 'Vehicle',
      },
    },
    trims: {
      description: 'Available trims for comparison',
      control: 'object',
      table: {
        type: { 
          summary: 'Trim[]',
          detail: '{ name: string; msrp: number }[]',
        },
        category: 'Pricing',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    vehicleName: '2025 Chevrolet Trax',
    msrp: 21895,
    fuelType: 'Gas',
  },
  parameters: {
    docs: {
      description: {
        story: 'Basic cost breakdown for an affordable gas-powered SUV.',
      },
    },
  },
};

export const WithTrims: Story = {
  args: {
    vehicleName: '2025 Chevrolet Trax',
    msrp: 21895,
    fuelType: 'Gas',
    trims: [
      { name: 'LS', msrp: 21895 },
      { name: '1RS', msrp: 23195 },
      { name: 'LT', msrp: 23395 },
      { name: 'RS', msrp: 24995 },
      { name: 'ACTIV', msrp: 24995 },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Cost breakdown with trim selector allowing users to compare ownership costs across trims.',
      },
    },
  },
};

export const Electric: Story = {
  args: {
    vehicleName: '2025 Chevrolet Bolt EV',
    msrp: 27495,
    fuelType: 'Electric',
    trims: [
      { name: '1LT', msrp: 27495 },
      { name: '2LT', msrp: 31495 },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Electric vehicle with different cost structure - lower fuel costs, different maintenance patterns.',
      },
    },
  },
};

export const Hybrid: Story = {
  args: {
    vehicleName: '2025 Chevrolet Trailblazer',
    msrp: 24995,
    fuelType: 'Gas',
  },
  parameters: {
    docs: {
      description: {
        story: 'Compact SUV cost breakdown showing mid-range ownership costs.',
      },
    },
  },
};

export const Luxury: Story = {
  args: {
    vehicleName: '2025 Chevrolet Camaro',
    msrp: 29100,
    fuelType: 'Gas',
    trims: [
      { name: '1LS', msrp: 29100 },
      { name: '1LT', msrp: 30700 },
      { name: 'SS', msrp: 44100 },
      { name: 'ZL1', msrp: 71700 },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Performance vehicle with higher insurance and maintenance costs.',
      },
    },
  },
};

export const Exotic: Story = {
  args: {
    vehicleName: '2025 Chevrolet Corvette',
    msrp: 65000,
    fuelType: 'Gas',
  },
  parameters: {
    docs: {
      description: {
        story: 'High-end sports car demonstrating premium ownership costs.',
      },
    },
  },
};
