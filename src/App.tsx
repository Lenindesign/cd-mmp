import { Fragment, lazy, Suspense, useMemo, useState } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ExitIntentModal from './components/ExitIntentModal';
import ScrollToTop from './components/ScrollToTop';
import { LoadingSpinner } from './components/LoadingSpinner';
import { AuthProvider } from './contexts/AuthContext';
import { CarFinderProvider, useCarFinder } from './contexts/CarFinderContext';
import { CarFinderChat } from './components/CarFinderChat';
import { getVehicleBySlug } from './services/vehicleService';
import { BEST_BUYING_DEALS_PATH, ZERO_PERCENT_APR_DEALS_PATH, CASH_BACK_DEALS_PATH } from './constants/dealRoutes';
import './App.css';

// Lazy load pages for code splitting
const VehiclePage = lazy(() => import('./pages/VehiclePage/VehiclePage'));
const VehiclePageVariant = lazy(() => import('./pages/VehiclePage/VehiclePageVariant'));
const VehiclePageVariantB = lazy(() => import('./pages/VehiclePage/VehiclePageVariantB'));
const VehiclePageVariantC = lazy(() => import('./pages/VehiclePage/VehiclePageVariantC'));
const VehiclePageVariantD = lazy(() => import('./pages/VehiclePage/VehiclePageVariantD'));
const VehiclePageConcept = lazy(() => import('./pages/VehiclePage/VehiclePageConcept'));
const ReliabilityRecallsPage = lazy(() => import('./pages/ReliabilityRecallsPage/ReliabilityRecallsPage'));
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
const FeedbackAdmin = lazy(() => import('./pages/FeedbackAdmin/FeedbackAdmin'));

// Rankings pages - lazy loaded
const RankingsPage = lazy(() => import('./pages/RankingsPage/RankingsPage'));

// Brand hub pages - lazy loaded
const ToyotaBrandPage = lazy(() => import('./pages/ToyotaBrandPage/ToyotaBrandPage'));
const HondaBrandPage = lazy(() => import('./pages/HondaBrandPage/HondaBrandPage'));
const BrandHubRoutePage = lazy(() => import('./pages/BrandHubPage/BrandHubRoutePage'));

// Deals pages - lazy loaded
const DealsHubPage = lazy(() => import('./pages/DealsHubPage/DealsHubPage'));
const ZeroAprDealsPage = lazy(() => import('./pages/ZeroAprDealsPage/ZeroAprDealsPage'));
const LeaseDealsPage = lazy(() => import('./pages/LeaseDealsPage/LeaseDealsPage'));
const SuvDealsPage = lazy(() => import('./pages/SuvDealsPage/SuvDealsPage'));
const TruckDealsPage = lazy(() => import('./pages/TruckDealsPage/TruckDealsPage'));
const AllDealsPage = lazy(() => import('./pages/AllDealsPage/AllDealsPage'));
const FuelTypeDealsPage = lazy(() => import('./pages/FuelTypeDealsPage/FuelTypeDealsPage'));
const CashFinanceBodyStylePage = lazy(() => import('./pages/CashFinanceBodyStylePage/CashFinanceBodyStylePage'));
const DealsByMakePage = lazy(() => import('./pages/DealsByMakePage/DealsByMakePage'));
const DealsByMakeModelPage = lazy(() => import('./pages/DealsByMakeModelPage/DealsByMakeModelPage'));
const LeaseDealsHubPage = lazy(() => import('./pages/LeaseDealsHubPage/LeaseDealsHubPage'));
const LeaseByMakePage = lazy(() => import('./pages/LeaseByMakePage/LeaseByMakePage'));
const LeaseByMakeModelPage = lazy(() => import('./pages/LeaseByMakeModelPage/LeaseByMakeModelPage'));
const LeaseCategoryDispatcher = lazy(() => import('./pages/LeaseCategoryDispatcher/LeaseCategoryDispatcher'));

// Financing page - lazy loaded
const FinancingPage = lazy(() => import('./pages/FinancingPage/FinancingPage'));
const AutoLoanCalculatorPage = lazy(() => import('./pages/AutoLoanCalculatorPage/AutoLoanCalculatorPage'));
const AllInOnePaymentCalculatorPage = lazy(() => import('./pages/AllInOnePaymentCalculatorPage/AllInOnePaymentCalculatorPage'));
const AllInOnePaymentCalculatorBudgetPage = lazy(() => import('./pages/AllInOnePaymentCalculatorPage/AllInOnePaymentCalculatorBudgetPage'));
const AllInOnePaymentCalculatorLightPage = lazy(() => import('./pages/AllInOnePaymentCalculatorPage/AllInOnePaymentCalculatorLightPage'));
const AllInOnePaymentCalculatorLightStepsPage = lazy(() => import('./pages/AllInOnePaymentCalculatorPage/AllInOnePaymentCalculatorLightStepsPage'));
const AllInOnePaymentCalculatorLightSteps2Page = lazy(() => import('./pages/AllInOnePaymentCalculatorPage/AllInOnePaymentCalculatorLightSteps2Page'));
const LeaseVsBuyAIPage = lazy(() => import('./pages/LeaseVsBuyAIPage/LeaseVsBuyAIPage'));

