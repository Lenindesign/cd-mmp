# Car & Driver Marketplace — Design System Skill

Use this skill when building, styling, or reviewing UI components for the Car & Driver Marketplace. It provides the complete design system context needed for consistent, production-quality output.

## When to Use

- Creating new components or pages
- Styling existing components
- Reviewing UI code for design system compliance
- Answering questions about the visual language
- Building Storybook stories

## Quick Reference

### Brand Identity
- **Product**: Car & Driver Marketplace (vehicle deals, incentives, reviews)
- **Tone**: Authoritative automotive journalism meets modern digital commerce
- **Target**: Car buyers researching deals, comparing vehicles, and finding incentives

### Tech Stack
- React 18 + TypeScript
- Vite 7 (build)
- React Router v6 (routing)
- Plain CSS with BEM naming (no Tailwind, no CSS Modules, no styled-components)
- Storybook 10 (component documentation)
- Netlify (hosting + serverless functions)

### Token Source of Truth
All design tokens are CSS custom properties in `src/index.css` `:root`. A machine-readable copy lives in `design-tokens.json` at the project root. Always use `var(--token-name)` — never hardcode values.

### Color System
| Purpose | Variable | Hex |
|---------|----------|-----|
| Primary action | `--color-blue-cobalt` | #1B5F8A |
| Primary hover | `--color-blue-cobalt-dark` | #154d70 |
| Accent | `--color-blue-cobalt-light` | #60A5FA |
| Brand red | `--color-red` | #D2232A |
| Text primary | `--color-dark` | #222222 |
| Text secondary | `--color-gray-600` | #666666 |
| Text tertiary | `--color-gray-500` | #6b6b6b |
| Borders | `--color-gray-200` | #e5e5e5 |
| Background subtle | `--color-gray-100` | #f5f5f5 |
| Background page | `--color-gray-50` | #fafafa |
| Success | `--color-success` | #26870D |
| Warning | `--color-warning` | #f59e0b |
| Error | `--color-error` | #ef4444 |

### Typography
| Role | Font | Variable |
|------|------|----------|
| Headings | Inter | `--font-heading` |
| Body | Inter | `--font-body` |
| Editorial | Lora | `--font-article` |
| Labels/Badges | Barlow Condensed | `--font-label` |

Weight scale: regular (400), medium (500), semibold (600), bold (700), extrabold (800), black (900)

Size scale: 2xs (10px) → xs (12px) → sm (14px) → base (16px) → lg (18px) → xl (20px) → 2xl (24px) → 3xl (30px) → 4xl (36px) → 5xl (48px)

### Spacing (4px base)
`--spacing-1` (4px) → `--spacing-2` (8px) → `--spacing-3` (12px) → `--spacing-4` (16px) → `--spacing-6` (24px) → `--spacing-8` (32px) → `--spacing-12` (48px) → `--spacing-16` (64px)

### Component Patterns

**Button variants**: primary (blue-cobalt bg), secondary, outline, ghost, danger, success, link
**Button sizes**: small (32px h), medium (40px h), large (48px h)

**Card pattern**:
```css
.block__card {
  background: var(--color-white);
  border: 1px solid var(--color-gray-200);
  border-radius: var(--border-radius-lg);
  overflow: hidden;
  transition: box-shadow var(--transition-fast);
}
.block__card:hover {
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
}
```

**Section pattern**:
```css
.block__section {
  padding: var(--spacing-8) 0;
  background: var(--color-gray-50);
}
.block__section .container {
  /* content constrained to 1280px */
}
```

**CTA pattern (primary)**:
```css
.block__cta {
  display: block;
  width: 100%;
  padding: var(--spacing-3);
  background: var(--color-blue-cobalt);
  color: var(--color-white);
  font-family: var(--font-heading);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-bold);
  text-transform: uppercase;
  text-align: center;
  letter-spacing: 0.5px;
  border: none;
  border-radius: var(--border-radius-md);
  cursor: pointer;
  transition: background var(--transition-fast);
}
.block__cta:hover {
  background: var(--color-blue-cobalt-dark);
}
```

**Pill/chip pattern**:
```css
.block__pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 10px;
  background: var(--color-gray-50);
  border: 1px solid var(--color-gray-200);
  border-radius: var(--border-radius-full);
  font-family: var(--font-heading);
  font-size: 12px;
  font-weight: var(--font-weight-bold);
}
```

### Responsive Breakpoints
| Name | Value | Grid columns |
|------|-------|--------------|
| Mobile | ≤600px | 1 |
| Tablet | ≤768px | 1–2 |
| Tablet landscape | ≤900px | 2 |
| Desktop | ≤1200px | 3 |
| Wide | ≥1401px | 3+ |

### File Structure for New Components
```
src/components/ComponentName/
  ComponentName.tsx          # Implementation
  ComponentName.css          # BEM-named styles using CSS variables
  ComponentName.stories.tsx  # Storybook stories
  index.ts                   # export { ComponentName, type ComponentNameProps }
```

### Checklist for UI Code

- [ ] All colors use `var(--color-*)` tokens
- [ ] All spacing uses `var(--spacing-*)` tokens
- [ ] Font families use semantic variables (`--font-heading`, `--font-body`)
- [ ] CSS classes follow BEM: `.block__element--modifier`
- [ ] Responsive: works at 480px, 768px, 1024px, 1200px
- [ ] Interactive elements have hover/focus/active states
- [ ] Transitions use `var(--transition-fast/normal/slow)`
- [ ] Touch targets ≥ 44px on mobile
- [ ] Semantic HTML (button for actions, a for navigation, etc.)
- [ ] ARIA labels on icon-only buttons
