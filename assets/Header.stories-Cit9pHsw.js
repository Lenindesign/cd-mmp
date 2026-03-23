import{j as e}from"./iframe-xXMECI18.js";import{H as i}from"./Header-ZT6tHntn.js";import"./preload-helper-PPVm8Dsz.js";import"./vehicleService-BktozO7f.js";import"./index-Dto8T7jp.js";import"./useSupabaseRating-CLO_YHaO.js";import"./Button-Bv5eFXZQ.js";import"./ExitIntentModal-Cjvs4trt.js";import"./x-CgzS8Gy7.js";import"./createLucideIcon-DrEbP6_w.js";import"./heart-C2oOwsSa.js";import"./trending-down-BF2auzuS.js";import"./file-text-DqROK7b9.js";import"./OptimizedImage-YwRdy5Z0.js";import"./DealerLocatorMap-CSx3h9Q5.js";import"./star-DoDzsAn5.js";import"./dealerService-CeBNsEgh.js";import"./award-DLTZwK5m.js";import"./chevron-right-CoKkiNux.js";import"./map-pin-CI1EVZEG.js";import"./phone-CkzBur5d.js";import"./navigation-Cw4haE_I.js";import"./dollar-sign-BiwUYL6q.js";import"./clock-B--jiNgI.js";import"./bookmark-DVG3JskD.js";import"./external-link-byfECfqF.js";import"./index.modern-DOX50I3c.js";import"./index-CxPaZ5l9.js";import"./index-CTPJk1mo.js";import"./chevron-left-DyqcaowZ.js";import"./map-Dmx2RMjQ.js";import"./MakeOfferModal-DABYnKK6.js";import"./car-cmSBhohy.js";import"./message-square-DhPdbD8z.js";import"./user-5_eBSdAG.js";import"./mail-CRdt-4yg.js";import"./circle-check-big-DxvWHFgA.js";import"./send-BkByxkgm.js";import"./chevron-down-B1L4tiAX.js";import"./loader-circle-CPQ4yjg0.js";import"./OfferNegotiation-B95WKN8q.js";import"./arrow-right-CBwfZugi.js";import"./handshake-BVrH3ZuM.js";import"./DealerMapModal-DTl7-xj7.js";import"./ContactDealerModal-CB25rhUx.js";import"./thumbs-up-Cq4Y4XRz.js";import"./message-circle-Dxs1YZkl.js";import"./share-2-BxZI_rxI.js";import"./sparkles-BObn6gDe.js";import"./gauge-DxmSuJc4.js";import"./fuel-Desw-kMz.js";import"./chevron-up-Bj_TrBkn.js";import"./trash-2-B1ZrXGlg.js";import"./search-B2E4xg2i.js";import"./check-DgiXTCx4.js";import"./minus-CIvSYaQN.js";import"./plus-3ANPwrJ9.js";const pe={title:"Organisms/Header",component:i,parameters:{layout:"fullscreen",docs:{description:{component:`
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
