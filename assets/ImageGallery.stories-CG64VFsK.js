import{j as a}from"./iframe-BEa3bQge.js";import{I as f}from"./ImageGallery-CbBLFF2Y.js";import{v as w}from"./index-Dto8T7jp.js";import"./preload-helper-PPVm8Dsz.js";const b=w.filter(e=>e.galleryImages&&e.galleryImages.length>0),r=b[0]||w[0],S=w.filter(e=>e.bodyStyle==="Sedan").slice(0,6),$=w.filter(e=>e.bodyStyle==="SUV").slice(0,8),V={title:"Resin Components/ImageGallery",component:f,parameters:{layout:"padded",docs:{description:{component:`
## Image Gallery

A carousel/slideshow component for displaying image collections.
Inspired by Hearst's listicle image galleries.

### Features
- Navigation arrows
- Image counter
- Thumbnail navigation
- Dot navigation (compact variant)
- Auto-play with play/pause toggle
- Multiple aspect ratios (16:9, 4:3, 1:1, 3:2)
- Image captions and credits
- Three variants: default, fullwidth, compact

### Usage
\`\`\`tsx
<ImageGallery
  title="2025 Honda Accord Gallery"
  images={[
    {
      id: 1,
      src: '/path/to/image1.jpg',
      alt: 'Front view',
      caption: 'The bold new front fascia',
      credit: 'Car and Driver',
    },
    // ... more images
  ]}
  showThumbnails={true}
  showCounter={true}
  showCaptions={true}
  aspectRatio="16:9"
/>
\`\`\`
        `}}},tags:["autodocs"],argTypes:{aspectRatio:{control:"radio",options:["16:9","4:3","1:1","3:2"],description:"Aspect ratio of the gallery"},variant:{control:"radio",options:["default","fullwidth","compact"],description:"Visual style variant"},showThumbnails:{control:"boolean",description:"Show thumbnail navigation"},showCounter:{control:"boolean",description:"Show image counter"},showCaptions:{control:"boolean",description:"Show image captions"},autoPlay:{control:{type:"range",min:0,max:1e4,step:1e3},description:"Auto-play interval in milliseconds (0 to disable)"}}},T=e=>{const s=[{id:`${e.id}-main`,src:e.image,alt:`${e.year} ${e.make} ${e.model} - Main View`,caption:`The ${e.year} ${e.make} ${e.model} features a bold design with modern styling cues.`,credit:"Car and Driver"}];return e.galleryImages&&e.galleryImages.forEach((C,o)=>{s.push({id:`${e.id}-gallery-${o}`,src:C,alt:`${e.year} ${e.make} ${e.model} - View ${o+2}`,caption:o===0?"Interior showcases premium materials and intuitive controls.":o===1?"Rear design complements the aggressive front styling.":`Additional view of the ${e.year} ${e.make} ${e.model}.`,credit:"Car and Driver"})}),s},t=S.slice(0,6).map((e,s)=>({id:e.id,src:e.image,alt:`${e.year} ${e.make} ${e.model}`,caption:`${s+1}. ${e.year} ${e.make} ${e.model} - ${e.priceRange}`,credit:"Car and Driver"})),y=$.map(e=>({id:e.id,src:e.image,alt:`${e.year} ${e.make} ${e.model}`,caption:`${e.year} ${e.make} ${e.model} - Starting at ${e.priceRange}`,credit:e.editorsChoice?"Editors' Choice - Car and Driver":"Car and Driver"})),i={args:{title:`${r.year} ${r.make} ${r.model} Gallery`,images:T(r),showThumbnails:!0,showCounter:!0,showCaptions:!0,aspectRatio:"16:9",variant:"default"}},n={args:{title:"Best Sedans of 2025",images:t,showThumbnails:!0,showCounter:!0,showCaptions:!0,aspectRatio:"16:9",variant:"default"}},l={args:{title:"Top SUVs for Every Budget",images:y,showThumbnails:!0,showCounter:!0,showCaptions:!0,aspectRatio:"4:3",variant:"default"}},c={args:{title:"Quick Look",images:t.slice(0,4),showThumbnails:!1,showCounter:!0,showCaptions:!0,aspectRatio:"16:9",variant:"compact"}},u={args:{images:y.slice(0,5),showThumbnails:!0,showCounter:!0,showCaptions:!0,aspectRatio:"16:9",variant:"fullwidth"}},m={args:{title:"Vehicle Highlights",images:t.slice(0,4),showThumbnails:!0,showCounter:!0,showCaptions:!1,aspectRatio:"1:1",variant:"default"}},p={args:{title:"Auto-Playing Slideshow",images:y.slice(0,5),showThumbnails:!0,showCounter:!0,showCaptions:!0,aspectRatio:"16:9",variant:"default",autoPlay:4e3}},d={args:{title:"Clean Gallery View",images:t.map(e=>({...e,caption:void 0,credit:void 0})),showThumbnails:!0,showCounter:!0,showCaptions:!1,aspectRatio:"16:9",variant:"default"}},h={args:{images:y.slice(0,4),showThumbnails:!1,showCounter:!1,showCaptions:!1,aspectRatio:"16:9",variant:"compact"}},g={render:()=>a.jsxs("div",{style:{maxWidth:"800px",margin:"0 auto"},children:[a.jsx("h1",{style:{fontSize:"2rem",fontWeight:700,marginBottom:"16px"},children:"Best Sedans of 2025: Our Top Picks"}),a.jsx("p",{style:{lineHeight:1.7,color:"#374151",marginBottom:"24px"},children:"We've tested dozens of sedans to bring you our definitive ranking of the best options for 2025. From efficient commuters to luxury cruisers, these are the sedans that impressed us most."}),a.jsx(f,{title:"Top 6 Sedans Gallery",images:t,showThumbnails:!0,showCounter:!0,showCaptions:!0,aspectRatio:"16:9",variant:"default"}),a.jsx("p",{style:{lineHeight:1.7,color:"#374151",marginTop:"24px"},children:"Each of these sedans offers something unique, whether it's exceptional fuel economy, cutting-edge technology, or pure driving enjoyment. Read on for our detailed analysis of each model."})]})};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    title: \`\${sampleVehicle.year} \${sampleVehicle.make} \${sampleVehicle.model} Gallery\`,
    images: createGalleryImages(sampleVehicle),
    showThumbnails: true,
    showCounter: true,
    showCaptions: true,
    aspectRatio: '16:9',
    variant: 'default'
  }
}`,...i.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'Best Sedans of 2025',
    images: multiVehicleGallery,
    showThumbnails: true,
    showCounter: true,
    showCaptions: true,
    aspectRatio: '16:9',
    variant: 'default'
  }
}`,...n.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'Top SUVs for Every Budget',
    images: suvGallery,
    showThumbnails: true,
    showCounter: true,
    showCaptions: true,
    aspectRatio: '4:3',
    variant: 'default'
  }
}`,...l.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'Quick Look',
    images: multiVehicleGallery.slice(0, 4),
    showThumbnails: false,
    showCounter: true,
    showCaptions: true,
    aspectRatio: '16:9',
    variant: 'compact'
  }
}`,...c.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    images: suvGallery.slice(0, 5),
    showThumbnails: true,
    showCounter: true,
    showCaptions: true,
    aspectRatio: '16:9',
    variant: 'fullwidth'
  }
}`,...u.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'Vehicle Highlights',
    images: multiVehicleGallery.slice(0, 4),
    showThumbnails: true,
    showCounter: true,
    showCaptions: false,
    aspectRatio: '1:1',
    variant: 'default'
  }
}`,...m.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'Auto-Playing Slideshow',
    images: suvGallery.slice(0, 5),
    showThumbnails: true,
    showCounter: true,
    showCaptions: true,
    aspectRatio: '16:9',
    variant: 'default',
    autoPlay: 4000
  }
}`,...p.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'Clean Gallery View',
    images: multiVehicleGallery.map(img => ({
      ...img,
      caption: undefined,
      credit: undefined
    })),
    showThumbnails: true,
    showCounter: true,
    showCaptions: false,
    aspectRatio: '16:9',
    variant: 'default'
  }
}`,...d.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    images: suvGallery.slice(0, 4),
    showThumbnails: false,
    showCounter: false,
    showCaptions: false,
    aspectRatio: '16:9',
    variant: 'compact'
  }
}`,...h.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    maxWidth: '800px',
    margin: '0 auto'
  }}>
      <h1 style={{
      fontSize: '2rem',
      fontWeight: 700,
      marginBottom: '16px'
    }}>
        Best Sedans of 2025: Our Top Picks
      </h1>
      <p style={{
      lineHeight: 1.7,
      color: '#374151',
      marginBottom: '24px'
    }}>
        We've tested dozens of sedans to bring you our definitive ranking of the best 
        options for 2025. From efficient commuters to luxury cruisers, these are the 
        sedans that impressed us most.
      </p>

      <ImageGallery title="Top 6 Sedans Gallery" images={multiVehicleGallery} showThumbnails={true} showCounter={true} showCaptions={true} aspectRatio="16:9" variant="default" />

      <p style={{
      lineHeight: 1.7,
      color: '#374151',
      marginTop: '24px'
    }}>
        Each of these sedans offers something unique, whether it's exceptional fuel 
        economy, cutting-edge technology, or pure driving enjoyment. Read on for our 
        detailed analysis of each model.
      </p>
    </div>
}`,...g.parameters?.docs?.source}}};const k=["Default","BestSedansGallery","SUVShowcase","Compact","Fullwidth","SquareAspect","WithAutoPlay","NoCaptions","MinimalControls","InArticleContext"];export{n as BestSedansGallery,c as Compact,i as Default,u as Fullwidth,g as InArticleContext,h as MinimalControls,d as NoCaptions,l as SUVShowcase,m as SquareAspect,p as WithAutoPlay,k as __namedExportsOrder,V as default};
