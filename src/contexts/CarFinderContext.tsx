/**
 * Car Finder Chat context
 * Controls whether the floating "Find My Car" CTA is visible. State is persisted in localStorage.
 */

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

const STORAGE_KEY = 'cd_mmp_car_finder_enabled';

interface CarFinderContextType {
  /** Whether the Find My Car floating widget is enabled (FAB visible) */
  carFinderEnabled: boolean;
  /** Enable the Find My Car widget */
  enableCarFinder: () => void;
  /** Disable the Find My Car widget */
  disableCarFinder: () => void;
  /** Toggle the Find My Car widget */
  toggleCarFinder: () => void;
}

const CarFinderContext = createContext<CarFinderContextType | undefined>(undefined);

export const CarFinderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [carFinderEnabled, setCarFinderEnabled] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored !== null) {
        setCarFinderEnabled(stored === 'true');
      }
    } catch {
      // ignore
    }
  }, []);

  const enableCarFinder = useCallback(() => {
    setCarFinderEnabled(true);
    try {
      localStorage.setItem(STORAGE_KEY, 'true');
    } catch {
      // ignore
    }
  }, []);

  const disableCarFinder = useCallback(() => {
    setCarFinderEnabled(false);
    try {
      localStorage.setItem(STORAGE_KEY, 'false');
    } catch {
      // ignore
    }
  }, []);

  const toggleCarFinder = useCallback(() => {
    setCarFinderEnabled((prev) => {
      const next = !prev;
      try {
        localStorage.setItem(STORAGE_KEY, String(next));
      } catch {
        // ignore
      }
      return next;
    });
  }, []);

  const value: CarFinderContextType = {
    carFinderEnabled,
    enableCarFinder,
    disableCarFinder,
    toggleCarFinder,
  };

  return (
    <CarFinderContext.Provider value={value}>
      {children}
    </CarFinderContext.Provider>
  );
};

export const useCarFinder = (): CarFinderContextType => {
  const context = useContext(CarFinderContext);
  if (context === undefined) {
    throw new Error('useCarFinder must be used within a CarFinderProvider');
  }
  return context;
};

export default CarFinderContext;
