import{j as e}from"./iframe-CcR_LnTn.js";import{H as i}from"./Header-aBIfxuz4.js";import"./preload-helper-PPVm8Dsz.js";import"./vehicleService-ByoDejvg.js";import"./index-Dto8T7jp.js";import"./useSupabaseRating-D8Mzv1-o.js";import"./Button-BpOifc1z.js";import"./ExitIntentModal-CyZVFaOD.js";import"./x-BC9HyfeK.js";import"./createLucideIcon-F42FjZ_5.js";import"./heart-CwYKR-am.js";import"./trending-down-DXbWjtTg.js";import"./file-text-cdALGPFf.js";import"./OptimizedImage-DC3SF4Gs.js";import"./DealerLocatorMap-BVbPSkrp.js";import"./star-CtFuTULN.js";import"./dealerService-CeBNsEgh.js";import"./award-BdNqG1qx.js";import"./chevron-right-B0Jirl5y.js";import"./map-pin-CyjS_wpB.js";import"./phone-BGNwlq07.js";import"./navigation-DFZKKzep.js";import"./dollar-sign-DVLe_dnM.js";import"./clock-C8aKSp2S.js";import"./bookmark-C3GCBnK9.js";import"./external-link-CtZRvQ81.js";import"./index.modern-BFs3LyDn.js";import"./index-DccaGqyB.js";import"./index-BRsJtOOm.js";import"./chevron-left-C9CmA67e.js";import"./map-BLYlUzVS.js";import"./MakeOfferModal-CQwO-8Ty.js";import"./car-wVJzYJEO.js";import"./message-square-CW-UiXQU.js";import"./user-BvZcnWpr.js";import"./mail-dZANLcPJ.js";import"./circle-check-big-N1WvWalF.js";import"./send-CFnLQg1g.js";import"./chevron-down-BldApJtp.js";import"./loader-circle-B4Yq8PUE.js";import"./OfferNegotiation-CPJ94dqY.js";import"./arrow-right-BuZFbYoU.js";import"./handshake-ZLfI-9v_.js";import"./DealerMapModal-BhE19660.js";import"./gauge-CRiPCuMe.js";import"./fuel-B_Ufrcqo.js";import"./check-CBwcP-Xe.js";import"./minus-BrRnL2I0.js";import"./trash-2-CIUVYSrD.js";import"./search-9wnJ8K3w.js";import"./plus-CxpNeBn2.js";import"./sparkles-DZ77rPp6.js";const re={title:"Organisms/Header",component:i,parameters:{layout:"fullscreen",docs:{description:{component:`
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
}`,...r.parameters?.docs?.source}}};const ie=["Default","WithContent","Mobile"];export{t as Default,r as Mobile,o as WithContent,ie as __namedExportsOrder,re as default};
