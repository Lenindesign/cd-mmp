---
type: "module"
generated: "2026-06-08T13:33:34.301Z"
routes: "5"
---

# Authentication and Onboarding

Sign-in, sign-up, and onboarding paths that set up account identity and initial shopper preferences.

## Routes

- [[Routes/Sign In|/sign-in]] - `SignIn`
- [[Routes/Sign Up|/sign-up]] - `SignUp`
- [[Routes/Onboarding Step 1|/onboarding/step-1]] - `OnboardingStep1`
- [[Routes/Onboarding Step 2|/onboarding/step-2]] - `OnboardingStep2`
- [[Routes/Onboarding Results|/onboarding/results]] - `OnboardingResults`

## Related Modules

- [[Modules/Account and Garage|Account and Garage]] - outbound: account identity

## Related Flows

- No core flow mapped yet.

## Audit Risks

- Auth bypass behavior must remain clearly scoped to demo or local flows.
- Social sign-in buttons need stable focus and loading states.
