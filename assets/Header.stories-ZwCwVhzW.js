import{j as e}from"./iframe-CqNL8EhG.js";import{H as i}from"./Header-BAJxTDXU.js";import"./preload-helper-PPVm8Dsz.js";import"./vehicleService-DcljwXyi.js";import"./index-Dto8T7jp.js";import"./useSupabaseRating-kjCrQV5Z.js";import"./Button-B7POEh0L.js";import"./ExitIntentModal-ByTP757h.js";import"./x-D6tlSvlX.js";import"./createLucideIcon-yaVVjqPw.js";import"./heart-BJjris1m.js";import"./trending-down-Bklh1HF6.js";import"./file-text-C8fd4ZBL.js";import"./OptimizedImage-DSH5ZMUI.js";import"./DealerLocatorMap-C-m4uw_j.js";import"./star-CgZSOdyn.js";import"./dealerService-CeBNsEgh.js";import"./award-Bdo4QoFe.js";import"./chevron-right-7gonEu7G.js";import"./map-pin-DXP09hB7.js";import"./phone-BOf3gdpU.js";import"./navigation-DPrJjGH8.js";import"./dollar-sign-BfM56tlB.js";import"./clock-DuC6VI8L.js";import"./bookmark-CyxwWBXj.js";import"./external-link-C3UGJ-Cf.js";import"./index.modern-DucRO7UJ.js";import"./index-B_RntDb1.js";import"./index-BC2o-bIO.js";import"./chevron-left-BfaFvInq.js";import"./map-DfgXrCRs.js";import"./MakeOfferModal-eqItqmzg.js";import"./car-Btvi3tJj.js";import"./message-square-ehKHd7Dg.js";import"./user-BF5J2C54.js";import"./mail-DZza8N2M.js";import"./circle-check-big-BGFJ4jiu.js";import"./send-PjDIw5X0.js";import"./chevron-down-j4v6yNUc.js";import"./loader-circle-BQ7j_Ntx.js";import"./OfferNegotiation-BSbsq9VM.js";import"./arrow-right-DmDn6v7g.js";import"./handshake-BOUlyL87.js";import"./DealerMapModal-DZoPhX2L.js";import"./ContactDealerModal-C7SJuKhY.js";import"./thumbs-up-DjxjG-aw.js";import"./message-circle-CnOkNJrF.js";import"./share-2-D1wx1c_i.js";import"./sparkles-BtPTFig9.js";import"./gauge-BmXt4fue.js";import"./fuel-DxNZ13IW.js";import"./chevron-up-B1VIL2bR.js";import"./trash-2-CLGNiPjE.js";import"./search-CNqwI2qM.js";import"./check-DAhsUhGy.js";import"./minus-C0w-T9qi.js";import"./plus-uqRcLTbZ.js";const pe={title:"Organisms/Header",component:i,parameters:{layout:"fullscreen",docs:{description:{component:`
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
