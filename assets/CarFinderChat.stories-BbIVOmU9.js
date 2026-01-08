import{r as f,j as e}from"./iframe-DIdqqM8u.js";import{v as H}from"./index-Dto8T7jp.js";import{c as C}from"./createLucideIcon-N_7SJ2wa.js";import{R as G}from"./rotate-ccw-OErXo_t7.js";import{X as q}from"./x-Clpn9Bq_.js";import{T as J,a as Q}from"./thumbs-up-CcS6WQ75.js";import{L as Y}from"./loader-circle-GBQ6246s.js";import{S as K}from"./send-GdthpGTJ.js";import{D as X}from"./dollar-sign-DbyR-4wE.js";import{C as Z}from"./car-CygSaoec.js";import{F as E}from"./fuel-BeLnPinK.js";import{U as ee}from"./users-CkGBbrVg.js";import{G as te}from"./gauge-Cw1wgYoj.js";import{C as se}from"./chevron-right-BWtBJVU4.js";import"./preload-helper-PPVm8Dsz.js";const ie=[["path",{d:"M15 3h6v6",key:"1q9fwt"}],["path",{d:"m21 3-7 7",key:"1l2asr"}],["path",{d:"m3 21 7-7",key:"tjx5ai"}],["path",{d:"M9 21H3v-6",key:"wtvkvv"}]],ae=C("maximize-2",ie);const ne=[["path",{d:"M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719",key:"1sd12s"}]],re=C("message-circle",ne);const oe=[["path",{d:"m14 10 7-7",key:"oa77jy"}],["path",{d:"M20 10h-6V4",key:"mjg0md"}],["path",{d:"m3 21 7-7",key:"tjx5ai"}],["path",{d:"M4 14h6v6",key:"rmj7iw"}]],ce=C("minimize-2",oe);const le=[["path",{d:"M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z",key:"1s2grr"}],["path",{d:"M20 2v4",key:"1rf3ol"}],["path",{d:"M22 4h-4",key:"gwowj6"}],["circle",{cx:"4",cy:"20",r:"2",key:"6kqj1y"}]],x=C("sparkles",le),de=["Find me a family SUV under $45,000","What's the best electric car for commuting?","I need a truck for towing","Show me fuel-efficient sedans","What sports cars are under $60,000?"],he=s=>{const n={},i=s.toLowerCase(),a=i.match(/(?:under|below|less than|max|budget|around)\s*\$?([\d,]+)(?:k|000)?/i);if(a){const o=parseInt(a[1].replace(/,/g,"")),l=o<1e3?o*1e3:o;n.budget={min:0,max:l}}const r=i.match(/\$?([\d,]+)(?:k|000)?\s*(?:to|-)\s*\$?([\d,]+)(?:k|000)?/i);if(r){let o=parseInt(r[1].replace(/,/g,"")),l=parseInt(r[2].replace(/,/g,""));o=o<1e3?o*1e3:o,l=l<1e3?l*1e3:l,n.budget={min:o,max:l}}const c=[];/suv|crossover/i.test(i)&&c.push("SUV"),/sedan/i.test(i)&&c.push("Sedan"),/truck|pickup/i.test(i)&&c.push("Truck"),/coupe/i.test(i)&&c.push("Coupe"),/hatchback/i.test(i)&&c.push("Hatchback"),/convertible/i.test(i)&&c.push("Convertible"),/wagon/i.test(i)&&c.push("Wagon"),/sports?\s*car/i.test(i)&&c.push("Coupe","Convertible"),c.length>0&&(n.bodyStyles=c);const d=[];/electric|ev\b|battery/i.test(i)&&d.push("Electric"),/hybrid|phev/i.test(i)&&d.push("Hybrid","Plug-in Hybrid"),/gas|gasoline|petrol/i.test(i)&&d.push("Gasoline"),/diesel/i.test(i)&&d.push("Diesel"),/fuel.?efficient|good\s*mpg|great\s*mpg/i.test(i)&&(n.priorities=[...n.priorities||[],"fuel-efficiency"]),d.length>0&&(n.fuelTypes=d),/family|kids|children/i.test(i)&&(n.seatingCapacity=5,n.priorities=[...n.priorities||[],"family-friendly"]),/7.?seat|third.?row|3rd.?row/i.test(i)&&(n.seatingCapacity=7);const h=[];/tow|towing|haul/i.test(i)&&h.push("towing"),/commut/i.test(i)&&h.push("commuting"),/luxury|premium/i.test(i)&&h.push("luxury"),/reliable|reliability/i.test(i)&&h.push("reliability"),/fast|speed|performance|powerful/i.test(i)&&h.push("performance"),/safe|safety/i.test(i)&&h.push("safety"),/awd|all.?wheel|4x4|4wd/i.test(i)&&h.push("AWD"),h.length>0&&(n.features=h);const p=[];return["Toyota","Honda","Ford","Chevrolet","BMW","Mercedes","Audi","Lexus","Mazda","Hyundai","Kia","Subaru","Volkswagen","Nissan","Jeep","Ram","Tesla","Porsche","Volvo","Acura"].forEach(o=>{i.includes(o.toLowerCase())&&p.push(o)}),p.length>0&&(n.makes=p),n},fe=s=>{let n=[...H];return s.budget&&(n=n.filter(i=>i.priceMin<=s.budget.max&&(s.budget.min===0||i.priceMax>=s.budget.min))),s.bodyStyles&&s.bodyStyles.length>0&&(n=n.filter(i=>s.bodyStyles.some(a=>i.bodyStyle.toLowerCase()===a.toLowerCase()))),s.fuelTypes&&s.fuelTypes.length>0&&(n=n.filter(i=>s.fuelTypes.some(a=>i.fuelType.toLowerCase().includes(a.toLowerCase())))),s.makes&&s.makes.length>0&&(n=n.filter(i=>s.makes.some(a=>i.make.toLowerCase()===a.toLowerCase()))),n.sort((i,a)=>{let r=i.staffRating,c=a.staffRating;if(i.editorsChoice&&(r+=.5),a.editorsChoice&&(c+=.5),i.tenBest&&(r+=.3),a.tenBest&&(c+=.3),s.priorities?.includes("fuel-efficiency")){const d=parseInt(i.mpg?.split("/")[1]||"0"),h=parseInt(a.mpg?.split("/")[1]||"0");r+=d/100,c+=h/100}return c-r}),n.slice(0,5)},pe=(s,n,i)=>{if(n.length===0)return"I couldn't find any vehicles matching your criteria. Could you try adjusting your budget or preferences? I'm here to help you find the perfect car!";const a=n[0];let r="";return s.bodyStyles?.includes("SUV")&&s.priorities?.includes("family-friendly")?r=`Great choice for a family SUV! Based on your preferences, I'd recommend the **${a.year} ${a.make} ${a.model}**. `:s.fuelTypes?.includes("Electric")?r=`For electric vehicles, the **${a.year} ${a.make} ${a.model}** stands out. `:s.features?.includes("towing")?r=`For towing capability, I'd suggest the **${a.year} ${a.make} ${a.model}**. `:s.features?.includes("performance")?r=`If you're looking for performance, check out the **${a.year} ${a.make} ${a.model}**. `:r=`Based on your needs, I'd recommend the **${a.year} ${a.make} ${a.model}**. `,a.staffRating>=9?r+=`It has an excellent ${a.staffRating}/10 rating from our experts`:a.staffRating>=8&&(r+=`It scores a solid ${a.staffRating}/10 from our team`),a.editorsChoice&&(r+=" and is an **Editor's Choice**"),a.tenBest&&(r+=", plus it made our **10Best** list"),r+=".",s.budget&&(a.priceMin<s.budget.max*.7?r+=` At ${a.priceRange}, it's well within your budget, leaving room for options.`:r+=` Starting at ${a.priceRange}, it fits nicely in your budget.`),n.length>1&&(r+=`

I've also found ${n.length-1} other great ${s.bodyStyles?.[0]?.toLowerCase()||"vehicle"}${n.length>2?"s":""} that match what you're looking for. Take a look below!`),r},R=({onVehicleSelect:s,defaultOpen:n=!1,floating:i=!1,position:a="bottom-right"})=>{const[r,c]=f.useState(n),[d,h]=f.useState(!1),[p,u]=f.useState([]),[o,l]=f.useState(""),[S,F]=f.useState(!1),[z,M]=f.useState({}),W=f.useRef(null),N=f.useRef(null);f.useEffect(()=>{W.current?.scrollIntoView({behavior:"smooth"})},[p]),f.useEffect(()=>{r&&setTimeout(()=>N.current?.focus(),100)},[r]);const T=f.useCallback(async t=>{if(!t.trim())return;const g={id:`user-${Date.now()}`,role:"user",content:t.trim(),timestamp:new Date};u(y=>[...y,g]),l(""),F(!0);const $=he(t),m={...z,...$};M(m),await new Promise(y=>setTimeout(y,1e3+Math.random()*1e3));const I=fe(m),U=pe(m,I),O={id:`assistant-${Date.now()}`,role:"assistant",content:U,vehicles:I.length>0?I:void 0,timestamp:new Date};u(y=>[...y,O]),F(!1)},[z]),B=t=>{t.preventDefault(),T(o)},D=t=>{T(t)},V=(t,g)=>{u($=>$.map(m=>m.id===t?{...m,feedback:g}:m))},A=()=>{u([]),M({}),N.current?.focus()},L=t=>new Intl.NumberFormat("en-US",{style:"currency",currency:"USD",minimumFractionDigits:0,maximumFractionDigits:0}).format(t),P=t=>e.jsxs("button",{className:"car-finder-chat__vehicle-card",onClick:()=>s?.(t),children:[e.jsxs("div",{className:"car-finder-chat__vehicle-image",children:[e.jsx("img",{src:t.image,alt:`${t.year} ${t.make} ${t.model}`}),t.editorsChoice&&e.jsx("span",{className:"car-finder-chat__vehicle-badge",children:"Editor's Choice"})]}),e.jsxs("div",{className:"car-finder-chat__vehicle-info",children:[e.jsxs("h4",{className:"car-finder-chat__vehicle-name",children:[t.year," ",t.make," ",t.model]}),e.jsxs("div",{className:"car-finder-chat__vehicle-meta",children:[e.jsxs("span",{className:"car-finder-chat__vehicle-price",children:[L(t.priceMin),"+"]}),e.jsxs("span",{className:"car-finder-chat__vehicle-rating",children:["★ ",t.staffRating]})]}),e.jsxs("div",{className:"car-finder-chat__vehicle-specs",children:[t.mpg&&e.jsxs("span",{children:[e.jsx(E,{size:12})," ",t.mpg]}),t.horsepower&&e.jsxs("span",{children:[e.jsx(te,{size:12})," ",t.horsepower," hp"]})]})]}),e.jsx(se,{size:16,className:"car-finder-chat__vehicle-arrow"})]},t.id);return i&&!r?e.jsxs("button",{className:`car-finder-chat__fab car-finder-chat__fab--${a}`,onClick:()=>c(!0),"aria-label":"Open car finder chat",children:[e.jsx(x,{size:24}),e.jsx("span",{className:"car-finder-chat__fab-label",children:"Find My Car"})]}):e.jsxs("div",{className:`car-finder-chat ${i?"car-finder-chat--floating":""} ${i?`car-finder-chat--${a}`:""} ${d?"car-finder-chat--expanded":""}`,children:[e.jsxs("div",{className:"car-finder-chat__header",children:[e.jsxs("div",{className:"car-finder-chat__header-left",children:[e.jsx("div",{className:"car-finder-chat__avatar",children:e.jsx(x,{size:20})}),e.jsxs("div",{className:"car-finder-chat__header-text",children:[e.jsx("h3",{className:"car-finder-chat__title",children:"Car Finder AI"}),e.jsxs("span",{className:"car-finder-chat__status",children:[e.jsx("span",{className:"car-finder-chat__status-dot"}),"Powered by Gemini"]})]})]}),e.jsxs("div",{className:"car-finder-chat__header-actions",children:[p.length>0&&e.jsx("button",{className:"car-finder-chat__header-btn",onClick:A,title:"Start new conversation",children:e.jsx(G,{size:18})}),i&&e.jsxs(e.Fragment,{children:[e.jsx("button",{className:"car-finder-chat__header-btn",onClick:()=>h(!d),title:d?"Minimize":"Expand",children:d?e.jsx(ce,{size:18}):e.jsx(ae,{size:18})}),e.jsx("button",{className:"car-finder-chat__header-btn",onClick:()=>c(!1),title:"Close",children:e.jsx(q,{size:18})})]})]})]}),e.jsx("div",{className:"car-finder-chat__messages",children:p.length===0?e.jsxs("div",{className:"car-finder-chat__welcome",children:[e.jsx("div",{className:"car-finder-chat__welcome-icon",children:e.jsx(x,{size:32})}),e.jsx("h4",{className:"car-finder-chat__welcome-title",children:"Hi! I'm your AI car shopping assistant"}),e.jsx("p",{className:"car-finder-chat__welcome-text",children:"Tell me what you're looking for and I'll help you find the perfect vehicle. You can describe your needs, budget, or preferences."}),e.jsxs("div",{className:"car-finder-chat__suggestions",children:[e.jsx("span",{className:"car-finder-chat__suggestions-label",children:"Try asking:"}),e.jsx("div",{className:"car-finder-chat__suggestions-list",children:de.map((t,g)=>e.jsxs("button",{className:"car-finder-chat__suggestion",onClick:()=>D(t),children:[e.jsx(re,{size:14}),t]},g))})]})]}):e.jsxs(e.Fragment,{children:[p.map(t=>e.jsxs("div",{className:`car-finder-chat__message car-finder-chat__message--${t.role}`,children:[t.role==="assistant"&&e.jsx("div",{className:"car-finder-chat__message-avatar",children:e.jsx(x,{size:16})}),e.jsxs("div",{className:"car-finder-chat__message-content",children:[e.jsx("div",{className:"car-finder-chat__message-text",dangerouslySetInnerHTML:{__html:t.content.replace(/\*\*(.*?)\*\*/g,"<strong>$1</strong>").replace(/\n/g,"<br />")}}),t.vehicles&&t.vehicles.length>0&&e.jsx("div",{className:"car-finder-chat__vehicles",children:t.vehicles.map(P)}),t.role==="assistant"&&e.jsxs("div",{className:"car-finder-chat__feedback",children:[e.jsx("span",{className:"car-finder-chat__feedback-label",children:"Was this helpful?"}),e.jsx("button",{className:`car-finder-chat__feedback-btn ${t.feedback==="positive"?"car-finder-chat__feedback-btn--active":""}`,onClick:()=>V(t.id,"positive"),children:e.jsx(J,{size:14})}),e.jsx("button",{className:`car-finder-chat__feedback-btn ${t.feedback==="negative"?"car-finder-chat__feedback-btn--active":""}`,onClick:()=>V(t.id,"negative"),children:e.jsx(Q,{size:14})})]})]})]},t.id)),S&&e.jsxs("div",{className:"car-finder-chat__message car-finder-chat__message--assistant",children:[e.jsx("div",{className:"car-finder-chat__message-avatar",children:e.jsx(x,{size:16})}),e.jsx("div",{className:"car-finder-chat__message-content",children:e.jsxs("div",{className:"car-finder-chat__typing",children:[e.jsx(Y,{size:16,className:"car-finder-chat__typing-spinner"}),e.jsx("span",{children:"Finding the best options for you..."})]})})]}),e.jsx("div",{ref:W})]})}),e.jsxs("form",{className:"car-finder-chat__input-area",onSubmit:B,children:[e.jsxs("div",{className:"car-finder-chat__input-wrapper",children:[e.jsx("input",{ref:N,type:"text",className:"car-finder-chat__input",placeholder:"Describe your ideal car...",value:o,onChange:t=>l(t.target.value),disabled:S}),e.jsx("button",{type:"submit",className:"car-finder-chat__send-btn",disabled:!o.trim()||S,children:e.jsx(K,{size:18})})]}),e.jsxs("div",{className:"car-finder-chat__input-hints",children:[e.jsxs("button",{type:"button",onClick:()=>l("under $40,000"),children:[e.jsx(X,{size:12})," Budget"]}),e.jsxs("button",{type:"button",onClick:()=>l(o+" SUV"),children:[e.jsx(Z,{size:12})," SUV"]}),e.jsxs("button",{type:"button",onClick:()=>l(o+" electric"),children:[e.jsx(E,{size:12})," Electric"]}),e.jsxs("button",{type:"button",onClick:()=>l(o+" family"),children:[e.jsx(ee,{size:12})," Family"]})]})]})]})};R.__docgenInfo={description:"",methods:[],displayName:"CarFinderChat",props:{onVehicleSelect:{required:!1,tsType:{name:"signature",type:"function",raw:"(vehicle: Vehicle) => void",signature:{arguments:[{type:{name:"Vehicle"},name:"vehicle"}],return:{name:"void"}}},description:"Callback when user selects a vehicle"},defaultOpen:{required:!1,tsType:{name:"boolean"},description:"Initial open state",defaultValue:{value:"false",computed:!1}},floating:{required:!1,tsType:{name:"boolean"},description:"Floating mode (bottom-right corner)",defaultValue:{value:"false",computed:!1}},position:{required:!1,tsType:{name:"union",raw:"'bottom-right' | 'bottom-left'",elements:[{name:"literal",value:"'bottom-right'"},{name:"literal",value:"'bottom-left'"}]},description:"Position for floating mode",defaultValue:{value:"'bottom-right'",computed:!1}}}};const Ie={title:"Components/CarFinderChat",component:R,parameters:{layout:"centered",docs:{description:{component:`
# Car Finder Chat

An AI-powered conversational interface that helps users find their perfect vehicle through natural language queries.

## Features

- **Natural Language Understanding**: Parse user intent from conversational queries
- **Smart Vehicle Matching**: Filter and rank vehicles based on preferences
- **Context Awareness**: Maintains conversation context for follow-up questions
- **Vehicle Cards**: Display matching vehicles with key specs
- **Floating Mode**: Can be used as a floating chat widget

## Google Gemini Integration

In production, this component integrates with Google Gemini API for:
- **Intent Classification**: Understand what the user is looking for
- **Entity Extraction**: Pull out budget, body style, features, etc.
- **Response Generation**: Create helpful, personalized responses
- **Conversation Memory**: Remember context across messages

## Supported Queries

Users can ask about:
- Budget constraints: "under $40,000", "$30k to $50k"
- Body styles: "SUV", "sedan", "truck", "sports car"
- Fuel types: "electric", "hybrid", "fuel-efficient"
- Features: "towing", "family-friendly", "luxury", "AWD"
- Specific makes: "Toyota", "BMW", "Tesla"

## Usage

\`\`\`tsx
// Embedded mode
<CarFinderChat
  onVehicleSelect={(vehicle) => navigate(\`/vehicles/\${vehicle.slug}\`)}
/>

// Floating widget
<CarFinderChat
  floating
  position="bottom-right"
  onVehicleSelect={(vehicle) => navigate(\`/vehicles/\${vehicle.slug}\`)}
/>
\`\`\`
        `}}},tags:["autodocs"],argTypes:{floating:{control:"boolean",description:"Enable floating mode (bottom corner widget)"},position:{control:"select",options:["bottom-right","bottom-left"],description:"Position for floating mode"},defaultOpen:{control:"boolean",description:"Initial open state (for floating mode)"},onVehicleSelect:{action:"vehicleSelected",description:"Callback when user selects a vehicle"}}},b={args:{floating:!1},decorators:[s=>e.jsx("div",{style:{width:"420px",maxWidth:"100%",height:"600px"},children:e.jsx(s,{})})]},v={args:{floating:!0,position:"bottom-right",defaultOpen:!1},parameters:{layout:"fullscreen",docs:{description:{story:"Floating chat widget that appears in the bottom corner of the screen. Click the button to open."}}},decorators:[s=>e.jsxs("div",{style:{width:"100vw",height:"100vh",background:"linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)",position:"relative"},children:[e.jsxs("div",{style:{padding:"40px",maxWidth:"800px",margin:"0 auto"},children:[e.jsx("h1",{style:{fontFamily:"Inter, sans-serif",fontWeight:800,marginBottom:"16px"},children:"Welcome to Car and Driver Marketplace"}),e.jsx("p",{style:{fontFamily:"Inter, sans-serif",color:"#666",fontSize:"16px",lineHeight:1.6},children:"Browse our extensive collection of new and used vehicles. Need help finding the perfect car? Click the chat button in the bottom right corner to talk to our AI assistant!"})]}),e.jsx(s,{})]})]},_={args:{floating:!0,position:"bottom-right",defaultOpen:!0},parameters:{layout:"fullscreen",docs:{description:{story:"Floating widget in its open state."}}},decorators:[s=>e.jsx("div",{style:{width:"100vw",height:"100vh",background:"#f5f5f5",position:"relative"},children:e.jsx(s,{})})]},j={args:{floating:!0,position:"bottom-left",defaultOpen:!0},parameters:{layout:"fullscreen",docs:{description:{story:"Floating widget positioned in the bottom-left corner."}}},decorators:[s=>e.jsx("div",{style:{width:"100vw",height:"100vh",background:"#f5f5f5",position:"relative"},children:e.jsx(s,{})})]},k={args:{floating:!1,onVehicleSelect:s=>{console.log("Selected vehicle:",s),alert(`Selected: ${s.year} ${s.make} ${s.model}
Price: ${s.priceRange}`)}},decorators:[s=>e.jsx("div",{style:{width:"420px",maxWidth:"100%",height:"600px"},children:e.jsx(s,{})})],parameters:{docs:{description:{story:"With vehicle selection callback. Try asking for a vehicle and clicking on a result."}}}},w={args:{floating:!1},decorators:[s=>e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 420px",gap:"24px",width:"100%",maxWidth:"1200px",padding:"24px",background:"#fff"},children:[e.jsxs("div",{children:[e.jsx("h2",{style:{fontFamily:"Inter, sans-serif",fontWeight:800,fontSize:"28px",marginBottom:"16px"},children:"Find Your Perfect Car"}),e.jsx("p",{style:{fontFamily:"Inter, sans-serif",color:"#666",fontSize:"14px",lineHeight:1.6,marginBottom:"24px"},children:"Our AI-powered car finder helps you discover vehicles that match your lifestyle, budget, and preferences. Just tell us what you're looking for in plain English!"}),e.jsxs("div",{style:{padding:"20px",background:"#f5f5f5",borderRadius:"8px"},children:[e.jsx("h3",{style:{fontFamily:"Inter, sans-serif",fontWeight:700,fontSize:"16px",marginBottom:"12px"},children:"Example Questions:"}),e.jsxs("ul",{style:{fontFamily:"Inter, sans-serif",fontSize:"14px",color:"#666",lineHeight:1.8,paddingLeft:"20px"},children:[e.jsx("li",{children:'"I need a family SUV under $45,000"'}),e.jsx("li",{children:`"What's the best electric car for commuting?"`}),e.jsx("li",{children:'"Show me reliable trucks for towing"'}),e.jsx("li",{children:'"Find luxury sedans with AWD"'})]})]})]}),e.jsx("div",{style:{height:"600px"},children:e.jsx(s,{})})]})],parameters:{layout:"padded",docs:{description:{story:"Example of the chat embedded in a page layout alongside content."}}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    floating: false
  },
  decorators: [Story => <div style={{
    width: '420px',
    maxWidth: '100%',
    height: '600px'
  }}>
        <Story />
      </div>]
}`,...b.parameters?.docs?.source}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: {
    floating: true,
    position: 'bottom-right',
    defaultOpen: false
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Floating chat widget that appears in the bottom corner of the screen. Click the button to open.'
      }
    }
  },
  decorators: [Story => <div style={{
    width: '100vw',
    height: '100vh',
    background: 'linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)',
    position: 'relative'
  }}>
        <div style={{
      padding: '40px',
      maxWidth: '800px',
      margin: '0 auto'
    }}>
          <h1 style={{
        fontFamily: 'Inter, sans-serif',
        fontWeight: 800,
        marginBottom: '16px'
      }}>
            Welcome to Car and Driver Marketplace
          </h1>
          <p style={{
        fontFamily: 'Inter, sans-serif',
        color: '#666',
        fontSize: '16px',
        lineHeight: 1.6
      }}>
            Browse our extensive collection of new and used vehicles. 
            Need help finding the perfect car? Click the chat button in the 
            bottom right corner to talk to our AI assistant!
          </p>
        </div>
        <Story />
      </div>]
}`,...v.parameters?.docs?.source}}};_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  args: {
    floating: true,
    position: 'bottom-right',
    defaultOpen: true
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Floating widget in its open state.'
      }
    }
  },
  decorators: [Story => <div style={{
    width: '100vw',
    height: '100vh',
    background: '#f5f5f5',
    position: 'relative'
  }}>
        <Story />
      </div>]
}`,..._.parameters?.docs?.source}}};j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  args: {
    floating: true,
    position: 'bottom-left',
    defaultOpen: true
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Floating widget positioned in the bottom-left corner.'
      }
    }
  },
  decorators: [Story => <div style={{
    width: '100vw',
    height: '100vh',
    background: '#f5f5f5',
    position: 'relative'
  }}>
        <Story />
      </div>]
}`,...j.parameters?.docs?.source}}};k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  args: {
    floating: false,
    onVehicleSelect: vehicle => {
      console.log('Selected vehicle:', vehicle);
      alert(\`Selected: \${vehicle.year} \${vehicle.make} \${vehicle.model}\\nPrice: \${vehicle.priceRange}\`);
    }
  },
  decorators: [Story => <div style={{
    width: '420px',
    maxWidth: '100%',
    height: '600px'
  }}>
        <Story />
      </div>],
  parameters: {
    docs: {
      description: {
        story: 'With vehicle selection callback. Try asking for a vehicle and clicking on a result.'
      }
    }
  }
}`,...k.parameters?.docs?.source}}};w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  args: {
    floating: false
  },
  decorators: [Story => <div style={{
    display: 'grid',
    gridTemplateColumns: '1fr 420px',
    gap: '24px',
    width: '100%',
    maxWidth: '1200px',
    padding: '24px',
    background: '#fff'
  }}>
        <div>
          <h2 style={{
        fontFamily: 'Inter, sans-serif',
        fontWeight: 800,
        fontSize: '28px',
        marginBottom: '16px'
      }}>
            Find Your Perfect Car
          </h2>
          <p style={{
        fontFamily: 'Inter, sans-serif',
        color: '#666',
        fontSize: '14px',
        lineHeight: 1.6,
        marginBottom: '24px'
      }}>
            Our AI-powered car finder helps you discover vehicles that match your 
            lifestyle, budget, and preferences. Just tell us what you're looking 
            for in plain English!
          </p>
          <div style={{
        padding: '20px',
        background: '#f5f5f5',
        borderRadius: '8px'
      }}>
            <h3 style={{
          fontFamily: 'Inter, sans-serif',
          fontWeight: 700,
          fontSize: '16px',
          marginBottom: '12px'
        }}>
              Example Questions:
            </h3>
            <ul style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '14px',
          color: '#666',
          lineHeight: 1.8,
          paddingLeft: '20px'
        }}>
              <li>"I need a family SUV under $45,000"</li>
              <li>"What's the best electric car for commuting?"</li>
              <li>"Show me reliable trucks for towing"</li>
              <li>"Find luxury sedans with AWD"</li>
            </ul>
          </div>
        </div>
        <div style={{
      height: '600px'
    }}>
          <Story />
        </div>
      </div>],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Example of the chat embedded in a page layout alongside content.'
      }
    }
  }
}`,...w.parameters?.docs?.source}}};const Fe=["Default","FloatingWidget","FloatingOpen","BottomLeft","WithVehicleSelection","EmbeddedInPage"];export{j as BottomLeft,b as Default,w as EmbeddedInPage,_ as FloatingOpen,v as FloatingWidget,k as WithVehicleSelection,Fe as __namedExportsOrder,Ie as default};
