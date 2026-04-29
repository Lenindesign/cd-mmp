---
name: "Car & Driver Marketplace"
description: "Editorial car-shopping surfaces with C/D authority, clear comparisons, and low-pressure deal discovery."
colors:
  cobalt-blue: "#1B5F8A"
  cobalt-blue-dark: "#154d70"
  cobalt-blue-light: "#60A5FA"
  cd-red: "#D2232A"
  cd-red-dark: "#b31f24"
  ink-black: "#000000"
  editorial-dark: "#222222"
  gray-700: "#4a4a4a"
  gray-600: "#595959"
  gray-500: "#6b6b6b"
  gray-300: "#cdcdcd"
  gray-200: "#e5e5e5"
  gray-100: "#f5f5f5"
  gray-50: "#fafafa"
  paper-white: "#ffffff"
  c-d-gold: "#DBCA8B"
  success-green: "#26870D"
  warning-orange: "#f59e0b"
  error-red: "#ef4444"
typography:
  display:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "4rem"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "2rem"
    fontWeight: 800
    lineHeight: 1.1
  title:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 800
    lineHeight: 1.2
  body:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "Barlow Condensed, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "0.04em"
rounded:
  sm: "4px"
  md: "6px"
  lg: "8px"
  xl: "12px"
  pill: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "24px"
  2xl: "32px"
  3xl: "48px"
  4xl: "64px"
components:
  button-primary:
    backgroundColor: "{colors.cobalt-blue}"
    textColor: "{colors.paper-white}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    padding: "12px"
  button-primary-hover:
    backgroundColor: "{colors.ink-black}"
    textColor: "{colors.paper-white}"
  button-secondary:
    backgroundColor: "{colors.paper-white}"
    textColor: "{colors.cobalt-blue}"
    typography: "{typography.label}"
    rounded: "{rounded.sm}"
    padding: "8px 16px"
  search-field:
    backgroundColor: "{colors.paper-white}"
    textColor: "{colors.ink-black}"
    rounded: "{rounded.pill}"
    height: "37px"
  deal-card:
    backgroundColor: "{colors.paper-white}"
    textColor: "{colors.editorial-dark}"
    rounded: "{rounded.lg}"
    padding: "12px 16px"
  chip-active:
    backgroundColor: "{colors.editorial-dark}"
    textColor: "{colors.paper-white}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "8px 12px"
---

# Design System: Car & Driver Marketplace

## 1. Overview

**Creative North Star: "The Road Test Desk"**

The system should feel like the desk where C/D editors turn test data, pricing, rankings, and road impressions into buying guidance. It is approachable, helpful, and confident: expert enough to carry authority, clear enough to reduce decision fatigue, and restrained enough to avoid sales pressure.

The visual language is print-informed but not nostalgic. Strong black-and-white structure, C/D red and blue marks, crisp labels, image-led editorial moments, and practical marketplace controls should work together. Shopping components may be dense, but they must never feel like dealer-lot clutter.

**Key Characteristics:**
- Editorial confidence with practical shopping clarity.
- Strong hierarchy, clear labels, and comparison-first information design.
- Refined restraint in component chrome, with color used as a signal.
- Low-pressure CTAs that are useful, not shouty.
- Accessible contrast, visible focus states, and reduced-motion respect.

## 2. Colors

The palette is a magazine plate: print-like black and white structure with C/D red and blue marks reserved for navigation, action, and editorial signal.

### Primary
- **C/D Cobalt Blue**: The primary marketplace control color for CTAs, links, selected states, and active navigation. It should feel useful and direct, never decorative.
- **C/D Cobalt Dark**: Hover and pressed state for primary blue actions. Use when a control needs to feel confirmed or committed.
- **C/D Signal Red**: The official editorial mark and alert color. Use rarely for brand identity, destructive emphasis, or urgent status, not for generic excitement.

### Secondary
- **Road-Test Gold**: A restrained editorial accent for badges, ratings, and special callouts where a print-like highlight is more appropriate than blue.
- **Verified Green**: Success, availability, savings, and confirmation states. Keep it grounded and factual.

### Tertiary
- **Warning Orange**: Finance warnings, cautionary hints, or time-sensitive notices. Do not use it as promotional decoration.
- **Error Red**: Validation errors and destructive actions. Keep it separate from C/D Signal Red in intent.

### Neutral
- **Ink Black**: Primary type, masthead energy, and high-authority marks.
- **Editorial Dark**: Headers, footers, card titles, and dense text blocks where pure black would feel too hard.
- **Instrument Grays**: Gray 700 through Gray 50 carry secondary text, dividers, quiet backgrounds, and disabled states.
- **Paper White**: The default canvas. It should feel clean and editorial, not empty.

### Named Rules

**The Signal Rarity Rule.** Blue and red earn attention because they are scarce. Do not flood a screen with multiple competing accent badges, urgency labels, and CTA colors.

**The No Dealer-Lot Rule.** Countdown urgency, fake scarcity, shouty sales graphics, and stacked promotional badges are prohibited.

## 3. Typography

**Display Font:** Inter with system fallbacks.
**Body Font:** Inter with system fallbacks.
**Label Font:** Barlow Condensed with system fallbacks.
**Article Font:** Lora with Georgia fallback for long-form editorial copy.

**Character:** The current system is sans-forward and utilitarian, with condensed labels supplying C/D's editorial assertiveness. Lora is reserved for article-like reading, not marketplace controls.

