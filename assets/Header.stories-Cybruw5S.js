import{j as e}from"./iframe-Dm1m59UU.js";import{H as i}from"./Header-CVedKA3M.js";import"./preload-helper-PPVm8Dsz.js";import"./vehicleService-C9AUetmr.js";import"./index-BBh40WXi.js";import"./useSupabaseRating-CHPNB8jG.js";import"./Button-aUGFd11X.js";import"./ExitIntentModal-owuY4mxb.js";import"./x-Cq4--wgT.js";import"./createLucideIcon-DBmoREDj.js";import"./heart-fUR0hy8h.js";import"./trending-down-DovFsMnH.js";import"./file-text-uVXNMGuG.js";import"./OptimizedImage-C1ABB3o2.js";import"./DealerLocatorMap-D9an5bfO.js";import"./star-BWbddHOH.js";import"./dealerService-CeBNsEgh.js";import"./award-D8D__leQ.js";import"./chevron-right-BXGa5Rnw.js";import"./map-pin-BOBXFg-A.js";import"./phone-Ca4Qcs9j.js";import"./navigation-C4Cz-7qX.js";import"./dollar-sign-rPXi0YJI.js";import"./clock-DPxKK6Nv.js";import"./bookmark-1z7R4Ig3.js";import"./external-link-6kO31zoG.js";import"./index.modern-ezGTYw0p.js";import"./index-CAa25vTA.js";import"./index-yRDP7nOr.js";import"./chevron-left-DHkbuCnO.js";import"./map-wuu0gIVi.js";import"./MakeOfferModal-DGq-1U9r.js";import"./car-aqp1nL8w.js";import"./send-gIDhhSNa.js";import"./user-DUeyf2Fw.js";import"./mail-CR42PDvt.js";import"./circle-check-big-UCPJ8ns-.js";import"./chevron-down-CCmtAeOW.js";import"./loader-circle-B8nLp2hD.js";import"./OfferNegotiation-CddWLjUP.js";import"./arrow-right-DJs80fQ0.js";import"./handshake-UEM59WKH.js";import"./DealerMapModal-DA_IsfPw.js";import"./gauge-D46gw_sE.js";import"./fuel-CtMFwiGa.js";import"./check-Ci83NMx5.js";import"./minus-Do4L1NE8.js";import"./trash-2-CLq7WaO0.js";import"./git-compare-8NUGEAin.js";import"./search-ZPvGmA4d.js";import"./plus-DMQfM5SG.js";const oe={title:"Organisms/Header",component:i,parameters:{layout:"fullscreen",docs:{description:{component:`
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
