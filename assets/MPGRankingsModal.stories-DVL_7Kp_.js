import{M as d}from"./MPGRankingsModal-C04U5bk1.js";import"./iframe-BbKq_w80.js";import"./preload-helper-PPVm8Dsz.js";import"./trending-up-BYNdRF6q.js";import"./createLucideIcon-BwL5wOHS.js";import"./x-BY7uak1k.js";import"./fuel-BHSMwqXe.js";import"./external-link-CiXF-uYf.js";import"./award-C5ds2ucf.js";const l=[{id:"1",make:"Toyota",model:"Prius",comb08:57,city08:58,highway08:53,fuelType1:"Regular Gasoline",rank:1,isCurrentVehicle:!1},{id:"2",make:"Hyundai",model:"Elantra Hybrid",comb08:54,city08:53,highway08:56,fuelType1:"Regular Gasoline",rank:2,isCurrentVehicle:!1},{id:"3",make:"Honda",model:"Insight",comb08:52,city08:55,highway08:49,fuelType1:"Regular Gasoline",rank:3,isCurrentVehicle:!1},{id:"4",make:"Toyota",model:"Camry Hybrid",comb08:52,city08:51,highway08:53,fuelType1:"Regular Gasoline",rank:4,isCurrentVehicle:!1},{id:"5",make:"Honda",model:"Accord Hybrid",comb08:48,city08:51,highway08:44,fuelType1:"Regular Gasoline",rank:5,isCurrentVehicle:!1},{id:"6",make:"Hyundai",model:"Sonata Hybrid",comb08:47,city08:45,highway08:51,fuelType1:"Regular Gasoline",rank:6,isCurrentVehicle:!1},{id:"7",make:"Kia",model:"K5",comb08:35,city08:31,highway08:41,fuelType1:"Regular Gasoline",rank:7,isCurrentVehicle:!0},{id:"8",make:"Nissan",model:"Altima",comb08:32,city08:28,highway08:39,fuelType1:"Regular Gasoline",rank:8,isCurrentVehicle:!1},{id:"9",make:"Mazda",model:"Mazda3",comb08:31,city08:28,highway08:36,fuelType1:"Regular Gasoline",rank:9,isCurrentVehicle:!1},{id:"10",make:"Subaru",model:"Legacy",comb08:30,city08:27,highway08:35,fuelType1:"Regular Gasoline",rank:10,isCurrentVehicle:!1}],u=[{id:"1",make:"Toyota",model:"RAV4 Hybrid",comb08:41,city08:41,highway08:38,fuelType1:"Regular Gasoline",rank:1,isCurrentVehicle:!1},{id:"2",make:"Honda",model:"CR-V Hybrid",comb08:40,city08:40,highway08:35,fuelType1:"Regular Gasoline",rank:2,isCurrentVehicle:!0},{id:"3",make:"Ford",model:"Escape Hybrid",comb08:39,city08:43,highway08:37,fuelType1:"Regular Gasoline",rank:3,isCurrentVehicle:!1},{id:"4",make:"Hyundai",model:"Tucson Hybrid",comb08:38,city08:38,highway08:38,fuelType1:"Regular Gasoline",rank:4,isCurrentVehicle:!1},{id:"5",make:"Kia",model:"Sportage Hybrid",comb08:38,city08:39,highway08:38,fuelType1:"Regular Gasoline",rank:5,isCurrentVehicle:!1},{id:"6",make:"Nissan",model:"Kicks",comb08:33,city08:31,highway08:36,fuelType1:"Regular Gasoline",rank:6,isCurrentVehicle:!1},{id:"7",make:"Mazda",model:"CX-30",comb08:28,city08:25,highway08:33,fuelType1:"Regular Gasoline",rank:7,isCurrentVehicle:!1},{id:"8",make:"Subaru",model:"Forester",comb08:28,city08:26,highway08:33,fuelType1:"Regular Gasoline",rank:8,isCurrentVehicle:!1},{id:"9",make:"Jeep",model:"Cherokee",comb08:26,city08:22,highway08:31,fuelType1:"Regular Gasoline",rank:9,isCurrentVehicle:!1},{id:"10",make:"Ford",model:"Bronco Sport",comb08:26,city08:25,highway08:28,fuelType1:"Regular Gasoline",rank:10,isCurrentVehicle:!1}],y=[{id:"1",make:"Ford",model:"Maverick Hybrid",comb08:37,city08:42,highway08:33,fuelType1:"Regular Gasoline",rank:1,isCurrentVehicle:!1},{id:"2",make:"Hyundai",model:"Santa Cruz",comb08:26,city08:23,highway08:30,fuelType1:"Regular Gasoline",rank:2,isCurrentVehicle:!1},{id:"3",make:"Ford",model:"Ranger",comb08:24,city08:21,highway08:26,fuelType1:"Regular Gasoline",rank:3,isCurrentVehicle:!1},{id:"4",make:"Toyota",model:"Tacoma",comb08:23,city08:20,highway08:26,fuelType1:"Regular Gasoline",rank:4,isCurrentVehicle:!1},{id:"5",make:"Chevrolet",model:"Colorado",comb08:22,city08:19,highway08:27,fuelType1:"Regular Gasoline",rank:5,isCurrentVehicle:!1},{id:"6",make:"Ford",model:"F-150",comb08:21,city08:18,highway08:25,fuelType1:"Regular Gasoline",rank:6,isCurrentVehicle:!0},{id:"7",make:"Ram",model:"1500",comb08:20,city08:17,highway08:24,fuelType1:"Regular Gasoline",rank:7,isCurrentVehicle:!1},{id:"8",make:"Chevrolet",model:"Silverado",comb08:20,city08:17,highway08:24,fuelType1:"Regular Gasoline",rank:8,isCurrentVehicle:!1},{id:"9",make:"Toyota",model:"Tundra",comb08:19,city08:17,highway08:22,fuelType1:"Regular Gasoline",rank:9,isCurrentVehicle:!1},{id:"10",make:"Nissan",model:"Titan",comb08:18,city08:16,highway08:22,fuelType1:"Regular Gasoline",rank:10,isCurrentVehicle:!1}],M={title:"Molecules/FuelEconomy/MPGRankingsModal",component:d,parameters:{layout:"fullscreen",docs:{description:{component:`
## MPG Rankings Modal

A modal component that displays fuel economy rankings for vehicles in a specific category (body style).

### Features
- Shows top 10 vehicles by combined MPG in the category
- Highlights the current vehicle's position in rankings
- Displays contextual message based on ranking (excellent, great, good, average, below)
- Shows MPG difference from #1 ranked vehicle
- Medal badges for top 3 positions
- City, highway, and combined MPG for each vehicle
- Fuel type indicator
- Link to FuelEconomy.gov for full rankings

### Usage
\`\`\`tsx
<MPGRankingsModal
  isOpen={true}
  onClose={() => {}}
  vehicles={rankingData}
  currentRank={7}
  currentMake="Kia"
  currentModel="K5"
  currentMPG={35}
  bodyStyle="Sedan"
  year={2024}
/>
\`\`\`
        `}}},tags:["autodocs"],argTypes:{isOpen:{control:"boolean",description:"Whether the modal is visible"},currentRank:{control:"number",description:"Current vehicle rank in the list (1-based)"},currentMake:{control:"text",description:"Current vehicle manufacturer"},currentModel:{control:"text",description:"Current vehicle model"},currentMPG:{control:"number",description:"Current vehicle combined MPG"},bodyStyle:{control:"select",options:["Sedan","SUV","Truck","Coupe","Hatchback","Convertible","Wagon","Van"],description:"Vehicle body style category"},year:{control:"number",description:"Model year for rankings"}}},r={args:{isOpen:!0,onClose:()=>{},vehicles:l,currentRank:7,currentMake:"Kia",currentModel:"K5",currentMPG:35,bodyStyle:"Sedan",year:2024}},n={args:{isOpen:!0,onClose:()=>{},vehicles:u,currentRank:2,currentMake:"Honda",currentModel:"CR-V Hybrid",currentMPG:40,bodyStyle:"SUV",year:2024}},a={args:{isOpen:!0,onClose:()=>{},vehicles:y,currentRank:6,currentMake:"Ford",currentModel:"F-150",currentMPG:21,bodyStyle:"Truck",year:2024}},i={args:{isOpen:!0,onClose:()=>{},vehicles:l.map((e,c)=>({...e,isCurrentVehicle:c===0})),currentRank:1,currentMake:"Toyota",currentModel:"Prius",currentMPG:57,bodyStyle:"Sedan",year:2024}},o={args:{isOpen:!0,onClose:()=>{},vehicles:l.map((e,c)=>({...e,isCurrentVehicle:c===2})),currentRank:3,currentMake:"Honda",currentModel:"Insight",currentMPG:52,bodyStyle:"Sedan",year:2024}},s={args:{isOpen:!0,onClose:()=>{},vehicles:[...l.map(e=>({...e,isCurrentVehicle:!1})),{id:"15",make:"Dodge",model:"Charger",comb08:23,city08:19,highway08:30,fuelType1:"Premium Gasoline",rank:15,isCurrentVehicle:!0}],currentRank:15,currentMake:"Dodge",currentModel:"Charger",currentMPG:23,bodyStyle:"Sedan",year:2024}},t={args:{isOpen:!1,onClose:()=>{},vehicles:l,currentRank:7,currentMake:"Kia",currentModel:"K5",currentMPG:35,bodyStyle:"Sedan",year:2024}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    isOpen: true,
    onClose: () => {},
    vehicles: sedanRankings,
    currentRank: 7,
    currentMake: 'Kia',
    currentModel: 'K5',
    currentMPG: 35,
    bodyStyle: 'Sedan',
    year: 2024
  }
}`,...r.parameters?.docs?.source},description:{story:`Sedan rankings with a mid-tier vehicle.
Shows the Kia K5 ranked #7 among sedans.`,...r.parameters?.docs?.description}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    isOpen: true,
    onClose: () => {},
    vehicles: suvRankings,
    currentRank: 2,
    currentMake: 'Honda',
    currentModel: 'CR-V Hybrid',
    currentMPG: 40,
    bodyStyle: 'SUV',
    year: 2024
  }
}`,...n.parameters?.docs?.source},description:{story:`SUV rankings with a top-ranked vehicle.
Shows the Honda CR-V Hybrid ranked #2 among SUVs.`,...n.parameters?.docs?.description}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    isOpen: true,
    onClose: () => {},
    vehicles: truckRankings,
    currentRank: 6,
    currentMake: 'Ford',
    currentModel: 'F-150',
    currentMPG: 21,
    bodyStyle: 'Truck',
    year: 2024
  }
}`,...a.parameters?.docs?.source},description:{story:`Truck rankings with a mid-tier vehicle.
Shows the Ford F-150 ranked #6 among trucks.`,...a.parameters?.docs?.description}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    isOpen: true,
    onClose: () => {},
    vehicles: sedanRankings.map((v, i) => ({
      ...v,
      isCurrentVehicle: i === 0
    })),
    currentRank: 1,
    currentMake: 'Toyota',
    currentModel: 'Prius',
    currentMPG: 57,
    bodyStyle: 'Sedan',
    year: 2024
  }
}`,...i.parameters?.docs?.source},description:{story:`#1 ranked vehicle.
Shows the Toyota Prius as the top-ranked sedan
with the "excellent" status message.`,...i.parameters?.docs?.description}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    isOpen: true,
    onClose: () => {},
    vehicles: sedanRankings.map((v, i) => ({
      ...v,
      isCurrentVehicle: i === 2
    })),
    currentRank: 3,
    currentMake: 'Honda',
    currentModel: 'Insight',
    currentMPG: 52,
    bodyStyle: 'Sedan',
    year: 2024
  }
}`,...o.parameters?.docs?.source},description:{story:`#3 ranked vehicle (bronze position).
Shows a vehicle in the top 3 with the "great" status message.`,...o.parameters?.docs?.description}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    isOpen: true,
    onClose: () => {},
    vehicles: [...sedanRankings.map(v => ({
      ...v,
      isCurrentVehicle: false
    })), {
      id: '15',
      make: 'Dodge',
      model: 'Charger',
      comb08: 23,
      city08: 19,
      highway08: 30,
      fuelType1: 'Premium Gasoline',
      rank: 15,
      isCurrentVehicle: true
    }],
    currentRank: 15,
    currentMake: 'Dodge',
    currentModel: 'Charger',
    currentMPG: 23,
    bodyStyle: 'Sedan',
    year: 2024
  }
}`,...s.parameters?.docs?.source},description:{story:`Vehicle not in top 10.
Shows a lower-ranked vehicle with the "below average" message.`,...s.parameters?.docs?.description}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    isOpen: false,
    onClose: () => {},
    vehicles: sedanRankings,
    currentRank: 7,
    currentMake: 'Kia',
    currentModel: 'K5',
    currentMPG: 35,
    bodyStyle: 'Sedan',
    year: 2024
  }
}`,...t.parameters?.docs?.source},description:{story:`Modal in closed state.
The modal should not be visible.`,...t.parameters?.docs?.description}}};const S=["SedanRankings","SUVRankingsTopRanked","TruckRankings","TopRankedVehicle","BronzePosition","LowerRankedVehicle","Closed"];export{o as BronzePosition,t as Closed,s as LowerRankedVehicle,n as SUVRankingsTopRanked,r as SedanRankings,i as TopRankedVehicle,a as TruckRankings,S as __namedExportsOrder,M as default};
