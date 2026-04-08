import{j as e}from"./iframe-D4BaQDUl.js";import{H as i}from"./Header-eqE6zA8I.js";import"./preload-helper-PPVm8Dsz.js";import"./vehicleService-DSnLjH3g.js";import"./index-BirN2__4.js";import"./useSupabaseRating-BSycZSpe.js";import"./dealRoutes-CRJk03s6.js";import"./Button-MkDB72rS.js";import"./ExitIntentModal-D1k-qbYL.js";import"./x-Cxdz-Ma4.js";import"./createLucideIcon-BUTvUVS0.js";import"./heart-B_rvw7wA.js";import"./trending-down-dL1kTIXu.js";import"./file-text-BucqwT1l.js";import"./OptimizedImage-DdRJQIV3.js";import"./DealerLocatorMap-k685syY_.js";import"./star-2eYa8RX3.js";import"./dealerService-CeBNsEgh.js";import"./award-iM4G-MO6.js";import"./chevron-right-DfGqJk6w.js";import"./map-pin-mHtR3Kbp.js";import"./phone-D0AgHQNe.js";import"./navigation-CMHqdJUz.js";import"./dollar-sign-7sUz3wVS.js";import"./clock-CqmawXw-.js";import"./bookmark-DsW0poeQ.js";import"./external-link-B4IvbE2r.js";import"./index.modern-DvMvoY4V.js";import"./index-7PlZeqcO.js";import"./index-CLMOy3_J.js";import"./chevron-left-CHJpvTIe.js";import"./map-DfxUBX2b.js";import"./MakeOfferModal-CB6G8Vii.js";import"./car-CicB_zm0.js";import"./message-square-COTKTu00.js";import"./user-CEEiDrqA.js";import"./mail-Cco2XoiX.js";import"./send-BlfGuqHm.js";import"./check-B2lgwMuK.js";import"./circle-alert-CyiNEotp.js";import"./chevron-down-Bt0WZ4wM.js";import"./loader-circle-BsOkJ0Dx.js";import"./OfferNegotiation-ByuEQEsb.js";import"./arrow-right-CTiDvUWH.js";import"./handshake-l2_-IwBi.js";import"./circle-check-big-C-fKo3hx.js";import"./DealerMapModal-D8A_aqxt.js";import"./ContactDealerModal-DTKTmzW2.js";import"./thumbs-up-cx-fzk_U.js";import"./message-circle-_oq5V7VU.js";import"./share-2-MgWAxG_j.js";import"./sparkles-Ctn9jG_A.js";import"./gauge-Cz0bb9ue.js";import"./fuel-D0w8Dgmy.js";import"./chevron-up-BfvtarBB.js";import"./trash-2-DjGucaKi.js";import"./search-IrKiXF2E.js";import"./minus-DR1giXJP.js";import"./plus-CY4PJmDa.js";const ce={title:"Organisms/Header",component:i,parameters:{layout:"fullscreen",docs:{description:{component:`
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
}`,...r.parameters?.docs?.source}}};const de=["Default","WithContent","Mobile"];export{t as Default,r as Mobile,o as WithContent,de as __namedExportsOrder,ce as default};
