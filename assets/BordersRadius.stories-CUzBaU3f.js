import{j as r}from"./iframe-BEa3bQge.js";import"./preload-helper-PPVm8Dsz.js";const e={container:{padding:"2rem",fontFamily:"var(--font-body)"},section:{marginBottom:"3rem"},sectionTitle:{fontSize:"1.5rem",fontWeight:600,marginBottom:"1rem",color:"var(--color-gray-900, #1a1a1a)"},sectionDescription:{color:"var(--color-gray-600, #666)",marginBottom:"1.5rem",lineHeight:1.6},previewBox:{padding:"2rem",backgroundColor:"var(--color-gray-50, #f9f9f9)",borderRadius:"12px",border:"1px solid var(--color-gray-200, #e5e5e5)",marginBottom:"1rem"},grid:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(140px, 1fr))",gap:"1.5rem"},label:{fontSize:"0.75rem",color:"var(--color-gray-500, #888)",marginBottom:"0.5rem",textTransform:"uppercase",letterSpacing:"0.05em"},codeBlock:{backgroundColor:"var(--color-gray-900, #1a1a1a)",color:"#e5e5e5",padding:"1rem",borderRadius:"8px",fontSize:"0.875rem",fontFamily:"monospace",overflow:"auto",marginTop:"1rem"},tokenLabel:{fontSize:"0.6875rem",fontFamily:"monospace",color:"var(--color-gray-600)",marginTop:"0.5rem"},valueLabel:{fontSize:"0.75rem",fontWeight:500,color:"var(--color-gray-700)"}},p=[{name:"--border-radius-sm",value:"4px",label:"Small"},{name:"--border-radius-md",value:"6px",label:"Medium"},{name:"--border-radius-lg",value:"8px",label:"Large"},{name:"--border-radius-xl",value:"12px",label:"Extra Large"},{name:"--border-radius-2xl",value:"16px",label:"2X Large"},{name:"--border-radius-full",value:"9999px",label:"Full (Circular)"}],m=[{name:"--color-gray-200",value:"#e5e5e5",label:"Light Border"},{name:"--color-gray-300",value:"#cdcdcd",label:"Default Border"},{name:"--color-blue-cobalt",value:"#1B5F8A",label:"Focus/Active"},{name:"--color-error",value:"#ef4444",label:"Error"},{name:"--color-success",value:"#26870D",label:"Success"},{name:"--color-warning",value:"#f59e0b",label:"Warning"}],u={title:"Foundation/Borders & Radius",parameters:{layout:"fullscreen",docs:{description:{component:"Border radius and border color tokens for consistent UI styling."}}}},l={render:()=>r.jsx("div",{style:e.container,children:r.jsxs("div",{style:e.section,children:[r.jsx("h2",{style:e.sectionTitle,children:"Border Radius Scale"}),r.jsx("p",{style:e.sectionDescription,children:"Use consistent border radius values to create visual harmony across the interface. Smaller radii for compact elements, larger radii for prominent features."}),r.jsx("div",{style:e.previewBox,children:r.jsx("div",{style:e.grid,children:p.map(o=>r.jsxs("div",{style:{textAlign:"center"},children:[r.jsx("div",{style:{width:"100%",height:"80px",backgroundColor:"var(--color-blue-cobalt, #1B5F8A)",borderRadius:o.value,marginBottom:"0.75rem"}}),r.jsx("div",{style:e.valueLabel,children:o.label}),r.jsx("div",{style:e.tokenLabel,children:o.name}),r.jsx("div",{style:{fontSize:"0.625rem",color:"var(--color-gray-400)"},children:o.value})]},o.name))})})]})})},i={render:()=>r.jsx("div",{style:e.container,children:r.jsxs("div",{style:e.section,children:[r.jsx("h2",{style:e.sectionTitle,children:"Radius Use Cases"}),r.jsx("p",{style:e.sectionDescription,children:"Different border radius values are appropriate for different UI elements."}),r.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"2rem"},children:[r.jsxs("div",{children:[r.jsx("p",{style:e.label,children:"Small (4px) — Inputs, Chips, Small Buttons"}),r.jsx("div",{style:e.previewBox,children:r.jsxs("div",{style:{display:"flex",gap:"1rem",flexWrap:"wrap",alignItems:"center"},children:[r.jsx("input",{type:"text",placeholder:"Text input",style:{padding:"0.75rem 1rem",border:"1px solid var(--color-gray-300)",borderRadius:"4px",fontSize:"0.875rem",width:"200px"}}),r.jsx("span",{style:{padding:"0.5rem 1rem",backgroundColor:"var(--color-blue-cobalt)",color:"white",borderRadius:"4px",fontSize:"0.75rem",fontWeight:500},children:"Chip"}),r.jsx("button",{style:{padding:"0.5rem 1rem",backgroundColor:"var(--color-gray-100)",border:"1px solid var(--color-gray-300)",borderRadius:"4px",fontSize:"0.75rem",cursor:"pointer"},children:"Small Button"})]})})]}),r.jsxs("div",{children:[r.jsx("p",{style:e.label,children:"Medium (6px) — Dropdowns, Tooltips"}),r.jsx("div",{style:e.previewBox,children:r.jsxs("div",{style:{display:"flex",gap:"1.5rem",flexWrap:"wrap"},children:[r.jsxs("div",{style:{padding:"0.75rem 1rem",backgroundColor:"white",border:"1px solid var(--color-gray-200)",borderRadius:"6px",boxShadow:"0 4px 12px rgba(0,0,0,0.1)",width:"180px"},children:[r.jsx("div",{style:{padding:"0.5rem 0",borderBottom:"1px solid var(--color-gray-100)"},children:"Option 1"}),r.jsx("div",{style:{padding:"0.5rem 0",borderBottom:"1px solid var(--color-gray-100)"},children:"Option 2"}),r.jsx("div",{style:{padding:"0.5rem 0"},children:"Option 3"})]}),r.jsx("div",{style:{padding:"0.5rem 0.75rem",backgroundColor:"var(--color-dark)",color:"white",borderRadius:"6px",fontSize:"0.75rem"},children:"Tooltip text"})]})})]}),r.jsxs("div",{children:[r.jsx("p",{style:e.label,children:"Large (8px) — Cards, Modals"}),r.jsx("div",{style:e.previewBox,children:r.jsxs("div",{style:{display:"flex",gap:"1.5rem",flexWrap:"wrap"},children:[r.jsxs("div",{style:{padding:"1.5rem",backgroundColor:"white",border:"1px solid var(--color-gray-200)",borderRadius:"8px",width:"220px"},children:[r.jsx("h4",{style:{marginBottom:"0.5rem",fontWeight:600},children:"Card Title"}),r.jsx("p",{style:{fontSize:"0.875rem",color:"var(--color-gray-600)"},children:"Card content goes here with some description text."})]}),r.jsxs("div",{style:{padding:"1.5rem",backgroundColor:"white",border:"1px solid var(--color-gray-200)",borderRadius:"8px",boxShadow:"0 8px 24px rgba(0,0,0,0.12)",width:"280px"},children:[r.jsx("h4",{style:{marginBottom:"0.5rem",fontWeight:600},children:"Modal Dialog"}),r.jsx("p",{style:{fontSize:"0.875rem",color:"var(--color-gray-600)",marginBottom:"1rem"},children:"Modal content with action buttons below."}),r.jsxs("div",{style:{display:"flex",gap:"0.5rem",justifyContent:"flex-end"},children:[r.jsx("button",{style:{padding:"0.5rem 1rem",borderRadius:"4px",border:"1px solid var(--color-gray-300)",backgroundColor:"white",cursor:"pointer"},children:"Cancel"}),r.jsx("button",{style:{padding:"0.5rem 1rem",borderRadius:"4px",border:"none",backgroundColor:"var(--color-blue-cobalt)",color:"white",cursor:"pointer"},children:"Confirm"})]})]})]})})]}),r.jsxs("div",{children:[r.jsx("p",{style:e.label,children:"Extra Large (12px) — Hero Cards, Feature Sections"}),r.jsx("div",{style:e.previewBox,children:r.jsxs("div",{style:{padding:"2rem",backgroundColor:"white",border:"1px solid var(--color-gray-200)",borderRadius:"12px",maxWidth:"400px"},children:[r.jsx("div",{style:{height:"120px",backgroundColor:"var(--color-gray-100)",borderRadius:"8px",marginBottom:"1rem",display:"flex",alignItems:"center",justifyContent:"center",color:"var(--color-gray-400)"},children:"Vehicle Image"}),r.jsx("h3",{style:{fontSize:"1.25rem",fontWeight:600,marginBottom:"0.5rem"},children:"2025 Honda Accord"}),r.jsx("p",{style:{color:"var(--color-gray-600)",marginBottom:"1rem"},children:"Starting at $29,610"}),r.jsx("button",{style:{width:"100%",padding:"0.75rem",backgroundColor:"var(--color-blue-cobalt)",color:"white",border:"none",borderRadius:"4px",fontWeight:600,cursor:"pointer"},children:"View Details"})]})})]}),r.jsxs("div",{children:[r.jsx("p",{style:e.label,children:"Full (9999px) — Avatars, Pills, Circular Buttons"}),r.jsx("div",{style:e.previewBox,children:r.jsxs("div",{style:{display:"flex",gap:"1.5rem",alignItems:"center",flexWrap:"wrap"},children:[r.jsx("div",{style:{width:"48px",height:"48px",backgroundColor:"var(--color-blue-cobalt)",borderRadius:"9999px",display:"flex",alignItems:"center",justifyContent:"center",color:"white",fontWeight:600},children:"JD"}),r.jsx("span",{style:{padding:"0.375rem 1rem",backgroundColor:"var(--color-success-light)",color:"var(--color-success)",borderRadius:"9999px",fontSize:"0.75rem",fontWeight:500},children:"Available"}),r.jsx("span",{style:{padding:"0.375rem 1rem",backgroundColor:"var(--color-gray-100)",color:"var(--color-gray-700)",borderRadius:"9999px",fontSize:"0.75rem",fontWeight:500},children:"12 results"}),r.jsx("button",{style:{width:"40px",height:"40px",backgroundColor:"var(--color-gray-100)",border:"none",borderRadius:"9999px",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"},children:"←"})]})})]})]})]})})},d={render:()=>r.jsx("div",{style:e.container,children:r.jsxs("div",{style:e.section,children:[r.jsx("h2",{style:e.sectionTitle,children:"Border Colors"}),r.jsx("p",{style:e.sectionDescription,children:"Use semantic border colors to communicate state and hierarchy."}),r.jsx("div",{style:e.previewBox,children:r.jsx("div",{style:e.grid,children:m.map(o=>r.jsxs("div",{style:{textAlign:"center"},children:[r.jsx("div",{style:{width:"100%",height:"60px",backgroundColor:"white",border:`2px solid ${o.value}`,borderRadius:"8px",marginBottom:"0.75rem"}}),r.jsx("div",{style:e.valueLabel,children:o.label}),r.jsx("div",{style:e.tokenLabel,children:o.name}),r.jsxs("div",{style:{fontSize:"0.625rem",color:"var(--color-gray-400)",display:"flex",alignItems:"center",justifyContent:"center",gap:"0.25rem"},children:[r.jsx("span",{style:{width:"10px",height:"10px",backgroundColor:o.value,borderRadius:"2px",display:"inline-block"}}),o.value]})]},o.name))})})]})})},t={render:()=>r.jsx("div",{style:e.container,children:r.jsxs("div",{style:e.section,children:[r.jsx("h2",{style:e.sectionTitle,children:"Border States"}),r.jsx("p",{style:e.sectionDescription,children:"Interactive elements change border color to indicate state."}),r.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"2rem"},children:[r.jsxs("div",{children:[r.jsx("p",{style:e.label,children:"Input Field States"}),r.jsx("div",{style:e.previewBox,children:r.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(200px, 1fr))",gap:"1.5rem"},children:[r.jsxs("div",{children:[r.jsx("label",{style:{display:"block",fontSize:"0.75rem",marginBottom:"0.5rem",color:"var(--color-gray-600)"},children:"Default"}),r.jsx("input",{type:"text",placeholder:"Enter text...",style:{width:"100%",padding:"0.75rem 1rem",border:"1px solid var(--color-gray-300)",borderRadius:"4px",fontSize:"0.875rem"}})]}),r.jsxs("div",{children:[r.jsx("label",{style:{display:"block",fontSize:"0.75rem",marginBottom:"0.5rem",color:"var(--color-gray-600)"},children:"Focus"}),r.jsx("input",{type:"text",placeholder:"Focused input",style:{width:"100%",padding:"0.75rem 1rem",border:"1px solid var(--color-blue-cobalt)",borderRadius:"4px",fontSize:"0.875rem",boxShadow:"0 0 0 2px rgba(27, 95, 138, 0.2)",outline:"none"}})]}),r.jsxs("div",{children:[r.jsx("label",{style:{display:"block",fontSize:"0.75rem",marginBottom:"0.5rem",color:"var(--color-gray-600)"},children:"Error"}),r.jsx("input",{type:"text",placeholder:"Invalid input",style:{width:"100%",padding:"0.75rem 1rem",border:"1px solid var(--color-error)",borderRadius:"4px",fontSize:"0.875rem"}}),r.jsx("span",{style:{fontSize:"0.75rem",color:"var(--color-error)",marginTop:"0.25rem",display:"block"},children:"This field is required"})]}),r.jsxs("div",{children:[r.jsx("label",{style:{display:"block",fontSize:"0.75rem",marginBottom:"0.5rem",color:"var(--color-gray-600)"},children:"Success"}),r.jsx("input",{type:"text",value:"Valid input",readOnly:!0,style:{width:"100%",padding:"0.75rem 1rem",border:"1px solid var(--color-success)",borderRadius:"4px",fontSize:"0.875rem"}})]}),r.jsxs("div",{children:[r.jsx("label",{style:{display:"block",fontSize:"0.75rem",marginBottom:"0.5rem",color:"var(--color-gray-600)"},children:"Disabled"}),r.jsx("input",{type:"text",placeholder:"Disabled",disabled:!0,style:{width:"100%",padding:"0.75rem 1rem",border:"1px solid var(--color-gray-200)",borderRadius:"4px",fontSize:"0.875rem",backgroundColor:"var(--color-gray-50)",opacity:.6}})]})]})})]}),r.jsxs("div",{children:[r.jsx("p",{style:e.label,children:"Card Selection States"}),r.jsx("div",{style:e.previewBox,children:r.jsxs("div",{style:{display:"flex",gap:"1.5rem",flexWrap:"wrap"},children:[r.jsxs("div",{style:{padding:"1.5rem",backgroundColor:"white",border:"1px solid var(--color-gray-200)",borderRadius:"8px",width:"160px",textAlign:"center"},children:[r.jsx("div",{style:{fontWeight:500,marginBottom:"0.25rem"},children:"Default"}),r.jsx("div",{style:{fontSize:"0.75rem",color:"var(--color-gray-500)"},children:"Not selected"})]}),r.jsxs("div",{style:{padding:"1.5rem",backgroundColor:"white",border:"2px solid var(--color-blue-cobalt)",borderRadius:"8px",width:"160px",textAlign:"center",boxShadow:"0 0 0 2px rgba(27, 95, 138, 0.1)"},children:[r.jsx("div",{style:{fontWeight:500,marginBottom:"0.25rem",color:"var(--color-blue-cobalt)"},children:"Selected"}),r.jsx("div",{style:{fontSize:"0.75rem",color:"var(--color-gray-500)"},children:"Active choice"})]}),r.jsxs("div",{style:{padding:"1.5rem",backgroundColor:"var(--color-gray-50)",border:"1px dashed var(--color-gray-300)",borderRadius:"8px",width:"160px",textAlign:"center"},children:[r.jsx("div",{style:{fontWeight:500,marginBottom:"0.25rem",color:"var(--color-gray-400)"},children:"Disabled"}),r.jsx("div",{style:{fontSize:"0.75rem",color:"var(--color-gray-400)"},children:"Unavailable"})]})]})})]})]})]})})},s={render:()=>r.jsx("div",{style:e.container,children:r.jsxs("div",{style:e.section,children:[r.jsx("h2",{style:e.sectionTitle,children:"Border Widths & Styles"}),r.jsx("p",{style:e.sectionDescription,children:"Standard border widths and line styles used in the design system."}),r.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"2rem"},children:[r.jsxs("div",{children:[r.jsx("p",{style:e.label,children:"Border Widths"}),r.jsx("div",{style:e.previewBox,children:r.jsx("div",{style:{display:"flex",gap:"2rem",flexWrap:"wrap"},children:[{width:"1px",label:"1px (Default)",use:"Cards, inputs, dividers"},{width:"2px",label:"2px (Emphasis)",use:"Focus states, selected items"},{width:"3px",label:"3px (Strong)",use:"Active tabs, highlights"}].map(({width:o,label:n,use:c})=>r.jsxs("div",{style:{textAlign:"center"},children:[r.jsx("div",{style:{width:"120px",height:"60px",backgroundColor:"white",border:`${o} solid var(--color-blue-cobalt)`,borderRadius:"8px",marginBottom:"0.75rem"}}),r.jsx("div",{style:e.valueLabel,children:n}),r.jsx("div",{style:{fontSize:"0.625rem",color:"var(--color-gray-500)",marginTop:"0.25rem"},children:c})]},o))})})]}),r.jsxs("div",{children:[r.jsx("p",{style:e.label,children:"Border Styles"}),r.jsx("div",{style:e.previewBox,children:r.jsx("div",{style:{display:"flex",gap:"2rem",flexWrap:"wrap"},children:[{style:"solid",label:"Solid",use:"Default for most elements"},{style:"dashed",label:"Dashed",use:"Drop zones, placeholders"},{style:"dotted",label:"Dotted",use:"Subtle separators"}].map(({style:o,label:n,use:c})=>r.jsxs("div",{style:{textAlign:"center"},children:[r.jsx("div",{style:{width:"120px",height:"60px",backgroundColor:"white",border:`2px ${o} var(--color-gray-300)`,borderRadius:"8px",marginBottom:"0.75rem"}}),r.jsx("div",{style:e.valueLabel,children:n}),r.jsx("div",{style:{fontSize:"0.625rem",color:"var(--color-gray-500)",marginTop:"0.25rem"},children:c})]},o))})})]}),r.jsxs("div",{children:[r.jsx("p",{style:e.label,children:"Dividers"}),r.jsx("div",{style:e.previewBox,children:r.jsxs("div",{style:{maxWidth:"400px"},children:[r.jsx("div",{style:{padding:"1rem 0"},children:"Content above divider"}),r.jsx("hr",{style:{border:"none",borderTop:"1px solid var(--color-gray-200)",margin:0}}),r.jsx("div",{style:{padding:"1rem 0"},children:"Content below divider"}),r.jsx("hr",{style:{border:"none",borderTop:"2px solid var(--color-gray-100)",margin:0}}),r.jsx("div",{style:{padding:"1rem 0"},children:"Thicker divider above"})]})})]})]})]})})},a={render:()=>r.jsx("div",{style:e.container,children:r.jsxs("div",{style:e.section,children:[r.jsx("h2",{style:e.sectionTitle,children:"Implementation"}),r.jsx("h3",{style:{fontSize:"1rem",fontWeight:500,marginBottom:"0.5rem"},children:"CSS Variables"}),r.jsx("pre",{style:e.codeBlock,children:`:root {
  /* Border Radius */
  --border-radius-sm: 4px;      /* Inputs, small buttons */
  --border-radius-md: 6px;      /* Cards, dropdowns */
  --border-radius-lg: 8px;      /* Modals, large cards */
  --border-radius-xl: 12px;     /* Hero cards */
  --border-radius-2xl: 16px;    /* Feature cards */
  --border-radius-full: 9999px; /* Avatars, pills */
  
  /* Border Colors */
  --color-gray-200: #e5e5e5;    /* Light borders, dividers */
  --color-gray-300: #cdcdcd;    /* Default input borders */
  --color-blue-cobalt: #1B5F8A; /* Focus, active states */
  --color-error: #ef4444;       /* Error states */
  --color-success: #26870D;     /* Success states */
}`}),r.jsx("h3",{style:{fontSize:"1rem",fontWeight:500,marginTop:"2rem",marginBottom:"0.5rem"},children:"Usage Examples"}),r.jsx("pre",{style:e.codeBlock,children:`/* Card with standard border */
.card {
  border: 1px solid var(--color-gray-200);
  border-radius: var(--border-radius-lg);
}

