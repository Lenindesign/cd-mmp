import type { Meta, StoryObj } from '@storybook/react';

const ColorSwatch = ({ 
  name, 
  variable, 
  hex, 
  textColor = 'white',
  border = false 
}: { 
  name: string; 
  variable: string; 
  hex: string; 
  textColor?: 'white' | 'dark';
  border?: boolean;
}) => (
  <div className="color-swatch">
    <div 
      className="color-circle" 
      style={{ 
        backgroundColor: `var(${variable})`, 
        color: textColor === 'white' ? '#ffffff' : '#222222',
        border: border ? '1px solid var(--color-gray-300)' : 'none'
      }}
    >
      <span>{name}</span>
      <code>{hex}</code>
    </div>
    <code className="color-var">{variable}</code>
  </div>
);

const ColorsPage = () => (
  <>
    <style>
      {`
        .docs-container {
          max-width: 900px;
          margin: 0 auto;
          font-family: var(--font-body);
          color: var(--color-dark);
          -webkit-font-smoothing: antialiased;
          padding: 0 24px;
        }
        
        .docs-header {
          padding: 60px 0 48px;
          border-bottom: 1px solid var(--color-gray-200);
          margin-bottom: 48px;
        }
        
        .docs-eyebrow {
          font-size: var(--font-size-sm);
          font-weight: var(--font-weight-semibold);
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--color-gray-500);
          margin-bottom: 12px;
        }
        
        .docs-header h1 {
          font-family: var(--font-heading);
          font-size: var(--font-size-4xl);
          font-weight: var(--font-weight-extrabold);
          letter-spacing: -0.02em;
          line-height: 1.1;
          margin: 0 0 16px 0;
          color: var(--color-dark);
        }
        
        .docs-header p {
          font-size: var(--font-size-lg);
          font-weight: var(--font-weight-regular);
          line-height: 1.5;
          color: var(--color-gray-600);
          margin: 0;
          max-width: 560px;
        }
        
        .docs-section {
          margin-bottom: 64px;
        }
        
        .docs-section-title {
          font-family: var(--font-heading);
          font-size: var(--font-size-2xl);
          font-weight: var(--font-weight-bold);
          letter-spacing: -0.015em;
          color: var(--color-dark);
          margin: 0 0 8px 0;
        }
        
        .docs-section-subtitle {
          font-size: var(--font-size-base);
          color: var(--color-gray-500);
          margin: 0 0 32px 0;
          line-height: 1.5;
        }
        
        .color-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
        }
        
        .color-swatch {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }
        
        .color-circle {
          width: 100px;
          height: 100px;
          border-radius: var(--border-radius-lg);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          box-shadow: var(--shadow-sm);
        }
        
        .color-circle span {
          font-size: 10px;
          font-weight: var(--font-weight-semibold);
          letter-spacing: 0.05em;
          text-transform: uppercase;
          margin-bottom: 2px;
        }
        
        .color-circle code {
          font-size: 10px;
          font-family: 'SF Mono', 'Menlo', 'Monaco', monospace;
        }
        
        .color-var {
          font-size: 10px;
          font-family: 'SF Mono', 'Menlo', 'Monaco', monospace;
          color: var(--color-gray-500);
          max-width: 100px;
          text-align: center;
          word-break: break-all;
        }
        
        .color-scale {
          display: flex;
          gap: 4px;
          margin-bottom: 24px;
        }
        
        .color-scale-item {
          flex: 1;
          height: 60px;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          padding-bottom: 8px;
          font-size: 10px;
          font-weight: 600;
          border-radius: var(--border-radius-sm);
        }
      `}
    </style>
    <div className="docs-container">
      <div className="docs-header">
        <div className="docs-eyebrow">Design Tokens</div>
        <h1>Color System</h1>
        <p>
          A systematic approach to color ensures consistency across all components and interfaces.
        </p>
      </div>
      
      {/* Primary Colors - Official C/D Palette */}
      <div className="docs-section">
        <h2 className="docs-section-title">Primary Colors</h2>
        <p className="docs-section-subtitle">
          Official Car and Driver primary brand colors.
        </p>
        
        <div className="color-grid">
          <ColorSwatch name="Dark Grey" variable="--color-dark" hex="#222222" />
          <ColorSwatch name="Dark Blue" variable="--color-blue-cobalt" hex="#1B5F8A" />
          <ColorSwatch name="Gold" variable="--color-gold" hex="#DBCA8B" textColor="dark" />
          <ColorSwatch name="Light Orange" variable="--color-cream" hex="#F7E4CA" textColor="dark" border />
          <ColorSwatch name="Light Grey" variable="--color-gray-100" hex="#F5F5F5" textColor="dark" border />
        </div>
      </div>

      {/* Secondary Colors - Official C/D Palette */}
      <div className="docs-section">
        <h2 className="docs-section-title">Secondary Colors</h2>
        <p className="docs-section-subtitle">
          Official Car and Driver secondary brand colors.
        </p>
        
        <div className="color-grid">
          <ColorSwatch name="Red" variable="--color-red" hex="#D2232A" />
          <ColorSwatch name="Green" variable="--color-success" hex="#26870D" />
          <ColorSwatch name="Dark Gold" variable="--color-gold-dark" hex="#A59143" />
          <ColorSwatch name="Light Blue" variable="--color-teal-light" hex="#F1F7F7" textColor="dark" border />
          <ColorSwatch name="White" variable="--color-white" hex="#FFFFFF" textColor="dark" border />
        </div>
      </div>

      {/* Gray Scale - Simplified */}
      <div className="docs-section">
        <h2 className="docs-section-title">Gray Scale (Simplified)</h2>
        <p className="docs-section-subtitle">
          Optimized 7-color grayscale for text, backgrounds, and borders.
        </p>
        
        <div className="color-scale">
          <div className="color-scale-item" style={{ backgroundColor: 'var(--color-dark)', color: 'white' }}>Dark</div>
          <div className="color-scale-item" style={{ backgroundColor: 'var(--color-gray-700)', color: 'white' }}>700</div>
          <div className="color-scale-item" style={{ backgroundColor: 'var(--color-gray-600)', color: 'white' }}>600</div>
          <div className="color-scale-item" style={{ backgroundColor: 'var(--color-gray-500)', color: 'white' }}>500</div>
          <div className="color-scale-item" style={{ backgroundColor: 'var(--color-gray-300)', color: '#222' }}>300</div>
          <div className="color-scale-item" style={{ backgroundColor: 'var(--color-gray-200)', color: '#222' }}>200</div>
          <div className="color-scale-item" style={{ backgroundColor: 'var(--color-gray-100)', color: '#222' }}>100</div>
          <div className="color-scale-item" style={{ backgroundColor: 'var(--color-gray-50)', color: '#222', border: '1px solid var(--color-gray-200)' }}>50</div>
        </div>
        
        <div className="color-grid">
          <ColorSwatch name="Dark" variable="--color-dark" hex="#222222" />
          <ColorSwatch name="Gray 700" variable="--color-gray-700" hex="#4a4a4a" />
          <ColorSwatch name="Gray 600" variable="--color-gray-600" hex="#666666" />
          <ColorSwatch name="Gray 500" variable="--color-gray-500" hex="#6b6b6b" />
          <ColorSwatch name="Gray 300" variable="--color-gray-300" hex="#cdcdcd" textColor="dark" />
          <ColorSwatch name="Gray 200" variable="--color-gray-200" hex="#e5e5e5" textColor="dark" border />
          <ColorSwatch name="Gray 100" variable="--color-gray-100" hex="#f5f5f5" textColor="dark" border />
          <ColorSwatch name="Gray 50" variable="--color-gray-50" hex="#fafafa" textColor="dark" border />
        </div>
        
        <div style={{ 
          background: 'var(--color-gray-100)', 
          padding: '16px 20px', 
          borderRadius: 'var(--border-radius-md)',
          marginTop: '24px',
          fontSize: '13px',
          lineHeight: '1.8'
        }}>
          <strong style={{ display: 'block', marginBottom: '8px' }}>Legacy Aliases (for backwards compatibility):</strong>
          <div style={{ fontFamily: "'SF Mono', 'Menlo', 'Monaco', monospace", fontSize: '12px' }}>
            <div><code>--color-gray-900</code> → <code>var(--color-dark)</code></div>
            <div><code>--color-gray-800</code> → <code>var(--color-gray-700)</code></div>
            <div><code>--color-gray-400</code> → <code>var(--color-gray-500)</code></div>
          </div>
        </div>
      </div>

      {/* Semantic Colors */}
      <div className="docs-section">
        <h2 className="docs-section-title">Semantic Colors</h2>
        <p className="docs-section-subtitle">
          Colors for success, warning, error, and informational states.
        </p>
        
        <div className="color-grid">
          <ColorSwatch name="Success" variable="--color-success" hex="#26870D" />
          <ColorSwatch name="Success Dark" variable="--color-success-dark" hex="#1e6a0a" />
          <ColorSwatch name="Warning" variable="--color-warning" hex="#f59e0b" textColor="dark" />
          <ColorSwatch name="Error" variable="--color-error" hex="#ef4444" />
          <ColorSwatch name="Error Dark" variable="--color-error-dark" hex="#dc2626" />
          <ColorSwatch name="Info" variable="--color-info" hex="#0288d1" />
        </div>
      </div>

      {/* Special Colors */}
      <div className="docs-section">
        <h2 className="docs-section-title">Special Colors</h2>
        <p className="docs-section-subtitle">
          Accent colors for specific use cases like badges, highlights, and backgrounds.
        </p>
        
        <div className="color-grid">
          <ColorSwatch name="Gold" variable="--color-gold" hex="#DBCA8B" textColor="dark" />
          <ColorSwatch name="Gold Light" variable="--color-gold-light" hex="#FEF3C7" textColor="dark" border />
          <ColorSwatch name="Gold Dark" variable="--color-gold-dark" hex="#A59143" />
          <ColorSwatch name="Cream" variable="--color-cream" hex="#F7E4CA" textColor="dark" border />
          <ColorSwatch name="Teal Light" variable="--color-teal-light" hex="#F1F7F7" textColor="dark" border />
          <ColorSwatch name="Highlight" variable="--color-highlight" hex="#fef08a" textColor="dark" border />
          <ColorSwatch name="Facebook" variable="--color-facebook" hex="#1877F2" />
        </div>
      </div>

      {/* Neutrals Aliases */}
      <div className="docs-section">
        <h2 className="docs-section-title">Neutrals Aliases</h2>
        <p className="docs-section-subtitle">
          Aliases that map to the simplified Gray Scale for backwards compatibility.
        </p>
        
        <div className="color-scale">
          <div className="color-scale-item" style={{ backgroundColor: 'var(--color-neutrals-1)', color: 'white' }}>1</div>
          <div className="color-scale-item" style={{ backgroundColor: 'var(--color-neutrals-2)', color: 'white' }}>2</div>
          <div className="color-scale-item" style={{ backgroundColor: 'var(--color-neutrals-3)', color: 'white' }}>3</div>
          <div className="color-scale-item" style={{ backgroundColor: 'var(--color-neutrals-4)', color: 'white' }}>4</div>
          <div className="color-scale-item" style={{ backgroundColor: 'var(--color-neutrals-5)', color: 'white' }}>5</div>
          <div className="color-scale-item" style={{ backgroundColor: 'var(--color-neutrals-6)', color: '#222' }}>6</div>
          <div className="color-scale-item" style={{ backgroundColor: 'var(--color-neutrals-7)', color: '#222' }}>7</div>
          <div className="color-scale-item" style={{ backgroundColor: 'var(--color-neutrals-8)', color: '#222', border: '1px solid var(--color-gray-200)' }}>8</div>
        </div>
        
        <div style={{ 
          background: 'var(--color-gray-100)', 
          padding: '16px 20px', 
          borderRadius: 'var(--border-radius-md)',
          marginTop: '16px',
          fontFamily: "'SF Mono', 'Menlo', 'Monaco', monospace",
          fontSize: '12px',
          lineHeight: '1.8'
        }}>
          <div><code>--color-neutrals-1</code> → <code>var(--color-dark)</code></div>
          <div><code>--color-neutrals-2</code> → <code>var(--color-gray-700)</code></div>
          <div><code>--color-neutrals-3</code> → <code>var(--color-gray-700)</code></div>
          <div><code>--color-neutrals-4</code> → <code>var(--color-gray-600)</code></div>
          <div><code>--color-neutrals-5</code> → <code>var(--color-gray-500)</code></div>
          <div><code>--color-neutrals-6</code> → <code>var(--color-gray-200)</code></div>
          <div><code>--color-neutrals-7</code> → <code>var(--color-gray-100)</code></div>
          <div><code>--color-neutrals-8</code> → <code>var(--color-gray-50)</code></div>
        </div>
      </div>
    </div>
  </>
);

const meta: Meta = {
  title: 'Foundation/Colors',
  component: ColorsPage,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Color System

The official Car and Driver color palette.

## Primary Colors

| Color | Variable | Hex |
|-------|----------|-----|
| Dark Grey | \`--color-dark\` | #222222 |
| Dark Blue | \`--color-blue-cobalt\` | #1B5F8A |
| Gold | \`--color-gold\` | #DBCA8B |
| Light Orange | \`--color-cream\` | #F7E4CA |
| Light Grey | \`--color-gray-100\` | #F5F5F5 |

## Secondary Colors

| Color | Variable | Hex |
|-------|----------|-----|
| Red | \`--color-red\` | #D2232A |
| Green | \`--color-success\` | #26870D |
| Dark Gold | \`--color-gold-dark\` | #A59143 |
| Light Blue | \`--color-teal-light\` | #F1F7F7 |
| White | \`--color-white\` | #FFFFFF |

## Usage

Always use CSS variables instead of hardcoded hex values:

\`\`\`css
/* ✅ Correct */
color: var(--color-blue-cobalt);
background: var(--color-gray-100);
border: 1px solid var(--color-gray-200);

/* ❌ Wrong */
color: #1B5F8A;
background: #f5f5f5;
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const AllColors: Story = {};
