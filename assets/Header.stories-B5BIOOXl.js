import{j as e}from"./iframe-wL-Gh_lI.js";import{H as i}from"./Header-C6utkf-M.js";import"./preload-helper-PPVm8Dsz.js";import"./vehicleService-ByoDejvg.js";import"./index-Dto8T7jp.js";import"./useSupabaseRating-BBrEo1Oo.js";import"./Button-Bn4n-tgL.js";import"./ExitIntentModal-DvAmp1bc.js";import"./x-BNM8dZcC.js";import"./createLucideIcon-BM6HEHbo.js";import"./heart-woF093et.js";import"./trending-down-DrljGibA.js";import"./file-text-Bm55wA_F.js";import"./OptimizedImage-BNHyixww.js";import"./DealerLocatorMap-Dhyp63mY.js";import"./star-DAEi21Su.js";import"./dealerService-CeBNsEgh.js";import"./award-swcJhvyE.js";import"./chevron-right-Dd1F9x_Z.js";import"./map-pin-tjwzzARX.js";import"./phone-C29R03QS.js";import"./navigation-DXd-c70W.js";import"./dollar-sign-CQGS4PYm.js";import"./clock-OdAvawfU.js";import"./bookmark-SGBG7K6N.js";import"./external-link-CyAR8-lI.js";import"./index.modern-KX4cgcq_.js";import"./index-Dnyf8uxv.js";import"./index-CXbN0Mqa.js";import"./chevron-left-DhKq-t6X.js";import"./map-Con_yguA.js";import"./MakeOfferModal-CngYAlJB.js";import"./car-DMDWtFjs.js";import"./message-square-BNqMHD-G.js";import"./user-DiEqQt-K.js";import"./mail-py9sJUih.js";import"./circle-check-big-D5ktExk4.js";import"./send-D9npyuh1.js";import"./chevron-down-w92kFjxm.js";import"./loader-circle-DewaBrnv.js";import"./OfferNegotiation-C51i3jT-.js";import"./arrow-right-KnOXQ0MN.js";import"./handshake-DVTW6_qg.js";import"./DealerMapModal-CzPzDLfj.js";import"./ContactDealerModal-CD_1HxJg.js";import"./thumbs-up-BYTIyovu.js";import"./message-circle-C-MKWK_v.js";import"./share-2-TQ2-kEg-.js";import"./sparkles-BgO_fXhF.js";import"./gauge-JN_UNCSY.js";import"./fuel-vZNK5RGF.js";import"./check-CYiZRw0k.js";import"./minus-Bpr9VqE1.js";import"./trash-2-Dq_V4Bdr.js";import"./search-D0ejtg1t.js";import"./plus-DBbwQGec.js";const se={title:"Organisms/Header",component:i,parameters:{layout:"fullscreen",docs:{description:{component:`
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
}`,...r.parameters?.docs?.source}}};const pe=["Default","WithContent","Mobile"];export{t as Default,r as Mobile,o as WithContent,pe as __namedExportsOrder,se as default};
