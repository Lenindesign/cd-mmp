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

// Map Google One Tap user into User and set as current (called from AuthContext / G1T flow)
// This properly integrates with the user database - checks for existing users and preserves their data
// Returns { user, isNewUser } to allow caller to handle onboarding redirect
export const setUserFromGoogle = (googleUser: { id: string; email: string; name?: string; picture?: string }): { user: User; isNewUser: boolean } => {
  // #region agent log
  fetch('http://127.0.0.1:7247/ingest/b1f928f3-83be-4f10-b70f-73adfefe6bd0',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'authService.ts:setUserFromGoogle',message:'called with googleUser',data:{id:googleUser.id,email:googleUser.email,name:googleUser.name,hasPicture:!!googleUser.picture},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'NAME'})}).catch(()=>{});
  // #endregion
  
  const usersDb = getUsersDb();
  
  // Check if user already exists by email
  const existingUser = Object.values(usersDb).find(u => u.email === googleUser.email);
  
  // #region agent log
  fetch('http://127.0.0.1:7247/ingest/b1f928f3-83be-4f10-b70f-73adfefe6bd0',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'authService.ts:setUserFromGoogle',message:'existing user check',data:{existingUserFound:!!existingUser,existingUserName:existingUser?.name,existingUserEmail:existingUser?.email},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'NAME'})}).catch(()=>{});
  // #endregion
  
  let sessionUser: User;
  
  if (existingUser) {
    // Existing user - sign them in with their existing data
    // Update avatar if they don't have one
    sessionUser = {
      id: existingUser.id,
      email: existingUser.email,
      name: existingUser.name || googleUser.name,
      location: existingUser.location,
      userType: existingUser.userType,
      avatar: existingUser.avatar || googleUser.picture,
      banner: existingUser.banner,
      createdAt: existingUser.createdAt,
      onboardingCompleted: existingUser.onboardingCompleted,
      savedVehicles: existingUser.savedVehicles,
      newsletterSubscriptions: existingUser.newsletterSubscriptions,
    };
    
    // Update the database with any new info (avatar, name)
    usersDb[existingUser.id] = {
      ...existingUser,
      name: existingUser.name || googleUser.name,
      avatar: existingUser.avatar || googleUser.picture,
    };
    saveUsersDb(usersDb);
  } else {
    // New user - create account with onboardingCompleted: false
    const newUser: User & { password: string } = {
      id: googleUser.id,
      email: googleUser.email,
      password: `google_oauth_${googleUser.id}`, // Placeholder for OAuth users
      name: googleUser.name || '',
      avatar: googleUser.picture,
      createdAt: new Date().toISOString(),
      onboardingCompleted: false,
      savedVehicles: [],
      newsletterSubscriptions: [],
    };
    
    // Save to database
    usersDb[newUser.id] = newUser;
    saveUsersDb(usersDb);
    
    sessionUser = {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
      avatar: newUser.avatar,
      createdAt: newUser.createdAt,
      onboardingCompleted: false,
      savedVehicles: [],
      newsletterSubscriptions: [],
    };
  }
  
  setCurrentUser(sessionUser);
  window.dispatchEvent(new CustomEvent('auth-changed'));
  
  // #region agent log
  fetch('http://127.0.0.1:7247/ingest/b1f928f3-83be-4f10-b70f-73adfefe6bd0',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'authService.ts:setUserFromGoogle',message:'user set',data:{sessionUserName:sessionUser.name,sessionUserEmail:sessionUser.email,isNewUser:!existingUser},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'NAME'})}).catch(()=>{});
  // #endregion
  
  return { user: sessionUser, isNewUser: !existingUser };
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

// Google OAuth Client ID
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || '';

// Social login - Real Google OAuth, mock for Facebook/Apple
export const socialSignIn = async (provider: 'google' | 'facebook' | 'apple'): Promise<User> => {
  // For Google, use real Google Identity Services
  if (provider === 'google' && GOOGLE_CLIENT_ID && window.google?.accounts?.id) {
    return new Promise((resolve, reject) => {
      // Initialize and prompt for Google sign-in
      window.google!.accounts!.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: (response: { credential: string }) => {
          // Decode the JWT to get user info
          try {
            const base64Url = response.credential.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(
              atob(base64)
                .split('')
                .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                .join('')
            );
            const payload = JSON.parse(jsonPayload);
            
            const googleUser = {
              id: payload.sub,
              email: payload.email,
              name: payload.name,
              picture: payload.picture,
            };
            
            // Use setUserFromGoogle to properly create/update user
            const { user } = setUserFromGoogle(googleUser);
            
            // Store in Google auth storage for consistency
            localStorage.setItem('cd_auth_user', JSON.stringify(googleUser));
            
            resolve(user);
          } catch (err) {
            reject(new Error('Failed to process Google sign-in'));
          }
        },
        use_fedcm_for_prompt: false,
      });
      
      // Show the Google sign-in prompt
      window.google!.accounts!.id.prompt((notification: { 
        isNotDisplayed: () => boolean; 
        getNotDisplayedReason: () => string;
        isSkippedMoment: () => boolean;
        getSkippedReason: () => string;
      }) => {
        if (notification.isNotDisplayed()) {
          const reason = notification.getNotDisplayedReason();
          console.log('[SocialSignIn] Google prompt not displayed:', reason);
          // If prompt can't be shown, reject with helpful message
          if (reason === 'opt_out_or_no_session') {
            reject(new Error('Please sign in to your Google account in this browser first, then try again.'));
          } else {
            reject(new Error(`Google Sign-In unavailable: ${reason}`));
          }
        } else if (notification.isSkippedMoment()) {
          const reason = notification.getSkippedReason();
          console.log('[SocialSignIn] Google prompt skipped:', reason);
          reject(new Error('Google Sign-In was cancelled'));
        }
      });
    });
  }

  // Mock OAuth for Facebook/Apple (or when Google API not available)
  await new Promise(resolve => setTimeout(resolve, 1200));
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
  setUserFromGoogle,
  signUp,
  signIn,
  signOut,
  updateUser,
  completeOnboarding,
  addSavedVehicle,
  removeSavedVehicle,
  socialSignIn,
};


