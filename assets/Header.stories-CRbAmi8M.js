import{j as e}from"./iframe-DY0pwKZD.js";import{H as i}from"./Header-BN12TKGR.js";import"./preload-helper-PPVm8Dsz.js";import"./vehicleService-DcljwXyi.js";import"./index-Dto8T7jp.js";import"./useSupabaseRating-CtVsvHRv.js";import"./Button-D7Uy95Cp.js";import"./ExitIntentModal-CzCwwamw.js";import"./x-CIIUxbrb.js";import"./createLucideIcon-BnVpXdRz.js";import"./heart-CVhZ8QRH.js";import"./trending-down-DtUsSNiZ.js";import"./file-text-CeQYQTdx.js";import"./OptimizedImage-Dwsg9tK0.js";import"./DealerLocatorMap-B6d8DTap.js";import"./star-DhbpNPfm.js";import"./dealerService-CeBNsEgh.js";import"./award-CFVcHWO-.js";import"./chevron-right-DXR1yLzd.js";import"./map-pin-Bm5oS6DJ.js";import"./phone-1__1L7yM.js";import"./navigation-C2zSYLMS.js";import"./dollar-sign-CwePkbBT.js";import"./clock-D0URR-Gq.js";import"./bookmark-BNZys-cp.js";import"./external-link-B6PNNpq6.js";import"./index.modern-p39hWFFN.js";import"./index-BW0FUBK0.js";import"./index-u3FSFkob.js";import"./chevron-left-BlkA5QK6.js";import"./map-CuKTtqv4.js";import"./MakeOfferModal-Bj3Lrxyx.js";import"./car-D3liD2QZ.js";import"./message-square-fG5apnxC.js";import"./user-BS157Djc.js";import"./mail-C_lgcUmI.js";import"./circle-check-big-1f_jTLrG.js";import"./send-BjDm7EZV.js";import"./chevron-down-DJ-RT_hB.js";import"./loader-circle-CHSHvASG.js";import"./OfferNegotiation-D4dSphdd.js";import"./arrow-right-Bs3_a-tp.js";import"./handshake-YC51AlAA.js";import"./DealerMapModal-ol4BaJY7.js";import"./ContactDealerModal-Derv-u-Z.js";import"./thumbs-up-8tBq0JUk.js";import"./message-circle-BbHm7ilo.js";import"./share-2-D67iHl-6.js";import"./sparkles-CZznvaD4.js";import"./gauge-C20UN3F4.js";import"./fuel-D_2aMBGq.js";import"./chevron-up-Ds5QQBpo.js";import"./trash-2-CEODRxm0.js";import"./search-B6EXHju5.js";import"./check-BjrUTLL2.js";import"./minus-D5t0ND4k.js";import"./plus-DoEbf5vg.js";const pe={title:"Organisms/Header",component:i,parameters:{layout:"fullscreen",docs:{description:{component:`
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
}`,...r.parameters?.docs?.source}}};const me=["Default","WithContent","Mobile"];export{t as Default,r as Mobile,o as WithContent,me as __namedExportsOrder,pe as default};
