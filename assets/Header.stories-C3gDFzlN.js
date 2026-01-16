import{j as e}from"./iframe-CteVUm2l.js";import{H as i}from"./Header-N0AnXMgI.js";import"./preload-helper-PPVm8Dsz.js";import"./vehicleService-ByoDejvg.js";import"./index-Dto8T7jp.js";import"./useSupabaseRating-ftsWrTWC.js";import"./Button-DR_JsusX.js";import"./ExitIntentModal-D8RhrqYO.js";import"./x-Cbqxy3rM.js";import"./createLucideIcon-DtMutFgL.js";import"./heart-CDC31ZBj.js";import"./trending-down-Cf3LF1Mf.js";import"./file-text-D4S8rzZd.js";import"./OptimizedImage-Cmkuuhqv.js";import"./DealerLocatorMap-DHINCW69.js";import"./star-DP6dQ7Wm.js";import"./dealerService-CeBNsEgh.js";import"./award-BQKVI9QK.js";import"./chevron-right-BEIUjdx3.js";import"./map-pin-CEFPO0rW.js";import"./phone-DS-2Q5F_.js";import"./navigation-mO6oROWc.js";import"./dollar-sign-CG-mReYp.js";import"./clock-Dg2w_k6P.js";import"./bookmark-D0mPK2QD.js";import"./external-link-LGq6fpND.js";import"./index.modern-Bp-SLmBk.js";import"./index-B6aQLtd1.js";import"./index-Bp7IEKwQ.js";import"./chevron-left-87lk3GdH.js";import"./map-spdMj5p0.js";import"./MakeOfferModal-CYaLyol4.js";import"./car-ClNFjSDo.js";import"./message-square-Cs59Mj8t.js";import"./user-BLoj6gqB.js";import"./mail-BJDZmx9b.js";import"./circle-check-big-hi51GkKf.js";import"./send-8B7X9Y6L.js";import"./chevron-down-iIFIjJyE.js";import"./loader-circle-B8DjIva-.js";import"./OfferNegotiation-DDa1MRjb.js";import"./arrow-right-BKpXA6Eb.js";import"./handshake-Oxt5uvIE.js";import"./DealerMapModal-C_zZnwOd.js";import"./gauge-BpULPnKG.js";import"./fuel-DpdKe-7n.js";import"./check-BQ2jmn75.js";import"./minus-BvCn2vp9.js";import"./trash-2-ByJ51eWH.js";import"./search-DAETcLLI.js";import"./plus-DILxqcuF.js";import"./sparkles-BEt8zxc7.js";const re={title:"Organisms/Header",component:i,parameters:{layout:"fullscreen",docs:{description:{component:`
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
