import{j as e}from"./iframe-CqAfinKm.js";import{H as i}from"./Header-BL7qr6yF.js";import"./preload-helper-PPVm8Dsz.js";import"./vehicleService-ByoDejvg.js";import"./index-Dto8T7jp.js";import"./useSupabaseRating-DGvbgJJA.js";import"./Button-CnlFGEwq.js";import"./ExitIntentModal-BmWK0avC.js";import"./x-naXXmRkS.js";import"./createLucideIcon-AVlh641-.js";import"./heart-sC9o3DCi.js";import"./trending-down-CqyWkpd0.js";import"./file-text-Dqn7BMpb.js";import"./OptimizedImage-DMsndihn.js";import"./DealerLocatorMap-BoU0EWE9.js";import"./star-B3AwRJAX.js";import"./dealerService-CeBNsEgh.js";import"./award-Cwh2iLTB.js";import"./chevron-right-D2IyJY7Z.js";import"./map-pin-CNm3vPse.js";import"./phone-C4OnUuMR.js";import"./navigation-Bz7hEMve.js";import"./dollar-sign-ClaVoZqp.js";import"./clock-Chi2Ks8D.js";import"./bookmark-BFpQDpN1.js";import"./external-link-DnGcV3CV.js";import"./index.modern-B6UmIFde.js";import"./index-DaLrXP_q.js";import"./index-Bjr8VhFu.js";import"./chevron-left-Dk4F3Qje.js";import"./map-CqCxug33.js";import"./MakeOfferModal-Dx1JqmHw.js";import"./car-BLyvoumI.js";import"./message-square-ykTlcbjU.js";import"./user-r_trQZ0U.js";import"./mail-C4MdndAQ.js";import"./circle-check-big-MzSafQ6m.js";import"./send-CNIwzMf8.js";import"./chevron-down-DP8cohnd.js";import"./loader-circle-C7XotbUG.js";import"./OfferNegotiation-4HRH1Vf7.js";import"./arrow-right-Dkq7xmkn.js";import"./handshake-09N6nyUj.js";import"./DealerMapModal-D7ABtnmU.js";import"./gauge-BlpctIcb.js";import"./fuel-BNEdo9Pu.js";import"./check-lGVYjU84.js";import"./minus-Bt-nAPjc.js";import"./trash-2-BJamuyi0.js";import"./search-CGycZPqE.js";import"./plus-CbFtP1rB.js";import"./sparkles-DRxU0ELj.js";const re={title:"Organisms/Header",component:i,parameters:{layout:"fullscreen",docs:{description:{component:`
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
