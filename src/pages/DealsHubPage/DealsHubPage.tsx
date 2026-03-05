import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { DollarSign, Tag, Car, ChevronRight } from 'lucide-react';
import { getZeroAprDeals, getCurrentPeriod } from '../../services/zeroAprDealsService';
import { getCashDeals, getFinanceDeals } from '../../services/cashFinanceDealsService';
import { getLeaseDeals } from '../../services/leaseDealsService';
import { getAllVehicles } from '../../services/vehicleService';
import { SEO } from '../../components/SEO';
import './DealsHubPage.css';

const DealsHubPage = () => {
  const { month, year } = getCurrentPeriod();

  const dealCounts = useMemo(() => {
    const zeroApr = getZeroAprDeals().length;
    const cash = getCashDeals().length;
    const finance = getFinanceDeals().length;
    const lease = getLeaseDeals().length;
    const allVehicles = getAllVehicles();
    const suvDeals = [...getCashDeals(), ...getFinanceDeals(), ...getZeroAprDeals()].filter(
      (d) => d.vehicle.bodyStyle.toLowerCase() === 'suv'
    ).length;
    const truckDeals = [...getCashDeals(), ...getFinanceDeals(), ...getZeroAprDeals()].filter(
      (d) => d.vehicle.bodyStyle.toLowerCase() === 'truck'
    ).length;
    const total = zeroApr + cash + finance + lease;
    return { zeroApr, cash, finance, lease, suvDeals, truckDeals, total, vehicleCount: allVehicles.length };
  }, []);

  const dealPages = [
    {
      title: '0% APR Deals',
      description: 'Zero-interest financing offers—every dollar of your payment goes toward the car, not interest.',
      href: '/deals/zero-apr',
      count: dealCounts.zeroApr,
      icon: <Tag size={24} />,
      color: 'green',
    },
    {
      title: 'Cash & Finance Deals',
      description: 'Cash-back rebates and special APR financing from manufacturers to reduce your purchase price.',
      href: '/deals/cash-finance',
      count: dealCounts.cash + dealCounts.finance,
      icon: <DollarSign size={24} />,
      color: 'blue',
    },
    {
      title: 'Lease Deals',
      description: 'Monthly lease offers with low due-at-signing costs. Drive a new car for less.',
      href: '/deals/lease',
      count: dealCounts.lease,
      icon: <Car size={24} />,
      color: 'purple',
    },
    {
      title: 'Best SUV Deals',
      description: 'Every current deal on SUVs and crossovers—cash back, financing, and 0% APR offers.',
      href: '/deals/suv',
      count: dealCounts.suvDeals,
      icon: <Car size={24} />,
      color: 'orange',
    },
    {
      title: 'Best Truck Deals',
      description: 'The best incentives on pickup trucks—cash allowances, low APR, and lease specials.',
      href: '/deals/truck',
      count: dealCounts.truckDeals,
      icon: <Car size={24} />,
      color: 'red',
    },
  ];

  return (
    <div className="deals-hub">
      <SEO
        title={`Best New Car Deals for ${month} ${year} | Car and Driver`}
        description={`Find the best new car deals, incentives, and offers for ${month} ${year}. Compare 0% APR financing, cash back, lease specials, and more from Car and Driver.`}
      />

      {/* Hero */}
      <div className="deals-hub__hero">
        <div className="container">
          <div className="deals-hub__hero-content">
            <div className="deals-hub__hero-badge">
              <DollarSign size={16} />
              <span>Car Deals</span>
            </div>
            <h1 className="deals-hub__title">Best New Car Deals for {month} {year}</h1>
            <p className="deals-hub__description">
              We track every manufacturer incentive so you don't have to. Browse 0% APR financing, cash-back
              rebates, special finance rates, and lease deals—all paired with Car and Driver's expert ratings
              to help you find a great car at a great price.
            </p>
            <div className="deals-hub__hero-stats">
              <div className="deals-hub__hero-stat">
                <span className="deals-hub__hero-stat-value">{dealCounts.total}</span>
                <span className="deals-hub__hero-stat-label">Active Deals</span>
              </div>
              <div className="deals-hub__hero-stat">
                <span className="deals-hub__hero-stat-value">5</span>
                <span className="deals-hub__hero-stat-label">Deal Categories</span>
              </div>
              <div className="deals-hub__hero-stat">
                <span className="deals-hub__hero-stat-value">{month.slice(0, 3)}</span>
                <span className="deals-hub__hero-stat-label">{year} Updated</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Deal Categories Grid */}
      <div className="deals-hub__content">
        <div className="container">
          <h2 className="deals-hub__section-title">Browse Deals by Category</h2>
          <div className="deals-hub__grid">
            {dealPages.map((page) => (
              <Link key={page.href} to={page.href} className={`deals-hub__card deals-hub__card--${page.color}`}>
                <div className="deals-hub__card-icon">{page.icon}</div>
                <div className="deals-hub__card-body">
                  <h3 className="deals-hub__card-title">{page.title}</h3>
                  <p className="deals-hub__card-description">{page.description}</p>
                  <div className="deals-hub__card-footer">
                    <span className="deals-hub__card-count">{page.count} deals available</span>
                    <span className="deals-hub__card-cta">
                      View Deals <ChevronRight size={16} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Quick Links */}
          <div className="deals-hub__quick-links">
            <h2 className="deals-hub__section-title">More Resources</h2>
            <div className="deals-hub__links-grid">
              <Link to="/rankings" className="deals-hub__link-card">
                <h3>Expert Rankings</h3>
                <p>Every vehicle rated and ranked by our editors</p>
              </Link>
              <Link to="/whats-my-car-worth" className="deals-hub__link-card">
                <h3>What's My Car Worth?</h3>
                <p>Get an instant trade-in value estimate</p>
              </Link>
              <Link to="/vehicles" className="deals-hub__link-card">
                <h3>Browse All Vehicles</h3>
                <p>Search our complete new and used car database</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DealsHubPage;
