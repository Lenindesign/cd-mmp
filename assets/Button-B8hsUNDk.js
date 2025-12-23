import{j as e}from"./iframe-D6l4Tfoa.js";const v=({children:u,variant:d="primary",size:c="medium",fullWidth:m=!1,loading:a=!1,disabled:t=!1,iconLeft:n,iconRight:s,as:f="button",href:r,target:p,className:b="",...l})=>{const i=["btn",`btn--${d}`,`btn--${c}`,m&&"btn--full-width",a&&"btn--loading",t&&"btn--disabled",b].filter(Boolean).join(" "),o=e.jsxs(e.Fragment,{children:[a&&e.jsx("span",{className:"btn__spinner","aria-hidden":"true",children:e.jsx("svg",{className:"btn__spinner-icon",viewBox:"0 0 24 24",fill:"none",children:e.jsx("circle",{cx:"12",cy:"12",r:"10",stroke:"currentColor",strokeWidth:"3",strokeLinecap:"round",strokeDasharray:"32",strokeDashoffset:"12"})})}),n&&!a&&e.jsx("span",{className:"btn__icon btn__icon--left",children:n}),e.jsx("span",{className:"btn__text",children:u}),s&&e.jsx("span",{className:"btn__icon btn__icon--right",children:s})]});return f==="a"&&r?e.jsx("a",{href:r,target:p,className:i,"aria-disabled":t||a,...l,children:o}):e.jsx("button",{type:"button",className:i,disabled:t||a,"aria-busy":a,...l,children:o})};v.__docgenInfo={description:`Button Component

A unified button component following the Car and Driver design system.
Replaces various button patterns across the codebase with a consistent API.

@example
// Primary button
<Button variant="primary">Get Started</Button>

// Loading state
<Button variant="primary" loading>Submitting...</Button>

// With icon
<Button variant="secondary" iconLeft={<SearchIcon />}>Search</Button>

// As a link
<Button as="a" href="/pricing" variant="outline">View Pricing</Button>`,methods:[],displayName:"Button",props:{variant:{required:!1,tsType:{name:"union",raw:"'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success'",elements:[{name:"literal",value:"'primary'"},{name:"literal",value:"'secondary'"},{name:"literal",value:"'outline'"},{name:"literal",value:"'ghost'"},{name:"literal",value:"'danger'"},{name:"literal",value:"'success'"}]},description:"Button style variant",defaultValue:{value:"'primary'",computed:!1}},size:{required:!1,tsType:{name:"union",raw:"'small' | 'medium' | 'large'",elements:[{name:"literal",value:"'small'"},{name:"literal",value:"'medium'"},{name:"literal",value:"'large'"}]},description:"Button size",defaultValue:{value:"'medium'",computed:!1}},fullWidth:{required:!1,tsType:{name:"boolean"},description:"Full width button",defaultValue:{value:"false",computed:!1}},loading:{required:!1,tsType:{name:"boolean"},description:"Loading state - shows spinner and disables button",defaultValue:{value:"false",computed:!1}},iconLeft:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"Icon to display before text"},iconRight:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"Icon to display after text"},as:{required:!1,tsType:{name:"union",raw:"'button' | 'a'",elements:[{name:"literal",value:"'button'"},{name:"literal",value:"'a'"}]},description:"Render as a different element (for links)",defaultValue:{value:"'button'",computed:!1}},href:{required:!1,tsType:{name:"string"},description:"href for link buttons"},target:{required:!1,tsType:{name:"string"},description:"target for link buttons"},disabled:{defaultValue:{value:"false",computed:!1},required:!1},className:{defaultValue:{value:"''",computed:!1},required:!1}}};export{v as B};
