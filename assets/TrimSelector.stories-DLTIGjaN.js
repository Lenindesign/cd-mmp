import{T as d,g as e}from"./trimService-BqwqGJo2.js";import"./iframe-40V3jQdk.js";import"./preload-helper-PPVm8Dsz.js";import"./x-Ba8OxwI0.js";import"./createLucideIcon-Cr3AgCDL.js";import"./award-DQb_RLhB.js";import"./check-BgFdVs7b.js";import"./minus-C-I3d2wW.js";import"./git-compare-aAtuiLWm.js";import"./chevron-left-Lt8ChRSY.js";import"./chevron-right-UeRPZ7MI.js";import"./info-DYq91ypx.js";const A={title:"Organisms/TrimSelector",component:d,parameters:{layout:"padded",docs:{description:{component:`
The TrimSelector component allows users to browse, select, and compare different trim levels for a vehicle.

## Features
- **Carousel Navigation**: Horizontal scrolling with navigation arrows
- **Recommended Badge**: Highlights the recommended trim option
- **Trim Comparison**: Select 2-4 trims to compare specifications side-by-side in a modal
- **Full Specifications**: Compare engine, horsepower, fuel economy, and 15+ features
- **Responsive Design**: Adapts to mobile and desktop layouts

## Comparison Modal
Click the checkbox icon on any trim card to add it to comparison. Once you have 2+ trims selected, click "Compare Trims" to open the comparison modal showing:
- **Pricing**: Starting MSRP
- **Performance**: Engine, horsepower, torque, transmission, drivetrain, fuel economy
- **Interior & Comfort**: Seating, cargo, heated/ventilated/leather seats, sunroof
- **Technology**: Navigation, premium audio, wireless charging, remote start, heads-up display
- **Safety**: Adaptive cruise, blind spot monitor, lane departure, emergency braking, parking assist
        `}}},tags:["autodocs"]},l=e("Toyota","Camry",28400,36920),p=e("Honda","Accord",28990,38990),u=e("Ford","F-150",36495,67915),m=e("Tesla","Model 3",40240,53240),g=e("BMW","3 Series",46200,60200),r={args:{trims:l,vehicleName:"2025 Toyota Camry"}},o={args:{trims:l,title:"Choose Your Trim",subtitle:"Select the perfect configuration for your needs",vehicleName:"2025 Toyota Camry"}},t={args:{trims:p,title:"Pricing and Which One to Buy",subtitle:"Compare all available trim levels",vehicleName:"2025 Honda Accord"},parameters:{docs:{description:{story:"Honda Accord with 5 trim levels including the powerful Touring with 2.0L Turbo engine."}}}},s={args:{trims:u,title:"Pricing and Which One to Buy",subtitle:"America's best-selling truck with multiple trim options",vehicleName:"2025 Ford F-150"},parameters:{docs:{description:{story:"Ford F-150 lineup from work truck to luxury Platinum trim."}}}},i={args:{trims:m,title:"Choose Your Configuration",subtitle:"All-electric performance sedan",vehicleName:"2025 Tesla Model 3"},parameters:{docs:{description:{story:"Tesla Model 3 with RWD, Long Range AWD, and Performance variants."}}}},a={args:{trims:g,title:"Select Your 3 Series",subtitle:"The Ultimate Driving Machine",vehicleName:"2025 BMW 3 Series"},parameters:{docs:{description:{story:"BMW 3 Series from 330i to M340i xDrive with full specifications."}}}},n={args:{trims:m.slice(0,2),vehicleName:"2025 Tesla Model 3"}},c={args:{trims:m,vehicleName:"2025 Tesla Model 3"}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    trims: toyotaCamryTrims,
    vehicleName: '2025 Toyota Camry'
  }
}`,...r.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    trims: toyotaCamryTrims,
    title: 'Choose Your Trim',
    subtitle: 'Select the perfect configuration for your needs',
    vehicleName: '2025 Toyota Camry'
  }
}`,...o.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    trims: hondaAccordTrims,
    title: 'Pricing and Which One to Buy',
    subtitle: 'Compare all available trim levels',
    vehicleName: '2025 Honda Accord'
  },
  parameters: {
    docs: {
      description: {
        story: 'Honda Accord with 5 trim levels including the powerful Touring with 2.0L Turbo engine.'
      }
    }
  }
}`,...t.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    trims: fordF150Trims,
    title: 'Pricing and Which One to Buy',
    subtitle: 'America\\'s best-selling truck with multiple trim options',
    vehicleName: '2025 Ford F-150'
  },
  parameters: {
    docs: {
      description: {
        story: 'Ford F-150 lineup from work truck to luxury Platinum trim.'
      }
    }
  }
}`,...s.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    trims: teslaModel3Trims,
    title: 'Choose Your Configuration',
    subtitle: 'All-electric performance sedan',
    vehicleName: '2025 Tesla Model 3'
  },
  parameters: {
    docs: {
      description: {
        story: 'Tesla Model 3 with RWD, Long Range AWD, and Performance variants.'
      }
    }
  }
}`,...i.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    trims: bmw3SeriesTrims,
    title: 'Select Your 3 Series',
    subtitle: 'The Ultimate Driving Machine',
    vehicleName: '2025 BMW 3 Series'
  },
  parameters: {
    docs: {
      description: {
        story: 'BMW 3 Series from 330i to M340i xDrive with full specifications.'
      }
    }
  }
}`,...a.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    trims: teslaModel3Trims.slice(0, 2),
    vehicleName: '2025 Tesla Model 3'
  }
}`,...n.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    trims: teslaModel3Trims,
    vehicleName: '2025 Tesla Model 3'
  }
}`,...c.parameters?.docs?.source}}};const W=["Default","WithSubtitle","HondaAccord","FordF150","TeslaModel3","BMW3Series","TwoTrims","ThreeTrims"];export{a as BMW3Series,r as Default,s as FordF150,t as HondaAccord,i as TeslaModel3,c as ThreeTrims,n as TwoTrims,o as WithSubtitle,W as __namedExportsOrder,A as default};
