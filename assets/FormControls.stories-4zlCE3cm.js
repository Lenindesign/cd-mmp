import{j as e,r as p}from"./iframe-DIdqqM8u.js";import{S as P}from"./search-Be7Paw65.js";import{E as $,a as M}from"./eye-C3zaQzPg.js";import{X as O}from"./x-Clpn9Bq_.js";import{C as R}from"./check-J5ZhHl2w.js";import{C as N}from"./chevron-down-CkMsvG2m.js";import"./preload-helper-PPVm8Dsz.js";import"./createLucideIcon-N_7SJ2wa.js";const o={container:{padding:"2rem",fontFamily:"var(--font-body)"},section:{marginBottom:"3rem"},sectionTitle:{fontSize:"1.5rem",fontWeight:600,marginBottom:"1rem",color:"var(--color-gray-900, #1a1a1a)"},sectionDescription:{color:"var(--color-gray-600, #666)",marginBottom:"1.5rem",lineHeight:1.6},previewBox:{padding:"2rem",backgroundColor:"var(--color-gray-50, #f9f9f9)",borderRadius:"12px",border:"1px solid var(--color-gray-200, #e5e5e5)",marginBottom:"1rem"},grid:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(280px, 1fr))",gap:"2rem"},label:{fontSize:"0.75rem",color:"var(--color-gray-500, #888)",marginBottom:"0.5rem",textTransform:"uppercase",letterSpacing:"0.05em"},codeBlock:{backgroundColor:"var(--color-gray-900, #1a1a1a)",color:"#e5e5e5",padding:"1rem",borderRadius:"8px",fontSize:"0.875rem",fontFamily:"monospace",overflow:"auto",marginTop:"1rem"}},n={wrapper:{display:"flex",flexDirection:"column",gap:"0.5rem"},label:{fontSize:"0.875rem",fontWeight:500,color:"var(--color-gray-700, #374151)"},input:{width:"100%",minHeight:"44px",padding:"0.75rem 1rem",fontSize:"1rem",fontFamily:"Inter, sans-serif",color:"var(--color-dark, #222)",backgroundColor:"var(--color-white, #fff)",border:"1px solid var(--color-gray-300, #d1d5db)",borderRadius:"4px",outline:"none",transition:"border-color 0.15s ease, box-shadow 0.15s ease"},inputFocus:{borderColor:"var(--color-blue-cobalt, #2676DF)",boxShadow:"0 0 0 2px rgba(38, 118, 223, 0.2)"},inputError:{borderColor:"var(--color-error, #ef4444)"},helperText:{fontSize:"0.75rem",color:"var(--color-gray-500, #888)"},errorText:{fontSize:"0.75rem",color:"var(--color-error, #ef4444)"}},x=({label:s,placeholder:a,helperText:r,error:t,type:l="text",disabled:c=!1,value:d,onChange:i})=>{const[m,y]=p.useState(!1),[v,F]=p.useState(!1),[u,W]=p.useState(d||""),z=d!==void 0?d:u,A=V=>{const E=V.target.value;W(E),i?.(E)},U=l==="password"&&v?"text":l;return e.jsxs("div",{style:n.wrapper,children:[s&&e.jsx("label",{style:n.label,children:s}),e.jsxs("div",{style:{position:"relative"},children:[l==="search"&&e.jsx(P,{size:18,style:{position:"absolute",left:"12px",top:"50%",transform:"translateY(-50%)",color:"var(--color-gray-400)"}}),e.jsx("input",{type:U,placeholder:a,disabled:c,value:z,onChange:A,onFocus:()=>y(!0),onBlur:()=>y(!1),style:{...n.input,...m?n.inputFocus:{},...t?n.inputError:{},...c?{opacity:.5,cursor:"not-allowed"}:{},...l==="search"?{paddingLeft:"40px"}:{},...l==="password"?{paddingRight:"44px"}:{}}}),l==="password"&&e.jsx("button",{type:"button",onClick:()=>F(!v),style:{position:"absolute",right:"12px",top:"50%",transform:"translateY(-50%)",background:"none",border:"none",cursor:"pointer",color:"var(--color-gray-400)",display:"flex",alignItems:"center",justifyContent:"center"},children:v?e.jsx($,{size:18}):e.jsx(M,{size:18})}),l==="search"&&z&&e.jsx("button",{type:"button",onClick:()=>{W(""),i?.("")},style:{position:"absolute",right:"12px",top:"50%",transform:"translateY(-50%)",background:"none",border:"none",cursor:"pointer",color:"var(--color-gray-400)",display:"flex",alignItems:"center",justifyContent:"center"},children:e.jsx(O,{size:18})})]}),t&&e.jsx("span",{style:n.errorText,children:t}),r&&!t&&e.jsx("span",{style:n.helperText,children:r})]})},h=({label:s,checked:a=!1,disabled:r=!1,onChange:t})=>{const[l,c]=p.useState(a),d=()=>{if(r)return;const i=!l;c(i),t?.(i)};return e.jsxs("label",{style:{display:"flex",alignItems:"center",gap:"0.75rem",cursor:r?"not-allowed":"pointer",opacity:r?.5:1},children:[e.jsx("div",{onClick:d,style:{width:"20px",height:"20px",borderRadius:"4px",border:`2px solid ${l?"var(--color-blue-cobalt, #2676DF)":"var(--color-gray-300, #d1d5db)"}`,backgroundColor:l?"var(--color-blue-cobalt, #2676DF)":"transparent",display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.15s ease",flexShrink:0},children:l&&e.jsx(R,{size:14,color:"white",strokeWidth:3})}),e.jsx("span",{style:{fontSize:"0.875rem",color:"var(--color-gray-700, #374151)"},children:s})]})},q=({label:s,name:a,value:r,checked:t=!1,disabled:l=!1,onChange:c})=>e.jsxs("label",{style:{display:"flex",alignItems:"center",gap:"0.75rem",cursor:l?"not-allowed":"pointer",opacity:l?.5:1},children:[e.jsx("div",{onClick:()=>!l&&c?.(r),style:{width:"20px",height:"20px",borderRadius:"50%",border:`2px solid ${t?"var(--color-blue-cobalt, #2676DF)":"var(--color-gray-300, #d1d5db)"}`,backgroundColor:"transparent",display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.15s ease",flexShrink:0},children:t&&e.jsx("div",{style:{width:"10px",height:"10px",borderRadius:"50%",backgroundColor:"var(--color-blue-cobalt, #2676DF)"}})}),e.jsx("span",{style:{fontSize:"0.875rem",color:"var(--color-gray-700, #374151)"},children:s})]}),I=({name:s,options:a,value:r,onChange:t})=>{const[l,c]=p.useState(r||""),d=i=>{c(i),t?.(i)};return e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:"0.75rem"},children:a.map(i=>e.jsx(q,{name:s,value:i.value,label:i.label,checked:l===i.value,onChange:d},i.value))})},D=({label:s,checked:a=!1,disabled:r=!1,onChange:t})=>{const[l,c]=p.useState(a),d=()=>{if(r)return;const i=!l;c(i),t?.(i)};return e.jsxs("label",{style:{display:"flex",alignItems:"center",gap:"0.75rem",cursor:r?"not-allowed":"pointer",opacity:r?.5:1},children:[e.jsx("div",{onClick:d,style:{width:"44px",height:"24px",borderRadius:"12px",backgroundColor:l?"var(--color-blue-cobalt, #2676DF)":"var(--color-gray-300, #d1d5db)",position:"relative",transition:"background-color 0.2s ease",flexShrink:0},children:e.jsx("div",{style:{width:"20px",height:"20px",borderRadius:"50%",backgroundColor:"white",position:"absolute",top:"2px",left:l?"22px":"2px",transition:"left 0.2s ease",boxShadow:"0 1px 3px rgba(0,0,0,0.2)"}})}),s&&e.jsx("span",{style:{fontSize:"0.875rem",color:"var(--color-gray-700, #374151)"},children:s})]})},T=({label:s,options:a,value:r,placeholder:t="Select an option",disabled:l=!1,onChange:c})=>{const[d,i]=p.useState(!1),[m,y]=p.useState(r||""),v=a.find(u=>u.value===m),F=u=>{y(u),i(!1),c?.(u)};return e.jsxs("div",{style:n.wrapper,children:[s&&e.jsx("label",{style:n.label,children:s}),e.jsxs("div",{style:{position:"relative"},children:[e.jsxs("button",{type:"button",disabled:l,onClick:()=>!l&&i(!d),style:{...n.input,display:"flex",alignItems:"center",justifyContent:"space-between",cursor:l?"not-allowed":"pointer",opacity:l?.5:1,textAlign:"left",color:m?"var(--color-dark)":"var(--color-gray-400)"},children:[e.jsx("span",{children:v?.label||t}),e.jsx(N,{size:18,style:{transform:d?"rotate(180deg)":"rotate(0deg)",transition:"transform 0.2s ease",color:"var(--color-gray-400)"}})]}),d&&e.jsx("div",{style:{position:"absolute",top:"100%",left:0,right:0,marginTop:"4px",backgroundColor:"white",border:"1px solid var(--color-gray-200)",borderRadius:"4px",boxShadow:"0 4px 12px rgba(0,0,0,0.1)",zIndex:10,maxHeight:"200px",overflowY:"auto"},children:a.map(u=>e.jsxs("button",{type:"button",onClick:()=>F(u.value),style:{width:"100%",padding:"0.75rem 1rem",textAlign:"left",border:"none",background:m===u.value?"var(--color-gray-100)":"transparent",cursor:"pointer",fontSize:"0.875rem",color:"var(--color-gray-700)",display:"flex",alignItems:"center",justifyContent:"space-between"},children:[u.label,m===u.value&&e.jsx(R,{size:16,color:"var(--color-blue-cobalt)"})]},u.value))})]})]})},B=({label:s,placeholder:a,helperText:r,error:t,rows:l=4,disabled:c=!1,value:d,onChange:i})=>{const[m,y]=p.useState(!1);return e.jsxs("div",{style:n.wrapper,children:[s&&e.jsx("label",{style:n.label,children:s}),e.jsx("textarea",{placeholder:a,disabled:c,rows:l,value:d,onChange:v=>i?.(v.target.value),onFocus:()=>y(!0),onBlur:()=>y(!1),style:{...n.input,minHeight:"auto",resize:"vertical",...m?n.inputFocus:{},...t?n.inputError:{},...c?{opacity:.5,cursor:"not-allowed"}:{}}}),t&&e.jsx("span",{style:n.errorText,children:t}),r&&!t&&e.jsx("span",{style:n.helperText,children:r})]})},Q={title:"Elements/Form Controls",parameters:{layout:"fullscreen",docs:{description:{component:"Core form elements including inputs, checkboxes, radios, toggles, and selects."}}}},b={render:()=>e.jsx("div",{style:o.container,children:e.jsxs("div",{style:o.section,children:[e.jsx("h2",{style:o.sectionTitle,children:"Text Inputs"}),e.jsx("p",{style:o.sectionDescription,children:"Standard text inputs with support for labels, helper text, and error states."}),e.jsxs("div",{style:o.grid,children:[e.jsx(x,{label:"Email Address",type:"email",placeholder:"john@example.com",helperText:"We'll never share your email"}),e.jsx(x,{label:"Password",type:"password",placeholder:"Enter password"}),e.jsx(x,{label:"Search",type:"search",placeholder:"Search vehicles..."}),e.jsx(x,{label:"With Error",placeholder:"Enter value",error:"This field is required"}),e.jsx(x,{label:"Disabled",placeholder:"Cannot edit",disabled:!0})]})]})})},f={render:()=>{const[s,a]=p.useState({option1:!1,option2:!0,option3:!1});return e.jsx("div",{style:o.container,children:e.jsxs("div",{style:o.section,children:[e.jsx("h2",{style:o.sectionTitle,children:"Checkboxes"}),e.jsx("p",{style:o.sectionDescription,children:"Use checkboxes for multiple selections or boolean toggles."}),e.jsx("div",{style:o.previewBox,children:e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"1rem"},children:[e.jsx(h,{label:"I agree to the terms and conditions",checked:s.option1,onChange:r=>a(t=>({...t,option1:r}))}),e.jsx(h,{label:"Subscribe to newsletter",checked:s.option2,onChange:r=>a(t=>({...t,option2:r}))}),e.jsx(h,{label:"Remember my preferences",checked:s.option3,onChange:r=>a(t=>({...t,option3:r}))}),e.jsx(h,{label:"Disabled option",disabled:!0}),e.jsx(h,{label:"Disabled checked",checked:!0,disabled:!0})]})})]})})}},g={render:()=>e.jsx("div",{style:o.container,children:e.jsxs("div",{style:o.section,children:[e.jsx("h2",{style:o.sectionTitle,children:"Radio Buttons"}),e.jsx("p",{style:o.sectionDescription,children:"Use radio buttons when users must select exactly one option from a group."}),e.jsxs("div",{style:o.grid,children:[e.jsxs("div",{children:[e.jsx("p",{style:o.label,children:"Drivetrain"}),e.jsx("div",{style:o.previewBox,children:e.jsx(I,{name:"drivetrain",options:[{value:"fwd",label:"Front-Wheel Drive (FWD)"},{value:"rwd",label:"Rear-Wheel Drive (RWD)"},{value:"awd",label:"All-Wheel Drive (AWD)"},{value:"4wd",label:"Four-Wheel Drive (4WD)"}]})})]}),e.jsxs("div",{children:[e.jsx("p",{style:o.label,children:"Condition"}),e.jsx("div",{style:o.previewBox,children:e.jsx(I,{name:"condition",options:[{value:"new",label:"New"},{value:"used",label:"Used"},{value:"cpo",label:"Certified Pre-Owned"}],value:"new"})})]})]})]})})},j={render:()=>{const[s,a]=p.useState(!0),[r,t]=p.useState(!1),[l,c]=p.useState(!0);return e.jsx("div",{style:o.container,children:e.jsxs("div",{style:o.section,children:[e.jsx("h2",{style:o.sectionTitle,children:"Toggles / Switches"}),e.jsx("p",{style:o.sectionDescription,children:"Toggles are used for binary settings that take effect immediately."}),e.jsx("div",{style:o.previewBox,children:e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"1.5rem",maxWidth:"300px"},children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[e.jsxs("div",{children:[e.jsx("div",{style:{fontWeight:500,marginBottom:"0.25rem"},children:"Push Notifications"}),e.jsx("div",{style:{fontSize:"0.75rem",color:"var(--color-gray-500)"},children:"Receive alerts for price drops"})]}),e.jsx(D,{checked:s,onChange:a})]}),e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[e.jsxs("div",{children:[e.jsx("div",{style:{fontWeight:500,marginBottom:"0.25rem"},children:"Dark Mode"}),e.jsx("div",{style:{fontSize:"0.75rem",color:"var(--color-gray-500)"},children:"Use dark theme"})]}),e.jsx(D,{checked:r,onChange:t})]}),e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[e.jsxs("div",{children:[e.jsx("div",{style:{fontWeight:500,marginBottom:"0.25rem"},children:"Auto-save Searches"}),e.jsx("div",{style:{fontSize:"0.75rem",color:"var(--color-gray-500)"},children:"Save your search history"})]}),e.jsx(D,{checked:l,onChange:c})]}),e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",opacity:.5},children:[e.jsxs("div",{children:[e.jsx("div",{style:{fontWeight:500,marginBottom:"0.25rem"},children:"Disabled Toggle"}),e.jsx("div",{style:{fontSize:"0.75rem",color:"var(--color-gray-500)"},children:"This option is unavailable"})]}),e.jsx(D,{disabled:!0})]})]})})]})})}},S={render:()=>e.jsx("div",{style:o.container,children:e.jsxs("div",{style:o.section,children:[e.jsx("h2",{style:o.sectionTitle,children:"Select Dropdowns"}),e.jsx("p",{style:o.sectionDescription,children:"Use select dropdowns when users need to choose one option from a longer list."}),e.jsxs("div",{style:o.grid,children:[e.jsx(T,{label:"Body Style",placeholder:"Select body style",options:[{value:"sedan",label:"Sedan"},{value:"suv",label:"SUV"},{value:"truck",label:"Truck"},{value:"coupe",label:"Coupe"},{value:"hatchback",label:"Hatchback"},{value:"convertible",label:"Convertible"},{value:"wagon",label:"Wagon"}]}),e.jsx(T,{label:"Price Range",placeholder:"Select price range",options:[{value:"under-20k",label:"Under $20,000"},{value:"20k-30k",label:"$20,000 - $30,000"},{value:"30k-50k",label:"$30,000 - $50,000"},{value:"50k-75k",label:"$50,000 - $75,000"},{value:"over-75k",label:"Over $75,000"}],value:"30k-50k"}),e.jsx(T,{label:"Disabled Select",placeholder:"Cannot select",disabled:!0,options:[{value:"option1",label:"Option 1"}]})]})]})})},k={render:()=>e.jsx("div",{style:o.container,children:e.jsxs("div",{style:o.section,children:[e.jsx("h2",{style:o.sectionTitle,children:"Textareas"}),e.jsx("p",{style:o.sectionDescription,children:"Use textareas for longer form text input like comments or messages."}),e.jsxs("div",{style:o.grid,children:[e.jsx(B,{label:"Message to Dealer",placeholder:"Write your message here...",helperText:"Be specific about your questions or requirements"}),e.jsx(B,{label:"With Error",placeholder:"Enter description...",error:"Please enter at least 20 characters",rows:3})]})]})})},w={render:()=>{const[s,a]=p.useState({name:"",email:"",bodyStyle:"",features:{awd:!1,sunroof:!1,leather:!0},condition:"new",notifications:!0,message:""});return e.jsx("div",{style:o.container,children:e.jsxs("div",{style:o.section,children:[e.jsx("h2",{style:o.sectionTitle,children:"Complete Form Example"}),e.jsx("p",{style:o.sectionDescription,children:"A realistic form combining multiple control types."}),e.jsxs("div",{style:{maxWidth:"500px",padding:"2rem",backgroundColor:"white",borderRadius:"12px",border:"1px solid var(--color-gray-200)"},children:[e.jsx("h3",{style:{fontSize:"1.25rem",fontWeight:600,marginBottom:"1.5rem"},children:"Contact Dealer"}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"1.5rem"},children:[e.jsx(x,{label:"Full Name",placeholder:"John Smith",value:s.name,onChange:r=>a(t=>({...t,name:r}))}),e.jsx(x,{label:"Email Address",type:"email",placeholder:"john@example.com",value:s.email,onChange:r=>a(t=>({...t,email:r}))}),e.jsx(T,{label:"Interested Body Style",placeholder:"Select body style",value:s.bodyStyle,onChange:r=>a(t=>({...t,bodyStyle:r})),options:[{value:"sedan",label:"Sedan"},{value:"suv",label:"SUV"},{value:"truck",label:"Truck"}]}),e.jsxs("div",{children:[e.jsx("label",{style:n.label,children:"Desired Features"}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"0.75rem",marginTop:"0.5rem"},children:[e.jsx(h,{label:"All-Wheel Drive",checked:s.features.awd,onChange:r=>a(t=>({...t,features:{...t.features,awd:r}}))}),e.jsx(h,{label:"Sunroof",checked:s.features.sunroof,onChange:r=>a(t=>({...t,features:{...t.features,sunroof:r}}))}),e.jsx(h,{label:"Leather Seats",checked:s.features.leather,onChange:r=>a(t=>({...t,features:{...t.features,leather:r}}))})]})]}),e.jsxs("div",{children:[e.jsx("label",{style:n.label,children:"Vehicle Condition"}),e.jsx("div",{style:{marginTop:"0.5rem"},children:e.jsx(I,{name:"condition",value:s.condition,onChange:r=>a(t=>({...t,condition:r})),options:[{value:"new",label:"New"},{value:"used",label:"Used"},{value:"cpo",label:"Certified Pre-Owned"}]})})]}),e.jsx(B,{label:"Additional Message",placeholder:"Any specific questions or requirements...",value:s.message,onChange:r=>a(t=>({...t,message:r})),rows:3}),e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[e.jsx("span",{style:{fontSize:"0.875rem"},children:"Email me updates"}),e.jsx(D,{checked:s.notifications,onChange:r=>a(t=>({...t,notifications:r}))})]}),e.jsx("button",{style:{width:"100%",padding:"0.875rem",backgroundColor:"var(--color-blue-cobalt, #2676DF)",color:"white",border:"none",borderRadius:"4px",fontSize:"1rem",fontWeight:600,cursor:"pointer"},children:"Submit Inquiry"})]})]})]})})}},C={render:()=>e.jsx("div",{style:o.container,children:e.jsxs("div",{style:o.section,children:[e.jsx("h2",{style:o.sectionTitle,children:"Implementation"}),e.jsx("h3",{style:{fontSize:"1rem",fontWeight:500,marginBottom:"0.5rem"},children:"Base Input Styles"}),e.jsx("pre",{style:o.codeBlock,children:`.form-input {
  width: 100%;
  min-height: 44px;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  font-family: Inter, sans-serif;
  color: var(--color-dark);
  background-color: var(--color-white);
  border: 1px solid var(--color-gray-300);
  border-radius: 4px;
  outline: none;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
}

