import{j as r}from"./iframe-BDwDJx5t.js";import{B as e}from"./Button-080LYAJV.js";import{M as j}from"./mail-0CaNENLx.js";import{A as z}from"./arrow-right-CSZ85atK.js";import{H as D}from"./heart-DFJQlgJk.js";import{c as L}from"./createLucideIcon-nvcdPmaH.js";import{P as b}from"./plus-BkV4RveR.js";import"./preload-helper-PPVm8Dsz.js";const O=[["path",{d:"M12 15V3",key:"m9g1x1"}],["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["path",{d:"m7 10 5 5 5-5",key:"brsn70"}]],A=L("download",O),{fn:R}=__STORYBOOK_MODULE_TEST__,E={title:"Atoms/Button",component:e,parameters:{layout:"centered",docs:{description:{component:"Primary button component with multiple variants, sizes, and states."}}},tags:["autodocs"],argTypes:{variant:{control:"select",options:["primary","secondary","outline","ghost","danger","success"]},size:{control:"select",options:["small","medium","large"]},disabled:{control:"boolean"},loading:{control:"boolean"},fullWidth:{control:"boolean"}},args:{onClick:R()},decorators:[(f,I)=>r.jsx("div",{style:{width:I.args.fullWidth?"400px":"auto"},children:r.jsx(f,{})})]},a={args:{children:"Primary Button",variant:"primary"}},s={args:{children:"Secondary Button",variant:"secondary"}},n={args:{children:"Outline Button",variant:"outline"}},t={args:{children:"Ghost Button",variant:"ghost"}},o={args:{children:"Delete Item",variant:"danger"}},i={args:{children:"Get Your Trade-In Value",variant:"success"},parameters:{docs:{description:{story:"Green success variant used for Trade-In CTA buttons."}}}},c={args:{children:"Button on Dark",variant:"outline"},parameters:{backgrounds:{default:"dark"}}},d={args:{children:"Small",size:"small"}},l={args:{children:"Medium",size:"medium"}},u={args:{children:"Large",size:"large"}},m={args:{children:"Send Email",iconLeft:r.jsx(j,{size:16})}},p={args:{children:"Continue",iconRight:r.jsx(z,{size:16})}},g={args:{children:r.jsx(D,{size:18}),"aria-label":"Add to favorites"}},h={args:{children:"Loading...",loading:!0}},x={args:{children:"Disabled",disabled:!0}},y={args:{children:"Full Width Button",fullWidth:!0},decorators:[f=>r.jsx("div",{style:{width:"400px"},children:r.jsx(f,{})})]},v={render:()=>r.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"16px",alignItems:"flex-start"},children:[r.jsx(e,{variant:"primary",children:"Primary"}),r.jsx(e,{variant:"secondary",children:"Secondary"}),r.jsx(e,{variant:"outline",children:"Outline"}),r.jsx(e,{variant:"ghost",children:"Ghost"}),r.jsx(e,{variant:"danger",children:"Danger"}),r.jsx(e,{variant:"success",children:"Success (Trade-In)"})]})},S={render:()=>r.jsxs("div",{style:{display:"flex",gap:"16px",alignItems:"center"},children:[r.jsx(e,{size:"small",children:"Small"}),r.jsx(e,{size:"medium",children:"Medium"}),r.jsx(e,{size:"large",children:"Large"})]})},B={render:()=>r.jsxs("div",{style:{display:"flex",gap:"16px",alignItems:"center"},children:[r.jsx(e,{iconLeft:r.jsx(j,{size:16}),children:"Email"}),r.jsx(e,{iconRight:r.jsx(z,{size:16}),children:"Next"}),r.jsx(e,{iconLeft:r.jsx(A,{size:16}),iconRight:r.jsx(z,{size:16}),children:"Download"}),r.jsx(e,{children:r.jsx(b,{size:18})})]})};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'Primary Button',
    variant: 'primary'
  }
}`,...a.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'Secondary Button',
    variant: 'secondary'
  }
}`,...s.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'Outline Button',
    variant: 'outline'
  }
}`,...n.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'Ghost Button',
    variant: 'ghost'
  }
}`,...t.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'Delete Item',
    variant: 'danger'
  }
}`,...o.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'Get Your Trade-In Value',
    variant: 'success'
  },
  parameters: {
    docs: {
      description: {
        story: 'Green success variant used for Trade-In CTA buttons.'
      }
    }
  }
}`,...i.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'Button on Dark',
    variant: 'outline'
  },
  parameters: {
    backgrounds: {
      default: 'dark'
    }
  }
}`,...c.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'Small',
    size: 'small'
  }
}`,...d.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'Medium',
    size: 'medium'
  }
}`,...l.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'Large',
    size: 'large'
  }
}`,...u.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'Send Email',
    iconLeft: <Mail size={16} />
  }
}`,...m.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'Continue',
    iconRight: <ArrowRight size={16} />
  }
}`,...p.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    children: <Heart size={18} />,
    'aria-label': 'Add to favorites'
  }
}`,...g.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'Loading...',
    loading: true
  }
}`,...h.parameters?.docs?.source}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'Disabled',
    disabled: true
  }
}`,...x.parameters?.docs?.source}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'Full Width Button',
    fullWidth: true
  },
  decorators: [Story => <div style={{
    width: '400px'
  }}><Story /></div>]
}`,...y.parameters?.docs?.source}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    alignItems: 'flex-start'
  }}>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="danger">Danger</Button>
      <Button variant="success">Success (Trade-In)</Button>
    </div>
}`,...v.parameters?.docs?.source}}};S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    gap: '16px',
    alignItems: 'center'
  }}>
      <Button size="small">Small</Button>
      <Button size="medium">Medium</Button>
      <Button size="large">Large</Button>
    </div>
}`,...S.parameters?.docs?.source}}};B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    gap: '16px',
    alignItems: 'center'
  }}>
      <Button iconLeft={<Mail size={16} />}>Email</Button>
      <Button iconRight={<ArrowRight size={16} />}>Next</Button>
      <Button iconLeft={<Download size={16} />} iconRight={<ArrowRight size={16} />}>Download</Button>
      <Button><Plus size={18} /></Button>
    </div>
}`,...B.parameters?.docs?.source}}};const C=["Primary","Secondary","Outline","Ghost","Danger","Success","OnDark","Small","Medium","Large","WithIconLeft","WithIconRight","IconOnly","Loading","Disabled","FullWidth","AllVariants","AllSizes","WithIcons"];export{S as AllSizes,v as AllVariants,o as Danger,x as Disabled,y as FullWidth,t as Ghost,g as IconOnly,u as Large,h as Loading,l as Medium,c as OnDark,n as Outline,a as Primary,s as Secondary,d as Small,i as Success,m as WithIconLeft,p as WithIconRight,B as WithIcons,C as __namedExportsOrder,E as default};
