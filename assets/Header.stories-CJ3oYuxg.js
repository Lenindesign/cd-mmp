import{j as e}from"./iframe-DbH_ucHO.js";import{H as i}from"./Header-B8TQaKDO.js";import"./preload-helper-PPVm8Dsz.js";import"./vehicleService-DsqcyNHv.js";import"./index-BIJ_Z0xc.js";import"./useSupabaseRating-DDmFQZyX.js";import"./Button-BVWKAUS5.js";import"./ExitIntentModal-BMzCbz8S.js";import"./x-6yLSU2Ds.js";import"./createLucideIcon-Du2TAp2n.js";import"./heart-DOP4PdlE.js";import"./trending-down-BnFNSNvh.js";import"./file-text-oKWuQ4U3.js";import"./OptimizedImage-BBT9CLPs.js";import"./DealerLocatorMap-DE51fMb-.js";import"./star-CCn8jZI_.js";import"./dealerService-CeBNsEgh.js";import"./award-CHcXKLbI.js";import"./chevron-right-CawSpziu.js";import"./map-pin-CkaJ2wjc.js";import"./phone-E1T5tPim.js";import"./navigation-BS5u3uER.js";import"./dollar-sign-CeW2Al9l.js";import"./clock-4uI8Bx0O.js";import"./bookmark-D6RNGxcZ.js";import"./map-pV3P85xs.js";import"./index-B58b8P2M.js";import"./index-Dx1rrKFt.js";import"./chevron-left-BGf_hjP4.js";import"./MakeOfferModal-Cm0sESZj.js";import"./car-DRaYcOr1.js";import"./send-rMqRWkUZ.js";import"./user-Bx7xv269.js";import"./mail-Bg0dDf_d.js";import"./circle-check-big-IfD-XDYJ.js";import"./chevron-down-CqR443Fw.js";import"./OfferNegotiation-CtkUFN_k.js";import"./arrow-right-Cfz6cHVz.js";import"./handshake-ChvV5IPp.js";import"./DealerMapModal-D_dGjcul.js";import"./trash-2-itseiisp.js";import"./search-eH5Sd2jo.js";import"./plus-JZ40RFqG.js";const J={title:"Organisms/Header",component:i,parameters:{layout:"fullscreen",docs:{description:{component:`
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
