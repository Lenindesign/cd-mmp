import{j as e}from"./iframe-Cel4iEsB.js";import{H as i}from"./Header-CcNMVMqD.js";import"./preload-helper-PPVm8Dsz.js";import"./vehicleService-DSnLjH3g.js";import"./index-BirN2__4.js";import"./useSupabaseRating-Cow0cvJB.js";import"./dealRoutes-CRJk03s6.js";import"./Button-CoPyGmCb.js";import"./ExitIntentModal-TiKKegBm.js";import"./x-CgsuCijt.js";import"./createLucideIcon-Bz4i2NG-.js";import"./heart-B0ZKu6Ee.js";import"./trending-down-AQO5t6wJ.js";import"./file-text-CfQno8XF.js";import"./OptimizedImage-DLg5Za5l.js";import"./DealerLocatorMap-DLWfGVYs.js";import"./star-CD5huVYv.js";import"./dealerService-CeBNsEgh.js";import"./award-_57Qq_LM.js";import"./chevron-right-DBHC1Icr.js";import"./map-pin-Crihrkjr.js";import"./phone-8Da-CGmI.js";import"./navigation-glZb4aax.js";import"./dollar-sign-CUw4JC1l.js";import"./clock-DZGbc-Z8.js";import"./bookmark-BEqTohne.js";import"./external-link-VoedyI89.js";import"./index.modern-BBnA42-g.js";import"./index-CodzHeN-.js";import"./index-BiFA0twV.js";import"./chevron-left-BHXGyURJ.js";import"./map-BQprC-OE.js";import"./MakeOfferModal-DWlzHZdr.js";import"./car-P0Mg7B-n.js";import"./message-square-21aFR4Yv.js";import"./user-CW49Z46o.js";import"./mail-DM4lsQ7s.js";import"./circle-check-big-7gsPpIRW.js";import"./send-4F6f2CMT.js";import"./chevron-down-Bcfy4ax1.js";import"./loader-circle-oWcR-urK.js";import"./OfferNegotiation-jCzC-zom.js";import"./arrow-right-CKc5U61b.js";import"./handshake-BEmY2vBe.js";import"./DealerMapModal-DY2KA5VB.js";import"./ContactDealerModal-33TPChOO.js";import"./thumbs-up-B58_AYOf.js";import"./message-circle-Dexx8KYI.js";import"./share-2-CBdR9HlY.js";import"./sparkles-Df3O3RN1.js";import"./gauge-BIsrc4mh.js";import"./fuel-BVdn6YFt.js";import"./chevron-up-z2whq8gB.js";import"./trash-2-DD2BPmnR.js";import"./search-Ble_nvFn.js";import"./check-B1S9sKwg.js";import"./minus-C2qQYvlU.js";import"./plus-CgvPR7FG.js";const me={title:"Organisms/Header",component:i,parameters:{layout:"fullscreen",docs:{description:{component:`
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
}`,...r.parameters?.docs?.source}}};const ce=["Default","WithContent","Mobile"];export{t as Default,r as Mobile,o as WithContent,ce as __namedExportsOrder,me as default};
