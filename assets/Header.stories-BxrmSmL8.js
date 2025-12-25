import{j as e}from"./iframe-BqD4V8Qv.js";import{H as i}from"./Header-BWTxjScG.js";import"./preload-helper-PPVm8Dsz.js";import"./vehicleService-BNfwZwSS.js";import"./index-CR0fvk7o.js";import"./useSupabaseRating-CM2XTrXU.js";import"./Button-BMCgdB4G.js";import"./ExitIntentModal-BwbQMGmg.js";import"./x-CzCrOUtd.js";import"./createLucideIcon-Czx444dS.js";import"./heart-BrnurpBO.js";import"./trending-down-BsM1IMxZ.js";import"./file-text-Du3axr75.js";import"./OptimizedImage-JnlOBJo8.js";import"./DealerLocatorMap-DW5s-MLR.js";import"./star-D8p_S66t.js";import"./dealerService-BucHFuvR.js";import"./chevron-right-DTo1FPXB.js";import"./map-pin-BnLwrezc.js";import"./phone-DxHs-KMG.js";import"./navigation-DiwAR8hv.js";import"./dollar-sign-BkzFHTC8.js";import"./clock-tl-wjtAe.js";import"./bookmark-P_ilvt3E.js";import"./index-DWNljunt.js";import"./index-I4ZmN0cb.js";import"./MakeOfferModal-DtdW_DG7.js";import"./car-c7RzGfW6.js";import"./user-DOOZCI4A.js";import"./mail-BGgHYB7z.js";import"./circle-check-big-CnfxW7Qy.js";import"./chevron-down-BCsf1hCb.js";import"./OfferNegotiation-B0w9Epyb.js";import"./arrow-right-Bheh08tv.js";import"./search-CaYOvDqb.js";import"./plus-BSwnrVAQ.js";const I={title:"Organisms/Header",component:i,parameters:{layout:"fullscreen",docs:{description:{component:`
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
