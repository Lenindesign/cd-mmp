import{j as h,r as k}from"./iframe-P1HNGATh.js";import{M as T,a}from"./MarketIntelligenceSnapshot-DUPpSsba.js";import{g as F}from"./vehicleService-DW3q9yFh.js";import"./preload-helper-PPVm8Dsz.js";import"./Badge-BUrNn-eD.js";import"./OptimizedImage-CPo1Uk_6.js";import"./dealerService-BAwqWLO8.js";import"./index-D17UvTI1.js";const o=e=>{const n=F(e);if(!n)throw new Error(`Missing Storybook vehicle fixture: ${e}`);return n},u=o("2026/Chevrolet/Trax"),g=o("2025/Chevrolet/Trax"),v=o("2024/Kia/Forte"),w=o("2020/Ford/Ranger"),S=o("2026/Lotus/Evija"),C={title:"Marketplace/MarketIntelligenceSnapshot",component:T,parameters:{layout:"padded",docs:{description:{component:"Review surface for the Local Signals module on vehicle pages. Use these stories to compare best-value sorting, price-band labels, dot tooltips, local listings, and responsive behavior."}}},tags:["autodocs"],decorators:[e=>h.jsx("div",{style:{maxWidth:960,margin:"0 auto"},children:h.jsx(e,{})})]},R=({vehicle:e,initialLocation:n=a[0],initialRadiusMiles:b=25})=>{const[x,y]=k.useState(n),[f,O]=k.useState(b);return h.jsx(T,{vehicle:e,location:x,radiusMiles:f,onLocationChange:y,onRadiusChange:O,onSeeLocalInventory:()=>{}})},r=(e,n,b)=>h.jsx(R,{vehicle:e,initialLocation:n,initialRadiusMiles:b}),s={name:"Feedback review, Kia Forte",args:{vehicle:v},render:()=>r(v,a[0],25),parameters:{docs:{description:{story:"Primary feedback story for the current Local Signals audit. It exercises used inventory, best-value sorting, price-band dots, hoverable listing cards, and the local comparable list."}}}},t={name:"Mobile review, Kia Forte",args:{vehicle:v},render:()=>r(v,a[0],25),parameters:{viewport:{defaultViewport:"mobile"},docs:{description:{story:"Mobile review of the same Kia Forte market so spacing, dot hit targets, price-band labels, and stacked local rows can be checked quickly."}}}},i={name:"Used Trax, best value",args:{vehicle:g},render:()=>r(g,a[0],25),parameters:{docs:{description:{story:"Used SUV scenario with strong price separation between local matches. Good for reviewing interior price ticks and best-value explanation copy."}}}},c={name:"New Trax, price band",args:{vehicle:u},render:()=>r(u,a[0],25),parameters:{docs:{description:{story:"New-vehicle scenario for checking MSRP columns, below-market language, and current asking marker behavior."}}}},d={name:"Ford Ranger, above market",args:{vehicle:w},render:()=>r(w,a[0],25),parameters:{docs:{description:{story:"Used truck scenario that helps verify when a best-value candidate can still sit near or above the fair-market band."}}}},l={name:"Lotus Evija, high price",args:{vehicle:S},render:()=>r(S,a[1],75),parameters:{docs:{description:{story:"High-price exotic scenario for checking long prices, badge treatment, and price-band label containment."}}}},p={args:{vehicle:u},render:()=>r(u)},m={args:{vehicle:g},render:()=>r(g)};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  name: 'Feedback review, Kia Forte',
  args: {
    vehicle: kiaForte
  },
  render: () => renderSnapshot(kiaForte, MARKET_LOCATION_OPTIONS[0], 25),
  parameters: {
    docs: {
      description: {
        story: 'Primary feedback story for the current Local Signals audit. It exercises used inventory, best-value sorting, price-band dots, hoverable listing cards, and the local comparable list.'
      }
    }
  }
}`,...s.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  name: 'Mobile review, Kia Forte',
  args: {
    vehicle: kiaForte
  },
  render: () => renderSnapshot(kiaForte, MARKET_LOCATION_OPTIONS[0], 25),
  parameters: {
    viewport: {
      defaultViewport: 'mobile'
    },
    docs: {
      description: {
        story: 'Mobile review of the same Kia Forte market so spacing, dot hit targets, price-band labels, and stacked local rows can be checked quickly.'
      }
    }
  }
}`,...t.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  name: 'Used Trax, best value',
  args: {
    vehicle: usedTrax
  },
  render: () => renderSnapshot(usedTrax, MARKET_LOCATION_OPTIONS[0], 25),
  parameters: {
    docs: {
      description: {
        story: 'Used SUV scenario with strong price separation between local matches. Good for reviewing interior price ticks and best-value explanation copy.'
      }
    }
  }
}`,...i.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  name: 'New Trax, price band',
  args: {
    vehicle: newTrax
  },
  render: () => renderSnapshot(newTrax, MARKET_LOCATION_OPTIONS[0], 25),
  parameters: {
    docs: {
      description: {
        story: 'New-vehicle scenario for checking MSRP columns, below-market language, and current asking marker behavior.'
      }
    }
  }
}`,...c.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  name: 'Ford Ranger, above market',
  args: {
    vehicle: fordRanger
  },
  render: () => renderSnapshot(fordRanger, MARKET_LOCATION_OPTIONS[0], 25),
  parameters: {
    docs: {
      description: {
        story: 'Used truck scenario that helps verify when a best-value candidate can still sit near or above the fair-market band.'
      }
    }
  }
}`,...d.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  name: 'Lotus Evija, high price',
  args: {
    vehicle: lotusEvija
  },
  render: () => renderSnapshot(lotusEvija, MARKET_LOCATION_OPTIONS[1], 75),
  parameters: {
    docs: {
      description: {
        story: 'High-price exotic scenario for checking long prices, badge treatment, and price-band label containment.'
      }
    }
  }
}`,...l.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    vehicle: newTrax
  },
  render: () => renderSnapshot(newTrax)
}`,...p.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    vehicle: usedTrax
  },
  render: () => renderSnapshot(usedTrax)
}`,...m.parameters?.docs?.source}}};const P=["KiaForteFeedbackReview","KiaForteMobileReview","ChevroletTraxUsedValue","ChevroletTraxNewPriceBand","FordRangerAboveMarketValue","LotusEvijaHighPrice","NewVehicle","UsedVehicle"];export{c as ChevroletTraxNewPriceBand,i as ChevroletTraxUsedValue,d as FordRangerAboveMarketValue,s as KiaForteFeedbackReview,t as KiaForteMobileReview,l as LotusEvijaHighPrice,p as NewVehicle,m as UsedVehicle,P as __namedExportsOrder,C as default};
