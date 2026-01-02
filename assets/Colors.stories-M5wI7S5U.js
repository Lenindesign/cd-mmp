import{j as r}from"./iframe-CGJgdeWY.js";import"./preload-helper-PPVm8Dsz.js";const o=({name:l,variable:a,hex:s,textColor:c="white",border:i=!1})=>r.jsxs("div",{className:"color-swatch",children:[r.jsxs("div",{className:"color-circle",style:{backgroundColor:`var(${a})`,color:c==="white"?"#ffffff":"#222222",border:i?"1px solid var(--color-gray-300)":"none"},children:[r.jsx("span",{children:l}),r.jsx("code",{children:s})]}),r.jsx("code",{className:"color-var",children:a})]}),d=()=>r.jsxs(r.Fragment,{children:[r.jsx("style",{children:`
        .docs-container {
          max-width: 900px;
          margin: 0 auto;
          font-family: var(--font-body);
          color: var(--color-dark);
          -webkit-font-smoothing: antialiased;
          padding: 0 24px;
        }
        
        .docs-header {
          padding: 60px 0 48px;
          border-bottom: 1px solid var(--color-gray-200);
          margin-bottom: 48px;
        }
        
        .docs-eyebrow {
          font-size: var(--font-size-sm);
          font-weight: var(--font-weight-semibold);
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--color-gray-500);
          margin-bottom: 12px;
        }
        
        .docs-header h1 {
          font-family: var(--font-heading);
          font-size: var(--font-size-4xl);
          font-weight: var(--font-weight-extrabold);
          letter-spacing: -0.02em;
          line-height: 1.1;
          margin: 0 0 16px 0;
          color: var(--color-dark);
        }
        
        .docs-header p {
          font-size: var(--font-size-lg);
          font-weight: var(--font-weight-regular);
          line-height: 1.5;
          color: var(--color-gray-600);
          margin: 0;
          max-width: 560px;
        }
        
        .docs-section {
          margin-bottom: 64px;
        }
        
        .docs-section-title {
          font-family: var(--font-heading);
          font-size: var(--font-size-2xl);
          font-weight: var(--font-weight-bold);
          letter-spacing: -0.015em;
          color: var(--color-dark);
          margin: 0 0 8px 0;
        }
        
        .docs-section-subtitle {
          font-size: var(--font-size-base);
          color: var(--color-gray-500);
          margin: 0 0 32px 0;
          line-height: 1.5;
        }
        
        .color-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
        }
        
        .color-swatch {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }
        
        .color-circle {
          width: 100px;
          height: 100px;
          border-radius: var(--border-radius-lg);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          box-shadow: var(--shadow-sm);
        }
        
        .color-circle span {
          font-size: 10px;
          font-weight: var(--font-weight-semibold);
          letter-spacing: 0.05em;
          text-transform: uppercase;
          margin-bottom: 2px;
        }
        
        .color-circle code {
          font-size: 10px;
          font-family: 'SF Mono', 'Menlo', 'Monaco', monospace;
        }
        
        .color-var {
          font-size: 10px;
          font-family: 'SF Mono', 'Menlo', 'Monaco', monospace;
          color: var(--color-gray-500);
          max-width: 100px;
          text-align: center;
          word-break: break-all;
        }
        
        .color-scale {
          display: flex;
          gap: 4px;
          margin-bottom: 24px;
        }
        
        .color-scale-item {
          flex: 1;
          height: 60px;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          padding-bottom: 8px;
          font-size: 10px;
          font-weight: 600;
          border-radius: var(--border-radius-sm);
        }
      `}),r.jsxs("div",{className:"docs-container",children:[r.jsxs("div",{className:"docs-header",children:[r.jsx("div",{className:"docs-eyebrow",children:"Design Tokens"}),r.jsx("h1",{children:"Color System"}),r.jsx("p",{children:"A systematic approach to color ensures consistency across all components and interfaces."})]}),r.jsxs("div",{className:"docs-section",children:[r.jsx("h2",{className:"docs-section-title",children:"Primary Colors"}),r.jsx("p",{className:"docs-section-subtitle",children:"Official Car and Driver primary brand colors."}),r.jsxs("div",{className:"color-grid",children:[r.jsx(o,{name:"Dark Grey",variable:"--color-dark",hex:"#222222"}),r.jsx(o,{name:"Dark Blue",variable:"--color-blue-cobalt",hex:"#1B5F8A"}),r.jsx(o,{name:"Gold",variable:"--color-gold",hex:"#DBCA8B",textColor:"dark"}),r.jsx(o,{name:"Light Orange",variable:"--color-cream",hex:"#F7E4CA",textColor:"dark",border:!0}),r.jsx(o,{name:"Light Grey",variable:"--color-gray-100",hex:"#F5F5F5",textColor:"dark",border:!0})]})]}),r.jsxs("div",{className:"docs-section",children:[r.jsx("h2",{className:"docs-section-title",children:"Secondary Colors"}),r.jsx("p",{className:"docs-section-subtitle",children:"Official Car and Driver secondary brand colors."}),r.jsxs("div",{className:"color-grid",children:[r.jsx(o,{name:"Red",variable:"--color-red",hex:"#D2232A"}),r.jsx(o,{name:"Green",variable:"--color-success",hex:"#26870D"}),r.jsx(o,{name:"Dark Gold",variable:"--color-gold-dark",hex:"#A59143"}),r.jsx(o,{name:"Light Blue",variable:"--color-teal-light",hex:"#F1F7F7",textColor:"dark",border:!0}),r.jsx(o,{name:"White",variable:"--color-white",hex:"#FFFFFF",textColor:"dark",border:!0})]})]}),r.jsxs("div",{className:"docs-section",children:[r.jsx("h2",{className:"docs-section-title",children:"Gray Scale (Simplified)"}),r.jsx("p",{className:"docs-section-subtitle",children:"Optimized 7-color grayscale for text, backgrounds, and borders."}),r.jsxs("div",{className:"color-scale",children:[r.jsx("div",{className:"color-scale-item",style:{backgroundColor:"var(--color-dark)",color:"white"},children:"Dark"}),r.jsx("div",{className:"color-scale-item",style:{backgroundColor:"var(--color-gray-700)",color:"white"},children:"700"}),r.jsx("div",{className:"color-scale-item",style:{backgroundColor:"var(--color-gray-600)",color:"white"},children:"600"}),r.jsx("div",{className:"color-scale-item",style:{backgroundColor:"var(--color-gray-500)",color:"white"},children:"500"}),r.jsx("div",{className:"color-scale-item",style:{backgroundColor:"var(--color-gray-300)",color:"#222"},children:"300"}),r.jsx("div",{className:"color-scale-item",style:{backgroundColor:"var(--color-gray-200)",color:"#222"},children:"200"}),r.jsx("div",{className:"color-scale-item",style:{backgroundColor:"var(--color-gray-100)",color:"#222"},children:"100"}),r.jsx("div",{className:"color-scale-item",style:{backgroundColor:"var(--color-gray-50)",color:"#222",border:"1px solid var(--color-gray-200)"},children:"50"})]}),r.jsxs("div",{className:"color-grid",children:[r.jsx(o,{name:"Dark",variable:"--color-dark",hex:"#222222"}),r.jsx(o,{name:"Gray 700",variable:"--color-gray-700",hex:"#4a4a4a"}),r.jsx(o,{name:"Gray 600",variable:"--color-gray-600",hex:"#666666"}),r.jsx(o,{name:"Gray 500",variable:"--color-gray-500",hex:"#6b6b6b"}),r.jsx(o,{name:"Gray 300",variable:"--color-gray-300",hex:"#cdcdcd",textColor:"dark"}),r.jsx(o,{name:"Gray 200",variable:"--color-gray-200",hex:"#e5e5e5",textColor:"dark",border:!0}),r.jsx(o,{name:"Gray 100",variable:"--color-gray-100",hex:"#f5f5f5",textColor:"dark",border:!0}),r.jsx(o,{name:"Gray 50",variable:"--color-gray-50",hex:"#fafafa",textColor:"dark",border:!0})]}),r.jsxs("div",{style:{background:"var(--color-gray-100)",padding:"16px 20px",borderRadius:"var(--border-radius-md)",marginTop:"24px",fontSize:"13px",lineHeight:"1.8"},children:[r.jsx("strong",{style:{display:"block",marginBottom:"8px"},children:"Legacy Aliases (for backwards compatibility):"}),r.jsxs("div",{style:{fontFamily:"'SF Mono', 'Menlo', 'Monaco', monospace",fontSize:"12px"},children:[r.jsxs("div",{children:[r.jsx("code",{children:"--color-gray-900"})," → ",r.jsx("code",{children:"var(--color-dark)"})]}),r.jsxs("div",{children:[r.jsx("code",{children:"--color-gray-800"})," → ",r.jsx("code",{children:"var(--color-gray-700)"})]}),r.jsxs("div",{children:[r.jsx("code",{children:"--color-gray-400"})," → ",r.jsx("code",{children:"var(--color-gray-500)"})]})]})]})]}),r.jsxs("div",{className:"docs-section",children:[r.jsx("h2",{className:"docs-section-title",children:"Semantic Colors"}),r.jsx("p",{className:"docs-section-subtitle",children:"Colors for success, warning, error, and informational states."}),r.jsxs("div",{className:"color-grid",children:[r.jsx(o,{name:"Success",variable:"--color-success",hex:"#26870D"}),r.jsx(o,{name:"Success Dark",variable:"--color-success-dark",hex:"#1e6a0a"}),r.jsx(o,{name:"Warning",variable:"--color-warning",hex:"#f59e0b",textColor:"dark"}),r.jsx(o,{name:"Error",variable:"--color-error",hex:"#ef4444"}),r.jsx(o,{name:"Error Dark",variable:"--color-error-dark",hex:"#dc2626"}),r.jsx(o,{name:"Info",variable:"--color-info",hex:"#0288d1"})]})]}),r.jsxs("div",{className:"docs-section",children:[r.jsx("h2",{className:"docs-section-title",children:"Special Colors"}),r.jsx("p",{className:"docs-section-subtitle",children:"Accent colors for specific use cases like badges, highlights, and backgrounds."}),r.jsxs("div",{className:"color-grid",children:[r.jsx(o,{name:"Gold",variable:"--color-gold",hex:"#DBCA8B",textColor:"dark"}),r.jsx(o,{name:"Gold Light",variable:"--color-gold-light",hex:"#FEF3C7",textColor:"dark",border:!0}),r.jsx(o,{name:"Gold Dark",variable:"--color-gold-dark",hex:"#A59143"}),r.jsx(o,{name:"Cream",variable:"--color-cream",hex:"#F7E4CA",textColor:"dark",border:!0}),r.jsx(o,{name:"Teal Light",variable:"--color-teal-light",hex:"#F1F7F7",textColor:"dark",border:!0}),r.jsx(o,{name:"Highlight",variable:"--color-highlight",hex:"#fef08a",textColor:"dark",border:!0}),r.jsx(o,{name:"Facebook",variable:"--color-facebook",hex:"#1877F2"})]})]}),r.jsxs("div",{className:"docs-section",children:[r.jsx("h2",{className:"docs-section-title",children:"Neutrals Aliases"}),r.jsx("p",{className:"docs-section-subtitle",children:"Aliases that map to the simplified Gray Scale for backwards compatibility."}),r.jsxs("div",{className:"color-scale",children:[r.jsx("div",{className:"color-scale-item",style:{backgroundColor:"var(--color-neutrals-1)",color:"white"},children:"1"}),r.jsx("div",{className:"color-scale-item",style:{backgroundColor:"var(--color-neutrals-2)",color:"white"},children:"2"}),r.jsx("div",{className:"color-scale-item",style:{backgroundColor:"var(--color-neutrals-3)",color:"white"},children:"3"}),r.jsx("div",{className:"color-scale-item",style:{backgroundColor:"var(--color-neutrals-4)",color:"white"},children:"4"}),r.jsx("div",{className:"color-scale-item",style:{backgroundColor:"var(--color-neutrals-5)",color:"white"},children:"5"}),r.jsx("div",{className:"color-scale-item",style:{backgroundColor:"var(--color-neutrals-6)",color:"#222"},children:"6"}),r.jsx("div",{className:"color-scale-item",style:{backgroundColor:"var(--color-neutrals-7)",color:"#222"},children:"7"}),r.jsx("div",{className:"color-scale-item",style:{backgroundColor:"var(--color-neutrals-8)",color:"#222",border:"1px solid var(--color-gray-200)"},children:"8"})]}),r.jsxs("div",{style:{background:"var(--color-gray-100)",padding:"16px 20px",borderRadius:"var(--border-radius-md)",marginTop:"16px",fontFamily:"'SF Mono', 'Menlo', 'Monaco', monospace",fontSize:"12px",lineHeight:"1.8"},children:[r.jsxs("div",{children:[r.jsx("code",{children:"--color-neutrals-1"})," → ",r.jsx("code",{children:"var(--color-dark)"})]}),r.jsxs("div",{children:[r.jsx("code",{children:"--color-neutrals-2"})," → ",r.jsx("code",{children:"var(--color-gray-700)"})]}),r.jsxs("div",{children:[r.jsx("code",{children:"--color-neutrals-3"})," → ",r.jsx("code",{children:"var(--color-gray-700)"})]}),r.jsxs("div",{children:[r.jsx("code",{children:"--color-neutrals-4"})," → ",r.jsx("code",{children:"var(--color-gray-600)"})]}),r.jsxs("div",{children:[r.jsx("code",{children:"--color-neutrals-5"})," → ",r.jsx("code",{children:"var(--color-gray-500)"})]}),r.jsxs("div",{children:[r.jsx("code",{children:"--color-neutrals-6"})," → ",r.jsx("code",{children:"var(--color-gray-200)"})]}),r.jsxs("div",{children:[r.jsx("code",{children:"--color-neutrals-7"})," → ",r.jsx("code",{children:"var(--color-gray-100)"})]}),r.jsxs("div",{children:[r.jsx("code",{children:"--color-neutrals-8"})," → ",r.jsx("code",{children:"var(--color-gray-50)"})]})]})]})]})]}),x={title:"Foundation/Colors",component:d,parameters:{layout:"fullscreen",docs:{description:{component:`
# Color System

The official Car and Driver color palette.

## Primary Colors

| Color | Variable | Hex |
|-------|----------|-----|
| Dark Grey | \`--color-dark\` | #222222 |
| Dark Blue | \`--color-blue-cobalt\` | #1B5F8A |
| Gold | \`--color-gold\` | #DBCA8B |
| Light Orange | \`--color-cream\` | #F7E4CA |
| Light Grey | \`--color-gray-100\` | #F5F5F5 |

## Secondary Colors

| Color | Variable | Hex |
|-------|----------|-----|
| Red | \`--color-red\` | #D2232A |
| Green | \`--color-success\` | #26870D |
| Dark Gold | \`--color-gold-dark\` | #A59143 |
| Light Blue | \`--color-teal-light\` | #F1F7F7 |
| White | \`--color-white\` | #FFFFFF |

## Usage

Always use CSS variables instead of hardcoded hex values:

\`\`\`css
/* ✅ Correct */
color: var(--color-blue-cobalt);
background: var(--color-gray-100);
border: 1px solid var(--color-gray-200);

/* ❌ Wrong */
color: #1B5F8A;
background: #f5f5f5;
\`\`\`
        `}}},tags:["autodocs"]},e={};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:"{}",...e.parameters?.docs?.source}}};const h=["AllColors"];export{e as AllColors,h as __namedExportsOrder,x as default};
