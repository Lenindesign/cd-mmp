import{j as e}from"./iframe-C0WyfAyi.js";import{H as i}from"./Header-DW8zeN1C.js";import"./preload-helper-PPVm8Dsz.js";import"./vehicleService-DcQymfO7.js";import"./index-C_qiXwZJ.js";import"./useSupabaseRating-B_xFVE06.js";import"./dealRoutes-XyQ0L3Gs.js";import"./Button-VITjpJeV.js";import"./ExitIntentModal-BjQxeugU.js";import"./x-Chb210Ce.js";import"./createLucideIcon-Cbyg4LPY.js";import"./heart-BpOj8cBA.js";import"./trending-down-gJnRXEF5.js";import"./file-text-C0NlloWo.js";import"./OptimizedImage-D5SjT0B5.js";import"./DealerLocatorMap-CTTgoNjL.js";import"./star-C6hqjQXt.js";import"./dealerService-CeBNsEgh.js";import"./award-D3eXA9NT.js";import"./chevron-right-DaYs8Dwg.js";import"./map-pin-CKFfqB36.js";import"./phone-CZx1FiY6.js";import"./navigation-CccEKof_.js";import"./dollar-sign-BulO73un.js";import"./clock-CDSZXrHd.js";import"./bookmark-jOems_gN.js";import"./external-link-nOixN8w3.js";import"./index.modern-sXCq51Ks.js";import"./index-DldDWnY-.js";import"./index-G0Nto2Nf.js";import"./chevron-left-kBLCe7wn.js";import"./map-juPMkEZH.js";import"./MakeOfferModal-CZ5c2UJH.js";import"./car-D4-uPJZD.js";import"./message-square-C-9QtZyo.js";import"./user-BoJTAoMn.js";import"./mail-CYWAwT5w.js";import"./send-D08Om1-g.js";import"./check-BZdS_6PS.js";import"./circle-alert-BxGwOsHk.js";import"./chevron-down-Bi1FlLhE.js";import"./loader-circle-hqXnmJHc.js";import"./OfferNegotiation-DS1sBSF5.js";import"./arrow-right-BtytZ4W7.js";import"./handshake-DaMq3CTr.js";import"./circle-check-big-CI2o90L0.js";import"./DealerMapModal-BECMr718.js";import"./ContactDealerModal-DWAXvfHE.js";import"./thumbs-up-GFVCWAM-.js";import"./message-circle-Ch70LmJc.js";import"./share-2-BGcKVRvr.js";import"./sparkles-CV_umiUO.js";import"./gauge-z7JceOyA.js";import"./fuel-tt33NcUc.js";import"./chevron-up-kcwiXLwT.js";import"./trash-2-B2PQYx9T.js";import"./search-CHoNHP9C.js";import"./minus-CY7R9gsl.js";import"./Tabs-BUMU-xmO.js";import"./plus-ZeWtyTHf.js";const de={title:"Organisms/Header",component:i,parameters:{layout:"fullscreen",docs:{description:{component:`
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
