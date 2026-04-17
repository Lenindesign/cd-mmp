# 2026 Deals Coverage Matrix

Change log for the "Expand Deals to 100/100" rollout. Every row produced by the three deal services lives in one of the columns below. This doc stays in the repo so future edits can reason about why a given make/model is or isn't represented.

All monetary and rate values are plausible illustrative figures within realistic 2026 segment ranges. Top-seller anchors (F-150, Silverado, RAV4, Camry, CR-V, Civic, Accord, Equinox, Mustang) reflect the shape of currently-documented OEM programs but are not pulled from live data.

Every deal binds to a matching 2026 `Vehicle` record in `src/data/vehicles/*.json`. Rows that do not resolve are silently dropped by the service getters, so the catalog must support every entry below. The eight vehicles added under "Catalog additions" unlock the `plug-in-hybrid` and `diesel` fuel-type landings on both lease and buying.

---

## Catalog additions (8 new vehicles in `src/data/vehicles/`)

Added to unlock Plug-In Hybrid and Diesel landing pages.

| File | Make | Model | Body | Fuel |
|------|------|-------|------|------|
| `suvs.json` | Toyota | RAV4 Prime | SUV | Plug-In Hybrid |
| `suvs.json` | Jeep | Wrangler 4xe | SUV | Plug-In Hybrid |
| `suvs.json` | Jeep | Grand Cherokee 4xe | SUV | Plug-In Hybrid |
| `suvs.json` | BMW | X5 xDrive50e | SUV | Plug-In Hybrid |
| `suvs.json` | Ford | Escape PHEV | SUV | Plug-In Hybrid |
| `trucks.json` | Chevrolet | Silverado 1500 Duramax | Truck | Diesel |
| `trucks.json` | Ram | 1500 EcoDiesel | Truck | Diesel |
| `trucks.json` | GMC | Sierra 1500 Duramax | Truck | Diesel |

---

## Lease — 100 deals (`LEASE_DEAL_DEFS` in `leaseDealsService.ts`)

### Aggregate coverage

| Dimension | Counts |
|-----------|--------|
| Fuel types | Gas 58, Electric 19, Hybrid 15, Plug-In Hybrid 5, Diesel 3 |
| Body styles | SUV 45, Sedan 25, Truck 14, Convertible 5, Hatchback 4, Coupe 3, Wagon 4 |
| Makes | 23 (Chevy, Ford, Honda, Toyota, Hyundai, Kia, Nissan, Mazda, Subaru, VW, BMW, Mercedes-Benz, Audi, Tesla, Genesis, Lexus, Volvo, Jeep, Ram, GMC, Mini, Porsche, Lucid) |

### Detailed list (100 rows)

Format: `Make Model | Body/Fuel | $monthly × term | notes`

**Chevrolet (8)**
1. Trax | SUV/Gas | $299 × 24mo
2. Equinox | SUV/Gas | $329 × 36mo
3. Trailblazer | SUV/Gas | $289 × 24mo
4. Silverado | Truck/Gas | $459 × 36mo
5. Colorado | Truck/Gas | $399 × 36mo
6. Silverado EV | Truck/Electric | $599 × 36mo
7. Bolt EV | Sedan/Electric | $249 × 36mo
8. Silverado 1500 Duramax | Truck/Diesel | $509 × 36mo

**Ford (6)**
9. F-150 | Truck/Gas | $449 × 36mo
10. Maverick | Truck/Hybrid | $309 × 36mo
11. Escape | SUV/Gas | $289 × 36mo
12. Mustang Mach-E | SUV/Electric | $429 × 36mo
13. Escape PHEV | SUV/PHEV | $339 × 36mo
14. Mustang | Coupe/Gas | $419 × 36mo

**Honda (6)**
15. CR-V | SUV/Gas | $369 × 36mo
16. Civic | Sedan/Gas | $289 × 36mo
17. HR-V | SUV/Gas | $269 × 36mo
18. Accord | Sedan/Hybrid | $379 × 36mo
19. Pilot | SUV/Gas | $419 × 36mo
20. Civic Hatchback | Hatchback/Gas | $309 × 36mo

