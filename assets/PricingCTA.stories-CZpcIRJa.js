import{j as e}from"./iframe-DSvoZ5_G.js";import{M as m}from"./map-pin-vhYGp38O.js";import{T as p}from"./trending-down-i-L66CPR.js";import{C as g}from"./car-BWO5wuYI.js";import{S as h}from"./shield-C_uue1RH.js";import{A as u}from"./arrow-right-BKZoOuRS.js";import"./preload-helper-PPVm8Dsz.js";import"./createLucideIcon-Crwf_ruZ.js";const v=a=>({lowPrice:Math.round(a*.75),highPrice:Math.round(a*1.05),avgPrice:Math.round(a*.88),totalInventory:247,goodGreatPrice:89,oneOwner:156,noAccidents:198,lowMileage:12500,highMileage:85e3,avgMileage:42e3}),c=({vehicleName:a,msrp:l,location:d="Miami, FL"})=>{const r=v(l);return e.jsx("section",{className:"pricing-cta pricing-cta--v1b",children:e.jsxs("div",{className:"container",children:[e.jsxs("div",{className:"pricing-cta__header",children:[e.jsxs("h2",{className:"pricing-cta__title",children:["Shop ",a," Near You"]}),e.jsxs("p",{className:"pricing-cta__subtitle",children:[e.jsx(m,{size:16}),r.totalInventory," vehicles available near ",d]})]}),e.jsxs("div",{className:"pricing-cta__content pricing-cta__content--v1b",children:[e.jsxs("div",{className:"pricing-cta__price-insights",children:[e.jsx("h3",{className:"pricing-cta__section-title",children:"Local Price Insights"}),e.jsxs("div",{className:"pricing-cta__price-range",children:[e.jsxs("div",{className:"pricing-cta__price-bar",children:[e.jsx("div",{className:"pricing-cta__price-fill",style:{width:"70%"}}),e.jsx("div",{className:"pricing-cta__price-marker",style:{left:"45%"},children:e.jsx("span",{className:"pricing-cta__price-marker-label",children:"AVG"})})]}),e.jsxs("div",{className:"pricing-cta__price-labels",children:[e.jsxs("span",{className:"pricing-cta__price-low",children:["$",r.lowPrice.toLocaleString()]}),e.jsxs("span",{className:"pricing-cta__price-avg",children:["$",r.avgPrice.toLocaleString()]}),e.jsxs("span",{className:"pricing-cta__price-high",children:["$",r.highPrice.toLocaleString()]})]})]})]}),e.jsxs("div",{className:"pricing-cta__inventory-badges",children:[e.jsxs("div",{className:"pricing-cta__badge pricing-cta__badge--good",children:[e.jsx(p,{size:18}),e.jsx("span",{className:"pricing-cta__badge-count",children:r.goodGreatPrice}),e.jsx("span",{className:"pricing-cta__badge-label",children:"Good/Great Price"})]}),e.jsxs("div",{className:"pricing-cta__badge pricing-cta__badge--owner",children:[e.jsx(g,{size:18}),e.jsx("span",{className:"pricing-cta__badge-count",children:r.oneOwner}),e.jsx("span",{className:"pricing-cta__badge-label",children:"One Owner"})]}),e.jsxs("div",{className:"pricing-cta__badge pricing-cta__badge--clean",children:[e.jsx(h,{size:18}),e.jsx("span",{className:"pricing-cta__badge-count",children:r.noAccidents}),e.jsx("span",{className:"pricing-cta__badge-label",children:"No Accidents"})]})]}),e.jsxs("div",{className:"pricing-cta__actions",children:[e.jsxs("button",{className:"pricing-cta__btn pricing-cta__btn--primary",children:["SHOP ",r.totalInventory," LISTINGS",e.jsx(u,{size:18})]}),e.jsx("button",{className:"pricing-cta__btn pricing-cta__btn--secondary",children:"ESTIMATE TRADE-IN VALUE"})]})]})]})})};c.__docgenInfo={description:"",methods:[],displayName:"PricingCTAV1B",props:{vehicleName:{required:!0,tsType:{name:"string"},description:""},make:{required:!0,tsType:{name:"string"},description:""},model:{required:!0,tsType:{name:"string"},description:""},msrp:{required:!0,tsType:{name:"number"},description:""},location:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'Miami, FL'",computed:!1}}}};const j={title:"Organisms/PricingCTA",component:c,parameters:{layout:"padded",docs:{description:{component:`
# Pricing CTA Section

## Overview

The primary lead generation component on the VDP. Captures user information and connects them with local dealers.

---

## Business Purpose

| Goal | How It Achieves It |
|------|-------------------|
| Lead Generation | Form captures contact info |
| Dealer Revenue | Leads sent to local dealers |
| Local Relevance | Location-based pricing/inventory |
| Conversion Focus | Clear, prominent CTAs |

---

## Key Metrics

| Metric | Target | Description |
|--------|--------|-------------|
| Form Start Rate | 8-12% | Users who begin form |
| Form Completion | 40-60% | Started to submitted |
| Lead Quality Score | 7+ | Dealer feedback rating |
| Cost Per Lead | <$25 | Acquisition efficiency |

---

## Lead Capture Fields

| Field | Required | Purpose |
|-------|----------|---------|
| Email | Yes | Primary contact |
| Phone | Optional | Higher intent signal |
| ZIP Code | Yes | Dealer matching |
| Timeline | Optional | Purchase urgency |

---

## Dealer Connection

| Step | Description |
|------|-------------|
| 1. User submits | Form data captured |
| 2. ZIP matching | Find nearby dealers |
| 3. Lead routing | Send to top 3 dealers |
| 4. Dealer response | Within 24 hours |

---

## Product Considerations

**Revenue Attribution**
- Track lead to sale conversion
- Dealer feedback loop
- Cost per acquisition

**Form Optimization**
- Minimize fields (higher completion)
- Progressive disclosure
- Mobile-first design

**A/B Testing Priorities**
- CTA button text
- Form field order
- Value proposition messaging
- Social proof elements

**Compliance**
- TCPA for phone leads
- CAN-SPAM for emails
- State-specific requirements

**Location Strategy**
- Auto-detect vs manual entry
- Fallback for unknown locations
- Regional inventory messaging
        `}}},tags:["autodocs"],argTypes:{vehicleName:{description:"Full vehicle name (Year Make Model)",control:"text",table:{type:{summary:"string"},category:"Vehicle"}},make:{description:"Vehicle manufacturer",control:"text",table:{type:{summary:"string"},category:"Vehicle"}},model:{description:"Vehicle model name",control:"text",table:{type:{summary:"string"},category:"Vehicle"}},msrp:{description:"Base MSRP for pricing display",control:{type:"number",min:15e3,max:2e5,step:1e3},table:{type:{summary:"number"},category:"Pricing"}},location:{description:"User location for local dealer/pricing info",control:"text",table:{type:{summary:"string"},category:"Location"}}}},i={args:{vehicleName:"2025 Chevrolet Trax",make:"Chevrolet",model:"Trax",msrp:21895},parameters:{docs:{description:{story:"Default pricing CTA without location - prompts user to enter location."}}}},n={args:{vehicleName:"2025 Chevrolet Trailblazer",make:"Chevrolet",model:"Trailblazer",msrp:24995,location:"Los Angeles, CA"},parameters:{docs:{description:{story:"CTA with location pre-filled, showing local pricing and dealers."}}}},t={args:{vehicleName:"2025 Chevrolet Camaro",make:"Chevrolet",model:"Camaro",msrp:29100,location:"New York, NY"},parameters:{docs:{description:{story:"Performance vehicle CTA in a major metro market."}}}},s={args:{vehicleName:"2025 Chevrolet Silverado",make:"Chevrolet",model:"Silverado",msrp:36e3,location:"Dallas, TX"},parameters:{docs:{description:{story:"Truck CTA in a truck-heavy market (Texas)."}}}},o={args:{vehicleName:"2025 Chevrolet Trax LS",make:"Chevrolet",model:"Trax",msrp:21895,location:"Miami, FL"},parameters:{docs:{description:{story:"Budget-focused CTA highlighting value and affordability."}}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    vehicleName: '2025 Chevrolet Trax',
    make: 'Chevrolet',
    model: 'Trax',
    msrp: 21895
  },
  parameters: {
    docs: {
      description: {
        story: 'Default pricing CTA without location - prompts user to enter location.'
      }
    }
  }
}`,...i.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    vehicleName: '2025 Chevrolet Trailblazer',
    make: 'Chevrolet',
    model: 'Trailblazer',
    msrp: 24995,
    location: 'Los Angeles, CA'
  },
  parameters: {
    docs: {
      description: {
        story: 'CTA with location pre-filled, showing local pricing and dealers.'
      }
    }
  }
}`,...n.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    vehicleName: '2025 Chevrolet Camaro',
    make: 'Chevrolet',
    model: 'Camaro',
    msrp: 29100,
    location: 'New York, NY'
  },
  parameters: {
    docs: {
      description: {
        story: 'Performance vehicle CTA in a major metro market.'
      }
    }
  }
}`,...t.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    vehicleName: '2025 Chevrolet Silverado',
    make: 'Chevrolet',
    model: 'Silverado',
    msrp: 36000,
    location: 'Dallas, TX'
  },
  parameters: {
    docs: {
      description: {
        story: 'Truck CTA in a truck-heavy market (Texas).'
      }
    }
  }
}`,...s.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    vehicleName: '2025 Chevrolet Trax LS',
    make: 'Chevrolet',
    model: 'Trax',
    msrp: 21895,
    location: 'Miami, FL'
  },
  parameters: {
    docs: {
      description: {
        story: 'Budget-focused CTA highlighting value and affordability.'
      }
    }
  }
}`,...o.parameters?.docs?.source}}};const A=["Default","SUV","Luxury","Truck","Budget"];export{o as Budget,i as Default,t as Luxury,n as SUV,s as Truck,A as __namedExportsOrder,j as default};
