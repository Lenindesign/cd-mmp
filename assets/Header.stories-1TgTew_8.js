import{j as e}from"./iframe-C2Wzpo-O.js";import{H as i}from"./Header-CDsXUIRG.js";import"./preload-helper-PPVm8Dsz.js";import"./vehicleService-ByoDejvg.js";import"./index-Dto8T7jp.js";import"./useSupabaseRating-CFxF7YSN.js";import"./Button-D6NhDtLu.js";import"./ExitIntentModal-Brzw32mB.js";import"./x-DesiaY3B.js";import"./createLucideIcon-ByvCI8r-.js";import"./heart-BZnRVGzj.js";import"./trending-down-DSzACMe-.js";import"./file-text-CsVQ_CRO.js";import"./OptimizedImage-B5dzNuHV.js";import"./DealerLocatorMap-B13PTc6g.js";import"./star-DSEiWf_H.js";import"./dealerService-CeBNsEgh.js";import"./award-CTGgNxq0.js";import"./chevron-right-C2buakh5.js";import"./map-pin-BC_iCAFH.js";import"./phone-DPmkeLBo.js";import"./navigation-NzseD2jh.js";import"./dollar-sign--rbkFXvs.js";import"./clock-DRjGVReA.js";import"./bookmark-CRaz5WFf.js";import"./external-link-B5DO0MBd.js";import"./index.modern-B7ROOZAr.js";import"./index-W5sI4W0O.js";import"./index-Cr3EaoYQ.js";import"./chevron-left-Cfe3vfCC.js";import"./map-AGwFFy17.js";import"./MakeOfferModal-DgjDpxYg.js";import"./car-hhyn1vP2.js";import"./message-square-CjLE4EZE.js";import"./user-DGnQ6-PI.js";import"./mail-DlDFRXPW.js";import"./circle-check-big-VU2wemBC.js";import"./send-Bt44yKvI.js";import"./chevron-down-Bmansu48.js";import"./loader-circle-CKidOk1d.js";import"./OfferNegotiation-CUFqtZeT.js";import"./arrow-right-DUJbH9ld.js";import"./handshake-DUZJcpfl.js";import"./DealerMapModal-CU5wdVHR.js";import"./gauge-BKlwe5sX.js";import"./fuel-BX8FAUJO.js";import"./check-C1o0kcX7.js";import"./minus-P8rbYReW.js";import"./trash-2-CNJM7CkC.js";import"./search-DFYilhUG.js";import"./plus-Dr6hnJlw.js";import"./sparkles-BBLfHpw6.js";const re={title:"Organisms/Header",component:i,parameters:{layout:"fullscreen",docs:{description:{component:`
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
}`,...r.parameters?.docs?.source}}};const ie=["Default","WithContent","Mobile"];export{t as Default,r as Mobile,o as WithContent,ie as __namedExportsOrder,re as default};
