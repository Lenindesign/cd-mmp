import{B as o}from"./BuyingPotential-C2YEc6My.js";import"./iframe-CtYl2HW_.js";import"./preload-helper-PPVm8Dsz.js";import"./vehicleService-DcQymfO7.js";import"./index-C_qiXwZJ.js";import"./listingsService-B_8c8auV.js";import"./leaseDealsService-BPeq6aex.js";import"./incentiveAdapter-C9kEUTiF.js";import"./IncentivesModal-CtfzkBjU.js";import"./index-Cc6qnbk2.js";import"./index-Bq_EqEIj.js";import"./trimService-DLkm3_Mg.js";import"./dateUtils-Blw69jOb.js";import"./x-C3AzriKs.js";import"./createLucideIcon-BUQwo1-0.js";import"./info-D8MO3M8H.js";import"./trending-down-CIk5IYK8.js";import"./circle-check-big-BzdRwpNI.js";import"./gem-D6Oo3Syj.js";import"./clock-BxeXmho-.js";import"./lightbulb-CMNrxeRZ.js";import"./badge-check-8ywnMcId.js";import"./shield-check-BobIgayF.js";import"./check-DcCQ__KD.js";import"./phone-BLdCAk8V.js";import"./map-pin-DP2opGT7.js";import"./navigation-D1mVzWwR.js";import"./zap-EvOOYWrd.js";import"./gauge-B-d3ibBk.js";import"./thumbs-up-CMem-q-9.js";import"./sparkles-BwYDUl18.js";import"./chevron-down-Lsb5CzDT.js";import"./arrow-right-Ci1if0R0.js";const E={title:"Organisms/BuyingPotential",component:o,parameters:{layout:"padded",docs:{description:{component:`
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
        `}}},tags:["autodocs"],argTypes:{vehicleName:{description:"Full vehicle name (Year Make Model)",control:"text",table:{type:{summary:"string"},category:"Vehicle"}},bodyStyle:{description:"Vehicle body style for category matching",control:"select",options:["SUV","Sedan","Truck","Coupe","Hatchback","Convertible","Wagon"],table:{type:{summary:"string"},category:"Vehicle"}},vehicleImage:{description:"URL to vehicle image",control:"text",table:{type:{summary:"string"},category:"Media"}}}},e={args:{vehicleName:"2025 Chevrolet Trax",bodyStyle:"SUV",vehicleImage:"https://d2kde5ohu8qb21.cloudfront.net/files/66466c119cbba1000852d79c/007-2025-chevrolet-trax-exterior-front-view.jpg"},parameters:{docs:{description:{story:"Default buying potential score for a subcompact SUV."}}}},r={args:{vehicleName:"2025 Chevrolet Trailblazer",bodyStyle:"SUV",vehicleImage:"https://d2kde5ohu8qb21.cloudfront.net/files/65f7e4f9417c9000085e7bba/003-2024-chevrolet-trailblazer-front-three-quarters-view.jpg"},parameters:{docs:{description:{story:"Compact SUV showing different match factors."}}}},t={args:{vehicleName:"2025 Chevrolet Silverado",bodyStyle:"Truck",vehicleImage:"https://d2kde5ohu8qb21.cloudfront.net/files/659f9ed490e84500088bd486/012-2024-lamborghini-revuelto.jpg"},parameters:{docs:{description:{story:"Truck category with different lifestyle matching criteria."}}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    vehicleName: '2025 Chevrolet Trax',
    bodyStyle: 'SUV',
    vehicleImage: 'https://d2kde5ohu8qb21.cloudfront.net/files/66466c119cbba1000852d79c/007-2025-chevrolet-trax-exterior-front-view.jpg'
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
    vehicleImage: 'https://d2kde5ohu8qb21.cloudfront.net/files/65f7e4f9417c9000085e7bba/003-2024-chevrolet-trailblazer-front-three-quarters-view.jpg'
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
    vehicleImage: 'https://d2kde5ohu8qb21.cloudfront.net/files/659f9ed490e84500088bd486/012-2024-lamborghini-revuelto.jpg'
  },
  parameters: {
    docs: {
      description: {
        story: 'Truck category with different lifestyle matching criteria.'
      }
    }
  }
}`,...t.parameters?.docs?.source}}};const H=["Default","SUV","Truck"];export{e as Default,r as SUV,t as Truck,H as __namedExportsOrder,E as default};
