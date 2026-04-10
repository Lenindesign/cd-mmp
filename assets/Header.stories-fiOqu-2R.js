import{j as e}from"./iframe-Cc7pLAmS.js";import{H as i}from"./Header-1FhNZEV9.js";import"./preload-helper-PPVm8Dsz.js";import"./vehicleService-DSnLjH3g.js";import"./index-BirN2__4.js";import"./useSupabaseRating-DaTnrfBD.js";import"./dealRoutes-CRJk03s6.js";import"./Button-CzWwErSU.js";import"./ExitIntentModal-DTnh7qek.js";import"./x-Bt_zrA5o.js";import"./createLucideIcon-BxekWB38.js";import"./heart-BVOZxiiP.js";import"./trending-down-B7PikUkk.js";import"./file-text-DKsiZ-FB.js";import"./OptimizedImage-CLhTjtqK.js";import"./DealerLocatorMap-vYK9xcFx.js";import"./star-NWaVEI7n.js";import"./dealerService-CeBNsEgh.js";import"./award-3yEQnX5W.js";import"./chevron-right-3KfCyNs8.js";import"./map-pin-CADPq9Ny.js";import"./phone-U_UJkEel.js";import"./navigation-CYBr7cd6.js";import"./dollar-sign-Cn2eV061.js";import"./clock-Pl0RO6GT.js";import"./bookmark-DX3wawpl.js";import"./external-link-Ci7_P1c8.js";import"./index.modern-Y-KPJ3FC.js";import"./index-ClkfE0j5.js";import"./index--aZgod-V.js";import"./chevron-left-B3SrHqg9.js";import"./map-D_YZMz8X.js";import"./MakeOfferModal-B582Wj1f.js";import"./car-BVYgb-lc.js";import"./message-square-CedVfVtX.js";import"./user-b0UHEA_F.js";import"./mail-D0kTGjsy.js";import"./send-DDDD6Xyt.js";import"./check-paZtWVh8.js";import"./circle-alert-BWMN3-iA.js";import"./chevron-down-BnwQFP1f.js";import"./loader-circle-D_iPnDmZ.js";import"./OfferNegotiation-FgqbMNwD.js";import"./arrow-right-BMWYOpDA.js";import"./handshake-WN6IcV79.js";import"./circle-check-big-BXr5bE8m.js";import"./DealerMapModal-BgezdA2D.js";import"./ContactDealerModal-BJ5yMv-_.js";import"./thumbs-up-DvxJ8s0c.js";import"./message-circle-CWqJAadv.js";import"./share-2-BX32lZVi.js";import"./sparkles-EfRzRDa7.js";import"./gauge-BW15bhFG.js";import"./fuel-DdaCBq2b.js";import"./chevron-up-BDHuGl6g.js";import"./trash-2-D-KpS6fT.js";import"./search-DLLRedFp.js";import"./minus-BYXnRymG.js";import"./Tabs-B6aktdyI.js";import"./plus-Cqhr3UuC.js";const de={title:"Organisms/Header",component:i,parameters:{layout:"fullscreen",docs:{description:{component:`
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
