import{B as o}from"./BuyingPotential-D8LOC8gw.js";import"./iframe-DV6aw0Ax.js";import"./preload-helper-PPVm8Dsz.js";import"./vehicleService-23eXHQkm.js";import"./index-C_qiXwZJ.js";import"./listingsService-B_8c8auV.js";import"./leaseDealsService-P60L_1Gl.js";import"./incentiveAdapter-C0j1lC3W.js";import"./stateVehicleTaxes-DkqeRfwc.js";import"./createLucideIcon-Ba6KarM3.js";import"./IncentivesModal-D-pT6Wwn.js";import"./index-L4qdul3S.js";import"./index-BA1fXg6x.js";import"./trimService-DLkm3_Mg.js";import"./dateUtils-Blw69jOb.js";import"./x-BsV6rhdp.js";import"./info-DW0n3iNk.js";import"./trending-down-BxAxBpnG.js";import"./circle-check-big-BxeR8Gg0.js";import"./gem-Df6x2s0E.js";import"./clock-BsKI83VA.js";import"./lightbulb-EqZJ8fnZ.js";import"./badge-check-SHCUqz3o.js";import"./shield-check-Cos2SKGs.js";import"./check-BcKCPRKp.js";import"./phone-CXF9TDBV.js";import"./map-pin-DO5znsTt.js";import"./navigation-BHthvU5h.js";import"./zap-CDaraWFU.js";import"./gauge-CK4TSNbq.js";import"./thumbs-up-DwkjiA_w.js";import"./sparkles-RLNbuuTi.js";import"./chevron-down-DqsPy2cV.js";import"./arrow-right-BwOfwQNd.js";const H={title:"Organisms/BuyingPotential",component:o,parameters:{layout:"padded",docs:{description:{component:`
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
}`,...t.parameters?.docs?.source}}};const L=["Default","SUV","Truck"];export{e as Default,r as SUV,t as Truck,L as __namedExportsOrder,H as default};
