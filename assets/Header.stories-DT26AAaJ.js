import{j as e}from"./iframe-DD4Obs42.js";import{H as i}from"./Header-e73VacmS.js";import"./preload-helper-PPVm8Dsz.js";import"./vehicleService-ByoDejvg.js";import"./index-Dto8T7jp.js";import"./useSupabaseRating-mNBFJAdT.js";import"./Button-DD3SxNvp.js";import"./ExitIntentModal-BjJL9ecL.js";import"./x-DNoSNcXg.js";import"./createLucideIcon-CJOLpCou.js";import"./heart-C4ki9Vvz.js";import"./trending-down-DxPpQ4CY.js";import"./file-text-D_jLtCv_.js";import"./OptimizedImage-Cf5M8Q27.js";import"./DealerLocatorMap-CDrvMJDY.js";import"./star-CuqtqzDK.js";import"./dealerService-CeBNsEgh.js";import"./award-k9ffPGg2.js";import"./chevron-right-1LguEiE3.js";import"./map-pin-B2xYEzkb.js";import"./phone-CA3h-rx5.js";import"./navigation-CWohSF2Q.js";import"./dollar-sign-Dp0gkBSn.js";import"./clock-ggMBuSnO.js";import"./bookmark-DSmg6w6i.js";import"./external-link-C8EAHQZz.js";import"./index.modern-Bc90Y2CO.js";import"./index-BLDYFoS_.js";import"./index-BDYhmKuD.js";import"./chevron-left-dqFKHt17.js";import"./map-OzUUeJ-L.js";import"./MakeOfferModal-CpdYfkvo.js";import"./car-DDjOH6R6.js";import"./message-square-CQyJZHvK.js";import"./user-OVH7i-hp.js";import"./mail-CZW5zwRW.js";import"./circle-check-big-9ezKRqnU.js";import"./send-Cwq3whN2.js";import"./chevron-down-DNX4wjXi.js";import"./loader-circle-BHhpy9Om.js";import"./OfferNegotiation-BR-_M5Hu.js";import"./arrow-right-eusOeSTY.js";import"./handshake-CLSkcc3n.js";import"./DealerMapModal-CPCVKFuz.js";import"./gauge-BXDXH89H.js";import"./fuel-CRjCQ5rb.js";import"./check-B7aAckXM.js";import"./minus-Cd0nCsXi.js";import"./trash-2-DaOTKJTt.js";import"./search-DDtBYaYJ.js";import"./plus-Cq7z0RKf.js";const oe={title:"Organisms/Header",component:i,parameters:{layout:"fullscreen",docs:{description:{component:`
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
