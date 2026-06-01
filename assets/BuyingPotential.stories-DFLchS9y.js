import{B as o}from"./BuyingPotential-DIq4x34n.js";import"./iframe-B7hp9A8k.js";import"./preload-helper-PPVm8Dsz.js";import"./vehicleService-jXr_v8Nu.js";import"./index-C_qiXwZJ.js";import"./listingsService-CGiWL-WW.js";import"./leaseDealsService-aU5qasHD.js";import"./incentiveAdapter-D10HQ0my.js";import"./stateVehicleTaxes-OgkgLrEr.js";import"./createLucideIcon-hp555VxV.js";import"./IncentivesModal-BK4LBeeb.js";import"./index-DuTcw6Mx.js";import"./index-DImroxdQ.js";import"./trimService-DLkm3_Mg.js";import"./dateUtils-Blw69jOb.js";import"./x-DwZ0OUX7.js";import"./info-Bv_yuGT9.js";import"./trending-down-DWm31zFz.js";import"./circle-check-big-wJMlrlix.js";import"./gem-DHo7zr6p.js";import"./clock-BZIgEccH.js";import"./lightbulb-DTlHHz0p.js";import"./badge-check-CWQnoPRy.js";import"./shield-check-Cov6pXie.js";import"./check-s3FwC5ja.js";import"./phone-Bou4pZ2s.js";import"./map-pin-Dc1P5QpM.js";import"./navigation-TvIkFJYy.js";import"./TradeInEstimateModal-7gBd0lDr.js";import"./thumbs-up-BMgpZ7uy.js";import"./sparkles-DM1jt4uO.js";import"./chevron-down-CHfQQiTQ.js";import"./arrow-right-C55Xchjd.js";const E={title:"Organisms/BuyingPotential",component:o,parameters:{layout:"padded",docs:{description:{component:`
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
