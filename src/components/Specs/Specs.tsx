import { useState } from 'react';
import { Gauge, Zap, Fuel, Settings, Timer, Weight, Ruler, ChevronDown } from 'lucide-react';
import './Specs.css';

interface SpecCategory {
  id: string;
  title: string;
  icon: React.ReactNode;
  specs: { label: string; value: string }[];
}

interface SpecsProps {
  categories: SpecCategory[];
  title?: string;
  description?: string;
}

const Specs = ({ categories, title = "Specs & Performance", description }: SpecsProps) => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(categories[0]?.id);

  const toggleCategory = (id: string) => {
    setExpandedCategory(expandedCategory === id ? null : id);
  };

  return (
    <section className="specs">
      <div className="container">
        <div className="specs__header">
          <h2 className="specs__title">{title}</h2>
          {description && <p className="specs__description">{description}</p>}
        </div>
        
        <div className="specs__content">
          <div className="specs__highlights">
            <div className="specs__highlight">
              <div className="specs__highlight-icon">
                <Gauge size={28} />
              </div>
              <div className="specs__highlight-content">
                <span className="specs__highlight-value">137</span>
                <span className="specs__highlight-label">Horsepower</span>
              </div>
            </div>
            
            <div className="specs__highlight">
              <div className="specs__highlight-icon">
                <Zap size={28} />
              </div>
              <div className="specs__highlight-content">
                <span className="specs__highlight-value">162</span>
                <span className="specs__highlight-label">lb-ft Torque</span>
              </div>
            </div>
            
            <div className="specs__highlight">
              <div className="specs__highlight-icon">
                <Timer size={28} />
              </div>
              <div className="specs__highlight-content">
                <span className="specs__highlight-value">9.0</span>
                <span className="specs__highlight-label">0-60 mph (sec)</span>
              </div>
            </div>
            
            <div className="specs__highlight">
              <div className="specs__highlight-icon">
                <Fuel size={28} />
              </div>
              <div className="specs__highlight-content">
                <span className="specs__highlight-value">30</span>
                <span className="specs__highlight-label">MPG Combined</span>
              </div>
            </div>
          </div>
          
          <div className="specs__categories">
            {categories.map((category) => (
              <div 
                key={category.id} 
                className={`specs__category ${expandedCategory === category.id ? 'specs__category--expanded' : ''}`}
              >
                <button 
                  className="specs__category-header"
                  onClick={() => toggleCategory(category.id)}
                  aria-expanded={expandedCategory === category.id}
                >
                  <div className="specs__category-title">
                    <span className="specs__category-icon">{category.icon}</span>
                    <span>{category.title}</span>
                  </div>
                  <ChevronDown size={20} className="specs__category-chevron" />
                </button>
                
                <div className="specs__category-content">
                  <div className="specs__table">
                    {category.specs.map((spec, index) => (
                      <div key={index} className="specs__row">
                        <span className="specs__label">{spec.label}</span>
                        <span className="specs__value">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Specs;

export const defaultSpecCategories: SpecCategory[] = [
  {
    id: 'engine',
    title: 'Engine & Transmission',
    icon: <Settings size={20} />,
    specs: [
      { label: 'Engine Type', value: 'Turbocharged 1.2L Inline-3' },
      { label: 'Horsepower', value: '137 hp @ 5,000 rpm' },
      { label: 'Torque', value: '162 lb-ft @ 2,500 rpm' },
      { label: 'Transmission', value: '6-Speed Automatic' },
      { label: 'Drivetrain', value: 'Front-Wheel Drive' },
      { label: 'Fuel Type', value: 'Regular Unleaded / E85 Flex Fuel' },
    ],
  },
  {
    id: 'performance',
    title: 'Performance',
    icon: <Gauge size={20} />,
    specs: [
      { label: '0-60 mph', value: '9.0 seconds' },
      { label: 'Top Speed', value: '112 mph' },
      { label: 'Quarter Mile', value: '17.0 seconds' },
    ],
  },
  {
    id: 'fuel',
    title: 'Fuel Economy',
    icon: <Fuel size={20} />,
    specs: [
      { label: 'City MPG', value: '28 mpg' },
      { label: 'Highway MPG', value: '32 mpg' },
      { label: 'Combined MPG', value: '30 mpg' },
      { label: 'Fuel Tank Capacity', value: '12.4 gallons' },
      { label: 'Range', value: '372 miles' },
    ],
  },
  {
    id: 'dimensions',
    title: 'Dimensions & Weight',
    icon: <Ruler size={20} />,
    specs: [
      { label: 'Length', value: '173.0 in' },
      { label: 'Width', value: '71.2 in' },
      { label: 'Height', value: '65.4 in' },
      { label: 'Wheelbase', value: '104.1 in' },
      { label: 'Ground Clearance', value: '7.5 in' },
      { label: 'Curb Weight', value: '2,951 lbs' },
    ],
  },
  {
    id: 'cargo',
    title: 'Cargo & Storage',
    icon: <Weight size={20} />,
    specs: [
      { label: 'Cargo Volume (Rear Seats Up)', value: '26.5 cu ft' },
      { label: 'Cargo Volume (Rear Seats Down)', value: '54.4 cu ft' },
      { label: 'Seating Capacity', value: '5 passengers' },
      { label: 'Front Legroom', value: '41.6 in' },
      { label: 'Rear Legroom', value: '36.4 in' },
    ],
  },
];


















