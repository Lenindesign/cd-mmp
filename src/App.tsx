import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import VehiclePage, { VehiclePageVariant, VehiclePageVariantB, VehiclePageVariantC } from './pages/VehiclePage';
import VehiclesListPage from './pages/VehiclesListPage';
import UsedCarsPage from './pages/UsedCarsPage';
import {
  OnboardingStep1,
  OnboardingStep2,
  OnboardingStep3,
  OnboardingStep4,
  OnboardingWelcome,
  OnboardingResults,
  SignIn,
} from './pages/Onboarding';
import './App.css';

function App() {
  const location = useLocation();
  const isOnboardingPage = location.pathname.startsWith('/onboarding') || location.pathname === '/sign-in';

  return (
    <div className="app">
      <ScrollToTop />
      
      {/* Only show Header/Footer for non-onboarding pages */}
      {!isOnboardingPage && <Header />}
      
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
        
        {/* Used Cars - Browse Listings */}
        <Route path="/used-cars" element={<UsedCarsPage />} />
        
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
      </Routes>
      
      {!isOnboardingPage && <Footer />}
    </div>
  );
}

export default App;
