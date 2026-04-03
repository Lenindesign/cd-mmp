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

An interactive payment estimator that lets shoppers model finance, lease, and cash scenarios for any vehicle. Adjustable inputs for down payment, trade-in, credit score, and loan term update the monthly/total cost in real time.

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
| Finance | Monthly payment based on APR, term, down payment, and trade-in |
| Lease | Estimated monthly lease payment |
| Cash | Total out-of-pocket after trade-in |

---

## Key Inputs

| Input | Type | Description |
|-------|------|-------------|
| Down Payment | Slider | Percentage of MSRP (0–50%) |
| Credit Score | Dropdown | Tier-based APR lookup |
| Loan Term | Select | 36, 48, 60, 72, or 84 months |
| Trade-In | Text | Dollar value of trade-in vehicle |
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
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    msrp: 21895,
    vehicleName: '2025 Chevrolet Trax',
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
