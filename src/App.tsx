import { lazy, Suspense } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import { LoadingSpinner } from './components/LoadingSpinner';
import './App.css';

// Lazy load pages for code splitting
const VehiclePage = lazy(() => import('./pages/VehiclePage/VehiclePage'));
const VehiclePageVariant = lazy(() => import('./pages/VehiclePage/VehiclePageVariant'));
const VehiclePageVariantB = lazy(() => import('./pages/VehiclePage/VehiclePageVariantB'));
const VehiclePageVariantC = lazy(() => import('./pages/VehiclePage/VehiclePageVariantC'));
const VehiclePageVariantD = lazy(() => import('./pages/VehiclePage/VehiclePageVariantD'));
const VehiclesListPage = lazy(() => import('./pages/VehiclesListPage/VehiclesListPage'));
const DesignSystem = lazy(() => import('./pages/DesignSystem/DesignSystem'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage/NotFoundPage'));

// Onboarding pages - lazy loaded as a group
const OnboardingStep1 = lazy(() => import('./pages/Onboarding/OnboardingStep1'));
const OnboardingStep2 = lazy(() => import('./pages/Onboarding/OnboardingStep2'));
const OnboardingStep3 = lazy(() => import('./pages/Onboarding/OnboardingStep3'));
const OnboardingStep4 = lazy(() => import('./pages/Onboarding/OnboardingStep4'));
const OnboardingWelcome = lazy(() => import('./pages/Onboarding/OnboardingWelcome'));
const OnboardingResults = lazy(() => import('./pages/Onboarding/OnboardingResults'));
const SignIn = lazy(() => import('./pages/Onboarding/SignIn'));

// Admin pages - lazy loaded
const VehicleRatingEditor = lazy(() => import('./pages/VehicleRatingEditor/VehicleRatingEditor'));

// Loading fallback component
const PageLoader = () => (
  <div className="page-loader">
    <LoadingSpinner size="large" centered label="Loading page..." />
  </div>
);

function App() {
  const location = useLocation();
  const isOnboardingPage = location.pathname.startsWith('/onboarding') || location.pathname === '/sign-in';

  return (
    <div className="app">
      {/* Skip Link for Accessibility */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      
      <ScrollToTop />
      
      {/* Only show Header/Footer for non-onboarding pages */}
      {!isOnboardingPage && <Header />}
      
      <main id="main-content">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            {/* Sign In */}
            <Route path="/sign-in" element={<SignIn />} />
            
            {/* Onboarding Flow */}
            <Route path="/onboarding/step-1" element={<OnboardingStep1 />} />
            <Route path="/onboarding/step-2" element={<OnboardingStep2 />} />
            <Route path="/onboarding/step-3" element={<OnboardingStep3 />} />
            <Route path="/onboarding/step-4" element={<OnboardingStep4 />} />
            <Route path="/onboarding/welcome" element={<OnboardingWelcome />} />
            <Route path="/onboarding/results" element={<OnboardingResults />} />
            
            {/* Home Page - Browse New Vehicles */}
            <Route path="/" element={<VehiclesListPage />} />
            
            {/* Also keep /vehicles route for backwards compatibility */}
            <Route path="/vehicles" element={<VehiclesListPage />} />
            
            {/* Used Cars - Redirect to VehiclesListPage with type=used */}
            <Route path="/used-cars" element={<Navigate to="/?type=used" replace />} />
            
            {/* Design System Documentation */}
            <Route path="/design-system" element={<DesignSystem />} />
            
            {/* Admin Pages */}
            <Route path="/admin/vehicle-ratings" element={<VehicleRatingEditor />} />
            
            {/* Individual Vehicle Pages - Dynamic routes based on slug */}
            <Route path="/:year/:make/:model" element={<VehiclePage />} />
            
            {/* A/B Test Variants - Hero CTA variations */}
            <Route path="/:year/:make/:model/v1" element={<VehiclePageVariant variant="v1" />} />
            <Route path="/:year/:make/:model/v2" element={<VehiclePageVariant variant="v2" />} />
            <Route path="/:year/:make/:model/v3" element={<VehiclePageVariant variant="v3" />} />
            <Route path="/:year/:make/:model/v5" element={<VehiclePageVariant variant="v5" />} />
            <Route path="/:year/:make/:model/v10" element={<VehiclePageVariant variant="v10" />} />
            
            {/* B Test Variants - Pricing CTA variations (full-width section) */}
            <Route path="/:year/:make/:model/v1b" element={<VehiclePageVariantB variant="v1b" />} />
            <Route path="/:year/:make/:model/v2b" element={<VehiclePageVariantB variant="v2b" />} />
            <Route path="/:year/:make/:model/v3b" element={<VehiclePageVariantB variant="v3b" />} />
            <Route path="/:year/:make/:model/v4b" element={<VehiclePageVariantB variant="v4b" />} />
            <Route path="/:year/:make/:model/v5b" element={<VehiclePageVariantB variant="v5b" />} />
            
            {/* C Test Variants - Inline Marketplace CTA (within Target Price Range section) */}
            <Route path="/:year/:make/:model/v1c" element={<VehiclePageVariantC variant="v1c" />} />
            <Route path="/:year/:make/:model/v2c" element={<VehiclePageVariantC variant="v2c" />} />
            <Route path="/:year/:make/:model/v3c" element={<VehiclePageVariantC variant="v3c" />} />
            <Route path="/:year/:make/:model/v4c" element={<VehiclePageVariantC variant="v4c" />} />
            <Route path="/:year/:make/:model/v5c" element={<VehiclePageVariantC variant="v5c" />} />
            
            {/* D Test Variants - Trim Selector Marketplace CTA (within Pricing section) */}
            <Route path="/:year/:make/:model/v1d" element={<VehiclePageVariantD variant="v1d" />} />
            <Route path="/:year/:make/:model/v2d" element={<VehiclePageVariantD variant="v2d" />} />
            <Route path="/:year/:make/:model/v3d" element={<VehiclePageVariantD variant="v3d" />} />
            <Route path="/:year/:make/:model/v4d" element={<VehiclePageVariantD variant="v4d" />} />
            <Route path="/:year/:make/:model/v5d" element={<VehiclePageVariantD variant="v5d" />} />
            
            {/* 404 Not Found - Catch all unmatched routes */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </main>
      
      {!isOnboardingPage && <Footer />}
    </div>
  );
}

export default App;
