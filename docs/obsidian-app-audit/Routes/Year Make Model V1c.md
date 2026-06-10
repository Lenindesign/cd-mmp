---
type: "route"
generated: "2026-06-08T13:33:34.301Z"
route: "/:year/:make/:model/v1c"
module: "Vehicle Detail"
component: "VehiclePageVariantC"
---

# /:year/:make/:model/v1c
Module: [[Modules/Vehicle Detail|Vehicle Detail]]
Component: `VehiclePageVariantC`
Source: `src/pages/VehiclePage/VehiclePageVariantC.tsx`
## Audit Focus
Verify hero, trims, payment calculator, deals, specs, ads, image fallback, and marketplace CTA paths.
## Related Flows
- [[Flows/Vehicle Research to Finance|Vehicle Research to Finance]]
- [[Flows/Deals Discovery|Deals Discovery]]
- [[Flows/Editorial to Shopping|Editorial to Shopping]]
## Checks
- Route loads without console errors.
- Primary CTA path is clear and keyboard accessible.
- No horizontal overflow at 390px, 768px, 1024px, and 1280px.
- Page uses shared design tokens for borders, colors, typography, and focus states.