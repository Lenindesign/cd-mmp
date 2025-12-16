import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import VehicleRanking from './VehicleRanking';

const meta: Meta<typeof VehicleRanking> = {
  title: 'Organisms/VehicleRanking',
  component: VehicleRanking,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
## Vehicle Ranking Section

Displays where a vehicle ranks within its category, showing competitors and their ratings.

### Features
- **Dynamic Filtering**: Filters by body style and price range
- **Category Labels**: Auto-generates labels like "Best Subcompact SUVs"
- **Score Display**: Optional rating scores with bold or subtle styling
- **Responsive Grid**: 2 columns on mobile, 4 on desktop

### Usage

\`\`\`tsx
import VehicleRanking from '@/components/VehicleRanking';

<VehicleRanking 
  bodyStyle="SUV"
  maxPrice={35000}
  showScore={true}
  scoreStyle="bold"
/>
\`\`\`
        `,
      },
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/jvhWYHzYt25IBonCIzVEv0/Post-MVP-Marketplace?node-id=14-24575',
    },
  },
  tags: ['autodocs'],
  argTypes: {
    bodyStyle: {
      description: 'Vehicle body style to filter rankings',
      control: 'select',
      options: ['SUV', 'Sedan', 'Truck', 'Coupe', 'Hatchback', 'Convertible', 'Wagon'],
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'SUV' },
        category: 'Filtering',
      },
    },
    maxPrice: {
      description: 'Maximum price filter for category (affects label: Subcompact < $35k, Compact < $50k, etc.)',
      control: { type: 'number', min: 20000, max: 200000, step: 5000 },
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '35000' },
        category: 'Filtering',
      },
    },
    currentRank: {
      description: 'Highlight a specific rank position',
      control: { type: 'number', min: 1, max: 10 },
      table: {
        type: { summary: 'number' },
        category: 'Display',
      },
    },
    showScore: {
      description: 'Display rating scores on vehicle cards',
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Display',
      },
    },
    scoreStyle: {
      description: 'Visual style for the score display',
      control: 'radio',
      options: ['bold', 'subtle'],
      table: {
        type: { summary: "'bold' | 'subtle'" },
        defaultValue: { summary: 'bold' },
        category: 'Display',
      },
      if: { arg: 'showScore', truthy: true },
    },
    category: {
      description: 'Override the auto-generated category label',
      control: 'text',
      table: {
        type: { summary: 'string' },
        category: 'Content',
      },
    },
    currentVehicleId: {
      description: 'ID of current vehicle to highlight in the list',
      control: 'text',
      table: {
        type: { summary: 'string' },
        category: 'Filtering',
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
    bodyStyle: 'SUV',
    maxPrice: 35000,
  },
  parameters: {
    docs: {
      description: {
        story: 'Default ranking view for subcompact SUVs under $35,000.',
      },
    },
  },
};

export const SUV: Story = {
  args: {
    bodyStyle: 'SUV',
    maxPrice: 50000,
    currentRank: 3,
  },
  parameters: {
    docs: {
      description: {
        story: 'Compact SUV rankings with rank #3 highlighted.',
      },
    },
  },
};

export const Sedan: Story = {
  args: {
    bodyStyle: 'Sedan',
    maxPrice: 40000,
    currentRank: 1,
  },
  parameters: {
    docs: {
      description: {
        story: 'Sedan rankings showing the top-ranked vehicle highlighted.',
      },
    },
  },
};

export const Truck: Story = {
  args: {
    bodyStyle: 'Truck',
    maxPrice: 60000,
  },
  parameters: {
    docs: {
      description: {
        story: 'Truck rankings for midsize price range.',
      },
    },
  },
};

export const LuxurySUV: Story = {
  args: {
    bodyStyle: 'SUV',
    maxPrice: 100000,
  },
  parameters: {
    docs: {
      description: {
        story: 'Luxury SUV rankings for vehicles over $80,000.',
      },
    },
  },
};

export const WithScore: Story = {
  args: {
    bodyStyle: 'SUV',
    maxPrice: 35000,
    showScore: true,
    scoreStyle: 'bold',
  },
  parameters: {
    docs: {
      description: {
        story: 'Rankings with bold score display (e.g., "10/10") shown prominently on each card.',
      },
    },
  },
};

export const WithSubtleScore: Story = {
  args: {
    bodyStyle: 'SUV',
    maxPrice: 35000,
    showScore: true,
    scoreStyle: 'subtle',
  },
  parameters: {
    docs: {
      description: {
        story: 'Rankings with subtle score styling - blue number with gray "/10" for a more understated look.',
      },
    },
  },
};
