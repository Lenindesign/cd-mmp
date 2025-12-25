import{j as e}from"./iframe-BqD4V8Qv.js";import"./preload-helper-PPVm8Dsz.js";const a={title:"Design System/Component Patterns",parameters:{layout:"fullscreen",docs:{description:{component:"Real-world examples of how to compose components to build common UI patterns."}}},tags:["autodocs"]},s={name:"Pattern Overview",parameters:{chromatic:{disableSnapshot:!0}},render:()=>e.jsxs(e.Fragment,{children:[e.jsx("style",{children:`
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
          
          .pattern-card {
            margin-bottom: 48px;
            padding-bottom: 48px;
            border-bottom: 1px solid #e8e8ed;
          }
          
          .pattern-card:last-child {
            border-bottom: none;
            margin-bottom: 0;
            padding-bottom: 0;
          }
          
          .pattern-title {
            font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', sans-serif;
            font-size: 21px;
            font-weight: 600;
            color: #1d1d1f;
            margin: 0 0 12px 0;
          }
          
          .pattern-desc {
            font-size: 15px;
            color: #424245;
            margin: 0 0 24px 0;
            line-height: 1.6;
          }
          
          .docs-code-block {
            background: #1d1d1f;
            padding: 24px;
            margin-bottom: 24px;
            overflow: hidden;
          }
          
          .docs-code-content {
            font-family: 'SF Mono', 'Menlo', 'Monaco', monospace;
            font-size: 13px;
            line-height: 1.7;
            color: #f5f5f7;
            margin: 0;
            overflow-x: auto;
          }
          
          .pattern-use {
            font-size: 13px;
            color: #86868b;
          }
          
          .pattern-use strong {
            font-weight: 600;
            color: #1d1d1f;
          }
        `}),e.jsxs("div",{className:"docs-container",children:[e.jsxs("div",{className:"docs-header",children:[e.jsx("div",{className:"docs-eyebrow",children:"Guidelines"}),e.jsx("h1",{children:"Component Patterns"}),e.jsx("p",{children:"Real-world examples of how to compose components to build common UI patterns."})]}),e.jsxs("div",{className:"docs-section",children:[e.jsxs("div",{className:"pattern-card",children:[e.jsx("h2",{className:"pattern-title",children:"Vehicle Detail"}),e.jsx("p",{className:"pattern-desc",children:"The standard pattern for displaying vehicle details. Combines Hero, QuickSpecs, and TrimSelector to create a comprehensive vehicle overview page."}),e.jsx("pre",{className:"docs-code-block",children:e.jsx("code",{className:"docs-code-content",children:`<Hero vehicle={vehicle} />
<QuickSpecs specs={vehicle.specs} />
<TrimSelector trims={trims} currentTrim={vehicle.trim} />`})}),e.jsxs("p",{className:"pattern-use",children:[e.jsx("strong",{children:"Use when: "}),"Displaying a single vehicle with full details and trim options."]})]}),e.jsxs("div",{className:"pattern-card",children:[e.jsx("h2",{className:"pattern-title",children:"Rankings"}),e.jsx("p",{className:"pattern-desc",children:"Display top-rated vehicles in a category. Uses TopTenCarouselLeads or VehicleRanking to showcase editor's picks and most popular vehicles."}),e.jsx("pre",{className:"docs-code-block",children:e.jsx("code",{className:"docs-code-content",children:`<TopTenCarouselLeads 
  vehicles={topTenVehicles}
  category="Sedans"
/>`})}),e.jsxs("p",{className:"pattern-use",children:[e.jsx("strong",{children:"Use when: "}),"Showing curated lists, rankings, or featured vehicles."]})]}),e.jsxs("div",{className:"pattern-card",children:[e.jsx("h2",{className:"pattern-title",children:"Shopping"}),e.jsx("p",{className:"pattern-desc",children:"Help users find vehicles for sale. Combines ForSaleNearYou with BuyingPotential to show local inventory and purchasing options."}),e.jsx("pre",{className:"docs-code-block",children:e.jsx("code",{className:"docs-code-content",children:`<ForSaleNearYou 
  listings={nearbyListings}
  zipCode="10001"
/>
<BuyingPotential 
  price={vehicle.price}
  msrp={vehicle.msrp}
/>`})}),e.jsxs("p",{className:"pattern-use",children:[e.jsx("strong",{children:"Use when: "}),"Users are ready to purchase or want to see local inventory."]})]})]})]})]})};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  name: 'Pattern Overview',
  parameters: {
    chromatic: {
      disableSnapshot: true
    }
  },
  render: () => <>
      <style>
        {\`
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
          
          .pattern-card {
            margin-bottom: 48px;
            padding-bottom: 48px;
            border-bottom: 1px solid #e8e8ed;
          }
          
          .pattern-card:last-child {
            border-bottom: none;
            margin-bottom: 0;
            padding-bottom: 0;
          }
          
          .pattern-title {
            font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', sans-serif;
            font-size: 21px;
            font-weight: 600;
            color: #1d1d1f;
            margin: 0 0 12px 0;
          }
          
          .pattern-desc {
            font-size: 15px;
            color: #424245;
            margin: 0 0 24px 0;
            line-height: 1.6;
          }
          
          .docs-code-block {
            background: #1d1d1f;
            padding: 24px;
            margin-bottom: 24px;
            overflow: hidden;
          }
          
          .docs-code-content {
            font-family: 'SF Mono', 'Menlo', 'Monaco', monospace;
            font-size: 13px;
            line-height: 1.7;
            color: #f5f5f7;
            margin: 0;
            overflow-x: auto;
          }
          
          .pattern-use {
            font-size: 13px;
            color: #86868b;
          }
          
          .pattern-use strong {
            font-weight: 600;
            color: #1d1d1f;
          }
        \`}
      </style>
      <div className="docs-container">
        <div className="docs-header">
          <div className="docs-eyebrow">Guidelines</div>
          <h1>Component Patterns</h1>
          <p>
            Real-world examples of how to compose components to build common UI patterns.
          </p>
        </div>

        <div className="docs-section">
          <div className="pattern-card">
            <h2 className="pattern-title">Vehicle Detail</h2>
            <p className="pattern-desc">
              The standard pattern for displaying vehicle details. Combines Hero, QuickSpecs, and TrimSelector
              to create a comprehensive vehicle overview page.
            </p>
            <pre className="docs-code-block">
              <code className="docs-code-content">
              {\`<Hero vehicle={vehicle} />
<QuickSpecs specs={vehicle.specs} />
<TrimSelector trims={trims} currentTrim={vehicle.trim} />\`}
              </code>
            </pre>
            <p className="pattern-use">
              <strong>Use when: </strong>
              Displaying a single vehicle with full details and trim options.
            </p>
          </div>

          <div className="pattern-card">
            <h2 className="pattern-title">Rankings</h2>
            <p className="pattern-desc">
              Display top-rated vehicles in a category. Uses TopTenCarouselLeads or VehicleRanking
              to showcase editor's picks and most popular vehicles.
            </p>
            <pre className="docs-code-block">
              <code className="docs-code-content">
              {\`<TopTenCarouselLeads 
  vehicles={topTenVehicles}
  category="Sedans"
/>\`}
              </code>
            </pre>
            <p className="pattern-use">
              <strong>Use when: </strong>
              Showing curated lists, rankings, or featured vehicles.
            </p>
          </div>

          <div className="pattern-card">
            <h2 className="pattern-title">Shopping</h2>
            <p className="pattern-desc">
              Help users find vehicles for sale. Combines ForSaleNearYou with BuyingPotential
              to show local inventory and purchasing options.
            </p>
            <pre className="docs-code-block">
              <code className="docs-code-content">
              {\`<ForSaleNearYou 
  listings={nearbyListings}
  zipCode="10001"
/>
<BuyingPotential 
  price={vehicle.price}
  msrp={vehicle.msrp}
/>\`}
              </code>
            </pre>
            <p className="pattern-use">
              <strong>Use when: </strong>
              Users are ready to purchase or want to see local inventory.
            </p>
          </div>
        </div>
      </div>
    </>
}`,...s.parameters?.docs?.source}}};const i=["Overview"];export{s as Overview,i as __namedExportsOrder,a as default};