/* Input with focus state */
.input {
  border: 1px solid var(--color-gray-300);
  border-radius: var(--border-radius-sm);
}

.input:focus {
  border-color: var(--color-blue-cobalt);
  box-shadow: 0 0 0 2px rgba(27, 95, 138, 0.2);
}

/* Error state */
.input--error {
  border-color: var(--color-error);
}

/* Avatar (circular) */
.avatar {
  border-radius: var(--border-radius-full);
}

/* Pill badge */
.badge {
  border-radius: var(--border-radius-full);
  padding: 0.25rem 0.75rem;
}`}),r.jsx("h3",{style:{fontSize:"1rem",fontWeight:500,marginTop:"2rem",marginBottom:"0.5rem"},children:"Tailwind-Style Utilities"}),r.jsx("pre",{style:e.codeBlock,children:`/* If using utility classes */
.rounded-sm { border-radius: var(--border-radius-sm); }
.rounded-md { border-radius: var(--border-radius-md); }
.rounded-lg { border-radius: var(--border-radius-lg); }
.rounded-xl { border-radius: var(--border-radius-xl); }
.rounded-2xl { border-radius: var(--border-radius-2xl); }
.rounded-full { border-radius: var(--border-radius-full); }

.border { border: 1px solid var(--color-gray-200); }
.border-2 { border: 2px solid var(--color-gray-200); }
.border-gray-300 { border-color: var(--color-gray-300); }
.border-blue { border-color: var(--color-blue-cobalt); }
.border-error { border-color: var(--color-error); }`}),r.jsx("h3",{style:{fontSize:"1rem",fontWeight:500,marginTop:"2rem",marginBottom:"0.5rem"},children:"Best Practices"}),r.jsx("pre",{style:e.codeBlock,children:`/* DO: Use consistent radius within component families */
.card { border-radius: var(--border-radius-lg); }
.card__image { border-radius: var(--border-radius-md); }
.card__button { border-radius: var(--border-radius-sm); }

