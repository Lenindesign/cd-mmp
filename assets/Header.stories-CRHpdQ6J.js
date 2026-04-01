import{j as e}from"./iframe-D9YaANCI.js";import{H as i}from"./Header-D-3kKBvi.js";import"./preload-helper-PPVm8Dsz.js";import"./vehicleService-C21vsCue.js";import"./index-BirN2__4.js";import"./useSupabaseRating-ZpSZwxkl.js";import"./Button-CIM3hVGz.js";import"./ExitIntentModal-BQEHx_QF.js";import"./x-p8d6W-cX.js";import"./createLucideIcon-C_04NttN.js";import"./heart-EuRL3MEY.js";import"./trending-down-ssyRlOmc.js";import"./file-text-BTqIw9bU.js";import"./OptimizedImage-DKwr3x4v.js";import"./DealerLocatorMap-CP5jkSVK.js";import"./star-C4Lw2YcQ.js";import"./dealerService-CeBNsEgh.js";import"./award-DYORXLjZ.js";import"./chevron-right-25sqb5RU.js";import"./map-pin-BuVdkpLz.js";import"./phone-BHtyi1JN.js";import"./navigation-BlpD94sh.js";import"./dollar-sign-DdDHLhcj.js";import"./clock-SqkWiQpI.js";import"./bookmark-D-KgGOle.js";import"./external-link-D_fjIgof.js";import"./index.modern-CgOUw03_.js";import"./index-Dr_0V9hV.js";import"./index-DlRpJfRO.js";import"./chevron-left-CADo3eP3.js";import"./map-CUsH1_25.js";import"./MakeOfferModal-DM5FM6vV.js";import"./car-CfonLith.js";import"./message-square-DamLSxnR.js";import"./user-CJSBM4GV.js";import"./mail-BKc91393.js";import"./circle-check-big-Cycr-ZFf.js";import"./send-wzZ_BvBG.js";import"./chevron-down-B4LSvX8q.js";import"./loader-circle-CUAn8WiW.js";import"./OfferNegotiation-BxXAw2sg.js";import"./arrow-right-BqBmkts4.js";import"./handshake-DTctzPYm.js";import"./DealerMapModal-m2mT46L1.js";import"./ContactDealerModal-gnaIkkO5.js";import"./thumbs-up-DdzEe5yD.js";import"./message-circle-BAopyUw6.js";import"./share-2-c5iRpBzb.js";import"./sparkles-eIilIsBi.js";import"./gauge-oAJt-J1S.js";import"./fuel-DyYwX4TD.js";import"./chevron-up-CXuDvn_B.js";import"./trash-2-Cw1pPSJt.js";import"./search-_4hcVGQ-.js";import"./check-DZACZxRF.js";import"./minus-Cj8CCTXm.js";import"./plus-DE2dn_H0.js";const pe={title:"Organisms/Header",component:i,parameters:{layout:"fullscreen",docs:{description:{component:`
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
}`,...r.parameters?.docs?.source}}};const me=["Default","WithContent","Mobile"];export{t as Default,r as Mobile,o as WithContent,me as __namedExportsOrder,pe as default};
