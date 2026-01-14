import{j as e}from"./iframe-Czm1zzEO.js";import{H as i}from"./Header-CkytqrvF.js";import"./preload-helper-PPVm8Dsz.js";import"./vehicleService-ByoDejvg.js";import"./index-Dto8T7jp.js";import"./useSupabaseRating-Czv76VLK.js";import"./Button-CG2lCmp6.js";import"./ExitIntentModal-w-V76Xne.js";import"./x-C22rcdEY.js";import"./createLucideIcon-BrInSKTs.js";import"./heart-Ci-ToD43.js";import"./trending-down-BUNorJN0.js";import"./file-text-C8BjWW40.js";import"./OptimizedImage-D_iPp3Yr.js";import"./DealerLocatorMap-DDgWHG-J.js";import"./star-Dbfywi0s.js";import"./dealerService-CeBNsEgh.js";import"./award-CK1imUFb.js";import"./chevron-right-DMpxjjx9.js";import"./map-pin-BuAqc32t.js";import"./phone-CZ2L00h-.js";import"./navigation-B8Y4tcld.js";import"./dollar-sign-xvMcuPVr.js";import"./clock-CsWUsw2i.js";import"./bookmark-Bqg0uckR.js";import"./external-link-D5OEZI3a.js";import"./index.modern-2m_7PMqA.js";import"./index-DmamibW3.js";import"./index-t2X2mz4U.js";import"./chevron-left-BjTCiFXZ.js";import"./map-CKKHqQrW.js";import"./MakeOfferModal-DX7z6juE.js";import"./car-BhCxMO9-.js";import"./message-square-CQMcRGvh.js";import"./user-DlgJ09G5.js";import"./mail-C2yeWaoX.js";import"./circle-check-big-ZaJaiOj4.js";import"./send-CurQO4EU.js";import"./chevron-down-CodePx0H.js";import"./loader-circle-oTahN3ak.js";import"./OfferNegotiation-C4iZn6nH.js";import"./arrow-right-BLJ7SRwa.js";import"./handshake-BZ1wvu1U.js";import"./DealerMapModal-lXKSqjt9.js";import"./gauge-Grypwz6T.js";import"./fuel-D6XJwNsL.js";import"./check-s_kxk9SN.js";import"./minus-SnY0nvNA.js";import"./trash-2-e5lI-vHd.js";import"./search-C9hMyzIC.js";import"./plus-HBmg7H8J.js";import"./sparkles-Bpo0XP1Y.js";const re={title:"Organisms/Header",component:i,parameters:{layout:"fullscreen",docs:{description:{component:`
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
}`,...r.parameters?.docs?.source}}};const ie=["Default","WithContent","Mobile"];export{t as Default,r as Mobile,o as WithContent,ie as __namedExportsOrder,re as default};
