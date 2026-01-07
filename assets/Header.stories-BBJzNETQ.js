import{j as e}from"./iframe-DSzUAVkL.js";import{H as i}from"./Header-CHu6XprW.js";import"./preload-helper-PPVm8Dsz.js";import"./vehicleService-B-u2_KDL.js";import"./index-Dto8T7jp.js";import"./useSupabaseRating-B7Z3yFCU.js";import"./Button-CLCg5ZDv.js";import"./ExitIntentModal-wp2b-H1m.js";import"./x-BfVGgb6q.js";import"./createLucideIcon-_TrQDDwW.js";import"./heart-DVS31ekA.js";import"./trending-down-BxJkn2Aw.js";import"./file-text-BTsZMN2G.js";import"./OptimizedImage-c6Dwvv5P.js";import"./DealerLocatorMap-x7nMuuX0.js";import"./star-DlRqS4oD.js";import"./dealerService-CeBNsEgh.js";import"./award-DUT3uYXT.js";import"./chevron-right-BCZl0eDm.js";import"./map-pin-CrDn_wnd.js";import"./phone-BCU5w05U.js";import"./navigation-Mw8JvOod.js";import"./dollar-sign-Cn_OkYku.js";import"./clock-yuKcE2PY.js";import"./bookmark-BeWRHr3k.js";import"./external-link-CH_OERt0.js";import"./index.modern-J70zx7Qi.js";import"./index-Cq0do1ta.js";import"./index-DTFuIbY1.js";import"./chevron-left-hyweuL6A.js";import"./map-C26zcPvJ.js";import"./MakeOfferModal-DZ8G6QtI.js";import"./car-Cq_KlzYp.js";import"./message-square-CfzL9_mw.js";import"./user-E4qQUn4u.js";import"./mail-CsPdtCBZ.js";import"./circle-check-big-IaXTQA6u.js";import"./send-BdsKx6nD.js";import"./chevron-down-ByFtcX6n.js";import"./loader-circle-D4G-9EaK.js";import"./OfferNegotiation-8ausdEzf.js";import"./arrow-right-D31GzoMM.js";import"./handshake-D3rKJZIz.js";import"./DealerMapModal-D2fdTiOW.js";import"./gauge-DuN2Alom.js";import"./fuel-D_R7gnBU.js";import"./check-CGxlTJh2.js";import"./minus-Cq3l3RX_.js";import"./trash-2-CJEu7BlQ.js";import"./search-dvS0-iTJ.js";import"./plus-13QDxlo-.js";const oe={title:"Organisms/Header",component:i,parameters:{layout:"fullscreen",docs:{description:{component:`
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
}`,...r.parameters?.docs?.source}}};const re=["Default","WithContent","Mobile"];export{t as Default,r as Mobile,o as WithContent,re as __namedExportsOrder,oe as default};
