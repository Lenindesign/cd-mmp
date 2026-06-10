---
type: "module"
generated: "2026-06-08T13:33:34.301Z"
routes: "19"
---

# Deals and Incentives

Deal hubs, lease paths, cash, finance, body-style, make, and model incentive pages.

## Routes

- [[Routes/Deals|/deals]] - `DealsHubPage`
- [[Routes/Deals Best Buying Deals|/deals/best-buying-deals]] - `ZeroAprDealsPage`
- [[Routes/Deals 0 Percent Apr|/deals/0-percent-apr]] - `ZeroAprDealsPage`
- [[Routes/Deals Cash Back|/deals/cash-back]] - `ZeroAprDealsPage`
- [[Routes/Deals Zero Apr|/deals/zero-apr]] - `Navigate`
- [[Routes/Deals Cash Finance|/deals/cash-finance]] - `Navigate`
- [[Routes/Deals Lease|/deals/lease]] - `LeaseDealsPage`
- [[Routes/Deals Lease Slug|/deals/lease/:slug]] - `LeaseCategoryDispatcher`
- [[Routes/Deals Lease Make Model|/deals/lease/:make/:model]] - `LeaseByMakeModelPage`
- [[Routes/Deals Suv|/deals/suv]] - `SuvDealsPage`
- [[Routes/Deals Truck|/deals/truck]] - `TruckDealsPage`
- [[Routes/Deals All|/deals/all]] - `AllDealsPage`
- [[Routes/Deals Fuel Type|/deals/fuel-type]] - `FuelTypeDealsPage`
- [[Routes/Deals Cash Finance Body Style|/deals/cash-finance-body-style]] - `CashFinanceBodyStylePage`
- [[Routes/Make Deals Incentives|/:make/deals-incentives]] - `DealsByMakePage`
- [[Routes/Make Model Deals Incentives|/:make/:model/deals-incentives]] - `DealsByMakeModelPage`
- [[Routes/Lease Deals|/lease-deals]] - `LeaseDealsHubPage`
- [[Routes/Make Lease Deals|/:make/lease-deals]] - `LeaseByMakePage`
- [[Routes/Make Model Lease Deals|/:make/:model/lease-deals]] - `LeaseByMakeModelPage`

## Related Modules

- [[Modules/Header and Navigation|Header and Navigation]] - inbound: deals links
- [[Modules/Vehicle Discovery|Vehicle Discovery]] - inbound: deal and ranking context
- [[Modules/Vehicle Detail|Vehicle Detail]] - inbound: incentive modules
- [[Modules/Vehicle Detail|Vehicle Detail]] - outbound: deal cards
- [[Modules/Account and Garage|Account and Garage]] - outbound: save deal vehicle

## Related Flows

- [[Flows/Vehicle Research to Finance|Vehicle Research to Finance]]
- [[Flows/Deals Discovery|Deals Discovery]]
- [[Flows/Editorial to Shopping|Editorial to Shopping]]

## Audit Risks

- Deal math, filter state, and sort behavior are high-risk and should be covered by source-level tests.
- Incentive badges must stay factual and avoid dealer-lot pressure.