.form-input:focus {
  border-color: var(--color-blue-cobalt);
  box-shadow: 0 0 0 2px rgba(38, 118, 223, 0.2);
}

.form-input--error {
  border-color: var(--color-error);
}

.form-input:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}`}),e.jsx("h3",{style:{fontSize:"1rem",fontWeight:500,marginTop:"2rem",marginBottom:"0.5rem"},children:"CSS Variables Used"}),e.jsx("pre",{style:o.codeBlock,children:`/* Form colors */
--color-blue-cobalt: #1B5F8A    /* Focus states, selected items */
--color-gray-300: #d1d5db       /* Default borders */
--color-gray-400: #999          /* Placeholder text */
--color-gray-500: #888          /* Helper text */
--color-gray-700: #374151       /* Labels, input text */
--color-error: #ef4444          /* Error states */

/* Sizing */
--min-touch-target: 44px        /* Minimum interactive element size */
--border-radius-sm: 4px         /* Input border radius */

/* Transitions */
--transition-fast: 150ms ease   /* Focus/hover transitions */`}),e.jsx("h3",{style:{fontSize:"1rem",fontWeight:500,marginTop:"2rem",marginBottom:"0.5rem"},children:"Accessibility Notes"}),e.jsx("pre",{style:o.codeBlock,children:`/* Ensure all form controls have:
 * - Visible focus indicators (2px outline)
 * - Associated labels (use htmlFor/id)
 * - Error messages linked via aria-describedby
 * - Minimum 44px touch target
 * - Sufficient color contrast (4.5:1 for text)
 */

