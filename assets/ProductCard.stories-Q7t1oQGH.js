import{j as r}from"./iframe-CKsQctQx.js";import{v as h,a as w,t as j,s as A}from"./index-BFhOOLG3.js";import"./preload-helper-PPVm8Dsz.js";const C={"best-seller":"Best Seller","editors-choice":"Editor's Choice",sale:"Sale",new:"New"},c=({imageUrl:e,imageAlt:s,title:y,brand:v,badge:f,tag:x,description:T,price:k,originalPrice:b,ctaText:M="Shop Now",href:N="#",onClick:S})=>{const E=R=>{S&&(R.preventDefault(),S())};return r.jsx("article",{className:"product-card",children:r.jsxs("a",{href:N,className:"product-card__link",onClick:E,children:[r.jsxs("div",{className:"product-card__image-container",children:[r.jsx("img",{src:e,alt:s,className:"product-card__image",loading:"lazy"}),f&&r.jsx("span",{className:`product-card__badge product-card__badge--${f}`,children:C[f]})]}),r.jsxs("div",{className:"product-card__content",children:[x&&r.jsx("span",{className:"product-card__tag",children:x}),v&&r.jsx("span",{className:"product-card__brand",children:v}),r.jsx("h3",{className:"product-card__title",children:y}),(k||b)&&r.jsxs("div",{className:"product-card__price-container",children:[k&&r.jsx("span",{className:"product-card__price",children:k}),b&&r.jsx("span",{className:"product-card__original-price",children:b})]}),r.jsx("button",{className:"product-card__cta",type:"button",children:M}),T&&r.jsx("p",{className:"product-card__description",children:T})]})]})})};c.__docgenInfo={description:"",methods:[],displayName:"ProductCard",props:{imageUrl:{required:!0,tsType:{name:"string"},description:"Product image URL"},imageAlt:{required:!0,tsType:{name:"string"},description:"Alt text for the image"},title:{required:!0,tsType:{name:"string"},description:"Product title/name"},brand:{required:!1,tsType:{name:"string"},description:"Brand name"},badge:{required:!1,tsType:{name:"union",raw:"'best-seller' | 'editors-choice' | 'sale' | 'new' | null",elements:[{name:"literal",value:"'best-seller'"},{name:"literal",value:"'editors-choice'"},{name:"literal",value:"'sale'"},{name:"literal",value:"'new'"},{name:"null"}]},description:"Badge type for product"},tag:{required:!1,tsType:{name:"string"},description:"Custom tag/label text"},description:{required:!1,tsType:{name:"string"},description:"Product description"},price:{required:!1,tsType:{name:"string"},description:"Price display"},originalPrice:{required:!1,tsType:{name:"string"},description:"Original price (for sale items)"},ctaText:{required:!1,tsType:{name:"string"},description:"CTA button text",defaultValue:{value:"'Shop Now'",computed:!1}},href:{required:!1,tsType:{name:"string"},description:"Link URL",defaultValue:{value:"'#'",computed:!1}},onClick:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"Optional click handler"}}};const a=h.find(e=>e.make==="Tesla"&&e.model==="Model Y"),i=h.find(e=>e.make==="Ford"&&e.model==="Mustang Mach-E"),d=h.find(e=>e.make==="Jeep"&&e.model==="Grand Cherokee"),t=h.find(e=>e.make==="Rivian"&&e.model==="R1T"),V={title:"Resin Components/ProductCard",component:c,parameters:{layout:"padded",docs:{description:{component:`
## Product Card

A product card component inspired by Hearst's Resin design system.
Used in 4-across product grids for showcasing vehicles and automotive products.

### Features
- Product image with hover zoom effect
- Badge overlays (Best Seller, Editor's Choice, Sale, New)
- Custom tag labels
- Brand attribution
- Price display with sale pricing support
- Customizable CTA button
- Optional product description

### Usage
\`\`\`tsx
import { vehicleDatabase } from '../../data/vehicles';

const vehicle = vehicleDatabase.find(v => v.make === 'Tesla' && v.model === 'Model Y');

<ProductCard
  imageUrl={vehicle?.image || ''}
  imageAlt="Tesla Model Y"
  title="2025 Tesla Model Y"
  brand="Tesla"
  badge="editors-choice"
  tag="EV"
  price={vehicle?.priceRange}
  ctaText="View Details"
  href="/vehicles/tesla-model-y"
/>
\`\`\`
        `}}},tags:["autodocs"],argTypes:{badge:{control:"select",options:[null,"best-seller","editors-choice","sale","new"],description:"Badge type for product"}}},o={args:{imageUrl:a?.image||"",imageAlt:`${a?.year} ${a?.make} ${a?.model}`,title:`${a?.year} ${a?.make} ${a?.model}`,brand:a?.make,badge:"editors-choice",tag:"Electric SUV",price:a?.priceRange,description:`${a?.horsepower||0} HP | ${a?.drivetrain} | ${a?.mpg||"N/A"}`,ctaText:"View Details"},decorators:[e=>r.jsx("div",{style:{backgroundColor:"#F5F5F5",padding:"24px",minHeight:"100vh"},children:r.jsx(e,{})})]},n={args:{imageUrl:i?.image||"",imageAlt:`${i?.year} ${i?.make} ${i?.model}`,title:`${i?.year} ${i?.make} ${i?.model}`,brand:i?.make,badge:"best-seller",tag:"Electric SUV",price:i?.priceRange,description:`${i?.horsepower||0} HP | ${i?.drivetrain}`,ctaText:"Shop Now"}},l={args:{imageUrl:t?.image||"",imageAlt:`${t?.year} ${t?.make} ${t?.model}`,title:`${t?.year} ${t?.make} ${t?.model}`,brand:t?.make,badge:"new",tag:"Electric Truck",price:t?.priceRange,description:"Adventure-Ready Electric Pickup",ctaText:"Learn More"}},m={args:{imageUrl:d?.image||"",imageAlt:`${d?.year} ${d?.make} ${d?.model}`,title:`${d?.year} ${d?.make} ${d?.model}`,brand:d?.make,badge:"sale",tag:"4x4 SUV",price:"$54,995",originalPrice:"$58,995",description:"Limited Time Offer - Save $4,000",ctaText:"Get Offer"}},p={render:()=>r.jsx("div",{className:"product-card-grid product-card-grid--four-across",style:{maxWidth:"1200px"},children:w.slice(0,4).map((e,s)=>r.jsx(c,{imageUrl:e.image,imageAlt:`${e.year} ${e.make} ${e.model}`,title:`${e.year} ${e.make} ${e.model}`,brand:e.make,badge:e.editorsChoice?"editors-choice":e.tenBest?"best-seller":s===0?"new":null,tag:e.fuelType==="Electric"?"EV":e.fuelType==="Hybrid"?"Hybrid":e.bodyStyle,price:e.priceRange,description:`${e.horsepower||"N/A"} HP | ${e.drivetrain}`,ctaText:"View Details"},e.id))})},g={render:()=>r.jsx("div",{className:"product-card-grid product-card-grid--four-across",style:{maxWidth:"1200px"},children:j.slice(0,4).map((e,s)=>{const y=["best-seller","editors-choice","sale","new"];return r.jsx(c,{imageUrl:e.image,imageAlt:`${e.year} ${e.make} ${e.model}`,title:`${e.year} ${e.make} ${e.model}`,brand:e.make,badge:y[s],tag:e.fuelType==="Electric"?"Electric Truck":"Pickup Truck",price:e.priceRange,originalPrice:s===2?"$55,995":void 0,description:`${e.horsepower||"N/A"} HP | ${e.drivetrain} | ${e.mpg||"N/A"}`,ctaText:s===2?"Get Offer":"Shop Now"},e.id)})})},u={render:()=>r.jsx("div",{className:"product-card-grid product-card-grid--four-across",style:{maxWidth:"1200px"},children:A.slice(0,8).map(e=>r.jsx(c,{imageUrl:e.image,imageAlt:`${e.year} ${e.make} ${e.model}`,title:`${e.year} ${e.make} ${e.model}`,brand:e.make,badge:e.editorsChoice?"editors-choice":e.tenBest?"best-seller":null,tag:e.fuelType==="Electric"?"EV":e.fuelType==="Hybrid"?"Hybrid":"Sedan",price:e.priceRange,description:`Staff Rating: ${e.staffRating}/10`,ctaText:"View Details"},e.id))})},$={render:()=>r.jsx("div",{className:"product-card-grid product-card-grid--four-across",style:{maxWidth:"1200px"},children:w.slice(4,8).map(e=>r.jsx(c,{imageUrl:e.image,imageAlt:`${e.year} ${e.make} ${e.model}`,title:`${e.year} ${e.make} ${e.model}`,brand:e.make,price:e.priceRange,ctaText:"Learn More"},e.id))})};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    imageUrl: teslaModelY?.image || '',
    imageAlt: \`\${teslaModelY?.year} \${teslaModelY?.make} \${teslaModelY?.model}\`,
    title: \`\${teslaModelY?.year} \${teslaModelY?.make} \${teslaModelY?.model}\`,
    brand: teslaModelY?.make,
    badge: 'editors-choice',
    tag: 'Electric SUV',
    price: teslaModelY?.priceRange,
    description: \`\${teslaModelY?.horsepower || 0} HP | \${teslaModelY?.drivetrain} | \${teslaModelY?.mpg || 'N/A'}\`,
    ctaText: 'View Details'
  },
  decorators: [Story => <div style={{
    backgroundColor: '#F5F5F5',
    padding: '24px',
    minHeight: '100vh'
  }}>
        <Story />
      </div>]
}`,...o.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:"{\n  args: {\n    imageUrl: fordMachE?.image || '',\n    imageAlt: `${fordMachE?.year} ${fordMachE?.make} ${fordMachE?.model}`,\n    title: `${fordMachE?.year} ${fordMachE?.make} ${fordMachE?.model}`,\n    brand: fordMachE?.make,\n    badge: 'best-seller',\n    tag: 'Electric SUV',\n    price: fordMachE?.priceRange,\n    description: `${fordMachE?.horsepower || 0} HP | ${fordMachE?.drivetrain}`,\n    ctaText: 'Shop Now'\n  }\n}",...n.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    imageUrl: rivianR1T?.image || '',
    imageAlt: \`\${rivianR1T?.year} \${rivianR1T?.make} \${rivianR1T?.model}\`,
    title: \`\${rivianR1T?.year} \${rivianR1T?.make} \${rivianR1T?.model}\`,
    brand: rivianR1T?.make,
    badge: 'new',
    tag: 'Electric Truck',
    price: rivianR1T?.priceRange,
    description: 'Adventure-Ready Electric Pickup',
    ctaText: 'Learn More'
  }
}`,...l.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    imageUrl: jeepGrandCherokee?.image || '',
    imageAlt: \`\${jeepGrandCherokee?.year} \${jeepGrandCherokee?.make} \${jeepGrandCherokee?.model}\`,
    title: \`\${jeepGrandCherokee?.year} \${jeepGrandCherokee?.make} \${jeepGrandCherokee?.model}\`,
    brand: jeepGrandCherokee?.make,
    badge: 'sale',
    tag: '4x4 SUV',
    price: '$54,995',
    originalPrice: '$58,995',
    description: 'Limited Time Offer - Save $4,000',
    ctaText: 'Get Offer'
  }
}`,...m.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:"{\n  render: () => <div className=\"product-card-grid product-card-grid--four-across\" style={{\n    maxWidth: '1200px'\n  }}>\n      {suvs.slice(0, 4).map((vehicle, index) => <ProductCard key={vehicle.id} imageUrl={vehicle.image} imageAlt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`} title={`${vehicle.year} ${vehicle.make} ${vehicle.model}`} brand={vehicle.make} badge={vehicle.editorsChoice ? 'editors-choice' : vehicle.tenBest ? 'best-seller' : index === 0 ? 'new' : null} tag={vehicle.fuelType === 'Electric' ? 'EV' : vehicle.fuelType === 'Hybrid' ? 'Hybrid' : vehicle.bodyStyle} price={vehicle.priceRange} description={`${vehicle.horsepower || 'N/A'} HP | ${vehicle.drivetrain}`} ctaText=\"View Details\" />)}\n    </div>\n}",...p.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:"{\n  render: () => <div className=\"product-card-grid product-card-grid--four-across\" style={{\n    maxWidth: '1200px'\n  }}>\n      {trucks.slice(0, 4).map((vehicle, index) => {\n      const badges: Array<'best-seller' | 'editors-choice' | 'sale' | 'new' | null> = ['best-seller', 'editors-choice', 'sale', 'new'];\n      return <ProductCard key={vehicle.id} imageUrl={vehicle.image} imageAlt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`} title={`${vehicle.year} ${vehicle.make} ${vehicle.model}`} brand={vehicle.make} badge={badges[index]} tag={vehicle.fuelType === 'Electric' ? 'Electric Truck' : 'Pickup Truck'} price={vehicle.priceRange} originalPrice={index === 2 ? '$55,995' : undefined} description={`${vehicle.horsepower || 'N/A'} HP | ${vehicle.drivetrain} | ${vehicle.mpg || 'N/A'}`} ctaText={index === 2 ? 'Get Offer' : 'Shop Now'} />;\n    })}\n    </div>\n}",...g.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:"{\n  render: () => <div className=\"product-card-grid product-card-grid--four-across\" style={{\n    maxWidth: '1200px'\n  }}>\n      {sedans.slice(0, 8).map(vehicle => <ProductCard key={vehicle.id} imageUrl={vehicle.image} imageAlt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`} title={`${vehicle.year} ${vehicle.make} ${vehicle.model}`} brand={vehicle.make} badge={vehicle.editorsChoice ? 'editors-choice' : vehicle.tenBest ? 'best-seller' : null} tag={vehicle.fuelType === 'Electric' ? 'EV' : vehicle.fuelType === 'Hybrid' ? 'Hybrid' : 'Sedan'} price={vehicle.priceRange} description={`Staff Rating: ${vehicle.staffRating}/10`} ctaText=\"View Details\" />)}\n    </div>\n}",...u.parameters?.docs?.source}}};$.parameters={...$.parameters,docs:{...$.parameters?.docs,source:{originalSource:'{\n  render: () => <div className="product-card-grid product-card-grid--four-across" style={{\n    maxWidth: \'1200px\'\n  }}>\n      {suvs.slice(4, 8).map(vehicle => <ProductCard key={vehicle.id} imageUrl={vehicle.image} imageAlt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`} title={`${vehicle.year} ${vehicle.make} ${vehicle.model}`} brand={vehicle.make} price={vehicle.priceRange} ctaText="Learn More" />)}\n    </div>\n}',...$.parameters?.docs?.source}}};const H=["Default","BestSeller","NewModel","OnSale","FourAcrossGrid","MixedBadges","SedanShowcase","MinimalStyle"];export{n as BestSeller,o as Default,p as FourAcrossGrid,$ as MinimalStyle,g as MixedBadges,l as NewModel,m as OnSale,u as SedanShowcase,H as __namedExportsOrder,V as default};
