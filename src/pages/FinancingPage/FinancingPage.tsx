import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calculator, ChevronDown, ChevronRight, Clock, ShieldCheck, SlidersHorizontal } from 'lucide-react';
import PaymentCalculator from '../../components/PaymentCalculator/PaymentCalculator';
import { ArticleCard } from '../../components/Resin/ArticleCard';
import './FinancingPage.css';

const VALUE_PROPS = [
  {
    icon: <Clock size={24} />,
    title: 'Pre-Qualified in Minutes',
    text: 'Getting pre-qualified takes just 2 minutes, and your credit score will not be impacted.',
  },
  {
    icon: <ShieldCheck size={24} />,
    title: 'Qualify Regardless of Credit',
    text: "We'll show you our best available rates across all vehicles — even with less-than-perfect credit.",
  },
  {
    icon: <SlidersHorizontal size={24} />,
    title: 'Real Monthly Payments',
    text: "After pre-qualifying, you'll see real costs for our entire inventory. Your rates won't change for 30 days.",
  },
];

const ARTICLES = [
  {
    id: 'interest-rate',
    headline: 'How Interest Rates Affect Your Monthly Payment',
    image: 'https://hips.hearstapps.com/hmg-prod/images/gettyimages-1437816467-677e76f050508.jpg?crop=0.668xw:1.00xh;0.187xw,0&resize=700:*',
    category: 'Financing Guide',
    href: '/news/interest-rates-monthly-payment',
  },
  {
    id: 'credit-score',
    headline: 'How Your Credit Score Impacts Auto Loan Rates',
    image: 'https://hips.hearstapps.com/hmg-prod/images/close-up-of-hands-holding-car-key-royalty-free-image-1689024142.jpg?crop=0.668xw:1.00xh;0.167xw,0&resize=700:*',
    category: "Buyer's Guide",
    href: '/news/credit-score-auto-loan-rates',
  },
  {
    id: 'loan-term',
    headline: 'Choosing the Right Loan Term: 36 vs 60 vs 72 Months',
    image: 'https://hips.hearstapps.com/hmg-prod/images/2024-toyota-camry-xse-fwd-276-65f4abd5a30c6.jpg?crop=0.632xw:0.534xh;0.140xw,0.281xh&resize=700:*',
    category: 'Financing Guide',
    href: '/news/choosing-right-loan-term',
  },
];

const FAQ_ITEMS = [
  {
    question: 'How does interest rate impact your monthly payment?',
    answer: 'The interest rate directly affects how much you pay over the life of the loan. A lower rate means a lower monthly payment and less total interest paid. For example, on a $30,000 loan over 60 months, the difference between a 4% and 7% rate is roughly $45/month — or over $2,700 total.',
  },
  {
    question: 'How does your credit score impact your monthly payment?',
    answer: 'Your credit score is one of the biggest factors lenders use to determine your interest rate. Borrowers with excellent credit (740+) typically qualify for rates around 4–5%, while fair credit (580–669) may see rates of 10–12%. Improving your score before applying can save you thousands over the loan term.',
  },
  {
    question: 'What is the usual loan term for an auto loan?',
    answer: 'The most common auto loan terms are 60 months (5 years) and 72 months (6 years). Shorter terms like 36 or 48 months mean higher monthly payments but less total interest. Longer terms like 84 months lower your payment but increase total cost and risk of being upside-down on the loan.',
  },
  {
    question: 'How does a trade-in potentially impact your monthly payment?',
    answer: "A trade-in reduces the amount you need to finance. If your trade-in is worth $5,000 on a $30,000 vehicle, you'd only finance $25,000 — lowering your monthly payment by roughly $80–$100/month depending on your rate and term. It can also reduce sales tax in most states.",
  },
  {
    question: 'How do you calculate monthly car payments?',
    answer: 'Monthly car payments are calculated using the loan amount (vehicle price minus down payment and trade-in), the annual interest rate divided by 12, and the number of monthly payments. The formula is: M = P × [r(1+r)^n] / [(1+r)^n – 1], where P is principal, r is monthly rate, and n is the number of payments.',
  },
];

const FinancingPage = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="financing-page">
      {/* Hero */}
      <section className="financing__hero">
        <div className="container financing__hero-content">
          <div className="financing__hero-eyebrow">
            <Calculator size={14} />
            Car Payment Calculator
          </div>
          <h1 className="financing__hero-title">Calculate Your Monthly Car Payment</h1>
          <p className="financing__hero-subtitle">
            Estimate finance, lease, and cash payments. Adjust your down payment, credit score, and term to find the right budget.
          </p>
        </div>
      </section>

      {/* Payment Calculator */}
      <section className="financing__calculator">
        <div className="container">
          <PaymentCalculator
            msrp={21895}
            vehicleName="2025 Chevrolet Trax"
          />
        </div>
      </section>

      {/* Value Props */}
      <section className="financing__value-props">
        <div className="container">
          <h2 className="financing__value-props-title">Why Finance With Car &amp; Driver?</h2>
          <div className="financing__value-grid">
            {VALUE_PROPS.map((prop) => (
              <div key={prop.title} className="financing__value-card">
                <div className="financing__value-icon">{prop.icon}</div>
                <h3 className="financing__value-card-title">{prop.title}</h3>
                <p className="financing__value-card-text">{prop.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Articles */}
      <section className="financing__articles">
        <div className="container">
          <div className="financing__articles-header">
            <h2 className="financing__articles-title">Things to Know About Financing a Vehicle</h2>
            <Link to="/news" className="financing__articles-link">
              All Articles <ChevronRight size={16} />
            </Link>
          </div>
          <div className="financing__articles-grid">
            {ARTICLES.map((article) => (
              <ArticleCard
                key={article.id}
                imageUrl={article.image}
                imageAlt={article.headline}
                headline={article.headline}
                sponsor={article.category}
                href={article.href}
                variant="vertical"
                aspectRatio="landscape"
              />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="financing__faq">
        <div className="container">
          <h2 className="financing__faq-title">FAQs</h2>
          <div className="financing__faq-list">
            {FAQ_ITEMS.map((item, idx) => (
              <div key={idx} className="financing__faq-item">
                <button
                  className="financing__faq-question"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                >
                  {item.question}
                  <ChevronDown
                    size={18}
                    className={`financing__faq-chevron ${openFaq === idx ? 'financing__faq-chevron--open' : ''}`}
                  />
                </button>
                <div className={`financing__faq-answer ${openFaq === idx ? 'financing__faq-answer--open' : ''}`}>
                  <p>{item.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default FinancingPage;
