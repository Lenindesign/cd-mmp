import React, { useState, useCallback } from 'react';
import './ImageGallery.css';

export interface GalleryImage {
  id: string | number;
  src: string;
  alt: string;
  caption?: string;
  credit?: string;
}

export interface ImageGalleryProps {
  /** Array of images */
  images: GalleryImage[];
  /** Gallery title */
  title?: string;
  /** Initial slide index */
  initialIndex?: number;
  /** Show thumbnails */
  showThumbnails?: boolean;
  /** Show counter */
  showCounter?: boolean;
  /** Show captions */
  showCaptions?: boolean;
  /** Aspect ratio */
  aspectRatio?: '16:9' | '4:3' | '1:1' | '3:2';
  /** Variant style */
  variant?: 'default' | 'fullwidth' | 'compact';
  /** Auto play interval in ms (0 to disable) */
  autoPlay?: number;
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({
  images,
  title,
  initialIndex = 0,
  showThumbnails = true,
  showCounter = true,
  showCaptions = true,
  aspectRatio = '16:9',
  variant = 'default',
  autoPlay = 0,
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isPlaying, setIsPlaying] = useState(autoPlay > 0);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);

  const toggleAutoPlay = useCallback(() => {
    setIsPlaying((prev) => !prev);
  }, []);

  // Auto play effect
  React.useEffect(() => {
    if (!isPlaying || autoPlay === 0) return;

    const interval = setInterval(() => {
      goToNext();
    }, autoPlay);

    return () => clearInterval(interval);
  }, [isPlaying, autoPlay, goToNext]);

  const currentImage = images[currentIndex];

  if (!images.length) {
    return null;
  }

  return (
    <div className={`image-gallery image-gallery--${variant} image-gallery--${aspectRatio.replace(':', '-')}`}>
      {title && (
        <header className="image-gallery__header">
          <h2 className="image-gallery__title">{title}</h2>
        </header>
      )}

      <div className="image-gallery__main">
        {/* Main Image */}
        <div className="image-gallery__stage">
          <div className="image-gallery__image-wrapper">
            <img
              src={currentImage.src}
              alt={currentImage.alt}
              className="image-gallery__image"
            />
          </div>

          {/* Navigation Arrows */}
          <button
            className="image-gallery__nav image-gallery__nav--prev"
            onClick={goToPrevious}
            aria-label="Previous image"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <button
            className="image-gallery__nav image-gallery__nav--next"
            onClick={goToNext}
            aria-label="Next image"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>

          {/* Counter */}
          {showCounter && (
            <div className="image-gallery__counter">
              <span className="image-gallery__counter-current">{currentIndex + 1}</span>
              <span className="image-gallery__counter-separator">/</span>
              <span className="image-gallery__counter-total">{images.length}</span>
            </div>
          )}

          {/* Auto Play Toggle */}
          {autoPlay > 0 && (
            <button
              className={`image-gallery__autoplay ${isPlaying ? 'image-gallery__autoplay--playing' : ''}`}
              onClick={toggleAutoPlay}
              aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
            >
              {isPlaying ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="6" y="4" width="4" height="16" />
                  <rect x="14" y="4" width="4" height="16" />
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="5,3 19,12 5,21" />
                </svg>
              )}
            </button>
          )}
        </div>

        {/* Caption */}
        {showCaptions && (currentImage.caption || currentImage.credit) && (
          <div className="image-gallery__caption">
            {currentImage.caption && (
              <p className="image-gallery__caption-text">{currentImage.caption}</p>
            )}
            {currentImage.credit && (
              <span className="image-gallery__credit">{currentImage.credit}</span>
            )}
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {showThumbnails && images.length > 1 && (
        <div className="image-gallery__thumbnails">
          {images.map((image, index) => (
            <button
              key={image.id}
              className={`image-gallery__thumbnail ${index === currentIndex ? 'image-gallery__thumbnail--active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to image ${index + 1}`}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="image-gallery__thumbnail-image"
              />
            </button>
          ))}
        </div>
      )}

      {/* Dots (alternative to thumbnails for compact variant) */}
      {variant === 'compact' && images.length > 1 && (
        <div className="image-gallery__dots">
          {images.map((_, index) => (
            <button
              key={index}
              className={`image-gallery__dot ${index === currentIndex ? 'image-gallery__dot--active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageGallery;