### Hierarchy
- **Display** (800, 4rem to larger display sizes, 1.0 line-height): Hero vehicle names, major page titles, and editorial lead moments.
- **Headline** (800, 2rem to 3rem, 1.1 line-height): Section titles, ranking modules, and comparison headers.
- **Title** (800, 1.125rem to 1.5rem, 1.2 line-height): Cards, deal names, modal headings, and component titles.
- **Body** (400 to 500, 0.875rem to 1rem, 1.5 line-height): Explanatory copy, values, helper text, and article summaries. Keep long reading lines near 65 to 75 characters.
- **Label** (700 to 800, 0.75rem, tight line-height, tracked uppercase when short): Badges, nav categories, rating labels, CTA labels, and filter chips.

### Named Rules

**The Editor Beside You Rule.** Type should explain and prioritize. Avoid decorative type moves that make shoppers work harder to compare vehicles or deals.

**The Label Discipline Rule.** Uppercase is for short labels and controls only. Never set body copy or long explanations in all caps.

## 4. Elevation

The system uses light lift: flat structure at rest, with subtle shadows on cards, headers, floating controls, and overlays. Borders and typography do most of the structural work. Shadow should clarify interactivity or layering, not create glossy luxury-car drama.

### Shadow Vocabulary
- **Fine Lift** (`0 1px 2px rgba(0, 0, 0, 0.05)`): Search fields, small chips, and save controls.
- **Card Lift** (`0 3px 6px rgba(0, 0, 0, 0.08)`): Raised controls and default card response.
- **Editorial Overlay** (`0 8px 24px rgba(0, 0, 0, 0.12)`): Hovered deal cards, dropdowns, popovers, and modal shells.
- **Deep Overlay** (`0 16px 48px rgba(0, 0, 0, 0.16)`): Rare full-screen overlays and high-priority floating panels.

### Named Rules

**The Light-Lift Rule.** Surfaces may rise when they are interactive or layered. Static content should rely on borders, spacing, and hierarchy first.

## 5. Components

### Buttons
- **Shape:** Compact, gently rounded controls (4px to 6px radius) with confident uppercase labels.
- **Primary:** C/D Cobalt Blue background, Paper White text, bold label type, and compact padding. Primary hover may shift to Ink Black for decisive contrast.
- **Hover / Focus:** State changes should be quick and restrained, with a visible focus outline or ring. Use `150ms ease` as the default timing.
- **Secondary / Ghost:** White or transparent surfaces with cobalt or ink text. Use these for supporting actions so every button does not shout.

### Chips
- **Style:** Rounded pills with compact spacing and strong label type.
- **State:** Active chips use Editorial Dark with Paper White text. Inactive chips use Paper White, gray borders, and muted text. Counts can sit inside small tonal capsules.

### Cards / Containers
- **Corner Style:** Practical radii (6px to 8px) for deal cards, rankings, and content containers.
- **Background:** Paper White on gray or white page surfaces, with image areas using Gray 100 as the neutral load state.
- **Shadow Strategy:** Cards are mostly bordered at rest and lift on hover. Avoid heavy default shadows.
- **Border:** Gray 200 is the default card border. Blue or green borders are stateful, not decorative.
- **Internal Padding:** Compact editorial density, usually 12px to 16px inside cards and 24px to 32px for larger page sections.

### Inputs / Fields
- **Style:** White fields with gray borders, small or pill radius depending on context, and body-size text.
- **Focus:** Cobalt border shift with a light blue focus ring.
- **Error / Disabled:** Error uses Error Red with a matching soft ring. Disabled fields use Gray 100 backgrounds and muted text.

### Navigation
- **Style, typography, default/hover/active states, mobile treatment.** Navigation is masthead-like: white surface, black or dark text, uppercase labels, compact spacing, and clear hover/active states. The header can carry subtle elevation, but it should not compete with the content below.

### Deal Card

Deal cards combine editorial hierarchy with marketplace utility. Vehicle name and C/D rating should read first, images should stay decisive, and incentive information should be specific rather than promotional. Save buttons, badges, and offer tags must stay visually disciplined.

### Header Search

The search field is a primary utility affordance. It uses a pill shape, subtle border, italic placeholder, and compact icon button. It should feel like a tool, not a promotional banner.

## 6. Do's and Don'ts

### Do:
- **Do** lead with editorial confidence: make rankings, ratings, and recommendations easy to understand at a glance.
- **Do** use C/D Cobalt Blue for meaningful action, selected state, and link affordances.
- **Do** use C/D Signal Red sparingly as a brand or alert mark, not as a generic decoration.
- **Do** keep deal language factual, specific, and calm.
- **Do** preserve keyboard focus states, WCAG AA contrast, and reduced-motion respect.
- **Do** favor borders, spacing, and type hierarchy before adding heavier shadows.

### Don't:
- **Don't** use dealer-lot clutter, shouty sales graphics, countdown urgency, fake scarcity, stacked badges, or overloaded incentive panels.
- **Don't** make every CTA primary. Marketplace pages need hierarchy, not a wall of blue buttons.
- **Don't** use generic SaaS dashboards, soft app-store templates, or luxury-car cliches like black/gold gloss.
- **Don't** use side-stripe borders greater than 1px as colored accents on cards, callouts, or list items.
- **Don't** use gradient text, glassmorphism as default chrome, or decorative sparkline-like data marks.
- **Don't** let badges, offer tags, and labels crowd the vehicle image or obscure the editorial hierarchy.
