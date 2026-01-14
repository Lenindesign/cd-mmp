import{j as e}from"./iframe-DSvoZ5_G.js";import{H as i}from"./Header-BjR4GLmC.js";import"./preload-helper-PPVm8Dsz.js";import"./vehicleService-ByoDejvg.js";import"./index-Dto8T7jp.js";import"./useSupabaseRating-cJiT06ZK.js";import"./Button-DdjVkzUn.js";import"./ExitIntentModal-DGd4GE5k.js";import"./x-2E-1Lj0o.js";import"./createLucideIcon-Crwf_ruZ.js";import"./heart-DJGUoRX0.js";import"./trending-down-i-L66CPR.js";import"./file-text-bBPuzVJn.js";import"./OptimizedImage-D6UejAve.js";import"./DealerLocatorMap-wnnpkkLH.js";import"./star-CxA0noa0.js";import"./dealerService-CeBNsEgh.js";import"./award-3qRKJhpS.js";import"./chevron-right-4A1Wkl-v.js";import"./map-pin-vhYGp38O.js";import"./phone-jw_hv5SB.js";import"./navigation-Br4Y-x4v.js";import"./dollar-sign-DnfHQWiB.js";import"./clock-D1ZpwFSM.js";import"./bookmark-PetYYaYA.js";import"./external-link-BN5BsKq_.js";import"./index.modern-CSOwGbIa.js";import"./index-CvF68i9t.js";import"./index-BJzEbzFS.js";import"./chevron-left-CAkygER-.js";import"./map-Br2AlSeE.js";import"./MakeOfferModal-B18P3joU.js";import"./car-BWO5wuYI.js";import"./message-square-CvLc6hQ9.js";import"./user-dNwHUIS6.js";import"./mail-Bod0MHqN.js";import"./circle-check-big-C2sKbFxx.js";import"./send-BbJLSHRf.js";import"./chevron-down-BPEHsk0p.js";import"./loader-circle-DxOnmxLA.js";import"./OfferNegotiation-CtBSiTaa.js";import"./arrow-right-BKZoOuRS.js";import"./handshake-BGN7fSeK.js";import"./DealerMapModal-IY9DUXkZ.js";import"./gauge-8-kWSDil.js";import"./fuel-xZx1kCBZ.js";import"./check-Xqbxoflv.js";import"./minus-CjsjQBzm.js";import"./trash-2-DvXsEUI-.js";import"./search-DpAvruwM.js";import"./plus-BW9KMnNE.js";import"./sparkles-BohLuvzJ.js";const re={title:"Organisms/Header",component:i,parameters:{layout:"fullscreen",docs:{description:{component:`
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
