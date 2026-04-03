import{j as e}from"./iframe-7fQ1Vzjc.js";import{H as i}from"./Header-CJxwpa0r.js";import"./preload-helper-PPVm8Dsz.js";import"./vehicleService-C21vsCue.js";import"./index-BirN2__4.js";import"./useSupabaseRating-CfHeLUds.js";import"./Button-rKmjxc1P.js";import"./ExitIntentModal-DLY8vRgH.js";import"./x-Be5SrrMi.js";import"./createLucideIcon-CJ3BdxQn.js";import"./heart-mZYjx7c3.js";import"./trending-down-Br5cuTAR.js";import"./file-text-BZf7BH_V.js";import"./OptimizedImage-CTFB2qBf.js";import"./DealerLocatorMap-hFUl8rey.js";import"./star-BeyOu7O4.js";import"./dealerService-CeBNsEgh.js";import"./award-C-qvS2UY.js";import"./chevron-right-BpQTSH5a.js";import"./map-pin-BSEyG3z5.js";import"./phone-BsCLLEvK.js";import"./navigation-umeTuz_s.js";import"./dollar-sign-DDuEiZHF.js";import"./clock-rUpVV0A-.js";import"./bookmark-CcogppDr.js";import"./external-link-CxdN4gIm.js";import"./index.modern-DQVKXpT1.js";import"./index-C-w8teAO.js";import"./index-61dKqAY3.js";import"./chevron-left-BuKHDjOV.js";import"./map-DnNAYRz1.js";import"./MakeOfferModal-CYUsLcF_.js";import"./car-DRDX89V4.js";import"./message-square-CsijKanD.js";import"./user-CUicR5XF.js";import"./mail-Kz0aRA_4.js";import"./circle-check-big-DksBEHgk.js";import"./send-lyLKdIxO.js";import"./chevron-down-De424KDx.js";import"./loader-circle-DJKyMm9r.js";import"./OfferNegotiation-Bzandknb.js";import"./arrow-right-QyJ60IcT.js";import"./handshake-PuPPqFIf.js";import"./DealerMapModal-BYXZRvUh.js";import"./ContactDealerModal--e8vZ9Q6.js";import"./thumbs-up-C4_VhjdU.js";import"./message-circle-COp0GaI1.js";import"./share-2-s00Ah-N3.js";import"./sparkles-CMg-UZte.js";import"./gauge-Bxo2MvNL.js";import"./fuel-BVlT_ZcK.js";import"./chevron-up-Dt23C380.js";import"./trash-2-C2fkaqYr.js";import"./search-B9s9bORl.js";import"./check-RcvOzfW7.js";import"./minus-pcD_DHTS.js";import"./plus-v6iBo1In.js";const pe={title:"Organisms/Header",component:i,parameters:{layout:"fullscreen",docs:{description:{component:`
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
