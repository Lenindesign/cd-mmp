import{r as a,j as e}from"./iframe-D7IxDuYu.js";import"./index-C_qiXwZJ.js";import"./leaseDealsService-P60L_1Gl.js";import{o as z}from"./incentiveAdapter-C0j1lC3W.js";import{g as A}from"./dateUtils-Blw69jOb.js";import{B as u}from"./Button-CAq49vnT.js";import{T as L}from"./Tabs-ahFBIc9r.js";import{C as P}from"./circle-alert-C7BAZG3J.js";import{C as k}from"./clock-BdjjBjjv.js";import{C as N}from"./chevron-down-B_9qAaGc.js";import{I as F}from"./info-CAutMZ-c.js";import{A as q}from"./arrow-up-right-Cnk1Dpjo.js";import"./preload-helper-PPVm8Dsz.js";import"./vehicleService-23eXHQkm.js";import"./createLucideIcon-BRFUFR5c.js";const b=({make:n="Chevrolet",model:r="Trax",zipCode:T="10940",fuelType:v="Gas"})=>{const[p,C]=a.useState("all"),[S,I]=a.useState("Select Est. Credit Score"),[E,M]=a.useState("Select Monthly Term"),{month:f,year:g}=A(),i=a.useMemo(()=>z(n,r),[n,r]),c=a.useMemo(()=>i.filter(s=>s.type==="cash").reduce((s,l)=>{const j=l.value.match(/\$([\d,]+)/);return j?s+parseInt(j[1].replace(/,/g,""),10):s},0),[i]),h=s=>i.some(l=>l.type===s),$=[{id:"all",label:"All"},...h("cash")?[{id:"cash",label:"Cash"}]:[],...h("finance")?[{id:"finance",label:"Buy"}]:[],...h("lease")?[{id:"lease",label:"Lease"}]:[]],w=i.find(s=>s.type==="finance"),D=i.find(s=>s.type==="lease"),x=w?.value.match(/[\d.]+/)?.[0]||null,y=D?.value.match(/\$[\d,]+/)?.[0]||null,V=p==="all"?i:i.filter(s=>s.type===p),_=s=>new Intl.NumberFormat("en-US",{style:"currency",currency:"USD",minimumFractionDigits:0,maximumFractionDigits:0}).format(s),R=s=>({cash:"Cash",finance:"Buy",lease:"Lease",special:"Special"})[s],t=[];x&&t.push(`interest rates starting as low as ${x}% APR`),y&&t.push(`lease deals starting at ${y}/month`),c>0&&t.push(`up to ${_(c)} in combined cash incentives`);const B=t.length>0?`, including ${t.join(", ").replace(/,([^,]*)$/,", and$1")}.`:".";return i.length===0?e.jsx("section",{className:"incentives",children:e.jsx("div",{className:"container",children:e.jsxs("div",{className:"incentives__card",children:[e.jsx("div",{className:"incentives__header",children:e.jsx("h2",{className:"incentives__title",children:"Manufacturer Incentives & Rebates"})}),e.jsxs("p",{className:"incentives__description",children:["No current manufacturer incentives are available for the ",n," ",r," in ",f," ",g,". Check back soon — ",n," typically refreshes programs at the start of each month."]})]})})}):e.jsx("section",{className:"incentives",children:e.jsx("div",{className:"container",children:e.jsxs("div",{className:"incentives__card",children:[e.jsx("div",{className:"incentives__header",children:e.jsx("h2",{className:"incentives__title",children:"Manufacturer Incentives & Rebates"})}),c>0&&e.jsxs("div",{className:"incentives__urgency",children:[e.jsxs("div",{className:"incentives__urgency-alert",children:[e.jsx(P,{size:20}),e.jsx("span",{children:"These incentives expire soon!"})]}),e.jsxs("div",{className:"incentives__urgency-content",children:[e.jsxs("div",{className:"incentives__urgency-text",children:[e.jsx(k,{size:18}),e.jsxs("p",{children:["Don't miss out on ",e.jsxs("strong",{children:["up to ",_(c)]})," in savings. Act before these deals expire."]})]}),e.jsx(u,{variant:"primary",className:"incentives__urgency-cta",children:"Claim Your Incentive Now"})]})]}),e.jsxs("p",{className:"incentives__description",children:["For ",e.jsxs("strong",{children:[f," ",g]}),", ",n," is running ",i.length," active ",i.length===1?"program":"programs"," on the ",r,B,v==="Electric"&&" This vehicle may also qualify for federal EV tax credits.",v==="Hybrid"&&" This vehicle may also qualify for clean vehicle credits."]}),e.jsxs("div",{className:"incentives__filters",children:[e.jsxs("div",{className:"incentives__select-wrapper",children:[e.jsx("span",{className:"incentives__select-label",children:"Est. Credit Score"}),e.jsx("span",{className:"incentives__select-divider",children:"·"}),e.jsxs("select",{className:"incentives__select",value:S,onChange:s=>I(s.target.value),children:[e.jsx("option",{children:"Select Est. Credit Score"}),e.jsx("option",{children:"Excellent (750+)"}),e.jsx("option",{children:"Good (700-749)"}),e.jsx("option",{children:"Fair (650-699)"}),e.jsx("option",{children:"Poor (Below 650)"})]}),e.jsx(N,{size:16,className:"incentives__select-icon"})]}),e.jsxs("div",{className:"incentives__select-wrapper",children:[e.jsx("span",{className:"incentives__select-label",children:"Monthly Term"}),e.jsx("span",{className:"incentives__select-divider",children:"·"}),e.jsxs("select",{className:"incentives__select",value:E,onChange:s=>M(s.target.value),children:[e.jsx("option",{children:"Select Monthly Term"}),e.jsx("option",{children:"24 Months"}),e.jsx("option",{children:"36 Months"}),e.jsx("option",{children:"48 Months"}),e.jsx("option",{children:"60 Months"}),e.jsx("option",{children:"72 Months"})]}),e.jsx(N,{size:16,className:"incentives__select-icon"})]})]}),e.jsxs("div",{className:"incentives__tabs-row",children:[e.jsx(L,{variant:"pills",items:$.map(s=>({value:s.id,label:s.label})),value:p,onChange:C}),e.jsxs("div",{className:"incentives__location",children:[e.jsxs("span",{className:"incentives__zip",children:["📍 ",T]}),e.jsx(u,{variant:"ghost",size:"small",className:"incentives__change-location",children:"Change Location"})]})]}),e.jsx("div",{className:"incentives__list",children:V.map(s=>e.jsxs("div",{className:"incentives__item",children:[e.jsxs("div",{className:"incentives__item-content",children:[e.jsx("span",{className:`incentives__badge incentives__badge--${s.type}`,children:R(s.type)}),e.jsxs("div",{className:"incentives__item-info",children:[e.jsxs("h3",{className:"incentives__item-title",children:[s.title,e.jsx("button",{className:"incentives__item-info-btn","aria-label":"More info",children:e.jsx(F,{size:14})})]}),e.jsxs("p",{className:"incentives__item-details",children:[s.description,e.jsxs("span",{className:"incentives__item-exp",children:["Exp · ",s.expirationDate]})]}),s.terms&&e.jsx("p",{className:"incentives__item-terms",children:s.terms}),s.eligibility&&e.jsxs("p",{className:"incentives__item-eligibility",children:[e.jsx("strong",{children:"Eligibility:"})," ",s.eligibility]})]})]}),e.jsx(u,{variant:"outline",size:"small",className:"incentives__item-link","aria-label":"View details",iconLeft:e.jsx(q,{size:18})})]},s.id))}),e.jsx("div",{className:"incentives__source",children:e.jsx("p",{children:"Incentive data sourced from manufacturer websites and verified through Edmunds, KBB, and dealer networks. Deals may vary by region and dealer participation."})})]})})})};b.__docgenInfo={description:"",methods:[],displayName:"Incentives",props:{month:{required:!1,tsType:{name:"string"},description:""},year:{required:!1,tsType:{name:"number"},description:""},make:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'Chevrolet'",computed:!1}},model:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'Trax'",computed:!1}},zipCode:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'10940'",computed:!1}},msrp:{required:!1,tsType:{name:"number"},description:""},bodyStyle:{required:!1,tsType:{name:"string"},description:""},fuelType:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'Gas'",computed:!1}}}};const te={title:"Organisms/Incentives",component:b,parameters:{layout:"padded",docs:{description:{component:`
# Incentives & Offers

## Overview

Displays current manufacturer incentives, rebates, and special financing. This is high-value content that directly impacts purchase decisions.

---

## Business Purpose

| Goal | How It Achieves It |
|------|-------------------|
| Purchase Urgency | Limited-time offers create urgency |
| Value Communication | Shows total savings available |
| Lead Generation | "Get This Deal" CTAs drive leads |
| Competitive Edge | Users get info not on dealer sites |

---

## Key Metrics

- **Incentive Views** - Which offers get most attention
- **CTA Clicks** - "Get This Deal" engagement
- **Time Sensitivity** - Impact of expiration dates
- **Regional Variance** - Local offer performance

---

## Incentive Types

| Type | Description | Typical Value |
|------|-------------|---------------|
| Cash Rebate | Direct discount from MSRP | $500-$5,000 |
| APR Special | Reduced financing rate | 0-2.9% |
| Lease Deal | Monthly payment special | $199-$399/mo |
| Trade Bonus | Extra trade-in value | $500-$2,000 |
| Loyalty | Returning customer discount | $500-$1,500 |
| EV Tax Credit | Federal/state incentives | $2,500-$7,500 |

---

## Time Sensitivity

| Element | Purpose |
|---------|---------|
| Expiration Date | Creates urgency |
| "Ends Soon" Badge | Highlights expiring offers |
| Monthly Refresh | Incentives change monthly |

---

## Product Considerations

**Data Freshness**
- Incentives change monthly
- Regional variations exist
- Stacking rules are complex

**Revenue Opportunity**
- High purchase intent users
- Direct dealer lead attribution
- Premium placement for OEMs

**Compliance**
- Accurate expiration dates
- Fine print disclosure
- Regional availability notes

**EV Focus**
- Federal tax credit prominence
- State incentive aggregation
- Charging incentives
        `}}},tags:["autodocs"],argTypes:{make:{description:"Vehicle manufacturer",control:"select",options:["Chevrolet","Toyota","Honda","Ford","BMW","Tesla"],table:{type:{summary:"string"},category:"Vehicle"}},model:{description:"Vehicle model name",control:"text",table:{type:{summary:"string"},category:"Vehicle"}}}},o={args:{make:"Chevrolet",model:"Trax"},parameters:{docs:{description:{story:"Standard incentives display for a mainstream vehicle."}}}},d={args:{make:"Chevrolet",model:"Trailblazer"},parameters:{docs:{description:{story:"Incentives for a mid-range vehicle with different offer structure."}}}},m={args:{make:"Chevrolet",model:"Bolt EV"},parameters:{docs:{description:{story:"Electric vehicle incentives including federal tax credit information."}}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    make: 'Chevrolet',
    model: 'Trax'
  },
  parameters: {
    docs: {
      description: {
        story: 'Standard incentives display for a mainstream vehicle.'
      }
    }
  }
}`,...o.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    make: 'Chevrolet',
    model: 'Trailblazer'
  },
  parameters: {
    docs: {
      description: {
        story: 'Incentives for a mid-range vehicle with different offer structure.'
      }
    }
  }
}`,...d.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    make: 'Chevrolet',
    model: 'Bolt EV'
  },
  parameters: {
    docs: {
      description: {
        story: 'Electric vehicle incentives including federal tax credit information.'
      }
    }
  }
}`,...m.parameters?.docs?.source}}};const ae=["Default","LuxuryBrand","Electric"];export{o as Default,m as Electric,d as LuxuryBrand,ae as __namedExportsOrder,te as default};
