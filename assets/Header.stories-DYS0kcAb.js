import{j as e}from"./iframe-m_Fe2Lqw.js";import{H as i}from"./Header-BP59vQkP.js";import"./preload-helper-PPVm8Dsz.js";import"./vehicleService-CnHzEnwN.js";import"./index-B-JoA3P0.js";import"./useSupabaseRating-tCrXbH5c.js";import"./dealRoutes-XyQ0L3Gs.js";import"./Button-D3Rm0dNQ.js";import"./ExitIntentModal-CM_61XTP.js";import"./x-D7buphlG.js";import"./createLucideIcon-BP80_gX_.js";import"./heart-BoQVhfjO.js";import"./trending-down-DDPG0Cz-.js";import"./file-text-DMee1Ffp.js";import"./OptimizedImage-lCfTQ4ym.js";import"./DealerLocatorMap-BJRyum09.js";import"./star-wvR4tUEt.js";import"./dealerService-CeBNsEgh.js";import"./award-CWOkZa_A.js";import"./chevron-right-DkqyGFPd.js";import"./map-pin-xhzpxxq0.js";import"./phone-BJVvZ6qk.js";import"./navigation-BIfLV2ub.js";import"./dollar-sign-C4A_IA6r.js";import"./clock-s4hQVBS_.js";import"./bookmark-BjrtflZ2.js";import"./external-link-DP-vRRlt.js";import"./index.modern-CVM98Cuw.js";import"./index-pxhK8vgt.js";import"./index-CFWi7dJc.js";import"./chevron-left-DV5HKii1.js";import"./map-DVVF-X-x.js";import"./MakeOfferModal-Bh4yLkBe.js";import"./car-CY1t7POh.js";import"./message-square-BfemeC8B.js";import"./user-CABzQ38g.js";import"./mail-CJRbuuhp.js";import"./send-ClmomeOd.js";import"./check-CmD4Hy5_.js";import"./circle-alert-CnS1Qz4S.js";import"./chevron-down-Dy2KdI_D.js";import"./loader-circle-Dy-yszvg.js";import"./OfferNegotiation-Dro2lgbz.js";import"./arrow-right-yaUq-RbE.js";import"./handshake-Chygw5Z6.js";import"./circle-check-big-j8Jmkehr.js";import"./DealerMapModal-mAsEk4kU.js";import"./ContactDealerModal-DabtMe-q.js";import"./thumbs-up-w5q1h6T1.js";import"./message-circle-BA7YyyCt.js";import"./share-2-D071Jark.js";import"./sparkles-C4Hpl7DX.js";import"./gauge---zRVyf2.js";import"./fuel-WBMa_uT8.js";import"./chevron-up-BvXUkfp3.js";import"./trash-2-DHt7lX-R.js";import"./search-vow0GYbR.js";import"./minus-Dw_OiY27.js";import"./Tabs-DNj8E4hM.js";import"./plus-6Xl4MCc0.js";const de={title:"Organisms/Header",component:i,parameters:{layout:"fullscreen",docs:{description:{component:`
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
