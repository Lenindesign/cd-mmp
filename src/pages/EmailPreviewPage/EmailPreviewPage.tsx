import { useState, useEffect } from 'react';
import { WelcomeEmail, type BrowsedVehicle } from '../../components/EmailTemplates';
import { getViewedVehicles, exportCDPData, clearCDPData } from '../../utils/cdpTracking';
import { getAuthUser, clearAuthUser, type GoogleUser } from '../../components/GoogleOneTap/GoogleOneTap';
import './EmailPreviewPage.css';

const EmailPreviewPage = () => {
  const [browsedVehicles, setBrowsedVehicles] = useState<BrowsedVehicle[]>([]);
  const [user, setUser] = useState<GoogleUser | null>(null);
  const [cdpData, setCdpData] = useState<ReturnType<typeof exportCDPData> | null>(null);
  const [showRawData, setShowRawData] = useState(false);

  // Load data on mount and when localStorage changes
  const loadData = () => {
    const vehicles = getViewedVehicles(10);
    const mappedVehicles: BrowsedVehicle[] = vehicles.map(v => ({
      year: v.year,
      make: v.make,
      model: v.model,
      viewCount: v.viewCount,
      link: `/${v.year}/${v.make}/${v.model}`.toLowerCase().replace(/ /g, '-'),
    }));
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
