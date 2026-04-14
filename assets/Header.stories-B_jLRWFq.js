import{j as e}from"./iframe-DKLSCm6Q.js";import{H as i}from"./Header-D665r4vw.js";import"./preload-helper-PPVm8Dsz.js";import"./vehicleService-CgRIVwGT.js";import"./index-Bk6M7T92.js";import"./useSupabaseRating-0nI42ZEe.js";import"./dealRoutes-XyQ0L3Gs.js";import"./Button-CG9SXzEH.js";import"./ExitIntentModal-DwguQBsv.js";import"./x-DsNKTwqE.js";import"./createLucideIcon-DZsChpMc.js";import"./heart-BU30dvNO.js";import"./trending-down-T9Y1BLfu.js";import"./file-text-djAFvhtC.js";import"./OptimizedImage-GPL-Q-ZS.js";import"./DealerLocatorMap-Budo0Yhy.js";import"./star-7_WZQBXI.js";import"./dealerService-CeBNsEgh.js";import"./award-_mGkPCzU.js";import"./chevron-right-qEie3UzG.js";import"./map-pin-fGq6ALi9.js";import"./phone-zsU2p5cm.js";import"./navigation-DPdfWOgV.js";import"./dollar-sign-BYtP7ykV.js";import"./clock-rdNu7wiQ.js";import"./bookmark-DphGvgAk.js";import"./external-link-OaOi6N6m.js";import"./index.modern-CVSor8cE.js";import"./index-aQNcXA49.js";import"./index-DWOur3J0.js";import"./chevron-left-BmYiaQKa.js";import"./map-Ba9LHV17.js";import"./MakeOfferModal-Dx0euy25.js";import"./car-D54bYZb1.js";import"./message-square-BbkjBksl.js";import"./user-DNzCEH_K.js";import"./mail-CbODb4mY.js";import"./send-Din0iM5W.js";import"./check-r2sy-Fmq.js";import"./circle-alert-CJK3BPW3.js";import"./chevron-down-B3ubAsEY.js";import"./loader-circle-DYFaWTJU.js";import"./OfferNegotiation-Dqq_WLe5.js";import"./arrow-right-B_w81Bwm.js";import"./handshake-CeLeGstX.js";import"./circle-check-big-C-Cc12NY.js";import"./DealerMapModal-CebHrcfS.js";import"./ContactDealerModal-DIweNQPZ.js";import"./thumbs-up-C9gBcc_R.js";import"./message-circle-MBEScxfp.js";import"./share-2-BZb4WtOz.js";import"./sparkles-DwTNj6gU.js";import"./gauge-CiXubEGn.js";import"./fuel-B0e9PRMR.js";import"./chevron-up-BwWin3nW.js";import"./trash-2-nHgAGphx.js";import"./search-GlQiIvcA.js";import"./minus-Bs4_Ks2i.js";import"./Tabs-BsRTH1CC.js";import"./plus-eqS9aPou.js";const de={title:"Organisms/Header",component:i,parameters:{layout:"fullscreen",docs:{description:{component:`
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
