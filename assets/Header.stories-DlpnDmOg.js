import{j as e}from"./iframe-DSpX7gfJ.js";import{H as n}from"./Header-eCWVPw5f.js";import"./preload-helper-PPVm8Dsz.js";import"./vehicleService-BNfwZwSS.js";import"./index-CR0fvk7o.js";import"./useSupabaseRating-DOBwPKzb.js";import"./Button-BbKyFask.js";import"./ExitIntentModal-C3B-dt1I.js";import"./x-DScLs_Nr.js";import"./createLucideIcon-c2qrenrp.js";import"./heart-CiWZGRbV.js";import"./trending-down-BDLnZXsS.js";import"./file-text-B6Oc4SQd.js";import"./OptimizedImage-BDpx0ZiW.js";import"./clock-CSxhA4g8.js";import"./bookmark-DxY1kAvj.js";import"./car-DmkUyLmj.js";import"./chevron-right-DhawbLcQ.js";import"./search-CtFJ2c7Q.js";import"./plus-BvxEkgIO.js";import"./user-iwUa39zU.js";const M={title:"Organisms/Header",component:n,parameters:{layout:"fullscreen",docs:{description:{component:`
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
