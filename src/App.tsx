import { lazy, Suspense } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import { LoadingSpinner } from './components/LoadingSpinner';
import { AuthProvider } from './contexts/AuthContext';
import { CarFinderChat } from './components/CarFinderChat';
import './App.css';

// Lazy load pages for code splitting
const VehiclePage = lazy(() => import('./pages/VehiclePage/VehiclePage'));
const VehiclePageVariant = lazy(() => import('./pages/VehiclePage/VehiclePageVariant'));
const VehiclePageVariantB = lazy(() => import('./pages/VehiclePage/VehiclePageVariantB'));
const VehiclePageVariantC = lazy(() => import('./pages/VehiclePage/VehiclePageVariantC'));
const VehiclePageVariantD = lazy(() => import('./pages/VehiclePage/VehiclePageVariantD'));
const VehiclePageConcept = lazy(() => import('./pages/VehiclePage/VehiclePageConcept'));
const VehiclesListPage = lazy(() => import('./pages/VehiclesListPage/VehiclesListPage'));
const DesignSystem = lazy(() => import('./pages/DesignSystem/DesignSystem'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage/NotFoundPage'));

// Onboarding pages - lazy loaded as a group (2-step flow)
// Step 1: What describes you best (OnboardingStep2 component)
// Step 2: Newsletter subscription (OnboardingStep4 component)
const OnboardingStep1 = lazy(() => import('./pages/Onboarding/OnboardingStep2')); // "What describes you best"
const OnboardingStep2 = lazy(() => import('./pages/Onboarding/OnboardingStep4')); // "Newsletter"
const OnboardingResults = lazy(() => import('./pages/Onboarding/OnboardingResults'));
const SignIn = lazy(() => import('./pages/Onboarding/SignIn'));
const SignUp = lazy(() => import('./pages/Onboarding/SignUp'));

// Admin pages - lazy loaded
const VehicleRatingEditor = lazy(() => import('./pages/VehicleRatingEditor/VehicleRatingEditor'));

// Rankings pages - lazy loaded
const RankingsPage = lazy(() => import('./pages/RankingsPage/RankingsPage'));

// Audit pages - lazy loaded
const CardAudit = lazy(() => import('./pages/CardAudit/CardAudit'));

// Account pages - lazy loaded
const MyAccount = lazy(() => import('./pages/Account/MyAccount'));

// Article pages - lazy loaded
const ArticlePage = lazy(() => import('./pages/ArticlePage/ArticlePage'));

// News pages - lazy loaded
const NewsPage = lazy(() => import('./pages/NewsPage/NewsPage'));

// Listicle pages - lazy loaded
const ListiclePage = lazy(() => import('./pages/ListiclePage/ListiclePage'));

// What's My Car Worth page - lazy loaded
const WhatsMyCarWorthPage = lazy(() => import('./pages/WhatsMyCarWorthPage/WhatsMyCarWorthPage'));
const WhatsMyCarWorthResultsPage = lazy(() => import('./pages/WhatsMyCarWorthResultsPage/WhatsMyCarWorthResultsPage'));

// Email Preview page - for testing personalized emails
const EmailPreviewPage = lazy(() => import('./pages/EmailPreviewPage/EmailPreviewPage'));

// Loading fallback component
const PageLoader = () => (
  <div className="page-loader">
    <LoadingSpinner size="large" centered label="Loading page..." />
  </div>
);

function App() {
  const location = useLocation();
  const isOnboardingPage = location.pathname.startsWith('/onboarding') || location.pathname === '/sign-in' || location.pathname === '/sign-up';

  return (
    <AuthProvider>
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
            {/* Authentication */}
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            
            {/* Onboarding Flow - 2 Steps */}
            {/* Step 1: What describes you best */}
            <Route path="/onboarding/step-1" element={<OnboardingStep1 />} />
            {/* Step 2: Newsletter subscription (final step) */}
            <Route path="/onboarding/step-2" element={<OnboardingStep2 />} />
            {/* Results page (optional) */}
            <Route path="/onboarding/results" element={<OnboardingResults />} />
            
            {/* Home Page - News + Stories */}
            <Route path="/" element={<NewsPage />} />
            
            {/* Browse Vehicles */}
            <Route path="/vehicles" element={<VehiclesListPage />} />
            <Route path="/browse" element={<VehiclesListPage />} />
            
            {/* Used Cars - Redirect to VehiclesListPage with type=used */}
            <Route path="/used-cars" element={<Navigate to="/?type=used" replace />} />
            
            {/* Design System Documentation */}
            <Route path="/design-system" element={<DesignSystem />} />
            
            {/* Admin Pages */}
            <Route path="/admin/vehicle-ratings" element={<VehicleRatingEditor />} />
            
            {/* Rankings Pages */}
            <Route path="/rankings" element={<RankingsPage />} />
            <Route path="/rankings/:bodyStyle" element={<RankingsPage />} />
            <Route path="/rankings/:bodyStyle/:subcategory" element={<RankingsPage />} />
            
            {/* Audit Pages */}
            <Route path="/audit/cards" element={<CardAudit />} />
            
            {/* Account Pages */}
            <Route path="/account" element={<MyAccount />} />
            
            {/* News + Stories Pages */}
            <Route path="/news" element={<NewsPage />} />
            <Route path="/news-stories" element={<NewsPage />} />
            <Route path="/news/:slug" element={<ArticlePage />} />
            <Route path="/article/:slug" element={<ArticlePage />} />
            <Route path="/listicle/:slug" element={<ListiclePage />} />
            
            {/* What's My Car Worth */}
            <Route path="/whats-my-car-worth" element={<WhatsMyCarWorthPage />} />
            <Route path="/whats-my-car-worth/results" element={<WhatsMyCarWorthResultsPage />} />
            <Route path="/trade-in-value" element={<WhatsMyCarWorthPage />} />
            <Route path="/trade-in-value/results" element={<WhatsMyCarWorthResultsPage />} />
            
            {/* Email Preview - for testing personalized welcome emails */}
            <Route path="/email-preview" element={<EmailPreviewPage />} />
            
            {/* Individual Vehicle Pages - Dynamic routes based on slug */}
            <Route path="/:year/:make/:model" element={<VehiclePage />} />
            
            {/* A/B Test Variants - Hero CTA variations */}
            <Route path="/:year/:make/:model/v1" element={<VehiclePageVariant variant="v1" />} />
            <Route path="/:year/:make/:model/v2" element={<VehiclePageVariant variant="v2" />} />
            <Route path="/:year/:make/:model/v3" element={<VehiclePageVariant variant="v3" />} />
            <Route path="/:year/:make/:model/v4" element={<VehiclePageVariant variant="v4" />} />
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
            
            {/* Concept - Ultraminimalist Design */}
            <Route path="/:year/:make/:model/concept" element={<VehiclePageConcept />} />
            
            {/* 404 Not Found - Catch all unmatched routes */}
            <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </main>
        
        {!isOnboardingPage && <Footer />}
        
        {/* AI Car Finder Chat - Floating Widget (visible on all non-onboarding pages) */}
        {!isOnboardingPage && (
          <CarFinderChat 
            floating
            position="bottom-right"
            onVehicleSelect={(vehicle) => {
              // Navigate to vehicle page when user selects a vehicle
              window.location.href = `/${vehicle.year}/${vehicle.make.toLowerCase()}/${vehicle.model.toLowerCase().replace(/\s+/g, '-')}`;
            }}
          />
        )}
      </div>
    </AuthProvider>
  );
}

export default App;
