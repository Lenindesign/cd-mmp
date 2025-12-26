import{j as e}from"./iframe-40V3jQdk.js";import"./preload-helper-PPVm8Dsz.js";const o=[{name:"Small",variable:"--shadow-sm",value:"0 1px 2px rgba(0, 0, 0, 0.05)",description:"Subtle elevation for cards, list items, and light hover states"},{name:"Medium",variable:"--shadow-md",value:"0 3px 6px rgba(0, 0, 0, 0.08)",description:"Default shadow for cards, dropdowns, and interactive elements"},{name:"Large",variable:"--shadow-lg",value:"0 8px 24px rgba(0, 0, 0, 0.12)",description:"Modals, popovers, and floating elements"},{name:"Extra Large",variable:"--shadow-xl",value:"0 16px 48px rgba(0, 0, 0, 0.16)",description:"Large overlays, hero cards, and prominent UI elements"}],r=()=>e.jsxs(e.Fragment,{children:[e.jsx("style",{children:`
        .docs-container {
          max-width: 960px;
          margin: 0 auto;
          font-family: var(--font-body, Inter, -apple-system, BlinkMacSystemFont, sans-serif);
          color: var(--color-dark, #1d1d1f);
          -webkit-font-smoothing: antialiased;
          padding: 0 24px;
        }
        
        .docs-header {
          padding: 80px 0 64px;
          border-bottom: 1px solid var(--color-gray-200, #e5e5e5);
          margin-bottom: 64px;
        }
        
        .docs-eyebrow {
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--color-gray-500, #86868b);
          margin-bottom: 16px;
        }
        
        .docs-header h1 {
          font-family: var(--font-display, 'Poppins', sans-serif);
          font-size: 48px;
          font-weight: 600;
          letter-spacing: -0.02em;
          line-height: 1.1;
          margin: 0 0 24px 0;
        }
        
        .docs-header p {
          font-size: 21px;
          font-weight: 400;
          line-height: 1.5;
          color: var(--color-gray-600, #424245);
          margin: 0;
        }
        
        .section {
          margin-bottom: 80px;
        }
        
        .section h2 {
          font-family: var(--font-display, 'Poppins', sans-serif);
          font-size: 28px;
          font-weight: 600;
          letter-spacing: -0.01em;
          margin: 0 0 32px 0;
        }
        
        .shadow-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 32px;
        }
        
        .shadow-card {
          background: white;
          border-radius: 16px;
          padding: 32px;
          border: 1px solid var(--color-gray-200, #e5e5e5);
        }
        
        .shadow-preview {
          height: 120px;
          background: white;
          border-radius: 12px;
          margin-bottom: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          color: var(--color-gray-500, #86868b);
        }
        
        .shadow-sm { box-shadow: var(--shadow-sm); }
        .shadow-md { box-shadow: var(--shadow-md); }
        .shadow-lg { box-shadow: var(--shadow-lg); }
        .shadow-xl { box-shadow: var(--shadow-xl); }
        
        .shadow-info h3 {
          font-size: 18px;
          font-weight: 600;
          margin: 0 0 8px 0;
        }
        
        .shadow-variable {
          font-family: 'SF Mono', 'Fira Code', monospace;
          font-size: 13px;
          color: var(--color-blue-cobalt, #2563eb);
          background: var(--color-gray-100, #f5f5f5);
          padding: 4px 8px;
          border-radius: 4px;
          display: inline-block;
          margin-bottom: 12px;
        }
        
        .shadow-value {
          font-family: 'SF Mono', 'Fira Code', monospace;
          font-size: 12px;
          color: var(--color-gray-600, #666);
          margin-bottom: 12px;
          word-break: break-all;
        }
        
        .shadow-description {
          font-size: 14px;
          color: var(--color-gray-600, #666);
          line-height: 1.5;
          margin: 0;
        }
        
        .usage-section {
          background: var(--color-gray-100, #f9fafb);
          border-radius: 16px;
          padding: 40px;
          margin-top: 48px;
        }
        
        .usage-section h3 {
          font-size: 20px;
          font-weight: 600;
          margin: 0 0 24px 0;
        }
        
        .usage-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 24px;
        }
        
        .usage-item {
          background: white;
          border-radius: 12px;
          padding: 24px;
          text-align: center;
        }
        
        .usage-item.sm { box-shadow: var(--shadow-sm); }
        .usage-item.md { box-shadow: var(--shadow-md); }
        .usage-item.lg { box-shadow: var(--shadow-lg); }
        .usage-item.xl { box-shadow: var(--shadow-xl); }
        
        .usage-label {
          font-size: 13px;
          font-weight: 500;
          color: var(--color-gray-600, #666);
          margin-top: 12px;
        }
        
        .code-block {
          background: var(--color-dark, #1a1a1a);
          border-radius: 12px;
          padding: 24px;
          margin-top: 32px;
          overflow-x: auto;
        }
        
        .code-block pre {
          margin: 0;
          font-family: 'SF Mono', 'Fira Code', monospace;
          font-size: 13px;
          line-height: 1.6;
          color: #e5e5e5;
        }
        
        .code-comment {
          color: #6b7280;
        }
        
        .code-property {
          color: #93c5fd;
        }
        
        .code-value {
          color: #86efac;
        }
        
        .interactive-demo {
          margin-top: 48px;
          padding: 40px;
          background: white;
          border-radius: 16px;
          border: 1px solid var(--color-gray-200, #e5e5e5);
        }
        
        .demo-card {
          width: 200px;
          height: 120px;
          background: white;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto;
          transition: box-shadow 0.3s ease;
          cursor: pointer;
          border: 1px solid var(--color-gray-200, #e5e5e5);
        }
        
        .demo-card:hover {
          box-shadow: var(--shadow-lg);
          border-color: transparent;
        }
        
        .demo-card:active {
          box-shadow: var(--shadow-sm);
        }
        
        .demo-label {
          font-size: 14px;
          color: var(--color-gray-500, #86868b);
        }
        
        .demo-hint {
          text-align: center;
          margin-top: 16px;
          font-size: 13px;
          color: var(--color-gray-500, #86868b);
        }
      `}),e.jsxs("div",{className:"docs-container",children:[e.jsxs("header",{className:"docs-header",children:[e.jsx("div",{className:"docs-eyebrow",children:"Foundation"}),e.jsx("h1",{children:"Shadows"}),e.jsx("p",{children:"Shadow tokens create depth and visual hierarchy. Use them consistently to indicate elevation and interactive states."})]}),e.jsxs("section",{className:"section",children:[e.jsx("h2",{children:"Shadow Scale"}),e.jsx("div",{className:"shadow-grid",children:o.map(a=>e.jsxs("div",{className:"shadow-card",children:[e.jsx("div",{className:`shadow-preview shadow-${a.variable.replace("--shadow-","")}`,children:"Preview"}),e.jsxs("div",{className:"shadow-info",children:[e.jsx("h3",{children:a.name}),e.jsx("code",{className:"shadow-variable",children:a.variable}),e.jsx("div",{className:"shadow-value",children:a.value}),e.jsx("p",{className:"shadow-description",children:a.description})]})]},a.variable))})]}),e.jsxs("section",{className:"section",children:[e.jsx("h2",{children:"Common Usage"}),e.jsxs("div",{className:"usage-section",children:[e.jsx("h3",{children:"Elevation Examples"}),e.jsxs("div",{className:"usage-grid",children:[e.jsxs("div",{className:"usage-item sm",children:[e.jsx("svg",{width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:e.jsx("rect",{x:"3",y:"3",width:"18",height:"18",rx:"2"})}),e.jsx("div",{className:"usage-label",children:"List Item"})]}),e.jsxs("div",{className:"usage-item md",children:[e.jsxs("svg",{width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[e.jsx("rect",{x:"3",y:"3",width:"18",height:"18",rx:"2"}),e.jsx("line",{x1:"3",y1:"9",x2:"21",y2:"9"})]}),e.jsx("div",{className:"usage-label",children:"Card"})]}),e.jsxs("div",{className:"usage-item lg",children:[e.jsxs("svg",{width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[e.jsx("rect",{x:"2",y:"4",width:"20",height:"16",rx:"2"}),e.jsx("line",{x1:"6",y1:"8",x2:"18",y2:"8"}),e.jsx("line",{x1:"6",y1:"12",x2:"14",y2:"12"})]}),e.jsx("div",{className:"usage-label",children:"Modal"})]}),e.jsxs("div",{className:"usage-item xl",children:[e.jsxs("svg",{width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[e.jsx("rect",{x:"1",y:"3",width:"22",height:"18",rx:"2"}),e.jsx("circle",{cx:"12",cy:"12",r:"4"})]}),e.jsx("div",{className:"usage-label",children:"Hero Overlay"})]})]})]}),e.jsx("div",{className:"code-block",children:e.jsxs("pre",{children:[e.jsx("span",{className:"code-comment",children:"/* Using shadow tokens in CSS */"}),`
`,e.jsx("span",{className:"code-property",children:".card"})," ","{",`
`,"  ",e.jsx("span",{className:"code-property",children:"box-shadow"}),": ",e.jsx("span",{className:"code-value",children:"var(--shadow-md)"}),";",`
`,"}",`

`,e.jsx("span",{className:"code-comment",children:"/* Hover state with larger shadow */"}),`
`,e.jsx("span",{className:"code-property",children:".card:hover"})," ","{",`
`,"  ",e.jsx("span",{className:"code-property",children:"box-shadow"}),": ",e.jsx("span",{className:"code-value",children:"var(--shadow-lg)"}),";",`
`,"  ",e.jsx("span",{className:"code-property",children:"transition"}),": ",e.jsx("span",{className:"code-value",children:"box-shadow 0.2s ease"}),";",`
`,"}"]})})]}),e.jsxs("section",{className:"section",children:[e.jsx("h2",{children:"Interactive Demo"}),e.jsxs("div",{className:"interactive-demo",children:[e.jsx("div",{className:"demo-card",children:e.jsx("span",{className:"demo-label",children:"Hover me"})}),e.jsx("p",{className:"demo-hint",children:"Hover to see shadow transition from none to large"})]})]})]})]}),n={title:"Foundation/Shadows",parameters:{layout:"fullscreen",docs:{description:{component:"Shadow tokens for creating depth and visual hierarchy."}}}},s={render:()=>e.jsx(r,{}),parameters:{docs:{canvas:{sourceState:"hidden"}}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: () => <ShadowsPage />,
  parameters: {
    docs: {
      canvas: {
        sourceState: 'hidden'
      }
    }
  }
}`,...s.parameters?.docs?.source}}};const t=["AllShadows"];export{s as AllShadows,t as __namedExportsOrder,n as default};
