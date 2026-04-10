import{j as e}from"./iframe-DBVRfBzZ.js";import{H as i}from"./Header-CGIbz9GB.js";import"./preload-helper-PPVm8Dsz.js";import"./vehicleService-DSnLjH3g.js";import"./index-BirN2__4.js";import"./useSupabaseRating-CIfV0nSI.js";import"./dealRoutes-CRJk03s6.js";import"./Button-DDK67m5y.js";import"./ExitIntentModal-p1MxbQnX.js";import"./x-EXZygFfF.js";import"./createLucideIcon-BouiUX3x.js";import"./heart-tYs99gur.js";import"./trending-down-eGg5qKmU.js";import"./file-text-DtaXAk9w.js";import"./OptimizedImage-DnGmJn6f.js";import"./DealerLocatorMap-XdvUhsgl.js";import"./star-DyJSm4KG.js";import"./dealerService-CeBNsEgh.js";import"./award-ZPzDMsRf.js";import"./chevron-right-eJT4vuJm.js";import"./map-pin-D4Z4g4mg.js";import"./phone-DwOEBeFd.js";import"./navigation-Cn7f1tMF.js";import"./dollar-sign-DhpzM0-s.js";import"./clock-D_KZ11bC.js";import"./bookmark-XbTQtgFo.js";import"./external-link-BaXaOO1I.js";import"./index.modern-Dx-Y0ser.js";import"./index-8p8k2Hd5.js";import"./index-CfLPb2sK.js";import"./chevron-left-CD6_QkPr.js";import"./map-BWa1pwYf.js";import"./MakeOfferModal-C0EYTq4M.js";import"./car-C9Mag3n0.js";import"./message-square-dQf0X_cg.js";import"./user-jZmYhJNQ.js";import"./mail-B8B08bbj.js";import"./send-DPdkv4dZ.js";import"./check-CpRDFcs0.js";import"./circle-alert-uNUNfQi2.js";import"./chevron-down-BvM9XyJG.js";import"./loader-circle-CKs0os2b.js";import"./OfferNegotiation-D-WwHEz9.js";import"./arrow-right-DrOPGE6f.js";import"./handshake-CCcRpxAz.js";import"./circle-check-big-DBt5hj2p.js";import"./DealerMapModal-Dz6vByB8.js";import"./ContactDealerModal-BMl_jg0P.js";import"./thumbs-up-1CjaE2u-.js";import"./message-circle-C4uWx6Pb.js";import"./share-2-DwB4uL1h.js";import"./sparkles-BmBE4wQ3.js";import"./gauge-jvcLOoO-.js";import"./fuel-BxUIdiGZ.js";import"./chevron-up-Bh-hRgit.js";import"./trash-2-DnNvIGFC.js";import"./search-CqYhg1xn.js";import"./minus-tRIiUZj_.js";import"./plus-Dw7FrUFh.js";const ce={title:"Organisms/Header",component:i,parameters:{layout:"fullscreen",docs:{description:{component:`
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
}`,...r.parameters?.docs?.source}}};const de=["Default","WithContent","Mobile"];export{t as Default,r as Mobile,o as WithContent,de as __namedExportsOrder,ce as default};
