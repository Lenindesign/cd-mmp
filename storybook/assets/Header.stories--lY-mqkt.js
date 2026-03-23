import{j as e}from"./iframe-8eWL1sSE.js";import{H as i}from"./Header-BrgZxuoj.js";import"./preload-helper-PPVm8Dsz.js";import"./vehicleService-BktozO7f.js";import"./index-Dto8T7jp.js";import"./useSupabaseRating-D2HEjK72.js";import"./Button-CGgl5dNo.js";import"./ExitIntentModal-BNcX1aee.js";import"./x-DT-Zjm6c.js";import"./createLucideIcon-BQ_xqr0B.js";import"./heart-DMB3mZuU.js";import"./trending-down-DGauaa65.js";import"./file-text-A0RLjSUo.js";import"./OptimizedImage-5r0OeBPb.js";import"./DealerLocatorMap-DSrIXF51.js";import"./star-uSJ0zH8y.js";import"./dealerService-CeBNsEgh.js";import"./award-Cs0jjf7g.js";import"./chevron-right-B7wmSu9T.js";import"./map-pin-B0TgqDw2.js";import"./phone-gJ2HxdbX.js";import"./navigation-BErMa7YE.js";import"./dollar-sign-usY7dZ2A.js";import"./clock-Dfql6dBX.js";import"./bookmark-DEyXHJ02.js";import"./external-link-2C3fNBui.js";import"./index.modern-CAu_7As0.js";import"./index-Cl0eFOu-.js";import"./index-CHVLXUIQ.js";import"./chevron-left-BYgsibLw.js";import"./map-DMB9XjOJ.js";import"./MakeOfferModal-Dog-j8O-.js";import"./car-Dc3v9v3j.js";import"./message-square-IPy7wuUB.js";import"./user-DQcBAuNQ.js";import"./mail-DsLq1cSk.js";import"./circle-check-big-B9f5yTsb.js";import"./send-t4g3sAQT.js";import"./chevron-down-B-eFGHjf.js";import"./loader-circle-CRHcdJZS.js";import"./OfferNegotiation-EC9OpTb8.js";import"./arrow-right-pylVAajf.js";import"./handshake-BtYjMaFU.js";import"./DealerMapModal-Bw0DJaB7.js";import"./ContactDealerModal-C5fUwGHK.js";import"./thumbs-up-BVSt1JpR.js";import"./message-circle-Bu6t7OPg.js";import"./share-2-Dot_B8OF.js";import"./sparkles-DS6yPbxj.js";import"./gauge-L2Nihtj-.js";import"./fuel-BRKWvmB0.js";import"./chevron-up-CDqR5tXK.js";import"./search-DryyH-6U.js";import"./check-ByIlvpsP.js";import"./minus-ehrGKxMd.js";import"./trash-2-CDelWXCw.js";import"./plus-CsH3U9sd.js";const pe={title:"Organisms/Header",component:i,parameters:{layout:"fullscreen",docs:{description:{component:`
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
