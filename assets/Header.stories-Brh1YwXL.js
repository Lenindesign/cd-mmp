import{j as e}from"./iframe-DvCa2y-O.js";import{H as n}from"./Header-E6IkbEdh.js";import"./preload-helper-PPVm8Dsz.js";import"./vehicleService-BNfwZwSS.js";import"./index-CR0fvk7o.js";import"./useSupabaseRating-BjYMosuq.js";import"./Button-dKnoXSd3.js";import"./ExitIntentModal-ASF6hYrU.js";import"./x-BAh6ppEz.js";import"./createLucideIcon-BGRcve6n.js";import"./heart-DjwB3xnw.js";import"./trending-down-u_nOT57c.js";import"./file-text-No-nUgTz.js";import"./OptimizedImage-Bm2OyWcY.js";import"./clock-B1EBv9lg.js";import"./bookmark-rv4ZFbeF.js";import"./car-CjgC7ye2.js";import"./chevron-right-Bvhi7boe.js";import"./search-DS5qK7bJ.js";import"./plus-C2dT6-BK.js";import"./user-CvyVYryy.js";const M={title:"Organisms/Header",component:n,parameters:{layout:"fullscreen",docs:{description:{component:`
# Header

Global navigation header that appears on every page of the application.

---

## Features

| Element | Purpose |
|---------|---------|
| **Logo** | Brand identity, links to homepage |
| **Navigation** | Main site sections (Reviews, Rankings, etc.) |
| **Search** | Quick vehicle search access |
| **User Menu** | Account actions and saved vehicles |

---

## Responsive Behavior

| Breakpoint | Behavior |
|------------|----------|
| Desktop (>768px) | Full navigation visible |
| Mobile (<768px) | Hamburger menu, compact search |

---

## Accessibility

- Skip link for keyboard users
- Dropdown menus keyboard navigable
- ARIA labels on interactive elements
- Focus management on menu open/close
        `}}},tags:["autodocs"]},t={parameters:{docs:{description:{story:"Default header state with all navigation elements."}}}},o={parameters:{docs:{description:{story:"Header shown with page content below to demonstrate layout integration."}}},render:()=>e.jsxs("div",{children:[e.jsx(n,{}),e.jsxs("div",{style:{padding:"40px",background:"#f5f5f5",minHeight:"400px"},children:[e.jsx("h1",{children:"Page Content"}),e.jsx("p",{children:"The header stays fixed at the top while scrolling."})]})]})},r={parameters:{viewport:{defaultViewport:"mobile"},docs:{description:{story:"Header at mobile viewport showing responsive navigation."}}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: 'Default header state with all navigation elements.'
      }
    }
  }
}`,...t.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: 'Header shown with page content below to demonstrate layout integration.'
      }
    }
  },
  render: () => <div>
      <Header />
      <div style={{
      padding: '40px',
      background: '#f5f5f5',
      minHeight: '400px'
    }}>
        <h1>Page Content</h1>
        <p>The header stays fixed at the top while scrolling.</p>
      </div>
    </div>
}`,...o.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  parameters: {
    viewport: {
      defaultViewport: 'mobile'
    },
    docs: {
      description: {
        story: 'Header at mobile viewport showing responsive navigation.'
      }
    }
  }
}`,...r.parameters?.docs?.source}}};const R=["Default","WithContent","Mobile"];export{t as Default,r as Mobile,o as WithContent,R as __namedExportsOrder,M as default};
