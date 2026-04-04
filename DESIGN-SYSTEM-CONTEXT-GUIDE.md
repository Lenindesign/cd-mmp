# Building a Design System Context Layer for AI-Assisted Development

*A practical framework for designers and design technologists using Cursor (or any LLM-powered code editor)*

---

## The Problem

When an AI assistant generates UI code, it has no awareness of your design system — your tokens, naming conventions, component inventory, or layout rules. Every prompt starts from zero, producing inconsistent output that needs manual correction. This creates a gap between design intent and code output that grows with every session.

## The Solution

A structured set of context files that live inside your project repository. These files are automatically loaded by the AI based on what file you're editing, ensuring it always has your design system in mind — without you needing to repeat yourself.

---

## The 6 Files

### 1. Design Tokens Rule — `.cursor/rules/design-tokens.mdc`

**Auto-loads when editing CSS, TSX, or TS files.**

This is the single source of truth for every visual primitive in your system. Document:

- **Colors** — Every color variable with its hex value, organized by category (brand, semantic, neutral scale, UI states). Include aliases if you have them.
- **Typography** — Font families (heading, body, mono, accent), the full size scale with variable names and pixel values, weight tokens, line-height tokens.
- **Spacing** — Your base unit and every step in the scale (e.g., `spacing-1` through `spacing-20` on an 8px base).
- **Border radius** — From small (pills, badges) through large (cards) to full (circles).
- **Shadows** — Each elevation level with its exact `box-shadow` value.
- **Transitions** — Named timing tokens (fast, normal, slow) with their duration values.

Format it as a simple reference table. The AI needs to look up a variable name and get its value instantly.

> **Why it matters:** Without this, the AI will hardcode `#1B5F8A` instead of using `var(--color-blue-cobalt)`, or guess at spacing values. With it, every generated line of CSS uses your exact system.

---

### 2. Component Patterns Rule — `.cursor/rules/component-patterns.mdc`

**Auto-loads when editing component or page files.**

This encodes how your team builds components. Document:

- **Naming convention** — Your CSS methodology (BEM, utility-first, CSS Modules, etc.) with concrete examples of how class names are formed.
- **File structure** — What files each component has (TSX, CSS, stories, tests, index) and how the directory is organized.
- **Component inventory** — A categorized list of every existing component. This prevents the AI from reinventing what already exists.
- **State management patterns** — How you handle state (Context, hooks, services) and where each pattern is used.
- **Routing structure** — Your route hierarchy so the AI can wire new pages correctly.
- **New component checklist** — A point-by-point list of requirements (accessibility, responsive behavior, token usage, etc.) that every new component must satisfy.

> **Why it matters:** This is the difference between the AI generating a one-off `<div class="card-wrapper">` and generating a properly structured `<div class="vehicle-card__body">` that follows your conventions and reuses your existing components.

---

### 3. Layout System Rule — `.cursor/rules/layout-system.mdc`

**Auto-loads when editing CSS or TSX files.**

This defines the spatial framework of your application. Document:

- **Container system** — Max widths, padding, and any container variants (narrow, wide, full-bleed).
- **Grid patterns** — Common grid configurations you use (2-col, 3-col, 4-col, sidebar + content).
- **Breakpoints** — Every breakpoint with its pixel value and what layout changes occur at each.
- **Z-index scale** — Named layers (base, sticky, dropdown, modal, toast) with their values, preventing z-index wars.
- **Sticky/fixed patterns** — How headers, toolbars, and floating elements behave.
- **Responsive rules** — Your mobile-first or desktop-first approach and common responsive patterns (stack, collapse, scroll).

> **Why it matters:** Layout bugs are the most common AI-generated issue. This file eliminates "why does the modal appear behind the header" and "why does this break at tablet width" problems.

---

### 4. Machine-Readable Tokens — `design-tokens.json`

**Available for tooling, Figma plugins, and programmatic access.**

