import{P as o}from"./PaymentCalculator-DcG5dvLT.js";import"./iframe-DFxtnQRF.js";import"./preload-helper-PPVm8Dsz.js";import"./createLucideIcon-Bv7jqSiY.js";import"./chevron-down-CuaR0HI7.js";import"./dollar-sign-4F-YhxLz.js";import"./arrow-right-XirBdNwW.js";const d={title:"Organisms/Car Payment Calculator",component:o,parameters:{layout:"padded",docs:{description:{component:`
# Car Payment Calculator

## Overview

An interactive payment estimator that lets shoppers model finance, lease, and cash scenarios for any vehicle. Adjustable inputs for down payment, trade-in, credit score, and loan term update the monthly/total cost in real time.

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
| Finance | Monthly payment based on APR, term, down payment, and trade-in |
| Lease | Estimated monthly lease payment |
| Cash | Total out-of-pocket after trade-in |

---

## Key Inputs

| Input | Type | Description |
|-------|------|-------------|
| Down Payment | Slider | Percentage of MSRP (0–50%) |
| Credit Score | Dropdown | Tier-based APR lookup |
| Loan Term | Select | 36, 48, 60, 72, or 84 months |
| Trade-In | Text | Dollar value of trade-in vehicle |
        `}}},tags:["autodocs"],argTypes:{msrp:{description:"Vehicle MSRP in dollars",control:{type:"number",min:1e4,max:15e4,step:500},table:{type:{summary:"number"},category:"Vehicle"}},vehicleName:{description:"Full vehicle name (Year Make Model)",control:"text",table:{type:{summary:"string"},category:"Vehicle"}},bestApr:{description:"Best available APR rate (overrides credit-tier default)",control:{type:"number",min:0,max:20,step:.1},table:{type:{summary:"number"},category:"Deal"}}}},e={args:{msrp:21895,vehicleName:"2025 Chevrolet Trax"},parameters:{docs:{description:{story:"Default calculator for an affordable subcompact SUV."}}}},r={args:{msrp:21895,vehicleName:"2025 Chevrolet Trax",bestApr:0},parameters:{docs:{description:{story:"Calculator with a 0% APR promotional rate applied."}}}},a={args:{msrp:89500,vehicleName:"2025 Porsche Cayenne"},parameters:{docs:{description:{story:"Higher MSRP vehicle showing larger payment estimates."}}}},t={args:{msrp:45e3,vehicleName:"2025 Ford F-150",bestApr:3.9},parameters:{docs:{description:{story:"Mid-range truck with a competitive finance rate."}}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    msrp: 21895,
    vehicleName: '2025 Chevrolet Trax'
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
    vehicleName: '2025 Porsche Cayenne'
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
    bestApr: 3.9
  },
  parameters: {
    docs: {
      description: {
        story: 'Mid-range truck with a competitive finance rate.'
      }
    }
  }
}`,...t.parameters?.docs?.source}}};const u=["Default","WithSpecialAPR","LuxuryVehicle","Truck"];export{e as Default,a as LuxuryVehicle,t as Truck,r as WithSpecialAPR,u as __namedExportsOrder,d as default};
