import type { Meta, StoryObj } from '@storybook/react';
import MPGRankingsModal from './MPGRankingsModal';
import type { TopMPGVehicle } from '../../services/fuelEconomyService';

// Sample ranking data for stories
const sedanRankings: TopMPGVehicle[] = [
  { id: 1, year: 2024, make: 'Toyota', model: 'Prius', comb08: 57, city08: 58, highway08: 53, fuelType1: 'Regular Gasoline', VClass: 'Midsize Cars', rank: 1, isCurrentVehicle: false },
  { id: 2, year: 2024, make: 'Hyundai', model: 'Elantra Hybrid', comb08: 54, city08: 53, highway08: 56, fuelType1: 'Regular Gasoline', VClass: 'Compact Cars', rank: 2, isCurrentVehicle: false },
  { id: 3, year: 2024, make: 'Honda', model: 'Insight', comb08: 52, city08: 55, highway08: 49, fuelType1: 'Regular Gasoline', VClass: 'Compact Cars', rank: 3, isCurrentVehicle: false },
  { id: 4, year: 2024, make: 'Toyota', model: 'Camry Hybrid', comb08: 52, city08: 51, highway08: 53, fuelType1: 'Regular Gasoline', VClass: 'Midsize Cars', rank: 4, isCurrentVehicle: false },
  { id: 5, year: 2024, make: 'Honda', model: 'Accord Hybrid', comb08: 48, city08: 51, highway08: 44, fuelType1: 'Regular Gasoline', VClass: 'Midsize Cars', rank: 5, isCurrentVehicle: false },
  { id: 6, year: 2024, make: 'Hyundai', model: 'Sonata Hybrid', comb08: 47, city08: 45, highway08: 51, fuelType1: 'Regular Gasoline', VClass: 'Midsize Cars', rank: 6, isCurrentVehicle: false },
  { id: 7, year: 2024, make: 'Kia', model: 'K5', comb08: 35, city08: 31, highway08: 41, fuelType1: 'Regular Gasoline', VClass: 'Midsize Cars', rank: 7, isCurrentVehicle: true },
  { id: 8, year: 2024, make: 'Nissan', model: 'Altima', comb08: 32, city08: 28, highway08: 39, fuelType1: 'Regular Gasoline', VClass: 'Midsize Cars', rank: 8, isCurrentVehicle: false },
  { id: 9, year: 2024, make: 'Mazda', model: 'Mazda3', comb08: 31, city08: 28, highway08: 36, fuelType1: 'Regular Gasoline', VClass: 'Compact Cars', rank: 9, isCurrentVehicle: false },
  { id: 10, year: 2024, make: 'Subaru', model: 'Legacy', comb08: 30, city08: 27, highway08: 35, fuelType1: 'Regular Gasoline', VClass: 'Midsize Cars', rank: 10, isCurrentVehicle: false },
];

const suvRankings: TopMPGVehicle[] = [
  { id: 1, year: 2024, make: 'Toyota', model: 'RAV4 Hybrid', comb08: 41, city08: 41, highway08: 38, fuelType1: 'Regular Gasoline', VClass: 'Small SUV', rank: 1, isCurrentVehicle: false },
  { id: 2, year: 2024, make: 'Honda', model: 'CR-V Hybrid', comb08: 40, city08: 40, highway08: 35, fuelType1: 'Regular Gasoline', VClass: 'Small SUV', rank: 2, isCurrentVehicle: true },
  { id: 3, year: 2024, make: 'Ford', model: 'Escape Hybrid', comb08: 39, city08: 43, highway08: 37, fuelType1: 'Regular Gasoline', VClass: 'Small SUV', rank: 3, isCurrentVehicle: false },
  { id: 4, year: 2024, make: 'Hyundai', model: 'Tucson Hybrid', comb08: 38, city08: 38, highway08: 38, fuelType1: 'Regular Gasoline', VClass: 'Small SUV', rank: 4, isCurrentVehicle: false },
  { id: 5, year: 2024, make: 'Kia', model: 'Sportage Hybrid', comb08: 38, city08: 39, highway08: 38, fuelType1: 'Regular Gasoline', VClass: 'Small SUV', rank: 5, isCurrentVehicle: false },
  { id: 6, year: 2024, make: 'Nissan', model: 'Kicks', comb08: 33, city08: 31, highway08: 36, fuelType1: 'Regular Gasoline', VClass: 'Small SUV', rank: 6, isCurrentVehicle: false },
  { id: 7, year: 2024, make: 'Mazda', model: 'CX-30', comb08: 28, city08: 25, highway08: 33, fuelType1: 'Regular Gasoline', VClass: 'Small SUV', rank: 7, isCurrentVehicle: false },
  { id: 8, year: 2024, make: 'Subaru', model: 'Forester', comb08: 28, city08: 26, highway08: 33, fuelType1: 'Regular Gasoline', VClass: 'Small SUV', rank: 8, isCurrentVehicle: false },
  { id: 9, year: 2024, make: 'Jeep', model: 'Cherokee', comb08: 26, city08: 22, highway08: 31, fuelType1: 'Regular Gasoline', VClass: 'Small SUV', rank: 9, isCurrentVehicle: false },
  { id: 10, year: 2024, make: 'Ford', model: 'Bronco Sport', comb08: 26, city08: 25, highway08: 28, fuelType1: 'Regular Gasoline', VClass: 'Small SUV', rank: 10, isCurrentVehicle: false },
];