// Compare page - lazy loaded (no auth required)
const ComparePage = lazy(() => import('./pages/ComparePage/ComparePage'));

// Audit pages - lazy loaded
const CardAudit = lazy(() => import('./pages/CardAudit/CardAudit'));
const CarouselAuditPage = lazy(() => import('./pages/CarouselAuditPage/CarouselAuditPage'));

// Account pages - lazy loaded
const MyAccount = lazy(() => import('./pages/Account/MyAccount'));

// Article pages - lazy loaded
const ArticlePage = lazy(() => import('./pages/ArticlePage/ArticlePage'));

// News pages - lazy loaded
const NewsPage = lazy(() => import('./pages/NewsPage/NewsPage'));

// Expert Reviews index page
const ExpertReviewsPage = lazy(() => import('./pages/ExpertReviewsPage/ExpertReviewsPage'));

// Listicle pages - lazy loaded
const ListiclePage = lazy(() => import('./pages/ListiclePage/ListiclePage'));

// What's My Car Worth page - lazy loaded
const WhatsMyCarWorthPage = lazy(() => import('./pages/WhatsMyCarWorthPage/WhatsMyCarWorthPage'));
const WhatsMyCarWorthResultsPage = lazy(() => import('./pages/WhatsMyCarWorthResultsPage/WhatsMyCarWorthResultsPage'));

// Email Preview page - for testing personalized emails
const EmailPreviewPage = lazy(() => import('./pages/EmailPreviewPage/EmailPreviewPage'));
const RateYourCarPage = lazy(() => import('./pages/RateYourCarPage/RateYourCarPage'));

// Loading fallback component
const PageLoader = () => (
  <div className="page-loader">
    <LoadingSpinner size="large" centered label="Loading page..." />
  </div>
);

/** Renders CarFinderChat only when user has enabled it from the footer */
const CarFinderChatGate = () => {
  const { carFinderEnabled } = useCarFinder();
  const location = useLocation();
  const isOnboardingPage = location.pathname.startsWith('/onboarding') || location.pathname === '/sign-in' || location.pathname === '/sign-up';
  const isImmersivePage = isOnboardingPage;

  if (isImmersivePage || !carFinderEnabled) return null;

  return (
    <CarFinderChat
      floating
      position="bottom-right"
      onVehicleSelect={(vehicle) => {
        window.location.href = `/${vehicle.year}/${vehicle.make.toLowerCase()}/${vehicle.model.toLowerCase().replace(/\s+/g, '-')}`;
      }}
    />
  );
};

const authenticationRoutes = (
  <>
    <Route path="/sign-in" element={<SignIn />} />
    <Route path="/sign-up" element={<SignUp />} />
  </>
);

const onboardingRoutes = (
  <>
    <Route path="/onboarding/step-1" element={<OnboardingStep1 />} />
    <Route path="/onboarding/step-2" element={<OnboardingStep2 />} />
    <Route path="/onboarding/results" element={<OnboardingResults />} />
  </>
);

const editorialRoutes = (
  <>
    <Route path="/" element={<NewsPage />} />
    <Route path="/rate-your-car" element={<RateYourCarPage />} />
    <Route path="/expert-reviews" element={<ExpertReviewsPage />} />
    <Route path="/news" element={<NewsPage />} />
    <Route path="/news-stories" element={<NewsPage />} />
    <Route path="/news/:slug" element={<ArticlePage />} />
    <Route path="/article/:slug" element={<ArticlePage />} />
    <Route path="/listicle/:slug" element={<ListiclePage />} />
  </>
);

const vehicleDiscoveryRoutes = (
  <>
    <Route path="/vehicles" element={<VehiclesListPage />} />
    <Route path="/browse" element={<VehiclesListPage />} />
    <Route path="/used-cars" element={<Navigate to="/?type=used" replace />} />
    <Route path="/brands/toyota" element={<ToyotaBrandPage />} />
    <Route path="/brands/honda" element={<HondaBrandPage />} />
    <Route path="/brands/:brandSlug" element={<BrandHubRoutePage />} />
    <Route path="/rankings" element={<RankingsPage />} />
    <Route path="/rankings/:bodyStyle" element={<RankingsPage />} />
    <Route path="/rankings/:bodyStyle/:subcategory" element={<RankingsPage />} />
    <Route path="/compare" element={<ComparePage />} />
  </>
);

