---
type: "route"
generated: "2026-06-08T13:33:34.301Z"
route: "/deals/lease"
module: "Deals and Incentives"
component: "LeaseDealsPage"
---

# /deals/lease
Module: [[Modules/Deals and Incentives|Deals and Incentives]]
Component: `LeaseDealsPage`
Source: `src/pages/LeaseDealsPage/LeaseDealsPage.tsx`
## Audit Focus
Verify filters, deal cards, incentive detail actions, save state, route canonicalization, and image fallback.
## Related Flows
- [[Flows/Vehicle Research to Finance|Vehicle Research to Finance]]
- [[Flows/Deals Discovery|Deals Discovery]]
- [[Flows/Editorial to Shopping|Editorial to Shopping]]
## Checks
- Route loads without console errors.
- Primary CTA path is clear and keyboard accessible.
- No horizontal overflow at 390px, 768px, 1024px, and 1280px.
- Page uses shared design tokens for borders, colors, typography, and focus states.