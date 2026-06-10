---
type: "route"
generated: "2026-06-08T13:33:34.301Z"
route: "/onboarding/step-1"
module: "Authentication and Onboarding"
component: "OnboardingStep1"
---

# /onboarding/step-1
Module: [[Modules/Authentication and Onboarding|Authentication and Onboarding]]
Component: `OnboardingStep1`
Source: `src/pages/Onboarding/OnboardingStep2.tsx`
## Audit Focus
Verify route loads, has a recovery path, and uses shared shell behavior.
## Related Flows
- No core flow mapped yet.
## Checks
- Route loads without console errors.
- Primary CTA path is clear and keyboard accessible.
- No horizontal overflow at 390px, 768px, 1024px, and 1280px.
- Page uses shared design tokens for borders, colors, typography, and focus states.