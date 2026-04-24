import{I as i}from"./Incentives-61e8y8wk.js";import"./iframe-BK2sHvyk.js";import"./preload-helper-PPVm8Dsz.js";import"./index-B-JoA3P0.js";import"./leaseDealsService-BLuzPC0b.js";import"./vehicleService-BTivPZrm.js";import"./incentiveAdapter-BTD-ii4P.js";import"./dateUtils-Blw69jOb.js";import"./Button-Bj-LFLXT.js";import"./Tabs-BlVnH6sL.js";import"./circle-alert-Dr-y7Otu.js";import"./createLucideIcon-CO65N0pK.js";import"./clock-BpHjK344.js";import"./chevron-down-DJlw48s1.js";import"./info-Ur-FB8tC.js";import"./arrow-up-right-B5sG6aSp.js";const x={title:"Organisms/Incentives",component:i,parameters:{layout:"padded",docs:{description:{component:`
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
        `}}},tags:["autodocs"],argTypes:{make:{description:"Vehicle manufacturer",control:"select",options:["Chevrolet","Toyota","Honda","Ford","BMW","Tesla"],table:{type:{summary:"string"},category:"Vehicle"}},model:{description:"Vehicle model name",control:"text",table:{type:{summary:"string"},category:"Vehicle"}}}},e={args:{make:"Chevrolet",model:"Trax"},parameters:{docs:{description:{story:"Standard incentives display for a mainstream vehicle."}}}},t={args:{make:"Chevrolet",model:"Trailblazer"},parameters:{docs:{description:{story:"Incentives for a mid-range vehicle with different offer structure."}}}},r={args:{make:"Chevrolet",model:"Bolt EV"},parameters:{docs:{description:{story:"Electric vehicle incentives including federal tax credit information."}}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
}`,...e.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
}`,...t.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
}`,...r.parameters?.docs?.source}}};const C=["Default","LuxuryBrand","Electric"];export{e as Default,r as Electric,t as LuxuryBrand,C as __namedExportsOrder,x as default};
