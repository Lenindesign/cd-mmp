import { ArrowRight, BadgeCheck, Check, CircleHelp, Info } from 'lucide-react';
import './CpoIntegrationPage.css';

const journey = [
  {
    step: '01',
    name: 'Your vehicle',
    timing: 'Show after make, model, year, and mileage are known',
    why: 'This is the first moment the estimate can determine whether a brand program may be relevant. The message feels tied to the shopper’s car, not like a generic upsell.',
    placement: 'Below the vehicle and mileage fields, before the Next button',
    kind: 'primary',
  },
  {
    step: '02',
    name: 'Your options',
    timing: 'Reinforce briefly only when the vehicle still passes the initial screen',
    why: 'A short reminder keeps the opportunity connected to the trade-in while the shopper reviews details. Repeating the full card adds clutter and can feel pushy.',
    placement: 'As a one-line note under the vehicle/options summary, above Back and Next',
    kind: 'reminder',
  },
  {
    step: '03',
    name: 'Your next vehicle',
    timing: 'Do not repeat the CPO pitch beside personal or next-car fields',
    why: 'This step asks for contact and replacement-vehicle details. Another callout can distract from completion and confuse the current trade-in with the next car.',
    placement: 'Keep the form focused. Offer the dealer question after the estimate is ready.',
    kind: 'defer',
  },
];

const journeys = [
  {
    title: 'Recommended: progressive, one primary message',
    badge: 'Best balance for conversion',
    body: 'Introduce CPO when eligibility becomes relevant, reduce it to a reminder on the options step, then move the dealer action to the results. Keep every action optional.',
    sequence: ['Step 1: full, brand-specific opportunity card', 'Step 2: compact reminder, only if eligible', 'Step 3: no added CPO content; preserve form completion', 'Results: optional “Ask a [Brand] dealer to evaluate it” action'],
  },
  {
    title: 'Low-friction: show it once',
    badge: 'Good for editorial funnels',
    body: 'Show one useful, concise message after the initial eligibility screen, then wait until the shopper has their estimate before suggesting dealer follow-up.',
    sequence: ['Step 1: short eligibility card', 'Step 2: no repeat', 'Step 3: no repeat', 'Results: brand-specific dealer next step'],
  },
  {
    title: 'OEM-led: add program detail by request',
    badge: 'Good for OEM destinations',
    body: 'Keep the main journey short. Let interested shoppers expand program benefits or open the manufacturer’s official CPO details without forcing a detour.',
    sequence: ['Step 1: eligibility card with “How CPO works” disclosure', 'Step 2: no repeated explanation', 'Step 3: preserve the estimate form', 'Results: official program and dealer locator links'],
  },
];

