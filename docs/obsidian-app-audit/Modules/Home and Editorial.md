---
type: "module"
generated: "2026-06-08T13:33:34.301Z"
routes: "7"
---

# Home and Editorial

Homepage, news, articles, listicles, and expert reviews that provide editorial context before shopping actions.

## Routes

- [[Routes/Home|/]] - `NewsPage`
- [[Routes/Expert Reviews|/expert-reviews]] - `ExpertReviewsPage`
- [[Routes/News|/news]] - `NewsPage`
- [[Routes/News Stories|/news-stories]] - `NewsPage`
- [[Routes/News Slug|/news/:slug]] - `ArticlePage`
- [[Routes/Article Slug|/article/:slug]] - `ArticlePage`
- [[Routes/Listicle Slug|/listicle/:slug]] - `ListiclePage`

## Related Modules

- [[Modules/Header and Navigation|Header and Navigation]] - inbound: global entry
- [[Modules/Vehicle Discovery|Vehicle Discovery]] - outbound: article and list links

## Related Flows

- [[Flows/Editorial to Shopping|Editorial to Shopping]]

## Audit Risks

- Editorial pages should keep heading order and article landmarks clean.
- Article links should bridge naturally into vehicle, rankings, and shopping modules.
