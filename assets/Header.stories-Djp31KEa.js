import{j as e}from"./iframe-DmndRlf0.js";import{H as i}from"./Header-hX2UJcQy.js";import"./preload-helper-PPVm8Dsz.js";import"./vehicleService-DsqcyNHv.js";import"./index-BIJ_Z0xc.js";import"./useSupabaseRating-CrVwxiUi.js";import"./Button-BINAX9pF.js";import"./ExitIntentModal-BIJtcIey.js";import"./x-a1_nNonp.js";import"./createLucideIcon-BwCQpYwD.js";import"./heart-DCQjJtsZ.js";import"./trending-down-C-awk1YS.js";import"./file-text-BnuOf3TT.js";import"./OptimizedImage-boKlBIza.js";import"./DealerLocatorMap-Du3Ry785.js";import"./star-DLG5SZ4M.js";import"./dealerService-CeBNsEgh.js";import"./award-B3h-l9Au.js";import"./chevron-right-Bsv4_8Id.js";import"./map-pin-BnqK6bOy.js";import"./phone-DCYOFQE7.js";import"./navigation-Dxkx4fB0.js";import"./dollar-sign-CjNvGiGm.js";import"./clock-B2G6gnYH.js";import"./bookmark-Dlm8zI8O.js";import"./map-BFeYet2B.js";import"./index-kfOW6zv2.js";import"./index-CJjLmPW4.js";import"./chevron-left-CPhXjDFq.js";import"./MakeOfferModal-BYoHhgGC.js";import"./car-DbwrjJ2-.js";import"./send-DoOKwlKB.js";import"./user-CyMx193r.js";import"./mail-BG3TNArx.js";import"./circle-check-big-DlBhpGtR.js";import"./chevron-down-CTG0dS2e.js";import"./OfferNegotiation-BHfNJze3.js";import"./arrow-right-BZVTirMe.js";import"./handshake-DcvN3upq.js";import"./DealerMapModal-B11uHnYb.js";import"./trash-2-W8S_ob8m.js";import"./search-DH1p2yib.js";import"./plus-Bfr-McfP.js";const J={title:"Organisms/Header",component:i,parameters:{layout:"fullscreen",docs:{description:{component:`
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