const CpoIntegrationPage = () => (
  <main className="cpo-integration">
    <div className="container">
      <header className="cpo-integration__header">
        <span className="cpo-integration__eyebrow">Journey UX review · CPO</span>
        <h1>Where the CPO message belongs</h1>
        <p>Use the shopper’s current vehicle to introduce a relevant dealer resale path, then protect momentum through the rest of the estimate.</p>
      </header>

      <section className="cpo-integration__definition" aria-label="CPO in plain language">
        <div className="cpo-integration__definition-icon"><BadgeCheck size={23} aria-hidden /></div>
        <div>
          <span>Why this is useful</span>
          <p><strong>Certified Pre-Owned (CPO)</strong> is a used vehicle that a participating dealer has checked against its automaker’s program standards. If this car may fit its brand’s program, the shopper can ask that brand’s dealer to evaluate it for resale.</p>
          <small>That can create another possible path for the car. It does not mean the car is certified or guarantee a higher trade-in offer.</small>
        </div>
      </section>

      <section className="cpo-integration__journey-section">
        <div className="cpo-integration__section-heading">
          <span className="cpo-integration__eyebrow">Recommended placement</span>
          <h2>Progressive disclosure across the three steps</h2>
          <p>Give the full context at the first relevant moment, then reduce or defer the message as the shopper moves toward the estimate.</p>
        </div>
        <div className="cpo-integration__stepper" aria-label="Estimator steps">
          {journey.map((item, index) => (
            <div className="cpo-integration__stepper-item" key={item.step}>
              <span>{item.step}</span><strong>{item.name}</strong>
              {index < journey.length - 1 && <i aria-hidden="true" />}
            </div>
          ))}
        </div>

        <div className="cpo-integration__step-list">
          {journey.map((item) => (
            <article className={`cpo-integration__step cpo-integration__step--${item.kind}`} key={item.step}>
              <div className="cpo-integration__step-copy">
                <span className="cpo-integration__step-title">Step {item.step} · {item.name}</span>
                <h3>{item.timing}</h3>
                <p>{item.why}</p>
                <div className="cpo-integration__placement"><Info size={16} aria-hidden /><span><strong>Place it:</strong> {item.placement}</span></div>
              </div>
              <div className="cpo-integration__mock" aria-label={`Sample message for ${item.name}`}>
                {item.kind === 'primary' && (
                  <div className="cpo-integration__sample-form">
                    <div className="cpo-integration__sample-fields">
                      <span>Current vehicle <strong>2026 Honda Accord</strong></span>
                      <span>Mileage <strong>11,000 miles</strong></span>
                    </div>
                    <div className="cpo-integration__callout">
                      <BadgeCheck size={23} aria-hidden />
                      <div>
                        <span className="cpo-integration__callout-label">CPO OPPORTUNITY</span>
                        <h4>Your Honda may qualify for HondaTrue Certified</h4>
                        <p>Its age and mileage fit the initial screen. A participating Honda dealer checks the vehicle history and completes an inspection before it can be certified.</p>
                        <small>Eligibility is preliminary. Certification does not guarantee a higher trade-in offer.</small>
                      </div>
                    </div>
                    <div className="cpo-integration__sample-next">NEXT: VEHICLE OPTIONS <ArrowRight size={14} aria-hidden /></div>
                  </div>
                )}
                {item.kind === 'reminder' && (
                  <div className="cpo-integration__sample-form">
                    <div className="cpo-integration__options-summary">
                      <strong>2026 Honda Accord</strong>
                      <span>Standard features are included in your estimate.</span>
                    </div>
                    <div className="cpo-integration__reminder">
                      <BadgeCheck size={19} aria-hidden />
                      <p><strong>Potential CPO path:</strong> A participating Honda dealer can check whether your Accord meets HondaTrue Certified requirements.</p>
                    </div>
                    <div className="cpo-integration__sample-next">NEXT: YOUR NEXT VEHICLE <ArrowRight size={14} aria-hidden /></div>
                  </div>
                )}
                {item.kind === 'defer' && (
                  <div className="cpo-integration__form-sample">
                    <div className="cpo-integration__form-heading"><strong>You’re almost there</strong><span>Next vehicle details</span></div>
                    <div className="cpo-integration__fake-field">First and last name</div>
                    <div className="cpo-integration__fake-field">What vehicle are you considering next?</div>
                    <div className="cpo-integration__fake-button">GET MY ESTIMATE <ArrowRight size={15} aria-hidden /></div>
                    <small><Check size={14} aria-hidden /> No extra CPO field or required choice</small>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="cpo-integration__journey-options">
        <div className="cpo-integration__section-heading">
          <span className="cpo-integration__eyebrow">Journey alternatives</span>
          <h2>Choose the amount of CPO presence by site</h2>
          <p>The progressive journey is the recommended default. These patterns let teams tune the experience without changing its core rules.</p>
        </div>
        <div className="cpo-integration__option-grid">
          {journeys.map((option, index) => (
            <article className={`cpo-integration__option${index === 0 ? ' cpo-integration__option--recommended' : ''}`} key={option.title}>
              <span>{option.badge}</span>
              <h3>{option.title}</h3>
              <p>{option.body}</p>
              <ol>{option.sequence.map((line) => <li key={line}>{line}</li>)}</ol>
            </article>
          ))}
        </div>
      </section>

      <section className="cpo-integration__scale">
        <div>
          <span className="cpo-integration__eyebrow">Cross-brand content model</span>
          <h2>Same placement logic, relevant brand language</h2>
        </div>
        <div className="cpo-integration__scale-copy">
          <p><strong>OEM site:</strong> Use that automaker’s official program name, eligibility rules, benefits, and dealer locator.</p>
          <p><strong>Car and Driver / MotorTrend:</strong> Keep the explanation neutral, identify the current vehicle’s matching brand program, and let shoppers compare dealer offers.</p>
          <p><strong>Across all sites:</strong> Use one reusable content pattern with verified program data by make. A dealer primarily certifies vehicles for its own brand, so never show an unrelated certification badge or promise eligibility.</p>
        </div>
      </section>

      <section className="cpo-integration__conversion">
        <div className="cpo-integration__conversion-icon"><CircleHelp size={22} aria-hidden /></div>
        <div>
          <span className="cpo-integration__eyebrow">Conversion recommendation</span>
          <h2>Help the shopper finish their estimate first</h2>
          <p>Show one clear opportunity card at Step 1, a short reminder at Step 2 only when useful, and no extra action in Step 3. Put the optional dealer follow-up after the estimate, when the shopper has received the value they came for.</p>
        </div>
        <div className="cpo-integration__conversion-points">
          <span><Check size={15} aria-hidden /> No added required fields</span>
          <span><Check size={15} aria-hidden /> No price-premium promise</span>
          <span><Check size={15} aria-hidden /> Brand-specific dealer action</span>
        </div>
      </section>
    </div>
  </main>
);

export default CpoIntegrationPage;
