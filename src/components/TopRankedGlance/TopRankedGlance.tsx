import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { getVehiclesByMake } from '../../services/vehicleService';
import { getVehicleOffers } from '../../utils/dealCalculations';
import type { Vehicle } from '../../types/vehicle';
import './TopRankedGlance.css';

interface TopRankedGlanceProps {
  make?: string;
  limit?: number;
  allDealsPath?: string;
}

const formatRating = (rating: number): string => {
  const rounded = Math.round(rating * 10) / 10;
  return `${rounded}/10`;
};

const summarizeOffer = (offer: { type: string; label: string }): string => {
  switch (offer.type) {
    case 'zero-apr':
      return offer.label;
    case 'cash':
      return offer.label;
    case 'finance':
      return offer.label;
    case 'lease':
      return offer.label;
    default:
      return 'Special offer';
  }
};

const toModelSlug = (model: string) => model.toLowerCase().replace(/\s+/g, '-');

const TopRankedGlance = ({
  make = 'Toyota',
  limit = 3,
  allDealsPath,
}: TopRankedGlanceProps) => {
  const items = useMemo(() => {
    const allForMake = getVehiclesByMake(make);

    const latestByModel = new Map<string, Vehicle>();
    for (const v of allForMake) {
      const key = v.model.toLowerCase();
      const current = latestByModel.get(key);
      if (!current || parseInt(v.year, 10) > parseInt(current.year, 10)) {
        latestByModel.set(key, v);
      }
    }

    return Array.from(latestByModel.values())
      .map(vehicle => ({
        vehicle,
        offers: getVehicleOffers(vehicle.make, vehicle.model),
      }))
      .filter(item => item.offers.length > 0)
      .sort((a, b) => {
        const countDiff = b.offers.length - a.offers.length;
        if (countDiff !== 0) return countDiff;
        return b.vehicle.staffRating - a.vehicle.staffRating;
      })
      .slice(0, limit);
  }, [make, limit]);

  if (items.length === 0) return null;

  const resolvedDealsPath = allDealsPath ?? `/${make.toLowerCase()}/deals-incentives`;

  return (
    <section className="top-ranked-glance">
      <div className="top-ranked-glance__header">
        <h2 className="top-ranked-glance__title">
          {make} Deals, Incentives and Special Offers
        </h2>
        <Link to={resolvedDealsPath} className="top-ranked-glance__see-all">
          See all {make} deals
        </Link>
      </div>

      <div className="top-ranked-glance__grid">
        {items.map(({ vehicle, offers }) => {
          const primaryOffer = offers[0];
          const dealsPath = `/${vehicle.make.toLowerCase()}/${toModelSlug(vehicle.model)}/deals-incentives`;

          return (
            <Link
              key={vehicle.id}
              to={dealsPath}
              className="top-ranked-glance__card"
            >
              <div className="top-ranked-glance__card-image">
                <img src={vehicle.image} alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`} />
              </div>

              <div className="top-ranked-glance__card-body">
                <div className="top-ranked-glance__rating">
                  <span className="top-ranked-glance__rating-check" aria-hidden="true">&#10003;</span>
                  <span className="top-ranked-glance__rating-label">C/D RATING:</span>
                  <span className="top-ranked-glance__rating-value">{formatRating(vehicle.staffRating)}</span>
                </div>

                <h3 className="top-ranked-glance__name">
                  {vehicle.year} {vehicle.make} {vehicle.model}
                </h3>

                <div className="top-ranked-glance__offer-row">
                  <span className="top-ranked-glance__offer-text">{summarizeOffer(primaryOffer)}</span>
                </div>

                {offers.length > 1 && (
                  <span className="top-ranked-glance__more-offers">
                    +{offers.length - 1} more offer{offers.length - 1 > 1 ? 's' : ''}
                  </span>
                )}
              </div>
            </Link>
          );
        })}
      </div>

      <div className="top-ranked-glance__footer">
        <Link to={`${resolvedDealsPath}?type=buying`} className="top-ranked-glance__cta">
          {make.toUpperCase()} BUYING DEALS
        </Link>
        <Link to={`${resolvedDealsPath}?type=leasing`} className="top-ranked-glance__cta top-ranked-glance__cta--outline">
          {make.toUpperCase()} LEASING DEALS
        </Link>
      </div>
    </section>
  );
};

export default TopRankedGlance;
