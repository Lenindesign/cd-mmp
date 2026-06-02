import{B as o}from"./BuyingPotential-CwEvaFHm.js";import"./iframe-B-thMleP.js";import"./preload-helper-PPVm8Dsz.js";import"./vehicleService-jXr_v8Nu.js";import"./index-C_qiXwZJ.js";import"./listingsService-CGiWL-WW.js";import"./leaseDealsService-aU5qasHD.js";import"./incentiveAdapter-D10HQ0my.js";import"./stateVehicleTaxes-DZPd_wL8.js";import"./createLucideIcon-BGNk_3ok.js";import"./IncentivesModal-Dcx-Rwiq.js";import"./index-Dn_HxZJU.js";import"./index-CldU7Wt8.js";import"./trimService-DLkm3_Mg.js";import"./dateUtils-Blw69jOb.js";import"./x-DjjeOBGQ.js";import"./info-Dl7PcwSE.js";import"./trending-down-CPcM5BLy.js";import"./circle-check-big-DnND9nw2.js";import"./gem-C_zwkgom.js";import"./clock-CPAWPjHo.js";import"./lightbulb-2gFwZXV0.js";import"./badge-check-BuQgVV6T.js";import"./shield-check-CvA8ZjXa.js";import"./check-nm-83fzU.js";import"./phone-CIPjjBRO.js";import"./map-pin-CkEvzsrv.js";import"./navigation-D3syPiDC.js";import"./TradeInEstimateModal-CamlJOY3.js";import"./thumbs-up-D-AsjRNJ.js";import"./sparkles-WgqKAfAm.js";import"./chevron-down-LhmgiatH.js";import"./arrow-right-ZO7VnYdM.js";const E={title:"Organisms/BuyingPotential",component:o,parameters:{layout:"padded",docs:{description:{component:`
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