**Toyota (10)**
21. Camry | Sedan/Gas | $329 × 36mo
22. RAV4 | SUV/Gas | $359 × 36mo
23. Corolla | Sedan/Gas | $249 × 36mo
24. Highlander | SUV/Gas | $419 × 36mo
25. RAV4 Hybrid | SUV/Hybrid | $389 × 36mo
26. bZ4X | SUV/Electric | $349 × 36mo
27. Tundra | Truck/Hybrid | $489 × 36mo
28. Prius | Hatchback/Hybrid | $319 × 36mo
29. GR86 | Coupe/Gas | $339 × 36mo
30. RAV4 Prime | SUV/PHEV | $459 × 36mo

**Hyundai (8)**
31. Tucson | SUV/Gas | $339 × 36mo
32. Sonata | Sedan/Hybrid | $309 × 36mo
33. Santa Fe | SUV/Hybrid | $389 × 36mo
34. Kona | SUV/Gas | $259 × 36mo
35. Elantra | Sedan/Gas | $239 × 36mo
36. Ioniq 5 | SUV/Electric | $299 × 36mo
37. Ioniq 6 | Sedan/Electric | $279 × 36mo
38. Santa Cruz | Truck/Gas | $349 × 36mo

**Kia (6)**
39. Seltos | SUV/Gas | $279 × 36mo
40. K5 | Sedan/Gas | $299 × 36mo
41. Sportage Hybrid | SUV/Hybrid | $349 × 36mo
42. Telluride | SUV/Gas | $429 × 36mo
43. EV6 | SUV/Electric | $319 × 36mo
44. Forte | Sedan/Gas | $219 × 36mo

**Nissan (5)**
45. Rogue | SUV/Gas | $349 × 36mo
46. Altima | Sedan/Gas | $319 × 36mo
47. Kicks | SUV/Gas | $229 × 36mo
48. Leaf | Sedan/Electric | $259 × 36mo
49. Titan | Truck/Gas | $449 × 36mo

**Mazda (4)**
50. CX-5 | SUV/Gas | $339 × 36mo
51. CX-90 | SUV/Hybrid | $469 × 36mo
52. MX-5 Miata | Convertible/Gas | $349 × 36mo
53. Mazda3 | Sedan/Gas | $279 × 36mo

**Subaru (5)**
54. Crosstrek | SUV/Gas | $329 × 36mo
55. Forester | SUV/Gas | $359 × 36mo
56. Outback | Wagon/Gas | $349 × 36mo
57. Solterra | SUV/Electric | $329 × 36mo
58. BRZ | Coupe/Gas | $339 × 36mo

**Volkswagen (4)**
59. Jetta | Sedan/Gas | $259 × 36mo
60. ID.4 | SUV/Electric | $299 × 36mo
61. Atlas | SUV/Gas | $389 × 36mo
62. Golf GTI | Hatchback/Gas | $389 × 36mo

**BMW (5)**
63. 3 Series | Sedan/Gas | $429 × 36mo
64. X5 | SUV/Gas | $679 × 36mo
65. i4 | Sedan/Electric | $549 × 36mo
66. iX | SUV/Electric | $699 × 36mo
67. X5 xDrive50e | SUV/PHEV | $799 × 36mo

**Mercedes-Benz (5)**
68. C-Class | Sedan/Gas | $479 × 36mo
69. GLE | SUV/Gas | $729 × 36mo
70. EQE | Sedan/Electric | $779 × 36mo
71. E-Class Wagon | Wagon/Gas | $669 × 36mo
72. SL-Class | Convertible/Gas | $999 × 36mo

**Audi (5)**
73. A4 | Sedan/Gas | $439 × 36mo
74. Q7 | SUV/Gas | $659 × 36mo
75. A5 Cabriolet | Convertible/Gas | $549 × 36mo
76. Q4 e-tron | SUV/Electric | $529 × 36mo
77. e-tron GT | Sedan/Electric | $899 × 36mo

