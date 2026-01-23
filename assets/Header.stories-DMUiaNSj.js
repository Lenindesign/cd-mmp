import{j as e}from"./iframe-CSJ_5fud.js";import{H as i}from"./Header-BOKh5hat.js";import"./preload-helper-PPVm8Dsz.js";import"./vehicleService-ByoDejvg.js";import"./index-Dto8T7jp.js";import"./useSupabaseRating-DnmHwDsa.js";import"./Button-6PKWf6pH.js";import"./ExitIntentModal-BRmCxHTl.js";import"./x-BYSKYMiM.js";import"./createLucideIcon-C1cD1rkR.js";import"./heart-DKKuNDUz.js";import"./trending-down-DM1_0E36.js";import"./file-text-lmxNqSPU.js";import"./OptimizedImage-tgcrYI31.js";import"./DealerLocatorMap-Cs4lE9TI.js";import"./star-BgXs65SS.js";import"./dealerService-CeBNsEgh.js";import"./award-CPCy9qCz.js";import"./chevron-right-B2OHm4rQ.js";import"./map-pin-Ax-GJvTj.js";import"./phone-DhD2fyJP.js";import"./navigation-Ch6svwgH.js";import"./dollar-sign-CcV_X40h.js";import"./clock-BQhXlSaq.js";import"./bookmark-BTnhRJMf.js";import"./external-link-C8C5rCjq.js";import"./index.modern-D3meOZjW.js";import"./index-BYvaAEe1.js";import"./index-CDvhPZDf.js";import"./chevron-left-CUf5asq6.js";import"./map-CfF7yfkL.js";import"./MakeOfferModal-RLQdLkGI.js";import"./car-CVJTtMk8.js";import"./message-square-Dsx8a9uJ.js";import"./user-E7EPHmVk.js";import"./mail-DUHJ0-77.js";import"./circle-check-big-B3A6LTdK.js";import"./send-DInJXILv.js";import"./chevron-down-pEddTBow.js";import"./loader-circle-BFDFxFPq.js";import"./OfferNegotiation-DBBoYcuX.js";import"./arrow-right-3fztVk0h.js";import"./handshake-BxXj6MW8.js";import"./DealerMapModal-BxMR5dZl.js";import"./gauge-BBdrN4tu.js";import"./fuel-CTTQFJN7.js";import"./check-CrM_U9Wi.js";import"./minus-DOtq94RE.js";import"./trash-2-5sXpeU1q.js";import"./search-Dxeoh1mm.js";import"./plus-BE_HuiN8.js";import"./sparkles-DdWWDeH6.js";const re={title:"Organisms/Header",component:i,parameters:{layout:"fullscreen",docs:{description:{component:`
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
