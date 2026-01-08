import{j as e}from"./iframe-DIdqqM8u.js";import{H as i}from"./Header-CD2I3e9r.js";import"./preload-helper-PPVm8Dsz.js";import"./vehicleService-ByoDejvg.js";import"./index-Dto8T7jp.js";import"./useSupabaseRating-DPDCn-A2.js";import"./Button-CU5O9zyA.js";import"./ExitIntentModal-DhQ9OIeh.js";import"./x-Clpn9Bq_.js";import"./createLucideIcon-N_7SJ2wa.js";import"./heart-DJeIxppI.js";import"./trending-down-C4Id3H5Z.js";import"./file-text-CIMBueqO.js";import"./OptimizedImage-CM_8JT4J.js";import"./DealerLocatorMap-CtF4XZ2d.js";import"./star-CR7rjYKN.js";import"./dealerService-CeBNsEgh.js";import"./award-BiRkJnE2.js";import"./chevron-right-BWtBJVU4.js";import"./map-pin-DXjLqUYk.js";import"./phone-C9-wLbbj.js";import"./navigation-LLqRexqY.js";import"./dollar-sign-DbyR-4wE.js";import"./clock-QVPCWxVD.js";import"./bookmark-pTrgxFUm.js";import"./external-link-CIscjZXg.js";import"./index.modern-XOdpyseH.js";import"./index-BmXWifHt.js";import"./index-Ce5dTdXs.js";import"./chevron-left-BXQxDqGM.js";import"./map-3ftYsHdq.js";import"./MakeOfferModal-BkS9hg6g.js";import"./car-CygSaoec.js";import"./message-square-6wpS9VzD.js";import"./user-6fpUeCwM.js";import"./mail-Du3JuWby.js";import"./circle-check-big-B0iGEz7A.js";import"./send-GdthpGTJ.js";import"./chevron-down-CkMsvG2m.js";import"./loader-circle-GBQ6246s.js";import"./OfferNegotiation-BMdeRLM3.js";import"./arrow-right-8n97Ify-.js";import"./handshake-BJVdn_Rh.js";import"./DealerMapModal-BEMZDVGP.js";import"./gauge-Cw1wgYoj.js";import"./fuel-BeLnPinK.js";import"./check-J5ZhHl2w.js";import"./minus-h_-I6A19.js";import"./trash-2-8bDxATPO.js";import"./search-Be7Paw65.js";import"./plus-CmHwPdUc.js";const oe={title:"Organisms/Header",component:i,parameters:{layout:"fullscreen",docs:{description:{component:`
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
