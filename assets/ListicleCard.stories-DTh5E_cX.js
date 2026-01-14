import{j as s}from"./iframe-Utr5dZsf.js";import{v as h}from"./index-Dto8T7jp.js";import"./preload-helper-PPVm8Dsz.js";const t=({items:e,title:r,columns:b=4,showNumbers:A=!1,variant:x="default",viewAllHref:g,viewAllText:N="View All"})=>s.jsxs("section",{className:`listicle-card listicle-card--${x} listicle-card--cols-${b}`,children:[r&&s.jsxs("header",{className:"listicle-card__header",children:[s.jsx("h2",{className:"listicle-card__title",children:r}),g&&s.jsxs("a",{href:g,className:"listicle-card__view-all",children:[N,s.jsx("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:s.jsx("path",{d:"M5 12h14M12 5l7 7-7 7"})})]})]}),s.jsx("div",{className:"listicle-card__grid",children:e.map((a,y)=>s.jsx("article",{className:"listicle-card__item",children:s.jsxs("a",{href:a.href||"#",className:"listicle-card__link",children:[s.jsxs("div",{className:"listicle-card__image-wrapper",children:[s.jsx("img",{src:a.imageUrl,alt:a.imageAlt,className:"listicle-card__image",loading:"lazy"}),A&&s.jsx("span",{className:"listicle-card__number",children:a.itemNumber||y+1})]}),s.jsxs("div",{className:"listicle-card__content",children:[a.sponsor&&s.jsx("span",{className:"listicle-card__sponsor",children:a.sponsor}),s.jsx("h3",{className:"listicle-card__headline",children:a.headline})]})]})},a.id))})]});t.__docgenInfo={description:"",methods:[],displayName:"ListicleCard",props:{items:{required:!0,tsType:{name:"Array",elements:[{name:"ListicleItem"}],raw:"ListicleItem[]"},description:"Array of listicle items"},title:{required:!1,tsType:{name:"string"},description:"Section title"},columns:{required:!1,tsType:{name:"union",raw:"2 | 3 | 4",elements:[{name:"literal",value:"2"},{name:"literal",value:"3"},{name:"literal",value:"4"}]},description:"Number of columns (2, 3, or 4)",defaultValue:{value:"4",computed:!1}},showNumbers:{required:!1,tsType:{name:"boolean"},description:"Show item numbers",defaultValue:{value:"false",computed:!1}},variant:{required:!1,tsType:{name:"union",raw:"'default' | 'compact' | 'featured'",elements:[{name:"literal",value:"'default'"},{name:"literal",value:"'compact'"},{name:"literal",value:"'featured'"}]},description:"Card variant",defaultValue:{value:"'default'",computed:!1}},viewAllHref:{required:!1,tsType:{name:"string"},description:"Link to view all"},viewAllText:{required:!1,tsType:{name:"string"},description:"View all text",defaultValue:{value:"'View All'",computed:!1}}}};const S=h.filter(e=>e.bodyStyle==="Sedan").slice(0,8),T=h.filter(e=>e.bodyStyle==="SUV").slice(0,8),C=h.filter(e=>e.bodyStyle==="Truck").slice(0,4),$=h.filter(e=>e.bodyStyle==="Coupe").slice(0,6),B={title:"Resin Components/ListicleCard",component:t,parameters:{layout:"padded",docs:{description:{component:`
## Listicle Card

A grid-based listicle component for displaying ranked or curated lists of content.
Inspired by Hearst's Resin design system.

### Features
- Configurable column count (2, 3, or 4)
- Optional numbered badges
- Sponsor labels
- View all link
- Three variants: default, compact, featured
- Responsive grid layout

### Usage
\`\`\`tsx
<ListicleCard
  title="Best Sedans of 2025"
  items={[
    {
      id: 1,
      imageUrl: '/path/to/image.jpg',
      imageAlt: '2025 Honda Accord',
      headline: '2025 Honda Accord: The Best Midsize Sedan',
      sponsor: 'Car and Driver',
      href: '/reviews/honda-accord',
    },
    // ... more items
  ]}
  columns={4}
  showNumbers={true}
  viewAllHref="/best-sedans"
  viewAllText="View All Sedans"
/>
\`\`\`
        `}}},tags:["autodocs"],argTypes:{columns:{control:"radio",options:[2,3,4],description:"Number of columns in the grid"},variant:{control:"radio",options:["default","compact","featured"],description:"Card layout variant"},showNumbers:{control:"boolean",description:"Show numbered badges on items"}}},i=S.map((e,r)=>({id:e.id,imageUrl:e.image,imageAlt:`${e.year} ${e.make} ${e.model}`,headline:`${e.year} ${e.make} ${e.model}: ${r===0?"Best Overall":r===1?"Best Value":r===2?"Most Luxurious":"Top Pick"}`,href:`/reviews/${e.slug}`,sponsor:r%3===0?"Car and Driver":void 0,itemNumber:r+1})),w=T.map((e,r)=>({id:e.id,imageUrl:e.image,imageAlt:`${e.year} ${e.make} ${e.model}`,headline:`${e.year} ${e.make} ${e.model}`,href:`/reviews/${e.slug}`,sponsor:r<2?"Editors' Choice":void 0,itemNumber:r+1})),k=C.map((e,r)=>({id:e.id,imageUrl:e.image,imageAlt:`${e.year} ${e.make} ${e.model}`,headline:`${e.year} ${e.make} ${e.model}: ${r===0?"Best Full-Size":r===1?"Best Midsize":"Top Rated"}`,href:`/reviews/${e.slug}`,itemNumber:r+1})),v=$.map((e,r)=>({id:e.id,imageUrl:e.image,imageAlt:`${e.year} ${e.make} ${e.model}`,headline:`${e.year} ${e.make} ${e.model}`,href:`/reviews/${e.slug}`,sponsor:e.editorsChoice?"Editors' Choice":e.tenBest?"10Best":void 0,itemNumber:r+1})),l={args:{title:"Best Sedans of 2025",items:i.slice(0,4),columns:4,showNumbers:!1,variant:"default",viewAllHref:"/best-sedans",viewAllText:"View All"}},o={args:{title:"10 Best Cars for 2025",items:i.slice(0,4),columns:4,showNumbers:!0,variant:"default",viewAllHref:"/10best",viewAllText:"See Full List"}},n={args:{title:"Best SUVs for Families",items:w.slice(0,6),columns:3,showNumbers:!0,variant:"default",viewAllHref:"/best-suvs",viewAllText:"View All SUVs"}},c={args:{title:"Best Trucks of 2025",items:k,columns:2,showNumbers:!0,variant:"default",viewAllHref:"/best-trucks",viewAllText:"View All Trucks"}},m={args:{title:"Quick Picks",items:v.slice(0,4),columns:4,showNumbers:!0,variant:"compact"}},d={args:{title:"Editors' Choice Awards",items:i.slice(0,4),columns:4,showNumbers:!0,variant:"featured",viewAllHref:"/editors-choice",viewAllText:"All Winners"}},u={args:{items:w.slice(0,4),columns:4,showNumbers:!1,variant:"default"}},p={args:{title:"Featured Vehicles",items:i.slice(0,4).map((e,r)=>({...e,sponsor:r%2===0?"Car and Driver + Partner":"Sponsored"})),columns:4,showNumbers:!1,variant:"default"}},f={render:()=>s.jsxs("div",{style:{maxWidth:"1200px",margin:"0 auto",padding:"24px"},children:[s.jsx(t,{title:"10 Best Cars for 2025",items:i.slice(0,4),columns:4,showNumbers:!0,variant:"default",viewAllHref:"/10best",viewAllText:"See Full List"}),s.jsx("div",{style:{marginTop:"48px"}}),s.jsx(t,{title:"Best SUVs for Every Budget",items:w.slice(0,3),columns:3,showNumbers:!0,variant:"default",viewAllHref:"/best-suvs",viewAllText:"View All SUVs"}),s.jsx("div",{style:{marginTop:"48px"}}),s.jsx(t,{title:"Sports Cars We Love",items:v.slice(0,4),columns:4,showNumbers:!1,variant:"compact"})]})};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'Best Sedans of 2025',
    items: sedanItems.slice(0, 4),
    columns: 4,
    showNumbers: false,
    variant: 'default',
    viewAllHref: '/best-sedans',
    viewAllText: 'View All'
  }
}`,...l.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    title: '10 Best Cars for 2025',
    items: sedanItems.slice(0, 4),
    columns: 4,
    showNumbers: true,
    variant: 'default',
    viewAllHref: '/10best',
    viewAllText: 'See Full List'
  }
}`,...o.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'Best SUVs for Families',
    items: suvItems.slice(0, 6),
    columns: 3,
    showNumbers: true,
    variant: 'default',
    viewAllHref: '/best-suvs',
    viewAllText: 'View All SUVs'
  }
}`,...n.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'Best Trucks of 2025',
    items: truckItems,
    columns: 2,
    showNumbers: true,
    variant: 'default',
    viewAllHref: '/best-trucks',
    viewAllText: 'View All Trucks'
  }
}`,...c.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'Quick Picks',
    items: coupeItems.slice(0, 4),
    columns: 4,
    showNumbers: true,
    variant: 'compact'
  }
}`,...m.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'Editors\\' Choice Awards',
    items: sedanItems.slice(0, 4),
    columns: 4,
    showNumbers: true,
    variant: 'featured',
    viewAllHref: '/editors-choice',
    viewAllText: 'All Winners'
  }
}`,...d.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    items: suvItems.slice(0, 4),
    columns: 4,
    showNumbers: false,
    variant: 'default'
  }
}`,...u.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'Featured Vehicles',
    items: sedanItems.slice(0, 4).map((item, i) => ({
      ...item,
      sponsor: i % 2 === 0 ? 'Car and Driver + Partner' : 'Sponsored'
    })),
    columns: 4,
    showNumbers: false,
    variant: 'default'
  }
}`,...p.parameters?.docs?.source}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '24px'
  }}>
      <ListicleCard title="10 Best Cars for 2025" items={sedanItems.slice(0, 4)} columns={4} showNumbers={true} variant="default" viewAllHref="/10best" viewAllText="See Full List" />
      
      <div style={{
      marginTop: '48px'
    }} />
      
      <ListicleCard title="Best SUVs for Every Budget" items={suvItems.slice(0, 3)} columns={3} showNumbers={true} variant="default" viewAllHref="/best-suvs" viewAllText="View All SUVs" />
      
      <div style={{
      marginTop: '48px'
    }} />
      
      <ListicleCard title="Sports Cars We Love" items={coupeItems.slice(0, 4)} columns={4} showNumbers={false} variant="compact" />
    </div>
}`,...f.parameters?.docs?.source}}};const H=["Default","WithNumbers","ThreeColumns","TwoColumns","Compact","Featured","NoHeader","WithSponsors","PageLayout"];export{m as Compact,l as Default,d as Featured,u as NoHeader,f as PageLayout,n as ThreeColumns,c as TwoColumns,o as WithNumbers,p as WithSponsors,H as __namedExportsOrder,B as default};
