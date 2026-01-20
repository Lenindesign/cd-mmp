import{j as e}from"./iframe-Nxp4yMSg.js";import"./preload-helper-PPVm8Dsz.js";const i=()=>e.jsxs(e.Fragment,{children:[e.jsx("style",{children:`
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
      `}),e.jsxs("div",{className:"docs-container",children:[e.jsxs("header",{className:"docs-header",children:[e.jsx("div",{className:"docs-eyebrow",children:"Design System"}),e.jsx("h1",{children:"Responsive Design"}),e.jsx("p",{children:"Our responsive design system ensures a consistent, optimized experience across all devices. We use a mobile-first approach with defined breakpoints for tablets, desktops, and wide screens."})]}),e.jsxs("section",{className:"docs-section",children:[e.jsx("h2",{className:"docs-section-title",children:"Breakpoints"}),e.jsx("p",{className:"docs-section-subtitle",children:"Our design system uses four primary breakpoints. We follow a mobile-first approach, meaning base styles target mobile and media queries add complexity for larger screens."}),e.jsxs("div",{className:"breakpoint-grid",children:[e.jsxs("div",{className:"breakpoint-card",children:[e.jsxs("div",{className:"breakpoint-visual",children:[e.jsx("div",{className:"breakpoint-icon breakpoint-icon--mobile"}),e.jsx("span",{className:"breakpoint-label",children:"Mobile"})]}),e.jsxs("div",{className:"breakpoint-info",children:[e.jsx("h3",{children:"Mobile (Default)"}),e.jsx("div",{className:"range",children:"< 480px"}),e.jsx("p",{children:"Base styles for smartphones in portrait mode. Single column layouts, stacked navigation, and touch-optimized interactions."}),e.jsxs("div",{className:"breakpoint-uses",children:[e.jsx("div",{className:"breakpoint-uses-title",children:"Common Patterns"}),e.jsxs("ul",{children:[e.jsx("li",{children:"Full-width cards"}),e.jsx("li",{children:"Hamburger menu"}),e.jsx("li",{children:"Stacked CTAs"}),e.jsx("li",{children:"Bottom sheets"})]})]})]})]}),e.jsxs("div",{className:"breakpoint-card",children:[e.jsxs("div",{className:"breakpoint-visual",children:[e.jsx("div",{className:"breakpoint-icon breakpoint-icon--tablet"}),e.jsx("span",{className:"breakpoint-label",children:"Tablet"})]}),e.jsxs("div",{className:"breakpoint-info",children:[e.jsx("h3",{children:"Tablet"}),e.jsx("div",{className:"range",children:"481px – 768px"}),e.jsx("p",{children:"Larger phones and tablets in portrait. Two-column grids become possible, more horizontal space for content."}),e.jsxs("div",{className:"breakpoint-uses",children:[e.jsx("div",{className:"breakpoint-uses-title",children:"Common Patterns"}),e.jsxs("ul",{children:[e.jsx("li",{children:"2-column grids"}),e.jsx("li",{children:"Side-by-side CTAs"}),e.jsx("li",{children:"Expanded cards"})]})]})]})]}),e.jsxs("div",{className:"breakpoint-card breakpoint-card--primary",children:[e.jsxs("div",{className:"breakpoint-visual",children:[e.jsx("div",{className:"breakpoint-icon breakpoint-icon--desktop"}),e.jsx("span",{className:"breakpoint-label",children:"Desktop"})]}),e.jsxs("div",{className:"breakpoint-info",children:[e.jsx("h3",{children:"Desktop (Primary)"}),e.jsx("div",{className:"range",children:"769px – 1024px"}),e.jsx("p",{children:"Our primary desktop breakpoint. Full navigation, sidebar layouts, and multi-column content grids."}),e.jsxs("div",{className:"breakpoint-uses",children:[e.jsx("div",{className:"breakpoint-uses-title",children:"Common Patterns"}),e.jsxs("ul",{children:[e.jsx("li",{children:"Content + sidebar"}),e.jsx("li",{children:"3-4 column grids"}),e.jsx("li",{children:"Full navigation"}),e.jsx("li",{children:"Hover states"})]})]})]})]}),e.jsxs("div",{className:"breakpoint-card",children:[e.jsxs("div",{className:"breakpoint-visual",children:[e.jsx("div",{className:"breakpoint-icon breakpoint-icon--wide"}),e.jsx("span",{className:"breakpoint-label",children:"Wide"})]}),e.jsxs("div",{className:"breakpoint-info",children:[e.jsx("h3",{children:"Wide Desktop"}),e.jsx("div",{className:"range",children:"> 1024px"}),e.jsx("p",{children:"Large monitors and wide screens. Content is constrained to max-width (1280px) with comfortable margins."}),e.jsxs("div",{className:"breakpoint-uses",children:[e.jsx("div",{className:"breakpoint-uses-title",children:"Common Patterns"}),e.jsxs("ul",{children:[e.jsx("li",{children:"Max-width containers"}),e.jsx("li",{children:"Ad sidebar visible"}),e.jsx("li",{children:"Full feature layouts"})]})]})]})]})]})]}),e.jsxs("section",{className:"docs-section",children:[e.jsx("h2",{className:"docs-section-title",children:"Breakpoint Values"}),e.jsx("p",{className:"docs-section-subtitle",children:"Use these consistent breakpoint values across all components. Always use max-width for mobile-first queries."}),e.jsx("div",{className:"code-block",children:e.jsxs("code",{children:[e.jsx("span",{className:"comment",children:"/* Breakpoint Values */"}),e.jsx("br",{}),e.jsx("span",{className:"property",children:"$breakpoint-mobile"}),": ",e.jsx("span",{className:"number",children:"480px"}),";   ",e.jsx("span",{className:"comment",children:"/* Small phones */"}),e.jsx("br",{}),e.jsx("span",{className:"property",children:"$breakpoint-tablet"}),": ",e.jsx("span",{className:"number",children:"768px"}),";   ",e.jsx("span",{className:"comment",children:"/* Tablets, large phones */"}),e.jsx("br",{}),e.jsx("span",{className:"property",children:"$breakpoint-desktop"}),": ",e.jsx("span",{className:"number",children:"1024px"}),"; ",e.jsx("span",{className:"comment",children:"/* Desktop, laptops */"}),e.jsx("br",{}),e.jsx("span",{className:"property",children:"$breakpoint-wide"}),": ",e.jsx("span",{className:"number",children:"1280px"}),";   ",e.jsx("span",{className:"comment",children:"/* Wide screens */"}),e.jsx("br",{}),e.jsx("br",{}),e.jsx("span",{className:"comment",children:"/* Mobile-first media queries */"}),e.jsx("br",{}),e.jsx("span",{className:"keyword",children:"@media"})," (",e.jsx("span",{className:"property",children:"max-width"}),": ",e.jsx("span",{className:"number",children:"480px"}),") ","{ }"," ",e.jsx("span",{className:"comment",children:"/* Mobile only */"}),e.jsx("br",{}),e.jsx("span",{className:"keyword",children:"@media"})," (",e.jsx("span",{className:"property",children:"max-width"}),": ",e.jsx("span",{className:"number",children:"768px"}),") ","{ }"," ",e.jsx("span",{className:"comment",children:"/* Mobile + Tablet */"}),e.jsx("br",{}),e.jsx("span",{className:"keyword",children:"@media"})," (",e.jsx("span",{className:"property",children:"max-width"}),": ",e.jsx("span",{className:"number",children:"1024px"}),") ","{ }"," ",e.jsx("span",{className:"comment",children:"/* Below desktop */"}),e.jsx("br",{}),e.jsx("span",{className:"keyword",children:"@media"})," (",e.jsx("span",{className:"property",children:"min-width"}),": ",e.jsx("span",{className:"number",children:"769px"}),") ","{ }"," ",e.jsx("span",{className:"comment",children:"/* Desktop and up */"}),e.jsx("br",{}),e.jsx("span",{className:"keyword",children:"@media"})," (",e.jsx("span",{className:"property",children:"min-width"}),": ",e.jsx("span",{className:"number",children:"1025px"}),") ","{ }"," ",e.jsx("span",{className:"comment",children:"/* Wide screens */"})]})})]}),e.jsxs("section",{className:"docs-section",children:[e.jsx("h2",{className:"docs-section-title",children:"Responsive Patterns"}),e.jsx("p",{className:"docs-section-subtitle",children:"Common layout patterns and how they adapt across breakpoints."}),e.jsxs("div",{className:"pattern-grid",children:[e.jsxs("div",{className:"pattern-card",children:[e.jsx("div",{className:"pattern-card__preview",children:e.jsxs("div",{className:"demo-flex",children:[e.jsx("div",{className:"demo-box",children:"1"}),e.jsx("div",{className:"demo-box",children:"2"}),e.jsx("div",{className:"demo-box",children:"3"})]})}),e.jsxs("div",{className:"pattern-card__info",children:[e.jsx("h3",{className:"pattern-card__title",children:"Flex Row → Column"}),e.jsxs("p",{className:"pattern-card__desc",children:["Horizontal items stack vertically on mobile using ",e.jsx("code",{children:"flex-direction: column"})]})]})]}),e.jsxs("div",{className:"pattern-card",children:[e.jsx("div",{className:"pattern-card__preview",children:e.jsxs("div",{className:"demo-grid",children:[e.jsx("div",{className:"demo-grid-item",children:"1"}),e.jsx("div",{className:"demo-grid-item",children:"2"}),e.jsx("div",{className:"demo-grid-item",children:"3"})]})}),e.jsxs("div",{className:"pattern-card__info",children:[e.jsx("h3",{className:"pattern-card__title",children:"Responsive Grid"}),e.jsxs("p",{className:"pattern-card__desc",children:["Use ",e.jsx("code",{children:"auto-fit"})," with ",e.jsx("code",{children:"minmax()"})," for fluid column counts"]})]})]}),e.jsxs("div",{className:"pattern-card",children:[e.jsx("div",{className:"pattern-card__preview",children:e.jsxs("div",{className:"demo-sidebar",children:[e.jsx("div",{className:"demo-sidebar__main",children:"Main Content"}),e.jsx("div",{className:"demo-sidebar__side",children:"Sidebar"})]})}),e.jsxs("div",{className:"pattern-card__info",children:[e.jsx("h3",{className:"pattern-card__title",children:"Content + Sidebar"}),e.jsx("p",{className:"pattern-card__desc",children:"Sidebar hides on mobile (≤1024px), content takes full width"})]})]}),e.jsxs("div",{className:"pattern-card",children:[e.jsx("div",{className:"pattern-card__preview",children:e.jsxs("div",{className:"demo-flex demo-flex--col",style:{gap:"8px"},children:[e.jsx("div",{className:"demo-box",children:"Primary CTA"}),e.jsx("div",{className:"demo-box",style:{background:"transparent",border:"2px solid #1B5F8A",color:"#1B5F8A"},children:"Secondary"})]})}),e.jsxs("div",{className:"pattern-card__info",children:[e.jsx("h3",{className:"pattern-card__title",children:"Stacked CTAs"}),e.jsx("p",{className:"pattern-card__desc",children:"Side-by-side buttons stack vertically with full width on mobile"})]})]})]})]}),e.jsxs("section",{className:"docs-section",children:[e.jsx("h2",{className:"docs-section-title",children:"Responsive Utility Classes"}),e.jsx("p",{className:"docs-section-subtitle",children:"Pre-built utility classes for common responsive behaviors."}),e.jsxs("table",{className:"utility-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Class"}),e.jsx("th",{children:"Behavior"}),e.jsx("th",{children:"Breakpoint"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:".u-hide-mobile"})}),e.jsx("td",{className:"desc",children:"Hidden on mobile devices"}),e.jsx("td",{children:e.jsx("code",{children:"≤768px"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:".u-hide-desktop"})}),e.jsx("td",{className:"desc",children:"Hidden on desktop devices"}),e.jsx("td",{children:e.jsx("code",{children:"≥769px"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:".u-show-mobile-only"})}),e.jsx("td",{className:"desc",children:"Only visible on mobile"}),e.jsx("td",{children:e.jsx("code",{children:"≤768px"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:".u-show-desktop-only"})}),e.jsx("td",{className:"desc",children:"Only visible on desktop"}),e.jsx("td",{children:e.jsx("code",{children:"≥769px"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:".u-flex-col-mobile"})}),e.jsx("td",{className:"desc",children:"Flex column on mobile"}),e.jsx("td",{children:e.jsx("code",{children:"≤768px"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:".u-text-center-mobile"})}),e.jsx("td",{className:"desc",children:"Center text on mobile"}),e.jsx("td",{children:e.jsx("code",{children:"≤768px"})})]})]})]})]}),e.jsxs("section",{className:"docs-section",children:[e.jsx("h2",{className:"docs-section-title",children:"Interactive Demo"}),e.jsx("p",{className:"docs-section-subtitle",children:"Drag the corner to resize and see responsive behavior in action."}),e.jsxs("div",{className:"interactive-demo",children:[e.jsx("div",{className:"interactive-demo__title",children:"Resize to test responsiveness"}),e.jsx("div",{className:"resize-demo",children:e.jsxs("div",{className:"responsive-cards",children:[e.jsxs("div",{className:"responsive-card",children:[e.jsx("div",{className:"responsive-card__title",children:"Card 1"}),e.jsx("div",{className:"responsive-card__desc",children:"Responsive grid item"})]}),e.jsxs("div",{className:"responsive-card",children:[e.jsx("div",{className:"responsive-card__title",children:"Card 2"}),e.jsx("div",{className:"responsive-card__desc",children:"Responsive grid item"})]}),e.jsxs("div",{className:"responsive-card",children:[e.jsx("div",{className:"responsive-card__title",children:"Card 3"}),e.jsx("div",{className:"responsive-card__desc",children:"Responsive grid item"})]})]})}),e.jsx("div",{className:"resize-demo__hint",children:"↔ Drag the right edge to resize"})]})]}),e.jsxs("section",{className:"docs-section",children:[e.jsx("h2",{className:"docs-section-title",children:"Best Practices"}),e.jsx("p",{className:"docs-section-subtitle",children:"Guidelines for implementing responsive designs consistently."}),e.jsxs("div",{className:"best-practices",children:[e.jsxs("div",{className:"best-practice best-practice--do",children:[e.jsx("div",{className:"best-practice__icon",children:"✓"}),e.jsxs("div",{className:"best-practice__content",children:[e.jsx("h4",{children:"Use mobile-first approach"}),e.jsxs("p",{children:["Write base styles for mobile, then use ",e.jsx("code",{children:"min-width"})," queries to add complexity for larger screens. This results in smaller CSS and better performance."]})]})]}),e.jsxs("div",{className:"best-practice best-practice--do",children:[e.jsx("div",{className:"best-practice__icon",children:"✓"}),e.jsxs("div",{className:"best-practice__content",children:[e.jsx("h4",{children:"Use consistent breakpoints"}),e.jsx("p",{children:"Always use our defined breakpoints (480px, 768px, 1024px). Avoid custom breakpoints unless absolutely necessary to maintain consistency."})]})]}),e.jsxs("div",{className:"best-practice best-practice--do",children:[e.jsx("div",{className:"best-practice__icon",children:"✓"}),e.jsxs("div",{className:"best-practice__content",children:[e.jsx("h4",{children:"Test on real devices"}),e.jsx("p",{children:"Browser DevTools are helpful, but always test on actual devices. Touch interactions, viewport quirks, and performance differ from simulations."})]})]}),e.jsxs("div",{className:"best-practice best-practice--dont",children:[e.jsx("div",{className:"best-practice__icon",children:"✗"}),e.jsxs("div",{className:"best-practice__content",children:[e.jsx("h4",{children:"Don't hide important content"}),e.jsx("p",{children:"Avoid hiding critical information on mobile. If something is important enough to show on desktop, find a way to present it on mobile too."})]})]}),e.jsxs("div",{className:"best-practice best-practice--dont",children:[e.jsx("div",{className:"best-practice__icon",children:"✗"}),e.jsxs("div",{className:"best-practice__content",children:[e.jsx("h4",{children:"Don't use fixed pixel widths"}),e.jsxs("p",{children:["Avoid hard-coded pixel widths for containers. Use percentages, max-width, or flexible units like ",e.jsx("code",{children:"fr"})," and ",e.jsx("code",{children:"rem"}),"."]})]})]}),e.jsxs("div",{className:"best-practice best-practice--dont",children:[e.jsx("div",{className:"best-practice__icon",children:"✗"}),e.jsxs("div",{className:"best-practice__content",children:[e.jsx("h4",{children:"Don't forget touch targets"}),e.jsx("p",{children:"Interactive elements should be at least 44×44px on mobile. Small buttons and links are frustrating and inaccessible on touch devices."})]})]})]})]}),e.jsxs("section",{className:"docs-section",children:[e.jsx("h2",{className:"docs-section-title",children:"Component Breakpoints"}),e.jsx("p",{className:"docs-section-subtitle",children:"Reference for how specific components respond at different breakpoints."}),e.jsxs("table",{className:"utility-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Component"}),e.jsx("th",{children:"Mobile (≤768px)"}),e.jsx("th",{children:"Desktop (≥1024px)"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("strong",{children:"Header"})}),e.jsx("td",{className:"desc",children:"Hamburger menu, condensed nav"}),e.jsx("td",{className:"desc",children:"Full horizontal navigation"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("strong",{children:"Hero"})}),e.jsx("td",{className:"desc",children:"Stacked layout, smaller image"}),e.jsx("td",{className:"desc",children:"Side-by-side content + image"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("strong",{children:"Vehicle Cards"})}),e.jsx("td",{className:"desc",children:"Full width, 1 column"}),e.jsx("td",{className:"desc",children:"Grid, 3-4 columns"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("strong",{children:"Ad Sidebar"})}),e.jsx("td",{className:"desc",children:"Hidden"}),e.jsx("td",{className:"desc",children:"Visible, sticky positioning"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("strong",{children:"CTAs"})}),e.jsx("td",{className:"desc",children:"Stacked, full width"}),e.jsx("td",{className:"desc",children:"Inline, auto width"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("strong",{children:"Footer"})}),e.jsx("td",{className:"desc",children:"Stacked columns, accordion"}),e.jsx("td",{className:"desc",children:"Multi-column grid"})]})]})]})]})]})]}),n={title:"Foundation/Responsive Design",component:i,parameters:{layout:"fullscreen",docs:{description:{component:`
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
        `}}},tags:["autodocs"]},s={render:()=>e.jsx(i,{})};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: () => <ResponsiveDesignPage />
}`,...s.parameters?.docs?.source}}};const c=["Documentation"];export{s as Documentation,c as __namedExportsOrder,n as default};
