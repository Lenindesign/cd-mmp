import{j as e}from"./iframe-BmlzIRR_.js";import"./preload-helper-PPVm8Dsz.js";const w=s=>s.toLocaleString(),x=s=>{const{make:c,model:o,numberAvailable:t,averageDaysOnLot:i=0,cashIncentive:a=0}=s,n=`${c} ${o}`,r=t>=15,d=i>=30,l=a>0,b=r||d?"buyers":"sellers";return{title:`Negotiation Advice: New ${n}`,marketSummary:b==="buyers"?`This market favors buyers. There are **${t} new ${n}s available**, with vehicles sitting an **average of ${i} days on the lot**—${i>=30?"well past the 30-day threshold where dealers start feeling pressure to sell.":"giving you some room to negotiate."}`:`This is a competitive market with limited inventory. Only **${t} new ${n}s are available**, so be prepared to act quickly on good deals.`,tips:[d?`Use inventory age as your entry point. Ask how long the specific ${o} has been on the lot and focus on units at **40+ days**, where dealers are most likely to move on price.`:"Ask about specific units that have been on the lot longest—these offer the best negotiating leverage.",l?`The **$${w(a)} cash incentive** should be treated as a given, not the negotiation. Apply it first, then push for additional dealer discount.`:"Check for manufacturer incentives or dealer cash that can be stacked on top of your negotiated price.",`For maximum leverage, negotiate **late in the month** and prioritize any **prior model-year ${n}s**, which dealers are most motivated to clear.`],bottomLine:"Expect room to negotiate. The best deals will come from aged inventory, end-of-month timing, and pushing beyond the incentive.",playbook:["Target vehicles with **40+ days** on lot",l?`Stack the **$${w(a)} incentive** with dealer discount`:"Ask about available incentives and rebates","Negotiate **late in the month** for best results","Focus on **prior model-year** inventory"]}},C=s=>{const{make:c,model:o,numberAvailable:t,mileageRange:i,numberWithGoodPrice:a,numberNewlyListed:n}=s,r=`${c} ${o}`,d=t<=10,l=a===0,b=n<=2,f=i&&i.high-i.low>=5e4,k=d&&l?"tight but overpriced":d?"limited":"competitive";return{title:`Negotiation Advice: Used ${r}`,marketSummary:`This is a **${k} market**. Only **${t} used ${r}s are available locally**, and ${a===0?"**none are rated as a good or great price**":`only **${a}** are rated as a good or great price`}, which suggests sellers are testing the top of the market rather than competing aggressively.`,tips:[f&&i?`The **wide mileage range (${w(i.low)}–${w(i.high)} miles)** creates meaningful pricing spread. Higher-mileage units give you the strongest negotiating leverage, especially if they're priced close to lower-mileage examples. Use mileage—and expected future maintenance—as justification for a price correction.`:"Compare mileage across available units to find pricing inconsistencies you can use as leverage.",b?`Only **${n===1?"one vehicle is":`${n} vehicles are`} newly listed**, meaning most listings have been sitting without attracting buyers. That's a signal to push back on price, particularly on older listings where sellers may be more willing to negotiate after limited interest.`:`With **${n} newly listed vehicles**, there's fresh competition in the market—use this to your advantage.`],bottomLine:l?"Be prepared to walk—scarcity exists, but pricing is still soft.":"There are deals to be found, but you'll need to negotiate to get there.",playbook:[f?`Push hardest on **higher-mileage ${r}s**`:"Focus on **highest-mileage** units for best leverage",l?"Challenge pricing using **comparable listings**, since none are well-priced":`Reference the **${a} well-priced** listings in your negotiation`,b?"Focus on vehicles that are **not newly listed**":"Compare against **newly listed** vehicles","Be prepared to walk—scarcity exists, but pricing is still soft"]}},N=({vehicle:s,className:c=""})=>{const o=s.listingType==="new"?x(s):C(s),t=i=>i.split(/(\*\*[^*]+\*\*)/g).map((n,r)=>n.startsWith("**")&&n.endsWith("**")?e.jsx("strong",{children:n.slice(2,-2)},r):n);return e.jsxs("div",{className:`negotiation-advice ${c}`,children:[e.jsx("div",{className:"negotiation-advice__header",children:e.jsx("h3",{className:"negotiation-advice__title",children:o.title})}),e.jsxs("div",{className:"negotiation-advice__content",children:[e.jsx("p",{className:"negotiation-advice__summary",children:t(o.marketSummary)}),e.jsx("div",{className:"negotiation-advice__tips",children:o.tips.map((i,a)=>e.jsx("p",{className:"negotiation-advice__tip",children:t(i)},a))}),e.jsxs("div",{className:"negotiation-advice__bottom-line",children:[e.jsx("span",{className:"negotiation-advice__bottom-line-label",children:"Bottom line:"}),e.jsx("p",{className:"negotiation-advice__bottom-line-text",children:t(o.bottomLine)})]}),e.jsxs("div",{className:"negotiation-advice__playbook",children:[e.jsx("h4",{className:"negotiation-advice__playbook-title",children:"Negotiation playbook:"}),e.jsx("ul",{className:"negotiation-advice__playbook-list",children:o.playbook.map((i,a)=>e.jsx("li",{className:"negotiation-advice__playbook-item",children:t(i)},a))})]})]})]})};N.__docgenInfo={description:"",methods:[],displayName:"NegotiationAdvice",props:{vehicle:{required:!0,tsType:{name:"VehicleInventoryData"},description:""},className:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"''",computed:!1}}}};const L={title:"Components/NegotiationAdvice",component:N,parameters:{layout:"padded",docs:{description:{component:"Displays personalized negotiation advice based on local market inventory data. Provides actionable tips for both new and used car purchases."}}},tags:["autodocs"],argTypes:{vehicle:{description:"Vehicle inventory data used to generate advice"}}},m={args:{vehicle:{listingType:"new",make:"Honda",model:"CR-V",numberAvailable:20,averageDaysOnLot:45,cashIncentive:750,numberWithGoodPrice:0,numberNewlyListed:0}}},g={args:{vehicle:{listingType:"new",make:"Toyota",model:"RAV4",numberAvailable:8,averageDaysOnLot:18,cashIncentive:0,numberWithGoodPrice:0,numberNewlyListed:0}}},h={args:{vehicle:{listingType:"new",make:"Kia",model:"K5",numberAvailable:15,averageDaysOnLot:38,cashIncentive:1500,numberWithGoodPrice:0,numberNewlyListed:0}}},p={args:{vehicle:{listingType:"used",make:"Honda",model:"CR-V",numberAvailable:5,mileageRange:{low:15e3,high:12e4},numberWithGoodPrice:0,numberNewlyListed:1}}},u={args:{vehicle:{listingType:"used",make:"Toyota",model:"Camry",numberAvailable:12,mileageRange:{low:25e3,high:85e3},numberWithGoodPrice:3,numberNewlyListed:4}}},v={args:{vehicle:{listingType:"used",make:"Kia",model:"K5",numberAvailable:7,mileageRange:{low:18e3,high:95e3},numberWithGoodPrice:1,numberNewlyListed:2}}},y={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"2rem"},children:[e.jsxs("div",{children:[e.jsx("h3",{style:{marginBottom:"1rem",fontFamily:"Poppins, sans-serif"},children:"Example 1: New Car"}),e.jsx(N,{vehicle:{listingType:"new",make:"Honda",model:"CR-V",numberAvailable:20,averageDaysOnLot:45,cashIncentive:750,numberWithGoodPrice:0,numberNewlyListed:0}})]}),e.jsxs("div",{children:[e.jsx("h3",{style:{marginBottom:"1rem",fontFamily:"Poppins, sans-serif"},children:"Example 2: Used Car"}),e.jsx(N,{vehicle:{listingType:"used",make:"Honda",model:"CR-V",numberAvailable:5,mileageRange:{low:15e3,high:12e4},numberWithGoodPrice:0,numberNewlyListed:1}})]})]})};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    vehicle: {
      listingType: 'new',
      make: 'Honda',
      model: 'CR-V',
      numberAvailable: 20,
      averageDaysOnLot: 45,
      cashIncentive: 750,
      numberWithGoodPrice: 0,
      numberNewlyListed: 0
    }
  }
}`,...m.parameters?.docs?.source},description:{story:`New car negotiation advice for a Honda CR-V with high inventory and aged units.
This scenario favors buyers with plenty of room to negotiate.`,...m.parameters?.docs?.description}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    vehicle: {
      listingType: 'new',
      make: 'Toyota',
      model: 'RAV4',
      numberAvailable: 8,
      averageDaysOnLot: 18,
      cashIncentive: 0,
      numberWithGoodPrice: 0,
      numberNewlyListed: 0
    }
  }
}`,...g.parameters?.docs?.source},description:{story:`New car negotiation advice for a Toyota RAV4 with limited inventory.
This scenario is more competitive for buyers.`,...g.parameters?.docs?.description}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    vehicle: {
      listingType: 'new',
      make: 'Kia',
      model: 'K5',
      numberAvailable: 15,
      averageDaysOnLot: 38,
      cashIncentive: 1500,
      numberWithGoodPrice: 0,
      numberNewlyListed: 0
    }
  }
}`,...h.parameters?.docs?.source},description:{story:"New car negotiation advice for a Kia K5 with moderate inventory and incentives.",...h.parameters?.docs?.description}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    vehicle: {
      listingType: 'used',
      make: 'Honda',
      model: 'CR-V',
      numberAvailable: 5,
      mileageRange: {
        low: 15000,
        high: 120000
      },
      numberWithGoodPrice: 0,
      numberNewlyListed: 1
    }
  }
}`,...p.parameters?.docs?.source},description:{story:`Used car negotiation advice for a Honda CR-V with tight, overpriced market.
Wide mileage range creates negotiating opportunities.`,...p.parameters?.docs?.description}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    vehicle: {
      listingType: 'used',
      make: 'Toyota',
      model: 'Camry',
      numberAvailable: 12,
      mileageRange: {
        low: 25000,
        high: 85000
      },
      numberWithGoodPrice: 3,
      numberNewlyListed: 4
    }
  }
}`,...u.parameters?.docs?.source},description:{story:"Used car negotiation advice with some well-priced options available.",...u.parameters?.docs?.description}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: {
    vehicle: {
      listingType: 'used',
      make: 'Kia',
      model: 'K5',
      numberAvailable: 7,
      mileageRange: {
        low: 18000,
        high: 95000
      },
      numberWithGoodPrice: 1,
      numberNewlyListed: 2
    }
  }
}`,...v.parameters?.docs?.source},description:{story:"Used car negotiation advice for a Kia K5 with limited inventory.",...v.parameters?.docs?.description}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem'
  }}>
      <div>
        <h3 style={{
        marginBottom: '1rem',
        fontFamily: 'Poppins, sans-serif'
      }}>Example 1: New Car</h3>
        <NegotiationAdvice vehicle={{
        listingType: 'new',
        make: 'Honda',
        model: 'CR-V',
        numberAvailable: 20,
        averageDaysOnLot: 45,
        cashIncentive: 750,
        numberWithGoodPrice: 0,
        numberNewlyListed: 0
      }} />
      </div>
      <div>
        <h3 style={{
        marginBottom: '1rem',
        fontFamily: 'Poppins, sans-serif'
      }}>Example 2: Used Car</h3>
        <NegotiationAdvice vehicle={{
        listingType: 'used',
        make: 'Honda',
        model: 'CR-V',
        numberAvailable: 5,
        mileageRange: {
          low: 15000,
          high: 120000
        },
        numberWithGoodPrice: 0,
        numberNewlyListed: 1
      }} />
      </div>
    </div>
}`,...y.parameters?.docs?.source},description:{story:"Comparison of new vs used car advice side by side.",...y.parameters?.docs?.description}}};const $=["NewCarBuyersMarket","NewCarSellersMarket","NewCarKiaK5","UsedCarOverpriced","UsedCarMixedMarket","UsedCarKiaK5","NewVsUsedComparison"];export{m as NewCarBuyersMarket,h as NewCarKiaK5,g as NewCarSellersMarket,y as NewVsUsedComparison,v as UsedCarKiaK5,u as UsedCarMixedMarket,p as UsedCarOverpriced,$ as __namedExportsOrder,L as default};
