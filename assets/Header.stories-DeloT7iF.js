import{j as e}from"./iframe-BibFtYG9.js";import{H as i}from"./Header-By8_XjOn.js";import"./preload-helper-PPVm8Dsz.js";import"./vehicleService-BTivPZrm.js";import"./index-B-JoA3P0.js";import"./useSupabaseRating-qiaDYCoP.js";import"./dealRoutes-XyQ0L3Gs.js";import"./Button-DtDgZ459.js";import"./ExitIntentModal-BHoqUtWl.js";import"./x-CyPIbV8Q.js";import"./createLucideIcon-ioxWBYFV.js";import"./heart-D-tEHh6e.js";import"./trending-down-DSVcFXBv.js";import"./file-text-f-CmBEgt.js";import"./OptimizedImage-CQKzplnE.js";import"./DealerLocatorMap-CklAT9xN.js";import"./star-3Yrr59sC.js";import"./dealerService-CeBNsEgh.js";import"./award-BYDq_QXo.js";import"./chevron-right-DkEEc9eK.js";import"./map-pin-eezYNuho.js";import"./phone-DmupwMqn.js";import"./navigation-BrhhE0Nt.js";import"./dollar-sign-CbV5Urnb.js";import"./clock-iL5bfSvf.js";import"./bookmark--KTpZMlm.js";import"./external-link-BPgFFyLr.js";import"./index.modern-CoRh39u0.js";import"./index-ByI0FdP6.js";import"./index-CSfpo7Ei.js";import"./chevron-left-j50okSWW.js";import"./map-BHiqVqcX.js";import"./MakeOfferModal-JJ3vi913.js";import"./car-BsgA-h2t.js";import"./message-square-B5yfnu04.js";import"./user-lAFcVz8E.js";import"./mail-D8FrfxLu.js";import"./send-Bobwn_R9.js";import"./check-B_ryj_ge.js";import"./circle-alert-BmbS93bg.js";import"./chevron-down-BxfHas7F.js";import"./loader-circle-C8Nn6JZM.js";import"./OfferNegotiation-K_mZuGSJ.js";import"./arrow-right-CKXomER2.js";import"./handshake-oM-uTe6D.js";import"./circle-check-big-CjLyJhSZ.js";import"./DealerMapModal-lt6_M_SI.js";import"./ContactDealerModal-DNSvlgjp.js";import"./thumbs-up-BuJmvUy_.js";import"./message-circle-DvgBs17n.js";import"./share-2-Cj-SFrlN.js";import"./sparkles-BwdHxuC6.js";import"./gauge-B60SLqub.js";import"./fuel-ClgjBdCf.js";import"./chevron-up-aYVXULop.js";import"./trash-2-DLUsYWgP.js";import"./search-CIq8JJVR.js";import"./minus-CPHzGV8O.js";import"./Tabs-EmXKTVK3.js";import"./plus-B3YnCbVy.js";const de={title:"Organisms/Header",component:i,parameters:{layout:"fullscreen",docs:{description:{component:`
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