const truckRankings: TopMPGVehicle[] = [
  { id: 1, year: 2024, make: 'Ford', model: 'Maverick Hybrid', comb08: 37, city08: 42, highway08: 33, fuelType1: 'Regular Gasoline', VClass: 'Small Pickup Trucks', rank: 1, isCurrentVehicle: false },
  { id: 2, year: 2024, make: 'Hyundai', model: 'Santa Cruz', comb08: 26, city08: 23, highway08: 30, fuelType1: 'Regular Gasoline', VClass: 'Small Pickup Trucks', rank: 2, isCurrentVehicle: false },
  { id: 3, year: 2024, make: 'Ford', model: 'Ranger', comb08: 24, city08: 21, highway08: 26, fuelType1: 'Regular Gasoline', VClass: 'Small Pickup Trucks', rank: 3, isCurrentVehicle: false },
  { id: 4, year: 2024, make: 'Toyota', model: 'Tacoma', comb08: 23, city08: 20, highway08: 26, fuelType1: 'Regular Gasoline', VClass: 'Small Pickup Trucks', rank: 4, isCurrentVehicle: false },
  { id: 5, year: 2024, make: 'Chevrolet', model: 'Colorado', comb08: 22, city08: 19, highway08: 27, fuelType1: 'Regular Gasoline', VClass: 'Small Pickup Trucks', rank: 5, isCurrentVehicle: false },
  { id: 6, year: 2024, make: 'Ford', model: 'F-150', comb08: 21, city08: 18, highway08: 25, fuelType1: 'Regular Gasoline', VClass: 'Standard Pickup Trucks', rank: 6, isCurrentVehicle: true },
  { id: 7, year: 2024, make: 'Ram', model: '1500', comb08: 20, city08: 17, highway08: 24, fuelType1: 'Regular Gasoline', VClass: 'Standard Pickup Trucks', rank: 7, isCurrentVehicle: false },
  { id: 8, year: 2024, make: 'Chevrolet', model: 'Silverado', comb08: 20, city08: 17, highway08: 24, fuelType1: 'Regular Gasoline', VClass: 'Standard Pickup Trucks', rank: 8, isCurrentVehicle: false },
  { id: 9, year: 2024, make: 'Toyota', model: 'Tundra', comb08: 19, city08: 17, highway08: 22, fuelType1: 'Regular Gasoline', VClass: 'Standard Pickup Trucks', rank: 9, isCurrentVehicle: false },
  { id: 10, year: 2024, make: 'Nissan', model: 'Titan', comb08: 18, city08: 16, highway08: 22, fuelType1: 'Regular Gasoline', VClass: 'Standard Pickup Trucks', rank: 10, isCurrentVehicle: false },
];

