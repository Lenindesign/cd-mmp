import { Facebook, Twitter, Instagram, Youtube, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../Button';
import './Footer.css';

const Footer = () => {
  const footerLinks = [
    {
      title: 'New Cars',
      links: [
        { label: 'Car Rankings', path: '/rankings' },
        { label: 'SUV Rankings', path: '/rankings' },
        { label: 'Truck Rankings', path: '/rankings' },
        { label: 'Electric Vehicles', path: '/vehicles' },
        { label: 'Compare Cars', path: '/vehicles' },
      ],
    },
    {
      title: 'Research',
      links: [
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
        { label: 'Card Audit', path: '/audit/cards' },
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
              <a href="#" className="footer__legal-link">Privacy Policy</a>
              <a href="#" className="footer__legal-link">Terms of Use</a>
              <a href="#" className="footer__legal-link">Cookie Policy</a>
              <a href="#" className="footer__legal-link">Accessibility</a>
              <Link to="/design-system" className="footer__legal-link">Design System</Link>
              <Link to="/audit/cards" className="footer__legal-link">Card Audit</Link>
              <Link to="/admin/vehicle-ratings" className="footer__legal-link">Editor Portal</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
















