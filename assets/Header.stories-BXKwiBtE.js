import{j as e}from"./iframe-BK2sHvyk.js";import{H as i}from"./Header-IiVxPdR6.js";import"./preload-helper-PPVm8Dsz.js";import"./vehicleService-BTivPZrm.js";import"./index-B-JoA3P0.js";import"./useSupabaseRating-DCNyvRhd.js";import"./dealRoutes-XyQ0L3Gs.js";import"./Button-Bj-LFLXT.js";import"./ExitIntentModal-5zwYgYAk.js";import"./x-0V1kmKiJ.js";import"./createLucideIcon-CO65N0pK.js";import"./heart-BRTLCKKC.js";import"./trending-down-vkNvwICW.js";import"./file-text-1IIVItq-.js";import"./OptimizedImage-MtqMFaib.js";import"./DealerLocatorMap-Xw-tipUz.js";import"./star-B-RwqmG0.js";import"./dealerService-CeBNsEgh.js";import"./award-CxFv1BMU.js";import"./chevron-right-pSVvOJZ7.js";import"./map-pin-DRIrKmww.js";import"./phone-CNQ4MYPr.js";import"./navigation-BwjARncS.js";import"./dollar-sign-CVEhGllN.js";import"./clock-BpHjK344.js";import"./bookmark-CKezh7fM.js";import"./external-link-BtJlE0cz.js";import"./index.modern-Dk2imZCp.js";import"./index-DlIvGO7v.js";import"./index-CvOaOzp4.js";import"./chevron-left-DfvVstNN.js";import"./map-DtlZrL4X.js";import"./MakeOfferModal-DxiwVjhE.js";import"./car-MUdbKTA1.js";import"./message-square-DVDS1m3M.js";import"./user-XWdBfZYO.js";import"./mail-D-Wrqv3Y.js";import"./send-0MxmlAjT.js";import"./check-EQGsrzAW.js";import"./circle-alert-Dr-y7Otu.js";import"./chevron-down-DJlw48s1.js";import"./loader-circle-BV52tvOw.js";import"./OfferNegotiation-tWS06lqW.js";import"./arrow-right-ERlEZxGe.js";import"./handshake-BoNROnP_.js";import"./circle-check-big-Drjot16x.js";import"./DealerMapModal-BlogprNK.js";import"./ContactDealerModal-CibeYqsJ.js";import"./thumbs-up-CDZHVVgz.js";import"./message-circle-BhWblQyU.js";import"./share-2-D2nGMrMG.js";import"./sparkles-DhA1ZTyI.js";import"./gauge-BLKTiIqw.js";import"./fuel-gYY3V7cA.js";import"./chevron-up-Bpi863md.js";import"./trash-2-DC17iG4W.js";import"./search-BR6wl2nl.js";import"./minus-GthWciem.js";import"./Tabs-BlVnH6sL.js";import"./plus-C6sG9u0X.js";const de={title:"Organisms/Header",component:i,parameters:{layout:"fullscreen",docs:{description:{component:`
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
