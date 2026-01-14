/**
 * Authentication Types
 * Type definitions for user authentication and session management
 */

export interface User {
  id: string;
  email: string;
  name?: string;
  location?: string;
  userType?: 'buyer' | 'enthusiast' | 'both';
  savedVehicles?: SavedVehicle[];
  newsletterSubscriptions?: string[];
  avatar?: string;
  banner?: string;
  createdAt: string;
  onboardingCompleted: boolean;
}

export interface SavedVehicle {
  id: string;
  name: string;
  ownership: 'own' | 'want' | 'previously_owned';
  savedAt?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface SignInCredentials {
  email: string;
  password: string;
}

export interface SignUpCredentials {
  email: string;
  password: string;
  name?: string;
}

export interface OnboardingData {
  name?: string;
  location?: string;
  userType?: 'buyer' | 'enthusiast' | 'both';
  vehicles?: SavedVehicle[];
  newsletters?: string[];
}


