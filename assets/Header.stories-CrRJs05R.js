import{j as e}from"./iframe-BmlzIRR_.js";import{H as i}from"./Header-D9-w0bxj.js";import"./preload-helper-PPVm8Dsz.js";import"./vehicleService-ByoDejvg.js";import"./index-Dto8T7jp.js";import"./useSupabaseRating-D6y5Bz9d.js";import"./Button-YF_tCJ3c.js";import"./ExitIntentModal-C2tHCOEZ.js";import"./x-DGb687Pz.js";import"./createLucideIcon-DgLfEH63.js";import"./heart-CY-GI0Qz.js";import"./trending-down-BYsVYpKj.js";import"./file-text-DUNK_hE0.js";import"./OptimizedImage-Dwr8UMOH.js";import"./DealerLocatorMap-CQpoOVdW.js";import"./star-DOPOocri.js";import"./dealerService-CeBNsEgh.js";import"./award-CW_PxOTe.js";import"./chevron-right-vruojDbX.js";import"./map-pin-M2Ik2-dy.js";import"./phone-DpuAwVUf.js";import"./navigation-3YFRKrsn.js";import"./dollar-sign-DuNxEzwU.js";import"./clock-0x5zA-sV.js";import"./bookmark-D6Vrcg_W.js";import"./external-link-ymsK_54G.js";import"./index.modern-B7GR65YA.js";import"./index-GS6FdTf2.js";import"./index-DZ-CxhYd.js";import"./chevron-left-Cl9KcpBt.js";import"./map-DWN5NN0D.js";import"./MakeOfferModal-DZjK8LQs.js";import"./car-DkEH3YTq.js";import"./message-square-NXjkGAs2.js";import"./user-D8NR4kAw.js";import"./mail-Cdfmct8w.js";import"./circle-check-big-zZ72vb2Y.js";import"./send-DVB_4Hib.js";import"./chevron-down-CB7Yq9Qy.js";import"./loader-circle-Crd4YP7d.js";import"./OfferNegotiation-D9xBJRrK.js";import"./arrow-right-CksbzqHn.js";import"./handshake-CfSU6g4t.js";import"./DealerMapModal-foa5h4ab.js";import"./gauge-B8NM3GD7.js";import"./fuel-B_SH_oUv.js";import"./check-B2xFXvbq.js";import"./minus-ySV4Rf1f.js";import"./trash-2-YMOkIzsg.js";import"./search-P8mUwha7.js";import"./plus-CTbSrqTB.js";const oe={title:"Organisms/Header",component:i,parameters:{layout:"fullscreen",docs:{description:{component:`
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
