import{j as a,r as p}from"./iframe-B_hBYtrn.js";import{C as f}from"./ContactDealerModal-Qrl8rOFd.js";import"./preload-helper-PPVm8Dsz.js";import"./x-BTeKcvX0.js";import"./createLucideIcon-CEkC63Y3.js";import"./thumbs-up-9kyPML3c.js";import"./message-circle-BE7gLPh0.js";import"./share-2-31BqQoL0.js";import"./sparkles-B21ZOFJ7.js";import"./chevron-down-BFOOMzKN.js";const t=["default","form","edmunds"],g={default:"Same modal look, simple CTA",form:"Contact dealer form",edmunds:"Edmunds-inspired deal details"};function y(){const[o,u]=p.useState(0),[l,h]=p.useState(!1),s=t[o],v=r=>{console.log("Contact dealer submit:",r)};return p.useEffect(()=>{if(!l)return;const r=e=>{e.key==="ArrowLeft"&&(e.preventDefault(),u(n=>n===0?t.length-1:n-1)),e.key==="ArrowRight"&&(e.preventDefault(),u(n=>n===t.length-1?0:n+1))};return window.addEventListener("keydown",r),()=>window.removeEventListener("keydown",r)},[l]),a.jsxs("div",{style:{padding:"24px",maxWidth:"800px",margin:"0 auto"},children:[a.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"16px",alignItems:"center",marginBottom:"32px"},children:[a.jsxs("p",{style:{fontSize:"14px",color:"var(--color-gray-600)",margin:0},children:["Pick 1, 2, or 3 then open the modal. Use ",a.jsx("kbd",{children:"←"})," ",a.jsx("kbd",{children:"→"})," to cycle when the modal is open."]}),a.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"8px",flexWrap:"wrap",justifyContent:"center"},children:[a.jsx("span",{style:{fontSize:"14px",fontWeight:600},children:"Variant:"}),t.map((r,e)=>a.jsx("button",{type:"button",onClick:()=>u(e),style:{width:"40px",height:"40px",borderRadius:"50%",border:o===e?"2px solid var(--color-blue-cobalt)":"1px solid var(--color-gray-300)",background:o===e?"var(--color-blue-cobalt)":"var(--color-white)",color:o===e?"white":"var(--color-dark)",fontWeight:700,fontSize:"16px",cursor:"pointer"},"aria-pressed":o===e,"aria-label":`Variant ${e+1}`,children:e+1},t[e]))]}),a.jsxs("p",{style:{fontSize:"12px",color:"var(--color-gray-500)",margin:0},children:[g[s],l&&" · Use ← → to cycle"]}),a.jsx("button",{type:"button",onClick:()=>h(!0),style:{padding:"12px 24px",fontFamily:"var(--font-heading)",fontWeight:700,fontSize:"14px",color:"white",background:"var(--color-blue-cobalt)",border:"none",borderRadius:"var(--border-radius-sm)",cursor:"pointer"},children:"Open modal"})]}),a.jsx(f,{isOpen:l,onClose:()=>h(!1),variant:s,vehicle:s==="edmunds"?{year:2025,make:"Jeep",model:"Gladiator"}:{year:2026,make:"Honda",model:"CR-V"},onSubmit:v,onGetThisDeal:s==="edmunds"?()=>console.log("Get this deal"):void 0})]})}const O={title:"Organisms/ContactDealerModal",component:f,parameters:{layout:"centered",docs:{description:{component:`
Contact Dealer modal styled like the Make Offer modal (blue header, same layout and footer).

- **Default** – Same look: "Contact the Dealer" title, vehicle subtitle, short intro text, and "Request Dealer Info" button.
- **Form** – Same look with the full contact form: "Got Questions? Contact The Dealer", First/Last name, Email, Phone (optional), Message (prefilled), disclaimer, and "REQUEST INFO" button.
- **Edmunds** – Deal-detail style: white modal, vehicle name + MSRP + Read review, image area, engagement pills (like/comment/share), monthly price + at signing, "Our take" mint card, key offer details, "Get this deal" CTA, fine print.
        `}}},tags:["autodocs"],argTypes:{variant:{control:"select",options:t}}},i={name:"1. Review all variants (1–2–3 counter)",render:()=>a.jsx(y,{})},d={name:"2. Default (same modal look)",args:{isOpen:!0,onClose:()=>{},variant:"default",vehicle:{year:2026,make:"Honda",model:"CR-V"}}},m={name:"3. Contact dealer form",args:{isOpen:!0,onClose:()=>{},variant:"form",vehicle:{year:2026,make:"Honda",model:"CR-V"}}},c={name:"4. Edmunds-inspired deal details",args:{isOpen:!0,onClose:()=>{},variant:"edmunds",vehicle:{year:2025,make:"Jeep",model:"Gladiator"},dealDetails:{msrp:40095,monthlyPayment:218,dueAtSigning:2718,termMonths:36,ourTakeRating:"5/5 Excellent",ourTakeText:"This lease deal offers exceptional value relative to the vehicle's MSRP.",keyDetails:[{label:"Term",value:"36 months"},{label:"Due at signing",value:"$2,718"},{label:"Mileage allowance",value:"12,000 miles/year"},{label:"Lifetime cost",value:"$10,348"},{label:"Eligible trims",value:"Sport"},{label:"Offer ends",value:"Mar. 30, 2026"}],comparisonLabel:"$233/mo lower than similar cars"},onGetThisDeal:()=>{}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  name: '1. Review all variants (1–2–3 counter)',
  render: () => <ReviewBothVariants />
}`,...i.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  name: '2. Default (same modal look)',
  args: {
    isOpen: true,
    onClose: () => {},
    variant: 'default',
    vehicle: {
      year: 2026,
      make: 'Honda',
      model: 'CR-V'
    }
  }
}`,...d.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  name: '3. Contact dealer form',
  args: {
    isOpen: true,
    onClose: () => {},
    variant: 'form',
    vehicle: {
      year: 2026,
      make: 'Honda',
      model: 'CR-V'
    }
  }
}`,...m.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  name: '4. Edmunds-inspired deal details',
  args: {
    isOpen: true,
    onClose: () => {},
    variant: 'edmunds',
    vehicle: {
      year: 2025,
      make: 'Jeep',
      model: 'Gladiator'
    },
    dealDetails: {
      msrp: 40095,
      monthlyPayment: 218,
      dueAtSigning: 2718,
      termMonths: 36,
      ourTakeRating: '5/5 Excellent',
      ourTakeText: "This lease deal offers exceptional value relative to the vehicle's MSRP.",
      keyDetails: [{
        label: 'Term',
        value: '36 months'
      }, {
        label: 'Due at signing',
        value: '$2,718'
      }, {
        label: 'Mileage allowance',
        value: '12,000 miles/year'
      }, {
        label: 'Lifetime cost',
        value: '$10,348'
      }, {
        label: 'Eligible trims',
        value: 'Sport'
      }, {
        label: 'Offer ends',
        value: 'Mar. 30, 2026'
      }],
      comparisonLabel: '$233/mo lower than similar cars'
    },
    onGetThisDeal: () => {}
  }
}`,...c.parameters?.docs?.source}}};const j=["ReviewBoth","Default","Form","Edmunds"];export{d as Default,c as Edmunds,m as Form,i as ReviewBoth,j as __namedExportsOrder,O as default};