<label htmlFor="email">Email</label>
<input 
  id="email"
  type="email"
  aria-describedby="email-error"
  aria-invalid={hasError}
/>
{hasError && (
  <span id="email-error" role="alert">
    Please enter a valid email
  </span>
)}`})]})})};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  render: () => <div style={styles.container}>
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Text Inputs</h2>
        <p style={styles.sectionDescription}>
          Standard text inputs with support for labels, helper text, and error states.
        </p>
        
        <div style={styles.grid}>
          <TextInput label="Email Address" type="email" placeholder="john@example.com" helperText="We'll never share your email" />
          <TextInput label="Password" type="password" placeholder="Enter password" />
          <TextInput label="Search" type="search" placeholder="Search vehicles..." />
          <TextInput label="With Error" placeholder="Enter value" error="This field is required" />
          <TextInput label="Disabled" placeholder="Cannot edit" disabled />
        </div>
      </div>
    </div>
}`,...b.parameters?.docs?.source},description:{story:"Text input variations including search and password fields.",...b.parameters?.docs?.description}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [values, setValues] = useState({
      option1: false,
      option2: true,
      option3: false
    });
    return <div style={styles.container}>
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Checkboxes</h2>
          <p style={styles.sectionDescription}>
            Use checkboxes for multiple selections or boolean toggles.
          </p>
          
          <div style={styles.previewBox}>
            <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}>
              <Checkbox label="I agree to the terms and conditions" checked={values.option1} onChange={checked => setValues(v => ({
              ...v,
              option1: checked
            }))} />
              <Checkbox label="Subscribe to newsletter" checked={values.option2} onChange={checked => setValues(v => ({
              ...v,
              option2: checked
            }))} />
              <Checkbox label="Remember my preferences" checked={values.option3} onChange={checked => setValues(v => ({
              ...v,
              option3: checked
            }))} />
              <Checkbox label="Disabled option" disabled />
              <Checkbox label="Disabled checked" checked disabled />
            </div>
          </div>
        </div>
      </div>;
  }
}`,...f.parameters?.docs?.source},description:{story:"Checkbox controls for boolean selections.",...f.parameters?.docs?.description}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: () => <div style={styles.container}>
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Radio Buttons</h2>
        <p style={styles.sectionDescription}>
          Use radio buttons when users must select exactly one option from a group.
        </p>
        
        <div style={styles.grid}>
          <div>
            <p style={styles.label}>Drivetrain</p>
            <div style={styles.previewBox}>
              <RadioGroup name="drivetrain" options={[{
              value: 'fwd',
              label: 'Front-Wheel Drive (FWD)'
            }, {
              value: 'rwd',
              label: 'Rear-Wheel Drive (RWD)'
            }, {
              value: 'awd',
              label: 'All-Wheel Drive (AWD)'
            }, {
              value: '4wd',
              label: 'Four-Wheel Drive (4WD)'
            }]} />
            </div>
          </div>
          
          <div>
            <p style={styles.label}>Condition</p>
            <div style={styles.previewBox}>
              <RadioGroup name="condition" options={[{
              value: 'new',
              label: 'New'
            }, {
              value: 'used',
              label: 'Used'
            }, {
              value: 'cpo',
              label: 'Certified Pre-Owned'
            }]} value="new" />
            </div>
          </div>
        </div>
      </div>
    </div>
}`,...g.parameters?.docs?.source},description:{story:"Radio buttons for single selection from multiple options.",...g.parameters?.docs?.description}}};j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [notifications, setNotifications] = useState(true);
    const [darkMode, setDarkMode] = useState(false);
    const [autoSave, setAutoSave] = useState(true);
    return <div style={styles.container}>
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Toggles / Switches</h2>
          <p style={styles.sectionDescription}>
            Toggles are used for binary settings that take effect immediately.
          </p>
          
          <div style={styles.previewBox}>
            <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
            maxWidth: '300px'
          }}>
              <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
                <div>
                  <div style={{
                  fontWeight: 500,
                  marginBottom: '0.25rem'
                }}>Push Notifications</div>
                  <div style={{
                  fontSize: '0.75rem',
                  color: 'var(--color-gray-500)'
                }}>Receive alerts for price drops</div>
                </div>
                <Toggle checked={notifications} onChange={setNotifications} />
              </div>
              
              <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
                <div>
                  <div style={{
                  fontWeight: 500,
                  marginBottom: '0.25rem'
                }}>Dark Mode</div>
                  <div style={{
                  fontSize: '0.75rem',
                  color: 'var(--color-gray-500)'
                }}>Use dark theme</div>
                </div>
                <Toggle checked={darkMode} onChange={setDarkMode} />
              </div>
              
              <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
                <div>
                  <div style={{
                  fontWeight: 500,
                  marginBottom: '0.25rem'
                }}>Auto-save Searches</div>
                  <div style={{
                  fontSize: '0.75rem',
                  color: 'var(--color-gray-500)'
                }}>Save your search history</div>
                </div>
                <Toggle checked={autoSave} onChange={setAutoSave} />
              </div>
              
              <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              opacity: 0.5
            }}>
                <div>
                  <div style={{
                  fontWeight: 500,
                  marginBottom: '0.25rem'
                }}>Disabled Toggle</div>
                  <div style={{
                  fontSize: '0.75rem',
                  color: 'var(--color-gray-500)'
                }}>This option is unavailable</div>
                </div>
                <Toggle disabled />
              </div>
            </div>
          </div>
        </div>
      </div>;
  }
}`,...j.parameters?.docs?.source},description:{story:"Toggle switches for on/off settings.",...j.parameters?.docs?.description}}};S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  render: () => <div style={styles.container}>
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Select Dropdowns</h2>
        <p style={styles.sectionDescription}>
          Use select dropdowns when users need to choose one option from a longer list.
        </p>
        
        <div style={styles.grid}>
          <Select label="Body Style" placeholder="Select body style" options={[{
          value: 'sedan',
          label: 'Sedan'
        }, {
          value: 'suv',
          label: 'SUV'
        }, {
          value: 'truck',
          label: 'Truck'
        }, {
          value: 'coupe',
          label: 'Coupe'
        }, {
          value: 'hatchback',
          label: 'Hatchback'
        }, {
          value: 'convertible',
          label: 'Convertible'
        }, {
          value: 'wagon',
          label: 'Wagon'
        }]} />
          
          <Select label="Price Range" placeholder="Select price range" options={[{
          value: 'under-20k',
          label: 'Under $20,000'
        }, {
          value: '20k-30k',
          label: '$20,000 - $30,000'
        }, {
          value: '30k-50k',
          label: '$30,000 - $50,000'
        }, {
          value: '50k-75k',
          label: '$50,000 - $75,000'
        }, {
          value: 'over-75k',
          label: 'Over $75,000'
        }]} value="30k-50k" />
          
          <Select label="Disabled Select" placeholder="Cannot select" disabled options={[{
          value: 'option1',
          label: 'Option 1'
        }]} />
        </div>
      </div>
    </div>
}`,...S.parameters?.docs?.source},description:{story:"Select dropdowns for choosing from a list of options.",...S.parameters?.docs?.description}}};k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  render: () => <div style={styles.container}>
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Textareas</h2>
        <p style={styles.sectionDescription}>
          Use textareas for longer form text input like comments or messages.
        </p>
        
        <div style={styles.grid}>
          <Textarea label="Message to Dealer" placeholder="Write your message here..." helperText="Be specific about your questions or requirements" />
          
          <Textarea label="With Error" placeholder="Enter description..." error="Please enter at least 20 characters" rows={3} />
        </div>
      </div>
    </div>
}`,...k.parameters?.docs?.source},description:{story:"Textarea for multi-line text input.",...k.parameters?.docs?.description}}};w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      bodyStyle: '',
      features: {
        awd: false,
        sunroof: false,
        leather: true
      },
      condition: 'new',
      notifications: true,
      message: ''
    });
    return <div style={styles.container}>
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Complete Form Example</h2>
          <p style={styles.sectionDescription}>
            A realistic form combining multiple control types.
          </p>
          
          <div style={{
          maxWidth: '500px',
          padding: '2rem',
          backgroundColor: 'white',
          borderRadius: '12px',
          border: '1px solid var(--color-gray-200)'
        }}>
            <h3 style={{
            fontSize: '1.25rem',
            fontWeight: 600,
            marginBottom: '1.5rem'
          }}>Contact Dealer</h3>
            
            <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem'
          }}>
              <TextInput label="Full Name" placeholder="John Smith" value={formData.name} onChange={name => setFormData(f => ({
              ...f,
              name
            }))} />
              
              <TextInput label="Email Address" type="email" placeholder="john@example.com" value={formData.email} onChange={email => setFormData(f => ({
              ...f,
              email
            }))} />
              
              <Select label="Interested Body Style" placeholder="Select body style" value={formData.bodyStyle} onChange={bodyStyle => setFormData(f => ({
              ...f,
              bodyStyle
            }))} options={[{
              value: 'sedan',
              label: 'Sedan'
            }, {
              value: 'suv',
              label: 'SUV'
            }, {
              value: 'truck',
              label: 'Truck'
            }]} />
              
              <div>
                <label style={fieldStyles.label}>Desired Features</label>
                <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
                marginTop: '0.5rem'
              }}>
                  <Checkbox label="All-Wheel Drive" checked={formData.features.awd} onChange={awd => setFormData(f => ({
                  ...f,
                  features: {
                    ...f.features,
                    awd
                  }
                }))} />
                  <Checkbox label="Sunroof" checked={formData.features.sunroof} onChange={sunroof => setFormData(f => ({
                  ...f,
                  features: {
                    ...f.features,
                    sunroof
                  }
                }))} />
                  <Checkbox label="Leather Seats" checked={formData.features.leather} onChange={leather => setFormData(f => ({
                  ...f,
                  features: {
                    ...f.features,
                    leather
                  }
                }))} />
                </div>
              </div>
              
              <div>
                <label style={fieldStyles.label}>Vehicle Condition</label>
                <div style={{
                marginTop: '0.5rem'
              }}>
                  <RadioGroup name="condition" value={formData.condition} onChange={condition => setFormData(f => ({
                  ...f,
                  condition
                }))} options={[{
                  value: 'new',
                  label: 'New'
                }, {
                  value: 'used',
                  label: 'Used'
                }, {
                  value: 'cpo',
                  label: 'Certified Pre-Owned'
                }]} />
                </div>
              </div>
              
              <Textarea label="Additional Message" placeholder="Any specific questions or requirements..." value={formData.message} onChange={message => setFormData(f => ({
              ...f,
              message
            }))} rows={3} />
              
              <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
                <span style={{
                fontSize: '0.875rem'
              }}>Email me updates</span>
                <Toggle checked={formData.notifications} onChange={notifications => setFormData(f => ({
                ...f,
                notifications
              }))} />
              </div>
              
              <button style={{
              width: '100%',
              padding: '0.875rem',
              backgroundColor: 'var(--color-blue-cobalt, #2676DF)',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontSize: '1rem',
              fontWeight: 600,
              cursor: 'pointer'
            }}>
                Submit Inquiry
              </button>
            </div>
          </div>
        </div>
      </div>;
  }
}`,...w.parameters?.docs?.source},description:{story:"Complete form example with multiple control types.",...w.parameters?.docs?.description}}};C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  render: () => <div style={styles.container}>
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Implementation</h2>
        
        <h3 style={{
        fontSize: '1rem',
        fontWeight: 500,
        marginBottom: '0.5rem'
      }}>Base Input Styles</h3>
        <pre style={styles.codeBlock}>
        {\`.form-input {
  width: 100%;
  min-height: 44px;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  font-family: Inter, sans-serif;
  color: var(--color-dark);
  background-color: var(--color-white);
  border: 1px solid var(--color-gray-300);
  border-radius: 4px;
  outline: none;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
}

.form-input:focus {
  border-color: var(--color-blue-cobalt);
  box-shadow: 0 0 0 2px rgba(38, 118, 223, 0.2);
}

.form-input--error {
  border-color: var(--color-error);
}

.form-input:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}\`}
        </pre>

        <h3 style={{
        fontSize: '1rem',
        fontWeight: 500,
        marginTop: '2rem',
        marginBottom: '0.5rem'
      }}>CSS Variables Used</h3>
        <pre style={styles.codeBlock}>
        {\`/* Form colors */
--color-blue-cobalt: #1B5F8A    /* Focus states, selected items */
--color-gray-300: #d1d5db       /* Default borders */
--color-gray-400: #999          /* Placeholder text */
--color-gray-500: #888          /* Helper text */
--color-gray-700: #374151       /* Labels, input text */
--color-error: #ef4444          /* Error states */

/* Sizing */
--min-touch-target: 44px        /* Minimum interactive element size */
--border-radius-sm: 4px         /* Input border radius */

/* Transitions */
--transition-fast: 150ms ease   /* Focus/hover transitions */\`}
        </pre>

        <h3 style={{
        fontSize: '1rem',
        fontWeight: 500,
        marginTop: '2rem',
        marginBottom: '0.5rem'
      }}>Accessibility Notes</h3>
        <pre style={styles.codeBlock}>
        {\`/* Ensure all form controls have:
 * - Visible focus indicators (2px outline)
 * - Associated labels (use htmlFor/id)
 * - Error messages linked via aria-describedby
 * - Minimum 44px touch target
 * - Sufficient color contrast (4.5:1 for text)
 */

<label htmlFor="email">Email</label>
<input 
  id="email"
  type="email"
  aria-describedby="email-error"
  aria-invalid={hasError}
/>
{hasError && (
  <span id="email-error" role="alert">
    Please enter a valid email
  </span>
)}\`}
        </pre>
      </div>
    </div>
}`,...C.parameters?.docs?.source},description:{story:"Implementation code and CSS variables.",...C.parameters?.docs?.description}}};const Z=["TextInputs","Checkboxes","RadioButtons","Toggles","Selects","Textareas","CompleteForm","Implementation"];export{f as Checkboxes,w as CompleteForm,C as Implementation,g as RadioButtons,S as Selects,b as TextInputs,k as Textareas,j as Toggles,Z as __namedExportsOrder,Q as default};