const meta: Meta<typeof MPGRankingsModal> = {
  title: 'Molecules/FuelEconomy/MPGRankingsModal',
  component: MPGRankingsModal,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
## MPG Rankings Modal

A modal component that displays fuel economy rankings for vehicles in a specific category (body style).

### Features
- Shows top 10 vehicles by combined MPG in the category
- Highlights the current vehicle's position in rankings
- Displays contextual message based on ranking (excellent, great, good, average, below)
- Shows MPG difference from #1 ranked vehicle
- Medal badges for top 3 positions
- City, highway, and combined MPG for each vehicle
- Fuel type indicator
- Link to FuelEconomy.gov for full rankings

### Usage
\`\`\`tsx
<MPGRankingsModal
  isOpen={true}
  onClose={() => {}}
  vehicles={rankingData}
  currentRank={7}
  currentMake="Kia"
  currentModel="K5"
  currentMPG={35}
  bodyStyle="Sedan"
  year={2024}
/>
\`\`\`
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
    currentRank: {
      control: 'number',
      description: 'Current vehicle rank in the list (1-based)',
    },
    currentMake: {
      control: 'text',
      description: 'Current vehicle manufacturer',
    },
    currentModel: {
      control: 'text',
      description: 'Current vehicle model',
    },
    currentMPG: {
      control: 'number',
      description: 'Current vehicle combined MPG',
    },
    bodyStyle: {
      control: 'select',
      options: ['Sedan', 'SUV', 'Truck', 'Coupe', 'Hatchback', 'Convertible', 'Wagon', 'Van'],
      description: 'Vehicle body style category',
    },
    year: {
      control: 'number',
      description: 'Model year for rankings',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Sedan rankings with a mid-tier vehicle.
 * Shows the Kia K5 ranked #7 among sedans.
 */
export const SedanRankings: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    vehicles: sedanRankings,
    currentRank: 7,
    currentMake: 'Kia',
    currentModel: 'K5',
    currentMPG: 35,
    bodyStyle: 'Sedan',
    year: 2024,
  },
};

/**
 * SUV rankings with a top-ranked vehicle.
 * Shows the Honda CR-V Hybrid ranked #2 among SUVs.
 */
export const SUVRankingsTopRanked: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    vehicles: suvRankings,
    currentRank: 2,
    currentMake: 'Honda',
    currentModel: 'CR-V Hybrid',
    currentMPG: 40,
    bodyStyle: 'SUV',
    year: 2024,
  },
};

/**
 * Truck rankings with a mid-tier vehicle.
 * Shows the Ford F-150 ranked #6 among trucks.
 */
export const TruckRankings: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    vehicles: truckRankings,
    currentRank: 6,
    currentMake: 'Ford',
    currentModel: 'F-150',
    currentMPG: 21,
    bodyStyle: 'Truck',
    year: 2024,
  },
};

/**
 * #1 ranked vehicle.
 * Shows the Toyota Prius as the top-ranked sedan
 * with the "excellent" status message.
 */
export const TopRankedVehicle: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    vehicles: sedanRankings.map((v, i) => ({ ...v, isCurrentVehicle: i === 0 })),
    currentRank: 1,
    currentMake: 'Toyota',
    currentModel: 'Prius',
    currentMPG: 57,
    bodyStyle: 'Sedan',
    year: 2024,
  },
};

/**
 * #3 ranked vehicle (bronze position).
 * Shows a vehicle in the top 3 with the "great" status message.
 */
export const BronzePosition: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    vehicles: sedanRankings.map((v, i) => ({ ...v, isCurrentVehicle: i === 2 })),
    currentRank: 3,
    currentMake: 'Honda',
    currentModel: 'Insight',
    currentMPG: 52,
    bodyStyle: 'Sedan',
    year: 2024,
  },
};

/**
 * Vehicle not in top 10.
 * Shows a lower-ranked vehicle with the "below average" message.
 */
export const LowerRankedVehicle: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    vehicles: [
      ...sedanRankings.map(v => ({ ...v, isCurrentVehicle: false })),
      { id: 15, year: 2024, make: 'Dodge', model: 'Charger', comb08: 23, city08: 19, highway08: 30, fuelType1: 'Premium Gasoline', VClass: 'Large Cars', rank: 15, isCurrentVehicle: true },
    ],
    currentRank: 15,
    currentMake: 'Dodge',
    currentModel: 'Charger',
    currentMPG: 23,
    bodyStyle: 'Sedan',
    year: 2024,
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
    vehicles: sedanRankings,
    currentRank: 7,
    currentMake: 'Kia',
    currentModel: 'K5',
    currentMPG: 35,
    bodyStyle: 'Sedan',
    year: 2024,
  },
};
