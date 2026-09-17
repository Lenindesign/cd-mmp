import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { DealCard } from '../../components/DealCard';
import { SEO } from '../../components/SEO';
import {
  EV_INCENTIVE_DISPLAY_TYPE_ORDER,
  EV_INCENTIVE_TYPE_DESCRIPTIONS,
  EV_INCENTIVE_TYPE_LABELS,
  getEvIncentiveDisplayType,
  getEvIncentives,
  getEvIncentivePresentation,
  type EvIncentive,
  type EvIncentiveDisplayType,
} from '../../services/evIncentivesService';
import { getVehicleBySlug } from '../../services/vehicleService';
import './EvIncentiveCardSamplesPage.css';

const BASE_URL = 'https://www.caranddriver.com';

const sampleTypes: EvIncentiveDisplayType[] = EV_INCENTIVE_DISPLAY_TYPE_ORDER;

const createCuratorSample = (type: 'tax-credit' | 'tax-exemption'): EvIncentive => ({
  id: `curator-sample-${type}`,
  year: 2026,
  make: 'Audi',
  model: 'e-tron GT',
  trimNames: [],
  bodyStyle: 'Sedan',
  msrpRange: '$129,095 - $171,895',
  fuelType: 'Electric',
  imageUrl: null,
  programName: type === 'tax-credit' ? 'Clean Vehicle Tax Credit' : 'State EV Tax Exemption',
  description: EV_INCENTIVE_TYPE_DESCRIPTIONS[type],
  category: type,
  offerType: EV_INCENTIVE_TYPE_LABELS[type],
  amountLabel: type === 'tax-credit' ? 'Up to $7,500' : 'Varies by jurisdiction',
  providerName: type === 'tax-credit' ? 'Federal' : 'State program',
  providerType: type === 'tax-credit' ? 'federal' : 'state',
  requirement: type === 'tax-credit' ? 'Tax filing' : 'Eligible vehicle purchase',
  eligibility: 'Eligibility varies by program',
  purchaseLeaseImpact: 'May reduce taxes owed',
  stackabilityNote: 'Review current program rules',
  sourceLabel: 'Curator sample',
  locationLabel: 'United States',
  vehicleSlug: '2026/Audi/e-tron-GT',
});

const getSamples = () => sampleTypes.map((type) => (
  getEvIncentives().find((incentive) => getEvIncentiveDisplayType(incentive) === type)
    ?? (type === 'tax-credit' || type === 'tax-exemption' ? createCuratorSample(type) : null)
)).filter((incentive): incentive is EvIncentive => Boolean(incentive));

const EvIncentiveCardSamplesPage = () => {
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set());
  const samples = useMemo(getSamples, []);

  return (
    <div className="ev-samples-page">
      <SEO
        title="EV Incentive Card Samples"
        description="A curator page showing one representative card for each EV incentive type."
        canonical={`${BASE_URL}/ev-incentive-card-samples`}
        noIndex
      />
      <header className="ev-samples-page__hero">
        <div className="container">
          <Link to="/deals/ev-incentives" className="ev-samples-page__back-link">← Back to EV incentives</Link>
          <p className="ev-samples-page__eyebrow">Curation workspace</p>
          <h1>EV incentive card samples</h1>
          <p>
            One representative card for each incentive type. Use this page to review hierarchy, labels, and content before curating the production experience.
          </p>
        </div>
      </header>

      <main className="container ev-samples-page__content">
        <div className="ev-samples-page__notice">
          <strong>How to read this page</strong>
          <span>These are representative records from the current EV incentive data. Program-level financing and bill-credit offers are shown once here; tax-credit and tax-exemption cards are curator samples because the current source has no records for those types.</span>
        </div>

        <section className="ev-samples-page__grid" aria-label="EV incentive card samples">
          {samples.map((incentive) => {
            const vehicle = getVehicleBySlug(incentive.vehicleSlug);
            const displayType = getEvIncentiveDisplayType(incentive);
            const presentation = getEvIncentivePresentation(incentive);
            const typeLabel = displayType === 'financing' ? 'Charging Financing' : EV_INCENTIVE_TYPE_LABELS[displayType];
            const isSaved = savedIds.has(incentive.id);

            return (
              <article key={incentive.id} className="ev-samples-page__sample">
                <div className="ev-samples-page__sample-label">
                  <span>{typeLabel}</span>
                  <p>{EV_INCENTIVE_TYPE_DESCRIPTIONS[displayType]}</p>
                </div>
                <DealCard
                  slug={incentive.id}
                  vehicleName={`${incentive.year} ${incentive.make} ${incentive.model}`}
                  vehicleImage={incentive.imageUrl || vehicle?.image || ''}
                  vehicleSlug={incentive.vehicleSlug}
                  vehicleMake={incentive.make}
                  vehicleModel={incentive.model}
                  rating={vehicle?.staffRating ?? null}
                  dealTypeTag="EV"
                  imageBadge={presentation?.cardTagLabel ?? typeLabel}
                  imageBadgeTooltip={presentation?.cardTagTooltip ?? EV_INCENTIVE_TYPE_DESCRIPTIONS[displayType]}
                  editorsChoice={vehicle?.editorsChoice}
                  tenBest={vehicle?.tenBest}
                  isSaved={isSaved}
                  onSaveClick={(event) => {
                    event.preventDefault();
                    setSavedIds((current) => {
                      const next = new Set(current);
                      if (next.has(incentive.id)) next.delete(incentive.id);
                      else next.add(incentive.id);
                      return next;
                    });
                  }}
                  offers={[]}
                  offersPopupOpen={false}
                  onToggleOffersPopup={(event) => event.preventDefault()}
                  onCloseOffersPopup={(event) => event.preventDefault()}
                  payment={{
                    amount: presentation?.cardOfferAmount ?? (displayType === 'financing' ? 'Charging Financing' : incentive.amountLabel),
                    period: presentation?.cardOfferSuffix ?? '',
                    subLabel: presentation?.cardProgramLabel ?? incentive.programName,
                    expirationDate: incentive.expirationDate ?? '',
                    hideExpiration: true,
                  }}
                  details={presentation ? [
                    { label: 'MSRP Range', value: incentive.msrpRange },
                    { label: 'Support For', value: presentation.cardSupportLabel },
                  ] : [
                    { label: 'Source', value: incentive.providerName },
                    { label: 'Applies To', value: incentive.requirement },
                  ]}
                  onDealClick={(event) => event.preventDefault()}
                  secondaryCta={{ type: 'link', to: `/${incentive.vehicleSlug}`, label: `View ${incentive.model}` }}
                />
              </article>
            );
          })}
        </section>
      </main>
    </div>
  );
};

export default EvIncentiveCardSamplesPage;
