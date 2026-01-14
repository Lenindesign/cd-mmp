import { useState, useEffect } from 'react';
import { FileText, Wrench, Shield, Calendar, AlertTriangle, CheckCircle, ChevronDown, ChevronUp, ExternalLink, Loader2, MessageSquareWarning, Flame, Car, Users, TrendingDown, TrendingUp, Minus, Info, Star, ShieldCheck, Camera } from 'lucide-react';
import { 
  getRecalls, 
  getComplaints,
  getComplaintsSummary,
  getReliabilityContext,
  getVehicleSafetyRatings,
  parseStarRating,
  formatRecallDate, 
  formatComplaintDate,
  getRecallSeverity, 
  type NHTSARecall,
  type NHTSASafetyRating,
  type ComplaintsSummary,
  type ReliabilityContext
} from '../../services/nhtsaService';
import CrashTestModal from './CrashTestModal';
import './Warranty.css';

interface WarrantyItem {
  icon: React.ReactNode;
  title: string;
  coverage: string;
  description: string;
}

interface WarrantyProps {
  items: WarrantyItem[];
  title?: string;
  make?: string;
  model?: string;
  year?: number | string;
  bodyStyle?: string;
}

const Warranty = ({ 
  items, 
  title = "Warranty & Safety", 
  make,
  model,
  year,
  bodyStyle = 'SUV'
}: WarrantyProps) => {
  const [recalls, setRecalls] = useState<NHTSARecall[]>([]);
  const [complaintsSummary, setComplaintsSummary] = useState<ComplaintsSummary | null>(null);
  const [safetyRatings, setSafetyRatings] = useState<NHTSASafetyRating | null>(null);
  const [reliabilityContext, setReliabilityContext] = useState<ReliabilityContext | null>(null);
  const [isLoadingRecalls, setIsLoadingRecalls] = useState(false);
  const [isLoadingComplaints, setIsLoadingComplaints] = useState(false);
  const [isLoadingSafety, setIsLoadingSafety] = useState(false);
  const [expandedRecall, setExpandedRecall] = useState<string | null>(null);
  const [expandedComplaint, setExpandedComplaint] = useState<number | null>(null);
  const [showAllRecalls, setShowAllRecalls] = useState(false);
  const [isCrashTestModalOpen, setIsCrashTestModalOpen] = useState(false);

  // Fetch recalls, complaints, and safety ratings when vehicle info is available
  useEffect(() => {
    if (make && model && year) {
      // Fetch recalls
      setIsLoadingRecalls(true);
      getRecalls(make, model, year)
        .then(data => {
          setRecalls(data);
        })
        .finally(() => {
          setIsLoadingRecalls(false);
        });

      // Fetch complaints
      setIsLoadingComplaints(true);
      getComplaints(make, model, year)
        .then(data => {
          const summary = getComplaintsSummary(data);
          setComplaintsSummary(summary);
        })
        .finally(() => {
          setIsLoadingComplaints(false);
        });

      // Fetch safety ratings
      setIsLoadingSafety(true);
      getVehicleSafetyRatings(make, model, year)
        .then(data => {
          setSafetyRatings(data);
        })
        .finally(() => {
          setIsLoadingSafety(false);
        });
    }
  }, [make, model, year]);

  // Calculate reliability context when data is loaded
  useEffect(() => {
    if (!isLoadingRecalls && !isLoadingComplaints && make) {
      const complaintCount = complaintsSummary?.totalComplaints || 0;
      const recallCount = recalls.length;
      const context = getReliabilityContext(complaintCount, recallCount, bodyStyle, make);
      setReliabilityContext(context);
    }
  }, [isLoadingRecalls, isLoadingComplaints, complaintsSummary, recalls, bodyStyle, make]);

  const toggleRecall = (campaignNumber: string) => {
    setExpandedRecall(prev => prev === campaignNumber ? null : campaignNumber);
  };

  const toggleComplaint = (odiNumber: number) => {
    setExpandedComplaint(prev => prev === odiNumber ? null : odiNumber);
  };

  const displayedRecalls = showAllRecalls ? recalls : recalls.slice(0, 3);
  const hasRecalls = recalls.length > 0;
  const isLoading = isLoadingRecalls || isLoadingComplaints || isLoadingSafety;

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

  // Get comparison icon
  const getComparisonIcon = (comparison: 'below' | 'average' | 'above') => {
    switch (comparison) {
      case 'below': return <TrendingDown size={14} />;
      case 'above': return <TrendingUp size={14} />;
      default: return <Minus size={14} />;
    }
  };

  return (
    <section className="warranty">
      <div className="container">
        <div className="warranty__header">
          <h2 className="warranty__title">{title}</h2>
        </div>
        
        {/* NHTSA Data Section */}
        {(make && model && year) && (
          <div className="warranty__nhtsa">
            {/* Reliability Summary Header */}
            {reliabilityContext && !isLoading && (
              <div className="warranty__reliability">
                <div className="warranty__reliability-header">
                  <div className="warranty__reliability-score">
                    <span className="warranty__reliability-label">NHTSA Reliability</span>
                    <span className={`warranty__reliability-rating ${getRatingColorClass(reliabilityContext.overallRating)}`}>
                      {reliabilityContext.overallRating.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </span>
                  </div>
                  <div className="warranty__reliability-info">
                    <Info size={16} />
                    <span>Based on owner complaints and recalls vs. segment average</span>
                  </div>
                </div>
                
                <p className="warranty__reliability-summary">
                  {reliabilityContext.summary}
                </p>
              </div>
            )}

            {/* Two Column Layout for Recalls and Complaints */}
            <div className="warranty__nhtsa-grid">
              {/* Recalls Column */}
              <div className="warranty__recalls">
                <div className="warranty__recalls-header">
                  <h3 className="warranty__recalls-title">
                    <AlertTriangle size={20} />
                    Recalls
                  </h3>
                  {!isLoadingRecalls && (
                    <div className={`warranty__recalls-badge ${hasRecalls ? 'warranty__recalls-badge--warning' : 'warranty__recalls-badge--success'}`}>
                      {hasRecalls ? (
                        <>{recalls.length} Active</>
                      ) : (
                        <>
                          <CheckCircle size={12} />
                          None
                        </>
                      )}
                    </div>
                  )}
                </div>

                {/* Progress Bar for Recalls */}
                {reliabilityContext && !isLoadingRecalls && (
                  <div className="warranty__metric-inline">
                    <div className="warranty__metric-inline-header">
                      <span className={`warranty__reliability-comparison warranty__reliability-comparison--${reliabilityContext.recallsVsAverage}`}>
                        {getComparisonIcon(reliabilityContext.recallsVsAverage)}
                        {reliabilityContext.recallsVsAverage === 'below' ? 'Below Avg' : 
                         reliabilityContext.recallsVsAverage === 'above' ? 'Above Avg' : 'Average'}
                      </span>
                    </div>
                    <div className="warranty__reliability-bar">
                      <div 
                        className={`warranty__reliability-bar-fill warranty__reliability-bar-fill--${reliabilityContext.recallsRating}`}
                        style={{ width: `${Math.min(reliabilityContext.recallsPercentile, 100)}%` }}
                      />
                      <div 
                        className="warranty__reliability-bar-marker"
                        style={{ left: '50%' }}
                        title="Segment Average"
                      />
                    </div>
                    <div className="warranty__reliability-metric-footer">
                      <span>{recalls.length} issued</span>
                      <span className="warranty__reliability-avg">Avg: {reliabilityContext.segmentAvgRecalls}</span>
                    </div>
                  </div>
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
                    <p>No open recalls</p>
                  </div>
                )}
              </div>

              {/* Complaints Column */}
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

                {/* Progress Bar for Complaints */}
                {reliabilityContext && !isLoadingComplaints && (
                  <div className="warranty__metric-inline">
                    <div className="warranty__metric-inline-header">
                      <span className={`warranty__reliability-comparison warranty__reliability-comparison--${reliabilityContext.complaintsVsAverage}`}>
                        {getComparisonIcon(reliabilityContext.complaintsVsAverage)}
                        {reliabilityContext.complaintsVsAverage === 'below' ? 'Below Avg' : 
                         reliabilityContext.complaintsVsAverage === 'above' ? 'Above Avg' : 'Average'}
                      </span>
                    </div>
                    <div className="warranty__reliability-bar">
                      <div 
                        className={`warranty__reliability-bar-fill warranty__reliability-bar-fill--${reliabilityContext.complaintsRating}`}
                        style={{ width: `${Math.min(reliabilityContext.complaintsPercentile, 100)}%` }}
                      />
                      <div 
                        className="warranty__reliability-bar-marker"
                        style={{ left: '50%' }}
                        title="Segment Average"
                      />
                    </div>
                    <div className="warranty__reliability-metric-footer">
                      <span>{complaintsSummary?.totalComplaints || 0} reported</span>
                      <span className="warranty__reliability-avg">Avg: {reliabilityContext.segmentAvgComplaints}</span>
                    </div>
                  </div>
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
                    )}

                    {/* Top Components */}
                    {complaintsSummary.topComponents.length > 0 && (
                      <div className="warranty__complaints-components">
                        <h4>Most Reported Issues</h4>
                        <div className="warranty__complaints-component-list">
                          {complaintsSummary.topComponents.map((item, index) => (
                            <div key={index} className="warranty__complaints-component">
                              <span className="warranty__complaints-component-name">{item.component}</span>
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
                                onClick={() => toggleComplaint(complaint.odiNumber)}
                                aria-expanded={isExpanded}
                              >
                                <div className="warranty__complaint-info">
                                  <span className="warranty__complaint-component">{complaint.components}</span>
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
                                  {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                                </div>
                              </button>
                              
                              {isExpanded && (
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
                    <p>No complaints filed</p>
                  </div>
                )}
              </div>

              {/* Safety Ratings Column */}
              <div className="warranty__safety">
                <div className="warranty__safety-header">
                  <h3 className="warranty__safety-title">
                    <ShieldCheck size={20} />
                    Crash Test Ratings
                  </h3>
                  {!isLoadingSafety && safetyRatings && (
                    <div className={`warranty__safety-badge warranty__safety-badge--${parseStarRating(safetyRatings.OverallRating) === 5 ? 'excellent' : parseStarRating(safetyRatings.OverallRating) === 4 ? 'good' : 'average'}`}>
                      {parseStarRating(safetyRatings.OverallRating) || '—'} ★
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
    </section>
  );
};

export default Warranty;

export const defaultWarrantyItems: WarrantyItem[] = [
  {
    icon: <FileText size={28} />,
    title: 'Basic Warranty',
    coverage: '3 Years / 36,000 Miles',
    description: 'Bumper-to-bumper limited warranty covering most vehicle components.',
  },
  {
    icon: <Wrench size={28} />,
    title: 'Powertrain Warranty',
    coverage: '5 Years / 60,000 Miles',
    description: 'Covers engine, transmission, and drivetrain components.',
  },
  {
    icon: <Shield size={28} />,
    title: 'Corrosion Warranty',
    coverage: '6 Years / 100,000 Miles',
    description: 'Protection against rust-through corrosion on body panels.',
  },
  {
    icon: <Calendar size={28} />,
    title: 'Complimentary Maintenance',
    coverage: 'First Visit',
    description: 'Includes first scheduled maintenance service at no additional cost.',
  },
];
