import{j as e}from"./iframe-DcgZJ2Uo.js";import{H as i}from"./Header-D-_SLXYi.js";import"./preload-helper-PPVm8Dsz.js";import"./vehicleService-ByoDejvg.js";import"./index-Dto8T7jp.js";import"./useSupabaseRating-Bxc83TNr.js";import"./Button-Co7Azhno.js";import"./ExitIntentModal-Ceo5y7Qu.js";import"./x-BB0Nz_97.js";import"./createLucideIcon-DKG3LGyb.js";import"./heart-_HtJc7-M.js";import"./trending-down-CrzYH4RB.js";import"./file-text-B3vu-IB6.js";import"./OptimizedImage-ChMTuQlm.js";import"./DealerLocatorMap-B1eWniys.js";import"./star-7kdT4inm.js";import"./dealerService-CeBNsEgh.js";import"./award-Br_tVvyL.js";import"./chevron-right-yRPBPEK2.js";import"./map-pin-C_5X5z24.js";import"./phone-CFoeOw-2.js";import"./navigation-BeiFKOXF.js";import"./dollar-sign-Cl_PQzZD.js";import"./clock-DRyvOrK2.js";import"./bookmark-CuqTJ9Hf.js";import"./external-link-Bbf9X_lV.js";import"./index.modern-BcqBioLn.js";import"./index-DeohuagH.js";import"./index-CaJADRT1.js";import"./chevron-left-DK6Sx-3-.js";import"./map-DfoNpUYs.js";import"./MakeOfferModal-C_idQoik.js";import"./car-B6inJU5K.js";import"./message-square-B9-RtHw3.js";import"./user-BM4pz7d_.js";import"./mail-jkgnZIub.js";import"./circle-check-big-Bc_EXM6d.js";import"./send-ptctvyG1.js";import"./chevron-down-Oxi3i8G_.js";import"./loader-circle-bKLPK745.js";import"./OfferNegotiation-CBrcgpJH.js";import"./arrow-right-DWKCQdrl.js";import"./handshake-CSuZl7Rs.js";import"./DealerMapModal-CCuAGBrc.js";import"./gauge-PxPDhz2B.js";import"./fuel-CMCmyPO6.js";import"./check-BjCx1vVa.js";import"./minus-DOBcaEcu.js";import"./trash-2-BmZyP5Wj.js";import"./search-GUSVY_tW.js";import"./plus-B6_75szD.js";import"./sparkles-DIT04n3T.js";const re={title:"Organisms/Header",component:i,parameters:{layout:"fullscreen",docs:{description:{component:`
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
