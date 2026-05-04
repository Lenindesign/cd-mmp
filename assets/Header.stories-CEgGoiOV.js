import{j as e}from"./iframe-d9YvY3qn.js";import{H as i}from"./Header-K9_CZ6Lx.js";import"./preload-helper-PPVm8Dsz.js";import"./vehicleService-CnHzEnwN.js";import"./index-B-JoA3P0.js";import"./useSupabaseRating-MQ7WUQQk.js";import"./dealRoutes-XyQ0L3Gs.js";import"./Button-CtMzio6S.js";import"./ExitIntentModal-CmIi_wTk.js";import"./x-Cq8K55KV.js";import"./createLucideIcon-CKlYe028.js";import"./heart-qsPmFoy7.js";import"./trending-down-CdTpuC7o.js";import"./file-text-DN-a8B1_.js";import"./OptimizedImage-C6h82nPx.js";import"./DealerLocatorMap-3iTKezUq.js";import"./star-kdUKrozV.js";import"./dealerService-CeBNsEgh.js";import"./award-DwMfk0-t.js";import"./chevron-right-BxOUb1hS.js";import"./map-pin-cAWED1Gk.js";import"./phone-DMZnSAv2.js";import"./navigation-iDyI05tP.js";import"./dollar-sign-d1rVirdv.js";import"./clock-BeoxhhbW.js";import"./bookmark-CcTy2W85.js";import"./external-link-CpuY8G8V.js";import"./index.modern-CeBizvmy.js";import"./index-dZzEDqRs.js";import"./index-Rl_1kziR.js";import"./chevron-left-CDQ-6O5j.js";import"./map-DhpB0t48.js";import"./MakeOfferModal-CeBWyOrB.js";import"./car-CiH233dC.js";import"./message-square-DbQ3HbEo.js";import"./user-D_n0h7OT.js";import"./mail-C0HzqLSv.js";import"./send-BwsYw4gf.js";import"./check-DTDccBuE.js";import"./circle-alert-5lCyWg_W.js";import"./chevron-down-Lrgue5Gy.js";import"./loader-circle-BqL5zXa6.js";import"./OfferNegotiation-7tlmYEpG.js";import"./arrow-right-XTZjyS1J.js";import"./handshake-ChifH5zX.js";import"./circle-check-big-BqPJKRCk.js";import"./DealerMapModal-CHh53-jF.js";import"./ContactDealerModal-RdO2fkzT.js";import"./thumbs-up-nVHu-or3.js";import"./message-circle-X9i-xOOU.js";import"./share-2-r0dfndCX.js";import"./sparkles-CWOGVke8.js";import"./gauge-bUG8T_Ij.js";import"./fuel-CerI57F3.js";import"./chevron-up-CEvrVRaP.js";import"./trash-2-B2H0gyT8.js";import"./search-AF1CBEMc.js";import"./minus-CEjXDGl6.js";import"./Tabs-CfwFG7cA.js";import"./plus-CaorLi4a.js";const de={title:"Organisms/Header",component:i,parameters:{layout:"fullscreen",docs:{description:{component:`
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
