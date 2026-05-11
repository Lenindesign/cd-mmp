import{j as e}from"./iframe-CU0p2BQ-.js";import{H as i}from"./Header-C8Q7-0za.js";import"./preload-helper-PPVm8Dsz.js";import"./vehicleService-BQh7hfKs.js";import"./index-C_qiXwZJ.js";import"./useSupabaseRating-DrjLfLUu.js";import"./dealRoutes-XyQ0L3Gs.js";import"./Button-BSMzZeY1.js";import"./ExitIntentModal-DbOE4Kur.js";import"./x-DTbrzr6b.js";import"./createLucideIcon-leSJBOxT.js";import"./heart-DW-urJPk.js";import"./trending-down-CO4iAGxg.js";import"./file-text-C_dkqtum.js";import"./OptimizedImage-BVdC8lrt.js";import"./DealerLocatorMap-CMnnhagA.js";import"./star-rAL9PtyC.js";import"./dealerService-CeBNsEgh.js";import"./award-D64qfYMc.js";import"./chevron-right-C4bu8Rci.js";import"./map-pin-juXWZVnx.js";import"./phone-CE5CsRIW.js";import"./navigation-Bb3hDQ2H.js";import"./dollar-sign-CUIiuFxV.js";import"./clock-ApHw6Tkz.js";import"./bookmark-DDxRXOMH.js";import"./external-link-BZkrv6GX.js";import"./index.modern-BpPDYf7b.js";import"./index-BJbhdRQc.js";import"./index-DpwPBDOb.js";import"./chevron-left-CH0g-trJ.js";import"./map-Dp-z_hZ-.js";import"./MakeOfferModal-DF2nW8qZ.js";import"./car-S0HpSznV.js";import"./message-square-BUk-RKcg.js";import"./user-CHYf-STb.js";import"./mail-B905GXyo.js";import"./send-CGn12AO6.js";import"./check-CcOvOXCI.js";import"./circle-alert-BEwdfg55.js";import"./chevron-down-CV5y7pLr.js";import"./loader-circle-DP3OWrc4.js";import"./OfferNegotiation-CZ7vh8gJ.js";import"./arrow-right-DYv-OGsw.js";import"./handshake-DtioWKgO.js";import"./circle-check-big-B21JhFbY.js";import"./DealerMapModal-CDAfG4q9.js";import"./ContactDealerModal-CRwGA-NP.js";import"./thumbs-up-D13WN2pP.js";import"./message-circle-BI6u6T-v.js";import"./share-2-C-kyL6Wm.js";import"./sparkles-B-B7vdej.js";import"./gauge-BanFDq7R.js";import"./fuel-DipSQqeT.js";import"./chevron-up-DZrz_f-k.js";import"./trash-2-Cm-Uw7x8.js";import"./search-CF-IwQhv.js";import"./minus-CR-iJI21.js";import"./Tabs-TeABg-HG.js";import"./plus-Cm-JR90n.js";const de={title:"Organisms/Header",component:i,parameters:{layout:"fullscreen",docs:{description:{component:`
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
