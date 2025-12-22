import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '../../contexts/AuthContext';
import { 
  SignIn, 
  OnboardingStep1, 
  OnboardingStep2, 
  OnboardingStep3, 
  OnboardingStep4, 
  OnboardingWelcome 
} from './index';

// ============================================
// META - Main Onboarding Stories
// ============================================

const meta: Meta = {
  title: 'Pages/Onboarding',
  parameters: {
    layout: 'fullscreen',
    router: { skip: true }, // This page provides its own MemoryRouter with initialEntries
    docs: {
      description: {
        component: 'The Car and Driver onboarding flow guides new users through account setup, preferences, and personalization.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;

// ============================================
// SIGNIN PAGE
// ============================================

export const SignInPage: StoryObj = {
  render: () => (
    <AuthProvider>
    <MemoryRouter initialEntries={['/sign-in']}>
      <Routes>
        <Route path="*" element={<SignIn />} />
      </Routes>
    </MemoryRouter>
    </AuthProvider>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Sign in page for the Car and Driver onboarding flow. Users can sign in with email or social accounts.',
      },
    },
  },
};

// ============================================
// STEP 1 - Personal Information
// ============================================

export const Step1_PersonalInfo: StoryObj = {
  render: () => (
    <AuthProvider>
    <MemoryRouter initialEntries={['/onboarding/step-1']}>
      <Routes>
        <Route path="*" element={<OnboardingStep1 />} />
      </Routes>
    </MemoryRouter>
    </AuthProvider>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Step 1 of the onboarding flow. Users enter their name and optional location.',
      },
    },
  },
};

// ============================================
// STEP 2 - User Type Selection
// ============================================

export const Step2_UserType: StoryObj = {
  render: () => (
    <AuthProvider>
    <MemoryRouter initialEntries={['/onboarding/step-2']}>
      <Routes>
        <Route path="*" element={<OnboardingStep2 />} />
      </Routes>
    </MemoryRouter>
    </AuthProvider>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Step 2 of the onboarding flow. Users select their shopping intent (buying, researching, etc.).',
      },
    },
  },
};

// ============================================
// STEP 3 - Interests Selection
// ============================================

export const Step3_Interests: StoryObj = {
  render: () => (
    <AuthProvider>
    <MemoryRouter initialEntries={['/onboarding/step-3']}>
      <Routes>
        <Route path="*" element={<OnboardingStep3 />} />
      </Routes>
    </MemoryRouter>
    </AuthProvider>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Step 3 of the onboarding flow. Users select their lifestyle interests and preferences.',
      },
    },
  },
};

// ============================================
// STEP 4 - Vehicle Type Preferences
// ============================================

export const Step4_VehicleTypes: StoryObj = {
  render: () => (
    <AuthProvider>
    <MemoryRouter initialEntries={['/onboarding/step-4']}>
      <Routes>
        <Route path="*" element={<OnboardingStep4 />} />
      </Routes>
    </MemoryRouter>
    </AuthProvider>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Step 4 of the onboarding flow. Users select their preferred vehicle types.',
      },
    },
  },
};

// ============================================
// WELCOME - Completion Page
// ============================================

export const Welcome_Completion: StoryObj = {
  render: () => (
    <AuthProvider>
    <MemoryRouter initialEntries={['/onboarding/welcome']}>
      <Routes>
        <Route path="*" element={<OnboardingWelcome />} />
      </Routes>
    </MemoryRouter>
    </AuthProvider>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Welcome/completion page shown after finishing the onboarding flow.',
      },
    },
  },
};
