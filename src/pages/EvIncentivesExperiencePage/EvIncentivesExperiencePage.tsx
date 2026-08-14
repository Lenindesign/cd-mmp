import { Link } from 'react-router-dom';
import { SEO, createBreadcrumbStructuredData } from '../../components/SEO';
import { BEST_BUYING_DEALS_PATH, EV_INCENTIVES_PATH } from '../../constants/dealRoutes';
import './EvIncentivesExperiencePage.css';

const BASE_URL = 'https://www.caranddriver.com';

const visibilityItems = [
  {
    label: 'EV incentives landing page',
    body: 'The dedicated page collects programs across electric, plug-in hybrid, and hybrid vehicles. Shoppers can compare programs by vehicle, make, model, fuel type, and incentive type.',
  },
  {
    label: 'YMM vehicle pages',
    body: 'Eligible EV and hybrid MMPs surface a quiet EV & Hybrid Incentives link inside Special Deals and Incentives. The link carries make, model, and fuel context into the EV incentives page.',
  },
  {
    label: 'Deal cards',
    body: 'Each EV card uses the same deal-card structure as buy and lease pages, with an EV tag, an incentive-type badge, amount, source, eligibility, applicable trims, and a vehicle CTA.',
  },
  {
    label: 'Incentive details overlay',
    body: 'The overlay explains what the program means, who qualifies, eligible trims, timing, and the action a shopper can take next.',
  },
];

const taxonomyItems = [
  ['Vehicle Retirement', 'Programs tied to replacing or retiring an older vehicle.'],
  ['Rebate', 'Cash, charging, or clean-vehicle rebates that can reduce eligible costs.'],
  ['Financing', 'Loan, APR, or lease support tied to approval and eligible vehicles.'],
  ['Bill Credit', 'Utility account credits or post-purchase electric benefits.'],
  ['Tax Credit', 'Credits that may apply outside the negotiated vehicle price.'],
  ['Tax Exemption', 'Programs that may reduce eligible state or local taxes.'],
];

const benefitItems = [
  'Keeps shoppers from missing incentives that do not look like standard cash or lease offers.',
  'Makes eligibility visible before the shopper commits to a dealer conversation.',
  'Separates the incentive type from the vehicle deal, so a rebate, bill credit, or tax program does not get misread as a dealer discount.',
  'Gives EV and hybrid shoppers a path from editorial research into practical savings without adding pressure to the hero.',
];

const relationshipItems = [
  {
    label: 'Buying Deals',
    body: 'Buying deals focus on finance APR, cash back, and purchase incentives. EV incentives sit beside that flow when the program is specific to clean-vehicle ownership or eligibility.',
  },
  {
    label: 'Leasing Deals',
    body: 'Leasing deals remain the place for monthly payment and due-at-signing comparison. EV incentives can still support a lease, but the EV page explains the program separately.',
  },
  {
    label: 'EV Incentives',
    body: 'EV incentives are not a third shopping CTA in the vehicle hero. They are a supporting layer that clarifies programs a shopper may qualify for before choosing buy or lease.',
  },
];

const EvIncentivesExperiencePage = () => {
  return (
    <main className="ev-experience">
      <SEO
        title="EV Incentives Experience Guide"
        description="How the EV incentives experience works across landing cards, MMP pages, filters, and incentive overlays."
        canonical={`${BASE_URL}/ev-incentives-experience`}
        structuredData={createBreadcrumbStructuredData([
          { name: 'Home', url: BASE_URL },
          { name: 'EV Incentives Experience Guide', url: `${BASE_URL}/ev-incentives-experience` },
        ])}
      />

      <section className="ev-experience__hero">
        <div className="container ev-experience__hero-inner">
          <div className="ev-experience__hero-copy">
            <span className="ev-experience__eyebrow">Product explanation</span>
            <h1>EV incentives experience</h1>
            <p>
              The EV incentives experience helps shoppers understand clean-vehicle savings that may not appear in a standard buy or lease offer. It keeps the shopping path simple while making program eligibility easier to compare.
            </p>
            <div className="ev-experience__actions">
              <Link to={EV_INCENTIVES_PATH} className="ev-experience__button">View EV incentives</Link>
              <Link to="/2026/Kia/Sportage-Hybrid" className="ev-experience__button ev-experience__button--secondary">See MMP example</Link>
            </div>
          </div>

          <aside className="ev-experience__summary" aria-label="Experience summary">
            <span>Core logic</span>
            <strong>Show EV incentives when they add context, not as another competing hero action.</strong>
            <p>Use card badges, filters, and overlay copy to explain what the shopper may qualify for.</p>
          </aside>
        </div>
      </section>

      <section className="ev-experience__section">
        <div className="container ev-experience__two-column">
          <div>
            <span className="ev-experience__eyebrow">Where shoppers see it</span>
            <h2>One experience, several entry points</h2>
            <p>
              EV incentives appear where they help the shopper make sense of a deal. The system avoids a separate high-pressure CTA in the hero and uses contextual links, cards, filters, and overlays instead.
            </p>
          </div>
          <div className="ev-experience__list">
            {visibilityItems.map((item) => (
              <article key={item.label} className="ev-experience__list-item">
                <h3>{item.label}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="ev-experience__section ev-experience__section--tint">
        <div className="container">
          <div className="ev-experience__section-head">
            <span className="ev-experience__eyebrow">Incentive taxonomy</span>
            <h2>What the labels mean</h2>
            <p>
              The app uses the ticket taxonomy as shopper-facing labels, with Tax Credit and Tax Exemption included for acceptance criteria and future rows.
            </p>
          </div>
          <div className="ev-experience__taxonomy">
            {taxonomyItems.map(([label, body]) => (
              <article key={label} className="ev-experience__taxonomy-item">
                <span>{label}</span>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="ev-experience__section">
        <div className="container ev-experience__two-column ev-experience__two-column--reversed">
          <div className="ev-experience__benefits">
            {benefitItems.map((item) => (
              <p key={item}>{item}</p>
            ))}
          </div>
          <div>
            <span className="ev-experience__eyebrow">Shopper benefit</span>
            <h2>Why it helps</h2>
            <p>
              EV incentives often depend on location, provider, income rules, vehicle eligibility, utility participation, or tax treatment. The experience makes those differences visible before a shopper compares price or payment alone.
            </p>
          </div>
        </div>
      </section>

      <section className="ev-experience__section ev-experience__section--dark">
        <div className="container">
          <div className="ev-experience__section-head">
            <span className="ev-experience__eyebrow">Relationship to deals</span>
            <h2>How EV incentives fit with Buy and Lease</h2>
          </div>
          <div className="ev-experience__relationship">
            {relationshipItems.map((item) => (
              <article key={item.label}>
                <h3>{item.label}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="ev-experience__section">
        <div className="container ev-experience__handoff">
          <div>
            <span className="ev-experience__eyebrow">Implementation note</span>
            <h2>Keep the system focused</h2>
            <p>
              The landing page can show all eligible programs. The MMP should show only a contextual entry point. The card and overlay should explain the program details. The filter modal should help shoppers narrow by type, make, model, fuel type, and body style.
            </p>
          </div>
          <div className="ev-experience__handoff-actions">
            <Link to={EV_INCENTIVES_PATH} className="ev-experience__button">Open EV incentives</Link>
            <Link to={BEST_BUYING_DEALS_PATH} className="ev-experience__text-link">Compare buying deals</Link>
            <Link to="/deals/lease" className="ev-experience__text-link">Compare lease deals</Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default EvIncentivesExperiencePage;
