import{r as l,R as P,j as a}from"./iframe-BqD4V8Qv.js";import{v as _}from"./index-CR0fvk7o.js";import"./preload-helper-PPVm8Dsz.js";const G=({images:e,title:o,initialIndex:S=0,showThumbnails:i=!0,showCounter:V=!0,showCaptions:I=!0,aspectRatio:N="16:9",variant:R="default",autoPlay:n=0})=>{const[m,$]=l.useState(S),[c,A]=l.useState(n>0),k=l.useCallback(t=>{$(t)},[]),B=l.useCallback(()=>{$(t=>t===0?e.length-1:t-1)},[e.length]),j=l.useCallback(()=>{$(t=>t===e.length-1?0:t+1)},[e.length]),q=l.useCallback(()=>{A(t=>!t)},[]);P.useEffect(()=>{if(!c||n===0)return;const t=setInterval(()=>{j()},n);return()=>clearInterval(t)},[c,n,j]);const s=e[m];return e.length?a.jsxs("div",{className:`image-gallery image-gallery--${R} image-gallery--${N.replace(":","-")}`,children:[o&&a.jsx("header",{className:"image-gallery__header",children:a.jsx("h2",{className:"image-gallery__title",children:o})}),a.jsxs("div",{className:"image-gallery__main",children:[a.jsxs("div",{className:"image-gallery__stage",children:[a.jsx("div",{className:"image-gallery__image-wrapper",children:a.jsx("img",{src:s.src,alt:s.alt,className:"image-gallery__image"})}),a.jsx("button",{className:"image-gallery__nav image-gallery__nav--prev",onClick:B,"aria-label":"Previous image",children:a.jsx("svg",{width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:a.jsx("path",{d:"M15 18l-6-6 6-6"})})}),a.jsx("button",{className:"image-gallery__nav image-gallery__nav--next",onClick:j,"aria-label":"Next image",children:a.jsx("svg",{width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:a.jsx("path",{d:"M9 18l6-6-6-6"})})}),V&&a.jsxs("div",{className:"image-gallery__counter",children:[a.jsx("span",{className:"image-gallery__counter-current",children:m+1}),a.jsx("span",{className:"image-gallery__counter-separator",children:"/"}),a.jsx("span",{className:"image-gallery__counter-total",children:e.length})]}),n>0&&a.jsx("button",{className:`image-gallery__autoplay ${c?"image-gallery__autoplay--playing":""}`,onClick:q,"aria-label":c?"Pause slideshow":"Play slideshow",children:c?a.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"currentColor",children:[a.jsx("rect",{x:"6",y:"4",width:"4",height:"16"}),a.jsx("rect",{x:"14",y:"4",width:"4",height:"16"})]}):a.jsx("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"currentColor",children:a.jsx("polygon",{points:"5,3 19,12 5,21"})})})]}),I&&(s.caption||s.credit)&&a.jsxs("div",{className:"image-gallery__caption",children:[s.caption&&a.jsx("p",{className:"image-gallery__caption-text",children:s.caption}),s.credit&&a.jsx("span",{className:"image-gallery__credit",children:s.credit})]})]}),i&&e.length>1&&a.jsx("div",{className:"image-gallery__thumbnails",children:e.map((t,r)=>a.jsx("button",{className:`image-gallery__thumbnail ${r===m?"image-gallery__thumbnail--active":""}`,onClick:()=>k(r),"aria-label":`Go to image ${r+1}`,children:a.jsx("img",{src:t.src,alt:t.alt,className:"image-gallery__thumbnail-image"})},t.id))}),R==="compact"&&e.length>1&&a.jsx("div",{className:"image-gallery__dots",children:e.map((t,r)=>a.jsx("button",{className:`image-gallery__dot ${r===m?"image-gallery__dot--active":""}`,onClick:()=>k(r),"aria-label":`Go to image ${r+1}`},r))})]}):null};G.__docgenInfo={description:"",methods:[],displayName:"ImageGallery",props:{images:{required:!0,tsType:{name:"Array",elements:[{name:"GalleryImage"}],raw:"GalleryImage[]"},description:"Array of images"},title:{required:!1,tsType:{name:"string"},description:"Gallery title"},initialIndex:{required:!1,tsType:{name:"number"},description:"Initial slide index",defaultValue:{value:"0",computed:!1}},showThumbnails:{required:!1,tsType:{name:"boolean"},description:"Show thumbnails",defaultValue:{value:"true",computed:!1}},showCounter:{required:!1,tsType:{name:"boolean"},description:"Show counter",defaultValue:{value:"true",computed:!1}},showCaptions:{required:!1,tsType:{name:"boolean"},description:"Show captions",defaultValue:{value:"true",computed:!1}},aspectRatio:{required:!1,tsType:{name:"union",raw:"'16:9' | '4:3' | '1:1' | '3:2'",elements:[{name:"literal",value:"'16:9'"},{name:"literal",value:"'4:3'"},{name:"literal",value:"'1:1'"},{name:"literal",value:"'3:2'"}]},description:"Aspect ratio",defaultValue:{value:"'16:9'",computed:!1}},variant:{required:!1,tsType:{name:"union",raw:"'default' | 'fullwidth' | 'compact'",elements:[{name:"literal",value:"'default'"},{name:"literal",value:"'fullwidth'"},{name:"literal",value:"'compact'"}]},description:"Variant style",defaultValue:{value:"'default'",computed:!1}},autoPlay:{required:!1,tsType:{name:"number"},description:"Auto play interval in ms (0 to disable)",defaultValue:{value:"0",computed:!1}}}};const W=_.filter(e=>e.galleryImages&&e.galleryImages.length>0),d=W[0]||_[0],D=_.filter(e=>e.bodyStyle==="Sedan").slice(0,6),E=_.filter(e=>e.bodyStyle==="SUV").slice(0,8),z={title:"Resin Components/ImageGallery",component:G,parameters:{layout:"padded",docs:{description:{component:`
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
        `}}},tags:["autodocs"],argTypes:{aspectRatio:{control:"radio",options:["16:9","4:3","1:1","3:2"],description:"Aspect ratio of the gallery"},variant:{control:"radio",options:["default","fullwidth","compact"],description:"Visual style variant"},showThumbnails:{control:"boolean",description:"Show thumbnail navigation"},showCounter:{control:"boolean",description:"Show image counter"},showCaptions:{control:"boolean",description:"Show image captions"},autoPlay:{control:{type:"range",min:0,max:1e4,step:1e3},description:"Auto-play interval in milliseconds (0 to disable)"}}},H=e=>{const o=[{id:`${e.id}-main`,src:e.image,alt:`${e.year} ${e.make} ${e.model} - Main View`,caption:`The ${e.year} ${e.make} ${e.model} features a bold design with modern styling cues.`,credit:"Car and Driver"}];return e.galleryImages&&e.galleryImages.forEach((S,i)=>{o.push({id:`${e.id}-gallery-${i}`,src:S,alt:`${e.year} ${e.make} ${e.model} - View ${i+2}`,caption:i===0?"Interior showcases premium materials and intuitive controls.":i===1?"Rear design complements the aggressive front styling.":`Additional view of the ${e.year} ${e.make} ${e.model}.`,credit:"Car and Driver"})}),o},u=D.slice(0,6).map((e,o)=>({id:e.id,src:e.image,alt:`${e.year} ${e.make} ${e.model}`,caption:`${o+1}. ${e.year} ${e.make} ${e.model} - ${e.priceRange}`,credit:"Car and Driver"})),T=E.map(e=>({id:e.id,src:e.image,alt:`${e.year} ${e.make} ${e.model}`,caption:`${e.year} ${e.make} ${e.model} - Starting at ${e.priceRange}`,credit:e.editorsChoice?"Editors' Choice - Car and Driver":"Car and Driver"})),p={args:{title:`${d.year} ${d.make} ${d.model} Gallery`,images:H(d),showThumbnails:!0,showCounter:!0,showCaptions:!0,aspectRatio:"16:9",variant:"default"}},h={args:{title:"Best Sedans of 2025",images:u,showThumbnails:!0,showCounter:!0,showCaptions:!0,aspectRatio:"16:9",variant:"default"}},g={args:{title:"Top SUVs for Every Budget",images:T,showThumbnails:!0,showCounter:!0,showCaptions:!0,aspectRatio:"4:3",variant:"default"}},y={args:{title:"Quick Look",images:u.slice(0,4),showThumbnails:!1,showCounter:!0,showCaptions:!0,aspectRatio:"16:9",variant:"compact"}},f={args:{images:T.slice(0,5),showThumbnails:!0,showCounter:!0,showCaptions:!0,aspectRatio:"16:9",variant:"fullwidth"}},w={args:{title:"Vehicle Highlights",images:u.slice(0,4),showThumbnails:!0,showCounter:!0,showCaptions:!1,aspectRatio:"1:1",variant:"default"}},C={args:{title:"Auto-Playing Slideshow",images:T.slice(0,5),showThumbnails:!0,showCounter:!0,showCaptions:!0,aspectRatio:"16:9",variant:"default",autoPlay:4e3}},v={args:{title:"Clean Gallery View",images:u.map(e=>({...e,caption:void 0,credit:void 0})),showThumbnails:!0,showCounter:!0,showCaptions:!1,aspectRatio:"16:9",variant:"default"}},x={args:{images:T.slice(0,4),showThumbnails:!1,showCounter:!1,showCaptions:!1,aspectRatio:"16:9",variant:"compact"}},b={render:()=>a.jsxs("div",{style:{maxWidth:"800px",margin:"0 auto"},children:[a.jsx("h1",{style:{fontSize:"2rem",fontWeight:700,marginBottom:"16px"},children:"Best Sedans of 2025: Our Top Picks"}),a.jsx("p",{style:{lineHeight:1.7,color:"#374151",marginBottom:"24px"},children:"We've tested dozens of sedans to bring you our definitive ranking of the best options for 2025. From efficient commuters to luxury cruisers, these are the sedans that impressed us most."}),a.jsx(G,{title:"Top 6 Sedans Gallery",images:u,showThumbnails:!0,showCounter:!0,showCaptions:!0,aspectRatio:"16:9",variant:"default"}),a.jsx("p",{style:{lineHeight:1.7,color:"#374151",marginTop:"24px"},children:"Each of these sedans offers something unique, whether it's exceptional fuel economy, cutting-edge technology, or pure driving enjoyment. Read on for our detailed analysis of each model."})]})};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    title: \`\${sampleVehicle.year} \${sampleVehicle.make} \${sampleVehicle.model} Gallery\`,
    images: createGalleryImages(sampleVehicle),
    showThumbnails: true,
    showCounter: true,
    showCaptions: true,
    aspectRatio: '16:9',
    variant: 'default'
  }
}`,...p.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'Best Sedans of 2025',
    images: multiVehicleGallery,
    showThumbnails: true,
    showCounter: true,
    showCaptions: true,
    aspectRatio: '16:9',
    variant: 'default'
  }
}`,...h.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'Top SUVs for Every Budget',
    images: suvGallery,
    showThumbnails: true,
    showCounter: true,
    showCaptions: true,
    aspectRatio: '4:3',
    variant: 'default'
  }
}`,...g.parameters?.docs?.source}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'Quick Look',
    images: multiVehicleGallery.slice(0, 4),
    showThumbnails: false,
    showCounter: true,
    showCaptions: true,
    aspectRatio: '16:9',
    variant: 'compact'
  }
}`,...y.parameters?.docs?.source}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    images: suvGallery.slice(0, 5),
    showThumbnails: true,
    showCounter: true,
    showCaptions: true,
    aspectRatio: '16:9',
    variant: 'fullwidth'
  }
}`,...f.parameters?.docs?.source}}};w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'Vehicle Highlights',
    images: multiVehicleGallery.slice(0, 4),
    showThumbnails: true,
    showCounter: true,
    showCaptions: false,
    aspectRatio: '1:1',
    variant: 'default'
  }
}`,...w.parameters?.docs?.source}}};C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
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
}`,...C.parameters?.docs?.source}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
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
}`,...v.parameters?.docs?.source}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  args: {
    images: suvGallery.slice(0, 4),
    showThumbnails: false,
    showCounter: false,
    showCaptions: false,
    aspectRatio: '16:9',
    variant: 'compact'
  }
}`,...x.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
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
}`,...b.parameters?.docs?.source}}};const O=["Default","BestSedansGallery","SUVShowcase","Compact","Fullwidth","SquareAspect","WithAutoPlay","NoCaptions","MinimalControls","InArticleContext"];export{h as BestSedansGallery,y as Compact,p as Default,f as Fullwidth,b as InArticleContext,x as MinimalControls,v as NoCaptions,g as SUVShowcase,w as SquareAspect,C as WithAutoPlay,O as __namedExportsOrder,z as default};
