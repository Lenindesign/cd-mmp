import{j as e}from"./iframe-CwAjgNKQ.js";import{H as i}from"./Header-BTEfW0np.js";import"./preload-helper-PPVm8Dsz.js";import"./vehicleService-BNfwZwSS.js";import"./index-CR0fvk7o.js";import"./useSupabaseRating-BC_gyC5w.js";import"./Button-BcyC78nL.js";import"./ExitIntentModal-DL8QTZW2.js";import"./x-DKyyRwwq.js";import"./createLucideIcon-DYlIWxwW.js";import"./heart-504Cy81M.js";import"./trending-down-DCeuNX6l.js";import"./file-text-PCgt2qJP.js";import"./OptimizedImage-DbFa41el.js";import"./DealerLocatorMap-CslGs9MM.js";import"./star-jnPaGROO.js";import"./dealerService-BDy6a8ul.js";import"./chevron-right-CbYJ_8Lo.js";import"./map-pin-rrI5LSk_.js";import"./phone-DvOZ_5ou.js";import"./navigation-_BiW97NJ.js";import"./dollar-sign-Cc7UjEuP.js";import"./clock-DVUVR_vE.js";import"./bookmark-JCAp0K5P.js";import"./index-BgHh2FB0.js";import"./index-DqsF8ciE.js";import"./MakeOfferModal-CnBL5OA_.js";import"./car-DFeoGOhY.js";import"./user-B8_6jRd3.js";import"./mail-srxI_YIc.js";import"./circle-check-big-3NdwTtL9.js";import"./chevron-down-faSqtHDV.js";import"./OfferNegotiation-B8VCemf6.js";import"./arrow-right-C0kNhdNm.js";import"./search-C7nkfTXE.js";import"./plus-C5gm4MTa.js";const I={title:"Organisms/Header",component:i,parameters:{layout:"fullscreen",docs:{description:{component:`
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
}`,...r.parameters?.docs?.source}}};const L=["Default","WithContent","Mobile"];export{t as Default,r as Mobile,o as WithContent,L as __namedExportsOrder,I as default};
