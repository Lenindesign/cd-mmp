import{r as g,j as e,L as r}from"./iframe-D2Lzw-Bp.js";import{A as p}from"./ArticleCard-B_hRWWzz.js";import{V as m}from"./VehicleCard-Bsh952Xy.js";import{v as n}from"./index-C_qiXwZJ.js";import{b as v}from"./vehicleService-23eXHQkm.js";import{g as f,a as _,c as x}from"./leaseDealsService-P60L_1Gl.js";import{C as o}from"./chevron-right-B1LbcPi_.js";import"./preload-helper-PPVm8Dsz.js";import"./OptimizedImage-D8Y2YWBR.js";import"./Button-DIPXAB9q.js";import"./SignInToSaveModal-DXM2cvMP.js";import"./index-q5uzkPdg.js";import"./index-DxulsG4f.js";import"./x-B14sJBzY.js";import"./createLucideIcon-BbW__gvI.js";import"./bookmark-CKIqzt8R.js";import"./file-text-CA1-_Ixp.js";import"./map-pin-2DWSFxJ3.js";import"./chevron-up-5OJWVGon.js";import"./chevron-down-BA7ynSF7.js";const w=n.find(s=>s.make==="Hyundai"&&s.model==="Santa Fe"),u=n.find(s=>s.make==="Honda"&&s.model==="Accord"),b=n.find(s=>s.make==="Toyota"&&s.model==="Corolla"),j=n.find(s=>s.make==="Ford"&&s.model==="F-150"),y=n.find(s=>s.make==="Chevrolet"&&s.model==="Trailblazer"),k=n.find(s=>s.make==="Kia"&&s.model==="Telluride"),N=n.find(s=>s.make==="Porsche"&&s.model==="Cayenne"),t={category:"INSTRUMENTED TEST",headline:"The Refreshed Solterra EV SUV Is the Quickest Subaru We've Ever Tested",subheadline:"Everyone knows EVs are quick, but we're still shocked to see the Solterra's acceleration times compared with sportier Subies.",author:"Jack Fitzgerald",image:"https://hips.hearstapps.com/mtg-prod/68acee0b9a8a250002dfbc03/2-2026-subaru-solterra-first-drive.jpg",href:"/news/solterra-quickest-subaru"},l=[{id:"1",category:"Testing Hub",headline:"The Ford F-150 Lightning Sets New Truck Standards",image:j?.image||"",href:"/news/ford-f150-lightning-tested"},{id:"2",category:"Testing Hub",headline:"Porsche Cayenne Turbo GT: The Ultimate SUV",image:N?.image||"",href:"/news/porsche-cayenne-turbo-gt-tested"},{id:"3",category:"Testing Hub",headline:"Chevrolet Trailblazer RS: Compact SUV Tested",image:y?.image||"",href:"/news/chevy-trailblazer-rs-tested"},{id:"4",category:"Buyer's Guide",headline:"Best SUVs of 2025: Kia Telluride Leads the Pack",image:k?.image||"",href:"/news/best-suvs-2025"},{id:"5",category:"Listicle",headline:"The 10 Most-Researched New Cars on Car and Driver in 2025",image:"https://hips.hearstapps.com/hmg-prod/images/2025-lexus-gx-3-672b608154c3f.jpg?crop=0.563xw:0.562xh;0.201xw,0.178xh",href:"/listicle/top-researched-cars-2025"},{id:"6",category:"Comparison",headline:"Toyota Corolla vs Honda Civic: Which Is Better?",image:b?.image||"",href:"/news/camry-vs-accord-comparison"},{id:"7",category:"Review",headline:"The 2025 Honda Accord Hybrid Gets Even Better MPG",image:u?.image||"",href:"/news/honda-accord-hybrid-review"},{id:"8",category:"Testing Hub",headline:"Hyundai Santa Fe Hybrid: Family SUV Reimagined",image:w?.image||"",href:"/news/hyundai-santa-fe-hybrid-tested"}],h=()=>{const s=g.useMemo(()=>v().filter(a=>a.bodyStyle==="SUV").sort((a,i)=>(i.staffRating||0)-(a.staffRating||0)).slice(0,3),[]),c=g.useMemo(()=>{const a=[];for(const i of f().slice(0,1))a.push({id:i.id,type:"0% APR",label:"0% APR Financing",vehicleName:`${i.vehicle.year} ${i.vehicle.make} ${i.vehicle.model}`,image:i.vehicle.image,slug:i.vehicle.slug,price:i.vehicle.priceRange,rating:i.vehicle.staffRating});for(const i of _().slice(0,1))a.push({id:i.id,type:"Cash Back",label:`${i.incentiveValue} Cash Back`,vehicleName:`${i.vehicle.year} ${i.vehicle.make} ${i.vehicle.model}`,image:i.vehicle.image,slug:i.vehicle.slug,price:i.vehicle.priceRange,rating:i.vehicle.staffRating});for(const i of x().slice(0,1))a.push({id:i.id,type:"Lease",label:`${i.monthlyPayment}/mo Lease`,vehicleName:`${i.vehicle.year} ${i.vehicle.make} ${i.vehicle.model}`,image:i.vehicle.image,slug:i.vehicle.slug,price:i.vehicle.priceRange,rating:i.vehicle.staffRating});return a},[]);return e.jsxs("div",{className:"news-page",children:[e.jsx("section",{className:"news-page__hero",children:e.jsxs(r,{to:t.href,className:"news-page__hero-link",children:[e.jsx("div",{className:"news-page__hero-image",children:e.jsx("img",{src:t.image,alt:t.headline,loading:"eager"})}),e.jsxs("div",{className:"news-page__hero-content",children:[e.jsx("span",{className:"news-page__hero-category",children:t.category}),e.jsx("h1",{className:"news-page__hero-headline",children:t.headline}),e.jsx("p",{className:"news-page__hero-subheadline",children:t.subheadline}),e.jsxs("div",{className:"news-page__hero-byline",children:[e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",width:"16",height:"16",className:"news-page__hero-verified",children:e.jsx("path",{d:"m22.735 8.905-.955-.955V6.518a4.253 4.253 0 0 0-4.273-4.273h-1.432l-.955-.954C13.45-.38 10.61-.38 8.938 1.29l-.955.954H6.551a4.253 4.253 0 0 0-4.273 4.273V7.95l-.955.955c-1.67 1.671-1.67 4.512 0 6.183l.955.955v1.432a4.253 4.253 0 0 0 4.273 4.273h1.432l.955.954c1.67 1.671 4.511 1.671 6.182 0l.955-.954h1.432a4.253 4.253 0 0 0 4.273-4.273v-1.432l.955-.955c1.67-1.671 1.67-4.512 0-6.183zm-6.421 1.671-4.512 4.512c-.238.238-.477.477-.955.477-.477 0-.716-.239-.954-.477l-2.149-2.149c-.477-.477-.477-1.432 0-1.91.478-.477 1.432-.477 1.91 0l1.193 1.194 3.557-3.318c.477-.716 1.432-.716 1.91 0a1.154 1.154 0 0 1 0 1.671z",fill:"currentColor"})}),e.jsx("span",{children:"Reviewed By"}),e.jsx("span",{className:"news-page__hero-author",children:t.author})]})]})]})}),e.jsx("div",{className:"news-page__rows",children:e.jsxs("div",{className:"container",children:[e.jsxs("div",{"data-impeccable-variants":"9a27d8e6","data-impeccable-variant-count":"3",style:{display:"contents"},children:[e.jsx("div",{"data-impeccable-variant":"original",children:e.jsxs("section",{className:"news-page__row",children:[e.jsxs("div",{className:"news-page__row-left",children:[e.jsx("h2",{className:"news-page__row-title",children:"Latest Articles"}),e.jsxs("span",{className:"news-page__row-count",children:[l.length," stories"]}),e.jsxs(r,{to:"/news/all",className:"news-page__row-cta",children:["View All ",e.jsx(o,{size:14})]})]}),e.jsx("div",{className:"news-page__row-cards news-page__row-cards--articles",children:l.slice(0,4).map(a=>e.jsx(p,{imageUrl:a.image,imageAlt:a.headline,headline:a.headline,sponsor:a.category,href:a.href,variant:"vertical",aspectRatio:"landscape"},a.id))})]})}),e.jsx("style",{"data-impeccable-css":"9a27d8e6",children:`
              @scope ([data-impeccable-variant="1"]) {
                .live-delight-desk {
                  display: grid;
                  grid-template-columns: minmax(170px, 0.7fr) 2.6fr;
                  gap: var(--spacing-6);
                  padding: calc(var(--spacing-5) + (var(--p-air, 0.45) * var(--spacing-3)));
                  background: var(--color-white);
                  border: 1px solid var(--color-gray-200);
                  border-radius: var(--border-radius-lg);
                  box-shadow: var(--shadow-sm);
                }

                .live-delight-desk__intro {
                  display: flex;
                  flex-direction: column;
                  justify-content: space-between;
                  min-height: 210px;
                  border-right: 1px solid var(--color-gray-200);
                  padding-right: var(--spacing-5);
                }

                .live-delight-desk__label {
                  color: var(--color-blue-cobalt);
                  font-family: var(--font-label);
                  font-size: var(--font-size-xs);
                  font-weight: var(--font-weight-bold);
                  letter-spacing: 0.12em;
                  text-transform: uppercase;
                }

                .live-delight-desk h2 {
                  margin: var(--spacing-2) 0;
                  color: var(--color-dark);
                  font-family: var(--font-heading);
                  font-size: var(--font-size-xl);
                  font-weight: var(--font-weight-extrabold);
                  line-height: 0.95;
                }

                .live-delight-desk__meta {
                  color: var(--color-gray-600);
                  font-size: var(--font-size-sm);
                  font-weight: var(--font-weight-semibold);
                }

                .live-delight-desk__cta {
                  display: inline-flex;
                  align-items: center;
                  gap: 4px;
                  width: fit-content;
                  padding: 4px 12px;
                  border: 1px solid var(--color-blue-cobalt);
                  border-radius: var(--border-radius-full);
                  color: var(--color-blue-cobalt);
                  font-family: var(--font-heading);
                  font-size: var(--font-size-sm);
                  font-weight: var(--font-weight-bold);
                  text-decoration: none;
                  text-transform: uppercase;
                  white-space: nowrap;
                  transition: background var(--transition-fast), color var(--transition-fast);
                }

                .live-delight-desk__cta:hover {
                  background: var(--color-blue-cobalt);
                  color: var(--color-white);
                }

                .live-delight-desk__cards {
                  display: grid;
                  grid-template-columns: repeat(4, minmax(0, 1fr));
                  gap: var(--spacing-4);
                }

                .live-delight-desk__card {
                  position: relative;
                  display: grid;
                  gap: var(--spacing-3);
                  color: inherit;
                }

                .live-delight-desk__image {
                  position: relative;
                  overflow: hidden;
                  border-radius: var(--border-radius-md);
                  background: var(--color-gray-100);
                }

                .live-delight-desk__image img {
                  width: 100%;
                  aspect-ratio: 16 / 10;
                  object-fit: cover;
                  transition: transform var(--transition-normal);
                }

                .live-delight-desk__card:hover img {
                  transform: scale(1.04);
                }

                .live-delight-desk__sponsor {
                  color: var(--color-gray-600);
                  font-family: var(--font-label);
                  font-size: var(--font-size-xs);
                  font-weight: var(--font-weight-bold);
                  letter-spacing: 0.08em;
                  text-transform: uppercase;
                }

                .live-delight-desk__headline {
                  margin: 0;
                  color: var(--color-dark);
                  font-size: var(--font-size-sm);
                  font-weight: var(--font-weight-extrabold);
                  line-height: 1.25;
                }

                @media (max-width: 900px) {
                  .live-delight-desk {
                    grid-template-columns: 1fr;
                  }

                  .live-delight-desk__intro {
                    min-height: auto;
                    border-right: 0;
                    border-bottom: 1px solid var(--color-gray-200);
                    padding-right: 0;
                    padding-bottom: var(--spacing-4);
                  }

                  .live-delight-desk__cards {
                    grid-template-columns: repeat(2, minmax(0, 1fr));
                  }
                }
              }

              @scope ([data-impeccable-variant="2"]) {
                .live-delight-strip {
                  display: grid;
                  gap: var(--spacing-4);
                  padding: var(--spacing-5);
                  background: var(--color-gray-50);
                  border: 1px solid var(--color-gray-200);
                  border-radius: var(--border-radius-lg);
                }

                .live-delight-strip__header {
                  display: flex;
                  align-items: end;
                  justify-content: space-between;
                  gap: var(--spacing-4);
                }

                .live-delight-strip__header h2 {
                  margin: 0;
                  color: var(--color-dark);
                  font-size: var(--font-size-2xl);
                  font-weight: var(--font-weight-extrabold);
                }

                .live-delight-strip__header span {
                  color: var(--color-blue-cobalt);
                  font-family: var(--font-label);
                  font-size: var(--font-size-xs);
                  font-weight: var(--font-weight-bold);
                  letter-spacing: 0.1em;
                  text-transform: uppercase;
                }

                .live-delight-strip__list {
                  display: grid;
                  grid-template-columns: repeat(4, minmax(0, 1fr));
                  gap: calc(var(--spacing-3) + (var(--p-gap, 0.35) * var(--spacing-4)));
                }

                .live-delight-strip__item {
                  display: grid;
                  grid-template-rows: auto 1fr;
                  overflow: hidden;
                  background: var(--color-white);
                  border: 1px solid var(--color-gray-200);
                  border-radius: var(--border-radius-md);
                  color: inherit;
                }

                .live-delight-strip__image {
                  position: relative;
                }

                .live-delight-strip__image img {
                  width: 100%;
                  aspect-ratio: 16 / 10;
                  object-fit: cover;
                }

                .live-delight-strip__number {
                  position: absolute;
                  left: var(--spacing-2);
                  top: var(--spacing-2);
                  display: grid;
                  place-items: center;
                  width: 28px;
                  height: 28px;
                  background: var(--color-white);
                  border: 1px solid var(--color-dark);
                  border-radius: var(--border-radius-full);
                  color: var(--color-dark);
                  font-weight: var(--font-weight-extrabold);
                }

                .live-delight-strip__copy {
                  display: grid;
                  gap: var(--spacing-2);
                  padding: var(--spacing-3);
                }

                .live-delight-strip__copy span {
                  color: var(--color-gray-600);
                  font-family: var(--font-label);
                  font-size: var(--font-size-xs);
                  font-weight: var(--font-weight-bold);
                  letter-spacing: 0.08em;
                  text-transform: uppercase;
                }

                .live-delight-strip__copy h3 {
                  margin: 0;
                  color: var(--color-dark);
                  font-size: var(--font-size-sm);
                  font-weight: var(--font-weight-extrabold);
                  line-height: 1.25;
                }

                @media (max-width: 900px) {
                  .live-delight-strip__list {
                    grid-template-columns: repeat(2, minmax(0, 1fr));
                  }
                }
              }

              @scope ([data-impeccable-variant="3"]) {
                .live-delight-scanline {
                  display: grid;
                  grid-template-columns: 180px 1fr;
                  gap: var(--spacing-5);
                  padding: var(--spacing-5);
                  background:
                    linear-gradient(90deg, rgba(27, 95, 138, 0.06), transparent 34%),
                    var(--color-white);
                  border: 1px solid var(--color-gray-200);
                  border-radius: var(--border-radius-lg);
                }

                .live-delight-scanline__rail {
                  display: grid;
                  align-content: center;
                  gap: var(--spacing-3);
                }

                .live-delight-scanline__rail h2 {
                  margin: 0;
                  color: var(--color-dark);
                  font-size: var(--font-size-2xl);
                  font-weight: var(--font-weight-extrabold);
                  line-height: 1;
                }

                .live-delight-scanline__rail p {
                  margin: 0;
                  color: var(--color-gray-600);
                  font-size: var(--font-size-sm);
                  line-height: 1.4;
                }

                .live-delight-scanline__grid {
                  display: grid;
                  grid-template-columns: repeat(4, minmax(0, 1fr));
                  gap: var(--spacing-4);
                }

                .live-delight-scanline__card {
                  position: relative;
                  color: inherit;
                }

                .live-delight-scanline__card::after {
                  content: "";
                  position: absolute;
                  inset: 0;
                  background: radial-gradient(circle at 50% 20%, rgba(210, 35, 42, calc(var(--p-signal, 0.3) * 0.18)), transparent 46%);
                  pointer-events: none;
                }

                .live-delight-scanline__card img {
                  width: 100%;
                  aspect-ratio: 16 / 10;
                  object-fit: cover;
                  border-radius: var(--border-radius-md);
                }

                .live-delight-scanline__card span {
                  display: block;
                  margin-top: var(--spacing-3);
                  color: var(--color-gray-600);
                  font-family: var(--font-label);
                  font-size: var(--font-size-xs);
                  font-weight: var(--font-weight-bold);
                  letter-spacing: 0.08em;
                  text-transform: uppercase;
                }

                .live-delight-scanline__card h3 {
                  margin: var(--spacing-1) 0 0;
                  color: var(--color-dark);
                  font-size: var(--font-size-sm);
                  font-weight: var(--font-weight-extrabold);
                  line-height: 1.25;
                }

                @media (max-width: 900px) {
                  .live-delight-scanline {
                    grid-template-columns: 1fr;
                  }

                  .live-delight-scanline__grid {
                    grid-template-columns: repeat(2, minmax(0, 1fr));
                  }
                }
              }
            `}),e.jsx("div",{"data-impeccable-variant":"1","data-impeccable-params":'[{"id":"air","kind":"range","min":0,"max":1,"step":0.05,"default":0.45,"label":"Editorial air"}]',children:e.jsxs("section",{className:"live-delight-desk",children:[e.jsxs("div",{className:"live-delight-desk__intro",children:[e.jsxs("div",{children:[e.jsx("span",{className:"live-delight-desk__label",children:"Editor’s desk"}),e.jsx("h2",{children:"Latest Articles"}),e.jsxs("span",{className:"live-delight-desk__meta",children:[l.length," stories selected"]})]}),e.jsxs(r,{to:"/news/all",className:"live-delight-desk__cta",children:["View All ",e.jsx(o,{size:14})]})]}),e.jsx("div",{className:"live-delight-desk__cards",children:l.slice(0,4).map(a=>e.jsxs(r,{to:a.href,className:"live-delight-desk__card",children:[e.jsx("div",{className:"live-delight-desk__image",children:e.jsx("img",{src:a.image,alt:a.headline,loading:"lazy"})}),e.jsxs("div",{children:[e.jsx("span",{className:"live-delight-desk__sponsor",children:a.category}),e.jsx("h3",{className:"live-delight-desk__headline",children:a.headline})]})]},a.id))})]})}),e.jsx("div",{"data-impeccable-variant":"2","data-impeccable-params":'[{"id":"gap","kind":"range","min":0,"max":1,"step":0.05,"default":0.35,"label":"Card gap"}]',style:{display:"none"},children:e.jsxs("section",{className:"live-delight-strip",children:[e.jsxs("div",{className:"live-delight-strip__header",children:[e.jsx("h2",{children:"Latest Articles"}),e.jsxs("span",{children:[l.length," stories / road-tested picks"]})]}),e.jsx("div",{className:"live-delight-strip__list",children:l.slice(0,4).map((a,i)=>e.jsxs(r,{to:a.href,className:"live-delight-strip__item",children:[e.jsxs("div",{className:"live-delight-strip__image",children:[e.jsx("img",{src:a.image,alt:a.headline,loading:"lazy"}),e.jsx("span",{className:"live-delight-strip__number",children:i+1})]}),e.jsxs("div",{className:"live-delight-strip__copy",children:[e.jsx("span",{children:a.category}),e.jsx("h3",{children:a.headline})]})]},a.id))})]})}),e.jsx("div",{"data-impeccable-variant":"3","data-impeccable-params":'[{"id":"signal","kind":"range","min":0,"max":1,"step":0.05,"default":0.3,"label":"Signal mark"}]',style:{display:"none"},children:e.jsxs("section",{className:"live-delight-scanline",children:[e.jsxs("div",{className:"live-delight-scanline__rail",children:[e.jsx("h2",{children:"Latest Articles"}),e.jsxs("p",{children:[l.length," new reads from the testing desk, filtered for quick scanning."]}),e.jsxs(r,{to:"/news/all",className:"news-page__row-cta",children:["View All ",e.jsx(o,{size:14})]})]}),e.jsx("div",{className:"live-delight-scanline__grid",children:l.slice(0,4).map(a=>e.jsxs(r,{to:a.href,className:"live-delight-scanline__card",children:[e.jsx("img",{src:a.image,alt:a.headline,loading:"lazy"}),e.jsx("span",{children:a.category}),e.jsx("h3",{children:a.headline})]},a.id))})]})})]}),e.jsxs("section",{className:"news-page__row",children:[e.jsxs("div",{className:"news-page__row-left",children:[e.jsx("h2",{className:"news-page__row-title",children:"Best SUVs"}),e.jsxs("span",{className:"news-page__row-count",children:[s.length," top rated"]}),e.jsxs(r,{to:"/rankings/suv",className:"news-page__row-cta",children:["View All ",e.jsx(o,{size:14})]})]}),e.jsx("div",{className:"news-page__row-cards",children:s.map((a,i)=>e.jsx(m,{id:a.id,name:`${a.year} ${a.make} ${a.model}`,slug:a.slug,image:a.image,price:a.priceRange,rating:a.staffRating,rank:i+1,editorsChoice:a.editorsChoice,tenBest:a.tenBest,showSaveButton:!0,showShopButton:!0,shopButtonText:`SHOP NEW ${a.model.toUpperCase()}`,shopButtonVariant:"outline",modelName:a.model},a.id))})]}),e.jsxs("section",{className:"news-page__row",children:[e.jsxs("div",{className:"news-page__row-left",children:[e.jsx("h2",{className:"news-page__row-title",children:"Best Deals"}),e.jsxs("span",{className:"news-page__row-count",children:[c.length," featured"]}),e.jsxs(r,{to:"/deals",className:"news-page__row-cta",children:["View All ",e.jsx(o,{size:14})]})]}),e.jsx("div",{className:"news-page__row-cards",children:c.map(a=>e.jsxs(r,{to:`/vehicle/${a.slug}`,className:"news-page__deal-card",children:[e.jsxs("div",{className:"news-page__deal-card-image",children:[e.jsx("img",{src:a.image,alt:a.vehicleName}),e.jsx("span",{className:"news-page__deal-card-badge",children:a.type})]}),e.jsxs("div",{className:"news-page__deal-card-body",children:[e.jsx("h3",{className:"news-page__deal-card-name",children:a.vehicleName}),e.jsx("span",{className:"news-page__deal-card-label",children:a.label}),e.jsx("span",{className:"news-page__deal-card-price",children:a.price})]})]},a.id))})]})]})})]})};h.__docgenInfo={description:"",methods:[],displayName:"NewsPage"};const W={title:"Pages/News + Stories",component:h,parameters:{layout:"fullscreen",docs:{description:{component:`
# News + Stories Index Page

The main landing page for editorial content, featuring a hero story and categorized article grids.

## Structure

1. **Hero Section** - Full-width featured story with large image, headline, subheadline, and byline
2. **Testing Hub Section** - 4-column grid of recent test articles
3. **Latest News Section** - 4-column grid with alternate background
4. **Editor's Pick** - Featured BigStoryCard with side-by-side layout

## Features

- Responsive grid layouts (4 → 3 → 2 → 1 columns)
- Hover effects on images and headlines
- Category badges and author bylines
- "View All" links for each section

## Routes

- \`/news\` - Main news index
- \`/news-stories\` - Alias route
- \`/news/:slug\` - Individual article pages
        `}}}},d={name:"News + Stories Index"};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  name: 'News + Stories Index'
}`,...d.parameters?.docs?.source}}};const K=["Default"];export{d as Default,K as __namedExportsOrder,W as default};
