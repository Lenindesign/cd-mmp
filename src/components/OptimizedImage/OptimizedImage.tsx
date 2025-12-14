import React, { useState, useRef, useEffect } from 'react';
import './OptimizedImage.css';

export interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  /** Image source URL */
  src: string;
  /** Alt text for accessibility */
  alt: string;
  /** Aspect ratio for placeholder (e.g., "16/9", "4/3", "1/1") */
  aspectRatio?: string;
  /** Show blur placeholder while loading */
  showPlaceholder?: boolean;
  /** Placeholder background color */
  placeholderColor?: string;
  /** Fallback image on error */
  fallbackSrc?: string;
  /** Object fit style */
  objectFit?: 'cover' | 'contain' | 'fill' | 'none';
  /** Additional wrapper class */
  wrapperClassName?: string;
  /** Callback when image loads */
  onImageLoad?: () => void;
  /** Callback when image fails to load */
  onImageError?: () => void;
}

// Default car placeholder SVG as data URI
const DEFAULT_PLACEHOLDER = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect fill='%23f5f5f5' width='400' height='300'/%3E%3Cpath fill='%23e0e0e0' d='M160 180h80l10-30h-100zM130 180v30h140v-30h-20v15h-100v-15z'/%3E%3Ccircle fill='%23ccc' cx='155' cy='210' r='15'/%3E%3Ccircle fill='%23ccc' cx='245' cy='210' r='15'/%3E%3C/svg%3E`;

/**
 * OptimizedImage Component
 * 
 * A performant image component with:
 * - Native lazy loading
 * - Intersection Observer fallback for older browsers
 * - Blur-up placeholder effect
 * - Error handling with fallback
 * - Aspect ratio preservation
 * 
 * @example
 * // Basic usage
 * <OptimizedImage src="/car.jpg" alt="Vehicle" />
 * 
 * // With aspect ratio and placeholder
 * <OptimizedImage 
 *   src="/car.jpg" 
 *   alt="Vehicle"
 *   aspectRatio="16/9"
 *   showPlaceholder
 * />
 */
export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  aspectRatio,
  showPlaceholder = true,
  placeholderColor = 'var(--color-gray-100)',
  fallbackSrc = DEFAULT_PLACEHOLDER,
  objectFit = 'cover',
  wrapperClassName = '',
  className = '',
  onImageLoad,
  onImageError,
  loading = 'lazy',
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Use Intersection Observer for browsers that don't support native lazy loading
  useEffect(() => {
    // Check if native lazy loading is supported
    if ('loading' in HTMLImageElement.prototype) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: '200px', // Start loading 200px before entering viewport
        threshold: 0,
      }
    );

    if (wrapperRef.current) {
      observer.observe(wrapperRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleLoad = () => {
    setIsLoaded(true);
    onImageLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    onImageError?.();
  };

  const imageSrc = hasError ? fallbackSrc : src;
  const shouldRenderImage = isInView || loading === 'eager';

  return (
    <div
      ref={wrapperRef}
      className={`optimized-image ${isLoaded ? 'optimized-image--loaded' : ''} ${wrapperClassName}`}
      style={{
        aspectRatio: aspectRatio,
        backgroundColor: showPlaceholder ? placeholderColor : undefined,
      }}
    >
      {/* Placeholder shimmer effect */}
      {showPlaceholder && !isLoaded && (
        <div className="optimized-image__placeholder" aria-hidden="true" />
      )}
      
      {/* Actual image */}
      {shouldRenderImage && (
        <img
          ref={imgRef}
          src={imageSrc}
          alt={alt}
          loading={loading}
          decoding="async"
          onLoad={handleLoad}
          onError={handleError}
          className={`optimized-image__img ${className}`}
          style={{ objectFit }}
          {...props}
        />
      )}
    </div>
  );
};

/**
 * VehicleImage Component
 * 
 * Pre-configured OptimizedImage for vehicle cards with 16:10 aspect ratio.
 */
export interface VehicleImageProps extends Omit<OptimizedImageProps, 'aspectRatio'> {
  /** Size variant affecting aspect ratio */
  size?: 'card' | 'hero' | 'thumbnail';
}

export const VehicleImage: React.FC<VehicleImageProps> = ({
  size = 'card',
  ...props
}) => {
  const aspectRatios = {
    card: '16/10',
    hero: '16/9',
    thumbnail: '4/3',
  };

  return (
    <OptimizedImage
      aspectRatio={aspectRatios[size]}
      {...props}
    />
  );
};

/**
 * AvatarImage Component
 * 
 * Pre-configured OptimizedImage for user avatars.
 */
export interface AvatarImageProps extends Omit<OptimizedImageProps, 'aspectRatio' | 'objectFit'> {
  /** Avatar size in pixels */
  size?: number;
}

export const AvatarImage: React.FC<AvatarImageProps> = ({
  size = 40,
  alt,
  ...props
}) => {
  return (
    <OptimizedImage
      aspectRatio="1/1"
      objectFit="cover"
      alt={alt}
      style={{ width: size, height: size, borderRadius: '50%' }}
      {...props}
    />
  );
};

export default OptimizedImage;

