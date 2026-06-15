import type { HTMLAttributes } from 'react';
import './Badge.css';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'success' | 'info' | 'dark' | 'neutral';
}

export const Badge = ({
  children,
  variant = 'neutral',
  className = '',
  ...props
}: BadgeProps) => {
  const classNames = ['badge', `badge--${variant}`, className].filter(Boolean).join(' ');

  return (
    <span className={classNames} {...props}>
      {children}
    </span>
  );
};

export default Badge;
