import{j as e}from"./iframe-c7KC4vJZ.js";import{H as i}from"./Header-D3xmrduT.js";import"./preload-helper-PPVm8Dsz.js";import"./vehicleService-DcljwXyi.js";import"./index-Dto8T7jp.js";import"./useSupabaseRating-DPh8yPw-.js";import"./Button-DgHtJ4s6.js";import"./ExitIntentModal-B_OjzAU7.js";import"./x-B_L3GnoH.js";import"./createLucideIcon-BwUsQFhX.js";import"./heart-C-1jjhlu.js";import"./trending-down-Dqrg2QMb.js";import"./file-text-BVCXGHUU.js";import"./OptimizedImage-BP7k6jh4.js";import"./DealerLocatorMap-DsxzCMzv.js";import"./star-CH_saj6e.js";import"./dealerService-CeBNsEgh.js";import"./award-CDmkxoOI.js";import"./chevron-right-C78_kgx9.js";import"./map-pin-CXRXRWQ8.js";import"./phone-DiaXEVcj.js";import"./navigation-8kPGwhdE.js";import"./dollar-sign-vd_nAJJg.js";import"./clock-ClICy3fj.js";import"./bookmark-Cn11kicp.js";import"./external-link-DdLMU0jo.js";import"./index.modern-f47Kt2oZ.js";import"./index-CgKFM2z0.js";import"./index-CKDf0Ykj.js";import"./chevron-left-DQdj3OuL.js";import"./map-D3fCDypl.js";import"./MakeOfferModal-Df5MJG43.js";import"./car-DS8mspyg.js";import"./message-square-Vr586Rji.js";import"./user-CkK_vf7S.js";import"./mail-BEmiD_bv.js";import"./circle-check-big-CNpNqWcV.js";import"./send-CPliJuAe.js";import"./chevron-down-CsmXQRZt.js";import"./loader-circle-BcLxxnwA.js";import"./OfferNegotiation-BH15YBSM.js";import"./arrow-right-B66FBKwN.js";import"./handshake-C66I8-OA.js";import"./DealerMapModal-rkCzLOZe.js";import"./ContactDealerModal-1DQEXTrV.js";import"./thumbs-up-DBYdEyRs.js";import"./message-circle-Dn0uBZuX.js";import"./share-2-B_szVZXz.js";import"./sparkles-Bu5rZZH9.js";import"./gauge-BeQkL6L9.js";import"./fuel-CQybnoEE.js";import"./chevron-up-C1xMbqZD.js";import"./trash-2-DhoayJXl.js";import"./search-8VOQk5ku.js";import"./check-DGk249To.js";import"./minus-BZx91y6r.js";import"./plus-BNc9Jawz.js";const pe={title:"Organisms/Header",component:i,parameters:{layout:"fullscreen",docs:{description:{component:`
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
