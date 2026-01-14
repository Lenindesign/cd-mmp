import{j as s}from"./iframe-DSvoZ5_G.js";import{v as h}from"./index-Dto8T7jp.js";import"./preload-helper-PPVm8Dsz.js";const r=({title:e,items:v,columns:y=4,showBorder:w=!0,variant:x="default"})=>s.jsxs("section",{className:`seo-block seo-block--${x} seo-block--cols-${y}`,children:[e&&s.jsx("header",{className:`seo-block__header ${w?"seo-block__header--bordered":""}`,children:s.jsx("h2",{className:"seo-block__title",children:e})}),s.jsx("div",{className:"seo-block__grid",children:v.map(t=>s.jsx("article",{className:"seo-block__item",children:s.jsxs("a",{href:t.href||"#",className:"seo-block__link",children:[s.jsx("div",{className:"seo-block__image-wrapper",children:s.jsx("img",{src:t.imageUrl,alt:t.imageAlt,className:"seo-block__image",loading:"lazy"})}),s.jsx("h3",{className:"seo-block__headline",children:t.headline})]})},t.id))})]});r.__docgenInfo={description:"",methods:[],displayName:"SeoBlock",props:{title:{required:!1,tsType:{name:"string"},description:"Section title"},items:{required:!0,tsType:{name:"Array",elements:[{name:"SeoBlockItem"}],raw:"SeoBlockItem[]"},description:"Array of content items"},columns:{required:!1,tsType:{name:"union",raw:"3 | 4 | 6",elements:[{name:"literal",value:"3"},{name:"literal",value:"4"},{name:"literal",value:"6"}]},description:"Number of columns",defaultValue:{value:"4",computed:!1}},showBorder:{required:!1,tsType:{name:"boolean"},description:"Show section border",defaultValue:{value:"true",computed:!1}},variant:{required:!1,tsType:{name:"union",raw:"'default' | 'compact' | 'cards'",elements:[{name:"literal",value:"'default'"},{name:"literal",value:"'compact'"},{name:"literal",value:"'cards'"}]},description:"Variant style",defaultValue:{value:"'default'",computed:!1}}}};const B=h.slice(0,12),k=h.filter(e=>e.bodyStyle==="Sedan").slice(0,6),S=h.filter(e=>e.bodyStyle==="SUV").slice(0,6),A={title:"Resin Components/SeoBlock",component:r,parameters:{layout:"padded",docs:{description:{component:`
## SEO Block

A grid component for displaying related content, typically used for SEO optimization
and internal linking. Inspired by Hearst's 4-across content blocks.

### Features
- Configurable columns (3, 4, or 6)
- Optional section title with border
- Three variants: default, compact, cards
- Responsive grid layout
- Image hover effects

### Usage
\`\`\`tsx
<SeoBlock
  title="Related Articles"
  items={[
    {
      id: 1,
      imageUrl: '/path/to/image.jpg',
      imageAlt: '2025 Honda Accord',
      headline: '2025 Honda Accord Review',
      href: '/reviews/honda-accord',
    },
    // ... more items
  ]}
  columns={4}
  showBorder={true}
  variant="default"
/>
\`\`\`
        `}}},tags:["autodocs"],argTypes:{columns:{control:"radio",options:[3,4,6],description:"Number of columns in the grid"},variant:{control:"radio",options:["default","compact","cards"],description:"Visual style variant"},showBorder:{control:"boolean",description:"Show border under title"}}},o=B.map(e=>({id:e.id,imageUrl:e.image,imageAlt:`${e.year} ${e.make} ${e.model}`,headline:`${e.year} ${e.make} ${e.model} Review`,href:`/reviews/${e.slug}`})),g=k.map(e=>({id:e.id,imageUrl:e.image,imageAlt:`${e.year} ${e.make} ${e.model}`,headline:`${e.year} ${e.make} ${e.model}: Everything You Need to Know`,href:`/reviews/${e.slug}`})),f=S.map(e=>({id:e.id,imageUrl:e.image,imageAlt:`${e.year} ${e.make} ${e.model}`,headline:`Best ${e.bodyStyle}s: ${e.year} ${e.make} ${e.model}`,href:`/reviews/${e.slug}`})),a={args:{title:"SEO Block - Related Content",items:o.slice(0,4),columns:4,showBorder:!0,variant:"default"}},i={args:{title:"Popular Reviews",items:g.slice(0,6),columns:3,showBorder:!0,variant:"default"}},l={args:{title:"Browse All Vehicles",items:o.slice(0,6),columns:6,showBorder:!0,variant:"default"}},n={args:{title:"Quick Links",items:o.slice(0,6),columns:6,showBorder:!0,variant:"compact"}},c={args:{title:"Featured Reviews",items:f.slice(0,4),columns:4,showBorder:!0,variant:"cards"}},d={args:{title:"More to Explore",items:o.slice(0,4),columns:4,showBorder:!1,variant:"default"}},m={args:{items:g.slice(0,4),columns:4,variant:"default"}},u={render:()=>s.jsxs("div",{style:{maxWidth:"1200px",margin:"0 auto",padding:"24px"},children:[s.jsx(r,{title:"Latest Reviews",items:o.slice(0,4),columns:4,showBorder:!0,variant:"default"}),s.jsx("div",{style:{marginTop:"48px"}}),s.jsx(r,{title:"Popular SUVs",items:f.slice(0,3),columns:3,showBorder:!0,variant:"cards"}),s.jsx("div",{style:{marginTop:"48px"}}),s.jsx(r,{title:"Browse by Category",items:o.slice(0,6),columns:6,showBorder:!0,variant:"compact"})]})},p={render:()=>s.jsxs("div",{style:{maxWidth:"800px",margin:"0 auto",padding:"24px"},children:[s.jsxs("div",{style:{marginBottom:"32px",paddingBottom:"32px",borderBottom:"1px solid #e5e5e5"},children:[s.jsx("h1",{style:{fontSize:"2rem",fontWeight:700,marginBottom:"16px"},children:"2025 Honda Accord Review"}),s.jsx("p",{style:{lineHeight:1.7,color:"#374151"},children:"The Honda Accord continues to set the benchmark for midsize sedans with its excellent combination of comfort, efficiency, and value. Our comprehensive review covers everything you need to know about this perennial favorite."})]}),s.jsx(r,{title:"Related Articles",items:g.slice(0,4),columns:4,showBorder:!0,variant:"default"})]})};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'SEO Block - Related Content',
    items: seoItems.slice(0, 4),
    columns: 4,
    showBorder: true,
    variant: 'default'
  }
}`,...a.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'Popular Reviews',
    items: sedanItems.slice(0, 6),
    columns: 3,
    showBorder: true,
    variant: 'default'
  }
}`,...i.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'Browse All Vehicles',
    items: seoItems.slice(0, 6),
    columns: 6,
    showBorder: true,
    variant: 'default'
  }
}`,...l.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'Quick Links',
    items: seoItems.slice(0, 6),
    columns: 6,
    showBorder: true,
    variant: 'compact'
  }
}`,...n.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'Featured Reviews',
    items: suvItems.slice(0, 4),
    columns: 4,
    showBorder: true,
    variant: 'cards'
  }
}`,...c.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'More to Explore',
    items: seoItems.slice(0, 4),
    columns: 4,
    showBorder: false,
    variant: 'default'
  }
}`,...d.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    items: sedanItems.slice(0, 4),
    columns: 4,
    variant: 'default'
  }
}`,...m.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '24px'
  }}>
      <SeoBlock title="Latest Reviews" items={seoItems.slice(0, 4)} columns={4} showBorder={true} variant="default" />
      
      <div style={{
      marginTop: '48px'
    }} />
      
      <SeoBlock title="Popular SUVs" items={suvItems.slice(0, 3)} columns={3} showBorder={true} variant="cards" />
      
      <div style={{
      marginTop: '48px'
    }} />
      
      <SeoBlock title="Browse by Category" items={seoItems.slice(0, 6)} columns={6} showBorder={true} variant="compact" />
    </div>
}`,...u.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    maxWidth: '800px',
    margin: '0 auto',
    padding: '24px'
  }}>
      {/* Article content */}
      <div style={{
      marginBottom: '32px',
      paddingBottom: '32px',
      borderBottom: '1px solid #e5e5e5'
    }}>
        <h1 style={{
        fontSize: '2rem',
        fontWeight: 700,
        marginBottom: '16px'
      }}>
          2025 Honda Accord Review
        </h1>
        <p style={{
        lineHeight: 1.7,
        color: '#374151'
      }}>
          The Honda Accord continues to set the benchmark for midsize sedans with its 
          excellent combination of comfort, efficiency, and value. Our comprehensive 
          review covers everything you need to know about this perennial favorite.
        </p>
      </div>

      {/* SEO Block at article footer */}
      <SeoBlock title="Related Articles" items={sedanItems.slice(0, 4)} columns={4} showBorder={true} variant="default" />
    </div>
}`,...p.parameters?.docs?.source}}};const _=["Default","ThreeColumns","SixColumns","Compact","Cards","NoBorder","NoTitle","PageLayout","ArticleFooter"];export{p as ArticleFooter,c as Cards,n as Compact,a as Default,d as NoBorder,m as NoTitle,u as PageLayout,l as SixColumns,i as ThreeColumns,_ as __namedExportsOrder,A as default};