const financeRoutes = (
  <>
    <Route path="/financing" element={<FinancingPage />} />
    <Route path="/payment-calculator" element={<FinancingPage />} />
    <Route path="/auto-loan-calculator" element={<AutoLoanCalculatorPage />} />
    <Route path="/auto-loan-calculator/all-in-one" element={<AllInOnePaymentCalculatorPage />} />
    <Route path="/auto-loan-calculator/all-in-one-budget" element={<AllInOnePaymentCalculatorBudgetPage />} />
    <Route path="/auto-loan-calculator/light" element={<AllInOnePaymentCalculatorLightPage />} />
    <Route path="/auto-loan-calculator/light-steps" element={<AllInOnePaymentCalculatorLightStepsPage />} />
    <Route path="/auto-loan-calculator/light-steps/:stepSlug" element={<AllInOnePaymentCalculatorLightStepsPage />} />
    <Route path="/auto-loan-calculator/light-steps2" element={<AllInOnePaymentCalculatorLightSteps2Page />} />
    <Route path="/auto-loan-calculator/light-steps2/:stepSlug" element={<AllInOnePaymentCalculatorLightSteps2Page />} />
    <Route path="/auto-loan-calculator/lease-vs-buy-ai" element={<LeaseVsBuyAIPage />} />
  </>
);

const dealsRoutes = (
  <>
    <Route path="/deals" element={<DealsHubPage />} />
    <Route path={BEST_BUYING_DEALS_PATH} element={<ZeroAprDealsPage />} />
    <Route path={`${BEST_BUYING_DEALS_PATH}/:slug`} element={<ZeroAprDealsPage />} />
    <Route path={ZERO_PERCENT_APR_DEALS_PATH} element={<ZeroAprDealsPage />} />
    <Route path={CASH_BACK_DEALS_PATH} element={<ZeroAprDealsPage />} />
    <Route path="/deals/zero-apr" element={<Navigate to={BEST_BUYING_DEALS_PATH} replace />} />
    <Route path="/deals/cash-finance" element={<Navigate to={BEST_BUYING_DEALS_PATH} replace />} />
    <Route path="/deals/lease" element={<LeaseDealsPage />} />
    <Route path="/deals/lease/:slug" element={<LeaseCategoryDispatcher />} />
    <Route path="/deals/lease/:make/:model" element={<LeaseByMakeModelPage />} />
    <Route path="/deals/suv" element={<SuvDealsPage />} />
    <Route path="/deals/truck" element={<TruckDealsPage />} />
    <Route path="/deals/all" element={<AllDealsPage />} />
    <Route path="/deals/fuel-type" element={<FuelTypeDealsPage />} />
    <Route path="/deals/cash-finance-body-style" element={<CashFinanceBodyStylePage />} />
    <Route path="/:make/deals-incentives" element={<DealsByMakePage />} />
    <Route path="/:make/:model/deals-incentives" element={<DealsByMakeModelPage />} />
    <Route path="/lease-deals" element={<LeaseDealsHubPage />} />
    <Route path="/:make/lease-deals" element={<LeaseByMakePage />} />
    <Route path="/:make/:model/lease-deals" element={<LeaseByMakeModelPage />} />
  </>
);

const tradeInRoutes = (
  <>
    <Route path="/whats-my-car-worth" element={<WhatsMyCarWorthPage />} />
    <Route path="/whats-my-car-worth/results" element={<WhatsMyCarWorthResultsPage />} />
    <Route path="/trade-in-value" element={<WhatsMyCarWorthPage />} />
    <Route path="/trade-in-value/results" element={<WhatsMyCarWorthResultsPage />} />
  </>
);

const accountRoutes = <Route path="/account" element={<MyAccount />} />;

const internalRoutes = (
  <>
    <Route path="/design-system" element={<DesignSystem />} />
    <Route path="/admin/vehicle-ratings" element={<VehicleRatingEditor />} />
    <Route path="/admin/feedback" element={<FeedbackAdmin />} />
    <Route path="/audit/cards" element={<CardAudit />} />
    <Route path="/audit/carousels" element={<CarouselAuditPage />} />
    <Route path="/email-preview" element={<EmailPreviewPage />} />
  </>
);

