import{j as e}from"./iframe-drEoDQFA.js";import{H as i}from"./Header-D7SjVcDH.js";import"./preload-helper-PPVm8Dsz.js";import"./vehicleService-BTivPZrm.js";import"./index-B-JoA3P0.js";import"./useSupabaseRating-ZMqk6ol9.js";import"./dealRoutes-XyQ0L3Gs.js";import"./Button-BEK-FW8e.js";import"./ExitIntentModal-d_JE__00.js";import"./x-koa_Tbf2.js";import"./createLucideIcon-CH7LsbzG.js";import"./heart-V6SXZlQH.js";import"./trending-down-1OwYEbu9.js";import"./file-text-hsLCTbHX.js";import"./OptimizedImage-BKOQjj9S.js";import"./DealerLocatorMap-Bj_EZ5_z.js";import"./star-DIyea9Ta.js";import"./dealerService-CeBNsEgh.js";import"./award-DwTfvV5K.js";import"./chevron-right-C8elMR5I.js";import"./map-pin-3QMKhze0.js";import"./phone-DHERpwDO.js";import"./navigation-Bu1Vdx8C.js";import"./dollar-sign-CbX8Y5cf.js";import"./clock-BDX2dBOj.js";import"./bookmark-BJv4neVv.js";import"./external-link-D5ezHwMD.js";import"./index.modern-Be72T0jU.js";import"./index-CV8uQFg8.js";import"./index-D0iIBdiO.js";import"./chevron-left-_zhvgrSJ.js";import"./map-Hdsashdj.js";import"./MakeOfferModal-DGj5hqyq.js";import"./car-BNj9bS1C.js";import"./message-square-CpoG-90y.js";import"./user-30TEikMH.js";import"./mail-Cj00EkeH.js";import"./send-BOYZfVbt.js";import"./check-DzZXPg2H.js";import"./circle-alert-DHwXZMGG.js";import"./chevron-down-9ASNXEVM.js";import"./loader-circle-ha5JDpz2.js";import"./OfferNegotiation-DzxQFKsR.js";import"./arrow-right-cI6OyXiA.js";import"./handshake-D0RXmc-T.js";import"./circle-check-big-DBW4BrC2.js";import"./DealerMapModal-Ci7ZYA29.js";import"./ContactDealerModal-JJQY7NPG.js";import"./thumbs-up-LpJS1lro.js";import"./message-circle-BL8V_63D.js";import"./share-2-3vj_LIlV.js";import"./sparkles-CpeJj_f0.js";import"./gauge-B2G0JcQK.js";import"./fuel-kwSTmJy2.js";import"./chevron-up-B1P31xGf.js";import"./trash-2-CN_5ic9F.js";import"./search-GR48RY7Q.js";import"./minus-ljbYuv3s.js";import"./Tabs-D4321_x8.js";import"./plus-DSJG5zuY.js";const de={title:"Organisms/Header",component:i,parameters:{layout:"fullscreen",docs:{description:{component:`
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
