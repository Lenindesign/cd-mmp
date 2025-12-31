import { useEffect, useRef, useState } from 'react';
import { X, Star, ExternalLink, ChevronLeft, ChevronRight, Youtube } from 'lucide-react';
import { parseStarRating, type NHTSASafetyRating } from '../../services/nhtsaService';
import './CrashTestModal.css';

interface CrashTestModalProps {
  isOpen: boolean;
  onClose: () => void;
  safetyRatings: NHTSASafetyRating;
  vehicleName: string;
}

interface CrashTestImage {
  id: string;
  label: string;
  imageUrl: string | undefined;
  videoUrl: string | undefined;
  rating: string | undefined;
  description: string;
}

const CrashTestModal = ({ isOpen, onClose, safetyRatings, vehicleName }: CrashTestModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [imageError, setImageError] = useState<Record<string, boolean>>({});

  // Build crash test images array
  const crashTestImages: CrashTestImage[] = [
    {
      id: 'front',
      label: 'Frontal Crash Test',
      imageUrl: safetyRatings.FrontCrashPicture,
      videoUrl: safetyRatings.FrontCrashVideo,
      rating: safetyRatings.OverallFrontCrashRating,
      description: 'Simulates a head-on collision between two vehicles of similar weight, each traveling at 35 mph.',
    },
    {
      id: 'side',
      label: 'Side Crash Test',
      imageUrl: safetyRatings.SideCrashPicture,
      videoUrl: safetyRatings.SideCrashVideo,
      rating: safetyRatings.OverallSideCrashRating,
      description: 'A 3,015-pound barrier moving at 38.5 mph strikes the driver side of the vehicle.',
    },
    {
      id: 'pole',
      label: 'Side Pole Crash Test',
      imageUrl: safetyRatings.SidePolePicture,
      videoUrl: safetyRatings.SidePoleVideo,
      rating: safetyRatings.SidePoleCrashRating,
      description: 'The vehicle slides sideways at 20 mph into a rigid pole, simulating a tree or utility pole impact.',
    },
  ].filter(img => img.imageUrl); // Only include tests with images

  // Build YouTube search URL for this vehicle's crash test
  const youtubeSearchQuery = `NHTSA ${safetyRatings.ModelYear} ${safetyRatings.Make} ${safetyRatings.Model} crash test`;
  const youtubeSearchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(youtubeSearchQuery)}`;

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose, activeIndex]);

  // Close on backdrop click
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  const handlePrev = () => {
    setActiveIndex(prev => (prev > 0 ? prev - 1 : crashTestImages.length - 1));
  };

  const handleNext = () => {
    setActiveIndex(prev => (prev < crashTestImages.length - 1 ? prev + 1 : 0));
  };

  const handleImageError = (id: string) => {
    setImageError(prev => ({ ...prev, [id]: true }));
  };

  // Render star rating
  const renderStars = (rating: string | undefined, size: number = 20) => {
    const stars = parseStarRating(rating || '');
    if (stars === null) return <span className="crash-test-modal__not-rated">Not Rated</span>;
    
    return (
      <div className="crash-test-modal__stars">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            size={size}
            className={i <= stars ? 'crash-test-modal__star--filled' : 'crash-test-modal__star--empty'}
            fill={i <= stars ? 'currentColor' : 'none'}
          />
        ))}
      </div>
    );
  };

  if (!isOpen || crashTestImages.length === 0) return null;

  const activeImage = crashTestImages[activeIndex];

  return (
    <div className="crash-test-modal" onClick={handleBackdropClick}>
      <div className="crash-test-modal__content" ref={modalRef}>
        {/* Header */}
        <header className="crash-test-modal__header">
          <div className="crash-test-modal__header-content">
            <h2 className="crash-test-modal__title">Crash Test Results</h2>
            <p className="crash-test-modal__subtitle">{vehicleName}</p>
          </div>
          <button
            className="crash-test-modal__close"
            onClick={onClose}
            aria-label="Close modal"
          >
            <X size={24} />
          </button>
        </header>

        {/* Main Image Area */}
        <div className="crash-test-modal__body">
          <div className="crash-test-modal__gallery">
            {/* Navigation Arrows */}
            {crashTestImages.length > 1 && (
              <>
                <button 
                  className="crash-test-modal__nav crash-test-modal__nav--prev"
                  onClick={handlePrev}
                  aria-label="Previous image"
                >
                  <ChevronLeft size={28} />
                </button>
                <button 
                  className="crash-test-modal__nav crash-test-modal__nav--next"
                  onClick={handleNext}
                  aria-label="Next image"
                >
                  <ChevronRight size={28} />
                </button>
              </>
            )}

            {/* Image Display */}
            <div className="crash-test-modal__image-container">
              {!imageError[activeImage.id] && activeImage.imageUrl ? (
                <>
                  <img
                    src={activeImage.imageUrl}
                    alt={`${vehicleName} ${activeImage.label}`}
                    className="crash-test-modal__image"
                    onError={() => handleImageError(activeImage.id)}
                  />
                  <a
                    href={youtubeSearchUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="crash-test-modal__play-btn"
                  >
                    <Youtube size={28} />
                    <span>Watch Video</span>
                  </a>
                </>
              ) : (
                <div className="crash-test-modal__image-placeholder">
                  <span>Image not available</span>
                </div>
              )}
            </div>

            {/* Image Info */}
            <div className="crash-test-modal__image-info">
              <div className="crash-test-modal__image-header">
                <h3 className="crash-test-modal__image-label">{activeImage.label}</h3>
                <div className="crash-test-modal__image-rating">
                  {renderStars(activeImage.rating)}
                </div>
              </div>
              <p className="crash-test-modal__image-description">{activeImage.description}</p>
            </div>
          </div>

          {/* Thumbnails */}
          {crashTestImages.length > 1 && (
            <div className="crash-test-modal__thumbnails">
              {crashTestImages.map((img, index) => (
                <button
                  key={img.id}
                  className={`crash-test-modal__thumbnail ${index === activeIndex ? 'crash-test-modal__thumbnail--active' : ''}`}
                  onClick={() => setActiveIndex(index)}
                  aria-label={`View ${img.label}`}
                >
                  {!imageError[img.id] && img.imageUrl ? (
                    <img
                      src={img.imageUrl}
                      alt={img.label}
                      onError={() => handleImageError(img.id)}
                    />
                  ) : (
                    <div className="crash-test-modal__thumbnail-placeholder" />
                  )}
                  <span className="crash-test-modal__thumbnail-label">{img.label.replace(' Test', '')}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="crash-test-modal__footer">
          <p className="crash-test-modal__disclaimer">
            Images and ratings provided by NHTSA. Videos from YouTube.
          </p>
          <div className="crash-test-modal__footer-links">
            <a
              href={youtubeSearchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="crash-test-modal__youtube-link"
            >
              <Youtube size={16} />
              More Videos on YouTube
            </a>
            <a
              href="https://www.nhtsa.gov/ratings"
              target="_blank"
              rel="noopener noreferrer"
              className="crash-test-modal__nhtsa-link"
            >
              NHTSA.gov
              <ExternalLink size={14} />
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default CrashTestModal;

