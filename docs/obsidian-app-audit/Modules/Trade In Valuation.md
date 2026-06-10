---
type: "module"
generated: "2026-06-08T13:33:34.301Z"
routes: "4"
---

# Trade In Valuation

What is my car worth and trade-in result routes.

## Routes

- [[Routes/Whats My Car Worth|/whats-my-car-worth]] - `WhatsMyCarWorthPage`
- [[Routes/Whats My Car Worth Results|/whats-my-car-worth/results]] - `WhatsMyCarWorthResultsPage`
- [[Routes/Trade In Value|/trade-in-value]] - `WhatsMyCarWorthPage`
- [[Routes/Trade In Value Results|/trade-in-value/results]] - `WhatsMyCarWorthResultsPage`

## Related Modules

- [[Modules/Vehicle Detail|Vehicle Detail]] - inbound: trade-in CTA
- [[Modules/Finance and Calculator|Finance and Calculator]] - outbound: trade credit

## Related Flows

- [[Flows/Trade-In to Budget|Trade-In to Budget]]

## Audit Risks

- VIN, mileage, and value estimate flows need clear labels and error states.
- Trade-in values must connect cleanly to calculator and budget assumptions.
