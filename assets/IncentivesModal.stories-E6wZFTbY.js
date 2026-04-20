import{j as e,r as b}from"./iframe-DHVIttNg.js";import{I}from"./IncentivesModal-BpQxPSuE.js";import"./preload-helper-PPVm8Dsz.js";import"./index-xqRdrMaq.js";import"./index-DvuVPoyD.js";import"./trimService-DLkm3_Mg.js";import"./dateUtils-Blw69jOb.js";import"./x-DuSh-QQq.js";import"./createLucideIcon-0zaSyEeQ.js";import"./info-CP-IiuVA.js";import"./trending-down-CI79AIcY.js";import"./circle-check-big-qgwpsPl8.js";import"./gem-CqZ_aUfc.js";import"./clock-BDBFy1uF.js";import"./lightbulb-BFlqHE7M.js";import"./badge-check-_7AS9DTG.js";import"./shield-check-CucAcHE7.js";import"./check-DHCMx1GW.js";import"./phone-CVIfaJ7u.js";import"./map-pin-B-zw6DH9.js";import"./navigation-RJVLFlXx.js";const A="https://d2kde5ohu8qb21.cloudfront.net/files/65f7e4f9417c9000085e7bba/003-2024-chevrolet-trailblazer-front-three-quarters-view.jpg",k="https://hips.hearstapps.com/hmg-prod/images/2024-toyota-camry-102-64cbc4858e198.jpg",f={year:2026,make:"Chevrolet",model:"Equinox",slug:"2026/chevrolet/equinox",imageUrl:A,msrpMin:33300,msrpMax:38500,offerHeadline:"0% APR for 60 months",whatItMeans:"Zero-interest financing means every dollar of your payment goes toward the vehicle — not the bank. On a $35,000 loan, this saves you roughly $5,600 in interest vs. the average 7.1% rate.",yourSavings:"On a $35,000 loan over 60 months, $0 in interest vs. approximately $5,600 at 7.1% APR. That's over $93/month in savings.",whoQualifies:"Well-qualified buyers with approved credit through GM Financial.",eligibleTrims:["LT","2RS","3RS","Activ"],dontWaitText:"This offer expires May 1, 2026. Chevrolet incentives change monthly, so lock in your rate before it's gone.",eventLabel:"Chevrolet Equinox Current Offers",expirationDate:"May 1, 2026"},q={year:2026,make:"Toyota",model:"Camry",slug:"2026/toyota/camry",imageUrl:k,msrpMin:28855,msrpMax:34780,offerHeadline:"$359/mo Lease for 36 months",whatItMeans:"A manufacturer-subsidized lease gives you a lower monthly payment than financing. You drive a new Camry for 3 years with the option to buy at the end.",yourSavings:"Monthly lease payments start at $359/mo with $2,999 due at signing — significantly less than typical finance payments on this vehicle.",whoQualifies:"Well-qualified lessees with approved credit through Toyota Financial Services.",eligibleTrims:["LE","SE","XLE","XSE"],dontWaitText:"This offer expires April 30, 2026. Toyota adjusts lease programs monthly.",expirationDate:"April 30, 2026"},v=[{id:"equinox-finance-1",type:"finance",title:"0% APR for 60 months",description:"Zero-interest financing through GM Financial. Every payment goes toward the vehicle.",value:"0% APR",expirationDate:"May 1, 2026",terms:"For well-qualified buyers. 60-month term available through GM Financial. Not compatible with some other offers.",eligibility:"All qualified buyers with approved credit through GM Financial.",programName:"Chevrolet Bonus Cash + APR",programDescription:"Manufacturer financing incentive",groupAffiliation:"everyone"},{id:"equinox-cash-1",type:"cash",title:"$1,500 Customer Cash",description:"Cash allowance applied toward the purchase of a new Equinox.",value:"$1,500",expirationDate:"May 1, 2026",terms:"Must take delivery by offer expiration. Cannot be combined with 0% APR.",groupAffiliation:"everyone"},{id:"equinox-special-military",type:"special",title:"$500 Military Appreciation",description:"Cash allowance for active, reserve, and retired military personnel.",value:"$500",expirationDate:"Ongoing",eligibility:"Valid military ID required.",groupAffiliation:"military"}],B=[{id:"camry-lease-1",type:"lease",title:"$359/mo Lease for 36 months",description:"Manufacturer-subsidized lease with $2,999 due at signing. 12,000 miles/year.",value:"$359/mo",expirationDate:"April 30, 2026",terms:"$359/mo for 36 months with $2,999 due at signing. 12,000 miles/year. $0.15/mi overage. Tax, title, license extra.",eligibility:"Well-qualified lessees with approved credit through Toyota Financial Services.",programName:"Toyota Lease Specials",groupAffiliation:"everyone"},{id:"camry-finance-1",type:"finance",title:"3.9% APR for 60 months",description:"Below-market financing through Toyota Financial.",value:"3.9% APR",expirationDate:"April 30, 2026",terms:"3.9% APR for 60 months. 4.9% for 72 months. Well-qualified buyers through TFS.",groupAffiliation:"everyone"}],h={"conversion-b":{label:"5",title:"5 – Conversion B (Two-Column + Form)",description:"Two-column layout: left side shows full offer details with incentive switching; right side has a lead form that resolves to dealer match. Production variant used on all deal pages."},"conversion-b-no-form":{label:"6",title:"6 – Conversion B (No Form)",description:'Same left-column detail as Conversion B but without the form. Single column with a "Shop on Marketplace" CTA. Used in Hero component for info-only display.'}},m=Object.keys(h),t={onClose:()=>console.log("[story] Modal closed"),onCtaClick:()=>console.log("[story] CTA clicked"),onSubmitForm:u=>console.log("[story] Form submitted",u)};function M(){const[u,y]=b.useState(0),[g,w]=b.useState(!1),C=m[u],x=h[C];return b.useEffect(()=>{if(!g)return;const o=i=>{i.key==="ArrowLeft"&&(i.preventDefault(),y(n=>n===0?m.length-1:n-1)),i.key==="ArrowRight"&&(i.preventDefault(),y(n=>n===m.length-1?0:n+1))};return window.addEventListener("keydown",o),()=>window.removeEventListener("keydown",o)},[g]),e.jsxs("div",{className:"stories-switcher",children:[e.jsxs("div",{className:"stories-switcher__panel",children:[e.jsxs("p",{className:"stories-switcher__intro",children:["Pick a variant, then open the modal. Use"," ",e.jsx("kbd",{className:"stories-switcher__kbd",children:"←"})," ",e.jsx("kbd",{className:"stories-switcher__kbd",children:"→"})," to cycle when the modal is open."]}),e.jsxs("div",{className:"stories-switcher__controls",role:"group","aria-label":"Variant picker",children:[e.jsx("span",{className:"stories-switcher__label",children:"Variant:"}),m.map((o,i)=>{const n=u===i;return e.jsx("button",{type:"button",onClick:()=>y(i),className:n?"stories-switcher__pill stories-switcher__pill--active":"stories-switcher__pill","aria-pressed":n,"aria-label":h[o].title,children:h[o].label},o)})]}),e.jsxs("div",{className:"stories-switcher__meta",children:[e.jsx("p",{className:"stories-switcher__title",children:x.title}),e.jsx("p",{className:"stories-switcher__description",children:x.description})]}),e.jsx("button",{type:"button",onClick:()=>w(!0),className:"stories-switcher__cta",children:"Open modal"})]}),e.jsx(I,{isOpen:g,variant:C,offer:f,allIncentives:v,selectedIncentiveId:"equinox-finance-1",...t,onClose:()=>w(!1)})]})}const Y={title:"Organisms/IncentivesModal",component:I,parameters:{layout:"centered",docs:{description:{component:`A full-screen modal for vehicle deal/incentive details. Used across all deal pages to show offer breakdowns, expert tips, eligibility, and lead capture.

**Production variants:** conversion-b (default, two-column + form) and conversion-b-no-form (single column, used in Hero).

Use the "Review all" story to cycle between variants interactively. The Conversion B sub-stories below demonstrate different incentive types (finance, lease, cash, military/restricted) and the default fallback.`},story:{inline:!1,iframeHeight:600}}},tags:["autodocs"],argTypes:{variant:{control:"select",options:m,description:"Modal layout variant",table:{category:"Core"}},isOpen:{control:"boolean",description:"Controls modal visibility",table:{category:"Core"}},offer:{description:"Vehicle and offer data. Falls back to built-in sample.",table:{category:"Data"}},allIncentives:{description:"Full incentive list — enables offer switching in conversion-b.",table:{category:"Data"}},selectedIncentiveId:{description:"Pre-selected incentive ID.",table:{category:"Data"}},onClose:{table:{category:"Callbacks"}},onCtaClick:{table:{category:"Callbacks"}},onSubmitForm:{table:{category:"Callbacks"}}}},r={name:"Review all (1–6 switcher)",render:()=>e.jsx(M,{})},a={name:"5 – Conversion B (Finance offer)",args:{isOpen:!0,variant:"conversion-b",offer:f,allIncentives:v,selectedIncentiveId:"equinox-finance-1",...t}},s={name:"5b – Conversion B (Lease offer)",args:{isOpen:!0,variant:"conversion-b",offer:q,allIncentives:B,selectedIncentiveId:"camry-lease-1",...t}},l={name:"5c – Conversion B (Cash offer)",args:{isOpen:!0,variant:"conversion-b",offer:f,allIncentives:v,selectedIncentiveId:"equinox-cash-1",...t}},c={name:"5d – Conversion B (Military/restricted)",args:{isOpen:!0,variant:"conversion-b",offer:f,allIncentives:v,selectedIncentiveId:"equinox-special-military",...t}},d={name:"5e – Conversion B (Default fallback)",args:{isOpen:!0,variant:"conversion-b",...t}},p={name:"6 – Conversion B (No Form)",args:{isOpen:!0,variant:"conversion-b-no-form",offer:f,allIncentives:v,selectedIncentiveId:"equinox-finance-1",...t}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  name: 'Review all (1–6 switcher)',
  render: () => <ReviewAllVariants />
}`,...r.parameters?.docs?.source},description:{story:`Interactive variant switcher. Pick 1–6 and use arrow keys to cycle.
All variants use the Chevrolet Equinox 0% APR sample with 3 incentives.`,...r.parameters?.docs?.description}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  name: '5 – Conversion B (Finance offer)',
  args: {
    isOpen: true,
    variant: 'conversion-b',
    offer: equinoxOffer,
    allIncentives: equinoxIncentives,
    selectedIncentiveId: 'equinox-finance-1',
    ...actions
  }
}`,...a.parameters?.docs?.source},description:{story:"**Conversion B** — production default on all deal pages.\nTwo-column: left = full offer with incentive switching; right = lead form → dealer match.\nThis story provides `allIncentives` with 3 offers (finance, cash, special) for switching.",...a.parameters?.docs?.description}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  name: '5b – Conversion B (Lease offer)',
  args: {
    isOpen: true,
    variant: 'conversion-b',
    offer: camryOffer,
    allIncentives: camryIncentives,
    selectedIncentiveId: 'camry-lease-1',
    ...actions
  }
}`,...s.parameters?.docs?.source},description:{story:`**Conversion B with Lease** — same two-column layout but with a lease-type incentive selected.
Shows lease-specific sections: monthly payment, cash-down table by trim, mileage terms.`,...s.parameters?.docs?.description}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  name: '5c – Conversion B (Cash offer)',
  args: {
    isOpen: true,
    variant: 'conversion-b',
    offer: equinoxOffer,
    allIncentives: equinoxIncentives,
    selectedIncentiveId: 'equinox-cash-1',
    ...actions
  }
}`,...l.parameters?.docs?.source},description:{story:`**Conversion B with Cash** — pre-selects the $1,500 cash back offer.
Shows cash-specific rendering: "cash back" suffix, different expert tip.`,...l.parameters?.docs?.description}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  name: '5d – Conversion B (Military/restricted)',
  args: {
    isOpen: true,
    variant: 'conversion-b',
    offer: equinoxOffer,
    allIncentives: equinoxIncentives,
    selectedIncentiveId: 'equinox-special-military',
    ...actions
  }
}`,...c.parameters?.docs?.source},description:{story:`**Conversion B with Military incentive** — shows the restricted eligibility UI.
The eligibility box renders with a "Military / Veterans" badge and restricted styling.`,...c.parameters?.docs?.description}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  name: '5e – Conversion B (Default fallback)',
  args: {
    isOpen: true,
    variant: 'conversion-b',
    ...actions
  }
}`,...d.parameters?.docs?.source},description:{story:`**Conversion B — no offer data.** Falls back to the built-in Honda CR-V sample.
Tests the default/fallback rendering path.`,...d.parameters?.docs?.description}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  name: '6 – Conversion B (No Form)',
  args: {
    isOpen: true,
    variant: 'conversion-b-no-form',
    offer: equinoxOffer,
    allIncentives: equinoxIncentives,
    selectedIncentiveId: 'equinox-finance-1',
    ...actions
  }
}`,...p.parameters?.docs?.source},description:{story:`**Conversion B — No Form** — single-column, no lead form.
Used in the Hero component for info-only display. Shows "Shop on Marketplace" CTA.`,...p.parameters?.docs?.description}}};const Z=["ReviewAll","ConversionB","ConversionBLease","ConversionBCash","ConversionBMilitary","ConversionBFallback","ConversionBNoForm"];export{a as ConversionB,l as ConversionBCash,d as ConversionBFallback,s as ConversionBLease,c as ConversionBMilitary,p as ConversionBNoForm,r as ReviewAll,Z as __namedExportsOrder,Y as default};
