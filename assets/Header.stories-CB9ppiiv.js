import{j as e}from"./iframe-CHiVVlT1.js";import{H as i}from"./Header-CpS6VBCP.js";import"./preload-helper-PPVm8Dsz.js";import"./vehicleService-BTivPZrm.js";import"./index-B-JoA3P0.js";import"./useSupabaseRating-DXMRoPxG.js";import"./dealRoutes-XyQ0L3Gs.js";import"./Button-PjAy6FqQ.js";import"./ExitIntentModal-CXIeqn-w.js";import"./x-t7DC2SAK.js";import"./createLucideIcon-B_6flx-O.js";import"./heart-Bc9sewlt.js";import"./trending-down-B5glgvyq.js";import"./file-text-qaVEANgt.js";import"./OptimizedImage-BCF02jJl.js";import"./DealerLocatorMap-D00dVqDa.js";import"./star-BSNhDGHS.js";import"./dealerService-CeBNsEgh.js";import"./award-RHhXowJX.js";import"./chevron-right-mn-iAHcN.js";import"./map-pin-b5N9Hvpo.js";import"./phone-Mjj6H0Qc.js";import"./navigation-ByIIyMR4.js";import"./dollar-sign-CPhXUNTr.js";import"./clock-D8Rc5Ybx.js";import"./bookmark-C3UsphU5.js";import"./external-link-Fsh5FdtJ.js";import"./index.modern-HHwj21lb.js";import"./index-DdZTud7n.js";import"./index-BJ085r9h.js";import"./chevron-left-Wc9aE-sR.js";import"./map-C5B8Ad3k.js";import"./MakeOfferModal-DXQ653bz.js";import"./car-xE63Jncf.js";import"./message-square-B725nMEX.js";import"./user-wQf60JqZ.js";import"./mail-Da7j3r7D.js";import"./send-DeLCsX2h.js";import"./check-BL82Adoo.js";import"./circle-alert-DVia7Xmw.js";import"./chevron-down-CylF7U0K.js";import"./loader-circle-BVOCZs11.js";import"./OfferNegotiation-CZF4UAwz.js";import"./arrow-right-jp1eMlsC.js";import"./handshake-DV92v0Uk.js";import"./circle-check-big-51uCtHLg.js";import"./DealerMapModal-CrWSNuqE.js";import"./ContactDealerModal-DDIw3Wwy.js";import"./thumbs-up-BdHw7djc.js";import"./message-circle-DLYIg8Du.js";import"./share-2-Dshr9ODN.js";import"./sparkles-Dxz_de1d.js";import"./gauge-DDdWtgtF.js";import"./fuel-Ci6GOard.js";import"./chevron-up-CFWG9PdW.js";import"./trash-2-2iSAFOB9.js";import"./search-B-RMC5iT.js";import"./minus-Cm3qfDbt.js";import"./Tabs-0Bv1wkZF.js";import"./plus-BkitwZXS.js";const de={title:"Organisms/Header",component:i,parameters:{layout:"fullscreen",docs:{description:{component:`
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
