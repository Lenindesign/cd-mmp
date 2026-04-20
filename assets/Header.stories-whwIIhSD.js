import{j as e}from"./iframe-DNBQjkdv.js";import{H as i}from"./Header-BH60kp4T.js";import"./preload-helper-PPVm8Dsz.js";import"./vehicleService-BTivPZrm.js";import"./index-B-JoA3P0.js";import"./useSupabaseRating-DcM1ocCB.js";import"./dealRoutes-XyQ0L3Gs.js";import"./Button-BQuI6wnZ.js";import"./ExitIntentModal-Dal30bld.js";import"./x-BG6V81Zb.js";import"./createLucideIcon-7WkQExLW.js";import"./heart-l-SC6KF2.js";import"./trending-down-DsMDYEo2.js";import"./file-text-C5aOgQ5i.js";import"./OptimizedImage-D36PvJhs.js";import"./DealerLocatorMap-DdNZMxwi.js";import"./star-CsCMff2E.js";import"./dealerService-CeBNsEgh.js";import"./award-BW2Pg-Mu.js";import"./chevron-right-Dv_Khg9B.js";import"./map-pin-C7nQmKrS.js";import"./phone-BHJRsPAP.js";import"./navigation-C7DrywxD.js";import"./dollar-sign-BzQFR_Vi.js";import"./clock-DP4Kvxnk.js";import"./bookmark-B3cgWWui.js";import"./external-link-oqCP6kiu.js";import"./index.modern-B93RdzHS.js";import"./index-Bd_Gf1J4.js";import"./index-te5FyK4d.js";import"./chevron-left-B5GWkAOt.js";import"./map-BHTiNwjQ.js";import"./MakeOfferModal-DO0_RrjU.js";import"./car-CBvnC0m5.js";import"./message-square-10HKIBaq.js";import"./user-D5dn4PrP.js";import"./mail-DAAKCre2.js";import"./send-Hc82AG89.js";import"./check-C3F-binS.js";import"./circle-alert-Dv5WjlXv.js";import"./chevron-down-CsgxWsHw.js";import"./loader-circle-C_D_hBCu.js";import"./OfferNegotiation-BPI-wURF.js";import"./arrow-right-Df9MK2jC.js";import"./handshake-D40g_9hf.js";import"./circle-check-big-CyqEVmQ1.js";import"./DealerMapModal-CRyqPHBv.js";import"./ContactDealerModal-DXrkM7Fx.js";import"./thumbs-up-BEGCo6a5.js";import"./message-circle-PpJ_6jfS.js";import"./share-2-_d6Pz23v.js";import"./sparkles-BZ-506vt.js";import"./gauge-Cccqdo70.js";import"./fuel-BDPGgy-Z.js";import"./chevron-up-Co2sFm0t.js";import"./trash-2-CvVGKaqi.js";import"./search-Yunb6sH2.js";import"./minus-BGyfpas2.js";import"./Tabs-B35s1PJq.js";import"./plus-BVuTzlr3.js";const de={title:"Organisms/Header",component:i,parameters:{layout:"fullscreen",docs:{description:{component:`
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
