import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { getLeaseDeals } from '../../services/leaseDealsService';
import LeaseByMakePage from '../LeaseByMakePage/LeaseByMakePage';
import LeaseByBodyStylePage from '../LeaseByBodyStylePage/LeaseByBodyStylePage';
import LeaseByFuelTypePage, { KNOWN_FUEL_TYPES } from '../LeaseByFuelTypePage/LeaseByFuelTypePage';

type Category = 'bodyStyle' | 'fuelType' | 'make';

/**
 * Routes `/deals/lease/:slug` to the right page based on what the slug matches
 * in the lease dataset:
 *   - known body style (e.g. "suv", "truck", "sports-car") → body-style page
 *   - known fuel type  (e.g. "gas", "electric", "plug-in-hybrid") → fuel-type page
 *   - anything else → make page (falls back to empty state for unknown slugs)
 */
const LeaseCategoryDispatcher = () => {
  const { slug } = useParams<{ slug: string }>();

  const category = useMemo<Category>(() => {
    if (!slug) return 'make';
    const target = slug.toLowerCase().replace(/-/g, ' ');
    const deals = getLeaseDeals();

    if (deals.some((d) => d.vehicle.bodyStyle.toLowerCase() === target)) return 'bodyStyle';

    const fuelMatchesData = deals.some((d) => d.vehicle.fuelType.toLowerCase() === target);
    const fuelMatchesKnown = KNOWN_FUEL_TYPES.some((f) => f.toLowerCase() === target);
    if (fuelMatchesData || fuelMatchesKnown) return 'fuelType';

    return 'make';
  }, [slug]);

  if (category === 'bodyStyle') return <LeaseByBodyStylePage />;
  if (category === 'fuelType') return <LeaseByFuelTypePage />;
  return <LeaseByMakePage />;
};

export default LeaseCategoryDispatcher;
