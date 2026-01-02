import{j as e}from"./iframe-CoG26bPx.js";import{H as i}from"./Header-BIJMvo8h.js";import"./preload-helper-PPVm8Dsz.js";import"./vehicleService-BAIAK0V_.js";import"./index-BFhOOLG3.js";import"./useSupabaseRating-SNPyyoVT.js";import"./Button-WjXikz3r.js";import"./ExitIntentModal-B7wI01b1.js";import"./x-C2eGFpog.js";import"./createLucideIcon-B0KpOUPr.js";import"./heart-DcDkOGnK.js";import"./trending-down-CXgtz7cU.js";import"./file-text-DaFNWBjI.js";import"./OptimizedImage-Ci6tZPZP.js";import"./DealerLocatorMap-YooPu49J.js";import"./star-Bv1HFMdn.js";import"./dealerService-CeBNsEgh.js";import"./award-Dt0V4uWq.js";import"./chevron-right-C9-XMwOR.js";import"./map-pin-C_vunGob.js";import"./phone-C07lUFSc.js";import"./navigation-CXnUeDgG.js";import"./dollar-sign-CxAe8CxU.js";import"./clock-BgJJKjmW.js";import"./bookmark-CZ49uLBg.js";import"./external-link-DGi3ubbf.js";import"./index.modern-huVswBPM.js";import"./index-_uZz6fYL.js";import"./index-GEle-o8A.js";import"./chevron-left-D-4mQF1w.js";import"./map-DP-J8LF3.js";import"./MakeOfferModal-f_sbX82W.js";import"./car-D0zV_TJt.js";import"./message-square-_uOiveCM.js";import"./user-Bu9BYuA6.js";import"./mail-D92KuQ5Z.js";import"./circle-check-big-D4TZlFSB.js";import"./send-DpevdlZg.js";import"./chevron-down-BP--8vyF.js";import"./loader-circle-DQamJox4.js";import"./OfferNegotiation-D6JyfMo2.js";import"./arrow-right-BORuZHzm.js";import"./handshake--VZIYuBH.js";import"./DealerMapModal-CXBPkLgE.js";import"./gauge-DKT0lB0w.js";import"./fuel-FwJTcQYf.js";import"./check-DU-3RZPU.js";import"./minus-kMVQHrgb.js";import"./trash-2-Ckx9sqD6.js";import"./git-compare-B2CzqLDl.js";import"./search-C1m9xqxs.js";import"./plus-Delorh0b.js";const re={title:"Organisms/Header",component:i,parameters:{layout:"fullscreen",docs:{description:{component:`
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
