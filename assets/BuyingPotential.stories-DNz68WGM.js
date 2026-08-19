import{B as o}from"./BuyingPotential-D9ORa8R5.js";import"./iframe-hIK8npkh.js";import"./preload-helper-PPVm8Dsz.js";import"./vehicleService-DW3q9yFh.js";import"./index-D17UvTI1.js";import"./listingsService-C0NNiMNW.js";import"./leaseDealsService-BtnXJIPm.js";import"./incentiveAdapter-DFSCw2he.js";import"./stateVehicleTaxes-8kkgQtDj.js";import"./createLucideIcon-BkN0wFuO.js";import"./IncentivesModal-DLmkcbnD.js";import"./index-D2U26J5R.js";import"./index-CRVGLf-n.js";import"./trimService-CMFZTiuq.js";import"./dateUtils-Blw69jOb.js";import"./x-B994hvfS.js";import"./info-BnTvSLdE.js";import"./trending-down-BN44dmUt.js";import"./circle-check-big-BbB0TO5f.js";import"./gem-BEhjR388.js";import"./clock-BcgI_fq9.js";import"./lightbulb-BdHnJrWB.js";import"./badge-check-hP3Izi0O.js";import"./shield-check-BZKhk7W8.js";import"./check-Dp9s-UDK.js";import"./phone-BtRpDAHW.js";import"./map-pin-CklJpJh_.js";import"./navigation-IVxERe0N.js";import"./TradeInEstimateModal-qBHzc9QR.js";import"./chevron-down-BNMVTt4F.js";import"./thumbs-up-BclOQMzC.js";import"./sparkles-CtRsSQYc.js";import"./arrow-right-dedlXB6n.js";const H={title:"Organisms/BuyingPotential",component:o,parameters:{layout:"padded",docs:{description:{component:`
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