A structured JSON file following the [Design Tokens Community Group](https://design-tokens.github.io/community-group/format/) format. Every token from file #1, but in a schema that tools can consume:

```json
{
  "color": {
    "brand": {
      "primary": {
        "$value": "#1B5F8A",
        "$type": "color",
        "$description": "Primary brand blue"
      }
    }
  },
  "spacing": {
    "1": { "$value": "4px", "$type": "dimension" },
    "2": { "$value": "8px", "$type": "dimension" }
  }
}
```

> **Why it matters:** This bridges design tools and code. It can feed Figma variables, Storybook theming, style-dictionary builds, or any automation that needs your tokens in a structured format. It's also the format the AI prefers when it needs to look up tokens programmatically.

---

### 5. Design System Skill — `.cursor/skills/design-system/SKILL.md`

**Loaded on demand when doing UI work.**

This is the comprehensive quick-reference — a "cheat sheet" the AI can pull up when building UI. Include:

- **Brand identity summary** — Name, tagline, tech stack, one-line description.
- **Token tables** — Condensed versions of color, typography, and spacing for quick lookup.
- **Reusable code patterns** — Copy-paste snippets for your most common patterns (card layouts, CTA buttons, pill badges, section headers, grid structures).
- **UI code review checklist** — The final quality gate: Does it use tokens? Is it responsive? Does it follow BEM? Is it accessible? Does it reuse existing components?

> **Why it matters:** Rules auto-load passively. Skills are loaded when you need deep context for a specific task — like building a new page or auditing existing components. It's the difference between ambient awareness and focused expertise.

---

### 6. Root Configuration — `.cursorrules`

**Loaded on every interaction.**

Update your root rules file to:

- Reference all the above files so the AI knows they exist from the first message.
- Summarize key principles (e.g., "Always use CSS custom properties, never hardcode values").
- Include any project-specific constraints (deployment rules, naming requirements, etc.).

This is the entry point — the AI reads this first and knows where to find everything else.

---

## How to Build Your Own

| Step | Action | Time |
|------|--------|------|
| 1 | **Audit your existing system.** Open your global CSS or tokens file and catalog every variable. List every component. Document your breakpoints. | 1–2 hours |
| 2 | **Start with the tokens rule (#1).** This has the highest immediate impact. Every AI interaction that touches styling will improve. | 30 min |
| 3 | **Add component patterns (#2) next.** Once the AI knows your naming and structure conventions, new components will match your existing codebase. | 45 min |
| 4 | **Build the rest incrementally.** The layout system, JSON tokens, skill file, and root config can be added as you encounter gaps. | Ongoing |
| 5 | **Keep them current.** When you add a new token, component, or breakpoint, update the corresponding file. These are living documents. | 5 min per update |

---

## The Result

**Before** the context layer, every AI interaction requires you to specify "use our color variables" or "follow BEM naming" or "make it responsive at 768px."

**After** it, the AI generates code that looks like your team wrote it — using your tokens, following your conventions, and fitting your layout system — from the first prompt.

The investment is a few hours of documentation. The return is every subsequent AI interaction producing higher-fidelity output, fewer corrections, and faster iteration.

---

## File Structure Reference

```
your-project/
├── .cursorrules                              ← Entry point (always loaded)
├── .cursor/
│   ├── rules/
│   │   ├── design-tokens.mdc                 ← Auto-loads on CSS/TSX/TS
│   │   ├── component-patterns.mdc            ← Auto-loads on component files
│   │   └── layout-system.mdc                 ← Auto-loads on CSS/TSX
│   └── skills/
│       └── design-system/
│           └── SKILL.md                      ← On-demand deep reference
├── design-tokens.json                        ← Machine-readable tokens
└── DESIGN-SYSTEM-CONTEXT-GUIDE.md            ← This document
```

---

*This framework was developed and validated on the MotorTrend Marketplace project — a React/TypeScript application with 50+ components, 100+ design tokens, and a full Storybook design system.*

*Author: Lenin Aviles, UX Director — Hearst Magazines*
