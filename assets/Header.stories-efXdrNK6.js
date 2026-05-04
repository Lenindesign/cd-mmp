import{j as e}from"./iframe-CZYuxNJ2.js";import{H as i}from"./Header-BJ9SXOOp.js";import"./preload-helper-PPVm8Dsz.js";import"./vehicleService-CnHzEnwN.js";import"./index-B-JoA3P0.js";import"./useSupabaseRating-DziyH13N.js";import"./dealRoutes-XyQ0L3Gs.js";import"./Button-ljdb5Q0C.js";import"./ExitIntentModal-wEHnYhjx.js";import"./x-DD4oP2p0.js";import"./createLucideIcon-CW3QtWCO.js";import"./heart-BmJpxCp5.js";import"./trending-down-qqMixPCv.js";import"./file-text-pHil6R79.js";import"./OptimizedImage-DFWPTJO3.js";import"./DealerLocatorMap-D52Lo_9Q.js";import"./star-DjGKR1ID.js";import"./dealerService-CeBNsEgh.js";import"./award-CwZXnjgq.js";import"./chevron-right-DhJu1s0C.js";import"./map-pin-Cmtsx5Wm.js";import"./phone-CVJ-bJWC.js";import"./navigation-BjCUFFU5.js";import"./dollar-sign-0H7leeAp.js";import"./clock-jdp-Z1Dd.js";import"./bookmark-D27ptR2j.js";import"./external-link-BRaYe0jF.js";import"./index.modern-Y85ShmP-.js";import"./index-CaVVcCXh.js";import"./index-BzQJIyLj.js";import"./chevron-left-Bms0LAG_.js";import"./map-CspsfXu_.js";import"./MakeOfferModal-DpkyNIGi.js";import"./car-7nqDlMQC.js";import"./message-square-Dtn6rM10.js";import"./user-HD-Vilom.js";import"./mail-DCzczuHx.js";import"./send-DLW8adIR.js";import"./check-D9WsF-os.js";import"./circle-alert-CBDAQ8Sd.js";import"./chevron-down-D0DgpgYM.js";import"./loader-circle-DLc4Vh_C.js";import"./OfferNegotiation-DYMreRrp.js";import"./arrow-right-Ds4f_H67.js";import"./handshake-DD-cw2BL.js";import"./circle-check-big-E0lOPe8Q.js";import"./DealerMapModal-DQOoQfGo.js";import"./ContactDealerModal-xoFm_BLI.js";import"./thumbs-up-Xwc_Mqid.js";import"./message-circle-lw3AVH7y.js";import"./share-2-DURAae6H.js";import"./sparkles-C4iyWtNI.js";import"./gauge-C-OwBIC4.js";import"./fuel-BeHmeEpd.js";import"./chevron-up-DGAO3e1C.js";import"./trash-2-KjA81ruZ.js";import"./search-Dwp9iSS2.js";import"./minus-BN5O3LlT.js";import"./Tabs-BUpebdL-.js";import"./plus-D_hrrwSp.js";const de={title:"Organisms/Header",component:i,parameters:{layout:"fullscreen",docs:{description:{component:`
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
}`,...r.parameters?.docs?.source}}};const le=["Default","WithContent","Mobile"];export{t as Default,r as Mobile,o as WithContent,le as __namedExportsOrder,de as default};
