import type { Meta, StoryObj } from '@storybook/react';
import GasStationsModal from './GasStationsModal';

const meta: Meta<typeof GasStationsModal> = {
  title: 'Molecules/FuelEconomy/GasStationsModal',
  component: GasStationsModal,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
## Gas Stations Modal

A modal component that displays nearby gas stations on an interactive Google Map.

### Features
- **Geolocation**: Automatically detects user's location (with fallback to Los Angeles)
- **Google Maps Integration**: Interactive map with gas station markers
- **Places API**: Searches for gas stations within 8km radius
- **Station List**: Sidebar showing all found stations with ratings and status
- **Info Windows**: Click markers to see station details
- **Directions**: One-click navigation to any station via Google Maps
- **GasBuddy Integration**: Link to compare gas prices

### Mental Model for Info Windows
- Click a marker or list item → Opens that station's info window
- Click a different marker/list item → Closes previous, opens new one
- Click the X on info window → Closes it
- Only one info window can be open at a time

### Requirements
- Google Maps API key with Places API enabled
- Set \`VITE_GOOGLE_MAPS_API_KEY\` environment variable

### Usage
\`\`\`tsx
<GasStationsModal
  isOpen={true}
  onClose={() => {}}
  vehicleName="2024 Honda CR-V"
/>
\`\`\`

### Note
This component requires a valid Google Maps API key to function.
In Storybook, the map may not display if the API key is not configured.
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: 'Whether the modal is visible',
    },
    vehicleName: {
      control: 'text',
      description: 'Name of the vehicle (displayed in subtitle)',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default gas stations modal.
 * Shows the modal with a vehicle name in the subtitle.
 * Note: Requires Google Maps API key to display the map.
 */
export const Default: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    vehicleName: '2024 Honda CR-V',
  },
};

/**
 * Modal for a specific vehicle.
 * The vehicle name appears in the modal subtitle.
 */
export const WithVehicleName: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    vehicleName: '2024 Toyota RAV4 Hybrid',
  },
};

/**
 * Modal without vehicle name.
 * Shows generic "Gas Stations Near You" title.
 */
export const WithoutVehicleName: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
  },
};

/**
 * Modal for a truck.
 * Demonstrates the modal with a truck vehicle name.
 */
export const ForTruck: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    vehicleName: '2024 Ford F-150',
  },
};

/**
 * Modal for an electric vehicle.
 * Note: For EVs, users might want charging stations instead.
 * This is for hybrid or plug-in hybrid vehicles that use gas.
 */
export const ForHybrid: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    vehicleName: '2024 Toyota Prius Prime',
  },
};

/**
 * Modal in closed state.
 * The modal should not be visible.
 */
export const Closed: Story = {
  args: {
    isOpen: false,
    onClose: () => {},
    vehicleName: '2024 Honda CR-V',
  },
};

