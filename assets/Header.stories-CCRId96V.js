import{j as e}from"./iframe-40V3jQdk.js";import{H as i}from"./Header-kuKy7tM2.js";import"./preload-helper-PPVm8Dsz.js";import"./vehicleService-DsqcyNHv.js";import"./index-BIJ_Z0xc.js";import"./useSupabaseRating-WJ1yHKPn.js";import"./Button-BDChmRQ5.js";import"./ExitIntentModal-D8iJTX8q.js";import"./x-Ba8OxwI0.js";import"./createLucideIcon-Cr3AgCDL.js";import"./heart-DSr9iXI9.js";import"./trending-down-B3oBH3FX.js";import"./file-text-CpnwqG5L.js";import"./OptimizedImage-i_zMdbbB.js";import"./DealerLocatorMap-D0ZIJhkV.js";import"./star-BEho7it7.js";import"./dealerService-CeBNsEgh.js";import"./award-DQb_RLhB.js";import"./chevron-right-UeRPZ7MI.js";import"./map-pin-BLTVLnW9.js";import"./phone-xUmZ2cMv.js";import"./navigation-eYPreNdL.js";import"./dollar-sign-kZ8gw0gC.js";import"./clock-DWTjCt01.js";import"./bookmark-B-PhI2jn.js";import"./map-C2WZDw3K.js";import"./index-BOqtaWBE.js";import"./index-DfrPmUx-.js";import"./chevron-left-Lt8ChRSY.js";import"./MakeOfferModal-Ckdhc1tz.js";import"./car-JwSDcvwG.js";import"./send-CvKRIiaw.js";import"./user-DwMzJyHR.js";import"./mail-BUluqHRL.js";import"./circle-check-big-BLJxjRAa.js";import"./chevron-down-D0_5upv1.js";import"./OfferNegotiation-DNPbSqJF.js";import"./arrow-right-C4HGf0TY.js";import"./handshake-Cvm91Uei.js";import"./DealerMapModal-Cc-urjRg.js";import"./trash-2-CtSeSGTc.js";import"./search-CmNSNVQn.js";import"./plus-gFqK-jBT.js";const J={title:"Organisms/Header",component:i,parameters:{layout:"fullscreen",docs:{description:{component:`
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
}`,...r.parameters?.docs?.source}}};const K=["Default","WithContent","Mobile"];export{t as Default,r as Mobile,o as WithContent,K as __namedExportsOrder,J as default};
