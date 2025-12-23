import type { Meta, StoryObj } from '@storybook/react';

const ResponsiveDesignPage = () => (
  <>
    <style>
      {`
        .docs-container {
          max-width: 960px;
          margin: 0 auto;
          font-family: var(--font-body, Inter, -apple-system, BlinkMacSystemFont, sans-serif);
          color: var(--color-black, #000);
          -webkit-font-smoothing: antialiased;
          padding: 0 24px;
        }
        
        .docs-header {
          padding: 64px 0 48px;
          border-bottom: 1px solid var(--color-gray-200, #e5e5e5);
          margin-bottom: 48px;
        }
        
        .docs-eyebrow {
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          color: var(--color-blue-cobalt, #1B5F8A);
          margin-bottom: 12px;
        }
        
        .docs-header h1 {
          font-family: var(--font-display, Inter, sans-serif);
          font-size: 40px;
          font-weight: 800;
          letter-spacing: -0.02em;
          line-height: 1.1;
          margin: 0 0 16px 0;
          color: var(--color-black, #000);
        }
        
        .docs-header p {
          font-size: 18px;
          font-weight: 400;
          line-height: 1.6;
          color: var(--color-gray-600, #666);
          margin: 0;
          max-width: 640px;
        }
        
        .docs-section {
          margin-bottom: 64px;
        }
        
        .docs-section-title {
          font-family: var(--font-display, Inter, sans-serif);
          font-size: 24px;
          font-weight: 800;
          letter-spacing: -0.01em;
          color: var(--color-black, #000);
          margin: 0 0 8px 0;
        }
        
        .docs-section-subtitle {
          font-size: 15px;
          color: var(--color-gray-600, #666);
          margin: 0 0 32px 0;
          line-height: 1.5;
        }
        
        /* Breakpoint Cards */
        .breakpoint-grid {
          display: grid;
          gap: 16px;
        }
        
        .breakpoint-card {
          display: grid;
          grid-template-columns: 120px 1fr;
          gap: 24px;
          padding: 24px;
          background: var(--color-gray-50, #fafafa);
          border: 1px solid var(--color-gray-200, #e5e5e5);
          border-radius: 8px;
          align-items: start;
        }
        
        .breakpoint-card--primary {
          background: linear-gradient(135deg, rgba(27, 95, 138, 0.08) 0%, rgba(27, 95, 138, 0.04) 100%);
          border-color: var(--color-blue-cobalt, #1B5F8A);
        }
        
        .breakpoint-visual {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }
        
        .breakpoint-icon {
          width: 80px;
          height: 56px;
          background: var(--color-white, #fff);
          border: 2px solid var(--color-gray-300, #cdcdcd);
          border-radius: 4px;
          position: relative;
        }
        
        .breakpoint-icon--mobile {
          width: 32px;
          height: 56px;
          border-radius: 6px;
        }
        
        .breakpoint-icon--tablet {
          width: 56px;
          height: 44px;
        }
        
        .breakpoint-icon--desktop {
          width: 80px;
          height: 52px;
        }
        
        .breakpoint-icon--wide {
          width: 100px;
          height: 48px;
        }
        
        .breakpoint-icon::after {
          content: '';
          position: absolute;
          bottom: 4px;
          left: 50%;
          transform: translateX(-50%);
          width: 16px;
          height: 2px;
          background: var(--color-gray-300, #cdcdcd);
          border-radius: 1px;
        }
        
        .breakpoint-icon--mobile::after {
          width: 10px;
        }
        
        .breakpoint-label {
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          color: var(--color-gray-500, #6b6b6b);
        }
        
        .breakpoint-info h3 {
          font-size: 18px;
          font-weight: 800;
          color: var(--color-black, #000);
          margin: 0 0 4px 0;
        }
        
        .breakpoint-info .range {
          font-family: 'SF Mono', 'Menlo', monospace;
          font-size: 13px;
          color: var(--color-blue-cobalt, #1B5F8A);
          font-weight: 600;
          margin-bottom: 12px;
        }
        
        .breakpoint-info p {
          font-size: 14px;
          color: var(--color-gray-600, #666);
          line-height: 1.5;
          margin: 0;
        }
        
        .breakpoint-uses {
          margin-top: 12px;
          padding-top: 12px;
          border-top: 1px solid var(--color-gray-200, #e5e5e5);
        }
        
        .breakpoint-uses-title {
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          color: var(--color-gray-500, #6b6b6b);
          margin-bottom: 8px;
        }
        
        .breakpoint-uses ul {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }
        
        .breakpoint-uses li {
          font-size: 12px;
          padding: 4px 10px;
          background: var(--color-white, #fff);
          border: 1px solid var(--color-gray-200, #e5e5e5);
          border-radius: 4px;
          color: var(--color-gray-700, #4a4a4a);
        }
        
        /* Code Block */
        .code-block {
          background: #1e1e1e !important;
          border-radius: 8px;
          padding: 20px 24px;
          overflow-x: auto;
          margin: 24px 0;
        }
        
        .code-block code {
          font-family: 'SF Mono', 'Menlo', 'Monaco', monospace;
          font-size: 13px;
          line-height: 1.6;
          color: #d4d4d4 !important;
          background: transparent !important;
        }
        
        .code-block .comment {
          color: #6a9955 !important;
        }
        
        .code-block .keyword {
          color: #569cd6 !important;
        }
        
        .code-block .string {
          color: #ce9178 !important;
        }
        
        .code-block .number {
          color: #b5cea8 !important;
        }
        
        .code-block .property {
          color: #9cdcfe !important;
        }
        
        /* Pattern Cards */
        .pattern-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }
        
        @media (max-width: 768px) {
          .pattern-grid {
            grid-template-columns: 1fr;
          }
        }
        
        .pattern-card {
          background: var(--color-white, #fff);
          border: 1px solid var(--color-gray-200, #e5e5e5);
          border-radius: 8px;
          overflow: hidden;
        }
        
        .pattern-card__preview {
          padding: 24px;
          background: var(--color-gray-50, #fafafa);
          border-bottom: 1px solid var(--color-gray-200, #e5e5e5);
          min-height: 120px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .pattern-card__info {
          padding: 16px 20px;
        }
        
        .pattern-card__title {
          font-size: 14px;
          font-weight: 700;
          color: var(--color-black, #000);
          margin: 0 0 4px 0;
        }
        
        .pattern-card__desc {
          font-size: 13px;
          color: var(--color-gray-600, #666);
          margin: 0;
          line-height: 1.4;
        }
        
        .pattern-card__desc code {
          font-family: 'SF Mono', 'Menlo', monospace;
          font-size: 11px;
          background: #f0f0f0 !important;
          padding: 2px 5px;
          border-radius: 3px;
          color: #1B5F8A !important;
        }
        
        /* Demo Elements */
        .demo-flex {
          display: flex;
          gap: 12px;
          width: 100%;
        }
        
        .demo-flex--col {
          flex-direction: column;
        }
        
        .demo-box {
          background: var(--color-blue-cobalt, #1B5F8A);
          color: white;
          padding: 12px 16px;
          border-radius: 4px;
          font-size: 12px;
          font-weight: 600;
          text-align: center;
          flex: 1;
        }
        
        .demo-box--small {
          flex: none;
          width: 60px;
        }
        
        .demo-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 8px;
          width: 100%;
        }
        
        .demo-grid-item {
          background: var(--color-blue-cobalt, #1B5F8A);
          color: white;
          padding: 16px 8px;
          border-radius: 4px;
          font-size: 11px;
          font-weight: 600;
          text-align: center;
        }
        
        .demo-sidebar {
          display: flex;
          gap: 12px;
          width: 100%;
        }
        
        .demo-sidebar__main {
          flex: 1;
          background: var(--color-blue-cobalt, #1B5F8A);
          color: white;
          padding: 24px 16px;
          border-radius: 4px;
          font-size: 12px;
          font-weight: 600;
          text-align: center;
        }
        
        .demo-sidebar__side {
          width: 80px;
          background: var(--color-gray-300, #cdcdcd);
          color: var(--color-gray-700, #4a4a4a);
          padding: 24px 8px;
          border-radius: 4px;
          font-size: 11px;
          font-weight: 600;
          text-align: center;
        }
        
        /* Utility Table */
        .utility-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 13px;
        }
        
        .utility-table th {
          text-align: left;
          padding: 12px 16px;
          background: var(--color-gray-100, #f5f5f5);
          font-weight: 700;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          color: var(--color-gray-600, #666);
          border-bottom: 1px solid var(--color-gray-200, #e5e5e5);
        }
        
        .utility-table td {
          padding: 12px 16px;
          border-bottom: 1px solid var(--color-gray-100, #f5f5f5);
          vertical-align: top;
        }
        
        .utility-table code {
          font-family: 'SF Mono', 'Menlo', monospace;
          font-size: 12px;
          background: #f0f0f0 !important;
          padding: 2px 6px;
          border-radius: 3px;
          color: #1B5F8A !important;
        }
        
        .utility-table .desc {
          color: var(--color-gray-600, #666);
        }
        
        /* Best Practices */
        .best-practices {
          display: grid;
          gap: 16px;
        }
        
        .best-practice {
          display: flex;
          gap: 16px;
          padding: 20px;
          background: var(--color-gray-50, #fafafa);
          border-radius: 8px;
          border-left: 4px solid var(--color-blue-cobalt, #1B5F8A);
        }
        
        .best-practice--do {
          border-left-color: #26870D;
          background: rgba(38, 135, 13, 0.05);
        }
        
        .best-practice--dont {
          border-left-color: #D22730;
          background: rgba(210, 39, 48, 0.05);
        }
        
        .best-practice__icon {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          font-weight: 700;
          font-size: 14px;
        }
        
        .best-practice--do .best-practice__icon {
          background: #26870D;
          color: white;
        }
        
        .best-practice--dont .best-practice__icon {
          background: #D22730;
          color: white;
        }
        
        .best-practice__content h4 {
          font-size: 14px;
          font-weight: 700;
          margin: 0 0 4px 0;
          color: var(--color-black, #000);
        }
        
        .best-practice__content p {
          font-size: 13px;
          color: var(--color-gray-600, #666);
          margin: 0;
          line-height: 1.5;
        }
        
        .best-practice__content code {
          font-family: 'SF Mono', 'Menlo', monospace;
          font-size: 12px;
          background: #f0f0f0 !important;
          padding: 2px 6px;
          border-radius: 3px;
          color: #1B5F8A !important;
        }
        
        /* Interactive Demo */
        .interactive-demo {
          background: var(--color-gray-50, #fafafa);
          border: 1px solid var(--color-gray-200, #e5e5e5);
          border-radius: 8px;
          padding: 24px;
        }
        
        .interactive-demo__title {
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          color: var(--color-gray-500, #6b6b6b);
          margin-bottom: 16px;
        }
        
        .resize-demo {
          background: white;
          border: 2px dashed var(--color-gray-300, #cdcdcd);
          border-radius: 8px;
          padding: 20px;
          resize: horizontal;
          overflow: auto;
          min-width: 280px;
          max-width: 100%;
        }
        
        .resize-demo__hint {
          font-size: 11px;
          color: var(--color-gray-500, #6b6b6b);
          text-align: center;
          margin-top: 12px;
        }
        
        .responsive-cards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 12px;
        }
        
        .responsive-card {
          background: var(--color-blue-cobalt, #1B5F8A);
          color: white;
          padding: 20px;
          border-radius: 6px;
          text-align: center;
        }
        
        .responsive-card__title {
          font-size: 14px;
          font-weight: 700;
          margin-bottom: 4px;
        }
        
        .responsive-card__desc {
          font-size: 12px;
          opacity: 0.8;
        }
      `}
    </style>
    
    <div className="docs-container">
      {/* Header */}
      <header className="docs-header">
        <div className="docs-eyebrow">Design System</div>
        <h1>Responsive Design</h1>
        <p>
          Our responsive design system ensures a consistent, optimized experience across all devices. 
          We use a mobile-first approach with defined breakpoints for tablets, desktops, and wide screens.
        </p>
      </header>
      
      {/* Breakpoints Section */}
      <section className="docs-section">
        <h2 className="docs-section-title">Breakpoints</h2>
        <p className="docs-section-subtitle">
          Our design system uses four primary breakpoints. We follow a mobile-first approach, 
          meaning base styles target mobile and media queries add complexity for larger screens.
        </p>
        
        <div className="breakpoint-grid">
          {/* Mobile */}
          <div className="breakpoint-card">
            <div className="breakpoint-visual">
              <div className="breakpoint-icon breakpoint-icon--mobile" />
              <span className="breakpoint-label">Mobile</span>
            </div>
            <div className="breakpoint-info">
              <h3>Mobile (Default)</h3>
              <div className="range">&lt; 480px</div>
              <p>
                Base styles for smartphones in portrait mode. Single column layouts, 
                stacked navigation, and touch-optimized interactions.
              </p>
              <div className="breakpoint-uses">
                <div className="breakpoint-uses-title">Common Patterns</div>
                <ul>
                  <li>Full-width cards</li>
                  <li>Hamburger menu</li>
                  <li>Stacked CTAs</li>
                  <li>Bottom sheets</li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Tablet */}
          <div className="breakpoint-card">
            <div className="breakpoint-visual">
              <div className="breakpoint-icon breakpoint-icon--tablet" />
              <span className="breakpoint-label">Tablet</span>
            </div>
            <div className="breakpoint-info">
              <h3>Tablet</h3>
              <div className="range">481px – 768px</div>
              <p>
                Larger phones and tablets in portrait. Two-column grids become possible, 
                more horizontal space for content.
              </p>
              <div className="breakpoint-uses">
                <div className="breakpoint-uses-title">Common Patterns</div>
                <ul>
                  <li>2-column grids</li>
                  <li>Side-by-side CTAs</li>
                  <li>Expanded cards</li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Desktop */}
          <div className="breakpoint-card breakpoint-card--primary">
            <div className="breakpoint-visual">
              <div className="breakpoint-icon breakpoint-icon--desktop" />
              <span className="breakpoint-label">Desktop</span>
            </div>
            <div className="breakpoint-info">
              <h3>Desktop (Primary)</h3>
              <div className="range">769px – 1024px</div>
              <p>
                Our primary desktop breakpoint. Full navigation, sidebar layouts, 
                and multi-column content grids.
              </p>
              <div className="breakpoint-uses">
                <div className="breakpoint-uses-title">Common Patterns</div>
                <ul>
                  <li>Content + sidebar</li>
                  <li>3-4 column grids</li>
                  <li>Full navigation</li>
                  <li>Hover states</li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Wide */}
          <div className="breakpoint-card">
            <div className="breakpoint-visual">
              <div className="breakpoint-icon breakpoint-icon--wide" />
              <span className="breakpoint-label">Wide</span>
            </div>
            <div className="breakpoint-info">
              <h3>Wide Desktop</h3>
              <div className="range">&gt; 1024px</div>
              <p>
                Large monitors and wide screens. Content is constrained to max-width (1280px) 
                with comfortable margins.
              </p>
              <div className="breakpoint-uses">
                <div className="breakpoint-uses-title">Common Patterns</div>
                <ul>
                  <li>Max-width containers</li>
                  <li>Ad sidebar visible</li>
                  <li>Full feature layouts</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CSS Variables */}
      <section className="docs-section">
        <h2 className="docs-section-title">Breakpoint Values</h2>
        <p className="docs-section-subtitle">
          Use these consistent breakpoint values across all components. 
          Always use max-width for mobile-first queries.
        </p>
        
        <div className="code-block">
          <code>
            <span className="comment">/* Breakpoint Values */</span><br/>
            <span className="property">$breakpoint-mobile</span>: <span className="number">480px</span>;   <span className="comment">/* Small phones */</span><br/>
            <span className="property">$breakpoint-tablet</span>: <span className="number">768px</span>;   <span className="comment">/* Tablets, large phones */</span><br/>
            <span className="property">$breakpoint-desktop</span>: <span className="number">1024px</span>; <span className="comment">/* Desktop, laptops */</span><br/>
            <span className="property">$breakpoint-wide</span>: <span className="number">1280px</span>;   <span className="comment">/* Wide screens */</span><br/>
            <br/>
            <span className="comment">/* Mobile-first media queries */</span><br/>
            <span className="keyword">@media</span> (<span className="property">max-width</span>: <span className="number">480px</span>) {'{ }'} <span className="comment">/* Mobile only */</span><br/>
            <span className="keyword">@media</span> (<span className="property">max-width</span>: <span className="number">768px</span>) {'{ }'} <span className="comment">/* Mobile + Tablet */</span><br/>
            <span className="keyword">@media</span> (<span className="property">max-width</span>: <span className="number">1024px</span>) {'{ }'} <span className="comment">/* Below desktop */</span><br/>
            <span className="keyword">@media</span> (<span className="property">min-width</span>: <span className="number">769px</span>) {'{ }'} <span className="comment">/* Desktop and up */</span><br/>
            <span className="keyword">@media</span> (<span className="property">min-width</span>: <span className="number">1025px</span>) {'{ }'} <span className="comment">/* Wide screens */</span>
          </code>
        </div>
      </section>
      
      {/* Common Patterns */}
      <section className="docs-section">
        <h2 className="docs-section-title">Responsive Patterns</h2>
        <p className="docs-section-subtitle">
          Common layout patterns and how they adapt across breakpoints.
        </p>
        
        <div className="pattern-grid">
          <div className="pattern-card">
            <div className="pattern-card__preview">
              <div className="demo-flex">
                <div className="demo-box">1</div>
                <div className="demo-box">2</div>
                <div className="demo-box">3</div>
              </div>
            </div>
            <div className="pattern-card__info">
              <h3 className="pattern-card__title">Flex Row → Column</h3>
              <p className="pattern-card__desc">
                Horizontal items stack vertically on mobile using <code>flex-direction: column</code>
              </p>
            </div>
          </div>
          
          <div className="pattern-card">
            <div className="pattern-card__preview">
              <div className="demo-grid">
                <div className="demo-grid-item">1</div>
                <div className="demo-grid-item">2</div>
                <div className="demo-grid-item">3</div>
              </div>
            </div>
            <div className="pattern-card__info">
              <h3 className="pattern-card__title">Responsive Grid</h3>
              <p className="pattern-card__desc">
                Use <code>auto-fit</code> with <code>minmax()</code> for fluid column counts
              </p>
            </div>
          </div>
          
          <div className="pattern-card">
            <div className="pattern-card__preview">
              <div className="demo-sidebar">
                <div className="demo-sidebar__main">Main Content</div>
                <div className="demo-sidebar__side">Sidebar</div>
              </div>
            </div>
            <div className="pattern-card__info">
              <h3 className="pattern-card__title">Content + Sidebar</h3>
              <p className="pattern-card__desc">
                Sidebar hides on mobile (≤1024px), content takes full width
              </p>
            </div>
          </div>
          
          <div className="pattern-card">
            <div className="pattern-card__preview">
              <div className="demo-flex demo-flex--col" style={{ gap: '8px' }}>
                <div className="demo-box">Primary CTA</div>
                <div className="demo-box" style={{ background: 'transparent', border: '2px solid #1B5F8A', color: '#1B5F8A' }}>Secondary</div>
              </div>
            </div>
            <div className="pattern-card__info">
              <h3 className="pattern-card__title">Stacked CTAs</h3>
              <p className="pattern-card__desc">
                Side-by-side buttons stack vertically with full width on mobile
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Utility Classes */}
      <section className="docs-section">
        <h2 className="docs-section-title">Responsive Utility Classes</h2>
        <p className="docs-section-subtitle">
          Pre-built utility classes for common responsive behaviors.
        </p>
        
        <table className="utility-table">
          <thead>
            <tr>
              <th>Class</th>
              <th>Behavior</th>
              <th>Breakpoint</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>.u-hide-mobile</code></td>
              <td className="desc">Hidden on mobile devices</td>
              <td><code>≤768px</code></td>
            </tr>
            <tr>
              <td><code>.u-hide-desktop</code></td>
              <td className="desc">Hidden on desktop devices</td>
              <td><code>≥769px</code></td>
            </tr>
            <tr>
              <td><code>.u-show-mobile-only</code></td>
              <td className="desc">Only visible on mobile</td>
              <td><code>≤768px</code></td>
            </tr>
            <tr>
              <td><code>.u-show-desktop-only</code></td>
              <td className="desc">Only visible on desktop</td>
              <td><code>≥769px</code></td>
            </tr>
            <tr>
              <td><code>.u-flex-col-mobile</code></td>
              <td className="desc">Flex column on mobile</td>
              <td><code>≤768px</code></td>
            </tr>
            <tr>
              <td><code>.u-text-center-mobile</code></td>
              <td className="desc">Center text on mobile</td>
              <td><code>≤768px</code></td>
            </tr>
          </tbody>
        </table>
      </section>
      
      {/* Interactive Demo */}
      <section className="docs-section">
        <h2 className="docs-section-title">Interactive Demo</h2>
        <p className="docs-section-subtitle">
          Drag the corner to resize and see responsive behavior in action.
        </p>
        
        <div className="interactive-demo">
          <div className="interactive-demo__title">Resize to test responsiveness</div>
          <div className="resize-demo">
            <div className="responsive-cards">
              <div className="responsive-card">
                <div className="responsive-card__title">Card 1</div>
                <div className="responsive-card__desc">Responsive grid item</div>
              </div>
              <div className="responsive-card">
                <div className="responsive-card__title">Card 2</div>
                <div className="responsive-card__desc">Responsive grid item</div>
              </div>
              <div className="responsive-card">
                <div className="responsive-card__title">Card 3</div>
                <div className="responsive-card__desc">Responsive grid item</div>
              </div>
            </div>
          </div>
          <div className="resize-demo__hint">↔ Drag the right edge to resize</div>
        </div>
      </section>
      
      {/* Best Practices */}
      <section className="docs-section">
        <h2 className="docs-section-title">Best Practices</h2>
        <p className="docs-section-subtitle">
          Guidelines for implementing responsive designs consistently.
        </p>
        
        <div className="best-practices">
          <div className="best-practice best-practice--do">
            <div className="best-practice__icon">✓</div>
            <div className="best-practice__content">
              <h4>Use mobile-first approach</h4>
              <p>
                Write base styles for mobile, then use <code>min-width</code> queries to add 
                complexity for larger screens. This results in smaller CSS and better performance.
              </p>
            </div>
          </div>
          
          <div className="best-practice best-practice--do">
            <div className="best-practice__icon">✓</div>
            <div className="best-practice__content">
              <h4>Use consistent breakpoints</h4>
              <p>
                Always use our defined breakpoints (480px, 768px, 1024px). Avoid custom breakpoints 
                unless absolutely necessary to maintain consistency.
              </p>
            </div>
          </div>
          
          <div className="best-practice best-practice--do">
            <div className="best-practice__icon">✓</div>
            <div className="best-practice__content">
              <h4>Test on real devices</h4>
              <p>
                Browser DevTools are helpful, but always test on actual devices. Touch interactions, 
                viewport quirks, and performance differ from simulations.
              </p>
            </div>
          </div>
          
          <div className="best-practice best-practice--dont">
            <div className="best-practice__icon">✗</div>
            <div className="best-practice__content">
              <h4>Don't hide important content</h4>
              <p>
                Avoid hiding critical information on mobile. If something is important enough to show 
                on desktop, find a way to present it on mobile too.
              </p>
            </div>
          </div>
          
          <div className="best-practice best-practice--dont">
            <div className="best-practice__icon">✗</div>
            <div className="best-practice__content">
              <h4>Don't use fixed pixel widths</h4>
              <p>
                Avoid hard-coded pixel widths for containers. Use percentages, max-width, or 
                flexible units like <code>fr</code> and <code>rem</code>.
              </p>
            </div>
          </div>
          
          <div className="best-practice best-practice--dont">
            <div className="best-practice__icon">✗</div>
            <div className="best-practice__content">
              <h4>Don't forget touch targets</h4>
              <p>
                Interactive elements should be at least 44×44px on mobile. Small buttons and links 
                are frustrating and inaccessible on touch devices.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Component Examples */}
      <section className="docs-section">
        <h2 className="docs-section-title">Component Breakpoints</h2>
        <p className="docs-section-subtitle">
          Reference for how specific components respond at different breakpoints.
        </p>
        
        <table className="utility-table">
          <thead>
            <tr>
              <th>Component</th>
              <th>Mobile (≤768px)</th>
              <th>Desktop (≥1024px)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Header</strong></td>
              <td className="desc">Hamburger menu, condensed nav</td>
              <td className="desc">Full horizontal navigation</td>
            </tr>
            <tr>
              <td><strong>Hero</strong></td>
              <td className="desc">Stacked layout, smaller image</td>
              <td className="desc">Side-by-side content + image</td>
            </tr>
            <tr>
              <td><strong>Vehicle Cards</strong></td>
              <td className="desc">Full width, 1 column</td>
              <td className="desc">Grid, 3-4 columns</td>
            </tr>
            <tr>
              <td><strong>Ad Sidebar</strong></td>
              <td className="desc">Hidden</td>
              <td className="desc">Visible, sticky positioning</td>
            </tr>
            <tr>
              <td><strong>CTAs</strong></td>
              <td className="desc">Stacked, full width</td>
              <td className="desc">Inline, auto width</td>
            </tr>
            <tr>
              <td><strong>Footer</strong></td>
              <td className="desc">Stacked columns, accordion</td>
              <td className="desc">Multi-column grid</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  </>
);

const meta: Meta = {
  title: 'Design System/Responsive Design',
  component: ResponsiveDesignPage,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Responsive Design System

Comprehensive documentation for Car and Driver's responsive design approach, breakpoints, and patterns.

## Quick Reference

| Breakpoint | Width | Usage |
|------------|-------|-------|
| Mobile | < 480px | Small phones |
| Tablet | 481-768px | Tablets, large phones |
| Desktop | 769-1024px | Laptops, desktops |
| Wide | > 1024px | Large monitors |

## Key Principles

1. **Mobile-first** - Base styles for mobile, enhance for larger screens
2. **Consistent breakpoints** - Use defined values, avoid custom breakpoints
3. **Flexible layouts** - Use flexbox, grid, and percentage-based widths
4. **Touch-friendly** - Minimum 44×44px touch targets on mobile
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const Documentation: Story = {
  render: () => <ResponsiveDesignPage />,
};

