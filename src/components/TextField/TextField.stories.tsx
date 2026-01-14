import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import { useState } from 'react';
import { Search, Mail, Lock, Eye, EyeOff, User, Phone, DollarSign } from 'lucide-react';
import { TextField, TextArea, Select } from './TextField';

// ============================================
// TEXTFIELD STORIES
// ============================================

const textFieldMeta: Meta<typeof TextField> = {
  title: 'Atoms/TextField',
  component: TextField,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Text input component with label, error handling, and icon support.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'tel', 'url'],
    },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
  },
  args: {
    onChange: fn(),
    onBlur: fn(),
    onFocus: fn(),
  },
  decorators: [(Story) => <div style={{ width: '320px' }}><Story /></div>],
};

export default textFieldMeta;
type TextFieldStory = StoryObj<typeof textFieldMeta>;

// Basic
export const Default: TextFieldStory = {
  args: {
    label: 'Full Name',
    placeholder: 'Enter your name',
  },
};

export const WithValue: TextFieldStory = {
  args: {
    label: 'Email Address',
    type: 'email',
    value: 'john@example.com',
  },
};

export const Required: TextFieldStory = {
  args: {
    label: 'Email',
    placeholder: 'Required field',
    required: true,
  },
};

export const WithError: TextFieldStory = {
  args: {
    label: 'Email',
    value: 'invalid-email',
    error: 'Please enter a valid email address',
  },
};

export const WithHelperText: TextFieldStory = {
  args: {
    label: 'Password',
    type: 'password',
    helperText: 'Must be at least 8 characters',
  },
};

export const Disabled: TextFieldStory = {
  args: {
    label: 'Disabled Field',
    value: 'Cannot edit',
    disabled: true,
  },
};

// With Icons
export const WithIconLeft: TextFieldStory = {
  args: {
    label: 'Search',
    placeholder: 'Search vehicles...',
    iconLeft: <Search size={18} />,
  },
};

export const WithIconRight: TextFieldStory = {
  args: {
    label: 'Email',
    placeholder: 'Enter email',
    iconRight: <Mail size={18} />,
  },
};

export const PasswordWithToggle: TextFieldStory = {
  render: () => {
    const PasswordField = () => {
      const [showPassword, setShowPassword] = useState(false);
      return (
        <TextField
          label="Password"
          type={showPassword ? 'text' : 'password'}
          placeholder="Enter password"
          iconLeft={<Lock size={18} />}
          iconRight={
            <button 
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          }
        />
      );
    };
    return <PasswordField />;
  },
};

// ============================================
// SELECT STORIES
// ============================================

export const SelectDefault: StoryObj<typeof Select> = {
  render: () => (
    <Select 
      label="Select Make" 
      placeholder="Choose a make"
      options={[
        { value: 'toyota', label: 'Toyota' },
        { value: 'honda', label: 'Honda' },
        { value: 'ford', label: 'Ford' },
        { value: 'chevrolet', label: 'Chevrolet' },
      ]}
    />
  ),
};

export const SelectWithValue: StoryObj<typeof Select> = {
  render: () => (
    <Select 
      label="Body Style" 
      defaultValue="suv"
      options={[
        { value: 'sedan', label: 'Sedan' },
        { value: 'suv', label: 'SUV' },
        { value: 'truck', label: 'Truck' },
      ]}
    />
  ),
};

// ============================================
// TEXTAREA STORIES
// ============================================

export const TextAreaDefault: StoryObj<typeof TextArea> = {
  render: () => (
    <TextArea
      label="Comments"
      placeholder="Enter your comments..."
      rows={4}
    />
  ),
};

export const TextAreaWithValue: StoryObj<typeof TextArea> = {
  render: () => (
    <TextArea
      label="Description"
      defaultValue="This is a pre-filled description."
      rows={4}
    />
  ),
};

// ============================================
// FORM EXAMPLE
// ============================================

export const CompleteForm: TextFieldStory = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <TextField 
        label="Full Name" 
        placeholder="John Doe" 
        iconLeft={<User size={18} />}
        required
      />
      <TextField 
        label="Email" 
        type="email" 
        placeholder="john@example.com" 
        iconLeft={<Mail size={18} />}
        required
      />
      <TextField 
        label="Phone" 
        type="tel" 
        placeholder="(555) 123-4567" 
        iconLeft={<Phone size={18} />}
      />
      <TextField 
        label="Budget" 
        type="number" 
        placeholder="35000" 
        iconLeft={<DollarSign size={18} />}
        helperText="Your maximum budget"
      />
    </div>
  ),
};

// ============================================
// ALL STATES
// ============================================

export const AllStates: TextFieldStory = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <TextField label="Default" placeholder="Default state" />
      <TextField label="With Value" value="Filled value" />
      <TextField label="With Error" value="Bad value" error="This field has an error" />
      <TextField label="With Helper" placeholder="Enter value" helperText="This is helper text" />
      <TextField label="Disabled" value="Cannot edit" disabled />
      <TextField label="Required" placeholder="Required field" required />
    </div>
  ),
};
