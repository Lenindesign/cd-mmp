import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import {
  MARKET_LOCATION_OPTIONS,
  type DealerRadius,
  type MarketLocation,
} from '../../services/marketIntelligenceService';
import { getVehicleBySlug, type Vehicle } from '../../services/vehicleService';
import MarketIntelligenceSnapshot from './MarketIntelligenceSnapshot';

const getStoryVehicle = (slug: string): Vehicle => {
  const vehicle = getVehicleBySlug(slug);
  if (!vehicle) {
    throw new Error(`Missing Storybook vehicle fixture: ${slug}`);
  }
  return vehicle;
};

const newTrax = getStoryVehicle('2026/Chevrolet/Trax');
const usedTrax = getStoryVehicle('2025/Chevrolet/Trax');
const kiaForte = getStoryVehicle('2024/Kia/Forte');
const fordRanger = getStoryVehicle('2020/Ford/Ranger');
const lotusEvija = getStoryVehicle('2026/Lotus/Evija');

const meta: Meta<typeof MarketIntelligenceSnapshot> = {
  title: 'Marketplace/MarketIntelligenceSnapshot',
  component: MarketIntelligenceSnapshot,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Review surface for the Local Signals module on vehicle pages. Use these stories to compare best-value sorting, price-band labels, dot tooltips, local listings, and responsive behavior.',
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 960, margin: '0 auto' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

interface SnapshotStoryProps {
  vehicle: Vehicle;
  initialLocation?: MarketLocation;
  initialRadiusMiles?: DealerRadius;
}

const SnapshotStory = ({
  vehicle,
  initialLocation = MARKET_LOCATION_OPTIONS[0],
  initialRadiusMiles = 25,
}: SnapshotStoryProps) => {
  const [location, setLocation] = useState<MarketLocation>(initialLocation);
  const [radiusMiles, setRadiusMiles] = useState<DealerRadius>(initialRadiusMiles);

  return (
    <MarketIntelligenceSnapshot
      vehicle={vehicle}
      location={location}
      radiusMiles={radiusMiles}
      onLocationChange={setLocation}
      onRadiusChange={setRadiusMiles}
      onSeeLocalInventory={() => undefined}
    />
  );
};

const renderSnapshot = (
  vehicle: Vehicle,
  initialLocation?: MarketLocation,
  initialRadiusMiles?: DealerRadius
) => (
  <SnapshotStory
    vehicle={vehicle}
    initialLocation={initialLocation}
    initialRadiusMiles={initialRadiusMiles}
  />
);

export const KiaForteFeedbackReview: Story = {
  name: 'Feedback review, Kia Forte',
  args: { vehicle: kiaForte },
  render: () => renderSnapshot(kiaForte, MARKET_LOCATION_OPTIONS[0], 25),
  parameters: {
    docs: {
      description: {
        story:
          'Primary feedback story for the current Local Signals audit. It exercises used inventory, best-value sorting, price-band dots, hoverable listing cards, and the local comparable list.',
      },
    },
  },
};

export const KiaForteMobileReview: Story = {
  name: 'Mobile review, Kia Forte',
  args: { vehicle: kiaForte },
  render: () => renderSnapshot(kiaForte, MARKET_LOCATION_OPTIONS[0], 25),
  parameters: {
    viewport: {
      defaultViewport: 'mobile',
    },
    docs: {
      description: {
        story:
          'Mobile review of the same Kia Forte market so spacing, dot hit targets, price-band labels, and stacked local rows can be checked quickly.',
      },
    },
  },
};

export const ChevroletTraxUsedValue: Story = {
  name: 'Used Trax, best value',
  args: { vehicle: usedTrax },
  render: () => renderSnapshot(usedTrax, MARKET_LOCATION_OPTIONS[0], 25),
  parameters: {
    docs: {
      description: {
        story:
          'Used SUV scenario with strong price separation between local matches. Good for reviewing interior price ticks and best-value explanation copy.',
      },
    },
  },
};

export const ChevroletTraxNewPriceBand: Story = {
  name: 'New Trax, price band',
  args: { vehicle: newTrax },
  render: () => renderSnapshot(newTrax, MARKET_LOCATION_OPTIONS[0], 25),
  parameters: {
    docs: {
      description: {
        story:
          'New-vehicle scenario for checking MSRP columns, below-market language, and current asking marker behavior.',
      },
    },
  },
};

export const FordRangerAboveMarketValue: Story = {
  name: 'Ford Ranger, above market',
  args: { vehicle: fordRanger },
  render: () => renderSnapshot(fordRanger, MARKET_LOCATION_OPTIONS[0], 25),
  parameters: {
    docs: {
      description: {
        story:
          'Used truck scenario that helps verify when a best-value candidate can still sit near or above the fair-market band.',
      },
    },
  },
};

export const LotusEvijaHighPrice: Story = {
  name: 'Lotus Evija, high price',
  args: { vehicle: lotusEvija },
  render: () => renderSnapshot(lotusEvija, MARKET_LOCATION_OPTIONS[1], 75),
  parameters: {
    docs: {
      description: {
        story:
          'High-price exotic scenario for checking long prices, badge treatment, and price-band label containment.',
      },
    },
  },
};

export const NewVehicle: Story = {
  args: { vehicle: newTrax },
  render: () => renderSnapshot(newTrax),
};

export const UsedVehicle: Story = {
  args: { vehicle: usedTrax },
  render: () => renderSnapshot(usedTrax),
};
