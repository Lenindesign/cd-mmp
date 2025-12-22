import{j as e}from"./iframe-CCFupnSY.js";import{H as n}from"./Header-BZMOi3QK.js";import"./preload-helper-PPVm8Dsz.js";import"./vehicleService-BNfwZwSS.js";import"./index-CR0fvk7o.js";import"./useSupabaseRating-pmYcSgSv.js";import"./Button-wnQ2yPJ0.js";import"./ExitIntentModal-D52mMFTR.js";import"./x-BqMiASkc.js";import"./createLucideIcon-CunauoQi.js";import"./heart-CnWHdjLm.js";import"./trending-down-DpZiTdGr.js";import"./file-text-dIImubZD.js";import"./OptimizedImage-C2XF64Z7.js";import"./clock-0-deK0lu.js";import"./bookmark-S8CeA12s.js";import"./car-C53QNlYQ.js";import"./chevron-right-uUcWZozj.js";import"./search-D4MMLr2W.js";import"./plus-RQQwJ5zt.js";import"./user-BoV0J9rL.js";const M={title:"Organisms/Header",component:n,parameters:{layout:"fullscreen",docs:{description:{component:`
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
