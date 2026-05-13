import{r as m,j as e}from"./iframe-o0M0rmr0.js";import{I as ee}from"./info-Ct3ZY9dd.js";import{C as W}from"./chevron-down-DnVjoW5S.js";import{g as Q}from"./rangeInputStyle-DyBPPVQG.js";import{T as Z}from"./trending-down-CchHBQdo.js";import{T as J}from"./trending-up-CLw3F1P2.js";import{L as ce}from"./lightbulb-DV33qCs0.js";import{C as ie}from"./chevron-right-B56yNJ0G.js";import{M as le}from"./minus-B7ctOrj2.js";import"./preload-helper-PPVm8Dsz.js";import"./createLucideIcon-Bc6axmz-.js";const me=[{name:"LS FWD",msrp:21895},{name:"1RS FWD",msrp:23195},{name:"LT FWD",msrp:23395},{name:"RS FWD",msrp:24995},{name:"ACTIV FWD",msrp:24995}],de=(s,l="Gas")=>{const p=s>1e5?.55:s>5e4?.45:.37,d=Math.round(s*p),x=Math.round(s*.15),f=Math.round(s*.07);let o=7500;l==="Electric"?o=Math.round(s>1e5?4500:3500):l==="Hybrid"?o=Math.round(s>5e4?5500:4500):s>2e5?o=18e3:s>1e5?o=14e3:s>5e4?o=1e4:o=7500;let r=6e3;s>4e5?r=45e3:s>2e5?r=28e3:s>1e5?r=18e3:s>5e4?r=12e3:r=6e3;let c=1150;s>4e5?c=25e3:s>2e5?c=15e3:s>1e5?c=8e3:s>5e4?c=4e3:c=1150;let i=2750;return s>4e5?i=2e4:s>2e5?i=12e3:s>1e5?i=7e3:s>5e4?i=4500:i=2750,{depreciation:d,financing:x,taxesFees:f,fuel:o,insurance:r,repairs:c,maintenance:i}},X=(s,l)=>({Depreciation:[.3,.25,.2,.15,.1],Financing:[.22,.21,.2,.19,.18],"Taxes & Fees":[.6,.1,.1,.1,.1],Fuel:[.2,.2,.2,.2,.2],Insurance:[.22,.21,.2,.19,.18],Repairs:[.05,.1,.15,.3,.4],Maintenance:[.15,.18,.2,.22,.25]}[s]||[.2,.2,.2,.2,.2]).map(x=>Math.round(l*x)),pe=(s,l)=>{const p=s/l;return p<1?"Below Average":p<1.3?"Average":"Above Average"},he=(s,l)=>s<35e3?[{name:"Base",msrp:s},{name:"Sport",msrp:Math.round(s*1.08)},{name:"Premium",msrp:Math.round(s*1.15)}]:s<8e4?[{name:"Base",msrp:s},{name:"Sport",msrp:Math.round(s*1.1)},{name:"Premium",msrp:Math.round(s*1.18)},{name:"Performance",msrp:Math.round(s*1.25)}]:[{name:"Base",msrp:s},{name:"Performance",msrp:Math.round(s*1.15)},{name:"Track",msrp:Math.round(s*1.3)}],se=({vehicleName:s="Chevrolet Trax",msrp:l=21895,fuelType:p="Gas",trims:d})=>{const x=m.useMemo(()=>d&&d.length>0?d:s==="Chevrolet Trax"?me:he(l),[d,s,l]),[f,o]=m.useState(0),[r,c]=m.useState(!1),[i,y]=m.useState(null),b=x[f],S=b.msrp,v=m.useMemo(()=>de(S,p),[S,p]),u=m.useMemo(()=>[{name:"Depreciation",value:v.depreciation,color:"#1B5F8A",position:"bottom"},{name:"Financing",value:v.financing,color:"#3D8B8B",position:"top"},{name:"Taxes & Fees",value:v.taxesFees,color:"#D4A84B",position:"bottom"},{name:"Fuel",value:v.fuel,color:"#E67E22",position:"top"},{name:"Insurance",value:v.insurance,color:"#C0392B",position:"bottom"},{name:"Repairs",value:v.repairs,color:"#922B21",position:"top"},{name:"Maintenance",value:v.maintenance,color:"#5C1E1E",position:"bottom"}],[v]),E=u.reduce((a,t)=>a+t.value,0),w=E,A=pe(E,S),_=a=>new Intl.NumberFormat("en-US",{style:"currency",currency:"USD",minimumFractionDigits:0,maximumFractionDigits:0}).format(a),O=()=>A==="Below Average"?"#22C55E":A==="Average"?"var(--color-warning)":"#EF4444",M=a=>{let t=0;for(let g=0;g<a;g++)t+=u[g].value/w*100;return t+u[a].value/w*100/2};return e.jsx("section",{className:"cost-to-own",children:e.jsx("div",{className:"container",children:e.jsx("div",{className:"cost-to-own__card",children:e.jsxs("div",{className:"cost-to-own__main",children:[e.jsxs("div",{className:"cost-to-own__header",children:[e.jsxs("div",{className:"cost-to-own__title-group",children:[e.jsxs("h2",{className:"cost-to-own__title",children:[e.jsx("span",{className:"cost-to-own__title-vehicle",children:s}),e.jsxs("span",{className:"cost-to-own__title-label",children:["5-Year Cost to Own",e.jsx("sup",{className:"cost-to-own__trademark",children:"®"})]})]}),e.jsx("button",{className:"cost-to-own__info","aria-label":"More info",children:e.jsx(ee,{size:14})})]}),e.jsxs("div",{className:"cost-to-own__trim",children:[e.jsx("span",{className:"cost-to-own__trim-label",children:"Trim:"}),e.jsxs("div",{className:"cost-to-own__select-wrapper",children:[e.jsxs("button",{className:"cost-to-own__select",onClick:()=>c(!r),children:[b.name,e.jsx(W,{size:16})]}),r&&e.jsx("ul",{className:"cost-to-own__options",children:x.map((a,t)=>e.jsx("li",{children:e.jsx("button",{className:`cost-to-own__option ${f===t?"active":""}`,onClick:()=>{o(t),c(!1)},children:a.name})},a.name))})]})]})]}),e.jsxs("div",{className:"cost-to-own__summary",children:[e.jsx("span",{className:"cost-to-own__rating",style:{color:O()},children:A}),e.jsxs("div",{className:"cost-to-own__cost",children:[e.jsx("span",{className:"cost-to-own__amount",children:_(E)}),e.jsx("span",{className:"cost-to-own__period",children:"5-Year Ownership Costs"})]})]}),e.jsxs("div",{className:"cost-to-own__chart",children:[e.jsx("span",{className:"cost-to-own__chart-label",children:"Cost Breakdown"}),e.jsx("div",{className:"cost-to-own__labels-top",children:u.filter(a=>a.position==="top").map(a=>{const t=X(a.name,a.value);return e.jsxs("div",{className:"cost-to-own__marker cost-to-own__marker--top",style:{left:`${M(u.indexOf(a))}%`},onMouseEnter:()=>y(a.name),onMouseLeave:()=>y(null),children:[i===a.name&&e.jsxs("div",{className:"cost-to-own__tooltip cost-to-own__tooltip--top",children:[e.jsxs("div",{className:"cost-to-own__tooltip-header",children:[e.jsx("span",{className:"cost-to-own__tooltip-title",children:a.name}),e.jsx("span",{className:"cost-to-own__tooltip-total",children:_(a.value)})]}),e.jsx("div",{className:"cost-to-own__tooltip-breakdown",children:t.map((g,C)=>e.jsxs("div",{className:"cost-to-own__tooltip-row",children:[e.jsxs("span",{className:"cost-to-own__tooltip-year",children:["Year ",C+1]}),e.jsx("span",{className:"cost-to-own__tooltip-amount",children:_(g)})]},C))})]}),e.jsx("span",{className:"cost-to-own__marker-name",children:a.name}),e.jsx("span",{className:"cost-to-own__marker-value",children:_(a.value)}),e.jsx("div",{className:"cost-to-own__marker-line"}),e.jsx("div",{className:"cost-to-own__marker-dot"})]},a.name)})}),e.jsx("div",{className:"cost-to-own__bar",children:u.map(a=>e.jsx("div",{className:`cost-to-own__segment ${i===a.name?"cost-to-own__segment--active":""}`,style:{width:`${a.value/w*100}%`,backgroundColor:a.color},onMouseEnter:()=>y(a.name),onMouseLeave:()=>y(null)},a.name))}),e.jsx("div",{className:"cost-to-own__labels-bottom",children:u.filter(a=>a.position==="bottom").map(a=>{const t=X(a.name,a.value);return e.jsxs("div",{className:"cost-to-own__marker cost-to-own__marker--bottom",style:{left:`${M(u.indexOf(a))}%`},onMouseEnter:()=>y(a.name),onMouseLeave:()=>y(null),children:[e.jsx("div",{className:"cost-to-own__marker-dot"}),e.jsx("div",{className:"cost-to-own__marker-line"}),e.jsx("span",{className:"cost-to-own__marker-name",children:a.name}),e.jsx("span",{className:"cost-to-own__marker-value",children:_(a.value)}),i===a.name&&e.jsxs("div",{className:"cost-to-own__tooltip cost-to-own__tooltip--bottom",children:[e.jsxs("div",{className:"cost-to-own__tooltip-header",children:[e.jsx("span",{className:"cost-to-own__tooltip-title",children:a.name}),e.jsx("span",{className:"cost-to-own__tooltip-total",children:_(a.value)})]}),e.jsx("div",{className:"cost-to-own__tooltip-breakdown",children:t.map((g,C)=>e.jsxs("div",{className:"cost-to-own__tooltip-row",children:[e.jsxs("span",{className:"cost-to-own__tooltip-year",children:["Year ",C+1]}),e.jsx("span",{className:"cost-to-own__tooltip-amount",children:_(g)})]},C))})]})]},a.name)})})]})]})})})})};se.__docgenInfo={description:"",methods:[],displayName:"CostToOwn",props:{vehicleName:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'Chevrolet Trax'",computed:!1}},msrp:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"21895",computed:!1}},fuelType:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'Gas'",computed:!1}},trims:{required:!1,tsType:{name:"Array",elements:[{name:"TrimData"}],raw:"TrimData[]"},description:""}}};const ue=[{name:"LS FWD",msrp:21895},{name:"1RS FWD",msrp:23195},{name:"LT FWD",msrp:23395},{name:"RS FWD",msrp:24995},{name:"ACTIV FWD",msrp:24995}],_e=[{name:"Honda HR-V",totalCost:32450,msrp:24895},{name:"Toyota Corolla Cross",totalCost:31200,msrp:23610},{name:"Hyundai Kona",totalCost:29800,msrp:24250}],ve=(s,l="Gas")=>{const p=s>1e5?.55:s>5e4?.45:.37,d=Math.round(s*p),x=Math.round(s*.15),f=Math.round(s*.07);let o=7500;l==="Electric"?o=Math.round(s>1e5?4500:3500):l==="Hybrid"?o=Math.round(s>5e4?5500:4500):s>2e5?o=18e3:s>1e5?o=14e3:s>5e4?o=1e4:o=7500;let r=6e3;s>4e5?r=45e3:s>2e5?r=28e3:s>1e5?r=18e3:s>5e4?r=12e3:r=6e3;let c=1150;s>4e5?c=25e3:s>2e5?c=15e3:s>1e5?c=8e3:s>5e4?c=4e3:c=1150;let i=2750;return s>4e5?i=2e4:s>2e5?i=12e3:s>1e5?i=7e3:s>5e4?i=4500:i=2750,{depreciation:d,financing:x,taxesFees:f,fuel:o,insurance:r,repairs:c,maintenance:i}},T={Depreciation:"The loss in value over 5 years. Based on historical resale data for this model.",Financing:"Interest costs assuming 60-month loan at 6.5% APR with 10% down payment.","Taxes & Fees":"Sales tax, registration, and annual fees. Varies by state.",Fuel:"Based on 12,000 miles/year at current average fuel prices.",Insurance:"Average annual premium based on typical driver profile.",Repairs:"Expected repair costs based on reliability data.",Maintenance:"Scheduled maintenance per manufacturer recommendations."},I=({vehicleName:s="Chevrolet Trax",msrp:l=21895,fuelType:p="Gas",trims:d,competitors:x=_e,segmentName:f="Subcompact SUV",segmentAverage:o=31500})=>{const r=m.useMemo(()=>d&&d.length>0?d:s==="Chevrolet Trax"?ue:[{name:"Base",msrp:l}],[d,s,l]),[c,i]=m.useState(0),[y,b]=m.useState(!1),[S,v]=m.useState(null),[u,E]=m.useState(!1),[w,A]=m.useState(12e3),[_,O]=m.useState(3.5),M=r[c],a=M.msrp,t=m.useMemo(()=>ve(a,p),[a,p]),g=Math.round(t.fuel*(w/12e3)*(_/3.5)),C=m.useMemo(()=>[{name:"Depreciation",value:t.depreciation,color:"#1B5F8A",monthlyValue:Math.round(t.depreciation/60),vsAverage:-5,tooltip:T.Depreciation},{name:"Fuel",value:g,color:"#E67E22",monthlyValue:Math.round(g/60),vsAverage:12,tooltip:T.Fuel},{name:"Insurance",value:t.insurance,color:"#C0392B",monthlyValue:Math.round(t.insurance/60),vsAverage:-3,tooltip:T.Insurance},{name:"Financing",value:t.financing,color:"#3D8B8B",monthlyValue:Math.round(t.financing/60),vsAverage:0,tooltip:T.Financing},{name:"Maintenance",value:t.maintenance,color:"#5C1E1E",monthlyValue:Math.round(t.maintenance/60),vsAverage:-8,tooltip:T.Maintenance},{name:"Repairs",value:t.repairs,color:"#922B21",monthlyValue:Math.round(t.repairs/60),vsAverage:-15,tooltip:T.Repairs},{name:"Taxes & Fees",value:t.taxesFees,color:"#D4A84B",monthlyValue:Math.round(t.taxesFees/60),vsAverage:0,tooltip:T["Taxes & Fees"]}],[t,g]),F=C.reduce((n,j)=>n+j.value,0),U=Math.round(F/60),N=Math.round((F-o)/o*100),q=a-t.depreciation,h=n=>new Intl.NumberFormat("en-US",{style:"currency",currency:"USD",minimumFractionDigits:0,maximumFractionDigits:0}).format(n),K=n=>n<-2?e.jsx(Z,{size:14,className:"cost-enhanced__trend cost-enhanced__trend--good"}):n>2?e.jsx(J,{size:14,className:"cost-enhanced__trend cost-enhanced__trend--bad"}):e.jsx(le,{size:14,className:"cost-enhanced__trend cost-enhanced__trend--neutral"}),Y=n=>n<-2?"cost-enhanced__comparison--good":n>2?"cost-enhanced__comparison--bad":"cost-enhanced__comparison--neutral",z=[...x,{name:s,totalCost:F,msrp:a}].sort((n,j)=>n.totalCost-j.totalCost),ae=z.findIndex(n=>n.name===s)+1;return e.jsx("section",{className:"cost-enhanced",children:e.jsx("div",{className:"container",children:e.jsx("div",{className:"cost-enhanced__card",children:e.jsxs("div",{className:"cost-enhanced__main",children:[e.jsxs("div",{className:"cost-enhanced__header",children:[e.jsxs("div",{className:"cost-enhanced__title-group",children:[e.jsxs("h2",{className:"cost-enhanced__title",children:["5-Year Cost to Own",e.jsx("sup",{children:"®"})]}),e.jsx("span",{className:"cost-enhanced__vehicle-name",children:s})]}),e.jsxs("div",{className:"cost-enhanced__trim",children:[e.jsx("span",{className:"cost-enhanced__trim-label",children:"Trim:"}),e.jsxs("div",{className:"cost-enhanced__select-wrapper",children:[e.jsxs("button",{className:"cost-enhanced__select",onClick:()=>b(!y),children:[M.name,e.jsx(W,{size:16})]}),y&&e.jsx("ul",{className:"cost-enhanced__options",children:r.map((n,j)=>e.jsx("li",{children:e.jsxs("button",{className:`cost-enhanced__option ${c===j?"active":""}`,onClick:()=>{i(j),b(!1)},children:[e.jsx("span",{children:n.name}),e.jsx("span",{className:"cost-enhanced__option-price",children:h(n.msrp)})]})},n.name))})]})]})]}),e.jsxs("div",{className:"cost-enhanced__summary",children:[e.jsxs("div",{className:"cost-enhanced__summary-main",children:[e.jsxs("div",{className:"cost-enhanced__total",children:[e.jsx("span",{className:"cost-enhanced__total-amount",children:h(F)}),e.jsx("span",{className:"cost-enhanced__total-label",children:"5-Year Total"})]}),e.jsxs("div",{className:"cost-enhanced__monthly",children:[e.jsxs("span",{className:"cost-enhanced__monthly-amount",children:[h(U),"/mo"]}),e.jsx("span",{className:"cost-enhanced__monthly-label",children:"Average Monthly Cost"})]})]}),e.jsx("div",{className:"cost-enhanced__comparison-badge",children:N<=0?e.jsxs(e.Fragment,{children:[e.jsx(Z,{size:18}),e.jsxs("span",{children:[Math.abs(N),"% below ",f," avg"]})]}):e.jsxs(e.Fragment,{children:[e.jsx(J,{size:18}),e.jsxs("span",{children:[N,"% above ",f," avg"]})]})})]}),e.jsxs("div",{className:"cost-enhanced__competitors",children:[e.jsx("h3",{className:"cost-enhanced__section-title",children:"vs. Competitors"}),e.jsx("div",{className:"cost-enhanced__competitor-bars",children:z.map((n,j)=>{const ne=Math.max(...z.map(re=>re.totalCost)),te=n.totalCost/ne*100,oe=n.name===s;return e.jsxs("div",{className:`cost-enhanced__competitor ${oe?"cost-enhanced__competitor--current":""}`,children:[e.jsxs("div",{className:"cost-enhanced__competitor-info",children:[e.jsxs("span",{className:"cost-enhanced__competitor-rank",children:["#",j+1]}),e.jsx("span",{className:"cost-enhanced__competitor-name",children:n.name})]}),e.jsxs("div",{className:"cost-enhanced__competitor-bar-wrapper",children:[e.jsx("div",{className:"cost-enhanced__competitor-bar",style:{width:`${te}%`}}),e.jsx("span",{className:"cost-enhanced__competitor-cost",children:h(n.totalCost)})]})]},n.name)})}),ae===1&&e.jsx("div",{className:"cost-enhanced__winner-badge",children:"🏆 Lowest cost to own in comparison"})]}),e.jsxs("div",{className:"cost-enhanced__breakdown",children:[e.jsx("h3",{className:"cost-enhanced__section-title",children:"Cost Breakdown"}),e.jsxs("div",{className:"cost-enhanced__table",children:[e.jsxs("div",{className:"cost-enhanced__table-header",children:[e.jsx("span",{children:"Category"}),e.jsx("span",{children:"Monthly"}),e.jsx("span",{children:"5-Year"}),e.jsx("span",{children:"vs Avg"})]}),C.map(n=>e.jsxs("div",{className:"cost-enhanced__table-row",onMouseEnter:()=>v(n.name),onMouseLeave:()=>v(null),children:[e.jsxs("div",{className:"cost-enhanced__category",children:[e.jsx("div",{className:"cost-enhanced__category-dot",style:{backgroundColor:n.color}}),e.jsx("span",{className:"cost-enhanced__category-name",children:n.name}),e.jsx("button",{className:"cost-enhanced__info-btn","aria-label":`Info about ${n.name}`,children:e.jsx(ee,{size:12})}),S===n.name&&e.jsx("div",{className:"cost-enhanced__tooltip",children:n.tooltip})]}),e.jsx("span",{className:"cost-enhanced__cell",children:h(n.monthlyValue)}),e.jsx("span",{className:"cost-enhanced__cell cost-enhanced__cell--bold",children:h(n.value)}),e.jsxs("span",{className:`cost-enhanced__cell ${Y(n.vsAverage)}`,children:[K(n.vsAverage),n.vsAverage!==0&&`${Math.abs(n.vsAverage)}%`]})]},n.name)),e.jsxs("div",{className:"cost-enhanced__table-footer",children:[e.jsx("span",{className:"cost-enhanced__category-name",children:"Total"}),e.jsx("span",{className:"cost-enhanced__cell cost-enhanced__cell--bold",children:h(U)}),e.jsx("span",{className:"cost-enhanced__cell cost-enhanced__cell--bold",children:h(F)}),e.jsxs("span",{className:`cost-enhanced__cell ${Y(N)}`,children:[K(N),N!==0&&`${Math.abs(N)}%`]})]})]})]}),e.jsxs("div",{className:"cost-enhanced__depreciation",children:[e.jsx("h3",{className:"cost-enhanced__section-title",children:"Depreciation Forecast"}),e.jsxs("div",{className:"cost-enhanced__depreciation-content",children:[e.jsxs("div",{className:"cost-enhanced__depreciation-visual",children:[e.jsxs("div",{className:"cost-enhanced__depreciation-start",children:[e.jsx("span",{className:"cost-enhanced__depreciation-label",children:"Today"}),e.jsx("span",{className:"cost-enhanced__depreciation-value",children:h(a)})]}),e.jsxs("div",{className:"cost-enhanced__depreciation-arrow",children:[e.jsx("div",{className:"cost-enhanced__depreciation-line"}),e.jsxs("span",{className:"cost-enhanced__depreciation-loss",children:["-",h(t.depreciation)]})]}),e.jsxs("div",{className:"cost-enhanced__depreciation-end",children:[e.jsx("span",{className:"cost-enhanced__depreciation-label",children:"After 5 Years"}),e.jsx("span",{className:"cost-enhanced__depreciation-value",children:h(q)})]})]}),e.jsxs("p",{className:"cost-enhanced__depreciation-note",children:["Your ",s," will retain approximately ",Math.round(q/a*100),"% of its value after 5 years."]})]})]}),e.jsxs("div",{className:"cost-enhanced__customize",children:[e.jsxs("button",{className:"cost-enhanced__customize-toggle",onClick:()=>E(!u),children:[e.jsx("span",{children:"Customize Your Estimate"}),e.jsx(W,{size:16,className:u?"rotated":""})]}),u&&e.jsxs("div",{className:"cost-enhanced__customize-panel",children:[e.jsxs("div",{className:"cost-enhanced__customize-field",children:[e.jsx("label",{children:"Annual Miles"}),e.jsx("input",{type:"range",min:"5000",max:"25000",step:"1000",value:w,onChange:n=>A(Number(n.target.value)),style:Q(w,5e3,25e3)}),e.jsxs("span",{children:[w.toLocaleString()," mi/year"]})]}),e.jsxs("div",{className:"cost-enhanced__customize-field",children:[e.jsx("label",{children:"Gas Price"}),e.jsx("input",{type:"range",min:"2.50",max:"5.50",step:"0.10",value:_,onChange:n=>O(Number(n.target.value)),style:Q(_,2.5,5.5)}),e.jsxs("span",{children:["$",_.toFixed(2),"/gal"]})]})]})]}),e.jsxs("div",{className:"cost-enhanced__tips",children:[e.jsxs("h3",{className:"cost-enhanced__section-title",children:[e.jsx(ce,{size:18}),"Ways to Save"]}),e.jsxs("div",{className:"cost-enhanced__tips-list",children:[e.jsxs("div",{className:"cost-enhanced__tip",children:[e.jsx("span",{className:"cost-enhanced__tip-icon",children:"💡"}),e.jsxs("div",{className:"cost-enhanced__tip-content",children:[e.jsx("span",{className:"cost-enhanced__tip-title",children:"Get 0% APR financing"}),e.jsxs("span",{className:"cost-enhanced__tip-savings",children:["Save up to ",h(t.financing)]})]})]}),e.jsxs("div",{className:"cost-enhanced__tip",children:[e.jsx("span",{className:"cost-enhanced__tip-icon",children:"💡"}),e.jsxs("div",{className:"cost-enhanced__tip-content",children:[e.jsx("span",{className:"cost-enhanced__tip-title",children:"Buy certified pre-owned"}),e.jsxs("span",{className:"cost-enhanced__tip-savings",children:["Save ~",h(Math.round(t.depreciation*.4))," in depreciation"]})]})]}),e.jsxs("div",{className:"cost-enhanced__tip",children:[e.jsx("span",{className:"cost-enhanced__tip-icon",children:"💡"}),e.jsxs("div",{className:"cost-enhanced__tip-content",children:[e.jsx("span",{className:"cost-enhanced__tip-title",children:"Compare insurance quotes"}),e.jsx("span",{className:"cost-enhanced__tip-savings",children:"Potential savings of 15-25%"})]})]})]})]}),e.jsxs("div",{className:"cost-enhanced__ctas",children:[e.jsxs("button",{className:"cost-enhanced__cta cost-enhanced__cta--primary",children:["Get Pre-Approved",e.jsx(ie,{size:18})]}),e.jsx("button",{className:"cost-enhanced__cta cost-enhanced__cta--secondary",children:"Compare Insurance Quotes"})]})]})})})})};I.__docgenInfo={description:"",methods:[],displayName:"CostToOwnEnhanced",props:{vehicleName:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'Chevrolet Trax'",computed:!1}},msrp:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"21895",computed:!1}},fuelType:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'Gas'",computed:!1}},trims:{required:!1,tsType:{name:"Array",elements:[{name:"TrimData"}],raw:"TrimData[]"},description:""},competitors:{required:!1,tsType:{name:"Array",elements:[{name:"Competitor"}],raw:"Competitor[]"},description:"",defaultValue:{value:`[
  { name: 'Honda HR-V', totalCost: 32450, msrp: 24895 },
  { name: 'Toyota Corolla Cross', totalCost: 31200, msrp: 23610 },
  { name: 'Hyundai Kona', totalCost: 29800, msrp: 24250 },
]`,computed:!1}},segmentName:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'Subcompact SUV'",computed:!1}},segmentAverage:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"31500",computed:!1}}}};const Ee={title:"Organisms/CostToOwn",component:se,parameters:{layout:"padded",docs:{description:{component:`
# 5-Year Cost to Own

