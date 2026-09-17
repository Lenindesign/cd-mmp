import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { DealCard } from '../../components/DealCard';
import IncentivesModal from '../../components/IncentivesModal/IncentivesModal';
import type { IncentiveOfferDetail } from '../../components/IncentivesModal/IncentivesModal';
import { SEO } from '../../components/SEO';
import {
  EV_INCENTIVE_TYPE_DESCRIPTIONS,
  EV_INCENTIVE_TYPE_LABELS,
  getEvIncentiveDisplayType,
  getEvIncentives,
  getEvIncentivePresentation,
  type EvIncentive,
  type EvIncentiveDisplayType,
} from '../../services/evIncentivesService';
import type { Incentive } from '../../services/incentiveAdapter';
import { getVehicleBySlug } from '../../services/vehicleService';
import './EvIncentiveCardSamplesPage.css';

const BASE_URL = 'https://www.caranddriver.com';

const sampleTypes: EvIncentiveDisplayType[] = ['vehicle-retirement', 'rebate', 'bill-credit'];

const getSamples = () => sampleTypes.map((type) => (
  getEvIncentives().find((incentive) => getEvIncentiveDisplayType(incentive) === type)
)).filter((incentive): incentive is NonNullable<typeof incentive> => Boolean(incentive));

const EvIncentiveCardSamplesPage = () => {
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set());
  const [activeSample, setActiveSample] = useState<EvIncentive | null>(null);
  const samples = useMemo(getSamples, []);

  const activeOffer: Partial<IncentiveOfferDetail> | undefined = activeSample
    ? (() => {
        const vehicle = getVehicleBySlug(activeSample.vehicleSlug);
        const priceParts = activeSample.msrpRange.replace(/[^0-9,-]/g, '').split('-');
        const displayType = getEvIncentiveDisplayType(activeSample);
        const presentation = getEvIncentivePresentation(activeSample);
        return {
          year: activeSample.year,
          make: activeSample.make,
          model: activeSample.model,
          slug: activeSample.vehicleSlug,
          imageUrl: activeSample.imageUrl || vehicle?.image,
          msrpMin: parseInt(priceParts[0]?.replace(/,/g, '') || '0', 10),
          msrpMax: parseInt(priceParts[1]?.replace(/,/g, '') || '0', 10),
          offerHeadline: presentation?.modalOfferValue ?? activeSample.amountLabel,
          whatItMeans: presentation?.modalWhatIsThisOffer ?? activeSample.description,
          yourSavings: activeSample.purchaseLeaseImpact,
          whoQualifies: activeSample.eligibility,
          eligibleTrims: activeSample.trimNames,
          dontWaitText: presentation?.modalDontWaitText ?? `${activeSample.stackabilityNote} Confirm local availability before you shop.`,
          eventLabel: `EV incentive: ${EV_INCENTIVE_TYPE_LABELS[displayType]} from ${activeSample.providerName}`,
          expirationDate: presentation?.hideExpiration ? '' : activeSample.expirationDate ?? 'Expiration varies by program',
          offerChipLabel: presentation?.modalOfferLabel ?? EV_INCENTIVE_TYPE_LABELS[displayType],
          formHeading: 'Questions About This EV Incentive?',
          defaultLeadMessage: `I would like more information about the ${activeSample.programName} EV incentive for the ${activeSample.year} ${activeSample.make} ${activeSample.model}.`,
          primaryFormCtaLabel: 'ASK ABOUT INCENTIVE',
          secondaryActionLabel: `VIEW ${activeSample.model.toUpperCase()}`,
        };
      })()
    : undefined;

  const activeModalIncentives: Incentive[] | undefined = activeSample
    ? [{
        id: activeSample.id,
        type: 'special',
        title: activeSample.programName,
        description: getEvIncentivePresentation(activeSample)?.modalWhatIsThisOffer ?? activeSample.description,
        value: getEvIncentivePresentation(activeSample)?.modalOfferValue ?? activeSample.amountLabel,
        expirationDate: getEvIncentivePresentation(activeSample)?.hideExpiration ? '' : activeSample.expirationDate ?? 'Expiration varies by program',
        terms: getEvIncentivePresentation(activeSample) ? undefined : activeSample.purchaseLeaseImpact,
        eligibility: activeSample.eligibility,
        programName: activeSample.providerName,
        programDescription: activeSample.description,
        programRules: activeSample.requirement,
        expertTip: activeSample.description,
        groupAffiliation: 'everyone',
      }]
    : undefined;

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
          <span>These are representative records from the current EV incentive data. The card label is sourced from the data’s three consumer-facing incentive types: Vehicle Retirement, Rebate, and Bill Credit.</span>
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
                  onDealClick={(event) => {
                    event.preventDefault();
                    setActiveSample(incentive);
                  }}
                  secondaryCta={{ type: 'link', to: `/${incentive.vehicleSlug}`, label: `View ${incentive.model}` }}
                />
              </article>
            );
          })}
        </section>
      </main>

      <IncentivesModal
        isOpen={!!activeSample}
        onClose={() => setActiveSample(null)}
        variant="conversion-b"
        offer={activeOffer}
        allIncentives={activeModalIncentives}
        selectedIncentiveId={activeSample?.id}
      />
    </div>
  );
};

export default EvIncentiveCardSamplesPage;
