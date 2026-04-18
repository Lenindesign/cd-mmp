import{j as e}from"./iframe-D7JhMSnj.js";import{H as i}from"./Header-BGWSoTAM.js";import"./preload-helper-PPVm8Dsz.js";import"./vehicleService-BTivPZrm.js";import"./index-B-JoA3P0.js";import"./useSupabaseRating-DJwJ2zmV.js";import"./dealRoutes-XyQ0L3Gs.js";import"./Button-BgcxwTFZ.js";import"./ExitIntentModal-Bg-ZgxOg.js";import"./x-Dfl8Djd3.js";import"./createLucideIcon-CKJmH7vD.js";import"./heart-0ic2xqmf.js";import"./trending-down-C0HTQAOB.js";import"./file-text-CArCsd78.js";import"./OptimizedImage-CQiroX4b.js";import"./DealerLocatorMap-CgOPxg-Z.js";import"./star-l6XNkxVv.js";import"./dealerService-CeBNsEgh.js";import"./award-Djykxbg0.js";import"./chevron-right-pMmqbTW9.js";import"./map-pin-CpAldNDp.js";import"./phone-mwQcpKMf.js";import"./navigation-DTq3C3LI.js";import"./dollar-sign-CHdTZK0n.js";import"./clock-Bn9hXswF.js";import"./bookmark-ClNJn61V.js";import"./external-link-Dd4n4EV-.js";import"./index.modern-kaRwW0gS.js";import"./index-CHrpHZIR.js";import"./index-CenyI5kg.js";import"./chevron-left-DDa_bVwY.js";import"./map-Dvy59OCc.js";import"./MakeOfferModal-BBWWRTBL.js";import"./car-Bg-g3wrG.js";import"./message-square-Cbu-0-RD.js";import"./user-lEqZVktM.js";import"./mail-BmL2FIye.js";import"./send-CDCFAssg.js";import"./check-Cp_fCE6x.js";import"./circle-alert-C9-FGda_.js";import"./chevron-down-BNli03oF.js";import"./loader-circle-BXD4yeJO.js";import"./OfferNegotiation-DMSZoPX3.js";import"./arrow-right-Dou-0BKu.js";import"./handshake-DbGPpBW_.js";import"./circle-check-big-B_HeBszY.js";import"./DealerMapModal-Ca2CVtOn.js";import"./ContactDealerModal-BasA1fd1.js";import"./thumbs-up-BCMqsROq.js";import"./message-circle-DJ0t1aoj.js";import"./share-2-CfJb52Vc.js";import"./sparkles-Bo-QHZNs.js";import"./gauge-B6kIQ_iz.js";import"./fuel-BL5EEzhJ.js";import"./chevron-up-Dsm2zNrH.js";import"./trash-2-8DKBT1B9.js";import"./search-C1p5uJ8Q.js";import"./minus-D37Slh2F.js";import"./Tabs-TE2gdP-1.js";import"./plus-BMPprAV_.js";const de={title:"Organisms/Header",component:i,parameters:{layout:"fullscreen",docs:{description:{component:`
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
