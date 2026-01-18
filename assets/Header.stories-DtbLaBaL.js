import{j as e}from"./iframe-BwRx_0QZ.js";import{H as i}from"./Header-B2_FqezP.js";import"./preload-helper-PPVm8Dsz.js";import"./vehicleService-ByoDejvg.js";import"./index-Dto8T7jp.js";import"./useSupabaseRating-D5eoVm7t.js";import"./Button-CzesywI-.js";import"./ExitIntentModal-DERhp-HZ.js";import"./x-DVaONjQD.js";import"./createLucideIcon-DYMU7qI_.js";import"./heart-CGsrOoPj.js";import"./trending-down-DEGoxaO-.js";import"./file-text-DpqykY48.js";import"./OptimizedImage-cWpuF8qS.js";import"./DealerLocatorMap-B55MZrPo.js";import"./star-DvccADIl.js";import"./dealerService-CeBNsEgh.js";import"./award--FZtEwHO.js";import"./chevron-right-BKvlVKDb.js";import"./map-pin-8-5UlPV9.js";import"./phone-BTgNQ23c.js";import"./navigation-DKhkTkMP.js";import"./dollar-sign-0H6ghX7Q.js";import"./clock-CFc_ft-z.js";import"./bookmark-GpgPdYfW.js";import"./external-link-BqOjpEK6.js";import"./index.modern-D43FVlWq.js";import"./index-D28KyAoz.js";import"./index-TzUQkLAI.js";import"./chevron-left-D2KnAHAO.js";import"./map-DWA8cBJw.js";import"./MakeOfferModal-9ty0AFqd.js";import"./car-03iDWt-J.js";import"./message-square-Bfev3dpS.js";import"./user-BCDzhvpL.js";import"./mail-B98-xU49.js";import"./circle-check-big-BrB5sf17.js";import"./send-DZYa-eba.js";import"./chevron-down-CgoE2ohY.js";import"./loader-circle-Z1iN3Twp.js";import"./OfferNegotiation-Q9KwLE3H.js";import"./arrow-right-DDV2RKuA.js";import"./handshake-B2KUOZZP.js";import"./DealerMapModal-4uIYbkv7.js";import"./gauge-Jy0_D5Iu.js";import"./fuel-CKoP4qv4.js";import"./check-DtBoldK_.js";import"./minus-6J4G6jL6.js";import"./trash-2-Bsle2ckx.js";import"./search-dTqt3qOd.js";import"./plus-Bpbtudbp.js";import"./sparkles-BtVStIke.js";const re={title:"Organisms/Header",component:i,parameters:{layout:"fullscreen",docs:{description:{component:`
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
