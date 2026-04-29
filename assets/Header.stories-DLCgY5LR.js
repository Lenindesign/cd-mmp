import{j as e}from"./iframe-CBmx7sW-.js";import{H as i}from"./Header-Cyb45v64.js";import"./preload-helper-PPVm8Dsz.js";import"./vehicleService-BTivPZrm.js";import"./index-B-JoA3P0.js";import"./useSupabaseRating-CiwQg0l_.js";import"./dealRoutes-XyQ0L3Gs.js";import"./Button-DLUBDcW5.js";import"./ExitIntentModal-D0GdYFCl.js";import"./x-gvpJq3qJ.js";import"./createLucideIcon-BkqF2HJb.js";import"./heart-mAAfMuHs.js";import"./trending-down-BXh60GNX.js";import"./file-text-DfGKiZcJ.js";import"./OptimizedImage-BlzOMfWZ.js";import"./DealerLocatorMap-Bi2xCtOI.js";import"./star-COH3Z2rV.js";import"./dealerService-CeBNsEgh.js";import"./award-Buh1HOSR.js";import"./chevron-right-BXoa3snb.js";import"./map-pin-Bh7SxuNp.js";import"./phone-KHMWI_bi.js";import"./navigation-DQb5hhpp.js";import"./dollar-sign-wu8J3i5j.js";import"./clock-Ja-RlyXX.js";import"./bookmark-BrZltapf.js";import"./external-link-DFiXIQPI.js";import"./index.modern-DMrXZZ7r.js";import"./index-CT5pNhSb.js";import"./index-D_cRDRd5.js";import"./chevron-left-rJnabepA.js";import"./map-DMr_gE6O.js";import"./MakeOfferModal-BLnipg1w.js";import"./car-Br3Of7Ny.js";import"./message-square-CFufXMCN.js";import"./user-BD_0Dvc9.js";import"./mail-CTa32Qhu.js";import"./send-1ZWo_02U.js";import"./check-D06e1TRa.js";import"./circle-alert-NeQz52eY.js";import"./chevron-down-DpiuJP--.js";import"./loader-circle-C3O-SKf4.js";import"./OfferNegotiation-YiVwHpzs.js";import"./arrow-right-xuHuNfL4.js";import"./handshake-C_pguq-J.js";import"./circle-check-big-C2nSRFWT.js";import"./DealerMapModal-ClkFIu3V.js";import"./ContactDealerModal-iszYEbSE.js";import"./thumbs-up-BNPDr6NH.js";import"./message-circle-B0Ehk70q.js";import"./share-2-BODwBNV4.js";import"./sparkles-xg9A6Zrz.js";import"./gauge-CVE9P7r9.js";import"./fuel-4TRvNg5i.js";import"./chevron-up-Dj0G1_7M.js";import"./trash-2-CAF4wen0.js";import"./search-BLfCJ-9E.js";import"./minus-CzV0Njx0.js";import"./Tabs-BwOp8Ba0.js";import"./plus-iQmpprp2.js";const de={title:"Organisms/Header",component:i,parameters:{layout:"fullscreen",docs:{description:{component:`
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
