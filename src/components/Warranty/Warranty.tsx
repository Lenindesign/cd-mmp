import { useState, useEffect, useMemo, useRef, type ReactNode, type TouchEvent } from 'react';
import { AlertTriangle, CheckCircle, ChevronDown, ChevronLeft, ChevronRight, ChevronUp, ExternalLink, Loader2, MessageSquareWarning, Flame, Car, Users, TrendingDown, TrendingUp, Minus, Info, Star, ShieldCheck, Camera, X } from 'lucide-react';
import { 
  getRecalls, 
  getComplaints,
  getComplaintsSummary,
  getReliabilityContext,
  getSafetyRatings,
  getVehicleSafetyRatings,
  parseStarRating,
  formatRecallDate, 
  formatComplaintDate,
  getRecallSeverity, 
  type NHTSARecall,
  type NHTSAComplaint,
  type NHTSASafetyRating,
  type ComplaintsSummary
} from '../../services/nhtsaService';
import CrashTestModal from './CrashTestModal';
import './Warranty.css';

export interface WarrantyItem {
  icon: React.ReactNode;
  title: string;
  coverage: string;
  description: string;
}

interface AsyncData<T> {
  key: string;
  data: T | null;
}

interface WarrantyProps {
  items: WarrantyItem[];
  title?: string;
  make?: string;
  model?: string;
  year?: number | string;
  bodyStyle?: string;
  drivetrain?: string;
  nhtsaSafetyVehicleId?: number;
  vehicleImage?: string;
  vehicleImageAlt?: string;
  variant?: 'warranty-safety' | 'vehicle-reliability';
}

