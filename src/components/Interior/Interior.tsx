import { useState } from 'react';
import { Monitor, Wifi, Smartphone, Volume2, Sun, Armchair, ChevronLeft, ChevronRight } from 'lucide-react';
import './Interior.css';

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface InteriorProps {
  features: Feature[];
  images: string[];
  title?: string;
  description?: string;
}

const Interior = ({ features, images, title = "Interior, Comfort, and Cargo", description }: InteriorProps) => {
  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <section className="interior">
      <div className="container">
        <div className="interior__header">
          <h2 className="interior__title">{title}</h2>
          {description && <p className="interior__description">{description}</p>}
        </div>
        
        <div className="interior__content">
          <div className="interior__gallery">
            <div className="interior__gallery-main">
              <img 
                src={images[currentImage]} 
                alt={`Interior view ${currentImage + 1}`}
                className="interior__gallery-image"
              />
              
              {images.length > 1 && (
                <>
                  <button 
                    className="interior__gallery-nav interior__gallery-nav--prev"
                    onClick={prevImage}
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button 
                    className="interior__gallery-nav interior__gallery-nav--next"
                    onClick={nextImage}
                    aria-label="Next image"
                  >
                    <ChevronRight size={24} />
                  </button>
                  
                  <div className="interior__gallery-dots">
                    {images.map((_, index) => (
                      <button
                        key={index}
                        className={`interior__gallery-dot ${index === currentImage ? 'interior__gallery-dot--active' : ''}`}
                        onClick={() => setCurrentImage(index)}
                        aria-label={`Go to image ${index + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
            
            {images.length > 1 && (
              <div className="interior__gallery-thumbnails">
                {images.map((image, index) => (
                  <button
                    key={index}
                    className={`interior__gallery-thumbnail ${index === currentImage ? 'interior__gallery-thumbnail--active' : ''}`}
                    onClick={() => setCurrentImage(index)}
                  >
                    <img src={image} alt={`Thumbnail ${index + 1}`} />
                  </button>
                ))}
              </div>
            )}
          </div>
          
          <div className="interior__features">
            <h3 className="interior__features-title">Key Features</h3>
            <div className="interior__features-grid">
              {features.map((feature, index) => (
                <div key={index} className="interior__feature">
                  <div className="interior__feature-icon">
                    {feature.icon}
                  </div>
                  <div className="interior__feature-content">
                    <h4 className="interior__feature-title">{feature.title}</h4>
                    <p className="interior__feature-description">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Interior;

export const defaultInteriorFeatures: Feature[] = [
  {
    icon: <Monitor size={24} />,
    title: '11-Inch Touchscreen',
    description: 'Large HD diagonal touchscreen with wireless Apple CarPlay and Android Auto compatibility.',
  },
  {
    icon: <Wifi size={24} />,
    title: 'Built-In Wi-Fi',
    description: 'Available built-in Wi-Fi hotspot keeps everyone connected on the go.',
  },
  {
    icon: <Smartphone size={24} />,
    title: 'Wireless Charging',
    description: 'Available wireless charging pad for compatible smartphones.',
  },
  {
    icon: <Volume2 size={24} />,
    title: 'Premium Audio',
    description: '6-speaker audio system delivers clear, balanced sound throughout the cabin.',
  },
  {
    icon: <Sun size={24} />,
    title: 'Power Sunroof',
    description: 'Available power sunroof brings natural light and fresh air into the cabin.',
  },
  {
    icon: <Armchair size={24} />,
    title: 'Heated Front Seats',
    description: 'Available heated front seats keep you comfortable during cold weather.',
  },
];




