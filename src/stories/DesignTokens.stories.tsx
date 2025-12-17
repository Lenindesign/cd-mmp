import type { Meta, StoryObj } from '@storybook/react';
import '../index.css';

const meta: Meta = {
  title: 'Design System/Design Tokens',
  parameters: {
    layout: 'fullscreen',
    options: {
      showPanel: false,
    },
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export default meta;
type Story = StoryObj;

const colors = [
  { name: '--color-dark-grey', value: '#222222', usage: 'Primary text, headings' },
  { name: '--color-dark-blue', value: '#1B5F8A', usage: 'Primary brand, links' },
  { name: '--color-gold', value: '#DBCA8B', usage: 'Accents, highlights' },
  { name: '--color-light-orange', value: '#F7E4CA', usage: 'Warm backgrounds' },
  { name: '--color-light-grey', value: '#F5F5F5', usage: 'Backgrounds, cards' },
  { name: '--color-red', value: '#D2232A', usage: 'Errors, alerts' },
  { name: '--color-green', value: '#26870D', usage: 'Success states' },
  { name: '--color-dark-gold', value: '#A59143', usage: 'Secondary accents' },
  { name: '--color-light-blue', value: '#F1F7F7', usage: 'Subtle backgrounds' },
  { name: '--color-white', value: '#FFFFFF', usage: 'Backgrounds, cards' },
];

const spacing = [
  { name: '--spacing-1', value: '4px', usage: 'Tight spacing' },
  { name: '--spacing-2', value: '8px', usage: 'Small gaps' },
  { name: '--spacing-3', value: '12px', usage: 'Default spacing' },
  { name: '--spacing-4', value: '16px', usage: 'Card padding' },
  { name: '--spacing-6', value: '24px', usage: 'Section gaps' },
  { name: '--spacing-8', value: '32px', usage: 'Large spacing' },
  { name: '--spacing-12', value: '48px', usage: 'Section padding' },
  { name: '--spacing-16', value: '64px', usage: 'Page margins' },
  { name: '--spacing-20', value: '80px', usage: 'Large sections' },
];

const typography = [
  { name: '--font-heading', value: 'Inter', example: 'Headlines', style: { fontFamily: 'var(--font-heading)', fontSize: '24px', fontWeight: 600 } },
  { name: '--font-body', value: 'Inter', example: 'Body text', style: { fontFamily: 'var(--font-body)', fontSize: '16px' } },
];

const fontSizes = [
  { name: '--font-size-xs', value: '12px', example: 'Extra Small' },
  { name: '--font-size-sm', value: '14px', example: 'Small' },
  { name: '--font-size-base', value: '16px', example: 'Base' },
  { name: '--font-size-lg', value: '18px', example: 'Large' },
  { name: '--font-size-xl', value: '20px', example: 'XL' },
  { name: '--font-size-2xl', value: '24px', example: '2XL' },
  { name: '--font-size-3xl', value: '32px', example: '3XL' },
  { name: '--font-size-4xl', value: '40px', example: '4XL' },
];

const borderRadius = [
  { name: '--border-radius-sm', value: '4px' },
  { name: '--border-radius-md', value: '8px' },
  { name: '--border-radius-lg', value: '16px' },
  { name: '--border-radius-full', value: '9999px' },
];

export const AllTokens: Story = {
  name: 'All Design Tokens',
  render: () => (
    <>
      <style>
        {`
          .docs-container {
            max-width: 720px;
            margin: 0 auto;
            font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', sans-serif;
            color: #1d1d1f;
            -webkit-font-smoothing: antialiased;
            padding: 0 24px;
          }
          
          .docs-header {
            padding: 80px 0 64px;
            border-bottom: 1px solid #d2d2d7;
            margin-bottom: 64px;
          }
          
          .docs-eyebrow {
            font-size: 12px;
            font-weight: 600;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            color: #86868b;
            margin-bottom: 16px;
          }
          
          .docs-header h1 {
            font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', sans-serif;
            font-size: 48px;
            font-weight: 600;
            letter-spacing: -0.02em;
            line-height: 1.1;
            margin: 0 0 24px 0;
            color: #1d1d1f;
          }
          
          .docs-header p {
            font-size: 21px;
            font-weight: 400;
            line-height: 1.5;
            color: #424245;
            margin: 0;
            max-width: 560px;
          }
          
          .docs-section {
            margin-bottom: 80px;
          }
          
          .docs-section-title {
            font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', sans-serif;
            font-size: 28px;
            font-weight: 600;
            letter-spacing: -0.015em;
            color: #1d1d1f;
            margin: 0 0 12px 0;
          }
          
          .docs-section-subtitle {
            font-size: 17px;
            color: #86868b;
            margin: 0 0 40px 0;
            line-height: 1.5;
          }
          
          .token-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            gap: 1px;
            background: #e8e8ed;
            border: 1px solid #e8e8ed;
          }
          
          .token-card {
            padding: 24px;
            background: #ffffff;
          }
          
          .token-swatch {
            height: 64px;
            margin-bottom: 16px;
            border: 1px solid #e8e8ed;
          }
          
          .token-name {
            font-size: 13px;
            font-weight: 600;
            color: #1d1d1f;
            margin-bottom: 4px;
            font-family: 'SF Mono', 'Menlo', 'Monaco', monospace;
          }
          
          .token-value {
            font-size: 12px;
            color: #86868b;
            font-family: 'SF Mono', 'Menlo', 'Monaco', monospace;
          }
          
          .token-usage {
            font-size: 12px;
            color: #424245;
            margin-top: 8px;
            line-height: 1.4;
          }
          
          .token-code {
            background: #f5f5f7;
            padding: 8px 12px;
            font-family: 'SF Mono', 'Menlo', 'Monaco', monospace;
            font-size: 11px;
            color: #424245;
            margin-top: 12px;
          }
          
          .spacing-bar {
            background: #1d1d1f;
            height: 8px;
            margin-bottom: 16px;
          }
          
          .type-sample {
            margin-bottom: 16px;
            color: #1d1d1f;
          }
          
          .radius-sample {
            width: 64px;
            height: 64px;
            background: #1d1d1f;
            margin-bottom: 16px;
          }
        `}
      </style>
      <div className="docs-container">
        <div className="docs-header">
          <div className="docs-eyebrow">Reference</div>
          <h1>Design Tokens</h1>
          <p>
            CSS variables that ensure consistency across all components and interfaces.
          </p>
        </div>

        <div className="docs-section">
          <h2 className="docs-section-title">Colors</h2>
          <p className="docs-section-subtitle">
            Primary and secondary color palette.
          </p>
          
          <div className="token-grid">
            {colors.map((color) => (
              <div key={color.name} className="token-card">
                <div 
                  className="token-swatch" 
                  style={{ 
                    backgroundColor: color.value,
                    border: color.value === '#FFFFFF' || color.value === '#F5F5F5' || color.value === '#F1F7F7' || color.value === '#F7E4CA' ? '1px solid #e8e8ed' : 'none',
                  }} 
                />
                <div className="token-name">{color.name}</div>
                <div className="token-value">{color.value}</div>
                <div className="token-usage">{color.usage}</div>
                <div className="token-code">color: var({color.name});</div>
              </div>
            ))}
          </div>
        </div>

        <div className="docs-section">
          <h2 className="docs-section-title">Spacing</h2>
          <p className="docs-section-subtitle">
            Consistent spacing scale based on 4px grid.
          </p>
          
          <div className="token-grid">
            {spacing.map((space) => (
              <div key={space.name} className="token-card">
                <div className="spacing-bar" style={{ width: space.value }} />
                <div className="token-name">{space.name}</div>
                <div className="token-value">{space.value}</div>
                <div className="token-usage">{space.usage}</div>
                <div className="token-code">padding: var({space.name});</div>
              </div>
            ))}
          </div>
        </div>

        <div className="docs-section">
          <h2 className="docs-section-title">Typography</h2>
          <p className="docs-section-subtitle">
            Font families and text styles.
          </p>
          
          <div className="token-grid">
            {typography.map((font) => (
              <div key={font.name} className="token-card">
                <div className="type-sample" style={font.style}>{font.example}</div>
                <div className="token-name">{font.name}</div>
                <div className="token-value">{font.value}</div>
                <div className="token-code">font-family: var({font.name});</div>
              </div>
            ))}
          </div>
          
          <h3 style={{ fontSize: '19px', fontWeight: 600, color: '#1d1d1f', margin: '48px 0 24px' }}>Font Sizes</h3>
          <div className="token-grid">
            {fontSizes.map((size) => (
              <div key={size.name} className="token-card">
                <div className="type-sample" style={{ fontSize: size.value }}>{size.example}</div>
                <div className="token-name">{size.name}</div>
                <div className="token-value">{size.value}</div>
                <div className="token-code">font-size: var({size.name});</div>
              </div>
            ))}
          </div>
        </div>

        <div className="docs-section">
          <h2 className="docs-section-title">Border Radius</h2>
          <p className="docs-section-subtitle">
            Corner radius options for UI elements.
          </p>
          
          <div className="token-grid">
            {borderRadius.map((radius) => (
              <div key={radius.name} className="token-card">
                <div className="radius-sample" style={{ borderRadius: radius.value }} />
                <div className="token-name">{radius.name}</div>
                <div className="token-value">{radius.value}</div>
                <div className="token-code">border-radius: var({radius.name});</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  ),
};
