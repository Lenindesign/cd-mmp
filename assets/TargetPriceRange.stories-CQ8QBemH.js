import{r as s,j as e}from"./iframe-D2Lzw-Bp.js";import{C as R}from"./chevron-down-BA7ynSF7.js";import{C as F}from"./circle-check-big-JIXoVv1G.js";import{T as P}from"./trending-down-DIsbLfTC.js";import{P as w,T as y}from"./target-DPqCRBG6.js";import{C as b}from"./clock-CDjNeKgz.js";import{T as W}from"./tag-BpFt6Qfe.js";import{I as z}from"./info-CZh93nhm.js";import{S as V}from"./search-pBkWlj-w.js";import"./preload-helper-PPVm8Dsz.js";import"./createLucideIcon-BbW__gvI.js";const A=[{name:"LS FWD",msrp:21895},{name:"1RS FWD",msrp:23195},{name:"LT FWD",msrp:23395},{name:"RS FWD",msrp:24995},{name:"ACTIV FWD",msrp:24995}],B=r=>r>2e5?{msrp:r,dealerPrice:Math.round(r*1.05),targetPriceLow:Math.round(r*.98),targetPriceHigh:r}:r>1e5?{msrp:r,dealerPrice:Math.round(r*1.02),targetPriceLow:Math.round(r*.95),targetPriceHigh:Math.round(r*.98)}:r>5e4?{msrp:r,dealerPrice:Math.round(r*1.015),targetPriceLow:Math.round(r*.93),targetPriceHigh:Math.round(r*.97)}:{msrp:r,dealerPrice:Math.round(r*1.01),targetPriceLow:Math.round(r*.92),targetPriceHigh:Math.round(r*.97)},I=r=>r<35e3?[{name:"Base",msrp:r},{name:"Sport",msrp:Math.round(r*1.08)},{name:"Premium",msrp:Math.round(r*1.15)}]:r<8e4?[{name:"Base",msrp:r},{name:"Sport",msrp:Math.round(r*1.1)},{name:"Premium",msrp:Math.round(r*1.18)},{name:"Performance",msrp:Math.round(r*1.25)}]:[{name:"Base",msrp:r},{name:"Performance",msrp:Math.round(r*1.15)},{name:"Track",msrp:Math.round(r*1.3)}],D=({msrp:r=21895,trims:i,vehicleName:u="Chevrolet Trax"})=>{const _=s.useMemo(()=>i&&i.length>0?i:u==="Chevrolet Trax"?A:I(r),[i,u,r]),[x,L]=s.useState(0),[v,j]=s.useState(!1),[f,n]=s.useState(null),d=_[x],C=s.useMemo(()=>B(d.msrp),[d.msrp]),{dealerPrice:t,targetPriceLow:g,targetPriceHigh:h}=C,a=c=>new Intl.NumberFormat("en-US",{style:"currency",currency:"USD",minimumFractionDigits:0,maximumFractionDigits:0}).format(c),N=t-g,T=t-h,M=(N/t*100).toFixed(1),k=(T/t*100).toFixed(1);return e.jsx("section",{className:"target-price",children:e.jsx("div",{className:"container",children:e.jsxs("div",{className:"target-price__card",children:[e.jsxs("div",{className:"target-price__header",children:[e.jsxs("div",{className:"target-price__header-row",children:[e.jsx("h2",{className:"target-price__title",children:"Target Price Range"}),e.jsxs("div",{className:"target-price__trim",children:[e.jsx("span",{className:"target-price__trim-label",children:"Trim:"}),e.jsxs("div",{className:"target-price__select-wrapper",children:[e.jsxs("button",{className:"target-price__select",onClick:()=>j(!v),children:[d.name,e.jsx(R,{size:16})]}),v&&e.jsx("ul",{className:"target-price__options",children:_.map((c,S)=>e.jsx("li",{children:e.jsx("button",{className:`target-price__option ${x===S?"active":""}`,onClick:()=>{L(S),j(!1)},children:c.name})},c.name))})]})]})]}),e.jsx("p",{className:"target-price__description",children:"The Target Price is the deal you should aim for after negotiating."})]}),e.jsxs("div",{className:"target-price__range-visual",children:[e.jsxs("div",{className:"target-price__markers",children:[e.jsxs("div",{className:"target-price__marker target-price__marker--start",onMouseEnter:()=>n("low"),onMouseLeave:()=>n(null),children:[e.jsx("div",{className:"target-price__marker-price",children:a(g)}),e.jsx("div",{className:"target-price__marker-icon target-price__marker-icon--green",children:e.jsx("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"currentColor",children:e.jsx("path",{d:"M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"})})}),e.jsx("div",{className:"target-price__marker-pin target-price__marker-pin--green"}),f==="low"&&e.jsxs("div",{className:"target-price__tooltip",children:[e.jsxs("div",{className:"target-price__tooltip-header",children:[e.jsx(F,{size:16,className:"target-price__tooltip-icon target-price__tooltip-icon--success"}),e.jsx("span",{className:"target-price__tooltip-title",children:"Best Possible Deal"})]}),e.jsxs("div",{className:"target-price__tooltip-content",children:[e.jsxs("div",{className:"target-price__tooltip-row",children:[e.jsx(P,{size:14}),e.jsxs("span",{children:["Save ",e.jsx("strong",{children:a(N)})," vs dealer price"]})]}),e.jsxs("div",{className:"target-price__tooltip-row",children:[e.jsx(w,{size:14}),e.jsxs("span",{children:[e.jsxs("strong",{children:[M,"%"]})," below asking price"]})]}),e.jsxs("div",{className:"target-price__tooltip-row",children:[e.jsx(b,{size:14}),e.jsx("span",{children:"Achievable at month-end or during clearance events"})]})]}),e.jsx("div",{className:"target-price__tooltip-tip",children:"💡 Ask about dealer incentives & rebates"})]})]}),e.jsxs("div",{className:"target-price__target-label",children:[e.jsx("span",{className:"target-price__dashed-line target-price__dashed-line--left"}),e.jsx("span",{className:"target-price__target-text",children:"Target Range"}),e.jsx("span",{className:"target-price__dashed-line target-price__dashed-line--right"})]}),e.jsxs("div",{className:"target-price__marker target-price__marker--end",onMouseEnter:()=>n("high"),onMouseLeave:()=>n(null),children:[e.jsx("div",{className:"target-price__marker-price",children:a(h)}),e.jsx("div",{className:"target-price__marker-icon target-price__marker-icon--green",children:e.jsx("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"currentColor",children:e.jsx("path",{d:"M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"})})}),e.jsx("div",{className:"target-price__marker-pin target-price__marker-pin--green"}),f==="high"&&e.jsxs("div",{className:"target-price__tooltip",children:[e.jsxs("div",{className:"target-price__tooltip-header",children:[e.jsx(y,{size:16,className:"target-price__tooltip-icon target-price__tooltip-icon--fair"}),e.jsx("span",{className:"target-price__tooltip-title",children:"Fair Market Deal"})]}),e.jsxs("div",{className:"target-price__tooltip-content",children:[e.jsxs("div",{className:"target-price__tooltip-row",children:[e.jsx(P,{size:14}),e.jsxs("span",{children:["Save ",e.jsx("strong",{children:a(T)})," vs dealer price"]})]}),e.jsxs("div",{className:"target-price__tooltip-row",children:[e.jsx(w,{size:14}),e.jsxs("span",{children:[e.jsxs("strong",{children:[k,"%"]})," below asking price"]})]}),e.jsxs("div",{className:"target-price__tooltip-row",children:[e.jsx(b,{size:14}),e.jsx("span",{children:"Achievable with standard negotiation"})]})]}),e.jsx("div",{className:"target-price__tooltip-tip",children:"💡 Most buyers achieve this price range"})]})]})]}),e.jsxs("div",{className:"target-price__bar",children:[e.jsx("div",{className:"target-price__bar-track"}),e.jsx("div",{className:"target-price__bar-range"}),e.jsxs("div",{className:"target-price__bar-dealer",children:[e.jsx("div",{className:"target-price__dealer-dot"}),e.jsxs("div",{className:"target-price__dealer-tooltip",children:[e.jsx("span",{className:"target-price__dealer-label",children:"Dealer Listed Price"}),e.jsx("span",{className:"target-price__dealer-value",children:a(t)})]})]})]})]}),e.jsxs("div",{className:"target-price__info-boxes",children:[e.jsxs("div",{className:"target-price__info-box",children:[e.jsx("div",{className:"target-price__info-icon",children:e.jsx(W,{size:20})}),e.jsxs("div",{className:"target-price__info-content",children:[e.jsx("span",{className:"target-price__info-value",children:a(t)}),e.jsx("span",{className:"target-price__info-label",children:"Dealer Listed Price"})]})]}),e.jsxs("div",{className:"target-price__info-box",children:[e.jsx("div",{className:"target-price__info-icon target-price__info-icon--green",children:e.jsx(y,{size:20})}),e.jsxs("div",{className:"target-price__info-content",children:[e.jsxs("span",{className:"target-price__info-value target-price__info-value--range",children:[a(g)," – ",a(h)]}),e.jsxs("span",{className:"target-price__info-label",children:["Target Price Range",e.jsx("button",{className:"target-price__info-btn","aria-label":"More info",children:e.jsx(z,{size:14})})]})]})]})]}),e.jsx("div",{className:"target-price__cta-section",children:e.jsxs("button",{className:"target-price__cta-btn",children:[e.jsx(V,{size:16}),e.jsx("span",{children:"Find Best Deals"})]})})]})})})};D.__docgenInfo={description:"",methods:[],displayName:"TargetPriceRange",props:{msrp:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"21895",computed:!1}},trims:{required:!1,tsType:{name:"Array",elements:[{name:"TrimData"}],raw:"TrimData[]"},description:""},vehicleName:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'Chevrolet Trax'",computed:!1}}}};const J={title:"Organisms/TargetPriceRange",component:D,parameters:{layout:"padded",docs:{description:{component:`
# Target Price Range

