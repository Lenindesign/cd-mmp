import{j as e}from"./iframe--VFCZUcI.js";import"./preload-helper-PPVm8Dsz.js";const t=({size:r="default",variant:i="primary",label:n="Loading...",centered:k=!1,fullPage:L=!1,className:C=""})=>{const w=e.jsxs("div",{className:`loading-spinner loading-spinner--${r} loading-spinner--${i} ${k?"loading-spinner--centered":""} ${C}`,role:"status","aria-label":n,children:[e.jsx("svg",{className:"loading-spinner__icon",viewBox:"0 0 24 24",fill:"none","aria-hidden":"true",children:e.jsx("circle",{cx:"12",cy:"12",r:"10",stroke:"currentColor",strokeWidth:"3",strokeLinecap:"round",strokeDasharray:"32",strokeDashoffset:"12"})}),e.jsx("span",{className:"sr-only",children:n})]});return L?e.jsx("div",{className:"loading-spinner__overlay",children:e.jsxs("div",{className:"loading-spinner__overlay-content",children:[w,n&&e.jsx("p",{className:"loading-spinner__label",children:n})]})}):w},a=({width:r="100%",height:i="1em",rounded:n="sm",className:k=""})=>e.jsx("div",{className:`loading-skeleton loading-skeleton--rounded-${n} ${k}`,style:{width:typeof r=="number"?`${r}px`:r,height:typeof i=="number"?`${i}px`:i},"aria-hidden":"true"}),s=({className:r=""})=>e.jsxs("div",{className:`loading-card ${r}`,children:[e.jsx(a,{height:180,rounded:"md",className:"loading-card__image"}),e.jsxs("div",{className:"loading-card__content",children:[e.jsx(a,{width:"60%",height:12,className:"loading-card__title"}),e.jsx(a,{width:"40%",height:10,className:"loading-card__subtitle"}),e.jsx(a,{width:"80%",height:10,className:"loading-card__text"})]})]});t.__docgenInfo={description:`LoadingSpinner Component

A consistent loading indicator following the design system.

@example
// Basic usage
<LoadingSpinner />

// Large centered spinner
<LoadingSpinner size="large" centered />

// Full page loading overlay
<LoadingSpinner fullPage label="Loading vehicles..." />`,methods:[],displayName:"LoadingSpinner",props:{size:{required:!1,tsType:{name:"union",raw:"'small' | 'default' | 'large'",elements:[{name:"literal",value:"'small'"},{name:"literal",value:"'default'"},{name:"literal",value:"'large'"}]},description:"Size of the spinner",defaultValue:{value:"'default'",computed:!1}},variant:{required:!1,tsType:{name:"union",raw:"'primary' | 'white' | 'dark'",elements:[{name:"literal",value:"'primary'"},{name:"literal",value:"'white'"},{name:"literal",value:"'dark'"}]},description:"Color variant",defaultValue:{value:"'primary'",computed:!1}},label:{required:!1,tsType:{name:"string"},description:"Optional label for accessibility",defaultValue:{value:"'Loading...'",computed:!1}},centered:{required:!1,tsType:{name:"boolean"},description:"Center the spinner in its container",defaultValue:{value:"false",computed:!1}},fullPage:{required:!1,tsType:{name:"boolean"},description:"Show as full-page overlay",defaultValue:{value:"false",computed:!1}},className:{required:!1,tsType:{name:"string"},description:"Additional CSS class",defaultValue:{value:"''",computed:!1}}}};a.__docgenInfo={description:"",methods:[],displayName:"LoadingSkeleton",props:{width:{required:!1,tsType:{name:"union",raw:"string | number",elements:[{name:"string"},{name:"number"}]},description:"Width of the skeleton",defaultValue:{value:"'100%'",computed:!1}},height:{required:!1,tsType:{name:"union",raw:"string | number",elements:[{name:"string"},{name:"number"}]},description:"Height of the skeleton",defaultValue:{value:"'1em'",computed:!1}},rounded:{required:!1,tsType:{name:"union",raw:"'none' | 'sm' | 'md' | 'lg' | 'full'",elements:[{name:"literal",value:"'none'"},{name:"literal",value:"'sm'"},{name:"literal",value:"'md'"},{name:"literal",value:"'lg'"},{name:"literal",value:"'full'"}]},description:"Border radius",defaultValue:{value:"'sm'",computed:!1}},className:{required:!1,tsType:{name:"string"},description:"Additional CSS class",defaultValue:{value:"''",computed:!1}}}};s.__docgenInfo={description:`LoadingCard Component

A skeleton placeholder for card-like content.`,methods:[],displayName:"LoadingCard",props:{className:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"''",computed:!1}}}};const b={title:"Atoms/LoadingSpinner",component:t,parameters:{layout:"centered",docs:{description:{component:`
# LoadingSpinner

Loading indicators for asynchronous operations and content placeholders.

---

## Components

| Component | Use Case |
|-----------|----------|
| **LoadingSpinner** | Inline or centered spinning indicator |
| **LoadingSkeleton** | Content placeholder with shimmer effect |
| **LoadingCard** | Pre-built vehicle card skeleton |

---

## Usage Guidelines

- Use spinners for short operations (< 3 seconds)
- Use skeletons for content loading (lists, cards, pages)
- Always provide accessible loading announcements
- Consider progress indicators for long operations

---

## Sizes

| Size | Use Case |
|------|----------|
| **Small** | Buttons, inline actions |
| **Default** | General purpose |
| **Large** | Full-page loading, modals |
        `}}},tags:["autodocs"],argTypes:{size:{control:"select",options:["small","default","large"],description:"Size of the spinner",table:{type:{summary:"small | default | large"},defaultValue:{summary:"default"},category:"Appearance"}},variant:{control:"select",options:["primary","white","dark"],description:"Color variant for different backgrounds",table:{type:{summary:"primary | white | dark"},defaultValue:{summary:"primary"},category:"Appearance"}},centered:{control:"boolean",description:"Center spinner in parent container",table:{type:{summary:"boolean"},defaultValue:{summary:"false"},category:"Layout"}}}},l={args:{size:"default",variant:"primary"}},d={args:{size:"small"}},o={args:{size:"large"}},p={args:{variant:"primary",size:"large"}},c={args:{variant:"white",size:"large"},parameters:{backgrounds:{default:"dark"}}},m={args:{variant:"dark",size:"large"}},g={args:{size:"large",centered:!0},parameters:{layout:"fullscreen"},decorators:[r=>e.jsx("div",{style:{height:"300px",border:"1px dashed #ccc"},children:e.jsx(r,{})})]},u={render:()=>e.jsxs("div",{style:{display:"flex",gap:"32px",alignItems:"center"},children:[e.jsxs("div",{style:{textAlign:"center"},children:[e.jsx(t,{size:"small"}),e.jsx("p",{style:{marginTop:"8px",fontSize:"12px",color:"#666"},children:"Small"})]}),e.jsxs("div",{style:{textAlign:"center"},children:[e.jsx(t,{size:"default"}),e.jsx("p",{style:{marginTop:"8px",fontSize:"12px",color:"#666"},children:"Default"})]}),e.jsxs("div",{style:{textAlign:"center"},children:[e.jsx(t,{size:"large"}),e.jsx("p",{style:{marginTop:"8px",fontSize:"12px",color:"#666"},children:"Large"})]})]})},h={render:()=>e.jsx("div",{style:{width:"300px"},children:e.jsx(a,{width:"100%",height:20})})},x={render:()=>e.jsxs("div",{style:{width:"300px",display:"flex",flexDirection:"column",gap:"8px"},children:[e.jsx(a,{width:"100%",height:16}),e.jsx(a,{width:"80%",height:16}),e.jsx(a,{width:"60%",height:16})]})},f={render:()=>e.jsxs("div",{style:{width:"200px"},children:[e.jsx(a,{width:"100%",height:120,rounded:"md"}),e.jsxs("div",{style:{padding:"12px",display:"flex",flexDirection:"column",gap:"8px"},children:[e.jsx(a,{width:"70%",height:14}),e.jsx(a,{width:"50%",height:12})]})]})},y={render:()=>e.jsxs("div",{style:{display:"flex",gap:"16px",alignItems:"center"},children:[e.jsx(a,{width:40,height:40,rounded:"full"}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"8px"},children:[e.jsx(a,{width:150,height:14}),e.jsx(a,{width:100,height:12})]})]})},v={render:()=>e.jsx("div",{style:{width:"280px"},children:e.jsx(s,{})})},S={render:()=>e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(3, 1fr)",gap:"16px",width:"900px"},children:[e.jsx(s,{}),e.jsx(s,{}),e.jsx(s,{})]}),parameters:{layout:"padded"}},j={render:()=>e.jsxs("div",{style:{width:"100%",maxWidth:"1200px"},children:[e.jsx("div",{style:{marginBottom:"24px"},children:e.jsx(a,{width:200,height:32,rounded:"sm"})}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(4, 1fr)",gap:"20px"},children:[1,2,3,4,5,6,7,8].map(r=>e.jsx(s,{},r))})]}),parameters:{layout:"padded"}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    size: 'default',
    variant: 'primary'
  }
}`,...l.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    size: 'small'
  }
}`,...d.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    size: 'large'
  }
}`,...o.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'primary',
    size: 'large'
  }
}`,...p.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'white',
    size: 'large'
  },
  parameters: {
    backgrounds: {
      default: 'dark'
    }
  }
}`,...c.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'dark',
    size: 'large'
  }
}`,...m.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    size: 'large',
    centered: true
  },
  parameters: {
    layout: 'fullscreen'
  },
  decorators: [Story => <div style={{
    height: '300px',
    border: '1px dashed #ccc'
  }}>
        <Story />
      </div>]
}`,...g.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    gap: '32px',
    alignItems: 'center'
  }}>
      <div style={{
      textAlign: 'center'
    }}>
        <LoadingSpinner size="small" />
        <p style={{
        marginTop: '8px',
        fontSize: '12px',
        color: '#666'
      }}>Small</p>
      </div>
      <div style={{
      textAlign: 'center'
    }}>
        <LoadingSpinner size="default" />
        <p style={{
        marginTop: '8px',
        fontSize: '12px',
        color: '#666'
      }}>Default</p>
      </div>
      <div style={{
      textAlign: 'center'
    }}>
        <LoadingSpinner size="large" />
        <p style={{
        marginTop: '8px',
        fontSize: '12px',
        color: '#666'
      }}>Large</p>
      </div>
    </div>
}`,...u.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    width: '300px'
  }}>
      <LoadingSkeleton width="100%" height={20} />
    </div>
}`,...h.parameters?.docs?.source}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    width: '300px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  }}>
      <LoadingSkeleton width="100%" height={16} />
      <LoadingSkeleton width="80%" height={16} />
      <LoadingSkeleton width="60%" height={16} />
    </div>
}`,...x.parameters?.docs?.source}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    width: '200px'
  }}>
      <LoadingSkeleton width="100%" height={120} rounded="md" />
      <div style={{
      padding: '12px',
      display: 'flex',
      flexDirection: 'column',
      gap: '8px'
    }}>
        <LoadingSkeleton width="70%" height={14} />
        <LoadingSkeleton width="50%" height={12} />
      </div>
    </div>
}`,...f.parameters?.docs?.source}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    gap: '16px',
    alignItems: 'center'
  }}>
      <LoadingSkeleton width={40} height={40} rounded="full" />
      <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '8px'
    }}>
        <LoadingSkeleton width={150} height={14} />
        <LoadingSkeleton width={100} height={12} />
      </div>
    </div>
}`,...y.parameters?.docs?.source}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    width: '280px'
  }}>
      <LoadingCard />
    </div>
}`,...v.parameters?.docs?.source}}};S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '16px',
    width: '900px'
  }}>
      <LoadingCard />
      <LoadingCard />
      <LoadingCard />
    </div>,
  parameters: {
    layout: 'padded'
  }
}`,...S.parameters?.docs?.source}}};j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    width: '100%',
    maxWidth: '1200px'
  }}>
      <div style={{
      marginBottom: '24px'
    }}>
        <LoadingSkeleton width={200} height={32} rounded="sm" />
      </div>
      <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '20px'
    }}>
        {[1, 2, 3, 4, 5, 6, 7, 8].map(i => <LoadingCard key={i} />)}
      </div>
    </div>,
  parameters: {
    layout: 'padded'
  }
}`,...j.parameters?.docs?.source}}};const T=["Default","Small","Large","Primary","White","Dark","Centered","AllSizes","SkeletonDefault","SkeletonText","SkeletonCard","SkeletonRounded","CardSkeleton","CardSkeletonGrid","VehicleListLoading"];export{u as AllSizes,v as CardSkeleton,S as CardSkeletonGrid,g as Centered,m as Dark,l as Default,o as Large,p as Primary,f as SkeletonCard,h as SkeletonDefault,y as SkeletonRounded,x as SkeletonText,d as Small,j as VehicleListLoading,c as White,T as __namedExportsOrder,b as default};
