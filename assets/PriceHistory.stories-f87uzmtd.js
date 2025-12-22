import{P as i}from"./PriceHistory-BraxD9HO.js";import"./iframe-CCFupnSY.js";import"./preload-helper-PPVm8Dsz.js";import"./chevron-up-Bj78XDE0.js";import"./createLucideIcon-CunauoQi.js";import"./chevron-down-9nUzrm_G.js";import"./trending-down-DpZiTdGr.js";import"./trending-up-BCRmgi1k.js";const V={title:"Components/PriceHistory",component:i,parameters:{layout:"padded",docs:{description:{component:'Displays vehicle price history, depreciation trends, and forecasted values. Powered by Black Book data. Toggle between "Previous Two Years" and "Forecasted Value" tabs to see different time periods.'}}},tags:["autodocs"],argTypes:{vehicleYear:{control:{type:"number",min:2015,max:2025},description:"The model year of the vehicle"},make:{control:"text",description:"Vehicle manufacturer"},model:{control:"text",description:"Vehicle model name"},trim:{control:"text",description:"Vehicle trim level"},asNewValue:{control:{type:"number",min:5e3,max:1e5,step:500},description:"Original value when new"},previousYearValue:{control:{type:"number",min:5e3,max:1e5,step:500},description:"Value from previous year"},currentValue:{control:{type:"number",min:5e3,max:1e5,step:500},description:"Current average market value"},forecastYear1Value:{control:{type:"number",min:5e3,max:1e5,step:500},description:"Projected value next year"},forecastYear2Value:{control:{type:"number",min:5e3,max:1e5,step:500},description:"Projected value in 2 years"},expertTip:{control:"text",description:"Optional expert tip message"}}},e={args:{vehicleYear:2023,make:"Kia",model:"Telluride",trim:"SX",asNewValue:23500,previousYearValue:21800,currentValue:20500,forecastYear1Value:18800,forecastYear2Value:17e3,expertTip:"Average purchasing price of a 2023 Kia Telluride in your area is $18,000. Consider selling if you own this vehicle in the next year if kept in average condition.",shopUrl:"#",tradeInUrl:"#"}},r={args:{vehicleYear:2022,make:"Toyota",model:"RAV4",trim:"XLE Premium",asNewValue:35e3,previousYearValue:30500,currentValue:28500,forecastYear1Value:25200,forecastYear2Value:23e3,shopUrl:"#",tradeInUrl:"#"}},a={args:{vehicleYear:2023,make:"BMW",model:"X5",trim:"xDrive40i",asNewValue:72e3,previousYearValue:62e3,currentValue:58e3,forecastYear1Value:52e3,forecastYear2Value:47e3,expertTip:"Luxury SUVs typically depreciate faster than mainstream models. Consider trading in before the 3-year mark for best value retention.",shopUrl:"#",tradeInUrl:"#"}},t={args:{vehicleYear:2022,make:"Ford",model:"F-150",trim:"Lariat",asNewValue:55e3,previousYearValue:48e3,currentValue:45e3,forecastYear1Value:41e3,forecastYear2Value:38500,expertTip:"Full-size trucks hold their value well. The F-150 Lariat is in high demand in your area.",shopUrl:"#",tradeInUrl:"#"}},o={args:{vehicleYear:2023,make:"Maserati",model:"Ghibli",trim:"GT",asNewValue:95e3,previousYearValue:8e4,currentValue:72e3,forecastYear1Value:58e3,forecastYear2Value:48e3,expertTip:"This vehicle is experiencing above-average depreciation. Consider selling sooner rather than later to maximize resale value.",shopUrl:"#",tradeInUrl:"#"}},n={args:{vehicleYear:2023,make:"Toyota",model:"4Runner",trim:"TRD Pro",asNewValue:58e3,previousYearValue:55500,currentValue:54e3,forecastYear1Value:52500,forecastYear2Value:51e3,expertTip:"The 4Runner TRD Pro holds its value exceptionally well. This is one of the best vehicles for long-term ownership.",shopUrl:"#",tradeInUrl:"#"}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    vehicleYear: 2023,
    make: 'Kia',
    model: 'Telluride',
    trim: 'SX',
    asNewValue: 23500,
    previousYearValue: 21800,
    currentValue: 20500,
    forecastYear1Value: 18800,
    forecastYear2Value: 17000,
    expertTip: 'Average purchasing price of a 2023 Kia Telluride in your area is $18,000. Consider selling if you own this vehicle in the next year if kept in average condition.',
    shopUrl: '#',
    tradeInUrl: '#'
  }
}`,...e.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    vehicleYear: 2022,
    make: 'Toyota',
    model: 'RAV4',
    trim: 'XLE Premium',
    asNewValue: 35000,
    previousYearValue: 30500,
    currentValue: 28500,
    forecastYear1Value: 25200,
    forecastYear2Value: 23000,
    shopUrl: '#',
    tradeInUrl: '#'
  }
}`,...r.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    vehicleYear: 2023,
    make: 'BMW',
    model: 'X5',
    trim: 'xDrive40i',
    asNewValue: 72000,
    previousYearValue: 62000,
    currentValue: 58000,
    forecastYear1Value: 52000,
    forecastYear2Value: 47000,
    expertTip: 'Luxury SUVs typically depreciate faster than mainstream models. Consider trading in before the 3-year mark for best value retention.',
    shopUrl: '#',
    tradeInUrl: '#'
  }
}`,...a.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    vehicleYear: 2022,
    make: 'Ford',
    model: 'F-150',
    trim: 'Lariat',
    asNewValue: 55000,
    previousYearValue: 48000,
    currentValue: 45000,
    forecastYear1Value: 41000,
    forecastYear2Value: 38500,
    expertTip: 'Full-size trucks hold their value well. The F-150 Lariat is in high demand in your area.',
    shopUrl: '#',
    tradeInUrl: '#'
  }
}`,...t.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    vehicleYear: 2023,
    make: 'Maserati',
    model: 'Ghibli',
    trim: 'GT',
    asNewValue: 95000,
    previousYearValue: 80000,
    currentValue: 72000,
    forecastYear1Value: 58000,
    forecastYear2Value: 48000,
    expertTip: 'This vehicle is experiencing above-average depreciation. Consider selling sooner rather than later to maximize resale value.',
    shopUrl: '#',
    tradeInUrl: '#'
  }
}`,...o.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    vehicleYear: 2023,
    make: 'Toyota',
    model: '4Runner',
    trim: 'TRD Pro',
    asNewValue: 58000,
    previousYearValue: 55500,
    currentValue: 54000,
    forecastYear1Value: 52500,
    forecastYear2Value: 51000,
    expertTip: 'The 4Runner TRD Pro holds its value exceptionally well. This is one of the best vehicles for long-term ownership.',
    shopUrl: '#',
    tradeInUrl: '#'
  }
}`,...n.parameters?.docs?.source}}};const v=["Default","WithoutExpertTip","LuxuryVehicle","Truck","HighDepreciation","StableValue"];export{e as Default,o as HighDepreciation,a as LuxuryVehicle,n as StableValue,t as Truck,r as WithoutExpertTip,v as __namedExportsOrder,V as default};
