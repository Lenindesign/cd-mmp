import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Check, ChevronDown, Eye, EyeOff, Search, X } from 'lucide-react';

/**
 * # Form Controls
 * 
 * Core form elements used throughout the application for user input.
 * All form controls follow the Car and Driver design system with consistent
 * styling, spacing, and interaction patterns.
 * 
 * ## Design Guidelines
 * 
 * - All inputs have a minimum height of 44px for touch accessibility
 * - Focus states use `var(--color-blue-cobalt)` with a 2px outline
 * - Error states use `var(--color-error)` for borders and messages
 * - Labels are positioned above inputs with 8px spacing
 * - Helper text appears below inputs in a muted color
 */

const styles = {
  container: {
    padding: '2rem',
    fontFamily: 'var(--font-body)',
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
  previewBox: {
    padding: '2rem',
    backgroundColor: 'var(--color-gray-50, #f9f9f9)',
    borderRadius: '12px',
    border: '1px solid var(--color-gray-200, #e5e5e5)',
    marginBottom: '1rem',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '2rem',
  },
  label: {
    fontSize: '0.75rem',
    color: 'var(--color-gray-500, #888)',
    marginBottom: '0.5rem',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.05em',
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
};

// Form field wrapper styles
const fieldStyles = {
  wrapper: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '0.5rem',
  },
  label: {
    fontSize: '0.875rem',
    fontWeight: 500,
    color: 'var(--color-gray-700, #374151)',
  },
  input: {
    width: '100%',
    minHeight: '44px',
    padding: '0.75rem 1rem',
    fontSize: '1rem',
    fontFamily: 'Inter, sans-serif',
    color: 'var(--color-dark, #222)',
    backgroundColor: 'var(--color-white, #fff)',
    border: '1px solid var(--color-gray-300, #d1d5db)',
    borderRadius: '4px',
    outline: 'none',
    transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
  },
  inputFocus: {
    borderColor: 'var(--color-blue-cobalt, #2676DF)',
    boxShadow: '0 0 0 2px rgba(38, 118, 223, 0.2)',
  },
  inputError: {
    borderColor: 'var(--color-error, #ef4444)',
  },
  helperText: {
    fontSize: '0.75rem',
    color: 'var(--color-gray-500, #888)',
  },
  errorText: {
    fontSize: '0.75rem',
    color: 'var(--color-error, #ef4444)',
  },
};

// Text Input Component
interface TextInputProps {
  label?: string;
  placeholder?: string;
  helperText?: string;
  error?: string;
  type?: 'text' | 'email' | 'password' | 'search';
  disabled?: boolean;
  value?: string;
  onChange?: (value: string) => void;
}

const TextInput: React.FC<TextInputProps> = ({
  label,
  placeholder,
  helperText,
  error,
  type = 'text',
  disabled = false,
  value,
  onChange,
}) => {
  const [focused, setFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [internalValue, setInternalValue] = useState(value || '');

  const actualValue = value !== undefined ? value : internalValue;
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInternalValue(newValue);
    onChange?.(newValue);
  };

  const inputType = type === 'password' && showPassword ? 'text' : type;

  return (
    <div style={fieldStyles.wrapper}>
      {label && <label style={fieldStyles.label}>{label}</label>}
      <div style={{ position: 'relative' }}>
        {type === 'search' && (
          <Search 
            size={18} 
            style={{ 
              position: 'absolute', 
              left: '12px', 
              top: '50%', 
              transform: 'translateY(-50%)',
              color: 'var(--color-gray-400)',
            }} 
          />
        )}
        <input
          type={inputType}
          placeholder={placeholder}
          disabled={disabled}
          value={actualValue}
          onChange={handleChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            ...fieldStyles.input,
            ...(focused ? fieldStyles.inputFocus : {}),
            ...(error ? fieldStyles.inputError : {}),
            ...(disabled ? { opacity: 0.5, cursor: 'not-allowed' } : {}),
            ...(type === 'search' ? { paddingLeft: '40px' } : {}),
            ...(type === 'password' ? { paddingRight: '44px' } : {}),
          }}
        />
        {type === 'password' && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: 'absolute',
              right: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--color-gray-400)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
        {type === 'search' && actualValue && (
          <button
            type="button"
            onClick={() => {
              setInternalValue('');
              onChange?.('');
            }}
            style={{
              position: 'absolute',
              right: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--color-gray-400)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <X size={18} />
          </button>
        )}
      </div>
      {error && <span style={fieldStyles.errorText}>{error}</span>}
      {helperText && !error && <span style={fieldStyles.helperText}>{helperText}</span>}
    </div>
  );
};

// Checkbox Component
interface CheckboxProps {
  label: string;
  checked?: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({
  label,
  checked = false,
  disabled = false,
  onChange,
}) => {
  const [isChecked, setIsChecked] = useState(checked);

  const handleChange = () => {
    if (disabled) return;
    const newValue = !isChecked;
    setIsChecked(newValue);
    onChange?.(newValue);
  };

  return (
    <label style={{
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
    }}>
      <div
        onClick={handleChange}
        style={{
          width: '20px',
          height: '20px',
          borderRadius: '4px',
          border: `2px solid ${isChecked ? 'var(--color-blue-cobalt, #2676DF)' : 'var(--color-gray-300, #d1d5db)'}`,
          backgroundColor: isChecked ? 'var(--color-blue-cobalt, #2676DF)' : 'transparent',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.15s ease',
          flexShrink: 0,
        }}
      >
        {isChecked && <Check size={14} color="white" strokeWidth={3} />}
      </div>
      <span style={{ fontSize: '0.875rem', color: 'var(--color-gray-700, #374151)' }}>{label}</span>
    </label>
  );
};

// Radio Component
interface RadioProps {
  label: string;
  name: string;
  value: string;
  checked?: boolean;
  disabled?: boolean;
  onChange?: (value: string) => void;
}

const Radio: React.FC<RadioProps> = ({
  label,
  name: _name,
  value,
  checked = false,
  disabled = false,
  onChange,
}) => {
  void _name; // Used for form grouping
  return (
    <label style={{
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
    }}>
      <div
        onClick={() => !disabled && onChange?.(value)}
        style={{
          width: '20px',
          height: '20px',
          borderRadius: '50%',
          border: `2px solid ${checked ? 'var(--color-blue-cobalt, #2676DF)' : 'var(--color-gray-300, #d1d5db)'}`,
          backgroundColor: 'transparent',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.15s ease',
          flexShrink: 0,
        }}
      >
        {checked && (
          <div style={{
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            backgroundColor: 'var(--color-blue-cobalt, #2676DF)',
          }} />
        )}
      </div>
      <span style={{ fontSize: '0.875rem', color: 'var(--color-gray-700, #374151)' }}>{label}</span>
    </label>
  );
};

// Radio Group Component
interface RadioGroupProps {
  name: string;
  options: { value: string; label: string }[];
  value?: string;
  onChange?: (value: string) => void;
}

const RadioGroup: React.FC<RadioGroupProps> = ({ name, options, value, onChange }) => {
  const [selected, setSelected] = useState(value || '');

  const handleChange = (val: string) => {
    setSelected(val);
    onChange?.(val);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      {options.map((option) => (
        <Radio
          key={option.value}
          name={name}
          value={option.value}
          label={option.label}
          checked={selected === option.value}
          onChange={handleChange}
        />
      ))}
    </div>
  );
};

// Toggle/Switch Component
interface ToggleProps {
  label?: string;
  checked?: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
}

const Toggle: React.FC<ToggleProps> = ({
  label,
  checked = false,
  disabled = false,
  onChange,
}) => {
  const [isOn, setIsOn] = useState(checked);

  const handleToggle = () => {
    if (disabled) return;
    const newValue = !isOn;
    setIsOn(newValue);
    onChange?.(newValue);
  };

  return (
    <label style={{
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
    }}>
      <div
        onClick={handleToggle}
        style={{
          width: '44px',
          height: '24px',
          borderRadius: '12px',
          backgroundColor: isOn ? 'var(--color-blue-cobalt, #2676DF)' : 'var(--color-gray-300, #d1d5db)',
          position: 'relative',
          transition: 'background-color 0.2s ease',
          flexShrink: 0,
        }}
      >
        <div style={{
          width: '20px',
          height: '20px',
          borderRadius: '50%',
          backgroundColor: 'white',
          position: 'absolute',
          top: '2px',
          left: isOn ? '22px' : '2px',
          transition: 'left 0.2s ease',
          boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
        }} />
      </div>
      {label && <span style={{ fontSize: '0.875rem', color: 'var(--color-gray-700, #374151)' }}>{label}</span>}
    </label>
  );
};

// Select Component
interface SelectProps {
  label?: string;
  options: { value: string; label: string }[];
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  onChange?: (value: string) => void;
}

const Select: React.FC<SelectProps> = ({
  label,
  options,
  value,
  placeholder = 'Select an option',
  disabled = false,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(value || '');

  const selectedOption = options.find(o => o.value === selected);

  const handleSelect = (val: string) => {
    setSelected(val);
    setIsOpen(false);
    onChange?.(val);
  };

  return (
    <div style={fieldStyles.wrapper}>
      {label && <label style={fieldStyles.label}>{label}</label>}
      <div style={{ position: 'relative' }}>
        <button
          type="button"
          disabled={disabled}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          style={{
            ...fieldStyles.input,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            cursor: disabled ? 'not-allowed' : 'pointer',
            opacity: disabled ? 0.5 : 1,
            textAlign: 'left',
            color: selected ? 'var(--color-dark)' : 'var(--color-gray-400)',
          }}
        >
          <span>{selectedOption?.label || placeholder}</span>
          <ChevronDown size={18} style={{ 
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s ease',
            color: 'var(--color-gray-400)',
          }} />
        </button>
        {isOpen && (
          <div style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            marginTop: '4px',
            backgroundColor: 'white',
            border: '1px solid var(--color-gray-200)',
            borderRadius: '4px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            zIndex: 10,
            maxHeight: '200px',
            overflowY: 'auto',
          }}>
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => handleSelect(option.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  textAlign: 'left',
                  border: 'none',
                  background: selected === option.value ? 'var(--color-gray-100)' : 'transparent',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  color: 'var(--color-gray-700)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                {option.label}
                {selected === option.value && <Check size={16} color="var(--color-blue-cobalt)" />}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Textarea Component
interface TextareaProps {
  label?: string;
  placeholder?: string;
  helperText?: string;
  error?: string;
  rows?: number;
  disabled?: boolean;
  value?: string;
  onChange?: (value: string) => void;
}

const Textarea: React.FC<TextareaProps> = ({
  label,
  placeholder,
  helperText,
  error,
  rows = 4,
  disabled = false,
  value,
  onChange,
}) => {
  const [focused, setFocused] = useState(false);

  return (
    <div style={fieldStyles.wrapper}>
      {label && <label style={fieldStyles.label}>{label}</label>}
      <textarea
        placeholder={placeholder}
        disabled={disabled}
        rows={rows}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          ...fieldStyles.input,
          minHeight: 'auto',
          resize: 'vertical',
          ...(focused ? fieldStyles.inputFocus : {}),
          ...(error ? fieldStyles.inputError : {}),
          ...(disabled ? { opacity: 0.5, cursor: 'not-allowed' } : {}),
        }}
      />
      {error && <span style={fieldStyles.errorText}>{error}</span>}
      {helperText && !error && <span style={fieldStyles.helperText}>{helperText}</span>}
    </div>
  );
};

const meta: Meta = {
  title: 'Elements/Form Controls',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Core form elements including inputs, checkboxes, radios, toggles, and selects.',
      },
    },
  },
};

export default meta;

type Story = StoryObj;

/**
 * Text input variations including search and password fields.
 */
export const TextInputs: Story = {
  render: () => (
    <div style={styles.container}>
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Text Inputs</h2>
        <p style={styles.sectionDescription}>
          Standard text inputs with support for labels, helper text, and error states.
        </p>
        
        <div style={styles.grid}>
          <TextInput 
            label="Email Address" 
            type="email"
            placeholder="john@example.com" 
            helperText="We'll never share your email"
          />
          <TextInput 
            label="Password" 
            type="password"
            placeholder="Enter password" 
          />
          <TextInput 
            label="Search" 
            type="search"
            placeholder="Search vehicles..." 
          />
          <TextInput 
            label="With Error" 
            placeholder="Enter value" 
            error="This field is required"
          />
          <TextInput 
            label="Disabled" 
            placeholder="Cannot edit" 
            disabled
          />
        </div>
      </div>
    </div>
  ),
};

/**
 * Checkbox controls for boolean selections.
 */
export const Checkboxes: Story = {
  render: () => {
    const [values, setValues] = useState({
      option1: false,
      option2: true,
      option3: false,
    });

    return (
      <div style={styles.container}>
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Checkboxes</h2>
          <p style={styles.sectionDescription}>
            Use checkboxes for multiple selections or boolean toggles.
          </p>
          
          <div style={styles.previewBox}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <Checkbox 
                label="I agree to the terms and conditions" 
                checked={values.option1}
                onChange={(checked) => setValues(v => ({ ...v, option1: checked }))}
              />
              <Checkbox 
                label="Subscribe to newsletter" 
                checked={values.option2}
                onChange={(checked) => setValues(v => ({ ...v, option2: checked }))}
              />
              <Checkbox 
                label="Remember my preferences" 
                checked={values.option3}
                onChange={(checked) => setValues(v => ({ ...v, option3: checked }))}
              />
              <Checkbox 
                label="Disabled option" 
                disabled
              />
              <Checkbox 
                label="Disabled checked" 
                checked
                disabled
              />
            </div>
          </div>
        </div>
      </div>
    );
  },
};

/**
 * Radio buttons for single selection from multiple options.
 */
export const RadioButtons: Story = {
  render: () => (
    <div style={styles.container}>
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Radio Buttons</h2>
        <p style={styles.sectionDescription}>
          Use radio buttons when users must select exactly one option from a group.
        </p>
        
        <div style={styles.grid}>
          <div>
            <p style={styles.label}>Drivetrain</p>
            <div style={styles.previewBox}>
              <RadioGroup 
                name="drivetrain"
                options={[
                  { value: 'fwd', label: 'Front-Wheel Drive (FWD)' },
                  { value: 'rwd', label: 'Rear-Wheel Drive (RWD)' },
                  { value: 'awd', label: 'All-Wheel Drive (AWD)' },
                  { value: '4wd', label: 'Four-Wheel Drive (4WD)' },
                ]}
              />
            </div>
          </div>
          
          <div>
            <p style={styles.label}>Condition</p>
            <div style={styles.previewBox}>
              <RadioGroup 
                name="condition"
                options={[
                  { value: 'new', label: 'New' },
                  { value: 'used', label: 'Used' },
                  { value: 'cpo', label: 'Certified Pre-Owned' },
                ]}
                value="new"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};

/**
 * Toggle switches for on/off settings.
 */
export const Toggles: Story = {
  render: () => {
    const [notifications, setNotifications] = useState(true);
    const [darkMode, setDarkMode] = useState(false);
    const [autoSave, setAutoSave] = useState(true);

    return (
      <div style={styles.container}>
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Toggles / Switches</h2>
          <p style={styles.sectionDescription}>
            Toggles are used for binary settings that take effect immediately.
          </p>
          
          <div style={styles.previewBox}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '300px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: 500, marginBottom: '0.25rem' }}>Push Notifications</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-gray-500)' }}>Receive alerts for price drops</div>
                </div>
                <Toggle checked={notifications} onChange={setNotifications} />
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: 500, marginBottom: '0.25rem' }}>Dark Mode</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-gray-500)' }}>Use dark theme</div>
                </div>
                <Toggle checked={darkMode} onChange={setDarkMode} />
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: 500, marginBottom: '0.25rem' }}>Auto-save Searches</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-gray-500)' }}>Save your search history</div>
                </div>
                <Toggle checked={autoSave} onChange={setAutoSave} />
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', opacity: 0.5 }}>
                <div>
                  <div style={{ fontWeight: 500, marginBottom: '0.25rem' }}>Disabled Toggle</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-gray-500)' }}>This option is unavailable</div>
                </div>
                <Toggle disabled />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
};

