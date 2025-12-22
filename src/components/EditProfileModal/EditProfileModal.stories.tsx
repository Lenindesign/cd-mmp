import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import EditProfileModal from './EditProfileModal';
import { AuthProvider } from '../../contexts/AuthContext';
import { MemoryRouter } from 'react-router-dom';

const meta: Meta<typeof EditProfileModal> = {
  title: 'Components/EditProfileModal',
  component: EditProfileModal,
  parameters: {
    layout: 'fullscreen',
    router: { skip: true },
  },
  decorators: [
    (Story) => (
      <AuthProvider>
        <MemoryRouter>
          <Story />
        </MemoryRouter>
      </AuthProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof EditProfileModal>;

// Wrapper component to handle state
const EditProfileModalWrapper = () => {
  const [isOpen, setIsOpen] = useState(true);
  
  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f5' }}>
      <button 
        onClick={() => setIsOpen(true)}
        style={{
          padding: '12px 24px',
          margin: '20px',
          background: '#1a1a1a',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
        }}
      >
        Open Edit Profile Modal
      </button>
      <EditProfileModal 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)} 
      />
    </div>
  );
};

export const Default: Story = {
  render: () => <EditProfileModalWrapper />,
};

export const AvatarTab: Story = {
  render: () => <EditProfileModalWrapper />,
  parameters: {
    docs: {
      description: {
        story: 'Modal showing the Avatar selection tab (default view).',
      },
    },
  },
};

