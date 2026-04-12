import{j as e}from"./iframe-CrcxWlQM.js";import{H as i}from"./Header-CQqx-0Us.js";import"./preload-helper-PPVm8Dsz.js";import"./vehicleService-CgRIVwGT.js";import"./index-Bk6M7T92.js";import"./useSupabaseRating-DkQpxg2Q.js";import"./dealRoutes-CRJk03s6.js";import"./Button-CuIBtbiA.js";import"./ExitIntentModal-B3d7DYCG.js";import"./x-BW3auqu1.js";import"./createLucideIcon-RwftPUNB.js";import"./heart-CobiqUJM.js";import"./trending-down-CF-AJSuW.js";import"./file-text-DlSc4p9r.js";import"./OptimizedImage-N93LvMSL.js";import"./DealerLocatorMap-AqgtOZey.js";import"./star-FGE8FvV8.js";import"./dealerService-CeBNsEgh.js";import"./award-DPnkDdVY.js";import"./chevron-right-CNrB_akw.js";import"./map-pin-C6iyfcxz.js";import"./phone-BvLCKnYl.js";import"./navigation-BkURwlVl.js";import"./dollar-sign-DrBt82RJ.js";import"./clock-nwYNBjMq.js";import"./bookmark-DRh326G7.js";import"./external-link-WyqPtHnz.js";import"./index.modern-BHNTZO2V.js";import"./index-Bw9QTPjD.js";import"./index-C_8WCCTJ.js";import"./chevron-left-DafdUsg7.js";import"./map-80wWI3ZO.js";import"./MakeOfferModal-CKB2zoDA.js";import"./car-ChKIoXCg.js";import"./message-square-ChI4lpMz.js";import"./user-DQwE9zqm.js";import"./mail-DynaSeYp.js";import"./send-t1GULQje.js";import"./check-BuEFWGkt.js";import"./circle-alert-mlk5ViVf.js";import"./chevron-down-Tem3tWxN.js";import"./loader-circle-Dxsmz7_8.js";import"./OfferNegotiation-Clzzpdf-.js";import"./arrow-right-Bpj1j1RG.js";import"./handshake-DHrSVf95.js";import"./circle-check-big-BSuVGulz.js";import"./DealerMapModal-tuu2Z0E3.js";import"./ContactDealerModal-CmFr3EKJ.js";import"./thumbs-up-C-YB4vLH.js";import"./message-circle-m-FLkGD7.js";import"./share-2-BZ12xFoX.js";import"./sparkles-Ckf6yBvH.js";import"./gauge-Dtbnhcql.js";import"./fuel-Dn_p6Zqp.js";import"./chevron-up-DTgyqV_L.js";import"./trash-2-DHsTpGey.js";import"./search-CmZRo8wX.js";import"./minus-BrgCM8Ue.js";import"./Tabs-BJtIDnIO.js";import"./plus-6klLFRXn.js";const de={title:"Organisms/Header",component:i,parameters:{layout:"fullscreen",docs:{description:{component:`
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
