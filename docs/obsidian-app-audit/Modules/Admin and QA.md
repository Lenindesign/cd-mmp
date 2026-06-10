---
type: "module"
generated: "2026-06-08T13:33:34.301Z"
routes: "6"
---

# Admin and QA

Design system, audit, feedback, and internal editor routes.

## Routes

- [[Routes/Design System|/design-system]] - `DesignSystem`
- [[Routes/Admin Vehicle Ratings|/admin/vehicle-ratings]] - `VehicleRatingEditor`
- [[Routes/Admin Feedback|/admin/feedback]] - `FeedbackAdmin`
- [[Routes/Audit Cards|/audit/cards]] - `CardAudit`
- [[Routes/Audit Carousels|/audit/carousels]] - `CarouselAuditPage`
- [[Routes/Email Preview|/email-preview]] - `EmailPreviewPage`

## Related Modules

- No explicit module relationships documented yet.

## Related Flows

- No core flow mapped yet.

## Audit Risks

- Internal tools should not leak production-only assumptions into shopper flows.
- Storybook or audit routes must remain separate from production deployment decisions.
