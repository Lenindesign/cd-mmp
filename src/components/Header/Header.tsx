import { useState, useEffect, useRef, useMemo } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, Menu, X, User, LogOut, Bookmark, Car, GitCompare, Sparkles } from 'lucide-react';
import { searchVehicles, getVehicleBySlug, type Vehicle } from '../../services/vehicleService';
import { useSupabaseRatings, getCategory } from '../../hooks/useSupabaseRating';
import { useAuth } from '../../contexts/AuthContext';
import { getAvatarImageUrl, getUserInitials } from '../../utils/avatarUtils';
import { Button } from '../Button';
import ExitIntentModal from '../ExitIntentModal';
import { SavedVehiclesSidebar } from '../SavedVehiclesSidebar';
import './Header.css';

// Key for tracking if welcome tooltip has been shown
const WELCOME_TOOLTIP_SHOWN_KEY = 'cd_welcome_tooltip_shown';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, signOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Vehicle[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeSuggestion, setActiveSuggestion] = useState(-1);
  const [isSubscribeModalOpen, setIsSubscribeModalOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showSavedSidebar, setShowSavedSidebar] = useState(false);
  const [showWelcomeTooltip, setShowWelcomeTooltip] = useState(false);
  const searchRef = useRef<HTMLFormElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const welcomeTooltipRef = useRef<HTMLDivElement>(null);
  
  // Fetch all ratings from Supabase in production
  const { getRating: getSupabaseRating } = useSupabaseRatings();

  // Show welcome tooltip for newly onboarded users
  useEffect(() => {
    if (isAuthenticated && user?.onboardingCompleted) {
      // Check if we've already shown the welcome tooltip
      const hasShownTooltip = localStorage.getItem(WELCOME_TOOLTIP_SHOWN_KEY);
      
      if (!hasShownTooltip) {
        // Small delay to let the page settle after navigation
        const timer = setTimeout(() => {
          setShowWelcomeTooltip(true);
        }, 500);
        
        return () => clearTimeout(timer);
      }
    }
  }, [isAuthenticated, user?.onboardingCompleted]);

  // Close welcome tooltip when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        welcomeTooltipRef.current && 
        !welcomeTooltipRef.current.contains(e.target as Node)
      ) {
        handleDismissWelcomeTooltip();
      }
    };

    if (showWelcomeTooltip) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showWelcomeTooltip]);

  const handleDismissWelcomeTooltip = () => {
    setShowWelcomeTooltip(false);
    localStorage.setItem(WELCOME_TOOLTIP_SHOWN_KEY, 'true');
  };
  
  // Fallback placeholder image for vehicles without images
  const PLACEHOLDER_IMAGE = 'https://d2kde5ohu8qb21.cloudfront.net/files/659f9ed490e84500088bd486/012-2024-lamborghini-revuelto.jpg';

  // Extract current vehicle from URL if on a vehicle page
  const currentVehicle = useMemo(() => {
    // Match URL pattern: /:year/:make/:model or /:year/:make/:model/variant
    const match = location.pathname.match(/^\/(\d{4})\/([^/]+)\/([^/]+)/);
    if (match) {
      const [, year, make, model] = match;
      const slug = `${year}/${make}/${model}`;
      return getVehicleBySlug(slug);
    }
    return null;
  }, [location.pathname]);
  
  // Get vehicle image with fallback
  const currentVehicleImage = currentVehicle?.image || (currentVehicle ? PLACEHOLDER_IMAGE : undefined);
  
  // Helper to get vehicle rating (uses Supabase in production)
  const getVehicleRating = (vehicle: Vehicle): number => {
    return getSupabaseRating(vehicle.id, getCategory(vehicle.bodyStyle), vehicle.staffRating);
  };

  const navItems = [
    { label: 'Browse All Vehicles', href: '/vehicles', isRoute: true },
    { label: 'Shop New Cars', href: '/vehicles?type=new&sort=rating', isRoute: true },
    { label: 'Shop Used Cars', href: '/vehicles?type=used&sort=price-low', isRoute: true },
    { label: 'Research Cars', href: '#' },
    { label: 'Expert Reviews', href: '/rankings', isRoute: true },
    { label: "What's My Car Worth?", href: '/whats-my-car-worth', isRoute: true },
    { label: 'News + Stories', href: '/news' },
  ];

  // Handle search input changes
  useEffect(() => {
    if (searchQuery.trim().length >= 2) {
      const results = searchVehicles(searchQuery).slice(0, 8);
      setSuggestions(results);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
    setActiveSuggestion(-1);
  }, [searchQuery]);

  // Close suggestions and user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    setShowUserMenu(false);
    navigate('/');
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/vehicles?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (vehicle: Vehicle) => {
    navigate(`/${vehicle.slug}`);
    setSearchQuery('');
    setShowSuggestions(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions || suggestions.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveSuggestion(prev => 
        prev < suggestions.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveSuggestion(prev => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === 'Enter' && activeSuggestion >= 0) {
      e.preventDefault();
      handleSuggestionClick(suggestions[activeSuggestion]);
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  return (
    <header className="header">
      <div className="header__container">
        {/* Top Row: Logo, Search, Actions */}
        <div className="header__top">
          {/* Mobile Menu Button */}
          <button
            className="header__mobile-menu-btn"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Logo - Animated */}
          <Link to="/" className="header__logo" aria-label="Car and Driver Home">
            <svg viewBox="0 0 1364 262" className="header__logo-svg header__logo-svg--animated" xmlns="http://www.w3.org/2000/svg">
              {/* C */}
              <path className="header__logo-letter" fill="currentColor" d="M68.022 210.901C74.858 210.901 76.91 205.432 76.91 197.571V146.641H132.626V199.276C132.626 231.41 116.903 261.83 72.468 261.83H62.554C15.04 261.83 0 233.462 0 194.496V65.289C0 28.712 16.408 0 62.213 0H72.468C117.588 0 132.626 25.978 132.626 59.473V101.177H76.91V61.869C76.91 53.667 74.858 49.222 67.682 49.222C60.502 49.222 58.452 52.982 58.452 61.869V197.571C58.452 206.114 60.846 210.901 68.022 210.901Z"/>
              {/* A */}
              <path className="header__logo-letter" fill="currentColor" d="M272.324 257.729H217.63L213.53 220.47H187.551L183.791 257.729H134.911L167.384 3.41907H236.774L272.324 257.729ZM192.681 170.223H208.402L200.54 92.9747L192.681 170.223Z"/>
              {/* R */}
              <path className="header__logo-letter" fill="currentColor" d="M366.797 3.41907C391.752 3.41907 408.842 18.1158 408.842 48.1925V81.6935C408.842 105.278 396.534 115.873 386.624 120.318C396.194 124.079 408.842 134.331 408.842 153.477V237.561C408.842 247.13 410.55 252.601 412.258 256.021V257.729H356.542C354.149 254.654 352.101 248.844 352.101 239.616V165.781C352.101 157.237 350.047 153.477 342.527 153.477H334.666V257.729H278.268V3.41907H366.797ZM334.665 105.623H341.845C349.021 105.623 352.1 102.203 352.1 93.3126V59.1349C352.1 50.245 350.391 47.1691 342.871 47.1691H334.666L334.665 105.623Z"/>
              {/* Red bar */}
              <path className="header__logo-bar" d="M428.499 63.023H594.769V3.61597H428.5L428.499 63.023Z" fill="#D2232A"/>
              {/* Blue bar */}
              <path className="header__logo-bar" d="M428.499 257.046H594.769V197.644H428.5L428.499 257.046Z" fill="#0061AF"/>
              {/* AND */}
              <path className="header__logo-letter" fill="currentColor" d="M481.039 182.672H461.599L460.098 167.332H449.987L448.607 182.672H430.7L442.597 77.9894H468.019L481.039 182.672ZM451.864 147.839H458.219L454.742 111.882L451.864 147.839Z"/>
              <path className="header__logo-letter" fill="currentColor" d="M486.974 182.672V77.9889H507.008L517.652 128.64V77.9889H535.31V182.671H517.152L504.881 128.077V182.672H486.974Z"/>
              <path className="header__logo-letter" fill="currentColor" d="M573.909 77.9874C585.429 77.9875 592.567 84.3239 592.567 101.067V158.609C592.567 174.929 586.18 182.672 574.035 182.672H544.356V77.9874H573.909ZM564.175 162.549H567.647C570.653 162.549 571.531 160.579 571.531 156.219V103.459C571.531 99.2341 570.653 97.4093 567.898 97.4093H564.175V162.549Z"/>
              {/* D */}
              <path className="header__logo-letter" fill="currentColor" d="M696.341 3.41907C727.79 3.41907 747.273 18.8019 747.273 59.4728V199.276C747.273 238.928 729.839 257.729 696.682 257.729H615.674V3.41907H696.341ZM671.389 208.852H679.251C687.454 208.852 689.847 204.065 689.847 193.469V65.2892C689.847 55.0342 687.453 50.589 679.933 50.589H671.389V208.852Z"/>
              {/* R */}
              <path className="header__logo-letter" fill="currentColor" d="M845.438 3.41907C870.393 3.41907 887.48 18.1158 887.48 48.1925V81.6935C887.48 105.278 875.177 115.873 865.264 120.318C874.833 124.079 887.48 134.331 887.48 153.477V237.561C887.48 247.13 889.191 252.601 890.899 256.021V257.729H835.183C832.79 254.654 830.738 248.844 830.738 239.616V165.781C830.738 157.237 828.689 153.477 821.169 153.477H813.307L813.308 257.729H756.907V3.41907H845.438ZM813.307 105.623H820.482C827.662 105.623 830.737 102.203 830.737 93.3126V59.1349C830.737 50.245 829.03 47.1691 821.51 47.1691H813.307V105.623Z"/>
              {/* I */}
              <path className="header__logo-letter" fill="currentColor" d="M956.492 257.732H900.092V3.41895H956.492V257.732Z"/>
              {/* V */}
              <path className="header__logo-letter" fill="currentColor" d="M1073.15 257.729H999.319L962.748 3.41895H1022.22L1037.6 162.705L1052.99 3.41895H1107.34L1073.15 257.729Z"/>
              {/* E */}
              <path className="header__logo-letter" fill="currentColor" d="M1113.59 257.729V3.41895H1219.21V56.0569H1169.3V99.4689H1209.3V153.477H1169.3V204.065H1221.26V257.729H1113.59Z"/>
              {/* R */}
              <path className="header__logo-letter" fill="currentColor" d="M1285.45 47.1689H1293.65C1301.17 47.1689 1302.88 50.2449 1302.88 59.1349V93.313C1302.88 102.203 1299.81 105.623 1292.63 105.623H1285.45V47.1689ZM1285.45 153.477H1293.31C1300.83 153.477 1302.88 157.237 1302.88 165.781V239.616C1302.88 248.844 1304.93 254.654 1307.33 257.729H1363.04V256.021C1361.33 252.601 1359.62 247.131 1359.62 237.561V153.477C1359.62 134.331 1346.98 124.08 1337.41 120.319C1347.32 115.874 1359.62 105.279 1359.62 81.6939V48.1929C1359.62 18.1159 1342.54 3.41895 1317.58 3.41895H1229.05V257.729H1285.45V153.477Z"/>
            </svg>
          </Link>

          {/* Search Bar */}
          <form className="header__search-bar" onSubmit={handleSearch} ref={searchRef}>
            <input
              type="text"
              className="header__search-input"
              placeholder="Search vehicles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => searchQuery.trim().length >= 2 && setShowSuggestions(true)}
            />
            <button type="submit" className="header__search-btn" aria-label="Search">
              <Search size={20} />
            </button>
            
            {/* Autocomplete Suggestions */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="header__suggestions">
                {suggestions.map((vehicle, index) => (
                  <div
                    key={vehicle.id}
                    className={`header__suggestion ${index === activeSuggestion ? 'header__suggestion--active' : ''}`}
                  >
                    <img 
                      src={vehicle.image || '/placeholder-car.png'} 
                      alt={`${vehicle.make} ${vehicle.model}`}
                      className="header__suggestion-image"
                      onClick={() => handleSuggestionClick(vehicle)}
                    />
                    <div className="header__suggestion-info" onClick={() => handleSuggestionClick(vehicle)}>
                      <span className="header__suggestion-name">
                        {vehicle.year} {vehicle.make} {vehicle.model}
                      </span>
                      <span className="header__suggestion-price">
                        {vehicle.priceRange}
                      </span>
                    </div>
                    <span className="header__suggestion-rating">
                      <span className="header__suggestion-rating-score">{getVehicleRating(vehicle)}</span>/10
                    </span>
                    <div className="header__suggestion-ctas">
                      <button
                        type="button"
                        className="header__suggestion-cta header__suggestion-cta--buy"
                        onClick={() => {
                          navigate(`/${vehicle.slug}#pricing`);
                          setSearchQuery('');
                          setShowSuggestions(false);
                        }}
                      >
                        Buy
                      </button>
                      <button
                        type="button"
                        className="header__suggestion-cta header__suggestion-cta--research"
                        onClick={() => handleSuggestionClick(vehicle)}
                      >
                        Research
                      </button>
                    </div>
                  </div>
                ))}
                <button
                  type="submit"
                  className="header__suggestion header__suggestion--all"
                >
                  <Search size={16} />
                  <span>See all results for "{searchQuery}"</span>
                </button>
              </div>
            )}
          </form>

          {/* Actions */}
          <div className="header__actions">
            {/* Show My Garage button for authenticated users, Subscribe for others */}
            {isAuthenticated ? (
              <button
                className="header__saved-btn"
                onClick={() => setShowSavedSidebar(true)}
                aria-label="My Garage"
              >
                <Bookmark size={18} fill="currentColor" />
                <span className="header__saved-btn-text">My Garage</span>
              </button>
            ) : (
              <Button 
                variant="primary"
                size="small"
                onClick={() => setIsSubscribeModalOpen(true)}
                className="header__subscribe-btn"
              >
                Subscribe
              </Button>
            )}
            
            {/* User Account */}
            <div className="header__user-container" ref={userMenuRef}>
              {isAuthenticated && user ? (
                <>
                  <button 
                    className="header__user-btn header__user-btn--authenticated"
                    onClick={() => {
                      if (showWelcomeTooltip) {
                        handleDismissWelcomeTooltip();
                      }
                      setShowUserMenu(!showUserMenu);
                    }}
                    aria-label="User menu"
                    aria-expanded={showUserMenu}
                  >
                    <div className="header__user-avatar">
                      {getAvatarImageUrl(user.avatar) ? (
                        <img 
                          src={getAvatarImageUrl(user.avatar)!} 
                          alt={user.name || 'User avatar'} 
                          className="header__user-avatar-img"
                        />
                      ) : (
                        <span>{getUserInitials(user.name)}</span>
                      )}
                    </div>
                  </button>

                  {/* Welcome Tooltip - Shows after onboarding */}
                  {showWelcomeTooltip && (
                    <div 
                      ref={welcomeTooltipRef}
                      className="header__welcome-tooltip"
                      role="dialog"
                      aria-labelledby="welcome-tooltip-title"
                    >
                      <div className="header__welcome-tooltip-arrow" />
                      <button 
                        className="header__welcome-tooltip-close"
                        onClick={handleDismissWelcomeTooltip}
                        aria-label="Close welcome message"
                      >
                        <X size={16} />
                      </button>
                      
                      <div className="header__welcome-tooltip-header">
                        <Sparkles size={24} className="header__welcome-tooltip-icon" />
                        <h3 id="welcome-tooltip-title" className="header__welcome-tooltip-title">
                          Welcome, {user.name?.split(' ')[0] || 'Member'}! 🎉
                        </h3>
                      </div>
                      
                      <p className="header__welcome-tooltip-subtitle">
                        You're all set! Here's what you can do:
                      </p>
                      
                      <ul className="header__welcome-tooltip-features">
                        <li className="header__welcome-tooltip-feature">
                          <div className="header__welcome-tooltip-feature-icon">
                            <Bookmark size={18} />
                          </div>
                          <div className="header__welcome-tooltip-feature-text">
                            <strong>Save Cars</strong>
                            <span>Bookmark vehicles you love to your garage</span>
                          </div>
                        </li>
                        <li className="header__welcome-tooltip-feature">
                          <div className="header__welcome-tooltip-feature-icon">
                            <GitCompare size={18} />
                          </div>
                          <div className="header__welcome-tooltip-feature-text">
                            <strong>Compare Cars</strong>
                            <span>See how vehicles stack up side by side</span>
                          </div>
                        </li>
                        <li className="header__welcome-tooltip-feature">
                          <div className="header__welcome-tooltip-feature-icon">
                            <Car size={18} />
                          </div>
                          <div className="header__welcome-tooltip-feature-text">
                            <strong>Track Prices</strong>
                            <span>Get alerts when prices drop on saved cars</span>
                          </div>
                        </li>
                      </ul>
                      
                      <button 
                        className="header__welcome-tooltip-cta"
                        onClick={() => {
                          handleDismissWelcomeTooltip();
                          navigate('/vehicles');
                        }}
                      >
                        Start Exploring
                      </button>
                    </div>
                  )}
                  
                  {showUserMenu && (
                    <div className="header__user-menu">
                      <div className="header__user-menu-header">
                        <div className="header__user-menu-avatar">
                          {getAvatarImageUrl(user.avatar) ? (
                            <img 
                              src={getAvatarImageUrl(user.avatar)!} 
                              alt={user.name || 'User avatar'} 
                              className="header__user-menu-avatar-img"
                            />
                          ) : (
                            <span>{getUserInitials(user.name)}</span>
                          )}
                        </div>
                        <div className="header__user-menu-info">
                          <span className="header__user-menu-name">{user.name || 'Member'}</span>
                          <span className="header__user-menu-email">{user.email}</span>
                        </div>
                      </div>
                      <div className="header__user-menu-divider" />
                      <Link 
                        to="/account" 
                        className="header__user-menu-item"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <User size={18} />
                        <span>My Account</span>
                      </Link>
                      <div className="header__user-menu-divider" />
                      <button 
                        className="header__user-menu-item header__user-menu-item--danger"
                        onClick={handleSignOut}
                      >
                        <LogOut size={18} />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <Link to="/sign-in" className="header__user-btn" aria-label="Sign in">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path d="M21.649 19.875c-1.428-2.468-3.629-4.239-6.196-5.078a6.75 6.75 0 1 0-6.906 0c-2.568.839-4.768 2.609-6.196 5.078a.75.75 0 1 0 1.299.75C5.416 17.573 8.538 15.75 12 15.75c3.462 0 6.584 1.823 8.35 4.875a.75.75 0 1 0 1.299-.75ZM6.749 9a5.25 5.25 0 1 1 10.5 0 5.25 5.25 0 0 1-10.5 0Z" fill="currentColor"/>
                  </svg>
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Navigation Row */}
        <nav className={`header__nav ${isMenuOpen ? 'header__nav--open' : ''}`}>
          <ul className="header__nav-list">
            {navItems.map((item, index) => (
              <li key={index} className="header__nav-item">
                {item.isRoute ? (
                  <Link to={item.href} className="header__nav-link">
                    {item.label}
                  </Link>
                ) : (
                  <a 
                    href={item.href} 
                    className="header__nav-link"
                  >
                    {item.label}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Subscribe Modal - This is the ONLY modal with exit intent enabled */}
      <ExitIntentModal 
        isOpen={isSubscribeModalOpen}
        onClose={() => setIsSubscribeModalOpen(false)}
        vehicleName={currentVehicle ? `${currentVehicle.year} ${currentVehicle.make} ${currentVehicle.model}` : undefined}
        vehicleImage={currentVehicleImage}
        enableExitIntent={true}
      />

      {/* Saved Vehicles Sidebar */}
      <SavedVehiclesSidebar
        isOpen={showSavedSidebar}
        onClose={() => setShowSavedSidebar(false)}
      />
    </header>
  );
};

export default Header;
