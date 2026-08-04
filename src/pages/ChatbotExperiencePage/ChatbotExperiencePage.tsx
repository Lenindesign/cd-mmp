import {
  Bot,
  BrainCircuit,
  CheckCircle2,
  Database,
  ExternalLink,
  MessageCircle,
  MousePointerClick,
  Route,
  Settings2,
  ShieldCheck,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { CarFinderChat } from '../../components/CarFinderChat';
import './ChatbotExperiencePage.css';

const offerItems = [
  {
    icon: MessageCircle,
    title: 'Guided shopping conversations',
    body: 'The assistant lets shoppers describe needs in everyday language, including budget, body style, fuel type, family use, towing, performance, or favorite brands.',
  },
  {
    icon: Database,
    title: 'Vehicle recommendations',
    body: 'Responses are matched against the local vehicle database, then ranked by editorial signals like staff rating, Editor\'s Choice, and 10Best status.',
  },
  {
    icon: MousePointerClick,
    title: 'Clickable result cards',
    body: 'Recommended vehicles appear as compact cards, so a shopper can move from a chat answer into a vehicle detail page without starting over.',
  },
  {
    icon: Settings2,
    title: 'User-controlled visibility',
    body: 'The footer activates or deactivates the chatbot, and that preference is saved locally so the feature stays quiet until the shopper asks for it.',
  },
];

const buildSteps = [
  'Create a persistent enable or disable setting, usually with localStorage or an account preference.',
  'Place the activation control in a stable location such as the footer, header utility menu, or help area.',
  'Render the chat only when the setting is active so it does not compete with core page tasks.',
  'Start with structured intent parsing: budget, category, location, brand, product type, or task goal.',
  'Search a trusted product or content dataset, then rank the results using business rules and quality signals.',
  'Generate a short response, show supporting result cards, and let users continue the conversation.',
  'Add analytics, feedback, and clear fallbacks before connecting a live LLM or external assistant API.',
];

const architectureItems = [
  {
    eyebrow: 'State',
    title: 'Global chatbot preference',
    body: 'A React context stores whether the shopper has activated the assistant. The current implementation persists that value as cd_mmp_car_finder_enabled.',
  },
  {
    eyebrow: 'Gate',
    title: 'Conditional app rendering',
    body: 'The app shell checks that preference and renders the floating Car Finder Chat only on normal browsing pages.',
  },
  {
    eyebrow: 'Logic',
    title: 'Rule-based recommendation engine',
    body: 'The prototype reads the shopper message, extracts simple buying signals, filters vehicles, and creates a scripted assistant answer.',
  },
  {
    eyebrow: 'Interface',
    title: 'Reusable chat component',
    body: 'The chat component owns messages, suggested prompts, typing state, feedback, result cards, reset, expand, minimize, and close controls.',
  },
];

const ChatbotExperiencePage = () => {
  return (
    <div className="chatbot-experience">
      <section className="chatbot-experience__hero">
        <div className="container chatbot-experience__hero-inner">
          <div className="chatbot-experience__hero-copy">
            <span className="chatbot-experience__eyebrow">
              <Bot size={16} aria-hidden />
              Prototype guide
            </span>
            <h1>Car Finder chatbot experience</h1>
            <p>
              A practical guide to how the Car and Driver shopping assistant works, what it offers shoppers, and how a similar feature can be added to another website.
            </p>
            <div className="chatbot-experience__hero-actions" aria-label="Page shortcuts">
              <a href="#experience" className="chatbot-experience__button">Try the experience</a>
              <a href="#implementation" className="chatbot-experience__button chatbot-experience__button--secondary">Implementation guide</a>
            </div>
          </div>

          <div className="chatbot-experience__hero-panel" aria-label="Chatbot summary">
            <div className="chatbot-experience__panel-header">
              <BrainCircuit size={20} aria-hidden />
              <span>How it works</span>
            </div>
            <ol className="chatbot-experience__flow-list">
              <li>Shopper asks for a vehicle in natural language.</li>
              <li>The app detects budget, category, fuel type, and priorities.</li>
              <li>Local vehicle data is filtered and ranked.</li>
              <li>The assistant returns a short answer plus clickable vehicle cards.</li>
            </ol>
          </div>
        </div>
      </section>

      <section id="experience" className="chatbot-experience__section">
        <div className="container chatbot-experience__experience-grid">
          <div className="chatbot-experience__section-copy">
            <span className="chatbot-experience__eyebrow">Experience</span>
            <h2>What the shopper sees</h2>
            <p>
              The assistant starts with suggested prompts and a simple input. It is designed for shoppers who may not know the exact model they want yet, but can explain a need like a family SUV, an electric commuter, or a truck for towing.
            </p>
            <p>
              In the live app, the footer link activates the floating version. This page embeds the same component so teams can review the interaction directly.
            </p>
          </div>

          <div className="chatbot-experience__demo-shell">
            <CarFinderChat
              defaultOpen
              onVehicleSelect={() => undefined}
            />
          </div>
        </div>
      </section>

      <section className="chatbot-experience__section chatbot-experience__section--gray">
        <div className="container">
          <div className="chatbot-experience__section-heading">
            <span className="chatbot-experience__eyebrow">Capabilities</span>
            <h2>What it offers</h2>
          </div>

          <div className="chatbot-experience__offer-grid">
            {offerItems.map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.title} className="chatbot-experience__offer-card">
                  <Icon size={22} aria-hidden />
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="chatbot-experience__section">
        <div className="container">
          <div className="chatbot-experience__section-heading">
            <span className="chatbot-experience__eyebrow">Architecture</span>
            <h2>How this prototype is built</h2>
            <p>
              The current version is client-side and rule-based. It is a polished prototype pattern that can later be connected to a live assistant service without replacing the whole interface.
            </p>
          </div>

          <div className="chatbot-experience__architecture-grid">
            {architectureItems.map((item) => (
              <article key={item.title} className="chatbot-experience__architecture-card">
                <span>{item.eyebrow}</span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="implementation" className="chatbot-experience__section chatbot-experience__section--dark">
        <div className="container chatbot-experience__implementation-grid">
          <div className="chatbot-experience__section-copy">
            <span className="chatbot-experience__eyebrow">Implementation</span>
            <h2>How to build something similar</h2>
            <p>
              The same structure works for vehicle shopping, retail catalogs, travel planning, customer support, editorial archives, or account guidance. The important part is separating the experience layer from the recommendation logic.
            </p>
          </div>

          <ol className="chatbot-experience__step-list">
            {buildSteps.map((step) => (
              <li key={step}>
                <CheckCircle2 size={18} aria-hidden />
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="chatbot-experience__section">
        <div className="container chatbot-experience__handoff">
          <div>
            <span className="chatbot-experience__eyebrow">
              <ShieldCheck size={16} aria-hidden />
              Production checklist
            </span>
            <h2>Before shipping on another website</h2>
            <p>
              Make the data source trustworthy, show when the assistant is making a recommendation, include a clear close or deactivate path, capture feedback, and provide a plain fallback when the assistant cannot answer confidently.
            </p>
          </div>
          <Link to="/" className="chatbot-experience__button chatbot-experience__button--inline">
            Return to site
            <Route size={16} aria-hidden />
          </Link>
          <a href="#experience" className="chatbot-experience__text-link">
            Review the embedded demo
            <ExternalLink size={14} aria-hidden />
          </a>
        </div>
      </section>
    </div>
  );
};

export default ChatbotExperiencePage;
