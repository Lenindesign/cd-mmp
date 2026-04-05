import{j as e}from"./iframe-BnRE8u_B.js";import{H as i}from"./Header-B6oHChhF.js";import"./preload-helper-PPVm8Dsz.js";import"./vehicleService-DSnLjH3g.js";import"./index-BirN2__4.js";import"./useSupabaseRating-DM_E8BDg.js";import"./Button-BnuxTq81.js";import"./ExitIntentModal-D3RRQ98i.js";import"./x-CLxZHHVf.js";import"./createLucideIcon-Dmms1yXF.js";import"./heart-Do1jjStB.js";import"./trending-down-BRFTXVWe.js";import"./file-text-OCmQkSiH.js";import"./OptimizedImage-OjI5x5jN.js";import"./DealerLocatorMap-D3uMhCWc.js";import"./star-C1m_-tMb.js";import"./dealerService-CeBNsEgh.js";import"./award-D7sZXgbW.js";import"./chevron-right-DZ7ro3fO.js";import"./map-pin-C28MwCrA.js";import"./phone-BCAmLjBG.js";import"./navigation-02aCZC_7.js";import"./dollar-sign-DyFbES6o.js";import"./clock-BWiHJcVY.js";import"./bookmark-C3U-KCwk.js";import"./external-link-NeRwli4m.js";import"./index.modern-chynvY16.js";import"./index-B8liF4Y_.js";import"./index-DtoqgnAe.js";import"./chevron-left-UYiW97HO.js";import"./map-C3r13rtM.js";import"./MakeOfferModal-BNGwuzjv.js";import"./car-B5J-ueBC.js";import"./message-square-9yBV9APm.js";import"./user-Bw3MrwFt.js";import"./mail-CUut6tYR.js";import"./circle-check-big-BEhBz5r6.js";import"./send-DyA95XsL.js";import"./chevron-down-BIHIza9h.js";import"./loader-circle-DCTrvy4O.js";import"./OfferNegotiation-Dt3cvh3I.js";import"./arrow-right-l9yXPJBz.js";import"./handshake-BKBsU1hv.js";import"./DealerMapModal-reD8eNIS.js";import"./ContactDealerModal-VZOXdfDS.js";import"./thumbs-up-COPcAyfu.js";import"./message-circle-CDW3B6To.js";import"./share-2-y5rjS-ls.js";import"./sparkles-PjDQrj1s.js";import"./gauge-I5pWdppC.js";import"./fuel-BnxtEMkm.js";import"./chevron-up-Cuj3IzIZ.js";import"./trash-2-DDUp0wYL.js";import"./search-CDWY7qDi.js";import"./check-9bNUpgCR.js";import"./minus-PmhPiCiY.js";import"./plus-DCVewGUn.js";const pe={title:"Organisms/Header",component:i,parameters:{layout:"fullscreen",docs:{description:{component:`
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
}`,...r.parameters?.docs?.source}}};const me=["Default","WithContent","Mobile"];export{t as Default,r as Mobile,o as WithContent,me as __namedExportsOrder,pe as default};
