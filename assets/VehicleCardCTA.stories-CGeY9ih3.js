import{j as o}from"./iframe-C2Wzpo-O.js";import{V as i}from"./VehicleCard-BXpHwl6z.js";import"./preload-helper-PPVm8Dsz.js";import"./OptimizedImage-B5dzNuHV.js";import"./Button-D6NhDtLu.js";import"./SignInToSaveModal-B6srfKU7.js";import"./index-W5sI4W0O.js";import"./index-Cr3EaoYQ.js";import"./x-DesiaY3B.js";import"./createLucideIcon-ByvCI8r-.js";import"./bookmark-CRaz5WFf.js";import"./file-text-CsVQ_CRO.js";import"./map-pin-BC_iCAFH.js";import"./chevron-up-O71_Nkrw.js";import"./chevron-right-C2buakh5.js";import"./chevron-down-Bmansu48.js";const{fn:t}=__STORYBOOK_MODULE_TEST__,S={title:"Molecules/VehicleCard/CTA Playground",parameters:{layout:"centered",docs:{description:{component:"Interactive playground for testing CTA button configurations on vehicle cards."}}},tags:["autodocs"],decorators:[a=>o.jsx("div",{style:{width:"380px"},children:o.jsx(a,{})})],argTypes:{cta1Text:{name:"CTA 1 Text",control:"text",description:"Text displayed on the first CTA button",table:{category:"🎯 CTA Configuration",defaultValue:{summary:"SHOP NEW"}}},cta1Variant:{name:"CTA 1 Variant",control:"select",options:["primary","outline","secondary","success","success-outline","danger"],description:"Color variant for the first CTA button",table:{category:"🎯 CTA Configuration",defaultValue:{summary:"primary"}}},showCta2:{name:"Show CTA 2",control:"boolean",description:"Toggle to show or hide the second CTA button",table:{category:"🎯 CTA Configuration",defaultValue:{summary:"true"}}},cta2Text:{name:"CTA 2 Text",control:"text",description:"Text displayed on the second CTA button",table:{category:"🎯 CTA Configuration",defaultValue:{summary:"GET TRADE-IN VALUE"}}},cta2Variant:{name:"CTA 2 Variant",control:"select",options:["primary","outline","secondary","success","success-outline","danger"],description:"Color variant for the second CTA button",table:{category:"🎯 CTA Configuration",defaultValue:{summary:"success-outline"}}},name:{name:"Vehicle Name",control:"text",table:{category:"📋 Vehicle Info"}},price:{name:"Price",control:"text",table:{category:"📋 Vehicle Info"}},rating:{name:"Rating",control:{type:"number",min:1,max:10,step:.1},table:{category:"📋 Vehicle Info"}}}},c={args:{name:"2026 Honda Accord",price:"$27,295",rating:9.9,cta1Text:"SHOP NEW ACCORD",cta1Variant:"primary",showCta2:!0,cta2Text:"GET TRADE-IN VALUE",cta2Variant:"success-outline"},render:a=>{const e=[{text:a.cta1Text,variant:a.cta1Variant,onClick:t()},...a.showCta2?[{text:a.cta2Text,variant:a.cta2Variant,onClick:t()}]:[]];return o.jsx(i,{id:"cta-playground",name:a.name,slug:"honda/accord/2026",image:"https://d2kde5ohu8qb21.cloudfront.net/files/679d37b47ff34400082301e7/19-2025-honda-accord-front-view.jpg",price:a.price,priceLabel:"Starting at",rating:a.rating,epaMpg:48,cdSays:"Read our 2026 Honda Accord review for information on ratings, pricing, specs, and features.",availableYears:[2026,2025,2024],ctas:e})}},r={args:{name:"2026 Honda Accord",price:"$27,295",rating:9.9,cta1Text:"SHOP NEW",cta1Variant:"primary",showCta2:!0,cta2Text:"SHOP USED",cta2Variant:"outline"},render:a=>{const e=[{text:a.cta1Text,variant:a.cta1Variant,onClick:t()},...a.showCta2?[{text:a.cta2Text,variant:a.cta2Variant,onClick:t()}]:[]];return o.jsx(i,{id:"shop-new-used",name:a.name,slug:"honda/accord/2026",image:"https://d2kde5ohu8qb21.cloudfront.net/files/679d37b47ff34400082301e7/19-2025-honda-accord-front-view.jpg",price:a.price,priceLabel:"Starting at",rating:a.rating,epaMpg:48,cdSays:"Read our 2026 Honda Accord review for information on ratings, pricing, specs, and features.",availableYears:[2026,2025,2024],ctas:e})}},n={args:{name:"2026 Honda Accord",price:"$27,295",rating:9.9,cta1Text:"SHOP NOW",cta1Variant:"outline",showCta2:!1,cta2Text:"",cta2Variant:"secondary"},render:a=>{const e=[{text:a.cta1Text,variant:a.cta1Variant,onClick:t()},...a.showCta2&&a.cta2Text?[{text:a.cta2Text,variant:a.cta2Variant,onClick:t()}]:[]];return o.jsx(i,{id:"single-cta",name:a.name,slug:"honda/accord/2026",image:"https://d2kde5ohu8qb21.cloudfront.net/files/679d37b47ff34400082301e7/19-2025-honda-accord-front-view.jpg",price:a.price,priceLabel:"Starting at",rating:a.rating,epaMpg:48,cdSays:"Read our 2026 Honda Accord review for information on ratings, pricing, specs, and features.",availableYears:[2026,2025,2024],ctas:e})}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    name: '2026 Honda Accord',
    price: '$27,295',
    rating: 9.9,
    cta1Text: 'SHOP NEW ACCORD',
    cta1Variant: 'primary',
    showCta2: true,
    cta2Text: 'GET TRADE-IN VALUE',
    cta2Variant: 'success-outline'
  },
  render: args => {
    const ctas = [{
      text: args.cta1Text,
      variant: args.cta1Variant,
      onClick: fn()
    }, ...(args.showCta2 ? [{
      text: args.cta2Text,
      variant: args.cta2Variant,
      onClick: fn()
    }] : [])];
    return <VehicleCard id="cta-playground" name={args.name} slug="honda/accord/2026" image="https://d2kde5ohu8qb21.cloudfront.net/files/679d37b47ff34400082301e7/19-2025-honda-accord-front-view.jpg" price={args.price} priceLabel="Starting at" rating={args.rating} epaMpg={48} cdSays="Read our 2026 Honda Accord review for information on ratings, pricing, specs, and features." availableYears={[2026, 2025, 2024]} ctas={ctas} />;
  }
}`,...c.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    name: '2026 Honda Accord',
    price: '$27,295',
    rating: 9.9,
    cta1Text: 'SHOP NEW',
    cta1Variant: 'primary',
    showCta2: true,
    cta2Text: 'SHOP USED',
    cta2Variant: 'outline'
  },
  render: args => {
    const ctas = [{
      text: args.cta1Text,
      variant: args.cta1Variant,
      onClick: fn()
    }, ...(args.showCta2 ? [{
      text: args.cta2Text,
      variant: args.cta2Variant,
      onClick: fn()
    }] : [])];
    return <VehicleCard id="shop-new-used" name={args.name} slug="honda/accord/2026" image="https://d2kde5ohu8qb21.cloudfront.net/files/679d37b47ff34400082301e7/19-2025-honda-accord-front-view.jpg" price={args.price} priceLabel="Starting at" rating={args.rating} epaMpg={48} cdSays="Read our 2026 Honda Accord review for information on ratings, pricing, specs, and features." availableYears={[2026, 2025, 2024]} ctas={ctas} />;
  }
}`,...r.parameters?.docs?.source},description:{story:"Pre-configured example: Shop New + Shop Used",...r.parameters?.docs?.description}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    name: '2026 Honda Accord',
    price: '$27,295',
    rating: 9.9,
    cta1Text: 'SHOP NOW',
    cta1Variant: 'outline',
    showCta2: false,
    cta2Text: '',
    cta2Variant: 'secondary'
  },
  render: args => {
    const ctas = [{
      text: args.cta1Text,
      variant: args.cta1Variant,
      onClick: fn()
    }, ...(args.showCta2 && args.cta2Text ? [{
      text: args.cta2Text,
      variant: args.cta2Variant,
      onClick: fn()
    }] : [])];
    return <VehicleCard id="single-cta" name={args.name} slug="honda/accord/2026" image="https://d2kde5ohu8qb21.cloudfront.net/files/679d37b47ff34400082301e7/19-2025-honda-accord-front-view.jpg" price={args.price} priceLabel="Starting at" rating={args.rating} epaMpg={48} cdSays="Read our 2026 Honda Accord review for information on ratings, pricing, specs, and features." availableYears={[2026, 2025, 2024]} ctas={ctas} />;
  }
}`,...n.parameters?.docs?.source},description:{story:"Pre-configured example: Single CTA",...n.parameters?.docs?.description}}};const v=["Playground","ShopNewAndUsed","SingleCTA"];export{c as Playground,r as ShopNewAndUsed,n as SingleCTA,v as __namedExportsOrder,S as default};
