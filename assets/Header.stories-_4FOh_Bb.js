import{j as e}from"./iframe-vJ_sfDhV.js";import{H as i}from"./Header-CQaDsNSq.js";import"./preload-helper-PPVm8Dsz.js";import"./vehicleService-DcljwXyi.js";import"./index-Dto8T7jp.js";import"./useSupabaseRating-72hH0f9d.js";import"./Button-Cjs8KrhC.js";import"./ExitIntentModal-DWJK2X67.js";import"./x-Dx60z1zt.js";import"./createLucideIcon-D8fkZT5N.js";import"./heart-ogG0_aNh.js";import"./trending-down-BsFcgPUV.js";import"./file-text-DVxc0bLj.js";import"./OptimizedImage-XsXRfwD-.js";import"./DealerLocatorMap-Bd9F8ghl.js";import"./star-Do-qmndQ.js";import"./dealerService-CeBNsEgh.js";import"./award-DIjIwHtm.js";import"./chevron-right-GBU1oyJP.js";import"./map-pin-EK0BS0j1.js";import"./phone-D9uw0eAA.js";import"./navigation-BsRrXJzb.js";import"./dollar-sign-dsYeAGVd.js";import"./clock-DZ0YYnBY.js";import"./bookmark-7pE07KL2.js";import"./external-link-DTFsGK7V.js";import"./index.modern-DZ6HGqJ7.js";import"./index-BpdErWxw.js";import"./index-6nA3BpcG.js";import"./chevron-left-DmoSO8kc.js";import"./map-DJXgilUf.js";import"./MakeOfferModal-DIGSlJtX.js";import"./car-dyDMWJAA.js";import"./message-square-CQ3Xqxgk.js";import"./user-B2D89mjC.js";import"./mail-5ds5hSoQ.js";import"./circle-check-big-C-i-Y3kE.js";import"./send-DhmvX-1l.js";import"./chevron-down-DoztIhQx.js";import"./loader-circle-BAlFzkwj.js";import"./OfferNegotiation-mvMdG3hQ.js";import"./arrow-right-DSF3zOd2.js";import"./handshake-D1P2MTuG.js";import"./DealerMapModal-W8cjZ9Sw.js";import"./ContactDealerModal-C_wD-HE5.js";import"./thumbs-up-BeGeU4JZ.js";import"./message-circle-B6tHiP3T.js";import"./share-2-PGjwqqER.js";import"./sparkles-rEFTwNaa.js";import"./gauge-CzNGEYY2.js";import"./fuel-CcBbTeJs.js";import"./chevron-up-DShx35Cw.js";import"./trash-2-D_GVL2gY.js";import"./search-B6v6T1I_.js";import"./check-Ya3bwN82.js";import"./minus-CvVVggYu.js";import"./plus-63bbqpKL.js";const pe={title:"Organisms/Header",component:i,parameters:{layout:"fullscreen",docs:{description:{component:`
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
}`,...r.parameters?.docs?.source}}};const me=["Default","WithContent","Mobile"];export{t as Default,r as Mobile,o as WithContent,me as __namedExportsOrder,pe as default};
