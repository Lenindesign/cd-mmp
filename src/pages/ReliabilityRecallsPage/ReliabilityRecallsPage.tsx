import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, CheckCircle, ChevronRight, ExternalLink, Info, Loader2 } from 'lucide-react';
import { SEO, createBreadcrumbStructuredData } from '../../components/SEO';
import {
  formatComplaintDate,
  formatComplaintMileage,
  formatRecallDate,
  getComplaints,
  getComplaintsSummary,
  getRecalls,
  getReliabilityContext,
  type ComplaintsSummary,
  type NHTSAComplaint,
  type NHTSARecall,
  type ReliabilityContext,
} from '../../services/nhtsaService';
import { getVehicleBySlug, type Vehicle } from '../../services/vehicleService';
import './ReliabilityRecallsPage.css';

interface CategoryGroup<T> {
  category: string;
  items: T[];
}

const formatNhtsaLabel = (value: string | undefined): string => {
  if (!value) return '';

  return value
    .split(',')
    .map((part) => part.trim())
    .filter(Boolean)
    .map((part) => {
      const lower = part.replace(/\s+/g, ' ').toLowerCase();
      return lower.charAt(0).toUpperCase() + lower.slice(1);
    })
    .join(', ');
};

const getPrimaryCategory = (value: string | undefined): string => {
  const category = value
    ?.split(',')
    .map((part) => part.trim())
    .find(Boolean);

  return formatNhtsaLabel(category) || 'Unspecified';
};

const pluralize = (count: number, singular: string, plural = `${singular}s`): string => {
  return `${count} ${count === 1 ? singular : plural}`;
};

const getCategoryAnchor = (prefix: string, category: string): string => {
  const slug = category
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

  return `${prefix}-${slug || 'unspecified'}`;
};

const parseSlashDate = (dateString: string, dayFirst: boolean): number => {
  const match = dateString.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (match) {
    const first = parseInt(match[1], 10);
    const second = parseInt(match[2], 10);
    const year = parseInt(match[3], 10);
    const monthIndex = dayFirst ? second - 1 : first - 1;
    const day = dayFirst ? first : second;

    return new Date(year, monthIndex, day).getTime();
  }

  return new Date(dateString || '').getTime();
};

const compareDateDesc = (dateA: string, dateB: string, dayFirst: boolean): number => {
  const parsedA = parseSlashDate(dateA, dayFirst);
  const parsedB = parseSlashDate(dateB, dayFirst);

  return (Number.isFinite(parsedB) ? parsedB : 0) - (Number.isFinite(parsedA) ? parsedA : 0);
};

const groupByPrimaryCategory = <T,>(
  items: T[],
  getCategory: (item: T) => string,
): CategoryGroup<T>[] => {
  const groups = items.reduce<Record<string, T[]>>((acc, item) => {
    const category = getCategory(item);
    acc[category] = acc[category] || [];
    acc[category].push(item);
    return acc;
  }, {});

  return Object.entries(groups)
    .map(([category, groupedItems]) => ({ category, items: groupedItems }))
    .sort((a, b) => b.items.length - a.items.length || a.category.localeCompare(b.category));
};

const buildNhtsaUrl = (vehicle: Vehicle, suffix = ''): string => {
  const make = encodeURIComponent(vehicle.make);
  const model = encodeURIComponent(vehicle.model);
  return `https://www.nhtsa.gov/vehicle/${vehicle.year}/${make}/${model}${suffix}`;
};

const NHTSA_COMPLAINT_URL = 'https://www.nhtsa.gov/report-a-safety-problem';

