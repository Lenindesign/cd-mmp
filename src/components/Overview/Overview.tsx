import { ThumbsUp, ThumbsDown, ExternalLink } from 'lucide-react';
import './Overview.css';

interface OverviewProps {
  pros: string[];
  cons: string[];
  whatsNew: string[];
  verdict: string;
  year: number;
}

const Overview = ({ pros, cons, whatsNew, verdict, year }: OverviewProps) => {
  return (
    <section className="overview">
      <div className="container">
        <div className="overview__grid">
          {/* Main Content */}
          <div className="overview__main">
            {/* What's New Section */}
            <div className="overview__section">
              <h2 className="overview__section-title">What's New for {year}?</h2>
              <ul className="overview__list overview__list--new">
                {whatsNew.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
            
            {/* Verdict */}
            <div className="overview__section">
              <h2 className="overview__section-title">The Verdict</h2>
              <p className="overview__verdict">{verdict}</p>
            </div>
            
            {/* Pros and Cons */}
            <div className="overview__pros-cons">
              <div className="overview__pros">
                <h3 className="overview__pc-title">
                  <ThumbsUp size={18} />
                  <span>Highs</span>
                </h3>
                <ul className="overview__pc-list">
                  {pros.map((pro, index) => (
                    <li key={index}>{pro}</li>
                  ))}
                </ul>
              </div>
              
              <div className="overview__cons">
                <h3 className="overview__pc-title">
                  <ThumbsDown size={18} />
                  <span>Lows</span>
                </h3>
                <ul className="overview__pc-list">
                  {cons.map((con, index) => (
                    <li key={index}>{con}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          
          {/* Sidebar */}
          <aside className="overview__sidebar">
            <div className="overview__sidebar-card">
              <h3 className="overview__sidebar-title">Quick Links</h3>
              <nav className="overview__sidebar-nav">
                <a href="#pricing" className="overview__sidebar-link">
                  <span>Pricing and Trims</span>
                  <ExternalLink size={14} />
                </a>
                <a href="#specs" className="overview__sidebar-link">
                  <span>Specs & Performance</span>
                  <ExternalLink size={14} />
                </a>
                <a href="#interior" className="overview__sidebar-link">
                  <span>Interior & Cargo</span>
                  <ExternalLink size={14} />
                </a>
                <a href="#safety" className="overview__sidebar-link">
                  <span>Safety Features</span>
                  <ExternalLink size={14} />
                </a>
                <a href="#warranty" className="overview__sidebar-link">
                  <span>Warranty Info</span>
                  <ExternalLink size={14} />
                </a>
              </nav>
            </div>
            
            <div className="overview__sidebar-card overview__sidebar-card--cta">
              <h3 className="overview__sidebar-cta-title">Ready to Buy?</h3>
              <p className="overview__sidebar-cta-text">Find dealers near you with available inventory.</p>
              <button className="overview__sidebar-cta-btn">Search Inventory</button>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default Overview;




