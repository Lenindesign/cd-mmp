import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { X, Trophy, TrendingUp, Fuel, Award, ExternalLink, Zap, Leaf, PlugZap } from 'lucide-react';
import type { TopMPGVehicle, TopMPGByFuelType, FuelCategory } from '../../services/fuelEconomyService';
import { vehicleDatabase } from '../../data/vehicles';
import './MPGRankingsModal.css';

/**
 * Generate URL slug for a vehicle
 * Routes use format: /:year/:make/:model (no /vehicles prefix)
 */
const getVehicleUrl = (vehicle: TopMPGVehicle): string => {
  const make = vehicle.make.toLowerCase().replace(/\s+/g, '-');
  const model = vehicle.model.toLowerCase().replace(/\s+/g, '-');
  return `/${vehicle.year}/${make}/${model}`;
};

/**
 * Check if a vehicle exists in the database
 */
const vehicleExistsInDatabase = (vehicle: TopMPGVehicle): boolean => {
  const makeLower = vehicle.make.toLowerCase();
  const modelLower = vehicle.model.toLowerCase();
  
  return vehicleDatabase.some(dbVehicle => {
    const dbMakeLower = dbVehicle.make.toLowerCase();
    const dbModelLower = dbVehicle.model.toLowerCase();
    
    // Exact match or partial match (e.g., "RAV4 Hybrid" matches "RAV4-Hybrid")
    return dbMakeLower === makeLower && (
      dbModelLower === modelLower ||
      dbModelLower.replace(/-/g, ' ') === modelLower ||
      dbModelLower === modelLower.replace(/\s+/g, '-')
    );
  });
};

interface MPGRankingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  vehicles: TopMPGVehicle[];
  vehiclesByFuelType?: TopMPGByFuelType;
  availableCategories?: FuelCategory[];
  currentRank: number | null;
  currentMake: string;
  currentModel: string;
  currentMPG: number;
  bodyStyle: string;
  year: number;
}

const fuelCategoryLabels: Record<FuelCategory, { label: string; icon: React.ReactNode; unit: string }> = {
  gas: { label: 'Gas', icon: <Fuel size={16} />, unit: 'MPG' },
  hybrid: { label: 'Hybrid', icon: <Leaf size={16} />, unit: 'MPG' },
  electric: { label: 'Electric', icon: <Zap size={16} />, unit: 'MPGe' },
  phev: { label: 'Plug-in Hybrid', icon: <PlugZap size={16} />, unit: 'MPGe' },
};

