# Deals Section Audit — 2026-04-18

Read-only design/UX audit of the deals section (all 7 listing pages) plus the shared `DealCard`, `DealsFilterModal`, and `IncentivesModal`. Findings are scored P0–P3 against the impeccable design skill and the project's documented design system (`src/index.css`, `.cursor/rules/design-tokens.mdc`, `.cursor/skills/design-system/SKILL.md`).

## Scope

Pages reviewed:

- `src/pages/AllDealsPage/`
- `src/pages/LeaseDealsPage/`
- `src/pages/ZeroAprDealsPage/`
- `src/pages/CashFinanceDealsPage/`
- `src/pages/SuvDealsPage/`
- `src/pages/TruckDealsPage/`
- `src/pages/FuelTypeDealsPage/`

Shared infrastructure:

- `src/components/DealCard/`
- `src/components/DealsFilterModal/`
- `src/components/IncentivesModal/`

## Architecture summary

All 7 pages are **one visual pattern** (dark gradient hero → sticky toolbar → full-bleed leaderboard ad → grid + 300px sticky sidebar → mid-grid ad breaker every 12 cards → FAQ + "explore more" tail) with different data sources and a few behavior branches. They share `DealCard`, the filter modal, and the incentives modal — but each page re-implements the shell in its own CSS and re-declares the same ad/chunk constants in TSX.

## Severity key

- **P0** — ships now; hits an impeccable absolute-ban or blocks a user flow
- **P1** — visible inconsistency or token-drift
- **P2** — duplication / maintenance debt (no direct user impact)
- **P3** — polish / future refinement

## P0 — Immediate

- **P0.1** — Glassmorphism on `DealCard` save control. `backdrop-filter` on the card's primary interactive surface is one of impeccable's called-out bans. `src/components/DealCard/DealCard.css:127-128`.
- **P0.2** — AllDealsPage offers `type=lease` filter with zero lease rows in the underlying data. Choosing lease yields an unexplained empty grid. See `applyFiltersToDeals` in `src/pages/AllDealsPage/AllDealsPage.tsx:226-248`.
- **P0.3** — FuelTypeDealsPage filter-button badge ignores fuel-type exclusion chips. Users can't tell filters are active. `src/pages/FuelTypeDealsPage/FuelTypeDealsPage.tsx:393-402`.
- **P0.4** — SUV / Truck "Clear all" navigates away to `/deals/all`. Clear should reset state on-page, not teleport the user. `src/pages/SuvDealsPage/SuvDealsPage.tsx:109-110`; analogous in `TruckDealsPage.tsx`. On mobile (no sidebar) this is especially disorienting.

## P1 — Consistency / token drift

- **P1.5** — Grid-gap divergence: `AllDealsPage` uses `--spacing-4`; everyone else uses `--spacing-6` at the same card density.
- **P1.6** — `AllDealsPage` column cadence is **2 → 3 → 2 → 1** as viewport shrinks — the inverse of a normal pyramid. `src/pages/AllDealsPage/AllDealsPage.css:220-303`.
- **P1.7** — Page-title scale split: AllDealsPage uses `var(--font-size-4xl)` token while Lease/others use `clamp(32px, 5vw, 48px)`. Two strategies, same product area.
- **P1.8** — Section-title skew: ZeroApr uses `var(--font-size-36)`; siblings use `var(--font-size-2xl)`.
- **P1.9** — Toolbar bottom-border weight: 4px on All / Lease / ZeroApr / CashFinance; 1px on SUV / Truck / FuelType.
- **P1.10** — Hex fallbacks drift from canonical palette — e.g. `var(--color-blue-dark, #1a3a5c)` vs canonical `#154d70`. Hover states silently diverge.
- **P1.11** — Raw `#f0f7f7` in filter modal (not a token). `src/components/DealsFilterModal/DealsFilterModal.css:96`.
- **P1.12** — `DealCard` uses literal px (rating 28px, positions 8px, tag 11px). `src/components/DealCard/DealCard.css:49-114`.
- **P1.13** — Hard-coded `#ffffff` on hero links across 6 pages — should be `var(--color-white)`.
- **P1.14** — CashFinance "Apply" jumps to `/deals/all?filters=…` — user silently leaves their URL. `src/pages/CashFinanceDealsPage/CashFinanceDealsPage.tsx:90-94`.
- **P1.15** — AllDealsPage uses a local `Set` for saves (no `SignInToSaveModal`) — diverges from every other listing's auth-backed pattern.
- **P1.16** — AllDealsPage omits the FAQ + "explore more" tail that every sibling page has — inconsistent content hierarchy.
- **P1.17** — Link-module blurbs are `display: none` on 5 pages but visible on CashFinance — pick one.
- **P1.18** — Cash deals show `/mo*` suffix on SUV/Truck — reads as a real lease price; it's a modeled amount. `src/pages/SuvDealsPage/SuvDealsPage.tsx:388-389`.

## P2 — Duplication / maintenance debt

- **P2.19** — `GRID_BREAKER_AFTER_CARD_COUNT`, `DEALS_GRID_BREAKER_AD_URL`, `SIDEBAR_AFTER_BREAK_PROPS`, and `chunkArray` are declared in 7 different TSX files. Should live in `src/constants/dealsLayout.ts` + `src/utils/chunkArray.ts`.
- **P2.20** — Hero / toolbar / segment / grid / empty-state / FAQ shell / link-row CSS is re-written in each page stylesheet with only class-prefix swaps.
- **P2.21** — Dead classes in `CashFinanceDealsPage.css:123-181` (`.cf-deals-page__filter-bar`, `__filters`, `__filter-btn`) — not used by the TSX.

## P3 — Polish / future

- **P3.22** — Hero decorative animations on AllDealsPage (`::before` at `src/pages/AllDealsPage/AllDealsPage.css:9-27`) — impeccable favors purposeful motion; worth a restraint pass.
- **P3.23** — The codebase uses Inter exclusively, which sits on impeccable's "reflex fonts to reject." Not in-scope for a listing audit, flagged per skill.

## Not found in scope (clean)

- No gradient text (`background-clip: text` + gradient) on any of the 7 pages or `IncentivesModal`.
- No thick (>1px) decorative `border-left` / `border-right` stripes on cards/callouts — `DealCard` and the modal column divider are 1px.
- No sparklines-as-decoration.

## Redesign directions

See the plan at `.cursor/plans/deals_section_audit_cf912158.plan.md` for full write-ups. Summary:

- **Direction A — Unify the Deals Listing Shell.** Extract a shared `DealsListingLayout` component that owns hero, toolbar, grid, sidebar, ad breakers, empty states, and tail. Each page becomes config + data + filter logic. Fixes P1.5-9, P1.13, P2.19-21.
- **Direction B — DealCard token + no-glass pass.** Replace `backdrop-filter`, swap literal px for spacing tokens, remove hex-fallback drift. Fixes P0.1, P1.10-12.
- **Direction C — Listing CommandBar repair.** Unify toolbar border weight, accurate active-filter count (including exclusion chips), on-page `Clear all`, shared category-pill slot. Fixes P0.2-4, P1.9, P1.14.
- **Direction D (optional) — UX repairs.** AllDeals lease filter, CashFinance apply, unify save modal, blurb visibility, cash `/mo*` suffix.

## Implementation log

This audit is being implemented alongside its own report. Directions B, A, C, and D follow in subsequent commits on `main`.
