import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Menu, X } from 'lucide-react';
import './Header.css';

interface HeaderProps {
  onShopNewCars?: () => void;
}

const Header = ({ onShopNewCars }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const navItems = [
    { label: 'Browse All Vehicles', href: '/vehicles', isRoute: true },
    { label: 'Shop New Cars', href: '#', onClick: onShopNewCars },
    { label: 'Shop Used Cars', href: '#' },
    { label: 'Research Cars', href: '#' },
    { label: 'Expert Reviews', href: '#' },
    { label: "What's My Car Worth?", href: '#' },
    { label: 'News + Stories', href: '#' },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/vehicles?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
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

          {/* Logo */}
          <Link to="/" className="header__logo" aria-label="Car and Driver Home">
            <svg viewBox="0 0 1364 263" className="header__logo-svg" xmlns="http://www.w3.org/2000/svg">
              <path fill="currentColor" d="M76.91 198.564c0 7.861-2.052 13.33-8.888 13.33-7.176 0-9.57-4.787-9.57-13.33V62.862c0-8.887 2.05-12.647 9.23-12.647 7.176 0 9.228 4.445 9.228 12.647v39.308h55.716V60.466c0-33.495-15.038-59.473-60.158-59.473H62.213C16.408.993 0 29.705 0 66.282v129.207c0 38.966 15.04 67.334 62.554 67.334h9.914c44.435 0 60.158-30.42 60.158-62.554v-52.635H76.91zm140.72 60.158h54.694l-35.55-254.31h-69.39l-32.473 254.31h48.88l3.76-37.259h25.979zM200.54 93.968l7.862 77.248H192.68zm134.126-45.806h8.205c7.52 0 9.229 3.076 9.229 11.966v34.178c0 8.89-3.079 12.31-10.255 12.31h-7.18zm0 106.308h7.861c7.52 0 9.573 3.76 9.573 12.304v73.835c0 9.228 2.049 15.038 4.442 18.113h55.716v-1.708c-1.708-3.42-3.416-8.89-3.416-18.46V154.47c0-19.146-12.648-29.397-22.218-33.158 9.91-4.445 22.218-15.04 22.218-38.625V49.186c0-30.077-17.09-44.774-42.045-44.774h-88.53v254.31h56.399zm281.008 104.252h81.008c33.157 0 50.592-18.801 50.592-58.453V60.466c0-40.671-19.484-56.054-50.933-56.054h-80.667zm55.715-207.14h8.544c7.52 0 9.914 4.445 9.914 14.7v128.18c0 10.596-2.393 15.383-10.596 15.383h-7.862zm141.918-3.42h8.203c7.52 0 9.228 3.076 9.228 11.966v34.178c0 8.89-3.075 12.31-10.255 12.31h-7.176zm0 106.308h7.862c7.52 0 9.57 3.76 9.57 12.304v73.835c0 9.228 2.051 15.038 4.444 18.113H890.9v-1.708c-1.708-3.42-3.419-8.89-3.419-18.46V154.47c0-19.146-12.648-29.397-22.217-33.158 9.913-4.445 22.217-15.04 22.217-38.625V49.186c0-30.077-17.087-44.774-42.042-44.774h-88.532v254.31h56.401zm86.785 104.255h56.4V4.412h-56.4zm99.227-.003h73.832l34.186-254.31h-54.349l-15.385 159.286-15.382-159.286h-59.473zm114.267-254.31v254.31h107.674v-53.664h-51.958V154.47h39.996v-54.008h-39.996V57.05h49.906V4.412zm171.868 43.75h8.2c7.52 0 9.228 3.076 9.228 11.966v34.178c0 8.89-3.075 12.31-10.255 12.31h-7.173zm0 106.308h7.859c7.52 0 9.57 3.76 9.57 12.304v73.835c0 9.228 2.051 15.038 4.444 18.113h55.716v-1.708c-1.708-3.42-3.419-8.89-3.419-18.46V154.47c0-19.146-12.645-29.397-22.217-33.158 9.913-4.445 22.217-15.04 22.217-38.625V49.186c0-30.077-17.087-44.774-42.042-44.774h-88.532v254.31h56.404zm-823.856 29.195h19.441L468.018 78.982h-25.422L430.7 183.665h17.907l1.38-15.34h10.11zm-6.856-70.79 3.476 35.957h-6.354zm32.232-33.893v104.683h17.907V129.07l12.271 54.594h18.158V78.982h-17.658v50.651l-10.644-50.651zm57.382 104.683h29.679c12.145 0 18.532-7.742 18.532-24.063V102.06c0-16.743-7.138-23.08-18.658-23.08h-29.553zm19.819-85.263h3.724c2.755 0 3.632 1.825 3.632 6.05v52.76c0 4.36-.877 6.33-3.883 6.33h-3.473z"/>
              <path d="M428.499 64.016h166.27V4.609H428.5z" fill="#d2232a"/>
              <path d="M428.499 258.039h166.27v-59.402H428.5z" fill="#0061af"/>
            </svg>
          </Link>

          {/* Search Bar */}
          <form className="header__search-bar" onSubmit={handleSearch}>
            <input
              type="text"
              className="header__search-input"
              placeholder="Search vehicles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="header__search-btn" aria-label="Search">
              <Search size={20} />
            </button>
          </form>

          {/* Actions */}
          <div className="header__actions">
            <button className="header__subscribe-btn">Subscribe</button>
            <button className="header__user-btn" aria-label="User account">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path d="M21.649 19.875c-1.428-2.468-3.629-4.239-6.196-5.078a6.75 6.75 0 1 0-6.906 0c-2.568.839-4.768 2.609-6.196 5.078a.75.75 0 1 0 1.299.75C5.416 17.573 8.538 15.75 12 15.75c3.462 0 6.584 1.823 8.35 4.875a.75.75 0 1 0 1.299-.75ZM6.749 9a5.25 5.25 0 1 1 10.5 0 5.25 5.25 0 0 1-10.5 0Z" fill="currentColor"/>
              </svg>
            </button>
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
                    onClick={(e) => {
                      if (item.onClick) {
                        e.preventDefault();
                        item.onClick();
                      }
                    }}
                  >
                    {item.label}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
