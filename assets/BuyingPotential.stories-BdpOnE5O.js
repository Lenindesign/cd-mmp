import{B as o}from"./BuyingPotential-BqYroqdU.js";import"./iframe-P1HNGATh.js";import"./preload-helper-PPVm8Dsz.js";import"./vehicleService-DW3q9yFh.js";import"./index-D17UvTI1.js";import"./listingsService-C0NNiMNW.js";import"./leaseDealsService-BtnXJIPm.js";import"./incentiveAdapter-DFSCw2he.js";import"./stateVehicleTaxes-CUyZfETO.js";import"./createLucideIcon-BcQO0ci9.js";import"./IncentivesModal-546Mm926.js";import"./index-CdKimGw5.js";import"./index-DJ1rZ8zg.js";import"./trimService-CMFZTiuq.js";import"./dateUtils-Blw69jOb.js";import"./x-DMv6tZuD.js";import"./info-CMktK1N6.js";import"./trending-down-CYxT2TfF.js";import"./circle-check-big-Db1RPv7U.js";import"./gem-CAGxhXkH.js";import"./clock-ZzfC3Mpj.js";import"./lightbulb-JebYOd7p.js";import"./badge-check-DNhKU7pv.js";import"./shield-check-BZ7WnVq9.js";import"./check-CF4aCM9e.js";import"./phone-lO8H2p2B.js";import"./map-pin-BpAwFGu-.js";import"./navigation-BX90jxFg.js";import"./TradeInEstimateModal-oOs25KCZ.js";import"./chevron-down-BQLzs_qv.js";import"./thumbs-up-ConDX4V6.js";import"./sparkles-B_LnKRTR.js";import"./arrow-right-DWcd8IWW.js";const H={title:"Organisms/BuyingPotential",component:o,parameters:{layout:"padded",docs:{description:{component:`
# Buying Potential Score

## Overview

A personalized match score showing how well a vehicle fits the user's stated preferences. Requires user profile/onboarding data.

---

## Business Purpose

| Goal | How It Achieves It |
|------|-------------------|
| Personalization | Tailored recommendations |
| User Engagement | Encourages profile completion |
| Decision Confidence | "This is right for you" validation |
| Conversion Lift | Higher intent from matched users |

---

## Score Ranges

| Score | Label | Meaning |
|-------|-------|---------|
| 90-100% | Excellent Match | Highly recommended |
| 75-89% | Good Match | Worth considering |
| 60-74% | Fair Match | Some compromises |
| <60% | Low Match | May not fit needs |
        `}}},tags:["autodocs"],argTypes:{vehicleName:{description:"Full vehicle name (Year Make Model)",control:"text",table:{type:{summary:"string"},category:"Vehicle"}},bodyStyle:{description:"Vehicle body style for category matching",control:"select",options:["SUV","Sedan","Truck","Coupe","Hatchback","Convertible","Wagon"],table:{type:{summary:"string"},category:"Vehicle"}},vehicleImage:{description:"URL to vehicle image",control:"text",table:{type:{summary:"string"},category:"Media"}}}},e={args:{vehicleName:"2025 Chevrolet Trax",bodyStyle:"SUV",vehicleImage:"https://hips.hearstapps.com/mtg-prod/66466c119cbba1000852d79c/007-2025-chevrolet-trax-exterior-front-view.jpg"},parameters:{docs:{description:{story:"Default buying potential score for a subcompact SUV."}}}},r={args:{vehicleName:"2025 Chevrolet Trailblazer",bodyStyle:"SUV",vehicleImage:"https://hips.hearstapps.com/mtg-prod/65f7e4f9417c9000085e7bba/003-2024-chevrolet-trailblazer-front-three-quarters-view.jpg"},parameters:{docs:{description:{story:"Compact SUV showing different match factors."}}}},t={args:{vehicleName:"2025 Chevrolet Silverado",bodyStyle:"Truck",vehicleImage:"https://hips.hearstapps.com/mtg-prod/659f9ed490e84500088bd486/012-2024-lamborghini-revuelto.jpg"},parameters:{docs:{description:{story:"Truck category with different lifestyle matching criteria."}}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    vehicleName: '2025 Chevrolet Trax',
    bodyStyle: 'SUV',
    vehicleImage: 'https://hips.hearstapps.com/mtg-prod/66466c119cbba1000852d79c/007-2025-chevrolet-trax-exterior-front-view.jpg'
  },
  parameters: {
    docs: {
      description: {
        story: 'Default buying potential score for a subcompact SUV.'
      }
    }
  }
}`,...e.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    vehicleName: '2025 Chevrolet Trailblazer',
    bodyStyle: 'SUV',
    vehicleImage: 'https://hips.hearstapps.com/mtg-prod/65f7e4f9417c9000085e7bba/003-2024-chevrolet-trailblazer-front-three-quarters-view.jpg'
  },
  parameters: {
    docs: {
      description: {
        story: 'Compact SUV showing different match factors.'
      }
    }
  }
}`,...r.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    vehicleName: '2025 Chevrolet Silverado',
    bodyStyle: 'Truck',
    vehicleImage: 'https://hips.hearstapps.com/mtg-prod/659f9ed490e84500088bd486/012-2024-lamborghini-revuelto.jpg'
  },
  parameters: {
    docs: {
      description: {
        story: 'Truck category with different lifestyle matching criteria.'
      }
    }
  }
}`,...t.parameters?.docs?.source}}};const L=["Default","SUV","Truck"];export{e as Default,r as SUV,t as Truck,L as __namedExportsOrder,H as default};
