import { useState, useEffect } from 'react';
import { WelcomeEmail, type BrowsedVehicle } from '../../components/EmailTemplates';
import { getViewedVehicles, exportCDPData, clearCDPData } from '../../utils/cdpTracking';
import { getAuthUser, clearAuthUser, type GoogleUser } from '../../components/GoogleOneTap/GoogleOneTap';
import { vehicleDatabase } from '../../data/vehicles';
import './EmailPreviewPage.css';

// Estimated base prices by make (fallback when not in database)
const estimatedPricesByMake: Record<string, number> = {
  'Chevrolet': 28500,
  'Ford': 32000,
  'Toyota': 31500,
  'Honda': 29000,
  'Ram': 42000,
  'GMC': 45000,
  'Jeep': 38000,
  'Hyundai': 27500,
  'Kia': 26500,
  'Nissan': 28000,
  'Subaru': 30000,
  'Mazda': 29500,
  'BMW': 55000,
  'Mercedes-Benz': 58000,
  'Audi': 52000,
  'Lexus': 48000,
  'Acura': 42000,
  'Porsche': 85000,
  'Tesla': 45000,
  'Rivian': 75000,
};

const getEstimatedPrice = (make: string, model: string): number => {
  // Check for specific model adjustments
  const modelLower = model.toLowerCase();
  let basePrice = estimatedPricesByMake[make] || 35000;
  
  // Adjust for truck/SUV models
  if (modelLower.includes('1500') || modelLower.includes('f-150') || modelLower.includes('silverado')) {
    basePrice = Math.max(basePrice, 45000);
  }
  if (modelLower.includes('trax') || modelLower.includes('trailblazer')) {
    basePrice = Math.min(basePrice, 25000);
  }
  
  // Add some variance
  return basePrice + Math.floor(Math.random() * 5000) - 2500;
};

