import{j as e}from"./iframe-DxjPMNz-.js";import{H as i}from"./Header--XRwkybB.js";import"./preload-helper-PPVm8Dsz.js";import"./vehicleService-ByoDejvg.js";import"./index-Dto8T7jp.js";import"./useSupabaseRating-BmiudXH_.js";import"./Button-QzKgco6o.js";import"./ExitIntentModal-D2dh1YVZ.js";import"./x-CCWOfB7z.js";import"./createLucideIcon-DETWup7J.js";import"./heart-Dp_3KLbz.js";import"./trending-down-B40_g42A.js";import"./file-text-BRzX6_0n.js";import"./OptimizedImage-DOyvkJ7t.js";import"./DealerLocatorMap-CeaUz3AG.js";import"./star-DDTLYogD.js";import"./dealerService-CeBNsEgh.js";import"./award-DtUX1TEn.js";import"./chevron-right-CcFyE7dO.js";import"./map-pin-hgsRzUuh.js";import"./phone-eXKPkCYE.js";import"./navigation-BaaWN_os.js";import"./dollar-sign-B4iLklzj.js";import"./clock-DgZvHwFs.js";import"./bookmark-CrG3xv1K.js";import"./external-link-D_Q-eWPS.js";import"./index.modern-DbrTfAv0.js";import"./index-BWdiaKqa.js";import"./index-B-prEZtu.js";import"./chevron-left-CJTA5TcN.js";import"./map-CFyMheYj.js";import"./MakeOfferModal-oGA3mPL2.js";import"./car-CWiCCsta.js";import"./message-square-B-Leg0MX.js";import"./user-C3nnbMWw.js";import"./mail-BbfpL93l.js";import"./circle-check-big-DwS2Q0Gr.js";import"./send-An6LNF1B.js";import"./chevron-down-Bq-NoRgr.js";import"./loader-circle-Drqfp9Nb.js";import"./OfferNegotiation-CD5neoYx.js";import"./arrow-right-Bipe-zG8.js";import"./handshake-CKMrqnPW.js";import"./DealerMapModal-9_y5RN0u.js";import"./gauge-DZPKbrlR.js";import"./fuel-BPoOipk1.js";import"./check-B5k8InCb.js";import"./minus-QpmtaF3j.js";import"./trash-2-CtYah2pH.js";import"./search-DW8xu3bm.js";import"./plus-ZD2QCnHe.js";const oe={title:"Organisms/Header",component:i,parameters:{layout:"fullscreen",docs:{description:{component:`
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
