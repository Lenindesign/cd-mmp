import{j as e}from"./iframe-B_hBYtrn.js";import{H as i}from"./Header-ZtSux5n8.js";import"./preload-helper-PPVm8Dsz.js";import"./vehicleService-BTivPZrm.js";import"./index-B-JoA3P0.js";import"./useSupabaseRating-CEXjXN2p.js";import"./dealRoutes-XyQ0L3Gs.js";import"./Button-D-vLb8EF.js";import"./ExitIntentModal-DQmvtH-S.js";import"./x-BTeKcvX0.js";import"./createLucideIcon-CEkC63Y3.js";import"./heart-xSYnHPjY.js";import"./trending-down-UUziHKVH.js";import"./file-text-D2s8xp7F.js";import"./OptimizedImage-CZlxa9Xh.js";import"./DealerLocatorMap-CuKMwPxq.js";import"./star-C4a4C3FY.js";import"./dealerService-CeBNsEgh.js";import"./award-v656S4Ih.js";import"./chevron-right-CLGfZYmU.js";import"./map-pin-DckQZ9nU.js";import"./phone-BQinP-Eg.js";import"./navigation-DUsaZhwP.js";import"./dollar-sign-D2-YkZGB.js";import"./clock-ButOG8Mf.js";import"./bookmark-16JSt-Lz.js";import"./external-link-CZecNQKG.js";import"./index.modern-D7eD2PeI.js";import"./index-C-F_QrHI.js";import"./index-CTh3Tthw.js";import"./chevron-left-x0p4IUE6.js";import"./map-BpQiJxtb.js";import"./MakeOfferModal-vWbAzYPf.js";import"./car-D_AaUDsI.js";import"./message-square-BRSKDeTr.js";import"./user-DNsI-Mck.js";import"./mail-D1RU8mxB.js";import"./send-CETcSaQq.js";import"./check-v9pVHMgC.js";import"./circle-alert-BKTvYIFL.js";import"./chevron-down-BFOOMzKN.js";import"./loader-circle-BOldhWHJ.js";import"./OfferNegotiation-B-NxMQWi.js";import"./arrow-right-C-OCBkKW.js";import"./handshake-1Hz5S8Z5.js";import"./circle-check-big-B6KpMno4.js";import"./DealerMapModal-DdN7sdfJ.js";import"./ContactDealerModal-Qrl8rOFd.js";import"./thumbs-up-9kyPML3c.js";import"./message-circle-BE7gLPh0.js";import"./share-2-31BqQoL0.js";import"./sparkles-B21ZOFJ7.js";import"./gauge-BiLjhmrB.js";import"./fuel-BYp6xn3_.js";import"./chevron-up-CjFdboJZ.js";import"./trash-2-CFQEN9-D.js";import"./search-Bm1q6W2X.js";import"./minus-BaJ2Nazr.js";import"./Tabs-apfNfGCK.js";import"./plus-CmJ0hpmo.js";const de={title:"Organisms/Header",component:i,parameters:{layout:"fullscreen",docs:{description:{component:`
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
