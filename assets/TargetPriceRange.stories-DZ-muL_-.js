import{T as s}from"./TargetPriceRange-szybBlYE.js";import"./iframe-DvCa2y-O.js";import"./preload-helper-PPVm8Dsz.js";import"./chevron-down-DNNILSVL.js";import"./createLucideIcon-BGRcve6n.js";import"./circle-check-big-DPOXwgnx.js";import"./trending-down-u_nOT57c.js";import"./clock-B1EBv9lg.js";import"./info-DudgWifY.js";import"./search-DS5qK7bJ.js";const h={title:"Organisms/TargetPriceRange",component:s,parameters:{layout:"padded",docs:{description:{component:`
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

- **Trim Selector Usage** — Which trims users explore
- **Time in Section** — Engagement with pricing data
- **Scroll to CTA** — Correlation with lead form completion
- **Price Alert Signups** — Users wanting price notifications

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
        `}}},tags:["autodocs"],argTypes:{vehicleName:{description:"Full name of the vehicle (Year Make Model)",control:"text",table:{type:{summary:"string"},category:"Vehicle"}},msrp:{description:"Base MSRP in dollars",control:{type:"number",min:15e3,max:2e5,step:1e3},table:{type:{summary:"number"},category:"Pricing"}},trims:{description:"Array of available trims with their MSRPs",control:"object",table:{type:{summary:"Trim[]",detail:"{ name: string; msrp: number }[]"},category:"Pricing"}}}},e={args:{vehicleName:"2025 Chevrolet Trax",msrp:21895,trims:[{name:"LS FWD",msrp:21895},{name:"1RS FWD",msrp:23195},{name:"LT FWD",msrp:23395},{name:"RS FWD",msrp:24995},{name:"ACTIV FWD",msrp:24995}]},parameters:{docs:{description:{story:"Default price range display for a subcompact SUV with multiple trim levels."}}}},r={args:{vehicleName:"2025 Chevrolet Trailblazer",msrp:24995,trims:[{name:"LS",msrp:24995},{name:"LT",msrp:27295},{name:"ACTIV",msrp:29995},{name:"RS",msrp:31895}]},parameters:{docs:{description:{story:"Price range for a compact SUV with wider trim spread."}}}},a={args:{vehicleName:"2025 Chevrolet Trax LS",msrp:21895,trims:[{name:"LS FWD",msrp:21895},{name:"1RS FWD",msrp:23195}]},parameters:{docs:{description:{story:"Simplified view with only two trim options for budget-focused shoppers."}}}},n={args:{vehicleName:"2025 Chevrolet Camaro",msrp:29100,trims:[{name:"1LS",msrp:29100},{name:"1LT",msrp:30700},{name:"2LT",msrp:32700},{name:"SS",msrp:44100},{name:"ZL1",msrp:71700}]},parameters:{docs:{description:{story:"Wide price range from base to high-performance trims, demonstrating large MSRP spread."}}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
}`,...e.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
}`,...r.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
}`,...a.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
}`,...n.parameters?.docs?.source}}};const S=["Default","LuxuryVehicle","BudgetVehicle","HighEndLuxury"];export{a as BudgetVehicle,e as Default,n as HighEndLuxury,r as LuxuryVehicle,S as __namedExportsOrder,h as default};
