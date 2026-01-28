import{B as p}from"./BigStoryCard-BP2FyP4r.js";import{v as s}from"./index-Dto8T7jp.js";import"./iframe-uGVaIJRM.js";import"./preload-helper-PPVm8Dsz.js";const a=s.find(e=>e.make==="Honda"&&e.model==="Accord"),r=s.find(e=>e.make==="BMW"&&e.model==="3 Series"),o=s.find(e=>e.make==="Ford"&&e.model==="Mustang"),t=s.find(e=>e.make==="Porsche"&&e.model==="911"),i=s.find(e=>e.make==="Tesla"&&e.model==="Model 3"),n=s.find(e=>e.make==="Toyota"&&e.model==="Corolla"),S={title:"Resin Components/BigStoryCard",component:p,parameters:{layout:"padded",docs:{description:{component:`
## Big Story Card

A hero-style article card component inspired by Hearst's Resin design system.
Used for featuring prominent automotive content with large images.

### Features
- Large image with configurable position (left/right)
- Sponsor attribution
- Category labels
- Author and date metadata
- Hover effects on image and headline

### Usage
\`\`\`tsx
import { vehicleDatabase } from '../../data/vehicles';

const vehicle = vehicleDatabase.find(v => v.make === 'Honda' && v.model === 'Accord');

<BigStoryCard
  imageUrl={vehicle?.image || ''}
  imageAlt="2025 Honda Accord"
  headline="2025 Honda Accord Review: The Benchmark Gets Even Better"
  sponsor="Car and Driver"
  label="First Drive"
  author="Dan Edmunds"
  date="Dec 22, 2024"
  href="/reviews/honda-accord"
/>
\`\`\`
        `}}},tags:["autodocs"],argTypes:{imagePosition:{control:"radio",options:["left","right"],description:"Position of the image relative to content"}}},m={args:{imageUrl:a?.image||"",imageAlt:`${a?.year} ${a?.make} ${a?.model}`,headline:`${a?.year} ${a?.make} ${a?.model} Review: The Benchmark Sedan Gets Even Better`,sponsor:"Car and Driver",label:"First Drive",author:"Dan Edmunds",date:"Dec 22, 2024",imagePosition:"right"}},d={args:{imageUrl:r?.image||"",imageAlt:`${r?.year} ${r?.make} ${r?.model}`,headline:`${r?.year} ${r?.make} ${r?.model}: Still the Ultimate Driving Machine`,sponsor:"Car and Driver",label:"Comparison Test",author:"K.C. Colwell",date:"Dec 20, 2024",imagePosition:"left"}},l={args:{imageUrl:o?.image||"",imageAlt:`${o?.year} ${o?.make} ${o?.model}`,headline:`The ${o?.year} ${o?.make} ${o?.model} Dark Horse Is America's Sports Car at Its Best`,label:"Road Test",author:"Eric Stafford",date:"Dec 18, 2024",imagePosition:"right"}},c={args:{imageUrl:t?.image||"",imageAlt:`${t?.year} ${t?.make} ${t?.model}`,headline:`${t?.year} ${t?.make} ${t?.model} Carrera GTS: The Sweet Spot of the 911 Lineup`,imagePosition:"right"}},g={args:{imageUrl:i?.image||"",imageAlt:`${i?.year} ${i?.make} ${i?.model}`,headline:`${i?.year} ${i?.make} ${i?.model} Highland: The Best-Selling EV Gets a Major Refresh`,sponsor:"Car and Driver",label:"EV Review",author:"Roberto Baldwin",date:"Dec 15, 2024",imagePosition:"left"}},h={args:{imageUrl:n?.image||"",imageAlt:`${n?.year} ${n?.make} ${n?.model}`,headline:`The ${n?.year} ${n?.make} ${n?.model} Hybrid Proves That Efficiency and Excitement Can Coexist in Today's Sedan Market`,sponsor:"Car and Driver",label:"Long-Term Test",author:"Austin Irwin",date:"Dec 10, 2024",imagePosition:"right"}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    imageUrl: hondaAccord?.image || '',
    imageAlt: \`\${hondaAccord?.year} \${hondaAccord?.make} \${hondaAccord?.model}\`,
    headline: \`\${hondaAccord?.year} \${hondaAccord?.make} \${hondaAccord?.model} Review: The Benchmark Sedan Gets Even Better\`,
    sponsor: 'Car and Driver',
    label: 'First Drive',
    author: 'Dan Edmunds',
    date: 'Dec 22, 2024',
    imagePosition: 'right'
  }
}`,...m.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    imageUrl: bmw3Series?.image || '',
    imageAlt: \`\${bmw3Series?.year} \${bmw3Series?.make} \${bmw3Series?.model}\`,
    headline: \`\${bmw3Series?.year} \${bmw3Series?.make} \${bmw3Series?.model}: Still the Ultimate Driving Machine\`,
    sponsor: 'Car and Driver',
    label: 'Comparison Test',
    author: 'K.C. Colwell',
    date: 'Dec 20, 2024',
    imagePosition: 'left'
  }
}`,...d.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:"{\n  args: {\n    imageUrl: fordMustang?.image || '',\n    imageAlt: `${fordMustang?.year} ${fordMustang?.make} ${fordMustang?.model}`,\n    headline: `The ${fordMustang?.year} ${fordMustang?.make} ${fordMustang?.model} Dark Horse Is America's Sports Car at Its Best`,\n    label: 'Road Test',\n    author: 'Eric Stafford',\n    date: 'Dec 18, 2024',\n    imagePosition: 'right'\n  }\n}",...l.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:"{\n  args: {\n    imageUrl: porsche911?.image || '',\n    imageAlt: `${porsche911?.year} ${porsche911?.make} ${porsche911?.model}`,\n    headline: `${porsche911?.year} ${porsche911?.make} ${porsche911?.model} Carrera GTS: The Sweet Spot of the 911 Lineup`,\n    imagePosition: 'right'\n  }\n}",...c.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    imageUrl: teslaModel3?.image || '',
    imageAlt: \`\${teslaModel3?.year} \${teslaModel3?.make} \${teslaModel3?.model}\`,
    headline: \`\${teslaModel3?.year} \${teslaModel3?.make} \${teslaModel3?.model} Highland: The Best-Selling EV Gets a Major Refresh\`,
    sponsor: 'Car and Driver',
    label: 'EV Review',
    author: 'Roberto Baldwin',
    date: 'Dec 15, 2024',
    imagePosition: 'left'
  }
}`,...g.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    imageUrl: toyotaCorolla?.image || '',
    imageAlt: \`\${toyotaCorolla?.year} \${toyotaCorolla?.make} \${toyotaCorolla?.model}\`,
    headline: \`The \${toyotaCorolla?.year} \${toyotaCorolla?.make} \${toyotaCorolla?.model} Hybrid Proves That Efficiency and Excitement Can Coexist in Today's Sedan Market\`,
    sponsor: 'Car and Driver',
    label: 'Long-Term Test',
    author: 'Austin Irwin',
    date: 'Dec 10, 2024',
    imagePosition: 'right'
  }
}`,...h.parameters?.docs?.source}}};const k=["Default","ImageLeft","WithoutSponsor","MinimalInfo","EVFeature","LongHeadline"];export{m as Default,g as EVFeature,d as ImageLeft,h as LongHeadline,c as MinimalInfo,l as WithoutSponsor,k as __namedExportsOrder,S as default};
