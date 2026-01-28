import{j as m}from"./iframe-DxjPMNz-.js";import{O as u}from"./OfferNegotiation-CD5neoYx.js";import"./preload-helper-PPVm8Dsz.js";import"./dealerService-CeBNsEgh.js";import"./x-CCWOfB7z.js";import"./createLucideIcon-DETWup7J.js";import"./dollar-sign-B4iLklzj.js";import"./arrow-right-Bipe-zG8.js";import"./handshake-CKMrqnPW.js";import"./circle-check-big-DwS2Q0Gr.js";import"./send-An6LNF1B.js";import"./message-square-B-Leg0MX.js";import"./clock-DgZvHwFs.js";const e=()=>{},n={id:"neg-1",status:"pending",dealerName:"AutoNation Honda Costa Mesa",dealerId:"dealer-1",vehicle:{year:2025,make:"Honda",model:"Accord",trim:"Sport",msrp:32490},initialOffer:30865,currentOffer:30865,messages:[{id:"msg-1",type:"offer",sender:"customer",amount:30865,message:"I'm interested in this Accord. This is my best offer.",timestamp:new Date(Date.now()-36e5*24)}],createdAt:new Date(Date.now()-36e5*24)},A={title:"Organisms/OfferNegotiation",component:u,parameters:{layout:"centered",docs:{description:{component:`
The **OfferNegotiation** component enables back-and-forth price negotiation between customers and dealers. Features include:

- **Message Thread**: Visual conversation history with offers, counters, and messages
- **Status Tracking**: Pending, Countered, Accepted, Rejected, Expired states
- **Quick Actions**: Accept, Counter, or Decline dealer offers
- **Real-time Messaging**: Send messages alongside offers
- **Summary Bar**: Always-visible MSRP, your offer, and dealer counter

## Negotiation Flow

1. Customer submits initial offer via MakeOfferModal
2. Dealer reviews and responds (accept, counter, or reject)
3. Customer can accept counter, submit new counter, or decline
4. Process repeats until agreement or rejection

## Usage

\`\`\`tsx
import { OfferNegotiation } from './components/DealerLocatorMap';

<OfferNegotiation
  negotiation={negotiationData}
  onSendCounter={(amount, message) => handleCounter(amount, message)}
  onAcceptOffer={() => handleAccept()}
  onRejectOffer={() => handleReject()}
  onSendMessage={(message) => handleMessage(message)}
  onClose={() => setShowNegotiation(false)}
/>
\`\`\`
        `}}},tags:["autodocs"],decorators:[t=>m.jsx("div",{style:{width:"400px",height:"600px"},children:m.jsx(t,{})})],argTypes:{negotiation:{description:"The negotiation data including messages and status"},onSendCounter:{description:"Callback when user sends a counter offer"},onAcceptOffer:{description:"Callback when user accepts the dealer's offer"},onRejectOffer:{description:"Callback when user rejects/declines negotiation"},onSendMessage:{description:"Callback when user sends a message"},onClose:{description:"Callback to close the negotiation panel"}}},o={args:{negotiation:n,onSendCounter:e,onAcceptOffer:e,onRejectOffer:e,onSendMessage:e,onClose:e},parameters:{docs:{description:{story:"Initial state after customer submits an offer. Waiting for dealer response."}}}},s={args:{negotiation:{...n,status:"countered",currentOffer:31500,messages:[...n.messages,{id:"msg-2",type:"counter",sender:"dealer",amount:31500,message:"Thank you for your interest! We can meet you at $31,500 which includes our loyalty discount.",timestamp:new Date(Date.now()-36e5*2)}]},onSendCounter:e,onAcceptOffer:e,onRejectOffer:e,onSendMessage:e,onClose:e},parameters:{docs:{description:{story:"Dealer has responded with a counter offer. Customer can accept, counter, or decline."}}}},a={args:{negotiation:{...n,status:"countered",currentOffer:31200,messages:[{id:"msg-1",type:"offer",sender:"customer",amount:30865,message:"I'm interested in this Accord. This is my best offer.",timestamp:new Date(Date.now()-36e5*48)},{id:"msg-2",type:"counter",sender:"dealer",amount:31800,message:"We appreciate your offer. The best we can do is $31,800.",timestamp:new Date(Date.now()-36e5*24)},{id:"msg-3",type:"counter",sender:"customer",amount:31e3,message:"Can you do $31,000? I'm ready to buy today.",timestamp:new Date(Date.now()-36e5*12)},{id:"msg-4",type:"counter",sender:"dealer",amount:31200,message:"We can meet you at $31,200. This is our final offer and includes floor mats and first service free.",timestamp:new Date(Date.now()-36e5*2)}]},onSendCounter:e,onAcceptOffer:e,onRejectOffer:e,onSendMessage:e,onClose:e},parameters:{docs:{description:{story:"Shows multiple rounds of negotiation between customer and dealer."}}}},r={args:{negotiation:{...n,status:"accepted",currentOffer:31200,messages:[{id:"msg-1",type:"offer",sender:"customer",amount:31e3,timestamp:new Date(Date.now()-36e5*24)},{id:"msg-2",type:"counter",sender:"dealer",amount:31200,message:"We can do $31,200 with free floor mats.",timestamp:new Date(Date.now()-36e5*12)},{id:"msg-3",type:"accepted",sender:"customer",timestamp:new Date(Date.now()-36e5)}]},onSendCounter:e,onAcceptOffer:e,onRejectOffer:e,onSendMessage:e,onClose:e},parameters:{docs:{description:{story:"Customer has accepted the dealer's offer. Shows success state."}}}},i={args:{negotiation:{...n,status:"rejected",messages:[{id:"msg-1",type:"offer",sender:"customer",amount:28e3,message:"I can only pay $28,000.",timestamp:new Date(Date.now()-36e5*24)},{id:"msg-2",type:"rejected",sender:"dealer",message:"Unfortunately, we cannot accept offers below our cost. Feel free to reach out if your budget changes.",timestamp:new Date(Date.now()-36e5*12)}]},onSendCounter:e,onAcceptOffer:e,onRejectOffer:e,onSendMessage:e,onClose:e},parameters:{docs:{description:{story:"Dealer has rejected the offer. Shows declined state."}}}},c={args:{negotiation:{id:"neg-2",status:"countered",dealerName:"Beverly Hills BMW",dealerId:"dealer-2",vehicle:{year:2025,make:"BMW",model:"M5",trim:"Competition",msrp:112895},initialOffer:105e3,currentOffer:108500,messages:[{id:"msg-1",type:"offer",sender:"customer",amount:105e3,message:"Interested in the M5 Competition. Here's my offer.",timestamp:new Date(Date.now()-36e5*48)},{id:"msg-2",type:"counter",sender:"dealer",amount:108500,message:"Thank you for your interest in the M5 Competition. Given the limited availability of this model, we can offer $108,500 which includes our VIP service package.",timestamp:new Date(Date.now()-36e5*24)}],createdAt:new Date(Date.now()-36e5*48)},onSendCounter:e,onAcceptOffer:e,onRejectOffer:e,onSendMessage:e,onClose:e},parameters:{docs:{description:{story:"Negotiation for a luxury vehicle with higher price points."}}}},d={args:{negotiation:{...n,status:"countered",currentOffer:31500,messages:[...n.messages,{id:"msg-2",type:"counter",sender:"dealer",amount:31500,message:"We can meet you at $31,500.",timestamp:new Date(Date.now()-36e5)}]},onSendCounter:(t,p)=>{console.log("Counter sent:",{amount:t,message:p}),alert(`Counter offer of $${t.toLocaleString()} sent!`)},onAcceptOffer:()=>{console.log("Offer accepted"),alert("Congratulations! You accepted the offer.")},onRejectOffer:()=>{console.log("Offer rejected"),alert("You declined the negotiation.")},onSendMessage:t=>{console.log("Message sent:",t),alert(`Message sent: "${t}"`)},onClose:e},parameters:{docs:{description:{story:"Try the interactive negotiation! Accept, counter, or send messages."}}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    negotiation: baseNegotiation,
    onSendCounter: noop,
    onAcceptOffer: noop,
    onRejectOffer: noop,
    onSendMessage: noop,
    onClose: noop
  },
  parameters: {
    docs: {
      description: {
        story: 'Initial state after customer submits an offer. Waiting for dealer response.'
      }
    }
  }
}`,...o.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    negotiation: {
      ...baseNegotiation,
      status: 'countered',
      currentOffer: 31500,
      messages: [...baseNegotiation.messages, {
        id: 'msg-2',
        type: 'counter',
        sender: 'dealer',
        amount: 31500,
        message: 'Thank you for your interest! We can meet you at $31,500 which includes our loyalty discount.',
        timestamp: new Date(Date.now() - 3600000 * 2) // 2 hours ago
      }]
    },
    onSendCounter: noop,
    onAcceptOffer: noop,
    onRejectOffer: noop,
    onSendMessage: noop,
    onClose: noop
  },
  parameters: {
    docs: {
      description: {
        story: 'Dealer has responded with a counter offer. Customer can accept, counter, or decline.'
      }
    }
  }
}`,...s.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    negotiation: {
      ...baseNegotiation,
      status: 'countered',
      currentOffer: 31200,
      messages: [{
        id: 'msg-1',
        type: 'offer',
        sender: 'customer',
        amount: 30865,
        message: 'I\\'m interested in this Accord. This is my best offer.',
        timestamp: new Date(Date.now() - 3600000 * 48)
      }, {
        id: 'msg-2',
        type: 'counter',
        sender: 'dealer',
        amount: 31800,
        message: 'We appreciate your offer. The best we can do is $31,800.',
        timestamp: new Date(Date.now() - 3600000 * 24)
      }, {
        id: 'msg-3',
        type: 'counter',
        sender: 'customer',
        amount: 31000,
        message: 'Can you do $31,000? I\\'m ready to buy today.',
        timestamp: new Date(Date.now() - 3600000 * 12)
      }, {
        id: 'msg-4',
        type: 'counter',
        sender: 'dealer',
        amount: 31200,
        message: 'We can meet you at $31,200. This is our final offer and includes floor mats and first service free.',
        timestamp: new Date(Date.now() - 3600000 * 2)
      }]
    },
    onSendCounter: noop,
    onAcceptOffer: noop,
    onRejectOffer: noop,
    onSendMessage: noop,
    onClose: noop
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows multiple rounds of negotiation between customer and dealer.'
      }
    }
  }
}`,...a.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    negotiation: {
      ...baseNegotiation,
      status: 'accepted',
      currentOffer: 31200,
      messages: [{
        id: 'msg-1',
        type: 'offer',
        sender: 'customer',
        amount: 31000,
        timestamp: new Date(Date.now() - 3600000 * 24)
      }, {
        id: 'msg-2',
        type: 'counter',
        sender: 'dealer',
        amount: 31200,
        message: 'We can do $31,200 with free floor mats.',
        timestamp: new Date(Date.now() - 3600000 * 12)
      }, {
        id: 'msg-3',
        type: 'accepted',
        sender: 'customer',
        timestamp: new Date(Date.now() - 3600000)
      }]
    },
    onSendCounter: noop,
    onAcceptOffer: noop,
    onRejectOffer: noop,
    onSendMessage: noop,
    onClose: noop
  },
  parameters: {
    docs: {
      description: {
        story: 'Customer has accepted the dealer\\'s offer. Shows success state.'
      }
    }
  }
}`,...r.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    negotiation: {
      ...baseNegotiation,
      status: 'rejected',
      messages: [{
        id: 'msg-1',
        type: 'offer',
        sender: 'customer',
        amount: 28000,
        message: 'I can only pay $28,000.',
        timestamp: new Date(Date.now() - 3600000 * 24)
      }, {
        id: 'msg-2',
        type: 'rejected',
        sender: 'dealer',
        message: 'Unfortunately, we cannot accept offers below our cost. Feel free to reach out if your budget changes.',
        timestamp: new Date(Date.now() - 3600000 * 12)
      }]
    },
    onSendCounter: noop,
    onAcceptOffer: noop,
    onRejectOffer: noop,
    onSendMessage: noop,
    onClose: noop
  },
  parameters: {
    docs: {
      description: {
        story: 'Dealer has rejected the offer. Shows declined state.'
      }
    }
  }
}`,...i.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    negotiation: {
      id: 'neg-2',
      status: 'countered',
      dealerName: 'Beverly Hills BMW',
      dealerId: 'dealer-2',
      vehicle: {
        year: 2025,
        make: 'BMW',
        model: 'M5',
        trim: 'Competition',
        msrp: 112895
      },
      initialOffer: 105000,
      currentOffer: 108500,
      messages: [{
        id: 'msg-1',
        type: 'offer',
        sender: 'customer',
        amount: 105000,
        message: 'Interested in the M5 Competition. Here\\'s my offer.',
        timestamp: new Date(Date.now() - 3600000 * 48)
      }, {
        id: 'msg-2',
        type: 'counter',
        sender: 'dealer',
        amount: 108500,
        message: 'Thank you for your interest in the M5 Competition. Given the limited availability of this model, we can offer $108,500 which includes our VIP service package.',
        timestamp: new Date(Date.now() - 3600000 * 24)
      }],
      createdAt: new Date(Date.now() - 3600000 * 48)
    },
    onSendCounter: noop,
    onAcceptOffer: noop,
    onRejectOffer: noop,
    onSendMessage: noop,
    onClose: noop
  },
  parameters: {
    docs: {
      description: {
        story: 'Negotiation for a luxury vehicle with higher price points.'
      }
    }
  }
}`,...c.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    negotiation: {
      ...baseNegotiation,
      status: 'countered',
      currentOffer: 31500,
      messages: [...baseNegotiation.messages, {
        id: 'msg-2',
        type: 'counter',
        sender: 'dealer',
        amount: 31500,
        message: 'We can meet you at $31,500.',
        timestamp: new Date(Date.now() - 3600000)
      }]
    },
    onSendCounter: (amount, message) => {
      console.log('Counter sent:', {
        amount,
        message
      });
      alert(\`Counter offer of $\${amount.toLocaleString()} sent!\`);
    },
    onAcceptOffer: () => {
      console.log('Offer accepted');
      alert('Congratulations! You accepted the offer.');
    },
    onRejectOffer: () => {
      console.log('Offer rejected');
      alert('You declined the negotiation.');
    },
    onSendMessage: message => {
      console.log('Message sent:', message);
      alert(\`Message sent: "\${message}"\`);
    },
    onClose: noop
  },
  parameters: {
    docs: {
      description: {
        story: 'Try the interactive negotiation! Accept, counter, or send messages.'
      }
    }
  }
}`,...d.parameters?.docs?.source}}};const R=["PendingOffer","CounterReceived","MultipleRounds","OfferAccepted","OfferRejected","LuxuryVehicleNegotiation","InteractiveDemo"];export{s as CounterReceived,d as InteractiveDemo,c as LuxuryVehicleNegotiation,a as MultipleRounds,r as OfferAccepted,i as OfferRejected,o as PendingOffer,R as __namedExportsOrder,A as default};
