import{j as e}from"./iframe-BtAHAyBR.js";import{H as i}from"./Header-r7vwXTre.js";import"./preload-helper-PPVm8Dsz.js";import"./vehicleService-23eXHQkm.js";import"./index-C_qiXwZJ.js";import"./useSupabaseRating-B4OZIty4.js";import"./dealRoutes-XyQ0L3Gs.js";import"./Button-Bs4yma_k.js";import"./stateVehicleTaxes-UCx5WQVm.js";import"./createLucideIcon-DQLICeE7.js";import"./OptimizedImage-CV64VxyO.js";import"./DealerLocatorMap-D7K4y4B8.js";import"./star-BOt3tBwg.js";import"./x-Cx2FkI0d.js";import"./dealerService-CeBNsEgh.js";import"./award-CZQI68ul.js";import"./chevron-right-CeTiYLac.js";import"./map-pin-DOjVM_4O.js";import"./phone-D4cU8pRt.js";import"./navigation-DZdjaPbZ.js";import"./dollar-sign-aG0_UnXP.js";import"./ExitIntentModal-Dp7YTjj4.js";import"./heart-CtecjXPq.js";import"./trending-down-BgJBhXkO.js";import"./file-text-BAFGVP_q.js";import"./clock-CpU1ExLm.js";import"./bookmark-Co7SuvjR.js";import"./external-link-CD315ejH.js";import"./index.modern-DlnD2OD5.js";import"./index-DxfCcJ8D.js";import"./index-B3LyeBMG.js";import"./chevron-left-T1xyAnjq.js";import"./map-BrE32EjI.js";import"./MakeOfferModal-Bk5KqPUU.js";import"./car-BSoVR87i.js";import"./message-square-7zKKJ17c.js";import"./user-DWDiMjva.js";import"./mail-CsLeXoyB.js";import"./send-Dk5L09jB.js";import"./check-TsXFlK8h.js";import"./circle-alert-BCvdO3Vx.js";import"./chevron-down-CB3jolE-.js";import"./loader-circle-7IDPbyyV.js";import"./OfferNegotiation-pKgWj3Oi.js";import"./arrow-right-BRxnO2sw.js";import"./handshake-DJi-H8Wz.js";import"./circle-check-big-6zkNBPm2.js";import"./DealerMapModal-ConRf2G8.js";import"./ContactDealerModal-CNiIeUS5.js";import"./thumbs-up-DEw-6iCD.js";import"./message-circle-5PHFFk9d.js";import"./share-2-CnRvMqPs.js";import"./sparkles-DYGIBwhh.js";import"./gauge-BVJIs1s6.js";import"./fuel-WFV3dlaW.js";import"./chevron-up-CSu_qAT4.js";import"./trash-2-C_fceCtP.js";import"./search-BocTFhBi.js";import"./minus-k4-NOyUs.js";import"./Tabs-BrWJbbtl.js";import"./plus-CqlX8UVO.js";const le={title:"Organisms/Header",component:i,parameters:{layout:"fullscreen",docs:{description:{component:`
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
}`,...r.parameters?.docs?.source}}};const he=["Default","WithContent","Mobile"];export{t as Default,r as Mobile,o as WithContent,he as __namedExportsOrder,le as default};
