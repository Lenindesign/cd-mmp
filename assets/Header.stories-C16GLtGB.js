import{j as e}from"./iframe-Jog07p9B.js";import{H as i}from"./Header-q64mk0IZ.js";import"./preload-helper-PPVm8Dsz.js";import"./vehicleService-hRlSJfPL.js";import"./index-BirN2__4.js";import"./useSupabaseRating-SJGIeTHA.js";import"./Button-C4p9oX3i.js";import"./ExitIntentModal-f4MTQnLf.js";import"./x-Cpu-gW1K.js";import"./createLucideIcon-d1aCxUgQ.js";import"./heart-ddtPWSYx.js";import"./trending-down-DLlZpksw.js";import"./file-text-CMr97fT2.js";import"./OptimizedImage-AWg3h1fx.js";import"./DealerLocatorMap-Cpq7Pur6.js";import"./star-fMf_McPq.js";import"./dealerService-CeBNsEgh.js";import"./award-EHfj6Xbn.js";import"./chevron-right-CNuJENlu.js";import"./map-pin-CqlRyLu7.js";import"./phone-BNCIn_Mo.js";import"./navigation-BvkXO7yi.js";import"./dollar-sign-BPEkW4Fd.js";import"./clock-Da3I5GJX.js";import"./bookmark-CdueNnJX.js";import"./external-link-C85o0s7q.js";import"./index.modern-BsKpQjT4.js";import"./index-ZDiWDY9u.js";import"./index-L5_i4Rl9.js";import"./chevron-left-CPXUZhC6.js";import"./map-B9XclbiR.js";import"./MakeOfferModal-jNidMe_7.js";import"./car-XMYDjx2r.js";import"./message-square-BARNAOyL.js";import"./user-Bv9Ky58p.js";import"./mail-Ce9ERX3W.js";import"./circle-check-big-BaPjkvxN.js";import"./send-xa3hYkuU.js";import"./chevron-down-Ds901R_Q.js";import"./loader-circle-BR9DrnKG.js";import"./OfferNegotiation-C1qVI74-.js";import"./arrow-right-DjgyvXSH.js";import"./handshake-MwuuCcss.js";import"./DealerMapModal-72LuThvt.js";import"./ContactDealerModal-DGwiyvbH.js";import"./thumbs-up-BLPdzIfI.js";import"./message-circle-CfIKCULP.js";import"./share-2-tnkAxR5m.js";import"./sparkles-CvleZFNj.js";import"./gauge-D1u3BPXw.js";import"./fuel-DkF0-b4K.js";import"./chevron-up-ChiX-0ey.js";import"./trash-2-Cc6ehfSe.js";import"./search-IklnD3Ed.js";import"./check-ocUBzDiN.js";import"./minus-CG9ik1Gk.js";import"./plus-DTwSfLY2.js";const pe={title:"Organisms/Header",component:i,parameters:{layout:"fullscreen",docs:{description:{component:`
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
