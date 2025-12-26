import{M as c}from"./MakeOfferModal-BYoHhgGC.js";import"./iframe-DmndRlf0.js";import"./preload-helper-PPVm8Dsz.js";import"./dealerService-CeBNsEgh.js";import"./x-a1_nNonp.js";import"./createLucideIcon-BwCQpYwD.js";import"./car-DbwrjJ2-.js";import"./dollar-sign-CjNvGiGm.js";import"./send-DoOKwlKB.js";import"./user-CyMx193r.js";import"./mail-BG3TNArx.js";import"./phone-DCYOFQE7.js";import"./circle-check-big-DlBhpGtR.js";const o={id:"dealer-1",name:"AutoNation Honda Costa Mesa",address:"2855 Harbor Blvd",city:"Costa Mesa",state:"CA",zipCode:"92626",phone:"(714) 555-1234",rating:4.7,reviewCount:328,inventoryCount:15,lowestPrice:28995,highestPrice:34500,distance:3.2,lat:33.6846,lng:-117.9089,inventory:[],dealScore:{total:92,priceScore:30,distanceScore:25,ratingScore:22,inventoryBonus:15,isBestDeal:!0}},l={year:2025,make:"Honda",model:"Accord",trim:"Sport",msrp:32490},y={title:"Organisms/MakeOfferModal",component:c,parameters:{layout:"centered",docs:{description:{component:`
The **MakeOfferModal** component allows users to submit price offers to dealers. It features:

- **Quick Select Options**: Pre-calculated offers at MSRP, 3%, 5%, and 8% below
- **Custom Offer Input**: Enter any amount
- **Trade-In Support**: Add trade-in vehicle value
- **Financing Options**: Indicate financing needs and down payment
- **Two-Step Flow**: Offer details → Contact information → Success
- **Savings Calculator**: Shows percentage and dollar savings from MSRP

## Usage

\`\`\`tsx
import { MakeOfferModal } from './components/DealerLocatorMap';

<MakeOfferModal
  isOpen={true}
  onClose={() => setIsOpen(false)}
  dealer={selectedDealer}
  vehicle={{ year: 2025, make: 'Honda', model: 'Accord', msrp: 32490 }}
  onSubmitOffer={(offer) => console.log('Offer submitted:', offer)}
/>
\`\`\`
        `}}},tags:["autodocs"],argTypes:{isOpen:{control:"boolean",description:"Controls modal visibility"},dealer:{description:"The dealer to send the offer to"},vehicle:{description:"Vehicle information including MSRP"},onClose:{description:"Callback when modal is closed"},onSubmitOffer:{description:"Callback when offer is submitted"}}},e=()=>{},r={args:{isOpen:!0,dealer:o,vehicle:l,onClose:e,onSubmitOffer:e}},n={args:{isOpen:!0,dealer:{...o,name:"Beverly Hills BMW"},vehicle:{year:2025,make:"BMW",model:"M5",trim:"Competition",msrp:112895},onClose:e,onSubmitOffer:e}},t={args:{isOpen:!0,dealer:{...o,name:"Kia of Irvine"},vehicle:{year:2025,make:"Kia",model:"Forte",trim:"LXS",msrp:21490},onClose:e,onSubmitOffer:e}},a={args:{isOpen:!0,dealer:{...o,name:"Tesla Orange County"},vehicle:{year:2025,make:"Tesla",model:"Model 3",trim:"Long Range",msrp:47990},onClose:e,onSubmitOffer:e}},s={args:{isOpen:!0,dealer:o,vehicle:l,onClose:e,onSubmitOffer:i=>{console.log("Offer submitted:",i),alert(`Offer of $${i.offerAmount.toLocaleString()} submitted to ${i.dealerName}!`)}},parameters:{docs:{description:{story:"Try submitting an offer! Fill out the form and click through the steps."}}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    isOpen: true,
    dealer: mockDealer,
    vehicle: mockVehicle,
    onClose: noop,
    onSubmitOffer: noop
  }
}`,...r.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    isOpen: true,
    dealer: {
      ...mockDealer,
      name: 'Beverly Hills BMW'
    },
    vehicle: {
      year: 2025,
      make: 'BMW',
      model: 'M5',
      trim: 'Competition',
      msrp: 112895
    },
    onClose: noop,
    onSubmitOffer: noop
  }
}`,...n.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    isOpen: true,
    dealer: {
      ...mockDealer,
      name: 'Kia of Irvine'
    },
    vehicle: {
      year: 2025,
      make: 'Kia',
      model: 'Forte',
      trim: 'LXS',
      msrp: 21490
    },
    onClose: noop,
    onSubmitOffer: noop
  }
}`,...t.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    isOpen: true,
    dealer: {
      ...mockDealer,
      name: 'Tesla Orange County'
    },
    vehicle: {
      year: 2025,
      make: 'Tesla',
      model: 'Model 3',
      trim: 'Long Range',
      msrp: 47990
    },
    onClose: noop,
    onSubmitOffer: noop
  }
}`,...a.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    isOpen: true,
    dealer: mockDealer,
    vehicle: mockVehicle,
    onClose: noop,
    onSubmitOffer: offer => {
      console.log('Offer submitted:', offer);
      alert(\`Offer of $\${offer.offerAmount.toLocaleString()} submitted to \${offer.dealerName}!\`);
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Try submitting an offer! Fill out the form and click through the steps.'
      }
    }
  }
}`,...s.parameters?.docs?.source}}};const M=["Default","LuxuryVehicle","BudgetVehicle","ElectricVehicle","InteractiveDemo"];export{t as BudgetVehicle,r as Default,a as ElectricVehicle,s as InteractiveDemo,n as LuxuryVehicle,M as __namedExportsOrder,y as default};
