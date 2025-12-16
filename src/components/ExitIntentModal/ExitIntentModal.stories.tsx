import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import { useState } from 'react';
import ExitIntentModal from './ExitIntentModal';

const meta: Meta<typeof ExitIntentModal> = {
  title: 'Organisms/ExitIntentModal',
  component: ExitIntentModal,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
## Exit Intent Modal

A conversion-focused modal that appears when users show exit intent (moving cursor to leave the page).

### Features
- **Exit Detection**: Triggers when cursor moves above the viewport
- **Session Tracking**: Only shows once per session via sessionStorage
- **Email Capture**: Primary CTA for newsletter/account signup
- **Social Login**: Apple and Google sign-in options
- **Animation Styles**: Default and elegant variants
- **Vehicle Context**: Shows the vehicle user was viewing

### Trigger Behavior
- Activates after 3 seconds on page
- Only triggers once per session
- Can be manually controlled via \`isOpen\` prop

### Usage

\`\`\`tsx
import ExitIntentModal from '@/components/ExitIntentModal';

// Auto-trigger on exit intent
<ExitIntentModal vehicleName="2025 Chevrolet Trax" />

// Manual control
<ExitIntentModal 
  isOpen={showModal} 
  onClose={() => setShowModal(false)}
  animationStyle="elegant"
/>
\`\`\`
        `,
      },
      story: {
        inline: false,
        iframeHeight: 700,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    vehicleName: {
      description: 'Name of the vehicle user was viewing (shown in floating card)',
      control: 'text',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '2025 Kia Telluride EX' },
        category: 'Content',
      },
    },
    isOpen: {
      description: 'Manually control modal visibility (bypasses exit intent detection)',
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'State',
      },
    },
    onClose: {
      description: 'Callback when modal is closed',
      table: {
        type: { summary: '() => void' },
        category: 'Events',
      },
    },
    animationStyle: {
      description: 'Animation variant for modal entrance',
      control: 'radio',
      options: ['default', 'elegant'],
      table: {
        type: { summary: "'default' | 'elegant'" },
        defaultValue: { summary: 'default' },
        category: 'Animation',
      },
    },
  },
  args: {
    onClose: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Wrapper component for interactive stories
const ModalWrapper = ({ vehicleName, animationStyle }: { vehicleName?: string; animationStyle?: 'default' | 'elegant' }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div style={{ padding: '40px', minHeight: '400px' }}>
      <button 
        onClick={() => setIsOpen(true)}
        style={{
          padding: '12px 24px',
          background: '#0061af',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          fontSize: '14px',
          fontWeight: '600',
          cursor: 'pointer',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
        }}
      >
        Open Exit Intent Modal
      </button>
      <ExitIntentModal 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)}
        vehicleName={vehicleName}
        animationStyle={animationStyle}
      />
    </div>
  );
};

export const Default: Story = {
  render: () => <ModalWrapper />,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Default modal with standard animation. Click the button to trigger the modal.',
      },
      story: {
        inline: false,
        iframeHeight: 700,
      },
    },
  },
};

export const WithVehicleName: Story = {
  render: () => <ModalWrapper vehicleName="2026 Toyota Corolla XSE" />,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Modal displaying a specific vehicle name in the floating card, providing context about what the user was researching.',
      },
      story: {
        inline: false,
        iframeHeight: 700,
      },
    },
  },
};

export const AlwaysOpen: Story = {
  args: {
    isOpen: true,
    vehicleName: '2024 Honda CR-V EX-L',
    onClose: () => console.log('Modal closed'),
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Modal in always-open state for testing and documentation purposes. Use `isOpen` prop for manual control.',
      },
      story: {
        inline: false,
        iframeHeight: 700,
      },
    },
  },
};

export const ElegantAnimation: Story = {
  render: () => <ModalWrapper vehicleName="2025 Chevrolet Trax 1RS" animationStyle="elegant" />,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: `
**Elegant Animation Variant**

Premium animation style featuring:
- Staggered content reveals with spring easing
- Graceful card cascade with bounce effect
- Vehicle watermark background on visual panel
- Refined hover states with elevation shadows
- Apple-style cubic-bezier timing curves
        `,
      },
      story: {
        inline: false,
        iframeHeight: 700,
      },
    },
  },
};