/**
 * Select dropdowns for choosing from a list of options.
 */
export const Selects: Story = {
  render: () => (
    <div style={styles.container}>
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Select Dropdowns</h2>
        <p style={styles.sectionDescription}>
          Use select dropdowns when users need to choose one option from a longer list.
        </p>
        
        <div style={styles.grid}>
          <Select 
            label="Body Style"
            placeholder="Select body style"
            options={[
              { value: 'sedan', label: 'Sedan' },
              { value: 'suv', label: 'SUV' },
              { value: 'truck', label: 'Truck' },
              { value: 'coupe', label: 'Coupe' },
              { value: 'hatchback', label: 'Hatchback' },
              { value: 'convertible', label: 'Convertible' },
              { value: 'wagon', label: 'Wagon' },
            ]}
          />
          
          <Select 
            label="Price Range"
            placeholder="Select price range"
            options={[
              { value: 'under-20k', label: 'Under $20,000' },
              { value: '20k-30k', label: '$20,000 - $30,000' },
              { value: '30k-50k', label: '$30,000 - $50,000' },
              { value: '50k-75k', label: '$50,000 - $75,000' },
              { value: 'over-75k', label: 'Over $75,000' },
            ]}
            value="30k-50k"
          />
          
          <Select 
            label="Disabled Select"
            placeholder="Cannot select"
            disabled
            options={[
              { value: 'option1', label: 'Option 1' },
            ]}
          />
        </div>
      </div>
    </div>
  ),
};

