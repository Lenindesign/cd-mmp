# Storyboard

**Format:** 1920 x 1080 landscape
**Audio:** Silent motion draft with on-screen copy. Add VO later if requested.
**VO direction:** Calm editorial product tour, if voiceover is added later.
**Style basis:** DESIGN.md, using captured calculator screenshots and C/D marketplace tokens.

## Asset Audit

| Asset | Type | Assign to Beat | Role |
| --- | --- | --- | --- |
| `capture/assets/svgs/header-logo-svg.svg` | SVG logo | Beat 1, Beat 5 | Brand opener and closer |
| `capture/screenshots/flow/goal.png` | Product screenshot | Beat 1, Beat 2 | Starting point and budget target |
| `capture/screenshots/flow/loan.png` | Product screenshot | Beat 2 | Loan term controls |
| `capture/screenshots/flow/vehicle.png` | Product screenshot | Beat 3 | Vehicle selection flow |
| `capture/screenshots/flow/trade.png` | Product screenshot | Beat 3 | Taxes, fees, and trade-in context |
| `capture/screenshots/flow/review.png` | Product screenshot | Beat 4 | Final estimate, breakdown, and marketplace bridge |
| `capture/assets/07-2026-honda-cr-v-trailsport.jpg` | Vehicle photo | Beat 5 | Editorial vehicle signal behind CTA |

## Beat 1 - Hook, 0:00-0:05

**Concept:** Open inside a dark C/D editorial canvas. The C/D logo anchors the top-left while the calculator panel arrives like a product surface being placed on a road-test desk. The viewer should immediately understand this is about making a car budget concrete.

**Text:** "Your monthly budget should explain more than a payment."

**Visual:** Dark blue background with subtle grid texture. Logo, large headline, small metadata pills, and the goal-step screenshot floating in a white browser-like frame. The screenshot slowly pushes in while a cobalt focus ring traces the active first step.

**Transition:** Incoming scene 2 slides over from the right with a soft blur clear.

## Beat 2 - Inputs, 0:04.5-0:10

**Concept:** Show that the calculator is interactive and financial, not just a static form. Goal and loan screenshots overlap as stacked panels, while the payment number and loan terms become the anchor.

**Text:** "Start with a target price or a comfortable monthly number."

**Visual:** Two product panels overlap in perspective: starting point in the background, loan terms in the foreground. Numeric chips call out `$30,000 target`, `7.0% APR`, `60 months`, and `$592/mo`.

**Transition:** A completed-step line draws across the frame and hands into vehicle/trade context.

## Beat 3 - Context, 0:09.5-0:15

**Concept:** The experience gets smarter as shoppers add real purchase context. Vehicle choice and trade/tax details appear side by side, connected by a green completion path.

**Text:** "Refine down payment, APR, term, taxes, fees, and trade-in."

**Visual:** Vehicle screenshot left, trade screenshot right. Three callout tags cascade over the panels: "Vehicle choice", "Taxes & fees", "Trade-in context". A green path moves through the top steppers.

**Transition:** The right panel expands into the full review screenshot.

## Beat 4 - Review, 0:14.5-0:20

**Concept:** The payoff is clarity. The tall review page scrolls inside a product viewport, moving from the monthly payment to cost breakdown, marketplace listings, and expert tips.

**Text:** "See the estimate, the full cost breakdown, and vehicles that fit."

**Visual:** The review screenshot sits in a masked vertical viewport and scrolls upward. Large stat cards float beside it: `$592/mo`, `$5,618 interest`, `$38,491 total paid`. The product frame remains bright and legible.

**Transition:** Product viewport scales down as the final brand CTA comes forward.

## Beat 5 - CTA, 0:19.5-0:24

**Concept:** Close with editorial authority and a clear next action. The C/D logo and vehicle photo combine with a quiet, confident CTA.

**Text:** "Estimate payments. Compare financing costs. Shop with confidence."

**Visual:** Dark C/D canvas, logo centered, CR-V image as a soft editorial card, final CTA button: "Open Auto Loan Calculator". A thin blue rule draws beneath the claim.

**Transition:** Final fade to dark.

## Production Architecture

```
demo-video/auto-loan-calculator-promo/
├── index.html
├── DESIGN.md
├── SCRIPT.md
├── STORYBOARD.md
├── capture/
│   ├── assets/
│   ├── extracted/
│   └── screenshots/flow/
└── compositions/
```
