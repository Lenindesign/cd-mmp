import{C as i}from"./Comparison-GPyz8pEp.js";import"./iframe-DFxtnQRF.js";import"./preload-helper-PPVm8Dsz.js";import"./vehicleService-CgRIVwGT.js";import"./index-Bk6M7T92.js";import"./VehicleCard-DukMqVPL.js";import"./OptimizedImage-OXLOfd8b.js";import"./Button-C4IhpKUL.js";import"./SignInToSaveModal-Bfg06kFb.js";import"./index-DABF01nS.js";import"./index-CgZ_wkuH.js";import"./x-kUs7-aVO.js";import"./createLucideIcon-Bv7jqSiY.js";import"./bookmark-CYyCOyB8.js";import"./file-text-CEcf9-Ij.js";import"./map-pin-CpmJ6AsB.js";import"./chevron-up-wCgm-i12.js";import"./chevron-right-DOPW_qm1.js";import"./chevron-down-CuaR0HI7.js";import"./chevron-left-ym0VGBcx.js";const w={title:"Organisms/Comparison",component:i,parameters:{layout:"padded",docs:{description:{component:`
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
}`,...t.parameters?.docs?.source}}};const U=["Default","SUV","Truck","CustomTitle"];export{t as CustomTitle,e as Default,r as SUV,o as Truck,U as __namedExportsOrder,w as default};
