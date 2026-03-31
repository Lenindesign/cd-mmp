import{j as e}from"./iframe-BCANM747.js";import{H as i}from"./Header-bfYpv2gt.js";import"./preload-helper-PPVm8Dsz.js";import"./vehicleService-DcljwXyi.js";import"./index-Dto8T7jp.js";import"./useSupabaseRating-DZwG93JC.js";import"./Button-eB8TxDUE.js";import"./ExitIntentModal-BOFQ7GvE.js";import"./x-Bpu2EdCY.js";import"./createLucideIcon-CpvYDHmg.js";import"./heart-Cuus1noy.js";import"./trending-down-jqsR3cDd.js";import"./file-text-BWWxLx6N.js";import"./OptimizedImage-CqjeZCGs.js";import"./DealerLocatorMap-BTT0tRSI.js";import"./star-B51rXXfV.js";import"./dealerService-CeBNsEgh.js";import"./award-C2sA7lTt.js";import"./chevron-right-CtfgMB5B.js";import"./map-pin-BwopNOhT.js";import"./phone-C-y1toVM.js";import"./navigation-C-pC0lnX.js";import"./dollar-sign-Cl557Two.js";import"./clock-GqfbgQXN.js";import"./bookmark-C_QGv2ah.js";import"./external-link-CmslKPpZ.js";import"./index.modern-Cc74fcZZ.js";import"./index-2Ej5ZGAv.js";import"./index-CdDmSBvN.js";import"./chevron-left-xvQSc4uZ.js";import"./map-DxG5wLpS.js";import"./MakeOfferModal-DTFTpkom.js";import"./car-y26-YfO2.js";import"./message-square-CFX-JOZm.js";import"./user-Q5g8QRpw.js";import"./mail-Bf900KvP.js";import"./circle-check-big-B7SoI4Af.js";import"./send-C9WLmQfG.js";import"./chevron-down-D42JdIBc.js";import"./loader-circle-BnYY0w10.js";import"./OfferNegotiation-Dw6IbFLc.js";import"./arrow-right-JLu_8pGr.js";import"./handshake-Dh0TmdfR.js";import"./DealerMapModal-DmsHHfa9.js";import"./ContactDealerModal-C3byIAWp.js";import"./thumbs-up-B6QRdd-6.js";import"./message-circle-Dp55qcNS.js";import"./share-2-Dw-Vcjqs.js";import"./sparkles-DjuQfrgO.js";import"./gauge-Bg7dOC8p.js";import"./fuel-12wtRmA_.js";import"./chevron-up-zYeXpCWS.js";import"./trash-2-DD6SUOaN.js";import"./search-D6b8CLQZ.js";import"./check-BuOSbmYp.js";import"./minus-C6UIfd1y.js";import"./plus-B2MR_LIG.js";const pe={title:"Organisms/Header",component:i,parameters:{layout:"fullscreen",docs:{description:{component:`
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
