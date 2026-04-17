import{j as e}from"./iframe-COibcTgg.js";import{H as i}from"./Header-DlN3gIpA.js";import"./preload-helper-PPVm8Dsz.js";import"./vehicleService-BTivPZrm.js";import"./index-B-JoA3P0.js";import"./useSupabaseRating-DZ1xQIFo.js";import"./dealRoutes-XyQ0L3Gs.js";import"./Button-BynGalmT.js";import"./ExitIntentModal-DFvd1yDp.js";import"./x-Dzakum3P.js";import"./createLucideIcon-BdCZEPcX.js";import"./heart-bzZ1xzGn.js";import"./trending-down-Dbel-CaW.js";import"./file-text-C_Nmkv7M.js";import"./OptimizedImage-DaLMPuGh.js";import"./DealerLocatorMap-X7p4Z8QK.js";import"./star-DpoaFq75.js";import"./dealerService-CeBNsEgh.js";import"./award-B5h8WyKr.js";import"./chevron-right-DrnQtORR.js";import"./map-pin-hW4zEKst.js";import"./phone-CuvdZf1o.js";import"./navigation-Cp0k_Gm-.js";import"./dollar-sign-C9LOdEsz.js";import"./clock-Bj5nWriC.js";import"./bookmark-D8MDi9ez.js";import"./external-link-YbsSTomO.js";import"./index.modern-EknRbsZP.js";import"./index-CqyW4ch6.js";import"./index-Dn5g4SgR.js";import"./chevron-left-CCUolXsf.js";import"./map-D19GvErN.js";import"./MakeOfferModal-DO1lgzEr.js";import"./car-Ta8xnT9T.js";import"./message-square-BU9iaqp6.js";import"./user-CsnYXWn8.js";import"./mail-CCXFByYV.js";import"./send-By3MOlUF.js";import"./check-MsoCLddh.js";import"./circle-alert-BwLV9U1z.js";import"./chevron-down-LI7hQqjz.js";import"./loader-circle-DTgS0J4P.js";import"./OfferNegotiation-BW_xEu4M.js";import"./arrow-right-BR3vtVYO.js";import"./handshake-BibRGU-C.js";import"./circle-check-big-DuxnqTC6.js";import"./DealerMapModal-Bd9hIBFJ.js";import"./ContactDealerModal-DzT18SoX.js";import"./thumbs-up-BQkuufYw.js";import"./message-circle-DNGkIeD0.js";import"./share-2-DXdl3akT.js";import"./sparkles-C-OOg7QX.js";import"./gauge-XM6UJjxN.js";import"./fuel-9oyoS1uG.js";import"./chevron-up-Eybhq9j-.js";import"./trash-2-DtAkFKkk.js";import"./search-C9eL0l1M.js";import"./minus-CwxNPVeh.js";import"./Tabs-BF0nGXpy.js";import"./plus-Cb46C7Ep.js";const de={title:"Organisms/Header",component:i,parameters:{layout:"fullscreen",docs:{description:{component:`
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
