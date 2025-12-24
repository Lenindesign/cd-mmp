import{j as e}from"./iframe-BjFtNjKF.js";import{H as n}from"./Header-BNUz87HS.js";import"./preload-helper-PPVm8Dsz.js";import"./vehicleService-BNfwZwSS.js";import"./index-CR0fvk7o.js";import"./useSupabaseRating-BK0Xeons.js";import"./Button-2O6vy2jL.js";import"./ExitIntentModal-CQHBJjMP.js";import"./x-BU8ylF0A.js";import"./createLucideIcon-DfJbe4c6.js";import"./heart-DNam0twI.js";import"./trending-down-BP0kpthU.js";import"./file-text-Xf7hbhBr.js";import"./OptimizedImage-DiXihJ5v.js";import"./clock-CX1iZnGk.js";import"./bookmark-C2mns5iY.js";import"./car-P_stiV5i.js";import"./chevron-right-Do8qR6Qb.js";import"./search-B7qDtkeA.js";import"./plus-DRhDH1ie.js";import"./user-DU9S-4ZO.js";const M={title:"Organisms/Header",component:n,parameters:{layout:"fullscreen",docs:{description:{component:`
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
