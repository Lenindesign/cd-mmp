import{j as e}from"./iframe-DMhWO8_d.js";import{H as i}from"./Header-DZHlnoQu.js";import"./preload-helper-PPVm8Dsz.js";import"./vehicleService-BTivPZrm.js";import"./index-B-JoA3P0.js";import"./useSupabaseRating-kqSZHkaw.js";import"./dealRoutes-XyQ0L3Gs.js";import"./Button-BxT-yNlP.js";import"./ExitIntentModal-BV0BX1YK.js";import"./x-B9AQw_z3.js";import"./createLucideIcon-DEFu8sPW.js";import"./heart-BfS6_Kil.js";import"./trending-down-Cl9BawtB.js";import"./file-text-BhUbUoau.js";import"./OptimizedImage-CoT191ja.js";import"./DealerLocatorMap-DjVaJ3us.js";import"./star-CSg8f-dc.js";import"./dealerService-CeBNsEgh.js";import"./award-D2m7wHQS.js";import"./chevron-right-CfywZN8V.js";import"./map-pin-Dg-2pqat.js";import"./phone-BKDik7bm.js";import"./navigation-DFzGXPt2.js";import"./dollar-sign-M48uosXe.js";import"./clock-DFNDT_E-.js";import"./bookmark-BA0p3sOP.js";import"./external-link-B6LxrA3Y.js";import"./index.modern-DvA0QKqp.js";import"./index-VXWxF9Yp.js";import"./index-3ppbQGoT.js";import"./chevron-left-C122yWRD.js";import"./map-Bbbjek2g.js";import"./MakeOfferModal-2cw__K-4.js";import"./car-6hIiL_bv.js";import"./message-square-BHD_H9IK.js";import"./user-DyAFJHPz.js";import"./mail-B4AhJP4n.js";import"./send-eRJySNFp.js";import"./check-C_mJLJYy.js";import"./circle-alert-Dh5lcubO.js";import"./chevron-down-BcQeTISl.js";import"./loader-circle-CKiDMYpX.js";import"./OfferNegotiation-CI0wE_KI.js";import"./arrow-right-Cy1oKzLE.js";import"./handshake-CfEBSfXK.js";import"./circle-check-big-EIhhmbum.js";import"./DealerMapModal-BiHpBNr_.js";import"./ContactDealerModal-BSuC8fSl.js";import"./thumbs-up-B560U_XR.js";import"./message-circle-DJzWW-WZ.js";import"./share-2-B62QB5Df.js";import"./sparkles-DqV0AK-j.js";import"./gauge-Dfv_uedc.js";import"./fuel-BTmZOof6.js";import"./chevron-up-rgAX7Oaq.js";import"./trash-2-bvsfR0-y.js";import"./search-DaEpTlIh.js";import"./minus-enGWx36s.js";import"./Tabs-C8E4pMdQ.js";import"./plus-4DdLsdI9.js";const de={title:"Organisms/Header",component:i,parameters:{layout:"fullscreen",docs:{description:{component:`
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