## Overview

Shows the true cost of ownership beyond the sticker price. Helps users understand long-term financial commitment.

---

## Business Purpose

| Goal | How It Achieves It |
|------|-------------------|
| Financial Clarity | Shows total cost, not just MSRP |
| EV Comparison | Highlights fuel savings for EVs |
| Trust Building | Transparent, comprehensive data |
| Decision Support | Helps users budget accurately |

---

## Key Metrics

- **Section Engagement** - Time spent, interactions
- **Trim Comparison Usage** - Users comparing trims
- **EV vs Gas Comparison** - Cross-shopping behavior
- **Correlation with Leads** - Does viewing predict conversion?

---

## Cost Categories

| Category | Description | Typical % of Total |
|----------|-------------|-------------------|
| Depreciation | Value loss over 5 years | 40-50% |
| Fuel/Energy | Gas or electricity costs | 15-25% |
| Insurance | Annual premium estimates | 10-15% |
| Maintenance | Scheduled service | 5-10% |
| Repairs | Expected fixes | 3-8% |
| Financing | Interest if financed | 5-10% |
| Taxes and Fees | Registration, sales tax | 3-5% |

---

## Fuel Type Impact

| Fuel Type | Key Difference |
|-----------|---------------|
| Gas | Higher fuel costs, typical maintenance |
| Electric | Lower fuel, less maintenance, higher depreciation |
| Hybrid | Balanced fuel costs, moderate maintenance |
| Plug-in Hybrid | Variable based on charging habits |

