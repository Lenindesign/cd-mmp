import{j as e}from"./iframe-BEa3bQge.js";import{H as i}from"./Header-DguYXw49.js";import"./preload-helper-PPVm8Dsz.js";import"./vehicleService-D5hsGKmE.js";import"./index-Dto8T7jp.js";import"./useSupabaseRating-DFsOPD4K.js";import"./Button-HXD-a78y.js";import"./ExitIntentModal-DeGCUkzt.js";import"./x-iB8dyvbk.js";import"./createLucideIcon-CXm1ccRw.js";import"./heart-CQ2ZZmfM.js";import"./trending-down-Cr1espJl.js";import"./file-text-C7TODej8.js";import"./OptimizedImage-D63NJD_-.js";import"./DealerLocatorMap-BB6zFAvm.js";import"./star-BepADztM.js";import"./dealerService-CeBNsEgh.js";import"./award-BovDI_Bb.js";import"./chevron-right-CRZrcxDd.js";import"./map-pin-OZpyEk8m.js";import"./phone-DLOlIDeO.js";import"./navigation-DHcIcWWu.js";import"./dollar-sign-BzZjZHMv.js";import"./clock-BJPFqu1v.js";import"./bookmark-BNHEBnDK.js";import"./external-link-D9pZCyg_.js";import"./index.modern-CDK0ELSM.js";import"./index-2gMKX0Yg.js";import"./index-C2CsRdx6.js";import"./chevron-left-Bz-YJbyB.js";import"./map-CdLh2m93.js";import"./MakeOfferModal-sCi7ePHB.js";import"./car-DRbb5tjz.js";import"./message-square-Ct4UYecH.js";import"./user-BGDeCEYB.js";import"./mail-UnIriHXw.js";import"./circle-check-big-DpcUH3tK.js";import"./send-Bz1cRRWu.js";import"./chevron-down-mA-50KCm.js";import"./loader-circle-C9eX-aXn.js";import"./OfferNegotiation-35EmLxfD.js";import"./arrow-right-c7O6fbGb.js";import"./handshake-CGPCCjdc.js";import"./DealerMapModal-DVQC_XFI.js";import"./gauge-BaXlJBua.js";import"./fuel-C-r21pBk.js";import"./check-CNLbGhhF.js";import"./minus-2aU7oGG3.js";import"./trash-2-6SSMZ7X6.js";import"./search-_WfVw1AQ.js";import"./plus-1qELoL74.js";const oe={title:"Organisms/Header",component:i,parameters:{layout:"fullscreen",docs:{description:{component:`
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
