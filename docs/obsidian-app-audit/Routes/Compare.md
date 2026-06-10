---
type: "route"
generated: "2026-06-08T13:33:34.301Z"
route: "/compare"
module: "Vehicle Discovery"
component: "ComparePage"
---

# /compare
Module: [[Modules/Vehicle Discovery|Vehicle Discovery]]
Component: `ComparePage`
Source: `src/pages/ComparePage/ComparePage.tsx`
## Audit Focus
Verify browse filters, cards, rankings, compare actions, save state, and horizontal overflow.
## Related Flows
- [[Flows/Guided Calculator to Garage|Guided Calculator to Garage]]
- [[Flows/Vehicle Research to Finance|Vehicle Research to Finance]]
- [[Flows/Editorial to Shopping|Editorial to Shopping]]
## Checks
- Route loads without console errors.
- Primary CTA path is clear and keyboard accessible.
- No horizontal overflow at 390px, 768px, 1024px, and 1280px.
- Page uses shared design tokens for borders, colors, typography, and focus states.