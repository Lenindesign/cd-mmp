import{j as e}from"./iframe-B0zzILeQ.js";import{H as i}from"./Header-CYX99q4i.js";import"./preload-helper-PPVm8Dsz.js";import"./vehicleService-CgRIVwGT.js";import"./index-Bk6M7T92.js";import"./useSupabaseRating-DbLvH4fw.js";import"./dealRoutes-CRJk03s6.js";import"./Button-DkuAHkZL.js";import"./ExitIntentModal-DlgAeZwF.js";import"./x-B1u6JJj5.js";import"./createLucideIcon-B53icIi0.js";import"./heart-C0lIkzM9.js";import"./trending-down-C5eZQDRN.js";import"./file-text-B0hjl0N2.js";import"./OptimizedImage-CQKWs77O.js";import"./DealerLocatorMap-BOqpNMN-.js";import"./star-ChNqib9M.js";import"./dealerService-CeBNsEgh.js";import"./award-BilQFW2d.js";import"./chevron-right-Cbl57EC4.js";import"./map-pin-xYf_6IBh.js";import"./phone-CXBkQFX_.js";import"./navigation-D6_Cc_0g.js";import"./dollar-sign-DhweOpxK.js";import"./clock-4tlT1E4J.js";import"./bookmark-vrpm2hld.js";import"./external-link-CiFJPhUh.js";import"./index.modern-DIHr0-V5.js";import"./index-er1cdxyi.js";import"./index-Cc8McnDn.js";import"./chevron-left-DY41a8G1.js";import"./map-dGskPEb8.js";import"./MakeOfferModal-hso8lWAm.js";import"./car-BYblzpAW.js";import"./message-square-DdoZIr0Z.js";import"./user-D16WpQpp.js";import"./mail-D_qqXwwV.js";import"./send-ChFac2Tc.js";import"./check-BIFd57LE.js";import"./circle-alert-CoKqd_jP.js";import"./chevron-down-DboVJXE3.js";import"./loader-circle-B2xaw5Zh.js";import"./OfferNegotiation-Bh-CdcyT.js";import"./arrow-right-Chw2az46.js";import"./handshake-DqDn9MHl.js";import"./circle-check-big-BPUi1fjw.js";import"./DealerMapModal-CbB3AKeF.js";import"./ContactDealerModal-COXZsiyf.js";import"./thumbs-up-C2k5_b1t.js";import"./message-circle-CWNdYyL6.js";import"./share-2-BvFAW7B_.js";import"./sparkles-a7YLlda6.js";import"./gauge-kUkRKSrD.js";import"./fuel-Do_lYlYV.js";import"./chevron-up-CauZ84Fv.js";import"./trash-2-DT6pr6Xd.js";import"./search-D826f5CF.js";import"./minus-CLOH__B0.js";import"./Tabs-D1168gTb.js";import"./plus-BjwRK0DT.js";const de={title:"Organisms/Header",component:i,parameters:{layout:"fullscreen",docs:{description:{component:`
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
