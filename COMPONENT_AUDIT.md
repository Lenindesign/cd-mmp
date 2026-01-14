# Component Classification Audit
**Date:** December 14, 2025

## Audit Criteria

### Atomic Design Classification Rules:

| Category | Size (lines) | State Variables | Effects | Complexity | Composition |
|----------|--------------|-----------------|---------|------------|-------------|
| **Atom** | < 150 | 0-1 | 0-1 | Simple/None | Single element |
| **Molecule** | 150-500 | 2-4 | 0-2 | Moderate | 2-5 atoms |
| **Organism** | 500+ | 5+ | 2+ | Complex | Multiple molecules |

---

## Component Analysis

| Component | Current | Size | States | Effects | Memos | Recommended | Reason |
|-----------|---------|------|--------|---------|-------|-------------|--------|
| **AdBanner** | Atom | 122 | 0 | 0 | 0 | ✅ **Atom** | Simple display component |
| **AdSidebar** | Atom | 109 | 0 | 0 | 0 | ✅ **Atom** | Simple display component |
| **Button** | Atom | 372 | 0 | 0 | 0 | ✅ **Atom** | Foundational UI element (CSS heavy) |
| **ErrorState** | Atom | 309 | 0 | 0 | 0 | ✅ **Atom** | Simple display component |
| **LoadingSpinner** | Atom | 288 | 0 | 0 | 0 | ✅ **Atom** | Simple display component |
| **OptimizedImage** | Atom | 333 | 4 | 2 | 0 | ⚠️ **Molecule** | Has state + effects for lazy loading |
| **TextField** | Atom | 427 | 0 | 0 | 0 | ✅ **Atom** | Foundational form element (CSS heavy) |
| **Toast** | Atom | 456 | 3 | 2 | 7 | ⚠️ **Molecule** | Complex state management + animations |
| **Incentives** | Molecule | 686 | 4 | 0 | 2 | ⚠️ **Organism** | 686 lines, complex data display |
| **MarketSpeed** | Molecule | 565 | 6 | 0 | 2 | ⚠️ **Organism** | 565 lines, 6 states, complex calculations |
| **QuickSpecs** | Molecule | 437 | 2 | 2 | 0 | ✅ **Molecule** | Moderate complexity |
| **TrimSelector** | Molecule | 545 | 4 | 0 | 0 | ⚠️ **Organism** | 545 lines, complex UI logic |
| **VehicleOverview** | Molecule | 699 | 2 | 0 | 0 | ⚠️ **Organism** | 699 lines, complex content sections |
| **Warranty** | Molecule | 213 | 0 | 0 | 0 | ✅ **Molecule** | Simple data display |
| **BuyingPotential** | Organism | 1200 | 14 | 3 | 4 | ✅ **Organism** | Highly complex, correctly classified |
| **Comparison** | Organism | 662 | 3 | 0 | 2 | ✅ **Organism** | Complex comparison logic |
| **CostToOwn** | Organism | 885 | 4 | 0 | 4 | ✅ **Organism** | Complex calculations, correctly classified |
| **ExitIntentModal** | Organism | 853 | 5 | 3 | 0 | ✅ **Organism** | Complex modal with tracking |
| **Footer** | Organism | 341 | 0 | 0 | 0 | ✅ **Organism** | Site-wide navigation structure |
| **ForSaleNearYou** | Organism | 701 | 4 | 0 | 2 | ✅ **Organism** | Complex listing display |
| **Header** | Organism | 649 | 7 | 3 | 0 | ✅ **Organism** | Site-wide navigation, complex |
| **Hero** | Organism | 1049 | 4 | 2 | 4 | ✅ **Organism** | Complex hero section |
| **PricingCTA** | Organism | 1298 | 0 | 0 | 0 | ✅ **Organism** | Large, complex CTA section |
| **TargetPriceRange** | Organism | 852 | 4 | 0 | 3 | ✅ **Organism** | Complex pricing logic, correctly classified |
| **TopTenCarouselLeads** | Organism | 957 | 3 | 0 | 2 | ✅ **Organism** | Complex carousel with rankings |
| **VehicleRanking** | Organism | 478 | 0 | 0 | 3 | ✅ **Organism** | Complex ranking display |

---

## Reclassification Summary

### ⚠️ Components Needing Reclassification:

1. **OptimizedImage**: Atom → **Molecule**
   - Reason: Has 4 state variables + 2 effects for lazy loading logic
   - Not a simple display component

2. **Toast**: Atom → **Molecule**
   - Reason: 3 states + 2 effects + 7 memos for complex animation/timing
   - Too complex for an Atom

3. **Incentives**: Molecule → **Organism**
   - Reason: 686 lines, complex data transformations and display logic
   - Exceeds Molecule threshold

4. **MarketSpeed**: Molecule → **Organism**
   - Reason: 565 lines + 6 state variables, complex market calculations
   - Too complex for Molecule

5. **TrimSelector**: Molecule → **Organism**
   - Reason: 545 lines, complex trim selection and comparison logic
   - Borderline but leans Organism due to size + complexity

6. **VehicleOverview**: Molecule → **Organism**
   - Reason: 699 lines, multiple content sections with complex layout
   - Exceeds Molecule threshold

---

## Classification Guidelines Applied

### ✅ Keep as Atom:
- **Button, TextField**: Foundational UI elements (CSS-heavy is OK for atoms)
- **AdBanner, AdSidebar, ErrorState, LoadingSpinner**: Simple display components

### ✅ Keep as Molecule:
- **QuickSpecs, Warranty**: Moderate complexity, appropriate size

### ✅ Keep as Organism:
- All current Organisms are correctly classified
- Complex components with 500+ lines and/or 5+ states

---

## Total Changes Required: 6 components

**Atoms → Molecules:** 2 (OptimizedImage, Toast)
**Molecules → Organisms:** 4 (Incentives, MarketSpeed, TrimSelector, VehicleOverview)

