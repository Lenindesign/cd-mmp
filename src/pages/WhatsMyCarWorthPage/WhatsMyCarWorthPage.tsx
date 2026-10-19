import { useMemo, useState, type FormEvent } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { vehicleDatabase } from '../../data/vehicles';
import { CpoOpportunityCallout } from '../../components/CpoOpportunityCallout/CpoOpportunityCallout';
import { getCpoAssessment } from '../../utils/cpoEligibility';
import type { Vehicle } from '../../types/vehicle';
import './WhatsMyCarWorthClone.css';

type EstimateData = { year: string; make: string; model: string; mileage: number; condition: string };

const faqs = [
  ['How is my vehicle’s value calculated?', 'The estimate considers the vehicle’s year, make, model, mileage, condition, equipment and current market activity. A final offer can vary after an in-person inspection.'],
  ['How accurate are these vehicle values?', 'An online estimate is a useful starting point. Local demand, vehicle history and inspection results can change the amount a buyer is willing to pay.'],
  ['Can I trade in a car that isn’t paid off?', 'Often, yes. The remaining loan balance is compared with the trade-in offer. Your lender can provide the exact payoff amount.'],
  ['Is it better to trade in my car or sell it myself?', 'A trade-in is usually more convenient and may reduce the taxable purchase price in some states. A private sale may bring a higher price but takes more time.'],
  ['Does my location affect my car’s value?', 'Yes. Regional supply, demand, weather and preferences can affect the price buyers will pay for a particular vehicle.'],
  ['Can I value a classic car here?', 'This estimator is designed for everyday passenger vehicles. Specialty, collector and classic cars may need an appraisal from a specialist.'],
  ['How quickly does a car depreciate?', 'Depreciation varies by vehicle and market. Mileage, age, condition, ownership history and demand all influence how quickly value changes.'],
];

const articles = [
  ['How Car Trade-Ins Work', 'A practical guide to the appraisal and paperwork process.'],
  ['How to Get the Best Trade-In Offer', 'Simple steps that can help you prepare before visiting a dealer.'],
  ['How to Trade In a Car in 5 Steps', 'What to gather and what to expect from start to finish.'],
  ['Trading In a Car With a Loan', 'Understand payoff amounts, equity and the next steps.'],
];

