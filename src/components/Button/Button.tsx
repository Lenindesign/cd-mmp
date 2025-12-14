import React from 'react';
import './Button.css';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Button style variant */
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  /** Button size */
  size?: 'small' | 'default' | 'large';
  /** Full width button */
  fullWidth?: boolean;
  /** Loading state - shows spinner and disables button */
  loading?: boolean;
  /** Icon to display before text */
  iconLeft?: React.ReactNode;
  /** Icon to display after text */
  iconRight?: React.ReactNode;
  /** Render as a different element (for links) */
  as?: 'button' | 'a';
  /** href for link buttons */
  href?: string;
  /** target for link buttons */
  target?: string;
}

/**
 * Button Component
 * 
 * A unified button component following the Car and Driver design system.
 * Replaces various button patterns across the codebase with a consistent API.
 * 
 * @example
 * // Primary button
 * <Button variant="primary">Get Started</Button>
 * 
 * // Loading state
 * <Button variant="primary" loading>Submitting...</Button>
 * 
 * // With icon
 * <Button variant="secondary" iconLeft={<SearchIcon />}>Search</Button>
 * 
 * // As a link
 * <Button as="a" href="/pricing" variant="outline">View Pricing</Button>
 */
export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'default',
  fullWidth = false,
  loading = false,
  disabled = false,
  iconLeft,
  iconRight,
  as = 'button',
  href,
  target,
  className = '',
  ...props
}) => {
  const classNames = [
    'btn',
    `btn--${variant}`,
    `btn--${size}`,
    fullWidth && 'btn--full-width',
    loading && 'btn--loading',
    disabled && 'btn--disabled',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const content = (
    <>
      {loading && (
        <span className="btn__spinner" aria-hidden="true">
          <svg className="btn__spinner-icon" viewBox="0 0 24 24" fill="none">
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
        </span>
      )}
      {iconLeft && !loading && <span className="btn__icon btn__icon--left">{iconLeft}</span>}
      <span className="btn__text">{children}</span>
      {iconRight && <span className="btn__icon btn__icon--right">{iconRight}</span>}
    </>
  );

  if (as === 'a' && href) {
    return (
      <a
        href={href}
        target={target}
        className={classNames}
        aria-disabled={disabled || loading}
        {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type="button"
      className={classNames}
      disabled={disabled || loading}
      aria-busy={loading}
      {...props}
    >
      {content}
    </button>
  );
};

export default Button;

