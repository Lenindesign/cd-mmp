---
type: "module"
generated: "2026-06-08T13:33:34.301Z"
routes: "10"
---

# Vehicle Discovery

Browse, brand, ranking, and compare routes where shoppers narrow the vehicle set.

## Routes

- [[Routes/Vehicles|/vehicles]] - `VehiclesListPage`
- [[Routes/Browse|/browse]] - `VehiclesListPage`
- [[Routes/Used Cars|/used-cars]] - `Navigate`
- [[Routes/Brands Toyota|/brands/toyota]] - `ToyotaBrandPage`
- [[Routes/Brands Honda|/brands/honda]] - `HondaBrandPage`
- [[Routes/Brands Brandslug|/brands/:brandSlug]] - `BrandHubRoutePage`
- [[Routes/Rankings|/rankings]] - `RankingsPage`
- [[Routes/Rankings Bodystyle|/rankings/:bodyStyle]] - `RankingsPage`
- [[Routes/Rankings Bodystyle Subcategory|/rankings/:bodyStyle/:subcategory]] - `RankingsPage`
- [[Routes/Compare|/compare]] - `ComparePage`

## Related Modules

- [[Modules/Header and Navigation|Header and Navigation]] - inbound: browse links
- [[Modules/Home and Editorial|Home and Editorial]] - inbound: article and list links
- [[Modules/Vehicle Detail|Vehicle Detail]] - outbound: vehicle cards
- [[Modules/Deals and Incentives|Deals and Incentives]] - outbound: deal and ranking context
- [[Modules/Finance and Calculator|Finance and Calculator]] - inbound: cars in budget

## Related Flows

- [[Flows/Guided Calculator to Garage|Guided Calculator to Garage]]
- [[Flows/Vehicle Research to Finance|Vehicle Research to Finance]]
- [[Flows/Editorial to Shopping|Editorial to Shopping]]

## Audit Risks

- Vehicle cards need consistent image missing states and save behavior.
- Filter, compare, and ranking controls need keyboard parity on mobile and desktop.
