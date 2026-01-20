import{j as e,r as p}from"./iframe-jrgaLZXw.js";import{E as s}from"./ExitIntentModal-B8XYd6T1.js";import"./preload-helper-PPVm8Dsz.js";import"./x-B5ESfiSU.js";import"./createLucideIcon-Cc-7UfB-.js";import"./heart-BnlQX942.js";import"./trending-down-B5IYdS4b.js";import"./file-text-hUBECtHz.js";const{fn:m}=__STORYBOOK_MODULE_TEST__,S={title:"Organisms/ExitIntentModal",component:s,parameters:{layout:"fullscreen",docs:{description:{component:`
# Exit Intent Modal

## Overview

A conversion recovery tool that captures users who are about to leave the site. Displays when the cursor moves toward the browser's close/back buttons.

---

## Business Purpose

| Goal | How It Achieves It |
|------|-------------------|
| Lead Capture | Email collection before user leaves |
| Account Creation | Frictionless signup via social login |
| Research Retention | "Save your research" value proposition |
| Re-engagement | Email list for future marketing |

---

## Key Metrics

| Metric | Target | Description |
|--------|--------|-------------|
| Display Rate | 15-25% | Percentage of sessions that see modal |
| Conversion Rate | 3-8% | Percentage of modal views to email capture |
| Social Signup Rate | 1-3% | Percentage using Apple/Google |
| Close Rate | <70% | Users closing without action |

---

## Trigger Behavior

| Condition | Behavior |
|-----------|----------|
| Delay | 3 seconds after page load |
| Trigger | Cursor moves above viewport (exit intent) |
| Frequency | Once per session (sessionStorage) |
| Mobile | Not triggered (no cursor tracking) |

---

## Animation Styles

| Style | Use Case | Effect |
|-------|----------|--------|
| default | Standard experience | Simple fade + scale |
| elegant | Premium feel | Staggered reveals, vehicle watermark |

---

## Modal Content

| Section | Purpose |
|---------|---------|
| Left Panel | Value proposition, floating cards, stats |
| Right Panel | Email form, social login, terms |
| Floating Cards | Show saved vehicle, price alerts, articles |
| Stats | Social proof (2.3M+ members, etc.) |

---

## Product Considerations

**A/B Testing Opportunities**
- Headline variations ("Don't lose your research" vs "Save your progress")
- Value prop messaging
- Animation style impact on conversion
- Social login button order

**Personalization**
- Show the actual vehicle user was viewing
- Customize based on user journey stage
- Different messaging for new vs returning users

**Compliance**
- GDPR/CCPA consent requirements
- Terms and Privacy links required
- Email validation before submission

**Mobile Strategy**
- Exit intent doesn't work on mobile
- Consider scroll-based or time-based triggers
- Or skip modal entirely on mobile

**Success Criteria**
- Email list growth rate
- Account creation rate
- Return visit rate for captured emails
        `},story:{inline:!1,iframeHeight:700}}},tags:["autodocs"],argTypes:{vehicleName:{description:"Name of the vehicle user was viewing (shown in floating card)",control:"text",table:{type:{summary:"string"},defaultValue:{summary:"2025 Kia Telluride EX"},category:"Content"}},isOpen:{description:"Manually control modal visibility (bypasses exit intent detection)",control:"boolean",table:{type:{summary:"boolean"},defaultValue:{summary:"false"},category:"State"}},onClose:{description:"Callback when modal is closed",table:{type:{summary:"() => void"},category:"Events"}},animationStyle:{description:"Animation variant for modal entrance",control:"radio",options:["default","elegant"],table:{type:{summary:"'default' | 'elegant'"},defaultValue:{summary:"default"},category:"Animation"}}},args:{onClose:m()}},n=({vehicleName:l,animationStyle:c})=>{const[d,i]=p.useState(!1);return e.jsxs("div",{style:{padding:"40px",minHeight:"400px"},children:[e.jsx("button",{onClick:()=>i(!0),style:{padding:"12px 24px",background:"#0061af",color:"white",border:"none",borderRadius:"4px",fontSize:"14px",fontWeight:"600",cursor:"pointer",textTransform:"uppercase",letterSpacing:"0.5px"},children:"Open Exit Intent Modal"}),e.jsx(s,{isOpen:d,onClose:()=>i(!1),vehicleName:l,animationStyle:c})]})},a={render:()=>e.jsx(n,{}),parameters:{layout:"fullscreen",docs:{description:{story:"Default modal with standard animation. Click the button to trigger the modal."},story:{inline:!1,iframeHeight:700}}}},t={render:()=>e.jsx(n,{vehicleName:"2026 Toyota Corolla XSE"}),parameters:{layout:"fullscreen",docs:{description:{story:"Modal displaying a specific vehicle name in the floating card, providing context about what the user was researching."},story:{inline:!1,iframeHeight:700}}}},r={args:{isOpen:!0,vehicleName:"2024 Honda CR-V EX-L",onClose:()=>console.log("Modal closed")},parameters:{layout:"fullscreen",docs:{description:{story:"Modal in always-open state for testing and documentation purposes. Use `isOpen` prop for manual control."},story:{inline:!1,iframeHeight:700}}}},o={render:()=>e.jsx(n,{vehicleName:"2025 Chevrolet Trax 1RS",animationStyle:"elegant"}),parameters:{layout:"fullscreen",docs:{description:{story:`
**Elegant Animation Variant**

Premium animation style featuring:
- Staggered content reveals with spring easing
- Graceful card cascade with bounce effect
- Vehicle watermark background on visual panel
- Refined hover states with elevation shadows
- Apple-style cubic-bezier timing curves
        `},story:{inline:!1,iframeHeight:700}}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: () => <ModalWrapper />,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Default modal with standard animation. Click the button to trigger the modal.'
      },
      story: {
        inline: false,
        iframeHeight: 700
      }
    }
  }
}`,...a.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  render: () => <ModalWrapper vehicleName="2026 Toyota Corolla XSE" />,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Modal displaying a specific vehicle name in the floating card, providing context about what the user was researching.'
      },
      story: {
        inline: false,
        iframeHeight: 700
      }
    }
  }
}`,...t.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    isOpen: true,
    vehicleName: '2024 Honda CR-V EX-L',
    onClose: () => console.log('Modal closed')
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Modal in always-open state for testing and documentation purposes. Use \`isOpen\` prop for manual control.'
      },
      story: {
        inline: false,
        iframeHeight: 700
      }
    }
  }
}`,...r.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => <ModalWrapper vehicleName="2025 Chevrolet Trax 1RS" animationStyle="elegant" />,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: \`
**Elegant Animation Variant**

Premium animation style featuring:
- Staggered content reveals with spring easing
- Graceful card cascade with bounce effect
- Vehicle watermark background on visual panel
- Refined hover states with elevation shadows
- Apple-style cubic-bezier timing curves
        \`
      },
      story: {
        inline: false,
        iframeHeight: 700
      }
    }
  }
}`,...o.parameters?.docs?.source}}};const x=["Default","WithVehicleName","AlwaysOpen","ElegantAnimation"];export{r as AlwaysOpen,a as Default,o as ElegantAnimation,t as WithVehicleName,x as __namedExportsOrder,S as default};
