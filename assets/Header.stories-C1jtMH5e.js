import{j as e}from"./iframe-BsKjb8X7.js";import{H as i}from"./Header-GCnWDOkW.js";import"./preload-helper-PPVm8Dsz.js";import"./vehicleService-ByoDejvg.js";import"./index-Dto8T7jp.js";import"./useSupabaseRating-fJoXNHop.js";import"./Button-B1YYO9of.js";import"./ExitIntentModal-DBg7pgAX.js";import"./x-j7RVN9le.js";import"./createLucideIcon-_zhJVdsp.js";import"./heart-CsNo7n_3.js";import"./trending-down-Ckbz8V4r.js";import"./file-text-DjoQ7bdC.js";import"./OptimizedImage-B7gWmHYx.js";import"./DealerLocatorMap-NKM-kl0_.js";import"./star-J9pbTjtj.js";import"./dealerService-CeBNsEgh.js";import"./award-Dry6loHL.js";import"./chevron-right-pu_fT7Pp.js";import"./map-pin-Ctr8Mr_m.js";import"./phone-CBfqC-0w.js";import"./navigation-D_tYctcl.js";import"./dollar-sign-B4KWfkO4.js";import"./clock-DDjr4Bzo.js";import"./bookmark-CSUsaAwW.js";import"./external-link-JSrvGykG.js";import"./index.modern-BDMhp0nV.js";import"./index-BVIFlvhP.js";import"./index-qhGk8qAU.js";import"./chevron-left-CPuRMSnN.js";import"./map-BRN43OMa.js";import"./MakeOfferModal-DXIKbsRq.js";import"./car-DlnY5Lnc.js";import"./message-square-BLS78dNY.js";import"./user-QJrtKyCj.js";import"./mail-CLKuRNou.js";import"./circle-check-big-D4Dxtlpg.js";import"./send-CYTNcVyz.js";import"./chevron-down-D9CYxZBM.js";import"./loader-circle-Cuq7twPq.js";import"./OfferNegotiation-CFkQErCw.js";import"./arrow-right-BTk_mW5l.js";import"./handshake-DZC_yDem.js";import"./DealerMapModal-4FBKhIDh.js";import"./gauge-JsncF-d4.js";import"./fuel-Xkqza74L.js";import"./check-B1Gqn_NT.js";import"./minus-CPDI8EAV.js";import"./trash-2-CXATr1O9.js";import"./search-CpTeiip4.js";import"./plus-CYEynBax.js";const oe={title:"Organisms/Header",component:i,parameters:{layout:"fullscreen",docs:{description:{component:`
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
