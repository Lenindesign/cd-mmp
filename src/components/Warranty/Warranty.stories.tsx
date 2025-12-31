import type { Meta, StoryObj } from '@storybook/react';
import { FileText, Wrench, Shield, Calendar } from 'lucide-react';
import Warranty, { defaultWarrantyItems } from './Warranty';

const meta: Meta<typeof Warranty> = {
  title: 'Molecules/Warranty',
  component: Warranty,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
## Warranty & Safety Module

A comprehensive vehicle safety and warranty information component that integrates with the NHTSA API to display:

- **Recalls**: Active recalls with severity indicators, expandable details, and links to NHTSA
- **Owner Complaints**: Aggregated complaint data including crashes, fires, injuries, and top reported issues
- **Crash Test Ratings**: NHTSA 5-star safety ratings for frontal, side, and rollover tests
- **Warranty Coverage**: Standard warranty information cards

### Features
- Real-time data from NHTSA API
- Reliability context comparing vehicle to segment averages
- Interactive expandable sections
- Crash test photo modal
- Design system compliant styling

### Usage
\`\`\`tsx
<Warranty
  items={warrantyItems}
  make="Honda"
  model="CR-V"
  year={2024}
  bodyStyle="SUV"
/>
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    make: {
      control: 'text',
      description: 'Vehicle manufacturer name for NHTSA lookup',
    },
    model: {
      control: 'text',
      description: 'Vehicle model name for NHTSA lookup',
    },
    year: {
      control: 'number',
      description: 'Vehicle model year for NHTSA lookup',
    },
    bodyStyle: {
      control: 'select',
      options: ['SUV', 'Sedan', 'Truck', 'Coupe', 'Hatchback', 'Convertible', 'Wagon', 'Van'],
      description: 'Vehicle body style for segment comparison',
    },
    title: {
      control: 'text',
      description: 'Section title',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default warranty display with NHTSA data integration.
 * Uses a Honda CR-V as the example vehicle to demonstrate
 * recalls, complaints, and safety ratings.
 */
export const Default: Story = {
  args: {
    items: defaultWarrantyItems,
    make: 'Honda',
    model: 'CR-V',
    year: 2024,
    bodyStyle: 'SUV',
  },
};

/**
 * Example with a vehicle that has known recalls.
 * The BMW X5 demonstrates how recalls are displayed with
 * severity indicators and expandable details.
 */
export const WithRecalls: Story = {
  args: {
    items: defaultWarrantyItems,
    make: 'BMW',
    model: 'X5',
    year: 2024,
    bodyStyle: 'SUV',
    title: 'Warranty & Safety',
  },
};

/**
 * Example with a popular sedan.
 * Shows how the component handles sedan-specific
 * segment comparisons and ratings.
 */
export const SedanExample: Story = {
  args: {
    items: defaultWarrantyItems,
    make: 'Toyota',
    model: 'Camry',
    year: 2024,
    bodyStyle: 'Sedan',
    title: 'Warranty & Safety',
  },
};

/**
 * Example with a truck.
 * Demonstrates truck-specific segment averages
 * for reliability comparison.
 */
export const TruckExample: Story = {
  args: {
    items: defaultWarrantyItems,
    make: 'Ford',
    model: 'F-150',
    year: 2024,
    bodyStyle: 'Truck',
    title: 'Warranty & Safety',
  },
};

/**
 * Luxury brand with extended warranty coverage.
 * Shows custom warranty items for premium vehicles.
 */
export const LuxuryBrand: Story = {
  args: {
    items: [
      {
        icon: <FileText size={28} />,
        title: 'New Vehicle Limited Warranty',
        coverage: '4 Years / 50,000 Miles',
        description: 'Comprehensive coverage for vehicle defects.',
      },
      {
        icon: <Wrench size={28} />,
        title: 'Powertrain Warranty',
        coverage: '6 Years / 70,000 Miles',
        description: 'Extended powertrain protection.',
      },
      {
        icon: <Shield size={28} />,
        title: 'Rust Perforation',
        coverage: '12 Years / Unlimited',
        description: 'Industry-leading corrosion protection.',
      },
      {
        icon: <Calendar size={28} />,
        title: 'Complimentary Maintenance',
        coverage: '3 Years / 36,000 Miles',
        description: 'Includes scheduled maintenance services.',
      },
    ],
    make: 'Mercedes-Benz',
    model: 'GLC',
    year: 2024,
    bodyStyle: 'SUV',
    title: 'Protection Plans',
  },
};

/**
 * Electric vehicle example.
 * EVs often have different warranty structures,
 * especially for battery coverage.
 */
export const ElectricVehicle: Story = {
  args: {
    items: [
      {
        icon: <FileText size={28} />,
        title: 'Basic Vehicle Warranty',
        coverage: '4 Years / 50,000 Miles',
        description: 'Comprehensive bumper-to-bumper coverage.',
      },
      {
        icon: <Wrench size={28} />,
        title: 'Battery & Drive Unit',
        coverage: '8 Years / 100,000 Miles',
        description: 'Extended coverage for EV-specific components.',
      },
      {
        icon: <Shield size={28} />,
        title: 'Corrosion Warranty',
        coverage: '8 Years / Unlimited',
        description: 'Protection against rust-through corrosion.',
      },
      {
        icon: <Calendar size={28} />,
        title: 'Roadside Assistance',
        coverage: '4 Years / 50,000 Miles',
        description: 'Includes mobile charging assistance.',
      },
    ],
    make: 'Tesla',
    model: 'Model Y',
    year: 2024,
    bodyStyle: 'SUV',
    title: 'Warranty Coverage',
  },
};

/**
 * Warranty only mode without vehicle data.
 * When make/model/year are not provided, only
 * the warranty cards are displayed.
 */
export const WarrantyOnly: Story = {
  args: {
    items: defaultWarrantyItems,
    title: 'Warranty Information',
  },
};

/**
 * Compact SUV example.
 * The Nissan Kicks demonstrates how the component
 * handles subcompact SUV segment comparisons.
 */
export const CompactSUV: Story = {
  args: {
    items: defaultWarrantyItems,
    make: 'Nissan',
    model: 'Kicks',
    year: 2024,
    bodyStyle: 'SUV',
    title: 'Warranty & Safety',
  },
};
