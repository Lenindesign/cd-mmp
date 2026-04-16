import{j as e}from"./iframe-6G5jWWhR.js";import{H as i}from"./Header-DYK_D8ZW.js";import"./preload-helper-PPVm8Dsz.js";import"./vehicleService-CgRIVwGT.js";import"./index-Bk6M7T92.js";import"./useSupabaseRating-DCxHs8Vl.js";import"./dealRoutes-XyQ0L3Gs.js";import"./Button-Pb2C09bA.js";import"./ExitIntentModal-DH5EQj-S.js";import"./x-BXW_31mX.js";import"./createLucideIcon-DPbzMyXI.js";import"./heart-Tpu6cMIh.js";import"./trending-down-DnjZrs_B.js";import"./file-text-xG2vpBF9.js";import"./OptimizedImage-Bk8GsTS1.js";import"./DealerLocatorMap-B_O_1943.js";import"./star-CejV3Ysh.js";import"./dealerService-CeBNsEgh.js";import"./award-B5VwkKJS.js";import"./chevron-right-BSWwc-Lr.js";import"./map-pin-BqIwC3Pk.js";import"./phone-Ctc7CK57.js";import"./navigation-CJWVIR3H.js";import"./dollar-sign-Cilwi6Zq.js";import"./clock-ehmIPbrq.js";import"./bookmark-Ce008Ha3.js";import"./external-link-kK3PQ_-A.js";import"./index.modern-BQvjxOdl.js";import"./index-BdB6jah-.js";import"./index-CS8ZKC02.js";import"./chevron-left-DKMXb2hx.js";import"./map-BT_-Wt6i.js";import"./MakeOfferModal-Cmoc-oHs.js";import"./car-BR2nBiWZ.js";import"./message-square-V82l6JYM.js";import"./user-CSv1Av_7.js";import"./mail-CNWdGwSv.js";import"./send-D_7YVOqz.js";import"./check-oCWJux9s.js";import"./circle-alert-C2JoPXBM.js";import"./chevron-down-GL22KXD7.js";import"./loader-circle-DKmP_186.js";import"./OfferNegotiation-BVlAFaNf.js";import"./arrow-right-CsE68iDx.js";import"./handshake-D7zwAmi0.js";import"./circle-check-big-BGaXzL81.js";import"./DealerMapModal-vS52WMHt.js";import"./ContactDealerModal-BAkwn2mY.js";import"./thumbs-up-CE_hGrtv.js";import"./message-circle-DrHf_NDE.js";import"./share-2-aEvipOAF.js";import"./sparkles-DKtjdd2o.js";import"./gauge-DyaenieH.js";import"./fuel-DolijfoF.js";import"./chevron-up-ex3Dc_uq.js";import"./trash-2-B_L-bLYw.js";import"./search-D7AO9549.js";import"./minus-BD0aGZB3.js";import"./Tabs-Cpt7Cq7X.js";import"./plus-G0DX8oM7.js";const de={title:"Organisms/Header",component:i,parameters:{layout:"fullscreen",docs:{description:{component:`
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
