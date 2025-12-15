import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import '../index.css';

// TODO: Import your components here
// import ComponentA from '../components/ComponentA/ComponentA';
// import ComponentB from '../components/ComponentB/ComponentB';

const meta: Meta = {
  title: 'My Patterns/Pattern Name', // TODO: Change this
  parameters: {
    layout: 'fullscreen',
    chromatic: {
      disableSnapshot: true, // Disable Chromatic snapshots for template story
    },
  },
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="*" element={<Story />} />
        </Routes>
      </MemoryRouter>
    ),
  ],
};

export default meta;
type Story = StoryObj;

// TODO: Add your mock data here
// const mockData = {
//   // Your data structure
// };

// Pattern Overview - Explains what this pattern is for
export const Overview: Story = {
  name: '📚 Overview',
  render: () => (
    <div style={{ 
      padding: 'var(--spacing-8)', 
      maxWidth: '1280px', 
      margin: '0 auto',
      fontFamily: 'var(--font-body)',
    }}>
      <h1 style={{ 
        fontFamily: 'var(--font-heading)',
        fontSize: 'var(--font-size-4xl)',
        marginBottom: 'var(--spacing-4)',
      }}>
        Pattern Name
      </h1>
      
      <p style={{ 
        fontSize: 'var(--font-size-lg)',
        color: 'var(--color-gray-600)',
        marginBottom: 'var(--spacing-6)',
      }}>
        Brief description of what this pattern does and when to use it.
      </p>

      <h2 style={{ 
        fontFamily: 'var(--font-heading)',
        fontSize: 'var(--font-size-2xl)',
        marginBottom: 'var(--spacing-3)',
      }}>
        Components Used
      </h2>
      <ul style={{ marginBottom: 'var(--spacing-6)' }}>
        <li><strong>ComponentA</strong> - What it does</li>
        <li><strong>ComponentB</strong> - What it does</li>
      </ul>

      <h2 style={{ 
        fontFamily: 'var(--font-heading)',
        fontSize: 'var(--font-size-2xl)',
        marginBottom: 'var(--spacing-3)',
      }}>
        Code Example
      </h2>
      <pre style={{
        backgroundColor: 'var(--color-gray-900)',
        color: 'var(--color-white)',
        padding: 'var(--spacing-4)',
        borderRadius: 'var(--border-radius-md)',
        overflow: 'auto',
        fontFamily: 'monospace',
      }}>
{`// TODO: Add your code example
<ComponentA />
<ComponentB />`}
      </pre>

      <h2 style={{ 
        fontFamily: 'var(--font-heading)',
        fontSize: 'var(--font-size-2xl)',
        marginBottom: 'var(--spacing-3)',
        marginTop: 'var(--spacing-6)',
      }}>
        When to Use
      </h2>
      <p>
        Explain the use case for this pattern.
      </p>
    </div>
  ),
};

// Main Pattern Example
export const Default: Story = {
  name: '✨ Default',
  render: () => (
    <div style={{ 
      maxWidth: '1280px', 
      margin: '0 auto', 
      padding: 'var(--spacing-4)' 
    }}>
      {/* TODO: Add your component composition here */}
      <div>
        <h2>Your Pattern Here</h2>
        <p>Replace this with your actual components</p>
      </div>
    </div>
  ),
};

// Variation 1
export const Variation1: Story = {
  name: '🎨 Variation 1',
  render: () => (
    <div style={{ 
      maxWidth: '1280px', 
      margin: '0 auto', 
      padding: 'var(--spacing-4)' 
    }}>
      {/* TODO: Show a variation of your pattern */}
    </div>
  ),
};

// Mobile Version
export const Mobile: Story = {
  name: '📱 Mobile',
  parameters: {
    viewport: {
      defaultViewport: 'mobile',
    },
  },
  render: () => (
    <div style={{ padding: 'var(--spacing-2)' }}>
      {/* TODO: Mobile-optimized version */}
    </div>
  ),
};

