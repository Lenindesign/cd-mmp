import{j as e}from"./iframe-o0M0rmr0.js";import{H as i}from"./Header-e2VOpFLE.js";import"./preload-helper-PPVm8Dsz.js";import"./vehicleService-23eXHQkm.js";import"./index-C_qiXwZJ.js";import"./useSupabaseRating-Dmffg66t.js";import"./dealRoutes-XyQ0L3Gs.js";import"./Button-C12C-YHq.js";import"./stateVehicleTaxes-D5wOLFyx.js";import"./createLucideIcon-Bc6axmz-.js";import"./OptimizedImage-BjceK5NN.js";import"./DealerLocatorMap-C8DnhYSN.js";import"./star-DKyfTRTb.js";import"./x-jDrjbH5r.js";import"./dealerService-CeBNsEgh.js";import"./award-Bstw8F4g.js";import"./chevron-right-B56yNJ0G.js";import"./map-pin-CwSMRRI0.js";import"./phone-CLofv8Bw.js";import"./navigation-Bh_pRsor.js";import"./dollar-sign-acACe48v.js";import"./ExitIntentModal-BIkhJr-g.js";import"./heart-lWgFtkRm.js";import"./trending-down-CchHBQdo.js";import"./file-text-Bx0vatmh.js";import"./clock-HBcGbHcJ.js";import"./bookmark-ChRGf4bC.js";import"./external-link-9ZV0Nlf-.js";import"./index.modern-B_JB980Q.js";import"./index-3pHKG1Ea.js";import"./index-z4UzTCKk.js";import"./chevron-left-CjwQfusu.js";import"./map-D8PDBHUw.js";import"./MakeOfferModal-B5FIrbjV.js";import"./car-DxA8Fbhz.js";import"./message-square-CEGccpMc.js";import"./user-dmKSyp58.js";import"./mail-DifbuTB-.js";import"./send-D730CIWJ.js";import"./check-C_6gocgf.js";import"./circle-alert-E2TZKVpe.js";import"./chevron-down-DnVjoW5S.js";import"./loader-circle-munIjv7J.js";import"./OfferNegotiation-DvbMaINs.js";import"./arrow-right-BXUrGjRp.js";import"./handshake-DCC3vPLt.js";import"./circle-check-big-BLGRFan9.js";import"./DealerMapModal-DjsEP-74.js";import"./ContactDealerModal-CHV3uYbu.js";import"./thumbs-up-By_IN2El.js";import"./message-circle-Xo_ot05N.js";import"./share-2-CjOFjXkA.js";import"./sparkles-DaJixXxB.js";import"./gauge-BnhZEf9X.js";import"./fuel-mI8Atybk.js";import"./chevron-up-BNssJq5f.js";import"./trash-2-C4WsY6K6.js";import"./search-BffZUyTA.js";import"./minus-B7ctOrj2.js";import"./Tabs-B5AvA2nV.js";import"./plus-BYwQv9ZD.js";const le={title:"Organisms/Header",component:i,parameters:{layout:"fullscreen",docs:{description:{component:`
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
