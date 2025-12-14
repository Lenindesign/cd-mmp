import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { GasPumpIcon, SeatingIcon, VolumeIcon, EngineIcon, DrivetrainIcon, WarrantyIcon } from './SpecIcons';
import './Specs.css';

interface SpecCategory {
  id: string;
  title: string;
  icon: React.ReactNode;
  specs: { label: string; value: string }[];
}

interface SpecsProps {
  categories?: SpecCategory[];
  title?: string;
  description?: string;
}

// Default sedan spec categories with Car and Driver icons
export const defaultSedanSpecs: SpecCategory[] = [
  {
    id: 'gas',
    title: 'Fuel Economy',
    icon: <GasPumpIcon />,
    specs: [
      { label: 'City MPG', value: '28 mpg' },
      { label: 'Highway MPG', value: '32 mpg' },
      { label: 'Combined MPG', value: '30 mpg' },
      { label: 'Fuel Tank Capacity', value: '12.4 gallons' },
      { label: 'Range', value: '372 miles' },
    ],
  },
  {
    id: 'seating',
    title: 'Seating',
    icon: <SeatingIcon />,
    specs: [
      { label: 'Seating Capacity', value: '5 passengers' },
      { label: 'Front Legroom', value: '41.6 in' },
      { label: 'Rear Legroom', value: '36.4 in' },
      { label: 'Front Headroom', value: '39.1 in' },
      { label: 'Rear Headroom', value: '37.2 in' },
    ],
  },
  {
    id: 'cargo',
    title: 'Cargo',
    icon: <VolumeIcon />,
    specs: [
      { label: 'Cargo Volume', value: '13.2 cu ft' },
      { label: 'Passenger Volume', value: '95.7 cu ft' },
    ],
  },
  {
    id: 'powertrain',
    title: 'Powertrain',
    icon: <EngineIcon />,
    specs: [
      { label: 'Engine Type', value: 'Turbocharged 1.2L Inline-3' },
      { label: 'Horsepower', value: '137 hp @ 5,000 rpm' },
      { label: 'Torque', value: '162 lb-ft @ 2,500 rpm' },
      { label: 'Transmission', value: '6-Speed Automatic' },
    ],
  },
  {
    id: 'drivetrain',
    title: 'Drivetrain',
    icon: <DrivetrainIcon />,
    specs: [
      { label: 'Drive Type', value: 'Front-Wheel Drive' },
      { label: '0-60 mph', value: '9.0 seconds' },
      { label: 'Top Speed', value: '112 mph' },
    ],
  },
  {
    id: 'warranty',
    title: 'Limited Warranty',
    icon: <WarrantyIcon />,
    specs: [
      { label: 'Basic Warranty', value: '3 years / 36,000 miles' },
      { label: 'Powertrain Warranty', value: '5 years / 60,000 miles' },
      { label: 'Roadside Assistance', value: '3 years / 36,000 miles' },
    ],
  },
];

const Specs = ({ categories = defaultSedanSpecs, title = "Specs & Performance", description }: SpecsProps) => {
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
                <EngineIcon />
              </div>
              <div className="specs__highlight-content">
                <span className="specs__highlight-value">137</span>
                <span className="specs__highlight-label">Horsepower</span>
              </div>
            </div>
            
            <div className="specs__highlight">
              <div className="specs__highlight-icon">
                <EngineIcon />
              </div>
              <div className="specs__highlight-content">
                <span className="specs__highlight-value">162</span>
                <span className="specs__highlight-label">lb-ft Torque</span>
              </div>
            </div>
            
            <div className="specs__highlight">
              <div className="specs__highlight-icon">
                <DrivetrainIcon />
              </div>
              <div className="specs__highlight-content">
                <span className="specs__highlight-value">9.0</span>
                <span className="specs__highlight-label">0-60 mph (sec)</span>
              </div>
            </div>
            
            <div className="specs__highlight">
              <div className="specs__highlight-icon">
                <GasPumpIcon />
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


















