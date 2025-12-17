import type { Meta, StoryObj } from '@storybook/react';

const SpacingPage = () => (
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
        
        .spacing-row {
          display: flex;
          align-items: center;
          gap: 24px;
          padding: 12px 0;
          border-bottom: 1px solid #e8e8ed;
        }
        
        .spacing-bar {
          height: 8px;
          background-color: #1d1d1f;
          flex-shrink: 0;
          min-width: 4px;
        }
        
        .spacing-info {
          min-width: 80px;
        }
        
        .spacing-name {
          font-weight: 600;
          font-size: 14px;
          color: #1d1d1f;
        }
        
        .spacing-px {
          font-size: 12px;
          color: #86868b;
          font-family: 'SF Mono', 'Menlo', 'Monaco', monospace;
        }
        
        .spacing-var {
          font-size: 12px;
          background: #f5f5f7;
          padding: 6px 12px;
          font-family: 'SF Mono', 'Menlo', 'Monaco', monospace;
          color: #1d1d1f;
        }
        
        .spacing-rem {
          font-size: 12px;
          color: #86868b;
          font-family: 'SF Mono', 'Menlo', 'Monaco', monospace;
        }
        
        .radius-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 1px;
          background: #e8e8ed;
        }
        
        .radius-item {
          text-align: center;
          background: #ffffff;
          padding: 24px 16px;
        }
        
        .radius-sample {
          width: 64px;
          height: 64px;
          background-color: #1d1d1f;
          margin: 0 auto 16px;
        }
        
        .radius-name {
          font-weight: 600;
          font-size: 13px;
          color: #1d1d1f;
          margin-bottom: 4px;
        }
        
        .radius-value {
          font-size: 12px;
          color: #86868b;
          margin-bottom: 8px;
          font-family: 'SF Mono', 'Menlo', 'Monaco', monospace;
        }
        
        .radius-var {
          font-size: 10px;
          background: #f5f5f7;
          padding: 4px 6px;
          font-family: 'SF Mono', 'Menlo', 'Monaco', monospace;
          color: #424245;
        }
        
        .shadow-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
          gap: 1px;
          background: #e8e8ed;
        }
        
        .shadow-item {
          text-align: center;
          background: #f5f5f7;
          padding: 24px 16px;
        }
        
        .shadow-sample {
          width: 100%;
          height: 64px;
          background-color: #ffffff;
          margin-bottom: 16px;
        }
        
        .shadow-name {
          font-weight: 600;
          font-size: 13px;
          color: #1d1d1f;
          margin-bottom: 8px;
        }
        
        .shadow-var {
          font-size: 10px;
          background: #ffffff;
          padding: 4px 6px;
          font-family: 'SF Mono', 'Menlo', 'Monaco', monospace;
          color: #424245;
        }
      `}
    </style>
    <div className="docs-container">
      <div className="docs-header">
        <div className="docs-eyebrow">Design Tokens</div>
        <h1>Spacing System</h1>
        <p>
          Based on a 4px grid. Use these tokens for margins, paddings, and gaps to maintain visual rhythm.
        </p>
      </div>
      
      <div className="docs-section">
        <h2 className="docs-section-title">Spacing Scale</h2>
        <p className="docs-section-subtitle">
          Consistent spacing from 0 to 96px.
        </p>
        
        <div className="spacing-row">
          <div className="spacing-bar" style={{ width: '0px' }} />
          <div className="spacing-info">
            <div className="spacing-name">spacing-0</div>
            <div className="spacing-px">0px</div>
          </div>
          <code className="spacing-var">var(--spacing-0)</code>
          <span className="spacing-rem">0</span>
        </div>
        <div className="spacing-row">
          <div className="spacing-bar" style={{ width: '4px' }} />
          <div className="spacing-info">
            <div className="spacing-name">spacing-1</div>
            <div className="spacing-px">4px</div>
          </div>
          <code className="spacing-var">var(--spacing-1)</code>
          <span className="spacing-rem">0.25rem</span>
        </div>
        <div className="spacing-row">
          <div className="spacing-bar" style={{ width: '8px' }} />
          <div className="spacing-info">
            <div className="spacing-name">spacing-2</div>
            <div className="spacing-px">8px</div>
          </div>
          <code className="spacing-var">var(--spacing-2)</code>
          <span className="spacing-rem">0.5rem</span>
        </div>
        <div className="spacing-row">
          <div className="spacing-bar" style={{ width: '12px' }} />
          <div className="spacing-info">
            <div className="spacing-name">spacing-3</div>
            <div className="spacing-px">12px</div>
          </div>
          <code className="spacing-var">var(--spacing-3)</code>
          <span className="spacing-rem">0.75rem</span>
        </div>
        <div className="spacing-row">
          <div className="spacing-bar" style={{ width: '16px' }} />
          <div className="spacing-info">
            <div className="spacing-name">spacing-4</div>
            <div className="spacing-px">16px</div>
          </div>
          <code className="spacing-var">var(--spacing-4)</code>
          <span className="spacing-rem">1rem</span>
        </div>
        <div className="spacing-row">
          <div className="spacing-bar" style={{ width: '20px' }} />
          <div className="spacing-info">
            <div className="spacing-name">spacing-5</div>
            <div className="spacing-px">20px</div>
          </div>
          <code className="spacing-var">var(--spacing-5)</code>
          <span className="spacing-rem">1.25rem</span>
        </div>
        <div className="spacing-row">
          <div className="spacing-bar" style={{ width: '24px' }} />
          <div className="spacing-info">
            <div className="spacing-name">spacing-6</div>
            <div className="spacing-px">24px</div>
          </div>
          <code className="spacing-var">var(--spacing-6)</code>
          <span className="spacing-rem">1.5rem</span>
        </div>
        <div className="spacing-row">
          <div className="spacing-bar" style={{ width: '32px' }} />
          <div className="spacing-info">
            <div className="spacing-name">spacing-8</div>
            <div className="spacing-px">32px</div>
          </div>
          <code className="spacing-var">var(--spacing-8)</code>
          <span className="spacing-rem">2rem</span>
        </div>
        <div className="spacing-row">
          <div className="spacing-bar" style={{ width: '40px' }} />
          <div className="spacing-info">
            <div className="spacing-name">spacing-10</div>
            <div className="spacing-px">40px</div>
          </div>
          <code className="spacing-var">var(--spacing-10)</code>
          <span className="spacing-rem">2.5rem</span>
        </div>
        <div className="spacing-row">
          <div className="spacing-bar" style={{ width: '48px' }} />
          <div className="spacing-info">
            <div className="spacing-name">spacing-12</div>
            <div className="spacing-px">48px</div>
          </div>
          <code className="spacing-var">var(--spacing-12)</code>
          <span className="spacing-rem">3rem</span>
        </div>
        <div className="spacing-row">
          <div className="spacing-bar" style={{ width: '64px' }} />
          <div className="spacing-info">
            <div className="spacing-name">spacing-16</div>
            <div className="spacing-px">64px</div>
          </div>
          <code className="spacing-var">var(--spacing-16)</code>
          <span className="spacing-rem">4rem</span>
        </div>
        <div className="spacing-row">
          <div className="spacing-bar" style={{ width: '80px' }} />
          <div className="spacing-info">
            <div className="spacing-name">spacing-20</div>
            <div className="spacing-px">80px</div>
          </div>
          <code className="spacing-var">var(--spacing-20)</code>
          <span className="spacing-rem">5rem</span>
        </div>
        <div className="spacing-row">
          <div className="spacing-bar" style={{ width: '96px' }} />
          <div className="spacing-info">
            <div className="spacing-name">spacing-24</div>
            <div className="spacing-px">96px</div>
          </div>
          <code className="spacing-var">var(--spacing-24)</code>
          <span className="spacing-rem">6rem</span>
        </div>
      </div>
      
      <div className="docs-section">
        <h2 className="docs-section-title">Border Radius</h2>
        <p className="docs-section-subtitle">
          Corner radius options for UI elements.
        </p>
        
        <div className="radius-grid">
          <div className="radius-item">
            <div className="radius-sample" style={{ borderRadius: '4px' }} />
            <div className="radius-name">Small</div>
            <div className="radius-value">4px</div>
            <code className="radius-var">--border-radius-sm</code>
          </div>
          <div className="radius-item">
            <div className="radius-sample" style={{ borderRadius: '8px' }} />
            <div className="radius-name">Medium</div>
            <div className="radius-value">8px</div>
            <code className="radius-var">--border-radius-md</code>
          </div>
          <div className="radius-item">
            <div className="radius-sample" style={{ borderRadius: '12px' }} />
            <div className="radius-name">Large</div>
            <div className="radius-value">12px</div>
            <code className="radius-var">--border-radius-lg</code>
          </div>
          <div className="radius-item">
            <div className="radius-sample" style={{ borderRadius: '16px' }} />
            <div className="radius-name">XL</div>
            <div className="radius-value">16px</div>
            <code className="radius-var">--border-radius-xl</code>
          </div>
          <div className="radius-item">
            <div className="radius-sample" style={{ borderRadius: '9999px' }} />
            <div className="radius-name">Full</div>
            <div className="radius-value">9999px</div>
            <code className="radius-var">--border-radius-full</code>
          </div>
        </div>
      </div>

      <div className="docs-section">
        <h2 className="docs-section-title">Shadows</h2>
        <p className="docs-section-subtitle">
          Elevation levels for depth and hierarchy.
        </p>
        
        <div className="shadow-grid">
          <div className="shadow-item">
            <div className="shadow-sample" style={{ boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)' }} />
            <div className="shadow-name">Small</div>
            <code className="shadow-var">--shadow-sm</code>
          </div>
          <div className="shadow-item">
            <div className="shadow-sample" style={{ boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)' }} />
            <div className="shadow-name">Default</div>
            <code className="shadow-var">--shadow</code>
          </div>
          <div className="shadow-item">
            <div className="shadow-sample" style={{ boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
            <div className="shadow-name">Medium</div>
            <code className="shadow-var">--shadow-md</code>
          </div>
          <div className="shadow-item">
            <div className="shadow-sample" style={{ boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
            <div className="shadow-name">Large</div>
            <code className="shadow-var">--shadow-lg</code>
          </div>
          <div className="shadow-item">
            <div className="shadow-sample" style={{ boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }} />
            <div className="shadow-name">XL</div>
            <code className="shadow-var">--shadow-xl</code>
          </div>
        </div>
      </div>
    </div>
  </>
);

const meta: Meta = {
  title: 'Tokens/Spacing',
  component: SpacingPage,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Spacing scale, border radius, and shadow tokens.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const AllSpacing: Story = {
  name: 'All Spacing',
};
