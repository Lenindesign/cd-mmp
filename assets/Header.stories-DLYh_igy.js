import{j as e}from"./iframe-SJTK43GW.js";import{H as i}from"./Header-DQGg_5JE.js";import"./preload-helper-PPVm8Dsz.js";import"./vehicleService-DcljwXyi.js";import"./index-Dto8T7jp.js";import"./useSupabaseRating-R58iHs2j.js";import"./Button-Df6crziR.js";import"./ExitIntentModal-CIWan9Ue.js";import"./x-wwJwMiTl.js";import"./createLucideIcon-DSSAmQct.js";import"./heart-XoqMFe2a.js";import"./trending-down-DYSX4Dt0.js";import"./file-text-Co9Nsx59.js";import"./OptimizedImage-Bf37RIh3.js";import"./DealerLocatorMap-DzIaZPkM.js";import"./star-CKHFT3ma.js";import"./dealerService-CeBNsEgh.js";import"./award-DD8F-uxP.js";import"./chevron-right-BQ41E914.js";import"./map-pin-ToPRi91G.js";import"./phone-COl4dX0F.js";import"./navigation-CFXfcC-X.js";import"./dollar-sign-Cz-07kT0.js";import"./clock-BNf1OPmy.js";import"./bookmark-O_BP5YeV.js";import"./external-link-CJgbjTtj.js";import"./index.modern-DepDbJ8I.js";import"./index-BV1Nt_2J.js";import"./index-BiXOaMPs.js";import"./chevron-left-CrAOtKVQ.js";import"./map-B31ZJ22k.js";import"./MakeOfferModal-9v3otmSv.js";import"./car-DkPLyiOh.js";import"./message-square-DoxFM3Sx.js";import"./user-9PsteeiN.js";import"./mail-D4I0aRZK.js";import"./circle-check-big-CHbyfKhA.js";import"./send-VcRnjM9L.js";import"./chevron-down-BUjWNzwJ.js";import"./loader-circle-BHL2tSSu.js";import"./OfferNegotiation-Cb2SFJKM.js";import"./arrow-right-CXFgts69.js";import"./handshake-W4DVfIDO.js";import"./DealerMapModal-BAYvALzO.js";import"./ContactDealerModal-DEA8h_QR.js";import"./thumbs-up-DydMrXzG.js";import"./message-circle-CfGdOYh_.js";import"./share-2-7Rn2YSh9.js";import"./sparkles-D54CacLt.js";import"./gauge-JVcfRgEu.js";import"./fuel-D3WXvI_N.js";import"./chevron-up-0ZMxIHZX.js";import"./trash-2-BbkRpiYk.js";import"./search-BvMRnL6J.js";import"./check-BqOOeTFU.js";import"./minus-BJMEISkh.js";import"./plus-CWFTvTMR.js";const pe={title:"Organisms/Header",component:i,parameters:{layout:"fullscreen",docs:{description:{component:`
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
