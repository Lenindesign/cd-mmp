import{r as p,j as e}from"./iframe-CoG26bPx.js";import{S as z}from"./search-C1m9xqxs.js";import{M as P}from"./mail-D92KuQ5Z.js";import{U as C}from"./user-Bu9BYuA6.js";import{P as L}from"./phone-C07lUFSc.js";import{D as I}from"./dollar-sign-CxAe8CxU.js";import{E as A,a as M}from"./eye-DwceKfos.js";import{c as B}from"./createLucideIcon-B0KpOUPr.js";import"./preload-helper-PPVm8Dsz.js";const O=[["rect",{width:"18",height:"11",x:"3",y:"11",rx:"2",ry:"2",key:"1w4ew1"}],["path",{d:"M7 11V7a5 5 0 0 1 10 0v4",key:"fwvmzm"}]],H=B("lock",O),l=p.forwardRef(({label:s,helperText:r,error:a,size:f="default",fullWidth:x=!1,iconLeft:d,iconRight:n,wrapperClassName:c="",className:b="",id:m,...t},h)=>{const o=p.useId(),i=m||o,u=!!a;return e.jsxs("div",{className:`text-field text-field--${f} ${x?"text-field--full-width":""} ${u?"text-field--error":""} ${c}`,children:[s&&e.jsxs("label",{htmlFor:i,className:"text-field__label",children:[s,t.required&&e.jsx("span",{className:"text-field__required",children:"*"})]}),e.jsxs("div",{className:"text-field__input-wrapper",children:[d&&e.jsx("span",{className:"text-field__icon text-field__icon--left",children:d}),e.jsx("input",{ref:h,id:i,className:`text-field__input ${d?"text-field__input--has-icon-left":""} ${n?"text-field__input--has-icon-right":""} ${b}`,"aria-invalid":u,"aria-describedby":a?`${i}-error`:r?`${i}-helper`:void 0,...t}),n&&e.jsx("span",{className:"text-field__icon text-field__icon--right",children:n})]}),a&&e.jsx("span",{id:`${i}-error`,className:"text-field__error",role:"alert",children:a}),r&&!a&&e.jsx("span",{id:`${i}-helper`,className:"text-field__helper",children:r})]})});l.displayName="TextField";const $=p.forwardRef(({label:s,helperText:r,error:a,fullWidth:f=!1,wrapperClassName:x="",className:d="",id:n,...c},b)=>{const m=p.useId(),t=n||m,h=!!a;return e.jsxs("div",{className:`text-field text-field--textarea ${f?"text-field--full-width":""} ${h?"text-field--error":""} ${x}`,children:[s&&e.jsxs("label",{htmlFor:t,className:"text-field__label",children:[s,c.required&&e.jsx("span",{className:"text-field__required",children:"*"})]}),e.jsx("textarea",{ref:b,id:t,className:`text-field__textarea ${d}`,"aria-invalid":h,"aria-describedby":a?`${t}-error`:r?`${t}-helper`:void 0,...c}),a&&e.jsx("span",{id:`${t}-error`,className:"text-field__error",role:"alert",children:a}),r&&!a&&e.jsx("span",{id:`${t}-helper`,className:"text-field__helper",children:r})]})});$.displayName="TextArea";const V=p.forwardRef(({label:s,helperText:r,error:a,fullWidth:f=!1,wrapperClassName:x="",className:d="",options:n,placeholder:c,id:b,...m},t)=>{const h=p.useId(),o=b||h,i=!!a;return e.jsxs("div",{className:`text-field text-field--select ${f?"text-field--full-width":""} ${i?"text-field--error":""} ${x}`,children:[s&&e.jsxs("label",{htmlFor:o,className:"text-field__label",children:[s,m.required&&e.jsx("span",{className:"text-field__required",children:"*"})]}),e.jsxs("div",{className:"text-field__select-wrapper",children:[e.jsxs("select",{ref:t,id:o,className:`text-field__select ${d}`,"aria-invalid":i,"aria-describedby":a?`${o}-error`:r?`${o}-helper`:void 0,...m,children:[c&&e.jsx("option",{value:"",disabled:!0,children:c}),n.map(u=>e.jsx("option",{value:u.value,disabled:u.disabled,children:u.label},u.value))]}),e.jsx("span",{className:"text-field__select-arrow",children:e.jsx("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:e.jsx("polyline",{points:"6 9 12 15 18 9"})})})]}),a&&e.jsx("span",{id:`${o}-error`,className:"text-field__error",role:"alert",children:a}),r&&!a&&e.jsx("span",{id:`${o}-helper`,className:"text-field__helper",children:r})]})});V.displayName="Select";l.__docgenInfo={description:`TextField Component

A standardized text input following the Car and Driver design system.

@example
// Basic usage
<TextField label="Email" placeholder="Enter your email" />

// With error
<TextField label="Email" error="Invalid email address" />

// With icon
<TextField label="Search" iconLeft={<SearchIcon />} />`,methods:[],displayName:"TextField",props:{label:{required:!1,tsType:{name:"string"},description:"Field label"},helperText:{required:!1,tsType:{name:"string"},description:"Helper text below the input"},error:{required:!1,tsType:{name:"string"},description:"Error message - shows error state when provided"},size:{required:!1,tsType:{name:"union",raw:"'small' | 'default' | 'large'",elements:[{name:"literal",value:"'small'"},{name:"literal",value:"'default'"},{name:"literal",value:"'large'"}]},description:"Input size variant",defaultValue:{value:"'default'",computed:!1}},fullWidth:{required:!1,tsType:{name:"boolean"},description:"Full width input",defaultValue:{value:"false",computed:!1}},iconLeft:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"Left icon/addon"},iconRight:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"Right icon/addon"},wrapperClassName:{required:!1,tsType:{name:"string"},description:"Additional wrapper class",defaultValue:{value:"''",computed:!1}},className:{defaultValue:{value:"''",computed:!1},required:!1}},composes:["Omit"]};$.__docgenInfo={description:"",methods:[],displayName:"TextArea",props:{label:{required:!1,tsType:{name:"string"},description:""},helperText:{required:!1,tsType:{name:"string"},description:""},error:{required:!1,tsType:{name:"string"},description:""},fullWidth:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},wrapperClassName:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"''",computed:!1}},className:{defaultValue:{value:"''",computed:!1},required:!1}}};V.__docgenInfo={description:"",methods:[],displayName:"Select",props:{label:{required:!1,tsType:{name:"string"},description:""},helperText:{required:!1,tsType:{name:"string"},description:""},error:{required:!1,tsType:{name:"string"},description:""},fullWidth:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},wrapperClassName:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"''",computed:!1}},options:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:"{ value: string; label: string; disabled?: boolean }",signature:{properties:[{key:"value",value:{name:"string",required:!0}},{key:"label",value:{name:"string",required:!0}},{key:"disabled",value:{name:"boolean",required:!1}}]}}],raw:"Array<{ value: string; label: string; disabled?: boolean }>"},description:""},placeholder:{required:!1,tsType:{name:"string"},description:""},className:{defaultValue:{value:"''",computed:!1},required:!1}}};const{fn:k}=__STORYBOOK_MODULE_TEST__,ae={title:"Atoms/TextField",component:l,parameters:{layout:"centered",docs:{description:{component:"Text input component with label, error handling, and icon support."}}},tags:["autodocs"],argTypes:{type:{control:"select",options:["text","email","password","number","tel","url"]},disabled:{control:"boolean"},required:{control:"boolean"},fullWidth:{control:"boolean"}},args:{onChange:k(),onBlur:k(),onFocus:k()},decorators:[s=>e.jsx("div",{style:{width:"320px"},children:e.jsx(s,{})})]},g={args:{label:"Full Name",placeholder:"Enter your name"}},v={args:{label:"Email Address",type:"email",value:"john@example.com"}},y={args:{label:"Email",placeholder:"Required field",required:!0}},T={args:{label:"Email",value:"invalid-email",error:"Please enter a valid email address"}},w={args:{label:"Password",type:"password",helperText:"Must be at least 8 characters"}},j={args:{label:"Disabled Field",value:"Cannot edit",disabled:!0}},_={args:{label:"Search",placeholder:"Search vehicles...",iconLeft:e.jsx(z,{size:18})}},S={args:{label:"Email",placeholder:"Enter email",iconRight:e.jsx(P,{size:18})}},q={render:()=>{const s=()=>{const[r,a]=p.useState(!1);return e.jsx(l,{label:"Password",type:r?"text":"password",placeholder:"Enter password",iconLeft:e.jsx(H,{size:18}),iconRight:e.jsx("button",{type:"button",onClick:()=>a(!r),style:{background:"none",border:"none",cursor:"pointer",padding:0},children:r?e.jsx(A,{size:18}):e.jsx(M,{size:18})})})};return e.jsx(s,{})}},N={render:()=>e.jsx(V,{label:"Select Make",placeholder:"Choose a make",options:[{value:"toyota",label:"Toyota"},{value:"honda",label:"Honda"},{value:"ford",label:"Ford"},{value:"chevrolet",label:"Chevrolet"}]})},E={render:()=>e.jsx(V,{label:"Body Style",defaultValue:"suv",options:[{value:"sedan",label:"Sedan"},{value:"suv",label:"SUV"},{value:"truck",label:"Truck"}]})},F={render:()=>e.jsx($,{label:"Comments",placeholder:"Enter your comments...",rows:4})},D={render:()=>e.jsx($,{label:"Description",defaultValue:"This is a pre-filled description.",rows:4})},W={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"16px"},children:[e.jsx(l,{label:"Full Name",placeholder:"John Doe",iconLeft:e.jsx(C,{size:18}),required:!0}),e.jsx(l,{label:"Email",type:"email",placeholder:"john@example.com",iconLeft:e.jsx(P,{size:18}),required:!0}),e.jsx(l,{label:"Phone",type:"tel",placeholder:"(555) 123-4567",iconLeft:e.jsx(L,{size:18})}),e.jsx(l,{label:"Budget",type:"number",placeholder:"35000",iconLeft:e.jsx(I,{size:18}),helperText:"Your maximum budget"})]})},R={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"16px"},children:[e.jsx(l,{label:"Default",placeholder:"Default state"}),e.jsx(l,{label:"With Value",value:"Filled value"}),e.jsx(l,{label:"With Error",value:"Bad value",error:"This field has an error"}),e.jsx(l,{label:"With Helper",placeholder:"Enter value",helperText:"This is helper text"}),e.jsx(l,{label:"Disabled",value:"Cannot edit",disabled:!0}),e.jsx(l,{label:"Required",placeholder:"Required field",required:!0})]})};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Full Name',
    placeholder: 'Enter your name'
  }
}`,...g.parameters?.docs?.source}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Email Address',
    type: 'email',
    value: 'john@example.com'
  }
}`,...v.parameters?.docs?.source}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Email',
    placeholder: 'Required field',
    required: true
  }
}`,...y.parameters?.docs?.source}}};T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Email',
    value: 'invalid-email',
    error: 'Please enter a valid email address'
  }
}`,...T.parameters?.docs?.source}}};w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Password',
    type: 'password',
    helperText: 'Must be at least 8 characters'
  }
}`,...w.parameters?.docs?.source}}};j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Disabled Field',
    value: 'Cannot edit',
    disabled: true
  }
}`,...j.parameters?.docs?.source}}};_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Search',
    placeholder: 'Search vehicles...',
    iconLeft: <Search size={18} />
  }
}`,..._.parameters?.docs?.source}}};S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Email',
    placeholder: 'Enter email',
    iconRight: <Mail size={18} />
  }
}`,...S.parameters?.docs?.source}}};q.parameters={...q.parameters,docs:{...q.parameters?.docs,source:{originalSource:`{
  render: () => {
    const PasswordField = () => {
      const [showPassword, setShowPassword] = useState(false);
      return <TextField label="Password" type={showPassword ? 'text' : 'password'} placeholder="Enter password" iconLeft={<Lock size={18} />} iconRight={<button type="button" onClick={() => setShowPassword(!showPassword)} style={{
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: 0
      }}>
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>} />;
    };
    return <PasswordField />;
  }
}`,...q.parameters?.docs?.source}}};N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  render: () => <Select label="Select Make" placeholder="Choose a make" options={[{
    value: 'toyota',
    label: 'Toyota'
  }, {
    value: 'honda',
    label: 'Honda'
  }, {
    value: 'ford',
    label: 'Ford'
  }, {
    value: 'chevrolet',
    label: 'Chevrolet'
  }]} />
}`,...N.parameters?.docs?.source}}};E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  render: () => <Select label="Body Style" defaultValue="suv" options={[{
    value: 'sedan',
    label: 'Sedan'
  }, {
    value: 'suv',
    label: 'SUV'
  }, {
    value: 'truck',
    label: 'Truck'
  }]} />
}`,...E.parameters?.docs?.source}}};F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
  render: () => <TextArea label="Comments" placeholder="Enter your comments..." rows={4} />
}`,...F.parameters?.docs?.source}}};D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  render: () => <TextArea label="Description" defaultValue="This is a pre-filled description." rows={4} />
}`,...D.parameters?.docs?.source}}};W.parameters={...W.parameters,docs:{...W.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  }}>
      <TextField label="Full Name" placeholder="John Doe" iconLeft={<User size={18} />} required />
      <TextField label="Email" type="email" placeholder="john@example.com" iconLeft={<Mail size={18} />} required />
      <TextField label="Phone" type="tel" placeholder="(555) 123-4567" iconLeft={<Phone size={18} />} />
      <TextField label="Budget" type="number" placeholder="35000" iconLeft={<DollarSign size={18} />} helperText="Your maximum budget" />
    </div>
}`,...W.parameters?.docs?.source}}};R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  }}>
      <TextField label="Default" placeholder="Default state" />
      <TextField label="With Value" value="Filled value" />
      <TextField label="With Error" value="Bad value" error="This field has an error" />
      <TextField label="With Helper" placeholder="Enter value" helperText="This is helper text" />
      <TextField label="Disabled" value="Cannot edit" disabled />
      <TextField label="Required" placeholder="Required field" required />
    </div>
}`,...R.parameters?.docs?.source}}};const re=["Default","WithValue","Required","WithError","WithHelperText","Disabled","WithIconLeft","WithIconRight","PasswordWithToggle","SelectDefault","SelectWithValue","TextAreaDefault","TextAreaWithValue","CompleteForm","AllStates"];export{R as AllStates,W as CompleteForm,g as Default,j as Disabled,q as PasswordWithToggle,y as Required,N as SelectDefault,E as SelectWithValue,F as TextAreaDefault,D as TextAreaWithValue,T as WithError,w as WithHelperText,_ as WithIconLeft,S as WithIconRight,v as WithValue,re as __namedExportsOrder,ae as default};
