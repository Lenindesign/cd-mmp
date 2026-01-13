export { default as OnboardingLayout } from './OnboardingLayout';

// ============================================
// ACTIVE 2-STEP ONBOARDING FLOW
// ============================================
// Step 1: What describes you best (uses OnboardingStep2 component)
// Step 2: Newsletter subscription (uses OnboardingStep4 component)
export { default as OnboardingStep2 } from './OnboardingStep2'; // "What describes you best" - now Step 1
export { default as OnboardingStep4 } from './OnboardingStep4'; // "Newsletter" - now Step 2

// ============================================
// ARCHIVED STEPS (kept for future use)
// ============================================
// These are not used in the current flow but preserved in Storybook
export { default as OnboardingStep1 } from './OnboardingStep1'; // "Let's get to know each other" (name/location)
export { default as OnboardingStep3 } from './OnboardingStep3'; // "Tell us about your ride" (vehicle search)
export { default as OnboardingWelcome } from './OnboardingWelcome'; // "Welcome to the club" (membership card)

export { default as OnboardingResults } from './OnboardingResults';
export { default as SignIn } from './SignIn';
export { default as SignUp } from './SignUp';

