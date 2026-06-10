---
type: "route"
generated: "2026-06-08T13:33:34.301Z"
route: "/trade-in-value/results"
module: "Trade In Valuation"
component: "WhatsMyCarWorthResultsPage"
---

# /trade-in-value/results
Module: [[Modules/Trade In Valuation|Trade In Valuation]]
Component: `WhatsMyCarWorthResultsPage`
Source: `src/pages/WhatsMyCarWorthResultsPage/WhatsMyCarWorthResultsPage.tsx`
## Audit Focus
Verify form labels, VIN or value states, trade credit handoff, and errors.
## Related Flows
- [[Flows/Trade-In to Budget|Trade-In to Budget]]
## Checks
- Route loads without console errors.
- Primary CTA path is clear and keyboard accessible.
- No horizontal overflow at 390px, 768px, 1024px, and 1280px.
- Page uses shared design tokens for borders, colors, typography, and focus states.