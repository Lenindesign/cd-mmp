import{j as e}from"./iframe-BbvxrPx7.js";import{H as i}from"./Header-Bem0cslH.js";import"./preload-helper-PPVm8Dsz.js";import"./vehicleService-ByoDejvg.js";import"./index-Dto8T7jp.js";import"./useSupabaseRating-DXAHcwXl.js";import"./Button-CqXDFtiI.js";import"./ExitIntentModal-iBtw255b.js";import"./x-DVQHbijb.js";import"./createLucideIcon-v-P3xhXM.js";import"./heart-Bx4uzqM3.js";import"./trending-down-Cqkun1YQ.js";import"./file-text-DeMOfJQb.js";import"./OptimizedImage-DT64qpSd.js";import"./DealerLocatorMap-998Rk1sG.js";import"./star-DwZDauEJ.js";import"./dealerService-CeBNsEgh.js";import"./award-Dq6KPULY.js";import"./chevron-right-BrBdIB6c.js";import"./map-pin-DF6mimrD.js";import"./phone-C0YjS77Q.js";import"./navigation-B6pOeTMz.js";import"./dollar-sign-CAo2qqMy.js";import"./clock-Dd9eKIFO.js";import"./bookmark-mWt5emyP.js";import"./external-link-ByIjpzbY.js";import"./index.modern-CxOTZMJV.js";import"./index-Duh4SeQi.js";import"./index-vDicyzVm.js";import"./chevron-left-DpGWvAFT.js";import"./map-CNt8fAnm.js";import"./MakeOfferModal-BeD2EcyV.js";import"./car-C04Ojbvb.js";import"./message-square-eBXAlTAd.js";import"./user-C3V6upIq.js";import"./mail-DwuGsuiC.js";import"./circle-check-big-Dgxbn8Yf.js";import"./send-HvQ8M6-z.js";import"./chevron-down-BGyAd8yB.js";import"./loader-circle-3J8r5i_7.js";import"./OfferNegotiation-k9VqVcmm.js";import"./arrow-right-B9ffD7mm.js";import"./handshake-CBUkuVI0.js";import"./DealerMapModal-QOAK6rWr.js";import"./gauge-C1Hj4Rhl.js";import"./fuel-J0_VgkfY.js";import"./check-BYZDFd_x.js";import"./minus-CzMqRSSo.js";import"./trash-2-CiCBaNZT.js";import"./search-DDmm_fqd.js";import"./plus-BvOSsILL.js";const oe={title:"Organisms/Header",component:i,parameters:{layout:"fullscreen",docs:{description:{component:`
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
}`,...r.parameters?.docs?.source}}};const re=["Default","WithContent","Mobile"];export{t as Default,r as Mobile,o as WithContent,re as __namedExportsOrder,oe as default};
