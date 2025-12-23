import type { Meta, StoryObj } from '@storybook/react';
import DealerLocatorMap from './DealerLocatorMap';
import DealerCard from './DealerCard';
import VehicleContextHeader from './VehicleContextHeader';
import DealerBottomSheet from './DealerBottomSheet';
import { getDealersForVehicle, sortDealers } from '../../services/dealerService';

const meta: Meta<typeof DealerLocatorMap> = {
  title: 'Organisms/DealerLocatorMap',
  component: DealerLocatorMap,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Dealer Locator Map

A Google Maps-powered component that helps car buyers find nearby dealers with the best deals for a specific vehicle.

## User Experience Goal

Help car buyers answer: **"Where can I get the best deal on THIS specific car near me?"**

---

## Features

| Feature | Description |
|---------|-------------|
| **Vehicle Context** | Shows the car being searched with image, MSRP, specs |
| **Deal Scoring** | Ranks dealers by price, distance, rating, and inventory |
| **Best Deal Badge** | Highlights the optimal dealer choice |
| **Inventory Display** | Shows how many units each dealer has in stock |
| **Mobile Bottom Sheet** | Detailed dealer info on tap |
| **Progressive Enhancement** | Works without Google Maps API |

---

## Deal Scoring Algorithm

\`\`\`
Score = (PriceScore × 0.4) + (DistanceScore × 0.3) + (RatingScore × 0.2) + (InventoryBonus × 0.1)
\`\`\`

| Factor | Weight | Description |
|--------|--------|-------------|
| Price | 40% | Lower price = higher score |
| Distance | 30% | Closer = higher score |
| Rating | 20% | Higher rating = higher score |
| Inventory | 10% | More stock = bonus points |

---

## Progressive Enhancement Levels

| Level | Features | Fallback |
|-------|----------|----------|
| **Level 0** | Static dealer list with addresses | No JS required |
| **Level 1** | Interactive list with sorting | Works without Maps API |
| **Level 2** | Google Maps with custom markers | Falls back to Level 1 |
| **Level 3** | Browser geolocation | Falls back to zip code input |

---

## Usage

\`\`\`tsx
import { DealerLocatorMap } from '@/components/DealerLocatorMap';

<DealerLocatorMap
  vehicle={{
    year: 2025,
    make: 'Chevrolet',
    model: 'Trax',
    msrp: 21895,
    image: '/images/trax.jpg',
    rating: 8.5,
    bodyStyle: 'SUV',
    mpg: 28,
  }}
  initialZipCode="33101"
  showVehiclePreview={true}
/>
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    vehicle: {
      description: 'Vehicle information to display in the header',
      control: 'object',
      table: {
        type: { summary: 'VehicleInfo' },
        category: 'Vehicle',
      },
    },
    initialLocation: {
      description: 'Initial map center coordinates',
      control: 'object',
      table: {
        type: { summary: '{ lat: number; lng: number }' },
        category: 'Location',
      },
    },
    initialZipCode: {
      description: 'Initial ZIP code for location display',
      control: 'text',
      table: {
        type: { summary: 'string' },
        category: 'Location',
      },
    },
    showVehiclePreview: {
      description: 'Show vehicle context header',
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
        category: 'Display',
      },
    },
    defaultView: {
      description: 'Default view mode',
      control: { type: 'radio', options: ['map', 'list'] },
      table: {
        type: { summary: "'map' | 'list'" },
        defaultValue: { summary: "'list'" },
        category: 'Display',
      },
    },
    maxResults: {
      description: 'Maximum number of dealers to show',
      control: { type: 'number', min: 5, max: 50 },
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '20' },
        category: 'Display',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default vehicle data
const defaultVehicle = {
  year: 2025,
  make: 'Chevrolet',
  model: 'Trax',
  msrp: 21895,
  image: 'https://www.caranddriver.com/shopping/a46810962/2024-chevrolet-trax/',
  rating: 8.5,
  bodyStyle: 'SUV',
  mpg: 28,
};

// Alternative vehicle for variety
const hondaAccord = {
  year: 2025,
  make: 'Honda',
  model: 'Accord',
  trim: 'Sport',
  msrp: 29610,
  image: 'https://www.caranddriver.com/honda/accord',
  rating: 9.0,
  bodyStyle: 'Sedan',
  mpg: 32,
};

/**
 * Default dealer locator with full vehicle context
 */
export const Default: Story = {
  args: {
    vehicle: defaultVehicle,
    initialZipCode: 'Miami, FL',
    showVehiclePreview: true,
    defaultView: 'list',
    maxResults: 20,
  },
};

/**
 * Without vehicle preview header - for embedding in vehicle pages
 */
export const WithoutVehiclePreview: Story = {
  args: {
    vehicle: defaultVehicle,
    initialZipCode: 'Miami, FL',
    showVehiclePreview: false,
    defaultView: 'list',
  },
  parameters: {
    docs: {
      description: {
        story: 'When embedded in a vehicle detail page, the vehicle preview can be hidden since the context is already clear.',
      },
    },
  },
};

/**
 * Different vehicle - Honda Accord
 */
export const DifferentVehicle: Story = {
  args: {
    vehicle: hondaAccord,
    initialZipCode: 'Los Angeles, CA',
    showVehiclePreview: true,
    defaultView: 'list',
  },
  parameters: {
    docs: {
      description: {
        story: 'The component works with any vehicle data passed to it.',
      },
    },
  },
};

/**
 * Limited results
 */
export const LimitedResults: Story = {
  args: {
    vehicle: defaultVehicle,
    initialZipCode: 'Miami, FL',
    showVehiclePreview: true,
    maxResults: 3,
  },
  parameters: {
    docs: {
      description: {
        story: 'Limit the number of dealers shown for a more focused view.',
      },
    },
  },
};

// ============================================
// Sub-component Stories
// ============================================

/**
 * Vehicle Context Header - Full variant
 */
export const VehicleHeader: StoryObj<typeof VehicleContextHeader> = {
  render: () => (
    <VehicleContextHeader vehicle={defaultVehicle} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'The vehicle context header shows the car being searched with key specs.',
      },
    },
  },
};

/**
 * Vehicle Context Header - Compact variant (mobile sticky)
 */
export const VehicleHeaderCompact: StoryObj<typeof VehicleContextHeader> = {
  render: () => (
    <VehicleContextHeader vehicle={defaultVehicle} variant="compact" />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Compact variant used as a sticky header on mobile.',
      },
    },
  },
};

/**
 * Dealer Card - Full variant with Best Deal badge
 */
export const DealerCardBestDeal: StoryObj<typeof DealerCard> = {
  render: () => {
    const dealers = getDealersForVehicle('Chevrolet', 'Trax');
    const sorted = sortDealers(dealers, 'bestDeal');
    const bestDealer = sorted[0];
    
    return (
      <div style={{ maxWidth: 400, padding: 16 }}>
        <DealerCard
          dealer={bestDealer}
          vehicleModel="Trax"
          isSelected={false}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Dealer card with the "Best Deal" badge, showing inventory count and price range.',
      },
    },
  },
};

/**
 * Dealer Card - Selected state
 */
export const DealerCardSelected: StoryObj<typeof DealerCard> = {
  render: () => {
    const dealers = getDealersForVehicle('Chevrolet', 'Trax');
    const dealer = dealers[1];
    
    return (
      <div style={{ maxWidth: 400, padding: 16 }}>
        <DealerCard
          dealer={dealer}
          vehicleModel="Trax"
          isSelected={true}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Dealer card in selected state with blue border highlight.',
      },
    },
  },
};

/**
 * Dealer Card - Compact variant (list item)
 */
export const DealerCardCompact: StoryObj<typeof DealerCard> = {
  render: () => {
    const dealers = getDealersForVehicle('Chevrolet', 'Trax');
    
    return (
      <div style={{ maxWidth: 400, background: 'white' }}>
        {dealers.slice(0, 3).map(dealer => (
          <DealerCard
            key={dealer.id}
            dealer={dealer}
            vehicleModel="Trax"
            variant="compact"
          />
        ))}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Compact dealer cards for dense list views.',
      },
    },
  },
};

/**
 * Bottom Sheet - Dealer details
 */
export const BottomSheetOpen: StoryObj<typeof DealerBottomSheet> = {
  render: () => {
    const dealers = getDealersForVehicle('Chevrolet', 'Trax');
    const sorted = sortDealers(dealers, 'bestDeal');
    const bestDealer = sorted[0];
    
    return (
      <div style={{ height: '100vh', background: '#f5f5f5' }}>
        <DealerBottomSheet
          dealer={bestDealer}
          vehicleModel="Trax"
          isOpen={true}
          onClose={() => console.log('Close')}
        />
      </div>
    );
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Mobile bottom sheet showing detailed dealer information and inventory.',
      },
    },
  },
};

/**
 * All dealer cards in a grid
 */
export const AllDealerCards: Story = {
  render: () => {
    const dealers = getDealersForVehicle('Chevrolet', 'Trax');
    const sorted = sortDealers(dealers, 'bestDeal');
    
    return (
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
        gap: 16,
        padding: 16,
        background: '#f5f5f5',
      }}>
        {sorted.map(dealer => (
          <DealerCard
            key={dealer.id}
            dealer={dealer}
            vehicleModel="Trax"
          />
        ))}
      </div>
    );
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'All dealer cards displayed in a responsive grid layout.',
      },
    },
  },
};

/**
 * Mobile viewport simulation
 */
export const MobileView: Story = {
  args: {
    vehicle: defaultVehicle,
    initialZipCode: 'Miami, FL',
    showVehiclePreview: true,
    defaultView: 'list',
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    docs: {
      description: {
        story: 'Mobile viewport with list/map toggle and compact header.',
      },
    },
  },
};

/**
 * Tablet viewport simulation
 */
export const TabletView: Story = {
  args: {
    vehicle: defaultVehicle,
    initialZipCode: 'Miami, FL',
    showVehiclePreview: true,
    defaultView: 'list',
  },
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
    docs: {
      description: {
        story: 'Tablet viewport with split view layout.',
      },
    },
  },
};