function Estimator({ onEstimate }: { onEstimate: (data: EstimateData) => void }) {
  const [step, setStep] = useState(1);
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<Vehicle | null>(null);
  const [manual, setManual] = useState(false);
  const [year, setYear] = useState('');
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [mileage, setMileage] = useState('');
  const [zip, setZip] = useState('');
  const [nextType, setNextType] = useState<'NEW CARS' | 'USED CARS'>('NEW CARS');
  const [nextMake, setNextMake] = useState('');
  const [nextModel, setNextModel] = useState('');
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return vehicleDatabase.filter(v => `${v.year} ${v.make} ${v.model} ${v.trim ?? ''}`.toLowerCase().includes(q)).slice(0, 8);
  }, [query]);
  const years = Array.from({ length: 16 }, (_, i) => String(2026 - i));
  const makes = [...new Set(vehicleDatabase.map(v => v.make))].sort();
  const models = [...new Set(vehicleDatabase.filter(v => !make || v.make === make).map(v => v.model))].sort();
  const chosenMake = selected?.make ?? make;
  const nextMakes = [...new Set(vehicleDatabase.map(v => v.make))].sort();
  const nextModels = [...new Set(vehicleDatabase.filter(v => !nextMake || v.make === nextMake).map(v => v.model))].sort();

  function proceed(event: FormEvent) {
    event.preventDefault();
    if (!selected && !(year && make && model)) return;
    setStep(2);
  }
  function finish(event: FormEvent) {
    event.preventDefault();
    const car = selected ?? vehicleDatabase.find(v => v.year === year && v.make === make && v.model === model);
    const selectedYear = car?.year ?? year;
    const selectedMake = car?.make ?? make;
    const selectedModel = car?.model ?? model;
    if (!selectedYear || !selectedMake || !selectedModel) return;
    onEstimate({ year: selectedYear, make: selectedMake, model: selectedModel, mileage: Number(mileage), condition: 'good' });
  }
  const chosenYear = selected?.year ?? year;
  const chosenModel = selected?.model ?? model;
  const carName = `${chosenYear} ${chosenMake} ${chosenModel}`;
  const cpoAssessment = chosenYear && chosenMake && chosenModel && mileage !== ''
    ? getCpoAssessment(Number(chosenYear), chosenMake, Number(mileage))
    : null;

  return <section className="bb-estimator" aria-label="Car value estimator">
    <nav className="bb-progress" aria-label="Estimator steps">
      {[['1', 'YOUR VEHICLE'], ['2', 'YOUR OPTIONS'], ['3', 'YOUR NEXT VEHICLE']].map(([n, label], i) => <button type="button" key={n} className={`bb-progress__step ${step === i + 1 ? 'is-active' : ''} ${step > i + 1 ? 'is-complete' : ''}`} onClick={() => step > i + 1 && setStep(i + 1)} aria-current={step === i + 1 ? 'step' : undefined}>
        <span className="bb-progress__number">{step > i + 1 ? <Check size={14} /> : n}</span><span>{label}</span>
      </button>)}
    </nav>
    <p className="bb-note">Note: * indicates a required field.</p>

    {step === 1 && <form className="bb-form" onSubmit={proceed}>
      <label className="bb-field bb-field--wide"><span>Current Vehicle*</span>
        {!manual ? <div className="bb-autocomplete"><input required value={selected ? carName : query} onChange={e => { setQuery(e.target.value); setSelected(null); }} placeholder="Enter year, make and model" autoComplete="off" aria-label="Current vehicle" />
          {results.length > 0 && !selected && <ul className="bb-suggestions">{results.map(v => <li key={v.id}><button type="button" onClick={() => { setSelected(v); setQuery(''); }}>{v.year} {v.make} {v.model}{v.trim ? ` ${v.trim}` : ''}</button></li>)}</ul>}
        </div> : <div className="bb-manual-grid">
          <select required value={year} onChange={e => { setYear(e.target.value); setMake(''); setModel(''); }} aria-label="Vehicle year"><option value="">Select year</option>{years.map(y => <option key={y}>{y}</option>)}</select>
          <select required value={make} onChange={e => { setMake(e.target.value); setModel(''); }} aria-label="Vehicle make"><option value="">Select make</option>{makes.map(m => <option key={m}>{m}</option>)}</select>
          <select required value={model} onChange={e => setModel(e.target.value)} aria-label="Vehicle model"><option value="">Select model</option>{models.map(m => <option key={m}>{m}</option>)}</select>
          <select aria-label="Vehicle series"><option value="">Select series</option>{[...new Set(vehicleDatabase.filter(v => v.make === make && v.model === model).map(v => v.trim).filter(Boolean))].map(t => <option key={t}>{t}</option>)}</select>
          <select aria-label="Vehicle style"><option value="">Select style</option>{[...new Set(vehicleDatabase.filter(v => v.make === make && v.model === model).map(v => v.bodyStyle))].map(t => <option key={t}>{t}</option>)}</select>
        </div>}
      </label>
      <button type="button" className="bb-text-link" onClick={() => { setManual(!manual); setSelected(null); setQuery(''); }}>Can’t find your car? Click to {manual ? 'search for it' : 'enter your car’s info'}</button>
      <div className="bb-two-col">
        <label className="bb-field"><span>Mileage*</span><div className="bb-suffix"><input required inputMode="numeric" type="number" min="0" max="999999" value={mileage} onChange={e => setMileage(e.target.value)} placeholder="e.g. 45,000" /><span>miles</span></div></label>
        <label className="bb-field"><span>ZIP Code*</span><input required inputMode="numeric" pattern="[0-9]{5}" maxLength={5} value={zip} onChange={e => setZip(e.target.value)} placeholder="Enter ZIP code" /></label>
      </div>
      {cpoAssessment && <CpoOpportunityCallout assessment={cpoAssessment} placement="input" />}
      <button className="bb-primary" type="submit">NEXT: VEHICLE OPTIONS <span aria-hidden>→</span></button>
    </form>}

    {step === 2 && <div className="bb-step-panel">
      <h2>{carName}</h2><p>We’ve included the standard features for this vehicle in your estimate. No additional equipment is needed to continue.</p>
      <div className="bb-step-actions"><button type="button" className="bb-secondary" onClick={() => setStep(1)}>BACK</button><button type="button" className="bb-primary" onClick={() => setStep(3)}>NEXT: YOUR NEXT VEHICLE <span aria-hidden>→</span></button></div>
    </div>}

    {step === 3 && <form className="bb-form bb-contact-form" onSubmit={finish}>
      <h2>We Have Your Value Ready!</h2><p>Enter your details to continue to your estimate. Your information stays in this browser and is not sent to a dealer.</p>
      <div className="bb-two-col">
        <label className="bb-field"><span>First Name*</span><input required autoComplete="given-name" /></label>
        <label className="bb-field"><span>Last Name*</span><input required autoComplete="family-name" /></label>
        <label className="bb-field"><span>Phone Number*</span><input required type="tel" autoComplete="tel" /></label>
        <label className="bb-field"><span>Email*</span><input required type="email" autoComplete="email" /></label>
      </div>
      <h3>You’re Almost There!</h3><p>What type of vehicle are you considering next?</p>
      <div className="bb-toggle" role="group" aria-label="Next vehicle type">{(['NEW CARS', 'USED CARS'] as const).map(t => <button type="button" key={t} className={nextType === t ? 'is-selected' : ''} onClick={() => setNextType(t)}>{t}</button>)}</div>
      <div className="bb-two-col">
        <label className="bb-field"><span>Make*</span><select required value={nextMake} onChange={e => { setNextMake(e.target.value); setNextModel(''); }}><option value="">Select make</option>{nextMakes.map(m => <option key={m}>{m}</option>)}</select></label>
        <label className="bb-field"><span>Model*</span><select required value={nextModel} onChange={e => setNextModel(e.target.value)} disabled={!nextMake}><option value="">Select model</option>{nextModels.map(m => <option key={m}>{m}</option>)}</select></label>
      </div>
      <p className="bb-disclosure">By continuing, you agree that the information entered is used only to prepare this local demo estimate. No calls, texts, emails, or dealer referrals are initiated.</p>
      <div className="bb-step-actions"><button type="button" className="bb-secondary" onClick={() => setStep(2)}>BACK</button><button className="bb-primary" type="submit">GET YOUR ESTIMATE <span aria-hidden>→</span></button></div>
    </form>}
  </section>;
}

const WhatsMyCarWorthPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const handleEstimate = (data: EstimateData) => {
    const params = new URLSearchParams({ year: data.year, make: data.make, model: data.model, mileage: String(data.mileage), condition: data.condition });
    navigate(`/whats-my-car-worth/results?${params.toString()}`);
  };
  return <main className="value-page">
    <header className="value-intro"><h1>What’s My Car Worth?</h1><p>Find out what your vehicle could be worth in today’s market. Share a few details to get an estimate informed by vehicle and market data.</p></header>
    <Estimator onEstimate={handleEstimate} />
    <section className="value-faq"><h2>Frequently Asked Questions</h2><div>{faqs.map(([question, answer]) => <details key={question}><summary>{question}<ChevronDown size={20} aria-hidden /></summary><p>{answer}</p></details>)}</div></section>
    <section className="value-newsletter"><div><p className="value-eyebrow">THINKING OF SELLING YOUR CAR?</p><h2>Get the latest in all things auto financing.</h2></div>
      <form onSubmit={e => { e.preventDefault(); setSubscribed(true); }}><label className="sr-only" htmlFor="value-newsletter-email">Email address</label><input id="value-newsletter-email" type="email" required placeholder="Email address" value={email} onChange={e => setEmail(e.target.value)} /><button type="submit">{subscribed ? 'THANK YOU' : 'LET’S GO'}</button></form>
      <small>This form is a local preview. It does not subscribe or transmit your email address.</small>
    </section>
    <section className="value-stories"><p className="value-eyebrow">CAR-SHOPPING SECRETS</p><h2>Make your next move with confidence.</h2><div className="value-stories__grid">{articles.map(([title, copy], i) => <a key={title} href={`/news?topic=car-trade-in-${i + 1}`}><span>CAR BUYING GUIDE</span><h3>{title}</h3><p>{copy}</p><b>READ MORE →</b></a>)}</div></section>
  </main>;
};

export default WhatsMyCarWorthPage;
