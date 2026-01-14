import type { Meta, StoryObj } from '@storybook/react';
import FuelEconomy from './FuelEconomy';

const meta: Meta<typeof FuelEconomy> = {
  title: 'Molecules/FuelEconomy',
  component: FuelEconomy,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
## Fuel Economy Module

A comprehensive fuel economy display component that integrates with the EPA FuelEconomy.gov API to show:

- **MPG Ratings**: Combined, city, and highway fuel economy
- **EPA Scores**: Fuel economy and greenhouse gas scores (1-10 scale)
- **Annual Fuel Cost**: Estimated yearly fuel expenses with savings comparison
- **Powertrain Details**: Engine, transmission, drivetrain, and fuel type
- **Variant Comparison**: Compare all available configurations
- **MPG Rankings**: See how the vehicle ranks in its category
- **Gas Stations**: Find nearby gas stations

### Features
- Real-time data from EPA FuelEconomy.gov API
- Segment comparison (vs. average for body style)
- Interactive gauge visualizations
- Expandable variant table
- MPG rankings modal
- Gas stations locator modal
- Design system compliant styling

### Usage
\`\`\`tsx
<FuelEconomy
  year={2024}
  make="Honda"
  model="CR-V"
  bodyStyle="SUV"
/>
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    year: {
      control: 'number',
      description: 'Vehicle model year',
    },
    make: {
      control: 'text',
      description: 'Vehicle manufacturer name',
    },
    model: {
      control: 'text',
      description: 'Vehicle model name',
    },
    bodyStyle: {
      control: 'select',
      options: ['SUV', 'Sedan', 'Truck', 'Coupe', 'Hatchback', 'Convertible', 'Wagon', 'Van', 'Minivan'],
      description: 'Vehicle body style for segment comparison',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default fuel economy display for a popular SUV.
 * The Honda CR-V demonstrates typical SUV fuel economy
 * with hybrid and non-hybrid variants.
 */
export const Default: Story = {
  args: {
    year: 2024,
    make: 'Honda',
    model: 'CR-V',
    bodyStyle: 'SUV',
  },
};

/**
 * Fuel-efficient sedan example.
 * The Toyota Camry shows excellent fuel economy
 * scores, especially in hybrid configuration.
 */
export const EfficientSedan: Story = {
  args: {
    year: 2024,
    make: 'Toyota',
    model: 'Camry',
    bodyStyle: 'Sedan',
  },
};

/**
 * Hybrid vehicle example.
 * The Toyota RAV4 Hybrid demonstrates how
 * hybrid vehicles display their superior MPG ratings.
 */
export const HybridVehicle: Story = {
  args: {
    year: 2024,
    make: 'Toyota',
    model: 'RAV4 Hybrid',
    bodyStyle: 'SUV',
  },
};

/**
 * Truck example with lower fuel economy.
 * The Ford F-150 shows how trucks compare
 * to their segment average.
 */
export const TruckExample: Story = {
  args: {
    year: 2024,
    make: 'Ford',
    model: 'F-150',
    bodyStyle: 'Truck',
  },
};

/**
 * Compact hatchback with excellent MPG.
 * The Honda Civic demonstrates how compact
 * cars achieve above-average fuel economy.
 */
export const CompactHatchback: Story = {
  args: {
    year: 2024,
    make: 'Honda',
    model: 'Civic',
    bodyStyle: 'Hatchback',
  },
};

/**
 * Luxury SUV example.
 * The BMW X5 shows fuel economy for
 * a premium SUV with multiple engine options.
 */
export const LuxurySUV: Story = {
  args: {
    year: 2024,
    make: 'BMW',
    model: 'X5',
    bodyStyle: 'SUV',
  },
};

/**
 * Subcompact SUV with great efficiency.
 * The Nissan Kicks demonstrates excellent
 * fuel economy for its class.
 */
export const SubcompactSUV: Story = {
  args: {
    year: 2024,
    make: 'Nissan',
    model: 'Kicks',
    bodyStyle: 'SUV',
  },
};

/**
 * Sports car example.
 * The Mazda MX-5 Miata shows fuel economy
 * for a performance-oriented vehicle.
 */
export const SportsCar: Story = {
  args: {
    year: 2024,
    make: 'Mazda',
    model: 'MX-5 Miata',
    bodyStyle: 'Convertible',
  },
};

/**
 * Electric vehicle example.
 * Note: EVs may display differently as they
 * use MPGe (miles per gallon equivalent).
 */
export const ElectricVehicle: Story = {
  args: {
    year: 2024,
    make: 'Tesla',
    model: 'Model 3',
    bodyStyle: 'Sedan',
  },
};

/**
 * Minivan example.
 * The Honda Odyssey demonstrates fuel economy
 * for family-oriented vehicles.
 */
export const Minivan: Story = {
  args: {
    year: 2024,
    make: 'Honda',
    model: 'Odyssey',
    bodyStyle: 'Minivan',
  },
};

/**
 * Economy sedan with top-tier fuel efficiency.
 * The Hyundai Elantra Hybrid shows how
 * hybrid sedans achieve excellent MPG ratings.
 */
export const EconomySedan: Story = {
  args: {
    year: 2025,
    make: 'Hyundai',
    model: 'Elantra',
    bodyStyle: 'Sedan',
  },
};

