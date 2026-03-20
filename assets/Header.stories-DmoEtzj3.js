import{j as e}from"./iframe-Ch6yy6AD.js";import{H as i}from"./Header-Bno_SsQ1.js";import"./preload-helper-PPVm8Dsz.js";import"./vehicleService-BktozO7f.js";import"./index-Dto8T7jp.js";import"./useSupabaseRating-CW_W6TtF.js";import"./Button-MuqDL1LF.js";import"./ExitIntentModal-DDJ8So7d.js";import"./x-Cgtk5N-h.js";import"./createLucideIcon-DRREatbj.js";import"./heart-o5s2rL3V.js";import"./trending-down-CnC3qEDz.js";import"./file-text-BVFHS9_C.js";import"./OptimizedImage-BJSHIyTZ.js";import"./DealerLocatorMap-B_nwMfMe.js";import"./star-DSytSfOc.js";import"./dealerService-CeBNsEgh.js";import"./award-BdNOgSq3.js";import"./chevron-right-DN_h8Zlm.js";import"./map-pin-Y7AmGx_u.js";import"./phone-BFB7RyUB.js";import"./navigation-BbCWLLu6.js";import"./dollar-sign-CPbQ9BqC.js";import"./clock-C5SW1Kgm.js";import"./bookmark-BDS0ZPtl.js";import"./external-link-aL4L-fqS.js";import"./index.modern-B4yZ7Deg.js";import"./index-C0QzqjQa.js";import"./index-BIkrLIQ6.js";import"./chevron-left-DUtzaIcG.js";import"./map-CVHSmUTz.js";import"./MakeOfferModal-B36QYjza.js";import"./car-Bf8Ui6Om.js";import"./message-square-DhTAvyGs.js";import"./user-CQc7fJBs.js";import"./mail-uUnV_oI0.js";import"./circle-check-big-CG0C3zxR.js";import"./send-CvVp0YOB.js";import"./chevron-down-9JYLLgjp.js";import"./loader-circle-D_e4kkyU.js";import"./OfferNegotiation-DdDFu3Ke.js";import"./arrow-right-SDQx36m8.js";import"./handshake-BAsUpwSN.js";import"./DealerMapModal-0FY2b01p.js";import"./ContactDealerModal-BNNiVTma.js";import"./thumbs-up-CgC2U9Fl.js";import"./message-circle-CT-AEmI6.js";import"./share-2-CskYYneD.js";import"./sparkles-J8yQEzR4.js";import"./gauge-OMn5AVhn.js";import"./fuel-CsLrTrxQ.js";import"./check-Dba9ju4X.js";import"./minus-DAqEe229.js";import"./trash-2-mR2bNomw.js";import"./search-BxFwZ3kc.js";import"./plus-Ct7CZoNd.js";const se={title:"Organisms/Header",component:i,parameters:{layout:"fullscreen",docs:{description:{component:`
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
}`,...r.parameters?.docs?.source}}};const pe=["Default","WithContent","Mobile"];export{t as Default,r as Mobile,o as WithContent,pe as __namedExportsOrder,se as default};
