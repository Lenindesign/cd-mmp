import{j as e}from"./iframe-C9nRNBvL.js";import{H as i}from"./Header-CLVjV4HH.js";import"./preload-helper-PPVm8Dsz.js";import"./vehicleService-CnHzEnwN.js";import"./index-B-JoA3P0.js";import"./useSupabaseRating-5CZw1xSy.js";import"./dealRoutes-XyQ0L3Gs.js";import"./Button-BcC00wFq.js";import"./ExitIntentModal-DBXqIV0h.js";import"./x-DSW3uQi0.js";import"./createLucideIcon-BKdUPq1F.js";import"./heart-CT8p837y.js";import"./trending-down-CalyTqhL.js";import"./file-text-nyVu4tdb.js";import"./OptimizedImage-CNCRcnO3.js";import"./DealerLocatorMap-GCs70GLU.js";import"./star-DOvHNOtK.js";import"./dealerService-CeBNsEgh.js";import"./award-DcEkutec.js";import"./chevron-right-0U2fXkP2.js";import"./map-pin-Bm-A5XtA.js";import"./phone-Ro6zA_HF.js";import"./navigation-D8PpEfZf.js";import"./dollar-sign-BCdklJYP.js";import"./clock-oGVZzXGd.js";import"./bookmark-BtrZMTpW.js";import"./external-link-BkKukgNN.js";import"./index.modern-u2Nz3rDy.js";import"./index-C4y90rid.js";import"./index-BHFzPwbB.js";import"./chevron-left-BPwynFro.js";import"./map-fI6-6Q5f.js";import"./MakeOfferModal-DZDEhvBt.js";import"./car-00Es7Zpf.js";import"./message-square-BIBvOEX1.js";import"./user-D5f5eHCD.js";import"./mail-CQobL2nx.js";import"./send-Bg-ZjqBE.js";import"./check-CxpR-HoO.js";import"./circle-alert-DOE5IUzR.js";import"./chevron-down-CJoTNsjt.js";import"./loader-circle-B3t0SsSu.js";import"./OfferNegotiation-BJFFGRfb.js";import"./arrow-right-BR6Hs8zn.js";import"./handshake-lXoou9Cz.js";import"./circle-check-big-BctbnI4q.js";import"./DealerMapModal-kvY7P0FS.js";import"./ContactDealerModal-CCwef1x9.js";import"./thumbs-up-CKoir7ZR.js";import"./message-circle-Buy_zC1U.js";import"./share-2-DgRKVufQ.js";import"./sparkles-DFH09v2x.js";import"./gauge-6taAUjrI.js";import"./fuel-CZBe8szj.js";import"./chevron-up-BW7tFNuj.js";import"./trash-2-DT1bl84J.js";import"./search-CuaPlgMj.js";import"./minus-Ct4WYst8.js";import"./Tabs-D6vuLM_F.js";import"./plus-SYiBnSZJ.js";const de={title:"Organisms/Header",component:i,parameters:{layout:"fullscreen",docs:{description:{component:`
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
