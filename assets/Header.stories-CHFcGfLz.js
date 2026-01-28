import{j as e}from"./iframe-uGVaIJRM.js";import{H as i}from"./Header-C4kmH8xS.js";import"./preload-helper-PPVm8Dsz.js";import"./vehicleService-ByoDejvg.js";import"./index-Dto8T7jp.js";import"./useSupabaseRating-DO1fK6NT.js";import"./Button-CsVoKH5A.js";import"./ExitIntentModal-PHZhTcoD.js";import"./x-CWmK8CiQ.js";import"./createLucideIcon-BsHtCPy9.js";import"./heart-DeEdJYI_.js";import"./trending-down-CCX_hz-h.js";import"./file-text-Bhy17qkv.js";import"./OptimizedImage-Dy_3BUMK.js";import"./DealerLocatorMap-Cu-pMoPB.js";import"./star-DsoCMtJQ.js";import"./dealerService-CeBNsEgh.js";import"./award-BH4hjZQK.js";import"./chevron-right-CzbDPFr4.js";import"./map-pin-D4VEAlav.js";import"./phone-BrO9Cv_w.js";import"./navigation-Corhtqu9.js";import"./dollar-sign-BQpTVm-f.js";import"./clock-BETuV03g.js";import"./bookmark-BSwOyg4P.js";import"./external-link-DCXfZsnl.js";import"./index.modern-CEo4e1j-.js";import"./index-B8Y5qSez.js";import"./index-BGc1vmlk.js";import"./chevron-left-C3HWVdfp.js";import"./map-DS9HkNQm.js";import"./MakeOfferModal-pmBr07EF.js";import"./car-B9c8llWb.js";import"./message-square-BW7MlM5R.js";import"./user-CpodlCyh.js";import"./mail-C4u3YiRE.js";import"./circle-check-big-mXaimMJm.js";import"./send-DHaBk5Eh.js";import"./chevron-down-dd2Q0KPd.js";import"./loader-circle-CLaYIOAR.js";import"./OfferNegotiation-DNtQiuJq.js";import"./arrow-right-yiLBdC-u.js";import"./handshake-CRBzMn_G.js";import"./DealerMapModal-DBvkgLSF.js";import"./gauge-B6n9VM22.js";import"./fuel-DMWQ8L8n.js";import"./check-DNbsxg0W.js";import"./minus-moBAfl0T.js";import"./trash-2-DSHzGe2_.js";import"./search-C23U8Jae.js";import"./plus-CtfPUBIR.js";const oe={title:"Organisms/Header",component:i,parameters:{layout:"fullscreen",docs:{description:{component:`
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
