import type { Meta, StoryObj } from '@storybook/react';
import { PricingCTAV1B } from './PricingCTA';

const meta: Meta<typeof PricingCTAV1B> = {
  title: 'Organisms/PricingCTA',
  component: PricingCTAV1B,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
# Pricing CTA Section

## 📋 Product Overview

The **primary lead generation component** on the VDP. Captures user information and connects them with local dealers.

---

## 🎯 Business Purpose

| Goal | How It Achieves It |
|------|-------------------|
| **Lead Generation** | Form captures contact info |
| **Dealer Revenue** | Leads sent to local dealers |
| **Local Relevance** | Location-based pricing/inventory |
| **Conversion Focus** | Clear, prominent CTAs |

---

## 📊 Key Metrics to Track

| Metric | Target | Description |
|--------|--------|-------------|
| **Form Start Rate** | 8-12% | Users who begin form |
| **Form Completion** | 40-60% | Started → submitted |
| **Lead Quality Score** | 7+ | Dealer feedback rating |
| **Cost Per Lead** | <$25 | Acquisition efficiency |

---

## 📝 Lead Capture Fields

| Field | Required | Purpose |
|-------|----------|---------|
| **Email** | Yes | Primary contact |
| **Phone** | Optional | Higher intent signal |
| **ZIP Code** | Yes | Dealer matching |
| **Timeline** | Optional | Purchase urgency |

---

## 🏪 Dealer Connection

| Step | Description |
|------|-------------|
| 1. User submits | Form data captured |
| 2. ZIP matching | Find nearby dealers |
| 3. Lead routing | Send to top 3 dealers |
| 4. Dealer response | Within 24 hours |

---

## 💡 PM Considerations

1. **Revenue Attribution**:
   - Track lead → sale conversion
   - Dealer feedback loop
   - Cost per acquisition

2. **Form Optimization**:
   - Minimize fields (higher completion)
   - Progressive disclosure
   - Mobile-first design

3. **A/B Testing Priorities**:
   - CTA button text
   - Form field order
   - Value proposition messaging
   - Social proof elements

4. **Compliance**:
   - TCPA for phone leads
   - CAN-SPAM for emails
   - State-specific requirements

5. **Location Strategy**:
   - Auto-detect vs manual entry
   - Fallback for unknown locations
   - Regional inventory messaging
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
    msrp: {
      description: 'Base MSRP for pricing display',
      control: { type: 'number', min: 15000, max: 200000, step: 1000 },
      table: {
        type: { summary: 'number' },
        category: 'Pricing',
      },
    },
    location: {
      description: 'User location for local dealer/pricing info',
      control: 'text',
      table: {
        type: { summary: 'string' },
        category: 'Location',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    vehicleName: '2025 Chevrolet Trax',
    make: 'Chevrolet',
    model: 'Trax',
    msrp: 21895,
  },
  parameters: {
    docs: {
      description: {
        story: 'Default pricing CTA without location - prompts user to enter location.',
      },
    },
  },
};

export const SUV: Story = {
  args: {
    vehicleName: '2025 Chevrolet Trailblazer',
    make: 'Chevrolet',
    model: 'Trailblazer',
    msrp: 24995,
    location: 'Los Angeles, CA',
  },
  parameters: {
    docs: {
      description: {
        story: 'CTA with location pre-filled, showing local pricing and dealers.',
      },
    },
  },
};

export const Luxury: Story = {
  args: {
    vehicleName: '2025 Chevrolet Camaro',
    make: 'Chevrolet',
    model: 'Camaro',
    msrp: 29100,
    location: 'New York, NY',
  },
  parameters: {
    docs: {
      description: {
        story: 'Performance vehicle CTA in a major metro market.',
      },
    },
  },
};

export const Truck: Story = {
  args: {
    vehicleName: '2025 Chevrolet Silverado',
    make: 'Chevrolet',
    model: 'Silverado',
    msrp: 36000,
    location: 'Dallas, TX',
  },
  parameters: {
    docs: {
      description: {
        story: 'Truck CTA in a truck-heavy market (Texas).',
      },
    },
  },
};

export const Budget: Story = {
  args: {
    vehicleName: '2025 Chevrolet Trax LS',
    make: 'Chevrolet',
    model: 'Trax',
    msrp: 21895,
    location: 'Miami, FL',
  },
  parameters: {
    docs: {
      description: {
        story: 'Budget-focused CTA highlighting value and affordability.',
      },
    },
  },
};
