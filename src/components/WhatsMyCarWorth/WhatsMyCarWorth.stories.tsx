import type { Meta, StoryObj } from '@storybook/react';
import WhatsMyCarWorth from './WhatsMyCarWorth';

const meta: Meta<typeof WhatsMyCarWorth> = {
  title: 'Components/WhatsMyCarWorth',
  component: WhatsMyCarWorth,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# What's My Car Worth?

A trade-in value estimator component that allows users to get an instant estimate of their vehicle's worth.

## Features
- **Two Input Methods**: Select vehicle manually OR scan VIN
- Year, Make, Model selection from vehicle database
- **VIN Scanner**: Camera, photo upload, or manual VIN entry
- Mileage input with formatting
- Condition selector with descriptions
- Instant value estimate with range (low/mid/high)
- Market trend indicator
- Trust badges for credibility

## VIN Scanner Features
- 📷 **Camera Mode** - Point at VIN barcode or plate
- 📤 **Photo Upload** - Upload an existing image
- ⌨️ **Manual Entry** - Type the 17-character VIN
- 🚗 **Auto-decode** - Automatically fills vehicle details

## Usage
\`\`\`tsx
import WhatsMyCarWorth from '@/components/WhatsMyCarWorth';

<WhatsMyCarWorth 
  onGetEstimate={(data) => console.log('Estimate requested:', data)}
/>
\`\`\`

## Integration
- Trade-in values powered by Black Book data (mock)
- VIN decoding via NHTSA vPIC API (mock)
- Image OCR via Google Cloud Vision API (mock)
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    defaultYear: {
      control: 'text',
      description: 'Pre-selected year',
    },
    defaultMake: {
      control: 'text',
      description: 'Pre-selected make',
    },
    defaultModel: {
      control: 'text',
      description: 'Pre-selected model',
    },
    onGetEstimate: {
      action: 'estimate-requested',
      description: 'Callback when estimate is requested',
    },
  },
};

export default meta;
type Story = StoryObj<typeof WhatsMyCarWorth>;

/**
 * Default state - empty form ready for user input
 */
export const Default: Story = {
  args: {},
};

/**
 * Pre-filled with a Honda Accord
 */
export const PrefilledHondaAccord: Story = {
  args: {
    defaultYear: '2020',
    defaultMake: 'Honda',
    defaultModel: 'Accord',
  },
};

/**
 * Pre-filled with a Toyota Camry
 */
export const PrefilledToyotaCamry: Story = {
  args: {
    defaultYear: '2019',
    defaultMake: 'Toyota',
    defaultModel: 'Camry',
  },
};

/**
 * Pre-filled with a Chevrolet Silverado truck
 */
export const PrefilledChevroletSilverado: Story = {
  args: {
    defaultYear: '2021',
    defaultMake: 'Chevrolet',
    defaultModel: 'Silverado 1500',
  },
};

/**
 * Pre-filled with a BMW 3 Series
 */
export const PrefilledBMW3Series: Story = {
  args: {
    defaultYear: '2022',
    defaultMake: 'BMW',
    defaultModel: '3 Series',
  },
};

/**
 * The component now features two tabs:
 * 1. **Select Vehicle** - Traditional dropdown selection
 * 2. **Scan VIN** - Camera/upload/manual VIN entry
 * 
 * Click the "Scan VIN" tab to see the VIN scanner functionality.
 */
export const WithVINScanner: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: `
This story showcases the new VIN Scanner tab. Click "Scan VIN" to see:
- Camera scanning option
- Photo upload option  
- Manual VIN entry option

The VIN scanner uses Google Cloud Vision API (mocked) for OCR and NHTSA vPIC API (mocked) for vehicle decoding.
        `,
      },
    },
  },
};

