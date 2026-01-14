/**
 * Authentication Context
 * Provides authentication state and methods throughout the application
 */

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { User, SignInCredentials, SignUpCredentials, OnboardingData, SavedVehicle } from '../types/auth';
import * as authService from '../services/authService';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  signIn: (credentials: SignInCredentials) => Promise<void>;
  signUp: (credentials: SignUpCredentials) => Promise<void>;
  signOut: () => Promise<void>;
  socialSignIn: (provider: 'google' | 'facebook' | 'apple') => Promise<void>;
  updateUser: (updates: Partial<User>) => Promise<void>;
  completeOnboarding: (data: OnboardingData) => Promise<void>;
  addSavedVehicle: (vehicle: SavedVehicle) => Promise<void>;
  removeSavedVehicle: (vehicleId: string) => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize auth state from localStorage
  useEffect(() => {
    const initAuth = () => {
      try {
        const savedUser = authService.getCurrentUser();
        if (savedUser && authService.isSessionActive()) {
          setUser(savedUser);
        }
      } catch (err) {
        console.error('Failed to initialize auth:', err);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const signIn = useCallback(async (credentials: SignInCredentials) => {
    setIsLoading(true);
    setError(null);
    try {
      const loggedInUser = await authService.signIn(credentials);
      setUser(loggedInUser);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to sign in';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const signUp = useCallback(async (credentials: SignUpCredentials) => {
    setIsLoading(true);
    setError(null);
    try {
      const newUser = await authService.signUp(credentials);
      setUser(newUser);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to sign up';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const signOut = useCallback(async () => {
    setIsLoading(true);
    try {
      await authService.signOut();
      setUser(null);
    } catch (err) {
      console.error('Sign out error:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const socialSignIn = useCallback(async (provider: 'google' | 'facebook' | 'apple') => {
    setIsLoading(true);
    setError(null);
    try {
      const loggedInUser = await authService.socialSignIn(provider);
      setUser(loggedInUser);
    } catch (err) {
      const message = err instanceof Error ? err.message : `Failed to sign in with ${provider}`;
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateUser = useCallback(async (updates: Partial<User>) => {
    setError(null);
    try {
      const updatedUser = await authService.updateUser(updates);
      setUser(updatedUser);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update user';
      setError(message);
      throw err;
    }
  }, []);

  const completeOnboarding = useCallback(async (data: OnboardingData) => {
    setError(null);
    try {
      const updatedUser = await authService.completeOnboarding(data);
      setUser(updatedUser);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to complete onboarding';
      setError(message);
      throw err;
    }
  }, []);

  const addSavedVehicle = useCallback(async (vehicle: SavedVehicle) => {
    setError(null);
    try {
      const updatedUser = await authService.addSavedVehicle(vehicle);
      setUser(updatedUser);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to save vehicle';
      setError(message);
      throw err;
    }
  }, []);

  const removeSavedVehicle = useCallback(async (vehicleId: string) => {
    setError(null);
    try {
      const updatedUser = await authService.removeSavedVehicle(vehicleId);
      setUser(updatedUser);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to remove vehicle';
      setError(message);
      throw err;
    }
  }, []);

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    error,
    signIn,
    signUp,
    signOut,
    socialSignIn,
    updateUser,
    completeOnboarding,
    addSavedVehicle,
    removeSavedVehicle,
    clearError,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;




