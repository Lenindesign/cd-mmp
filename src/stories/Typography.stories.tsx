import type { Meta, StoryObj } from '@storybook/react';

const TypographyPage = () => (
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
        
        .type-row {
          padding: 24px 0;
          border-bottom: 1px solid #e8e8ed;
        }
        
        .type-meta {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 12px;
          gap: 24px;
        }
        
        .type-name {
          font-size: 14px;
          font-weight: 600;
          color: #1d1d1f;
          margin-bottom: 4px;
        }
        
        .type-specs {
          font-size: 12px;
          color: #86868b;
          font-family: 'SF Mono', 'Menlo', 'Monaco', monospace;
        }
        
        .type-sample {
          color: #1d1d1f;
          line-height: 1.2;
        }
        
        .font-box {
          background: #f5f5f7;
          padding: 24px;
          margin-bottom: 48px;
        }
        
        .font-box h3 {
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #86868b;
          margin: 0 0 20px 0;
        }
        
        .font-item {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 12px;
        }
        
        .font-item:last-child {
          margin-bottom: 0;
        }
        
        .font-item code {
          background: #ffffff;
          padding: 6px 12px;
          font-size: 12px;
          font-family: 'SF Mono', 'Menlo', 'Monaco', monospace;
          color: #1d1d1f;
          min-width: 140px;
        }
        
        .font-item span {
          font-size: 14px;
          color: #424245;
        }
        
        .weight-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 1px;
          background: #e8e8ed;
        }
        
        .weight-item {
          padding: 24px 16px;
          background: #ffffff;
          text-align: center;
        }
        
        .weight-sample {
          font-family: var(--font-heading);
          font-size: 32px;
          margin-bottom: 12px;
          color: #1d1d1f;
        }
        
        .weight-name {
          font-weight: 600;
          font-size: 13px;
          color: #1d1d1f;
          margin-bottom: 4px;
        }
        
        .weight-value {
          font-size: 12px;
          color: #86868b;
          margin-bottom: 8px;
        }
        
        .weight-var {
          font-size: 10px;
          background: #f5f5f7;
          padding: 4px 6px;
          font-family: 'SF Mono', 'Menlo', 'Monaco', monospace;
          color: #424245;
        }
        
        .size-row {
          display: flex;
          align-items: center;
          gap: 24px;
          padding: 12px 0;
          border-bottom: 1px solid #e8e8ed;
        }
        
        .size-row code {
          font-size: 12px;
          background: #f5f5f7;
          padding: 6px 12px;
          font-family: 'SF Mono', 'Menlo', 'Monaco', monospace;
          color: #1d1d1f;
          min-width: 140px;
        }
        
        .size-row .size-px {
          font-size: 12px;
          color: #86868b;
          min-width: 48px;
          font-family: 'SF Mono', 'Menlo', 'Monaco', monospace;
        }
        
        .size-row .size-sample {
          font-family: var(--font-body);
          color: #1d1d1f;
        }
      `}
    </style>
    <div className="docs-container">
      <div className="docs-header">
        <div className="docs-eyebrow">Design Tokens</div>
        <h1>Typography System</h1>
        <p>
          A clear typographic hierarchy guides users through content with purpose and clarity.
        </p>
      </div>
      
      <div className="docs-section">
        <div className="font-box">
          <h3>Font Families</h3>
          <div className="font-item">
            <code>--font-display</code>
            <span>Inter - Display</span>
          </div>
          <div className="font-item">
            <code>--font-heading</code>
            <span>Inter - Headings</span>
          </div>
          <div className="font-item">
            <code>--font-body</code>
            <span>Inter - Body</span>
          </div>
          <div className="font-item">
            <code>--font-article</code>
            <span>Libre Baskerville - Articles</span>
          </div>
        </div>
      </div>

      <div className="docs-section">
        <h2 className="docs-section-title">Display and Headings</h2>
        <p className="docs-section-subtitle">
          Large text styles for headlines and section titles.
        </p>
        
        <div className="type-row">
          <div className="type-meta">
            <div>
              <div className="type-name">Display XL</div>
              <div className="type-specs">48px / Inter / 800</div>
            </div>
          </div>
          <div className="type-sample" style={{ fontFamily: 'var(--font-display)', fontSize: '48px', fontWeight: 800 }}>
            The quick brown fox
          </div>
        </div>
        
        <div className="type-row">
          <div className="type-meta">
            <div>
              <div className="type-name">Display Large</div>
              <div className="type-specs">36px / Inter / 700</div>
            </div>
          </div>
          <div className="type-sample" style={{ fontFamily: 'var(--font-display)', fontSize: '36px', fontWeight: 700 }}>
            The quick brown fox
          </div>
        </div>
        
        <div className="type-row">
          <div className="type-meta">
            <div>
              <div className="type-name">Heading 1</div>
              <div className="type-specs">32px / Inter / 700</div>
            </div>
          </div>
          <div className="type-sample" style={{ fontFamily: 'var(--font-heading)', fontSize: '32px', fontWeight: 700 }}>
            The quick brown fox
          </div>
        </div>
        
        <div className="type-row">
          <div className="type-meta">
            <div>
              <div className="type-name">Heading 2</div>
              <div className="type-specs">24px / Inter / 700</div>
            </div>
          </div>
          <div className="type-sample" style={{ fontFamily: 'var(--font-heading)', fontSize: '24px', fontWeight: 700 }}>
            The quick brown fox
          </div>
        </div>
        
        <div className="type-row">
          <div className="type-meta">
            <div>
              <div className="type-name">Heading 3</div>
              <div className="type-specs">20px / Inter / 600</div>
            </div>
          </div>
          <div className="type-sample" style={{ fontFamily: 'var(--font-heading)', fontSize: '20px', fontWeight: 600 }}>
            The quick brown fox
          </div>
        </div>
      </div>

      <div className="docs-section">
        <h2 className="docs-section-title">Body Text</h2>
        <p className="docs-section-subtitle">
          Text styles for paragraphs and general content.
        </p>
        
        <div className="type-row">
          <div className="type-meta">
            <div>
              <div className="type-name">Body Large</div>
              <div className="type-specs">18px / Inter / 400</div>
            </div>
          </div>
          <div className="type-sample" style={{ fontFamily: 'var(--font-body)', fontSize: '18px', fontWeight: 400 }}>
            The quick brown fox jumps over the lazy dog.
          </div>
        </div>
        
        <div className="type-row">
          <div className="type-meta">
            <div>
              <div className="type-name">Body Default</div>
              <div className="type-specs">16px / Inter / 400</div>
            </div>
          </div>
          <div className="type-sample" style={{ fontFamily: 'var(--font-body)', fontSize: '16px', fontWeight: 400 }}>
            The quick brown fox jumps over the lazy dog.
          </div>
        </div>
        
        <div className="type-row">
          <div className="type-meta">
            <div>
              <div className="type-name">Body Small</div>
              <div className="type-specs">14px / Inter / 400</div>
            </div>
          </div>
          <div className="type-sample" style={{ fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: 400 }}>
            The quick brown fox jumps over the lazy dog.
          </div>
        </div>
        
        <div className="type-row">
          <div className="type-meta">
            <div>
              <div className="type-name">Caption</div>
              <div className="type-specs">12px / Inter / 400</div>
            </div>
          </div>
          <div className="type-sample" style={{ fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 400 }}>
            The quick brown fox jumps over the lazy dog.
          </div>
        </div>
      </div>

      <div className="docs-section">
        <h2 className="docs-section-title">Font Weights</h2>
        <p className="docs-section-subtitle">
          Available weight variations.
        </p>
        
        <div className="weight-grid">
          <div className="weight-item">
            <div className="weight-sample" style={{ fontWeight: 400 }}>Aa</div>
            <div className="weight-name">Regular</div>
            <div className="weight-value">400</div>
            <code className="weight-var">--font-weight-regular</code>
          </div>
          <div className="weight-item">
            <div className="weight-sample" style={{ fontWeight: 500 }}>Aa</div>
            <div className="weight-name">Medium</div>
            <div className="weight-value">500</div>
            <code className="weight-var">--font-weight-medium</code>
          </div>
          <div className="weight-item">
            <div className="weight-sample" style={{ fontWeight: 600 }}>Aa</div>
            <div className="weight-name">SemiBold</div>
            <div className="weight-value">600</div>
            <code className="weight-var">--font-weight-semibold</code>
          </div>
          <div className="weight-item">
            <div className="weight-sample" style={{ fontWeight: 700 }}>Aa</div>
            <div className="weight-name">Bold</div>
            <div className="weight-value">700</div>
            <code className="weight-var">--font-weight-bold</code>
          </div>
          <div className="weight-item">
            <div className="weight-sample" style={{ fontWeight: 800 }}>Aa</div>
            <div className="weight-name">ExtraBold</div>
            <div className="weight-value">800</div>
            <code className="weight-var">--font-weight-extrabold</code>
          </div>
        </div>
      </div>

      <div className="docs-section">
        <h2 className="docs-section-title">Font Sizes</h2>
        <p className="docs-section-subtitle">
          Complete size scale from 12px to 40px.
        </p>
        
        <div className="size-row">
          <code>--font-size-xs</code>
          <span className="size-px">12px</span>
          <span className="size-sample" style={{ fontSize: '12px' }}>Sample</span>
        </div>
        <div className="size-row">
          <code>--font-size-sm</code>
          <span className="size-px">14px</span>
          <span className="size-sample" style={{ fontSize: '14px' }}>Sample</span>
        </div>
        <div className="size-row">
          <code>--font-size-base</code>
          <span className="size-px">16px</span>
          <span className="size-sample" style={{ fontSize: '16px' }}>Sample</span>
        </div>
        <div className="size-row">
          <code>--font-size-lg</code>
          <span className="size-px">18px</span>
          <span className="size-sample" style={{ fontSize: '18px' }}>Sample</span>
        </div>
        <div className="size-row">
          <code>--font-size-xl</code>
          <span className="size-px">20px</span>
          <span className="size-sample" style={{ fontSize: '20px' }}>Sample</span>
        </div>
        <div className="size-row">
          <code>--font-size-2xl</code>
          <span className="size-px">24px</span>
          <span className="size-sample" style={{ fontSize: '24px' }}>Sample</span>
        </div>
        <div className="size-row">
          <code>--font-size-3xl</code>
          <span className="size-px">32px</span>
          <span className="size-sample" style={{ fontSize: '32px' }}>Sample</span>
        </div>
        <div className="size-row">
          <code>--font-size-4xl</code>
          <span className="size-px">40px</span>
          <span className="size-sample" style={{ fontSize: '40px' }}>Sample</span>
        </div>
      </div>
    </div>
  </>
);

const meta: Meta = {
  title: 'Tokens/Typography',
  component: TypographyPage,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Typography scale and text styles for the Car and Driver design system.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const AllStyles: Story = {
  name: 'All Styles',
};