const MPGRankingsModal = ({
  isOpen,
  onClose,
  vehicles,
  vehiclesByFuelType,
  availableCategories = ['gas'],
  currentRank: _currentRank,
  currentMake,
  currentModel,
  currentMPG,
  bodyStyle,
  year
}: MPGRankingsModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState<FuelCategory>('gas');

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

  // Reset to gas tab when modal opens
  useEffect(() => {
    if (isOpen) {
      setActiveCategory('gas');
    }
  }, [isOpen]);

  // Handle click outside
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  if (!isOpen) return null;

  const categoryName = bodyStyle.charAt(0).toUpperCase() + bodyStyle.slice(1).toLowerCase();
  
  // Get vehicles for the active category
  const displayVehicles = vehiclesByFuelType 
    ? vehiclesByFuelType[activeCategory] || []
    : vehicles;
  
  const topVehicle = displayVehicles[0];
  const currentCategoryInfo = fuelCategoryLabels[activeCategory];
  
  // Check if current vehicle is in the active category
  const currentVehicleInCategory = displayVehicles.find(v => v.isCurrentVehicle);
  const effectiveCurrentRank = currentVehicleInCategory?.rank || null;

  // Get ranking badge info
  const getRankBadge = (rank: number) => {
    if (rank === 1) return { icon: <Trophy size={16} />, class: 'gold', label: '1st' };
    if (rank === 2) return { icon: <Award size={16} />, class: 'silver', label: '2nd' };
    if (rank === 3) return { icon: <Award size={16} />, class: 'bronze', label: '3rd' };
    return { icon: null, class: '', label: `${rank}th` };
  };

  const getRankingMessage = () => {
    if (!effectiveCurrentRank) return null;
    
    const categoryLabel = fuelCategoryLabels[activeCategory].label.toLowerCase();
    
    if (effectiveCurrentRank === 1) {
      return {
        type: 'excellent',
        message: `🏆 The ${currentMake} ${currentModel} is the most fuel-efficient ${categoryLabel} ${categoryName.toLowerCase()} on the market!`
      };
    }
    if (effectiveCurrentRank <= 3) {
      return {
        type: 'great',
        message: `🥈 The ${currentMake} ${currentModel} ranks #${effectiveCurrentRank} in fuel efficiency among ${categoryLabel} ${categoryName.toLowerCase()}s!`
      };
    }
    if (effectiveCurrentRank <= 5) {
      return {
        type: 'good',
        message: `✅ The ${currentMake} ${currentModel} is in the top 5 most fuel-efficient ${categoryLabel} ${categoryName.toLowerCase()}s.`
      };
    }
    if (effectiveCurrentRank <= 10) {
      return {
        type: 'average',
        message: `📊 The ${currentMake} ${currentModel} ranks #${effectiveCurrentRank} in fuel efficiency for ${categoryLabel} ${categoryName.toLowerCase()}s.`
      };
    }
    return {
      type: 'below',
      message: `📉 The ${currentMake} ${currentModel} ranks #${effectiveCurrentRank} in fuel efficiency. Consider hybrid options for better MPG.`
    };
  };

  const rankingMessage = currentVehicleInCategory ? getRankingMessage() : null;

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

        {/* Fuel Type Tabs */}
        {vehiclesByFuelType && availableCategories.length > 1 && (
          <div className="mpg-rankings-modal__tabs" role="tablist">
            {availableCategories.map((category) => {
              const info = fuelCategoryLabels[category];
              const count = vehiclesByFuelType[category]?.length || 0;
              return (
                <button
                  key={category}
                  className={`mpg-rankings-modal__tab ${activeCategory === category ? 'mpg-rankings-modal__tab--active' : ''}`}
                  onClick={() => setActiveCategory(category)}
                  role="tab"
                  aria-selected={activeCategory === category}
                  aria-controls={`tabpanel-${category}`}
                >
                  {info.icon}
                  <span className="mpg-rankings-modal__tab-label">{info.label}</span>
                  <span className="mpg-rankings-modal__tab-count">{count}</span>
                </button>
              );
            })}
          </div>
        )}

        {/* Current Vehicle Status */}
        {rankingMessage && (
          <div className={`mpg-rankings-modal__status mpg-rankings-modal__status--${rankingMessage.type}`}>
            <p>{rankingMessage.message}</p>
          </div>
        )}

        {/* Current Vehicle Highlight */}
        {currentVehicleInCategory && effectiveCurrentRank && (
          <div className="mpg-rankings-modal__current">
            <div className="mpg-rankings-modal__current-rank">
              <span className="mpg-rankings-modal__rank-number">#{effectiveCurrentRank}</span>
              <span className="mpg-rankings-modal__rank-label">Your Vehicle</span>
            </div>
            <div className="mpg-rankings-modal__current-info">
              <span className="mpg-rankings-modal__current-name">
                {year} {currentMake} {currentModel}
              </span>
              <span className="mpg-rankings-modal__current-mpg">
                {currentCategoryInfo.icon}
                {currentMPG} {currentCategoryInfo.unit} Combined
              </span>
            </div>
            {topVehicle && effectiveCurrentRank > 1 && (
              <div className="mpg-rankings-modal__current-diff">
                <span className="mpg-rankings-modal__diff-value">
                  {topVehicle.comb08 - currentMPG} {currentCategoryInfo.unit}
                </span>
                <span className="mpg-rankings-modal__diff-label">behind #1</span>
              </div>
            )}
          </div>
        )}

        {/* Rankings Table */}
        <div className="mpg-rankings-modal__table-container" role="tabpanel" id={`tabpanel-${activeCategory}`}>
          {displayVehicles.length === 0 ? (
            <div className="mpg-rankings-modal__empty">
              <p>No {fuelCategoryLabels[activeCategory].label.toLowerCase()} {categoryName.toLowerCase()}s available in our rankings.</p>
            </div>
          ) : (
            <table className="mpg-rankings-modal__table">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Vehicle</th>
                  {activeCategory === 'electric' && (
                    <>
                      <th>Range</th>
                      <th>Efficiency</th>
                    </>
                  )}
                  {activeCategory === 'phev' && (
                    <>
                      <th>EV Range</th>
                      <th>Gas MPG</th>
                    </>
                  )}
                  {(activeCategory === 'gas' || activeCategory === 'hybrid') && (
                    <>
                      <th>Combined</th>
                      <th>City</th>
                      <th>Highway</th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody>
                {displayVehicles.map((vehicle) => {
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
                        {vehicleExistsInDatabase(vehicle) ? (
                          <Link 
                            to={getVehicleUrl(vehicle)} 
                            className="mpg-rankings-modal__vehicle-link"
                            onClick={onClose}
                          >
                            <span className="mpg-rankings-modal__vehicle-name">
                              {vehicle.make} {vehicle.model}
                            </span>
                            {vehicle.isCurrentVehicle && (
                              <span className="mpg-rankings-modal__your-car">Your Car</span>
                            )}
                          </Link>
                        ) : (
                          <span className="mpg-rankings-modal__vehicle-text">
                            <span className="mpg-rankings-modal__vehicle-name">
                              {vehicle.make} {vehicle.model}
                            </span>
                            {vehicle.isCurrentVehicle && (
                              <span className="mpg-rankings-modal__your-car">Your Car</span>
                            )}
                          </span>
                        )}
                      </td>
                      {activeCategory === 'electric' && (
                        <>
                          <td className="mpg-rankings-modal__mpg-cell mpg-rankings-modal__mpg-cell--combined">
                            <strong>{vehicle.range || '—'}</strong>
                            <span className="mpg-rankings-modal__unit">mi</span>
                          </td>
                          <td className="mpg-rankings-modal__mpg-cell">
                            {vehicle.milesPerKwh ? `${vehicle.milesPerKwh}` : '—'}
                            {vehicle.milesPerKwh && <span className="mpg-rankings-modal__unit">mi/kWh</span>}
                          </td>
                        </>
                      )}
                      {activeCategory === 'phev' && (
                        <>
                          <td className="mpg-rankings-modal__mpg-cell mpg-rankings-modal__mpg-cell--combined">
                            <strong>{vehicle.electricRange || '—'}</strong>
                            <span className="mpg-rankings-modal__unit">mi</span>
                          </td>
                          <td className="mpg-rankings-modal__mpg-cell">
                            {vehicle.gasMpg || '—'}
                            {vehicle.gasMpg && <span className="mpg-rankings-modal__unit">MPG</span>}
                          </td>
                        </>
                      )}
                      {(activeCategory === 'gas' || activeCategory === 'hybrid') && (
                        <>
                          <td className="mpg-rankings-modal__mpg-cell mpg-rankings-modal__mpg-cell--combined">
                            <strong>{vehicle.comb08}</strong>
                          </td>
                          <td className="mpg-rankings-modal__mpg-cell">
                            {vehicle.city08 || '—'}
                          </td>
                          <td className="mpg-rankings-modal__mpg-cell">
                            {vehicle.highway08 || '—'}
                          </td>
                        </>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>

        {/* Footer */}
        <footer className="mpg-rankings-modal__footer">
          <p className="mpg-rankings-modal__disclaimer">
            {activeCategory === 'electric' && 
              `Rankings based on EPA range estimates for ${year} model year electric ${categoryName.toLowerCase()}s. Efficiency shown in miles per kWh (higher is better).`
            }
            {activeCategory === 'phev' && 
              `Rankings based on electric-only range for ${year} model year plug-in hybrid ${categoryName.toLowerCase()}s. Gas MPG shown for when battery is depleted.`
            }
            {(activeCategory === 'gas' || activeCategory === 'hybrid') && 
              `Rankings based on EPA combined fuel economy estimates for ${year} model year ${fuelCategoryLabels[activeCategory].label.toLowerCase()} ${categoryName.toLowerCase()}s.`
            }
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

