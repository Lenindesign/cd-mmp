import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getVehiclesByMake } from '../../services/vehicleService';
import { getVehicleOffers } from '../../utils/dealCalculations';
import DealCard from '../DealCard/DealCard';
import type { Vehicle } from '../../types/vehicle';
import './ToyotaIncentives.css';

const MAKE = 'Toyota';

const toModelSlug = (model: string) => model.toLowerCase().replace(/\s+/g, '-');

const getDealTypeTag = (offerType: string) => {
  switch (offerType) {
    case 'lease':
      return 'Lease';
    case 'cash':
      return 'Cash';
    case 'finance':
    case 'zero-apr':
      return 'Buy';
    default:
      return 'Special';
  }
};

const mapOfferToPayment = (offer: { type: string; label: string; expires: string }) => {
  if (offer.type === 'lease') {
    return {
      amount: offer.label.match(/\$[\d,]+/)?.[0] ?? offer.label,
      period: '/mo lease',
      savings: { type: 'plain' as const, text: 'Lease special' },
      expirationDate: offer.expires,
    };
  }

  if (offer.type === 'finance' || offer.type === 'zero-apr') {
    const amount = offer.label.match(/^[^\s]+/)?.[0] ?? offer.label;
    const term = offer.label.replace(amount, '').trim();
    return {
      amount,
      period: term || 'Financing',
      savings: { type: 'plain' as const, text: 'Low-rate offer' },
      expirationDate: offer.expires,
    };
  }

  return {
    amount: offer.label,
    period: 'Manufacturer cash',
    savings: { type: 'plain' as const, text: 'Cash back offer' },
    expirationDate: offer.expires,
  };
};

const ToyotaIncentives = () => {
  const navigate = useNavigate();
  const [openOfferSlug, setOpenOfferSlug] = useState<string | null>(null);
  const [savedSlugs, setSavedSlugs] = useState<Record<string, boolean>>({});

  const incentives = useMemo(() => {
    const allToyotas = getVehiclesByMake(MAKE);
    const latestByModel = new Map<string, Vehicle>();

    for (const vehicle of allToyotas) {
      const key = vehicle.model.toLowerCase();
      const current = latestByModel.get(key);
      if (!current || parseInt(vehicle.year, 10) > parseInt(current.year, 10)) {
        latestByModel.set(key, vehicle);
      }
    }

    return Array.from(latestByModel.values())
      .map(vehicle => ({ vehicle, offers: getVehicleOffers(vehicle.make, vehicle.model) }))
      .filter(item => item.offers.length > 0)
      .sort((a, b) => {
        const countDiff = b.offers.length - a.offers.length;
        if (countDiff !== 0) return countDiff;
        return b.vehicle.staffRating - a.vehicle.staffRating;
      })
      .slice(0, 3);
  }, []);

  if (incentives.length === 0) {
    return null;
  }

  return (
    <section className="toyota-incentives">
      <div className="container">
        <div className="toyota-incentives__header">
          <div>
            <h2 className="toyota-incentives__title">Toyota Incentives</h2>
            <p className="toyota-incentives__subtitle">
              Discover the most attractive Toyota offers, including cash back, special APR, and lease deals for top models.
            </p>
          </div>
          <button
            type="button"
            className="toyota-incentives__cta"
            onClick={() => navigate(`/${MAKE.toLowerCase()}/deals-incentives`)}
          >
            View all Toyota deals
          </button>
        </div>

        <div className="toyota-incentives__grid">
          {incentives.map(({ vehicle, offers }) => {
            const primaryOffer = offers[0];
            const payment = mapOfferToPayment(primaryOffer);
            const termLabel = offers
              .find(offer => offer.type === 'finance' || offer.type === 'zero-apr')
              ? `${offers.find(offer => offer.type === 'finance' || offer.type === 'zero-apr')?.label.replace(/^[^\s]+\s*/, '')}`
              : offers.find(offer => offer.type === 'lease')?.label.replace(/\$[\d,]+/, '').trim() ?? 'See details';

            return (
              <DealCard
                key={vehicle.id}
                slug={vehicle.slug}
                vehicleName={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
                vehicleImage={vehicle.image}
                vehicleSlug={vehicle.slug}
                vehicleMake={vehicle.make}
                vehicleModel={vehicle.model}
                rating={vehicle.staffRating}
                dealTypeTag={getDealTypeTag(primaryOffer.type)}
                imageBadge={vehicle.bodyStyle}
                editorsChoice={vehicle.editorsChoice}
                tenBest={vehicle.tenBest}
                isSaved={Boolean(savedSlugs[vehicle.slug])}
                onSaveClick={() => {
                  setSavedSlugs(prev => ({ ...prev, [vehicle.slug]: !prev[vehicle.slug] }));
                }}
                offers={offers}
                offersPopupOpen={openOfferSlug === vehicle.slug}
                onToggleOffersPopup={() => setOpenOfferSlug(prev => (prev === vehicle.slug ? null : vehicle.slug))}
                onCloseOffersPopup={() => setOpenOfferSlug(null)}
                payment={{
                  amount: payment.amount,
                  period: payment.period,
                  savings: payment.savings,
                  expirationDate: payment.expirationDate,
                }}
                details={[
                  { label: 'MSRP RANGE', value: vehicle.priceRange },
                  { label: 'TERM', value: termLabel },
                ]}
                onDealClick={() => navigate(`/${vehicle.make.toLowerCase()}/${toModelSlug(vehicle.model)}/deals-incentives`)}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ToyotaIncentives;
