import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import { Toast, ToastProvider, useToast } from './Toast';
import { Button } from '../Button';

const meta: Meta<typeof Toast> = {
  title: 'Molecules/Toast',
  component: Toast,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Toast notification component for success, error, warning, and info messages.',
      },
    },
  },
  tags: ['autodocs'],
  args: {
    onClose: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// ============================================
// BASIC TOAST VARIANTS
// ============================================

export const Success: Story = {
  args: {
    type: 'success',
    title: 'Success!',
    message: 'Your changes have been saved.',
  },
};

export const Error: Story = {
  args: {
    type: 'error',
    title: 'Error',
    message: 'Something went wrong. Please try again.',
  },
};

export const Warning: Story = {
  args: {
    type: 'warning',
    title: 'Warning',
    message: 'Your session will expire in 5 minutes.',
  },
};

export const Info: Story = {
  args: {
    type: 'info',
    title: 'Information',
    message: 'New vehicles have been added to your search.',
  },
};

// ============================================
// WITH ACTIONS
// ============================================

export const WithAction: Story = {
  args: {
    type: 'info',
    title: 'Price Alert',
    message: 'A vehicle you saved just dropped in price!',
    action: { label: 'View', onClick: fn() },
  },
};

export const WithUndoAction: Story = {
  args: {
    type: 'success',
    title: 'Vehicle Removed',
    message: 'Vehicle removed from your saved list.',
    action: { label: 'Undo', onClick: fn() },
  },
};

// ============================================
// WITHOUT TITLE
// ============================================

export const MessageOnly: Story = {
  args: {
    type: 'success',
    message: 'Operation completed successfully.',
  },
};

// ============================================
// INTERACTIVE DEMO
// ============================================

const ToastDemo = () => {
  const { addToast, toasts, removeToast } = useToast();
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center' }}>
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <Button 
          variant="primary"
          onClick={() => addToast({ type: 'success', title: 'Saved!', message: 'Your preferences have been saved.' })}
        >
          Show Success
        </Button>
        <Button 
          variant="danger"
          onClick={() => addToast({ type: 'error', title: 'Error', message: 'Failed to save changes.' })}
        >
          Show Error
        </Button>
        <Button 
          variant="outline"
          onClick={() => addToast({ type: 'warning', title: 'Warning', message: 'Check your connection.' })}
        >
          Show Warning
        </Button>
        <Button 
          variant="secondary"
          onClick={() => addToast({ type: 'info', title: 'Info', message: 'New updates available!' })}
        >
          Show Info
        </Button>
      </div>
      
      <div style={{ position: 'fixed', top: '20px', right: '20px', display: 'flex', flexDirection: 'column', gap: '8px', zIndex: 1000 }}>
        {toasts.map((toast) => (
          <Toast key={toast.id} {...toast} onClose={() => removeToast(toast.id)} />
        ))}
      </div>
    </div>
  );
};

export const InteractiveDemo: Story = {
  render: () => (
    <ToastProvider>
      <ToastDemo />
    </ToastProvider>
  ),
};

// ============================================
// MULTIPLE TOASTS
// ============================================

export const StackedToasts: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <Toast type="success" title="Success" message="First toast" onClose={() => {}} />
      <Toast type="error" title="Error" message="Second toast" onClose={() => {}} />
      <Toast type="warning" title="Warning" message="Third toast" onClose={() => {}} />
      <Toast type="info" title="Info" message="Fourth toast" onClose={() => {}} />
    </div>
  ),
};

// ============================================
// LONG CONTENT
// ============================================

export const LongMessage: Story = {
  args: {
    type: 'info',
    title: 'Important Notice',
    message: 'This is a longer message that demonstrates how the toast handles more content. It should wrap properly and remain readable.',
  },
};
