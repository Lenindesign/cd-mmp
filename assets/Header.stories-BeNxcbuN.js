import{j as e}from"./iframe-CKsQctQx.js";import{H as i}from"./Header-EuwFi-4v.js";import"./preload-helper-PPVm8Dsz.js";import"./vehicleService-BAIAK0V_.js";import"./index-BFhOOLG3.js";import"./useSupabaseRating-DS2Hp4dP.js";import"./Button-DlHvl3rH.js";import"./ExitIntentModal-B1OseY-W.js";import"./x-CibpQTRt.js";import"./createLucideIcon-C5-Y_QxJ.js";import"./heart-eJvT27Yf.js";import"./trending-down-BfD22afA.js";import"./file-text-L1x1Dp2G.js";import"./OptimizedImage-CkT0yjNr.js";import"./DealerLocatorMap-Ds5agjQx.js";import"./star-ChSzShcd.js";import"./dealerService-CeBNsEgh.js";import"./award-ahrPBgoz.js";import"./chevron-right-BzVdfDOB.js";import"./map-pin-CszRjMWG.js";import"./phone-DC8Bckuk.js";import"./navigation-C_NCcFhI.js";import"./dollar-sign-DrdW2H88.js";import"./clock-DTJlYPPK.js";import"./bookmark-C1svWreW.js";import"./external-link-DaW_EokR.js";import"./index.modern-Db1n-Td2.js";import"./index-x0TSlRzf.js";import"./index-KnQA-eQM.js";import"./chevron-left-Dv_hYQSU.js";import"./map-DP3Jt5UQ.js";import"./MakeOfferModal-o1yTcBcH.js";import"./car-3iz_lJAi.js";import"./message-square-906FnT7s.js";import"./user-C-vKwotZ.js";import"./mail-m2lJuNeG.js";import"./circle-check-big-DrRtDf5w.js";import"./send-DNO1N--D.js";import"./chevron-down-D-ktbDbb.js";import"./loader-circle-CS-zBq86.js";import"./OfferNegotiation-BpLzayvQ.js";import"./arrow-right-D69eNN9V.js";import"./handshake-BFGbZWW8.js";import"./DealerMapModal-eyG0XlkS.js";import"./gauge-DjAQ57Da.js";import"./fuel-BG7H4LPw.js";import"./check-CsCqR_jm.js";import"./minus-30C10kX6.js";import"./trash-2-C6L-CXVW.js";import"./search-Q9-rf5rD.js";import"./plus-C4Y4CU2Z.js";const oe={title:"Organisms/Header",component:i,parameters:{layout:"fullscreen",docs:{description:{component:`
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
}`,...r.parameters?.docs?.source}}};const re=["Default","WithContent","Mobile"];export{t as Default,r as Mobile,o as WithContent,re as __namedExportsOrder,oe as default};
