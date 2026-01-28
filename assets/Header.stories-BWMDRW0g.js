import{j as e}from"./iframe-Dt2G9oOB.js";import{H as i}from"./Header-B2eRyfrG.js";import"./preload-helper-PPVm8Dsz.js";import"./vehicleService-ByoDejvg.js";import"./index-Dto8T7jp.js";import"./useSupabaseRating-DW_2WVSm.js";import"./Button-JVVUlsCr.js";import"./ExitIntentModal-CnpKBjnR.js";import"./x-CmrwJ9QT.js";import"./createLucideIcon-BJjrBNNS.js";import"./heart-C-MDvusQ.js";import"./trending-down-BOTfsxLt.js";import"./file-text-Cs3KT4u7.js";import"./OptimizedImage-CakYfMMO.js";import"./DealerLocatorMap-BuDUK73Y.js";import"./star-zRLWWUSY.js";import"./dealerService-CeBNsEgh.js";import"./award-Cfji03wx.js";import"./chevron-right-Bu8XVnO8.js";import"./map-pin-BKxcAWAw.js";import"./phone-2PCHV0h0.js";import"./navigation-AMRDMt5q.js";import"./dollar-sign-Cxtn_z1I.js";import"./clock-CTRVuYhB.js";import"./bookmark-LFx-s4OS.js";import"./external-link-CIcWRMD6.js";import"./index.modern-CJtIo-Q1.js";import"./index-CGs-ELHY.js";import"./index-X2Fm1COm.js";import"./chevron-left-Cu1Qbz4I.js";import"./map-BEiW4evq.js";import"./MakeOfferModal-BAnj0htm.js";import"./car-DfTqA1OY.js";import"./message-square-D46FJ5ih.js";import"./user-Chgk2LRD.js";import"./mail-CVOmfOiC.js";import"./circle-check-big-BkqQLYGy.js";import"./send-64FRcjol.js";import"./chevron-down-B7ADmt0S.js";import"./loader-circle-D2N5V_jd.js";import"./OfferNegotiation-DNMxX5Gz.js";import"./arrow-right-DCYEiJIh.js";import"./handshake-BsmYzaW7.js";import"./DealerMapModal-CkNj_lA_.js";import"./gauge-CU8h-0vU.js";import"./fuel-CgQSFQl0.js";import"./check-Vb6gWCrD.js";import"./minus-B67Uy1yG.js";import"./trash-2-au7wLIt9.js";import"./search-DopA1wFT.js";import"./plus-CN_V9Ga_.js";const oe={title:"Organisms/Header",component:i,parameters:{layout:"fullscreen",docs:{description:{component:`
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
}`,...r.parameters?.docs?.source}}};const re=["Default","WithContent","Mobile"];export{t as Default,r as Mobile,o as WithContent,re as __namedExportsOrder,oe as default};
