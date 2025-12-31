import { useEffect, useRef } from 'react';
import { X, Trophy, TrendingUp, Fuel, Award, ExternalLink } from 'lucide-react';
import type { TopMPGVehicle } from '../../services/fuelEconomyService';
import './MPGRankingsModal.css';

interface MPGRankingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  vehicles: TopMPGVehicle[];
  currentRank: number | null;
  currentMake: string;
  currentModel: string;
  currentMPG: number;
  bodyStyle: string;
  year: number;
}

const MPGRankingsModal = ({
  isOpen,
  onClose,
  vehicles,
  currentRank,
  currentMake,
  currentModel,
  currentMPG,
  bodyStyle,
  year
}: MPGRankingsModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  // Handle click outside
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  if (!isOpen) return null;

  const categoryName = bodyStyle.charAt(0).toUpperCase() + bodyStyle.slice(1).toLowerCase();
  const topVehicle = vehicles[0];
  const currentVehicle = vehicles.find(v => v.isCurrentVehicle);

  // Get ranking badge info
  const getRankBadge = (rank: number) => {
    if (rank === 1) return { icon: <Trophy size={16} />, class: 'gold', label: '1st' };
    if (rank === 2) return { icon: <Award size={16} />, class: 'silver', label: '2nd' };
    if (rank === 3) return { icon: <Award size={16} />, class: 'bronze', label: '3rd' };
    return { icon: null, class: '', label: `${rank}th` };
  };

  const getRankingMessage = () => {
    if (!currentRank) return null;
    
    if (currentRank === 1) {
      return {
        type: 'excellent',
        message: `🏆 The ${currentMake} ${currentModel} is the most fuel-efficient ${categoryName.toLowerCase()} on the market!`
      };
    }
    if (currentRank <= 3) {
      return {
        type: 'great',
        message: `🥈 The ${currentMake} ${currentModel} ranks #${currentRank} in fuel efficiency among ${categoryName.toLowerCase()}s!`
      };
    }
    if (currentRank <= 5) {
      return {
        type: 'good',
        message: `✅ The ${currentMake} ${currentModel} is in the top 5 most fuel-efficient ${categoryName.toLowerCase()}s.`
      };
    }
    if (currentRank <= 10) {
      return {
        type: 'average',
        message: `📊 The ${currentMake} ${currentModel} ranks #${currentRank} in fuel efficiency for ${categoryName.toLowerCase()}s.`
      };
    }
    return {
      type: 'below',
      message: `📉 The ${currentMake} ${currentModel} ranks #${currentRank} in fuel efficiency. Consider hybrid options for better MPG.`
    };
  };

  const rankingMessage = getRankingMessage();

  return (
    <div className="mpg-rankings-modal__overlay" onClick={handleOverlayClick}>
      <div className="mpg-rankings-modal" ref={modalRef} role="dialog" aria-modal="true">
        {/* Header */}
        <header className="mpg-rankings-modal__header">
          <div className="mpg-rankings-modal__header-content">
            <div className="mpg-rankings-modal__icon">
              <TrendingUp size={24} />
            </div>
            <div>
              <h2 className="mpg-rankings-modal__title">
                Best MPG {categoryName}s
              </h2>
              <p className="mpg-rankings-modal__subtitle">
                {year} Model Year Rankings
              </p>
            </div>
          </div>
          <button className="mpg-rankings-modal__close" onClick={onClose} aria-label="Close">
            <X size={24} />
          </button>
        </header>

        {/* Current Vehicle Status */}
        {rankingMessage && (
          <div className={`mpg-rankings-modal__status mpg-rankings-modal__status--${rankingMessage.type}`}>
            <p>{rankingMessage.message}</p>
          </div>
        )}

        {/* Current Vehicle Highlight */}
        {currentRank && (
          <div className="mpg-rankings-modal__current">
            <div className="mpg-rankings-modal__current-rank">
              <span className="mpg-rankings-modal__rank-number">#{currentRank}</span>
              <span className="mpg-rankings-modal__rank-label">Your Vehicle</span>
            </div>
            <div className="mpg-rankings-modal__current-info">
              <span className="mpg-rankings-modal__current-name">
                {year} {currentMake} {currentModel}
              </span>
              <span className="mpg-rankings-modal__current-mpg">
                <Fuel size={16} />
                {currentMPG} MPG Combined
              </span>
            </div>
            {topVehicle && currentRank > 1 && (
              <div className="mpg-rankings-modal__current-diff">
                <span className="mpg-rankings-modal__diff-value">
                  {topVehicle.comb08 - currentMPG} MPG
                </span>
                <span className="mpg-rankings-modal__diff-label">behind #1</span>
              </div>
            )}
          </div>
        )}

        {/* Rankings Table */}
        <div className="mpg-rankings-modal__table-container">
          <table className="mpg-rankings-modal__table">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Vehicle</th>
                <th>Combined</th>
                <th>City</th>
                <th>Highway</th>
                <th>Fuel</th>
              </tr>
            </thead>
            <tbody>
              {vehicles.map((vehicle) => {
                const badge = getRankBadge(vehicle.rank);
                return (
                  <tr 
                    key={vehicle.id || `${vehicle.make}-${vehicle.model}`}
                    className={`mpg-rankings-modal__row ${vehicle.isCurrentVehicle ? 'mpg-rankings-modal__row--current' : ''} ${badge.class ? `mpg-rankings-modal__row--${badge.class}` : ''}`}
                  >
                    <td className="mpg-rankings-modal__rank-cell">
                      <span className={`mpg-rankings-modal__rank-badge ${badge.class ? `mpg-rankings-modal__rank-badge--${badge.class}` : ''}`}>
                        {badge.icon}
                        {badge.label}
                      </span>
                    </td>
                    <td className="mpg-rankings-modal__vehicle-cell">
                      <span className="mpg-rankings-modal__vehicle-name">
                        {vehicle.make} {vehicle.model}
                        {vehicle.isCurrentVehicle && (
                          <span className="mpg-rankings-modal__your-car">Your Car</span>
                        )}
                      </span>
                    </td>
                    <td className="mpg-rankings-modal__mpg-cell mpg-rankings-modal__mpg-cell--combined">
                      <strong>{vehicle.comb08}</strong>
                    </td>
                    <td className="mpg-rankings-modal__mpg-cell">
                      {vehicle.city08 || '—'}
                    </td>
                    <td className="mpg-rankings-modal__mpg-cell">
                      {vehicle.highway08 || '—'}
                    </td>
                    <td className="mpg-rankings-modal__fuel-cell">
                      {vehicle.fuelType1.replace(' Gasoline', '').replace('Electricity', 'Electric')}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <footer className="mpg-rankings-modal__footer">
          <p className="mpg-rankings-modal__disclaimer">
            Rankings based on EPA combined fuel economy estimates for {year} model year {categoryName.toLowerCase()}s.
          </p>
          <a 
            href={`https://www.fueleconomy.gov/feg/best-worst.shtml`}
            target="_blank"
            rel="noopener noreferrer"
            className="mpg-rankings-modal__epa-link"
          >
            View All Rankings on FuelEconomy.gov
            <ExternalLink size={14} />
          </a>
        </footer>
      </div>
    </div>
  );
};

export default MPGRankingsModal;

