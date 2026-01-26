import{j as e}from"./iframe-XebPOL9h.js";import{useMDXComponents as t}from"./index-DOy4njbV.js";import{M as n}from"./blocks-fJxsgszS.js";import"./preload-helper-PPVm8Dsz.js";import"./index-BmcT5Pd8.js";import"./index-CqIYd8Z0.js";function r(i){const s={p:"p",...t(),...i.components};return e.jsxs(e.Fragment,{children:[`
`,`
`,e.jsx(n,{title:"Documentation/Accessibility Guidelines"}),`
`,e.jsx("style",{children:`
  .a11y-docs {
    max-width: 800px;
    margin: 0 auto;
    font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', sans-serif;
    color: #1d1d1f;
    -webkit-font-smoothing: antialiased;
  }
  
  .a11y-header {
    padding: 80px 0 64px;
    border-bottom: 1px solid #d2d2d7;
    margin-bottom: 64px;
  }
  
  .a11y-eyebrow {
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #86868b;
    margin-bottom: 16px;
  }
  
  .a11y-header h1 {
    font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', sans-serif;
    font-size: 48px;
    font-weight: 600;
    letter-spacing: -0.02em;
    line-height: 1.1;
    margin: 0 0 24px 0;
    color: #1d1d1f;
  }
  
  .a11y-header p {
    font-size: 21px;
    font-weight: 400;
    line-height: 1.5;
    color: #424245;
    margin: 0;
  }
  
  .a11y-section {
    margin-bottom: 64px;
  }
  
  .a11y-section h2 {
    font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', sans-serif;
    font-size: 28px;
    font-weight: 600;
    letter-spacing: -0.015em;
    color: #1d1d1f;
    margin: 0 0 16px 0;
  }
  
  .a11y-section h3 {
    font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', sans-serif;
    font-size: 19px;
    font-weight: 600;
    color: #1d1d1f;
    margin: 32px 0 12px 0;
  }
  
  .a11y-section p {
    font-size: 16px;
    color: #424245;
    margin: 0 0 16px 0;
    line-height: 1.6;
  }
  
  .a11y-table {
    width: 100%;
    border-collapse: collapse;
    margin: 24px 0;
    font-size: 14px;
  }
  
  .a11y-table th {
    text-align: left;
    padding: 16px 20px;
    background: #f5f5f7;
    font-weight: 600;
    font-size: 12px;
    letter-spacing: 0.03em;
    text-transform: uppercase;
    color: #86868b;
    border-bottom: 1px solid #d2d2d7;
  }
  
  .a11y-table td {
    padding: 16px 20px;
    border-bottom: 1px solid #e8e8ed;
    vertical-align: top;
    color: #1d1d1f;
  }
  
  .a11y-table tr:hover td {
    background: #f5f5f7;
  }
  
  .a11y-code {
    background: #f5f5f7;
    padding: 24px;
    margin: 16px 0;
    font-family: 'SF Mono', 'Menlo', 'Monaco', monospace;
    font-size: 13px;
    line-height: 1.6;
    color: #1d1d1f;
    overflow-x: auto;
  }
  
  .a11y-do-dont {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
    margin: 24px 0;
  }
  
  @media (max-width: 600px) {
    .a11y-do-dont {
      grid-template-columns: 1fr;
    }
  }
  
  .a11y-do, .a11y-dont {
    padding: 24px;
    border: 1px solid #d2d2d7;
  }
  
  .a11y-do {
    border-left: 4px solid #26870D;
  }
  
  .a11y-dont {
    border-left: 4px solid #D2232A;
  }
  
  .a11y-do h4, .a11y-dont h4 {
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    margin: 0 0 12px 0;
  }
  
  .a11y-do h4 {
    color: #26870D;
  }
  
  .a11y-dont h4 {
    color: #D2232A;
  }
  
  .a11y-do p, .a11y-dont p {
    font-size: 14px;
    margin: 0;
    color: #424245;
  }
  
  .a11y-checklist {
    list-style: none;
    padding: 0;
    margin: 24px 0;
  }
  
  .a11y-checklist li {
    padding: 12px 0 12px 32px;
    border-bottom: 1px solid #e8e8ed;
    position: relative;
    font-size: 15px;
    color: #1d1d1f;
  }
  
  .a11y-checklist li::before {
    content: '✓';
    position: absolute;
    left: 0;
    color: #26870D;
    font-weight: 600;
  }
  
  .a11y-badge {
    display: inline-block;
    padding: 4px 10px;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.02em;
    background: #f5f5f7;
    color: #1d1d1f;
    margin-right: 8px;
  }
  
  .a11y-badge.required {
    background: #1d1d1f;
    color: #fff;
  }
`}),`
`,e.jsxs("div",{className:"a11y-docs",children:[e.jsxs("div",{className:"a11y-header",children:[e.jsx("div",{className:"a11y-eyebrow",children:"Guidelines"}),e.jsx("h1",{children:"Accessibility"}),e.jsx("p",{children:e.jsx(s.p,{children:"Building inclusive experiences that work for everyone. Our components are designed to meet WCAG 2.1 AA standards."})})]}),e.jsxs("div",{className:"a11y-section",children:[e.jsx("h2",{children:"Standards"}),e.jsx("p",{children:e.jsx(s.p,{children:"All components in this design system are built to meet WCAG 2.1 Level AA compliance. This ensures our interfaces are perceivable, operable, understandable, and robust for all users."})}),e.jsxs("table",{className:"a11y-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Principle"}),e.jsx("th",{children:"Requirement"}),e.jsx("th",{children:"Our Approach"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("strong",{children:"Perceivable"})}),e.jsx("td",{children:"Content must be presentable in ways users can perceive"}),e.jsx("td",{children:"Alt text, color contrast, text alternatives"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("strong",{children:"Operable"})}),e.jsx("td",{children:"Interface must be navigable and usable"}),e.jsx("td",{children:"Keyboard navigation, focus management"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("strong",{children:"Understandable"})}),e.jsx("td",{children:"Information and UI must be understandable"}),e.jsx("td",{children:"Clear labels, error messages, predictable behavior"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("strong",{children:"Robust"})}),e.jsx("td",{children:"Content must work with assistive technologies"}),e.jsx("td",{children:"Semantic HTML, ARIA attributes"})]})]})]})]}),e.jsxs("div",{className:"a11y-section",children:[e.jsx("h2",{children:"Color Contrast"}),e.jsx("p",{children:e.jsx(s.p,{children:"Text and interactive elements must have sufficient contrast against their backgrounds to be readable by users with low vision."})}),e.jsxs("table",{className:"a11y-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Element"}),e.jsx("th",{children:"Minimum Ratio"}),e.jsx("th",{children:"Our Ratio"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:"Normal text (under 18px)"}),e.jsx("td",{children:"4.5:1"}),e.jsx("td",{children:"✓ 7:1+ (Dark Grey on White)"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"Large text (18px+ bold or 24px+)"}),e.jsx("td",{children:"3:1"}),e.jsx("td",{children:"✓ 7:1+"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"UI components and graphics"}),e.jsx("td",{children:"3:1"}),e.jsx("td",{children:"✓ 4.5:1+"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"Focus indicators"}),e.jsx("td",{children:"3:1"}),e.jsx("td",{children:"✓ Uses brand blue (#1B5F8A)"})]})]})]}),e.jsxs("div",{className:"a11y-do-dont",children:[e.jsxs("div",{className:"a11y-do",children:[e.jsx("h4",{children:"Do"}),e.jsx("p",{children:"Use Dark Grey (#222222) text on light backgrounds for maximum readability."})]}),e.jsxs("div",{className:"a11y-dont",children:[e.jsx("h4",{children:"Don't"}),e.jsx("p",{children:"Use light gray text on white backgrounds or rely solely on color to convey meaning."})]})]})]}),e.jsxs("div",{className:"a11y-section",children:[e.jsx("h2",{children:"Keyboard Navigation"}),e.jsx("p",{children:e.jsx(s.p,{children:"All interactive elements must be accessible via keyboard. Users should be able to navigate, activate, and dismiss elements without a mouse."})}),e.jsxs("table",{className:"a11y-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Key"}),e.jsx("th",{children:"Action"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"Tab"})}),e.jsx("td",{children:"Move focus to next interactive element"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"Shift + Tab"})}),e.jsx("td",{children:"Move focus to previous interactive element"})]}),e.jsxs("tr",{children:[e.jsxs("td",{children:[e.jsx("code",{children:"Enter"})," / ",e.jsx("code",{children:"Space"})]}),e.jsx("td",{children:"Activate buttons, links, and controls"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"Escape"})}),e.jsx("td",{children:"Close modals, dropdowns, and overlays"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"Arrow Keys"})}),e.jsx("td",{children:"Navigate within menus, tabs, and radio groups"})]})]})]}),e.jsx("h3",{children:"Focus Indicators"}),e.jsx("p",{children:e.jsx(s.p,{children:"All focusable elements display a visible focus ring. Never remove focus outlines without providing an alternative indicator."})}),e.jsx("pre",{className:"a11y-code",children:`/* Focus styles are built into all components */
.button:focus-visible {
outline: 2px solid var(--color-dark-blue);
outline-offset: 2px;
}`})]}),e.jsxs("div",{className:"a11y-section",children:[e.jsx("h2",{children:"ARIA Guidelines"}),e.jsx("p",{children:e.jsx(s.p,{children:"Use ARIA attributes to enhance accessibility when semantic HTML alone isn't sufficient."})}),e.jsx("h3",{children:"Common Patterns"}),e.jsxs("table",{className:"a11y-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Component"}),e.jsx("th",{children:"ARIA Attributes"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:"Button (loading)"}),e.jsxs("td",{children:[e.jsx("code",{children:'aria-busy="true"'}),", ",e.jsx("code",{children:'aria-disabled="true"'})]})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"Modal"}),e.jsxs("td",{children:[e.jsx("code",{children:'role="dialog"'}),", ",e.jsx("code",{children:'aria-modal="true"'}),", ",e.jsx("code",{children:"aria-labelledby"})]})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"Toast"}),e.jsxs("td",{children:[e.jsx("code",{children:'role="alert"'}),", ",e.jsx("code",{children:'aria-live="polite"'})]})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"Dropdown Menu"}),e.jsxs("td",{children:[e.jsx("code",{children:"aria-expanded"}),", ",e.jsx("code",{children:'aria-haspopup="true"'})]})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"Form Field"}),e.jsxs("td",{children:[e.jsx("code",{children:"aria-invalid"}),", ",e.jsx("code",{children:"aria-describedby"})," (for errors)"]})]})]})]}),e.jsxs("div",{className:"a11y-do-dont",children:[e.jsxs("div",{className:"a11y-do",children:[e.jsx("h4",{children:"Do"}),e.jsx("p",{children:"Use semantic HTML first (button, nav, main, etc.), then enhance with ARIA only when needed."})]}),e.jsxs("div",{className:"a11y-dont",children:[e.jsx("h4",{children:"Don't"}),e.jsxs("p",{children:["Use ARIA to override or duplicate native semantics. Avoid ",e.jsx("code",{children:'role="button"'})," on actual buttons."]})]})]})]}),e.jsxs("div",{className:"a11y-section",children:[e.jsx("h2",{children:"Images and Media"}),e.jsx("h3",{children:"Alt Text"}),e.jsx("p",{children:e.jsx(s.p,{children:"All images must have appropriate alt text. The content depends on the image's purpose."})}),e.jsxs("table",{className:"a11y-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Image Type"}),e.jsx("th",{children:"Alt Text Approach"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:"Vehicle photos"}),e.jsx("td",{children:'Describe the vehicle: "2025 Chevrolet Trax front three-quarter view"'})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"Decorative images"}),e.jsxs("td",{children:["Use empty alt: ",e.jsx("code",{children:'alt=""'})]})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"Icons with text"}),e.jsxs("td",{children:["Use empty alt or ",e.jsx("code",{children:'aria-hidden="true"'})]})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"Icon-only buttons"}),e.jsxs("td",{children:["Add ",e.jsx("code",{children:"aria-label"})," to button: ",e.jsx("code",{children:'aria-label="Close"'})]})]})]})]})]}),e.jsxs("div",{className:"a11y-section",children:[e.jsx("h2",{children:"Forms"}),e.jsxs("ul",{className:"a11y-checklist",children:[e.jsxs("li",{children:["Every input has an associated label (visible or ",e.jsx("code",{children:"aria-label"}),")"]}),e.jsx("li",{children:"Required fields are indicated visually and programmatically"}),e.jsxs("li",{children:["Error messages are associated with inputs via ",e.jsx("code",{children:"aria-describedby"})]}),e.jsx("li",{children:"Form validation doesn't rely solely on color"}),e.jsx("li",{children:"Focus moves to first error on form submission failure"}),e.jsx("li",{children:"Success/error states are announced to screen readers"})]}),e.jsx("pre",{className:"a11y-code",children:`<TextField
label="Email"
type="email"
required
error="Please enter a valid email"
aria-describedby="email-error"
/>`})]}),e.jsxs("div",{className:"a11y-section",children:[e.jsx("h2",{children:"Testing Checklist"}),e.jsx("p",{children:e.jsx(s.p,{children:"Use this checklist when building new components or reviewing existing ones."})}),e.jsxs("ul",{className:"a11y-checklist",children:[e.jsx("li",{children:"Can all functionality be accessed with keyboard only?"}),e.jsx("li",{children:"Is focus order logical and visible?"}),e.jsx("li",{children:"Do all images have appropriate alt text?"}),e.jsx("li",{children:"Is color contrast at least 4.5:1 for text?"}),e.jsx("li",{children:"Are form fields properly labeled?"}),e.jsx("li",{children:"Do error messages provide clear guidance?"}),e.jsx("li",{children:"Can content be zoomed to 200% without loss of functionality?"}),e.jsx("li",{children:"Does the component work with screen readers?"}),e.jsx("li",{children:"Are animations respectful of reduced motion preferences?"})]})]}),e.jsxs("div",{className:"a11y-section",children:[e.jsx("h2",{children:"Tools"}),e.jsxs("table",{className:"a11y-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Tool"}),e.jsx("th",{children:"Purpose"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("strong",{children:"Storybook a11y addon"})}),e.jsx("td",{children:"Automated accessibility checks in component development"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("strong",{children:"axe DevTools"})}),e.jsx("td",{children:"Browser extension for accessibility audits"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("strong",{children:"VoiceOver / NVDA"})}),e.jsx("td",{children:"Screen reader testing"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("strong",{children:"Contrast Checker"})}),e.jsx("td",{children:"Verify color contrast ratios"})]})]})]})]})]})]})}function x(i={}){const{wrapper:s}={...t(),...i.components};return s?e.jsx(s,{...i,children:e.jsx(r,{...i})}):r(i)}export{x as default};
