import{j as e}from"./iframe-C7N1OJq8.js";import{F as r}from"./Footer-B41hDV7I.js";import"./preload-helper-PPVm8Dsz.js";import"./Button-DrlJh5yF.js";import"./createLucideIcon--6ZNE3RS.js";import"./youtube-BKtzFZIn.js";import"./mail-Ddv0slkf.js";const m={title:"Organisms/Footer",component:r,parameters:{layout:"fullscreen",docs:{description:{component:`
# Footer

Global site footer with navigation links, social media, and legal information.

---

## Sections

| Section | Content |
|---------|---------|
| **Brand** | Logo and tagline |
| **Navigation** | Quick links to main sections |
| **Resources** | Help, contact, and support links |
| **Social** | Social media icons and links |
| **Legal** | Copyright, privacy policy, terms |

---

## Responsive Behavior

| Breakpoint | Layout |
|------------|--------|
| Desktop (>768px) | Multi-column grid layout |
| Tablet (768px) | 2-column layout |
| Mobile (<768px) | Single column, stacked |

---

## SEO

Footer links help with internal linking and site navigation for search engines.
        `}}},tags:["autodocs"]},o={parameters:{docs:{description:{story:"Default footer with all sections visible."}}}},t={parameters:{docs:{description:{story:"Footer shown with page content above to demonstrate typical page layout."}}},render:()=>e.jsxs("div",{children:[e.jsxs("div",{style:{padding:"40px",background:"#f5f5f5",minHeight:"300px"},children:[e.jsx("h1",{children:"Page Content"}),e.jsx("p",{children:"Footer appears at the bottom of the page."})]}),e.jsx(r,{})]})},n={parameters:{viewport:{defaultViewport:"mobile"},docs:{description:{story:"Footer at mobile viewport showing stacked layout."}}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: 'Default footer with all sections visible.'
      }
    }
  }
}`,...o.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: 'Footer shown with page content above to demonstrate typical page layout.'
      }
    }
  },
  render: () => <div>
      <div style={{
      padding: '40px',
      background: '#f5f5f5',
      minHeight: '300px'
    }}>
        <h1>Page Content</h1>
        <p>Footer appears at the bottom of the page.</p>
      </div>
      <Footer />
    </div>
}`,...t.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  parameters: {
    viewport: {
      defaultViewport: 'mobile'
    },
    docs: {
      description: {
        story: 'Footer at mobile viewport showing stacked layout.'
      }
    }
  }
}`,...n.parameters?.docs?.source}}};const u=["Default","WithContent","Mobile"];export{o as Default,n as Mobile,t as WithContent,u as __namedExportsOrder,m as default};
