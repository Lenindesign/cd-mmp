import{j as e}from"./iframe-9uEiI4GY.js";import{H as i}from"./Header-B9TfXyuv.js";import"./preload-helper-PPVm8Dsz.js";import"./vehicleService-hRlSJfPL.js";import"./index-BirN2__4.js";import"./useSupabaseRating-BmA8nyos.js";import"./Button-Ds6xjkQZ.js";import"./ExitIntentModal-CJfokojI.js";import"./x-nvc7bQkF.js";import"./createLucideIcon-1G4NO2o6.js";import"./heart-C3iWENSU.js";import"./trending-down-DFCBEKnR.js";import"./file-text-COuY5xtF.js";import"./OptimizedImage-Bby6MBQI.js";import"./DealerLocatorMap-BHfo6XtE.js";import"./star-C0XdhcNG.js";import"./dealerService-CeBNsEgh.js";import"./award-2Q5Tz88a.js";import"./chevron-right-BZsS9G48.js";import"./map-pin-C5Xlswhk.js";import"./phone-C2u2oT7O.js";import"./navigation-Bj3EwIYv.js";import"./dollar-sign-Bd3o6GyY.js";import"./clock-D8zduAN0.js";import"./bookmark-Fv1IOo70.js";import"./external-link-CQvtFbxJ.js";import"./index.modern-DZwKxc0j.js";import"./index-BiuWZ_4T.js";import"./index-BKT_UXt9.js";import"./chevron-left-DIomtwq2.js";import"./map-RATRLIOw.js";import"./MakeOfferModal-B7i2QYLk.js";import"./car-UhrOH5fw.js";import"./message-square-CxjMeWvN.js";import"./user-CdPzJ8Yl.js";import"./mail-Coyo9-qq.js";import"./circle-check-big-CnZfWHY0.js";import"./send-BPDWetll.js";import"./chevron-down-BvrxTHoI.js";import"./loader-circle-XgFkz2dx.js";import"./OfferNegotiation-DZkFHfis.js";import"./arrow-right-CZpxUQIM.js";import"./handshake-D6U5dsrf.js";import"./DealerMapModal-CLHEqkWL.js";import"./ContactDealerModal-2iOPy67M.js";import"./thumbs-up-CWwh27a6.js";import"./message-circle-9spWq0xj.js";import"./share-2-D5RXw_N1.js";import"./sparkles-D5fdDa43.js";import"./gauge-CkhK2fDG.js";import"./fuel-6PFB3Q7U.js";import"./chevron-up-DOlIMCP7.js";import"./trash-2-DVPcj6Kp.js";import"./search-BpEEcu5M.js";import"./check-Cn8STjKJ.js";import"./minus-D0a8oCIg.js";import"./plus-DWUrT1sB.js";const pe={title:"Organisms/Header",component:i,parameters:{layout:"fullscreen",docs:{description:{component:`
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
}`,...r.parameters?.docs?.source}}};const me=["Default","WithContent","Mobile"];export{t as Default,r as Mobile,o as WithContent,me as __namedExportsOrder,pe as default};
