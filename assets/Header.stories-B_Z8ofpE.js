import{j as e}from"./iframe-CgUoK-hQ.js";import{H as i}from"./Header-CG5fxV70.js";import"./preload-helper-PPVm8Dsz.js";import"./vehicleService-BAIAK0V_.js";import"./index-BFhOOLG3.js";import"./useSupabaseRating-BGhOdxzs.js";import"./Button-iG14NSVa.js";import"./ExitIntentModal-ByTbEhd_.js";import"./x-bi8nA3M3.js";import"./createLucideIcon-Da5CRH6t.js";import"./heart-BNJbkSyM.js";import"./trending-down-DtI2n0WY.js";import"./file-text-CIgMX-uc.js";import"./OptimizedImage-Q59EmT4r.js";import"./DealerLocatorMap-wgFiVR55.js";import"./star-D02l7Ud8.js";import"./dealerService-CeBNsEgh.js";import"./award-CeLWy2Wv.js";import"./chevron-right-VVkz4baE.js";import"./map-pin-UJmpWtQ-.js";import"./phone-DlPIP5zM.js";import"./navigation-Bsuohai5.js";import"./dollar-sign-DTx8annB.js";import"./clock-C01OFVsy.js";import"./bookmark-CfmFIeaY.js";import"./external-link-Czq6tY6i.js";import"./index.modern-Db9D7lcc.js";import"./index-flROZAn_.js";import"./index-BRJwPLo6.js";import"./chevron-left-DCUX7m86.js";import"./map-QHpqvsRk.js";import"./MakeOfferModal-SLPWgwNL.js";import"./car-6Y3oKaaK.js";import"./message-square-gXpPSfRQ.js";import"./user-BmTsGj7S.js";import"./mail-pkapEGFj.js";import"./circle-check-big-8Zi6vtxw.js";import"./send-CbXdzNPw.js";import"./chevron-down-M-9yyUQl.js";import"./loader-circle-BS7L1dmE.js";import"./OfferNegotiation-Di3ElQRW.js";import"./arrow-right-ZqEC0Cpl.js";import"./handshake-DxVPPMT-.js";import"./DealerMapModal-Cjp6PwBv.js";import"./gauge-BzAhuILC.js";import"./fuel-DVaZkBng.js";import"./check-BwVsgOuI.js";import"./minus-gTYdqDdB.js";import"./trash-2-DWs0kI9L.js";import"./git-compare-Bcn3hNhA.js";import"./search-sWyouRpI.js";import"./plus-DlevoAlx.js";const re={title:"Organisms/Header",component:i,parameters:{layout:"fullscreen",docs:{description:{component:`
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
