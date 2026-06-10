---
type: "route"
generated: "2026-06-08T13:33:34.301Z"
route: "/account"
module: "Account and Garage"
component: "MyAccount"
---

# /account
Module: [[Modules/Account and Garage|Account and Garage]]
Component: `MyAccount`
Source: `src/pages/Account/MyAccount.tsx`
## Audit Focus
Verify saved vehicle, saved estimate, budget, sidebar tabs, focus return, and remove actions.
## Related Flows
- [[Flows/Guided Calculator to Garage|Guided Calculator to Garage]]
- [[Flows/Deals Discovery|Deals Discovery]]
- [[Flows/Trade-In to Budget|Trade-In to Budget]]
## Checks
- Route loads without console errors.
- Primary CTA path is clear and keyboard accessible.
- No horizontal overflow at 390px, 768px, 1024px, and 1280px.
- Page uses shared design tokens for borders, colors, typography, and focus states.