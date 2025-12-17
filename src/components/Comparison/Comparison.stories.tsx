import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import Comparison from './Comparison';

const meta: Meta<typeof Comparison> = {
  title: 'Organisms/Comparison',
  component: Comparison,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
# Vehicle Comparison

## Overview

Side-by-side comparison showing how the current vehicle stacks up against competitors. A key research tool for users in the consideration phase.

---

## Business Purpose

| Goal | How It Achieves It |
|------|-------------------|
| Research Depth | Keeps users on site longer |
| Cross-Selling | Exposes users to alternatives |
| Trust Building | Objective comparison builds credibility |
| Decision Support | Helps users make informed choices |

---

## Key Metrics

- **Competitor Click Rate** — Which alternatives get clicks
- **Comparison Tool Usage** — Full comparison page visits
- **Return Behavior** — Users coming back to compare
- **Conversion Correlation** — Does comparing predict leads?

---

## Matching Algorithm

| Factor | Weight | Description |
|--------|--------|-------------|
| Body Style | High | Same category (SUV vs SUV) |
| Price Range | High | Within ±20% of MSRP |
| Segment | Medium | Subcompact, Compact, etc. |
| Rating | Low | Similar C/D scores |

---

## Comparison Elements

| Element | Purpose |
|---------|---------|
| Vehicle Image | Visual identification |
| Name and Year | Quick reference |
| C/D Rating | Expert score comparison |
| Price Range | Budget alignment |
| Key Specs | Quick differentiation |
| View Details CTA | Drive to competitor VDP |

---

## Product Considerations

**Competitor Selection**
- Algorithm-driven vs curated
- OEM preferences (show/hide certain brands?)
- Regional availability

**User Journey**
- Users in "consideration" phase
- High intent but not decided
- Need objective information

**Revenue Implications**
- Cross-selling opportunity
- May lead users to other vehicles
- Builds overall site engagement

**A/B Testing Ideas**
- Number of competitors shown
- Spec comparison depth
- CTA text variations
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    currentVehicle: {
      description: 'The vehicle being compared (used to find similar competitors)',
      control: 'object',
      table: {
        type: { 
          summary: 'Vehicle',
          detail: '{ make: string; model: string }',
        },
        category: 'Vehicle',
      },
    },
    title: {
      description: 'Custom section heading',
      control: 'text',
      table: {
        type: { summary: 'string' },
        category: 'Content',
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
    currentVehicle: {
      make: 'Chevrolet',
      model: 'Trax',
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Default comparison view showing competitors for a subcompact SUV.',
      },
    },
  },
};

export const SUV: Story = {
  args: {
    currentVehicle: {
      make: 'Chevrolet',
      model: 'Trailblazer',
    },
    title: 'Compare SUVs',
  },
  parameters: {
    docs: {
      description: {
        story: 'Compact SUV comparison with custom title.',
      },
    },
  },
};

export const Truck: Story = {
  args: {
    currentVehicle: {
      make: 'Chevrolet',
      model: 'Silverado',
    },
    title: 'Compare Trucks',
  },
  parameters: {
    docs: {
      description: {
        story: 'Truck comparison showing pickup competitors.',
      },
    },
  },
};

export const CustomTitle: Story = {
  args: {
    currentVehicle: {
      make: 'Chevrolet',
      model: 'Trax',
    },
    title: 'Similar Vehicles to Consider',
  },
  parameters: {
    docs: {
      description: {
        story: 'Comparison with custom section heading for different contexts.',
      },
    },
  },
};
