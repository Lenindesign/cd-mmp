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
## Top 10 Carousel with Lead Generation

A horizontally scrollable carousel showcasing top-ranked vehicles with integrated lead generation CTAs.

### Features
- **Smart Filtering**: Filter by body style, make, lifestyle, or price
- **Ranking Badges**: Shows rank position with special badges for top vehicles
- **Accolades**: Displays Editor's Choice and 10Best icons
- **Lead Gen CTAs**: Shop Used and View Rankings actions
- **Smooth Scrolling**: Touch-friendly with arrow navigation

### Usage

\`\`\`tsx
import TopTenCarouselLeads from '@/components/TopTenCarouselLeads';

<TopTenCarouselLeads 
  title="Top 10 SUVs"
  subtitle="Our experts pick the best"
  bodyStyle="SUV"
  maxPrice={35000}
  onShopUsed={(vehicle) => console.log(vehicle)}
/>
\`\`\`
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
