import { useLayoutEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { getVehiclesByMake } from '../../services/vehicleService';
import { getVehicleOffers } from '../../utils/dealCalculations';
import type { Vehicle } from '../../types/vehicle';
import { CD_VERIFIED_ICON_URL } from '../../constants/badges';
import './TopRankedGlance.css';

interface TopRankedGlanceProps {
  make?: string;
  limit?: number;
  allDealsPath?: string;
  title?: string;
  seeAllLabel?: string;
  seeAllPath?: string;
  primaryCtaLabel?: string;
  primaryCtaPath?: string;
  rankingItems?: Array<{
    id: string;
    rank: number;
    name: string;
    year: string;
    image: string;
    rating: number;
    priceRange: string;
    slug: string;
    shopLabel?: string;
    /** OEM; used to shorten glance titles when the full line does not fit */
    make?: string;
    /** Model without make; shown with year when full title overflows one line */
    modelName?: string;
  }>;
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
      return 'Special deal';
  }
};

const toModelSlug = (model: string) => model.toLowerCase().replace(/\s+/g, '-');

const CdRatingVerifiedIcon = () => (
  <span className="top-ranked-glance__rating-check" aria-hidden="true">
    <img
      src={CD_VERIFIED_ICON_URL}
      alt=""
      width={16}
      height={16}
      className="top-ranked-glance__rating-check-icon"
      loading="lazy"
      decoding="async"
    />
  </span>
);

const rankingGlanceCompactTitle = (
  year: string,
  name: string,
  make?: string,
  modelName?: string,
): string | null => {
  if (modelName?.trim()) return `${year} ${modelName.trim()}`;
  if (make?.trim()) {
    const m = make.trim();
    if (name.toLowerCase().startsWith(`${m.toLowerCase()} `)) {
      return `${year} ${name.slice(m.length).trim()}`;
    }
  }
  return null;
};

const TopRankedGlanceRankingVehicleTitle = ({
  vehiclePath,
  year,
  name,
  make,
  modelName,
}: {
  vehiclePath: string;
  year: string;
  name: string;
  make?: string;
  modelName?: string;
}) => {
  const fullTitle = `${year} ${name}`;
  const compactTitle = rankingGlanceCompactTitle(year, name, make, modelName);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const measureRef = useRef<HTMLSpanElement>(null);
  const [useCompact, setUseCompact] = useState(false);

  useLayoutEffect(() => {
    if (!compactTitle || compactTitle === fullTitle) {
      setUseCompact(false);
      return;
    }

    const measure = () => {
      const heading = headingRef.current;
      const span = measureRef.current;
      if (!heading || !span) return;
      span.textContent = fullTitle;
      const available = heading.clientWidth;
      const needed = span.offsetWidth;
      setUseCompact(needed > available + 0.5);
    };

    measure();
    const ro = new ResizeObserver(measure);
    const heading = headingRef.current;
    if (heading) ro.observe(heading);
    return () => ro.disconnect();
  }, [compactTitle, fullTitle]);

  const displayTitle = useCompact && compactTitle ? compactTitle : fullTitle;

  return (
    <h3 ref={headingRef} className="top-ranked-glance__name">
      <span
        ref={measureRef}
        className="top-ranked-glance__name-measure"
        aria-hidden="true"
      />
      <Link to={vehiclePath} aria-label={fullTitle}>
        {displayTitle}
      </Link>
    </h3>
  );
};

const TopRankedGlance = ({
  make = 'Toyota',
  limit = 3,
  allDealsPath,
  title,
  seeAllLabel,
  seeAllPath,
  primaryCtaLabel,
  primaryCtaPath,
  rankingItems,
}: TopRankedGlanceProps) => {
  const dealItems = useMemo(() => {
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

  if (rankingItems?.length) {
    const resolvedSeeAllPath = seeAllPath ?? '#rankings-full-list';
    const resolvedCtaPath = primaryCtaPath ?? resolvedSeeAllPath;

    return (
      <section className="top-ranked-glance top-ranked-glance--rankings">
        <div className="top-ranked-glance__header">
          <h2 className="top-ranked-glance__title">
            {title ?? 'Top Ranked Vehicles at a Glance'}
          </h2>
          <Link to={resolvedSeeAllPath} className="top-ranked-glance__see-all">
            {seeAllLabel ?? 'See full list'}
          </Link>
        </div>

        <div className="top-ranked-glance__grid">
          {rankingItems.map((vehicle) => {
            const vehiclePath = `/${vehicle.slug}`;
            const vehicleName = `${vehicle.year} ${vehicle.name}`;

            return (
              <article key={vehicle.id} className="top-ranked-glance__card">
                <Link to={vehiclePath} className="top-ranked-glance__card-image" aria-label={`Read more about ${vehicleName}`}>
                  <span className="top-ranked-glance__rank-badge" aria-label={`Rank ${vehicle.rank}`}>
                    {vehicle.rank}
                  </span>
                  <img src={vehicle.image} alt={vehicleName} />
                </Link>

                <div className="top-ranked-glance__card-body">
                  <div className="top-ranked-glance__rating">
                    <CdRatingVerifiedIcon />
                    <span className="top-ranked-glance__rating-label">C/D RATING:</span>
                    <span className="top-ranked-glance__rating-value">{formatRating(vehicle.rating)}</span>
                  </div>

                  <TopRankedGlanceRankingVehicleTitle
                    vehiclePath={vehiclePath}
                    year={vehicle.year}
                    name={vehicle.name}
                    make={vehicle.make}
                    modelName={vehicle.modelName}
                  />

                  <div className="top-ranked-glance__offer-row">
                    <span className="top-ranked-glance__price-range">{vehicle.priceRange}</span>
                    <Link to={vehiclePath} className="top-ranked-glance__shop-now">
                      {vehicle.shopLabel ?? 'Shop Now'}
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {primaryCtaLabel && (
          <div className="top-ranked-glance__footer">
            <Link to={resolvedCtaPath} className="top-ranked-glance__cta">
              {primaryCtaLabel}
            </Link>
          </div>
        )}
      </section>
    );
  }

  if (dealItems.length === 0) return null;

  const resolvedDealsPath = allDealsPath ?? `/${make.toLowerCase()}/deals-incentives`;

  return (
    <section className="top-ranked-glance">
      <div className="top-ranked-glance__header">
        <h2 className="top-ranked-glance__title">
          {make} Deals and Incentives
        </h2>
        <Link to={resolvedDealsPath} className="top-ranked-glance__see-all">
          See all {make} deals
        </Link>
      </div>

      <div className="top-ranked-glance__grid">
        {dealItems.map(({ vehicle, offers }) => {
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
                  <CdRatingVerifiedIcon />
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
                    +{offers.length - 1} more deal{offers.length - 1 > 1 ? 's' : ''}
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
