import{j as e}from"./iframe-mRuCM7Wp.js";import{H as i}from"./Header-CHkaJEdZ.js";import"./preload-helper-PPVm8Dsz.js";import"./vehicleService-CgRIVwGT.js";import"./index-Bk6M7T92.js";import"./useSupabaseRating-BayG0zOh.js";import"./dealRoutes-XyQ0L3Gs.js";import"./Button-CCKi9dyN.js";import"./ExitIntentModal-DvojPu6u.js";import"./x-D7g2fkVG.js";import"./createLucideIcon-gXBQtdYV.js";import"./heart-D3GClrpm.js";import"./trending-down-Bc_hSPV2.js";import"./file-text-D9ozzKzv.js";import"./OptimizedImage-CBejr1zq.js";import"./DealerLocatorMap-B81N2jme.js";import"./star-D9SSmhRA.js";import"./dealerService-CeBNsEgh.js";import"./award-Ck_2tJrU.js";import"./chevron-right-gFkct_4X.js";import"./map-pin-OUFXRVEB.js";import"./phone-SLKvbRJZ.js";import"./navigation-BQROq3nc.js";import"./dollar-sign-CjD71SsG.js";import"./clock-Buj3W1tl.js";import"./bookmark-pL7yK9_u.js";import"./external-link-DI_vfgON.js";import"./index.modern-BNIXjuMf.js";import"./index-rdb25syk.js";import"./index-CrQenS4P.js";import"./chevron-left-D9wArIfy.js";import"./map--jtHYSLK.js";import"./MakeOfferModal-DtuwMrJE.js";import"./car-DANBfhrK.js";import"./message-square-D521mft6.js";import"./user-BVeUdS4V.js";import"./mail-7o3X3wAk.js";import"./send-DYkzQsSE.js";import"./check-1yjSSUcl.js";import"./circle-alert-BBA6eN-X.js";import"./chevron-down-DyJctj0T.js";import"./loader-circle-xifSNRPB.js";import"./OfferNegotiation-DmH_ehyG.js";import"./arrow-right-C91MhVfZ.js";import"./handshake-MajIYFdY.js";import"./circle-check-big-9f4svaVR.js";import"./DealerMapModal-BhUdrti8.js";import"./ContactDealerModal-CMcUABTy.js";import"./thumbs-up-DDvKOvcR.js";import"./message-circle-BuREZjOh.js";import"./share-2-BRx0lh6b.js";import"./sparkles-CqpYiJH5.js";import"./gauge-DHt5Kv0i.js";import"./fuel-L3Omne5O.js";import"./chevron-up-CMxcF2Es.js";import"./trash-2-DgUoKADr.js";import"./search-viDdt3L-.js";import"./minus-Dh8X_6HW.js";import"./Tabs-JreXD_n9.js";import"./plus-DjBuu2r4.js";const de={title:"Organisms/Header",component:i,parameters:{layout:"fullscreen",docs:{description:{component:`
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
