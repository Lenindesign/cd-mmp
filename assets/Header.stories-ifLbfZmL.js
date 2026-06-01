import{j as e}from"./iframe-DfaedBos.js";import{H as i}from"./Header-DbQB8C8o.js";import"./preload-helper-PPVm8Dsz.js";import"./vehicleService-jXr_v8Nu.js";import"./index-C_qiXwZJ.js";import"./useSupabaseRating-NTws04dG.js";import"./dealRoutes-XyQ0L3Gs.js";import"./Button-Dqwf6xwZ.js";import"./stateVehicleTaxes-DNuXAEIJ.js";import"./createLucideIcon-DZXkL20h.js";import"./OptimizedImage-CDGSuaTq.js";import"./DealerLocatorMap-D-9P7hrM.js";import"./star-CusxMYKz.js";import"./x-BVllRRQs.js";import"./dealerService-CeBNsEgh.js";import"./award-OSzi1t2N.js";import"./chevron-right-Caycx1sR.js";import"./map-pin-6rc-YzHc.js";import"./phone-BXKJ7rUI.js";import"./navigation-BpLrOsSK.js";import"./dollar-sign-DtD-UmAM.js";import"./ExitIntentModal-CLx1szA1.js";import"./heart-CXpUSwSu.js";import"./trending-down-D5OHX5-n.js";import"./file-text-CT77-Vep.js";import"./clock-DEnmYE8X.js";import"./bookmark-DOkEoUlh.js";import"./external-link-4fy6Ojk5.js";import"./index.modern-D7uph3KS.js";import"./index-TucCqVIo.js";import"./index-DFVwg6lF.js";import"./chevron-left-CoEymDqy.js";import"./map-C9cnHOqa.js";import"./MakeOfferModal-Ci90QkHN.js";import"./car-CUfvfGEG.js";import"./message-square-Bcb7waKk.js";import"./user-BKyPHCb7.js";import"./mail-BHUC9I9x.js";import"./send-DSWBxchJ.js";import"./check-BlYoLuRm.js";import"./circle-alert-Ui8_LS3w.js";import"./chevron-down-Do56bVTo.js";import"./loader-circle-CoAjKjig.js";import"./OfferNegotiation-CbFayM-O.js";import"./arrow-right-CDzA_NwP.js";import"./handshake-Dy_YJDl3.js";import"./circle-check-big-CN9Mk6SN.js";import"./DealerMapModal-6atYSgNt.js";import"./ContactDealerModal-DN7-hOkr.js";import"./thumbs-up-CfRF4hCJ.js";import"./message-circle-D4a8UqU0.js";import"./share-2-BMkjdpXR.js";import"./sparkles-CcmiMYcE.js";import"./gauge-BbJqgss6.js";import"./fuel-By56NXcI.js";import"./chevron-up-CCPKtjSe.js";import"./trash-2-HFgy37UU.js";import"./search-OGWoztyh.js";import"./minus-C-GTmudc.js";import"./Tabs-DREgx_ph.js";import"./plus-jPxq0XCK.js";const le={title:"Organisms/Header",component:i,parameters:{layout:"fullscreen",docs:{description:{component:`
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
