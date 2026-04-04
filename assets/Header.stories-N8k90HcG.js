import{j as e}from"./iframe-P9SyVhGv.js";import{H as i}from"./Header-DEbVhU9a.js";import"./preload-helper-PPVm8Dsz.js";import"./vehicleService-hRlSJfPL.js";import"./index-BirN2__4.js";import"./useSupabaseRating-DAtMnEKT.js";import"./Button-XYf6dnYd.js";import"./ExitIntentModal-BJMDERDk.js";import"./x-A9JXmlyT.js";import"./createLucideIcon-BG6h9CAt.js";import"./heart-B4XGVYKo.js";import"./trending-down-DdLaM6Br.js";import"./file-text-DGkSeDnU.js";import"./OptimizedImage-b7E2E9G-.js";import"./DealerLocatorMap-jkbg1AVR.js";import"./star-hZG0d58s.js";import"./dealerService-CeBNsEgh.js";import"./award-CRIgiyGJ.js";import"./chevron-right-D7UiGpb-.js";import"./map-pin-DevHrQgV.js";import"./phone-Cyg4MOAm.js";import"./navigation-Csa_H_ml.js";import"./dollar-sign-x5XiTUCE.js";import"./clock-aCbAjWuV.js";import"./bookmark-D2UYSPN-.js";import"./external-link-BxfX7OTe.js";import"./index.modern-C7I5HSa_.js";import"./index-BlZvv-GQ.js";import"./index-IIDIok6U.js";import"./chevron-left-Dg3-Gq8f.js";import"./map-9juqHNPB.js";import"./MakeOfferModal-BJ6aGRm7.js";import"./car-DoTcbb6q.js";import"./message-square-m7yZwFbV.js";import"./user-DBVMUd3q.js";import"./mail-ShgE02LZ.js";import"./circle-check-big-C-d3K3-Y.js";import"./send-C4V_KgW0.js";import"./chevron-down-DJ9PUYay.js";import"./loader-circle-DVJT-99G.js";import"./OfferNegotiation-DtfGnzqA.js";import"./arrow-right-BJFCuuBZ.js";import"./handshake-BCcNJRS1.js";import"./DealerMapModal-DuZ8jO9C.js";import"./ContactDealerModal-NfvozOqM.js";import"./thumbs-up-0LkYk5_M.js";import"./message-circle-Bz3MZ_5B.js";import"./share-2-kMx-1xHq.js";import"./sparkles-Btdq1Ca2.js";import"./gauge-CyTKyd5R.js";import"./fuel-CPeHxEvd.js";import"./chevron-up-BHZpsvzy.js";import"./trash-2-Y8o4ri8A.js";import"./search-B30sR13S.js";import"./check-CVNiJPFR.js";import"./minus-C9fM8dfx.js";import"./plus-CX_7VpL6.js";const pe={title:"Organisms/Header",component:i,parameters:{layout:"fullscreen",docs:{description:{component:`
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
