import{j as e}from"./iframe-D9FuRqiJ.js";import{H as i}from"./Header-CACaIEh2.js";import"./preload-helper-PPVm8Dsz.js";import"./vehicleService-BAIAK0V_.js";import"./index-BFhOOLG3.js";import"./useSupabaseRating-vCfMoj82.js";import"./Button-DO2gwmdA.js";import"./ExitIntentModal-Dub09ktT.js";import"./x-CdLZA6aE.js";import"./createLucideIcon-MYH58CeO.js";import"./heart-BPUJnb2K.js";import"./trending-down-DIfH7mr6.js";import"./file-text-B8riOjBZ.js";import"./OptimizedImage-CW0SvTHW.js";import"./DealerLocatorMap-BUItG3Vb.js";import"./star-D33WkAKh.js";import"./dealerService-CeBNsEgh.js";import"./award-DuL9w1bG.js";import"./chevron-right-DrhlyL3i.js";import"./map-pin-BIezj1iA.js";import"./phone-BPOA_1Wa.js";import"./navigation-BqgSfMqJ.js";import"./dollar-sign-DUPx63rY.js";import"./clock-QIaCG8Fz.js";import"./bookmark-B-xIRnrO.js";import"./external-link-CldWRXFK.js";import"./index.modern-BsvUTOTT.js";import"./index-Cxflx-wb.js";import"./index-C4vrd6hg.js";import"./chevron-left-ByQLFGF8.js";import"./map-BGtMXswJ.js";import"./MakeOfferModal-D0qSktnD.js";import"./car-B4VcQfoW.js";import"./message-square-D2fPrpFT.js";import"./user-B4ajf9rz.js";import"./mail-BvCsA4uP.js";import"./circle-check-big-BRRqXC9P.js";import"./send-BSnOHEoP.js";import"./chevron-down-DSQ4RYnx.js";import"./loader-circle-C-sgYLXI.js";import"./OfferNegotiation-Bq3XC-sz.js";import"./arrow-right-C779v75m.js";import"./handshake-Beau6SQK.js";import"./DealerMapModal-ESY2SRbn.js";import"./gauge-BKydpbIx.js";import"./fuel-BsKFqKSl.js";import"./check-Dz6oJ8uJ.js";import"./minus-D8YlZZQ0.js";import"./trash-2-QSO7vPOq.js";import"./git-compare-mHCjA_8f.js";import"./search-BQdiqI8e.js";import"./plus-CpwTuoMg.js";const re={title:"Organisms/Header",component:i,parameters:{layout:"fullscreen",docs:{description:{component:`
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