---

## Product Considerations

**Data Sources**
- Depreciation from auction/resale data
- Fuel costs from EPA + gas prices
- Insurance from industry averages
- Maintenance from OEM schedules

**User Value**
- "How much will this really cost?" is key question
- EV buyers especially value this
- Helps compare across fuel types

**Personalization Opportunities**
- Local fuel prices
- User's driving habits
- Financing terms customization
        `}}},tags:["autodocs"],argTypes:{vehicleName:{description:"Full vehicle name (Year Make Model)",control:"text",table:{type:{summary:"string"},category:"Vehicle"}},msrp:{description:"Base MSRP for cost calculations",control:{type:"number",min:15e3,max:2e5,step:1e3},table:{type:{summary:"number"},category:"Pricing"}},fuelType:{description:"Fuel type affects fuel/energy cost calculations",control:"select",options:["Gas","Electric","Hybrid","Diesel","Plug-in Hybrid"],table:{type:{summary:"string"},category:"Vehicle"}},trims:{description:"Available trims for comparison",control:"object",table:{type:{summary:"Trim[]",detail:"{ name: string; msrp: number }[]"},category:"Pricing"}}}},R={args:{vehicleName:"2025 Chevrolet Trax",msrp:21895,fuelType:"Gas"},parameters:{docs:{description:{story:"Basic cost breakdown for an affordable gas-powered SUV."}}}},B={args:{vehicleName:"2025 Chevrolet Trax",msrp:21895,fuelType:"Gas",trims:[{name:"LS",msrp:21895},{name:"1RS",msrp:23195},{name:"LT",msrp:23395},{name:"RS",msrp:24995},{name:"ACTIV",msrp:24995}]},parameters:{docs:{description:{story:"Cost breakdown with trim selector allowing users to compare ownership costs across trims."}}}},H={args:{vehicleName:"2025 Chevrolet Bolt EV",msrp:27495,fuelType:"Electric",trims:[{name:"1LT",msrp:27495},{name:"2LT",msrp:31495}]},parameters:{docs:{description:{story:"Electric vehicle with different cost structure - lower fuel costs, different maintenance patterns."}}}},G={args:{vehicleName:"2025 Chevrolet Trailblazer",msrp:24995,fuelType:"Gas"},parameters:{docs:{description:{story:"Compact SUV cost breakdown showing mid-range ownership costs."}}}},P={args:{vehicleName:"2025 Chevrolet Camaro",msrp:29100,fuelType:"Gas",trims:[{name:"1LS",msrp:29100},{name:"1LT",msrp:30700},{name:"SS",msrp:44100},{name:"ZL1",msrp:71700}]},parameters:{docs:{description:{story:"Performance vehicle with higher insurance and maintenance costs."}}}},$={args:{vehicleName:"2025 Chevrolet Corvette",msrp:65e3,fuelType:"Gas"},parameters:{docs:{description:{story:"High-end sports car demonstrating premium ownership costs."}}}},V={render:()=>e.jsx(I,{vehicleName:"2025 Chevrolet Trax",msrp:21895,fuelType:"Gas",trims:[{name:"LS FWD",msrp:21895},{name:"1RS FWD",msrp:23195},{name:"LT FWD",msrp:23395},{name:"RS FWD",msrp:24995},{name:"ACTIV FWD",msrp:24995}],competitors:[{name:"Honda HR-V",totalCost:32450,msrp:24895},{name:"Toyota Corolla Cross",totalCost:31200,msrp:23610},{name:"Hyundai Kona",totalCost:29800,msrp:24250}],segmentName:"Subcompact SUV",segmentAverage:31500}),parameters:{docs:{description:{story:`
