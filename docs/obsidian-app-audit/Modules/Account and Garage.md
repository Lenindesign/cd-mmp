---
type: "module"
generated: "2026-06-08T13:33:34.301Z"
routes: "1"
---

# Account and Garage

Profile, saved cars, saved estimates, budget, and My Garage sidebar.

## Routes

- [[Routes/Account|/account]] - `MyAccount`

## Related Modules

- [[Modules/Header and Navigation|Header and Navigation]] - inbound: garage entry
- [[Modules/Vehicle Detail|Vehicle Detail]] - inbound: save vehicle
- [[Modules/Deals and Incentives|Deals and Incentives]] - inbound: save deal vehicle
- [[Modules/Finance and Calculator|Finance and Calculator]] - inbound: saved estimates
- [[Modules/Vehicle Detail|Vehicle Detail]] - outbound: saved cars
- [[Modules/Finance and Calculator|Finance and Calculator]] - outbound: open saved estimate
- [[Modules/Authentication and Onboarding|Authentication and Onboarding]] - inbound: account identity

## Related Flows

- [[Flows/Guided Calculator to Garage|Guided Calculator to Garage]]
- [[Flows/Deals Discovery|Deals Discovery]]
- [[Flows/Trade-In to Budget|Trade-In to Budget]]

## Audit Risks

- Saved estimate and saved vehicle controls need one consistent bookmark pattern.
- Garage sidebar tabs and close controls need accessible labels and predictable focus return.
