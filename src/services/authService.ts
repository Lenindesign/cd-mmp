/**
 * Authentication Service
 * Handles user authentication with localStorage persistence
 * In production, this would connect to a real backend API
 */

import type { User, SignInCredentials, SignUpCredentials, OnboardingData, SavedVehicle } from '../types/auth';

const STORAGE_KEYS = {
  USER: 'mmp_user',
  USERS_DB: 'mmp_users_db',
  SESSION: 'mmp_session',
};

// Generate a simple unique ID
const generateId = (): string => {
  return `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// Get all users from "database" (localStorage)
const getUsersDb = (): Record<string, User & { password: string }> => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.USERS_DB);
    return data ? JSON.parse(data) : {};
  } catch {
    return {};
  }
};

// Save users database
const saveUsersDb = (users: Record<string, User & { password: string }>): void => {
  localStorage.setItem(STORAGE_KEYS.USERS_DB, JSON.stringify(users));
};

// Get current user from session
export const getCurrentUser = (): User | null => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.USER);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
};

// Save current user to session
const setCurrentUser = (user: User | null): void => {
  if (user) {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    localStorage.setItem(STORAGE_KEYS.SESSION, 'active');
  } else {
    localStorage.removeItem(STORAGE_KEYS.USER);
    localStorage.removeItem(STORAGE_KEYS.SESSION);
  }
};

// Check if session is active
export const isSessionActive = (): boolean => {
  return localStorage.getItem(STORAGE_KEYS.SESSION) === 'active';
};

// Sign up a new user
export const signUp = async (credentials: SignUpCredentials): Promise<User> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));

  const usersDb = getUsersDb();
  
  // Check if email already exists
  const existingUser = Object.values(usersDb).find(u => u.email === credentials.email);
  if (existingUser) {
    throw new Error('An account with this email already exists');
  }

  // Create new user
  const newUser: User & { password: string } = {
    id: generateId(),
    email: credentials.email,
    password: credentials.password, // In production, this would be hashed
    name: credentials.name || '',
    createdAt: new Date().toISOString(),
    onboardingCompleted: false,
    savedVehicles: [],
    newsletterSubscriptions: [],
  };

  // Save to "database"
  usersDb[newUser.id] = newUser;
  saveUsersDb(usersDb);

  // Create session user (without password)
  const sessionUser: User = {
    id: newUser.id,
    email: newUser.email,
    name: newUser.name,
    createdAt: newUser.createdAt,
    onboardingCompleted: newUser.onboardingCompleted,
    savedVehicles: newUser.savedVehicles,
    newsletterSubscriptions: newUser.newsletterSubscriptions,
  };

  setCurrentUser(sessionUser);
  return sessionUser;
};

// Sign in an existing user
export const signIn = async (credentials: SignInCredentials): Promise<User> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));

  const usersDb = getUsersDb();
  
  // Find user by email
  const user = Object.values(usersDb).find(u => u.email === credentials.email);
  
  if (!user) {
    throw new Error('No account found with this email');
  }

  if (user.password !== credentials.password) {
    throw new Error('Incorrect password');
  }

  // Create session user (without password)
  const sessionUser: User = {
    id: user.id,
    email: user.email,
    name: user.name,
    location: user.location,
    userType: user.userType,
    avatar: user.avatar,
    banner: user.banner,
    createdAt: user.createdAt,
    onboardingCompleted: user.onboardingCompleted,
    savedVehicles: user.savedVehicles,
    newsletterSubscriptions: user.newsletterSubscriptions,
  };

  setCurrentUser(sessionUser);
  return sessionUser;
};

// Sign out
export const signOut = async (): Promise<void> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  setCurrentUser(null);
};

// Update user profile
export const updateUser = async (updates: Partial<User>): Promise<User> => {
  await new Promise(resolve => setTimeout(resolve, 500));

  const currentUser = getCurrentUser();
  if (!currentUser) {
    throw new Error('No user logged in');
  }

  const usersDb = getUsersDb();
  const dbUser = usersDb[currentUser.id];
  
  if (!dbUser) {
    throw new Error('User not found in database');
  }

  // Update user in database
  const updatedDbUser = { ...dbUser, ...updates };
  usersDb[currentUser.id] = updatedDbUser;
  saveUsersDb(usersDb);

  // Update session user
  const updatedSessionUser: User = {
    id: updatedDbUser.id,
    email: updatedDbUser.email,
    name: updatedDbUser.name,
    location: updatedDbUser.location,
    userType: updatedDbUser.userType,
    avatar: updatedDbUser.avatar,
    banner: updatedDbUser.banner,
    createdAt: updatedDbUser.createdAt,
    onboardingCompleted: updatedDbUser.onboardingCompleted,
    savedVehicles: updatedDbUser.savedVehicles,
    newsletterSubscriptions: updatedDbUser.newsletterSubscriptions,
  };

  setCurrentUser(updatedSessionUser);
  return updatedSessionUser;
};

// Complete onboarding with collected data
export const completeOnboarding = async (data: OnboardingData): Promise<User> => {
  await new Promise(resolve => setTimeout(resolve, 500));

  const currentUser = getCurrentUser();
  if (!currentUser) {
    throw new Error('No user logged in');
  }

  const updates: Partial<User> = {
    name: data.name || currentUser.name,
    location: data.location || currentUser.location,
    userType: data.userType || currentUser.userType,
    savedVehicles: data.vehicles || currentUser.savedVehicles,
    newsletterSubscriptions: data.newsletters || currentUser.newsletterSubscriptions,
    onboardingCompleted: true,
  };

  return updateUser(updates);
};

// Add a vehicle to saved vehicles
export const addSavedVehicle = async (vehicle: SavedVehicle): Promise<User> => {
  const currentUser = getCurrentUser();
  if (!currentUser) {
    throw new Error('No user logged in');
  }

  const savedVehicles = [...(currentUser.savedVehicles || [])];
  
  // Check if vehicle already exists
  const existingIndex = savedVehicles.findIndex(v => v.id === vehicle.id);
  if (existingIndex >= 0) {
    savedVehicles[existingIndex] = vehicle;
  } else {
    savedVehicles.push(vehicle);
  }

  return updateUser({ savedVehicles });
};

// Remove a vehicle from saved vehicles
export const removeSavedVehicle = async (vehicleId: string): Promise<User> => {
  const currentUser = getCurrentUser();
  if (!currentUser) {
    throw new Error('No user logged in');
  }

  const savedVehicles = (currentUser.savedVehicles || []).filter(v => v.id !== vehicleId);
  return updateUser({ savedVehicles });
};

// Social login simulation (Google, Facebook, Apple)
export const socialSignIn = async (provider: 'google' | 'facebook' | 'apple'): Promise<User> => {
  // Simulate OAuth flow delay
  await new Promise(resolve => setTimeout(resolve, 1200));

  // In production, this would handle OAuth callback
  // For now, create a mock user based on provider
  const mockEmail = `user_${Date.now()}@${provider}.com`;
  const mockName = `${provider.charAt(0).toUpperCase() + provider.slice(1)} User`;

  // Check if user exists
  const usersDb = getUsersDb();
  const existingUser = Object.values(usersDb).find(u => u.email === mockEmail);

  if (existingUser) {
    // Sign in existing user
    const sessionUser: User = {
      id: existingUser.id,
      email: existingUser.email,
      name: existingUser.name,
      location: existingUser.location,
      userType: existingUser.userType,
      avatar: existingUser.avatar,
      banner: existingUser.banner,
      createdAt: existingUser.createdAt,
      onboardingCompleted: existingUser.onboardingCompleted,
      savedVehicles: existingUser.savedVehicles,
      newsletterSubscriptions: existingUser.newsletterSubscriptions,
    };
    setCurrentUser(sessionUser);
    return sessionUser;
  }

  // Create new user via social sign up
  return signUp({
    email: mockEmail,
    password: `${provider}_oauth_${Date.now()}`,
    name: mockName,
  });
};

export default {
  getCurrentUser,
  isSessionActive,
  signUp,
  signIn,
  signOut,
  updateUser,
  completeOnboarding,
  addSavedVehicle,
  removeSavedVehicle,
  socialSignIn,
};


