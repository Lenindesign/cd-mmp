import{j as e}from"./iframe-vf1kZbcO.js";import{H as i}from"./Header-N0YUC2D3.js";import"./preload-helper-PPVm8Dsz.js";import"./vehicleService-DSnLjH3g.js";import"./index-BirN2__4.js";import"./useSupabaseRating-BJfIflyA.js";import"./dealRoutes-CRJk03s6.js";import"./Button-uTZLB7w8.js";import"./ExitIntentModal-CDlZMrKR.js";import"./x-BTOgE8sR.js";import"./createLucideIcon-B_Z30Vsv.js";import"./heart-2rSfd2E-.js";import"./trending-down-1I5kAMKX.js";import"./file-text-CzmxblIZ.js";import"./OptimizedImage-D2DPRfei.js";import"./DealerLocatorMap-izjCcGcQ.js";import"./star-KrA556DQ.js";import"./dealerService-CeBNsEgh.js";import"./award-DvD7S_ym.js";import"./chevron-right-okDqqDko.js";import"./map-pin-D9JNkHrR.js";import"./phone-CwE7C-MA.js";import"./navigation-DsDiTlOE.js";import"./dollar-sign-CmFAxI7r.js";import"./clock-C8ZZehsE.js";import"./bookmark-DMDlQ7qQ.js";import"./external-link-DPms1KA-.js";import"./index.modern-CTCakaKG.js";import"./index-7_iKiCPi.js";import"./index-Dd1k0VJD.js";import"./chevron-left-D7rNgtGO.js";import"./map-BQQC2a6c.js";import"./MakeOfferModal-De_exayD.js";import"./car-HmXsbRv7.js";import"./message-square-C2wkOUGJ.js";import"./user-6Cf3h0bl.js";import"./mail-DsMFEgGx.js";import"./send-D-Jg7gEM.js";import"./check-HYWlosSY.js";import"./circle-alert-yQZxs6_r.js";import"./chevron-down-C6SDo4fP.js";import"./loader-circle-D0MHT8bY.js";import"./OfferNegotiation-3M5JEhnG.js";import"./arrow-right-D7ufMPFN.js";import"./handshake-frJgOM2n.js";import"./circle-check-big-BcKWkfs7.js";import"./DealerMapModal-CJPirNVl.js";import"./ContactDealerModal-Br150OqD.js";import"./thumbs-up-DPnl9YMz.js";import"./message-circle-BhFdK_nA.js";import"./share-2-DqQvPDu4.js";import"./sparkles-FYXtZZLT.js";import"./gauge-3kwISqdh.js";import"./fuel-DVsU0JaD.js";import"./chevron-up-DZ2ZFCDG.js";import"./trash-2-BNbygOQl.js";import"./search-BHJMgAWm.js";import"./minus-BkO1vpcy.js";import"./plus-C1_ukeT4.js";const ce={title:"Organisms/Header",component:i,parameters:{layout:"fullscreen",docs:{description:{component:`
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
}`,...r.parameters?.docs?.source}}};const de=["Default","WithContent","Mobile"];export{t as Default,r as Mobile,o as WithContent,de as __namedExportsOrder,ce as default};
