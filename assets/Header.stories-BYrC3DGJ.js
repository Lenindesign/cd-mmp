import{j as e}from"./iframe-CtYl2HW_.js";import{H as i}from"./Header-C5a22sRv.js";import"./preload-helper-PPVm8Dsz.js";import"./vehicleService-DcQymfO7.js";import"./index-C_qiXwZJ.js";import"./useSupabaseRating-BTtzmUFi.js";import"./dealRoutes-XyQ0L3Gs.js";import"./Button-IXDPrtNr.js";import"./OptimizedImage-D2AoKT72.js";import"./DealerLocatorMap-U24zNHC_.js";import"./star-0RYaP4GG.js";import"./createLucideIcon-BUQwo1-0.js";import"./x-C3AzriKs.js";import"./dealerService-CeBNsEgh.js";import"./award-B_T73xL8.js";import"./chevron-right-3N06LPf1.js";import"./map-pin-DP2opGT7.js";import"./phone-BLdCAk8V.js";import"./navigation-D1mVzWwR.js";import"./dollar-sign-DGXOr6cW.js";import"./ExitIntentModal-CXF6pmdY.js";import"./heart-VmtrGTWi.js";import"./trending-down-CIk5IYK8.js";import"./file-text-CrJ-TyXK.js";import"./clock-BxeXmho-.js";import"./bookmark-nwk-gFf8.js";import"./external-link-BojbuJ4z.js";import"./index.modern-B6CFtr0W.js";import"./index-Cc6qnbk2.js";import"./index-Bq_EqEIj.js";import"./chevron-left-gd3mLwuF.js";import"./map-pRKm_wV5.js";import"./MakeOfferModal-C70mYFio.js";import"./car-BEhZTqxA.js";import"./message-square-LakY8ONr.js";import"./user-ClDNsXb_.js";import"./mail-DIIRW4i0.js";import"./send-CTgNKjMX.js";import"./check-DcCQ__KD.js";import"./circle-alert-D-uYG3Lf.js";import"./chevron-down-Lsb5CzDT.js";import"./loader-circle-Cqr1iXK8.js";import"./OfferNegotiation-DmFdFJBZ.js";import"./arrow-right-Ci1if0R0.js";import"./handshake-daaGsCIB.js";import"./circle-check-big-BzdRwpNI.js";import"./DealerMapModal-5wroT_x8.js";import"./ContactDealerModal-CM59C068.js";import"./thumbs-up-CMem-q-9.js";import"./message-circle-CIc9fZ7L.js";import"./share-2-Bs9-FM-n.js";import"./sparkles-BwYDUl18.js";import"./gauge-B-d3ibBk.js";import"./fuel-C3NGlqe-.js";import"./chevron-up-wFlt6T6R.js";import"./trash-2-DXgDlsZO.js";import"./search-3iHrI54w.js";import"./minus-BjoQeeNC.js";import"./Tabs-CPVnWySe.js";import"./plus-CUghEtAa.js";const de={title:"Organisms/Header",component:i,parameters:{layout:"fullscreen",docs:{description:{component:`
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
