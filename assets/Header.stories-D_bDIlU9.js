import{j as e}from"./iframe-BOzAsBWc.js";import{H as i}from"./Header-D2rwY_N2.js";import"./preload-helper-PPVm8Dsz.js";import"./vehicleService-BAIAK0V_.js";import"./index-BFhOOLG3.js";import"./useSupabaseRating-rv582vGc.js";import"./Button-BuZlXAEb.js";import"./ExitIntentModal-Clo2LxXD.js";import"./x-Ctf2wuCA.js";import"./createLucideIcon-Du1IfIe8.js";import"./heart-DDRuxa-x.js";import"./trending-down-BcfodrMy.js";import"./file-text-D6J4XxDr.js";import"./OptimizedImage-Cewn2N0i.js";import"./DealerLocatorMap-DarPQH45.js";import"./star-CNxm9QZi.js";import"./dealerService-CeBNsEgh.js";import"./award-DxmcCmFl.js";import"./chevron-right-CtHWFVAW.js";import"./map-pin-9Z2Y-nU_.js";import"./phone-sIk7-FUn.js";import"./navigation-Bee6iGfy.js";import"./dollar-sign-D8rFEyHe.js";import"./clock-gcwb6wCx.js";import"./bookmark-D50SuBRs.js";import"./external-link-C39aJ3Is.js";import"./index.modern-ved-b0Rs.js";import"./index-DujLHdHj.js";import"./index-DH9SiuAw.js";import"./chevron-left-CmgEzO8o.js";import"./map-Ckr_mH_P.js";import"./MakeOfferModal-7qk8KIic.js";import"./car-yPqMWXDw.js";import"./message-square-CNUeW5ot.js";import"./user-D6j00g5q.js";import"./mail-C1_M_u61.js";import"./circle-check-big-Vm32DGua.js";import"./send-CtaYuBV2.js";import"./chevron-down-CfK36BF5.js";import"./loader-circle-BgdUJOEi.js";import"./OfferNegotiation-7XEI419A.js";import"./arrow-right-DC92AKzo.js";import"./handshake-DwznKjk2.js";import"./DealerMapModal-xVyWCHsw.js";import"./gauge-DGQ6mzuZ.js";import"./fuel-C4LEnQl9.js";import"./check-CjKIIsTS.js";import"./minus-D7ZJQRG2.js";import"./trash-2-504aZIfz.js";import"./search-DGvvJQqZ.js";import"./plus-RUCO8TBX.js";const oe={title:"Organisms/Header",component:i,parameters:{layout:"fullscreen",docs:{description:{component:`
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