**Tesla (3)**
78. Model 3 | Sedan/Electric | $349 × 36mo
79. Model Y | SUV/Electric | $399 × 36mo
80. Model S | Sedan/Electric | $899 × 36mo

**Genesis (3)**
81. G70 | Sedan/Gas | $419 × 36mo
82. GV80 | SUV/Gas | $569 × 36mo
83. G70 Convertible | Convertible/Gas | $459 × 36mo

**Lexus (3)**
84. ES | Sedan/Hybrid | $479 × 36mo
85. RX | SUV/Hybrid | $599 × 36mo
86. LC Convertible | Convertible/Gas | $999 × 36mo

**Volvo (4)**
87. XC90 | SUV/Hybrid | $619 × 36mo
88. S60 | Sedan/Hybrid | $389 × 36mo
89. V60 | Wagon/Hybrid | $429 × 36mo
90. V90 | Wagon/Hybrid | $479 × 36mo

**Jeep (3)**
91. Grand Cherokee | SUV/Gas | $449 × 36mo
92. Wrangler 4xe | SUV/PHEV | $539 × 36mo
93. Grand Cherokee 4xe | SUV/PHEV | $629 × 36mo

**Ram (2)**
94. 1500 | Truck/Gas | $469 × 36mo
95. 1500 EcoDiesel | Truck/Diesel | $529 × 36mo

**GMC (3)**
96. Sierra | Truck/Gas | $479 × 36mo
97. Sierra EV | Truck/Electric | $679 × 36mo
98. Sierra 1500 Duramax | Truck/Diesel | $519 × 36mo

**Mini (1)**
99. Cooper Hardtop | Hatchback/Gas | $309 × 36mo

**Porsche (1)**
100. Cayenne | SUV/Gas | $849 × 36mo

---

## Buying — 100 deals split across three services

### Zero-APR (30 rows, `DEAL_DEFINITIONS` in `zeroAprDealsService.ts`)

Gas 23 / Hybrid 5 / Electric 2

1. Chevrolet Equinox — 60 months
2. Chevrolet Trax — 48 months
3. Chevrolet Trailblazer — 60 months
4. Chevrolet Silverado — 72 months
5. Chevrolet Colorado — 60 months
6. Toyota Camry — 60 months
7. Toyota RAV4 — 48 months
8. Toyota Corolla — 60 months
9. Toyota Highlander — 48 months
10. Toyota RAV4 Hybrid — 60 months
11. Toyota Tundra — 60 months
12. Honda CR-V — 60 months
13. Honda Civic — 60 months
14. Honda Accord — 60 months
15. Honda HR-V — 48 months
16. Honda Pilot — 60 months
17. Ford F-150 — 72 months
18. Ford Escape — 60 months
19. Ford Mustang Mach-E — 60 months
20. Hyundai Tucson — 60 months
21. Hyundai Kona — 48 months
22. Hyundai Elantra — 60 months
23. Hyundai Santa Fe — 60 months
24. Hyundai Sonata — 60 months
25. Hyundai Ioniq 5 — 60 months
26. Kia Seltos — 60 months
27. Kia Telluride — 60 months
28. Kia K5 — 60 months
29. Nissan Rogue — 60 months
30. Nissan Altima — 60 months

### Low-APR Finance (35 rows, `FINANCE_DEAL_DEFS` in `cashFinanceDealsService.ts`)

Gas 26 / Electric 5 / Hybrid 2 / PHEV 2

