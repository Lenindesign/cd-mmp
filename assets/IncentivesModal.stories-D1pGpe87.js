import{j as e,r as b}from"./iframe-CLEkz2UN.js";import{I as C}from"./IncentivesModal-C6QMIbOx.js";import"./preload-helper-PPVm8Dsz.js";import"./index-MdzP5yv2.js";import"./index-C_hsw7Ac.js";import"./trimService-DLkm3_Mg.js";import"./dateUtils-Blw69jOb.js";import"./x-BkVl0fAn.js";import"./createLucideIcon-DC9z6m24.js";import"./info-CxMJ5jo-.js";import"./trending-down-BxM-6Tbi.js";import"./circle-check-big-CCV5wMLS.js";import"./gem-DhZDXhSZ.js";import"./clock-Bq_TuQ7p.js";import"./lightbulb-C9dCCiYe.js";import"./badge-check-Cecl0Uzy.js";import"./shield-check-C6Ni8NBk.js";import"./check-Bu8HNRlV.js";import"./phone-DG0-EJKS.js";import"./map-pin-BebBq2DI.js";import"./navigation-BY4UkUxz.js";const I="https://d2kde5ohu8qb21.cloudfront.net/files/65f7e4f9417c9000085e7bba/003-2024-chevrolet-trailblazer-front-three-quarters-view.jpg",A="https://hips.hearstapps.com/hmg-prod/images/2024-toyota-camry-102-64cbc4858e198.jpg",u={year:2026,make:"Chevrolet",model:"Equinox",slug:"2026/chevrolet/equinox",imageUrl:I,msrpMin:33300,msrpMax:38500,offerHeadline:"0% APR for 60 months",whatItMeans:"Zero-interest financing means every dollar of your payment goes toward the vehicle — not the bank. On a $35,000 loan, this saves you roughly $5,600 in interest vs. the average 7.1% rate.",yourSavings:"On a $35,000 loan over 60 months, $0 in interest vs. approximately $5,600 at 7.1% APR. That's over $93/month in savings.",whoQualifies:"Well-qualified buyers with approved credit through GM Financial.",eligibleTrims:["LT","2RS","3RS","Activ"],dontWaitText:"This offer expires May 1, 2026. Chevrolet incentives change monthly, so lock in your rate before it's gone.",eventLabel:"Chevrolet Equinox Current Offers",expirationDate:"May 1, 2026"},k={year:2026,make:"Toyota",model:"Camry",slug:"2026/toyota/camry",imageUrl:A,msrpMin:28855,msrpMax:34780,offerHeadline:"$359/mo Lease for 36 months",whatItMeans:"A manufacturer-subsidized lease gives you a lower monthly payment than financing. You drive a new Camry for 3 years with the option to buy at the end.",yourSavings:"Monthly lease payments start at $359/mo with $2,999 due at signing — significantly less than typical finance payments on this vehicle.",whoQualifies:"Well-qualified lessees with approved credit through Toyota Financial Services.",eligibleTrims:["LE","SE","XLE","XSE"],dontWaitText:"This offer expires April 30, 2026. Toyota adjusts lease programs monthly.",expirationDate:"April 30, 2026"},v=[{id:"equinox-finance-1",type:"finance",title:"0% APR for 60 months",description:"Zero-interest financing through GM Financial. Every payment goes toward the vehicle.",value:"0% APR",expirationDate:"May 1, 2026",terms:"For well-qualified buyers. 60-month term available through GM Financial. Not compatible with some other offers.",eligibility:"All qualified buyers with approved credit through GM Financial.",programName:"Chevrolet Bonus Cash + APR",programDescription:"Manufacturer financing incentive",groupAffiliation:"everyone"},{id:"equinox-cash-1",type:"cash",title:"$1,500 Customer Cash",description:"Cash allowance applied toward the purchase of a new Equinox.",value:"$1,500",expirationDate:"May 1, 2026",terms:"Must take delivery by offer expiration. Cannot be combined with 0% APR.",groupAffiliation:"everyone"},{id:"equinox-special-military",type:"special",title:"$500 Military Appreciation",description:"Cash allowance for active, reserve, and retired military personnel.",value:"$500",expirationDate:"Ongoing",eligibility:"Valid military ID required.",groupAffiliation:"military"}],S=[{id:"camry-lease-1",type:"lease",title:"$359/mo Lease for 36 months",description:"Manufacturer-subsidized lease with $2,999 due at signing. 12,000 miles/year.",value:"$359/mo",expirationDate:"April 30, 2026",terms:"$359/mo for 36 months with $2,999 due at signing. 12,000 miles/year. $0.15/mi overage. Tax, title, license extra.",eligibility:"Well-qualified lessees with approved credit through Toyota Financial Services.",programName:"Toyota Lease Specials",groupAffiliation:"everyone"},{id:"camry-finance-1",type:"finance",title:"3.9% APR for 60 months",description:"Below-market financing through Toyota Financial.",value:"3.9% APR",expirationDate:"April 30, 2026",terms:"3.9% APR for 60 months. 4.9% for 72 months. Well-qualified buyers through TFS.",groupAffiliation:"everyone"}],f=["conversion-b","conversion-b-no-form"],w={"conversion-b":"5 – Conversion B (Two-Column + Form)","conversion-b-no-form":"6 – Conversion B (No Form)"},B={"conversion-b":"Two-column layout: left side shows full offer details with incentive switching; right side has a lead form that resolves to dealer match. Production variant used on all deal pages.","conversion-b-no-form":'Same left-column detail as Conversion B but without the form. Single column with a "Shop on Marketplace" CTA. Used in Hero component for info-only display.'},q={"conversion-b":"5","conversion-b-no-form":"6"};function M(){const[i,h]=b.useState(0),[y,x]=b.useState(!1),g=f[i];return b.useEffect(()=>{if(!y)return;const o=n=>{n.key==="ArrowLeft"&&(n.preventDefault(),h(t=>t===0?f.length-1:t-1)),n.key==="ArrowRight"&&(n.preventDefault(),h(t=>t===f.length-1?0:t+1))};return window.addEventListener("keydown",o),()=>window.removeEventListener("keydown",o)},[y]),e.jsxs("div",{style:{padding:"24px",maxWidth:880,margin:"0 auto"},children:[e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:16,alignItems:"center",marginBottom:32},children:[e.jsxs("p",{style:{fontSize:14,color:"var(--color-gray-600)",margin:0,textAlign:"center"},children:["Pick a variant, then open the modal. Use ",e.jsx("kbd",{style:{padding:"2px 6px",background:"#f0f0f0",borderRadius:3,fontSize:12},children:"←"})," ",e.jsx("kbd",{style:{padding:"2px 6px",background:"#f0f0f0",borderRadius:3,fontSize:12},children:"→"})," to cycle when the modal is open."]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap",justifyContent:"center"},children:[e.jsx("span",{style:{fontSize:14,fontWeight:600},children:"Variant:"}),f.map((o,n)=>e.jsx("button",{type:"button",onClick:()=>h(n),style:{width:40,height:40,borderRadius:"50%",border:i===n?"2px solid var(--color-blue-cobalt)":"1px solid var(--color-gray-300)",background:i===n?"var(--color-blue-cobalt)":"var(--color-white)",color:i===n?"white":"var(--color-dark)",fontWeight:700,fontSize:16,cursor:"pointer"},"aria-pressed":i===n,"aria-label":w[o],children:q[o]},o))]}),e.jsxs("div",{style:{textAlign:"center"},children:[e.jsx("p",{style:{fontSize:13,fontWeight:700,color:"var(--color-dark)",margin:"0 0 4px"},children:w[g]}),e.jsx("p",{style:{fontSize:12,color:"var(--color-gray-500)",margin:0,maxWidth:500},children:B[g]})]}),e.jsx("button",{type:"button",onClick:()=>x(!0),style:{padding:"12px 24px",fontFamily:"var(--font-heading)",fontWeight:700,fontSize:14,color:"white",background:"var(--color-blue-cobalt)",border:"none",borderRadius:"var(--border-radius-sm)",cursor:"pointer"},children:"Open modal"})]}),e.jsx(C,{isOpen:y,onClose:()=>x(!1),variant:g,offer:u,allIncentives:v,selectedIncentiveId:"equinox-finance-1",onCtaClick:()=>console.log("[story] CTA clicked"),onSubmitForm:o=>console.log("[story] Form submitted",o)})]})}const Z={title:"Organisms/IncentivesModal",component:C,parameters:{layout:"centered",docs:{description:{component:`A full-screen modal for vehicle deal/incentive details. Used across all deal pages to show offer breakdowns, expert tips, eligibility, and lead capture.

**Production variants:** conversion-b (default, two-column + form) and conversion-b-no-form (single column, used in Hero).

Use the "Review all" story to cycle between variants interactively. The Conversion B sub-stories below demonstrate different incentive types (finance, lease, cash, military/restricted) and the default fallback.`},story:{inline:!1,iframeHeight:600}}},tags:["autodocs"],argTypes:{variant:{control:"select",options:f,description:"Modal layout variant",table:{category:"Core"}},isOpen:{control:"boolean",description:"Controls modal visibility",table:{category:"Core"}},offer:{description:"Vehicle and offer data. Falls back to built-in sample.",table:{category:"Data"}},allIncentives:{description:"Full incentive list — enables offer switching in conversion-b.",table:{category:"Data"}},selectedIncentiveId:{description:"Pre-selected incentive ID.",table:{category:"Data"}},onClose:{table:{category:"Callbacks"}},onCtaClick:{table:{category:"Callbacks"}},onSubmitForm:{table:{category:"Callbacks"}}}},r={onClose:()=>console.log("[story] Modal closed"),onCtaClick:()=>console.log("[story] CTA clicked"),onSubmitForm:i=>console.log("[story] Form submitted",i)},a={name:"Review all (1–6 switcher)",render:()=>e.jsx(M,{})},s={name:"5 – Conversion B (Finance offer)",args:{isOpen:!0,variant:"conversion-b",offer:u,allIncentives:v,selectedIncentiveId:"equinox-finance-1",...r}},l={name:"5b – Conversion B (Lease offer)",args:{isOpen:!0,variant:"conversion-b",offer:k,allIncentives:S,selectedIncentiveId:"camry-lease-1",...r}},c={name:"5c – Conversion B (Cash offer)",args:{isOpen:!0,variant:"conversion-b",offer:u,allIncentives:v,selectedIncentiveId:"equinox-cash-1",...r}},d={name:"5d – Conversion B (Military/restricted)",args:{isOpen:!0,variant:"conversion-b",offer:u,allIncentives:v,selectedIncentiveId:"equinox-special-military",...r}},p={name:"5e – Conversion B (Default fallback)",args:{isOpen:!0,variant:"conversion-b",...r}},m={name:"6 – Conversion B (No Form)",args:{isOpen:!0,variant:"conversion-b-no-form",offer:u,allIncentives:v,selectedIncentiveId:"equinox-finance-1",...r}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  name: 'Review all (1–6 switcher)',
  render: () => <ReviewAllVariants />
}`,...a.parameters?.docs?.source},description:{story:`Interactive variant switcher. Pick 1–6 and use arrow keys to cycle.
All variants use the Chevrolet Equinox 0% APR sample with 3 incentives.`,...a.parameters?.docs?.description}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  name: '5 – Conversion B (Finance offer)',
  args: {
    isOpen: true,
    variant: 'conversion-b',
    offer: equinoxOffer,
    allIncentives: equinoxIncentives,
    selectedIncentiveId: 'equinox-finance-1',
    ...actions
  }
}`,...s.parameters?.docs?.source},description:{story:"**Conversion B** — production default on all deal pages.\nTwo-column: left = full offer with incentive switching; right = lead form → dealer match.\nThis story provides `allIncentives` with 3 offers (finance, cash, special) for switching.",...s.parameters?.docs?.description}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  name: '5b – Conversion B (Lease offer)',
  args: {
    isOpen: true,
    variant: 'conversion-b',
    offer: camryOffer,
    allIncentives: camryIncentives,
    selectedIncentiveId: 'camry-lease-1',
    ...actions
  }
}`,...l.parameters?.docs?.source},description:{story:`**Conversion B with Lease** — same two-column layout but with a lease-type incentive selected.
Shows lease-specific sections: monthly payment, cash-down table by trim, mileage terms.`,...l.parameters?.docs?.description}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  name: '5c – Conversion B (Cash offer)',
  args: {
    isOpen: true,
    variant: 'conversion-b',
    offer: equinoxOffer,
    allIncentives: equinoxIncentives,
    selectedIncentiveId: 'equinox-cash-1',
    ...actions
  }
}`,...c.parameters?.docs?.source},description:{story:`**Conversion B with Cash** — pre-selects the $1,500 cash back offer.
Shows cash-specific rendering: "cash back" suffix, different expert tip.`,...c.parameters?.docs?.description}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  name: '5d – Conversion B (Military/restricted)',
  args: {
    isOpen: true,
    variant: 'conversion-b',
    offer: equinoxOffer,
    allIncentives: equinoxIncentives,
    selectedIncentiveId: 'equinox-special-military',
    ...actions
  }
}`,...d.parameters?.docs?.source},description:{story:`**Conversion B with Military incentive** — shows the restricted eligibility UI.
The eligibility box renders with a "Military / Veterans" badge and restricted styling.`,...d.parameters?.docs?.description}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  name: '5e – Conversion B (Default fallback)',
  args: {
    isOpen: true,
    variant: 'conversion-b',
    ...actions
  }
}`,...p.parameters?.docs?.source},description:{story:`**Conversion B — no offer data.** Falls back to the built-in Honda CR-V sample.
Tests the default/fallback rendering path.`,...p.parameters?.docs?.description}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  name: '6 – Conversion B (No Form)',
  args: {
    isOpen: true,
    variant: 'conversion-b-no-form',
    offer: equinoxOffer,
    allIncentives: equinoxIncentives,
    selectedIncentiveId: 'equinox-finance-1',
    ...actions
  }
}`,...m.parameters?.docs?.source},description:{story:`**Conversion B — No Form** — single-column, no lead form.
Used in the Hero component for info-only display. Shows "Shop on Marketplace" CTA.`,...m.parameters?.docs?.description}}};const K=["ReviewAll","ConversionB","ConversionBLease","ConversionBCash","ConversionBMilitary","ConversionBFallback","ConversionBNoForm"];export{s as ConversionB,c as ConversionBCash,p as ConversionBFallback,l as ConversionBLease,d as ConversionBMilitary,m as ConversionBNoForm,a as ReviewAll,K as __namedExportsOrder,Z as default};
