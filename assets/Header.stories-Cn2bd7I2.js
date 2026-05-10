import{j as e}from"./iframe-9-WnR1yl.js";import{H as i}from"./Header-q-wly131.js";import"./preload-helper-PPVm8Dsz.js";import"./vehicleService-BQh7hfKs.js";import"./index-C_qiXwZJ.js";import"./useSupabaseRating-DIlIQ6p9.js";import"./dealRoutes-XyQ0L3Gs.js";import"./Button-Bhmijayh.js";import"./ExitIntentModal-BkKz5Zu1.js";import"./x-B9RsuOx_.js";import"./createLucideIcon-h63lLyrC.js";import"./heart-wJ_S1hGo.js";import"./trending-down-CgsFzjSn.js";import"./file-text-BEbhDLyr.js";import"./OptimizedImage-DD414eEO.js";import"./DealerLocatorMap-BQ6jBy_y.js";import"./star-Deuid1x9.js";import"./dealerService-CeBNsEgh.js";import"./award-ByOGJrwt.js";import"./chevron-right-DOejO5Eo.js";import"./map-pin-C45UcO39.js";import"./phone-DTUJhlFu.js";import"./navigation-B7JQ8pzU.js";import"./dollar-sign-CLEY_y5a.js";import"./clock-Dcjh0WCX.js";import"./bookmark-Cl1unpld.js";import"./external-link-JF7Vt8i-.js";import"./index.modern-BmODLuUl.js";import"./index-w-jJ0aXr.js";import"./index-CQISq_48.js";import"./chevron-left-NqJyueS7.js";import"./map-GUPrbYqg.js";import"./MakeOfferModal-bvJ9EbQf.js";import"./car-DxZTgehK.js";import"./message-square-CHz-wWNC.js";import"./user-CgC1Pe4-.js";import"./mail-BDPairDi.js";import"./send-Corjfj_9.js";import"./check-L_y4Xm1N.js";import"./circle-alert-CpCFFTrj.js";import"./chevron-down-Bf2wEsny.js";import"./loader-circle-Lza3aGqO.js";import"./OfferNegotiation-B71khNJK.js";import"./arrow-right-FAji7wia.js";import"./handshake-ncu9ygVi.js";import"./circle-check-big-DVDF26Lf.js";import"./DealerMapModal-BTKM_2nz.js";import"./ContactDealerModal-BYxrInh7.js";import"./thumbs-up-DelyeELx.js";import"./message-circle-5tK9GuBB.js";import"./share-2-DSV4wlUI.js";import"./sparkles-mRUcqk0H.js";import"./gauge-DvcvonD2.js";import"./fuel-C9lV_kLe.js";import"./chevron-up-rf5HjFv8.js";import"./trash-2-B9TnjVV1.js";import"./search-B3AZCvO2.js";import"./minus-Bs1sJLwp.js";import"./Tabs-DTbRpxOB.js";import"./plus-B6ReJkj7.js";const de={title:"Organisms/Header",component:i,parameters:{layout:"fullscreen",docs:{description:{component:`
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
