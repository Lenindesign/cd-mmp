import{j as e}from"./iframe-OHOAWI6D.js";import{useMDXComponents as c}from"./index-xLMfyeQ8.js";import{M as d}from"./blocks-tBkR9Evq.js";import"./preload-helper-PPVm8Dsz.js";import"./index-C24ZV2Ar.js";import"./index-DenWVIFq.js";function n(a){const s={p:"p",...c(),...a.components};return e.jsxs(e.Fragment,{children:[`
`,`
`,e.jsx(d,{title:"Documentation/Component Status"}),`
`,e.jsx("style",{children:`
  .status-docs {
    max-width: 960px;
    margin: 0 auto;
    font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', sans-serif;
    color: #1d1d1f;
    -webkit-font-smoothing: antialiased;
  }
  
  .status-header {
    padding: 80px 0 64px;
    border-bottom: 1px solid #d2d2d7;
    margin-bottom: 64px;
  }
  
  .status-eyebrow {
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #86868b;
    margin-bottom: 16px;
  }
  
  .status-header h1 {
    font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', sans-serif;
    font-size: 48px;
    font-weight: 600;
    letter-spacing: -0.02em;
    line-height: 1.1;
    margin: 0 0 24px 0;
    color: #1d1d1f;
  }
  
  .status-header p {
    font-size: 21px;
    font-weight: 400;
    line-height: 1.5;
    color: #424245;
    margin: 0;
  }
  
  .status-summary {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1px;
    background: #d2d2d7;
    border: 1px solid #d2d2d7;
    margin-bottom: 64px;
  }
  
  @media (max-width: 600px) {
    .status-summary {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  
  .summary-card {
    background: #fff;
    padding: 32px;
    text-align: center;
  }
  
  .summary-number {
    font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', sans-serif;
    font-size: 40px;
    font-weight: 600;
    letter-spacing: -0.02em;
    margin-bottom: 4px;
    color: #1d1d1f;
  }
  
  .summary-label {
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: #86868b;
  }
  
  .status-section {
    margin-bottom: 64px;
  }
  
  .status-section h2 {
    font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', sans-serif;
    font-size: 24px;
    font-weight: 600;
    letter-spacing: -0.01em;
    color: #1d1d1f;
    margin: 0 0 32px 0;
    padding-bottom: 16px;
    border-bottom: 1px solid #d2d2d7;
  }
  
  .component-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 14px;
  }
  
  .component-table th {
    text-align: left;
    padding: 16px 20px;
    background: #f5f5f7;
    font-weight: 600;
    font-size: 11px;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: #86868b;
    border-bottom: 1px solid #d2d2d7;
  }
  
  .component-table td {
    padding: 20px;
    border-bottom: 1px solid #e8e8ed;
    vertical-align: middle;
  }
  
  .component-table tr:hover td {
    background: #f5f5f7;
  }
  
  .component-name {
    font-weight: 600;
    color: #1d1d1f;
  }
  
  .component-name a {
    color: inherit;
    text-decoration: none;
  }
  
  .component-name a:hover {
    text-decoration: underline;
  }
  
  .component-desc {
    font-size: 13px;
    color: #86868b;
    margin-top: 4px;
  }
  
  .status-badge {
    display: inline-block;
    padding: 4px 10px;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.02em;
  }
  
  .status-badge.stable {
    background: #f5f5f7;
    color: #1d1d1f;
  }
  
  .status-badge.beta {
    background: #f5f5f7;
    color: #86868b;
  }
  
  .status-badge.alpha {
    background: #f5f5f7;
    color: #86868b;
    font-style: italic;
  }
  
  .feature-indicator {
    font-size: 13px;
    color: #1d1d1f;
  }
  
  .feature-indicator.partial {
    color: #86868b;
  }
  
  .feature-indicator.no {
    color: #d2d2d7;
  }
  
  .legend {
    display: flex;
    gap: 32px;
    flex-wrap: wrap;
    padding: 24px 0;
    margin-bottom: 48px;
    border-bottom: 1px solid #d2d2d7;
  }
  
  .legend-item {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 13px;
    color: #86868b;
  }
  
  .changelog {
    background: #f5f5f7;
    padding: 40px;
    margin-top: 64px;
  }
  
  .changelog h3 {
    font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', sans-serif;
    font-size: 19px;
    font-weight: 600;
    margin: 0 0 32px 0;
    color: #1d1d1f;
  }
  
  .changelog-item {
    display: flex;
    gap: 24px;
    padding: 16px 0;
    border-bottom: 1px solid #d2d2d7;
  }
  
  .changelog-item:last-child {
    border-bottom: none;
  }
  
  .changelog-date {
    font-size: 13px;
    color: #86868b;
    min-width: 80px;
    font-variant-numeric: tabular-nums;
  }
  
  .changelog-content {
    font-size: 14px;
    color: #1d1d1f;
  }
  
  .changelog-tag {
    display: inline-block;
    padding: 2px 8px;
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.03em;
    text-transform: uppercase;
    margin-right: 8px;
    background: #1d1d1f;
    color: #fff;
  }
  
  .changelog-tag.update {
    background: #86868b;
  }
  
  .changelog-tag.fix {
    background: transparent;
    color: #86868b;
    border: 1px solid #d2d2d7;
  }
`}),`
`,e.jsxs("div",{className:"status-docs",children:[e.jsxs("div",{className:"status-header",children:[e.jsx("div",{className:"status-eyebrow",children:"Design System"}),e.jsx("h1",{children:"Component Status"}),e.jsx("p",{children:e.jsx(s.p,{children:"Track the development status and features of every component."})})]}),e.jsxs("div",{className:"status-summary",children:[e.jsxs("div",{className:"summary-card",children:[e.jsx("div",{className:"summary-number",children:"38"}),e.jsx("div",{className:"summary-label",children:"Stable"})]}),e.jsxs("div",{className:"summary-card",children:[e.jsx("div",{className:"summary-number",children:"9"}),e.jsx("div",{className:"summary-label",children:"Beta"})]}),e.jsxs("div",{className:"summary-card",children:[e.jsx("div",{className:"summary-number",children:"5"}),e.jsx("div",{className:"summary-label",children:"Alpha"})]}),e.jsxs("div",{className:"summary-card",children:[e.jsx("div",{className:"summary-number",children:"52"}),e.jsx("div",{className:"summary-label",children:"Total"})]})]}),e.jsxs("div",{className:"legend",children:[e.jsx("div",{className:"legend-item",children:e.jsxs(s.p,{children:[e.jsx("span",{className:"status-badge stable",children:"Stable"}),`
Production ready`]})}),e.jsx("div",{className:"legend-item",children:e.jsxs(s.p,{children:[e.jsx("span",{className:"status-badge beta",children:"Beta"}),`
API may change`]})}),e.jsx("div",{className:"legend-item",children:e.jsxs(s.p,{children:[e.jsx("span",{className:"status-badge alpha",children:"Alpha"}),`
Experimental`]})}),e.jsx("div",{className:"legend-item",children:e.jsxs(s.p,{children:[e.jsx("span",{className:"feature-indicator",children:"Yes"}),`
Supported`]})}),e.jsx("div",{className:"legend-item",children:e.jsxs(s.p,{children:[e.jsx("span",{className:"feature-indicator partial",children:"Partial"}),`
In progress`]})}),e.jsx("div",{className:"legend-item",children:e.jsxs(s.p,{children:[e.jsx("span",{className:"feature-indicator no",children:"No"}),`
Not yet`]})})]}),e.jsxs("div",{className:"status-section",children:[e.jsx("h2",{children:"Atoms"}),e.jsxs("table",{className:"component-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Component"}),e.jsx("th",{children:"Status"}),e.jsx("th",{children:"A11y"}),e.jsx("th",{children:"Tests"}),e.jsx("th",{children:"Docs"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsxs("td",{children:[e.jsx("div",{className:"component-name",children:e.jsx("a",{href:"?path=/docs/atoms-button--docs",children:"Button"})}),e.jsx("div",{className:"component-desc",children:"Primary interactive element for actions"})]}),e.jsx("td",{children:e.jsx("span",{className:"status-badge stable",children:"Stable"})}),e.jsx("td",{children:e.jsx("span",{className:"feature-indicator",children:"Yes"})}),e.jsx("td",{children:e.jsx("span",{className:"feature-indicator",children:"Yes"})}),e.jsx("td",{children:e.jsx("span",{className:"feature-indicator",children:"Yes"})})]}),e.jsxs("tr",{children:[e.jsxs("td",{children:[e.jsx("div",{className:"component-name",children:e.jsx("a",{href:"?path=/docs/atoms-textfield--docs",children:"TextField"})}),e.jsx("div",{className:"component-desc",children:"Text input with label and validation"})]}),e.jsx("td",{children:e.jsx("span",{className:"status-badge stable",children:"Stable"})}),e.jsx("td",{children:e.jsx("span",{className:"feature-indicator",children:"Yes"})}),e.jsx("td",{children:e.jsx("span",{className:"feature-indicator",children:"Yes"})}),e.jsx("td",{children:e.jsx("span",{className:"feature-indicator",children:"Yes"})})]}),e.jsxs("tr",{children:[e.jsxs("td",{children:[e.jsx("div",{className:"component-name",children:e.jsx("a",{href:"?path=/docs/atoms-toast--docs",children:"Toast"})}),e.jsx("div",{className:"component-desc",children:"Notification messages"})]}),e.jsx("td",{children:e.jsx("span",{className:"status-badge stable",children:"Stable"})}),e.jsx("td",{children:e.jsx("span",{className:"feature-indicator",children:"Yes"})}),e.jsx("td",{children:e.jsx("span",{className:"feature-indicator partial",children:"Partial"})}),e.jsx("td",{children:e.jsx("span",{className:"feature-indicator",children:"Yes"})})]}),e.jsxs("tr",{children:[e.jsxs("td",{children:[e.jsx("div",{className:"component-name",children:e.jsx("a",{href:"?path=/docs/atoms-loadingspinner--docs",children:"LoadingSpinner"})}),e.jsx("div",{className:"component-desc",children:"Loading indicator"})]}),e.jsx("td",{children:e.jsx("span",{className:"status-badge stable",children:"Stable"})}),e.jsx("td",{children:e.jsx("span",{className:"feature-indicator",children:"Yes"})}),e.jsx("td",{children:e.jsx("span",{className:"feature-indicator",children:"Yes"})}),e.jsx("td",{children:e.jsx("span",{className:"feature-indicator",children:"Yes"})})]}),e.jsxs("tr",{children:[e.jsxs("td",{children:[e.jsx("div",{className:"component-name",children:e.jsx("a",{href:"?path=/docs/atoms-optimizedimage--docs",children:"OptimizedImage"})}),e.jsx("div",{className:"component-desc",children:"Lazy-loaded responsive images"})]}),e.jsx("td",{children:e.jsx("span",{className:"status-badge stable",children:"Stable"})}),e.jsx("td",{children:e.jsx("span",{className:"feature-indicator",children:"Yes"})}),e.jsx("td",{children:e.jsx("span",{className:"feature-indicator partial",children:"Partial"})}),e.jsx("td",{children:e.jsx("span",{className:"feature-indicator",children:"Yes"})})]}),e.jsxs("tr",{children:[e.jsxs("td",{children:[e.jsx("div",{className:"component-name",children:e.jsx("a",{href:"?path=/docs/atoms-errorstate--docs",children:"ErrorState"})}),e.jsx("div",{className:"component-desc",children:"Error display component"})]}),e.jsx("td",{children:e.jsx("span",{className:"status-badge stable",children:"Stable"})}),e.jsx("td",{children:e.jsx("span",{className:"feature-indicator",children:"Yes"})}),e.jsx("td",{children:e.jsx("span",{className:"feature-indicator",children:"Yes"})}),e.jsx("td",{children:e.jsx("span",{className:"feature-indicator",children:"Yes"})})]}),e.jsxs("tr",{children:[e.jsxs("td",{children:[e.jsx("div",{className:"component-name",children:"ErrorBoundary"}),e.jsx("div",{className:"component-desc",children:"React error boundary for graceful error handling"})]}),e.jsx("td",{children:e.jsx("span",{className:"status-badge stable",children:"Stable"})}),e.jsx("td",{children:e.jsx("span",{className:"feature-indicator",children:"Yes"})}),e.jsx("td",{children:e.jsx("span",{className:"feature-indicator",children:"Yes"})}),e.jsx("td",{children:e.jsx("span",{className:"feature-indicator",children:"Yes"})})]}),e.jsxs("tr",{children:[e.jsxs("td",{children:[e.jsx("div",{className:"component-name",children:"ScrollToTop"}),e.jsx("div",{className:"component-desc",children:"Utility component for scroll restoration"})]}),e.jsx("td",{children:e.jsx("span",{className:"status-badge stable",children:"Stable"})}),e.jsx("td",{children:e.jsx("span",{className:"feature-indicator",children:"Yes"})}),e.jsx("td",{children:e.jsx("span",{className:"feature-indicator no",children:"No"})}),e.jsx("td",{children:e.jsx("span",{className:"feature-indicator no",children:"No"})})]}),e.jsxs("tr",{children:[e.jsxs("td",{children:[e.jsx("div",{className:"component-name",children:"SEO"}),e.jsx("div",{className:"component-desc",children:"Meta tags and SEO optimization component"})]}),e.jsx("td",{children:e.jsx("span",{className:"status-badge stable",children:"Stable"})}),e.jsx("td",{children:e.jsx("span",{className:"feature-indicator",children:"Yes"})}),e.jsx("td",{children:e.jsx("span",{className:"feature-indicator no",children:"No"})}),e.jsx("td",{children:e.jsx("span",{className:"feature-indicator no",children:"No"})})]})]})]})]}),e.jsxs("div",{className:"status-section",children:[e.jsx("h2",{children:"Molecules"}),e.jsxs("table",{className:"component-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Component"}),e.jsx("th",{children:"Status"}),e.jsx("th",{children:"A11y"}),e.jsx("th",{children:"Tests"}),e.jsx("th",{children:"Docs"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsxs("td",{children:[e.jsx("div",{className:"component-name",children:e.jsx("a",{href:"?path=/docs/molecules-quickspecs--docs",children:"QuickSpecs"})}),e.jsx("div",{className:"component-desc",children:"Vehicle specification display"})]}),e.jsx("td",{children:e.jsx("span",{className:"status-badge stable",children:"Stable"})}),e.jsx("td",{children:e.jsx("span",{className:"feature-indicator",children:"Yes"})}),e.jsx("td",{children:e.jsx("span",{className:"feature-indicator",children:"Yes"})}),e.jsx("td",{children:e.jsx("span",{className:"feature-indicator",children:"Yes"})})]}),e.jsxs("tr",{children:[e.jsxs("td",{children:[e.jsx("div",{className:"component-name",children:e.jsx("a",{href:"?path=/docs/molecules-incentives--docs",children:"Incentives"})}),e.jsx("div",{className:"component-desc",children:"Dealer incentives and offers"})]}),e.jsx("td",{children:e.jsx("span",{className:"status-badge stable",children:"Stable"})}),e.jsx("td",{children:e.jsx("span",{className:"feature-indicator",children:"Yes"})}),e.jsx("td",{children:e.jsx("span",{className:"feature-indicator partial",children:"Partial"})}),e.jsx("td",{children:e.jsx("span",{className:"feature-indicator",children:"Yes"})})]}),e.jsxs("tr",{children:[e.jsxs("td",{children:[e.jsx("div",{className:"component-name",children:e.jsx("a",{href:"?path=/docs/molecules-trimselector--docs",children:"TrimSelector"})}),e.jsx("div",{className:"component-desc",children:"Vehicle trim selection"})]}),e.jsx("td",{children:e.jsx("span",{className:"status-badge stable",children:"Stable"})}),e.jsx("td",{children:e.jsx("span",{className:"feature-indicator",children:"Yes"})}),e.jsx("td",{children:e.jsx("span",{className:"feature-indicator",children:"Yes"})}),e.jsx("td",{children:e.jsx("span",{className:"feature-indicator",children:"Yes"})})]}),e.jsxs("tr",{children:[e.jsxs("td",{children:[e.jsx("div",{className:"component-name",children:e.jsx("a",{href:"?path=/docs/molecules-marketspeed--docs",children:"MarketSpeed"})}),e.jsx("div",{className:"component-desc",children:"Market demand indicator"})]}),e.jsx("td",{children:e.jsx("span",{className:"status-badge stable",children:"Stable"})}),e.jsx("td",{children:e.jsx("span",{className:"feature-indicator",children:"Yes"})}),e.jsx("td",{children:e.jsx("span",{className:"feature-indicator partial",children:"Partial"})}),e.jsx("td",{children:e.jsx("span",{className:"feature-indicator",children:"Yes"})})]}),e.jsxs("tr",{children:[e.jsxs("td",{children:[e.jsx("div",{className:"component-name",children:e.jsx("a",{href:"?path=/docs/molecules-warranty--docs",children:"Warranty"})}),e.jsx("div",{className:"component-desc",children:"Warranty information display"})]}),e.jsx("td",{children:e.jsx("span",{className:"status-badge stable",children:"Stable"})}),e.jsx("td",{children:e.jsx("span",{className:"feature-indicator",children:"Yes"})}),e.jsx("td",{children:e.jsx("span",{className:"feature-indicator",children:"Yes"})}),e.jsx("td",{children:e.jsx("span",{className:"feature-indicator",children:"Yes"})})]}),e.jsxs("tr",{children:[e.jsxs("td",{children:[e.jsx("div",{className:"component-name",children:e.jsx("a",{href:"?path=/docs/molecules-targetpricerange--docs",children:"TargetPriceRange"})}),e.jsx("div",{className:"component-desc",children:"Price range visualization"})]}),e.jsx("td",{children:e.jsx("span",{className:"status-badge stable",children:"Stable"})}),e.jsx("td",{children:e.jsx("span",{className:"feature-indicator",children:"Yes"})}),e.jsx("td",{children:e.jsx("span",{className:"feature-indicator partial",children:"Partial"})}),e.jsx("td",{children:e.jsx("span",{className:"feature-indicator",children:"Yes"})})]}),e.jsxs("tr",{children:[e.jsxs("td",{children:[e.jsx("div",{className:"component-name",children:e.jsx("a",{href:"?path=/docs/molecules-buyingpotential--docs",children:"BuyingPotential"})}),e.jsx("div",{className:"component-desc",children:"Purchase readiness indicator"})]}),e.jsx("td",{children:e.jsx("span",{className:"status-badge beta",children:"Beta"})}),e.jsx("td",{children:e.jsx("span",{className:"feature-indicator",children:"Yes"})}),e.jsx("td",{children:e.jsx("span",{className:"feature-indicator no",children:"No"})}),e.jsx("td",{children:e.jsx("span",{className:"feature-indicator",children:"Yes"})})]}),e.jsxs("tr",{children:[e.jsxs("td",{children:[e.jsx("div",{className:"component-name",children:e.jsx("a",{href:"?path=/docs/molecules-pricehistory--docs",children:"PriceHistory"})}),e.jsx("div",{className:"component-desc",children:"Vehicle depreciation and price forecast chart"})]}),e.jsx("td",{children:e.jsx("span",{className:"status-badge stable",children:"Stable"})}),e.jsx("td",{children:e.jsx("span",{className:"feature-indicator",children:"Yes"})}),e.jsx("td",{children:e.jsx("span",{className:"feature-indicator partial",children:"Partial"})}),e.jsx("td",{children:e.jsx("span",{className:"feature-indicator",children:"Yes"})})]}),e.jsxs("tr",{children:[e.jsxs("td",{children:[e.jsx("div",{className:"component-name",children:e.jsx("a",{href:"?path=/docs/molecules-pricingcta--docs",children:"PricingCTA"})}),e.jsx("div",{className:"component-desc",children:"Pricing call-to-action buttons"})]}),e.jsx("td",{children:e.jsx("span",{className:"status-badge stable",children:"Stable"})}),e.jsx("td",{children:e.jsx("span",{className:"feature-indicator",children:"Yes"})}),e.jsx("td",{children:e.jsx("span",{className:"feature-indicator partial",children:"Partial"})}),e.jsx("td",{children:e.jsx("span",{className:"feature-indicator",children:"Yes"})})]}),e.jsxs("tr",{children:[e.jsxs("td",{children:[e.jsx("div",{className:"component-name",children:e.jsx("a",{href:"?path=/docs/molecules-costtoown--docs",children:"CostToOwn"})}),e.jsx("div",{className:"component-desc",children:"5-year cost of ownership breakdown"})]}),e.jsx("td",{children:e.jsx("span",{className:"status-badge stable",children:"Stable"})}),e.jsx("td",{children:e.jsx("span",{className:"feature-indicator",children:"Yes"})}),e.jsx("td",{children:e.jsx("span",{className:"feature-indicator partial",children:"Partial"})}),e.jsx("td",{children:e.jsx("span",{className:"feature-indicator",children:"Yes"})})]}),e.jsxs("tr",{children:[e.jsxs("td",{children:[e.jsx("div",{className:"component-name",children:e.jsx("a",{href:"?path=/docs/molecules-ratinghistory--docs",children:"RatingHistory"})}),e.jsx("div",{className:"component-desc",children:"Historical rating chart"})]}),e.jsx("td",{children:e.jsx("span",{className:"status-badge beta",children:"Beta"})}),e.jsx("td",{children:e.jsx("span",{className:"feature-indicator",children:"Yes"})}),e.jsx("td",{children:e.jsx("span",{className:"feature-indicator no",children:"No"})}),e.jsx("td",{children:e.jsx("span",{className:"feature-indicator no",children:"No"})})]}),e.jsxs("tr",{children:[e.jsxs("td",{children:[e.jsx("div",{className:"component-name",children:e.jsx("a",{href:"?path=/docs/molecules-bodystyleselector--docs",children:"BodyStyleSelector"})}),e.jsx("div",{className:"component-desc",children:"Vehicle body style filter"})]}),e.jsx("td",{children:e.jsx("span",{className:"status-badge stable",children:"Stable"})}),e.jsx("td",{children:e.jsx("span",{className:"feature-indicator",children:"Yes"})}),e.jsx("td",{children:e.jsx("span",{className:"feature-indicator partial",children:"Partial"})}),e.jsx("td",{children:e.jsx("span",{className:"feature-indicator",children:"Yes"})})]}),e.jsxs("tr",{children:[e.jsxs("td",{children:[e.jsx("div",{className:"component-name",children:e.jsx("a",{href:"?path=/docs/molecules-vehiclecard--docs",children:"VehicleCard"})}),e.jsx("div",{className:"component-desc",children:"Vehicle summary card with image and details"})]}),e.jsx("td",{children:e.jsx("span",{className:"status-badge stable",children:"Stable"})}),e.jsx("td",{children:e.jsx("span",{className:"feature-indicator",children:"Yes"})}),e.jsx("td",{children:e.jsx("span",{className:"feature-indicator partial",children:"Partial"})}),e.jsx("td",{children:e.jsx("span",{className:"feature-indicator",children:"Yes"})})]}),e.jsxs("tr",{children:[e.jsxs("td",{children:[e.jsx("div",{className:"component-name",children:e.jsx("a",{href:"?path=/docs/molecules-whatsmycarworth--docs",children:"WhatsMyCarWorth"})}),e.jsx("div",{className:"component-desc",children:"Trade-in value estimator"})]}),e.jsx("td",{children:e.jsx("span",{className:"status-badge stable",children:"Stable"})}),e.jsx("td",{children:e.jsx("span",{className:"feature-indicator",children:"Yes"})}),e.jsx("td",{children:e.jsx("span",{className:"feature-indicator partial",children:"Partial"})}),e.jsx("td",{children:e.jsx("span",{className:"feature-indicator",children:"Yes"})})]}),e.jsxs("tr",{children:[e.jsxs("td",{children:[e.jsx("div",{className:"component-name",children:e.jsx("a",{href:"?path=/docs/molecules-adbanner--docs",children:"AdBanner"})}),e.jsx("div",{className:"component-desc",children:"Advertisement banner component"})]}),e.jsx("td",{children:e.jsx("span",{className:"status-badge stable",children:"Stable"})}),e.jsx("td",{children:e.jsx("span",{className:"feature-indicator",children:"Yes"})}),e.jsx("td",{children:e.jsx("span",{className:"feature-indicator partial",children:"Partial"})}),e.jsx("td",{children:e.jsx("span",{className:"feature-indicator",children:"Yes"})})]}),e.jsxs("tr",{children:[e.jsxs("td",{children:[e.jsx("div",{className:"component-name",children:e.jsx("a",{href:"?path=/docs/molecules-adsidebar--docs",children:"AdSidebar"})}),e.jsx("div",{className:"component-desc",children:"Sidebar advertisement component"})]}),e.jsx("td",{children:e.jsx("span",{className:"status-badge stable",children:"Stable"})}),e.jsx("td",{children:e.jsx("span",{className:"feature-indicator",children:"Yes"})}),e.jsx("td",{children:e.jsx("span",{className:"feature-indicator partial",children:"Partial"})}),e.jsx("td",{children:e.jsx("span",{className:"feature-indicator",children:"Yes"})})]})]})]})]}),e.jsxs("div",{className:"status-section",children:[e.jsx("h2",{children:"Organisms"}),e.jsxs("table",{className:"component-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Component"}),e.jsx("th",{children:"Status"}),e.jsx("th",{children:"A11y"}),e.jsx("th",{children:"Tests"}),e.jsx("th",{children:"Docs"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsxs("td",{children:[e.jsx("div",{className:"component-name",children:e.jsx("a",{href:"?path=/docs/organisms-header--docs",children:"Header"})}),e.jsx("div",{className:"component-desc",children:"Global navigation header"})]}),e.jsx("td",{children:e.jsx("span",{className:"status-badge stable",children:"Stable"})}),e.jsx("td",{children:e.jsx("span",{className:"feature-indicator",children:"Yes"})}),e.jsx("td",{children:e.jsx("span",{className:"feature-indicator",children:"Yes"})}),e.jsx("td",{children:e.jsx("span",{className:"feature-indicator",children:"Yes"})})]}),e.jsxs("tr",{children:[e.jsxs("td",{children:[e.jsx("div",{className:"component-name",children:e.jsx("a",{href:"?path=/docs/organisms-footer--docs",children:"Footer"})}),e.jsx("div",{className:"component-desc",children:"Global footer with links"})]}),e.jsx("td",{children:e.jsx("span",{className:"status-badge stable",children:"Stable"})}),e.jsx("td",{children:e.jsx("span",{className:"feature-indicator",children:"Yes"})}),e.jsx("td",{children:e.jsx("span",{className:"feature-indicator",children:"Yes"})}),e.jsx("td",{children:e.jsx("span",{className:"feature-indicator",children:"Yes"})})]}),e.jsxs("tr",{children:[e.jsxs("td",{children:[e.jsx("div",{className:"component-name",children:e.jsx("a",{href:"?path=/docs/organisms-hero--docs",children:"Hero"})}),e.jsx("div",{className:"component-desc",children:"Vehicle hero section with image gallery"})]}),e.jsx("td",{children:e.jsx("span",{className:"status-badge stable",children:"Stable"})}),e.jsx("td",{children:e.jsx("span",{className:"feature-indicator",children:"Yes"})}),e.jsx("td",{children:e.jsx("span",{className:"feature-indicator partial",children:"Partial"})}),e.jsx("td",{children:e.jsx("span",{className:"feature-indicator",children:"Yes"})})]}),e.jsxs("tr",{children:[e.jsxs("td",{children:[e.jsx("div",{className:"component-name",children:e.jsx("a",{href:"?path=/docs/organisms-comparison--docs",children:"Comparison"})}),e.jsx("div",{className:"component-desc",children:"Vehicle comparison table"})]}),e.jsx("td",{children:e.jsx("span",{className:"status-badge stable",children:"Stable"})}),e.jsx("td",{children:e.jsx("span",{className:"feature-indicator",children:"Yes"})}),e.jsx("td",{children:e.jsx("span",{className:"feature-indicator",children:"Yes"})}),e.jsx("td",{children:e.jsx("span",{className:"feature-indicator",children:"Yes"})})]}),e.jsxs("tr",{children:[e.jsxs("td",{children:[e.jsx("div",{className:"component-name",children:e.jsx("a",{href:"?path=/docs/organisms-vehicleranking--docs",children:"VehicleRanking"})}),e.jsx("div",{className:"component-desc",children:"Top 10 vehicle rankings"})]}),e.jsx("td",{children:e.jsx("span",{className:"status-badge stable",children:"Stable"})}),e.jsx("td",{children:e.jsx("span",{className:"feature-indicator",children:"Yes"})}),e.jsx("td",{children:e.jsx("span",{className:"feature-indicator",children:"Yes"})}),e.jsx("td",{children:e.jsx("span",{className:"feature-indicator",children:"Yes"})})]}),e.jsxs("tr",{children:[e.jsxs("td",{children:[e.jsx("div",{className:"component-name",children:e.jsx("a",{href:"?path=/docs/organisms-forsalenearyou--docs",children:"ForSaleNearYou"})}),e.jsx("div",{className:"component-desc",children:"Local vehicle listings"})]}),e.jsx("td",{children:e.jsx("span",{className:"status-badge stable",children:"Stable"})}),e.jsx("td",{children:e.jsx("span",{className:"feature-indicator",children:"Yes"})}),e.jsx("td",{children:e.jsx("span",{className:"feature-indicator partial",children:"Partial"})}),e.jsx("td",{children:e.jsx("span",{className:"feature-indicator",children:"Yes"})})]}),e.jsxs("tr",{children:[e.jsxs("td",{children:[e.jsx("div",{className:"component-name",children:e.jsx("a",{href:"?path=/docs/organisms-exitintentmodal--docs",children:"ExitIntentModal"})}),e.jsx("div",{className:"component-desc",children:"Exit intent popup"})]}),e.jsx("td",{children:e.jsx("span",{className:"status-badge beta",children:"Beta"})}),e.jsx("td",{children:e.jsx("span",{className:"feature-indicator",children:"Yes"})}),e.jsx("td",{children:e.jsx("span",{className:"feature-indicator no",children:"No"})}),e.jsx("td",{children:e.jsx("span",{className:"feature-indicator",children:"Yes"})})]}),e.jsxs("tr",{children:[e.jsxs("td",{children:[e.jsx("div",{className:"component-name",children:e.jsx("a",{href:"?path=/docs/organisms-toptencarouselleads--docs",children:"TopTenCarouselLeads"})}),e.jsx("div",{className:"component-desc",children:"Top 10 vehicle carousel"})]}),e.jsx("td",{children:e.jsx("span",{className:"status-badge stable",children:"Stable"})}),e.jsx("td",{children:e.jsx("span",{className:"feature-indicator",children:"Yes"})}),e.jsx("td",{children:e.jsx("span",{className:"feature-indicator partial",children:"Partial"})}),e.jsx("td",{children:e.jsx("span",{className:"feature-indicator",children:"Yes"})})]}),e.jsxs("tr",{children:[e.jsxs("td",{children:[e.jsx("div",{className:"component-name",children:e.jsx("a",{href:"?path=/docs/organisms-vehicleoverview--docs",children:"VehicleOverview"})}),e.jsx("div",{className:"component-desc",children:"Vehicle overview section"})]}),e.jsx("td",{children:e.jsx("span",{className:"status-badge stable",children:"Stable"})}),e.jsx("td",{children:e.jsx("span",{className:"feature-indicator",children:"Yes"})}),e.jsx("td",{children:e.jsx("span",{className:"feature-indicator partial",children:"Partial"})}),e.jsx("td",{children:e.jsx("span",{className:"feature-indicator",children:"Yes"})})]}),e.jsxs("tr",{children:[e.jsxs("td",{children:[e.jsx("div",{className:"component-name",children:e.jsx("a",{href:"?path=/docs/organisms-dealerlocatormap--docs",children:"DealerLocatorMap"})}),e.jsx("div",{className:"component-desc",children:"Interactive dealer map with inventory"})]}),e.jsx("td",{children:e.jsx("span",{className:"status-badge stable",children:"Stable"})}),e.jsx("td",{children:e.jsx("span",{className:"feature-indicator",children:"Yes"})}),e.jsx("td",{children:e.jsx("span",{className:"feature-indicator partial",children:"Partial"})}),e.jsx("td",{children:e.jsx("span",{className:"feature-indicator",children:"Yes"})})]}),e.jsxs("tr",{children:[e.jsxs("td",{children:[e.jsx("div",{className:"component-name",children:e.jsx("a",{href:"?path=/docs/organisms-makeoffermodal--docs",children:"MakeOfferModal"})}),e.jsx("div",{className:"component-desc",children:"Dealer offer submission modal"})]}),e.jsx("td",{children:e.jsx("span",{className:"status-badge beta",children:"Beta"})}),e.jsx("td",{children:e.jsx("span",{className:"feature-indicator",children:"Yes"})}),e.jsx("td",{children:e.jsx("span",{className:"feature-indicator no",children:"No"})}),e.jsx("td",{children:e.jsx("span",{className:"feature-indicator",children:"Yes"})})]}),e.jsxs("tr",{children:[e.jsxs("td",{children:[e.jsx("div",{className:"component-name",children:e.jsx("a",{href:"?path=/docs/organisms-offernegotiation--docs",children:"OfferNegotiation"})}),e.jsx("div",{className:"component-desc",children:"Offer negotiation interface"})]}),e.jsx("td",{children:e.jsx("span",{className:"status-badge alpha",children:"Alpha"})}),e.jsx("td",{children:e.jsx("span",{className:"feature-indicator partial",children:"Partial"})}),e.jsx("td",{children:e.jsx("span",{className:"feature-indicator no",children:"No"})}),e.jsx("td",{children:e.jsx("span",{className:"feature-indicator",children:"Yes"})})]}),e.jsxs("tr",{children:[e.jsxs("td",{children:[e.jsx("div",{className:"component-name",children:e.jsx("a",{href:"?path=/docs/organisms-savedvehiclessidebar--docs",children:"SavedVehiclesSidebar"})}),e.jsx("div",{className:"component-desc",children:"User's saved vehicles panel (My Garage)"})]}),e.jsx("td",{children:e.jsx("span",{className:"status-badge stable",children:"Stable"})}),e.jsx("td",{children:e.jsx("span",{className:"feature-indicator",children:"Yes"})}),e.jsx("td",{children:e.jsx("span",{className:"feature-indicator no",children:"No"})}),e.jsx("td",{children:e.jsx("span",{className:"feature-indicator no",children:"No"})})]}),e.jsxs("tr",{children:[e.jsxs("td",{children:[e.jsx("div",{className:"component-name",children:e.jsx("a",{href:"?path=/docs/organisms-editprofilemodal--docs",children:"EditProfileModal"})}),e.jsx("div",{className:"component-desc",children:"User profile editing modal"})]}),e.jsx("td",{children:e.jsx("span",{className:"status-badge stable",children:"Stable"})}),e.jsx("td",{children:e.jsx("span",{className:"feature-indicator",children:"Yes"})}),e.jsx("td",{children:e.jsx("span",{className:"feature-indicator no",children:"No"})}),e.jsx("td",{children:e.jsx("span",{className:"feature-indicator",children:"Yes"})})]})]})]})]}),e.jsxs("div",{className:"status-section",children:[e.jsx("h2",{children:"Pages"}),e.jsxs("table",{className:"component-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Component"}),e.jsx("th",{children:"Status"}),e.jsx("th",{children:"A11y"}),e.jsx("th",{children:"Tests"}),e.jsx("th",{children:"Docs"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsxs("td",{children:[e.jsx("div",{className:"component-name",children:e.jsx("a",{href:"?path=/docs/pages-vehiclepage--docs",children:"VehiclePage"})}),e.jsx("div",{className:"component-desc",children:"Full vehicle detail page"})]}),e.jsx("td",{children:e.jsx("span",{className:"status-badge stable",children:"Stable"})}),e.jsx("td",{children:e.jsx("span",{className:"feature-indicator",children:"Yes"})}),e.jsx("td",{children:e.jsx("span",{className:"feature-indicator partial",children:"Partial"})}),e.jsx("td",{children:e.jsx("span",{className:"feature-indicator",children:"Yes"})})]}),e.jsxs("tr",{children:[e.jsxs("td",{children:[e.jsx("div",{className:"component-name",children:e.jsx("a",{href:"?path=/docs/pages-vehicleslistpage--docs",children:"VehiclesListPage"})}),e.jsx("div",{className:"component-desc",children:"Vehicle listings page"})]}),e.jsx("td",{children:e.jsx("span",{className:"status-badge stable",children:"Stable"})}),e.jsx("td",{children:e.jsx("span",{className:"feature-indicator",children:"Yes"})}),e.jsx("td",{children:e.jsx("span",{className:"feature-indicator partial",children:"Partial"})}),e.jsx("td",{children:e.jsx("span",{className:"feature-indicator",children:"Yes"})})]}),e.jsxs("tr",{children:[e.jsxs("td",{children:[e.jsx("div",{className:"component-name",children:e.jsx("a",{href:"?path=/docs/pages-vehicleratingeditor--docs",children:"VehicleRatingEditor"})}),e.jsx("div",{className:"component-desc",children:"Admin rating editor"})]}),e.jsx("td",{children:e.jsx("span",{className:"status-badge beta",children:"Beta"})}),e.jsx("td",{children:e.jsx("span",{className:"feature-indicator partial",children:"Partial"})}),e.jsx("td",{children:e.jsx("span",{className:"feature-indicator no",children:"No"})}),e.jsx("td",{children:e.jsx("span",{className:"feature-indicator",children:"Yes"})})]}),e.jsxs("tr",{children:[e.jsxs("td",{children:[e.jsx("div",{className:"component-name",children:e.jsx("a",{href:"?path=/docs/pages-onboarding--docs",children:"Onboarding"})}),e.jsx("div",{className:"component-desc",children:"User onboarding flow (4 steps)"})]}),e.jsx("td",{children:e.jsx("span",{className:"status-badge stable",children:"Stable"})}),e.jsx("td",{children:e.jsx("span",{className:"feature-indicator",children:"Yes"})}),e.jsx("td",{children:e.jsx("span",{className:"feature-indicator no",children:"No"})}),e.jsx("td",{children:e.jsx("span",{className:"feature-indicator",children:"Yes"})})]}),e.jsxs("tr",{children:[e.jsxs("td",{children:[e.jsx("div",{className:"component-name",children:"HomePage"}),e.jsx("div",{className:"component-desc",children:"Main landing page"})]}),e.jsx("td",{children:e.jsx("span",{className:"status-badge stable",children:"Stable"})}),e.jsx("td",{children:e.jsx("span",{className:"feature-indicator",children:"Yes"})}),e.jsx("td",{children:e.jsx("span",{className:"feature-indicator no",children:"No"})}),e.jsx("td",{children:e.jsx("span",{className:"feature-indicator no",children:"No"})})]}),e.jsxs("tr",{children:[e.jsxs("td",{children:[e.jsx("div",{className:"component-name",children:"RankingsPage"}),e.jsx("div",{className:"component-desc",children:"Vehicle rankings by category"})]}),e.jsx("td",{children:e.jsx("span",{className:"status-badge stable",children:"Stable"})}),e.jsx("td",{children:e.jsx("span",{className:"feature-indicator",children:"Yes"})}),e.jsx("td",{children:e.jsx("span",{className:"feature-indicator no",children:"No"})}),e.jsx("td",{children:e.jsx("span",{className:"feature-indicator no",children:"No"})})]}),e.jsxs("tr",{children:[e.jsxs("td",{children:[e.jsx("div",{className:"component-name",children:"UsedCarsPage"}),e.jsx("div",{className:"component-desc",children:"Used car listings page"})]}),e.jsx("td",{children:e.jsx("span",{className:"status-badge beta",children:"Beta"})}),e.jsx("td",{children:e.jsx("span",{className:"feature-indicator",children:"Yes"})}),e.jsx("td",{children:e.jsx("span",{className:"feature-indicator no",children:"No"})}),e.jsx("td",{children:e.jsx("span",{className:"feature-indicator no",children:"No"})})]}),e.jsxs("tr",{children:[e.jsxs("td",{children:[e.jsx("div",{className:"component-name",children:"MyAccount"}),e.jsx("div",{className:"component-desc",children:"User account settings page"})]}),e.jsx("td",{children:e.jsx("span",{className:"status-badge stable",children:"Stable"})}),e.jsx("td",{children:e.jsx("span",{className:"feature-indicator",children:"Yes"})}),e.jsx("td",{children:e.jsx("span",{className:"feature-indicator no",children:"No"})}),e.jsx("td",{children:e.jsx("span",{className:"feature-indicator no",children:"No"})})]}),e.jsxs("tr",{children:[e.jsxs("td",{children:[e.jsx("div",{className:"component-name",children:"NotFoundPage"}),e.jsx("div",{className:"component-desc",children:"404 error page"})]}),e.jsx("td",{children:e.jsx("span",{className:"status-badge stable",children:"Stable"})}),e.jsx("td",{children:e.jsx("span",{className:"feature-indicator",children:"Yes"})}),e.jsx("td",{children:e.jsx("span",{className:"feature-indicator no",children:"No"})}),e.jsx("td",{children:e.jsx("span",{className:"feature-indicator no",children:"No"})})]}),e.jsxs("tr",{children:[e.jsxs("td",{children:[e.jsx("div",{className:"component-name",children:"DesignSystem"}),e.jsx("div",{className:"component-desc",children:"Design system documentation page"})]}),e.jsx("td",{children:e.jsx("span",{className:"status-badge stable",children:"Stable"})}),e.jsx("td",{children:e.jsx("span",{className:"feature-indicator",children:"Yes"})}),e.jsx("td",{children:e.jsx("span",{className:"feature-indicator no",children:"No"})}),e.jsx("td",{children:e.jsx("span",{className:"feature-indicator no",children:"No"})})]}),e.jsxs("tr",{children:[e.jsxs("td",{children:[e.jsx("div",{className:"component-name",children:"CardAudit"}),e.jsx("div",{className:"component-desc",children:"Component card audit page"})]}),e.jsx("td",{children:e.jsx("span",{className:"status-badge alpha",children:"Alpha"})}),e.jsx("td",{children:e.jsx("span",{className:"feature-indicator partial",children:"Partial"})}),e.jsx("td",{children:e.jsx("span",{className:"feature-indicator no",children:"No"})}),e.jsx("td",{children:e.jsx("span",{className:"feature-indicator no",children:"No"})})]})]})]})]}),e.jsxs("div",{className:"status-section",children:[e.jsx("h2",{children:"Resin Design System"}),e.jsxs("table",{className:"component-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Component"}),e.jsx("th",{children:"Status"}),e.jsx("th",{children:"A11y"}),e.jsx("th",{children:"Tests"}),e.jsx("th",{children:"Docs"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsxs("td",{children:[e.jsx("div",{className:"component-name",children:"ResinButton"}),e.jsx("div",{className:"component-desc",children:"Resin design system button"})]}),e.jsx("td",{children:e.jsx("span",{className:"status-badge alpha",children:"Alpha"})}),e.jsx("td",{children:e.jsx("span",{className:"feature-indicator",children:"Yes"})}),e.jsx("td",{children:e.jsx("span",{className:"feature-indicator no",children:"No"})}),e.jsx("td",{children:e.jsx("span",{className:"feature-indicator partial",children:"Partial"})})]}),e.jsxs("tr",{children:[e.jsxs("td",{children:[e.jsx("div",{className:"component-name",children:"ResinCard"}),e.jsx("div",{className:"component-desc",children:"Resin design system card"})]}),e.jsx("td",{children:e.jsx("span",{className:"status-badge alpha",children:"Alpha"})}),e.jsx("td",{children:e.jsx("span",{className:"feature-indicator",children:"Yes"})}),e.jsx("td",{children:e.jsx("span",{className:"feature-indicator no",children:"No"})}),e.jsx("td",{children:e.jsx("span",{className:"feature-indicator partial",children:"Partial"})})]}),e.jsxs("tr",{children:[e.jsxs("td",{children:[e.jsx("div",{className:"component-name",children:"ResinInput"}),e.jsx("div",{className:"component-desc",children:"Resin design system input"})]}),e.jsx("td",{children:e.jsx("span",{className:"status-badge alpha",children:"Alpha"})}),e.jsx("td",{children:e.jsx("span",{className:"feature-indicator",children:"Yes"})}),e.jsx("td",{children:e.jsx("span",{className:"feature-indicator no",children:"No"})}),e.jsx("td",{children:e.jsx("span",{className:"feature-indicator partial",children:"Partial"})})]})]})]})]}),e.jsxs("div",{className:"changelog",children:[e.jsx("h3",{children:"Recent Updates"}),e.jsxs("div",{className:"changelog-item",children:[e.jsx("div",{className:"changelog-date",children:"Dec 2024"}),e.jsx("div",{className:"changelog-content",children:e.jsxs(s.p,{children:[e.jsx("span",{className:"changelog-tag",children:"New"}),`
Complete component audit: Added 16 missing components to status page`]})})]}),e.jsxs("div",{className:"changelog-item",children:[e.jsx("div",{className:"changelog-date",children:"Dec 2024"}),e.jsx("div",{className:"changelog-content",children:e.jsxs(s.p,{children:[e.jsx("span",{className:"changelog-tag update",children:"Update"}),`
Added DealerLocatorMap, SavedVehiclesSidebar, PriceHistory, and 7 new pages`]})})]}),e.jsxs("div",{className:"changelog-item",children:[e.jsx("div",{className:"changelog-date",children:"Dec 2024"}),e.jsx("div",{className:"changelog-content",children:e.jsxs(s.p,{children:[e.jsx("span",{className:"changelog-tag update",children:"Update"}),`
Added Resin Design System section with experimental components`]})})]}),e.jsxs("div",{className:"changelog-item",children:[e.jsx("div",{className:"changelog-date",children:"Dec 2024"}),e.jsx("div",{className:"changelog-content",children:e.jsxs(s.p,{children:[e.jsx("span",{className:"changelog-tag",children:"New"}),`
Added Accessibility Guidelines and Responsive Patterns documentation`]})})]}),e.jsxs("div",{className:"changelog-item",children:[e.jsx("div",{className:"changelog-date",children:"Dec 2024"}),e.jsx("div",{className:"changelog-content",children:e.jsxs(s.p,{children:[e.jsx("span",{className:"changelog-tag update",children:"Update"}),`
Enhanced component documentation with usage guidelines and best practices`]})})]})]})]})]})}function x(a={}){const{wrapper:s}={...c(),...a.components};return s?e.jsx(s,{...a,children:e.jsx(n,{...a})}):n(a)}export{x as default};
