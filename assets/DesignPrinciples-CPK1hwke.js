import{j as e}from"./iframe-BjFtNjKF.js";import{useMDXComponents as c}from"./index-DU4SmKyD.js";import{M as l}from"./blocks-CtPR-qzM.js";import"./preload-helper-PPVm8Dsz.js";import"./index-B94bmRne.js";import"./index-DKe5mltf.js";function n(s){const i={p:"p",...c(),...s.components};return e.jsxs(e.Fragment,{children:[`
`,`
`,e.jsx(l,{title:"Documentation/Design Principles"}),`
`,e.jsx("style",{children:`
  .principles-docs {
    max-width: 720px;
    margin: 0 auto;
    font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', sans-serif;
    color: #1d1d1f;
    -webkit-font-smoothing: antialiased;
  }
  
  .principles-header {
    padding: 80px 0 64px;
    border-bottom: 1px solid #d2d2d7;
    margin-bottom: 64px;
  }
  
  .principles-eyebrow {
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #86868b;
    margin-bottom: 16px;
  }
  
  .principles-header h1 {
    font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', sans-serif;
    font-size: 48px;
    font-weight: 600;
    letter-spacing: -0.02em;
    line-height: 1.1;
    margin: 0 0 24px 0;
    color: #1d1d1f;
  }
  
  .principles-header p {
    font-size: 21px;
    font-weight: 400;
    line-height: 1.5;
    color: #424245;
    margin: 0;
  }
  
  .values-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1px;
    background: #d2d2d7;
    border: 1px solid #d2d2d7;
    margin-bottom: 80px;
  }
  
  @media (max-width: 600px) {
    .values-grid {
      grid-template-columns: 1fr;
    }
  }
  
  .value-card {
    text-align: center;
    padding: 40px 24px;
    background: #fff;
  }
  
  .value-card h3 {
    font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', sans-serif;
    font-size: 17px;
    font-weight: 600;
    margin: 0 0 8px 0;
    color: #1d1d1f;
  }
  
  .value-card p {
    font-size: 14px;
    color: #86868b;
    margin: 0;
    line-height: 1.4;
  }
  
  .principle-section {
    margin-bottom: 80px;
  }
  
  .principle-card {
    padding: 48px 0;
    border-bottom: 1px solid #d2d2d7;
  }
  
  .principle-card:first-child {
    border-top: 1px solid #d2d2d7;
  }
  
  .principle-number {
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #86868b;
    margin-bottom: 16px;
  }
  
  .principle-content h2 {
    font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', sans-serif;
    font-size: 28px;
    font-weight: 600;
    letter-spacing: -0.015em;
    color: #1d1d1f;
    margin: 0 0 12px 0;
  }
  
  .principle-tagline {
    font-size: 17px;
    color: #86868b;
    margin: 0 0 24px 0;
  }
  
  .principle-description {
    font-size: 17px;
    color: #424245;
    line-height: 1.65;
    margin: 0 0 32px 0;
  }
  
  .principle-examples {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
  }
  
  @media (max-width: 600px) {
    .principle-examples {
      grid-template-columns: 1fr;
    }
  }
  
  .principle-example {
    padding-left: 16px;
    border-left: 2px solid #d2d2d7;
  }
  
  .principle-example h4 {
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: #86868b;
    margin: 0 0 8px 0;
  }
  
  .principle-example p {
    font-size: 14px;
    color: #424245;
    margin: 0;
    line-height: 1.5;
  }
  
  .quote-block {
    padding: 48px 0;
    margin: 64px 0;
    border-top: 1px solid #d2d2d7;
    border-bottom: 1px solid #d2d2d7;
  }
  
  .quote-block blockquote {
    font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', sans-serif;
    font-size: 24px;
    font-weight: 400;
    letter-spacing: -0.01em;
    color: #1d1d1f;
    margin: 0 0 16px 0;
    line-height: 1.4;
  }
  
  .quote-block cite {
    font-size: 14px;
    color: #86868b;
    font-style: normal;
  }
  
  .color-section h2 {
    font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', sans-serif;
    font-size: 24px;
    font-weight: 600;
    letter-spacing: -0.01em;
    margin: 0 0 12px 0;
    color: #1d1d1f;
  }
  
  .color-section > p {
    color: #86868b;
    margin: 0 0 32px 0;
    line-height: 1.5;
  }
  
  .color-meaning {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1px;
    background: #d2d2d7;
    border: 1px solid #d2d2d7;
    margin: 32px 0;
  }
  
  @media (max-width: 600px) {
    .color-meaning {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  
  .color-meaning-item {
    text-align: center;
    padding: 32px 16px;
  }
  
  .color-meaning-item.dark {
    background: #1d1d1f;
    color: #ffffff;
  }
  
  .color-meaning-item.dark h4,
  .color-meaning-item.dark p {
    color: #ffffff;
  }
  
  .color-meaning-item.medium {
    background: #86868b;
    color: #ffffff;
  }
  
  .color-meaning-item.medium h4,
  .color-meaning-item.medium p {
    color: #ffffff;
  }
  
  .color-meaning-item.light {
    background: #f5f5f7;
    color: #1d1d1f;
  }
  
  .color-meaning-item.white {
    background: #fff;
    color: #1d1d1f;
  }
  
  .color-meaning-item h4 {
    font-size: 14px;
    font-weight: 600;
    margin: 0 0 4px 0;
  }
  
  .color-meaning-item p {
    font-size: 12px;
    margin: 0;
    opacity: 0.8;
  }
  
  .checklist {
    background: #f5f5f7;
    padding: 48px;
    margin: 64px 0;
  }
  
  .checklist h3 {
    font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', sans-serif;
    font-size: 19px;
    font-weight: 600;
    margin: 0 0 12px 0;
    color: #1d1d1f;
  }
  
  .checklist > p {
    color: #86868b;
    margin: 0 0 32px 0;
  }
  
  .checklist-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }
  
  @media (max-width: 600px) {
    .checklist-grid {
      grid-template-columns: 1fr;
    }
  }
  
  .checklist-item {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    padding: 16px;
    background: #fff;
  }
  
  .checklist-icon {
    font-size: 14px;
    color: #1d1d1f;
    flex-shrink: 0;
    margin-top: 1px;
  }
  
  .checklist-text {
    font-size: 14px;
    color: #424245;
    line-height: 1.4;
  }
`}),`
`,e.jsxs("div",{className:"principles-docs",children:[e.jsxs("div",{className:"principles-header",children:[e.jsx("div",{className:"principles-eyebrow",children:"Design System"}),e.jsx("h1",{children:"Design Principles"}),e.jsx("p",{children:e.jsx(i.p,{children:"The fundamental beliefs that guide every design decision. These principles ensure experiences that are clear, consistent, and purposeful."})})]}),e.jsxs("div",{className:"values-grid",children:[e.jsxs("div",{className:"value-card",children:[e.jsx("h3",{children:"Purpose-Driven"}),e.jsx("p",{children:"Every element serves a clear function"})]}),e.jsxs("div",{className:"value-card",children:[e.jsx("h3",{children:"Efficient"}),e.jsx("p",{children:"Minimize steps to achieve goals"})]}),e.jsxs("div",{className:"value-card",children:[e.jsx("h3",{children:"Trustworthy"}),e.jsx("p",{children:"Build confidence through transparency"})]})]}),e.jsxs("div",{className:"principle-section",children:[e.jsxs("div",{className:"principle-card",children:[e.jsx("div",{className:"principle-number",children:"Principle 01"}),e.jsxs("div",{className:"principle-content",children:[e.jsx("h2",{children:"Clarity First"}),e.jsx("p",{className:"principle-tagline",children:"Content takes priority over decoration"}),e.jsx("p",{className:"principle-description",children:e.jsx(i.p,{children:"Users come for information - vehicle specs, prices, reviews. Design should amplify this content, not compete with it. Use whitespace generously, establish clear visual hierarchy, and eliminate anything that doesn't serve the user's goal."})}),e.jsxs("div",{className:"principle-examples",children:[e.jsxs("div",{className:"principle-example",children:[e.jsx("h4",{children:"Typography"}),e.jsx("p",{children:"Clear heading hierarchy from H1 to body text guides the eye naturally"})]}),e.jsxs("div",{className:"principle-example",children:[e.jsx("h4",{children:"Whitespace"}),e.jsx("p",{children:"Generous spacing lets content breathe and reduces cognitive load"})]}),e.jsxs("div",{className:"principle-example",children:[e.jsx("h4",{children:"Focus"}),e.jsx("p",{children:"One primary action per screen prevents decision paralysis"})]})]})]})]}),e.jsxs("div",{className:"principle-card",children:[e.jsx("div",{className:"principle-number",children:"Principle 02"}),e.jsxs("div",{className:"principle-content",children:[e.jsx("h2",{children:"Consistent Patterns"}),e.jsx("p",{className:"principle-tagline",children:"Predictable interactions build confidence"}),e.jsx("p",{className:"principle-description",children:e.jsx(i.p,{children:"Users shouldn't have to relearn how to use the product on every page. Buttons should look and behave the same everywhere. Navigation should be predictable. When patterns are consistent, users can focus on their goals instead of figuring out the interface."})}),e.jsxs("div",{className:"principle-examples",children:[e.jsxs("div",{className:"principle-example",children:[e.jsx("h4",{children:"Components"}),e.jsx("p",{children:"Reusable components ensure visual and behavioral consistency"})]}),e.jsxs("div",{className:"principle-example",children:[e.jsx("h4",{children:"Tokens"}),e.jsx("p",{children:"Design tokens standardize colors, spacing, and typography"})]}),e.jsxs("div",{className:"principle-example",children:[e.jsx("h4",{children:"Patterns"}),e.jsx("p",{children:"Common patterns like forms and modals behave predictably"})]})]})]})]}),e.jsxs("div",{className:"principle-card",children:[e.jsx("div",{className:"principle-number",children:"Principle 03"}),e.jsxs("div",{className:"principle-content",children:[e.jsx("h2",{children:"Accessible by Default"}),e.jsx("p",{className:"principle-tagline",children:"Great design works for everyone"}),e.jsx("p",{className:"principle-description",children:e.jsx(i.p,{children:"Accessibility isn't an afterthought - it's built into every component from the start. We meet WCAG AA standards as a baseline. This means proper color contrast, keyboard navigation, screen reader support, and clear focus indicators. When we design for accessibility, we design better for all."})}),e.jsxs("div",{className:"principle-examples",children:[e.jsxs("div",{className:"principle-example",children:[e.jsx("h4",{children:"Contrast"}),e.jsx("p",{children:"4.5:1 minimum contrast ratio for all text"})]}),e.jsxs("div",{className:"principle-example",children:[e.jsx("h4",{children:"Keyboard"}),e.jsx("p",{children:"Full keyboard navigation with visible focus states"})]}),e.jsxs("div",{className:"principle-example",children:[e.jsx("h4",{children:"Screen Readers"}),e.jsx("p",{children:"Semantic HTML and ARIA labels for assistive tech"})]})]})]})]}),e.jsxs("div",{className:"principle-card",children:[e.jsx("div",{className:"principle-number",children:"Principle 04"}),e.jsxs("div",{className:"principle-content",children:[e.jsx("h2",{children:"Performance Matters"}),e.jsx("p",{className:"principle-tagline",children:"Speed is a feature"}),e.jsx("p",{className:"principle-description",children:e.jsx(i.p,{children:"Every millisecond counts. Slow interfaces frustrate users and hurt conversions. We optimize images, lazy-load below-the-fold content, minimize JavaScript bundles, and design for perceived performance. A fast experience feels more polished and trustworthy."})}),e.jsxs("div",{className:"principle-examples",children:[e.jsxs("div",{className:"principle-example",children:[e.jsx("h4",{children:"Images"}),e.jsx("p",{children:"Optimized formats, responsive sizes, lazy loading"})]}),e.jsxs("div",{className:"principle-example",children:[e.jsx("h4",{children:"Code"}),e.jsx("p",{children:"Tree-shaking, code splitting, minimal dependencies"})]}),e.jsxs("div",{className:"principle-example",children:[e.jsx("h4",{children:"Perception"}),e.jsx("p",{children:"Skeleton screens and progressive loading"})]})]})]})]}),e.jsxs("div",{className:"principle-card",children:[e.jsx("div",{className:"principle-number",children:"Principle 05"}),e.jsxs("div",{className:"principle-content",children:[e.jsx("h2",{children:"Honest and Transparent"}),e.jsx("p",{className:"principle-tagline",children:"Build trust through clarity"}),e.jsx("p",{className:"principle-description",children:e.jsx(i.p,{children:"Car buying is a significant decision. Design should never mislead or manipulate. Prices should be clear, comparisons should be fair, and sponsored content should be labeled. When users trust the interface, they trust the content."})}),e.jsxs("div",{className:"principle-examples",children:[e.jsxs("div",{className:"principle-example",children:[e.jsx("h4",{children:"Pricing"}),e.jsx("p",{children:"Clear, upfront pricing with no hidden fees"})]}),e.jsxs("div",{className:"principle-example",children:[e.jsx("h4",{children:"Labels"}),e.jsx("p",{children:"Sponsored and promotional content clearly marked"})]}),e.jsxs("div",{className:"principle-example",children:[e.jsx("h4",{children:"Feedback"}),e.jsx("p",{children:"Honest error messages that help users recover"})]})]})]})]})]}),e.jsxs("div",{className:"quote-block",children:[e.jsx("blockquote",{children:e.jsx(i.p,{children:'"Good design is as little design as possible. Less, but better - because it concentrates on the essential aspects, and the products are not burdened with non-essentials."'})}),e.jsx("cite",{children:"Dieter Rams"})]}),e.jsxs("div",{className:"color-section",children:[e.jsx("h2",{children:"Color Psychology"}),e.jsx("p",{children:e.jsx(i.p,{children:"Colors communicate meaning and emotion. Each serves a specific purpose."})}),e.jsxs("div",{className:"color-meaning",children:[e.jsxs("div",{className:"color-meaning-item dark",children:[e.jsx("h4",{children:"Black"}),e.jsx("p",{children:"Authority, sophistication"})]}),e.jsxs("div",{className:"color-meaning-item medium",children:[e.jsx("h4",{children:"Gray"}),e.jsx("p",{children:"Balance, professionalism"})]}),e.jsxs("div",{className:"color-meaning-item light",children:[e.jsx("h4",{children:"Light"}),e.jsx("p",{children:"Clarity, openness"})]}),e.jsxs("div",{className:"color-meaning-item white",children:[e.jsx("h4",{children:"White"}),e.jsx("p",{children:"Space, focus"})]})]})]}),e.jsxs("div",{className:"checklist",children:[e.jsx("h3",{children:"Design Review Checklist"}),e.jsx("p",{children:e.jsx(i.p,{children:"Use this checklist when reviewing designs or building new features."})}),e.jsxs("div",{className:"checklist-grid",children:[e.jsxs("div",{className:"checklist-item",children:[e.jsx("span",{className:"checklist-icon",children:"-"}),e.jsx("span",{className:"checklist-text",children:"Is the primary action clear and prominent?"})]}),e.jsxs("div",{className:"checklist-item",children:[e.jsx("span",{className:"checklist-icon",children:"-"}),e.jsx("span",{className:"checklist-text",children:"Does it use design system components?"})]}),e.jsxs("div",{className:"checklist-item",children:[e.jsx("span",{className:"checklist-icon",children:"-"}),e.jsx("span",{className:"checklist-text",children:"Is the color contrast WCAG AA compliant?"})]}),e.jsxs("div",{className:"checklist-item",children:[e.jsx("span",{className:"checklist-icon",children:"-"}),e.jsx("span",{className:"checklist-text",children:"Can it be navigated with keyboard only?"})]}),e.jsxs("div",{className:"checklist-item",children:[e.jsx("span",{className:"checklist-icon",children:"-"}),e.jsx("span",{className:"checklist-text",children:"Are interactive elements at least 44px touch targets?"})]}),e.jsxs("div",{className:"checklist-item",children:[e.jsx("span",{className:"checklist-icon",children:"-"}),e.jsx("span",{className:"checklist-text",children:"Is loading state handled gracefully?"})]}),e.jsxs("div",{className:"checklist-item",children:[e.jsx("span",{className:"checklist-icon",children:"-"}),e.jsx("span",{className:"checklist-text",children:"Are error states helpful and actionable?"})]}),e.jsxs("div",{className:"checklist-item",children:[e.jsx("span",{className:"checklist-icon",children:"-"}),e.jsx("span",{className:"checklist-text",children:"Does it work on mobile (375px) and desktop (1440px)?"})]}),e.jsxs("div",{className:"checklist-item",children:[e.jsx("span",{className:"checklist-icon",children:"-"}),e.jsx("span",{className:"checklist-text",children:"Are images optimized and lazy-loaded?"})]}),e.jsxs("div",{className:"checklist-item",children:[e.jsx("span",{className:"checklist-icon",children:"-"}),e.jsx("span",{className:"checklist-text",children:"Is sponsored content clearly labeled?"})]})]})]})]})]})}function h(s={}){const{wrapper:i}={...c(),...s.components};return i?e.jsx(i,{...s,children:e.jsx(n,{...s})}):n(s)}export{h as default};
