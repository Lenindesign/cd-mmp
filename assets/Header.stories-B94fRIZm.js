import{j as e}from"./iframe-Nxp4yMSg.js";import{H as i}from"./Header-0kOaYoph.js";import"./preload-helper-PPVm8Dsz.js";import"./vehicleService-ByoDejvg.js";import"./index-Dto8T7jp.js";import"./useSupabaseRating-BP130HhB.js";import"./Button-CI6sPZhV.js";import"./ExitIntentModal-CI1iTa1V.js";import"./x-C9Lj2VwR.js";import"./createLucideIcon-u7pGn36W.js";import"./heart-D1BMrRy6.js";import"./trending-down-BUZdfGau.js";import"./file-text-CrmlyGRg.js";import"./OptimizedImage-GUGW_dH2.js";import"./DealerLocatorMap-mv93JCC6.js";import"./star-BK0LYzdp.js";import"./dealerService-CeBNsEgh.js";import"./award-Dmd79wAA.js";import"./chevron-right-BfQn7cU4.js";import"./map-pin-BMPo0fza.js";import"./phone-hVGJJOYz.js";import"./navigation-BIe2wKyk.js";import"./dollar-sign-BaD9Xu09.js";import"./clock-BHcKyMpO.js";import"./bookmark-DwIdQv1c.js";import"./external-link-B4TVojFL.js";import"./index.modern-qJQdMvAf.js";import"./index-B7gVY_Ah.js";import"./index-BgzBXKlA.js";import"./chevron-left-CQb0u5g5.js";import"./map-DN6I5dph.js";import"./MakeOfferModal-g_AF4bET.js";import"./car-t4ApUIbk.js";import"./message-square-KPdxV0_I.js";import"./user-DUaZbwm7.js";import"./mail-CBogtg1s.js";import"./circle-check-big-CC6wOih9.js";import"./send-DDjuHH9u.js";import"./chevron-down-H82Vf3Ax.js";import"./loader-circle-D7a6AGK4.js";import"./OfferNegotiation-DDyZcMPk.js";import"./arrow-right-CxzEKr34.js";import"./handshake-C45-AxbO.js";import"./DealerMapModal-DGRWE0Lb.js";import"./gauge-74qFAzm_.js";import"./fuel-B445BfsV.js";import"./check-qSFZi2jR.js";import"./minus-BpfPbdY_.js";import"./trash-2-hyYqamd1.js";import"./search-BCvMNPvb.js";import"./plus-CMKcQUET.js";import"./sparkles-C4iVphUV.js";const re={title:"Organisms/Header",component:i,parameters:{layout:"fullscreen",docs:{description:{component:`
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
