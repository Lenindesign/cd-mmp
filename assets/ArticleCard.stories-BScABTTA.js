import{j as a}from"./iframe-CCFupnSY.js";import{v as g,a as $,s as A,t as T,c as U}from"./index-CR0fvk7o.js";import"./preload-helper-PPVm8Dsz.js";const o=({imageUrl:e,imageAlt:u,headline:y,sponsor:h,href:f="#",variant:C="horizontal",aspectRatio:x="portrait",onClick:v})=>{const k=R=>{v&&(R.preventDefault(),v())};return a.jsx("article",{className:`article-card article-card--${C}`,children:a.jsxs("a",{href:f,className:"article-card__link",onClick:k,children:[a.jsx("div",{className:`article-card__image-container article-card__image-container--${x}`,children:a.jsx("img",{src:e,alt:u,className:"article-card__image",loading:"lazy"})}),a.jsxs("div",{className:"article-card__content",children:[h&&a.jsx("span",{className:"article-card__sponsor",children:h}),a.jsx("h3",{className:"article-card__headline",children:y})]})]})})};o.__docgenInfo={description:"",methods:[],displayName:"ArticleCard",props:{imageUrl:{required:!0,tsType:{name:"string"},description:"Image URL for the article"},imageAlt:{required:!0,tsType:{name:"string"},description:"Alt text for the image"},headline:{required:!0,tsType:{name:"string"},description:"Article headline"},sponsor:{required:!1,tsType:{name:"string"},description:"Optional sponsor/brand name"},href:{required:!1,tsType:{name:"string"},description:"Link URL",defaultValue:{value:"'#'",computed:!1}},variant:{required:!1,tsType:{name:"union",raw:"'horizontal' | 'vertical' | 'compact'",elements:[{name:"literal",value:"'horizontal'"},{name:"literal",value:"'vertical'"},{name:"literal",value:"'compact'"}]},description:"Card layout variant",defaultValue:{value:"'horizontal'",computed:!1}},aspectRatio:{required:!1,tsType:{name:"union",raw:"'square' | 'portrait' | 'landscape'",elements:[{name:"literal",value:"'square'"},{name:"literal",value:"'portrait'"},{name:"literal",value:"'landscape'"}]},description:"Image aspect ratio",defaultValue:{value:"'portrait'",computed:!1}},onClick:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"Optional click handler"}}};const r=g.find(e=>e.make==="Honda"&&e.model==="Civic"),i=g.find(e=>e.make==="Toyota"&&e.model==="Highlander"),t=g.find(e=>e.make==="Ford"&&e.model==="F-150"),S={title:"Resin Components/ArticleCard",component:o,parameters:{layout:"padded",docs:{description:{component:`
## Article Card

A versatile article card component inspired by Hearst's Resin design system.
Used in grid layouts for displaying automotive article previews.

### Features
- Multiple layout variants (horizontal, vertical, compact)
- Configurable image aspect ratios
- Optional sponsor attribution
- Hover effects on image and headline
- Line clamping for long headlines

### Usage
\`\`\`tsx
import { vehicleDatabase } from '../../data/vehicles';

const vehicle = vehicleDatabase.find(v => v.make === 'Honda' && v.model === 'Civic');

<ArticleCard
  imageUrl={vehicle?.image || ''}
  imageAlt="2025 Honda Civic"
  headline="2025 Honda Civic: Still the Compact Car to Beat"
  sponsor="Car and Driver"
  href="/reviews/honda-civic"
/>
\`\`\`
        `}}},tags:["autodocs"],argTypes:{variant:{control:"radio",options:["horizontal","vertical","compact"],description:"Card layout variant"},aspectRatio:{control:"radio",options:["square","portrait","landscape"],description:"Image aspect ratio"}}},n={args:{imageUrl:r?.image||"",imageAlt:`${r?.year} ${r?.make} ${r?.model}`,headline:`${r?.year} ${r?.make} ${r?.model}: Still the Compact Car to Beat`,sponsor:"Car and Driver",variant:"horizontal",aspectRatio:"portrait"}},l={args:{imageUrl:i?.image||"",imageAlt:`${i?.year} ${i?.make} ${i?.model}`,headline:`${i?.year} ${i?.make} ${i?.model}: The Family SUV King`,sponsor:"Car and Driver",variant:"vertical",aspectRatio:"landscape"}},s={args:{imageUrl:t?.image||"",imageAlt:`${t?.year} ${t?.make} ${t?.model}`,headline:`${t?.year} ${t?.make} ${t?.model} Lightning: Electric Truck Showdown`,variant:"compact",aspectRatio:"square"}},d={render:()=>a.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(3, 1fr)",gap:"24px",maxWidth:"1200px"},children:$.slice(0,6).map(e=>a.jsx(o,{imageUrl:e.image,imageAlt:`${e.year} ${e.make} ${e.model}`,headline:`${e.year} ${e.make} ${e.model} Review: ${e.staffRating>=9?"A Class Leader":e.staffRating>=8?"Highly Recommended":"Worth Considering"}`,sponsor:"Car and Driver",variant:"horizontal",aspectRatio:"portrait"},e.id))})},c={render:()=>a.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(4, 1fr)",gap:"24px",maxWidth:"1200px"},children:A.slice(0,8).map(e=>a.jsx(o,{imageUrl:e.image,imageAlt:`${e.year} ${e.make} ${e.model}`,headline:`${e.year} ${e.make} ${e.model}: ${e.fuelType==="Electric"?"EV":e.fuelType==="Hybrid"?"Hybrid":""} ${e.bodyStyle} ${e.editorsChoice?"Editor's Choice":"Review"}`,variant:"vertical",aspectRatio:"landscape"},e.id))})},m={render:()=>a.jsx("div",{style:{display:"flex",flexDirection:"column",gap:"16px",maxWidth:"300px"},children:T.slice(0,5).map(e=>a.jsx(o,{imageUrl:e.image,imageAlt:`${e.year} ${e.make} ${e.model}`,headline:`${e.year} ${e.make} ${e.model}: ${e.horsepower?`${e.horsepower} HP`:"Full Review"}`,variant:"compact",aspectRatio:"square"},e.id))})},p={render:()=>a.jsxs("div",{style:{display:"grid",gridTemplateColumns:"2fr 1fr",gap:"24px",maxWidth:"1000px"},children:[a.jsx("div",{style:{display:"flex",flexDirection:"column",gap:"16px"},children:U.slice(0,3).map(e=>a.jsx(o,{imageUrl:e.image,imageAlt:`${e.year} ${e.make} ${e.model}`,headline:`${e.year} ${e.make} ${e.model}: ${e.tenBest?"10Best Winner":e.editorsChoice?"Editor's Choice":"Sports Car Excellence"}`,sponsor:"Car and Driver",variant:"horizontal",aspectRatio:"portrait"},e.id))}),a.jsx("div",{style:{display:"flex",flexDirection:"column",gap:"12px"},children:$.slice(6,11).map(e=>a.jsx(o,{imageUrl:e.image,imageAlt:`${e.year} ${e.make} ${e.model}`,headline:`${e.year} ${e.make} ${e.model}`,variant:"compact",aspectRatio:"square"},e.id))})]})};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:"{\n  args: {\n    imageUrl: hondaCivic?.image || '',\n    imageAlt: `${hondaCivic?.year} ${hondaCivic?.make} ${hondaCivic?.model}`,\n    headline: `${hondaCivic?.year} ${hondaCivic?.make} ${hondaCivic?.model}: Still the Compact Car to Beat`,\n    sponsor: 'Car and Driver',\n    variant: 'horizontal',\n    aspectRatio: 'portrait'\n  }\n}",...n.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:"{\n  args: {\n    imageUrl: toyotaHighlander?.image || '',\n    imageAlt: `${toyotaHighlander?.year} ${toyotaHighlander?.make} ${toyotaHighlander?.model}`,\n    headline: `${toyotaHighlander?.year} ${toyotaHighlander?.make} ${toyotaHighlander?.model}: The Family SUV King`,\n    sponsor: 'Car and Driver',\n    variant: 'vertical',\n    aspectRatio: 'landscape'\n  }\n}",...l.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:"{\n  args: {\n    imageUrl: fordF150?.image || '',\n    imageAlt: `${fordF150?.year} ${fordF150?.make} ${fordF150?.model}`,\n    headline: `${fordF150?.year} ${fordF150?.make} ${fordF150?.model} Lightning: Electric Truck Showdown`,\n    variant: 'compact',\n    aspectRatio: 'square'\n  }\n}",...s.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '24px',
    maxWidth: '1200px'
  }}>
      {sedans.slice(0, 6).map(vehicle => <ArticleCard key={vehicle.id} imageUrl={vehicle.image} imageAlt={\`\${vehicle.year} \${vehicle.make} \${vehicle.model}\`} headline={\`\${vehicle.year} \${vehicle.make} \${vehicle.model} Review: \${vehicle.staffRating >= 9 ? 'A Class Leader' : vehicle.staffRating >= 8 ? 'Highly Recommended' : 'Worth Considering'}\`} sponsor="Car and Driver" variant="horizontal" aspectRatio="portrait" />)}
    </div>
}`,...d.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '24px',
    maxWidth: '1200px'
  }}>
      {suvs.slice(0, 8).map(vehicle => <ArticleCard key={vehicle.id} imageUrl={vehicle.image} imageAlt={\`\${vehicle.year} \${vehicle.make} \${vehicle.model}\`} headline={\`\${vehicle.year} \${vehicle.make} \${vehicle.model}: \${vehicle.fuelType === 'Electric' ? 'EV' : vehicle.fuelType === 'Hybrid' ? 'Hybrid' : ''} \${vehicle.bodyStyle} \${vehicle.editorsChoice ? "Editor's Choice" : 'Review'}\`} variant="vertical" aspectRatio="landscape" />)}
    </div>
}`,...c.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:"{\n  render: () => <div style={{\n    display: 'flex',\n    flexDirection: 'column',\n    gap: '16px',\n    maxWidth: '300px'\n  }}>\n      {trucks.slice(0, 5).map(vehicle => <ArticleCard key={vehicle.id} imageUrl={vehicle.image} imageAlt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`} headline={`${vehicle.year} ${vehicle.make} ${vehicle.model}: ${vehicle.horsepower ? `${vehicle.horsepower} HP` : 'Full Review'}`} variant=\"compact\" aspectRatio=\"square\" />)}\n    </div>\n}",...m.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    gap: '24px',
    maxWidth: '1000px'
  }}>
      <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '16px'
    }}>
        {coupes.slice(0, 3).map(vehicle => <ArticleCard key={vehicle.id} imageUrl={vehicle.image} imageAlt={\`\${vehicle.year} \${vehicle.make} \${vehicle.model}\`} headline={\`\${vehicle.year} \${vehicle.make} \${vehicle.model}: \${vehicle.tenBest ? '10Best Winner' : vehicle.editorsChoice ? "Editor's Choice" : 'Sports Car Excellence'}\`} sponsor="Car and Driver" variant="horizontal" aspectRatio="portrait" />)}
      </div>
      <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '12px'
    }}>
        {sedans.slice(6, 11).map(vehicle => <ArticleCard key={vehicle.id} imageUrl={vehicle.image} imageAlt={\`\${vehicle.year} \${vehicle.make} \${vehicle.model}\`} headline={\`\${vehicle.year} \${vehicle.make} \${vehicle.model}\`} variant="compact" aspectRatio="square" />)}
      </div>
    </div>
}`,...p.parameters?.docs?.source}}};const w=["Default","Vertical","Compact","ThreeColumnGrid","VerticalGrid","CompactSidebar","MixedContent"];export{s as Compact,m as CompactSidebar,n as Default,p as MixedContent,d as ThreeColumnGrid,l as Vertical,c as VerticalGrid,w as __namedExportsOrder,S as default};
