import{j as e}from"./iframe-C6gvXlzd.js";import{H as i}from"./Header-D520dMMz.js";import"./preload-helper-PPVm8Dsz.js";import"./vehicleService-CnHzEnwN.js";import"./index-B-JoA3P0.js";import"./useSupabaseRating-Be4DN48p.js";import"./dealRoutes-XyQ0L3Gs.js";import"./Button-CYPem8iR.js";import"./ExitIntentModal-C9d_bDAC.js";import"./x-BJp8QLG2.js";import"./createLucideIcon-l6L6bb7O.js";import"./heart-BDAxhUHC.js";import"./trending-down-CCJTOZ2f.js";import"./file-text-BUITSWu3.js";import"./OptimizedImage-CQqdRHhZ.js";import"./DealerLocatorMap-Dm9t80mh.js";import"./star-BzUkvl93.js";import"./dealerService-CeBNsEgh.js";import"./award-D4UpT8N-.js";import"./chevron-right-3wFOewNe.js";import"./map-pin-CvKR18ka.js";import"./phone-B8fjrGir.js";import"./navigation-B5o28ZBW.js";import"./dollar-sign-DZfU0HsG.js";import"./clock-YjJQpN4i.js";import"./bookmark-DDFz1CJO.js";import"./external-link-D4yVWpju.js";import"./index.modern-B8-za3pu.js";import"./index-BdqpdZMc.js";import"./index-Ditto3Ng.js";import"./chevron-left-DOAeERcS.js";import"./map-BzHcQlqQ.js";import"./MakeOfferModal-CEDGn8yl.js";import"./car-Bef5G5wg.js";import"./message-square-CxBikFH8.js";import"./user-Bq2mav25.js";import"./mail-Xdr3gx7n.js";import"./send-BERIqiJb.js";import"./check-CuA6DWfO.js";import"./circle-alert-Coz_E1eP.js";import"./chevron-down-B0Lnflhw.js";import"./loader-circle-GhMsvEDS.js";import"./OfferNegotiation-DZ7OI3ts.js";import"./arrow-right-B9-ob13F.js";import"./handshake-CQPGJAvS.js";import"./circle-check-big-CLENXk0S.js";import"./DealerMapModal-D_JwfTXb.js";import"./ContactDealerModal-CRsiXb9T.js";import"./thumbs-up-DSomyVIe.js";import"./message-circle-BtS3X41J.js";import"./share-2-CSPpoTfW.js";import"./sparkles-CSCyNgVa.js";import"./gauge-CLFLo8_k.js";import"./fuel-r8fzGwLc.js";import"./chevron-up-dAByXJxA.js";import"./trash-2-CIAS90P8.js";import"./search-DuReQXeK.js";import"./minus-DUuRRRCJ.js";import"./Tabs-D9bj0OBn.js";import"./plus-CbpkqEua.js";const de={title:"Organisms/Header",component:i,parameters:{layout:"fullscreen",docs:{description:{component:`
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
