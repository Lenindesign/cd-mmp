import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Percent, BadgeDollarSign, KeyRound, CarFront, Truck } from 'lucide-react';
import { getZeroAprDeals, getCurrentPeriod } from '../../services/zeroAprDealsService';
import { getCashDeals, getFinanceDeals } from '../../services/cashFinanceDealsService';
import { getLeaseDeals } from '../../services/leaseDealsService';
import { SEO } from '../../components/SEO';
import './DealsHubPage.css';

interface MiniDeal {
  vehicleName: string;
  image: string;
  slug: string;
  dealText: string;
  expirationDate: string;
}

const DealsHubPage = () => {
  const { month, year } = getCurrentPeriod();

  const categories = useMemo(() => {
    const zeroAprDeals = getZeroAprDeals();
    const cashDeals = getCashDeals();
    const financeDeals = getFinanceDeals();
    const leaseDeals = getLeaseDeals();

    const allDeals = [...cashDeals.map(d => ({ ...d, bodyStyle: d.vehicle.bodyStyle })), ...financeDeals.map(d => ({ ...d, bodyStyle: d.vehicle.bodyStyle })), ...zeroAprDeals.map(d => ({ ...d, bodyStyle: d.vehicle.bodyStyle }))];

    const suvDeals = allDeals.filter(d => d.bodyStyle.toLowerCase() === 'suv');
    const truckDeals = allDeals.filter(d => d.bodyStyle.toLowerCase() === 'truck');

    const toMiniZeroApr = (deals: typeof zeroAprDeals): MiniDeal[] =>
      deals.slice(0, 3).map(d => ({
        vehicleName: `${d.vehicle.year} ${d.vehicle.make} ${d.vehicle.model}`,
        image: d.vehicle.image,
        slug: d.vehicle.slug,
        dealText: `0% APR for ${d.term}`,
        expirationDate: d.expirationDate,
      }));

    const toMiniCashFinance = (cash: typeof cashDeals, finance: typeof financeDeals): MiniDeal[] => {
      const combined: MiniDeal[] = [
        ...cash.map(d => ({
          vehicleName: `${d.vehicle.year} ${d.vehicle.make} ${d.vehicle.model}`,
          image: d.vehicle.image,
          slug: d.vehicle.slug,
          dealText: `${d.incentiveValue} cash off`,
          expirationDate: d.expirationDate,
        })),
        ...finance.map(d => ({
          vehicleName: `${d.vehicle.year} ${d.vehicle.make} ${d.vehicle.model}`,
          image: d.vehicle.image,
          slug: d.vehicle.slug,
          dealText: `${d.apr} APR for ${d.term}`,
          expirationDate: d.expirationDate,
        })),
      ];
      return combined.slice(0, 3);
    };

    const toMiniLease = (deals: typeof leaseDeals): MiniDeal[] =>
      deals.slice(0, 3).map(d => ({
        vehicleName: `${d.vehicle.year} ${d.vehicle.make} ${d.vehicle.model}`,
        image: d.vehicle.image,
        slug: d.vehicle.slug,
        dealText: `${d.monthlyPayment}/mo lease`,
        expirationDate: d.expirationDate,
      }));

    const toMiniMixed = (deals: typeof allDeals): MiniDeal[] =>
      deals.slice(0, 3).map(d => {
        let dealText = '';
        if ('apr' in d && typeof d.apr === 'number') dealText = `0% APR for ${(d as any).term}`;
        else if ('incentiveValue' in d) dealText = `${(d as any).incentiveValue} cash off`;
        else if ('apr' in d) dealText = `${(d as any).apr} APR`;
        return {
          vehicleName: `${d.vehicle.year} ${d.vehicle.make} ${d.vehicle.model}`,
          image: d.vehicle.image,
          slug: d.vehicle.slug,
          dealText,
          expirationDate: d.expirationDate,
        };
      });

    return [
      {
        title: '0% APR Deals',
        href: '/deals/zero-apr',
        count: zeroAprDeals.length,
        icon: <Percent size={22} strokeWidth={2.2} />,
        deals: toMiniZeroApr(zeroAprDeals),
      },
      {
        title: 'Cash & Finance Deals',
        href: '/deals/cash-finance',
        count: cashDeals.length + financeDeals.length,
        icon: <BadgeDollarSign size={22} strokeWidth={2.2} />,
        deals: toMiniCashFinance(cashDeals, financeDeals),
      },
      {
        title: 'Lease Deals',
        href: '/deals/lease',
        count: leaseDeals.length,
        icon: <KeyRound size={22} strokeWidth={2.2} />,
        deals: toMiniLease(leaseDeals),
      },
      {
        title: 'Best SUV Deals',
        href: '/deals/suv',
        count: suvDeals.length,
        icon: <CarFront size={22} strokeWidth={2.2} />,
        deals: toMiniMixed(suvDeals),
      },
      {
        title: 'Best Truck Deals',
        href: '/deals/truck',
        count: truckDeals.length,
        icon: <Truck size={22} strokeWidth={2.2} />,
        deals: toMiniMixed(truckDeals),
      },
    ];
  }, []);

  return (
    <div className="deals-hub">
      <SEO
        title={`Best New Car Deals for ${month} ${year} | Car and Driver`}
        description={`Find the best new car deals, incentives, and offers for ${month} ${year}. Compare 0% APR financing, cash back, lease specials, and more from Car and Driver.`}
      />

      <div className="deals-hub__hero">
        <div className="container">
          <div className="deals-hub__hero-content">
            <div className="deals-hub__hero-badge">
              <BadgeDollarSign size={16} />
              <span>Car Deals</span>
            </div>
            <h1 className="deals-hub__title">Best New Car Deals for {month} {year}</h1>
            <p className="deals-hub__description">
              We track every manufacturer incentive so you don't have to. Browse 0% APR financing, cash-back
              rebates, special finance rates, and lease deals—all paired with Car and Driver's expert ratings
              to help you find a great car at a great price.
            </p>
          </div>
        </div>
      </div>

      <div className="deals-hub__content">
        <div className="container">
          <div className="deals-hub__categories">
            {categories.map((cat) => (
              <div key={cat.href} className="deals-hub__row">
                <div className="deals-hub__row-left">
                  <div className="deals-hub__row-icon">{cat.icon}</div>
                  <h2 className="deals-hub__row-title">{cat.title}</h2>
                  <span className="deals-hub__row-count">{cat.count} deals</span>
                  <Link to={cat.href} className="deals-hub__row-cta">
                    View All <ChevronRight size={16} />
                  </Link>
                </div>
                <div className="deals-hub__row-cards">
                  {cat.deals.map((deal, i) => (
                    <Link key={i} to={`/${deal.slug}`} className="deals-hub__mini-card">
                      <div className="deals-hub__mini-card-image">
                        <img src={deal.image} alt={deal.vehicleName} />
                      </div>
                      <h3 className="deals-hub__mini-card-name">{deal.vehicleName}</h3>
                      <div className="deals-hub__mini-card-deal">
                        <div className="deals-hub__mini-card-deal-icon">{cat.icon}</div>
                        <div className="deals-hub__mini-card-deal-info">
                          <span className="deals-hub__mini-card-deal-text">{deal.dealText}</span>
                          <span className="deals-hub__mini-card-deal-expires">expires {deal.expirationDate}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

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
