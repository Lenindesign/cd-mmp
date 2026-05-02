import{j as e}from"./iframe-BfytcgxX.js";import{H as i}from"./Header-C0btG3sX.js";import"./preload-helper-PPVm8Dsz.js";import"./vehicleService-CnHzEnwN.js";import"./index-B-JoA3P0.js";import"./useSupabaseRating-CjTIrahV.js";import"./dealRoutes-XyQ0L3Gs.js";import"./Button-yxRV-Bji.js";import"./ExitIntentModal-dQiOD0Rg.js";import"./x-CkFUJHo0.js";import"./createLucideIcon-PCDrHH_o.js";import"./heart-BkRx2WP1.js";import"./trending-down-C5Jdx0OM.js";import"./file-text-jilGsfpQ.js";import"./OptimizedImage-BBlLWdQX.js";import"./DealerLocatorMap-vF240kf3.js";import"./star-B4mZV8Mf.js";import"./dealerService-CeBNsEgh.js";import"./award-DS9Lb_uw.js";import"./chevron-right-cUozBO-o.js";import"./map-pin-CWC6O2Es.js";import"./phone-C13MidGh.js";import"./navigation-Ble8MvkN.js";import"./dollar-sign-B8vG_adK.js";import"./clock-D2ugpR3F.js";import"./bookmark-Kf1P_1fa.js";import"./external-link-D1rKT_KO.js";import"./index.modern-DK1SwoRq.js";import"./index-Dzo257Tj.js";import"./index-Cos_EMQs.js";import"./chevron-left-COVW75v8.js";import"./map-BxQ2-OYQ.js";import"./MakeOfferModal-r2OOb8x_.js";import"./car-BjEQTPJa.js";import"./message-square-Cs6du1aP.js";import"./user-BqcyWQPZ.js";import"./mail-B5gUaxZK.js";import"./send-CZXes-Kb.js";import"./check-BCkqtp-9.js";import"./circle-alert-CrWGPStH.js";import"./chevron-down-BxORFBf5.js";import"./loader-circle-BlMPA3xY.js";import"./OfferNegotiation-JbLXhFDw.js";import"./arrow-right-CQOQb231.js";import"./handshake-CIea4Abg.js";import"./circle-check-big-D5ddZf1q.js";import"./DealerMapModal-B5r6G80V.js";import"./ContactDealerModal-CXC9ocyb.js";import"./thumbs-up-Du69J2nD.js";import"./message-circle-OXM37PGt.js";import"./share-2-CqOxxwMG.js";import"./sparkles-QwxAkyMQ.js";import"./gauge-DlGlo-nE.js";import"./fuel-BJqDpRHy.js";import"./chevron-up-Di1Qt4ay.js";import"./trash-2-B0slTPE5.js";import"./search-BV72Hhx5.js";import"./minus-VpkcFOU2.js";import"./Tabs-COXeim0f.js";import"./plus-Dx9ybCHB.js";const de={title:"Organisms/Header",component:i,parameters:{layout:"fullscreen",docs:{description:{component:`
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