const Warranty = ({ 
  items, 
  title = "Warranty & Safety", 
  make,
  model,
  year,
  bodyStyle = 'SUV',
  drivetrain,
  nhtsaSafetyVehicleId,
  vehicleImage,
  vehicleImageAlt,
  variant = 'warranty-safety',
}: WarrantyProps) => {
  const isVehicleReliabilityVariant = variant === 'vehicle-reliability';
  const vehicleKey = make && model && year ? `${year}|${make}|${model}|${nhtsaSafetyVehicleId || 'lookup'}` : '';
  const vehicleName = make && model && year ? `${year} ${make} ${model}` : 'this vehicle';
  const vehiclePhotoSrc = vehicleImage?.trim() || '';
  const vehiclePhotoAlt = vehicleImageAlt?.trim() || `${vehicleName} photo`;
  const [recallsState, setRecallsState] = useState<AsyncData<NHTSARecall[]>>({ key: '', data: null });
  const [complaintsState, setComplaintsState] = useState<AsyncData<ComplaintsSummary>>({ key: '', data: null });
  const [safetyState, setSafetyState] = useState<AsyncData<NHTSASafetyRating>>({ key: '', data: null });
  const [expandedRecall, setExpandedRecall] = useState<string | null>(null);
  const [expandedComplaint, setExpandedComplaint] = useState<number | null>(null);
  const [selectedComplaintIndex, setSelectedComplaintIndex] = useState<number | null>(null);
  const [activeReliabilityDetail, setActiveReliabilityDetail] = useState<'recalls' | 'complaints' | null>(null);
  const [vehiclePhotoFailed, setVehiclePhotoFailed] = useState(false);
  const [showAllRecalls, setShowAllRecalls] = useState(false);
  const [isCrashTestModalOpen, setIsCrashTestModalOpen] = useState(false);
  const complaintTouchStartRef = useRef<{ x: number; y: number } | null>(null);

  const recalls = recallsState.key === vehicleKey ? recallsState.data || [] : [];
  const complaintsSummary = complaintsState.key === vehicleKey ? complaintsState.data : null;
  const safetyRatings = safetyState.key === vehicleKey ? safetyState.data : null;
  const complaintReports = complaintsSummary?.complaints || complaintsSummary?.recentComplaints || [];
  const selectedComplaint = selectedComplaintIndex !== null ? complaintReports[selectedComplaintIndex] : null;
  const selectedComplaintPosition = selectedComplaintIndex !== null ? selectedComplaintIndex + 1 : 0;
  const complaintReportCount = complaintReports.length;
  const isLoadingRecalls = Boolean(vehicleKey && recallsState.key !== vehicleKey);
  const isLoadingComplaints = Boolean(vehicleKey && complaintsState.key !== vehicleKey);
  const isLoadingSafety = Boolean(vehicleKey && safetyState.key !== vehicleKey);
  const showVehiclePhoto = Boolean(vehiclePhotoSrc && !vehiclePhotoFailed);

  // Fetch recalls, complaints, and safety ratings when vehicle info is available
  useEffect(() => {
    if (!make || !model || !year || !vehicleKey) return;
    let cancelled = false;

    getRecalls(make, model, year).then(data => {
      if (!cancelled) {
        setRecallsState({ key: vehicleKey, data });
      }
    });

    getComplaints(make, model, year).then(data => {
      if (!cancelled) {
        setComplaintsState({ key: vehicleKey, data: getComplaintsSummary(data) });
      }
    });

    const safetyRequest = nhtsaSafetyVehicleId
      ? getSafetyRatings(nhtsaSafetyVehicleId)
      : getVehicleSafetyRatings(make, model, year, drivetrain);

    safetyRequest.then(data => {
      if (!cancelled) {
        setSafetyState({ key: vehicleKey, data });
      }
    });

    return () => {
      cancelled = true;
    };
  }, [make, model, year, vehicleKey, nhtsaSafetyVehicleId, drivetrain]);

  useEffect(() => {
    setVehiclePhotoFailed(false);
  }, [vehiclePhotoSrc]);

  useEffect(() => {
    if (selectedComplaintIndex !== null && selectedComplaintIndex >= complaintReportCount) {
      setSelectedComplaintIndex(complaintReportCount ? complaintReportCount - 1 : null);
    }
  }, [selectedComplaintIndex, complaintReportCount]);

  useEffect(() => {
    if (selectedComplaintIndex === null) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedComplaintIndex(null);
        return;
      }

      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        setSelectedComplaintIndex(current => current === null ? current : Math.max(0, current - 1));
        return;
      }

      if (event.key === 'ArrowRight') {
        event.preventDefault();
        setSelectedComplaintIndex(current => current === null ? current : Math.min(complaintReportCount - 1, current + 1));
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedComplaintIndex, complaintReportCount]);

  const reliabilityContext = useMemo(() => {
    if (!isLoadingRecalls && !isLoadingComplaints && make) {
      const complaintCount = complaintsSummary?.totalComplaints || 0;
      const recallCount = recalls.length;
      return getReliabilityContext(complaintCount, recallCount, bodyStyle, make);
    }
    return null;
  }, [isLoadingRecalls, isLoadingComplaints, complaintsSummary, recalls.length, bodyStyle, make]);

  const toggleRecall = (campaignNumber: string) => {
    setExpandedRecall(prev => prev === campaignNumber ? null : campaignNumber);
  };

  const toggleComplaint = (odiNumber: number) => {
    setExpandedComplaint(prev => prev === odiNumber ? null : odiNumber);
  };

  const openComplaintReport = (complaint: NHTSAComplaint) => {
    const complaintIndex = complaintReports.findIndex(report => report.odiNumber === complaint.odiNumber);
    setSelectedComplaintIndex(complaintIndex >= 0 ? complaintIndex : 0);
  };

  const closeComplaintReport = () => {
    setSelectedComplaintIndex(null);
  };

  const showPreviousComplaint = () => {
    setSelectedComplaintIndex(current => current === null ? current : Math.max(0, current - 1));
  };

  const showNextComplaint = () => {
    setSelectedComplaintIndex(current => current === null ? current : Math.min(complaintReportCount - 1, current + 1));
  };

  const handleComplaintTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    const touch = event.touches[0];
    complaintTouchStartRef.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleComplaintTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    const start = complaintTouchStartRef.current;
    complaintTouchStartRef.current = null;
    if (!start) return;

    const touch = event.changedTouches[0];
    const deltaX = touch.clientX - start.x;
    const deltaY = touch.clientY - start.y;

    if (Math.abs(deltaX) < 48 || Math.abs(deltaX) < Math.abs(deltaY)) return;

    if (deltaX < 0) {
      showNextComplaint();
    } else {
      showPreviousComplaint();
    }
  };

  const toggleReliabilityDetail = (detail: 'recalls' | 'complaints') => {
    setActiveReliabilityDetail(prev => prev === detail ? null : detail);
  };

  const displayedRecalls = showAllRecalls ? recalls : recalls.slice(0, 3);
  const hasRecalls = recalls.length > 0;
  const isLoading = isVehicleReliabilityVariant
    ? isLoadingRecalls || isLoadingComplaints
    : isLoadingRecalls || isLoadingComplaints || isLoadingSafety;

  // Render star rating
  const renderStars = (rating: string | undefined, size: number = 18) => {
    const stars = parseStarRating(rating || '');
    if (stars === null) return <span className="warranty__safety-not-rated">Not Rated</span>;
    
    return (
      <div className="warranty__safety-stars">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            size={size}
            className={i <= stars ? 'warranty__safety-star--filled' : 'warranty__safety-star--empty'}
            fill={i <= stars ? 'currentColor' : 'none'}
          />
        ))}
      </div>
    );
  };

  // Get overall safety rating text
  const getOverallSafetyText = (rating: string | undefined) => {
    const stars = parseStarRating(rating || '');
    if (stars === null) return 'Not Tested';
    if (stars === 5) return 'Excellent';
    if (stars === 4) return 'Good';
    if (stars === 3) return 'Acceptable';
    if (stars === 2) return 'Marginal';
    return 'Poor';
  };

  // Check if crash test images are available
  const hasCrashTestImages = safetyRatings && (
    safetyRatings.FrontCrashPicture || 
    safetyRatings.SideCrashPicture || 
    safetyRatings.SidePolePicture
  );

  // Get rating color class
  const getRatingColorClass = (rating: string) => {
    switch (rating) {
      case 'excellent': return 'warranty__rating--excellent';
      case 'good': return 'warranty__rating--good';
      case 'average': return 'warranty__rating--average';
      case 'below-average': return 'warranty__rating--below-average';
      case 'poor': return 'warranty__rating--poor';
      default: return '';
    }
  };

  const formatRatingLabel = (rating: string) => {
    return rating.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const getComparisonLabel = (comparison: 'below' | 'average' | 'above') => {
    if (comparison === 'below') return 'Below segment avg';
    if (comparison === 'above') return 'Above segment avg';
    return 'Near segment avg';
  };

  const getSafetySummary = () => {
    if (isLoadingSafety) return 'Crash-test ratings are loading.';
    if (!safetyRatings) return 'NHTSA has not published crash-test data for this vehicle yet.';
    const stars = parseStarRating(safetyRatings.OverallRating);
    if (stars === null) return 'NHTSA has not completed an overall crash-test rating for this vehicle yet.';
    return `NHTSA reports a ${stars}-star overall crash-test rating.`;
  };

  const getSafetyBadge = () => {
    const stars = parseStarRating(safetyRatings?.OverallRating || '');
    if (stars === null) {
      return {
        label: 'Pending',
        className: 'warranty__safety-badge--pending',
      };
    }
    return {
      label: `${stars} ★`,
      className: stars === 5
        ? 'warranty__safety-badge--excellent'
        : stars === 4
          ? 'warranty__safety-badge--good'
          : 'warranty__safety-badge--average',
    };
  };

  const formatSummaryCopy = (summary: string) => {
    return summary.replace(/\bsuvs\b/g, 'SUVs');
  };

  const formatNhtsaLabel = (value: string | undefined) => {
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

  const formatNhtsaVehicleLabel = (value: string | undefined) => {
    if (!value) return '';
    const acronyms = new Set(['AWD', 'EV', 'FWD', 'PHEV', 'RWD', 'SUV']);

    return value
      .replace(/\s+/g, ' ')
      .trim()
      .split(' ')
      .map((word) => {
        const upper = word.toUpperCase();
        if (acronyms.has(upper) || /^\d{4}$/.test(word)) return upper;
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      })
      .join(' ');
  };

  const getReliabilitySignalSummary = () => {
    if (isLoadingRecalls || isLoadingComplaints) {
      return `Checking NHTSA complaint and recall records for the ${vehicleName}.`;
    }

    const complaintCount = complaintsSummary?.totalComplaints || 0;
    const recallCount = recalls.length;
    const topIssue = formatNhtsaLabel(complaintsSummary?.topComponents[0]?.component);
    const issueCopy = topIssue ? ` ${topIssue} is the most common area.` : '';
    const recallCopy = recallCount === 0
      ? 'No model-year recall campaigns are listed.'
      : `${recallCount} model-year recall campaign${recallCount === 1 ? ' is' : 's are'} listed.`;

    return `NHTSA lists ${complaintCount} owner complaint report${complaintCount === 1 ? '' : 's'} for the ${vehicleName}. ${recallCopy}${issueCopy}`;
  };

  const getRecallSummaryCopy = () => {
    if (isLoadingRecalls) {
      return 'Checking NHTSA recall campaigns.';
    }

    if (!hasRecalls) {
      return 'No model-year recall campaigns are listed here. Run a VIN check to confirm the exact car is clear.';
    }

    return `${recalls.length} model-year recall campaign${recalls.length === 1 ? '' : 's'} appear here. Review the remedy details and confirm completed repairs by VIN.`;
  };

  const getComplaintSummaryCopy = () => {
    if (isLoadingComplaints) {
      return 'Checking owner complaints.';
    }

    const totalComplaints = complaintsSummary?.totalComplaints || 0;
    if (totalComplaints === 0) {
      return 'No owner complaint records appear in this model-year lookup.';
    }

    const topIssue = formatNhtsaLabel(complaintsSummary?.topComponents[0]?.component);
    return topIssue
      ? `${totalComplaints} owner complaint report${totalComplaints === 1 ? '' : 's'} appear in NHTSA records. Most mention ${topIssue}.`
      : `${totalComplaints} owner complaint report${totalComplaints === 1 ? '' : 's'} appear in NHTSA records.`;
  };

  const getTopIssueLabel = () => {
    const topIssue = formatNhtsaLabel(complaintsSummary?.topComponents[0]?.component);
    if (!topIssue) return 'No pattern yet';
    return topIssue.replace(/\//g, ' / ');
  };

  const nhtsaMatchedVehicle = safetyRatings?.VehicleDescription;

  // Get comparison icon
  const getComparisonIcon = (comparison: 'below' | 'average' | 'above') => {
    switch (comparison) {
      case 'below': return <TrendingDown size={14} />;
      case 'above': return <TrendingUp size={14} />;
      default: return <Minus size={14} />;
    }
  };

  const ReliabilityPanel = ({
    detail,
    children,
  }: {
    detail: 'recalls' | 'complaints';
    children: ReactNode;
  }) => {
    if (!isVehicleReliabilityVariant) {
      return <>{children}</>;
    }

    if (activeReliabilityDetail !== detail) {
      return null;
    }

    return (
      <div
        id={`warranty-${detail}-detail`}
        className="warranty__fact-detail-panel"
      >
        {children}
      </div>
    );
  };

  return (
    <section className={`warranty ${isVehicleReliabilityVariant ? 'warranty--vehicle-reliability' : ''}`}>
      <div className="container">
        <div className="warranty__header">
          <h2 className="warranty__title">{title}</h2>
        </div>
        
        {/* NHTSA Data Section */}
        {(make && model && year) && (
          <div className="warranty__nhtsa">
            <div className={isVehicleReliabilityVariant ? 'warranty__nhtsa-module' : undefined}>
            {reliabilityContext && !isLoading && (
              <section
                className="warranty__summary"
                aria-label={isVehicleReliabilityVariant ? `${vehicleName} NHTSA reliability signals` : 'NHTSA ownership snapshot'}
              >
                <div className="warranty__summary-content">
                  {isVehicleReliabilityVariant && (
                    <div className="warranty__reliability-score-card" aria-label={`Reliability score ${reliabilityContext.reliabilityScore} out of 100`}>
                      <span className="warranty__reliability-score-card-label">Reliability score</span>
                      <strong>
                        {reliabilityContext.reliabilityScore}
                        <span className="warranty__score-denominator">/100</span>
                      </strong>
                      <span className="warranty__reliability-score-card-note">
                        NHTSA complaints and recalls
                      </span>
                    </div>
                  )}
                  <div className="warranty__summary-copy">
                    <span className="warranty__summary-eyebrow">
                      {isVehicleReliabilityVariant ? 'NHTSA records' : 'NHTSA ownership snapshot'}
                    </span>
                    <h3 className="warranty__summary-title">
                      {isVehicleReliabilityVariant ? (
                        <>NHTSA model-year records</>
                      ) : (
                        <>
                          Ownership confidence:
                          <span className={`warranty__summary-rating ${getRatingColorClass(reliabilityContext.overallRating)}`}>
                            {formatRatingLabel(reliabilityContext.overallRating)}
                          </span>
                        </>
                      )}
                    </h3>
                    <p className="warranty__summary-text">
                      {isVehicleReliabilityVariant
                        ? getReliabilitySignalSummary()
                        : `${formatSummaryCopy(reliabilityContext.summary)} ${getSafetySummary()}`}
                    </p>
                    {isVehicleReliabilityVariant && (
                      <p className="warranty__editorial-note">
                        Use this as a pattern check; confirm the exact car by VIN.
                      </p>
                    )}
                    <div className="warranty__summary-source">
                      <Info size={16} />
                      <span>
                        {nhtsaMatchedVehicle
                          ? `NHTSA match: ${formatNhtsaVehicleLabel(nhtsaMatchedVehicle)}.`
                          : isVehicleReliabilityVariant
                            ? 'Based on NHTSA owner complaint and recall campaign records.'
                            : 'Based on NHTSA recalls, owner complaints, and crash-test data when available.'}
                      </span>
                    </div>
                  </div>

                  <div className="warranty__summary-facts" aria-label="NHTSA key facts">
                    {isVehicleReliabilityVariant ? (
                      <>
                        <button
                          type="button"
                          className={`warranty__fact warranty__fact--button ${activeReliabilityDetail === 'complaints' ? 'warranty__fact--active' : ''}`}
                          aria-expanded={activeReliabilityDetail === 'complaints'}
                          aria-controls="warranty-complaints-detail"
                          onClick={() => toggleReliabilityDetail('complaints')}
                        >
                          <span className="warranty__fact-label-row">
                            <span className="warranty__fact-label">Owner reports</span>
                            <ChevronDown className="warranty__fact-icon" size={16} />
                          </span>
                          <strong>{complaintsSummary?.totalComplaints || 0}</strong>
                          <span>Filed with NHTSA</span>
                        </button>
                        <button
                          type="button"
                          className={`warranty__fact warranty__fact--button ${hasRecalls ? 'warranty__fact--warning' : 'warranty__fact--success'} ${activeReliabilityDetail === 'recalls' ? 'warranty__fact--active' : ''}`}
                          aria-expanded={activeReliabilityDetail === 'recalls'}
                          aria-controls="warranty-recalls-detail"
                          onClick={() => toggleReliabilityDetail('recalls')}
                        >
                          <span className="warranty__fact-label-row">
                            <span className="warranty__fact-label">Recall campaigns</span>
                            <ChevronDown className="warranty__fact-icon" size={16} />
                          </span>
                          <strong>{recalls.length}</strong>
                          <span>{hasRecalls ? 'Review by VIN' : 'None listed'}</span>
                        </button>
                      </>
                    ) : (
                      <>
                        <div className="warranty__fact">
                          <span className="warranty__fact-label">Owner reports</span>
                          <strong>{complaintsSummary?.totalComplaints || 0}</strong>
                          <span>{getComparisonLabel(reliabilityContext.complaintsVsAverage)}</span>
                        </div>
                        <div className={`warranty__fact ${hasRecalls ? 'warranty__fact--warning' : 'warranty__fact--success'}`}>
                          <span className="warranty__fact-label">Recall campaigns</span>
                          <strong>{recalls.length}</strong>
                          <span>{hasRecalls ? 'Review by VIN' : 'None listed'}</span>
                        </div>
                      </>
                    )}
                    <div className="warranty__fact">
                      <span className="warranty__fact-label">Most mentioned</span>
                      <strong>{getTopIssueLabel()}</strong>
                      <span>In owner reports</span>
                    </div>
                  </div>
                </div>

                {isVehicleReliabilityVariant && (
                  <figure className="warranty__vehicle-photo">
                    {showVehiclePhoto ? (
                      <img
                        src={vehiclePhotoSrc}
                        alt={vehiclePhotoAlt}
                        loading="lazy"
                        decoding="async"
                        onError={() => setVehiclePhotoFailed(true)}
                      />
                    ) : (
                      <div className="warranty__vehicle-photo-empty">
                        Vehicle photo unavailable
                      </div>
                    )}
                  </figure>
                )}
              </section>
            )}

            <div className={`warranty__detail-layout ${isVehicleReliabilityVariant ? 'warranty__detail-layout--reliability' : ''}`}>
              <div className="warranty__detail-main">
              {/* Recalls Column */}
              <ReliabilityPanel detail="recalls">
              <div className="warranty__recalls">
                <div className="warranty__recalls-header">
                  <h3 className="warranty__recalls-title">
                    <AlertTriangle size={20} />
                    Recall Campaigns
                  </h3>
                  {!isLoadingRecalls && (
                    <div className={`warranty__recalls-badge ${hasRecalls ? 'warranty__recalls-badge--warning' : 'warranty__recalls-badge--success'}`}>
                      {hasRecalls ? (
                        <>{recalls.length} Found</>
                      ) : (
                        <>
                          <CheckCircle size={12} />
                          None Found
                        </>
                      )}
                    </div>
                  )}
                </div>

                {/* Segment benchmark */}
                {reliabilityContext && !isLoadingRecalls && (
                  isVehicleReliabilityVariant ? (
                    <p className="warranty__record-note">{getRecallSummaryCopy()}</p>
                  ) : (
                    <div className="warranty__benchmark">
                      <span className={`warranty__reliability-comparison warranty__reliability-comparison--${reliabilityContext.recallsVsAverage}`}>
                        {getComparisonIcon(reliabilityContext.recallsVsAverage)}
                        {getComparisonLabel(reliabilityContext.recallsVsAverage)}
                      </span>
                      <span>{recalls.length} returned, segment avg: {reliabilityContext.segmentAvgRecalls}</span>
                    </div>
                  )
                )}

                {isLoadingRecalls ? (
                  <div className="warranty__recalls-loading">
                    <Loader2 size={24} className="warranty__recalls-spinner" />
                    <span>Checking recalls...</span>
                  </div>
                ) : hasRecalls ? (
                  <div className="warranty__recalls-list">
                    {displayedRecalls.map((recall) => {
                      const isExpanded = expandedRecall === recall.NHTSACampaignNumber;
                      const severity = getRecallSeverity(recall.Consequence);
                      
                      return (
                        <div 
                          key={recall.NHTSACampaignNumber} 
                          className={`warranty__recall-item warranty__recall-item--${severity}`}
                        >
                          <button 
                            className="warranty__recall-header"
                            onClick={() => toggleRecall(recall.NHTSACampaignNumber)}
                            aria-expanded={isExpanded}
                          >
                            <div className="warranty__recall-info">
                              <span className={`warranty__recall-severity warranty__recall-severity--${severity}`}>
                                {severity === 'high' ? 'Critical' : severity === 'medium' ? 'Important' : 'Notice'}
                              </span>
                              <span className="warranty__recall-component">{recall.Component}</span>
                              <span className="warranty__recall-date">
                                {formatRecallDate(recall.ReportReceivedDate)}
                              </span>
                            </div>
                            <div className="warranty__recall-toggle">
                              {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                            </div>
                          </button>
                          
                          {isExpanded && (
                            <div className="warranty__recall-details">
                              <div className="warranty__recall-section">
                                <h4>Summary</h4>
                                <p>{recall.Summary}</p>
                              </div>
                              
                              <div className="warranty__recall-section">
                                <h4>Consequence</h4>
                                <p>{recall.Consequence}</p>
                              </div>
                              
                              <div className="warranty__recall-section">
                                <h4>Remedy</h4>
                                <p>{recall.Remedy}</p>
                              </div>
                              
                              {recall.Notes && (
                                <div className="warranty__recall-section">
                                  <h4>Additional Notes</h4>
                                  <p>{recall.Notes}</p>
                                </div>
                              )}
                              
                              <div className="warranty__recall-footer">
                                <span className="warranty__recall-campaign">
                                  #{recall.NHTSACampaignNumber}
                                </span>
                                <a 
                                  href={`https://www.nhtsa.gov/recalls?nhtsaId=${recall.NHTSACampaignNumber}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="warranty__recall-link"
                                >
                                  NHTSA.gov
                                  <ExternalLink size={14} />
                                </a>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                    
                    {recalls.length > 3 && (
                      <button 
                        className="warranty__recalls-toggle"
                        onClick={() => setShowAllRecalls(!showAllRecalls)}
                      >
                        {showAllRecalls ? (
                          <>Show Less <ChevronUp size={16} /></>
                        ) : (
                          <>Show All {recalls.length} <ChevronDown size={16} /></>
                        )}
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="warranty__recalls-empty">
                    <CheckCircle size={28} className="warranty__recalls-empty-icon" />
                    <p>No recall campaigns returned</p>
                  </div>
                )}
              </div>
              </ReliabilityPanel>

              {/* Complaints Column */}
              <ReliabilityPanel detail="complaints">
              <div className="warranty__complaints">
                <div className="warranty__complaints-header">
                  <h3 className="warranty__complaints-title">
                    <MessageSquareWarning size={20} />
                    Owner Complaints
                  </h3>
                  {!isLoadingComplaints && complaintsSummary && (
                    <div className={`warranty__complaints-badge ${complaintsSummary.totalComplaints > 50 ? 'warranty__complaints-badge--warning' : complaintsSummary.totalComplaints > 0 ? 'warranty__complaints-badge--caution' : 'warranty__complaints-badge--success'}`}>
                      {complaintsSummary.totalComplaints > 0 ? (
                        <>{complaintsSummary.totalComplaints} Reports</>
                      ) : (
                        <>
                          <CheckCircle size={12} />
                          None
                        </>
                      )}
                    </div>
                  )}
                </div>

                {/* Segment benchmark */}
                {reliabilityContext && !isLoadingComplaints && (
                  isVehicleReliabilityVariant ? (
                    <p className="warranty__record-note">{getComplaintSummaryCopy()}</p>
                  ) : (
                    <div className="warranty__benchmark">
                      <span className={`warranty__reliability-comparison warranty__reliability-comparison--${reliabilityContext.complaintsVsAverage}`}>
                        {getComparisonIcon(reliabilityContext.complaintsVsAverage)}
                        {getComparisonLabel(reliabilityContext.complaintsVsAverage)}
                      </span>
                      <span>{complaintsSummary?.totalComplaints || 0} reported, segment avg: {reliabilityContext.segmentAvgComplaints}</span>
                    </div>
                  )
                )}

                {isLoadingComplaints ? (
                  <div className="warranty__complaints-loading">
                    <Loader2 size={24} className="warranty__complaints-spinner" />
                    <span>Loading complaints...</span>
                  </div>
                ) : complaintsSummary && complaintsSummary.totalComplaints > 0 ? (
                  <div className="warranty__complaints-content">
                    {/* Stats Row */}
                    {(complaintsSummary.crashCount > 0 || complaintsSummary.fireCount > 0 || complaintsSummary.injuryCount > 0) && (
                      isVehicleReliabilityVariant ? (
                        <p className="warranty__complaints-signal-line">
                          Includes {[
                            complaintsSummary.crashCount > 0 ? `${complaintsSummary.crashCount} crash report${complaintsSummary.crashCount === 1 ? '' : 's'}` : '',
                            complaintsSummary.fireCount > 0 ? `${complaintsSummary.fireCount} fire report${complaintsSummary.fireCount === 1 ? '' : 's'}` : '',
                            complaintsSummary.injuryCount > 0 ? `${complaintsSummary.injuryCount} reported injur${complaintsSummary.injuryCount === 1 ? 'y' : 'ies'}` : '',
                          ].filter(Boolean).join(', ')}.
                        </p>
                      ) : (
                        <div className="warranty__complaints-stats">
                          {complaintsSummary.crashCount > 0 && (
                            <div className="warranty__complaints-stat warranty__complaints-stat--crash">
                              <Car size={16} />
                              <span>{complaintsSummary.crashCount} Crash{complaintsSummary.crashCount !== 1 ? 'es' : ''}</span>
                            </div>
                          )}
                          {complaintsSummary.fireCount > 0 && (
                            <div className="warranty__complaints-stat warranty__complaints-stat--fire">
                              <Flame size={16} />
                              <span>{complaintsSummary.fireCount} Fire{complaintsSummary.fireCount !== 1 ? 's' : ''}</span>
                            </div>
                          )}
                          {complaintsSummary.injuryCount > 0 && (
                            <div className="warranty__complaints-stat warranty__complaints-stat--injury">
                              <Users size={16} />
                              <span>{complaintsSummary.injuryCount} Injur{complaintsSummary.injuryCount !== 1 ? 'ies' : 'y'}</span>
                            </div>
                          )}
                        </div>
                      )
                    )}

                    {/* Top Components */}
                    {complaintsSummary.topComponents.length > 0 && (
                      <div className="warranty__complaints-components">
                        <h4>Most Reported Issues</h4>
                        <div className="warranty__complaints-component-list">
                          {complaintsSummary.topComponents.map((item, index) => (
                            <div key={index} className="warranty__complaints-component">
                              <span className="warranty__complaints-component-name">{formatNhtsaLabel(item.component)}</span>
                              <span className="warranty__complaints-component-count">{item.count}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Recent Complaints */}
                    {complaintsSummary.recentComplaints.length > 0 && (
                      <div className="warranty__complaints-recent">
                        <h4>Recent Reports</h4>
                        {complaintsSummary.recentComplaints.map((complaint) => {
                          const isExpanded = expandedComplaint === complaint.odiNumber;
                          return (
                            <div key={complaint.odiNumber} className="warranty__complaint-item">
                              <button 
                                className="warranty__complaint-header"
                                onClick={() => {
                                  if (isVehicleReliabilityVariant) {
                                    openComplaintReport(complaint);
                                    return;
                                  }

                                  toggleComplaint(complaint.odiNumber);
                                }}
                                aria-expanded={isVehicleReliabilityVariant ? undefined : isExpanded}
                                aria-haspopup={isVehicleReliabilityVariant ? 'dialog' : undefined}
                              >
                                <div className="warranty__complaint-info">
                                  <span className="warranty__complaint-component">{formatNhtsaLabel(complaint.components)}</span>
                                  <span className="warranty__complaint-date">
                                    {formatComplaintDate(complaint.dateComplaintFiled)}
                                  </span>
                                  {(complaint.crash || complaint.fire) && (
                                    <div className="warranty__complaint-flags">
                                      {complaint.crash && <span className="warranty__complaint-flag warranty__complaint-flag--crash">Crash</span>}
                                      {complaint.fire && <span className="warranty__complaint-flag warranty__complaint-flag--fire">Fire</span>}
                                    </div>
                                  )}
                                </div>
                                <div className="warranty__complaint-toggle">
                                  {isVehicleReliabilityVariant ? (
                                    <span className="warranty__complaint-action">Read report</span>
                                  ) : (
                                    isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />
                                  )}
                                </div>
                              </button>
                              
                              {!isVehicleReliabilityVariant && isExpanded && (
                                <div className="warranty__complaint-details">
                                  <p>{complaint.summary}</p>
                                  <div className="warranty__complaint-footer">
                                    <span className="warranty__complaint-id">ODI #{complaint.odiNumber}</span>
                                    <a 
                                      href={`https://www.nhtsa.gov/vehicle/${year}/${make}/${model}/complaints`}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="warranty__complaint-link"
                                    >
                                      View All on NHTSA
                                      <ExternalLink size={14} />
                                    </a>
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="warranty__complaints-empty">
                    <CheckCircle size={28} className="warranty__complaints-empty-icon" />
                    <p>No owner complaints returned</p>
                  </div>
                )}
              </div>
              </ReliabilityPanel>
              </div>

              {!isVehicleReliabilityVariant && (
                <aside className="warranty__detail-aside">
                <div className="warranty__safety">
                <div className="warranty__safety-header">
                  <h3 className="warranty__safety-title">
                    <ShieldCheck size={20} />
                    Crash Test Status
                  </h3>
                  {!isLoadingSafety && safetyRatings && (
                    <div className={`warranty__safety-badge ${getSafetyBadge().className}`}>
                      {getSafetyBadge().label}
                    </div>
                  )}
                </div>

                {isLoadingSafety ? (
                  <div className="warranty__safety-loading">
                    <Loader2 size={24} className="warranty__safety-spinner" />
                    <span>Loading ratings...</span>
                  </div>
                ) : safetyRatings ? (
                  <div className="warranty__safety-content">
                    {/* Overall Rating */}
                    <div className="warranty__safety-overall">
                      <div className="warranty__safety-overall-label">Overall Rating</div>
                      <div className="warranty__safety-overall-rating">
                        {renderStars(safetyRatings.OverallRating, 24)}
                        <span className="warranty__safety-overall-text">
                          {getOverallSafetyText(safetyRatings.OverallRating)}
                        </span>
                      </div>
                    </div>

                    {/* Detailed Ratings */}
                    <div className="warranty__safety-details">
                      <div className="warranty__safety-category">
                        <div className="warranty__safety-category-header">
                          <span className="warranty__safety-category-name">Frontal Crash</span>
                          {renderStars(safetyRatings.OverallFrontCrashRating, 14)}
                        </div>
                        <div className="warranty__safety-subcategories">
                          <div className="warranty__safety-subcategory">
                            <span>Driver</span>
                            {renderStars(safetyRatings.FrontCrashDriversideRating, 12)}
                          </div>
                          <div className="warranty__safety-subcategory">
                            <span>Passenger</span>
                            {renderStars(safetyRatings.FrontCrashPassengersideRating, 12)}
                          </div>
                        </div>
                      </div>

                      <div className="warranty__safety-category">
                        <div className="warranty__safety-category-header">
                          <span className="warranty__safety-category-name">Side Crash</span>
                          {renderStars(safetyRatings.OverallSideCrashRating, 14)}
                        </div>
                        <div className="warranty__safety-subcategories">
                          <div className="warranty__safety-subcategory">
                            <span>Driver</span>
                            {renderStars(safetyRatings.SideCrashDriversideRating, 12)}
                          </div>
                          <div className="warranty__safety-subcategory">
                            <span>Passenger</span>
                            {renderStars(safetyRatings.SideCrashPassengersideRating, 12)}
                          </div>
                          {safetyRatings.SidePoleCrashRating && parseStarRating(safetyRatings.SidePoleCrashRating) !== null && (
                            <div className="warranty__safety-subcategory">
                              <span>Pole</span>
                              {renderStars(safetyRatings.SidePoleCrashRating, 12)}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="warranty__safety-category">
                        <div className="warranty__safety-category-header">
                          <span className="warranty__safety-category-name">Rollover</span>
                          {renderStars(safetyRatings.RolloverRating, 14)}
                        </div>
                        {safetyRatings.RolloverPossibility && (
                          <div className="warranty__safety-rollover-info">
                            <span className="warranty__safety-rollover-percent">
                              {safetyRatings.RolloverPossibility.toFixed(1)}%
                            </span>
                            <span className="warranty__safety-rollover-label">rollover risk</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Safety Features */}
                    {(safetyRatings.NHTSAElectronicStabilityControl || 
                      safetyRatings.NHTSAForwardCollisionWarning || 
                      safetyRatings.NHTSALaneDepartureWarning) && (
                      <div className="warranty__safety-features">
                        <h4>Safety Technology</h4>
                        <div className="warranty__safety-features-list">
                          {safetyRatings.NHTSAElectronicStabilityControl && safetyRatings.NHTSAElectronicStabilityControl !== 'Not Rated' && (
                            <div className="warranty__safety-feature">
                              <CheckCircle size={14} />
                              <span>Electronic Stability Control</span>
                            </div>
                          )}
                          {safetyRatings.NHTSAForwardCollisionWarning && safetyRatings.NHTSAForwardCollisionWarning !== 'Not Rated' && (
                            <div className="warranty__safety-feature">
                              <CheckCircle size={14} />
                              <span>Forward Collision Warning</span>
                            </div>
                          )}
                          {safetyRatings.NHTSALaneDepartureWarning && safetyRatings.NHTSALaneDepartureWarning !== 'Not Rated' && (
                            <div className="warranty__safety-feature">
                              <CheckCircle size={14} />
                              <span>Lane Departure Warning</span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* View Crash Test Photos Button */}
                    {hasCrashTestImages && (
                      <button
                        className="warranty__safety-photos-btn"
                        onClick={() => setIsCrashTestModalOpen(true)}
                      >
                        <Camera size={16} />
                        View Crash Test Photos
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="warranty__safety-empty">
                    <ShieldCheck size={28} className="warranty__safety-empty-icon" />
                    <p>No crash test data available</p>
                    <span className="warranty__safety-empty-note">This vehicle may not have been tested yet</span>
                  </div>
                )}
                </div>
                </aside>
              )}
            </div>
            </div>

            <p className="warranty__nhtsa-disclaimer">
              Data provided by the National Highway Traffic Safety Administration (NHTSA). 
              <a 
                href={`https://www.nhtsa.gov/vehicle/${year}/${make}/${model}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Verify on NHTSA.gov <ExternalLink size={12} />
              </a>
            </p>
          </div>
        )}
        
        {variant === 'warranty-safety' && items.length > 0 && (
          <>
            {/* Warranty Cards */}
            <div className="warranty__grid">
              {items.map((item, index) => (
                <div key={index} className="warranty__card">
                  <div className="warranty__card-icon">
                    {item.icon}
                  </div>
                  <h3 className="warranty__card-title">{item.title}</h3>
                  <div className="warranty__card-coverage">{item.coverage}</div>
                  <p className="warranty__card-description">{item.description}</p>
                </div>
              ))}
            </div>

            <div className="warranty__note">
              <p>* See dealer for limited warranty details. Warranty coverage varies by manufacturer.</p>
            </div>
          </>
        )}
      </div>

      {/* Crash Test Modal */}
      {safetyRatings && (
        <CrashTestModal
          isOpen={isCrashTestModalOpen}
          onClose={() => setIsCrashTestModalOpen(false)}
          safetyRatings={safetyRatings}
          vehicleName={`${year} ${make} ${model}`}
        />
      )}

      {selectedComplaint && selectedComplaintIndex !== null && (
        <div className="warranty__complaint-modal-backdrop" onClick={closeComplaintReport}>
          <section
            className="warranty__complaint-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="warranty-complaint-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <header className="warranty__complaint-modal-header">
              <div className="warranty__complaint-modal-heading">
                <div className="warranty__complaint-modal-kicker">
                  <span className="warranty__complaint-modal-eyebrow">Owner complaint</span>
                  <span className="warranty__complaint-modal-count">
                    Report {selectedComplaintPosition} of {complaintReportCount}
                  </span>
                </div>
                <h3 id="warranty-complaint-modal-title">
                  {formatNhtsaLabel(selectedComplaint.components)}
                </h3>
              </div>
              <button
                type="button"
                className="warranty__complaint-modal-close"
                onClick={closeComplaintReport}
                autoFocus
              >
                <X size={20} />
                <span className="sr-only">Close complaint details</span>
              </button>
            </header>

            <div className="warranty__complaint-modal-controls" aria-label="Browse owner complaint reports">
              <button
                type="button"
                className="warranty__complaint-modal-nav"
                onClick={showPreviousComplaint}
                disabled={selectedComplaintIndex === 0}
              >
                <ChevronLeft size={18} />
                <span>Previous</span>
              </button>
              <div
                className="warranty__complaint-modal-progress"
                role="progressbar"
                aria-label="Complaint report position"
                aria-valuemin={1}
                aria-valuemax={complaintReportCount}
                aria-valuenow={selectedComplaintPosition}
              >
                <span style={{ width: `${(selectedComplaintPosition / complaintReportCount) * 100}%` }} />
              </div>
              <button
                type="button"
                className="warranty__complaint-modal-nav"
                onClick={showNextComplaint}
                disabled={selectedComplaintIndex >= complaintReportCount - 1}
              >
                <span>Next</span>
                <ChevronRight size={18} />
              </button>
            </div>

            <div
              className="warranty__complaint-modal-slider"
              onTouchStart={handleComplaintTouchStart}
              onTouchEnd={handleComplaintTouchEnd}
              aria-roledescription="carousel"
              aria-label={`${complaintReportCount} owner complaint reports`}
            >
              <div className="warranty__complaint-modal-track">
                {complaintReports.map((complaint, index) => (
                  <article
                    key={complaint.odiNumber}
                    className="warranty__complaint-modal-slide"
                    aria-label={`Complaint ${index + 1} of ${complaintReportCount}`}
                    aria-hidden={index !== selectedComplaintIndex}
                  >
                    <div className="warranty__complaint-modal-meta">
                      <div>
                        <span>Date filed</span>
                        <strong>{formatComplaintDate(complaint.dateComplaintFiled)}</strong>
                      </div>
                      {complaint.dateOfIncident && (
                        <div>
                          <span>Incident date</span>
                          <strong>{formatComplaintDate(complaint.dateOfIncident)}</strong>
                        </div>
                      )}
                      <div>
                        <span>NHTSA ODI</span>
                        <strong>#{complaint.odiNumber}</strong>
                      </div>
                    </div>

                    {(complaint.crash || complaint.fire || complaint.numberOfInjuries > 0 || complaint.numberOfDeaths > 0) && (
                      <div className="warranty__complaint-modal-flags" aria-label="Report signals">
                        {complaint.crash && <span>Crash reported</span>}
                        {complaint.fire && <span>Fire reported</span>}
                        {complaint.numberOfInjuries > 0 && (
                          <span>{complaint.numberOfInjuries} injur{complaint.numberOfInjuries === 1 ? 'y' : 'ies'} reported</span>
                        )}
                        {complaint.numberOfDeaths > 0 && (
                          <span>{complaint.numberOfDeaths} death{complaint.numberOfDeaths === 1 ? '' : 's'} reported</span>
                        )}
                      </div>
                    )}

                    <div className="warranty__complaint-modal-body">
                      <p>{complaint.summary}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <footer className="warranty__complaint-modal-footer">
              <span className="warranty__complaint-modal-helper">
                Slide or use the arrows to browse NHTSA owner reports.
              </span>
              <a
                href={`https://www.nhtsa.gov/vehicle/${year}/${make}/${model}/complaints`}
                target="_blank"
                rel="noopener noreferrer"
              >
                View all on NHTSA.gov <ExternalLink size={14} />
              </a>
            </footer>
          </section>
        </div>
      )}
    </section>
  );
};

export default Warranty;
