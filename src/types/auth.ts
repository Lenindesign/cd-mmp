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
  budgetPreferences?: BudgetPreferences;
  savedVehicles?: SavedVehicle[];
  savedEstimates?: PaymentEstimate[];
  newsletterSubscriptions?: string[];
  avatar?: string;
  banner?: string;
  createdAt: string;
  onboardingCompleted: boolean;
}

export type BudgetCreditScoreBand =
  | 'Excellent (740-850)'
  | 'Good (670-739)'
  | 'Fair (580-669)'
  | 'Poor (300-579)';

export interface BudgetPreferences {
  monthlyPayment: number;
  downPayment: number;
  loanTerm: number;
  creditScore: BudgetCreditScoreBand;
  bodyStyle: string;
  stateCode?: string;
  includeTradeIn?: boolean;
  tradeInAmount?: number;
  updatedAt?: string;
}

export interface SavedVehicle {
  id: string;
  name: string;
  ownership: 'own' | 'want' | 'previously_owned';
  savedAt?: string;
}

export interface PaymentEstimate {
  id: string;
  title: string;
  source: 'auto-loan-calculator';
  createdAt: string;
  vehicle?: {
    slug?: string;
    year?: string;
    make?: string;
    model?: string;
    trim?: string;
    label?: string;
    condition?: 'new' | 'used';
  };
  inputs: {
    vehiclePrice: number;
    downPayment: number;
    tradeInValue: number;
    amountOwedOnTrade: number;
    salesTax: number;
    registrationFees: number;
    dealerFees: number;
    apr: number;
    loanTermMonths: number;
    includeTaxesAndFeesInLoan: boolean;
    stateCode?: string;
  };
  results: {
    monthlyPayment: number;
    amountFinanced: number;
    totalInterestPaid: number;
    totalLoanPayments: number;
    estimatedTotalPaid: number;
    netTradeValue: number;
  };
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
