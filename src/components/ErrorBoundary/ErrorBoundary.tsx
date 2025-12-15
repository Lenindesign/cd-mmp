import { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import './ErrorBoundary.css';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error to console (in production, you'd send this to an error reporting service)
    console.error('Error Boundary caught an error:', error, errorInfo);
    
    this.setState({
      error,
      errorInfo,
    });

    // TODO: Send error to error reporting service (e.g., Sentry, LogRocket)
    // logErrorToService(error, errorInfo);
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default error UI
      return (
        <div className="error-boundary">
          <div className="error-boundary__container">
            {/* Icon */}
            <div className="error-boundary__icon">
              <AlertTriangle size={64} />
            </div>

            {/* Content */}
            <div className="error-boundary__content">
              <h1 className="error-boundary__title">Something Went Wrong</h1>
              <p className="error-boundary__message">
                We're sorry, but something unexpected happened. Our team has been notified and we're working on a fix.
              </p>

              {/* Error Details (only in development) */}
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <details className="error-boundary__details">
                  <summary className="error-boundary__details-summary">
                    Error Details (Development Only)
                  </summary>
                  <div className="error-boundary__details-content">
                    <p className="error-boundary__error-name">
                      <strong>Error:</strong> {this.state.error.toString()}
                    </p>
                    {this.state.errorInfo && (
                      <pre className="error-boundary__stack-trace">
                        {this.state.errorInfo.componentStack}
                      </pre>
                    )}
                  </div>
                </details>
              )}

              {/* Actions */}
              <div className="error-boundary__actions">
                <button 
                  onClick={this.handleReset}
                  className="error-boundary__btn error-boundary__btn--secondary"
                >
                  <RefreshCw size={18} />
                  Try Again
                </button>
                <button 
                  onClick={this.handleReload}
                  className="error-boundary__btn error-boundary__btn--secondary"
                >
                  <RefreshCw size={18} />
                  Reload Page
                </button>
                <button 
                  onClick={this.handleGoHome}
                  className="error-boundary__btn error-boundary__btn--primary"
                >
                  <Home size={18} />
                  Go to Homepage
                </button>
              </div>

              {/* Help Text */}
              <p className="error-boundary__help">
                If the problem persists, please{' '}
                <a href="mailto:support@caranddriver.com" className="error-boundary__link">
                  contact support
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

