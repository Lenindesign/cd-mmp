import{j as e}from"./iframe-CU7m6z12.js";import{H as i}from"./Header-u7XakVey.js";import"./preload-helper-PPVm8Dsz.js";import"./vehicleService-BTivPZrm.js";import"./index-B-JoA3P0.js";import"./useSupabaseRating-E8Q5ZC5x.js";import"./dealRoutes-XyQ0L3Gs.js";import"./Button-CrjLkORj.js";import"./ExitIntentModal-BlZizm_5.js";import"./x-DaOldh3U.js";import"./createLucideIcon-jqyGQz_w.js";import"./heart-Cg6dU20k.js";import"./trending-down-B0PqKd6O.js";import"./file-text-FHUR-1LG.js";import"./OptimizedImage-BWLWzb0f.js";import"./DealerLocatorMap-B9f_ZeEx.js";import"./star-9-_bZ_Tw.js";import"./dealerService-CeBNsEgh.js";import"./award-bo2Zfwri.js";import"./chevron-right-DcYuHoth.js";import"./map-pin-CrHWk-r4.js";import"./phone-Cvy28Ccg.js";import"./navigation-AeNTyHeB.js";import"./dollar-sign-J7W44BgF.js";import"./clock-CD2ac2El.js";import"./bookmark-BKbMfOBN.js";import"./external-link-CoB7TXZ3.js";import"./index.modern-D1tRiYHC.js";import"./index-BqzPlvuL.js";import"./index-LeEij8_q.js";import"./chevron-left-BURCKll6.js";import"./map-DEjYJGLQ.js";import"./MakeOfferModal-h1dofygR.js";import"./car-BQ4wMF4-.js";import"./message-square-B2znl8gv.js";import"./user-CEIvwb-d.js";import"./mail-BwtKhBwO.js";import"./send-BfGEkfFw.js";import"./check-DKs1_jhk.js";import"./circle-alert-D08M1LKl.js";import"./chevron-down-CKWmdcjL.js";import"./loader-circle-Cp6wsWbR.js";import"./OfferNegotiation-DmjQ50L6.js";import"./arrow-right-7z4qmE4H.js";import"./handshake-C554s41J.js";import"./circle-check-big-DuCEiFeP.js";import"./DealerMapModal-Idj87L0B.js";import"./ContactDealerModal-_R-3MP3u.js";import"./thumbs-up-CmsJ64qD.js";import"./message-circle-BaJxx4gN.js";import"./share-2-Q2teIzlV.js";import"./sparkles-aOZeaujL.js";import"./gauge-CkujpQj6.js";import"./fuel-DIViBZ9a.js";import"./chevron-up-oB78Ce5K.js";import"./trash-2-C59wGfbJ.js";import"./search-vkigaFB_.js";import"./minus-BMztmBPl.js";import"./Tabs-DD2xT4d3.js";import"./plus-ajbRGsDF.js";const de={title:"Organisms/Header",component:i,parameters:{layout:"fullscreen",docs:{description:{component:`
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
