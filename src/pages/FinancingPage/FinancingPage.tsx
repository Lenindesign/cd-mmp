import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronUp, ChevronRight } from 'lucide-react';
import BuyingPotential from '../../components/BuyingPotential/BuyingPotential';
import { ArticleCard } from '../../components/Resin/ArticleCard';
import './FinancingPage.css';

const ARTICLES = [
  {
    id: 'interest-rate',
    headline: 'How Interest Rates Affect Your Monthly Payment',
    image: 'https://hips.hearstapps.com/hmg-prod/images/loving-car-driver-decisions-decisions-6761eb879566a.jpg?crop=0.915xw:0.764xh;0.0493xw,0.123xh',
    category: 'Financing Guide',
    href: '/news/interest-rates-monthly-payment',
  },
  {
    id: 'credit-score',
    headline: 'How Your Credit Score Impacts Auto Loan Rates',
    image: 'https://hips.hearstapps.com/hmg-prod/images/04022026-belicta-castelbarco-illustration-collage-car-s-drivers-kopie-kopie-69839f1af3da4.jpg?crop=1.00xw:0.565xh;0,0.209xh&resize=2048:*',
    category: "Buyer's Guide",
    href: '/news/credit-score-auto-loan-rates',
  },
  {
    id: 'loan-term',
    headline: 'Choosing the Right Loan Term: 36 vs 60 vs 72 Months',
    image: 'https://hips.hearstapps.com/hmg-prod/images/loving-car-driver-under-pressure-6761cc7dc7272.jpg?crop=1.00xw:0.766xh;0,0.130xh&resize=2048:*',
    category: 'Financing Guide',
    href: '/news/choosing-right-loan-term',
  },
];

const FAQ_ITEMS = [
  {
    question: 'How does interest rate impact your monthly payment?',
    answer: 'The interest rate directly affects how much you pay over the life of the loan. A lower rate means a lower monthly payment and less total interest paid. For example, on a $30,000 loan over 60 months, the difference between a 4% and 7% rate is roughly $45/month - or over $2,700 total.',
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
    answer: "A trade-in reduces the amount you need to finance. If your trade-in is worth $5,000 on a $30,000 vehicle, you'd only finance $25,000 - lowering your monthly payment by roughly $80–$100/month depending on your rate and term. It can also reduce sales tax in most states.",
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
      {/* Buying Power Calculator */}
      <section className="financing__calculator">
        <BuyingPotential />
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
      <section className="financing__faq-section" aria-labelledby="financing-faq-heading">
        <div className="container">
          <h2 id="financing-faq-heading" className="financing__faq-heading">FAQs</h2>
          <div className="financing__faq-list">
            {FAQ_ITEMS.map((item, idx) => (
              <div key={idx} className={`financing__faq-item ${openFaq === idx ? 'financing__faq-item--expanded' : ''}`}>
                <button
                  type="button"
                  className="financing__faq-question"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  aria-expanded={openFaq === idx}
                >
                  <span className="financing__faq-question-text">{item.question}</span>
                  {openFaq === idx ? <ChevronUp size={24} aria-hidden /> : <ChevronDown size={24} aria-hidden />}
                </button>
                {openFaq === idx && (
                  <div className="financing__faq-answer">
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default FinancingPage;
