import{j as e}from"./iframe-fWENHZrW.js";import{H as i}from"./Header-BPDbDvHa.js";import"./preload-helper-PPVm8Dsz.js";import"./vehicleService-DcljwXyi.js";import"./index-Dto8T7jp.js";import"./useSupabaseRating-aepSMfbk.js";import"./Button-DmAnt29e.js";import"./ExitIntentModal-C6MZxMtT.js";import"./x-CRqb5MDX.js";import"./createLucideIcon-BIrdMy6b.js";import"./heart-ZDKmE7ai.js";import"./trending-down-GvVt9IeC.js";import"./file-text-YjohCu6F.js";import"./OptimizedImage-cqyeAeCm.js";import"./DealerLocatorMap-rpmPe_fr.js";import"./star-1rC74_9W.js";import"./dealerService-CeBNsEgh.js";import"./award-9iIdFr8r.js";import"./chevron-right-CqpIL_lc.js";import"./map-pin-DQES3MfY.js";import"./phone-BbxRAMfu.js";import"./navigation-DpVme3Bo.js";import"./dollar-sign-DG5t0wgM.js";import"./clock-B7uVmAfT.js";import"./bookmark-FmUOqk7I.js";import"./external-link-CdNkxRnP.js";import"./index.modern-DHTia6bp.js";import"./index-9q5h0Xxa.js";import"./index-_XuJucp9.js";import"./chevron-left-CXXrmMQS.js";import"./map-B1kCzAPy.js";import"./MakeOfferModal-aRGwV021.js";import"./car-Du4on2Qa.js";import"./message-square-C9aK8l2F.js";import"./user-BE6bCaSX.js";import"./mail-Cy8IKXN4.js";import"./circle-check-big-YULrHTrg.js";import"./send-CE0m3RSK.js";import"./chevron-down-CYbDK-8K.js";import"./loader-circle-EVzDnooM.js";import"./OfferNegotiation-BbGqSn6o.js";import"./arrow-right-DFE6H7Kk.js";import"./handshake-BZ6NAvdR.js";import"./DealerMapModal-DjP9os4v.js";import"./ContactDealerModal-CwLvXCPU.js";import"./thumbs-up-mUzUZ4s3.js";import"./message-circle-8vNk7UJn.js";import"./share-2-BmTPoQ8r.js";import"./sparkles-DWrNUfnA.js";import"./gauge-DSI-28BF.js";import"./fuel-5j-BV0nS.js";import"./chevron-up-Ckipj3Nb.js";import"./trash-2-BdcNZimu.js";import"./search-DBQnHat8.js";import"./check-Ba7-V5_9.js";import"./minus-B2YXFvV1.js";import"./plus-Dy1p0Wfx.js";const pe={title:"Organisms/Header",component:i,parameters:{layout:"fullscreen",docs:{description:{component:`
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
