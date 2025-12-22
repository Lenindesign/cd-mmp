import React, { useState } from 'react';
import './ResinHeader.css';

export interface NavItem {
  label: string;
  href: string;
  isActive?: boolean;
}

export interface ResinHeaderProps {
  /** Logo image URL */
  logoUrl?: string;
  /** Logo alt text */
  logoAlt?: string;
  /** Navigation items */
  navItems?: NavItem[];
  /** Show subscribe button */
  showSubscribe?: boolean;
  /** Subscribe button text */
  subscribeText?: string;
  /** Subscribe button URL */
  subscribeHref?: string;
  /** Show sign in link */
  showSignIn?: boolean;
  /** Sign in text */
  signInText?: string;
  /** Sign in URL */
  signInHref?: string;
  /** Show search button */
  showSearch?: boolean;
  /** Callback when search is clicked */
  onSearchClick?: () => void;
  /** Callback when menu is clicked */
  onMenuClick?: () => void;
  /** Is the header sticky */
  sticky?: boolean;
  /** Header variant */
  variant?: 'default' | 'transparent' | 'dark';
}

export const ResinHeader: React.FC<ResinHeaderProps> = ({
  logoUrl = '/cd-logo.svg',
  logoAlt = 'Car and Driver',
  navItems = [],
  showSubscribe = true,
  subscribeText = 'SUBSCRIBE',
  subscribeHref = '#',
  showSignIn = true,
  signInText = 'sign in',
  signInHref = '#',
  showSearch = true,
  onSearchClick,
  onMenuClick,
  sticky = false,
  variant = 'default',
}) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSearchClick = () => {
    setIsSearchOpen(!isSearchOpen);
    onSearchClick?.();
  };

  const handleMenuClick = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    onMenuClick?.();
  };

  return (
    <header 
      className={`resin-header resin-header--${variant} ${sticky ? 'resin-header--sticky' : ''}`}
    >
      <nav className="resin-header__nav">
        {/* Mobile Menu Button */}
        <button 
          className="resin-header__menu-btn"
          onClick={handleMenuClick}
          aria-label="Open menu"
          aria-expanded={isMobileMenuOpen}
        >
          <span className="resin-header__menu-icon">
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>

        {/* Logo */}
        <a href="/" className="resin-header__logo">
          <img src={logoUrl} alt={logoAlt} />
        </a>

        {/* Navigation Links */}
        <ul className="resin-header__links">
          {navItems.map((item, index) => (
            <li key={index} className="resin-header__link-item">
              <a 
                href={item.href} 
                className={`resin-header__link ${item.isActive ? 'resin-header__link--active' : ''}`}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Actions */}
        <div className="resin-header__actions">
          {showSubscribe && (
            <a href={subscribeHref} className="resin-header__subscribe">
              {subscribeText}
            </a>
          )}
          
          {showSignIn && (
            <a href={signInHref} className="resin-header__signin">
              {signInText}
            </a>
          )}
          
          {showSearch && (
            <button 
              className="resin-header__search-btn"
              onClick={handleSearchClick}
              aria-label="Search"
              aria-expanded={isSearchOpen}
            >
              <svg 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
            </button>
          )}
        </div>
      </nav>

      {/* Search Overlay */}
      {isSearchOpen && (
        <div className="resin-header__search-overlay">
          <div className="resin-header__search-container">
            <input 
              type="search" 
              placeholder="Search..." 
              className="resin-header__search-input"
              autoFocus
            />
            <button 
              className="resin-header__search-close"
              onClick={() => setIsSearchOpen(false)}
              aria-label="Close search"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="resin-header__mobile-overlay">
          <div className="resin-header__mobile-menu">
            <button 
              className="resin-header__mobile-close"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
            
            <a href="/" className="resin-header__mobile-logo">
              <img src={logoUrl} alt={logoAlt} />
            </a>

            <ul className="resin-header__mobile-links">
              {navItems.map((item, index) => (
                <li key={index}>
                  <a 
                    href={item.href}
                    className={item.isActive ? 'active' : ''}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>

            {showSubscribe && (
              <a href={subscribeHref} className="resin-header__mobile-subscribe">
                {subscribeText}
              </a>
            )}

            {showSignIn && (
              <a href={signInHref} className="resin-header__mobile-signin">
                {signInText}
              </a>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default ResinHeader;

