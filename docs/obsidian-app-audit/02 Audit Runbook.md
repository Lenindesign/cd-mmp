---
type: "runbook"
generated: "2026-06-08T13:33:34.301Z"
---

# Audit Runbook

## Automated Gates

Run these before handing the app to developers or before a production deploy:

```bash
npm run build
npm run lint
npm run test:run
npm run test:playwright
git diff --check
```

## Manual QA Matrix

| Area | Desktop | Mobile | Keyboard | Accessibility | Data Integrity |
| --- | --- | --- | --- | --- | --- |
| Finance and Calculator | Steps, sticky nav, review, save, email | 390px and 642px result stack | Arrow keys, tab order, focus return | Tooltips, labels, reduced motion | APR, terms, trade, taxes, incentives |
| Vehicle Detail | Hero, pricing, finance, lease, cash tabs | Payment module and ads | Tabs and form fields | Info tooltips and image alt states | Trim price and payment updates |
| Deals and Incentives | Hub, filters, card grid, modals | Filter modal and active pills | Cards, chips, close actions | Badges not color-only | Offer math and route filters |
| Account and Garage | Profile, saved, subscriptions | Sidebar drawer and tabs | Close, remove, open saved estimate | Focus trap and aria labels | Saved estimates and saved vehicles |
| Vehicle Discovery | Browse, brands, rankings, compare | Cards and carousel overflow | Filters and compare controls | Headings, links, image fallback | Vehicle data and rankings |

## Design System Checks

- Use C/D cobalt for links, selected states, and primary actions only.
- Use gray token borders for inactive cards and fields.
- Keep card radii in the 4px to 8px range unless a component token says otherwise.
- Preserve visible focus states, but avoid browser-default duplicate tooltips.
- Vehicle and deal image failures must render text-only missing image states.

## Obsidian Workflow

1. Open `docs/obsidian-app-audit` as a vault.
2. Start at [[00 App Map]].
3. Open the graph view and filter by `type: module` or `type: flow`.
4. Add findings to [[Issues/00 QA Backlog]] with P0-P3 severity.
5. Link each issue back to a route, module, and flow note.
