import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import {
  MARKET_LOCATION_OPTIONS,
  type DealerRadius,
  type MarketLocation,
} from '../../services/marketIntelligenceService';
import { getVehicleBySlug } from '../../services/vehicleService';
import MarketIntelligenceSnapshot from './MarketIntelligenceSnapshot';

const newVehicle = getVehicleBySlug('2026/Chevrolet/Trax');
const usedVehicle = getVehicleBySlug('2025/Chevrolet/Trax');

const meta: Meta<typeof MarketIntelligenceSnapshot> = {
  title: 'Marketplace/MarketIntelligenceSnapshot',
  component: MarketIntelligenceSnapshot,
  parameters: {
    layout: 'padded',
  },
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

const SnapshotStory = ({ vehicle }: { vehicle: NonNullable<typeof newVehicle> }) => {
  const [location, setLocation] = useState<MarketLocation>(MARKET_LOCATION_OPTIONS[0]);
  const [radiusMiles, setRadiusMiles] = useState<DealerRadius>(25);

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

export const NewVehicle: Story = {
  args: { vehicle: newVehicle! },
  render: () => <SnapshotStory vehicle={newVehicle!} />,
};

export const UsedVehicle: Story = {
  args: { vehicle: usedVehicle! },
  render: () => <SnapshotStory vehicle={usedVehicle!} />,
};
