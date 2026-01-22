import{j as e}from"./iframe-CUg71BSt.js";import{H as i}from"./Header-DBBR6Wkd.js";import"./preload-helper-PPVm8Dsz.js";import"./vehicleService-ByoDejvg.js";import"./index-Dto8T7jp.js";import"./useSupabaseRating-BW5nDjU1.js";import"./Button-l8pVAPOV.js";import"./ExitIntentModal-XwQbqG62.js";import"./x-Bc3JTkyG.js";import"./createLucideIcon-Cqs2IxvI.js";import"./heart-Cg1GoML2.js";import"./trending-down-CvPHB-QT.js";import"./file-text-BN6-nbKi.js";import"./OptimizedImage-DZV4fggP.js";import"./DealerLocatorMap-F3UFQiue.js";import"./star-BJh-VGw5.js";import"./dealerService-CeBNsEgh.js";import"./award-DBrOhgoa.js";import"./chevron-right-BnV4h526.js";import"./map-pin-C-PLQPH5.js";import"./phone-D9dhIj59.js";import"./navigation-NYTffrR6.js";import"./dollar-sign-CqhDfDLl.js";import"./clock-CDfMgBtW.js";import"./bookmark-DX2ZBT_G.js";import"./external-link-DkHeB30m.js";import"./index.modern-x-SWfGOQ.js";import"./index-ByDsoskM.js";import"./index-CQ8nsehV.js";import"./chevron-left-DQj8LETV.js";import"./map-CyuGL5Ar.js";import"./MakeOfferModal-BnFHEhLQ.js";import"./car-DNckTG2m.js";import"./message-square-DP_OHSKd.js";import"./user-D9MGHWZz.js";import"./mail-3J6W_RFG.js";import"./circle-check-big-CdsJdKJ-.js";import"./send-lH9K2laP.js";import"./chevron-down-CRKHks3T.js";import"./loader-circle-CCb-qHfy.js";import"./OfferNegotiation-BMhSZnUl.js";import"./arrow-right-DcfZcgjQ.js";import"./handshake-CE0mn2pG.js";import"./DealerMapModal-RQSYj8YX.js";import"./gauge-yveQDx3L.js";import"./fuel-BP586nal.js";import"./check-bXxTMMoz.js";import"./minus-DFY3EZrr.js";import"./trash-2-ComVJA5m.js";import"./search-BOt2iCpY.js";import"./plus-1jbMANFe.js";import"./sparkles-B5853Pek.js";const re={title:"Organisms/Header",component:i,parameters:{layout:"fullscreen",docs:{description:{component:`
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
