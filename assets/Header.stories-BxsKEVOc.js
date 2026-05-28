import{j as e}from"./iframe-CmnVBpk4.js";import{H as i}from"./Header-7iPWzA7R.js";import"./preload-helper-PPVm8Dsz.js";import"./vehicleService-23eXHQkm.js";import"./index-C_qiXwZJ.js";import"./useSupabaseRating-SR7ilpBw.js";import"./dealRoutes-XyQ0L3Gs.js";import"./Button-BJZjZzqY.js";import"./stateVehicleTaxes-Dzz8tD-t.js";import"./createLucideIcon-B7bYelxZ.js";import"./OptimizedImage-9DaVvjlY.js";import"./DealerLocatorMap-h43y2vcu.js";import"./star-OYv0YwMG.js";import"./x-CejGoXyj.js";import"./dealerService-CeBNsEgh.js";import"./award-CY-x6Xp8.js";import"./chevron-right-DrkrjK1k.js";import"./map-pin-Sl_7B_U7.js";import"./phone-DMWY62dS.js";import"./navigation-qP42MHDl.js";import"./dollar-sign-Bo3YaX60.js";import"./ExitIntentModal-dVlKj_1e.js";import"./heart-XQDQd0KW.js";import"./trending-down-Kxw8PIiR.js";import"./file-text-D1OInc_s.js";import"./clock-CSe9vTmt.js";import"./bookmark-D_YiqVnL.js";import"./external-link-DIR2YlNu.js";import"./index.modern-BEtamRll.js";import"./index-Npth2K1x.js";import"./index-CM1N7ntz.js";import"./chevron-left-CpLlyKHq.js";import"./map-C3OCGFap.js";import"./MakeOfferModal-Cmk9K0EU.js";import"./car-D_xgoc35.js";import"./message-square-BvdDXCdQ.js";import"./user-B-YuwaCz.js";import"./mail-mio6whCQ.js";import"./send-BLIbtmw1.js";import"./check-BBtEEIKG.js";import"./circle-alert-49oZjkfj.js";import"./chevron-down-B8fkWg7V.js";import"./loader-circle-CY0QqUl8.js";import"./OfferNegotiation-ZaQWBkvH.js";import"./arrow-right-BdvlUEpV.js";import"./handshake-CO6doOpV.js";import"./circle-check-big-BwXgJXv5.js";import"./DealerMapModal-BCbWUkDE.js";import"./ContactDealerModal-P3Z9dQaN.js";import"./thumbs-up-COLZ2AOX.js";import"./message-circle-BjQTECiU.js";import"./share-2-BenYDkbD.js";import"./sparkles-CCRaFBQi.js";import"./gauge-DScdom88.js";import"./fuel-B9Pvfus5.js";import"./chevron-up-CDpu4PUj.js";import"./trash-2-B8HJFoC8.js";import"./search-BNvVEIKo.js";import"./minus--xDfhC4P.js";import"./Tabs-C5E0DeWT.js";import"./plus-lZmak6WI.js";const le={title:"Organisms/Header",component:i,parameters:{layout:"fullscreen",docs:{description:{component:`
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
}`,...r.parameters?.docs?.source}}};const he=["Default","WithContent","Mobile"];export{t as Default,r as Mobile,o as WithContent,he as __namedExportsOrder,le as default};
