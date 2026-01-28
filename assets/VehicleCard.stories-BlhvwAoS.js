import{j as e}from"./iframe-uGVaIJRM.js";import{V}from"./VehicleCard-DimvqHpk.js";import"./preload-helper-PPVm8Dsz.js";import"./OptimizedImage-Dy_3BUMK.js";import"./Button-CsVoKH5A.js";import"./SignInToSaveModal-CR0auE1W.js";import"./index-B8Y5qSez.js";import"./index-BGc1vmlk.js";import"./x-CWmK8CiQ.js";import"./createLucideIcon-BsHtCPy9.js";import"./bookmark-BSwOyg4P.js";import"./file-text-Bhy17qkv.js";import"./map-pin-D4VEAlav.js";import"./chevron-up-DesBnSWD.js";import"./chevron-right-CzbDPFr4.js";import"./chevron-down-dd2Q0KPd.js";const{fn:R}=__STORYBOOK_MODULE_TEST__,F={title:"Molecules/VehicleCard",component:V,parameters:{layout:"padded",docs:{description:{component:`
# VehicleCard

Card component for displaying vehicle information in lists, grids, and carousels.

---

## Variants

| Variant | Use Case |
|---------|----------|
| **Standard** | Basic card with rating, price, and badges |
| **Enhanced (Lora)** | Rich card with Lora serif typography, EPA MPG, C/D Says section |
| **Used Vehicle** | Shows mileage, dealer info, and distance |
| **Ranked** | Shows rank number for Top 10 lists |
| **With Shop CTA** | Includes shop button for purchase flow |
| **Next Vehicle** | Horizontal card with header banner for showcasing recommended vehicles |

---

## Enhanced Card (Lora Typography)

The enhanced variant uses **Lora** serif font for a premium editorial feel. It includes:

- **C/D Rating** with "C/D RATING" label
- **EPA MPG** combined fuel economy
- **C/D SAYS** editorial summary with "Learn More" link
- **EXPAND ALL MODEL YEARS** collapsible section
- **Shop Now** inline button

To enable the enhanced layout, provide any of: \`epaMpg\`, \`cdSays\`, or \`availableYears\`.

---

## Features

- Responsive image with lazy loading
- Editor's Choice and 10Best badge support
- Rank indicator for Top 10 lists
- Rating display with /10 scale
- Used car details (mileage, dealer, distance)
- Optional shop button with click handler

---

## Accessibility

- Semantic link wrapping entire card
- Alt text for vehicle images
- Proper heading hierarchy
- Focus states for interactive elements
        `}}},tags:["autodocs"],decorators:[a=>e.jsx("div",{style:{width:"100%",maxWidth:"380px"},children:e.jsx(a,{})})],argTypes:{name:{control:"text",description:"Vehicle name (make, model, year)",table:{type:{summary:"string"},category:"Content"}},price:{control:"text",description:"Formatted price string",table:{type:{summary:"string"},category:"Content"}},rating:{control:{type:"number",min:1,max:10,step:.5},description:"Vehicle rating out of 10",table:{type:{summary:"number"},category:"Content"}},rank:{control:{type:"number",min:1,max:10},description:"Rank position for Top 10 lists",table:{type:{summary:"number"},category:"Display"}},badge:{control:"select",options:[void 0,"best-value","editors-choice"],description:"Badge type to display",table:{type:{summary:"best-value | editors-choice"},category:"Display"}},editorsChoice:{control:"boolean",description:"Show Editor's Choice icon badge",table:{type:{summary:"boolean"},category:"Badges"}},tenBest:{control:"boolean",description:"Show 10Best icon badge",table:{type:{summary:"boolean"},category:"Badges"}},evOfTheYear:{control:"boolean",description:"Show EV of the Year icon badge",table:{type:{summary:"boolean"},category:"Badges"}},showShopButton:{control:"boolean",description:"Show shop CTA button (legacy - use ctas for multiple buttons)",table:{type:{summary:"boolean"},defaultValue:{summary:"false"},category:"CTA"}},shopButtonText:{control:"text",description:"Custom text for the shop CTA button",table:{type:{summary:"string"},defaultValue:{summary:"Shop Now"},category:"CTA"}},shopButtonVariant:{control:"select",options:["primary","secondary","outline","success","success-outline","danger"],description:"Color variant for the shop CTA button",table:{type:{summary:"primary | secondary | outline | success | success-outline | danger"},defaultValue:{summary:"outline"},category:"CTA"}},ctas:{control:"object",description:"Array of CTA configurations for multiple buttons",table:{type:{summary:"CTAConfig[]"},category:"CTA"}},isCurrentVehicle:{control:"boolean",description:"Highlight as currently selected vehicle",table:{type:{summary:"boolean"},defaultValue:{summary:"false"},category:"State"}}},args:{onShopClick:R()}},r="https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600&h=400&fit=crop",t={args:{id:"1",name:"2025 Honda Accord",slug:"honda/accord/2025",image:r,price:"$28,990",priceLabel:"Starting at",rating:8.5}},n={args:{id:"2",name:"2025 Toyota Camry",slug:"toyota/camry/2025",image:r,price:"$27,070",rating:9}},o={args:{id:"3",name:"2025 BMW 3 Series",slug:"bmw/3-series/2025",image:r,price:"$44,900",rating:8.5,bodyStyle:"Sedan"}},i={args:{id:"4",name:"2025 Mazda CX-5",slug:"mazda/cx-5/2025",image:r,price:"$30,300",rating:9,editorsChoice:!0}},s={args:{id:"5",name:"2025 Porsche 911",slug:"porsche/911/2025",image:r,price:"$115,400",rating:10,tenBest:!0}},c={args:{id:"6",name:"2025 Honda Civic",slug:"honda/civic/2025",image:r,price:"$24,950",rating:9.5,editorsChoice:!0,tenBest:!0,evOfTheYear:!0}},d={args:{id:"7",name:"2025 Kia Forte",slug:"kia/forte/2025",image:r,price:"$20,115",rating:7.5,badge:"best-value"}},p={args:{id:"8",name:"2025 Honda Accord",slug:"honda/accord/2025",image:r,price:"$28,990",rating:9.5,rank:1}},l={args:{id:"9",name:"2025 Toyota Camry",slug:"toyota/camry/2025",image:r,price:"$27,070",rating:9,rank:5}},m={args:{id:"10",name:"2025 BMW 3 Series",slug:"bmw/3-series/2025",image:r,price:"$44,900",rating:8.5,rank:3,showShopButton:!0}},g={args:{id:"11",name:"2022 Honda Accord",slug:"used/honda/accord/123",image:r,price:"$24,500",priceLabel:"Price",year:2022,mileage:32500,trim:"Sport 2.0T",dealerName:"Honda of Downtown",distance:12}},h={args:{id:"12",name:"2021 Toyota Camry",slug:"used/toyota/camry/456",image:r,price:"$22,900",priceLabel:"Price",mileage:45e3}},u={args:{id:"13",name:"2025 Honda Accord",slug:"honda/accord/2025",image:r,price:"$28,990",rating:9,rank:2,isCurrentVehicle:!0}},y={decorators:[a=>e.jsx("div",{style:{width:"100%",maxWidth:"380px"},children:e.jsx(a,{})})],args:{id:"14",name:"2026 Mazda CX-50 Hybrid",slug:"mazda/cx-50-hybrid/2026",image:"https://images.unsplash.com/photo-1619682817481-e994891cd1f5?w=600&h=400&fit=crop",price:"$36,840",priceLabel:"Starting at",rating:8.5,showShopButton:!0,epaMpg:38,cdSays:"Read our 2026 Mazda CX-50 Hybrid review for information on ratings, pricing, specs, and features, and see how this SUV performed in our testing.",availableYears:[2026,2025,2024,2023]},parameters:{docs:{description:{story:`
## Enhanced Card with Lora Typography

This variant uses Lora serif font for a premium editorial feel. It includes:

- **C/D Rating** badge in header
- **EPA MPG** fuel economy section
- **C/D SAYS** editorial summary
- **Shop Now** inline button
- **EXPAND ALL MODEL YEARS** collapsible section

### When to Use

Use this variant for:
- Vehicle detail page cards
- Featured vehicle showcases
- Editorial content where rich information is needed
        `}}}},f={decorators:[a=>e.jsx("div",{style:{width:"100%",maxWidth:"380px"},children:e.jsx(a,{})})],args:{id:"15",name:"2025 Honda Civic Type R",slug:"honda/civic-type-r/2025",image:"https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=600&h=400&fit=crop",price:"$44,595",priceLabel:"Starting at",rating:10,showShopButton:!0,epaMpg:24,cdSays:"The Civic Type R is the pinnacle of front-wheel-drive performance, combining track-ready handling with daily usability.",availableYears:[2025,2024,2023],editorsChoice:!0,tenBest:!0}},S={decorators:[a=>e.jsx("div",{style:{width:"100%",maxWidth:"380px"},children:e.jsx(a,{})})],args:{id:"17",name:"2026 Honda Accord",slug:"honda/accord/2026",image:"https://d2kde5ohu8qb21.cloudfront.net/files/679d37b47ff34400082301e7/19-2025-honda-accord-front-view.jpg",price:"$27,295",priceLabel:"Starting at",rating:9.9,showShopButton:!0,shopButtonText:"SHOP NEW ACCORD",epaMpg:48,cdSays:"Read our 2026 Honda Accord review for information on ratings, pricing, specs, and features, and see how this sedan performed in our testing.",availableYears:[2026,2025,2024,2023],editorsChoice:!0,tenBest:!0},parameters:{docs:{description:{story:'Enhanced card with a custom CTA button text "SHOP NEW ACCORD" instead of the default "Shop Now".'}}}},b={decorators:[a=>e.jsx("div",{style:{width:"100%",maxWidth:"380px"},children:e.jsx(a,{})})],args:{id:"16",name:"2025 Toyota Corolla",slug:"toyota/corolla/2025",image:r,price:"$22,995",priceLabel:"Starting at",rating:7.5,showShopButton:!0,epaMpg:35},parameters:{docs:{description:{story:"Enhanced card with minimal content - just EPA MPG, no C/D Says or model years."}}}},v={args:{id:"18",name:"2025 Honda Accord",slug:"honda/accord/2025",image:r,price:"$28,990",rating:9,showShopButton:!0,shopButtonText:"Shop Now",shopButtonVariant:"primary"},parameters:{docs:{description:{story:"Card with primary (dark) CTA button variant."}}}},w={args:{id:"19",name:"2025 Honda Accord",slug:"honda/accord/2025",image:r,price:"$28,990",rating:9,showShopButton:!0,shopButtonText:"GET TRADE-IN VALUE",shopButtonVariant:"success"},parameters:{docs:{description:{story:"Card with success (green) CTA button variant - ideal for trade-in CTAs."}}}},C={decorators:[a=>e.jsx("div",{style:{width:"100%",maxWidth:"380px"},children:e.jsx(a,{})})],args:{id:"20",name:"2026 Honda Accord",slug:"honda/accord/2026",image:"https://d2kde5ohu8qb21.cloudfront.net/files/679d37b47ff34400082301e7/19-2025-honda-accord-front-view.jpg",price:"$27,295",priceLabel:"Starting at",rating:9.9,epaMpg:48,cdSays:"Read our 2026 Honda Accord review for information on ratings, pricing, specs, and features.",availableYears:[2026,2025,2024],ctas:[{text:"SHOP NEW",variant:"outline"},{text:"SHOP USED",variant:"secondary"}]},parameters:{docs:{description:{story:"Card with multiple CTA buttons - Shop New and Shop Used."}}}},x={decorators:[a=>e.jsx("div",{style:{width:"100%",maxWidth:"380px"},children:e.jsx(a,{})})],args:{id:"21",name:"2026 Honda Accord",slug:"honda/accord/2026",image:"https://d2kde5ohu8qb21.cloudfront.net/files/679d37b47ff34400082301e7/19-2025-honda-accord-front-view.jpg",price:"$27,295",priceLabel:"Starting at",rating:9.9,epaMpg:48,cdSays:"Read our 2026 Honda Accord review for information on ratings, pricing, specs, and features.",availableYears:[2026,2025,2024],ctas:[{text:"SHOP NEW ACCORD",variant:"primary"},{text:"GET TRADE-IN VALUE",variant:"success"}]},parameters:{docs:{description:{story:"Card with Shop New and Trade-In Value CTAs - demonstrating primary and success variants together."}}}},A={decorators:[a=>e.jsx("div",{style:{width:"320px"},children:e.jsx(a,{})})],args:{id:"accord-2026",name:"Honda Accord",slug:"2026/Honda/Accord",image:"https://d2kde5ohu8qb21.cloudfront.net/files/679d37b47ff34400082301e7/19-2025-honda-accord-front-view.jpg",price:"$27,295",priceLabel:"Starting At",rating:9.9,rank:3,showShopButton:!0,epaMpg:48,cdSays:"Read our 2026 Honda Accord review for information on ratings, pricing, specs, and features, and see how this sedan performed in our testing.",availableYears:[2026,2025,2024,2023,2022],modelName:"Accord"},parameters:{docs:{description:{story:"Exact replica of the Honda Accord card as it appears in the Top 10 carousel on the main app."}}}},T={parameters:{layout:"fullscreen"},decorators:[()=>e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(3, 280px)",gap:"24px",padding:"24px"},children:[e.jsx(V,{id:"1",name:"2025 Honda Accord",slug:"honda/accord/2025",image:r,price:"$28,990",rating:9.5,rank:1,editorsChoice:!0}),e.jsx(V,{id:"2",name:"2025 Toyota Camry",slug:"toyota/camry/2025",image:r,price:"$27,070",rating:9,rank:2}),e.jsx(V,{id:"3",name:"2025 BMW 3 Series",slug:"bmw/3-series/2025",image:r,price:"$44,900",rating:8.5,rank:3,tenBest:!0})]})]},E={decorators:[a=>e.jsx("div",{style:{width:"100%",maxWidth:"960px",background:"#f5f5f5",padding:"24px"},children:e.jsx(a,{})})],args:{id:"next-vehicle-1",name:"2026 Honda CR-V",slug:"honda/cr-v/2026",image:"https://d2kde5ohu8qb21.cloudfront.net/files/685edb52f9d75b00021b1e55/07-2026-honda-cr-v-trailsport.jpg",price:"$27,775",priceLabel:"Estimated Price",priceRange:"$27,775 - $32,905",rating:10,variant:"next-vehicle",editorsChoice:!0,tenBest:!0,evOfTheYear:!0,epaMpgRange:"32-37",cdSays:"The 2026 Honda CR-V brings a new design, fresh features, and a roomier interior that make the compact SUV's sixth generation better than ever.",ctas:[{text:"SHOP NEW CR-V",variant:"primary"},{text:"SHOP USED CR-V",variant:"outline"}]},parameters:{docs:{description:{story:`
## Next Vehicle Variant

A horizontal card layout with a header banner designed to showcase recommended vehicles. This variant is ideal for:

- **Trade-in flow results** - Show the user their recommended next vehicle
- **Personalized recommendations** - Display a featured vehicle suggestion
- **Comparison landing pages** - Highlight the winning vehicle

### Features

- Dark header banner with "YOUR NEXT VEHICLE" title
- Horizontal layout with image on left, details on right
- Large rating display with C/D RATING label
- Award badges (Editor's Choice, 10Best, EV of the Year)
- Price range with "est" suffix
- EPA MPG range
- C/D SAYS editorial blurb with accent border
- Dual CTA buttons (Shop New / Shop Used)

### Responsive Behavior

On mobile, the layout stacks vertically with the image on top.
        `}}}},B={decorators:[a=>e.jsx("div",{style:{width:"100%",maxWidth:"960px",background:"#f5f5f5",padding:"24px"},children:e.jsx(a,{})})],args:{id:"next-vehicle-2",name:"2025 Toyota RAV4",slug:"toyota/rav4/2025",image:r,price:"$29,825",priceLabel:"Starting at",rating:8.5,variant:"next-vehicle",epaMpg:30,showShopButton:!0},parameters:{docs:{description:{story:"Next Vehicle variant with minimal content - no badges, no C/D Says, single MPG value."}}}},H={decorators:[a=>e.jsx("div",{style:{width:"100%",maxWidth:"960px",background:"#f5f5f5",padding:"24px"},children:e.jsx(a,{})})],args:{id:"next-vehicle-3",name:"2025 Mazda CX-5",slug:"mazda/cx-5/2025",image:"https://images.unsplash.com/photo-1619682817481-e994891cd1f5?w=600&h=400&fit=crop",price:"$30,300",priceLabel:"Estimated Price",priceRange:"$30,300 - $42,250",rating:9,variant:"next-vehicle",editorsChoice:!0,tenBest:!0,epaMpgRange:"26-31",cdSays:"The Mazda CX-5 continues to impress with its engaging driving dynamics and upscale interior that rivals luxury competitors.",ctas:[{text:"SHOP NEW CX-5",variant:"primary"},{text:"SHOP USED CX-5",variant:"outline"}]},parameters:{docs:{description:{story:"Next Vehicle variant with Editor's Choice and 10Best badges."}}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    id: '1',
    name: '2025 Honda Accord',
    slug: 'honda/accord/2025',
    image: sampleImage,
    price: '$28,990',
    priceLabel: 'Starting at',
    rating: 8.5
  }
}`,...t.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    id: '2',
    name: '2025 Toyota Camry',
    slug: 'toyota/camry/2025',
    image: sampleImage,
    price: '$27,070',
    rating: 9.0
  }
}`,...n.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    id: '3',
    name: '2025 BMW 3 Series',
    slug: 'bmw/3-series/2025',
    image: sampleImage,
    price: '$44,900',
    rating: 8.5,
    bodyStyle: 'Sedan'
  }
}`,...o.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    id: '4',
    name: '2025 Mazda CX-5',
    slug: 'mazda/cx-5/2025',
    image: sampleImage,
    price: '$30,300',
    rating: 9.0,
    editorsChoice: true
  }
}`,...i.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    id: '5',
    name: '2025 Porsche 911',
    slug: 'porsche/911/2025',
    image: sampleImage,
    price: '$115,400',
    rating: 10,
    tenBest: true
  }
}`,...s.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    id: '6',
    name: '2025 Honda Civic',
    slug: 'honda/civic/2025',
    image: sampleImage,
    price: '$24,950',
    rating: 9.5,
    editorsChoice: true,
    tenBest: true,
    evOfTheYear: true
  }
}`,...c.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    id: '7',
    name: '2025 Kia Forte',
    slug: 'kia/forte/2025',
    image: sampleImage,
    price: '$20,115',
    rating: 7.5,
    badge: 'best-value'
  }
}`,...d.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    id: '8',
    name: '2025 Honda Accord',
    slug: 'honda/accord/2025',
    image: sampleImage,
    price: '$28,990',
    rating: 9.5,
    rank: 1
  }
}`,...p.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    id: '9',
    name: '2025 Toyota Camry',
    slug: 'toyota/camry/2025',
    image: sampleImage,
    price: '$27,070',
    rating: 9.0,
    rank: 5
  }
}`,...l.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    id: '10',
    name: '2025 BMW 3 Series',
    slug: 'bmw/3-series/2025',
    image: sampleImage,
    price: '$44,900',
    rating: 8.5,
    rank: 3,
    showShopButton: true
  }
}`,...m.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    id: '11',
    name: '2022 Honda Accord',
    slug: 'used/honda/accord/123',
    image: sampleImage,
    price: '$24,500',
    priceLabel: 'Price',
    year: 2022,
    mileage: 32500,
    trim: 'Sport 2.0T',
    dealerName: 'Honda of Downtown',
    distance: 12
  }
}`,...g.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    id: '12',
    name: '2021 Toyota Camry',
    slug: 'used/toyota/camry/456',
    image: sampleImage,
    price: '$22,900',
    priceLabel: 'Price',
    mileage: 45000
  }
}`,...h.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    id: '13',
    name: '2025 Honda Accord',
    slug: 'honda/accord/2025',
    image: sampleImage,
    price: '$28,990',
    rating: 9.0,
    rank: 2,
    isCurrentVehicle: true
  }
}`,...u.parameters?.docs?.source}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  decorators: [Story => <div style={{
    width: '100%',
    maxWidth: '380px'
  }}>
        <Story />
      </div>],
  args: {
    id: '14',
    name: '2026 Mazda CX-50 Hybrid',
    slug: 'mazda/cx-50-hybrid/2026',
    image: 'https://images.unsplash.com/photo-1619682817481-e994891cd1f5?w=600&h=400&fit=crop',
    price: '$36,840',
    priceLabel: 'Starting at',
    rating: 8.5,
    showShopButton: true,
    epaMpg: 38,
    cdSays: 'Read our 2026 Mazda CX-50 Hybrid review for information on ratings, pricing, specs, and features, and see how this SUV performed in our testing.',
    availableYears: [2026, 2025, 2024, 2023]
  },
  parameters: {
    docs: {
      description: {
        story: \`
## Enhanced Card with Lora Typography

This variant uses Lora serif font for a premium editorial feel. It includes:

- **C/D Rating** badge in header
- **EPA MPG** fuel economy section
- **C/D SAYS** editorial summary
- **Shop Now** inline button
- **EXPAND ALL MODEL YEARS** collapsible section

### When to Use

Use this variant for:
- Vehicle detail page cards
- Featured vehicle showcases
- Editorial content where rich information is needed
        \`
      }
    }
  }
}`,...y.parameters?.docs?.source}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  decorators: [Story => <div style={{
    width: '100%',
    maxWidth: '380px'
  }}>
        <Story />
      </div>],
  args: {
    id: '15',
    name: '2025 Honda Civic Type R',
    slug: 'honda/civic-type-r/2025',
    image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=600&h=400&fit=crop',
    price: '$44,595',
    priceLabel: 'Starting at',
    rating: 10,
    showShopButton: true,
    epaMpg: 24,
    cdSays: 'The Civic Type R is the pinnacle of front-wheel-drive performance, combining track-ready handling with daily usability.',
    availableYears: [2025, 2024, 2023],
    editorsChoice: true,
    tenBest: true
  }
}`,...f.parameters?.docs?.source}}};S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  decorators: [Story => <div style={{
    width: '100%',
    maxWidth: '380px'
  }}>
        <Story />
      </div>],
  args: {
    id: '17',
    name: '2026 Honda Accord',
    slug: 'honda/accord/2026',
    image: 'https://d2kde5ohu8qb21.cloudfront.net/files/679d37b47ff34400082301e7/19-2025-honda-accord-front-view.jpg',
    price: '$27,295',
    priceLabel: 'Starting at',
    rating: 9.9,
    showShopButton: true,
    shopButtonText: 'SHOP NEW ACCORD',
    epaMpg: 48,
    cdSays: 'Read our 2026 Honda Accord review for information on ratings, pricing, specs, and features, and see how this sedan performed in our testing.',
    availableYears: [2026, 2025, 2024, 2023],
    editorsChoice: true,
    tenBest: true
  },
  parameters: {
    docs: {
      description: {
        story: 'Enhanced card with a custom CTA button text "SHOP NEW ACCORD" instead of the default "Shop Now".'
      }
    }
  }
}`,...S.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  decorators: [Story => <div style={{
    width: '100%',
    maxWidth: '380px'
  }}>
        <Story />
      </div>],
  args: {
    id: '16',
    name: '2025 Toyota Corolla',
    slug: 'toyota/corolla/2025',
    image: sampleImage,
    price: '$22,995',
    priceLabel: 'Starting at',
    rating: 7.5,
    showShopButton: true,
    epaMpg: 35
  },
  parameters: {
    docs: {
      description: {
        story: 'Enhanced card with minimal content - just EPA MPG, no C/D Says or model years.'
      }
    }
  }
}`,...b.parameters?.docs?.source}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: {
    id: '18',
    name: '2025 Honda Accord',
    slug: 'honda/accord/2025',
    image: sampleImage,
    price: '$28,990',
    rating: 9.0,
    showShopButton: true,
    shopButtonText: 'Shop Now',
    shopButtonVariant: 'primary'
  },
  parameters: {
    docs: {
      description: {
        story: 'Card with primary (dark) CTA button variant.'
      }
    }
  }
}`,...v.parameters?.docs?.source}}};w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  args: {
    id: '19',
    name: '2025 Honda Accord',
    slug: 'honda/accord/2025',
    image: sampleImage,
    price: '$28,990',
    rating: 9.0,
    showShopButton: true,
    shopButtonText: 'GET TRADE-IN VALUE',
    shopButtonVariant: 'success'
  },
  parameters: {
    docs: {
      description: {
        story: 'Card with success (green) CTA button variant - ideal for trade-in CTAs.'
      }
    }
  }
}`,...w.parameters?.docs?.source}}};C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  decorators: [Story => <div style={{
    width: '100%',
    maxWidth: '380px'
  }}>
        <Story />
      </div>],
  args: {
    id: '20',
    name: '2026 Honda Accord',
    slug: 'honda/accord/2026',
    image: 'https://d2kde5ohu8qb21.cloudfront.net/files/679d37b47ff34400082301e7/19-2025-honda-accord-front-view.jpg',
    price: '$27,295',
    priceLabel: 'Starting at',
    rating: 9.9,
    epaMpg: 48,
    cdSays: 'Read our 2026 Honda Accord review for information on ratings, pricing, specs, and features.',
    availableYears: [2026, 2025, 2024],
    ctas: [{
      text: 'SHOP NEW',
      variant: 'outline'
    }, {
      text: 'SHOP USED',
      variant: 'secondary'
    }]
  },
  parameters: {
    docs: {
      description: {
        story: 'Card with multiple CTA buttons - Shop New and Shop Used.'
      }
    }
  }
}`,...C.parameters?.docs?.source}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  decorators: [Story => <div style={{
    width: '100%',
    maxWidth: '380px'
  }}>
        <Story />
      </div>],
  args: {
    id: '21',
    name: '2026 Honda Accord',
    slug: 'honda/accord/2026',
    image: 'https://d2kde5ohu8qb21.cloudfront.net/files/679d37b47ff34400082301e7/19-2025-honda-accord-front-view.jpg',
    price: '$27,295',
    priceLabel: 'Starting at',
    rating: 9.9,
    epaMpg: 48,
    cdSays: 'Read our 2026 Honda Accord review for information on ratings, pricing, specs, and features.',
    availableYears: [2026, 2025, 2024],
    ctas: [{
      text: 'SHOP NEW ACCORD',
      variant: 'primary'
    }, {
      text: 'GET TRADE-IN VALUE',
      variant: 'success'
    }]
  },
  parameters: {
    docs: {
      description: {
        story: 'Card with Shop New and Trade-In Value CTAs - demonstrating primary and success variants together.'
      }
    }
  }
}`,...x.parameters?.docs?.source}}};A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  decorators: [Story => <div style={{
    width: '320px'
  }}>
        <Story />
      </div>],
  args: {
    id: 'accord-2026',
    name: 'Honda Accord',
    slug: '2026/Honda/Accord',
    image: 'https://d2kde5ohu8qb21.cloudfront.net/files/679d37b47ff34400082301e7/19-2025-honda-accord-front-view.jpg',
    price: '$27,295',
    priceLabel: 'Starting At',
    rating: 9.9,
    rank: 3,
    showShopButton: true,
    epaMpg: 48,
    cdSays: 'Read our 2026 Honda Accord review for information on ratings, pricing, specs, and features, and see how this sedan performed in our testing.',
    availableYears: [2026, 2025, 2024, 2023, 2022],
    modelName: 'Accord'
  },
  parameters: {
    docs: {
      description: {
        story: 'Exact replica of the Honda Accord card as it appears in the Top 10 carousel on the main app.'
      }
    }
  }
}`,...A.parameters?.docs?.source}}};T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  parameters: {
    layout: 'fullscreen'
  },
  decorators: [() => <div style={{
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 280px)',
    gap: '24px',
    padding: '24px'
  }}>
        <VehicleCard id="1" name="2025 Honda Accord" slug="honda/accord/2025" image={sampleImage} price="$28,990" rating={9.5} rank={1} editorsChoice />
        <VehicleCard id="2" name="2025 Toyota Camry" slug="toyota/camry/2025" image={sampleImage} price="$27,070" rating={9.0} rank={2} />
        <VehicleCard id="3" name="2025 BMW 3 Series" slug="bmw/3-series/2025" image={sampleImage} price="$44,900" rating={8.5} rank={3} tenBest />
      </div>]
}`,...T.parameters?.docs?.source}}};E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  decorators: [Story => <div style={{
    width: '100%',
    maxWidth: '960px',
    background: '#f5f5f5',
    padding: '24px'
  }}>
        <Story />
      </div>],
  args: {
    id: 'next-vehicle-1',
    name: '2026 Honda CR-V',
    slug: 'honda/cr-v/2026',
    image: 'https://d2kde5ohu8qb21.cloudfront.net/files/685edb52f9d75b00021b1e55/07-2026-honda-cr-v-trailsport.jpg',
    price: '$27,775',
    priceLabel: 'Estimated Price',
    priceRange: '$27,775 - $32,905',
    rating: 10,
    variant: 'next-vehicle',
    editorsChoice: true,
    tenBest: true,
    evOfTheYear: true,
    epaMpgRange: '32-37',
    cdSays: 'The 2026 Honda CR-V brings a new design, fresh features, and a roomier interior that make the compact SUV\\'s sixth generation better than ever.',
    ctas: [{
      text: 'SHOP NEW CR-V',
      variant: 'primary'
    }, {
      text: 'SHOP USED CR-V',
      variant: 'outline'
    }]
  },
  parameters: {
    docs: {
      description: {
        story: \`
## Next Vehicle Variant

A horizontal card layout with a header banner designed to showcase recommended vehicles. This variant is ideal for:

- **Trade-in flow results** - Show the user their recommended next vehicle
- **Personalized recommendations** - Display a featured vehicle suggestion
- **Comparison landing pages** - Highlight the winning vehicle

### Features

- Dark header banner with "YOUR NEXT VEHICLE" title
- Horizontal layout with image on left, details on right
- Large rating display with C/D RATING label
- Award badges (Editor's Choice, 10Best, EV of the Year)
- Price range with "est" suffix
- EPA MPG range
- C/D SAYS editorial blurb with accent border
- Dual CTA buttons (Shop New / Shop Used)

### Responsive Behavior

On mobile, the layout stacks vertically with the image on top.
        \`
      }
    }
  }
}`,...E.parameters?.docs?.source}}};B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
  decorators: [Story => <div style={{
    width: '100%',
    maxWidth: '960px',
    background: '#f5f5f5',
    padding: '24px'
  }}>
        <Story />
      </div>],
  args: {
    id: 'next-vehicle-2',
    name: '2025 Toyota RAV4',
    slug: 'toyota/rav4/2025',
    image: sampleImage,
    price: '$29,825',
    priceLabel: 'Starting at',
    rating: 8.5,
    variant: 'next-vehicle',
    epaMpg: 30,
    showShopButton: true
  },
  parameters: {
    docs: {
      description: {
        story: 'Next Vehicle variant with minimal content - no badges, no C/D Says, single MPG value.'
      }
    }
  }
}`,...B.parameters?.docs?.source}}};H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`{
  decorators: [Story => <div style={{
    width: '100%',
    maxWidth: '960px',
    background: '#f5f5f5',
    padding: '24px'
  }}>
        <Story />
      </div>],
  args: {
    id: 'next-vehicle-3',
    name: '2025 Mazda CX-5',
    slug: 'mazda/cx-5/2025',
    image: 'https://images.unsplash.com/photo-1619682817481-e994891cd1f5?w=600&h=400&fit=crop',
    price: '$30,300',
    priceLabel: 'Estimated Price',
    priceRange: '$30,300 - $42,250',
    rating: 9,
    variant: 'next-vehicle',
    editorsChoice: true,
    tenBest: true,
    epaMpgRange: '26-31',
    cdSays: 'The Mazda CX-5 continues to impress with its engaging driving dynamics and upscale interior that rivals luxury competitors.',
    ctas: [{
      text: 'SHOP NEW CX-5',
      variant: 'primary'
    }, {
      text: 'SHOP USED CX-5',
      variant: 'outline'
    }]
  },
  parameters: {
    docs: {
      description: {
        story: 'Next Vehicle variant with Editor\\'s Choice and 10Best badges.'
      }
    }
  }
}`,...H.parameters?.docs?.source}}};const q=["Default","WithRating","WithBodyStyle","EditorsChoice","TenBest","AllBadges","BestValue","RankedFirst","RankedOther","RankedWithShop","UsedVehicle","UsedVehicleMinimal","CurrentVehicle","EnhancedCard","EnhancedWithBadges","EnhancedWithCustomCTA","EnhancedMinimal","CTAPrimary","CTASuccess","MultipleCTAs","MultipleCTAsWithTradeIn","HondaAccordFromApp","GridLayout","NextVehicle","NextVehicleMinimal","NextVehicleWithBadges"];export{c as AllBadges,d as BestValue,v as CTAPrimary,w as CTASuccess,u as CurrentVehicle,t as Default,i as EditorsChoice,y as EnhancedCard,b as EnhancedMinimal,f as EnhancedWithBadges,S as EnhancedWithCustomCTA,T as GridLayout,A as HondaAccordFromApp,C as MultipleCTAs,x as MultipleCTAsWithTradeIn,E as NextVehicle,B as NextVehicleMinimal,H as NextVehicleWithBadges,p as RankedFirst,l as RankedOther,m as RankedWithShop,s as TenBest,g as UsedVehicle,h as UsedVehicleMinimal,o as WithBodyStyle,n as WithRating,q as __namedExportsOrder,F as default};
