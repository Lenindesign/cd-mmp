import{j as e}from"./iframe-cxIeY4xe.js";import{H as i}from"./Header-Du85pAyx.js";import"./preload-helper-PPVm8Dsz.js";import"./vehicleService-ByoDejvg.js";import"./index-Dto8T7jp.js";import"./useSupabaseRating-CkT-CMyO.js";import"./Button-Cmw1Vk38.js";import"./ExitIntentModal-ZPg_yMhL.js";import"./x-BdxpChNc.js";import"./createLucideIcon-D2YFKtch.js";import"./heart-CBTxDu9E.js";import"./trending-down-BTCUGRY-.js";import"./file-text-CYke7pzY.js";import"./OptimizedImage-BP_HVZ4l.js";import"./DealerLocatorMap-D7nSpBI7.js";import"./star-BdSMzOYn.js";import"./dealerService-CeBNsEgh.js";import"./award-Br5JCoMi.js";import"./chevron-right-CXuBxHJ2.js";import"./map-pin-BaZ9QAjw.js";import"./phone-CZuXER_G.js";import"./navigation-CdlP0zdo.js";import"./dollar-sign-Dmb6l1FU.js";import"./clock-El8kFutq.js";import"./bookmark-gAzHGdb_.js";import"./external-link-CFwSDy3K.js";import"./index.modern-CU8n-8cy.js";import"./index-BrFGx2PC.js";import"./index-DYhMOzog.js";import"./chevron-left-BuSCitF7.js";import"./map-QY8S_Aji.js";import"./MakeOfferModal-D4rgB0t5.js";import"./car-DXhjvGLO.js";import"./message-square-Dr7L59LN.js";import"./user-CFQzy2tL.js";import"./mail-tKFKgSbi.js";import"./circle-check-big-CyhH2nym.js";import"./send-DspJXxrL.js";import"./chevron-down-pXA4pU1z.js";import"./loader-circle-B-GrOVpF.js";import"./OfferNegotiation-B7uDmTzS.js";import"./arrow-right-CZg9Tard.js";import"./handshake-D3BLi75y.js";import"./DealerMapModal-BS54TvOI.js";import"./gauge-BFDqn3Ew.js";import"./fuel-DgR8O87V.js";import"./check-DNtRCkP7.js";import"./minus-Bp_zLfWh.js";import"./trash-2-DWi9aJsq.js";import"./search-B2hKGUqI.js";import"./plus-Ddb-7nBq.js";import"./sparkles-fX5Zo5dl.js";const re={title:"Organisms/Header",component:i,parameters:{layout:"fullscreen",docs:{description:{component:`
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
}`,...r.parameters?.docs?.source}}};const ie=["Default","WithContent","Mobile"];export{t as Default,r as Mobile,o as WithContent,ie as __namedExportsOrder,re as default};
