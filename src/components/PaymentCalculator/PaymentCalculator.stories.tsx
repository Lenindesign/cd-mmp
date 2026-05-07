import type { Meta, StoryObj } from '@storybook/react';
import PaymentCalculator from './PaymentCalculator';

const meta: Meta<typeof PaymentCalculator> = {
  title: 'Organisms/Car Payment Calculator',
  component: PaymentCalculator,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
# Car Payment Calculator

## Overview

Distilled **Finance / Lease / Cash** estimate: shared price and trade-in, finance rate from **credit tier** (plus optional promo APR), one **primary CTA**.

---

## Business Purpose

| Goal | How It Achieves It |
|------|-------------------|
| Purchase Confidence | Shows affordable payment options |
| Lead Generation | "Send Offer" CTA captures high-intent users |
| Engagement | Interactive sliders keep users on-page |
| Conversion | Removes payment uncertainty |

---

## Tabs

| Tab | What It Shows |
|-----|---------------|
| Finance | Amortized loan: monthly payment, interest, total out-of-pocket |
| Lease | Up-front (synced with Finance down), residual (MSRP-based), lease APR slider (MF × 2400), optional MF field in details |
| Cash | Vehicle price minus trade-in (excl. taxes/fees) |

---

## Key Inputs

| Input | Type | Description |
|-------|------|-------------|
| Vehicle price | Slider | |
| Down / up-front | Slider | Single value shared between Finance down and Lease up-front |
| Credit tier | Select | Sets APR (finance) |
| Loan term | Pills | |
| Lease: residual, APR→MF, term | Sliders / pills | MF optional in “Money factor” disclosure |
| Trade-in | Slider | Always visible |
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    msrp: {
      description: 'Vehicle MSRP in dollars',
      control: { type: 'number', min: 10000, max: 150000, step: 500 },
      table: {
        type: { summary: 'number' },
        category: 'Vehicle',
      },
    },
    vehicleName: {
      description: 'Full vehicle name (Year Make Model)',
      control: 'text',
      table: {
        type: { summary: 'string' },
        category: 'Vehicle',
      },
    },
    bestApr: {
      description: 'Best available APR rate (overrides credit-tier default)',
      control: { type: 'number', min: 0, max: 20, step: 0.1 },
      table: {
        type: { summary: 'number' },
        category: 'Deal',
      },
    },
    make: {
      description: 'Make (CTA: SHOP MAKE MODEL)',
      control: 'text',
      table: { type: { summary: 'string' }, category: 'Vehicle' },
    },
    model: {
      description: 'Model (CTA)',
      control: 'text',
      table: { type: { summary: 'string' }, category: 'Vehicle' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    msrp: 21895,
    vehicleName: '2025 Chevrolet Trax',
    make: 'Chevrolet',
    model: 'Trax',
  },
  parameters: {
    docs: {
      description: {
        story: 'Default calculator for an affordable subcompact SUV.',
      },
    },
  },
};

export const WithSpecialAPR: Story = {
  args: {
    msrp: 21895,
    vehicleName: '2025 Chevrolet Trax',
    make: 'Chevrolet',
    model: 'Trax',
    bestApr: 0,
  },
  parameters: {
    docs: {
      description: {
        story: 'Calculator with a 0% APR promotional rate applied.',
      },
    },
  },
};

export const LuxuryVehicle: Story = {
  args: {
    msrp: 89500,
    vehicleName: '2025 Porsche Cayenne',
    make: 'Porsche',
    model: 'Cayenne',
  },
  parameters: {
    docs: {
      description: {
        story: 'Higher MSRP vehicle showing larger payment estimates.',
      },
    },
  },
};

export const Truck: Story = {
  args: {
    msrp: 45000,
    vehicleName: '2025 Ford F-150',
    make: 'Ford',
    model: 'F-150',
    bestApr: 3.9,
  },
  parameters: {
    docs: {
      description: {
        story: 'Mid-range truck with a competitive finance rate.',
      },
    },
  },
};
