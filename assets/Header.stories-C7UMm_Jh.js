import{j as e}from"./iframe-ninicCRD.js";import{H as i}from"./Header-BVAGHzfx.js";import"./preload-helper-PPVm8Dsz.js";import"./vehicleService-CnHzEnwN.js";import"./index-B-JoA3P0.js";import"./useSupabaseRating-aHt1fPXW.js";import"./dealRoutes-XyQ0L3Gs.js";import"./Button-DkNszbMa.js";import"./ExitIntentModal-CCwR3_9H.js";import"./x-K3vaZfPU.js";import"./createLucideIcon-BcJqg8Go.js";import"./heart-BrJLnwXw.js";import"./trending-down-A2CYPs9I.js";import"./file-text-D9hibP32.js";import"./OptimizedImage-BmSZ5SmF.js";import"./DealerLocatorMap-DAfjDUel.js";import"./star-DG4kep6G.js";import"./dealerService-CeBNsEgh.js";import"./award-CGn8Xyq1.js";import"./chevron-right-CeCEL4zS.js";import"./map-pin-BNMMdvRU.js";import"./phone-DYfSTQ-X.js";import"./navigation-MsnnJ6Ac.js";import"./dollar-sign-BJZtvnT2.js";import"./clock-CVIBbZSp.js";import"./bookmark-Brxx0S3W.js";import"./external-link-BwDLwnRu.js";import"./index.modern-a1rsvpLX.js";import"./index-cfZVd-9o.js";import"./index-B8Udh1xi.js";import"./chevron-left-cYsWpxRP.js";import"./map-DX2ScgXG.js";import"./MakeOfferModal-z5QFkVAI.js";import"./car-DEgz2348.js";import"./message-square-Bax1daeF.js";import"./user-DO4-9G4G.js";import"./mail-C-vdpGpK.js";import"./send-2qiZBL2B.js";import"./check-D4zlaDSq.js";import"./circle-alert-NXOCuw2_.js";import"./chevron-down-CdkRYgMi.js";import"./loader-circle-Lt7ZlPQI.js";import"./OfferNegotiation-BCwxIMRM.js";import"./arrow-right-DR3-mxi0.js";import"./handshake-Ddklr5cg.js";import"./circle-check-big-BaXTelvZ.js";import"./DealerMapModal-vhHb5s5j.js";import"./ContactDealerModal-Ctjjdgkt.js";import"./thumbs-up-L_m55hKC.js";import"./message-circle-DYxAO9Bb.js";import"./share-2-_U3layFB.js";import"./sparkles-NCkE36uv.js";import"./gauge-Bi9aBUOd.js";import"./fuel-4KbID3La.js";import"./chevron-up-DT7S3VpH.js";import"./trash-2-Cqvusi-v.js";import"./search-D8VVa2n_.js";import"./minus-ByrgveJB.js";import"./Tabs-DmpNeEDg.js";import"./plus-BL5itxL3.js";const de={title:"Organisms/Header",component:i,parameters:{layout:"fullscreen",docs:{description:{component:`
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
