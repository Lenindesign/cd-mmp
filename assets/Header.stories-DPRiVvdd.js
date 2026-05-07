import{j as e}from"./iframe-Crdg2zxA.js";import{H as i}from"./Header-94uqrw6j.js";import"./preload-helper-PPVm8Dsz.js";import"./vehicleService-CnHzEnwN.js";import"./index-B-JoA3P0.js";import"./useSupabaseRating-EfMhHjSu.js";import"./dealRoutes-XyQ0L3Gs.js";import"./Button-rMFQI1Tk.js";import"./ExitIntentModal-CcyaFWit.js";import"./x-Bd2KJXqT.js";import"./createLucideIcon-DI0nEMmK.js";import"./heart-DRjVAVri.js";import"./trending-down-CwKPPRyU.js";import"./file-text-9mIGI8sx.js";import"./OptimizedImage-Cp_MRT7a.js";import"./DealerLocatorMap-CKNiuaTd.js";import"./star-B3gto8rZ.js";import"./dealerService-CeBNsEgh.js";import"./award-M_irQOui.js";import"./chevron-right-DQs0vCT2.js";import"./map-pin-D98i1xfS.js";import"./phone-D4GImVx-.js";import"./navigation-Bomzr0z8.js";import"./dollar-sign-BZQ_jSDB.js";import"./clock-D77PLuO7.js";import"./bookmark-BOk3JsbY.js";import"./external-link-g07ykpcq.js";import"./index.modern-CWaxywHq.js";import"./index-DDRHwjY5.js";import"./index-BLD-e2Cb.js";import"./chevron-left-DBl8mLED.js";import"./map-DtpRdMxZ.js";import"./MakeOfferModal-pcDJPtXe.js";import"./car-D5RpD6Pu.js";import"./message-square-Bi3ZlskJ.js";import"./user-VULjHNSX.js";import"./mail-DmgpqPEb.js";import"./send-C3VS1OYz.js";import"./check-CADNwqZc.js";import"./circle-alert-B0jrXwRe.js";import"./chevron-down-DXX3NA8S.js";import"./loader-circle-PMwzb1Q9.js";import"./OfferNegotiation-Dics7qzZ.js";import"./arrow-right--58tym5e.js";import"./handshake-vjXpAn-9.js";import"./circle-check-big-CvIHXxea.js";import"./DealerMapModal-NyKdpBCG.js";import"./ContactDealerModal-2FYlFK9j.js";import"./thumbs-up-CnfAcGHn.js";import"./message-circle-9yaieKpJ.js";import"./share-2-DvOaMpP9.js";import"./sparkles-CAL0shh3.js";import"./gauge-Dg_7jAtB.js";import"./fuel-CtskVLmd.js";import"./chevron-up-x_zhLzS4.js";import"./trash-2-Nx47Buc_.js";import"./search-C2KbyLId.js";import"./minus-D7sLbYh4.js";import"./Tabs-gqdNtqI-.js";import"./plus-x5vqyA-m.js";const de={title:"Organisms/Header",component:i,parameters:{layout:"fullscreen",docs:{description:{component:`
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
