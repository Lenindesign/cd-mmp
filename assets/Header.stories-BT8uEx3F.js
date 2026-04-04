import{j as e}from"./iframe-BXtR_pRY.js";import{H as i}from"./Header-guBowyoG.js";import"./preload-helper-PPVm8Dsz.js";import"./vehicleService-hRlSJfPL.js";import"./index-BirN2__4.js";import"./useSupabaseRating-9peQabTQ.js";import"./Button-Cm4YwYVE.js";import"./ExitIntentModal-DayJYf53.js";import"./x-DmmslBZ8.js";import"./createLucideIcon-CZYznO8F.js";import"./heart--akVT9Mo.js";import"./trending-down-B8fEYHwc.js";import"./file-text-CVhm_8G6.js";import"./OptimizedImage-BHvqXJmK.js";import"./DealerLocatorMap-D1Zwtjvh.js";import"./star-SpkqDICV.js";import"./dealerService-CeBNsEgh.js";import"./award-nIeEh-jD.js";import"./chevron-right-BONeyxlZ.js";import"./map-pin-CufGWYNK.js";import"./phone-BpqBZFRW.js";import"./navigation-dEhbJCI8.js";import"./dollar-sign-oievcZbP.js";import"./clock-WHLYrM96.js";import"./bookmark-BTmOWu6T.js";import"./external-link-BKZ6B1aO.js";import"./index.modern-CQ8bqDUw.js";import"./index-Ya10_y9p.js";import"./index-CuUl-C28.js";import"./chevron-left-BgJDzP2M.js";import"./map-BJftQveg.js";import"./MakeOfferModal-571MXGAI.js";import"./car-BFjDT1fj.js";import"./message-square-2U-lwUas.js";import"./user-CTQIVhTg.js";import"./mail-BpU1ghqk.js";import"./circle-check-big-4JfbLHIK.js";import"./send-DWG-dLKD.js";import"./chevron-down--ex07JLr.js";import"./loader-circle-1pHcUu-J.js";import"./OfferNegotiation-Bww8ZZsd.js";import"./arrow-right-Dg0PFodF.js";import"./handshake-DQ1qYO_p.js";import"./DealerMapModal-DDe0e0xJ.js";import"./ContactDealerModal-CG-jWavg.js";import"./thumbs-up-DEkYHhpw.js";import"./message-circle-DFK3Q3te.js";import"./share-2-qw8RMniM.js";import"./sparkles-B26Wq8c7.js";import"./gauge-4YH_7R_e.js";import"./fuel-B6wXtfvY.js";import"./chevron-up-LxxmaGn6.js";import"./trash-2-j6w9APLc.js";import"./search-CePnX6QM.js";import"./check-LRT-jSHK.js";import"./minus-hMuJLjvF.js";import"./plus-CFcSSA06.js";const pe={title:"Organisms/Header",component:i,parameters:{layout:"fullscreen",docs:{description:{component:`
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