## Overview

Helps users understand what they should pay for a vehicle by showing MSRP, market pricing, and negotiation targets.

---

## Business Purpose

| Goal | How It Achieves It |
|------|-------------------|
| Price Transparency | Shows MSRP and market reality |
| User Empowerment | Helps users negotiate better deals |
| Trust Building | Honest pricing builds credibility |
| Lead Qualification | Users understand budget fit |

---

## Key Metrics

- **Trim Selector Usage** - Which trims users explore
- **Time in Section** - Engagement with pricing data
- **Scroll to CTA** - Correlation with lead form completion
- **Price Alert Signups** - Users wanting price notifications

---

## Pricing Components

| Element | Description |
|---------|-------------|
| MSRP | Manufacturer's suggested retail price |
| Target Price | What users should aim to pay |
| Market Range | Low to high transaction prices |
| Trim Selector | Compare pricing across trims |

---

## Trim Selection

Users can select different trims to see:
- Base MSRP for that trim
- Estimated target price
- Market positioning

---

## Product Considerations

**Data Accuracy**
- MSRP from manufacturer feeds
- Market data from transaction databases
- Regular updates needed

**User Value**
- "What should I pay?" is top user question
- Target price helps negotiation
- Builds trust vs dealer-only info

**Revenue Opportunity**
- Price alerts lead to email capture
- "Get Quote" CTA integration
- Dealer lead attribution
        `}}},tags:["autodocs"],argTypes:{vehicleName:{description:"Full name of the vehicle (Year Make Model)",control:"text",table:{type:{summary:"string"},category:"Vehicle"}},msrp:{description:"Base MSRP in dollars",control:{type:"number",min:15e3,max:2e5,step:1e3},table:{type:{summary:"number"},category:"Pricing"}},trims:{description:"Array of available trims with their MSRPs",control:"object",table:{type:{summary:"Trim[]",detail:"{ name: string; msrp: number }[]"},category:"Pricing"}}}},o={args:{vehicleName:"2025 Chevrolet Trax",msrp:21895,trims:[{name:"LS FWD",msrp:21895},{name:"1RS FWD",msrp:23195},{name:"LT FWD",msrp:23395},{name:"RS FWD",msrp:24995},{name:"ACTIV FWD",msrp:24995}]},parameters:{docs:{description:{story:"Default price range display for a subcompact SUV with multiple trim levels."}}}},l={args:{vehicleName:"2025 Chevrolet Trailblazer",msrp:24995,trims:[{name:"LS",msrp:24995},{name:"LT",msrp:27295},{name:"ACTIV",msrp:29995},{name:"RS",msrp:31895}]},parameters:{docs:{description:{story:"Price range for a compact SUV with wider trim spread."}}}},m={args:{vehicleName:"2025 Chevrolet Trax LS",msrp:21895,trims:[{name:"LS FWD",msrp:21895},{name:"1RS FWD",msrp:23195}]},parameters:{docs:{description:{story:"Simplified view with only two trim options for budget-focused shoppers."}}}},p={args:{vehicleName:"2025 Chevrolet Camaro",msrp:29100,trims:[{name:"1LS",msrp:29100},{name:"1LT",msrp:30700},{name:"2LT",msrp:32700},{name:"SS",msrp:44100},{name:"ZL1",msrp:71700}]},parameters:{docs:{description:{story:"Wide price range from base to high-performance trims, demonstrating large MSRP spread."}}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    vehicleName: '2025 Chevrolet Trax',
    msrp: 21895,
    trims: [{
      name: 'LS FWD',
      msrp: 21895
    }, {
      name: '1RS FWD',
      msrp: 23195
    }, {
      name: 'LT FWD',
      msrp: 23395
    }, {
      name: 'RS FWD',
      msrp: 24995
    }, {
      name: 'ACTIV FWD',
      msrp: 24995
    }]
  },
  parameters: {
    docs: {
      description: {
        story: 'Default price range display for a subcompact SUV with multiple trim levels.'
      }
    }
  }
}`,...o.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    vehicleName: '2025 Chevrolet Trailblazer',
    msrp: 24995,
    trims: [{
      name: 'LS',
      msrp: 24995
    }, {
      name: 'LT',
      msrp: 27295
    }, {
      name: 'ACTIV',
      msrp: 29995
    }, {
      name: 'RS',
      msrp: 31895
    }]
  },
  parameters: {
    docs: {
      description: {
        story: 'Price range for a compact SUV with wider trim spread.'
      }
    }
  }
}`,...l.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    vehicleName: '2025 Chevrolet Trax LS',
    msrp: 21895,
    trims: [{
      name: 'LS FWD',
      msrp: 21895
    }, {
      name: '1RS FWD',
      msrp: 23195
    }]
  },
  parameters: {
    docs: {
      description: {
        story: 'Simplified view with only two trim options for budget-focused shoppers.'
      }
    }
  }
}`,...m.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    vehicleName: '2025 Chevrolet Camaro',
    msrp: 29100,
    trims: [{
      name: '1LS',
      msrp: 29100
    }, {
      name: '1LT',
      msrp: 30700
    }, {
      name: '2LT',
      msrp: 32700
    }, {
      name: 'SS',
      msrp: 44100
    }, {
      name: 'ZL1',
      msrp: 71700
    }]
  },
  parameters: {
    docs: {
      description: {
        story: 'Wide price range from base to high-performance trims, demonstrating large MSRP spread.'
      }
    }
  }
}`,...p.parameters?.docs?.source}}};const X=["Default","LuxuryVehicle","BudgetVehicle","HighEndLuxury"];export{m as BudgetVehicle,o as Default,p as HighEndLuxury,l as LuxuryVehicle,X as __namedExportsOrder,J as default};
