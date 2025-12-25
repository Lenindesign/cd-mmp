import{j as a}from"./iframe-BDwDJx5t.js";import{v as l}from"./index-CR0fvk7o.js";import"./preload-helper-PPVm8Dsz.js";const k=({imageUrl:e,imageAlt:v,sponsor:u,label:y,headline:C,author:$,date:f,href:S="#",imagePosition:T="right",onClick:b})=>{const D=A=>{b&&(A.preventDefault(),b())};return a.jsx("article",{className:`big-story-card big-story-card--image-${T}`,children:a.jsxs("a",{href:S,className:"big-story-card__link",onClick:D,children:[a.jsx("div",{className:"big-story-card__image-container",children:a.jsx("img",{src:e,alt:v,className:"big-story-card__image",loading:"lazy"})}),a.jsxs("div",{className:"big-story-card__content",children:[u&&a.jsx("span",{className:"big-story-card__sponsor",children:u}),y&&a.jsx("span",{className:"big-story-card__label",children:y}),a.jsx("h3",{className:"big-story-card__headline",children:C}),a.jsxs("div",{className:"big-story-card__meta",children:[$&&a.jsxs("span",{className:"big-story-card__author",children:["By ",a.jsx("span",{className:"big-story-card__author-name",children:$})]}),f&&a.jsx("time",{className:"big-story-card__date",children:f})]})]})]})})};k.__docgenInfo={description:"",methods:[],displayName:"BigStoryCard",props:{imageUrl:{required:!0,tsType:{name:"string"},description:"Image URL for the article"},imageAlt:{required:!0,tsType:{name:"string"},description:"Alt text for the image"},sponsor:{required:!1,tsType:{name:"string"},description:"Optional sponsor/brand name"},label:{required:!1,tsType:{name:"string"},description:"Optional category label"},headline:{required:!0,tsType:{name:"string"},description:"Article headline"},author:{required:!1,tsType:{name:"string"},description:"Author name"},date:{required:!1,tsType:{name:"string"},description:"Publication date"},href:{required:!1,tsType:{name:"string"},description:"Link URL",defaultValue:{value:"'#'",computed:!1}},imagePosition:{required:!1,tsType:{name:"union",raw:"'right' | 'left'",elements:[{name:"literal",value:"'right'"},{name:"literal",value:"'left'"}]},description:"Image position - right or left",defaultValue:{value:"'right'",computed:!1}},onClick:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"Optional click handler"}}};const r=l.find(e=>e.make==="Honda"&&e.model==="Accord"),o=l.find(e=>e.make==="BMW"&&e.model==="3 Series"),t=l.find(e=>e.make==="Ford"&&e.model==="Mustang"),i=l.find(e=>e.make==="Porsche"&&e.model==="911"),s=l.find(e=>e.make==="Tesla"&&e.model==="Model 3"),n=l.find(e=>e.make==="Toyota"&&e.model==="Corolla"),x={title:"Resin Components/BigStoryCard",component:k,parameters:{layout:"padded",docs:{description:{component:`
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
        `}}},tags:["autodocs"],argTypes:{imagePosition:{control:"radio",options:["left","right"],description:"Position of the image relative to content"}}},d={args:{imageUrl:r?.image||"",imageAlt:`${r?.year} ${r?.make} ${r?.model}`,headline:`${r?.year} ${r?.make} ${r?.model} Review: The Benchmark Sedan Gets Even Better`,sponsor:"Car and Driver",label:"First Drive",author:"Dan Edmunds",date:"Dec 22, 2024",imagePosition:"right"}},m={args:{imageUrl:o?.image||"",imageAlt:`${o?.year} ${o?.make} ${o?.model}`,headline:`${o?.year} ${o?.make} ${o?.model}: Still the Ultimate Driving Machine`,sponsor:"Car and Driver",label:"Comparison Test",author:"K.C. Colwell",date:"Dec 20, 2024",imagePosition:"left"}},c={args:{imageUrl:t?.image||"",imageAlt:`${t?.year} ${t?.make} ${t?.model}`,headline:`The ${t?.year} ${t?.make} ${t?.model} Dark Horse Is America's Sports Car at Its Best`,label:"Road Test",author:"Eric Stafford",date:"Dec 18, 2024",imagePosition:"right"}},g={args:{imageUrl:i?.image||"",imageAlt:`${i?.year} ${i?.make} ${i?.model}`,headline:`${i?.year} ${i?.make} ${i?.model} Carrera GTS: The Sweet Spot of the 911 Lineup`,imagePosition:"right"}},h={args:{imageUrl:s?.image||"",imageAlt:`${s?.year} ${s?.make} ${s?.model}`,headline:`${s?.year} ${s?.make} ${s?.model} Highland: The Best-Selling EV Gets a Major Refresh`,sponsor:"Car and Driver",label:"EV Review",author:"Roberto Baldwin",date:"Dec 15, 2024",imagePosition:"left"}},p={args:{imageUrl:n?.image||"",imageAlt:`${n?.year} ${n?.make} ${n?.model}`,headline:`The ${n?.year} ${n?.make} ${n?.model} Hybrid Proves That Efficiency and Excitement Can Coexist in Today's Sedan Market`,sponsor:"Car and Driver",label:"Long-Term Test",author:"Austin Irwin",date:"Dec 10, 2024",imagePosition:"right"}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
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
}`,...d.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
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
}`,...m.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:"{\n  args: {\n    imageUrl: fordMustang?.image || '',\n    imageAlt: `${fordMustang?.year} ${fordMustang?.make} ${fordMustang?.model}`,\n    headline: `The ${fordMustang?.year} ${fordMustang?.make} ${fordMustang?.model} Dark Horse Is America's Sports Car at Its Best`,\n    label: 'Road Test',\n    author: 'Eric Stafford',\n    date: 'Dec 18, 2024',\n    imagePosition: 'right'\n  }\n}",...c.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:"{\n  args: {\n    imageUrl: porsche911?.image || '',\n    imageAlt: `${porsche911?.year} ${porsche911?.make} ${porsche911?.model}`,\n    headline: `${porsche911?.year} ${porsche911?.make} ${porsche911?.model} Carrera GTS: The Sweet Spot of the 911 Lineup`,\n    imagePosition: 'right'\n  }\n}",...g.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
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
}`,...h.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
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
}`,...p.parameters?.docs?.source}}};const E=["Default","ImageLeft","WithoutSponsor","MinimalInfo","EVFeature","LongHeadline"];export{d as Default,h as EVFeature,m as ImageLeft,p as LongHeadline,g as MinimalInfo,c as WithoutSponsor,E as __namedExportsOrder,x as default};
