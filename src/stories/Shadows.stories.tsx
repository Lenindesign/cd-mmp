import type { Meta, StoryObj } from '@storybook/react';

/**
 * # Shadows
 * 
 * Shadow tokens create depth and visual hierarchy in the UI.
 * Use shadows consistently to indicate elevation and interactive states.
 * 
 * ## Shadow Scale
 * 
 * | Token | Value | Use Case |
 * |-------|-------|----------|
 * | `--shadow-sm` | `0 1px 2px rgba(0, 0, 0, 0.05)` | Subtle elevation for cards |
 * | `--shadow-md` | `0 3px 6px rgba(0, 0, 0, 0.08)` | Default card/dropdown shadows |
 * | `--shadow-lg` | `0 8px 24px rgba(0, 0, 0, 0.12)` | Modals, popovers |
 * | `--shadow-xl` | `0 16px 48px rgba(0, 0, 0, 0.16)` | Large overlays, hero elements |
 */

const shadows = [
  {
    name: 'Small',
    variable: '--shadow-sm',
    value: '0 1px 2px rgba(0, 0, 0, 0.05)',
    description: 'Subtle elevation for cards, list items, and light hover states',
  },
  {
    name: 'Medium',
    variable: '--shadow-md',
    value: '0 3px 6px rgba(0, 0, 0, 0.08)',
    description: 'Default shadow for cards, dropdowns, and interactive elements',
  },
  {
    name: 'Large',
    variable: '--shadow-lg',
    value: '0 8px 24px rgba(0, 0, 0, 0.12)',
    description: 'Modals, popovers, and floating elements',
  },
  {
    name: 'Extra Large',
    variable: '--shadow-xl',
    value: '0 16px 48px rgba(0, 0, 0, 0.16)',
    description: 'Large overlays, hero cards, and prominent UI elements',
  },
];

