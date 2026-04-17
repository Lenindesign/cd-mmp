import{j as e}from"./iframe-CLEkz2UN.js";import{H as i}from"./Header-B7SQ7grg.js";import"./preload-helper-PPVm8Dsz.js";import"./vehicleService-BTivPZrm.js";import"./index-B-JoA3P0.js";import"./useSupabaseRating-0TWoIvU4.js";import"./dealRoutes-XyQ0L3Gs.js";import"./Button-DO8e_f4j.js";import"./ExitIntentModal-wQZFeZkP.js";import"./x-BkVl0fAn.js";import"./createLucideIcon-DC9z6m24.js";import"./heart-BBR8QbfV.js";import"./trending-down-BxM-6Tbi.js";import"./file-text-C-H8Lgmk.js";import"./OptimizedImage-DAlx9REy.js";import"./DealerLocatorMap-Dqm0oVeO.js";import"./star-rYz12CYb.js";import"./dealerService-CeBNsEgh.js";import"./award-DmHhhIGS.js";import"./chevron-right-Cq5AKFLy.js";import"./map-pin-BebBq2DI.js";import"./phone-DG0-EJKS.js";import"./navigation-BY4UkUxz.js";import"./dollar-sign-qU8Mu13j.js";import"./clock-Bq_TuQ7p.js";import"./bookmark-CYk0641i.js";import"./external-link-7-V0Vguk.js";import"./index.modern-2QljMove.js";import"./index-MdzP5yv2.js";import"./index-C_hsw7Ac.js";import"./chevron-left-D7ijfJv4.js";import"./map-DdUuuqAT.js";import"./MakeOfferModal-CM7Vks_X.js";import"./car-CobYfmh7.js";import"./message-square-Cw73AFRI.js";import"./user-Cbd89Hig.js";import"./mail-FebgsMlG.js";import"./send-C1wCpu0z.js";import"./check-Bu8HNRlV.js";import"./circle-alert-BfPlxbzV.js";import"./chevron-down-Dx_4sYej.js";import"./loader-circle-DL6YbfMB.js";import"./OfferNegotiation-Bog1fps-.js";import"./arrow-right-IUEf-c4M.js";import"./handshake-C2YOHrjY.js";import"./circle-check-big-CCV5wMLS.js";import"./DealerMapModal-BYD45u_T.js";import"./ContactDealerModal-D7Wp8uLK.js";import"./thumbs-up-Jjn17UqC.js";import"./message-circle-BFNa1X6k.js";import"./share-2-CMd6DHhJ.js";import"./sparkles-ADZHrM-I.js";import"./gauge-DO8HMLTi.js";import"./fuel-BdoXsFtV.js";import"./chevron-up-DMod8EZ_.js";import"./trash-2-DLfxLglw.js";import"./search-2CNCXlHv.js";import"./minus-BnF-ZJCD.js";import"./Tabs-CVXWLKfl.js";import"./plus-BMQbwREk.js";const de={title:"Organisms/Header",component:i,parameters:{layout:"fullscreen",docs:{description:{component:`
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
