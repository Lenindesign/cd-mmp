import React from 'react';
import './LoadingSpinner.css';

export interface LoadingSpinnerProps {
  /** Size of the spinner */
  size?: 'small' | 'default' | 'large';
  /** Color variant */
  variant?: 'primary' | 'white' | 'dark';
  /** Optional label for accessibility */
  label?: string;
  /** Center the spinner in its container */
  centered?: boolean;
  /** Show as full-page overlay */
  fullPage?: boolean;
  /** Additional CSS class */
  className?: string;
}

/**
 * LoadingSpinner Component
 * 
 * A consistent loading indicator following the design system.
 * 
 * @example
 * // Basic usage
 * <LoadingSpinner />
 * 
 * // Large centered spinner
 * <LoadingSpinner size="large" centered />
 * 
 * // Full page loading overlay
 * <LoadingSpinner fullPage label="Loading vehicles..." />
 */
export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'default',
  variant = 'primary',
  label = 'Loading...',
  centered = false,
  fullPage = false,
  className = '',
}) => {
  const spinnerContent = (
    <div
      className={`loading-spinner loading-spinner--${size} loading-spinner--${variant} ${centered ? 'loading-spinner--centered' : ''} ${className}`}
      role="status"
      aria-label={label}
    >
      <svg
        className="loading-spinner__icon"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="32"
          strokeDashoffset="12"
        />
      </svg>
      <span className="sr-only">{label}</span>
    </div>
  );

  if (fullPage) {
    return (
      <div className="loading-spinner__overlay">
        <div className="loading-spinner__overlay-content">
          {spinnerContent}
          {label && <p className="loading-spinner__label">{label}</p>}
        </div>
      </div>
    );
  }

  return spinnerContent;
};

/**
 * LoadingSkeleton Component
 * 
 * Placeholder loading state for content.
 */
export interface LoadingSkeletonProps {
  /** Width of the skeleton */
  width?: string | number;
  /** Height of the skeleton */
  height?: string | number;
  /** Border radius */
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full';
  /** Additional CSS class */
  className?: string;
}

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
  width = '100%',
  height = '1em',
  rounded = 'sm',
  className = '',
}) => {
  return (
    <div
      className={`loading-skeleton loading-skeleton--rounded-${rounded} ${className}`}
      style={{
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
      }}
      aria-hidden="true"
    />
  );
};

/**
 * LoadingCard Component
 * 
 * A skeleton placeholder for card-like content.
 */
export const LoadingCard: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`loading-card ${className}`}>
      <LoadingSkeleton height={180} rounded="md" className="loading-card__image" />
      <div className="loading-card__content">
        <LoadingSkeleton width="60%" height={12} className="loading-card__title" />
        <LoadingSkeleton width="40%" height={10} className="loading-card__subtitle" />
        <LoadingSkeleton width="80%" height={10} className="loading-card__text" />
      </div>
    </div>
  );
};

export default LoadingSpinner;