const vehicleDetailRoutes = (
  <>
    <Route path="/:year/:make/:model/reliability-recalls" element={<ReliabilityRecallsPage />} />
    <Route path="/:year/:make/:model" element={<VehiclePage />} />
    <Route path="/:year/:make/:model/v1" element={<VehiclePageVariant variant="v1" />} />
    <Route path="/:year/:make/:model/v2" element={<VehiclePageVariant variant="v2" />} />
    <Route path="/:year/:make/:model/v3" element={<VehiclePageVariant variant="v3" />} />
    <Route path="/:year/:make/:model/v4" element={<VehiclePageVariant variant="v4" />} />
    <Route path="/:year/:make/:model/v5" element={<VehiclePageVariant variant="v5" />} />
    <Route path="/:year/:make/:model/v10" element={<VehiclePageVariant variant="v10" />} />
    <Route path="/:year/:make/:model/v1b" element={<VehiclePageVariantB variant="v1b" />} />
    <Route path="/:year/:make/:model/v2b" element={<VehiclePageVariantB variant="v2b" />} />
    <Route path="/:year/:make/:model/v3b" element={<VehiclePageVariantB variant="v3b" />} />
    <Route path="/:year/:make/:model/v4b" element={<VehiclePageVariantB variant="v4b" />} />
    <Route path="/:year/:make/:model/v5b" element={<VehiclePageVariantB variant="v5b" />} />
    <Route path="/:year/:make/:model/v1c" element={<VehiclePageVariantC variant="v1c" />} />
    <Route path="/:year/:make/:model/v2c" element={<VehiclePageVariantC variant="v2c" />} />
    <Route path="/:year/:make/:model/v3c" element={<VehiclePageVariantC variant="v3c" />} />
    <Route path="/:year/:make/:model/v4c" element={<VehiclePageVariantC variant="v4c" />} />
    <Route path="/:year/:make/:model/v5c" element={<VehiclePageVariantC variant="v5c" />} />
    <Route path="/:year/:make/:model/v1d" element={<VehiclePageVariantD variant="v1d" />} />
    <Route path="/:year/:make/:model/v2d" element={<VehiclePageVariantD variant="v2d" />} />
    <Route path="/:year/:make/:model/v3d" element={<VehiclePageVariantD variant="v3d" />} />
    <Route path="/:year/:make/:model/v4d" element={<VehiclePageVariantD variant="v4d" />} />
    <Route path="/:year/:make/:model/v5d" element={<VehiclePageVariantD variant="v5d" />} />
    <Route path="/:year/:make/:model/concept" element={<VehiclePageConcept />} />
  </>
);

const fallbackRoutes = <Route path="*" element={<NotFoundPage />} />;

const routeSections = [
  ['authentication', authenticationRoutes],
  ['onboarding', onboardingRoutes],
  ['editorial', editorialRoutes],
  ['vehicle-discovery', vehicleDiscoveryRoutes],
  ['finance', financeRoutes],
  ['deals', dealsRoutes],
  ['trade-in', tradeInRoutes],
  ['account', accountRoutes],
  ['internal', internalRoutes],
  ['vehicle-detail', vehicleDetailRoutes],
  ['fallback', fallbackRoutes],
] as const;

function App() {
  const location = useLocation();
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const isOnboardingPage = location.pathname.startsWith('/onboarding') || location.pathname === '/sign-in' || location.pathname === '/sign-up';
  const isImmersivePage = isOnboardingPage;
  const currentVehicle = useMemo(() => {
    const match = location.pathname.match(/^\/(\d{4})\/([^/]+)\/([^/]+)/);
    if (!match) return null;
    const [, year, make, model] = match;
    return getVehicleBySlug(`${year}/${make}/${model}`);
  }, [location.pathname]);

  const openAccountModal = () => setIsAccountModalOpen(true);

  return (
    <AuthProvider>
      <CarFinderProvider>
        <div className="app">
        {/* Skip Link for Accessibility */}
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        
        <ScrollToTop />
        
        {/* Only show Header/Footer for non-onboarding pages */}
        {!isImmersivePage && <Header onAccountPromptOpen={openAccountModal} />}
        
        <main id="main-content">
          <Suspense fallback={<PageLoader />}>
            <Routes>
              {routeSections.map(([name, routes]) => (
                <Fragment key={name}>{routes}</Fragment>
              ))}
            </Routes>
          </Suspense>
        </main>
        
        {!isImmersivePage && <Footer onAccountPromptOpen={openAccountModal} />}

        {!isImmersivePage && (
          <ExitIntentModal
            isOpen={isAccountModalOpen}
            onClose={() => setIsAccountModalOpen(false)}
            vehicleName={currentVehicle ? `${currentVehicle.year} ${currentVehicle.make} ${currentVehicle.model}` : undefined}
            vehicleImage={currentVehicle?.image}
            enableExitIntent={false}
          />
        )}
        
        {/* AI Car Finder Chat - only when user enables it from footer */}
        <CarFinderChatGate />
      </div>
    </CarFinderProvider>
    </AuthProvider>
  );
}

export default App;
