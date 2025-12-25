import{V as a}from"./VehicleOverview-CsG3MQvS.js";import"./iframe-BDwDJx5t.js";import"./preload-helper-PPVm8Dsz.js";import"./clock-D1IzEPd1.js";import"./createLucideIcon-nvcdPmaH.js";import"./bookmark-VCnPOlGQ.js";import"./share-2-UE5KNl74.js";const m={title:"Organisms/VehicleOverview",component:a,parameters:{layout:"padded",docs:{description:{component:`
# Vehicle Overview

## Overview

The editorial heart of the VDP. Expert analysis that differentiates us from dealer sites and builds trust.

---

## Business Purpose

| Goal | How It Achieves It |
|------|-------------------|
| Authority | Expert editorial content |
| SEO Value | Unique, quality content |
| Trust Building | Honest pros/cons |
| Decision Support | Clear verdict helps users decide |

---

## Key Metrics

- **Read Depth** — How much content users consume
- **Time on Section** — Engagement duration
- **Scroll Behavior** — Do users read highs/lows?
- **SEO Performance** — Organic traffic to VDPs

---

## Content Sections

| Section | Purpose | SEO Value |
|---------|---------|-----------|
| Summary | Quick overview | High - answers search intent |
| Highs | What's good | Medium - feature keywords |
| Lows | What's not | Medium - honest assessment |
| What's New | Model year changes | High - "2025 changes" queries |
| Verdict | Expert recommendation | High - decision keywords |

---

## Author Attribution

| Element | Purpose |
|---------|---------|
| Author Name | Credibility signal |
| Author Title | Authority indicator |
| Published Date | Freshness signal |
| Updated Date | Content maintained |
| Reading Time | User expectation setting |

---

## Product Considerations

**Content Strategy**
- Unique editorial voice
- Regular updates for accuracy
- Model year refresh cycle

**SEO Priorities**
- Target "2025 [Make Model] review"
- Structured data for rich snippets
- Fresh content signals

**Editorial Process**
- Expert review required
- Fact-checking for accuracy
- Regular content audits

**User Research Insights**
- Users want honest pros/cons
- Verdict is highly valued
- "What's New" drives traffic
        `}}},tags:["autodocs"],argTypes:{year:{description:"Model year of the vehicle",control:{type:"number",min:2020,max:2030},table:{type:{summary:"number"},category:"Vehicle"}},author:{description:"Name of the review author",control:"text",table:{type:{summary:"string"},category:"Author"}},authorTitle:{description:"Job title of the author",control:"text",table:{type:{summary:"string"},category:"Author"}},content:{description:"Main review content/summary",control:"text",table:{type:{summary:"string"},category:"Content"}},highs:{description:"Array of positive attributes",control:"object",table:{type:{summary:"string[]"},category:"Content"}},lows:{description:"Array of negative attributes",control:"object",table:{type:{summary:"string[]"},category:"Content"}},whatsNew:{description:"Array of changes for the model year",control:"object",table:{type:{summary:"string[]"},category:"Content"}},verdict:{description:"Final expert recommendation",control:"text",table:{type:{summary:"string"},category:"Content"}},publishedDate:{description:"Original publication date",control:"text",table:{type:{summary:"string"},category:"Metadata"}},updatedDate:{description:"Last update date (if different from published)",control:"text",table:{type:{summary:"string"},category:"Metadata"}},readingTime:{description:"Estimated reading time in minutes",control:{type:"number",min:1,max:30},table:{type:{summary:"number"},category:"Metadata"}}}},e={args:{year:2025,author:"Car and Driver Staff",authorTitle:"Automotive Editor",publishedDate:"January 15, 2025",readingTime:8},parameters:{docs:{description:{story:"Default overview with basic author information and metadata."}}}},t={args:{year:2025,author:"John Smith",authorTitle:"Senior Automotive Editor",content:"The Chevrolet Trax continues to be one of the best values in the subcompact SUV segment. Its combination of modern features, spacious interior, and affordable pricing make it an excellent choice for first-time buyers and urban commuters alike.",highs:["Excellent value for money","Spacious interior for the class","Modern infotainment system","Good fuel economy"],lows:["Base engine lacks power","Some cheap interior materials","Limited cargo space"],verdict:"The 2025 Chevrolet Trax remains a top choice in the subcompact SUV segment, offering exceptional value and modern features.",publishedDate:"March 10, 2025",updatedDate:"March 15, 2025",readingTime:10},parameters:{docs:{description:{story:"Full overview with custom content, highs/lows lists, verdict, and update date."}}}},r={args:{year:2025,author:"Editorial Team",whatsNew:["Updated front fascia with new grille design","Enhanced Chevrolet Infotainment 3 system","New color options available","Improved safety features as standard"],publishedDate:"February 1, 2025",readingTime:6},parameters:{docs:{description:{story:"Overview highlighting what's new for the model year - useful for refreshed or updated vehicles."}}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    year: 2025,
    author: 'Car and Driver Staff',
    authorTitle: 'Automotive Editor',
    publishedDate: 'January 15, 2025',
    readingTime: 8
  },
  parameters: {
    docs: {
      description: {
        story: 'Default overview with basic author information and metadata.'
      }
    }
  }
}`,...e.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    year: 2025,
    author: 'John Smith',
    authorTitle: 'Senior Automotive Editor',
    content: 'The Chevrolet Trax continues to be one of the best values in the subcompact SUV segment. Its combination of modern features, spacious interior, and affordable pricing make it an excellent choice for first-time buyers and urban commuters alike.',
    highs: ['Excellent value for money', 'Spacious interior for the class', 'Modern infotainment system', 'Good fuel economy'],
    lows: ['Base engine lacks power', 'Some cheap interior materials', 'Limited cargo space'],
    verdict: 'The 2025 Chevrolet Trax remains a top choice in the subcompact SUV segment, offering exceptional value and modern features.',
    publishedDate: 'March 10, 2025',
    updatedDate: 'March 15, 2025',
    readingTime: 10
  },
  parameters: {
    docs: {
      description: {
        story: 'Full overview with custom content, highs/lows lists, verdict, and update date.'
      }
    }
  }
}`,...t.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    year: 2025,
    author: 'Editorial Team',
    whatsNew: ['Updated front fascia with new grille design', 'Enhanced Chevrolet Infotainment 3 system', 'New color options available', 'Improved safety features as standard'],
    publishedDate: 'February 1, 2025',
    readingTime: 6
  },
  parameters: {
    docs: {
      description: {
        story: 'Overview highlighting what\\'s new for the model year - useful for refreshed or updated vehicles.'
      }
    }
  }
}`,...r.parameters?.docs?.source}}};const l=["Default","CustomContent","WithWhatsNew"];export{t as CustomContent,e as Default,r as WithWhatsNew,l as __namedExportsOrder,m as default};
