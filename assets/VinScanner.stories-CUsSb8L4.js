import{r as c,j as e}from"./iframe-Dt2G9oOB.js";import{v as L}from"./index-Dto8T7jp.js";import{B as x}from"./Button-JVVUlsCr.js";import{S as H,U as Y,K as w}from"./upload-G2A7uqQK.js";import{C as O}from"./camera-p5pkWnuH.js";import{X as P}from"./x-CmrwJ9QT.js";import{C as W}from"./circle-alert-23S4H6NC.js";import{I as z}from"./info-CsDeFxDl.js";import{L as J}from"./loader-circle-D2N5V_jd.js";import{C as Z}from"./car-DfTqA1OY.js";import{R as q}from"./rotate-ccw-D4pOhZwI.js";import{C as X}from"./circle-check-big-BkqQLYGy.js";import"./preload-helper-PPVm8Dsz.js";import"./createLucideIcon-BJjrBNNS.js";const A=async n=>{if(await new Promise(p=>setTimeout(p,1500)),!/^[A-HJ-NPR-Z0-9]{17}$/i.test(n))return null;const m={1:{make:"Chevrolet",year:"2024"},2:{make:"Ford",year:"2024"},3:{make:"Chrysler",year:"2024"},4:{make:"Buick",year:"2024"},5:{make:"Honda",year:"2024"},J:{make:"Toyota",year:"2024"},W:{make:"BMW",year:"2024"}},t=n.charAt(0).toUpperCase(),r=m[t]||{make:"Unknown",year:"2024"},i=L.find(p=>p.make.toLowerCase()===r.make?.toLowerCase());return{vin:n.toUpperCase(),year:r.year||"2024",make:r.make||"Unknown",model:i?.model||"Model",trim:i?.trim||"Base",engine:"2.0L 4-Cylinder Turbo",transmission:i?.transmission||"Automatic",drivetrain:i?.drivetrain||"FWD",bodyStyle:i?.bodyStyle||"Sedan",fuelType:i?.fuelType||"Gasoline",vehicleImage:i?.image}},K=async n=>{await new Promise(m=>setTimeout(m,2e3));const h=["1HGBH41JXMN109186","5YJSA1E26MF123456","WVWZZZ3CZWE123456","1G1YY22G965109876"];return h[Math.floor(Math.random()*h.length)]},R=({onVinDecoded:n,onGetTradeInValue:h,compact:m=!1})=>{const[t,r]=c.useState("idle"),[i,p]=c.useState(""),[f,u]=c.useState(!1),[s,I]=c.useState(null),[V,l]=c.useState(null),[b,S]=c.useState(null),v=c.useRef(null),C=c.useRef(null),T=c.useRef(null),U=c.useCallback(async()=>{try{r("camera"),l(null);const a=await navigator.mediaDevices.getUserMedia({video:{facingMode:"environment",width:{ideal:1920},height:{ideal:1080}}});S(a),v.current&&(v.current.srcObject=a,v.current.play())}catch(a){console.error("Camera error:",a),l("Unable to access camera. Please check permissions or try uploading an image."),r("idle")}},[]),_=c.useCallback(()=>{b&&(b.getTracks().forEach(a=>a.stop()),S(null)),r("idle")},[b]),M=c.useCallback(async()=>{if(!v.current||!C.current)return;const a=v.current,o=C.current,d=o.getContext("2d");if(!d)return;o.width=a.videoWidth,o.height=a.videoHeight,d.drawImage(a,0,0);const k=o.toDataURL("image/jpeg",.9);_(),await D(k)},[_]),G=c.useCallback(async a=>{const o=a.target.files?.[0];if(!o)return;r("uploading"),l(null);const d=new FileReader;d.onload=async k=>{const B=k.target?.result;await D(B)},d.readAsDataURL(o)},[]),D=async a=>{r("processing");try{const o=await K(a);if(!o){l("Could not detect a VIN in the image. Please try again or enter manually."),r("error");return}const d=await A(o);if(!d){l("Invalid VIN format. Please try again or enter manually."),r("error");return}I(d),r("success"),n?.(d)}catch(o){console.error("Processing error:",o),l("An error occurred while processing. Please try again."),r("error")}},$=async()=>{if(!i||i.length!==17){l("Please enter a valid 17-character VIN");return}r("processing"),l(null);const a=await A(i);if(!a){l("Invalid VIN. Please check and try again."),r("error");return}I(a),r("success"),n?.(a)},E=()=>{r("idle"),I(null),l(null),p(""),u(!1),_()},F=a=>a.replace(/[IOQ]/gi,"").replace(/[^A-HJ-NPR-Z0-9]/gi,"").toUpperCase().slice(0,17);return e.jsx("section",{className:`vin-scanner ${m?"vin-scanner--compact":""}`,children:e.jsxs("div",{className:"vin-scanner__container",children:[!m&&e.jsxs("div",{className:"vin-scanner__header",children:[e.jsx("div",{className:"vin-scanner__icon",children:e.jsx(H,{size:24})}),e.jsxs("div",{className:"vin-scanner__title-group",children:[e.jsx("h2",{className:"vin-scanner__title",children:"Scan Your VIN"}),e.jsx("p",{className:"vin-scanner__subtitle",children:"Instantly identify your vehicle by scanning or photographing the VIN"})]})]}),e.jsxs("div",{className:"vin-scanner__content",children:[t==="idle"&&!f&&e.jsxs("div",{className:"vin-scanner__options",children:[e.jsxs("button",{className:"vin-scanner__option",onClick:U,children:[e.jsx("div",{className:"vin-scanner__option-icon",children:e.jsx(O,{size:32})}),e.jsxs("div",{className:"vin-scanner__option-text",children:[e.jsx("span",{className:"vin-scanner__option-title",children:"Use Camera"}),e.jsx("span",{className:"vin-scanner__option-desc",children:"Point at VIN barcode or plate"})]})]}),e.jsxs("button",{className:"vin-scanner__option",onClick:()=>T.current?.click(),children:[e.jsx("div",{className:"vin-scanner__option-icon",children:e.jsx(Y,{size:32})}),e.jsxs("div",{className:"vin-scanner__option-text",children:[e.jsx("span",{className:"vin-scanner__option-title",children:"Upload Photo"}),e.jsx("span",{className:"vin-scanner__option-desc",children:"Select an image of your VIN"})]})]}),e.jsxs("button",{className:"vin-scanner__option vin-scanner__option--secondary",onClick:()=>u(!0),children:[e.jsx("div",{className:"vin-scanner__option-icon vin-scanner__option-icon--secondary",children:e.jsx(w,{size:24})}),e.jsxs("div",{className:"vin-scanner__option-text",children:[e.jsx("span",{className:"vin-scanner__option-title",children:"Enter Manually"}),e.jsx("span",{className:"vin-scanner__option-desc",children:"Type your 17-character VIN"})]})]}),e.jsx("input",{ref:T,type:"file",accept:"image/*",capture:"environment",onChange:G,className:"vin-scanner__file-input"})]}),f&&t==="idle"&&e.jsxs("div",{className:"vin-scanner__manual",children:[e.jsxs("div",{className:"vin-scanner__manual-header",children:[e.jsx("h3",{className:"vin-scanner__manual-title",children:"Enter Your VIN"}),e.jsx("button",{className:"vin-scanner__back-btn",onClick:()=>u(!1),children:e.jsx(P,{size:20})})]}),e.jsxs("div",{className:"vin-scanner__manual-input-wrapper",children:[e.jsx("input",{type:"text",className:"vin-scanner__manual-input",placeholder:"e.g. 1HGBH41JXMN109186",value:i,onChange:a=>p(F(a.target.value)),maxLength:17}),e.jsxs("span",{className:"vin-scanner__char-count",children:[i.length,"/17"]})]}),V&&e.jsxs("div",{className:"vin-scanner__error-inline",children:[e.jsx(W,{size:16}),e.jsx("span",{children:V})]}),e.jsx(x,{variant:"primary",size:"large",fullWidth:!0,onClick:$,disabled:i.length!==17,children:"DECODE VIN"}),e.jsxs("div",{className:"vin-scanner__vin-help",children:[e.jsx(z,{size:16}),e.jsx("p",{children:"Find your VIN on the driver's side dashboard (visible through windshield), driver's door jamb, or your vehicle registration."})]})]}),t==="camera"&&e.jsxs("div",{className:"vin-scanner__camera",children:[e.jsx("video",{ref:v,className:"vin-scanner__video",playsInline:!0,autoPlay:!0,muted:!0}),e.jsx("canvas",{ref:C,className:"vin-scanner__canvas"}),e.jsxs("div",{className:"vin-scanner__camera-overlay",children:[e.jsxs("div",{className:"vin-scanner__scan-frame",children:[e.jsx("div",{className:"vin-scanner__scan-corner vin-scanner__scan-corner--tl"}),e.jsx("div",{className:"vin-scanner__scan-corner vin-scanner__scan-corner--tr"}),e.jsx("div",{className:"vin-scanner__scan-corner vin-scanner__scan-corner--bl"}),e.jsx("div",{className:"vin-scanner__scan-corner vin-scanner__scan-corner--br"}),e.jsx("div",{className:"vin-scanner__scan-line"})]}),e.jsx("p",{className:"vin-scanner__camera-hint",children:"Position the VIN within the frame"})]}),e.jsxs("div",{className:"vin-scanner__camera-controls",children:[e.jsx("button",{className:"vin-scanner__camera-btn vin-scanner__camera-btn--cancel",onClick:_,children:e.jsx(P,{size:24})}),e.jsx("button",{className:"vin-scanner__camera-btn vin-scanner__camera-btn--capture",onClick:M,children:e.jsx("div",{className:"vin-scanner__capture-ring"})}),e.jsx("button",{className:"vin-scanner__camera-btn vin-scanner__camera-btn--manual",onClick:()=>{_(),u(!0)},children:e.jsx(w,{size:24})})]})]}),(t==="processing"||t==="uploading")&&e.jsxs("div",{className:"vin-scanner__processing",children:[e.jsxs("div",{className:"vin-scanner__processing-animation",children:[e.jsx(J,{size:48,className:"vin-scanner__spinner"}),e.jsx(Z,{size:32,className:"vin-scanner__car-icon"})]}),e.jsx("h3",{className:"vin-scanner__processing-title",children:t==="uploading"?"Uploading Image...":"Decoding VIN..."}),e.jsx("p",{className:"vin-scanner__processing-text",children:t==="uploading"?"Preparing your image for analysis":"Identifying your vehicle details"})]}),t==="error"&&e.jsxs("div",{className:"vin-scanner__error",children:[e.jsx("div",{className:"vin-scanner__error-icon",children:e.jsx(W,{size:48})}),e.jsx("h3",{className:"vin-scanner__error-title",children:"Unable to Decode"}),e.jsx("p",{className:"vin-scanner__error-text",children:V}),e.jsxs("div",{className:"vin-scanner__error-actions",children:[e.jsx(x,{variant:"primary",onClick:E,iconLeft:e.jsx(q,{size:18}),children:"TRY AGAIN"}),e.jsx(x,{variant:"outline",onClick:()=>{r("idle"),u(!0)},iconLeft:e.jsx(w,{size:18}),children:"ENTER MANUALLY"})]})]}),t==="success"&&s&&e.jsxs("div",{className:"vin-scanner__success",children:[e.jsxs("div",{className:"vin-scanner__success-header",children:[e.jsx(X,{size:24,className:"vin-scanner__success-icon"}),e.jsx("span",{className:"vin-scanner__success-label",children:"Vehicle Identified"})]}),e.jsxs("div",{className:"vin-scanner__vehicle-card",children:[s.vehicleImage&&e.jsx("div",{className:"vin-scanner__vehicle-image",children:e.jsx("img",{src:s.vehicleImage,alt:`${s.year} ${s.make} ${s.model}`})}),e.jsxs("div",{className:"vin-scanner__vehicle-info",children:[e.jsxs("h3",{className:"vin-scanner__vehicle-title",children:[s.year," ",s.make," ",s.model]}),s.trim&&e.jsx("span",{className:"vin-scanner__vehicle-trim",children:s.trim}),e.jsxs("div",{className:"vin-scanner__vehicle-vin",children:[e.jsx("span",{className:"vin-scanner__vin-label",children:"VIN:"}),e.jsx("span",{className:"vin-scanner__vin-value",children:s.vin})]}),e.jsxs("div",{className:"vin-scanner__vehicle-specs",children:[s.engine&&e.jsxs("div",{className:"vin-scanner__spec",children:[e.jsx("span",{className:"vin-scanner__spec-label",children:"Engine"}),e.jsx("span",{className:"vin-scanner__spec-value",children:s.engine})]}),s.transmission&&e.jsxs("div",{className:"vin-scanner__spec",children:[e.jsx("span",{className:"vin-scanner__spec-label",children:"Transmission"}),e.jsx("span",{className:"vin-scanner__spec-value",children:s.transmission})]}),s.drivetrain&&e.jsxs("div",{className:"vin-scanner__spec",children:[e.jsx("span",{className:"vin-scanner__spec-label",children:"Drivetrain"}),e.jsx("span",{className:"vin-scanner__spec-value",children:s.drivetrain})]}),s.fuelType&&e.jsxs("div",{className:"vin-scanner__spec",children:[e.jsx("span",{className:"vin-scanner__spec-label",children:"Fuel Type"}),e.jsx("span",{className:"vin-scanner__spec-value",children:s.fuelType})]})]})]})]}),e.jsxs("div",{className:"vin-scanner__success-actions",children:[e.jsx(x,{variant:"success",size:"large",fullWidth:!0,onClick:()=>h?.(s),children:"GET TRADE-IN VALUE"}),e.jsx(x,{variant:"outline",size:"large",fullWidth:!0,onClick:E,children:"SCAN ANOTHER VIN"})]})]})]}),!m&&t==="idle"&&!f&&e.jsxs("div",{className:"vin-scanner__footer",children:[e.jsxs("div",{className:"vin-scanner__powered-by",children:["Powered by ",e.jsx("strong",{children:"Google Cloud Vision"})]}),e.jsxs("div",{className:"vin-scanner__privacy",children:[e.jsx(z,{size:14}),e.jsx("span",{children:"Images are processed securely and not stored"})]})]})]})})};R.__docgenInfo={description:"",methods:[],displayName:"VinScanner",props:{onVinDecoded:{required:!1,tsType:{name:"signature",type:"function",raw:"(data: VinDecodedData) => void",signature:{arguments:[{type:{name:"VinDecodedData"},name:"data"}],return:{name:"void"}}},description:"Callback when VIN is successfully decoded"},onGetTradeInValue:{required:!1,tsType:{name:"signature",type:"function",raw:"(data: VinDecodedData) => void",signature:{arguments:[{type:{name:"VinDecodedData"},name:"data"}],return:{name:"void"}}},description:"Callback when user wants to get trade-in value"},compact:{required:!1,tsType:{name:"boolean"},description:"Show compact mode (for embedding in other components)",defaultValue:{value:"false",computed:!1}}}};const ve={title:"Components/VinScanner",component:R,parameters:{layout:"centered",docs:{description:{component:`
# VIN Scanner

A component that allows users to scan or photograph their Vehicle Identification Number (VIN) to instantly identify vehicle details. 

## Features

- **Camera Scanning**: Use device camera to capture VIN barcode or plate
- **Photo Upload**: Upload an existing image of the VIN
- **Manual Entry**: Type the 17-character VIN directly
- **Vehicle Decoding**: Automatically decodes VIN to show vehicle details
- **Trade-in Integration**: Direct path to get trade-in value

## Google Cloud Vision Integration

In production, this component integrates with Google Cloud Vision API for:
- **TEXT_DETECTION**: Extract text from images
- **VIN Pattern Matching**: Filter extracted text for valid VIN format
- **OCR Processing**: Handle various VIN label formats and conditions

## NHTSA vPIC API

Vehicle decoding uses the NHTSA vPIC API to retrieve:
- Year, Make, Model, Trim
- Engine specifications
- Transmission type
- Body style and more

## Usage

\`\`\`tsx
<VinScanner
  onVinDecoded={(data) => console.log('Decoded:', data)}
  onGetTradeInValue={(data) => navigateToTradeIn(data)}
/>
\`\`\`
        `}}},tags:["autodocs"],argTypes:{compact:{control:"boolean",description:"Show compact mode for embedding in other components"},onVinDecoded:{action:"vinDecoded",description:"Callback when VIN is successfully decoded"},onGetTradeInValue:{action:"getTradeInValue",description:"Callback when user wants to get trade-in value"}}},g={args:{},decorators:[n=>e.jsx("div",{style:{width:"600px",maxWidth:"100%"},children:e.jsx(n,{})})]},N={args:{compact:!0},decorators:[n=>e.jsx("div",{style:{width:"400px",maxWidth:"100%"},children:e.jsx(n,{})})],parameters:{docs:{description:{story:"Compact mode for embedding in modals or sidebars."}}}},y={args:{onVinDecoded:n=>{console.log("VIN Decoded:",n),alert(`Decoded: ${n.year} ${n.make} ${n.model}`)},onGetTradeInValue:n=>{console.log("Get Trade-in Value:",n),alert(`Getting trade-in value for: ${n.year} ${n.make} ${n.model}`)}},decorators:[n=>e.jsx("div",{style:{width:"600px",maxWidth:"100%"},children:e.jsx(n,{})})],parameters:{docs:{description:{story:"With callback handlers for decoded VIN and trade-in value requests."}}}},j={args:{compact:!0},decorators:[n=>e.jsxs("div",{style:{width:"500px",maxWidth:"100%",padding:"24px",background:"#f5f5f5",borderRadius:"12px"},children:[e.jsx("h3",{style:{marginBottom:"16px",fontFamily:"Inter, sans-serif",fontWeight:800,fontSize:"20px"},children:"Step 1: Identify Your Vehicle"}),e.jsx("p",{style:{marginBottom:"24px",fontFamily:"Inter, sans-serif",fontSize:"14px",color:"#666"},children:"Scan your VIN to get an instant trade-in estimate"}),e.jsx(n,{})]})],parameters:{docs:{description:{story:"Example of VIN Scanner embedded in a trade-in flow."}}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {},
  decorators: [Story => <div style={{
    width: '600px',
    maxWidth: '100%'
  }}>
        <Story />
      </div>]
}`,...g.parameters?.docs?.source}}};N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  args: {
    compact: true
  },
  decorators: [Story => <div style={{
    width: '400px',
    maxWidth: '100%'
  }}>
        <Story />
      </div>],
  parameters: {
    docs: {
      description: {
        story: 'Compact mode for embedding in modals or sidebars.'
      }
    }
  }
}`,...N.parameters?.docs?.source}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  args: {
    onVinDecoded: data => {
      console.log('VIN Decoded:', data);
      alert(\`Decoded: \${data.year} \${data.make} \${data.model}\`);
    },
    onGetTradeInValue: data => {
      console.log('Get Trade-in Value:', data);
      alert(\`Getting trade-in value for: \${data.year} \${data.make} \${data.model}\`);
    }
  },
  decorators: [Story => <div style={{
    width: '600px',
    maxWidth: '100%'
  }}>
        <Story />
      </div>],
  parameters: {
    docs: {
      description: {
        story: 'With callback handlers for decoded VIN and trade-in value requests.'
      }
    }
  }
}`,...y.parameters?.docs?.source}}};j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  args: {
    compact: true
  },
  decorators: [Story => <div style={{
    width: '500px',
    maxWidth: '100%',
    padding: '24px',
    background: '#f5f5f5',
    borderRadius: '12px'
  }}>
        <h3 style={{
      marginBottom: '16px',
      fontFamily: 'Inter, sans-serif',
      fontWeight: 800,
      fontSize: '20px'
    }}>
          Step 1: Identify Your Vehicle
        </h3>
        <p style={{
      marginBottom: '24px',
      fontFamily: 'Inter, sans-serif',
      fontSize: '14px',
      color: '#666'
    }}>
          Scan your VIN to get an instant trade-in estimate
        </p>
        <Story />
      </div>],
  parameters: {
    docs: {
      description: {
        story: 'Example of VIN Scanner embedded in a trade-in flow.'
      }
    }
  }
}`,...j.parameters?.docs?.source}}};const he=["Default","Compact","WithCallbacks","InTradeInFlow"];export{N as Compact,g as Default,j as InTradeInFlow,y as WithCallbacks,he as __namedExportsOrder,ve as default};
