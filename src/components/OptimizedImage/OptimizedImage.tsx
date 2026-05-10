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
  /** Switch to fallback when a request stalls without firing an error. */
  fallbackDelayMs?: number;
}

type ImageLoadState = {
  src: string;
  fallbackSrc?: string;
  isLoaded: boolean;
  hasError: boolean;
  fallbackFailed: boolean;
};

const supportsNativeLazyLoading = () => (
  typeof HTMLImageElement !== 'undefined' && 'loading' in HTMLImageElement.prototype
);

const shouldLoadImmediately = () => (
  supportsNativeLazyLoading() || typeof IntersectionObserver === 'undefined'
);

// Image placeholder icon SVG component
const ImagePlaceholderIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg 
    className={className}
    width="64" 
    height="64" 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect 
      x="3" 
      y="5" 
      width="18" 
      height="14" 
      rx="2" 
      stroke="currentColor" 
      strokeWidth="1.5"
      fill="none"
    />
    <circle 
      cx="8.5" 
      cy="10.5" 
      r="1.5" 
      fill="currentColor"
    />
    <path 
      d="M21 15L16 10L11 15" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      fill="none"
    />
    <path 
      d="M14 18L10 14L3 21" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);

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
  fallbackSrc,
  objectFit = 'cover',
  wrapperClassName = '',
  className = '',
  onImageLoad,
  onImageError,
  fallbackDelayMs,
  loading = 'lazy',
  ...props
}) => {
  const [imageLoadState, setImageLoadState] = useState<ImageLoadState>(() => ({
    src,
    fallbackSrc,
    isLoaded: false,
    hasError: false,
    fallbackFailed: false,
  }));
  const [isInView, setIsInView] = useState(shouldLoadImmediately);
  const imgRef = useRef<HTMLImageElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const imageStateMatchesProps = imageLoadState.src === src && imageLoadState.fallbackSrc === fallbackSrc;
  const isLoaded = imageStateMatchesProps ? imageLoadState.isLoaded : false;
  const hasError = imageStateMatchesProps ? imageLoadState.hasError : false;
  const fallbackFailed = imageStateMatchesProps ? imageLoadState.fallbackFailed : false;

  const updateImageLoadState = (patch: Partial<Omit<ImageLoadState, 'src' | 'fallbackSrc'>>) => {
    setImageLoadState((current) => {
      const currentState = current.src === src && current.fallbackSrc === fallbackSrc
        ? current
        : {
            src,
            fallbackSrc,
            isLoaded: false,
            hasError: false,
            fallbackFailed: false,
          };

      return {
        ...currentState,
        ...patch,
      };
    });
  };

  // Use Intersection Observer for browsers that don't support native lazy loading
  useEffect(() => {
    if (isInView) return;

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
  }, [isInView]);

  useEffect(() => {
    if (!fallbackDelayMs || !fallbackSrc || isLoaded || hasError) return;

    const timeout = window.setTimeout(() => {
      setImageLoadState((current) => {
        if (
          current.src !== src ||
          current.fallbackSrc !== fallbackSrc ||
          current.isLoaded ||
          current.hasError
        ) {
          return current;
        }

        return {
          ...current,
          hasError: true,
          isLoaded: false,
        };
      });
    }, fallbackDelayMs);

    return () => window.clearTimeout(timeout);
  }, [fallbackDelayMs, fallbackSrc, hasError, isLoaded, src]);

  const handleLoad = () => {
    updateImageLoadState({ isLoaded: true });
    onImageLoad?.();
  };

  const handleError = () => {
    if (!hasError && fallbackSrc) {
      updateImageLoadState({
        hasError: true,
        isLoaded: false,
      });
      return;
    }

    updateImageLoadState({
      fallbackFailed: true,
      hasError: true,
    });
    onImageError?.();
  };

  // Check if we should show error state
  const usingFallback = hasError && Boolean(fallbackSrc) && !fallbackFailed;
  const imageSrc = usingFallback ? fallbackSrc : src;
  const showErrorState = !src || (hasError && !usingFallback);
  const shouldRenderImage = (isInView || loading === 'eager') && Boolean(imageSrc) && !showErrorState;

  return (
    <div
      ref={wrapperRef}
      className={`optimized-image ${isLoaded ? 'optimized-image--loaded' : ''} ${showErrorState ? 'optimized-image--error' : ''} ${wrapperClassName}`}
      style={{
        aspectRatio: aspectRatio,
        backgroundColor: showPlaceholder ? placeholderColor : undefined,
      }}
    >
      {/* Error fallback with icon */}
      {showErrorState && (
        <div className="optimized-image__error-fallback">
          <ImagePlaceholderIcon className="optimized-image__error-icon" />
        </div>
      )}

      {/* Placeholder shimmer effect */}
      {showPlaceholder && !isLoaded && !showErrorState && (
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
