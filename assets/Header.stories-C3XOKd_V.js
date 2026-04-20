import{j as e}from"./iframe-DBAvAkDd.js";import{H as i}from"./Header-C0N2tTJV.js";import"./preload-helper-PPVm8Dsz.js";import"./vehicleService-BTivPZrm.js";import"./index-B-JoA3P0.js";import"./useSupabaseRating-BUgLotYb.js";import"./dealRoutes-XyQ0L3Gs.js";import"./Button-ss4J6eP9.js";import"./ExitIntentModal-mPgtr6Hx.js";import"./x-P6DUbHBP.js";import"./createLucideIcon-TejrvsQz.js";import"./heart-Cqd0tL7f.js";import"./trending-down-D2-Uqa4c.js";import"./file-text-B9BDEEiq.js";import"./OptimizedImage-PtUDAQRB.js";import"./DealerLocatorMap-NWaM4_Mi.js";import"./star-BmXh0oJ8.js";import"./dealerService-CeBNsEgh.js";import"./award-B7lp4yJh.js";import"./chevron-right-CSH846Gz.js";import"./map-pin-CWABYNPT.js";import"./phone-C3F6gnPl.js";import"./navigation-B-2wuoGi.js";import"./dollar-sign-Djuz-7h-.js";import"./clock-ByQ5Tjf2.js";import"./bookmark-DWX5oMnA.js";import"./external-link-Da1XN584.js";import"./index.modern-MK-KV7Qh.js";import"./index-B2LG0wEO.js";import"./index-BhMQrLI8.js";import"./chevron-left-Dr29mhZ3.js";import"./map-BDQuEao-.js";import"./MakeOfferModal-Cm_NilLi.js";import"./car-ppTnERKb.js";import"./message-square-Dzy1WK3W.js";import"./user-BcueLqt_.js";import"./mail-BEco_9WT.js";import"./send-BDzgJOjn.js";import"./check-CDHUeAlo.js";import"./circle-alert-D2mneLrz.js";import"./chevron-down-DdezBYX6.js";import"./loader-circle-CQq4MQzH.js";import"./OfferNegotiation-BqkmlbFC.js";import"./arrow-right-Dyx2rsRc.js";import"./handshake-D3yjkp9R.js";import"./circle-check-big-J9tiNS2Q.js";import"./DealerMapModal-DY6u8N99.js";import"./ContactDealerModal-Bnc3CFwv.js";import"./thumbs-up-DUUizTUk.js";import"./message-circle-DrSixA2x.js";import"./share-2-DHu2tFtt.js";import"./sparkles-q7mINzjT.js";import"./gauge-BTamvVg9.js";import"./fuel-jlVJV1BG.js";import"./chevron-up-CAW8Umxb.js";import"./trash-2-DUe4lKui.js";import"./search-Cdal65wR.js";import"./minus-Ce3jWl2j.js";import"./Tabs-DLULo1w7.js";import"./plus-Dj_3hFyw.js";const de={title:"Organisms/Header",component:i,parameters:{layout:"fullscreen",docs:{description:{component:`
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
