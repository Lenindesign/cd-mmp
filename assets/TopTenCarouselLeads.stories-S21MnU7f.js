import{j as a}from"./iframe-BEa3bQge.js";import{T as c}from"./TopTenCarouselLeads-WLRilsqB.js";import"./preload-helper-PPVm8Dsz.js";import"./vehicleService-D5hsGKmE.js";import"./index-Dto8T7jp.js";import"./lifestyleService-BjdHkeP1.js";import"./useSupabaseRating-DFsOPD4K.js";import"./VehicleCard-C4d2TllD.js";import"./OptimizedImage-D63NJD_-.js";import"./Button-HXD-a78y.js";import"./bookmark-BNHEBnDK.js";import"./createLucideIcon-CXm1ccRw.js";import"./map-pin-OZpyEk8m.js";import"./chevron-up-BIlFXdO8.js";import"./chevron-right-CRZrcxDd.js";import"./chevron-down-mA-50KCm.js";import"./chevron-left-Bz-YJbyB.js";const{fn:l}=__STORYBOOK_MODULE_TEST__,U={title:"Organisms/TopTenCarouselLeads",component:c,parameters:{layout:"fullscreen",docs:{description:{component:`
# Top 10 Carousel with Lead Generation

## Overview

A high-impact carousel showcasing top-ranked vehicles with integrated lead generation. This is a key conversion component that drives dealer leads.

---

## Business Purpose

| Goal | How It Achieves It |
|------|-------------------|
| Lead Generation | Shop Used CTAs drive dealer connections |
| Discovery | Exposes users to top-rated alternatives |
| Authority | "Top 10" framing establishes expertise |
| Engagement | Carousel interaction increases time on site |

---

## Key Metrics

- **Lead Conversion Rate** — Shop Used clicks to dealer form submissions
- **Carousel Engagement** — Slides scrolled, arrows clicked
- **Card CTR** — Which rank positions get most clicks
- **Filter Usage** — Which filters users apply most

---

## Filtering Options

| Filter | Use Case |
|--------|----------|
| bodyStyle | "Top 10 SUVs", "Top 10 Sedans" |
| make | "Top Toyota Vehicles" |
| lifestyle | "Best Family Vehicles" |
| maxPrice | "Top Vehicles Under $35,000" |

---

## Badge System

| Badge | Meaning | Visual |
|-------|---------|--------|
| Rank #1 | Top-rated vehicle | Gold badge |
| Editor's Choice | Editorial pick | EC icon |
| 10Best | Annual award winner | 10Best icon |

---

## Responsive Behavior

| Screen | Cards Visible | Navigation |
|--------|---------------|------------|
| Desktop | 4-5 cards | Arrow buttons |
| Tablet | 2-3 cards | Touch scroll + arrows |
| Mobile | 1-2 cards | Touch scroll |

---

## Product Considerations

**Personalization Opportunities**
- Filter by user's saved preferences
- Show vehicles in user's budget range
- Lifestyle-based recommendations

**A/B Testing Ideas**
- CTA text variations ("Shop Used" vs "See Deals")
- Number of cards shown
- Auto-scroll vs manual

**Data Requirements**
- Vehicle ratings for ranking
- Lifestyle tags in database
- Used inventory availability

**Revenue Impact**
- Direct dealer lead attribution
- Track "Shop Used" to form completion funnel
        `}}},tags:["autodocs"],argTypes:{title:{description:"Main heading for the carousel section",control:"text",table:{type:{summary:"string"},category:"Content"}},subtitle:{description:"Secondary text below the title",control:"text",table:{type:{summary:"string"},category:"Content"}},bodyStyle:{description:"Filter vehicles by body style",control:"select",options:["SUV","Sedan","Truck","Coupe","Hatchback","Convertible","Wagon"],table:{type:{summary:"string"},category:"Filtering"}},make:{description:"Filter vehicles by manufacturer",control:"select",options:["Toyota","Honda","Ford","Chevrolet","BMW","Mercedes-Benz","Audi"],table:{type:{summary:"string"},category:"Filtering"}},lifestyle:{description:"Filter by lifestyle category",control:"select",options:["family","commuter","adventure","luxury","performance"],table:{type:{summary:"string"},category:"Filtering"}},maxPrice:{description:"Maximum price filter",control:{type:"number",min:2e4,max:2e5,step:5e3},table:{type:{summary:"number"},category:"Filtering"}},currentVehicleId:{description:"ID of current vehicle to highlight",control:"text",table:{type:{summary:"string"},category:"Filtering"}},onShopUsed:{description:"Callback when user clicks Shop Used on a vehicle",table:{type:{summary:"(vehicle) => void"},category:"Events"}}},args:{onShopUsed:l()},decorators:[n=>a.jsx("div",{style:{padding:"20px",background:"#f5f5f5"},children:a.jsx(n,{})})]},e={args:{},parameters:{docs:{description:{story:"Default carousel showing all top-ranked vehicles without filtering."}}}},t={args:{bodyStyle:"SUV",title:"Top 10 SUVs",subtitle:"Our experts pick the best SUVs on the market"},parameters:{docs:{description:{story:"Carousel filtered to show only SUVs with custom title and subtitle."}}}},s={args:{make:"Toyota",title:"Top Toyota Vehicles"},parameters:{docs:{description:{story:"Carousel filtered to show only vehicles from a specific manufacturer."}}}},r={args:{maxPrice:35e3,title:"Top Vehicles Under $35,000",subtitle:"Best value picks for budget-conscious buyers"},parameters:{docs:{description:{story:"Carousel filtered by maximum price, ideal for budget-conscious shoppers."}}}},o={args:{currentVehicleId:"vehicle-1",title:"See How This Vehicle Ranks"},parameters:{docs:{description:{story:"Carousel with a specific vehicle highlighted to show its ranking position."}}}},i={args:{lifestyle:"family",title:"Best Family Vehicles",subtitle:"Safe, spacious, and practical choices for families"},parameters:{docs:{description:{story:"Carousel filtered by lifestyle category, matching vehicles to user preferences."}}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'Default carousel showing all top-ranked vehicles without filtering.'
      }
    }
  }
}`,...e.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    bodyStyle: 'SUV',
    title: 'Top 10 SUVs',
    subtitle: 'Our experts pick the best SUVs on the market'
  },
  parameters: {
    docs: {
      description: {
        story: 'Carousel filtered to show only SUVs with custom title and subtitle.'
      }
    }
  }
}`,...t.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    make: 'Toyota',
    title: 'Top Toyota Vehicles'
  },
  parameters: {
    docs: {
      description: {
        story: 'Carousel filtered to show only vehicles from a specific manufacturer.'
      }
    }
  }
}`,...s.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    maxPrice: 35000,
    title: 'Top Vehicles Under $35,000',
    subtitle: 'Best value picks for budget-conscious buyers'
  },
  parameters: {
    docs: {
      description: {
        story: 'Carousel filtered by maximum price, ideal for budget-conscious shoppers.'
      }
    }
  }
}`,...r.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    currentVehicleId: 'vehicle-1',
    title: 'See How This Vehicle Ranks'
  },
  parameters: {
    docs: {
      description: {
        story: 'Carousel with a specific vehicle highlighted to show its ranking position.'
      }
    }
  }
}`,...o.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    lifestyle: 'family',
    title: 'Best Family Vehicles',
    subtitle: 'Safe, spacious, and practical choices for families'
  },
  parameters: {
    docs: {
      description: {
        story: 'Carousel filtered by lifestyle category, matching vehicles to user preferences.'
      }
    }
  }
}`,...i.parameters?.docs?.source}}};const B=["Default","FilteredByBodyStyle","FilteredByMake","FilteredByPrice","WithCurrentVehicle","WithLifestyle"];export{e as Default,t as FilteredByBodyStyle,s as FilteredByMake,r as FilteredByPrice,o as WithCurrentVehicle,i as WithLifestyle,B as __namedExportsOrder,U as default};
