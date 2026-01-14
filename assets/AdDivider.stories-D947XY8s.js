import{r as I,j as e}from"./iframe-cxIeY4xe.js";import"./preload-helper-PPVm8Dsz.js";const t=({text:v="Advertisement - Continue Reading Below",showAd:x=!0,adImageUrl:g,adLinkUrl:c="#",adAltText:A="Advertisement",adHeight:u=90,adWidth:p=728,variant:y="default",adSlotId:w})=>{const[b,B]=I.useState(!1),W=()=>{B(!0)},j=()=>{if(g&&!b){const f=e.jsx("img",{src:g,alt:A,className:"ad-divider__image",onError:W,style:{maxWidth:p,maxHeight:u}});return c&&c!=="#"?e.jsx("a",{href:c,target:"_blank",rel:"noopener noreferrer",className:"ad-divider__link",children:f}):f}return e.jsx("div",{className:"ad-divider__placeholder",style:{width:p,height:u},children:e.jsxs("div",{className:"ad-divider__placeholder-content",children:[e.jsxs("svg",{width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.5",children:[e.jsx("rect",{x:"3",y:"3",width:"18",height:"18",rx:"2"}),e.jsx("path",{d:"M3 9h18"}),e.jsx("path",{d:"M9 21V9"})]}),e.jsx("span",{children:"Ad Space"})]})})};return e.jsxs("div",{className:`ad-divider ad-divider--${y}`,"data-ad-slot":w,children:[e.jsx("div",{className:"ad-divider__label",children:e.jsx("span",{className:"ad-divider__text",children:v})}),x&&e.jsx("div",{className:"ad-divider__container",children:j()})]})};t.__docgenInfo={description:"",methods:[],displayName:"AdDivider",props:{text:{required:!1,tsType:{name:"string"},description:"Text to display",defaultValue:{value:"'Advertisement - Continue Reading Below'",computed:!1}},showAd:{required:!1,tsType:{name:"boolean"},description:"Show ad area",defaultValue:{value:"true",computed:!1}},adImageUrl:{required:!1,tsType:{name:"string"},description:"Ad image URL"},adLinkUrl:{required:!1,tsType:{name:"string"},description:"Ad link URL",defaultValue:{value:"'#'",computed:!1}},adAltText:{required:!1,tsType:{name:"string"},description:"Ad alt text",defaultValue:{value:"'Advertisement'",computed:!1}},adHeight:{required:!1,tsType:{name:"number"},description:"Ad placeholder height (when no image)",defaultValue:{value:"90",computed:!1}},adWidth:{required:!1,tsType:{name:"number"},description:"Ad width (standard sizes: 728, 300, 970)",defaultValue:{value:"728",computed:!1}},variant:{required:!1,tsType:{name:"union",raw:"'default' | 'minimal' | 'prominent'",elements:[{name:"literal",value:"'default'"},{name:"literal",value:"'minimal'"},{name:"literal",value:"'prominent'"}]},description:"Variant style",defaultValue:{value:"'default'",computed:!1}},adSlotId:{required:!1,tsType:{name:"string"},description:"Custom ad slot ID for tracking"}}};const a={leaderboard:"https://via.placeholder.com/728x90/1a1a1a/ffffff?text=728x90+Leaderboard+Ad",mediumRectangle:"https://via.placeholder.com/300x250/1a1a1a/ffffff?text=300x250+Ad",billboard:"https://via.placeholder.com/970x250/1a1a1a/ffffff?text=970x250+Billboard"},T={title:"Resin Components/AdDivider",component:t,parameters:{layout:"padded",docs:{description:{component:`
## Ad Divider

A divider component for indicating advertisement placement within content.
Inspired by Hearst's "Advertisement - Continue Reading Below" pattern.

### Features
- Customizable label text
- Supports actual ad images with links
- Fallback placeholder when no image provided
- Standard ad sizes supported (728x90, 300x250, 300x600, 970x250)
- Three variants: default, minimal, prominent
- Responsive design

### Usage
\`\`\`tsx
// With ad image
<AdDivider
  text="Advertisement - Continue Reading Below"
  adImageUrl="https://example.com/ad-728x90.jpg"
  adLinkUrl="https://advertiser.com"
  adWidth={728}
  adHeight={90}
/>

// Placeholder only
<AdDivider
  text="Advertisement - Continue Reading Below"
  showAd={true}
/>
\`\`\`
        `}}},tags:["autodocs"],argTypes:{variant:{control:"radio",options:["default","minimal","prominent"],description:"Visual style variant"},showAd:{control:"boolean",description:"Show the ad area"},adImageUrl:{control:"text",description:"URL of the ad image"},adLinkUrl:{control:"text",description:"URL to link the ad to"},adWidth:{control:{type:"number"},description:"Width of the ad in pixels"},adHeight:{control:{type:"number"},description:"Height of the ad in pixels"}}},r={args:{text:"Advertisement - Continue Reading Below",showAd:!0,adImageUrl:a.leaderboard,adLinkUrl:"#",adWidth:728,adHeight:90,variant:"default"}},i={args:{text:"Advertisement - Continue Reading Below",showAd:!0,adImageUrl:a.mediumRectangle,adLinkUrl:"#",adWidth:300,adHeight:250,variant:"default"}},n={args:{text:"Advertisement",showAd:!0,adImageUrl:a.billboard,adLinkUrl:"#",adWidth:970,adHeight:250,variant:"default"}},o={args:{text:"Advertisement - Continue Reading Below",showAd:!0,adWidth:728,adHeight:90,variant:"default"}},d={args:{text:"Advertisement - Continue Reading Below",showAd:!1,variant:"minimal"}},s={args:{text:"Advertisement - Continue Reading Below",showAd:!0,adImageUrl:a.leaderboard,adWidth:728,adHeight:90,variant:"prominent"}},l={args:{text:"Advertisement - Continue Reading Below",showAd:!1,variant:"default"}},m={render:()=>e.jsxs("div",{style:{maxWidth:"800px",margin:"0 auto"},children:[e.jsxs("div",{style:{marginBottom:"24px"},children:[e.jsx("h2",{style:{fontSize:"1.5rem",fontWeight:700,marginBottom:"16px"},children:"2025 Honda Accord Review: The Benchmark Sedan"}),e.jsx("p",{style:{lineHeight:1.7,color:"#374151",marginBottom:"16px"},children:"The Honda Accord has long been the benchmark for midsize sedans, and the 2025 model continues that tradition with refinements to its already excellent formula. With a comfortable ride, spacious interior, and impressive fuel economy, it remains one of our top picks in the segment."}),e.jsx("p",{style:{lineHeight:1.7,color:"#374151"},children:"Under the hood, you'll find either a turbocharged 1.5-liter four-cylinder making 192 horsepower or a hybrid powertrain that combines a 2.0-liter four-cylinder with two electric motors for a total of 204 horsepower. Both options deliver smooth, refined power delivery."})]}),e.jsx(t,{text:"Advertisement - Continue Reading Below",showAd:!0,adImageUrl:a.leaderboard,adWidth:728,adHeight:90,variant:"default"}),e.jsxs("div",{style:{marginTop:"24px"},children:[e.jsx("h3",{style:{fontSize:"1.25rem",fontWeight:700,marginBottom:"16px"},children:"Interior and Technology"}),e.jsx("p",{style:{lineHeight:1.7,color:"#374151",marginBottom:"16px"},children:"Inside, the Accord offers a clean, modern design with high-quality materials throughout. The 12.3-inch touchscreen infotainment system is responsive and includes wireless Apple CarPlay and Android Auto. A 10.2-inch digital gauge cluster comes standard on higher trims."}),e.jsx("p",{style:{lineHeight:1.7,color:"#374151"},children:"Rear-seat passengers enjoy generous legroom and headroom, making the Accord suitable for family duties. The trunk offers 16.7 cubic feet of cargo space, which is competitive for the class."})]}),e.jsx(t,{text:"Advertisement - Continue Reading Below",showAd:!0,adImageUrl:a.mediumRectangle,adWidth:300,adHeight:250,variant:"default"}),e.jsxs("div",{style:{marginTop:"24px"},children:[e.jsx("h3",{style:{fontSize:"1.25rem",fontWeight:700,marginBottom:"16px"},children:"The Verdict"}),e.jsx("p",{style:{lineHeight:1.7,color:"#374151"},children:"The 2025 Honda Accord earns our Editors' Choice award for its exceptional combination of comfort, efficiency, and value. Whether you choose the turbocharged or hybrid powertrain, you're getting one of the best sedans money can buy."})]})]})},h={render:()=>e.jsxs("div",{style:{maxWidth:"800px",margin:"0 auto"},children:[e.jsxs("div",{style:{marginBottom:"48px"},children:[e.jsx("h3",{style:{fontSize:"1rem",fontWeight:600,marginBottom:"16px",color:"#6b7280"},children:"Default Variant with Ad"}),e.jsx(t,{variant:"default",showAd:!0,adImageUrl:a.leaderboard,adWidth:728,adHeight:90})]}),e.jsxs("div",{style:{marginBottom:"48px"},children:[e.jsx("h3",{style:{fontSize:"1rem",fontWeight:600,marginBottom:"16px",color:"#6b7280"},children:"Minimal Variant (Text Only)"}),e.jsx(t,{variant:"minimal",showAd:!1})]}),e.jsxs("div",{style:{marginBottom:"48px"},children:[e.jsx("h3",{style:{fontSize:"1rem",fontWeight:600,marginBottom:"16px",color:"#6b7280"},children:"Prominent Variant with Ad"}),e.jsx(t,{variant:"prominent",showAd:!0,adImageUrl:a.leaderboard,adWidth:728,adHeight:90})]}),e.jsxs("div",{children:[e.jsx("h3",{style:{fontSize:"1rem",fontWeight:600,marginBottom:"16px",color:"#6b7280"},children:"Placeholder (No Image)"}),e.jsx(t,{variant:"default",showAd:!0,adWidth:728,adHeight:90})]})]})};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    text: 'Advertisement - Continue Reading Below',
    showAd: true,
    adImageUrl: sampleAdImages.leaderboard,
    adLinkUrl: '#',
    adWidth: 728,
    adHeight: 90,
    variant: 'default'
  }
}`,...r.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    text: 'Advertisement - Continue Reading Below',
    showAd: true,
    adImageUrl: sampleAdImages.mediumRectangle,
    adLinkUrl: '#',
    adWidth: 300,
    adHeight: 250,
    variant: 'default'
  }
}`,...i.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    text: 'Advertisement',
    showAd: true,
    adImageUrl: sampleAdImages.billboard,
    adLinkUrl: '#',
    adWidth: 970,
    adHeight: 250,
    variant: 'default'
  }
}`,...n.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    text: 'Advertisement - Continue Reading Below',
    showAd: true,
    adWidth: 728,
    adHeight: 90,
    variant: 'default'
  }
}`,...o.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    text: 'Advertisement - Continue Reading Below',
    showAd: false,
    variant: 'minimal'
  }
}`,...d.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    text: 'Advertisement - Continue Reading Below',
    showAd: true,
    adImageUrl: sampleAdImages.leaderboard,
    adWidth: 728,
    adHeight: 90,
    variant: 'prominent'
  }
}`,...s.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    text: 'Advertisement - Continue Reading Below',
    showAd: false,
    variant: 'default'
  }
}`,...l.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    maxWidth: '800px',
    margin: '0 auto'
  }}>
      {/* Article content before ad */}
      <div style={{
      marginBottom: '24px'
    }}>
        <h2 style={{
        fontSize: '1.5rem',
        fontWeight: 700,
        marginBottom: '16px'
      }}>
          2025 Honda Accord Review: The Benchmark Sedan
        </h2>
        <p style={{
        lineHeight: 1.7,
        color: '#374151',
        marginBottom: '16px'
      }}>
          The Honda Accord has long been the benchmark for midsize sedans, and the 2025 model 
          continues that tradition with refinements to its already excellent formula. With a 
          comfortable ride, spacious interior, and impressive fuel economy, it remains one of 
          our top picks in the segment.
        </p>
        <p style={{
        lineHeight: 1.7,
        color: '#374151'
      }}>
          Under the hood, you'll find either a turbocharged 1.5-liter four-cylinder making 
          192 horsepower or a hybrid powertrain that combines a 2.0-liter four-cylinder with 
          two electric motors for a total of 204 horsepower. Both options deliver smooth, 
          refined power delivery.
        </p>
      </div>

      {/* Ad Divider with image */}
      <AdDivider text="Advertisement - Continue Reading Below" showAd={true} adImageUrl={sampleAdImages.leaderboard} adWidth={728} adHeight={90} variant="default" />

      {/* Article content after ad */}
      <div style={{
      marginTop: '24px'
    }}>
        <h3 style={{
        fontSize: '1.25rem',
        fontWeight: 700,
        marginBottom: '16px'
      }}>
          Interior and Technology
        </h3>
        <p style={{
        lineHeight: 1.7,
        color: '#374151',
        marginBottom: '16px'
      }}>
          Inside, the Accord offers a clean, modern design with high-quality materials 
          throughout. The 12.3-inch touchscreen infotainment system is responsive and 
          includes wireless Apple CarPlay and Android Auto. A 10.2-inch digital gauge 
          cluster comes standard on higher trims.
        </p>
        <p style={{
        lineHeight: 1.7,
        color: '#374151'
      }}>
          Rear-seat passengers enjoy generous legroom and headroom, making the Accord 
          suitable for family duties. The trunk offers 16.7 cubic feet of cargo space, 
          which is competitive for the class.
        </p>
      </div>

      {/* Another Ad Divider with medium rectangle */}
      <AdDivider text="Advertisement - Continue Reading Below" showAd={true} adImageUrl={sampleAdImages.mediumRectangle} adWidth={300} adHeight={250} variant="default" />

      {/* More content */}
      <div style={{
      marginTop: '24px'
    }}>
        <h3 style={{
        fontSize: '1.25rem',
        fontWeight: 700,
        marginBottom: '16px'
      }}>
          The Verdict
        </h3>
        <p style={{
        lineHeight: 1.7,
        color: '#374151'
      }}>
          The 2025 Honda Accord earns our Editors' Choice award for its exceptional 
          combination of comfort, efficiency, and value. Whether you choose the 
          turbocharged or hybrid powertrain, you're getting one of the best sedans 
          money can buy.
        </p>
      </div>
    </div>
}`,...m.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    maxWidth: '800px',
    margin: '0 auto'
  }}>
      <div style={{
      marginBottom: '48px'
    }}>
        <h3 style={{
        fontSize: '1rem',
        fontWeight: 600,
        marginBottom: '16px',
        color: '#6b7280'
      }}>
          Default Variant with Ad
        </h3>
        <AdDivider variant="default" showAd={true} adImageUrl={sampleAdImages.leaderboard} adWidth={728} adHeight={90} />
      </div>

      <div style={{
      marginBottom: '48px'
    }}>
        <h3 style={{
        fontSize: '1rem',
        fontWeight: 600,
        marginBottom: '16px',
        color: '#6b7280'
      }}>
          Minimal Variant (Text Only)
        </h3>
        <AdDivider variant="minimal" showAd={false} />
      </div>

      <div style={{
      marginBottom: '48px'
    }}>
        <h3 style={{
        fontSize: '1rem',
        fontWeight: 600,
        marginBottom: '16px',
        color: '#6b7280'
      }}>
          Prominent Variant with Ad
        </h3>
        <AdDivider variant="prominent" showAd={true} adImageUrl={sampleAdImages.leaderboard} adWidth={728} adHeight={90} />
      </div>

      <div>
        <h3 style={{
        fontSize: '1rem',
        fontWeight: 600,
        marginBottom: '16px',
        color: '#6b7280'
      }}>
          Placeholder (No Image)
        </h3>
        <AdDivider variant="default" showAd={true} adWidth={728} adHeight={90} />
      </div>
    </div>
}`,...h.parameters?.docs?.source}}};const C=["Default","WithMediumRectangle","WithBillboard","Placeholder","Minimal","Prominent","TextOnly","InArticleContext","AllVariants"];export{h as AllVariants,r as Default,m as InArticleContext,d as Minimal,o as Placeholder,s as Prominent,l as TextOnly,n as WithBillboard,i as WithMediumRectangle,C as __namedExportsOrder,T as default};
