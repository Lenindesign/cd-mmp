import{j as e}from"./iframe-DHVIttNg.js";import{H as i}from"./Header-CuIkOLCd.js";import"./preload-helper-PPVm8Dsz.js";import"./vehicleService-BTivPZrm.js";import"./index-B-JoA3P0.js";import"./useSupabaseRating-Cfb-qorw.js";import"./dealRoutes-XyQ0L3Gs.js";import"./Button-DuF0SUHb.js";import"./ExitIntentModal-jxZZNcIv.js";import"./x-DuSh-QQq.js";import"./createLucideIcon-0zaSyEeQ.js";import"./heart-2nK5e_z8.js";import"./trending-down-CI79AIcY.js";import"./file-text-zPN7g_O3.js";import"./OptimizedImage-BDSClsWR.js";import"./DealerLocatorMap-C6_izizk.js";import"./star-CWEvSALv.js";import"./dealerService-CeBNsEgh.js";import"./award-CP6NK_SL.js";import"./chevron-right-COq_LiHn.js";import"./map-pin-B-zw6DH9.js";import"./phone-CVIfaJ7u.js";import"./navigation-RJVLFlXx.js";import"./dollar-sign-D8CyxSKD.js";import"./clock-BDBFy1uF.js";import"./bookmark-DHuSSi7G.js";import"./external-link-C_ayaTk-.js";import"./index.modern-DPCao31d.js";import"./index-xqRdrMaq.js";import"./index-DvuVPoyD.js";import"./chevron-left-W-X5Q6oi.js";import"./map-TmxyE2M6.js";import"./MakeOfferModal-IzddeAz1.js";import"./car-DznetUZ5.js";import"./message-square-DcufzF0b.js";import"./user-N332l6zB.js";import"./mail-ChS1bGrH.js";import"./send-DjEDrQej.js";import"./check-DHCMx1GW.js";import"./circle-alert-7Zf_Sv6E.js";import"./chevron-down-CcQHKIR_.js";import"./loader-circle-S0T7AWaP.js";import"./OfferNegotiation-f1jO8gMJ.js";import"./arrow-right-BOi3cUft.js";import"./handshake-BV82jEwH.js";import"./circle-check-big-qgwpsPl8.js";import"./DealerMapModal-Vh9VHdj7.js";import"./ContactDealerModal-BKBy8zmW.js";import"./thumbs-up-CnjLp38g.js";import"./message-circle-CKOYR_Ik.js";import"./share-2-CF92O1dl.js";import"./sparkles-CHJxLtiV.js";import"./gauge-BWiOxZWV.js";import"./fuel-BpKs_jh8.js";import"./chevron-up-DZytmFlA.js";import"./trash-2-D9C91ret.js";import"./search-BgziSIxs.js";import"./minus-svPbNcat.js";import"./Tabs-DIMU-YJ5.js";import"./plus-CALs0wK9.js";const de={title:"Organisms/Header",component:i,parameters:{layout:"fullscreen",docs:{description:{component:`
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
