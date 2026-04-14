import{j as e}from"./iframe-DFxtnQRF.js";import{H as i}from"./Header-DwI1EpW2.js";import"./preload-helper-PPVm8Dsz.js";import"./vehicleService-CgRIVwGT.js";import"./index-Bk6M7T92.js";import"./useSupabaseRating-C16L384X.js";import"./dealRoutes-XyQ0L3Gs.js";import"./Button-C4IhpKUL.js";import"./ExitIntentModal-BWSu-Hhd.js";import"./x-kUs7-aVO.js";import"./createLucideIcon-Bv7jqSiY.js";import"./heart-Hg__wrmk.js";import"./trending-down-BVS_g61q.js";import"./file-text-CEcf9-Ij.js";import"./OptimizedImage-OXLOfd8b.js";import"./DealerLocatorMap-BiiIJY0X.js";import"./star-BpCZOF-0.js";import"./dealerService-CeBNsEgh.js";import"./award-BVEMGBRo.js";import"./chevron-right-DOPW_qm1.js";import"./map-pin-CpmJ6AsB.js";import"./phone-Bw5yUJzu.js";import"./navigation-B2flSkIo.js";import"./dollar-sign-4F-YhxLz.js";import"./clock-DKi3AHsN.js";import"./bookmark-CYyCOyB8.js";import"./external-link-CFecLWJV.js";import"./index.modern-DuZw9GCR.js";import"./index-DABF01nS.js";import"./index-CgZ_wkuH.js";import"./chevron-left-ym0VGBcx.js";import"./map-qGaar1cz.js";import"./MakeOfferModal-Ddymqosk.js";import"./car-BvqhIrfj.js";import"./message-square-BYRf_o1Q.js";import"./user-aZZiw3ID.js";import"./mail-CdikCi-W.js";import"./send-CqB9zHMq.js";import"./check-B4m7SuEe.js";import"./circle-alert-D8orvd8E.js";import"./chevron-down-CuaR0HI7.js";import"./loader-circle-BJICysw8.js";import"./OfferNegotiation-BmyJfYDe.js";import"./arrow-right-XirBdNwW.js";import"./handshake-C8QIxcVg.js";import"./circle-check-big-CIAxXbow.js";import"./DealerMapModal-Dnq4oNZB.js";import"./ContactDealerModal-BnCgP_7w.js";import"./thumbs-up-Bkabkpez.js";import"./message-circle-D-yMaw_h.js";import"./share-2-jBk3Vnb-.js";import"./sparkles-DDRe1AdU.js";import"./gauge-DPsjPGLN.js";import"./fuel-BsUlkj8A.js";import"./chevron-up-wCgm-i12.js";import"./trash-2-4-aeSJCx.js";import"./search-vLpw_NUU.js";import"./minus-DNvh6hTc.js";import"./Tabs-DiiQSI1l.js";import"./plus-CRzajx6U.js";const de={title:"Organisms/Header",component:i,parameters:{layout:"fullscreen",docs:{description:{component:`
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
