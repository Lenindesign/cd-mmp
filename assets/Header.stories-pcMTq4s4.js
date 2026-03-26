import{j as e}from"./iframe-BSXm9ObR.js";import{H as i}from"./Header-BJUUePjo.js";import"./preload-helper-PPVm8Dsz.js";import"./vehicleService-DcljwXyi.js";import"./index-Dto8T7jp.js";import"./useSupabaseRating-39dDZeDz.js";import"./Button-DvKvu5rR.js";import"./ExitIntentModal-eUCB9JW9.js";import"./x-FJov8jwW.js";import"./createLucideIcon-dIheYNSA.js";import"./heart-B94yqLm2.js";import"./trending-down-EvtO2dgI.js";import"./file-text-Zlm_-MLG.js";import"./OptimizedImage-CbVyQgJl.js";import"./DealerLocatorMap-pl_DyRxk.js";import"./star-Bx4YnwzX.js";import"./dealerService-CeBNsEgh.js";import"./award-BAkYaiY9.js";import"./chevron-right-DZicg_Gx.js";import"./map-pin-CygMLGdB.js";import"./phone-jqodRVTz.js";import"./navigation-x7uRHM0L.js";import"./dollar-sign-BWvH-KOd.js";import"./clock-DWn_navj.js";import"./bookmark-CTBaOID-.js";import"./external-link-BQ-Xuqoa.js";import"./index.modern-C4KJP5Rb.js";import"./index-Db8_1Vip.js";import"./index-CGcEbt-C.js";import"./chevron-left-pdqMm-9c.js";import"./map-BmAVO_BO.js";import"./MakeOfferModal-Dvsxcccp.js";import"./car-Ds5OY0Uv.js";import"./message-square-DUoCNYxn.js";import"./user-Q0V0Fhuo.js";import"./mail-CuurZ43O.js";import"./circle-check-big-DPJcIfhb.js";import"./send-BN7MvfkV.js";import"./chevron-down-BBkCFOJu.js";import"./loader-circle-ByPf1KiK.js";import"./OfferNegotiation-D3kjJWRb.js";import"./arrow-right-BwDOfi6H.js";import"./handshake-Db6bm2GD.js";import"./DealerMapModal-D_46QEsk.js";import"./ContactDealerModal-ByC1pTd7.js";import"./thumbs-up-Dq8GzmXg.js";import"./message-circle-evgcofv8.js";import"./share-2-ClwQTZpk.js";import"./sparkles-CocegAQ6.js";import"./gauge-0hdLeLYB.js";import"./fuel-C5F6cUWo.js";import"./chevron-up-DCyvj7ZK.js";import"./trash-2-CHirP2gX.js";import"./search-B6qHzjFY.js";import"./check-BMkyuaV1.js";import"./minus-BvpBGgKK.js";import"./plus-1hBQ4MMt.js";const pe={title:"Organisms/Header",component:i,parameters:{layout:"fullscreen",docs:{description:{component:`
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
