---
type: "route"
generated: "2026-06-08T13:33:34.301Z"
route: "/sign-up"
module: "Authentication and Onboarding"
component: "SignUp"
---

# /sign-up
Module: [[Modules/Authentication and Onboarding|Authentication and Onboarding]]
Component: `SignUp`
Source: `src/pages/Onboarding/SignUp.tsx`
## Audit Focus
Verify route loads, has a recovery path, and uses shared shell behavior.
## Related Flows
- No core flow mapped yet.
## Checks
- Route loads without console errors.
- Primary CTA path is clear and keyboard accessible.
- No horizontal overflow at 390px, 768px, 1024px, and 1280px.
- Page uses shared design tokens for borders, colors, typography, and focus states.