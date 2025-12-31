import{j as e}from"./iframe-BbKq_w80.js";import{H as i}from"./Header-DhXdVuCh.js";import"./preload-helper-PPVm8Dsz.js";import"./vehicleService-C9AUetmr.js";import"./index-BBh40WXi.js";import"./useSupabaseRating-D5BioYyk.js";import"./Button-CTr_0GbW.js";import"./ExitIntentModal-Ci7ATKyD.js";import"./x-BY7uak1k.js";import"./createLucideIcon-BwL5wOHS.js";import"./heart-DCrky6vE.js";import"./trending-down-ByoGSC3Q.js";import"./file-text-DQLDztrA.js";import"./OptimizedImage-DnfOIviu.js";import"./DealerLocatorMap-D0-BUPLl.js";import"./star-BXwh6-sD.js";import"./dealerService-CeBNsEgh.js";import"./award-C5ds2ucf.js";import"./chevron-right-DNBDfc0R.js";import"./map-pin-Ccdz8Zx_.js";import"./phone-Cg-s7Jl_.js";import"./navigation-ChuQnLcF.js";import"./dollar-sign-D_4KsgxN.js";import"./clock-CWb3dde-.js";import"./bookmark-B75Tt3Xq.js";import"./external-link-CiXF-uYf.js";import"./index.modern-BWFydI0c.js";import"./index-BThjY3fw.js";import"./index-DhRvoBAL.js";import"./chevron-left-Bc-iTNJ5.js";import"./map--eCGe13k.js";import"./MakeOfferModal-C_LLdKxp.js";import"./car-BjNLawAt.js";import"./send-CWi0qfVJ.js";import"./user-vVp8uc46.js";import"./mail-MSFyWNK9.js";import"./circle-check-big-CMuBfaKt.js";import"./chevron-down-whr50Vhk.js";import"./loader-circle-rmT371kj.js";import"./OfferNegotiation-BsMGFBqR.js";import"./arrow-right-8L45ik9B.js";import"./handshake-HNCfHkjm.js";import"./DealerMapModal-zm0X1cVG.js";import"./gauge-C6xm4AAB.js";import"./fuel-BHSMwqXe.js";import"./check-B0_2gJfz.js";import"./minus-rclO1yQD.js";import"./trash-2-DGBJhe2b.js";import"./git-compare-CCUYA8M9.js";import"./search-wnfk5EXS.js";import"./plus-CCGH1QF8.js";const oe={title:"Organisms/Header",component:i,parameters:{layout:"fullscreen",docs:{description:{component:`
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
