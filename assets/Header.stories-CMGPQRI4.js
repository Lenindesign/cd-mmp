import{j as e}from"./iframe-BDwDJx5t.js";import{H as i}from"./Header-DnHV0nk7.js";import"./preload-helper-PPVm8Dsz.js";import"./vehicleService-BNfwZwSS.js";import"./index-CR0fvk7o.js";import"./useSupabaseRating-CLbf1naW.js";import"./Button-080LYAJV.js";import"./ExitIntentModal-B5JCQQKs.js";import"./x-B3JBZL4p.js";import"./createLucideIcon-nvcdPmaH.js";import"./heart-DFJQlgJk.js";import"./trending-down-B6DqzAIX.js";import"./file-text-eH4dtgpj.js";import"./OptimizedImage-DFqdsFNK.js";import"./DealerLocatorMap-Q36X5MNZ.js";import"./star-B-5KzPTa.js";import"./dealerService-XS5YmmE2.js";import"./chevron-right-Da8Mb8qe.js";import"./map-pin-DORRSJl1.js";import"./phone-CzJUObHk.js";import"./navigation-BhYMJPzD.js";import"./dollar-sign-BXRHIYLU.js";import"./clock-D1IzEPd1.js";import"./bookmark-VCnPOlGQ.js";import"./index-BJmGQk_Z.js";import"./index-DZDs2IQt.js";import"./MakeOfferModal-BZkwCMI2.js";import"./car-DaVJdGlY.js";import"./user-CtYL059y.js";import"./mail-0CaNENLx.js";import"./circle-check-big-OcTfRQ19.js";import"./chevron-down-CGStV66s.js";import"./OfferNegotiation-OFmk7qgo.js";import"./arrow-right-CSZ85atK.js";import"./search-z6SiIs1w.js";import"./plus-BkV4RveR.js";const I={title:"Organisms/Header",component:i,parameters:{layout:"fullscreen",docs:{description:{component:`
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
        `}}},tags:["autodocs"]},t={parameters:{docs:{description:{story:"Default header state with all navigation elements."}}}},o={parameters:{docs:{description:{story:"Header shown with page content below to demonstrate layout integration."}}},render:()=>e.jsxs("div",{children:[e.jsx(i,{}),e.jsxs("div",{style:{padding:"40px",background:"#f5f5f5",minHeight:"400px"},children:[e.jsx("h1",{children:"Page Content"}),e.jsx("p",{children:"The header stays fixed at the top while scrolling."})]})]})},r={parameters:{viewport:{defaultViewport:"mobile"},docs:{description:{story:"Header at mobile viewport showing responsive navigation."}}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
}`,...r.parameters?.docs?.source}}};const L=["Default","WithContent","Mobile"];export{t as Default,r as Mobile,o as WithContent,L as __namedExportsOrder,I as default};