/**
 * Textarea for multi-line text input.
 */
export const Textareas: Story = {
  render: () => (
    <div style={styles.container}>
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Textareas</h2>
        <p style={styles.sectionDescription}>
          Use textareas for longer form text input like comments or messages.
        </p>
        
        <div style={styles.grid}>
          <Textarea 
            label="Message to Dealer"
            placeholder="Write your message here..."
            helperText="Be specific about your questions or requirements"
          />
          
          <Textarea 
            label="With Error"
            placeholder="Enter description..."
            error="Please enter at least 20 characters"
            rows={3}
          />
        </div>
      </div>
    </div>
  ),
};

/**
 * Complete form example with multiple control types.
 */
export const CompleteForm: Story = {
  render: () => {
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      bodyStyle: '',
      features: { awd: false, sunroof: false, leather: true },
      condition: 'new',
      notifications: true,
      message: '',
    });

    return (
      <div style={styles.container}>
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Complete Form Example</h2>
          <p style={styles.sectionDescription}>
            A realistic form combining multiple control types.
          </p>
          
          <div style={{
            maxWidth: '500px',
            padding: '2rem',
            backgroundColor: 'white',
            borderRadius: '12px',
            border: '1px solid var(--color-gray-200)',
          }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1.5rem' }}>Contact Dealer</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <TextInput 
                label="Full Name" 
                placeholder="John Smith"
                value={formData.name}
                onChange={(name) => setFormData(f => ({ ...f, name }))}
              />
              
              <TextInput 
                label="Email Address" 
                type="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={(email) => setFormData(f => ({ ...f, email }))}
              />
              
              <Select 
                label="Interested Body Style"
                placeholder="Select body style"
                value={formData.bodyStyle}
                onChange={(bodyStyle) => setFormData(f => ({ ...f, bodyStyle }))}
                options={[
                  { value: 'sedan', label: 'Sedan' },
                  { value: 'suv', label: 'SUV' },
                  { value: 'truck', label: 'Truck' },
                ]}
              />
              
              <div>
                <label style={fieldStyles.label}>Desired Features</label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '0.5rem' }}>
                  <Checkbox 
                    label="All-Wheel Drive" 
                    checked={formData.features.awd}
                    onChange={(awd) => setFormData(f => ({ ...f, features: { ...f.features, awd } }))}
                  />
                  <Checkbox 
                    label="Sunroof" 
                    checked={formData.features.sunroof}
                    onChange={(sunroof) => setFormData(f => ({ ...f, features: { ...f.features, sunroof } }))}
                  />
                  <Checkbox 
                    label="Leather Seats" 
                    checked={formData.features.leather}
                    onChange={(leather) => setFormData(f => ({ ...f, features: { ...f.features, leather } }))}
                  />
                </div>
              </div>
              
              <div>
                <label style={fieldStyles.label}>Vehicle Condition</label>
                <div style={{ marginTop: '0.5rem' }}>
                  <RadioGroup 
                    name="condition"
                    value={formData.condition}
                    onChange={(condition) => setFormData(f => ({ ...f, condition }))}
                    options={[
                      { value: 'new', label: 'New' },
                      { value: 'used', label: 'Used' },
                      { value: 'cpo', label: 'Certified Pre-Owned' },
                    ]}
                  />
                </div>
              </div>
              
              <Textarea 
                label="Additional Message"
                placeholder="Any specific questions or requirements..."
                value={formData.message}
                onChange={(message) => setFormData(f => ({ ...f, message }))}
                rows={3}
              />
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.875rem' }}>Email me updates</span>
                <Toggle 
                  checked={formData.notifications}
                  onChange={(notifications) => setFormData(f => ({ ...f, notifications }))}
                />
              </div>
              
              <button style={{
                width: '100%',
                padding: '0.875rem',
                backgroundColor: 'var(--color-blue-cobalt, #2676DF)',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                fontSize: '1rem',
                fontWeight: 600,
                cursor: 'pointer',
              }}>
                Submit Inquiry
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  },
};

