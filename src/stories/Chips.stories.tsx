import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';

/**
 * # Chips / Tags
 * 
 * Chips are compact elements used for multi-select options, filters, and categorization.
 * They follow the Car and Driver design system with clean, minimal styling.
 * 
 * ## Design Specifications
 * 
 * | Property | Default | Hover | Selected |
 * |----------|---------|-------|----------|
 * | Background | `white` | `white` | `var(--color-blue-cobalt)` |
 * | Border | `var(--color-gray-300)` | `var(--color-blue-cobalt)` | `var(--color-blue-cobalt)` |
 * | Text | `var(--color-dark)` | `var(--color-blue-cobalt)` | `white` |
 * 
 * ## Usage Guidelines
 * 
 * - Use chips for multi-select scenarios (e.g., selecting multiple body styles, features)
 * - Use chips for filter tags that can be toggled on/off
 * - Keep chip labels concise (1-3 words)
 * - Group related chips together with consistent spacing
 */

// Styles matching the design system
const styles = {
  container: {
    padding: '2rem',
    fontFamily: 'var(--font-family-primary, Poppins, sans-serif)',
  },
  section: {
    marginBottom: '3rem',
  },
  sectionTitle: {
    fontSize: '1.5rem',
    fontWeight: 600,
    marginBottom: '1rem',
    color: 'var(--color-gray-900, #1a1a1a)',
  },
  sectionDescription: {
    color: 'var(--color-gray-600, #666)',
    marginBottom: '1.5rem',
    lineHeight: 1.6,
  },
  chipContainer: {
    display: 'flex',
    flexWrap: 'wrap' as const,
    gap: '0.75rem',
  },
  chip: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.75rem 1.25rem',
    borderRadius: '4px',
    background: 'var(--color-white, #fff)',
    border: '1px solid var(--color-gray-300, #d1d5db)',
    fontFamily: 'Inter, var(--font-body, sans-serif)',
    fontSize: '0.875rem',
    fontWeight: 500,
    color: 'var(--color-dark, #1a1a1a)',
    cursor: 'pointer',
    transition: 'all 0.15s ease',
  },
  chipSelected: {
    background: 'var(--color-blue-cobalt, #2676DF)',
    borderColor: 'var(--color-blue-cobalt, #2676DF)',
    color: 'var(--color-white, #fff)',
  },
  chipDisabled: {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
  chipSmall: {
    padding: '0.5rem 0.875rem',
    fontSize: '0.75rem',
  },
  chipLarge: {
    padding: '1rem 1.5rem',
    fontSize: '1rem',
  },
  codeBlock: {
    backgroundColor: 'var(--color-gray-900, #1a1a1a)',
    color: '#e5e5e5',
    padding: '1rem',
    borderRadius: '8px',
    fontSize: '0.875rem',
    fontFamily: 'monospace',
    overflow: 'auto',
    marginTop: '1rem',
  },
  previewBox: {
    padding: '2rem',
    backgroundColor: 'var(--color-gray-50, #f9f9f9)',
    borderRadius: '12px',
    border: '1px solid var(--color-gray-200, #e5e5e5)',
    marginBottom: '1rem',
  },
  stateLabel: {
    fontSize: '0.75rem',
    color: 'var(--color-gray-500, #888)',
    marginBottom: '0.5rem',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.05em',
  },
};

// Chip component for stories
interface ChipProps {
  label: string;
  selected?: boolean;
  disabled?: boolean;
  size?: 'small' | 'medium' | 'large';
  icon?: React.ReactNode;
  onClick?: () => void;
}

const Chip: React.FC<ChipProps> = ({ 
  label, 
  selected = false, 
  disabled = false,
  size = 'medium',
  icon,
  onClick 
}) => {
  const sizeStyles = {
    small: styles.chipSmall,
    medium: {},
    large: styles.chipLarge,
  };

  return (
    <button
      style={{
        ...styles.chip,
        ...sizeStyles[size],
        ...(selected ? styles.chipSelected : {}),
        ...(disabled ? styles.chipDisabled : {}),
      }}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      type="button"
    >
      {icon && <span style={{ display: 'flex', alignItems: 'center' }}>{icon}</span>}
      {label}
    </button>
  );
};

// Interactive chip group for demos
interface ChipGroupProps {
  options: string[];
  multiSelect?: boolean;
  size?: 'small' | 'medium' | 'large';
}