## Key Improvements Over Original

### 1. Monthly Cost Display
Instead of showing only the 5-year total ($30,318), we now prominently display:
- **$505/month** average monthly cost
- Helps users connect to their actual budget

### 2. Competitor Comparison Chart
Visual bar chart showing:
- Ranked list of competitors by total cost
- Current vehicle highlighted
- "🏆 Lowest cost to own" badge if applicable

### 3. Detailed Cost Table with Context
Each cost category now shows:
- Monthly amount
- 5-year total
- **vs Average** indicator (↓5% better, ↑12% worse)

### 4. Depreciation Visualization
Clear visual showing:
- Today's value: $21,895
- After 5 years: $13,794
- Loss amount: -$8,101
- Retention percentage

### 5. Interactive Customization
Users can adjust:
- Annual miles driven (5,000 - 25,000)
- Gas price assumption ($2.50 - $5.50)
- Estimates update in real-time

### 6. Actionable Savings Tips
- 💡 Get 0% APR financing → Save $3,284
- 💡 Buy certified pre-owned → Save ~$3,240
- 💡 Compare insurance quotes → Save 15-25%

### 7. Clear CTAs
- **Get Pre-Approved** - Primary action
- **Compare Insurance Quotes** - Secondary action
        `}}}},D={render:()=>e.jsx(I,{vehicleName:"2025 Hyundai Kona",msrp:24250,fuelType:"Gas",trims:[{name:"SE",msrp:24250},{name:"SEL",msrp:26350},{name:"Limited",msrp:30700}],competitors:[{name:"Honda HR-V",totalCost:32450,msrp:24895},{name:"Toyota Corolla Cross",totalCost:31200,msrp:23610},{name:"Chevrolet Trax",totalCost:30318,msrp:21895}],segmentName:"Subcompact SUV",segmentAverage:31500}),parameters:{docs:{description:{story:'Shows the "🏆 Lowest cost to own" badge when the vehicle ranks #1 in comparison.'}}}},L={render:()=>e.jsx(I,{vehicleName:"2025 Chevrolet Bolt EV",msrp:27495,fuelType:"Electric",trims:[{name:"1LT",msrp:27495},{name:"2LT",msrp:31495}],competitors:[{name:"Nissan Leaf",totalCost:34500,msrp:28140},{name:"Hyundai Kona Electric",totalCost:36200,msrp:33550},{name:"Kia Niro EV",totalCost:35800,msrp:39990}],segmentName:"Affordable EV",segmentAverage:35500}),parameters:{docs:{description:{story:"Electric vehicle with lower fuel costs and different cost structure."}}}},k={render:()=>e.jsx(I,{vehicleName:"2025 BMW 3 Series",msrp:46300,fuelType:"Gas",trims:[{name:"330i",msrp:46300},{name:"330i xDrive",msrp:48300},{name:"M340i",msrp:58200}],competitors:[{name:"Mercedes C-Class",totalCost:58500,msrp:47550},{name:"Audi A4",totalCost:55200,msrp:45290},{name:"Lexus IS",totalCost:52800,msrp:40985}],segmentName:"Compact Luxury Sedan",segmentAverage:55e3}),parameters:{docs:{description:{story:"Luxury vehicle showing higher insurance and maintenance costs with competitor context."}}}};R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
  args: {
    vehicleName: '2025 Chevrolet Trax',
    msrp: 21895,
    fuelType: 'Gas'
  },
  parameters: {
    docs: {
      description: {
        story: 'Basic cost breakdown for an affordable gas-powered SUV.'
      }
    }
  }
}`,...R.parameters?.docs?.source}}};B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
  args: {
    vehicleName: '2025 Chevrolet Trax',
    msrp: 21895,
    fuelType: 'Gas',
    trims: [{
      name: 'LS',
      msrp: 21895
    }, {
      name: '1RS',
      msrp: 23195
    }, {
      name: 'LT',
      msrp: 23395
    }, {
      name: 'RS',
      msrp: 24995
    }, {
      name: 'ACTIV',
      msrp: 24995
    }]
  },
  parameters: {
    docs: {
      description: {
        story: 'Cost breakdown with trim selector allowing users to compare ownership costs across trims.'
      }
    }
  }
}`,...B.parameters?.docs?.source}}};H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`{
  args: {
    vehicleName: '2025 Chevrolet Bolt EV',
    msrp: 27495,
    fuelType: 'Electric',
    trims: [{
      name: '1LT',
      msrp: 27495
    }, {
      name: '2LT',
      msrp: 31495
    }]
  },
  parameters: {
    docs: {
      description: {
        story: 'Electric vehicle with different cost structure - lower fuel costs, different maintenance patterns.'
      }
    }
  }
}`,...H.parameters?.docs?.source}}};G.parameters={...G.parameters,docs:{...G.parameters?.docs,source:{originalSource:`{
  args: {
    vehicleName: '2025 Chevrolet Trailblazer',
    msrp: 24995,
    fuelType: 'Gas'
  },
  parameters: {
    docs: {
      description: {
        story: 'Compact SUV cost breakdown showing mid-range ownership costs.'
      }
    }
  }
}`,...G.parameters?.docs?.source}}};P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  args: {
    vehicleName: '2025 Chevrolet Camaro',
    msrp: 29100,
    fuelType: 'Gas',
    trims: [{
      name: '1LS',
      msrp: 29100
    }, {
      name: '1LT',
      msrp: 30700
    }, {
      name: 'SS',
      msrp: 44100
    }, {
      name: 'ZL1',
      msrp: 71700
    }]
  },
  parameters: {
    docs: {
      description: {
        story: 'Performance vehicle with higher insurance and maintenance costs.'
      }
    }
  }
}`,...P.parameters?.docs?.source}}};$.parameters={...$.parameters,docs:{...$.parameters?.docs,source:{originalSource:`{
  args: {
    vehicleName: '2025 Chevrolet Corvette',
    msrp: 65000,
    fuelType: 'Gas'
  },
  parameters: {
    docs: {
      description: {
        story: 'High-end sports car demonstrating premium ownership costs.'
      }
    }
  }
}`,...$.parameters?.docs?.source}}};V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`{
  render: () => <CostToOwnEnhanced vehicleName="2025 Chevrolet Trax" msrp={21895} fuelType="Gas" trims={[{
    name: 'LS FWD',
    msrp: 21895
  }, {
    name: '1RS FWD',
    msrp: 23195
  }, {
    name: 'LT FWD',
    msrp: 23395
  }, {
    name: 'RS FWD',
    msrp: 24995
  }, {
    name: 'ACTIV FWD',
    msrp: 24995
  }]} competitors={[{
    name: 'Honda HR-V',
    totalCost: 32450,
    msrp: 24895
  }, {
    name: 'Toyota Corolla Cross',
    totalCost: 31200,
    msrp: 23610
  }, {
    name: 'Hyundai Kona',
    totalCost: 29800,
    msrp: 24250
  }]} segmentName="Subcompact SUV" segmentAverage={31500} />,
  parameters: {
    docs: {
      description: {
        story: \`
## Key Improvements Over Original

### 1. Monthly Cost Display
Instead of showing only the 5-year total ($30,318), we now prominently display:
- **$505/month** average monthly cost
- Helps users connect to their actual budget

### 2. Competitor Comparison Chart
Visual bar chart showing:
- Ranked list of competitors by total cost
- Current vehicle highlighted
- "🏆 Lowest cost to own" badge if applicable

### 3. Detailed Cost Table with Context
Each cost category now shows:
- Monthly amount
- 5-year total
- **vs Average** indicator (↓5% better, ↑12% worse)

### 4. Depreciation Visualization
Clear visual showing:
- Today's value: $21,895
- After 5 years: $13,794
- Loss amount: -$8,101
- Retention percentage

### 5. Interactive Customization
Users can adjust:
- Annual miles driven (5,000 - 25,000)
- Gas price assumption ($2.50 - $5.50)
- Estimates update in real-time

### 6. Actionable Savings Tips
- 💡 Get 0% APR financing → Save $3,284
- 💡 Buy certified pre-owned → Save ~$3,240
- 💡 Compare insurance quotes → Save 15-25%

### 7. Clear CTAs
- **Get Pre-Approved** - Primary action
- **Compare Insurance Quotes** - Secondary action
        \`
      }
    }
  }
}`,...V.parameters?.docs?.source},description:{story:`## Enhanced Cost to Own

This enhanced version includes several improvements for car buyers:

### New Features

| Feature | Benefit |
|---------|---------|
| **Monthly Breakdown** | Shows ~$505/mo instead of abstract 5-year total |
| **Competitor Comparison** | Visual bar chart ranking vs 3 competitors |
| **Segment Comparison** | "8% below Subcompact SUV avg" context |
| **Cost vs Average** | Each category shows ✓ -5% or ⚠ +12% |
| **Depreciation Forecast** | Visual showing value today → after 5 years |
| **Customize Estimates** | Sliders for annual miles & gas price |
| **Savings Tips** | Actionable advice (0% APR, CPO, insurance) |
| **CTAs** | "Get Pre-Approved" and "Compare Insurance" |

### Business Value

- **Higher engagement** - Interactive customization keeps users on page
- **Trust building** - Transparent competitor comparison
- **Lead generation** - Clear CTAs for financing and insurance
- **SEO value** - Comprehensive content for "cost to own" searches`,...V.parameters?.docs?.description}}};D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  render: () => <CostToOwnEnhanced vehicleName="2025 Hyundai Kona" msrp={24250} fuelType="Gas" trims={[{
    name: 'SE',
    msrp: 24250
  }, {
    name: 'SEL',
    msrp: 26350
  }, {
    name: 'Limited',
    msrp: 30700
  }]} competitors={[{
    name: 'Honda HR-V',
    totalCost: 32450,
    msrp: 24895
  }, {
    name: 'Toyota Corolla Cross',
    totalCost: 31200,
    msrp: 23610
  }, {
    name: 'Chevrolet Trax',
    totalCost: 30318,
    msrp: 21895
  }]} segmentName="Subcompact SUV" segmentAverage={31500} />,
  parameters: {
    docs: {
      description: {
        story: 'Shows the "🏆 Lowest cost to own" badge when the vehicle ranks #1 in comparison.'
      }
    }
  }
}`,...D.parameters?.docs?.source},description:{story:"Enhanced version with the vehicle winning the comparison",...D.parameters?.docs?.description}}};L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
  render: () => <CostToOwnEnhanced vehicleName="2025 Chevrolet Bolt EV" msrp={27495} fuelType="Electric" trims={[{
    name: '1LT',
    msrp: 27495
  }, {
    name: '2LT',
    msrp: 31495
  }]} competitors={[{
    name: 'Nissan Leaf',
    totalCost: 34500,
    msrp: 28140
  }, {
    name: 'Hyundai Kona Electric',
    totalCost: 36200,
    msrp: 33550
  }, {
    name: 'Kia Niro EV',
    totalCost: 35800,
    msrp: 39990
  }]} segmentName="Affordable EV" segmentAverage={35500} />,
  parameters: {
    docs: {
      description: {
        story: 'Electric vehicle with lower fuel costs and different cost structure.'
      }
    }
  }
}`,...L.parameters?.docs?.source},description:{story:"Enhanced version for an electric vehicle",...L.parameters?.docs?.description}}};k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  render: () => <CostToOwnEnhanced vehicleName="2025 BMW 3 Series" msrp={46300} fuelType="Gas" trims={[{
    name: '330i',
    msrp: 46300
  }, {
    name: '330i xDrive',
    msrp: 48300
  }, {
    name: 'M340i',
    msrp: 58200
  }]} competitors={[{
    name: 'Mercedes C-Class',
    totalCost: 58500,
    msrp: 47550
  }, {
    name: 'Audi A4',
    totalCost: 55200,
    msrp: 45290
  }, {
    name: 'Lexus IS',
    totalCost: 52800,
    msrp: 40985
  }]} segmentName="Compact Luxury Sedan" segmentAverage={55000} />,
  parameters: {
    docs: {
      description: {
        story: 'Luxury vehicle showing higher insurance and maintenance costs with competitor context.'
      }
    }
  }
}`,...k.parameters?.docs?.source},description:{story:"Enhanced version for a luxury vehicle",...k.parameters?.docs?.description}}};const Ae=["Default","WithTrims","Electric","Hybrid","Luxury","Exotic","Enhanced","EnhancedWinner","EnhancedElectric","EnhancedLuxury"];export{R as Default,H as Electric,V as Enhanced,L as EnhancedElectric,k as EnhancedLuxury,D as EnhancedWinner,$ as Exotic,G as Hybrid,P as Luxury,B as WithTrims,Ae as __namedExportsOrder,Ee as default};