const ShadowsPage = () => (
  <>
    <style>
      {`
        .docs-container {
          max-width: 960px;
          margin: 0 auto;
          font-family: var(--font-body, Inter, -apple-system, BlinkMacSystemFont, sans-serif);
          color: var(--color-dark, #1d1d1f);
          -webkit-font-smoothing: antialiased;
          padding: 0 24px;
        }
        
        .docs-header {
          padding: 80px 0 64px;
          border-bottom: 1px solid var(--color-gray-200, #e5e5e5);
          margin-bottom: 64px;
        }
        
        .docs-eyebrow {
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--color-gray-500, #86868b);
          margin-bottom: 16px;
        }
        
        .docs-header h1 {
          font-family: var(--font-display);
          font-size: 48px;
          font-weight: 600;
          letter-spacing: -0.02em;
          line-height: 1.1;
          margin: 0 0 24px 0;
        }
        
        .docs-header p {
          font-size: 21px;
          font-weight: 400;
          line-height: 1.5;
          color: var(--color-gray-600, #424245);
          margin: 0;
        }
        
        .section {
          margin-bottom: 80px;
        }
        
        .section h2 {
          font-family: var(--font-display);
          font-size: 28px;
          font-weight: 600;
          letter-spacing: -0.01em;
          margin: 0 0 32px 0;
        }
        
        .shadow-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 32px;
        }
        
        .shadow-card {
          background: white;
          border-radius: 16px;
          padding: 32px;
          border: 1px solid var(--color-gray-200, #e5e5e5);
        }
        
        .shadow-preview {
          height: 120px;
          background: white;
          border-radius: 12px;
          margin-bottom: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          color: var(--color-gray-500, #86868b);
        }
        
        .shadow-sm { box-shadow: var(--shadow-sm); }
        .shadow-md { box-shadow: var(--shadow-md); }
        .shadow-lg { box-shadow: var(--shadow-lg); }
        .shadow-xl { box-shadow: var(--shadow-xl); }
        
        .shadow-info h3 {
          font-size: 18px;
          font-weight: 600;
          margin: 0 0 8px 0;
        }
        
        .shadow-variable {
          font-family: 'SF Mono', 'Fira Code', monospace;
          font-size: 13px;
          color: var(--color-blue-cobalt, #2563eb);
          background: var(--color-gray-100, #f5f5f5);
          padding: 4px 8px;
          border-radius: 4px;
          display: inline-block;
          margin-bottom: 12px;
        }
        
        .shadow-value {
          font-family: 'SF Mono', 'Fira Code', monospace;
          font-size: 12px;
          color: var(--color-gray-600, #666);
          margin-bottom: 12px;
          word-break: break-all;
        }
        
        .shadow-description {
          font-size: 14px;
          color: var(--color-gray-600, #666);
          line-height: 1.5;
          margin: 0;
        }
        
        .usage-section {
          background: var(--color-gray-100, #f9fafb);
          border-radius: 16px;
          padding: 40px;
          margin-top: 48px;
        }
        
        .usage-section h3 {
          font-size: 20px;
          font-weight: 600;
          margin: 0 0 24px 0;
        }
        
        .usage-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 24px;
        }
        
        .usage-item {
          background: white;
          border-radius: 12px;
          padding: 24px;
          text-align: center;
        }
        
        .usage-item.sm { box-shadow: var(--shadow-sm); }
        .usage-item.md { box-shadow: var(--shadow-md); }
        .usage-item.lg { box-shadow: var(--shadow-lg); }
        .usage-item.xl { box-shadow: var(--shadow-xl); }
        
        .usage-label {
          font-size: 13px;
          font-weight: 500;
          color: var(--color-gray-600, #666);
          margin-top: 12px;
        }
        
        .code-block {
          background: var(--color-dark, #1a1a1a);
          border-radius: 12px;
          padding: 24px;
          margin-top: 32px;
          overflow-x: auto;
        }
        
        .code-block pre {
          margin: 0;
          font-family: 'SF Mono', 'Fira Code', monospace;
          font-size: 13px;
          line-height: 1.6;
          color: #e5e5e5;
        }
        
        .code-comment {
          color: #6b7280;
        }
        
        .code-property {
          color: #93c5fd;
        }
        
        .code-value {
          color: #86efac;
        }
        
        .interactive-demo {
          margin-top: 48px;
          padding: 40px;
          background: white;
          border-radius: 16px;
          border: 1px solid var(--color-gray-200, #e5e5e5);
        }
        
        .demo-card {
          width: 200px;
          height: 120px;
          background: white;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto;
          transition: box-shadow 0.3s ease;
          cursor: pointer;
          border: 1px solid var(--color-gray-200, #e5e5e5);
        }
        
        .demo-card:hover {
          box-shadow: var(--shadow-lg);
          border-color: transparent;
        }
        
        .demo-card:active {
          box-shadow: var(--shadow-sm);
        }
        
        .demo-label {
          font-size: 14px;
          color: var(--color-gray-500, #86868b);
        }
        
        .demo-hint {
          text-align: center;
          margin-top: 16px;
          font-size: 13px;
          color: var(--color-gray-500, #86868b);
        }
      `}
    </style>
    
    <div className="docs-container">
      <header className="docs-header">
        <div className="docs-eyebrow">Foundation</div>
        <h1>Shadows</h1>
        <p>Shadow tokens create depth and visual hierarchy. Use them consistently to indicate elevation and interactive states.</p>
      </header>
      
      <section className="section">
        <h2>Shadow Scale</h2>
        <div className="shadow-grid">
          {shadows.map((shadow) => (
            <div key={shadow.variable} className="shadow-card">
              <div className={`shadow-preview shadow-${shadow.variable.replace('--shadow-', '')}`}>
                Preview
              </div>
              <div className="shadow-info">
                <h3>{shadow.name}</h3>
                <code className="shadow-variable">{shadow.variable}</code>
                <div className="shadow-value">{shadow.value}</div>
                <p className="shadow-description">{shadow.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      <section className="section">
        <h2>Common Usage</h2>
        <div className="usage-section">
          <h3>Elevation Examples</h3>
          <div className="usage-grid">
            <div className="usage-item sm">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2" />
              </svg>
              <div className="usage-label">List Item</div>
            </div>
            <div className="usage-item md">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <line x1="3" y1="9" x2="21" y2="9" />
              </svg>
              <div className="usage-label">Card</div>
            </div>
            <div className="usage-item lg">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <line x1="6" y1="8" x2="18" y2="8" />
                <line x1="6" y1="12" x2="14" y2="12" />
              </svg>
              <div className="usage-label">Modal</div>
            </div>
            <div className="usage-item xl">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="1" y="3" width="22" height="18" rx="2" />
                <circle cx="12" cy="12" r="4" />
              </svg>
              <div className="usage-label">Hero Overlay</div>
            </div>
          </div>
        </div>
        
        <div className="code-block">
          <pre>
            <span className="code-comment">/* Using shadow tokens in CSS */</span>{'\n'}
            <span className="code-property">.card</span> {'{'}{'\n'}
            {'  '}<span className="code-property">box-shadow</span>: <span className="code-value">var(--shadow-md)</span>;{'\n'}
            {'}'}{'\n\n'}
            <span className="code-comment">/* Hover state with larger shadow */</span>{'\n'}
            <span className="code-property">.card:hover</span> {'{'}{'\n'}
            {'  '}<span className="code-property">box-shadow</span>: <span className="code-value">var(--shadow-lg)</span>;{'\n'}
            {'  '}<span className="code-property">transition</span>: <span className="code-value">box-shadow 0.2s ease</span>;{'\n'}
            {'}'}
          </pre>
        </div>
      </section>
      
      <section className="section">
        <h2>Interactive Demo</h2>
        <div className="interactive-demo">
          <div className="demo-card">
            <span className="demo-label">Hover me</span>
          </div>
          <p className="demo-hint">Hover to see shadow transition from none to large</p>
        </div>
      </section>
    </div>
  </>
);

const meta: Meta = {
  title: 'Foundation/Shadows',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Shadow tokens for creating depth and visual hierarchy.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const AllShadows: Story = {
  render: () => <ShadowsPage />,
  parameters: {
    docs: {
      canvas: { sourceState: 'hidden' },
    },
  },
};

