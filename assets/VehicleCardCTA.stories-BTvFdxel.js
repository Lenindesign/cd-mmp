import{j as o}from"./iframe-mRuCM7Wp.js";import{V as i}from"./VehicleCard-DIKmUkBz.js";import"./preload-helper-PPVm8Dsz.js";import"./OptimizedImage-CBejr1zq.js";import"./Button-CCKi9dyN.js";import"./SignInToSaveModal-E89x8jfg.js";import"./index-rdb25syk.js";import"./index-CrQenS4P.js";import"./x-D7g2fkVG.js";import"./createLucideIcon-gXBQtdYV.js";import"./bookmark-pL7yK9_u.js";import"./file-text-D9ozzKzv.js";import"./map-pin-OUFXRVEB.js";import"./chevron-up-CMxcF2Es.js";import"./chevron-right-gFkct_4X.js";import"./chevron-down-DyJctj0T.js";const{fn:t}=__STORYBOOK_MODULE_TEST__,S={title:"Molecules/VehicleCard/CTA Playground",parameters:{layout:"centered",docs:{description:{component:"Interactive playground for testing CTA button configurations on vehicle cards."}}},tags:["autodocs"],decorators:[a=>o.jsx("div",{style:{width:"380px"},children:o.jsx(a,{})})],argTypes:{cta1Text:{name:"CTA 1 Text",control:"text",description:"Text displayed on the first CTA button",table:{category:"🎯 CTA Configuration",defaultValue:{summary:"SHOP NEW"}}},cta1Variant:{name:"CTA 1 Variant",control:"select",options:["primary","outline","secondary","success","success-outline","danger"],description:"Color variant for the first CTA button",table:{category:"🎯 CTA Configuration",defaultValue:{summary:"primary"}}},showCta2:{name:"Show CTA 2",control:"boolean",description:"Toggle to show or hide the second CTA button",table:{category:"🎯 CTA Configuration",defaultValue:{summary:"true"}}},cta2Text:{name:"CTA 2 Text",control:"text",description:"Text displayed on the second CTA button",table:{category:"🎯 CTA Configuration",defaultValue:{summary:"GET TRADE-IN VALUE"}}},cta2Variant:{name:"CTA 2 Variant",control:"select",options:["primary","outline","secondary","success","success-outline","danger"],description:"Color variant for the second CTA button",table:{category:"🎯 CTA Configuration",defaultValue:{summary:"success-outline"}}},name:{name:"Vehicle Name",control:"text",table:{category:"📋 Vehicle Info"}},price:{name:"Price",control:"text",table:{category:"📋 Vehicle Info"}},rating:{name:"Rating",control:{type:"number",min:1,max:10,step:.1},table:{category:"📋 Vehicle Info"}}}},c={args:{name:"2026 Honda Accord",price:"$27,295",rating:9.9,cta1Text:"SHOP NEW ACCORD",cta1Variant:"primary",showCta2:!0,cta2Text:"GET TRADE-IN VALUE",cta2Variant:"success-outline"},render:a=>{const e=[{text:a.cta1Text,variant:a.cta1Variant,onClick:t()},...a.showCta2?[{text:a.cta2Text,variant:a.cta2Variant,onClick:t()}]:[]];return o.jsx(i,{id:"cta-playground",name:a.name,slug:"honda/accord/2026",image:"https://d2kde5ohu8qb21.cloudfront.net/files/679d37b47ff34400082301e7/19-2025-honda-accord-front-view.jpg",price:a.price,priceLabel:"Starting at",rating:a.rating,epaMpg:48,cdSays:"Read our 2026 Honda Accord review for information on ratings, pricing, specs, and features.",availableYears:[2026,2025,2024],ctas:e})}},r={args:{name:"2026 Honda Accord",price:"$27,295",rating:9.9,cta1Text:"SHOP NEW",cta1Variant:"primary",showCta2:!0,cta2Text:"SHOP USED",cta2Variant:"outline"},render:a=>{const e=[{text:a.cta1Text,variant:a.cta1Variant,onClick:t()},...a.showCta2?[{text:a.cta2Text,variant:a.cta2Variant,onClick:t()}]:[]];return o.jsx(i,{id:"shop-new-used",name:a.name,slug:"honda/accord/2026",image:"https://d2kde5ohu8qb21.cloudfront.net/files/679d37b47ff34400082301e7/19-2025-honda-accord-front-view.jpg",price:a.price,priceLabel:"Starting at",rating:a.rating,epaMpg:48,cdSays:"Read our 2026 Honda Accord review for information on ratings, pricing, specs, and features.",availableYears:[2026,2025,2024],ctas:e})}},n={args:{name:"2026 Honda Accord",price:"$27,295",rating:9.9,cta1Text:"SHOP NOW",cta1Variant:"outline",showCta2:!1,cta2Text:"",cta2Variant:"secondary"},render:a=>{const e=[{text:a.cta1Text,variant:a.cta1Variant,onClick:t()},...a.showCta2&&a.cta2Text?[{text:a.cta2Text,variant:a.cta2Variant,onClick:t()}]:[]];return o.jsx(i,{id:"single-cta",name:a.name,slug:"honda/accord/2026",image:"https://d2kde5ohu8qb21.cloudfront.net/files/679d37b47ff34400082301e7/19-2025-honda-accord-front-view.jpg",price:a.price,priceLabel:"Starting at",rating:a.rating,epaMpg:48,cdSays:"Read our 2026 Honda Accord review for information on ratings, pricing, specs, and features.",availableYears:[2026,2025,2024],ctas:e})}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
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
