import type { Meta, StoryObj } from '@storybook/react';
import Incentives from './Incentives';

const meta: Meta<typeof Incentives> = {
  title: 'Organisms/Incentives',
  component: Incentives,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
# Incentives & Offers

## 📋 Product Overview

Displays current manufacturer incentives, rebates, and special financing. This is **high-value content** that directly impacts purchase decisions.

---

## 🎯 Business Purpose

| Goal | How It Achieves It |
|------|-------------------|
| **Purchase Urgency** | Limited-time offers create urgency |
| **Value Communication** | Shows total savings available |
| **Lead Generation** | "Get This Deal" CTAs drive leads |
| **Competitive Edge** | Users get info not on dealer sites |

---

## 📊 Key Metrics to Track

- **Incentive Views**: Which offers get most attention
- **CTA Clicks**: "Get This Deal" engagement
- **Time Sensitivity**: Impact of expiration dates
- **Regional Variance**: Local offer performance

---

## 💰 Incentive Types

| Type | Description | Typical Value |
|------|-------------|---------------|
| **Cash Rebate** | Direct discount from MSRP | $500-$5,000 |
| **APR Special** | Reduced financing rate | 0-2.9% |
| **Lease Deal** | Monthly payment special | $199-$399/mo |
| **Trade Bonus** | Extra trade-in value | $500-$2,000 |
| **Loyalty** | Returning customer discount | $500-$1,500 |
| **EV Tax Credit** | Federal/state incentives | $2,500-$7,500 |

---

## ⏰ Time Sensitivity

| Element | Purpose |
|---------|---------|
| **Expiration Date** | Creates urgency |
| **"Ends Soon" Badge** | Highlights expiring offers |
| **Monthly Refresh** | Incentives change monthly |

---

## 💡 PM Considerations

1. **Data Freshness**:
   - Incentives change monthly
   - Regional variations exist
   - Stacking rules are complex

2. **Revenue Opportunity**:
   - High purchase intent users
   - Direct dealer lead attribution
   - Premium placement for OEMs

3. **Compliance**:
   - Accurate expiration dates
   - Fine print disclosure
   - Regional availability notes

4. **EV Focus**:
   - Federal tax credit prominence
   - State incentive aggregation
   - Charging incentives
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    make: {
      description: 'Vehicle manufacturer',
      control: 'select',
      options: ['Chevrolet', 'Toyota', 'Honda', 'Ford', 'BMW', 'Tesla'],
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
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    make: 'Chevrolet',
    model: 'Trax',
  },
  parameters: {
    docs: {
      description: {
        story: 'Standard incentives display for a mainstream vehicle.',
      },
    },
  },
};

export const LuxuryBrand: Story = {
  args: {
    make: 'Chevrolet',
    model: 'Trailblazer',
  },
  parameters: {
    docs: {
      description: {
        story: 'Incentives for a mid-range vehicle with different offer structure.',
      },
    },
  },
};

export const Electric: Story = {
  args: {
    make: 'Chevrolet',
    model: 'Bolt EV',
  },
  parameters: {
    docs: {
      description: {
        story: 'Electric vehicle incentives including federal tax credit information.',
      },
    },
  },
};
