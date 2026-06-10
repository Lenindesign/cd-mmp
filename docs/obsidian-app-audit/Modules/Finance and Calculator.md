---
type: "module"
generated: "2026-06-08T13:33:34.301Z"
routes: "11"
---

# Finance and Calculator

Finance landing pages, vehicle payment calculators, and guided auto loan calculator variants.

## Routes

- [[Routes/Financing|/financing]] - `FinancingPage`
- [[Routes/Payment Calculator|/payment-calculator]] - `FinancingPage`
- [[Routes/Auto Loan Calculator|/auto-loan-calculator]] - `AutoLoanCalculatorPage`
- [[Routes/Auto Loan Calculator All In One|/auto-loan-calculator/all-in-one]] - `AllInOnePaymentCalculatorPage`
- [[Routes/Auto Loan Calculator All In One Budget|/auto-loan-calculator/all-in-one-budget]] - `AllInOnePaymentCalculatorBudgetPage`
- [[Routes/Auto Loan Calculator Light|/auto-loan-calculator/light]] - `AllInOnePaymentCalculatorLightPage`
- [[Routes/Auto Loan Calculator Light Steps|/auto-loan-calculator/light-steps]] - `AllInOnePaymentCalculatorLightStepsPage`
- [[Routes/Auto Loan Calculator Light Steps Stepslug|/auto-loan-calculator/light-steps/:stepSlug]] - `AllInOnePaymentCalculatorLightStepsPage`
- [[Routes/Auto Loan Calculator Light Steps2|/auto-loan-calculator/light-steps2]] - `AllInOnePaymentCalculatorLightSteps2Page`
- [[Routes/Auto Loan Calculator Light Steps2 Stepslug|/auto-loan-calculator/light-steps2/:stepSlug]] - `AllInOnePaymentCalculatorLightSteps2Page`
- [[Routes/Auto Loan Calculator Lease Vs Buy Ai|/auto-loan-calculator/lease-vs-buy-ai]] - `LeaseVsBuyAIPage`

## Related Modules

- [[Modules/Vehicle Detail|Vehicle Detail]] - inbound: payment module
- [[Modules/Account and Garage|Account and Garage]] - outbound: saved estimates
- [[Modules/Vehicle Discovery|Vehicle Discovery]] - outbound: cars in budget
- [[Modules/Vehicle Detail|Vehicle Detail]] - outbound: selected vehicle estimate
- [[Modules/Trade In Valuation|Trade In Valuation]] - inbound: trade credit
- [[Modules/Account and Garage|Account and Garage]] - inbound: open saved estimate

## Related Flows

- [[Flows/Guided Calculator to Garage|Guided Calculator to Garage]]
- [[Flows/Vehicle Research to Finance|Vehicle Research to Finance]]
- [[Flows/Trade-In to Budget|Trade-In to Budget]]

## Audit Risks

- Finance math and rounding need unit tests for zero APR, trade-in, taxes, rebates, and terms.
- Guided calculator must preserve keyboard navigation, focus state, reduced motion, and mobile overflow behavior.
