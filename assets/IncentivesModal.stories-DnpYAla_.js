import{j as n,r as f}from"./iframe-D4BaQDUl.js";import{I}from"./IncentivesModal-D7i7nwxk.js";import"./preload-helper-PPVm8Dsz.js";import"./index-7PlZeqcO.js";import"./index-CLMOy3_J.js";import"./x-Cxdz-Ma4.js";import"./createLucideIcon-BUTvUVS0.js";import"./info-DjGsvFCW.js";import"./trending-down-dL1kTIXu.js";import"./circle-check-big-C-fKo3hx.js";import"./gem-C3lN2qoA.js";import"./clock-CqmawXw-.js";import"./lightbulb-BtpBzi4E.js";import"./badge-check-CfL7TwlD.js";import"./shield-check-BJWh79kv.js";import"./check-B2lgwMuK.js";import"./phone-D0AgHQNe.js";import"./map-pin-mHtR3Kbp.js";import"./navigation-CMHqdJUz.js";const o=["simple","complete-with-form","edmunds","conversion-a","conversion-b","conversion-b-no-form"],M={simple:"Incentives Modal 1 – Simple","complete-with-form":"Incentives Modal 2 – Complete + contact form",edmunds:"Incentives Modal 3 – Edmunds-style","conversion-a":"Incentives Modal 4 – Conversion (urgency + benefits)","conversion-b":"Incentives Modal 5 – Conversion (two-column + form)","conversion-b-no-form":"Incentives Modal 6 – Conversion (no form)"};function b(){const[r,u]=f.useState(0),[i,g]=f.useState(!1),h=o[r];return f.useEffect(()=>{if(!i)return;const t=e=>{e.key==="ArrowLeft"&&(e.preventDefault(),u(a=>a===0?o.length-1:a-1)),e.key==="ArrowRight"&&(e.preventDefault(),u(a=>a===o.length-1?0:a+1))};return window.addEventListener("keydown",t),()=>window.removeEventListener("keydown",t)},[i]),n.jsxs("div",{style:{padding:"24px",maxWidth:"800px",margin:"0 auto"},children:[n.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"16px",alignItems:"center",marginBottom:"32px"},children:[n.jsxs("p",{style:{fontSize:"14px",color:"var(--color-gray-600)",margin:0},children:["Pick a variant 1–5, then open the modal. Sample: 2026 Honda CR-V with photo. Use ",n.jsx("kbd",{children:"←"})," ",n.jsx("kbd",{children:"→"})," to cycle when the modal is open."]}),n.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"8px",flexWrap:"wrap",justifyContent:"center"},children:[n.jsx("span",{style:{fontSize:"14px",fontWeight:600},children:"Variant:"}),o.map((t,e)=>n.jsx("button",{type:"button",onClick:()=>u(e),style:{width:"40px",height:"40px",borderRadius:"50%",border:r===e?"2px solid var(--color-blue-cobalt)":"1px solid var(--color-gray-300)",background:r===e?"var(--color-blue-cobalt)":"var(--color-white)",color:r===e?"white":"var(--color-dark)",fontWeight:700,fontSize:"16px",cursor:"pointer"},"aria-pressed":r===e,"aria-label":`Incentives Modal ${e+1}`,children:e+1},o[e]))]}),n.jsxs("p",{style:{fontSize:"12px",color:"var(--color-gray-500)",margin:0},children:[M[h],i&&" · Use ← → to cycle"]}),n.jsx("button",{type:"button",onClick:()=>g(!0),style:{padding:"12px 24px",fontFamily:"var(--font-heading)",fontWeight:700,fontSize:"14px",color:"white",background:"var(--color-blue-cobalt)",border:"none",borderRadius:"var(--border-radius-sm)",cursor:"pointer"},children:"Open modal"})]}),n.jsx(I,{isOpen:i,onClose:()=>g(!1),variant:h,onCtaClick:()=>console.log("CTA clicked"),onSubmitForm:t=>console.log("Form submitted",t)})]})}const _={title:"Organisms/IncentivesModal",component:I,parameters:{layout:"centered",docs:{description:{component:`
Five variants based on your reference modal, using the **2026 Honda CR-V** as the sample (with photo and current incentives):

- **Incentives Modal 1 (Simple)** – Vehicle photo + name + MSRP, green offer banner, one short “what it means” line, event label, “Get this deal” + “View full vehicle details”.
- **Incentives Modal 2 (Complete + form)** – Full reference layout (What does this mean, Your savings, Who qualifies, Eligible trims, Don’t wait) plus **contact dealer form** (First/Last, Email, Phone, Message) and “Request info from dealer”.
- **Incentives Modal 3 (Edmunds-style)** – Offer headline, “Our take” value card, Key offer details list, “Get this deal”.
- **Incentives Modal 4 (Conversion A)** – Urgency badge, header + offer banner, savings line, benefit bullets, single CTA.
- **Incentives Modal 5 (Conversion B)** – Minimal: header, hero offer line, one-liner, one CTA.

Use the **Review all** story and the 1–5 counter to pick one.
        `}}},tags:["autodocs"],argTypes:{variant:{control:"select",options:o}}},s={isOpen:!0,onClose:()=>{},onCtaClick:()=>{}},l={name:"Review all (1–5 counter)",render:()=>n.jsx(b,{})},c={name:"Incentives Modal 1",args:{...s,variant:"simple"}},d={name:"Incentives Modal 2",args:{...s,variant:"complete-with-form"}},m={name:"Incentives Modal 3",args:{...s,variant:"edmunds"}},p={name:"Incentives Modal 4",args:{...s,variant:"conversion-a"}},v={name:"Incentives Modal 5",args:{...s,variant:"conversion-b"}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  name: 'Review all (1–5 counter)',
  render: () => <ReviewAllVariants />
}`,...l.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  name: 'Incentives Modal 1',
  args: {
    ...defaultArgs,
    variant: 'simple'
  }
}`,...c.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  name: 'Incentives Modal 2',
  args: {
    ...defaultArgs,
    variant: 'complete-with-form'
  }
}`,...d.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  name: 'Incentives Modal 3',
  args: {
    ...defaultArgs,
    variant: 'edmunds'
  }
}`,...m.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  name: 'Incentives Modal 4',
  args: {
    ...defaultArgs,
    variant: 'conversion-a'
  }
}`,...p.parameters?.docs?.source}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  name: 'Incentives Modal 5',
  args: {
    ...defaultArgs,
    variant: 'conversion-b'
  }
}`,...v.parameters?.docs?.source}}};const N=["ReviewAll","IncentivesModal1","IncentivesModal2","IncentivesModal3","IncentivesModal4","IncentivesModal5"];export{c as IncentivesModal1,d as IncentivesModal2,m as IncentivesModal3,p as IncentivesModal4,v as IncentivesModal5,l as ReviewAll,N as __namedExportsOrder,_ as default};
