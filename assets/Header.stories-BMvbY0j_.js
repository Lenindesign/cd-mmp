import{j as e}from"./iframe-C_0MgdmF.js";import{H as i}from"./Header-CNIOQdu_.js";import"./preload-helper-PPVm8Dsz.js";import"./vehicleService-BTivPZrm.js";import"./index-B-JoA3P0.js";import"./useSupabaseRating-CQDPDS4y.js";import"./dealRoutes-XyQ0L3Gs.js";import"./Button-CjWTTMV_.js";import"./ExitIntentModal-BIrrqifU.js";import"./x-CsfMEbqA.js";import"./createLucideIcon-C-u5g85F.js";import"./heart-GI-Q7hct.js";import"./trending-down-DAKSWDpQ.js";import"./file-text-k1aQAABj.js";import"./OptimizedImage-Dz-dVGt3.js";import"./DealerLocatorMap-BBvmB1e_.js";import"./star-DE_85-Jl.js";import"./dealerService-CeBNsEgh.js";import"./award-C7tInEDG.js";import"./chevron-right-CLjLfpGx.js";import"./map-pin-C9M6k62Z.js";import"./phone-eqUR9Snn.js";import"./navigation-C3H6KWRU.js";import"./dollar-sign-6NtB86_i.js";import"./clock-Db9q4N-O.js";import"./bookmark-BnITqbdd.js";import"./external-link-CeySEExv.js";import"./index.modern-DdhaP0Q4.js";import"./index-Ckkz_msV.js";import"./index-CSKzhiB3.js";import"./chevron-left-CGfpnvos.js";import"./map-Dnj7Db82.js";import"./MakeOfferModal-dxkBpsE8.js";import"./car-BHiV88OS.js";import"./message-square-C9P_iLmV.js";import"./user-CUqOFalo.js";import"./mail-CGql3hxx.js";import"./send-CFO6PNRt.js";import"./check-CDWbPAfO.js";import"./circle-alert-Cz-vzWOD.js";import"./chevron-down-scDtrlF5.js";import"./loader-circle-B8Sq_geA.js";import"./OfferNegotiation-CmXJ9Qms.js";import"./arrow-right-CGR_gveM.js";import"./handshake-C0mKZEBc.js";import"./circle-check-big-Bzv40QvI.js";import"./DealerMapModal-CI_jzLgc.js";import"./ContactDealerModal-TdtO-13-.js";import"./thumbs-up-BofnEXYO.js";import"./message-circle-DQp-NmFE.js";import"./share-2-sT2nqQtn.js";import"./sparkles-CwHFLrVy.js";import"./gauge-Dj8iuHfR.js";import"./fuel-BXVBc5og.js";import"./chevron-up-CjkCNnzm.js";import"./trash-2-7i8RIttg.js";import"./search-D194XTdC.js";import"./minus-DdBpL5ic.js";import"./Tabs-BYWADqqU.js";import"./plus-BCQ56M4g.js";const de={title:"Organisms/Header",component:i,parameters:{layout:"fullscreen",docs:{description:{component:`
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
