import{F as l}from"./FuelEconomy-DZ_QtU0s.js";import"./iframe-BmlzIRR_.js";import"./preload-helper-PPVm8Dsz.js";import"./MPGRankingsModal-K-QmcMXB.js";import"./index-Dto8T7jp.js";import"./trending-up-bqjo71MM.js";import"./createLucideIcon-DgLfEH63.js";import"./x-DGb687Pz.js";import"./external-link-ymsK_54G.js";import"./zap-BzSFmo74.js";import"./leaf-vx4JJH5t.js";import"./fuel-B_SH_oUv.js";import"./award-CW_PxOTe.js";import"./GasStationsModal-BHq_0Vb6.js";import"./index.modern-B7GR65YA.js";import"./index-GS6FdTf2.js";import"./index-DZ-CxhYd.js";import"./loader-circle-Crd4YP7d.js";import"./map-pin-M2Ik2-dy.js";import"./info-CQ4irRJe.js";import"./gauge-B8NM3GD7.js";import"./dollar-sign-DuNxEzwU.js";import"./chevron-up-DE1JIrbg.js";import"./chevron-down-CB7Yq9Qy.js";const X={title:"Molecules/FuelEconomy",component:l,parameters:{layout:"padded",docs:{description:{component:`
## Fuel Economy Module

A comprehensive fuel economy display component that integrates with the EPA FuelEconomy.gov API to show:

- **MPG Ratings**: Combined, city, and highway fuel economy
- **EPA Scores**: Fuel economy and greenhouse gas scores (1-10 scale)
- **Annual Fuel Cost**: Estimated yearly fuel expenses with savings comparison
- **Powertrain Details**: Engine, transmission, drivetrain, and fuel type
- **Variant Comparison**: Compare all available configurations
- **MPG Rankings**: See how the vehicle ranks in its category
- **Gas Stations**: Find nearby gas stations

### Features
- Real-time data from EPA FuelEconomy.gov API
- Segment comparison (vs. average for body style)
- Interactive gauge visualizations
- Expandable variant table
- MPG rankings modal
- Gas stations locator modal
- Design system compliant styling

### Usage
\`\`\`tsx
<FuelEconomy
  year={2024}
  make="Honda"
  model="CR-V"
  bodyStyle="SUV"
/>
\`\`\`
        `}}},tags:["autodocs"],argTypes:{year:{control:"number",description:"Vehicle model year"},make:{control:"text",description:"Vehicle manufacturer name"},model:{control:"text",description:"Vehicle model name"},bodyStyle:{control:"select",options:["SUV","Sedan","Truck","Coupe","Hatchback","Convertible","Wagon","Van","Minivan"],description:"Vehicle body style for segment comparison"}}},e={args:{year:2024,make:"Honda",model:"CR-V",bodyStyle:"SUV"}},a={args:{year:2024,make:"Toyota",model:"Camry",bodyStyle:"Sedan"}},o={args:{year:2024,make:"Toyota",model:"RAV4 Hybrid",bodyStyle:"SUV"}},r={args:{year:2024,make:"Ford",model:"F-150",bodyStyle:"Truck"}},s={args:{year:2024,make:"Honda",model:"Civic",bodyStyle:"Hatchback"}},n={args:{year:2024,make:"BMW",model:"X5",bodyStyle:"SUV"}},t={args:{year:2024,make:"Nissan",model:"Kicks",bodyStyle:"SUV"}},i={args:{year:2024,make:"Mazda",model:"MX-5 Miata",bodyStyle:"Convertible"}},c={args:{year:2024,make:"Tesla",model:"Model 3",bodyStyle:"Sedan"}},m={args:{year:2024,make:"Honda",model:"Odyssey",bodyStyle:"Minivan"}},d={args:{year:2025,make:"Hyundai",model:"Elantra",bodyStyle:"Sedan"}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    year: 2024,
    make: 'Honda',
    model: 'CR-V',
    bodyStyle: 'SUV'
  }
}`,...e.parameters?.docs?.source},description:{story:`Default fuel economy display for a popular SUV.
The Honda CR-V demonstrates typical SUV fuel economy
with hybrid and non-hybrid variants.`,...e.parameters?.docs?.description}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    year: 2024,
    make: 'Toyota',
    model: 'Camry',
    bodyStyle: 'Sedan'
  }
}`,...a.parameters?.docs?.source},description:{story:`Fuel-efficient sedan example.
The Toyota Camry shows excellent fuel economy
scores, especially in hybrid configuration.`,...a.parameters?.docs?.description}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    year: 2024,
    make: 'Toyota',
    model: 'RAV4 Hybrid',
    bodyStyle: 'SUV'
  }
}`,...o.parameters?.docs?.source},description:{story:`Hybrid vehicle example.
The Toyota RAV4 Hybrid demonstrates how
hybrid vehicles display their superior MPG ratings.`,...o.parameters?.docs?.description}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    year: 2024,
    make: 'Ford',
    model: 'F-150',
    bodyStyle: 'Truck'
  }
}`,...r.parameters?.docs?.source},description:{story:`Truck example with lower fuel economy.
The Ford F-150 shows how trucks compare
to their segment average.`,...r.parameters?.docs?.description}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    year: 2024,
    make: 'Honda',
    model: 'Civic',
    bodyStyle: 'Hatchback'
  }
}`,...s.parameters?.docs?.source},description:{story:`Compact hatchback with excellent MPG.
The Honda Civic demonstrates how compact
cars achieve above-average fuel economy.`,...s.parameters?.docs?.description}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    year: 2024,
    make: 'BMW',
    model: 'X5',
    bodyStyle: 'SUV'
  }
}`,...n.parameters?.docs?.source},description:{story:`Luxury SUV example.
The BMW X5 shows fuel economy for
a premium SUV with multiple engine options.`,...n.parameters?.docs?.description}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    year: 2024,
    make: 'Nissan',
    model: 'Kicks',
    bodyStyle: 'SUV'
  }
}`,...t.parameters?.docs?.source},description:{story:`Subcompact SUV with great efficiency.
The Nissan Kicks demonstrates excellent
fuel economy for its class.`,...t.parameters?.docs?.description}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    year: 2024,
    make: 'Mazda',
    model: 'MX-5 Miata',
    bodyStyle: 'Convertible'
  }
}`,...i.parameters?.docs?.source},description:{story:`Sports car example.
The Mazda MX-5 Miata shows fuel economy
for a performance-oriented vehicle.`,...i.parameters?.docs?.description}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    year: 2024,
    make: 'Tesla',
    model: 'Model 3',
    bodyStyle: 'Sedan'
  }
}`,...c.parameters?.docs?.source},description:{story:`Electric vehicle example.
Note: EVs may display differently as they
use MPGe (miles per gallon equivalent).`,...c.parameters?.docs?.description}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    year: 2024,
    make: 'Honda',
    model: 'Odyssey',
    bodyStyle: 'Minivan'
  }
}`,...m.parameters?.docs?.source},description:{story:`Minivan example.
The Honda Odyssey demonstrates fuel economy
for family-oriented vehicles.`,...m.parameters?.docs?.description}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    year: 2025,
    make: 'Hyundai',
    model: 'Elantra',
    bodyStyle: 'Sedan'
  }
}`,...d.parameters?.docs?.source},description:{story:`Economy sedan with top-tier fuel efficiency.
The Hyundai Elantra Hybrid shows how
hybrid sedans achieve excellent MPG ratings.`,...d.parameters?.docs?.description}}};const D=["Default","EfficientSedan","HybridVehicle","TruckExample","CompactHatchback","LuxurySUV","SubcompactSUV","SportsCar","ElectricVehicle","Minivan","EconomySedan"];export{s as CompactHatchback,e as Default,d as EconomySedan,a as EfficientSedan,c as ElectricVehicle,o as HybridVehicle,n as LuxurySUV,m as Minivan,i as SportsCar,t as SubcompactSUV,r as TruckExample,D as __namedExportsOrder,X as default};
