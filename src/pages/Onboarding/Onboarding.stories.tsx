import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '../../contexts/AuthContext';
import { 
  SignIn, 
  OnboardingStep1, // Archived: "Let's get to know each other"
  OnboardingStep2, // Active: "What describes you best" - Step 1
  OnboardingStep3, // Archived: "Tell us about your ride"
  OnboardingStep4, // Active: "Newsletter" - Step 2
  OnboardingWelcome, // Archived: "Welcome to the club"
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
        component: `The Car and Driver onboarding flow guides new users through account setup.

**Current Active Flow (2 Steps):**
1. What describes you best (Car Buyer / Enthusiast / Both)
2. Newsletter subscription

**Archived Steps (available for future use):**
- Let's get to know each other (name/location)
- Tell us about your ride (vehicle search)
- Welcome to the club (membership card)`,
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
// ACTIVE FLOW - STEP 1: What Describes You Best
// ============================================

export const Step1_UserType: StoryObj = {
  render: () => (
    <AuthProvider>
    <MemoryRouter initialEntries={['/onboarding/step-1']}>
      <Routes>
        <Route path="*" element={<OnboardingStep2 />} />
      </Routes>
    </MemoryRouter>
    </AuthProvider>
  ),
  parameters: {
    docs: {
      description: {
        story: '**ACTIVE** - Step 1 of the current onboarding flow. Users select their type: Car Buyer, Car Enthusiast, or Both.',
      },
    },
  },
};

// ============================================
// ACTIVE FLOW - STEP 2: Newsletter Subscription
// ============================================

export const Step2_Newsletter: StoryObj = {
  render: () => (
    <AuthProvider>
    <MemoryRouter initialEntries={['/onboarding/step-2']}>
      <Routes>
        <Route path="*" element={<OnboardingStep4 />} />
      </Routes>
    </MemoryRouter>
    </AuthProvider>
  ),
  parameters: {
    docs: {
      description: {
        story: '**ACTIVE** - Step 2 (final step) of the current onboarding flow. Users can subscribe to the Car and Driver newsletter.',
      },
    },
  },
};

// ============================================
// ARCHIVED STEPS - Available for Future Use
// ============================================

export const Archived_PersonalInfo: StoryObj = {
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
        story: '**ARCHIVED** - "Let\'s get to know each other" step. Users enter their name and optional location. Not currently used in the active flow.',
      },
    },
  },
};

export const Archived_VehicleSelection: StoryObj = {
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
        story: '**ARCHIVED** - "Tell Us About Your Ride" step. Users can search and select vehicles they own or want. Not currently used in the active flow.',
      },
    },
  },
};

export const Archived_WelcomeCard: StoryObj = {
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
        story: '**ARCHIVED** - "Welcome to the Club" completion page with membership card and confetti animation. Not currently used in the active flow.',
      },
    },
  },
};
