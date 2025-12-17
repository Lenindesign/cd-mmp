import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import Hero from './Hero';

const meta: Meta<typeof Hero> = {
  title: 'Organisms/Hero',
  component: Hero,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Hero Section

## Overview

The Hero is the primary above-the-fold component on every Vehicle Detail Page (VDP). It's the first thing users see and sets the tone for their research journey.

---

## Business Purpose

| Goal | How Hero Achieves It |
|------|---------------------|
| First Impression | High-quality imagery and clear vehicle identity |
| Trust Building | C/D ratings and accolades establish credibility |
| Lead Generation | Shop New/Used CTAs drive dealer connections |
| Year Navigation | Dropdown helps users find the right model year |

---

## Key Metrics

- **CTA Click Rate** — Shop New vs Shop Used vs Trade-In
- **Gallery Engagement** — Slides viewed per session
- **Year Selector Usage** — How often users switch years
- **Time on Component** — Engagement before scrolling

---

## Component Elements

| Element | Purpose | Business Impact |
|---------|---------|-----------------|
| Vehicle Title | Year/Make/Model identification | SEO, user orientation |
| Rating Badge | C/D expert score (1-10) | Trust, credibility |
| Image Gallery | Visual showcase with thumbnails | Engagement, time on page |
| MSRP Range | Price transparency | Purchase intent qualification |
| Shop CTAs | Lead generation buttons | Dealer revenue |
| Accolades | Editor's Choice / 10Best badges | Trust signals, differentiation |
| Favorites | Save to account | User retention, personalization |

---

## Accolades System

Accolades appear when vehicles earn editorial recognition:

- **Editor's Choice** — Vehicles that excel in their segment
- **10Best** — Annual top picks across categories
- **EV of the Year** — Best electric vehicle (when applicable)

These badges increase user trust and can improve conversion rates.

---

## Responsive Behavior

| Breakpoint | Layout Changes |
|------------|----------------|
| Desktop (>938px) | Side-by-side layout, horizontal CTAs |
| Tablet (768-938px) | Stacked layout begins |
| Mobile (<768px) | Full-width stacked, centered CTAs |

---

## Product Considerations

**A/B Testing Opportunities**
- CTA button text variations
- Animated vs static buttons
- Accolade badge placement

**Data Requirements**
- Vehicle database must include rating, pricing, images
- Accolades require editorial flags in CMS

**Dependencies**
- Image CDN for gallery photos
- Vehicle service for year availability
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    vehicle: {
      description: 'Vehicle data object containing all display information',
      control: 'object',
      table: {
        type: { 
          summary: 'VehicleData',
          detail: `{
  make: string;
  model: string;
  year: number;
  tagline: string;
  rating: number;
  priceRange: string;
  image: string;
  galleryImages?: string[];
  photographer?: string;
  editorsChoice?: boolean;
  tenBest?: boolean;
  evOfTheYear?: boolean;
}`,
        },
        category: 'Data',
      },
    },
    animateButtons: {
      description: 'Enable entrance animations on shop buttons',
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Animation',
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

// 2025 Chevrolet Trax - Main demo vehicle
const chevroletTrax = {
  make: 'Chevrolet',
  model: 'Trax',
  year: 2025,
  tagline: 'The Chevrolet Trax offers excellent value and modern features. A compelling choice in the subcompact SUV segment.',
  rating: 10,
  priceRange: '$20,400 - $24,400',
  image: 'https://d2kde5ohu8qb21.cloudfront.net/files/66466c119cbba1000852d79c/007-2025-chevrolet-trax-exterior-front-view.jpg',
  galleryImages: [
    'https://d2kde5ohu8qb21.cloudfront.net/files/66466c119cbba1000852d79c/007-2025-chevrolet-trax-exterior-front-view.jpg',
    'https://d2kde5ohu8qb21.cloudfront.net/files/66466c171a38f50008ca1b6e/009-2025-chevrolet-trax-exterior-side-view.jpg',
    'https://d2kde5ohu8qb21.cloudfront.net/files/66466c139cbba1000852d79d/008-2025-chevrolet-trax-exterior-front-view.jpg',
    'https://d2kde5ohu8qb21.cloudfront.net/files/66466c1e811993000831eb00/012-2025-chevrolet-trax-exterior-front-view.jpg',
    'https://d2kde5ohu8qb21.cloudfront.net/files/66466c246e89190008af75b5/014-2025-chevrolet-trax-exterior-rear-view.jpg',
    'https://d2kde5ohu8qb21.cloudfront.net/files/66466c05811993000831eaff/001-2025-chevrolet-trax-exterior-front-view.jpg',
  ],
  photographer: 'CAR AND DRIVER',
  editorsChoice: true,
  tenBest: true,
};

export const Default: Story = {
  args: {
    vehicle: chevroletTrax,
  },
  parameters: {
    docs: {
      description: {
        story: 'Default Hero with a featured vehicle displaying both Editor\'s Choice and 10Best accolades.',
      },
    },
  },
};

export const WithTenBest: Story = {
  args: {
    vehicle: {
      ...chevroletTrax,
      editorsChoice: false,
      tenBest: true,
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Hero displaying only the 10Best badge in the accolades section.',
      },
    },
  },
};

export const WithBothAwards: Story = {
  args: {
    vehicle: {
      ...chevroletTrax,
      editorsChoice: true,
      tenBest: true,
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Hero displaying both Editor\'s Choice and 10Best badges together.',
      },
    },
  },
};

export const NoAwards: Story = {
  args: {
    vehicle: {
      ...chevroletTrax,
      editorsChoice: false,
      tenBest: false,
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Hero without any accolades. The accolades section is hidden when no awards are present.',
      },
    },
  },
};

export const SUV: Story = {
  args: {
    vehicle: {
      make: 'Chevrolet',
      model: 'Trailblazer',
      year: 2024,
      tagline: 'The Chevrolet Trailblazer delivers style and versatility with excellent value.',
      rating: 7.5,
      priceRange: '$24,995 - $31,895',
      image: 'https://d2kde5ohu8qb21.cloudfront.net/files/65f7e4f9417c9000085e7bba/003-2024-chevrolet-trailblazer-front-three-quarters-view.jpg',
      galleryImages: [
        'https://d2kde5ohu8qb21.cloudfront.net/files/65f7e4f9417c9000085e7bba/003-2024-chevrolet-trailblazer-front-three-quarters-view.jpg',
        'https://d2kde5ohu8qb21.cloudfront.net/files/65f7e4f9cc1a540008a57c2c/002-2024-chevrolet-trailblazer-front-view.jpg',
      ],
      photographer: 'CAR AND DRIVER',
      editorsChoice: false,
      tenBest: false,
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Hero for a different SUV model demonstrating flexibility with various vehicle data.',
      },
    },
  },
};

export const WithAnimatedButtons: Story = {
  args: {
    vehicle: chevroletTrax,
    animateButtons: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Hero with animated shop buttons that fade and slide in on page load. Use for enhanced user engagement.',
      },
    },
  },
};
