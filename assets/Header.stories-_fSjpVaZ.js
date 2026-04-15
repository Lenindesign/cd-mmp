import{j as e}from"./iframe-b4YE7bIB.js";import{H as i}from"./Header-CROkNZ0D.js";import"./preload-helper-PPVm8Dsz.js";import"./vehicleService-CgRIVwGT.js";import"./index-Bk6M7T92.js";import"./useSupabaseRating-vQLFnE7e.js";import"./dealRoutes-XyQ0L3Gs.js";import"./Button-Dvl0DcyO.js";import"./ExitIntentModal-4GBYRviZ.js";import"./x-BWgk-kEX.js";import"./createLucideIcon-CUDGm6mR.js";import"./heart-CNiaznKz.js";import"./trending-down-DhC3Y8sv.js";import"./file-text-4SIGu0OS.js";import"./OptimizedImage-BwNzcgxe.js";import"./DealerLocatorMap-B1kwjQ4L.js";import"./star-3vkfKgSg.js";import"./dealerService-CeBNsEgh.js";import"./award-CrFJ3M44.js";import"./chevron-right-BvPfXivF.js";import"./map-pin-Bbe65Wlt.js";import"./phone-8WffvQvp.js";import"./navigation-ChaCeQ63.js";import"./dollar-sign-CF18faXR.js";import"./clock-CdeRQUew.js";import"./bookmark-BSlJg7f0.js";import"./external-link-BLdggrlF.js";import"./index.modern-DK_XDfMJ.js";import"./index-BHjpIzLL.js";import"./index-_-D-qqcz.js";import"./chevron-left-DK28aH9s.js";import"./map-BkwHzEgn.js";import"./MakeOfferModal-aUt1WnXG.js";import"./car-IDKeB2iS.js";import"./message-square-bTfu-9Fd.js";import"./user-C4orDP7g.js";import"./mail-BPS4hqZ0.js";import"./send-BtRKsL4A.js";import"./check-DqjlDIzH.js";import"./circle-alert-j_Nj4g0C.js";import"./chevron-down-D0PYJwbx.js";import"./loader-circle-D_by5ymf.js";import"./OfferNegotiation-nqJtJEaE.js";import"./arrow-right-C8Gd8Wdz.js";import"./handshake-DwyMpGhh.js";import"./circle-check-big-DqU1-iU1.js";import"./DealerMapModal-CWYBfP-M.js";import"./ContactDealerModal-BDkaK3Uh.js";import"./thumbs-up-DFm1zSGG.js";import"./message-circle-Cjtz3gV2.js";import"./share-2-BZx7JvD6.js";import"./sparkles-FcOugou0.js";import"./gauge-f8gAsXFn.js";import"./fuel-B-iuWstB.js";import"./chevron-up-dEFfsxHD.js";import"./trash-2-DyfKyGCd.js";import"./search-DEzPQEMx.js";import"./minus-B-Mhh8GZ.js";import"./Tabs-CKP1ukri.js";import"./plus-yhjvrPJT.js";const de={title:"Organisms/Header",component:i,parameters:{layout:"fullscreen",docs:{description:{component:`
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
