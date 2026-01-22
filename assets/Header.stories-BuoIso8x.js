import{j as e}from"./iframe--VFCZUcI.js";import{H as i}from"./Header-DTFq7C0L.js";import"./preload-helper-PPVm8Dsz.js";import"./vehicleService-ByoDejvg.js";import"./index-Dto8T7jp.js";import"./useSupabaseRating-BV3ZNala.js";import"./Button-vO-LgRwP.js";import"./ExitIntentModal-DX4zq63o.js";import"./x-DFZ9uvXk.js";import"./createLucideIcon-v1gFwtaC.js";import"./heart-DIdkC-qu.js";import"./trending-down-mrpV9qDP.js";import"./file-text-C7pA6Agd.js";import"./OptimizedImage-DQivZxW6.js";import"./DealerLocatorMap-BLVTKPNR.js";import"./star-BP7t5tAW.js";import"./dealerService-CeBNsEgh.js";import"./award-jJSGw8UX.js";import"./chevron-right-aPbxIwN1.js";import"./map-pin-XKaDwpY5.js";import"./phone-DVsAjwii.js";import"./navigation-CSTRsdu2.js";import"./dollar-sign-DwkjB_qE.js";import"./clock-CW06hPWw.js";import"./bookmark-CmFvM05p.js";import"./external-link-Cdx6lUfb.js";import"./index.modern-CHqqU2dZ.js";import"./index-Cm4Bs538.js";import"./index-09Jj3do-.js";import"./chevron-left-CNz8I0G8.js";import"./map-CXTNoyzu.js";import"./MakeOfferModal-PlugbJvf.js";import"./car-6C2spSjQ.js";import"./message-square-92SO_zsP.js";import"./user-D2ppXxks.js";import"./mail-BECxDrY0.js";import"./circle-check-big-B3LtvI5W.js";import"./send-DF7cWYHd.js";import"./chevron-down-CcFDwdLm.js";import"./loader-circle-lv5-2GOm.js";import"./OfferNegotiation-f-RRooyU.js";import"./arrow-right-DmNcGzO6.js";import"./handshake-Dd8Y-H5C.js";import"./DealerMapModal-i_YYPCKr.js";import"./gauge-Bd14qIPk.js";import"./fuel-oUbJCole.js";import"./check-DN1qRibJ.js";import"./minus-C1BkVYHi.js";import"./trash-2-oKHLmH1q.js";import"./search-C51roOJN.js";import"./plus-RNNSpfus.js";import"./sparkles-jym2_aO_.js";const re={title:"Organisms/Header",component:i,parameters:{layout:"fullscreen",docs:{description:{component:`
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
