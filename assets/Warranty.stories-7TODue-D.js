import{j as e}from"./iframe-OBDR56Lh.js";import{W as u,d as r}from"./Warranty-CmR_ESEI.js";import{F as l}from"./file-text--JqUPglB.js";import{W as m}from"./wrench-DZg48tiP.js";import{S as p}from"./shield-KgdBDuwk.js";import{C as y}from"./calendar-Bs-STJ4v.js";import"./preload-helper-PPVm8Dsz.js";import"./x-BNQ2W4fQ.js";import"./createLucideIcon-wzWtKGYt.js";import"./chevron-left-BGphhkE-.js";import"./chevron-right-hs2gCrmG.js";import"./youtube-MLYslHEs.js";import"./external-link-NSgGSNHr.js";import"./star-1XAQ59zS.js";import"./info-DgDTcVgP.js";import"./triangle-alert-DAE0xCS2.js";import"./circle-check-big-CCd0Ff_P.js";import"./loader-circle-B1JVQFBw.js";import"./chevron-up-Cesq5BoD.js";import"./chevron-down-0DEfO9zE.js";import"./car-CAE_xUC5.js";import"./users-CYW817gI.js";import"./shield-check-BqUgOZTl.js";import"./camera-ZLQXKOoQ.js";import"./minus-CsR6oUPz.js";import"./trending-up-BGPONnG6.js";import"./trending-down-Cl_9jJyS.js";const D={title:"Molecules/Warranty",component:u,parameters:{layout:"padded",docs:{description:{component:`
## Warranty & Safety Module

A comprehensive vehicle safety and warranty information component that integrates with the NHTSA API to display:

- **Recalls**: Active recalls with severity indicators, expandable details, and links to NHTSA
- **Owner Complaints**: Aggregated complaint data including crashes, fires, injuries, and top reported issues
- **Crash Test Ratings**: NHTSA 5-star safety ratings for frontal, side, and rollover tests
- **Warranty Coverage**: Standard warranty information cards

### Features
- Real-time data from NHTSA API
- Reliability context comparing vehicle to segment averages
- Interactive expandable sections
- Crash test photo modal
- Design system compliant styling

### Usage
\`\`\`tsx
<Warranty
  items={warrantyItems}
  make="Honda"
  model="CR-V"
  year={2024}
  bodyStyle="SUV"
/>
\`\`\`
        `}}},tags:["autodocs"],argTypes:{make:{control:"text",description:"Vehicle manufacturer name for NHTSA lookup"},model:{control:"text",description:"Vehicle model name for NHTSA lookup"},year:{control:"number",description:"Vehicle model year for NHTSA lookup"},bodyStyle:{control:"select",options:["SUV","Sedan","Truck","Coupe","Hatchback","Convertible","Wagon","Van"],description:"Vehicle body style for segment comparison"},title:{control:"text",description:"Section title"}}},t={args:{items:r,make:"Honda",model:"CR-V",year:2024,bodyStyle:"SUV"}},a={args:{items:r,make:"BMW",model:"X5",year:2024,bodyStyle:"SUV",title:"Warranty & Safety"}},n={args:{items:r,make:"Toyota",model:"Camry",year:2024,bodyStyle:"Sedan",title:"Warranty & Safety"}},o={args:{items:r,make:"Ford",model:"F-150",year:2024,bodyStyle:"Truck",title:"Warranty & Safety"}},s={args:{items:[{icon:e.jsx(l,{size:28}),title:"New Vehicle Limited Warranty",coverage:"4 Years / 50,000 Miles",description:"Comprehensive coverage for vehicle defects."},{icon:e.jsx(m,{size:28}),title:"Powertrain Warranty",coverage:"6 Years / 70,000 Miles",description:"Extended powertrain protection."},{icon:e.jsx(p,{size:28}),title:"Rust Perforation",coverage:"12 Years / Unlimited",description:"Industry-leading corrosion protection."},{icon:e.jsx(y,{size:28}),title:"Complimentary Maintenance",coverage:"3 Years / 36,000 Miles",description:"Includes scheduled maintenance services."}],make:"Mercedes-Benz",model:"GLC",year:2024,bodyStyle:"SUV",title:"Protection Plans"}},i={args:{items:[{icon:e.jsx(l,{size:28}),title:"Basic Vehicle Warranty",coverage:"4 Years / 50,000 Miles",description:"Comprehensive bumper-to-bumper coverage."},{icon:e.jsx(m,{size:28}),title:"Battery & Drive Unit",coverage:"8 Years / 100,000 Miles",description:"Extended coverage for EV-specific components."},{icon:e.jsx(p,{size:28}),title:"Corrosion Warranty",coverage:"8 Years / Unlimited",description:"Protection against rust-through corrosion."},{icon:e.jsx(y,{size:28}),title:"Roadside Assistance",coverage:"4 Years / 50,000 Miles",description:"Includes mobile charging assistance."}],make:"Tesla",model:"Model Y",year:2024,bodyStyle:"SUV",title:"Warranty Coverage"}},c={args:{items:r,title:"Warranty Information"}},d={args:{items:r,make:"Nissan",model:"Kicks",year:2024,bodyStyle:"SUV",title:"Warranty & Safety"}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    items: defaultWarrantyItems,
    make: 'Honda',
    model: 'CR-V',
    year: 2024,
    bodyStyle: 'SUV'
  }
}`,...t.parameters?.docs?.source},description:{story:`Default warranty display with NHTSA data integration.
Uses a Honda CR-V as the example vehicle to demonstrate
recalls, complaints, and safety ratings.`,...t.parameters?.docs?.description}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    items: defaultWarrantyItems,
    make: 'BMW',
    model: 'X5',
    year: 2024,
    bodyStyle: 'SUV',
    title: 'Warranty & Safety'
  }
}`,...a.parameters?.docs?.source},description:{story:`Example with a vehicle that has known recalls.
The BMW X5 demonstrates how recalls are displayed with
severity indicators and expandable details.`,...a.parameters?.docs?.description}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    items: defaultWarrantyItems,
    make: 'Toyota',
    model: 'Camry',
    year: 2024,
    bodyStyle: 'Sedan',
    title: 'Warranty & Safety'
  }
}`,...n.parameters?.docs?.source},description:{story:`Example with a popular sedan.
Shows how the component handles sedan-specific
segment comparisons and ratings.`,...n.parameters?.docs?.description}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    items: defaultWarrantyItems,
    make: 'Ford',
    model: 'F-150',
    year: 2024,
    bodyStyle: 'Truck',
    title: 'Warranty & Safety'
  }
}`,...o.parameters?.docs?.source},description:{story:`Example with a truck.
Demonstrates truck-specific segment averages
for reliability comparison.`,...o.parameters?.docs?.description}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    items: [{
      icon: <FileText size={28} />,
      title: 'New Vehicle Limited Warranty',
      coverage: '4 Years / 50,000 Miles',
      description: 'Comprehensive coverage for vehicle defects.'
    }, {
      icon: <Wrench size={28} />,
      title: 'Powertrain Warranty',
      coverage: '6 Years / 70,000 Miles',
      description: 'Extended powertrain protection.'
    }, {
      icon: <Shield size={28} />,
      title: 'Rust Perforation',
      coverage: '12 Years / Unlimited',
      description: 'Industry-leading corrosion protection.'
    }, {
      icon: <Calendar size={28} />,
      title: 'Complimentary Maintenance',
      coverage: '3 Years / 36,000 Miles',
      description: 'Includes scheduled maintenance services.'
    }],
    make: 'Mercedes-Benz',
    model: 'GLC',
    year: 2024,
    bodyStyle: 'SUV',
    title: 'Protection Plans'
  }
}`,...s.parameters?.docs?.source},description:{story:`Luxury brand with extended warranty coverage.
Shows custom warranty items for premium vehicles.`,...s.parameters?.docs?.description}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    items: [{
      icon: <FileText size={28} />,
      title: 'Basic Vehicle Warranty',
      coverage: '4 Years / 50,000 Miles',
      description: 'Comprehensive bumper-to-bumper coverage.'
    }, {
      icon: <Wrench size={28} />,
      title: 'Battery & Drive Unit',
      coverage: '8 Years / 100,000 Miles',
      description: 'Extended coverage for EV-specific components.'
    }, {
      icon: <Shield size={28} />,
      title: 'Corrosion Warranty',
      coverage: '8 Years / Unlimited',
      description: 'Protection against rust-through corrosion.'
    }, {
      icon: <Calendar size={28} />,
      title: 'Roadside Assistance',
      coverage: '4 Years / 50,000 Miles',
      description: 'Includes mobile charging assistance.'
    }],
    make: 'Tesla',
    model: 'Model Y',
    year: 2024,
    bodyStyle: 'SUV',
    title: 'Warranty Coverage'
  }
}`,...i.parameters?.docs?.source},description:{story:`Electric vehicle example.
EVs often have different warranty structures,
especially for battery coverage.`,...i.parameters?.docs?.description}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    items: defaultWarrantyItems,
    title: 'Warranty Information'
  }
}`,...c.parameters?.docs?.source},description:{story:`Warranty only mode without vehicle data.
When make/model/year are not provided, only
the warranty cards are displayed.`,...c.parameters?.docs?.description}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    items: defaultWarrantyItems,
    make: 'Nissan',
    model: 'Kicks',
    year: 2024,
    bodyStyle: 'SUV',
    title: 'Warranty & Safety'
  }
}`,...d.parameters?.docs?.source},description:{story:`Compact SUV example.
The Nissan Kicks demonstrates how the component
handles subcompact SUV segment comparisons.`,...d.parameters?.docs?.description}}};const L=["Default","WithRecalls","SedanExample","TruckExample","LuxuryBrand","ElectricVehicle","WarrantyOnly","CompactSUV"];export{d as CompactSUV,t as Default,i as ElectricVehicle,s as LuxuryBrand,n as SedanExample,o as TruckExample,c as WarrantyOnly,a as WithRecalls,L as __namedExportsOrder,D as default};
