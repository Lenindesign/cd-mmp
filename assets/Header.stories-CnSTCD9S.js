import{j as e}from"./iframe-C4r8BkDO.js";import{H as i}from"./Header-CPT0S2gH.js";import"./preload-helper-PPVm8Dsz.js";import"./vehicleService-BgTLe7Kk.js";import"./index-B-JoA3P0.js";import"./useSupabaseRating-BceOOD89.js";import"./dealRoutes-XyQ0L3Gs.js";import"./Button-g9YjWNwA.js";import"./ExitIntentModal-BFLs8PsZ.js";import"./x-CmcB5s7U.js";import"./createLucideIcon-BiiLtDA_.js";import"./heart-CcMi69V-.js";import"./trending-down-LHoDpL5O.js";import"./file-text-BKstgw8G.js";import"./OptimizedImage-Dw_7LstZ.js";import"./DealerLocatorMap-CM0w4vr8.js";import"./star-BzEZJSVt.js";import"./dealerService-CeBNsEgh.js";import"./award-hOHBPQCr.js";import"./chevron-right-BIG9v5ut.js";import"./map-pin-DxtXJD_9.js";import"./phone-BmPdzCMq.js";import"./navigation-3XKkVFs2.js";import"./dollar-sign-BSl_Fp7C.js";import"./clock-DCVfrPxb.js";import"./bookmark-BMUhQ6Ye.js";import"./external-link-LS54MSD8.js";import"./index.modern-CUrFOir7.js";import"./index-BLpNsXT7.js";import"./index-BiZVRLIB.js";import"./chevron-left-DxfRWd4w.js";import"./map-BfNTZM1B.js";import"./MakeOfferModal-LYQpT-ad.js";import"./car-as18JVCK.js";import"./message-square-BLLB36TT.js";import"./user-BuKwB4tm.js";import"./mail-VxxvEPkF.js";import"./send-BMd2rZW-.js";import"./check-BSY_gc10.js";import"./circle-alert-DhNSCzdZ.js";import"./chevron-down-Poncx1GI.js";import"./loader-circle-CaLgPGyo.js";import"./OfferNegotiation-DeGwbgpE.js";import"./arrow-right-C6pvhP97.js";import"./handshake-cYPCPBTk.js";import"./circle-check-big-BTHSnZ1f.js";import"./DealerMapModal-nRXasx30.js";import"./ContactDealerModal-BFNVEjl6.js";import"./thumbs-up-DoWz29px.js";import"./message-circle-Cyoytn5d.js";import"./share-2-qIPyYRw4.js";import"./sparkles-CQ7DcSjh.js";import"./gauge-CgRkz1c9.js";import"./fuel-KCDmshAe.js";import"./chevron-up-D9qxu8YL.js";import"./trash-2-FOti43MP.js";import"./search-OWaHgLC9.js";import"./minus-xgtn1E88.js";import"./Tabs-BySvC6-s.js";import"./plus-4ptat7EM.js";const de={title:"Organisms/Header",component:i,parameters:{layout:"fullscreen",docs:{description:{component:`
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
