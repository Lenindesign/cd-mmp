import{j as e}from"./iframe-BLtcLk-E.js";import{H as i}from"./Header-B9CMm30q.js";import"./preload-helper-PPVm8Dsz.js";import"./vehicleService-BktozO7f.js";import"./index-Dto8T7jp.js";import"./useSupabaseRating-BQrLngCS.js";import"./Button-GX-mgJq8.js";import"./ExitIntentModal-BrDeyEhH.js";import"./x-CfDZ-kj8.js";import"./createLucideIcon-BBbijQ62.js";import"./heart-BJR2cT-n.js";import"./trending-down-e-J63y7R.js";import"./file-text-7PQFmExZ.js";import"./OptimizedImage-BhYzWZOz.js";import"./DealerLocatorMap-DrvGEXKn.js";import"./star-DRpd8BTm.js";import"./dealerService-CeBNsEgh.js";import"./award-DdgAp0mP.js";import"./chevron-right-DNkS_3DJ.js";import"./map-pin-DASdvw_f.js";import"./phone-Tn79LRc6.js";import"./navigation-BfjtLhiX.js";import"./dollar-sign-DQkC9M7o.js";import"./clock-VN7N3ro8.js";import"./bookmark-CdAu_lcq.js";import"./external-link-Dzsk7sj9.js";import"./index.modern-5vc7sC6x.js";import"./index-CQhqXblt.js";import"./index-CtWVNQZ0.js";import"./chevron-left-D5SZv3ND.js";import"./map-J3JDlk8A.js";import"./MakeOfferModal-C_nH09R5.js";import"./car-BpmGuno7.js";import"./message-square-DejNQyvT.js";import"./user-CRfNRKTj.js";import"./mail-HfzO_Lo1.js";import"./circle-check-big-tSmdiwTQ.js";import"./send-DjfCGD-w.js";import"./chevron-down-CGFokigj.js";import"./loader-circle-BPfd85uG.js";import"./OfferNegotiation-CaBo077L.js";import"./arrow-right-cNqGPS14.js";import"./handshake-CIGs-crU.js";import"./DealerMapModal-CQd1z002.js";import"./ContactDealerModal-PVBmsecz.js";import"./thumbs-up-CHyTM-xn.js";import"./message-circle-DSG4LOs2.js";import"./share-2-CgxRkzIm.js";import"./sparkles-qbewsElm.js";import"./gauge-zxwRjyf-.js";import"./fuel-uOVJsqYu.js";import"./chevron-up-CzvwcDlJ.js";import"./trash-2-CpauzB85.js";import"./search-CcDvVCL1.js";import"./check-BEa6MaD1.js";import"./minus-PtHs3eZ6.js";import"./plus-CDea-94E.js";const pe={title:"Organisms/Header",component:i,parameters:{layout:"fullscreen",docs:{description:{component:`
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