const ChipGroup: React.FC<ChipGroupProps> = ({ options, multiSelect = true, size = 'medium' }) => {
  const [selected, setSelected] = useState<string[]>([]);

  const handleClick = (option: string) => {
    if (multiSelect) {
      setSelected(prev => 
        prev.includes(option) 
          ? prev.filter(o => o !== option)
          : [...prev, option]
      );
    } else {
      setSelected(prev => prev.includes(option) ? [] : [option]);
    }
  };

  return (
    <div style={styles.chipContainer}>
      {options.map(option => (
        <Chip
          key={option}
          label={option}
          selected={selected.includes(option)}
          onClick={() => handleClick(option)}
          size={size}
        />
      ))}
    </div>
  );
};

const meta: Meta = {
  title: 'Elements/Chips',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Compact selectable elements for multi-select options, filters, and categorization.',
      },
    },
  },
};

export default meta;

type Story = StoryObj;

/**
 * All chip states: default, hover, selected, and disabled.
 */
export const AllStates: Story = {
  render: () => (
    <div style={styles.container}>
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Chip States</h2>
        <p style={styles.sectionDescription}>
          Chips have four visual states that provide clear feedback to users.
        </p>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
          <div>
            <p style={styles.stateLabel}>Default</p>
            <div style={styles.previewBox}>
              <Chip label="Body Style" />
            </div>
          </div>
          
          <div>
            <p style={styles.stateLabel}>Hover (interact to see)</p>
            <div style={styles.previewBox}>
              <Chip label="Body Style" />
            </div>
          </div>
          
          <div>
            <p style={styles.stateLabel}>Selected</p>
            <div style={styles.previewBox}>
              <Chip label="Body Style" selected />
            </div>
          </div>
          
          <div>
            <p style={styles.stateLabel}>Disabled</p>
            <div style={styles.previewBox}>
              <Chip label="Body Style" disabled />
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};

/**
 * Different chip sizes for various contexts.
 */
export const Sizes: Story = {
  render: () => (
    <div style={styles.container}>
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Chip Sizes</h2>
        <p style={styles.sectionDescription}>
          Three sizes available: small for compact UIs, medium (default) for most uses, and large for prominent selections.
        </p>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div>
            <p style={styles.stateLabel}>Small</p>
            <div style={styles.chipContainer}>
              <Chip label="SUV" size="small" />
              <Chip label="Sedan" size="small" selected />
              <Chip label="Truck" size="small" />
            </div>
          </div>
          
          <div>
            <p style={styles.stateLabel}>Medium (Default)</p>
            <div style={styles.chipContainer}>
              <Chip label="SUV" size="medium" />
              <Chip label="Sedan" size="medium" selected />
              <Chip label="Truck" size="medium" />
            </div>
          </div>
          
          <div>
            <p style={styles.stateLabel}>Large</p>
            <div style={styles.chipContainer}>
              <Chip label="SUV" size="large" />
              <Chip label="Sedan" size="large" selected />
              <Chip label="Truck" size="large" />
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};

/**
 * Interactive multi-select chip groups for filtering.
 */
export const MultiSelect: Story = {
  render: () => (
    <div style={styles.container}>
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Multi-Select Chips</h2>
        <p style={styles.sectionDescription}>
          Click chips to toggle selection. Multiple chips can be selected simultaneously.
        </p>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div>
            <p style={styles.stateLabel}>Body Styles</p>
            <ChipGroup options={['SUV', 'Sedan', 'Truck', 'Coupe', 'Hatchback', 'Convertible', 'Wagon']} />
          </div>
          
          <div>
            <p style={styles.stateLabel}>Fuel Types</p>
            <ChipGroup options={['Gas', 'Hybrid', 'Electric', 'Diesel', 'Plug-in Hybrid']} />
          </div>
          
          <div>
            <p style={styles.stateLabel}>Features</p>
            <ChipGroup options={['AWD', 'Leather Seats', 'Sunroof', 'Navigation', 'Apple CarPlay', 'Heated Seats', 'Backup Camera']} />
          </div>
        </div>
      </div>
    </div>
  ),
};

/**
 * Single-select chip groups where only one option can be active.
 */
export const SingleSelect: Story = {
  render: () => (
    <div style={styles.container}>
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Single-Select Chips</h2>
        <p style={styles.sectionDescription}>
          Only one chip can be selected at a time. Clicking another chip deselects the previous one.
        </p>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div>
            <p style={styles.stateLabel}>Drivetrain</p>
            <ChipGroup options={['FWD', 'RWD', 'AWD', '4WD']} multiSelect={false} />
          </div>
          
          <div>
            <p style={styles.stateLabel}>Transmission</p>
            <ChipGroup options={['Automatic', 'Manual', 'CVT']} multiSelect={false} />
          </div>
          
          <div>
            <p style={styles.stateLabel}>Condition</p>
            <ChipGroup options={['New', 'Used', 'Certified Pre-Owned']} multiSelect={false} />
          </div>
        </div>
      </div>
    </div>
  ),
};

/**
 * Chips with icons for enhanced visual communication.
 */
export const WithIcons: Story = {
  render: () => {
    // Simple SVG icons
    const CarIcon = () => (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M5 17h14v-5l-2-4H7l-2 4v5z"/>
        <circle cx="7.5" cy="17.5" r="1.5"/>
        <circle cx="16.5" cy="17.5" r="1.5"/>
      </svg>
    );
    
    const BoltIcon = () => (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
      </svg>
    );
    
    const LeafIcon = () => (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M6 21c3-3 7-6 11-6 0 0 1-9-11-9 0 4 0 9-6 15"/>
        <path d="M6 21c-2-2-2-5-2-8"/>
      </svg>
    );

    const [selected, setSelected] = useState<string[]>(['electric']);

    const toggle = (id: string) => {
      setSelected(prev => 
        prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
      );
    };

    return (
      <div style={styles.container}>
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Chips with Icons</h2>
          <p style={styles.sectionDescription}>
            Add icons to chips for better visual recognition, especially useful for categories or features.
          </p>
          
          <div style={styles.previewBox}>
            <div style={styles.chipContainer}>
              <Chip 
                label="All Vehicles" 
                icon={<CarIcon />}
                selected={selected.includes('all')}
                onClick={() => toggle('all')}
              />
              <Chip 
                label="Electric" 
                icon={<BoltIcon />}
                selected={selected.includes('electric')}
                onClick={() => toggle('electric')}
              />
              <Chip 
                label="Hybrid" 
                icon={<LeafIcon />}
                selected={selected.includes('hybrid')}
                onClick={() => toggle('hybrid')}
              />
            </div>
          </div>
        </div>
      </div>
    );
  },
};

/**
 * Real-world examples of chips in context.
 */
export const InContext: Story = {
  render: () => {
    const [bodyStyles, setBodyStyles] = useState<string[]>(['SUV']);
    const [priceRange, setPriceRange] = useState<string[]>(['$30k-$50k']);

    const toggleBodyStyle = (style: string) => {
      setBodyStyles(prev => 
        prev.includes(style) ? prev.filter(s => s !== style) : [...prev, style]
      );
    };

    const togglePrice = (price: string) => {
      setPriceRange(prev => 
        prev.includes(price) ? prev.filter(p => p !== price) : [...prev, price]
      );
    };

    return (
      <div style={styles.container}>
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Chips in Context</h2>
          <p style={styles.sectionDescription}>
            Examples of how chips are used in the application for filtering and selection.
          </p>
          
          {/* Filter Panel Example */}
          <div style={{ 
            maxWidth: '600px',
            padding: '1.5rem',
            backgroundColor: 'white',
            borderRadius: '12px',
            border: '1px solid var(--color-gray-200, #e5e5e5)',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          }}>
            <h3 style={{ 
              fontSize: '1rem', 
              fontWeight: 600, 
              marginBottom: '1.5rem',
              color: 'var(--color-dark, #1a1a1a)',
            }}>
              Filter Vehicles
            </h3>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ 
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: 500,
                marginBottom: '0.75rem',
                color: 'var(--color-gray-700, #374151)',
              }}>
                Body Style
              </label>
              <div style={styles.chipContainer}>
                {['SUV', 'Sedan', 'Truck', 'Coupe', 'Hatchback'].map(style => (
                  <Chip
                    key={style}
                    label={style}
                    size="small"
                    selected={bodyStyles.includes(style)}
                    onClick={() => toggleBodyStyle(style)}
                  />
                ))}
              </div>
            </div>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ 
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: 500,
                marginBottom: '0.75rem',
                color: 'var(--color-gray-700, #374151)',
              }}>
                Price Range
              </label>
              <div style={styles.chipContainer}>
                {['Under $30k', '$30k-$50k', '$50k-$75k', '$75k+'].map(price => (
                  <Chip
                    key={price}
                    label={price}
                    size="small"
                    selected={priceRange.includes(price)}
                    onClick={() => togglePrice(price)}
                  />
                ))}
              </div>
            </div>
            
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingTop: '1rem',
              borderTop: '1px solid var(--color-gray-200, #e5e5e5)',
            }}>
              <span style={{ fontSize: '0.875rem', color: 'var(--color-gray-500, #888)' }}>
                {bodyStyles.length + priceRange.length} filters selected
              </span>
              <button style={{
                padding: '0.5rem 1rem',
                fontSize: '0.875rem',
                fontWeight: 600,
                color: 'var(--color-blue-cobalt, #2676DF)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
              }}>
                Clear All
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  },
};

