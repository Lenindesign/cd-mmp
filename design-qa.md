# Local Market Snapshot: Figma Match Plan and QA

## Reference

- Figma file: `Q7BlxJIvagLNrUtyIFONKT`
- Reference frame: `696:1072` (2026 Strong / green state)
- Target route: `/2026/Chevrolet/Trax`
- Frame dimensions: 707 × 656 px

## Pixel-match plan

1. Match the outer card width, height, white surface, radius, and subtle shadow.
2. Match the header hierarchy, Inter typography, ZIP and distance control sizes, and spacing.
3. Rebuild the green recommendation panel with a state meter and price-specific buying guidance.
4. Use a two-column metric grid with the live local values, preserving the price trend and inventory data.
5. Add the two Figma-style actions and model-year comparison at the card foot, keeping the existing deals and inventory actions connected.
6. Keep the compact variant and the small-screen layout responsive.

## Measured implementation

At a 1024 × 768 browser viewport, the snapshot measures 707 × 656 px. Main anchor coordinates match the Figma frame:

| Element | Figma target | Implementation |
| --- | ---: | ---: |
| Outer card | 707 × 656 | 707 × 656 |
| Header | x24, y32, w659, h54 | x24, y32, w659, h54 |
| Recommendation panel | x24, y102, w659, h91 | x24, y102, w659, h91 |
| Metric grid | x24, y213, w659, h246 | x24, y213, w659, h246 |

The full variant hides the old evidence chips and price plot in the main card, which keeps the visible composition aligned with the selected design. Existing market values remain live. The first action scrolls to nearby deals; the second opens local inventory. The compact variant retains its earlier layout.

At 390 px, the header stacks, ZIP and distance controls move below the title, metric cards become one column, and the actions stack.

## Verification

- Captured the local page in Codex In-app Browser at desktop and mobile widths.
- `npm run build` passed (`tsc -b` and `vite build`). Vite also reported its large-chunk advisory.
- `git diff --check` passed.
- The browser logged a 502 warning for the separate live-inventory request; the snapshot rendered with its local market data.

## Mapping note

The approved project `Button` component is used for both actions. Figma Code Connect could not save a mapping because the Figma Button component is not published to a team library (`Published component not found`), so no `.figma.ts` template was created. The Figma-hosted SVG asset endpoint was blocked in this environment; the recommendation mark is a solid green CSS circle, and the metric help uses the existing `Info` icon.
