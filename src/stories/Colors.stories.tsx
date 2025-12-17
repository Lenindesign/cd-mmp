import type { Meta, StoryObj } from '@storybook/react';

const ColorsPage = () => (
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
        
        .color-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 24px;
        }
        
        .color-swatch {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }
        
        .color-circle {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        
        .color-circle span {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          margin-bottom: 4px;
        }
        
        .color-circle code {
          font-size: 11px;
          font-family: 'SF Mono', 'Menlo', 'Monaco', monospace;
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
      
      <div className="docs-section">
        <h2 className="docs-section-title">Primary Colors</h2>
        <p className="docs-section-subtitle">
          Core brand colors used throughout the interface.
        </p>
        
        <div className="color-grid">
          <div className="color-swatch">
            <div className="color-circle" style={{ backgroundColor: '#222222', color: '#ffffff' }}>
              <span>Dark Grey</span>
              <code>#222222</code>
            </div>
          </div>
          <div className="color-swatch">
            <div className="color-circle" style={{ backgroundColor: '#1B5F8A', color: '#ffffff' }}>
              <span>Dark Blue</span>
              <code>#1B5F8A</code>
            </div>
          </div>
          <div className="color-swatch">
            <div className="color-circle" style={{ backgroundColor: '#DBCA8B', color: '#222222' }}>
              <span>Gold</span>
              <code>#DBCA8B</code>
            </div>
          </div>
          <div className="color-swatch">
            <div className="color-circle" style={{ backgroundColor: '#F7E4CA', color: '#222222' }}>
              <span>Light Orange</span>
              <code>#F7E4CA</code>
            </div>
          </div>
          <div className="color-swatch">
            <div className="color-circle" style={{ backgroundColor: '#F5F5F5', color: '#222222', border: '1px solid #d2d2d7' }}>
              <span>Light Grey</span>
              <code>#F5F5F5</code>
            </div>
          </div>
        </div>
      </div>
      
      <div className="docs-section">
        <h2 className="docs-section-title">Secondary Colors</h2>
        <p className="docs-section-subtitle">
          Supporting colors for status, alerts, and accents.
        </p>
        
        <div className="color-grid">
          <div className="color-swatch">
            <div className="color-circle" style={{ backgroundColor: '#D2232A', color: '#ffffff' }}>
              <span>Red</span>
              <code>#D2232A</code>
            </div>
          </div>
          <div className="color-swatch">
            <div className="color-circle" style={{ backgroundColor: '#26870D', color: '#ffffff' }}>
              <span>Green</span>
              <code>#26870D</code>
            </div>
          </div>
          <div className="color-swatch">
            <div className="color-circle" style={{ backgroundColor: '#A59143', color: '#ffffff' }}>
              <span>Dark Gold</span>
              <code>#A59143</code>
            </div>
          </div>
          <div className="color-swatch">
            <div className="color-circle" style={{ backgroundColor: '#F1F7F7', color: '#222222', border: '1px solid #d2d2d7' }}>
              <span>Light Blue</span>
              <code>#F1F7F7</code>
            </div>
          </div>
          <div className="color-swatch">
            <div className="color-circle" style={{ backgroundColor: '#FFFFFF', color: '#222222', border: '1px solid #d2d2d7' }}>
              <span>White</span>
              <code>#FFFFFF</code>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
);

const meta: Meta = {
  title: 'Tokens/Colors',
  component: ColorsPage,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Complete color palette for the Car and Driver design system.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const AllColors: Story = {};
