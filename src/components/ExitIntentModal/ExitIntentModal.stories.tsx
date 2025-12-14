import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import ExitIntentModal from './ExitIntentModal';
import { Button } from '../Button';

const meta: Meta<typeof ExitIntentModal> = {
  title: 'Organisms/ExitIntentModal',
  component: ExitIntentModal,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Modal that appears when user shows exit intent. Used for capturing email subscriptions.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const ModalDemo = () => {
      const [isOpen, setIsOpen] = useState(false);
      return (
        <>
          <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
          <ExitIntentModal 
            isOpen={isOpen} 
            onClose={() => setIsOpen(false)} 
          />
        </>
      );
    };
    return <ModalDemo />;
  },
};

export const WithVehicleName: Story = {
  render: () => {
    const ModalDemo = () => {
      const [isOpen, setIsOpen] = useState(false);
      return (
        <>
          <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
          <ExitIntentModal 
            vehicleName="2024 Toyota Camry XSE"
            isOpen={isOpen} 
            onClose={() => setIsOpen(false)} 
          />
        </>
      );
    };
    return <ModalDemo />;
  },
};

export const AlwaysOpen: Story = {
  args: {
    isOpen: true,
    vehicleName: '2024 Honda CR-V EX-L',
    onClose: () => {},
  },
  parameters: {
    layout: 'fullscreen',
  },
};
