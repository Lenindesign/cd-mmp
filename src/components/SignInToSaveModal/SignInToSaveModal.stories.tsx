import type { Meta, StoryObj } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import SignInToSaveModal from './SignInToSaveModal';

const meta: Meta<typeof SignInToSaveModal> = {
  title: 'Components/SignInToSaveModal',
  component: SignInToSaveModal,
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A modal that prompts unauthenticated users to sign in when they try to save a vehicle, article, or video.',
      },
    },
  },
  argTypes: {
    itemType: {
      control: 'select',
      options: ['vehicle', 'article', 'video'],
      description: 'The type of item being saved',
    },
    isOpen: {
      control: 'boolean',
      description: 'Whether the modal is open',
    },
    itemName: {
      control: 'text',
      description: 'The name of the item being saved',
    },
    itemImage: {
      control: 'text',
      description: 'Optional image URL for the item',
    },
  },
};

export default meta;
type Story = StoryObj<typeof SignInToSaveModal>;

// Vehicle save modal
export const SaveVehicle: Story = {
  args: {
    isOpen: true,
    onClose: () => console.log('Modal closed'),
    itemType: 'vehicle',
    itemName: '2025 Honda Accord',
    itemImage: 'https://d2kde5ohu8qb21.cloudfront.net/files/65a1ccd79afa860008125aac/2024-honda-accord-12.jpg',
  },
};

// Article save modal
export const SaveArticle: Story = {
  args: {
    isOpen: true,
    onClose: () => console.log('Modal closed'),
    itemType: 'article',
    itemName: 'The Refreshed Solterra EV SUV Is the Quickest Subaru We\'ve Ever Tested',
    itemImage: 'https://hips.hearstapps.com/mtg-prod/68acee0b9a8a250002dfbc03/2-2026-subaru-solterra-first-drive.jpg',
  },
};

// Video save modal
export const SaveVideo: Story = {
  args: {
    isOpen: true,
    onClose: () => console.log('Modal closed'),
    itemType: 'video',
    itemName: '2025 Porsche 911 GT3 RS Track Test',
    itemImage: 'https://d2kde5ohu8qb21.cloudfront.net/files/65a1ccd79afa860008125aac/2024-porsche-911-gt3-rs-12.jpg',
  },
};

// Without image
export const WithoutImage: Story = {
  args: {
    isOpen: true,
    onClose: () => console.log('Modal closed'),
    itemType: 'vehicle',
    itemName: '2025 Toyota Camry',
  },
};

// Without item name
export const WithoutItemName: Story = {
  args: {
    isOpen: true,
    onClose: () => console.log('Modal closed'),
    itemType: 'article',
  },
};
