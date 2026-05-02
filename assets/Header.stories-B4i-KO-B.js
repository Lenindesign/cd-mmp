import{j as e}from"./iframe-BS2z8RdX.js";import{H as i}from"./Header-8tmSBS67.js";import"./preload-helper-PPVm8Dsz.js";import"./vehicleService-CnHzEnwN.js";import"./index-B-JoA3P0.js";import"./useSupabaseRating-Dr9s7aeq.js";import"./dealRoutes-XyQ0L3Gs.js";import"./Button-DNaVLnCU.js";import"./ExitIntentModal-DRR2tirk.js";import"./x-DGKvJBPp.js";import"./createLucideIcon-gszLVzT7.js";import"./heart-DJfelOwI.js";import"./trending-down-BkKk63ev.js";import"./file-text-DRY4nUlP.js";import"./OptimizedImage-BIrYRXa5.js";import"./DealerLocatorMap-DojAKJQU.js";import"./star-5K5bmij0.js";import"./dealerService-CeBNsEgh.js";import"./award-Cwh9giq6.js";import"./chevron-right-CUk-kZs7.js";import"./map-pin-CvdjRlkI.js";import"./phone-SD0qghOa.js";import"./navigation-Bbf2yLp0.js";import"./dollar-sign-RMe8FkM_.js";import"./clock-Bz0i61uk.js";import"./bookmark-CQCxsd1F.js";import"./external-link-D1cKZraE.js";import"./index.modern-QbcYNNpP.js";import"./index-SNGMquSH.js";import"./index-CvTOM7GM.js";import"./chevron-left-DpGWRqYW.js";import"./map-DtIJdDAL.js";import"./MakeOfferModal-BIG8cIAV.js";import"./car-Czrax2ry.js";import"./message-square-CaINzlZ7.js";import"./user-b-KLAGUE.js";import"./mail-BXMVCB8i.js";import"./send-BcpY-H7O.js";import"./check-BNbT-CqM.js";import"./circle-alert-ct3IkvsX.js";import"./chevron-down-C89BbLTm.js";import"./loader-circle-CzHK_IS8.js";import"./OfferNegotiation-BLxywodV.js";import"./arrow-right-niueiuF-.js";import"./handshake-DbWprDYy.js";import"./circle-check-big-Dc69j4-a.js";import"./DealerMapModal-DnJZ080g.js";import"./ContactDealerModal-DCszfE1_.js";import"./thumbs-up-DuvCBl5Q.js";import"./message-circle-C4Z9G9QN.js";import"./share-2-0tTYrSMc.js";import"./sparkles-CAYZCeG-.js";import"./gauge-ChxKy6rc.js";import"./fuel-w0bRkjBl.js";import"./chevron-up-CxRW16vs.js";import"./trash-2-CG6eRrjD.js";import"./search-CHCmL15o.js";import"./minus-C3qj7JXM.js";import"./Tabs-Bx1hTptg.js";import"./plus-CkINpZ_K.js";const de={title:"Organisms/Header",component:i,parameters:{layout:"fullscreen",docs:{description:{component:`
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
