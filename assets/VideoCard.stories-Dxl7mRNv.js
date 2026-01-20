import{j as a}from"./iframe-Nxp4yMSg.js";import{v as u,c as U,a as N,t as R,s as P}from"./index-Dto8T7jp.js";import"./preload-helper-PPVm8Dsz.js";const m=({thumbnailUrl:e,thumbnailAlt:r,title:t,duration:c,overlayText:M,sponsor:w,label:A,author:C,date:S,href:V="#",variant:j="large",onClick:_})=>{const D=W=>{_&&(W.preventDefault(),_())};return a.jsx("article",{className:`video-card video-card--${j}`,children:a.jsxs("a",{href:V,className:"video-card__link",onClick:D,children:[a.jsxs("div",{className:"video-card__thumbnail-container",children:[a.jsx("img",{src:e,alt:r,className:"video-card__thumbnail",loading:"lazy"}),a.jsx("div",{className:"video-card__play-overlay",children:a.jsx("div",{className:"video-card__play-button",children:a.jsx("svg",{className:"video-card__play-icon",viewBox:"0 0 24 24",fill:"currentColor","aria-hidden":"true",children:a.jsx("path",{d:"M8 5v14l11-7z"})})})}),c&&a.jsx("span",{className:"video-card__duration",children:c}),M&&a.jsx("div",{className:"video-card__overlay-text",children:M})]}),a.jsxs("div",{className:"video-card__content",children:[w&&a.jsx("span",{className:"video-card__sponsor",children:w}),A&&a.jsx("span",{className:"video-card__label",children:A}),a.jsx("h3",{className:"video-card__title",children:t}),(C||S)&&a.jsxs("div",{className:"video-card__meta",children:[C&&a.jsxs("span",{className:"video-card__author",children:["By ",a.jsx("span",{className:"video-card__author-name",children:C})]}),S&&a.jsx("time",{className:"video-card__date",children:S})]})]})]})})};m.__docgenInfo={description:"",methods:[],displayName:"VideoCard",props:{thumbnailUrl:{required:!0,tsType:{name:"string"},description:"Video thumbnail image URL"},thumbnailAlt:{required:!0,tsType:{name:"string"},description:"Alt text for the thumbnail"},title:{required:!0,tsType:{name:"string"},description:"Video title/headline"},duration:{required:!1,tsType:{name:"string"},description:'Video duration (e.g., "3:45")'},overlayText:{required:!1,tsType:{name:"string"},description:"Optional overlay text on the thumbnail"},sponsor:{required:!1,tsType:{name:"string"},description:"Optional sponsor/brand name"},label:{required:!1,tsType:{name:"string"},description:"Category or type label"},author:{required:!1,tsType:{name:"string"},description:"Author name"},date:{required:!1,tsType:{name:"string"},description:"Publication date"},href:{required:!1,tsType:{name:"string"},description:"Link URL or video URL",defaultValue:{value:"'#'",computed:!1}},variant:{required:!1,tsType:{name:"union",raw:"'large' | 'medium' | 'small'",elements:[{name:"literal",value:"'large'"},{name:"literal",value:"'medium'"},{name:"literal",value:"'small'"}]},description:"Card size variant",defaultValue:{value:"'large'",computed:!1}},onClick:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"Optional click handler"}}};const i=u.find(e=>e.make==="Porsche"&&e.model==="911"),l=u.find(e=>e.make==="Chevrolet"&&e.model==="Corvette"),n=u.find(e=>e.make==="BMW"&&e.model==="M4"),s=u.find(e=>e.make==="Ford"&&e.model==="Mustang"),o=u.find(e=>e.make==="Tesla"&&e.model==="Model S"),d=u.find(e=>e.make==="Lamborghini"),F={title:"Resin Components/VideoCard",component:m,parameters:{layout:"padded",docs:{description:{component:`
## Video Card

A video card component inspired by Hearst's Resin design system.
Used for featuring automotive video content with play button overlays.

### Features
- Play button overlay with hover effects
- Duration badge
- Optional overlay text on thumbnail
- Multiple size variants (large, medium, small)
- Sponsor and label support
- Author and date metadata

### Usage
\`\`\`tsx
import { vehicleDatabase } from '../../data/vehicles';

const vehicle = vehicleDatabase.find(v => v.make === 'Porsche' && v.model === '911');

<VideoCard
  thumbnailUrl={vehicle?.image || ''}
  thumbnailAlt="Porsche 911 Review"
  title="2025 Porsche 911 Carrera GTS: Track Test at Laguna Seca"
  duration="12:34"
  author="Dan Edmunds"
  date="Dec 22, 2024"
  href="/videos/porsche-911-review"
/>
\`\`\`
        `}}},tags:["autodocs"],argTypes:{variant:{control:"radio",options:["large","medium","small"],description:"Card size variant"}}},p={args:{thumbnailUrl:i?.image||"",thumbnailAlt:`${i?.year} ${i?.make} ${i?.model}`,title:`${i?.year} ${i?.make} ${i?.model} Carrera GTS: Track Test at Laguna Seca`,duration:"12:34",variant:"large"}},h={args:{thumbnailUrl:l?.image||"",thumbnailAlt:`${l?.year} ${l?.make} ${l?.model}`,title:`${l?.year} ${l?.make} ${l?.model} Z06: America's Supercar`,overlayText:"The most powerful naturally aspirated V8 ever in a production car.",variant:"large"}},v={args:{thumbnailUrl:n?.image||"",thumbnailAlt:`${n?.year} ${n?.make} ${n?.model}`,title:`${n?.year} ${n?.make} ${n?.model} Competition: Is It Worth the Premium?`,duration:"8:15",label:"Video Review",author:"K.C. Colwell",date:"Dec 20, 2024",variant:"large"}},g={args:{thumbnailUrl:s?.image||"",thumbnailAlt:`${s?.year} ${s?.make} ${s?.model}`,title:`${s?.year} ${s?.make} ${s?.model} Dark Horse: 500 HP of American Muscle`,duration:"10:45",variant:"medium"}},$={args:{thumbnailUrl:o?.image||"",thumbnailAlt:`${o?.year} ${o?.make} ${o?.model}`,title:`${o?.year} ${o?.make} ${o?.model} Plaid: 0-60 Test`,duration:"3:45",variant:"small"}},y={args:{thumbnailUrl:d?.image||"",thumbnailAlt:`${d?.year} ${d?.make} ${d?.model}`,title:`${d?.year} ${d?.make} ${d?.model}: Supercar Dreams`,duration:"15:00",label:"Featured",variant:"large"}},b={args:{thumbnailUrl:i?.image||"",thumbnailAlt:"Watch Next",title:"Watch Next: Best Sports Cars of 2025",variant:"medium"}},f={render:()=>{const e=U[0],r=U.slice(1,4);return a.jsxs("div",{style:{display:"grid",gridTemplateColumns:"2fr 1fr",gap:"24px",maxWidth:"1200px"},children:[a.jsx(m,{thumbnailUrl:e?.image||"",thumbnailAlt:`${e?.year} ${e?.make} ${e?.model}`,title:`${e?.year} ${e?.make} ${e?.model}: The Ultimate Track Test`,duration:"18:34",overlayText:`${e?.horsepower||0} HP of Pure Performance`,variant:"large"}),a.jsx("div",{style:{display:"flex",flexDirection:"column",gap:"16px"},children:r.map((t,c)=>a.jsx(m,{thumbnailUrl:t.image,thumbnailAlt:`${t.year} ${t.make} ${t.model}`,title:`${t.year} ${t.make} ${t.model}: ${c===0?"First Drive":c===1?"Comparison Test":"Full Review"}`,duration:["6:30","8:15","5:45"][c],variant:"small"},t.id))})]})}},x={render:()=>a.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(3, 1fr)",gap:"24px",maxWidth:"1200px"},children:N.slice(0,3).map((e,r)=>a.jsx(m,{thumbnailUrl:e.image,thumbnailAlt:`${e.year} ${e.make} ${e.model}`,title:`${e.year} ${e.make} ${e.model}: ${r===0?"Off-Road Adventure Test":r===1?"Family Road Trip Review":"Towing Capacity Showdown"}`,duration:["12:34","8:15","10:30"][r],author:["Dan Edmunds","Austin Irwin","Eric Stafford"][r],date:`Dec ${22-r}, 2024`,variant:"medium"},e.id))})},k={render:()=>a.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(2, 1fr)",gap:"24px",maxWidth:"1000px"},children:R.slice(0,4).map((e,r)=>a.jsx(m,{thumbnailUrl:e.image,thumbnailAlt:`${e.year} ${e.make} ${e.model}`,title:`${e.year} ${e.make} ${e.model}: ${r===0?"Towing 10,000 lbs Up a Mountain":r===1?"Work Truck vs Luxury Truck":r===2?"Electric Truck Range Test":"Best Truck for Your Money"}`,duration:["15:20","12:45","18:30","9:15"][r],overlayText:e.fuelType==="Electric"?"Electric Truck Revolution":void 0,variant:"large"},e.id))})},T={render:()=>a.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(4, 1fr)",gap:"16px",maxWidth:"1200px"},children:P.slice(0,4).map((e,r)=>a.jsx(m,{thumbnailUrl:e.image,thumbnailAlt:`${e.year} ${e.make} ${e.model}`,title:`${e.year} ${e.make} ${e.model}`,duration:["5:30","6:15","4:45","7:00"][r],label:e.editorsChoice?"Editor's Pick":e.tenBest?"10Best":void 0,variant:"small"},e.id))})};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:"{\n  args: {\n    thumbnailUrl: porsche911?.image || '',\n    thumbnailAlt: `${porsche911?.year} ${porsche911?.make} ${porsche911?.model}`,\n    title: `${porsche911?.year} ${porsche911?.make} ${porsche911?.model} Carrera GTS: Track Test at Laguna Seca`,\n    duration: '12:34',\n    variant: 'large'\n  }\n}",...p.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:"{\n  args: {\n    thumbnailUrl: chevyCorvette?.image || '',\n    thumbnailAlt: `${chevyCorvette?.year} ${chevyCorvette?.make} ${chevyCorvette?.model}`,\n    title: `${chevyCorvette?.year} ${chevyCorvette?.make} ${chevyCorvette?.model} Z06: America's Supercar`,\n    overlayText: 'The most powerful naturally aspirated V8 ever in a production car.',\n    variant: 'large'\n  }\n}",...h.parameters?.docs?.source}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: {
    thumbnailUrl: bmwM4?.image || '',
    thumbnailAlt: \`\${bmwM4?.year} \${bmwM4?.make} \${bmwM4?.model}\`,
    title: \`\${bmwM4?.year} \${bmwM4?.make} \${bmwM4?.model} Competition: Is It Worth the Premium?\`,
    duration: '8:15',
    label: 'Video Review',
    author: 'K.C. Colwell',
    date: 'Dec 20, 2024',
    variant: 'large'
  }
}`,...v.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:"{\n  args: {\n    thumbnailUrl: fordMustang?.image || '',\n    thumbnailAlt: `${fordMustang?.year} ${fordMustang?.make} ${fordMustang?.model}`,\n    title: `${fordMustang?.year} ${fordMustang?.make} ${fordMustang?.model} Dark Horse: 500 HP of American Muscle`,\n    duration: '10:45',\n    variant: 'medium'\n  }\n}",...g.parameters?.docs?.source}}};$.parameters={...$.parameters,docs:{...$.parameters?.docs,source:{originalSource:"{\n  args: {\n    thumbnailUrl: teslaModelS?.image || '',\n    thumbnailAlt: `${teslaModelS?.year} ${teslaModelS?.make} ${teslaModelS?.model}`,\n    title: `${teslaModelS?.year} ${teslaModelS?.make} ${teslaModelS?.model} Plaid: 0-60 Test`,\n    duration: '3:45',\n    variant: 'small'\n  }\n}",...$.parameters?.docs?.source}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:"{\n  args: {\n    thumbnailUrl: lamborghini?.image || '',\n    thumbnailAlt: `${lamborghini?.year} ${lamborghini?.make} ${lamborghini?.model}`,\n    title: `${lamborghini?.year} ${lamborghini?.make} ${lamborghini?.model}: Supercar Dreams`,\n    duration: '15:00',\n    label: 'Featured',\n    variant: 'large'\n  }\n}",...y.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    thumbnailUrl: porsche911?.image || '',
    thumbnailAlt: 'Watch Next',
    title: 'Watch Next: Best Sports Cars of 2025',
    variant: 'medium'
  }
}`,...b.parameters?.docs?.source}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  render: () => {
    const featuredVehicle = coupes[0];
    const sidebarVehicles = coupes.slice(1, 4);
    return <div style={{
      display: 'grid',
      gridTemplateColumns: '2fr 1fr',
      gap: '24px',
      maxWidth: '1200px'
    }}>
        <VideoCard thumbnailUrl={featuredVehicle?.image || ''} thumbnailAlt={\`\${featuredVehicle?.year} \${featuredVehicle?.make} \${featuredVehicle?.model}\`} title={\`\${featuredVehicle?.year} \${featuredVehicle?.make} \${featuredVehicle?.model}: The Ultimate Track Test\`} duration="18:34" overlayText={\`\${featuredVehicle?.horsepower || 0} HP of Pure Performance\`} variant="large" />
        <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px'
      }}>
          {sidebarVehicles.map((vehicle, index) => <VideoCard key={vehicle.id} thumbnailUrl={vehicle.image} thumbnailAlt={\`\${vehicle.year} \${vehicle.make} \${vehicle.model}\`} title={\`\${vehicle.year} \${vehicle.make} \${vehicle.model}: \${index === 0 ? 'First Drive' : index === 1 ? 'Comparison Test' : 'Full Review'}\`} duration={['6:30', '8:15', '5:45'][index]} variant="small" />)}
        </div>
      </div>;
  }
}`,...f.parameters?.docs?.source}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:"{\n  render: () => <div style={{\n    display: 'grid',\n    gridTemplateColumns: 'repeat(3, 1fr)',\n    gap: '24px',\n    maxWidth: '1200px'\n  }}>\n      {suvs.slice(0, 3).map((vehicle, index) => <VideoCard key={vehicle.id} thumbnailUrl={vehicle.image} thumbnailAlt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`} title={`${vehicle.year} ${vehicle.make} ${vehicle.model}: ${index === 0 ? 'Off-Road Adventure Test' : index === 1 ? 'Family Road Trip Review' : 'Towing Capacity Showdown'}`} duration={['12:34', '8:15', '10:30'][index]} author={['Dan Edmunds', 'Austin Irwin', 'Eric Stafford'][index]} date={`Dec ${22 - index}, 2024`} variant=\"medium\" />)}\n    </div>\n}",...x.parameters?.docs?.source}}};k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:"{\n  render: () => <div style={{\n    display: 'grid',\n    gridTemplateColumns: 'repeat(2, 1fr)',\n    gap: '24px',\n    maxWidth: '1000px'\n  }}>\n      {trucks.slice(0, 4).map((vehicle, index) => <VideoCard key={vehicle.id} thumbnailUrl={vehicle.image} thumbnailAlt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`} title={`${vehicle.year} ${vehicle.make} ${vehicle.model}: ${index === 0 ? 'Towing 10,000 lbs Up a Mountain' : index === 1 ? 'Work Truck vs Luxury Truck' : index === 2 ? 'Electric Truck Range Test' : 'Best Truck for Your Money'}`} duration={['15:20', '12:45', '18:30', '9:15'][index]} overlayText={vehicle.fuelType === 'Electric' ? 'Electric Truck Revolution' : undefined} variant=\"large\" />)}\n    </div>\n}",...k.parameters?.docs?.source}}};T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '16px',
    maxWidth: '1200px'
  }}>
      {sedans.slice(0, 4).map((vehicle, index) => <VideoCard key={vehicle.id} thumbnailUrl={vehicle.image} thumbnailAlt={\`\${vehicle.year} \${vehicle.make} \${vehicle.model}\`} title={\`\${vehicle.year} \${vehicle.make} \${vehicle.model}\`} duration={['5:30', '6:15', '4:45', '7:00'][index]} label={vehicle.editorsChoice ? "Editor's Pick" : vehicle.tenBest ? '10Best' : undefined} variant="small" />)}
    </div>
}`,...T.parameters?.docs?.source}}};const z=["Default","WithOverlayText","WithLabel","MediumSize","SmallSize","LargeWithLabel","MinimalInfo","VideoGrid","HorizontalFeed","TruckShowcase","SedanComparison"];export{p as Default,x as HorizontalFeed,y as LargeWithLabel,g as MediumSize,b as MinimalInfo,T as SedanComparison,$ as SmallSize,k as TruckShowcase,f as VideoGrid,v as WithLabel,h as WithOverlayText,z as __namedExportsOrder,F as default};
