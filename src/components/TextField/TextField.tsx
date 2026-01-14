import React, { forwardRef, useId } from 'react';
import './TextField.css';

export interface TextFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Field label */
  label?: string;
  /** Helper text below the input */
  helperText?: string;
  /** Error message - shows error state when provided */
  error?: string;
  /** Input size variant */
  size?: 'small' | 'default' | 'large';
  /** Full width input */
  fullWidth?: boolean;
  /** Left icon/addon */
  iconLeft?: React.ReactNode;
  /** Right icon/addon */
  iconRight?: React.ReactNode;
  /** Additional wrapper class */
  wrapperClassName?: string;
}

/**
 * TextField Component
 * 
 * A standardized text input following the Car and Driver design system.
 * 
 * @example
 * // Basic usage
 * <TextField label="Email" placeholder="Enter your email" />
 * 
 * // With error
 * <TextField label="Email" error="Invalid email address" />
 * 
 * // With icon
 * <TextField label="Search" iconLeft={<SearchIcon />} />
 */
export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(({
  label,
  helperText,
  error,
  size = 'default',
  fullWidth = false,
  iconLeft,
  iconRight,
  wrapperClassName = '',
  className = '',
  id,
  ...props
}, ref) => {
  const generatedId = useId();
  const inputId = id || generatedId;
  const hasError = !!error;

  return (
    <div className={`text-field text-field--${size} ${fullWidth ? 'text-field--full-width' : ''} ${hasError ? 'text-field--error' : ''} ${wrapperClassName}`}>
      {label && (
        <label htmlFor={inputId} className="text-field__label">
          {label}
          {props.required && <span className="text-field__required">*</span>}
        </label>
      )}
      <div className="text-field__input-wrapper">
        {iconLeft && <span className="text-field__icon text-field__icon--left">{iconLeft}</span>}
        <input
          ref={ref}
          id={inputId}
          className={`text-field__input ${iconLeft ? 'text-field__input--has-icon-left' : ''} ${iconRight ? 'text-field__input--has-icon-right' : ''} ${className}`}
          aria-invalid={hasError}
          aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
          {...props}
        />
        {iconRight && <span className="text-field__icon text-field__icon--right">{iconRight}</span>}
      </div>
      {error && (
        <span id={`${inputId}-error`} className="text-field__error" role="alert">
          {error}
        </span>
      )}
      {helperText && !error && (
        <span id={`${inputId}-helper`} className="text-field__helper">
          {helperText}
        </span>
      )}
    </div>
  );
});

TextField.displayName = 'TextField';

/**
 * TextArea Component
 * 
 * A standardized textarea following the design system.
 */
export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  helperText?: string;
  error?: string;
  fullWidth?: boolean;
  wrapperClassName?: string;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(({
  label,
  helperText,
  error,
  fullWidth = false,
  wrapperClassName = '',
  className = '',
  id,
  ...props
}, ref) => {
  const generatedId = useId();
  const inputId = id || generatedId;
  const hasError = !!error;

  return (
    <div className={`text-field text-field--textarea ${fullWidth ? 'text-field--full-width' : ''} ${hasError ? 'text-field--error' : ''} ${wrapperClassName}`}>
      {label && (
        <label htmlFor={inputId} className="text-field__label">
          {label}
          {props.required && <span className="text-field__required">*</span>}
        </label>
      )}
      <textarea
        ref={ref}
        id={inputId}
        className={`text-field__textarea ${className}`}
        aria-invalid={hasError}
        aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
        {...props}
      />
      {error && (
        <span id={`${inputId}-error`} className="text-field__error" role="alert">
          {error}
        </span>
      )}
      {helperText && !error && (
        <span id={`${inputId}-helper`} className="text-field__helper">
          {helperText}
        </span>
      )}
    </div>
  );
});

TextArea.displayName = 'TextArea';

/**
 * Select Component
 * 
 * A standardized select dropdown following the design system.
 */
export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  helperText?: string;
  error?: string;
  fullWidth?: boolean;
  wrapperClassName?: string;
  options: Array<{ value: string; label: string; disabled?: boolean }>;
  placeholder?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(({
  label,
  helperText,
  error,
  fullWidth = false,
  wrapperClassName = '',
  className = '',
  options,
  placeholder,
  id,
  ...props
}, ref) => {
  const generatedId = useId();
  const inputId = id || generatedId;
  const hasError = !!error;

  return (
    <div className={`text-field text-field--select ${fullWidth ? 'text-field--full-width' : ''} ${hasError ? 'text-field--error' : ''} ${wrapperClassName}`}>
      {label && (
        <label htmlFor={inputId} className="text-field__label">
          {label}
          {props.required && <span className="text-field__required">*</span>}
        </label>
      )}
      <div className="text-field__select-wrapper">
        <select
          ref={ref}
          id={inputId}
          className={`text-field__select ${className}`}
          aria-invalid={hasError}
          aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value} disabled={option.disabled}>
              {option.label}
            </option>
          ))}
        </select>
        <span className="text-field__select-arrow">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </span>
      </div>
      {error && (
        <span id={`${inputId}-error`} className="text-field__error" role="alert">
          {error}
        </span>
      )}
      {helperText && !error && (
        <span id={`${inputId}-helper`} className="text-field__helper">
          {helperText}
        </span>
      )}
    </div>
  );
});

Select.displayName = 'Select';

export default TextField;

