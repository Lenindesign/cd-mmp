import{j as e}from"./iframe-DoU9VOD9.js";import{H as i}from"./Header-CVOQnp6T.js";import"./preload-helper-PPVm8Dsz.js";import"./vehicleService-BTivPZrm.js";import"./index-B-JoA3P0.js";import"./useSupabaseRating-B71-a0JV.js";import"./dealRoutes-XyQ0L3Gs.js";import"./Button-DJhPU0xR.js";import"./ExitIntentModal-BwrbQ2si.js";import"./x-rJ8UOhQR.js";import"./createLucideIcon-BOmRmUqZ.js";import"./heart-CcQiLeJQ.js";import"./trending-down-1duPmLOu.js";import"./file-text-BMRbjVZo.js";import"./OptimizedImage-BLZ-ZW8n.js";import"./DealerLocatorMap-JAImL8zl.js";import"./star-0HieVeHA.js";import"./dealerService-CeBNsEgh.js";import"./award-BajPkfXw.js";import"./chevron-right-0n5sSZfu.js";import"./map-pin-6-GyNhhO.js";import"./phone-DCZ7iSUq.js";import"./navigation-79Mkg_1n.js";import"./dollar-sign--aP6iaKa.js";import"./clock-DyKhoecH.js";import"./bookmark-DelBrMXD.js";import"./external-link-CQIb3Dbg.js";import"./index.modern-Bw2FWMzK.js";import"./index-DJoWZqD3.js";import"./index-DQPAONbo.js";import"./chevron-left-H0GeUtsP.js";import"./map-C20b7cbH.js";import"./MakeOfferModal-BWoNVq4h.js";import"./car-C8k398jv.js";import"./message-square-CKTBpsbK.js";import"./user-DuE6Acoa.js";import"./mail-C6WDG3-W.js";import"./send-ByBIeDi2.js";import"./check-DZEPivcU.js";import"./circle-alert-APNFikIv.js";import"./chevron-down-CygXTOil.js";import"./loader-circle-Cn0f5Dca.js";import"./OfferNegotiation-DEM8NjGG.js";import"./arrow-right-DDAMcTcy.js";import"./handshake-D6zBxL1i.js";import"./circle-check-big-BocURN17.js";import"./DealerMapModal-CUySBHwC.js";import"./ContactDealerModal-6TiZT0Ki.js";import"./thumbs-up-Qwo4atg1.js";import"./message-circle-CSF7gmkI.js";import"./share-2-IxE1JEoT.js";import"./sparkles-BdHQTKtm.js";import"./gauge-DhbjoGg1.js";import"./fuel-DwbnW3ME.js";import"./chevron-up-BpC34VIH.js";import"./trash-2-BDWVRlHy.js";import"./search-B163J78P.js";import"./minus-CT6bXLkp.js";import"./Tabs-Bg8zkq0s.js";import"./plus-C3fQmsQ8.js";const de={title:"Organisms/Header",component:i,parameters:{layout:"fullscreen",docs:{description:{component:`
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
