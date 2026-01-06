import type { Meta, StoryObj } from '@storybook/react';
import TrimSelector from './TrimSelector';
import { getVehicleTrims } from '../../services/trimService';

const meta: Meta<typeof TrimSelector> = {
  title: 'Organisms/TrimSelector',
  component: TrimSelector,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
The TrimSelector (Compare Trims) component allows users to browse, select, and compare different trim levels for a vehicle.

## Features
- **Clean Card Design**: Modern, minimal trim cards with price, MPG, and key features
- **Selection Counter**: Shows "X of 5 selected" with Compare Trims button
- **Carousel Navigation**: Horizontal scrolling with navigation arrows
- **Recommended Badge**: Green badge highlights the recommended trim option
- **Location-aware**: Shows zip code with "Change Location" option
- **Trim Comparison**: Select 2-5 trims to compare specifications side-by-side in a modal

## Design
Based on the Car and Driver design system with:
- Green borders/badges for selected/recommended trims
- Blue cobalt accent for prices and CTAs
- Clean typography hierarchy
- Subtle shadows and borders
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Get real trim data with full specs from the service
const toyotaCamryTrims = getVehicleTrims('Toyota', 'Camry', 28400, 36920);
const hondaAccordTrims = getVehicleTrims('Honda', 'Accord', 28990, 38990);
const fordF150Trims = getVehicleTrims('Ford', 'F-150', 36495, 67915);
const teslaModel3Trims = getVehicleTrims('Tesla', 'Model 3', 40240, 53240);
const bmw3SeriesTrims = getVehicleTrims('BMW', '3 Series', 46200, 60200);

export const Default: Story = {
  args: {
    trims: toyotaCamryTrims,
    vehicleName: '2025 Toyota Camry',
    zipCode: '10940',
  },
};

export const KiaTelluride: Story = {
  args: {
    trims: getVehicleTrims('Kia', 'Telluride', 37490, 54990),
    vehicleName: '2025 Kia Telluride',
    zipCode: '10940',
  },
  parameters: {
    docs: {
      description: {
        story: 'Kia Telluride with SX, SX X-Line, and SX Prestige trims - matching the reference design.',
      },
    },
  },
};

export const HondaAccord: Story = {
  args: {
    trims: hondaAccordTrims,
    title: 'Pricing and Which One to Buy',
    subtitle: 'Compare all available trim levels',
    vehicleName: '2025 Honda Accord',
  },
  parameters: {
    docs: {
      description: {
        story: 'Honda Accord with 5 trim levels including the powerful Touring with 2.0L Turbo engine.',
      },
    },
  },
};

export const FordF150: Story = {
  args: {
    trims: fordF150Trims,
    title: 'Pricing and Which One to Buy',
    subtitle: 'America\'s best-selling truck with multiple trim options',
    vehicleName: '2025 Ford F-150',
  },
  parameters: {
    docs: {
      description: {
        story: 'Ford F-150 lineup from work truck to luxury Platinum trim.',
      },
    },
  },
};

export const TeslaModel3: Story = {
  args: {
    trims: teslaModel3Trims,
    title: 'Choose Your Configuration',
    subtitle: 'All-electric performance sedan',
    vehicleName: '2025 Tesla Model 3',
  },
  parameters: {
    docs: {
      description: {
        story: 'Tesla Model 3 with RWD, Long Range AWD, and Performance variants.',
      },
    },
  },
};

export const BMW3Series: Story = {
  args: {
    trims: bmw3SeriesTrims,
    title: 'Select Your 3 Series',
    subtitle: 'The Ultimate Driving Machine',
    vehicleName: '2025 BMW 3 Series',
  },
  parameters: {
    docs: {
      description: {
        story: 'BMW 3 Series from 330i to M340i xDrive with full specifications.',
      },
    },
  },
};

export const TwoTrims: Story = {
  args: {
    trims: teslaModel3Trims.slice(0, 2),
    vehicleName: '2025 Tesla Model 3',
  },
};

export const ThreeTrims: Story = {
  args: {
    trims: teslaModel3Trims,
    vehicleName: '2025 Tesla Model 3',
  },
};
