import{j as p}from"./iframe-jrgaLZXw.js";import{C as d,a as l}from"./CostToOwnEnhanced-BEAOAsZ7.js";import"./preload-helper-PPVm8Dsz.js";import"./info-Bm4XyrW6.js";import"./createLucideIcon-Cc-7UfB-.js";import"./chevron-down-BGYBGQU0.js";import"./trending-down-B5IYdS4b.js";import"./trending-up-D_5UGFua.js";import"./lightbulb-C_hGuTIO.js";import"./chevron-right-Bj2Rlo-8.js";import"./minus-BLT6ba8K.js";const b={title:"Organisms/CostToOwn",component:d,parameters:{layout:"padded",docs:{description:{component:`
# 5-Year Cost to Own

## Overview

Shows the true cost of ownership beyond the sticker price. Helps users understand long-term financial commitment.

---

## Business Purpose

| Goal | How It Achieves It |
|------|-------------------|
| Financial Clarity | Shows total cost, not just MSRP |
| EV Comparison | Highlights fuel savings for EVs |
| Trust Building | Transparent, comprehensive data |
| Decision Support | Helps users budget accurately |

---

## Key Metrics

- **Section Engagement** — Time spent, interactions
- **Trim Comparison Usage** — Users comparing trims
- **EV vs Gas Comparison** — Cross-shopping behavior
- **Correlation with Leads** — Does viewing predict conversion?

---

## Cost Categories

| Category | Description | Typical % of Total |
|----------|-------------|-------------------|
| Depreciation | Value loss over 5 years | 40-50% |
| Fuel/Energy | Gas or electricity costs | 15-25% |
| Insurance | Annual premium estimates | 10-15% |
| Maintenance | Scheduled service | 5-10% |
| Repairs | Expected fixes | 3-8% |
| Financing | Interest if financed | 5-10% |
| Taxes and Fees | Registration, sales tax | 3-5% |

---

## Fuel Type Impact

| Fuel Type | Key Difference |
|-----------|---------------|
| Gas | Higher fuel costs, typical maintenance |
| Electric | Lower fuel, less maintenance, higher depreciation |
| Hybrid | Balanced fuel costs, moderate maintenance |
| Plug-in Hybrid | Variable based on charging habits |

---

## Product Considerations

**Data Sources**
- Depreciation from auction/resale data
- Fuel costs from EPA + gas prices
- Insurance from industry averages
- Maintenance from OEM schedules

**User Value**
- "How much will this really cost?" is key question
- EV buyers especially value this
- Helps compare across fuel types

**Personalization Opportunities**
- Local fuel prices
- User's driving habits
- Financing terms customization
        `}}},tags:["autodocs"],argTypes:{vehicleName:{description:"Full vehicle name (Year Make Model)",control:"text",table:{type:{summary:"string"},category:"Vehicle"}},msrp:{description:"Base MSRP for cost calculations",control:{type:"number",min:15e3,max:2e5,step:1e3},table:{type:{summary:"number"},category:"Pricing"}},fuelType:{description:"Fuel type affects fuel/energy cost calculations",control:"select",options:["Gas","Electric","Hybrid","Diesel","Plug-in Hybrid"],table:{type:{summary:"string"},category:"Vehicle"}},trims:{description:"Available trims for comparison",control:"object",table:{type:{summary:"Trim[]",detail:"{ name: string; msrp: number }[]"},category:"Pricing"}}}},t={args:{vehicleName:"2025 Chevrolet Trax",msrp:21895,fuelType:"Gas"},parameters:{docs:{description:{story:"Basic cost breakdown for an affordable gas-powered SUV."}}}},n={args:{vehicleName:"2025 Chevrolet Trax",msrp:21895,fuelType:"Gas",trims:[{name:"LS",msrp:21895},{name:"1RS",msrp:23195},{name:"LT",msrp:23395},{name:"RS",msrp:24995},{name:"ACTIV",msrp:24995}]},parameters:{docs:{description:{story:"Cost breakdown with trim selector allowing users to compare ownership costs across trims."}}}},o={args:{vehicleName:"2025 Chevrolet Bolt EV",msrp:27495,fuelType:"Electric",trims:[{name:"1LT",msrp:27495},{name:"2LT",msrp:31495}]},parameters:{docs:{description:{story:"Electric vehicle with different cost structure - lower fuel costs, different maintenance patterns."}}}},i={args:{vehicleName:"2025 Chevrolet Trailblazer",msrp:24995,fuelType:"Gas"},parameters:{docs:{description:{story:"Compact SUV cost breakdown showing mid-range ownership costs."}}}},c={args:{vehicleName:"2025 Chevrolet Camaro",msrp:29100,fuelType:"Gas",trims:[{name:"1LS",msrp:29100},{name:"1LT",msrp:30700},{name:"SS",msrp:44100},{name:"ZL1",msrp:71700}]},parameters:{docs:{description:{story:"Performance vehicle with higher insurance and maintenance costs."}}}},m={args:{vehicleName:"2025 Chevrolet Corvette",msrp:65e3,fuelType:"Gas"},parameters:{docs:{description:{story:"High-end sports car demonstrating premium ownership costs."}}}},e={render:()=>p.jsx(l,{vehicleName:"2025 Chevrolet Trax",msrp:21895,fuelType:"Gas",trims:[{name:"LS FWD",msrp:21895},{name:"1RS FWD",msrp:23195},{name:"LT FWD",msrp:23395},{name:"RS FWD",msrp:24995},{name:"ACTIV FWD",msrp:24995}],competitors:[{name:"Honda HR-V",totalCost:32450,msrp:24895},{name:"Toyota Corolla Cross",totalCost:31200,msrp:23610},{name:"Hyundai Kona",totalCost:29800,msrp:24250}],segmentName:"Subcompact SUV",segmentAverage:31500}),parameters:{docs:{description:{story:`
## Key Improvements Over Original

### 1. Monthly Cost Display
Instead of showing only the 5-year total ($30,318), we now prominently display:
- **$505/month** average monthly cost
- Helps users connect to their actual budget

### 2. Competitor Comparison Chart
Visual bar chart showing:
- Ranked list of competitors by total cost
- Current vehicle highlighted
- "🏆 Lowest cost to own" badge if applicable

### 3. Detailed Cost Table with Context
Each cost category now shows:
- Monthly amount
- 5-year total
- **vs Average** indicator (↓5% better, ↑12% worse)

### 4. Depreciation Visualization
Clear visual showing:
- Today's value: $21,895
- After 5 years: $13,794
- Loss amount: -$8,101
- Retention percentage

### 5. Interactive Customization
Users can adjust:
- Annual miles driven (5,000 - 25,000)
- Gas price assumption ($2.50 - $5.50)
- Estimates update in real-time

### 6. Actionable Savings Tips
- 💡 Get 0% APR financing → Save $3,284
- 💡 Buy certified pre-owned → Save ~$3,240
- 💡 Compare insurance quotes → Save 15-25%

### 7. Clear CTAs
- **Get Pre-Approved** — Primary action
- **Compare Insurance Quotes** — Secondary action
        `}}}},r={render:()=>p.jsx(l,{vehicleName:"2025 Hyundai Kona",msrp:24250,fuelType:"Gas",trims:[{name:"SE",msrp:24250},{name:"SEL",msrp:26350},{name:"Limited",msrp:30700}],competitors:[{name:"Honda HR-V",totalCost:32450,msrp:24895},{name:"Toyota Corolla Cross",totalCost:31200,msrp:23610},{name:"Chevrolet Trax",totalCost:30318,msrp:21895}],segmentName:"Subcompact SUV",segmentAverage:31500}),parameters:{docs:{description:{story:'Shows the "🏆 Lowest cost to own" badge when the vehicle ranks #1 in comparison.'}}}},s={render:()=>p.jsx(l,{vehicleName:"2025 Chevrolet Bolt EV",msrp:27495,fuelType:"Electric",trims:[{name:"1LT",msrp:27495},{name:"2LT",msrp:31495}],competitors:[{name:"Nissan Leaf",totalCost:34500,msrp:28140},{name:"Hyundai Kona Electric",totalCost:36200,msrp:33550},{name:"Kia Niro EV",totalCost:35800,msrp:39990}],segmentName:"Affordable EV",segmentAverage:35500}),parameters:{docs:{description:{story:"Electric vehicle with lower fuel costs and different cost structure."}}}},a={render:()=>p.jsx(l,{vehicleName:"2025 BMW 3 Series",msrp:46300,fuelType:"Gas",trims:[{name:"330i",msrp:46300},{name:"330i xDrive",msrp:48300},{name:"M340i",msrp:58200}],competitors:[{name:"Mercedes C-Class",totalCost:58500,msrp:47550},{name:"Audi A4",totalCost:55200,msrp:45290},{name:"Lexus IS",totalCost:52800,msrp:40985}],segmentName:"Compact Luxury Sedan",segmentAverage:55e3}),parameters:{docs:{description:{story:"Luxury vehicle showing higher insurance and maintenance costs with competitor context."}}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    vehicleName: '2025 Chevrolet Trax',
    msrp: 21895,
    fuelType: 'Gas'
  },
  parameters: {
    docs: {
      description: {
        story: 'Basic cost breakdown for an affordable gas-powered SUV.'
      }
    }
  }
}`,...t.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    vehicleName: '2025 Chevrolet Trax',
    msrp: 21895,
    fuelType: 'Gas',
    trims: [{
      name: 'LS',
      msrp: 21895
    }, {
      name: '1RS',
      msrp: 23195
    }, {
      name: 'LT',
      msrp: 23395
    }, {
      name: 'RS',
      msrp: 24995
    }, {
      name: 'ACTIV',
      msrp: 24995
    }]
  },
  parameters: {
    docs: {
      description: {
        story: 'Cost breakdown with trim selector allowing users to compare ownership costs across trims.'
      }
    }
  }
}`,...n.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    vehicleName: '2025 Chevrolet Bolt EV',
    msrp: 27495,
    fuelType: 'Electric',
    trims: [{
      name: '1LT',
      msrp: 27495
    }, {
      name: '2LT',
      msrp: 31495
    }]
  },
  parameters: {
    docs: {
      description: {
        story: 'Electric vehicle with different cost structure - lower fuel costs, different maintenance patterns.'
      }
    }
  }
}`,...o.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    vehicleName: '2025 Chevrolet Trailblazer',
    msrp: 24995,
    fuelType: 'Gas'
  },
  parameters: {
    docs: {
      description: {
        story: 'Compact SUV cost breakdown showing mid-range ownership costs.'
      }
    }
  }
}`,...i.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    vehicleName: '2025 Chevrolet Camaro',
    msrp: 29100,
    fuelType: 'Gas',
    trims: [{
      name: '1LS',
      msrp: 29100
    }, {
      name: '1LT',
      msrp: 30700
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
        story: 'Performance vehicle with higher insurance and maintenance costs.'
      }
    }
  }
}`,...c.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    vehicleName: '2025 Chevrolet Corvette',
    msrp: 65000,
    fuelType: 'Gas'
  },
  parameters: {
    docs: {
      description: {
        story: 'High-end sports car demonstrating premium ownership costs.'
      }
    }
  }
}`,...m.parameters?.docs?.source}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  render: () => <CostToOwnEnhanced vehicleName="2025 Chevrolet Trax" msrp={21895} fuelType="Gas" trims={[{
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
  }]} competitors={[{
    name: 'Honda HR-V',
    totalCost: 32450,
    msrp: 24895
  }, {
    name: 'Toyota Corolla Cross',
    totalCost: 31200,
    msrp: 23610
  }, {
    name: 'Hyundai Kona',
    totalCost: 29800,
    msrp: 24250
  }]} segmentName="Subcompact SUV" segmentAverage={31500} />,
  parameters: {
    docs: {
      description: {
        story: \`
## Key Improvements Over Original

### 1. Monthly Cost Display
Instead of showing only the 5-year total ($30,318), we now prominently display:
- **$505/month** average monthly cost
- Helps users connect to their actual budget

### 2. Competitor Comparison Chart
Visual bar chart showing:
- Ranked list of competitors by total cost
- Current vehicle highlighted
- "🏆 Lowest cost to own" badge if applicable

### 3. Detailed Cost Table with Context
Each cost category now shows:
- Monthly amount
- 5-year total
- **vs Average** indicator (↓5% better, ↑12% worse)

### 4. Depreciation Visualization
Clear visual showing:
- Today's value: $21,895
- After 5 years: $13,794
- Loss amount: -$8,101
- Retention percentage

### 5. Interactive Customization
Users can adjust:
- Annual miles driven (5,000 - 25,000)
- Gas price assumption ($2.50 - $5.50)
- Estimates update in real-time

### 6. Actionable Savings Tips
- 💡 Get 0% APR financing → Save $3,284
- 💡 Buy certified pre-owned → Save ~$3,240
- 💡 Compare insurance quotes → Save 15-25%

### 7. Clear CTAs
- **Get Pre-Approved** — Primary action
- **Compare Insurance Quotes** — Secondary action
        \`
      }
    }
  }
}`,...e.parameters?.docs?.source},description:{story:`## Enhanced Cost to Own

This enhanced version includes several improvements for car buyers:

### New Features

| Feature | Benefit |
|---------|---------|
| **Monthly Breakdown** | Shows ~$505/mo instead of abstract 5-year total |
| **Competitor Comparison** | Visual bar chart ranking vs 3 competitors |
| **Segment Comparison** | "8% below Subcompact SUV avg" context |
| **Cost vs Average** | Each category shows ✓ -5% or ⚠ +12% |
| **Depreciation Forecast** | Visual showing value today → after 5 years |
| **Customize Estimates** | Sliders for annual miles & gas price |
| **Savings Tips** | Actionable advice (0% APR, CPO, insurance) |
| **CTAs** | "Get Pre-Approved" and "Compare Insurance" |

### Business Value

- **Higher engagement** — Interactive customization keeps users on page
- **Trust building** — Transparent competitor comparison
- **Lead generation** — Clear CTAs for financing and insurance
- **SEO value** — Comprehensive content for "cost to own" searches`,...e.parameters?.docs?.description}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  render: () => <CostToOwnEnhanced vehicleName="2025 Hyundai Kona" msrp={24250} fuelType="Gas" trims={[{
    name: 'SE',
    msrp: 24250
  }, {
    name: 'SEL',
    msrp: 26350
  }, {
    name: 'Limited',
    msrp: 30700
  }]} competitors={[{
    name: 'Honda HR-V',
    totalCost: 32450,
    msrp: 24895
  }, {
    name: 'Toyota Corolla Cross',
    totalCost: 31200,
    msrp: 23610
  }, {
    name: 'Chevrolet Trax',
    totalCost: 30318,
    msrp: 21895
  }]} segmentName="Subcompact SUV" segmentAverage={31500} />,
  parameters: {
    docs: {
      description: {
        story: 'Shows the "🏆 Lowest cost to own" badge when the vehicle ranks #1 in comparison.'
      }
    }
  }
}`,...r.parameters?.docs?.source},description:{story:"Enhanced version with the vehicle winning the comparison",...r.parameters?.docs?.description}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: () => <CostToOwnEnhanced vehicleName="2025 Chevrolet Bolt EV" msrp={27495} fuelType="Electric" trims={[{
    name: '1LT',
    msrp: 27495
  }, {
    name: '2LT',
    msrp: 31495
  }]} competitors={[{
    name: 'Nissan Leaf',
    totalCost: 34500,
    msrp: 28140
  }, {
    name: 'Hyundai Kona Electric',
    totalCost: 36200,
    msrp: 33550
  }, {
    name: 'Kia Niro EV',
    totalCost: 35800,
    msrp: 39990
  }]} segmentName="Affordable EV" segmentAverage={35500} />,
  parameters: {
    docs: {
      description: {
        story: 'Electric vehicle with lower fuel costs and different cost structure.'
      }
    }
  }
}`,...s.parameters?.docs?.source},description:{story:"Enhanced version for an electric vehicle",...s.parameters?.docs?.description}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: () => <CostToOwnEnhanced vehicleName="2025 BMW 3 Series" msrp={46300} fuelType="Gas" trims={[{
    name: '330i',
    msrp: 46300
  }, {
    name: '330i xDrive',
    msrp: 48300
  }, {
    name: 'M340i',
    msrp: 58200
  }]} competitors={[{
    name: 'Mercedes C-Class',
    totalCost: 58500,
    msrp: 47550
  }, {
    name: 'Audi A4',
    totalCost: 55200,
    msrp: 45290
  }, {
    name: 'Lexus IS',
    totalCost: 52800,
    msrp: 40985
  }]} segmentName="Compact Luxury Sedan" segmentAverage={55000} />,
  parameters: {
    docs: {
      description: {
        story: 'Luxury vehicle showing higher insurance and maintenance costs with competitor context.'
      }
    }
  }
}`,...a.parameters?.docs?.source},description:{story:"Enhanced version for a luxury vehicle",...a.parameters?.docs?.description}}};const L=["Default","WithTrims","Electric","Hybrid","Luxury","Exotic","Enhanced","EnhancedWinner","EnhancedElectric","EnhancedLuxury"];export{t as Default,o as Electric,e as Enhanced,s as EnhancedElectric,a as EnhancedLuxury,r as EnhancedWinner,m as Exotic,i as Hybrid,c as Luxury,n as WithTrims,L as __namedExportsOrder,b as default};
