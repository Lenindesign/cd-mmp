import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import VehiclePage, { VehiclePageVariant } from './pages/VehiclePage';
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
        
        {/* A/B Test Variants - Shop New/Used CTA variations */}
        <Route path="/:year/:make/:model/v1" element={<VehiclePageVariant variant="v1" />} />
        <Route path="/:year/:make/:model/v2" element={<VehiclePageVariant variant="v2" />} />
        <Route path="/:year/:make/:model/v3" element={<VehiclePageVariant variant="v3" />} />
        <Route path="/:year/:make/:model/v5" element={<VehiclePageVariant variant="v5" />} />
        <Route path="/:year/:make/:model/v10" element={<VehiclePageVariant variant="v10" />} />
      </Routes>
      
      {!isOnboardingPage && <Footer />}
    </div>
  );
}

export default App;
