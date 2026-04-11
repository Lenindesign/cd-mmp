import { Facebook, Twitter, Instagram, Youtube, Mail, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BEST_BUYING_DEALS_PATH, ZERO_PERCENT_APR_DEALS_PATH } from '../../constants/dealRoutes';
import { Button } from '../Button';
import { useCarFinder } from '../../contexts/CarFinderContext';
import './Footer.css';

const Footer = () => {
  const { carFinderEnabled, toggleCarFinder } = useCarFinder();
  const footerLinks = [
    {
      title: 'New Cars',
      links: [
        { label: 'Car Rankings', path: '/rankings' },
        { label: 'SUV Rankings', path: '/rankings' },
        { label: 'Truck Rankings', path: '/rankings' },
        { label: 'Deals Hub', path: '/deals' },
        { label: 'Buying Deals', path: BEST_BUYING_DEALS_PATH },
        { label: '0% APR Deals', path: ZERO_PERCENT_APR_DEALS_PATH },
        { label: 'Lease Deals Hub', path: '/lease-deals' },
        { label: 'SUV Deals', path: '/deals/suv' },
        { label: 'Truck Deals', path: '/deals/truck' },
      ],
    },
    {
      title: 'Deals by Make',
      links: [
        { label: 'Chevrolet Deals', path: '/chevrolet/deals-incentives' },
        { label: 'Toyota Deals', path: '/toyota/deals-incentives' },
        { label: 'Honda Deals', path: '/honda/deals-incentives' },
        { label: 'Ford Deals', path: '/ford/deals-incentives' },
        { label: 'Hyundai Deals', path: '/hyundai/deals-incentives' },
        { label: 'Chevrolet Lease Deals', path: '/chevrolet/lease-deals' },
        { label: 'Toyota Lease Deals', path: '/toyota/lease-deals' },
        { label: 'Honda Lease Deals', path: '/honda/lease-deals' },
      ],
    },
    {
      title: 'Research',
      links: [
        { label: 'Compare Vehicles', path: '/compare' },
        { label: 'Car Reviews', path: '/vehicles' },
        { label: 'Road Tests', path: '/vehicles' },
        { label: 'Buyer\'s Guide', path: '/vehicles' },
        { label: 'Best Cars Lists', path: '/rankings' },
        { label: 'Car Finder', path: '/vehicles' },
      ],
    },
    {
      title: 'News',
      links: [
        { label: 'Latest News', path: '/news' },
        { label: 'Industry News', path: '/news' },
        { label: 'Future Cars', path: '/news' },
        { label: 'Auto Shows', path: '/news' },
        { label: 'Motorsports', path: '/news' },
      ],
    },
    {
      title: 'Prototypes',
      links: [
        { label: 'Design System', path: 'https://lenindesign.github.io/cd-mmp/?path=/docs/introduction--docs', external: true },
        { label: 'Honda Accord (Concept)', path: '/2026/Honda/Accord/concept' },
        { label: 'Honda Accord (Standard)', path: '/2026/Honda/Accord' },
        { label: 'Mazda CX-5', path: '/2026/Mazda/CX-5/concept' },
        { label: 'Vehicle Ranking', path: '/rankings' },
      ],
    },
  ];

  return (
    <footer className="footer">
      <div className="footer__main">
        <div className="container">
          <div className="footer__grid">
            <div className="footer__brand">
              <a href="/" className="footer__logo">
                <span className="footer__logo-text">CAR AND DRIVER</span>
              </a>
              <p className="footer__tagline">
                The authoritative source for car reviews, ratings, and comparisons since 1955.
              </p>
              
              <div className="footer__social">
                <a href="#" className="footer__social-link" aria-label="Facebook">
                  <Facebook size={20} />
                </a>
                <a href="#" className="footer__social-link" aria-label="Twitter">
                  <Twitter size={20} />
                </a>
                <a href="#" className="footer__social-link" aria-label="Instagram">
                  <Instagram size={20} />
                </a>
                <a href="#" className="footer__social-link" aria-label="YouTube">
                  <Youtube size={20} />
                </a>
              </div>
              
              <div className="footer__newsletter">
                <h4 className="footer__newsletter-title">Stay Updated</h4>
                <div className="footer__newsletter-form">
                  <input 
                    type="email" 
                    placeholder="Enter your email"
                    className="footer__newsletter-input"
                  />
                  <Button 
                    variant="primary" 
                    size="small"
                    className="footer__newsletter-btn"
                    iconLeft={<Mail size={18} />}
                    aria-label="Subscribe"
                  />
                </div>
              </div>
            </div>
            
            {footerLinks.map((section, index) => (
              <div key={index} className="footer__section">
                <h3 className="footer__section-title">{section.title}</h3>
                <ul className="footer__section-links">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      {link.external ? (
                        <a href={link.path} className="footer__link" target="_blank" rel="noopener noreferrer">{link.label}</a>
                      ) : (
                        <Link to={link.path} className="footer__link">{link.label}</Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="footer__bottom">
        <div className="container">
          <div className="footer__bottom-content">
            <p className="footer__copyright">
              © {new Date().getFullYear()} Car and Driver. All rights reserved.
            </p>
            <div className="footer__legal">
              <button
                type="button"
                className="footer__legal-link footer__legal-link--button"
                onClick={toggleCarFinder}
                aria-pressed={carFinderEnabled}
              >
                <Sparkles size={14} aria-hidden />
                {carFinderEnabled ? 'Hide Find My Car' : 'Find My Car'}
              </button>
              <a href="#" className="footer__legal-link">Privacy Policy</a>
              <a href="#" className="footer__legal-link">Terms of Use</a>
              <a href="#" className="footer__legal-link">Cookie Policy</a>
              <a href="#" className="footer__legal-link">Accessibility</a>
              <Link to="/design-system" className="footer__legal-link">Design System</Link>
              <Link to="/rankings" className="footer__legal-link">Vehicle Ranking</Link>
              <Link to="/admin/vehicle-ratings" className="footer__legal-link">Editor Portal</Link>
              <Link to="/2026/Chevrolet/Trax?offersVersion=a" className="footer__legal-link">Incentives Version A</Link>
              <Link to="/2026/Chevrolet/Trax?modalVersion=b" className="footer__legal-link">Modal Version B</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
















