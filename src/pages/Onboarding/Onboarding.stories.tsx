import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { SignIn, OnboardingStep1, OnboardingStep2, OnboardingStep3, OnboardingStep4, OnboardingWelcome, OnboardingResults } from './index';

// Shared router decorator
const routerDecorator = (path: string) => (Story: React.ComponentType) => (
  <MemoryRouter initialEntries={[path]}>
    <Routes>
      <Route path="*" element={<Story />} />
    </Routes>
  </MemoryRouter>
);

// ============================================
// SIGNIN PAGE
// ============================================

const signInMeta: Meta<typeof SignIn> = {
  title: 'Pages/Onboarding/SignIn',
  component: SignIn,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  decorators: [routerDecorator('/sign-in')],
};

export default signInMeta;

export const Default: StoryObj<typeof SignIn> = {};

// ============================================
// For other onboarding pages, create separate story files
// or view them in the app directly
// ============================================
