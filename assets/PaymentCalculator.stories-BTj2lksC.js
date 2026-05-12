import{P as n}from"./PaymentCalculator-CZcC7emB.js";import"./iframe-C0WyfAyi.js";import"./preload-helper-PPVm8Dsz.js";import"./rangeInputStyle-DyBPPVQG.js";const l={title:"Organisms/Car Payment Calculator",component:n,parameters:{layout:"padded",docs:{description:{component:`
# Car Payment Calculator

## Overview

Distilled **Finance / Lease / Cash** estimate: shared price and trade-in, finance rate from **credit tier** (plus optional promo APR), one **primary CTA**.

---

## Business Purpose

| Goal | How It Achieves It |
|------|-------------------|
| Purchase Confidence | Shows affordable payment options |
| Lead Generation | "Send Offer" CTA captures high-intent users |
| Engagement | Interactive sliders keep users on-page |
| Conversion | Removes payment uncertainty |

---

## Tabs

| Tab | What It Shows |
|-----|---------------|
| Finance | Amortized loan: monthly payment, interest, total out-of-pocket |
| Lease | Up-front (synced with Finance down), residual (MSRP-based), lease APR slider (MF × 2400), optional MF field in details |
| Cash | Vehicle price minus trade-in (excl. taxes/fees) |

---

## Key Inputs

| Input | Type | Description |
|-------|------|-------------|
| Vehicle price | Slider | |
| Down / up-front | Slider | Single value shared between Finance down and Lease up-front |
| Credit tier | Select | Sets APR (finance) |
| Loan term | Pills | |
| Lease: residual, APR→MF, term | Sliders / pills | MF optional in “Money factor” disclosure |
| Trade-in | Slider | Always visible |
        `}}},tags:["autodocs"],argTypes:{msrp:{description:"Vehicle MSRP in dollars",control:{type:"number",min:1e4,max:15e4,step:500},table:{type:{summary:"number"},category:"Vehicle"}},vehicleName:{description:"Full vehicle name (Year Make Model)",control:"text",table:{type:{summary:"string"},category:"Vehicle"}},bestApr:{description:"Best available APR rate (overrides credit-tier default)",control:{type:"number",min:0,max:20,step:.1},table:{type:{summary:"number"},category:"Deal"}},make:{description:"Make (CTA: SHOP MAKE MODEL)",control:"text",table:{type:{summary:"string"},category:"Vehicle"}},model:{description:"Model (CTA)",control:"text",table:{type:{summary:"string"},category:"Vehicle"}}}},e={args:{msrp:21895,vehicleName:"2025 Chevrolet Trax",make:"Chevrolet",model:"Trax"},parameters:{docs:{description:{story:"Default calculator for an affordable subcompact SUV."}}}},r={args:{msrp:21895,vehicleName:"2025 Chevrolet Trax",make:"Chevrolet",model:"Trax",bestApr:0},parameters:{docs:{description:{story:"Calculator with a 0% APR promotional rate applied."}}}},a={args:{msrp:89500,vehicleName:"2025 Porsche Cayenne",make:"Porsche",model:"Cayenne"},parameters:{docs:{description:{story:"Higher MSRP vehicle showing larger payment estimates."}}}},t={args:{msrp:45e3,vehicleName:"2025 Ford F-150",make:"Ford",model:"F-150",bestApr:3.9},parameters:{docs:{description:{story:"Mid-range truck with a competitive finance rate."}}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    msrp: 21895,
    vehicleName: '2025 Chevrolet Trax',
    make: 'Chevrolet',
    model: 'Trax'
  },
  parameters: {
    docs: {
      description: {
        story: 'Default calculator for an affordable subcompact SUV.'
      }
    }
  }
}`,...e.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    msrp: 21895,
    vehicleName: '2025 Chevrolet Trax',
    make: 'Chevrolet',
    model: 'Trax',
    bestApr: 0
  },
  parameters: {
    docs: {
      description: {
        story: 'Calculator with a 0% APR promotional rate applied.'
      }
    }
  }
}`,...r.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    msrp: 89500,
    vehicleName: '2025 Porsche Cayenne',
    make: 'Porsche',
    model: 'Cayenne'
  },
  parameters: {
    docs: {
      description: {
        story: 'Higher MSRP vehicle showing larger payment estimates.'
      }
    }
  }
}`,...a.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    msrp: 45000,
    vehicleName: '2025 Ford F-150',
    make: 'Ford',
    model: 'F-150',
    bestApr: 3.9
  },
  parameters: {
    docs: {
      description: {
        story: 'Mid-range truck with a competitive finance rate.'
      }
    }
  }
}`,...t.parameters?.docs?.source}}};const m=["Default","WithSpecialAPR","LuxuryVehicle","Truck"];export{e as Default,a as LuxuryVehicle,t as Truck,r as WithSpecialAPR,m as __namedExportsOrder,l as default};
