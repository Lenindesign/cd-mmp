import{j as e}from"./iframe-CeifGawL.js";import{H as i}from"./Header-D0VvDSMu.js";import"./preload-helper-PPVm8Dsz.js";import"./vehicleService-CnHzEnwN.js";import"./index-B-JoA3P0.js";import"./useSupabaseRating-BGVpj-zZ.js";import"./dealRoutes-XyQ0L3Gs.js";import"./Button-DL-S-zc2.js";import"./ExitIntentModal-ymqxir4H.js";import"./x-pSyQSlsm.js";import"./createLucideIcon-BWALLB-V.js";import"./heart-PJ8B0m3z.js";import"./trending-down-Bg0vGPRf.js";import"./file-text-BrgoaB_H.js";import"./OptimizedImage-BW0kILRt.js";import"./DealerLocatorMap-9s-pNWO5.js";import"./star-C3nnezZt.js";import"./dealerService-CeBNsEgh.js";import"./award-DrSAaQ5o.js";import"./chevron-right-DKkFpvNU.js";import"./map-pin-1VkkWbjT.js";import"./phone-V4d3pcxl.js";import"./navigation-BZyNYNhe.js";import"./dollar-sign-ChsDbiL3.js";import"./clock-BbjfrrzH.js";import"./bookmark-ODetyVJW.js";import"./external-link-D2KA6VqY.js";import"./index.modern-CVqqCo2l.js";import"./index-DqnHzmM5.js";import"./index-D9E3MDa0.js";import"./chevron-left-yCxsIn42.js";import"./map-DCd9ocIe.js";import"./MakeOfferModal-DMKJQJ0r.js";import"./car-CZNwYBYP.js";import"./message-square-BjJGVe6k.js";import"./user-Ce4d4NSG.js";import"./mail-CDwKucIl.js";import"./send-DBNTJTsA.js";import"./check-CS0FcMVY.js";import"./circle-alert-LD-ODNFh.js";import"./chevron-down-B5mNXY6N.js";import"./loader-circle-C8M__ehv.js";import"./OfferNegotiation-BrWeGDwQ.js";import"./arrow-right-DxM3uxaB.js";import"./handshake-BOV2ukoe.js";import"./circle-check-big-CA7BSMOd.js";import"./DealerMapModal--NihyHse.js";import"./ContactDealerModal-BOOkvaaw.js";import"./thumbs-up-B3xqHsgM.js";import"./message-circle-CDyHhiRE.js";import"./share-2-B_tDQ4vR.js";import"./sparkles-CVWtp93f.js";import"./gauge-Cqmg3brt.js";import"./fuel-BVjPloN4.js";import"./chevron-up-DU015kpw.js";import"./trash-2-Cii4E1z1.js";import"./search-DjO1PY3_.js";import"./minus-nm-hGtxj.js";import"./Tabs-2aVgHKOP.js";import"./plus-f6it9SUV.js";const de={title:"Organisms/Header",component:i,parameters:{layout:"fullscreen",docs:{description:{component:`
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
