import { ArrowRight, Car } from 'lucide-react';
import './TradeInPrompt.css';

interface TradeInPromptProps {
  vehicleName: string;
  msrp: number;
}

const fmt = (n: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);

const TradeInPrompt = ({ vehicleName, msrp }: TradeInPromptProps) => {
  const estimatedPayment = Math.round(msrp / 60);

  return (
    <section className="trade-in-prompt">
      <div className="container">
        <div className="trade-in-prompt__wrapper">
          <div className="trade-in-prompt__icon">
            <Car size={28} />
          </div>
          <div className="trade-in-prompt__content">
            <h3 className="trade-in-prompt__title">What's Your Car Worth?</h3>
            <p className="trade-in-prompt__text">
              Your trade-in could reduce your {vehicleName} payment from <strong>{fmt(estimatedPayment)}/mo</strong>.
              Get your car's value using the same Black Book® data dealers use.
            </p>
          </div>
          <button type="button" className="trade-in-prompt__cta">
            Get Your Estimate
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default TradeInPrompt;
