import{j as e}from"./iframe-pkkuEDGS.js";import{H as i}from"./Header-Bgc0hFo8.js";import"./preload-helper-PPVm8Dsz.js";import"./vehicleService-CnHzEnwN.js";import"./index-B-JoA3P0.js";import"./useSupabaseRating-B0AiRn02.js";import"./dealRoutes-XyQ0L3Gs.js";import"./Button-DyMup3ke.js";import"./ExitIntentModal-CcGIY6xO.js";import"./x-C-qMA8Oo.js";import"./createLucideIcon-Co-jks3S.js";import"./heart-DLyTpC_B.js";import"./trending-down-ClKPhFsi.js";import"./file-text-D9NPuxtF.js";import"./OptimizedImage-z7ngFupO.js";import"./DealerLocatorMap-CXKZifP8.js";import"./star-DEP949uo.js";import"./dealerService-CeBNsEgh.js";import"./award-BMbEIGOk.js";import"./chevron-right-JvrfgHGw.js";import"./map-pin-B1YYShYS.js";import"./phone-CfYa73Cz.js";import"./navigation-B1_WMaKC.js";import"./dollar-sign-ibtHhh6S.js";import"./clock-BDpvsxso.js";import"./bookmark-D1yaDl9B.js";import"./external-link-DrXbG_gr.js";import"./index.modern-DvEthU_h.js";import"./index-BDjyXnxy.js";import"./index-Di20Su0c.js";import"./chevron-left-PmLxq8c6.js";import"./map-DE8aUlJ_.js";import"./MakeOfferModal-r8ucrTgI.js";import"./car-rj0XBl01.js";import"./message-square-BsxeSMjh.js";import"./user-D8c93W7i.js";import"./mail-DT2Em73G.js";import"./send-DO87_NuM.js";import"./check-L-B8vcBl.js";import"./circle-alert-Dq8gNaQ6.js";import"./chevron-down-BsK9wnIU.js";import"./loader-circle-rOFumiSo.js";import"./OfferNegotiation-BfU2cfFb.js";import"./arrow-right-Cp8-i0zs.js";import"./handshake-BIHTzDf_.js";import"./circle-check-big-BzEfgcbt.js";import"./DealerMapModal-Cj9ylzoi.js";import"./ContactDealerModal-DdIEaAGJ.js";import"./thumbs-up-B1wRmi7R.js";import"./message-circle-F1iXkBkP.js";import"./share-2-DbGKsMyV.js";import"./sparkles-wBDJ1hkA.js";import"./gauge-CCt3R-Wl.js";import"./fuel-C8xScGfL.js";import"./chevron-up-DPYU--uo.js";import"./trash-2-BfDYiBiW.js";import"./search-BttezyW_.js";import"./minus-OAyGs8be.js";import"./Tabs-CeZf8Gqe.js";import"./plus-BEiRuPA_.js";const de={title:"Organisms/Header",component:i,parameters:{layout:"fullscreen",docs:{description:{component:`
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