/**
 * CSS and implementation code for developers.
 */
export const Implementation: Story = {
  render: () => (
    <div style={styles.container}>
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Implementation</h2>
        
        <h3 style={{ fontSize: '1rem', fontWeight: 500, marginBottom: '0.5rem' }}>CSS Classes</h3>
        <p style={styles.sectionDescription}>
          Use these existing CSS classes from the design system:
        </p>
        <pre style={styles.codeBlock}>
{`/* Container for chip group */
.onboarding-tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-3);
  justify-content: center;
  margin-bottom: var(--spacing-8);
}

/* Individual chip */
.onboarding-tag {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-2);
  padding: var(--spacing-3) var(--spacing-5);
  border-radius: var(--spacing-1);
  background: var(--color-white);
  border: 1px solid var(--color-gray-300);
  font-family: 'Inter', var(--font-body);
  font-size: var(--font-size-sm);
  font-weight: 500;
  color: var(--color-dark);
  cursor: pointer;
  transition: all var(--transition-fast);
}

/* Hover state */
.onboarding-tag:hover {
  border-color: var(--color-blue-cobalt);
  color: var(--color-blue-cobalt);
}

/* Selected state */
.onboarding-tag--selected {
  background: var(--color-blue-cobalt);
  border-color: var(--color-blue-cobalt);
  color: var(--color-white);
}

/* Selected + hover */
.onboarding-tag--selected:hover {
  background: var(--color-dark);
  border-color: var(--color-dark);
  color: var(--color-white);
}`}
        </pre>
        
        <h3 style={{ fontSize: '1rem', fontWeight: 500, marginTop: '2rem', marginBottom: '0.5rem' }}>React Usage</h3>
        <p style={styles.sectionDescription}>
          Example implementation with state management:
        </p>
        <pre style={styles.codeBlock}>
{`import { useState } from 'react';

const FilterChips = () => {
  const [selected, setSelected] = useState<string[]>([]);
  const options = ['SUV', 'Sedan', 'Truck', 'Coupe'];

  const toggle = (option: string) => {
    setSelected(prev => 
      prev.includes(option) 
        ? prev.filter(o => o !== option)
        : [...prev, option]
    );
  };

  return (
    <div className="onboarding-tags">
      {options.map(option => (
        <button
          key={option}
          className={\`onboarding-tag \${
            selected.includes(option) ? 'onboarding-tag--selected' : ''
          }\`}
          onClick={() => toggle(option)}
          type="button"
        >
          {option}
        </button>
      ))}
    </div>
  );
};`}
        </pre>

        <h3 style={{ fontSize: '1rem', fontWeight: 500, marginTop: '2rem', marginBottom: '0.5rem' }}>Design Tokens Used</h3>
        <pre style={styles.codeBlock}>
{`/* Colors */
--color-white: #ffffff
--color-dark: #1a1a1a
--color-gray-300: #d1d5db
--color-blue-cobalt: #2676DF

/* Spacing */
--spacing-1: 4px   /* border-radius */
--spacing-2: 8px   /* icon gap */
--spacing-3: 12px  /* vertical padding, container gap */
--spacing-5: 20px  /* horizontal padding */

/* Typography */
--font-body: Inter, sans-serif
--font-size-sm: 0.875rem (14px)

/* Transitions */
--transition-fast: 0.15s ease`}
        </pre>
      </div>
    </div>
  ),
};

