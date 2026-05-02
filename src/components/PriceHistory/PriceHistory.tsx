import { useMemo, useState, useCallback, useEffect, useRef } from 'react';
import { TrendingDown, TrendingUp, ChevronDown, ChevronUp } from 'lucide-react';
import Tabs from '../Tabs/Tabs';
import './PriceHistory.css';

interface PriceDataPoint {
  year: number;
  value: number;
}

interface CompetitorData {
  /** Competitor vehicle name */
  name: string;
  /** As new value */
  asNewValue: number;
  /** Previous year value (optional, will be interpolated if not provided) */
  previousYearValue?: number;
  /** Current value */
  currentValue: number;
  /** Total depreciation percentage */
  depreciationPercent: number;
}

interface PriceHistoryProps {
  /** Vehicle year */
  vehicleYear: number;
  /** Vehicle make */
  make: string;
  /** Vehicle model */
  model: string;
  /** Vehicle trim */
  trim: string;
  /** As new value (original price) */
  asNewValue: number;
  /** Previous year value */
  previousYearValue: number;
  /** Current average value */
  currentValue: number;
  /** Forecasted value year 1 */
  forecastYear1Value: number;
  /** Forecasted value year 2 */
  forecastYear2Value: number;
  /** Price data points for the chart (legacy support) */
  priceData?: PriceDataPoint[];
  /** Expert tip message */
  expertTip?: string;
  /** Shop button URL */
  shopUrl?: string;
  /** Trade-in button URL */
  tradeInUrl?: string;
  /** Competitor price data for comparison */
  competitors?: CompetitorData[];
}

