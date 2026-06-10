---
type: "module"
generated: "2026-06-08T13:33:34.301Z"
routes: "23"
---

# Vehicle Detail

Year, make, model pages and their marketplace CTA variants.

## Routes

- [[Routes/Year Make Model|/:year/:make/:model]] - `VehiclePage`
- [[Routes/Year Make Model V1|/:year/:make/:model/v1]] - `VehiclePageVariant`
- [[Routes/Year Make Model V2|/:year/:make/:model/v2]] - `VehiclePageVariant`
- [[Routes/Year Make Model V3|/:year/:make/:model/v3]] - `VehiclePageVariant`
- [[Routes/Year Make Model V4|/:year/:make/:model/v4]] - `VehiclePageVariant`
- [[Routes/Year Make Model V5|/:year/:make/:model/v5]] - `VehiclePageVariant`
- [[Routes/Year Make Model V10|/:year/:make/:model/v10]] - `VehiclePageVariant`
- [[Routes/Year Make Model V1b|/:year/:make/:model/v1b]] - `VehiclePageVariantB`
- [[Routes/Year Make Model V2b|/:year/:make/:model/v2b]] - `VehiclePageVariantB`
- [[Routes/Year Make Model V3b|/:year/:make/:model/v3b]] - `VehiclePageVariantB`
- [[Routes/Year Make Model V4b|/:year/:make/:model/v4b]] - `VehiclePageVariantB`
- [[Routes/Year Make Model V5b|/:year/:make/:model/v5b]] - `VehiclePageVariantB`
- [[Routes/Year Make Model V1c|/:year/:make/:model/v1c]] - `VehiclePageVariantC`
- [[Routes/Year Make Model V2c|/:year/:make/:model/v2c]] - `VehiclePageVariantC`
- [[Routes/Year Make Model V3c|/:year/:make/:model/v3c]] - `VehiclePageVariantC`
- [[Routes/Year Make Model V4c|/:year/:make/:model/v4c]] - `VehiclePageVariantC`
- [[Routes/Year Make Model V5c|/:year/:make/:model/v5c]] - `VehiclePageVariantC`
- [[Routes/Year Make Model V1d|/:year/:make/:model/v1d]] - `VehiclePageVariantD`
- [[Routes/Year Make Model V2d|/:year/:make/:model/v2d]] - `VehiclePageVariantD`
- [[Routes/Year Make Model V3d|/:year/:make/:model/v3d]] - `VehiclePageVariantD`
- [[Routes/Year Make Model V4d|/:year/:make/:model/v4d]] - `VehiclePageVariantD`
- [[Routes/Year Make Model V5d|/:year/:make/:model/v5d]] - `VehiclePageVariantD`
- [[Routes/Year Make Model Concept|/:year/:make/:model/concept]] - `VehiclePageConcept`

## Related Modules

- [[Modules/Vehicle Discovery|Vehicle Discovery]] - inbound: vehicle cards
- [[Modules/Finance and Calculator|Finance and Calculator]] - outbound: payment module
- [[Modules/Deals and Incentives|Deals and Incentives]] - outbound: incentive modules
- [[Modules/Trade In Valuation|Trade In Valuation]] - outbound: trade-in CTA
- [[Modules/Account and Garage|Account and Garage]] - outbound: save vehicle
- [[Modules/Deals and Incentives|Deals and Incentives]] - inbound: deal cards
- [[Modules/Finance and Calculator|Finance and Calculator]] - inbound: selected vehicle estimate
- [[Modules/Account and Garage|Account and Garage]] - inbound: saved cars

## Related Flows

- [[Flows/Vehicle Research to Finance|Vehicle Research to Finance]]
- [[Flows/Deals Discovery|Deals Discovery]]
- [[Flows/Editorial to Shopping|Editorial to Shopping]]

## Audit Risks

- Payment, deals, trims, specs, and inventory sections must stay internally consistent.
- A/B routes should not drift from shared component behavior.
