import{j as e}from"./iframe-Ci6wbiTG.js";import{H as i}from"./Header-BsQJeWrB.js";import"./preload-helper-PPVm8Dsz.js";import"./vehicleService-BTivPZrm.js";import"./index-B-JoA3P0.js";import"./useSupabaseRating-DUqeFOg3.js";import"./dealRoutes-XyQ0L3Gs.js";import"./Button-BC-AsFaO.js";import"./ExitIntentModal-CWreWuR0.js";import"./x-DObWWbgy.js";import"./createLucideIcon-BJ2E_5fN.js";import"./heart-Ce9BFTCk.js";import"./trending-down-CXsDUW7V.js";import"./file-text-C3tMViGw.js";import"./OptimizedImage-DEVxwx5z.js";import"./DealerLocatorMap-D-1YwYDO.js";import"./star-DjZm-ku_.js";import"./dealerService-CeBNsEgh.js";import"./award-DrYrWoHG.js";import"./chevron-right-MIa0lits.js";import"./map-pin-B6P2cgoe.js";import"./phone-DsmB4e8Z.js";import"./navigation-_m1BvRm8.js";import"./dollar-sign-Cim8XGiV.js";import"./clock-C-VmNOfU.js";import"./bookmark-Bw2eksbn.js";import"./external-link-CjhneRC3.js";import"./index.modern-OwqbqaTR.js";import"./index-BWDPVmKG.js";import"./index-DrVGwrTs.js";import"./chevron-left-BwI_5-Mu.js";import"./map-Cz6ztM-p.js";import"./MakeOfferModal-C0N_Tt30.js";import"./car-CR8C1ZuD.js";import"./message-square-DaZI1Opc.js";import"./user-Cv4XDE6U.js";import"./mail-RZmzaDMN.js";import"./send-BVb6tcGz.js";import"./check-DbkXpgza.js";import"./circle-alert-8qbV7J9q.js";import"./chevron-down-CqCQbteK.js";import"./loader-circle-CBB2Ppln.js";import"./OfferNegotiation-CcWMdg-c.js";import"./arrow-right-sNOIcoKN.js";import"./handshake-WrxQOtKI.js";import"./circle-check-big-lNChq8zW.js";import"./DealerMapModal-C5GSEx2E.js";import"./ContactDealerModal-CnDEcKWy.js";import"./thumbs-up-NmoO0qe2.js";import"./message-circle-BP2mp7aC.js";import"./share-2-BNdrK6mb.js";import"./sparkles-C2SWGA0V.js";import"./gauge-C2pOwmhl.js";import"./fuel-Dx1UxDPi.js";import"./chevron-up-BuCSLRRj.js";import"./trash-2-_VVDTjTG.js";import"./search-COVLys38.js";import"./minus-CqqTJGe8.js";import"./Tabs-B9VCsIkk.js";import"./plus-DG7FWQk9.js";const de={title:"Organisms/Header",component:i,parameters:{layout:"fullscreen",docs:{description:{component:`
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
