import{j as e}from"./iframe--HJYFtuz.js";import{H as i}from"./Header-Cr5VHtCA.js";import"./preload-helper-PPVm8Dsz.js";import"./vehicleService-CnHzEnwN.js";import"./index-B-JoA3P0.js";import"./useSupabaseRating-Cf5uG8j1.js";import"./dealRoutes-XyQ0L3Gs.js";import"./Button-9QHpnHK1.js";import"./ExitIntentModal-BQ6GGda1.js";import"./x-BHUUnlwu.js";import"./createLucideIcon-CjdPT0zI.js";import"./heart-BPqQ-B8Z.js";import"./trending-down-CfTNcitC.js";import"./file-text-B8P0A6e4.js";import"./OptimizedImage-DqKSRfsB.js";import"./DealerLocatorMap-B-VZUe5P.js";import"./star-DOR_xMbV.js";import"./dealerService-CeBNsEgh.js";import"./award-B-MaBC-r.js";import"./chevron-right-lfCqk9N9.js";import"./map-pin-Do-EOavS.js";import"./phone-CDnck4HO.js";import"./navigation-D_fY5gkV.js";import"./dollar-sign-jUDiAlem.js";import"./clock-Dd1jacot.js";import"./bookmark-aJKPQDfj.js";import"./external-link-D61rJ0BY.js";import"./index.modern-rcrGfGx5.js";import"./index-DoFgYcdx.js";import"./index--IJDBM8J.js";import"./chevron-left-BUVZFPoD.js";import"./map-DvfRy9Gl.js";import"./MakeOfferModal-B1cg5bRE.js";import"./car-BLdEnW-N.js";import"./message-square-DVwo3AFb.js";import"./user-C1_EQEzg.js";import"./mail-CjE0mYnF.js";import"./send-DwVanSrl.js";import"./check-sL3U0RVd.js";import"./circle-alert-deT_BVAQ.js";import"./chevron-down-DJvzFA1k.js";import"./loader-circle-Ckg98VY7.js";import"./OfferNegotiation-BdcKxDCm.js";import"./arrow-right-Ky4ckjTS.js";import"./handshake-ClG2odH3.js";import"./circle-check-big-CX2ejycf.js";import"./DealerMapModal-DsVOsJqs.js";import"./ContactDealerModal-aDPog7bc.js";import"./thumbs-up-B4EUBoM0.js";import"./message-circle-BMC2YO6N.js";import"./share-2-Zi4rV7fI.js";import"./sparkles-C-RX8i_A.js";import"./gauge-C0h499py.js";import"./fuel-B2n8SnWU.js";import"./chevron-up-CoQdCZpz.js";import"./trash-2-DFtsWpW-.js";import"./search-CUD3JB0C.js";import"./minus-Du5wC4_A.js";import"./Tabs-DQV-mgx6.js";import"./plus-dep988Bb.js";const de={title:"Organisms/Header",component:i,parameters:{layout:"fullscreen",docs:{description:{component:`
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
}`,...r.parameters?.docs?.source}}};const le=["Default","WithContent","Mobile"];export{t as Default,r as Mobile,o as WithContent,le as __namedExportsOrder,de as default};
