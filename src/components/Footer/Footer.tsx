import { Facebook, Twitter, Instagram, Youtube, Mail } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  const footerLinks = [
    {
      title: 'New Cars',
      links: ['Car Rankings', 'SUV Rankings', 'Truck Rankings', 'Electric Vehicles', 'Compare Cars'],
    },
    {
      title: 'Research',
      links: ['Car Reviews', 'Road Tests', 'Buyer\'s Guide', 'Best Cars Lists', 'Car Finder'],
    },
    {
      title: 'News',
      links: ['Latest News', 'Industry News', 'Future Cars', 'Auto Shows', 'Motorsports'],
    },
    {
      title: 'Company',
      links: ['About Us', 'Advertise', 'Careers', 'Contact', 'Licensing'],
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
                  <button className="footer__newsletter-btn">
                    <Mail size={18} />
                  </button>
                </div>
              </div>
            </div>
            
            {footerLinks.map((section, index) => (
              <div key={index} className="footer__section">
                <h3 className="footer__section-title">{section.title}</h3>
                <ul className="footer__section-links">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a href="#" className="footer__link">{link}</a>
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
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;




