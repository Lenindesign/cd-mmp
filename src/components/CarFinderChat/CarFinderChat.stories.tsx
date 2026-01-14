import type { Meta, StoryObj } from '@storybook/react';
import CarFinderChat from './CarFinderChat';

const meta: Meta<typeof CarFinderChat> = {
  title: 'Components/CarFinderChat',
  component: CarFinderChat,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Car Finder Chat

An AI-powered conversational interface that helps users find their perfect vehicle through natural language queries.

## Features

- **Natural Language Understanding**: Parse user intent from conversational queries
- **Smart Vehicle Matching**: Filter and rank vehicles based on preferences
- **Context Awareness**: Maintains conversation context for follow-up questions
- **Vehicle Cards**: Display matching vehicles with key specs
- **Floating Mode**: Can be used as a floating chat widget

## Google Gemini Integration

In production, this component integrates with Google Gemini API for:
- **Intent Classification**: Understand what the user is looking for
- **Entity Extraction**: Pull out budget, body style, features, etc.
- **Response Generation**: Create helpful, personalized responses
- **Conversation Memory**: Remember context across messages

## Supported Queries

Users can ask about:
- Budget constraints: "under $40,000", "$30k to $50k"
- Body styles: "SUV", "sedan", "truck", "sports car"
- Fuel types: "electric", "hybrid", "fuel-efficient"
- Features: "towing", "family-friendly", "luxury", "AWD"
- Specific makes: "Toyota", "BMW", "Tesla"

## Usage

\`\`\`tsx
// Embedded mode
<CarFinderChat
  onVehicleSelect={(vehicle) => navigate(\`/vehicles/\${vehicle.slug}\`)}
/>

// Floating widget
<CarFinderChat
  floating
  position="bottom-right"
  onVehicleSelect={(vehicle) => navigate(\`/vehicles/\${vehicle.slug}\`)}
/>
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    floating: {
      control: 'boolean',
      description: 'Enable floating mode (bottom corner widget)',
    },
    position: {
      control: 'select',
      options: ['bottom-right', 'bottom-left'],
      description: 'Position for floating mode',
    },
    defaultOpen: {
      control: 'boolean',
      description: 'Initial open state (for floating mode)',
    },
    onVehicleSelect: {
      action: 'vehicleSelected',
      description: 'Callback when user selects a vehicle',
    },
  },
};

export default meta;
type Story = StoryObj<typeof CarFinderChat>;

export const Default: Story = {
  args: {
    floating: false,
  },
  decorators: [
    (Story) => (
      <div style={{ width: '420px', maxWidth: '100%', height: '600px' }}>
        <Story />
      </div>
    ),
  ],
};

export const FloatingWidget: Story = {
  args: {
    floating: true,
    position: 'bottom-right',
    defaultOpen: false,
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Floating chat widget that appears in the bottom corner of the screen. Click the button to open.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ 
        width: '100vw', 
        height: '100vh', 
        background: 'linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)',
        position: 'relative'
      }}>
        <div style={{ 
          padding: '40px',
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          <h1 style={{ 
            fontFamily: 'Inter, sans-serif', 
            fontWeight: 800,
            marginBottom: '16px'
          }}>
            Welcome to Car and Driver Marketplace
          </h1>
          <p style={{ 
            fontFamily: 'Inter, sans-serif',
            color: '#666',
            fontSize: '16px',
            lineHeight: 1.6
          }}>
            Browse our extensive collection of new and used vehicles. 
            Need help finding the perfect car? Click the chat button in the 
            bottom right corner to talk to our AI assistant!
          </p>
        </div>
        <Story />
      </div>
    ),
  ],
};

export const FloatingOpen: Story = {
  args: {
    floating: true,
    position: 'bottom-right',
    defaultOpen: true,
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Floating widget in its open state.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ 
        width: '100vw', 
        height: '100vh', 
        background: '#f5f5f5',
        position: 'relative'
      }}>
        <Story />
      </div>
    ),
  ],
};

export const BottomLeft: Story = {
  args: {
    floating: true,
    position: 'bottom-left',
    defaultOpen: true,
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Floating widget positioned in the bottom-left corner.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ 
        width: '100vw', 
        height: '100vh', 
        background: '#f5f5f5',
        position: 'relative'
      }}>
        <Story />
      </div>
    ),
  ],
};

export const WithVehicleSelection: Story = {
  args: {
    floating: false,
    onVehicleSelect: (vehicle) => {
      console.log('Selected vehicle:', vehicle);
      alert(`Selected: ${vehicle.year} ${vehicle.make} ${vehicle.model}\nPrice: ${vehicle.priceRange}`);
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: '420px', maxWidth: '100%', height: '600px' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'With vehicle selection callback. Try asking for a vehicle and clicking on a result.',
      },
    },
  },
};

export const EmbeddedInPage: Story = {
  args: {
    floating: false,
  },
  decorators: [
    (Story) => (
      <div style={{ 
        display: 'grid',
        gridTemplateColumns: '1fr 420px',
        gap: '24px',
        width: '100%',
        maxWidth: '1200px',
        padding: '24px',
        background: '#fff'
      }}>
        <div>
          <h2 style={{ 
            fontFamily: 'Inter, sans-serif', 
            fontWeight: 800,
            fontSize: '28px',
            marginBottom: '16px'
          }}>
            Find Your Perfect Car
          </h2>
          <p style={{ 
            fontFamily: 'Inter, sans-serif',
            color: '#666',
            fontSize: '14px',
            lineHeight: 1.6,
            marginBottom: '24px'
          }}>
            Our AI-powered car finder helps you discover vehicles that match your 
            lifestyle, budget, and preferences. Just tell us what you're looking 
            for in plain English!
          </p>
          <div style={{
            padding: '20px',
            background: '#f5f5f5',
            borderRadius: '8px'
          }}>
            <h3 style={{ 
              fontFamily: 'Inter, sans-serif', 
              fontWeight: 700,
              fontSize: '16px',
              marginBottom: '12px'
            }}>
              Example Questions:
            </h3>
            <ul style={{ 
              fontFamily: 'Inter, sans-serif',
              fontSize: '14px',
              color: '#666',
              lineHeight: 1.8,
              paddingLeft: '20px'
            }}>
              <li>"I need a family SUV under $45,000"</li>
              <li>"What's the best electric car for commuting?"</li>
              <li>"Show me reliable trucks for towing"</li>
              <li>"Find luxury sedans with AWD"</li>
            </ul>
          </div>
        </div>
        <div style={{ height: '600px' }}>
          <Story />
        </div>
      </div>
    ),
  ],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Example of the chat embedded in a page layout alongside content.',
      },
    },
  },
};

