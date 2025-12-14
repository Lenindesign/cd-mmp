import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import ExitIntentModal from './ExitIntentModal';

const meta: Meta<typeof ExitIntentModal> = {
  title: 'Organisms/ExitIntentModal',
  component: ExitIntentModal,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Modal that appears when user shows exit intent. Used for capturing email subscriptions.',
      },
      story: {
        inline: false,
        iframeHeight: 700,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Wrapper component for interactive stories
const ModalWrapper = ({ vehicleName }: { vehicleName?: string }) => {
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
      />
    </div>
  );
};

export const Default: Story = {
  render: () => <ModalWrapper />,
  parameters: {
    layout: 'fullscreen',
    docs: {
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
      story: {
        inline: false,
        iframeHeight: 700,
      },
    },
  },
};
