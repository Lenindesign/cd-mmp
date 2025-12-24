import{T as a}from"./TrimSelector-CaqNko7g.js";import"./iframe-BjFtNjKF.js";import"./preload-helper-PPVm8Dsz.js";import"./chevron-left-bIrtWmZm.js";import"./createLucideIcon-DfJbe4c6.js";import"./check-BJyenuer.js";import"./chevron-right-Do8qR6Qb.js";import"./info-BcruEbVK.js";const f={title:"Organisms/TrimSelector",component:a,parameters:{layout:"padded",docs:{description:{component:"Allows users to select and compare different trim levels."}}},tags:["autodocs"]},o=[{id:"le",name:"LE",price:"$28,500",features:['8" Touchscreen',"Apple CarPlay","Safety Sense 3.0"],recommended:!1},{id:"se",name:"SE",price:"$31,200",features:["Sportier Styling","Paddle Shifters",'18" Alloy Wheels'],recommended:!0},{id:"xle",name:"XLE",price:"$34,500",features:["Leather Seats","Sunroof","JBL Audio"],recommended:!1},{id:"xse",name:"XSE",price:"$36,800",features:["Sport Suspension","Black Accents","Larger Display"],recommended:!1}],e={args:{trims:o}},r={args:{trims:o,title:"Choose Your Trim",subtitle:"Select the perfect configuration for your needs"}},s={args:{trims:o.slice(0,2)}},t={args:{trims:o.slice(0,3)}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    trims: sampleTrims
  }
}`,...e.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    trims: sampleTrims,
    title: 'Choose Your Trim',
    subtitle: 'Select the perfect configuration for your needs'
  }
}`,...r.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    trims: sampleTrims.slice(0, 2)
  }
}`,...s.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    trims: sampleTrims.slice(0, 3)
  }
}`,...t.parameters?.docs?.source}}};const S=["Default","WithSubtitle","TwoTrims","ThreeTrims"];export{e as Default,t as ThreeTrims,s as TwoTrims,r as WithSubtitle,S as __namedExportsOrder,f as default};