// Custom hook for animated counter
const useAnimatedValue = (targetValue: number, duration: number = 500) => {
  const [displayValue, setDisplayValue] = useState(targetValue);
  const animationRef = useRef<number | undefined>(undefined);
  const startTimeRef = useRef<number | undefined>(undefined);
  const startValueRef = useRef<number>(targetValue);

  useEffect(() => {
    startValueRef.current = displayValue;
    startTimeRef.current = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - (startTimeRef.current || 0);
      const progress = Math.min(elapsed / duration, 1);
      
      // Ease out cubic
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentValue = startValueRef.current + (targetValue - startValueRef.current) * easeOut;
      
      setDisplayValue(Math.round(currentValue));
      
      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [targetValue, duration]);

  return displayValue;
};

// Animated value component
const AnimatedCurrency = ({ value }: { value: number }) => {
  const animatedValue = useAnimatedValue(value, 600);
  
  return (
    <>
      {new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(animatedValue)}
    </>
  );
};

const SealCheckIcon = ({ size = 24 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M21.1744 9.63937C20.8209 9.27 20.4553 8.88937 20.3175 8.55469C20.19 8.24813 20.1825 7.74 20.175 7.24781C20.1609 6.33281 20.1459 5.29594 19.425 4.575C18.7041 3.85406 17.6672 3.83906 16.7522 3.825C16.26 3.8175 15.7519 3.81 15.4453 3.6825C15.1116 3.54469 14.73 3.17906 14.3606 2.82562C13.7137 2.20406 12.9787 1.5 12 1.5C11.0213 1.5 10.2872 2.20406 9.63937 2.82562C9.27 3.17906 8.88937 3.54469 8.55469 3.6825C8.25 3.81 7.74 3.8175 7.24781 3.825C6.33281 3.83906 5.29594 3.85406 4.575 4.575C3.85406 5.29594 3.84375 6.33281 3.825 7.24781C3.8175 7.74 3.81 8.24813 3.6825 8.55469C3.54469 8.88844 3.17906 9.27 2.82562 9.63937C2.20406 10.2862 1.5 11.0213 1.5 12C1.5 12.9787 2.20406 13.7128 2.82562 14.3606C3.17906 14.73 3.54469 15.1106 3.6825 15.4453C3.81 15.7519 3.8175 16.26 3.825 16.7522C3.83906 17.6672 3.85406 18.7041 4.575 19.425C5.29594 20.1459 6.33281 20.1609 7.24781 20.175C7.74 20.1825 8.24813 20.19 8.55469 20.3175C8.88844 20.4553 9.27 20.8209 9.63937 21.1744C10.2862 21.7959 11.0213 22.5 12 22.5C12.9787 22.5 13.7128 21.7959 14.3606 21.1744C14.73 20.8209 15.1106 20.4553 15.4453 20.3175C15.7519 20.19 16.26 20.1825 16.7522 20.175C17.6672 20.1609 18.7041 20.1459 19.425 19.425C20.1459 18.7041 20.1609 17.6672 20.175 16.7522C20.1825 16.26 20.19 15.7519 20.3175 15.4453C20.4553 15.1116 20.8209 14.73 21.1744 14.3606C21.7959 13.7137 22.5 12.9787 22.5 12C22.5 11.0213 21.7959 10.2872 21.1744 9.63937ZM20.0916 13.3228C19.6425 13.7916 19.1775 14.2763 18.9309 14.8716C18.6947 15.4434 18.6844 16.0969 18.675 16.7297C18.6656 17.3859 18.6553 18.0731 18.3638 18.3638C18.0722 18.6544 17.3897 18.6656 16.7297 18.675C16.0969 18.6844 15.4434 18.6947 14.8716 18.9309C14.2763 19.1775 13.7916 19.6425 13.3228 20.0916C12.8541 20.5406 12.375 21 12 21C11.625 21 11.1422 20.5387 10.6772 20.0916C10.2122 19.6444 9.72375 19.1775 9.12844 18.9309C8.55656 18.6947 7.90313 18.6844 7.27031 18.675C6.61406 18.6656 5.92687 18.6553 5.63625 18.3638C5.34562 18.0722 5.33437 17.3897 5.325 16.7297C5.31562 16.0969 5.30531 15.4434 5.06906 14.8716C4.8225 14.2763 4.3575 13.7916 3.90844 13.3228C3.45937 12.8541 3 12.375 3 12C3 11.625 3.46125 11.1422 3.90844 10.6772C4.35562 10.2122 4.8225 9.72375 5.06906 9.12844C5.30531 8.55656 5.31562 7.90313 5.325 7.27031C5.33437 6.61406 5.34469 5.92687 5.63625 5.63625C5.92781 5.34562 6.61031 5.33437 7.27031 5.325C7.90313 5.31562 8.55656 5.30531 9.12844 5.06906C9.72375 4.8225 10.2084 4.3575 10.6772 3.90844C11.1459 3.45937 11.625 3 12 3C12.375 3 12.8578 3.46125 13.3228 3.90844C13.7878 4.35562 14.2763 4.8225 14.8716 5.06906C15.4434 5.30531 16.0969 5.31562 16.7297 5.325C17.3859 5.33437 18.0731 5.34469 18.3638 5.63625C18.6544 5.92781 18.6656 6.61031 18.675 7.27031C18.6844 7.90313 18.6947 8.55656 18.9309 9.12844C19.1775 9.72375 19.6425 10.2084 20.0916 10.6772C20.5406 11.1459 21 11.625 21 12C21 12.375 20.5387 12.8578 20.0916 13.3228ZM16.2806 9.21937C16.3504 9.28903 16.4057 9.37175 16.4434 9.46279C16.4812 9.55384 16.5006 9.65144 16.5006 9.75C16.5006 9.84856 16.4812 9.94616 16.4434 10.0372C16.4057 10.1283 16.3504 10.211 16.2806 10.2806L11.0306 15.5306C10.961 15.6004 10.8783 15.6557 10.7872 15.6934C10.6962 15.7312 10.5986 15.7506 10.5 15.7506C10.4014 15.7506 10.3038 15.7312 10.2128 15.6934C10.1217 15.6557 10.039 15.6004 9.96937 15.5306L7.71937 13.2806C7.57864 13.1399 7.49958 12.949 7.49958 12.75C7.49958 12.551 7.57864 12.3601 7.71937 12.2194C7.86011 12.0786 8.05098 11.9996 8.25 11.9996C8.44902 11.9996 8.63989 12.0786 8.78063 12.2194L10.5 13.9397L15.2194 9.21937C15.289 9.14964 15.3717 9.09432 15.4628 9.05658C15.5538 9.01884 15.6514 8.99941 15.75 8.99941C15.8486 8.99941 15.9462 9.01884 16.0372 9.05658C16.1283 9.09432 16.211 9.14964 16.2806 9.21937Z"
      fill="currentColor"
    />
  </svg>
);

// Competitor line colors
const COMPETITOR_COLORS = [
  { stroke: '#3b82f6', name: 'Blue' },    // Blue
  { stroke: '#f59e0b', name: 'Amber' },   // Amber
  { stroke: '#8b5cf6', name: 'Purple' },  // Purple
];

const PriceHistory = ({
  vehicleYear,
  make,
  model,
  trim,
  asNewValue,
  previousYearValue,
  currentValue,
  forecastYear1Value,
  forecastYear2Value,
  expertTip,
  shopUrl = '#',
  tradeInUrl = '#',
  competitors,
}: PriceHistoryProps) => {
  const [activeTab, setActiveTab] = useState<'history' | 'forecast'>('history');
  const [_hoveredPoint, setHoveredPoint] = useState<number | null>(null);
  void _hoveredPoint; // Suppress unused warning - used for future tooltip feature
  const [hoveredColumn, setHoveredColumn] = useState<number | null>(null);
  const [selectedColumn, setSelectedColumn] = useState<number>(2); // Default to current value column
  const [showCompetitors, setShowCompetitors] = useState<boolean>(false);
  const [showCompetitorOverlay, setShowCompetitorOverlay] = useState<boolean>(false);
  const [hoveredCompetitor, setHoveredCompetitor] = useState<number | null>(null); // Track which competitor is hovered
  const chartRef = useRef<HTMLDivElement>(null);

  // Determine which column to highlight (hovered takes precedence, then selected)
  const activeColumn = hoveredColumn !== null ? hoveredColumn : selectedColumn;

  const formatCurrency = useCallback((value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  }, []);

  // Calculate percentage change
  const calculatePercentChange = useCallback((oldValue: number, newValue: number) => {
    if (oldValue === 0) return 0;
    return ((newValue - oldValue) / oldValue) * 100;
  }, []);

  // Calculate the years for display based on active tab
  const years = useMemo(() => {
    const currentYear = new Date().getFullYear();
    if (activeTab === 'history') {
      // For history tab, show 3 consecutive years ending with current year
      return [currentYear - 2, currentYear - 1, currentYear];
    } else {
      // For forecast tab, show current year and next 2 years
      return [currentYear, currentYear + 1, currentYear + 2];
    }
  }, [activeTab]);

  // Get the display values based on active tab
  const displayValues = useMemo(() => {
    if (activeTab === 'history') {
      return {
        first: asNewValue,
        firstLabel: 'As New',
        second: previousYearValue,
        secondLabel: '',
        third: currentValue,
        thirdLabel: 'Average Current Value',
        change: asNewValue - currentValue,
        changeLabel: 'Since Previous Year',
        percentChanges: [
          0,
          calculatePercentChange(asNewValue, previousYearValue),
          calculatePercentChange(previousYearValue, currentValue),
        ],
      };
    } else {
      return {
        first: currentValue,
        firstLabel: 'Current Value',
        second: forecastYear1Value,
        secondLabel: 'Forecast',
        third: forecastYear2Value,
        thirdLabel: 'Estimated Forecasted Value',
        change: currentValue - forecastYear2Value,
        changeLabel: 'In Next Two Years',
        percentChanges: [
          0,
          calculatePercentChange(currentValue, forecastYear1Value),
          calculatePercentChange(forecastYear1Value, forecastYear2Value),
        ],
      };
    }
  }, [activeTab, asNewValue, previousYearValue, currentValue, forecastYear1Value, forecastYear2Value, calculatePercentChange]);

  // Calculate positions for the chart line
  const chartPositions = useMemo(() => {
    const { first, second, third } = displayValues;
    const maxValue = Math.max(first, second, third);
    const minValue = Math.min(first, second, third);
    const range = maxValue - minValue || 1;
    const padding = range * 0.3;
    const adjustedMax = maxValue + padding;
    const adjustedMin = minValue - padding;
    const adjustedRange = adjustedMax - adjustedMin;

    return {
      start: ((adjustedMax - first) / adjustedRange) * 100,
      mid: ((adjustedMax - second) / adjustedRange) * 100,
      end: ((adjustedMax - third) / adjustedRange) * 100,
    };
  }, [displayValues]);

  // Keyboard navigation handler
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowLeft':
        e.preventDefault();
        setSelectedColumn(prev => Math.max(0, prev - 1));
        break;
      case 'ArrowRight':
        e.preventDefault();
        setSelectedColumn(prev => Math.min(2, prev + 1));
        break;
      case 'Tab':
        if (e.shiftKey) {
          setActiveTab(prev => prev === 'forecast' ? 'history' : 'forecast');
          e.preventDefault();
        }
        break;
    }
  }, []);

  // Touch handler for mobile
  const handleColumnTouch = useCallback((columnIndex: number) => {
    setSelectedColumn(columnIndex);
    setHoveredColumn(columnIndex);
    setHoveredPoint(columnIndex);
    
    // Clear hover state after a delay on touch
    setTimeout(() => {
      setHoveredColumn(null);
      setHoveredPoint(null);
    }, 2000);
  }, []);

  // Get value for a specific column index
  const getValueForColumn = useCallback((index: number) => {
    switch (index) {
      case 0: return displayValues.first;
      case 1: return displayValues.second;
      case 2: return displayValues.third;
      default: return 0;
    }
  }, [displayValues]);

  // Render trend indicator
  const renderTrendIndicator = (percentChange: number) => {
    if (percentChange === 0) return null;
    
    const isNegative = percentChange < 0;
    const formattedPercent = Math.abs(percentChange).toFixed(1);
    
    return (
      <span className={`price-history__trend ${isNegative ? 'price-history__trend--down' : 'price-history__trend--up'}`}>
        {isNegative ? <TrendingDown size={14} /> : <TrendingUp size={14} />}
        <span>{formattedPercent}%</span>
      </span>
    );
  };

  // Calculate current vehicle's depreciation for comparison
  const currentVehicleDepreciation = useMemo(() => {
    const totalChange = asNewValue - currentValue;
    return ((totalChange / asNewValue) * 100);
  }, [asNewValue, currentValue]);

  // Sort competitors by depreciation (best retention first)
  const sortedCompetitors = useMemo(() => {
    if (!competitors) return [];
    return [...competitors].sort((a, b) => a.depreciationPercent - b.depreciationPercent);
  }, [competitors]);

  // Get top 3 competitors for chart overlay
  const topCompetitors = useMemo(() => {
    return sortedCompetitors.slice(0, 3);
  }, [sortedCompetitors]);

  // Calculate competitor chart positions (using same scale as main vehicle)
  const competitorChartPositions = useMemo(() => {
    if (!topCompetitors.length) return [];
    
    // Get all values to determine scale (include main vehicle and all competitors)
    const allValues = [
      asNewValue, previousYearValue, currentValue,
      ...topCompetitors.flatMap(c => [c.asNewValue, c.previousYearValue || (c.asNewValue + c.currentValue) / 2, c.currentValue])
    ];
    
    const maxValue = Math.max(...allValues);
    const minValue = Math.min(...allValues);
    const range = maxValue - minValue || 1;
    const padding = range * 0.3;
    const adjustedMax = maxValue + padding;
    const adjustedMin = minValue - padding;
    const adjustedRange = adjustedMax - adjustedMin;
    
    return topCompetitors.map((competitor, index) => {
      // Use previousYearValue if provided, otherwise interpolate
      const midValue = competitor.previousYearValue || (competitor.asNewValue + competitor.currentValue) / 2;
      
      return {
        name: competitor.name,
        color: COMPETITOR_COLORS[index],
        start: ((adjustedMax - competitor.asNewValue) / adjustedRange) * 100,
        mid: ((adjustedMax - midValue) / adjustedRange) * 100,
        end: ((adjustedMax - competitor.currentValue) / adjustedRange) * 100,
      };
    });
  }, [topCompetitors, asNewValue, previousYearValue, currentValue]);

  return (
    <div 
      className="price-history u-card"
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="application"
      aria-label="Price history chart. Use arrow keys to navigate between data points."
    >
      <h2 className="price-history__title u-font-heading u-font-bold">Price History and Trends</h2>
      
      {/* Competitor Comparison Section */}
      {competitors && competitors.length > 0 && (
        <div className="price-history__competitors u-rounded-lg u-overflow-hidden">
          <button 
            className="price-history__competitors-toggle u-flex-between u-w-full u-cursor-pointer u-transition"
            onClick={() => setShowCompetitors(!showCompetitors)}
            aria-expanded={showCompetitors}
          >
            <span className="price-history__competitors-toggle-text u-uppercase">
              Compare with Closest Competitors
            </span>
            {showCompetitors ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>
          
          {showCompetitors && (
            <div className="price-history__competitors-table">
              <div className="price-history__competitors-header">
                <span className="price-history__competitors-col price-history__competitors-col--vehicle">Vehicle</span>
                <span className="price-history__competitors-col price-history__competitors-col--asnew">As New</span>
                <span className="price-history__competitors-col price-history__competitors-col--current">Current Value</span>
                <span className="price-history__competitors-col price-history__competitors-col--depreciation">Depreciation</span>
              </div>
              
              {/* Current Vehicle Row */}
              <div className="price-history__competitors-row price-history__competitors-row--current">
                <span className="price-history__competitors-col price-history__competitors-col--vehicle">
                  <strong>{vehicleYear} {make} {model}</strong>
                  <span className="price-history__competitors-badge">This Vehicle</span>
                </span>
                <span className="price-history__competitors-col price-history__competitors-col--asnew">
                  {formatCurrency(asNewValue)}
                </span>
                <span className="price-history__competitors-col price-history__competitors-col--current">
                  {formatCurrency(currentValue)}
                </span>
                <span className={`price-history__competitors-col price-history__competitors-col--depreciation ${currentVehicleDepreciation <= sortedCompetitors[0]?.depreciationPercent ? 'price-history__competitors-col--best' : ''}`}>
                  {currentVehicleDepreciation.toFixed(1)}%
                </span>
              </div>
              
              {/* Competitor Rows */}
              {sortedCompetitors.map((competitor, index) => (
                <div key={index} className="price-history__competitors-row">
                  <span className="price-history__competitors-col price-history__competitors-col--vehicle">
                    {competitor.name}
                    {index === 0 && competitor.depreciationPercent < currentVehicleDepreciation && (
                      <span className="price-history__competitors-badge price-history__competitors-badge--best">Best Retention</span>
                    )}
                  </span>
                  <span className="price-history__competitors-col price-history__competitors-col--asnew">
                    {formatCurrency(competitor.asNewValue)}
                  </span>
                  <span className="price-history__competitors-col price-history__competitors-col--current">
                    {formatCurrency(competitor.currentValue)}
                  </span>
                  <span className={`price-history__competitors-col price-history__competitors-col--depreciation ${index === 0 ? 'price-history__competitors-col--best' : ''}`}>
                    {competitor.depreciationPercent.toFixed(1)}%
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      
      <div className="price-history__card u-card u-overflow-hidden">
        {/* Expert Tip */}
        {expertTip && (
          <div className="price-history__expert-tip u-flex u-flex-col u-gap-2 u-p-4">
            <div className="price-history__expert-tip-header u-flex u-items-center u-gap-2">
              <div className="price-history__expert-tip-icon u-flex-center u-text-success">
                <SealCheckIcon size={24} />
              </div>
              <span className="price-history__expert-tip-label u-font-heading u-font-bold">C/D Expert Tip:</span>
            </div>
            <p className="price-history__expert-tip-text u-m-0">
              {(() => {
                // Make the first sentence bold (up to the first period)
                const match = expertTip.match(/^([^.]+\.)\s*/);
                if (match) {
                  return (
                    <>
                      <strong>{match[1]}</strong> {expertTip.slice(match[0].length)}
                    </>
                  );
                }
                return expertTip;
              })()}
            </p>
          </div>
        )}

        {/* Header */}
        <div className="price-history__header u-flex-between u-p-4">
          <h3 className="price-history__vehicle-name u-font-heading u-font-bold u-m-0">
            {vehicleYear} {make} {model} {trim}
          </h3>
          <div className="price-history__powered-by u-flex u-items-center u-gap-2">
            <span className="price-history__powered-by-text u-text-muted u-uppercase u-text-xs">POWERED BY</span>
            <svg 
              className="price-history__powered-by-logo" 
              viewBox="86 31 124 65" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              aria-label="Black Book"
            >
              <path 
                d="M159.5,70 C162.234825,70 164,72.2783462 164,74.9997043 C164,77.7222452 162.234825,80 159.5,80 C156.765175,80 155,77.7222452 155,74.9997043 C155,72.2783462 156.765175,70 159.5,70 Z M121,71.5 C121,72.5636085 120.269394,73 118.980818,73 L117,73 L117,70 L118.980818,70 C120.115374,70 121,70.4363915 121,71.5 Z M119.622941,76 C120.975592,76 122,76.5809809 122,77.9996846 C122,79.4190191 120.975592,80 119.622941,80 L117,80 L117,76 L119.622941,76 Z M142,54 L144,49 L146,54 L142,54 Z M112,49.4994884 C112,50.5636085 111.269394,51 109.980818,51 L108,51 L108,48 L109.980818,48 C111.115374,48 112,48.4363915 112,49.4994884 Z M138.5,70 C141.234825,70 143,72.2783462 143,74.9997043 C143,77.7222452 141.234825,80 138.5,80 C135.765175,80 134,77.7222452 134,74.9997043 C134,72.2783462 135.765175,70 138.5,70 Z M184.291206,59.3020233 L187.4771,59.3020233 L181.305202,52.1677264 L186.796298,45.2744729 L183.789717,45.2744729 L178.780121,51.5668816 L178.780121,45.2744729 L176.375562,45.2744729 L176.375562,59.3020233 L178.780121,59.3020233 L178.780121,52.9696367 L184.291206,59.3020233 Z M181.488043,81.7513952 L184.674524,81.7513952 L178.502039,74.6170983 L183.993723,67.7226689 L180.987142,67.7226689 L175.976958,74.0156656 L175.976958,67.7226689 L173.572398,67.7226689 L173.572398,81.7513952 L175.976958,81.7513952 L175.976958,75.4184206 L181.488043,81.7513952 Z M163.837167,59.5424788 C167.384039,59.5424788 169.22773,57.1585007 169.22773,57.1585007 L167.624495,55.5746692 C167.624495,55.5746692 166.302281,57.2984235 163.837167,57.2984235 C161.07163,57.2984235 159.167972,54.9938134 159.167972,52.2882481 C159.167972,49.5826829 161.07163,47.2780727 163.837167,47.2780727 C166.141782,47.2780727 167.404028,48.8213384 167.404028,48.8213384 L169.02784,47.2380948 C169.02784,47.2380948 167.204138,45.0328416 163.837167,45.0328416 C159.788807,45.0328416 156.722847,48.1399499 156.722847,52.2882481 C156.722847,56.4359584 159.788807,59.5424788 163.837167,59.5424788 Z M159.444291,81.9918507 C163.532041,81.9918507 166.538622,78.8853303 166.538622,74.737032 C166.538622,70.5887338 163.532041,67.4822134 159.444291,67.4822134 C155.355952,67.4822134 152.349959,70.5887338 152.349959,74.737032 C152.349959,78.8853303 155.355952,81.9918507 159.444291,81.9918507 Z M148.353335,59.3020233 L150.777883,59.3020233 L145.326765,45.2744729 L142.88164,45.2744729 L137.43111,59.3020233 L139.855658,59.3020233 L141.138482,55.9756243 L147.070511,55.9756243 L148.353335,59.3020233 Z M138.221851,81.9918507 C142.309602,81.9918507 145.316183,78.8853303 145.316183,74.737032 C145.316183,70.5887338 142.309602,67.4822134 138.221851,67.4822134 C134.134101,67.4822134 131.128108,70.5887338 131.128108,74.737032 C131.128108,78.8853303 134.134101,81.9918507 138.221851,81.9918507 Z M122.409964,59.3020233 L130.787119,59.3020233 L131.530827,57.0174022 L124.814523,57.0174022 L124.814523,45.2744729 L122.409964,45.2744729 L122.409964,59.3020233 Z M119.404559,81.7513952 C122.050162,81.7513952 124.094331,80.0676188 124.094331,77.602509 C124.094331,75.0774324 122.110129,74.3560659 121.910239,74.316088 C122.110129,74.2561211 123.372964,73.4342218 123.372964,71.7310444 C123.372964,68.7850237 121.188871,67.7226689 118.903658,67.7226689 L114.354397,67.7226689 L114.354397,81.7513952 L119.404559,81.7513952 Z M105.813215,59.3020233 L110.862789,59.3020233 C113.508392,59.3020233 115.552561,57.6188349 115.552561,55.1531372 C115.552561,52.6286484 113.568359,51.9078699 113.367881,51.867304 C113.568359,51.8073371 114.831193,50.9854379 114.831193,49.2816726 C114.831193,46.3362397 112.646513,45.2744729 110.361888,45.2744729 L105.813215,45.2744729 L105.813215,59.3020233 Z M193.978816,31 L210,96 L102.020596,96 L86,31 L193.978816,31 Z M110.622941,53 C111.975592,53 113,53.5804416 113,54.9993691 C113,56.4195584 111.975592,57 110.622941,57 L108,57 L108,53 L110.622941,53 Z" 
                fill="currentColor"
              />
            </svg>
          </div>
        </div>

        {/* Tab Toggle */}
        <Tabs
          items={[
            { value: 'history', label: 'Previous Two Years' },
            { value: 'forecast', label: 'Forecasted Value' },
          ]}
          value={activeTab}
          onChange={setActiveTab}
          variant="underline"
          ariaLabel="Price history"
        />

        {/* Competitor Overlay Toggle */}
        {competitors && competitors.length > 0 && (
          <div className="price-history__overlay-toggle">
            <label className="price-history__overlay-toggle-label">
              <input
                type="checkbox"
                checked={showCompetitorOverlay}
                onChange={(e) => setShowCompetitorOverlay(e.target.checked)}
                className="price-history__overlay-toggle-checkbox"
              />
              <span className="price-history__overlay-toggle-switch" />
              <span className="price-history__overlay-toggle-text">Compare with Top 3 Competitors</span>
            </label>
            {showCompetitorOverlay && (
              <div className="price-history__overlay-legend">
                <div className="price-history__overlay-legend-item price-history__overlay-legend-item--current">
                  <span className="price-history__overlay-legend-line" style={{ background: '#dc2626' }} />
                  <span className="price-history__overlay-legend-name">{make} {model}</span>
                </div>
                {competitorChartPositions.map((comp, index) => (
                  <div key={index} className="price-history__overlay-legend-item">
                    <span className="price-history__overlay-legend-line" style={{ background: comp.color.stroke }} />
                    <span className="price-history__overlay-legend-name">{comp.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Chart */}
        <div 
          ref={chartRef}
          id="price-history-chart"
          className={`price-history__chart ${activeTab === 'forecast' ? 'price-history__chart--forecast' : ''}`}
          role="tabpanel"
        >
          {/* Year Labels */}
          <div className="price-history__chart-years">
            {years.map((year, index) => (
              <span 
                key={year} 
                className={`price-history__chart-year ${activeColumn === index ? 'price-history__chart-year--active' : ''} ${activeTab === 'forecast' && index < 1 ? 'price-history__chart-year--faded' : ''}`}
              >
                {year}
              </span>
            ))}
          </div>

          {/* Chart Area */}
          <div className="price-history__chart-area">
            {/* Hover columns for interaction */}
            {[0, 1, 2].map((index) => (
              <div 
                key={index}
                className={`price-history__chart-column ${activeColumn === index ? 'price-history__chart-column--active' : ''}`}
                onMouseEnter={() => { setHoveredColumn(index); setHoveredPoint(index); }}
                onMouseLeave={() => { setHoveredColumn(null); setHoveredPoint(null); }}
                onTouchStart={() => handleColumnTouch(index)}
                role="button"
                aria-label={`${years[index]} value: ${formatCurrency(getValueForColumn(index))}`}
                tabIndex={-1}
              />
            ))}
            
            {/* Background gradient - follows active column */}
            <div 
              className={`price-history__chart-gradient price-history__chart-gradient--column-${activeColumn}`} 
              aria-hidden="true"
            />
            
            {/* Line - key forces re-render to trigger animation */}
            <svg key={`${activeTab}-${showCompetitorOverlay}`} className="price-history__chart-line" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
              {/* Competitor overlay lines (rendered first so main line is on top) */}
              {showCompetitorOverlay && competitorChartPositions.map((comp, index) => (
                <g key={index}>
                  {/* First segment */}
                  <path
                    className="price-history__line-segment price-history__line-segment--competitor"
                    d={`M 16.66,${comp.start} L 50,${comp.mid}`}
                    stroke={comp.color.stroke}
                    strokeWidth="2"
                    fill="none"
                    vectorEffect="non-scaling-stroke"
                    style={{ animationDelay: `${0.2 + index * 0.15}s` }}
                  />
                  {/* Second segment */}
                  <path
                    className="price-history__line-segment price-history__line-segment--competitor"
                    d={`M 50,${comp.mid} L 83.33,${comp.end}`}
                    stroke={comp.color.stroke}
                    strokeWidth="2"
                    fill="none"
                    vectorEffect="non-scaling-stroke"
                    style={{ animationDelay: `${0.4 + index * 0.15}s` }}
                  />
                </g>
              ))}
              
              {/* Solid line extending from left edge (only on forecast tab) */}
              {activeTab === 'forecast' && (
                <path
                  className="price-history__line-segment"
                  d={`M 0,${chartPositions.start - 5} L 16.66,${chartPositions.start}`}
                  stroke="#dc2626"
                  strokeWidth="2"
                  fill="none"
                  vectorEffect="non-scaling-stroke"
                  style={{ opacity: 1 }}
                />
              )}
              {/* First segment */}
              <path
                className={`price-history__line-segment ${activeTab === 'forecast' ? 'price-history__line-segment--dashed' : ''}`}
                d={`M 16.66,${chartPositions.start} L 50,${chartPositions.mid}`}
                stroke="#dc2626"
                strokeWidth="2"
                fill="none"
                vectorEffect="non-scaling-stroke"
                style={{ opacity: activeTab === 'forecast' ? 0.6 : 1 }}
              />
              {/* Second segment */}
              <path
                className={`price-history__line-segment ${activeTab === 'forecast' ? 'price-history__line-segment--dashed' : ''}`}
                d={`M 50,${chartPositions.mid} L 83.33,${chartPositions.end}`}
                stroke="#dc2626"
                strokeWidth="2"
                fill="none"
                vectorEffect="non-scaling-stroke"
                style={{ 
                  opacity: activeTab === 'forecast' ? 0.6 : 1,
                  animationDelay: '0.4s'
                }}
              />
              {/* Dashed forecast indicator (only on history tab) */}
              {activeTab === 'history' && (
                <path
                  className="price-history__line-segment price-history__line-segment--dashed"
                  d={`M 83.33,${chartPositions.end} L 100,${chartPositions.end + 5}`}
                  stroke="#dc2626"
                  strokeWidth="2"
                  fill="none"
                  vectorEffect="non-scaling-stroke"
                  style={{ 
                    opacity: 0.5,
                    animationDelay: '0.8s'
                  }}
                />
              )}
            </svg>

            {/* Data Points */}
            <div 
              key={`point1-${activeTab}`}
              className={`price-history__chart-point price-history__chart-point--first ${activeColumn === 0 ? 'price-history__chart-point--active' : ''}`}
              style={{ left: '16.66%', top: `${chartPositions.start}%` }}
              aria-hidden="true"
            />
            <div 
              key={`point2-${activeTab}`}
              className={`price-history__chart-point price-history__chart-point--second ${activeTab === 'forecast' ? 'price-history__chart-point--hollow' : ''} ${activeColumn === 1 ? 'price-history__chart-point--active' : ''}`}
              style={{ left: '50%', top: `${chartPositions.mid}%` }}
              aria-hidden="true"
            />
            <div 
              key={`point3-${activeTab}`}
              className={`price-history__chart-point price-history__chart-point--third ${activeTab === 'forecast' ? 'price-history__chart-point--hollow' : ''} ${activeColumn === 2 ? 'price-history__chart-point--active' : ''}`}
              style={{ left: '83.33%', top: `${chartPositions.end}%` }}
              aria-hidden="true"
            />

            {/* Competitor Data Points (as HTML divs to avoid SVG distortion) */}
            {showCompetitorOverlay && competitorChartPositions.map((comp, index) => (
              <div key={`competitor-points-${index}`}>
                <div 
                  className={`price-history__chart-point price-history__chart-point--competitor ${hoveredCompetitor === index && activeColumn === 0 ? 'price-history__chart-point--active' : ''}`}
                  style={{ 
                    left: '16.66%', 
                    top: `${comp.start}%`,
                    borderColor: comp.color.stroke,
                    animationDelay: `${0.3 + index * 0.15}s`
                  }}
                  onMouseEnter={() => { setHoveredCompetitor(index); setHoveredColumn(0); }}
                  onMouseLeave={() => { setHoveredCompetitor(null); setHoveredColumn(null); }}
                  aria-hidden="true"
                />
                <div 
                  className={`price-history__chart-point price-history__chart-point--competitor ${hoveredCompetitor === index && activeColumn === 1 ? 'price-history__chart-point--active' : ''}`}
                  style={{ 
                    left: '50%', 
                    top: `${comp.mid}%`,
                    borderColor: comp.color.stroke,
                    animationDelay: `${0.5 + index * 0.15}s`
                  }}
                  onMouseEnter={() => { setHoveredCompetitor(index); setHoveredColumn(1); }}
                  onMouseLeave={() => { setHoveredCompetitor(null); setHoveredColumn(null); }}
                  aria-hidden="true"
                />
                <div 
                  className={`price-history__chart-point price-history__chart-point--competitor ${hoveredCompetitor === index && activeColumn === 2 ? 'price-history__chart-point--active' : ''}`}
                  style={{ 
                    left: '83.33%', 
                    top: `${comp.end}%`,
                    borderColor: comp.color.stroke,
                    animationDelay: `${0.7 + index * 0.15}s`
                  }}
                  onMouseEnter={() => { setHoveredCompetitor(index); setHoveredColumn(2); }}
                  onMouseLeave={() => { setHoveredCompetitor(null); setHoveredColumn(null); }}
                  aria-hidden="true"
                />
              </div>
            ))}

            {/* Tooltip - always show for active column (hovered or selected) */}
            {(() => {
              // Helper to get competitor value for a column
              const getCompetitorValueForColumn = (compData: typeof topCompetitors[0], colIndex: number) => {
                const midValue = compData.previousYearValue || (compData.asNewValue + compData.currentValue) / 2;
                switch (colIndex) {
                  case 0: return compData.asNewValue;
                  case 1: return midValue;
                  case 2: return compData.currentValue;
                  default: return 0;
                }
              };

              // When competitor overlay is ON, show comparison tooltip with all vehicles
              if (showCompetitorOverlay && topCompetitors.length > 0) {
                return (
                  <div 
                    className="price-history__forecast-tooltip price-history__forecast-tooltip--visible price-history__forecast-tooltip--comparison"
                    style={{ 
                      left: activeColumn === 0 ? '16.66%' : activeColumn === 1 ? '50%' : '83.33%', 
                      top: `${activeColumn === 0 ? chartPositions.start : activeColumn === 1 ? chartPositions.mid : chartPositions.end}%`
                    }}
                    role="tooltip"
                  >
                    <span className="price-history__forecast-tooltip-label">
                      {years[activeColumn]} Values:
                    </span>
                    
                    {/* All vehicles comparison list */}
                    <div className="price-history__tooltip-comparison">
                      {/* Build sorted list with all vehicles for best retention badge */}
                      {(() => {
                        const mainCurrentValue = getValueForColumn(activeColumn);
                        const mainDepreciation = ((asNewValue - mainCurrentValue) / asNewValue) * 100;
                        const mainDollarsLost = asNewValue - mainCurrentValue;
                        
                        // Create array of all vehicles with their depreciation data
                        const allVehicles = [
                          {
                            name: `${make} ${model}`,
                            value: mainCurrentValue,
                            depreciation: mainDepreciation,
                            dollarsLost: mainDollarsLost,
                            asNewValue: asNewValue,
                            color: '#dc2626',
                            isMain: true,
                            diff: 0
                          },
                          ...topCompetitors.map((compData, index) => {
                            const compValue = getCompetitorValueForColumn(compData, activeColumn);
                            const compDepreciation = ((compData.asNewValue - compValue) / compData.asNewValue) * 100;
                            const compDollarsLost = compData.asNewValue - compValue;
                            return {
                              name: compData.name,
                              value: compValue,
                              depreciation: compDepreciation,
                              dollarsLost: compDollarsLost,
                              asNewValue: compData.asNewValue,
                              color: competitorChartPositions[index]?.color.stroke || '#666',
                              isMain: false,
                              diff: compValue - mainCurrentValue,
                              originalIndex: index
                            };
                          })
                        ];
                        
                        // Find the best retention (lowest depreciation %)
                        const bestRetentionVehicle = allVehicles.reduce((best, current) => 
                          current.depreciation < best.depreciation ? current : best
                        );
                        
                        // Helper to get depreciation color class
                        const getDepreciationColorClass = (depreciation: number) => {
                          if (depreciation <= 15) return 'price-history__tooltip-comparison-depreciation--excellent';
                          if (depreciation <= 25) return 'price-history__tooltip-comparison-depreciation--good';
                          if (depreciation <= 35) return 'price-history__tooltip-comparison-depreciation--moderate';
                          return 'price-history__tooltip-comparison-depreciation--poor';
                        };
                        
                        // Calculate monthly depreciation
                        const getMonthlyDepreciation = (dollarsLost: number) => {
                          // Assuming 5 years (60 months) for forecast period
                          const months = activeTab === 'forecast' ? 24 : 24; // 2 years shown
                          return Math.round(dollarsLost / months);
                        };
                        
                        return allVehicles.map((vehicle, idx) => (
                          <div 
                            key={idx} 
                            className={`price-history__tooltip-comparison-row ${vehicle.isMain ? 'price-history__tooltip-comparison-row--main' : ''} ${!vehicle.isMain && hoveredCompetitor === (vehicle as { originalIndex?: number }).originalIndex ? 'price-history__tooltip-comparison-row--active' : ''}`}
                          >
                            <span 
                              className="price-history__tooltip-comparison-color" 
                              style={{ background: vehicle.color }}
                            />
                            <span className="price-history__tooltip-comparison-name">
                              {vehicle.name}
                              {vehicle.name === bestRetentionVehicle.name && (
                                <span className="price-history__tooltip-best-badge">Best</span>
                              )}
                            </span>
                            <span className="price-history__tooltip-comparison-value">
                              {formatCurrency(vehicle.value)}
                              <span className="price-history__tooltip-comparison-meta">
                                {!vehicle.isMain && vehicle.diff !== 0 && (
                                  <span className={`price-history__tooltip-comparison-diff ${vehicle.diff > 0 ? 'price-history__tooltip-comparison-diff--higher' : 'price-history__tooltip-comparison-diff--lower'}`}>
                                    {vehicle.diff > 0 ? '+' : ''}{formatCurrency(vehicle.diff)}
                                  </span>
                                )}
                                <span className={`price-history__tooltip-comparison-depreciation ${getDepreciationColorClass(vehicle.depreciation)}`}>
                                  ↓ {vehicle.depreciation.toFixed(1)}%
                                </span>
                                <span className="price-history__tooltip-comparison-dollars-lost">
                                  −{formatCurrency(vehicle.dollarsLost)} lost
                                </span>
                                <span className="price-history__tooltip-comparison-monthly">
                                  ≈ {formatCurrency(getMonthlyDepreciation(vehicle.dollarsLost))}/mo
                                </span>
                              </span>
                            </span>
                          </div>
                        ));
                      })()}
                    </div>
                  </div>
                );
              }
              
              // Default single-vehicle tooltip when overlay is OFF
              return (
                <div 
                  className="price-history__forecast-tooltip price-history__forecast-tooltip--visible"
                  style={{ 
                    left: activeColumn === 0 ? '16.66%' : activeColumn === 1 ? '50%' : '83.33%', 
                    top: `${activeColumn === 0 ? chartPositions.start : activeColumn === 1 ? chartPositions.mid : chartPositions.end}%`
                  }}
                  role="tooltip"
                >
                  <span className="price-history__forecast-tooltip-label">
                    {years[activeColumn]} Value:
                  </span>
                  <span className="price-history__forecast-tooltip-value">
                    {formatCurrency(getValueForColumn(activeColumn))}
                  </span>
                  {/* Year-over-year change */}
                  {activeColumn > 0 && (
                    <span className="price-history__forecast-tooltip-change">
                      {(() => {
                        const yearChange = activeColumn === 1 
                          ? displayValues.first - displayValues.second 
                          : displayValues.second - displayValues.third;
                        const isDepreciation = yearChange > 0;
                        return `${isDepreciation ? '↓' : '↑'} ${formatCurrency(Math.abs(yearChange))} from previous year`;
                      })()}
                    </span>
                  )}
                  {/* Total depreciation from original As New value - always show */}
                  <span className="price-history__forecast-tooltip-total">
                    {(() => {
                      const currentColumnValue = getValueForColumn(activeColumn);
                      const totalChange = asNewValue - currentColumnValue;
                      const totalPercent = ((totalChange / asNewValue) * 100).toFixed(1);
                      const isDepreciation = totalChange > 0;
                      if (activeColumn === 0 && activeTab === 'history') {
                        return 'Original As New Value';
                      }
                      return `Total ${isDepreciation ? 'depreciation' : 'appreciation'} from new: ${formatCurrency(Math.abs(totalChange))} (${totalPercent}%)`;
                    })()}
                  </span>
                </div>
              );
            })()}
          </div>

          {/* Value Labels with Trend Indicators */}
          <div className="price-history__chart-values">
            <div className={`price-history__chart-value ${activeColumn === 0 ? 'price-history__chart-value--active' : ''}`}>
              <span className="price-history__chart-value-amount">
                <AnimatedCurrency value={displayValues.first} />
              </span>
              <span className="price-history__chart-value-label">{displayValues.firstLabel}</span>
            </div>
            <div className={`price-history__chart-value ${activeColumn === 1 ? 'price-history__chart-value--active' : ''}`}>
              <span className="price-history__chart-value-amount">
                <AnimatedCurrency value={displayValues.second} />
              </span>
              {renderTrendIndicator(displayValues.percentChanges[1])}
              <span className="price-history__chart-value-label">{displayValues.secondLabel}</span>
            </div>
            <div className={`price-history__chart-value ${activeColumn === 2 ? 'price-history__chart-value--active' : ''} ${activeTab === 'forecast' ? 'price-history__chart-value--highlight' : ''}`}>
              <span className="price-history__chart-value-amount">
                <AnimatedCurrency value={displayValues.third} />
              </span>
              {renderTrendIndicator(displayValues.percentChanges[2])}
              <span className="price-history__chart-value-label">{displayValues.thirdLabel}</span>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <p className="price-history__disclaimer">
          *These values are based on a vehicle in average condition with 15,000 miles driven per year.
        </p>

        {/* CTAs */}
        <div className="price-history__ctas u-flex u-gap-3 u-p-4 u-border-t">
          <a href={shopUrl} className="price-history__cta price-history__cta--primary u-flex-1 u-flex-center u-font-heading u-font-bold u-uppercase u-rounded-sm u-transition">
            SHOP FOR A {vehicleYear} MODEL
          </a>
          <a href={tradeInUrl} className="price-history__cta price-history__cta--secondary u-flex-1 u-flex-center u-font-heading u-font-bold u-uppercase u-rounded-sm u-transition">
            GET YOUR TRADE-IN VALUE
          </a>
        </div>
      </div>
    </div>
  );
};

export default PriceHistory;
