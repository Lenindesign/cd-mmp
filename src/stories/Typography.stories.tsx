import type { Meta, StoryObj } from '@storybook/react';

const TypographyPage = () => (
  <>
    <style>
      {`
        .docs-container {
          max-width: 720px;
          margin: 0 auto;
          font-family: var(--font-body);
          color: var(--color-dark);
          -webkit-font-smoothing: antialiased;
          padding: 0 24px;
        }
        
        .docs-header {
          padding: 80px 0 64px;
          border-bottom: 1px solid var(--color-border);
          margin-bottom: 64px;
        }
        
        .docs-eyebrow {
          font-size: var(--font-size-sm);
          font-weight: var(--font-weight-semibold);
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--color-text-secondary);
          margin-bottom: 16px;
        }
        
        .docs-header h1 {
          font-family: var(--font-display);
          font-size: var(--font-size-4xl);
          font-weight: var(--font-weight-semibold);
          letter-spacing: -0.02em;
          line-height: 1.1;
          margin: 0 0 24px 0;
          color: var(--color-dark);
        }
        
        .docs-header p {
          font-size: var(--font-size-xl);
          font-weight: var(--font-weight-regular);
          line-height: 1.5;
          color: var(--color-text-secondary);
          margin: 0;
          max-width: 560px;
        }
        
        .docs-section {
          margin-bottom: 80px;
        }
        
        .docs-section-title {
          font-family: var(--font-display);
          font-size: var(--font-size-28);
          font-weight: var(--font-weight-semibold);
          letter-spacing: -0.015em;
          color: var(--color-dark);
          margin: 0 0 12px 0;
        }
        
        .docs-section-subtitle {
          font-size: var(--font-size-17);
          color: var(--color-text-secondary);
          margin: 0 0 40px 0;
          line-height: 1.5;
        }
        
        .type-row {
          padding: 24px 0;
          border-bottom: 1px solid var(--color-border);
        }
        
        .type-meta {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 12px;
          gap: 24px;
        }
        
        .type-name {
          font-size: var(--font-size-base);
          font-weight: var(--font-weight-semibold);
          color: var(--color-dark);
          margin-bottom: 4px;
        }
        
        .type-specs {
          font-size: var(--font-size-sm);
          color: var(--color-text-secondary);
          font-family: 'SF Mono', 'Menlo', 'Monaco', monospace;
        }
        
        .type-sample {
          color: var(--color-dark);
          line-height: 1.2;
        }
        
        .font-showcase {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
          margin-bottom: 48px;
        }
        
        .font-showcase-item {
          background: var(--color-white);
          border: 1px solid var(--color-border);
          border-radius: var(--border-radius-lg);
          padding: 32px;
        }
        
        .font-showcase-name {
          font-size: var(--font-size-4xl);
          font-weight: var(--font-weight-bold);
          color: var(--color-dark);
          margin-bottom: 24px;
        }
        
        .font-showcase-sample {
          font-size: var(--font-size-lg);
          line-height: 1.8;
          color: var(--color-dark);
          margin-bottom: 24px;
          padding-bottom: 24px;
          border-bottom: 1px solid var(--color-border);
        }
        
        .font-showcase-desc {
          font-size: var(--font-size-base);
          color: var(--color-text-secondary);
          line-height: 1.6;
        }
        
        .font-showcase-desc strong {
          color: var(--color-dark);
        }
        
        .font-box {
          background: var(--color-bg-secondary);
          padding: 24px;
          margin-bottom: 48px;
          border-radius: var(--border-radius-md);
        }
        
        .font-box h3 {
          font-size: var(--font-size-sm);
          font-weight: var(--font-weight-semibold);
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--color-text-secondary);
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
          background: var(--color-white);
          padding: 6px 12px;
          font-size: var(--font-size-sm);
          font-family: 'SF Mono', 'Menlo', 'Monaco', monospace;
          color: var(--color-dark);
          min-width: 140px;
          border-radius: var(--border-radius-sm);
        }
        
        .font-item span {
          font-size: var(--font-size-sm);
          color: var(--color-text-secondary);
          font-family: 'SF Mono', 'Menlo', 'Monaco', monospace;
        }
        
        .font-preview {
          flex: 1;
          text-align: right;
          color: var(--color-dark);
        }
        
        .weight-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 1px;
          background: var(--color-border);
          border-radius: var(--border-radius-md);
          overflow: hidden;
        }
        
        .weight-item {
          padding: 24px 16px;
          background: var(--color-white);
          text-align: center;
        }
        
        .weight-sample {
          font-family: var(--font-heading);
          font-size: var(--font-size-3xl);
          margin-bottom: 12px;
          color: var(--color-dark);
        }
        
        .weight-name {
          font-weight: var(--font-weight-semibold);
          font-size: var(--font-size-13);
          color: var(--color-dark);
          margin-bottom: 4px;
        }
        
        .weight-value {
          font-size: var(--font-size-sm);
          color: var(--color-text-secondary);
          margin-bottom: 8px;
        }
        
        .weight-var {
          font-size: 10px;
          background: var(--color-bg-secondary);
          padding: 4px 6px;
          font-family: 'SF Mono', 'Menlo', 'Monaco', monospace;
          color: var(--color-text-secondary);
          border-radius: var(--border-radius-sm);
        }
        
        .size-row {
          display: flex;
          align-items: center;
          gap: 24px;
          padding: 12px 0;
          border-bottom: 1px solid var(--color-border);
        }
        
        .size-row code {
          font-size: var(--font-size-sm);
          background: var(--color-bg-secondary);
          padding: 6px 12px;
          font-family: 'SF Mono', 'Menlo', 'Monaco', monospace;
          color: var(--color-dark);
          min-width: 160px;
          border-radius: var(--border-radius-sm);
        }
        
        .size-row .size-px {
          font-size: var(--font-size-sm);
          color: var(--color-text-secondary);
          min-width: 48px;
          font-family: 'SF Mono', 'Menlo', 'Monaco', monospace;
        }
        
        .size-row .size-sample {
          font-family: var(--font-body);
          color: var(--color-dark);
        }
        
        .size-section-label {
          font-size: var(--font-size-xs);
          font-weight: var(--font-weight-semibold);
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--color-text-secondary);
          padding: 24px 0 12px;
          border-bottom: 2px solid var(--color-dark);
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
        <h2 className="docs-section-title">Primary Fonts</h2>
        <p className="docs-section-subtitle">
          Our design system uses two typefaces: Inter for UI and Lora for editorial content.
        </p>
        
        <div className="font-showcase">
          <div className="font-showcase-item">
            <div className="font-showcase-name" style={{ fontFamily: "'Inter', sans-serif" }}>Inter</div>
            <div className="font-showcase-sample" style={{ fontFamily: "'Inter', sans-serif" }}>
              ABCDEFGHIJKLMNOPQRSTUVWXYZ<br/>
              abcdefghijklmnopqrstuvwxyz<br/>
              0123456789
            </div>
            <div className="font-showcase-desc">
              <strong>Sans-serif</strong> — Used for display headlines, headings, body text, and all UI elements.
              Clean, modern, and highly legible at all sizes.
            </div>
          </div>
          
          <div className="font-showcase-item">
            <div className="font-showcase-name" style={{ fontFamily: "'Lora', serif" }}>Lora</div>
            <div className="font-showcase-sample" style={{ fontFamily: "'Lora', serif" }}>
              ABCDEFGHIJKLMNOPQRSTUVWXYZ<br/>
              abcdefghijklmnopqrstuvwxyz<br/>
              0123456789
            </div>
            <div className="font-showcase-desc">
              <strong>Serif</strong> — Used for editorial content, article text, and "C/D Says" sections.
              Adds a premium, editorial feel to long-form content.
            </div>
          </div>
        </div>
        
        <div className="font-box">
          <h3>Base Font Stacks</h3>
          <div className="font-item">
            <code>--font-sans</code>
            <span>'Inter', -apple-system, BlinkMacSystemFont, sans-serif</span>
          </div>
          <div className="font-item">
            <code>--font-serif</code>
            <span>'Lora', Georgia, serif</span>
          </div>
        </div>
        
        <div className="font-box">
          <h3>Semantic Aliases</h3>
          <div className="font-item">
            <code>--font-display</code>
            <span>var(--font-sans)</span>
          </div>
          <div className="font-item">
            <code>--font-heading</code>
            <span>var(--font-sans)</span>
          </div>
          <div className="font-item">
            <code>--font-body</code>
            <span>var(--font-sans)</span>
          </div>
          <div className="font-item">
            <code>--font-article</code>
            <span>var(--font-serif)</span>
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
              <div className="type-specs">var(--font-size-4xl) · 48px / Inter / 800</div>
            </div>
          </div>
          <div className="type-sample" style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--font-size-4xl)', fontWeight: 'var(--font-weight-extrabold)' }}>
            The quick brown fox
          </div>
        </div>
        
        <div className="type-row">
          <div className="type-meta">
            <div>
              <div className="type-name">Display Large</div>
              <div className="type-specs">var(--font-size-36) · 36px / Inter / 700</div>
            </div>
          </div>
          <div className="type-sample" style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--font-size-36)', fontWeight: 'var(--font-weight-bold)' }}>
            The quick brown fox
          </div>
        </div>
        
        <div className="type-row">
          <div className="type-meta">
            <div>
              <div className="type-name">Heading 1</div>
              <div className="type-specs">var(--font-size-3xl) · 32px / Inter / 700</div>
            </div>
          </div>
          <div className="type-sample" style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--font-size-3xl)', fontWeight: 'var(--font-weight-bold)' }}>
            The quick brown fox
          </div>
        </div>
        
        <div className="type-row">
          <div className="type-meta">
            <div>
              <div className="type-name">Heading 2</div>
              <div className="type-specs">var(--font-size-2xl) · 24px / Inter / 700</div>
            </div>
          </div>
          <div className="type-sample" style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--font-size-2xl)', fontWeight: 'var(--font-weight-bold)' }}>
            The quick brown fox
          </div>
        </div>
        
        <div className="type-row">
          <div className="type-meta">
            <div>
              <div className="type-name">Heading 3</div>
              <div className="type-specs">var(--font-size-xl) · 20px / Inter / 600</div>
            </div>
          </div>
          <div className="type-sample" style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--font-size-xl)', fontWeight: 'var(--font-weight-semibold)' }}>
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
              <div className="type-specs">var(--font-size-lg) · 18px / Inter / 400</div>
            </div>
          </div>
          <div className="type-sample" style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-lg)', fontWeight: 'var(--font-weight-regular)' }}>
            The quick brown fox jumps over the lazy dog.
          </div>
        </div>
        
        <div className="type-row">
          <div className="type-meta">
            <div>
              <div className="type-name">Body Default</div>
              <div className="type-specs">var(--font-size-md) · 16px / Inter / 400</div>
            </div>
          </div>
          <div className="type-sample" style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-md)', fontWeight: 'var(--font-weight-regular)' }}>
            The quick brown fox jumps over the lazy dog.
          </div>
        </div>
        
        <div className="type-row">
          <div className="type-meta">
            <div>
              <div className="type-name">Body Small</div>
              <div className="type-specs">var(--font-size-base) · 14px / Inter / 400</div>
            </div>
          </div>
          <div className="type-sample" style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-base)', fontWeight: 'var(--font-weight-regular)' }}>
            The quick brown fox jumps over the lazy dog.
          </div>
        </div>
        
        <div className="type-row">
          <div className="type-meta">
            <div>
              <div className="type-name">Caption</div>
              <div className="type-specs">var(--font-size-sm) · 12px / Inter / 400</div>
            </div>
          </div>
          <div className="type-sample" style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-regular)' }}>
            The quick brown fox jumps over the lazy dog.
          </div>
        </div>
      </div>

      <div className="docs-section">
        <h2 className="docs-section-title">Article Text (Serif)</h2>
        <p className="docs-section-subtitle">
          Serif text styles using Lora for long-form content and editorial.
        </p>
        
        <div className="type-row">
          <div className="type-meta">
            <div>
              <div className="type-name">Article Large</div>
              <div className="type-specs">var(--font-size-lg) · 18px / Lora / 400</div>
            </div>
          </div>
          <div className="type-sample" style={{ fontFamily: 'var(--font-article)', fontSize: 'var(--font-size-lg)', fontWeight: 'var(--font-weight-regular)' }}>
            The quick brown fox jumps over the lazy dog.
          </div>
        </div>
        
        <div className="type-row">
          <div className="type-meta">
            <div>
              <div className="type-name">Article Default</div>
              <div className="type-specs">var(--font-size-md) · 16px / Lora / 400</div>
            </div>
          </div>
          <div className="type-sample" style={{ fontFamily: 'var(--font-article)', fontSize: 'var(--font-size-md)', fontWeight: 'var(--font-weight-regular)' }}>
            The quick brown fox jumps over the lazy dog.
          </div>
        </div>
        
        <div className="type-row">
          <div className="type-meta">
            <div>
              <div className="type-name">Article Small</div>
              <div className="type-specs">var(--font-size-base) · 14px / Lora / 400</div>
            </div>
          </div>
          <div className="type-sample" style={{ fontFamily: 'var(--font-article)', fontSize: 'var(--font-size-base)', fontWeight: 'var(--font-weight-regular)' }}>
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
            <div className="weight-sample" style={{ fontWeight: 'var(--font-weight-regular)' }}>Aa</div>
            <div className="weight-name">Regular</div>
            <div className="weight-value">400</div>
            <code className="weight-var">--font-weight-regular</code>
          </div>
          <div className="weight-item">
            <div className="weight-sample" style={{ fontWeight: 'var(--font-weight-medium)' }}>Aa</div>
            <div className="weight-name">Medium</div>
            <div className="weight-value">500</div>
            <code className="weight-var">--font-weight-medium</code>
          </div>
          <div className="weight-item">
            <div className="weight-sample" style={{ fontWeight: 'var(--font-weight-semibold)' }}>Aa</div>
            <div className="weight-name">SemiBold</div>
            <div className="weight-value">600</div>
            <code className="weight-var">--font-weight-semibold</code>
          </div>
          <div className="weight-item">
            <div className="weight-sample" style={{ fontWeight: 'var(--font-weight-bold)' }}>Aa</div>
            <div className="weight-name">Bold</div>
            <div className="weight-value">700</div>
            <code className="weight-var">--font-weight-bold</code>
          </div>
          <div className="weight-item">
            <div className="weight-sample" style={{ fontWeight: 'var(--font-weight-extrabold)' }}>Aa</div>
            <div className="weight-name">ExtraBold</div>
            <div className="weight-value">800</div>
            <code className="weight-var">--font-weight-extrabold</code>
          </div>
        </div>
      </div>

      <div className="docs-section">
        <h2 className="docs-section-title">Font Size Scale</h2>
        <p className="docs-section-subtitle">
          Complete size scale from 8px to 120px.
        </p>
        
        <div className="size-section-label">Extra Small Sizes</div>
        <div className="size-row">
          <code>--font-size-2xs</code>
          <span className="size-px">8px</span>
          <span className="size-sample" style={{ fontSize: 'var(--font-size-2xs)' }}>Sample Text</span>
        </div>
        <div className="size-row">
          <code>--font-size-xs</code>
          <span className="size-px">11px</span>
          <span className="size-sample" style={{ fontSize: 'var(--font-size-xs)' }}>Sample Text</span>
        </div>
        <div className="size-row">
          <code>--font-size-sm</code>
          <span className="size-px">12px</span>
          <span className="size-sample" style={{ fontSize: 'var(--font-size-sm)' }}>Sample Text</span>
        </div>
        <div className="size-row">
          <code>--font-size-13</code>
          <span className="size-px">13px</span>
          <span className="size-sample" style={{ fontSize: 'var(--font-size-13)' }}>Sample Text</span>
        </div>
        
        <div className="size-section-label">Base Sizes</div>
        <div className="size-row">
          <code>--font-size-base</code>
          <span className="size-px">14px</span>
          <span className="size-sample" style={{ fontSize: 'var(--font-size-base)' }}>Sample Text</span>
        </div>
        <div className="size-row">
          <code>--font-size-15</code>
          <span className="size-px">15px</span>
          <span className="size-sample" style={{ fontSize: 'var(--font-size-15)' }}>Sample Text</span>
        </div>
        <div className="size-row">
          <code>--font-size-md</code>
          <span className="size-px">16px</span>
          <span className="size-sample" style={{ fontSize: 'var(--font-size-md)' }}>Sample Text</span>
        </div>
        <div className="size-row">
          <code>--font-size-17</code>
          <span className="size-px">17px</span>
          <span className="size-sample" style={{ fontSize: 'var(--font-size-17)' }}>Sample Text</span>
        </div>
        <div className="size-row">
          <code>--font-size-lg</code>
          <span className="size-px">18px</span>
          <span className="size-sample" style={{ fontSize: 'var(--font-size-lg)' }}>Sample Text</span>
        </div>
        
        <div className="size-section-label">Heading Sizes</div>
        <div className="size-row">
          <code>--font-size-xl</code>
          <span className="size-px">20px</span>
          <span className="size-sample" style={{ fontSize: 'var(--font-size-xl)' }}>Sample Text</span>
        </div>
        <div className="size-row">
          <code>--font-size-22</code>
          <span className="size-px">22px</span>
          <span className="size-sample" style={{ fontSize: 'var(--font-size-22)' }}>Sample Text</span>
        </div>
        <div className="size-row">
          <code>--font-size-2xl</code>
          <span className="size-px">24px</span>
          <span className="size-sample" style={{ fontSize: 'var(--font-size-2xl)' }}>Sample Text</span>
        </div>
        <div className="size-row">
          <code>--font-size-28</code>
          <span className="size-px">28px</span>
          <span className="size-sample" style={{ fontSize: 'var(--font-size-28)' }}>Sample Text</span>
        </div>
        <div className="size-row">
          <code>--font-size-3xl</code>
          <span className="size-px">32px</span>
          <span className="size-sample" style={{ fontSize: 'var(--font-size-3xl)' }}>Sample Text</span>
        </div>
        
        <div className="size-section-label">Display Sizes</div>
        <div className="size-row">
          <code>--font-size-36</code>
          <span className="size-px">36px</span>
          <span className="size-sample" style={{ fontSize: 'var(--font-size-36)' }}>Sample</span>
        </div>
        <div className="size-row">
          <code>--font-size-40</code>
          <span className="size-px">40px</span>
          <span className="size-sample" style={{ fontSize: 'var(--font-size-40)' }}>Sample</span>
        </div>
        <div className="size-row">
          <code>--font-size-4xl</code>
          <span className="size-px">48px</span>
          <span className="size-sample" style={{ fontSize: 'var(--font-size-4xl)' }}>Sample</span>
        </div>
        <div className="size-row">
          <code>--font-size-5xl</code>
          <span className="size-px">64px</span>
          <span className="size-sample" style={{ fontSize: 'var(--font-size-5xl)' }}>Sample</span>
        </div>
        <div className="size-row">
          <code>--font-size-80</code>
          <span className="size-px">80px</span>
          <span className="size-sample" style={{ fontSize: 'var(--font-size-80)' }}>Aa</span>
        </div>
        <div className="size-row">
          <code>--font-size-6xl</code>
          <span className="size-px">90px</span>
          <span className="size-sample" style={{ fontSize: 'var(--font-size-6xl)' }}>Aa</span>
        </div>
        <div className="size-row">
          <code>--font-size-7xl</code>
          <span className="size-px">120px</span>
          <span className="size-sample" style={{ fontSize: 'var(--font-size-7xl)' }}>Aa</span>
        </div>
      </div>

      <div className="docs-section">
        <h2 className="docs-section-title">Semantic Size Aliases</h2>
        <p className="docs-section-subtitle">
          Named aliases for common use cases.
        </p>
        
        <div className="size-row">
          <code>--font-size-caption</code>
          <span className="size-px">11px</span>
          <span className="size-sample" style={{ fontSize: 'var(--font-size-caption)' }}>Caption text</span>
        </div>
        <div className="size-row">
          <code>--font-size-body</code>
          <span className="size-px">14px</span>
          <span className="size-sample" style={{ fontSize: 'var(--font-size-body)' }}>Body text</span>
        </div>
        <div className="size-row">
          <code>--font-size-body-lg</code>
          <span className="size-px">16px</span>
          <span className="size-sample" style={{ fontSize: 'var(--font-size-body-lg)' }}>Large body text</span>
        </div>
        <div className="size-row">
          <code>--font-size-heading-sm</code>
          <span className="size-px">18px</span>
          <span className="size-sample" style={{ fontSize: 'var(--font-size-heading-sm)', fontWeight: 'var(--font-weight-semibold)' }}>Small heading</span>
        </div>
        <div className="size-row">
          <code>--font-size-heading</code>
          <span className="size-px">24px</span>
          <span className="size-sample" style={{ fontSize: 'var(--font-size-heading)', fontWeight: 'var(--font-weight-bold)' }}>Heading</span>
        </div>
        <div className="size-row">
          <code>--font-size-heading-lg</code>
          <span className="size-px">32px</span>
          <span className="size-sample" style={{ fontSize: 'var(--font-size-heading-lg)', fontWeight: 'var(--font-weight-bold)' }}>Large heading</span>
        </div>
        <div className="size-row">
          <code>--font-size-display</code>
          <span className="size-px">48px</span>
          <span className="size-sample" style={{ fontSize: 'var(--font-size-display)', fontWeight: 'var(--font-weight-extrabold)' }}>Display</span>
        </div>
        <div className="size-row">
          <code>--font-size-display-lg</code>
          <span className="size-px">64px</span>
          <span className="size-sample" style={{ fontSize: 'var(--font-size-display-lg)', fontWeight: 'var(--font-weight-extrabold)' }}>Lg</span>
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
        component: `Typography scale and text styles for the Car and Driver design system.

## Primary Fonts

Our design system uses **two typefaces**:

### Inter (Sans-serif)
- **Usage:** Display headlines, headings, body text, and all UI elements
- **Why:** Clean, modern, and highly legible at all sizes
- **Variables:** \`--font-display\`, \`--font-heading\`, \`--font-body\`

### Lora (Serif)
- **Usage:** Editorial content, article text, and "C/D Says" sections
- **Why:** Adds a premium, editorial feel to long-form content
- **Variables:** \`--font-serif\`, \`--font-article\`

## Font Variables

### Base Font Stacks
| Variable | Font Stack |
|----------|------------|
| \`--font-sans\` | 'Inter', -apple-system, BlinkMacSystemFont, sans-serif |
| \`--font-serif\` | 'Lora', Georgia, serif |

### Semantic Aliases
| Variable | References |
|----------|------------|
| \`--font-display\` | var(--font-sans) |
| \`--font-heading\` | var(--font-sans) |
| \`--font-body\` | var(--font-sans) |
| \`--font-article\` | var(--font-serif) |

## Font Weights

| Variable | Value | Usage |
|----------|-------|-------|
| \`--font-weight-regular\` | 400 | Body text |
| \`--font-weight-medium\` | 500 | Emphasis, labels |
| \`--font-weight-semibold\` | 600 | Subheadings |
| \`--font-weight-bold\` | 700 | Headings |
| \`--font-weight-extrabold\` | 800 | Display headlines |

## Usage Example

\`\`\`css
/* Sans-serif for UI */
.my-heading {
  font-family: var(--font-heading);
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
}

.my-body {
  font-family: var(--font-body);
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-regular);
}

/* Serif for editorial content */
.my-article {
  font-family: var(--font-article);
  font-size: var(--font-size-lg);
  line-height: 1.6;
}

.cd-says-text {
  font-family: var(--font-serif);
  font-style: italic;
}
\`\`\`
`,
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

