import type { ReactNode } from 'react';
import './Tabs.css';

export interface TabItem<T extends string = string> {
  value: T;
  label: string;
  icon?: ReactNode;
  count?: number;
  /** Extra content rendered after label+count (e.g. a price) */
  extra?: ReactNode;
  disabled?: boolean;
}

export interface TabsProps<T extends string = string> {
  items: TabItem<T>[];
  value: T;
  onChange: (value: T) => void;
  variant?: 'pills' | 'segmented' | 'underline';
  /** Stretch tabs to fill available width (default: true for segmented/underline, false for pills) */
  fullWidth?: boolean;
  /** Accessible label for the tablist container */
  ariaLabel?: string;
  className?: string;
}

export default function Tabs<T extends string = string>({
  items,
  value,
  onChange,
  variant = 'pills',
  fullWidth,
  ariaLabel = 'Tabs',
  className = '',
}: TabsProps<T>) {
  const stretch = fullWidth ?? (variant !== 'pills');

  return (
    <div
      className={`tabs tabs--${variant} ${stretch ? 'tabs--full-width' : ''} ${className}`.trim()}
      role="tablist"
      aria-label={ariaLabel}
    >
      {items.map(item => {
        const isActive = item.value === value;
        return (
          <button
            key={item.value}
            type="button"
            role="tab"
            aria-selected={isActive}
            className={`tabs__item ${isActive ? 'tabs__item--active' : ''} ${item.disabled ? 'tabs__item--disabled' : ''}`}
            onClick={() => !item.disabled && onChange(item.value)}
            disabled={item.disabled}
          >
            {item.icon && <span className="tabs__item-icon">{item.icon}</span>}
            <span className="tabs__item-label">{item.label}</span>
            {item.count != null && (
              <span className="tabs__item-count">{item.count}</span>
            )}
            {item.extra && <span className="tabs__item-extra">{item.extra}</span>}
          </button>
        );
      })}
    </div>
  );
}
