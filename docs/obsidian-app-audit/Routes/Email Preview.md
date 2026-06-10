---
type: "route"
generated: "2026-06-08T13:33:34.301Z"
route: "/email-preview"
module: "Admin and QA"
component: "EmailPreviewPage"
---

# /email-preview
Module: [[Modules/Admin and QA|Admin and QA]]
Component: `EmailPreviewPage`
Source: `src/pages/EmailPreviewPage/EmailPreviewPage.tsx`
## Audit Focus
Verify route loads, has a recovery path, and uses shared shell behavior.
## Related Flows
- No core flow mapped yet.
## Checks
- Route loads without console errors.
- Primary CTA path is clear and keyboard accessible.
- No horizontal overflow at 390px, 768px, 1024px, and 1280px.
- Page uses shared design tokens for borders, colors, typography, and focus states.