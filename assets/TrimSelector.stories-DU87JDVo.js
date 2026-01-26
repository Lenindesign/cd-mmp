import{T as l,g as e}from"./trimService-CKuDxnh2.js";import"./iframe-XebPOL9h.js";import"./preload-helper-PPVm8Dsz.js";import"./x-BgGHJxot.js";import"./createLucideIcon-Dftgs1wS.js";import"./award-CnjzeBBD.js";import"./check-DaqYxx8h.js";import"./minus-DEIGpOOM.js";import"./plus-CgzJP6mk.js";import"./chevron-right-C55wJU9C.js";import"./chevron-left-CdqUIPta.js";import"./map-pin-CcZor8kV.js";const A={title:"Organisms/TrimSelector",component:l,parameters:{layout:"padded",docs:{description:{component:`
The TrimSelector (Compare Trims) component allows users to browse, select, and compare different trim levels for a vehicle.

## Features
- **Clean Card Design**: Modern, minimal trim cards with price, MPG, and key features
- **Selection Counter**: Shows "X of 5 selected" with Compare Trims button
- **Carousel Navigation**: Horizontal scrolling with navigation arrows
- **Recommended Badge**: Green badge highlights the recommended trim option
- **Location-aware**: Shows zip code with "Change Location" option
- **Trim Comparison**: Select 2-5 trims to compare specifications side-by-side in a modal

## Design
Based on the Car and Driver design system with:
- Green borders/badges for selected/recommended trims
- Blue cobalt accent for prices and CTAs
- Clean typography hierarchy
- Subtle shadows and borders
        `}}},tags:["autodocs"]},d=e("Toyota","Camry",28400,36920),p=e("Honda","Accord",28990,38990),u=e("Ford","F-150",36495,67915),m=e("Tesla","Model 3",40240,53240),h=e("BMW","3 Series",46200,60200),r={args:{trims:d,vehicleName:"2025 Toyota Camry",zipCode:"10940"}},i={args:{trims:e("Kia","Telluride",37490,54990),vehicleName:"2025 Kia Telluride",zipCode:"10940"},parameters:{docs:{description:{story:"Kia Telluride with SX, SX X-Line, and SX Prestige trims - matching the reference design."}}}},s={args:{trims:p,title:"Pricing and Which One to Buy",subtitle:"Compare all available trim levels",vehicleName:"2025 Honda Accord"},parameters:{docs:{description:{story:"Honda Accord with 5 trim levels including the powerful Touring with 2.0L Turbo engine."}}}},o={args:{trims:u,title:"Pricing and Which One to Buy",subtitle:"America's best-selling truck with multiple trim options",vehicleName:"2025 Ford F-150"},parameters:{docs:{description:{story:"Ford F-150 lineup from work truck to luxury Platinum trim."}}}},t={args:{trims:m,title:"Choose Your Configuration",subtitle:"All-electric performance sedan",vehicleName:"2025 Tesla Model 3"},parameters:{docs:{description:{story:"Tesla Model 3 with RWD, Long Range AWD, and Performance variants."}}}},a={args:{trims:h,title:"Select Your 3 Series",subtitle:"The Ultimate Driving Machine",vehicleName:"2025 BMW 3 Series"},parameters:{docs:{description:{story:"BMW 3 Series from 330i to M340i xDrive with full specifications."}}}},n={args:{trims:m.slice(0,2),vehicleName:"2025 Tesla Model 3"}},c={args:{trims:m,vehicleName:"2025 Tesla Model 3"}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    trims: toyotaCamryTrims,
    vehicleName: '2025 Toyota Camry',
    zipCode: '10940'
  }
}`,...r.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    trims: getVehicleTrims('Kia', 'Telluride', 37490, 54990),
    vehicleName: '2025 Kia Telluride',
    zipCode: '10940'
  },
  parameters: {
    docs: {
      description: {
        story: 'Kia Telluride with SX, SX X-Line, and SX Prestige trims - matching the reference design.'
      }
    }
  }
}`,...i.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
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
}`,...s.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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
}`,...o.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
}`,...t.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
}`,...c.parameters?.docs?.source}}};const W=["Default","KiaTelluride","HondaAccord","FordF150","TeslaModel3","BMW3Series","TwoTrims","ThreeTrims"];export{a as BMW3Series,r as Default,o as FordF150,s as HondaAccord,i as KiaTelluride,t as TeslaModel3,c as ThreeTrims,n as TwoTrims,W as __namedExportsOrder,A as default};
