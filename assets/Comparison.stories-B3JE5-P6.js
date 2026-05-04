import{C as i}from"./Comparison-DcNkbQB_.js";import"./iframe-CZYuxNJ2.js";import"./preload-helper-PPVm8Dsz.js";import"./vehicleService-CnHzEnwN.js";import"./index-B-JoA3P0.js";import"./leaseDealsService-BTHwOiTU.js";import"./incentiveAdapter-BI7H8AIy.js";import"./VehicleCard-BESaOGtN.js";import"./OptimizedImage-DFWPTJO3.js";import"./Button-ljdb5Q0C.js";import"./SignInToSaveModal-O3CitO7w.js";import"./index-CaVVcCXh.js";import"./index-BzQJIyLj.js";import"./x-DD4oP2p0.js";import"./createLucideIcon-CW3QtWCO.js";import"./bookmark-D27ptR2j.js";import"./file-text-pHil6R79.js";import"./map-pin-Cmtsx5Wm.js";import"./chevron-up-DGAO3e1C.js";import"./chevron-right-DhJu1s0C.js";import"./chevron-down-D0DgpgYM.js";import"./chevron-left-Bms0LAG_.js";const D={title:"Organisms/Comparison",component:i,parameters:{layout:"padded",docs:{description:{component:`
# Vehicle Comparison

## Overview

Side-by-side comparison showing how the current vehicle stacks up against competitors. A key research tool for users in the consideration phase.

---

## Business Purpose

| Goal | How It Achieves It |
|------|-------------------|
| Research Depth | Keeps users on site longer |
| Cross-Selling | Exposes users to alternatives |
| Trust Building | Objective comparison builds credibility |
| Decision Support | Helps users make informed choices |

---

## Key Metrics

- **Competitor Click Rate** - Which alternatives get clicks
- **Comparison Tool Usage** - Full comparison page visits
- **Return Behavior** - Users coming back to compare
- **Conversion Correlation** - Does comparing predict leads?

---

## Matching Algorithm

| Factor | Weight | Description |
|--------|--------|-------------|
| Body Style | High | Same category (SUV vs SUV) |
| Price Range | High | Within ±20% of MSRP |
| Segment | Medium | Subcompact, Compact, etc. |
| Rating | Low | Similar C/D scores |

---

## Comparison Elements

| Element | Purpose |
|---------|---------|
| Vehicle Image | Visual identification |
| Name and Year | Quick reference |
| C/D Rating | Expert score comparison |
| Price Range | Budget alignment |
| Key Specs | Quick differentiation |
| View Details CTA | Drive to competitor VDP |

---

## Product Considerations

**Competitor Selection**
- Algorithm-driven vs curated
- OEM preferences (show/hide certain brands?)
- Regional availability

**User Journey**
- Users in "consideration" phase
- High intent but not decided
- Need objective information

**Revenue Implications**
- Cross-selling opportunity
- May lead users to other vehicles
- Builds overall site engagement

**A/B Testing Ideas**
- Number of competitors shown
- Spec comparison depth
- CTA text variations
        `}}},tags:["autodocs"],argTypes:{currentVehicle:{description:"The vehicle being compared (used to find similar competitors)",control:"object",table:{type:{summary:"Vehicle",detail:"{ make: string; model: string }"},category:"Vehicle"}},title:{description:"Custom section heading",control:"text",table:{type:{summary:"string"},category:"Content"}}}},e={args:{currentVehicle:{make:"Chevrolet",model:"Trax"}},parameters:{docs:{description:{story:"Default comparison view showing competitors for a subcompact SUV."}}}},r={args:{currentVehicle:{make:"Chevrolet",model:"Trailblazer"},title:"Compare SUVs"},parameters:{docs:{description:{story:"Compact SUV comparison with custom title."}}}},o={args:{currentVehicle:{make:"Chevrolet",model:"Silverado"},title:"Compare Trucks"},parameters:{docs:{description:{story:"Truck comparison showing pickup competitors."}}}},t={args:{currentVehicle:{make:"Chevrolet",model:"Trax"},title:"Similar Vehicles to Consider"},parameters:{docs:{description:{story:"Comparison with custom section heading for different contexts."}}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    currentVehicle: {
      make: 'Chevrolet',
      model: 'Trax'
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Default comparison view showing competitors for a subcompact SUV.'
      }
    }
  }
}`,...e.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    currentVehicle: {
      make: 'Chevrolet',
      model: 'Trailblazer'
    },
    title: 'Compare SUVs'
  },
  parameters: {
    docs: {
      description: {
        story: 'Compact SUV comparison with custom title.'
      }
    }
  }
}`,...r.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    currentVehicle: {
      make: 'Chevrolet',
      model: 'Silverado'
    },
    title: 'Compare Trucks'
  },
  parameters: {
    docs: {
      description: {
        story: 'Truck comparison showing pickup competitors.'
      }
    }
  }
}`,...o.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    currentVehicle: {
      make: 'Chevrolet',
      model: 'Trax'
    },
    title: 'Similar Vehicles to Consider'
  },
  parameters: {
    docs: {
      description: {
        story: 'Comparison with custom section heading for different contexts.'
      }
    }
  }
}`,...t.parameters?.docs?.source}}};const x=["Default","SUV","Truck","CustomTitle"];export{t as CustomTitle,e as Default,r as SUV,o as Truck,x as __namedExportsOrder,D as default};