const EmailPreviewPage = () => {
  const [browsedVehicles, setBrowsedVehicles] = useState<BrowsedVehicle[]>([]);
  const [user, setUser] = useState<GoogleUser | null>(null);
  const [cdpData, setCdpData] = useState<ReturnType<typeof exportCDPData> | null>(null);
  const [showRawData, setShowRawData] = useState(false);

  // Load data on mount and when localStorage changes
  const loadData = () => {
    const vehicles = getViewedVehicles(10);
    const mappedVehicles: BrowsedVehicle[] = vehicles.map(v => {
      // Normalize year for comparison (handle both string and number)
      const yearStr = String(v.year);
      const yearNum = typeof v.year === 'number' ? v.year : parseInt(String(v.year), 10);
      
      // Find matching vehicle in database to get image
      // Try multiple matching strategies for better results
      let vehicleFromDb = vehicleDatabase.find(
        db => {
          const dbYear = typeof db.year === 'string' ? parseInt(db.year, 10) : db.year;
          return db.make.toLowerCase() === v.make.toLowerCase() && 
                 db.model.toLowerCase() === v.model.toLowerCase() && 
                 (db.year === yearStr || dbYear === yearNum || String(dbYear) === yearStr);
        }
      );
      
      // If no exact year match, try without year (any year of same make/model)
      if (!vehicleFromDb) {
        vehicleFromDb = vehicleDatabase.find(
          db => db.make.toLowerCase() === v.make.toLowerCase() && 
                db.model.toLowerCase() === v.model.toLowerCase()
        );
      }
      
      // If still no match, try partial model matching (e.g., "1500" matches "Ram 1500")
      if (!vehicleFromDb) {
        vehicleFromDb = vehicleDatabase.find(
          db => db.make.toLowerCase() === v.make.toLowerCase() && 
                (db.model.toLowerCase().includes(v.model.toLowerCase()) || 
                 v.model.toLowerCase().includes(db.model.toLowerCase()))
        );
      }
      
      // Debug logging in development
      if (import.meta.env.DEV) {
        if (!vehicleFromDb) {
          console.warn(`[EmailPreview] No vehicle found in database for: ${v.year} ${v.make} ${v.model}`);
        } else if (!vehicleFromDb.image || vehicleFromDb.image.trim() === '') {
          console.warn(`[EmailPreview] Vehicle found but no image: ${v.year} ${v.make} ${v.model}`, vehicleFromDb);
        } else {
          console.log(`[EmailPreview] Found image for ${v.year} ${v.make} ${v.model}:`, vehicleFromDb.image);
        }
      }
      
      // Generate realistic pricing data based on vehicle
      const basePrice = vehicleFromDb?.priceMin || getEstimatedPrice(v.make, v.model);
      const monthlyPayment = Math.round(basePrice / 60); // Rough 60-month estimate
      const listingsCount = Math.floor(Math.random() * 25) + 5; // 5-30 listings
      
      return {
        year: v.year,
        make: v.make,
        model: v.model,
        trim: vehicleFromDb?.trim,
        image: vehicleFromDb?.image,
        viewCount: v.viewCount,
        link: `/${v.year}/${v.make}/${v.model}`.toLowerCase().replace(/ /g, '-'),
        price: basePrice,
        monthlyPayment,
        listingsCount,
        // Include accolades and rating from database
        staffRating: vehicleFromDb?.staffRating,
        editorsChoice: vehicleFromDb?.editorsChoice,
        tenBest: vehicleFromDb?.tenBest,
        evOfTheYear: vehicleFromDb?.evOfTheYear,
      };
    });
    setBrowsedVehicles(mappedVehicles);
    setUser(getAuthUser());
    setCdpData(exportCDPData());
  };

  useEffect(() => {
    loadData();

    // Listen for storage changes
    const handleStorage = () => loadData();
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const handleClearData = () => {
    if (confirm('Clear all CDP tracking data and sign out?')) {
      clearCDPData();
      clearAuthUser();
      loadData();
    }
  };

  const handleRefresh = () => {
    loadData();
  };

  const userName = user?.given_name || user?.name?.split(' ')[0] || 'Guest';

  return (
    <div className="email-preview-page">
      <div className="email-preview-page__header">
        <h1>Email Preview</h1>
        <p>This page shows how the Welcome Email would look with your actual browsing data.</p>
        
        <div className="email-preview-page__controls">
          <button onClick={handleRefresh} className="email-preview-page__btn">
            Refresh Data
          </button>
          <button onClick={() => setShowRawData(!showRawData)} className="email-preview-page__btn">
            {showRawData ? 'Hide' : 'Show'} Raw CDP Data
          </button>
          <button onClick={handleClearData} className="email-preview-page__btn email-preview-page__btn--danger">
            Clear All Data
          </button>
        </div>

        {/* User Status */}
        <div className="email-preview-page__status">
          <div className="email-preview-page__status-item">
            <strong>Signed In:</strong> {user ? `Yes (${user.email})` : 'No'}
          </div>
          <div className="email-preview-page__status-item">
            <strong>Vehicles Viewed:</strong> {browsedVehicles.length}
          </div>
          <div className="email-preview-page__status-item">
            <strong>Total CDP Events:</strong> {cdpData?.events.length || 0}
          </div>
        </div>

        {/* Browsed Vehicles List */}
        {browsedVehicles.length > 0 && (
          <div className="email-preview-page__vehicles">
            <h3>Your Browsed Vehicles:</h3>
            <ul>
              {browsedVehicles.map((v, i) => (
                <li key={i}>
                  {v.year} {v.make} {v.model} 
                  {v.viewCount && v.viewCount > 1 && ` (viewed ${v.viewCount}x)`}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Raw CDP Data */}
        {showRawData && cdpData && (
          <div className="email-preview-page__raw-data">
            <h3>Raw CDP Data:</h3>
            <pre>{JSON.stringify(cdpData, null, 2)}</pre>
          </div>
        )}
      </div>

      {/* Email Preview */}
      <div className="email-preview-page__preview">
        <h2>Email Preview</h2>
        <p className="email-preview-page__preview-note">
          {browsedVehicles.length > 0 
            ? 'Showing personalized email with your browsing history'
            : 'No vehicles viewed yet. Browse some vehicle pages to see personalized content.'}
        </p>
        
        <div className="email-preview-page__email-container">
          <WelcomeEmail 
            userName={userName}
            browsedVehicles={browsedVehicles}
          />
        </div>
      </div>

      {/* Instructions */}
      <div className="email-preview-page__instructions">
        <h3>How to Test:</h3>
        <ol>
          <li>Browse some vehicle pages (e.g., <a href="/2025/Honda/Accord">/2025/Honda/Accord</a>)</li>
          <li>Come back to this page and click "Refresh Data"</li>
          <li>The email preview will update with your browsed vehicles</li>
          <li>Sign in with Google One Tap to see your name in the email</li>
        </ol>
      </div>
    </div>
  );
};

export default EmailPreviewPage;
