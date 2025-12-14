import { FileText, Wrench, Shield, Calendar } from 'lucide-react';
import './Warranty.css';

interface WarrantyItem {
  icon: React.ReactNode;
  title: string;
  coverage: string;
  description: string;
}

interface WarrantyProps {
  items: WarrantyItem[];
  title?: string;
}

const Warranty = ({ items, title = "Warranty and Maintenance Coverage" }: WarrantyProps) => {
  return (
    <section className="warranty">
      <div className="container">
        <div className="warranty__header">
          <h2 className="warranty__title">{title}</h2>
        </div>
        
        <div className="warranty__grid">
          {items.map((item, index) => (
            <div key={index} className="warranty__card">
              <div className="warranty__card-icon">
                {item.icon}
              </div>
              <h3 className="warranty__card-title">{item.title}</h3>
              <div className="warranty__card-coverage">{item.coverage}</div>
              <p className="warranty__card-description">{item.description}</p>
            </div>
          ))}
        </div>
        
        <div className="warranty__note">
          <p>* See dealer for limited warranty details. Visit chevrolet.com for more information.</p>
        </div>
      </div>
    </section>
  );
};

export default Warranty;

export const defaultWarrantyItems: WarrantyItem[] = [
  {
    icon: <FileText size={28} />,
    title: 'Basic Warranty',
    coverage: '3 Years / 36,000 Miles',
    description: 'Bumper-to-bumper limited warranty covering most vehicle components.',
  },
  {
    icon: <Wrench size={28} />,
    title: 'Powertrain Warranty',
    coverage: '5 Years / 60,000 Miles',
    description: 'Covers engine, transmission, and drivetrain components.',
  },
  {
    icon: <Shield size={28} />,
    title: 'Corrosion Warranty',
    coverage: '6 Years / 100,000 Miles',
    description: 'Protection against rust-through corrosion on body panels.',
  },
  {
    icon: <Calendar size={28} />,
    title: 'Complimentary Maintenance',
    coverage: 'First Visit',
    description: 'Includes first scheduled maintenance service at no additional cost.',
  },
];


















