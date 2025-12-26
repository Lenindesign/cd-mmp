import{Q as i}from"./QuickSpecs-BY0ZIn6k.js";import"./iframe-DmndRlf0.js";import"./preload-helper-PPVm8Dsz.js";import"./info-BksGu3HL.js";import"./createLucideIcon-BwCQpYwD.js";import"./x-a1_nNonp.js";const d={title:"Molecules/QuickSpecs",component:i,parameters:{layout:"padded",docs:{description:{component:`
# QuickSpecs

At-a-glance vehicle specifications displayed in a scannable grid format.

---

## Purpose

Helps users quickly evaluate key vehicle attributes without scrolling to detailed specs.

---

## Specifications Shown

| Spec | Description |
|------|-------------|
| **MPG** | Fuel economy (city/highway or MPGe for EVs) |
| **Seating** | Passenger capacity |
| **Powertrain** | Engine/motor type (Gas, Electric, Hybrid) |
| **Drivetrain** | Drive configuration (FWD, RWD, AWD, 4WD) |
| **Warranty** | Basic warranty coverage |

---

## Responsive Behavior

- Desktop: 5-column grid
- Tablet: 3-column grid  
- Mobile: 2-column grid

---

## Data Requirements

All spec values should be formatted strings. Missing values display a dash.
        `}}},tags:["autodocs"],argTypes:{specs:{description:"Specification values for the vehicle",control:"object",table:{type:{summary:"object",detail:"{ mpg: string; seating: string; powertrain: string; drivetrain: string; warranty: string; }"},category:"Data"}}}},e={args:{}},r={args:{specs:{mpg:"28/39 City/Hwy",seating:"5 Seats",powertrain:"Gas",drivetrain:"Front-Wheel Drive",warranty:"3 Years/36,000 Miles"}}},a={args:{specs:{mpg:"120 MPGe",seating:"5 Seats",powertrain:"Electric",drivetrain:"All-Wheel Drive",warranty:"8 Years/100,000 Miles"}}},s={args:{specs:{mpg:"18/24 City/Hwy",seating:"6 Seats",powertrain:"Gas V8",drivetrain:"4-Wheel Drive",warranty:"3 Years/36,000 Miles"}}},t={args:{specs:{mpg:"51/53 City/Hwy",seating:"5 Seats",powertrain:"Hybrid",drivetrain:"All-Wheel Drive",warranty:"8 Years/100,000 Miles (Battery)"}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {}
}`,...e.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    specs: {
      mpg: '28/39 City/Hwy',
      seating: '5 Seats',
      powertrain: 'Gas',
      drivetrain: 'Front-Wheel Drive',
      warranty: '3 Years/36,000 Miles'
    }
  }
}`,...r.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    specs: {
      mpg: '120 MPGe',
      seating: '5 Seats',
      powertrain: 'Electric',
      drivetrain: 'All-Wheel Drive',
      warranty: '8 Years/100,000 Miles'
    }
  }
}`,...a.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    specs: {
      mpg: '18/24 City/Hwy',
      seating: '6 Seats',
      powertrain: 'Gas V8',
      drivetrain: '4-Wheel Drive',
      warranty: '3 Years/36,000 Miles'
    }
  }
}`,...s.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    specs: {
      mpg: '51/53 City/Hwy',
      seating: '5 Seats',
      powertrain: 'Hybrid',
      drivetrain: 'All-Wheel Drive',
      warranty: '8 Years/100,000 Miles (Battery)'
    }
  }
}`,...t.parameters?.docs?.source}}};const m=["Default","Sedan","Electric","Truck","Hybrid"];export{e as Default,a as Electric,t as Hybrid,r as Sedan,s as Truck,m as __namedExportsOrder,d as default};
