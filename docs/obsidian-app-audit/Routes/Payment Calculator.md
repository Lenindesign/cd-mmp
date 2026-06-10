---
type: "route"
generated: "2026-06-08T13:33:34.301Z"
route: "/payment-calculator"
module: "Finance and Calculator"
component: "FinancingPage"
---

# /payment-calculator
Module: [[Modules/Finance and Calculator|Finance and Calculator]]
Component: `FinancingPage`
Source: `src/pages/FinancingPage/FinancingPage.tsx`
## Audit Focus
Verify finance math, keyboard flow, responsive result stack, reduced motion, and save or email actions.
## Related Flows
- [[Flows/Guided Calculator to Garage|Guided Calculator to Garage]]
- [[Flows/Vehicle Research to Finance|Vehicle Research to Finance]]
- [[Flows/Trade-In to Budget|Trade-In to Budget]]
## Checks
- Route loads without console errors.
- Primary CTA path is clear and keyboard accessible.
- No horizontal overflow at 390px, 768px, 1024px, and 1280px.
- Page uses shared design tokens for borders, colors, typography, and focus states.