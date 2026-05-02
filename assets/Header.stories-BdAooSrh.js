import{j as e}from"./iframe-DU6cSYYs.js";import{H as i}from"./Header-BOENoJ7l.js";import"./preload-helper-PPVm8Dsz.js";import"./vehicleService-CnHzEnwN.js";import"./index-B-JoA3P0.js";import"./useSupabaseRating-C0X9KB01.js";import"./dealRoutes-XyQ0L3Gs.js";import"./Button-CsPvCKQX.js";import"./ExitIntentModal-Cr4rTxJ9.js";import"./x-CfDEO6Ml.js";import"./createLucideIcon-B1QiAkhu.js";import"./heart-DSZEWVph.js";import"./trending-down-BWSuprw5.js";import"./file-text-CGCC2QOq.js";import"./OptimizedImage-CixLpnM2.js";import"./DealerLocatorMap-B1LfZ0Ia.js";import"./star-CwlQHJw3.js";import"./dealerService-CeBNsEgh.js";import"./award-DHlKx5EL.js";import"./chevron-right-CqGISB5S.js";import"./map-pin-DQYn19ng.js";import"./phone-BA3PDjYk.js";import"./navigation-pJvTm1HH.js";import"./dollar-sign-Dx5ikRgv.js";import"./clock-ClUra2w8.js";import"./bookmark-B6wdafDk.js";import"./external-link-n1bD6jfU.js";import"./index.modern-CnMIFrdx.js";import"./index-DDDqh6Hz.js";import"./index-CQRzsqVo.js";import"./chevron-left-aOh3kW7W.js";import"./map-ds2WU9fj.js";import"./MakeOfferModal-D2mqOdtW.js";import"./car-CasYWDBd.js";import"./message-square-BnDFJbJR.js";import"./user-DfHuEnK3.js";import"./mail-BJcs3ePA.js";import"./send-CkO_5iQu.js";import"./check-CSKpJaV7.js";import"./circle-alert-CNX6m2JV.js";import"./chevron-down-DM8Xl5lJ.js";import"./loader-circle-aoNiIRLg.js";import"./OfferNegotiation-X7ARO-N-.js";import"./arrow-right-CS7geS2q.js";import"./handshake-lOwl5hGu.js";import"./circle-check-big-B6MjQ52T.js";import"./DealerMapModal-Cltn79Jg.js";import"./ContactDealerModal-CbyOvRlj.js";import"./thumbs-up-JmItfWoR.js";import"./message-circle-Xmgr2YS3.js";import"./share-2-BgcG506s.js";import"./sparkles-DgyVBsgw.js";import"./gauge-DNjfZDtI.js";import"./fuel-DJ7X9qsi.js";import"./chevron-up-MnlrTblR.js";import"./trash-2-Cfs1UOMw.js";import"./search-XENah9Dt.js";import"./minus-BPG95nAs.js";import"./Tabs-DGgPPabd.js";import"./plus-DJb_kHlw.js";const de={title:"Organisms/Header",component:i,parameters:{layout:"fullscreen",docs:{description:{component:`
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
