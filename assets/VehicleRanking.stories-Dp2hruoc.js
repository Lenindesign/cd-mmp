import{V as i}from"./VehicleRanking-BefbefY4.js";import"./iframe-BEa3bQge.js";import"./preload-helper-PPVm8Dsz.js";import"./vehicleService-D5hsGKmE.js";import"./index-Dto8T7jp.js";import"./chevron-right-CRZrcxDd.js";import"./createLucideIcon-CXm1ccRw.js";const g={title:"Organisms/VehicleRanking",component:i,parameters:{layout:"padded",docs:{description:{component:`
# Vehicle Ranking Section

## Overview

Shows where the current vehicle ranks among competitors in its segment. This component helps users understand how the vehicle compares to alternatives.

---

## Business Purpose

| Goal | How It Achieves It |
|------|-------------------|
| Competitive Context | Shows where vehicle stands vs competitors |
| Cross-Selling | Exposes users to alternative vehicles |
| Trust Building | Transparent ranking builds credibility |
| Engagement | Encourages exploration of other vehicles |

---

## Key Metrics

- **Click-through Rate** — Users clicking competitor cards
- **Scroll Depth** — How many rankings users view
- **Return Visits** — Users coming back to compare
- **Time in Section** — Engagement with rankings

---

## How Rankings Work

| Filter | Effect |
|--------|--------|
| Body Style | SUV, Sedan, Truck, etc. |
| Max Price | Creates segment labels (Subcompact < $35k, Compact < $50k, etc.) |
| Current Vehicle | Highlights the vehicle user is viewing |

---

## Category Labels (Auto-Generated)

- Under $35,000 → "Best Subcompact SUVs"
- $35,000-$50,000 → "Best Compact SUVs"
- $50,000-$80,000 → "Best Midsize SUVs"
- Over $100,000 → "Best Luxury SUVs"

---

## Responsive Grid

| Screen Size | Columns |
|-------------|---------|
| Mobile (<600px) | 2 columns |
| Tablet | 3 columns |
| Desktop | 4 columns |

---

## Card Name Display Rules

**Important:** Vehicle names must always display on a single line without ellipsis.

| Condition | Display |
|-----------|---------|
| Make + Model fits in one row | "Chevrolet Trax" |
| Make + Model doesn't fit | "Trax" (model only) |

**Consistent Stacking Logic:**
- If **any** card in the grid needs to stack (name + score vertically) due to a long model name, **all** cards adopt the stacked layout for visual consistency
- The component first attempts to fit Make + Model on one line
- On mobile (≤600px), font size scales down to 14px, and at 320px it further reduces to 12px
- The vertical divider between name and score is hidden when stacked

**Implementation:**
- The \`useGridLayout\` hook measures text width vs available container space for all cards
- Returns three states: \`globalStack\`, \`useShortNames\`, and \`useSmallFont\`
- Automatically switches between full name and model-only based on available width
- Recalculates on window resize
- No ellipsis or text truncation - clean display only

**Responsive Font Scaling:**
| Screen Width | Normal Font | Small Font (extreme cases) |
|--------------|-------------|---------------------------|
| > 600px | 20px | 16px |
| ≤ 600px | 14px | 11px |
| ≤ 320px | 12px | 10px |

**Extreme Cases:** For very long names like "Land Rover Range Rover", the component detects when the name doesn't fit even in stacked mode and applies a smaller font size via the \`vehicle-ranking__card-header--small-font\` CSS class.

---

## Product Considerations

**Score Display Options**
- \`showScore: false\` — Clean card without score
- \`showScore: true, scoreStyle: 'bold'\` — Prominent score
- \`showScore: true, scoreStyle: 'subtle'\` — Understated score

**Data Dependencies**
- Vehicle database with ratings
- Body style classification
- Price data for segmentation

**A/B Testing Ideas**
- Score visibility impact on CTR
- Number of competitors shown
- Card layout variations
        `}},design:{type:"figma",url:"https://www.figma.com/design/jvhWYHzYt25IBonCIzVEv0/Post-MVP-Marketplace?node-id=14-24575"}},tags:["autodocs"],argTypes:{bodyStyle:{description:"Vehicle body style to filter rankings",control:"select",options:["SUV","Sedan","Truck","Coupe","Hatchback","Convertible","Wagon"],table:{type:{summary:"string"},defaultValue:{summary:"SUV"},category:"Filtering"}},maxPrice:{description:"Maximum price filter for category (affects label: Subcompact < $35k, Compact < $50k, etc.)",control:{type:"number",min:2e4,max:2e5,step:5e3},table:{type:{summary:"number"},defaultValue:{summary:"35000"},category:"Filtering"}},currentRank:{description:"Highlight a specific rank position",control:{type:"number",min:1,max:10},table:{type:{summary:"number"},category:"Display"}},showScore:{description:"Display rating scores on vehicle cards",control:"boolean",table:{type:{summary:"boolean"},defaultValue:{summary:"false"},category:"Display"}},scoreStyle:{description:"Visual style for the score display",control:"radio",options:["bold","subtle"],table:{type:{summary:"'bold' | 'subtle'"},defaultValue:{summary:"bold"},category:"Display"},if:{arg:"showScore",truthy:!0}},category:{description:"Override the auto-generated category label",control:"text",table:{type:{summary:"string"},category:"Content"}},currentVehicleId:{description:"ID of current vehicle to highlight in the list",control:"text",table:{type:{summary:"string"},category:"Filtering"}}}},e={args:{bodyStyle:"SUV",maxPrice:35e3},parameters:{docs:{description:{story:"Default ranking view for subcompact SUVs under $35,000."}}}},r={args:{bodyStyle:"SUV",maxPrice:5e4,currentRank:3},parameters:{docs:{description:{story:"Compact SUV rankings with rank #3 highlighted."}}}},t={args:{bodyStyle:"Sedan",maxPrice:4e4,currentRank:1},parameters:{docs:{description:{story:"Sedan rankings showing the top-ranked vehicle highlighted."}}}},s={args:{bodyStyle:"Truck",maxPrice:6e4},parameters:{docs:{description:{story:"Truck rankings for midsize price range."}}}},o={args:{bodyStyle:"SUV",maxPrice:1e5},parameters:{docs:{description:{story:"Luxury SUV rankings for vehicles over $80,000."}}}},a={args:{bodyStyle:"SUV",maxPrice:35e3,showScore:!0,scoreStyle:"bold"},parameters:{docs:{description:{story:'Rankings with bold score display (e.g., "10/10") shown prominently on each card.'}}}},n={args:{bodyStyle:"SUV",maxPrice:35e3,showScore:!0,scoreStyle:"subtle"},parameters:{docs:{description:{story:'Rankings with subtle score styling - blue number with gray "/10" for a more understated look.'}}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    bodyStyle: 'SUV',
    maxPrice: 35000
  },
  parameters: {
    docs: {
      description: {
        story: 'Default ranking view for subcompact SUVs under $35,000.'
      }
    }
  }
}`,...e.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    bodyStyle: 'SUV',
    maxPrice: 50000,
    currentRank: 3
  },
  parameters: {
    docs: {
      description: {
        story: 'Compact SUV rankings with rank #3 highlighted.'
      }
    }
  }
}`,...r.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    bodyStyle: 'Sedan',
    maxPrice: 40000,
    currentRank: 1
  },
  parameters: {
    docs: {
      description: {
        story: 'Sedan rankings showing the top-ranked vehicle highlighted.'
      }
    }
  }
}`,...t.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    bodyStyle: 'Truck',
    maxPrice: 60000
  },
  parameters: {
    docs: {
      description: {
        story: 'Truck rankings for midsize price range.'
      }
    }
  }
}`,...s.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    bodyStyle: 'SUV',
    maxPrice: 100000
  },
  parameters: {
    docs: {
      description: {
        story: 'Luxury SUV rankings for vehicles over $80,000.'
      }
    }
  }
}`,...o.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    bodyStyle: 'SUV',
    maxPrice: 35000,
    showScore: true,
    scoreStyle: 'bold'
  },
  parameters: {
    docs: {
      description: {
        story: 'Rankings with bold score display (e.g., "10/10") shown prominently on each card.'
      }
    }
  }
}`,...a.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    bodyStyle: 'SUV',
    maxPrice: 35000,
    showScore: true,
    scoreStyle: 'subtle'
  },
  parameters: {
    docs: {
      description: {
        story: 'Rankings with subtle score styling - blue number with gray "/10" for a more understated look.'
      }
    }
  }
}`,...n.parameters?.docs?.source}}};const h=["Default","SUV","Sedan","Truck","LuxurySUV","WithScore","WithSubtleScore"];export{e as Default,o as LuxurySUV,r as SUV,t as Sedan,s as Truck,a as WithScore,n as WithSubtleScore,h as __namedExportsOrder,g as default};
