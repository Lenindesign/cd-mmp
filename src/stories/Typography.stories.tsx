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
        
        /* Live Samples Styles */
        .samples-container {
          background: var(--color-white);
          border: 1px solid var(--color-border);
          border-radius: var(--border-radius-lg);
          padding: 48px;
          margin-bottom: 32px;
        }
        
        .samples-container h1 {
          font-family: var(--font-display);
          font-size: var(--font-size-4xl);
          font-weight: var(--font-weight-extrabold);
          line-height: 1.1;
          letter-spacing: -0.02em;
          color: var(--color-dark);
          margin: 0 0 24px 0;
        }
        
        .samples-container h2 {
          font-family: var(--font-heading);
          font-size: var(--font-size-3xl);
          font-weight: var(--font-weight-bold);
          line-height: 1.2;
          letter-spacing: -0.01em;
          color: var(--color-dark);
          margin: 0 0 20px 0;
        }
        
        .samples-container h3 {
          font-family: var(--font-heading);
          font-size: var(--font-size-2xl);
          font-weight: var(--font-weight-bold);
          line-height: 1.3;
          color: var(--color-dark);
          margin: 0 0 16px 0;
        }
        
        .samples-container h4 {
          font-family: var(--font-heading);
          font-size: var(--font-size-xl);
          font-weight: var(--font-weight-semibold);
          line-height: 1.4;
          color: var(--color-dark);
          margin: 0 0 12px 0;
        }
        
        .samples-container p {
          font-family: var(--font-body);
          font-size: var(--font-size-md);
          font-weight: var(--font-weight-regular);
          line-height: 1.6;
          color: var(--color-dark);
          margin: 0 0 16px 0;
        }
        
        .samples-container .lead {
          font-family: var(--font-body);
          font-size: var(--font-size-xl);
          font-weight: var(--font-weight-regular);
          line-height: 1.5;
          color: var(--color-text-secondary);
          margin: 0 0 24px 0;
        }
        
        .samples-container .byline {
          font-family: var(--font-body);
          font-size: var(--font-size-sm);
          font-weight: var(--font-weight-medium);
          color: var(--color-dark);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        
        .samples-container .byline a {
          color: var(--color-blue-cobalt);
          text-decoration: none;
        }
        
        .samples-container .datestamp {
          font-family: var(--font-body);
          font-size: var(--font-size-sm);
          font-weight: var(--font-weight-regular);
          color: var(--color-text-secondary);
        }
        
        .samples-container .caption {
          font-family: var(--font-body);
          font-size: var(--font-size-sm);
          font-weight: var(--font-weight-regular);
          color: var(--color-text-secondary);
          font-style: italic;
          line-height: 1.5;
        }
        
        .samples-container blockquote {
          font-family: var(--font-article);
          font-size: var(--font-size-xl);
          font-weight: var(--font-weight-regular);
          font-style: italic;
          line-height: 1.6;
          color: var(--color-dark);
          margin: 24px 0;
          padding-left: 24px;
          border-left: 4px solid var(--color-blue-cobalt);
        }
        
        .samples-container blockquote cite {
          display: block;
          font-family: var(--font-body);
          font-size: var(--font-size-sm);
          font-style: normal;
          font-weight: var(--font-weight-medium);
          color: var(--color-text-secondary);
          margin-top: 12px;
        }
        
        .samples-container ul,
        .samples-container ol {
          font-family: var(--font-body);
          font-size: var(--font-size-md);
          line-height: 1.6;
          color: var(--color-dark);
          margin: 0 0 16px 0;
          padding-left: 0;
          list-style: none;
        }
        
        .samples-container ul li,
        .samples-container ol li {
          margin-bottom: 8px;
          padding-left: 24px;
          position: relative;
        }
        
        .samples-container ul li::before {
          content: '•';
          color: var(--color-blue-cobalt);
          font-weight: bold;
          position: absolute;
          left: 8px;
        }
        
        .samples-container ol {
          counter-reset: list-counter;
        }
        
        .samples-container ol li {
          counter-increment: list-counter;
        }
        
        .samples-container ol li::before {
          content: counter(list-counter) '.';
          color: var(--color-blue-cobalt);
          font-weight: var(--font-weight-semibold);
          position: absolute;
          left: 0;
        }
        
        .samples-container table {
          width: 100%;
          border-collapse: collapse;
          font-family: var(--font-body);
          font-size: var(--font-size-base);
          margin: 24px 0;
        }
        
        .samples-container th {
          text-align: left;
          font-weight: var(--font-weight-semibold);
          padding: 12px 16px;
          background: var(--color-bg-secondary);
          border-bottom: 2px solid var(--color-border);
          color: var(--color-dark);
        }
        
        .samples-container td {
          padding: 12px 16px;
          border-bottom: 1px solid var(--color-border);
          color: var(--color-dark);
        }
        
        .samples-container tr:last-child td {
          border-bottom: none;
        }
        
        .sample-label {
          display: inline-block;
          font-size: var(--font-size-xs);
          font-weight: var(--font-weight-semibold);
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--color-white);
          background: var(--color-blue-cobalt);
          padding: 4px 8px;
          border-radius: var(--border-radius-sm);
          margin-bottom: 12px;
        }
        
        .sample-divider {
          height: 1px;
          background: var(--color-border);
          margin: 32px 0;
        }
        
        .meta-row {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 16px;
        }
        
        .image-placeholder {
          background: var(--color-bg-secondary);
          border-radius: var(--border-radius-md);
          height: 200px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--color-text-secondary);
          font-size: var(--font-size-sm);
          margin-bottom: 8px;
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
          Our design system uses three typefaces: Inter for UI, Lora for editorial content, and Barlow Condensed for labels.
        </p>
        
        <div className="font-showcase" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
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
          
          <div className="font-showcase-item">
            <div className="font-showcase-name" style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 600 }}>Barlow Condensed</div>
            <div className="font-showcase-sample" style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 600 }}>
              ABCDEFGHIJKLMNOPQRSTUVWXYZ<br/>
              abcdefghijklmnopqrstuvwxyz<br/>
              0123456789
            </div>
            <div className="font-showcase-desc">
              <strong>Condensed Sans-serif</strong> — Used for labels, badges, condition headers, and compact UI elements.
              Space-efficient with strong visual presence.
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
          <div className="font-item">
            <code>--font-condensed</code>
            <span>'Barlow Condensed', -apple-system, BlinkMacSystemFont, sans-serif</span>
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
          <div className="font-item">
            <code>--font-label</code>
            <span>var(--font-condensed)</span>
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
        <h2 className="docs-section-title">Label Text (Condensed)</h2>
        <p className="docs-section-subtitle">
          Condensed text styles using Barlow Condensed for labels, badges, and compact UI elements.
        </p>
        
        <div className="type-row">
          <div className="type-meta">
            <div>
              <div className="type-name">Label Large</div>
              <div className="type-specs">var(--font-size-lg) · 18px / Barlow Condensed / 600</div>
            </div>
          </div>
          <div className="type-sample" style={{ fontFamily: 'var(--font-condensed)', fontSize: 'var(--font-size-lg)', fontWeight: 'var(--font-weight-semibold)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            CLEAN CONDITION
          </div>
        </div>
        
        <div className="type-row">
          <div className="type-meta">
            <div>
              <div className="type-name">Label Default</div>
              <div className="type-specs">var(--font-size-base) · 14px / Barlow Condensed / 600</div>
            </div>
          </div>
          <div className="type-sample" style={{ fontFamily: 'var(--font-condensed)', fontSize: 'var(--font-size-base)', fontWeight: 'var(--font-weight-semibold)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            AVERAGE CONDITION
          </div>
        </div>
        
        <div className="type-row">
          <div className="type-meta">
            <div>
              <div className="type-name">Label Small</div>
              <div className="type-specs">var(--font-size-sm) · 12px / Barlow Condensed / 600</div>
            </div>
          </div>
          <div className="type-sample" style={{ fontFamily: 'var(--font-condensed)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-semibold)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            ROUGH CONDITION
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
      
      <div className="docs-section">
        <h2 className="docs-section-title">Live Text Samples</h2>
        <p className="docs-section-subtitle">
          Real-world examples of typography in context, showing how text elements work together.
        </p>
        
        {/* Headings */}
        <div className="samples-container">
          <span className="sample-label">H1 - Page Title</span>
          <h1>2025 Honda Accord Review: The Benchmark Midsize Sedan</h1>
          
          <div className="sample-divider" />
          
          <span className="sample-label">H2 - Section Title</span>
          <h2>Performance and Handling</h2>
          
          <div className="sample-divider" />
          
          <span className="sample-label">H3 - Subsection Title</span>
          <h3>Engine Options and Fuel Economy</h3>
          
          <div className="sample-divider" />
          
          <span className="sample-label">H4 - Minor Heading</span>
          <h4>Standard Safety Features</h4>
        </div>
        
        {/* Lead, Byline, Datestamp */}
        <div className="samples-container">
          <span className="sample-label">Lead Paragraph</span>
          <p className="lead">
            The Honda Accord continues to set the standard for midsize sedans, combining 
            refined driving dynamics with a spacious interior and cutting-edge technology.
          </p>
          
          <div className="sample-divider" />
          
          <span className="sample-label">Byline + Datestamp</span>
          <div className="meta-row">
            <span className="byline">By <a href="#">Tony Quiroga</a></span>
            <span className="datestamp">December 26, 2025</span>
          </div>
        </div>
        
        {/* Body Paragraph */}
        <div className="samples-container">
          <span className="sample-label">P - Body Paragraph</span>
          <p>
            The 2025 Honda Accord arrives with subtle styling updates and enhanced tech features 
            that keep it at the top of the midsize sedan class. Under the hood, buyers can choose 
            between a turbocharged 1.5-liter four-cylinder producing 192 horsepower or a hybrid 
            powertrain that combines a 2.0-liter engine with two electric motors for a total of 
            204 horsepower.
          </p>
          <p>
            Inside, the Accord's cabin is a masterclass in ergonomics and material quality. 
            The dashboard features a clean, horizontal design with a 12.3-inch touchscreen 
            running Honda's latest infotainment software. Wireless Apple CarPlay and Android 
            Auto come standard, as does a wireless smartphone charging pad.
          </p>
        </div>
        
        {/* Blockquote */}
        <div className="samples-container">
          <span className="sample-label">Blockquote</span>
          <blockquote>
            "The Accord's blend of comfort, efficiency, and driving enjoyment makes it the 
            quintessential family sedan. It's the car we'd recommend to anyone shopping in 
            this segment."
            <cite>— Car and Driver Editors</cite>
          </blockquote>
        </div>
        
        {/* Lists */}
        <div className="samples-container">
          <span className="sample-label">Unordered List</span>
          <ul>
            <li>Standard Honda Sensing suite with adaptive cruise control</li>
            <li>Available 19-inch alloy wheels on Sport and Touring trims</li>
            <li>Wireless Apple CarPlay and Android Auto connectivity</li>
            <li>12.3-inch digital instrument cluster</li>
          </ul>
          
          <div className="sample-divider" />
          
          <span className="sample-label">Ordered List</span>
          <ol>
            <li>Honda Accord Hybrid Touring — Best overall value</li>
            <li>Toyota Camry XSE — Sportiest driving dynamics</li>
            <li>Mazda 6 Signature — Premium interior quality</li>
            <li>Hyundai Sonata Limited — Most tech features</li>
          </ol>
        </div>
        
        {/* Table */}
        <div className="samples-container">
          <span className="sample-label">Table</span>
          <table>
            <thead>
              <tr>
                <th>Specification</th>
                <th>1.5T</th>
                <th>Hybrid</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Horsepower</td>
                <td>192 hp</td>
                <td>204 hp</td>
              </tr>
              <tr>
                <td>Torque</td>
                <td>192 lb-ft</td>
                <td>247 lb-ft</td>
              </tr>
              <tr>
                <td>MPG (City/Hwy)</td>
                <td>29/37</td>
                <td>51/44</td>
              </tr>
              <tr>
                <td>0-60 mph</td>
                <td>7.4 sec</td>
                <td>7.2 sec</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        {/* Caption */}
        <div className="samples-container">
          <span className="sample-label">Caption</span>
          <div className="image-placeholder">
            [Vehicle Image]
          </div>
          <p className="caption">
            The 2025 Honda Accord Touring shown in Meteorite Gray Metallic with optional 
            19-inch machined alloy wheels. Photo: Car and Driver
          </p>
        </div>
        
        {/* Full Article Example */}
        <div className="samples-container">
          <span className="sample-label">Full Article Context</span>
          
          <h1>2025 Honda Accord First Drive: Still the One to Beat</h1>
          
          <p className="lead">
            Honda's midsize sedan remains the benchmark, with refinements that make 
            an already excellent car even better.
          </p>
          
          <div className="meta-row">
            <span className="byline">By <a href="#">Eric Stafford</a></span>
            <span className="datestamp">December 26, 2025</span>
          </div>
          
          <div className="sample-divider" />
          
          <h2>What's New for 2025</h2>
          
          <p>
            The eleventh-generation Accord enters its third model year with minor updates 
            that include a refreshed front fascia, new wheel designs, and expanded standard 
            equipment. The hybrid powertrain remains unchanged, continuing to offer an 
            impressive combination of performance and efficiency.
          </p>
          
          <h3>Exterior Updates</h3>
          
          <p>
            Visual changes are subtle but effective. The front grille features a new mesh 
            pattern, while the LED headlights have been reshaped for a more aggressive look. 
            Two new colors join the palette: Canyon River Blue Metallic and Urban Gray Pearl.
          </p>
          
          <blockquote>
            "The Accord doesn't need dramatic changes because the fundamentals are so strong. 
            These updates simply keep it fresh."
            <cite>— Honda Product Planning</cite>
          </blockquote>
          
          <h3>Interior Improvements</h3>
          
          <h4>Technology Features</h4>
          
          <ul>
            <li>Google built-in with Google Assistant, Google Maps, and Google Play</li>
            <li>Updated 12.3-inch touchscreen with faster processor</li>
            <li>New Bose premium audio system with 12 speakers</li>
          </ul>
          
          <table>
            <thead>
              <tr>
                <th>Trim Level</th>
                <th>Base Price</th>
                <th>Key Features</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>LX</td>
                <td>$28,990</td>
                <td>Honda Sensing, 7" display</td>
              </tr>
              <tr>
                <td>EX</td>
                <td>$31,560</td>
                <td>12.3" display, sunroof</td>
              </tr>
              <tr>
                <td>Sport</td>
                <td>$32,560</td>
                <td>19" wheels, sport styling</td>
              </tr>
              <tr>
                <td>EX-L</td>
                <td>$34,560</td>
                <td>Leather, heated seats</td>
              </tr>
              <tr>
                <td>Touring</td>
                <td>$38,990</td>
                <td>All features, HUD</td>
              </tr>
            </tbody>
          </table>
          
          <div className="image-placeholder">
            [Interior Gallery Image]
          </div>
          <p className="caption">
            The Accord's interior features high-quality materials and an intuitive layout. 
            The 12.3-inch touchscreen is standard on EX and above trims.
          </p>
        </div>
      </div>
    </div>
  </>
);

const meta: Meta = {
  title: 'Foundation/Typography',
  component: TypographyPage,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `Typography scale and text styles for the Car and Driver design system.

## Primary Fonts

Our design system uses **three typefaces**:

### Inter (Sans-serif)
- **Usage:** Display headlines, headings, body text, and all UI elements
- **Why:** Clean, modern, and highly legible at all sizes
- **Variables:** \`--font-display\`, \`--font-heading\`, \`--font-body\`

### Lora (Serif)
- **Usage:** Editorial content, article text, and "C/D Says" sections
- **Why:** Adds a premium, editorial feel to long-form content
- **Variables:** \`--font-serif\`, \`--font-article\`

### Barlow Condensed (Condensed Sans-serif)
- **Usage:** Labels, badges, condition headers, and compact UI elements
- **Why:** Space-efficient with strong visual presence, perfect for uppercase labels
- **Variables:** \`--font-condensed\`, \`--font-label\`
- **Weight:** Semibold (600) only

## Font Variables

### Base Font Stacks
| Variable | Font Stack |
|----------|------------|
| \`--font-sans\` | 'Inter', -apple-system, BlinkMacSystemFont, sans-serif |
| \`--font-serif\` | 'Lora', Georgia, serif |
| \`--font-condensed\` | 'Barlow Condensed', -apple-system, BlinkMacSystemFont, sans-serif |

### Semantic Aliases
| Variable | References |
|----------|------------|
| \`--font-display\` | var(--font-sans) |
| \`--font-heading\` | var(--font-sans) |
| \`--font-body\` | var(--font-sans) |
| \`--font-article\` | var(--font-serif) |
| \`--font-label\` | var(--font-condensed) |

## Font Weights

| Variable | Value | Usage |
|----------|-------|-------|
| \`--font-weight-regular\` | 400 | Body text |
| \`--font-weight-medium\` | 500 | Emphasis, labels |
| \`--font-weight-semibold\` | 600 | Subheadings, condensed labels |
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

/* Condensed for labels and badges */
.condition-label {
  font-family: var(--font-label);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  text-transform: uppercase;
  letter-spacing: 0.04em;
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

