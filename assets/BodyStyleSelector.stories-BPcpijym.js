import{j as e,r as c}from"./iframe-BblhGOlV.js";import{B as n}from"./BodyStyleSelector-DOdQPKbj.js";import"./preload-helper-PPVm8Dsz.js";import"./chevron-left-DpT6D7tH.js";import"./createLucideIcon-BwuURKR7.js";import"./chevron-right-Z0UjaLmE.js";const x={title:"Molecules/BodyStyleSelector",component:n,parameters:{layout:"padded",docs:{description:{component:`
# Body Style Selector

A carousel component for selecting vehicle body styles. Features smooth scrolling and multiple visual variants.
        `}}},tags:["autodocs"],argTypes:{variant:{control:"select",options:["minimal","pills"],description:"Visual style variant",table:{category:"Appearance",defaultValue:{summary:"minimal"}}},multiSelect:{control:"boolean",description:"Allow multiple selections",table:{category:"Behavior",defaultValue:{summary:"false"}}}}},p=({variant:i})=>{const[l,o]=c.useState("suvs");return e.jsx(n,{variant:i,selectedId:l,onSelect:m=>o(m.id)})},d=({variant:i})=>{const[l,o]=c.useState(["suvs","sedans"]);return e.jsx(n,{variant:i,multiSelect:!0,selectedIds:l,onMultiSelect:o})},t={render:()=>e.jsx(p,{variant:"minimal"})},r={render:()=>e.jsx(p,{variant:"pills"})},s={render:()=>e.jsx(d,{variant:"minimal"})},a={render:()=>e.jsx(d,{variant:"pills"})};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  render: () => <SingleSelectWrapper variant="minimal" />
}`,...t.parameters?.docs?.source},description:{story:`Minimal variant - Borderless design with subtle backgrounds.
Great for embedding in existing layouts without visual clutter.`,...t.parameters?.docs?.description}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  render: () => <SingleSelectWrapper variant="pills" />
}`,...r.parameters?.docs?.source},description:{story:`Pills variant - Compact horizontal pills for space-constrained layouts.
Selected state inverts colors for clear visual feedback.`,...r.parameters?.docs?.description}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: () => <MultiSelectWrapper variant="minimal" />
}`,...s.parameters?.docs?.source},description:{story:"Minimal with multi-select mode",...s.parameters?.docs?.description}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: () => <MultiSelectWrapper variant="pills" />
}`,...a.parameters?.docs?.source},description:{story:"Pills with multi-select mode",...a.parameters?.docs?.description}}};const f=["Minimal","Pills","MinimalMultiSelect","PillsMultiSelect"];export{t as Minimal,s as MinimalMultiSelect,r as Pills,a as PillsMultiSelect,f as __namedExportsOrder,x as default};
