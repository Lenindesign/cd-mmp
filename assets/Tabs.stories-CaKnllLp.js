import{j as e,r as l}from"./iframe-DBAvAkDd.js";import{T as t}from"./Tabs-DLULo1w7.js";import{C as g}from"./car-ppTnERKb.js";import{F as h}from"./fuel-jlVJV1BG.js";import{L as b}from"./leaf-BCfG_oWY.js";import{Z as S}from"./zap-CedbUkFz.js";import"./preload-helper-PPVm8Dsz.js";import"./createLucideIcon-TejrvsQz.js";const A={title:"Components/Tabs",component:t,parameters:{layout:"padded"},tags:["autodocs"],argTypes:{variant:{control:"radio",options:["pills","segmented","underline"]},fullWidth:{control:"boolean"}}},d=[{value:"all",label:"All Deals"},{value:"lease",label:"Lease"},{value:"finance",label:"Buy"},{value:"cash",label:"Cash Back"}],x=[{value:"all",label:"All",icon:e.jsx(g,{size:16})},{value:"gas",label:"Gas",icon:e.jsx(h,{size:16})},{value:"hybrid",label:"Hybrid",icon:e.jsx(b,{size:16})},{value:"electric",label:"Electric",icon:e.jsx(S,{size:16}),count:12}],p=[{value:"saved",label:"Saved",count:5},{value:"wishlist",label:"Wishlist",count:3}],C=()=>{const[a,s]=l.useState("all");return e.jsx(t,{items:d,value:a,onChange:s,variant:"pills"})},T=()=>{const[a,s]=l.useState("all");return e.jsx(t,{items:x,value:a,onChange:s,variant:"pills"})},j=()=>{const[a,s]=l.useState("all");return e.jsx(t,{items:d,value:a,onChange:s,variant:"segmented"})},f=()=>{const[a,s]=l.useState("saved");return e.jsx(t,{items:p,value:a,onChange:s,variant:"underline"})},r={render:()=>e.jsx(C,{})},n={render:()=>e.jsx(T,{})},o={render:()=>{const[a,s]=l.useState("all");return e.jsx(t,{items:d,value:a,onChange:s,variant:"pills",fullWidth:!0})}},u={render:()=>e.jsx(j,{})},c={render:()=>{const[a,s]=l.useState("saved");return e.jsx(t,{items:p,value:a,onChange:s,variant:"segmented"})}},i={render:()=>e.jsx(f,{})},m={render:()=>{const a=[{value:"all",label:"All",count:28},{value:"new",label:"New",count:16},{value:"used",label:"Used",count:12}],[s,v]=l.useState("all");return e.jsx(t,{items:a,value:s,onChange:v,variant:"underline"})}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  render: () => <PillsTemplate />
}`,...r.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  render: () => <PillsWithIconsTemplate />
}`,...n.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [value, setValue] = useState('all');
    return <Tabs items={dealTypeItems} value={value} onChange={setValue} variant="pills" fullWidth />;
  }
}`,...o.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  render: () => <SegmentedTemplate />
}`,...u.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [value, setValue] = useState('saved');
    return <Tabs items={contentItems} value={value} onChange={setValue} variant="segmented" />;
  }
}`,...c.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  render: () => <UnderlineTemplate />
}`,...i.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: () => {
    const items: TabItem[] = [{
      value: 'all',
      label: 'All',
      count: 28
    }, {
      value: 'new',
      label: 'New',
      count: 16
    }, {
      value: 'used',
      label: 'Used',
      count: 12
    }];
    const [value, setValue] = useState('all');
    return <Tabs items={items} value={value} onChange={setValue} variant="underline" />;
  }
}`,...m.parameters?.docs?.source}}};const E=["Pills","PillsWithIcons","PillsFullWidth","Segmented","SegmentedCompact","Underline","UnderlineWithCounts"];export{r as Pills,o as PillsFullWidth,n as PillsWithIcons,u as Segmented,c as SegmentedCompact,i as Underline,m as UnderlineWithCounts,E as __namedExportsOrder,A as default};
