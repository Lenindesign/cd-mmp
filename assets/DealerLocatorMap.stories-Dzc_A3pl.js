import{j as e}from"./iframe-BDwDJx5t.js";import{D,V as C,a as f}from"./DealerLocatorMap-Q36X5MNZ.js";import{g as b,s as x}from"./dealerService-XS5YmmE2.js";import"./preload-helper-PPVm8Dsz.js";import"./star-B-5KzPTa.js";import"./createLucideIcon-nvcdPmaH.js";import"./chevron-right-Da8Mb8qe.js";import"./map-pin-DORRSJl1.js";import"./phone-CzJUObHk.js";import"./navigation-BhYMJPzD.js";import"./dollar-sign-BXRHIYLU.js";import"./ExitIntentModal-B5JCQQKs.js";import"./x-B3JBZL4p.js";import"./heart-DFJQlgJk.js";import"./trending-down-B6DqzAIX.js";import"./file-text-eH4dtgpj.js";import"./clock-D1IzEPd1.js";import"./bookmark-VCnPOlGQ.js";import"./index-BJmGQk_Z.js";import"./index-DZDs2IQt.js";import"./MakeOfferModal-BZkwCMI2.js";import"./car-DaVJdGlY.js";import"./user-CtYL059y.js";import"./mail-0CaNENLx.js";import"./circle-check-big-OcTfRQ19.js";import"./chevron-down-CGStV66s.js";const X={title:"Organisms/DealerLocatorMap",component:D,decorators:[a=>e.jsx("div",{style:{height:"600px",maxHeight:"600px",overflow:"hidden"},children:e.jsx(a,{})})],parameters:{layout:"padded",docs:{description:{component:`
# Dealer Locator Map

A Google Maps-powered component that helps car buyers find nearby dealers with the best deals for a specific vehicle.

## User Experience Goal

Help car buyers answer: **"Where can I get the best deal on THIS specific car near me?"**

---

## Features

| Feature | Description |
|---------|-------------|
| **Vehicle Context** | Shows the car being searched with image, MSRP, specs |
| **Deal Scoring** | Ranks dealers by price, distance, rating, and inventory |
| **Best Deal Badge** | Highlights the optimal dealer choice |
| **Inventory Display** | Shows how many units each dealer has in stock |
| **Mobile Bottom Sheet** | Detailed dealer info on tap |
| **Progressive Enhancement** | Works without Google Maps API |

---

## Deal Scoring Algorithm

\`\`\`
Score = (PriceScore × 0.4) + (DistanceScore × 0.3) + (RatingScore × 0.2) + (InventoryBonus × 0.1)
\`\`\`

| Factor | Weight | Description |
|--------|--------|-------------|
| Price | 40% | Lower price = higher score |
| Distance | 30% | Closer = higher score |
| Rating | 20% | Higher rating = higher score |
| Inventory | 10% | More stock = bonus points |

---

## Progressive Enhancement Levels

| Level | Features | Fallback |
|-------|----------|----------|
| **Level 0** | Static dealer list with addresses | No JS required |
| **Level 1** | Interactive list with sorting | Works without Maps API |
| **Level 2** | Google Maps with custom markers | Falls back to Level 1 |
| **Level 3** | Browser geolocation | Falls back to zip code input |

---

## Usage

\`\`\`tsx
import { DealerLocatorMap } from '@/components/DealerLocatorMap';

<DealerLocatorMap
  vehicle={{
    year: 2025,
    make: 'Chevrolet',
    model: 'Trax',
    msrp: 21895,
    image: '/images/trax.jpg',
    rating: 8.5,
    bodyStyle: 'SUV',
    mpg: 28,
  }}
  initialZipCode="33101"
  showVehiclePreview={true}
/>
\`\`\`
        `}}},tags:["autodocs"],argTypes:{vehicle:{description:"Vehicle information to display in the header",control:"object",table:{type:{summary:"VehicleInfo"},category:"Vehicle"}},initialLocation:{description:"Initial map center coordinates",control:"object",table:{type:{summary:"{ lat: number; lng: number }"},category:"Location"}},initialZipCode:{description:"Initial ZIP code for location display",control:"text",table:{type:{summary:"string"},category:"Location"}},showVehiclePreview:{description:"Show vehicle context header",control:"boolean",table:{type:{summary:"boolean"},defaultValue:{summary:"true"},category:"Display"}},defaultView:{description:"Default view mode",control:{type:"radio",options:["map","list"]},table:{type:{summary:"'map' | 'list'"},defaultValue:{summary:"'list'"},category:"Display"}},maxResults:{description:"Maximum number of dealers to show",control:{type:"number",min:5,max:50},table:{type:{summary:"number"},defaultValue:{summary:"20"},category:"Display"}},cardVariant:{description:"Card display variant",control:{type:"radio",options:["full","compact"]},table:{type:{summary:"'full' | 'compact'"},defaultValue:{summary:"'full'"},category:"Display"}}}},s={year:2025,make:"Chevrolet",model:"Trax",msrp:21895,image:"https://d2kde5ohu8qb21.cloudfront.net/files/66466c119cbba1000852d79c/007-2025-chevrolet-trax-exterior-front-view.jpg",rating:8.5,bodyStyle:"SUV",mpg:28},V={year:2025,make:"Honda",model:"Accord",trim:"Sport",msrp:29610,image:"https://d2kde5ohu8qb21.cloudfront.net/files/679d37b47ff34400082301e7/19-2025-honda-accord-front-view.jpg",rating:9,bodyStyle:"Sedan",mpg:32},o={args:{vehicle:s,initialZipCode:"Miami, FL",showVehiclePreview:!0,defaultView:"list",maxResults:20}},i={args:{vehicle:s,initialZipCode:"Miami, FL",showVehiclePreview:!1,defaultView:"list"},parameters:{docs:{description:{story:"When embedded in a vehicle detail page, the vehicle preview can be hidden since the context is already clear."}}}},l={args:{vehicle:V,initialZipCode:"Los Angeles, CA",showVehiclePreview:!0,defaultView:"list"},parameters:{docs:{description:{story:"The component works with any vehicle data passed to it."}}}},n={args:{vehicle:s,initialZipCode:"Los Angeles, CA",showVehiclePreview:!0,defaultView:"list",cardVariant:"compact"},parameters:{docs:{description:{story:"Compact card variant for a more space-efficient dealer list. Shows essential info (name, inventory, price, rating, distance) in a condensed format."}}}},c={args:{vehicle:s,initialZipCode:"Miami, FL",showVehiclePreview:!0,maxResults:3},parameters:{docs:{description:{story:"Limit the number of dealers shown for a more focused view."}}}},d={render:()=>e.jsx(C,{vehicle:s}),parameters:{docs:{description:{story:"The vehicle context header shows the car being searched with key specs."}}}},p={render:()=>e.jsx(C,{vehicle:s,variant:"compact"}),parameters:{docs:{description:{story:"Compact variant used as a sticky header on mobile."}}}},m={render:()=>{const a=b("Chevrolet","Trax"),r=x(a,"bestDeal")[0];return e.jsx("div",{style:{maxWidth:400,padding:16},children:e.jsx(f,{dealer:r,vehicleModel:"Trax",isSelected:!1})})},parameters:{docs:{description:{story:'Dealer card with the "Best Deal" badge, showing inventory count and price range.'}}}},h={render:()=>{const t=b("Chevrolet","Trax")[1];return e.jsx("div",{style:{maxWidth:400,padding:16},children:e.jsx(f,{dealer:t,vehicleModel:"Trax",isSelected:!0})})},parameters:{docs:{description:{story:"Dealer card in selected state with blue border highlight."}}}},u={render:()=>{const a=b("Chevrolet","Trax");return e.jsx("div",{style:{maxWidth:400,background:"white"},children:a.slice(0,3).map(t=>e.jsx(f,{dealer:t,vehicleModel:"Trax",variant:"compact"},t.id))})},parameters:{docs:{description:{story:"Compact dealer cards for dense list views."}}}},v={render:()=>{const a=b("Chevrolet","Trax"),r=x(a,"bestDeal")[0];return e.jsx("div",{style:{height:500,position:"relative",background:"#f5f5f5",overflow:"hidden"},children:e.jsxs("div",{className:"dealer-bottom-sheet dealer-bottom-sheet--open",style:{position:"relative",transform:"none"},children:[e.jsx("button",{className:"dealer-bottom-sheet__close","aria-label":"Close dealer details",children:e.jsx("span",{children:"×"})}),e.jsxs("div",{className:"dealer-bottom-sheet__content",children:[e.jsxs("header",{className:"dealer-bottom-sheet__header",children:[e.jsx("span",{className:"dealer-card__badge",children:"BEST DEAL"}),e.jsx("h2",{className:"dealer-bottom-sheet__name",children:r.name}),e.jsxs("p",{className:"dealer-bottom-sheet__address",children:[r.address,e.jsx("br",{}),r.city,", ",r.state," ",r.zipCode]}),e.jsxs("div",{className:"dealer-bottom-sheet__rating",children:[e.jsx("span",{className:"dealer-card__rating-value",children:r.rating}),e.jsxs("span",{className:"dealer-card__rating-count",children:["(",r.reviewCount," reviews)"]})]})]}),e.jsx("p",{className:"dealer-bottom-sheet__hours",children:"Today: 9:00 AM - 9:00 PM"})]})]})})},parameters:{docs:{description:{story:"Mobile bottom sheet showing detailed dealer information and inventory."}}}},g={render:()=>{const a=b("Chevrolet","Trax"),t=x(a,"bestDeal");return e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(350px, 1fr))",gap:16,padding:16,background:"#f5f5f5"},children:t.map(r=>e.jsx(f,{dealer:r,vehicleModel:"Trax"},r.id))})},parameters:{docs:{description:{story:"All dealer cards displayed in a responsive grid layout."}}}},y={args:{vehicle:s,initialZipCode:"Los Angeles, CA",showVehiclePreview:!0,defaultView:"list"},parameters:{layout:"fullscreen",viewport:{defaultViewport:"mobile1"},docs:{description:{story:"Mobile viewport with list/map toggle and compact header."}}}},w={args:{vehicle:s,initialZipCode:"Los Angeles, CA",showVehiclePreview:!0,defaultView:"list"},parameters:{layout:"fullscreen",viewport:{defaultViewport:"tablet"},docs:{description:{story:"Tablet viewport with split view layout."}}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    vehicle: defaultVehicle,
    initialZipCode: 'Miami, FL',
    showVehiclePreview: true,
    defaultView: 'list',
    maxResults: 20
  }
}`,...o.parameters?.docs?.source},description:{story:"Default dealer locator with full vehicle context",...o.parameters?.docs?.description}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    vehicle: defaultVehicle,
    initialZipCode: 'Miami, FL',
    showVehiclePreview: false,
    defaultView: 'list'
  },
  parameters: {
    docs: {
      description: {
        story: 'When embedded in a vehicle detail page, the vehicle preview can be hidden since the context is already clear.'
      }
    }
  }
}`,...i.parameters?.docs?.source},description:{story:"Without vehicle preview header - for embedding in vehicle pages",...i.parameters?.docs?.description}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    vehicle: hondaAccord,
    initialZipCode: 'Los Angeles, CA',
    showVehiclePreview: true,
    defaultView: 'list'
  },
  parameters: {
    docs: {
      description: {
        story: 'The component works with any vehicle data passed to it.'
      }
    }
  }
}`,...l.parameters?.docs?.source},description:{story:"Different vehicle - Honda Accord",...l.parameters?.docs?.description}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    vehicle: defaultVehicle,
    initialZipCode: 'Los Angeles, CA',
    showVehiclePreview: true,
    defaultView: 'list',
    cardVariant: 'compact'
  },
  parameters: {
    docs: {
      description: {
        story: 'Compact card variant for a more space-efficient dealer list. Shows essential info (name, inventory, price, rating, distance) in a condensed format.'
      }
    }
  }
}`,...n.parameters?.docs?.source},description:{story:"Compact Cards - Space-efficient dealer list",...n.parameters?.docs?.description}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    vehicle: defaultVehicle,
    initialZipCode: 'Miami, FL',
    showVehiclePreview: true,
    maxResults: 3
  },
  parameters: {
    docs: {
      description: {
        story: 'Limit the number of dealers shown for a more focused view.'
      }
    }
  }
}`,...c.parameters?.docs?.source},description:{story:"Limited results",...c.parameters?.docs?.description}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: () => <VehicleContextHeader vehicle={defaultVehicle} />,
  parameters: {
    docs: {
      description: {
        story: 'The vehicle context header shows the car being searched with key specs.'
      }
    }
  }
}`,...d.parameters?.docs?.source},description:{story:"Vehicle Context Header - Full variant",...d.parameters?.docs?.description}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => <VehicleContextHeader vehicle={defaultVehicle} variant="compact" />,
  parameters: {
    docs: {
      description: {
        story: 'Compact variant used as a sticky header on mobile.'
      }
    }
  }
}`,...p.parameters?.docs?.source},description:{story:"Vehicle Context Header - Compact variant (mobile sticky)",...p.parameters?.docs?.description}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: () => {
    const dealers = getDealersForVehicle('Chevrolet', 'Trax');
    const sorted = sortDealers(dealers, 'bestDeal');
    const bestDealer = sorted[0];
    return <div style={{
      maxWidth: 400,
      padding: 16
    }}>
        <DealerCard dealer={bestDealer} vehicleModel="Trax" isSelected={false} />
      </div>;
  },
  parameters: {
    docs: {
      description: {
        story: 'Dealer card with the "Best Deal" badge, showing inventory count and price range.'
      }
    }
  }
}`,...m.parameters?.docs?.source},description:{story:"Dealer Card - Full variant with Best Deal badge",...m.parameters?.docs?.description}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: () => {
    const dealers = getDealersForVehicle('Chevrolet', 'Trax');
    const dealer = dealers[1];
    return <div style={{
      maxWidth: 400,
      padding: 16
    }}>
        <DealerCard dealer={dealer} vehicleModel="Trax" isSelected={true} />
      </div>;
  },
  parameters: {
    docs: {
      description: {
        story: 'Dealer card in selected state with blue border highlight.'
      }
    }
  }
}`,...h.parameters?.docs?.source},description:{story:"Dealer Card - Selected state",...h.parameters?.docs?.description}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  render: () => {
    const dealers = getDealersForVehicle('Chevrolet', 'Trax');
    return <div style={{
      maxWidth: 400,
      background: 'white'
    }}>
        {dealers.slice(0, 3).map(dealer => <DealerCard key={dealer.id} dealer={dealer} vehicleModel="Trax" variant="compact" />)}
      </div>;
  },
  parameters: {
    docs: {
      description: {
        story: 'Compact dealer cards for dense list views.'
      }
    }
  }
}`,...u.parameters?.docs?.source},description:{story:"Dealer Card - Compact variant (list item)",...u.parameters?.docs?.description}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  render: () => {
    const dealers = getDealersForVehicle('Chevrolet', 'Trax');
    const sorted = sortDealers(dealers, 'bestDeal');
    const bestDealer = sorted[0];

    // Render the sheet content directly without the focus trap behavior
    // by showing it in a static container
    return <div style={{
      height: 500,
      position: 'relative',
      background: '#f5f5f5',
      overflow: 'hidden'
    }}>
        <div className="dealer-bottom-sheet dealer-bottom-sheet--open" style={{
        position: 'relative',
        transform: 'none'
      }}>
          <button className="dealer-bottom-sheet__close" aria-label="Close dealer details">
            <span>×</span>
          </button>
          <div className="dealer-bottom-sheet__content">
            <header className="dealer-bottom-sheet__header">
              <span className="dealer-card__badge">BEST DEAL</span>
              <h2 className="dealer-bottom-sheet__name">{bestDealer.name}</h2>
              <p className="dealer-bottom-sheet__address">
                {bestDealer.address}<br />
                {bestDealer.city}, {bestDealer.state} {bestDealer.zipCode}
              </p>
              <div className="dealer-bottom-sheet__rating">
                <span className="dealer-card__rating-value">{bestDealer.rating}</span>
                <span className="dealer-card__rating-count">({bestDealer.reviewCount} reviews)</span>
              </div>
            </header>
            <p className="dealer-bottom-sheet__hours">Today: 9:00 AM - 9:00 PM</p>
          </div>
        </div>
      </div>;
  },
  parameters: {
    docs: {
      description: {
        story: 'Mobile bottom sheet showing detailed dealer information and inventory.'
      }
    }
  }
}`,...v.parameters?.docs?.source},description:{story:`Bottom Sheet - Dealer details
Note: isOpen is false by default to prevent auto-focus scrolling in docs view`,...v.parameters?.docs?.description}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: () => {
    const dealers = getDealersForVehicle('Chevrolet', 'Trax');
    const sorted = sortDealers(dealers, 'bestDeal');
    return <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
      gap: 16,
      padding: 16,
      background: '#f5f5f5'
    }}>
        {sorted.map(dealer => <DealerCard key={dealer.id} dealer={dealer} vehicleModel="Trax" />)}
      </div>;
  },
  parameters: {
    docs: {
      description: {
        story: 'All dealer cards displayed in a responsive grid layout.'
      }
    }
  }
}`,...g.parameters?.docs?.source},description:{story:"All dealer cards in a grid",...g.parameters?.docs?.description}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  args: {
    vehicle: defaultVehicle,
    initialZipCode: 'Los Angeles, CA',
    showVehiclePreview: true,
    defaultView: 'list'
  },
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'mobile1'
    },
    docs: {
      description: {
        story: 'Mobile viewport with list/map toggle and compact header.'
      }
    }
  }
}`,...y.parameters?.docs?.source},description:{story:"Mobile viewport simulation",...y.parameters?.docs?.description}}};w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  args: {
    vehicle: defaultVehicle,
    initialZipCode: 'Los Angeles, CA',
    showVehiclePreview: true,
    defaultView: 'list'
  },
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'tablet'
    },
    docs: {
      description: {
        story: 'Tablet viewport with split view layout.'
      }
    }
  }
}`,...w.parameters?.docs?.source},description:{story:"Tablet viewport simulation",...w.parameters?.docs?.description}}};const Y=["Default","WithoutVehiclePreview","DifferentVehicle","CompactCards","LimitedResults","VehicleHeader","VehicleHeaderCompact","DealerCardBestDeal","DealerCardSelected","DealerCardCompact","BottomSheetOpen","AllDealerCards","MobileView","TabletView"];export{g as AllDealerCards,v as BottomSheetOpen,n as CompactCards,m as DealerCardBestDeal,u as DealerCardCompact,h as DealerCardSelected,o as Default,l as DifferentVehicle,c as LimitedResults,y as MobileView,w as TabletView,d as VehicleHeader,p as VehicleHeaderCompact,i as WithoutVehiclePreview,Y as __namedExportsOrder,X as default};