1. Chevrolet Trax — 6.6%
2. Chevrolet Equinox — 5.9%
3. Chevrolet Silverado — 4.9%
4. Chevrolet Colorado — 5.4%
5. Toyota Camry — 4.99%
6. Toyota RAV4 — 5.49%
7. Toyota Corolla — 4.9%
8. Toyota Highlander — 5.49%
9. Toyota Tundra — 5.9%
10. Honda CR-V — 5.9%
11. Honda Civic — 4.9%
12. Honda HR-V — 4.9%
13. Honda Pilot — 5.49%
14. Honda Accord — 4.99%
15. Ford F-150 — 3.9%
16. Ford Mustang — 5.9%
17. Ford Escape — 5.49%
18. Ford Escape PHEV — 3.9%
19. Ford Mustang Mach-E — 4.9%
20. Hyundai Tucson — 4.9%
21. Hyundai Kona — 5.49%
22. Hyundai Ioniq 5 — 3.99%
23. Hyundai Ioniq 6 — 3.99%
24. Kia Seltos — 4.9%
25. Kia K5 — 4.9%
26. Kia EV6 — 3.99%
27. Nissan Rogue — 4.9%
28. Nissan Altima — 5.49%
29. Nissan Leaf — 1.9%
30. Mercedes-Benz C-Class — 3.99%
31. Mercedes-Benz GLE — 3.99%
32. BMW 3 Series — 4.99%
33. BMW X5 xDrive50e — 3.99%
34. GMC Sierra 1500 Duramax — 5.9%
35. Lexus RX — 4.49%

### Cash back (35 rows, `CASH_DEAL_DEFS` in `cashFinanceDealsService.ts`)

Gas 28 / Hybrid 2 / PHEV 3 / Electric 1 / Diesel 1

1. Chevrolet Trax — $2,000
2. Chevrolet Equinox — $2,500
3. Chevrolet Silverado — $3,500
4. Chevrolet Trailblazer — $1,500
5. Chevrolet Colorado — $2,500
6. Toyota Camry — $1,500
7. Toyota RAV4 — $1,500
8. Toyota Tundra — $2,500
9. Toyota RAV4 Prime — $3,500
10. Ford F-150 — $4,000
11. Ford Mustang — $2,000
12. Ford Maverick — $1,500
13. Ford Escape — $1,500
14. Honda CR-V — $1,500
15. Honda Pilot — $2,000
16. Hyundai Tucson — $1,500
17. Hyundai Kona — $1,000
18. Hyundai Santa Fe — $2,000
19. Hyundai Ioniq 5 — $7,500
20. Nissan Rogue — $2,000
21. Nissan Pathfinder — $2,500
22. Nissan Altima — $1,500
23. Kia Seltos — $1,500
24. Kia K5 — $1,500
25. Kia Sportage Hybrid — $2,000
26. Kia Telluride — $2,500
27. Ram 1500 — $3,500
28. Ram 1500 EcoDiesel — $4,000
29. GMC Sierra — $3,000
30. Jeep Grand Cherokee — $2,500
31. Jeep Wrangler 4xe — $3,500
32. Jeep Grand Cherokee 4xe — $4,000
33. BMW 3 Series — $2,500
34. Mercedes-Benz C-Class — $3,000
35. Chevrolet Silverado 1500 Duramax — $3,500

---

## Category-landing coverage after rollout

Minimum deal counts per SEO landing page once the three services are expanded.

| Landing | Lease | Buying |
|---------|-------|--------|
| `/suv` | 45 | ~40 |
| `/sedan` | 25 | ~22 |
| `/truck` | 14 | ~18 |
| `/coupe` | 3 | ~2 |
| `/convertible` | 5 | 1 |
| `/hatchback` | 4 | 0 |
| `/wagon` | 4 | 0 |
| `/gas` | 58 | 77 |
| `/electric` | 19 | 8 |
| `/hybrid` | 15 | 9 |
| `/plug-in-hybrid` | 5 | 5 |
| `/diesel` | 3 | 3 |
| Each of 10 core makes (Ford, Chevy, Toyota, Honda, Hyundai, Kia, Nissan, BMW, Mercedes-Benz, Ford) | 5+ each | 3+ each |

Landings that remain empty or near-empty after this rollout will correctly emit `noIndex` until either the catalog expands or real inventory justifies coverage.

---

## Out of scope

- Real-time OEM incentive scraping.
- Regional/ZIP-based variance.
- Rotating expiration dates (all deals share `May 1, {year}`).
