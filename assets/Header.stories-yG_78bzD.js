import{j as e}from"./iframe-D6fuzIpC.js";import{H as i}from"./Header-CfzAXvgw.js";import"./preload-helper-PPVm8Dsz.js";import"./vehicleService-BTivPZrm.js";import"./index-B-JoA3P0.js";import"./useSupabaseRating-Bg_d9Lch.js";import"./dealRoutes-XyQ0L3Gs.js";import"./Button-CwZE4WBY.js";import"./ExitIntentModal-DCQhOW9v.js";import"./x-CMymisMi.js";import"./createLucideIcon-CgKYPwUn.js";import"./heart-0NRrATm8.js";import"./trending-down-BCdAF5A3.js";import"./file-text-BUELcQto.js";import"./OptimizedImage-BcKuHSg0.js";import"./DealerLocatorMap-CHgposFa.js";import"./star-KOFszE1P.js";import"./dealerService-CeBNsEgh.js";import"./award-DzFLxhWf.js";import"./chevron-right-Dqxv2xU6.js";import"./map-pin-CQIhwQVa.js";import"./phone-DTB3JkhX.js";import"./navigation-DsabqanK.js";import"./dollar-sign-DtlqcShv.js";import"./clock-PG6-eFC9.js";import"./bookmark-Cqwr1A1P.js";import"./external-link-CWnot_w-.js";import"./index.modern-DZvq4rW7.js";import"./index-D784BP7x.js";import"./index-CMF8l5di.js";import"./chevron-left-BbsY1-xF.js";import"./map-RTHV-xAZ.js";import"./MakeOfferModal-BHU9lPtR.js";import"./car-Bwpkf7pS.js";import"./message-square-DLIHQE5o.js";import"./user-BsHKwfdJ.js";import"./mail-DFWqSk0U.js";import"./send-Dn4v8yfJ.js";import"./check-Cyel1bWB.js";import"./circle-alert-3a-KnwNz.js";import"./chevron-down-Qwn29Wcx.js";import"./loader-circle-BEvQ1Izl.js";import"./OfferNegotiation-Do3aLkGq.js";import"./arrow-right-DXCy4NVC.js";import"./handshake-CVVoW0HD.js";import"./circle-check-big-D8Sswr-7.js";import"./DealerMapModal-BA-_U5Vx.js";import"./ContactDealerModal-jD4KoG7r.js";import"./thumbs-up-CjaFCyU5.js";import"./message-circle-GK-GUHaP.js";import"./share-2-DFCsOMP6.js";import"./sparkles-B68G62q3.js";import"./gauge-Dj3tMQHB.js";import"./fuel-DLOJKGFy.js";import"./chevron-up-Dd2GByNd.js";import"./trash-2-C6eRz3s2.js";import"./search-C8-dJKk2.js";import"./minus-CjJzcONp.js";import"./Tabs-BrI7QwjL.js";import"./plus-DO29xior.js";const de={title:"Organisms/Header",component:i,parameters:{layout:"fullscreen",docs:{description:{component:`
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