const ReliabilityRecallsPage = () => {
  const params = useParams<{ year: string; make: string; model: string }>();
  const slug = `${params.year}/${params.make}/${params.model}`;
  const vehicle = useMemo(() => getVehicleBySlug(slug), [slug]);
  const [recalls, setRecalls] = useState<NHTSARecall[]>([]);
  const [complaints, setComplaints] = useState<NHTSAComplaint[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [vehiclePhotoFailed, setVehiclePhotoFailed] = useState(false);

  useEffect(() => {
    if (!vehicle) return;

    let cancelled = false;
    setIsLoading(true);

    Promise.all([
      getRecalls(vehicle.make, vehicle.model, vehicle.year),
      getComplaints(vehicle.make, vehicle.model, vehicle.year),
    ]).then(([recallRecords, complaintRecords]) => {
      if (cancelled) return;
      setRecalls([...recallRecords].sort((a, b) => compareDateDesc(a.ReportReceivedDate, b.ReportReceivedDate, true)));
      setComplaints([...complaintRecords].sort((a, b) => compareDateDesc(a.dateComplaintFiled, b.dateComplaintFiled, false)));
    }).finally(() => {
      if (!cancelled) {
        setIsLoading(false);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [vehicle]);

  useEffect(() => {
    setVehiclePhotoFailed(false);
  }, [vehicle?.image]);

  const complaintsSummary: ComplaintsSummary = useMemo(() => getComplaintsSummary(complaints), [complaints]);

  const reliabilityContext: ReliabilityContext | null = useMemo(() => {
    if (!vehicle || isLoading) return null;
    return getReliabilityContext(complaintsSummary.totalComplaints, recalls.length, vehicle.bodyStyle, vehicle.make, {
      modelYear: vehicle.year,
      complaintSummary: complaintsSummary,
    });
  }, [vehicle, isLoading, complaintsSummary, recalls.length]);

  const recallGroups = useMemo(
    () => groupByPrimaryCategory(recalls, (recall) => getPrimaryCategory(recall.Component)),
    [recalls],
  );

  const complaintGroups = useMemo(
    () => groupByPrimaryCategory(complaints, (complaint) => getPrimaryCategory(complaint.components)),
    [complaints],
  );

  if (!vehicle) {
    return (
      <div className="reliability-page reliability-page--not-found">
        <div className="container">
          <Link to="/vehicles" className="reliability-page__back-link">
            <ArrowLeft size={18} />
            Browse all vehicles
          </Link>
          <h1>Reliability report not found</h1>
          <p>We could not match this reliability report to a vehicle in the catalog.</p>
        </div>
      </div>
    );
  }

  const vehicleName = `${vehicle.year} ${vehicle.make} ${vehicle.model}`;
  const showVehiclePhoto = Boolean(vehicle.image && !vehiclePhotoFailed);
  const mostMentioned = formatNhtsaLabel(complaintsSummary.topComponents[0]?.component) || 'No pattern yet';
  const nhtsaVehicleUrl = buildNhtsaUrl(vehicle);
  const structuredData = createBreadcrumbStructuredData([
    { name: 'Home', url: '/' },
    { name: vehicle.make, url: `/brands/${vehicle.make.toLowerCase()}` },
    { name: vehicleName, url: `/${vehicle.slug}` },
    { name: 'Reliability & Recalls', url: `/${vehicle.slug}/reliability-recalls` },
  ]);

  return (
    <div className="reliability-page">
      <SEO
        title={`${vehicleName} Reliability & Recalls`}
        description={`NHTSA recall campaigns and owner complaint records for the ${vehicleName}, organized by category.`}
        image={vehicle.image}
        type="article"
        keywords={[vehicle.make, vehicle.model, vehicle.bodyStyle, 'reliability', 'recalls', 'NHTSA complaints']}
        structuredData={structuredData}
      />

      <section className="reliability-page__hero">
        <div className="container">
          <nav className="reliability-page__breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span className="reliability-page__breadcrumb-sep">/</span>
            <Link to={`/${vehicle.slug}`}>{vehicleName}</Link>
            <span className="reliability-page__breadcrumb-sep">/</span>
            <span>Reliability & Recalls</span>
          </nav>
          <div className="reliability-page__hero-content">
            <h1 className="reliability-page__title">{vehicleName} Reliability & Recalls</h1>
            <p className="reliability-page__description">
              NHTSA recall campaigns and owner complaint records for this model year, organized by category so you can scan patterns before you buy.
            </p>
          </div>
        </div>
      </section>

      <nav className="reliability-page__sticky-stats" aria-label="Reliability report sections">
        <div className="container reliability-page__sticky-stats-inner">
          <div className="reliability-page__sticky-stat reliability-page__sticky-stat--score">
            <div className="reliability-page__sticky-stat-label-row">
              <a
                href="#reliability-overview"
                className="reliability-page__sticky-stat-label"
                aria-label="Reliability score, jump to model-year reliability record"
              >
                Reliability score
              </a>
              <span className="reliability-page__score-tooltip">
                <button
                  type="button"
                  className="reliability-page__score-tooltip-trigger"
                  aria-label="How the reliability score is calculated"
                  aria-describedby="reliability-score-tooltip"
                >
                  <Info size={13} aria-hidden="true" />
                </button>
                <span id="reliability-score-tooltip" className="reliability-page__score-tooltip-panel" role="tooltip">
                  Car and Driver converts NHTSA model-year records into a directional 60-100 score. It factors in complaint volume adjusted for vehicle age, recall campaign count, and severity signals like crashes, fires, injuries, or deaths. NHTSA provides the records, not this score.
                </span>
              </span>
            </div>
            <a
              href="#reliability-overview"
              className="reliability-page__sticky-stat-value"
              aria-label={`Reliability score ${reliabilityContext ? reliabilityContext.reliabilityScore : '--'} out of 100, jump to model-year reliability record`}
            >
              <strong>{reliabilityContext ? reliabilityContext.reliabilityScore : '--'}<small>/100</small></strong>
              <em>Based on NHTSA complaints and recalls</em>
            </a>
          </div>
          <a
            href="#complaint-categories"
            className="reliability-page__sticky-stat"
            aria-label={`${isLoading ? '--' : complaintsSummary.totalComplaints} owner reports, jump to complaints by category`}
          >
            <span>Owner reports</span>
            <strong>{isLoading ? '--' : complaintsSummary.totalComplaints}</strong>
            <em>Filed with NHTSA</em>
          </a>
          <a
            href="#recall-categories"
            className="reliability-page__sticky-stat"
            aria-label={`${isLoading ? '--' : recalls.length} recall campaigns, jump to recalls by category`}
          >
            <span>Recall campaigns</span>
            <strong>{isLoading ? '--' : recalls.length}</strong>
            <em>{recalls.length === 1 ? 'Campaign listed' : 'Campaigns listed'}</em>
          </a>
          <a
            href="#complaint-categories"
            className="reliability-page__sticky-stat"
            aria-label={`${mostMentioned} is the most mentioned area, jump to complaints by category`}
          >
            <span>Most mentioned</span>
            <strong>{isLoading ? '--' : mostMentioned}</strong>
            <em>In owner reports</em>
          </a>
        </div>
      </nav>

      <main className="reliability-page__content">
        <div className="container reliability-page__content-inner">
          <section id="reliability-overview" className="reliability-page__overview" aria-label={`${vehicleName} NHTSA overview`}>
            <div className="reliability-page__overview-copy">
              <span className="reliability-page__eyebrow">NHTSA records</span>
              <h2>Model-year reliability record</h2>
              {isLoading ? (
                <p className="reliability-page__loading-line">
                  <Loader2 size={18} className="reliability-page__spinner" />
                  Loading NHTSA records for the {vehicleName}.
                </p>
              ) : (
                <>
                  <p>
                    NHTSA lists {pluralize(complaintsSummary.totalComplaints, 'owner complaint report')} and {pluralize(recalls.length, 'model-year recall campaign')} for the {vehicleName}. {mostMentioned !== 'No pattern yet' ? `${mostMentioned} is the most common owner-reported area.` : 'No single complaint area stands out yet.'}
                  </p>
                  <p>
                    Use these records as a pattern check. A VIN lookup is still the best way to confirm recalls and service history for a specific vehicle.
                  </p>
                </>
              )}
              <div className="reliability-page__source-row">
                <span>Data provided by the National Highway Traffic Safety Administration.</span>
                <a href={nhtsaVehicleUrl} target="_blank" rel="noopener noreferrer">
                  Verify on NHTSA.gov
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>
            <figure className="reliability-page__vehicle-photo">
              {showVehiclePhoto ? (
                <img
                  src={vehicle.image}
                  alt={`${vehicleName}`}
                  loading="eager"
                  decoding="async"
                  onError={() => setVehiclePhotoFailed(true)}
                />
              ) : (
                <div className="reliability-page__vehicle-photo-empty">Vehicle photo unavailable</div>
              )}
            </figure>
          </section>

          <section id="recall-categories" className="reliability-page__section" aria-labelledby="recall-categories-title">
            <div className="reliability-page__section-header">
              <div>
                <span className="reliability-page__eyebrow">Recall campaigns</span>
                <h2 id="recall-categories-title">Recalls by category</h2>
              </div>
              <strong>{isLoading ? '--' : pluralize(recalls.length, 'campaign')}</strong>
            </div>

            {isLoading ? (
              <div className="reliability-page__empty-state">
                <Loader2 size={20} className="reliability-page__spinner" />
                Checking recall campaigns.
              </div>
            ) : recallGroups.length > 0 ? (
              <div className="reliability-page__category-stack">
                {recallGroups.map((group, groupIndex) => (
                  <details
                    key={group.category}
                    id={getCategoryAnchor('recall-category', group.category)}
                    className="reliability-page__category-section"
                    open={groupIndex === 0}
                  >
                    <summary className="reliability-page__category-header">
                      <h3>{group.category}</h3>
                      <span>{pluralize(group.items.length, 'campaign')}</span>
                    </summary>
                    <div className="reliability-page__record-list">
                      {group.items.map((recall) => (
                        <article key={recall.NHTSACampaignNumber} className="reliability-page__record">
                          <div className="reliability-page__record-topline">
                            <span className="reliability-page__record-type">Recall campaign</span>
                            <span>{formatRecallDate(recall.ReportReceivedDate)}</span>
                            <span>NHTSA #{recall.NHTSACampaignNumber}</span>
                          </div>
                          <h4>{formatNhtsaLabel(recall.Component)}</h4>
                          <div className="reliability-page__recall-grid">
                            <div>
                              <span>Summary</span>
                              <p>{recall.Summary || 'No summary returned by NHTSA.'}</p>
                            </div>
                            <div>
                              <span>Consequence</span>
                              <p>{recall.Consequence || 'No consequence returned by NHTSA.'}</p>
                            </div>
                            <div>
                              <span>Remedy</span>
                              <p>{recall.Remedy || 'No remedy returned by NHTSA.'}</p>
                            </div>
                          </div>
                          {recall.Notes && (
                            <p className="reliability-page__record-note">{recall.Notes}</p>
                          )}
                          <a
                            className="reliability-page__record-link"
                            href={`https://www.nhtsa.gov/recalls?nhtsaId=${recall.NHTSACampaignNumber}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View campaign on NHTSA.gov
                            <ExternalLink size={14} />
                          </a>
                        </article>
                      ))}
                    </div>
                  </details>
                ))}
              </div>
            ) : (
              <div className="reliability-page__empty-state reliability-page__empty-state--success">
                <CheckCircle size={20} />
                No model-year recall campaigns are listed here. Run a VIN check to confirm the exact vehicle is clear.
              </div>
            )}
          </section>

          <section id="complaint-categories" className="reliability-page__section" aria-labelledby="complaint-categories-title">
            <div className="reliability-page__section-header">
              <div>
                <span className="reliability-page__eyebrow">Owner reports</span>
                <h2 id="complaint-categories-title">Complaints by category</h2>
              </div>
              <div className="reliability-page__section-actions">
                <strong>{isLoading ? '--' : pluralize(complaintsSummary.totalComplaints, 'report')}</strong>
                <a
                  href={NHTSA_COMPLAINT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="reliability-page__submit-complaint-link"
                  aria-label={`Submit a safety complaint for your ${vehicleName} on NHTSA.gov`}
                >
                  Submit a complaint
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>

            {!isLoading && complaintsSummary.totalComplaints > 0 && (
              <div className="reliability-page__signal-strip">
                <span>{pluralize(complaintsSummary.crashCount, 'crash report')}</span>
                <span>{pluralize(complaintsSummary.fireCount, 'fire report')}</span>
                <span>{pluralize(complaintsSummary.injuryCount, 'reported injury', 'reported injuries')}</span>
                <span>{pluralize(complaintsSummary.deathCount, 'reported death')}</span>
              </div>
            )}

            {isLoading ? (
              <div className="reliability-page__empty-state">
                <Loader2 size={20} className="reliability-page__spinner" />
                Checking owner complaint records.
              </div>
            ) : complaintGroups.length > 0 ? (
              <div className="reliability-page__category-stack">
                {complaintGroups.map((group, groupIndex) => (
                  <details key={group.category} className="reliability-page__category-section" open={groupIndex === 0}>
                    <summary className="reliability-page__category-header">
                      <h3>{group.category}</h3>
                      <span>{pluralize(group.items.length, 'report')}</span>
                    </summary>
                    <div className="reliability-page__complaint-list">
                      {group.items.map((complaint) => {
                        const complaintMileage = formatComplaintMileage(complaint);
                        const reportSignals = [
                          complaint.crash ? 'Crash reported' : '',
                          complaint.fire ? 'Fire reported' : '',
                          complaint.numberOfInjuries > 0 ? `${complaint.numberOfInjuries} injur${complaint.numberOfInjuries === 1 ? 'y' : 'ies'} reported` : '',
                          complaint.numberOfDeaths > 0 ? `${complaint.numberOfDeaths} death${complaint.numberOfDeaths === 1 ? '' : 's'} reported` : '',
                        ].filter(Boolean);

                        return (
                          <article key={complaint.odiNumber} className="reliability-page__complaint">
                            <div className="reliability-page__complaint-meta">
                              <div>
                                <span>Date filed</span>
                                <strong>{formatComplaintDate(complaint.dateComplaintFiled)}</strong>
                              </div>
                              <div>
                                <span>Incident date</span>
                                <strong>{formatComplaintDate(complaint.dateOfIncident)}</strong>
                              </div>
                              {complaintMileage && (
                                <div>
                                  <span>Mileage</span>
                                  <strong>{complaintMileage}</strong>
                                </div>
                              )}
                              <div>
                                <span>NHTSA ODI</span>
                                <strong>#{complaint.odiNumber}</strong>
                              </div>
                            </div>
                            <h4>{formatNhtsaLabel(complaint.components) || group.category}</h4>
                            {reportSignals.length > 0 && (
                              <div className="reliability-page__complaint-flags">
                                {reportSignals.map((signal) => (
                                  <span key={signal}>{signal}</span>
                                ))}
                              </div>
                            )}
                            <p>{complaint.summary || 'No complaint summary returned by NHTSA.'}</p>
                          </article>
                        );
                      })}
                    </div>
                  </details>
                ))}
              </div>
            ) : (
              <div className="reliability-page__empty-state reliability-page__empty-state--success">
                <CheckCircle size={20} />
                No owner complaint reports are listed in this model-year lookup.
              </div>
            )}
          </section>

          <div className="reliability-page__back-row">
            <Link to={`/${vehicle.slug}`} className="reliability-page__back-link">
              <ArrowLeft size={18} />
              Back to {vehicle.make} {vehicle.model}
            </Link>
            <a href={nhtsaVehicleUrl} target="_blank" rel="noopener noreferrer" className="reliability-page__nhtsa-link">
              View all NHTSA records
              <ChevronRight size={16} />
            </a>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ReliabilityRecallsPage;
