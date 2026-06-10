---
type: "route"
generated: "2026-06-08T13:33:34.301Z"
route: "/article/:slug"
module: "Home and Editorial"
component: "ArticlePage"
---

# /article/:slug
Module: [[Modules/Home and Editorial|Home and Editorial]]
Component: `ArticlePage`
Source: `src/pages/ArticlePage/ArticlePage.tsx`
## Audit Focus
Verify semantic article structure, editorial links, image alt text, and marketplace bridge CTAs.
## Related Flows
- [[Flows/Editorial to Shopping|Editorial to Shopping]]
## Checks
- Route loads without console errors.
- Primary CTA path is clear and keyboard accessible.
- No horizontal overflow at 390px, 768px, 1024px, and 1280px.
- Page uses shared design tokens for borders, colors, typography, and focus states.