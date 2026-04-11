import{j as e}from"./iframe-e7CkHD8X.js";import{H as i}from"./Header-BB2yeBCh.js";import"./preload-helper-PPVm8Dsz.js";import"./vehicleService-4H6vOVVW.js";import"./index-DMkbofaR.js";import"./useSupabaseRating-BBiM4Pn-.js";import"./dealRoutes-CRJk03s6.js";import"./Button-C6o4S-Bq.js";import"./ExitIntentModal-BPgMA4-j.js";import"./x-Cs_UN80B.js";import"./createLucideIcon-DJ3rSi90.js";import"./heart-C7l09fYF.js";import"./trending-down-yMjzAk4g.js";import"./file-text-D34siM_4.js";import"./OptimizedImage-DLgJfw_o.js";import"./DealerLocatorMap-Dm63Xckk.js";import"./star-DHB_02KV.js";import"./dealerService-CeBNsEgh.js";import"./award-ClyZ1pC1.js";import"./chevron-right-DGh0DsSf.js";import"./map-pin-C2VMwj4r.js";import"./phone-B6w8f4xC.js";import"./navigation-DmYVn3dj.js";import"./dollar-sign-Dr5no2zy.js";import"./clock-pHWDt8wf.js";import"./bookmark-yDOfOWAY.js";import"./external-link-D94PQD0U.js";import"./index.modern-DR7kyRGG.js";import"./index-DvwzWEcL.js";import"./index-CJh1XGkp.js";import"./chevron-left-DXxxWLEW.js";import"./map-DIfSO-dt.js";import"./MakeOfferModal-BzO9KYWk.js";import"./car-l14lCZBv.js";import"./message-square-DW6DrRDj.js";import"./user-DgbPiYhv.js";import"./mail-2eK4zI2W.js";import"./send-B7cnNWlT.js";import"./check-BKDjyh2L.js";import"./circle-alert-CYSDcxBK.js";import"./chevron-down-Dy9jurnE.js";import"./loader-circle-CLK-C8EU.js";import"./OfferNegotiation-Cby37yHT.js";import"./arrow-right-HBTI85Qg.js";import"./handshake-BqX34vsh.js";import"./circle-check-big-DMoyg3pX.js";import"./DealerMapModal-CuH6Eowi.js";import"./ContactDealerModal-Grqr2ZiH.js";import"./thumbs-up-DocA9Dko.js";import"./message-circle-OetU4hfk.js";import"./share-2-sMBpJJHC.js";import"./sparkles-CaTbAtjG.js";import"./gauge-BaYQajnN.js";import"./fuel-BB7C17SP.js";import"./chevron-up-Db-7RKC_.js";import"./trash-2-C7QY64Zi.js";import"./search-C0xDieBn.js";import"./minus-DS8py0il.js";import"./Tabs-nSVJbjw4.js";import"./plus-DuFKyODf.js";const de={title:"Organisms/Header",component:i,parameters:{layout:"fullscreen",docs:{description:{component:`
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