/**
 * Implementation code and CSS variables.
 */
export const Implementation: Story = {
  render: () => (
    <div style={styles.container}>
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Implementation</h2>
        
        <h3 style={{ fontSize: '1rem', fontWeight: 500, marginBottom: '0.5rem' }}>Base Input Styles</h3>
        <pre style={styles.codeBlock}>
{`.form-input {
  width: 100%;
  min-height: 44px;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  font-family: Inter, sans-serif;
  color: var(--color-dark);
  background-color: var(--color-white);
  border: 1px solid var(--color-gray-300);
  border-radius: 4px;
  outline: none;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
}

.form-input:focus {
  border-color: var(--color-blue-cobalt);
  box-shadow: 0 0 0 2px rgba(38, 118, 223, 0.2);
}

.form-input--error {
  border-color: var(--color-error);
}

.form-input:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}`}
        </pre>

        <h3 style={{ fontSize: '1rem', fontWeight: 500, marginTop: '2rem', marginBottom: '0.5rem' }}>CSS Variables Used</h3>
        <pre style={styles.codeBlock}>
{`/* Form colors */
--color-blue-cobalt: #1B5F8A    /* Focus states, selected items */
--color-gray-300: #d1d5db       /* Default borders */
--color-gray-400: #999          /* Placeholder text */
--color-gray-500: #888          /* Helper text */
--color-gray-700: #374151       /* Labels, input text */
--color-error: #ef4444          /* Error states */

/* Sizing */
--min-touch-target: 44px        /* Minimum interactive element size */
--border-radius-sm: 4px         /* Input border radius */

/* Transitions */
--transition-fast: 150ms ease   /* Focus/hover transitions */`}
        </pre>

        <h3 style={{ fontSize: '1rem', fontWeight: 500, marginTop: '2rem', marginBottom: '0.5rem' }}>Accessibility Notes</h3>
        <pre style={styles.codeBlock}>
{`/* Ensure all form controls have:
 * - Visible focus indicators (2px outline)
 * - Associated labels (use htmlFor/id)
 * - Error messages linked via aria-describedby
 * - Minimum 44px touch target
 * - Sufficient color contrast (4.5:1 for text)
 */

<label htmlFor="email">Email</label>
<input 
  id="email"
  type="email"
  aria-describedby="email-error"
  aria-invalid={hasError}
/>
{hasError && (
  <span id="email-error" role="alert">
    Please enter a valid email
  </span>
)}`}
        </pre>
      </div>
    </div>
  ),
};

