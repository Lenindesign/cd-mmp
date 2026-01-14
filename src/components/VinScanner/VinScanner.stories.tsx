import type { Meta, StoryObj } from '@storybook/react';
import VinScanner from './VinScanner';

const meta: Meta<typeof VinScanner> = {
  title: 'Components/VinScanner',
  component: VinScanner,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# VIN Scanner

A component that allows users to scan or photograph their Vehicle Identification Number (VIN) to instantly identify vehicle details. 

## Features

- **Camera Scanning**: Use device camera to capture VIN barcode or plate
- **Photo Upload**: Upload an existing image of the VIN
- **Manual Entry**: Type the 17-character VIN directly
- **Vehicle Decoding**: Automatically decodes VIN to show vehicle details
- **Trade-in Integration**: Direct path to get trade-in value

## Google Cloud Vision Integration

In production, this component integrates with Google Cloud Vision API for:
- **TEXT_DETECTION**: Extract text from images
- **VIN Pattern Matching**: Filter extracted text for valid VIN format
- **OCR Processing**: Handle various VIN label formats and conditions

## NHTSA vPIC API

Vehicle decoding uses the NHTSA vPIC API to retrieve:
- Year, Make, Model, Trim
- Engine specifications
- Transmission type
- Body style and more

## Usage

\`\`\`tsx
<VinScanner
  onVinDecoded={(data) => console.log('Decoded:', data)}
  onGetTradeInValue={(data) => navigateToTradeIn(data)}
/>
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    compact: {
      control: 'boolean',
      description: 'Show compact mode for embedding in other components',
    },
    onVinDecoded: {
      action: 'vinDecoded',
      description: 'Callback when VIN is successfully decoded',
    },
    onGetTradeInValue: {
      action: 'getTradeInValue',
      description: 'Callback when user wants to get trade-in value',
    },
  },
};

export default meta;
type Story = StoryObj<typeof VinScanner>;

export const Default: Story = {
  args: {},
  decorators: [
    (Story) => (
      <div style={{ width: '600px', maxWidth: '100%' }}>
        <Story />
      </div>
    ),
  ],
};

export const Compact: Story = {
  args: {
    compact: true,
  },
  decorators: [
    (Story) => (
      <div style={{ width: '400px', maxWidth: '100%' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Compact mode for embedding in modals or sidebars.',
      },
    },
  },
};

export const WithCallbacks: Story = {
  args: {
    onVinDecoded: (data) => {
      console.log('VIN Decoded:', data);
      alert(`Decoded: ${data.year} ${data.make} ${data.model}`);
    },
    onGetTradeInValue: (data) => {
      console.log('Get Trade-in Value:', data);
      alert(`Getting trade-in value for: ${data.year} ${data.make} ${data.model}`);
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: '600px', maxWidth: '100%' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'With callback handlers for decoded VIN and trade-in value requests.',
      },
    },
  },
};

export const InTradeInFlow: Story = {
  args: {
    compact: true,
  },
  decorators: [
    (Story) => (
      <div style={{ 
        width: '500px', 
        maxWidth: '100%',
        padding: '24px',
        background: '#f5f5f5',
        borderRadius: '12px'
      }}>
        <h3 style={{ 
          marginBottom: '16px', 
          fontFamily: 'Inter, sans-serif',
          fontWeight: 800,
          fontSize: '20px'
        }}>
          Step 1: Identify Your Vehicle
        </h3>
        <p style={{ 
          marginBottom: '24px', 
          fontFamily: 'Inter, sans-serif',
          fontSize: '14px',
          color: '#666'
        }}>
          Scan your VIN to get an instant trade-in estimate
        </p>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Example of VIN Scanner embedded in a trade-in flow.',
      },
    },
  },
};

