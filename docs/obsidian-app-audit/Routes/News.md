---
type: "route"
generated: "2026-06-08T13:33:34.301Z"
route: "/news"
module: "Home and Editorial"
component: "NewsPage"
---

# /news
Module: [[Modules/Home and Editorial|Home and Editorial]]
Component: `NewsPage`
Source: `src/pages/NewsPage/NewsPage.tsx`
## Audit Focus
Verify semantic article structure, editorial links, image alt text, and marketplace bridge CTAs.
## Related Flows
- [[Flows/Editorial to Shopping|Editorial to Shopping]]
## Checks
- Route loads without console errors.
- Primary CTA path is clear and keyboard accessible.
- No horizontal overflow at 390px, 768px, 1024px, and 1280px.
- Page uses shared design tokens for borders, colors, typography, and focus states.