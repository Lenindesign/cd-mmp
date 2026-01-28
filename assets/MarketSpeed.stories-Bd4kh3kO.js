import{M as t}from"./MarketSpeed-BitmEksr.js";import"./iframe-DxjPMNz-.js";import"./preload-helper-PPVm8Dsz.js";import"./vehicleService-ByoDejvg.js";import"./index-Dto8T7jp.js";import"./chevron-down-Bq-NoRgr.js";import"./createLucideIcon-DETWup7J.js";import"./info-C5-Ul5oW.js";import"./chevron-right-CcFyE7dO.js";const y={title:"Organisms/MarketSpeed",component:t,parameters:{layout:"padded",docs:{description:{component:`
# Market Speed Indicator

## Overview

Shows how quickly vehicles are selling in the market. Creates urgency for hot vehicles and negotiation confidence for slow sellers.

---

## Business Purpose

| Goal | How It Achieves It |
|------|-------------------|
| Urgency Creation | "Selling fast" motivates action |
| Negotiation Intel | "Slow" signals room to negotiate |
| Market Transparency | Unique data not on dealer sites |
| Trust Building | Honest market conditions |

---

## Key Metrics

- **Correlation with Leads** — Does "Hot" increase conversions?
- **User Engagement** — Time spent, interactions
- **Regional Accuracy** — Data quality by market
- **Update Frequency** — Freshness of data

---

## Speed Levels

| Level | Days on Lot | User Implication |
|-------|-------------|------------------|
| Hot | <14 days | Act fast, less negotiation room |
| Fast | 14-30 days | Popular, some urgency |
| Average | 30-45 days | Normal conditions |
| Slow | 45+ days | Negotiate harder |

---

## Data Components

| Metric | Description |
|--------|-------------|
| Days on Market | Average time to sell |
| Inventory Level | Supply in region |
| Price Trend | Rising, stable, falling |
| Demand Index | Buyer interest level |

---

## Product Considerations

**Data Sources**
- Dealer inventory feeds
- Auction data
- Transaction databases
- Regional aggregation

**User Psychology**
- "Hot" creates FOMO
- "Slow" empowers negotiation
- Both drive action

**Accuracy Requirements**
- Weekly data refresh minimum
- Regional granularity
- Seasonal adjustments

**A/B Testing Ideas**
- Visual indicator styles
- Urgency messaging variations
- Placement on page
        `}}},tags:["autodocs"],argTypes:{vehicleName:{description:"Full vehicle name (Year Make Model)",control:"text",table:{type:{summary:"string"},category:"Vehicle"}},make:{description:"Vehicle manufacturer",control:"text",table:{type:{summary:"string"},category:"Vehicle"}},model:{description:"Vehicle model name",control:"text",table:{type:{summary:"string"},category:"Vehicle"}},bodyStyle:{description:"Vehicle body style for market comparison",control:"select",options:["SUV","Sedan","Truck","Coupe","Hatchback","Convertible","Wagon"],table:{type:{summary:"string"},category:"Vehicle"}},msrp:{description:"MSRP for price segment analysis",control:{type:"number",min:15e3,max:2e5,step:1e3},table:{type:{summary:"number"},category:"Pricing"}}}},e={args:{vehicleName:"2025 Chevrolet Trax",make:"Chevrolet",model:"Trax",bodyStyle:"SUV",msrp:21895},parameters:{docs:{description:{story:"Market speed indicator for a popular subcompact SUV."}}}},r={args:{vehicleName:"2025 Chevrolet Trailblazer",make:"Chevrolet",model:"Trailblazer",bodyStyle:"SUV",msrp:24995},parameters:{docs:{description:{story:"Compact SUV market analysis showing different demand patterns."}}}},a={args:{vehicleName:"2025 Chevrolet Silverado",make:"Chevrolet",model:"Silverado",bodyStyle:"Truck",msrp:36e3},parameters:{docs:{description:{story:"Truck market speed - typically shows different patterns than passenger vehicles."}}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    vehicleName: '2025 Chevrolet Trax',
    make: 'Chevrolet',
    model: 'Trax',
    bodyStyle: 'SUV',
    msrp: 21895
  },
  parameters: {
    docs: {
      description: {
        story: 'Market speed indicator for a popular subcompact SUV.'
      }
    }
  }
}`,...e.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    vehicleName: '2025 Chevrolet Trailblazer',
    make: 'Chevrolet',
    model: 'Trailblazer',
    bodyStyle: 'SUV',
    msrp: 24995
  },
  parameters: {
    docs: {
      description: {
        story: 'Compact SUV market analysis showing different demand patterns.'
      }
    }
  }
}`,...r.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    vehicleName: '2025 Chevrolet Silverado',
    make: 'Chevrolet',
    model: 'Silverado',
    bodyStyle: 'Truck',
    msrp: 36000
  },
  parameters: {
    docs: {
      description: {
        story: 'Truck market speed - typically shows different patterns than passenger vehicles.'
      }
    }
  }
}`,...a.parameters?.docs?.source}}};const g=["Default","SUV","Truck"];export{e as Default,r as SUV,a as Truck,g as __namedExportsOrder,y as default};