/* DO: Use semantic border colors */
.input:focus { border-color: var(--color-blue-cobalt); }
.input--error { border-color: var(--color-error); }
.input--success { border-color: var(--color-success); }

/* DON'T: Mix arbitrary radius values */
/* Bad: border-radius: 7px; */
/* Good: border-radius: var(--border-radius-lg); */

/* DON'T: Use hard-coded border colors */
/* Bad: border: 1px solid #ccc; */
/* Good: border: 1px solid var(--color-gray-300); */`})]})})};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => <div style={styles.container}>
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Border Radius Scale</h2>
        <p style={styles.sectionDescription}>
          Use consistent border radius values to create visual harmony across the interface.
          Smaller radii for compact elements, larger radii for prominent features.
        </p>
        
        <div style={styles.previewBox}>
          <div style={styles.grid}>
            {radiusTokens.map(token => <div key={token.name} style={{
            textAlign: 'center'
          }}>
                <div style={{
              width: '100%',
              height: '80px',
              backgroundColor: 'var(--color-blue-cobalt, #1B5F8A)',
              borderRadius: token.value,
              marginBottom: '0.75rem'
            }} />
                <div style={styles.valueLabel}>{token.label}</div>
                <div style={styles.tokenLabel}>{token.name}</div>
                <div style={{
              fontSize: '0.625rem',
              color: 'var(--color-gray-400)'
            }}>{token.value}</div>
              </div>)}
          </div>
        </div>
      </div>
    </div>
}`,...l.parameters?.docs?.source},description:{story:"All border radius values in the design system.",...l.parameters?.docs?.description}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  render: () => <div style={styles.container}>
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Radius Use Cases</h2>
        <p style={styles.sectionDescription}>
          Different border radius values are appropriate for different UI elements.
        </p>
        
        <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem'
      }}>
          {/* Small - Inputs, Chips */}
          <div>
            <p style={styles.label}>Small (4px) — Inputs, Chips, Small Buttons</p>
            <div style={styles.previewBox}>
              <div style={{
              display: 'flex',
              gap: '1rem',
              flexWrap: 'wrap',
              alignItems: 'center'
            }}>
                <input type="text" placeholder="Text input" style={{
                padding: '0.75rem 1rem',
                border: '1px solid var(--color-gray-300)',
                borderRadius: '4px',
                fontSize: '0.875rem',
                width: '200px'
              }} />
                <span style={{
                padding: '0.5rem 1rem',
                backgroundColor: 'var(--color-blue-cobalt)',
                color: 'white',
                borderRadius: '4px',
                fontSize: '0.75rem',
                fontWeight: 500
              }}>
                  Chip
                </span>
                <button style={{
                padding: '0.5rem 1rem',
                backgroundColor: 'var(--color-gray-100)',
                border: '1px solid var(--color-gray-300)',
                borderRadius: '4px',
                fontSize: '0.75rem',
                cursor: 'pointer'
              }}>
                  Small Button
                </button>
              </div>
            </div>
          </div>
          
          {/* Medium - Dropdowns, Tooltips */}
          <div>
            <p style={styles.label}>Medium (6px) — Dropdowns, Tooltips</p>
            <div style={styles.previewBox}>
              <div style={{
              display: 'flex',
              gap: '1.5rem',
              flexWrap: 'wrap'
            }}>
                <div style={{
                padding: '0.75rem 1rem',
                backgroundColor: 'white',
                border: '1px solid var(--color-gray-200)',
                borderRadius: '6px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                width: '180px'
              }}>
                  <div style={{
                  padding: '0.5rem 0',
                  borderBottom: '1px solid var(--color-gray-100)'
                }}>Option 1</div>
                  <div style={{
                  padding: '0.5rem 0',
                  borderBottom: '1px solid var(--color-gray-100)'
                }}>Option 2</div>
                  <div style={{
                  padding: '0.5rem 0'
                }}>Option 3</div>
                </div>
                <div style={{
                padding: '0.5rem 0.75rem',
                backgroundColor: 'var(--color-dark)',
                color: 'white',
                borderRadius: '6px',
                fontSize: '0.75rem'
              }}>
                  Tooltip text
                </div>
              </div>
            </div>
          </div>
          
          {/* Large - Cards, Modals */}
          <div>
            <p style={styles.label}>Large (8px) — Cards, Modals</p>
            <div style={styles.previewBox}>
              <div style={{
              display: 'flex',
              gap: '1.5rem',
              flexWrap: 'wrap'
            }}>
                <div style={{
                padding: '1.5rem',
                backgroundColor: 'white',
                border: '1px solid var(--color-gray-200)',
                borderRadius: '8px',
                width: '220px'
              }}>
                  <h4 style={{
                  marginBottom: '0.5rem',
                  fontWeight: 600
                }}>Card Title</h4>
                  <p style={{
                  fontSize: '0.875rem',
                  color: 'var(--color-gray-600)'
                }}>Card content goes here with some description text.</p>
                </div>
                <div style={{
                padding: '1.5rem',
                backgroundColor: 'white',
                border: '1px solid var(--color-gray-200)',
                borderRadius: '8px',
                boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                width: '280px'
              }}>
                  <h4 style={{
                  marginBottom: '0.5rem',
                  fontWeight: 600
                }}>Modal Dialog</h4>
                  <p style={{
                  fontSize: '0.875rem',
                  color: 'var(--color-gray-600)',
                  marginBottom: '1rem'
                }}>Modal content with action buttons below.</p>
                  <div style={{
                  display: 'flex',
                  gap: '0.5rem',
                  justifyContent: 'flex-end'
                }}>
                    <button style={{
                    padding: '0.5rem 1rem',
                    borderRadius: '4px',
                    border: '1px solid var(--color-gray-300)',
                    backgroundColor: 'white',
                    cursor: 'pointer'
                  }}>Cancel</button>
                    <button style={{
                    padding: '0.5rem 1rem',
                    borderRadius: '4px',
                    border: 'none',
                    backgroundColor: 'var(--color-blue-cobalt)',
                    color: 'white',
                    cursor: 'pointer'
                  }}>Confirm</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Extra Large - Hero Cards, Features */}
          <div>
            <p style={styles.label}>Extra Large (12px) — Hero Cards, Feature Sections</p>
            <div style={styles.previewBox}>
              <div style={{
              padding: '2rem',
              backgroundColor: 'white',
              border: '1px solid var(--color-gray-200)',
              borderRadius: '12px',
              maxWidth: '400px'
            }}>
                <div style={{
                height: '120px',
                backgroundColor: 'var(--color-gray-100)',
                borderRadius: '8px',
                marginBottom: '1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-gray-400)'
              }}>
                  Vehicle Image
                </div>
                <h3 style={{
                fontSize: '1.25rem',
                fontWeight: 600,
                marginBottom: '0.5rem'
              }}>2025 Honda Accord</h3>
                <p style={{
                color: 'var(--color-gray-600)',
                marginBottom: '1rem'
              }}>Starting at $29,610</p>
                <button style={{
                width: '100%',
                padding: '0.75rem',
                backgroundColor: 'var(--color-blue-cobalt)',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                fontWeight: 600,
                cursor: 'pointer'
              }}>
                  View Details
                </button>
              </div>
            </div>
          </div>
          
          {/* Full - Avatars, Pills */}
          <div>
            <p style={styles.label}>Full (9999px) — Avatars, Pills, Circular Buttons</p>
            <div style={styles.previewBox}>
              <div style={{
              display: 'flex',
              gap: '1.5rem',
              alignItems: 'center',
              flexWrap: 'wrap'
            }}>
                <div style={{
                width: '48px',
                height: '48px',
                backgroundColor: 'var(--color-blue-cobalt)',
                borderRadius: '9999px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 600
              }}>
                  JD
                </div>
                <span style={{
                padding: '0.375rem 1rem',
                backgroundColor: 'var(--color-success-light)',
                color: 'var(--color-success)',
                borderRadius: '9999px',
                fontSize: '0.75rem',
                fontWeight: 500
              }}>
                  Available
                </span>
                <span style={{
                padding: '0.375rem 1rem',
                backgroundColor: 'var(--color-gray-100)',
                color: 'var(--color-gray-700)',
                borderRadius: '9999px',
                fontSize: '0.75rem',
                fontWeight: 500
              }}>
                  12 results
                </span>
                <button style={{
                width: '40px',
                height: '40px',
                backgroundColor: 'var(--color-gray-100)',
                border: 'none',
                borderRadius: '9999px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                  ←
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
}`,...i.parameters?.docs?.source},description:{story:"Border radius applied to different element types.",...i.parameters?.docs?.description}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: () => <div style={styles.container}>
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Border Colors</h2>
        <p style={styles.sectionDescription}>
          Use semantic border colors to communicate state and hierarchy.
        </p>
        
        <div style={styles.previewBox}>
          <div style={styles.grid}>
            {borderColorTokens.map(token => <div key={token.name} style={{
            textAlign: 'center'
          }}>
                <div style={{
              width: '100%',
              height: '60px',
              backgroundColor: 'white',
              border: \`2px solid \${token.value}\`,
              borderRadius: '8px',
              marginBottom: '0.75rem'
            }} />
                <div style={styles.valueLabel}>{token.label}</div>
                <div style={styles.tokenLabel}>{token.name}</div>
                <div style={{
              fontSize: '0.625rem',
              color: 'var(--color-gray-400)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.25rem'
            }}>
                  <span style={{
                width: '10px',
                height: '10px',
                backgroundColor: token.value,
                borderRadius: '2px',
                display: 'inline-block'
              }} />
                  {token.value}
                </div>
              </div>)}
          </div>
        </div>
      </div>
    </div>
}`,...d.parameters?.docs?.source},description:{story:"Border colors for different states and purposes.",...d.parameters?.docs?.description}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  render: () => <div style={styles.container}>
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Border States</h2>
        <p style={styles.sectionDescription}>
          Interactive elements change border color to indicate state.
        </p>
        
        <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem'
      }}>
          {/* Input States */}
          <div>
            <p style={styles.label}>Input Field States</p>
            <div style={styles.previewBox}>
              <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1.5rem'
            }}>
                <div>
                  <label style={{
                  display: 'block',
                  fontSize: '0.75rem',
                  marginBottom: '0.5rem',
                  color: 'var(--color-gray-600)'
                }}>Default</label>
                  <input type="text" placeholder="Enter text..." style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  border: '1px solid var(--color-gray-300)',
                  borderRadius: '4px',
                  fontSize: '0.875rem'
                }} />
                </div>
                <div>
                  <label style={{
                  display: 'block',
                  fontSize: '0.75rem',
                  marginBottom: '0.5rem',
                  color: 'var(--color-gray-600)'
                }}>Focus</label>
                  <input type="text" placeholder="Focused input" style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  border: '1px solid var(--color-blue-cobalt)',
                  borderRadius: '4px',
                  fontSize: '0.875rem',
                  boxShadow: '0 0 0 2px rgba(27, 95, 138, 0.2)',
                  outline: 'none'
                }} />
                </div>
                <div>
                  <label style={{
                  display: 'block',
                  fontSize: '0.75rem',
                  marginBottom: '0.5rem',
                  color: 'var(--color-gray-600)'
                }}>Error</label>
                  <input type="text" placeholder="Invalid input" style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  border: '1px solid var(--color-error)',
                  borderRadius: '4px',
                  fontSize: '0.875rem'
                }} />
                  <span style={{
                  fontSize: '0.75rem',
                  color: 'var(--color-error)',
                  marginTop: '0.25rem',
                  display: 'block'
                }}>This field is required</span>
                </div>
                <div>
                  <label style={{
                  display: 'block',
                  fontSize: '0.75rem',
                  marginBottom: '0.5rem',
                  color: 'var(--color-gray-600)'
                }}>Success</label>
                  <input type="text" value="Valid input" readOnly style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  border: '1px solid var(--color-success)',
                  borderRadius: '4px',
                  fontSize: '0.875rem'
                }} />
                </div>
                <div>
                  <label style={{
                  display: 'block',
                  fontSize: '0.75rem',
                  marginBottom: '0.5rem',
                  color: 'var(--color-gray-600)'
                }}>Disabled</label>
                  <input type="text" placeholder="Disabled" disabled style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  border: '1px solid var(--color-gray-200)',
                  borderRadius: '4px',
                  fontSize: '0.875rem',
                  backgroundColor: 'var(--color-gray-50)',
                  opacity: 0.6
                }} />
                </div>
              </div>
            </div>
          </div>
          
          {/* Card States */}
          <div>
            <p style={styles.label}>Card Selection States</p>
            <div style={styles.previewBox}>
              <div style={{
              display: 'flex',
              gap: '1.5rem',
              flexWrap: 'wrap'
            }}>
                <div style={{
                padding: '1.5rem',
                backgroundColor: 'white',
                border: '1px solid var(--color-gray-200)',
                borderRadius: '8px',
                width: '160px',
                textAlign: 'center'
              }}>
                  <div style={{
                  fontWeight: 500,
                  marginBottom: '0.25rem'
                }}>Default</div>
                  <div style={{
                  fontSize: '0.75rem',
                  color: 'var(--color-gray-500)'
                }}>Not selected</div>
                </div>
                <div style={{
                padding: '1.5rem',
                backgroundColor: 'white',
                border: '2px solid var(--color-blue-cobalt)',
                borderRadius: '8px',
                width: '160px',
                textAlign: 'center',
                boxShadow: '0 0 0 2px rgba(27, 95, 138, 0.1)'
              }}>
                  <div style={{
                  fontWeight: 500,
                  marginBottom: '0.25rem',
                  color: 'var(--color-blue-cobalt)'
                }}>Selected</div>
                  <div style={{
                  fontSize: '0.75rem',
                  color: 'var(--color-gray-500)'
                }}>Active choice</div>
                </div>
                <div style={{
                padding: '1.5rem',
                backgroundColor: 'var(--color-gray-50)',
                border: '1px dashed var(--color-gray-300)',
                borderRadius: '8px',
                width: '160px',
                textAlign: 'center'
              }}>
                  <div style={{
                  fontWeight: 500,
                  marginBottom: '0.25rem',
                  color: 'var(--color-gray-400)'
                }}>Disabled</div>
                  <div style={{
                  fontSize: '0.75rem',
                  color: 'var(--color-gray-400)'
                }}>Unavailable</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
}`,...t.parameters?.docs?.source},description:{story:"Border states for interactive elements.",...t.parameters?.docs?.description}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: () => <div style={styles.container}>
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Border Widths & Styles</h2>
        <p style={styles.sectionDescription}>
          Standard border widths and line styles used in the design system.
        </p>
        
        <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem'
      }}>
          {/* Border Widths */}
          <div>
            <p style={styles.label}>Border Widths</p>
            <div style={styles.previewBox}>
              <div style={{
              display: 'flex',
              gap: '2rem',
              flexWrap: 'wrap'
            }}>
                {[{
                width: '1px',
                label: '1px (Default)',
                use: 'Cards, inputs, dividers'
              }, {
                width: '2px',
                label: '2px (Emphasis)',
                use: 'Focus states, selected items'
              }, {
                width: '3px',
                label: '3px (Strong)',
                use: 'Active tabs, highlights'
              }].map(({
                width,
                label,
                use
              }) => <div key={width} style={{
                textAlign: 'center'
              }}>
                    <div style={{
                  width: '120px',
                  height: '60px',
                  backgroundColor: 'white',
                  border: \`\${width} solid var(--color-blue-cobalt)\`,
                  borderRadius: '8px',
                  marginBottom: '0.75rem'
                }} />
                    <div style={styles.valueLabel}>{label}</div>
                    <div style={{
                  fontSize: '0.625rem',
                  color: 'var(--color-gray-500)',
                  marginTop: '0.25rem'
                }}>{use}</div>
                  </div>)}
              </div>
            </div>
          </div>
          
          {/* Border Styles */}
          <div>
            <p style={styles.label}>Border Styles</p>
            <div style={styles.previewBox}>
              <div style={{
              display: 'flex',
              gap: '2rem',
              flexWrap: 'wrap'
            }}>
                {[{
                style: 'solid',
                label: 'Solid',
                use: 'Default for most elements'
              }, {
                style: 'dashed',
                label: 'Dashed',
                use: 'Drop zones, placeholders'
              }, {
                style: 'dotted',
                label: 'Dotted',
                use: 'Subtle separators'
              }].map(({
                style,
                label,
                use
              }) => <div key={style} style={{
                textAlign: 'center'
              }}>
                    <div style={{
                  width: '120px',
                  height: '60px',
                  backgroundColor: 'white',
                  border: \`2px \${style} var(--color-gray-300)\`,
                  borderRadius: '8px',
                  marginBottom: '0.75rem'
                }} />
                    <div style={styles.valueLabel}>{label}</div>
                    <div style={{
                  fontSize: '0.625rem',
                  color: 'var(--color-gray-500)',
                  marginTop: '0.25rem'
                }}>{use}</div>
                  </div>)}
              </div>
            </div>
          </div>
          
          {/* Dividers */}
          <div>
            <p style={styles.label}>Dividers</p>
            <div style={styles.previewBox}>
              <div style={{
              maxWidth: '400px'
            }}>
                <div style={{
                padding: '1rem 0'
              }}>Content above divider</div>
                <hr style={{
                border: 'none',
                borderTop: '1px solid var(--color-gray-200)',
                margin: 0
              }} />
                <div style={{
                padding: '1rem 0'
              }}>Content below divider</div>
                <hr style={{
                border: 'none',
                borderTop: '2px solid var(--color-gray-100)',
                margin: 0
              }} />
                <div style={{
                padding: '1rem 0'
              }}>Thicker divider above</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
}`,...s.parameters?.docs?.source},description:{story:"Border widths and styles.",...s.parameters?.docs?.description}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: () => <div style={styles.container}>
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Implementation</h2>
        
        <h3 style={{
        fontSize: '1rem',
        fontWeight: 500,
        marginBottom: '0.5rem'
      }}>CSS Variables</h3>
        <pre style={styles.codeBlock}>
        {\`:root {
  /* Border Radius */
  --border-radius-sm: 4px;      /* Inputs, small buttons */
  --border-radius-md: 6px;      /* Cards, dropdowns */
  --border-radius-lg: 8px;      /* Modals, large cards */
  --border-radius-xl: 12px;     /* Hero cards */
  --border-radius-2xl: 16px;    /* Feature cards */
  --border-radius-full: 9999px; /* Avatars, pills */
  
  /* Border Colors */
  --color-gray-200: #e5e5e5;    /* Light borders, dividers */
  --color-gray-300: #cdcdcd;    /* Default input borders */
  --color-blue-cobalt: #1B5F8A; /* Focus, active states */
  --color-error: #ef4444;       /* Error states */
  --color-success: #26870D;     /* Success states */
}\`}
        </pre>

        <h3 style={{
        fontSize: '1rem',
        fontWeight: 500,
        marginTop: '2rem',
        marginBottom: '0.5rem'
      }}>Usage Examples</h3>
        <pre style={styles.codeBlock}>
        {\`/* Card with standard border */
.card {
  border: 1px solid var(--color-gray-200);
  border-radius: var(--border-radius-lg);
}

/* Input with focus state */
.input {
  border: 1px solid var(--color-gray-300);
  border-radius: var(--border-radius-sm);
}

.input:focus {
  border-color: var(--color-blue-cobalt);
  box-shadow: 0 0 0 2px rgba(27, 95, 138, 0.2);
}

/* Error state */
.input--error {
  border-color: var(--color-error);
}

/* Avatar (circular) */
.avatar {
  border-radius: var(--border-radius-full);
}

/* Pill badge */
.badge {
  border-radius: var(--border-radius-full);
  padding: 0.25rem 0.75rem;
}\`}
        </pre>

        <h3 style={{
        fontSize: '1rem',
        fontWeight: 500,
        marginTop: '2rem',
        marginBottom: '0.5rem'
      }}>Tailwind-Style Utilities</h3>
        <pre style={styles.codeBlock}>
        {\`/* If using utility classes */
.rounded-sm { border-radius: var(--border-radius-sm); }
.rounded-md { border-radius: var(--border-radius-md); }
.rounded-lg { border-radius: var(--border-radius-lg); }
.rounded-xl { border-radius: var(--border-radius-xl); }
.rounded-2xl { border-radius: var(--border-radius-2xl); }
.rounded-full { border-radius: var(--border-radius-full); }

.border { border: 1px solid var(--color-gray-200); }
.border-2 { border: 2px solid var(--color-gray-200); }
.border-gray-300 { border-color: var(--color-gray-300); }
.border-blue { border-color: var(--color-blue-cobalt); }
.border-error { border-color: var(--color-error); }\`}
        </pre>

        <h3 style={{
        fontSize: '1rem',
        fontWeight: 500,
        marginTop: '2rem',
        marginBottom: '0.5rem'
      }}>Best Practices</h3>
        <pre style={styles.codeBlock}>
        {\`/* DO: Use consistent radius within component families */
.card { border-radius: var(--border-radius-lg); }
.card__image { border-radius: var(--border-radius-md); }
.card__button { border-radius: var(--border-radius-sm); }

/* DO: Use semantic border colors */
.input:focus { border-color: var(--color-blue-cobalt); }
.input--error { border-color: var(--color-error); }
.input--success { border-color: var(--color-success); }

/* DON'T: Mix arbitrary radius values */
/* Bad: border-radius: 7px; */
/* Good: border-radius: var(--border-radius-lg); */

/* DON'T: Use hard-coded border colors */
/* Bad: border: 1px solid #ccc; */
/* Good: border: 1px solid var(--color-gray-300); */\`}
        </pre>
      </div>
    </div>
}`,...a.parameters?.docs?.source},description:{story:"Implementation code and CSS variables.",...a.parameters?.docs?.description}}};const b=["BorderRadius","RadiusUseCases","BorderColors","BorderStates","BorderStyles","Implementation"];export{d as BorderColors,l as BorderRadius,t as BorderStates,s as BorderStyles,a as Implementation,i as RadiusUseCases,b as __namedExportsOrder,u as default};
