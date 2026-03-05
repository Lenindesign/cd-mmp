import{j as e}from"./iframe-B0Lewv8I.js";import{H as i}from"./Header-CYoZ_TZu.js";import"./preload-helper-PPVm8Dsz.js";import"./vehicleService-ByoDejvg.js";import"./index-Dto8T7jp.js";import"./useSupabaseRating-BoCgPejU.js";import"./Button-BLcyIc1U.js";import"./ExitIntentModal-CNCFkH9v.js";import"./x-DMFz1WV6.js";import"./createLucideIcon-Cw8Zd8tS.js";import"./heart-CorvkIlz.js";import"./trending-down-wOHJhZrx.js";import"./file-text-BHmrZcc2.js";import"./OptimizedImage-DoLqKWi0.js";import"./DealerLocatorMap-_4Bu1RUU.js";import"./star-Rz-QeFBv.js";import"./dealerService-CeBNsEgh.js";import"./award--xf0csGN.js";import"./chevron-right-BlLLDkGp.js";import"./map-pin-nFnssibH.js";import"./phone-BeZq7H02.js";import"./navigation-WyFmFdq_.js";import"./dollar-sign-B28fhaFb.js";import"./clock-4QTQiaZq.js";import"./bookmark-qTRS_3hP.js";import"./external-link-DgJ4shGE.js";import"./index.modern-BAyKewiA.js";import"./index-2BYlkL-5.js";import"./index-xR_zoh3_.js";import"./chevron-left-CUI6l-Sk.js";import"./map-BZevN85m.js";import"./MakeOfferModal-Ub7M7XB7.js";import"./car-DAcc2goO.js";import"./message-square-CiZFrmcg.js";import"./user-CJD3q2Cu.js";import"./mail-I12vDJ0A.js";import"./circle-check-big-CzuyWKQ-.js";import"./send-RVu4kPVN.js";import"./chevron-down-Bt117hSu.js";import"./loader-circle-B615pxil.js";import"./OfferNegotiation-D0CUQsqf.js";import"./arrow-right-C03uOeTC.js";import"./handshake-BCLtRcqz.js";import"./DealerMapModal-CzF5Nbz3.js";import"./gauge-DL2iq1Gy.js";import"./fuel-Bj_j2A9I.js";import"./check-CdMGIFL5.js";import"./minus-CMRJGpne.js";import"./trash-2-C-WFnSlC.js";import"./search-CEi7vMA8.js";import"./plus-il5GWLad.js";const oe={title:"Organisms/Header",component:i,parameters:{layout:"fullscreen",docs:{description:{component:`
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
}`,...r.parameters?.docs?.source}}};const re=["Default","WithContent","Mobile"];export{t as Default,r as Mobile,o as WithContent,re as __namedExportsOrder,oe as default};
