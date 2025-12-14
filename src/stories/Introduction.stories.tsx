import type { Meta, StoryObj } from '@storybook/react';
import '../index.css';

const meta: Meta = {
  title: 'Introduction',
  parameters: {
    layout: 'padded',
  },
};

export default meta;

type Story = StoryObj;

export const Welcome: Story = {
  render: () => (
    <div style={{ fontFamily: 'var(--font-body)', maxWidth: '800px', lineHeight: 1.6 }}>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--font-size-4xl)', marginBottom: '16px' }}>
        Car and Driver Design System
      </h1>
      <p style={{ fontSize: 'var(--font-size-lg)', color: 'var(--color-gray-600)', marginBottom: '32px' }}>
        Welcome to the component library. This Storybook documents all UI components following <strong>Atomic Design</strong> principles.
      </p>

      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: 'var(--font-size-2xl)', marginBottom: '16px' }}>🏗️ Architecture</h2>
        
        <h3 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 600, marginTop: '24px' }}>Atoms</h3>
        <p>Basic building blocks: Button, TextField, LoadingSpinner, Toast, ErrorState, OptimizedImage</p>
        
        <h3 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 600, marginTop: '24px' }}>Molecules</h3>
        <p>Simple combinations: QuickSpecs, Incentives, MarketSpeed, TrimSelector, TargetPriceRange, BuyingPotential</p>
        
        <h3 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 600, marginTop: '24px' }}>Organisms</h3>
        <p>Complex UI: Header, Footer, Hero, ExitIntentModal, Comparison, VehicleRanking, PricingCTA</p>
      </section>

      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: 'var(--font-size-2xl)', marginBottom: '16px' }}>🎨 Design Tokens</h2>
        
        <h3 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 600, marginTop: '24px' }}>Colors</h3>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginTop: '12px' }}>
          <ColorSwatch name="Blue Cobalt" token="--color-blue-cobalt" color="#1B5F8A" />
          <ColorSwatch name="Red" token="--color-red" color="#D22730" />
          <ColorSwatch name="Success" token="--color-success" color="#22c55e" />
          <ColorSwatch name="Warning" token="--color-warning" color="#f59e0b" />
          <ColorSwatch name="Error" token="--color-error" color="#ef4444" />
        </div>

        <h3 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 600, marginTop: '24px' }}>Typography</h3>
        <table style={{ borderCollapse: 'collapse', width: '100%', marginTop: '12px' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid var(--color-gray-200)' }}>
              <th style={{ textAlign: 'left', padding: '8px' }}>Variable</th>
              <th style={{ textAlign: 'left', padding: '8px' }}>Font</th>
              <th style={{ textAlign: 'left', padding: '8px' }}>Usage</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid var(--color-gray-200)' }}>
              <td style={{ padding: '8px' }}><code>--font-display</code></td>
              <td style={{ padding: '8px', fontFamily: 'var(--font-display)' }}>Barlow Condensed</td>
              <td style={{ padding: '8px' }}>Large headings</td>
            </tr>
            <tr style={{ borderBottom: '1px solid var(--color-gray-200)' }}>
              <td style={{ padding: '8px' }}><code>--font-heading</code></td>
              <td style={{ padding: '8px', fontFamily: 'var(--font-heading)' }}>Inter</td>
              <td style={{ padding: '8px' }}>Section headings</td>
            </tr>
            <tr style={{ borderBottom: '1px solid var(--color-gray-200)' }}>
              <td style={{ padding: '8px' }}><code>--font-body</code></td>
              <td style={{ padding: '8px', fontFamily: 'var(--font-body)' }}>Inter</td>
              <td style={{ padding: '8px' }}>Body text</td>
            </tr>
            <tr>
              <td style={{ padding: '8px' }}><code>--font-article</code></td>
              <td style={{ padding: '8px', fontFamily: 'var(--font-article)' }}>Lora</td>
              <td style={{ padding: '8px' }}>Article content</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: 'var(--font-size-2xl)', marginBottom: '16px' }}>📱 Responsive Breakpoints</h2>
        <ul style={{ paddingLeft: '20px' }}>
          <li><strong>&lt; 768px</strong> — Mobile</li>
          <li><strong>768px - 1024px</strong> — Tablet</li>
          <li><strong>&gt; 1024px</strong> — Desktop</li>
        </ul>
      </section>

      <section>
        <h2 style={{ fontSize: 'var(--font-size-2xl)', marginBottom: '16px' }}>♿ Accessibility</h2>
        <ul style={{ paddingLeft: '20px' }}>
          <li>✅ Focus states visible</li>
          <li>✅ Keyboard navigable</li>
          <li>✅ ARIA labels included</li>
          <li>✅ Color contrast 4.5:1+</li>
          <li>✅ Reduced motion support</li>
        </ul>
      </section>
    </div>
  ),
};

// Helper component for color swatches
const ColorSwatch = ({ name, token, color }: { name: string; token: string; color: string }) => (
  <div style={{ textAlign: 'center' }}>
    <div style={{ 
      width: '80px', 
      height: '80px', 
      backgroundColor: color, 
      borderRadius: '8px',
      border: '1px solid var(--color-gray-200)'
    }} />
    <div style={{ fontSize: '14px', fontWeight: 600, marginTop: '8px' }}>{name}</div>
    <code style={{ fontSize: '11px', color: 'var(--color-gray-600)' }}>{token}</code>
  </div>
);

