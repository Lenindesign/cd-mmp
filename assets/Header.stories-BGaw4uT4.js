import{j as e}from"./iframe-nHj4x5VR.js";import{H as i}from"./Header-bxgH8mG8.js";import"./preload-helper-PPVm8Dsz.js";import"./vehicleService-CnHzEnwN.js";import"./index-B-JoA3P0.js";import"./useSupabaseRating-BNcDKlhG.js";import"./dealRoutes-XyQ0L3Gs.js";import"./Button-D8abD4r-.js";import"./ExitIntentModal-Yk9HKGPU.js";import"./x-EcGwC9Tg.js";import"./createLucideIcon-C-jT_sBc.js";import"./heart-BhcZ1t56.js";import"./trending-down-CZ6UXQyL.js";import"./file-text-a4XWd7gV.js";import"./OptimizedImage-qwnF5kCF.js";import"./DealerLocatorMap-CGQmXp5Z.js";import"./star-CnJjja9l.js";import"./dealerService-CeBNsEgh.js";import"./award-9dcd1GBV.js";import"./chevron-right-CStyDf15.js";import"./map-pin-BYk0ySoJ.js";import"./phone-DB044zEr.js";import"./navigation-ByxNbrYJ.js";import"./dollar-sign-sRyyATXs.js";import"./clock-srXGM3Ll.js";import"./bookmark-BQjgVSZ2.js";import"./external-link-C8OclvJ5.js";import"./index.modern-BFwZK9iY.js";import"./index-Cq7tv7L4.js";import"./index-DJqMZx-a.js";import"./chevron-left-DIA0myNw.js";import"./map-Dw5OIE0S.js";import"./MakeOfferModal-DNe8RFyn.js";import"./car-DZ1GVmNz.js";import"./message-square-BRs899VI.js";import"./user-CTyNkSGk.js";import"./mail-VY5wZUhs.js";import"./send-CSCt9Nal.js";import"./check-z1MQQyGf.js";import"./circle-alert-B5txZu0Z.js";import"./chevron-down-B0k4SY9R.js";import"./loader-circle-9pepcUJ5.js";import"./OfferNegotiation-DSp0DulY.js";import"./arrow-right-ShpbHNnD.js";import"./handshake-BeQGOkly.js";import"./circle-check-big-CVhfsV7W.js";import"./DealerMapModal-ZOBn_cv1.js";import"./ContactDealerModal-CcpLNeiJ.js";import"./thumbs-up-BKB_iOi6.js";import"./message-circle-CufmzZBh.js";import"./share-2-CnjmDEi_.js";import"./sparkles-DWTci8sb.js";import"./gauge-BGNBA-Hq.js";import"./fuel-DUQ0mApi.js";import"./chevron-up-vZXQ90sS.js";import"./trash-2-B1VUkfrk.js";import"./search-DEv0xRAs.js";import"./minus-DYL7fZm9.js";import"./Tabs-BgllfO7c.js";import"./plus-BXCEDC1X.js";const de={title:"Organisms/Header",component:i,parameters:{layout:"fullscreen",docs:{description:{component:`
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
