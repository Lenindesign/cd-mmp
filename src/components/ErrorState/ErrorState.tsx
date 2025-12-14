import React from 'react';
import { Button } from '../Button';
import './ErrorState.css';

export interface ErrorStateProps {
  /** Error title */
  title?: string;
  /** Error message/description */
  message?: string;
  /** Show retry button */
  showRetry?: boolean;
  /** Retry button label */
  retryLabel?: string;
  /** Retry callback */
  onRetry?: () => void;
  /** Error variant */
  variant?: 'error' | 'empty' | 'not-found' | 'offline';
  /** Custom icon */
  icon?: React.ReactNode;
  /** Additional CSS class */
  className?: string;
  /** Children for custom content */
  children?: React.ReactNode;
}

const defaultIcons = {
  error: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  ),
  empty: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
      <line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
  ),
  'not-found': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
      <line x1="8" y1="11" x2="14" y2="11" />
    </svg>
  ),
  offline: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="1" y1="1" x2="23" y2="23" />
      <path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55" />
      <path d="M5 12.55a10.94 10.94 0 0 1 5.17-2.39" />
      <path d="M10.71 5.05A16 16 0 0 1 22.58 9" />
      <path d="M1.42 9a15.91 15.91 0 0 1 4.7-2.88" />
      <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
      <line x1="12" y1="20" x2="12.01" y2="20" />
    </svg>
  ),
};

const defaultMessages = {
  error: {
    title: 'Something went wrong',
    message: 'An unexpected error occurred. Please try again.',
  },
  empty: {
    title: 'No results found',
    message: 'We couldn\'t find any items matching your criteria.',
  },
  'not-found': {
    title: 'Page not found',
    message: 'The page you\'re looking for doesn\'t exist or has been moved.',
  },
  offline: {
    title: 'You\'re offline',
    message: 'Please check your internet connection and try again.',
  },
};

/**
 * ErrorState Component
 * 
 * Displays error, empty, or offline states with consistent styling.
 * 
 * @example
 * // Basic error state
 * <ErrorState variant="error" onRetry={() => refetch()} />
 * 
 * // Empty state
 * <ErrorState variant="empty" title="No vehicles found" />
 * 
 * // Custom error with action
 * <ErrorState
 *   title="Failed to load"
 *   message="Could not load vehicle data."
 *   showRetry
 *   onRetry={handleRetry}
 * />
 */
export const ErrorState: React.FC<ErrorStateProps> = ({
  title,
  message,
  showRetry = false,
  retryLabel = 'Try Again',
  onRetry,
  variant = 'error',
  icon,
  className = '',
  children,
}) => {
  const defaults = defaultMessages[variant];
  const displayTitle = title || defaults.title;
  const displayMessage = message || defaults.message;
  const displayIcon = icon || defaultIcons[variant];

  return (
    <div className={`error-state error-state--${variant} ${className}`} role="alert">
      <div className="error-state__icon" aria-hidden="true">
        {displayIcon}
      </div>
      <h3 className="error-state__title">{displayTitle}</h3>
      <p className="error-state__message">{displayMessage}</p>
      {children}
      {showRetry && onRetry && (
        <div className="error-state__actions">
          <Button variant="primary" onClick={onRetry}>
            {retryLabel}
          </Button>
        </div>
      )}
    </div>
  );
};

/**
 * ErrorBoundary Component
 * 
 * React Error Boundary for catching render errors.
 */
interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.props.onError?.(error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <ErrorState
          variant="error"
          title="Something went wrong"
          message={this.state.error?.message || 'An unexpected error occurred.'}
          showRetry
          onRetry={this.handleRetry}
        />
      );
    }

    return this.props.children;
  }
}

export default ErrorState;

