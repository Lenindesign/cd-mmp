import{j as e}from"./iframe-WkvYeMlb.js";import{H as i}from"./Header-BHB-pD9V.js";import"./preload-helper-PPVm8Dsz.js";import"./vehicleService-ByoDejvg.js";import"./index-Dto8T7jp.js";import"./useSupabaseRating-DHh6THAx.js";import"./Button-rLyju16z.js";import"./ExitIntentModal-Ceu9A896.js";import"./x-CPinPoAS.js";import"./createLucideIcon-CcdqW5Dm.js";import"./heart-CPNFAPZB.js";import"./trending-down-DPsZLTs-.js";import"./file-text-C1Suk0qd.js";import"./OptimizedImage-DbxPb3A3.js";import"./DealerLocatorMap-C1fpXcoZ.js";import"./star-Cy8JuTyZ.js";import"./dealerService-CeBNsEgh.js";import"./award-CJxMAxBy.js";import"./chevron-right-CGAkb3ZD.js";import"./map-pin-KCGTKnGT.js";import"./phone-CYz5G9V0.js";import"./navigation-Cv44KgYs.js";import"./dollar-sign-BR1cGM-9.js";import"./clock-DSzmGvP-.js";import"./bookmark-C8JkXLsM.js";import"./external-link-Dsi7TsvN.js";import"./index.modern-BFTbpouI.js";import"./index-B3WTv5wq.js";import"./index-DES3dAGT.js";import"./chevron-left-DtaHYHCp.js";import"./map-5_SNmBDg.js";import"./MakeOfferModal-BCID5Xz6.js";import"./car-Dhxy__o-.js";import"./message-square-El0TKP9m.js";import"./user-CxBJHowx.js";import"./mail-DQHK6F_U.js";import"./circle-check-big-D4J17Zzl.js";import"./send-BMH_vJPC.js";import"./chevron-down-1d5Ns5HV.js";import"./loader-circle-DQ0eu2_2.js";import"./OfferNegotiation-DJSw_F3L.js";import"./arrow-right-DnezYU9r.js";import"./handshake-B72JaxC_.js";import"./DealerMapModal-DcrgP__B.js";import"./gauge-CIC5Yb-r.js";import"./fuel-CIBXe_-9.js";import"./check-CeuIBgHE.js";import"./minus-jW3itp3r.js";import"./trash-2-CzkUHCsF.js";import"./search-CvpONfGu.js";import"./plus-D3fVx4Os.js";import"./sparkles-B5WVBBP9.js";const re={title:"Organisms/Header",component:i,parameters:{layout:"fullscreen",docs:{description:{component:`
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
