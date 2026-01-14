import { useState, useEffect, useMemo } from 'react';
import { Calendar, ChevronDown, ChevronUp, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { getAllVehicles } from '../../services/vehicleService';
import './RatingHistory.css';

interface HistoryEntry {
  id: number;
  vehicle_id: string;
  category: string;
  old_rating: number;
  new_rating: number;
  changed_at: string;
}

interface RatingHistoryProps {
  isOpen: boolean;
  onClose: () => void;
}

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const RatingHistory = ({ isOpen, onClose }: RatingHistoryProps) => {
  // Get all vehicles to look up make/model/year
  const allVehicles = useMemo(() => getAllVehicles(), []);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [groupedHistory, setGroupedHistory] = useState<Record<string, HistoryEntry[]>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
  const [expandedMonths, setExpandedMonths] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (isOpen) {
      fetchHistory();
    }
  }, [isOpen, selectedYear, selectedMonth]);

  const fetchHistory = async () => {
    setIsLoading(true);
    try {
      let url = '/.netlify/functions/get-rating-history?';
      url += `year=${selectedYear}`;
      if (selectedMonth !== null) {
        url += `&month=${selectedMonth + 1}`;
      }
      
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setHistory(data.history || []);
        setGroupedHistory(data.groupedByMonth || {});
        
        // Auto-expand the first month
        const months = Object.keys(data.groupedByMonth || {});
        if (months.length > 0) {
          setExpandedMonths(new Set([months[0]]));
        }
      }
    } catch (error) {
      console.error('Error fetching history:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMonth = (monthKey: string) => {
    const newExpanded = new Set(expandedMonths);
    if (newExpanded.has(monthKey)) {
      newExpanded.delete(monthKey);
    } else {
      newExpanded.add(monthKey);
    }
    setExpandedMonths(newExpanded);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getMonthLabel = (monthKey: string) => {
    const [year, month] = monthKey.split('-');
    return `${MONTHS[parseInt(month) - 1]} ${year}`;
  };

  const getRatingChange = (oldRating: number, newRating: number) => {
    const diff = newRating - oldRating;
    if (diff > 0) return { icon: TrendingUp, color: 'green', label: `+${diff.toFixed(1)}` };
    if (diff < 0) return { icon: TrendingDown, color: 'red', label: diff.toFixed(1) };
    return { icon: Minus, color: 'gray', label: '0' };
  };

  const formatCategory = (category: string) => {
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

  // Look up vehicle info by ID
  const getVehicleInfo = (vehicleId: string) => {
    const vehicle = allVehicles.find(v => v.id === vehicleId);
    if (vehicle) {
      return `${vehicle.year} ${vehicle.make} ${vehicle.model}`;
    }
    return vehicleId; // Fallback to ID if not found
  };

  if (!isOpen) return null;

  const years = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i);
  const sortedMonthKeys = Object.keys(groupedHistory).sort().reverse();

  return (
    <div className="rating-history__overlay" onClick={onClose}>
      <div className="rating-history__modal" onClick={(e) => e.stopPropagation()}>
        <div className="rating-history__header">
          <div className="rating-history__title">
            <Calendar size={24} />
            <h2>Rating Change History</h2>
          </div>
          <button className="rating-history__close" onClick={onClose}>×</button>
        </div>

        <div className="rating-history__filters">
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(parseInt(e.target.value))}
            className="rating-history__select"
          >
            {years.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>

          <select
            value={selectedMonth === null ? 'all' : selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value === 'all' ? null : parseInt(e.target.value))}
            className="rating-history__select"
          >
            <option value="all">All Months</option>
            {MONTHS.map((month, index) => (
              <option key={month} value={index}>{month}</option>
            ))}
          </select>
        </div>

        <div className="rating-history__content">
          {isLoading ? (
            <div className="rating-history__loading">Loading history...</div>
          ) : sortedMonthKeys.length === 0 ? (
            <div className="rating-history__empty">
              <Calendar size={48} />
              <p>No rating changes found for this period</p>
            </div>
          ) : (
            <div className="rating-history__timeline">
              {sortedMonthKeys.map(monthKey => {
                const entries = groupedHistory[monthKey];
                const isExpanded = expandedMonths.has(monthKey);
                
                return (
                  <div key={monthKey} className="rating-history__month">
                    <button
                      className="rating-history__month-header"
                      onClick={() => toggleMonth(monthKey)}
                    >
                      <span className="rating-history__month-label">
                        {getMonthLabel(monthKey)}
                      </span>
                      <span className="rating-history__month-count">
                        {entries.length} change{entries.length !== 1 ? 's' : ''}
                      </span>
                      {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </button>
                    
                    {isExpanded && (
                      <div className="rating-history__entries">
                        {entries.map((entry) => {
                          const change = getRatingChange(entry.old_rating, entry.new_rating);
                          const ChangeIcon = change.icon;
                          
                          return (
                            <div key={entry.id} className="rating-history__entry">
                              <div className="rating-history__entry-info">
                                <span className="rating-history__vehicle-name">
                                  {getVehicleInfo(entry.vehicle_id)}
                                </span>
                                <span className="rating-history__category">
                                  {formatCategory(entry.category)}
                                </span>
                              </div>
                              <div className="rating-history__entry-change">
                                <span className="rating-history__old-rating">
                                  {entry.old_rating.toFixed(1)}
                                </span>
                                <span className="rating-history__arrow">→</span>
                                <span className="rating-history__new-rating">
                                  {entry.new_rating.toFixed(1)}
                                </span>
                                <span className={`rating-history__diff rating-history__diff--${change.color}`}>
                                  <ChangeIcon size={14} />
                                  {change.label}
                                </span>
                              </div>
                              <div className="rating-history__entry-date">
                                {formatDate(entry.changed_at)}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="rating-history__footer">
          <span className="rating-history__total">
            Total: {history.length} change{history.length !== 1 ? 's' : ''}
          </span>
        </div>
      </div>
    </div>
  );
};

export default RatingHistory;

