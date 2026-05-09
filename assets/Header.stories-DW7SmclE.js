import{j as e}from"./iframe-Cw4AF5Y9.js";import{H as i}from"./Header-AxWuXg3e.js";import"./preload-helper-PPVm8Dsz.js";import"./vehicleService-CnHzEnwN.js";import"./index-B-JoA3P0.js";import"./useSupabaseRating-BcvocF10.js";import"./dealRoutes-XyQ0L3Gs.js";import"./Button-CL98aaDE.js";import"./ExitIntentModal-BCaFiRGb.js";import"./x-JEX8Kz1e.js";import"./createLucideIcon-C8HqVzo6.js";import"./heart-DYRWQGTg.js";import"./trending-down-DQN1-Vjs.js";import"./file-text-C9S3NjJf.js";import"./OptimizedImage-B5ZxqkgI.js";import"./DealerLocatorMap-DxO5-I28.js";import"./star-meMU7r47.js";import"./dealerService-CeBNsEgh.js";import"./award-zmNswzGP.js";import"./chevron-right-CGUlGnar.js";import"./map-pin-DnHyN464.js";import"./phone-BbWukdbv.js";import"./navigation-CTmRpbfy.js";import"./dollar-sign-Cg9ZGfMd.js";import"./clock-CDbWvdgh.js";import"./bookmark-pGr0a3ff.js";import"./external-link-Cle74Iu3.js";import"./index.modern-Dnx_1U6p.js";import"./index-B0hew1GO.js";import"./index-DdsIDMkt.js";import"./chevron-left-Cm_iQOSG.js";import"./map-DyjrDgIE.js";import"./MakeOfferModal-DRAUJmyS.js";import"./car-Chpc-ynP.js";import"./message-square-C4ZOXctR.js";import"./user-VNJVqnCw.js";import"./mail-BNgiprRv.js";import"./send-JSozEhup.js";import"./check-HMghiiZg.js";import"./circle-alert-BXVli3aM.js";import"./chevron-down-DsHTLpxJ.js";import"./loader-circle-bUREGS-f.js";import"./OfferNegotiation-DgCOl0nQ.js";import"./arrow-right-Cq5IVpt4.js";import"./handshake-x7tBOx5i.js";import"./circle-check-big-BFHL5hno.js";import"./DealerMapModal-CH_CFxPP.js";import"./ContactDealerModal-C3QVgdZF.js";import"./thumbs-up-YmMI3uoe.js";import"./message-circle-B80tKS5_.js";import"./share-2-r-3tFfIy.js";import"./sparkles-Dy_ZtNs2.js";import"./gauge-P1ZgKFfc.js";import"./fuel-MKeUtMtq.js";import"./chevron-up-CEhBocOX.js";import"./trash-2-C0K3ZPfR.js";import"./search-Doge-c5b.js";import"./minus-qq3Q_4MR.js";import"./Tabs-CKE8Y28P.js";import"./plus-C9P-iuf4.js";const de={title:"Organisms/Header",component:i,parameters:{layout:"fullscreen",docs:{description:{component:`
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
